import React from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';
import { renderIcon } from '../utils';

export interface UnifiedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon | React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  isDarkMode?: boolean;
  children: React.ReactNode;
}

export const UnifiedButton: React.FC<UnifiedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  isDarkMode = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2.5 py-1.5 rounded-[8px] gap-1.5';
      case 'lg':
        return 'text-sm px-5 py-2.5 rounded-[12px] gap-2';
      default:
        return 'text-xs md:text-sm px-3.5 py-2 rounded-[10px] gap-2';
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return isDarkMode
          ? 'bg-[#0E1A3D] hover:bg-[#142352] text-[#F8FAFC] border border-[#1E2E5D]'
          : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0A1128] border border-[#CBD5E1]';
      case 'outline':
        return isDarkMode
          ? 'bg-transparent hover:bg-blue-500/10 text-[#38BDF8] border border-blue-500/30'
          : 'bg-transparent hover:bg-slate-50 text-[#0A1128] border border-[#CBD5E1]';
      case 'ghost':
        return isDarkMode
          ? 'bg-transparent hover:bg-white/5 text-[#94A3B8] hover:text-[#FFFFFF]'
          : 'bg-transparent hover:bg-slate-100 text-[#475569] hover:text-[#0A1128]';
      case 'danger':
        return isDarkMode
          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
          : 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm';
      case 'success':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20';
      case 'soft':
        return isDarkMode
          ? 'bg-[#2563EB]/15 hover:bg-[#2563EB]/25 text-[#60A5FA] border border-[#2563EB]/30'
          : 'bg-blue-50 hover:bg-blue-100 text-[#1D4ED8] border border-blue-200';
      default: // primary
        return 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold shadow-md shadow-blue-600/30 active:scale-[0.98] border border-blue-400/20';
    }
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-bold font-display transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${getSizeStyle()} ${getVariantStyle()} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <span className="shrink-0">
              {renderIcon(Icon, "w-4 h-4")}
            </span>
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <span className="shrink-0">
              {renderIcon(Icon, "w-4 h-4")}
            </span>
          )}
        </>
      )}
    </button>
  );
};
