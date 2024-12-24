import React from 'react';
import { Wallet, ArrowUpRight } from 'lucide-react';

export const TreasuryStats = () => {
  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-[#8396FA]/10">
          <Wallet className="text-[#8396FA]" size={20} />
        </div>
        <h2 className="text-xl font-semibold text-white neon-text">Treasury</h2>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-gray-400 text-sm mb-1">Total Value</div>
          <div className="text-2xl font-bold text-white">
            12,450,000 OPRV
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-400 text-sm mb-1">Locked</div>
            <div className="text-lg font-semibold text-white">8,715,000 OPRV</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Available</div>
            <div className="text-lg font-semibold text-white">3,735,000 OPRV</div>
          </div>
        </div>

        <button className="flex items-center gap-2 w-full justify-center px-4 py-2 rounded-lg bg-[#8396FA]/10 hover:bg-[#8396FA]/20 text-[#8396FA] transition-all">
          View Transactions
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};