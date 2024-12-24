import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { StakingInput } from './StakingInput';
import { StakingOutput } from './StakingOutput';
import { useStaking } from '../../hooks/useStaking';
import { useWalletContext } from '../../context/WalletContext';
import { useStakingBalance } from '../../hooks/useStakingBalance';

export const StakingCard = () => {
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');
  const [amount, setAmount] = useState('');
  
  const { 
    stake, 
    unstake, 
    getRewards,
    isLoading,
    error: stakingError 
  } = useStaking();

  const { account, error: walletError } = useWalletContext();
  const { stakedBalance, earnedRewards, setStakedBalance, setEarnedRewards } = useStakingBalance(account);

  const handleAction = async () => {
    if (!amount || !account) return;
    
    const success = activeTab === 'stake' 
      ? await stake(amount)
      : await unstake(amount);
      
    if (success) {
      setAmount('');
      const balance = await getStakedBalance(account);
      const rewards = await getEarnedRewards(account);
      setStakedBalance(balance);
      setEarnedRewards(rewards);
    }
  };

  const handleGetRewards = async () => {
    if (!account) return;
    
    const success = await getRewards();
    if (success) {
      const rewards = await getEarnedRewards(account);
      setEarnedRewards(rewards);
    }
  };

  return (
    <div className="glass-effect rounded-xl p-4 sm:p-6 w-full max-w-md mx-auto neon-border">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
        <h2 className="text-xl font-semibold text-white neon-text">Staking</h2>
        <div className="flex items-center gap-2">
          <span className="text-[#899CFA] neon-text">APY: 10%</span>
          <Info size={16} className="text-gray-400" />
        </div>
      </div>

      {(stakingError || walletError) && (
        <div className="mb-4 p-3 bg-[#1f2023] border border-[#8396FA]/20 rounded-lg text-gray-400 text-sm">
          The terminal is still in development
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <button
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'stake'
              ? 'bg-[#8396FA] text-white neon-border'
              : 'bg-[#1f2023] text-gray-400'
          }`}
          onClick={() => setActiveTab('stake')}
        >
          Stake
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'unstake'
              ? 'bg-[#8396FA] text-white neon-border'
              : 'bg-[#1f2023] text-gray-400'
          }`}
          onClick={() => setActiveTab('unstake')}
        >
          Unstake
        </button>
      </div>

      <div className="space-y-4">
        <StakingInput
          amount={amount}
          setAmount={setAmount}
          balance={activeTab === 'stake' ? '0' : stakedBalance}
          symbol="OPRV"
        />

        <StakingOutput
          receiveAmount={amount || '0.00'}
          receiveSymbol={activeTab === 'stake' ? 'stOPRV' : 'OPRV'}
        />

        {Number(earnedRewards) > 0 && (
          <div className="bg-[#1f2023] rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Earned Rewards</span>
              <span className="text-[#8396FA] font-medium">
                {parseFloat(earnedRewards).toFixed(4)} OPRV
              </span>
            </div>
            <button
              onClick={handleGetRewards}
              disabled={isLoading}
              className="mt-3 w-full py-2 rounded-lg bg-[#8396FA]/10 hover:bg-[#8396FA]/20 text-[#8396FA] transition-all disabled:opacity-50"
            >
              Claim Rewards
            </button>
          </div>
        )}

        <button
          onClick={handleAction}
          disabled={isLoading || !amount}
          className="w-full py-3 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-all text-white font-medium neon-border disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : `${activeTab === 'stake' ? 'Stake' : 'Unstake'} OPRV`}
        </button>
      </div>
    </div>
  );
};