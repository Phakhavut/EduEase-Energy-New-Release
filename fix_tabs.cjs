const fs = require('fs');
const path = require('path');

const tabsDir = path.join(__dirname, 'src/components/tabs');
const files = fs.readdirSync(tabsDir).filter(f => f.endsWith('.tsx'));

const rechartsImports = "import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, ComposedChart } from 'recharts';";
const otherImports = `
import { WeatherCard } from "../WeatherCard";
import { EnergyTipWidget } from "../EnergyTipWidget";
import { HistoricalTrendChart } from "../HistoricalTrendChart";
import { QuestLeaderboard } from "../QuestLeaderboard";
import { DailyEnergyQuests } from "../DailyEnergyQuests";
`;

files.forEach(file => {
    const filePath = path.join(tabsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Add ComposedChart to recharts import if not there
    if (content.includes('from "recharts"') && !content.includes('ComposedChart')) {
        content = content.replace(/import \{([^}]+)\} from "recharts";/, (match, p1) => {
            return `import {${p1}, ComposedChart} from "recharts";`;
        });
    }

    // Add missing component imports
    if (!content.includes('WeatherCard')) {
        content = content.replace(/(import .* from "lucide-react";)/, `$1\n${otherImports}`);
    }
    
    // Add missing shared variables to destructuring
    const newVars = [
        'aiMonthlySavings', 'handleBatchStandbyCutoff', 'filteredDevices', 'toggleCompareSelection', 
        'setLang', 'runAiAnomalyScan', 'currentAlerts', 'totalClaimedXp', 'activeQuests', 
        'handleClaimQuest', 'handleDragStart', 'handleDragOver', 'handleDragEnd', 'activeHouse', 
        'telemetryChartData', 'CustomTooltip', 'telemetryPerformanceData', 'pieData', 'COLORS'
    ];
    
    // find the shared destructuring block
    // It looks like: const { lang, isDarkMode, ... } = shared;
    const sharedMatch = content.match(/const \{([^}]+)\} = shared;/);
    if (sharedMatch) {
        let existingVars = sharedMatch[1].split(',').map(s => s.trim());
        let toAdd = newVars.filter(v => !existingVars.includes(v));
        if (toAdd.length > 0) {
            content = content.replace(sharedMatch[0], `const { ${existingVars.join(', ')}, ${toAdd.join(', ')} } = shared;`);
        }
    }

    fs.writeFileSync(filePath, content);
});

// Now fix Dashboard.tsx
const dashboardPath = path.join(__dirname, 'src/components/Dashboard.tsx');
let dashboard = fs.readFileSync(dashboardPath, 'utf8');

// Replace totalSpent with totalCost
dashboard = dashboard.replace(/analytics\.totalSpent/g, 'analytics.totalCost');

// Add shared object definition before return ( <div className="dashboard-container relative"
const sharedObj = `
  const shared = {
    lang, isDarkMode, onToggleTheme, onLogout, multiDevices, setMultiDevices, analytics, t, confettiTrigger, setConfettiTrigger, currentPage, setCurrentPage, sidebarAvatar, setSidebarAvatar, sidebarCustomLogoUrl, setSidebarCustomLogoUrl, currentBgColor, contrastAnalysis, severeWeatherAlert, weatherData, isWeatherLoading, weatherLocation, weatherError, weatherInput, isMobileMenuOpen, setIsMobileMenuOpen, isTourActive, setIsTourActive, startImmediateTour, setStartImmediateTour, aiAutopilotCapping, setAiAutopilotCapping, ecoStreak, setEcoStreak, chatMessages, setChatMessages, chatInput, setChatInput, isSendingChat, setIsSendingChat, isChatOpen, setIsChatOpen, activeFaqCategory, setActiveFaqCategory, removeDevice, generatePDF, handleMoveWidget, widgetOrder, setWidgetOrder, draggedIndex, setDraggedIndex, isGeneratingPDF, setIsGeneratingPDF, dailySavingsData, performanceChartData, aiOptimizationMetrics, settlementLogs, aiSmartAc, setAiSmartAc, aiEcoStandby, setAiEcoStandby, aiPfTuning, setAiPfTuning, aiLoadShift, setAiLoadShift, perfRange, setPerfRange, globalBudget, unitRate, telemetryPerfRange, setTelemetryPerfRange, deviceSpecificChartData, compareDevices, aiOptimizationChartData, deviceAnalysis, isAnalyzingDevice, setIsAnalyzingDevice, selectedDeviceId, setSelectedDeviceId, compareDeviceIds, setCompareDeviceIds, showComparisonView, setShowComparisonView, calcDays, setCalcDays, sharedFtRate, setSharedFtRate, plannedKwh, setPlannedKwh, onPeakShare, setOnPeakShare, activeSpike, setActiveSpike, aiAlerts, setAiAlerts, isAiScanning, setIsAiScanning, aiTick, setAiTick, claimedQuests, setClaimedQuests, handleInjectVirtualLoad, handleAiOptimization, setGlobalBudget, setUnitRate, setDeviceAnalysis, setWeatherInput, setWeatherLocation, fetchWeatherForAlert, addDevice, updateDeviceConfig, containerVariants, itemVariants, CATEGORIES, renderWidgetWrapper, AnimatedCounter, calcMode, setCalcMode, calcTab, setCalcTab, statsFrame, setStatsFrame, statsTab, setStatsTab, notiTab, setNotiTab, manualTab, setManualTab, searchTerm, setSearchTerm, activeCategory, setActiveCategory,
    aiMonthlySavings, handleBatchStandbyCutoff, filteredDevices, toggleCompareSelection, setLang, runAiAnomalyScan, currentAlerts, totalClaimedXp, activeQuests, handleClaimQuest, handleDragStart, handleDragOver, handleDragEnd, activeHouse, telemetryChartData, CustomTooltip, telemetryPerformanceData, pieData, COLORS
  };
`;

const returnMatch = '  return (\n    <div\n      className="dashboard-container relative"';
if (dashboard.includes(returnMatch)) {
    dashboard = dashboard.replace(returnMatch, sharedObj + '\n' + returnMatch);
} else {
    console.log("Could not find return block in Dashboard.tsx");
}

fs.writeFileSync(dashboardPath, dashboard);
console.log("Done.");
