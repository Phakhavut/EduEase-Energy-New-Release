import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  DollarSign, 
  Database,
  BarChart2
} from 'lucide-react';
import { SmartAnomaly, InfoDetailMode, AppPage } from '../../types';

interface AnomalyCardProps {
  anomaly: SmartAnomaly;
  mode: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onResolve?: (id: string) => void;
  onNavigatePage?: (page: AppPage) => void;
}

export const AnomalyCard: React.FC<AnomalyCardProps> = ({
  anomaly,
  mode,
  lang,
  isDarkMode,
  onResolve,
  onNavigatePage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityBadge = () => {
    switch (anomaly.severity) {
      case 'critical':
        return { text: lang === 'th' ? 'วิกฤต (Critical)' : 'Critical', cls: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30' };
      case 'high':
        return { text: lang === 'th' ? 'เตือนภัยสูง (High)' : 'High Alert', cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' };
      case 'medium':
        return { text: lang === 'th' ? 'ปานกลาง (Medium)' : 'Medium', cls: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30' };
      default:
        return { text: lang === 'th' ? 'ข้อแนะนำ (Low)' : 'Notice', cls: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' };
    }
  };

  const badge = getSeverityBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 md:p-6 rounded-[2rem] border transition-all relative overflow-hidden shadow-sm ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white hover:border-slate-700' 
          : 'bg-white border-slate-100 text-slate-800 hover:shadow-md'
      }`}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[0.68rem] border uppercase tracking-wider ${badge.cls}`}>
                {badge.text}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[0.65rem] font-bold">
                {anomaly.confidence}% {lang === 'th' ? 'ความเชื่อมั่น' : 'Confidence'}
              </span>
            </div>
            <h4 className="font-extrabold text-base md:text-lg font-display mt-1 text-slate-900 dark:text-white">
              {lang === 'th' ? anomaly.titleTh : anomaly.titleEn}
            </h4>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="font-black text-amber-600 dark:text-amber-400 text-base md:text-lg font-mono">
            +฿{anomaly.financialImpactThb}
          </div>
          <span className="text-[0.65rem] text-slate-400 font-medium block">
            {lang === 'th' ? 'ผลกระทบ/เดือน' : 'Impact / Mo'}
          </span>
        </div>
      </div>

      {/* Description per Info Detail Mode */}
      <div className="mb-4">
        {mode === 'simple' && (
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {lang === 'th' ? anomaly.simpleDescTh : anomaly.simpleDescEn}
          </p>
        )}

        {mode === 'balanced' && (
          <div className="space-y-2">
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {lang === 'th' ? anomaly.balancedDescTh : anomaly.balancedDescEn}
            </p>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 font-medium flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>{lang === 'th' ? 'สาเหตุสันนิษฐาน:' : 'Likely Cause:'}</strong> {lang === 'th' ? anomaly.whyTh : anomaly.whyEn}
              </span>
            </div>
          </div>
        )}

        {mode === 'detailed' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {lang === 'th' ? anomaly.detailedDescTh : anomaly.detailedDescEn}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80">
              <div>
                <span className="text-[0.65rem] text-slate-400 block font-sans">Baseline</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{anomaly.baselineKwh} kWh</span>
              </div>
              <div>
                <span className="text-[0.65rem] text-slate-400 block font-sans">Current</span>
                <span className="font-bold text-amber-500">{anomaly.currentKwh} kWh</span>
              </div>
              <div>
                <span className="text-[0.65rem] text-slate-400 block font-sans">Deviation</span>
                <span className="font-bold text-red-500">+{anomaly.deviationPct}%</span>
              </div>
              <div>
                <span className="text-[0.65rem] text-slate-400 block font-sans">Data Source</span>
                <span className="font-bold uppercase text-emerald-500">[{anomaly.source}]</span>
              </div>
            </div>

            {anomaly.assumptionsTh && (
              <div className="text-[0.7rem] text-slate-400 font-mono italic">
                * Note: {anomaly.assumptionsTh}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recommended Action Box */}
      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <Zap className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-[0.68rem] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              {lang === 'th' ? 'วิธีแก้ไขที่แนะนำ (Action Recommended):' : 'Recommended Action:'}
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-bold">
              {lang === 'th' ? anomaly.recommendedActionTh : anomaly.recommendedActionEn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {anomaly.relatedLessonId && onNavigatePage && (
            <button
              onClick={() => onNavigatePage('learning')}
              className="px-3 py-1.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-600 dark:text-blue-400 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'เรียนรู้เพิ่ม' : 'Learn More'}</span>
            </button>
          )}

          {onResolve && !anomaly.resolved && (
            <button
              onClick={() => onResolve(anomaly.id)}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-sm shadow-emerald-500/20 transition-all flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'แก้ไขแล้ว' : 'Resolve'}</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
