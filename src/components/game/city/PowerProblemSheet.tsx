import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, HelpCircle, Check, X, AlertCircle, Coins, Sparkles, ArrowRight } from 'lucide-react';

interface PowerProblemSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSolveSuccess: (earnedCredits: number) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const PowerProblemSheet: React.FC<PowerProblemSheetProps> = ({
  isOpen,
  onClose,
  onSolveSuccess,
  lang,
  isDarkMode,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!isOpen) return null;

  // Real energy learning problem
  const problem = {
    titleTh: 'แก้ปัญหาพลังงาน: ปรับแอร์อย่างไรให้ประหยัดไฟสูงสุดโดยยังเย็นสบาย?',
    titleEn: 'Power Problem: How to optimize AC cooling for peak efficiency & comfort?',
    contextTh: 'เครื่องปรับอากาศใช้ไฟกว่า 50-60% ของค่าไฟบ้าน การตั้งอุณหภูมิที่เหมาะสมช่วยประหยัดเงินได้ทันที',
    contextEn: 'Air conditioners make up 50-60% of home electricity bills. Setting the right temperature cuts costs immediately.',
    optionsTh: [
      { text: 'ตั้งที่ 18°C ตลอดเวลาเพื่อให้ห้องเย็นเร็วที่สุด', correct: false },
      { text: 'ตั้งที่ 25-26°C พร้อมเปิดพัดลมช่วยกระจายลมเย็น', correct: true },
      { text: 'เปิด-ปิดแอร์ทุกๆ 30 นาทีเพื่อพักคอมเพรสเซอร์', correct: false },
    ],
    optionsEn: [
      { text: 'Set to 18°C continuously to cool the room as fast as possible', correct: false },
      { text: 'Set to 25-26°C and use a fan to circulate cool air', correct: true },
      { text: 'Turn AC on and off every 30 minutes to rest the compressor', correct: false },
    ],
    explanationTh: 'ถูกต้อง! การปรับอุณหภูมิแอร์เพิ่มขึ้นทุก 1°C (เช่น จาก 24°C เป็น 25-26°C) ร่วมกับการเปิดพัดลมช่วยประหยัดค่าไฟได้ 10% ต่อเดือน และให้ความเย็นสบายเท่าเดิม',
    explanationEn: 'Correct! Increasing your AC by 1°C (e.g. from 24°C to 25-26°C) paired with a circulation fan cuts AC power draw by ~10%/month with identical perceived coolness.',
    rewardCredits: 30
  };

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const isCorrect = selectedOption !== null && (lang === 'th' ? problem.optionsTh[selectedOption].correct : problem.optionsEn[selectedOption].correct);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={`w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl p-5 sm:p-6 border shadow-2xl overflow-y-auto ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-emerald-100 text-slate-800'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                {lang === 'th' ? 'โจทย์เรียนรู้พลังงาน' : 'Contextual Energy Challenge'}
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {lang === 'th' ? 'แก้ปัญหาการใช้ไฟ' : 'Solve a Power Problem'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label={lang === 'th' ? 'ปิด' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Body */}
        <div className="mb-4">
          <h4 className="font-bold text-sm sm:text-base mb-2 text-slate-800 dark:text-slate-100 leading-snug">
            {lang === 'th' ? problem.titleTh : problem.titleEn}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {lang === 'th' ? problem.contextTh : problem.contextEn}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2.5 mb-5">
          {(lang === 'th' ? problem.optionsTh : problem.optionsEn).map((opt, idx) => {
            const isPicked = selectedOption === idx;
            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isAnswered
                    ? opt.correct
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-bold'
                      : isPicked
                      ? 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-300'
                      : 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{opt.text}</span>
                {isAnswered && opt.correct && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                {isAnswered && isPicked && !opt.correct && <X className="w-4 h-4 text-rose-500 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation & Reward */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl mb-5 border text-xs leading-relaxed ${
              isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
            }`}
          >
            <p className="font-bold mb-1">
              {isCorrect ? (lang === 'th' ? '🎉 เยี่ยมมาก!' : '🎉 Excellent!') : (lang === 'th' ? '💡 คำแนะนำเพิ่มเติม' : '💡 Energy Tip')}
            </p>
            <p>{lang === 'th' ? problem.explanationTh : problem.explanationEn}</p>

            {isCorrect && (
              <div className="mt-2.5 flex items-center gap-1.5 font-extrabold text-amber-500">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'th' ? `รับรางวัลการเรียนรู้ +${problem.rewardCredits} Eco credits` : `Earned +${problem.rewardCredits} Eco credits`}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Footer Action */}
        <div className="flex items-center justify-end gap-2 pt-2">
          {isAnswered ? (
            <button
              onClick={() => {
                if (isCorrect) {
                  onSolveSuccess(problem.rewardCredits);
                } else {
                  onClose();
                }
              }}
              className="py-2.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              <span>{lang === 'th' ? 'กลับไปยังเมือง' : 'Return to City'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {lang === 'th' ? 'ไว้คราวหลัง' : 'Later'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
