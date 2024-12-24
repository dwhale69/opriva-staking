import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { STAKING_CONTRACT_ADDRESS, STAKING_ABI } from '../config/contracts';

export const useStaking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getContract = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, signer);
  }, []);

  const checkAndApproveToken = async (amount: string) => {
    try {
      const contract = await getContract();
      const signer = contract.signer;
      const address = await signer.getAddress();
      
      // Check current allowance
      const allowance = await contract.allowance(address, STAKING_CONTRACT_ADDRESS);
      const requiredAmount = ethers.utils.parseEther(amount);
      
      if (allowance.lt(requiredAmount)) {
        // Request approval for a large amount to avoid frequent approvals
        const tx = await contract.approve(
          STAKING_CONTRACT_ADDRESS, 
          ethers.constants.MaxUint256
        );
        await tx.wait();
      }
      
      return true;
    } catch (err) {
      console.error('Approval error:', err);
      throw new Error('Failed to approve token spending');
    }
  };

  const stake = async (amount: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // First approve token spending
      await checkAndApproveToken(amount);
      
      // Then stake
      const contract = await getContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      const tx = await contract.stake(parsedAmount);
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      
      // Check for Staked event
      const stakedEvent = receipt.events?.find(
        (event: any) => event.event === 'Staked'
      );
      
      if (!stakedEvent) {
        throw new Error('Staking transaction failed');
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const unstake = async (amount: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const contract = await getContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      const tx = await contract.unstake(parsedAmount);
      
      const receipt = await tx.wait();
      
      const withdrawnEvent = receipt.events?.find(
        (event: any) => event.event === 'Withdrawn'
      );
      
      if (!withdrawnEvent) {
        throw new Error('Unstaking transaction failed');
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getRewards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const contract = await getContract();
      const tx = await contract.getRewards();
      
      const receipt = await tx.wait();
      
      const rewardPaidEvent = receipt.events?.find(
        (event: any) => event.event === 'RewardPaid'
      );
      
      if (!rewardPaidEvent) {
        throw new Error('Reward claim failed');
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getStakedBalance = async (address: string) => {
    try {
      const contract = await getContract();
      const balance = await contract.balanceOf(address);
      return ethers.utils.formatEther(balance);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return '0';
    }
  };

  const getEarnedRewards = async (address: string) => {
    try {
      const contract = await getContract();
      const earned = await contract.earned(address);
      return ethers.utils.formatEther(earned);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return '0';
    }
  };

  const getRewardRate = async () => {
    try {
      const contract = await getContract();
      const rewardRate = await contract.rewardRate();
      return ethers.utils.formatEther(rewardRate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return '0';
    }
  };

  return {
    stake,
    unstake,
    getRewards,
    getStakedBalance,
    getEarnedRewards,
    getRewardRate,
    isLoading,
    error
  };
};