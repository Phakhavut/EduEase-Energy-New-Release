import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, Check, X, ShieldAlert, Zap, Building2, TreePine } from 'lucide-react';

interface CityWelcomeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const CityWelcomeSheet: React.FC<CityWelcomeSheetProps> = ({
  isOpen,
  onClose,
  lang,
  isDarkMode,
}) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stepsData = [
    {
      step: 1,
      titleTh: 'เมืองนี้โตจากการประหยัดไฟจริง',
      titleEn: 'Your City Grows with Real Energy Savings',
      descTh: 'ทำตามคำแนะนำลดการใช้ไฟในบ้าน เช่น ปรับแอร์ 25°C หรือปิดสวิตช์ปลั๊ก เพื่อรับเครดิตพัฒนาเมือง (Eco credits)',
      descEn: 'Complete simple real-world actions like adjusting AC to 25°C or unplugging standby devices to earn Eco credits.',
      icon: Zap,
      color: 'from-amber-400 to-emerald-400'
    },
    {
      step: 2,
      titleTh: 'กด Build แล้วเลือกพื้นที่ว่าง',
      titleEn: 'Tap Build & Select an Open Plot',
      descTh: 'เปิดโหมดสร้าง แล้วแตะที่แปลงว่างเพื่อเลือกวางหลังคาโซลาร์ สวนร่มรื่น กังหันลม หรือสถานีชาร์จ EV',
      descEn: 'Activate Build mode and tap an empty plot to place solar rooftops, shady parks, wind turbines, or EV chargers.',
      icon: Building2,
      color: 'from-emerald-400 to-teal-500'
    },
    {
      step: 3,
      titleTh: 'สิ่งที่สร้างจะสะท้อนความก้าวหน้าของคุณ',
      titleEn: 'Watch Your City & Savings Transform',
      descTh: 'ทุกสิ่งก่อสร้างช่วยเพิ่มสัดส่วนพลังงานสะอาด ประหยัดค่าไฟ และขยายพื้นที่สีเขียวให้เมืองอย่างยั่งยืน',
      descEn: 'Every placed improvement directly increases clean energy, tracks cost savings, and expands your urban green canopy.',
      icon: TreePine,
      color: 'from-teal-400 to-sky-500'
    }
  ];

  const current = stepsData[step - 1];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={`w-full max-w-md max-h-[90vh] flex flex-col rounded-3xl p-5 sm:p-6 border shadow-2xl overflow-y-auto ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-emerald-100 text-slate-800'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'th' ? 'คู่มือเริ่มต้นเมืองสีเขียว' : 'Green City Onboarding Guide'}
      >
        {/* Header & Step Dots */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step
                    ? 'w-6 bg-emerald-500'
                    : 'w-2 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
            <span className="ml-2 text-xs font-bold text-slate-400">
              {step}/3
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label={lang === 'th' ? 'ปิด' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center text-center my-auto py-2">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr ${current.color} flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 mb-4`}>
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h3 className="font-extrabold text-base sm:text-lg mb-2 text-slate-900 dark:text-white">
            {lang === 'th' ? current.titleTh : current.titleEn}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-xs">
            {lang === 'th' ? current.descTh : current.descEn}
          </p>
        </div>

        {/* Footer Action Buttons (Always reachable) */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="py-2.5 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'th' ? 'ย้อนกลับ' : 'Back'}</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2.5 px-4 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              {lang === 'th' ? 'ข้าม' : 'Skip'}
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="py-2.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 ml-auto cursor-pointer"
            >
              <span>{lang === 'th' ? 'ถัดไป' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 ml-auto cursor-pointer"
            >
              <span>{lang === 'th' ? 'เริ่มสร้างเมือง' : 'Start Building'}</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
