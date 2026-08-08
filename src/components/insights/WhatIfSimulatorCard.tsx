import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sliders, 
  Sparkles, 
  TrendingDown, 
  TreePine, 
  Award, 
  DollarSign, 
  Zap, 
  ArrowRight,
  Clock,
  RotateCcw
} from 'lucide-react';
import { WhatIfScenario, InfoDetailMode } from '../../types';

interface WhatIfSimulatorCardProps {
  scenarios: WhatIfScenario[];
  mode: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const WhatIfSimulatorCard: React.FC<WhatIfSimulatorCardProps> = ({
  scenarios,
  mode,
  lang,
  isDarkMode,
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const activeScenario = scenarios[selectedScenarioIndex] || scenarios[0];

  return (
    <div className={`p-6 rounded-[2.5rem] border shadow-sm transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'จำลองสถานการณ์ล่วงหน้า (What-If Simulator)' : 'What-If Simulator'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'ทดสอบผลลัพธ์ประหยัดไฟ คืนทุน และลดคาร์บอนก่อนตัดสินใจปรับพฤติกรรม' : 'Simulate monthly savings, payback periods, and CO₂ reductions before changing habits'}
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => setSelectedScenarioIndex(idx)}
            className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
              selectedScenarioIndex === idx
                ? 'bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-500/20 font-bold'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="text-xs font-extrabold line-clamp-1 font-display">
              {lang === 'th' ? sc.titleTh : sc.titleEn}
            </div>
            <div className={`text-[0.7rem] font-mono mt-1 ${selectedScenarioIndex === idx ? 'text-indigo-100' : 'text-emerald-500 font-bold'}`}>
              +฿{sc.monthlySavingThb}/เดือน (~฿{sc.yearlySavingThb}/ปี)
            </div>
          </button>
        ))}
      </div>

      {/* Active Scenario Detailed Dashboard */}
      <motion.div
        key={activeScenario.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-slate-500/5 to-emerald-500/10 border border-indigo-500/20 space-y-4"
      >
        <h4 className="text-base md:text-lg font-black font-display text-slate-900 dark:text-white">
          {lang === 'th' ? activeScenario.titleTh : activeScenario.titleEn}
        </h4>

        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {lang === 'th' ? activeScenario.descriptionTh : activeScenario.descriptionEn}
        </p>

        {/* 4 Impact Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center">
            <span className="text-[0.65rem] font-extrabold uppercase text-slate-400 block mb-1">
              {lang === 'th' ? 'ประหยัดรายเดือน' : 'Monthly Saving'}
            </span>
            <div className="text-lg font-black font-mono text-emerald-500">
              ฿{activeScenario.monthlySavingThb}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center">
            <span className="text-[0.65rem] font-extrabold uppercase text-slate-400 block mb-1">
              {lang === 'th' ? 'ประหยัดรายปี' : 'Yearly Saving'}
            </span>
            <div className="text-lg font-black font-mono text-teal-500">
              ฿{activeScenario.yearlySavingThb.toLocaleString()}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center">
            <span className="text-[0.65rem] font-extrabold uppercase text-slate-400 block mb-1">
              {lang === 'th' ? 'ลดคาร์บอน (CO₂)' : 'CO₂ Cut'}
            </span>
            <div className="text-lg font-black font-mono text-emerald-600 flex items-center justify-center gap-1">
              <TreePine className="w-4 h-4" />
              <span>{activeScenario.co2ReductionKg} kg</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center">
            <span className="text-[0.65rem] font-extrabold uppercase text-slate-400 block mb-1">
              {lang === 'th' ? 'เพิ่ม Score' : 'Score Boost'}
            </span>
            <div className="text-lg font-black font-mono text-purple-500 flex items-center justify-center gap-1">
              <Award className="w-4 h-4" />
              <span>+{activeScenario.scoreImprovementPts} pts</span>
            </div>
          </div>
        </div>

        {activeScenario.paybackPeriodMonths !== undefined && activeScenario.paybackPeriodMonths > 0 && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 font-mono font-bold flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span>
              {lang === 'th' ? `ระยะเวลาคืนทุนโดยประมาณ (Payback Period): ${activeScenario.paybackPeriodMonths} เดือน` : `Est. Payback Period: ${activeScenario.paybackPeriodMonths} months`}
            </span>
          </div>
        )}

        {/* AI Recommendation */}
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-200 font-medium flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>
            <strong>AI Recommendation:</strong> {activeScenario.aiRecommendationTh}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
