import React from 'react';
import { LucideIcon, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { UnifiedCard } from './UnifiedCard';
import { renderIcon } from '../utils';

export interface InsightCardProps {
  title: string;
  description: string;
  impactText?: string;
  category?: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'purple';
  icon?: LucideIcon | React.ReactNode;
  confidence?: number;
  actionText?: string;
  onAction?: () => void;
  actionSecondary?: React.ReactNode;
  isApplied?: boolean;
  isDarkMode?: boolean;
  className?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  impactText,
  category,
  variant = 'success',
  icon: Icon,
  confidence,
  actionText,
  onAction,
  actionSecondary,
  isApplied = false,
  isDarkMode = false,
  className = '',
}) => {
  const getTheme = () => {
    switch (variant) {
      case 'warning':
        return {
          icon: renderIcon(Icon, "w-4 h-4", <AlertTriangle className="w-4 h-4" />),
          iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
          border: 'border-amber-200 dark:border-amber-500/30',
          impactBg: 'bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300',
        };
      case 'danger':
        return {
          icon: renderIcon(Icon, "w-4 h-4", <AlertCircle className="w-4 h-4" />),
          iconBg: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
          border: 'border-rose-200 dark:border-rose-500/30',
          impactBg: 'bg-rose-50 text-rose-800 dark:bg-rose-950/30 dark:text-rose-300',
        };
      case 'purple':
        return {
          icon: renderIcon(Icon, "w-4 h-4", <Sparkles className="w-4 h-4" />),
          iconBg: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
          border: 'border-purple-200 dark:border-purple-500/30',
          impactBg: 'bg-purple-50 text-purple-800 dark:bg-purple-950/30 dark:text-purple-300',
        };
      case 'info':
        return {
          icon: renderIcon(Icon, "w-4 h-4", <Info className="w-4 h-4" />),
          iconBg: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
          border: 'border-blue-200 dark:border-blue-500/30',
          impactBg: 'bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300',
        };
      default:
        return {
          icon: renderIcon(Icon, "w-4 h-4", <Sparkles className="w-4 h-4" />),
          iconBg: 'bg-[#E0F7F9] text-[#156D74] dark:bg-[#1EC1CB]/15 dark:text-[#4DE5EE]',
          border: 'border-[#1EC1CB]/30 dark:border-[#1EC1CB]/30',
          impactBg: 'bg-[#E0F7F9]/80 text-[#156D74] dark:bg-[#1EC1CB]/15 dark:text-[#4DE5EE]',
        };
    }
  };

  const theme = getTheme();

  return (
    <UnifiedCard
      isDarkMode={isDarkMode}
      className={`relative overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2.5 mb-2.5">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 ${theme.iconBg}`}>
              {theme.icon}
            </div>
            {category && (
              <span className="text-[11px] font-semibold text-[#78857D] dark:text-[#AAB4BE] uppercase tracking-wider">
                {category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {confidence && (
              <span className="text-[10px] font-mono text-[#78857D] dark:text-[#AAB4BE]">
                {confidence}% AI
              </span>
            )}
            {isApplied && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-[#E0F7F9] text-[#156D74] dark:bg-[#1EC1CB]/15 dark:text-[#4DE5EE]">
                <CheckCircle2 className="w-3 h-3" />
                <span>ปรับใช้แล้ว</span>
              </span>
            )}
          </div>
        </div>

        <h3 className="font-bold text-sm text-[#15201A] dark:text-[#F5F7F8] font-display mb-1">
          {title}
        </h3>

        <p className="text-xs text-[#53635A] dark:text-[#AAB4BE] leading-relaxed mb-3">
          {description}
        </p>
      </div>

      <div className="space-y-3 pt-2 border-t border-[#E2E8E4] dark:border-white/5">
        {impactText && (
          <div className={`px-2.5 py-1.5 rounded-[8px] text-xs font-semibold flex items-center justify-between font-mono ${theme.impactBg}`}>
            <span>{impactText}</span>
          </div>
        )}

        {(actionText || actionSecondary) && (
          <div className="flex items-center justify-between gap-2">
            {actionSecondary || <div />}
            {actionText && onAction && (
              <button
                type="button"
                onClick={onAction}
                disabled={isApplied}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#1EC1CB] hover:bg-[#169EA7] text-[#1C1C28] text-xs font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </UnifiedCard>
  );
};
