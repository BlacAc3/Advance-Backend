import { Request, Response, NextFunction } from "express";
import { UserRole, TokenPayload } from "../types";
import { generateTokenPair, verifyRefreshToken } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/password";
import { redisClient } from "../config/redis";
import userModel from "../db/services/user";
import marketerModel from "../db/services/marketer";
import invitationModel from "../db/services/invitation";
import { prisma } from "../db/database";
import { register } from "../utils/register";
import { sendSuccess, sendError } from "../utils/responseWrapper";

export const authController = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await register({
        req,
        res,
        role: UserRole.REGULAR_USER,
        additionalValidations: (req, res) => {
          const { role } = req.body;
          if (role === UserRole.EMPLOYER) {
            sendError(res, null, "Cannot register an employer", 400);
            return false;
          } else if (role === UserRole.EMPLOYEE) {
            sendError(res, null, "Cannot register an employee", 400);
            return false;
          }
          return true;
        },
        additionalUserCreation: async (user, req, res) => {
          if (user.role === UserRole.MARKETER) {
            await marketerModel.create({
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

          sendSuccess(
            res,
            { user: userResponse, ...tokens },
            "User registered successfully",
            201,
          );
        },
      });
    } catch (error) {
      sendError(res, error, "Registration failed", 400);
      console.log(error);
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await userModel.get({ email });
      if (!user) {
        sendError(res, null, "Invalid email or password", 401); // Combine messages for security
        return;
      }

      const isValidPassword = await comparePassword(password, user.password); // Assuming you add this function to userModel
      if (!isValidPassword) {
        sendError(res, null, "Invalid email or password", 401); // Combine messages for security
        return;
      }

      if (!user.isActive) {
        sendError(res, null, "Account is deactivated", 401);
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

      sendSuccess(
        res,
        { user: userResponse, ...tokens },
        "Logged in successfully",
        200,
      );
    } catch (error) {
      sendError(res, error, "Login failed");
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
        sendError(res, null, "Unauthorized", 401);
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          role: true,
          walletAddress: true,
          createdAt: true,
        },
      });

      if (!user) {
        sendError(res, null, "User not found", 404);
        return;
      }

      const userResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
      };

      sendSuccess(res, userResponse, "Profile retrieved successfully", 200);
    } catch (error) {
      sendError(res, error, "Failed to retrieve profile");
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
        sendError(res, null, "Unauthorized", 401);
        return;
      }

      const { email, password } = req.body;
      const user = await userModel.get({ id: userId });
      if (!user) {
        sendError(res, null, "User not found", 404);
        return;
      }

      if (email) {
        const existingUser = await userModel.get({ email });
        if (existingUser && existingUser.id !== userId) {
          sendError(res, null, "Email already in use", 400);
          return;
        }
        await prisma.user.update({
          where: { id: userId },
          data: { email },
        });
      }

      if (password) {
        const hashedPassword = await hashPassword(password);
        await prisma.user.update({
          where: { id: userId },
          data: { password: hashedPassword },
        });
      }

      const updatedUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      const userResponse = {
        id: updatedUser!.id,
        email: updatedUser!.email,
        role: updatedUser!.role,
        walletAddress: updatedUser!.walletAddress,
        isWalletVerified: updatedUser!.isWalletVerified,
      };

      sendSuccess(res, userResponse, "Profile updated successfully", 200);
    } catch (error) {
      sendError(res, error, "Failed to update profile");
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        await redisClient.set(`bl_${token}`, "1", 24 * 60 * 60); // 24 hours
      }
      sendSuccess(res, null, "Logged out successfully", 200);
    } catch (error) {
      sendError(res, error, "Logout failed");
      next(error);
    }
  },

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const allUsers = await prisma.user.findMany({
        orderBy: { createdAt: 'asc' },
      });
      sendSuccess(res, allUsers, "Users fetched successfully", 200);
    } catch (error) {
      sendError(res, error, "Error fetching users", 500);
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
        sendError(res, null, "Refresh token is required", 400);
        return;
      }

      const payload = await verifyRefreshToken(refreshToken);
      // Check if payload exists (verification failed)
      if (!payload || !payload.userId) {
        sendError(res, null, "Invalid or expired refresh token", 401);
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        sendError(res, null, "User not found", 401);
        return;
      }

      if (!user.isActive) {
        sendError(res, null, "Account is deactivated", 401);
        return;
      }

      const tokens = await generateTokenPair(user);

      sendSuccess(res, tokens, "Token refreshed successfully", 200);
    } catch (error) {
      // If verifyRefreshToken throws an error (e.g., invalid signature), it will land here
      // We can check if the error is related to token verification
      if (
        error instanceof Error &&
        (error.message.includes("invalid signature") ||
          error.message.includes("jwt expired"))
      ) {
        sendError(res, null, "Invalid or expired refresh token", 401);
        return;
      }
      sendError(res, error, "Failed to refresh token");
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
        sendError(res, null, "User not authenticated", 401);
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        sendError(res, null, "User not found", 404);
        return;
      }

      const isValidPassword = await comparePassword(currentPassword, user.password);
      if (!isValidPassword) {
        sendError(res, null, "Current password is incorrect", 400);
        return;
      }

      const hashedNewPassword = await hashPassword(newPassword);
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      sendSuccess(res, null, "Password changed successfully", 200);
    } catch (error) {
      sendError(res, error, "Failed to change password");
      next(error);
    }
  },
};
