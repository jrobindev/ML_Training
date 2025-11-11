import StatCard from './StatCard';
import { formatPrice, formatDate } from '../../utils/formatters';

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Predictions"
        value={stats.count}
        color="blue"
      />

      <StatCard
        title="Average Price"
        value={formatPrice(stats.averagePrice)}
        color="green"
      />

      <StatCard
        title="Price Range"
        value={`${formatPrice(stats.minPrice)} - ${formatPrice(stats.maxPrice)}`}
        color="purple"
      />

      <StatCard
        title="Avg Square Footage"
        value={`${stats.averageSqft.toLocaleString()} sq ft`}
        color="yellow"
      />

      <StatCard
        title="Avg Bedrooms"
        value={stats.averageBedrooms}
        color="pink"
      />

      {stats.lastPrediction && (
        <StatCard
          title="Latest Prediction"
          value={formatPrice(stats.lastPrediction.prediction)}
          subtitle={formatDate(stats.lastPrediction.timestamp)}
          color="indigo"
        />
      )}
    </div>
  );
};

export default StatsGrid;