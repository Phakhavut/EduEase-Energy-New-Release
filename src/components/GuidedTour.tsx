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
  Lightbulb,
  Trophy,
  Award,
  Coins,
  Zap
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
    titleTh: "1. หน้าหลัก (Home Dashboard)",
    titleEn: "1. Home Dashboard",
    descTh: "ศูนย์รวมข้อมูลสถานการณ์ค่าไฟวันนี้ โหลดพลังงานสด สรุปงบประมาณประจำเดือน และภารกิจรักษ์โลกประจำวัน",
    descEn: "Your starting point for today's electricity cost, cumulative power draw, bill estimates, and daily eco missions.",
    targetPage: "home",
    targetId: "tour-step-home",
    tipTh: "💡 คำถามที่ตอบ: 'ตอนนี้สถานการณ์ไฟของฉันเป็นยังไง?'",
    tipEn: "💡 Key Question Answered: 'What is my energy situation right now?'"
  },
  {
    stepNumber: 2,
    pageKey: 'appliances',
    titleTh: "2. เครื่องใช้ไฟฟ้า & เปรียบเทียบ (Appliances & Compare)",
    titleEn: "2. Appliances & Compare Lab",
    descTh: "เจาะดูทันทีว่า 'อะไรทำให้เสียไฟ' ดูค่าวัตต์จริง สแกนฉลากเบอร์ 5 ด้วย AI และสลับไปห้องลองเปรียบเทียบ (Compare Lab) ได้ในคลิกเดียว",
    descEn: "Find out what drives up power usage, monitor device wattage, scan Energy Label No. 5, and compare devices side-by-side.",
    targetPage: "appliances",
    targetId: "tour-step-appliances",
    tipTh: "💡 คำถามที่ตอบ: 'แล้วอะไรทำให้ค่าไฟฉันแพง และอุปกรณ์ตัวไหนคุ้มกว่า?'",
    tipEn: "💡 Key Question Answered: 'Which device uses most power and which model is more efficient?'"
  },
  {
    stepNumber: 3,
    pageKey: 'budget',
    titleTh: "3. ค่าไฟ & งบประมาณ (Budget & Bills)",
    titleEn: "3. Budget & Bill Calculator",
    descTh: "เปลี่ยนจากหน่วยไฟเป็น 'คิดเป็นเงินกี่บาท' ตั้งงบรายเดือน อัตรา TOU และเลือกระดับความละเอียดข้อมูลได้ 3 ระดับ (ง่าย / สมดุล / ละเอียด)",
    descEn: "Convert kWh into actual bill amounts, set monthly budget limits, manage TOU tariffs, and switch between 3 information depth levels.",
    targetPage: "budget",
    targetId: "tour-step-budget",
    tipTh: "💡 คำถามที่ตอบ: 'แล้วสุดท้ายฉันต้องจ่ายเท่าไหร่?'",
    tipEn: "💡 Key Question Answered: 'How much money will I actually pay?'"
  },
  {
    stepNumber: 4,
    pageKey: 'insights',
    titleTh: "4. AI & วิเคราะห์การใช้ไฟ (AI & Analytics Engine)",
    titleEn: "4. AI & Analytics Engine",
    descTh: "ศูนย์รวมปัญญาประดิษฐ์: ปรึกษา Voltie AI Coach, ตรวจจับจุดไฟรั่วซึม (Anomalies), จำลองฉากทัศน์ What-If และดูกราฟย้อนหลัง",
    descEn: "Your AI intelligence center: Consult Voltie Coach, detect power leak anomalies, model What-If scenarios, and analyze usage trends.",
    targetPage: "insights",
    targetId: "tour-step-insights",
    tipTh: "💡 คำถามที่ตอบ: 'ทำไมค่าไฟถึงสูง และควรแก้ตรงไหน?'",
    tipEn: "💡 Key Question Answered: 'Why did the bill spike and where should I optimize?'"
  },
  {
    stepNumber: 5,
    pageKey: 'learning',
    titleTh: "5. Energy Adventure & เรียนรู้ (Adventure & Arcade)",
    titleEn: "5. Energy Adventure & Arcade",
    descTh: "เติมความรู้เรื่องไฟฟ้า 6 กฎทอง, ทดลองหมุนมิเตอร์จานจริง, เล่นมินิเกมภาพจำ ประลองควิซ และเอาชนะบอสเพื่อสร้างเมืองรักษ์โลก",
    descEn: "Master electricity rules, experiment with meter disc simulation, play arcade matching games, defeat energy bosses, and build your eco city.",
    targetPage: "learning",
    targetId: "tour-step-learning",
    tipTh: "💡 คำถามที่ตอบ: 'อยากเรียนรู้เทคนิคประหยัดไฟและเล่นเกมสะสม XP ทำอย่างไร?'",
    tipEn: "💡 Key Question Answered: 'How can I learn power hacks and earn XP through fun games?'"
  },
  {
    stepNumber: 6,
    pageKey: 'locations',
    titleTh: "6. สถานที่ของฉัน (My Locations)",
    titleEn: "6. My Locations & Properties",
    descTh: "จัดการสถานที่ต่าง ๆ เช่น บ้าน คอนโด หอพัก หรือออฟฟิศ เพื่อแยกติดตามบิลค่าไฟและงบประมาณแต่ละแห่งอย่างอิสระ",
    descEn: "Manage multiple properties (Home, Condo, Dorm, Office) to track independent meters and budget goals.",
    targetPage: "locations",
    targetId: "tour-step-locations",
    tipTh: "💡 คำถามที่ตอบ: 'สลับดูค่าไฟบ้าน คอนโด หรือหอพักอย่างไร?'",
    tipEn: "💡 Key Question Answered: 'How do I switch or manage energy for my different properties?'"
  },
  {
    stepNumber: 7,
    pageKey: 'profile',
    titleTh: "7. โปรไฟล์ & คะแนนประหยัดไฟ (Profile & Saving Score)",
    titleEn: "7. Profile & 5D Saving Score",
    descTh: "ติดตาม Level, XP, Eco Coins, ประเมินดัชนีการประหยัดไฟ 5 มิติ (Saving Score) และแลกสกินกรอบรูปตัวละคร",
    descEn: "Track player level XP, Eco Coins, evaluate your 5D Energy Saving Score, and unlock character avatar skins.",
    targetPage: "profile",
    targetId: "tour-step-profile",
    tipTh: "💡 คำถามที่ตอบ: 'ฉันทำได้ดีแค่ไหนในการประหยัดไฟ และรับรางวัลได้อย่างไร?'",
    tipEn: "💡 Key Question Answered: 'How well am I saving energy and how do I claim rewards?'"
  },
  {
    stepNumber: 8,
    pageKey: 'settings',
    titleTh: "8. ตั้งค่า & ความน่าเชื่อถือ (Settings & Trust)",
    titleEn: "8. Settings & Trust Center",
    descTh: "ปรับเปลี่ยนภาษา (ไทย/English), ธีม (Light/Dark), เปิด Quick Tour ใหม่ และตรวจสอบสูตรคำนวณบิลและความโปร่งใสของ AI",
    descEn: "Configure app language, light/dark themes, restart this tour, and verify bill calculation formulas with zero black box.",
    targetPage: "settings",
    targetId: "tour-step-settings",
    tipTh: "💡 คำถามที่ตอบ: 'ตั้งค่าระบบ หรือตรวจสอบสูตรคำนวณได้ที่ไหน?'",
    tipEn: "💡 Key Question Answered: 'Where do I configure preferences or verify bill calculation formulas?'"
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
  onCompleteTour?: () => void;
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
  onCompleteTour,
  currentPage,
  setCurrentPage,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showCompletedBadge, setShowCompletedBadge] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [spotlightRect, setSpotlightRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const currentStep = QUICK_START_STEPS[stepIndex] || QUICK_START_STEPS[0];

  // Compute smooth polygon cutout clip-path for spotlight overlay
  const x1 = spotlightRect ? Math.max(0, spotlightRect.left - 10) : 0;
  const y1 = spotlightRect ? Math.max(0, spotlightRect.top - 10) : 0;
  const x2 = spotlightRect ? spotlightRect.left + spotlightRect.width + 10 : 0;
  const y2 = spotlightRect ? spotlightRect.top + spotlightRect.height + 10 : 0;

  const clipPathStyle = spotlightRect && !isPaused
    ? `polygon(0px 0px, 0px 100%, ${x1}px 100%, ${x1}px ${y1}px, ${x2}px ${y1}px, ${x2}px ${y2}px, ${x1}px ${y2}px, ${x1}px 100%, 100% 100%, 100% 0px)`
    : `polygon(0px 0px, 0px 100%, 50% 100%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 100% 100%, 100% 0px)`;

  // Helper function to calculate target element bounds
  const updateSpotlightPosition = useCallback(() => {
    if (!isActive || showPrompt || !currentStep) {
      setSpotlightRect(null);
      return;
    }

    const element = document.getElementById(currentStep.targetId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSpotlightRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
        return;
      }
    }
    setSpotlightRect(null);
  }, [isActive, showPrompt, currentStep]);

  // Scroll target into view
  const scrollTargetIntoView = useCallback(() => {
    if (!isActive || showPrompt || !currentStep) return;
    const element = document.getElementById(currentStep.targetId);
    if (element) {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        // On mobile, the bottom sheet covers the bottom 50% of the screen.
        const y = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.25);
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isActive, showPrompt, currentStep]);

  // Handle page transitions on step change
  useEffect(() => {
    if (!isActive || showPrompt || !currentStep) return;

    if (currentPage !== currentStep.targetPage) {
      setCurrentPage(currentStep.targetPage);
    }

    const timers = [30, 100, 250, 450, 700, 1000].map(delay =>
      setTimeout(() => {
        scrollTargetIntoView();
        updateSpotlightPosition();
      }, delay)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [stepIndex, showPrompt, currentStep, currentPage, setCurrentPage, isActive, scrollTargetIntoView, updateSpotlightPosition]);

  // Track window scroll and resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
    
    if (!isActive || showPrompt) return;

    const handleResizeOrScroll = () => {
      updateSpotlightPosition();
      setIsMobile(window.innerWidth < 768);
    };

    updateSpotlightPosition();
    window.addEventListener('resize', handleResizeOrScroll, { passive: true });
    window.addEventListener('scroll', handleResizeOrScroll, { passive: true });

    const timeouts = [100, 300, 600, 1000].map(d => setTimeout(updateSpotlightPosition, d));

    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
      timeouts.forEach(clearTimeout);
    };
  }, [stepIndex, showPrompt, currentPage, updateSpotlightPosition, isActive]);

  if (!isActive) return null;

  const handleNext = () => {
    setIsPaused(false);
    if (stepIndex < QUICK_START_STEPS.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      setShowCompletedBadge(true);
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
                    {lang === 'th' ? 'ทำความรู้จักกับ 9 ฟีเจอร์หลักที่จะช่วยคุณประหยัดค่าไฟ' : 'Discover the 9 key features to slash your energy bill.'}
                  </p>
                </div>
              </div>

              {/* Tour Steps Summary List */}
              <div className={`p-4 rounded-2xl border mb-6 space-y-2 text-xs font-semibold ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-center justify-between text-[0.7rem] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  <span>{lang === 'th' ? 'สิ่งที่คุณจะได้เรียนรู้' : 'What you will explore'}</span>
                  <span>9 {lang === 'th' ? 'ขั้นตอน' : 'Steps'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[0.75rem]">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 1. หน้าหลัก (Home)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 2. สถานที่ของฉัน (Locations)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 3. เครื่องใช้ไฟฟ้า (Appliances)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 4. ค่าไฟ & งบประมาณ (Budget)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 5. AI Coach (Voltie)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 6. เปรียบเทียบอุปกรณ์ (Compare Lab)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 7. ดัชนีประหยัดไฟ (Saving Score)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 8. เรียนรู้ & คู่มือ (Learning)</span>
                  <span className="flex items-center gap-1.5 sm:col-span-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 9. ภารกิจ & รางวัล (Missions)</span>
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

      {/* SPOTLIGHT MASK OVERLAY & GLOWING RING */}
      {!showPrompt && !showCompletedBadge && (
        <>
          <div
            className="spotlight-overlay"
            style={{
              clipPath: clipPathStyle,
              opacity: isPaused ? 0.3 : 1
            }}
          />

          {spotlightRect && (
            <div
              className="spotlight-ring"
              style={{
                top: `${spotlightRect.top - 10}px`,
                left: `${spotlightRect.left - 10}px`,
                width: `${spotlightRect.width + 20}px`,
                height: `${spotlightRect.height + 20}px`,
                borderColor: isPaused ? '#f59e0b' : '#10b981',
                borderStyle: isPaused ? 'dashed' : 'solid',
                boxShadow: isPaused
                  ? "0 0 20px rgba(245, 158, 11, 0.6)"
                  : "0 0 25px rgba(16, 185, 129, 0.7), 0 0 50px rgba(16, 185, 129, 0.3)"
              }}
            >
              <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[0.65rem] uppercase tracking-wider shadow-md flex items-center gap-1 animate-pulse">
                <Sparkles className="w-3 h-3" />
                <span>{lang === 'th' ? 'จุดเน้น' : 'Spotlight'}</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* FLOATING TOUR STEP CARD */}
      <AnimatePresence>
        {!showPrompt && !showCompletedBadge && (
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
                <span>{lang === 'th' ? `แสดง Quick Start Tour (${stepIndex + 1}/9)` : `Show Tour (${stepIndex + 1}/9)`}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, scale: 0.9, y: 15 }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className={isMobile 
                ? "fixed z-[9995] bottom-0 left-0 right-0 w-full pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.15)] rounded-t-[24px]" 
                : "fixed z-[9995] w-full max-w-md px-4 sm:px-0 pointer-events-auto"
              }
              style={isMobile ? undefined : {
                top: spotlightRect 
                  ? (typeof window !== 'undefined' && spotlightRect.top + spotlightRect.height + 20 > window.innerHeight - 280
                      ? Math.max(16, spotlightRect.top - 250)
                      : spotlightRect.top + spotlightRect.height + 16)
                  : '30%',
                left: spotlightRect
                  ? (typeof window !== 'undefined'
                      ? window.innerWidth < 500
                        ? '0px'
                        : Math.min(window.innerWidth - 460, Math.max(16, spotlightRect.left + (spotlightRect.width / 2) - 224))
                      : '50%')
                  : '50%',
                transform: spotlightRect 
                  ? 'none' 
                  : 'translate(-50%, -50%)',
              }}
            >
              <div className={isMobile
                ? `flex flex-col w-full rounded-t-[24px] overflow-hidden transition-all ${
                    isDarkMode ? 'bg-slate-900 border-t-2 border-emerald-500/40 text-white' : 'bg-white border-t-2 border-emerald-400 text-slate-800'
                  }`
                : `p-5 md:p-6 rounded-[2rem] border-2 shadow-2xl backdrop-blur-xl relative transition-all ${
                    isDarkMode 
                      ? 'bg-slate-950/95 border-emerald-500/40 text-white shadow-emerald-950/60' 
                      : 'bg-white/95 border-emerald-400 text-slate-800 shadow-slate-300'
                  }`
              }>
                
                {/* Scrollable Body */}
                <div className={isMobile ? "p-5 md:p-6 pb-2 overflow-y-auto max-h-[50vh] sm:max-h-[60vh] flex flex-col" : "flex flex-col"}>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-2 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs font-mono whitespace-nowrap">
                        {lang === 'th' ? `ขั้นที่ ${stepIndex + 1} จาก 9` : `Step ${stepIndex + 1} of 9`}
                      </span>
                      {isPaused && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 font-extrabold text-[0.65rem] uppercase shrink-0">
                          {lang === 'th' ? 'ทดลองอิสระ' : 'Paused'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
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
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mb-4 overflow-hidden shrink-0">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((stepIndex + 1) / QUICK_START_STEPS.length) * 100}%` }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    />
                  </div>

                  {/* Step Content */}
                  <div className="space-y-3 mb-5 shrink-0">
                    <h4 className="font-extrabold text-base md:text-lg font-display text-emerald-600 dark:text-emerald-400 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                      <span className="break-words">{lang === 'th' ? currentStep.titleTh : currentStep.titleEn}</span>
                    </h4>

                    <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium break-words">
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
                </div>

                {/* Bottom Control Bar (Pinned on mobile) */}
                <div 
                  className={`flex items-center justify-between border-t border-slate-200 dark:border-slate-800 shrink-0 ${
                    isMobile ? 'p-5 md:p-6 bg-slate-50 dark:bg-slate-800/50' : 'pt-3'
                  }`}
                  style={isMobile ? { paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' } : undefined}
                >
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isPaused 
                        ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                    style={isMobile ? { minHeight: '56px' } : undefined}
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    <span>{isPaused ? (lang === 'th' ? 'เล่นต่อ' : 'Resume') : (lang === 'th' ? 'ทดลองอิสระ' : 'Pause')}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={stepIndex === 0}
                      className={`px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                        stepIndex === 0
                          ? 'opacity-30 cursor-not-allowed text-slate-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                      }`}
                      style={isMobile ? { minHeight: '56px' } : undefined}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{lang === 'th' ? 'ย้อน' : 'Back'}</span>
                    </button>

                    <button
                      onClick={handleNext}
                      className="px-4 py-2 sm:py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1 hover:scale-105 active:scale-95"
                      style={isMobile ? { minHeight: '56px' } : undefined}
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

      {/* TOUR COMPLETED CELEBRATION MODAL WITH CONFETTI */}
      <AnimatePresence>
        {showCompletedBadge && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-hidden animate-fade-in">
            {/* Confetti Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 28 }).map((_, i) => {
                const colors = ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6', '#14B8A6'];
                const color = colors[i % colors.length];
                const left = `${(i * 3.6 + 2) % 100}%`;
                const delay = (i % 7) * 0.12;
                const size = 8 + (i % 4) * 4;
                return (
                  <motion.div
                    key={i}
                    initial={{ y: -20, x: 0, opacity: 1, rotate: 0 }}
                    animate={{
                      y: [0, 650 + (i % 5) * 80],
                      x: [0, (i % 2 === 0 ? 1 : -1) * (30 + (i % 8) * 15)],
                      rotate: [0, 360 + (i % 3) * 180],
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 3 + (i % 3) * 0.8,
                      repeat: Infinity,
                      repeatDelay: 0.3,
                      delay: delay,
                      ease: "easeOut"
                    }}
                    className="absolute rounded-sm shadow-sm"
                    style={{
                      left,
                      width: `${size}px`,
                      height: `${size * 1.4}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}`
                    }}
                  />
                );
              })}
            </div>

            {/* Celebration Badge Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`w-full max-w-md p-6 md:p-8 rounded-[2.5rem] border shadow-2xl relative text-center z-10 ${
                isDarkMode 
                  ? 'bg-slate-900/95 border-emerald-500/40 text-white shadow-emerald-950/80' 
                  : 'bg-white border-emerald-200 text-slate-800 shadow-emerald-500/20'
              }`}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-400 p-1 shadow-lg shadow-emerald-500/30 animate-pulse flex items-center justify-center">
                <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider border border-emerald-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>{lang === 'th' ? 'ทัวร์สมบูรณ์แล้ว!' : 'Tour Completed!'}</span>
              </div>

              <h2 className="text-xl md:text-2xl font-black mb-2">
                {lang === 'th' ? 'ยินดีด้วย! คุณเรียนรู้ครบ 9 ฟีเจอร์หลักแล้ว' : 'Mastered All 9 Features!'}
              </h2>

              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mb-5 leading-relaxed">
                {lang === 'th' 
                  ? 'คุณพร้อมใช้งาน EduEase Energy อย่างเต็มประสิทธิภาพแล้ว รับรางวัลเหรียญ XP และยศ Explorer เพื่อเริ่มต้นประหยัดค่าไฟได้ทันที!' 
                  : 'You are now fully equipped to optimize your power bill! Claim your XP & Explorer badge to get started.'}
              </p>

              {/* Rewards chips */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 mb-6">
                <div className="flex flex-col items-center">
                  <span className="text-[0.65rem] text-slate-400 font-bold uppercase">{lang === 'th' ? 'รางวัล' : 'Reward'}</span>
                  <span className="text-xs font-black text-amber-500 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-500" /> +100 XP
                  </span>
                </div>
                <div className="flex flex-col items-center border-x border-slate-200 dark:border-slate-700">
                  <span className="text-[0.65rem] text-slate-400 font-bold uppercase">{lang === 'th' ? 'เหรียญ' : 'Coins'}</span>
                  <span className="text-xs font-black text-emerald-500 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-emerald-500" /> +30
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[0.65rem] text-slate-400 font-bold uppercase">{lang === 'th' ? 'ปลดล็อกยศ' : 'Badge'}</span>
                  <span className="text-xs font-black text-indigo-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-indigo-400" /> Explorer
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onCompleteTour?.();
                  onClose();
                  setShowCompletedBadge(false);
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>{lang === 'th' ? 'รับรางวัล & เริ่มใช้งานเลย' : 'Claim Reward & Get Started'}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
