import express from "express";
import { employerController } from "../controllers/employer.controller";
import { PayrollController } from "../controllers/payroll.controller";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";
import { UserRole } from "../types";
import multer from "multer";

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

export default router;
