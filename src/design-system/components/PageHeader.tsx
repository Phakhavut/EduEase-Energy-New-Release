import React from 'react';
import { Sparkles } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { renderIcon } from '../utils';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon | React.ReactNode;
  iconColor?: string;
  badgeText?: string;
  badgeVariant?: 'brand' | 'warning' | 'danger' | 'info' | 'neutral';
  actions?: React.ReactNode;
  onStartTour?: () => void;
  tourStepLabel?: string;
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-[#1EC1CB]',
  badgeText,
  badgeVariant = 'brand',
  actions,
  onStartTour,
  tourStepLabel,
  lang = 'th',
  isDarkMode = false,
}) => {
  const getBadgeStyle = () => {
    switch (badgeVariant) {
      case 'warning':
        return isDarkMode ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200';
      case 'danger':
        return isDarkMode ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' : 'bg-rose-50 text-rose-700 border-rose-200';
      case 'info':
        return isDarkMode ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200';
      case 'neutral':
        return isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return isDarkMode ? 'bg-[#1EC1CB]/15 text-[#4DE5EE] border-[#1EC1CB]/30' : 'bg-[#E0F7F9] text-[#156D74] border-[#1EC1CB]/30';
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={`p-2.5 rounded-[12px] shrink-0 ${
            isDarkMode ? 'bg-[#1C1C28] border border-[#38384E]' : 'bg-[#F5F7FA] border border-[#E2E6EE]'
          }`}>
            {renderIcon(Icon, `w-6 h-6 ${iconColor}`)}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold font-display text-[#15201A] dark:text-[#F5F7F8] tracking-tight">
              {title}
            </h1>
            {badgeText && (
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-[8px] border ${getBadgeStyle()}`}>
                {badgeText}
              </span>
            )}
            {onStartTour && (
              <button
                type="button"
                onClick={onStartTour}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[8px] text-[11px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all cursor-pointer"
                title={lang === 'th' ? 'แนะนำฟีเจอร์ในหน้านี้' : 'Page guide'}
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{tourStepLabel || (lang === 'th' ? 'แนะนำหน้านี้' : 'Page Tour')}</span>
              </button>
            )}
          </div>
          {subtitle && (
            <p className="text-xs md:text-sm text-[#53635A] dark:text-[#AAB4BE] mt-0.5 font-normal max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};
