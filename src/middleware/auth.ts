import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { redisClient } from "../config/redis";
import { verifyRefreshToken, generateTokenPair } from "../utils/jwt";
import { JWTError, ApiError } from "../utils/errors/index";
import { ethers } from "ethers";
import { UserRole, TokenPayload, CreateUserAttributes } from "../types";
import userModel from "../db/services/user";
import { hashPassword } from "../utils/password";

export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"; // Default to 1 hour

// Define a type for requests that have been authenticated
interface AuthenticatedRequest extends Request {
  user: TokenPayload;
}

// Middleware to authenticate JWT token
export const authenticateToken = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "No token provided");
    }

    // Check if token is blacklisted
    const isBlacklisted = await redisClient.get(`bl_${token}`);
    if (isBlacklisted) {
      throw new ApiError(401, "Token has been revoked");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    const user = await userModel.get({ id: decoded.userId });

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    if (!user.isActive) {
      throw new ApiError(401, "User account is inactive");
    }

    // Set the user property on the request
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, "Invalid token"));
    } else if (error instanceof ApiError) {
      next(error);
    } else if (error instanceof Error) {
      next(new ApiError(500, error.message));
    } else {
      next(new ApiError(500, "An unknown error occurred"));
    }
  }
};

// Middleware to check user role
export const requireRole = (roles: UserRole[]) => {
  return (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction,
  ): void => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Insufficient permissions");
    }
    next();
  };
};

// Middleware to authenticate wallet
export const authenticateWallet = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { walletAddress, signature, message } = req.body;

    if (!walletAddress || !signature || !message) {
      throw new ApiError(400, "Missing wallet authentication data");
    }

    // Verify signature
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      throw new ApiError(401, "Invalid signature");
    }

    // Find or create user
    let user = await userModel.get({ walletAddress });
    if (!user) {
      const randomBytes = ethers.randomBytes(32);
      const userData = {
        email: `${walletAddress}@web3.user`,
        password: ethers.hexlify(randomBytes),
        role: UserRole.WEB3_USER,
        walletAddress,
      };
      user = await userModel.create(userData);
    }

    // Generate tokens
    const tokens = await generateTokenPair(user);

    res.json({
      user: {
        id: user.id,
        role: user.role,
        walletAddress: user.walletAddress,
        isWalletVerified: user.isWalletVerified,
      },
      ...tokens,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else if (error instanceof Error) {
      next(new ApiError(500, error.message));
    } else {
      next(new ApiError(500, "An unknown error occurred"));
    }
  }
};

// Middleware to refresh token
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ApiError(400, "Refresh token is required");
    }

    const payload = await verifyRefreshToken(refreshToken);
    const user = await userModel.get({ id: payload.userId });

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    if (!user.isActive) {
      throw new ApiError(401, "User account is inactive");
    }

    const tokens = await generateTokenPair(user);

    res.json(tokens);
  } catch (error) {
    if (error instanceof JWTError) {
      next(new ApiError(401, error.message));
    } else if (error instanceof ApiError) {
      next(error);
    } else if (error instanceof Error) {
      next(new ApiError(500, error.message));
    } else {
      next(new ApiError(500, "An unknown error occurred"));
    }
  }
};

// Combined middleware for regular authentication
export const requireAuth = [authenticateToken];

// Combined middleware for web3 authentication
export const requireWeb3Auth = [
  authenticateToken,
  (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user.walletAddress) {
      throw new ApiError(401, "Web3 authentication required");
    }
    next();
  },
];

// Combined middleware for wallet authentication
export const requireWallet = [
  authenticateToken,
  (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user.walletAddress) {
      throw new ApiError(401, "Wallet authentication required");
    }
    next();
  },
];

// Combined middleware for verified wallet
export const requireVerifiedWallet = [
  authenticateToken,
  async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    if (!req.user.walletAddress) {
      throw new ApiError(401, "Wallet authentication required");
    }

    const user = await userModel.get({ walletAddress: req.user.walletAddress });
    if (!user?.isWalletVerified) {
      throw new ApiError(403, "Wallet not verified");
    }

    next();
  },
];
