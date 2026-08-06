import React from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../../types';

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
}) => {
  const totalKwhSaved = 450;
  const treesEquivalent = Math.round(totalKwhSaved / 30); // ~15 trees

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8 max-w-4xl mx-auto">
      {/* 1. USER PROFILE HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 md:p-8 rounded-[2.5rem] border text-center relative overflow-hidden transition-all shadow-lg ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
        }`}
      >
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-5xl shadow-2xl mb-4 ring-4 ring-amber-400/20">
          {currentAvatar || '⚡'}
        </div>

        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
            Namyen EcoMaster
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {lang === 'th' ? 'สมาชิกสายออมไฟรุ่นเยาว์ (17-25) • เข้าร่วมเมื่อ ก.ค. 2026' : 'Youth Energy Saver • Joined July 2026'}
          </p>
        </div>

        {/* Level & Streak Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold text-xs">
            Level {userLevel} Eco Master
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold text-xs">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{userStreak} {lang === 'th' ? 'วันติดกัน' : 'Day Streak'}</span>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/20 font-bold text-xs">
            <Coins className="w-4 h-4 text-amber-500" />
            <span>{userCoins} Coins</span>
          </div>
        </div>
      </motion.div>

      {/* 2. IMPACT METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Money Saved */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-[2rem] border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-500">
              <PiggyBank className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase">
              {lang === 'th' ? 'ค่าไฟที่เซฟได้รวม' : 'Total Money Saved'}
            </span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            ฿{moneySavedMonth.toLocaleString()}
          </div>
        </motion.div>

        {/* Energy Saved */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-[2rem] border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-blue-500/15 text-blue-500">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase">
              {lang === 'th' ? 'หน่วยไฟที่ลดได้' : 'Energy Reduced'}
            </span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
            {totalKwhSaved} kWh
          </div>
        </motion.div>

        {/* CO2 & Trees */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-[2rem] border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-teal-500/15 text-teal-500">
              <TreePine className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase">
              {lang === 'th' ? 'เทียบเท่าการปลูกต้นไม้' : 'Trees Planted Equivalent'}
            </span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-teal-600 dark:text-teal-400">
            {treesEquivalent} {lang === 'th' ? 'ต้น 🌳' : 'Trees 🌳'}
          </div>
        </motion.div>
      </div>

      {/* 3. UNLOCKED BADGES SHOWCASE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-[2.5rem] border transition-all ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
        }`}
      >
        <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>{lang === 'th' ? 'เข็มกลัดที่ปลดล็อกแล้ว' : 'Unlocked Badges Showcase'}</span>
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
