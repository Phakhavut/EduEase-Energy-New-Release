import React, { useState, useEffect, useMemo } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  BookOpen, 
  RotateCcw, 
  Trophy,
  ArrowRight,
  Coins,
  Timer,
  Award,
  Zap,
  Flame,
  Layers,
  GraduationCap
} from 'lucide-react';
import { RETRO_QUIZ_QUESTIONS, RetroQuizQuestion } from '../../../data/retroGamificationData';

export type QuizDifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

interface RetroTriviaQuizProps {
  lang: 'th' | 'en';
  isDarkMode?: boolean;
  onEarnCoins?: (amount: number) => void;
  onAddXp?: (amount: number) => void;
}

export const RetroTriviaQuiz: React.FC<RetroTriviaQuizProps> = ({
  lang,
  isDarkMode = true,
  onEarnCoins,
  onAddXp
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficultyFilter>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Filter questions based on selected difficulty
  const filteredQuestions = useMemo(() => {
    if (selectedDifficulty === 'all') return RETRO_QUIZ_QUESTIONS;
    return RETRO_QUIZ_QUESTIONS.filter(q => q.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  const currentQ: RetroQuizQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer logic for intermediate and advanced questions
  useEffect(() => {
    if (!currentQ || isAnswered || isFinished) return;

    let timeLimit: number | null = null;
    if (currentQ.difficulty === 'intermediate') timeLimit = 35;
    else if (currentQ.difficulty === 'advanced') timeLimit = 20;

    if (timeLimit === null) {
      setTimeLeft(null);
      return;
    }

    setTimeLeft(timeLimit);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(interval);
          // Auto timeout - trigger wrong answer
          setIsAnswered(true);
          setSelectedOption(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, currentQ?.id, isAnswered, isFinished]);

  const handleDifficultyChange = (level: QuizDifficultyFilter) => {
    setSelectedDifficulty(level);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
      const coinReward = currentQ.rewardCoins || 30;
      const xpReward = currentQ.rewardXp || 50;
      onEarnCoins?.(coinReward);
      onAddXp?.(xpReward);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const getDifficultyBadge = (diff: 'beginner' | 'intermediate' | 'advanced') => {
    switch (diff) {
      case 'beginner':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          label: lang === 'th' ? '🟢 ระดับเริ่มต้น' : '🟢 Beginner',
          timeDesc: lang === 'th' ? 'ไม่จำกัดเวลา' : 'No time limit'
        };
      case 'intermediate':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          label: lang === 'th' ? '🟡 ระดับปานกลาง' : '🟡 Intermediate',
          timeDesc: lang === 'th' ? 'จับเวลา 35 วิ (1.5x)' : '35s Timer (1.5x)'
        };
      case 'advanced':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          label: lang === 'th' ? '🔴 ระดับเชี่ยวชาญ/วิศวกร' : '🔴 Advanced Engineer',
          timeDesc: lang === 'th' ? 'จับเวลา 20 วิ (2.5x)' : '20s Rush (2.5x)'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Knowledge Level Selector Tabs */}
      <div className={`p-4 rounded-3xl border transition-all ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-200">
              {lang === 'th' ? 'เลือกระดับความรู้ (Difficulty Level):' : 'Select Knowledge Tier:'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {filteredQuestions.length} {lang === 'th' ? 'คำถามในระดับนี้' : 'questions available'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* ALL */}
          <button
            onClick={() => handleDifficultyChange('all')}
            className={`p-2.5 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
              selectedDifficulty === 'all'
                ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30 scale-[1.02]'
                : isDarkMode
                  ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {lang === 'th' ? 'ทั้งหมด (All)' : 'All Tiers'}
            </span>
            <span className="text-[10px] opacity-80 font-normal">
              {RETRO_QUIZ_QUESTIONS.length} {lang === 'th' ? 'ข้อ' : 'Q’s'}
            </span>
          </button>

          {/* BEGINNER */}
          <button
            onClick={() => handleDifficultyChange('beginner')}
            className={`p-2.5 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
              selectedDifficulty === 'beginner'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]'
                : isDarkMode
                  ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center gap-1">
              <span>🟢</span>
              {lang === 'th' ? 'ระดับเริ่มต้น' : 'Beginner'}
            </span>
            <span className="text-[10px] opacity-80 font-normal text-emerald-300">
              {lang === 'th' ? 'พื้นฐานในบ้าน' : 'House Basics'}
            </span>
          </button>

          {/* INTERMEDIATE */}
          <button
            onClick={() => handleDifficultyChange('intermediate')}
            className={`p-2.5 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
              selectedDifficulty === 'intermediate'
                ? 'bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-600/30 scale-[1.02]'
                : isDarkMode
                  ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center gap-1">
              <span>🟡</span>
              {lang === 'th' ? 'ระดับปานกลาง' : 'Intermediate'}
            </span>
            <span className="text-[10px] opacity-80 font-normal text-amber-300">
              {lang === 'th' ? 'สูตร & บิล TOU (1.5x)' : 'Formulas & TOU (1.5x)'}
            </span>
          </button>

          {/* ADVANCED */}
          <button
            onClick={() => handleDifficultyChange('advanced')}
            className={`p-2.5 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
              selectedDifficulty === 'advanced'
                ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-600/30 scale-[1.02]'
                : isDarkMode
                  ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center gap-1">
              <span>🔴</span>
              {lang === 'th' ? 'ระดับวิศวกร' : 'Advanced'}
            </span>
            <span className="text-[10px] opacity-80 font-normal text-rose-300">
              {lang === 'th' ? 'ฟิสิกส์ & Audit (2.5x)' : 'Physics & Loss (2.5x)'}
            </span>
          </button>
        </div>
      </div>

      {/* How to Play Collapsible Guide */}
      <div className={`p-4 rounded-2xl border transition-all ${
        isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-purple-50/60 border-purple-200'
      }`}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowHowToPlay(!showHowToPlay)}
            className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'th' ? (showHowToPlay ? 'ซ่อนกติกาวิธีเล่น' : '📖 วิธีเล่น & ระบบระดับความยาก') : (showHowToPlay ? 'Hide Guide' : '📖 Quiz Rules & Difficulty Levels')}</span>
          </button>
          <span className="text-[11px] text-slate-400">
            {lang === 'th' ? 'คำนวณคะแนนและโบนัสตามระดับความรู้' : 'Scales rewards by knowledge depth'}
          </span>
        </div>

        {showHowToPlay && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs space-y-2 leading-relaxed animate-fadeIn">
            <p className="font-bold text-slate-200">
              {lang === 'th' ? '🎯 กติกา & ระบบความยาก 3 ระดับ:' : '🎯 Rules & 3 Difficulty Tiers:'}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-[11px]">
              <li><strong className="text-emerald-400">{lang === 'th' ? '🟢 ระดับเริ่มต้น:' : '🟢 Beginner:'}</strong> {lang === 'th' ? 'โจทย์พฤติกรรมประหยัดไฟในบ้าน เหมาะกับผู้เริ่มศึกษา ไม่จำกัดเวลา (+30 เหรียญ / +50 XP)' : 'Daily energy habits, no timer pressure (+30 Coins / +50 XP)'}</li>
              <li><strong className="text-amber-400">{lang === 'th' ? '🟡 ระดับปานกลาง:' : '🟡 Intermediate:'}</strong> {lang === 'th' ? 'สูตรคิดหน่วยไฟ kWh, ค่า Ft, ช่วงเวลา TOU, จับเวลาข้อละ 35 วินาที (+50 เหรียญ / +100 XP)' : 'Calculations for kWh, TOU, Label No.5; 35s timer (+50 Coins / +100 XP)'}</li>
              <li><strong className="text-rose-400">{lang === 'th' ? '🔴 ระดับเชี่ยวชาญ / วิศวกร:' : '🔴 Advanced Engineer:'}</strong> {lang === 'th' ? 'ฟิสิกส์ระบบไฟฟ้า, Power Factor (cos φ), รอบจานหมุนมิเตอร์ K, U-Value, จับเวลาข้อละ 20 วินาที (+80 เหรียญ / +200 XP)' : 'Power triangle, meter constant math, starting surges; 20s time-attack (+80 Coins / +200 XP)'}</li>
            </ul>
          </div>
        )}
      </div>

      {/* Quiz Card Box */}
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border relative overflow-hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800' 
          : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        {!isFinished && currentQ ? (
          <div className="space-y-6">
            {/* Header / Question Counter & Timer */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-400 font-mono text-xs font-black border border-purple-500/30">
                  QUESTION {currentIndex + 1} / {filteredQuestions.length}
                </span>

                {/* Difficulty Tag */}
                {(() => {
                  const badge = getDifficultyBadge(currentQ.difficulty);
                  return (
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${badge.bg}`}>
                      {badge.label}
                    </span>
                  );
                })()}
              </div>

              {/* Timer & Rewards */}
              <div className="flex items-center gap-3">
                {timeLeft !== null && (
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs font-bold border ${
                    timeLeft <= 5 
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    <Timer className="w-3.5 h-3.5" />
                    <span>{timeLeft}s</span>
                  </div>
                )}

                <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-bold">
                  <Coins className="w-4 h-4" />
                  <span>+{currentQ.rewardCoins || 30}</span>
                </div>
                <div className="flex items-center gap-1 text-purple-400 font-mono text-xs font-bold">
                  <Zap className="w-4 h-4" />
                  <span>+{currentQ.rewardXp || 50} XP</span>
                </div>
              </div>
            </div>

            {/* Time progress bar if active */}
            {timeLeft !== null && (
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    timeLeft <= 5 ? 'bg-rose-500' : 'bg-amber-400'
                  }`}
                  style={{
                    width: `${(timeLeft / (currentQ.difficulty === 'intermediate' ? 35 : 20)) * 100}%`
                  }}
                />
              </div>
            )}

            {/* Question Text */}
            <h3 className="text-base sm:text-xl font-extrabold font-display leading-snug">
              {lang === 'th' ? currentQ.questionTh : currentQ.questionEn}
            </h3>

            {/* Visual Memory Clue Box */}
            <div className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
              isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-lg mt-0.5 shrink-0">💡</span>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  {lang === 'th' ? 'คำใบ้ภาพจำ (Memory Clue):' : 'Visual Clue:'}
                </span>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {lang === 'th' ? currentQ.mnemonicClueTh : currentQ.mnemonicClueEn}
                </p>
              </div>
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(lang === 'th' ? currentQ.optionsTh : currentQ.optionsEn).map((optionText, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle = isDarkMode 
                  ? 'bg-slate-800/80 border-slate-700 hover:border-purple-500/50 hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 hover:border-purple-400';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                  } else {
                    btnStyle = 'opacity-40 border-slate-800';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-900 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-tight my-auto">
                      {optionText}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box (Shown after answering) */}
            {isAnswered && (
              <div className={`p-5 rounded-3xl border space-y-3 animate-fadeIn ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-slate-900/95 border-amber-500/50 text-slate-200'
              }`}>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                    {selectedOption === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-400">{lang === 'th' ? 'ถูกต้อง! บทเรียนทางวิทยาศาสตร์:' : 'Correct! Science Lesson:'}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-amber-400 shrink-0" />
                        <span className="text-amber-400">
                          {selectedOption === -1 
                            ? (lang === 'th' ? 'หมดเวลา! มาดูคำอธิบายที่ถูกต้อง:' : 'Time Out! Here is the solution:')
                            : (lang === 'th' ? 'ยังไม่ถูกต้อง — มาดูคำอธิบายที่แท้จริง:' : 'Not quite — Here is why:')}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                    {lang === 'th' ? `ข้อ ${String.fromCharCode(65 + currentQ.correctIndex)} คือคำตอบที่ถูกต้อง` : `Option ${String.fromCharCode(65 + currentQ.correctIndex)} is correct`}
                  </span>
                </div>

                {/* Clear "Why It is Correct" statement */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-extrabold text-sky-400 uppercase tracking-wider block">
                    {lang === 'th' ? '🔬 ทำไมคำตอบนี้จึงถูกต้อง (Why this is correct):' : '🔬 Scientific Reason:'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {lang === 'th' ? currentQ.explanationTh : currentQ.explanationEn}
                  </p>
                </div>

                {/* Physics & Math Details */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-slate-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">
                      {lang === 'th' ? 'สูตรฟิสิกส์ & สถิติจริง:' : 'Physics Formula & Real Data:'}
                    </span>
                    <span>{lang === 'th' ? currentQ.scienceDetailTh : currentQ.scienceDetailEn}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/25 transition-all"
                  >
                    <span>{currentIndex + 1 === filteredQuestions.length ? (lang === 'th' ? 'ดูผลคะแนนสรุป' : 'View Results') : (lang === 'th' ? 'ข้อถัดไป' : 'Next Question')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center py-8 space-y-5 animate-fadeIn">
            <div className="w-20 h-20 rounded-3xl bg-purple-500 text-white flex items-center justify-center mx-auto text-3xl shadow-xl shadow-purple-500/30">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black font-display">
                {lang === 'th' ? '🎉 จบควิซทดสอบความรู้พลังงาน!' : '🎉 Quiz Completed!'}
              </h3>
              <p className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                {selectedDifficulty === 'all' 
                  ? (lang === 'th' ? 'โหมด: ทุกระดับความรู้' : 'Mode: All Tiers')
                  : getDifficultyBadge(selectedDifficulty as any).label}
              </p>
            </div>

            <div className="inline-flex items-center gap-6 px-6 py-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-bold">{lang === 'th' ? 'คะแนนถูกต้อง' : 'Accuracy'}</span>
                <span className="text-2xl font-black font-mono text-emerald-400">{score} / {filteredQuestions.length}</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-bold">{lang === 'th' ? 'เปอร์เซ็นต์' : 'Percentage'}</span>
                <span className="text-2xl font-black font-mono text-purple-400">{Math.round((score / (filteredQuestions.length || 1)) * 100)}%</span>
              </div>
            </div>

            <div className="pt-3 flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-600/25 cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'th' ? 'ทำควิซใหม่อีกครั้ง' : 'Retry Quiz'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

