import { Request, Response, NextFunction } from 'express';
import { isModelReady } from '../controllers/PredictionController';
import { AppError } from '../types';

/**
 * Middleware to check if ML model is ready
 */
export const checkModelReady = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (!isModelReady()) {
    next(new AppError('Model is not ready yet. Please try again in a moment.', 503));
    return;
  }
  next();
};