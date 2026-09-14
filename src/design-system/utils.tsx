import React from 'react';
import { LucideIcon } from 'lucide-react';

/**
 * Safely renders an icon regardless of whether it was passed as:
 * - A LucideIcon component (React.forwardRef object with { $$typeof, render })
 * - A standard React functional component
 * - An instantiated JSX Element (e.g. <Bot className="w-5 h-5" />)
 * - A string / emoji / primitive React node
 */
export const renderIcon = (
  icon: LucideIcon | React.ComponentType<{ className?: string }> | React.ReactNode | undefined | null,
  className?: string,
  fallback: React.ReactNode = null
): React.ReactNode => {
  if (!icon) return fallback;

  if (React.isValidElement(icon)) {
    return icon;
  }

  if (
    typeof icon === 'function' ||
    (typeof icon === 'object' && icon !== null && ('$$typeof' in icon || 'render' in icon))
  ) {
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    return <IconComponent className={className} />;
  }

  return icon as React.ReactNode;
};
