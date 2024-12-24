export interface Proposal {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed';
  votesFor: number;
  votesAgainst: number;
}