import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { UserRole } from "../types"; // Note: UserRole is imported but not used in this specific file's logic.
import { logger } from "./logger";
import { redisClient } from "../config/redis"; // Assuming redisClient is correctly initialized elsewhere
import { TokenPayload } from "../types"; // Assuming TokenPayload type is correctly defined elsewhere
import { JWTError } from "./errors/index"; // Assuming JWTError is correctly defined and imported
import { User } from "../models";

// Constants for JWT configuration
export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Should ideally be a strong, secret key from environment
const JWT_EXPIRES_IN = "1h"; // Access token expiration
const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60; // Refresh token expiration in seconds (7 days)

// Interface for the returned token pair
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Generates an access token and a refresh token for a given payload.
 * Stores the refresh token in Redis associated with the user ID.
 *
 * @param payload - The data to include in the access token (must contain userId).
 * @returns A promise resolving to an object containing the access token and refresh token.
 * @throws {JWTError} If token generation or storage fails.
 */
export const generateTokenPair = async (user: any): Promise<TokenPair> => {
  try {
    // Define options for access and refresh tokens
    const accessTokenOptions: SignOptions = {
      expiresIn: JWT_EXPIRES_IN, // Use string format for jwt.sign expiresIn
    };

    // Note: refreshTokenOptions expiresIn needs to be a number if setting via redisClient.set expiration time
    // It's better to use the number value directly for consistency and clarity when setting Redis expiration.
    const refreshTokenOptions: SignOptions = {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN, // Use number format for jwt.sign expiresIn
    };

    // Sign the tokens
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET as Secret,
      accessTokenOptions,
    );
    // Refresh token typically only contains minimal info like userId
    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET as Secret,
      refreshTokenOptions,
    );

    await redisClient.set(
      `refresh_${user.id}`,
      refreshToken,
      REFRESH_TOKEN_EXPIRES_IN,
    );

    // Return the generated tokens
    return { accessToken, refreshToken };
  } catch (error) {
    // Log the original error for debugging
    logger.error("Failed to generate token pair:", error);
    // Rethrow a specific JWTError
    if (error instanceof Error) {
      throw new JWTError(`Failed to generate token pair: ${error.message}`);
    }
    throw new JWTError("Failed to generate token pair");
  }
};

/**
 * Verifies the authenticity and validity of an access token.
 *
 * @param token - The access token string.
 * @returns The decoded payload if the token is valid.
 * @throws {JWTError} If the token is invalid or expired.
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    // Verify the token signature and expiration
    const decoded = jwt.verify(token, JWT_SECRET as Secret) as TokenPayload;
    return decoded;
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.TokenExpiredError) {
      throw new JWTError("Access token expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new JWTError("Invalid access token");
    }
    // Log other verification errors
    logger.error("Failed to verify access token:", error);
    throw new JWTError("Failed to verify access token");
  }
};

/**
 * Verifies the authenticity and validity of a refresh token.
 * Checks both the token signature and if it matches the token stored in Redis for the user.
 *
 * @param token - The refresh token string.
 * @returns A promise resolving to an object containing the userId from the token payload.
 * @throws {JWTError} If the token is invalid, expired, or doesn't match the stored token.
 */
export const verifyRefreshToken = async (
  token: string,
): Promise<{ userId: string }> => {
  try {
    // Verify the token signature and expiration
    // Note: Refresh tokens should also ideally contain expiration in the JWT payload
    const decoded = jwt.verify(token, JWT_SECRET as Secret) as {
      userId: string;
    };

    // Check if the token exists and matches the one stored in Redis for this user
    const storedToken = await redisClient.get(`refresh_${decoded.userId}`);

    if (!storedToken || storedToken !== token) {
      // If no token found in Redis or tokens don't match, it's invalid
      throw new JWTError("Invalid refresh token");
    }

    // Return minimal decoded payload
    return decoded;
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      throw new JWTError("Invalid refresh token");
    }
    // Log and rethrow other errors (e.g., Redis connection issues)
    logger.error("Failed to verify refresh token:", error);
    throw error; // Re-throw the caught error as it might be a system/Redis error
  }
};

/**
 * Decodes a JWT without verifying its signature or expiration.
 * Useful for inspecting token payload, but should not be used for authentication checks.
 *
 * @param token - The token string.
 * @returns The decoded payload, or null if decoding fails.
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    // jwt.decode does not verify anything
    const decoded = jwt.decode(token);
    if (decoded === null || typeof decoded === "string") {
      // Decode can return string or null for invalid tokens
      logger.warn("Failed to decode token: Invalid format");
      return null;
    }
    return decoded as TokenPayload; // Type assertion based on expected payload structure
  } catch (error) {
    // Log any other decoding errors
    logger.error("Failed to decode token:", error);
    return null;
  }
};

/**
 * Blacklists a specific token by storing it in Redis with a TTL.
 * This is typically used for invalidating access tokens on logout or explicit revocation.
 *
 * @param token - The token string to blacklist.
 * @param expiresIn - The time in seconds until the blacklist entry expires (should match token expiry).
 */
export const blacklistToken = async (token: string, expiresIn: number) => {
  try {
    // Store the token in Redis with a simple value and expiration
    // The key format `bl_{token}` allows checking for existence
    await redisClient.set(`bl_${token}`, "1", expiresIn); // Set expiration time in seconds
    logger.info(`Token blacklisted: ${token}`);
  } catch (error) {
    // Log errors related to Redis storage
    logger.error(`Failed to blacklist token ${token}:`, error);
    // Depending on requirements, you might want to rethrow or handle this error
  }
};

/**
 * Revokes all refresh tokens for a specific user by deleting their entry from Redis.
 * This effectively forces the user to re-login.
 *
 * @param userId - The ID of the user whose refresh tokens should be revoked.
 */
export const revokeRefreshToken = async (userId: string) => {
  try {
    // Delete the refresh token stored for this user ID
    await redisClient.del(`refresh_${userId}`);
    logger.info(`Refresh token revoked for user: ${userId}`);
  } catch (error) {
    // Log errors related to Redis deletion
    logger.error(`Failed to revoke refresh token for user ${userId}:`, error);
    // Depending on requirements, you might want to rethrow or handle this error
  }
};
