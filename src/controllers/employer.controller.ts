import { Request, Response, NextFunction } from "express";
import { UserRole, TokenPayload, UserResponse } from "../types";
import { generateTokenPair } from "../utils/jwt";
import { CreationAttributes } from "sequelize";
import { eq, and } from "drizzle-orm";
import { users, employers, marketers, invitations } from "../db/schema";

//DB services
import { db } from "../db/config";
import userModel from "../db/services/user";
import employerModel from "../db/services/employer";
import invitationModel from "../db/services/invitation";
import { register } from "../utils/register";

export const employerController = {
  async sendInvite(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;
      const senderId = (req.user as TokenPayload).userId;
      const role = "EMPLOYEE"; // Assuming default role is employee
      const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
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

      const invitation = await invitationModel.create({
        email,
        senderId,
        role,
        expiresAt,
      });
      res.status(200).json({ message: invitation, inviteLink: invitation.id });
      return;
    } catch (error) {
      res.json({ error: error });
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
          if (!companyName) {
            res.status(400).json({ message: "companyName field required" });
            return false;
          }
          return true;
        },
        additionalUserCreation: async (user, req, res) => {
          const { companyName } = req.body;
          //
          const employer = await employerModel.create({
            userId: user.id,
            companyName: companyName,
            registrationDate: new Date(),
            isVerified: false,
          });

          const { invitationId } = req.body;
          const invitation = await invitationModel.get({ id: invitationId });

          const [senderMarketer] = await db
            .select()
            .from(marketers)
            .where(eq(marketers.userId, invitation.senderUserId))
            .limit(1);
          console.log(senderMarketer);

          // If the sender was a marketer, Update the marketerId field
          if (senderMarketer) {
            await db
              .update(employers)
              .set({ marketerId: senderMarketer.id })
              .where(eq(employers.id, employer.id));
          }

          const tokens = await generateTokenPair(user);

          const userResponse = {
            id: user.id,
            email: user.email,
            role: user.role,
            walletAddress: user.walletAddress,
            isWalletVerified: user.isWalletVerified,
          };

          res.status(201).json({
            ...tokens,
          });
        },
      });
      // No explicit return needed here as res.json() sends the response
    } catch (error) {
      res.status(400).json({ error: error });
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
      //TODO: Fetch 6 months’ bank history

      // In a real application, you'd validate the API credentials,
      // fetch bank history, and update the employer's tier accordingly.
      // For now, we'll just return a dummy response.
      res.status(200).json({
        message: `API integration setup successfully for employer ${employerId}.`,
        tier: "API-Verified", // Assuming successful API integration upgrades the tier
        advanceLimit: "30%", // Updated advance limit
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async getEmployerTiers(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const employerId = req.params.id;

      // In a real application, you'd fetch the employer's tier information
      // from the database and return it in the response.
      // For now, we'll just return a dummy response.
      res.status(200).json({
        employerId: employerId,
        tier: "Trusted", // Example of a potential tier
        advanceLimit: "50%",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
