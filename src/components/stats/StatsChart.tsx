import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 150000, users: 25000 },
  { name: 'Feb', revenue: 180000, users: 35000 },
  { name: 'Mar', revenue: 220000, users: 42000 },
  { name: 'Apr', revenue: 280000, users: 48000 },
  { name: 'May', revenue: 350000, users: 52000 },
  { name: 'Jun', revenue: 420000, users: 65000 },
];

export const StatsChart = () => {
  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Revenue & Users Growth</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2023" />
            <XAxis 
              dataKey="name" 
              stroke="#8396FA"
              tick={{ fill: '#8396FA' }}
            />
            <YAxis 
              stroke="#8396FA"
              tick={{ fill: '#8396FA' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2023',
                border: '1px solid #8396FA',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#8396FA' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8396FA" 
              strokeWidth={2}
              dot={{ fill: '#8396FA' }}
              name="Revenue (OPRV)"
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#899CFA" 
              strokeWidth={2}
              dot={{ fill: '#899CFA' }}
              name="Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};