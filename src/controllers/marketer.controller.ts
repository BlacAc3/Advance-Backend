import { Request, Response, NextFunction } from "express";
import { createInvitation } from "../services/invitationService";
import { Invitation, User, Employer } from "../models/index";
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
      const senderUserId = (req.user as TokenPayload).userId;
      const role = "EMPLOYER"; // Assuming default role is employee
      const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
      const existingInvitation = await Invitation.findOne({
        where: {
          targetEmail: email,
          senderUserId: senderUserId,
          status: "pending",
        },
      });
      if (existingInvitation) {
        res.status(400).json({
          message: "Invitation for the target user already exists",
        });
        return;
      }

      const invitation = await createInvitation(
        email,
        senderUserId,
        role,
        expiresAt,
      );
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
      const statusFilter = req.query.status as string | undefined; // Get status from query params

      // Build the where clause
      const whereClause: any = {
        senderUserId: senderUserId,
      };

      // Add status filter if provided and is a valid status
      const validStatuses = ["pending", "accepted", "rejected", "expired"];
      if (statusFilter && validStatuses.includes(statusFilter)) {
        whereClause.status = statusFilter;
      }

      const invitations = await Invitation.findAll({
        where: whereClause, // Use the built where clause
        include: [
          {
            model: User,
            as: "sender",
            attributes: ["id", "username", "email"], // Specify the attributes you want to retrieve
          },
          {
            model: User,
            as: "receiver",
            attributes: ["id", "username", "email", "role"],
          },
        ],
      });
      res.status(200).json(invitations);
      return;
    } catch (error) {
      next(error);
    }
  },
};
