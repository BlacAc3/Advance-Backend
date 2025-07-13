import { Request, Response } from "express";
import { UserRole } from "../types";
import userModel from "../db/services/user";
import invitationModel from "../db/services/invitation";
import { prisma } from "../db/database";
import { generateTokenPair } from "./jwt";
import { sendError, sendSuccess } from "./responseWrapper";

interface RegisterOptions {
  req: Request;
  res: Response;
  role: any;
  additionalValidations?: (req: Request, res: Response) => boolean;
  additionalUserCreation?: (
    user: any,
    req: Request,
    res: Response,
  ) => Promise<void>;
}

export const register = async ({
  req,
  res,
  role,
  additionalValidations,
  additionalUserCreation,
}: RegisterOptions): Promise<void> => {
  const { email, username, password, invitationId } = req.body;

  // Validations
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required fields" });
    return;
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
    return;
  }

  if (req.body.role != role) {
    res.status(400).json({ message: `User must be registering as an ${role}` });
    return;
  }

  if (req.body.role === UserRole.REGULAR_USER && !invitationId) {
    const user = await userModel.create({ email, password, role, username });
    const tokens = await generateTokenPair(user);

    sendSuccess(
      res,
      { user: user, ...tokens },
      "User registered successfully",
      201,
    );
    return;
  }

  if (!invitationId) {
    res.status(400).json({
      message: "You need an invitation id to signin",
    });
    return;
  }

  const existingUser = await userModel.get({ email });
  if (existingUser) {
    res.status(400).json({ message: "Email already registered in our system" });
    return;
  }

  // Verify the invitation existence
  const invitation = await invitationModel.get({ id: invitationId });
  if (!invitation) {
    // console.error(`Invitation with ID ${invitationId} not found.`);
    res.status(404).json({ message: "Invitation not found." });
    return;
  }

  // Verify invitation state
  if (invitation.status !== "pending") {
    console.warn(
      `Invitation with ID ${invitationId} is already in status: ${invitation.status}.`,
    );
    res.status(400).json({
      message: `Invitation has already been ${invitation.status}.`,
    });
    return;
  }

  const now = new Date();
  if (invitation.expiresAt < now) {
    console.error(`Invitation with ID ${invitationId} has expired.`);
    // Update status if expired
    invitationModel.expire(invitationId);
    res.status(400).json({ message: "Invitation has expired." });
    return;
  }

  // Verify request body matches invitation details
  if (invitation?.targetEmail != email) {
    res.status(400).json({
      message: "The invited email must match the email used to register",
    });
    return;
  }

  if (additionalValidations && !additionalValidations(req, res)) {
    return;
  }

  // Create user
  const newUserData = {
    email,
    password,
    role: role,
    username,
  };
  const user = await userModel.create({ email, password, role, username });

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: {
      status: "accepted", // Use literal string from enum
      recipientUserId: user.id,
    },
  });

  if (additionalUserCreation) {
    await additionalUserCreation(user, req, res);
  }
  const tokens = await generateTokenPair(user);

  const userResponse = {
    id: user.id,
    email: user.email,
    role: user.role,
    walletAddress: user.walletAddress,
    isWalletVerified: user.isWalletVerified,
  };
};
