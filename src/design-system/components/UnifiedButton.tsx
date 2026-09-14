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
          ? 'bg-[#1B242D] hover:bg-[#1E2832] text-[#F5F7F8] border border-white/10'
          : 'bg-[#F6F8F7] hover:bg-[#EDF2EE] text-[#15201A] border border-[#E2E8E4]';
      case 'outline':
        return isDarkMode
          ? 'bg-transparent hover:bg-white/5 text-[#F5F7F8] border border-white/20'
          : 'bg-transparent hover:bg-slate-50 text-[#15201A] border border-[#E2E8E4]';
      case 'ghost':
        return isDarkMode
          ? 'bg-transparent hover:bg-white/5 text-[#AAB4BE] hover:text-[#F5F7F8]'
          : 'bg-transparent hover:bg-slate-100 text-[#53635A] hover:text-[#15201A]';
      case 'danger':
        return isDarkMode
          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
          : 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm';
      case 'success':
        return 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow-sm shadow-[#16A34A]/20';
      case 'soft':
        return isDarkMode
          ? 'bg-[#16A34A]/15 hover:bg-[#16A34A]/25 text-[#4ADE80] border border-[#16A34A]/30'
          : 'bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#15803D] border border-[#16A34A]/30';
      default: // primary
        return 'bg-[#16A34A] hover:bg-[#15803D] text-white font-bold shadow-sm shadow-[#16A34A]/20 active:scale-[0.98]';
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
