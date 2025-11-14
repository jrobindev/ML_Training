# ML_Training


# Housing Price Predictor

A robust, production-ready full-stack web application that predicts housing prices using machine learning. Built with TypeScript.

## Tech Stack

### Backend (TypeScript + Node.js)
- **TypeScript** - Type-safe JavaScript
- **Express** - Web framework
- **mathjs** - Mathematical operations for ML
- **Winston** - Advanced logging
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting
- **Joi** - Schema validation
- **Morgan** - HTTP request logging
- **Compression** - Response compression

### Frontend
- **React** - UI library
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool

### Features
- 🏠 **Predict** - Get price predictions with confidence intervals
- 📋 **History** - View all past predictions with pagination
- 📊 **Statistics** - Analyze prediction trends and averages
- 🤖 **Model Info** - Explore ML model details and metrics
- 🎯 **Navigation** - Easy tab-based interface
- 📱 **Responsive** - Works on all devices


## Architecture Overview

### MVC Pattern with TypeScript

The backend follows the **Model-View-Controller (MVC)** pattern with clear separation of concerns:

#### 1. **Models** (`src/models/`)
- **HousingPriceModel.ts**: ML model for price predictions
  - Training algorithm (OLS regression)
  - Prediction logic
  - Model metrics calculation
  
- **PredictionModel.ts**: Data persistence layer
  - CRUD operations for predictions
  - File I/O handling
  - Statistics calculation

#### 2. **Controllers** (`src/controllers/`)
- **predictionController.ts**: Business logic for predictions
  - Create predictions
  - Retrieve predictions
  - Get statistics
  - Model management
  
- **healthController.ts**: Health check logic
  - System status
  - Model status

#### 3. **Routes** (`src/routes/`)
- **predictionRoutes.ts**: Prediction endpoints
- **healthRoutes.ts**: Health check endpoints
- **index.ts**: Route aggregator

#### 4. **Middleware** (`src/middleware/`)
- **validator.ts**: Input validation with Joi
- **errorHandler.ts**: Centralized error handling
- **modelReadyCheck.ts**: Model readiness validation

#### 5. **Types** (`src/types/`)
- Centralized TypeScript type definitions
- Interface definitions
- Custom error classes

## Installation & Setup

### Prerequisites
- Node.js v14+ 
- npm or yarn
- TypeScript knowledge (for development)

### Quick Setup

```bash
# API setup
cd api
npm install
cp .env.example .env

# Build TypeScript
npm run build

# Start server
npm start

# Or for development with hot reload
npm run dev

# In a new terminal - Frontend setup
cd ../frontend
npm install
npm run dev
```

### Manual Setup

#### API

```bash
cd api

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Or development mode with auto-reload
npm run dev
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables

Create `.env` file in the api directory:

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```


## API Endpoints

All endpoints are prefixed with `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| GET | /model/info | Model information |
| POST | /predict | Create prediction |
| GET | /predictions | Get predictions (paginated) |
| GET | /predictions/stats | Get statistics |
| DELETE | /predictions | Delete all predictions |


## Development Workflow

### 1. Make Changes
Edit TypeScript files in `src/` directory

### 2. Development Mode
```bash
npm run dev
```
Changes are automatically recompiled and server restarts

### 3. Build for Production
```bash
npm run build
```
Compiled JavaScript appears in `dist/` directory

### 4. Run Production
```bash
npm start
```
Runs the compiled code from `dist/`

## Testing

```bash
# Unit tests (to be implemented)
npm test

# Watch mode
npm test:watch

# Coverage
npm test:coverage
```

## Linting

```bash
# Check for issues
npm run lint

# Fix automatically
npm run lint:fix
```

## Future Enhancements

- [ ] Add unit tests (Jest)
- [ ] Add integration tests
- [ ] Implement DTOs (Data Transfer Objects)
- [ ] Add request/response transformers
- [ ] Implement dependency injection
- [ ] Add API documentation (Postmark, Swagger)
- [ ] Database migration (TypeORM)
- [ ] GraphQL support
