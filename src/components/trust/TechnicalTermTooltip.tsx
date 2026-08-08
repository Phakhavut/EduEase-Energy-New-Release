import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Info, HelpCircle, Sparkles, ArrowRight, X } from 'lucide-react';
import { TECHNICAL_TERMS } from '../../data/trustData';
import { AppPage } from '../../types';

interface TechnicalTermTooltipProps {
  termKey: string; // e.g. 'kwh' | 'ft' | 'tou' | 'vat' | 'peak' | 'off_peak' | 'power' | 'voltage' | 'pf'
  displayTitle?: string;
  lang?: 'th' | 'en';
  onNavigatePage?: (page: AppPage) => void;
  className?: string;
}

export const TechnicalTermTooltip: React.FC<TechnicalTermTooltipProps> = ({
  termKey,
  displayTitle,
  lang = 'th',
  onNavigatePage,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const termData = TECHNICAL_TERMS.find(t => t.id === termKey) || TECHNICAL_TERMS[0];
  const titleToShow = displayTitle || (lang === 'th' ? termData.termTh : termData.termEn);

  return (
    <span className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="underline decoration-dotted decoration-teal-500 decoration-2 underline-offset-4 font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 transition-colors cursor-pointer"
      >
        {titleToShow}
      </button>

      {/* Popover Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm p-5 rounded-[2rem] bg-slate-900 text-white border border-teal-500/30 shadow-2xl relative space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <h4 className="font-extrabold text-sm font-display text-teal-400">
                    {lang === 'th' ? termData.termTh : termData.termEn}
                  </h4>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-800 text-slate-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Definition */}
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {lang === 'th' ? termData.definitionTh : termData.definitionEn}
              </p>

              {/* Real World Example */}
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-200 font-sans">
                <strong>💡 {lang === 'th' ? 'ตัวอย่าง:' : 'Example:'}</strong> {lang === 'th' ? termData.exampleTh : termData.exampleEn}
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between gap-2">
                {onNavigatePage && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onNavigatePage('learning');
                    }}
                    className="w-full py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{lang === 'th' ? 'เรียนรู้เพิ่มเติมใน Energy Academy' : 'Learn in Academy'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </span>
  );
};
