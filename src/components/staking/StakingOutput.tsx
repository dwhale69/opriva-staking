import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

interface StakingOutputProps {
  receiveAmount: string;
  receiveSymbol: string;
}

export const StakingOutput = ({ receiveAmount, receiveSymbol }: StakingOutputProps) => {
  return (
    <div className="bg-[#1f2023] rounded-lg p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-gray-400">You will receive</span>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-white font-medium">
            {receiveAmount} {receiveSymbol}
          </span>
          <ArrowRightLeft size={16} className="text-[#8396FA]" />
        </div>
      </div>
    </div>
  );
};