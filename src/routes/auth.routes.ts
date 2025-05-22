import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticate, authenticateWeb3 } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../types';

const router = Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/wallet-auth', authenticateWeb3);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);
router.post('/logout', authenticate, authController.logout);

// Admin routes
router.get('/users', authenticate, authorize([UserRole.ADMIN]), authController.getUsers);

export default router; 