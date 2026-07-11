const fs = require('fs');

const code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8').split('\n');

const tabs = [
  { name: 'OverviewTab', start: 2556, end: 2980 },
  { name: 'AiHubTab', start: 2983, end: 3012 },
  { name: 'DevicesTab', start: 3015, end: 3456 },
  { name: 'CalculatorTab', start: 3459, end: 3864 },
  { name: 'StatsTab', start: 3867, end: 4472 },
  { name: 'NotiTab', start: 4475, end: 4625 },
  { name: 'ManualTab', start: 4628, end: 4752 },
];

const template = `import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Activity, ShieldAlert, Server, Droplet, Fan, Flame, Wind, Snowflake, Coffee, Tv, Thermometer, Wifi, Smartphone, Cpu, Monitor, Battery, AlertTriangle, Sliders, Clock, TrendingDown, Book, Settings, DollarSign, Calendar, Info, Search, Power, ZapOff
} from "lucide-react";
import { Device, DeviceCategory } from "../types/device.types";
import { EnergyMonitoringHub } from "./EnergyMonitoringHub";
import { SavingsCalculator } from "./SavingsCalculator";
import { ConsolidatedCalculator } from "./ConsolidatedCalculator";
import { ProjectedSavingsCard } from "./ProjectedSavingsCard";
import { UserManual } from "./UserManual";
import { PropertyDistributionMap } from "./PropertyDistributionMap";
import { DeviceNodeItem } from "./DeviceNodeItem";
import Confetti from "./Confetti";
import GuidedTour from "./GuidedTour";
import { jsPDF } from "jspdf";
import useContrastAdjustment from "../hooks/useContrastAdjustment";
import { DeviceNodeModal } from "./DeviceNodeModal";

export default function TAB_NAME({ shared }: { shared: any }) {
  const { lang, isDarkMode, onToggleTheme, onLogout, multiDevices, setMultiDevices, analytics, t, confettiTrigger, setConfettiTrigger, currentPage, setCurrentPage, sidebarAvatar, setSidebarAvatar, sidebarCustomLogoUrl, setSidebarCustomLogoUrl, currentBgColor, contrastAnalysis, severeWeatherAlert, weatherData, isWeatherLoading, weatherLocation, weatherError, weatherInput, isMobileMenuOpen, setIsMobileMenuOpen, isTourActive, setIsTourActive, startImmediateTour, setStartImmediateTour, aiAutopilotCapping, setAiAutopilotCapping, ecoStreak, setEcoStreak, chatMessages, setChatMessages, chatInput, setChatInput, isSendingChat, setIsSendingChat, isChatOpen, setIsChatOpen, activeFaqCategory, setActiveFaqCategory, removeDevice, generatePDF, handleMoveWidget, widgetOrder, setWidgetOrder, draggedIndex, setDraggedIndex, isGeneratingPDF, setIsGeneratingPDF, dailySavingsData, performanceChartData, aiOptimizationMetrics, settlementLogs, aiSmartAc, setAiSmartAc, aiEcoStandby, setAiEcoStandby, aiPfTuning, setAiPfTuning, aiLoadShift, setAiLoadShift, perfRange, setPerfRange, globalBudget, unitRate, telemetryPerfRange, setTelemetryPerfRange, deviceSpecificChartData, compareDevices, aiOptimizationChartData, deviceAnalysis, isAnalyzingDevice, setIsAnalyzingDevice, selectedDeviceId, setSelectedDeviceId, compareDeviceIds, setCompareDeviceIds, showComparisonView, setShowComparisonView, calcDays, setCalcDays, sharedFtRate, setSharedFtRate, plannedKwh, setPlannedKwh, onPeakShare, setOnPeakShare, activeSpike, setActiveSpike, aiAlerts, setAiAlerts, isAiScanning, setIsAiScanning, aiTick, setAiTick, claimedQuests, setClaimedQuests, handleInjectVirtualLoad, handleAiOptimization, setGlobalBudget, setUnitRate, setDeviceAnalysis, setWeatherInput, setWeatherLocation, fetchWeatherForAlert, addDevice, updateDeviceConfig, containerVariants, itemVariants, CATEGORIES, renderWidgetWrapper, AnimatedCounter, calcMode, setCalcMode, calcTab, setCalcTab, statsFrame, setStatsFrame, statsTab, setStatsTab, notiTab, setNotiTab, manualTab, setManualTab, searchTerm, setSearchTerm, activeCategory, setActiveCategory } = shared;

  return (
    <>
      __CONTENT__
    </>
  );
}
`;

// Extract to files
tabs.forEach(tab => {
  const content = code.slice(tab.start - 1, tab.end).join('\n');
  const fileContent = template.replace('TAB_NAME', tab.name).replace('__CONTENT__', content);
  fs.writeFileSync(`src/components/tabs/${tab.name}.tsx`, fileContent, 'utf-8');
});

// Replace in Dashboard.tsx
// We have to replace backwards to not mess up the line numbers!
let newCode = [...code];
for (let i = tabs.length - 1; i >= 0; i--) {
  const tab = tabs[i];
  const replacement = `            <Suspense fallback={<div className="flex justify-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
              <${tab.name} shared={shared} />
            </Suspense>`;
  
  newCode.splice(tab.start - 1, tab.end - tab.start + 1, replacement);
}

// Ensure lazy imports are at the top of Dashboard.tsx
let newCodeStr = newCode.join('\n');
const importStr = `import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";\n` + 
  tabs.map(t => `const ${t.name} = React.lazy(() => import('./tabs/${t.name}'));`).join('\n') + '\n';

newCodeStr = newCodeStr.replace(/import React, \{ useState, useEffect, useMemo, useRef \} from "react";/, importStr);

fs.writeFileSync('src/components/Dashboard.tsx', newCodeStr, 'utf-8');
console.log('Split complete!');
