import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem = ({ icon, label, isActive = false, onClick }: NavItemProps) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 ${
        isActive 
          ? 'text-[#8396FA] scale-110' 
          : 'text-gray-400 hover:text-[#8396FA] hover:scale-110'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};