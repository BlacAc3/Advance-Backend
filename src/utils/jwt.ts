import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { UserRole } from '../types';
import { logger } from './logger';
import { redisClient } from '../config/redis';
import { TokenPayload } from '../types';
import { JWTError } from './errors/index';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '1h'; // 1 hour
const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60; // 7 days in seconds

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export const generateTokenPair = async (payload: TokenPayload): Promise<TokenPair> => {
  try {
    const accessTokenOptions: SignOptions = {
      expiresIn: JWT_EXPIRES_IN
    };

    const refreshTokenOptions: SignOptions = {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, accessTokenOptions);
    const refreshToken = jwt.sign({ userId: payload.userId }, JWT_SECRET, refreshTokenOptions);

    // Store refresh token in Redis with expiration
    await redisClient.set(`refresh_${payload.userId}`, refreshToken, REFRESH_TOKEN_EXPIRES_IN);

    return { accessToken, refreshToken };
  } catch (error) {
    if (error instanceof Error) {
      throw new JWTError(`Failed to generate token pair: ${error.message}`);
    }
    throw new JWTError('Failed to generate token pair');
  }
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as Secret) as TokenPayload;
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

export const verifyRefreshToken = async (token: string): Promise<{ userId: string }> => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const storedToken = await redisClient.get(`refresh_${decoded.userId}`);

    if (!storedToken || storedToken !== token) {
      throw new JWTError('Invalid refresh token');
    }

    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new JWTError('Invalid refresh token');
    }
    throw error;
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

export const blacklistToken = async (token: string, expiresIn: number) => {
  await redisClient.set(`bl_${token}`, '1', expiresIn);
};

export const revokeRefreshToken = async (userId: string) => {
  await redisClient.del(`refresh_${userId}`);
}; 