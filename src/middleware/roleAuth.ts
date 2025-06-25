import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

// Define role hierarchy and permissions
const roleHierarchy: Record<UserRole, UserRole[]> = {
  [UserRole.ADMIN]: [
    UserRole.ADMIN,
    UserRole.EMPLOYER,
    UserRole.EMPLOYEE,
    UserRole.WEB3_USER,
    UserRole.MARKETER,
  ],
  [UserRole.EMPLOYER]: [UserRole.EMPLOYER, UserRole.EMPLOYEE],
  [UserRole.MARKETER]: [UserRole.EMPLOYER],
  [UserRole.EMPLOYEE]: [UserRole.EMPLOYEE],
  [UserRole.WEB3_USER]: [UserRole.WEB3_USER],
  [UserRole.REGULAR_USER]: [UserRole.REGULAR_USER],
};

// Custom error for authorization
export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

// Middleware to check if user has required role
export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AuthorizationError("User not authenticated");
      }

      const userRole = req.user.role;
      const hasRole = allowedRoles.some((role) =>
        roleHierarchy[userRole]?.includes(role),
      );

      if (!hasRole) {
        throw new AuthorizationError("Insufficient permissions");
      }

      return next();
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return res.status(403).json({
          status: "error",
          message: error.message,
        });
      }
      logger.error("Role authorization error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error during authorization",
      });
    }
  };
};

// Middleware to check if user has required permission

// Helper function to check if user has any of the required permissions
