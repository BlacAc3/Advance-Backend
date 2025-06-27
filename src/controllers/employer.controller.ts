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

export const employerController = {
  async employerRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      var invitation;
      const { email, username, password, role, invitationId, companyName } =
        req.body;

      // Validations
      if (!email || !password) {
        res
          .status(400)
          .json({ message: "Email and password are required fields" });
        return;
      }

      if (password.length < 6) {
        res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
        return;
      }

      if (role != UserRole.EMPLOYER) {
        res
          .status(400)
          .json({ message: "User must be registering as an employer" });
        return;
      }
      if (!companyName) {
        res.status(400).json({ message: "companyName field required" });
      }

      if (!invitationId) {
        res.status(400).json({
          message: "You need an invitation id to signin as an employer",
        });
        return;
      }

      // Prevent duplicate registration
      const existingUser = await userModel.get({ email });
      if (existingUser) {
        res
          .status(400)
          .json({ message: "Email already registered in our system" });
        return;
      }

      //Confirm Invitation existence
      invitation = await invitationModel.get({ id: invitationId });

      //Verify invitation exists
      if (!invitation) {
        res.status(400).json({ message: "The Invitation link is expired" });
        return;
      }

      //Verify if invitation has expired
      if (new Date(invitation.expiresAt) < new Date()) {
        await invitationModel.expire(invitation.id);
        res.status(400).json({
          message: "This invitation has expired",
        });
        return;
      }

      // Prevent registration when the invitation target does not match the email used to registered
      if (invitation?.targetEmail != email) {
        res.status(400).json({
          message: "The invited email must match the email used to register",
        });
        return;
      }
      // const companyExists = await Employer.findOne({ where: { companyName } });
      const companyExists = await employerModel.get({ companyName });
      if (companyExists) {
        res.status(400).json({
          message: "This company/employer has already been registered",
        });
        return;
      }

      const user = await userModel.create({ email, password, role, username });

      //Update invitation table
      await db
        .update(invitations)
        .set({
          status: "accepted", // Use literal string from enum
          recipientUserId: user.id,
        })
        .where(eq(invitations.id, invitation.id));

      //
      const [employer] = await db
        .insert(employers)
        // Wrap employerData in an array to match Drizzle's values overload for single inserts
        .values({
          userId: user.id,
          companyName: companyName,
          registrationDate: new Date(),
          isVerified: false,
        })
        .returning();

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
      // No explicit return needed here as res.json() sends the response
    } catch (error) {
      res.status(400).json({ error: error });
      next(error); // Still pass unexpected errors to the error handling middleware
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
