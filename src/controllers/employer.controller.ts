import { Request, Response, NextFunction } from "express";
import { UserRole, TokenPayload, UserResponse } from "../types";
import { generateTokenPair } from "../utils/jwt";
import { prisma } from "../db/database";

//DB services
import userModel from "../db/services/user";
import employerModel from "../db/services/employer";
import invitationModel from "../db/services/invitation";
import { register } from "../utils/register";
import { sendSuccess, sendError } from "../utils/responseWrapper";

export const employerController = {
  async sendInvite(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;
      const senderId = req.user?.userId as string;
      const role = "EMPLOYEE"; // Assuming default role is employee
      const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
      const existingInvitation = await invitationModel.getPending({
        email,
        senderId: senderId,
        role,
      });
      console.error(existingInvitation);
      if (existingInvitation) {
        sendError(
          res,
          null,
          "Invitation for the target user already exists",
          400,
        );
        return;
      }

      const invitation = await invitationModel.create({
        email,
        senderId,
        role,
        expiresAt,
      });
      sendSuccess(res, invitation, "Invitation sent successfully", 200);
      return;
    } catch (error) {
      console.error(error);
      sendError(res, error, "Failed to send invitation", 400);
      next(error);
    }
  },
  async employerRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await register({
        req,
        res,
        role: UserRole.EMPLOYER,
        additionalValidations: (req, res) => {
          const { companyName } = req.body;
          const { invitationId } = req.body;
          if (!companyName) {
            sendError(res, null, "companyName field required", 400);
            return false;
          }
          const invitation = invitationModel.get({ id: invitationId });

          if (!invitation) {
            sendError(res, null, "Invitation not found", 404);
            return false;
          }
          return true;
        },
        additionalUserCreation: async (user, req, res) => {
          const { companyName } = req.body;
          const { invitationId } = req.body;
          const invitation = await invitationModel.get({ id: invitationId });

          if (!invitation) {
            sendError(res, null, "Invitation not found", 404);
            return;
          }
          const employer = await employerModel.create({
            userId: user.id,
            companyName: companyName,
            registrationDate: new Date(),
            isVerified: false,
          });

          const senderMarketer = await prisma.marketer.findUnique({
            where: { userId: invitation.senderUserId },
          });

          // If the sender was a marketer, Update the marketerId field
          if (senderMarketer) {
            await prisma.employer.update({
              where: { id: employer.id },
              data: { marketerId: senderMarketer.id },
            });
          }

          const tokens = await generateTokenPair(user);

          const userResponse = {
            id: user.id,
            email: user.email,
            role: user.role,
            walletAddress: user.walletAddress,
            isWalletVerified: user.isWalletVerified,
          };

          sendSuccess(
            res,
            { ...tokens, user: userResponse },
            "Employer registered successfully",
            201,
          );
          return;
        },
      });
    } catch (error) {
      console.error(error);
      sendError(res, error, "Employer registration failed", 400);
      next(error);
    }
  },
  async setupApiIntegration(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const employerId = req.params.id;

      //TODO: Implement Bank-history client integration (Mono/Okra)
      //TODO: Fetch 6 months' bank history

      // In a real application, you'd validate the API credentials,
      // fetch bank history, and update the employer's tier accordingly.
      // For now, we'll just return a dummy response.
      sendSuccess(
        res,
        {
          message: `API integration setup successfully for employer ${employerId}.`,
          tier: "API-Verified", // Assuming successful API integration upgrades the tier
          advanceLimit: "30%", // Updated advance limit
        },
        "API integration setup successfully",
        200,
      );
    } catch (error) {
      sendError(res, error, "API integration setup failed");
      console.error(error);
      next(error);
    }
  },

  async uploadPayroll(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
    } catch (error) {
      sendError(res, error, "Failed to retrieve employer tiers");
      console.error(error);
      next(error);
    }
  },
};
