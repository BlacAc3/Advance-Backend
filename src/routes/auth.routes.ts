import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Register a new user
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('walletAddress').matches(/^0x[a-fA-F0-9]{40}$/),
    body('role').isIn(['EMPLOYER', 'EMPLOYEE']),
    validateRequest,
  ],
  authController.register
);

// Login user
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    validateRequest,
  ],
  authController.login
);

// Refresh access token
router.post(
  '/refresh-token',
  [
    body('refreshToken').notEmpty(),
    validateRequest,
  ],
  authController.refreshToken
);

// Get current user profile
router.get(
  '/me',
  authenticate,
  authController.getProfile
);

// Update user profile
router.patch(
  '/me',
  authenticate,
  [
    body('email').optional().isEmail().normalizeEmail(),
    body('password').optional().isLength({ min: 8 }),
    validateRequest,
  ],
  authController.updateProfile
);

// Logout user
router.post(
  '/logout',
  authenticate,
  authController.logout
);

export { router as authRoutes }; 