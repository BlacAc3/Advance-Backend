import { Request, Response, NextFunction } from "express";
import invitationModel from "../db/services/invitation";
import userModel from "../db/services/user";
import { TokenPayload } from "../types";
import { sendError, sendSuccess } from "../utils/responseWrapper";
import { stat } from "node:fs/promises";

interface SendInviteRequestBody {
  email?: string;
}

export const marketerController = {
  async sendInvite(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;
      const senderId = (req.user as TokenPayload).userId;
      const role = "EMPLOYER"; // Assuming default role is employee
      const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);

      if (!email) {
        sendError(res, 400, "Email field required");
        return;
      }

      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        sendError(res, 400, "Invalid email format");
        return;
      }

      //Verfiy Invitation existence
      const existingInvitation = await invitationModel.getPending({
        email,
        senderId,
        role,
      });
      if (existingInvitation) {
        sendError(res, 400, "Invitation for the target user already exists");
        return;
      }

      //Verify user is not registered
      const invitedUser = await userModel.get({ email });
      if (invitedUser) {
        sendError(res, 400, "Cannot invite an existing user");
        return;
      }
      if (!email) {
        sendError(res, 400, "Email is required");
        return;
      }

      const invitation = await invitationModel.create({
        email,
        senderId,
        role,
        expiresAt,
      });
      sendSuccess(res, invitation, "Invite sent and created", 200);
      return;
    } catch (error) {
      sendError(res, 400, "An Error occured while sending invite");
      next(error);
    }
  },
  async get_invites(req: Request, res: Response, next: NextFunction) {
    try {
      //TODO: add functionality to filter by accepted invite
      const senderUserId = (req.user as TokenPayload).userId;
      const statusFilter = req.query.status as any; // Get status from query params

      const invitations = await invitationModel.getMany({
        senderId: senderUserId,
        status: statusFilter,
      });
      sendSuccess(res, invitations, "Invitations retrieved successfully", 200);
      return;
    } catch (error) {
      sendError(res, 400, "An error occured while getting invites");
      console.error(error);
      next(error);
    }
  },
};
