import React from 'react';
import { LucideIcon, Info, HelpCircle } from 'lucide-react';
import { UnifiedCard } from './UnifiedCard';

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon | React.ReactNode;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  provenanceText?: string;
  provenanceType?: 'measured' | 'calculated' | 'predicted' | 'user';
  footer?: React.ReactNode;
  isDarkMode?: boolean;
  className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  icon: Icon,
  headerRight,
  children,
  provenanceText,
  provenanceType = 'calculated',
  footer,
  isDarkMode = false,
  className = '',
}) => {
  const getProvenanceBadge = () => {
    switch (provenanceType) {
      case 'measured':
        return { label: 'วัดจากมิเตอร์จริง (Measured)', color: 'text-[#156D74] dark:text-[#4DE5EE] bg-[#E0F7F9] dark:bg-[#1EC1CB]/15' };
      case 'predicted':
        return { label: 'พยากรณ์โดย AI (Predicted)', color: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40' };
      case 'user':
        return { label: 'ข้อมูลที่ผู้ใช้ระบุ (User Input)', color: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40' };
      default:
        return { label: 'คำนวณจากสูตร (Calculated)', color: 'text-[#53635A] dark:text-[#AAB4BE] bg-slate-100 dark:bg-slate-800' };
    }
  };

  const badge = getProvenanceBadge();

  return (
    <UnifiedCard isDarkMode={isDarkMode} className={className}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="w-8 h-8 rounded-[10px] bg-[#E0F7F9] dark:bg-[#1EC1CB]/15 text-[#156D74] dark:text-[#4DE5EE] flex items-center justify-center shrink-0">
              {typeof Icon === 'function' ? <Icon className="w-4 h-4" /> : Icon}
            </div>
          )}
          <div>
            <h3 className="font-bold text-sm md:text-base text-[#15201A] dark:text-[#F5F7F8] font-display">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-[#78857D] dark:text-[#AAB4BE]">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {headerRight && (
          <div className="shrink-0 flex items-center gap-2">
            {headerRight}
          </div>
        )}
      </div>

      {/* Main Chart Canvas / Area */}
      <div className="w-full">
        {children}
      </div>

      {/* Data Provenance & Footer */}
      {(provenanceText || footer) && (
        <div className="mt-4 pt-3 border-t border-[#E2E8E4] dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          {provenanceText ? (
            <div className="flex items-center gap-1.5 text-[11px] text-[#78857D] dark:text-[#AAB4BE]">
              <span className={`px-2 py-0.5 rounded-[6px] font-mono text-[10px] font-bold ${badge.color}`}>
                {badge.label}
              </span>
              <span>{provenanceText}</span>
            </div>
          ) : <div />}

          {footer && (
            <div className="shrink-0">
              {footer}
            </div>
          )}
        </div>
      )}
    </UnifiedCard>
  );
};
