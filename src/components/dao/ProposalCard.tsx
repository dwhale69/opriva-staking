import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { Proposal } from './types';

interface ProposalCardProps {
  proposal: Proposal;
}

export const ProposalCard = ({ proposal }: ProposalCardProps) => {
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercentage = (proposal.votesFor / totalVotes) * 100;
  const againstPercentage = (proposal.votesAgainst / totalVotes) * 100;

  return (
    <div className="bg-[#1f2023] rounded-lg p-4 border border-[#8396FA]/10 hover:border-[#8396FA]/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-medium mb-1">{proposal.title}</h3>
          <p className="text-gray-400 text-sm">{proposal.description}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          proposal.status === 'active' 
            ? 'bg-green-500/20 text-green-400'
            : 'bg-gray-500/20 text-gray-400'
        }`}>
          {proposal.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Progress</span>
          <span>{forPercentage.toFixed(1)}% Support</span>
        </div>
        
        <div className="h-2 bg-[#141416] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8396FA] rounded-full"
            style={{ width: `${forPercentage}%` }}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#8396FA]/10 hover:bg-[#8396FA]/20 text-[#8396FA] transition-all">
            <ThumbsUp size={16} />
            <span>{proposal.votesFor.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all">
            <ThumbsDown size={16} />
            <span>{proposal.votesAgainst.toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};