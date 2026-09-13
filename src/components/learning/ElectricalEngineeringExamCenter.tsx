import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Timer, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Calculator, 
  ShieldCheck, 
  Zap, 
  Filter, 
  Info, 
  FileText, 
  Check, 
  Trophy, 
  AlertTriangle,
  Flame,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  ELECTRICAL_ENGINEERING_EXAM_QUESTIONS, 
  ELECTRICAL_ENGINEERING_FORMULAS,
  EngineeringFormula
} from '../../data/electricalEngineeringExamData';
import { EngineeringExamQuestion, ElectricalExamResult } from '../../types';

interface ElectricalEngineeringExamCenterProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onCompleteExam?: (result: ElectricalExamResult) => void;
  onRewardCoins?: (coins: number, xp: number) => void;
  onClose?: () => void;
}

export const ElectricalEngineeringExamCenter: React.FC<ElectricalEngineeringExamCenterProps> = ({
  lang,
  isDarkMode,
  onCompleteExam,
  onRewardCoins,
  onClose
}) => {
  const [selectedTier, setSelectedTier] = useState<number | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, { selected: number; isCorrect: boolean }>>({});
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [examStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [activeFormulaCategory, setActiveFormulaCategory] = useState<string>('all');

  // Filter questions based on tier
  const filteredQuestions: EngineeringExamQuestion[] = useMemo(() => {
    if (selectedTier === 'all') return ELECTRICAL_ENGINEERING_EXAM_QUESTIONS;
    return ELECTRICAL_ENGINEERING_EXAM_QUESTIONS.filter(q => q.tier === selectedTier);
  }, [selectedTier]);

  const currentQ: EngineeringExamQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer effect
  useEffect(() => {
    if (isExamCompleted) return;
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - examStartTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [examStartTime, isExamCompleted]);

  // Format elapsed time MM:SS
  const formattedTime = useMemo(() => {
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [elapsedSeconds]);

  // Reset answer when question changes
  useEffect(() => {
    if (currentQ && userAnswers[currentQ.id]) {
      setSelectedOption(userAnswers[currentQ.id].selected);
      setIsAnswered(true);
      setIsCorrect(userAnswers[currentQ.id].isCorrect);
    } else {
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  }, [currentIndex, currentQ, userAnswers]);

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQ) return;
    const correct = selectedOption === currentQ.correctIndex;
    setIsCorrect(correct);
    setIsAnswered(true);

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        selected: selectedOption,
        isCorrect: correct
      }
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Complete exam
      handleFinishExam();
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinishExam = () => {
    setIsExamCompleted(true);
    const correctCount = Object.values(userAnswers).filter(a => a.isCorrect).length;
    const totalQ = filteredQuestions.length;
    const percentage = Math.round((correctCount / totalQ) * 100);
    const passed = percentage >= 70;
    const earnedXp = correctCount * 50 + (passed ? 200 : 50);
    const earnedCoins = correctCount * 15 + (passed ? 100 : 25);

    if (onRewardCoins) {
      onRewardCoins(earnedCoins, earnedXp);
    }

    if (onCompleteExam) {
      onCompleteExam({
        score: correctCount,
        totalQuestions: totalQ,
        percentage,
        passed,
        tier: typeof selectedTier === 'number' ? selectedTier : 3,
        earnedXp,
        earnedCoins,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleRestart = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setIsExamCompleted(false);
  };

  const totalAnsweredCount = Object.keys(userAnswers).length;
  const correctCount = Object.values(userAnswers).filter(a => a.isCorrect).length;

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER & EXAM NAV BAR */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-xl relative overflow-hidden transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-gradient-to-r from-teal-600 via-emerald-600 to-slate-900 text-white shadow-teal-900/20'
      }`}>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-white/15 backdrop-blur-md text-amber-300 border border-white/20">
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'th' ? 'ศูนย์ทดสอบมาตรฐานวิศวกรรมไฟฟ้า (EIT & IEEE Standard Exam)' : 'Electrical Engineering Principles Exam'}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight">
              {lang === 'th' ? 'แบบทดสอบคำนวณ & วินิจฉัยตามหลักการไฟฟ้า' : 'Engineering Principle & Calculation Assessments'}
            </h2>

            <p className="text-xs md:text-sm text-slate-200 max-w-2xl font-medium">
              {lang === 'th' 
                ? 'ข้อสอบเชิงวิศวกรรมจริงอ้างอิงมาตรฐาน วสท. 022013-59, มอก. 11-2553, กฟน./กฟภ. และ IEEE 519 ครอบคลุมการคำนวณ PF, ระบบ 3 เฟส, แรงดันตก, พิกัดเบรกเกอร์ และการวิเคราะห์ DGA หม้อแปลง'
                : 'Rigorous engineering assessments based on Thai EIT Standards, TIS codes, and IEEE 519 covering power factor, 3-phase balancing, voltage drop, and transformer PM.'}
            </p>
          </div>

          {/* Quick Actions & Timers */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-4 py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-center font-mono">
              <span className="text-[10px] uppercase font-bold text-slate-300 block flex items-center gap-1 justify-center">
                <Timer className="w-3 h-3 text-amber-400" /> {lang === 'th' ? 'เวลาสอบ' : 'Time'}
              </span>
              <span className="text-base font-black text-amber-400">{formattedTime}</span>
            </div>

            <button
              onClick={() => setShowFormulaSheet(true)}
              className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs border border-white/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4 text-teal-300" />
              <span>{lang === 'th' ? 'ตารางสูตรวิศวกรรม' : 'Formula Sheet'}</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                title="Back to Courses"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Difficulty Tier Tabs */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" />
            {lang === 'th' ? 'เลือกระดับสอบ:' : 'Filter Tier:'}
          </span>

          {[
            { id: 'all', labelTh: `🌟 ข้อสอบทั้งหมด (${ELECTRICAL_ENGINEERING_EXAM_QUESTIONS.length} ข้อ)`, labelEn: `🌟 All Exams (${ELECTRICAL_ENGINEERING_EXAM_QUESTIONS.length})` },
            { id: 1, labelTh: '🟢 ระดับ 1: พื้นฐานคำนวณ AC & PF', labelEn: '🟢 Tier 1: AC & PF Math' },
            { id: 2, labelTh: '🟡 ระดับ 2: ไฟฟ้า 3 เฟส & เบรกเกอร์', labelEn: '🟡 Tier 2: 3-Phase & MCB' },
            { id: 3, labelTh: '🔴 ระดับ 3: แรงดันตก, สายดิน & DGA', labelEn: '🔴 Tier 3: Voltage Drop & DGA' }
          ].map(tier => {
            const isActive = selectedTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => {
                  setSelectedTier(tier.id as any);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {lang === 'th' ? tier.labelTh : tier.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. EXAM VIEW OR RESULTS VIEW */}
      {!isExamCompleted && currentQ ? (
        <div className={`p-6 sm:p-8 rounded-[2.5rem] border shadow-lg space-y-6 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          {/* Question Header & Standards Citation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-500/15 text-teal-600 dark:text-teal-400 font-mono text-xs font-black">
                  Q{currentIndex + 1} / {filteredQuestions.length}
                </span>

                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-black">
                  {lang === 'th' ? currentQ.tierBadgeTh : currentQ.tierBadgeEn}
                </span>

                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                  {currentQ.standardRef}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-display pt-1">
                {lang === 'th' ? currentQ.titleTh : currentQ.titleEn}
              </h3>
            </div>

            {/* Formula Hint Chip */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'th' ? 'สูตรที่เกี่ยวข้อง' : 'Formula Used'}</span>
              <span className="font-mono font-bold text-xs text-teal-600 dark:text-teal-300">{currentQ.formulaUsed}</span>
            </div>
          </div>

          {/* Scenario & Problem Description */}
          <div className={`p-5 rounded-2xl border space-y-3 ${
            isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200/80'
          }`}>
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-500" />
              {lang === 'th' ? 'โจทย์และสถานการณ์วิศวกรรม:' : 'Engineering Scenario & System Parameters:'}
            </h4>

            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
              {lang === 'th' ? currentQ.scenarioTh : currentQ.scenarioEn}
            </p>

            {/* Given Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
              {currentQ.givenData.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-xl border text-center ${
                    isDarkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 font-bold block truncate">
                    {lang === 'th' ? item.labelTh : item.labelEn}
                  </span>
                  <span className="text-xs font-mono font-black text-teal-600 dark:text-teal-400">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Explicit Question Prompt */}
          <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-900 dark:text-teal-200">
            <p className="font-extrabold text-sm sm:text-base flex items-start gap-2">
              <span className="text-base">❓</span>
              <span>{lang === 'th' ? currentQ.questionTh : currentQ.questionEn}</span>
            </p>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {(lang === 'th' ? currentQ.optionsTh : currentQ.optionsEn).map((optionText, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isTargetCorrect = oIdx === currentQ.correctIndex;

              let optionStyle = isDarkMode 
                ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-teal-500/60' 
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-teal-400';

              if (isAnswered) {
                if (isTargetCorrect) {
                  optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-black shadow-md';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300 line-through';
                }
              } else if (isSelected) {
                optionStyle = isDarkMode
                  ? 'bg-teal-900/40 border-teal-400 text-white ring-2 ring-teal-400/30'
                  : 'bg-teal-50 border-teal-500 text-teal-950 ring-2 ring-teal-500/30 font-bold';
              }

              return (
                <button
                  key={oIdx}
                  disabled={isAnswered}
                  onClick={() => setSelectedOption(oIdx)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-teal-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="text-sm font-medium">{optionText}</span>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0">
                      {isTargetCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Step-by-Step Mathematical Derivation (Visible after answer) */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800"
              >
                <div className={`p-5 rounded-2xl border ${
                  isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                }`}>
                  <div className="flex items-center gap-2 font-black text-sm mb-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>{lang === 'th' ? 'ถูกต้องสมบูรณ์! คำนวณได้ตรงตามหลักการไฟฟ้า' : 'Correct! Accurate Engineering Derivation'}</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        <span>{lang === 'th' ? 'คำตอบยังไม่ถูกต้อง ดูขั้นตอนการคำนวณอย่างละเอียดด้านล่าง:' : 'Incorrect. Study the engineering derivation below:'}</span>
                      </>
                    )}
                  </div>

                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-3 mb-2 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-teal-500" />
                    {lang === 'th' ? 'ขั้นตอนการคำนวณทางคณิตศาสตร์วิศวกรรม:' : 'Mathematical Derivation Steps:'}
                  </h5>

                  <div className="space-y-1.5 font-mono text-xs pl-2 border-l-2 border-teal-500/40">
                    {(lang === 'th' ? currentQ.detailedSolutionTh : currentQ.detailedSolutionEn).map((step, sIdx) => (
                      <div key={sIdx} className="leading-relaxed">
                        • {step}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                    <span className="font-black text-teal-600 dark:text-teal-400 block mb-0.5">
                      💡 {lang === 'th' ? 'หลักการวิศวกรรม & มาตรฐานความปลอดภัย:' : 'Engineering Code Insight:'}
                    </span>
                    <p className="font-normal text-slate-700 dark:text-slate-300">
                      {lang === 'th' ? currentQ.engineeringPrincipleTh : currentQ.engineeringPrincipleEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Bar (Submit / Next / Prev) */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'th' ? 'ข้อก่อนหน้า' : 'Previous'}</span>
            </button>

            <div className="flex items-center gap-3">
              {!isAnswered ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-md ${
                    selectedOption === null
                      ? 'opacity-50 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400'
                      : 'bg-teal-500 hover:bg-teal-400 text-slate-950 cursor-pointer hover:scale-105 active:scale-95'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{lang === 'th' ? 'ส่งคำตอบตรวจคำนวณ' : 'Verify Calculation'}</span>
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-2xl font-black text-sm bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <span>
                    {currentIndex < filteredQuestions.length - 1
                      ? (lang === 'th' ? 'ข้อถัดไป' : 'Next Question')
                      : (lang === 'th' ? 'ดูผลการสอบและรับใบรับรอง' : 'View Results & Certificate')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : isExamCompleted ? (
        /* 3. EXAM COMPLETION & CERTIFICATION SCORE CARD */
        <div className={`p-8 rounded-[2.5rem] border shadow-2xl space-y-6 text-center max-w-3xl mx-auto ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-500 mx-auto flex items-center justify-center text-4xl shadow-lg border border-amber-500/30">
            {correctCount >= filteredQuestions.length * 0.7 ? '🏆' : '📚'}
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black font-display">
              {correctCount >= filteredQuestions.length * 0.7 
                ? (lang === 'th' ? 'ยินดีด้วย! สอบผ่านเกณฑ์มาตรฐานวิศวกรรมไฟฟ้า' : 'Congratulations! Passed Engineering Assessment')
                : (lang === 'th' ? 'ผลการสอบ: ยังไม่ผ่านเกณฑ์ 70%' : 'Assessment Result: Below 70% Threshold')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {lang === 'th' 
                ? 'คะแนนคำนวณตามมาตรฐานวิศวกรรมสถานแห่งประเทศไทย (วสท.) และสากล'
                : 'Scored against Thai EIT, TIS and international IEEE guidelines'}
            </p>
          </div>

          {/* Metric Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'th' ? 'ข้อที่ถูก' : 'Score'}</span>
              <span className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400">{correctCount} / {filteredQuestions.length}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'th' ? 'เปอร์เซ็นต์' : 'Percentage'}</span>
              <span className="text-2xl font-black font-mono text-amber-500">
                {Math.round((correctCount / filteredQuestions.length) * 100)}%
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">XP Earned</span>
              <span className="text-2xl font-black font-mono text-emerald-500">+{correctCount * 50 + 200} XP</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Coins</span>
              <span className="text-2xl font-black font-mono text-yellow-500">+{correctCount * 15 + 100}</span>
            </div>
          </div>

          {/* Certified Engineer Badge Unlock */}
          {correctCount >= filteredQuestions.length * 0.7 && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-amber-500/10 border border-amber-500/30 text-left space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <h4 className="font-black text-sm text-slate-900 dark:text-white font-display">
                  {lang === 'th' ? 'รับรองความรู้: วิศวกรพลังงาน & ช่างไฟฟ้าระดับสูง' : 'Credential Verified: Electrical Engineering Competency'}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {lang === 'th' 
                  ? 'คุณผ่านการทดสอบหลักการคำนวณตัวประกอบกำลัง (PF), ระบบ 3 เฟส, แรงดันตก, การเลือกเคิร์ฟ MCB, และการวินิจฉัย DGA หม้อแปลง'
                  : 'You have verified analytical competency in PF correction, 3-phase balancing, EIT voltage drop, MCB trip curves, and transformer DGA.'}
              </p>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl font-black text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'th' ? 'สอบใหม่อีกครั้ง' : 'Retake Exam'}</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl font-black text-xs bg-teal-500 text-slate-950 hover:bg-teal-400 flex items-center gap-2 cursor-pointer"
              >
                <span>{lang === 'th' ? 'กลับไปยังหลักสูตร' : 'Back to Academy'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : null}

      {/* 4. POPUP MODAL: FORMULA REFERENCE SHEET (ตารางสูตรวิศวกรรมไฟฟ้า) */}
      {showFormulaSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-6 sm:p-8 border shadow-2xl space-y-6 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500 text-white flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black font-display">
                    {lang === 'th' ? 'ตารางสูตรวิศวกรรมไฟฟ้ามาตรฐาน (Formula Sheet)' : 'Electrical Engineering Formula Sheet'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'สูตรและสมการที่ใช้อ้างอิงในการคำนวณและข้อสอบทั้งหมด' : 'Core electrical equations and variable definitions'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowFormulaSheet(false)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Formulas List */}
            <div className="space-y-4">
              {ELECTRICAL_ENGINEERING_FORMULAS.map((item) => (
                <div 
                  key={item.id}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-teal-500 tracking-wider block">
                        {lang === 'th' ? item.categoryTh : item.categoryEn}
                      </span>
                      <h4 className="font-black text-base text-slate-900 dark:text-white font-display">
                        {lang === 'th' ? item.nameTh : item.nameEn}
                      </h4>
                    </div>

                    <div className="px-3 py-1 rounded-xl bg-slate-900 text-teal-300 dark:bg-slate-950 font-mono text-xs font-black shrink-0">
                      {item.formula}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {lang === 'th' ? item.descriptionTh : item.descriptionEn}
                  </p>

                  {/* Variables Table */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1 text-xs">
                    {item.variables.map((v, vIdx) => (
                      <div key={vIdx} className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50">
                        <span className="font-mono font-black text-teal-600 dark:text-teal-400 mr-1.5">{v.symbol}:</span>
                        <span className="text-slate-600 dark:text-slate-300">{lang === 'th' ? v.meaningTh : v.meaningEn}</span>
                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">({v.unit})</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium pt-1">
                    📌 {item.standardNoteTh}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFormulaSheet(false)}
                className="px-5 py-2 rounded-xl bg-teal-500 text-slate-950 font-black text-xs cursor-pointer hover:bg-teal-400"
              >
                {lang === 'th' ? 'ปิดหน้าต่างสูตร' : 'Close Formula Sheet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
