import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ChevronDown, Sparkles, Cpu, Calculator, CheckCircle, Lightbulb } from 'lucide-react';
import { InfoDetailMode } from '../../types';

export interface ProgressiveCardProps {
  mode?: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  
  // 1. Core Summary (Level 1)
  title: string;
  icon?: React.ReactNode;
  summaryValue: React.ReactNode;
  summarySubtitle?: string;
  badgeText?: string;
  badgeType?: 'success' | 'warning' | 'info' | 'danger';

  // 2. Explanation / Reason (Level 2 - Expandable)
  explanationTitle?: string;
  explanationText?: string | React.ReactNode;
  comparisonText?: string;

  // 3. Technical Details / Formulas & Historical Granular Data (Level 3 - Expandable via 'View More')
  formula?: string;
  rawMetrics?: { label: string; value: string }[];
  historicalMetrics?: { period: string; kwh: string; cost: string; status?: 'optimal' | 'normal' | 'peak' }[];
  meterSource?: string;
  timestamp?: string;
  confidenceScore?: string;
  tariffBreakdown?: string;

  // 4. Single Recommended Action
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
  mode = 'balanced',
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
  historicalMetrics,
  meterSource,
  timestamp,
  confidenceScore,
  tariffBreakdown,
  recommendedAction,
  children,
  className = '',
}) => {
  // Local state for user-driven progressive disclosure - hidden by default
  const [showExplanation, setShowExplanation] = useState(false);
  const [showGranularData, setShowGranularData] = useState(false);

  const hasExplanation = !!(explanationText || comparisonText);
  const hasGranularData = !!(
    formula || 
    (rawMetrics && rawMetrics.length > 0) || 
    (historicalMetrics && historicalMetrics.length > 0) ||
    tariffBreakdown || 
    meterSource || 
    confidenceScore
  );

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

      {/* LEVEL 1: SUMMARY (Always visible) */}
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

      {/* Recommended Action */}
      {recommendedAction && (
        <div className={`mt-3 p-3 rounded-2xl border flex items-center justify-between gap-2 ${
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

      {/* INTERACTIVE EXPAND / COLLAPSE BUTTONS (Progressive Disclosure) */}
      {(hasExplanation || hasGranularData) && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 flex-wrap text-xs">
          {hasExplanation && (
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className={`px-3 py-1 rounded-full font-bold text-[0.72rem] transition-all flex items-center gap-1.5 cursor-pointer border ${
                showExplanation
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Info className="w-3 h-3" />
              <span>
                {showExplanation
                  ? (lang === 'th' ? 'ซ่อนคำอธิบาย' : 'Hide Reason')
                  : (lang === 'th' ? '💡 ดูเหตุผล & คำอธิบาย' : '💡 View Reason')}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showExplanation ? 'rotate-180' : ''}`} />
            </button>
          )}

          {hasGranularData && (
            <button
              onClick={() => setShowGranularData(!showGranularData)}
              className={`px-3.5 py-1 rounded-full font-bold text-[0.72rem] transition-all flex items-center gap-1.5 cursor-pointer border ${
                showGranularData
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>
                {showGranularData
                  ? (lang === 'th' ? 'ย่อข้อมูล (View Less)' : 'View Less')
                  : (lang === 'th' ? 'ดูเพิ่มเติม (View More)' : 'View More')}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showGranularData ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      )}

      {/* LEVEL 2: EXPLANATION & COMPARISONS (User-Expanded) */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.98, y: -4 }}
            animate={{ 
              opacity: 1, 
              height: 'auto', 
              scale: 1, 
              y: 0,
              transition: { 
                height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.25, ease: 'easeOut' },
                scale: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              scale: 0.98, 
              y: -4,
              transition: { 
                height: { duration: 0.22, ease: [0.32, 0, 0.67, 0] },
                opacity: { duration: 0.16, ease: 'easeIn' },
                scale: { duration: 0.18, ease: 'easeIn' }
              }
            }}
            className="mt-3 space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-3 overflow-hidden origin-top"
          >
            {explanationText && (
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal bg-slate-50/80 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                {explanationTitle && (
                  <span className="font-bold text-slate-800 dark:text-slate-100 mr-1.5 block mb-1">
                    {explanationTitle}:
                  </span>
                )}
                {explanationText}
              </div>
            )}

            {comparisonText && (
              <div className="text-[0.7rem] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-xl w-fit">
                <Sparkles className="w-3 h-3" />
                <span>{comparisonText}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEVEL 3: DETAILED HISTORICAL METRICS, FORMULAS & GRANULAR DATA (User-Expanded via 'View More') */}
      <AnimatePresence>
        {showGranularData && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.98, y: -6 }}
            animate={{ 
              opacity: 1, 
              height: 'auto', 
              scale: 1, 
              y: 0,
              transition: { 
                height: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.28, ease: 'easeOut' },
                scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              scale: 0.98, 
              y: -4,
              transition: { 
                height: { duration: 0.24, ease: [0.32, 0, 0.67, 0] },
                opacity: { duration: 0.18, ease: 'easeIn' },
                scale: { duration: 0.2, ease: 'easeIn' }
              }
            }}
            className={`mt-3 p-4 rounded-2xl border text-xs font-mono space-y-3 overflow-hidden origin-top ${
              isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[0.68rem] font-sans font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200/60 dark:border-slate-800/80 pb-1.5">
              <span className="flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5" />
                {lang === 'th' ? 'ข้อมูลย้อนหลัง & สเปกมิเตอร์เชิงลึก' : 'Detailed Historical & Granular Metrics'}
              </span>
              {confidenceScore && <span className="text-amber-500 font-bold">{confidenceScore}</span>}
            </div>

            {/* Granular Historical Metrics Breakdown */}
            {historicalMetrics && historicalMetrics.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[0.65rem] text-slate-400 uppercase font-sans font-bold">
                  {lang === 'th' ? 'สถิติการใช้ไฟย้อนหลัง (Historical Usage):' : 'Historical Usage Log:'}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[0.7rem]">
                  {historicalMetrics.map((h, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-900/70 flex flex-col justify-between border border-slate-300/40 dark:border-slate-800">
                      <span className="text-[0.6rem] text-slate-500 dark:text-slate-400 font-sans font-bold truncate">{h.period}</span>
                      <div className="mt-1">
                        <span className="font-extrabold text-slate-900 dark:text-white block">{h.kwh}</span>
                        <span className={`text-[0.62rem] font-bold ${
                          h.status === 'peak' ? 'text-rose-500' : h.status === 'optimal' ? 'text-emerald-500' : 'text-blue-500'
                        }`}>{h.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Granular Electrical Readings */}
            {rawMetrics && rawMetrics.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[0.65rem] text-slate-400 uppercase font-sans font-bold">
                  {lang === 'th' ? 'ค่าการวัดทางวิศวกรรมไฟฟ้า (Real-time Telemetry):' : 'Electrical Telemetry:'}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[0.7rem]">
                  {rawMetrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-200/50 dark:bg-slate-900/60 flex flex-col">
                      <span className="text-[0.6rem] text-slate-400 font-sans font-bold">{m.label}</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-100">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render optional child graphs or custom elements */}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
};
