import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, Sparkles, Plus, Trash2, HelpCircle, Flame, 
  Wind, Lightbulb, Laptop, Tv, Info, Cpu, Layers, DollarSign, 
  Clock, Settings, AlertTriangle, ShieldCheck, CheckCircle2, RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, ReferenceLine 
} from 'recharts';

// Define the structure of our appliances
interface ApplianceItem {
  id: string;
  nameTh: string;
  nameEn: string;
  watt: number;
  hoursPerDay: number;
  count: number;
  category: 'cooling' | 'kitchen' | 'office' | 'entertainment' | 'other';
}

// Initial default appliances exactly as requested by the user
const INITIAL_APPLIANCES: ApplianceItem[] = [
  { id: 'ac', nameTh: 'Air Conditioner (เครื่องปรับอากาศ)', nameEn: 'Air Conditioner', watt: 1200, hoursPerDay: 8, count: 1, category: 'cooling' },
  { id: 'fridge', nameTh: 'Smart Fridge (ตู้เย็นอัจฉริยะ)', nameEn: 'Smart Fridge', watt: 150, hoursPerDay: 24, count: 1, category: 'kitchen' },
  { id: 'water_heater', nameTh: 'Water Heater (เครื่องทำน้ำอุ่น)', nameEn: 'Water Heater', watt: 2000, hoursPerDay: 1, count: 1, category: 'other' },
  { id: 'cinema_display', nameTh: 'Cinema Display (จอภาพภาพยนตร์)', nameEn: 'Cinema Display', watt: 180, hoursPerDay: 6, count: 1, category: 'entertainment' },
  { id: 'gaming_rig', nameTh: 'Gaming Rig (เครื่องเกมมิ่งสเปกสูง)', nameEn: 'Gaming Rig', watt: 450, hoursPerDay: 4, count: 1, category: 'office' }
];

// Room templates for adding appliances
const ROOM_TEMPLATES = [
  {
    nameTh: 'ห้องทำงาน (Home Office)',
    nameEn: 'Home Office',
    icon: Laptop,
    appliances: [
      { id: 'laptop', nameTh: 'โน้ตบุ๊กทำงาน', nameEn: 'Work Laptop', watt: 65, hoursPerDay: 8, count: 1, category: 'office' },
      { id: 'monitor', nameTh: 'หน้าจอเสริม LED', nameEn: 'External LED Monitor', watt: 45, hoursPerDay: 8, count: 1, category: 'office' },
      { id: 'desk_lamp', nameTh: 'โคมไฟโต๊ะทำงาน', nameEn: 'Desk Lamp LED', watt: 12, hoursPerDay: 6, count: 1, category: 'office' }
    ]
  },
  {
    nameTh: 'ห้องครัว (Kitchen)',
    nameEn: 'Kitchen',
    icon: Flame,
    appliances: [
      { id: 'microwave', nameTh: 'เตาไมโครเวฟ', nameEn: 'Microwave Oven', watt: 1000, hoursPerDay: 0.5, count: 1, category: 'kitchen' },
      { id: 'rice_cooker', nameTh: 'หม้อหุงข้าวไฟฟ้า', nameEn: 'Electric Rice Cooker', watt: 650, hoursPerDay: 1, count: 1, category: 'kitchen' },
      { id: 'kettle', nameTh: 'กาต้มน้ำร้อนไฟฟ้า', nameEn: 'Electric Kettle', watt: 1500, hoursPerDay: 0.2, count: 1, category: 'kitchen' }
    ]
  },
  {
    nameTh: 'ห้องนั่งเล่น (Living Room)',
    nameEn: 'Living Room',
    icon: Tv,
    appliances: [
      { id: 'purifier', nameTh: 'เครื่องฟอกอากาศ', nameEn: 'Smart Air Purifier', watt: 38, hoursPerDay: 24, count: 1, category: 'cooling' },
      { id: 'fan', nameTh: 'พัดลมตั้งพื้น', nameEn: 'Stand Fan', watt: 55, hoursPerDay: 12, count: 2, category: 'cooling' },
      { id: 'soundbar', nameTh: 'ชุดลำโพงซาวด์บาร์', nameEn: 'Soundbar Audio System', watt: 80, hoursPerDay: 4, count: 1, category: 'entertainment' }
    ]
  }
];

export const SmartSavingsCalculator: React.FC<{
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
  onTokensEarned?: (tokens: number) => void;
  rate?: number;
  setRate?: (val: number) => void;
  days?: number;
  setDays?: (val: number) => void;
  targetBudget?: number;
  setTargetBudget?: (val: number) => void;
  onTotalKwhChange?: (kwh: number) => void;
}> = ({
  lang = 'th',
  isDarkMode = false,
  onTokensEarned,
  rate: propRate,
  setRate: propSetRate,
  days: propDays,
  setDays: propSetDays,
  targetBudget: propTargetBudget,
  setTargetBudget: propSetSetBudget,
  onTotalKwhChange,
}) => {
  // --- Form & Configuration States (Controlled or Fallback to Local) ---
  const [localRate, setLocalRate] = useState<number>(0.3972);
  const [localDays, setLocalDays] = useState<number>(30);
  const [localTargetBudget, setLocalTargetBudget] = useState<number>(2000);

  const rate = propRate !== undefined ? propRate : localRate;
  const setRate = propSetRate !== undefined ? propSetRate : setLocalRate;

  const days = propDays !== undefined ? propDays : localDays;
  const setDays = propSetDays !== undefined ? propSetDays : setLocalDays;

  const targetBudget = propTargetBudget !== undefined ? propTargetBudget : localTargetBudget;
  const setTargetBudget = propSetSetBudget !== undefined ? propSetSetBudget : setLocalTargetBudget;

  const [onPeakPercent, setOnPeakPercent] = useState<number>(50); // ร้อยละใช้งานช่วง On-Peak
  const [appliances, setAppliances] = useState<ApplianceItem[]>(INITIAL_APPLIANCES);

  // --- UI Layout States ---
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customWatt, setCustomWatt] = useState(100);
  const [customHours, setCustomHours] = useState(4);
  const [customCount, setCustomCount] = useState(1);
  const [customCategory, setCustomCategory] = useState<'cooling' | 'kitchen' | 'office' | 'entertainment' | 'other'>('other');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Triggering tokens (optional callback)
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Check if inputs are exactly the user's defaults
  const isDefaultConfig = () => {
    if (rate !== 4.5 || days !== 30 || onPeakPercent !== 50 || appliances.length !== 5) {
      return false;
    }
    // Check if the 5 default appliances match their default values
    const ac = appliances.find(a => a.id === 'ac');
    const fridge = appliances.find(a => a.id === 'fridge');
    const heater = appliances.find(a => a.id === 'water_heater');
    const cinema = appliances.find(a => a.id === 'cinema_display');
    const gaming = appliances.find(a => a.id === 'gaming_rig');

    return (
      ac?.watt === 1200 && ac?.hoursPerDay === 8 && ac?.count === 1 &&
      fridge?.watt === 150 && fridge?.hoursPerDay === 24 && fridge?.count === 1 &&
      heater?.watt === 2000 && heater?.hoursPerDay === 1 && heater?.count === 1 &&
      cinema?.watt === 180 && cinema?.hoursPerDay === 6 && cinema?.count === 1 &&
      gaming?.watt === 450 && gaming?.hoursPerDay === 4 && gaming?.count === 1
    );
  };

  // --- Real Calculation Logic (MEA/PEA Progressive Block Tariff Type 1.1.2) ---
  const calculateDetailedNormalBill = (totalKwh: number) => {
    let remaining = totalKwh;
    
    // Block 1: 1 - 150 kWh
    const block1 = Math.min(remaining, 150);
    const block1Cost = block1 * 3.2484;
    remaining -= block1;
    
    // Block 2: 151 - 400 kWh
    const block2 = remaining > 0 ? Math.min(remaining, 250) : 0;
    const block2Cost = block2 * 4.2218;
    remaining -= block2;
    
    // Block 3: > 400 kWh
    const block3 = remaining > 0 ? remaining : 0;
    const block3Cost = block3 * 4.4217;
    
    const baseCost = block1Cost + block2Cost + block3Cost;
    
    // Service Charge (> 150 units = 24.62, otherwise 8.19)
    const serviceCharge = totalKwh > 150 ? 24.62 : 8.19;
    
    // Ft Charge
    const ftCost = totalKwh * rate; // Using `rate` state as Ft Rate
    
    const subtotal = baseCost + serviceCharge + ftCost;
    
    // VAT 7%
    const vat = subtotal * 0.07;
    
    const totalCost = subtotal + vat;
    
    return {
      kwh: totalKwh,
      block1, block1Cost,
      block2, block2Cost,
      block3, block3Cost,
      baseCost,
      serviceCharge,
      ftRate: rate, ftCost,
      subtotal,
      vat,
      totalCost
    };
  };

  const calculateDetailedTouBill = (totalKwh: number, peakRatio: number) => {
    const onPeakKwh = totalKwh * peakRatio;
    const offPeakKwh = totalKwh * (1 - peakRatio);
    
    // TOU Rates (Type 1.2)
    const onPeakCost = onPeakKwh * 5.7982;
    const offPeakCost = offPeakKwh * 2.6369;
    
    const baseCost = onPeakCost + offPeakCost;
    const serviceCharge = 312.24; // TOU service charge is 312.24
    
    // Ft Charge
    const ftCost = totalKwh * rate; // Using `rate` state as Ft Rate
    
    const subtotal = baseCost + serviceCharge + ftCost;
    const vat = subtotal * 0.07;
    const totalCost = subtotal + vat;
    
    return {
      onPeakKwh, onPeakCost,
      offPeakKwh, offPeakCost,
      baseCost,
      serviceCharge,
      ftRate: rate, ftCost,
      subtotal,
      vat,
      totalCost
    };
  };

  const totalDailyKwh = appliances.reduce((acc, item) => {
    return acc + ((item.watt * item.hoursPerDay * item.count) / 1000);
  }, 0);

  const totalKwh = totalDailyKwh * days;
  
  useEffect(() => {
    if (onTotalKwhChange) {
      onTotalKwhChange(totalKwh);
    }
  }, [totalKwh, onTotalKwhChange]);
  
  const normalBillDetails = calculateDetailedNormalBill(totalKwh);
  const touBillDetails = calculateDetailedTouBill(totalKwh, onPeakPercent / 100);

  const normalCost = Math.round(normalBillDetails.totalCost);
  const touCost = Math.round(touBillDetails.totalCost);
  
  const savings = normalCost - touCost;
  const diffPercent = normalCost > 0 ? -Math.round((savings / normalCost) * 100) : 0;
  const dailyAvg = days > 0 ? Number((normalCost / days).toFixed(2)) : 0;
  const applianceAvg = appliances.length > 0 ? Math.round(normalCost / appliances.length) : 0;

  // --- AI Overseer Analysis / Advice ---
  const getAiOverseerStatus = () => {
    const isOver = touCost > targetBudget;
    const percentage = targetBudget > 0 ? Math.round((touCost / targetBudget) * 100) : 100;
    
    if (isOver) {
      return {
        status: 'danger',
        labelTh: `เกินงบประมาณตั้งไว้ ${percentage - 100}% (${percentage}%)`,
        labelEn: `Exceeded budget by ${percentage - 100}% (${percentage}%)`,
        color: 'text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
        adviceTh: `⚠️ คำเตือนจากผู้คุม AI: ค่าไฟประเมิน (฿${touCost.toLocaleString()}) สูงเกินกว่างบที่คุณตั้งไว้ ฿${targetBudget.toLocaleString()} แนะนำให้ลดชั่วโมงใช้งานแอร์หรือย้ายช่วงเวลาเปิดใช้อุปกรณ์กำลังวัตต์สูง (เช่น เครื่องทำน้ำอุ่น หรือการเล่นเกมส์เครื่องสเปกสูง) ไปเปิดทำการในช่วงที่มีอัตรา Off-Peak ค่ำคืนมากกว่าจะช่วยดึงค่าไฟลงมาได้ถึง ฿150-250!`,
        adviceEn: `⚠️ AI Overseer Alert: Projected cost (฿${touCost.toLocaleString()}) is above your ฿${targetBudget.toLocaleString()} budget. Try optimizing high-draw appliances (like AC or Gaming Rigs) or scheduling heavy operations to off-peak slots (after 10 PM) to save an estimated ฿150-250!`
      };
    } else {
      return {
        status: 'safe',
        labelTh: `อยู่ในงบประมาณปลอดภัย (ใช้ไปแล้ว ${percentage}%)`,
        labelEn: `Within safe budget (utilizing ${percentage}%)`,
        color: 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        adviceTh: `🌿 ผู้คุม AI ประเมินแล้ว: ยอดเยี่ยมมาก! ค่าไฟประเมินแบบ TOU (฿${touCost.toLocaleString()}) อยู่ในเป้าหมายงบประมาณ ฿${targetBudget.toLocaleString()} ของคุณเรียบร้อยแล้ว คุณยังคงรักษามาตรฐานสีเขียวไว้ได้ดี หากต้องการประหยัดเพิ่มขึ้นลองเปิดโหมด Eco สำหรับตู้เย็นและถอดปลั๊กแสตนด์บายของอุปกรณ์ความบันเทิงเมื่อเลิกใช้งานเพื่อสะสมเหรียญรางวัลเพิ่มเติม`,
        adviceEn: `🌿 AI Overseer Assessment: Excellent! Your projected TOU cost of ฿${touCost.toLocaleString()} perfectly matches your target budget of ฿${targetBudget.toLocaleString()}. You are maintaining high grid sustainability. Consider turning on Eco Mode for refrigerators to reduce baseloads even further.`
      };
    }
  };

  const aiOverseer = getAiOverseerStatus();

  // --- Chart Data for Neural Data Projection ---
  // Generate 30 days of cumulative consumption and projections
  const generateChartData = () => {
    const data = [];
    const totalDailyKwh = appliances.reduce((acc, item) => {
      return acc + ((item.watt * item.hoursPerDay * item.count) / 1000);
    }, 0);

    // Days interval representation
    const step = days <= 15 ? 1 : Math.ceil(days / 15);

    for (let day = 1; day <= days; day++) {
      const dayKwh = totalDailyKwh * day;
      
      const dayNormalBill = calculateDetailedNormalBill(dayKwh);
      const dayTouBill = calculateDetailedTouBill(dayKwh, onPeakPercent / 100);

      const cumulativeNormal = dayNormalBill.totalCost;
      const cumulativeTou = dayTouBill.totalCost;

      if (day === 1 || day % step === 0 || day === days) {
        data.push({
          day: `${lang === 'th' ? 'วันที่' : 'Day'} ${day}`,
          normal: Math.round(cumulativeNormal),
          tou: Math.round(cumulativeTou),
          budget: targetBudget
        });
      }
    }
    return data;
  };

  const chartData = generateChartData();

  // --- Interaction Handlers ---
  const handleUpdateAppliance = (id: string, field: keyof ApplianceItem, value: any) => {
    setAppliances(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, [field]: value };
      }
      return app;
    }));
  };

  const handleDeleteAppliance = (id: string) => {
    setAppliances(prev => prev.filter(app => app.id !== id));
    triggerToast(lang === 'th' ? 'ลบอุปกรณ์ออกจากตารางเรียบร้อย' : 'Appliance removed successfully');
  };

  const handleAddCustomAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newApp: ApplianceItem = {
      id: `custom_${Date.now()}`,
      nameTh: `${customName} (ที่ระบุเอง)`,
      nameEn: customName,
      watt: customWatt,
      hoursPerDay: customHours,
      count: customCount,
      category: customCategory
    };

    setAppliances(prev => [...prev, newApp]);
    setCustomName('');
    setCustomWatt(100);
    setCustomHours(4);
    setCustomCount(1);
    setCustomCategory('other');
    triggerToast(lang === 'th' ? 'เพิ่มอุปกรณ์ใช้ไฟเสร็จสิ้น' : 'Custom appliance added successfully');
    
    // Earn 50 green energy tokens for adding an appliance
    if (onTokensEarned) {
      onTokensEarned(50);
    }
  };

  const handleApplyTemplate = (roomAppliances: any[]) => {
    const parsed = roomAppliances.map(app => ({
      ...app,
      id: `tmpl_${Date.now()}_${app.id}`
    }));
    setAppliances(prev => [...prev, ...parsed]);
    setShowTemplateModal(false);
    triggerToast(lang === 'th' ? 'เพิ่มอุปกรณ์ชุดจากเทมเพลตห้องเรียบร้อย!' : 'Added template appliances!');
    if (onTokensEarned) {
      onTokensEarned(80);
    }
  };

  const handleResetToDefault = () => {
    setAppliances(INITIAL_APPLIANCES);
    setRate(0.3972);
    setDays(30);
    setOnPeakPercent(50);
    setTargetBudget(2000);
    triggerToast(lang === 'th' ? 'คืนค่าอุปกรณ์เริ่มต้นสำเร็จ' : 'Reset to default configurations');
  };

  return (
    <div id="smart-savings-calculator-module" className="flex flex-col gap-6 text-slate-800 dark:text-slate-100">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-18 right-8 z-50 bg-slate-900/90 dark:bg-emerald-500 text-white dark:text-slate-950 text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700/45 backdrop-blur"
          >
            <Sparkles className="w-4 h-4 text-amber-300 dark:text-slate-950 animate-pulse" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Simulator Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Inputs and Appliance Details (7 Columns) */}
        <div className="xl:col-span-7 flex flex-col gap-5">
          
          {/* Header and Quick Settings */}
          <div className="p-5 md:p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900/20 border border-slate-150 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-dashed border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-base font-black font-display text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
                  <Calculator className="w-5 h-5 text-emerald-500" />
                  <span>{lang === 'th' ? 'เครื่องมือจำลองอัตรากินไฟและประเมินค่าไฟล่วงหน้า' : 'Energy Consumption & Bill Projection Calculator'}</span>
                </h3>
                <p className="text-[0.75rem] text-slate-500 dark:text-slate-100 mt-1">
                  {lang === 'th' 
                    ? 'ปรับแต่งพฤติกรรมการใช้ไฟของแต่ละอุปกรณ์และคำนวณตามแผนบิลปกติเทียบกับระบบ TOU' 
                    : 'Simulate individual appliance loads and compare progressive vs Time-Of-Use billing models.'}
                </p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(true)}
                  className="flex-1 sm:flex-none px-3.5 py-1.5 text-[0.75rem] font-bold font-display rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{lang === 'th' ? 'เพิ่มเทมเพลตห้อง' : 'Room Templates'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-300 transition-all flex items-center justify-center"
                  title={lang === 'th' ? 'รีเซ็ตค่าเริ่มต้น' : 'Reset to Defaults'}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Config Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* อัตราค่า Ft ต่อหน่วย */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{lang === 'th' ? 'ค่า Ft ปัจจุบัน (บาท/หน่วย)' : 'Current Ft Rate (Baht)'}</span>
                </label>
                <input
                  type="number"
                  step="0.0001"
                  min="-1"
                  max="10"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs p-3 font-semibold font-mono rounded-xl bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* จำนวนวันที่ต้องการคำนวณ */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{lang === 'th' ? 'จำนวนวันที่ต้องการคำนวณ (วัน)' : 'Calculation Period (Days)'}</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={days}
                  onChange={(e) => setDays(Math.max(1, parseInt(e.target.value, 10) || 0))}
                  className="w-full text-xs p-3 font-semibold font-mono rounded-xl bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Target Budget สำหรับการคุมงบ */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Settings className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{lang === 'th' ? 'งบประมาณตั้งไว้ (บาท)' : 'Target Budget (Baht)'}</span>
                </label>
                <input
                  type="number"
                  min="100"
                  max="100000"
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(Math.max(1, parseInt(e.target.value, 10) || 0))}
                  className="w-full text-xs p-3 font-semibold font-mono rounded-xl bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* TOU On-Peak Slider */}
              <div className="md:col-span-3 bg-white dark:bg-slate-950/20 p-3.5 rounded-2xl border border-slate-150 dark:border-slate-800/80 mt-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-300">
                    {lang === 'th' ? 'ร้อยละการใช้งานไฟช่วงเร่งด่วน (กลางวัน/On-Peak)' : 'On-Peak Usage Share (Daytime)'}
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                    {onPeakPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={onPeakPercent}
                  onChange={(e) => setOnPeakPercent(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[8px] font-mono text-slate-400 mt-1">
                  <span>{lang === 'th' ? '0% (ใช้กลางคืนทั้งหมด)' : '0% (Night / Off-Peak)'}</span>
                  <span>{lang === 'th' ? '50% (แบ่งครึ่งกลางวัน/กลางคืน)' : '50% (Balanced)'}</span>
                  <span>{lang === 'th' ? '100% (ใช้กลางวันทั้งหมด)' : '100% (Daytime / On-Peak)'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* รายละเอียดอุปกรณ์รายชิ้น */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-black font-display text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span>{lang === 'th' ? 'รายละเอียดอุปกรณ์รายชิ้น' : 'INDIVIDUAL APPLIANCE BREAKDOWN'}</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-bold font-mono text-slate-500">
                {appliances.length}
              </span>
            </h4>

            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {appliances.map((app) => {
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col gap-3.5 relative overflow-hidden"
                    >
                      {/* Grid background touch */}
                      <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-slate-100/50 dark:from-slate-800/20 to-transparent -z-10 rounded-bl-full" />

                      {/* Top Title Row */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-500">
                            {app.id === 'ac' ? <Wind className="w-4 h-4" /> :
                             app.id === 'fridge' ? <Flame className="w-4 h-4" /> :
                             app.id === 'water_heater' ? <HelpCircle className="w-4 h-4" /> :
                             app.id === 'cinema_display' ? <Tv className="w-4 h-4" /> :
                             app.id === 'gaming_rig' ? <Laptop className="w-4 h-4" /> :
                             <Settings className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-100">
                              {lang === 'th' ? app.nameTh : app.nameEn}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                                {app.watt} W
                              </span>
                              <span className="text-[9px] font-mono bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                                {((app.watt * app.hoursPerDay * app.count) / 1000).toFixed(2)} kWh/{lang === 'th' ? 'วัน' : 'day'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Delete & Count modifier */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => handleUpdateAppliance(app.id, 'count', Math.max(1, app.count - 1))}
                              className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-100"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200">
                              {app.count}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateAppliance(app.id, 'count', app.count + 1)}
                              className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-100"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteAppliance(app.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg transition-all"
                            title={lang === 'th' ? 'ลบอุปกรณ์' : 'Delete Appliance'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Double Slider Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        
                        {/* WATT Slider */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between text-[10px] font-bold text-slate-400">
                            <span>{lang === 'th' ? 'ขนาดกำลังไฟ:' : 'Power Wattage:'}</span>
                            <span className="font-mono text-slate-600 dark:text-slate-200 font-bold">{app.watt} W</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="4500"
                            step="5"
                            value={app.watt}
                            onChange={(e) => handleUpdateAppliance(app.id, 'watt', Number(e.target.value))}
                            className="w-full accent-emerald-500 bg-slate-100 dark:bg-slate-800 h-1 rounded cursor-pointer"
                          />
                        </div>

                        {/* HOURS Slider */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between text-[10px] font-bold text-slate-400">
                            <span>{lang === 'th' ? 'ชั่วโมงใช้เฉลี่ยต่อวัน:' : 'Active Hours/Day:'}</span>
                            <span className="font-mono text-slate-600 dark:text-slate-200 font-bold">{app.hoursPerDay} {lang === 'th' ? 'ชม.' : 'hrs'}</span>
                          </div>
                          <input
                            type="range"
                            min="0.1"
                            max="24"
                            step="0.1"
                            value={app.hoursPerDay}
                            onChange={(e) => handleUpdateAppliance(app.id, 'hoursPerDay', Number(e.target.value))}
                            className="w-full accent-emerald-500 bg-slate-100 dark:bg-slate-800 h-1 rounded cursor-pointer"
                          />
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {appliances.length === 0 && (
                <div className="p-8 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 text-center text-slate-400">
                  <Calculator className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs">{lang === 'th' ? 'ยังไม่มีอุปกรณ์ในรายการ กด เพิ่มเทมเพลต หรือกรอกข้อมูลด้านล่าง' : 'No appliances listed. Apply templates or add below.'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Add Custom Appliance Form */}
          <form onSubmit={handleAddCustomAppliance} className="p-4 rounded-[2rem] bg-slate-50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-800 flex flex-col gap-3">
            <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5 text-emerald-500" />
              <span>{lang === 'th' ? 'เพิ่มเครื่องใช้ไฟฟ้าแบบระบุเอง' : 'Add Custom Appliance'}</span>
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                required
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={lang === 'th' ? 'เช่น เครื่องฟอกอากาศ, ไมโครเวฟ' : 'e.g. Rice Cooker, TV'}
                className="md:col-span-2 text-xs p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 focus:outline-none"
              />
              <input
                type="number"
                min="5"
                max="5000"
                value={customWatt}
                onChange={(e) => setCustomWatt(Math.max(5, parseInt(e.target.value, 10) || 0))}
                placeholder="Watts"
                className="text-xs p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 focus:outline-none font-mono"
                title="Watts"
              />
              <button
                type="submit"
                className="py-2.5 px-4 text-xs font-bold font-display rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-all"
              >
                {lang === 'th' ? 'เพิ่มอุปกรณ์' : 'Add Device'}
              </button>
            </div>
          </form>

        </div>

        {/* RIGHT COLUMN: Results Dashboard, Charts, and AI Overseer (5 Columns) */}
        <div className="xl:col-span-5 flex flex-col gap-5">
          
          {/* Summary Dashboard Cards (The requested exact layout targets) */}
          <div className="p-5 md:p-6 rounded-[2rem] bg-slate-950 text-white shadow-xl relative overflow-hidden border border-slate-900 flex flex-col gap-5">
            <div className="absolute right-0 bottom-0 w-36 h-36 bg-emerald-500/10 blur-3xl rounded-full" />
            
            {/* Spotlight metrics */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9.5px] font-black uppercase tracking-widest text-emerald-400 font-mono">
                  {lang === 'th' ? 'ผลรวมค่าไฟฟ้าเมื่อคำนวณแบบ TOU' : 'ESTIMATED TOU BILL OUTCOME'}
                </span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-black font-mono text-emerald-400">
                    ฿{touCost.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    / {days} {lang === 'th' ? 'วัน' : 'days'}
                  </span>
                </div>
              </div>

              {/* ส่วนต่างงบประหยัดที่เพิ่มขึ้น */}
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 font-mono">
                  {lang === 'th' ? 'ส่วนต่างงบประหยัด' : 'SAVINGS DELTA'}
                </span>
                <span className={`text-lg font-black font-mono mt-1 ${diffPercent < 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {diffPercent}%
                </span>
              </div>
            </div>

            {/* Sub-grid of performance outputs */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-slate-800">
              <div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                  {lang === 'th' ? 'ค่าไฟฟ้าปกติ (ไม่มี TOU)' : 'Normal Progressive Cost'}
                </span>
                <span className="text-sm font-bold font-mono text-slate-300 mt-0.5 block">
                  ฿{normalCost.toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                  {lang === 'th' ? 'ประหยัดขึ้นกว่าค่าไฟปกติได้ถึง' : 'Potential Total Savings'}
                </span>
                <span className="text-sm font-bold font-mono text-emerald-400 mt-0.5 block">
                  ฿{savings.toLocaleString()}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-900">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                  {lang === 'th' ? 'เฉลี่ยค่าไฟต่อวัน' : 'Average Daily Burn'}
                </span>
                <span className="text-sm font-bold font-mono text-slate-200 mt-0.5 block">
                  ฿{dailyAvg.toLocaleString()}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-900">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                  {lang === 'th' ? 'เฉลี่ยต่ออุปกรณ์' : 'Avg. Per Appliance'}
                </span>
                <span className="text-sm font-bold font-mono text-slate-200 mt-0.5 block">
                  ฿{applianceAvg.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* คุมงบและผู้คุม AI (Budget Overseer Section) */}
          <div className={`p-5 rounded-[2rem] border transition-all ${aiOverseer.color} flex flex-col gap-3`}>
            <div className="flex justify-between items-center">
              <h5 className="text-[11px] font-black uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'th' ? 'คุมงบและผู้คุม AI' : 'AI Budget Overseer'}</span>
              </h5>
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/20 dark:bg-black/20 rounded font-mono">
                {lang === 'th' ? aiOverseer.labelTh : aiOverseer.labelEn}
              </span>
            </div>

            <p className="text-[10.5px] leading-relaxed">
              {lang === 'th' ? aiOverseer.adviceTh : aiOverseer.adviceEn}
            </p>
          </div>

          {/* Neural Data Projection / Power Projection Model */}
          <div className="p-5 rounded-[2rem] bg-white dark:bg-slate-900/20 border border-slate-150 dark:border-slate-800 flex flex-col gap-4">
            <div>
              <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-500" />
                <span>{lang === 'th' ? 'Neural Data Projection' : 'Neural Data Projection'}</span>
              </h5>
              <p className="text-[9px] text-slate-400 mt-0.5 font-mono">
                POWER PROJECTION MODEL - 30 DAY CUMULATIVE ESTIMATE
              </p>
            </div>

            {/* Recharts chart area */}
            <div className="h-56 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTou" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 9, fill: isDarkMode ? '#94a3b8' : '#64748b' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 9, fill: isDarkMode ? '#94a3b8' : '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `฿${v}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
                      borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                      borderRadius: '12px',
                      fontSize: '10px',
                      color: isDarkMode ? '#f8fafc' : '#0f172a'
                    }} 
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={32} 
                    iconSize={8}
                    wrapperStyle={{ fontSize: '9px', fontWeight: 'bold' }}
                  />
                  <ReferenceLine y={targetBudget} stroke="#ef4444" strokeDasharray="3 3" label={{ value: lang === 'th' ? 'งบประมาณ' : 'Budget', fill: '#ef4444', fontSize: 9, position: 'top' }} />
                  <Area 
                    name={lang === 'th' ? 'อัตราปกติ (No TOU)' : 'Normal Rate'} 
                    type="monotone" 
                    dataKey="normal" 
                    stroke="#94a3b8" 
                    fillOpacity={1} 
                    fill="url(#colorNormal)" 
                    strokeWidth={2}
                  />
                  <Area 
                    name={lang === 'th' ? 'อัตรา TOU พิเศษ' : 'TOU Optimized'} 
                    type="monotone" 
                    dataKey="tou" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorTou)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Calculation Breakdown */}
          <div className="mt-2">
            <button
              onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
              className="w-full p-4 rounded-[2rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex justify-between items-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-black uppercase tracking-widest font-mono">
                  {lang === 'th' ? 'โครงสร้างค่าไฟฟ้าแบบละเอียด (MEA/PEA)' : 'Detailed Bill Breakdown (MEA/PEA)'}
                </span>
              </div>
              <span className="text-xs font-bold font-mono">
                {showDetailedBreakdown ? (lang === 'th' ? 'ซ่อนรายละเอียด' : 'HIDE DETAILS') : (lang === 'th' ? 'แสดงรายละเอียด' : 'SHOW DETAILS')}
              </span>
            </button>

            <AnimatePresence>
              {showDetailedBreakdown && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-3"
                >
                  <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-6">
                    
                    {/* Normal Bill (Progressive) */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        {lang === 'th' ? '1. อัตราปกติแบบก้าวหน้า (ประเภท 1.1.2)' : '1. Progressive Rate (Type 1.1.2)'}
                      </h4>
                      <div className="space-y-3 font-mono text-[11px]">
                        
                        {/* Base Tariff Blocks */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-150 dark:border-slate-800/80 space-y-2">
                          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                            <span>{lang === 'th' ? 'ค่าพลังงานไฟฟ้า 150 หน่วยแรก' : 'Block 1 (1-150 kWh)'} (฿3.2484/kWh)</span>
                            <span className="font-bold">{normalBillDetails.block1Cost.toFixed(2)}</span>
                          </div>
                          {normalBillDetails.block2 > 0 && (
                            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                              <span>{lang === 'th' ? 'ค่าพลังงานไฟฟ้า 250 หน่วยถัดไป' : 'Block 2 (151-400 kWh)'} (฿4.2218/kWh)</span>
                              <span className="font-bold">{normalBillDetails.block2Cost.toFixed(2)}</span>
                            </div>
                          )}
                          {normalBillDetails.block3 > 0 && (
                            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                              <span>{lang === 'th' ? 'ค่าพลังงานไฟฟ้าหน่วยที่เกิน 400' : 'Block 3 (> 400 kWh)'} (฿4.4217/kWh)</span>
                              <span className="font-bold">{normalBillDetails.block3Cost.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-between items-center text-slate-800 dark:text-slate-200 font-black">
                            <span>{lang === 'th' ? 'รวมค่าไฟฟ้าฐาน (Base Tariff)' : 'Total Base Tariff'}</span>
                            <span>฿{normalBillDetails.baseCost.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Additional Fees */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-150 dark:border-slate-800/80 space-y-2">
                          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                            <span>{lang === 'th' ? 'ค่าบริการรายเดือน' : 'Service Charge'}</span>
                            <span className="font-bold">{normalBillDetails.serviceCharge.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                            <span>{lang === 'th' ? `ค่า Ft (฿${normalBillDetails.ftRate}/kWh)` : `Ft Charge (฿${normalBillDetails.ftRate}/kWh)`}</span>
                            <span className="font-bold">{normalBillDetails.ftCost.toFixed(2)}</span>
                          </div>
                          <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-between items-center text-slate-800 dark:text-slate-200 font-black">
                            <span>{lang === 'th' ? 'รวมเงินก่อนภาษี (Subtotal)' : 'Subtotal'}</span>
                            <span>฿{normalBillDetails.subtotal.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* VAT & Total */}
                        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                            <span>{lang === 'th' ? 'ภาษีมูลค่าเพิ่ม 7% (VAT)' : 'VAT (7%)'}</span>
                            <span className="font-bold">{normalBillDetails.vat.toFixed(2)}</span>
                          </div>
                          <div className="pt-2 border-t border-slate-300 dark:border-slate-600 flex justify-between items-center text-slate-900 dark:text-white font-black text-[13px]">
                            <span>{lang === 'th' ? 'รวมเงินค่าไฟฟ้าทั้งสิ้น (Total Net Payable)' : 'Total Net Payable'}</span>
                            <span>฿{normalBillDetails.totalCost.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TOU Bill (Time of Use) */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 font-mono mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {lang === 'th' ? '2. อัตรา TOU (ประเภท 1.2)' : '2. TOU Rate (Type 1.2)'}
                      </h4>
                      <div className="space-y-3 font-mono text-[11px]">
                        
                        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                            <span>On-Peak ({onPeakPercent}%) (฿5.7982/kWh)</span>
                            <span className="font-bold">{touBillDetails.onPeakCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                            <span>Off-Peak ({100 - onPeakPercent}%) (฿2.6369/kWh)</span>
                            <span className="font-bold">{touBillDetails.offPeakCost.toFixed(2)}</span>
                          </div>
                          <div className="pt-2 border-t border-dashed border-emerald-500/20 flex justify-between items-center text-emerald-700 dark:text-emerald-400 font-black">
                            <span>{lang === 'th' ? 'รวมค่าไฟฟ้าฐาน (Base Tariff)' : 'Total Base Tariff'}</span>
                            <span>฿{touBillDetails.baseCost.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                            <span>{lang === 'th' ? 'ค่าบริการรายเดือน (TOU)' : 'Service Charge (TOU)'}</span>
                            <span className="font-bold">{touBillDetails.serviceCharge.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                            <span>{lang === 'th' ? `ค่า Ft (฿${touBillDetails.ftRate}/kWh)` : `Ft Charge (฿${touBillDetails.ftRate}/kWh)`}</span>
                            <span className="font-bold">{touBillDetails.ftCost.toFixed(2)}</span>
                          </div>
                          <div className="pt-2 border-t border-dashed border-emerald-500/20 flex justify-between items-center text-emerald-700 dark:text-emerald-400 font-black">
                            <span>{lang === 'th' ? 'รวมเงินก่อนภาษี (Subtotal)' : 'Subtotal'}</span>
                            <span>฿{touBillDetails.subtotal.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                          <div className="flex justify-between items-center text-emerald-800 dark:text-emerald-300">
                            <span>{lang === 'th' ? 'ภาษีมูลค่าเพิ่ม 7% (VAT)' : 'VAT (7%)'}</span>
                            <span className="font-bold">{touBillDetails.vat.toFixed(2)}</span>
                          </div>
                          <div className="pt-2 border-t border-emerald-500/30 flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-black text-[13px]">
                            <span>{lang === 'th' ? 'รวมเงินค่าไฟฟ้าทั้งสิ้น (Total Net Payable)' : 'Total Net Payable'}</span>
                            <span>฿{touBillDetails.totalCost.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* MODAL: Room Templates selection */}
      <AnimatePresence>
        {showTemplateModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2rem] shadow-2xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-5">
                <h4 className="text-sm font-black font-display text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-500" />
                  <span>{lang === 'th' ? 'เพิ่มอุปกรณ์จากเทมเพลตห้อง' : 'Add Appliances from Room Templates'}</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-all text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {ROOM_TEMPLATES.map((room, idx) => {
                  const IconComp = room.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyTemplate(room.appliances)}
                      className="p-4 rounded-2xl border border-slate-150 dark:border-slate-800 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold block text-slate-700 dark:text-slate-100">
                            {lang === 'th' ? room.nameTh : room.nameEn}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">
                            {lang === 'th' 
                              ? `เพิ่มอุปกรณ์ ${room.appliances.length} ชิ้นสำหรับการกินไฟเริ่มต้นของห้องนี้` 
                              : `Add ${room.appliances.length} pre-configured appliances`}
                          </span>
                        </div>
                      </div>
                      <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-all" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
