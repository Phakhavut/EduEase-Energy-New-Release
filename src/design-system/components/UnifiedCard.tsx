import React from 'react';

export interface UnifiedCardProps {
  children: React.ReactNode;
  className?: string;
  isDarkMode?: boolean;
  hoverEffect?: boolean;
  variant?: 'default' | 'elevated' | 'subtle' | 'accent';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  id?: string;
}

export const UnifiedCard: React.FC<UnifiedCardProps> = ({
  children,
  className = '',
  isDarkMode = false,
  hoverEffect = false,
  variant = 'default',
  padding = 'md',
  onClick,
  id,
}) => {
  const getPadding = () => {
    switch (padding) {
      case 'none': return 'p-0';
      case 'sm': return 'p-3 md:p-3.5';
      case 'lg': return 'p-5 md:p-6';
      default: return 'p-4 md:p-5';
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return isDarkMode 
          ? 'bg-[#101B3B] border-[#1E2E5D] shadow-lg shadow-black/40' 
          : 'bg-[#FFFFFF] border-[#CBD5E1] shadow-sm';
      case 'subtle':
        return isDarkMode 
          ? 'bg-[#080E24]/90 border-[#152246]' 
          : 'bg-[#F8FAFC] border-[#E2E8F0]';
      case 'accent':
        return isDarkMode 
          ? 'bg-gradient-to-br from-[#1D4ED8]/25 via-[#0B132B] to-[#0B132B] border-blue-500/35 shadow-md shadow-blue-900/20' 
          : 'bg-gradient-to-br from-blue-50 via-white to-white border-blue-200';
      default:
        return isDarkMode 
          ? 'bg-[#0B132B] border-[#1E2E5D]/80 backdrop-blur-md' 
          : 'bg-[#FFFFFF] border-[#CBD5E1]';
    }
  };

  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-[18px] border transition-all duration-200 ${getPadding()} ${getVariantStyle()} ${
        hoverEffect ? 'hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
