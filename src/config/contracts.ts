// Update with your actual deployed contract address
export const STAKING_CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890';

export const STAKING_ABI = [
  // Staking functions
  'function stake(uint256 amount) external',
  'function unstake(uint256 amount) external',
  'function getRewards() external',
  
  // View functions
  'function balanceOf(address account) external view returns (uint256)',
  'function earned(address account) external view returns (uint256)',
  'function totalSupply() external view returns (uint256)',
  'function rewardRate() external view returns (uint256)',
  'function rewardPerToken() external view returns (uint256)',
  
  // Token approval
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  
  // Events
  'event Staked(address indexed user, uint256 amount)',
  'event Withdrawn(address indexed user, uint256 amount)',
  'event RewardPaid(address indexed user, uint256 reward)'
] as const;