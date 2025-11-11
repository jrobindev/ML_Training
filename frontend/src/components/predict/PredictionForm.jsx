import { useState } from 'react';
import ErrorMessage from '../common/ErrorMessage';

const PredictionForm = ({ onSubmit, loading }) => {
  const [sqft, setSqft] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!sqft || !bedrooms) {
      setError('Please fill in all fields');
      return;
    }

    if (Number(sqft) <= 0 || Number(bedrooms) <= 0) {
      setError('Values must be greater than 0');
      return;
    }

    onSubmit(Number(sqft), Number(bedrooms));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="sqft" className="block text-sm font-medium text-gray-700 mb-2">
          Square Footage
        </label>
        <input
          type="number"
          id="sqft"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          placeholder="Enter square footage (e.g., 1500)"
          min="1"
        />
      </div>

      <div>
        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
          Number of Bedrooms
        </label>
        <input
          type="number"
          id="bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          placeholder="Enter number of bedrooms (e.g., 3)"
          min="1"
        />
      </div>

      <ErrorMessage message={error} />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Predicting...' : 'Predict Price'}
      </button>
    </form>
  );
};

export default PredictionForm;