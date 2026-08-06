import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ChevronDown, Sparkles, Cpu, Calculator, CheckCircle, Lightbulb } from 'lucide-react';
import { InfoDetailMode } from '../../types';

export interface ProgressiveCardProps {
  mode: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  
  // 1. Core Summary (Level 1)
  title: string;
  icon?: React.ReactNode;
  summaryValue: React.ReactNode;
  summarySubtitle?: string;
  badgeText?: string;
  badgeType?: 'success' | 'warning' | 'info' | 'danger';

  // 2. Explanation / Reason (Level 2 - Balanced & Detailed)
  explanationTitle?: string;
  explanationText?: string | React.ReactNode;
  comparisonText?: string;

  // 3. Technical Details / Formulas (Level 3 - Detailed Mode)
  formula?: string;
  rawMetrics?: { label: string; value: string }[];
  meterSource?: string;
  timestamp?: string;
  confidenceScore?: string;
  tariffBreakdown?: string;

  // 4. Single Recommended Action (Simple Mode focus)
  recommendedAction?: {
    label: string;
    actionText?: string;
    onExecute?: () => void;
  };

  // Optional custom chart or children
  children?: React.ReactNode;
  className?: string;
}

export const ProgressiveCard: React.FC<ProgressiveCardProps> = ({
  mode,
  lang,
  isDarkMode,
  title,
  icon,
  summaryValue,
  summarySubtitle,
  badgeText,
  badgeType = 'info',
  explanationTitle,
  explanationText,
  comparisonText,
  formula,
  rawMetrics,
  meterSource,
  timestamp,
  confidenceScore,
  tariffBreakdown,
  recommendedAction,
  children,
  className = '',
}) => {
  // Local state for explicit manual expansion if user wants to peek inside simple mode
  const [manualExpand, setManualExpand] = useState<'explanation' | 'technical' | null>(null);

  const getBadgeStyle = () => {
    switch (badgeType) {
      case 'success':
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'warning':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'danger':
        return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div
      className={`p-5 rounded-[2rem] border transition-all duration-300 relative ${
        isDarkMode
          ? 'bg-slate-900/85 border-slate-800 hover:border-slate-700 text-white'
          : 'bg-white border-slate-100 hover:border-emerald-200 text-slate-800 shadow-sm'
      } ${className}`}
    >
      {/* CARD HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">{icon}</div>}
          <h3 className="font-extrabold text-sm font-display tracking-tight text-slate-800 dark:text-slate-100">
            {title}
          </h3>
        </div>

        {badgeText && (
          <span className={`text-[0.68rem] font-bold px-2.5 py-0.5 rounded-full border ${getBadgeStyle()}`}>
            {badgeText}
          </span>
        )}
      </div>

      {/* LEVEL 1: SUMMARY (Always visible across all modes) */}
      <div className="mb-2">
        <div className="text-2xl md:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
          {summaryValue}
        </div>
        {summarySubtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            {summarySubtitle}
          </p>
        )}
      </div>

      {/* MODE 1: SIMPLE MODE -> Single Clear Recommended Action & Impact */}
      {mode === 'simple' && (
        <div className="mt-3 space-y-2">
          {recommendedAction && (
            <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${
              isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
                <span>{recommendedAction.label}</span>
              </div>
              {recommendedAction.onExecute && (
                <button
                  onClick={recommendedAction.onExecute}
                  className="px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-sm transition-all shrink-0 cursor-pointer"
                >
                  {recommendedAction.actionText || (lang === 'th' ? 'ทำเลย' : 'Do It')}
                </button>
              )}
            </div>
          )}

          {/* Progressive disclosure peek button for simple mode */}
          {(explanationText || formula) && (
            <div className="pt-1 flex items-center gap-2 text-[0.7rem]">
              <button
                onClick={() => setManualExpand(manualExpand === 'explanation' ? null : 'explanation')}
                className="text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 font-bold flex items-center gap-1 transition-colors"
              >
                <Info className="w-3.5 h-3.5" />
                <span>
                  {manualExpand === 'explanation'
                    ? (lang === 'th' ? 'ซ่อนคำอธิบาย' : 'Hide Reason')
                    : (lang === 'th' ? '💡 ดูเหตุผลเพิ่มเติม' : '💡 View Reason')}
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform ${manualExpand === 'explanation' ? 'rotate-180' : ''}`} />
              </button>

              {(formula || rawMetrics) && (
                <button
                  onClick={() => setManualExpand(manualExpand === 'technical' ? null : 'technical')}
                  className="text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 font-bold flex items-center gap-1 transition-colors ml-auto"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>
                    {manualExpand === 'technical'
                      ? (lang === 'th' ? 'ซ่อนข้อมูลเชิงลึก' : 'Hide Specs')
                      : (lang === 'th' ? '⚙️ สูตรคำนวณ' : '⚙️ Formulas')}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${manualExpand === 'technical' ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* LEVEL 2: EXPLANATION & COMPARISONS (Visible in Balanced, Detailed, or manually expanded) */}
      {(mode === 'balanced' || mode === 'detailed' || manualExpand === 'explanation') && (
        <div className="mt-3 space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-3">
          {explanationText && (
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {explanationTitle && <span className="font-bold text-slate-800 dark:text-slate-100 mr-1.5">{explanationTitle}:</span>}
              {explanationText}
            </div>
          )}

          {comparisonText && (
            <div className="text-[0.7rem] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-xl w-fit">
              <Sparkles className="w-3 h-3" />
              <span>{comparisonText}</span>
            </div>
          )}
        </div>
      )}

      {/* LEVEL 3: TECHNICAL DETAILS, FORMULAS & RAW METRICS (Visible in Detailed mode, or manually expanded) */}
      {(mode === 'detailed' || manualExpand === 'technical') && (
        <div className={`mt-3 p-3.5 rounded-2xl border text-xs font-mono space-y-2.5 ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center justify-between text-[0.68rem] font-sans font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200/60 dark:border-slate-800/80 pb-1.5">
            <span className="flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5" />
              {lang === 'th' ? 'ข้อมูลทางเทคนิค & สูตรคำนวณ' : 'Technical Details & Formula'}
            </span>
            {confidenceScore && <span className="text-amber-500 font-bold">{confidenceScore}</span>}
          </div>

          {formula && (
            <div>
              <div className="text-[0.65rem] text-slate-400 uppercase font-sans font-bold">
                {lang === 'th' ? 'สูตรการคิดคำนวณ (Formula):' : 'Calculation Formula:'}
              </div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 p-2 rounded-xl mt-1 break-all">
                {formula}
              </div>
            </div>
          )}

          {rawMetrics && rawMetrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 text-[0.7rem]">
              {rawMetrics.map((m, idx) => (
                <div key={idx} className="p-1.5 rounded-xl bg-slate-200/50 dark:bg-slate-900/60 flex flex-col">
                  <span className="text-[0.62rem] text-slate-400 font-sans font-bold">{m.label}</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-100">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {tariffBreakdown && (
            <div className="text-[0.68rem] text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-700 dark:text-slate-300">{lang === 'th' ? 'โครงสร้างอัตราค่าไฟ: ' : 'Tariff Structure: '}</span>
              {tariffBreakdown}
            </div>
          )}

          {(meterSource || timestamp) && (
            <div className="flex items-center justify-between text-[0.65rem] text-slate-400 font-sans border-t border-slate-200/40 dark:border-slate-800/60 pt-1.5">
              {meterSource && <span>{lang === 'th' ? 'แหล่งที่มา:' : 'Source:'} {meterSource}</span>}
              {timestamp && <span>{timestamp}</span>}
            </div>
          )}
        </div>
      )}

      {/* Render optional child graphs or custom elements */}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
};
