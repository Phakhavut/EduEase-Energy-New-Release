import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Zap, 
  Swords, 
  Gift, 
  Building2, 
  TrendingUp, 
  Play, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onCompleteTutorial: () => void;
  onStartFirstBattle: () => void;
}

export const GameTutorialModal: React.FC<GameTutorialModalProps> = ({
  isOpen,
  onClose,
  lang,
  isDarkMode,
  onCompleteTutorial,
  onStartFirstBattle,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState<number | null>(null);
  const [practiceSuccess, setPracticeSuccess] = useState(false);

  if (!isOpen) return null;

  const steps = [
    {
      titleTh: 'ยินดีต้อนรับสู่ Energy Guardian!',
      titleEn: 'Welcome to Energy Guardian!',
      icon: ShieldAlert,
      color: 'text-amber-500',
      bgGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      contentTh: 'เมืองของคุณกำลังเผชิญกับปีศาจสูบพลังงาน (Energy Bosses) ที่ทำให้เกิดการใช้ไฟเกินและค่าไฟพุ่งสูง! หน้าที่ของคุณในฐานะ Energy Guardian คือการเรียนรู้ เผชิญหน้า และสร้างเมืองสีเขียวยั่งยืน',
      contentEn: 'Your city is invaded by Energy Bosses causing power waste and massive bills! As an Energy Guardian, your mission is to learn, battle, and build a sustainable metropolis.'
    },
    {
      titleTh: 'ทำความรู้จักกับ Energy Boss',
      titleEn: 'Meet the Energy Bosses',
      icon: Swords,
      color: 'text-rose-500',
      bgGradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
      contentTh: 'บอสแต่ละตัวแทนปัญหาพลังงานในชีวิตจริง เช่น Overload (ไฟแปรสภาพ/เปิดทิ้งไว้), Cold Phantom (แอร์กินไฟหนาวสั่น), และ Bill Eater (บิลค่าไฟพุ่งสูง)',
      contentEn: 'Each boss embodies real-world energy issues like Overload (standby power waste), Cold Phantom (excessive AC cooling), and Bill Eater (tariff spikes).'
    },
    {
      titleTh: 'Gameplay & Battle Mechanics',
      titleEn: 'Gameplay & Battle Mechanics',
      icon: Zap,
      color: 'text-emerald-500',
      bgGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      contentTh: 'ตอบคำถามวิเคราะห์พลังงาน เล่น Mini-game และใช้ความรู้สร้าง Combo Multiplier เพื่อโจมตีสั่งการทำ Damage ใส่ Boss ยิ่งตอบถูกต่อเนื่อง ยิ่งพลังโจมตีรุนแรง!',
      contentEn: 'Answer energy questions, play mini-games, and build Combo Multipliers to deal heavy damage to the Boss. Continuous streaks multiply your attack power!'
    },
    {
      titleTh: 'รับ Loot & Rewards',
      titleEn: 'Earn Loot & Rewards',
      icon: Gift,
      color: 'text-sky-500',
      bgGradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
      contentTh: 'เมื่อเอาชนะ Boss คุณจะได้รับ XP, Coins, ผลึก Energy Crystal, พิมพ์เขียวอาคารประหยัดไฟ (Blueprints) และเมล็ดพันธุ์พฤกษาแห่งพลังงาน (Energy Tree Seeds)',
      contentEn: 'Defeating Bosses rewards you with XP, Coins, Energy Crystals, Eco Building Blueprints, and Energy Tree Seeds.'
    },
    {
      titleTh: 'พัฒนา Sustainable City ของคุณ',
      titleEn: 'Develop Your Sustainable City',
      icon: Building2,
      color: 'text-purple-500',
      bgGradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      contentTh: 'นำพิมพ์เขียวและรางวัลที่ได้รับ ไปสร้างและอัปเกรดเมืองของคุณ ยิ่งเมืองโต ค่าความยั่งยืน (Sustainability) และความสุขของประชาชนจะยิ่งพุ่งสูง!',
      contentEn: 'Use blueprints and loot to construct eco-houses, solar farms, and smart grids. As your city grows, sustainability and citizen happiness soar!'
    },
    {
      titleTh: 'เชื่อมโยงกับการใช้ไฟจริง',
      titleEn: 'Real Energy Integration',
      icon: TrendingUp,
      color: 'text-teal-500',
      bgGradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
      contentTh: 'ปรับพฤติกรรมออมไฟในชีวิตจริง ถอดปลั๊กแฝง และปรับอุณหภูมิแอร์ แล้วนำผลประหยัดจริงมารับโบนัส XP พิเศษและสิทธิประโยชน์การขยายเมือง!',
      contentEn: 'Improve your real-world energy habits—unplug standby loads and adjust AC setpoints—to claim bonus XP and city expand privileges!'
    },
    {
      titleTh: 'ทดลองซ้อมต่อสู้ครั้งแรก (Practice Round)',
      titleEn: 'First Battle Practice Round',
      icon: Play,
      color: 'text-amber-500',
      bgGradient: 'from-amber-500/20 via-emerald-500/10 to-transparent',
      contentTh: 'ลองทดสอบการต่อสู้กับบอส Overload ด้วยคำถามซ้อมรบ 1 ข้อ:',
      contentEn: 'Test your battle readiness against Overload with 1 practice question:'
    }
  ];

  const handlePracticeAnswer = (index: number) => {
    setPracticeAnswer(index);
    if (index === 0) {
      setPracticeSuccess(true);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    } else {
      setPracticeSuccess(false);
    }
  };

  const handleFinish = () => {
    onCompleteTutorial();
    onClose();
    onStartFirstBattle();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`relative w-full max-w-lg my-auto rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-white shadow-emerald-950/40' 
              : 'bg-white border-emerald-100 text-slate-800 shadow-xl'
          }`}
        >
          {/* Top Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Card Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1">
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {lang === 'th' ? `คู่มือแรกเข้า Step ${currentStep + 1} / ${steps.length}` : `Tutorial Step ${currentStep + 1} / ${steps.length}`}
              </span>
            </div>

            {/* Step Icon & Title */}
            <div className="flex items-start gap-3.5">
              <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${steps[currentStep].bgGradient} border border-slate-200 dark:border-slate-800 shrink-0`}>
                {React.createElement(steps[currentStep].icon, { className: `w-7 h-7 ${steps[currentStep].color}` })}
              </div>
              <div>
                <h3 className="text-xl font-extrabold font-display leading-tight text-slate-900 dark:text-white">
                  {lang === 'th' ? steps[currentStep].titleTh : steps[currentStep].titleEn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Energy Guardian Academy
                </p>
              </div>
            </div>

            {/* Body Content */}
            <div className={`p-4 rounded-2xl border text-sm leading-relaxed ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              {lang === 'th' ? steps[currentStep].contentTh : steps[currentStep].contentEn}
            </div>

            {/* Interactive Practice in Step 7 */}
            {currentStep === 6 && (
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'th' ? 'โจทย์ทดลอง: การปิดทีวีด้วยรีโมตโดยไม่ถอดปลั๊ก เกิดอะไรขึ้น?' : 'Practice Question: What happens when turning off TV with remote without unplugging?'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    lang === 'th' ? 'เกิดไฟแฝง (Standby Power) เปลืองไฟ 24 ชม.' : 'Creates standby power waste 24/7',
                    lang === 'th' ? 'ไม่เสียค่าไฟเลยแม้แต่น้อย' : 'Uses zero power at all',
                    lang === 'th' ? 'ทำให้ทีวีพังทันที' : 'Breaks TV instantly'
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePracticeAnswer(idx)}
                      className={`w-full p-3 rounded-xl border text-left font-bold transition-all flex items-center justify-between ${
                        practiceAnswer === idx
                          ? idx === 0 
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                            : 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400'
                          : isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt}</span>
                      {practiceAnswer === idx && (
                        <span>{idx === 0 ? '✓ ถือเป็นคำตอบที่ถูก!' : '✗ ยังไม่ใช่'}</span>
                      )}
                    </button>
                  ))}
                </div>

                {practiceSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 animate-bounce">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>
                      {lang === 'th' ? '⚡ SUPER EFFECTIVE! ทำ Damage +150 HP ใส่ Overload สำเร็จ!' : '⚡ SUPER EFFECTIVE! Dealt +150 HP damage to Overload!'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fixed Footer Action Buttons */}
          <div className={`p-4 border-t flex items-center justify-between gap-3 shrink-0 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                currentStep === 0 
                  ? 'opacity-30 cursor-not-allowed text-slate-400' 
                  : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === 'th' ? 'ย้อนกลับ' : 'Back'}</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-6 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:scale-102 active:scale-98 transition-all flex items-center gap-1.5"
              >
                <span>{lang === 'th' ? 'ถัดไป' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!practiceSuccess}
                className={`px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 ${
                  practiceSuccess
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-white shadow-lg shadow-amber-500/30 hover:scale-102 active:scale-98 cursor-pointer'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>{lang === 'th' ? 'เริ่มสู้ Overload จริง!' : 'Start Overload Battle!'}</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
