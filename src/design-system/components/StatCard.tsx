import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { UnifiedCard } from './UnifiedCard';
import { renderIcon } from '../utils';

export interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subValue?: string;
  icon: LucideIcon | React.ReactNode;
  trend?: {
    value: string | number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
    isPositive?: boolean; // e.g. lower electricity cost is positive
  };
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'accent';
  isDarkMode?: boolean;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  subValue,
  icon: Icon,
  trend,
  badge,
  footer,
  variant = 'default',
  isDarkMode = false,
  onClick,
  className = '',
}) => {
  const renderTrend = () => {
    if (!trend) return null;
    const isGood = trend.isPositive !== undefined 
      ? trend.isPositive 
      : trend.direction === 'down'; // In energy app, decreasing is usually good

    const textColor = isGood
      ? 'text-[#156D74] dark:text-[#4DE5EE] bg-[#E0F7F9] dark:bg-[#1EC1CB]/15'
      : trend.direction === 'neutral'
      ? 'text-[#53635A] dark:text-[#AAB4BE] bg-slate-100 dark:bg-slate-800'
      : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40';

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-[10px] font-bold font-mono ${textColor}`}>
        {trend.direction === 'up' && <TrendingUp className="w-3 h-3" />}
        {trend.direction === 'down' && <TrendingDown className="w-3 h-3" />}
        {trend.direction === 'neutral' && <Minus className="w-3 h-3" />}
        <span>{trend.value}</span>
        {trend.label && <span className="opacity-80 font-normal">{trend.label}</span>}
      </span>
    );
  };

  return (
    <UnifiedCard
      isDarkMode={isDarkMode}
      variant={variant}
      hoverEffect={!!onClick}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-medium text-[#78857D] dark:text-[#AAB4BE] truncate">
          {label}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {badge}
          <div className="w-8 h-8 rounded-[10px] bg-[#E0F7F9] dark:bg-[#1EC1CB]/15 text-[#156D74] dark:text-[#4DE5EE] flex items-center justify-center shrink-0">
            {renderIcon(Icon, "w-4 h-4")}
          </div>
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-2xl lg:text-3xl font-bold font-mono text-[#15201A] dark:text-[#F5F7F8] tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-medium text-[#78857D] dark:text-[#AAB4BE]">
            {unit}
          </span>
        )}
      </div>

      {(subValue || trend) && (
        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-[#E2E8E4] dark:border-white/5 text-xs">
          {subValue ? (
            <span className="text-[#53635A] dark:text-[#AAB4BE] text-[11px] truncate">
              {subValue}
            </span>
          ) : <div />}
          {renderTrend()}
        </div>
      )}

      {footer && (
        <div className="mt-3 pt-2.5 border-t border-[#E2E8E4] dark:border-white/10">
          {footer}
        </div>
      )}
    </UnifiedCard>
  );
};
