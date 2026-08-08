import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Zap, 
  Flame, 
  GraduationCap, 
  TrendingDown, 
  Cpu, 
  ShieldCheck,
  X,
  Coins
} from 'lucide-react';
import { PassportStamp } from '../../types';

interface EnergyPassportProps {
  stamps: PassportStamp[];
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onUnlockStamp?: (id: string) => void;
}

export const EnergyPassport: React.FC<EnergyPassportProps> = ({
  stamps,
  lang,
  isDarkMode,
}) => {
  const [selectedStamp, setSelectedStamp] = useState<PassportStamp | null>(null);

  const unlockedCount = stamps.filter(s => s.unlocked).length;
  const progressPct = Math.round((unlockedCount / stamps.length) * 100);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-6 h-6 text-amber-500" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-purple-500" />;
      case 'TrendingDown': return <TrendingDown className="w-6 h-6 text-emerald-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-blue-500" />;
      default: return <Zap className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <div className={`p-6 md:p-8 rounded-[2.5rem] border transition-all shadow-xl relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border-slate-800' 
        : 'bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/60 border-amber-200/80 shadow-emerald-500/5'
    }`}>
      {/* Stamp Passport Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 ring-4 ring-amber-400/20">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold font-display text-slate-900 dark:text-white">
                {lang === 'th' ? 'พาสปอร์ตพลังงาน (Energy Passport)' : 'Energy Passport'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold text-xs">
                {unlockedCount} / {stamps.length} {lang === 'th' ? 'ตราประทับ' : 'Stamps'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {lang === 'th' ? 'สะสมตราประทับความสำเร็จการออมไฟเพื่อปลดล็อกรางวัล XP พิเศษ' : 'Collect milestone stamps to unlock bonus XP rewards'}
            </p>
          </div>
        </div>

        {/* Passport Overall Completion Bar */}
        <div className="w-full md:w-56 space-y-1.5 p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm">
          <div className="flex justify-between text-[0.7rem] font-bold text-slate-600 dark:text-slate-300">
            <span>{lang === 'th' ? 'ความคืบหน้าพาสปอร์ต' : 'Passport Completion'}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono">{progressPct}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Passport Stamp Booklets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stamps.map((stamp) => (
          <motion.div
            key={stamp.id}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedStamp(stamp)}
            className={`cursor-pointer p-4 rounded-3xl border transition-all flex flex-col items-center text-center relative group ${
              stamp.unlocked
                ? isDarkMode
                  ? 'bg-slate-800/80 border-amber-500/40 hover:border-amber-400 shadow-lg shadow-amber-500/5'
                  : 'bg-white border-amber-300 hover:border-amber-400 shadow-md shadow-amber-500/10'
                : isDarkMode
                  ? 'bg-slate-900/40 border-slate-800 opacity-60 hover:opacity-80'
                  : 'bg-slate-100/60 border-slate-200 opacity-60 hover:opacity-80'
            }`}
          >
            {/* Visual Stamp Ring Seal */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 relative transition-transform group-hover:rotate-6 ${
              stamp.unlocked 
                ? 'ring-4 ring-dashed ring-amber-400/80 bg-amber-400/10 shadow-inner' 
                : 'ring-2 ring-dashed ring-slate-400/40 bg-slate-200/50 dark:bg-slate-800/50'
            }`}>
              {stamp.unlocked ? (
                <>
                  {getIcon(stamp.icon)}
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute -top-1 -right-1 bg-white dark:bg-slate-900 rounded-full" />
                </>
              ) : (
                <Lock className="w-6 h-6 text-slate-400" />
              )}
            </div>

            <h3 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1 mb-1">
              {lang === 'th' ? stamp.titleTh : stamp.titleEn}
            </h3>

            <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${
              stamp.unlocked 
                ? 'bg-amber-400/20 text-amber-700 dark:text-amber-300' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
            }`}>
              +{stamp.xpReward} XP
            </span>

            {stamp.unlocked && stamp.unlockedAt && (
              <span className="text-[0.6rem] text-slate-400 font-mono mt-1">
                {stamp.unlockedAt}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Stamp Detail Dialog Modal */}
      <AnimatePresence>
        {selectedStamp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`p-6 rounded-[2.5rem] border max-w-md w-full shadow-2xl relative ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'
              }`}
            >
              <button
                onClick={() => setSelectedStamp(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="text-center space-y-4 pt-2">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ring-4 ring-dashed ${
                  selectedStamp.unlocked 
                    ? 'ring-amber-400 bg-amber-400/10 text-amber-500' 
                    : 'ring-slate-400 bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}>
                  {selectedStamp.unlocked ? getIcon(selectedStamp.icon) : <Lock className="w-8 h-8" />}
                </div>

                <div>
                  <h3 className="text-lg font-extrabold font-display">
                    {lang === 'th' ? selectedStamp.titleTh : selectedStamp.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    {lang === 'th' ? selectedStamp.descriptionTh : selectedStamp.descriptionEn}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">{lang === 'th' ? 'สถานะ:' : 'Status:'}</span>
                  <span className={selectedStamp.unlocked ? 'text-emerald-500' : 'text-slate-400'}>
                    {selectedStamp.unlocked 
                      ? (lang === 'th' ? `ปลดล็อกแล้ว ✓ (${selectedStamp.unlockedAt})` : `Unlocked ✓ (${selectedStamp.unlockedAt})`)
                      : (lang === 'th' ? 'ยังไม่ได้ปลดล็อก' : 'Locked')}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-extrabold text-amber-500">
                  <Coins className="w-4 h-4" />
                  <span>+{selectedStamp.xpReward} XP Reward</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
