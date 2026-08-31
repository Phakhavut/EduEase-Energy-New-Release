import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  RotateCcw, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Coins, 
  Trophy, 
  BookOpen,
  Check
} from 'lucide-react';
import { Lesson } from '../../types';

interface LessonComprehensionQuizProps {
  lesson: Lesson;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onPassQuiz: (bonusCp: number, xpReward: number, coins: number) => void;
  onContinueNext: () => void;
}

export const LessonComprehensionQuiz: React.FC<LessonComprehensionQuizProps> = ({
  lesson,
  lang,
  isDarkMode,
  onPassQuiz,
  onContinueNext
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [awardedPoints, setAwardedPoints] = useState<number | null>(null);

  const question = lang === 'th' ? lesson.questionTh : (lesson.questionEn || lesson.questionTh);
  const options = lang === 'th' ? lesson.optionsTh : (lesson.optionsEn || lesson.optionsTh);
  const explanation = lang === 'th' ? lesson.explanationTh : (lesson.explanationEn || lesson.explanationTh);

  // Base CP calculation: expert = 100, hard = 80, medium = 60, easy = 50
  const getBaseCp = () => {
    switch (lesson.difficulty) {
      case 'expert': return 100;
      case 'hard': return 80;
      case 'medium': return 65;
      default: return 50;
    }
  };

  const maxCp = getBaseCp();

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    const correct = selectedOption === lesson.correctIndex;
    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      // First try gives 100% CP, 2nd try gives 70% CP, 3rd+ gives 50% CP
      const cpToAward = nextAttempts === 1 
        ? maxCp 
        : nextAttempts === 2 
          ? Math.round(maxCp * 0.7) 
          : Math.round(maxCp * 0.5);
      
      setAwardedPoints(cpToAward);
      onPassQuiz(cpToAward, lesson.xpReward, 25);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(true);
  };

  return (
    <div 
      id="lesson-comprehension-quiz-container"
      className={`rounded-[30px] border-2 p-5 sm:p-7 space-y-6 transition-all shadow-xl ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-white border-slate-200/80 text-slate-900 shadow-slate-200/60'
      }`}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-black">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {lang === 'th' ? 'การทดสอบความเข้าใจประจำบท' : 'Lesson Comprehension Check'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                100% Required
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'แบบทดสอบวัดสมรรถนะวิชาชีพ' : 'Technical Competency Verification'}
            </h3>
          </div>
        </div>

        {/* Bonus CP Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border border-amber-500/30">
          <Trophy className="w-4 h-4 text-amber-500" />
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase block leading-none">Bonus</span>
            <span className="text-xs sm:text-sm font-black font-mono text-amber-600 dark:text-amber-400">
              +{maxCp} CP
            </span>
          </div>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>{lang === 'th' ? 'คำถามทดสอบความเข้าใจ:' : 'Question:'}</span>
          {lesson.formula && (
            <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-medium truncate max-w-[200px] sm:max-w-none">
              สูตร: {lesson.formula}
            </span>
          )}
        </div>
        <h4 className="text-lg sm:text-xl font-black font-display text-slate-900 dark:text-white leading-snug">
          {question}
        </h4>
      </div>

      {/* Hint Toggle */}
      {!isSubmitted && (
        <div>
          <button
            id="toggle-quiz-hint-btn"
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>
              {showHint 
                ? (lang === 'th' ? 'ซ่อนคำใบ้' : 'Hide Hint')
                : (lang === 'th' ? '💡 ต้องการคำใบ้จาก Voltie AI?' : '💡 Need a hint from Voltie?')}
            </span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs font-medium text-amber-900 dark:text-amber-200 leading-relaxed"
              >
                {lang === 'th' 
                  ? (lesson.electricianTipTh || lesson.formula || 'ทบทวนหัวข้อสำคัญและสูตรการคำนวณด้านบนเพื่อเลือกคำตอบที่ถูกต้อง') 
                  : (lesson.electricianTipEn || lesson.formula || 'Review the core formula and electrician standard notes above to deduce the correct answer.')}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Answer Options Grid */}
      <div className="space-y-3">
        {options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrectChoice = idx === lesson.correctIndex;
          
          let stateStyle = isDarkMode
            ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-amber-500/50 hover:bg-slate-800'
            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/40';

          if (isSubmitted) {
            if (isCorrectChoice) {
              stateStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-black shadow-md shadow-emerald-500/10';
            } else if (isSelected && !isCorrect) {
              stateStyle = 'bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200 line-through opacity-80';
            } else {
              stateStyle = 'opacity-40 border-transparent bg-slate-100 dark:bg-slate-800/40';
            }
          } else if (isSelected) {
            stateStyle = 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500 text-slate-900 dark:text-white shadow-md ring-2 ring-amber-400/30';
          }

          return (
            <motion.button
              key={idx}
              id={`quiz-option-btn-${idx}`}
              whileHover={!isSubmitted ? { scale: 1.01 } : {}}
              whileTap={!isSubmitted ? { scale: 0.99 } : {}}
              onClick={() => !isSubmitted && setSelectedOption(idx)}
              disabled={isSubmitted}
              className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between gap-3 cursor-pointer ${stateStyle}`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                  isSelected 
                    ? 'bg-amber-500 text-slate-950 shadow-sm' 
                    : isSubmitted && isCorrectChoice 
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug break-words">{opt}</span>
              </div>

              {/* Status Icons */}
              {isSubmitted && isCorrectChoice && (
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                  <XCircle className="w-4 h-4" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Submission Action or Detailed Review */}
      {!isSubmitted ? (
        <button
          id="submit-lesson-quiz-btn"
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>{lang === 'th' ? 'ส่งคำตอบเพื่อรับคะแนนรับรอง (CP) ➔' : 'Verify & Claim Certification Points ➔'}</span>
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 pt-2"
        >
          {/* Result Card */}
          <div className={`p-5 rounded-2xl border-2 space-y-3 ${
            isCorrect 
              ? 'bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border-emerald-500/40 text-emerald-950 dark:text-emerald-100'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black font-display text-base sm:text-lg">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>{lang === 'th' ? '🎉 ยอดเยี่ยม! ตอบถูกต้องแม่นยำ' : '🎉 Verified Correct!'}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-500" />
                    <span>{lang === 'th' ? '❌ ยังไม่ถูกต้อง ลองใหม่อีกครั้ง!' : '❌ Incorrect. Review and retry!'}</span>
                  </>
                )}
              </div>

              {isCorrect && awardedPoints !== null && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black font-mono text-xs shadow-md animate-bounce">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>+{awardedPoints} CP</span>
                </div>
              )}
            </div>

            {/* Explanation */}
            <div className="text-xs sm:text-sm font-medium leading-relaxed opacity-90 pl-1 border-l-2 border-current">
              {explanation}
            </div>

            {/* Electrician Standard Tag */}
            {lesson.electricianTipTh && (
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-500" />
                <span>{lang === 'th' ? 'มาตรฐานวิศวกรรมไฟฟ้า & ความปลอดภัย วสท./มอก.' : 'EIT/TIS Engineering & Safety Standard Verified'}</span>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {!isCorrect ? (
              <button
                id="retry-quiz-btn"
                onClick={handleRetry}
                className="w-full h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'th' ? 'ลองตอบใหม่เพื่อรับคะแนน' : 'Try Again for Points'}</span>
              </button>
            ) : (
              <button
                id="quiz-continue-btn"
                onClick={onContinueNext}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
              >
                <span>{lang === 'th' ? 'ดำเนินการจบบทเรียนและรับเหรียญ ➔' : 'Complete Lesson & Claim Rewards ➔'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
