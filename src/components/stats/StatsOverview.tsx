import React from 'react';
import { DollarSign, Users, Megaphone, LineChart, Globe } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon }: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) => (
  <div className="glass-effect rounded-xl p-4">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-[#8396FA]/10">
        <Icon className="text-[#8396FA]" size={20} />
      </div>
      <span className="text-gray-400 text-sm">{title}</span>
    </div>
    <div className="flex items-end justify-between">
      <div className="text-xl font-bold text-white">{value}</div>
      <div className={`text-sm ${
        change.startsWith('+') ? 'text-green-400' : 'text-red-400'
      }`}>
        {change}
      </div>
    </div>
  </div>
);

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <StatCard
        title="Total Ads Revenue"
        value="2.5M OPRV"
        change="+12.5%"
        icon={DollarSign}
      />
      <StatCard
        title="Total Stakers"
        value="15,234"
        change="+8.3%"
        icon={Users}
      />
      <StatCard
        title="Active Ads"
        value="156"
        change="+15.7%"
        icon={Megaphone}
      />
      <StatCard
        title="Total Traffic"
        value="1.2M"
        change="+25.4%"
        icon={LineChart}
      />
      <StatCard
        title="Browser Users"
        value="458K"
        change="+18.9%"
        icon={Globe}
      />
    </div>
  );
};