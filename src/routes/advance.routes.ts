import { Router } from "express";
import { employeeAdvanceController } from "../controllers/advance/employee.advance.controller";
import { employerAdvanceController } from "../controllers/advance/employer.advance.controller";
import { internalAdvanceController } from "../controllers/advance/internal.advance.controller";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";

const router = Router();

// ============================================
// Employee Advance Routes
// ============================================

// Get advance status and eligibility
router.get(
  "/employee/advance/status",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeAdvanceController.getAdvanceStatus
);

// Request an advance
router.post(
  "/employee/advance/request",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeAdvanceController.requestAdvance
);

// Get advance history
router.get(
  "/employee/advance/history",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeAdvanceController.getAdvanceHistory
);

// Cancel a pending advance request
router.delete(
  "/employee/advance/:advanceId/cancel",
  authenticate,
  authorize([UserRole.EMPLOYEE]),
  employeeAdvanceController.cancelAdvanceRequest
);

// ============================================
// Employer Advance Management Routes
// ============================================

// Get pending advance requests
router.get(
  "/employer/advances/pending",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.getPendingAdvances
);

// Approve an advance request
router.post(
  "/employer/advance/:requestId/approve",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.approveAdvance
);

// Reject an advance request
router.post(
  "/employer/advance/:requestId/reject",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.rejectAdvance
);

// Get all advances for employer
router.get(
  "/employer/advances/all",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.getAllAdvances
);

// Get advance statistics
router.get(
  "/employer/advances/statistics",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.getAdvanceStatistics
);

// Update advance settings
router.put(
  "/employer/advances/settings",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.updateAdvanceSettings
);

// ============================================
// Internal System Routes (Admin/System Only)
// ============================================

// Process payroll payment and auto-deduct advances
router.post(
  "/internal/payroll/process-payment",
  authenticate,
  authorize([UserRole.ADMIN]),
  internalAdvanceController.processPayrollPayment
);

// Process risk adjustments
router.post(
  "/internal/risk/adjustments",
  authenticate,
  authorize([UserRole.ADMIN]),
  internalAdvanceController.processRiskAdjustments
);

// Process tier upgrades
router.post(
  "/internal/risk/tier-upgrade",
  authenticate,
  authorize([UserRole.ADMIN]),
  internalAdvanceController.processTierUpgrades
);

// Process defaulted advances
router.post(
  "/internal/advances/process-defaults",
  authenticate,
  authorize([UserRole.ADMIN]),
  internalAdvanceController.processDefaultedAdvances
);

export default router;
