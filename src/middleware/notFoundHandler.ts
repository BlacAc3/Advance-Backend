import { Request, Response } from 'express';
import { AppError } from './errorHandler';

export const notFoundHandler = (req: Request, res: Response) => {
  throw new AppError(404, `Route ${req.originalUrl} not found`);
}; 