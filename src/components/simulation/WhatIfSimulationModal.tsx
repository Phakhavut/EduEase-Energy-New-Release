import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, 
  Sparkles, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Snowflake, 
  Laptop, 
  ShowerHead, 
  Flame, 
  TrendingDown,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WhatIfSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  currentBill?: number;
  onApplyGoal?: (savedAmount: number, goalTitle: string) => void;
}

export const WhatIfSimulationModal: React.FC<WhatIfSimulationModalProps> = ({
  isOpen,
  onClose,
  lang,
  isDarkMode,
  currentBill = 1284,
  onApplyGoal
}) => {
  // AC Hours/day: default 5, target 4
  const [acHours, setAcHours] = useState<number>(4);
  // AC Temperature: default 25, target 26
  const [acTemp, setAcTemp] = useState<number>(26);
  // PC sleep enabled
  const [pcSleep, setPcSleep] = useState<boolean>(true);
  // Shower time minutes
  const [showerMinutes, setShowerMinutes] = useState<number>(10);
  // Applied status
  const [isApplied, setIsApplied] = useState<boolean>(false);

  // Dynamic Savings Calculations
  // Base AC (1,200W): (5 - acHours) * 1.2 kW * 30 days * 4.70 THB/kWh
  const acHoursSaving = Math.max(0, Math.round((5 - acHours) * 1.2 * 30 * 4.70));
  // Temp saving: each degree above 25 saves ~8% of AC cost (~฿50/degree)
  const acTempSaving = Math.max(0, Math.round((acTemp - 25) * 52));
  // PC sleep saving: ~฿55/month
  const pcSaving = pcSleep ? 55 : 0;
  // Shower time (3,500W): (15 - showerMinutes) mins * 3.5 kW / 60 * 30 * 4.70
  const showerSaving = Math.max(0, Math.round(((15 - showerMinutes) / 60) * 3.5 * 30 * 4.70));

  const totalMonthlySaving = acHoursSaving + acTempSaving + pcSaving + showerSaving;
  const newEstimatedBill = Math.max(400, currentBill - totalMonthlySaving);

  const handleApply = () => {
    setIsApplied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onApplyGoal) {
      const title = lang === 'th'
        ? `ลดแอร์เหลือ ${acHours} ชม. & อุณหภูมิ ${acTemp}°C`
        : `AC target: ${acHours}h & ${acTemp}°C`;
      onApplyGoal(totalMonthlySaving, title);
    }
    setTimeout(() => {
      setIsApplied(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all my-8 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-white' 
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-2 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'จำลองผลลัพธ์ (What-If Simulator)' : 'What-If Simulation'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                {lang === 'th' ? 'ถ้าฉันเปลี่ยนพฤติกรรม จะประหยัดเท่าไหร่?' : 'What if I change my habits?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {lang === 'th'
                  ? 'ลองเลื่อนแถบเพื่อดูเงินที่คุณจะเซฟได้จริงในบิลเดือนนี้'
                  : 'Adjust the sliders to preview real savings on your upcoming electricity bill.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-2xl transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sliders Container */}
          <div className="space-y-5 mb-6">
            {/* 1. AC Usage Hours */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">
                    <Snowflake className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {lang === 'th' ? 'ชั่วโมงเปิดแอร์ต่อวัน' : 'AC Daily Runtime'}
                    </div>
                    <div className="text-sm font-black">
                      {acHours} {lang === 'th' ? 'ชั่วโมง/วัน' : 'hrs/day'}
                      <span className="text-xs font-normal text-slate-400 ml-1.5">
                        ({lang === 'th' ? 'เดิม 5 ชม.' : 'was 5 hrs'})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    {acHoursSaving > 0 ? `+฿${acHoursSaving}` : '฿0'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {lang === 'th' ? '/เดือน' : '/mo'}
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                step="0.5"
                value={acHours}
                onChange={(e) => setAcHours(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>2 {lang === 'th' ? 'ชม.' : 'h'}</span>
                <span>4 {lang === 'th' ? 'ชม. (แนะนำ)' : 'h (Ideal)'}</span>
                <span>8 {lang === 'th' ? 'ชม.' : 'h'}</span>
              </div>
            </div>

            {/* 2. AC Temperature */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-500 flex items-center justify-center font-bold">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {lang === 'th' ? 'อุณหภูมิแอร์' : 'AC Temperature'}
                    </div>
                    <div className="text-sm font-black">
                      {acTemp}°C
                      <span className="text-xs font-normal text-slate-400 ml-1.5">
                        ({lang === 'th' ? 'เดิม 25°C' : 'was 25°C'})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    {acTempSaving > 0 ? `+฿${acTempSaving}` : '฿0'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {lang === 'th' ? '/เดือน' : '/mo'}
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="24"
                max="28"
                step="1"
                value={acTemp}
                onChange={(e) => setAcTemp(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>24°C</span>
                <span>26°C {lang === 'th' ? '(เปิดคู่พัดลม)' : '(with fan)'}</span>
                <span>28°C</span>
              </div>
            </div>

            {/* 3. Computer Sleep */}
            <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'ปิด/พักคอมพิวเตอร์เมื่อไม่ใช้' : 'PC Sleep Mode'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {lang === 'th' ? 'ตัดไฟ Standby เมื่อไม่ได้ใช้งาน' : 'Eliminate idle drain'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPcSleep(!pcSleep)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  pcSleep
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {pcSleep ? (lang === 'th' ? 'เปิด (เซฟ ฿55)' : 'Active (Save ฿55)') : (lang === 'th' ? 'ปิดอยู่' : 'Off')}
              </button>
            </div>
          </div>

          {/* Dynamic Result Card */}
          <div className={`p-5 rounded-2xl border mb-6 transition-all ${
            isDarkMode 
              ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/30' 
              : 'bg-gradient-to-br from-emerald-50 via-white to-white border-emerald-200 shadow-md'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5" />
                  {lang === 'th' ? 'ประหยัดได้ประมาณ' : 'Estimated Monthly Saving'}
                </span>
                <div className="text-3xl sm:text-4xl font-black font-display text-emerald-600 dark:text-emerald-400 mt-0.5">
                  ≈ ฿{totalMonthlySaving.toLocaleString()}
                  <span className="text-xs font-semibold text-slate-400 ml-1.5">
                    {lang === 'th' ? '/เดือน' : '/month'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {lang === 'th'
                    ? '✨ คุณยังได้ความเย็นสบายเหมือนเดิม แต่ลดชั่วโมงที่ไม่จำเป็นลง'
                    : '✨ You stay equally comfortable while eliminating wasted runtime.'}
                </p>
              </div>

              <div className="text-right sm:border-l sm:pl-4 border-slate-200 dark:border-slate-800 shrink-0">
                <div className="text-[11px] text-slate-400">
                  {lang === 'th' ? 'บิลใหม่คาดการณ์' : 'New Projected Bill'}
                </div>
                <div className="text-lg font-black text-slate-800 dark:text-white font-mono">
                  ฿{newEstimatedBill.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 line-through">
                  ฿{currentBill.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleApply}
              disabled={isApplied}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              {isApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'th' ? 'บันทึกเป้าหมายแล้ว!' : 'Goal Saved!'}</span>
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'th' ? '🎯 ตั้งเป้าหมายนี้' : 'Set This Target'}</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className={`w-full sm:w-auto px-5 py-3.5 rounded-2xl border font-bold text-xs transition-all cursor-pointer ${
                isDarkMode 
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-400' 
                  : 'border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              {lang === 'th' ? 'ไว้ทีหลัง' : 'Cancel'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
