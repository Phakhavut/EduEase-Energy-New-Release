import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  Calendar, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  SlidersHorizontal,
  ChevronRight,
  Sun,
  Moon,
  AlertTriangle,
  Lightbulb,
  Layers,
  BarChart3,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import {
  HeatmapHourData,
  DayWeeklySummary,
  DAYS_OF_WEEK,
  HOURS_24,
  generateWeeklyHeatmapData,
  calculateWeeklyDaySummaries
} from '../../data/weeklyHeatmapData';
import { InfoDetailMode, Appliance, UserPersona } from '../../types';

interface WeeklyUsageHeatmapProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  infoDetailMode?: InfoDetailMode;
  appliances?: Appliance[];
  persona?: UserPersona;
  onNavigateToAppliances?: () => void;
}

type MetricType = 'kwh' | 'cost' | 'watts';
type ViewMode = 'heatmap' | 'curves' | 'touBreakdown';

export const WeeklyUsageHeatmap: React.FC<WeeklyUsageHeatmapProps> = ({
  lang,
  isDarkMode,
  infoDetailMode = 'balanced',
  appliances,
  persona,
  onNavigateToAppliances,
}) => {
  const [metric, setMetric] = useState<MetricType>('kwh');
  const [viewMode, setViewMode] = useState<ViewMode>('heatmap');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('ALL');
  const [highlightPeakOnly, setHighlightPeakOnly] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<HeatmapHourData | null>(null);

  // Generate synthetic dataset linked directly to user inventory & persona
  const heatmapData = useMemo(() => generateWeeklyHeatmapData(appliances, persona), [appliances, persona]);
  const daySummaries = useMemo(() => calculateWeeklyDaySummaries(heatmapData), [heatmapData]);

  // Default selected cell to peak Saturday afternoon
  const activeCell = selectedCell || heatmapData.find(d => d.day === 'Sat' && d.hour === 14) || heatmapData[0];

  // Colors intensity calculation
  const getCellColor = (data: HeatmapHourData) => {
    if (highlightPeakOnly && !data.isPeak) {
      return isDarkMode ? 'bg-slate-800/30 text-slate-600 border-slate-800/40' : 'bg-slate-100/50 text-slate-400 border-slate-200/40';
    }

    if (data.level === 1) {
      return isDarkMode 
        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-900/40 hover:bg-emerald-900/60' 
        : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100';
    }
    if (data.level === 2) {
      return isDarkMode 
        ? 'bg-teal-900/50 text-teal-300 border-teal-800/50 hover:bg-teal-800/70' 
        : 'bg-teal-100 text-teal-900 border-teal-200 hover:bg-teal-200';
    }
    if (data.level === 3) {
      return isDarkMode 
        ? 'bg-amber-950/60 text-amber-300 border-amber-800/50 hover:bg-amber-900/70' 
        : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200';
    }
    if (data.level === 4) {
      return isDarkMode 
        ? 'bg-orange-950/80 text-orange-200 border-orange-700/60 hover:bg-orange-900/80' 
        : 'bg-orange-200 text-orange-950 border-orange-400 hover:bg-orange-300';
    }
    // Level 5 (Peak max)
    return isDarkMode 
      ? 'bg-rose-950 text-rose-100 border-rose-600/80 hover:bg-rose-900 shadow-md shadow-rose-950/50' 
      : 'bg-rose-300 text-rose-950 border-rose-400 hover:bg-rose-400 shadow-sm';
  };

  const getMetricDisplay = (data: HeatmapHourData) => {
    switch (metric) {
      case 'cost':
        return `฿${data.cost.toFixed(1)}`;
      case 'watts':
        return `${data.watts >= 1000 ? `${(data.watts / 1000).toFixed(1)}k` : data.watts}W`;
      case 'kwh':
      default:
        return `${data.kwh.toFixed(1)}`;
    }
  };

  // Recharts 24-Hour Comparison Profile Curve Data
  const hourlyProfileCurveData = useMemo(() => {
    return HOURS_24.map(h => {
      const weekdayCells = heatmapData.filter(d => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(d.day) && d.hour === h.hour);
      const weekendCells = heatmapData.filter(d => ['Sat', 'Sun'].includes(d.day) && d.hour === h.hour);

      const avgWeekdayKwh = Number((weekdayCells.reduce((acc, c) => acc + c.kwh, 0) / weekdayCells.length).toFixed(2));
      const avgWeekendKwh = Number((weekendCells.reduce((acc, c) => acc + c.kwh, 0) / weekendCells.length).toFixed(2));
      const avgWeekdayCost = Number((weekdayCells.reduce((acc, c) => acc + c.cost, 0) / weekdayCells.length).toFixed(2));
      const avgWeekendCost = Number((weekendCells.reduce((acc, c) => acc + c.cost, 0) / weekendCells.length).toFixed(2));
      const avgWeekdayWatts = Math.round(weekdayCells.reduce((acc, c) => acc + c.watts, 0) / weekdayCells.length);
      const avgWeekendWatts = Math.round(weekendCells.reduce((acc, c) => acc + c.watts, 0) / weekendCells.length);

      // If user selected a specific day
      let selectedDayVal = 0;
      if (selectedDayFilter !== 'ALL') {
        const matching = heatmapData.find(d => d.day === selectedDayFilter && d.hour === h.hour);
        if (matching) {
          selectedDayVal = metric === 'cost' ? matching.cost : metric === 'watts' ? matching.watts : matching.kwh;
        }
      }

      return {
        hour: h.label,
        hourNum: h.hour,
        weekday: metric === 'cost' ? avgWeekdayCost : metric === 'watts' ? avgWeekdayWatts : avgWeekdayKwh,
        weekend: metric === 'cost' ? avgWeekendCost : metric === 'watts' ? avgWeekendWatts : avgWeekendKwh,
        selectedDay: selectedDayVal,
        isTouPeak: h.hour >= 9 && h.hour < 22,
      };
    });
  }, [heatmapData, metric, selectedDayFilter]);

  // Overall Weekly Statistics
  const totalWeeklyKwh = useMemo(() => daySummaries.reduce((sum, d) => sum + d.totalKwh, 0), [daySummaries]);
  const totalWeeklyCost = useMemo(() => daySummaries.reduce((sum, d) => sum + d.totalCost, 0), [daySummaries]);
  const highestDay = useMemo(() => [...daySummaries].sort((a, b) => b.totalCost - a.totalCost)[0], [daySummaries]);

  return (
    <div className={`p-6 sm:p-7 rounded-[2.5rem] border transition-all shadow-sm space-y-6 ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800 text-white' 
        : 'bg-white border-slate-200/90 text-slate-900 shadow-slate-200/50'
    }`}>
      {/* Header & Meta */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/15 text-amber-500 font-black">
              <Flame className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black font-display tracking-tight text-slate-900 dark:text-white">
                  {lang === 'th' ? 'แผนที่ความร้อนการใช้ไฟฟ้า 24×7 (Weekly Usage Heatmap)' : 'Weekly Usage Heatmap (24×7)'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] uppercase tracking-wider">
                  Recharts Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'th'
                  ? 'จำแนกพฤติกรรมการใช้ไฟแยกตาม 24 ชั่วโมง และ 7 วันในสัปดาห์ ค้นหาช่วงพีคและโหลดแฝง Standby'
                  : 'Analyze consumption patterns across 24 hours and 7 days of the week to pinpoint peak surges and baseline standby loads.'}
              </p>
            </div>
          </div>
        </div>

        {/* View Switchers & Controls */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Metric Selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setMetric('kwh')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                metric === 'kwh'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              kWh
            </button>
            <button
              onClick={() => setMetric('cost')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                metric === 'cost'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ฿ {lang === 'th' ? 'บาท' : 'THB'}
            </button>
            <button
              onClick={() => setMetric('watts')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                metric === 'watts'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Watts
            </button>
          </div>

          {/* Chart View Modes */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setViewMode('heatmap')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'heatmap'
                  ? 'bg-white dark:bg-slate-700 text-amber-500 dark:text-amber-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'เมทริกซ์ 24×7' : 'Heatmap'}</span>
            </button>
            <button
              onClick={() => setViewMode('curves')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'curves'
                  ? 'bg-white dark:bg-slate-700 text-blue-500 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'กราฟเส้น 24 ชม.' : 'Hourly Curves'}</span>
            </button>
            <button
              onClick={() => setViewMode('touBreakdown')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'touBreakdown'
                  ? 'bg-white dark:bg-slate-700 text-purple-500 dark:text-purple-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'สัดส่วน TOU' : 'TOU Breakdown'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips & Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Day Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedDayFilter('ALL')}
            className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
              selectedDayFilter === 'ALL'
                ? 'bg-slate-800 dark:bg-slate-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {lang === 'th' ? 'ทุกวัน (All 7 Days)' : 'All 7 Days'}
          </button>
          {DAYS_OF_WEEK.map((d) => (
            <button
              key={d.key}
              onClick={() => setSelectedDayFilter(d.key)}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                selectedDayFilter === d.key
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang === 'th' ? d.shortTh : d.shortEn}
            </button>
          ))}
        </div>

        {/* TOU Highlight & Intensity Legend */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setHighlightPeakOnly(!highlightPeakOnly)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold border transition-all cursor-pointer ${
              highlightPeakOnly
                ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'th' ? 'เน้นช่วง On-Peak (09:00-22:00)' : 'Highlight On-Peak'}</span>
          </button>

          {/* Color Scale Legend */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 font-mono">
            <span>{lang === 'th' ? 'ต่ำ' : 'Eco'}</span>
            <div className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500/50 inline-block" title="Level 1: Minimal" />
              <span className="w-3.5 h-3.5 rounded bg-teal-500/60 inline-block" title="Level 2: Low" />
              <span className="w-3.5 h-3.5 rounded bg-amber-500/70 inline-block" title="Level 3: Moderate" />
              <span className="w-3.5 h-3.5 rounded bg-orange-500/80 inline-block" title="Level 4: High" />
              <span className="w-3.5 h-3.5 rounded bg-rose-500 inline-block" title="Level 5: Peak Max" />
            </div>
            <span>{lang === 'th' ? 'พีคสูง' : 'Peak'}</span>
          </div>
        </div>
      </div>

      {/* Main Dynamic Visualizer Area */}
      {viewMode === 'heatmap' && (
        <div className="space-y-3">
          {/* 24-Hour Column Headers */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="min-w-[760px]">
              {/* Hour Labels */}
              <div className="grid grid-cols-[60px_repeat(24,1fr)] gap-1 text-center font-mono text-[10px] text-slate-400 font-bold mb-1.5">
                <div className="text-left pl-1">{lang === 'th' ? 'วัน/ชม.' : 'Day/Hr'}</div>
                {HOURS_24.map(h => (
                  <div 
                    key={h.hour} 
                    className={`py-0.5 rounded ${h.hour % 3 === 0 ? 'text-slate-300 dark:text-slate-300 font-black' : 'text-slate-500'}`}
                  >
                    {h.hour % 2 === 0 ? `${h.hour}h` : ''}
                  </div>
                ))}
              </div>

              {/* 7 Days Heatmap Rows */}
              <div className="space-y-1.5">
                {DAYS_OF_WEEK.map((dayObj) => {
                  if (selectedDayFilter !== 'ALL' && selectedDayFilter !== dayObj.key) {
                    return null;
                  }

                  const dayCells = heatmapData.filter(d => d.day === dayObj.key);
                  const daySummary = daySummaries.find(s => s.day === dayObj.key);

                  return (
                    <div key={dayObj.key} className="grid grid-cols-[60px_repeat(24,1fr)] gap-1 items-center">
                      {/* Day Label */}
                      <div className="flex items-center gap-1.5 pr-2 font-display">
                        <span className={`text-xs font-black ${
                          dayObj.isWeekend ? 'text-amber-500 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {lang === 'th' ? dayObj.shortTh : dayObj.shortEn}
                        </span>
                        {dayObj.isWeekend && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Weekend" />
                        )}
                      </div>

                      {/* 24 Hourly Interactive Cells */}
                      {dayCells.map((cell) => {
                        const isCurrentActive = activeCell.day === cell.day && activeCell.hour === cell.hour;
                        const cellColor = getCellColor(cell);

                        return (
                          <button
                            key={cell.hour}
                            onClick={() => setSelectedCell(cell)}
                            className={`h-9 sm:h-10 rounded-lg border text-[10px] font-mono font-black flex flex-col items-center justify-center transition-all duration-150 relative cursor-pointer group ${cellColor} ${
                              isCurrentActive 
                                ? 'ring-2 ring-emerald-400 ring-offset-1 ring-offset-slate-900 scale-105 z-10 font-black' 
                                : 'hover:scale-105 hover:z-10'
                            }`}
                            title={`${cell.day} ${cell.hourLabel} - ${cell.kwh} kWh (฿${cell.cost})`}
                          >
                            <span className="leading-none text-[9px] sm:text-[10px]">
                              {getMetricDisplay(cell)}
                            </span>
                            {cell.level >= 4 && (
                              <span className="w-1 h-1 rounded-full bg-rose-400 mt-0.5 animate-pulse" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Curves View (Recharts Area / Composed Chart) */}
      {viewMode === 'curves' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>{lang === 'th' ? 'กราฟเปรียบเทียบแนวโน้ม 24 ชั่วโมง (วันทำงาน vs วันหยุดเสาร์-อาทิตย์)' : '24-Hour Hourly Profile Comparison (Weekday Avg vs Weekend Avg)'}</span>
            <span className="font-mono text-emerald-500 font-bold">
              Unit: {metric === 'cost' ? 'THB (฿)' : metric === 'watts' ? 'Watts (W)' : 'kWh'}
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyProfileCurveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeekend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorWeekday" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  {selectedDayFilter !== 'ALL' && (
                    <linearGradient id="colorSelectedDay" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                    </linearGradient>
                  )}
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="hour" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit={metric === 'cost' ? '฿' : ''} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '1rem',
                    background: isDarkMode ? '#0f172a' : '#ffffff',
                    borderColor: '#10b981',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                  }}
                  formatter={(value: any, name: string) => {
                    const label = name === 'weekend' 
                      ? (lang === 'th' ? 'วันหยุด (Weekend)' : 'Weekend') 
                      : name === 'weekday'
                        ? (lang === 'th' ? 'วันทำงาน (Weekday)' : 'Weekday')
                        : `${selectedDayFilter} (Selected)`;
                    return [`${value} ${metric === 'cost' ? '฿' : metric === 'watts' ? 'W' : 'kWh'}`, label];
                  }}
                />
                <Legend 
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => {
                    if (value === 'weekend') return lang === 'th' ? 'วันหยุดเสาร์-อาทิตย์ (Weekend Avg)' : 'Weekend Avg';
                    if (value === 'weekday') return lang === 'th' ? 'วันทำงาน จ.-ศ. (Weekday Avg)' : 'Weekday Avg';
                    return `${selectedDayFilter} (${lang === 'th' ? 'วันที่เลือก' : 'Selected'})`;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="weekend" 
                  stroke="#f59e0b" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorWeekend)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="weekday" 
                  stroke="#10b981" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorWeekday)" 
                />
                {selectedDayFilter !== 'ALL' && (
                  <Area 
                    type="monotone" 
                    dataKey="selectedDay" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSelectedDay)" 
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TOU On/Off Peak Recharts Bar Breakdown */}
      {viewMode === 'touBreakdown' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>{lang === 'th' ? 'สัดส่วนพลังงานช่วง On-Peak (แพง ฿5.26) vs Off-Peak (ประหยัด ฿2.63)' : 'TOU Energy Share: On-Peak (High ฿5.26) vs Off-Peak (Economy ฿2.63)'}</span>
            <span className="font-mono text-purple-500 font-bold">kWh / Day</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daySummaries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey={lang === 'th' ? 'dayLabelTh' : 'dayLabelEn'} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" kWh" />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '1rem',
                    background: isDarkMode ? '#0f172a' : '#ffffff',
                    borderColor: '#8b5cf6',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                  }}
                  formatter={(value: any, name: string) => {
                    const label = name === 'onPeakKwh' 
                      ? (lang === 'th' ? 'ช่วง On-Peak (09:00-22:00)' : 'On-Peak (฿5.26)') 
                      : (lang === 'th' ? 'ช่วง Off-Peak (22:00-09:00)' : 'Off-Peak (฿2.63)');
                    return [`${value} kWh`, label];
                  }}
                />
                <Legend 
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => {
                    if (value === 'onPeakKwh') return lang === 'th' ? 'On-Peak (จ.-ศ. 09:00-22:00 น.)' : 'On-Peak (09:00-22:00)';
                    return lang === 'th' ? 'Off-Peak (ประหยัดค่าไฟ 50%)' : 'Off-Peak (50% Cheaper)';
                  }}
                />
                <Bar dataKey="onPeakKwh" name="onPeakKwh" stackId="a" fill="#f43f5e" radius={[0, 0, 0, 0]} />
                <Bar dataKey="offPeakKwh" name="offPeakKwh" stackId="a" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Selected Cell Deep Dive Inspector Card */}
      <div className={`p-5 rounded-3xl border transition-all ${
        isDarkMode 
          ? 'bg-slate-950/70 border-slate-800 shadow-inner' 
          : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left info */}
          <div className="flex items-start gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 ${
              activeCell.level >= 4 
                ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' 
                : activeCell.level === 3
                  ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
            }`}>
              {activeCell.level >= 4 ? '🔥' : activeCell.level === 3 ? '⚡' : '🌱'}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display">
                  {lang === 'th' 
                    ? `วัน${activeCell.day === 'Mon' ? 'จันทร์' : activeCell.day === 'Tue' ? 'อังคาร' : activeCell.day === 'Wed' ? 'พุธ' : activeCell.day === 'Thu' ? 'พฤหัสบดี' : activeCell.day === 'Fri' ? 'ศุกร์' : activeCell.day === 'Sat' ? 'เสาร์' : 'อาทิตย์'} เวลา ${activeCell.hourLabel} - ${((activeCell.hour + 1) % 24).toString().padStart(2, '0')}:00 น.`
                    : `${activeCell.day} at ${activeCell.hourLabel} - ${((activeCell.hour + 1) % 24).toString().padStart(2, '0')}:00`}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-black uppercase ${
                  activeCell.isPeak
                    ? 'bg-rose-500/20 text-rose-500'
                    : 'bg-emerald-500/20 text-emerald-500'
                }`}>
                  {activeCell.isPeak ? 'TOU On-Peak (฿5.26)' : 'TOU Off-Peak (฿2.63)'}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'th' ? 'อุปกรณ์หลักที่ทำงาน:' : 'Primary Load:'}</span>
                <strong className="text-slate-800 dark:text-slate-200">
                  {lang === 'th' ? activeCell.primaryApplianceTh : activeCell.primaryApplianceEn}
                </strong>
              </p>
            </div>
          </div>

          {/* Right Metrics summary */}
          <div className="flex items-center gap-4 text-left md:text-right shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {lang === 'th' ? 'การใช้พลังงาน' : 'Consumption'}
              </span>
              <div className="flex items-baseline md:justify-end gap-1 font-mono">
                <span className="text-lg font-black text-slate-900 dark:text-white">{activeCell.kwh}</span>
                <span className="text-xs font-bold text-slate-400">kWh</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {lang === 'th' ? 'ค่าไฟช่วงเวลานี้' : 'Slot Cost'}
              </span>
              <div className="flex items-baseline md:justify-end gap-1 font-mono">
                <span className="text-lg font-black text-rose-500">฿{activeCell.cost.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {lang === 'th' ? 'กำลังไฟฟ้า' : 'Avg Power'}
              </span>
              <div className="flex items-baseline md:justify-end gap-1 font-mono">
                <span className="text-lg font-black text-emerald-500">{activeCell.watts}</span>
                <span className="text-xs font-bold text-slate-400">W</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Tip banner if peak */}
        {(activeCell.tipTh || activeCell.level >= 4) && (
          <div className="mt-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
              <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
              <span>
                {lang === 'th' 
                  ? (activeCell.tipTh || 'ช่วงนี้มีการใช้ไฟสูง หากตั้งเวลาปิดแอร์ล่วงหน้า 30 นาที จะเซฟได้ทันที ฿5-10 ต่อครั้ง')
                  : (activeCell.tipEn || 'High power slot! Pre-cooling or scheduling AC off 30m early cuts ฿5-10 per session.')}
              </span>
            </div>

            {onNavigateToAppliances && (
              <button
                onClick={onNavigateToAppliances}
                className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-600 dark:text-amber-300 font-bold text-xs shrink-0 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>{lang === 'th' ? 'จัดการเครื่องใช้ไฟ' : 'Manage Devices'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* 3 Key Analytical Takeaways (High-Yield Audit & Optimization) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
        {/* Metric 1: Peak Hour Window */}
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">
              {lang === 'th' ? 'ช่วงพีคสูงสุด (Peak Window)' : 'Peak Usage Window'}
            </span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-base font-black font-display text-slate-900 dark:text-white">
            {lang === 'th' ? '18:00 - 21:00 น. (ทุกวัน)' : '18:00 - 21:00 Daily'}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'th' ? 'การเปิดแอร์พร้อมทำอาหารเย็น ทำให้โหลดพุ่งแตะ 2.2 kW' : 'Concurrent cooking and AC causes 2.2 kW load spike.'}
          </p>
        </div>

        {/* Metric 2: Standby Baseline */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {lang === 'th' ? 'โหลดฐานกลางคืน (Baseline)' : 'Night Standby Baseline'}
            </span>
            <Moon className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-base font-black font-mono text-slate-900 dark:text-white">
            ~160 Watts (02:00 - 05:00)
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'th' ? 'โหลดสแตนด์บายปกติ อยู่ในเกณฑ์มาตรฐานบ้านประหยัดไฟ' : 'Healthy standby baseline within optimal eco household bounds.'}
          </p>
        </div>

        {/* Metric 3: TOU Load Shifting Opportunity */}
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              {lang === 'th' ? 'โอกาสเซฟ TOU (Load Shift)' : 'TOU Shifting Potential'}
            </span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-base font-black font-mono text-purple-600 dark:text-purple-400">
            {lang === 'th' ? 'ประหยัดได้ ~฿185/เดือน' : 'Saves ~฿185/Month'}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'th' ? 'ย้ายการซักผ้าและชาร์จอุปกรณ์ไปหลัง 22:00 น.' : 'Shift laundry & heavy charging after 22:00 Off-Peak.'}
          </p>
        </div>
      </div>
    </div>
  );
};
