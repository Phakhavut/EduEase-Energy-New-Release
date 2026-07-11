import React, { useState } from 'react';
import { SmartSavingsCalculator } from './SmartSavingsCalculator';
import { BillingSimulator } from './BillingSimulator';
import { Calculator, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConsolidatedCalculator: React.FC<any> = ({
  lang,
  isDarkMode,
  onTokensEarned,
  sharedFtRate,
  setSharedFtRate,
  calcDays,
  setCalcDays,
  globalBudget,
  setGlobalBudget,
  plannedKwh,
  setPlannedKwh
}) => {
  const [activeMode, setActiveMode] = useState<"savings" | "billing">("savings");

  return (
    <div className="w-full mb-6">
      <div className="dashboard-card border border-slate-200 dark:border-0 overflow-hidden bg-white dark:bg-slate-900/40 backdrop-blur-md shadow-sm rounded-[2rem] hover:shadow-lg transition-all duration-300">
        
        {/* Toggle Header */}
        <div className="flex flex-col md:flex-row items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20 gap-4">
          <div>
            <h3 className="font-bold font-display text-lg text-slate-800 dark:text-white flex items-center gap-2 m-0">
              <Calculator className="w-5 h-5 text-indigo-500" />
              {lang === "th" ? "เครื่องมือคำนวณ" : "Calculation Tools"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 m-0 mt-1">
              {lang === "th" ? "เลือกโหมดคำนวณที่ต้องการใช้งาน" : "Select a calculation mode to proceed"}
            </p>
          </div>
          
          <div className="flex bg-slate-200/50 dark:bg-slate-950/50 p-1 rounded-xl w-full md:w-auto shrink-0 border border-slate-200/50 dark:border-slate-800/50">
            <button
              onClick={() => setActiveMode("savings")}
              className={`flex-1 md:w-40 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 border-0 cursor-pointer ${
                activeMode === "savings"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "bg-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Calculator className="w-4 h-4" />
              {lang === "th" ? "จำลองการประหยัด" : "Savings Projection"}
            </button>
            <button
              onClick={() => setActiveMode("billing")}
              className={`flex-1 md:w-40 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 border-0 cursor-pointer ${
                activeMode === "billing"
                  ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                  : "bg-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <FileText className="w-4 h-4" />
              {lang === "th" ? "จำลองบิลค่าไฟ" : "Bill Simulation"}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeMode === "savings" ? (
              <motion.div
                key="savings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SmartSavingsCalculator 
                  lang={lang} 
                  isDarkMode={isDarkMode} 
                  onTokensEarned={onTokensEarned}
                  rate={sharedFtRate}
                  setRate={setSharedFtRate}
                  days={calcDays}
                  setDays={setCalcDays}
                  targetBudget={globalBudget}
                  setTargetBudget={setGlobalBudget}
                  onTotalKwhChange={setPlannedKwh}
                />
              </motion.div>
            ) : (
              <motion.div
                key="billing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <BillingSimulator 
                  lang={lang} 
                  isDarkMode={isDarkMode} 
                  plannedKwh={plannedKwh}
                  ftRate={sharedFtRate}
                  setFtRate={setSharedFtRate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
