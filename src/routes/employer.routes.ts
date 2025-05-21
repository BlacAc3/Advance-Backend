import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { employerController } from '../controllers/employer.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../models/User';

const router = Router();

// All routes require authentication and employer role
router.use(authenticate);
router.use(authorize([UserRole.EMPLOYER]));

// Get employer profile
router.get(
  '/profile',
  employerController.getProfile
);

// Update employer profile
router.patch(
  '/profile',
  [
    body('companyName').optional().notEmpty(),
    body('companyId').optional().notEmpty(),
    validateRequest,
  ],
  employerController.updateProfile
);

// Register employer on blockchain
router.post(
  '/register',
  [
    body('companyName').notEmpty(),
    body('companyId').notEmpty(),
    validateRequest,
  ],
  employerController.registerOnBlockchain
);

// Get employer's employees
router.get(
  '/employees',
  employerController.getEmployees
);

// Add new employee
router.post(
  '/employees',
  [
    body('email').isEmail().normalizeEmail(),
    body('walletAddress').matches(/^0x[a-fA-F0-9]{40}$/),
    body('employeeId').notEmpty(),
    body('salary').isNumeric(),
    validateRequest,
  ],
  employerController.addEmployee
);

// Update employee details
router.patch(
  '/employees/:employeeId',
  [
    body('salary').optional().isNumeric(),
    body('isVerified').optional().isBoolean(),
    validateRequest,
  ],
  employerController.updateEmployee
);

// Get liquidity pool transactions
router.get(
  '/liquidity-pool',
  employerController.getLiquidityPoolTransactions
);

// Contribute to liquidity pool
router.post(
  '/liquidity-pool/contribute',
  [
    body('amount').isNumeric(),
    validateRequest,
  ],
  employerController.contributeToPool
);

// Withdraw from liquidity pool
router.post(
  '/liquidity-pool/withdraw',
  [
    body('amount').isNumeric(),
    validateRequest,
  ],
  employerController.withdrawFromPool
);

export { router as employerRoutes }; 