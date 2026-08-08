import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateApplianceEnergy } from '@/utils/calculations';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  Coins, 
  BookOpen, 
  Lightbulb, 
  Calculator, 
  Snowflake, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  ShieldCheck, 
  Award, 
  Clock, 
  Info,
  TrendingDown,
  HelpCircle,
  BarChart3,
  Globe
} from 'lucide-react';
import { Lesson, LearningPath } from '../../types';
import { Confetti } from '../Confetti';

interface LearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson?: Lesson | null;
  path?: LearningPath | null;
  onCompleteLesson: (lessonId: string, xp: number) => void;
  onRewardCoins?: (coins: number, xp: number) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const LearningModal: React.FC<LearningModalProps> = ({
  isOpen,
  onClose,
  lesson,
  path,
  onCompleteLesson,
  onRewardCoins,
  lang,
  isDarkMode
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('deep_dive');

  // Interactive Mini-Demo State inside Lesson
  const [acTemp, setAcTemp] = useState(25);
  const [useFan, setUseFan] = useState(true);
  const [wattsInput, setWattsInput] = useState(1000);
  const [hoursInput, setHoursInput] = useState(8);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSelectedOption(null);
      setQuizSubmitted(false);
      setIsCorrect(false);
      setShowConfetti(false);
    }
  }, [isOpen, lesson]);

  if (!isOpen || !lesson) return null;

  const totalSteps = 4; // Step 1: Overview & Concept, Step 2: Visual Comparison & Interactive Simulator, Step 3: AI Advice & Key Takeaways, Step 4: Knowledge Check Quiz
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === totalSteps) {
      // Complete lesson
      onCompleteLesson(lesson.id, lesson.xpReward);
      if (onRewardCoins) {
        onRewardCoins(25, lesson.xpReward);
      }
      setShowConfetti(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === lesson.correctIndex;
    setQuizSubmitted(true);
    setIsCorrect(correct);
    if (correct) {
      setShowConfetti(true);
      if (onRewardCoins) onRewardCoins(30, lesson.xpReward);
    }
  };

  // Calculations for interactive lesson widgets
  const { monthlyCost: monthlyCostDemoExact } = calculateApplianceEnergy(wattsInput, hoursInput);
  const monthlyCostDemo = Math.round(monthlyCostDemoExact);
  const acSavingPct = (acTemp - 24) * 8 + (useFan ? 6 : 0);
  const acCostEstimate = Math.max(350, Math.round(1400 * (1 - acSavingPct / 100)));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-950/70 backdrop-blur-md transition-all">
        {showConfetti && <Confetti triggerCount={showConfetti ? 1 : 0} />}

        {/* Modal Container: Mobile Bottom Sheet (<768px) vs Desktop Dialog (>=768px) */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className={`w-full md:max-w-[760px] h-[90vh] md:h-auto md:max-h-[88vh] rounded-t-[28px] md:rounded-[28px] border shadow-2xl flex flex-col overflow-hidden relative ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-white shadow-emerald-950/40' 
              : 'bg-white border-emerald-100 text-slate-900 shadow-emerald-500/10'
          }`}
        >
          {/* Mobile Drag Handle Bar */}
          <div className="md:hidden pt-3 pb-1 flex justify-center shrink-0">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>

          {/* Sticky Header Bar */}
          <div className="sticky top-0 z-30 px-6 pt-3 pb-4 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
                    Step {currentStep} of {totalSteps} • {lang === 'th' ? 'ศูนย์เรียนรู้พลังงาน' : 'Learning Journey'}
                  </span>
                  <h4 className="text-sm font-black font-display line-clamp-1 text-slate-900 dark:text-white">
                    {lang === 'th' ? lesson.titleTh : lesson.titleEn}
                  </h4>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar & Badges Header */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[13px] font-extrabold">
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-500" />
                  {lesson.readTime} • +{lesson.xpReward} XP
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                  {progressPercent}% Complete
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>

          {/* Scrollable Content Body (24px horizontal padding, 24px vertical spacing) */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-none">
            {/* STEP 1: Core Concept & Overview */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Hero Lesson Header */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[13px]">
                    <Zap className="w-4 h-4 fill-emerald-500" />
                    {lang === 'th' ? 'บทเรียนพื้นฐานสำคัญ' : 'Core Concept'}
                  </div>
                  <h2 className="text-[28px] font-black font-display leading-tight text-slate-900 dark:text-white">
                    {lang === 'th' ? lesson.titleTh : lesson.titleEn}
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {lang === 'th' ? lesson.contentTh : lesson.contentEn}
                  </p>
                </div>

                {/* Key Takeaways Card with Bullet Icons */}
                <div className="p-5 md:p-6 rounded-[20px] bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
                  <h3 className="text-xl font-extrabold font-display text-slate-800 dark:text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                    {lang === 'th' ? 'สรุปประเด็นหลักที่ต้องจำ:' : 'Key Takeaways:'}
                  </h3>

                  <ul className="space-y-3 text-base font-medium">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span>
                        {lang === 'th' 
                          ? 'กำลังวัตต์ (Watts) บอกความดุดันในการใช้ไฟ ณ วินาทีนั้น' 
                          : 'Wattage shows instantaneous power demand at any second.'}
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span>
                        {lang === 'th' 
                          ? 'หน่วยไฟ (kWh) = (วัตต์ × ชั่วโมง) ÷ 1,000 คือยอดไฟสะสมที่จะถูกคิดเงินในบิล' 
                          : 'Units (kWh) = (Watts × Hours) ÷ 1,000 is the actual bill charge.'}
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span>
                        {lang === 'th' 
                          ? '1 หน่วยไฟ มีราคาเฉลี่ยประมาณ ฿4.20 (ขึ้นกับโครงสร้างอัตราค่าไฟ MEA/PEA)' 
                          : '1 kWh costs ~฿4.20 on average across PEA/MEA rates.'}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* AI Tip Card */}
                <div className="p-5 rounded-[20px] bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span className="font-extrabold text-sm text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                      Voltie AI Tip
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
                    {lang === 'th'
                      ? '💡 เคล็ดลับ: อุปกรณ์วัตต์น้อยแต่เปิดข้ามคืน (เช่น พัดลม หรือ กล่องทีวี) อาจสะสมหน่วยไฟได้พอๆ กับเครื่องใช้ไฟฟ้าวัตต์สูงที่เปิดแค่ไม่กี่นาที!'
                      : '💡 Tip: Low watt appliances running 24/7 can add up to as much bill cost as high watt ones run briefly!'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Interactive Visual Demonstration & Simulator */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 font-extrabold text-[13px]">
                    {lang === 'th' ? 'การทดลองแบบโต้ตอบ' : 'Interactive Visuals'}
                  </span>
                  <h2 className="text-[28px] font-black font-display text-slate-900 dark:text-white">
                    {lang === 'th' ? 'ทดลองคำนวณและดูผลกระทบจริง' : 'Visual Calculator & Comparison'}
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                    {lang === 'th'
                      ? 'เลื่อนตัวปรับด้านล่างเพื่อดูว่าการเปลี่ยนพฤติกรรมเพียงเล็กน้อย ส่งผลต่อค่าไฟประจำเดือนเท่าใด'
                      : 'Adjust sliders to simulate how behavior shifts impact your monthly bill.'}
                  </p>
                </div>

                {/* Interactive Simulator Card 1: Watt & Hours */}
                <div className="p-6 rounded-[20px] bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-extrabold font-display text-slate-900 dark:text-white flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-teal-500" />
                      {lang === 'th' ? 'จำลองค่าไฟจากวัตต์ x ชั่วโมง' : 'Watt & Hours Simulator'}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-300 font-extrabold text-xs">
                      ฿4.20 / หน่วย
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-bold mb-1.5">
                        <span className="text-slate-600 dark:text-slate-300">กำลังไฟอุปกรณ์ (Watts):</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold font-mono text-base">{wattsInput} W</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={3000}
                        step={50}
                        value={wattsInput}
                        onChange={(e) => setWattsInput(Number(e.target.value))}
                        className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm font-bold mb-1.5">
                        <span className="text-slate-600 dark:text-slate-300">ระยะเวลาเปิดต่อวัน (Hours):</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold font-mono text-base">{hoursInput} ชม./วัน</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={24}
                        step={1}
                        value={hoursInput}
                        onChange={(e) => setHoursInput(Number(e.target.value))}
                        className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Estimated Bill Display Box */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase block">
                        {lang === 'th' ? 'ใช้ไฟต่อเดือน' : 'Monthly Consumption'}
                      </span>
                      <span className="text-lg font-black font-mono text-slate-800 dark:text-slate-200">
                        {(((wattsInput * hoursInput * 30) / 1000)).toFixed(1)} kWh
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-400 uppercase block">
                        {lang === 'th' ? 'ค่าไฟประมาณการ' : 'Estimated Cost'}
                      </span>
                      <span className="text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">
                        ฿{monthlyCostDemo.toLocaleString()} / mo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comparison Card: Non-Inverter vs Inverter */}
                <div className="p-6 rounded-[20px] bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-4">
                  <h3 className="text-xl font-extrabold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Snowflake className="w-5 h-5 text-sky-500" />
                    {lang === 'th' ? 'เปรียบเทียบแอร์ธรรมดา VS แอร์ Inverter' : 'AC Type Comparison'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium">
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                      <span className="font-extrabold text-rose-600 dark:text-rose-400 text-base block">
                        ❌ แอร์ธรรมดา (Non-Inverter)
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                        คอมเพรสเซอร์ตัด-ต่อการทำงานถี่ๆ กระชากกระแสไฟวัตต์สูงทุกครั้งที่สตาร์ท เปลืองไฟเพิ่ม 30-40%
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base block">
                        ✅ แอร์ Inverter เบอร์ 5
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                        ปรับรอบหมุนคอมเพรสเซอร์แปรผันตามความเย็น รักษาอุณหภูมินิ่ง ไร้เสียงรบกวน ประหยัดเงิน ฿300-500/เดือน
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Deep-Dive Expandable & Actionable Habits */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[13px]">
                    {lang === 'th' ? 'แนวทางปฏิบัติเจาะลึก' : 'Actionable Habits'}
                  </span>
                  <h2 className="text-[28px] font-black font-display text-slate-900 dark:text-white">
                    {lang === 'th' ? 'วิธีเปลี่ยนพฤติกรรมเพื่อผลลัพธ์ยั่งยืน' : 'Daily Habits that Save Money'}
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                    {lang === 'th'
                      ? 'นิสัยเล็กๆ น้อยๆ ในชีวิตประจำวันที่สร้างความแตกต่างใหญ่หลวงในบิลค่าไฟปลายเดือน'
                      : 'Small daily adjustments that yield massive cost savings over time.'}
                  </p>
                </div>

                {/* Expandable Accordions */}
                <div className="space-y-3">
                  {[
                    {
                      id: 'deep_dive',
                      titleTh: '1. เทคนิคเปิดแอร์ 26°C + พัดลมส่าย',
                      titleEn: '1. 26°C AC + Oscillating Fan Trick',
                      contentTh: 'การตั้งแอร์ที่ 26°C ร่วมกับการเปิดพัดลมส่าย จะช่วยลดภาระคอมเพรสเซอร์ลง 10-15% ในขณะที่พัดลมช่วยเพิ่มลมปะทะผิว ทำให้รู้สึกเย็นสบายเทียบเท่า 24°C แต่ประหยัดเงินในกระเป๋าได้ถึง ฿180-250 บาทต่อเดือน!',
                      contentEn: 'Setting AC to 26°C with an oscillating fan reduces compressor load by 10-15% while wind chill makes you feel as cool as 24°C, saving ฿180-250/mo.'
                    },
                    {
                      id: 'standby_cut',
                      titleTh: '2. ตัดไฟสแตนด์บายด้วยปลั๊กพ่วงแบบมีสวิตช์',
                      titleEn: '2. Kill Vampire Power with Smart Strips',
                      contentTh: 'ทีวี, กล่องอินเทอร์เน็ต, ไมโครเวฟ และคอมพิวเตอร์ ดึงไฟสแตนด์บายตลอด 24 ชม. แม้ไม่ได้ใช้งาน คิดเป็น 5-10% ของบิลไฟทั้งหมด การใช้ปลั๊กพ่วงเปิด-ปิดแยกสวิตช์ช่วยตัดไฟรั่วซึมได้ 100%',
                      contentEn: 'TVs, Wi-Fi routers, and microwave clocks draw standby power 24/7 (5-10% of total bill). Switching off power strips eliminates vampire draw completely.'
                    },
                    {
                      id: 'filter_clean',
                      titleTh: '3. ล้างแผ่นกรองฝุ่นแอร์ทุกๆ 2-4 สัปดาห์',
                      titleEn: '3. Clean AC Dust Filters Fortnightly',
                      contentTh: 'ฝุ่นอุดตันแผ่นกรองทำให้พัดลมระบายความเย็นทำงานหนักขึ้น 15-20% และแอร์เย็นช้าลง การล้างแผ่นกรองด้วยน้ำเปล่าทำได้ง่ายๆ ด้วยตัวเอง ใช้เวลาเพียง 5 นาที!',
                      contentEn: 'Clogged filters make fans work 15-20% harder. Rinsing mesh filters with water takes 5 minutes and drastically lowers cooling delay.'
                    }
                  ].map((sec) => {
                    const isExpanded = expandedSection === sec.id;
                    return (
                      <div
                        key={sec.id}
                        className={`rounded-[20px] border transition-all overflow-hidden ${
                          isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <button
                          onClick={() => setExpandedSection(isExpanded ? null : sec.id)}
                          className="w-full p-5 text-left flex items-center justify-between font-extrabold text-base text-slate-900 dark:text-white cursor-pointer"
                        >
                          <span>{lang === 'th' ? sec.titleTh : sec.titleEn}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                          )}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-5 pb-5 text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60 pt-3"
                            >
                              {lang === 'th' ? sec.contentTh : sec.contentEn}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Knowledge Check Quiz & XP Reward */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-[13px] flex items-center gap-1.5 w-max">
                    <Award className="w-4 h-4 text-amber-500" />
                    {lang === 'th' ? 'แบบทดสอบวัดความรู้' : 'Knowledge Check Quiz'}
                  </span>
                  <h2 className="text-[28px] font-black font-display text-slate-900 dark:text-white">
                    {lang === 'th' ? 'ทดสอบความเข้าใจสั้นๆ' : 'Quick Quiz & Claim Rewards'}
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                    {lang === 'th' ? lesson.questionTh : (lesson as any).questionEn || lesson.questionTh}
                  </p>
                </div>

                {/* Quiz Options Stack */}
                <div className="space-y-3">
                  {lesson.optionsTh.map((optionText, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => !quizSubmitted && setSelectedOption(idx)}
                        disabled={quizSubmitted}
                        className={`w-full p-4 rounded-[20px] border text-left font-bold text-base transition-all flex items-center justify-between min-h-[56px] ${
                          isSelected
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                            : isDarkMode
                              ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-emerald-500/40'
                              : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                            isSelected ? 'bg-white text-emerald-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{optionText}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Submit / Result Display */}
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedOption === null}
                    className="w-full h-[56px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-extrabold text-base shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                  >
                    {lang === 'th' ? 'ส่งคำตอบตรวจผล ✓' : 'Submit Answer ✓'}
                  </button>
                ) : (
                  <div className="space-y-4 pt-2">
                    <div className={`p-5 rounded-[20px] border text-center space-y-2 ${
                      isCorrect 
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-300' 
                        : 'bg-rose-500/15 border-rose-500/30 text-rose-800 dark:text-rose-300'
                    }`}>
                      <h4 className="text-xl font-black font-display flex items-center justify-center gap-2">
                        {isCorrect ? '🎉 ถูกต้องแม่นยำ!' : '💡 เกือบถูกแล้ว!'}
                      </h4>
                      <p className="text-sm font-medium leading-relaxed">
                        {lesson.explanationTh}
                      </p>
                      {isCorrect && (
                        <div className="pt-2 flex items-center justify-center gap-4 text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4 fill-emerald-500" /> +{lesson.xpReward} XP
                          </span>
                          <span className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-amber-500" /> +25 Coins
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Sticky Bottom Action Area (Pinned Navigation Bar with 56px Touch Targets) */}
          <div className="sticky bottom-0 z-30 px-6 py-4 border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
            {/* Mobile Stack vs Desktop Row */}
            <div className="w-full flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  onClick={handlePrevStep}
                  className="h-[56px] px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-base flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>{lang === 'th' ? 'ย้อนกลับ' : 'Back'}</span>
                </button>
              ) : <div />}

              <div className="text-xs font-mono font-bold text-slate-400 hidden sm:block">
                Step {currentStep} / {totalSteps}
              </div>

              <button
                onClick={handleNextStep}
                disabled={currentStep === totalSteps && !quizSubmitted}
                className="flex-1 md:flex-initial h-[56px] px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white font-extrabold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>
                  {currentStep === totalSteps 
                    ? (lang === 'th' ? 'เสร็จสิ้นบทเรียน ✓' : 'Complete Lesson ✓') 
                    : (lang === 'th' ? 'ถัดไป' : 'Next Step')}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
