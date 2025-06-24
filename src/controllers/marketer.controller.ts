import { Request, Response, NextFunction } from "express";
import { User } from "../models/index";
import { UserRole, TokenPayload } from "../types";

interface SendInviteRequestBody {
  email?: string;
}

export const marketerController = {
  async sendInvite(
    req: Request<{ email: string }, {}, SendInviteRequestBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Get the authenticated user ID from the token payload

      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
