import React from 'react';
import { Vote, Lock } from 'lucide-react';

export const VotingPower = () => {
  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-[#8396FA]/10">
          <Vote className="text-[#8396FA]" size={20} />
        </div>
        <h2 className="text-xl font-semibold text-white neon-text">Your Voting Power</h2>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-gray-400 text-sm mb-1">Total Voting Power</div>
          <div className="text-2xl font-bold text-white">0 vOPRV</div>
        </div>

        <div className="bg-[#1f2023] rounded-lg p-4 border border-[#8396FA]/10">
          <div className="flex items-center gap-2 mb-2">
            <Lock size={16} className="text-[#8396FA]" />
            <span className="text-white font-medium">Lock OPRV for vOPRV</span>
          </div>
          <p className="text-sm text-gray-400">
            Lock your OPRV tokens to receive voting power and participate in governance
          </p>
          <button className="mt-4 w-full py-2 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-all text-white font-medium">
            Lock Tokens
          </button>
        </div>
      </div>
    </div>
  );
};