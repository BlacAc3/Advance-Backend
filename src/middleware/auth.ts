import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, verifyRefreshToken, generateTokenPair, JWTError } from '../utils/jwt';
import { logger } from '../utils/logger';
import { User } from '../models/User';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyAccessToken(token);
      
      // Find user in database
      const user = await User.findByPk(decoded.userId);
      
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

      // Attach user to request object
      req.user = user;
      next();
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
    logger.error('Authentication error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during authentication'
    });
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