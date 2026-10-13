import React from 'react';
import { LucideIcon } from 'lucide-react';
import { renderIcon } from '../utils';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon | React.ReactNode;
  iconColor?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  isDarkMode?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-[#1EC1CB]',
  badge,
  action,
  isDarkMode = false,
}) => {
  return (
    <div className="flex items-center justify-between gap-3 mb-3">
      <div className="flex items-center gap-2 min-w-0">
        {Icon && (
          <div className="shrink-0">
            {renderIcon(Icon, `w-4 h-4 ${iconColor}`)}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm md:text-base font-bold font-display text-[#15201A] dark:text-[#F5F7F8] truncate">
              {title}
            </h2>
            {badge}
          </div>
          {subtitle && (
            <p className="text-[11px] text-[#78857D] dark:text-[#AAB4BE] truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};
