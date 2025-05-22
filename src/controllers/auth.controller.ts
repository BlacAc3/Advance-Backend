import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { ApiError } from '../utils/errors/index';
import { UserRole, TokenPayload, UserResponse } from '../types';
import bcrypt from 'bcrypt';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/password';
import { CreationAttributes } from 'sequelize';
import { redisClient } from '../config/redis';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, role } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new ApiError(400, 'Email already registered');
      }

      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        email,
        password: hashedPassword,
        role: role || UserRole.REGULAR_USER,
        isActive: true,
        isWalletVerified: false
      } as CreationAttributes<User>);

      const tokens = await generateTokenPair({
        userId: user.id,
        role: user.role,
        walletAddress: user.walletAddress
      });

      const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        isWalletVerified: user.isWalletVerified
      };

      res.status(201).json({
        user: userResponse,
        ...tokens
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new ApiError(401, 'Invalid credentials');
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        throw new ApiError(401, 'Invalid credentials');
      }

      if (!user.isActive) {
        throw new ApiError(401, 'Account is deactivated');
      }

      const tokens = await generateTokenPair({
        userId: user.id,
        role: user.role,
        walletAddress: user.walletAddress
      });

      const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        isWalletVerified: user.isWalletVerified
      };

      res.json({
        user: userResponse,
        ...tokens
      });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new ApiError(401, 'Unauthorized');
      }

      const user = await User.findByPk(userId, {
        attributes: ['id', 'email', 'role', 'walletAddress', 'createdAt']
      });

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        isWalletVerified: user.isWalletVerified
      };

      res.json(userResponse);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new ApiError(401, 'Unauthorized');
      }

      const { email, password } = req.body;
      const user = await User.findByPk(userId);

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      if (email) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && existingUser.id !== userId) {
          throw new ApiError(400, 'Email already in use');
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
        isWalletVerified: user.isWalletVerified
      };

      res.json(userResponse);
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        await redisClient.set(`bl_${token}`, '1', 24 * 60 * 60); // 24 hours
      }
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  },

  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'role', 'walletAddress', 'createdAt'],
        order: [['createdAt', 'DESC']]
      });
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new ApiError(400, 'Refresh token is required');
      }

      const payload = await verifyRefreshToken(refreshToken);
      const user = await User.findByPk(payload.userId);

      if (!user) {
        throw new ApiError(401, 'User not found');
      }

      if (!user.isActive) {
        throw new ApiError(401, 'Account is deactivated');
      }

      const tokens = await generateTokenPair({
        userId: user.id,
        role: user.role,
        walletAddress: user.walletAddress
      });

      res.json(tokens);
    } catch (error) {
      next(error);
    }
  },

  async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        throw new ApiError(401, 'User not authenticated');
      }

      const user = await User.findByPk(userId);
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      const isValidPassword = await user.validatePassword(currentPassword);
      if (!isValidPassword) {
        throw new ApiError(401, 'Current password is incorrect');
      }

      user.password = newPassword;
      await user.save();

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  }
}; 