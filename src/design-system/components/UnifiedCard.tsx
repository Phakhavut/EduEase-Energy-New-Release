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
          ? 'bg-[#1B242D] border-white/10 shadow-md' 
          : 'bg-[#FFFFFF] border-[#E2E8E4] shadow-sm';
      case 'subtle':
        return isDarkMode 
          ? 'bg-[#151C23]/60 border-white/5' 
          : 'bg-[#F6F8F7] border-[#E2E8E4]';
      case 'accent':
        return isDarkMode 
          ? 'bg-gradient-to-br from-[#16A34A]/10 to-[#151C23] border-[#16A34A]/30' 
          : 'bg-gradient-to-br from-[#DCFCE7]/60 to-[#FFFFFF] border-[#16A34A]/30';
      default:
        return isDarkMode 
          ? 'bg-[#151C23] border-white/10' 
          : 'bg-[#FFFFFF] border-[#E2E8E4]';
    }
  };

  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-[16px] border transition-all duration-200 ${getPadding()} ${getVariantStyle()} ${
        hoverEffect ? 'hover:border-[#16A34A]/40 hover:shadow-md' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
