import { useState, useEffect } from 'react';
import { useStaking } from './useStaking';

export const useStakingBalance = (account: string | null) => {
  const [stakedBalance, setStakedBalance] = useState('0');
  const [earnedRewards, setEarnedRewards] = useState('0');
  const { getStakedBalance, getEarnedRewards } = useStaking();

  useEffect(() => {
    const updateBalances = async () => {
      if (account) {
        try {
          const balance = await getStakedBalance(account);
          const rewards = await getEarnedRewards(account);
          setStakedBalance(balance);
          setEarnedRewards(rewards);
        } catch (err) {
          console.error('Error fetching balances:', err);
        }
      }
    };

    if (account) {
      updateBalances();
      const interval = setInterval(updateBalances, 15000);
      return () => clearInterval(interval);
    }
  }, [account, getStakedBalance, getEarnedRewards]);

  return { stakedBalance, earnedRewards, setStakedBalance, setEarnedRewards };
};