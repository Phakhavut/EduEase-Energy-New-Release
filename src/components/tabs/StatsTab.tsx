import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, ComposedChart,
} from "recharts";
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

export default function StatsTab({ shared }: { shared: any }) {
  const { lang, isDarkMode, onToggleTheme, onLogout, multiDevices, setMultiDevices, analytics, t, confettiTrigger, setConfettiTrigger, currentPage, setCurrentPage, sidebarAvatar, setSidebarAvatar, sidebarCustomLogoUrl, setSidebarCustomLogoUrl, currentBgColor, contrastAnalysis, severeWeatherAlert, weatherData, isWeatherLoading, weatherLocation, weatherError, weatherInput, isMobileMenuOpen, setIsMobileMenuOpen, isTourActive, setIsTourActive, startImmediateTour, setStartImmediateTour, aiAutopilotCapping, setAiAutopilotCapping, ecoStreak, setEcoStreak, chatMessages, setChatMessages, chatInput, setChatInput, isSendingChat, setIsSendingChat, isChatOpen, setIsChatOpen, activeFaqCategory, setActiveFaqCategory, removeDevice, generatePDF, handleMoveWidget, widgetOrder, setWidgetOrder, draggedIndex, setDraggedIndex, isGeneratingPDF, setIsGeneratingPDF, dailySavingsData, performanceChartData, aiOptimizationMetrics, settlementLogs, aiSmartAc, setAiSmartAc, aiEcoStandby, setAiEcoStandby, aiPfTuning, setAiPfTuning, aiLoadShift, setAiLoadShift, perfRange, setPerfRange, globalBudget, unitRate, telemetryPerfRange, setTelemetryPerfRange, deviceSpecificChartData, compareDevices, aiOptimizationChartData, deviceAnalysis, isAnalyzingDevice, setIsAnalyzingDevice, selectedDeviceId, setSelectedDeviceId, compareDeviceIds, setCompareDeviceIds, showComparisonView, setShowComparisonView, calcDays, setCalcDays, sharedFtRate, setSharedFtRate, plannedKwh, setPlannedKwh, onPeakShare, setOnPeakShare, activeSpike, setActiveSpike, aiAlerts, setAiAlerts, isAiScanning, setIsAiScanning, aiTick, setAiTick, claimedQuests, setClaimedQuests, handleInjectVirtualLoad, handleAiOptimization, setGlobalBudget, setUnitRate, setDeviceAnalysis, setWeatherInput, setWeatherLocation, fetchWeatherForAlert, addDevice, updateDeviceConfig, containerVariants, itemVariants, CATEGORIES, renderWidgetWrapper, AnimatedCounter, calcMode, setCalcMode, calcTab, setCalcTab, statsFrame, setStatsFrame, statsTab, setStatsTab, notiTab, setNotiTab, manualTab, setManualTab, searchTerm, setSearchTerm, activeCategory, setActiveCategory, aiMonthlySavings, handleBatchStandbyCutoff, filteredDevices, toggleCompareSelection, setLang, runAiAnomalyScan, currentAlerts, totalClaimedXp, activeQuests, handleClaimQuest, handleDragStart, handleDragOver, handleDragEnd, activeHouse, telemetryChartData, CustomTooltip, telemetryPerformanceData, pieData, COLORS } = shared;

  return (
    <>
      <div className="animate-fade-in text-slate-900 dark:text-slate-100" id="tour-step-stats">
              {/* Stats Page Sub-Tabs */}
              <div className="flex gap-4 mb-6 border-b border-slate-100 dark:border-slate-800/50 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <button
                  className={`text-[0.75rem] md:text-sm font-black uppercase tracking-wider pb-2 transition-all border-0 bg-transparent cursor-pointer ${statsTab === "telemetry" ? "text-primary dark:text-sky-400 border-b-2 border-primary dark:border-sky-400" : "text-slate-500 dark:text-slate-400 dark:opacity-100 opacity-50"}`}
                  style={{
                    borderBottom:
                      statsTab === "telemetry" ? "2px solid" : "none",
                  }}
                  onClick={() => setStatsTab("telemetry")}
                >
                  <i className="fas fa-chart-line mr-2"></i>
                  {lang === "th" ? "ข้อมูลคลื่นไฟฟ้าด่วน" : "Telemetry Logs"}
                </button>
                <button
                  className={`text-[0.75rem] md:text-sm font-black uppercase tracking-wider pb-2 transition-all border-0 bg-transparent cursor-pointer ${statsTab === "benchmark" ? "text-primary dark:text-sky-400 border-b-2 border-primary dark:border-sky-400" : "text-slate-500 dark:text-slate-400 dark:opacity-100 opacity-50"}`}
                  style={{
                    borderBottom:
                      statsTab === "benchmark" ? "2px solid" : "none",
                  }}
                  onClick={() => setStatsTab("benchmark")}
                >
                  <i className="fas fa-balance-scale mr-2"></i>
                  {lang === "th"
                    ? "การเปรียบเทียบมาตรฐานเชิงกลุ่ม"
                    : "Benchmark Sectors"}
                </button>
              </div>

              {statsTab === "telemetry" ? (
                <div className="space-y-4 animate-fade-in text-slate-900 dark:text-slate-100">

<div className="w-full mb-6">
                        <div className="dashboard-card border-0 overflow-hidden h-full flex flex-col bg-primary text-white relative shadow-sm">
                          
                          <div className="p-6 flex-grow flex flex-col justify-between relative">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                              <i className="fas fa-brain text-[150px]"></i>
                            </div>
                            <h5 className="font-bold mb-4 font-display text-lg relative z-10">
                              {t("ai_scan_title")}
                            </h5>
                            <p className="text-xs opacity-80 leading-relaxed mb-6 relative z-10">
                              {t("ai_scan_desc")}
                            </p>
                            <button className="btn btn-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors dark:bg-slate-800  dark:border-slate-700 w-full rounded-2xl py-3 font-bold text-[0.75rem] uppercase tracking-widest text-primary relative z-10">
                              {t("ai_apply")}
                            </button>

                            <div className="mt-auto relative z-10 pt-10 border-t border-white/10">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/10 rounded-xl">
                                  <i className="fas fa-bolt text-xs"></i>
                                </div>
                                <div>
                                  <div className="text-[0.75rem] font-bold opacity-60 uppercase">
                                    Real-time Efficiency
                                  </div>
                                  <div className="text-xl font-bold mono-font">
                                    {aiOptimizationMetrics.efficiencyIndex.toFixed(1)}%
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl">
                                  <i className="fas fa-microchip text-xs"></i>
                                </div>
                                <div>
                                  <div className="text-[0.75rem] font-bold opacity-60 uppercase">
                                    System Health
                                  </div>
                                  <div className="text-xl font-bold mono-font">
                                    Optimal
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
</div>
<div className="w-full mb-6">
                        <div className="dashboard-card border border-slate-200 dark:border-0 overflow-hidden shadow-sm bg-white dark:bg-white/5">
                          
                          <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                              <div>
                                <span className="text-[0.7rem] text-primary font-bold uppercase tracking-widest font-mono block mb-1">
                                  <i className="fas fa-brain me-1.5 align-middle text-emerald-400"></i>{" "}
                                  AI-OPTIMIZED PATTERN VISUALIZER
                                </span>
                                <h5 className="font-bold mb-1 font-display text-lg tracking-tight text-slate-900 dark:text-white/90 font-sans">
                                  {lang === "th"
                                    ? "การวิเคราะห์โครงข่ายและคาดการณ์ประหยัดด้วย AI (Smart Peak Shaving)"
                                    : "Dynamic AI Load Curve & Peak Shaving Forecast"}
                                </h5>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0">
                                  {lang === "th"
                                    ? "เปรียบเทียบคลื่นกำลังไฟฟ้าโหนดปกติ กับคลื่นพลังงานที่ลดหย่อนด้วย AI สรุปผลความถี่วิเคราะห์ราย 24 ชม."
                                    : "Simultaneous real-time analysis of standard grid metrics vs. AI energy-saver demand curves"}
                                </p>
                              </div>
                              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl">
                                <div className="text-end">
                                  <span className="text-[0.7rem] text-emerald-400 font-bold uppercase block">
                                    {lang === "th"
                                      ? "ประหยัดพลังงานรวม"
                                      : "Total Combined Savings"}
                                  </span>
                                  <span className="text-base font-black text-emerald-400 font-mono">
                                    -{aiMonthlySavings.percent.toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="h-[280px] md:h-[320px]">
                              <ResponsiveContainer>
                                <AreaChart data={aiOptimizationChartData}>
                                  <defs>
                                    <linearGradient
                                      id="normalLoad"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="5%"
                                        stopColor="#f59e0b"
                                        stopOpacity={0.15}
                                      />
                                      <stop
                                        offset="95%"
                                        stopColor="#f59e0b"
                                        stopOpacity={0}
                                      />
                                    </linearGradient>
                                    <linearGradient
                                      id="optimizedLoad"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="5%"
                                        stopColor="#10b981"
                                        stopOpacity={0.25}
                                      />
                                      <stop
                                        offset="95%"
                                        stopColor="#10b981"
                                        stopOpacity={0}
                                      />
                                    </linearGradient>
                                  </defs>
                                  <XAxis
                                    dataKey="hour"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fontWeight: "bold" }}
                                  />
                                  <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9 }}
                                    unit=" kW"
                                  />
                                  <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke={
                                      isDarkMode
                                        ? "rgba(255,255,255,0.06)"
                                        : "rgba(0,0,0,0.05)"
                                    }
                                  />
                                  <Tooltip
                                    contentStyle={{
                                      borderRadius: "20px",
                                      border: "none",
                                      backgroundColor: isDarkMode
                                        ? "#0f172a"
                                        : "#fff",
                                      boxShadow: "0 10px 45px rgba(0,0,0,0.2)",
                                    }}
                                  />
                                  <Legend
                                    align="right"
                                    verticalAlign="top"
                                    iconType="circle"
                                    wrapperStyle={{
                                      paddingBottom: "15px",
                                      fontSize: "9px",
                                      fontWeight: "bold",
                                    }}
                                  />
                                  <Area
                                    name={
                                      lang === "th"
                                        ? "โหลดกำลังไฟฟ้ามาตรฐาน (kWh)"
                                        : "Standard Demand Profile (kWh)"
                                    }
                                    type="monotone"
                                    dataKey="normal"
                                    stroke="#f59e0b"
                                    strokeWidth={2.5}
                                    fill="url(#normalLoad)"
                                  />
                                  <Area
                                    name={
                                      lang === "th"
                                        ? "โหลดกำลังไฟฟ้าหลังผ่าน AI (kWh)"
                                        : "AI-Optimized Stream (kWh)"
                                    }
                                    type="monotone"
                                    dataKey="optimized"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fill="url(#optimizedLoad)"
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
</div>

                  <div className="w-full mb-8">
                    <HistoricalTrendChart isDarkMode={isDarkMode} activeHouseName={activeHouse?.name || 'Local Property'} />
                  </div>
                  <div
                    className="dashboard-card border-0 p-4 md:p-8 mb-8 shadow-xl animate-slide-up"
                    style={{ animationDelay: "50ms" }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                      <h4 className="font-display font-bold text-lg md:text-2xl tracking-tight">
                        {t("telemetry_active_load")}
                      </h4>
                      <div className="p-1 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex gap-1 w-full sm:w-auto">
                        <button
                          className={`btn btn-xs flex-grow sm:flex-none px-4 rounded-xl font-bold ${statsFrame === "daily" ? "btn-primary shadow-lg" : "text-slate-500 dark:text-slate-400"}`}
                          onClick={() => setStatsFrame("daily")}
                        >
                          {t("telemetry_daily").toUpperCase()}
                        </button>
                        <button
                          className={`btn btn-xs flex-grow sm:flex-none px-4 rounded-xl font-bold ${statsFrame === "monthly" ? "btn-primary shadow-lg" : "text-slate-500 dark:text-slate-400"}`}
                          onClick={() => setStatsFrame("monthly")}
                        >
                          {t("telemetry_monthly").toUpperCase()}
                        </button>
                      </div>
                    </div>
                    <div className="h-[250px] md:h-[400px]">
                      <ResponsiveContainer>
                        <ComposedChart data={telemetryChartData}>
                          <defs>
                            <linearGradient
                              id="pColor"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="var(--primary)"
                                stopOpacity={0.4}
                              />
                              <stop
                                offset="95%"
                                stopColor="var(--primary)"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={isDarkMode ? "#1b254b" : "#eee"}
                          />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fontWeight: "bold" }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10 }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="usage"
                            stroke="var(--primary)"
                            strokeWidth={4}
                            fill="url(#pColor)"
                            name={t("telemetry_active_load")}
                          />
                          <Line
                            type="monotone"
                            dataKey="forecast"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            dot={false}
                            name={lang === "th" ? "แนวโน้มพยากรณ์" : "Forecasted Trend"}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Performance Metrics Charts in Telemetry */}
                  <div
                    className="dashboard-card border-0 p-6 md:p-10 mb-8 shadow-xl animate-slide-up"
                    style={{ animationDelay: "100ms" }}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                      <div>
                        <h4 className="font-display font-bold text-lg md:text-2xl tracking-tight">
                          {t("telemetry_perf_metrics")}
                        </h4>
                        <p className="text-[0.75rem] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">
                          Uptime & Efficiency Telemetry
                        </p>
                      </div>
                      <div className="p-1 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex gap-1 w-full md:w-auto">
                        {(["daily", "weekly", "monthly"] as const).map(
                          (range) => (
                            <button
                              key={range}
                              onClick={() => setTelemetryPerfRange(range)}
                              className={`btn btn-xs flex-grow md:flex-none px-4 rounded-xl font-bold uppercase text-[0.7rem] tracking-widest ${telemetryPerfRange === range ? "btn-primary shadow-md" : "text-slate-500 dark:text-slate-400 dark:opacity-100 opacity-60"}`}
                            >
                              {t(
                                range === "daily"
                                  ? "telemetry_daily"
                                  : range === "weekly"
                                    ? "weekly"
                                    : "telemetry_monthly"
)}
</button>
                          ))}
                      </div>
                    </div>
                    <div className="h-[300px] md:h-[400px]">
                      <ResponsiveContainer>
                        <ComposedChart data={telemetryPerformanceData}>
                          <defs>
                            <linearGradient
                              id="teleUptimeColor"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#10b981"
                                stopOpacity={0.2}
                              />
                              <stop
                                offset="95%"
                                stopColor="#10b981"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="teleEffColor"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="var(--primary)"
                                stopOpacity={0.2}
                              />
                              <stop
                                offset="95%"
                                stopColor="var(--primary)"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={isDarkMode ? "#1b254b" : "#eee"}
                          />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 9, fontWeight: "bold" }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 9 }}
                            domain={[85, 100]}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend
                            align="center"
                            verticalAlign="bottom"
                            iconType="circle"
                            wrapperStyle={{
                              paddingTop: "30px",
                              fontSize: "11px",
                              fontWeight: "bold",
                            }}
                          />
                          <Area
                            name={t("perf_uptime")}
                            type="monotone"
                            dataKey="uptime"
                            stroke="#10b981"
                            strokeWidth={3}
                            fill="url(#teleUptimeColor)"
                          />
                          <Line
                            name={t("perf_efficiency")}
                            type="monotone"
                            dataKey="efficiency"
                            stroke="var(--primary)"
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                            activeDot={{ r: 6 }}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="row g-4">
                    <div
                      className="col-12 col-xl-6 animate-slide-up"
                      style={{ animationDelay: "200ms" }}
                    >
                      <div className="dashboard-card border-0 p-6 md:p-8 h-full">
                        <h6 className="font-bold font-display text-lg mb-8">
                          {t("telemetry_dist")}
                        </h6>
                        <div className="h-[250px] md:h-[300px]">
                          <ResponsiveContainer>
                            <PieChart>
                              <Pie
                                data={pieData}
                                innerRadius={window.innerWidth < 768 ? 60 : 80}
                                outerRadius={window.innerWidth < 768 ? 90 : 120}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                              >
                                {pieData.map((_, i) => (
                                  <Cell
                                    key={i}
                                    fill={COLORS[i % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                              <Legend
                                align="center"
                                verticalAlign="bottom"
                                iconType="circle"
                                wrapperStyle={{
                                  paddingTop: "20px",
                                  fontSize: "10px",
                                  fontWeight: "bold",
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-12 col-xl-6 animate-slide-up"
                      style={{ animationDelay: "300ms" }}
                    >
                      <div className="dashboard-card border-0 p-6 md:p-8 h-full overflow-hidden">
                        <h6 className="font-bold font-display text-lg mb-8">
                          {t("telemetry_logs")}
                        </h6>
                        <div className="overflow-auto max-h-[300px] w-full bg-transparent custom-scrollbar">
                          <table className="table table-hover align-middle text-sm text-slate-800 dark:text-slate-100">
                            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-100">
                              <tr className="label text-[0.7rem]">
                                <th>{t("log_cycle")}</th>
                                <th>{t("log_units")}</th>
                                <th className="text-end">
                                  {t("log_settlement")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {settlementLogs.map((row, i) => (
                                <tr key={i} className="border-b border-slate-200 dark:border-slate-800/50">
                                  <td className="font-bold whitespace-nowrap text-slate-800 dark:text-slate-100">
                                    {row.p}
                                  </td>
                                  <td className="mono-font text-slate-700 dark:text-slate-100">{row.u} kWh</td>
                                  <td className="text-end font-bold text-primary dark:text-sky-400 mono-font">
                                    ฿{row.c.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row g-4 md:g-5 animate-fade-in text-slate-900 dark:text-slate-100">
                  <div className="col-12 col-xl-7">
                    <div
                      className="dashboard-card border border-slate-200 dark:border-slate-800 p-6 md:p-8 h-full animate-slide-up bg-white dark:bg-slate-900/40"
                      style={{ animationDelay: "100ms" }}
                    >
                      <h5 className="font-display font-bold text-xl md:text-2xl mb-10 tracking-tight">
                        {t("bench_title")}
                      </h5>
                      <div className="h-[250px] md:h-[350px]">
                        <ResponsiveContainer>
                          <BarChart
                            data={[
                              { n: t("bench_you"), v: analytics.totalUnits },
                              {
                                n: t("bench_sector_avg"),
                                v: analytics.totalUnits * 1.2,
                              },
                              {
                                n: t("bench_eco_hub"),
                                v: analytics.totalUnits * 0.8,
                              },
                            ]}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                              stroke="#eee"
                            />
                            <XAxis
                              dataKey="n"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fontWeight: "bold" }}
                            />
                            <YAxis hide />
                            <Tooltip
                              content={<CustomTooltip />}
                              cursor={{ fill: "transparent" }}
                            />
                            <Bar
                              dataKey="v"
                              radius={[15, 15, 0, 0]}
                              barSize={window.innerWidth < 768 ? 40 : 60}
                            >
                              {[0, 1, 2].map((_, i) => (
                                <Cell
                                  key={i}
                                  fill={i === 0 ? "var(--primary)" : "#cbd5e1"}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-5 flex flex-col justify-center gap-4 md:gap-6">
                    <div
                      className="p-6 md:p-8 bg-emerald-500/5 dark:bg-emerald-950/20 border-2 border-emerald-500/20 dark:border-emerald-500/30 rounded-[30px] md:rounded-[40px] text-center animate-slide-up shadow-sm bg-white dark:bg-slate-900/40"
                      style={{ animationDelay: "200ms" }}
                    >
                      <h5 className="font-display font-bold text-emerald-600 dark:text-emerald-400 text-xl md:text-2xl mb-2">
                        {t("bench_status")}
                      </h5>
                      <p className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300 opacity-90 mb-0">
                        {t("bench_status_desc")}
                      </p>
                    </div>
                    <div
                      className="p-6 md:p-8 bg-primary/5 dark:bg-purple-950/20 border-2 border-primary/10 dark:border-purple-500/20 rounded-[30px] md:rounded-[40px] italic text-[0.8rem] md:text-xs text-slate-700 dark:text-slate-300 leading-relaxed animate-slide-up bg-white dark:bg-slate-900/40 shadow-sm"
                      style={{ animationDelay: "300ms" }}
                    >
                      <h6 className="font-bold text-primary dark:text-purple-400 mb-2 uppercase tracking-[0.2em] text-[0.75rem]">
                        {t("bench_insight_title")}
                      </h6>
                      {t("bench_insight_desc")}
                    </div>
                  </div>
                </div>
              )}
            
              <div className="mt-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <h5 className="font-display font-bold text-xl md:text-2xl mb-6 tracking-tight">
                  {lang === "th" ? "แผนที่การกระจายการใช้พลังงาน" : "Energy Distribution Map"}
                </h5>
                <div className="dashboard-card border border-slate-200 dark:border-0 overflow-hidden bg-white dark:bg-slate-900/40 backdrop-blur-md shadow-sm rounded-[2rem] p-5">
                  <PropertyDistributionMap lang={lang} isDarkMode={isDarkMode} />
                </div>
              </div>

            </div>
    </>
  );
}
