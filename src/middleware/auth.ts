import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { redisClient } from '../config/redis';
import { logger } from '../utils/logger';
import { User } from '../models/User';
import { verifyAccessToken, verifyRefreshToken, generateTokenPair, JWTError } from '../utils/jwt';
import { ethers } from 'ethers';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        walletAddress?: string;
      };
    }
  }
}

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRES_IN = '24h';

// Middleware to verify JWT token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication token required' });
    }

    // Check if token is blacklisted
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token has been invalidated' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Verify user still exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
      walletAddress: decoded.walletAddress
    };

    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Role-based access control middleware
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

// Web3 wallet authentication middleware
export const authenticateWallet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { signature, message, walletAddress } = req.body;

    if (!signature || !message || !walletAddress) {
      return res.status(400).json({ message: 'Missing required wallet authentication parameters' });
    }

    // Verify signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    // Find or create user with wallet address
    let user = await User.findOne({ where: { walletAddress } });
    if (!user) {
      user = await User.create({
        walletAddress,
        role: 'WEB3_USER'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        walletAddress: user.walletAddress
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    req.user = {
      id: user.id,
      role: user.role,
      walletAddress: user.walletAddress
    };

    res.json({ token, user: { id: user.id, role: user.role, walletAddress: user.walletAddress } });
  } catch (error) {
    logger.error('Wallet authentication error:', error);
    return res.status(401).json({ message: 'Wallet authentication failed' });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: 'error',
        message: 'Refresh token is required'
      });
    }

    try {
      const { userId } = verifyRefreshToken(refreshToken);
      
      // Find user in database
      const user = await User.findByPk(userId);
      
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          status: 'error',
          message: 'User account is inactive'
        });
      }

      // Generate new token pair
      const tokenPair = generateTokenPair({
        userId: user.id.toString(),
        role: user.role,
        walletAddress: user.walletAddress
      });

      res.json({
        status: 'success',
        data: {
          accessToken: tokenPair.accessToken,
          refreshToken: tokenPair.refreshToken
        }
      });
    } catch (error) {
      if (error instanceof JWTError) {
        return res.status(401).json({
          status: 'error',
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    logger.error('Token refresh error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during token refresh'
    });
  }
}; 