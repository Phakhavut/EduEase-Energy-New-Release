import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, Coins, Trophy, X, Zap } from 'lucide-react';

interface MysteryChestModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onClaimReward?: (coins: number, xp: number) => void;
}

export const MysteryChestModal: React.FC<MysteryChestModalProps> = ({
  isOpen,
  onClose,
  lang,
  isDarkMode,
  onClaimReward
}) => {
  const [opened, setOpened] = useState(false);
  const [reward, setReward] = useState<{ coins: number; xp: number } | null>(null);

  const handleOpenChest = () => {
    const coins = Math.floor(Math.random() * 50) + 30; // 30-80 Coins
    const xp = Math.floor(Math.random() * 100) + 50; // 50-150 XP
    setReward({ coins, xp });
    setOpened(true);
    if (onClaimReward) onClaimReward(coins, xp);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={`p-6 md:p-8 rounded-[2.5rem] border max-w-md w-full text-center shadow-2xl relative ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>

          <div className="space-y-4 pt-2">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-300 flex items-center justify-center text-4xl shadow-xl ring-4 ring-amber-400/20">
              🎁
            </div>

            <h3 className="text-xl font-extrabold font-display">
              {lang === 'th' ? 'กล่องสุ่มพลังงาน (Energy Mystery Chest)' : 'Energy Mystery Chest'}
            </h3>

            {!opened ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {lang === 'th' ? 'เปิดกล่องสุ่มเพื่อรับรางวัลสุ่ม Coins และ XP พิเศษประจำวัน!' : 'Open the mystery chest to claim your daily random Coins & XP surprise!'}
                </p>

                <button
                  onClick={handleOpenChest}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span>{lang === 'th' ? 'เปิดกล่องสุ่มรับรางวัลทันที!' : 'Open Mystery Chest Now!'}</span>
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">
                    {lang === 'th' ? 'ยินดีด้วย! คุณได้รับ' : 'Congratulations! You Won:'}
                  </span>
                  <div className="flex items-center justify-center gap-6 pt-1">
                    <div className="flex items-center gap-1.5 text-base font-extrabold text-amber-500">
                      <Coins className="w-5 h-5" /> +{reward?.coins} Coins
                    </div>
                    <div className="flex items-center gap-1.5 text-base font-extrabold text-emerald-500">
                      <Zap className="w-5 h-5" /> +{reward?.xp} XP
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25"
                >
                  {lang === 'th' ? 'รับรางวัลและปิดหน้าต่าง' : 'Claim Rewards & Close'}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
