import { Router, Request, Response } from "express";
import { employeeController } from "../controllers/employee.controller";
import { authenticate, authenticateWeb3 } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";

// Assume this router is part of a larger application setup
const router = Router();

// 2.1. Onboarding & KYC - Accept Employer Invitation
router.post(
  "/api/v1/employees/invitations/:invitationId/accept",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeController.invite,
);

export default router;
