import React from 'react';
import { ProposalCard } from './ProposalCard';
import { Plus } from 'lucide-react';
import { proposals } from './data';

export const ProposalList = () => {
  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white neon-text">Active Proposals</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-all text-white font-medium text-sm">
          <Plus size={16} />
          New Proposal
        </button>
      </div>
      
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
};