import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Flame, 
  Coins, 
  PiggyBank, 
  TreePine, 
  Award, 
  ShieldCheck, 
  Zap, 
  Calendar,
  CheckCircle2,
  Sparkles,
  Trophy,
  GraduationCap,
  Target,
  Heart,
  ChevronRight,
  Shirt
} from 'lucide-react';
import { Badge, PassportStamp } from '../../types';
import { EnergyPassport } from '../gamification/EnergyPassport';
import { INITIAL_PASSPORT_STAMPS } from '../../data/gamificationData';

interface ProfileViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  userLevel: number;
  userXp: number;
  userXpMax: number;
  userCoins: number;
  userStreak: number;
  currentAvatar: string;
  moneySavedMonth: number;
  badges: Badge[];
  onNavigatePage?: (page: any) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  lang,
  isDarkMode,
  userLevel,
  userXp,
  userXpMax,
  userCoins,
  userStreak,
  currentAvatar,
  moneySavedMonth,
  badges,
  onNavigatePage
}) => {
  const [passportStamps, setPassportStamps] = useState<PassportStamp[]>(INITIAL_PASSPORT_STAMPS);
  const [avatarSkin, setAvatarSkin] = useState<string>('⚡ Eco Spark');

  const totalKwhSaved = 450;
  const treesEquivalent = Math.round(totalKwhSaved / 30);
  const energySavingScore = 88; // 88/100
  const currentRank = '#3 ศาลายา (Salaya Region)';
  const favoriteAppliance = lang === 'th' ? 'ตู้เย็น Inverter 2 ประตู' : '2-Door Inverter Refrigerator';

  const xpProgressPct = Math.min(100, Math.round((userXp / userXpMax) * 100));

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8 max-w-4xl mx-auto">
      {/* 1. RPG PLAYER PROFILE CHARACTER CARD */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 md:p-8 rounded-[2.5rem] border text-center relative overflow-hidden transition-all shadow-xl ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border-slate-800' 
            : 'bg-gradient-to-br from-indigo-50/70 via-white to-emerald-50/70 border-indigo-100 shadow-sm'
        }`}
      >
        {/* Character Avatar with Level Ring */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-emerald-400 flex items-center justify-center text-5xl shadow-2xl ring-4 ring-amber-400/30">
            {currentAvatar || '⚡'}
          </div>
          <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-xs shadow-md border-2 border-white dark:border-slate-900">
            Lv.{userLevel}
          </div>
        </div>

        {/* Player Name & Title */}
        <div className="space-y-1 mb-4">
          <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <span>Namyen EcoMaster</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold">
              RPG Guardian
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'th' ? 'นักศึกษา ม.มหิดล • เข้าร่วมเมื่อ ก.ค. 2026' : 'Mahidol Student • Joined July 2026'}
          </p>
        </div>

        {/* XP Progress Bar */}
        <div className="max-w-md mx-auto space-y-1.5 mb-6 p-3.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm">
          <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>{lang === 'th' ? 'ค่าประสบการณ์ (XP)' : 'XP Experience Progress'}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono">{userXp} / {userXpMax} XP ({xpProgressPct}%)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgressPct}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* Player RPG Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[0.65rem] font-bold text-slate-400 uppercase flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" /> Energy Saving Score
            </span>
            <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {energySavingScore} / 100 Pts
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[0.65rem] font-bold text-slate-400 uppercase flex items-center gap-1">
              <Trophy className="w-3 h-3 text-indigo-500" /> Current Rank
            </span>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
              {currentRank}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[0.65rem] font-bold text-slate-400 uppercase flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500" /> Streak
            </span>
            <div className="text-base font-extrabold text-amber-500 font-mono">
              {userStreak} {lang === 'th' ? 'วันติดกัน' : 'Days'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[0.65rem] font-bold text-slate-400 uppercase flex items-center gap-1">
              <Coins className="w-3 h-3 text-amber-400" /> Coins
            </span>
            <div className="text-base font-extrabold text-amber-400 font-mono">
              {userCoins}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. CURRENT ACTIVE MISSION & FAVORITE APPLIANCE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Active Mission */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-[2rem] border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <Target className="w-4 h-4 text-rose-500" />
              <span>{lang === 'th' ? 'ภารกิจที่กำลังทำอยู่' : 'Current Active Mission'}</span>
            </div>
            <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 font-bold">
              Daily Mission
            </span>
          </div>

          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
            {lang === 'th' ? 'ภารกิจ: ล้างแผ่นกรองฝุ่นแอร์ประจำเดือน' : 'Mission: Clean Monthly AC Dust Filters'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
            {lang === 'th' ? 'เพิ่มประสิทธิภาพทำความเย็น คืนค่าการกินไฟปกติให้แอร์' : 'Restores normal cooling airflow efficiency and saves 5% power.'}
          </p>

          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-500">+80 XP • +30 Coins</span>
            <button 
              onClick={() => onNavigatePage && onNavigatePage('missions')}
              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'th' ? 'ไปที่กระดานภารกิจ' : 'Go to Missions'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Favorite Appliance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-[2rem] border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-3">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>{lang === 'th' ? 'เครื่องใช้ไฟฟ้าชิ้นโปรด' : 'Favorite Appliance'}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 flex items-center justify-center text-2xl">
              🧊
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{favoriteAppliance}</h4>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'th' ? 'กินไฟเฉลี่ย 1.2 kWh/วัน • ฉลากเบอร์ 5 (3 ดาว)' : 'Avg 1.2 kWh/day • Energy Star Grade 5'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. ENERGY PASSPORT STAMPS SECTION */}
      <EnergyPassport
        stamps={passportStamps}
        lang={lang}
        isDarkMode={isDarkMode}
      />

      {/* 4. UNLOCKED BADGES SHOWCASE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-[2.5rem] border transition-all ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
        }`}
      >
        <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>{lang === 'th' ? 'เข็มกลัดความสำเร็จที่ครอบครอง' : 'Unlocked Achievement Badges'}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badges.filter(b => b.unlocked).map((badge) => (
            <div key={badge.id} className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">{badge.name}</h4>
                <span className="text-[0.65rem] text-slate-500">{badge.category}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

