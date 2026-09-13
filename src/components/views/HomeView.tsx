import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp,
  Sliders,
  ChevronRight,
  FileText,
  Clock,
  GraduationCap,
  Zap,
  Leaf
} from 'lucide-react';
import { Mission, Appliance, AppPage, InfoDetailMode, GamificationSettings, DEFAULT_GAMIFICATION_SETTINGS, UserPersona, Badge, LearningPath } from '../../types';
import { WhatIfSimulationModal } from '../simulation/WhatIfSimulationModal';
import { ApplianceDetailModal } from '../appliances/ApplianceDetailModal';
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
  badges?: Badge[];
  learningPaths?: LearningPath[];
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
  infoDetailMode = 'balanced',
  onStartPageTour,
  onOpenMonthlyReport,
  onTriggerBudgetToast,
  gamificationSettings = DEFAULT_GAMIFICATION_SETTINGS,
  persona = 'student',
  badges,
  learningPaths,
}) => {
  // Modal states
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState<Appliance | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Sort appliances by cost to determine contributors
  const sortedAppliances = [...appliances].sort((a, b) => b.todayCost - a.todayCost);
  const mostExpensive = sortedAppliances[0] || appliances[0];

  const monthlyData = getMonthlyComparison(persona);
  const budgetPercent = Math.min(100, Math.round((monthlyEstimate / monthlyBudget) * 100));
  
  // Budget status logic (Green / Yellow / Red)
  const isOverBudget = monthlyEstimate > monthlyBudget;
  const isWarningBudget = budgetPercent >= 85 && !isOverBudget;
  const budgetStatusText = isOverBudget
    ? (lang === 'th' ? 'เกินงบ' : 'Over Budget')
    : isWarningBudget
      ? (lang === 'th' ? 'ใกล้เต็มงบ' : 'Near Limit')
      : (lang === 'th' ? 'อยู่ในงบ' : 'Within Budget');

  const openApplianceDetail = (app: Appliance) => {
    setSelectedAppliance(app);
    setIsDetailModalOpen(true);
  };

  // Top contributors with realistic energy percentages
  const topContributors = [
    {
      id: 1,
      nameTh: 'แอร์ (Air Conditioner)',
      nameEn: 'Air Conditioner',
      icon: '❄️',
      percent: 48,
      cost: 618,
      hours: '5.2 ชม./วัน',
      watt: '1,200 W',
    },
    {
      id: 2,
      nameTh: 'คอมพิวเตอร์ (Computer)',
      nameEn: 'Computer',
      icon: '💻',
      percent: 21,
      cost: 270,
      hours: '6.5 ชม./วัน',
      watt: '350 W',
    },
    {
      id: 3,
      nameTh: 'เครื่องทำน้ำอุ่น (Water Heater)',
      nameEn: 'Water Heater',
      icon: '🚿',
      percent: 14,
      cost: 180,
      hours: '0.4 ชม./วัน',
      watt: '3,500 W',
    }
  ];

  return (
    <div id="tour-step-home" className="space-y-4 md:space-y-5 animate-fade-in pb-16 lg:pb-8 w-full">
      {/* ----------------------------------------------------
          CONTEXT / HEADER (Flat, compact, zero waste)
          ---------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#15201A] dark:text-[#F5F7F8]">
              {lang === 'th' ? 'สวัสดี Namyen 👋' : 'Hello Namyen 👋'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-[8px] text-xs font-semibold bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80]">
              {lang === 'th' ? 'หอพัก My Dorm' : 'My Dorm'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#78857D] mt-0.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? 'รอบบิลปัจจุบัน: 1–31 ส.ค. 2026' : 'Billing cycle: 1–31 Aug 2026'}</span>
          </div>
        </div>

        {/* Compact action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenMonthlyReport && (
            <button
              onClick={onOpenMonthlyReport}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border text-xs font-semibold transition-colors ${
                isDarkMode 
                  ? 'bg-[#151C23] border-white/10 hover:bg-[#1B242D] text-[#F5F7F8]' 
                  : 'bg-[#FFFFFF] border-[#E2E8E4] hover:bg-[#F6F8F7] text-[#15201A]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>{lang === 'th' ? 'รายงาน PDF' : 'PDF Report'}</span>
            </button>
          )}

          {onStartPageTour && (
            <button
              onClick={() => onStartPageTour(0)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80] text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'แนะนำวิธีดู' : 'Quick Tour'}</span>
            </button>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------
          12-COLUMN DASHBOARD GRID
          Desktop >= 1280px: 12 cols, gap: 20px
          Laptop 1024-1279px: 12 cols, gap: 16px
          Tablet 768-1023px: 8 cols, gap: 16px
          Mobile < 768px: 4 cols, gap: 12px
          ---------------------------------------------------- */}
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3 md:gap-4 xl:gap-5">

        {/* ====================================================
            ROW 1: HOME KPI SUMMARY (3 Widgets: 4 + 4 + 4 cols)
            Mobile: 4 cols (primary) + 2 cols + 2 cols (secondary)
            Tablet: 4 cols + 4 cols + 8 cols
            ==================================================== */}

        {/* KPI 1: ค่าไฟเดือนนี้ (4 cols) */}
        <div className={`col-span-4 md:col-span-4 lg:col-span-4 min-h-[132px] p-5 rounded-[16px] border flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#53635A] dark:text-[#AAB4BE]">
              {lang === 'th' ? 'ค่าไฟเดือนนี้' : 'Current Month Cost'}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <TrendingUp className="w-3 h-3" />
              <span>+12%</span>
            </span>
          </div>

          <div className="my-1">
            <div className="text-3xl lg:text-[38px] font-bold font-mono tracking-tight text-[#15201A] dark:text-[#F5F7F8] tabular-nums leading-none">
              ฿{monthlyEstimate.toLocaleString()}
            </div>
          </div>

          <div className="text-[13px] text-[#78857D] flex items-center justify-between">
            <span>{lang === 'th' ? 'เทียบเดือนก่อน (฿1,145)' : 'vs last mo (฿1,145)'}</span>
            <span className="font-medium text-amber-600 dark:text-amber-400 font-mono">+฿139</span>
          </div>
        </div>

        {/* KPI 2: งบค่าไฟ (4 cols) */}
        <div className={`col-span-2 md:col-span-4 lg:col-span-4 min-h-[132px] p-5 rounded-[16px] border flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#53635A] dark:text-[#AAB4BE]">
              {lang === 'th' ? 'งบค่าไฟ' : 'Target Budget'}
            </span>
            <span className={`px-2 py-0.5 rounded-[6px] text-xs font-semibold ${
              isOverBudget 
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' 
                : isWarningBudget 
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                  : 'bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80]'
            }`}>
              {budgetStatusText}
            </span>
          </div>

          <div className="my-1">
            <div className="text-3xl lg:text-[38px] font-bold font-mono tracking-tight text-[#15201A] dark:text-[#F5F7F8] tabular-nums leading-none">
              ฿{monthlyBudget.toLocaleString()}
            </div>
          </div>

          <div>
            <div className="w-full h-1.5 rounded-full bg-[#E2E8E4] dark:bg-white/10 overflow-hidden mb-1.5">
              <div 
                className={`h-full rounded-full transition-all ${
                  isOverBudget ? 'bg-rose-500' : isWarningBudget ? 'bg-amber-500' : 'bg-[#16A34A]'
                }`}
                style={{ width: `${Math.min(100, budgetPercent)}%` }}
              />
            </div>
            <div className="text-[13px] text-[#78857D] flex items-center justify-between">
              <span>{lang === 'th' ? `ใช้ไปแล้ว ${budgetPercent}%` : `${budgetPercent}% spent`}</span>
              <span className="font-mono">฿{monthlyEstimate.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* KPI 3: คาดการณ์สิ้นเดือน (4 cols) */}
        <div className={`col-span-2 md:col-span-8 lg:col-span-4 min-h-[132px] p-5 rounded-[16px] border flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#53635A] dark:text-[#AAB4BE]">
              {lang === 'th' ? 'คาดการณ์สิ้นเดือน' : 'Month-End Forecast'}
            </span>
            <span className="text-xs font-semibold text-[#78857D]">
              {lang === 'th' ? 'ประมาณการ' : 'Projected'}
            </span>
          </div>

          <div className="my-1">
            <div className="text-3xl lg:text-[38px] font-bold font-mono tracking-tight text-[#15803D] dark:text-[#4ADE80] tabular-nums leading-none">
              ฿{Math.round(monthlyEstimate * 1.04).toLocaleString()}
            </div>
          </div>

          <div className="text-[13px] text-[#78857D] flex items-center justify-between">
            <span>{lang === 'th' ? 'เฉลี่ยต่อวัน' : 'Daily avg'}</span>
            <span className="font-mono">฿{(monthlyEstimate / 30).toFixed(0)}/d</span>
          </div>
        </div>

        {/* ====================================================
            ROW 2: HOME CONTENT ROW 2 (6 cols + 6 cols)
            Left: “เงินค่าไฟถูกใช้กับอะไร?” (Top contributors breakdown)
            Right: “ทำไมเดือนนี้สูงขึ้น?” (Root cause insight)
            ==================================================== */}

        {/* 6 columns: “เงินค่าไฟถูกใช้กับอะไร?” */}
        <div className={`col-span-4 md:col-span-8 lg:col-span-6 min-h-[240px] p-5 rounded-[16px] border flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-bold text-[#15201A] dark:text-[#F5F7F8] font-display">
                  {lang === 'th' ? 'เงินค่าไฟถูกใช้กับอะไร?' : 'Where is money spent?'}
                </h2>
                <p className="text-xs text-[#78857D] mt-0.5">
                  {lang === 'th' ? 'สัดส่วนเครื่องใช้ไฟฟ้าที่กินไฟสูงสุดในห้อง' : 'Top energy-consuming appliances in your dorm'}
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('appliances')}
                className="text-xs font-semibold text-[#15803D] dark:text-[#4ADE80] hover:underline flex items-center gap-0.5"
              >
                <span>{lang === 'th' ? 'ดูทั้งหมด' : 'View all'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List rows with dividers (flat depth, max 2 levels) */}
            <div className="divide-y divide-[#E2E8E4] dark:divide-white/10">
              {topContributors.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => openApplianceDetail(sortedAppliances[item.id - 1] || mostExpensive)}
                  className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 cursor-pointer group hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#15201A] dark:text-[#F5F7F8] truncate">
                        {lang === 'th' ? item.nameTh : item.nameEn}
                      </div>
                      <div className="text-[11px] text-[#78857D]">
                        {item.hours} • {item.watt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-20 sm:w-28 h-1.5 rounded-full bg-[#E2E8E4] dark:bg-white/10 overflow-hidden hidden sm:block">
                      <div 
                        className={`h-full rounded-full ${item.percent > 40 ? 'bg-[#16A34A]' : 'bg-[#78857D]'}`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold font-mono text-[#15201A] dark:text-[#F5F7F8] tabular-nums">
                        {item.percent}%
                      </div>
                      <div className="text-[11px] text-[#78857D] font-mono">
                        ≈ ฿{item.cost}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#E2E8E4] dark:border-white/10 flex items-center justify-between text-xs text-[#53635A] dark:text-[#AAB4BE]">
            <span>{lang === 'th' ? 'อุปกรณ์อื่นๆ รวม 17%' : 'Other devices 17%'}</span>
            <span className="font-mono text-[#78857D]">≈ ฿216</span>
          </div>
        </div>

        {/* 6 columns: “ทำไมเดือนนี้สูงขึ้น?” */}
        <div className={`col-span-4 md:col-span-8 lg:col-span-6 min-h-[240px] p-5 rounded-[16px] border flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-bold text-[#15201A] dark:text-[#F5F7F8] font-display">
                  {lang === 'th' ? 'ทำไมเดือนนี้สูงขึ้น?' : 'Why did it increase?'}
                </h2>
                <p className="text-xs text-[#78857D] mt-0.5">
                  {lang === 'th' ? 'วิเคราะห์สาเหตุหลักจากการเปรียบเทียบรอบบิล' : 'Primary drivers based on billing comparison'}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-[6px] text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                +12% (+฿139)
              </span>
            </div>

            {/* Core Diagnostic Explanation */}
            <div className="p-3.5 rounded-[12px] bg-[#F6F8F7] dark:bg-[#1B242D] border border-[#E2E8E4] dark:border-white/10 mb-3">
              <div className="text-xs font-bold text-[#78857D] uppercase tracking-wider mb-1">
                {lang === 'th' ? 'สาเหตุหลัก:' : 'Primary Reason:'}
              </div>
              <p className="text-xs font-medium text-[#15201A] dark:text-[#F5F7F8] leading-relaxed">
                {lang === 'th'
                  ? 'ช่วง 18:00–23:00 มีการเปิดเครื่องปรับอากาศต่อเนื่องยาวนานขึ้นในวันที่อากาศร้อนจัด คิดเป็น 65% ของค่าไฟส่วนต่างที่เพิ่มขึ้น'
                  : 'Prolonged AC runtime between 18:00–23:00 on hotter days accounts for 65% of the total monthly cost delta.'}
              </p>
            </div>

            {/* Comparison Metrics Tile */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-[10px] bg-[#F6F8F7] dark:bg-[#1B242D]">
                <span className="text-[#78857D] block text-[11px]">{lang === 'th' ? 'เดือนก่อน' : 'Last Month'}</span>
                <span className="font-bold font-mono text-[#15201A] dark:text-[#F5F7F8]">฿1,145</span>
              </div>
              <div className="p-2.5 rounded-[10px] bg-[#F6F8F7] dark:bg-[#1B242D]">
                <span className="text-[#78857D] block text-[11px]">{lang === 'th' ? 'ช่วงพีคโหลด' : 'Peak Window'}</span>
                <span className="font-bold text-[#15201A] dark:text-[#F5F7F8]">18:00 – 23:00</span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#E2E8E4] dark:border-white/10 flex items-center justify-between">
            <span className="text-xs text-[#78857D]">
              {lang === 'th' ? 'วิเคราะห์ด้วยโมเดลเทียบรอบบิล' : 'Billing model diagnosis'}
            </span>
            <button
              onClick={() => setCurrentPage('analytics')}
              className="text-xs font-semibold text-[#15803D] dark:text-[#4ADE80] hover:underline flex items-center gap-1"
            >
              <span>{lang === 'th' ? 'ดูบทวิเคราะห์เต็ม' : 'Full Analytics'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ====================================================
            ROW 3: HOME CONTENT ROW 3 (6 cols + 6 cols)
            Left: “เริ่มลดตรงไหนดี?” (Actionable recommendations)
            Right: “การใช้ไฟวันนี้ & ความคืบหน้า” (Today's telemetry)
            ==================================================== */}

        {/* 6 columns: “เริ่มลดตรงไหนดี?” */}
        <div className={`col-span-4 md:col-span-8 lg:col-span-6 min-h-[240px] p-5 rounded-[16px] border flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-bold text-[#15201A] dark:text-[#F5F7F8] font-display">
                  {lang === 'th' ? 'เริ่มลดตรงไหนดี?' : 'Where to start saving?'}
                </h2>
                <p className="text-xs text-[#78857D] mt-0.5">
                  {lang === 'th' ? '3 ขั้นตอนที่ประหยัดได้ทันทีโดยไม่เสียความสบาย' : 'Top 3 targeted actions with proven savings'}
                </p>
              </div>
              <button
                onClick={() => setIsWhatIfOpen(true)}
                className="px-2.5 py-1 rounded-[8px] bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80] text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <Sliders className="w-3 h-3" />
                <span>What-If</span>
              </button>
            </div>

            {/* 3 Action Rows with dividers */}
            <div className="divide-y divide-[#E2E8E4] dark:divide-white/10 text-xs">
              <div className="py-2 first:pt-0 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#DCFCE7] dark:bg-[#16A34A]/20 text-[#15803D] dark:text-[#4ADE80] text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <span className="font-semibold text-[#15201A] dark:text-[#F5F7F8]">
                      {lang === 'th' ? 'ปรับแอร์ 26°C + พัดลม' : 'Set AC to 26°C + Fan'}
                    </span>
                    <span className="text-[11px] text-[#78857D] block">
                      {lang === 'th' ? 'ลดภาระคอมเพรสเซอร์ช่วงอากาศร้อน' : 'Cuts compressor workload during hot hours'}
                    </span>
                  </div>
                </div>
                <span className="font-bold font-mono text-[#15803D] dark:text-[#4ADE80] shrink-0">
                  ~฿110/ด.
                </span>
              </div>

              <div className="py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#DCFCE7] dark:bg-[#16A34A]/20 text-[#15803D] dark:text-[#4ADE80] text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <span className="font-semibold text-[#15201A] dark:text-[#F5F7F8]">
                      {lang === 'th' ? 'ตัดไฟ Standby คอมพิวเตอร์' : 'Sleep PC & stop standby'}
                    </span>
                    <span className="text-[11px] text-[#78857D] block">
                      {lang === 'th' ? 'ตั้ง sleep 15 นาที และปิดสวิตช์ปลั๊กพ่วง' : 'Auto-sleep after 15m & switch off strip'}
                    </span>
                  </div>
                </div>
                <span className="font-bold font-mono text-[#15803D] dark:text-[#4ADE80] shrink-0">
                  ~฿55/ด.
                </span>
              </div>

              <div className="py-2 last:pb-0 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#DCFCE7] dark:bg-[#16A34A]/20 text-[#15803D] dark:text-[#4ADE80] text-[11px] font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <span className="font-semibold text-[#15201A] dark:text-[#F5F7F8]">
                      {lang === 'th' ? 'กระชับเวลาเปิดน้ำอุ่น' : 'Optimize shower heater'}
                    </span>
                    <span className="text-[11px] text-[#78857D] block">
                      {lang === 'th' ? 'ลดเวลาลง 5 นาที และใช้ความร้อนปานกลาง' : 'Shorten by 5 mins at medium heat dial'}
                    </span>
                  </div>
                </div>
                <span className="font-bold font-mono text-[#15803D] dark:text-[#4ADE80] shrink-0">
                  ~฿35/ด.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#E2E8E4] dark:border-white/10 flex items-center justify-between">
            <span className="text-xs font-medium text-[#78857D]">
              {lang === 'th' ? 'รวมศักยภาพประหยัด:' : 'Total potential savings:'}
            </span>
            <span className="text-xs font-bold font-mono text-[#15803D] dark:text-[#4ADE80]">
              ฿200 / {lang === 'th' ? 'เดือน' : 'mo'}
            </span>
          </div>
        </div>

        {/* 6 columns: “การใช้ไฟวันนี้ & ความคืบหน้า” */}
        <div className={`col-span-4 md:col-span-8 lg:col-span-6 min-h-[240px] p-5 rounded-[16px] border flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-bold text-[#15201A] dark:text-[#F5F7F8] font-display">
                  {lang === 'th' ? 'การใช้ไฟวันนี้ & ความคืบหน้า' : 'Today & Progress'}
                </h2>
                <p className="text-xs text-[#78857D] mt-0.5">
                  {lang === 'th' ? 'สถานะการใช้ไฟฟ้าประจำวันและยอดประหยัดสะสม' : 'Daily consumption rate and verified savings'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D] dark:text-[#4ADE80]">
                <Leaf className="w-3.5 h-3.5" />
                <span>+12%</span>
              </span>
            </div>

            {/* Quick Metrics Tile */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2.5 rounded-[10px] bg-[#F6F8F7] dark:bg-[#1B242D]">
                <span className="text-[11px] text-[#78857D] block">{lang === 'th' ? 'วันนี้ใช้ไปแล้ว' : 'Spent Today'}</span>
                <span className="text-base font-bold font-mono text-[#15201A] dark:text-[#F5F7F8] tabular-nums">
                  ฿{todayCost.toFixed(0)}
                </span>
                <span className="text-[10px] text-[#15803D] dark:text-[#4ADE80] block mt-0.5">
                  {lang === 'th' ? 'อยู่ในเกณฑ์ปกติ' : 'Normal Pace'}
                </span>
              </div>

              <div className="p-2.5 rounded-[10px] bg-[#F6F8F7] dark:bg-[#1B242D]">
                <span className="text-[11px] text-[#78857D] block">{lang === 'th' ? 'ประหยัดสะสมเดือนนี้' : 'Verified Savings'}</span>
                <span className="text-base font-bold font-mono text-[#15803D] dark:text-[#4ADE80] tabular-nums">
                  ฿{moneySavedMonth || 82}
                </span>
                <span className="text-[10px] text-[#78857D] block mt-0.5">
                  {lang === 'th' ? 'ลด CO₂ 14.2 kg' : 'Cut 14.2kg CO₂'}
                </span>
              </div>
            </div>

            {/* 4 Time-of-Use Distribution Bars */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[11px] text-[#78857D]">
                <span>{lang === 'th' ? 'การกระจายตัวตามช่วงเวลา' : 'Time Distribution'}</span>
                <span className="font-semibold text-amber-500">{lang === 'th' ? 'พีคช่วงค่ำ (52%)' : 'Evening Peak (52%)'}</span>
              </div>
              <div className="grid grid-cols-4 gap-1 h-2 rounded-full overflow-hidden bg-[#E2E8E4] dark:bg-white/10">
                <div className="bg-[#AAB4BE] h-full" title="06:00-12:00: 15%" />
                <div className="bg-[#78857D] h-full" title="12:00-18:00: 20%" />
                <div className="bg-amber-500 h-full" title="18:00-24:00: 52% Peak" />
                <div className="bg-[#CBD5E1] dark:bg-[#334155] h-full" title="00:00-06:00: 13%" />
              </div>
              <div className="flex justify-between text-[10px] text-[#78857D]">
                <span>06-12h</span>
                <span>12-18h</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">18-24h</span>
                <span>00-06h</span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#E2E8E4] dark:border-white/10 flex items-center justify-between text-xs">
            <span className="text-[#78857D]">
              {lang === 'th' ? 'อัตราเฉลี่ยเป้าหมาย: ฿42/วัน' : 'Target rate: ฿42/day'}
            </span>
            <button
              onClick={() => setCurrentPage('analytics')}
              className="font-semibold text-[#15803D] dark:text-[#4ADE80] hover:underline flex items-center gap-0.5"
            >
              <span>{lang === 'th' ? 'ดูกราฟ 24 ชม.' : '24h Curve'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ====================================================
            ROW 4: INTERACTIVE SIMULATION BANNER (12 cols)
            ==================================================== */}
        <div className={`col-span-4 md:col-span-8 lg:col-span-12 p-4 sm:p-5 rounded-[16px] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
          isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80] flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#15201A] dark:text-[#F5F7F8]">
                {lang === 'th' 
                  ? 'อยากรู้ว่าเปลี่ยนพฤติกรรมแล้วบิลจะลดเท่าไหร่?' 
                  : 'Want to preview how your bill drops before changing habits?'}
              </div>
              <div className="text-xs text-[#78857D] mt-0.5">
                {lang === 'th' 
                  ? 'ทดลองเลื่อนปรับชั่วโมงแอร์และอุณหภูมิในแบบจำลองเพื่อดูยอดประหยัดจริง' 
                  : 'Simulate AC temperature and runtime adjustments to see instant projected savings.'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsWhatIfOpen(true)}
            className="px-3.5 py-2 rounded-[10px] bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>{lang === 'th' ? 'ลองจำลองผลลัพธ์ (What-If)' : 'Simulate Savings'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ====================================================
            ROW 5: LEARNING LESSON (12 cols - contextual & compact)
            ==================================================== */}
        {!gamificationSettings.cleanUtilityMode && (
          <div className={`col-span-4 md:col-span-8 lg:col-span-12 p-4 rounded-[16px] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
            isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#15201A] dark:text-[#F5F7F8]">
                  {lang === 'th'
                    ? 'บทเรียน 2 นาที: ทำไมเพิ่มแอร์ 1°C ถึงประหยัดไฟได้ 10%?'
                    : '2-min Lesson: Why does raising AC 1°C cut bill by 10%?'}
                </span>
                <span className="text-[11px] text-[#78857D] block">
                  {lang === 'th' ? 'เข้าใจภาระคอมเพรสเซอร์และการถ่ายเทความร้อน' : 'Understand compressor heat transfer basics'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('learning')}
              className="text-xs font-semibold text-[#15803D] dark:text-[#4ADE80] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>{lang === 'th' ? 'เริ่มอ่าน (+20 XP)' : 'Read (+20 XP)'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* ----------------------------------------------------
          MODALS
          ---------------------------------------------------- */}
      <WhatIfSimulationModal
        isOpen={isWhatIfOpen}
        onClose={() => setIsWhatIfOpen(false)}
        lang={lang}
        isDarkMode={isDarkMode}
        currentBill={monthlyEstimate}
        onApplyGoal={(saved, title) => {
          if (onCompleteMission && dailyMissions[0]) {
            onCompleteMission(dailyMissions[0].id);
          }
        }}
      />

      <ApplianceDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        appliance={selectedAppliance}
        allAppliances={appliances}
        lang={lang}
        isDarkMode={isDarkMode}
        infoDetailMode={infoDetailMode}
        onOpenWhatIf={() => setIsWhatIfOpen(true)}
      />
    </div>
  );
};
