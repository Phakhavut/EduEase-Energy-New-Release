import React from 'react';
import { motion } from 'motion/react';
import { EduEaseIllustration, IllustrationName, IllustrationSize } from '../illustrations';
import { UnifiedButton } from '../../design-system';

interface EmptyStateProps {
  illustration: IllustrationName;
  illustrationSize?: IllustrationSize;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  isDarkMode?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  illustration,
  illustrationSize = 'xl',
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  isDarkMode = false,
  className = '',
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-xs max-w-lg mx-auto ${className}`}
    >
      <div className="mb-4">
        <EduEaseIllustration
          name={illustration}
          size={illustrationSize}
          isDarkMode={isDarkMode}
          animated={true}
        />
      </div>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
          {description}
        </p>
      )}

      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {actionLabel && onAction && (
            <UnifiedButton
              variant="primary"
              size="md"
              onClick={onAction}
            >
              {actionLabel}
            </UnifiedButton>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <UnifiedButton
              variant="secondary"
              size="md"
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </UnifiedButton>
          )}
        </div>
      )}

      {children && <div className="mt-4 w-full">{children}</div>}
    </motion.div>
  );
};
