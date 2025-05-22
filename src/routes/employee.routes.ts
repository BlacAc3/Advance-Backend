import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../types';

const router = Router();

// All employee routes require authentication and employee role
router.use(authenticate);
router.use(authorize([UserRole.EMPLOYEE]));

// Profile management
router.get('/profile', employeeController.getProfile);
router.put('/profile', employeeController.updateProfile);

// Advance management
router.get('/advances', employeeController.getAdvances);
router.get('/advances/:id', employeeController.getAdvanceDetails);
router.post('/advances/:id/accept', employeeController.acceptAdvance);
router.post('/advances/:id/reject', employeeController.rejectAdvance);

// Repayment management
router.get('/repayments', employeeController.getRepayments);
router.get('/repayments/:id', employeeController.getRepaymentDetails);
router.post('/repayments/:id/pay', employeeController.payRepayment);

export default router; 