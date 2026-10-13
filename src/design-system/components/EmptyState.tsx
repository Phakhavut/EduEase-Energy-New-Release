import React from 'react';
import { LucideIcon, Search, Sparkles } from 'lucide-react';
import { UnifiedButton } from './UnifiedButton';
import { renderIcon } from '../utils';

export interface EmptyStateProps {
  icon?: LucideIcon | React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  isDarkMode?: boolean;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Search,
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  isDarkMode = false,
  className = '',
}) => {
  return (
    <div className={`p-8 md:p-12 text-center rounded-[16px] border ${
      isDarkMode 
        ? 'bg-[#1C1C28]/80 border-[#38384E] text-[#F5F7F8]' 
        : 'bg-[#FFFFFF] border-[#E2E8E4] text-[#15201A]'
    } ${className}`}>
      <div className="w-12 h-12 mx-auto mb-4 rounded-[14px] bg-[#E0F7F9] dark:bg-[#1EC1CB]/15 text-[#156D74] dark:text-[#4DE5EE] flex items-center justify-center">
        {renderIcon(Icon, "w-6 h-6")}
      </div>

      <h3 className="text-base md:text-lg font-bold font-display mb-1.5 text-[#15201A] dark:text-[#F5F7F8]">
        {title}
      </h3>

      <p className="text-xs md:text-sm text-[#53635A] dark:text-[#AAB4BE] max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      {(actionText || secondaryActionText) && (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {actionText && onAction && (
            <UnifiedButton
              variant="primary"
              size="md"
              onClick={onAction}
            >
              {actionText}
            </UnifiedButton>
          )}
          {secondaryActionText && onSecondaryAction && (
            <UnifiedButton
              variant="secondary"
              size="md"
              isDarkMode={isDarkMode}
              onClick={onSecondaryAction}
            >
              {secondaryActionText}
            </UnifiedButton>
          )}
        </div>
      )}
    </div>
  );
};
