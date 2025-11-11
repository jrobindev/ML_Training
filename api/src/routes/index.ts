import { Router } from 'express';
import predictionRoutes from './prediction_routes';
import healthRoutes from './health_routes';

const router = Router();

// Mount route modules
router.use('/', predictionRoutes);
router.use('/', healthRoutes);

export default router;