import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, ComposedChart} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Activity, ShieldAlert, Server, Droplet, Fan, Flame, Wind, Snowflake, Coffee, Tv, Thermometer, Wifi, Smartphone, Cpu, Monitor, Battery, AlertTriangle, Sliders, Clock, TrendingDown, Book, Settings, DollarSign, Calendar, Info, Search, Power, ZapOff
} from "lucide-react";
import { WeatherCard } from "../WeatherCard";
import { EnergyTipWidget } from "../EnergyTipWidget";
import { HistoricalTrendChart } from "../HistoricalTrendChart";
import { QuestLeaderboard } from "../QuestLeaderboard";
import { DailyEnergyQuests } from "../DailyEnergyQuests";

import { Device, DeviceCategory } from "../../types/device.types";
import { EnergyMonitoringHub } from "../EnergyMonitoringHub";
import { SmartSavingsCalculator } from "../SmartSavingsCalculator";
import { ConsolidatedCalculator } from "../ConsolidatedCalculator";
import { ProjectedSavingsCard } from "../ProjectedSavingsCard";
import UserManual from "../UserManual";
import { PropertyDistributionMap } from "../PropertyDistributionMap";
import { Confetti } from "../Confetti";
import { GuidedTour } from "../GuidedTour";
import { jsPDF } from "jspdf";
import { useContrastAdjustment } from "../../hooks/useContrastAdjustment";

export default function OverviewTab({ shared }: { shared: any }) {
  const { lang, isDarkMode, onToggleTheme, onLogout, multiDevices, setMultiDevices, analytics, t, confettiTrigger, setConfettiTrigger, currentPage, setCurrentPage, sidebarAvatar, setSidebarAvatar, sidebarCustomLogoUrl, setSidebarCustomLogoUrl, currentBgColor, contrastAnalysis, severeWeatherAlert, weatherData, isWeatherLoading, weatherLocation, weatherError, weatherInput, isMobileMenuOpen, setIsMobileMenuOpen, isTourActive, setIsTourActive, startImmediateTour, setStartImmediateTour, aiAutopilotCapping, setAiAutopilotCapping, ecoStreak, setEcoStreak, chatMessages, setChatMessages, chatInput, setChatInput, isSendingChat, setIsSendingChat, isChatOpen, setIsChatOpen, activeFaqCategory, setActiveFaqCategory, removeDevice, generatePDF, handleMoveWidget, widgetOrder, setWidgetOrder, draggedIndex, setDraggedIndex, isGeneratingPDF, setIsGeneratingPDF, dailySavingsData, performanceChartData, aiOptimizationMetrics, settlementLogs, aiSmartAc, setAiSmartAc, aiEcoStandby, setAiEcoStandby, aiPfTuning, setAiPfTuning, aiLoadShift, setAiLoadShift, perfRange, setPerfRange, globalBudget, unitRate, telemetryPerfRange, setTelemetryPerfRange, deviceSpecificChartData, compareDevices, aiOptimizationChartData, deviceAnalysis, isAnalyzingDevice, setIsAnalyzingDevice, selectedDeviceId, setSelectedDeviceId, compareDeviceIds, setCompareDeviceIds, showComparisonView, setShowComparisonView, calcDays, setCalcDays, sharedFtRate, setSharedFtRate, plannedKwh, setPlannedKwh, onPeakShare, setOnPeakShare, activeSpike, setActiveSpike, aiAlerts, setAiAlerts, isAiScanning, setIsAiScanning, aiTick, setAiTick, claimedQuests, setClaimedQuests, handleInjectVirtualLoad, handleAiOptimization, setGlobalBudget, setUnitRate, setDeviceAnalysis, setWeatherInput, setWeatherLocation, fetchWeatherForAlert, addDevice, updateDeviceConfig, containerVariants, itemVariants, CATEGORIES, renderWidgetWrapper, AnimatedCounter, calcMode, setCalcMode, calcTab, setCalcTab, statsFrame, setStatsFrame, statsTab, setStatsTab, notiTab, setNotiTab, manualTab, setManualTab, searchTerm, setSearchTerm, activeCategory, setActiveCategory, aiMonthlySavings, handleBatchStandbyCutoff, filteredDevices, toggleCompareSelection, setLang, runAiAnomalyScan, currentAlerts, totalClaimedXp, activeQuests, handleClaimQuest, handleDragStart, handleDragOver, handleDragEnd, activeHouse, telemetryChartData, CustomTooltip, telemetryPerformanceData, pieData, COLORS } = shared;

  return (
    <>
      <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
              id="tour-step-dashboard"
            >
              {/* PRIMARY HERO METRICS SECTION */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 lg:gap-6 mb-2"
              >
                {/* Metric 1: Total Savings */}
                <div className="w-full lg:w-[calc(50%-0.75rem)] flex-auto dashboard-card bg-white dark:bg-slate-800 p-6 relative overflow-hidden group border-2 border-emerald-500/30 dark:border-emerald-500/50 hover:border-emerald-500">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-piggy-bank text-8xl text-emerald-500"></i>
                  </div>
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
                        <i className="fas fa-coins text-emerald-500"></i>
                        {lang === "th" ? "สถิติการประหยัดอัจฉริยะ" : "SMART SAVINGS DIRECTORY"}
                      </span>
                      <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-1">
                        {lang === "th" ? "ประมาณการประหยัดค่าไฟสะสม" : "Total Combined Savings"}
                      </h4>
                    </div>
                    <div className="mt-4">
                      <div className="text-4xl md:text-5xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-400 flex items-baseline gap-2">
                        ฿{Math.round(aiMonthlySavings.amount).toLocaleString()}
                        <span className="text-sm font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-lg border border-emerald-500/10">
                          -{aiMonthlySavings.percent.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-[0.75rem] text-slate-700 dark:text-slate-300 mt-2 leading-relaxed mb-0">
                        {lang === "th" 
                          ? "ลดภาระค่าใช้จ่ายเครือข่ายจำลองแบบเรียลไทม์ ภายใต้การควบคุมระบบอัจฉริยะ" 
                          : "Calculated monthly reduction across active smart-nodes under active AI calibration."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metric 2: AI Score */}
                <div className="w-full lg:w-[calc(50%-0.75rem)] flex-auto dashboard-card bg-white dark:bg-slate-800 p-6 relative overflow-hidden group border-2 border-purple-500/30 dark:border-purple-500/50 hover:border-purple-500">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-brain text-8xl text-purple-500"></i>
                  </div>
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-3">
                        <i className="fas fa-bolt text-purple-500"></i>
                        {lang === "th" ? "คะแนนเสถียรภาพและคุณภาพ" : "SYSTEM CALIBRATION STATUS"}
                      </span>
                      <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-1">
                        {lang === "th" ? "คะแนนการเพิ่มประสิทธิภาพด้วย AI" : "AI Efficiency Score"}
                      </h4>
                    </div>
                    <div className="mt-4">
                      <div className="text-4xl md:text-5xl font-black font-mono tracking-tight text-purple-600 dark:text-purple-400 flex items-baseline gap-2">
                        {aiOptimizationMetrics.efficiencyIndex.toFixed(0)}
                        <span className="text-lg font-bold text-slate-600 dark:text-slate-400">/ 100</span>
                        <span className={`text-[0.7rem] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider ${aiOptimizationMetrics.confidenceLevelColor}`}>
                          {aiOptimizationMetrics.statusTag}
                        </span>
                      </div>
                      <p className="text-[0.75rem] text-slate-700 dark:text-slate-300 mt-2 leading-relaxed mb-0">
                        {lang === "th" 
                          ? `เสถียรภาพระบบ: ${aiOptimizationMetrics.confidenceLevelLabel} (อัตราร่วม ${aiOptimizationMetrics.confidenceLevel.toFixed(1)}%)` 
                          : `Calibration index: ${aiOptimizationMetrics.confidenceLevelLabel} (Precision ${aiOptimizationMetrics.confidenceLevel.toFixed(1)}%)`}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Layout Customization Information Panel */}
              <motion.div variants={itemVariants} className="flex flex-wrap justify-between items-center bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-transparent gap-3 mb-2 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/15 rounded-xl text-primary text-xs">
                    <i className="fas fa-layer-group text-base"></i>
                  </div>
                  <div>
                    <h6 className="font-bold font-display text-sm mb-0.5 text-slate-900 dark:text-white">
                      {lang === "th"
                        ? "เครื่องมือปรับแต่งเลย์เอาต์แผงทำงาน"
                        : "Grid Layout Customizer"}
                    </h6>
                    <p className="text-[0.75rem] text-slate-700 dark:text-slate-100 mb-0">
                      {lang === "th"
                        ? "ท่านสามารถลากวางที่หัวข้อการ์ดเพื่อจัดเรียงตำแหน่งวิดเจ็ตสถิติ หรือคลิกลูกศรเลื่อนหน้าต่างได้ตามที่ต้องการ"
                        : "Drag any widget title bar to rearrange or use standard arrow controllers to personalize your Workspace."}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const defaultOrder = [
                        "eco-quests",
                        "leaderboard",
                        "current-weather",
                        "energy-tip"
                      ];
                      setWidgetOrder(defaultOrder);
                      try {
                        localStorage.setItem(
                          "eudease_widget_order_v6",
                          JSON.stringify(defaultOrder),
                        );
                      } catch {}
                    }}
                    className="btn btn-xs bg-slate-200 text-slate-800 border border-slate-300 hover:bg-slate-300 dark:bg-white/10 dark:text-white dark:border-transparent dark:hover:bg-slate-800 text-[0.75rem] font-bold uppercase tracking-wider rounded-xl px-3 py-2 flex items-center gap-1.5"
                    type="button"
                  >
                    <i className="fas fa-history text-xs text-primary"></i>
                    <span>
                      {lang === "th" ? "รีเซ็ตคืนค่าเริ่มต้น" : "Reset Layout"}
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* Quick Questions & Common Energy Actions Component */}
              <motion.div variants={itemVariants} className="p-5 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/5 via-teal-500/5 to-emerald-500/5 shadow-md flex flex-col gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/15 flex items-center justify-center text-lg shadow-sm shrink-0">
                    <i className="fas fa-question-circle"></i>
                  </div>
                  <div>
                    <h6 className="font-bold font-display text-sm mb-0.5 text-slate-900 dark:text-white">
                      {lang === "th"
                        ? "เมนูทางเลือกและคำสั่งด่วน"
                        : "Quick Questions & Actions"}
                    </h6>
                    <p className="text-[0.75rem] text-slate-700 dark:text-slate-100 mb-0">
                      {lang === "th"
                        ? "รวมปุ่มลัดคำสั่งยอดนิยมเพื่อช่วยสแกนสถิติพลังงานของท่าน แสร้งส่งรายงานปัญหาไฟฟ้าขัดข้อง หรือตรวจสอบระบบประหยัดเร่งด่วนทันทีในคลิกเดียว"
                        : "Pre-defined action shortcuts to analyze consumption patterns, report anomalies, or fine-tune active grid settings in one click."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {/* Action 1: View Monthly Consumption */}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage("stats");
                      setStatsTab("telemetry");
                      setStatsFrame("monthly");
                    }}
                    className="flex-auto w-full lg:w-[calc(33.333%-1rem)] p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-300 dark:border-white/5 hover:border-primary/50 text-start hover:bg-primary/5 active:scale-95 active:opacity-90 transition-all duration-300 group flex items-center gap-3.5 input-has-focus shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <i className="fas fa-chart-bar text-sm"></i>
                    </div>
                    <div>
                      <div className="text-xs font-bold font-display text-slate-900 dark:text-slate-200 mb-0.5">
                        {lang === "th"
                          ? "รายงานใช้ไฟรายเดือน"
                          : "View Monthly Consumption"}
                      </div>
                      <p className="text-[0.7rem] text-slate-600 dark:text-slate-200 mb-0 line-clamp-1">
                        {lang === "th"
                          ? "สลับข้อมูลสถิติของชาร์ตแสดงผลเป็นรายเดือนทันที"
                          : "Switch live charts to monthly telemetry context."}
                      </p>
                    </div>
                  </button>

                  {/* Action 2: Report Power Issue */}
                  <button
                    type="button"
                    onClick={() => {
                      const newReport = {
                        id: "user_reported_" + Date.now(),
                        title:
                          lang === "th"
                            ? "📝 บันทึกรายงานปัญหาไฟฟ้าเรียบร้อย"
                            : "📝 Reported Power Quality Anomaly",
                        description:
                          lang === "th"
                            ? "บันทึกรายงานปัญหาไฟฟ้าขัดข้องของท่านเข้าระบบตรวจสอบพลังงานส่วนกลางเรียบร้อยอย่างปลอดภัยแล้ว"
                            : "Power irregularity recorded successfully on subgrid sector via Quick Questions selection panel.",
                        severity: "danger",
                        icon: "fa-exclamation-triangle",
                        time: "Just now",
                      };
                      setAiAlerts((prev) => [newReport, ...prev]);
                      setCurrentPage("noti");
                    }}
                    className="flex-auto w-full lg:w-[calc(33.333%-1rem)] p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-300 dark:border-white/5 hover:border-rose-500/50 text-start hover:bg-rose-500/5 active:scale-95 active:opacity-90 transition-all duration-300 group flex items-center gap-3.5 input-has-focus shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <i className="fas fa-exclamation-triangle text-sm"></i>
                    </div>
                    <div>
                      <div className="text-xs font-bold font-display text-slate-900 dark:text-slate-200 mb-0.5">
                        {lang === "th"
                          ? "แจ้งรายงานปัญหาไฟฟ้า"
                          : "Report Power Issue"}
                      </div>
                      <p className="text-[0.7rem] text-slate-600 dark:text-slate-200 mb-0 line-clamp-1">
                        {lang === "th"
                          ? "จำลองแจ้งเหตุกระแสไฟฟ้าตกหรือแรงดันผิดปกติ"
                          : "File standard voltage drop warning into alerts center"}
                      </p>
                    </div>
                  </button>

                  {/* Action 3: Optimize Energy Settings */}
                  <button
                    type="button"
                    onClick={() => {
                      setAiSmartAc(true);
                      setAiEcoStandby(true);
                      setAiLoadShift(true);
                      setAiPfTuning(true);

                      const optAlert = {
                        id: "optimize_triggered_" + Date.now(),
                        title:
                          lang === "th"
                            ? "✨ เปิดโหมดประหยัดพลังงานรวมเรียบร้อยแล้ว"
                            : "✨ Peak Reductions Configured",
                        description:
                          lang === "th"
                            ? "สวิตช์ประหยัดทั้ง 4 หมวด (ปรับอุณหภูมิแอร์, ตัดไฟ Standby, เลื่อนเวลา TOU, และจูนค่าไฟ) เริ่มทำงานประสานกันอย่างมีประสิทธิภาพสูงสุด"
                            : "All 4 standard smart algorithms toggled on securely (Smart AC, Standby Cutoff, Shift, and Tuning).",
                        severity: "success",
                        icon: "fa-magic",
                        time: "Just now",
                      };
                      setAiAlerts((prev) => [optAlert, ...prev].slice(0, 50));
                    }}
                    className="flex-auto w-full lg:w-[calc(33.333%-1rem)] p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-300 dark:border-white/5 hover:border-emerald-500/50 text-start hover:bg-emerald-500/5 active:scale-95 active:opacity-90 transition-all duration-300 group flex items-center gap-3.5 input-has-focus shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <i className="fas fa-magic text-sm"></i>
                    </div>
                    <div>
                      <div className="text-xs font-bold font-display text-slate-900 dark:text-slate-200 mb-0.5">
                        {lang === "th"
                          ? "เปิดทุกฟังก์ชันประหยัดทันที"
                          : "Optimize Energy Settings"}
                      </div>
                      <p className="text-[0.7rem] text-slate-600 dark:text-slate-200 mb-0 line-clamp-1">
                        {lang === "th"
                          ? "เปิดสวิตช์ฟังก์ชันประหยัดพลังงานอัจฉริยะครบ 4 ระบบในคลิกเดียว"
                          : "Activate all 4 power regulatory smart-toggles"}
                      </p>
                    </div>
                  </button>
                </div>
              </motion.div>

              <motion.div variants={containerVariants} className="flex flex-wrap gap-4 lg:gap-6 mb-8">
                {widgetOrder.map((widgetId, index) => {
                  const itemIdx = typeof index !== 'undefined' ? index : 0;
                  
                  const renderWidgetWrapper = (id: string, colSpan: string, content: React.ReactNode) => (
                    <motion.div
                      key={id}
                      variants={itemVariants}
                      draggable
                      onDragStart={(e: any) => handleDragStart(e, itemIdx)}
                      onDragOver={(e: any) => handleDragOver(e, itemIdx)}
                      onDragEnd={handleDragEnd}
                      className={`${colSpan} transition-all duration-300 h-full`}
                    >
                      <div className="h-full group">
                        {/* Draggable header (invisible by default, shows on hover/drag) */}
                        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity mb-2 px-2">
                           <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-500">
                             <i className="fas fa-grip-horizontal" aria-hidden="true"></i>
                             <span className="text-[0.7rem] uppercase tracking-wider font-bold">{lang === "th" ? "ลากเพื่อย้ายตำแหน่ง" : "DRAG TO MOVE"}</span>
                           </div>
                           <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="p-1 px-2 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-100 rounded hover:bg-primary hover:text-white transition-all text-[0.65rem] border-0 cursor-pointer"
                              onClick={() => handleMoveWidget(itemIdx, "up")}
                              disabled={itemIdx === 0}
                            >
                              <i className="fas fa-chevron-up" aria-hidden="true"></i>
                            </button>
                            <button
                              type="button"
                              className="p-1 px-2 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-100 rounded hover:bg-primary hover:text-white transition-all text-[0.65rem] border-0 cursor-pointer"
                              onClick={() => handleMoveWidget(itemIdx, "down")}
                              disabled={itemIdx === widgetOrder.length - 1}
                            >
                              <i className="fas fa-chevron-down" aria-hidden="true"></i>
                            </button>
                          </div>
                        </div>
                        {content}
                      </div>
                    </motion.div>
                  );

                  if (widgetId === "current-weather") {
                    return renderWidgetWrapper(
                      "current-weather",
                      "w-full lg:w-[calc(50%-0.75rem)]",
                      <WeatherCard lang={lang} isDarkMode={isDarkMode} locationName={activeHouse?.name || 'Local Property'} />
                    );
                  }


                  if (widgetId === "energy-tip") {
                    return renderWidgetWrapper(
                      "energy-tip",
                      "w-full lg:w-[calc(50%-0.75rem)]",
                      <div className="dashboard-card border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-[2.5rem] shadow-sm h-full">
                        <EnergyTipWidget lang={lang} isDarkMode={isDarkMode} activeHouse={activeHouse} />
                      </div>
                    );
                  }

                  

                  

                  if (widgetId === "eco-quests") {
                    return renderWidgetWrapper(
                      "eco-quests",
                      "w-full lg:w-[calc(50%-0.75rem)]",
                      <div className="dashboard-card border border-slate-200 dark:border-0 overflow-hidden bg-white dark:bg-slate-500/5 backdrop-blur-sm shadow-sm p-4 rounded-[2rem] h-full">
                        <DailyEnergyQuests
                          lang={lang}
                          onTokenClaimed={(amount) => {
                            setConfettiTrigger((t) => t + 1);
                          }}
                        />
                      </div>
                    );
                  }

                  if (widgetId === "leaderboard") {
                    return renderWidgetWrapper(
                      "leaderboard",
                      "w-full lg:w-[calc(50%-0.75rem)]",
                      <QuestLeaderboard
                        lang={lang}
                        totalClaimedXp={totalClaimedXp}
                        claimedQuests={claimedQuests}
                        ecoStreak={ecoStreak}
                        activeQuests={activeQuests}
                        handleClaimQuest={handleClaimQuest}
                        triggerConfetti={() => setConfettiTrigger((t) => t + 1)}
                      />
                    );
                  }





                  

                  

                  

                  



                  return null;
                })}
              </motion.div>
            </motion.div>

    </>
  );
}
