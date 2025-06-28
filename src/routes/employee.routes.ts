import { Router, Request, Response } from "express";
import { employeeController } from "../controllers/employee.controller";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";

// Assume this router is part of a larger application setup
const router = Router();

// 2.1. Onboarding & KYC - Accept Employer Invitation
router.post("/invite/", employeeController.acceptInvite);
router.post(
  "/kyc",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeController.submitKYC,
);
router.get(
  "/kyc",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeController.getKYC,
);

export default router;
