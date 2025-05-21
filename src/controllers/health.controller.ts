import { Request, Response } from 'express';
import { sequelize } from '../config/database';
import { logger } from '../utils/logger';
import { checkBlockchainConnection } from '../services/blockchain/blockchainService';

export const healthCheckController = {
  check: async (_req: Request, res: Response) => {
    try {
      const status = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version,
      };

      res.json(status);
    } catch (error) {
      logger.error('Health check failed:', error);
      res.status(500).json({
        status: 'error',
        message: 'Health check failed',
      });
    }
  },

  checkDatabase: async (_req: Request, res: Response) => {
    try {
      await sequelize.authenticate();
      res.json({
        status: 'ok',
        message: 'Database connection is healthy',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Database health check failed:', error);
      res.status(503).json({
        status: 'error',
        message: 'Database connection failed',
        timestamp: new Date().toISOString(),
      });
    }
  },

  checkBlockchain: async (_req: Request, res: Response) => {
    try {
      const blockchainStatus = await checkBlockchainConnection();
      res.json({
        status: 'ok',
        message: 'Blockchain connection is healthy',
        details: blockchainStatus,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Blockchain health check failed:', error);
      res.status(503).json({
        status: 'error',
        message: 'Blockchain connection failed',
        timestamp: new Date().toISOString(),
      });
    }
  },
}; 