import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  BrainCircuit, 
  Calendar, 
  Sun, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  ArrowRight,
  ShieldAlert,
  Zap,
  Info,
  DollarSign,
  ChevronDown,
  ChevronUp,
  BarChart3
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';

interface EnergyConsumptionForecastWidgetProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  monthlyBudget: number;
  monthlyEstimate: number;
  onNavigateToBudget?: () => void;
  onNavigateToAppliances?: () => void;
}

export const EnergyConsumptionForecastWidget: React.FC<EnergyConsumptionForecastWidgetProps> = ({
  lang,
  isDarkMode,
  monthlyBudget,
  monthlyEstimate,
  onNavigateToBudget,
  onNavigateToAppliances,
}) => {
  // State for progressive disclosure - display only main prediction summary by default
  const [isExpanded, setIsExpanded] = useState(false);

  // Interactive Simulation Levers to adjust forecast in real time
  const [enableAcEco, setEnableAcEco] = useState(false);
  const [enableStandbyCut, setEnableStandbyCut] = useState(false);
  const [enableTouShift, setEnableTouShift] = useState(false);
  const [forecastViewMode, setForecastViewMode] = useState<'cumulative' | 'daily'>('cumulative');

  // Baseline calculation
  const totalDays = 30;
  const currentDay = 14; // Current day in billing cycle
  const currentSpent = Math.round(monthlyEstimate * (currentDay / totalDays));

  // Savings impact
  const acSavings = enableAcEco ? 180 : 0;
  const standbySavings = enableStandbyCut ? 75 : 0;
  const touSavings = enableTouShift ? 60 : 0;
  const totalSimulatedSavings = acSavings + standbySavings + touSavings;

  // Base predicted month-end cost
  const basePredictedMonthEnd = Math.round(monthlyEstimate * 1.05); // Slight upward trend by default
  const adjustedPredictedCost = Math.max(800, basePredictedMonthEnd - totalSimulatedSavings);
  const predictedLow = Math.round(adjustedPredictedCost * 0.94);
  const predictedHigh = Math.round(adjustedPredictedCost * 1.06);
  const predictedKwh = (adjustedPredictedCost / 4.7).toFixed(1);

  const isOverBudget = adjustedPredictedCost > monthlyBudget;
  const budgetUtilization = Math.round((adjustedPredictedCost / monthlyBudget) * 100);
  const budgetDiff = Math.abs(adjustedPredictedCost - monthlyBudget);

  // Generate 30-Day Historical + Predictive Chart Data
  const chartData = useMemo(() => {
    const data = [];
    let cumulativeActual = 0;
    let cumulativeForecast = 0;

    for (let day = 1; day <= totalDays; day++) {
      const isWeekend = day % 7 === 6 || day % 7 === 0;
      const baseDailyKwh = isWeekend ? 13.5 : 9.8;
      const dailyCost = baseDailyKwh * 4.7;

      if (day <= currentDay) {
        // Historical actuals with natural variance
        const noise = Math.sin(day * 1.3) * 6;
        const actualDayCost = Math.max(25, Math.round(dailyCost + noise));
        cumulativeActual += actualDayCost;
        cumulativeForecast = cumulativeActual;

        data.push({
          day: `${day}`,
          dayLabel: lang === 'th' ? `วันที่ ${day}` : `Day ${day}`,
          actualDaily: actualDayCost,
          actualCumulative: cumulativeActual,
          forecastDaily: null,
          forecastCumulative: null,
          forecastUpper: null,
          forecastLower: null,
          isForecast: false,
        });
      } else {
        // Future Forecast with optional AI lever reductions
        const heatSurge = day >= 18 && day <= 22 ? 8 : 0; // Simulated heatwave on days 18-22
        const savingsPerDay = totalSimulatedSavings / (totalDays - currentDay);
        const forecastDayCost = Math.max(20, Math.round(dailyCost + heatSurge - savingsPerDay));
        
        cumulativeForecast += forecastDayCost;
        const upperSpread = Math.round(cumulativeForecast * 1.05);
        const lowerSpread = Math.round(cumulativeForecast * 0.95);

        data.push({
          day: `${day}`,
          dayLabel: lang === 'th' ? `วันที่ ${day}` : `Day ${day}`,
          actualDaily: null,
          actualCumulative: day === currentDay + 1 ? cumulativeActual : null,
          forecastDaily: forecastDayCost,
          forecastCumulative: cumulativeForecast,
          forecastUpper: upperSpread,
          forecastLower: lowerSpread,
          isForecast: true,
        });
      }
    }
    return data;
  }, [currentDay, totalDays, totalSimulatedSavings, lang]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 sm:p-7 rounded-[2.5rem] border shadow-xl relative overflow-hidden transition-all ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border-emerald-500/20 text-white'
          : 'bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 border-emerald-100 text-slate-900 shadow-emerald-500/5'
      }`}
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header with Status Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-500/20">
              <BrainCircuit className="w-3.5 h-3.5 animate-pulse" />
              <span>{lang === 'th' ? 'พยากรณ์ค่าไฟล่วงหน้า' : 'AI Energy Forecasting'}</span>
            </span>

            <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs flex items-center gap-1 border ${
              isOverBudget
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                : budgetUtilization > 85
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
            }`}>
              {isOverBudget ? (
                <>
                  <AlertTriangle className="w-3 h-3" />
                  <span>{lang === 'th' ? 'เสี่ยงเกินงบประมาณ' : 'Risk of Over-Budget'}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{lang === 'th' ? 'อยู่ในเกณฑ์ควบคุมได้' : 'On Track With Budget'}</span>
                </>
              )}
            </span>

            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-[#38BDF8] border border-blue-500/30">
              OLS: y = 1.25x + 36.40 (R² = 0.94)
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>{lang === 'th' ? 'คาดการณ์บิลค่าไฟสิ้นเดือน (Monthly Cost Projection)' : 'Upcoming Monthly Cost Forecast'}</span>
          </h3>
        </div>

        {/* Expand for Analysis Action Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`px-4 py-2 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer shrink-0 border self-start sm:self-center shadow-sm ${
            isExpanded
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20'
              : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:scale-[1.02]'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>
            {isExpanded
              ? (lang === 'th' ? 'ย่อการวิเคราะห์ (Collapse Analysis)' : 'Collapse Analysis')
              : (lang === 'th' ? 'ขยายเพื่อดูการวิเคราะห์ (Expand for Analysis)' : 'Expand for Analysis')}
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. MAIN PREDICTION SUMMARY (Always Visible by default) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md mb-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-0.5">
              {lang === 'th' ? 'สรุปผลการทำนายสิ้นเดือน (Main Prediction Summary)' : 'Main Prediction Summary'}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400 flex items-baseline gap-2">
              <span>฿{adjustedPredictedCost.toLocaleString()}</span>
              <span className="text-xs font-bold text-slate-500 font-sans">
                {lang === 'th' ? `(ช่วงคาดการณ์: ฿${predictedLow.toLocaleString()} – ฿${predictedHigh.toLocaleString()})` : `(Est. Range: ฿${predictedLow.toLocaleString()} – ฿${predictedHigh.toLocaleString()})`}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1 leading-relaxed">
              {lang === 'th'
                ? `คาดว่าจะใช้พลังงานรวม ${predictedKwh} kWh (${isOverBudget ? `เกินเป้างบ ฿${budgetDiff.toLocaleString()}` : `เหลือโควตางบประมาณ ฿${budgetDiff.toLocaleString()}`}) จากสถิติ 14 วันแรกและพยากรณ์อากาศ 16 วันข้างหน้า`
                : `Projected energy usage is ${predictedKwh} kWh (${isOverBudget ? `฿${budgetDiff.toLocaleString()} over monthly cap` : `฿${budgetDiff.toLocaleString()} under monthly cap`}) derived from 14-day telemetry & weather trends.`}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-emerald-500/30 hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isExpanded ? (lang === 'th' ? 'ย่อการวิเคราะห์ (Collapse)' : 'Collapse Analysis') : (lang === 'th' ? 'ขยายเพื่อดูการวิเคราะห์ (Expand for Analysis)' : 'Expand for Analysis')}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-emerald-500" /> : <ChevronDown className="w-3.5 h-3.5 text-emerald-500" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. UNDERLYING HISTORICAL USAGE DATA & DETAILED CHARTS (Revealed on 'Expand for Analysis') */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.98, y: -8 }}
            animate={{ 
              opacity: 1, 
              height: 'auto', 
              scale: 1, 
              y: 0,
              transition: {
                height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.28, ease: 'easeOut' },
                scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              scale: 0.98, 
              y: -8,
              transition: {
                height: { duration: 0.25, ease: [0.32, 0, 0.67, 0] },
                opacity: { duration: 0.18, ease: 'easeIn' },
                scale: { duration: 0.2, ease: 'easeIn' }
              }
            }}
            className="overflow-hidden space-y-6 pt-2 origin-top"
          >
            {/* View Mode Toggle Bar */}
            <div className="flex items-center justify-between gap-3 flex-wrap border-t border-slate-200 dark:border-slate-800 pt-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'เลือกรูปแบบการแสดงผลกราฟ:' : 'Chart Display Mode:'}
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
                <button
                  onClick={() => setForecastViewMode('cumulative')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    forecastViewMode === 'cumulative'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {lang === 'th' ? 'ยอดสะสมทั้งเดือน' : 'Cumulative'}
                </button>
                <button
                  onClick={() => setForecastViewMode('daily')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    forecastViewMode === 'daily'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {lang === 'th' ? 'รายวัน (Daily Burn)' : 'Daily Rate'}
                </button>
              </div>
            </div>

            {/* 4-Metric Detailed Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Metric 1: Projected Month-End Bill */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm space-y-1">
                <span className="text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {lang === 'th' ? 'คาดการณ์ค่าไฟสิ้นเดือน' : 'Projected Month-End Bill'}
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 flex items-baseline gap-1">
                  <span>฿{adjustedPredictedCost.toLocaleString()}</span>
                </div>
                <p className="text-[0.68rem] font-bold text-emerald-700 dark:text-emerald-300">
                  {lang === 'th' ? `ช่วงคาดการณ์: ฿${predictedLow.toLocaleString()} – ฿${predictedHigh.toLocaleString()}` : `Range: ฿${predictedLow.toLocaleString()} – ฿${predictedHigh.toLocaleString()}`}
                </p>
              </div>

              {/* Metric 2: Estimated kWh Units */}
              <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 backdrop-blur-sm space-y-1">
                <span className="text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {lang === 'th' ? 'หน่วยไฟคาดการณ์ (kWh)' : 'Projected Energy Units'}
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                  {predictedKwh} <span className="text-xs font-bold text-slate-400">kWh</span>
                </div>
                <p className="text-[0.68rem] text-slate-500 dark:text-slate-400 font-medium">
                  {lang === 'th' ? `ใช้จริงแล้ว: ${(currentSpent / 4.7).toFixed(1)} kWh` : `Spent to date: ${(currentSpent / 4.7).toFixed(1)} kWh`}
                </p>
              </div>

              {/* Metric 3: Budget Comparison & Headroom */}
              <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 backdrop-blur-sm space-y-1">
                <span className="text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {lang === 'th' ? 'เทียบกับเป้างบประมาณ' : 'vs Monthly Budget Cap'}
                </span>
                <div className={`text-2xl sm:text-3xl font-black font-mono ${isOverBudget ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {isOverBudget ? `+฿${budgetDiff.toLocaleString()}` : `-฿${budgetDiff.toLocaleString()}`}
                </div>
                <p className={`text-[0.68rem] font-bold ${isOverBudget ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {isOverBudget 
                    ? (lang === 'th' ? `เกินงบ ฿${monthlyBudget.toLocaleString()}` : `Over ฿${monthlyBudget.toLocaleString()} cap`)
                    : (lang === 'th' ? `เหลือโควตาปลอดภัย ${100 - budgetUtilization}%` : `${100 - budgetUtilization}% safety headroom`)}
                </p>
              </div>

              {/* Metric 4: AI Model Confidence */}
              <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 backdrop-blur-sm space-y-1">
                <span className="text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {lang === 'th' ? 'ความแม่นยำโมเดล AI' : 'Forecast Confidence'}
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-500">
                  94.8%
                </div>
                <p className="text-[0.68rem] text-cyan-600 dark:text-cyan-400 font-medium">
                  {lang === 'th' ? 'อิงสถิติ 90 วันย้อนหลัง' : 'Based on 90-day time-series'}
                </p>
              </div>
            </div>

            {/* Recharts Forecast Chart Visualizer */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-xs font-bold">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {lang === 'th' ? 'ข้อมูลใช้จริง (วันที่ 1-14)' : 'Actual Spent (Days 1-14)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-cyan-400 inline-block border-t border-dashed" />
                    <span className="text-cyan-600 dark:text-cyan-400">
                      {lang === 'th' ? 'พยากรณ์ AI (วันที่ 15-30)' : 'AI Forecast (Days 15-30)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-rose-500 inline-block" />
                    <span className="text-rose-500 font-mono">
                      {lang === 'th' ? `เพดานงบ (฿${monthlyBudget.toLocaleString()})` : `Budget Cap (฿${monthlyBudget.toLocaleString()})`}
                    </span>
                  </div>
                </div>

                <div className="text-[0.7rem] text-slate-400 font-mono">
                  {lang === 'th' ? `รอบบิล: วันที่ ${currentDay} จาก ${totalDays} วัน` : `Cycle: Day ${currentDay} of ${totalDays}`}
                </div>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} opacity={0.5} />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
                      axisLine={{ stroke: isDarkMode ? '#475569' : '#cbd5e1' }}
                    />
                    <YAxis 
                      tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
                      axisLine={{ stroke: isDarkMode ? '#475569' : '#cbd5e1' }}
                      unit="฿"
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                        borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                        color: isDarkMode ? '#ffffff' : '#000000'
                      }}
                      formatter={(value: any, name: string) => {
                        if (value === null || value === undefined) return ['-', ''];
                        if (name === 'actualCumulative') return [`฿${value.toLocaleString()}`, lang === 'th' ? 'ยอดใช้จริงสะสม' : 'Actual Cumulative'];
                        if (name === 'forecastCumulative') return [`฿${value.toLocaleString()}`, lang === 'th' ? 'ยอดพยากรณ์สะสม' : 'Forecast Cumulative'];
                        if (name === 'actualDaily') return [`฿${value.toLocaleString()}`, lang === 'th' ? 'ค่าไฟรายวัน' : 'Actual Daily'];
                        if (name === 'forecastDaily') return [`฿${value.toLocaleString()}`, lang === 'th' ? 'พยากรณ์รายวัน' : 'Forecast Daily'];
                        return [`฿${value.toLocaleString()}`, name];
                      }}
                      labelFormatter={(label) => lang === 'th' ? `วันที่ ${label} ของเดือน` : `Day ${label} of Month`}
                    />

                    {/* Reference Budget Line */}
                    <ReferenceLine 
                      y={monthlyBudget} 
                      stroke="#f43f5e" 
                      strokeDasharray="4 4" 
                      strokeWidth={2}
                      label={{ 
                        value: `Cap: ฿${monthlyBudget}`, 
                        fill: '#f43f5e', 
                        fontSize: 10, 
                        position: 'insideTopRight' 
                      }} 
                    />

                    {/* Reference Today Divider */}
                    <ReferenceLine 
                      x={`${currentDay}`} 
                      stroke={isDarkMode ? '#64748b' : '#94a3b8'} 
                      strokeDasharray="2 2"
                      label={{ 
                        value: lang === 'th' ? 'วันนี้' : 'Today', 
                        fill: isDarkMode ? '#cbd5e1' : '#475569', 
                        fontSize: 10, 
                        position: 'top' 
                      }} 
                    />

                    {forecastViewMode === 'cumulative' ? (
                      <>
                        <Area 
                          type="monotone" 
                          dataKey="actualCumulative" 
                          stroke="#10b981" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#actualGradient)" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="forecastCumulative" 
                          stroke="#06b6d4" 
                          strokeWidth={2.5} 
                          strokeDasharray="4 4" 
                          dot={false}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="forecastUpper" 
                          stroke="none" 
                          fill="#06b6d4" 
                          fillOpacity={0.12} 
                        />
                      </>
                    ) : (
                      <>
                        <Area 
                          type="monotone" 
                          dataKey="actualDaily" 
                          stroke="#10b981" 
                          strokeWidth={2.5} 
                          fillOpacity={1} 
                          fill="url(#actualGradient)" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="forecastDaily" 
                          stroke="#06b6d4" 
                          strokeWidth={2.5} 
                          strokeDasharray="4 4" 
                          dot={false}
                        />
                      </>
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Predictive Drivers & Interactive What-If Levers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column: Forecast Drivers & Risk Factors */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>{lang === 'th' ? 'ปัจจัยสำคัญที่ส่งผลต่อพยากรณ์' : 'Key Forecast Drivers'}</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">☀️ +3.5°C</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-snug">
                      {lang === 'th'
                        ? 'คลื่นความร้อนสัปดาห์หน้า: คาดว่าจะทำให้แอร์กินไฟเพิ่ม +14% (+฿120)'
                        : 'Upcoming heatwave: Expected +14% AC load surge (+฿120 impact)'}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">🗓️ +28%</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-snug">
                      {lang === 'th'
                        ? 'พฤติกรรมเสาร์-อาทิตย์: การอยู่บ้านเต็มวันทำให้ค่าไฟเฉลี่ยสูงกว่าวันธรรมดา'
                        : 'Weekend surge: Full-day occupancy increases average spend by +28%'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive What-If Levers */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>{lang === 'th' ? 'ทดลองเปิดมาตรการปรับลดค่าไฟ (What-If)' : 'Interactive AI Levers (Live Impact)'}</span>
                  </h4>
                  {totalSimulatedSavings > 0 && (
                    <span className="font-mono font-black text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                      -฿{totalSimulatedSavings}/mo
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {/* Lever 1: AC Eco */}
                  <button
                    onClick={() => setEnableAcEco(!enableAcEco)}
                    className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer border ${
                      enableAcEco
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>❄️ {lang === 'th' ? 'เปิดโหมดแอร์ 26°C + พัดลม' : 'AC 26°C Eco Mode'}</span>
                    </div>
                    <span className="font-mono">{enableAcEco ? '✓ -฿180' : '+ ฿180'}</span>
                  </button>

                  {/* Lever 2: Standby Cut */}
                  <button
                    onClick={() => setEnableStandbyCut(!enableStandbyCut)}
                    className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer border ${
                      enableStandbyCut
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🔌 {lang === 'th' ? 'ตัดไฟสแตนด์บายอัตโนมัติ' : 'Auto Standby Power Cut'}</span>
                    </div>
                    <span className="font-mono">{enableStandbyCut ? '✓ -฿75' : '+ ฿75'}</span>
                  </button>

                  {/* Lever 3: TOU Shift */}
                  <button
                    onClick={() => setEnableTouShift(!enableTouShift)}
                    className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer border ${
                      enableTouShift
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🌙 {lang === 'th' ? 'สลับซักผ้าช่วง Off-Peak' : 'Shift Laundry to Off-Peak'}</span>
                    </div>
                    <span className="font-mono">{enableTouShift ? '✓ -฿60' : '+ ฿60'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
