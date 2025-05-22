import { Router } from 'express';
import { AuthService } from '../services/authService';
import { authenticateToken, requireRole } from '../middleware/auth';
import { body, validationResult } from 'express-validator';
import { logger } from '../utils/logger';

const router = Router();

// Validation middleware
const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('role').isIn(['EMPLOYER', 'EMPLOYEE', 'WEB3_USER']),
  body('data').isObject()
];

const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
];

const validateWalletAuth = [
  body('walletAddress').isEthereumAddress(),
  body('signature').isString(),
  body('message').isString()
];

// Registration endpoint
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role, data } = req.body;
    const result = await AuthService.register(email, password, role, data);
    res.status(201).json(result);
  } catch (error: any) {
    logger.error('Registration error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Login endpoint
router.post('/login', validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (error: any) {
    logger.error('Login error:', error);
    res.status(401).json({ message: error.message });
  }
});

// Web3 wallet authentication endpoint
router.post('/wallet-auth', validateWalletAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { walletAddress, signature, message } = req.body;
    const result = await AuthService.authenticateWallet(walletAddress, signature, message);
    res.json(result);
  } catch (error: any) {
    logger.error('Wallet authentication error:', error);
    res.status(401).json({ message: error.message });
  }
});

// Logout endpoint
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    await AuthService.logout(token);
    res.json({ message: 'Logged out successfully' });
  } catch (error: any) {
    logger.error('Logout error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Refresh token endpoint
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token required' });
    }

    const result = await AuthService.refreshToken(refreshToken);
    res.json(result);
  } catch (error: any) {
    logger.error('Token refresh error:', error);
    res.status(401).json({ message: error.message });
  }
});

// Change password endpoint
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    await AuthService.changePassword(req.user.id, currentPassword, newPassword);
    res.json({ message: 'Password changed successfully' });
  } catch (error: any) {
    logger.error('Password change error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update profile endpoint
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await AuthService.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (error: any) {
    logger.error('Profile update error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Protected route example
router.get('/protected', authenticateToken, requireRole(['ADMIN']), (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router; 