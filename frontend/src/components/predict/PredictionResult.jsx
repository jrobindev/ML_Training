import { formatPrice } from '../../utils/formatters';

const PredictionResult = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Predicted Price
      </h3>
      <p className="text-4xl font-bold text-green-600">
        {formatPrice(prediction.prediction)}
      </p>
      
      {prediction.confidenceInterval && (
        <div className="mt-3 p-3 bg-white rounded-md">
          <p className="text-sm font-medium text-gray-700 mb-1">
            Confidence Interval (±10%)
          </p>
          <p className="text-sm text-gray-600">
            {formatPrice(prediction.confidenceInterval.lower)} - {formatPrice(prediction.confidenceInterval.upper)}
          </p>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Square Footage: {prediction.sqft.toLocaleString()} sq ft</p>
        <p>Bedrooms: {prediction.bedrooms}</p>
      </div>
    </div>
  );
};

export default PredictionResult;