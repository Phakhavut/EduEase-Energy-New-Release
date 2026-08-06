import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wallet, 
  Sparkles, 
  TrendingDown, 
  Clock, 
  Sliders, 
  AlertCircle, 
  CheckCircle2, 
  PiggyBank, 
  Calculator,
  Zap,
  ArrowRight
} from 'lucide-react';

import { InfoDetailMode } from '../../types';
import { ProgressiveCard } from '../common/ProgressiveCard';

interface BudgetViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  monthlyBudget: number;
  setMonthlyBudget: (val: number) => void;
  monthlyEstimate: number;
  todayCost: number;
  moneySavedMonth: number;
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  lang,
  isDarkMode,
  monthlyBudget,
  setMonthlyBudget,
  monthlyEstimate,
  todayCost,
  moneySavedMonth,
  infoDetailMode,
  onStartPageTour,
}) => {
  // TOU Simulator state
  const [onPeakHours, setOnPeakHours] = useState(6);
  const [offPeakHours, setOffPeakHours] = useState(4);
  const [shiftedKwh, setShiftedKwh] = useState(30);

  // Future Bill Simulator state
  const [upgradeAc, setUpgradeAc] = useState(true);
  const [standbyCut, setStandbyCut] = useState(true);

  // Rates in Thailand: On-Peak ~฿4.60/kWh, Off-Peak ~฿2.60/kWh
  const peakRate = 4.60;
  const offPeakRate = 2.60;

  const currentTouCost = (shiftedKwh * peakRate);
  const shiftedTouCost = (shiftedKwh * offPeakRate);
  const touSavings = currentTouCost - shiftedTouCost;

  const simulatedBillSavings = (upgradeAc ? 450 : 0) + (standbyCut ? 120 : 0);

  const budgetPercent = Math.min(100, Math.round((monthlyEstimate / monthlyBudget) * 100));

  return (
    <div id="tour-step-budget" className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. Header & Budget Cap Setter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="text-2xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Wallet className="w-6 h-6 text-emerald-500" />
              <span>{lang === 'th' ? 'การวางแผนและคำนวณงบประมาณค่าไฟ' : 'Electricity Budget Planner'}</span>
            </h2>

            {onStartPageTour && (
              <button
                onClick={() => onStartPageTour(3)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}</span>
              </button>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'th' ? 'ตั้งงบประมาณ คาดการณ์บิลล่วงหน้า และจำลองการประหยัดไฟ' : 'Set budget caps, simulate TOU rates, and project future bills.'}
          </p>
        </div>

        {/* Budget Cap Input */}
        <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="text-xs font-bold text-slate-500">
            {lang === 'th' ? 'เป้างบประมาณ:' : 'Budget Target:'}
          </span>
          <div className="flex items-center gap-1 font-mono font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
            <span>฿</span>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(Number(e.target.value) || 1000)}
              className="w-20 bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold font-mono focus:outline-none text-right"
            />
          </div>
        </div>
      </div>

      {/* 2. MAIN BUDGET PROGRESS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 md:p-8 rounded-[2.5rem] border transition-all shadow-lg ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-100 shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {lang === 'th' ? 'สถานะการใช้ไฟเดือนนี้' : 'Current Billing Cycle'}
            </span>
            <div className="text-3xl md:text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white flex items-baseline gap-2">
              ฿{monthlyEstimate.toLocaleString()}
              <span className="text-xs font-bold text-slate-400">
                / ฿{monthlyBudget.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <PiggyBank className="w-5 h-5 mb-1" />
              <span>{lang === 'th' ? `ประหยัดแล้ว ฿${moneySavedMonth}` : `Saved ฿${moneySavedMonth}`}</span>
            </div>
          </div>
        </div>

        {/* Large Visual Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-500">{lang === 'th' ? 'ความคืบหน้าของงบประมาณ' : 'Budget Consumption'}</span>
            <span className={budgetPercent > 90 ? 'text-rose-500' : 'text-emerald-500'}>
              {budgetPercent}%
            </span>
          </div>

          <div className="w-full h-4 rounded-full bg-slate-100 dark:bg-slate-800 p-0.5 overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-all ${
                budgetPercent > 90 
                  ? 'bg-rose-500' 
                  : budgetPercent > 75 
                    ? 'bg-amber-500' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${budgetPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
            {budgetPercent < 80 
              ? (lang === 'th' ? '✨ ยอดเยี่ยมมาก! การใช้ไฟยังอยู่ในเกณฑ์ควบคุมได้ตามเป้าหมาย' : '✨ Great job! Your electricity usage is well within your budget limit.')
              : (lang === 'th' ? '⚠️ ข้อควรระวัง: คาดการณ์ว่าอาจใช้ไฟเกินงบที่ตั้งไว้ ลองปรับโหมดแอร์ 26°C ช่วยควบคุม' : '⚠️ Warning: Usage is close to budget limit. Try using AC Eco 26°C mode.')}
          </p>
        </div>
      </motion.div>

      {/* 3. TIME-OF-USE (TOU) TARIFF SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-[2.5rem] border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2.5 rounded-2xl bg-teal-500/15 text-teal-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-display">
                {lang === 'th' ? 'จำลองย้ายเวลาใช้ไฟ (TOU Rate Simulator)' : 'TOU Time Shift Simulator'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'th' ? 'เปรียบเทียบค่าไฟ On-Peak (กลางวัน) vs Off-Peak (หลัง 22:00)' : 'Compare On-Peak daytime vs Off-Peak night rates'}
              </p>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-4 my-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>{lang === 'th' ? 'หน่วยไฟที่ย้ายไปใช้ช่วงหลัง 22:00 น.:' : 'Units shifted to post 22:00:'}</span>
                <span className="font-mono text-emerald-500">{shiftedKwh} kWh</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={shiftedKwh}
                onChange={(e) => setShiftedKwh(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Comparison Box */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase">
                  {lang === 'th' ? 'จ่ายเต็ม On-Peak' : 'Standard Daytime'}
                </span>
                <div className="text-lg font-extrabold font-mono text-slate-500 line-through">
                  ฿{currentTouCost.toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-[0.65rem] font-bold text-emerald-500 uppercase">
                  {lang === 'th' ? 'จ่ายช่วง Off-Peak' : 'Off-Peak Savings'}
                </span>
                <div className="text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                  ฿{shiftedTouCost.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'th' 
                  ? `ประหยัดเงินได้ทันที ฿${touSavings.toFixed(2)} / เดือน เมื่อซักผ้าหรือต้มน้ำหลังสี่ทุ่ม!`
                  : `Instantly save ฿${touSavings.toFixed(2)} / month by doing laundry after 22:00!`}
              </span>
            </div>
          </div>
        </motion.div>

        {/* 4. FUTURE BILL SIMULATOR */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-[2.5rem] border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-500">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-display">
                {lang === 'th' ? 'จำลองปรับเปลี่ยนอุปกรณ์ในอนาคต' : 'Future Bill Simulator'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'th' ? 'คำนวณบิลที่จะลดลงเมื่ออัปเกรดเครื่องใช้ไฟฟ้า' : 'Calculate bill drops from smart home upgrades'}
              </p>
            </div>
          </div>

          <div className="space-y-3 my-6">
            <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
              upgradeAc 
                ? 'border-emerald-500/50 bg-emerald-500/5' 
                : isDarkMode ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="space-y-0.5">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white block">
                  {lang === 'th' ? 'เปลี่ยนแอร์ธรรมดาเป็นระบบ Inverter A+++' : 'Upgrade AC to Inverter A+++'}
                </span>
                <span className="text-[0.65rem] text-slate-500 block">
                  {lang === 'th' ? 'ลดค่าไฟประมาณ ฿450 / เดือน' : 'Saves ~฿450 / month'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={upgradeAc}
                onChange={(e) => setUpgradeAc(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

            <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
              standbyCut 
                ? 'border-emerald-500/50 bg-emerald-500/5' 
                : isDarkMode ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="space-y-0.5">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white block">
                  {lang === 'th' ? 'ติดตั้งปลั๊กพ่วงอัจฉริยะตัดไฟสแตนด์บาย' : 'Smart Strip Standby Power Cutoff'}
                </span>
                <span className="text-[0.65rem] text-slate-500 block">
                  {lang === 'th' ? 'ลดค่าไฟประมาณ ฿120 / เดือน' : 'Saves ~฿120 / month'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={standbyCut}
                onChange={(e) => setStandbyCut(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                {lang === 'th' ? 'รวมยอดลดค่าไฟต่อเดือน:' : 'Total Projected Savings:'}
              </span>
              <span className="text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                -฿{simulatedBillSavings} / mo
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
