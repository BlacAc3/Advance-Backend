import express from "express";
import { employerController } from "../controllers/employer.controller";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";

const router = express.Router();

router.post("/register", employerController.employerRegister);
router.post(
  "/send-invite",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerController.sendInvite,
);
router.post("/payroll/upload", employerController.uploadPayroll);

router.post(
  "/extract",
  PayrollController.uploadMiddleware,
  PayrollController.extractPayrollData,
);

// Bulk processing endpoint
router.post("/bulk-extract", PayrollController.processBulkPayroll);

export default router;

export default router;
