import React, { useState } from 'react';
import { motion } from 'motion/react';
import { History, CheckCircle2, XCircle, Clock, Sparkles, TrendingDown, ShieldCheck, Filter } from 'lucide-react';
import { AIDecisionHistoryItem, InfoDetailMode } from '../../types';
import { INITIAL_AI_DECISION_HISTORY } from '../../data/trustData';
import { SourceBadge } from './SourceBadge';
import { ConfidenceBadge } from './ConfidenceBadge';

interface AIDecisionHistoryCardProps {
  history?: AIDecisionHistoryItem[];
  mode?: InfoDetailMode;
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
}

export const AIDecisionHistoryCard: React.FC<AIDecisionHistoryCardProps> = ({
  history = INITIAL_AI_DECISION_HISTORY,
  mode = 'balanced',
  lang = 'th',
  isDarkMode = false,
}) => {
  const [filter, setFilter] = useState<'all' | 'accepted' | 'ignored'>('all');

  const filteredItems = history.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

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
              {lang === 'th' ? 'ประวัติคำแนะนำของ AI (AI Decision History)' : 'AI Decision History'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'ตรวจสอบคำแนะนำย้อนหลัง เหตุผล ผลประหยัดจริง และการตอบรับของคุณ' : 'Review past AI recommendations, reasons, user acceptance, and verified savings'}
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0 text-xs font-bold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${filter === 'all' ? 'bg-purple-600 text-white' : 'text-slate-500'}`}
          >
            {lang === 'th' ? 'ทั้งหมด' : 'All'}
          </button>
          <button
            onClick={() => setFilter('accepted')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${filter === 'accepted' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}
          >
            {lang === 'th' ? 'ปฏิบัติตาม' : 'Accepted'}
          </button>
        </div>
      </div>

      {/* Decision Items List */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl border space-y-2.5 ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50/80 border-slate-200/80'
            }`}
          >
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[0.68rem] text-slate-400 font-mono font-bold">
                  {item.date}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-extrabold text-[0.65rem] uppercase">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <SourceBadge source={item.source} lang={lang} />
                <ConfidenceBadge level={item.confidence} lang={lang} />
              </div>
            </div>

            <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white font-display">
              {lang === 'th' ? item.recommendationTh : item.recommendationEn}
            </h4>

            {/* Reason */}
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              <strong>{lang === 'th' ? 'สาเหตุที่ AI ตรวจพบ:' : 'AI Rationale:'}</strong> {item.reasonTh}
            </p>

            {/* Savings Comparison Bar */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[0.65rem] text-slate-400 block font-sans">
                  {lang === 'th' ? 'ประหยัดคาดการณ์' : 'Est. Saving'}
                </span>
                <span className="font-bold text-emerald-500">฿{item.estimatedSavingThb}/เดือน</span>
              </div>

              {item.actualSavingThb !== undefined && (
                <div className="text-right">
                  <span className="text-[0.65rem] text-slate-400 block font-sans">
                    {lang === 'th' ? 'ประหยัดได้จริง' : 'Actual Saving'}
                  </span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">
                    ฿{item.actualSavingThb}/เดือน
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
