import { User } from "../models/User";
import { Employer } from "../models/Employer";
import { Employee } from "../models/Employee";
import { redisClient } from "../config/redis";
import { logger } from "../utils/logger";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../middleware/auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ethers } from "ethers";
import { UserRole } from "../types";
import { CreationAttributes } from "sequelize";
import crypto from "crypto";

export class AuthService {
  // Traditional email/password registration
  static async register(
    email: string,
    password: string,
    role: UserRole,
    data: any,
  ) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        email,
        password: hashedPassword,
        role,
        isActive: true,
      } as CreationAttributes<User>);

      // Create role-specific profile
      if (role === UserRole.EMPLOYER) {
        await Employer.create({
          userId: user.id,
          companyName: data.companyName,
          companyAddress: data.companyAddress,
          isVerified: false,
        });
      } else if (role === UserRole.EMPLOYEE) {
        await Employee.create({
          userId: user.id,
          employerId: data.employerId,
          salary: data.salary,
          isApproved: false,
        });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions, // Explicitly cast options to help TypeScript resolve overload
      );

      return { user, token };
    } catch (error) {
      logger.error("Registration error:", error);
      throw error;
    }
  }

  // Traditional email/password login
  static async login(email: string, password: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      if (!user.isActive) {
        throw new Error("User account is inactive");
      }

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      } as jwt.SignOptions);

      return { user, token };
    } catch (error) {
      logger.error("Login error:", error);
      throw error;
    }
  }

  // Web3 wallet authentication
  static async authenticateWallet(
    walletAddress: string,
    signature: string,
    message: string,
  ) {
    try {
      // Verify signature
      const recoveredAddress = ethers.verifyMessage(message, signature);
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        throw new Error("Invalid signature");
      }

      // Find or create user
      let user = await User.findOne({ where: { walletAddress } });
      if (!user) {
        const email = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}@web3.user`;
        const password = crypto.randomBytes(32).toString("hex");
        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
          email,
          password: hashedPassword,
          walletAddress,
          role: UserRole.WEB3_USER,
          isActive: true,
        } as CreationAttributes<User>);
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, walletAddress: user.walletAddress },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions, // Explicitly cast options
      );

      return { user, token };
    } catch (error) {
      logger.error("Wallet authentication error:", error);
      throw error;
    }
  }

  // Logout (blacklist token)
  static async logout(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

      // Ensure redisClient is connected and expiresIn is valid before setting
      if (redisClient && expiresIn > 0) {
        // Set the token in Redis with the remaining expiry time
        // The redis client likely expects the expiry time directly as the third argument
        await redisClient.set(`blacklist:${token}`, "1", expiresIn);
      }
    } catch (error) {
      logger.error("Logout error:", error);
      // Depending on requirements, you might want to throw the error
      // if failing to blacklist is a critical failure, but often logout
      // is best-effort from the server perspective after the token is gone.
      // We'll keep the original behavior of catching and logging.
    }
  }

  // Refresh token
  static async refreshToken(refreshToken: string) {
    try {
      // Note: This function currently uses the same secret for refresh token as access token,
      // which is not standard practice. A separate secret or mechanism is usually used
      // for refresh tokens for security.
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
      const user = await User.findByPk(decoded.id);

      if (!user || !user.isActive) {
        throw new Error("Invalid refresh token");
      }

      // Check if the token is blacklisted (if using refresh tokens with blacklisting)
      // This implementation assumes refresh tokens aren't blacklisted, only access tokens.
      // If refresh token blacklisting is needed, add a check here.

      const newToken = jwt.sign(
        { id: user.id, role: user.role, walletAddress: user.walletAddress },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions, // Explicitly cast options
      );

      return { token: newToken, user };
    } catch (error) {
      logger.error("Token refresh error:", error);
      throw error;
    }
  }

  // Change password
  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!isValidPassword) {
        throw new Error("Invalid current password");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });

      return true;
    } catch (error) {
      logger.error("Password change error:", error);
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(userId: string, data: any) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      await user.update(data);
      return user;
    } catch (error) {
      logger.error("Profile update error:", error);
      throw error;
    }
  }
}
