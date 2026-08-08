import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Flame, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  Gift, 
  Lock, 
  TreePine, 
  ShieldCheck, 
  Crown, 
  Zap, 
  Award,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Mission, Badge, CharacterSkin } from '../../types';
import { DynamicMissionsHub } from '../gamification/DynamicMissionsHub';
import { EnergyPassport } from '../gamification/EnergyPassport';
import { EnergyTreeEcosystem } from '../gamification/EnergyTreeEcosystem';
import { EduVerseHub } from '../gamification/EduVerseHub';
import { INITIAL_PASSPORT_STAMPS } from '../../data/gamificationData';

interface AchievementsViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  userLevel: number;
  userXp: number;
  userXpMax: number;
  userCoins: number;
  userStreak: number;
  missions: Mission[];
  onCompleteMission: (id: string) => void;
  badges: Badge[];
  skins: CharacterSkin[];
  onUnlockSkin: (id: string, price: number) => void;
  currentAvatar: string;
  setCurrentAvatar: (avatar: string) => void;
  leaderboard: any[];
  onStartPageTour?: (stepIndex: number) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  lang,
  isDarkMode,
  userLevel,
  userXp,
  userXpMax,
  userCoins,
  userStreak,
  missions,
  onCompleteMission,
  badges,
  skins,
  onUnlockSkin,
  currentAvatar,
  setCurrentAvatar,
  leaderboard,
  onStartPageTour,
}) => {
  const [activeTab, setActiveTab] = useState<'eduverse' | 'missions' | 'passport' | 'tree' | 'badges' | 'skins' | 'leaderboard'>('eduverse');
  const [isLootBoxOpen, setIsLootBoxOpen] = useState(false);
  const [lootBoxReward, setLootBoxReward] = useState<{ xp: number; coins: number; item: string } | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleOpenLootBox = () => {
    if (isLootBoxOpen) return;
    setIsLootBoxOpen(true);
    triggerConfetti();
    setLootBoxReward({
      xp: 100,
      coins: 30,
      item: lang === 'th' ? 'เข็มกลัดพิเศษ: ต้นไม้ออมเงิน!' : 'Special Badge: Savings Sprout!'
    });
  };

  return (
    <div id="tour-step-missions" className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. GAMIFIED HEADER CARD (Duolingo Style) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 md:p-8 rounded-[2.5rem] border relative overflow-hidden transition-all shadow-lg ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border-amber-500/20 text-white'
            : 'bg-gradient-to-r from-amber-50 via-teal-50/60 to-amber-50 border-amber-100 text-slate-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-xl shrink-0">
              {currentAvatar || '⚡'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500 text-white">
                  Level {userLevel}
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  Eco Master
                </span>

                {onStartPageTour && (
                  <button
                    onClick={() => onStartPageTour(6)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                    <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}</span>
                  </button>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold font-display">
                {lang === 'th' ? 'ศูนย์ภารกิจ & รางวัลรักษ์โลก' : 'Green Missions & Rewards'}
              </h2>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-sm">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-bounce" />
              <span>{userStreak} {lang === 'th' ? 'วันติดกัน' : 'Day Streak'}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400/15 border border-amber-400/20 text-amber-700 dark:text-amber-300 font-extrabold text-sm">
              <Coins className="w-5 h-5 text-amber-500" />
              <span>{userCoins} Coins</span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-6 space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span>XP Progress to Level {userLevel + 1}</span>
            <span>{userXp} / {userXpMax} XP</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (userXp / userXpMax) * 100)}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* 2. TAB NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'eduverse', th: '🌐 EduVerse โลกเสมือนชีวิต', en: '🌐 EduVerse World' },
          { id: 'missions', th: '🎯 ศูนย์ภารกิจ 2.0 (Missions)', en: '🎯 Missions' },
          { id: 'passport', th: '📘 พาสปอร์ตพลังงาน (Passport)', en: '📘 Passport' },
          { id: 'tree', th: '🌳 ต้นไม้พลังงาน (Energy Tree)', en: '🌳 Energy Tree' },
          { id: 'badges', th: '🏅 เข็มกลัดเกียรติยศ (Badges)', en: '🏅 Badges' },
          { id: 'skins', th: '🎨 สกิน & อวตาร (Skins)', en: '🎨 Skins' },
          { id: 'leaderboard', th: '🏆 ตารางผู้นำ (Leaderboard)', en: '🏆 Leaderboard' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {lang === 'th' ? tab.th : tab.en}
          </button>
        ))}
      </div>

      {/* 2.5 EDUVERSE VIRTUAL WORLD TAB VIEW */}
      {activeTab === 'eduverse' && (
        <EduVerseHub
          lang={lang}
          isDarkMode={isDarkMode}
          userXp={userXp}
          userCoins={userCoins}
          userStreak={userStreak}
          savingScore={88}
          onStartPageTour={onStartPageTour ? () => onStartPageTour(6) : undefined}
        />
      )}

      {/* 3. DYNAMIC MISSIONS HUB VIEW */}
      {activeTab === 'missions' && (
        <div className="space-y-6">
          {/* Daily Mystery Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-[2.5rem] border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-lg shrink-0">
                🎁
              </div>
              <div>
                <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'กล่องสุ่มรางวัลพลังงานประจำวัน' : 'Daily Mystery Eco Box'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'th' ? 'เปิดกล่องเพื่อลุ้นรับโบนัส XP, Coins และสกินพิเศษ!' : 'Open daily loot box to claim free XP, Coins and skins!'}
                </p>
              </div>
            </div>

            <button
              onClick={handleOpenLootBox}
              disabled={isLootBoxOpen}
              className={`px-6 py-3 rounded-2xl font-bold text-xs shadow-lg transition-all cursor-pointer ${
                isLootBoxOpen
                  ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20 hover:scale-105 active:scale-95'
              }`}
            >
              {isLootBoxOpen ? (lang === 'th' ? 'รับรางวัลแล้ว ✓' : 'Opened ✓') : (lang === 'th' ? 'เปิดกล่องสุ่ม 🎁' : 'Open Box 🎁')}
            </button>
          </motion.div>

          {/* Dynamic Missions Hub Component */}
          <DynamicMissionsHub
            lang={lang}
            isDarkMode={isDarkMode}
            userLevel={userLevel}
            userXp={userXp}
            userXpMax={userXpMax}
            userCoins={userCoins}
            userStreak={userStreak}
            onCompleteMission={(id) => onCompleteMission(id)}
            onStartPageTour={onStartPageTour}
          />
        </div>
      )}

      {/* 4. ENERGY PASSPORT STAMPS VIEW */}
      {activeTab === 'passport' && (
        <EnergyPassport
          stamps={INITIAL_PASSPORT_STAMPS}
          lang={lang}
          isDarkMode={isDarkMode}
        />
      )}

      {/* 4. ENERGY TREE EVOLUTION VIEW */}
      {activeTab === 'tree' && (
        <EnergyTreeEcosystem
          lang={lang}
          isDarkMode={isDarkMode}
          savingScore={84}
          userStreak={userStreak}
          monthlyBudget={2500}
          currentBillEstimate={1950}
        />
      )}

      {/* 5. BADGES COLLECTION VIEW */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-5 rounded-[2rem] border transition-all flex items-center gap-4 ${
                badge.unlocked
                  ? isDarkMode ? 'bg-slate-900/80 border-emerald-500/30' : 'bg-white border-emerald-200 shadow-sm'
                  : isDarkMode ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md shrink-0 ${
                badge.unlocked ? 'bg-emerald-500/15 text-emerald-500' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}>
                {badge.unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>
              <div className="space-y-0.5">
                <span className="text-[0.65rem] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {badge.rarity}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {lang === 'th' ? badge.name : badge.nameEn}
                </h4>
                <p className="text-[0.7rem] text-slate-500">
                  {lang === 'th' ? badge.description : badge.descriptionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 6. CHARACTER SKINS SHOP VIEW */}
      {activeTab === 'skins' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {skins.map((skin) => (
            <motion.div
              key={skin.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-5 rounded-[2rem] border text-center space-y-3 transition-all ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg">
                {skin.avatarUrl}
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {lang === 'th' ? skin.name : skin.nameEn}
                </h4>
                <p className="text-[0.7rem] text-slate-500">
                  {lang === 'th' ? skin.description : skin.descriptionEn}
                </p>
              </div>

              <button
                onClick={() => {
                  if (skin.unlocked) {
                    setCurrentAvatar(skin.avatarUrl);
                  } else {
                    onUnlockSkin(skin.id, skin.priceCoins);
                  }
                }}
                className={`w-full py-2 rounded-xl font-bold text-xs transition-all ${
                  skin.unlocked
                    ? currentAvatar === skin.avatarUrl
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    : 'bg-amber-500 hover:bg-amber-400 text-white'
                }`}
              >
                {skin.unlocked
                  ? currentAvatar === skin.avatarUrl ? (lang === 'th' ? 'กำลังใช้งาน ✓' : 'In Use ✓') : (lang === 'th' ? 'เลือกใช้งาน' : 'Use Skin')
                  : (lang === 'th' ? `ปลดล็อก (${skin.priceCoins} Coins)` : `Unlock (${skin.priceCoins} Coins)`)}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* 7. LEADERBOARD VIEW */}
      {activeTab === 'leaderboard' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-[2.5rem] border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <span>{lang === 'th' ? 'ตารางอันดับนักออมไฟ Gold League' : 'Gold Savers League Leaderboard'}</span>
          </h3>

          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  user.isUser
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : isDarkMode ? 'border-slate-800 bg-slate-800/40' : 'border-slate-100 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full font-extrabold text-xs flex items-center justify-center ${
                    user.rank === 1 ? 'bg-amber-400 text-white' : user.rank === 2 ? 'bg-slate-300 text-slate-800' : 'bg-amber-700 text-white'
                  }`}>
                    #{user.rank}
                  </span>
                  <span className="text-xl">{user.avatar}</span>
                  <div>
                    <h4 className="font-extrabold text-xs md:text-sm text-slate-900 dark:text-white">
                      {user.name}
                    </h4>
                    <span className="text-[0.65rem] text-slate-500">Level {user.level} • {user.streak}d Streak 🔥</span>
                  </div>
                </div>

                <span className="font-mono font-extrabold text-xs text-emerald-600 dark:text-emerald-400">
                  {user.xp} XP
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
