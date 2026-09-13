import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Snowflake, 
  Tv, 
  Flame, 
  Monitor, 
  Lightbulb, 
  WashingMachine, 
  Refrigerator, 
  Microwave, 
  Plug, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Trash2, 
  Power, 
  Zap, 
  Clock, 
  Calendar, 
  Leaf, 
  Award, 
  Calculator, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';
import { Appliance } from '../../types';
import { calculateApplianceEnergy } from '../../utils/calculations';
import { ContextualMicroLearningCard } from '../education/ContextualMicroLearningCard';

interface GenZApplianceCardProps {
  appliance: Appliance;
  totalHouseholdMonthlyCost: number;
  rate?: number;
  isSelected?: boolean;
  isMultiSelectMode?: boolean;
  onToggleSelect?: (id: number) => void;
  onEdit: (appliance: Appliance) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onToggleStandbyCut?: (id: number) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const GenZApplianceCard: React.FC<GenZApplianceCardProps> = ({
  appliance,
  totalHouseholdMonthlyCost,
  rate = 4.70,
  isSelected = false,
  isMultiSelectMode = false,
  onToggleSelect,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleStandbyCut,
  lang,
  isDarkMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Icon mapping
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-emerald-500' };
    switch (iconName) {
      case 'Snowflake': return <Snowflake {...props} />;
      case 'Tv': return <Tv {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'Monitor': return <Monitor {...props} />;
      case 'Lightbulb': return <Lightbulb {...props} />;
      case 'WashingMachine': return <WashingMachine {...props} />;
      case 'Refrigerator': return <Refrigerator {...props} />;
      case 'Microwave': return <Microwave {...props} />;
      default: return <Plug {...props} />;
    }
  };

  // Precise energy calculation
  const customRate = appliance.customRate || rate;
  const days = appliance.daysPerWeek ?? 7;
  const qty = appliance.quantity ?? 1;
  const standbyW = appliance.standbyWatt ?? 1.5;
  const standbyCut = appliance.standbyCutEnabled ?? false;
  
  const metrics = calculateApplianceEnergy(
    appliance.status === 'off' ? 0 : appliance.watt,
    appliance.hours,
    customRate,
    days,
    qty,
    standbyW,
    standbyCut
  );

  const monthlyCost = metrics.monthlyCost;
  const percentageOfTotal = totalHouseholdMonthlyCost > 0 
    ? Math.min(100, Math.round((monthlyCost / totalHouseholdMonthlyCost) * 100))
    : 0;

  return (
    <div
      className={`rounded-[16px] border transition-all duration-200 overflow-hidden relative ${
        isSelected
          ? 'border-[#16A34A] ring-2 ring-[#16A34A]/20'
          : isDarkMode 
            ? 'bg-[#151C23] border-white/10 hover:border-white/20' 
            : 'bg-[#FFFFFF] border-[#E2E8E4] hover:border-[#16A34A]/40'
      }`}
    >
      {/* INITIAL CARD (Strict Section 43: ICON, NAME, STATUS, MONTHLY COST, SHARE, ONE ACTION) */}
      <div className="p-4 select-none">
        <div className="flex items-center justify-between gap-3">
          {/* ICON + NAME + STATUS */}
          <div className="flex items-center gap-3 min-w-0">
            {isMultiSelectMode ? (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelect?.(appliance.id);
                }}
                className={`w-6 h-6 rounded-[8px] border flex items-center justify-center transition-colors ${
                  isSelected 
                    ? 'bg-[#16A34A] border-[#16A34A] text-white' 
                    : isDarkMode ? 'border-white/20' : 'border-[#E2E8E4]'
                }`}
                aria-label="Select appliance"
              >
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            ) : (
              <div className="w-10 h-10 rounded-[10px] bg-[#DCFCE7] dark:bg-[#16A34A]/15 text-[#15803D] dark:text-[#4ADE80] flex items-center justify-center shrink-0">
                {renderIcon(appliance.icon)}
              </div>
            )}

            <div className="min-w-0">
              <h4 className="text-sm font-bold text-[#15201A] dark:text-[#F5F7F8] truncate font-display">
                {appliance.name}
              </h4>
              {/* STATUS */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  appliance.status === 'active' ? 'bg-[#16A34A]' : 'bg-[#78857D]'
                }`} />
                <span className="text-xs text-[#53635A] dark:text-[#AAB4BE] font-medium">
                  {appliance.status === 'active' 
                    ? (lang === 'th' ? 'เปิดใช้งาน' : 'Active') 
                    : (lang === 'th' ? 'ปิดอยู่' : 'Off')}
                </span>
              </div>
            </div>
          </div>

          {/* MONTHLY COST & SHARE */}
          <div className="text-right shrink-0">
            <div className="text-base font-bold text-[#15201A] dark:text-[#F5F7F8] font-mono tabular-nums">
              ฿{Math.round(monthlyCost).toLocaleString()}
              <span className="text-[11px] font-normal text-[#78857D] ml-1">/{lang === 'th' ? 'ด.' : 'mo'}</span>
            </div>
            <div className="text-[11px] font-medium text-[#15803D] dark:text-[#4ADE80] font-mono mt-0.5">
              {percentageOfTotal}% {lang === 'th' ? 'ของค่าไฟ' : 'of bill'}
            </div>
          </div>
        </div>

        {/* ONE ACTION: Expand to progressive disclosure */}
        <div className="mt-3 pt-3 border-t border-[#E2E8E4] dark:border-white/10 flex items-center justify-between">
          <button
            onClick={() => onToggleStatus(appliance.id)}
            className={`px-2.5 py-1 rounded-[8px] text-[11px] font-semibold transition-colors flex items-center gap-1.5 ${
              appliance.status === 'active'
                ? 'bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80]'
                : isDarkMode ? 'bg-[#1B242D] text-[#AAB4BE]' : 'bg-[#F6F8F7] text-[#53635A]'
            }`}
          >
            <Power className="w-3 h-3" />
            <span>{appliance.status === 'active' ? (lang === 'th' ? 'เปิดอยู่' : 'On') : (lang === 'th' ? 'ปิดอยู่' : 'Off')}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-semibold text-[#15803D] dark:text-[#4ADE80] hover:underline"
          >
            <span>{isExpanded ? (lang === 'th' ? 'ย่อข้อมูล' : 'Collapse') : (lang === 'th' ? 'ดูรายละเอียด' : 'Details')}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* EXPANDED VIEW (Layer 4 Deep Dive: ทุกฟิลด์ครบ 100% ไม่มีข้อมูลใดหายไป) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/60 p-4 space-y-4"
          >
            {/* Grid รายละเอียดฟิลด์ครบถ้วน */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              
              {/* กำลังไฟ */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[0.68rem]">{lang === 'th' ? 'กำลังไฟจริง' : 'Rated Power'}</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{appliance.watt} วัตต์ (W)</span>
              </div>

              {/* หน่วยต่อวัน / เดือน */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[0.68rem]">{lang === 'th' ? 'พลังงานที่ใช้' : 'Energy Usage'}</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {metrics.dailyKwh.toFixed(1)} kWh/ว • {metrics.monthlyKwh.toFixed(1)}/ด
                </span>
              </div>

              {/* ฉลากเบอร์ 5 */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[0.68rem]">{lang === 'th' ? 'ฉลากประหยัดไฟ' : 'Energy Star'}</span>
                <span className="font-bold text-amber-500 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {appliance.labelNo5Stars 
                    ? `เบอร์ 5 (${appliance.labelNo5Stars} ดาว)` 
                    : (lang === 'th' ? 'รุ่นมาตรฐาน' : 'Standard')}
                </span>
              </div>

              {/* ปีที่ซื้อ & จำนวนเครื่อง */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[0.68rem]">{lang === 'th' ? 'ปีที่ซื้อ & จำนวน' : 'Purchased & Qty'}</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {appliance.purchaseYear || 2023} ({qty} เครื่อง)
                </span>
              </div>

              {/* Standby Watt & สวิตช์ Eco Cut */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[0.68rem]">{lang === 'th' ? 'ไฟแวมไพร์ Standby' : 'Standby Power'}</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {standbyCut ? '0 W (Eco Cut ตัดไฟ 100%)' : `${standbyW} W (กินไฟ ~฿${(standbyW * 24 * 30 * customRate / 1000).toFixed(0)}/ด)`}
                    </span>
                  </div>
                  {onToggleStandbyCut && (
                    <button
                      onClick={() => onToggleStandbyCut(appliance.id)}
                      className={`px-2.5 py-1 rounded-xl text-[0.68rem] font-bold transition-all ${
                        standbyCut 
                          ? 'bg-emerald-500 text-white shadow-sm' 
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {standbyCut ? 'Eco Cut ON' : 'เปิด Eco Cut'}
                    </button>
                  )}
                </div>
              </div>

              {/* คาร์บอนไดออกไซด์ CO2 */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 col-span-2">
                <span className="text-slate-400 block text-[0.68rem] flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-emerald-500" />
                  {lang === 'th' ? 'คาร์บอนฟุตพริ้นท์ (EGAT Factor 0.48)' : 'CO2 Footprint'}
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  ~{metrics.monthlyCo2Kg.toFixed(1)} kg CO₂e / {lang === 'th' ? 'เดือน' : 'month'}
                </span>
              </div>

            </div>

            {/* สูตรคำนวณแบบกางให้ดูทีละขั้นตอน (Explainable & Transparent) */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                <Calculator className="w-3.5 h-3.5 text-emerald-500" />
                <span>{lang === 'th' ? 'สูตรคำนวณค่าไฟแบบละเอียด:' : 'Formula Breakdown:'}</span>
              </div>
              <div className="font-mono text-[0.72rem] text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
                [({appliance.watt}W × {appliance.hours}ชม. × {days}/7วัน) ÷ 1,000] = {metrics.activeDailyKwh.toFixed(2)} kWh/วัน
                <br />
                {standbyW > 0 && !standbyCut && (
                  <>+ Standby: ({standbyW}W × {(24 - appliance.hours).toFixed(1)}ชม. ÷ 1,000) = {metrics.standbyDailyKwh.toFixed(3)} kWh/วัน<br /></>
                )}
                = {metrics.dailyKwh.toFixed(2)} kWh × 30 วัน = <strong>{metrics.monthlyKwh.toFixed(1)} หน่วย</strong> × ฿{customRate.toFixed(2)} = <strong>฿{monthlyCost.toFixed(2)}</strong>
              </div>
            </div>

            {/* Contextual Micro-learning Tip */}
            <ContextualMicroLearningCard
              applianceCategory={appliance.category}
              lang={lang}
              isDarkMode={isDarkMode}
              compact={true}
            />

            {/* Action Bar (แก้ไข / ลบ / สถานะ) */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleStatus(appliance.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    appliance.status === 'active'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{appliance.status === 'active' ? (lang === 'th' ? 'เปิดใช้งานอยู่' : 'Active') : (lang === 'th' ? 'ปิดอยู่' : 'Off')}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(appliance)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === 'th' ? 'แก้ไข' : 'Edit'}</span>
                </button>

                <button
                  onClick={() => onDelete(appliance.id)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all flex items-center gap-1 border border-rose-200/50 dark:border-rose-900/40"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{lang === 'th' ? 'ลบ' : 'Delete'}</span>
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
