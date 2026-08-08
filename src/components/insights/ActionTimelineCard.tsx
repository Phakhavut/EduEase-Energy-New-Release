import React from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  CheckCircle2, 
  Coins, 
  Award, 
  Sparkles, 
  TrendingDown, 
  Zap, 
  BookOpen, 
  DollarSign,
  PlusCircle
} from 'lucide-react';
import { ActionTimelineItem, InfoDetailMode } from '../../types';

interface ActionTimelineCardProps {
  timeline: ActionTimelineItem[];
  mode: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const ActionTimelineCard: React.FC<ActionTimelineCardProps> = ({
  timeline,
  mode,
  lang,
  isDarkMode,
}) => {
  return (
    <div className={`p-6 rounded-[2.5rem] border shadow-sm transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'ประวัติการลงมือทำ (Action Timeline)' : 'Action Timeline'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'บันทึกทุกก้าวการปรับเปลี่ยนพฤติกรรม ผลกระทบทางการเงิน และรางวัลที่ได้รับ' : 'History of user actions, financial savings, and earned rewards'}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {timeline.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative space-y-2"
          >
            {/* Dot Node */}
            <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[0.65rem] font-extrabold shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[0.68rem] text-slate-400 font-mono font-bold">
                {item.date}
              </span>
              <div className="flex items-center gap-2 font-mono text-xs">
                {item.coinsEarned && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 text-[0.68rem]">
                    <Coins className="w-3 h-3" />+{item.coinsEarned}
                  </span>
                )}
                {item.xpEarned && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1 text-[0.68rem]">
                    <Award className="w-3 h-3" />+{item.xpEarned} XP
                  </span>
                )}
              </div>
            </div>

            <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white font-display">
              {lang === 'th' ? item.actionTh : item.actionEn}
            </h4>

            {/* Impact & Detail */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 font-medium">
                <span>{lang === 'th' ? 'ผลประหยัดที่คาดการณ์:' : 'Expected Saving:'}</span>
                <span className="font-mono font-bold text-emerald-500">~฿{item.expectedImpactThb}/เดือน</span>
              </div>

              {item.actualImpactThb && mode !== 'simple' && (
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 font-medium border-t border-slate-200/60 dark:border-slate-700/60 pt-1">
                  <span>{lang === 'th' ? 'ผลประหยัดจริงที่เกิดขึ้น:' : 'Actual Saving:'}</span>
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">฿{item.actualImpactThb}/เดือน</span>
                </div>
              )}

              {item.learningGainedTh && mode === 'detailed' && (
                <div className="text-[0.72rem] text-slate-500 dark:text-slate-400 font-sans italic pt-1">
                  💡 {item.learningGainedTh}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
