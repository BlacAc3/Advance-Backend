import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/jwt";
import { ethers } from "ethers";
import { TokenPayload, UserRole } from "../types";
import crypto from "crypto";
import userModel from "../db/services/user";
import { Token } from "typescript";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    // console.log(decoded);

    const user = await userModel.get({ id: decoded.userId });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({ message: "Account is deactivated" });
      return;
    }

    req.user = {
      userId: user.id,
      role: user.role as UserRole,
    };
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error(error);
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const authenticateWeb3 = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { signature, message, address } = req.body;
    if (!signature || !message || !address) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Verify signature and message
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      res.status(401).json({ message: "Invalid signature" });
      return;
    }

    let user = await userModel.get({ walletAddress: address });

    if (!user) {
      // Create new user if not exists
      user = await userModel.create({
        walletAddress: address,
        role: UserRole.WEB3_USER,
        email: `${address.slice(0, 6)}...${address.slice(-4)}@web3.user`,
        password: crypto.randomBytes(32).toString("hex"),
      });
    }

    if (!user.isActive) {
      res.status(403).json({ message: "Account is deactivated" });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        walletAddress: user.walletAddress,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    req.user = {
      userId: user.id,
      role: user.role as UserRole,
      walletAddress: user.walletAddress,
    } as TokenPayload;

    res.json({
      token,
      user: { id: user.id, role: user.role, walletAddress: user.walletAddress },
    });
    next();
  } catch (error) {
    console.error("Web3 auth middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
