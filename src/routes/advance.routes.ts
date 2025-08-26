import { Router } from "express";
import { employeeAdvanceController } from "../controllers/advance/employee.advance.controller";
import { employerAdvanceController } from "../controllers/advance/employer.advance.controller";
import { internalAdvanceController } from "../controllers/advance/internal.advance.controller";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";

const router = Router();

// ============================================
// Internal System Routes (Admin/System Only)
// ============================================

// Process payroll payment and auto-deduct advances
router.post(
  "/internal/payroll/process-payment",
  authenticate,
  authorize([UserRole.ADMIN]),
  internalAdvanceController.processPayrollPayment,
);

// Process risk adjustments
router.post(
  "/internal/risk/adjustments",
  authenticate,
  authorize([UserRole.ADMIN]),
  internalAdvanceController.processRiskAdjustments,
);

// Process tier upgrades
router.post(
  "/internal/risk/tier-upgrade",
  authenticate,
  authorize([UserRole.ADMIN]),
  internalAdvanceController.processTierUpgrades,
);

// Process defaulted advances
router.post(
  "/internal/advances/process-defaults",
  authenticate,
  authorize([UserRole.ADMIN]),
  internalAdvanceController.processDefaultedAdvances,
);

export default router;
