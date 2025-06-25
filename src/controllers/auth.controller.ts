import { Request, Response, NextFunction } from "express";
import { User } from "../models/index";
// import { ApiError } from "../utils/errors/index"; // Removed ApiError import
import { UserRole, TokenPayload, UserResponse } from "../types";
import bcrypt from "bcrypt";
import { generateTokenPair, verifyRefreshToken } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/password";
import { CreationAttributes } from "sequelize";
import { redisClient } from "../config/redis";

export const authController = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password, role } = req.body;

      if (role === UserRole.EMPLOYER) {
        res.status(400).json({ message: "Cannot register an employer" });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: "Email already registered" });
        return; // Add return here to prevent further execution
      }

      const user = await User.create({
        email,
        password,
        role: role || UserRole.REGULAR_USER,
        isActive: true,
        isWalletVerified: false,
      } as CreationAttributes<User>);

      const tokens = await generateTokenPair(user);

      const userResponse: UserResponse = {
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

      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(401).json({ message: "Invalid email or password" }); // Combine messages for security
        return;
      }

      // const isValidPassword = await comparePassword(password, user.password);
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        res.status(401).json({ message: "Invalid email or password" }); // Combine messages for security
        return;
      }

      if (!user.isActive) {
        res.status(401).json({ message: "Account is deactivated" });
        return;
      }

      const tokens = await generateTokenPair(user);

      const userResponse: UserResponse = {
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

      const user = await User.findByPk(userId, {
        attributes: ["id", "email", "role", "walletAddress", "createdAt"],
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        isWalletVerified: user.isWalletVerified,
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
      const user = await User.findByPk(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (email) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && existingUser.id !== userId) {
          res.status(400).json({ message: "Email already in use" });
          return;
        }
        user.email = email;
      }

      if (password) {
        user.password = await hashPassword(password);
      }

      await user.save();

      const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        isWalletVerified: user.isWalletVerified,
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
      const users = await User.findAll({
        attributes: ["id", "email", "role", "walletAddress", "createdAt"],
        order: [["createdAt", "DESC"]],
      });
      res.json(users);
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

      const user = await User.findByPk(payload.userId);

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

      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const isValidPassword = await user.validatePassword(currentPassword);
      if (!isValidPassword) {
        res.status(401).json({ message: "Current password is incorrect" });
        return;
      }

      // Note: User model should handle hashing password on save/update hook
      user.password = newPassword;
      await user.save();

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  },
};
