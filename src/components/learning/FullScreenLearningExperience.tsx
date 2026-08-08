import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Award, 
  Clock, 
  TrendingDown,
  HelpCircle,
  BarChart3,
  Globe,
  Bot,
  MessageSquare,
  ShieldCheck,
  Flame,
  Bookmark,
  Share2,
  ThumbsUp,
  RefreshCw,
  Trophy,
  Star,
  Check,
  Layers,
  Info
} from 'lucide-react';
import { Lesson, LearningPath, InfoDetailMode } from '../../types';
import { Confetti } from '../Confetti';

interface FullScreenLearningExperienceProps {
  lesson: Lesson;
  pathTitle?: string;
  onClose: () => void;
  onCompleteLesson: (lessonId: string, xp: number) => void;
  onRewardCoins?: (coins: number, xp: number) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  detailMode?: InfoDetailMode;
  onNextLesson?: () => void;
}

export const FullScreenLearningExperience: React.FC<FullScreenLearningExperienceProps> = ({
  lesson,
  pathTitle = 'Energy Basics Academy',
  onClose,
  onCompleteLesson,
  onRewardCoins,
  lang,
  isDarkMode,
  detailMode = 'balanced',
  onNextLesson
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [expandedHabit, setExpandedHabit] = useState<string | null>('habit_1');

  // Interactive Simulator States
  const [watts, setWatts] = useState(1200);
  const [hours, setHours] = useState(8);
  const [acTemp, setAcTemp] = useState(25);
  const [useFan, setUseFan] = useState(true);
  const [touPeriod, setTouPeriod] = useState<'peak' | 'offpeak'>('offpeak');

  // AI Tutor Floating Sheet State
  const [showAiTutor, setShowAiTutor] = useState(false);
  const [aiPromptResponse, setAiPromptResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Lesson total steps: 1 to 7 content steps + Step 8 Completion
  const totalSteps = 8;
  const progressPercent = Math.min(100, Math.round((currentStep / 7) * 100));

  useEffect(() => {
    // Scroll to top on step change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === 7) {
      // Complete lesson & move to Step 8 Celebration
      onCompleteLesson(lesson.id, lesson.xpReward);
      if (onRewardCoins) {
        onRewardCoins(25, lesson.xpReward);
      }
      setShowConfetti(true);
      setCurrentStep(8);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1 && currentStep !== 8) {
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

  const handleAskAiTutor = (promptType: 'simplify' | 'formula' | 'example' | 'why') => {
    setAiLoading(true);
    setShowAiTutor(true);
    setTimeout(() => {
      setAiLoading(false);
      if (promptType === 'simplify') {
        setAiPromptResponse(
          lang === 'th'
            ? '💡 อธิบายให้ฟังง่ายที่สุด: เปรียบเทียบไฟฟ้าเหมือนน้ำประปา วัตต์ (Watts) คือความแรงของสายยาง ยิ่งเปิดแรงน้ำยิ่งพุ่ง ส่วนหน่วยไฟ (kWh) คือปริมาณน้ำทั้งหมดที่ไหลลงโอ่ง ยิ่งเปิดไว้นาน น้ำในโอ่งยิ่งเต็ม และค่าน้ำ/ค่าไฟจะแพงตามปริมาณน้ำในโอ่งครับ!'
            : '💡 Simple Analogy: Think of electricity like a water hose. Watts is water pressure. kWh is the total gallons collected in a tub. The longer you run high pressure, the higher your bill!'
        );
      } else if (promptType === 'formula') {
        setAiPromptResponse(
          lang === 'th'
            ? '📐 สูตรการคำนวณสากล: \n• หน่วยไฟ (kWh) = (วัตต์ × ชั่วโมงการใช้งานต่อวัน × 30 วัน) ÷ 1,000 \n• ค่าไฟต่อเดือน (บาท) = หน่วยไฟ × ค่าไฟเฉลี่ย (~4.20 บาท/หน่วย) \n• สูตรค่า Ft = หน่วยไฟ × ค่า Ft ประจำงวด (+0.3982 บาท/หน่วย)'
            : '📐 Universal Formula: \n• kWh = (Watts × Hours/Day × 30) ÷ 1,000 \n• Monthly Bill (฿) = kWh × ~฿4.20/unit \n• Ft Adjustment = kWh × Ft Rate (+฿0.3982/unit)'
        );
      } else if (promptType === 'example') {
        setAiPromptResponse(
          lang === 'th'
            ? '🏠 ตัวอย่างชีวิตจริง: หากคุณเปลี่ยนจากการเปิดแอร์ 24°C เป็น 26°C ร่วมกับพัดลมส่าย คุณจะลดการใช้ไฟได้ประมาณ 1.5 หน่วย/วัน คิดเป็นเงินประหยัดกว่า ฿190 บาทต่อเดือน หรือ ฿2,280 บาทต่อปี!'
            : '🏠 Real Life Example: Shifting AC from 24°C to 26°C with fan saves ~1.5 kWh/day (~฿190/month or ฿2,280/year).'
        );
      } else {
        setAiPromptResponse(
          lang === 'th'
            ? '⚡ ทำไมเรื่องนี้ถึงสำคัญ: การปรับพฤติกรรมไฟฟ้าเพียงนิดเดียว ไม่เพียงแต่ช่วยเซฟเงินในกระเป๋าของคุณ แต่ยังช่วยลดภาระการปล่อยก๊าซคาร์บอนของโรงไฟฟ้าอีกด้วย!'
            : '⚡ Why this matters: Small behavioral shifts save both money and environmental carbon impact!'
        );
      }
    }, 600);
  };

  // Calculations for interactive widgets
  const pricePerUnit = touPeriod === 'offpeak' ? 2.6 : 5.8;
  const monthlyUnits = ((watts * hours * 30) / 1000);
  const estimatedCost = Math.round(monthlyUnits * (detailMode === 'detailed' ? pricePerUnit * 1.07 : 4.2));

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden flex flex-col font-sans transition-colors ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {showConfetti && <Confetti triggerCount={showConfetti ? 1 : 0} />}

      {/* FIXED TOP HEADER (Apple HIG & Duolingo style) */}
      <header className={`sticky top-0 z-40 px-4 md:px-8 py-3.5 border-b backdrop-blur-xl shrink-0 transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800/80 text-white' 
          : 'bg-white/90 border-slate-200/80 text-slate-900'
      }`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Back Action */}
          <button
            onClick={onClose}
            className="h-10 px-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer shrink-0"
            aria-label="Exit Academy"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'th' ? 'ออกจากการเรียน' : 'Exit Academy'}</span>
          </button>

          {/* Title & Step Indicator */}
          <div className="flex-1 text-center min-w-0 px-2">
            <div className="text-[11px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400 truncate">
              {pathTitle} • {lang === 'th' ? 'โหมดเรียนรู้ไร้สิ่งรบกวน' : 'Immersive Academy'}
            </div>
            <h1 className="text-sm md:text-base font-black font-display truncate">
              {lang === 'th' ? lesson.titleTh : lesson.titleEn}
            </h1>
          </div>

          {/* Top Actions: Bookmark & Step Counter */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                isBookmarked 
                  ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent hover:text-slate-600'
              }`}
              title={lang === 'th' ? 'บันทึกบทเรียน' : 'Bookmark Lesson'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            {currentStep <= 7 && (
              <span className="px-3 py-1.5 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs font-mono">
                {currentStep} / 7
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        {currentStep <= 7 && (
          <div className="max-w-4xl mx-auto mt-2.5 space-y-1">
            <div className="flex justify-between items-center text-[11px] font-extrabold text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-teal-500" />
                {lesson.readTime} • +{lesson.xpReward} XP
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                {progressPercent}% Complete
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}
      </header>

      {/* SCROLLABLE MAIN CONTENT CANVAS */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-28">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* HERO INTRO CARD (Always visible on Step 1) */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 md:p-8 rounded-[28px] border shadow-xl relative overflow-hidden space-y-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border-slate-800' 
                  : 'bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white border-emerald-100'
              }`}
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 fill-emerald-500" />
                  {lang === 'th' ? 'บทเรียนสำคัญประจำวัน' : 'Core Academy Lesson'}
                </div>

                {/* Difficulty Stars */}
                <div className="flex items-center gap-1 text-amber-400 text-xs font-extrabold">
                  <span className="text-slate-400 font-bold mr-1">{lang === 'th' ? 'ระดับความยาก:' : 'Difficulty:'}</span>
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-black font-display leading-tight text-slate-900 dark:text-white">
                  {lang === 'th' ? lesson.titleTh : lesson.titleEn}
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {lang === 'th' ? lesson.contentTh : lesson.contentEn}
                </p>
              </div>

              {/* Reward Badges Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">{lang === 'th' ? 'เวลาอ่าน' : 'Duration'}</div>
                  <div className="text-sm md:text-base font-black font-mono text-emerald-600 dark:text-emerald-400">{lesson.readTime}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">XP Reward</div>
                  <div className="text-sm md:text-base font-black font-mono text-amber-500 flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4 fill-amber-500" /> +{lesson.xpReward}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-center space-y-1">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Coins</div>
                  <div className="text-sm md:text-base font-black font-mono text-teal-500 flex items-center justify-center gap-1">
                    <Coins className="w-4 h-4 text-teal-500" /> +25
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 1 CONTENT: Why Should I Care? */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className={`p-6 rounded-[24px] border shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-lg font-extrabold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                  {lang === 'th' ? '1. ทำไมเรื่องนี้ถึงสำคัญกับกระเป๋าเงินของคุณ?' : '1. Why Should You Care?'}
                </h3>

                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {lang === 'th'
                    ? 'ผู้คนส่วนใหญ่ตกใจกับบิลค่าไฟทุกสิ้นเดือน แต่กลับไม่เคยรู้เลยว่าเครื่องใช้ไฟฟ้าชิ้นไหนที่เป็นแชมป์สูบไฟตัวจริง การเข้าใจหลักการทำงานของการใช้ไฟฟ้าจะช่วยให้คุณตัดค่าใช้จ่ายรั่วไหลได้ถึง 15–30% โดยไม่กระทบต่อความสบายในชีวิตประจำวัน'
                    : 'Most people are shocked by monthly electric bills, but never know which appliances drive the costs. Mastering power fundamentals lets you save 15-30% effortlessly.'}
                </p>

                {/* Impact Highlight Box */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black shrink-0">
                    ฿
                  </div>
                  <div className="text-xs md:text-sm font-extrabold text-emerald-800 dark:text-emerald-300">
                    {lang === 'th'
                      ? 'ประหยัดเฉลี่ย ฿200 - ฿600 บาท/เดือน เมื่อปฏิบัติตามบทเรียนนี้อย่างถูกวิธี!'
                      : 'Save ฿200 - ฿600 / month on average by following this lesson!'}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 CONTENT: Simple Explanation (Adapted to Detail Mode) */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 font-extrabold text-xs uppercase tracking-wider">
                  Step 2 • {lang === 'th' ? 'แนวคิดหลัก' : 'Core Concept'}
                </span>
                <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'ทำความเข้าใจหลักการทำงาน' : 'Understanding the Mechanics'}
                </h2>
              </div>

              {/* Detail Mode Mode Specific Content */}
              <div className={`p-6 rounded-[24px] border shadow-sm space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                {detailMode === 'simple' && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 font-bold text-sm text-amber-800 dark:text-amber-300 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                      <span>{lang === 'th' ? 'โหมดเข้าใจง่าย (Beginner View)' : 'Simple View Mode'}</span>
                    </div>
                    <p className="text-base font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                      เปรียบเครื่องใช้ไฟฟ้าเหมือน **"รถยนต์"**:
                      <br />
                      • **วัตต์ (Watts)** คือ ความเร็วเข็มไมล์ ยิ่งวัตต์เยอะ ยิ่งวิ่งเร็ว เปลืองน้ำมัน
                      <br />
                      • **ชั่วโมง (Hours)** คือ ระยะทางที่คุณขับรถ
                      <br />
                      • **หน่วยไฟ (kWh)** คือ ปริมาณน้ำมันทั้งหมดที่ถูกเติมลงถังและถูกคิดเงินในบิล!
                    </p>
                  </div>
                )}

                {detailMode === 'balanced' && (
                  <div className="space-y-3">
                    <p className="text-base font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                      {lang === 'th'
                        ? 'กำลังไฟฟ้าของเครื่องใช้ไฟฟ้าแต่ละชนิดมีหน่วยเป็น วัตต์ (W) เช่น พัดลม 50W, แอร์ 1,200W, กาต้มน้ำ 2,000W การไฟฟ้าจะไม่ได้คิดเงินตามกำลังวัตต์ตรงๆ แต่คิดตาม "หน่วยไฟสะสม" หรือ Kilowatt-hour (kWh)'
                        : 'Appliance power is measured in Watts (W). The utility company charges by total accumulated Kilowatt-hours (kWh) rather than instantaneous Watts.'}
                    </p>
                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      kWh = (Watts × Hours) ÷ 1,000
                    </div>
                  </div>
                )}

                {detailMode === 'detailed' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 font-mono text-xs font-bold text-purple-600 dark:text-purple-300">
                      ENGINEERING & FORMULA VIEW
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                      การคิดค่าไฟฟ้านอกจากหน่วยสะสม kWh แล้ว ยังประกอบไปด้วยอัตราก้าวหน้า (Progressive Tariff Rate), ค่า Ft (Float Time adjustment rate) และภาษีมูลค่าเพิ่ม (VAT 7%):
                    </p>
                    <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs space-y-1.5 overflow-x-auto">
                      <div>P (kW) = Power (Watts) / 1000</div>
                      <div>Energy (kWh) = P (kW) × Time (Hours)</div>
                      <div>Total Bill = (kWh × Tariff) + (kWh × Ft) + VAT 7%</div>
                      <div>Power Factor (PF) = Real Power (kW) / Apparent Power (kVA)</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3 CONTENT: Visual Comparison & Mini Diagram */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                  Step 3 • {lang === 'th' ? 'การเปรียบเทียบเชิงมิติภาพ' : 'Visual Comparison'}
                </span>
                <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'เปรียบเทียบแอร์ธรรมดา VS แอร์ Inverter' : 'Inverter vs Standard AC'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Non-Inverter Card */}
                <div className="p-5 rounded-[24px] bg-rose-500/10 border border-rose-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-rose-600 dark:text-rose-400 text-base">
                      ❌ แอร์ธรรมดา (Non-Inverter)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-600 text-xs font-bold">
                      กินไฟหนัก
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    คอมเพรสเซอร์ทำงานแบบ "ติด-ดับ" กระชากกระแสไฟวัตต์สูงทุกครั้งที่สตาร์ทใหม่ ทำให้อุณหภูมิสวิง และเปลืองไฟเพิ่มขึ้น 30–40%
                  </p>
                  <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 font-mono text-xs font-bold text-rose-600">
                    ⚡ ค่าไฟเฉลี่ย: ~฿1,200 - ฿1,600 / เดือน
                  </div>
                </div>

                {/* Inverter Card */}
                <div className="p-5 rounded-[24px] bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">
                      ✅ แอร์ Inverter เบอร์ 5
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 text-xs font-bold">
                      ประหยัดสูงสุด
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    ปรับรอบหมุนคอมเพรสเซอร์แปรผันตามความเย็น รักษาอุณหภูมินิ่ง ไร้เสียงรบกวน ไร้การกระชากไฟ ประหยัดเงินในกระเป๋าอย่างยั่งยืน
                  </p>
                  <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 font-mono text-xs font-bold text-emerald-600">
                    ⚡ ค่าไฟเฉลี่ย: ~฿750 - ฿950 / เดือน
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4 CONTENT: Interactive Simulator & Touch Sliders */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                  Step 4 • {lang === 'th' ? 'การทดลองจำลองด้วยตนเอง' : 'Interactive Simulator'}
                </span>
                <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'ลองปรับตัวแปรและดูค่าไฟเปลี่ยนทันที' : 'Live Bill Simulator'}
                </h2>
              </div>

              <div className={`p-6 rounded-[28px] border shadow-md space-y-6 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                {/* TOU Switch */}
                {detailMode === 'detailed' && (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-xs font-extrabold text-slate-600 dark:text-slate-300">ช่วงเวลา TOU:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTouPeriod('offpeak')}
                        className={`px-3 py-1 rounded-xl text-xs font-bold ${
                          touPeriod === 'offpeak' ? 'bg-emerald-500 text-white' : 'text-slate-400'
                        }`}
                      >
                        Off-Peak (฿2.6/u)
                      </button>
                      <button
                        onClick={() => setTouPeriod('peak')}
                        className={`px-3 py-1 rounded-xl text-xs font-bold ${
                          touPeriod === 'peak' ? 'bg-rose-500 text-white' : 'text-slate-400'
                        }`}
                      >
                        Peak (฿5.8/u)
                      </button>
                    </div>
                  </div>
                )}

                {/* Slider 1: Watts */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-extrabold">
                    <span className="text-slate-600 dark:text-slate-300">กำลังวัตต์ (Watts):</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-base">{watts} W</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={3000}
                    step={100}
                    value={watts}
                    onChange={(e) => setWatts(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Slider 2: Hours */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-extrabold">
                    <span className="text-slate-600 dark:text-slate-300">ระยะเวลาเปิด (Hours/Day):</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-base">{hours} ชม./วัน</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={24}
                    step={1}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Output Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block">การใช้ไฟรายเดือน</span>
                    <span className="text-lg font-black font-mono text-slate-800 dark:text-slate-200">
                      {monthlyUnits.toFixed(1)} kWh
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase block">ค่าไฟประมาณการ</span>
                    <span className="text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">
                      ฿{estimatedCost.toLocaleString()} / mo
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5 CONTENT: Actionable Habits Checklist */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 font-extrabold text-xs uppercase tracking-wider">
                  Step 5 • {lang === 'th' ? 'นิสัยที่นำไปใช้ได้ทันที' : 'Actionable Habits'}
                </span>
                <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? '3 นิสัยประหยัดไฟที่ทำตามได้เลยคืนนี้' : '3 Quick Habits to Start Tonight'}
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'habit_1',
                    titleTh: '1. เทคนิคเปิดแอร์ 26°C + พัดลมส่าย',
                    titleEn: '1. 26°C AC + Oscillating Fan Trick',
                    descTh: 'การเพิ่มอุณหภูมิแอร์ขึ้น 1°C ช่วยลดภาระคอมเพรสเซอร์ได้ประมาณ 8% การใช้พัดลมช่วยเพิ่มลมปะทะผิว ทำให้รู้สึกเย็นสบายเหมือน 24°C แต่ประหยัดไฟขึ้นจริง!',
                    descEn: 'Increasing AC temp by 1°C reduces compressor load by ~8%. Using a fan improves wind chill, making it feel like 24°C but saving energy!',
                    savingsTh: 'ประหยัด ~฿180-250 / เดือน',
                    savingsEn: 'Save ~฿180-250 / month'
                  },
                  {
                    id: 'habit_2',
                    titleTh: '2. ตัดไฟสแตนด์บายด้วยปลั๊กพ่วงแบบสวิตช์แยก',
                    titleEn: '2. Cut Standby Power with Switch Strips',
                    descTh: 'ทีวี กล่องทีวี ไมโครเวฟ ดึงไฟสแตนด์บายสะสมตลอด 24 ชม. คิดเป็น 5-10% ของบิลไฟทั้งหมด การกดปิดสวิตช์ปลั๊กพ่วงตัดไฟรั่วซึมได้ 100%',
                    descEn: 'TVs, set-top boxes, and microwaves draw standby power 24/7, accounting for 5-10% of your bill. Switching off a power strip cuts this completely.',
                    savingsTh: 'ประหยัด ~฿80-150 / เดือน',
                    savingsEn: 'Save ~฿80-150 / month'
                  },
                  {
                    id: 'habit_3',
                    titleTh: '3. ล้างแผ่นกรองฝุ่นแอร์ทุกๆ 2-4 สัปดาห์',
                    titleEn: '3. Wash Air Filters Fortnightly',
                    descTh: 'ฝุ่นอุดตันทำให้พัดลมระบายความเย็นทำงานหนักขึ้น 15-20% ล้างด้วยน้ำเปล่าทำได้ง่ายๆ 5 นาที เย็นเร็วขึ้นทันตา',
                    descEn: 'Clogged filters make the cooling fan work 15-20% harder. Washing them with water takes 5 minutes and cools the room faster.',
                    savingsTh: 'ประหยัด ~฿120-200 / เดือน',
                    savingsEn: 'Save ~฿120-200 / month'
                  }
                ].map((item) => {
                  const isExpanded = expandedHabit === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`rounded-[24px] border transition-all overflow-hidden ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedHabit(isExpanded ? null : item.id)}
                        className="w-full p-5 text-left flex items-center justify-between font-extrabold text-base text-slate-900 dark:text-white cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span>{lang === 'th' ? item.titleTh : item.titleEn}</span>
                        </div>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 text-sm font-medium text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                          <p>{lang === 'th' ? item.descTh : item.descEn}</p>
                          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                            {lang === 'th' ? item.savingsTh : item.savingsEn}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 6 CONTENT: AI Summary Takeaway */}
          {currentStep === 6 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="p-6 md:p-8 rounded-[28px] bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-emerald-500/20 border border-emerald-500/40 space-y-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                      Voltie AI Coach Summary
                    </span>
                    <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">
                      {lang === 'th' ? 'สรุปประเด็นสำคัญประจำบทเรียน' : 'Key AI Takeaway'}
                    </h3>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                  <p>
                    {lang === 'th'
                      ? '1. การประหยัดไฟไม่ได้หมายถึงการทนร้อน แต่คือการใช้อย่างชาญฉลาด'
                      : '1. Saving power does not mean suffering in heat, but using smart habits.'}
                  </p>
                  <p>
                    {lang === 'th'
                      ? '2. การตัดวัตต์ของเครื่องใช้ไฟฟ้ากลุ่มทำความเย็นและกลุ่มสแตนด์บาย คือจุดสร้างความประหยัดมากที่สุด'
                      : '2. Cutting cooling loads and standby power yields the biggest bill drop.'}
                  </p>
                  <p>
                    {lang === 'th'
                      ? '3. ติดตามผลผ่านแดชบอร์ด EduEase Energy สัปดาห์ละครั้ง เพื่อดูยอดเหรียญและเลเวลการประหยัดไฟของคุณ!'
                      : '3. Track progress weekly on EduEase Energy dashboard to earn rewards!'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 7 CONTENT: Knowledge Check Quiz */}
          {currentStep === 7 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1 w-max">
                  <Award className="w-4 h-4 text-amber-500" />
                  {lang === 'th' ? 'แบบทดสอบวัดความรู้' : 'Knowledge Check Quiz'}
                </span>
                <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? lesson.questionTh : (lesson as any).questionEn || lesson.questionTh}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {lesson.optionsTh.map((optionText, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => !quizSubmitted && setSelectedOption(idx)}
                      disabled={quizSubmitted}
                      className={`w-full p-4 rounded-[20px] border text-left font-bold text-base transition-all flex items-center justify-between min-h-[56px] cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                          : isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-emerald-500/40'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                          isSelected ? 'bg-white text-emerald-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
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

              {/* Submit Quiz Action */}
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedOption === null}
                  className="w-full h-[56px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-extrabold text-base shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  {lang === 'th' ? 'ส่งคำตอบตรวจผล ✓' : 'Submit Answer ✓'}
                </button>
              ) : (
                <div className={`p-5 rounded-[20px] border text-center space-y-2 ${
                  isCorrect ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-300' : 'bg-rose-500/15 border-rose-500/30 text-rose-800 dark:text-rose-300'
                }`}>
                  <h4 className="text-xl font-black font-display">
                    {isCorrect ? '🎉 ถูกต้องแม่นยำ!' : '💡 เกือบถูกแล้ว!'}
                  </h4>
                  <p className="text-sm font-medium leading-relaxed">
                    {lesson.explanationTh}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 8: LESSON COMPLETE CELEBRATION VIEW */}
          {currentStep === 8 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-6 py-6"
            >
              {/* Trophy Badge Animation */}
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-white flex items-center justify-center text-5xl mx-auto shadow-2xl ring-8 ring-amber-400/20 animate-bounce">
                  🏆
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-emerald-500 text-white shadow-md">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider">
                  Lesson Completed!
                </span>
                <h2 className="text-3xl font-black font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'ยินดีด้วย! จบบทเรียนเรียบร้อย' : 'Congratulations! Lesson Finished'}
                </h2>
                <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
                  คุณได้รับรางวัลพัฒนาทักษะและปลดล็อกโหนดความรู้ถัดไป
                </p>
              </div>

              {/* Rewards Summary Box */}
              <div className="p-6 rounded-[28px] bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6 fill-amber-500 text-amber-500" />
                  <div className="text-left">
                    <span className="text-xs font-extrabold text-slate-400 uppercase block">XP Earned</span>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">+{lesson.xpReward} XP</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center gap-3">
                  <Coins className="w-6 h-6 text-amber-500" />
                  <div className="text-left">
                    <span className="text-xs font-extrabold text-slate-400 uppercase block">Coins Reward</span>
                    <span className="text-xl font-black text-amber-500 font-mono">+25 Coins</span>
                  </div>
                </div>
              </div>

              {/* Tree Growth Tip */}
              <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xl shrink-0">
                  🌳
                </div>
                <div className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {lang === 'th'
                    ? 'ต้นไม้พลังงาน (Energy Tree) ของคุณเติบโตขึ้น 2% จากบทเรียนนี้!'
                    : 'Your Energy Tree grew by 2% from completing this lesson!'}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 space-y-3">
                {onNextLesson && (
                  <button
                    onClick={onNextLesson}
                    className="w-full h-[56px] rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>{lang === 'th' ? 'เรียนบทเรียนถัดไป ➔' : 'Start Next Lesson ➔'}</span>
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="w-full h-[56px] rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-base transition-colors cursor-pointer"
                >
                  {lang === 'th' ? 'กลับสู่อาณาจักรพลังงาน' : 'Return to Academy Hub'}
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      {/* FLOATING VOLTIE AI TUTOR BUTTON */}
      {currentStep <= 7 && (
        <div className="fixed bottom-20 right-4 md:right-8 z-40">
          <button
            onClick={() => handleAskAiTutor('simplify')}
            className="h-12 px-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105 text-white font-extrabold text-xs shadow-xl shadow-emerald-500/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Bot className="w-5 h-5 animate-pulse" />
            <span>{lang === 'th' ? 'ถาม Voltie AI Tutor' : 'Ask Voltie AI'}</span>
          </button>
        </div>
      )}

      {/* VOLTIE AI TUTOR DRAWER SHEET */}
      <AnimatePresence>
        {showAiTutor && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              className={`w-full max-w-lg p-6 rounded-[28px] border shadow-2xl space-y-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-500" />
                  <span className="font-extrabold text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Voltie AI Tutor Assistant
                  </span>
                </div>
                <button
                  onClick={() => setShowAiTutor(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick AI Prompts */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleAskAiTutor('simplify')}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/20 text-xs font-bold transition-all"
                >
                  💡 {lang === 'th' ? 'อธิบายให้ฟังง่ายขึ้น' : 'Simplify Concept'}
                </button>
                <button
                  onClick={() => handleAskAiTutor('formula')}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/20 text-xs font-bold transition-all"
                >
                  📐 {lang === 'th' ? 'ดูสูตรและสมการ' : 'Show Formula'}
                </button>
                <button
                  onClick={() => handleAskAiTutor('example')}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/20 text-xs font-bold transition-all"
                >
                  🏠 {lang === 'th' ? 'ยกตัวอย่างชีวิตจริง' : 'Real Example'}
                </button>
              </div>

              {/* AI Response Display */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 min-h-[100px] text-xs md:text-sm font-medium leading-relaxed whitespace-pre-line">
                {aiLoading ? (
                  <div className="flex items-center justify-center gap-2 py-6 text-emerald-500 font-bold">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Voltie AI กำลังเรียบเรียงคำอธิบาย...</span>
                  </div>
                ) : (
                  aiPromptResponse
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FIXED STICKY BOTTOM NAVIGATION BAR (56px Touch Target) */}
      {currentStep <= 7 && (
        <footer className={`fixed bottom-0 left-0 right-0 z-40 px-4 md:px-8 py-3.5 border-t backdrop-blur-xl shrink-0 ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-800/80' 
            : 'bg-white/95 border-slate-200/80'
        }`}>
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                onClick={handlePrevStep}
                className="h-[56px] px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-base flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{lang === 'th' ? 'ย้อนกลับ' : 'Back'}</span>
              </button>
            ) : <div />}

            <button
              onClick={handleNextStep}
              disabled={currentStep === 7 && !quizSubmitted}
              className="flex-1 md:flex-initial h-[56px] px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white font-extrabold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>
                {currentStep === 7 
                  ? (lang === 'th' ? 'เสร็จสิ้นบทเรียน ✓' : 'Complete Lesson ✓') 
                  : (lang === 'th' ? 'ขั้นตอนถัดไป' : 'Next Step')}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};
