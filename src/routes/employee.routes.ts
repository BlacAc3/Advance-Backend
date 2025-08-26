import { Router, Request, Response } from "express";
import { employeeController } from "../controllers/employee.controller";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";
import { employeeAdvanceController } from "../controllers/advance/employee.advance.controller";

// Assume this router is part of a larger application setup
const router = Router();

// 2.1. Onboarding & KYC - Accept Employer Invitation
router.post("/invite/", employeeController.register);

router.use(authenticate);
router.use(authorize([UserRole.EMPLOYEE]));

router.post("/onboarding/kyc/", employeeController.submitKyc);
router.post("/onboarding/bankaccount/", employeeController.registerBankaccount);
router.post("/onboarding/accept-terms/", employeeController.acceptTerms);

router.get(
  "/advance/status",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeAdvanceController.getAdvanceStatus,
);

// Request an advance
router.post(
  "/advance/request",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeAdvanceController.requestAdvance,
);

// Get advance history
router.get(
  "/advance/history",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeAdvanceController.getAdvanceHistory,
);

// Cancel a pending advance request
router.delete(
  "/advance/:advanceId/cancel",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeAdvanceController.cancelAdvanceRequest,
);

export default router;
