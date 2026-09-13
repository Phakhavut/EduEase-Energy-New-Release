import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Sparkles, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Home, 
  PieChart as PieIcon, 
  Flame,
  Lightbulb,
  CheckCircle2,
  Calculator,
  Database,
  FileSpreadsheet,
  FileText,
  Info,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bot,
  BrainCircuit
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { AppPage, InfoDetailMode, UserPersona, Appliance } from '../../types';
import { EnergyDiagnosticQuickNav } from '../navigation/EnergyDiagnosticQuickNav';
import { ProgressiveCard } from '../common/ProgressiveCard';
import { HistoricalTrendChart } from '../HistoricalTrendChart';
import { WeeklyUsageHeatmap } from '../analytics/WeeklyUsageHeatmap';
import { PersonaPresentationPipelinePanel } from '../analytics/PersonaPresentationPipelinePanel';
import { getMonthlyComparison } from '../../data/monthlyComparisonData';

interface AnalyticsViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  infoDetailMode: InfoDetailMode;
  onExportPDF: () => void;
  onNavigatePage?: (page: AppPage) => void;
  persona?: UserPersona;
  appliances?: Appliance[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  lang,
  isDarkMode,
  infoDetailMode,
  onExportPDF,
  onNavigatePage,
  persona = 'student',
  appliances = [],
}) => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'heatmap' | 'weekly' | 'daily' | 'room' | 'appliance'>('monthly');

  const monthlyData = getMonthlyComparison(persona);
  const isSavings = monthlyData.costDiff < 0;

  const weeklyData = [
    { day: 'Mon', cost: 38, prevCost: 45, labelTh: 'จ.', labelEn: 'Mon', kwh: 9.0, provenance: 'Measured' },
    { day: 'Tue', cost: 42, prevCost: 48, labelTh: 'อ.', labelEn: 'Tue', kwh: 10.0, provenance: 'Measured' },
    { day: 'Wed', cost: 35, prevCost: 40, labelTh: 'พ.', labelEn: 'Wed', kwh: 8.3, provenance: 'Measured' },
    { day: 'Thu', cost: 50, prevCost: 52, labelTh: 'พฤ.', labelEn: 'Thu', kwh: 11.9, provenance: 'Measured' },
    { day: 'Fri', cost: 48, prevCost: 55, labelTh: 'ศ.', labelEn: 'Fri', kwh: 11.4, provenance: 'Measured' },
    { day: 'Sat', cost: 62, prevCost: 70, labelTh: 'ส.', labelEn: 'Sat', kwh: 14.7, provenance: 'Measured' },
    { day: 'Sun', cost: 58, prevCost: 65, labelTh: 'อา.', labelEn: 'Sun', kwh: 13.8, provenance: 'Predicted' },
  ];

  const hourly24Data = [
    { hour: '00:00', cost: 1.2, kwh: 0.3, label: '00:00' },
    { hour: '02:00', cost: 1.1, kwh: 0.28, label: '02:00' },
    { hour: '04:00', cost: 1.0, kwh: 0.25, label: '04:00' },
    { hour: '06:00', cost: 1.8, kwh: 0.45, label: '06:00' },
    { hour: '08:00', cost: 2.5, kwh: 0.62, label: '08:00' },
    { hour: '10:00', cost: 3.2, kwh: 0.8, label: '10:00' },
    { hour: '12:00', cost: 4.8, kwh: 1.2, label: '12:00' },
    { hour: '14:00', cost: 5.4, kwh: 1.35, label: '14:00 (Peak)' },
    { hour: '16:00', cost: 4.6, kwh: 1.15, label: '16:00' },
    { hour: '18:00', cost: 3.8, kwh: 0.95, label: '18:00' },
    { hour: '20:00', cost: 4.2, kwh: 1.05, label: '20:00' },
    { hour: '22:00', cost: 3.5, kwh: 0.88, label: '22:00' },
  ];

  const defaultRoomData = [
    { name: lang === 'th' ? 'ห้องนอน' : 'Bedroom', cost: 1250, kwh: 297, color: '#10b981', provenance: 'Calculated' },
    { name: lang === 'th' ? 'ห้องนั่งเล่น' : 'Living Room', cost: 850, kwh: 202, color: '#14b8a6', provenance: 'Calculated' },
    { name: lang === 'th' ? 'ห้องครัว' : 'Kitchen', cost: 450, kwh: 107, color: '#06b6d4', provenance: 'User-entered' },
    { name: lang === 'th' ? 'ห้องน้ำ' : 'Bathroom', cost: 230, kwh: 54, color: '#3b82f6', provenance: 'Estimated' },
  ];

  const defaultApplianceShareData = [
    { name: 'Air Conditioner 12000 BTU', watt: 1100, hours: 8, kwh: 264, cost: 1296, percent: 52, pf: 0.98, color: '#10b981', provenance: 'Measured' },
    { name: 'Smart Refrigerator 10 Cu.ft', watt: 80, hours: 24, kwh: 57.6, cost: 453, percent: 18, pf: 0.92, color: '#14b8a6', provenance: 'Measured' },
    { name: 'Desktop Gaming PC', watt: 450, hours: 5, kwh: 67.5, cost: 303, percent: 12, pf: 0.95, color: '#06b6d4', provenance: 'User-entered' },
    { name: 'Water Heater 3500W', watt: 3500, hours: 0.5, kwh: 52.5, cost: 236, percent: 10, pf: 0.88, color: '#f59e0b', provenance: 'Estimated' },
    { name: 'Other Lights & Fans', watt: 120, hours: 10, kwh: 36, cost: 212, percent: 8, pf: 0.90, color: '#6366f1', provenance: 'Predicted' },
  ];

  // Dynamic calculation linked to real appliances
  const applianceShareData = useMemo(() => {
    if (!appliances || appliances.length === 0) {
      return defaultApplianceShareData;
    }
    const rate = 4.2; // average progressive rate ฿/unit
    const totalKwh = appliances.reduce((sum, a) => {
      const w = a.watt || 100;
      const h = a.hours || 4;
      return sum + ((w * h * 30) / 1000);
    }, 0) || 1;

    const colors = ['#10b981', '#14b8a6', '#06b6d4', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6', '#3b82f6'];

    return appliances.map((a, idx) => {
      const watts = a.watt || 100;
      const hours = a.hours || 4;
      const monthlyKwh = Number(((watts * hours * 30) / 1000).toFixed(1));
      const cost = Math.round(monthlyKwh * rate);
      const percent = Math.max(1, Math.round((monthlyKwh / totalKwh) * 100));
      return {
        name: a.name,
        watt: watts,
        hours: hours,
        kwh: monthlyKwh,
        cost: cost,
        percent: percent,
        pf: a.pf || 0.95,
        color: colors[idx % colors.length],
        provenance: (a.dataSource === 'measured' ? 'Measured' : a.dataSource === 'calculated' ? 'Calculated' : 'Measured') as string
      };
    });
  }, [appliances]);

  const roomData = useMemo(() => {
    if (!appliances || appliances.length === 0) {
      return defaultRoomData;
    }
    const rate = 4.2;
    const roomMap: Record<string, { kwh: number; cost: number }> = {};
    const roomColors: Record<string, string> = {
      'bedroom': '#10b981',
      'living': '#14b8a6',
      'kitchen': '#06b6d4',
      'bathroom': '#3b82f6',
      'office': '#8b5cf6',
      'outdoor': '#f59e0b'
    };

    appliances.forEach(a => {
      const loc = (a.room || 'living').toLowerCase();
      const watts = a.watt || 100;
      const hours = a.hours || 4;
      const kwh = ((watts * hours * 30) / 1000);
      const cost = kwh * rate;
      if (!roomMap[loc]) {
        roomMap[loc] = { kwh: 0, cost: 0 };
      }
      roomMap[loc].kwh += kwh;
      roomMap[loc].cost += cost;
    });

    const entries = Object.entries(roomMap);
    if (entries.length === 0) return defaultRoomData;

    return entries.map(([loc, data]) => {
      const label = loc.includes('bed') || loc.includes('นอน') ? (lang === 'th' ? 'ห้องนอน' : 'Bedroom')
        : loc.includes('liv') || loc.includes('นั่งเล่น') ? (lang === 'th' ? 'ห้องนั่งเล่น' : 'Living Room')
        : loc.includes('kitch') || loc.includes('ครัว') ? (lang === 'th' ? 'ห้องครัว' : 'Kitchen')
        : loc.includes('bath') || loc.includes('น้ำ') ? (lang === 'th' ? 'ห้องน้ำ' : 'Bathroom')
        : loc.includes('off') || loc.includes('ทำงาน') ? (lang === 'th' ? 'ห้องทำงาน' : 'Office')
        : (lang === 'th' ? 'พื้นที่ทั่วไป' : 'General Area');
      return {
        name: label,
        cost: Math.round(data.cost),
        kwh: Number(data.kwh.toFixed(1)),
        color: roomColors[loc] || '#10b981',
        provenance: 'Calculated' as const
      };
    });
  }, [appliances, lang]);

  // CSV export handler
  const handleExportCSV = () => {
    const headers = ["Appliance Name", "Power (W)", "Usage (Hrs/Day)", "Monthly kWh", "Monthly Cost (THB)", "Power Factor", "Data Provenance"];
    const rows = applianceShareData.map(a => [
      `"${a.name}"`, a.watt, a.hours, a.kwh, a.cost, a.pf, `"${a.provenance}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `eduease_energy_report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="tour-step-analytics" className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. Page Header (Clean & intentional, no competing tabs or telemetry) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#15201A] dark:text-[#F5F7F8]">
            {lang === 'th' ? 'วิเคราะห์ค่าไฟ' : 'Bill Analytics'}
          </h2>
          <p className="text-xs text-[#53635A] dark:text-[#AAB4BE] mt-0.5">
            {lang === 'th' 
              ? 'สรุปที่มาของค่าไฟและคำแนะนำเพื่อการตัดสินใจที่คุ้มค่าที่สุด' 
              : 'Clear explanation of where your money goes and how to save.'}
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          {infoDetailMode === 'detailed' && (
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-[#16A34A]/30 bg-[#DCFCE7] dark:bg-[#16A34A]/10 text-[#15803D] dark:text-[#4ADE80] font-semibold text-xs transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'ส่งออก CSV' : 'Export CSV'}</span>
            </button>
          )}
          <button
            onClick={onExportPDF}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-xs transition-colors shadow-none"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? 'ดาวน์โหลดรายงาน' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* 2. STRICT REQUIREMENT (SECTION 44): THE FIRST VISUAL MUST BE AN EXPLANATION, NOT A CHART */}
      <div className={`p-5 sm:p-6 rounded-[16px] border transition-colors ${
        isDarkMode 
          ? 'bg-[#151C23] border-white/10 text-[#F5F7F8]' 
          : 'bg-[#FFFFFF] border-[#E2E8E4] text-[#15201A]'
      }`}>
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#16A34A]">
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'th' ? 'บทวิเคราะห์ค่าไฟล่าสุด' : 'Energy Trend Diagnosis'}</span>
        </div>

        {/* Primary Headline Statement */}
        <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[#15201A] dark:text-[#F5F7F8]">
          {isSavings 
            ? (lang === 'th' 
                ? `เดือนนี้ประหยัดค่าไฟได้ ${Math.abs(monthlyData.costDiffPct).toFixed(0)}%` 
                : `Electricity cost reduced by ${Math.abs(monthlyData.costDiffPct).toFixed(0)}% this month`)
            : (lang === 'th' 
                ? `เดือนนี้ค่าไฟสูงขึ้น ${Math.abs(monthlyData.costDiffPct).toFixed(0)}%` 
                : `Electricity cost increased by ${Math.abs(monthlyData.costDiffPct).toFixed(0)}% this month`)
          }
        </h3>

        {/* Secondary Explanation Box: "สาเหตุหลักคือ..." */}
        <div className="mt-4 p-4 rounded-[12px] bg-[#F6F8F7] dark:bg-[#1B242D] border border-[#E2E8E4] dark:border-white/10 space-y-2">
          <div className="text-xs font-bold text-[#78857D] uppercase tracking-wider">
            {lang === 'th' ? 'สาเหตุหลักคือ:' : 'Primary Reason:'}
          </div>
          <p className="text-sm font-medium text-[#15201A] dark:text-[#F5F7F8] leading-relaxed">
            {lang === 'th' ? monthlyData.topSavingReasonTh : monthlyData.topSavingReasonEn}
          </p>
          <div className="pt-2 border-t border-[#E2E8E4] dark:border-white/10 flex items-start gap-2 text-xs text-[#53635A] dark:text-[#AAB4BE]">
            <span className="font-semibold text-[#16A34A] shrink-0">
              {lang === 'th' ? 'สิ่งที่ทำได้ทันที:' : 'Actionable Tip:'}
            </span>
            <span>
              {lang === 'th'
                ? 'ปรับอุณหภูมิแอร์เป็น 26°C ร่วมกับพัดลม และเปิดสวิตช์ Eco Cut ตัดไฟ Standby สามารถประหยัดได้ราว ฿210/เดือน'
                : 'Setting AC to 26°C with fan and enabling Eco Cut cuts power draw by ~฿210/month.'}
            </span>
          </div>
        </div>

        {/* Key Metrics Strip */}
        <div className="mt-4 grid grid-cols-3 gap-3 pt-3 border-t border-[#E2E8E4] dark:border-white/10 text-xs">
          <div>
            <span className="text-[#78857D] block">{lang === 'th' ? 'บิลเดือนนี้' : 'Current Bill'}</span>
            <span className="text-base font-bold font-mono text-[#15201A] dark:text-[#F5F7F8] tabular-nums">
              ฿{monthlyData.currentMonth.totalCost.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[#78857D] block">{lang === 'th' ? 'บิลเดือนก่อน' : 'Previous Month'}</span>
            <span className="text-base font-bold font-mono text-[#15201A] dark:text-[#F5F7F8] tabular-nums">
              ฿{monthlyData.previousMonth.totalCost.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[#78857D] block">{lang === 'th' ? 'ผลต่าง' : 'Difference'}</span>
            <span className={`text-base font-bold font-mono tabular-nums ${isSavings ? 'text-[#16A34A]' : 'text-amber-500'}`}>
              {isSavings ? '-' : '+'}฿{Math.abs(monthlyData.costDiff).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 3. SUPPORTING CHART (Directly answers and validates the explanation above) */}
      <div className={`p-5 sm:p-6 rounded-[16px] border transition-colors ${
        isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-sm text-[#15201A] dark:text-[#F5F7F8] font-display">
              {lang === 'th' ? 'กราฟเปรียบเทียบค่าไฟเดือนนี้ vs เดือนก่อน' : 'Monthly Trend Comparison'}
            </h4>
            <p className="text-xs text-[#78857D]">
              {lang === 'th' ? 'แสดงการใช้ไฟฟ้ารายสัปดาห์ในรอบบิลปัจจุบัน' : 'Weekly energy usage across current billing cycle'}
            </p>
          </div>
        </div>

        {/* Supporting Bar Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={isDarkMode ? 0.08 : 0.4} />
              <XAxis dataKey={lang === 'th' ? 'labelTh' : 'labelEn'} stroke="#78857D" fontSize={11} tickLine={false} />
              <YAxis stroke="#78857D" fontSize={11} unit="฿" tickLine={false} />
              <Tooltip
                formatter={(value: any, name: any) => [
                  `฿${value}`, 
                  name === 'cost' ? (lang === 'th' ? 'สัปดาห์นี้' : 'This Week') : (lang === 'th' ? 'สัปดาห์ก่อน' : 'Prior Week')
                ]}
                contentStyle={{ 
                  borderRadius: '10px', 
                  background: isDarkMode ? '#1B242D' : '#FFFFFF', 
                  border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8E4',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="prevCost" fill={isDarkMode ? '#334155' : '#E2E8E4'} radius={[6, 6, 0, 0]} name="prevCost" />
              <Bar dataKey="cost" fill="#16A34A" radius={[6, 6, 0, 0]} name="cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. PROGRESSIVE DISCLOSURE: DEEPER EXPLORATION (Optional secondary tabs) */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-[#78857D] uppercase tracking-wider">
            {lang === 'th' ? 'ดูการวิเคราะห์เจาะลึกเพิ่มเติม' : 'Detailed Breakdown'}
          </h4>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'monthly', th: 'เปรียบเทียบเครื่องใช้ไฟฟ้า', en: 'Appliance Breakdown' },
            { id: 'heatmap', th: 'แผนที่การใช้ไฟรายชั่วโมง (Heatmap)', en: 'Hourly Heatmap' },
            { id: 'room', th: 'วิเคราะห์ตามห้อง', en: 'Room Share' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-[10px] text-xs font-medium transition-colors shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#16A34A] text-white font-semibold'
                  : isDarkMode
                    ? 'bg-[#1B242D] text-[#AAB4BE] hover:text-[#F5F7F8]'
                    : 'bg-[#F6F8F7] text-[#53635A] hover:text-[#15201A] border border-[#E2E8E4]'
              }`}
            >
              {lang === 'th' ? tab.th : tab.en}
            </button>
          ))}
        </div>

        {/* Secondary View Content */}
        {activeTab === 'heatmap' ? (
          <WeeklyUsageHeatmap
            lang={lang}
            isDarkMode={isDarkMode}
            infoDetailMode={infoDetailMode}
            appliances={appliances}
            persona={persona}
            onNavigateToAppliances={() => onNavigatePage && onNavigatePage('appliances')}
          />
        ) : activeTab === 'room' ? (
          <div className={`p-5 rounded-[16px] border ${
            isDarkMode ? 'bg-[#151C23] border-white/10' : 'bg-[#FFFFFF] border-[#E2E8E4]'
          }`}>
            <h5 className="font-bold text-sm text-[#15201A] dark:text-[#F5F7F8] mb-3">
              {lang === 'th' ? 'สัดส่วนค่าไฟแบ่งตามห้องใช้งาน' : 'Electricity Spend by Room'}
            </h5>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roomData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={isDarkMode ? 0.08 : 0.4} />
                  <XAxis dataKey="name" stroke="#78857D" fontSize={11} tickLine={false} />
                  <YAxis stroke="#78857D" fontSize={11} unit="฿" tickLine={false} />
                  <Tooltip
                    formatter={(value: any) => [`฿${value}`, 'Cost']}
                    contentStyle={{ borderRadius: '10px', background: isDarkMode ? '#1B242D' : '#FFFFFF', border: '1px solid #E2E8E4' }}
                  />
                  <Bar dataKey="cost" fill="#16A34A" radius={[6, 6, 0, 0]}>
                    {roomData.map((entry, index) => (
                      <Cell key={`room-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <HistoricalTrendChart
            isDarkMode={isDarkMode}
            lang={lang}
            persona={persona}
            infoDetailMode={infoDetailMode}
            onNavigatePage={onNavigatePage}
          />
        )}
      </div>
    </div>
  );
};
