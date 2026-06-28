import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, TrendingDown, Leaf, Award } from 'lucide-react';
import { SavingsPlan } from '../../types/savings.types';
import { RecommendationCard } from './RecommendationCard';

interface CalculatorResultsProps {
  result: SavingsPlan | null;
  lang: 'th' | 'en';
  committedHabits: string[];
  onToggleCommit: (id: string) => void;
}

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  result,
  lang,
  committedHabits,
  onToggleCommit,
}) => {
  return (
    <AnimatePresence mode="wait">
      {!result ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-8 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center py-16 bg-slate-50/20 dark:bg-slate-900/5"
        >
          <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-100 mb-4 shadow-sm">
            <Calculator className="w-10 h-10" />
          </div>
          <h5 className="text-sm font-bold font-display text-slate-700 dark:text-slate-200">
            {lang === 'th' ? 'พร้อมวิเคราะห์ประสิทธิภาพ' : 'Awaiting Profile Submission'}
          </h5>
          <p className="text-[10.5px] leading-relaxed text-slate-400 max-w-xs mt-2">
            {lang === 'th'
              ? 'ปรับเปลี่ยนค่าใช้จ่ายของอุปกรณ์ใช้ไฟที่ด่านซ้าย จากนั้นกดปุ่มประหยัดไฟโดย AI ด้านล่างเพื่อรับรายงานผลตรวจประหยัดพลังงานนาโนวินาทีเต็มรูปแบบ'
              : 'Modify your appliance ratings and count on the left sidebar. Press the compute button to run regression savings estimations.'}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-4"
        >
          {/* Financial overview card */}
          <div className="p-5.5 rounded-[2rem] bg-slate-950 text-white shadow-xl relative overflow-hidden border border-slate-850">
            <div className="absolute -right-4 -bottom-4 opacity-10 text-sky-400 select-none">
              <TrendingDown className="w-40 h-40" />
            </div>

            <span className="text-[9.5px] font-black uppercase tracking-widest text-sky-400 font-mono">
              {lang === 'th' ? 'สรุปสัดส่วนประหยัดรายเดือน' : 'ESTIMATED MONTHLY SAVINGS SUMMARY'}
            </span>

            {/* Savings amount spotlight */}
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black font-mono text-emerald-400">
                ฿{result.monthlySavings.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                / {lang === 'th' ? 'เดือน' : 'month'}
              </span>
            </div>

            {/* Contrast comparison stats */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-dashed border-slate-800">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'th' ? 'ค่าไฟเดิมโดยประมาณ' : 'Current Estimated Cost'}
                </span>
                <span className="text-sm font-bold font-mono text-slate-200 mt-0.5 block">
                  ฿{result.estimatedCurrentMonthlyCost.toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'th' ? 'ค่าไฟใหม่หลังประหยัด' : 'Projected New Cost'}
                </span>
                <span className="text-sm font-bold font-mono text-sky-300 mt-0.5 block">
                  ฿{result.estimatedNewMonthlyCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Savings progress indicator */}
            <div className="mt-5">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-1.5">
                <span>{lang === 'th' ? 'สัดส่วนประหยัดเฉลี่ย:' : 'Expected Saving Offset:'}</span>
                <span className="text-emerald-400 font-mono font-black">+{result.savingsPercentage}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${result.savingsPercentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="bg-emerald-400 h-full rounded-full"
                />
              </div>
            </div>
          </div>

          {/* plan overview text */}
          <div className="p-4 rounded-2.5xl bg-emerald-500/5 border border-emerald-500/10 text-[10.5px] leading-relaxed text-slate-600 dark:text-slate-100 flex gap-2.5">
            <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              {lang === 'th' ? result.planSummaryTh : result.planSummaryEn}
            </span>
          </div>

          {/* Actionable recommendations list */}
          <div className="flex flex-col gap-3">
            <h5 className="text-[11px] font-black font-display text-slate-400 dark:text-slate-100 uppercase tracking-wider">
              {lang === 'th' ? 'ข้อแนะนำและพฤติกรรมประหยัดไฟฟ้า' : 'AI OPTIMIZATION CHECKLIST'}
            </h5>

            {result.recommendations.map((rec, idx) => (
              <RecommendationCard
                key={idx}
                rec={rec}
                idx={idx}
                isCommitted={committedHabits.includes(`rec_${idx}`)}
                lang={lang}
                onToggleCommit={onToggleCommit}
              />
            ))}
          </div>

          {/* Interactive reward metrics */}
          {committedHabits.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2.5xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3.5 text-slate-700 dark:text-amber-400"
            >
              <div className="p-2 rounded-2xl bg-amber-500 text-white shadow-sm shrink-0">
                <Award className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider block font-display">
                  {lang === 'th' ? 'นักรบกริดประหยัดพลังงาน!' : 'GRID CONSERVATION HERO!'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-100 font-semibold block mt-0.5">
                  {lang === 'th' 
                    ? `คุณได้สัญญาทำตามคู่มือแล้ว ${committedHabits.length} ข้อ รับเหรียญสะสมรางวัลรวม ${committedHabits.length * 50} Green Tokens! 🏆`
                    : `You committed to ${committedHabits.length} dynamic saving action(s). Accrued ${committedHabits.length * 50} Green Tokens! 🏆`}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
