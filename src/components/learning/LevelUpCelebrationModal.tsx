import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  X, 
  Zap, 
  ShieldCheck, 
  Star,
  ChevronRight,
  TrendingUp,
  Flame,
  Crown
} from 'lucide-react';
import { CertificationTier } from '../../types';
import { Confetti } from '../Confetti';

interface LevelUpCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  oldTier?: CertificationTier | null;
  newTier: CertificationTier;
  onViewCertificate?: () => void;
  onContinue?: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const LevelUpCelebrationModal: React.FC<LevelUpCelebrationModalProps> = ({
  isOpen,
  onClose,
  oldTier,
  newTier,
  onViewCertificate,
  onContinue,
  lang,
  isDarkMode
}) => {
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Fire confetti burst
      setConfettiTrigger(prev => prev + 1);
      const timer = setTimeout(() => {
        setConfettiTrigger(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="level-up-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md"
      >
        <Confetti triggerCount={confettiTrigger} isDarkMode={isDarkMode} />

        <motion.div
          id="level-up-celebration-card"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-[32px] border-2 shadow-2xl p-6 sm:p-8 space-y-6 text-center ${
            isDarkMode 
              ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/30 border-amber-500/40 text-white shadow-amber-500/20' 
              : 'bg-gradient-to-b from-white via-amber-50/50 to-amber-100/30 border-amber-300 text-slate-900 shadow-amber-500/20'
          }`}
        >
          {/* Close button */}
          <button
            id="close-level-up-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-800/20 hover:bg-slate-800/40 dark:bg-slate-700/40 dark:hover:bg-slate-700/80 text-slate-400 hover:text-white transition-all cursor-pointer z-10"
            aria-label="Close Level Up Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ambient Glows */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

          {/* Top Pill / Badge */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-500/40 text-amber-500 dark:text-amber-300 font-black text-xs sm:text-sm tracking-wider uppercase shadow-inner"
          >
            <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>{lang === 'th' ? '🎉 เลื่อนระดับความเชี่ยวชาญใหม่!' : '🎉 LEVEL UP UNLOCKED!'}</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </motion.div>

          {/* Central Holographic Emblem Animation */}
          <div className="flex flex-col items-center justify-center space-y-3 relative z-10 pt-2">
            <motion.div
              initial={{ rotate: -15, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 12 }}
              className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-[32px] ${newTier.badgeBg} border-4 ${newTier.badgeBorder} flex items-center justify-center text-6xl sm:text-7xl shadow-2xl`}
            >
              <div className="absolute -inset-2 rounded-[36px] border border-amber-400/30 animate-pulse pointer-events-none" />
              <span>{newTier.icon}</span>
              <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black font-mono text-xs uppercase tracking-widest shadow-md">
                TIER {newTier.tierLevel}
              </div>
            </motion.div>

            {/* Old to New Level Comparison Badge */}
            {oldTier && oldTier.tierLevel !== newTier.tierLevel && (
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 dark:bg-slate-800 border border-slate-700">
                  {lang === 'th' ? oldTier.roleTitleTh : oldTier.roleTitleEn}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-extrabold border border-amber-500/40">
                  {lang === 'th' ? newTier.roleTitleTh : newTier.roleTitleEn}
                </span>
              </div>
            )}

            {/* Title and Role */}
            <div className="space-y-1 pt-1">
              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">
                {lang === 'th' ? newTier.roleTitleTh : newTier.roleTitleEn}
              </h2>
              <div className="flex items-center justify-center gap-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>{newTier.badgeCode}</span>
                <span>•</span>
                <span>{newTier.sealLabel}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-lg leading-relaxed">
              {lang === 'th' ? newTier.summaryTh : newTier.summaryEn}
            </p>
          </div>

          {/* Newly Unlocked Key Competencies */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm text-left space-y-3 relative z-10 shadow-sm">
            <div className="flex items-center justify-between text-xs font-extrabold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                {lang === 'th' ? 'สมรรถนะและความสามารถที่ปลดล็อกใหม่' : 'Newly Unlocked Competencies'}
              </span>
              <span className="text-[11px] font-mono font-bold bg-amber-500/20 px-2 py-0.5 rounded text-amber-700 dark:text-amber-300">
                +{(lang === 'th' ? newTier.keyCompetenciesTh : newTier.keyCompetenciesEn).length} Skills
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(lang === 'th' ? newTier.keyCompetenciesTh : newTier.keyCompetenciesEn).map((comp, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 relative z-10">
            {onViewCertificate && (
              <button
                id="modal-view-certificate-btn"
                onClick={() => {
                  onClose();
                  onViewCertificate();
                }}
                className="w-full sm:flex-1 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-slate-950" />
                <span>{lang === 'th' ? 'เปิดดูใบประกาศนียบัตรทางการ' : 'View Official Diploma'}</span>
              </button>
            )}

            <button
              id="modal-continue-learning-btn"
              onClick={() => {
                onClose();
                if (onContinue) onContinue();
              }}
              className="w-full sm:flex-1 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{lang === 'th' ? 'ลุยบทเรียนถัดไป ➔' : 'Continue Learning ➔'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
