import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { PricingTier } from './PricingTier';
import { AIAssistant } from './AIAssistant';
import type { PricingOption } from './types';

export const AdvertisingForm = () => {
  const [formData, setFormData] = useState({
    brandName: '',
    description: '',
    logo: null as File | null,
    budget: '1000',
  });

  const pricingOptions: PricingOption[] = [
    { duration: 6, price: 1000, label: '6 Hours' },
    { duration: 12, price: 2000, label: '12 Hours' },
    { duration: 24, price: 3500, label: '24 Hours' },
    { duration: 72, price: 9000, label: '3 Days' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6 neon-text">Create Advertisement</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-300 mb-2">
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              className="w-full bg-[#1f2023] border border-[#8396FA]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8396FA] transition-colors"
              placeholder="Enter your brand name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#1f2023] border border-[#8396FA]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8396FA] transition-colors h-24 resize-none"
              placeholder="Describe your advertisement"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Logo (32x32)
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="flex items-center gap-2 px-4 py-2 bg-[#1f2023] border border-[#8396FA]/20 rounded-lg cursor-pointer hover:border-[#8396FA] transition-colors"
              >
                <Upload size={18} className="text-[#8396FA]" />
                <span className="text-gray-300">
                  {formData.logo ? formData.logo.name : 'Browse file'}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Select Duration & Budget
            </label>
            <div className="grid grid-cols-2 gap-4">
              {pricingOptions.map((option) => (
                <PricingTier
                  key={option.duration}
                  option={option}
                  isSelected={formData.budget === option.price.toString()}
                  onSelect={() => setFormData({ ...formData, budget: option.price.toString() })}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-all text-white font-medium neon-border"
          >
            Create Advertisement
          </button>
        </form>
      </div>

      <AIAssistant />
    </div>
  );
};