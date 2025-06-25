import { Request, Response, NextFunction } from "express";
import { createInvitation } from "../services/invitationService";
import { Invitation, User } from "../models/index";
import { UserRole, TokenPayload } from "../types";

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
      const role = "employer"; // Assuming default role is employee
      const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
      // const existingInvitation = await Invitation.findOne({
      //   where: {
      //     targetEmail: email,
      //     senderUserId: senderUserId,
      //     status: "pending",
      //   },
      // });
      // if (existingInvitation) {
      //   res.status(400).json({
      //     message: "Invitation for the target user already exists",
      //   });
      //   return;
      // }

      const invitation = await createInvitation(
        email,
        senderUserId,
        role,
        expiresAt,
      );
      res.status(200).json({ message: invitation, inviteLink: invitation.id });
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
