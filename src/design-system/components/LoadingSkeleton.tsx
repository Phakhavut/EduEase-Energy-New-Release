import React from 'react';

export interface LoadingSkeletonProps {
  type?: 'card' | 'stat' | 'row' | 'chart' | 'text';
  count?: number;
  isDarkMode?: boolean;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'card',
  count = 1,
  isDarkMode = false,
  className = '',
}) => {
  const bgClass = isDarkMode ? 'bg-[#1B242D] animate-pulse' : 'bg-slate-200/70 animate-pulse';

  const renderSingle = (key: number) => {
    switch (type) {
      case 'stat':
        return (
          <div key={key} className={`p-4 rounded-[16px] border ${isDarkMode ? 'border-white/10 bg-[#151C23]' : 'border-[#E2E8E4] bg-white'} space-y-3`}>
            <div className="flex justify-between items-center">
              <div className={`h-3 w-20 rounded-[6px] ${bgClass}`} />
              <div className={`w-8 h-8 rounded-[10px] ${bgClass}`} />
            </div>
            <div className={`h-7 w-28 rounded-[8px] ${bgClass}`} />
            <div className={`h-2.5 w-36 rounded-[6px] ${bgClass}`} />
          </div>
        );
      case 'chart':
        return (
          <div key={key} className={`p-5 rounded-[16px] border ${isDarkMode ? 'border-white/10 bg-[#151C23]' : 'border-[#E2E8E4] bg-white'} space-y-4`}>
            <div className="flex justify-between items-center">
              <div className={`h-4 w-32 rounded-[6px] ${bgClass}`} />
              <div className={`h-6 w-24 rounded-[8px] ${bgClass}`} />
            </div>
            <div className={`h-64 w-full rounded-[12px] ${bgClass}`} />
          </div>
        );
      case 'row':
        return (
          <div key={key} className={`p-3.5 rounded-[12px] border flex items-center justify-between gap-4 ${isDarkMode ? 'border-white/10 bg-[#151C23]' : 'border-[#E2E8E4] bg-white'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-[10px] ${bgClass}`} />
              <div className="space-y-1.5">
                <div className={`h-3.5 w-24 rounded-[6px] ${bgClass}`} />
                <div className={`h-2.5 w-16 rounded-[4px] ${bgClass}`} />
              </div>
            </div>
            <div className={`h-5 w-20 rounded-[6px] ${bgClass}`} />
          </div>
        );
      case 'text':
        return (
          <div key={key} className="space-y-2 py-1">
            <div className={`h-3.5 w-full rounded-[6px] ${bgClass}`} />
            <div className={`h-3.5 w-4/5 rounded-[6px] ${bgClass}`} />
          </div>
        );
      default: // card
        return (
          <div key={key} className={`p-5 rounded-[16px] border ${isDarkMode ? 'border-white/10 bg-[#151C23]' : 'border-[#E2E8E4] bg-white'} space-y-3`}>
            <div className={`h-4 w-3/5 rounded-[6px] ${bgClass}`} />
            <div className={`h-16 w-full rounded-[10px] ${bgClass}`} />
            <div className={`h-3 w-2/5 rounded-[6px] ${bgClass}`} />
          </div>
        );
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => renderSingle(idx))}
    </div>
  );
};
