import React from 'react';
import { Users, Percent } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: any }) => (
  <div className="stats-card glass-effect rounded-xl p-3 relative group hover:scale-105 transition-transform duration-300">
    <div className="flex items-center gap-2">
      <div className="p-1.5 rounded-lg bg-[#8396FA]/10 neon-border group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-[#8396FA]" size={16} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-400">{title}</span>
        <span className="text-lg font-semibold text-white neon-text">{value}</span>
      </div>
    </div>
  </div>
);

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
      <StatCard
        title="Total Stakers"
        value="1,234"
        icon={Users}
      />
      <StatCard
        title="Current APY"
        value="10%"
        icon={Percent}
      />
    </div>
  );
};