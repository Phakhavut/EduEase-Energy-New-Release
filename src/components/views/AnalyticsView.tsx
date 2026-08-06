import React, { useState } from 'react';
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
  Zap
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
  Cell
} from 'recharts';
import { InfoDetailMode } from '../../types';
import { ProgressiveCard } from '../common/ProgressiveCard';

interface AnalyticsViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  infoDetailMode: InfoDetailMode;
  onExportPDF: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  lang,
  isDarkMode,
  infoDetailMode,
  onExportPDF,
}) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'daily' | 'monthly' | 'room' | 'appliance'>('weekly');

  const weeklyData = [
    { day: 'Mon', cost: 38, prevCost: 45, labelTh: 'จ.', labelEn: 'Mon', kwh: 9.0, provenance: 'Measured' },
    { day: 'Tue', cost: 42, prevCost: 48, labelTh: 'อ.', labelEn: 'Tue', kwh: 10.0, provenance: 'Measured' },
    { day: 'Wed', cost: 35, prevCost: 40, labelTh: 'พ.', labelEn: 'Wed', kwh: 8.3, provenance: 'Measured' },
    { day: 'Thu', cost: 50, prevCost: 52, labelTh: 'พฤ.', labelEn: 'Thu', kwh: 11.9, provenance: 'Measured' },
    { day: 'Fri', cost: 48, prevCost: 55, labelTh: 'ศ.', labelEn: 'Fri', kwh: 11.4, provenance: 'Measured' },
    { day: 'Sat', cost: 62, prevCost: 70, labelTh: 'ส.', labelEn: 'Sat', kwh: 14.7, provenance: 'Measured' },
    { day: 'Sun', cost: 58, prevCost: 65, labelTh: 'อา.', labelEn: 'Sun', kwh: 13.8, provenance: 'Predicted' },
  ];

  const roomData = [
    { name: 'ห้องนอน (Bedroom)', cost: 1250, kwh: 297, color: '#10b981', provenance: 'Calculated' },
    { name: 'ห้องนั่งเล่น (Living Room)', cost: 850, kwh: 202, color: '#14b8a6', provenance: 'Calculated' },
    { name: 'ห้องครัว (Kitchen)', cost: 450, kwh: 107, color: '#06b6d4', provenance: 'User-entered' },
    { name: 'ห้องน้ำ (Bathroom)', cost: 230, kwh: 54, color: '#3b82f6', provenance: 'Estimated' },
  ];

  const applianceShareData = [
    { name: 'Air Conditioner 12000 BTU', watt: 1100, hours: 8, kwh: 264, cost: 1296, percent: 52, pf: 0.98, color: '#10b981', provenance: 'Measured' },
    { name: 'Smart Refrigerator 10 Cu.ft', watt: 80, hours: 24, kwh: 57.6, cost: 453, percent: 18, pf: 0.92, color: '#14b8a6', provenance: 'Measured' },
    { name: 'Desktop Gaming PC', watt: 450, hours: 5, kwh: 67.5, cost: 303, percent: 12, pf: 0.95, color: '#06b6d4', provenance: 'User-entered' },
    { name: 'Water Heater 3500W', watt: 3500, hours: 0.5, kwh: 52.5, cost: 236, percent: 10, pf: 0.88, color: '#f59e0b', provenance: 'Estimated' },
    { name: 'Other Lights & Fans', watt: 120, hours: 10, kwh: 36, cost: 212, percent: 8, pf: 0.90, color: '#6366f1', provenance: 'Predicted' },
  ];

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
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[0.68rem] uppercase tracking-wider">
              {infoDetailMode === 'simple' ? 'เข้าใจง่าย • Essential Mode' : infoDetailMode === 'balanced' ? 'สมดุล • Balanced Mode' : 'รายละเอียด • Audit Mode'}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-500" />
            <span>{lang === 'th' ? 'รายงานและสถิติการใช้ไฟฟ้า' : 'Electricity Analytics & Reports'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {infoDetailMode === 'simple'
              ? (lang === 'th' ? 'สรุปสั้น 3 บรรทัด เข้าใจทันที ไม่สับสน' : '3-line simple summary, zero confusion.')
              : infoDetailMode === 'balanced'
                ? (lang === 'th' ? 'เข้าใจสถิติและเหตุผลหลักในภาษาเรียบง่าย' : 'Understand energy trends and key drivers in plain language.')
                : (lang === 'th' ? 'ข้อมูลดิบครบถ้วน สูตรคำนวณ Ft/VAT แหล่งที่มา และการส่งออกข้อมูล' : 'Full technical specs, Ft/VAT formulas, provenance, and data exports.')}
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {infoDetailMode === 'detailed' && (
            <button
              onClick={handleExportCSV}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{lang === 'th' ? 'ส่งออก CSV' : 'Export CSV'}</span>
            </button>
          )}

          <button
            onClick={onExportPDF}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{lang === 'th' ? 'ดาวน์โหลดรายงาน (PDF)' : 'Export PDF Report'}</span>
          </button>
        </div>
      </div>

      {/* 2. MODE-SPECIFIC HIGH LEVEL OVERVIEW CARDS */}
      {infoDetailMode === 'simple' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProgressiveCard
            mode="simple"
            lang={lang}
            isDarkMode={isDarkMode}
            title={lang === 'th' ? 'ค่าไฟเดือนนี้' : 'Monthly Bill'}
            summaryValue="~ ฿1,248"
            summarySubtitle={lang === 'th' ? 'ประมาณการ ณ วันนี้' : 'Est. as of today'}
            badgeText="Normal"
            badgeType="success"
            recommendedAction={{
              label: lang === 'th' ? 'ตั้งแจ้งเตือนงบประมาณ' : 'Set budget alert',
              actionText: lang === 'th' ? 'ตั้งค่า' : 'Set',
            }}
          />

          <ProgressiveCard
            mode="simple"
            lang={lang}
            isDarkMode={isDarkMode}
            title={lang === 'th' ? 'ตัวกินไฟสูงสุด' : 'Top Appliance Cost'}
            summaryValue="แอร์ (Aircon)"
            summarySubtitle={lang === 'th' ? 'คิดเป็น 52% ของค่าไฟทั้งหมด' : 'Account for 52% of total bill'}
            badgeText="Heavy"
            badgeType="danger"
            recommendedAction={{
              label: lang === 'th' ? 'ลดเวลาเปิดแอร์ 30 นาที ประหยัด ฿55' : 'Cut AC 30m to save ฿55',
              actionText: lang === 'th' ? 'ปรับแอร์' : 'Adjust',
            }}
          />

          <ProgressiveCard
            mode="simple"
            lang={lang}
            isDarkMode={isDarkMode}
            title={lang === 'th' ? 'แนวโน้มสัปดาห์นี้' : 'This Week Trend'}
            summaryValue="ลดลง 12%"
            summarySubtitle={lang === 'th' ? 'ใช้ไฟน้อยกว่าสัปดาห์ก่อน' : 'Less power used vs last week'}
            badgeText="-12% Cost"
            badgeType="success"
            recommendedAction={{
              label: lang === 'th' ? 'ทำสตรีคประหยัดไฟเพิ่มคะแนน' : 'Keep streak to boost score',
              actionText: lang === 'th' ? 'ดูสตรีค' : 'Streak',
            }}
          />
        </div>
      )}

      {infoDetailMode === 'balanced' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProgressiveCard
            mode="balanced"
            lang={lang}
            isDarkMode={isDarkMode}
            title={lang === 'th' ? 'วิเคราะห์การเปลี่ยนแปลงค่าไฟ' : 'Monthly Trend Analysis'}
            summaryValue="฿1,248.50"
            summarySubtitle={lang === 'th' ? 'ประหยัดขึ้น 12% เทียบกับสัปดาห์ก่อน' : '12% savings vs prior week'}
            badgeText="Trend: Down"
            badgeType="success"
            explanationTitle={lang === 'th' ? 'สาเหตุหลัก' : 'Key Drivers'}
            explanationText={lang === 'th'
              ? 'การเปิดโหมดแอร์ 26°C ร่วมกับพัดลมตั้งโต๊ะ และการปิดไฟสแตนด์บายของ Gaming PC ช่วงเที่ยงคืน'
              : 'AC Eco mode at 26°C combined with desk fan and PC standby shutdown.'}
            comparisonText={lang === 'th' ? 'ช่วงบ่าย 13:00 - 16:00 เป็นช่วงเสียค่าไฟมากที่สุด' : 'Peak consumption occurs 13:00 - 16:00'}
          />

          <ProgressiveCard
            mode="balanced"
            lang={lang}
            isDarkMode={isDarkMode}
            title={lang === 'th' ? 'การกระจายตัวตามห้อง' : 'Room Distribution'}
            summaryValue={lang === 'th' ? 'ห้องนอนกินไฟสูงสุด (52%)' : 'Bedroom Highest (52%)'}
            summarySubtitle={lang === 'th' ? 'รองลงมาคือห้องนั่งเล่น (28%) และห้องครัว (15%)' : 'Followed by Living Room (28%) & Kitchen (15%)'}
            badgeText="Bedroom Heavy"
            badgeType="warning"
            explanationTitle={lang === 'th' ? 'คำแนะนำ' : 'Guidance'}
            explanationText={lang === 'th'
              ? 'ห้องนอนมีแอร์ 12,000 BTU ทำงานเฉลี่ยวันละ 8 ชม. การล้างฟิลเตอร์แอร์จะช่วยลดค่าไฟได้ทันที 10%'
              : 'Cleaning AC filter in bedroom will cut power draw by 10% immediately.'}
          />
        </div>
      )}

      {infoDetailMode === 'detailed' && (
        <div className={`p-6 rounded-[2.5rem] border shadow-xl ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-500" />
              <h3 className="font-extrabold text-base font-display">
                {lang === 'th' ? 'โครงสร้างสูตรการคำนวณบิลค่าไฟฟ้าฉบับเต็ม (Full Bill Formula Breakdown)' : 'Full Electricity Bill Formula Breakdown'}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-500 font-mono text-xs font-bold">
              Tariff: PEA Type 1.1.2 Progressive
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono mb-4">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60">
              <span className="text-[0.65rem] text-slate-400 font-sans font-bold block mb-1">
                1. ค่าไฟฟ้าฐาน (Base Energy)
              </span>
              <div className="font-bold text-sm text-slate-900 dark:text-white">฿1,248.50</div>
              <span className="text-[0.62rem] text-emerald-500 font-bold uppercase">[Calculated: 298 kWh]</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60">
              <span className="text-[0.65rem] text-slate-400 font-sans font-bold block mb-1">
                2. ค่า Ft (-0.1532 THB/unit)
              </span>
              <div className="font-bold text-sm text-emerald-500">-฿45.65</div>
              <span className="text-[0.62rem] text-emerald-500 font-bold uppercase">[Calculated]</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60">
              <span className="text-[0.65rem] text-slate-400 font-sans font-bold block mb-1">
                3. ค่าบริการรายเดือน (Service Fee)
              </span>
              <div className="font-bold text-sm text-slate-900 dark:text-white">฿38.22</div>
              <span className="text-[0.62rem] text-blue-500 font-bold uppercase">[Standard Rate]</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60">
              <span className="text-[0.65rem] text-slate-400 font-sans font-bold block mb-1">
                4. ภาษีมูลค่าเพิ่ม (VAT 7%)
              </span>
              <div className="font-bold text-sm text-slate-900 dark:text-white">฿86.87</div>
              <span className="text-[0.62rem] text-blue-500 font-bold uppercase">[Standard Rate]</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
            <span>Formula: Total = ((Base Energy kWh × Tier Rate) + (kWh × Ft) + Service Fee) × 1.07 VAT</span>
            <span className="text-sm font-black">Net Total: ฿1,327.94</span>
          </div>
        </div>
      )}

      {/* 3. VIEW TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'weekly', th: 'รายสัปดาห์ (Weekly)', en: 'Weekly' },
          { id: 'daily', th: 'รายวัน 24 ชม.', en: 'Daily 24h' },
          { id: 'monthly', th: 'รายเดือน (Monthly)', en: 'Monthly' },
          { id: 'room', th: 'เปรียบเทียบตามห้อง', en: 'By Room' },
          { id: 'appliance', th: 'สัดส่วนเครื่องใช้ไฟฟ้า', en: 'Appliance Share' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {lang === 'th' ? tab.th : tab.en}
          </button>
        ))}
      </div>

      {/* 4. CHARTS SECTION */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-[2.5rem] border transition-all ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
            {activeTab === 'weekly' && (lang === 'th' ? 'เปรียบเทียบค่าไฟรายวันในสัปดาห์นี้ vs สัปดาห์ก่อน (฿)' : 'Daily Cost Comparison: This Week vs Last Week (฿)')}
            {activeTab === 'daily' && (lang === 'th' ? 'กราฟการใช้ไฟ 24 ชั่วโมงประจำวันนี้ (฿/ชม.)' : 'Today 24-Hour Electricity Curve (฿/hr)')}
            {activeTab === 'room' && (lang === 'th' ? 'สัดส่วนค่าไฟแบ่งตามห้องใช้งาน (฿)' : 'Electricity Spend by Room (฿)')}
            {activeTab === 'appliance' && (lang === 'th' ? 'สัดส่วนค่าไฟแบ่งตามเครื่องใช้ไฟฟ้า (%)' : 'Appliance Consumption Share (%)')}
          </h3>
        </div>

        {/* Recharts Area / Bar Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'appliance' ? (
              <PieChart>
                <Pie
                  data={applianceShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="cost"
                >
                  {applianceShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`฿${value}`, 'Cost']} 
                  contentStyle={{ borderRadius: '1rem', background: isDarkMode ? '#0f172a' : '#ffffff', borderColor: '#10b981' }}
                />
              </PieChart>
            ) : (
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey={lang === 'th' ? 'labelTh' : 'labelEn'} stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" unit="฿" />
                <Tooltip 
                  formatter={(value: any) => [`฿${value}`, 'Cost']}
                  contentStyle={{ borderRadius: '1rem', background: isDarkMode ? '#0f172a' : '#ffffff', borderColor: '#10b981' }}
                />
                <Area type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* RAW DATA TABLE (Detailed Mode Only) */}
        {infoDetailMode === 'detailed' && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white font-display">
                  {lang === 'th' ? 'ตารางข้อมูลดิบทางเทคนิค (Raw Technical Dataset)' : 'Raw Technical Dataset'}
                </h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">5 Appliance Records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[0.65rem]">
                    <th className="p-2">Appliance</th>
                    <th className="p-2">Power (W)</th>
                    <th className="p-2">Usage (Hrs)</th>
                    <th className="p-2">Monthly kWh</th>
                    <th className="p-2">Cost (THB)</th>
                    <th className="p-2">Power Factor</th>
                    <th className="p-2">Provenance Tag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {applianceShareData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="p-2 font-bold text-slate-800 dark:text-slate-200">{item.name}</td>
                      <td className="p-2">{item.watt}W</td>
                      <td className="p-2">{item.hours} h/d</td>
                      <td className="p-2 text-emerald-500 font-bold">{item.kwh} kWh</td>
                      <td className="p-2 font-bold">฿{item.cost}</td>
                      <td className="p-2">{item.pf}</td>
                      <td className="p-2">
                        <span className={`px-2 py-0.5 rounded-md text-[0.62rem] font-bold ${
                          item.provenance === 'Measured'
                            ? 'bg-emerald-500/15 text-emerald-500'
                            : item.provenance === 'User-entered'
                              ? 'bg-blue-500/15 text-blue-500'
                              : 'bg-amber-500/15 text-amber-500'
                        }`}>
                          [{item.provenance}]
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI Advice Box under chart */}
        <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 block">
              {lang === 'th' ? 'ข้อแนะนำจากกราฟ:' : 'Insight from chart:'}
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {lang === 'th'
                ? 'วันเสาร์และอาทิตย์มีการใช้ไฟพุ่งสูงขึ้น 30% เนื่องจากเปิดแอร์ต่อเนื่องช่วงกลางวัน ลองเปิดโหมด 26°C ร่วมกับพัดลมเพื่อลดพีคค่าไฟ'
                : 'Weekend power usage spiked 30% due to continuous AC. Running 26°C AC with a fan will smooth out the peak.'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
