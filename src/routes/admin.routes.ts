import { Router } from "express";
import { adminController } from "../controllers/admin.controller";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize([UserRole.ADMIN]));

// User management
router.get("/users", adminController.getUsers);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);

// Invitations Management
router.get("/invitations", adminController.getInvitations);

// Employer management
router.get("/employers", adminController.getEmployers);
// router.put('/employers/:id/verify', adminController.verifyEmployer);

// // Employee management
// router.get('/employees', adminController.getEmployees);
// router.put('/employees/:id/verify', adminController.verifyEmployee);

// // Advance management
// router.get('/advances', adminController.getAdvances);
// router.get('/advances/:id', adminController.getAdvanceDetails);
// router.put('/advances/:id/status', adminController.updateAdvanceStatus);

// // Platform stats
// router.get('/stats', adminController.getPlatformStats);
// router.get('/logs', adminController.getSystemLogs);

export default router;
