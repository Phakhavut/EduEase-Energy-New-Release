import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  Zap, 
  Search, 
  Sparkles, 
  Play, 
  CheckCircle, 
  ChevronRight, 
  Flame, 
  Snowflake, 
  Clock, 
  Calculator, 
  Sliders, 
  Info, 
  RotateCcw,
  Compass,
  ArrowRight,
  Shield,
  Lightbulb,
  Building2,
  Cpu
} from 'lucide-react';
import { LearningPath, Lesson, GlossaryTerm, InfoDetailMode } from '../../types';

interface LearningViewProps {
  learningPaths: LearningPath[];
  glossaryTerms: GlossaryTerm[];
  onCompleteLesson: (lessonId: string, xp: number) => void;
  onRestartOnboarding: () => void;
  isDarkMode: boolean;
  lang: 'th' | 'en';
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
}

export const LearningView: React.FC<LearningViewProps> = ({
  learningPaths,
  glossaryTerms,
  onCompleteLesson,
  onRestartOnboarding,
  isDarkMode,
  lang,
  infoDetailMode,
  onStartPageTour,
}) => {
  const [activeTab, setActiveTab] = useState<'academy' | 'guide'>('academy');
  const [selectedPathId, setSelectedPathId] = useState<string>(learningPaths[0]?.id || 'path_basics');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswerResult, setShowAnswerResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Simulators State
  const [simWatts, setSimWatts] = useState(1000);
  const [simHours, setSimHours] = useState(8);
  const [simRate, setSimRate] = useState(4.2);

  const [acTemp, setAcTemp] = useState(25);
  const [fanOption, setFanOption] = useState(true);

  // Search filter for glossary
  const filteredGlossary = glossaryTerms.filter(t => 
    t.termTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.termEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.definitionTh.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPath = learningPaths.find(p => p.id === selectedPathId) || learningPaths[0];

  const handleAnswerSubmit = (index: number) => {
    setSelectedAnswer(index);
    setShowAnswerResult(true);
    if (activeLesson && index === activeLesson.correctIndex) {
      onCompleteLesson(activeLesson.id, activeLesson.xpReward);
    }
  };

  // Calculate Watt-to-Bill values
  const dailyKwh = (simWatts * simHours) / 1000;
  const dailyCost = dailyKwh * simRate;
  const monthlyCost = dailyCost * 30;

  // Calculate AC Temp Saving
  // Base cost at 24°C = 1,300 Baht/month. Each +1°C saves ~8%.
  const acBaseCost = 1300;
  const tempDiff = acTemp - 24;
  const tempSavingPercent = tempDiff * 8 + (fanOption ? 5 : 0);
  const acFinalCost = Math.max(300, acBaseCost * (1 - tempSavingPercent / 100));

  return (
    <div id="tour-step-learning" className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-gradient-to-br from-emerald-50 via-teal-50/50 to-emerald-100/30 border-emerald-100 text-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                {lang === 'th' ? 'ศูนย์เรียนรู้ & คู่มือการใช้งาน' : 'EduEase Academy & Guide'}
              </span>

              {onStartPageTour && (
                <button
                  onClick={() => onStartPageTour(5)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                  <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}</span>
                </button>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight">
              {lang === 'th' ? 'เรียนรู้ & คู่มือ (Learning & Guide)' : 'Learning & User Guide'}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
              {lang === 'th' 
                ? 'โลกการเรียนรู้พลังงานฉบับเข้าใจง่าย สนุกกับมินิเกม จำลองค่าไฟ และคู่มือใช้งานแอปพลิเคชัน' 
                : 'Interactive electricity mini-lessons, simulators, energy glossary, and app user guides.'}
            </p>
          </div>

          {/* Main Tab Toggle */}
          <div className={`p-1.5 rounded-2xl border flex items-center gap-1 shrink-0 ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-emerald-200 shadow-sm'
          }`}>
            <button
              onClick={() => setActiveTab('academy')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'academy'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'th' ? 'เรียนรู้เรื่องไฟฟ้า' : 'Energy Academy'}</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'guide'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{lang === 'th' ? 'วิธีใช้ EduEase' : 'User Guide'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB A: EDU EASE ENERGY ACADEMY */}
      {activeTab === 'academy' && (
        <div className="space-y-8">
          {/* Section 1: Learning Paths Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-black font-display text-slate-800 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              {lang === 'th' ? 'หลักสูตรพลังงานระดับมือโปร (Learning Paths)' : 'Learning Paths'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {learningPaths.map((path) => {
                const isSelected = path.id === selectedPathId;
                return (
                  <button
                    key={path.id}
                    onClick={() => setSelectedPathId(path.id)}
                    className={`p-5 rounded-3xl border transition-all text-left relative overflow-hidden ${
                      isSelected
                        ? isDarkMode
                          ? 'bg-slate-900 border-emerald-500/60 shadow-xl shadow-emerald-950/30'
                          : 'bg-white border-emerald-400 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                        : isDarkMode
                          ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          : 'bg-white/80 border-slate-200/80 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isSelected 
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {path.lessons.length} บทเรียน
                      </span>
                      {isSelected && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                    </div>

                    <h3 className="font-extrabold text-base text-slate-800 dark:text-white font-display mb-1">
                      {lang === 'th' ? path.titleTh : path.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2">
                      {path.descTh}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Selected Path Lessons & Interactive Quiz */}
          {currentPath && (
            <div className={`p-6 rounded-3xl border shadow-lg ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-emerald-100'
            }`}>
              <h3 className="text-xl font-extrabold font-display text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                {currentPath.titleTh}
              </h3>

              <div className="space-y-4">
                {currentPath.lessons.map((les) => {
                  const isOpen = activeLesson?.id === les.id;
                  return (
                    <div
                      key={les.id}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isOpen 
                          ? 'border-emerald-500/50 bg-emerald-50/20 dark:bg-emerald-950/10' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300'
                      }`}
                    >
                      <button
                        onClick={() => {
                          if (isOpen) {
                            setActiveLesson(null);
                          } else {
                            setActiveLesson(les);
                            setSelectedAnswer(null);
                            setShowAnswerResult(false);
                          }
                        }}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-xs">
                            <Play className="w-4 h-4 fill-emerald-500" />
                          </div>
                          <div>
                            <span className="text-slate-800 dark:text-white font-display">{les.titleTh}</span>
                            <span className="text-xs text-slate-400 font-normal ml-2">({les.readTime})</span>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                          +{les.xpReward} XP
                          <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-5"
                          >
                            {/* Lesson Content Text */}
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                              {les.contentTh}
                            </div>

                            {/* Quiz Section */}
                            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700 space-y-3">
                              <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4" />
                                คำถามทดสอบความเข้าใจประจำบท
                              </h4>
                              <p className="font-bold text-sm text-slate-800 dark:text-white">
                                {les.questionTh}
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                                {les.optionsTh.map((opt, idx) => {
                                  const isSelected = selectedAnswer === idx;
                                  const isCorrect = idx === les.correctIndex;

                                  let btnStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400';
                                  if (showAnswerResult) {
                                    if (isCorrect) {
                                      btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                                    } else if (isSelected) {
                                      btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                                    }
                                  }

                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => handleAnswerSubmit(idx)}
                                      disabled={showAnswerResult}
                                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${btnStyle}`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {showAnswerResult && (
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="p-3.5 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold leading-relaxed"
                                >
                                  {les.explanationTh}
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 3: Interactive Energy Simulators */}
          <div className="space-y-4">
            <h2 className="text-lg font-black font-display text-slate-800 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-500" />
              {lang === 'th' ? 'เครื่องมือจำลองไฟฟ้าโต้ตอบ (Interactive Simulators)' : 'Energy Simulators'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Simulator 1: Watt-to-Bill Simulator */}
              <div className={`p-6 rounded-3xl border shadow-lg ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'
              }`}>
                <h3 className="font-extrabold text-base font-display text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  1. เครื่องคำนวณวัตต์แปลงเป็นค่าไฟ (Watt-to-Bill Simulator)
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  เลื่อนปรับค่าวัตต์และจำนวนชั่วโมงเพื่อดูค่าไฟจริงทันที
                </p>

                <div className="space-y-4 text-xs font-bold">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>กำลังไฟฟ้า (Watts):</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{simWatts} W</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={3500}
                      step={10}
                      value={simWatts}
                      onChange={(e) => setSimWatts(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>ระยะเวลาเปิดใช้งานต่อวัน (Hours):</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{simHours} ชม./วัน</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={24}
                      step={0.5}
                      value={simHours}
                      onChange={(e) => setSimHours(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-3 text-center">
                    <div>
                      <span className="text-[0.68rem] text-slate-400 uppercase">ใช้ไฟวันละ</span>
                      <div className="text-lg font-black text-slate-800 dark:text-white">
                        {dailyKwh.toFixed(2)} kWh
                      </div>
                      <span className="text-[0.65rem] text-emerald-600 dark:text-emerald-400 font-bold">
                        (฿{dailyCost.toFixed(2)} / วัน)
                      </span>
                    </div>

                    <div>
                      <span className="text-[0.68rem] text-slate-400 uppercase">ค่าไฟประมาณการรายเดือน</span>
                      <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                        ฿{monthlyCost.toFixed(0)}
                      </div>
                      <span className="text-[0.65rem] text-slate-400">
                        (อ้างอิง ฿{simRate}/หน่วย)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulator 2: AC Temperature Simulator */}
              <div className={`p-6 rounded-3xl border shadow-lg ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'
              }`}>
                <h3 className="font-extrabold text-base font-display text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <Snowflake className="w-4 h-4 text-sky-500" />
                  2. เครื่องจำลองอุณหภูมิแอร์ (AC Temp Simulator)
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  ทดลองปรับองศาแอร์แล้วดูผลประหยัดเงินในกระเป๋าของคุณ
                </p>

                <div className="space-y-4 text-xs font-bold">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>อุณหภูมิที่ตั้งไว้ (Set Temperature):</span>
                      <span className="text-sky-600 dark:text-sky-400 font-extrabold">{acTemp}°C</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={30}
                      value={acTemp}
                      onChange={(e) => setAcTemp(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span>เปิดพัดลมส่ายช่วยกระจายลมเย็น (+5% Saving):</span>
                    <button
                      onClick={() => setFanOption(!fanOption)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        fanOption ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      {fanOption ? 'เปิดทำงาน' : 'ปิด'}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 grid grid-cols-2 gap-3 text-center">
                    <div>
                      <span className="text-[0.68rem] text-slate-400 uppercase">ค่าไฟแอร์ประมาณการ</span>
                      <div className="text-xl font-black text-slate-800 dark:text-white">
                        ฿{acFinalCost.toFixed(0)} / เดือน
                      </div>
                    </div>

                    <div>
                      <span className="text-[0.68rem] text-slate-400 uppercase">ประหยัดได้ขึ้นถึง</span>
                      <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                        {tempSavingPercent > 0 ? `+${tempSavingPercent}%` : '0%'}
                      </div>
                      <span className="text-[0.65rem] text-emerald-600 dark:text-emerald-400 font-bold">
                        (ประหยัดเงิน ฿{(acBaseCost - acFinalCost).toFixed(0)}/เดือน)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Searchable Energy Glossary */}
          <div className={`p-6 rounded-3xl border shadow-lg space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black font-display text-slate-800 dark:text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-teal-500" />
                  {lang === 'th' ? 'คลังคำศัพท์พลังงาน (Energy Glossary)' : 'Energy Glossary'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {lang === 'th' ? 'ค้นหาความหมายศัพท์เทคนิคเกี่ยวกับไฟฟ้าที่พบในบิลและหน้าต่างวิเคราะห์' : 'Search technical electricity jargon.'}
                </p>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'th' ? 'ค้นหาคำศัพท์ เช่น Ft, TOU...' : 'Search terms...'}
                  className={`w-full pl-10 pr-4 py-2 rounded-2xl border text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {filteredGlossary.map((term) => (
                <div
                  key={term.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/80 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-extrabold text-sm text-slate-800 dark:text-white font-display">
                      {term.termTh}
                    </h4>
                    <span className="text-[0.65rem] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      {term.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-2">
                    {term.definitionTh}
                  </p>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-[0.7rem] text-slate-500 dark:text-slate-400 font-semibold italic">
                    💡 ตัวอย่าง: {term.exampleTh}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB B: PRODUCT USER GUIDE */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          {/* Quick Start Tour Featured Banner */}
          <div className={`p-6 rounded-3xl border shadow-lg relative overflow-hidden bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 ${
            isDarkMode ? 'border-emerald-500/30 text-white' : 'border-emerald-200 text-slate-800'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-500/25 shrink-0 mt-0.5">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[0.7rem] uppercase tracking-wider mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{lang === 'th' ? 'แนะนำแบบย่อ 60 วินาที' : '60-Second Walkthrough'}</span>
                  </div>
                  <h3 className="text-lg font-black font-display">
                    {lang === 'th' ? 'Quick Start Tour (นำสอน Spotlight ครบ 7 ฟีเจอร์)' : 'Quick Start Tour (Spotlight Walkthrough)'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {lang === 'th' 
                      ? 'ระบบนำทางไฮไลต์แบบเจาะจง (Spotlight) พาชมระบบหน้าหลัก, สถานที่, อุปกรณ์, งบประมาณ, AI Coach, การเรียนรู้ และภารกิจ'
                      : 'Interactive spotlight tour guiding you through Home, Locations, Appliances, Budget, AI Coach, Learning, and Missions.'}
                  </p>
                </div>
              </div>

              <button
                onClick={onRestartOnboarding}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'th' ? 'เริ่มต้น Quick Start Tour' : 'Start Quick Start Tour'}</span>
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border shadow-lg space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-black font-display text-slate-800 dark:text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-500" />
                  {lang === 'th' ? 'คู่มือการใช้งาน EduEase Energy' : 'EduEase Product User Guide'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  คำแนะนำการใช้งานและวิธีดึงประสิทธิภาพสูงสุดจากแอปพลิเคชัน
                </p>
              </div>
            </div>

            {/* Step-by-step guides */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">1</span>
                  การเพิ่มเครื่องใช้ไฟฟ้าอย่างถูกต้อง
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium pl-8">
                  คุณสามารถเพิ่มเครื่องใช้ไฟฟ้าได้จากเมนู "เครื่องใช้ไฟฟ้า" โดยเลือกใช้เทมเพลตมาตรฐาน หากไม่ทราบกำลังไฟให้กดตัวเลือก "ไม่ทราบกำลังไฟ" ระบบจะแนะนำถ่ายรูปฉลากประหยัดไฟเบอร์ 5 เพื่อประเมินวัตต์ให้อัตโนมัติครับ
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">2</span>
                  การสลับโหมดการแสดงผลข้อมูล (Simple / Balanced / Detailed)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium pl-8">
                  คุณสามารถปรับระดับความละเอียดของข้อมูลได้ตลอดเวลาตรงมุมขวาบนของแอป โดยโหมด "เข้าใจง่าย" จะเน้นตัวเลขบาทไทย ส่วนโหมด "ละเอียด" จะแสดงสมการ, ค่า Ft, และตัวประกอบกำลัง PF แบบครบถ้วน
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">3</span>
                  การใช้งาน AI Energy Coach
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium pl-8">
                  Voltie เป็น AI ช่วยวิเคราะห์พฤติกรรมการใช้ไฟจริงของคุณ โดยคุณสามารถพิมพ์ถามข้อสงสัย เช่น "ทำไมค่าไฟเดือนนี้ถึงสูง?" หรือกดปุ่ม "ลองทำตามคำแนะนำ" เพื่อสะสม XP และ Energy Coins ได้ทันที
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
