import { Request, Response } from "express";
import { logger } from "../utils/logger";

export const healthCheckController = {
  check: async (_req: Request, res: Response) => {
    try {
      const status = {
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version,
      };

      res.json(status);
    } catch (error) {
      logger.error("Health check failed:", error);
      res.status(500).json({
        status: "error",
        message: "Health check failed",
      });
    }
  },
};
