import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TreeEvolutionStage, 
  TreeEcosystemSeason, 
  TreeEcosystemMood, 
  KnowledgeBranchProgress, 
  HabitBranchProgress, 
  TreeMemoryMilestone, 
  EcosystemCreature, 
  EcosystemObject,
  WorldExpansionRegion 
} from '../../types';
import { 
  INITIAL_KNOWLEDGE_BRANCHES, 
  INITIAL_HABIT_BRANCHES, 
  INITIAL_TREE_MEMORIES, 
  INITIAL_ECOSYSTEM_CREATURES, 
  INITIAL_ECOSYSTEM_OBJECTS,
  WORLD_EXPANSION_REGIONS 
} from '../../data/energyTreeData';
import { 
  Sparkles, 
  Trophy, 
  Flame, 
  Sun, 
  CloudRain, 
  Snowflake, 
  Flower2, 
  Zap, 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  Power, 
  Bot, 
  Receipt, 
  Tv, 
  Wallet, 
  Thermometer, 
  Award, 
  MapPin, 
  Info, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  Lock, 
  Droplets, 
  Wind, 
  RotateCcw,
  HeartHandshake,
  Layers,
  Search,
  Sparkle,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnergyTreeEcosystemProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  savingScore?: number;
  userStreak?: number;
  monthlyBudget?: number;
  currentBillEstimate?: number;
  onNavigateToLesson?: () => void;
  onNavigateToMissions?: () => void;
}

export const EnergyTreeEcosystem: React.FC<EnergyTreeEcosystemProps> = ({
  lang,
  isDarkMode,
  savingScore = 84,
  userStreak = 14,
  monthlyBudget = 2500,
  currentBillEstimate = 1950,
  onNavigateToLesson,
  onNavigateToMissions
}) => {
  // State variables
  const [treePowerXp, setTreePowerXp] = useState<number>(1250); // Level Ancient Tree
  const [currentSeason, setCurrentSeason] = useState<TreeEcosystemSeason>('spring');
  const [activeTab, setActiveTab] = useState<'evolution' | 'branches' | 'creatures' | 'memories' | 'world_map'>('evolution');
  
  // Data State
  const [knowledgeBranches] = useState<KnowledgeBranchProgress[]>(INITIAL_KNOWLEDGE_BRANCHES);
  const [habitBranches] = useState<HabitBranchProgress[]>(INITIAL_HABIT_BRANCHES);
  const [treeMemories] = useState<TreeMemoryMilestone[]>(INITIAL_TREE_MEMORIES);
  const [creatures] = useState<EcosystemCreature[]>(INITIAL_ECOSYSTEM_CREATURES);
  const [ecosystemObjects] = useState<EcosystemObject[]>(INITIAL_ECOSYSTEM_OBJECTS);

  // Inspector Modal State
  const [selectedInspectObject, setSelectedInspectObject] = useState<EcosystemObject | null>(null);
  const [selectedCreatureModal, setSelectedCreatureModal] = useState<EcosystemCreature | null>(null);
  const [selectedMemoryModal, setSelectedMemoryModal] = useState<TreeMemoryMilestone | null>(null);

  // Compute Mood
  const isOverBudget = currentBillEstimate > monthlyBudget;
  const mood: TreeEcosystemMood = isOverBudget 
    ? 'over_budget' 
    : savingScore >= 80 
      ? 'healthy' 
      : 'balanced';

  // Compute Evolution Stage
  const getEvolutionStage = (xp: number): {
    stage: TreeEvolutionStage;
    nameTh: string;
    nameEn: string;
    icon: string;
    minXp: number;
    maxXp: number;
    perksTh: string[];
  } => {
    if (xp < 100) return {
      stage: 'seed',
      nameTh: 'เมล็ดพันธุ์แห่งชีวิต (Seed)',
      nameEn: 'Life Seed',
      icon: '🌰',
      minXp: 0,
      maxXp: 100,
      perksTh: ['เริ่มต้นการเดินทางออมไฟ', 'ปลดล็อกภารกิจประจำวัน']
    };
    if (xp < 300) return {
      stage: 'sprout',
      nameTh: 'ต้นอ่อนแรกแย้ม (Sprout)',
      nameEn: 'Green Sprout',
      icon: '🌱',
      minXp: 100,
      maxXp: 300,
      perksTh: ['แตกใบอ่อนใบแรก', 'ปลดล็อกสัตว์เลี้ยง กระรอกน้อย']
    };
    if (xp < 600) return {
      stage: 'young_tree',
      nameTh: 'ต้นไม้วัยดรุณ (Young Tree)',
      nameEn: 'Young Tree',
      icon: '🌿',
      minXp: 300,
      maxXp: 600,
      perksTh: ['เกิดกิ่งก้านการเรียนรู้', 'ปลดล็อกระหัดวอเตอร์วีลพลังน้ำ']
    };
    if (xp < 1000) return {
      stage: 'healthy_tree',
      nameTh: 'ต้นไม้พลังงานสมบูรณ์ (Healthy Tree)',
      nameEn: 'Healthy Energy Tree',
      icon: '🌳',
      minXp: 600,
      maxXp: 1000,
      perksTh: ['เกิดดอกไม้อเมทิสต์ออมไฟ', 'ปลดล็อกแผงโซลาร์เซลล์บนหลังคา']
    };
    if (xp < 1600) return {
      stage: 'ancient_tree',
      nameTh: 'พฤกษาโบราณผู้พิทักษ์ (Ancient Guardian)',
      nameEn: 'Ancient Guardian Tree',
      icon: '🌴',
      minXp: 1000,
      maxXp: 1600,
      perksTh: ['นกฮูกผู้รอบรู้มาตั้งรัง', 'ออร่าประกายดาวลอยรอบต้นไม้', 'ปลดล็อกโซน Whispering Forest']
    };
    return {
      stage: 'legendary_tree',
      nameTh: 'พฤกษาสวรรค์แห่งโลกพลังงาน (Legendary World Tree)',
      nameEn: 'Legendary World Tree',
      icon: '🎄✨',
      minXp: 1600,
      maxXp: 3000,
      perksTh: ['รังสีพลังงานสะอาดปกคลุมทั้งเมือง', 'ปลดล็อก Smart Green City', 'คูณ 2x Coin ในมินิเกม']
    };
  };

  const currentStageInfo = getEvolutionStage(treePowerXp);
  const stageProgressPct = Math.min(100, Math.round(((treePowerXp - currentStageInfo.minXp) / (currentStageInfo.maxXp - currentStageInfo.minXp)) * 100));

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  const handleWaterTree = () => {
    setTreePowerXp(prev => prev + 25);
    triggerConfetti();
  };

  const getBranchIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Receipt': return <Receipt className="w-4 h-4 text-purple-500" />;
      case 'Tv': return <Tv className="w-4 h-4 text-cyan-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'Sun': return <Sun className="w-4 h-4 text-orange-500" />;
      case 'Power': return <Power className="w-4 h-4 text-teal-500" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-blue-500" />;
      case 'Bot': return <Bot className="w-4 h-4 text-indigo-500" />;
      default: return <BookOpen className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER & ECOSYSTEM STATUS BANNER */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border relative overflow-hidden transition-all shadow-xl ${
        isDarkMode 
          ? 'bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border-emerald-500/30 text-white' 
          : 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-100/60 border-emerald-200 text-slate-900 shadow-emerald-500/5'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-emerald-300 flex items-center justify-center text-4xl md:text-5xl shadow-2xl shadow-emerald-500/30 shrink-0 animate-bounce">
              {currentStageInfo.icon}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-extrabold text-xs border border-emerald-500/30">
                  Level 8 • {currentStageInfo.nameTh}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  mood === 'healthy' 
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                    : mood === 'balanced'
                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300'
                      : 'bg-rose-500/20 text-rose-600 dark:text-rose-300'
                }`}>
                  {mood === 'healthy' && '✨ นิเวศสดชื่นเปล่งประกาย (Radiant)'}
                  {mood === 'balanced' && '☀️ นิเวศสมดุลอบอุ่น (Balanced)'}
                  {mood === 'over_budget' && '☁️ นิเวศต้องการความใส่ใจ (Care Needed)'}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black font-display">
                {lang === 'th' ? 'ต้นไม้พลังงานและระบบนิเวศชีวิต' : 'Energy Tree Living Ecosystem'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg">
                {lang === 'th' 
                  ? 'เติบโตขึ้นตามการเรียนรู้ การออมไฟจริง และวินัยประจำวันของคุณ เติมปุ๋ยความรู้เพื่อขยายอาณาจักรเขียว!'
                  : 'Grows based on your real savings, learning, and streak consistency! Feed knowledge fertilizer to expand!'}
              </p>
            </div>
          </div>

          {/* Tree Power XP Bar & Water Tree Button */}
          <div className="w-full md:w-auto space-y-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-emerald-500/20 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Tree Power: {treePowerXp} / {currentStageInfo.maxXp} XP
                </span>
                <span className="font-mono">{stageProgressPct}%</span>
              </div>
              <div className="w-full md:w-56 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 rounded-full transition-all duration-500"
                  style={{ width: `${stageProgressPct}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleWaterTree}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Droplets className="w-4 h-4 text-cyan-200 animate-bounce" />
                <span>{lang === 'th' ? 'รดน้ำรดความรู้ (+25 XP)' : 'Water Tree (+25 XP)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Seasonal Selector bar */}
        <div className="mt-6 pt-5 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
            <Compass className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'th' ? 'ปรับเปลี่ยนฤดูกาลของนิเวศ (Season):' : 'Ecosystem Season:'}</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
            {[
              { id: 'spring', th: '🌸 ฤดูใบไม้ผลิ (Spring)', en: 'Spring', icon: Flower2 },
              { id: 'summer', th: '☀️ ฤดูร้อน (Summer)', en: 'Summer', icon: Sun },
              { id: 'rainy', th: '🌧️ ฤดูฝน (Rainy)', en: 'Rainy', icon: CloudRain },
              { id: 'winter', th: '❄️ ฤดูหนาว (Winter)', en: 'Winter', icon: Snowflake },
            ].map((s) => {
              const IconComponent = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSeason(s.id as TreeEcosystemSeason)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    currentSeason === s.id
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : isDarkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{lang === 'th' ? s.th : s.en}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. LIVING ENERGY WORLD VISUAL CANVAS SCENE */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border relative overflow-hidden transition-all shadow-xl min-h-[420px] flex flex-col justify-between ${
        currentSeason === 'spring'
          ? isDarkMode ? 'bg-gradient-to-b from-slate-900 via-emerald-950/60 to-slate-950 border-emerald-500/30' : 'bg-gradient-to-b from-sky-100 via-emerald-50/80 to-teal-100/60 border-emerald-200'
          : currentSeason === 'summer'
            ? isDarkMode ? 'bg-gradient-to-b from-slate-900 via-amber-950/60 to-slate-950 border-amber-500/30' : 'bg-gradient-to-b from-amber-100 via-amber-50 to-emerald-100/60 border-amber-200'
            : currentSeason === 'rainy'
              ? isDarkMode ? 'bg-gradient-to-b from-slate-900 via-teal-950/80 to-slate-950 border-cyan-500/30' : 'bg-gradient-to-b from-slate-200 via-sky-100 to-teal-100 border-cyan-200'
              : isDarkMode ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 border-slate-700' : 'bg-gradient-to-b from-sky-50 via-slate-100 to-emerald-50 border-slate-200'
      }`}>
        {/* Sky / Seasonal Effect Particles Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          {currentSeason === 'spring' && (
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] animate-pulse" />
          )}
          {currentSeason === 'summer' && (
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl animate-pulse" />
          )}
          {currentSeason === 'rainy' && (
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] [background-size:100%_12px] opacity-25" />
          )}
          {currentSeason === 'winter' && (
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
          )}
        </div>

        {/* Top Interactive Weather & Creature Tip Notification */}
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-emerald-500/20 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {lang === 'th' 
                ? 'คลิกสิ่งต่างๆ ในฉากเพื่อเรียนรู้เคล็ดลับ & ปลดล็อกอัปเกรด!' 
                : 'Click objects & creatures in the scene to inspect details!'}
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs flex items-center gap-1.5 border border-emerald-500/30">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Saving Score: {savingScore}/100</span>
          </div>
        </div>

        {/* CENTER LIVING SCENE SVG / OBJECT LAYOUT */}
        <div className="relative my-8 z-10 flex flex-wrap items-end justify-center gap-4 md:gap-8">
          
          {/* 1. Eco House & Solar Rooftop */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            onClick={() => setSelectedInspectObject(ecosystemObjects.find(o => o.id === 'obj_eco_house') || ecosystemObjects[0])}
            className="p-3 md:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 shadow-lg cursor-pointer flex flex-col items-center gap-1 group hover:border-emerald-400 transition-all"
          >
            <span className="text-3xl md:text-4xl group-hover:animate-bounce">🏠</span>
            <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
              Zero Carbon House
            </span>
          </motion.div>

          {/* 2. Smart Solar Rooftop Panel */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            onClick={() => setSelectedInspectObject(ecosystemObjects.find(o => o.id === 'obj_solar_rooftop') || ecosystemObjects[1])}
            className="p-3 md:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-amber-500/30 shadow-lg cursor-pointer flex flex-col items-center gap-1 group hover:border-amber-400 transition-all"
          >
            <span className="text-3xl md:text-4xl group-hover:animate-pulse">☀️</span>
            <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300">
              Smart Solar PV
            </span>
          </motion.div>

          {/* 3. MAIN TREE CORE (BIGGEST EMOTIONAL CENTER) */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            onClick={() => setSelectedInspectObject(ecosystemObjects.find(o => o.id === 'obj_tree_core') || ecosystemObjects[0])}
            className="p-6 md:p-8 rounded-[3rem] bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-emerald-400/20 backdrop-blur-md border-2 border-emerald-400/50 shadow-2xl shadow-emerald-500/20 cursor-pointer flex flex-col items-center gap-2 group relative transition-all"
          >
            {/* Pulsing Tree Crown Aura */}
            <div className="absolute -inset-2 rounded-[3.5rem] bg-emerald-400/20 blur-xl animate-pulse pointer-events-none" />

            {/* Tree Emoji */}
            <div className="text-6xl md:text-7xl group-hover:scale-110 transition-transform relative z-10">
              {currentStageInfo.icon}
            </div>

            {/* Tree Title Badge */}
            <div className="relative z-10 text-center space-y-0.5">
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 block">
                {currentStageInfo.nameTh}
              </span>
              <span className="text-[0.65rem] font-bold text-slate-500 dark:text-slate-400 block font-mono">
                Power: {treePowerXp} XP
              </span>
            </div>

            {/* Floating Creature nearby Tree */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCreatureModal(creatures[0]);
              }}
              className="absolute -top-3 -right-3 p-2 rounded-2xl bg-amber-400/90 hover:bg-amber-300 text-slate-900 shadow-lg text-lg animate-bounce cursor-pointer"
              title="Click Watt Squirrel!"
            >
              🐿️
            </div>
          </motion.div>

          {/* 4. Wind Turbine */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            onClick={() => setSelectedInspectObject(ecosystemObjects.find(o => o.id === 'obj_wind_turbine') || ecosystemObjects[2])}
            className="p-3 md:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 shadow-lg cursor-pointer flex flex-col items-center gap-1 group hover:border-cyan-400 transition-all"
          >
            <span className="text-3xl md:text-4xl group-hover:spin-slow">🌀</span>
            <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300">
              Wind Turbine
            </span>
          </motion.div>

          {/* 5. ESP32 IoT Pylon */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            onClick={() => setSelectedInspectObject(ecosystemObjects.find(o => o.id === 'obj_esp32_pylon') || ecosystemObjects[4])}
            className="p-3 md:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-indigo-500/30 shadow-lg cursor-pointer flex flex-col items-center gap-1 group hover:border-indigo-400 transition-all"
          >
            <span className="text-3xl md:text-4xl group-hover:animate-pulse">📡</span>
            <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-300">
              ESP32 Node
            </span>
          </motion.div>

          {/* 6. Hydro Water Wheel & River */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            onClick={() => setSelectedInspectObject(ecosystemObjects.find(o => o.id === 'obj_river_wheel') || ecosystemObjects[3])}
            className="p-3 md:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-blue-500/30 shadow-lg cursor-pointer flex flex-col items-center gap-1 group hover:border-blue-400 transition-all"
          >
            <span className="text-3xl md:text-4xl group-hover:animate-spin">🌊</span>
            <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-300">
              Hydro Wheel
            </span>
          </motion.div>

        </div>

        {/* BOTTOM CREATURE TIP STRIP */}
        <div className="pt-4 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              {lang === 'th' ? 'สัตว์พิทักษ์นิเวศวันนี้:' : 'Unlocked Ecosystem Creatures:'}
            </span>
            <div className="flex items-center gap-1.5">
              {creatures.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCreatureModal(c)}
                  className="w-8 h-8 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-500/20 flex items-center justify-center text-sm hover:scale-110 transition-transform cursor-pointer shadow-sm"
                  title={c.nameTh}
                >
                  {c.icon}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSelectedInspectObject(ecosystemObjects[0])}
            className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{lang === 'th' ? 'ตรวจสอบสถิตินิเวศเพิ่มเติม →' : 'Inspect Ecosystem Stats →'}</span>
          </button>
        </div>
      </div>

      {/* 3. NAVIGATION TAB CONTROL BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'evolution', th: '🌳 วิวัฒนาการ & อารมณ์ (Evolution)', en: 'Evolution' },
          { id: 'branches', th: '🌿 กิ่งก้านความรู้ 8 ด้าน (Branches)', en: 'Branches' },
          { id: 'creatures', th: '🐾 สัตว์พิทักษ์ & เคล็ดลับ (Creatures)', en: 'Creatures' },
          { id: 'memories', th: '📜 บันทึกความทรงจำ (Memories)', en: 'Memories' },
          { id: 'world_map', th: '🗺️ แผนที่ขยายอาณาจักร (World Map)', en: 'World Map' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : isDarkMode
                  ? 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {lang === 'th' ? tab.th : tab.en}
          </button>
        ))}
      </div>

      {/* 4. TAB CONTENT PANELS */}

      {/* TAB 1: EVOLUTION & MOOD STAGES */}
      {activeTab === 'evolution' && (
        <div className="space-y-6">
          {/* Mood Guidance Card */}
          <div className={`p-6 rounded-[2.2rem] border transition-all ${
            isOverBudget
              ? isDarkMode ? 'bg-rose-950/40 border-rose-500/40 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-900'
              : isDarkMode ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-500 flex items-center justify-center text-white text-2xl shadow-lg shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-base">
                  {lang === 'th' ? 'สภาวะอารมณ์ของระบบนิเวศ (Ecosystem Mood)' : 'Ecosystem Mood Engine'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isOverBudget
                    ? (lang === 'th' 
                        ? '☁️ สภาพอากาศในนิเวศมีเมฆครึ้มเล็กน้อยเนื่องจากยอดไฟใกล้เกินงบ Voltie AI แนะนำให้ปิดแอร์เร็วขึ้น 1 ชั่วโมง เพื่อดึงแสงสดใสกลับคืนมา!' 
                        : '☁️ Cloudier skies due to electricity bill approaching budget limit. Voltie AI suggests turning off AC 1hr earlier!')
                    : (lang === 'th'
                        ? '✨ ท้องฟ้าแจ่มใส สายน้ำไหลบริสุทธิ์! เนื่องจากคุณควบคุมงบประมาณและรักษาวินัยประหยัดไฟได้อย่างดีเยี่ยม!'
                        : '✨ Radiant sunny sky & clean flowing river! Great job maintaining your energy habits!')}
                </p>
              </div>
            </div>
          </div>

          {/* 6 Evolution Stages Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { stage: 'seed', nameTh: '1. เมล็ดพันธุ์ชีวิต (Seed)', xp: '0 - 100 XP', icon: '🌰', unlocked: treePowerXp >= 0 },
              { stage: 'sprout', nameTh: '2. ต้นอ่อนแรกแย้ม (Sprout)', xp: '100 - 300 XP', icon: '🌱', unlocked: treePowerXp >= 100 },
              { stage: 'young_tree', nameTh: '3. ต้นไม้วัยดรุณ (Young Tree)', xp: '300 - 600 XP', icon: '🌿', unlocked: treePowerXp >= 300 },
              { stage: 'healthy_tree', nameTh: '4. ต้นไม้สมบูรณ์ (Healthy Tree)', xp: '600 - 1,000 XP', icon: '🌳', unlocked: treePowerXp >= 600 },
              { stage: 'ancient_tree', nameTh: '5. พฤกษาโบราณ (Ancient)', xp: '1,000 - 1,600 XP', icon: '🌴', unlocked: treePowerXp >= 1000 },
              { stage: 'legendary_tree', nameTh: '6. พฤกษาสวรรค์ (Legendary)', xp: '1,600+ XP', icon: '🎄✨', unlocked: treePowerXp >= 1600 },
            ].map(item => (
              <div
                key={item.stage}
                className={`p-5 rounded-[2rem] border transition-all flex items-center gap-4 ${
                  item.unlocked
                    ? isDarkMode ? 'bg-slate-900/80 border-emerald-500/40' : 'bg-white border-emerald-200 shadow-sm'
                    : isDarkMode ? 'bg-slate-900/30 border-slate-800 opacity-50' : 'bg-slate-50 border-slate-200 opacity-50'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-2xl shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs md:text-sm text-slate-900 dark:text-white flex items-center gap-1">
                    <span>{item.nameTh}</span>
                    {item.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                  </h4>
                  <span className="text-[0.65rem] font-mono text-slate-500 block">
                    {item.xp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: KNOWLEDGE BRANCHES (8 CATEGORIES) */}
      {activeTab === 'branches' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {knowledgeBranches.map(branch => (
            <div
              key={branch.id}
              className={`p-5 rounded-[2rem] border space-y-3 transition-all ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/15">
                    {getBranchIcon(branch.icon)}
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {lang === 'th' ? branch.branchNameTh : branch.branchNameEn}
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {branch.completedLessons}/{branch.totalLessons} Lessons
                </span>
              </div>

              {/* Branch Health Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[0.65rem] font-bold text-slate-500">
                  <span>Branch Vitality</span>
                  <span>{branch.healthPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    style={{ width: `${branch.healthPercent}%` }}
                  />
                </div>
              </div>

              <p className="text-[0.7rem] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ผลกระทบในนิเวศ: {branch.unlockedEffectTh}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ECOSYSTEM CREATURES GALLERY */}
      {activeTab === 'creatures' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {creatures.map(c => (
            <div
              key={c.id}
              onClick={() => setSelectedCreatureModal(c)}
              className={`p-5 rounded-[2.2rem] border transition-all cursor-pointer space-y-3 hover:scale-[1.02] active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40' : 'bg-white border-slate-100 hover:border-emerald-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 flex items-center justify-center text-3xl shadow-sm shrink-0">
                  {c.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {lang === 'th' ? c.nameTh : c.nameEn}
                  </h4>
                  <span className="text-[0.65rem] text-emerald-600 dark:text-emerald-400 font-bold block">
                    🔓 {c.unlockedByTh}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed font-medium">
                {c.tipTh}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: MEMORY JOURNAL MILESTONES */}
      {activeTab === 'memories' && (
        <div className="space-y-4">
          {treeMemories.map(m => (
            <div
              key={m.id}
              onClick={() => setSelectedMemoryModal(m)}
              className={`p-5 md:p-6 rounded-[2.2rem] border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-amber-400/60 ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-2xl shadow-md shrink-0">
                  {m.photoSymbol}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 font-mono">
                      {m.dateTh}
                    </span>
                    {m.savingAmountThb && (
                      <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                        Saved ฿{m.savingAmountThb}
                      </span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white">
                    {lang === 'th' ? m.titleTh : m.titleEn}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {lang === 'th' ? m.descriptionTh : m.descriptionEn}
                  </p>
                </div>
              </div>

              <button className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                {lang === 'th' ? 'เปิดดูบันทึก 📜' : 'View Memory 📜'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: WORLD EXPANSION MAP */}
      {activeTab === 'world_map' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORLD_EXPANSION_REGIONS.map(region => (
            <div
              key={region.id}
              className={`p-6 rounded-[2.2rem] border transition-all space-y-3 ${
                region.unlocked
                  ? isDarkMode ? 'bg-slate-900/80 border-emerald-500/40' : 'bg-white border-emerald-200 shadow-sm'
                  : isDarkMode ? 'bg-slate-900/30 border-slate-800 opacity-60' : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{region.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {lang === 'th' ? region.nameTh : region.nameEn}
                    </h4>
                    <span className="text-[0.65rem] font-bold text-slate-500 block">
                      Required Level {region.levelRequired}+
                    </span>
                  </div>
                </div>

                {region.unlocked ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-extrabold text-xs">
                    ปลดล็อกแล้ว ✓
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 font-extrabold text-xs flex items-center gap-1">
                    <Lock className="w-3 h-3" /> ล็อก
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {region.descriptionTh}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 5. ECOSYSTEM OBJECT INSPECTOR MODAL */}
      <AnimatePresence>
        {selectedInspectObject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`p-6 md:p-8 rounded-[2.5rem] border max-w-lg w-full shadow-2xl relative space-y-5 ${
                isDarkMode ? 'bg-slate-900 border-emerald-500/40 text-white' : 'bg-white border-emerald-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setSelectedInspectObject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-400 flex items-center justify-center text-4xl shadow-lg shrink-0">
                  {selectedInspectObject.icon}
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-extrabold text-[0.7rem] uppercase">
                    {selectedInspectObject.category}
                  </span>
                  <h3 className="text-lg font-black font-display">
                    {lang === 'th' ? selectedInspectObject.nameTh : selectedInspectObject.nameEn}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                    📖 ที่มา & เงื่อนไขการปลดล็อก:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">
                    {selectedInspectObject.unlockedByTh}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    💡 เคล็ดลับวิศวกรรมไฟฟ้าประจำวัตถุ:
                  </span>
                  <p className="text-slate-700 dark:text-slate-200">
                    {selectedInspectObject.educationalTipTh}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    🚀 การอัปเกรดขั้นถัดไป:
                  </span>
                  <p className="text-slate-700 dark:text-slate-200">
                    {selectedInspectObject.nextUpgradeTh}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedInspectObject(null)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                {lang === 'th' ? 'เข้าใจแล้ว ✓' : 'Understood ✓'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. CREATURE MODAL */}
      <AnimatePresence>
        {selectedCreatureModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`p-6 md:p-8 rounded-[2.5rem] border max-w-md w-full shadow-2xl relative text-center space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-amber-500/40 text-white' : 'bg-white border-amber-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setSelectedCreatureModal(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/20 flex items-center justify-center text-5xl shadow-xl animate-bounce">
                {selectedCreatureModal.icon}
              </div>

              <div>
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 font-extrabold text-xs uppercase">
                  Ecosystem Guardian
                </span>
                <h3 className="text-xl font-black font-display pt-1">
                  {lang === 'th' ? selectedCreatureModal.nameTh : selectedCreatureModal.nameEn}
                </h3>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-200 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 leading-relaxed font-medium">
                {selectedCreatureModal.tipTh}
              </p>

              <button
                onClick={() => setSelectedCreatureModal(null)}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                {lang === 'th' ? 'ขอบคุณสำหรับเคล็ดลับ! 🐾' : 'Thanks for the tip! 🐾'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. MEMORY MODAL */}
      <AnimatePresence>
        {selectedMemoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`p-6 md:p-8 rounded-[2.5rem] border max-w-md w-full shadow-2xl relative text-center space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-amber-500/40 text-white' : 'bg-white border-amber-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setSelectedMemoryModal(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-5xl shadow-xl">
                {selectedMemoryModal.photoSymbol}
              </div>

              <div>
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-mono text-xs font-bold">
                  {selectedMemoryModal.dateTh}
                </span>
                <h3 className="text-lg font-black font-display pt-1">
                  {lang === 'th' ? selectedMemoryModal.titleTh : selectedMemoryModal.titleEn}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed font-medium">
                {selectedMemoryModal.descriptionTh}
              </p>

              <button
                onClick={() => setSelectedMemoryModal(null)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                {lang === 'th' ? 'ปิดบันทึก' : 'Close Memory'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
