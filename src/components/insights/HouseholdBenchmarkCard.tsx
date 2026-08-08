import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Home, 
  Store, 
  Briefcase, 
  TrendingDown, 
  TrendingUp, 
  BarChart, 
  Info, 
  CheckCircle2, 
  HelpCircle,
  Zap,
  Sparkles
} from 'lucide-react';
import { HouseholdBenchmark, InfoDetailMode } from '../../types';

interface HouseholdBenchmarkCardProps {
  benchmarks: HouseholdBenchmark[];
  mode: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const HouseholdBenchmarkCard: React.FC<HouseholdBenchmarkCardProps> = ({
  benchmarks,
  mode,
  lang,
  isDarkMode,
}) => {
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const activeProfile = benchmarks[selectedProfileIndex] || benchmarks[0];

  const getStatusBadge = (status: HouseholdBenchmark['status']) => {
    switch (status) {
      case 'below_average':
        return {
          labelTh: 'ประหยัดกว่าค่าเฉลี่ย (Below Average)',
          labelEn: 'Below Average (Efficient)',
          cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
        };
      case 'above_average':
        return {
          labelTh: 'สูงกว่าค่าเฉลี่ย (Above Average)',
          labelEn: 'Above Average (Heavy)',
          cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
        };
      default:
        return {
          labelTh: 'ระดับมาตรฐาน (Average)',
          labelEn: 'Average Level',
          cls: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
        };
    }
  };

  const statusBadge = getStatusBadge(activeProfile.status);

  return (
    <div className={`p-6 rounded-[2.5rem] border shadow-sm transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'เปรียบเทียบกับบ้านใกล้เคียง (Household Benchmark)' : 'Household Benchmark'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'อ้างอิงจากเกณฑ์มาตรฐานประเภทที่อยู่อาศัย ( Statistical reference models )' : 'Compared against benchmark house profiles'}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
        {benchmarks.map((b, idx) => (
          <button
            key={b.profileType}
            onClick={() => setSelectedProfileIndex(idx)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
              selectedProfileIndex === idx
                ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {lang === 'th' ? b.profileNameTh : b.profileNameEn}
          </button>
        ))}
      </div>

      {/* Active Profile Card */}
      <motion.div
        key={activeProfile.profileType}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4"
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className={`px-3 py-1 rounded-full font-extrabold text-xs border ${statusBadge.cls}`}>
            {lang === 'th' ? statusBadge.labelTh : statusBadge.labelEn}
          </span>

          <div className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
            {activeProfile.diffPct < 0 ? (
              <span className="text-emerald-500">{activeProfile.diffPct}% (ประหยัดกว่า)</span>
            ) : (
              <span className="text-amber-500">+{activeProfile.diffPct}% (สูงกว่า)</span>
            )}
          </div>
        </div>

        {/* Visual Bar Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[0.68rem] text-slate-400 font-bold uppercase tracking-wider block mb-1">
              {lang === 'th' ? 'การใช้ไฟของคุณ (Your Usage)' : 'Your Usage'}
            </span>
            <div className="text-lg font-black font-mono text-emerald-500">
              {activeProfile.userValueKwh} kWh <span className="text-xs font-normal text-slate-400">(฿{activeProfile.userCostThb.toLocaleString()})</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-emerald-500 h-full rounded-full" 
                style={{ width: `${Math.min(100, (activeProfile.userValueKwh / (activeProfile.averageKwh * 1.5)) * 100)}%` }} 
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[0.68rem] text-slate-400 font-bold uppercase tracking-wider block mb-1">
              {lang === 'th' ? 'ค่าเฉลี่ยเกณฑ์อ้างอิง (Benchmark Avg)' : 'Benchmark Avg'}
            </span>
            <div className="text-lg font-black font-mono text-slate-700 dark:text-slate-200">
              {activeProfile.averageKwh} kWh <span className="text-xs font-normal text-slate-400">(฿{activeProfile.averageCostThb.toLocaleString()})</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-blue-500 h-full rounded-full" 
                style={{ width: `${Math.min(100, (activeProfile.averageKwh / (activeProfile.averageKwh * 1.5)) * 100)}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Explanation */}
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {lang === 'th' ? activeProfile.explanationTh : activeProfile.explanationEn}
        </p>

        {mode !== 'simple' && activeProfile.potentialSavingsThb > 0 && (
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 font-medium flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                {lang === 'th' ? 'ศักยภาพการประหยัดเพิ่มเติมหากปรับสู่เกณฑ์มาตรฐาน:' : 'Potential savings if adjusted to average:'}
              </span>
            </div>
            <span className="font-extrabold font-mono text-sm text-blue-600 dark:text-blue-400 shrink-0">
              ~฿{activeProfile.potentialSavingsThb}/เดือน
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
