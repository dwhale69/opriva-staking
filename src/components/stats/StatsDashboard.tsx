import React from 'react';
import { StatsOverview } from './StatsOverview';
import { StatsChart } from './StatsChart';
import { StatsMetrics } from './StatsMetrics';

export const StatsDashboard = () => {
  return (
    <div className="space-y-6">
      <StatsOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsChart />
        <StatsMetrics />
      </div>
    </div>
  );
};