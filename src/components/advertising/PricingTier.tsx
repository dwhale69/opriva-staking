import React from 'react';
import type { PricingOption } from './types';

interface PricingTierProps {
  option: PricingOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const PricingTier = ({ option, isSelected, onSelect }: PricingTierProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`p-3 rounded-lg border transition-all ${
        isSelected
          ? 'border-[#8396FA] bg-[#8396FA]/10 neon-border'
          : 'border-[#8396FA]/20 hover:border-[#8396FA]/50'
      }`}
    >
      <div className="text-white font-medium">{option.label}</div>
      <div className="text-[#8396FA] text-sm">
        {option.price} OPRV
      </div>
    </button>
  );
};