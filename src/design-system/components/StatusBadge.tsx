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
      case 'brand':
        return isDarkMode
          ? 'bg-[#2563EB]/18 text-[#60A5FA] border-[#2563EB]/40'
          : 'bg-[#EFF6FF] text-[#1D4ED8] border-blue-200';
      case 'success':
        return isDarkMode
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
          : 'bg-emerald-50 text-emerald-800 border-emerald-200';
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
          ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
          : 'bg-sky-50 text-sky-800 border-sky-200';
      case 'purple':
        return isDarkMode
          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
          : 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'neutral':
        return isDarkMode
          ? 'bg-[#0E1A3D] text-slate-300 border-[#1E2E5D]'
          : 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return isDarkMode
          ? 'bg-[#2563EB]/18 text-[#60A5FA] border-[#2563EB]/40'
          : 'bg-[#EFF6FF] text-[#1D4ED8] border-blue-200';
    }
  };

  const getDotColor = () => {
    switch (variant) {
      case 'brand': return 'bg-[#38BDF8]';
      case 'success': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'danger': return 'bg-rose-500';
      case 'info': return 'bg-sky-500';
      case 'purple': return 'bg-indigo-500';
      case 'neutral': return 'bg-slate-400';
      default: return 'bg-[#38BDF8]';
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
