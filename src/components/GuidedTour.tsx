import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface TourStep {
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  whyMattersTh?: string;
  whyMattersEn?: string;
  whatHappensTh?: string;
  whatHappensEn?: string;
  nextActionTh?: string;
  nextActionEn?: string;
  targetPage: string; // The dashboard page/tab to automatically load
  targetId?: string;  // ID of the target element to spotlight
}

interface GuidedTourProps {
  isActive: boolean;
  startImmediately?: boolean;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onClose: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const TOUR_STEPS: TourStep[] = [
  {
    titleTh: "ยินดีต้อนรับสู่ EduEase Smart Grid",
    titleEn: "Welcome to EduEase Smart Grid",
    descTh: "แอปพลิเคชันนี้ช่วยให้คุณตรวจสอบ วิเคราะห์ และลดค่าไฟฟ้าในองค์กรหรือบ้านของคุณได้อย่างชาญฉลาด เรามาทำความรู้จักกับเครื่องมือหลักกัน!",
    descEn: "This platform helps you monitor, analyze, and smartly reduce your energy costs. Let's get to know the core tools!",
    whyMattersTh: "คุณจะสามารถควบคุมค่าใช้จ่าย ค้นหาจุดรั่วไหล และยืดอายุการใช้งานอุปกรณ์ไฟฟ้าได้",
    whyMattersEn: "You can control costs, locate power leaks, and extend the lifespan of your electrical assets.",
    whatHappensTh: "ระบบจะพาคุณสำรวจหน้าจอทีละส่วนเพื่อทำความเข้าใจการทำงาน",
    whatHappensEn: "The system will guide you through the screens to help you understand the workflow.",
    nextActionTh: "กดปุ่ม 'ถัดไป' เพื่อเริ่มเรียนรู้แดชบอร์ดหลัก",
    nextActionEn: "Click 'Next' to explore the main dashboard.",
    targetPage: "dashboard"
  },
  {
    titleTh: "แดชบอร์ดสรุปข้อมูลพลังงาน",
    titleEn: "Energy Overview Dashboard",
    descTh: "ส่วนนี้คือจุดเริ่มต้นของคุณ แสดงสถานะสำคัญแบบเรียลไทม์ เช่น ค่าไฟสะสม โหลดปัจจุบัน และระดับความตึงเครียดของระบบ (Grid Stress)",
    descEn: "This is your starting point. It displays crucial real-time data like cumulative costs, active loads, and grid stress levels.",
    whyMattersTh: "ช่วยให้รู้ทันทีว่าการใช้ไฟ ณ ตอนนี้อยู่ในระดับที่ปลอดภัยหรือผิดปกติ",
    whyMattersEn: "Instantly know if your current energy usage is healthy or critical.",
    nextActionTh: "ดูตัวเลขสถานะด้านบน แล้วคลิก 'ถัดไป'",
    nextActionEn: "Observe the key metrics at the top, then click 'Next'.",
    targetPage: "dashboard",
    targetId: "tour-step-stats"
  },
  {
    titleTh: "กราฟวิเคราะห์และแปลงค่าไฟ",
    titleEn: "Interactive Analytics & Cost Conversion",
    descTh: "กราฟนี้แสดงพฤติกรรมการใช้ไฟตลอดสัปดาห์ คุณสามารถเอาเมาส์ชี้เพื่อดูว่าการใช้ไฟช่วงนั้นคิดเป็นเงินกี่บาทได้ทันที",
    descEn: "This chart reveals your 7-day energy habits. Hover over any point to see the exact wattage converted directly into currency (฿).",
    whyMattersTh: "คุณจะเห็นชัดเจนว่าช่วงเวลาใดที่ทำให้ค่าไฟแพงที่สุด",
    whyMattersEn: "You will pinpoint the exact peak usage times that drive up your bill.",
    whatHappensTh: "หากคลิกหรือชี้ที่กราฟ จะมีข้อมูลแบบละเอียด (Tooltip) ปรากฏขึ้น",
    whatHappensEn: "Detailed insights appear when interacting with the chart.",
    targetPage: "dashboard",
    targetId: "tour-step-charts"
  },
  {
    titleTh: "สวิตช์ AI ควบคุมอัตโนมัติ",
    titleEn: "Smart AI Override Switches",
    descTh: "เปิดใช้งานระบบผู้ช่วย AI เช่น การตัดไฟแสตนด์บาย (Eco Standby) หรือปรับจูนแอร์ (Smart AC) โดยอัตโนมัติ",
    descEn: "Activate AI assistants to automatically cut standby power (Eco Standby) or auto-tune AC temperatures.",
    whyMattersTh: "ช่วยลดค่าไฟลง 10-30% ได้ทันทีโดยที่คุณไม่ต้องทำอะไรเพิ่ม",
    whyMattersEn: "Effortlessly shave 10-30% off your bills without manual intervention.",
    nextActionTh: "คุณสามารถเปิด-ปิดสวิตช์เหล่านี้ได้อิสระเมื่อจบทัวร์",
    nextActionEn: "You can freely toggle these switches once the tour concludes.",
    targetPage: "dashboard",
    targetId: "tour-step-ai-switches"
  },
  {
    titleTh: "ทะเบียนควบคุมและจัดการอุปกรณ์",
    titleEn: "Node Device Registry",
    descTh: "หน้านี้คือที่รวบรวมเครื่องใช้ไฟฟ้าทั้งหมด คุณสามารถกดเปิด/ปิด (On/Off) ได้โดยตรงจากตาราง",
    descEn: "This page catalogs all your appliances. You can directly turn devices On/Off from this table.",
    whatHappensTh: "ตารางจะแสดงสถานะการกินไฟแบบ Real-time",
    whatHappensEn: "The table reflects real-time power consumption statuses.",
    nextActionTh: "หลังจบทัวร์ ลองติ๊กเลือกอุปกรณ์ 2 ตัว แล้วกดปุ่ม 'เปรียบเทียบข้อมูล' ด้านขวาบน",
    nextActionEn: "Later, try selecting 2 devices and click the 'Side-by-Side' button at the top right.",
    targetPage: "devices",
    targetId: "tour-step-devices-grid"
  },
  {
    titleTh: "ตรวจสุขภาพอุปกรณ์ด้วย Gemini AI",
    titleEn: "Gemini AI Diagnostics",
    descTh: "AI จะทำหน้าที่ตรวจสอบสัญญาณไฟฟ้าระดับลึก (Waveform) เพื่อหาความผิดปกติ ซ่อมบำรุง หรือแนะนำวิธีใช้งานที่ประหยัดขึ้น",
    descEn: "AI analyzes deep electrical waveforms to catch anomalies, suggest maintenance, or optimize usage.",
    whyMattersTh: "ช่วยป้องกันอุปกรณ์พังก่อนเวลา และรู้จุดที่ควรเปลี่ยนอุปกรณ์เก่า",
    whyMattersEn: "Prevents premature equipment failure and identifies outdated energy-hogging appliances.",
    nextActionTh: "กดปุ่ม 'แว่นขยาย' หลังอุปกรณ์ใดก็ได้ แล้วกดปุ่ม 'วิเคราะห์ด้วย AI'",
    nextActionEn: "Click the 'Magnifier' icon on any device row, then select 'Analyze via AI'.",
    targetPage: "devices",
    targetId: "tour-step-devices-controls"
  },
  {
    titleTh: "เครื่องมือคำนวณและวางแผนงบประมาณ",
    titleEn: "Financial Power Calculator",
    descTh: "ที่นี่คุณสามารถทดลองปรับอัตราค่าไฟ และเลื่อนปฏิทินเพื่อดูพยากรณ์งบประมาณล่วงหน้าได้สูงสุด 1 ปี",
    descEn: "Here you can adjust energy tariff rates and slide the calendar to see budget forecasts up to 1 year ahead.",
    whyMattersTh: "ให้คุณวางแผนการเงินล่วงหน้าได้อย่างแม่นยำ ไม่ตกใจเมื่อบิลค่าไฟมาถึง",
    whyMattersEn: "Allows you to accurately plan your finances and avoid bill shock.",
    whatHappensTh: "กราฟและตัวเลขทั้งหมดจะอัปเดตแบบเรียลไทม์ตามเงื่อนไขที่คุณตั้งค่า",
    whatHappensEn: "All charts and metrics update in real-time based on your parameters.",
    targetPage: "calculator",
    targetId: "tour-step-calc-rates"
  },
  {
    titleTh: "แจ้งเตือน & ระบบรักษาความปลอดภัย",
    titleEn: "Alerts & Cyber Security",
    descTh: "หน้านี้ใช้ติดตามการแจ้งเตือนความเสี่ยง เควสประหยัดไฟรายวัน และใช้ AI สแกนความปลอดภัยของระบบโครงข่าย",
    descEn: "Use this page to monitor risk alerts, check daily eco-quests, and trigger AI scans for grid security.",
    whyMattersTh: "ระบบที่ดีคือระบบที่ปลอดภัยจากการถูกขโมยไฟ หรือไฟตก ไฟกระชาก",
    whyMattersEn: "A good grid is secure from power theft, brownouts, and surges.",
    nextActionTh: "หลังจบทัวร์ ลองเลื่อนลงไปด้านล่างสุด แล้วกดปุ่มสีม่วง 'รันสแกนด้วย AI' (AI Log Scan)",
    nextActionEn: "Later, scroll to the bottom and click the purple 'Run AI Scan' button.",
    targetPage: "noti",
    targetId: "tour-step-noti-header"
  },
  {
    titleTh: "คุณพร้อมใช้งานแล้ว!",
    titleEn: "You are ready to go!",
    descTh: "คุณได้เรียนรู้ส่วนประกอบสำคัญทั้งหมดแล้ว เริ่มควบคุมและประหยัดพลังงานกับ EduEase ได้เลย",
    descEn: "You have learned all the essential components. Start controlling and saving energy with EduEase.",
    whatHappensTh: "หากมีข้อสงสัยเพิ่มเติม คุณสามารถกดเปิดเมนู 'คู่มือระบบ (Manual)' ได้ตลอดเวลา",
    whatHappensEn: "If you need further help, you can open the 'User Manual' at any time.",
    nextActionTh: "กดปุ่ม 'ปิด' ด้านบน หรือข้ามทัวร์ เพื่อเริ่มใช้งานจริง",
    nextActionEn: "Click 'Close' or skip the tour to take control.",
    targetPage: "dashboard"
  }
];

// High-value energy saving facts for onboarding carousel
export const ENERGY_TIPS = [
  {
    icon: "fa-thermometer-half",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    titleTh: "💡 เคล็ดลับแอร์ประหยัดขึ้น 10%",
    titleEn: "💡 AC 10% Saving Trick",
    descTh: "ปรับอุณหภูมิแอร์ขึ้นเพียง 1°C (เช่น 25°C เป็น 26°C) ร่วมกับการเปิดพัดลมช่วยกระจายลมเย็น จะตัดภาระกำลังคอมเพรสเซอร์ลดการกระชากไฟได้ทันทีเกือบ 10%",
    descEn: "Raising your AC by just 1°C (e.g., 25°C to 26°C) paired with a small secondary fan trims power consumption on heavy workloads by a steady 10%."
  },
  {
    icon: "fa-plug",
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    titleTh: "💡 ตัดกระแสสแตนด์บาย 10%",
    titleEn: "💡 10% Standby Vampire Load",
    descTh: "เครื่องใช้ไฟฟ้าที่เสียบปลั๊กทิ้งไว้ในโหมดสแตนด์บาย จะใช้กระแสไฟหล่อเลี้ยงเงียบๆ สะสมเป็นสัดส่วนสูงถึง 10% ของบิลไฟทั้งหมด ควรถอดปลั๊กหรือใช้รางไฟอัจฉริยะตัดกระแส",
    descEn: "Idle components left on standby draw a steady phantom load, accounting for up to 10% of standard home bills. Fully switch off power strips or use smart plugs."
  },
  {
    icon: "fa-clock",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    titleTh: "💡 จูนเวลา Off-Peak ลดงบ 30%",
    titleEn: "💡 30% Off-Peak Shifts",
    descTh: "วางแผนย้ายปริมาณการใช้ไฟฟ้าหนัก (เช่น ตั้งชาร์จรถ EV, ปั๊มน้ำ, ซักผ้าอบสัมภาระ) ไปยังเวลานอกความต้องการหนาแน่น (Off-Peak) ชาร์จไฟถูกกว่าเดิมสูงสุด 30% ในอัตรา TOU",
    descEn: "Shifting heavy energy operations (charging EVs, pumps, laundry) into Off-Peak windows saves around 30% under structural Time-of-Use pricing options."
  }
];

export const GuidedTour: React.FC<GuidedTourProps> = ({
  isActive,
  startImmediately = false,
  lang,
  isDarkMode,
  onClose,
  currentPage,
  setCurrentPage,
}) => {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [showPrompt, setShowPrompt] = React.useState(!startImmediately);
  const [animateKey, setAnimateKey] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [activeTipIndex, setActiveTipIndex] = React.useState(0);
  const [spotlightRect, setSpotlightRect] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  React.useEffect(() => {
    if (!isActive) return;
    if (startImmediately) {
      setShowPrompt(false);
    }
  }, [startImmediately, isActive]);

  // Automated interval to cycle through energy savings tips inside the onboarding dialog
  React.useEffect(() => {
    if (!showPrompt) return;
    const interval = setInterval(() => {
      setActiveTipIndex((prev) => (prev + 1) % ENERGY_TIPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [showPrompt]);

  const currentStep = TOUR_STEPS[stepIndex];

  // Helper function to query the element and compute its viewport boundaries (NO automatic scrolling here)
  const updateSpotlightPosition = React.useCallback(() => {
    if (!isActive) return;
    if (showPrompt) {
      setSpotlightRect(null);
      return;
    }
    if (!currentStep || !currentStep.targetId) {
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
  }, [showPrompt, currentStep, isActive]);

  // Helper function to scroll the current spotlight target into view (called only on step transition)
  const scrollTargetIntoView = React.useCallback(() => {
    if (!isActive || showPrompt || !currentStep || !currentStep.targetId) return;
    const element = document.getElementById(currentStep.targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showPrompt, currentStep, isActive]);

  // Handle page transitions and track visual elements, then trigger initial scroll
  React.useEffect(() => {
    if (!isActive) return;
    if (!showPrompt && currentStep) {
      if (currentPage !== currentStep.targetPage) {
        setCurrentPage(currentStep.targetPage);
      }
      
      // Allow a tiny delay for tab page transition before scrolling
      const t = setTimeout(() => {
        scrollTargetIntoView();
        updateSpotlightPosition();
      }, 150);
      return () => clearTimeout(t);
    }
  }, [stepIndex, showPrompt, currentStep, currentPage, setCurrentPage, isActive, scrollTargetIntoView, updateSpotlightPosition]);

  // Recalculate coordinates on page changes, scrolling, and window resizes
  React.useEffect(() => {
    if (!isActive) return;
    updateSpotlightPosition();

    window.addEventListener('resize', updateSpotlightPosition, { passive: true });
    window.addEventListener('scroll', updateSpotlightPosition, { passive: true });

    // Staggered intervals to query the DOM as page tabs load and settle
    const timeouts = [100, 300, 600, 1000, 1500].map(delay =>
      setTimeout(updateSpotlightPosition, delay)
    );

    return () => {
      window.removeEventListener('resize', updateSpotlightPosition);
      window.removeEventListener('scroll', updateSpotlightPosition);
      timeouts.forEach(clearTimeout);
    };
  }, [stepIndex, showPrompt, currentPage, updateSpotlightPosition, isActive]);

  if (!isActive) return null;

  const handleNext = () => {
    setAnimateKey(prev => prev + 1);
    setIsPaused(false); // Auto-resume spotlight on step change
    if (stepIndex < TOUR_STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    setAnimateKey(prev => prev + 1);
    setIsPaused(false); // Auto-resume spotlight on step change
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleSkipTour = () => {
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {/* Global Darkened Masking Backdrop (active only when not paused) */}
        {!showPrompt && !isPaused && (
          <motion.div
            className="fixed inset-0 bg-slate-950/[0.02] z-[9985] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Interactive Spotlight Focused Ring with Spring Coordinates and Pulsing Neon Glow */}
      {!showPrompt && spotlightRect && (
        <motion.div
          className={`fixed z-[9990] pointer-events-none rounded-3xl border-[3.5px] transition-colors duration-300`}
          style={{
            borderColor: isPaused ? 'rgba(245, 158, 11, 0.95)' : 'rgba(52, 211, 153, 1)',
            borderStyle: isPaused ? 'dashed' : 'solid',
          }}
          initial={false}
          animate={{
            top: spotlightRect.top - 12,
            left: spotlightRect.left - 12,
            width: spotlightRect.width + 24,
            height: spotlightRect.height + 24,
            boxShadow: isPaused
              ? [
                  "0 0 16px rgba(245, 158, 11, 0.6), 0 0 40px rgba(245, 158, 11, 0.3), 0 0 0 9999px rgba(15, 23, 42, 0.45)",
                  "0 0 32px rgba(245, 158, 11, 0.9), 0 0 70px rgba(245, 158, 11, 0.5), 0 0 0 9999px rgba(15, 23, 42, 0.45)"
                ]
              : [
                  "0 0 0 8px rgba(16, 185, 129, 0.7), 0 0 45px rgba(52, 211, 153, 0.8), 0 0 0 9999px rgba(3, 7, 18, 0.68)",
                  "0 0 0 20px rgba(16, 185, 129, 0.35), 0 0 75px rgba(52, 211, 153, 0.95), 0 0 0 9999px rgba(3, 7, 18, 0.68)"
                ]
          }}
          transition={{
            top: { type: 'spring', stiffness: 120, damping: 18 },
            left: { type: 'spring', stiffness: 120, damping: 18 },
            width: { type: 'spring', stiffness: 120, damping: 18 },
            height: { type: 'spring', stiffness: 120, damping: 18 },
            boxShadow: { repeat: Infinity, repeatType: "mirror", duration: 1.5, ease: "easeInOut" }
          }}
        >
          {/* Neon Pointer Arrow/Badge floating at the bottom right of the spotlight with spring scaling */}
          <motion.div 
            className={`absolute -bottom-6 -right-6 flex items-center gap-1.5 text-white font-mono text-[0.7rem] uppercase font-black p-1.5 px-3.5 rounded-full shadow-lg border`}
            style={{
              background: isPaused 
                ? 'linear-gradient(to right, #f59e0b, #d97706)' 
                : 'linear-gradient(to right, #10b981, #059669)',
              borderColor: isPaused ? '#fcd34d' : '#6ee7b7',
              boxShadow: isPaused ? '0 4px 12px rgba(245, 158, 11, 0.3)' : '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            <span>{isPaused ? (lang === 'th' ? 'ทดลองอิสระ' : 'PAUSED') : (lang === 'th' ? 'จุดเด่นตรงนี้' : 'LOOK HERE')}</span>
            <i className={`fas ${isPaused ? 'fa-pen-square' : 'fa-hand-pointer'} text-[0.75rem] animate-pulse`}></i>
          </motion.div>
        </motion.div>
      )}

      {/* Onboarding Dialog Prompt (Welcome Modal) */}
      <AnimatePresence>
        {showPrompt && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              className={`w-full max-w-lg p-6 md:p-8 rounded-[2.5rem] border shadow-2xl my-auto max-h-[95vh] overflow-y-auto ${
                isDarkMode 
                  ? 'bg-slate-900 border-emerald-500/30 text-white shadow-emerald-950/40' 
                  : 'bg-white border-emerald-250 text-slate-800 shadow-slate-100'
              }`}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  className={`p-4 rounded-2xl ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <i className="fas fa-graduation-cap text-2xl"></i>
                </motion.div>
                <div>
                  <h4 className="font-display font-black text-lg md:text-xl leading-tight">
                    {lang === 'th' ? 'ระบบช่วยนำสอนรูปแบบ Spotlight!' : 'EduEase Spotlight Guided Tour'}
                  </h4>
                  <p className="text-[0.75rem] text-emerald-500 font-bold uppercase tracking-widest font-mono">Interactive Tutorial</p>
                </div>
              </div>

              <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'th'
                  ? 'ยินดีต้อนรับสู่ระบบพาชมประสิทธิภาพของเรา! ระบบจะกึ่งหรี่ไฟสีเทาครอบคลุมหน้าจอส่วนอื่นๆ และเว้นช่องแสง (Spotlight) ให้สว่างโร่ ณ บริเวณที่กำลังประยุกต์สอน พร้อมหน้ากากโมชันลื่นไหล เพื่อลดส่วนรบกวนสายตาและทำให้วิทยาทัศน์เด่นชัดที่สุด!'
                  : 'Welcome to our premium Spotlight tour! It dims non-critical elements into soft gray shadows to illuminate active control modules seamlessly, complete with fluid elastic slide motions that focus your view.'}
              </p>

              {/* Quick Tips Section (Carousel) */}
              <div className={`p-4 rounded-3xl border mb-6 transition-all relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-slate-950/60 border-slate-800/80 text-white' 
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[0.75rem] tracking-widest font-black uppercase text-emerald-500 font-mono">
                      {lang === 'th' ? "สาระน่ารู้อนุรักษ์พลังงาน (QUICK TIPS)" : "ENERGY SAVING FACTS"}
                    </span>
                  </div>
                  {/* Manual transition dots */}
                  <div className="flex gap-1.5">
                    {ENERGY_TIPS.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTipIndex(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          activeTipIndex === idx 
                            ? 'bg-emerald-500 w-3' 
                            : isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                        title={`Tip ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTipIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-3 items-start"
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border mt-0.5 ${ENERGY_TIPS[activeTipIndex].color}`}>
                      <i className={`fas ${ENERGY_TIPS[activeTipIndex].icon} text-sm`}></i>
                    </div>
                    <div>
                      <h6 className="text-[0.8rem] font-black tracking-tight mb-1 font-display">
                        {lang === 'th' ? ENERGY_TIPS[activeTipIndex].titleTh : ENERGY_TIPS[activeTipIndex].titleEn}
                      </h6>
                      <p className={`text-[0.75rem] leading-relaxed mb-0 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {lang === 'th' ? ENERGY_TIPS[activeTipIndex].descTh : ENERGY_TIPS[activeTipIndex].descEn}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleSkipTour}
                  className={`w-full py-3.5 rounded-2xl text-xs font-black transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    isDarkMode 
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm'
                  }`}
                >
                  <i className="fas fa-forward me-1.5"></i>
                  {lang === 'th' ? 'ข้ามและเริ่มใช้งาน' : 'Skip & Start'}
                </button>
                <button
                  onClick={() => {
                    setShowPrompt(false);
                    setStepIndex(0);
                    setIsPaused(false);
                  }}
                  className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <i className="fas fa-play-circle me-1.5 animate-pulse"></i>
                  {lang === 'th' ? 'เริ่มต้นนำสอน' : 'Start Walkthrough'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Tutorial Info Box Overlay */}
      <AnimatePresence>
        {!showPrompt && (
          isMinimized ? (
            <motion.div
              key="minimized-tour"
              className="fixed inset-x-4 bottom-4 md:bottom-8 md:right-8 md:left-auto z-[9999] max-w-sm w-full mx-auto md:mx-0 p-3 rounded-2xl border bg-slate-950/95 border-emerald-500/50 text-white flex items-center justify-between shadow-2xl backdrop-blur-md"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <div className="flex items-center gap-2 overflow-hidden mr-2">
                <span className="w-6 h-6 rounded-xl bg-emerald-500 text-[0.75rem] text-white flex items-center justify-center font-black shrink-0 animate-pulse">
                  {stepIndex + 1}
                </span>
                <span className="text-[0.8rem] font-bold truncate">
                  {lang === 'th' ? currentStep.titleTh : currentStep.titleEn}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMinimized(false)}
                  className="p-1.5 px-3 bg-emerald-500 hover:bg-emerald-600 transition-all text-white rounded-xl text-[0.75rem] font-black flex items-center gap-1 hover:scale-105 active:scale-95"
                >
                  <i className="fas fa-expand-alt text-[0.75rem]"></i>
                  <span>{lang === 'th' ? 'ขยายคำสอน' : 'Expand'}</span>
                </button>
                <button 
                  type="button"
                  onClick={handleSkipTour} 
                  className="text-slate-500 hover:text-rose-500 transition-colors p-1"
                  title={lang === 'th' ? 'ข้ามทั้งหมด' : 'Skip All'}
                >
                  <i className="fas fa-times-circle text-sm"></i>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="expanded-tour"
              className="fixed inset-x-4 bottom-4 md:bottom-8 md:right-8 md:left-auto z-[9999] max-w-md w-full mx-auto md:mx-0"
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <div className={`p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border-2 shadow-2xl transition-all duration-300 relative ${
                isDarkMode 
                  ? 'bg-slate-950/95 border-emerald-500/50 text-white shadow-emerald-950/45' 
                  : 'bg-white/95 border-emerald-500/40 text-slate-900 shadow-slate-300/60'
              } backdrop-blur-md`}>
                
                {/* Pulsing floating index point with Dynamic Accent Ring */}
                <div className="absolute -top-3 -left-3">
                  <span className="flex h-7 w-7 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isPaused ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-7 w-7 items-center justify-center text-xs text-white font-black transition-colors duration-300 ${
                      isPaused ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}>
                      {stepIndex + 1}
                    </span>
                  </span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[0.7rem] md:text-[0.75rem] uppercase font-mono font-black tracking-wider ${
                    isPaused ? 'text-amber-500' : 'text-emerald-500'
                  }`}>
                    {lang === 'th' 
                      ? `คำแนะนำทีละขั้นตอน (${stepIndex + 1}/${TOUR_STEPS.length})` 
                      : `Spotlight Guide (${stepIndex + 1}/${TOUR_STEPS.length})`}
                    {isPaused && (lang === 'th' ? ' [หยุดชั่วคราว]' : ' [PAUSED]')}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    {/* Minimize toggle */}
                    <button 
                      type="button"
                      onClick={() => setIsMinimized(true)}
                      className="text-slate-500 hover:text-emerald-500 transition-colors text-xs p-1"
                      title={lang === 'th' ? 'พับ/ย่อหน้าต่างบดบัง' : 'Minimize / Collapse Box'}
                    >
                      <i className="fas fa-compress-alt text-base"></i>
                    </button>
                    <button 
                      type="button"
                      onClick={handleSkipTour} 
                      className="text-slate-500 hover:text-rose-500 transition-colors text-xs p-1"
                      title={lang === 'th' ? 'ข้ามทั้งหมด' : 'Skip All'}
                    >
                      <i className="fas fa-times-circle text-base"></i>
                    </button>
                  </div>
                </div>

                {/* Slim Smooth Progress Bar indicator */}
                <div className="w-full bg-slate-200 dark:bg-slate-800/80 h-1.5 rounded-full mb-4 overflow-hidden relative">
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((stepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  />
                </div>

                {/* Slideable Animated Content Wrapper */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`${stepIndex}-${isPaused}`} 
                    className="space-y-2 mb-4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <h5 className="font-display font-black text-xs md:text-base tracking-tight text-primary flex items-center gap-1.5 mb-2">
                      <i className={`fas ${isPaused ? 'fa-pause-circle text-amber-500 animate-pulse' : 'fa-lightbulb text-emerald-400'}`}></i>
                      <span>{lang === 'th' ? currentStep.titleTh : currentStep.titleEn}</span>
                    </h5>
                    
                    {isPaused ? (
                      <div className={`p-3 rounded-xl border text-[0.75rem] md:text-xs leading-relaxed transition-all ${
                        isDarkMode 
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' 
                          : 'bg-amber-50/90 border-amber-200 text-amber-900 shadow-sm'
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold mb-1">
                          <i className="fas fa-user-edit animate-pulse text-amber-500"></i>
                          <span>{lang === 'th' ? 'เปิดโหมดใช้งานอิสระ!' : 'Free Interaction Mode Active!'}</span>
                        </div>
                        <p className="text-[0.75rem] md:text-[0.8rem] opacity-90 leading-relaxed">
                          {lang === 'th'
                            ? 'เราซ่อนม่านแสงไว้ชั่วคราว คุณสามารถทดลองใช้งาน คลิกหรือปรับค่าต่างๆ ได้อย่างอิสระ เมื่อพร้อมไปขั้นตอนถัดไป ให้กด [เล่นทัวร์ต่อ] หรือคลิก [ถัดไป]'
                            : 'Deactivated blocking overlays! You may now interact freely with the UI. Click [Resume Spotlight] or [Next] to bring back active focus.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className={`text-[0.8rem] md:text-[0.85rem] leading-relaxed select-all-text transition-all duration-300 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                          {lang === 'th' ? currentStep.descTh : currentStep.descEn}
                        </p>
                        
                        {(currentStep.whyMattersEn || currentStep.whatHappensEn || currentStep.nextActionEn) && (
                          <div className={`mt-3 p-3 rounded-xl text-[0.75rem] border ${isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                            {currentStep.whyMattersEn && (
                              <div className="mb-2">
                                <span className="font-bold text-emerald-500 dark:text-emerald-400 block mb-0.5"><i className="fas fa-bullseye me-1.5"></i>{lang === 'th' ? 'ทำไมสิ่งนี้ถึงสำคัญ?' : 'Why this matters:'}</span>
                                <span className="leading-relaxed">{lang === 'th' ? currentStep.whyMattersTh : currentStep.whyMattersEn}</span>
                              </div>
                            )}
                            {currentStep.whatHappensEn && (
                              <div className="mb-2">
                                <span className="font-bold text-indigo-500 dark:text-indigo-400 block mb-0.5"><i className="fas fa-bolt me-1.5"></i>{lang === 'th' ? 'เมื่อใช้งานแล้วจะเกิดอะไรขึ้น?' : 'What happens after:'}</span>
                                <span className="leading-relaxed">{lang === 'th' ? currentStep.whatHappensTh : currentStep.whatHappensEn}</span>
                              </div>
                            )}
                            {currentStep.nextActionEn && (
                              <div>
                                <span className="font-bold text-sky-500 dark:text-sky-400 block mb-0.5"><i className="fas fa-hand-pointer me-1.5"></i>{lang === 'th' ? 'คุณควรทำอะไรต่อไป:' : 'What to do next:'}</span>
                                <span className="leading-relaxed">{lang === 'th' ? currentStep.nextActionTh : currentStep.nextActionEn}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Page indicator & Pause pill wrapper */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <div className={`p-1 md:p-1.5 px-2 md:px-2.5 rounded-lg md:rounded-xl inline-flex items-center gap-1.5 text-[0.65rem] md:text-[0.7rem] font-mono font-bold uppercase ${
                        isDarkMode ? 'bg-slate-900/85 text-emerald-400' : 'bg-slate-100 text-emerald-800'
                      }`}>
                        <i className="fas fa-eye"></i>
                        <span>{lang === 'th' ? 'แท็บ: ' : 'Page: '}{currentStep.targetPage.toUpperCase()}</span>
                      </div>

                      {/* Pause/Interactive Play Button */}
                      <button
                        type="button"
                        onClick={() => setIsPaused(!isPaused)}
                        className={`p-1 md:p-1.5 px-2 md:px-2.5 rounded-lg md:rounded-xl inline-flex items-center gap-1.5 text-[0.65rem] md:text-[0.7rem] font-mono font-black uppercase transition-all duration-300 border hover:scale-105 active:scale-95 ${
                          isPaused
                            ? 'bg-amber-500/20 border-amber-400/50 text-amber-500 hover:bg-amber-500/30 font-extrabold'
                            : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 shadow-sm'
                        }`}
                        title={lang === 'th' ? 'คลิกเพื่อเปลี่ยนโหมดชั่วคราว' : 'Click to toggle modes'}
                      >
                        <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'}`}></i>
                        <span>
                          {isPaused
                            ? (lang === 'th' ? 'เล่นสปอตไลท์ต่อ' : 'Resume Spotlight')
                            : (lang === 'th' ? 'หยุดส่องชั่วคราวเพื่อเล่นเว็บ' : 'Pause Overlay')}
                        </span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation and Controls */}
                <div className="flex justify-between items-center gap-3 pt-2 border-t border-slate-500/10">
                  <button
                    type="button"
                    onClick={handleSkipTour}
                    className="text-[0.65rem] md:text-[0.7rem] uppercase font-bold tracking-wider text-slate-500 hover:text-rose-500 transition-colors"
                  >
                    {lang === 'th' ? 'ข้ามทั้งหมด' : 'Skip Tour'}
                  </button>
                  
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={stepIndex === 0}
                      className={`p-1 px-2 md:p-2 md:px-3 rounded-lg md:rounded-xl text-[0.75rem] md:text-xs font-black transition-all ${
                        stepIndex === 0 
                          ? 'opacity-30 cursor-not-allowed text-slate-500 border border-transparent' 
                          : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/10'
                      }`}
                    >
                      <i className="fas fa-chevron-left me-1 text-[0.7rem] md:text-[0.75rem]"></i>
                      {lang === 'th' ? 'ย้อนคง' : 'Back'}
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-1 px-2.5 md:p-2 md:px-3.5 bg-primary hover:bg-primary/95 text-white rounded-lg md:rounded-xl text-[0.75rem] md:text-xs font-black transition-all shadow-md shadow-primary/25 hover:scale-105 flex items-center gap-1"
                    >
                      <span>{stepIndex === TOUR_STEPS.length - 1 ? (lang === 'th' ? 'เสร็จสิ้น' : 'Finish') : (lang === 'th' ? 'ถัดไป' : 'Next')}</span>
                      <i className="fas fa-chevron-right text-[0.7rem] md:text-[0.75rem]"></i>
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
