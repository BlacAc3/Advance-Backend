import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { logger } from "../utils/logger";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn("Validation error:", { errors: errors.array() });
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  return next();
};
