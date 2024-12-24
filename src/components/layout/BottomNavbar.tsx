import React from 'react';
import { CoinsIcon, MegaphoneIcon, LandmarkIcon, BarChart3Icon } from 'lucide-react';
import { NavItem } from './NavItem';

interface BottomNavbarProps {
  activeSection: 'stake' | 'advertise' | 'dao' | 'stats';
  onSectionChange: (section: 'stake' | 'advertise' | 'dao' | 'stats') => void;
}

export const BottomNavbar = ({ activeSection, onSectionChange }: BottomNavbarProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#141416] border-t border-[#1f2023] backdrop-blur-xl z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavItem
            icon={<CoinsIcon size={24} />}
            label="Stake"
            isActive={activeSection === 'stake'}
            onClick={() => onSectionChange('stake')}
          />
          <NavItem
            icon={<MegaphoneIcon size={24} />}
            label="Advertise"
            isActive={activeSection === 'advertise'}
            onClick={() => onSectionChange('advertise')}
          />
          <NavItem
            icon={<LandmarkIcon size={24} />}
            label="DAO"
            isActive={activeSection === 'dao'}
            onClick={() => onSectionChange('dao')}
          />
          <NavItem
            icon={<BarChart3Icon size={24} />}
            label="Stats"
            isActive={activeSection === 'stats'}
            onClick={() => onSectionChange('stats')}
          />
        </div>
      </div>
    </nav>
  );
};