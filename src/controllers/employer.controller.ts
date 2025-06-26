import { Request, Response, NextFunction } from "express";
import { User, Invitation, Employer, Marketer } from "../models/index";
import { UserRole, TokenPayload, UserResponse } from "../types";
import { generateTokenPair } from "../utils/jwt";
import { CreationAttributes } from "sequelize";

export const employerController = {
  async employerRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      var invitation;
      const { email, password, role, invitationId, companyName } = req.body;

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
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res
          .status(400)
          .json({ message: "Email already registered in our system" });
        return;
      }

      //Confirm Invitation existence
      invitation = await Invitation.findOne({
        where: {
          id: invitationId,
          role: "EMPLOYER",
          status: "pending",
        },
      });

      //Verify invitation exists
      if (!invitation) {
        res.status(400).json({ message: "The Invitation link is expired" });
        return;
      }

      //Verify if invitation has expired
      if (invitation.expiresAt < new Date()) {
        await invitation.update({ status: "expired" });
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
      const companyExists = await Employer.findOne({ where: { companyName } });
      if (companyExists) {
        res.status(400).json({
          message: "This company/employer has already been registered",
        });
        return;
      }

      const user = await User.create({
        email,
        password,
        role: role,
        isActive: true,
        isWalletVerified: false,
      } as CreationAttributes<User>);

      await invitation.update({
        status: "accepted",
        recipientUserId: user.id,
      });
      const employer = await Employer.create({
        userId: user.id,
        companyName: companyName,
        registrationDate: new Date(),
        isVerified: false,
      });
      // Find the marketer who sent the invitation
      const senderMarketer = await Marketer.findOne({
        where: { userId: invitation.senderUserId },
      });

      // If the sender was a marketer, link the new employer to them
      if (senderMarketer) {
        await employer.update({ marketerId: senderMarketer.id as any }); // Use 'as any' to bypass potential TypeScript type mismatch for now
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
