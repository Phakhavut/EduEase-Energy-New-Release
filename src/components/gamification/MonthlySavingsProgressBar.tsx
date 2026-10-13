import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  Award, 
  Flame, 
  Coins, 
  Leaf, 
  Plus, 
  Sliders, 
  Volume2, 
  ShieldCheck,
  Star,
  PartyPopper
} from 'lucide-react';

export interface Milestone {
  id: number;
  pct: number;           // 25, 50, 75, 100
  titleTh: string;
  titleEn: string;
  badgeTh: string;
  badgeEn: string;
  icon: string;
  rewardXp: number;
  rewardCoins: number;
  thresholdCost: number; // e.g. 125, 250, 375, 500
}

export interface MonthlySavingsProgressBarProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  initialSaved?: number;        // Current monthly money saved in THB (e.g. 320)
  targetGoal?: number;          // Target monthly savings goal in THB (e.g. 500)
  userLevel?: number;           // Current user level (e.g. 7)
  userXp?: number;
  userXpMax?: number;
  userCoins?: number;
  onLevelUp?: (newLevel: number, bonusXp: number, bonusCoins: number) => void;
  className?: string;
}

export const MonthlySavingsProgressBar: React.FC<MonthlySavingsProgressBarProps> = ({
  lang,
  isDarkMode,
  initialSaved = 320,
  targetGoal = 500,
  userLevel = 7,
  userXp = 2450,
  userXpMax = 3000,
  userCoins = 340,
  onLevelUp,
  className = '',
}) => {
  // Goal and Progress states
  const [savingsTarget, setSavingsTarget] = useState<number>(targetGoal);
  const [currentSaved, setCurrentSaved] = useState<number>(initialSaved);
  const [currentLevel, setCurrentLevel] = useState<number>(userLevel);
  const [xp, setXp] = useState<number>(userXp);
  const [coins, setCoins] = useState<number>(userCoins);

  // Level Up Celebration Modal states
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [activeMilestoneReward, setActiveMilestoneReward] = useState<Milestone | null>(null);
  const [celebrationLevel, setCelebrationLevel] = useState<number>(userLevel + 1);

  // Track achieved milestone IDs to trigger Level Up only once per threshold crossed
  const [achievedMilestones, setAchievedMilestones] = useState<number[]>(() => {
    const initialPct = (initialSaved / targetGoal) * 100;
    const initialAchieved: number[] = [];
    if (initialPct >= 25) initialAchieved.push(1);
    if (initialPct >= 50) initialAchieved.push(2);
    if (initialPct >= 75) initialAchieved.push(3);
    if (initialPct >= 100) initialAchieved.push(4);
    return initialAchieved;
  });

  // Calculate current progress percentage
  const progressPct = Math.min(100, Math.max(0, Math.round((currentSaved / savingsTarget) * 100)));

  // Define 4 Milestones dynamically based on current savings target
  const milestones: Milestone[] = [
    {
      id: 1,
      pct: 25,
      thresholdCost: Math.round(savingsTarget * 0.25),
      titleTh: 'ก้าวแรกพลังงานสะอาด',
      titleEn: 'Eco Starter',
      badgeTh: 'ผู้เริ่มต้นรักษ์โลก',
      badgeEn: 'Eco Beginner',
      icon: '🌱',
      rewardXp: 50,
      rewardCoins: 15,
    },
    {
      id: 2,
      pct: 50,
      thresholdCost: Math.round(savingsTarget * 0.50),
      titleTh: 'ผู้พิทักษ์กำลังไฟ',
      titleEn: 'Power Guardian',
      badgeTh: 'ลดค่าไฟครึ่งทาง',
      badgeEn: 'Halfway Hero',
      icon: '⚡',
      rewardXp: 100,
      rewardCoins: 30,
    },
    {
      id: 3,
      pct: 75,
      thresholdCost: Math.round(savingsTarget * 0.75),
      titleTh: 'ปรมาจารย์ประสิทธิภาพ',
      titleEn: 'Efficiency Master',
      badgeTh: 'ผู้เชี่ยวชาญการประหยัด',
      badgeEn: 'Energy Pro',
      icon: '🔥',
      rewardXp: 150,
      rewardCoins: 50,
    },
    {
      id: 4,
      pct: 100,
      thresholdCost: savingsTarget,
      titleTh: 'แชมเปี้ยนสมาร์ทกริด',
      titleEn: 'Grid Champion',
      badgeTh: 'พิชิตเป้าหมายรายเดือน 100%',
      badgeEn: 'Monthly Goal Conquered',
      icon: '👑',
      rewardXp: 300,
      rewardCoins: 100,
    },
  ];

  // Synthesize Web Audio API celebration chime
  const playCelebrationChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Level up melody (Arpeggio: C5 -> E5 -> G5 -> C6)
      playTone(523.25, 0.0, 0.2); // C5
      playTone(659.25, 0.15, 0.2); // E5
      playTone(783.99, 0.30, 0.25); // G5
      playTone(1046.50, 0.45, 0.6); // C6 fanfare
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  // Fire celebratory fireworks confetti
  const triggerConfettiExplosion = () => {
    try {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#2563EB', '#38BDF8', '#10B981']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#F59E0B', '#34D399', '#60A5FA']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        colors: ['#FCD34D', '#F43F5E', '#A78BFA']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } catch (e) {
      console.warn('Confetti effect failed', e);
    }
  };

  // Trigger Level Up Celebration
  const triggerLevelUp = (milestone: Milestone) => {
    const nextLevel = currentLevel + 1;
    setCurrentLevel(nextLevel);
    setCelebrationLevel(nextLevel);
    setActiveMilestoneReward(milestone);
    setXp(prev => prev + milestone.rewardXp);
    setCoins(prev => prev + milestone.rewardCoins);
    setShowLevelUpModal(true);

    playCelebrationChime();
    triggerConfettiExplosion();

    if (onLevelUp) {
      onLevelUp(nextLevel, milestone.rewardXp, milestone.rewardCoins);
    }
  };

  // Add savings and test milestone crossing
  const handleAddSavings = (amount: number, reasonTh: string, reasonEn: string) => {
    const newTotal = currentSaved + amount;
    setCurrentSaved(newTotal);

    // Check if new total crosses any unachieved milestone
    const newPct = (newTotal / savingsTarget) * 100;
    const newlyAchievedMilestone = milestones.find(
      m => newPct >= m.pct && !achievedMilestones.includes(m.id)
    );

    if (newlyAchievedMilestone) {
      setAchievedMilestones(prev => [...prev, newlyAchievedMilestone.id]);
      triggerLevelUp(newlyAchievedMilestone);
    }
  };

  // Level title calculation
  const getLevelTitle = (lvl: number) => {
    if (lvl <= 3) return { th: 'ผู้เริ่มต้นประหยัดไฟ', en: 'Energy Novice' };
    if (lvl <= 6) return { th: 'ผู้คุมกำลังไฟฟ้า', en: 'Power Controller' };
    if (lvl <= 9) return { th: 'ผู้พิทักษ์พลังงานแสงอาทิตย์', en: 'Solar Guardian' };
    return { th: 'ผู้เชี่ยวชาญสมาร์ทกริดระดับสูง', en: 'Smart Grid Grandmaster' };
  };

  return (
    <div
      className={`p-5 sm:p-6 rounded-[24px] border transition-all duration-300 relative overflow-hidden ${
        isDarkMode
          ? 'bg-[#0B132B] border-[#1E2E5D]/90 shadow-xl shadow-blue-950/40 text-white'
          : 'bg-white border-slate-200 shadow-lg shadow-blue-900/5 text-slate-900'
      } ${className}`}
    >
      {/* Top Background Glow */}
      <div 
        className={`absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
          isDarkMode ? 'bg-[#10B981]/15' : 'bg-emerald-400/10'
        }`} 
      />

      {/* 1. Header with Level Badge & Goals */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-[#1E2E5D]/70">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm shadow-emerald-600/30">
              <Trophy className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'ภารกิจประหยัดพลังงานรายเดือน' : 'Monthly Energy Goal'}</span>
            </span>

            {/* Current Level Pill */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#2563EB]/15 text-[#38BDF8] border border-blue-500/30">
              <Sparkles className="w-3 h-3" />
              <span>Lv. {currentLevel}: {lang === 'th' ? getLevelTitle(currentLevel).th : getLevelTitle(currentLevel).en}</span>
            </span>

            {/* Streak Indicator */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/25">
              <Flame className="w-3 h-3 fill-amber-500" />
              <span>5 {lang === 'th' ? 'วันต่อเนื่อง' : 'day streak'}</span>
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold tracking-tight font-display text-slate-900 dark:text-white flex items-center gap-2">
            <span>{lang === 'th' ? 'ความคืบหน้าเป้าหมายลดค่าไฟประจำเดือน' : 'Monthly Savings Goal & Level-Up Milestones'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {lang === 'th' 
              ? `พิชิตเป้าหมายประหยัด ฿${savingsTarget.toLocaleString()} เดือนนี้ เพื่อปลดล็อกแต้ม XP และเลเวลใหม่` 
              : `Reach your ฿${savingsTarget.toLocaleString()} monthly savings target to unlock milestones and level up`}
          </p>
        </div>

        {/* Goal Selector Buttons */}
        <div className="flex items-center gap-1.5 self-start md:self-center shrink-0">
          <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline">
            {lang === 'th' ? 'เป้าหมาย:' : 'Target:'}
          </span>
          {[300, 500, 800].map((goal) => (
            <button
              key={goal}
              onClick={() => setSavingsTarget(goal)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                savingsTarget === goal
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-600/30'
                  : 'bg-slate-100 dark:bg-[#0E1A3D] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1E2E5D]'
              }`}
            >
              ฿{goal}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Primary Progress Bar with Milestone Markers */}
      <div className="relative z-10 my-6">
        {/* Progress Bar Numerical Stats */}
        <div className="flex items-end justify-between mb-2.5">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                ฿{currentSaved.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                / ฿{savingsTarget.toLocaleString()} {lang === 'th' ? 'เป้าหมาย' : 'goal'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <Leaf className="w-3 h-3" />
              <span>
                {lang === 'th'
                  ? `ประหยัดสะสมแล้ว ${progressPct}% (เหลืออีก ฿${Math.max(0, savingsTarget - currentSaved).toLocaleString()})`
                  : `${progressPct}% saved to date (฿${Math.max(0, savingsTarget - currentSaved).toLocaleString()} to goal)`}
              </span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              {progressPct}% COMPLETED
            </span>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">
              ~{(currentSaved * 0.48 / 4.7).toFixed(1)} kg CO₂ avoided
            </div>
          </div>
        </div>

        {/* The Track and Progress Bar */}
        <div className="relative w-full h-5 rounded-full bg-slate-100 dark:bg-[#080E24] border border-slate-200 dark:border-[#1E2E5D] p-0.5 overflow-visible">
          {/* Active Fill Gradient with Glow */}
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#10B981] relative shadow-lg shadow-blue-500/20"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Shimmer pulse effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer rounded-full" />
          </motion.div>

          {/* 4 Milestone Pins along the Track */}
          {milestones.map((milestone) => {
            const isReached = currentSaved >= milestone.thresholdCost;
            return (
              <div
                key={milestone.id}
                style={{ left: `${milestone.pct}%` }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 group"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isReached) {
                      triggerLevelUp(milestone);
                    }
                  }}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 cursor-pointer shadow-md ${
                    isReached
                      ? 'bg-[#10B981] border-white text-white shadow-emerald-500/40 hover:scale-115 animate-bounce-subtle'
                      : 'bg-slate-200 dark:bg-[#101B3B] border-slate-300 dark:border-[#1E2E5D] text-slate-400 hover:scale-110'
                  }`}
                  title={`${lang === 'th' ? milestone.titleTh : milestone.titleEn} (฿${milestone.thresholdCost})`}
                >
                  {isReached ? (
                    <span className="text-xs">{milestone.icon}</span>
                  ) : (
                    <span className="text-[10px] font-mono">{milestone.pct}%</span>
                  )}
                </button>

                {/* Milestone Hover Popup Badge */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                  <div className={`p-2 rounded-xl text-[11px] whitespace-nowrap shadow-xl border backdrop-blur-md ${
                    isDarkMode 
                      ? 'bg-[#080E24]/95 border-[#1E2E5D] text-white' 
                      : 'bg-white/95 border-slate-200 text-slate-900'
                  }`}>
                    <div className="font-bold flex items-center gap-1 text-[#38BDF8]">
                      <span>{milestone.icon}</span>
                      <span>{lang === 'th' ? milestone.titleTh : milestone.titleEn}</span>
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      {lang === 'th' ? `ประหยัด ฿${milestone.thresholdCost}` : `Target: ฿${milestone.thresholdCost}`}
                    </div>
                    <div className="text-amber-400 font-mono text-[10px] flex items-center gap-1 mt-0.5">
                      <span>+{milestone.rewardXp} XP</span>
                      <span>+{milestone.rewardCoins} ECO</span>
                    </div>
                  </div>
                  <div className="w-2 h-2 rotate-45 bg-[#080E24] border-r border-b border-[#1E2E5D] -mt-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Labels below the Track */}
        <div className="relative w-full h-8 mt-2 hidden sm:block">
          {milestones.map((milestone) => {
            const isReached = currentSaved >= milestone.thresholdCost;
            return (
              <div
                key={milestone.id}
                style={{ left: `${milestone.pct}%` }}
                className="absolute top-0 -translate-x-1/2 text-center"
              >
                <span className={`text-[11px] font-bold block truncate max-w-[90px] ${
                  isReached ? 'text-[#10B981]' : 'text-slate-400'
                }`}>
                  {lang === 'th' ? milestone.titleTh : milestone.titleEn}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  ฿{milestone.thresholdCost}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Interactive "Log Eco Actions" Quick Increments */}
      <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-white/5 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {lang === 'th' ? 'บันทึกพฤติกรรมประหยัดไฟวันนี้ (Quick Eco Actions):' : 'Log Daily Eco Actions:'}
            </span>
          </div>

          <span className="text-[11px] text-slate-400">
            {lang === 'th' ? 'กดเพื่อเพิ่มยอดประหยัดและลุ้น Level Up ทันที' : 'Click to log savings & test milestone Level Up'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => handleAddSavings(25, 'ปรับแอร์ 26°C + พัดลม', 'AC 26°C + Fan')}
            className="p-2 sm:p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-1.5 transition-all hover:scale-102 active:scale-98 cursor-pointer bg-slate-50 hover:bg-blue-50/50 dark:bg-[#0E1A3D] dark:hover:bg-[#142352] border-slate-200 dark:border-[#1E2E5D] text-slate-700 dark:text-slate-300"
          >
            <span className="truncate">❄️ {lang === 'th' ? 'แอร์ 26°C + พัดลม' : 'AC 26°C + Fan'}</span>
            <span className="text-emerald-500 font-mono font-bold shrink-0">+฿25</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddSavings(15, 'ถอดปลั๊ก Standby คอม', 'Sleep PC Standby')}
            className="p-2 sm:p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-1.5 transition-all hover:scale-102 active:scale-98 cursor-pointer bg-slate-50 hover:bg-blue-50/50 dark:bg-[#0E1A3D] dark:hover:bg-[#142352] border-slate-200 dark:border-[#1E2E5D] text-slate-700 dark:text-slate-300"
          >
            <span className="truncate">🔌 {lang === 'th' ? 'ตัด Standby คอม' : 'Cut Standby'}</span>
            <span className="text-emerald-500 font-mono font-bold shrink-0">+฿15</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddSavings(20, 'กระชับเวลาน้ำอุ่น', 'Fast Shower')}
            className="p-2 sm:p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-1.5 transition-all hover:scale-102 active:scale-98 cursor-pointer bg-slate-50 hover:bg-blue-50/50 dark:bg-[#0E1A3D] dark:hover:bg-[#142352] border-slate-200 dark:border-[#1E2E5D] text-slate-700 dark:text-slate-300"
          >
            <span className="truncate">🚿 {lang === 'th' ? 'ลดเวลาน้ำอุ่น' : 'Warm Shower'}</span>
            <span className="text-emerald-500 font-mono font-bold shrink-0">+฿20</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddSavings(50, 'ทดสอบ Level Up Milestone', 'Test Milestone')}
            className="p-2 sm:p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-1.5 transition-all hover:scale-102 active:scale-98 cursor-pointer bg-[#2563EB]/15 hover:bg-[#2563EB]/25 border-blue-500/30 text-[#38BDF8]"
          >
            <span className="truncate">🚀 {lang === 'th' ? 'จำลอง Milestone' : 'Simulate +฿50'}</span>
            <span className="text-[#38BDF8] font-mono font-bold shrink-0">+฿50</span>
          </button>
        </div>
      </div>

      {/* ====================================================
          LEVEL UP CELEBRATION MODAL OVERLAY
          ==================================================== */}
      <AnimatePresence>
        {showLevelUpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-[32px] border text-center overflow-hidden bg-gradient-to-b from-[#0E1A3D] via-[#0B132B] to-[#060A18] border-blue-500/50 shadow-2xl shadow-blue-900/60 text-white"
            >
              {/* Radiating Background Glow Ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none animate-pulse" />

              {/* Celebration Icon Header */}
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#2563EB] to-[#10B981] p-1 shadow-xl shadow-blue-500/40 mb-3"
                >
                  <div className="w-full h-full rounded-[22px] bg-[#080E24] flex items-center justify-center text-4xl">
                    {activeMilestoneReward?.icon || '⚡'}
                  </div>
                </motion.div>

                {/* Level Up Banner Tag */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-md shadow-amber-500/30 mb-2"
                >
                  <PartyPopper className="w-3.5 h-3.5" />
                  <span>LEVEL UP!</span>
                </motion.div>

                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white"
                >
                  {lang === 'th' ? `ยินดีด้วย! คุณขึ้นสู่ Level ${celebrationLevel}` : `Level ${celebrationLevel} Unlocked!`}
                </motion.h3>

                <p className="text-sm font-semibold text-[#38BDF8] mt-0.5">
                  {lang === 'th' ? getLevelTitle(celebrationLevel).th : getLevelTitle(celebrationLevel).en}
                </p>

                {/* Milestone Details Card */}
                {activeMilestoneReward && (
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full my-4 p-4 rounded-2xl bg-white/5 border border-blue-500/30 text-left space-y-2 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">
                        {lang === 'th' ? 'ไมล์สโตนที่พิชิตได้:' : 'Milestone Achieved:'}
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{activeMilestoneReward.pct}% Milestone</span>
                      </span>
                    </div>

                    <div className="text-base font-bold text-white flex items-center gap-2">
                      <span>{activeMilestoneReward.icon}</span>
                      <span>{lang === 'th' ? activeMilestoneReward.titleTh : activeMilestoneReward.titleEn}</span>
                    </div>

                    {/* Rewards Granted Strip */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-around text-xs font-mono font-bold">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <Award className="w-4 h-4" />
                        <span>+{activeMilestoneReward.rewardXp} XP</span>
                      </div>
                      <div className="w-px h-4 bg-white/10" />
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Coins className="w-4 h-4" />
                        <span>+{activeMilestoneReward.rewardCoins} ECO Coins</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Progress Feedback */}
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-5">
                  {lang === 'th'
                    ? 'พฤติกรรมประหยัดพลังงานของคุณช่วยลดภาระค่าไฟ และสะสมความก้าวหน้าสู่การเป็นยอดผู้ใช้พลังงานอัจฉริยะ'
                    : 'Your verified energy actions reduced your dorm bill and earned you mastery XP.'}
                </p>

                {/* Claim Button */}
                <button
                  type="button"
                  onClick={() => setShowLevelUpModal(false)}
                  className="w-full py-3 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white shadow-xl shadow-blue-600/40 border border-blue-400/40 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === 'th' ? 'รับรางวัลและลุยต่อ 🚀' : 'Claim Rewards & Continue 🚀'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
