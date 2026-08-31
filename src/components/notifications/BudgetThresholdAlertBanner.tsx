import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  ArrowRight, 
  X, 
  Sliders, 
  BellRing,
  Sparkles,
  TrendingUp,
  Settings
} from 'lucide-react';
import { AppPage } from '../../types';

interface BudgetThresholdAlertBannerProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  monthlyEstimate: number;
  monthlyBudget: number;
  onNavigatePage: (page: AppPage) => void;
  onTriggerSimulatedToast?: () => void;
}

export const BudgetThresholdAlertBanner: React.FC<BudgetThresholdAlertBannerProps> = ({
  lang,
  isDarkMode,
  monthlyEstimate,
  monthlyBudget,
  onNavigatePage,
  onTriggerSimulatedToast,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const budgetPercent = Math.round((monthlyEstimate / monthlyBudget) * 100);
  const isOverBudget = monthlyEstimate > monthlyBudget;
  const isWarning = !isOverBudget && budgetPercent >= 80;

  // Don't show if healthy and not dismissed
  if ((!isOverBudget && !isWarning) || isDismissed) {
    return null;
  }

  const excessAmount = monthlyEstimate - monthlyBudget;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        className={`p-4 sm:p-5 rounded-3xl border shadow-lg relative overflow-hidden transition-all mb-5 ${
          isOverBudget
            ? 'bg-gradient-to-r from-rose-600/15 via-rose-500/10 to-amber-500/10 border-rose-500/40 text-slate-900 dark:text-white shadow-rose-500/10'
            : 'bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-emerald-500/10 border-amber-500/40 text-slate-900 dark:text-white shadow-amber-500/10'
        }`}
      >
        {/* Pulsing indicator light */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className={`p-3 rounded-2xl shrink-0 shadow-md ${
              isOverBudget ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-500 text-white'
            }`}>
              {isOverBudget ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full font-black text-[0.65rem] uppercase tracking-wider ${
                  isOverBudget ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {isOverBudget 
                    ? (lang === 'th' ? '🚨 แจ้งเตือน: ค่าไฟเกินงบประมาณ' : '🚨 Alert: Budget Exceeded') 
                    : (lang === 'th' ? '⚠️ เตือนล่วงหน้า: ใกล้แตะเพดานงบ' : '⚠️ Warning: Near Budget Cap')}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  {budgetPercent}% {lang === 'th' ? 'ของงบที่ตั้งไว้' : 'of monthly threshold'}
                </span>
              </div>

              <h4 className="font-extrabold text-sm sm:text-base tracking-tight">
                {isOverBudget
                  ? (lang === 'th'
                      ? `การใช้ไฟฟ้าขณะนี้ ฿${monthlyEstimate.toLocaleString()} เกินเป้าหมาย ฿${monthlyBudget.toLocaleString()} ไปแล้ว ฿${excessAmount.toLocaleString()}`
                      : `Current consumption ฿${monthlyEstimate.toLocaleString()} exceeds your ฿${monthlyBudget.toLocaleString()} limit by +฿${excessAmount.toLocaleString()}`)
                  : (lang === 'th'
                      ? `คุณใช้ไฟแตะ ${budgetPercent}% ของงบ ฿${monthlyBudget.toLocaleString()} เหลือโควตา ฿${(monthlyBudget - monthlyEstimate).toLocaleString()}`
                      : `You have utilized ${budgetPercent}% of your ฿${monthlyBudget.toLocaleString()} budget (฿${(monthlyBudget - monthlyEstimate).toLocaleString()} remaining)`)}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <button
              onClick={() => onNavigatePage('budget')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                isOverBudget
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                  : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'จัดการงบ & ปรับลดไฟ' : 'Fix Budget'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsDismissed(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
