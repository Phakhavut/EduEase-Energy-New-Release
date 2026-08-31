import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Swords, 
  Zap, 
  Gift, 
  Building2, 
  Award, 
  Smartphone,
  HelpCircle
} from 'lucide-react';

interface GameGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const GameGuideModal: React.FC<GameGuideModalProps> = ({
  isOpen,
  onClose,
  lang,
  isDarkMode
}) => {
  if (!isOpen) return null;

  const guideSteps = [
    {
      num: '01',
      titleTh: 'เลือก Mission & Energy Boss',
      titleEn: 'Select Mission & Boss',
      descTh: 'เลือกบอสประจำวัน หรือบอสเฉพาะด้านที่ต้องการทดสอบ เช่น Overload หรือ Cold Phantom',
      descEn: 'Pick daily or targeted bosses like Overload or Cold Phantom to battle.',
      icon: Swords,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      num: '02',
      titleTh: 'ตอบคำถาม & เล่น Mini-game',
      titleEn: 'Answer & Play Mini-games',
      descTh: 'ใช้ความรู้พลังงานคำนวณ จับคู่ และวิเคราะห์สถานการณ์เพื่อเลือกคำตอบ',
      descEn: 'Apply energy math, matching, and scenarios to answer questions.',
      icon: HelpCircle,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20'
    },
    {
      num: '03',
      titleTh: 'สร้าง Combo & ทำ Damage',
      titleEn: 'Build Combo & Deal Damage',
      descTh: 'ตอบถูกต่อเนื่องเพื่อสะสม Combo Multiplier x2, x3, x5 เพิ่มพลังโจมตีบอส',
      descEn: 'Streak correct answers to stack Combo Multipliers x2, x3, x5 for massive damage.',
      icon: Zap,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      num: '04',
      titleTh: 'เอาชนะ Boss & รับ Loot',
      titleEn: 'Defeat Boss & Claim Loot',
      descTh: 'พิชิตบอสเพื่อรับ XP, Coins, ผลึก Energy Crystal และพิมพ์เขียวอาคาร',
      descEn: 'Slay bosses to earn XP, Coins, Energy Crystals, and Eco Blueprints.',
      icon: Gift,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
    },
    {
      num: '05',
      titleTh: 'พัฒนา Sustainable City',
      titleEn: 'Build Sustainable City',
      descTh: 'นำพิมพ์เขียวไปสร้างและอัปเกรด Eco House, Solar Farm, EV Hub ในเมืองของคุณ',
      descEn: 'Use blueprints to build and upgrade Eco Houses, Solar Farms, and EV Hubs.',
      icon: Building2,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    },
    {
      num: '06',
      titleTh: 'เชื่อมผลประหยัดจริงกับตัวเกม',
      titleEn: 'Real Energy Integration',
      descTh: 'ประหยัดไฟในบ้านจริงเพื่อรับโบนัสสิทธิประโยชน์ ขยายเมือง และปลดล็อกบอสระดับสูง',
      descEn: 'Save power at home to unlock special city bonuses and legendary bosses.',
      icon: Smartphone,
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`relative w-full max-w-xl my-auto rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[88vh] ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-white shadow-emerald-950/40' 
              : 'bg-white border-emerald-100 text-slate-800 shadow-xl'
          }`}
        >
          {/* Header */}
          <div className={`p-5 border-b flex items-center justify-between ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'วิธีเล่น Energy Guardian' : 'How to Play Energy Guardian'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th' ? 'คู่มือสรุป 6 ขั้นตอนสู่ผู้พิทักษ์พลังงานมืออาชีพ' : '6-Step Guide to Energy Mastery'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guideSteps.map((step) => (
                <div
                  key={step.num}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400 font-mono tracking-widest uppercase">
                      STEP {step.num}
                    </span>
                    <div className={`p-2 rounded-xl border ${step.color}`}>
                      {React.createElement(step.icon, { className: 'w-4 h-4' })}
                    </div>
                  </div>
                  <h4 className="font-extrabold text-sm font-display text-slate-900 dark:text-white mb-1">
                    {lang === 'th' ? step.titleTh : step.titleEn}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang === 'th' ? step.descTh : step.descEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Micro Lore Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-bold text-center">
              💡 {lang === 'th' ? 'เคล็ดลับ: ยิ่งคุณเรียนรู้เรื่องพลังงานมาก พลังโจมตีบอสของคุณจะยิ่งรุนแรง!' : 'Pro-tip: The deeper your energy knowledge, the harder your combat damage hits!'}
            </div>
          </div>

          {/* Footer CTA */}
          <div className={`p-4 border-t text-right ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:scale-102 active:scale-98 transition-all"
            >
              {lang === 'th' ? 'เข้าใจแล้ว พร้อมลุย!' : 'Got it, Let\'s Go!'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
