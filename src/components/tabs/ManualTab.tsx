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

export default function ManualTab({ shared }: { shared: any }) {
  const { lang, isDarkMode, onToggleTheme, onLogout, multiDevices, setMultiDevices, analytics, t, confettiTrigger, setConfettiTrigger, currentPage, setCurrentPage, sidebarAvatar, setSidebarAvatar, sidebarCustomLogoUrl, setSidebarCustomLogoUrl, currentBgColor, contrastAnalysis, severeWeatherAlert, weatherData, isWeatherLoading, weatherLocation, weatherError, weatherInput, isMobileMenuOpen, setIsMobileMenuOpen, isTourActive, setIsTourActive, startImmediateTour, setStartImmediateTour, aiAutopilotCapping, setAiAutopilotCapping, ecoStreak, setEcoStreak, chatMessages, setChatMessages, chatInput, setChatInput, isSendingChat, setIsSendingChat, isChatOpen, setIsChatOpen, activeFaqCategory, setActiveFaqCategory, removeDevice, generatePDF, handleMoveWidget, widgetOrder, setWidgetOrder, draggedIndex, setDraggedIndex, isGeneratingPDF, setIsGeneratingPDF, dailySavingsData, performanceChartData, aiOptimizationMetrics, settlementLogs, aiSmartAc, setAiSmartAc, aiEcoStandby, setAiEcoStandby, aiPfTuning, setAiPfTuning, aiLoadShift, setAiLoadShift, perfRange, setPerfRange, globalBudget, unitRate, telemetryPerfRange, setTelemetryPerfRange, deviceSpecificChartData, compareDevices, aiOptimizationChartData, deviceAnalysis, isAnalyzingDevice, setIsAnalyzingDevice, selectedDeviceId, setSelectedDeviceId, compareDeviceIds, setCompareDeviceIds, showComparisonView, setShowComparisonView, calcDays, setCalcDays, sharedFtRate, setSharedFtRate, plannedKwh, setPlannedKwh, onPeakShare, setOnPeakShare, activeSpike, setActiveSpike, aiAlerts, setAiAlerts, isAiScanning, setIsAiScanning, aiTick, setAiTick, claimedQuests, setClaimedQuests, handleInjectVirtualLoad, handleAiOptimization, setGlobalBudget, setUnitRate, setDeviceAnalysis, setWeatherInput, setWeatherLocation, fetchWeatherForAlert, addDevice, updateDeviceConfig, containerVariants, itemVariants, CATEGORIES, renderWidgetWrapper, AnimatedCounter, calcMode, setCalcMode, calcTab, setCalcTab, statsFrame, setStatsFrame, statsTab, setStatsTab, notiTab, setNotiTab, manualTab, setManualTab, searchTerm, setSearchTerm, activeCategory, setActiveCategory, aiMonthlySavings, handleBatchStandbyCutoff, filteredDevices, toggleCompareSelection, setLang, runAiAnomalyScan, currentAlerts, totalClaimedXp, activeQuests, handleClaimQuest, handleDragStart, handleDragOver, handleDragEnd, activeHouse, telemetryChartData, CustomTooltip, telemetryPerformanceData, pieData, COLORS } = shared;

  return (
    <>
      <div className="animate-fade-in max-w-4xl mx-auto text-slate-900 dark:text-slate-100">
              {/* Manual Page Sub-Tabs */}
              <div className="flex gap-4 mb-6 border-b border-slate-100 dark:border-slate-800/50 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <button
                  className={`text-[0.75rem] md:text-sm font-black uppercase tracking-wider pb-2 transition-all border-0 bg-transparent cursor-pointer ${manualTab === "guide" ? "text-primary dark:text-sky-400 border-b-2 border-primary dark:border-sky-400" : "text-slate-500 dark:text-slate-400 dark:opacity-100 opacity-50"}`}
                  style={{
                    borderBottom:
                      manualTab === "guide" ? "2px solid" : "none",
                  }}
                  onClick={() => setManualTab("guide")}
                >
                  <i className="fas fa-book-open mr-2"></i>
                  {lang === "th" ? "คู่มือผู้ใช้ระบบกริต" : "User Guide"}
                </button>
                <button
                  className={`text-[0.75rem] md:text-sm font-black uppercase tracking-wider pb-2 transition-all border-0 bg-transparent cursor-pointer ${manualTab === "settings" ? "text-primary dark:text-sky-400 border-b-2 border-primary dark:border-sky-400" : "text-slate-500 dark:text-slate-400 dark:opacity-100 opacity-50"}`}
                  style={{
                    borderBottom:
                      manualTab === "settings" ? "2px solid" : "none",
                  }}
                  onClick={() => setManualTab("settings")}
                >
                  <i className="fas fa-sliders-h mr-2"></i>
                  {lang === "th"
                    ? "ตั้งค่าเครือข่ายวิจัยและการแสดงผล"
                    : "Account Settings"}
                </button>
              </div>

              {manualTab === "guide" ? (
                <UserManual
                  isOpen={true}
                  isDarkMode={isDarkMode}
                  lang={lang}
                  isInline={true}
                />
              ) : (
                <div
                  className="dashboard-card border-0 p-6 md:p-10 text-center shadow-2xl rounded-[40px] md:rounded-[50px] animate-slide-up bg-white relative overflow-hidden"
                  style={{ animationDelay: "100ms" }}
                >
                  <div className="absolute top-0 right-0 p-10 opacity-5 d-none d-sm-block">
                    <i className="fas fa-cog text-[150px] animate-spin-slow"></i>
                  </div>
                  <div className="p-1 rounded-full bg-gradient-to-tr from-primary to-emerald-500 mx-auto w-24 h-24 md:w-32 md:h-32 mb-6 shadow-xl relative z-10">
                    <div className="bg-white rounded-full w-full h-full flex items-center justify-center text-primary text-3xl md:text-4xl font-display font-bold border-4 border-white">
                      NY
                    </div>
                  </div>
                  <h4 className="font-display font-bold text-2xl md:text-3xl mb-1 relative z-10">
                    Namyen Admin
                  </h4>
                  <div className="badge bg-primary-subtle text-primary px-4 py-2 rounded-full text-[0.7rem] md:text-[0.75rem] uppercase tracking-widest font-bold mb-8 md:mb-10 relative z-10">
                    {t("set_authority")}
                  </div>

                  <div className="space-y-3 text-start relative z-10">
                    {[
                      {
                        label: t("set_lang"),
                        val: lang.toUpperCase(),
                        type: "select",
                        opts: ["EN", "TH"],
                        onChange: (v: string) =>
                          setLang(v.toLowerCase() as any),
                      },
                      {
                        label: t("set_dark_mode"),
                        val: isDarkMode,
                        type: "switch",
                        onChange: onToggleTheme,
                      },
                      { label: t("set_telemetry"), val: "High", type: "info" },
                      { label: t("set_security"), val: "Active", type: "info" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="p-4 md:p-5 bg-slate-50 dark:bg-slate-800/60 rounded-3xl flex justify-between items-center transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 dark:border-slate-800/50"
                      >
                        <span className="font-bold text-xs md:text-sm tracking-tight">
                          {row.label}
                        </span>
                        {row.type === "select" ? (
                          <select
                            className="form-select border-0 bg-transparent w-auto font-bold text-primary text-xs md:text-sm p-0 focus:ring-0 focus:outline-none"
                            value={row.val as string}
                            onChange={(e) =>
                              (row.onChange as (v: string) => void)(
                                e.target.value,
                              )
                            }
                          >
                            {row.opts?.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        ) : row.type === "switch" ? (
                          <div className="form-check form-switch mb-0">
                            <input
                              className="form-check-input scale-110 md:scale-125 cursor-pointer"
                              type="checkbox"
                              checked={row.val as boolean}
                              onChange={row.onChange as any}
                            />
                          </div>
                        ) : (
                          <span className="text-emerald-500 font-bold text-[0.75rem] md:text-xs uppercase tracking-widest">
                            {row.val}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-outline-danger w-full py-3.5 md:py-4 rounded-3xl font-bold text-[0.75rem] md:text-[0.8rem] uppercase tracking-[0.2em] md:tracking-[0.3em] mt-8 md:mt-10 transition-all hover:bg-rose-500 hover:text-white shadow-lg border-rose-500/20 text-rose-500 cursor-pointer"
                    onClick={onLogout}
                  >
                    {t("set_terminate")}
                  </button>
                </div>
              )}
            </div>
    </>
  );
}
