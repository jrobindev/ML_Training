// Request/Response Types
export interface PredictionRequest {
  sqft: number;
  bedrooms: number;
}

export interface PredictionResponse {
  id: string;
  sqft: number;
  bedrooms: number;
  prediction: number;
  confidenceInterval: ConfidenceInterval;
  timestamp: string;
}

export interface ConfidenceInterval {
  lower: number;
  upper: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PredictionStats {
  count: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  averageSqft: number;
  averageBedrooms: string;
  lastPrediction?: PredictionResponse;
}

// Model Types
export interface TrainingData {
  X: number[][];
  y: number[];
}

export interface ModelMetrics {
  rSquared: string;
  mae: string;
  rmse: string;
  trainingDataSize: number;
}

export interface ModelInfo {
  trained: boolean;
  intercept?: number;
  coefficients?: {
    sqft: number;
    bedrooms: number;
  };
  metrics?: ModelMetrics;
  equation?: string;
}

export interface PredictionWithConfidence {
  prediction: number;
  confidenceInterval: ConfidenceInterval;
}

// Error Types
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Health Check Types
export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  model: {
    ready: boolean;
    trained: boolean;
  };
  uptime: number;
}