import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { employerController } from '../controllers/employer.controller';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../types';

const router = Router();

// All employer routes require authentication and employer role
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

// Demo request route (public)
router.post(
  '/request-demo',
  [
    body('companyName').trim().notEmpty().withMessage('Company name is required'),
    body('contactName').trim().notEmpty().withMessage('Contact name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('companySize').isInt({ min: 1 }).withMessage('Company size must be a positive number'),
    body('message').optional().trim()
  ],
  validateRequest,
  employerController.requestDemo
);

export default router; 