import React, { useState } from 'react';
import { 
  Stamp, 
  Check, 
  Sparkles, 
  Gift, 
  Trophy, 
  Fan, 
  PlugZap, 
  Refrigerator, 
  Power, 
  Sun, 
  Utensils, 
  Timer,
  Coins
} from 'lucide-react';
import { RETRO_HABIT_STAMPS, StampItem } from '../../../data/retroGamificationData';

interface HabitStampCardProps {
  lang: 'th' | 'en';
  isDarkMode?: boolean;
  onEarnCoins?: (amount: number) => void;
  onAddXp?: (amount: number) => void;
}

export const HabitStampCard: React.FC<HabitStampCardProps> = ({
  lang,
  isDarkMode = true,
  onEarnCoins,
  onAddXp
}) => {
  const [stamps, setStamps] = useState<StampItem[]>(RETRO_HABIT_STAMPS);
  const [stampedAnimationId, setStampedAnimationId] = useState<string | null>(null);

  const completedCount = stamps.filter(s => s.isCompleted).length;
  const isFullCard = completedCount === stamps.length;

  const handleStamp = (stampId: string) => {
    const target = stamps.find(s => s.id === stampId);
    if (!target || target.isCompleted) return;

    // Trigger stamp animation
    setStampedAnimationId(stampId);
    setTimeout(() => setStampedAnimationId(null), 1000);

    setStamps(prev => prev.map(s => s.id === stampId ? { ...s, isCompleted: true } : s));
    onEarnCoins?.(target.coinReward);
    onAddXp?.(target.xpReward);

    // Full card milestone bonus
    if (completedCount + 1 === stamps.length) {
      onEarnCoins?.(100);
      onAddXp?.(200);
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Fan': return <Fan className="w-5 h-5 text-sky-400" />;
      case 'PlugZap': return <PlugZap className="w-5 h-5 text-purple-400" />;
      case 'Refrigerator': return <Refrigerator className="w-5 h-5 text-teal-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Power': return <Power className="w-5 h-5 text-rose-400" />;
      case 'Sun': return <Sun className="w-5 h-5 text-yellow-400" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-indigo-400" />;
      case 'Timer': return <Timer className="w-5 h-5 text-emerald-400" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Physical Stamp Card Container */}
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border relative overflow-hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-amber-500/30' 
          : 'bg-gradient-to-br from-amber-50/70 via-white to-amber-50/50 border-amber-200 shadow-amber-900/5'
      }`}>
        {/* Retro Stamp Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider font-mono">
                PUNCH CARD 1990s
              </span>
              <span className="text-xs text-amber-400 font-bold">
                {lang === 'th' ? 'บัตรสะสมแสตมป์ประหยัดไฟประจำวัน' : 'Daily Eco Habit Punch Card'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight">
              {lang === 'th' ? 'สะสมแสตมป์พิชิต 8 นิสัยลดค่าไฟ' : 'Collect 8 Energy Saving Habit Stamps'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'th' 
                ? 'แตะที่ช่องนิสัยเพื่อปั๊มตราประทับ รับ Eco Coins ทันที และปลดล็อกเหรียญเกียรติยศ' 
                : 'Tap any completed habit to stamp, earn instant Eco Coins, and unlock vintage ribbons'}
            </p>
          </div>

          {/* Stamp progress badge */}
          <div className="px-4 py-2 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 text-center shrink-0">
            <span className="text-[10px] uppercase font-mono tracking-widest font-bold block">
              {lang === 'th' ? 'ตราประทับสะสม' : 'Total Stamped'}
            </span>
            <span className="text-xl font-black font-mono">
              {completedCount} / {stamps.length}
            </span>
          </div>
        </div>

        {/* 8-Slot Stamp Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {stamps.map((stamp, index) => {
            const isJustStamped = stampedAnimationId === stamp.id;

            return (
              <div
                key={stamp.id}
                onClick={() => handleStamp(stamp.id)}
                className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden select-none ${
                  stamp.isCompleted
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 cursor-pointer'
                }`}
              >
                {/* Stamp Slot Number Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-mono text-[10px] font-black flex items-center justify-center border border-slate-700">
                    {index + 1}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    <span>+{stamp.coinReward}</span>
                  </span>
                </div>

                {/* Habit Title & Icon */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                    {renderIcon(stamp.icon)}
                  </div>
                  <h5 className="text-xs font-black font-display leading-snug">
                    {lang === 'th' ? stamp.titleTh : stamp.titleEn}
                  </h5>
                </div>

                {/* Mnemonic Hook Hint */}
                <p className="text-[10px] text-slate-400 leading-tight mb-3">
                  {lang === 'th' ? stamp.mnemonicHintTh : stamp.mnemonicHintEn}
                </p>

                {/* Stamp Seal Overlay / Button */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-center">
                  {stamp.isCompleted ? (
                    <div className={`flex items-center gap-1.5 text-amber-400 font-black text-xs font-display uppercase tracking-wider py-1 px-3 rounded-full bg-amber-500/20 border border-amber-500/40 ${
                      isJustStamped ? 'animate-bounce scale-110' : ''
                    }`}>
                      <span>★ STAMPED</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider hover:underline">
                      {lang === 'th' ? 'แตะเพื่อปั๊มตราประทับ' : 'Tap to Stamp'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Completion Banner */}
        {isFullCard && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-emerald-500/20 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-sm font-black font-display text-amber-300">
                  {lang === 'th' ? '🎉 บัตรสะสมแสตมป์เต็มแล้ว! ได้รับโบนัสพิเศษ +100 Coins & +200 XP' : '🎉 Stamp Card Complete! +100 Bonus Coins & +200 XP Awarded'}
                </h4>
                <p className="text-xs text-slate-300">
                  {lang === 'th' ? 'คุณได้ปลดล็อก "โล่ปราบแวมไพร์พลังงาน" เรียบร้อยแล้ว' : 'You have unlocked the "Household Vampire Slayer Shield"!'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setStamps(RETRO_HABIT_STAMPS.map(s => ({ ...s, isCompleted: false })))}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 cursor-pointer shadow-md"
            >
              {lang === 'th' ? 'เริ่มบัตรใบใหม่' : 'Start Fresh Card'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
