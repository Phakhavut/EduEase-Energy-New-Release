import React, { useState, useEffect, useCallback } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  Award,
  Lightbulb,
  Check,
  Zap,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion, getRandomQuizQuestions } from '../../data/manualQuizData';

export interface KnowledgeCheckScoreRecord {
  bestScore: number;
  lastScore: number;
  attempts: number;
  totalQuestions: number;
  completedAt: string;
  mastered: boolean;
}

interface KnowledgeCheckQuizProps {
  lessonId: string;
  lessonTitle: string;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onCompleteQuiz?: (lessonId: string, score: number, total: number) => void;
}

const STORAGE_KEY = 'eduease_manual_knowledge_scores';

export function getStoredQuizScores(): Record<string, KnowledgeCheckScoreRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveQuizScore(lessonId: string, score: number, total: number): KnowledgeCheckScoreRecord {
  const current = getStoredQuizScores();
  const existing = current[lessonId];
  const newRecord: KnowledgeCheckScoreRecord = {
    bestScore: existing ? Math.max(existing.bestScore, score) : score,
    lastScore: score,
    attempts: (existing?.attempts || 0) + 1,
    totalQuestions: total,
    completedAt: new Date().toISOString(),
    mastered: score === total || (existing?.mastered ?? false)
  };

  current[lessonId] = newRecord;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save quiz scores', e);
  }
  return newRecord;
}

export const KnowledgeCheckQuiz: React.FC<KnowledgeCheckQuizProps> = ({
  lessonId,
  lessonTitle,
  lang,
  isDarkMode,
  onCompleteQuiz
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [record, setRecord] = useState<KnowledgeCheckScoreRecord | null>(null);
  const [showExplanation, setShowExplanation] = useState(true);

  // Initialize questions
  const loadNewQuiz = useCallback(() => {
    const newQs = getRandomQuizQuestions(lessonId, 3);
    setQuestions(newQs);
    setCurrentIndex(0);
    setSelectedOptions({});
    setRevealed({});
    setIsFinished(false);
    setShowExplanation(true);
  }, [lessonId]);

  // Load record on lesson change
  useEffect(() => {
    const scores = getStoredQuizScores();
    setRecord(scores[lessonId] || null);
    loadNewQuiz();
  }, [lessonId, loadNewQuiz]);

  if (questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentIndex];
  const isCurrentRevealed = revealed[currentQ.id];
  const currentSelectedOption = selectedOptions[currentQ.id];

  // Calculate current score
  const calculateCurrentScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedOptions[q.id] === q.correctOptionId) {
        score += 1;
      }
    });
    return score;
  };

  const handleSelectOption = (optionId: string) => {
    if (isCurrentRevealed) return; // Prevent changing after instant feedback

    const isCorrect = optionId === currentQ.correctOptionId;
    setSelectedOptions((prev) => ({ ...prev, [currentQ.id]: optionId }));
    setRevealed((prev) => ({ ...prev, [currentQ.id]: true }));

    // Instant celebration trigger on right answer
    if (isCorrect && !isFinished) {
      // Small celebratory micro-burst
      try {
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.8 },
          colors: ['#10b981', '#34d399', '#fbbf24']
        });
      } catch {
        // safe ignore
      }
    }
  };

  const handleNextOrFinish = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all 3 questions
      const finalScore = calculateCurrentScore();
      const updated = saveQuizScore(lessonId, finalScore, questions.length);
      setRecord(updated);
      setIsFinished(true);

      if (onCompleteQuiz) {
        onCompleteQuiz(lessonId, finalScore, questions.length);
      }

      // If full marks 3/3, grand confetti!
      if (finalScore === questions.length) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#fbbf24', '#3b82f6', '#ec4899']
          });
        } catch {
          // safe ignore
        }
      }
    }
  };

  const finalScore = calculateCurrentScore();
  const xpEarned = finalScore * 10 + (finalScore === questions.length ? 20 : 0);

  return (
    <div
      id={`knowledge-check-${lessonId}`}
      className={`mt-8 rounded-3xl border transition-all overflow-hidden ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800 shadow-xl shadow-slate-950/40'
          : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'
      }`}
    >
      {/* Header Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[0.68rem] font-black uppercase tracking-wider">
                Knowledge Check
              </span>
              {record?.mastered && (
                <span className="flex items-center gap-1 text-[0.68rem] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-300/30">
                  <Award className="w-3 h-3" />
                  <span>Mastered ⭐</span>
                </span>
              )}
            </div>
            <h4 className="text-base sm:text-lg font-black mt-0.5">
              {lang === 'th' ? 'แบบทดสอบวัดความรู้ประจำบท (Randomized 3-Question Quiz)' : 'Lesson Knowledge Check (Randomized 3-Question Quiz)'}
            </h4>
          </div>
        </div>

        {/* Best Score Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {record ? (
            <div className="px-3 py-1.5 rounded-xl bg-black/20 backdrop-blur-md border border-white/15 text-xs flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-white/80">
                {lang === 'th' ? 'คะแนนสูงสุด:' : 'Best:'}
              </span>
              <strong className="text-amber-300 font-extrabold">
                {record.bestScore}/{record.totalQuestions}
              </strong>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-black/20 text-xs text-white/80">
              {lang === 'th' ? 'ทำเพื่อรับ +50 XP' : 'Earn up to +50 XP'}
            </div>
          )}

          <button
            onClick={loadNewQuiz}
            title={lang === 'th' ? 'สุ่มชุดคำถามใหม่' : 'Randomize New Questions'}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-bold border border-white/15"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{lang === 'th' ? 'สุ่มใหม่' : 'New Pool'}</span>
          </button>
        </div>
      </div>

      {/* Main Quiz Content */}
      <div className="p-5 sm:p-6 space-y-6">
        {!isFinished ? (
          <>
            {/* Progress Bar & Question Counter */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {lang === 'th' ? `คำถามที่ ${currentIndex + 1} จาก ${questions.length}` : `Question ${currentIndex + 1} of ${questions.length}`}
                </span>
                <span className="text-[0.68rem] text-slate-400">
                  ({lang === 'th' ? 'สุ่มจากคลังคำถาม' : 'Randomized Pool'})
                </span>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-1.5">
                {questions.map((q, idx) => {
                  const isDone = revealed[q.id];
                  const isCur = idx === currentIndex;
                  const isCorrect = isDone && selectedOptions[q.id] === q.correctOptionId;

                  return (
                    <div
                      key={q.id}
                      className={`w-6 h-2 rounded-full transition-all ${
                        isDone
                          ? isCorrect
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                          : isCur
                          ? 'bg-emerald-400/80 ring-2 ring-emerald-500/30'
                          : isDarkMode
                          ? 'bg-slate-800'
                          : 'bg-slate-200'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-1">
              <h5 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                {lang === 'th' ? currentQ.questionTh : currentQ.questionEn}
              </h5>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {lang === 'th' ? 'คลิกเลือกคำตอบที่ถูกต้องที่สุดเพื่อรับผลเฉลยทันที' : 'Select the best answer for instant feedback & insights'}
              </p>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = currentSelectedOption === opt.id;
                const isCorrect = opt.id === currentQ.correctOptionId;

                let optionStyle = isDarkMode
                  ? 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:border-emerald-500/60 hover:bg-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-emerald-500/60 hover:bg-emerald-50/40';

                let iconNode = (
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center uppercase transition-all shrink-0 ${
                      isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.id}
                  </span>
                );

                // When revealed, apply instant feedback coloring
                if (isCurrentRevealed) {
                  if (isSelected) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30 font-bold';
                      iconNode = (
                        <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4" />
                        </span>
                      );
                    } else {
                      optionStyle = 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/30 font-bold';
                      iconNode = (
                        <span className="w-6 h-6 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0">
                          <XCircle className="w-4 h-4" />
                        </span>
                      );
                    }
                  } else if (isCorrect) {
                    // Show correct answer when user made a mistake
                    optionStyle = 'bg-emerald-500/10 border-emerald-500/50 text-emerald-800 dark:text-emerald-300 border-dashed font-semibold';
                    iconNode = (
                      <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    );
                  } else {
                    optionStyle = isDarkMode
                      ? 'bg-slate-800/30 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-100/50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    id={`quiz-opt-${currentQ.id}-${opt.id}`}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isCurrentRevealed}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${optionStyle} ${
                      isCurrentRevealed ? 'cursor-default' : ''
                    }`}
                  >
                    {iconNode}
                    <span className="text-xs sm:text-sm leading-snug flex-1">
                      {lang === 'th' ? opt.textTh : opt.textEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback & Explanations Card */}
            {isCurrentRevealed && (
              <div
                className={`p-4 rounded-2xl border animate-fadeIn space-y-3 ${
                  selectedOptions[currentQ.id] === currentQ.correctOptionId
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {selectedOptions[currentQ.id] === currentQ.correctOptionId ? (
                      <>
                        <div className="p-1 rounded-lg bg-emerald-500 text-white">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                          {lang === 'th' ? 'ถูกต้องยอดเยี่ยม! (+10 XP)' : 'Correct! Well Done! (+10 XP)'}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="p-1 rounded-lg bg-rose-500 text-white">
                          <XCircle className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-extrabold text-rose-600 dark:text-rose-400">
                          {lang === 'th' ? 'ยังไม่ถูกต้อง — มาดูคำอธิบายกัน' : 'Incorrect — Review the Insight Below'}
                        </span>
                      </>
                    )}
                  </div>

                  <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold">
                    {lang === 'th' ? 'คำตอบที่ถูกคือ:' : 'Correct:'}{' '}
                    <strong className="text-emerald-500 uppercase">{currentQ.correctOptionId}</strong>
                  </span>
                </div>

                {/* Explanation text */}
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {lang === 'th' ? currentQ.explanationTh : currentQ.explanationEn}
                </p>

                {/* Tip Pill */}
                {(currentQ.tipTh || currentQ.tipEn) && (
                  <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-300">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === 'th' ? currentQ.tipTh : currentQ.tipEn}</span>
                  </div>
                )}
              </div>
            )}

            {/* Next / Submit Button */}
            {isCurrentRevealed && (
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={handleNextOrFinish}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentIndex < questions.length - 1
                      ? lang === 'th'
                        ? 'คำถามถัดไป'
                        : 'Next Question'
                      : lang === 'th'
                      ? 'ดูผลคะแนนรวม'
                      : 'View Results'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Finished State & Result Scorecard */
          <div className="py-4 space-y-6 text-center animate-fadeIn">
            {/* Score Ring / Trophy */}
            <div className="relative inline-block">
              <div
                className={`w-24 h-24 rounded-full mx-auto flex flex-col items-center justify-center border-4 shadow-xl ${
                  finalScore === questions.length
                    ? 'border-amber-400 bg-amber-500/10 text-amber-500 shadow-amber-500/20'
                    : finalScore >= 2
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-emerald-500/20'
                    : 'border-slate-400 bg-slate-500/10 text-slate-500'
                }`}
              >
                <Trophy className="w-7 h-7 mb-0.5" />
                <span className="text-2xl font-black font-mono leading-none">
                  {finalScore}/{questions.length}
                </span>
              </div>
              {finalScore === questions.length && (
                <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-amber-400 text-slate-900 shadow-lg animate-bounce">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Headline and feedback message */}
            <div className="space-y-2 max-w-md mx-auto">
              <h4 className="text-xl font-black text-slate-900 dark:text-white">
                {finalScore === questions.length
                  ? lang === 'th'
                    ? 'ยินดีด้วย! ผ่านบทเรียนนี้ระดับ Master ⭐'
                    : 'Congratulations! Lesson Mastered ⭐'
                  : finalScore >= 2
                  ? lang === 'th'
                    ? 'ยอดเยี่ยมมาก! ผ่านเกณฑ์ระดับดี 👍'
                    : 'Great Job! Above Average 👍'
                  : lang === 'th'
                  ? 'ทบทวนเนื้อหาอีกนิด แล้วมาทำใหม่นะ 📚'
                  : 'Keep Learning & Try Again 📚'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {finalScore === questions.length
                  ? lang === 'th'
                    ? `คุณตอบถูกต้องครบทั้ง 3 ข้อของ "${lessonTitle}" ระบบได้บันทึกคะแนนและมอบตราเกียรติยศลงในโปรไฟล์ของคุณเรียบร้อยแล้ว!`
                    : `You answered all 3 questions correctly for "${lessonTitle}". Your mastery is recorded with honor!`
                  : lang === 'th'
                  ? `คุณทำได้ ${finalScore} จาก ${questions.length} ข้อ สามารถกดสุ่มชุดคำถามใหม่เพื่อฝึกฝนและทำคะแนนเต็มได้ตลอดเวลา`
                  : `You scored ${finalScore} out of ${questions.length}. You can retake with fresh randomized questions anytime.`}
              </p>
            </div>

            {/* Gamified Rewards Box */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto text-left">
              <div
                className={`p-3 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-[0.68rem] text-slate-400 font-bold uppercase">
                  {lang === 'th' ? 'แต้ม XP ที่ได้รับ' : 'XP Earned'}
                </div>
                <div className="text-lg font-black text-emerald-500 flex items-center gap-1 mt-0.5">
                  <Zap className="w-4 h-4 fill-emerald-500" />
                  <span>+{xpEarned} XP</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-[0.68rem] text-slate-400 font-bold uppercase">
                  {lang === 'th' ? 'ความแม่นยำ' : 'Accuracy'}
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {Math.round((finalScore / questions.length) * 100)}%
                </div>
              </div>

              <div
                className={`p-3 rounded-2xl border col-span-2 sm:col-span-1 ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-[0.68rem] text-slate-400 font-bold uppercase">
                  {lang === 'th' ? 'จำนวนครั้งที่ทำ' : 'Attempts'}
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {record?.attempts || 1} {lang === 'th' ? 'ครั้ง' : 'times'}
                </div>
              </div>
            </div>

            {/* Review of Questions Accordion or List */}
            <div className="max-w-lg mx-auto text-left space-y-2 pt-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>{lang === 'th' ? 'สรุปคำตอบของคุณ (Question Review):' : 'Question Review:'}</span>
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="text-emerald-500 hover:underline cursor-pointer text-[0.68rem]"
                >
                  {showExplanation
                    ? lang === 'th' ? 'ย่อคำอธิบาย' : 'Collapse'
                    : lang === 'th' ? 'ขยายคำอธิบาย' : 'Expand'}
                </button>
              </div>

              <div className="space-y-2">
                {questions.map((q, idx) => {
                  const isCorrect = selectedOptions[q.id] === q.correctOptionId;
                  return (
                    <div
                      key={q.id}
                      className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                        isCorrect
                          ? 'bg-emerald-500/5 border-emerald-500/30'
                          : 'bg-rose-500/5 border-rose-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          )}
                          <span className="font-bold text-slate-900 dark:text-white">
                            {idx + 1}. {lang === 'th' ? q.questionTh : q.questionEn}
                          </span>
                        </div>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[0.68rem] font-bold uppercase shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {isCorrect ? '+10 XP' : '0 XP'}
                        </span>
                      </div>

                      {showExplanation && (
                        <div className="pl-6 text-[0.72rem] text-slate-500 dark:text-slate-400 leading-normal border-t border-slate-200/50 dark:border-slate-800/50 pt-1.5">
                          <strong>{lang === 'th' ? 'เฉลย:' : 'Explanation:'}</strong>{' '}
                          {lang === 'th' ? q.explanationTh : q.explanationEn}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={loadNewQuiz}
                className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>
                  {lang === 'th' ? 'ทำซ้ำด้วยคำถามสุ่มชุดใหม่ (Retake Quiz)' : 'Retake with New Questions'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeCheckQuiz;
