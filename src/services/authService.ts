import { User } from '../models/User';
import { Employer } from '../models/Employer';
import { Employee } from '../models/Employee';
import { redisClient } from '../config/redis';
import { logger } from '../utils/logger';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../middleware/auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ethers } from 'ethers';

export class AuthService {
  // Traditional email/password registration
  static async register(email: string, password: string, role: string, data: any) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        email,
        password: hashedPassword,
        role,
        isActive: true
      });

      // Create role-specific profile
      if (role === 'EMPLOYER') {
        await Employer.create({
          userId: user.id,
          companyName: data.companyName,
          companyAddress: data.companyAddress,
          isVerified: false
        });
      } else if (role === 'EMPLOYEE') {
        await Employee.create({
          userId: user.id,
          employerId: data.employerId,
          salary: data.salary,
          isApproved: false
        });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return { user, token };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  // Traditional email/password login
  static async login(email: string, password: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      if (!user.isActive) {
        throw new Error('User account is inactive');
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return { user, token };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  // Web3 wallet authentication
  static async authenticateWallet(walletAddress: string, signature: string, message: string) {
    try {
      // Verify signature
      const recoveredAddress = ethers.verifyMessage(message, signature);
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        throw new Error('Invalid signature');
      }

      // Find or create user
      let user = await User.findOne({ where: { walletAddress } });
      if (!user) {
        user = await User.create({
          walletAddress,
          role: 'WEB3_USER',
          isActive: true
        });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, walletAddress: user.walletAddress },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return { user, token };
    } catch (error) {
      logger.error('Wallet authentication error:', error);
      throw error;
    }
  }

  // Logout (blacklist token)
  static async logout(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      
      if (expiresIn > 0) {
        await redisClient.set(`blacklist:${token}`, '1', expiresIn);
      }
    } catch (error) {
      logger.error('Logout error:', error);
      throw error;
    }
  }

  // Refresh token
  static async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
      const user = await User.findByPk(decoded.id);

      if (!user || !user.isActive) {
        throw new Error('Invalid refresh token');
      }

      const newToken = jwt.sign(
        { id: user.id, role: user.role, walletAddress: user.walletAddress },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return { token: newToken, user };
    } catch (error) {
      logger.error('Token refresh error:', error);
      throw error;
    }
  }

  // Change password
  static async changePassword(userId: string, currentPassword: string, newPassword: string) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid current password');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });

      return true;
    } catch (error) {
      logger.error('Password change error:', error);
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(userId: string, data: any) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      await user.update(data);
      return user;
    } catch (error) {
      logger.error('Profile update error:', error);
      throw error;
    }
  }
} 