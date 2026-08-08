import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  HelpCircle, 
  Calculator, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  FileText 
} from 'lucide-react';

export interface ExplainabilityDetails {
  titleTh: string;
  titleEn: string;
  valueTh: string;
  valueEn: string;
  reasonTh: string;
  reasonEn: string;
  formulaTh?: string;
  formulaEn?: string;
  sourceTh: string;
  sourceEn: string;
  confidencePct: number;
  assumptionsTh: string[];
  assumptionsEn: string[];
  recommendationTh: string;
  recommendationEn: string;
  expectedSavingsThb?: number;
}

interface ExplainabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: ExplainabilityDetails | null;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const ExplainabilityModal: React.FC<ExplainabilityModalProps> = ({
  isOpen,
  onClose,
  details,
  lang,
  isDarkMode
}) => {
  if (!isOpen || !details) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className={`p-6 md:p-8 rounded-[2.5rem] border max-w-lg w-full shadow-2xl relative space-y-5 ${
            isDarkMode ? 'bg-slate-900 border-emerald-500/40 text-white' : 'bg-white border-emerald-200 text-slate-900'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xl shadow-lg shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-black text-[0.68rem] uppercase tracking-wider">
                {lang === 'th' ? 'การอธิบายสูตร & ความน่าเชื่อถือ' : 'Formula & Confidence Explanation'}
              </span>
              <h3 className="text-lg font-black font-display pt-0.5">
                {lang === 'th' ? details.titleTh : details.titleEn}
              </h3>
            </div>
          </div>

          {/* Current Value & Confidence Pill */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[0.68rem] font-bold text-slate-400 uppercase block">
                {lang === 'th' ? 'ค่าที่แสดงผล:' : 'Displayed Value:'}
              </span>
              <span className="text-xl font-black font-display text-emerald-600 dark:text-emerald-400">
                {lang === 'th' ? details.valueTh : details.valueEn}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[0.68rem] font-bold text-slate-400 uppercase block">
                {lang === 'th' ? 'ความมั่นใจ AI:' : 'AI Confidence:'}
              </span>
              <span className="text-sm font-black text-amber-500 flex items-center gap-1 justify-end">
                <Sparkles className="w-3.5 h-3.5" />
                {details.confidencePct}%
              </span>
            </div>
          </div>

          {/* Reason & Formula */}
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-emerald-500" />
                {lang === 'th' ? 'ที่มา & เหตุผลในการคำนวณ:' : 'Reasoning & Source:'}
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                {lang === 'th' ? details.reasonTh : details.reasonEn}
              </p>
            </div>

            {details.formulaTh && (
              <div className="space-y-1">
                <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5 text-teal-500" />
                  {lang === 'th' ? 'สูตรคณิตศาสตร์:' : 'Mathematical Formula:'}
                </span>
                <code className="block p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[0.75rem] border border-slate-800">
                  {lang === 'th' ? details.formulaTh : details.formulaEn}
                </code>
              </div>
            )}

            {/* Assumptions */}
            <div className="space-y-1">
              <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                {lang === 'th' ? 'ข้อสมมติฐานหลัก:' : 'Key Assumptions:'}
              </span>
              <ul className="space-y-1">
                {(lang === 'th' ? details.assumptionsTh : details.assumptionsEn).map((asm, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{asm}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendation & Savings */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-500" />
                  {lang === 'th' ? 'คำแนะนำเพื่อผลลัพธ์ที่ดีขึ้น:' : 'Recommendation:'}
                </span>
                {details.expectedSavingsThb && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[0.65rem]">
                    Save ~฿{details.expectedSavingsThb}/mo
                  </span>
                )}
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                {lang === 'th' ? details.recommendationTh : details.recommendationEn}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            {lang === 'th' ? 'รับทราบและเข้าใจแล้ว ✓' : 'Understood ✓'}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
