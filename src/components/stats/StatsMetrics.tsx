import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MetricRow = ({ label, value, change }: {
  label: string;
  value: string;
  change: { value: string; positive: boolean };
}) => (
  <div className="flex items-center justify-between py-3 border-b border-[#1f2023] last:border-0">
    <span className="text-gray-400">{label}</span>
    <div className="flex items-center gap-4">
      <span className="text-white font-medium">{value}</span>
      <div className={`flex items-center gap-1 ${
        change.positive ? 'text-green-400' : 'text-red-400'
      }`}>
        {change.positive ? (
          <ArrowUpRight size={16} />
        ) : (
          <ArrowDownRight size={16} />
        )}
        <span className="text-sm">{change.value}</span>
      </div>
    </div>
  </div>
);

export const StatsMetrics = () => {
  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Key Metrics</h3>
      <div className="space-y-2">
        <MetricRow
          label="Average Stake Amount"
          value="12,450 OPRV"
          change={{ value: "8.5%", positive: true }}
        />
        <MetricRow
          label="Average Ad Duration"
          value="24 hours"
          change={{ value: "12.3%", positive: true }}
        />
        <MetricRow
          label="Daily Active Users"
          value="25,890"
          change={{ value: "15.7%", positive: true }}
        />
        <MetricRow
          label="Ad Click-through Rate"
          value="3.2%"
          change={{ value: "0.5%", positive: false }}
        />
        <MetricRow
          label="Average Ad Budget"
          value="2,500 OPRV"
          change={{ value: "10.2%", positive: true }}
        />
        <MetricRow
          label="New Users (24h)"
          value="1,234"
          change={{ value: "18.9%", positive: true }}
        />
      </div>
    </div>
  );
};