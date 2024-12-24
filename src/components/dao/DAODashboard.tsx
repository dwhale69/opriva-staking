import React from 'react';
import { ProposalList } from './ProposalList';
import { TreasuryStats } from './TreasuryStats';
import { VotingPower } from './VotingPower';

export const DAODashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TreasuryStats />
        <VotingPower />
      </div>
      <ProposalList />
    </div>
  );
};