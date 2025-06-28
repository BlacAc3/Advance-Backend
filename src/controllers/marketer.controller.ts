import { Request, Response, NextFunction } from "express";
import invitationModel from "../db/services/invitation";
import userModel from "../db/services/user";
import { UserRole, TokenPayload } from "../types";
import { Next } from "koa";

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
      //Verfiy Invitation existence
      const existingInvitation = await invitationModel.getPending({
        email,
        senderId,
        role,
      });
      if (existingInvitation) {
        res.status(400).json({
          message: "Invitation for the target user already exists",
        });
        return;
      }

      //Verify user is not registered
      const invitedUser = await userModel.get({ email });
      if (invitedUser) {
        res.status(400).json({
          message: "Cannot invite an existing user",
        });
        return;
      }

      const invitation = await invitationModel.create({
        email,
        senderId,
        role,
        expiresAt,
      });
      res.status(200).json({ message: invitation, inviteLink: invitation.id });
      return;
    } catch (error) {
      next(error);
    }
  },
  async get_invites(req: Request, res: Response, next: NextFunction) {
    try {
      //TODO: add functionality to filter by accepted invite
      const senderUserId = (req.user as TokenPayload).userId;
      const statusFilter = req.query.status as any; // Get status from query params

      // Build the where clause
      const whereClause: any = {
        senderUserId: senderUserId,
      };

      const invitations = await invitationModel.getAll({
        status: statusFilter,
      });
      res.status(200).json(invitations);
      return;
    } catch (error) {
      next(error);
    }
  },
};
