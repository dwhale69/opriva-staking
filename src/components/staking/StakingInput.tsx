import React from 'react';

interface StakingInputProps {
  amount: string;
  setAmount: (value: string) => void;
  balance: string;
  symbol: string;
}

export const StakingInput = ({ amount, setAmount, balance, symbol }: StakingInputProps) => {
  return (
    <div className="bg-[#1f2023] rounded-lg p-4">
      <div className="flex flex-wrap justify-between text-sm text-gray-400 mb-2">
        <span>Amount</span>
        <span className="text-right">Balance: {balance} {symbol}</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="bg-transparent w-full text-white text-xl font-medium focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button className="text-[#8396FA] font-medium hover:text-[#899CFA] transition-colors">
            MAX
          </button>
          <span className="text-white font-medium">{symbol}</span>
        </div>
      </div>
    </div>
  );
};