import React from 'react';
import { LucideIcon } from 'lucide-react';
import { renderIcon } from '../utils';

export interface TabItem<T extends string = string> {
  id: T;
  labelTh: string;
  labelEn: string;
  icon?: LucideIcon | React.ReactNode;
  badge?: string | number;
}

export interface SegmentedTabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
  size?: 'sm' | 'md';
  variant?: 'pill' | 'underline' | 'segmented';
  className?: string;
}

export const SegmentedTabs = <T extends string = string>({
  tabs,
  activeTab,
  onChange,
  lang = 'th',
  isDarkMode = false,
  size = 'md',
  variant = 'segmented',
  className = '',
}: SegmentedTabsProps<T>) => {
  if (variant === 'underline') {
    return (
      <div className={`flex items-center gap-4 border-b overflow-x-auto scrollbar-none ${
        isDarkMode ? 'border-white/10' : 'border-[#E2E8E4]'
      } ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 pb-3 px-1 text-xs md:text-sm font-bold border-b-2 transition-colors shrink-0 cursor-pointer ${
                isActive
                  ? 'border-[#1EC1CB] text-[#1EC1CB] dark:text-[#4DE5EE]'
                  : 'border-transparent text-[#78857D] dark:text-[#AAB4BE] hover:text-[#15201A] dark:hover:text-[#F5F7F8]'
              }`}
            >
              {Icon && (
                <span className="shrink-0">
                  {renderIcon(Icon, "w-4 h-4")}
                </span>
              )}
              <span>{lang === 'th' ? tab.labelTh : tab.labelEn}</span>
              {tab.badge !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                  isActive ? 'bg-[#1EC1CB] text-slate-900' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Default 'segmented' / 'pill' container
  return (
    <div className={`inline-flex items-center gap-1.5 p-1 rounded-[12px] border overflow-x-auto scrollbar-none max-w-full ${
      isDarkMode 
        ? 'bg-[#1C1C28] border-[#38384E]' 
        : 'bg-[#F5F7FA] border-[#CBD5E1]'
    } ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon;
        const paddingClass = size === 'sm' ? 'py-1.5 px-3 text-xs' : 'py-2 px-3.5 text-xs md:text-sm';

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center justify-center gap-2 rounded-[9px] font-bold transition-all shrink-0 cursor-pointer ${paddingClass} ${
              isActive
                ? isDarkMode
                  ? 'bg-[#242435] text-[#4DE5EE] shadow-sm border border-[#1EC1CB]/40'
                  : 'bg-[#FFFFFF] text-[#156D74] shadow-sm border border-[#1EC1CB]/30'
                : 'text-[#53635A] dark:text-[#AAB4BE] hover:text-[#15201A] dark:hover:text-[#F5F7F8] border border-transparent'
            }`}
          >
            {Icon && (
              <span className="shrink-0">
                {renderIcon(Icon, "w-3.5 h-3.5")}
              </span>
            )}
            <span>{lang === 'th' ? tab.labelTh : tab.labelEn}</span>
            {tab.badge !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-[6px] text-[10px] font-mono font-bold ${
                isActive 
                  ? 'bg-[#1EC1CB] text-slate-900' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
