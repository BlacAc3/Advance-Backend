import { Router } from 'express';
import { healthCheckController } from '../controllers/health.controller';

const router = Router();

router.get('/', healthCheckController.check);
router.get('/db', healthCheckController.checkDatabase);
router.get('/blockchain', healthCheckController.checkBlockchain);

export const healthCheckRoutes = router; 