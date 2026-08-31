import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Building2, Zap, Trophy, ShieldCheck } from 'lucide-react';
import { EnergyCoachIllustration } from './GreenCityVisualAssets';

interface CityJourneyIntroProps {
  isOpen?: boolean;
  onClose?: () => void;
  onComplete: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const CityJourneyIntro: React.FC<CityJourneyIntroProps> = ({
  isOpen = true,
  onClose,
  onComplete,
  lang,
  isDarkMode
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) onClose();
    else onComplete();
  };

  const steps = [
    {
      titleTh: '1. ทำภารกิจเพื่อรับ Eco Credits',
      titleEn: '1. Complete Energy Actions for Eco Credits',
      descTh: 'เปลี่ยนพฤติกรรมประหยัดไฟในบ้านจริง เช่น ปรับแอร์ 25-26°C หรือตัดไฟสแตนด์บาย เพื่อสะสม Eco Credits',
      descEn: 'Perform tangible energy saving habits at home to earn Eco Credits verified by our analytics engine.',
      icon: '⚡',
      highlightBadge: lang === 'th' ? 'ภารกิจ / Missions' : 'Missions'
    },
    {
      titleTh: '2. ใช้ Credits สร้างเมืองของคุณ',
      titleEn: '2. Use Credits to Build Your City',
      descTh: 'นำ Credits มาติดตั้งหลังคาโซลาร์ สวนชุมชน และกังหันลม เพื่อขยายเมืองสีเขียวจำลอง 2.5D',
      descEn: 'Invest your earned credits into solar arrays, micro wind turbines, and eco homes across deterministic plots.',
      icon: '🏙️',
      highlightBadge: lang === 'th' ? 'เมืองของฉัน / My City' : 'My City'
    },
    {
      titleTh: '3. รางวัลบอกความสำเร็จของคุณ',
      titleEn: '3. Track Real Outcomes in Rewards',
      descTh: 'ดูตัวเลขพลังงานสะอาดที่ผลิตได้ เงินที่ประหยัดได้จริง และปลดล็อกความสำเร็จประจำสัปดาห์',
      descEn: 'Review real derived energy metrics, unlocked city assets, and proud efficiency achievements in one calm screen.',
      icon: '🏆',
      highlightBadge: lang === 'th' ? 'รางวัล / Rewards' : 'Rewards'
    }
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
      if (onClose) onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
        onKeyDown={(e) => {
          if (e.key === 'Escape') handleClose();
        }}
        tabIndex={-1}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[2.5rem] border p-6 md:p-8 shadow-2xl ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-700 text-white' 
              : 'bg-white border-emerald-100 text-slate-900'
          }`}
        >
          {/* Header Progress & Close */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={`step-dot-${i}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStep 
                      ? 'w-7 bg-emerald-500' 
                      : i < currentStep 
                      ? 'w-3 bg-emerald-400/50' 
                      : 'w-3 bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Guide Illustration */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 p-2 flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-3">
              <EnergyCoachIllustration className="w-14 h-14" />
            </div>

            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {step.highlightBadge}
            </span>

            <h3 className="text-xl font-black font-display mt-2">
              {lang === 'th' ? step.titleTh : step.titleEn}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-sm mx-auto">
              {lang === 'th' ? step.descTh : step.descEn}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'ย้อนกลับ' : 'Back'}</span>
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-xs transition-all cursor-pointer"
              >
                {lang === 'th' ? 'ข้าม' : 'Skip'}
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <span>{currentStep === steps.length - 1 ? (lang === 'th' ? 'เริ่มสำรวจเมือง' : 'Start Journey') : (lang === 'th' ? 'ถัดไป' : 'Next')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
