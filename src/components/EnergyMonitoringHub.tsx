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
        label: t("Today's Energy", "วันนี้ใช้ไฟ"),
        val: `${analytics.totalUnits.toFixed(1)} kWh`,
        icon: Zap,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        desc: t("Current daily accumulated load", "พลังงานไฟฟ้ารวมที่ใช้ในวันนี้"),
      },
      {
        label: t("Est. Monthly Cost", "ประเมินค่าไฟเดือนนี้"),
        val: `฿${Math.round(analytics.totalCost).toLocaleString()}`,
        icon: Coins,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        desc: t("Based on active appliances", "คำนวณจากพฤติกรรมปัจจุบัน"),
      },
      {
        label: t("AI Forecast", "พยากรณ์พลังงาน"),
        val: `+${(analytics.burnRate / 10).toFixed(1)}%`,
        icon: Activity,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        desc: t("Expected increase tomorrow", "แนวโน้มการใช้ไฟพรุ่งนี้"),
      },
      {
        label: t("Budget Health", "สถานะงบประมาณ"),
        val: analytics.budgetRemaining > 0 ? t("Optimal", "ปกติ") : t("Warning", "เกินงบ"),
        icon: Shield,
        color: analytics.budgetRemaining > 0 ? "text-emerald-500" : "text-rose-500",
        bg: analytics.budgetRemaining > 0 ? "bg-emerald-500/10" : "bg-rose-500/10",
        desc: analytics.budgetRemaining > 0 ? t("Within limits", "ยังอยู่ในเกณฑ์ที่ตั้งไว้") : t("Budget exceeded", "ใช้พลังงานเกินเป้าหมาย"),
      },
    ];
  }, [analytics, lang]);

  const [isGraphExpanded, setIsGraphExpanded] = useState(false);

  return (
    <div id="energy-monitoring-hub" className="w-full bg-white dark:bg-[#111c44]/80 border border-slate-200 dark:border-slate-700/50 shadow-md rounded-[2.5rem] overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 relative group">
      <div className="p-6 md:p-8 flex-grow space-y-8">
        
        {/* LEVEL 1: Primary Usage */}
        <div className="text-center md:text-left space-y-2 animate-fade-in">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            {t("Today's Energy", "วันนี้ใช้ไฟ")}
          </h2>
          <div className="text-5xl md:text-7xl font-black font-display tracking-tighter text-slate-900 dark:text-white flex items-baseline justify-center md:justify-start gap-2">
            {analytics.totalUnits.toFixed(1)} <span className="text-2xl md:text-3xl font-bold text-slate-400">kWh</span>
          </div>
        </div>

        {/* LEVEL 2: Cost */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-5 md:p-6 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-center sm:justify-start gap-2">
              <Coins className="w-4 h-4 text-emerald-500" />
              {t("Est. Monthly Cost", "ค่าไฟประเมินเดือนนี้")}
            </h3>
            <div className="text-3xl md:text-4xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
              ฿{Math.round(analytics.totalCost).toLocaleString()}
            </div>
          </div>
          <div className="text-center sm:text-right">
             <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
               {t("Budget Health", "สถานะงบประมาณ")}
             </div>
             <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${analytics.budgetRemaining > 0 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-500"}`}>
               <Shield className="w-3.5 h-3.5" />
               {analytics.budgetRemaining > 0 ? t("Within limits", "ยังอยู่ในเกณฑ์ที่ตั้งไว้") : t("Budget exceeded", "เกินงบ")}
             </div>
          </div>
        </div>

        {/* LEVEL 3: AI Recommendations */}
        <div className="border border-purple-500/20 bg-purple-500/5 dark:bg-purple-900/10 p-6 rounded-3xl animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t("AI Assistant", "คำแนะนำจาก AI ผู้ช่วย")}
              </h4>
              <p className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                {lang === "th" 
                  ? `วันนี้คุณใช้ไฟมากกว่าปกติประมาณ ${Math.abs(Number((analytics.burnRate / 20).toFixed(1)))}%`
                  : `You are using ${Math.abs(Number((analytics.burnRate / 20).toFixed(1)))}% more energy than usual today.`}
                <br className="hidden sm:block" />
                <span className="text-purple-600 dark:text-purple-400">
                  {lang === "th" ? "สาเหตุ: เปิดอุปกรณ์ทำความเย็นนานขึ้น" : "Cause: Cooling systems active longer."}
                </span>
                <br className="hidden sm:block" />
                <span className="font-bold">
                  {lang === "th" ? "แนะนำ: ลดอุณหภูมิแอร์เป็น 26°C จะช่วยประหยัดค่าไฟได้ทันที" : "Recommendation: Set AC to 26°C to save instantly."}
                </span>
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => {
                    const allOn = aiSmartAc && aiEcoStandby && aiLoadShift && aiPfTuning;
                    setAiSmartAc(!allOn);
                    setAiEcoStandby(!allOn);
                    setAiLoadShift(!allOn);
                    setAiPfTuning(!allOn);
                  }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 ${(aiSmartAc && aiEcoStandby && aiLoadShift && aiPfTuning) ? 'bg-purple-600 text-white shadow-purple-500/30 hover:bg-purple-700' : 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30 hover:bg-purple-50 dark:hover:bg-purple-900/20'}`}
                >
                  <i className="fas fa-magic"></i>
                  {lang === "th" ? "เปิดทุกฟังก์ชันประหยัดอัตโนมัติ" : "Optimize All Settings Automatically"}
                </button>
              </div>
            </div>
            
            {/* Quick AI Switches */}
            <div className="w-full md:w-80 space-y-2 shrink-0">
               <div className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest mb-3">
                 {t("Smart Controls", "ควบคุมสวิตช์")}
               </div>
               
               {/* Switch 1: Smart AC */}
               <button
                 onClick={() => setAiSmartAc(!aiSmartAc)}
                 className={`w-full p-3.5 rounded-2xl flex items-center justify-between border text-xs font-semibold transition-all duration-200 group/sw ${
                   aiSmartAc
                     ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                     : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-500"
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
                 className={`w-full p-3.5 rounded-2xl flex items-center justify-between border text-xs font-semibold transition-all duration-200 group/sw ${
                   aiEcoStandby
                     ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                     : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-500"
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
                 className={`w-full p-3.5 rounded-2xl flex items-center justify-between border text-xs font-semibold transition-all duration-200 group/sw ${
                   aiLoadShift
                     ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                     : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-500"
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
                 className={`w-full p-3.5 rounded-2xl flex items-center justify-between border text-xs font-semibold transition-all duration-200 group/sw ${
                   aiPfTuning
                     ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                     : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-500"
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

        {/* Expandable Advanced Charts */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setIsGraphExpanded(!isGraphExpanded)}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors uppercase tracking-widest py-2"
          >
            {isGraphExpanded ? (
              <><i className="fas fa-chevron-up"></i> {t("Hide Advanced Analytics", "ซ่อนข้อมูลเชิงลึก")}</>
            ) : (
              <><i className="fas fa-chart-line"></i> {t("Show Advanced Analytics", "ดูข้อมูลกราฟเชิงลึก")}</>
            )}
          </button>
          
          <AnimatePresence>
            {isGraphExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-6"
              >
                {/* Embedded Telemetry Graph */}
                <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/30">
                  <h5 className="font-bold mb-4 font-display text-sm tracking-wide text-slate-800 dark:text-slate-100 uppercase">
                    {t("GRID PERFORMANCE TELEMETRY", "แผนภูมิประสิทธิภาพความเชื่อมั่นของโครงข่าย")}
                  </h5>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={performanceChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#334155" : "#e2e8f0"} vertical={false} />
                        <XAxis dataKey="time" stroke={isDarkMode ? "#64748b" : "#94a3b8"} fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" stroke={isDarkMode ? "#64748b" : "#94a3b8"} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                        <YAxis yAxisId="right" orientation="right" stroke={isDarkMode ? "#64748b" : "#94a3b8"} fontSize={10} tickLine={false} axisLine={false} />
                        <RechartsTooltip
                          contentStyle={{ backgroundColor: isDarkMode ? "#1e293b" : "#fff", borderRadius: "12px", border: "none", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                          itemStyle={{ fontSize: "11px", fontWeight: "bold" }}
                          labelStyle={{ fontSize: "10px", color: isDarkMode ? "#94a3b8" : "#64748b", marginBottom: "4px" }}
                        />
                        <Area yAxisId="left" type="monotone" dataKey="uptime" fill="url(#colorUptime)" stroke="#10b981" strokeWidth={2} fillOpacity={1} />
                        <Line yAxisId="right" type="monotone" dataKey="pfScore" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: "#3b82f6", strokeWidth: 2, stroke: isDarkMode ? "#1e293b" : "#fff" }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
