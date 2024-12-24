import type { Proposal } from './types';

export const proposals: Proposal[] = [
  {
    id: 1,
    title: 'Increase Staking Rewards',
    description: 'Proposal to increase the staking rewards from 18.25% to 20% APY',
    status: 'active',
    votesFor: 8450000,
    votesAgainst: 2150000,
  },
  {
    id: 2,
    title: 'Add New Advertising Tier',
    description: 'Introduce a new 1-month advertising tier for 15,000 OPRV',
    status: 'active',
    votesFor: 6240000,
    votesAgainst: 3890000,
  },
  {
    id: 3,
    title: 'Treasury Diversification',
    description: 'Allocate 5% of treasury to stable yield farming strategies',
    status: 'pending',
    votesFor: 4120000,
    votesAgainst: 5670000,
  },
];