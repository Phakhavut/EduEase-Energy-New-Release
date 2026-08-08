import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  EduVerseWorldStage, 
  EduVerseDistrictType, 
  EduVerseBuilding, 
  EnergySpirit, 
  EduVerseNPCQuest, 
  EduVerseSecretArea, 
  EduVerseFestival,
  TreeMemoryMilestone 
} from '../../types';
import { 
  EDUVERSE_WORLD_STAGES, 
  EDUVERSE_DISTRICTS, 
  INITIAL_EDUVERSE_BUILDINGS, 
  INITIAL_ENERGY_SPIRITS, 
  INITIAL_NPC_QUESTS, 
  INITIAL_SECRET_AREAS, 
  INITIAL_EDUVERSE_FESTIVALS 
} from '../../data/eduVerseData';
import { INITIAL_TREE_MEMORIES } from '../../data/energyTreeData';
import { 
  Globe, 
  Sparkles, 
  Trophy, 
  Sun, 
  CloudRain, 
  Zap, 
  Compass, 
  Building2, 
  UserCheck, 
  BookOpen, 
  Lock, 
  CheckCircle2, 
  X, 
  HelpCircle, 
  Award, 
  Layers, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Calendar, 
  Flame, 
  Bot, 
  Coins, 
  ChevronRight, 
  Radio, 
  Sparkle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EduVerseHubProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  userXp?: number;
  userCoins?: number;
  userStreak?: number;
  savingScore?: number;
  onNavigateToLesson?: () => void;
  onStartPageTour?: () => void;
}

export const EduVerseHub: React.FC<EduVerseHubProps> = ({
  lang,
  isDarkMode,
  userXp = 1450,
  userCoins = 680,
  userStreak = 14,
  savingScore = 88,
  onNavigateToLesson,
  onStartPageTour
}) => {
  // Main Navigation Tabs
  const [activeVerseTab, setActiveVerseTab] = useState<'world' | 'districts' | 'spirits' | 'npc_quests' | 'secrets' | 'festivals' | 'memories'>('world');

  // Interactive Filter States
  const [selectedDistrict, setSelectedDistrict] = useState<EduVerseDistrictType>('forest');
  const [selectedBuilding, setSelectedBuilding] = useState<EduVerseBuilding | null>(null);
  const [selectedSpirit, setSelectedSpirit] = useState<EnergySpirit | null>(null);
  
  // NPC Quests State
  const [npcQuests, setNpcQuests] = useState<EduVerseNPCQuest[]>(INITIAL_NPC_QUESTS);
  const [activeNpcQuest, setActiveNpcQuest] = useState<EduVerseNPCQuest | null>(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [questResult, setQuestResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  // Secret Area State
  const [secretAreas] = useState<EduVerseSecretArea[]>(INITIAL_SECRET_AREAS);
  const [selectedSecretArea, setSelectedSecretArea] = useState<EduVerseSecretArea | null>(null);

  // Weather & Time Simulation State
  const [weatherMode, setWeatherMode] = useState<'sunny' | 'rainy' | 'night'>('sunny');

  // Compute World Stage
  const currentWorldStageInfo = EDUVERSE_WORLD_STAGES.find(s => userXp >= s.minXp && userXp < s.maxXp) || EDUVERSE_WORLD_STAGES[3]; // Default Stage 4 / 5
  const nextStageTargetXp = currentWorldStageInfo.maxXp;
  const stageProgressPct = Math.min(100, Math.round(((userXp - currentWorldStageInfo.minXp) / (currentWorldStageInfo.maxXp - currentWorldStageInfo.minXp)) * 100));

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  const handleSolveNPCQuest = (quest: EduVerseNPCQuest) => {
    if (selectedAnswerIndex === null) return;
    const isCorrect = selectedAnswerIndex === quest.correctOptionIndex;
    
    if (isCorrect) {
      triggerConfetti();
      setNpcQuests(prev => prev.map(q => q.id === quest.id ? { ...q, completed: true } : q));
    }

    setQuestResult({
      isCorrect,
      explanation: quest.explanationTh
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. HERO WORLD BANNER - EDUVERSE MASTER HEADER */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border relative overflow-hidden transition-all shadow-xl ${
        weatherMode === 'sunny'
          ? isDarkMode 
            ? 'bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-emerald-500/30 text-white' 
            : 'bg-gradient-to-r from-emerald-100/80 via-teal-50 to-sky-100/80 border-emerald-200 text-slate-900'
          : weatherMode === 'rainy'
            ? isDarkMode 
              ? 'bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-900 border-cyan-500/30 text-white' 
              : 'bg-gradient-to-r from-slate-200 via-sky-100 to-teal-100 border-cyan-200 text-slate-900'
            : isDarkMode 
              ? 'bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 border-purple-500/30 text-white' 
              : 'bg-gradient-to-r from-indigo-100 via-purple-50 to-slate-100 border-purple-200 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-cyan-400 flex items-center justify-center text-4xl md:text-5xl shadow-2xl shadow-emerald-500/30 shrink-0 animate-pulse">
              {currentWorldStageInfo.icon}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-black text-xs border border-emerald-500/30">
                  🌐 EduVerse • {currentWorldStageInfo.nameTh}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 font-extrabold text-xs flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Streak: {userStreak} Days</span>
                </span>
              </div>

              <h2 className="text-xl md:text-3xl font-black font-display tracking-tight">
                {lang === 'th' ? 'EduVerse: โลกเสมือนพลังงานชีวิต' : 'EduVerse: Living Energy World'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg">
                {lang === 'th' 
                  ? 'สิ่งก่อสร้าง สัตว์เลี้ยง และสภาพแวดล้อมในโลกนี้ เติบโตจากความรู้ การประหยัดไฟจริง และพฤติกรรมของคุณ!'
                  : 'Every building, spirit, and landmark grows directly from your real-world electricity savings and learning!'}
              </p>
            </div>
          </div>

          {/* XP & Civilisation Stage Progress */}
          <div className="w-full md:w-auto space-y-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-emerald-500/20 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> World Power: {userXp} / {nextStageTargetXp} XP
                </span>
                <span className="font-mono">{stageProgressPct}%</span>
              </div>
              <div className="w-full md:w-56 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${stageProgressPct}%` }}
                />
              </div>
            </div>

            {/* Weather Mode Controls */}
            <div className="flex items-center gap-2">
              {[
                { mode: 'sunny', label: '☀️ Sunny', icon: Sun },
                { mode: 'rainy', label: '🌧️ Rainy', icon: CloudRain },
                { mode: 'night', label: '🌙 Night', icon: Sparkles },
              ].map(w => (
                <button
                  key={w.mode}
                  onClick={() => setWeatherMode(w.mode as any)}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    weatherMode === w.mode
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN EDUVERSE TABS NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'world', th: '🌍 โลกเสมือนชีวิต (Virtual World)', en: 'Virtual World' },
          { id: 'districts', th: '🏙️ 9 เขตเมือง (9 Districts)', en: '9 Districts' },
          { id: 'spirits', th: '⚡ ภูตพลังงาน (Energy Spirits)', en: 'Energy Spirits' },
          { id: 'npc_quests', th: '👥 ภารกิจชาวเมือง (NPC Quests)', en: 'NPC Quests' },
          { id: 'secrets', th: '🔮 พื้นที่ลึกลับ (Secret Areas)', en: 'Secret Areas' },
          { id: 'festivals', th: '🎉 เทศกาลพลังงาน (Festivals)', en: 'Festivals' },
          { id: 'memories', th: '📜 ความทรงจำโลก (Memories)', en: 'Memories' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveVerseTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
              activeVerseTab === tab.id
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

      {/* 3. TAB 1: INTERACTIVE VIRTUAL WORLD CANVAS SCENE */}
      {activeVerseTab === 'world' && (
        <div className="space-y-6">
          {/* District Category Filter Strip inside Scene */}
          <div className="p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-emerald-500/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs font-bold text-slate-500 shrink-0 px-2">
              {lang === 'th' ? 'เลือกเขตเมือง:' : 'Select District:'}
            </span>
            {EDUVERSE_DISTRICTS.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDistrict(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  selectedDistrict === d.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{d.icon}</span>
                <span>{d.nameTh.split(' ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Living World Interactive Canvas Visual Scene */}
          <div className={`p-8 rounded-[2.5rem] border relative overflow-hidden transition-all shadow-2xl min-h-[440px] flex flex-col justify-between ${
            weatherMode === 'sunny'
              ? isDarkMode ? 'bg-gradient-to-b from-slate-950 via-emerald-950/80 to-slate-950 border-emerald-500/30' : 'bg-gradient-to-b from-sky-100 via-emerald-50 to-teal-100 border-emerald-200'
              : weatherMode === 'rainy'
                ? isDarkMode ? 'bg-gradient-to-b from-slate-950 via-cyan-950 to-slate-900 border-cyan-500/30' : 'bg-gradient-to-b from-slate-200 via-sky-100 to-teal-100 border-cyan-200'
                : isDarkMode ? 'bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900 border-purple-500/30' : 'bg-gradient-to-b from-indigo-100 via-purple-50 to-slate-100 border-purple-200'
          }`}>
            
            {/* World Buildings Interactive Grid inside Scene */}
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="px-3.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-emerald-500/20 text-xs font-extrabold text-emerald-600 dark:text-emerald-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>สิ่งก่อสร้างในเขต {EDUVERSE_DISTRICTS.find(d => d.id === selectedDistrict)?.nameTh}</span>
                </span>

                <span className="text-xs font-bold text-slate-500">
                  คลิกอาคารเพื่ออ่านเคล็ดลับ & การปลดล็อก
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
                {INITIAL_EDUVERSE_BUILDINGS.filter(b => b.district === selectedDistrict || selectedDistrict === 'forest').map(bld => (
                  <motion.div
                    key={bld.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedBuilding(bld)}
                    className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col items-center text-center gap-2 ${
                      bld.unlocked
                        ? isDarkMode ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400' : 'bg-white/90 border-emerald-200 hover:border-emerald-400 shadow-lg'
                        : isDarkMode ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-50/80 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 flex items-center justify-center text-3xl shadow-sm">
                      {bld.icon}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1">
                        {lang === 'th' ? bld.nameTh : bld.nameEn}
                      </h4>
                      <span className="text-[0.65rem] font-bold text-emerald-600 dark:text-emerald-400 block">
                        Lv.{bld.level} • {bld.statsEffectTh}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Energy Spirits Strip inside World View */}
            <div className="pt-6 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  {lang === 'th' ? 'ภูตพลังงานประจำโลก:' : 'Active Energy Spirits:'}
                </span>
                <div className="flex items-center gap-2">
                  {INITIAL_ENERGY_SPIRITS.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSpirit(s)}
                      className="p-2 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-500/20 flex items-center gap-1.5 hover:scale-110 transition-transform cursor-pointer shadow-sm text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      <span className="text-base">{s.spiritIcon}</span>
                      <span className="hidden sm:inline">{s.nameTh.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveVerseTab('npc_quests')}
                className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{lang === 'th' ? 'คุยกับชาวเมือง NPC (3 ภารกิจ) →' : 'Talk to NPCs →'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: 9 DISTRICTS DETAILED BREAKDOWN */}
      {activeVerseTab === 'districts' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EDUVERSE_DISTRICTS.map(district => (
            <div
              key={district.id}
              onClick={() => {
                setSelectedDistrict(district.id);
                setActiveVerseTab('world');
              }}
              className={`p-6 rounded-[2.2rem] border transition-all cursor-pointer space-y-3 hover:scale-[1.02] active:scale-[0.98] ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40' : 'bg-white border-slate-100 hover:border-emerald-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-2xl shrink-0">
                  {district.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {lang === 'th' ? district.nameTh : district.nameEn}
                  </h4>
                  <span className="text-[0.65rem] font-bold text-emerald-600 dark:text-emerald-400 block">
                    {INITIAL_EDUVERSE_BUILDINGS.filter(b => b.district === district.id).length} Buildings Active
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {district.descriptionTh}
              </p>

              <button className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                <span>เข้าสู่เขตนี้ →</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 5. TAB 3: ENERGY SPIRITS GALLERY */}
      {activeVerseTab === 'spirits' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {INITIAL_ENERGY_SPIRITS.map(spirit => (
            <div
              key={spirit.id}
              onClick={() => setSelectedSpirit(spirit)}
              className={`p-6 rounded-[2.2rem] border transition-all cursor-pointer space-y-3 hover:scale-[1.02] ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/20 flex items-center justify-center text-3xl shadow-sm shrink-0">
                  {spirit.spiritIcon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {lang === 'th' ? spirit.nameTh : spirit.nameEn}
                  </h4>
                  <span className="text-[0.65rem] font-bold text-amber-600 dark:text-amber-400 block">
                    Level {spirit.level} / {spirit.maxLevel} • {spirit.powerBonusTh}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                  💡 เคล็ดลับไฟฟ้าจากภูต:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  {spirit.teachingTipTh}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. TAB 4: NPC QUESTS (DAILY LIFE SCENARIOS) */}
      {activeVerseTab === 'npc_quests' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-2">
            <Bot className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              {lang === 'th' 
                ? 'ชาวเมือง NPC ใน EduVerse ประสบปัญหาไฟฟ้าจริงในชีวิตประจำวัน! ช่วยตอบคำถามเพื่อรับ XP & Coins!' 
                : 'Help NPCs solve their real-world electricity issues to earn XP & Coins!'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {npcQuests.map(quest => (
              <div
                key={quest.id}
                className={`p-6 rounded-[2.2rem] border transition-all space-y-4 flex flex-col justify-between ${
                  quest.completed
                    ? isDarkMode ? 'bg-slate-900/40 border-emerald-500/30 opacity-80' : 'bg-emerald-50/50 border-emerald-200'
                    : isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{quest.npcAvatar}</span>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {quest.npcNameTh}
                      </h4>
                      <span className="text-[0.65rem] font-bold text-slate-500 block">
                        {quest.npcRoleTh}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed font-medium">
                    "{quest.problemTh}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                    +{quest.rewardXp} XP • +{quest.rewardCoins} Coins
                  </span>

                  <button
                    onClick={() => {
                      setActiveNpcQuest(quest);
                      setSelectedAnswerIndex(null);
                      setQuestResult(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      quest.completed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-500 hover:bg-amber-400 text-white shadow-md shadow-amber-500/20'
                    }`}
                  >
                    {quest.completed ? 'แก้ไขแล้ว ✓' : 'ช่วยเหลือ NPC →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. TAB 5: SECRET AREAS */}
      {activeVerseTab === 'secrets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {secretAreas.map(area => (
            <div
              key={area.id}
              onClick={() => setSelectedSecretArea(area)}
              className={`p-6 rounded-[2.2rem] border transition-all cursor-pointer space-y-3 ${
                area.unlocked
                  ? isDarkMode ? 'bg-slate-900/80 border-purple-500/40' : 'bg-white border-purple-200 shadow-sm'
                  : isDarkMode ? 'bg-slate-900/30 border-slate-800 opacity-60' : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{area.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {lang === 'th' ? area.nameTh : area.nameEn}
                    </h4>
                    <span className="text-[0.65rem] font-bold text-purple-600 dark:text-purple-400 block">
                      🔒 {area.unlockedRequirementTh}
                    </span>
                  </div>
                </div>

                {area.unlocked ? (
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 font-extrabold text-xs">
                    เปิดแล้ว ✨
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 font-extrabold text-xs">
                    ล็อกอยู่ 🔒
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {area.descriptionTh}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 8. TAB 6: FESTIVALS */}
      {activeVerseTab === 'festivals' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INITIAL_EDUVERSE_FESTIVALS.map(fest => (
            <div
              key={fest.id}
              className={`p-6 rounded-[2.2rem] border transition-all space-y-3 ${
                fest.active
                  ? isDarkMode ? 'bg-slate-900/80 border-emerald-500/40' : 'bg-white border-emerald-200 shadow-sm'
                  : isDarkMode ? 'bg-slate-900/30 border-slate-800 opacity-60' : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{fest.icon}</span>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {lang === 'th' ? fest.titleTh : fest.titleEn}
                  </h4>
                  <span className="text-[0.65rem] font-bold text-emerald-600 dark:text-emerald-400 block">
                    {fest.seasonTh} • {fest.active ? 'กำลังจัดกิจกรรมอยู่ 🔥' : 'กิจกรรมถัดไป'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {fest.descriptionTh}
              </p>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                🎯 ภารกิจพิเศษ: {fest.specialChallengeTh}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 9. TAB 7: MEMORIES */}
      {activeVerseTab === 'memories' && (
        <div className="space-y-4">
          {INITIAL_TREE_MEMORIES.map(m => (
            <div
              key={m.id}
              className={`p-5 md:p-6 rounded-[2.2rem] border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
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
            </div>
          ))}
        </div>
      )}

      {/* MODAL: BUILDING INSPECTION */}
      <AnimatePresence>
        {selectedBuilding && (
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
                onClick={() => setSelectedBuilding(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-400 flex items-center justify-center text-4xl shadow-lg shrink-0">
                  {selectedBuilding.icon}
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-extrabold text-[0.7rem] uppercase">
                    Level {selectedBuilding.level} Building
                  </span>
                  <h3 className="text-lg font-black font-display">
                    {lang === 'th' ? selectedBuilding.nameTh : selectedBuilding.nameEn}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                    🎯 หน้าที่ & วัตถุประสงค์:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">
                    {selectedBuilding.purposeTh}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <span className="font-bold text-amber-600 dark:text-amber-400 block">
                    💡 เคล็ดลับความรู้ประจำอาคาร:
                  </span>
                  <p className="text-slate-700 dark:text-slate-200">
                    {selectedBuilding.educationalTipTh}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBuilding(null)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                {lang === 'th' ? 'เข้าใจแล้ว ✓' : 'Understood ✓'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: SPIRIT INSPECTION */}
      <AnimatePresence>
        {selectedSpirit && (
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
                onClick={() => setSelectedSpirit(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/20 flex items-center justify-center text-5xl shadow-xl animate-bounce">
                {selectedSpirit.spiritIcon}
              </div>

              <div>
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 font-extrabold text-xs uppercase">
                  Energy Spirit Level {selectedSpirit.level}
                </span>
                <h3 className="text-xl font-black font-display pt-1">
                  {lang === 'th' ? selectedSpirit.nameTh : selectedSpirit.nameEn}
                </h3>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-200 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 leading-relaxed font-medium">
                {selectedSpirit.teachingTipTh}
              </p>

              <button
                onClick={() => setSelectedSpirit(null)}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                {lang === 'th' ? 'เข้าใจแล้ว ⚡' : 'Understood ⚡'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: NPC QUEST SOLVER */}
      <AnimatePresence>
        {activeNpcQuest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`p-6 md:p-8 rounded-[2.5rem] border max-w-lg w-full shadow-2xl relative space-y-5 ${
                isDarkMode ? 'bg-slate-900 border-amber-500/40 text-white' : 'bg-white border-amber-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setActiveNpcQuest(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeNpcQuest.npcAvatar}</span>
                <div>
                  <h3 className="text-lg font-black font-display">
                    {activeNpcQuest.npcNameTh}
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">
                    {activeNpcQuest.problemTh}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">
                  ❓ {activeNpcQuest.solutionQuestionTh}
                </span>

                <div className="space-y-2">
                  {activeNpcQuest.optionsTh.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswerIndex(idx)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                        selectedAnswerIndex === idx
                          ? 'bg-amber-500 text-white border-amber-400 shadow-md'
                          : isDarkMode
                            ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {questResult && (
                <div className={`p-4 rounded-2xl text-xs space-y-1 ${
                  questResult.isCorrect
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300'
                }`}>
                  <span className="font-bold block">
                    {questResult.isCorrect ? '✨ ถูกต้องสมบูรณ์!' : '❌ ยังไม่ถูกต้อง ลองใหม่อีกครั้ง'}
                  </span>
                  <p>{questResult.explanation}</p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleSolveNPCQuest(activeNpcQuest)}
                  disabled={selectedAnswerIndex === null}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
                >
                  ส่งคำตอบช่วย NPC
                </button>
                <button
                  onClick={() => setActiveNpcQuest(null)}
                  className="px-5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-xs cursor-pointer"
                >
                  ปิด
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
