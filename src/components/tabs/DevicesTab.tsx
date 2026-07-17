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

export default function DevicesTab({ shared }: { shared: any }) {
  const { lang, isDarkMode, onToggleTheme, onLogout, multiDevices, setMultiDevices, analytics, t, confettiTrigger, setConfettiTrigger, currentPage, setCurrentPage, sidebarAvatar, setSidebarAvatar, sidebarCustomLogoUrl, setSidebarCustomLogoUrl, currentBgColor, contrastAnalysis, severeWeatherAlert, weatherData, isWeatherLoading, weatherLocation, weatherError, weatherInput, isMobileMenuOpen, setIsMobileMenuOpen, isTourActive, setIsTourActive, startImmediateTour, setStartImmediateTour, aiAutopilotCapping, setAiAutopilotCapping, ecoStreak, setEcoStreak, chatMessages, setChatMessages, chatInput, setChatInput, isSendingChat, setIsSendingChat, isChatOpen, setIsChatOpen, activeFaqCategory, setActiveFaqCategory, removeDevice, generatePDF, handleMoveWidget, widgetOrder, setWidgetOrder, draggedIndex, setDraggedIndex, isGeneratingPDF, setIsGeneratingPDF, dailySavingsData, performanceChartData, aiOptimizationMetrics, settlementLogs, aiSmartAc, setAiSmartAc, aiEcoStandby, setAiEcoStandby, aiPfTuning, setAiPfTuning, aiLoadShift, setAiLoadShift, perfRange, setPerfRange, globalBudget, unitRate, telemetryPerfRange, setTelemetryPerfRange, deviceSpecificChartData, compareDevices, aiOptimizationChartData, deviceAnalysis, isAnalyzingDevice, setIsAnalyzingDevice, selectedDeviceId, setSelectedDeviceId, compareDeviceIds, setCompareDeviceIds, showComparisonView, setShowComparisonView, calcDays, setCalcDays, sharedFtRate, setSharedFtRate, plannedKwh, setPlannedKwh, onPeakShare, setOnPeakShare, activeSpike, setActiveSpike, aiAlerts, setAiAlerts, isAiScanning, setIsAiScanning, aiTick, setAiTick, claimedQuests, setClaimedQuests, handleInjectVirtualLoad, handleAiOptimization, setGlobalBudget, setUnitRate, setDeviceAnalysis, setWeatherInput, setWeatherLocation, fetchWeatherForAlert, addDevice, updateDeviceConfig, containerVariants, itemVariants, CATEGORIES, renderWidgetWrapper, AnimatedCounter, calcMode, setCalcMode, calcTab, setCalcTab, statsFrame, setStatsFrame, statsTab, setStatsTab, notiTab, setNotiTab, manualTab, setManualTab, searchTerm, setSearchTerm, activeCategory, setActiveCategory, aiMonthlySavings, handleBatchStandbyCutoff, filteredDevices, toggleCompareSelection, setLang, runAiAnomalyScan, currentAlerts, totalClaimedXp, activeQuests, handleClaimQuest, handleDragStart, handleDragOver, handleDragEnd, activeHouse, telemetryChartData, CustomTooltip, telemetryPerformanceData, pieData, COLORS } = shared;

  return (
    <>
      <div className="animate-fade-in relative">
              {/* Premium Node Control toolbar */}
<div className="w-full mb-6">
                        <div className="dashboard-card border border-slate-200 dark:border-0 overflow-hidden bg-white dark:bg-slate-900/40 backdrop-blur-md shadow-sm rounded-[2rem] hover:shadow-lg transition-all duration-300">
                          {/* Header */}
                          
                          <div className="p-5">
                            <PropertyDistributionMap lang={lang} isDarkMode={isDarkMode} />
                          </div>
                        </div>
</div>
<div className="w-full mb-6">
                        <div
                          id="tour-step-ai-switches"
                          className="dashboard-card border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm h-full flex flex-col bg-white dark:bg-slate-900/40"
                        >
                          
                          <div className="p-6 flex flex-col justify-between h-full">
                            <div className="w-full">
                              <div className="flex justify-between items-center mb-4">
                                <h6 className="font-display font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white m-0 flex items-center gap-2">
                                  <i className="fas fa-sliders-h text-emerald-500"></i>
                                  <span>
                                    {lang === "th"
                                      ? "ควบคุมโมดูล AI โครงข่าย"
                                      : "AI Grid Control Center"}
                                  </span>
                                </h6>
                                <span className="badge bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[0.7rem] font-bold p-1 px-2.5 rounded-full uppercase">
                                  Interactive Live
                                </span>
                              </div>
                              <p className="text-[0.8rem] text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                {lang === "th"
                                  ? "คลิปรับฟังข้อมูลและควบคุมสวิตช์ระบบประหยัด เพื่อคาดคำนวณและโกนยอดโหลดสูงสุดในการบริหารงบล่วงหน้าแบบเรียลไทม์"
                                  : "Toggle active subgrid features inside the simulator core to adjust real-time peak-shaving forecasts."}
                              </p>

                              {/* Optimization Settings Switch List */}
                              <div className="space-y-3.5 mb-6">
                                {/* Switch 1 */}
                                <div
                                  onClick={() => setAiSmartAc(!aiSmartAc)}
                                  className={`p-3 rounded-2xl border transition-all active:scale-[0.98] active:opacity-90 cursor-pointer flex items-center justify-between ${
                                    aiSmartAc
                                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-colors ${
                                        aiSmartAc
                                          ? "bg-emerald-500 text-white shadow-sm"
                                          : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                                      }`}
                                    >
                                      <i className="fas fa-temperature-low animate-pulse"></i>
                                    </div>
                                    <div>
                                      <div
                                        className={`text-[0.8rem] font-black ${aiSmartAc ? "text-emerald-800 dark:text-emerald-200" : "text-slate-700 dark:text-slate-300"}`}
                                      >
                                        {lang === "th"
                                          ? "1. ปรับอุณหภูมิ AC แบบประหยัด"
                                          : "Smart AC Peak Regulation"}
                                      </div>
                                      <div className="text-[8.5px] text-slate-500 dark:text-slate-400 opacity-80 font-bold">
                                        {lang === "th"
                                          ? "ประหยัดเฉลี่ย 6.5% - คุมโหมดบ่ายหลัก"
                                          : "Est. Saving 6.5% - thermal bounds"}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${aiSmartAc ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"} flex items-center`}
                                  >
                                    <div
                                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${aiSmartAc ? "translate-x-[16px]" : "translate-x-0"}`}
                                    />
                                  </div>
                                </div>

                                {/* Switch 2 */}
                                <div
                                  onClick={() => setAiEcoStandby(!aiEcoStandby)}
                                  className={`p-3 rounded-2xl border transition-all active:scale-[0.98] active:opacity-90 cursor-pointer flex items-center justify-between ${
                                    aiEcoStandby
                                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-colors ${
                                        aiEcoStandby
                                          ? "bg-emerald-500 text-white shadow-sm"
                                          : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                                      }`}
                                    >
                                      <i className="fas fa-power-off"></i>
                                    </div>
                                    <div>
                                      <div
                                        className={`text-[0.8rem] font-black ${aiEcoStandby ? "text-emerald-800 dark:text-emerald-200" : "text-slate-700 dark:text-slate-300"}`}
                                      >
                                        {lang === "th"
                                          ? "2. ระงับไฟรั่วสแตนด์บาย"
                                          : "Eco Standby Autocut"}
                                      </div>
                                      <div className="text-[8.5px] text-slate-500 dark:text-slate-400 opacity-80 font-bold">
                                        {lang === "th"
                                          ? "ประหยัดเฉลี่ย 4.2% - ตัดกระแสแฝงเที่ยงคืน"
                                          : "Est. Saving 4.2% - Residual leak cutoff"}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${aiEcoStandby ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"} flex items-center`}
                                  >
                                    <div
                                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${aiEcoStandby ? "translate-x-[16px]" : "translate-x-0"}`}
                                    />
                                  </div>
                                </div>

                                {/* Switch 3 */}
                                <div
                                  onClick={() => setAiLoadShift(!aiLoadShift)}
                                  className={`p-3 rounded-2xl border transition-all active:scale-[0.98] active:opacity-90 cursor-pointer flex items-center justify-between ${
                                    aiLoadShift
                                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-colors ${
                                        aiLoadShift
                                          ? "bg-emerald-500 text-white shadow-sm"
                                          : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                                      }`}
                                    >
                                      <i className="fas fa-history"></i>
                                    </div>
                                    <div>
                                      <div
                                        className={`text-[0.8rem] font-black ${aiLoadShift ? "text-emerald-800 dark:text-emerald-200" : "text-slate-700 dark:text-slate-300"}`}
                                      >
                                        {lang === "th"
                                          ? "3. อัลกอริทึมสลับเวลา TOU"
                                          : "Smart TOU Load Shifter"}
                                      </div>
                                      <div className="text-[8.5px] text-slate-500 dark:text-slate-400 opacity-80 font-bold">
                                        {lang === "th"
                                          ? "ประหยัดเฉลี่ย 8.3% - เลื่อนยอดจ่ายพ้น On-Peak"
                                          : "Est. Saving 8.3% - Peak hour shaving"}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${aiLoadShift ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"} flex items-center`}
                                  >
                                    <div
                                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${aiLoadShift ? "translate-x-[16px]" : "translate-x-0"}`}
                                    />
                                  </div>
                                </div>

                                {/* Switch 4 */}
                                <div
                                  onClick={() => setAiPfTuning(!aiPfTuning)}
                                  className={`p-3 rounded-2xl border transition-all active:scale-[0.98] active:opacity-90 cursor-pointer flex items-center justify-between ${
                                    aiPfTuning
                                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-colors ${
                                        aiPfTuning
                                          ? "bg-emerald-500 text-white shadow-sm"
                                          : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                                      }`}
                                    >
                                      <i className="fas fa-microchip"></i>
                                    </div>
                                    <div>
                                      <div
                                        className={`text-[0.8rem] font-black ${aiPfTuning ? "text-emerald-800 dark:text-emerald-200" : "text-slate-700 dark:text-slate-300"}`}
                                      >
                                        {lang === "th"
                                          ? "4. ตัวจูน Power Factor โครงข่าย"
                                          : "Smart Power Factor Tuning"}
                                      </div>
                                      <div className="text-[8.5px] text-slate-500 dark:text-slate-400 opacity-80 font-bold">
                                        {lang === "th"
                                          ? "ประหยัดเพิ่ม 3.0% - ประยุกต์แคปฟิลเตอร์"
                                          : "Est. Saving 3.0% - Active PF filter"}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${aiPfTuning ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"} flex items-center`}
                                  >
                                    <div
                                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${aiPfTuning ? "translate-x-[16px]" : "translate-x-0"}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Impact Telemetry Card */}
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-auto w-full">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl text-center md:text-start flex flex-col justify-between shadow-sm">
                                  <span className="text-[0.7rem] text-slate-500 dark:text-slate-400 font-bold block mb-1 uppercase tracking-wider">
                                    {lang === "th"
                                      ? "จำลองมูลค่าประหยัด"
                                      : "Est. Savings Amount"}
                                  </span>
                                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                                    ฿{aiMonthlySavings.amount.toFixed(0)}
                                  </span>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl text-center md:text-start flex flex-col justify-between shadow-sm">
                                  <span className="text-[0.7rem] text-slate-500 dark:text-slate-400 font-bold block mb-1 uppercase tracking-wider">
                                    {lang === "th"
                                      ? "ยอดจ่ายจำลองสุทธิ"
                                      : "Optimized Estimate"}
                                  </span>
                                  <span className="text-sm font-black text-slate-900 dark:text-white font-mono">
                                    ฿{aiMonthlySavings.finalCost.toFixed(0)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="dashboard-card border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h6 className="font-extrabold text-sm mb-1 text-slate-850 dark:text-slate-100">
                      {lang === "th"
                        ? "⚡ เครื่องยิงประจุจำลองโหลดด่วน"
                        : "⚡ Virtual Load Stress Injector"}
                    </h6>
                    <p className="text-[0.75rem] text-slate-500 dark:text-slate-400 mb-0">
                      {lang === "th"
                        ? "จำลองเครื่องใช้กำลังวัตต์สูงเข้าระบบเพื่อทดสอบพีคเทเลเมทรี"
                        : "Inject transient multi-kilowatt load into the sandbox to test pricing peaks."}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleInjectVirtualLoad(1500)}
                      className="btn btn-xs btn-outline-warning text-[0.75rem] uppercase font-bold py-2 px-3 rounded-xl border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-white transition-all"
                    >
                      + 1.5kW
                    </button>
                    <button
                      onClick={() => handleInjectVirtualLoad(3000)}
                      className="btn btn-xs btn-outline-danger text-[0.75rem] uppercase font-bold py-2 px-3 rounded-xl border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                    >
                      + 3.0kW
                    </button>
                  </div>
                </div>
                <div className="dashboard-card border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h6 className="font-extrabold text-sm mb-1 text-slate-850 dark:text-slate-100">
                      {lang === "th"
                        ? "🔌 บล็อกสแตนด์บายตกค้างอัจฉริยะ"
                        : "🔌 Eco Standby Bulk Disconnect"}
                    </h6>
                    <p className="text-[0.75rem] text-slate-500 dark:text-slate-400 mb-0">
                      {lang === "th"
                        ? "ปิดการใช้ขั้วแสตนด์บายทั้งหมดเพื่อตัดปัญหากระแสรั่ว"
                        : "Disconnect standby items in one go to instantly reduce idle leakage."}
                    </p>
                  </div>
                  <button
                    onClick={handleBatchStandbyCutoff}
                    className="btn lg:whitespace-nowrap rounded-xl px-4 py-2 text-xs font-black uppercase text-white hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                    style={{
                      backgroundColor: "#10b981",
                      border: 0,
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-unplug"></i>
                    <span>{lang === "th" ? "ตัดไฟด่วน" : "Disconnect"}</span>
                  </button>
                </div>
              </div>

              <div
                id="tour-step-devices-controls"
                className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 mb-6 animate-slide-up transition-all duration-500"
                style={{ animationDelay: "50ms" }}
              >
                <div className="flex gap-2 items-center flex-grow max-w-xl">
                  <div className="relative flex-grow">
                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      className="form-control border-0 bg-slate-50 dark:bg-slate-800/60 rounded-2xl ps-10 py-3 text-sm font-bold"
                      placeholder={t("search")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="form-select border-0 bg-slate-50 dark:bg-slate-800/60 rounded-2xl py-3 text-xs font-bold w-32"
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                  >
                    <option value="All">{t("filter")}</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  {compareDeviceIds.length > 0 && (
                    <button
                      className="btn btn-primary rounded-2xl px-4 py-3 font-bold text-xs uppercase shadow-lg shadow-primary/20 flex items-center gap-2"
                      onClick={() => setShowComparisonView(true)}
                    >
                      <i className="fas fa-balance-scale"></i>
                      {t("node_compare_btn")} ({compareDeviceIds.length})
                    </button>
)}
<button
                    className="btn btn-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors dark:bg-slate-800  dark:border-slate-700 border-2 border-slate-100 dark:border-slate-800/50 rounded-2xl px-6 py-3 font-bold text-xs uppercase text-primary"
                    onClick={addDevice}
                  >
                    <i className="fas fa-plus me-2"></i> Node
                  </button>
                </div>
              </div>

              <div
                id="tour-step-devices-grid"
                className="row g-3 g-md-4 transition-all duration-500"
              >
                {filteredDevices.length === 0 ? (
                  <div className="col-12">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="dashboard-card border-2 border-dashed border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/25 p-12 text-center rounded-[2.5rem] flex flex-col items-center justify-center space-y-5"
                    >
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200/40 dark:border-slate-700/40">
                        <ZapOff className="w-7 h-7" />
                      </div>
                      <div className="space-y-1.5 max-w-sm">
                        <h5 className="font-display font-black text-slate-800 dark:text-slate-100 text-base md:text-lg mb-1">
                          {lang === "th" ? "ไม่พบอุปกรณ์เชื่อมต่อ" : "No Active Grid Nodes"}
                        </h5>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                          {lang === "th" 
                            ? "คุณยังไม่ได้เพิ่มโหนดหรืออุปกรณ์ในหมวดหมู่นี้ หรือระบบค้นหาไม่พบข้อมูลที่ตรงกัน แตะปุ่มด้านล่างเพื่อเชื่อมต่ออุปกรณ์ใหม่"
                            : "No virtual microgrid nodes exist in this segment or search criteria. Connect your high-load appliances to initiate real-time logging."}
                        </p>
                      </div>
                      <button
                        className="btn btn-primary px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                        onClick={addDevice}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        {lang === "th" ? "เชื่อมต่ออุปกรณ์ใหม่" : "Connect New Device"}
                      </button>
                    </motion.div>
                  </div>
                ) : (
                  filteredDevices.map((dev, i) => {
                  const isSelected = compareDeviceIds.includes(dev.id);
                  const dailyKwh =
                    dev.status === "off"
                      ? 0
                      : dev.status === "standby"
                        ? (Math.max(2, dev.watt * 0.02) / 1000) * 24
                        : (dev.watt / 1000) * dev.hours;
                  const devCost = dailyKwh * calcDays * unitRate;
                  return (
                    <div
                      key={dev.id}
                      className="col-12 col-md-6 col-lg-4 animate-slide-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div
                        onClick={() => setSelectedDeviceId(dev.id)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedDeviceId(dev.id);
                          }
                        }}
                        className={`dashboard-card border border-slate-100 dark:border-slate-800/80 p-5 cursor-pointer hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-300 group relative overflow-hidden ${isSelected ? "ring-2 ring-primary border-primary dark:border-primary" : ""}`}
                      >
                        <div className="absolute top-4 left-4 z-10">
                          <button
                            onClick={(e) => toggleCompareSelection(e, dev.id)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${isSelected ? "bg-primary text-white shadow-md" : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-primary hover:bg-primary hover:text-white"}`}
                          >
                            <i
                              className={`fas ${isSelected ? "fa-check" : "fa-plus"} text-[0.75rem]`}
                            ></i>
                          </button>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className={`badge-premium ${
                            dev.status === "active" 
                              ? "badge-premium-success" 
                              : dev.status === "standby" 
                                ? "badge-premium-warning" 
                                : "badge-premium-gray"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              dev.status === "active" 
                                ? "bg-emerald-500 animate-pulse" 
                                : dev.status === "standby" 
                                  ? "bg-amber-500" 
                                  : "bg-gray-400"
                            }`}></span>
                            {dev.status}
                          </span>
                        </div>
                        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 text-primary border border-slate-100 dark:border-slate-700/50 rounded-2xl w-fit mb-4 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                          <i
                            className={`fas ${
                              dev.category === "Cooling" 
                                ? "fa-snowflake" 
                                : dev.category === "Entertainment" 
                                  ? "fa-tv" 
                                  : dev.category === "Kitchen" 
                                    ? "fa-blender" 
                                    : "fa-plug"
                            } text-base`}
                          ></i>
                        </div>
                        <h6 className="font-bold font-display text-base mb-1 text-slate-900 dark:text-white">{dev.name}</h6>
                        <p className="text-[0.7rem] uppercase tracking-widest font-extrabold text-slate-400 dark:text-slate-500 mb-4">
                          {dev.category}
                        </p>
                        <div className="flex justify-between items-end border-t border-slate-100 dark:border-slate-800/50 pt-4 mt-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
                              {lang === "th" ? "ค่าไฟประหยัดสะสม" : "EST. COST"}
                            </div>
                            <div className="font-mono font-black text-lg text-emerald-500 dark:text-emerald-400">
                              ฿{devCost.toFixed(0)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
                              {lang === "th" ? "กำลังไฟฟ้า" : "WATTAGE"}
                            </div>
                            <div className="font-mono font-bold text-sm text-slate-700 dark:text-slate-300">
                              {dev.watt}W
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }))}
              </div>
            </div>

    </>
  );
}
