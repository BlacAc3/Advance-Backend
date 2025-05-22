import { Router, Request, Response } from 'express';
import { EmployerService } from '../services/employerService';
import { authenticateToken, requireRole } from '../middleware/auth';
import { body, validationResult } from 'express-validator';
import { logger } from '../utils/logger';
import bcrypt from 'bcrypt';

const router = Router();

// Validation middleware
const validateEmployerProfile = [
  body('companyName').notEmpty().trim(),
  body('companyAddress').notEmpty().trim(),
  body('companyWebsite').optional().isURL(),
  body('companySize').optional().isInt({ min: 1 }),
  body('industry').optional().trim()
];

const validateEmployeeData = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('salary').isFloat({ min: 0 }),
  body('payFrequency').isIn(['WEEKLY', 'BIWEEKLY', 'MONTHLY']),
  body('nextPayDate').isISO8601(),
  body('employmentStartDate').isISO8601()
];

const validateVerificationDocuments = [
  body('businessLicense').notEmpty(),
  body('taxId').notEmpty(),
  body('additionalDocuments').optional().isArray()
];

// Apply authentication middleware to all routes
router.use(authenticateToken);
router.use(requireRole(['EMPLOYER']));

// Get employer profile
router.get('/profile', async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const profile = await EmployerService.getEmployerProfile(req.user.id);
    res.json(profile);
  } catch (error: any) {
    logger.error('Get employer profile error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Create or update employer profile
router.post('/profile', validateEmployerProfile, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const profile = await EmployerService.createOrUpdateEmployer(req.user.id, req.body);
    res.json(profile);
  } catch (error: any) {
    logger.error('Update employer profile error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get employer's employees
router.get('/employees', async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const employees = await EmployerService.getEmployerEmployees(req.user.id, page, limit);
    res.json(employees);
  } catch (error: any) {
    logger.error('Get employees error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Add new employee
router.post('/employees', validateEmployeeData, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Hash password before creating employee
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employeeData = {
      ...req.body,
      password: hashedPassword
    };

    const employee = await EmployerService.addEmployee(req.user.id, employeeData);
    res.status(201).json(employee);
  } catch (error: any) {
    logger.error('Add employee error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update employee
router.put('/employees/:employeeId', validateEmployeeData, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const employee = await EmployerService.updateEmployee(
      req.user.id,
      req.params.employeeId,
      req.body
    );
    res.json(employee);
  } catch (error: any) {
    logger.error('Update employee error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Remove employee
router.delete('/employees/:employeeId', async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    await EmployerService.removeEmployee(req.user.id, req.params.employeeId);
    res.json({ message: 'Employee removed successfully' });
  } catch (error: any) {
    logger.error('Remove employee error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get verification status
router.get('/verification', async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const status = await EmployerService.getVerificationStatus(req.user.id);
    res.json(status);
  } catch (error: any) {
    logger.error('Get verification status error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Submit verification documents
router.post('/verification', validateVerificationDocuments, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const employer = await EmployerService.submitVerificationDocuments(req.user.id, req.body);
    res.json(employer);
  } catch (error: any) {
    logger.error('Submit verification documents error:', error);
    res.status(400).json({ message: error.message });
  }
});

export default router; 