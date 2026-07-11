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

export default function NotiTab({ shared }: { shared: any }) {
  const { lang, isDarkMode, onToggleTheme, onLogout, multiDevices, setMultiDevices, analytics, t, confettiTrigger, setConfettiTrigger, currentPage, setCurrentPage, sidebarAvatar, setSidebarAvatar, sidebarCustomLogoUrl, setSidebarCustomLogoUrl, currentBgColor, contrastAnalysis, severeWeatherAlert, weatherData, isWeatherLoading, weatherLocation, weatherError, weatherInput, isMobileMenuOpen, setIsMobileMenuOpen, isTourActive, setIsTourActive, startImmediateTour, setStartImmediateTour, aiAutopilotCapping, setAiAutopilotCapping, ecoStreak, setEcoStreak, chatMessages, setChatMessages, chatInput, setChatInput, isSendingChat, setIsSendingChat, isChatOpen, setIsChatOpen, activeFaqCategory, setActiveFaqCategory, removeDevice, generatePDF, handleMoveWidget, widgetOrder, setWidgetOrder, draggedIndex, setDraggedIndex, isGeneratingPDF, setIsGeneratingPDF, dailySavingsData, performanceChartData, aiOptimizationMetrics, settlementLogs, aiSmartAc, setAiSmartAc, aiEcoStandby, setAiEcoStandby, aiPfTuning, setAiPfTuning, aiLoadShift, setAiLoadShift, perfRange, setPerfRange, globalBudget, unitRate, telemetryPerfRange, setTelemetryPerfRange, deviceSpecificChartData, compareDevices, aiOptimizationChartData, deviceAnalysis, isAnalyzingDevice, setIsAnalyzingDevice, selectedDeviceId, setSelectedDeviceId, compareDeviceIds, setCompareDeviceIds, showComparisonView, setShowComparisonView, calcDays, setCalcDays, sharedFtRate, setSharedFtRate, plannedKwh, setPlannedKwh, onPeakShare, setOnPeakShare, activeSpike, setActiveSpike, aiAlerts, setAiAlerts, isAiScanning, setIsAiScanning, aiTick, setAiTick, claimedQuests, setClaimedQuests, handleInjectVirtualLoad, handleAiOptimization, setGlobalBudget, setUnitRate, setDeviceAnalysis, setWeatherInput, setWeatherLocation, fetchWeatherForAlert, addDevice, updateDeviceConfig, containerVariants, itemVariants, CATEGORIES, renderWidgetWrapper, AnimatedCounter, calcMode, setCalcMode, calcTab, setCalcTab, statsFrame, setStatsFrame, statsTab, setStatsTab, notiTab, setNotiTab, manualTab, setManualTab, searchTerm, setSearchTerm, activeCategory, setActiveCategory, aiMonthlySavings, handleBatchStandbyCutoff, filteredDevices, toggleCompareSelection, setLang, runAiAnomalyScan, currentAlerts, totalClaimedXp, activeQuests, handleClaimQuest, handleDragStart, handleDragOver, handleDragEnd, activeHouse, telemetryChartData, CustomTooltip, telemetryPerformanceData, pieData, COLORS } = shared;

  return (
    <>
      <div className="space-y-4 animate-fade-in">
        <div
          id="tour-step-noti-header"
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 transition-all duration-500"
        >
          <h4 className="font-display font-bold text-2xl">
            {t("alert_log_title")}
          </h4>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              disabled={isAiScanning}
              onClick={runAiAnomalyScan}
              className={`btn flex-grow sm:flex-none rounded-xl font-bold text-[0.75rem] uppercase tracking-widest flex items-center justify-center gap-2 ${isAiScanning ? "btn-light" : "btn-primary shadow-lg shadow-primary/20"}`}
            >
              {isAiScanning ? (
                <>
                  <i className="fas fa-circle-notch animate-spin"></i>{" "}
                  {t("alert_scanning")}
                </>
              ) : (
                <>
                  <i className="fas fa-brain"></i>{" "}
                  {t("alert_ai_scan")}
                </>
              )}
            </button>
            <button
              className="btn btn-outline-primary border-0 font-bold text-[0.75rem] uppercase tracking-widest"
              onClick={() => setAiAlerts([])}
            >
              {t("alert_clear")}
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {currentAlerts.length === 0 ? (
            <div className="text-center p-10 bg-slate-50 dark:bg-slate-800/60 rounded-[30px] border border-transparent">
              <i className="fas fa-check-circle text-emerald-500 text-4xl mb-4"></i>
              <h6 className="font-bold text-lg">
                {lang === "th"
                  ? "ระบบทำงานปกติ"
                  : "System Operating Normally"}
              </h6>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-0">
                {lang === "th"
                  ? "ยังไม่มีการแจ้งเตือนปัญหาการใช้ไฟในขณะนี้"
                  : "No spikes or thermal anomalies detected in the sandbox nodes."}
              </p>
            </div>
          ) : (
            <>
              {currentAlerts.map((n: any, i: number) => (
                <div
                  key={i}
                  className={`dashboard-card border-start border-[6px] border-${n.c} p-5 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6 animate-slide-up shadow-sm hover:translate-x-2 transition-transform cursor-pointer relative overflow-hidden bg-white text-slate-900 dark:text-slate-100`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {n.isAi && (
                    <div className="absolute top-0 right-0 p-2 flex gap-1.5">
                      {n.aiSource === "gemini" ? (
                        <span className="badge bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[0.62rem] font-bold uppercase tracking-wider border border-emerald-500/20 px-2 py-0.5 rounded">
                          <i className="fas fa-brain me-1 animate-pulse text-emerald-500"></i> Gemini Core
                        </span>
                      ) : (
                        <span className="badge bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[0.62rem] font-bold uppercase tracking-wider border border-amber-500/20 px-2 py-0.5 rounded">
                          <i className="fas fa-tools me-1 text-amber-500"></i> Simulated </span>
                      )}
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-3xl bg-${n.c}-subtle text-${n.c} w-fit h-fit shadow-md`}
                  >
                    <i className={`fas ${n.i} text-xl`}></i>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h6 className="font-bold mb-0 text-base md:text-lg tracking-tight text-slate-900 dark:text-slate-100">
                        {n.t}
                      </h6>
                      <span className="text-[0.75rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[0.8rem] md:text-xs leading-relaxed mb-0">
                      {n.d}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}