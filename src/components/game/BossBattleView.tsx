import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  EnergyBoss, 
  BattleQuestion, 
  BossId 
} from '../../types';
import { 
  Swords, 
  Zap, 
  Flame, 
  Shield, 
  Heart, 
  Lightbulb, 
  Sparkles, 
  Gift, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft,
  RotateCcw,
  HelpCircle,
  HelpCircle as QuestionMark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BossIllustration, CharacterAvatar, MascotAvatar } from './GameVisualAssets';

interface BossBattleViewProps {
  boss: EnergyBoss;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  userEnergy: number;
  setUserEnergy: React.Dispatch<React.SetStateAction<number>>;
  onVictory: (bossId: BossId, rewards: { xp: number; coins: number; crystals: number; blueprintId?: string; seedId?: string }) => void;
  onBack: () => void;
  onGoToCity: () => void;
}

export const BossBattleView: React.FC<BossBattleViewProps> = ({
  boss,
  lang,
  isDarkMode,
  userEnergy,
  setUserEnergy,
  onVictory,
  onBack,
  onGoToCity,
}) => {
  const [bossHp, setBossHp] = useState(boss.totalHp);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [lastDamageDealt, setLastDamageDealt] = useState<number | null>(null);
  const [isCounterAttacking, setIsCounterAttacking] = useState(false);
  const [isBossHit, setIsBossHit] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [isDefeat, setIsDefeat] = useState(false);

  const questionPool = boss.questionPool || [];
  const currentQuestion: BattleQuestion = questionPool[currentQuestionIdx] || questionPool[0];

  // Calculate current Boss Phase (Phase 1 100-70%, Phase 2 70-30%, Phase 3 30-0%)
  const hpPercent = (bossHp / boss.totalHp) * 100;
  let currentPhase = boss.phases[0];
  if (hpPercent <= 30 && boss.phases[2]) {
    currentPhase = boss.phases[2];
  } else if (hpPercent <= 70 && boss.phases[1]) {
    currentPhase = boss.phases[1];
  }

  // Calculate damage multiplier based on combo
  const getComboMultiplier = (combo: number) => {
    if (combo >= 10) return 2.0;
    if (combo >= 5) return 1.5;
    if (combo >= 3) return 1.25;
    return 1.0;
  };

  const handleSelectAnswer = (optionIndex: number | string) => {
    if (showExplanation || isVictory || isDefeat) return;
    setSelectedOption(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || showExplanation) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      // Calculate Damage
      const multiplier = getComboMultiplier(comboCount + 1);
      const calculatedDamage = Math.round(currentQuestion.damage * multiplier);
      
      setLastDamageDealt(calculatedDamage);
      setIsBossHit(true);
      setTimeout(() => setIsBossHit(false), 500);

      const newBossHp = Math.max(0, bossHp - calculatedDamage);
      setBossHp(newBossHp);
      setComboCount(prev => prev + 1);
      setShowExplanation(true);

      if (newBossHp === 0) {
        setIsVictory(true);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        onVictory(boss.id, boss.rewards);
      }
    } else {
      // Wrong Answer -> Boss Counter Attack
      setIsCounterAttacking(true);
      setTimeout(() => setIsCounterAttacking(false), 600);
      
      setComboCount(0);
      setUserEnergy(prev => {
        const nextEnergy = Math.max(0, prev - boss.attack);
        if (nextEnergy === 0) {
          setIsDefeat(true);
        }
        return nextEnergy;
      });
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setShowHint(false);
    setLastDamageDealt(null);

    if (currentQuestionIdx + 1 < questionPool.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Loop back to pool if battle continues
      setCurrentQuestionIdx(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-20 px-2 sm:px-0">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:scale-102 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'th' ? 'ออกจาก Battle' : 'Exit Battle'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Guardian Energy Bar */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-extrabold">
            <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
            <span>HP: {userEnergy} / 100</span>
          </div>

          {/* Combo Indicator */}
          {comboCount > 0 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-black shadow-lg shadow-amber-500/20 flex items-center gap-1"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>COMBO ×{comboCount} ({getComboMultiplier(comboCount)}x Damage)</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Boss Stage Card */}
      <div className={`relative p-5 rounded-3xl border shadow-xl overflow-hidden transition-all ${
        isCounterAttacking ? 'ring-4 ring-rose-500 animate-shake' : ''
      } ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white shadow-emerald-950/30' 
          : 'bg-white border-slate-200 text-slate-800 shadow-md'
      }`}>
        {/* Background Element Glow */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br ${boss.elementColor} opacity-15 blur-3xl -z-0 pointer-events-none`} />

        {/* Boss Info Header */}
        <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={isBossHit ? { x: [-10, 10, -5, 5, 0], filter: 'brightness(2)' } : { y: [0, -6, 0] }}
              transition={isBossHit ? { duration: 0.4 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${boss.elementColor} flex items-center justify-center shadow-xl ring-4 ring-white/10 shrink-0 p-1`}
            >
              <BossIllustration bossId={boss.id} size="md" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  BOSS LV.{boss.level}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  PHASE {currentPhase.phaseNumber} / 3
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white leading-tight">
                {lang === 'th' ? boss.nameTh : boss.nameEn}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'th' ? boss.titleTh : boss.titleEn}
              </p>
            </div>
          </div>
        </div>

        {/* Boss HP Bar */}
        <div className="relative z-10 space-y-1 mb-4">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              {lang === 'th' ? currentPhase.titleTh : currentPhase.titleEn}
            </span>
            <span className="font-mono text-rose-500">
              {bossHp} / {boss.totalHp} HP ({Math.round(hpPercent)}%)
            </span>
          </div>
          <div className="w-full h-4 rounded-full bg-slate-200 dark:bg-slate-800 p-0.5 relative overflow-hidden border border-slate-300 dark:border-slate-700">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: `${hpPercent}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500 shadow-sm"
            />
            {/* Phase Threshold Lines */}
            <div className="absolute top-0 bottom-0 left-[30%] w-0.5 bg-white/40 z-10" />
            <div className="absolute top-0 bottom-0 left-[70%] w-0.5 bg-white/40 z-10" />
          </div>
        </div>

        {/* Boss Dialogue Bubble */}
        <div className={`relative z-10 p-3.5 rounded-2xl border text-xs leading-relaxed italic ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          "{lang === 'th' ? currentPhase.dialogueTh : currentPhase.dialogueEn}"
        </div>

        {/* Floating Last Damage Number */}
        <AnimatePresence>
          {lastDamageDealt && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.5 }}
              animate={{ opacity: 1, y: -25, scale: 1.4 }}
              exit={{ opacity: 0 }}
              className="absolute top-12 right-12 z-30 font-black text-2xl sm:text-3xl text-amber-400 drop-shadow-[0_4px_10px_rgba(245,158,11,0.6)] font-mono"
            >
              -{lastDamageDealt} HP! ⚡
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Victory View Overlay Screen */}
      {isVictory ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 sm:p-8 rounded-3xl border shadow-2xl text-center space-y-5 ${
            isDarkMode ? 'bg-slate-900 border-emerald-500/40 text-white' : 'bg-white border-emerald-300 text-slate-800'
          }`}
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30 animate-bounce">
            🎉
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black font-display bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {lang === 'th' ? `เอาชนะ ${boss.nameTh} สำเร็จ!` : `DEFEATED ${boss.nameEn}!`}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              {lang === 'th' ? 'คุณได้ปกป้องเมืองจากความสิ้นเปลืองพลังงานเรียบร้อยแล้ว!' : 'You successfully protected the city from energy waste!'}
            </p>
          </div>

          {/* Reward Table */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold">
            <div className="space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">XP Reward</span>
              <p className="text-emerald-500 text-base font-extrabold">+{boss.rewards.xp} XP</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Coins</span>
              <p className="text-amber-500 text-base font-extrabold">+{boss.rewards.coins} 💰</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Crystals</span>
              <p className="text-cyan-400 text-base font-extrabold">+{boss.rewards.crystals} 💎</p>
            </div>
          </div>

          {/* Loot Items Unlocked */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-xs text-left space-y-2">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
              {lang === 'th' ? 'พิมพ์เขียว & รางวัลที่ได้รับ:' : 'Unlocked Loot & Blueprints:'}
            </span>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-2xl">📜</span>
              <div>
                <p className="font-extrabold text-white">Eco House Blueprint</p>
                <p className="text-[10px] text-slate-400">นำไปสร้างบ้านประหยัดพลังงานใน Sustainable City ได้ทันที</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onBack}
              className="px-5 py-3 rounded-2xl bg-slate-800 text-white text-xs font-extrabold hover:bg-slate-700 transition-all"
            >
              {lang === 'th' ? 'กลับ Game Hub' : 'Back to Game Hub'}
            </button>
            <button
              onClick={onGoToCity}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/25 hover:scale-102 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>{lang === 'th' ? 'นำ Blueprint ไปสร้างเมือง 🏙️' : 'Build City with Blueprint 🏙️'}</span>
            </button>
          </div>
        </motion.div>
      ) : isDefeat ? (
        /* Defeat View */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 sm:p-8 rounded-3xl border shadow-2xl text-center space-y-5 ${
            isDarkMode ? 'bg-slate-900 border-rose-500/40 text-white' : 'bg-white border-rose-300 text-slate-800'
          }`}
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-4xl">
            💥
          </div>
          <div>
            <h3 className="text-2xl font-black font-display text-rose-500">
              {lang === 'th' ? 'พลัง Guardian หมดลง!' : 'Energy Guardian Defeated!'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'th' ? 'ไม่ต้องกังวล! ไปศึกษาเคล็ดลับใน Learning Academy แล้วกลับมาท้าสู้ใหม่' : 'Don\'t give up! Study the lesson in Learning Academy and try again.'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setBossHp(boss.totalHp);
                setUserEnergy(100);
                setIsDefeat(false);
                setComboCount(0);
              }}
              className="px-6 py-3 rounded-2xl bg-rose-500 text-white text-xs font-extrabold shadow-lg shadow-rose-500/25 hover:scale-102 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'th' ? 'ลองสู้อีกครั้ง' : 'Try Again'}</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* Active Question Card */
        <div className={`p-5 rounded-3xl border shadow-xl space-y-4 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          {/* Question Topic Header & Hint Trigger */}
          <div className="flex items-center justify-between text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20">
              🎯 {lang === 'th' ? currentQuestion.topicTh : currentQuestion.topicEn}
            </span>

            <button
              onClick={() => setShowHint(prev => !prev)}
              className="flex items-center gap-1 text-amber-500 font-bold hover:underline"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHint ? (lang === 'th' ? 'ซ่อน Hint' : 'Hide Hint') : (lang === 'th' ? 'ดู Hint 💡' : 'View Hint 💡')}</span>
            </button>
          </div>

          {/* Hint Card Expansion */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 font-medium leading-relaxed"
              >
                💡 <strong>Hint:</strong> {lang === 'th' ? currentQuestion.hintTh : currentQuestion.hintEn}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold font-display leading-snug text-slate-900 dark:text-white">
            {lang === 'th' ? currentQuestion.questionTh : currentQuestion.questionEn}
          </h3>

          {/* Answer Choices List */}
          {currentQuestion.type === 'mc' || currentQuestion.type === 'tf' || currentQuestion.type === 'calc' || currentQuestion.type === 'scenario' ? (
            <div className="space-y-2.5 pt-1">
              {(lang === 'th' ? currentQuestion.optionsTh : currentQuestion.optionsEn)?.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={showExplanation}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                    selectedOption === idx
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                      : isDarkMode 
                        ? 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-700 text-slate-200' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 text-[10px] flex items-center justify-center font-mono">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </span>
                  {selectedOption === idx && (
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          ) : currentQuestion.type === 'detective' ? (
            /* Interactive Detective Waste Spotter */
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-xs space-y-3">
              <p className="text-slate-300 font-bold">คลิกเลือกอุปกรณ์ในห้องที่เกิดการใช้ไฟสิ้นเปลืองทิ้งไว้:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentQuestion.dataPoints?.items?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectAnswer(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedOption === item.id 
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' 
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <p className="font-extrabold text-white">{item.nameTh}</p>
                    <p className="text-[10px] text-slate-400">กำลังไฟ: {item.watts}W</p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Action Button: Answer / Next */}
          <div className="pt-2">
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  selectedOption !== null
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:scale-101 active:scale-99 cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>{lang === 'th' ? 'โจมตีด้วยคำตอบนี้ ⚔️' : 'Attack with this answer ⚔️'}</span>
              </button>
            ) : (
              <div className="space-y-3">
                {/* Result Box */}
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                  selectedOption === currentQuestion.correctAnswer
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-300'
                }`}>
                  <div className="flex items-center gap-2 font-black text-sm mb-1">
                    {selectedOption === currentQuestion.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>⚡ SUPER EFFECTIVE! ทำ Damage +{lastDamageDealt} HP!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-500" />
                        <span>💥 Boss Counter Attack! โดนโจมตีสวน -{boss.attack} HP</span>
                      </>
                    )}
                  </div>
                  <p className="mt-1">
                    <strong>คำอธิบาย:</strong> {lang === 'th' ? currentQuestion.explanationTh : currentQuestion.explanationEn}
                  </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3.5 rounded-2xl font-black text-xs bg-slate-800 text-white hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'th' ? 'ข้อต่อไป ➔' : 'Next Question ➔'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
