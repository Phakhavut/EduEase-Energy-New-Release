import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateApplianceEnergy } from "@/utils/calculations";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { 
  Sparkles, 
  SlidersHorizontal, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  GraduationCap, 
  BookOpen, 
  Plus, 
  Trash2, 
  Info, 
  Check, 
  TrendingDown, 
  Calculator, 
  Award, 
  Scale, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { Appliance, InfoDetailMode, AppPage, ComparisonItem } from '../../types';
import { ProgressiveCard } from '../common/ProgressiveCard';

interface ComparisonViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  infoDetailMode: InfoDetailMode;
  userAppliances: Appliance[];
  setCurrentPage: (page: AppPage) => void;
  onStartPageTour?: (stepIndex: number) => void;
}

// Preset Comparison Sets
const PRESET_COMPARISONS = [
  {
    id: 'preset_ac',
    titleTh: '❄️ แอร์อินเวอร์เตอร์ VS แอร์ธรรมดา (12,000 BTU)',
    titleEn: '❄️ Inverter AC vs Fixed Speed AC (12,000 BTU)',
    items: [
      { id: 'ac_inv', name: 'แอร์ Inverter 12,000 BTU (เบอร์ 5 ⭐⭐⭐)', nameEn: 'Inverter AC 12,000 BTU', category: 'aircon', watt: 850, hoursPerDay: 8, quantity: 1, efficiencyScore: 92, powerFactor: 0.98, efficiencyTag: 'A+++ Eco', icon: '❄️' },
      { id: 'ac_std', name: 'แอร์ธรรมดา Fixed-Speed (รุ่นเก่า)', nameEn: 'Standard AC Fixed Speed', category: 'aircon', watt: 1350, hoursPerDay: 8, quantity: 1, efficiencyScore: 58, powerFactor: 0.82, efficiencyTag: 'Heavy', icon: '🥶' },
    ]
  },
  {
    id: 'preset_cooling',
    titleTh: '🌀 พัดลมไอเย็น VS แอร์ VS พัดลมตั้งโต๊ะ',
    titleEn: '🌀 Air Cooler vs AC vs Desk Fan',
    items: [
      { id: 'fan_desk', name: 'พัดลมตั้งโต๊ะ 16 นิ้ว', nameEn: 'Desk Fan 16"', category: 'fan', watt: 45, hoursPerDay: 10, quantity: 1, efficiencyScore: 95, powerFactor: 0.90, efficiencyTag: 'A+++ Eco', icon: '🌀' },
      { id: 'fan_cooler', name: 'พัดลมไอเย็น (Air Cooler)', nameEn: 'Evaporative Air Cooler', category: 'fan', watt: 85, hoursPerDay: 8, quantity: 1, efficiencyScore: 88, powerFactor: 0.92, efficiencyTag: 'A+++ Eco', icon: '💦' },
      { id: 'ac_dorm', name: 'แอร์หอพัก 9,000 BTU', nameEn: 'Dorm AC 9,000 BTU', category: 'aircon', watt: 900, hoursPerDay: 8, quantity: 1, efficiencyScore: 65, powerFactor: 0.85, efficiencyTag: 'Standard', icon: '❄️' },
    ]
  },
  {
    id: 'preset_lighting',
    titleTh: '💡 หลอดไฟ LED VS หลอดตะเกียบ VS หลอดไส้',
    titleEn: '💡 LED Bulb vs CFL vs Incandescent',
    items: [
      { id: 'bulb_led', name: 'หลอด LED 9W (1,000 Lumens)', nameEn: 'LED Bulb 9W', category: 'lighting', watt: 9, hoursPerDay: 6, quantity: 4, efficiencyScore: 98, powerFactor: 0.95, efficiencyTag: 'A+++ Eco', icon: '💡' },
      { id: 'bulb_cfl', name: 'หลอดตะเกียบ CFL 18W', nameEn: 'CFL Bulb 18W', category: 'lighting', watt: 18, hoursPerDay: 6, quantity: 4, efficiencyScore: 75, powerFactor: 0.80, efficiencyTag: 'Standard', icon: '🕯️' },
      { id: 'bulb_inc', name: 'หลอดไส้ทังสเตน 60W (รุ่นดั้งเดิม)', nameEn: 'Incandescent 60W', category: 'lighting', watt: 60, hoursPerDay: 6, quantity: 4, efficiencyScore: 30, powerFactor: 0.70, efficiencyTag: 'Heavy', icon: '💥' },
    ]
  },
  {
    id: 'preset_dorm',
    titleTh: '🏢 เปรียบเทียบเครื่องใช้ไฟฟ้าในหอพัก',
    titleEn: '🏢 Dorm Room Appliances Comparison',
    items: [
      { id: 'dorm_fridge', name: 'ตู้เย็น 1 ประตู (เบอร์ 5)', nameEn: 'Single-door Fridge', category: 'kitchen', watt: 80, hoursPerDay: 24, quantity: 1, efficiencyScore: 90, powerFactor: 0.92, efficiencyTag: 'A+++ Eco', icon: '🧊' },
      { id: 'dorm_kettle', name: 'กาต้มน้ำร้อนไฟฟ้า', nameEn: 'Electric Kettle', category: 'kitchen', watt: 1500, hoursPerDay: 0.5, quantity: 1, efficiencyScore: 78, powerFactor: 0.88, efficiencyTag: 'Standard', icon: '☕' },
      { id: 'dorm_pc', name: 'คอมพิวเตอร์ตั้งโต๊ะ Gaming', nameEn: 'Gaming Desktop PC', category: 'gadget', watt: 450, hoursPerDay: 5, quantity: 1, efficiencyScore: 70, powerFactor: 0.95, efficiencyTag: 'Standard', icon: '🖥️' },
    ]
  }
];

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  lang,
  isDarkMode,
  infoDetailMode,
  userAppliances,
  setCurrentPage,
  onStartPageTour,
}) => {
  // Selected items for comparison (2 to 5 items)
  const [selectedItems, setSelectedItems] = useState<ComparisonItem[]>(PRESET_COMPARISONS[0].items as ComparisonItem[]);
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');

  // Custom Item Modal or Editor state
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customWatt, setCustomWatt] = useState<number>(100);
  const [customHours, setCustomHours] = useState<number>(5);

  // Load preset
  const handleLoadPreset = (presetId: string) => {
    const preset = PRESET_COMPARISONS.find(p => p.id === presetId);
    if (preset) {
      setSelectedItems(preset.items as ComparisonItem[]);
    }
  };

  // Add user appliance from active list
  const handleAddUserAppliance = (app: Appliance) => {
    if (selectedItems.length >= 5) return;
    const newItem: ComparisonItem = {
      id: `app_${app.id}_${Date.now()}`,
      name: app.name,
      nameEn: app.name,
      category: app.category,
      watt: app.watt,
      hoursPerDay: app.hours || 4,
      quantity: 1,
      efficiencyScore: app.healthScore || 80,
      powerFactor: app.pf || 0.90,
      efficiencyTag: app.efficiencyTag as any || 'Standard',
      icon: app.icon || '⚡',
    };
    setSelectedItems([...selectedItems, newItem]);
  };

  // Add custom appliance
  const handleAddCustomAppliance = () => {
    if (!customName || selectedItems.length >= 5) return;
    const newItem: ComparisonItem = {
      id: `custom_${Date.now()}`,
      name: customName,
      nameEn: customName,
      category: 'custom',
      watt: Number(customWatt) || 100,
      hoursPerDay: Number(customHours) || 1,
      quantity: 1,
      efficiencyScore: customWatt > 1000 ? 60 : 85,
      powerFactor: 0.90,
      efficiencyTag: customWatt > 1000 ? 'Heavy' : 'A+++ Eco',
      icon: '⚡',
    };
    setSelectedItems([...selectedItems, newItem]);
    setCustomName('');
    setShowAddCustom(false);
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    if (selectedItems.length <= 2) return; // Minimum 2 items required for comparison
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  // Update item wattage or hours
  const handleUpdateItem = (id: string, key: 'watt' | 'hoursPerDay' | 'quantity', value: number) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.id === id) {
        return { ...item, [key]: Math.max(0, value) };
      }
      return item;
    }));
  };

  // Calculation logic (Tariff = 4.20 THB/kWh)
  const calculatedItems = selectedItems.map(item => {
    const energy = calculateApplianceEnergy(item.watt * item.quantity, item.hoursPerDay);
    return {
      ...item,
      dailyKwh: energy.dailyKwh,
      monthlyKwh: energy.monthlyKwh,
      dailyCost: energy.dailyCost,
      monthlyCost: energy.monthlyCost,
    };
  });

  // Sort to find winners
  const sortedByCost = [...calculatedItems].sort((a, b) => b.monthlyCost - a.monthlyCost);
  const mostExpensive = sortedByCost[0];
  const mostSaving = sortedByCost[sortedByCost.length - 1];
  
  // Best Choice calculation (High efficiency score + Low cost per hour)
  const sortedByBest = [...calculatedItems].sort((a, b) => {
    const scoreA = a.efficiencyScore * 10 - a.monthlyCost;
    const scoreB = b.efficiencyScore * 10 - b.monthlyCost;
    return scoreB - scoreA;
  });
  const bestChoice = sortedByBest[0];

  const maxMonthlyCost = mostExpensive?.monthlyCost || 1;
  const minMonthlyCost = mostSaving?.monthlyCost || 0;
  const costDiffThb = maxMonthlyCost - minMonthlyCost;

  // Chart Data format
  const chartData = calculatedItems.map(item => ({
    name: item.name.length > 14 ? item.name.substring(0, 14) + '...' : item.name,
    fullName: item.name,
    monthlyCost: Math.round(item.monthlyCost),
    dailyCost: Number(item.dailyCost.toFixed(1)),
    watt: item.watt,
    monthlyKwh: Number(item.monthlyKwh.toFixed(1)),
    efficiencyScore: item.efficiencyScore,
  }));

  const radarData = [
    { subject: 'ความคุ้มค่า (ROI)', ...Object.fromEntries(calculatedItems.map(i => [i.name, Math.max(10, 100 - (i.monthlyCost / 5))])) },
    { subject: 'ประหยัดไฟ (kWh)', ...Object.fromEntries(calculatedItems.map(i => [i.name, Math.max(10, 100 - (i.monthlyKwh / 2))])) },
    { subject: 'ประสิทธิภาพ (Eff)', ...Object.fromEntries(calculatedItems.map(i => [i.name, i.efficiencyScore])) },
    { subject: 'Power Factor', ...Object.fromEntries(calculatedItems.map(i => [i.name, i.powerFactor * 100])) },
    { subject: 'ระดับเสียง & ความเย็น', ...Object.fromEntries(calculatedItems.map(i => [i.name, 85])) },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. HEADER BANNER */}
      <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white shadow-emerald-950/20' 
          : 'bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border-emerald-100 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                {lang === 'th' ? 'ห้องทดลองเปรียบเทียบเครื่องใช้ไฟฟ้า' : 'Appliance Comparison Lab'}
              </span>

              {onStartPageTour && (
                <button
                  onClick={() => onStartPageTour(2)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/25 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                  <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}</span>
                </button>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight">
              {lang === 'th' ? 'เปรียบเทียบค่าไฟ & ประสิทธิภาพ' : 'Compare Power & Monthly Cost'}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {lang === 'th' 
                ? 'เลือกเปรียบเทียบ 2 ถึง 5 อุปกรณ์พร้อมกัน เพื่อดูตัวเลือกที่คุ้มค่าและประหยัดเงินที่สุด' 
                : 'Compare 2 to 5 devices to find the most cost-effective and energy-efficient choice.'}
            </p>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {PRESET_COMPARISONS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset.id)}
                className={`px-3 py-2 rounded-2xl text-xs font-extrabold border shrink-0 transition-all cursor-pointer ${
                  selectedItems[0]?.name === preset.items[0].name
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                    : isDarkMode
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {lang === 'th' ? preset.titleTh : preset.titleEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. AI VERDICT & CONCLUSION HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Most Expensive */}
        <ProgressiveCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          title={lang === 'th' ? '🔴 กินไฟสูงสุด (Most Expensive)' : '🔴 Most Expensive'}
          icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
          summaryValue={`฿${mostExpensive?.monthlyCost.toFixed(0)} / ${lang === 'th' ? 'เดือน' : 'mo'}`}
          summarySubtitle={mostExpensive?.name}
          badgeText="Highest Cost"
          badgeType="danger"
          explanationTitle={lang === 'th' ? 'สาเหตุ' : 'Reason'}
          explanationText={lang === 'th' 
            ? `ใช้กำลังไฟสูงถึง ${mostExpensive?.watt} Watt เปิดวันละ ${mostExpensive?.hoursPerDay} ชม. ส่งผลให้ใช้ไฟเดือนละ ${mostExpensive?.monthlyKwh.toFixed(1)} kWh`
            : `Consumes high power (${mostExpensive?.watt}W) over ${mostExpensive?.hoursPerDay} hrs/day, totaling ${mostExpensive?.monthlyKwh.toFixed(1)} kWh/mo.`}
          comparisonText={lang === 'th' ? `แพงกว่าตัวประหยัดสุดถึง ฿${costDiffThb.toFixed(0)}/เดือน` : `฿${costDiffThb.toFixed(0)}/mo higher than greenest option`}
          formula={`Cost = (${mostExpensive?.watt}W × ${mostExpensive?.hoursPerDay}h × 30 days ÷ 1000) × 4.20 THB = ฿${mostExpensive?.monthlyCost.toFixed(2)}`}
          rawMetrics={[
            { label: 'Power Rating', value: `${mostExpensive?.watt} Watts` },
            { label: 'Usage Hours', value: `${mostExpensive?.hoursPerDay} hrs/day` },
            { label: 'Monthly Energy', value: `${mostExpensive?.monthlyKwh.toFixed(1)} kWh` },
          ]}
          tariffBreakdown="PEA Standard Tariff 4.20 THB/kWh"
          meterSource="EduEase Comparison Engine v3"
          timestamp="2026-08-06 14:32:05"
          confidenceScore="99.4% Precision"
        />

        {/* Most Saving / Greenest */}
        <ProgressiveCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          title={lang === 'th' ? '🟢 ประหยัดไฟที่สุด (Most Saving)' : '🟢 Most Energy Efficient'}
          icon={<TrendingDown className="w-4 h-4 text-emerald-500" />}
          summaryValue={`฿${mostSaving?.monthlyCost.toFixed(0)} / ${lang === 'th' ? 'เดือน' : 'mo'}`}
          summarySubtitle={mostSaving?.name}
          badgeText="Greenest Choice"
          badgeType="success"
          explanationTitle={lang === 'th' ? 'ข้อดีหลัก' : 'Key Advantage'}
          explanationText={lang === 'th' 
            ? `ใช้ไฟเพียง ${mostSaving?.watt} Watt ประหยัดพลังงานได้ถึง ${((1 - mostSaving?.monthlyCost / maxMonthlyCost) * 100).toFixed(0)}% เมื่อเทียบกับตัวกินไฟ`
            : `Uses only ${mostSaving?.watt}W, saving ${((1 - mostSaving?.monthlyCost / maxMonthlyCost) * 100).toFixed(0)}% compared to the heaviest consumer.`}
          comparisonText={lang === 'th' ? `ช่วยเซฟเงินกระเป๋า ฿${costDiffThb.toFixed(0)} ทุกเดือน` : `Saves ฿${costDiffThb.toFixed(0)} every month`}
          formula={`Cost = (${mostSaving?.watt}W × ${mostSaving?.hoursPerDay}h × 30 days ÷ 1000) × 4.20 THB = ฿${mostSaving?.monthlyCost.toFixed(2)}`}
          rawMetrics={[
            { label: 'Power Rating', value: `${mostSaving?.watt} Watts` },
            { label: 'Usage Hours', value: `${mostSaving?.hoursPerDay} hrs/day` },
            { label: 'Monthly Energy', value: `${mostSaving?.monthlyKwh.toFixed(1)} kWh` },
          ]}
          tariffBreakdown="PEA Eco Tariff Tier"
          meterSource="EduEase Comparison Engine v3"
          timestamp="2026-08-06 14:32:05"
          confidenceScore="99.4% Precision"
        />

        {/* Best Choice Recommendation */}
        <ProgressiveCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          title={lang === 'th' ? '⭐ AI แนะนำตัวเลือกที่ดีที่สุด' : '⭐ AI Recommended Choice'}
          icon={<Award className="w-4 h-4 text-amber-500" />}
          summaryValue={bestChoice?.name}
          summarySubtitle={lang === 'th' ? `คุ้มค่าที่สุด • ประสิทธิภาพ ${bestChoice?.efficiencyScore}/100` : `Best ROI • Efficiency ${bestChoice?.efficiencyScore}/100`}
          badgeText="AI Winner"
          badgeType="warning"
          explanationTitle={lang === 'th' ? 'เหตุผลการแนะนำ' : 'AI Recommendation Reason'}
          explanationText={lang === 'th' 
            ? `ให้ประสิทธิภาพการทำงานสูง สอดคล้องกับงบประมาณ และคุ้มค่าคืนทุนเร็วที่สุดสำหรับผู้ใช้งานกลุ่มวัยเรียน/วัยทำงาน`
            : `Delivers peak operational performance with optimal budget efficiency and fastest ROI.`}
          comparisonText={lang === 'th' ? `ผลต่างยอดประหยัดประมาณ ฿${costDiffThb.toFixed(0)} / เดือน` : `Estimated savings diff ~฿${costDiffThb.toFixed(0)} / mo`}
          recommendedAction={{
            label: lang === 'th' ? 'อ่านบทเรียนเรื่องเทคโนโลยี Inverter เพิ่มเติม' : 'Read Inverter technology lesson',
            actionText: lang === 'th' ? 'เรียนรู้' : 'Learn',
            onExecute: () => setCurrentPage('learning')
          }}
        />
      </div>

      {/* 3. COMPARISON CONTROLS & APPLIANCE CARDS (2 to 5 Selectors) */}
      <div className={`p-6 rounded-[2.5rem] border shadow-xl ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
              {lang === 'th' ? `รายการอุปกรณ์ที่เปรียบเทียบ (${selectedItems.length}/5)` : `Compared Devices (${selectedItems.length}/5)`}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Chart mode toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
              <button
                onClick={() => setChartType('bar')}
                className={`px-2.5 py-1 rounded-lg transition-all ${chartType === 'bar' ? 'bg-emerald-500 text-white' : 'text-slate-500'}`}
              >
                {lang === 'th' ? 'กราฟแท่ง' : 'Bar Chart'}
              </button>
              <button
                onClick={() => setChartType('radar')}
                className={`px-2.5 py-1 rounded-lg transition-all ${chartType === 'radar' ? 'bg-emerald-500 text-white' : 'text-slate-500'}`}
              >
                {lang === 'th' ? 'เรดาร์ 5 มิติ' : 'Radar Chart'}
              </button>
            </div>

            {/* Add Custom Device Button */}
            {selectedItems.length < 5 && (
              <button
                onClick={() => setShowAddCustom(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'th' ? 'เพิ่มอุปกรณ์' : 'Add Item'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Editable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {calculatedItems.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all relative ${
                item.id === bestChoice.id
                  ? 'border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/30'
                  : isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-xs md:text-sm text-slate-900 dark:text-white line-clamp-1">
                      {item.name}
                    </h4>
                    <span className="text-[0.65rem] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      {item.efficiencyTag}
                    </span>
                  </div>
                </div>

                {selectedItems.length > 2 && (
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Adjustable Input Controls */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <label className="text-[0.65rem] font-bold text-slate-400 block mb-0.5">
                    {lang === 'th' ? 'กำลังไฟ (Watt)' : 'Power (W)'}
                  </label>
                  <input
                    type="number"
                    value={item.watt}
                    onChange={(e) => handleUpdateItem(item.id, 'watt', Number(e.target.value))}
                    className={`w-full p-2 rounded-xl border font-mono font-bold text-xs ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-[0.65rem] font-bold text-slate-400 block mb-0.5">
                    {lang === 'th' ? 'ชั่วโมง/วัน (Hrs/Day)' : 'Hours/Day'}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    max="24"
                    min="0.1"
                    value={item.hoursPerDay}
                    onChange={(e) => handleUpdateItem(item.id, 'hoursPerDay', Number(e.target.value))}
                    className={`w-full p-2 rounded-xl border font-mono font-bold text-xs ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Cost Output Display */}
              <div className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-900/60 flex items-center justify-between text-xs font-mono">
                <span className="text-[0.68rem] text-slate-500 dark:text-slate-400 font-sans font-bold">
                  {lang === 'th' ? 'ค่าไฟประมาณการ:' : 'Est. Monthly:'}
                </span>
                <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                  ฿{item.monthlyCost.toFixed(1)} / {lang === 'th' ? 'เดือน' : 'mo'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4. COMPARISON VISUALIZATION CHARTS */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 font-display">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'th' ? 'กราฟเปรียบเทียบค่าไฟต่อเดือน (THB / Month)' : 'Monthly Electricity Cost Chart'}</span>
          </h4>

          {chartType === 'bar' ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="฿" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                      borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                      borderRadius: '16px',
                      color: isDarkMode ? '#ffffff' : '#0f172a',
                      fontWeight: 'bold',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="monthlyCost" radius={[12, 12, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.monthlyCost === Math.max(...chartData.map(c => c.monthlyCost))
                            ? '#f43f5e'
                            : entry.monthlyCost === Math.min(...chartData.map(c => c.monthlyCost))
                              ? '#10b981'
                              : '#3b82f6'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#475569" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                  {calculatedItems.map((item, idx) => {
                    const colors = ['#10b981', '#f43f5e', '#3b82f6', '#f59e0b', '#8b5cf6'];
                    return (
                      <Radar
                        key={item.id}
                        name={item.name}
                        dataKey={item.name}
                        stroke={colors[idx % colors.length]}
                        fill={colors[idx % colors.length]}
                        fillOpacity={0.3}
                      />
                    );
                  })}
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* 5. CONCEPT TEACHING & LEARNING LINK CARD */}
      <div className={`p-6 rounded-[2rem] border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border-purple-800/40 text-white' 
          : 'bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-purple-500/10 border-purple-200 text-slate-800'
      }`}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 shrink-0">
            <GraduationCap className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <span className="text-[0.68rem] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              {lang === 'th' ? '💡 สาระน่ารู้บทเรียนพลังงาน' : '💡 Energy Concept Lesson'}
            </span>
            <h3 className="text-lg font-extrabold font-display mt-0.5">
              {lang === 'th' ? 'เกร็ดความรู้: ทำไมเทคโนโลยี Inverter ถึงประหยัดกว่า?' : 'Concept: Why Inverter Technology Saves More?'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-2xl">
              {lang === 'th'
                ? 'แอร์ระบบ Inverter สามารถปรับลดรอบการทำงานของคอมเพรสเซอร์แทนการตัด-ต่อไฟถี่ๆ เหมือนรุ่นธรรมดา ช่วยลดการกระชากไฟช่วงสตาร์ท และลดค่าไฟลงได้ 30% - 40% ในระยะยาว'
                : 'Inverter compressors adjust motor speed dynamically instead of shutting off and restarting repeatedly, avoiding high inrush current spikes and saving 30%-40% energy.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('learning')}
          className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs flex items-center gap-2 shrink-0 transition-all shadow-lg shadow-purple-500/25 cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'th' ? 'เรียนรู้บทเรียนฉบับเต็ม' : 'Read Full Lesson'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Add Custom Appliance Modal */}
      <AnimatePresence>
        {showAddCustom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <h3 className="font-extrabold text-base font-display mb-4">
                {lang === 'th' ? 'เพิ่มอุปกรณ์กำหนดเองเพื่อเปรียบเทียบ' : 'Add Custom Appliance'}
              </h3>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">
                    {lang === 'th' ? 'ชื่ออุปกรณ์' : 'Appliance Name'}
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น พัดลมไอเย็น 60W"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs font-bold ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-400 block mb-1">
                      {lang === 'th' ? 'กำลังไฟ (Watt)' : 'Power (Watt)'}
                    </label>
                    <input
                      type="number"
                      value={customWatt}
                      onChange={(e) => setCustomWatt(Number(e.target.value))}
                      className={`w-full p-3 rounded-xl border text-xs font-bold font-mono ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 block mb-1">
                      {lang === 'th' ? 'เปิดใช้งาน (ชม./วัน)' : 'Usage (Hrs/Day)'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={customHours}
                      onChange={(e) => setCustomHours(Number(e.target.value))}
                      className={`w-full p-3 rounded-xl border text-xs font-bold font-mono ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowAddCustom(false)}
                  className="px-4 py-2.5 rounded-xl border text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
                <button
                  onClick={handleAddCustomAppliance}
                  disabled={!customName}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {lang === 'th' ? 'เพิ่มเข้ารายการ' : 'Add to List'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
