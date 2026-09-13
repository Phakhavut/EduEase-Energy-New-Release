import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ComposedChart,
  Area,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  Cell,
  Legend
} from 'recharts';
import {
  Flame,
  Zap,
  Calendar,
  Clock,
  Sun,
  Moon,
  TrendingUp,
  TrendingDown,
  Info,
  Sparkles,
  Layers,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { UserPersona, InfoDetailMode } from '../../types';

interface WeeklyUsageHeatmapProps {
  isDarkMode: boolean;
  lang?: 'th' | 'en';
  persona?: UserPersona;
  infoDetailMode?: InfoDetailMode;
  onNavigateToAppliances?: () => void;
  onNavigateToBudget?: () => void;
}

export type HeatmapViewMode = 'matrix' | 'hourly_curve' | 'tou_split';
export type ApplianceCategoryFilter = 'all' | 'ac' | 'fridge' | 'water_heater' | 'tech';

interface HeatmapCellData {
  dayIndex: number; // 0 = Mon, 6 = Sun
  dayNameEn: string;
  dayNameTh: string;
  dayShortEn: string;
  dayShortTh: string;
  hour: number; // 0 to 23
  hourLabel: string;
  kwh: number;
  costThb: number;
  isTouOnPeak: boolean;
  intensityLevel: 0 | 1 | 2 | 3 | 4; // 0=very low, 4=peak
  dominantApplianceEn: string;
  dominantApplianceTh: string;
  appliancesBreakdown: {
    nameEn: string;
    nameTh: string;
    kwh: number;
    cost: number;
    color: string;
  }[];
}

export const WeeklyUsageHeatmap: React.FC<WeeklyUsageHeatmapProps> = ({
  isDarkMode,
  lang = 'th',
  persona = 'student',
  infoDetailMode = 'balanced',
  onNavigateToAppliances,
  onNavigateToBudget,
}) => {
  const [viewMode, setViewMode] = useState<HeatmapViewMode>('matrix');
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceCategoryFilter>('all');
  const [selectedCell, setSelectedCell] = useState<HeatmapCellData | null>(null);
  const [highlightPeriod, setHighlightPeriod] = useState<'all' | 'night' | 'morning' | 'afternoon' | 'evening'>('all');

  const daysInfo = useMemo(() => [
    { index: 0, en: 'Monday', th: 'วันจันทร์', shortEn: 'Mon', shortTh: 'จ.' },
    { index: 1, en: 'Tuesday', th: 'วันอังคาร', shortEn: 'Tue', shortTh: 'อ.' },
    { index: 2, en: 'Wednesday', th: 'วันพุธ', shortEn: 'Wed', shortTh: 'พ.' },
    { index: 3, en: 'Thursday', th: 'วันพฤหัสบดี', shortEn: 'Thu', shortTh: 'พฤ.' },
    { index: 4, en: 'Friday', th: 'วันศุกร์', shortEn: 'Fri', shortTh: 'ศ.' },
    { index: 5, en: 'Saturday', th: 'วันเสาร์', shortEn: 'Sat', shortTh: 'ส.' },
    { index: 6, en: 'Sunday', th: 'วันอาทิตย์', shortEn: 'Sun', shortTh: 'อา.' },
  ], []);

  // Generate 7x24 data matrix tailored to persona
  const heatmapData = useMemo<HeatmapCellData[]>(() => {
    const list: HeatmapCellData[] = [];

    // Base multiplier based on persona
    const personaMultiplier = persona === 'facility' ? 3.5 : persona === 'homeowner' ? 1.6 : 1.0;

    for (let d = 0; d < 7; d++) {
      const isWeekend = d >= 5;
      const day = daysInfo[d];

      for (let h = 0; h < 24; h++) {
        // TOU On-Peak: Mon-Fri from 09:00 to 22:00
        const isTouOnPeak = !isWeekend && h >= 9 && h < 22;
        const ratePerKwh = isTouOnPeak ? 5.7982 : 2.6369;

        // Base profile calculations
        let baseKwh = 0.15; // baseload (fridge + standbys)

        // Profile dynamics
        if (persona === 'student') {
          // Night owl profile: heavy evening & night, low daytime weekdays
          if (h >= 0 && h <= 3) baseKwh += isWeekend ? 1.4 : 1.1; // Late night gaming / AC
          else if (h >= 4 && h <= 7) baseKwh += 0.05; // Sleeping
          else if (h >= 8 && h <= 12) baseKwh += isWeekend ? 0.9 : 0.2; // Class vs late morning wake
          else if (h >= 13 && h <= 17) baseKwh += isWeekend ? 1.5 : 0.3; // Afternoon AC on weekend
          else if (h >= 18 && h <= 23) baseKwh += isWeekend ? 2.1 : 1.8; // Peak evening study/gaming/AC
        } else if (persona === 'homeowner') {
          // Family profile: morning routine, evening family cooking + multiple ACs
          if (h >= 0 && h <= 5) baseKwh += 0.8; // Sleeping AC
          else if (h >= 6 && h <= 8) baseKwh += 1.6; // Water heater, breakfast, kettle
          else if (h >= 9 && h <= 16) baseKwh += isWeekend ? 2.4 : 0.8; // Work from home / Weekend family
          else if (h >= 17 && h <= 21) baseKwh += 2.8; // Cooking, TV, lights, AC start
          else if (h >= 22 && h <= 23) baseKwh += 1.9; // Bedtime cooling
        } else {
          // Facility profile: high office hours 08:00 - 18:00
          if (h >= 8 && h <= 18) baseKwh += isWeekend ? 0.6 : 3.8; // Commercial HVAC, servers, lights
          else baseKwh += 0.5; // Off-hours server baseline
        }

        // Apply natural variance
        const variance = Math.sin((d * 24 + h) * 0.45) * 0.12;
        let totalKwh = Math.max(0.1, (baseKwh + variance) * personaMultiplier);

        // Appliance breakdowns
        let acRatio = 0.55;
        let fridgeRatio = 0.15;
        let waterHeaterRatio = (h >= 6 && h <= 8) || (h >= 18 && h <= 20) ? 0.20 : 0.02;
        let techRatio = (h >= 18 && h <= 23) || (isWeekend && h >= 13 && h <= 23) ? 0.20 : 0.08;
        const otherRatio = Math.max(0.05, 1 - (acRatio + fridgeRatio + waterHeaterRatio + techRatio));

        // Filter adjustments if user selected single appliance
        if (selectedAppliance === 'ac') {
          totalKwh = totalKwh * acRatio;
        } else if (selectedAppliance === 'fridge') {
          totalKwh = totalKwh * fridgeRatio;
        } else if (selectedAppliance === 'water_heater') {
          totalKwh = totalKwh * waterHeaterRatio;
        } else if (selectedAppliance === 'tech') {
          totalKwh = totalKwh * techRatio;
        }

        const costThb = parseFloat((totalKwh * ratePerKwh).toFixed(2));
        const kwhRounded = parseFloat(totalKwh.toFixed(2));

        // Intensity level calculation (0 to 4)
        let intensityLevel: 0 | 1 | 2 | 3 | 4 = 0;
        if (kwhRounded < 0.4) intensityLevel = 0;
        else if (kwhRounded < 0.9) intensityLevel = 1;
        else if (kwhRounded < 1.6) intensityLevel = 2;
        else if (kwhRounded < 2.4) intensityLevel = 3;
        else intensityLevel = 4;

        // Dominant appliance
        let dominantEn = 'Air Conditioner';
        let dominantTh = 'เครื่องปรับอากาศ (แอร์)';
        if (selectedAppliance === 'all') {
          if (waterHeaterRatio > 0.18) {
            dominantEn = 'Water Heater';
            dominantTh = 'เครื่องทำน้ำอุ่น';
          } else if (techRatio > 0.25) {
            dominantEn = 'PC & Entertainment';
            dominantTh = 'คอมพิวเตอร์และอุปกรณ์ไอที';
          } else if (h >= 2 && h <= 6) {
            dominantEn = 'Inverter AC (Eco)';
            dominantTh = 'แอร์อินเวอร์เตอร์ (โหมดรักษาอุณหภูมิ)';
          }
        } else {
          dominantEn = selectedAppliance === 'ac' ? 'Air Conditioner' : selectedAppliance === 'fridge' ? 'Refrigerator' : selectedAppliance === 'water_heater' ? 'Water Heater' : 'Tech & PC';
          dominantTh = selectedAppliance === 'ac' ? 'เครื่องปรับอากาศ (แอร์)' : selectedAppliance === 'fridge' ? 'ตู้เย็น' : selectedAppliance === 'water_heater' ? 'เครื่องทำน้ำอุ่น' : 'คอมพิวเตอร์และอุปกรณ์ไอที';
        }

        const breakdown = [
          { nameEn: 'Air Conditioner', nameTh: 'แอร์ห้องหลัก', kwh: parseFloat((kwhRounded * acRatio).toFixed(2)), cost: parseFloat((kwhRounded * acRatio * ratePerKwh).toFixed(1)), color: '#10b981' },
          { nameEn: 'Refrigerator', nameTh: 'ตู้เย็นประหยัดไฟ', kwh: parseFloat((kwhRounded * fridgeRatio).toFixed(2)), cost: parseFloat((kwhRounded * fridgeRatio * ratePerKwh).toFixed(1)), color: '#14b8a6' },
          { nameEn: 'Water Heater', nameTh: 'เครื่องทำน้ำอุ่น', kwh: parseFloat((kwhRounded * waterHeaterRatio).toFixed(2)), cost: parseFloat((kwhRounded * waterHeaterRatio * ratePerKwh).toFixed(1)), color: '#f59e0b' },
          { nameEn: 'PC & Tech', nameTh: 'คอมพิวเตอร์/ทีวี', kwh: parseFloat((kwhRounded * techRatio).toFixed(2)), cost: parseFloat((kwhRounded * techRatio * ratePerKwh).toFixed(1)), color: '#6366f1' },
        ];

        list.push({
          dayIndex: d,
          dayNameEn: day.en,
          dayNameTh: day.th,
          dayShortEn: day.shortEn,
          dayShortTh: day.shortTh,
          hour: h,
          hourLabel: `${h.toString().padStart(2, '0')}:00`,
          kwh: kwhRounded,
          costThb,
          isTouOnPeak,
          intensityLevel,
          dominantApplianceEn: dominantEn,
          dominantApplianceTh: dominantTh,
          appliancesBreakdown: breakdown
        });
      }
    }

    return list;
  }, [daysInfo, persona, selectedAppliance]);

  // Aggregate Key Statistics
  const stats = useMemo(() => {
    let maxCell = heatmapData[0];
    let minCell = heatmapData[0];
    let totalKwh = 0;
    let totalCost = 0;
    let onPeakKwh = 0;
    let offPeakKwh = 0;
    let weekendKwh = 0;
    let weekdayKwh = 0;

    heatmapData.forEach(cell => {
      totalKwh += cell.kwh;
      totalCost += cell.costThb;

      if (cell.kwh > maxCell.kwh) maxCell = cell;
      if (cell.kwh < minCell.kwh && cell.kwh > 0) minCell = cell;

      if (cell.isTouOnPeak) {
        onPeakKwh += cell.kwh;
      } else {
        offPeakKwh += cell.kwh;
      }

      if (cell.dayIndex >= 5) {
        weekendKwh += cell.kwh;
      } else {
        weekdayKwh += cell.kwh;
      }
    });

    const onPeakPct = Math.round((onPeakKwh / Math.max(1, totalKwh)) * 100);
    const offPeakPct = 100 - onPeakPct;

    // Potential savings if shifting 20% of On-Peak to Off-Peak (approx diff 3.16 THB/unit)
    const shiftableUnits = onPeakKwh * 0.20;
    const monthlyShiftSavings = Math.round(shiftableUnits * (5.7982 - 2.6369) * 4.3);

    return {
      maxCell,
      minCell,
      totalKwh: parseFloat(totalKwh.toFixed(1)),
      totalCost: Math.round(totalCost),
      onPeakPct,
      offPeakPct,
      weekendAvgDaily: parseFloat((weekendKwh / 2).toFixed(1)),
      weekdayAvgDaily: parseFloat((weekdayKwh / 5).toFixed(1)),
      monthlyShiftSavings
    };
  }, [heatmapData]);

  // Hourly curve data comparing Weekdays vs Weekends
  const hourlyCurveData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(h => {
      const weekdayCells = heatmapData.filter(c => c.dayIndex < 5 && c.hour === h);
      const weekendCells = heatmapData.filter(c => c.dayIndex >= 5 && c.hour === h);

      const weekdayAvgKwh = parseFloat((weekdayCells.reduce((sum, c) => sum + c.kwh, 0) / 5).toFixed(2));
      const weekendAvgKwh = parseFloat((weekendCells.reduce((sum, c) => sum + c.kwh, 0) / 2).toFixed(2));
      const isTouOnPeak = h >= 9 && h < 22;

      return {
        hour: `${h.toString().padStart(2, '0')}:00`,
        hourNum: h,
        weekdayKwh: weekdayAvgKwh,
        weekendKwh: weekendAvgKwh,
        weekdayCost: parseFloat((weekdayAvgKwh * (isTouOnPeak ? 5.7982 : 2.6369)).toFixed(1)),
        weekendCost: parseFloat((weekendAvgKwh * 2.6369).toFixed(1)),
        isTouOnPeak,
        touRate: isTouOnPeak ? 5.7982 : 2.6369
      };
    });
  }, [heatmapData]);

  // TOU Split daily bar chart data
  const touDailyBarData = useMemo(() => {
    return daysInfo.map(day => {
      const dayCells = heatmapData.filter(c => c.dayIndex === day.index);
      const onPeakUnits = parseFloat(dayCells.filter(c => c.isTouOnPeak).reduce((sum, c) => sum + c.kwh, 0).toFixed(1));
      const offPeakUnits = parseFloat(dayCells.filter(c => !c.isTouOnPeak).reduce((sum, c) => sum + c.kwh, 0).toFixed(1));
      const onPeakCost = Math.round(onPeakUnits * 5.7982);
      const offPeakCost = Math.round(offPeakUnits * 2.6369);

      return {
        day: lang === 'th' ? day.shortTh : day.shortEn,
        dayFull: lang === 'th' ? day.th : day.en,
        onPeakKwh: onPeakUnits,
        offPeakKwh: offPeakUnits,
        onPeakCost,
        offPeakCost,
        totalCost: onPeakCost + offPeakCost
      };
    });
  }, [daysInfo, heatmapData, lang]);

  // Color mapping helper for heatmap cells
  const getCellColor = (level: number, isDark: boolean, isSelected: boolean) => {
    if (isSelected) return isDark ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-110 z-20 shadow-lg' : 'bg-amber-500 text-white ring-4 ring-amber-500/50 scale-110 z-20 shadow-lg';
    
    switch (level) {
      case 0:
        return isDark ? 'bg-slate-850 hover:bg-slate-800 text-slate-400 border border-slate-800/80' : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-200/60';
      case 1:
        return isDark ? 'bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-800/40' : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300/60';
      case 2:
        return isDark ? 'bg-teal-900/90 hover:bg-teal-850 text-teal-200 border border-teal-700/50' : 'bg-teal-200 hover:bg-teal-300 text-teal-900 border border-teal-400/60';
      case 3:
        return isDark ? 'bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-600/50' : 'bg-amber-300 hover:bg-amber-400 text-amber-950 border border-amber-500/60';
      case 4:
        return isDark ? 'bg-rose-900 hover:bg-rose-800 text-rose-100 border border-rose-500/60' : 'bg-rose-400 hover:bg-rose-500 text-white border border-rose-600/60';
      default:
        return isDark ? 'bg-slate-800' : 'bg-slate-100';
    }
  };

  // Filter cells by period if selected
  const isCellPeriodVisible = (hour: number) => {
    if (highlightPeriod === 'all') return true;
    if (highlightPeriod === 'night') return hour >= 0 && hour < 6;
    if (highlightPeriod === 'morning') return hour >= 6 && hour < 12;
    if (highlightPeriod === 'afternoon') return hour >= 12 && hour < 18;
    if (highlightPeriod === 'evening') return hour >= 18 && hour < 24;
    return true;
  };

  return (
    <div id="weekly-usage-heatmap-widget" className={`p-5 sm:p-7 rounded-[2.5rem] border transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800 shadow-2xl text-white' 
        : 'bg-white border-slate-200 shadow-xl text-slate-900'
    }`}>
      {/* 1. Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[0.7rem] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'ฮีทแมพและแบบแผนเวลา (24/7 Energy Heatmap)' : 'Weekly Usage Heatmap'}</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[0.68rem] font-bold font-mono">
              7 Days × 24 Hours
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-amber-500" />
            <span>{lang === 'th' ? 'แผนภาพความร้อนพฤติกรรมการใช้ไฟฟ้าตลอดสัปดาห์' : 'Weekly Usage Heatmap Matrix'}</span>
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {lang === 'th'
              ? 'วิเคราะห์ความหนาแน่นของการใช้ไฟฟ้าในแต่ละชั่วโมงและแต่ละวัน เพื่อระบุชั่วโมงที่มีการกินไฟพีคสูงสุด และหาจังหวะสลับเวลาใช้ไฟ (Peak Shifting) ลดค่าไฟจริง'
              : 'Visualize hourly energy consumption intensity across all 7 days of the week to pinpoint peak load hours and optimize TOU tariff scheduling.'}
          </p>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 self-start lg:self-center shrink-0">
          <button
            id="heatmap-btn-matrix"
            onClick={() => setViewMode('matrix')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'matrix'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{lang === 'th' ? 'ฮีทแมพ 7×24' : 'Heatmap Matrix'}</span>
          </button>

          <button
            id="heatmap-btn-hourly"
            onClick={() => setViewMode('hourly_curve')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'hourly_curve'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{lang === 'th' ? 'กราฟ 24 ชม.' : 'Hourly Load (24h)'}</span>
          </button>

          <button
            id="heatmap-btn-tou"
            onClick={() => setViewMode('tou_split')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'tou_split'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{lang === 'th' ? 'เปรียบเทียบ TOU' : 'TOU Breakdown'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
        {/* Hottest Peak Hour */}
        <div className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === 'th' ? 'ชั่วโมงกินไฟสูงสุด (Peak Hour)' : 'Hottest Peak Hour'}
            </span>
            <div className="p-1.5 rounded-xl bg-rose-500/15 text-rose-500">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black font-display text-rose-500">
            {lang === 'th' ? stats.maxCell.dayShortTh : stats.maxCell.dayShortEn} {stats.maxCell.hourLabel}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span>{stats.maxCell.kwh} kWh/ชม.</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">฿{stats.maxCell.costThb}</span>
          </div>
        </div>

        {/* Lowest Baseload Hour */}
        <div className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === 'th' ? 'ชั่วโมงไฟต่ำสุด (Baseload)' : 'Lowest Baseload'}
            </span>
            <div className="p-1.5 rounded-xl bg-emerald-500/15 text-emerald-500">
              <Moon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black font-display text-emerald-600 dark:text-emerald-400">
            {lang === 'th' ? stats.minCell.dayShortTh : stats.minCell.dayShortEn} {stats.minCell.hourLabel}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span>{stats.minCell.kwh} kWh/ชม.</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">฿{stats.minCell.costThb}</span>
          </div>
        </div>

        {/* TOU Ratio */}
        <div className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === 'th' ? 'สัดส่วน On-Peak vs Off-Peak' : 'TOU On-Peak / Off-Peak'}
            </span>
            <div className="p-1.5 rounded-xl bg-amber-500/15 text-amber-500">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black font-display text-slate-900 dark:text-white flex items-center gap-1.5">
            <span className="text-amber-500">{stats.onPeakPct}%</span>
            <span className="text-slate-400 text-xs">/</span>
            <span className="text-teal-500">{stats.offPeakPct}%</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
            {lang === 'th' ? 'On-Peak แพงกว่า 2.2 เท่า' : 'On-Peak is ~2.2x more costly'}
          </div>
        </div>

        {/* Peak Shifting Savings Potential */}
        <div className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-gradient-to-br from-emerald-950/40 via-slate-950/60 to-slate-950/60 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200/80 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {lang === 'th' ? 'ศักยภาพการประหยัด (Shift Savings)' : 'Shift Savings Potential'}
            </span>
            <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black font-display text-emerald-600 dark:text-emerald-400">
            ~ ฿{stats.monthlyShiftSavings.toLocaleString()} <span className="text-xs font-normal">/ {lang === 'th' ? 'เดือน' : 'mo'}</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
            {lang === 'th' ? 'หากย้ายโหลดหนักไป Off-Peak' : 'By shifting 20% to Off-Peak'}
          </div>
        </div>
      </div>

      {/* 3. Filter Bar (Appliances + Time of Day Slices) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 mb-6">
        {/* Appliance Categories */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? 'กรองตามอุปกรณ์:' : 'Filter:'}</span>
          </span>

          {[
            { id: 'all', th: 'รวมทั้งหมด', en: 'All Devices' },
            { id: 'ac', th: 'แอร์', en: 'Air Conditioner' },
            { id: 'fridge', th: 'ตู้เย็น', en: 'Fridge' },
            { id: 'water_heater', th: 'เครื่องทำน้ำอุ่น', en: 'Water Heater' },
            { id: 'tech', th: 'คอมฯ/ไอที', en: 'Tech & PC' },
          ].map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedAppliance(app.id as ApplianceCategoryFilter)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedAppliance === app.id
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {lang === 'th' ? app.th : app.en}
            </button>
          ))}
        </div>

        {/* Time of day quick filters */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-bold hidden sm:inline">{lang === 'th' ? 'ช่วงเวลา:' : 'Timeblock:'}</span>
          {[
            { id: 'all', labelTh: 'ทั้งวัน', labelEn: 'All Day' },
            { id: 'night', labelTh: 'กลางคืน (00-06)', labelEn: 'Night (00-06)' },
            { id: 'morning', labelTh: 'เช้า (06-12)', labelEn: 'Morning (06-12)' },
            { id: 'afternoon', labelTh: 'บ่าย (12-18)', labelEn: 'Afternoon (12-18)' },
            { id: 'evening', labelTh: 'ค่ำ (18-24)', labelEn: 'Evening (18-24)' },
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setHighlightPeriod(period.id as any)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                highlightPeriod === period.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {lang === 'th' ? period.labelTh : period.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* 4. MAIN VISUALIZATION MODES */}
      <AnimatePresence mode="wait">
        {viewMode === 'matrix' && (
          <motion.div
            key="matrix-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Heatmap Legend Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs gap-3 px-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-500 dark:text-slate-400">{lang === 'th' ? 'ระดับการกินไฟ (kWh/ชม.):' : 'Energy Intensity (kWh/h):'}</span>
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 rounded-md bg-slate-200 dark:bg-slate-800 inline-block border border-slate-300 dark:border-slate-700"></span> &lt;0.4</span>
                  <span className="flex items-center gap-1 ml-2"><span className="w-3.5 h-3.5 rounded-md bg-emerald-200 dark:bg-emerald-950 inline-block border border-emerald-400/50"></span> 0.4-0.9</span>
                  <span className="flex items-center gap-1 ml-2"><span className="w-3.5 h-3.5 rounded-md bg-teal-300 dark:bg-teal-900 inline-block border border-teal-500/50"></span> 0.9-1.6</span>
                  <span className="flex items-center gap-1 ml-2"><span className="w-3.5 h-3.5 rounded-md bg-amber-300 dark:bg-amber-900 inline-block border border-amber-500/50"></span> 1.6-2.4</span>
                  <span className="flex items-center gap-1 ml-2"><span className="w-3.5 h-3.5 rounded-md bg-rose-400 dark:bg-rose-900 inline-block border border-rose-500/50"></span> &gt;2.4 (Peak)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  {lang === 'th' ? 'ช่วง On-Peak (จ.-ศ. 09:00-22:00)' : 'On-Peak (M-F 09-22)'}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                  {lang === 'th' ? 'ช่วง Off-Peak' : 'Off-Peak'}
                </span>
              </div>
            </div>

            {/* Matrix Heatmap Grid */}
            <div className="overflow-x-auto pb-4 scrollbar-thin">
              <div className="min-w-[760px] space-y-2 select-none">
                {/* Hour Header Numbers */}
                <div className="grid grid-cols-[80px_repeat(24,1fr)] gap-1 text-center font-mono text-[10px] font-bold text-slate-400 pb-1 border-b border-slate-200 dark:border-slate-800">
                  <div className="text-left pl-2">{lang === 'th' ? 'วัน \\ เวลา' : 'Day \\ Hr'}</div>
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={`header-h-${i}`}
                      className={`py-1 rounded ${
                        i >= 9 && i < 22 ? 'text-amber-500 font-extrabold bg-amber-500/5' : ''
                      } ${!isCellPeriodVisible(i) ? 'opacity-30' : ''}`}
                    >
                      {i.toString().padStart(2, '0')}
                    </div>
                  ))}
                </div>

                {/* Days Rows */}
                {daysInfo.map((day) => {
                  const dayCells = heatmapData.filter(c => c.dayIndex === day.index);
                  const isWeekend = day.index >= 5;

                  return (
                    <div
                      key={`heatmap-row-${day.index}`}
                      className={`grid grid-cols-[80px_repeat(24,1fr)] gap-1 items-center p-1 rounded-2xl transition-all ${
                        isWeekend 
                          ? isDarkMode ? 'bg-slate-950/40' : 'bg-slate-50/70' 
                          : ''
                      }`}
                    >
                      {/* Day Label */}
                      <div className="flex items-center gap-1.5 pl-2 font-display text-xs font-black">
                        <span className={`w-2 h-2 rounded-full ${isWeekend ? 'bg-purple-500' : 'bg-emerald-500'}`}></span>
                        <span className={isWeekend ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200'}>
                          {lang === 'th' ? day.shortTh : day.shortEn}
                        </span>
                      </div>

                      {/* 24 Hour Interactive Heatmap Cells */}
                      {dayCells.map((cell) => {
                        const isSelected = selectedCell?.dayIndex === cell.dayIndex && selectedCell?.hour === cell.hour;
                        const isVisible = isCellPeriodVisible(cell.hour);

                        return (
                          <div
                            key={`cell-${cell.dayIndex}-${cell.hour}`}
                            onClick={() => setSelectedCell(cell)}
                            title={`${cell.dayNameEn} ${cell.hourLabel}: ${cell.kwh} kWh (฿${cell.costThb}) - ${cell.isTouOnPeak ? 'On-Peak' : 'Off-Peak'}`}
                            className={`h-9 rounded-xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer relative ${
                              getCellColor(cell.intensityLevel, isDarkMode, isSelected)
                            } ${!isVisible ? 'opacity-20 scale-95' : 'hover:scale-105'}`}
                          >
                            <span className="text-[10px] font-mono font-bold leading-none">
                              {cell.kwh}
                            </span>
                            {/* TOU small marker */}
                            {cell.isTouOnPeak && (
                              <span className="w-1 h-1 rounded-full bg-amber-400 absolute top-1 right-1"></span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Cell Detailed Inspection Drawer */}
            <AnimatePresence>
              {selectedCell && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-5 rounded-3xl border transition-all ${
                    isDarkMode ? 'bg-slate-950 border-emerald-500/40 shadow-xl' : 'bg-emerald-50/90 border-emerald-300 shadow-md'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            {lang === 'th' ? 'เจาะลึกชั่วโมงที่เลือก (Hourly Inspection)' : 'Selected Time Snapshot'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            selectedCell.isTouOnPeak ? 'bg-amber-500/20 text-amber-500' : 'bg-teal-500/20 text-teal-500'
                          }`}>
                            {selectedCell.isTouOnPeak ? '⚡ TOU On-Peak (5.80 ฿/unit)' : '🌙 TOU Off-Peak (2.64 ฿/unit)'}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white">
                          {lang === 'th' ? selectedCell.dayNameTh : selectedCell.dayNameEn} @ {selectedCell.hourLabel} - {(selectedCell.hour + 1).toString().padStart(2, '0')}:00
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono uppercase">{lang === 'th' ? 'หน่วยไฟ' : 'Energy'}</span>
                        <span className="text-base font-black font-mono text-emerald-600 dark:text-emerald-400">{selectedCell.kwh} kWh</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono uppercase">{lang === 'th' ? 'ค่าไฟชั่วโมงนี้' : 'Hourly Cost'}</span>
                        <span className="text-base font-black font-mono text-rose-500">฿{selectedCell.costThb}</span>
                      </div>
                      <button
                        onClick={() => setSelectedCell(null)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Appliance Breakdown for selected hour */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {selectedCell.appliancesBreakdown.map((app, idx) => (
                      <div key={idx} className={`p-3 rounded-2xl border ${
                        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                            {lang === 'th' ? app.nameTh : app.nameEn}
                          </span>
                          <span className="font-mono text-slate-400 text-[11px]">{app.kwh} kWh</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                          <span style={{ color: app.color }}>฿{app.cost}</span>
                          <span className="text-[10px] text-slate-400">
                            {Math.round((app.kwh / Math.max(0.01, selectedCell.kwh)) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Hourly Curve Recharts View */}
        {viewMode === 'hourly_curve' && (
          <motion.div
            key="curve-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'เปรียบเทียบโปรไฟล์การใช้ไฟฟ้า 24 ชม. วันทำงาน (จ.-ศ.) vs วันหยุด (ส.-อา.)' : '24-Hour Load Profile: Weekday vs Weekend'}
              </span>
              <span className="text-xs font-mono text-amber-500 font-bold">
                {lang === 'th' ? 'แถบสีเหลือง = ช่วง On-Peak (09:00 - 22:00)' : 'Yellow Zone = TOU On-Peak (09-22)'}
              </span>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={hourlyCurveData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWeekday" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWeekend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  {/* On Peak Reference Zone */}
                  <ReferenceArea x1="09:00" x2="22:00" strokeOpacity={0.3} fill="#f59e0b" fillOpacity={0.08} />
                  <XAxis dataKey="hour" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" unit=" kWh" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                      borderRadius: '1rem',
                      borderColor: '#10b981',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                      fontSize: '12px'
                    }}
                    formatter={(value: any, name: string) => [
                      `${value} kWh`,
                      name === 'weekdayKwh' ? (lang === 'th' ? 'วันธรรมดา (จ.-ศ.)' : 'Weekday Avg') : (lang === 'th' ? 'วันหยุด (ส.-อา.)' : 'Weekend Avg')
                    ]}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    formatter={(val) => val === 'weekdayKwh' ? (lang === 'th' ? 'วันทำงาน (จันทร์-ศุกร์)' : 'Weekday Avg (Mon-Fri)') : (lang === 'th' ? 'วันหยุดสุดสัปดาห์ (เสาร์-อาทิตย์)' : 'Weekend Avg (Sat-Sun)')} 
                  />
                  <Area type="monotone" dataKey="weekdayKwh" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorWeekday)" />
                  <Line type="monotone" dataKey="weekendKwh" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* TOU Split Daily Bar Chart */}
        {viewMode === 'tou_split' && (
          <motion.div
            key="tou-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'การกระจายปริมาณไฟฟ้า On-Peak vs Off-Peak ในแต่ละวัน (หน่วย: kWh)' : 'Daily Energy Split: TOU On-Peak vs Off-Peak (kWh)'}
              </span>
              <span className="text-xs font-mono text-emerald-500 font-bold">
                {lang === 'th' ? 'วันเสาร์-อาทิตย์เป็น Off-Peak ทั้งวัน' : 'Weekends are 100% Off-Peak'}
              </span>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={touDailyBarData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" unit=" kWh" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                      borderRadius: '1rem',
                      borderColor: '#10b981',
                      fontSize: '12px'
                    }}
                    formatter={(value: any, name: string) => [
                      `${value} kWh`,
                      name === 'onPeakKwh' ? 'On-Peak (5.80฿)' : 'Off-Peak (2.64฿)'
                    ]}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    formatter={(val) => val === 'onPeakKwh' ? (lang === 'th' ? '⚡ ช่วง On-Peak (อัตรา 5.80 ฿)' : '⚡ On-Peak Load (5.80 ฿)') : (lang === 'th' ? '🌙 ช่วง Off-Peak (อัตรา 2.64 ฿)' : '🌙 Off-Peak Load (2.64 ฿)')} 
                  />
                  <Bar dataKey="onPeakKwh" fill="#f59e0b" stackId="tou" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="offPeakKwh" fill="#10b981" stackId="tou" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. AI Peak Optimization Insight Card */}
      <div className={`mt-6 p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row items-start gap-3.5 ${
        isDarkMode ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/30' : 'bg-emerald-50/80 border-emerald-200'
      }`}>
        <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs">
          <span className="font-black text-emerald-600 dark:text-emerald-400 font-display block">
            {lang === 'th' ? '💡 คำแนะนำปรับเวลาใช้ไฟจาก AI (Peak Load Optimization):' : '💡 AI Load Shifting Opportunity:'}
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'th'
              ? `พบพีคการใช้ไฟสะสมช่วง ${stats.maxCell.dayShortTh} เวลา ${stats.maxCell.hourLabel} น. (${stats.maxCell.kwh} kWh) การตั้งเวลาซักผ้า รีดผ้า หรือชาร์จอุปกรณ์หลัง 22:00 น. หรือวันหยุด จะช่วยลดค่าไฟเฉลี่ยได้ถึง ฿${stats.monthlyShiftSavings.toLocaleString()} ต่อเดือน`
              : `High power concentration detected on ${stats.maxCell.dayShortEn} at ${stats.maxCell.hourLabel} (${stats.maxCell.kwh} kWh). Shifting high-drain tasks to Off-Peak (after 22:00 or weekends) could save ~฿${stats.monthlyShiftSavings.toLocaleString()}/month.`}
          </p>
        </div>
      </div>
    </div>
  );
};
