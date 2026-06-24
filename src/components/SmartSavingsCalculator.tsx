import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Sparkles, Plus, AlertTriangle } from 'lucide-react';
import { ApplianceInput, SmartSavingsCalculatorProps } from '../types/savings.types';
import { useSavingsCalculation } from '../hooks/useSavingsCalculation';
import { CalculatorForm } from './calculator/CalculatorForm';
import { CalculatorResults } from './calculator/CalculatorResults';

export const SmartSavingsCalculator: React.FC<SmartSavingsCalculatorProps> = ({ 
  lang, 
  isDarkMode = false,
  onTokensEarned
}) => {
  const {
    appliances,
    setAppliances,
    customHabits,
    setCustomHabits,
    result,
    loading,
    error,
    handleUpdateAppliance,
    handleDeleteAppliance,
    handleCalculateSavings
  } = useSavingsCalculation(lang);

  const [committedHabits, setCommittedHabits] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('eudease_calculator_commits');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAddCustomModal, setShowAddCustomModal] = useState<boolean>(false);

  // New Custom Appliance Form State
  const [customName, setCustomName] = useState<string>('');
  const [customHours, setCustomHours] = useState<number>(4);
  const [customCount, setCustomCount] = useState<number>(1);
  const [customIsStar, setCustomIsStar] = useState<boolean>(false);
  const [customStandby, setCustomStandby] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('eudease_calculator_commits', JSON.stringify(committedHabits));
    } catch {}
  }, [committedHabits]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCalculate = async () => {
    const success = await handleCalculateSavings();
    if (success) {
      setCommittedHabits([]);
      showToast(lang === 'th' ? 'วิเคราะห์สำเร็จโดยระบบ AI!' : 'Savings plan successfully compiled by AI!');
    }
  };

  const handleAddCustomAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const id = `custom_${Date.now()}`;
    const newApp: ApplianceInput = {
      id,
      name: customName,
      nameTh: customName,
      hoursPerDay: customHours,
      count: customCount,
      isEnergyStar: customIsStar,
      standbyOff: customStandby
    };

    setAppliances(prev => [...prev, newApp]);
    setCustomName('');
    setCustomHours(4);
    setCustomCount(1);
    setCustomIsStar(false);
    setCustomStandby(false);
    setShowAddCustomModal(false);
    showToast(lang === 'th' ? 'เพิ่มเครื่องใช้ไฟฟ้าใหม่เรียบร้อย' : 'Custom appliance added successfully!');
  };

  const handleToggleCommit = (recId: string) => {
    const isCommitted = committedHabits.includes(recId);
    let updatedCommits: string[] = [];

    if (isCommitted) {
      updatedCommits = committedHabits.filter(id => id !== recId);
    } else {
      updatedCommits = [...committedHabits, recId];
      const reward = 50;
      if (onTokensEarned) {
        onTokensEarned(reward);
      }
      showToast(
        lang === 'th' 
          ? `ขอบคุณที่ร่วมรักษ์โลก! รับเพิ่ม +${reward} เหรียญพลังงานเขียว 🌿` 
          : `Habit committed! +${reward} Green Energy Tokens awarded! 🌿`
      );
    }

    setCommittedHabits(updatedCommits);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-transparent text-slate-800 dark:text-slate-100">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-18 right-8 z-50 bg-slate-900/90 dark:bg-sky-500/90 text-white dark:text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg border border-slate-700/50 flex items-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-300 dark:text-slate-900 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-5 pb-4 border-b border-dashed border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold font-display text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Calculator className="w-4.5 h-4.5 text-sky-500" />
            <span>
              {lang === 'th' ? 'เครื่องคำนวณการใช้ไฟอัจฉริยะ' : 'AI-Powered Smart Savings Calculator'}
            </span>
          </h4>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
            {lang === 'th'
              ? 'กรอกพฤติกรรมการใช้อุปกรณ์ไฟฟ้าส่วนตัวเพื่อสร้างแผนประหยัดค่าไฟระดับนาโนวินาทีวิเคราะห์โดย AI'
              : 'Profile your custom appliance schedule & usage habits to compile a bespoke, AI-optimized cost reduction blueprint.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddCustomModal(true)}
          className="px-3 py-1.5 text-[10px] font-bold font-display rounded-xl tracking-tight bg-sky-500/10 hover:bg-sky-500/15 border border-sky-500/20 text-sky-600 dark:text-sky-400 transition-all flex items-center justify-center gap-1.5 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'th' ? 'เพิ่มอุปกรณ์ใช้ไฟ' : 'Add Custom Device'}</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 mb-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-600 dark:text-rose-500 text-[10.5px] font-semibold flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <CalculatorForm
            appliances={appliances}
            customHabits={customHabits}
            setCustomHabits={setCustomHabits}
            loading={loading}
            lang={lang}
            onUpdateAppliance={handleUpdateAppliance}
            onDeleteAppliance={handleDeleteAppliance}
            onCalculate={handleCalculate}
            onAddCustomClick={() => setShowAddCustomModal(true)}
          />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <CalculatorResults
            result={result}
            lang={lang}
            committedHabits={committedHabits}
            onToggleCommit={handleToggleCommit}
          />
        </div>
      </div>

      <AnimatePresence>
        {showAddCustomModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2rem] shadow-2xl p-6 max-w-sm w-full"
            >
              <h5 className="text-sm font-bold font-display text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <Plus className="w-5 h-5 text-sky-500" />
                <span>{lang === 'th' ? 'เพิ่มอุปกรณ์ใช้ไฟที่กำหนดเอง' : 'Add Custom Device'}</span>
              </h5>

              <form onSubmit={handleAddCustomAppliance} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="custom-appliance-name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {lang === 'th' ? 'ชื่อเครื่องใช้ไฟฟ้า:' : 'Device Name:'}
                  </label>
                  <input
                    id="custom-appliance-name"
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Microwave, Washing Machine"
                    className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <label htmlFor="custom-hours-range">{lang === 'th' ? 'ระยะเวลาใช้ต่อวัน:' : 'Active Hours:'}</label>
                    <span className="font-mono text-slate-600 dark:text-slate-300">{customHours} ชม./วัน</span>
                  </div>
                  <input
                    id="custom-hours-range"
                    type="range"
                    min="0.5"
                    max="24"
                    step="0.5"
                    value={customHours}
                    onChange={(e) => setCustomHours(Number(e.target.value))}
                    className="accent-sky-500 h-1.5 rounded bg-slate-200 dark:bg-slate-800"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <label htmlFor="custom-count-input">{lang === 'th' ? 'จำนวน:' : 'Count / Quantity:'}</label>
                    <span className="font-mono text-slate-600 dark:text-slate-300">{customCount}</span>
                  </div>
                  <input
                    id="custom-count-input"
                    type="number"
                    min="1"
                    max="50"
                    value={customCount}
                    onChange={(e) => setCustomCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-sky-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-dashed border-slate-100 dark:border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customIsStar}
                      onChange={(e) => setCustomIsStar(e.target.checked)}
                      className="rounded text-sky-500 border-slate-300 dark:border-slate-700 bg-transparent h-3.5 w-3.5"
                    />
                    <span className="text-[10px] font-bold text-slate-500">
                      {lang === 'th' ? 'มีฉลากประหยัดไฟเบอร์ 5' : 'Energy Star / Highly Efficient'}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customStandby}
                      onChange={(e) => setCustomStandby(e.target.checked)}
                      className="rounded text-sky-500 border-slate-300 dark:border-slate-700 bg-transparent h-3.5 w-3.5"
                    />
                    <span className="text-[10px] font-bold text-slate-500">
                      {lang === 'th' ? 'ปิดสวิตช์แสตนด์บายเมื่อเลิกใช้' : 'Unplug standby phantom loads'}
                    </span>
                  </label>
                </div>

                <div className="flex gap-2.5 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCustomModal(false)}
                    className="flex-1 py-2.5 rounded-xl text-[10px] font-bold font-display tracking-tight bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-650 dark:text-slate-300 transition-all"
                  >
                    {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl text-[10px] font-bold font-display tracking-tight bg-sky-500 hover:bg-sky-600 text-white transition-all shadow-md"
                  >
                    {lang === 'th' ? 'เพิ่มทันที' : 'Add Device'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
