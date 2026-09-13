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
  Zap,
  Home,
  Building2,
  Plug,
  Calculator,
  Bot,
  Scale,
  Activity,
  GraduationCap,
  Keyboard
} from 'lucide-react';

export interface TourStep {
  stepNumber: number;
  pageKey: string;
  categoryTh: string;
  categoryEn: string;
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
    categoryTh: '1. สถานการณ์ค่าไฟ (Cost)',
    categoryEn: '1. Cost Overview',
    titleTh: "1. ภาพรวม & ประมาณการค่าไฟ (Home Dashboard)",
    titleEn: "1. Home & Monthly Cost Overview",
    descTh: "ศูนย์บัญชาการสถานการณ์ค่าไฟ: ดูยอดค่าไฟคาดการณ์สิ้นเดือน (฿1,284), สถานะงบประมาณ (🟢 อยู่ในงบ), 3 เครื่องใช้ไฟฟ้าตัวการหลัก และกดลองจำลอง What-If เพื่อเห็นผลลัพธ์การประหยัดก่อนลงมือจริง",
    descEn: "Your energy command center: see your projected monthly bill (฿1,284), budget health (🟢 On Track), top 3 consuming appliances, and test What-If simulations to forecast savings.",
    targetPage: "home",
    targetId: "tour-step-home",
    tipTh: "💡 คำถามหลัก: 'ตอนนี้สถานการณ์ค่าไฟของฉันเป็นอย่างไร และมีแนวโน้มเกินงบหรือไม่?'",
    tipEn: "💡 Key Question: 'What is my current power cost status and am I within budget?'"
  },
  {
    stepNumber: 2,
    pageKey: 'locations',
    categoryTh: '2. จัดการสถานที่ (Locations)',
    categoryEn: '2. Spaces & Properties',
    titleTh: "2. สถานที่ & พื้นที่ของฉัน (My Locations & Spaces)",
    titleEn: "2. My Locations & Spaces",
    descTh: "จัดการสถานที่ต่าง ๆ เช่น หอพัก คอนโด บ้าน หรือออฟฟิศ เพื่อแยกติดตามมิเตอร์ งบประมาณ และเครื่องใช้ไฟฟ้าของแต่ละแห่งอย่างอิสระ สลับดูค่าไฟได้ทันที",
    descEn: "Manage distinct spaces (Dorm, Condo, House, Office) to monitor separate meters, independent budgets, and device inventories with seamless one-click switching.",
    targetPage: "locations",
    targetId: "tour-step-locations",
    tipTh: "💡 คำถามหลัก: 'ฉันจะสลับดูหรือเพิ่มสถานที่เพื่อแยกคุมค่าไฟอย่างไร?'",
    tipEn: "💡 Key Question: 'How do I switch or manage energy consumption across multiple properties?'"
  },
  {
    stepNumber: 3,
    pageKey: 'appliances',
    categoryTh: '3. เครื่องใช้ไฟฟ้า (Appliances)',
    categoryEn: '3. My Appliances',
    titleTh: "3. เครื่องใช้ไฟฟ้า & ฮีทแมป (My Appliances & Heatmap)",
    titleEn: "3. My Appliances & 24h Heatmap",
    descTh: "ค้นหาว่า 'ไฟของฉันถูกใช้ไปกับอะไร?': ตรวจสอบวัตต์, วิเคราะห์ชั่วโมงเปิดใช้งานจริง, ดูฮีทแมปช่วงเวลาพีค (18:00–23:00) และสแกนฉลากเบอร์ 5 ด้วย AI",
    descEn: "Discover exactly where your power goes: monitor real wattage, track running hours, view 24h consumption heatmaps (peak 18:00–23:00), and scan Energy Label No. 5 with AI.",
    targetPage: "appliances",
    targetId: "tour-step-appliances",
    tipTh: "💡 คำถามหลัก: 'อะไรคือตัวการกินไฟหลัก และอุปกรณ์ตัวไหนเปิดนานเกินไป?'",
    tipEn: "💡 Key Question: 'Which device uses the most power and runs during expensive peak hours?'"
  },
  {
    stepNumber: 4,
    pageKey: 'budget',
    categoryTh: '4. งบประมาณ (Budget)',
    categoryEn: '4. Budget & Tariffs',
    titleTh: "4. วางแผนงบ & ระบบตัดไฟจำลอง (Budget & Eco-Cut)",
    titleEn: "4. Budget Planning & Eco-Cut System",
    descTh: "แปลงหน่วยไฟฟ้า (kWh) เป็นเงินบาทจริง ตั้งงบประมาณรายเดือน เลือกประเภทอัตราค่าไฟ (ก้าวหน้า / TOU) และเปิดระบบตัดไฟจำลองเมื่อใกล้เกินงบ",
    descEn: "Translate kWh into real currency, set monthly spending limits, choose between progressive or TOU off-peak tariffs, and activate simulated automated cut-off alerts.",
    targetPage: "budget",
    targetId: "tour-step-budget",
    tipTh: "💡 คำถามหลัก: 'จะคุมบิลไม่ให้เกินงบ และวางแผนค่าไฟล่วงหน้าได้อย่างไร?'",
    tipEn: "💡 Key Question: 'How do I cap my monthly spending and avoid surprise utility bills?'"
  },
  {
    stepNumber: 5,
    pageKey: 'ai-coach',
    categoryTh: '5. AI ผู้ช่วย (AI Coach)',
    categoryEn: '5. Voltie AI Coach',
    titleTh: "5. ผู้ช่วยอัจฉริยะ Voltie (AI Energy Coach)",
    titleEn: "5. Voltie AI Energy Coach",
    descTh: "ปรึกษา Voltie AI สำหรับคำแนะนำเฉพาะตัว: วิเคราะห์จุดไฟรั่วซึม (Anomalies), ประเมินพฤติกรรมการใช้ไฟ และเสนอแนวทางลดค่าไฟแบบไม่ต้องทนร้อน",
    descEn: "Consult Voltie AI for personalized recommendations: detect power leakage anomalies, assess usage habits, and get actionable savings without sacrificing living comfort.",
    targetPage: "ai-coach",
    targetId: "tour-step-aicoach",
    tipTh: "💡 คำถามหลัก: 'ทำไมค่าไฟถึงสูงขึ้น และเริ่มปรับตรงไหนได้ผลที่สุด?'",
    tipEn: "💡 Key Question: 'Why did my electricity cost increase and what are the highest-impact actions?'"
  },
  {
    stepNumber: 6,
    pageKey: 'compare',
    categoryTh: '6. เปรียบเทียบ (Compare)',
    categoryEn: '6. Compare Lab',
    titleTh: "6. ห้องทดลองเปรียบเทียบ (Appliance Compare Lab)",
    titleEn: "6. Appliance Compare Lab",
    descTh: "วางเทียบเครื่องใช้ไฟฟ้าสองเครื่องเคียงข้างกัน คำนวณจุดคุ้มทุน (ROI) ระหว่างรุ่นประหยัดไฟเบอร์ 5 กับรุ่นธรรมดา เพื่อการตัดสินใจซื้อที่คุ้มค่าที่สุด",
    descEn: "Compare two appliances side-by-side, analyze payback ROI between standard vs. Energy Label No. 5 Inverter models, and make cost-effective purchase decisions.",
    targetPage: "compare",
    targetId: "tour-step-compare",
    tipTh: "💡 คำถามหลัก: 'ซื้อรุ่นประหยัดไฟเบอร์ 5 จะคุ้มค่าส่วนต่างราคาในกี่เดือน?'",
    tipEn: "💡 Key Question: 'Is upgrading to an inverter or Energy Label No. 5 model worth the price difference?'"
  },
  {
    stepNumber: 7,
    pageKey: 'score',
    categoryTh: '7. ดัชนีประหยัดไฟ (Score)',
    categoryEn: '7. Saving Score',
    titleTh: "7. ดัชนีประหยัดไฟ 5 มิติ (5D Saving Score)",
    titleEn: "7. 5D Energy Saving Score",
    descTh: "ประเมินพฤติกรรมการใช้พลังงานผ่านเรดาร์ 5 มิติ: ประสิทธิภาพ (Efficiency), การคุมงบ (Budget), ช่วงเวลา (Timing), ความสม่ำเสมอ (Consistency) และความรู้ (Eco IQ)",
    descEn: "Evaluate your energy habits across 5 key dimensions: Efficiency, Budget Control, Peak Timing, Habit Consistency, and Eco Knowledge.",
    targetPage: "score",
    targetId: "tour-step-score",
    tipTh: "💡 คำถามหลัก: 'พฤติกรรมการใช้ไฟของฉันจัดอยู่ในเกณฑ์ไหนเมื่อเทียบกับค่ามาตรฐาน?'",
    tipEn: "💡 Key Question: 'How do my habits rank across efficiency, timing, and conservation benchmarks?'"
  },
  {
    stepNumber: 8,
    pageKey: 'learning',
    categoryTh: '8. เรียนรู้ (Learning)',
    categoryEn: '8. Energy Learning',
    titleTh: "8. ห้องเรียนพลังงาน & กฎทอง (Energy Learning)",
    titleEn: "8. Energy Learning & Gold Rules",
    descTh: "เรียนรู้ 6 กฎทองประหยัดไฟ, ทดลองหมุนมิเตอร์จานจริง (Meter Disc Simulation), ศึกษาเทคนิคการตั้งแอร์ 26°C + พัดลม และอ่านคำอธิบายแบบไม่มี Black Box",
    descEn: "Master 6 golden electricity rules, simulate rotating induction disc meters, test the 26°C + fan formula, and explore transparent energy education.",
    targetPage: "learning",
    targetId: "tour-step-learning",
    tipTh: "💡 คำถามหลัก: 'มีเทคนิคประหยัดไฟอะไรบ้างที่ทำตามได้ทันทีและเห็นผลจริง?'",
    tipEn: "💡 Key Question: 'What proven power-saving techniques can I apply right away?'"
  },
  {
    stepNumber: 9,
    pageKey: 'achievements',
    categoryTh: '9. ภารกิจ & รางวัล (Rewards)',
    categoryEn: '9. Quests & Badges',
    titleTh: "9. ภารกิจ & รางวัลรักษ์โลก (Quests & Rewards)",
    titleEn: "9. Eco Missions & Achievements",
    descTh: "พิชิตภารกิจประหยัดไฟประจำวัน สะสมดวงตราแสตมป์ รับเหรียญ Eco Coins แลกรับรางวัล และเพิ่มระดับเลเวลผู้พิทักษ์พลังงานของคุณ",
    descEn: "Complete daily eco quests, collect milestone stamps, earn Eco Coins, unlock achievement badges, and level up your Energy Guardian rank.",
    targetPage: "achievements",
    targetId: "tour-step-missions",
    tipTh: "💡 คำถามหลัก: 'การประหยัดไฟช่วยให้ฉันได้รับ XP, เหรียญ และรางวัลอะไรบ้าง?'",
    tipEn: "💡 Key Question: 'How do my conservation efforts turn into XP, badges, and tangible rewards?'"
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

  // Sound effect on celebration
  const playCelebrationChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.45);
      });
    } catch {}
  }, []);

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
        const y = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.25);
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
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

  const handleNext = useCallback(() => {
    setIsPaused(false);
    if (stepIndex < QUICK_START_STEPS.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      setShowCompletedBadge(true);
      playCelebrationChime();
    }
  }, [stepIndex, setStepIndex, playCelebrationChime]);

  const handlePrev = useCallback(() => {
    setIsPaused(false);
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1);
    }
  }, [stepIndex, setStepIndex]);

  // Keyboard navigation support
  useEffect(() => {
    if (!isActive || showPrompt || showCompletedBadge) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === ' ' || e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, showPrompt, showCompletedBadge, handleNext, handlePrev, onClose]);

  if (!isActive) return null;

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
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {lang === 'th' 
                      ? 'ทำความรู้จักกับ 9 ฟีเจอร์หลักที่จะพาคุณตอบโจทย์: ค่าไฟเท่าไหร่ → เพราะอะไร → ลดตรงไหน' 
                      : 'Discover the 9 key features answering: How much → Why → Where to save.'}
                  </p>
                </div>
              </div>

              {/* 9 Tour Steps Summary List */}
              <div className={`p-4 rounded-2xl border mb-5 space-y-2 text-xs font-semibold ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-center justify-between text-[0.7rem] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  <span>{lang === 'th' ? 'สิ่งที่คุณจะได้สำรวจ (9 ขั้นตอน)' : 'What you will explore (9 Steps)'}</span>
                  <span className="flex items-center gap-1 text-amber-500 font-black">
                    <Zap className="w-3 h-3 fill-amber-500" /> +100 XP
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[0.75rem]">
                  {QUICK_START_STEPS.map((s) => (
                    <span key={s.stepNumber} className="flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{lang === 'th' ? s.titleTh : s.titleEn}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Rewards Preview Banner */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-500" />
                  {lang === 'th' ? 'จบแล้วรับรางวัลทันที:' : 'Complete to earn:'}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-amber-500 font-extrabold flex items-center gap-1"><Zap className="w-3 h-3 fill-amber-500" /> +100 XP</span>
                  <span className="text-emerald-500 font-extrabold flex items-center gap-1"><Coins className="w-3 h-3 text-emerald-500" /> +30 Coins</span>
                </span>
              </div>

              {/* 3 Explicit Choices */}
              <div className="space-y-2.5">
                {/* Choice 1: ดูทัวร์ */}
                <button
                  onClick={onStartTour}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white animate-pulse" />
                  <span>{lang === 'th' ? 'เริ่มดูทัวร์แนะนำ (~60 วินาที)' : 'Start Quick Tour (~60s)'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Choice 2: ข้ามไปเลย */}
                  <button
                    onClick={onSkipForNow}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isDarkMode 
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {lang === 'th' ? 'ข้ามไปก่อน' : 'Skip for now'}
                  </button>

                  {/* Choice 3: ไม่ต้องแสดงอีก */}
                  <button
                    onClick={onNeverShowAgain}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
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
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white p-3 px-4 rounded-full shadow-2xl font-extrabold text-xs transition-all border border-emerald-400 cursor-pointer"
              >
                <Eye className="w-4 h-4 animate-bounce" />
                <span>{lang === 'th' ? `เปิด Quick Start Tour (${stepIndex + 1}/9)` : `Show Tour (${stepIndex + 1}/9)`}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, scale: 0.9, y: 15 }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className={isMobile 
                ? "fixed z-[9995] bottom-0 left-0 right-0 w-full pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.15)] rounded-t-[28px]" 
                : "fixed z-[9995] w-full max-w-lg px-4 sm:px-0 pointer-events-auto"
              }
              style={isMobile ? undefined : {
                top: spotlightRect 
                  ? (typeof window !== 'undefined' && spotlightRect.top + spotlightRect.height + 20 > window.innerHeight - 300
                      ? Math.max(16, spotlightRect.top - 280)
                      : spotlightRect.top + spotlightRect.height + 16)
                  : '25%',
                left: spotlightRect
                  ? (typeof window !== 'undefined'
                      ? window.innerWidth < 520
                        ? '16px'
                        : Math.min(window.innerWidth - 480, Math.max(16, spotlightRect.left + (spotlightRect.width / 2) - 240))
                      : '50%')
                  : '50%',
                transform: spotlightRect 
                  ? 'none' 
                  : 'translate(-50%, -50%)',
              }}
            >
              <div className={isMobile
                ? `flex flex-col w-full rounded-t-[28px] overflow-hidden transition-all ${
                    isDarkMode ? 'bg-slate-900 border-t-2 border-emerald-500/40 text-white' : 'bg-white border-t-2 border-emerald-400 text-slate-800'
                  }`
                : `p-5 md:p-6 rounded-[2.2rem] border-2 shadow-2xl backdrop-blur-xl relative transition-all ${
                    isDarkMode 
                      ? 'bg-slate-950/95 border-emerald-500/40 text-white shadow-emerald-950/60' 
                      : 'bg-white/95 border-emerald-400 text-slate-800 shadow-slate-300'
                  }`
              }>
                
                {/* Scrollable Body */}
                <div className={isMobile ? "p-5 md:p-6 pb-2 overflow-y-auto max-h-[55vh] sm:max-h-[60vh] flex flex-col" : "flex flex-col"}>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-2.5 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-xs font-mono whitespace-nowrap">
                        {lang === 'th' ? `ขั้นตอนที่ ${stepIndex + 1}/9` : `Step ${stepIndex + 1}/9`}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 truncate max-w-[140px] sm:max-w-[200px]">
                        {lang === 'th' ? currentStep.categoryTh : currentStep.categoryEn}
                      </span>
                      {isPaused && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 font-extrabold text-[0.65rem] uppercase shrink-0 animate-pulse">
                          {lang === 'th' ? 'ทดลองอิสระ' : 'Paused'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setIsMinimized(true)}
                        className="p-1.5 text-slate-400 hover:text-emerald-500 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        title={lang === 'th' ? 'ย่อหน้าต่าง' : 'Minimize'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        title={lang === 'th' ? 'ข้ามและปิด' : 'Close'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Interactive Quick-Jump Step Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 mb-3 no-scrollbar shrink-0">
                    {QUICK_START_STEPS.map((s, idx) => {
                      const isCurrent = idx === stepIndex;
                      const isDone = idx < stepIndex;
                      return (
                        <button
                          key={s.stepNumber}
                          onClick={() => {
                            setIsPaused(false);
                            setStepIndex(idx);
                          }}
                          className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black transition-all shrink-0 cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-105'
                              : isDone
                                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30'
                                : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'
                          }`}
                          title={lang === 'th' ? s.titleTh : s.titleEn}
                        >
                          {isDone ? '✓' : s.stepNumber}
                        </button>
                      );
                    })}
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
                  <div className="space-y-3 mb-4 shrink-0">
                    <h4 className="font-black text-base sm:text-lg font-display text-emerald-600 dark:text-emerald-400 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                      <span className="break-words">{lang === 'th' ? currentStep.titleTh : currentStep.titleEn}</span>
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium break-words">
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

                  {/* Keyboard Shortcuts Helper Hint */}
                  {!isMobile && (
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2">
                      <Keyboard className="w-3 h-3 text-slate-400" />
                      <span>{lang === 'th' ? 'ปุ่มลัด: ← ย้อนกลับ / → ถัดไป / Space พักไฮไลต์ / Esc ปิด' : 'Keys: ← Back / → Next / Space Pause / Esc Exit'}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Control Bar */}
                <div 
                  className={`flex items-center justify-between border-t border-slate-200 dark:border-slate-800 shrink-0 ${
                    isMobile ? 'p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/50' : 'pt-3'
                  }`}
                  style={isMobile ? { paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' } : undefined}
                >
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isPaused 
                        ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                    style={isMobile ? { minHeight: '48px' } : undefined}
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    <span>{isPaused ? (lang === 'th' ? 'เล่นต่อ' : 'Resume') : (lang === 'th' ? 'ทดลองอิสระ' : 'Pause')}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={stepIndex === 0}
                      className={`px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        stepIndex === 0
                          ? 'opacity-30 cursor-not-allowed text-slate-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                      }`}
                      style={isMobile ? { minHeight: '48px' } : undefined}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{lang === 'th' ? 'ย้อน' : 'Back'}</span>
                    </button>

                    <button
                      onClick={handleNext}
                      className="px-4 py-2 sm:py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1 hover:scale-105 active:scale-95 cursor-pointer"
                      style={isMobile ? { minHeight: '48px' } : undefined}
                    >
                      <span>{stepIndex === QUICK_START_STEPS.length - 1 ? (lang === 'th' ? 'เสร็จสิ้น 🎉' : 'Finish 🎉') : (lang === 'th' ? 'ถัดไป' : 'Next')}</span>
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
              {Array.from({ length: 32 }).map((_, i) => {
                const colors = ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6', '#14B8A6', '#F43F5E'];
                const color = colors[i % colors.length];
                const left = `${(i * 3.2 + 2) % 100}%`;
                const delay = (i % 8) * 0.1;
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
                <span>{lang === 'th' ? 'ทัวร์ครบสมบูรณ์แล้ว!' : 'Tour Completed!'}</span>
              </div>

              <h2 className="text-xl md:text-2xl font-black mb-2">
                {lang === 'th' ? 'ยินดีด้วย! คุณเรียนรู้ครบ 9 ฟีเจอร์หลักแล้ว' : 'Mastered All 9 Features!'}
              </h2>

              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mb-5 leading-relaxed">
                {lang === 'th' 
                  ? 'คุณเข้าใจโครงสร้างการคุมค่าไฟ: สถานการณ์ → หาสาเหตุ → ลดตรงไหน เรียบร้อยแล้ว! รับรางวัลเหรียญและ XP เพื่อเริ่มต้นประหยัดค่าไฟได้ทันที' 
                  : 'You now understand how to track costs, pinpoint causes, and apply actionable savings! Claim your rewards and start saving.'}
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
                <span>{lang === 'th' ? 'รับรางวัล & เริ่มต้นใช้งานเลย' : 'Claim Reward & Get Started'}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
