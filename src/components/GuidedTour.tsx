import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  Compass, 
  Eye, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export interface TourStep {
  stepNumber: number;
  pageKey: string;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  targetPage: string;
  targetId: string;
  tipTh?: string;
  tipEn?: string;
}

export const QUICK_START_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    pageKey: 'home',
    titleTh: "1. หน้าหลัก (Home)",
    titleEn: "1. Home Dashboard",
    descTh: "ศูนย์รวมข้อมูลค่าไฟวันนี้ โหลดพลังงานสด สรุปงบประมาณประจำเดือน และภารกิจรักษ์โลกประจำวัน",
    descEn: "Your main hub for today's electricity cost, live power draw, monthly budget summary, and daily eco missions.",
    targetPage: "home",
    targetId: "tour-step-home",
    tipTh: "💡 ดูสรุปยอดวันนี้และกดรับ XP จากภารกิจรักษ์โลกประจำวันได้ที่นี่",
    tipEn: "💡 Check today's cost breakdown and claim XP from daily eco missions here."
  },
  {
    stepNumber: 2,
    pageKey: 'compare',
    titleTh: "2. เปรียบเทียบอุปกรณ์ (Compare Lab)",
    titleEn: "2. Appliance Comparison Lab",
    descTh: "เลือกเปรียบเทียบ 2 ถึง 5 อุปกรณ์พร้อมกัน เพื่อคำนวณค่าไฟรายวัน/รายเดือน ดูความคุ้มค่า และฟังคำสรุปจาก AI",
    descEn: "Compare 2 to 5 appliances simultaneously for daily/monthly costs, efficiency scores, and AI recommendations.",
    targetPage: "compare",
    targetId: "tour-step-compare",
    tipTh: "💡 สลับดูได้ทั้งกราฟแท่งและกราฟเรดาร์ 5 มิติเพื่อเลือกซื้อหรือใช้อุปกรณ์อย่างฉลาด",
    tipEn: "💡 Switch between bar charts and 5D radar charts to pick the best appliance."
  },
  {
    stepNumber: 3,
    pageKey: 'score',
    titleTh: "3. ดัชนีการประหยัดไฟ (Saving Score)",
    titleEn: "3. Energy Saving Score",
    descTh: "ดัชนีวัดประสิทธิภาพการใช้พลังงานของคุณแบบ 5 มิติ พร้อมระดับยศ เช่น Smart Saver และคำแนะนำเพิ่มคะแนน",
    descEn: "A 5-dimensional score assessing your habits, budget, learning, and actions with gamified level badges.",
    targetPage: "score",
    targetId: "tour-step-score",
    tipTh: "💡 สะสมคะแนนให้ทะลุ 90+ เพื่อปลดล็อกโบนัสเงินเซฟพิเศษและเหรียญทอง",
    tipEn: "💡 Reach 90+ score to unlock extra savings potential and gold coins."
  },
  {
    stepNumber: 4,
    pageKey: 'locations',
    titleTh: "4. สถานที่ของฉัน (My Locations)",
    titleEn: "4. My Locations",
    descTh: "จัดการสถานที่ต่าง ๆ เช่น บ้าน คอนโด หรือออฟฟิศ แยกติดตามค่าไฟ ตั้งงบประมาณ และวิเคราะห์พฤติกรรมได้อย่างอิสระ",
    descEn: "Manage multiple locations (home, condo, office) to track energy bills and budgets separately.",
    targetPage: "locations",
    targetId: "tour-step-locations",
    tipTh: "💡 สามารถกดบวกเพื่อเพิ่มสถานที่ใหม่ หรือคลิกเปลี่ยนสถานที่ทำงานได้ทันที",
    tipEn: "💡 Click '+' to add a new property or switch between properties instantly."
  },
  {
    stepNumber: 5,
    pageKey: 'appliances',
    titleTh: "5. เครื่องใช้ไฟฟ้า (Appliances)",
    titleEn: "5. Appliances Control",
    descTh: "สวิตช์เปิด-ปิดอุปกรณ์ไฟฟ้า ดูค่าวัตต์จริง สแกนฉลากเบอร์ 5 ด้วย AI และเปิดใช้งานโหมดประหยัดไฟ (Eco Mode)",
    descEn: "Control appliance switches, view real-time wattage, scan Energy Label No. 5 with AI, and activate Eco Mode.",
    targetPage: "appliances",
    targetId: "tour-step-appliances",
    tipTh: "💡 ทดลองปรับสวิตช์เปิด/ปิดแอร์หรือทีวี เพื่อดูผลกระทบต่อบิลค่าไฟรายวัน",
    tipEn: "💡 Toggle device switches to see instant impacts on your daily cost estimate."
  },
  {
    stepNumber: 6,
    pageKey: 'budget',
    titleTh: "6. งบประมาณ & คำนวณค่าไฟ (Budget)",
    titleEn: "6. Budget & Rates",
    descTh: "ตั้งเป้าหมายงบค่าไฟประจำเดือน คำนวณอัตรา TOU ย้อนหลัง และเปิดระบบแจ้งเตือนเตือนก่อนค่าไฟเกินกำหนด",
    descEn: "Set monthly bill targets, calculate TOU electricity rates, and receive early warning alerts before overspending.",
    targetPage: "budget",
    targetId: "tour-step-budget",
    tipTh: "💡 สไลด์ปรับงบประมาณรายเดือนเพื่อให้ AI วิเคราะห์วันหมดงบให้อัตโนมัติ",
    tipEn: "💡 Adjust monthly budget slider to get AI predictions on budget depletion days."
  },
  {
    stepNumber: 7,
    pageKey: 'ai-coach',
    titleTh: "7. AI Coach (Voltie)",
    titleEn: "7. AI Coach (Voltie)",
    descTh: "ปรึกษา Voltie AI Energy Coach ผู้ช่วยอัจฉริยะวิเคราะห์สาเหตุไฟพุ่ง พร้อมคำแนะนำลดค่าไฟเฉพาะบ้านคุณ",
    descEn: "Consult Voltie AI Energy Coach to analyze bill spikes and receive custom power-saving recommendations.",
    targetPage: "ai-coach",
    targetId: "tour-step-aicoach",
    tipTh: "💡 พิมพ์ถามข้อสงสัยเรื่องค่าไฟหรือขอคำแนะนำประหยัดแอร์ได้ตลอด 24 ชั่วโมง",
    tipEn: "💡 Ask Voltie about high bills or AC saving tips anytime 24/7."
  }
];

interface GuidedTourProps {
  isActive: boolean;
  showPrompt: boolean;
  stepIndex: number;
  setStepIndex: (idx: number | ((prev: number) => number)) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onClose: () => void;
  onStartTour: () => void;
  onSkipForNow: () => void;
  onNeverShowAgain: () => void;
  currentPage: string;
  setCurrentPage: (page: any) => void;
}

export const GuidedTour: React.FC<GuidedTourProps> = ({
  isActive,
  showPrompt,
  stepIndex,
  setStepIndex,
  lang,
  isDarkMode,
  onClose,
  onStartTour,
  onSkipForNow,
  onNeverShowAgain,
  currentPage,
  setCurrentPage,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [spotlightRect, setSpotlightRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const currentStep = QUICK_START_STEPS[stepIndex] || QUICK_START_STEPS[0];

  // Helper function to calculate target element bounds
  const updateSpotlightPosition = useCallback(() => {
    if (!isActive || showPrompt || !currentStep) {
      setSpotlightRect(null);
      return;
    }

    const element = document.getElementById(currentStep.targetId);
    if (element) {
      const rect = element.getBoundingClientRect();
      setSpotlightRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setSpotlightRect(null);
    }
  }, [isActive, showPrompt, currentStep]);

  // Scroll target into view
  const scrollTargetIntoView = useCallback(() => {
    if (!isActive || showPrompt || !currentStep) return;
    const element = document.getElementById(currentStep.targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive, showPrompt, currentStep]);

  // Handle page transitions on step change
  useEffect(() => {
    if (!isActive || showPrompt || !currentStep) return;

    if (currentPage !== currentStep.targetPage) {
      setCurrentPage(currentStep.targetPage);
    }

    const t = setTimeout(() => {
      scrollTargetIntoView();
      updateSpotlightPosition();
    }, 180);

    return () => clearTimeout(t);
  }, [stepIndex, showPrompt, currentStep, currentPage, setCurrentPage, isActive, scrollTargetIntoView, updateSpotlightPosition]);

  // Track window scroll and resize
  useEffect(() => {
    if (!isActive || showPrompt) return;

    updateSpotlightPosition();
    window.addEventListener('resize', updateSpotlightPosition, { passive: true });
    window.addEventListener('scroll', updateSpotlightPosition, { passive: true });

    const timeouts = [100, 300, 600, 1000].map(d => setTimeout(updateSpotlightPosition, d));

    return () => {
      window.removeEventListener('resize', updateSpotlightPosition);
      window.removeEventListener('scroll', updateSpotlightPosition);
      timeouts.forEach(clearTimeout);
    };
  }, [stepIndex, showPrompt, currentPage, updateSpotlightPosition, isActive]);

  if (!isActive) return null;

  const handleNext = () => {
    setIsPaused(false);
    if (stepIndex < QUICK_START_STEPS.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    setIsPaused(false);
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1);
    }
  };

  return (
    <>
      {/* INITIAL 3-CHOICE PROMPT MODAL */}
      <AnimatePresence>
        {showPrompt && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`w-full max-w-lg p-6 md:p-8 rounded-[2.5rem] border shadow-2xl relative my-auto ${
                isDarkMode 
                  ? 'bg-slate-900 border-emerald-500/30 text-white shadow-emerald-950/50' 
                  : 'bg-white border-emerald-200 text-slate-800 shadow-emerald-500/10'
              }`}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30 shrink-0">
                  <Sparkles className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[0.7rem] uppercase tracking-wider mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{lang === 'th' ? 'ใช้เวลาประมาณ 60 วินาที' : 'Takes ~60 Seconds'}</span>
                  </div>
                  <h3 className="font-extrabold text-xl md:text-2xl font-display leading-tight">
                    {lang === 'th' ? '⚡ Quick Start Tour (แนะนำแอป)' : '⚡ Quick Start Tour'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {lang === 'th' ? 'ทำความรู้จักกับ 7 ฟีเจอร์หลักที่จะช่วยคุณประหยัดค่าไฟ' : 'Discover the 7 key features to slash your energy bill.'}
                  </p>
                </div>
              </div>

              {/* Tour Steps Summary List */}
              <div className={`p-4 rounded-2xl border mb-6 space-y-2 text-xs font-semibold ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-center justify-between text-[0.7rem] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  <span>{lang === 'th' ? 'สิ่งที่คุณจะได้เรียนรู้' : 'What you will explore'}</span>
                  <span>7 {lang === 'th' ? 'ขั้นตอน' : 'Steps'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[0.75rem]">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 1. หน้าหลัก (Home)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 2. สถานที่ของฉัน (Locations)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 3. เครื่องใช้ไฟฟ้า (Appliances)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 4. ค่าไฟ & งบประมาณ (Budget)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 5. AI Coach (Voltie)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 6. เรียนรู้ & คู่มือ (Learning)</span>
                  <span className="flex items-center gap-1.5 sm:col-span-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 7. ภารกิจ & รางวัล (Missions)</span>
                </div>
              </div>

              {/* 3 Explicit Choices Required by Prompt */}
              <div className="space-y-2.5">
                {/* Choice 1: ดูทัวร์ */}
                <button
                  onClick={onStartTour}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white animate-pulse" />
                  <span>{lang === 'th' ? 'ดูทัวร์ (แนะนำแบบรวดเร็ว)' : 'Watch Tour (~60s)'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Choice 2: ข้ามไปเลย */}
                  <button
                    onClick={onSkipForNow}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all ${
                      isDarkMode 
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {lang === 'th' ? 'ข้ามไปเลย' : 'Skip for now'}
                  </button>

                  {/* Choice 3: ไม่ต้องแสดงอีก */}
                  <button
                    onClick={onNeverShowAgain}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all border ${
                      isDarkMode 
                        ? 'border-slate-700/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200' 
                        : 'border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {lang === 'th' ? 'ไม่ต้องแสดงอีก' : "Don't show again"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SPOTLIGHT MASK OVERLAY */}
      <AnimatePresence>
        {!showPrompt && !isPaused && (
          <>
            {spotlightRect ? (
              <>
                {/* Top mask */}
                <motion.div
                  className="fixed z-[9985] pointer-events-none bg-slate-950/50 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, top: 0, left: 0, right: 0, height: Math.max(0, spotlightRect.top - 10) }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Bottom mask */}
                <motion.div
                  className="fixed z-[9985] pointer-events-none bg-slate-950/50 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, top: spotlightRect.top + spotlightRect.height + 10, left: 0, right: 0, bottom: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Left mask */}
                <motion.div
                  className="fixed z-[9985] pointer-events-none bg-slate-950/50 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, top: Math.max(0, spotlightRect.top - 10), left: 0, width: Math.max(0, spotlightRect.left - 10), height: spotlightRect.height + 20 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Right mask */}
                <motion.div
                  className="fixed z-[9985] pointer-events-none bg-slate-950/50 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, top: Math.max(0, spotlightRect.top - 10), left: spotlightRect.left + spotlightRect.width + 10, right: 0, height: spotlightRect.height + 20 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </>
            ) : (
              <motion.div
                className="fixed inset-0 bg-slate-950/50 backdrop-blur-[2px] z-[9985] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </>
        )}
      </AnimatePresence>

      {/* SPOTLIGHT GLOWING BORDER RING */}
      {!showPrompt && spotlightRect && (
        <motion.div
          className="fixed z-[9990] pointer-events-none rounded-3xl border-4 transition-colors duration-300"
          style={{
            borderColor: isPaused ? '#f59e0b' : '#10b981',
            borderStyle: isPaused ? 'dashed' : 'solid',
          }}
          initial={false}
          animate={{
            top: spotlightRect.top - 10,
            left: spotlightRect.left - 10,
            width: spotlightRect.width + 20,
            height: spotlightRect.height + 20,
            boxShadow: isPaused
              ? "0 0 20px rgba(245, 158, 11, 0.6)"
              : "0 0 25px rgba(16, 185, 129, 0.7), 0 0 50px rgba(16, 185, 129, 0.3)"
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 18,
          }}
        >
          <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[0.65rem] uppercase tracking-wider shadow-md flex items-center gap-1 animate-pulse">
            <Sparkles className="w-3 h-3" />
            <span>{lang === 'th' ? 'จุดเน้น' : 'Spotlight'}</span>
          </div>
        </motion.div>
      )}

      {/* FLOATING TOUR STEP CARD */}
      <AnimatePresence>
        {!showPrompt && (
          isMinimized ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed bottom-6 right-6 z-[9995]"
            >
              <button
                onClick={() => setIsMinimized(false)}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white p-3 px-4 rounded-full shadow-2xl font-extrabold text-xs transition-all border border-emerald-400"
              >
                <Eye className="w-4 h-4 animate-bounce" />
                <span>{lang === 'th' ? `แสดง Quick Start Tour (${stepIndex + 1}/7)` : `Show Tour (${stepIndex + 1}/7)`}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="fixed z-[9995] w-full max-w-md px-4 sm:px-0 pointer-events-auto"
              style={{
                top: spotlightRect 
                  ? (typeof window !== 'undefined' && spotlightRect.top + spotlightRect.height + 20 > window.innerHeight - 280
                      ? Math.max(16, spotlightRect.top - 250)
                      : spotlightRect.top + spotlightRect.height + 16)
                  : '30%',
                left: spotlightRect
                  ? (typeof window !== 'undefined'
                      ? Math.min(window.innerWidth - 420, Math.max(16, spotlightRect.left + (spotlightRect.width / 2) - 210))
                      : '50%')
                  : '50%',
                transform: spotlightRect ? 'none' : 'translate(-50%, -50%)',
              }}
            >
              <div className={`p-5 md:p-6 rounded-[2rem] border-2 shadow-2xl backdrop-blur-xl relative transition-all ${
                isDarkMode 
                  ? 'bg-slate-950/95 border-emerald-500/40 text-white shadow-emerald-950/60' 
                  : 'bg-white/95 border-emerald-400 text-slate-800 shadow-slate-300'
              }`}>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {/* Explicit Progress Requirement: ขั้นที่ X จาก 7 */}
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs font-mono">
                      {lang === 'th' ? `ขั้นที่ ${stepIndex + 1} จาก 7` : `Step ${stepIndex + 1} of 7`}
                    </span>
                    {isPaused && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 font-extrabold text-[0.65rem] uppercase">
                        {lang === 'th' ? 'ทดลองอิสระ' : 'Paused'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsMinimized(true)}
                      className="p-1 text-slate-400 hover:text-emerald-500 transition-colors"
                      title={lang === 'th' ? 'ย่อหน้าต่าง' : 'Minimize'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onClose}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title={lang === 'th' ? 'ข้ามและปิด' : 'Close'}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mb-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((stepIndex + 1) / QUICK_START_STEPS.length) * 100}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  />
                </div>

                {/* Step Content */}
                <div className="space-y-3 mb-5">
                  <h4 className="font-extrabold text-base md:text-lg font-display text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{lang === 'th' ? currentStep.titleTh : currentStep.titleEn}</span>
                  </h4>

                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {lang === 'th' ? currentStep.descTh : currentStep.descEn}
                  </p>

                  {/* Microcopy Tip */}
                  {currentStep.tipTh && (
                    <div className={`p-3 rounded-xl text-xs font-semibold border ${
                      isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}>
                      {lang === 'th' ? currentStep.tipTh : currentStep.tipEn}
                    </div>
                  )}
                </div>

                {/* Bottom Control Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isPaused 
                        ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    <span>{isPaused ? (lang === 'th' ? 'เล่นต่อ' : 'Resume') : (lang === 'th' ? 'ทดลองอิสระ' : 'Pause')}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={stepIndex === 0}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                        stepIndex === 0
                          ? 'opacity-30 cursor-not-allowed text-slate-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{lang === 'th' ? 'ย้อน' : 'Back'}</span>
                    </button>

                    <button
                      onClick={handleNext}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1 hover:scale-105 active:scale-95"
                    >
                      <span>{stepIndex === QUICK_START_STEPS.length - 1 ? (lang === 'th' ? 'เสร็จสิ้น' : 'Finish') : (lang === 'th' ? 'ถัดไป' : 'Next')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </>
  );
};
