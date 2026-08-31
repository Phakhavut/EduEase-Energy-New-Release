import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import {
  Plug,
  TrendingDown,
  TrendingUp,
  Zap,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Snowflake,
  Refrigerator,
  Monitor,
  Flame,
  Tv,
  WashingMachine,
  Plus
} from 'lucide-react';
import { UserPersona, InfoDetailMode, Appliance } from '../../types';
import { getMonthlyComparison, CategoryComparisonItem } from '../../data/monthlyComparisonData';

interface AppliancePriceComparisonProps {
  isDarkMode: boolean;
  lang: 'th' | 'en';
  persona?: UserPersona;
  infoDetailMode?: InfoDetailMode;
  userAppliances?: Appliance[];
  onNavigatePage?: (page: any) => void;
  onOpenAddAppliance?: () => void;
}

export const AppliancePriceComparison: React.FC<AppliancePriceComparisonProps> = ({
  isDarkMode,
  lang = 'th',
  persona = 'student',
  infoDetailMode = 'balanced',
  userAppliances = [],
  onNavigatePage,
  onOpenAddAppliance
}) => {
  const [unitMode, setUnitMode] = useState<'cost' | 'kwh'>('cost');
  const [filterMode, setFilterMode] = useState<'all' | 'savings' | 'costly'>('all');
  const [activeApplianceId, setActiveApplianceId] = useState<string | null>(null);

  const monthlyData = getMonthlyComparison(persona);
  const rawApplianceItems = monthlyData.categoryComparison;

  // Enhance items with calculations
  const enhancedItems = rawApplianceItems.map((item) => {
    const diffCost = item.thisMonthCost - item.prevMonthCost;
    const diffKwh = Number((item.thisMonthKwh - item.prevMonthKwh).toFixed(1));
    const diffPct = item.prevMonthCost > 0 ? ((diffCost / item.prevMonthCost) * 100) : 0;
    const isSaved = diffCost <= 0;

    return {
      ...item,
      diffCost,
      diffKwh,
      diffPct,
      isSaved,
    };
  });

  // Filter based on selected mode
  const displayedItems = enhancedItems.filter((item) => {
    if (filterMode === 'savings') return item.isSaved;
    if (filterMode === 'costly') return !item.isSaved || item.thisMonthCost >= 200;
    return true;
  });

  // Data formatted for Recharts Bar Chart
  const chartData = displayedItems.map((item) => ({
    key: item.categoryKey,
    name: lang === 'th' ? item.nameTh : item.nameEn,
    thisMonth: unitMode === 'cost' ? item.thisMonthCost : item.thisMonthKwh,
    prevMonth: unitMode === 'cost' ? item.prevMonthCost : item.prevMonthKwh,
    diffCost: item.diffCost,
    diffKwh: item.diffKwh,
    diffPct: item.diffPct,
    isSaved: item.isSaved,
    color: item.color,
    action: lang === 'th' ? item.savingActionTh : item.savingActionEn,
  }));

  // Get icon helper
  const getApplianceIcon = (key: string) => {
    const k = key.toLowerCase();
    if (k.includes('ac') || k.includes('air')) return <Snowflake className="w-5 h-5 text-cyan-500" />;
    if (k.includes('fridge')) return <Refrigerator className="w-5 h-5 text-teal-500" />;
    if (k.includes('electronic') || k.includes('laptop') || k.includes('pc') || k.includes('desktop')) return <Monitor className="w-5 h-5 text-blue-500" />;
    if (k.includes('water') || k.includes('heater')) return <Flame className="w-5 h-5 text-amber-500" />;
    if (k.includes('tv') || k.includes('media')) return <Tv className="w-5 h-5 text-purple-500" />;
    if (k.includes('wash')) return <WashingMachine className="w-5 h-5 text-indigo-500" />;
    return <Plug className="w-5 h-5 text-emerald-500" />;
  };

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const thisVal = payload.find((p: any) => p.dataKey === 'thisMonth')?.value || 0;
      const prevVal = payload.find((p: any) => p.dataKey === 'prevMonth')?.value || 0;
      const diff = thisVal - prevVal;
      const pct = prevVal > 0 ? ((diff / prevVal) * 100).toFixed(1) : '0';

      return (
        <div className={`p-3.5 rounded-2xl shadow-xl border text-xs font-sans ${
          isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="font-bold mb-2 pb-1.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <span className="font-display">{label}</span>
            <span className="text-[10px] font-mono text-emerald-500 font-bold">
              {unitMode === 'cost' ? '฿ THB' : 'kWh'}
            </span>
          </div>

          <div className="space-y-1.5 font-mono">
            <div className="flex items-center justify-between gap-4 text-emerald-500">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                {lang === 'th' ? 'เดือนนี้ (ส.ค.):' : 'This Month (Aug):'}
              </span>
              <span className="font-extrabold">{unitMode === 'cost' ? `฿${thisVal.toLocaleString()}` : `${thisVal} kWh`}</span>
            </div>

            <div className="flex items-center justify-between gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                {lang === 'th' ? 'เดือนก่อน (ก.ค.):' : 'Last Month (Jul):'}
              </span>
              <span className="font-semibold">{unitMode === 'cost' ? `฿${prevVal.toLocaleString()}` : `${prevVal} kWh`}</span>
            </div>

            <div className={`pt-1.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 font-bold ${
              diff <= 0 ? 'text-emerald-500' : 'text-rose-500'
            }`}>
              <span>{lang === 'th' ? 'ผลต่าง (Delta):' : 'Delta:'}</span>
              <span>
                {diff <= 0 ? '-' : '+'}
                {unitMode === 'cost' ? `฿${Math.abs(diff).toLocaleString()}` : `${Math.abs(diff)} kWh`} ({pct}%)
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate totals
  const totalThisCost = enhancedItems.reduce((acc, item) => acc + item.thisMonthCost, 0);
  const totalPrevCost = enhancedItems.reduce((acc, item) => acc + item.prevMonthCost, 0);
  const totalDiffCost = totalThisCost - totalPrevCost;
  const isOverallSavings = totalDiffCost <= 0;

  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 shadow-sm text-slate-900'
    }`}>
      {/* 1. Header & Unit Switches */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[0.68rem] uppercase tracking-wider flex items-center gap-1">
              <Plug className="w-3 h-3" />
              {lang === 'th' ? 'เปรียบเทียบค่าไฟแยกอุปกรณ์' : 'Appliance Price Comparison'}
            </span>
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
              {monthlyData.currentMonth.nameTh} vs {monthlyData.previousMonth.nameTh}
            </span>
          </div>
          <h3 className="text-xl font-black font-display tracking-tight flex items-center gap-2">
            <span>{lang === 'th' ? 'เปรียบเทียบค่าไฟรายเครื่องใช้ไฟฟ้า (แยกรายชิ้น)' : 'Electricity Price by Separate Appliances'}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'th'
              ? 'เปรียบเทียบค่าไฟและหน่วยไฟของเครื่องใช้ไฟฟ้าแต่ละชิ้น ระหว่างเดือนนี้กับเดือนก่อน'
              : 'Direct side-by-side cost and kWh comparison for each individual appliance.'}
          </p>
        </div>

        {/* Controls: Unit Mode & Filter */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-center">
          {/* Unit Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold">
            <button
              onClick={() => setUnitMode('cost')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                unitMode === 'cost'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ฿ THB
            </button>
            <button
              onClick={() => setUnitMode('kwh')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                unitMode === 'kwh'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              kWh
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'th' ? 'ทั้งหมด' : 'All'}
            </button>
            <button
              onClick={() => setFilterMode('savings')}
              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'savings'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'th' ? 'ที่ประหยัดได้' : 'Saved'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Appliance Delta Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200/60'
        }`}>
          <span className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {lang === 'th' ? 'รวมค่าไฟทุกอุปกรณ์ (เดือนนี้)' : 'Total Appliance Cost (This Month)'}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-emerald-500">
              ฿{totalThisCost.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">
            {lang === 'th' ? `แยกเป็น ${enhancedItems.length} อุปกรณ์หลัก` : `${enhancedItems.length} separate devices`}
          </span>
        </div>

        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200/60'
        }`}>
          <span className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {lang === 'th' ? 'รวมค่าไฟทุกอุปกรณ์ (เดือนก่อน)' : 'Total Appliance Cost (Last Month)'}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-slate-700 dark:text-slate-300">
              ฿{totalPrevCost.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">
            {lang === 'th' ? 'ยอดจริงเดือนที่แล้ว' : 'Actual previous month'}
          </span>
        </div>

        <div className={`p-4 rounded-2xl border ${
          isOverallSavings
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : 'bg-rose-500/10 border-rose-500/30'
        }`}>
          <span className={`text-[0.68rem] font-bold uppercase tracking-wider block mb-1 ${
            isOverallSavings ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
          }`}>
            {lang === 'th' ? 'ผลต่างรวม (Total Net Delta)' : 'Net Delta'}
          </span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black font-mono flex items-center gap-1 ${
              isOverallSavings ? 'text-emerald-500' : 'text-rose-500'
            }`}>
              {isOverallSavings ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              {isOverallSavings ? '-' : '+'}฿{Math.abs(totalDiffCost).toLocaleString()}
            </span>
          </div>
          <span className={`text-[10px] font-bold mt-1 block ${
            isOverallSavings ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
          }`}>
            {isOverallSavings
              ? (lang === 'th' ? `ประหยัดลง ${(Math.abs(totalDiffCost) / totalPrevCost * 100).toFixed(1)}% จากการคุมการใช้ไฟ` : `Saved ${(Math.abs(totalDiffCost) / totalPrevCost * 100).toFixed(1)}% overall`)
              : (lang === 'th' ? `เพิ่มขึ้น ${(Math.abs(totalDiffCost) / totalPrevCost * 100).toFixed(1)}%` : `+${(Math.abs(totalDiffCost) / totalPrevCost * 100).toFixed(1)}% higher`)}
          </span>
        </div>
      </div>

      {/* 3. Bar Chart: Separate Appliances Comparison */}
      <div className="h-72 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis
              dataKey="name"
              stroke={isDarkMode ? '#94a3b8' : '#64748b'}
              tick={{ fontSize: 11 }}
              interval={0}
            />
            <YAxis
              stroke={isDarkMode ? '#94a3b8' : '#64748b'}
              unit={unitMode === 'cost' ? '฿' : ''}
              tick={{ fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {value === 'thisMonth'
                    ? (lang === 'th' ? 'สิงหาคม 2026 (เดือนนี้)' : 'August 2026 (This Month)')
                    : (lang === 'th' ? 'กรกฎาคม 2026 (เดือนก่อน)' : 'July 2026 (Last Month)')}
                </span>
              )}
            />
            <Bar
              dataKey="thisMonth"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              name="thisMonth"
            />
            <Bar
              dataKey="prevMonth"
              fill={isDarkMode ? '#475569' : '#cbd5e1'}
              radius={[6, 6, 0, 0]}
              name="prevMonth"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 4. Separate Appliance Detailed Cards List */}
      <div className="space-y-3 mb-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
            {lang === 'th' ? 'แจกแจงค่าไฟแยกรายอุปกรณ์ (Individual Appliance Breakdown)' : 'Individual Appliance Breakdown'}
          </h4>
          <span className="text-[11px] font-mono text-emerald-500 font-bold">
            {displayedItems.length} {lang === 'th' ? 'รายการ' : 'Appliances'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {displayedItems.map((item) => {
            const isSelected = activeApplianceId === item.categoryKey;

            return (
              <div
                key={item.categoryKey}
                onClick={() => setActiveApplianceId(isSelected ? null : item.categoryKey)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-slate-800 border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500'
                      : 'bg-emerald-50/50 border-emerald-400 shadow-md ring-1 ring-emerald-400'
                    : isDarkMode
                      ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/70'
                      : 'bg-slate-50/80 border-slate-200/70 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      isDarkMode ? 'bg-slate-700/70' : 'bg-white shadow-sm'
                    }`}>
                      {getApplianceIcon(item.categoryKey)}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {lang === 'th' ? item.nameTh : item.nameEn}
                      </h5>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.thisMonthKwh} kWh / {lang === 'th' ? 'เดือน' : 'mo'} ({lang === 'th' ? 'เดือนก่อน' : 'prev'}: {item.prevMonthKwh} kWh)
                      </span>
                    </div>
                  </div>

                  {/* Price Delta Pill */}
                  <div className="text-right font-mono shrink-0">
                    <div className={`font-black text-sm ${item.isSaved ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {item.isSaved ? '-' : '+'}฿{Math.abs(item.diffCost).toLocaleString()}
                    </div>
                    <div className={`text-[10px] font-bold ${item.isSaved ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      ({item.diffPct <= 0 ? '' : '+'}{item.diffPct.toFixed(1)}%)
                    </div>
                  </div>
                </div>

                {/* Monthly cost comparison bar within the card */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{lang === 'th' ? 'เดือนนี้:' : 'This:'}</span>
                    <span className="font-bold text-emerald-500">฿{item.thisMonthCost}</span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-600">vs</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{lang === 'th' ? 'เดือนก่อน:' : 'Last:'}</span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">฿{item.prevMonthCost}</span>
                  </div>
                </div>

                {/* Insight reason */}
                <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.isSaved ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span>{lang === 'th' ? item.savingActionTh : item.savingActionEn}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. AI Comparative Diagnosis */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400">
              {lang === 'th' ? 'บทวิเคราะห์อัจฉริยะรายเครื่องใช้ไฟฟ้า:' : 'AI Separate Appliance Analysis:'}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'th' ? (
              <>
                <strong>{monthlyData.topSavingReasonTh}</strong> {monthlyData.recommendationTh}
              </>
            ) : (
              <>
                <strong>{monthlyData.topSavingReasonEn}</strong> {monthlyData.recommendationEn}
              </>
            )}
          </p>
        </div>
      </div>

      {/* 6. Action button: Go to Compare Lab or Add Appliance */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {onNavigatePage && (
            <button
              onClick={() => onNavigatePage('compare')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/10 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-bold transition-all cursor-pointer"
            >
              <span>{lang === 'th' ? '🔬 เปิดห้องลองเปรียบเทียบสเปก (Compare Lab)' : '🔬 Open Compare Lab'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {onOpenAddAppliance && (
          <button
            onClick={onOpenAddAppliance}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? 'เพิ่มเครื่องใช้ไฟฟ้าเพื่อเปรียบเทียบ' : 'Add Appliance'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
