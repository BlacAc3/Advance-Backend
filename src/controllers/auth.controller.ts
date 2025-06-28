import { Request, Response, NextFunction } from "express";
// import { ApiError } from "../utils/errors/index"; // Removed ApiError import
import { UserRole, TokenPayload } from "../types";
import bcrypt from "bcrypt";
import { generateTokenPair, verifyRefreshToken } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/password";
import { redisClient } from "../config/redis";
import userModel from "../db/services/user";
import marketerModel from "../db/services/marketer";
import invitationModel from "../db/services/invitation";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema";
import { db } from "../db/config";

const users = schema.users;

export const authController = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password, role, invitationId } = req.body;

      if (role === UserRole.EMPLOYER) {
        res.status(400).json({ message: "Cannot register an employer" });
      } else if (role === UserRole.EMPLOYEE) {
        res.status(400).json({ message: "Cannot register an employee" });
      }

      // Verify User Existence
      const existingUser = await userModel.get(email);
      if (existingUser) {
        res.status(400).json({ message: "Email already registered" });
        return;
      }

      // Verify invitation existence
      const invitation = await invitationModel.get({ id: invitationId });
      if (!invitation) {
        res.status(400).json({ message: "The Invitation link is expired" });
        return;
      }

      const user = await userModel.create({
        email,
        password,
        role: role || UserRole.REGULAR_USER,
      });

      if (user.role === UserRole.MARKETER) {
        marketerModel.create({
          userId: user.id,
          registrationDate: new Date(),
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

      res.status(201).json({
        user: userResponse,
        ...tokens,
      });
      // No explicit return needed here as res.json() sends the response
    } catch (error) {
      res.status(400).json({ error: error });
      next(error); // Still pass unexpected errors to the error handling middleware
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await userModel.get({ email });
      if (!user) {
        res.status(401).json({ message: "Invalid email or password" }); // Combine messages for security
        return;
      }

      // const isValidPassword = await comparePassword(password, user.password);
      const isValidPassword = await comparePassword(password, user.password); // Assuming you add this function to userModel
      if (!isValidPassword) {
        res.status(401).json({ message: "Invalid email or password" }); // Combine messages for security
        return;
      }

      if (!user.isActive) {
        res.status(401).json({ message: "Account is deactivated" });
        return;
      }

      const tokens = await generateTokenPair(user);

      const userResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        isWalletVerified: user.isWalletVerified,
      };

      res.status(200).json({
        user: userResponse,
        ...tokens,
      });
      return;
    } catch (error) {
      next(error);
    }
  },

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const [user] = await db
        .select({
          id: users.id,
          email: users.email,
          role: users.role,
          walletAddress: users.walletAddress,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, userId));

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const userResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
      };

      res.status(200).json(userResponse);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { email, password } = req.body;
      const user = userModel.get({ id: userId });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (email) {
        const existingUser = await userModel.get(email);
        if (existingUser && existingUser.id !== userId) {
          res.status(400).json({ message: "Email already in use" });
          return;
        }
        await db.update(users).set({ email }).where(eq(users.id, userId));
      }

      if (password) {
        const hashedPassword = await hashPassword(password);
        // user.password = await hashPassword(password);
        await db
          .update(users)
          .set({ password: hashedPassword })
          .where(eq(users.id, userId));
      }

      // await user.save();

      const [updatedUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId));

      const userResponse = {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        walletAddress: updatedUser.walletAddress,
        isWalletVerified: updatedUser.isWalletVerified,
      };

      res.json(userResponse);
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        await redisClient.set(`bl_${token}`, "1", 24 * 60 * 60); // 24 hours
      }
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  },

  async getUsers(req: Request, res: Response) {
    try {
      // const users = await User.findAll({
      //   attributes: ["id", "email", "role", "walletAddress", "createdAt"],
      //   order: [["createdAt", "DESC"]],
      // });
      const allUsers = await db.select().from(users).orderBy(users.createdAt);
      res.json(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      // This catch block already uses res.status, keeping it as is
      res.status(500).json({ message: "Error fetching users" });
    }
  },

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ message: "Refresh token is required" });
        return;
      }

      const payload = await verifyRefreshToken(refreshToken);
      // Check if payload exists (verification failed)
      if (!payload || !payload.userId) {
        res.status(401).json({ message: "Invalid or expired refresh token" });
        return;
      }

      // const user = await User.findByPk(payload.userId);
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, payload.userId));

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      if (!user.isActive) {
        res.status(401).json({ message: "Account is deactivated" });
        return;
      }

      const tokens = await generateTokenPair(user);

      res.json(tokens);
    } catch (error) {
      // If verifyRefreshToken throws an error (e.g., invalid signature), it will land here
      // We can check if the error is related to token verification
      if (
        error instanceof Error &&
        (error.message.includes("invalid signature") ||
          error.message.includes("jwt expired"))
      ) {
        res.status(401).json({ message: "Invalid or expired refresh token" });
        return;
      }
      next(error); // Pass other unexpected errors
    }
  },

  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ message: "User not authenticated" });
        return;
      }

      // const user = await User.findByPk(userId);
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const isValidPassword = await comparePassword(
        currentPassword,
        user.password,
      ); //Assuming comparePassword function is added to userModel or utils

      if (!isValidPassword) {
        res.status(401).json({ message: "Current password is incorrect" });
        return;
      }

      // Note: User model should handle hashing password on save/update hook
      // user.password = newPassword;
      const hashedPassword = await hashPassword(newPassword);
      await db.update(users).set({ password: hashedPassword });
      // await user.save();

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  },
};
