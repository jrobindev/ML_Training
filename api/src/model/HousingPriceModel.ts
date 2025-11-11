import * as math from 'mathjs';
import logger from '../config/logger';
import {
  TrainingData,
  ModelMetrics,
  ModelInfo,
  PredictionWithConfidence
} from '../types';

/**
 * Housing Price Prediction Model using Multiple Linear Regression
 */
class HousingPriceModel {
  private coefficients: number[] | null = null;
  private intercept: number | null = null;
  private trained: boolean = false;
//   private trainingData: TrainingData | null = null;
  private modelMetrics: ModelMetrics | null = null;

  /**
   * Get the training dataset
   */
  private getTrainingData(): TrainingData {
    return {
      X: [
        [800, 2],
        [1200, 3],
        [1500, 3],
        [1800, 4],
        [2000, 4],
        [2200, 5],
        [2400, 4],
        [2600, 5]
      ],
      y: [150000, 200000, 250000, 300000, 320000, 360000, 380000, 400000]
    };
  }

  /**
   * Calculate R-squared (coefficient of determination)
   */
  private calculateRSquared(X: number[][], y: number[], predictions: number[]): number {
    console.log("X:", X);
    const yMean = math.mean(y);
    const totalSumSquares = math.sum(y.map(val => Math.pow(val - yMean, 2)));
    const residualSumSquares = math.sum(
      y.map((val, i) => Math.pow(val - predictions[i], 2))
    );
    return 1 - (residualSumSquares / totalSumSquares);
  }

  /**
   * Calculate Mean Absolute Error
   */
  private calculateMAE(y: number[], predictions: number[]): number {
    return math.mean(y.map((val, i) => Math.abs(val - predictions[i])));
  }

  /**
   * Calculate Root Mean Squared Error
   */
  private calculateRMSE(y: number[], predictions: number[]): number {
    return Math.sqrt(
      math.mean(y.map((val, i) => Math.pow(val - predictions[i], 2)))
    );
  }

  /**
   * Perform matrix multiplication for prediction
   */
//   private matrixMultiply(A: number[][], B: number[]): number[] {
//     const result: number[] = [];
//     for (let i = 0; i < A.length; i++) {
//       let sum = 0;
//       for (let j = 0; j < A[i].length; j++) {
//         sum += A[i][j] * B[j];
//       }
//       result.push(sum);
//     }
//     return result;
//   }

  /**
   * Train the model using Ordinary Least Squares
   */
  public train(): ModelMetrics {
    try {
      const data = this.getTrainingData();
    //   this.trainingData = data;

      // Add intercept term (column of ones) to X
      const X = data.X.map(row => [1, ...row]);
      const y = data.y;

      logger.info('Training model with sample data...');

      // Convert to mathjs matrices
      const X_matrix = math.matrix(X);
      const y_matrix = math.matrix(y);

      // Calculate coefficients using Normal Equation: β = (X^T * X)^-1 * X^T * y
      const XT = math.transpose(X_matrix);
      const XTX = math.multiply(XT, X_matrix) as math.Matrix;
      const XTX_inv = math.inv(XTX) as math.Matrix;
      const XTy = math.multiply(XT, y_matrix) as math.Matrix;
      const coefficients = math.multiply(XTX_inv, XTy) as math.Matrix;

      // Extract coefficients
      const coeffArray = coefficients.toArray() as number[];
      this.intercept = coeffArray[0];
      this.coefficients = coeffArray.slice(1);
      this.trained = true;

      // Calculate predictions for training data
      const predictions = data.X.map(row => 
        this.predict(row[0], row[1])
      );

      // Calculate model metrics
      const rSquared = this.calculateRSquared(data.X, data.y, predictions);
      const mae = this.calculateMAE(data.y, predictions);
      const rmse = this.calculateRMSE(data.y, predictions);

      this.modelMetrics = {
        rSquared: rSquared.toFixed(4),
        mae: mae.toFixed(2),
        rmse: rmse.toFixed(2),
        trainingDataSize: data.X.length
      };

      logger.info('Model trained successfully!', {
        intercept: this.intercept.toFixed(2),
        sqftCoefficient: this.coefficients[0].toFixed(2),
        bedroomCoefficient: this.coefficients[1].toFixed(2),
        ...this.modelMetrics
      });

      return this.modelMetrics;
    } catch (error) {
      logger.error('Error training model:', error);
      throw new Error('Failed to train model');
    }
  }

  /**
   * Make a prediction with or without confidence interval
   */
  public predict(sqft: number, bedrooms: number): number;
  public predict(sqft: number, bedrooms: number, includeConfidence: true): PredictionWithConfidence;
  public predict(sqft: number, bedrooms: number, includeConfidence?: boolean): number | PredictionWithConfidence {
    if (!this.trained || !this.intercept || !this.coefficients) {
      throw new Error('Model must be trained before making predictions');
    }

    try {
      const prediction = this.intercept + 
                        this.coefficients[0] * sqft + 
                        this.coefficients[1] * bedrooms;

      if (!includeConfidence) {
        return Math.round(prediction);
      }

      // Calculate approximate confidence interval (±10% as a simple heuristic)
      const confidenceMargin = prediction * 0.1;
      
      return {
        prediction: Math.round(prediction),
        confidenceInterval: {
          lower: Math.round(prediction - confidenceMargin),
          upper: Math.round(prediction + confidenceMargin)
        }
      };
    } catch (error) {
      logger.error('Error making prediction:', error);
      throw new Error('Prediction failed');
    }
  }

  /**
   * Get model information and metrics
   */
  public getModelInfo(): ModelInfo {
    if (!this.trained || !this.intercept || !this.coefficients) {
      return { trained: false };
    }

    return {
      trained: true,
      intercept: this.intercept,
      coefficients: {
        sqft: this.coefficients[0],
        bedrooms: this.coefficients[1]
      },
      metrics: this.modelMetrics || undefined,
      equation: `Price = ${this.intercept.toFixed(2)} + ${this.coefficients[0].toFixed(2)} * sqft + ${this.coefficients[1].toFixed(2)} * bedrooms`
    };
  }

  /**
   * Check if model is trained
   */
  public isTrained(): boolean {
    return this.trained;
  }

  /**
   * Retrain model (for future enhancement with new data)
   */
  public retrain(newData?: TrainingData): ModelMetrics {
    logger.info('Retraining model...');
    if (newData) {
      // Future enhancement: incorporate new training data
      logger.warn('Custom training data not yet implemented');
    }
    return this.train();
  }
}

export default HousingPriceModel;