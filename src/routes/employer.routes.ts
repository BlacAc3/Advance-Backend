import express from "express";
import { employerController } from "../controllers/employer.controller";
import { PayrollController } from "../controllers/payroll.controller";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";
import multer from "multer";
import { employerAdvanceController } from "../controllers/advance/employer.advance.controller";

// Configure multer for payroll uploads
const payrollUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
      "application/json",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Unsupported file type"));
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post("/register", employerController.employerRegister);

router.use(authenticate);
router.use(authorize([UserRole.EMPLOYER]));

router.post(
  "/send-invite",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerController.sendInvite,
);
router.post(
  "/payroll/upload",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  payrollUpload.single("payrollFile"),
  (error: any, req: any, res: any, next: any) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  },
  employerController.uploadPayroll,
);

router.post(
  "/extract",
  PayrollController.uploadMiddleware,
  (error: any, req: any, res: any, next: any) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  },
  PayrollController.extractPayrollData,
);

// Bulk processing endpoint
router.post("/bulk-extract", PayrollController.processBulkPayroll);

router.get(
  "/get-employees",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerController.getEmployees,
);

// API Integration for bank history verification
router.post(
  "/setup-api-integration",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerController.setupApiIntegration,
);

router.get(
  "/advances/pending",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.getPendingAdvances,
);

// Approve an advance request
router.post(
  "/advance/:requestId/approve",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.approveAdvance,
);

// Reject an advance request
router.post(
  "/advance/:requestId/reject",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.rejectAdvance,
);

// Get all advances for employer
router.get(
  "/advances/all",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.getAllAdvances,
);

// Get advance statistics
router.get(
  "/advances/statistics",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.getAdvanceStatistics,
);

// Update advance settings
router.put(
  "/advances/settings",
  authenticate,
  authorize([UserRole.EMPLOYER]),
  employerAdvanceController.updateAdvanceSettings,
);

export default router;
