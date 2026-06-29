import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface TourStep {
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
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
    titleTh: "ยินดีต้อนรับสู่ภารกิจควบคุม EduEase Smart Grid!",
    titleEn: "Welcome to your EduEase Smart Grid Mission!",
    descTh: "ระบบช่วยเหลือแบบกึ่ง Spotlight นี้จะพาคุณไปสำรวจควบคุมนวัตกรรมพลังงานแบบจับมือทำ โดยจะกึ่งหรี่หน้าจอในส่วนอื่นๆ และเน้นแสงสว่างไฟส่องอินเทอร์เฟซหลัก (Spotlight Element) เพื่อให้คุณเรียนรู้ทุกเครื่องมือสำคัญได้อย่างราบรื่นและมีสมาธิสูงสุด!",
    descEn: "This guided Spotlight tour dims secondary container panels to beautifully illuminate key control HUD modules. Follow individual steps to master subgrid operations, automated energy-saving overrides, and server-side Gemini AI features.",
    targetPage: "dashboard"
  },
  {
    titleTh: "1. แดชบอร์ดตรวจสอบและดัชนีโทรมาตรหลัก",
    titleEn: "1. Real-time Telemetry KPI Indicators",
    descTh: "ชี้วัดหัวใจสำคัญ: อัตราเผาผลาญงบ (Burn Rate ฿/วัน), สัดส่วนโหลดสะสมช่วงไฟฟ้าแพง (On-Peak TOU), และระดับความเครียดของหม้อแปลงกริด (Grid Stress %) ตรวจสอบสัญญาณเตือนทันทีเพื่อป้องกันระบบขัดข้องล่วงหน้า",
    descEn: "Key indicators here show active subgrid properties: Financial Burn Rate (฿/Day), Peak pricing exposure under Time-of-Use hours, and cumulative Substation Stress. Observe telemetry carefully to avoid grid overloads.",
    targetPage: "dashboard",
    targetId: "tour-step-stats"
  },
  {
    titleTh: "2. กราฟพฤติกรรมข้อมูลพลังงานพร้อมประเมินราคาเรียลไทม์",
    titleEn: "2. Interactive Analytics & Baht Conversion",
    descTh: "วิเคราะห์กราฟเทคโนโลยีแบบสัมผัสสัมประสิทธิ์: สามารถเลื่อนเมาส์หรือจิ้มจุดหมุดข้อมูลเพื่อเปิดใช้งาน Custom Tooltip ระบบจะคำนวณกำลังวัตต์ชั่วโมงเฉลี่ย แปลงออกมาเป็นมูลค่าเงินบาท (฿) จริง ณ วินาทีนั้นๆ ให้โดยอัตโนมัติ!",
    descEn: "Observe dynamic load shifts over 7 days. Hover or tap coordinates on the analytical charts to trigger custom tooltips, dynamically converting current active wattage loads directly into Baht (฿) currency metrics.",
    targetPage: "dashboard",
    targetId: "tour-step-charts"
  },
  {
    titleTh: "3. ระบบสวิตช์ AI ควบคุมและประหยัดพลังงานอัตโนมัติ",
    titleEn: "3. Adaptive AI Override Switches",
    descTh: "โมดูลล้ำสมัย: สลับเลื่อนสวิตช์เปิดใช้ระบบถนอมกำลังอัจฉริยะ (Smart AC Offset, Eco Standby, Smart Load Shift, PF Auto-Tuning) เพื่อสั่งการอัลกอริทึมจำลอง ปรับแต่งหรือโยกย้ายกำลังไฟในช่วงเวลาวิกฤตได้อย่างอัตโนมัติ",
    descEn: "Control terminal switches for AI-driven subgrid optimization. Toggle Smart AC Tuning, Eco Standby protection, Smart Load Shifting, or Power Factor Auto-Tuning to let algorithms safely balance and shave Peak demands.",
    targetPage: "dashboard",
    targetId: "tour-step-ai-switches"
  },
  {
    titleTh: "4. ระบบบริหารอุปกรณ์และแผงเปรียบเทียบข้อมูลรายคู่",
    titleEn: "4. Node Device Registry & Comparison Board",
    descTh: "ควบคุมสวิตช์ ON/OFF บนตารางเครื่องใช้ไฟฟ้ารายคัตเอาต์เพื่อตัดไฟ หรือกดปุ่ม 'เพิ่มอุปกรณ์ใหม่' (Add Appliance) นอกจากนี้ยังสามารถเลือกเครื่องใช้ไฟฟ้าหลายชุดเพื่อกดปุ่ม 'เปรียบเทียบข้อมูล' เพื่อขึ้นจอสรุปผลสถิติเคียงคู่กันได้ทันที!",
    descEn: "Toggle cut-out switches in the grid, add new appliances dynamically, or select multiple nodes and trigger the custom 'Side-by-Side Comparison Board' to evaluate load distribution, costs, and power factors on joint metrics.",
    targetPage: "devices",
    targetId: "tour-step-devices-grid"
  },
  {
    titleTh: "5. ปัญญาประดิษฐ์ประเมินและวิเคราะห์เครื่องรายเครื่อง",
    titleEn: "5. Individual Device Gemini AI Diagnostics",
    descTh: "เจาะลึกระบบฟิสิกส์: กดปุ่ม แว่นขยาย หลังอุปกรณ์เพื่อดูตัวเลขละเอียด (Uptime, Distortion, Power Factor) แล้วคลิก 'วิเคราะห์อุปกรณ์ด้วย AI' เพื่อส่งประวัติบันทึกให้ Google Gemini AI วางแผนซ่อมบำรุงและออกคะแนนเสถียรภาพ (Health Score)",
    descEn: "Examine detailed phase metrics by clicking the Magnifier icon in any device row. Tap 'Analyze via AI' to transmit active log strings to Google Gemini, retrieving real-time stability metrics, wears rates, and safety guidelines.",
    targetPage: "devices",
    targetId: "tour-step-devices-controls"
  },
  {
    titleTh: "6. แผงจำลองอัตรา Sandbox และพยากรณ์งบนาน 1 ปี",
    titleEn: "6. Tariff Sandbox & Financial Forecasting",
    descTh: "หน้านี้อนุญาตให้คุณทดสอบปรับปรุงราคาอัตราค่าไฟต่อหน่วย (฿/kWh) และสไลด์ปฏิทินตั้งแต่ 1 วัน ถึง 365 วัน เพื่อพยากรณ์สัดส่วนการกินเงินค่าไฟล่วงหน้า พร้อมแยกแยะหมวดหมู่อุปกรณ์ผ่านกราฟวงกลมแยกสีอย่างเป็นระเบียบ",
    descEn: "Venture into the sandbox. Edit base energy utility charges and glide the range slider from 1 to 365 days. Track multi-month financial projections based on active loads, and check the colorful category allocation charts.",
    targetPage: "calculator",
    targetId: "tour-step-calc-rates"
  },
  {
    titleTh: "7. ความปลอดภัยทางไซเบอร์และสแกนประวัติล็อกด้วย AI",
    titleEn: "7. Cyber Grid Audit & AI Waveform Scan",
    descTh: "เกราะป้องกันกริดสูงสุด: ตรวจเช็คกล่องการแจ้งเตือนและรายการเควสประหยัดพลังงาน แต่อย่าลืมกดปุ่มส่องสว่างสีม่วงด้านล่างสุดของหน้านี้เพื่อรัน AI Log Integrity Scan ตรวจจับเครื่องใช้สวมรอยขุดเหมือง หรือการลักกระแสไฟในระบบ!",
    descEn: "A secure subgrid is a stable one. View local alert logs and eco quests, and trigger the custom 'AI Log Integrity Scan' powered by Gemini on current waveforms to isolate anomalies, illegal power bypasses, or cryptojacking signatures.",
    targetPage: "noti",
    targetId: "tour-step-noti-header"
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
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-350 ${
                          activeTipIndex === idx 
                            ? 'bg-emerald-500 w-3' 
                            : isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-350 hover:bg-slate-400'
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
                      <p className={`text-[0.75rem] leading-relaxed mb-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
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
                  className="text-slate-400 hover:text-rose-500 transition-colors p-1"
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
                      className="text-slate-400 hover:text-emerald-500 transition-colors text-xs p-1"
                      title={lang === 'th' ? 'พับ/ย่อหน้าต่างบดบัง' : 'Minimize / Collapse Box'}
                    >
                      <i className="fas fa-compress-alt text-base"></i>
                    </button>
                    <button 
                      type="button"
                      onClick={handleSkipTour} 
                      className="text-slate-400 hover:text-rose-500 transition-colors text-xs p-1"
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
                    <h5 className="font-display font-black text-xs md:text-base tracking-tight text-primary flex items-center gap-1.5">
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
                          <span>{lang === 'th' ? 'เปิดระบบทดลองเล่นอิสระ!' : 'Free Interaction Mode Active!'}</span>
                        </div>
                        <p className="text-[0.75rem] md:text-[0.8rem] opacity-90 leading-relaxed">
                          {lang === 'th'
                            ? 'เราซ่อนม่านแสงบล็อคชั่วคราวแล้ว คุณสามารถสลับเมนู คลิกสวิตช์ หรือทดลองปรับหน้าเว็บได้อย่างสะดวกรวดเร็ว! เมื่อพร้อมไปขั้นตอนถัดไป ให้กด [เล่นทัวร์ต่อ] หรือคลิก [ถัดไป] แฟลชสปอตไลท์จะกลับมาส่องทันที'
                            : 'Deactivated dark blocking overlays! You may now toggle breakers inside the table, type variables, or play with sliders interactively. Click [Resume Spotlight] or [Next] to bring back active focus.'}
                        </p>
                      </div>
                    ) : (
                      <p className={`text-[0.8rem] md:text-xs leading-relaxed select-all-text transition-all duration-300 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {lang === 'th' ? currentStep.descTh : currentStep.descEn}
                      </p>
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
                    className="text-[0.65rem] md:text-[0.7rem] uppercase font-bold tracking-wider text-slate-400 hover:text-rose-500 transition-colors"
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
