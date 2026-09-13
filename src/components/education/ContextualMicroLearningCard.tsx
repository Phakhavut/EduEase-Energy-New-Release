import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  BookOpen, 
  Zap, 
  TrendingDown, 
  HelpCircle,
  Clock,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface MicroTip {
  id: string;
  category: 'basics' | 'saving_tips' | 'bill_reading' | 'appliance_buying' | 'environment';
  categoryTh: string;
  categoryEn: string;
  applianceType?: string; // 'Cooling' | 'Kitchen' | 'Entertainment' | 'Bathroom' | 'Lighting'
  titleTh: string;
  titleEn: string;
  readTimeSec: number;
  highlightStatTh: string;
  highlightStatEn: string;
  contentTh: string;
  contentEn: string;
  quiz?: {
    questionTh: string;
    questionEn: string;
    optionsTh: string[];
    optionsEn: string[];
    correctIndex: number;
    explanationTh: string;
  };
}

export const CONTEXTUAL_TIPS: MicroTip[] = [
  {
    id: 'ac_26_fan',
    category: 'saving_tips',
    categoryTh: 'เทคนิคประหยัด',
    categoryEn: 'Saving Tips',
    applianceType: 'Cooling',
    titleTh: 'ทำไม 26° + พัดลม ถึงประหยัดที่สุด?',
    titleEn: 'Why 26°C + Fan saves the most?',
    readTimeSec: 45,
    highlightStatTh: 'ลดค่าไฟได้ถึง 10-15%',
    highlightStatEn: 'Saves 10-15% electricity',
    contentTh: 'การเปิดแอร์ที่ 26°C พร้อมเปิดพัดลมส่ายเบา ๆ ทำให้ร่างกายรู้สึกเย็นสบายเท่ากับแอร์ 24°C เพราะลมพัดช่วยระบายความร้อนจากผิวหนัง แต่คอมเพรสเซอร์แอร์กินไฟน้อยลงมหาศาลทุกๆ 1°C ที่เราปรับขึ้น!',
    contentEn: 'Setting AC to 26°C with a gentle oscillating fan feels just as cool as 24°C due to convective heat dissipation, while compressor workload drops significantly for every 1°C higher.',
    quiz: {
      questionTh: 'การปรับแอร์ขึ้นจาก 24°C เป็น 26°C ร่วมกับเปิดพัดลม ช่วยลดค่าไฟแอร์ได้ประมาณเท่าไหร่?',
      questionEn: 'Adjusting AC from 24°C to 26°C with a fan saves approximately how much?',
      optionsTh: ['แทบไม่ลดเลย', 'ประมาณ 10-15%', 'ลด 80%'],
      optionsEn: ['Almost nothing', 'Around 10-15%', '80% drop'],
      correctIndex: 1,
      explanationTh: 'ถูกต้อง! คอมเพรสเซอร์ทำงานเบาลงทุก 1°C ช่วยประหยัดได้ 7-10% รวม 2 องศาได้มากถึง 15%!'
    }
  },
  {
    id: 'standby_cut_vampire',
    category: 'basics',
    categoryTh: 'พื้นฐานไฟฟ้า',
    categoryEn: 'Electrical Basics',
    applianceType: 'Entertainment',
    titleTh: 'ทำความรู้จัก "ไฟแวมไพร์" (Standby Power)',
    titleEn: 'Meet the "Vampire Power" (Standby)',
    readTimeSec: 40,
    highlightStatTh: 'ดูดเงินเงียบๆ 30-80 บาท/เดือน',
    highlightStatEn: 'Silently drains ฿30-80/mo',
    contentTh: 'เครื่องใช้ไฟฟ้าที่มีไฟแดงจุดเล็กๆ หรือนาฬิกาดิจิทัล (เช่น กล่องทีวี, คอมพิวเตอร์, ไมโครเวฟ) ยังคงกินไฟตลอดเวลา 1-5 วัตต์ แม้เราจะกดรีโมทปิดแล้ว แค่ใช้ปลั๊กพ่วงมีสวิตช์ตัดไฟก็ช่วยกำจัดไฟแวมไพร์ได้ 100%!',
    contentEn: 'Appliances with indicator LEDs or digital displays continuously pull 1-5W in standby. A switched power strip eliminates this phantom load completely.',
    quiz: {
      questionTh: 'วิธีตัดไฟแวมไพร์ (Standby Power) ที่ง่ายและได้ผลที่สุดคืออะไร?',
      questionEn: 'What is the easiest and most effective way to eliminate Standby Power?',
      optionsTh: ['กดปิดด้วยรีโมท', 'ปิดสวิตช์ปลั๊กพ่วงหรือถอดปลั๊ก', 'ทาสีดำทับไฟสถานะ'],
      optionsEn: ['Turn off via remote', 'Switch off power strip or unplug', 'Cover LED with tape'],
      correctIndex: 1,
      explanationTh: 'แม่นยำมาก! การปิดสวิตช์ปลั๊กพ่วงจะตัดกระแสไฟต้นทาง ไม่ให้ไฟรั่วไหลเข้าหม้อแปลงอุปกรณ์'
    }
  },
  {
    id: 'fridge_airflow',
    category: 'saving_tips',
    categoryTh: 'เทคนิคประหยัด',
    categoryEn: 'Saving Tips',
    applianceType: 'Kitchen',
    titleTh: 'เว้นระยะตู้เย็น 15 ซม. ค่าไฟลดทันที',
    titleEn: 'Keep 15cm gap behind your fridge',
    readTimeSec: 35,
    highlightStatTh: 'ประหยัดไฟขึ้น 8-12%',
    highlightStatEn: '8-12% higher efficiency',
    contentTh: 'แผงระบายความร้อนหลังตู้เย็นต้องการอากาศถ่ายเท หากวางชิดผนังเกินไป คอมเพรสเซอร์จะร้อนจัดและทำงานหนักขึ้นถึง 15% อย่าลืมไม่ใส่ของแน่นเกินไป เพื่อให้อากาศเย็นหมุนเวียนได้ทั่วถึงนะ!',
    contentEn: 'Condenser coils need airflow. Placing the fridge too close to the wall overheats the compressor, forcing it to consume up to 15% more power.',
    quiz: {
      questionTh: 'ควรเว้นระยะห่างระหว่างหลังตู้เย็นกับผนังอย่างน้อยกี่เซนติเมตร?',
      questionEn: 'How much minimum clearance should you leave behind the refrigerator?',
      optionsTh: ['ชิดติดผนังได้เลย', 'อย่างน้อย 10-15 ซม.', '1 เมตร'],
      optionsEn: ['Flush against wall', 'At least 10-15 cm', '1 meter'],
      correctIndex: 1,
      explanationTh: 'เก่งมาก! ระยะ 10-15 ซม. ช่วยให้ความร้อนระบายออกได้สะดวก คอมเพรสเซอร์ไม่ต้องทำงานโอเวอร์โหลด'
    }
  },
  {
    id: 'tou_off_peak_strategy',
    category: 'bill_reading',
    categoryTh: 'อ่านบิลค่าไฟ',
    categoryEn: 'Bill Reading',
    titleTh: 'เทคนิคมิเตอร์ TOU: ซักผ้า 4 ทุ่ม ลดค่าไฟ 40%',
    titleEn: 'TOU Strategy: Night laundry saves 40%',
    readTimeSec: 50,
    highlightStatTh: 'ค่าไฟลดเหลือ ~2.6 บาท/หน่วย',
    highlightStatEn: 'Rate drops to ~฿2.6/unit',
    contentTh: 'มิเตอร์ TOU คิดค่าไฟ 2 ราคา: ช่วง On-Peak (09:00-22:00 จ.-ศ.) หน่วยละ ~5.8 บาท แต่ช่วง Off-Peak (หลัง 4 ทุ่ม และวันเสาร์-อาทิตย์ทั้งวัน) ค่าไฟถูกลงเหลือแค่ ~2.6 บาท! ย้ายงานใช้ไฟหนักมาเวลานี้ ประหยัดฟินๆ เลย',
    contentEn: 'TOU meters charge ~฿5.8/kWh on peak hours, but drop to ~฿2.6/kWh during Off-Peak (after 22:00 weekdays and all day weekends/holidays).',
    quiz: {
      questionTh: 'ช่วง Off-Peak ของมิเตอร์ TOU ที่ค่าไฟถูกที่สุด เริ่มต้นตั้งแต่เวลากี่โมงในวันจันทร์-ศุกร์?',
      questionEn: 'When does the Off-Peak cheap tariff start on weekdays?',
      optionsTh: ['18:00 น.', '22:00 น.', '00:00 น.'],
      optionsEn: ['18:00', '22:00', '00:00 midnight'],
      correctIndex: 1,
      explanationTh: 'ถูกต้อง! ตั้งแต่ 22:00 ถึง 09:00 ของวันรุ่งขึ้น และทั้งวันในวันหยุดเสาร์-อาทิตย์ ค่าไฟถูกลงเกือบครึ่ง!'
    }
  },
  {
    id: 'inverter_vs_fixed',
    category: 'appliance_buying',
    categoryTh: 'เลือกซื้อเครื่องใช้ไฟฟ้า',
    categoryEn: 'Appliance Buying',
    titleTh: 'Inverter คุ้มจริงไหม หรือแค่การตลาด?',
    titleEn: 'Is Inverter worth it or just hype?',
    readTimeSec: 55,
    highlightStatTh: 'คืนทุนส่วนต่างใน 1-2 ปี',
    highlightStatEn: 'Payback within 1-2 years',
    contentTh: 'ระบบ Inverter ปรับรอบมอเตอร์ตามอุณหภูมิ ไม่ตัด-ต่อบ่อยเหมือนรุ่นธรรมดา หากเปิดแอร์หรือตู้เย็นมากกว่า 6 ชม./วัน ระบบ Inverter ประหยัดไฟกว่ารุ่นทั่วไปถึง 30-40% ช่วยประหยัดเงินได้ปีละ 2,000-3,500 บาท!',
    contentEn: 'Inverters vary motor speed continuously rather than stop-start cycling. If operated over 6 hours/day, they save 30-40% energy compared to non-inverters.',
    quiz: {
      questionTh: 'ระบบ Inverter ประหยัดไฟมากกว่าระบบตัดต่อธรรมดาประมาณกี่เปอร์เซ็นต์?',
      questionEn: 'How much more energy efficient is an Inverter compared to conventional systems?',
      optionsTh: ['5%', '30-40%', '90%'],
      optionsEn: ['5%', '30-40%', '90%'],
      correctIndex: 1,
      explanationTh: 'ใช่เลย! ลดการกระชากไฟตอนสตาร์ทและรักษาอุณหภูมิคงที่ จึงประหยัดได้เฉลี่ย 30-40% เลยทีเดียว'
    }
  }
];

interface ContextualMicroLearningCardProps {
  applianceCategory?: string;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onEarnXp?: (xp: number) => void;
  compact?: boolean;
}

export const ContextualMicroLearningCard: React.FC<ContextualMicroLearningCardProps> = ({
  applianceCategory,
  lang,
  isDarkMode,
  onEarnXp,
  compact = false,
}) => {
  // Find matching tip or fallback to first
  const tip = CONTEXTUAL_TIPS.find(t => t.applianceType === applianceCategory) || CONTEXTUAL_TIPS[0];
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitQuiz = () => {
    if (selectedOption === null || !tip.quiz) return;
    const correct = selectedOption === tip.quiz.correctIndex;
    setIsCorrect(correct);
    setQuizSubmitted(true);

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      onEarnXp?.(20);
    }
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setQuizSubmitted(false);
    setIsCorrect(false);
    setIsQuizOpen(false);
  };

  return (
    <div className={`rounded-2xl border transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/80 border-slate-800 text-white' 
        : 'bg-emerald-50/70 border-emerald-200/60 text-slate-800'
    } ${compact ? 'p-3.5' : 'p-4'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[0.68rem] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {lang === 'th' ? tip.categoryTh : tip.categoryEn}
              </span>
              <span className="text-[0.65rem] text-slate-400 flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" />
                {tip.readTimeSec}s
              </span>
            </div>
            <h4 className="text-xs md:text-sm font-bold leading-snug">
              {lang === 'th' ? tip.titleTh : tip.titleEn}
            </h4>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[0.68rem] font-black shrink-0 border border-emerald-500/30">
          {lang === 'th' ? tip.highlightStatTh : tip.highlightStatEn}
        </span>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        {lang === 'th' ? tip.contentTh : tip.contentEn}
      </p>

      {tip.quiz && (
        <div className="mt-3 pt-2.5 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[0.7rem] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            {lang === 'th' ? 'ตอบคำถามสั้น +20 XP' : 'Quick Quiz +20 XP'}
          </span>
          <button
            onClick={() => setIsQuizOpen(true)}
            className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[0.72rem] transition-all flex items-center gap-1 shadow-sm active:scale-95"
          >
            <span>{lang === 'th' ? 'ทดสอบความรู้' : 'Take Quiz'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Quiz Modal */}
      <AnimatePresence>
        {isQuizOpen && tip.quiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-3xl p-5 border shadow-2xl relative ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={handleResetQuiz}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-500">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-black uppercase text-amber-500">
                  {lang === 'th' ? 'แบบทดสอบสั้น 30 วินาที' : '30-Second Micro Quiz'}
                </span>
              </div>

              <h3 className="text-sm md:text-base font-bold mb-4">
                {lang === 'th' ? tip.quiz.questionTh : tip.quiz.questionEn}
              </h3>

              <div className="space-y-2 mb-4">
                {(lang === 'th' ? tip.quiz.optionsTh : tip.quiz.optionsEn).map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isTheCorrectOne = tip.quiz?.correctIndex === idx;

                  let btnStyle = isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700';
                  if (isSelected && !quizSubmitted) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                  } else if (quizSubmitted) {
                    if (isTheCorrectOne) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                    } else if (isSelected && !isTheCorrectOne) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left px-3.5 py-2.5 rounded-2xl border text-xs md:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isTheCorrectOne && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-2xl text-xs mb-4 ${
                    isCorrect 
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300' 
                      : 'bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  <p className="font-bold mb-0.5">
                    {isCorrect ? '🎉 ถูกต้อง! ได้รับ +20 XP' : '💡 ไม่เป็นไรนะ ลองดูคำอธิบายนี้:'}
                  </p>
                  <p>{tip.quiz.explanationTh}</p>
                </motion.div>
              )}

              <div className="flex items-center justify-end gap-2">
                {!quizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={selectedOption === null}
                    className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs md:text-sm shadow-md transition-all"
                  >
                    {lang === 'th' ? 'ส่งคำตอบ' : 'Submit Answer'}
                  </button>
                ) : (
                  <button
                    onClick={handleResetQuiz}
                    className="w-full py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs md:text-sm transition-all"
                  >
                    {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
