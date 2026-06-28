import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { SavingRecommendation } from '../../types/savings.types';
import { useContrastAdjustment } from '../../hooks/useContrastAdjustment';

interface RecommendationCardProps {
  rec: SavingRecommendation;
  idx: number;
  isCommitted: boolean;
  lang: 'th' | 'en';
  onToggleCommit: (id: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  rec,
  idx,
  isCommitted,
  lang,
  onToggleCommit,
}) => {
  const highImpactTheme = useContrastAdjustment('#ef4444', '#FFFFFF', '#991b1b');
  const mediumImpactTheme = useContrastAdjustment('#f59e0b', '#FFFFFF', '#78350f');
  const lowImpactTheme = useContrastAdjustment('#3b82f6', '#FFFFFF', '#1e3a8a');

  const getImpactTheme = (impact: string) => {
    const imp = impact.trim().toLowerCase();
    if (imp.includes('high')) return highImpactTheme;
    if (imp.includes('medium') || imp.includes('med')) return mediumImpactTheme;
    return lowImpactTheme;
  };

  const theme = getImpactTheme(rec.impact);

  return (
    <motion.div
      className={`p-4 rounded-2.5xl border transition-all duration-300 flex flex-col gap-3 ${
        isCommitted 
          ? 'bg-emerald-500/5 border-emerald-500/20 shadow-sm' 
          : 'bg-slate-50/50 dark:bg-slate-950/5 border-slate-150 dark:border-slate-850/50'
      }`}
    >
      {/* Header card info */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[9.5px] font-black font-mono uppercase tracking-wider text-slate-400">
              {rec.appliance}
            </span>
            
            {/* Impact Badge utilizing custom contrast styling to guarantee WCAG compliance */}
            <span 
              className="px-1.5 py-0.5 rounded text-[7.5px] font-black uppercase tracking-widest font-mono"
              style={{ 
                backgroundColor: theme.badgeStyle.backgroundColor,
                color: theme.textColor,
                border: `1px solid ${theme.badgeStyle.borderColor}`
              }}
            >
              {rec.impact} Impact
            </span>
          </div>

          <h6 className="text-[11.5px] font-bold text-slate-800 dark:text-slate-100 mt-1">
            {lang === 'th' ? rec.titleTh : rec.titleEn}
          </h6>
        </div>

        {/* Projected offset potential */}
        <div className="text-right shrink-0">
          <span className="text-[9px] font-bold text-slate-400 block uppercase font-mono">
            {lang === 'th' ? 'ประหยัดสะสม' : 'OFFSET'}
          </span>
          <span className="text-xs font-black text-emerald-500 font-mono block mt-0.5">
            {lang === 'th' ? rec.potentialSavingsMonthlyTh : rec.potentialSavingsMonthlyEn}
          </span>
        </div>
      </div>

      {/* Description details */}
      <p className="text-[10.5px] leading-relaxed text-slate-500 dark:text-slate-100">
        {lang === 'th' ? rec.descTh : rec.descEn}
      </p>

      {/* Gamified Commit checkbox */}
      <div className="flex justify-end pt-2 border-t border-dashed border-slate-200/40 dark:border-slate-800/40">
        <button
          type="button"
          onClick={() => onToggleCommit(`rec_${idx}`)}
          className={`px-3 py-1.5 rounded-xl text-[9.5px] font-bold font-display transition-all flex items-center gap-1.5 ${
            isCommitted 
              ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
              : 'bg-slate-200/50 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-200'
          }`}
        >
          <CheckCircle className={`w-3.5 h-3.5 ${isCommitted ? 'animate-bounce' : ''}`} />
          <span>
            {isCommitted 
              ? (lang === 'th' ? 'ให้คำสัญญาแล้ว! 🌿' : 'Habit Committed! 🌿') 
              : (lang === 'th' ? 'ให้คำสัญญา' : 'Commit to Habit')}
          </span>
        </button>
      </div>
    </motion.div>
  );
};
