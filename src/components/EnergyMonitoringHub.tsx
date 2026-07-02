import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Line,
  ComposedChart,
} from "recharts";
import {
  Activity,
  Sparkles,
  TrendingDown,
  Layers,
  Zap,
  Check,
  RefreshCw,
  Calculator,
  Flame,
  Shield,
  Coins,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { ProjectedSavingsCard } from "./ProjectedSavingsCard";
import { SmartSavingsCalculator } from "./SmartSavingsCalculator";

const AnimatedCounter = ({
  value,
  duration = 1.5,
  fractionDigits = 2,
}: {
  value: number;
  duration?: number;
  fractionDigits?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const endValue = value;
    let animationFrame: number;

    if (startValue === endValue) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startValue + (endValue - startValue) * easeProgress);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <>{displayValue.toFixed(fractionDigits)}</>;
};

interface EnergyMonitoringHubProps {
  lang: "th" | "en";
  isDarkMode: boolean;
  devices: any[];
  analytics: {
    totalUnits: number;
    totalCost: number;
    burnRate: number;
    budgetRemaining: number;
    touCost: number;
    onPeakUnits: number;
    offPeakUnits: number;
    onPeakCost: number;
    offPeakCost: number;
    touSavings: number;
  };
  dailySavingsData: {
    current: number;
    baseline: number;
    saved: number;
    progress: number;
  };
  performanceChartData: any[];
  aiOptimizationMetrics: {
    efficiencyIndex: number;
    confidenceLevel: number;
    confidenceLevelLabel: string;
    confidenceLevelColor: string;
    confidenceColorText: string;
    activeCount: number;
    statusTag: string;
  };
  aiSmartAc: boolean;
  setAiSmartAc: (v: boolean) => void;
  aiEcoStandby: boolean;
  setAiEcoStandby: (v: boolean) => void;
  aiPfTuning: boolean;
  setAiPfTuning: (v: boolean) => void;
  aiLoadShift: boolean;
  setAiLoadShift: (v: boolean) => void;
  perfRange: "daily" | "weekly" | "monthly";
  setPerfRange: (v: "daily" | "weekly" | "monthly") => void;
  globalBudget: number;
  unitRate: number;
}

export const EnergyMonitoringHub: React.FC<EnergyMonitoringHubProps> = ({
  lang,
  isDarkMode,
  devices,
  analytics,
  dailySavingsData,
  performanceChartData,
  aiOptimizationMetrics,
  aiSmartAc,
  setAiSmartAc,
  aiEcoStandby,
  setAiEcoStandby,
  aiPfTuning,
  setAiPfTuning,
  aiLoadShift,
  setAiLoadShift,
  perfRange,
  setPerfRange,
  globalBudget,
  unitRate,
}) => {
  const [activeTab, setActiveTab] = useState<"live" | "projected" | "telemetry" | "calc">("live");

  const t = (en: string, th: string) => (lang === "th" ? th : en);

  const statsList = useMemo(() => {
    return [
      {
        label: t("Est. Monthly Cost", "ประเมินค่าไฟเดือนนี้"),
        val: `฿${Math.round(analytics.totalCost).toLocaleString()}`,
        icon: Coins,
        color: "text-primary dark:text-emerald-400",
        bg: "bg-primary/5 dark:bg-emerald-500/5",
        desc: t("Based on active appliances", "คำนวณจากอุปกรณ์ทั้งหมด"),
      },
      {
        label: t("Daily Burn Rate", "อัตราสิ้นเปลืองรายวัน"),
        val: `฿${analytics.burnRate.toFixed(1)}`,
        icon: Flame,
        color: "text-amber-500",
        bg: "bg-amber-500/5",
        desc: t("Estimated 24-hour cost", "ค่าใช้จ่ายเฉลี่ยใน 24 ชม."),
      },
      {
        label: t("Total Current Load", "ภาระการโหลดปัจจุบัน"),
        val: `${analytics.totalUnits.toFixed(1)} kWh`,
        icon: Zap,
        color: "text-emerald-500",
        bg: "bg-emerald-500/5",
        desc: t("Accumulated energy load", "พลังงานไฟฟ้ารวมที่ใช้"),
      },
      {
        label: t("Budget & Grid Health", "สถานะงบประมาณ"),
        val: analytics.budgetRemaining > 0 ? t("Optimal Status", "งบประมาณเพียงพอ") : t("Budget Deficit", "เกินงบประมาณที่ตั้ง"),
        icon: Shield,
        color: analytics.budgetRemaining > 0 ? "text-emerald-500" : "text-rose-500",
        bg: analytics.budgetRemaining > 0 ? "bg-emerald-500/5" : "bg-rose-500/5",
        desc: t("Relative to global threshold", "เปรียบเทียบกับเพดานงบประมาณ"),
      },
    ];
  }, [analytics, lang]);

  return (
    <div
      id="energy-monitoring-hub"
      className="w-full bg-white dark:bg-[#111c44]/80 border border-slate-200 dark:border-slate-700/50 shadow-md rounded-[2.5rem] overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 relative group"
    >
      {/* Visual Accent top border */}
      <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent group-hover:via-emerald-500/60 transition-all duration-750" />

      {/* Main Title Section with Tabs */}
      <div className="bg-slate-50/50 dark:bg-slate-800/30 px-6 py-5 border-b border-slate-200 dark:border-slate-700/50 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h4 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            {t("Energy Intelligence & Control Center", "ศูนย์ควบคุมและวิเคราะห์พลังงานอัจฉริยะ")}
          </h4>
          <p className="text-[0.72rem] text-slate-500 dark:text-slate-400">
            {t(
              "Cohesive tracking, AI microgrid tuning, predictive savings, and live metrics",
              "ระบบบูรณาการรวบรวมทั้งสถิติ คอนโทรลเลอร์ AI สัญญาณโทรมาตร และเครื่องคำนวณ"
            )}
          </p>
        </div>

        {/* Cohesive Navigation Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-x-auto scrollbar-hide shrink-0">
          {[
            { id: "live", label: t("Live Status & AI", "สถานะสด & AI"), icon: "fa-dashboard" },
            { id: "projected", label: t("Projected AI Savings", "ยอดประหยัดสะสม"), icon: "fa-line-chart" },
            { id: "telemetry", label: t("Grid Telemetry", "สัญญาณระบบไฟ"), icon: "fa-bolt" },
            { id: "calc", label: t("Savings Calculator", "คำนวณเซฟบิล"), icon: "fa-calculator" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <i className={`fas ${tab.icon} text-[0.75rem]`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Quick-Banner (Visible on all tabs for immediate health monitoring) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-6 border-b border-dashed border-slate-200 dark:border-slate-700/50 bg-slate-50/20 dark:bg-slate-950/5">
        {statsList.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/30 shadow-xs hover:border-emerald-500/20 transition-all duration-300"
          >
            <div className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="block text-base font-black font-mono tracking-tight text-slate-800 dark:text-white">
                {stat.val}
              </span>
              <span className="block text-[0.6rem] text-slate-500 dark:text-slate-400">
                {stat.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Tab Panel Display */}
      <div className="p-6 flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "live" && (
            <motion.div
              key="live-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Daily Savings progress & Circle Gauge info */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-5.5 rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-[#111c44]/60 shadow-sm space-y-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-1">
                        {t("Daily Energy Savings Goal", "เป้าหมายการประหยัดรายวัน")}
                      </h5>
                      <p className="text-[0.68rem] text-slate-500">
                        {t("Live grid reduction progress relative to your predicted baseline", "สัดส่วนพลังงานที่ลดได้เทียบกับฐานพยากรณ์")}
                      </p>
                    </div>
                    <span className="text-[0.6rem] uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-extrabold tracking-wider">
                      Grid Limit
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/20 p-5 rounded-2xl border border-slate-100 dark:border-transparent">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <div className="text-[0.68rem] font-bold text-slate-500 uppercase tracking-widest mb-1">
                          {t("Energy Saved Today", "พลังงานที่เซฟได้วันนี้")}
                        </div>
                        <div className="text-2xl font-display font-light text-emerald-600 dark:text-emerald-400">
                          <AnimatedCounter value={dailySavingsData.saved} fractionDigits={2} />{" "}
                          <span className="text-xs text-slate-500">kWh</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest mb-1">
                          {t("Projected Baseline", "ฐานการกินไฟมาตรฐาน")}
                        </div>
                        <div className="text-base font-mono font-bold text-slate-700 dark:text-slate-300">
                          <AnimatedCounter value={dailySavingsData.baseline} fractionDigits={2} />{" "}
                          <span className="text-[10px] opacity-70">kWh</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-[0.68rem] font-bold text-slate-500 mb-1">
                        <span>0%</span>
                        <span className="text-emerald-500">
                          {t("Goal: 25% Reduction", "เป้าหมาย: ลดการใช้ไฟ 25%")}
                        </span>
                      </div>
                      <div className="h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner flex relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${dailySavingsData.progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-15"></div>
                        </motion.div>
                      </div>
                      <div className="text-center text-[0.68rem] text-slate-500 dark:text-slate-400 font-medium pt-1">
                        {lang === "th" ? (
                          <span>
                            ประหยัดไฟแล้ว{" "}
                            <span className="font-bold text-emerald-500">
                              <AnimatedCounter value={dailySavingsData.progress} fractionDigits={1} />%
                            </span>{" "}
                            ของเป้าหมายความจุสูงสุดวันนี้!
                          </span>
                        ) : (
                          <span>
                            You have achieved{" "}
                            <span className="font-bold text-emerald-500">
                              <AnimatedCounter value={dailySavingsData.progress} fractionDigits={1} />%
                            </span>{" "}
                            of your daily savings reduction target!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overall AI Efficiency Metrics summary */}
                <div className="p-5.5 rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-[#111c44]/60 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                  {/* Circle gauge progress */}
                  <div className="relative w-[130px] h-[130px] flex-shrink-0 flex items-center justify-center">
                    <ResponsiveContainer width={130} height={130}>
                      <PieChart width={130} height={130}>
                        <defs>
                          <linearGradient id="aiGaugeGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={aiOptimizationMetrics.activeCount === 4 ? "#10b981" : aiOptimizationMetrics.activeCount >= 2 ? "#3b82f6" : "#f59e0b"} stopOpacity={1} />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
                          </linearGradient>
                        </defs>
                        <Pie
                          data={[
                            { name: "Optimized", value: aiOptimizationMetrics.efficiencyIndex },
                            { name: "Remaining", value: 100 - aiOptimizationMetrics.efficiencyIndex },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={44}
                          outerRadius={58}
                          startAngle={90}
                          endAngle={-270}
                          paddingAngle={0}
                          dataKey="value"
                        >
                          <Cell fill="url(#aiGaugeGrad)" />
                          <Cell fill={isDarkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(15, 23, 42, 0.08)"} />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Center overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-base font-black font-mono text-slate-800 dark:text-white tracking-tighter">
                        {aiOptimizationMetrics.efficiencyIndex.toFixed(1)}%
                      </span>
                      <span className="text-[0.58rem] font-bold text-slate-500 tracking-wider uppercase">
                        {t("Efficiency", "ประสิทธิภาพ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow space-y-3 text-center sm:text-left w-full">
                    <div>
                      <span className="text-[0.58rem] text-indigo-400 font-extrabold block uppercase tracking-wider mb-0.5">
                        {t("AI CONFIDENCE LEVEL", "ดัชนีวิเคราะห์ความมั่นใจ")}
                      </span>
                      <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                        <span className="text-xl font-black text-slate-800 dark:text-white font-mono tracking-tight">
                          {aiOptimizationMetrics.confidenceLevel.toFixed(1)}%
                        </span>
                        <span className="text-[0.62rem] font-bold text-emerald-400 animate-pulse font-mono flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-ping" />
                          LIVE
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 sm:items-start items-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[0.62rem] font-black rounded-full uppercase tracking-wider w-fit ${aiOptimizationMetrics.confidenceLevelColor}`}>
                        {aiOptimizationMetrics.confidenceLevelLabel}
                      </span>
                      <div className="text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 pt-0.5">
                        {t("Operation Status: ", "โหมดควบคุมกริดปัจจุบัน: ")}
                        <span className={`font-black ${aiOptimizationMetrics.confidenceColorText}`}>
                          {aiOptimizationMetrics.statusTag}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Switches regulatory control */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="p-5.5 rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-[#111c44]/60 shadow-sm flex-grow flex flex-col justify-between space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                    <div>
                      <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        {t("AI Smart Consumption", "โหมด AI อัจฉริยะลดพลังงาน")}
                      </h5>
                      <p className="text-[0.68rem] text-slate-500">
                        {t("Manage live smart regulatory components directly inside your property grid", "เปิดใช้งานสวิตช์ประหยัดไฟอัตโนมัติครบ 4 ระบบเพื่อเพิ่มประสิทธิภาพระดับกริด")}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const allOn = aiSmartAc && aiEcoStandby && aiLoadShift && aiPfTuning;
                        setAiSmartAc(!allOn);
                        setAiEcoStandby(!allOn);
                        setAiLoadShift(!allOn);
                        setAiPfTuning(!allOn);
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 border ${
                        (aiSmartAc && aiEcoStandby && aiLoadShift && aiPfTuning) ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      <span className="sr-only">Toggle AI Smart Consumption</span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          (aiSmartAc && aiEcoStandby && aiLoadShift && aiPfTuning) ? 'translate-x-2.5' : '-translate-x-2.5'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 flex-grow justify-center">
                    {/* Switch 1: Smart AC */}
                    <button
                      onClick={() => setAiSmartAc(!aiSmartAc)}
                      className={`p-3.5 rounded-2xl flex items-center justify-between border text-xs font-semibold transition-all duration-200 group/sw ${
                        aiSmartAc
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                          : "bg-slate-50 border-slate-200 dark:bg-transparent dark:border-slate-700/50 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/sw:scale-105 ${
                          aiSmartAc ? "bg-emerald-500/10" : "bg-slate-200/50 dark:bg-slate-800"
                        }`}>
                          <i className={`fas fa-snowflake text-[0.8rem] ${aiSmartAc ? "text-emerald-500 animate-spin-slow" : "text-slate-500"}`} />
                        </div>
                        <div className="text-left">
                          <span className="block font-bold text-slate-800 dark:text-slate-200">
                            {t("1. Smart AC Thermostat", "1. จูนอุณหภูมิ AC อัจฉริยะ")}
                          </span>
                          <span className="block text-[0.58rem] text-slate-500 dark:text-slate-400 font-medium">
                            {t("Adapts air cooling loads", "ปรับลดกระแสแอร์ตามสภาพอากาศ")}
                          </span>
                        </div>
                      </div>
                      <div className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-250 shrink-0 ${
                        aiSmartAc ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                      }`}>
                        <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-250 shadow-sm ${
                          aiSmartAc ? "translate-x-4.5" : "translate-x-0"
                        }`} />
                      </div>
                    </button>

                    {/* Switch 2: Eco Standby */}
                    <button
                      onClick={() => setAiEcoStandby(!aiEcoStandby)}
                      className={`p-3.5 rounded-2xl flex items-center justify-between border text-xs font-semibold transition-all duration-200 group/sw ${
                        aiEcoStandby
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                          : "bg-slate-50 border-slate-200 dark:bg-transparent dark:border-slate-700/50 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/sw:scale-105 ${
                          aiEcoStandby ? "bg-emerald-500/10" : "bg-slate-200/50 dark:bg-slate-800"
                        }`}>
                          <i className={`fas fa-plug text-[0.8rem] ${aiEcoStandby ? "text-emerald-500" : "text-slate-500"}`} />
                        </div>
                        <div className="text-left">
                          <span className="block font-bold text-slate-800 dark:text-slate-200">
                            {t("2. Eco Standby Cutoff", "2. คุมไฟกระแส Standby อัตโนมัติ")}
                          </span>
                          <span className="block text-[0.58rem] text-slate-500 dark:text-slate-400 font-medium">
                            {t("Cuts residual power leaks", "ปิดการใช้พลังงานสำรองที่สูญเปล่า")}
                          </span>
                        </div>
                      </div>
                      <div className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-250 shrink-0 ${
                        aiEcoStandby ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                      }`}>
                        <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-250 shadow-sm ${
                          aiEcoStandby ? "translate-x-4.5" : "translate-x-0"
                        }`} />
                      </div>
                    </button>

                    {/* Switch 3: Load Shift */}
                    <button
                      onClick={() => setAiLoadShift(!aiLoadShift)}
                      className={`p-3.5 rounded-2xl flex items-center justify-between border text-xs font-semibold transition-all duration-200 group/sw ${
                        aiLoadShift
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                          : "bg-slate-50 border-slate-200 dark:bg-transparent dark:border-slate-700/50 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/sw:scale-105 ${
                          aiLoadShift ? "bg-emerald-500/10" : "bg-slate-200/50 dark:bg-slate-800"
                        }`}>
                          <i className={`fas fa-history text-[0.8rem] ${aiLoadShift ? "text-emerald-500" : "text-slate-500"}`} />
                        </div>
                        <div className="text-left">
                          <span className="block font-bold text-slate-800 dark:text-slate-200">
                            {t("3. AI TOU Load Shifting", "3. การย้ายช่วงเวลาโหลด (TOU)")}
                          </span>
                          <span className="block text-[0.58rem] text-slate-500 dark:text-slate-400 font-medium">
                            {t("Shifts peak power to night", "โยกย้ายช่วงใช้ไฟหลักเพื่อรับเรต Off-Peak")}
                          </span>
                        </div>
                      </div>
                      <div className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-250 shrink-0 ${
                        aiLoadShift ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                      }`}>
                        <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-250 shadow-sm ${
                          aiLoadShift ? "translate-x-4.5" : "translate-x-0"
                        }`} />
                      </div>
                    </button>

                    {/* Switch 4: Power Factor Tuning */}
                    <button
                      onClick={() => setAiPfTuning(!aiPfTuning)}
                      className={`p-3.5 rounded-2xl flex items-center justify-between border text-xs font-semibold transition-all duration-200 group/sw ${
                        aiPfTuning
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                          : "bg-slate-50 border-slate-200 dark:bg-transparent dark:border-slate-700/50 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/sw:scale-105 ${
                          aiPfTuning ? "bg-emerald-500/10" : "bg-slate-200/50 dark:bg-slate-800"
                        }`}>
                          <i className={`fas fa-charging-station text-[0.8rem] ${aiPfTuning ? "text-emerald-500" : "text-slate-500"}`} />
                        </div>
                        <div className="text-left">
                          <span className="block font-bold text-slate-800 dark:text-slate-200">
                            {t("4. PF Auto-Smoothing", "4. ปรับจูนเพาเวอร์แฟกเตอร์ (PF)")}
                          </span>
                          <span className="block text-[0.58rem] text-slate-500 dark:text-slate-400 font-medium">
                            {t("Minimizes electrical network losses", "จูนกระแสและลดค่าสูญเสียความต้านทานสายส่ง")}
                          </span>
                        </div>
                      </div>
                      <div className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-250 shrink-0 ${
                        aiPfTuning ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                      }`}>
                        <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-250 shadow-sm ${
                          aiPfTuning ? "translate-x-4.5" : "translate-x-0"
                        }`} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "projected" && (
            <motion.div
              key="projected-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ProjectedSavingsCard
                lang={lang}
                isDarkMode={isDarkMode}
                devices={devices}
                analytics={analytics}
                aiSmartAc={aiSmartAc}
                setAiSmartAc={setAiSmartAc}
                aiEcoStandby={aiEcoStandby}
                setAiEcoStandby={setAiEcoStandby}
                aiPfTuning={aiPfTuning}
                setAiPfTuning={setAiPfTuning}
                aiLoadShift={aiLoadShift}
                setAiLoadShift={setAiLoadShift}
              />
            </motion.div>
          )}

          {activeTab === "telemetry" && (
            <motion.div
              key="telemetry-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-5.5 rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-[#111c44]/60 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h5 className="font-bold mb-1 font-display text-sm tracking-wide text-slate-800 dark:text-slate-100 uppercase">
                    {t("GRID PERFORMANCE & RELIABILITY TELEMETRY", "แผนภูมิประสิทธิภาพความเชื่อมั่นของโครงข่าย")}
                  </h5>
                  <p className="text-[0.68rem] text-slate-500">
                    {t("Analysis of active grid uptime stability indicators & reactive PF tuning efficiency metrics", "แสดงผลการวิเคราะห์ระดับความเสถียร (Uptime) และประสิทธิภาพพลังงานตัวประกอบ (PF)")}
                  </p>
                </div>
                <div className="p-1 bg-slate-100 dark:bg-slate-900/80 rounded-2xl flex gap-1 w-full sm:w-auto border border-slate-200 dark:border-slate-700/50">
                  {(["daily", "weekly", "monthly"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setPerfRange(range)}
                      className={`px-4 py-2 rounded-xl font-bold uppercase text-[0.62rem] tracking-wider transition-all duration-200 ${
                        perfRange === range
                          ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      {t(
                        range === "daily" ? "Daily" : range === "weekly" ? "Weekly" : "Monthly",
                        range === "daily" ? "รายวัน" : range === "weekly" ? "รายสัปดาห์" : "รายเดือน"
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[300px] md:h-[350px] w-full bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-transparent">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={performanceChartData}>
                    <defs>
                      <linearGradient id="upColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="effColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.05)"}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 9, fontWeight: "bold", fill: isDarkMode ? "#94a3b8" : "#475569" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 9, fill: isDarkMode ? "#94a3b8" : "#475569" }}
                      domain={[80, 100]}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: "16px",
                        border: "none",
                        backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                        color: isDarkMode ? "#f1f5f9" : "#0f172a",
                      }}
                    />
                    <Legend
                      align="right"
                      verticalAlign="top"
                      iconType="circle"
                      wrapperStyle={{
                        paddingBottom: "20px",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    />
                    <Area
                      name={t("Grid Uptime", "ความเสถียรเสาส่ง")}
                      type="monotone"
                      dataKey="uptime"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      fill="url(#upColor)"
                    />
                    <Line
                      name={t("Tuning Efficiency", "ประสิทธิภาพการประหยัด")}
                      type="monotone"
                      dataKey="efficiency"
                      stroke="var(--primary)"
                      strokeWidth={2.5}
                      dot={{ r: 3, strokeWidth: 1.5, fill: "#fff" }}
                      activeDot={{ r: 5 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {activeTab === "calc" && (
            <motion.div
              key="calc-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white dark:bg-slate-900/10 p-4.5 rounded-3xl border border-slate-200 dark:border-slate-700/50"
            >
              <SmartSavingsCalculator
                isDarkMode={isDarkMode}
                lang={lang}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
