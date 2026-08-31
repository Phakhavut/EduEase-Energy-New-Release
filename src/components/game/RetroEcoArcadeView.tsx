import React, { useState } from 'react';
import { 
  Gamepad2, 
  BrainCircuit, 
  Gauge, 
  Stamp, 
  HelpCircle, 
  Sparkles, 
  Coins, 
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useGameState } from '../../context/GameStateProvider';
import { VISUAL_MNEMONICS } from '../../data/retroGamificationData';
import { VisualMnemonicCard } from './retro/VisualMnemonicCard';
import { MemoryMatchGame } from './retro/MemoryMatchGame';
import { AnalogMeterSimulator } from './retro/AnalogMeterSimulator';
import { HabitStampCard } from './retro/HabitStampCard';
import { RetroTriviaQuiz } from './retro/RetroTriviaQuiz';
import { RetroBadgeShowcase } from './retro/RetroBadgeShowcase';

export type RetroArcadeTab = 'memory' | 'meter' | 'stamps' | 'quiz' | 'library';

interface RetroEcoArcadeViewProps {
  lang: 'th' | 'en';
  isDarkMode?: boolean;
  initialTab?: RetroArcadeTab;
  onNavigateToView?: (view: string) => void;
}

export const RetroEcoArcadeView: React.FC<RetroEcoArcadeViewProps> = ({
  lang,
  isDarkMode = true,
  initialTab = 'memory',
  onNavigateToView
}) => {
  const [activeTab, setActiveTab] = useState<RetroArcadeTab>(initialTab);
  const { guardianState, earnEcoCredits, addXp } = useGameState();

  const handleEarnCoins = (amount: number) => {
    earnEcoCredits(amount);
  };

  const handleAddXp = (amount: number) => {
    addXp(amount);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Retro Hero Card Banner */}
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border relative overflow-hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-indigo-500/30' 
          : 'bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/70 border-indigo-200 shadow-indigo-900/5'
      }`}>
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-400 font-mono text-xs font-black border border-amber-500/30 uppercase tracking-wider">
                RETRO ECO ARCADE & LAB
              </span>
              <span className="text-xs text-indigo-400 font-bold">
                {lang === 'th' ? 'ศูนย์เกมภาพจำ & การเรียนรู้ไฟฟ้า' : 'Visual Mnemonic & Energy Science'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
              {lang === 'th' 
                ? 'เกมประหยัดไฟคลาสสิก & การ์ดภาพจำ' 
                : 'Classic Eco Arcade & Memory Lab'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === 'th'
                ? 'เรียนรู้และจดจำหลักการใช้ไฟฟ้าอย่างยั่งยืนผ่านวิธี Gamification คลาสสิก เช่น การ์ดภาพจำ, จานหมุนมิเตอร์จริง, และบัตรสะสมแสตมป์ 1990s'
                : 'Master household energy literacy through proven classic gamification methods: visual mnemonics, physical spinning meters, and retro punch stamp cards.'}
            </p>
          </div>

          {/* User Coins / XP Display */}
          <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 font-mono font-black text-sm border border-amber-500/30">
              <Coins className="w-4 h-4" />
              <span>{guardianState.coins.toLocaleString()} Coins</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-400 font-mono font-black text-sm border border-sky-500/30">
              <Sparkles className="w-4 h-4" />
              <span>Lv.{guardianState.level}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-800/80 scrollbar-none">
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'memory'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>{lang === 'th' ? '1. เกมจับคู่ภาพจำ' : '1. Memory Match'}</span>
          </button>

          <button
            onClick={() => setActiveTab('meter')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'meter'
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>{lang === 'th' ? '2. จำลองจานหมุนมิเตอร์' : '2. Analog Meter Lab'}</span>
          </button>

          <button
            onClick={() => setActiveTab('stamps')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'stamps'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Stamp className="w-4 h-4" />
            <span>{lang === 'th' ? '3. บัตรสะสมแสตมป์นิสัย' : '3. Habit Stamp Card'}</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'th' ? '4. ควิซความรู้ไฟฟ้า' : '4. Energy Trivia Quiz'}</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'library'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'th' ? '5. คลังบัตรภาพจำ 6 กฎ' : '5. Visual Mnemonics'}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'memory' && (
        <div className="space-y-8">
          <MemoryMatchGame 
            lang={lang} 
            isDarkMode={isDarkMode} 
            onEarnCoins={handleEarnCoins}
            onAddXp={handleAddXp}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {activeTab === 'meter' && (
        <div className="space-y-8">
          <AnalogMeterSimulator 
            lang={lang} 
            isDarkMode={isDarkMode}
            onEarnCoins={handleEarnCoins}
            onAddXp={handleAddXp}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {activeTab === 'stamps' && (
        <div className="space-y-8">
          <HabitStampCard 
            lang={lang} 
            isDarkMode={isDarkMode}
            onEarnCoins={handleEarnCoins}
            onAddXp={handleAddXp}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="space-y-8">
          <RetroTriviaQuiz 
            lang={lang} 
            isDarkMode={isDarkMode}
            onEarnCoins={handleEarnCoins}
            onAddXp={handleAddXp}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {activeTab === 'library' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-lg font-black font-display">
                {lang === 'th' ? 'คลังบัตรภาพจำ 6 กฎทองประหยัดพลังงาน' : 'The 6 Golden Visual Mnemonics'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'th' ? 'รวบรวมเทคนิคช่วยจำ พร้อมคำอธิบายฟิสิกส์และสูตรตัวเลขจริง' : 'Memory formulas paired with physics and real mathematical calculations'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VISUAL_MNEMONICS.map((mnemonic) => (
              <VisualMnemonicCard
                key={mnemonic.id}
                mnemonic={mnemonic}
                lang={lang}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>

          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}
    </div>
  );
};
