import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Database, ShieldCheck, AlertCircle, Zap, X } from 'lucide-react';
import { SourceTypeLabel, ConfidenceLevel, InfoDetailMode } from '../../types';
import { SourceBadge } from './SourceBadge';
import { ConfidenceBadge } from './ConfidenceBadge';

export interface WhyExplanationData {
  whatHappenedTh: string;
  whatHappenedEn?: string;
  whyDetectedTh: string;
  whyDetectedEn?: string;
  dataUsedTh: string[];
  dataUsedEn?: string[];
  assumptionsTh: string[];
  assumptionsEn?: string[];
  confidence: ConfidenceLevel | number;
  confidenceReasonTh?: string;
  source: SourceTypeLabel;
  ifIgnoredImpactTh: string;
  ifIgnoredImpactEn?: string;
  expectedSavingThb?: number;
}

interface WhyButtonProps {
  data: WhyExplanationData;
  lang?: 'th' | 'en';
  mode?: InfoDetailMode;
  variant?: 'inline' | 'button' | 'icon';
}

export const WhyButton: React.FC<WhyButtonProps> = ({
  data,
  lang = 'th',
  mode = 'balanced',
  variant = 'button',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="inline-block">
      {variant === 'icon' ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          title={lang === 'th' ? 'ทำไม AI ถึงแนะนำสิ่งนี้?' : 'Why am I seeing this?'}
          className="p-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 transition-all cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 rounded-full bg-purple-500/15 hover:bg-purple-500/25 text-purple-600 dark:text-purple-400 text-xs font-bold font-display border border-purple-500/30 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{lang === 'th' ? 'ทำไม AI แนะนำสิ่งนี้? (Why?)' : 'Why am I seeing this?'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      )}

      {/* Expanded Explanation Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg p-6 rounded-[2.5rem] bg-slate-900 text-white border border-purple-500/30 shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base md:text-lg font-display">
                      {lang === 'th' ? 'ทำไมคุณถึงเห็นคำแนะนำนี้?' : 'Why are you seeing this?'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {lang === 'th' ? 'ความโปร่งใสของ AI (EduEase Explainable AI)' : 'AI Transparency Breakdown'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Source & Confidence Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <SourceBadge source={data.source} lang={lang} />
                <ConfidenceBadge level={data.confidence} reasonTh={data.confidenceReasonTh} lang={lang} />
                {data.expectedSavingThb && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                    +฿{data.expectedSavingThb}/เดือน
                  </span>
                )}
              </div>

              {/* 6 Questions Section */}
              <div className="space-y-3 font-sans text-xs md:text-sm">
                {/* 1. What Happened */}
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <span className="text-[0.68rem] font-extrabold uppercase text-purple-400 block tracking-wider">
                    1. เกิดอะไรขึ้น? (What happened?)
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    {data.whatHappenedTh}
                  </p>
                </div>

                {/* 2. Why Detected */}
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <span className="text-[0.68rem] font-extrabold uppercase text-amber-400 block tracking-wider">
                    2. ทำไม AI ถึงตรวจพบ? (Why did AI detect this?)
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    {data.whyDetectedTh}
                  </p>
                </div>

                {/* 3. Data Used */}
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <span className="text-[0.68rem] font-extrabold uppercase text-blue-400 block tracking-wider">
                    3. ข้อมูลที่นำมาใช้วิเคราะห์ (Data used)
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                    {data.dataUsedTh.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* 4. Assumptions Made */}
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <span className="text-[0.68rem] font-extrabold uppercase text-teal-400 block tracking-wider">
                    4. ข้อสันนิษฐานของระบบ (Assumptions made)
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                    {data.assumptionsTh.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* 5. What if Ignored */}
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                  <span className="text-[0.68rem] font-extrabold uppercase text-rose-400 block tracking-wider">
                    5. เกิดอะไรขึ้นหากละเลยคำแนะนำนี้? (If ignored)
                  </span>
                  <p className="text-rose-200 font-medium leading-relaxed">
                    {data.ifIgnoredImpactTh}
                  </p>
                </div>
              </div>

              {/* Close Footer Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 cursor-pointer"
                >
                  {lang === 'th' ? 'รับทราบและเข้าใจแล้ว' : 'Got it'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
