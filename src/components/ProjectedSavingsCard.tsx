import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  TrendingDown, 
  RefreshCw, 
  ArrowDownRight, 
  Lightbulb, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Zap, 
  Flame,
  Activity,
  Layers
} from "lucide-react";

interface Insight {
  titleEn: string;
  titleTh: string;
  descEn: string;
  descTh: string;
  savingsEn: string;
  savingsTh: string;
  icon: string;
  impact: "High" | "Medium" | "Low" | string;
}

interface ProjectedSavingsData {
  totalCurrentCost: number;
  totalOptimizedCost: number;
  monthlySavings: number;
  savingsPercentage: number;
  insights: Insight[];
}

interface ProjectedSavingsCardProps {
  lang: "th" | "en";
  isDarkMode?: boolean;
  devices: any[];
  analytics: {
    totalCost: number;
    totalUnits: number;
    [key: string]: any;
  };
  aiSmartAc: boolean;
  setAiSmartAc: (v: boolean) => void;
  aiEcoStandby: boolean;
  setAiEcoStandby: (v: boolean) => void;
  aiPfTuning: boolean;
  setAiPfTuning: (v: boolean) => void;
  aiLoadShift: boolean;
  setAiLoadShift: (v: boolean) => void;
}

export const ProjectedSavingsCard: React.FC<ProjectedSavingsCardProps> = ({
  lang,
  isDarkMode = false,
  devices,
  analytics,
  aiSmartAc,
  setAiSmartAc,
  aiEcoStandby,
  setAiEcoStandby,
  aiPfTuning,
  setAiPfTuning,
  aiLoadShift,
  setAiLoadShift,
}) => {
  const [data, setData] = useState<ProjectedSavingsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Custom interactive states
  const [isBreakdownOpen, setIsBreakdownOpen] = useState<boolean>(false);
  const [applying, setApplying] = useState<boolean>(false);
  const [showApplySuccess, setShowApplySuccess] = useState<boolean>(false);

  const fetchProjectedSavings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/projected-savings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          devices,
          analytics,
        }),
      });

      if (!response.ok) {
        throw new Error("API server returned error");
      }

      const resData = await response.json();
      setData(resData);
    } catch (err: any) {
      console.error("Error fetching projected savings:", err);
      setError(
        lang === "th"
          ? "ไม่สามารถคำนวณสถิติประหยัดสะสมได้ชั่วคราว"
          : "Failed to calculate dynamic savings projections temporarily."
      );
    } finally {
      setLoading(false);
    }
  }, [devices, analytics, lang]);

  // Fetch savings when devices count or total cost changes
  useEffect(() => {
    fetchProjectedSavings();
  }, [devices.length, analytics.totalCost]);

  const t = (en: string, th: string) => (lang === "th" ? th : en);

  // Check if all AI recommendation switches are enabled
  const allApplied = aiSmartAc && aiEcoStandby && aiPfTuning && aiLoadShift;

  // Handle Apply recommendations
  const handleApplyRecommendations = () => {
    if (allApplied) return;
    setApplying(true);
    
    // Simulate smart grid network latency configuration
    setTimeout(() => {
      setAiSmartAc(true);
      setAiEcoStandby(true);
      setAiPfTuning(true);
      setAiLoadShift(true);
      setApplying(false);
      setShowApplySuccess(true);
      
      // Auto dismiss success label
      setTimeout(() => {
        setShowApplySuccess(false);
      }, 4000);
    }, 1500);
  };

  // Dynamic category breakdown of potential savings based on user appliances
  const categoryBreakdown = useMemo(() => {
    if (!data) return [];
    
    let hvacSaved = 0;
    let lightingSaved = 0;
    let appliancesSaved = 0;

    devices.forEach((d) => {
      // Calculate individual monthly device consumption cost
      const cost = (d.watt * d.hours * 30 * 4.5) / 1000;
      if (
        d.category === "Cooling" || 
        d.name?.toLowerCase().includes("air") || 
        d.name?.toLowerCase().includes("ac")
      ) {
        hvacSaved += cost * 0.15; // 15% optimization potential
      } else if (
        d.category === "Entertainment" || 
        d.category === "Office" || 
        d.name?.toLowerCase().includes("tv") || 
        d.name?.toLowerCase().includes("computer") ||
        d.name?.toLowerCase().includes("gaming")
      ) {
        lightingSaved += cost * 0.08; // 8% standby savings potential
      } else {
        appliancesSaved += cost * 0.05; // 5% general schedule optimizations
      }
    });

    const sum = hvacSaved + lightingSaved + appliancesSaved;
    if (sum > 0) {
      const scale = data.monthlySavings / sum;
      hvacSaved *= scale;
      lightingSaved *= scale;
      appliancesSaved *= scale;
    } else {
      // Direct proportion falls back to general standards
      hvacSaved = data.monthlySavings * 0.55;
      lightingSaved = data.monthlySavings * 0.25;
      appliancesSaved = data.monthlySavings * 0.20;
    }

    return [
      { 
        nameEn: "HVAC & Thermal Systems", 
        nameTh: "ระบบแอร์และความร้อน (Cooling)", 
        amount: Math.round(hvacSaved), 
        pct: Math.round((hvacSaved / data.monthlySavings) * 100) || 55, 
        icon: "fa-snowflake text-sky-400", 
        color: "bg-sky-500",
        border: "border-sky-500/20"
      },
      { 
        nameEn: "Smart Lighting & Media", 
        nameTh: "ระบบแสงสว่างและสื่อบันเทิง", 
        amount: Math.round(lightingSaved), 
        pct: Math.round((lightingSaved / data.monthlySavings) * 100) || 25, 
        icon: "fa-lightbulb text-amber-400", 
        color: "bg-amber-500",
        border: "border-amber-500/20"
      },
      { 
        nameEn: "Appliances & Baseline", 
        nameTh: "เครื่องใช้ไฟฟ้าและโฮสต์อุปกรณ์", 
        amount: Math.round(appliancesSaved), 
        pct: Math.round((appliancesSaved / data.monthlySavings) * 100) || 20, 
        icon: "fa-plug text-emerald-400", 
        color: "bg-emerald-500",
        border: "border-emerald-500/20"
      },
    ];
  }, [data, devices]);

  return (
    <motion.div 
      className="w-full h-full flex flex-col bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-[2.2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-300 relative group/card"
      whileHover={{ 
        scale: 1.008,
        boxShadow: isDarkMode 
          ? "0 0 35px rgba(16, 185, 129, 0.18)" 
          : "0 0 30px rgba(16, 185, 129, 0.12)"
      }}
    >
      {/* Dynamic Ambient Hover Pulse Glow Effect */}
      <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover/card:via-emerald-500/60 transition-all duration-700" />
      
      {/* Card Header */}
      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 px-6 py-4.5 border-b border-dashed border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <Sparkles className="w-4.5 h-4.5 text-emerald-500 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <div>
            <h4 className="text-sm font-bold font-display text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              {t("AI Projected Savings", "ประมาณการยอดประหยัดด้วย AI")}
              <span className="text-[0.6rem] uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.25 rounded-md font-extrabold tracking-wider">
                Live
              </span>
            </h4>
            <p className="text-[0.68rem] text-slate-500 dark:text-slate-400">
              {t(
                "Automated smart grid scheduling & tuning",
                "วิเคราะห์จัดระเบียบโครงข่ายอัตโนมัติ"
              )}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchProjectedSavings}
          disabled={loading}
          className="p-2 text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center active:scale-95 disabled:opacity-50"
          title={t("Recalculate Savings", "คำนวณใหม่")}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-emerald-500" : ""}`} />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        {loading && !data ? (
          <div className="flex-grow flex flex-col items-center justify-center py-12 space-y-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-slate-500 animate-pulse">
              {t("Gemini analyzing active node telemetry...", "ระบบ AI กำลังวิเคราะห์สัญญาณโทรมาตรอุปกรณ์...")}
            </p>
          </div>
        ) : error && !data ? (
          <div className="flex-grow flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-3">
              <HelpCircle className="w-6 h-6" />
            </div>
            <p className="text-xs text-red-500 max-w-xs">{error}</p>
            <button
              onClick={fetchProjectedSavings}
              className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold rounded-xl transition-all"
            >
              {t("Retry", "ลองใหม่")}
            </button>
          </div>
        ) : data ? (
          <div className="space-y-4.5 flex-grow flex flex-col">
            
            {/* Top Savings Banner */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/15 dark:to-teal-950/5 p-4.5 rounded-[1.8rem] border border-emerald-500/10 flex items-center justify-between relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[0.65rem] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  {t("Potential reduction rate", "อัตราสัดส่วนการลดพลังงาน")}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-display font-black text-emerald-700 dark:text-emerald-400 tracking-tight">
                    ฿{data.monthlySavings.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    / {t("month", "เดือน")}
                  </span>
                </div>
                <p className="text-[0.68rem] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px] sm:max-w-xs">
                  {t(
                    `Drops estimated cost to ฿${data.totalOptimizedCost.toLocaleString()}/mo`,
                    `ลดภาระยอดใช้จ่ายเหลือ ฿${data.totalOptimizedCost.toLocaleString()}/เดือน`
                  )}
                </p>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <div className="bg-emerald-500 text-white dark:bg-emerald-500 dark:text-slate-950 text-sm font-display font-black px-3.5 py-1.5 rounded-xl flex items-center gap-0.5 shadow-md shadow-emerald-500/10">
                  <span>-{data.savingsPercentage.toFixed(1)}%</span>
                  <ArrowDownRight className="w-4 h-4 stroke-[3.5px]" />
                </div>
              </div>
            </div>

            {/* Collapsible Savings Breakdown Section */}
            <div className="border border-slate-150 dark:border-slate-800 rounded-2.5xl overflow-hidden bg-slate-50/30 dark:bg-slate-900/10">
              <button
                type="button"
                onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
                className="w-full flex justify-between items-center px-4 py-3 hover:bg-slate-100/50 dark:hover:bg-slate-800/20 transition-all text-left"
              >
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold">
                    {t("View Savings by Category", "เปิดแจกแจงรายหมวดหมู่")}
                  </span>
                </div>
                {isBreakdownOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </button>

              <AnimatePresence>
                {isBreakdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-1 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-3 bg-white/40 dark:bg-slate-900/30">
                      {categoryBreakdown.map((item, index) => (
                        <div key={index} className="space-y-1.5">
                          <div className="flex justify-between items-center text-[0.7rem]">
                            <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-400">
                              <i className={`fas ${item.icon} text-xs`} />
                              <span>{t(item.nameEn, item.nameTh)}</span>
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-200">
                              ฿{item.amount.toLocaleString()} ({item.pct}%)
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.pct}%` }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className={`h-full ${item.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smart Action Button - Apply AI Optimization */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleApplyRecommendations}
                disabled={applying || allApplied}
                className={`w-full relative overflow-hidden py-3 px-4 rounded-2xl font-bold font-display text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                  allApplied 
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-default shadow-none border border-slate-200 dark:border-slate-700" 
                    : applying 
                    ? "bg-primary/90 text-white cursor-wait" 
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-[0.98]"
                }`}
              >
                {applying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t("Synchronizing AI Controllers...", "ระบบกำลังปรับจูนค่าเครื่องใช้ไฟฟ้า...")}</span>
                  </>
                ) : allApplied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500 stroke-[3px]" />
                    <span>{t("All AI recommendations active", "เปิดการตั้งค่าประหยัดสูงสุดแล้ว")}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
                    <span>{t("Apply AI Recommendations", "บังคับใช้คำแนะนำด้วย AI ทันที")}</span>
                  </>
                )}
              </button>

              <AnimatePresence>
                {showApplySuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-2 text-center text-[0.68rem] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 animate-pulse"
                  >
                    {t(
                      "✓ Smart optimization parameters updated across all 4 grid switches!",
                      "✓ ตั้งค่าโหมดความถี่และพารามิเตอร์ประหยัดพลังงานใน AI Switches ทั้ง 4 ตัวแล้ว!"
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smart Insights List */}
            <div className="space-y-3 flex-grow pt-2.5">
              <h5 className="text-[0.68rem] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                {t("Tailored AI Recommendations", "คำแนะนำวิเคราะห์รายโหนดโดย AI")}
              </h5>

              <div className="space-y-2.5">
                {data.insights.map((insight, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    key={idx}
                    className="flex gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-2.5xl border border-slate-100 dark:border-0 hover:bg-slate-100/40 dark:hover:bg-white/10 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 shrink-0 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200/50 dark:border-slate-800 shadow-xs group-hover:scale-105 transition-all text-slate-500 dark:text-slate-300">
                      <i className={`fas ${insight.icon} text-xs`} />
                    </div>

                    <div className="flex-grow min-w-0 space-y-0.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[0.75rem] font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                          {t(insight.titleEn, insight.titleTh)}
                        </span>
                        <span className="text-[0.68rem] font-bold text-emerald-600 dark:text-emerald-400 shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                          -{t(insight.savingsEn, insight.savingsTh)}
                        </span>
                      </div>
                      <p className="text-[0.65rem] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {t(insight.descEn, insight.descTh)}
                      </p>
                      <div className="flex items-center gap-1.5 pt-0.5">
                        <span
                          className={`text-[0.52rem] uppercase tracking-wider font-black px-1.5 py-0.25 rounded-md ${
                            insight.impact === "High"
                              ? "bg-red-500/10 text-red-500"
                              : insight.impact === "Medium"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {t(`${insight.impact} Impact`, `${insight.impact === "High" ? "ผลลัพธ์สูง" : insight.impact === "Medium" ? "ผลลัพธ์ปานกลาง" : "ผลลัพธ์ทั่วไป"}`)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        ) : null}
      </div>
    </motion.div>
  );
};
