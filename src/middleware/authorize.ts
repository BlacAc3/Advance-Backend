import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types";

// The error "Property '[UserRole.MARKETER]' is missing in type" occurs because the Record<UserRole, UserRole[]> type
// enforces that all possible values of the UserRole enum must be present as keys in the roleHierarchy object.
// Currently, the UserRole.MARKETER is missing in the roleHierarchy

// const roleHierarchy: Record<UserRole, UserRole[]> = {
//   [UserRole.ADMIN]: [
//     UserRole.ADMIN,
//     UserRole.EMPLOYER,
//     UserRole.EMPLOYEE,
//     UserRole.WEB3_USER,
//   ],
//   [UserRole.EMPLOYER]: [UserRole.EMPLOYER, UserRole.EMPLOYEE],
//   [UserRole.EMPLOYEE]: [UserRole.EMPLOYEE],
//   [UserRole.WEB3_USER]: [UserRole.WEB3_USER],
//   [UserRole.REGULAR_USER]: [UserRole.REGULAR_USER],
//   [UserRole.MARKETER]: [UserRole.MARKETER], // Added to solve the error
// };
// const rolePermissions: Record<UserRole, string[]> = {
//   [UserRole.ADMIN]: [
//     "manage_users",
//     "manage_employers",
//     "manage_employees",
//     "manage_advances",
//     "view_reports",
//     "manage_settings",
//   ],
//   [UserRole.EMPLOYER]: ["manage_employees", "manage_advances", "view_reports"],
//   [UserRole.EMPLOYEE]: ["request_advances", "view_advances"],
//   [UserRole.WEB3_USER]: ["stake_tokens", "unstake_tokens", "claim_rewards"],
//   [UserRole.REGULAR_USER]: [
//     "view_profile",
//     "update_profile",
//     "view_public_data",
//     "submit_general_inquiry",
//   ],
// };
export const authorize = (requiredRoles: UserRole[]) => {
  return (req: Request, res: Response, next: any) => {
    const userRole = req.user?.role as UserRole;

    if (!userRole || !requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    return next();
  };
};

// export const authorizePermission = (requiredPermission: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const userRole = req.user?.role as UserRole;

//     if (!userRole) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     const hasPermission =
//       rolePermissions[userRole]?.includes(requiredPermission);
//     if (!hasPermission) {
//       return res.status(403).json({ message: "Insufficient permissions" });
//     }

//     return next();
//   };
// };

// export const authorizeHierarchy = (requiredRole: UserRole) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const userRole = req.user?.role as UserRole;

//     if (!userRole) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     const hasPermission = roleHierarchy[userRole]?.includes(requiredRole);
//     if (!hasPermission) {
//       return res.status(403).json({ message: "Insufficient permissions" });
//     }

//     return next();
//   };
// };
