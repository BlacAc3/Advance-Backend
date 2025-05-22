import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { User } from '../models/User';
import { UserRole } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
        walletAddress?: string;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new ApiError(401, 'No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: UserRole; walletAddress?: string };
    
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = {
      id: user.id,
      role: user.role,
      walletAddress: user.walletAddress
    };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, 'Invalid token');
    }
    next(error);
  }
}; 