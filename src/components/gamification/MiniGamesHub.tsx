import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Flame, 
  Trophy, 
  Coins, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowUp, 
  ArrowDown, 
  Power, 
  DollarSign, 
  Clock,
  HelpCircle,
  Zap,
  Filter,
  BarChart2,
  BookOpen,
  FlaskConical,
  Search,
  Shield,
  Receipt,
  Sun,
  Award,
  ChevronRight,
  History,
  AlertTriangle
} from 'lucide-react';
import { Appliance, MiniGameMeta, GameHistoryRecord, MiniGameCategory } from '../../types';
import { 
  MINI_GAME_LIST, 
  WEEKLY_SPECIAL_EVENT, 
  INITIAL_GAME_HISTORY, 
  DAILY_60S_QUIZ_POOL,
  BILL_BUILDER_ITEMS,
  DORM_STORY_SCENARIOS
} from '../../data/miniGamesData';

interface MiniGamesHubProps {
  appliances: Appliance[];
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onRewardCoins?: (coins: number, xp: number) => void;
}

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  appliances,
  lang,
  isDarkMode,
  onRewardCoins
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MiniGameCategory | 'all'>('all');
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameHistoryRecord[]>(INITIAL_GAME_HISTORY);

  // GAME 1: Power Battle State
  const [battleIndex, setBattleIndex] = useState(0);
  const [battleScore, setBattleScore] = useState(0);
  const [battleGameOver, setBattleGameOver] = useState(false);
  const [battleResultText, setBattleResultText] = useState<string | null>(null);

  const battlePairs = [
    { a: { name: 'ไดร์เป่าผม (Hairdryer)', watt: 1600, icon: '💨' }, b: { name: 'แอร์ Inverter (Air Conditioner)', watt: 1200, icon: '❄️' } },
    { a: { name: 'พัดลมตั้งโต๊ะ (Desk Fan)', watt: 45, icon: '🌀' }, b: { name: 'กล่อง Android TV', watt: 12, icon: '📺' } },
    { a: { name: 'เครื่องทำน้ำอุ่น (Water Heater)', watt: 3500, icon: '🔥' }, b: { name: 'เตาไมโครเวฟ (Microwave)', watt: 1100, icon: '🍲' } },
    { a: { name: 'ตู้เย็น Inverter (Fridge)', watt: 140, icon: '🧊' }, b: { name: 'คอมพิวเตอร์เกมมิ่ง (Gaming PC)', watt: 450, icon: '🖥️' } },
    { a: { name: 'เตารีดผ้า (Electric Iron)', watt: 2000, icon: '👔' }, b: { name: 'หม้อหุงข้าว (Rice Cooker)', watt: 650, icon: '🍚' } }
  ];

  const currentPair = battlePairs[battleIndex % battlePairs.length];

  const handleBattleGuess = (guessHigher: boolean) => {
    const isHigher = currentPair.b.watt > currentPair.a.watt;
    if (guessHigher === isHigher) {
      const newScore = battleScore + 1;
      setBattleScore(newScore);
      setBattleResultText(lang === 'th' ? 'ถูกต้อง! +20 XP, +10 Coins' : 'Correct! +20 XP, +10 Coins');
      if (onRewardCoins) onRewardCoins(10, 20);
      setTimeout(() => {
        setBattleResultText(null);
        setBattleIndex(prev => prev + 1);
      }, 1000);
    } else {
      setBattleGameOver(true);
      setBattleResultText(lang === 'th' 
        ? `ผิดแล้ว! ${currentPair.b.name} ใช้ไฟ ${currentPair.b.watt}W (เทียบกับ ${currentPair.a.watt}W)` 
        : `Incorrect! ${currentPair.b.name} uses ${currentPair.b.watt}W (vs ${currentPair.a.watt}W)`);
    }
  };

  const resetBattle = () => {
    setBattleIndex(0);
    setBattleScore(0);
    setBattleGameOver(false);
    setBattleResultText(null);
  };

  // GAME 2: Standby Vampire Buster State
  const [vampireItems, setVampireItems] = useState([
    { id: 1, nameTh: 'กล่องทีวีแฝงไฟ', nameEn: 'TV Box Standby', watt: 12, tapped: false, x: '20%', y: '30%' },
    { id: 2, nameTh: 'ปลั๊กพ่วงไมโครเวฟ', nameEn: 'Microwave Strip', watt: 8, tapped: false, x: '70%', y: '25%' },
    { id: 3, nameTh: 'อแดปเตอร์โน้ตบุ๊ก', nameEn: 'Laptop Charger', watt: 15, tapped: false, x: '45%', y: '65%' },
    { id: 4, nameTh: 'ลำโพงบลูทูธเสียบค้าง', nameEn: 'Bluetooth Speaker', watt: 6, tapped: false, x: '80%', y: '70%' }
  ]);
  const [vampireCleared, setVampireCleared] = useState(false);

  const handleTapVampire = (id: number) => {
    const updated = vampireItems.map(item => item.id === id ? { ...item, tapped: true } : item);
    setVampireItems(updated);
    if (updated.every(item => item.tapped)) {
      setVampireCleared(true);
      if (onRewardCoins) onRewardCoins(25, 60);
    }
  };

  const resetVampire = () => {
    setVampireItems(vampireItems.map(item => ({ ...item, tapped: false })));
    setVampireCleared(false);
  };

  // GAME 3: Interactive Bill Builder State
  const [builderHours, setBuilderHours] = useState<{ [key: string]: number }>({
    ac: 8, fridge: 24, tv: 4, pc: 6, fan: 10, heater: 0.5
  });
  const [guessedBill, setGuessedBill] = useState<number>(1200);
  const [showBillResult, setShowBillResult] = useState(false);

  // Calculate actual bill from builder selection
  const totalDailyKwh = BILL_BUILDER_ITEMS.reduce((sum, item) => {
    const hours = builderHours[item.id] || 0;
    return sum + (item.watt * hours) / 1000;
  }, 0);
  const monthlyKwh = totalDailyKwh * 30;
  const baseRate = 4.2; // THB / unit
  const ftRate = 0.39; // THB / unit
  const baseCost = monthlyKwh * (baseRate + ftRate) + 38; // 38 THB service fee
  const calculatedBill = Math.round(baseCost * 1.07); // 7% VAT

  const handleCalculateBill = () => {
    setShowBillResult(true);
    const diff = Math.abs(calculatedBill - guessedBill);
    if (diff <= 150) {
      if (onRewardCoins) onRewardCoins(40, 100);
    } else {
      if (onRewardCoins) onRewardCoins(15, 40);
    }
  };

  // GAME 4: AI Detective / Prediction Challenge
  const [aiGuessInput, setAiGuessInput] = useState<number>(2500);
  const [aiShowResult, setAiShowResult] = useState(false);
  const aiActualValue = 2850; // THB actual bill

  // GAME 5: Story Scenario (Dorm Survival)
  const [storyStep, setStoryStep] = useState(0);
  const [storySelectedChoice, setStorySelectedChoice] = useState<number | null>(null);
  const currentScenario = DORM_STORY_SCENARIOS[storyStep % DORM_STORY_SCENARIOS.length];

  // GAME 6: AC Temp Mini Lab State
  const [labTemp, setLabTemp] = useState(25);
  const [labFan, setLabFan] = useState(true);
  const labBaseCost = 1300; // THB/month at 24°C
  const labSavingPercent = (labTemp - 24) * 8.5 + (labFan ? 5 : 0);
  const labMonthlyCost = Math.max(400, Math.round(labBaseCost * (1 - labSavingPercent / 100)));
  const labCo2Saving = Math.max(0, Math.round((labBaseCost - labMonthlyCost) * 0.4));

  // GAME 7: Virtual House Inspector
  const [inspectorLeaks, setInspectorLeaks] = useState([
    { id: 1, nameTh: 'ฟิลเตอร์แอร์มีฝุ่นหนา', found: false, detailTh: 'ฝุ่นเกาะแน่นทำให้แอร์กินไฟเพิ่ม 15% ต้องล้างทุก 3-6 เดือน' },
    { id: 2, nameTh: 'ประตูกระจกมีช่องแสงแดดส่อง', found: false, detailTh: 'แสงแดดช่วงบ่ายทำให้อุณหภูมิห้องสูงขึ้น 3°C ควรติดม่านกัน UV' },
    { id: 3, nameTh: 'ปลั๊กทีวีมีไฟ Standby สีแดง', found: false, detailTh: 'ปิดด้วยรีโมทโดยไม่ถอดปลั๊ก กินไฟรั่วซึม 12 วัตต์ตลอดคืน' },
    { id: 4, nameTh: 'ตู้เย็นตั้งชิดผนังเกินไป', found: false, detailTh: 'ตู้เย็นระบายความร้อนไม่ได้ ต้องเว้นระยะอย่างน้อย 15 ซม.' }
  ]);

  const handleInspectLeak = (id: number) => {
    const updated = inspectorLeaks.map(item => item.id === id ? { ...item, found: true } : item);
    setInspectorLeaks(updated);
    if (updated.every(i => i.found) && onRewardCoins) {
      onRewardCoins(30, 80);
    }
  };

  // GAME 8: Boss Challenge
  const [bossStage, setBossStage] = useState(1);
  const [bossAcTemp, setBossAcTemp] = useState(24);
  const [bossShiftTou, setBossShiftTou] = useState(false);
  const [bossCutStandby, setBossCutStandby] = useState(false);
  const bossInitialBill = 4500;
  const bossAcSaving = (bossAcTemp - 24) * 180;
  const bossTouSaving = bossShiftTou ? 550 : 0;
  const bossStandbySaving = bossCutStandby ? 220 : 0;
  const bossTotalSaving = bossAcSaving + bossTouSaving + bossStandbySaving;
  const bossFinalBill = bossInitialBill - bossTotalSaving;
  const bossSavingPct = Math.round((bossTotalSaving / bossInitialBill) * 100);

  // GAME 9: Daily 60s Speed Run
  const [dailyIndex, setDailyIndex] = useState(0);
  const [dailyScore, setDailyScore] = useState(0);
  const [dailyTimer, setDailyTimer] = useState(60);
  const [dailyActive, setDailyActive] = useState(false);
  const [dailyFinished, setDailyFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (dailyActive && dailyTimer > 0 && !dailyFinished) {
      interval = setInterval(() => {
        setDailyTimer(prev => prev - 1);
      }, 1000);
    } else if (dailyTimer === 0 && dailyActive) {
      setDailyFinished(true);
      setDailyActive(false);
    }
    return () => clearInterval(interval);
  }, [dailyActive, dailyTimer, dailyFinished]);

  const startDailyRun = () => {
    setDailyIndex(0);
    setDailyScore(0);
    setDailyTimer(60);
    setDailyActive(true);
    setDailyFinished(false);
  };

  const handleDailyAnswer = (correctIndex: number, selectedIndex: number) => {
    if (selectedIndex === correctIndex) {
      setDailyScore(prev => prev + 1);
    }
    if (dailyIndex + 1 < DAILY_60S_QUIZ_POOL.length) {
      setDailyIndex(prev => prev + 1);
    } else {
      setDailyFinished(true);
      setDailyActive(false);
      if (onRewardCoins) onRewardCoins(35, 70);
    }
  };

  // Filter games by category
  const filteredGames = MINI_GAME_LIST.filter(game => {
    if (selectedCategory === 'all') return true;
    return game.category === selectedCategory;
  });

  const categories: { id: MiniGameCategory | 'all'; labelTh: string; labelEn: string; icon: any }[] = [
    { id: 'all', labelTh: 'ทั้งหมด', labelEn: 'All Games', icon: Gamepad2 },
    { id: 'basics', labelTh: 'พื้นฐานไฟฟ้า', labelEn: 'Basics', icon: Zap },
    { id: 'appliances', labelTh: 'เครื่องใช้ไฟฟ้า', labelEn: 'Appliances', icon: Power },
    { id: 'bills', labelTh: 'ค่าไฟ & บิล', labelEn: 'Bills', icon: Receipt },
    { id: 'ai_challenges', labelTh: 'AI คำนวน', labelEn: 'AI Challenges', icon: Sparkles },
    { id: 'budget', labelTh: 'งบประมาณ', labelEn: 'Budget Strategy', icon: DollarSign },
    { id: 'safety', labelTh: 'ความปลอดภัย', labelEn: 'Safety', icon: Shield },
    { id: 'smarthome', labelTh: 'บ้านอัจฉริยะ', labelEn: 'Smart Home', icon: FlaskConical },
    { id: 'time_attack', labelTh: 'จับเวลา 60วิ', labelEn: 'Time Attack', icon: Clock },
    { id: 'daily', labelTh: 'ชาเลนจ์ประจำวัน', labelEn: 'Daily Boss', icon: Trophy }
  ];

  const currentGameMeta = MINI_GAME_LIST.find(g => g.id === activeGameId);

  return (
    <div className="space-y-6">
      {/* 1. WEEKLY SPECIAL EVENT BANNER */}
      {WEEKLY_SPECIAL_EVENT.active && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-[2.5rem] border shadow-xl relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
                <Sun className="w-8 h-8 text-amber-200 animate-spin" style={{ animationDuration: '12s' }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md font-extrabold text-[0.7rem] uppercase tracking-wider border border-white/30">
                    🔥 WEEKLY EVENT
                  </span>
                  <span className="text-xs font-bold text-amber-100 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> เหลือเวลา {WEEKLY_SPECIAL_EVENT.endsInDays} วัน
                  </span>
                </div>
                <h2 className="text-xl font-black font-display tracking-tight">
                  {WEEKLY_SPECIAL_EVENT.titleTh}
                </h2>
                <p className="text-xs text-amber-100 font-medium mt-0.5 max-w-xl">
                  {WEEKLY_SPECIAL_EVENT.subtitleTh}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-center">
                <div className="text-[0.65rem] uppercase tracking-wider text-amber-100 font-bold">XP Bonus</div>
                <div className="text-lg font-black font-mono">2.0x XP</div>
              </div>
              <button
                onClick={() => setActiveGameId('game_mini_lab')}
                className="px-5 py-3 rounded-2xl bg-white text-orange-600 hover:bg-amber-50 font-black text-xs shadow-lg shadow-black/10 transition-transform active:scale-95 flex items-center gap-1.5"
              >
                <span>เข้าร่วมมินิเกม</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. MAIN MINI-GAMES HUB HEADER & FILTERS */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-xl relative overflow-hidden transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/80 border-purple-100 text-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 ring-4 ring-purple-400/20">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black font-display">
                  {lang === 'th' ? 'ศูนย์มินิเกมความรู้พลังงาน (Mini-Game Center)' : 'Educational Mini-Games Hub'}
                </h2>
                <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold text-xs">
                  9 เกมพร้อมเล่น
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {lang === 'th' 
                  ? 'เรียนรู้เรื่องไฟฟ้าอย่างสนุก วัดความเข้าใจ ปรับพฤติกรรมจริง และรับเหรียญรางวัลสะสม' 
                  : 'Play interactive educational games to measure understanding and save real electricity.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowHistoryModal(true)}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
              isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:border-purple-300 shadow-sm'
            }`}
          >
            <History className="w-4 h-4 text-purple-500" />
            <span>{lang === 'th' ? 'ประวัติ & การเรียนรู้' : 'Game History'}</span>
          </button>
        </div>

        {/* Category Tabs Scroll View */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                    : isDarkMode
                      ? 'bg-slate-800 text-slate-400 hover:text-white'
                      : 'bg-white/80 border border-slate-200 text-slate-600 hover:border-purple-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? cat.labelTh : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE PLAYABLE GAME INTERFACE OR GAMES GRID */}
      {activeGameId ? (
        <div className="space-y-4">
          <button
            onClick={() => setActiveGameId(null)}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{lang === 'th' ? '← กลับไปหน้าศูนย์มินิเกม' : '← Back to Mini-Game Center'}</span>
          </button>

          {/* PLAYABLE GAME MODE CONTAINERS */}
          <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-xl relative overflow-hidden ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-100'
          }`}>
            {/* Active Game Header */}
            {currentGameMeta && (
              <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">
                      {currentGameMeta.titleTh}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      🎯 วัตถุประสงค์: {currentGameMeta.learningObjectiveTh}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 font-bold text-xs flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" /> +{currentGameMeta.coinReward} Coins
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold text-xs">
                    +{currentGameMeta.xpReward} XP
                  </span>
                </div>
              </div>
            )}

            {/* MODE 1: POWER BATTLE */}
            {activeGameId === 'game_battle' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-slate-500">
                    {lang === 'th' ? 'ทายว่าเครื่องใช้ไฟฟ้าตัวขวา ใช้ไฟ (วัตต์) สูงกว่า หรือ ต่ำกว่า ตัวซ้าย?' : 'Is the appliance on the right HIGHER or LOWER in wattage?'}
                  </span>
                  <div className="flex items-center gap-2 font-mono font-bold text-xs text-amber-500">
                    <Trophy className="w-4 h-4" /> Score: {battleScore}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                    <div className="text-5xl mb-2">{currentPair.a.icon}</div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{currentPair.a.name}</h3>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-extrabold text-base">
                      {currentPair.a.watt} Watts
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-purple-500/10 border-2 border-dashed border-purple-500/40 text-center space-y-3 relative">
                    <div className="text-5xl mb-2">{currentPair.b.icon}</div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{currentPair.b.name}</h3>

                    {!battleGameOver ? (
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          onClick={() => handleBattleGuess(true)}
                          className="flex-1 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1 transition-transform active:scale-95"
                        >
                          <ArrowUp className="w-4 h-4" /> HIGHER (สูงกว่า)
                        </button>
                        <button
                          onClick={() => handleBattleGuess(false)}
                          className="flex-1 py-3 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 flex items-center justify-center gap-1 transition-transform active:scale-95"
                        >
                          <ArrowDown className="w-4 h-4" /> LOWER (ต่ำกว่า)
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500 text-white font-mono font-extrabold text-base">
                          {currentPair.b.watt} Watts
                        </div>
                        <button
                          onClick={resetBattle}
                          className="w-full py-2.5 px-4 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4" /> เล่นใหม่อีกครั้ง (Try Again)
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {battleResultText && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3.5 rounded-2xl text-center text-xs font-extrabold ${
                      battleGameOver ? 'bg-rose-500/15 text-rose-600' : 'bg-emerald-500/15 text-emerald-600'
                    }`}
                  >
                    {battleResultText}
                  </motion.div>
                )}
              </div>
            )}

            {/* MODE 2: STANDBY VAMPIRE BUSTER */}
            {activeGameId === 'game_vampire' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {lang === 'th' ? 'แตะกำจัดอุปกรณ์ไฟสแตนด์บายที่แอบดึงกระแสไฟในห้องให้ครบทุกจุด!' : 'Tap all hidden standby vampire loads in the room to cut phantom draw!'}
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-500">
                    {vampireItems.filter(i => i.tapped).length} / {vampireItems.length}
                  </span>
                </div>

                <div className="w-full h-64 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 relative border border-slate-800 overflow-hidden">
                  {vampireItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => !item.tapped && handleTapVampire(item.id)}
                      style={{ left: item.x, top: item.y }}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl transition-all ${
                        item.tapped
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 scale-90'
                          : 'bg-rose-500/80 border-2 border-rose-400 text-white shadow-lg shadow-rose-500/50 animate-bounce cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <Power className="w-4 h-4" />
                        <span>{lang === 'th' ? item.nameTh : item.nameEn}</span>
                      </div>
                      {item.tapped && (
                        <span className="text-[0.65rem] text-emerald-400 font-mono block">Cut {item.watt}W ✓</span>
                      )}
                    </button>
                  ))}

                  {vampireCleared && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 space-y-3">
                      <Sparkles className="w-12 h-12 text-amber-400 animate-pulse" />
                      <h3 className="text-lg font-extrabold text-white">
                        {lang === 'th' ? 'กำจัดไฟสแตนด์บายสำเร็จแล้ว! 🎉' : 'Zero Standby Power Achieved! 🎉'}
                      </h3>
                      <p className="text-xs text-slate-300">
                        {lang === 'th' ? 'คุณได้รับ +25 Coins และ +60 XP' : 'You earned +25 Coins & +60 XP'}
                      </p>
                      <button
                        onClick={resetVampire}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs"
                      >
                        {lang === 'th' ? 'เล่นใหม่อีกครั้ง' : 'Play Again'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MODE 3: BILL BUILDER */}
            {activeGameId === 'game_bill_builder' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-700 dark:text-purple-300">
                  💡 ปรับจำนวนชั่วโมงการใช้งานของอุปกรณ์แต่ละชนิด แล้วทายว่ายอดบิลค่าไฟประจำเดือนสอดคล้องกับตัวเลขใด
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BILL_BUILDER_ITEMS.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-800 dark:text-white flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span>{item.nameTh} ({item.watt}W)</span>
                        </span>
                        <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                          {builderHours[item.id]} ชม./วัน
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={24}
                        step={0.5}
                        value={builderHours[item.id] || 0}
                        onChange={(e) => setBuilderHours({ ...builderHours, [item.id]: Number(e.target.value) })}
                        className="w-full accent-purple-600 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4 text-center">
                  <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">
                    คาดการณ์ยอดบิลค่าไฟประจำเดือนของคุณ (THB):
                  </h4>
                  <div className="flex items-center justify-center gap-3">
                    <input
                      type="number"
                      value={guessedBill}
                      onChange={(e) => setGuessedBill(Number(e.target.value))}
                      className="w-40 px-4 py-2 rounded-2xl border text-center font-mono font-black text-xl text-purple-600 dark:text-purple-400 bg-white dark:bg-slate-900 border-purple-300"
                    />
                    <button
                      onClick={handleCalculateBill}
                      className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 transition-all cursor-pointer"
                    >
                      เฉลยผลการคำนวณบิล
                    </button>
                  </div>

                  {showBillResult && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs space-y-2 text-left font-medium">
                      <div className="font-bold text-sm">
                        📊 คำนวณจริงได้: ฿{calculatedBill} บาท (ใช้วันละ {totalDailyKwh.toFixed(2)} kWh)
                      </div>
                      <p>
                        • สูตรการคิด: (หน่วย kWh รวม × (อัตราก้าวหน้า ฿4.2 + ค่า Ft ฿0.39)) + ค่าบริการ ฿38 + VAT 7%
                      </p>
                      <div className="text-[0.7rem] text-slate-500">
                        ส่วนต่างคำทายของคุณ: {Math.abs(calculatedBill - guessedBill)} บาท {Math.abs(calculatedBill - guessedBill) <= 150 ? '🎯 แม่นยำมาก! +40 Coins' : 'ลองปรับแก้ตัวเลขเพื่อฝึกความแม่นยำ'}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* MODE 4: AI DETECTIVE / PREDICTION */}
            {activeGameId === 'game_ai_detective' && (
              <div className="space-y-6">
                <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="font-extrabold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    โจทย์: พยากรณ์ค่าไฟเดือนสิงหาคมที่มีอุณหภูมิเฉลี่ย 36°C
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    บ้านที่มีแอร์ 2 ตัว และตู้เย็น 1 ตู้ ทำงานในสภาพอากาศร้อนจัด Voltie AI คำนวณไว้แล้ว ลองทายตัวเลขว่าตรงกับ AI มากแค่ไหน!
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="number"
                      value={aiGuessInput}
                      onChange={(e) => setAiGuessInput(Number(e.target.value))}
                      className="w-48 px-4 py-2.5 rounded-2xl border text-center font-mono font-black text-lg bg-white dark:bg-slate-900 border-purple-300"
                    />
                    <button
                      onClick={() => setAiShowResult(true)}
                      className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20"
                    >
                      ตรวจผลกับ AI
                    </button>
                  </div>

                  {aiShowResult && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs space-y-2 font-medium">
                      <div className="font-extrabold text-sm text-purple-700 dark:text-purple-300">
                        🤖 AI Voltie วิเคราะห์คำนวณได้: ฿{aiActualValue} บาท
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        สาเหตุที่ค่าไฟพุ่งทะลุ ฿2,800 เกิดจากอุณหภูมิภายนอกสูง 36°C ทำให้แอร์คอมเพรสเซอร์ทำงานถี่ขึ้น 35% แม้จะตั้งองศาเท่าเดิม!
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* MODE 5: STORY SCENARIO (DORM SURVIVAL) */}
            {activeGameId === 'game_story_dorm' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
                  <div className="font-extrabold text-sm text-purple-600 dark:text-purple-400">
                    {currentScenario.situationTh}
                  </div>

                  <div className="space-y-3">
                    {currentScenario.choices.map((choice, idx) => {
                      const isSelected = storySelectedChoice === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setStorySelectedChoice(idx);
                            if (choice.correct && onRewardCoins) onRewardCoins(30, 70);
                          }}
                          className={`w-full p-4 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? choice.correct 
                                ? 'bg-emerald-500 text-white border-emerald-600' 
                                : 'bg-rose-500 text-white border-rose-600'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span>{choice.textTh}</span>
                            <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-white/20 font-mono">
                              ค่าใช้จ่าย: ~฿{choice.costImpactThb}
                            </span>
                          </div>

                          {isSelected && (
                            <div className="mt-2 pt-2 border-t border-white/20 text-[0.7rem] font-normal leading-relaxed">
                              💡 {choice.feedbackTh}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* MODE 6: MINI LAB (AC TEMP EXPERIMENT) */}
            {activeGameId === 'game_mini_lab' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-sky-500/10 border border-sky-500/20 space-y-4">
                  <h4 className="font-extrabold text-sm text-sky-700 dark:text-sky-300 flex items-center gap-2">
                    <FlaskConical className="w-5 h-5" />
                    ห้องทดลองจำลองอุณหภูมิแอร์ (AC Temp Experiment)
                  </h4>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span>ตั้งอุณหภูมิแอร์: <span className="text-sky-600 dark:text-sky-400 font-extrabold font-mono text-base">{labTemp}°C</span></span>
                      <span>เปิดพัดลมช่วยกระจายลม:</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={20}
                        max={28}
                        value={labTemp}
                        onChange={(e) => setLabTemp(Number(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                      <button
                        onClick={() => setLabFan(!labFan)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                          labFan ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}
                      >
                        {labFan ? 'เปิดทำงาน ✓' : 'ปิด'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="text-[0.65rem] text-slate-400 font-bold uppercase">ค่าไฟแอร์รายเดือน</div>
                      <div className="text-lg font-black font-mono text-slate-800 dark:text-white">฿{labMonthlyCost}</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="text-[0.65rem] text-slate-400 font-bold uppercase">ประหยัดเงินขึ้น</div>
                      <div className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">+{labSavingPercent.toFixed(0)}%</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="text-[0.65rem] text-slate-400 font-bold uppercase">ลด CO₂ สะสม</div>
                      <div className="text-lg font-black font-mono text-sky-600 dark:text-sky-400">{labCo2Saving} kg/ปี</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 7: DETECTIVE HOUSE INSPECTOR */}
            {activeGameId === 'game_detective_house' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between text-xs font-bold">
                  <span>ค้นหาจุดเสี่ยงสิ้นเปลืองพลังงานในบ้านให้ครบ 4 จุด:</span>
                  <span className="text-purple-500 font-mono">{inspectorLeaks.filter(i => i.found).length} / {inspectorLeaks.length}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inspectorLeaks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleInspectLeak(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        item.found 
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs mb-1">
                        <CheckCircle2 className={`w-4 h-4 ${item.found ? 'text-emerald-500' : 'text-slate-400'}`} />
                        <span>{item.nameTh}</span>
                      </div>
                      {item.found && (
                        <p className="text-[0.7rem] text-slate-600 dark:text-slate-300 font-normal leading-relaxed pl-6">
                          💡 {item.detailTh}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MODE 8: BOSS CHALLENGE */}
            {activeGameId === 'game_boss_challenge' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white space-y-4 border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
                      👑 BOSS CHALLENGE
                    </span>
                    <span className="font-mono font-bold text-xs text-amber-300">เป้าหมาย: ลดค่าไฟ {'>'} 20%</span>
                  </div>

                  <h3 className="text-lg font-black font-display">
                    กู้ภัยบิลค่าไฟครอบครัว จาก ฿4,500 เหลือไม่เกิน ฿3,600
                  </h3>

                  <div className="space-y-3 pt-2 text-xs font-bold">
                    <div className="flex justify-between">
                      <span>1. ปรับอุณหภูมิแอร์บ้าน:</span>
                      <span className="text-amber-300 font-mono">{bossAcTemp}°C</span>
                    </div>
                    <input
                      type="range"
                      min={22}
                      max={27}
                      value={bossAcTemp}
                      onChange={(e) => setBossAcTemp(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white/10">
                      <span>2. ย้ายเวลาซักผ้าไปช่วง Off-Peak (TOU Tariff):</span>
                      <button
                        onClick={() => setBossShiftTou(!bossShiftTou)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${bossShiftTou ? 'bg-emerald-500 text-white' : 'bg-white/20'}`}
                      >
                        {bossShiftTou ? 'ย้ายแล้ว ✓' : 'ไม่ย้าย'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white/10">
                      <span>3. ถอดปลั๊กตัดไฟ Standby Power ทั้งบ้าน:</span>
                      <button
                        onClick={() => setBossCutStandby(!bossCutStandby)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${bossCutStandby ? 'bg-emerald-500 text-white' : 'bg-white/20'}`}
                      >
                        {bossCutStandby ? 'ถอดแล้ว ✓' : 'ไม่ถอด'}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-between">
                    <div>
                      <div className="text-[0.65rem] text-slate-300 uppercase font-bold">ยอดบิลหลังวางแผน</div>
                      <div className="text-2xl font-black font-mono text-amber-300">฿{bossFinalBill}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[0.65rem] text-slate-300 uppercase font-bold">ลดลงได้</div>
                      <div className={`text-xl font-black font-mono ${bossSavingPct >= 20 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {bossSavingPct}% {bossSavingPct >= 20 ? '🎉 สำเร็จ!' : '(ต้องลดให้ได้อย่างน้อย 20%)'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 9: DAILY 60S SPEED RUN */}
            {activeGameId === 'game_daily_60s' && (
              <div className="space-y-6">
                {!dailyActive && !dailyFinished ? (
                  <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 text-center space-y-4 border border-slate-200 dark:border-slate-700">
                    <Clock className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto animate-bounce" />
                    <h3 className="text-xl font-black font-display text-slate-900 dark:text-white">
                      พร้อมลุย ชาเลนจ์ 60 วินาที ประจำวัน?
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      ตอบคำถามไฟฟ้า 5 ข้ออย่างรวดเร็ว สะสมคะแนนและรักษาสตรีครายวันของคุณ!
                    </p>
                    <button
                      onClick={startDailyRun}
                      className="px-8 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 transition-transform active:scale-95 cursor-pointer"
                    >
                      🚀 เริ่มต้นทดสอบเวลานี้
                    </button>
                  </div>
                ) : dailyActive ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 font-bold text-xs">
                      <span>คำถามข้อที่ {dailyIndex + 1} / {DAILY_60S_QUIZ_POOL.length}</span>
                      <span className="font-mono font-black text-rose-500 text-base">⏱️ {dailyTimer}s</span>
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
                      <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">
                        {DAILY_60S_QUIZ_POOL[dailyIndex].questionTh}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {DAILY_60S_QUIZ_POOL[dailyIndex].optionsTh.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDailyAnswer(DAILY_60S_QUIZ_POOL[dailyIndex].correctIndex, idx)}
                            className="p-3.5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-purple-500 text-left text-xs font-bold transition-all cursor-pointer"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                    <Trophy className="w-12 h-12 text-amber-500 mx-auto animate-pulse" />
                    <h3 className="text-xl font-black text-emerald-800 dark:text-emerald-300">
                      ชาเลนจ์เสร็จสิ้น! ทำได้ {dailyScore} / {DAILY_60S_QUIZ_POOL.length} คะแนน
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      คุณได้รับ +35 Coins และ +70 XP
                    </p>
                    <button
                      onClick={startDailyRun}
                      className="px-6 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-md"
                    >
                      เล่นใหม่อีกครั้ง
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 4. GAMES GRID VIEW WITH CARDS AND METADATA */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGames.map((game) => {
            const Icon = game.icon === 'Zap' ? Zap 
              : game.icon === 'Power' ? Power 
              : game.icon === 'Receipt' ? Receipt 
              : game.icon === 'Sparkles' ? Sparkles 
              : game.icon === 'BookOpen' ? BookOpen 
              : game.icon === 'FlaskConical' ? FlaskConical 
              : game.icon === 'Search' ? Search 
              : game.icon === 'Trophy' ? Trophy 
              : Clock;

            return (
              <div
                key={game.id}
                className={`p-6 rounded-[2.5rem] border transition-all shadow-md hover:shadow-xl relative flex flex-col justify-between ${
                  isDarkMode 
                    ? 'bg-slate-900/90 border-slate-800 hover:border-purple-500/50' 
                    : 'bg-white border-slate-100 hover:border-purple-300'
                }`}
              >
                <div>
                  {/* Card Header & Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[0.65rem] uppercase ${
                        game.difficulty === 'Easy' 
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : game.difficulty === 'Medium'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                      }`}>
                        {game.difficulty}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-[0.65rem] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {game.estimatedMinutes}m
                      </span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white mb-1">
                    {lang === 'th' ? game.titleTh : game.titleEn}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4 line-clamp-2">
                    {lang === 'th' ? game.descTh : game.descEn}
                  </p>

                  {/* Metadata Box: Objective & Rewards */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 space-y-2 mb-4">
                    <div className="text-[0.7rem] text-slate-600 dark:text-slate-300 font-bold flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <span className="truncate">{game.knowledgeGainedTh}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                      <span className="font-bold text-amber-500 flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5" /> +{game.coinReward} Coins
                      </span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        +{game.xpReward} XP
                      </span>
                    </div>
                  </div>

                  {/* Completion Rate Indicator */}
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-[0.65rem] font-bold text-slate-400">
                      <span>อัตราความสำเร็จผู้เล่น</span>
                      <span className="font-mono">{game.completionRate}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                        style={{ width: `${game.completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveGameId(game.id)}
                  className="w-full py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>{lang === 'th' ? 'เล่นมินิเกมนี้' : 'Play Game'}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. GAME HISTORY MODAL */}
      <AnimatePresence>
        {showHistoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-2xl p-6 md:p-8 rounded-[2.5rem] border shadow-2xl relative overflow-hidden ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-purple-100 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-4 mb-4 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <History className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-black font-display">
                    {lang === 'th' ? 'ประวัติการเล่นมินิเกม & ข้อเสนอแนะ' : 'Game History & AI Analysis'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {gameHistory.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between font-extrabold text-sm">
                      <span className="text-purple-600 dark:text-purple-400">{rec.gameTitleTh}</span>
                      <span className="font-mono text-xs text-slate-400">{rec.playedAt}</span>
                    </div>

                    <div className="text-slate-600 dark:text-slate-300 font-medium">
                      💡 ความรู้ที่ได้รับ: {rec.knowledgeGainedTh}
                    </div>

                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 font-semibold">
                      🤖 คำแนะนำจาก AI: {rec.recommendationTh}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
