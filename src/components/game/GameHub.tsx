import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  EnergyGuardianState, 
  EnergyBoss, 
  BossId 
} from '../../types';
import { INITIAL_ENERGY_BOSSES } from '../../data/energyGuardianData';
import { 
  Swords, 
  Building2, 
  BookOpen, 
  Target, 
  TreePine, 
  Package, 
  Trophy, 
  HelpCircle, 
  Zap, 
  Coins, 
  Heart, 
  Sparkles, 
  Flame, 
  ChevronRight, 
  Bot, 
  Award,
  Play
} from 'lucide-react';
import { CharacterAvatar, MascotAvatar, BossIllustration } from './GameVisualAssets';

interface GameHubProps {
  guardianState: EnergyGuardianState;
  setGuardianState: React.Dispatch<React.SetStateAction<EnergyGuardianState>>;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onStartBossBattle: (boss: EnergyBoss) => void;
  onOpenCity: () => void;
  onOpenTutorial: () => void;
  onOpenGuide: () => void;
  onOpenInventory: () => void;
  onNavigateToTab: (tab: string) => void;
  highestConsumingDeviceName?: string;
}

export const GameHub: React.FC<GameHubProps> = ({
  guardianState,
  setGuardianState,
  lang,
  isDarkMode,
  onStartBossBattle,
  onOpenCity,
  onOpenTutorial,
  onOpenGuide,
  onOpenInventory,
  onNavigateToTab,
  highestConsumingDeviceName = 'เครื่องปรับอากาศ (AC)',
}) => {
  const [selectedBoss, setSelectedBoss] = useState<EnergyBoss>(INITIAL_ENERGY_BOSSES[0]);
  const bossesList = INITIAL_ENERGY_BOSSES;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 px-2 sm:px-0">
      {/* Game Hub Header Bar */}
      <div className={`p-5 sm:p-6 rounded-3xl border shadow-xl transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white shadow-emerald-950/20' 
          : 'bg-white border-slate-200 text-slate-800 shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Player Identity */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 ring-4 ring-emerald-400/20 shrink-0 p-1">
              <CharacterAvatar characterId="luna_hero" outfitId="default" size="md" />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-black bg-slate-900 text-amber-400 border border-amber-400/40">
                LV.{guardianState.level}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-lg sm:text-xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">
                  Energy Guardian
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Rank #12
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                <span>{lang === 'th' ? `คะแนนการประหยัดไฟ: ${guardianState.energySavingScore}/100` : `Energy Score: ${guardianState.energySavingScore}/100`}</span>
                <span>•</span>
                <span className="text-amber-500 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                  {guardianState.streak} Days Streak
                </span>
              </p>
            </div>
          </div>

          {/* Currency Bar & Tutorial Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-extrabold">
              <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5" />
                {guardianState.coins}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
                💎 {guardianState.crystals}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                {guardianState.energy}/100
              </span>
            </div>

            <button
              onClick={onOpenGuide}
              className="p-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all flex items-center gap-1"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'th' ? 'วิธีเล่น' : 'How to Play'}</span>
            </button>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-slate-500 dark:text-slate-400">
              {lang === 'th' ? `ความก้าวหน้า Level ${guardianState.level}` : `Level ${guardianState.level} Progression`}
            </span>
            <span className="font-mono text-emerald-500">
              {guardianState.xp} / {guardianState.xpMax} XP
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
              style={{ width: `${(guardianState.xp / guardianState.xpMax) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Featured Current Mission Card ("⚔️ วันนี้คุณพร้อมปกป้องเมืองหรือยัง?") */}
      <div className={`relative p-6 sm:p-8 rounded-3xl border shadow-xl overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/40 border-rose-500/30 text-white' 
          : 'bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-white border-rose-200 text-slate-800'
      }`}>
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-500 border border-rose-500/30 flex items-center gap-1">
                <Swords className="w-3.5 h-3.5" />
                FEATURED BOSS BATTLE
              </span>
              <span className="text-xs font-bold text-amber-500">
                ★☆☆☆☆ Difficulty {selectedBoss.difficulty}/5
              </span>
            </div>
            <span className="text-xs font-bold text-slate-400">⏱️ Est. 3–5 Min</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white leading-tight">
                ⚔️ {lang === 'th' ? `วันนี้คุณพร้อมปกป้องเมืองจาก ${selectedBoss.nameTh} หรือยัง?` : `Ready to defend the city against ${selectedBoss.nameEn}?`}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                {lang === 'th' ? selectedBoss.descriptionTh : selectedBoss.descriptionEn}
              </p>
            </div>

            {/* Boss Character Visual */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shadow-xl shadow-rose-500/20 shrink-0 self-center sm:self-auto ring-4 ring-white/10 p-2">
              <BossIllustration bossId={selectedBoss.id} size="md" />
            </div>
          </div>

          {/* Reward Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-bold">
            <span className="text-slate-400 text-[11px]">{lang === 'th' ? 'รางวัลที่จะได้รับ:' : 'Rewards:'}</span>
            <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              +{selectedBoss.rewards.xp} XP
            </span>
            <span className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              +{selectedBoss.rewards.coins} Coins 💰
            </span>
            <span className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              +{selectedBoss.rewards.crystals} Energy Crystal 💎
            </span>
          </div>

          {/* Primary CTA */}
          <div className="pt-2">
            <button
              onClick={() => onStartBossBattle(selectedBoss)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-rose-500/25 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2.5"
            >
              <Swords className="w-5 h-5 animate-pulse" />
              <span>{lang === 'th' ? '⚔️ เริ่มต่อสู้กับ Boss ตอนนี้' : '⚔️ Start Boss Battle Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Personal Master Recommendation */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 shadow-md shrink-0 flex items-center justify-center">
            <MascotAvatar mascotId="ecobot" size="sm" />
          </div>
          <div>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[10px] block">
              AI GAME MASTER RECOMMENDATION
            </span>
            <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {lang === 'th' 
                ? `จากการใช้ไฟของคุณ ${highestConsumingDeviceName} เป็นอุปกรณ์ที่ใช้พลังงานสูงสุด! แนะนำให้ต่อสู้กับ Cold Phantom เพื่อรับ +500 XP!`
                : `Based on your real energy data, ${highestConsumingDeviceName} uses the most power! Challenge Cold Phantom now for +500 XP!`}
            </p>
          </div>
        </div>

        <button
          onClick={() => onStartBossBattle(bossesList[1] || bossesList[0])}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs transition-all shrink-0 flex items-center justify-center gap-1.5"
        >
          <span>{lang === 'th' ? 'ไปต่อสู้ ⚔️' : 'Battle Now ⚔️'}</span>
        </button>
      </div>

      {/* City Preview Widget */}
      <div className={`p-6 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              SUSTAINABLE CITY PREVIEW
            </span>
            <span className="text-xs font-bold text-slate-400">
              Level {guardianState.city.level}
            </span>
          </div>
          <h3 className="text-xl font-extrabold font-display text-slate-900 dark:text-white">
            🏙️ {lang === 'th' ? guardianState.city.nameTh : guardianState.city.nameEn}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg">
            {lang === 'th' ? 'นำผลึกพลังงานและพิมพ์เขียวที่คุณได้รับจากการชนะ Boss มาสร้างและพัฒนาเมืองยั่งยืนของคุณ!' : 'Use crystals and blueprints won from Bosses to expand your green metropolis!'}
          </p>

          <div className="flex items-center gap-4 pt-2 text-xs font-bold text-slate-400">
            <span>🌱 Sustainability: <strong className="text-emerald-500">{guardianState.city.sustainability}%</strong></span>
            <span>⚡ Efficiency: <strong className="text-teal-500">{guardianState.city.efficiency}%</strong></span>
          </div>
        </div>

        <button
          onClick={onOpenCity}
          className="px-6 py-3.5 rounded-2xl bg-slate-800 dark:bg-slate-800 text-white hover:bg-slate-700 text-xs font-black shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2 shrink-0 border border-slate-700"
        >
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'th' ? '🏙️ เข้าเมืองของฉัน' : '🏙️ View My City'}</span>
        </button>
      </div>

      {/* Quick Action Hub Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold font-display uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          {lang === 'th' ? 'เมนูด่วน Guardian' : 'Guardian Quick Actions'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: 'bosses', titleTh: '⚔️ Boss Battles', titleEn: 'Boss Battles', onClick: () => setSelectedBoss(bossesList[0]) },
            { id: 'city', titleTh: '🏙️ My City', titleEn: 'My City', onClick: onOpenCity },
            { id: 'learn', titleTh: '📚 Learn', titleEn: 'Learn', onClick: () => onNavigateToTab('learning') },
            { id: 'quests', titleTh: '🎯 Quests', titleEn: 'Quests', onClick: () => onNavigateToTab('achievements') },
            { id: 'tree', titleTh: '🌳 Energy Tree', titleEn: 'Energy Tree', onClick: () => onNavigateToTab('achievements') },
            { id: 'inventory', titleTh: '🎒 Inventory', titleEn: 'Inventory', onClick: onOpenInventory },
          ].map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`p-4 rounded-2xl border text-center transition-all hover:scale-102 active:scale-98 ${
                isDarkMode 
                  ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-emerald-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 shadow-sm'
              }`}
            >
              <span className="font-extrabold text-xs block">
                {lang === 'th' ? action.titleTh : action.titleEn}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Energy Boss Roster Selector */}
      <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black font-display flex items-center gap-2">
            <Swords className="w-5 h-5 text-rose-500" />
            <span>{lang === 'th' ? 'รายนาม Energy Boss ทั้งหมด (Boss Roster)' : 'Energy Boss Roster'}</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {bossesList.length} Official Bosses
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {bossesList.map((boss) => (
            <div
              key={boss.id}
              onClick={() => setSelectedBoss(boss)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                selectedBoss.id === boss.id
                  ? 'bg-rose-500/10 border-rose-500 text-rose-400 ring-2 ring-rose-500/30'
                  : isDarkMode ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{boss.icon}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-900 text-amber-400 border border-amber-400/30">
                  ★ {boss.difficulty}/5
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {lang === 'th' ? boss.nameTh : boss.nameEn}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {lang === 'th' ? boss.titleTh : boss.titleEn}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400">HP: {boss.totalHp}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartBossBattle(boss);
                  }}
                  className="px-3 py-1 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-all text-[11px]"
                >
                  {lang === 'th' ? 'สู้ Boss' : 'Battle'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
