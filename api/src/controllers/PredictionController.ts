
import logger from '../config/logger';
import { AppError } from '../types';

// Initialize the ML model
const mlModel = new HousingPriceModel();

/**
 * Initialize and train the model
 */
export const initializeModel = async (): Promise<void> => {
  try {
    await mlModel.train();
    logger.info('Model initialization complete');
  } catch (error) {
    logger.error('Failed to initialize model:', error);
    throw error;
  }
};

/**
 * Check if model is ready
 */
export const isModelReady = (): boolean => {
  return mlModel.isTrained();
};

