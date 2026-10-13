import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calculator, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sliders, 
  ArrowRight, 
  RotateCcw,
  BarChart2,
  LineChart as LineChartIcon,
  ShieldCheck,
  Zap,
  Calendar,
  Layers
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { 
  buildLinearRegressionForecast, 
  MonthlyForecastSummary 
} from '../../utils/linearRegressionForecasting';

export interface LinearRegressionForecastCardProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  monthlyBudget: number;
  monthlyEstimate: number;
  onNavigateToBudget?: () => void;
  className?: string;
}

export const LinearRegressionForecastCard: React.FC<LinearRegressionForecastCardProps> = ({
  lang,
  isDarkMode,
  monthlyBudget,
  monthlyEstimate,
  onNavigateToBudget,
  className = '',
}) => {
  // Chart Display Mode: Cumulative (Total bill trajectory) vs Daily (Daily cost + trendline)
  const [chartMode, setChartMode] = useState<'cumulative' | 'daily'>('cumulative');
  
  // Interactive Intervention Slider: 0% to -25% savings on future days
  const [interventionPct, setInterventionPct] = useState<number>(0);
  
  // Historical Window selector: 7 days vs 14 days
  const [sampleDays, setSampleDays] = useState<number>(14);

  // Math explanation collapsible
  const [showMathDetails, setShowMathDetails] = useState(false);

  // Calculate Linear Regression Model
  const forecast: MonthlyForecastSummary = useMemo(() => {
    return buildLinearRegressionForecast({
      totalDays: 30,
      monthlyBudget,
      currentDay: sampleDays,
      interventionPct,
      elecRate: 4.7,
    });
  }, [monthlyBudget, sampleDays, interventionPct]);

  const {
    regression,
    currentDay,
    totalDays,
    actualSpentToDate,
    projectedRemainingCost,
    projectedMonthlyTotal,
    baselineNoTrendTotal,
    projectedMonthlyKwh,
    varianceVsBudget,
    budgetStatus,
    trendDirection,
    trendRateTh,
    trendRateEn,
    daysUntilBudgetExceeded,
    chartPoints
  } = forecast;

  const isOverBudget = budgetStatus === 'over';
  const isNearLimit = budgetStatus === 'warning';
  const budgetUtilization = Math.round((projectedMonthlyTotal / monthlyBudget) * 100);

  // Intervention delta comparison
  const defaultNoIntervention = useMemo(() => {
    return buildLinearRegressionForecast({
      totalDays: 30,
      monthlyBudget,
      currentDay: sampleDays,
      interventionPct: 0,
      elecRate: 4.7,
    });
  }, [monthlyBudget, sampleDays]);

  const savedFromIntervention = defaultNoIntervention.projectedMonthlyTotal - projectedMonthlyTotal;

  return (
    <div
      className={`p-5 sm:p-6 rounded-[24px] border transition-all duration-300 relative overflow-hidden ${
        isDarkMode
          ? 'bg-[#0B132B] border-[#1E2E5D]/90 shadow-xl shadow-blue-950/40 text-white'
          : 'bg-white border-slate-200 shadow-lg shadow-blue-900/5 text-slate-900'
      } ${className}`}
    >
      {/* Top Ambient Glow */}
      <div 
        className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity ${
          isDarkMode ? 'bg-[#2563EB]/15' : 'bg-blue-400/10'
        }`} 
      />

      {/* 1. Header with Formula & Model Badges */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-[#1E2E5D]/70">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#2563EB] text-white shadow-sm shadow-blue-600/30">
              <Calculator className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'แบบจำลองถดถอยเชิงเส้น' : 'Linear Regression Model'}</span>
            </span>

            {/* Regression Formula Pill */}
            <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[#38BDF8] border border-blue-500/25">
              {regression.formulaString}
            </span>

            {/* Goodness of Fit R² Badge */}
            <span 
              className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#101B3B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E2E5D]"
              title={lang === 'th' ? 'สัมประสิทธิ์การตัดสินใจ (R²) บ่งชี้ความแม่นยำของการจับคู่แนวโน้ม' : 'Coefficient of determination (R²)'}
            >
              R² = {regression.rSquared.toFixed(2)}
            </span>

            {/* Trend Direction Rate */}
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
              trendDirection === 'increasing'
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                : trendDirection === 'decreasing'
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                  : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
            }`}>
              {trendDirection === 'increasing' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{lang === 'th' ? trendRateTh : trendRateEn}</span>
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold tracking-tight font-display text-slate-900 dark:text-white flex items-center gap-2">
            <span>{lang === 'th' ? 'พยากรณ์ค่าไฟรายเดือนจากแนวโน้มการใช้งาน' : 'Monthly Cost Projection via Usage Trends'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {lang === 'th'
              ? `คำนวณจากพฤติกรรมการใช้ไฟจริง ${currentDay} วันแรก ด้วยสมการเส้นตรง Ordinary Least Squares (OLS)`
              : `Calculated from first ${currentDay} days of usage trends using Ordinary Least Squares (OLS)`}
          </p>
        </div>

        {/* View Controls: Chart Mode (Cumulative / Daily) & Sample Window */}
        <div className="flex items-center gap-1.5 self-start md:self-center shrink-0">
          <div className="p-0.5 rounded-xl bg-slate-100 dark:bg-[#0E1A3D] border border-slate-200 dark:border-[#1E2E5D] flex items-center">
            <button
              onClick={() => setChartMode('cumulative')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                chartMode === 'cumulative'
                  ? 'bg-white dark:bg-[#2563EB] text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'ยอดสะสม' : 'Cumulative'}</span>
            </button>
            <button
              onClick={() => setChartMode('daily')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                chartMode === 'daily'
                  ? 'bg-white dark:bg-[#2563EB] text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'รายวัน + แนวโน้ม' : 'Daily Trend'}</span>
            </button>
          </div>

          <button
            onClick={() => setShowMathDetails(!showMathDetails)}
            className={`p-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              showMathDetails
                ? 'bg-blue-50 text-[#2563EB] dark:bg-blue-500/20 dark:text-[#38BDF8] border-blue-400/40'
                : 'bg-slate-50 dark:bg-[#0E1A3D] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-[#1E2E5D]'
            }`}
            title={lang === 'th' ? 'ดูสูตรและการคำนวณ OLS' : 'View OLS formula breakdown'}
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Primary KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
        {/* KPI 1: Projected Month-End Total */}
        <div className={`p-4 rounded-2xl border transition-all ${
          isOverBudget
            ? 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/30'
            : isNearLimit
              ? 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/30'
              : 'bg-blue-500/5 dark:bg-[#0E1A3D]/70 border-blue-500/30'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'คาดการณ์สิ้นเดือน' : 'Projected Total'}
            </span>
            <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border ${
              isOverBudget
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                : isNearLimit
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
            }`}>
              {budgetUtilization}% {lang === 'th' ? 'ของงบ' : 'of budget'}
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white my-1 tabular-nums">
            ฿{projectedMonthlyTotal.toLocaleString()}
          </div>

          <div className="text-[11px] font-semibold flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              {lang === 'th' ? `งบตั้งไว้ ฿${monthlyBudget.toLocaleString()}` : `Budget ฿${monthlyBudget.toLocaleString()}`}
            </span>
            <span className={`font-mono font-bold ${
              varianceVsBudget > 0 
                ? 'text-rose-600 dark:text-rose-400' 
                : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {varianceVsBudget > 0 ? `+฿${varianceVsBudget.toLocaleString()}` : `-฿${Math.abs(varianceVsBudget).toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* KPI 2: Actual Spent to Date */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1A3D]/70 border border-slate-200 dark:border-[#1E2E5D]/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {lang === 'th' ? `ใช้จริง (${currentDay} วันแรก)` : `Actual (Day 1–${currentDay})`}
            </span>
            <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-[#38BDF8]">
              {Math.round((currentDay / totalDays) * 100)}% {lang === 'th' ? 'รอบบิล' : 'cycle'}
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white my-1 tabular-nums">
            ฿{actualSpentToDate.toLocaleString()}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>{lang === 'th' ? 'เฉลี่ยต่อวัน' : 'Daily average'}</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
              ฿{(actualSpentToDate / currentDay).toFixed(1)}/d
            </span>
          </div>
        </div>

        {/* KPI 3: Projected Remaining */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1A3D]/70 border border-slate-200 dark:border-[#1E2E5D]/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {lang === 'th' ? `ส่วนที่เหลือ (${totalDays - currentDay} วัน)` : `Remaining (${totalDays - currentDay} days)`}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20">
              {lang === 'th' ? 'โมเดล OLS' : 'OLS Linear'}
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-[#2563EB] dark:text-[#38BDF8] my-1 tabular-nums">
            ฿{projectedRemainingCost.toLocaleString()}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>{lang === 'th' ? 'เฉลี่ยช่วงที่เหลือ' : 'Projected rate'}</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
              ฿{(projectedRemainingCost / (totalDays - currentDay)).toFixed(1)}/d
            </span>
          </div>
        </div>

        {/* KPI 4: Drift & Budget Alert */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1A3D]/70 border border-slate-200 dark:border-[#1E2E5D]/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'ความชันแนวโน้ม (Slope m)' : 'Trend Slope (m)'}
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-500">
              Δ {regression.slope.toFixed(2)} ฿/d
            </span>
          </div>

          <div className="my-1">
            {daysUntilBudgetExceeded ? (
              <div className="flex items-center gap-1.5 text-rose-500 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'th' 
                    ? `งบเต็มในวันที่ ${daysUntilBudgetExceeded}` 
                    : `Budget exceeded on Day ${daysUntilBudgetExceeded}`}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'th' ? 'แนวโน้มควบคุมงบได้ครบ 30 วัน' : 'Pace stays within 30-day budget'}
                </span>
              </div>
            )}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">
              {regression.slope > 0 
                ? (lang === 'th' ? 'การใช้ไฟมีอัตราไต่ระดับสูงขึ้นทุกวัน' : 'Daily consumption increases progressively')
                : (lang === 'th' ? 'การใช้ไฟคงที่หรือลดลงเป็นลำดับ' : 'Daily consumption is stable or decreasing')}
            </p>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1 border-t border-slate-200 dark:border-white/5">
            <span>{lang === 'th' ? 'พลังงานคาดการณ์' : 'Energy Projection'}</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
              {projectedMonthlyKwh} kWh
            </span>
          </div>
        </div>
      </div>

      {/* 3. Mathematical Formula & OLS Details Drawer (Collapsible) */}
      <AnimatePresence>
        {showMathDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-[#101B3B] border border-blue-500/30 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-[#2563EB] dark:text-[#38BDF8]">
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  <span>{lang === 'th' ? 'หลักการคำนวณ Simple Linear Regression (Ordinary Least Squares)' : 'How Simple Linear Regression Works'}</span>
                </span>
                <span className="font-mono">y = mx + b</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'th'
                  ? 'ระบบใช้ระเบียบวิธีผลบวกกำลังสองน้อยที่สุด (Least Squares Method) โดยให้ตัวแปรอิสระ x คือลำดับวันที่ในรอบบิล (1 ถึง 14) และ y คือค่าไฟรายวัน (บาท) เพื่อหาค่าความชัน (Slope m) และจุดตัดแกน (Intercept b) ที่มีความคลาดเคลื่อนน้อยที่สุด:'
                  : 'The system uses Ordinary Least Squares (OLS) where x is the billing cycle day (1 to 14) and y is daily electricity cost (THB) to find the slope m and intercept b minimizing residual sum of squares:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#080E24] border border-blue-500/20">
                  <span className="text-slate-400 block text-[10px]">Slope (m)</span>
                  <span className="text-slate-900 dark:text-white font-bold">{regression.slope.toFixed(4)} THB/day</span>
                  <span className="text-[10px] text-slate-500 block">m = [NΣxy - ΣxΣy] / [NΣx² - (Σx)²]</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#080E24] border border-blue-500/20">
                  <span className="text-slate-400 block text-[10px]">Intercept (b)</span>
                  <span className="text-slate-900 dark:text-white font-bold">{regression.intercept.toFixed(2)} THB</span>
                  <span className="text-[10px] text-slate-500 block">b = ȳ - m·x̄</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#080E24] border border-blue-500/20">
                  <span className="text-slate-400 block text-[10px]">R² & Std Error (Se)</span>
                  <span className="text-[#38BDF8] font-bold">R² = {regression.rSquared.toFixed(3)} | Se = ±฿{regression.standardError.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-500 block">Goodness of fit on historical telemetry</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Visual Recharts Composed Chart */}
      <div className="h-64 sm:h-72 w-full my-3">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartPoints} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 
              vertical={false}
            />

            <XAxis 
              dataKey="day" 
              tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }}
              axisLine={{ stroke: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
              tickLine={false}
              tickFormatter={(v) => v % 5 === 0 || v === 1 || v === 14 || v === 30 ? `d${v}` : ''}
            />

            <YAxis 
              tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }}
              axisLine={{ stroke: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
              tickLine={false}
              tickFormatter={(v) => `฿${v}`}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const data = payload[0].payload;
                return (
                  <div className={`p-3 rounded-xl border text-xs shadow-xl backdrop-blur-md ${
                    isDarkMode 
                      ? 'bg-[#080E24]/95 border-[#1E2E5D] text-white' 
                      : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/50'
                  }`}>
                    <div className="flex items-center justify-between gap-3 mb-1.5 pb-1 border-b border-white/10 font-bold">
                      <span>{lang === 'th' ? `วันที่ ${data.day}` : `Day ${data.day}`}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-blue-500/10 text-[#38BDF8]">
                        {data.isHistorical ? (lang === 'th' ? 'ข้อมูลจริง' : 'Actual') : (lang === 'th' ? 'พยากรณ์ OLS' : 'OLS Forecast')}
                      </span>
                    </div>

                    {chartMode === 'cumulative' ? (
                      <div className="space-y-1 font-mono">
                        {data.actualCumulative !== null && (
                          <div className="flex justify-between gap-3">
                            <span className="text-slate-400">{lang === 'th' ? 'ยอดสะสมจริง:' : 'Actual Spent:'}</span>
                            <span className="font-bold text-[#2563EB] dark:text-[#60A5FA]">฿{data.actualCumulative}</span>
                          </div>
                        )}
                        <div className="flex justify-between gap-3">
                          <span className="text-slate-400">{lang === 'th' ? 'พยากรณ์สะสม:' : 'Forecast Total:'}</span>
                          <span className="font-bold text-[#38BDF8]">฿{data.forecastCumulative}</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-slate-400">{lang === 'th' ? 'เป้างบประมาณสะสม:' : 'Target Budget:'}</span>
                          <span className="font-bold text-amber-500">฿{data.budgetBaselineCumulative}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1 font-mono">
                        {data.actualDaily !== null && (
                          <div className="flex justify-between gap-3">
                            <span className="text-slate-400">{lang === 'th' ? 'ค่าไฟจริงวันนี้:' : 'Actual Day:'}</span>
                            <span className="font-bold text-[#2563EB] dark:text-[#60A5FA]">฿{data.actualDaily}</span>
                          </div>
                        )}
                        <div className="flex justify-between gap-3">
                          <span className="text-slate-400">{lang === 'th' ? 'เส้นแนวโน้ม (y=mx+b):' : 'Regression Fitted:'}</span>
                          <span className="font-bold text-[#38BDF8]">฿{data.fittedDaily}</span>
                        </div>
                        {data.forecastDaily !== null && (
                          <div className="flex justify-between gap-3">
                            <span className="text-slate-400">{lang === 'th' ? 'พยากรณ์รายวัน:' : 'Projected Day:'}</span>
                            <span className="font-bold text-emerald-400">฿{data.forecastDaily}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }}
            />

            {/* Reference Line: "Today" separator at Day 14 */}
            <ReferenceLine 
              x={currentDay} 
              stroke="#38BDF8" 
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: lang === 'th' ? 'วันนี้ (Day 14)' : 'Today (Day 14)',
                position: 'top',
                fill: '#38BDF8',
                fontSize: 10,
                fontWeight: 'bold',
              }}
            />

            {chartMode === 'cumulative' ? (
              <>
                {/* Target Budget Line */}
                <Line
                  type="monotone"
                  dataKey="budgetBaselineCumulative"
                  stroke="#F59E0B"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                  name="Budget Baseline"
                />

                {/* Actual Recorded Cumulative */}
                <Area
                  type="monotone"
                  dataKey="actualCumulative"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fill="url(#actualGradient)"
                  dot={{ r: 2.5, fill: '#2563EB' }}
                  name="Actual Spent"
                />

                {/* Projected Forecast Line */}
                <Line
                  type="monotone"
                  dataKey="forecastCumulative"
                  stroke="#38BDF8"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Projected Forecast"
                />
              </>
            ) : (
              <>
                {/* Actual Daily Bars */}
                <Bar
                  dataKey="actualDaily"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                  name="Actual Daily"
                />

                {/* Linear Regression Trendline (y = mx + b) */}
                <Line
                  type="monotone"
                  dataKey="fittedDaily"
                  stroke="#38BDF8"
                  strokeWidth={2.5}
                  dot={false}
                  name="Trendline y=mx+b"
                />

                {/* Forecasted Daily with intervention if active */}
                {interventionPct !== 0 && (
                  <Line
                    type="monotone"
                    dataKey="forecastDaily"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Adjusted Forecast"
                  />
                )}
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-white/5">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
            <span>{lang === 'th' ? `ข้อมูลจริง (${currentDay} วันแรก)` : `Actual (Days 1–${currentDay})`}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-[#38BDF8]"></span>
            <span>{lang === 'th' ? 'เส้นถดถอยพยากรณ์ OLS (วัน 15–30)' : 'OLS Trendline (Days 15–30)'}</span>
          </span>
          {chartMode === 'cumulative' && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500"></span>
              <span>{lang === 'th' ? 'เพดานงบประมาณ' : 'Budget Target'}</span>
            </span>
          )}
        </div>

        <span className="font-mono text-[10px] text-slate-400">
          OLS Formula: {regression.formulaString}
        </span>
      </div>

      {/* 5. Interactive "What-If" Eco Intervention Simulation Slider */}
      <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1A3D]/80 border border-slate-200 dark:border-[#1E2E5D]/70 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{lang === 'th' ? 'จำลองผลลัพธ์ปรับพฤติกรรม (Intervention Simulation)' : 'Simulate Habit Adjustment Impact'}</span>
                {interventionPct !== 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/25">
                    {interventionPct}%
                  </span>
                )}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {lang === 'th'
                  ? 'ทดสอบว่าหากลดการใช้ไฟรายวันลงนับจากพรุ่งนี้ จะเปลี่ยนความชันและยอดสิ้นเดือนเท่าไหร่'
                  : 'Adjust future daily usage to see how the regression slope and month-end projection change'}
              </p>
            </div>
          </div>

          {interventionPct !== 0 && (
            <button
              onClick={() => setInterventionPct(0)}
              className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{lang === 'th' ? 'คืนค่าปกติ' : 'Reset'}</span>
            </button>
          )}
        </div>

        {/* Slider Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400 shrink-0">0%</span>
          <input
            type="range"
            min="-30"
            max="0"
            step="5"
            value={interventionPct}
            onChange={(e) => setInterventionPct(Number(e.target.value))}
            className="w-full accent-[#2563EB] h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] font-mono text-emerald-500 font-bold shrink-0">-30%</span>
        </div>

        {/* Dynamic Result Notice */}
        {interventionPct !== 0 && (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400">
            <span className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>
                {lang === 'th'
                  ? `ประหยัดค่าไฟเพิ่มได้ ~฿${savedFromIntervention.toLocaleString()} สิ้นเดือนนี้!`
                  : `Saves additional ~฿${savedFromIntervention.toLocaleString()} by month-end!`}
              </span>
            </span>
            <span className="font-mono font-bold text-xs">
              ฿{projectedMonthlyTotal.toLocaleString()} {lang === 'th' ? '(ยอดใหม่)' : '(New)'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
