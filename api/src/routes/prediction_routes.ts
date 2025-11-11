import { Router } from 'express';
import {
  createPrediction,
  getPredictions,
  getPredictionStats,
  deleteAllPredictions,
  getModelInfo
} from '../controllers/PredictionController';
import { validatePrediction } from '../middleware/Validator';
import { checkModelReady } from '../middleware/CheckModelReady';

const router = Router();

/**
 * @route   POST /api/predict
 * @desc    Create a new prediction
 * @access  Public
 */
router.post('/predict', checkModelReady, validatePrediction, createPrediction);

/**
 * @route   GET /api/predictions
 * @desc    Get all predictions (paginated)
 * @access  Public
 */
router.get('/predictions', getPredictions);

/**
 * @route   GET /api/predictions/stats
 * @desc    Get prediction statistics
 * @access  Public
 */
router.get('/predictions/stats', getPredictionStats);

/**
 * @route   DELETE /api/predictions
 * @desc    Delete all predictions
 * @access  Public (should be protected in production)
 */
router.delete('/predictions', deleteAllPredictions);

/**
 * @route   GET /api/model/info
 * @desc    Get model information and metrics
 * @access  Public
 */
router.get('/model/info', checkModelReady, getModelInfo);

export default router;