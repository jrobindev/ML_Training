import { Router } from 'express';
import { healthCheck } from '../controllers/HealthController';

const router = Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/health', healthCheck);

export default router;