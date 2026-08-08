import React from 'react';
import { Sparkles, CheckCircle2, TrendingUp, DollarSign, ShieldAlert } from 'lucide-react';

interface EvidenceCardProps {
  recommendationTh: string;
  recommendationEn?: string;
  evidenceListTh: string[];
  evidenceListEn?: string[];
  expectedSavingThb: number;
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  recommendationTh,
  recommendationEn,
  evidenceListTh,
  evidenceListEn,
  expectedSavingThb,
  lang = 'th',
  isDarkMode = false,
}) => {
  return (
    <div className={`p-5 rounded-2xl border space-y-3 ${
      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/15 text-purple-500 border border-purple-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[0.65rem] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
              {lang === 'th' ? 'คำแนะนำจาก AI (AI Recommendation)' : 'AI Recommendation'}
            </span>
            <h4 className="font-extrabold text-sm md:text-base font-display text-slate-900 dark:text-white">
              {recommendationTh}
            </h4>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="font-black text-emerald-500 text-base font-mono">
            ~฿{expectedSavingThb}/เดือน
          </div>
          <span className="text-[0.65rem] text-slate-400 font-medium block">
            {lang === 'th' ? 'ผลประหยัดคาดการณ์' : 'Est. Savings'}
          </span>
        </div>
      </div>

      {/* Evidence Points */}
      <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1.5 text-xs">
        <span className="font-extrabold text-purple-700 dark:text-purple-300 uppercase tracking-wider text-[0.68rem] block">
          {lang === 'th' ? 'หลักฐานประกอบการวิเคราะห์ (Evidence):' : 'Supporting Evidence:'}
        </span>
        <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
          {evidenceListTh.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
