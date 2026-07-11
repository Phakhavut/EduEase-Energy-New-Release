import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, ComposedChart} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Activity, ShieldAlert, Server, Droplet, Fan, Flame, Wind, Snowflake, Coffee, Tv, Thermometer, Wifi, Smartphone, Cpu, Monitor, Battery, AlertTriangle, Sliders, Clock, TrendingDown, Book, Settings, DollarSign, Calendar, Info, Search, Power, ZapOff
, Shield, TrendingUp, Lightbulb, Award, Coins } from "lucide-react";
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

export default function CalculatorTab({ shared }: { shared: any }) {
  const { lang, isDarkMode, onToggleTheme, onLogout, multiDevices, setMultiDevices, analytics, t, confettiTrigger, setConfettiTrigger, currentPage, setCurrentPage, sidebarAvatar, setSidebarAvatar, sidebarCustomLogoUrl, setSidebarCustomLogoUrl, currentBgColor, contrastAnalysis, severeWeatherAlert, weatherData, isWeatherLoading, weatherLocation, weatherError, weatherInput, isMobileMenuOpen, setIsMobileMenuOpen, isTourActive, setIsTourActive, startImmediateTour, setStartImmediateTour, aiAutopilotCapping, setAiAutopilotCapping, ecoStreak, setEcoStreak, chatMessages, setChatMessages, chatInput, setChatInput, isSendingChat, setIsSendingChat, isChatOpen, setIsChatOpen, activeFaqCategory, setActiveFaqCategory, removeDevice, generatePDF, handleMoveWidget, widgetOrder, setWidgetOrder, draggedIndex, setDraggedIndex, isGeneratingPDF, setIsGeneratingPDF, dailySavingsData, performanceChartData, aiOptimizationMetrics, settlementLogs, aiSmartAc, setAiSmartAc, aiEcoStandby, setAiEcoStandby, aiPfTuning, setAiPfTuning, aiLoadShift, setAiLoadShift, perfRange, setPerfRange, globalBudget, unitRate, telemetryPerfRange, setTelemetryPerfRange, deviceSpecificChartData, compareDevices, aiOptimizationChartData, deviceAnalysis, isAnalyzingDevice, setIsAnalyzingDevice, selectedDeviceId, setSelectedDeviceId, compareDeviceIds, setCompareDeviceIds, showComparisonView, setShowComparisonView, calcDays, setCalcDays, sharedFtRate, setSharedFtRate, plannedKwh, setPlannedKwh, onPeakShare, setOnPeakShare, activeSpike, setActiveSpike, aiAlerts, setAiAlerts, isAiScanning, setIsAiScanning, aiTick, setAiTick, claimedQuests, setClaimedQuests, handleInjectVirtualLoad, handleAiOptimization, setGlobalBudget, setUnitRate, setDeviceAnalysis, setWeatherInput, setWeatherLocation, fetchWeatherForAlert, addDevice, updateDeviceConfig, containerVariants, itemVariants, CATEGORIES, renderWidgetWrapper, AnimatedCounter, calcMode, setCalcMode, calcTab, setCalcTab, statsFrame, setStatsFrame, statsTab, setStatsTab, notiTab, setNotiTab, manualTab, setManualTab, searchTerm, setSearchTerm, activeCategory, setActiveCategory, aiMonthlySavings, handleBatchStandbyCutoff, filteredDevices, toggleCompareSelection, setLang, runAiAnomalyScan, currentAlerts, totalClaimedXp, activeQuests, handleClaimQuest, handleDragStart, handleDragOver, handleDragEnd, activeHouse, telemetryChartData, CustomTooltip, telemetryPerformanceData, pieData, COLORS } = shared;

  return (
    <>
      <div id="tour-step-calc-rates" className="animate-fade-in tech-grid p-4 md:p-6 rounded-[30px] md:rounded-[40px]">
              
              {/* Sub Navigation Tabs */}
              <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <button
                  type="button"
                  className={`text-[0.75rem] md:text-sm font-black uppercase tracking-wider pb-2 transition-all border-0 bg-transparent cursor-pointer flex items-center gap-1.5 ${calcTab === "detailed" ? "text-primary dark:text-sky-400 border-b-2 border-primary dark:border-sky-400 font-bold" : "text-slate-500 dark:text-slate-400 dark:opacity-100 opacity-50"}`}
                  onClick={() => setCalcTab("detailed")}
                >
                  <Sliders className="w-4 h-4 text-emerald-500" />
                  <span>{lang === "th" ? "จำลองเครื่องใช้ไฟฟ้า & บิล" : "Appliance Sim & Billing"}</span>
                </button>
                <button
                  type="button"
                  className={`text-[0.75rem] md:text-sm font-black uppercase tracking-wider pb-2 transition-all border-0 bg-transparent cursor-pointer flex items-center gap-1.5 ${calcTab === "tariff" ? "text-primary dark:text-sky-400 border-b-2 border-primary dark:border-sky-400 font-bold" : "text-slate-500 dark:text-slate-400 dark:opacity-100 opacity-50"}`}
                  onClick={() => setCalcTab("tariff")}
                >
                  <Clock className="w-4 h-4 text-sky-500" />
                  <span>{lang === "th" ? "คู่มือระบบ TOU" : "TOU Tariff Guide"}</span>
                </button>
                <button
                  type="button"
                  className={`text-[0.75rem] md:text-sm font-black uppercase tracking-wider pb-2 transition-all border-0 bg-transparent cursor-pointer flex items-center gap-1.5 ${calcTab === "budget" ? "text-primary dark:text-sky-400 border-b-2 border-primary dark:border-sky-400 font-bold" : "text-slate-500 dark:text-slate-400 dark:opacity-100 opacity-50"}`}
                  onClick={() => setCalcTab("budget")}
                >
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span>{lang === "th" ? "คุมงบประมาณพลังงาน" : "Budget Optimization"}</span>
                </button>
              </div>

              {calcTab === "detailed" && (
                <div className="row g-4 md:g-5">
                  <div className="col-12">
                    <ConsolidatedCalculator 
                      lang={lang}
                      isDarkMode={isDarkMode}
                      onTokensEarned={(amount) => {
                        try {
                          const cur = parseInt(localStorage.getItem('eudease_grid_tokens') || '300', 10);
                          localStorage.setItem('eudease_grid_tokens', String(cur + amount));
                          window.dispatchEvent(new Event('storage'));
                        } catch {}
                        setConfettiTrigger((t) => t + 1);
                      }}
                      sharedFtRate={sharedFtRate}
                      setSharedFtRate={setSharedFtRate}
                      calcDays={calcDays}
                      setCalcDays={setCalcDays}
                      globalBudget={globalBudget}
                      setGlobalBudget={setGlobalBudget}
                      plannedKwh={plannedKwh}
                      setPlannedKwh={setPlannedKwh}
                    />
                  </div>
                </div>


              )}
              {calcTab === "tariff" && (
                <div className="animate-fade-in flex flex-col gap-6">
                  {/* Header Intro */}
                  <div className="dashboard-card p-6 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-[2rem] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3.5 rounded-2xl bg-sky-500/10 text-sky-500 shrink-0">
                        <Clock className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-base font-black font-display text-slate-800 dark:text-white flex items-center gap-2">
                          <span>{t("tou_title")}</span>
                          <span className="text-[10px] uppercase font-mono bg-sky-500/15 text-sky-600 dark:text-sky-400 px-2.5 py-0.5 rounded-full font-black">
                            {lang === "th" ? "อัตราประเภท 1.2" : "Tariff Type 1.2"}
                          </span>
                        </h3>
                        <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                          {t("tou_desc")}
                        </p>
                      </div>
                    </div>
                    
                    {/* Fast info box */}
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-center font-bold min-w-[160px] self-stretch md:self-auto flex flex-col justify-center">
                      <span className="text-[10px] uppercase tracking-wider">{lang === "th" ? "ส่วนประหยัดเฉลี่ย" : "Average TOU Savings"}</span>
                      <span className="text-2xl font-mono font-black mt-1">~30% - 45%</span>
                    </div>
                  </div>

                  {/* TOU Tariff Timeline Schedule Visualizer */}
                  <div className="dashboard-card p-6 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-[2rem] shadow-sm flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-sky-500" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">
                        {lang === "th" ? "ตารางเวลาและอัตราระบบค่าไฟ TOU ประเทศไทย" : "Thailand TOU Pricing & Time Slots"}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Weekdays Slot Bar */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-700 dark:text-slate-200">📅 {lang === "th" ? "วันธรรมดา (จันทร์ - ศุกร์)" : "Weekdays (Mon - Fri)"}</span>
                          <span className="text-slate-500 dark:text-slate-400 dark:opacity-100 opacity-60">24 {lang === "th" ? "ชั่วโมง" : "Hours"}</span>
                        </div>
                        
                        <div className="relative h-12 w-full rounded-2xl overflow-hidden flex font-bold text-[9px] text-white">
                          {/* 00:00 - 09:00 Off-Peak */}
                          <div className="bg-emerald-500 h-full flex-grow hover:opacity-90 transition-opacity flex flex-col justify-center items-center text-center px-1" title="Off-Peak: 22.00 - 09.00">
                            <span>00:00 - 09:00</span>
                            <span className="text-[8px] opacity-90">{lang === "th" ? "Off-Peak" : "Off-Peak"}</span>
                            <span className="text-[8px] font-mono">฿2.63</span>
                          </div>
                          {/* 09:00 - 22:00 On-Peak */}
                          <div className="bg-rose-500 h-full w-[54%] hover:opacity-90 transition-opacity flex flex-col justify-center items-center text-center px-1" title="On-Peak: 09.00 - 22.00">
                            <span>09:00 - 22:00</span>
                            <span className="text-[8px] opacity-90">{lang === "th" ? "On-Peak" : "On-Peak"}</span>
                            <span className="text-[8px] font-mono">฿5.79</span>
                          </div>
                          {/* 22:00 - 24:00 Off-Peak */}
                          <div className="bg-emerald-500 h-full flex-grow hover:opacity-90 transition-opacity flex flex-col justify-center items-center text-center px-1" title="Off-Peak: 22.00 - 09.00">
                            <span>22:00 - 24:00</span>
                            <span className="text-[8px] opacity-90">{lang === "th" ? "Off-Peak" : "Off-Peak"}</span>
                            <span className="text-[8px] font-mono">฿2.63</span>
                          </div>
                        </div>
                      </div>

                      {/* Weekends & Holidays Slot Bar */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-700 dark:text-slate-200">🎉 {lang === "th" ? "วันเสาร์ - อาทิตย์ และวันหยุดราชการ" : "Weekends & Public Holidays"}</span>
                          <span className="text-emerald-500 font-mono">Off-Peak {lang === "th" ? "ทั้งวัน!" : "All Day!"}</span>
                        </div>
                        
                        <div className="relative h-12 w-full rounded-2xl overflow-hidden flex font-bold text-[9px] text-white">
                          <div className="bg-emerald-500 w-full h-full hover:opacity-90 transition-opacity flex flex-col justify-center items-center text-center" title="Off-Peak: ตลอด 24 ชั่วโมง">
                            <span className="text-xs">00:00 - 24:00 (ตลอดทั้งวัน)</span>
                            <span className="text-[8px] opacity-90">{lang === "th" ? "นอกช่วงเร่งด่วนราคาพิเศษ" : "All-Day Low Rate Off-Peak"}</span>
                            <span className="text-xs font-mono font-black">฿2.6369 / {lang === "th" ? "หน่วย" : "kWh"}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Peak/Off-peak details cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="p-5 rounded-[2rem] bg-rose-500/5 border border-rose-500/10 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <h5 className="text-xs font-black uppercase text-rose-500">{t("tou_peak")}</h5>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {t("tou_peak_desc")}
                        </p>
                        <div className="mt-2 text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                          {lang === "th" ? "อัตรา On-Peak: ~5.7982 บาท/หน่วย" : "On-Peak Rate: ~5.7982 Baht/kWh"}
                        </div>
                      </div>

                      <div className="p-5 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <h5 className="text-xs font-black uppercase text-emerald-500">{t("tou_off")}</h5>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {t("tou_off_desc")}
                        </p>
                        <div className="mt-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {lang === "th" ? "อัตรา Off-Peak: ~2.6369 บาท/หน่วย" : "Off-Peak Rate: ~2.6369 Baht/kWh"}
                        </div>
                        )
                      </div>
                    </div>
                  </div>

                  {/* TOU vs Progressive Tariff Structure comparison table */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Progressive explanation */}
                    <div className="dashboard-card p-6 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-[2rem] shadow-sm flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-amber-500">
                        <TrendingUp className="w-5 h-5" />
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">
                          {t("progressive_title")}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {t("progressive_desc")}
                      </p>

                      <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs font-mono">
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                          <span>{lang === "th" ? "15 หน่วยแรก (ประเภท 1.1.2)" : "First 15 Units (Type 1.1.2)"}</span>
                          <span className="font-bold">฿3.2484 / {lang === "th" ? "หน่วย" : "kWh"}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                          <span>{lang === "th" ? "หน่วยที่ 16 - 150" : "Units 16 - 150"}</span>
                          <span className="font-bold">฿3.2484 / {lang === "th" ? "หน่วย" : "kWh"}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                          <span>{lang === "th" ? "หน่วยที่ 151 - 400" : "Units 151 - 400"}</span>
                          <span className="font-bold">฿4.2218 / {lang === "th" ? "หน่วย" : "kWh"}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-800 dark:text-white font-bold">
                          <span>{lang === "th" ? "หน่วยที่ 401 ขึ้นไป (แพงสุด)" : "Over 400 Units (Maximum Tier)"}</span>
                          <span className="font-bold text-rose-500">฿4.4217 / {lang === "th" ? "หน่วย" : "kWh"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Smart TOU Actions and Optimization Tips */}
                    <div className="dashboard-card p-6 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-[2rem] shadow-sm flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <Lightbulb className="w-5 h-5 animate-bounce" />
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">
                          {lang === "th" ? "เทคนิคประหยัดเงินด้วย TOU" : "TOU Shift Load Strategies"}
                        </h4>
                      </div>

                      <div className="flex flex-col gap-3.5 mt-1 text-xs">
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 font-bold font-mono">1</div>
                          <div>
                            <span className="font-bold block text-slate-700 dark:text-slate-100">{lang === "th" ? "ชาร์จรถไฟฟ้า (EV) หลัง 4 ทุ่ม" : "Charge EV Cars After 10:00 PM"}</span>
                            <span className="text-[11px] text-slate-400 mt-0.5 block leading-relaxed">{lang === "th" ? "ประหยัดขึ้นทันทีเกิน 50% ต่อหน่วย แนะนำให้ตั้ง Timer ชาร์จช่วง Off-Peak อัตโนมัติ" : "Save over 50% per kWh. Set an automatic timer to kick in during cheap night slots."}</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 font-bold font-mono">2</div>
                          <div>
                            <span className="font-bold block text-slate-700 dark:text-slate-100">{lang === "th" ? "ย้ายกลุ่มเครื่องซักผ้า-อบผ้าไปซักวันหยุด" : "Shift Washers & Dryers to Weekends"}</span>
                            <span className="text-[11px] text-slate-400 mt-0.5 block leading-relaxed">{lang === "th" ? "อุปกรณ์พลังงานสูงอย่างเครื่องอบผ้า ควรหลีกเลี่ยงการเปิดใช้งานในวันธรรมดากลางวัน ให้ทำในวันหยุดซึ่งเป็น Off-Peak ทั้งวัน" : "Heavy thermal devices like clothes dryers are perfect to run on Saturday or Sunday for all-day cheap rates."}</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 font-bold font-mono">3</div>
                          <div>
                            <span className="font-bold block text-slate-700 dark:text-slate-100">{lang === "th" ? "ตั้งแอร์เปิดโหมด Eco ร่วมกับพัดลม" : "Optimize AC Scheduling"}</span>
                            <span className="text-[11px] text-slate-400 mt-0.5 block leading-relaxed">{lang === "th" ? "ช่วง On-Peak บ่ายร้อน แนะนำเปิดแอร์อุณหภูมิ 26°C คู่กับพัดลมสวิง จะช่วยประหยัดโหลดแอร์ได้มหาศาล" : "Set AC to 26°C with an oscillating fan during peak afternoons to reduce the compressor workload."}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              )}
              {calcTab === "budget" && (
                <div className="animate-fade-in flex flex-col gap-6">
                  {/* Budget Configuration Card */}
                  <div className="dashboard-card p-6 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-[2rem] shadow-sm flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6">
                    <div className="flex items-start gap-4 flex-grow">
                      <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-base font-black font-display text-slate-800 dark:text-white flex items-center gap-2">
                          <span>{t("budget_limit_title")}</span>
                        </h3>
                        <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 max-w-xl leading-relaxed">
                          {t("budget_modify")}
                        </p>
                        
                        {/* Interactive Budget slider */}
                        <div className="mt-4 flex items-center gap-4">
                          <input 
                            type="range"
                            min="500"
                            max="10000"
                            step="250"
                            value={globalBudget}
                            onChange={(e) => setGlobalBudget(parseInt(e.target.value, 10))}
                            className="w-full max-w-md accent-amber-500 bg-slate-100 dark:bg-slate-800 h-1.5 rounded cursor-pointer"
                          />
                          <input 
                            type="number"
                            min="500"
                            max="50000"
                            value={globalBudget}
                            onChange={(e) => setGlobalBudget(Math.max(500, parseInt(e.target.value, 10) || 0))}
                            className="w-24 text-xs font-mono font-bold text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Budget Health Indicator card */}
                    <div className={`p-5 rounded-[2rem] border font-black flex flex-col justify-center min-w-[200px] text-center transition-all ${
                      plannedKwh * 4 > globalBudget 
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                    }`}>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                        {lang === "th" ? "สถานะการคุมบัดเจตค่าไฟ" : "Budget Tracking Status"}
                      </span>
                      <span className="text-xl font-mono">
                        {plannedKwh * 4 > globalBudget 
                          ? (lang === "th" ? "⚠️ เสี่ยงเกินงบประมาณ" : "⚠️ High Budget Risk")
                          : (lang === "th" ? "🌿 ปลอดภัยและประหยัด" : "🌿 Within Target Range")}
                      </span>
                    </div>
                  </div>

                  {/* Budget Allocation Analysis and Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Budget Progress Meter */}
                    <div className="lg:col-span-7 dashboard-card p-6 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-[2rem] shadow-sm flex flex-col gap-6">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">
                          {lang === "th" ? "วิเคราะห์เป้าหมายและสัดส่วนงบประมาณ" : "Budget Utilization Analysis"}
                        </h4>
                      </div>

                      <div className="flex flex-col gap-4 mt-2">
                        {/* Progressive estimation comparison */}
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 dark:text-slate-400">{lang === "th" ? "งบประมาณจัดสรรสูงสุดของคุณ:" : "Your Target Allocation Limit:"}</span>
                          <span className="font-mono font-black text-slate-800 dark:text-white">฿{globalBudget.toLocaleString()}</span>
                        </div>

                        {/* Actual progress bar */}
                        <div>
                          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                            <span>{lang === "th" ? "ใช้งานจริงจากเครื่องจำลองอุปกรณ์:" : "Simulated Active Load Cost:"}</span>
                            <span className="font-mono font-bold">
                              {plannedKwh > 0 ? `~฿${Math.round(plannedKwh * 3.8).toLocaleString()}` : "฿0"}
                            </span>
                          </div>
                          <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-950 rounded-full border border-slate-150 dark:border-slate-800/80">
  
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                (plannedKwh * 3.8) > globalBudget ? "bg-rose-500" : "bg-emerald-500"
                              }`}
                              style={{ width: `${Math.min(100, ((plannedKwh * 3.8) / globalBudget) * 100)}%` }}
                            />
                          
</div>
                          <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
                            <span>0%</span>
                            <span>{Math.round(((plannedKwh * 3.8) / globalBudget) * 100)}%</span>
                            <span>100%</span>
                          </div>
                        </div>

                        {/* Remainder metrics */}
                        <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-xs">
                          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800">
                            <span className="text-slate-400 text-[10px] block">{t("budget_remainder")}</span>
                            <span className={`text-base font-mono font-black mt-1 block ${globalBudget - (plannedKwh * 3.8) < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                              ฿{(globalBudget - Math.round(plannedKwh * 3.8)).toLocaleString()}
                            </span>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800">
                            <span className="text-slate-400 text-[10px] block">{lang === "th" ? "ค่าไฟประหยัดแบบ TOU ร่วมด้วย" : "Estimated with TOU Strategy"}</span>
                            <span className="text-base font-mono font-black mt-1 text-sky-500 block">
                              +฿{Math.round(plannedKwh * 1.2).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Advisor Card */}
                    <div className="lg:col-span-5 dashboard-card p-6 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-[2rem] shadow-sm flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <Coins className="w-5 h-5 text-emerald-500" />
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">
                          {lang === "th" ? "สัดส่วนและเป้าหมายผู้คุมงบ AI" : "AI Guardian Assessment"}
                        </h4>
                      </div>

                      <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 flex-grow">
                        {plannedKwh * 3.8 > globalBudget ? (
                          <div className="space-y-3">
                            <p className="p-3 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 font-bold text-[11px]">
                              {lang === "th" 
                                ? "⚠️ ขณะนี้การจำลองการกินไฟรวม เกินกว่างบสูงสุดที่คุณวางเป้าหมาย!" 
                                : "⚠️ Your current simulated load is exceeding your target monthly budget!"}
                            </p>
                            <p>
                              {lang === "th"
                                ? "คำแนะนำ: ลองสลับไปใช้อุปกรณ์แอร์แบบ Inverter หรือปรับเวลาการซักผ้าและอบผ้าจำนวนมากไปทำในช่วงดึก (หลัง 22.00 น.) อัตราค่าไฟประเภท TOU จะถูกลงมากจนช่วยดึงคุณให้กลับเข้ามาอยู่ในกรอบงบประมาณสีเขียว"
                                : "Pro-Tip: Try shifting massive laundry loads or EV charging sessions to late night slots (after 10:00 PM). This will drastically pull your net bill back into the safe green zone."}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold text-[11px]">
                              {lang === "th" 
                                ? "🌿 ยอดเยี่ยมมาก! การคำนวณการใช้พลังงานของคุณสอดคล้องและอยู่ในงบเป้าหมายอย่างปลอดภัย" 
                                : "🌿 Excellent job! Your consumption profile fits perfectly within your budget goals."}
                            </p>
                            <p>
                              {lang === "th"
                                ? "คุณยังคงรักษาวินัยกริดได้อย่างยอดเยี่ยม เพื่อสะสมเหรียญรางวัลเพิ่มขึ้น แนะนำให้ตั้งเวลาประหยัดพลังงานเสริมสำหรับเครื่องปรับอากาศ และปิดสแตนด์บายเครื่องใช้ไฟฟ้าที่ไม่ได้ใช้งานเป็นประจำ"
                                : "You are maintaining high green-grid status. To earn more sustainability tokens, schedule deep Eco modes for home cooling and completely unplug entertainment devices when dormant."}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      }
