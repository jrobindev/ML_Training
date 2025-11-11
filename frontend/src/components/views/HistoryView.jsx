import { useState, useEffect } from 'react';
import PredictionList from '../history/PredictionList';
import Pagination from '../history/Pagination';
import EmptyState from '../common/EmptyState';
import { useApi } from '../../hooks/useApi';

const HistoryView = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getPredictions, clearPredictions } = useApi();

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  const fetchHistory = async (page) => {
    try {
      const result = await getPredictions(page, 10);
      const data = result.data || result;
      const pagination = result.pagination;
      
      setHistory(data);
      if (pagination) {
        setTotalPages(pagination.totalPages);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleClearHistory = async () => {
    if (!confirm('Are you sure you want to clear all prediction history?')) {
      return;
    }

    try {
      await clearPredictions();
      fetchHistory(1);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error clearing history:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Prediction History
        </h2>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition"
          >
            Clear All
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <EmptyState
          title="No predictions yet"
          message="Make your first prediction to see it here"
        />
      ) : (
        <>
          <PredictionList predictions={history} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default HistoryView;