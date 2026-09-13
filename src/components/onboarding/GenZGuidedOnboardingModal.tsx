import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Building, 
  Building2, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Sparkles, 
  Zap, 
  Clock, 
  Wallet, 
  HelpCircle,
  Snowflake,
  Tv,
  Monitor,
  Lightbulb,
  WashingMachine,
  Refrigerator,
  Microwave,
  Plug,
  Flame
} from 'lucide-react';
import { Appliance } from '../../types';
import confetti from 'canvas-confetti';

interface GenZGuidedOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: {
    homeType: 'dorm' | 'condo' | 'house';
    selectedAppliances: Omit<Appliance, 'id'>[];
    recentBill?: number;
  }) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

interface ApplianceCatalogItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  defaultWatt: number;
  defaultHours: number;
  standbyWatt: number;
  hintTh: string;
}

const CATALOG_ITEMS: ApplianceCatalogItem[] = [
  { id: 'ac_9000', name: 'แอร์ (Inverter 9,000-12,000 BTU)', category: 'Cooling', iconName: 'Snowflake', defaultWatt: 850, defaultHours: 8, standbyWatt: 2, hintTh: 'ยอดนิยมในห้องนอน ประหยัดไฟ' },
  { id: 'fan_stand', name: 'พัดลมตั้งพื้น', category: 'Misc', iconName: 'Plug', defaultWatt: 45, defaultHours: 10, standbyWatt: 0, hintTh: 'กินไฟน้อยมาก เปิดคู่แอร์ช่วยประหยัด' },
  { id: 'fridge_small', name: 'ตู้เย็น 1-2 ประตู', category: 'Kitchen', iconName: 'Refrigerator', defaultWatt: 100, defaultHours: 24, standbyWatt: 0, hintTh: 'ทำงาน 24 ชม. ตัดต่อตามความเย็น' },
  { id: 'tv_smart', name: 'สมาร์ททีวี 43-55 นิ้ว', category: 'Entertainment', iconName: 'Tv', defaultWatt: 90, defaultHours: 4, standbyWatt: 2, hintTh: 'ระวังไฟ Standby ตอนปิดด้วยรีโมท' },
  { id: 'laptop_pc', name: 'คอมพิวเตอร์ / แล็ปท็อป', category: 'Entertainment', iconName: 'Monitor', defaultWatt: 150, defaultHours: 6, standbyWatt: 3, hintTh: 'รวมชาร์จแบตและจอภาพ' },
  { id: 'water_heater', name: 'เครื่องทำน้ำอุ่น', category: 'Bathroom', iconName: 'Flame', defaultWatt: 3500, defaultHours: 0.5, standbyWatt: 1, hintTh: 'วัตต์สูงมาก แต่เปิดใช้วันละแป๊บเดียว' },
  { id: 'microwave', name: 'ไมโครเวฟ', category: 'Kitchen', iconName: 'Microwave', defaultWatt: 800, defaultHours: 0.3, standbyWatt: 2, hintTh: 'อุ่นอาหาร 2-3 นาทีต่อมื้อ' },
  { id: 'washing_machine', name: 'เครื่องซักผ้า', category: 'Bathroom', iconName: 'WashingMachine', defaultWatt: 500, defaultHours: 1, standbyWatt: 1, hintTh: 'เฉลี่ยสัปดาห์ละ 2-3 ครั้ง' },
  { id: 'lights_led', name: 'หลอดไฟ LED (ทั้งห้อง)', category: 'Lighting', iconName: 'Lightbulb', defaultWatt: 40, defaultHours: 6, standbyWatt: 0, hintTh: 'กินไฟน้อยกว่าหลอดไส้ 80%' },
];

// Presets based on home type
const PRESET_MAPPINGS: Record<'dorm' | 'condo' | 'house', string[]> = {
  dorm: ['ac_9000', 'fan_stand', 'fridge_small', 'laptop_pc', 'lights_led'],
  condo: ['ac_9000', 'fan_stand', 'fridge_small', 'tv_smart', 'microwave', 'water_heater', 'lights_led'],
  house: ['ac_9000', 'fan_stand', 'fridge_small', 'tv_smart', 'laptop_pc', 'water_heater', 'washing_machine', 'microwave', 'lights_led']
};

export const GenZGuidedOnboardingModal: React.FC<GenZGuidedOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  lang,
  isDarkMode,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Step 1: Home Type
  const [homeType, setHomeType] = useState<'dorm' | 'condo' | 'house'>('condo');

  // Step 2: Selected Appliance IDs
  const [selectedIds, setSelectedIds] = useState<string[]>(PRESET_MAPPINGS.condo);

  // Step 3: Main appliance hours configuration (for AC or primary device)
  const [acHours, setAcHours] = useState<number>(8);

  // Step 4: Recent Bill (optional calibration)
  const [recentBill, setRecentBill] = useState<string>('1200');

  // Tooltip Explanations for hard technical terms
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectHomeType = (type: 'dorm' | 'condo' | 'house') => {
    setHomeType(type);
    setSelectedIds(PRESET_MAPPINGS[type]);
  };

  const handleToggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleFinish = () => {
    // Generate Appliance items
    const generatedAppliances: Omit<Appliance, 'id'>[] = selectedIds.map(id => {
      const catalog = CATALOG_ITEMS.find(c => c.id === id)!;
      const hours = catalog.id.includes('ac') ? acHours : catalog.defaultHours;
      const dailyKwh = (catalog.defaultWatt * hours) / 1000;
      const monthlyCost = dailyKwh * 30 * 4.70;

      return {
        name: catalog.name,
        category: catalog.category,
        room: homeType === 'dorm' ? 'ห้องพัก' : 'ห้องนั่งเล่น',
        watt: catalog.defaultWatt,
        hours: hours,
        daysPerWeek: 7,
        quantity: 1,
        purchaseYear: 2023,
        labelNo5Stars: 5,
        standbyWatt: catalog.standbyWatt,
        standbyCutEnabled: false,
        status: 'active',
        healthScore: 95,
        efficiencyTag: 'Good',
        todayCost: dailyKwh * 4.70,
        monthlyCost: monthlyCost,
        icon: catalog.iconName,
        pf: 0.95,
        aiTip: 'อุปกรณ์นี้สร้างขึ้นจากระบบเริ่มต้นแบบฉลาด สามารถปรับแต่งวัตต์และชั่วโมงได้ตลอดเวลา',
        aiTipEn: 'Smart default configured. Feel free to adjust wattage or runtime anytime.',
        logs: [
          {
            date: new Date().toISOString().split('T')[0],
            action: 'เพิ่มอุปกรณ์ผ่านระบบ Onboarding Wizard',
            status: 'resolved'
          }
        ]
      };
    });

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    onComplete({
      homeType,
      selectedAppliances: generatedAppliances,
      recentBill: recentBill ? parseFloat(recentBill) : undefined
    });
    onClose();
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Snowflake': return <Snowflake className="w-5 h-5 text-emerald-500" />;
      case 'Tv': return <Tv className="w-5 h-5 text-emerald-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-emerald-500" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-emerald-500" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5 text-emerald-500" />;
      case 'WashingMachine': return <WashingMachine className="w-5 h-5 text-emerald-500" />;
      case 'Refrigerator': return <Refrigerator className="w-5 h-5 text-emerald-500" />;
      case 'Microwave': return <Microwave className="w-5 h-5 text-emerald-500" />;
      default: return <Plug className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md p-0 sm:p-4">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        className={`w-full max-w-lg rounded-t-[2.5rem] sm:rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Header & Progress Bar */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-xs font-mono">
                {step}/{totalSteps}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'th' ? 'เริ่มต้นใช้งานง่ายใน 60 วินาที' : 'Quick 60s Setup'}
              </span>
            </div>

            {/* Skip Button */}
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold px-2 py-1 rounded-lg transition-colors"
            >
              {lang === 'th' ? 'ข้ามไปก่อน' : 'Skip for now'}
            </button>
          </div>

          {/* Progress Line */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <motion.div
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        </div>

        {/* Wizard Step Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: บ้านคุณเป็นแบบไหน? */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-black mb-1">
                    {lang === 'th' ? 'ที่พักของคุณเป็นแบบไหน? 🏠' : 'Where do you live?'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'เราจะเตรียมชุดเครื่องใช้ไฟฟ้าเริ่มต้นที่ตรงกับห้องคุณให้เลย' : 'We will prepare smart presets tailored to your home type'}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  {[
                    { id: 'dorm', label: 'หอพัก / อพาร์ตเมนต์', desc: 'ห้องสตูดิโอ เครื่องใช้ไฟฟ้าพื้นฐาน 4-5 ชิ้น', icon: Building, badge: 'ยอดนิยมในหมู่นักศึกษา' },
                    { id: 'condo', label: 'คอนโดมิเนียม', desc: '1 ห้องนอน / 1 ห้องครัว พร้อมแอร์และไมโครเวฟ', icon: Building2, badge: 'First Jobber แนะนำ' },
                    { id: 'house', label: 'บ้านเดี่ยว / ทาวน์โฮม', desc: 'หลายห้อง มีแอร์หลายตัว เครื่องซักผ้า ปั๊มน้ำ', icon: Home, badge: 'สำหรับครอบครัว' },
                  ].map((item) => {
                    const ItemIcon = item.icon;
                    const isSelected = homeType === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectHomeType(item.id as any)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-2xl ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            <ItemIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm sm:text-base font-bold">{item.label}</h4>
                              {isSelected && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[0.62rem] font-bold">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-1">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: เลือกเครื่องใช้ไฟฟ้าที่มี (Grid Icons) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-black mb-1">
                    {lang === 'th' ? 'เลือกเครื่องใช้ไฟฟ้าที่มี ⚡' : 'Select appliances you own'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'กดเลือกง่ายๆ ไม่ต้องพิมพ์ เราใส่ค่าวัตต์มาตรฐานให้เรียบร้อย' : 'One tap selection with smart defaults already applied'}
                  </p>
                </div>

                {/* Empty State warning if none selected */}
                {selectedIds.length === 0 && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-xs text-center font-bold">
                    {lang === 'th' ? 'แตะเลือกเครื่องใช้ไฟฟ้าอย่างน้อย 1 ชิ้นนะ' : 'Please select at least 1 appliance'}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
                  {CATALOG_ITEMS.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleToggleItem(item.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 opacity-70'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-500/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                            {renderIcon(item.iconName)}
                          </div>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-xs font-bold leading-tight mb-1">{item.name}</h4>
                          <span className="text-[0.65rem] font-mono text-emerald-600 dark:text-emerald-400 block font-semibold">
                            ≈ {item.defaultWatt} วัตต์
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[0.7rem] text-slate-400 text-center">
                  💡 {lang === 'th' ? 'ไม่ต้องกังวลเรื่องวัตต์เป๊ะๆ สามารถแก้ไขได้ทุกเมื่อในภายหลัง' : 'Wattage can be fine-tuned anytime'}
                </p>
              </motion.div>
            )}

            {/* STEP 3: ใช้กี่ชั่วโมงต่อวัน? (Slider + Presets) */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-black mb-1">
                    {lang === 'th' ? 'เปิดแอร์วันละกี่ชั่วโมง? ❄️' : 'How long do you run AC?'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'แอร์คือตัวแปร 60% ของค่าไฟบ้าน! ปรับชั่วโมงหลักตรงนี้ได้เลย' : 'AC makes up ~60% of total bills. Adjust average daily hours:'}
                  </p>
                </div>

                {/* Big Hours Display */}
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-5xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">
                    {acHours}
                    <span className="text-lg font-bold text-slate-400 ml-2">{lang === 'th' ? 'ชม./วัน' : 'hrs/day'}</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {lang === 'th' ? `ประมาณการค่าไฟแอร์เครื่องนี้ ~฿${Math.round((850 * acHours * 30 * 4.7) / 1000).toLocaleString()}/เดือน` : `Estimated AC cost: ~฿${Math.round((850 * acHours * 30 * 4.7) / 1000)}/mo`}
                  </p>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="24"
                    step="1"
                    value={acHours}
                    onChange={(e) => setAcHours(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[0.68rem] text-slate-400 font-mono">
                    <span>1 ชม.</span>
                    <span>8 ชม. (เวลานอน)</span>
                    <span>24 ชม.</span>
                  </div>
                </div>

                {/* Quick Preset Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[2, 4, 8, 12].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setAcHours(h)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        acHours === h
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {h} {lang === 'th' ? 'ชั่วโมง' : 'hours'}
                    </button>
                  ))}
                </div>

                {/* Friendly Tooltip for technical terms */}
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">เคล็ดลับวัยรุ่นประหยัดไฟ:</span> เปิด 26° คู่กับพัดลมเบอร์ 1 ได้ความเย็นฉ่ำเท่า 24° แต่ประหยัดเงินได้เดือนละร้อยกว่าบาท!
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: ค่าไฟเดือนล่าสุดเท่าไหร่? (Optional Calibration) */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-black mb-1">
                    {lang === 'th' ? 'ค่าไฟเดือนล่าสุดประมาณเท่าไหร่? 💳' : 'Recent electricity bill?'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'ใส่เพื่อเทียบความแม่นยำ (ไม่ใส่ก็ได้ ข้ามได้เลย)' : 'Optional: Used to calibrate and track your monthly savings'}
                  </p>
                </div>

                {/* Bill Input with presets */}
                <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <label className="text-xs font-semibold text-slate-500 block mb-1">
                    {lang === 'th' ? 'ค่าไฟล่าสุด (บาท)' : 'Recent Bill (THB)'}
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-slate-400">฿</span>
                    <input
                      type="number"
                      value={recentBill}
                      onChange={(e) => setRecentBill(e.target.value)}
                      placeholder="1,200"
                      className="w-full text-3xl font-black font-mono bg-transparent text-emerald-600 dark:text-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Quick Bill Chips */}
                <div className="flex items-center gap-2">
                  {['500', '1000', '1500', '2500'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setRecentBill(amt)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        recentBill === amt
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      ฿{amt}
                    </button>
                  ))}
                </div>

                {/* Terms Explanation Tooltip Accordion */}
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs space-y-2">
                  <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                    <span>คำศัพท์ที่พบบ่อย (เข้าใจง่ายใน 5 วิ):</span>
                  </div>
                  <ul className="text-[0.72rem] text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• <strong>วัตต์ (Watt):</strong> แรงดูดไฟตอนเปิด ยิ่งเลขเยอะ ยิ่งกินไฟแรง</li>
                    <li>• <strong>หน่วย (kWh):</strong> ปริมาณไฟที่ใช้จริง 1,000 วัตต์เปิด 1 ชม. = 1 หน่วย (~4.7 บาท)</li>
                    <li>• <strong>Standby:</strong> เสียบปลั๊กทิ้งไว้แต่กดปิดรีโมท ไฟยังแอบวิ่งเลี้ยงวงจรอยู่</li>
                  </ul>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 shrink-0">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'th' ? 'ย้อนกลับ' : 'Back'}</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 2 && selectedIds.length === 0}
              className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <span>{lang === 'th' ? 'ถัดไป' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'th' ? 'พร้อมแล้ว! เริ่มใช้งานเลย' : 'Get Started'}</span>
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
};
