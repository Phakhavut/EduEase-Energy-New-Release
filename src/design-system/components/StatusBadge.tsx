import React from 'react';
import { LucideIcon } from 'lucide-react';
import { renderIcon } from '../utils';

export interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neutral';
  size?: 'sm' | 'md';
  icon?: LucideIcon | React.ReactNode;
  dot?: boolean;
  isDarkMode?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  variant = 'brand',
  size = 'md',
  icon: Icon,
  dot = false,
  isDarkMode = false,
  className = '',
}) => {
  const getStyle = () => {
    switch (variant) {
      case 'success':
        return isDarkMode
          ? 'bg-[#16A34A]/20 text-[#4ADE80] border-[#16A34A]/30'
          : 'bg-[#DCFCE7] text-[#15803D] border-[#16A34A]/20';
      case 'warning':
        return isDarkMode
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
          : 'bg-amber-50 text-amber-800 border-amber-200';
      case 'danger':
        return isDarkMode
          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
          : 'bg-rose-50 text-rose-800 border-rose-200';
      case 'info':
        return isDarkMode
          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
          : 'bg-blue-50 text-blue-800 border-blue-200';
      case 'purple':
        return isDarkMode
          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
          : 'bg-purple-50 text-purple-800 border-purple-200';
      case 'neutral':
        return isDarkMode
          ? 'bg-slate-800 text-slate-300 border-slate-700'
          : 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return isDarkMode
          ? 'bg-[#16A34A]/20 text-[#4ADE80] border-[#16A34A]/30'
          : 'bg-[#DCFCE7] text-[#15803D] border-[#16A34A]/20';
    }
  };

  const getDotColor = () => {
    switch (variant) {
      case 'success': return 'bg-[#16A34A]';
      case 'warning': return 'bg-amber-500';
      case 'danger': return 'bg-rose-500';
      case 'info': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      case 'neutral': return 'bg-slate-400';
      default: return 'bg-[#16A34A]';
    }
  };

  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[8px] font-semibold border ${getStyle()} ${sizeClass} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`} />}
      {Icon && (
        <span className="shrink-0">
          {renderIcon(Icon, "w-3 h-3")}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
