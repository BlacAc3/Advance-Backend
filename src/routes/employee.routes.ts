import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { employeeController } from '../controllers/employee.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../models/User';

const router = Router();

// All routes require authentication and employee role
router.use(authenticate);
router.use(authorize([UserRole.EMPLOYEE]));

// Get employee profile
router.get(
  '/profile',
  employeeController.getProfile
);

// Update employee profile
router.patch(
  '/profile',
  [
    body('email').optional().isEmail().normalizeEmail(),
    validateRequest,
  ],
  employeeController.updateProfile
);

// Register employee on blockchain
router.post(
  '/register',
  [
    body('employeeId').notEmpty(),
    validateRequest,
  ],
  employeeController.registerOnBlockchain
);

// Get employee's salary advances
router.get(
  '/advances',
  employeeController.getAdvances
);

// Request a new salary advance
router.post(
  '/advances',
  [
    body('amount').isNumeric(),
    body('dueDate').isISO8601(),
    validateRequest,
  ],
  employeeController.requestAdvance
);

// Get advance details
router.get(
  '/advances/:advanceId',
  employeeController.getAdvanceDetails
);

// Repay an advance
router.post(
  '/advances/:advanceId/repay',
  [
    body('amount').isNumeric(),
    validateRequest,
  ],
  employeeController.repayAdvance
);

// Get advance history
router.get(
  '/advances/history',
  employeeController.getAdvanceHistory
);

export { router as employeeRoutes }; 