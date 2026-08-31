import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  PiggyBank, 
  Wallet, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Snowflake, 
  TrendingDown, 
  TreePine, 
  Trophy, 
  AlertCircle, 
  Sun, 
  Zap, 
  Bot,
  ChevronRight,
  ChevronDown,
  Building2,
  FileText,
  BrainCircuit,
  SlidersHorizontal,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { Mission, Appliance, AppPage, InfoDetailMode, GamificationSettings, DEFAULT_GAMIFICATION_SETTINGS, UserPersona } from '../../types';
import { ProgressiveCard } from '../common/ProgressiveCard';
import { ProjectCard } from '../game/city/ProjectCard';
import { BudgetThresholdAlertBanner } from '../notifications/BudgetThresholdAlertBanner';
import { EnergyConsumptionForecastWidget } from '../forecasting/EnergyConsumptionForecastWidget';
import { EnergyTipWidget } from '../EnergyTipWidget';
import { HistoricalTrendChart } from '../HistoricalTrendChart';
import { getMonthlyComparison } from '../../data/monthlyComparisonData';

interface HomeViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  setCurrentPage: (page: AppPage) => void;
  todayCost: number;
  monthlyEstimate: number;
  monthlyBudget: number;
  moneySavedMonth: number;
  dailyMissions: Mission[];
  onCompleteMission: (id: string) => void;
  appliances: Appliance[];
  userStreak: number;
  userLevel: number;
  userXp: number;
  userXpMax: number;
  userCoins: number;
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
  onOpenMonthlyReport?: () => void;
  onTriggerBudgetToast?: (type: 'danger' | 'warning') => void;
  gamificationSettings?: GamificationSettings;
  persona?: UserPersona;
}

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  isDarkMode,
  setCurrentPage,
  todayCost,
  monthlyEstimate,
  monthlyBudget,
  moneySavedMonth,
  dailyMissions,
  onCompleteMission,
  appliances,
  userStreak,
  userLevel,
  userXp,
  userXpMax,
  userCoins,
  infoDetailMode,
  onStartPageTour,
  onOpenMonthlyReport,
  onTriggerBudgetToast,
  gamificationSettings = DEFAULT_GAMIFICATION_SETTINGS,
  persona = 'student',
}) => {
  // Sort appliances to identify top power consumers
  const sortedAppliances = [...appliances].sort((a, b) => b.todayCost - a.todayCost);
  const mostExpensive = sortedAppliances[0] || appliances[0];
  const secondMostExpensive = sortedAppliances[1];
  const thirdMostExpensive = sortedAppliances[2];

  const monthlyData = getMonthlyComparison(persona);
  const isSavings = monthlyData.costDiff < 0;

  const budgetPercent = Math.min(100, Math.round((monthlyEstimate / monthlyBudget) * 100));
  const isOverBudget = monthlyEstimate > monthlyBudget;

  const activeMission = dailyMissions.find(m => !m.completed) || dailyMissions[0];
  const [showEcoActivities, setShowEcoActivities] = useState<boolean>(true);

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. HERO OVERVIEW BANNER: Clear, Professional & Direct Utility Focus */}
      <motion.div 
        id="tour-step-home"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 md:p-8 rounded-[2.5rem] border relative overflow-hidden transition-all shadow-lg ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700/60 text-white'
            : 'bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white border-slate-800 shadow-slate-900/10'
        }`}
      >
        {/* Background Subtle Accent */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                <span>{lang === 'th' ? 'ภาพรวมพลังงานและค่าไฟฟ้า' : 'Energy & Cost Dashboard'}</span>
              </div>

              {onStartPageTour && (
                <button
                  onClick={() => onStartPageTour(0)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}</span>
                </button>
              )}

              {onOpenMonthlyReport && (
                <button
                  onClick={onOpenMonthlyReport}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-extrabold text-xs border border-blue-500/30 hover:bg-blue-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>{lang === 'th' ? '📄 รายงานรายเดือน PDF' : '📄 Monthly PDF'}</span>
                </button>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white">
              {lang === 'th' ? 'สวัสดี Namyen! ⚡ สรุปค่าไฟฟ้าวันนี้' : 'Good day, Namyen! ⚡ Energy Cost Overview'}
            </h2>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl font-medium">
              {lang === 'th' 
                ? `วันนี้ใช้ไฟไปแล้ว ฿${todayCost.toFixed(2)} | คาดการณ์บิลสิ้นเดือน ฿${monthlyEstimate.toLocaleString()} (${budgetPercent}% ของงบประมาณ) ช่วยเซฟสะสม ฿${moneySavedMonth.toLocaleString()}`
                : `Today's spend is ฿${todayCost.toFixed(2)} | Month-end projection ฿${monthlyEstimate.toLocaleString()} (${budgetPercent}% of budget) with ฿${moneySavedMonth.toLocaleString()} saved.`}
            </p>
          </div>

          {/* Direct Functional Actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setCurrentPage('appliances')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>{lang === 'th' ? 'ดูอุปกรณ์ที่กินไฟ' : 'View Appliances'}</span>
            </button>

            <button
              onClick={() => setCurrentPage('ai-coach')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm border border-slate-700 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-teal-400" />
              <span>{lang === 'th' ? 'ปรึกษา AI Coach' : 'AI Coach'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Real-time Budget Threshold Visual Alert Banner */}
      <BudgetThresholdAlertBanner
        lang={lang}
        isDarkMode={isDarkMode}
        monthlyEstimate={monthlyEstimate}
        monthlyBudget={monthlyBudget}
        onNavigatePage={setCurrentPage}
        onTriggerSimulatedToast={() => onTriggerBudgetToast && onTriggerBudgetToast('danger')}
      />

      {/* 2. PRIORITY #1: THE 4 ESSENTIAL METRIC CARDS (Cost, Budget, Savings, Top Power Consumer) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              {lang === 'th' ? 'ข้อมูลสำคัญที่ต้องรู้ใน 5 วินาที' : 'Essential 5-Second Overview'}
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {lang === 'th' ? 'อัปเดตสดจาก Smart Meter' : 'Live Smart Meter Data'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1: Today's Electricity Cost */}
          <ProgressiveCard
            mode={infoDetailMode}
            lang={lang}
            isDarkMode={isDarkMode}
            title={lang === 'th' ? 'ค่าไฟวันนี้ (Today)' : 'Cost Today'}
            icon={<Zap className="w-4 h-4 text-amber-500" />}
            summaryValue={`฿${todayCost.toFixed(2)}`}
            summarySubtitle={lang === 'th' ? `ประมาณการบิลเดือนนี้: ฿${monthlyEstimate.toLocaleString()}` : `Est. monthly bill: ฿${monthlyEstimate.toLocaleString()}`}
            badgeText={infoDetailMode === 'detailed' ? 'Meter #PEA-928' : 'Smart Meter'}
            badgeType="info"
            explanationTitle={lang === 'th' ? 'สาเหตุการใช้ไฟ' : 'Consumption Reason'}
            explanationText={lang === 'th' ? 'เปิดแอร์ช่วงบ่าย 4 ชั่วโมง + ตู้เย็นสมาร์ทอินเวอร์เตอร์ทำงานต่อเนื่อง' : 'Air conditioner active 4 hrs during peak heat + Smart Fridge continuous run.'}
            comparisonText={lang === 'th' ? 'ประหยัดกว่าเมื่อวาน ฿8.50' : 'Saved ฿8.50 vs yesterday'}
            historicalMetrics={[
              { period: lang === 'th' ? 'เมื่อวาน (Yesterday)' : 'Yesterday', kwh: '12.1 kWh', cost: '฿51.00', status: 'normal' },
              { period: lang === 'th' ? '2 วันก่อน (2 Days Ago)' : '2 Days Ago', kwh: '9.8 kWh', cost: '฿41.20', status: 'optimal' },
              { period: lang === 'th' ? '3 วันก่อน (3 Days Ago)' : '3 Days Ago', kwh: '14.5 kWh', cost: '฿60.90', status: 'peak' },
              { period: lang === 'th' ? 'ค่าเฉลี่ย 7 วัน (7-Day Avg)' : '7-Day Avg', kwh: '10.8 kWh', cost: '฿45.60', status: 'optimal' },
            ]}
            formula="Units (10.12 kWh) × Base Rate (4.20) + Ft (-0.1532) + Service (38.22/30) = ฿42.50"
            rawMetrics={[
              { label: lang === 'th' ? 'หน่วยไฟ (kWh)' : 'Energy (kWh)', value: '10.12 kWh' },
              { label: lang === 'th' ? 'แรงดันไฟฟ้า (V)' : 'Voltage (V)', value: '228.4 V' },
              { label: lang === 'th' ? 'กระแสไฟฟ้า (A)' : 'Current (A)', value: '8.2 A' },
              { label: lang === 'th' ? 'ค่าตัวประกอบพลังงาน' : 'Power Factor', value: '0.96 (PF)' },
            ]}
            tariffBreakdown={lang === 'th' ? 'TOU Rate 1.1.2 (On-Peak: 5.26 THB, Off-Peak: 2.63 THB)' : 'TOU Rate 1.1.2 (On-Peak: 5.26 THB, Off-Peak: 2.63 THB)'}
            meterSource="PEA Smart Meter #PEA-9281-BKK"
            timestamp="2026-08-23 15:30:00"
            confidenceScore="98.8% Confidence"
            recommendedAction={{
              label: lang === 'th' ? 'ตั้งเวลาปิดแอร์ล่วงหน้า 30 นาที เพื่อเซฟ ฿15' : 'Schedule AC off 30m early to save ฿15',
              actionText: lang === 'th' ? 'ตั้งเลย' : 'Set Timer',
              onExecute: () => setCurrentPage('appliances')
            }}
          />

          {/* Card 2: Projected Monthly Bill & Budget Status */}
          <ProgressiveCard
            mode={infoDetailMode}
            lang={lang}
            isDarkMode={isDarkMode}
            title={lang === 'th' ? 'สถานะงบประมาณเดือนนี้' : 'Monthly Budget Status'}
            icon={<Wallet className="w-4 h-4 text-emerald-500" />}
            summaryValue={`${budgetPercent}%`}
            summarySubtitle={`฿${monthlyEstimate.toLocaleString()} / ฿${monthlyBudget.toLocaleString()}`}
            badgeText={isOverBudget ? 'Over Budget' : 'On Track'}
            badgeType={isOverBudget ? 'danger' : budgetPercent > 80 ? 'warning' : 'success'}
            explanationTitle={lang === 'th' ? 'วิเคราะห์การใช้จ่าย' : 'Spending Analysis'}
            explanationText={lang === 'th' ? `ใช้ไปแล้ว ${budgetPercent}% ของงบ คาดการณ์จบเดือนไม่เกินงบประมาณที่ตั้งไว้ ฿${monthlyBudget.toLocaleString()}` : `Spent ${budgetPercent}% of monthly cap. Projected to stay within ฿${monthlyBudget.toLocaleString()}`}
            comparisonText={lang === 'th' ? `เหลือโควตาใช้งานอีก ฿${(monthlyBudget - monthlyEstimate).toLocaleString()}` : `Remaining headroom: ฿${(monthlyBudget - monthlyEstimate).toLocaleString()}`}
            formula="Projected Bill = (Current Spent / Days Elapsed) × 30 Days = ฿1,850"
            rawMetrics={[
              { label: lang === 'th' ? 'งบที่ตั้งไว้' : 'Target Cap', value: `฿${monthlyBudget}` },
              { label: lang === 'th' ? 'ประมาณการสิ้นเดือน' : 'Month End Est.', value: `฿${monthlyEstimate}` },
              { label: lang === 'th' ? 'เฉลี่ยต่อวัน' : 'Daily Average', value: `฿${(monthlyEstimate / 30).toFixed(1)}` },
              { label: lang === 'th' ? 'จำนวนวันเหลือ' : 'Days Left', value: '18 Days' },
            ]}
            tariffBreakdown="Progressive Tier 3 Rate (Progressive Step 3.2)"
            meterSource="PEA Billing Cycle Tariff Rule Engine"
            timestamp="2026-08-23 15:30:00"
            confidenceScore="99.1% Confidence"
            recommendedAction={{
              label: lang === 'th' ? 'ตั้งแจ้งเตือนเมื่อค่าไฟแตะ 80% ของงบ' : 'Set threshold alert at 80% budget cap',
              actionText: lang === 'th' ? 'ตั้งเตือน' : 'Set Alert',
              onExecute: () => setCurrentPage('budget')
            }}
          >
            {/* Visual Budget Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-1">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-rose-500' : budgetPercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min(100, budgetPercent)}%` }}
              />
            </div>
          </ProgressiveCard>

          {/* Card 3: Money Saved This Month (Dynamic Month-over-Month Delta) */}
          <ProgressiveCard
            mode={infoDetailMode}
            lang={lang}
            isDarkMode={isDarkMode}
            title={lang === 'th' ? 'เงินที่ประหยัดได้' : 'Money Saved'}
            icon={<PiggyBank className="w-4 h-4 text-emerald-500" />}
            summaryValue={`฿${isSavings ? Math.abs(monthlyData.costDiff).toLocaleString() : moneySavedMonth.toLocaleString()}`}
            summarySubtitle={lang === 'th' ? `เทียบกับ ${monthlyData.previousMonth.nameTh}` : `vs ${monthlyData.previousMonth.nameEn}`}
            badgeText={isSavings ? `-${Math.abs(monthlyData.costDiffPct).toFixed(1)}% Cost` : `+${Math.abs(monthlyData.costDiffPct).toFixed(1)}% Cost`}
            badgeType={isSavings ? 'success' : 'warning'}
            explanationTitle={lang === 'th' ? 'ที่มาของเงินเซฟ' : 'Savings Source'}
            explanationText={lang === 'th' ? monthlyData.topSavingReasonTh : monthlyData.topSavingReasonEn}
            comparisonText={
              lang === 'th'
                ? isSavings
                  ? `ประหยัดเพิ่มขึ้น ${Math.abs(monthlyData.costDiffPct).toFixed(1)}% จากเดือนก่อน (฿${monthlyData.previousMonth.totalCost.toLocaleString()})`
                  : `ใช้ไฟเพิ่มขึ้น ${Math.abs(monthlyData.costDiffPct).toFixed(1)}% จากเดือนก่อน`
                : isSavings
                  ? `${Math.abs(monthlyData.costDiffPct).toFixed(1)}% lower than previous month (฿${monthlyData.previousMonth.totalCost.toLocaleString()})`
                  : `${Math.abs(monthlyData.costDiffPct).toFixed(1)}% higher than previous month`
            }
            formula={
              lang === 'th'
                ? `บิลเดือนก่อน (฿${monthlyData.previousMonth.totalCost.toLocaleString()}) - ประมาณการเดือนนี้ (฿${monthlyData.currentMonth.totalCost.toLocaleString()}) = ฿${Math.abs(monthlyData.costDiff).toLocaleString()}`
                : `Last Month (฿${monthlyData.previousMonth.totalCost.toLocaleString()}) - This Month (฿${monthlyData.currentMonth.totalCost.toLocaleString()}) = ฿${Math.abs(monthlyData.costDiff).toLocaleString()}`
            }
            rawMetrics={[
              { label: lang === 'th' ? 'หน่วยไฟลดลง' : 'Units Saved', value: `${Math.abs(monthlyData.kwhDiff)} kWh` },
              { label: lang === 'th' ? 'ลดคาร์บอน CO2' : 'CO2 Reduced', value: `${(Math.abs(monthlyData.kwhDiff) * 0.5).toFixed(1)} kg` },
              { label: lang === 'th' ? 'เทียบเท่าปลูกต้นไม้' : 'Tree Equivalent', value: `${Math.max(1, Math.round(Math.abs(monthlyData.kwhDiff) / 18))} Trees 🌳` },
            ]}
            tariffBreakdown="Ft Credit Offset (-0.1532 THB/unit) applied"
            meterSource="AI Energy Optimization Analytics Engine v3.0"
            timestamp="2026-08-23 15:30:00"
            confidenceScore="96.5% Precision"
            recommendedAction={{
              label: lang === 'th' ? 'เปิดโหมดตัดไฟสแตนด์บายอัตโนมัติเพิ่มเงินเซฟอีก ฿80' : 'Enable Standby Auto-Cut for extra ฿80 savings',
              actionText: lang === 'th' ? 'เปิดโหมด' : 'Enable',
              onExecute: () => setCurrentPage('appliances')
            }}
          />

          {/* Card 4: Top Power Consumer Appliance (Direct Utility Answer for "เครื่องไหนกินไฟ") */}
          <ProgressiveCard
            mode={infoDetailMode}
            lang={lang}
            isDarkMode={isDarkMode}
            title={lang === 'th' ? 'เครื่องที่กินไฟสูงสุด' : 'Top Power Consumer'}
            icon={<AlertCircle className="w-4 h-4 text-rose-500" />}
            summaryValue={`฿${mostExpensive ? mostExpensive.todayCost.toFixed(2) : '0.00'}`}
            summarySubtitle={mostExpensive ? mostExpensive.name : 'No appliance'}
            badgeText={lang === 'th' ? 'กินไฟอันดับ 1' : 'Top #1 Consumer'}
            badgeType="danger"
            explanationTitle={lang === 'th' ? 'คำแนะนำประหยัดทันที' : 'Immediate Saving Tip'}
            explanationText={mostExpensive ? (lang === 'th' ? mostExpensive.aiTip : mostExpensive.aiTipEn) : 'No data'}
            comparisonText={lang === 'th' ? 'คิดเป็น 45% ของค่าไฟรวมวันนี้' : 'Accounts for 45% of today’s spend'}
            formula={mostExpensive ? `${mostExpensive.watt}W × ${mostExpensive.hours}h ÷ 1000 × ฿4.20 = ฿${mostExpensive.todayCost.toFixed(2)}/day` : 'N/A'}
            rawMetrics={[
              { label: lang === 'th' ? 'กำลังไฟ (Watts)' : 'Power (W)', value: `${mostExpensive?.watt || 0} W` },
              { label: lang === 'th' ? 'ชั่วโมงทำงาน' : 'Usage Hours', value: `${mostExpensive?.hours || 0} ชม./วัน` },
              { label: lang === 'th' ? 'สถานะเครื่อง' : 'Status', value: mostExpensive?.status === 'active' ? '🟢 กำลังเปิด' : mostExpensive?.status === 'standby' ? '🟡 สแตนด์บาย' : '⚪ ปิดอยู่' },
              { label: lang === 'th' ? 'ห้องที่ติดตั้ง' : 'Room', value: mostExpensive?.room || 'Living Room' },
            ]}
            tariffBreakdown="On-Peak Load Contribution Rate"
            meterSource="CT Clamp Smart Sensor Node #AC-01"
            timestamp="2026-08-23 15:30:00"
            confidenceScore="99.4% Precision"
            recommendedAction={{
              label: lang === 'th' ? 'ดูและจัดการอุปกรณ์ทั้งหมดเพื่อตัดค่าไฟ' : 'Manage all devices to reduce bill',
              actionText: lang === 'th' ? 'จัดการ' : 'Manage',
              onExecute: () => setCurrentPage('appliances')
            }}
          />
        </div>
      </div>

      {/* 3. PRIORITY #2: TOP POWER CONSUMER APPLIANCES RANKING & WEATHER INSIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 3 Consuming Appliances List (Answers "เครื่องไหนกินไฟ" In-Depth) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`lg:col-span-2 p-6 md:p-7 rounded-[2.5rem] border transition-all shadow-sm ${
            isDarkMode 
              ? 'bg-slate-900/90 border-slate-800 text-white' 
              : 'bg-white border-slate-200/80 text-slate-900 shadow-slate-200/40'
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-rose-500/15 text-rose-500 font-black">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? '3 อุปกรณ์ที่กินไฟมากที่สุดในบ้าน' : 'Top 3 Power Consuming Appliances'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {lang === 'th' ? 'อุปกรณ์เหล่านี้ทำให้ค่าไฟสูงขึ้นมากที่สุดในวันนี้' : 'These devices account for the majority of today’s power usage.'}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setCurrentPage('appliances')}
              className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              <span>{lang === 'th' ? 'ดูทั้งหมด' : 'View All'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {sortedAppliances.slice(0, 3).map((appliance, index) => {
              const rankColor = index === 0 
                ? 'bg-rose-500 text-white' 
                : index === 1 
                  ? 'bg-amber-500 text-slate-950' 
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200';

              return (
                <div 
                  key={appliance.id}
                  onClick={() => setCurrentPage('appliances')}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group ${
                    isDarkMode 
                      ? 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600' 
                      : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className={`w-7 h-7 rounded-xl font-mono text-xs font-black flex items-center justify-center shrink-0 shadow-sm ${rankColor}`}>
                      #{index + 1}
                    </span>

                    {appliance.imageUrl && (
                      <img 
                        src={appliance.imageUrl} 
                        alt={appliance.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                      />
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                          {appliance.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold shrink-0">
                          {appliance.watt}W
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-medium">
                        {lang === 'th' ? appliance.aiTip : appliance.aiTipEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-700">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {lang === 'th' ? 'ค่าไฟวันนี้' : 'Cost Today'}
                      </span>
                      <span className="text-base font-black font-mono text-rose-500">
                        ฿{appliance.todayCost.toFixed(2)}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-slate-200/60 dark:bg-slate-700/60 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Weather & Immediate Efficiency Tip */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 md:p-7 rounded-[2.5rem] border transition-all flex flex-col justify-between shadow-sm ${
            isDarkMode 
              ? 'bg-slate-900/90 border-slate-800 text-white' 
              : 'bg-white border-slate-200/80 text-slate-900 shadow-slate-200/40'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500 font-bold">
                  <Sun className="w-5 h-5" />
                </div>
                <h3 className="font-black text-base font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'สภาพอากาศ & คำแนะนำ' : 'Weather & Saving Tip'}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                Bangkok ☀️
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-amber-500">34°C</span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {lang === 'th' ? 'แดดจัดช่วงบ่าย' : 'Hot & Sunny'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium leading-relaxed">
                {lang === 'th'
                  ? 'อากาศบ่ายนี้ร้อนจัด! ปรับแอร์เป็น 26°C ร่วมกับเปิดพัดลมส่าย จะช่วยประหยัดเงินได้ถึง ฿120 ในสัปดาห์นี้'
                  : 'Hot afternoon! Setting AC to 26°C with a fan saves up to ฿120 this week without sacrificing comfort.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('appliances')}
            className="w-full mt-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Snowflake className="w-4 h-4 text-teal-500" />
            <span>{lang === 'th' ? 'เปิดโหมดแอร์ประหยัดไฟ ➔' : 'Activate Eco AC Mode ➔'}</span>
          </button>
        </motion.div>
      </div>

      {/* AI Energy Optimization Tip (Persona-Aware) */}
      <EnergyTipWidget
        lang={lang}
        isDarkMode={isDarkMode}
        persona={persona}
      />

      {/* 4. PRIORITY #3: ENERGY CONSUMPTION FORECASTING WIDGET */}
      <EnergyConsumptionForecastWidget
        lang={lang}
        isDarkMode={isDarkMode}
        monthlyBudget={monthlyBudget}
        monthlyEstimate={monthlyEstimate}
        onNavigateToBudget={() => setCurrentPage('budget')}
        onNavigateToAppliances={() => setCurrentPage('appliances')}
      />

      {/* 5. MONTH-OVER-MONTH HISTORICAL ENERGY COMPARISON (Bar-by-Bar Breakdown) */}
      <HistoricalTrendChart
        isDarkMode={isDarkMode}
        lang={lang}
        persona={persona}
        infoDetailMode={infoDetailMode}
        onNavigatePage={setCurrentPage}
      />

      {/* 5. DIRECT TOOLS SHORTCUT TILES (High-Utility Hub) */}
      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">
          {lang === 'th' ? 'เครื่องมือวิเคราะห์และตัวช่วยประหยัดไฟ' : 'Energy Diagnostic & Analytical Tools'}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Compare Lab */}
          <div 
            onClick={() => setCurrentPage('compare')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer group flex items-center justify-between ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/60 shadow-sm' 
                : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold shadow-sm group-hover:scale-110 transition-transform">
                🧪
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900 dark:text-white font-display">
                    {lang === 'th' ? 'เปรียบเทียบอุปกรณ์' : 'Appliance Lab'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  {lang === 'th' ? 'เทียบ 2-5 เครื่องใช้ไฟฟ้า' : 'Compare 2-5 devices'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Smart Insights */}
          <div 
            onClick={() => setCurrentPage('insights')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer group flex items-center justify-between ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-800 hover:border-purple-500/60 shadow-sm' 
                : 'bg-white border-slate-200 hover:border-purple-400 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 font-extrabold shadow-sm group-hover:scale-110 transition-transform">
                🧠
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900 dark:text-white font-display">
                    {lang === 'th' ? 'Smart Insights' : 'Smart Insights'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  {lang === 'th' ? 'ตรวจจับกระชาก & What-If' : 'Anomalies & What-If'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Energy Saving Score Breakdown */}
          <div 
            onClick={() => setCurrentPage('score')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer group flex items-center justify-between ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/60 shadow-sm' 
                : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold shadow-sm group-hover:scale-110 transition-transform">
                🏆
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900 dark:text-white font-display">
                    {lang === 'th' ? 'ดัชนีประหยัดไฟ' : 'Saving Score'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  {lang === 'th' ? '76 คะแนน & วิธีเพิ่ม' : '76 Pts & optimization tips'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Learning & Academy Hub */}
          <div 
            onClick={() => setCurrentPage('learning')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer group flex items-center justify-between ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-800 hover:border-teal-500/60 shadow-sm' 
                : 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400 font-extrabold shadow-sm group-hover:scale-110 transition-transform">
                🎓
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900 dark:text-white font-display">
                    {lang === 'th' ? 'สถาบันพลังงาน & วินิจฉัย' : 'Energy Academy'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  {lang === 'th' ? 'ใบรับรอง 5 ระดับ & ควิซ' : '5 Cert Tiers & Quizzes'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-teal-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* 6. PRIORITY #5: SECONDARY GAMIFICATION & ECO ACTIVITIES SECTION (Positioned cleanly at bottom) */}
      {!gamificationSettings.cleanUtilityMode && gamificationSettings.homeEcoActivitiesVisible ? (
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500 font-black">
                🌱
              </div>
              <div>
                <h3 className="text-base font-black font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'กิจกรรมรักษ์โลก & ศูนย์ความสำเร็จ (Eco Activities & City Hub)' : 'Eco Activities & Gamification Hub'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {lang === 'th' ? 'สะสม XP ปลูกต้นไม้พลังงาน และสร้างเมืองสีเขียวจำลอง' : 'Complete optional eco quests, evolve your tree, and build a virtual green city.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowEcoActivities(!showEcoActivities)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              <span>{showEcoActivities ? (lang === 'th' ? 'ซ่อนส่วนนี้' : 'Collapse') : (lang === 'th' ? 'แสดงส่วนนี้' : 'Expand')}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showEcoActivities ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <AnimatePresence>
            {showEcoActivities && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                {/* Green City Impact Banner */}
                <ProjectCard
                  lang={lang}
                  isDarkMode={isDarkMode}
                  variant="dashboard"
                  onNavigateToCity={() => setCurrentPage('city')}
                  onNavigateToMissions={() => setCurrentPage('city')}
                  onNavigateToChallenges={() => setCurrentPage('city')}
                  onNavigateToView={(view) => {
                    if (view === 'missions' || view === 'challenges') {
                      setCurrentPage('city');
                    } else {
                      setCurrentPage(view as AppPage);
                    }
                  }}
                />

                {/* Eco Quests & Energy Tree Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Today's Daily Mission */}
                  <div className={`p-6 rounded-[2.5rem] border transition-all ${
                    isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-500">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h4 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
                          {lang === 'th' ? 'ภารกิจประหยัดประจำวันนี้' : "Today's Green Mission"}
                        </h4>
                      </div>
                      <button 
                        onClick={() => setCurrentPage('achievements')}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        {lang === 'th' ? 'ดูเควสทั้งหมด' : 'All Quests'}
                      </button>
                    </div>

                    {activeMission && (
                      <div className={`p-4 rounded-2xl border transition-all ${
                        isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-emerald-50/50 border-emerald-100'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500 text-white">
                                +{activeMission.xpReward} XP
                              </span>
                              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300">
                                +{activeMission.coinReward} Coins
                              </span>
                            </div>
                            <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {lang === 'th' ? activeMission.title : activeMission.titleEn}
                            </h5>
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                              {lang === 'th' ? activeMission.description : activeMission.descriptionEn}
                            </p>
                          </div>

                          <button
                            onClick={() => onCompleteMission(activeMission.id)}
                            disabled={activeMission.completed}
                            className={`px-5 py-2.5 rounded-2xl font-black text-xs shadow-md transition-all shrink-0 cursor-pointer ${
                              activeMission.completed
                                ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20 hover:scale-105 active:scale-95'
                            }`}
                          >
                            {activeMission.completed 
                              ? (lang === 'th' ? 'ทำเสร็จแล้ว ✓' : 'Completed ✓')
                              : (lang === 'th' ? 'ทำภารกิจสำเร็จ!' : 'Complete Mission!')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Energy Tree Widget */}
                  <div className={`p-6 rounded-[2.5rem] border transition-all ${
                    isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-500">
                          <TreePine className="w-5 h-5" />
                        </div>
                        <h4 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
                          {lang === 'th' ? 'ต้นไม้พลังงานของฉัน (Energy Tree)' : 'My Energy Tree'}
                        </h4>
                      </div>
                      <button 
                        onClick={() => setCurrentPage('achievements')}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        {lang === 'th' ? 'ดูการเติบโต' : 'View Growth'}
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-2xl shadow-lg shrink-0">
                        🪴
                      </div>
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-700 dark:text-slate-300">{lang === 'th' ? 'ต้นอ่อนกำลังเติบโต' : 'Growing Sapling'}</span>
                          <span className="text-emerald-500 font-black">Level {userLevel}</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }} />
                        </div>
                        <p className="text-[0.7rem] text-slate-500 dark:text-slate-400 font-medium">
                          {lang === 'th' ? 'ประหยัดไฟและทำเควสต่อเนื่องเพื่อปลดล็อกต้นไม้เรืองแสง' : 'Save electricity to evolve your tree into a glowing canopy.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : gamificationSettings.cleanUtilityMode ? (
        <div className="p-4.5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0 shadow-sm">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 dark:text-white block">
                {lang === 'th' ? '⚡ กำลังเปิดโหมดประหยัดไฟมือโปร (Clean Utility Mode)' : '⚡ Clean Utility Mode Active'}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                {lang === 'th' ? 'ซ่อนมินิเกมและสัตว์เลี้ยงเพื่อโฟกัสกับตัวเลขค่าไฟและการวิเคราะห์ 100%' : 'Gamification and quests are hidden for pure energy tracking and analytics.'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage('settings')}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-all self-start sm:self-auto cursor-pointer"
          >
            {lang === 'th' ? 'ปรับแต่งใน Settings' : 'Customize in Settings'}
          </button>
        </div>
      ) : null}

    </div>
  );
};

