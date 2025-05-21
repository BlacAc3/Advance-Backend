import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { UserRole } from '../models/User';
import { logger } from './logger';

export interface TokenPayload {
  userId: string;
  role?: UserRole;
  walletAddress?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class JWTError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JWTError';
  }
}

export const generateTokenPair = (payload: TokenPayload): TokenPair => {
  try {
    const accessTokenOptions: SignOptions = {
      expiresIn: '1h' // Default to 1 hour if not specified
    };

    const refreshTokenOptions: SignOptions = {
      expiresIn: '7d' // Default to 7 days if not specified
    };

    const accessToken = jwt.sign(
      { ...payload },
      process.env.JWT_SECRET as Secret,
      accessTokenOptions
    );

    const refreshToken = jwt.sign(
      { userId: payload.userId },
      process.env.JWT_REFRESH_SECRET as Secret,
      refreshTokenOptions
    );

    return { accessToken, refreshToken };
  } catch (error) {
    logger.error('Failed to generate token pair:', error);
    throw new JWTError('Failed to generate tokens');
  }
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as TokenPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new JWTError('Access token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new JWTError('Invalid access token');
    }
    logger.error('Failed to verify access token:', error);
    throw new JWTError('Failed to verify access token');
  }
};

export const verifyRefreshToken = (token: string): { userId: string } => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as Secret) as { userId: string };
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new JWTError('Refresh token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new JWTError('Invalid refresh token');
    }
    logger.error('Failed to verify refresh token:', error);
    throw new JWTError('Failed to verify refresh token');
  }
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch (error) {
    logger.error('Failed to decode token:', error);
    return null;
  }
}; 