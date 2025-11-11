import { Request, Response } from 'express';
import { isModelReady } from './PredictionController';
import { HealthCheckResponse } from '../types';

/**
 * Health check endpoint
 * @route GET /api/health
 */
export const healthCheck = (_req: Request, res: Response): void => {
  const response: HealthCheckResponse = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    model: {
      ready: isModelReady(),
      trained: isModelReady()
    },
    uptime: process.uptime()
  };

  res.json(response);
};