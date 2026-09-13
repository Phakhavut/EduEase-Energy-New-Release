import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Zap, 
  Clock, 
  Home, 
  Plus, 
  Minus, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  HelpCircle,
  Snowflake,
  Tv,
  Flame,
  Monitor,
  Lightbulb,
  WashingMachine,
  Refrigerator,
  Microwave,
  Plug,
  Calendar,
  Layers,
  Award,
  Power
} from 'lucide-react';
import { Appliance, DataSourceType } from '../../types';
import { calculateApplianceEnergy } from '../../utils/calculations';
import confetti from 'canvas-confetti';

interface AddEditApplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appliance: Omit<Appliance, 'id'>, editId?: number) => void;
  editAppliance?: Appliance | null;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

// ฐานข้อมูล Smart Presets วัตต์และชั่วโมงสำหรับกรอกอัตโนมัติ (Gen Z Smart Defaults)
const PRESET_APPLIANCES = [
  { name: 'แอร์ห้องนอน (Inverter)', category: 'Cooling', icon: 'Snowflake', watt: 850, hours: 8, days: 7, label: 5, standby: 2 },
  { name: 'พัดลมตั้งพื้น', category: 'Misc', icon: 'Plug', watt: 45, hours: 10, days: 7, label: 5, standby: 0 },
  { name: 'ตู้เย็น 2 ประตู', category: 'Kitchen', icon: 'Refrigerator', watt: 120, hours: 24, days: 7, label: 5, standby: 0 },
  { name: 'สมาร์ททีวี 55 นิ้ว', category: 'Entertainment', icon: 'Tv', watt: 110, hours: 4, days: 7, label: 5, standby: 2 },
  { name: 'คอมพิวเตอร์เกมมิ่ง', category: 'Entertainment', icon: 'Monitor', watt: 400, hours: 5, days: 6, label: 0, standby: 4 },
  { name: 'เครื่องทำน้ำอุ่น', category: 'Bathroom', icon: 'Flame', watt: 3500, hours: 0.5, days: 7, label: 5, standby: 1 },
  { name: 'ไมโครเวฟ', category: 'Kitchen', icon: 'Microwave', watt: 800, hours: 0.3, days: 7, label: 5, standby: 2 },
  { name: 'เครื่องซักผ้าฝาหน้า', category: 'Bathroom', icon: 'WashingMachine', watt: 1800, hours: 1.5, days: 3, label: 5, standby: 2 },
  { name: 'หลอดไฟ LED', category: 'Lighting', icon: 'Lightbulb', watt: 12, hours: 6, days: 7, label: 5, standby: 0 },
];

const ROOM_OPTIONS = ['ห้องนอน', 'ห้องนั่งเล่น', 'ห้องครัว', 'ห้องน้ำ', 'ห้องทำงาน', 'ระเบียง'];
const CATEGORY_OPTIONS = [
  { id: 'Cooling', labelTh: 'ทำความเย็น', icon: Snowflake },
  { id: 'Kitchen', labelTh: 'ในครัว', icon: Refrigerator },
  { id: 'Entertainment', labelTh: 'บันเทิง/ทำงาน', icon: Monitor },
  { id: 'Bathroom', labelTh: 'ห้องน้ำ/ซักผ้า', icon: WashingMachine },
  { id: 'Lighting', labelTh: 'แสงสว่าง', icon: Lightbulb },
  { id: 'Misc', labelTh: 'ทั่วไป', icon: Plug },
];

export const AddEditApplianceModal: React.FC<AddEditApplianceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editAppliance,
  lang,
  isDarkMode,
}) => {
  // 1. Basic Fields (ข้อมูลพื้นฐาน - เห็นทันที)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cooling');
  const [hours, setHours] = useState(8);
  const [room, setRoom] = useState('ห้องนอน');
  const [icon, setIcon] = useState('Snowflake');

  // 2. Advanced Fields (ตั้งค่าขั้นสูง - พับไว้ default)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [watt, setWatt] = useState(850);
  const [daysPerWeek, setDaysPerWeek] = useState(7);
  const [quantity, setQuantity] = useState(1);
  const [purchaseYear, setPurchaseYear] = useState(new Date().getFullYear());
  const [labelNo5Stars, setLabelNo5Stars] = useState(5);
  const [standbyWatt, setStandbyWatt] = useState(2);
  const [standbyCutEnabled, setStandbyCutEnabled] = useState(false);
  const [customRate, setCustomRate] = useState<number>(4.70);

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Populate when edit mode
  useEffect(() => {
    if (editAppliance) {
      setName(editAppliance.name);
      setCategory(editAppliance.category);
      setHours(editAppliance.hours);
      setRoom(editAppliance.room || 'ห้องนอน');
      setIcon(editAppliance.icon || 'Plug');
      setWatt(editAppliance.watt);
      setDaysPerWeek(editAppliance.daysPerWeek ?? 7);
      setQuantity(editAppliance.quantity ?? 1);
      setPurchaseYear(editAppliance.purchaseYear ?? new Date().getFullYear());
      setLabelNo5Stars(editAppliance.labelNo5Stars ?? 5);
      setStandbyWatt(editAppliance.standbyWatt ?? 1.5);
      setStandbyCutEnabled(editAppliance.standbyCutEnabled ?? false);
      setCustomRate(editAppliance.customRate ?? 4.70);
    } else {
      // Reset to smart preset
      setName('แอร์ห้องนอน (Inverter)');
      setCategory('Cooling');
      setHours(8);
      setRoom('ห้องนอน');
      setIcon('Snowflake');
      setWatt(850);
      setDaysPerWeek(7);
      setQuantity(1);
      setPurchaseYear(new Date().getFullYear());
      setLabelNo5Stars(5);
      setStandbyWatt(2);
      setStandbyCutEnabled(false);
      setCustomRate(4.70);
      setShowAdvanced(false);
      setErrors({});
    }
  }, [editAppliance, isOpen]);

  if (!isOpen) return null;

  // Real-time calculation preview
  const preview = calculateApplianceEnergy(
    watt,
    hours,
    customRate,
    daysPerWeek,
    quantity,
    standbyWatt,
    standbyCutEnabled
  );

  const handleSelectPreset = (preset: typeof PRESET_APPLIANCES[0]) => {
    setName(preset.name);
    setCategory(preset.category);
    setIcon(preset.icon);
    setWatt(preset.watt);
    setHours(preset.hours);
    setDaysPerWeek(preset.days);
    setLabelNo5Stars(preset.label);
    setStandbyWatt(preset.standby);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleValidateAndSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = lang === 'th' ? 'กรุณาใส่ชื่ออุปกรณ์นิดนึงนะ' : 'Please provide a name';
    }
    if (watt <= 0) {
      newErrors.watt = lang === 'th' ? 'กำลังไฟต้องมากกว่า 0 วัตต์จ้า' : 'Watt must be > 0';
    }
    if (hours < 0 || hours > 24) {
      newErrors.hours = lang === 'th' ? 'ชั่วโมงต้องอยู่ระหว่าง 0-24 ชม./วัน' : 'Hours must be 0-24';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Determine efficiency tag
    let efficiencyTag: 'A+++ Eco' | 'Good' | 'Average' | 'Heavy Drinker' = 'Good';
    if (labelNo5Stars >= 3) efficiencyTag = 'A+++ Eco';
    else if (labelNo5Stars >= 1) efficiencyTag = 'Good';
    else if (watt > 2000) efficiencyTag = 'Heavy Drinker';
    else efficiencyTag = 'Average';

    const applianceData: Omit<Appliance, 'id'> = {
      name: name.trim(),
      category,
      room,
      watt,
      hours,
      daysPerWeek,
      quantity,
      purchaseYear,
      labelNo5Stars,
      standbyWatt,
      standbyCutEnabled,
      customRate,
      status: 'active',
      healthScore: 95,
      efficiencyTag,
      todayCost: preview.dailyCost,
      monthlyCost: preview.monthlyCost,
      icon,
      pf: 0.95,
      aiTip: labelNo5Stars >= 3 
        ? 'อุปกรณ์ฉลากเบอร์ 5 ประหยัดพลังงานยอดเยี่ยม รักษาการบำรุงรักษาอย่างสม่ำเสมอ' 
        : `ปิดสวิตช์หลังใช้งานเพื่อช่วยลดค่าไฟลงได้ ~฿${Math.round(preview.monthlyCost * 0.15)}/เดือน`,
      aiTipEn: labelNo5Stars >= 3 
        ? 'High-efficiency certified appliance. Keep filters clean for peak performance.'
        : `Turn off when idle to save ~฿${Math.round(preview.monthlyCost * 0.15)}/month`,
      logs: editAppliance ? editAppliance.logs : [
        {
          date: new Date().toISOString().split('T')[0],
          action: 'ลงทะเบียนอุปกรณ์ใหม่เข้าสู่ระบบ',
          status: 'resolved'
        }
      ]
    };

    onSave(applianceData, editAppliance ? editAppliance.id : undefined);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className={`w-full max-w-xl max-h-[90vh] flex flex-col rounded-t-[2rem] sm:rounded-3xl border shadow-2xl overflow-hidden relative ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  {editAppliance 
                    ? (lang === 'th' ? 'แก้ไขข้อมูลเครื่องใช้ไฟฟ้า' : 'Edit Appliance')
                    : (lang === 'th' ? 'เพิ่มเครื่องใช้ไฟฟ้าใหม่' : 'Add New Appliance')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th' ? 'กรอกง่าย สรุปค่าไฟให้ทันที' : 'Quick inputs with instant bill preview'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Scrollable Body */}
          <form onSubmit={handleValidateAndSave} className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {/* Quick Presets Selection (Only when adding new) */}
            {!editAppliance && (
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">
                  {lang === 'th' ? '⚡ เลือกจากอุปกรณ์ยอดนิยม (กรอกค่าให้อัตโนมัติ):' : '⚡ Quick Presets:'}
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {PRESET_APPLIANCES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className="px-3 py-1.5 rounded-full border text-xs font-medium shrink-0 transition-all hover:scale-105 active:scale-95 bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PART 1: ข้อมูลพื้นฐาน (Basic Info) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {lang === 'th' ? '1. ข้อมูลพื้นฐาน (จำเป็น)' : '1. Basic Information'}
                </h4>
              </div>

              {/* Category Chips */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
                  {lang === 'th' ? 'หมวดหมู่อุปกรณ์' : 'Category'}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {CATEGORY_OPTIONS.map((cat) => {
                    const CatIcon = cat.icon;
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategory(cat.id);
                          if (cat.id === 'Cooling') setIcon('Snowflake');
                          else if (cat.id === 'Kitchen') setIcon('Refrigerator');
                          else if (cat.id === 'Entertainment') setIcon('Monitor');
                          else if (cat.id === 'Bathroom') setIcon('WashingMachine');
                          else if (cat.id === 'Lighting') setIcon('Lightbulb');
                          else setIcon('Plug');
                        }}
                        className={`flex flex-col items-center justify-center p-2 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <CatIcon className="w-4 h-4 mb-1" />
                        <span className="text-[0.68rem] leading-tight">{cat.labelTh}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
                  {lang === 'th' ? 'ชื่ออุปกรณ์' : 'Appliance Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  placeholder={lang === 'th' ? 'เช่น แอร์ Daikin Inverter 12,000 BTU' : 'e.g. Living Room AC'}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-rose-500 bg-rose-50/20 focus:ring-rose-400'
                      : isDarkMode 
                        ? 'bg-slate-800 border-slate-700 focus:ring-emerald-500' 
                        : 'bg-slate-50 border-slate-200 focus:ring-emerald-500'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                    <span>⚠️</span> {errors.name}
                  </p>
                )}
              </div>

              {/* Hours per Day (Slider + Stepper + Quick Buttons) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {lang === 'th' ? 'ใช้งานวันละกี่ชั่วโมง?' : 'Usage Hours Per Day'}
                  </label>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                    {hours} {lang === 'th' ? 'ชม./วัน' : 'hrs/day'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setHours(Math.max(0.5, Math.round((hours - 0.5) * 10) / 10))}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <input
                    type="range"
                    min="0.5"
                    max="24"
                    step="0.5"
                    value={hours}
                    onChange={(e) => setHours(parseFloat(e.target.value))}
                    className="flex-1 accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                  />

                  <button
                    type="button"
                    onClick={() => setHours(Math.min(24, Math.round((hours + 0.5) * 10) / 10))}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Hours Buttons */}
                <div className="flex items-center gap-1.5 mt-2">
                  {[2, 4, 8, 12, 24].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHours(h)}
                      className={`flex-1 py-1 rounded-xl text-xs font-bold transition-all ${
                        hours === h
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Chips */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block">
                  {lang === 'th' ? 'ห้องที่ติดตั้ง' : 'Installed Room'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {ROOM_OPTIONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRoom(r)}
                      className={`px-3 py-1.5 rounded-2xl border text-xs font-medium transition-all ${
                        room === r
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PART 2: ตั้งค่าขั้นสูง (Advanced Settings - Accordion Progressive Disclosure) */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'th' ? 'ตั้งค่าขั้นสูง (วัตต์แม่นยำ, standby, ปีที่ซื้อ, เบอร์ 5)' : 'Advanced Settings (Watt, Standby, Stars)'}</span>
                </div>
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 space-y-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
                  >
                    {/* Exact Wattage */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {lang === 'th' ? 'กำลังไฟ (วัตต์ / W)' : 'Power Rating (Watts)'}
                        </label>
                        <span className="text-[0.68rem] text-slate-400">
                          {lang === 'th' ? 'ดูที่ฉลากหลังเครื่อง' : 'Check back label'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="1"
                          max="15000"
                          value={watt}
                          onChange={(e) => setWatt(Math.max(1, parseInt(e.target.value) || 0))}
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <span className="text-xs font-bold text-slate-400">Watts</span>
                      </div>
                    </div>

                    {/* Days per Week & Quantity */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 block">
                          {lang === 'th' ? 'วันใช้งาน/สัปดาห์' : 'Days per week'}
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setDaysPerWeek(Math.max(1, daysPerWeek - 1))}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="flex-1 text-center font-mono text-xs font-bold">{daysPerWeek} วัน</span>
                          <button
                            type="button"
                            onClick={() => setDaysPerWeek(Math.min(7, daysPerWeek + 1))}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 block">
                          {lang === 'th' ? 'จำนวนเครื่อง' : 'Quantity'}
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="flex-1 text-center font-mono text-xs font-bold">{quantity} เครื่อง</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(Math.min(20, quantity + 1))}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Label No. 5 Stars & Purchase Year */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 block">
                          {lang === 'th' ? 'ฉลากประหยัดไฟเบอร์ 5' : 'Label No. 5 Stars'}
                        </label>
                        <select
                          value={labelNo5Stars}
                          onChange={(e) => setLabelNo5Stars(parseInt(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                        >
                          <option value={0}>{lang === 'th' ? 'ไม่มีฉลาก / รุ่นธรรมดา' : 'No Star'}</option>
                          <option value={1}>{lang === 'th' ? 'เบอร์ 5 (1 ดาว ⭐)' : '1 Star ⭐'}</option>
                          <option value={2}>{lang === 'th' ? 'เบอร์ 5 (2 ดาว ⭐⭐)' : '2 Stars ⭐⭐'}</option>
                          <option value={3}>{lang === 'th' ? 'เบอร์ 5 (3 ดาว ⭐⭐⭐)' : '3 Stars ⭐⭐⭐'}</option>
                          <option value={4}>{lang === 'th' ? 'เบอร์ 5 (4 ดาว ⭐⭐⭐⭐)' : '4 Stars ⭐⭐⭐⭐'}</option>
                          <option value={5}>{lang === 'th' ? 'เบอร์ 5 (5 ดาว ⭐⭐⭐⭐⭐)' : '5 Stars ⭐⭐⭐⭐⭐'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 block">
                          {lang === 'th' ? 'ปีที่ซื้อใช้งาน' : 'Purchase Year'}
                        </label>
                        <select
                          value={purchaseYear}
                          onChange={(e) => setPurchaseYear(parseInt(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                        >
                          {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2015].map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Standby Mode & Eco Cut */}
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Power className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {lang === 'th' ? 'ไฟแวมไพร์ Standby (W)' : 'Standby Watt'}
                          </span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          max="50"
                          step="0.5"
                          value={standbyWatt}
                          onChange={(e) => setStandbyWatt(parseFloat(e.target.value) || 0)}
                          className="w-16 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-center font-bold"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                        <div>
                          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            {lang === 'th' ? 'โหมด Eco Cut (ตัดไฟ Standby 0W)' : 'Eco Cut Standby 0W'}
                          </p>
                          <p className="text-[0.68rem] text-slate-500">
                            {lang === 'th' ? 'ใช้ปลั๊กพ่วงมีสวิตช์ปิดสมบูรณ์' : 'Using switched power strip'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStandbyCutEnabled(!standbyCutEnabled)}
                          className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                            standbyCutEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        >
                          <motion.div
                            animate={{ x: standbyCutEnabled ? 20 : 2 }}
                            className="w-5 h-5 rounded-full bg-white shadow-sm"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Custom Electricity Rate */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {lang === 'th' ? 'อัตราค่าไฟต่อหน่วย (บาท/kWh)' : 'Rate (THB/kWh)'}
                        </label>
                        <span className="text-[0.68rem] text-slate-400">
                          {lang === 'th' ? 'ค่ามาตรฐานบ้าน 4.70 / หอพัก 7-8 บาท' : 'Default 4.70 / Dorm 7-8'}
                        </span>
                      </div>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        step="0.05"
                        value={customRate}
                        onChange={(e) => setCustomRate(parseFloat(e.target.value) || 4.70)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                      />
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* LIVE PREVIEW BANNER (คำนวณแบบ Real-time) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[0.68rem] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                    {lang === 'th' ? '⚡ ค่าไฟประมาณการรายเดือน (Live Preview)' : '⚡ Monthly Cost Preview'}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-300">
                      ≈ ฿{Math.round(preview.monthlyCost).toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      / {lang === 'th' ? 'เดือน' : 'mo'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    {preview.monthlyKwh.toFixed(1)} {lang === 'th' ? 'หน่วย (kWh)' : 'kWh'}
                  </div>
                  <div className="text-[0.7rem] text-slate-500">
                    ~฿{preview.dailyCost.toFixed(1)} / {lang === 'th' ? 'วัน' : 'day'}
                  </div>
                </div>
              </div>
            </div>

            {/* Empty space for sticky bottom padding */}
            <div className="h-16" />
          </form>

          {/* Sticky Bottom Save Actions */}
          <div className="absolute bottom-0 inset-x-0 p-4 border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-300 transition-colors"
            >
              {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
            </button>

            <button
              type="button"
              onClick={handleValidateAndSave}
              className="flex-1 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>
                {editAppliance 
                  ? (lang === 'th' ? 'บันทึกการแก้ไข' : 'Update Appliance')
                  : (lang === 'th' ? 'บันทึกอุปกรณ์เข้าสู่ระบบ' : 'Save Appliance')}
              </span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
