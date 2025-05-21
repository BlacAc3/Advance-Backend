import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { adminController } from '../controllers/admin.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../models/User';

const router = Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorize([UserRole.ADMIN]));

// Get platform statistics
router.get(
  '/stats',
  adminController.getPlatformStats
);

// Get all users
router.get(
  '/users',
  adminController.getAllUsers
);

// Get user details
router.get(
  '/users/:userId',
  adminController.getUserDetails
);

// Update user status
router.patch(
  '/users/:userId/status',
  [
    body('isActive').isBoolean(),
    validateRequest,
  ],
  adminController.updateUserStatus
);

// Get all employers
router.get(
  '/employers',
  adminController.getAllEmployers
);

// Verify employer
router.post(
  '/employers/:employerId/verify',
  [
    body('verifiedBy').matches(/^0x[a-fA-F0-9]{40}$/),
    validateRequest,
  ],
  adminController.verifyEmployer
);

// Get all employees
router.get(
  '/employees',
  adminController.getAllEmployees
);

// Verify employee
router.post(
  '/employees/:employeeId/verify',
  [
    body('verifiedBy').matches(/^0x[a-fA-F0-9]{40}$/),
    validateRequest,
  ],
  adminController.verifyEmployee
);

// Get all advances
router.get(
  '/advances',
  adminController.getAllAdvances
);

// Get advance details
router.get(
  '/advances/:advanceId',
  adminController.getAdvanceDetails
);

// Update advance status
router.patch(
  '/advances/:advanceId/status',
  [
    body('status').isIn(['APPROVED', 'REJECTED', 'PAID', 'REPAID', 'DEFAULTED']),
    validateRequest,
  ],
  adminController.updateAdvanceStatus
);

// Get liquidity pool statistics
router.get(
  '/liquidity-pool/stats',
  adminController.getLiquidityPoolStats
);

// Get system logs
router.get(
  '/logs',
  [
    body('level').optional().isIn(['error', 'warn', 'info', 'debug']),
    body('startDate').optional().isISO8601(),
    body('endDate').optional().isISO8601(),
    validateRequest,
  ],
  adminController.getSystemLogs
);

export { router as adminRoutes }; 