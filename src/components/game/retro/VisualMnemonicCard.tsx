import React, { useState } from 'react';
import { 
  Fan, 
  PlugZap, 
  Refrigerator, 
  Lightbulb, 
  ShowerHead, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Calculator,
  BookOpen,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { VisualMnemonic } from '../../../data/retroGamificationData';

interface VisualMnemonicCardProps {
  mnemonic: VisualMnemonic;
  lang: 'th' | 'en';
  isDarkMode?: boolean;
}

export const VisualMnemonicCard: React.FC<VisualMnemonicCardProps> = ({
  mnemonic,
  lang,
  isDarkMode = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Fan': return <Fan className="w-6 h-6 text-sky-400" />;
      case 'PlugZap': return <PlugZap className="w-6 h-6 text-purple-400" />;
      case 'Refrigerator': return <Refrigerator className="w-6 h-6 text-teal-400" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6 text-amber-400" />;
      case 'ShowerHead': return <ShowerHead className="w-6 h-6 text-rose-400" />;
      case 'Clock': return <Clock className="w-6 h-6 text-emerald-400" />;
      default: return <Sparkles className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div 
      className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-xl shadow-black/20' 
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-lg shadow-slate-200/50'
      }`}
    >
      {/* Top Banner with Visual Mnemonic Hook */}
      <div className={`p-4 bg-gradient-to-r ${mnemonic.badgeColor} text-white flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/20">
            {renderIcon(mnemonic.iconName)}
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/80 font-bold block">
              {lang === 'th' ? 'บัตรภาพจำช่วยจำ' : 'Visual Mnemonic'}
            </span>
            <h3 className="text-sm sm:text-base font-extrabold font-display">
              {lang === 'th' ? mnemonic.titleTh : mnemonic.titleEn}
            </h3>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-white/20 text-white font-mono text-xs font-bold shrink-0">
          ~{mnemonic.savingsBahtMonth} ฿/{lang === 'th' ? 'ด.' : 'mo'}
        </span>
      </div>

      {/* Main Memory Hook Section */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Memory Catchphrase Box */}
        <div className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
          isDarkMode 
            ? 'bg-slate-950/60 border-slate-800 text-slate-200' 
            : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <span className="text-xl shrink-0 mt-0.5">🧠</span>
          <div>
            <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">
              {lang === 'th' ? 'สูตรจำติดตา (Memory Key):' : 'Memory Formula:'}
            </h4>
            <p className="text-sm font-extrabold font-display leading-snug">
              {lang === 'th' ? mnemonic.mnemonicKeyTh : mnemonic.mnemonicKeyEn}
            </p>
          </div>
        </div>

        {/* Practical Action Rule */}
        <div className="flex items-start gap-2.5 text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <p className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
            <strong className="text-emerald-500 font-bold">
              {lang === 'th' ? 'วิธีปฏิบัติจริง: ' : 'Action Rule: '}
            </strong>
            {lang === 'th' ? mnemonic.ruleTh : mnemonic.ruleEn}
          </p>
        </div>

        {/* Expandable Scientific Explanation & Calculation Breakdown */}
        {isExpanded && (
          <div className={`pt-4 border-t space-y-3.5 text-xs ${
            isDarkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            {/* Science explanation */}
            <div className="space-y-1">
              <span className="font-bold text-sky-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'หลักวิทยาศาสตร์และการทำงาน:' : 'Physics & Engineering Context:'}</span>
              </span>
              <p className={`leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'th' ? mnemonic.scienceExplanationTh : mnemonic.scienceExplanationEn}
              </p>
            </div>

            {/* Math Formula */}
            <div className={`p-3 rounded-xl border font-mono text-[11px] ${
              isDarkMode 
                ? 'bg-slate-950 border-slate-800 text-emerald-400' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'การคำนวณตัวเลขจริง:' : 'Mathematical Breakdown:'}</span>
              </div>
              <p className="leading-normal">
                {lang === 'th' ? mnemonic.mathFormulaTh : mnemonic.mathFormulaEn}
              </p>
            </div>
          </div>
        )}

        {/* Toggle Detailed Explanation */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <span>
            {isExpanded 
              ? (lang === 'th' ? 'ย่อรายละเอียด' : 'Hide Details') 
              : (lang === 'th' ? '📖 ดูคำอธิบายทางวิทยาศาสตร์ & สูตรคำนวณ' : '📖 View Science Explanation & Math')}
          </span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
        </button>
      </div>
    </div>
  );
};
