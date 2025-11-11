import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import logger from '../config/logger';
import { PredictionResponse, PredictionStats } from '../types';

/**
 * Model for managing prediction data persistence
 */
class PredictionModel {
  private predictionsFile: string;

  constructor() {
    this.predictionsFile = path.join(__dirname, '../../predictions.json');
    this.initializeFile();
  }

  /**
   * Initialize predictions file if it doesn't exist
   */
  private initializeFile(): void {
    if (!fs.existsSync(this.predictionsFile)) {
      fs.writeFileSync(this.predictionsFile, JSON.stringify([]));
      logger.info('Created predictions file');
    }
  }

  /**
   * Read all predictions from file
   */
  private readPredictions(): PredictionResponse[] {
    try {
      const data = fs.readFileSync(this.predictionsFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      logger.error('Error reading predictions:', error);
      return [];
    }
  }

  /**
   * Write predictions to file
   */
  private writePredictions(predictions: PredictionResponse[]): boolean {
    try {
      fs.writeFileSync(this.predictionsFile, JSON.stringify(predictions, null, 2));
      return true;
    } catch (error) {
      logger.error('Error writing predictions:', error);
      return false;
    }
  }

  /**
   * Create a new prediction record
   */
  public create(
    sqft: number,
    bedrooms: number,
    prediction: number,
    confidenceInterval: { lower: number; upper: number }
  ): PredictionResponse {
    const record: PredictionResponse = {
      id: uuidv4(),
      sqft,
      bedrooms,
      prediction,
      confidenceInterval,
      timestamp: new Date().toISOString()
    };

    const predictions = this.readPredictions();
    predictions.push(record);
    
    const saved = this.writePredictions(predictions);
    if (!saved) {
      logger.warn('Failed to save prediction to file, but returning result');
    }

    logger.info('Prediction record created', {
      id: record.id,
      prediction: record.prediction
    });

    return record;
  }

  /**
   * Get all predictions with optional pagination
   */
  public getAll(page: number = 1, limit: number = 50): {
    data: PredictionResponse[];
    total: number;
  } {
    const predictions = this.readPredictions();
    const total = predictions.length;
    const skip = (page - 1) * limit;

    // Return most recent first, with pagination
    const paginatedResults = predictions
      .reverse()
      .slice(skip, skip + limit);

    return {
      data: paginatedResults,
      total
    };
  }

  /**
   * Get prediction statistics
   */
  public getStats(): PredictionStats | { count: number; message: string } {
    const predictions = this.readPredictions();
    
    if (predictions.length === 0) {
      return {
        count: 0,
        message: 'No predictions yet'
      };
    }

    const prices = predictions.map(p => p.prediction);
    const sqfts = predictions.map(p => p.sqft);
    const bedrooms = predictions.map(p => p.bedrooms);

    const stats: PredictionStats = {
      count: predictions.length,
      averagePrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      averageSqft: Math.round(sqfts.reduce((a, b) => a + b, 0) / sqfts.length),
      averageBedrooms: (bedrooms.reduce((a, b) => a + b, 0) / bedrooms.length).toFixed(1),
      lastPrediction: predictions[predictions.length - 1]
    };

    return stats;
  }

  /**
   * Delete all predictions
   */
  public deleteAll(): boolean {
    const success = this.writePredictions([]);
    if (success) {
      logger.info('All predictions deleted');
    }
    return success;
  }

  /**
   * Get prediction by ID
   */
  public getById(id: string): PredictionResponse | null {
    const predictions = this.readPredictions();
    return predictions.find(p => p.id === id) || null;
  }
}

export default new PredictionModel();