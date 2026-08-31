import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Trophy, 
  Timer, 
  CheckCircle2, 
  BrainCircuit, 
  Award,
  Zap,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { VISUAL_MNEMONICS, VisualMnemonic } from '../../../data/retroGamificationData';

export type MemoryDifficulty = 'beginner' | 'intermediate' | 'advanced';

interface MemoryCard {
  cardId: string;
  mnemonicId: string;
  type: 'habit' | 'impact';
  titleTh: string;
  titleEn: string;
  detailTh: string;
  detailEn: string;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryMatchGameProps {
  lang: 'th' | 'en';
  isDarkMode?: boolean;
  onEarnCoins?: (amount: number) => void;
  onAddXp?: (amount: number) => void;
}

export const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({
  lang,
  isDarkMode = true,
  onEarnCoins,
  onAddXp
}) => {
  const [difficulty, setDifficulty] = useState<MemoryDifficulty>('intermediate');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [activeMnemonicExplanation, setActiveMnemonicExplanation] = useState<VisualMnemonic | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const getTargetPairCount = (diff: MemoryDifficulty) => {
    switch (diff) {
      case 'beginner': return 4;
      case 'intermediate': return 6;
      case 'advanced': return 8;
    }
  };

  const getDifficultyRewards = (diff: MemoryDifficulty) => {
    switch (diff) {
      case 'beginner': return { coins: 40, xp: 80 };
      case 'intermediate': return { coins: 60, xp: 120 };
      case 'advanced': return { coins: 100, xp: 200 };
    }
  };

  // Initialize deck based on difficulty
  const initializeDeck = (diff: MemoryDifficulty = difficulty) => {
    const pairCount = getTargetPairCount(diff);
    const deck: MemoryCard[] = [];
    
    // Choose mnemonics fitting the difficulty
    let pool = [...VISUAL_MNEMONICS];
    if (diff === 'beginner') {
      const beg = pool.filter(m => m.difficulty === 'beginner');
      pool = beg.length >= pairCount ? beg.slice(0, pairCount) : pool.slice(0, pairCount);
    } else if (diff === 'intermediate') {
      const inter = pool.filter(m => m.difficulty === 'beginner' || m.difficulty === 'intermediate');
      pool = inter.slice(0, pairCount);
    } else {
      // advanced uses all 8 available mnemonics
      pool = pool.slice(0, pairCount);
    }

    pool.forEach((m) => {
      // Habit card
      deck.push({
        cardId: `${m.id}-habit`,
        mnemonicId: m.id,
        type: 'habit',
        titleTh: m.titleTh,
        titleEn: m.titleEn,
        detailTh: m.ruleTh,
        detailEn: m.ruleEn,
        icon: m.iconName,
        isFlipped: false,
        isMatched: false
      });

      // Impact/Mnemonic card
      deck.push({
        cardId: `${m.id}-impact`,
        mnemonicId: m.id,
        type: 'impact',
        titleTh: lang === 'th' ? 'สูตรภาพจำ' : 'Memory Mnemonic',
        titleEn: 'Memory Mnemonic',
        detailTh: m.mnemonicKeyTh,
        detailEn: m.mnemonicKeyEn,
        icon: 'Sparkles',
        isFlipped: false,
        isMatched: false
      });
    });

    // Fisher-Yates Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedCardIds([]);
    setMoves(0);
    setMatchedCount(0);
    setIsGameCompleted(false);
    setActiveMnemonicExplanation(null);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
  };

  const handleDifficultyChange = (diff: MemoryDifficulty) => {
    setDifficulty(diff);
    initializeDeck(diff);
  };

  useEffect(() => {
    initializeDeck(difficulty);
  }, []);

  // Timer tick
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && !isGameCompleted) {
      timer = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, isGameCompleted]);

  // Handle Card Click
  const handleCardClick = (card: MemoryCard) => {
    if (card.isFlipped || card.isMatched || flippedCardIds.length >= 2) {
      return;
    }

    const newFlipped = [...flippedCardIds, card.cardId];
    setFlippedCardIds(newFlipped);

    // Update card flip state
    setCards(prev => prev.map(c => c.cardId === card.cardId ? { ...c, isFlipped: true } : c));

    // When 2 cards are flipped
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const card1 = cards.find(c => c.cardId === newFlipped[0]);
      const card2 = card;

      if (card1 && card2 && card1.mnemonicId === card2.mnemonicId) {
        // MATCH!
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.cardId === card1.cardId || c.cardId === card2.cardId)
              ? { ...c, isMatched: true, isFlipped: true }
              : c
          ));
          setFlippedCardIds([]);
          setMatchedCount(prev => {
            const nextCount = prev + 1;
            const targetCount = getTargetPairCount(difficulty);
            if (nextCount === targetCount) {
              setIsGameCompleted(true);
              setIsTimerRunning(false);
              const rewards = getDifficultyRewards(difficulty);
              onEarnCoins?.(rewards.coins);
              onAddXp?.(rewards.xp);
            }
            return nextCount;
          });

          // Show teaching explanation for this matched mnemonic
          const m = VISUAL_MNEMONICS.find(item => item.id === card1.mnemonicId);
          if (m) {
            setActiveMnemonicExplanation(m);
            onEarnCoins?.(10);
            onAddXp?.(20);
          }
        }, 500);
      } else {
        // NO MATCH -> Flip back after delay
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.cardId === newFlipped[0] || c.cardId === newFlipped[1])
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCardIds([]);
        }, 1100);
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const targetPairs = getTargetPairCount(difficulty);

  return (
    <div className="space-y-6">
      {/* Knowledge Level Selector */}
      <div className={`p-4 rounded-3xl border flex items-center justify-between flex-wrap gap-3 ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-200">
            {lang === 'th' ? 'ระดับความยากการจับคู่:' : 'Memory Match Difficulty:'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDifficultyChange('beginner')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              difficulty === 'beginner'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                : isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200'
            }`}
          >
            🟢 {lang === 'th' ? 'เริ่มต้น (4 คู่)' : 'Beginner (4 Pairs)'}
          </button>
          <button
            onClick={() => handleDifficultyChange('intermediate')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              difficulty === 'intermediate'
                ? 'bg-amber-600 border-amber-400 text-white shadow-md'
                : isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200'
            }`}
          >
            🟡 {lang === 'th' ? 'ปานกลาง (6 คู่)' : 'Medium (6 Pairs)'}
          </button>
          <button
            onClick={() => handleDifficultyChange('advanced')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              difficulty === 'advanced'
                ? 'bg-rose-600 border-rose-400 text-white shadow-md'
                : isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200'
            }`}
          >
            🔴 {lang === 'th' ? 'วิศวกร (8 คู่)' : 'Hard (8 Pairs)'}
          </button>
        </div>
      </div>

      {/* Game Header & Stats Bar */}
      <div className={`p-4 sm:p-5 rounded-3xl border flex flex-wrap items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black font-display tracking-tight flex items-center gap-2">
              <span>{lang === 'th' ? 'เกมจับคู่ภาพจำพลังงาน (Retro Memory Match)' : 'Energy Mnemonic Memory Match'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'th' ? 'จับคู่นิสัยประหยัดไฟกับสูตรภาพจำทางวิทยาศาสตร์ เพื่อฝึกการจำ' : 'Match energy habits with their scientific visual mnemonic rules'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
            <Timer className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-200">{formatTime(elapsedSeconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
            <span className="text-slate-400">{lang === 'th' ? 'เปิดแล้ว:' : 'Moves:'}</span>
            <span className="font-bold text-purple-400">{moves}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-emerald-400">{matchedCount} / {targetPairs}</span>
          </div>

          <button
            onClick={() => initializeDeck(difficulty)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={lang === 'th' ? 'เริ่มใหม่' : 'Restart'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className={`grid gap-3 sm:gap-4 ${
        targetPairs === 4 ? 'grid-cols-2 sm:grid-cols-4' : targetPairs === 6 ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'grid-cols-2 sm:grid-cols-4'
      }`}>
        {cards.map((card) => {
          const isMatched = card.isMatched;
          const isFlipped = card.isFlipped;

          return (
            <div
              key={card.cardId}
              onClick={() => handleCardClick(card)}
              className={`h-36 sm:h-44 rounded-3xl p-3.5 border transition-all duration-300 flex flex-col justify-between select-none cursor-pointer relative overflow-hidden ${
                isMatched
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                  : isFlipped
                    ? isDarkMode 
                      ? 'bg-slate-800 border-purple-500/60 shadow-xl shadow-purple-500/10 scale-[1.02]' 
                      : 'bg-white border-purple-400 shadow-md'
                    : isDarkMode
                      ? 'bg-slate-900 hover:bg-slate-850 border-slate-800 hover:border-slate-700 hover:scale-[1.01]'
                      : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200'
              }`}
            >
              {isFlipped ? (
                /* Card Front (Revealed) */
                <div className="h-full flex flex-col justify-between animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase ${
                      card.type === 'habit'
                        ? 'bg-sky-500/20 text-sky-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {card.type === 'habit' ? (lang === 'th' ? '📋 พฤติกรรม' : 'Habit') : (lang === 'th' ? '💡 ภาพจำ' : 'Mnemonic')}
                    </span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>

                  <div className="my-auto text-center space-y-1">
                    <p className="font-extrabold text-xs sm:text-sm font-display leading-tight text-slate-100">
                      {lang === 'th' ? card.titleTh : card.titleEn}
                    </p>
                    <p className="text-[11px] text-slate-300 font-medium line-clamp-3 leading-snug">
                      {lang === 'th' ? card.detailTh : card.detailEn}
                    </p>
                  </div>

                  <div className="text-[10px] text-center text-slate-500 font-mono">
                    {isMatched ? (lang === 'th' ? '✓ จับคู่สำเร็จ' : '✓ Matched') : ''}
                  </div>
                </div>
              ) : (
                /* Card Back (Hidden) */
                <div className="h-full flex flex-col items-center justify-center space-y-2 text-slate-600 dark:text-slate-500">
                  <div className="w-10 h-10 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-amber-400 shadow-inner">
                    <Sparkles className="w-5 h-5 opacity-70" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase opacity-60">
                    {lang === 'th' ? 'แตะเพื่อเปิด' : 'TAP TO FLIP'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Explanatory popup card for recently matched mnemonic */}
      {activeMnemonicExplanation && (
        <div className={`p-5 rounded-3xl border animate-fadeIn transition-all ${
          isDarkMode ? 'bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border-indigo-500/40 text-slate-200' : 'bg-indigo-50 border-indigo-200 text-slate-800'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
                  {lang === 'th' ? '✨ จับคู่ถูกต้อง! หลักการทางวิทยาศาสตร์:' : '✨ Correct Pair! Science Note:'}
                </span>
                <span className="text-xs font-bold text-indigo-400 font-display">
                  {lang === 'th' ? activeMnemonicExplanation.titleTh : activeMnemonicExplanation.titleEn}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {lang === 'th' ? activeMnemonicExplanation.scienceExplanationTh : activeMnemonicExplanation.scienceExplanationEn}
              </p>
            </div>
            <button
              onClick={() => setActiveMnemonicExplanation(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800 cursor-pointer shrink-0"
            >
              ✕ {lang === 'th' ? 'ปิด' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* Completion Modal Box */}
      {isGameCompleted && (
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-900/40 via-slate-900 to-slate-900 border border-purple-500/50 text-center space-y-4 animate-fadeIn shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-purple-500 text-white flex items-center justify-center mx-auto text-3xl shadow-xl shadow-purple-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-black font-display text-white">
            {lang === 'th' ? '🎉 ยินดีด้วย! จับคู่ภาพจำครบถ้วน!' : '🎉 Memory Match Conquered!'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {lang === 'th'
              ? `คุณใช้เวลาไป ${formatTime(elapsedSeconds)} และพลิกการ์ดไปทั้งหมด ${moves} ครั้ง ในระดับ ${difficulty === 'beginner' ? 'เริ่มต้น' : difficulty === 'intermediate' ? 'ปานกลาง' : 'วิศวกร'}`
              : `Completed in ${formatTime(elapsedSeconds)} with ${moves} moves on ${difficulty} tier!`}
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => initializeDeck(difficulty)}
              className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              {lang === 'th' ? 'เล่นใหม่อีกรอบ' : 'Play Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

