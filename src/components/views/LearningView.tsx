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
  Cpu,
  Gamepad2,
  Target
} from 'lucide-react';
import { LearningPath, Lesson, GlossaryTerm, InfoDetailMode, SkillTreeNode, LearningQuest } from '../../types';
import { SkillTree } from '../gamification/SkillTree';
import { MiniGamesHub } from '../gamification/MiniGamesHub';
import { FullScreenLearningExperience } from '../learning/FullScreenLearningExperience';
import { INITIAL_SKILL_TREE_NODES, INITIAL_LEARNING_QUESTS } from '../../data/gamificationData';

interface LearningViewProps {
  learningPaths: LearningPath[];
  glossaryTerms: GlossaryTerm[];
  onCompleteLesson: (lessonId: string, xp: number) => void;
  onRestartOnboarding: () => void;
  isDarkMode: boolean;
  lang: 'th' | 'en';
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
  onRewardCoins?: (coins: number, xp: number) => void;
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
  onRewardCoins
}) => {
  const [activeTab, setActiveTab] = useState<'tree' | 'paths' | 'minigames' | 'quests' | 'simulators'>('tree');
  const [skillNodes, setSkillNodes] = useState<SkillTreeNode[]>(INITIAL_SKILL_TREE_NODES);
  const [learningQuests, setLearningQuests] = useState<LearningQuest[]>(INITIAL_LEARNING_QUESTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

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

  const handleCompleteSkillNode = (nodeId: string) => {
    setSkillNodes(prev => prev.map(n => n.id === nodeId ? { ...n, completed: true } : n));
    if (onRewardCoins) onRewardCoins(20, 50);
  };

  // Calculate Watt-to-Bill values
  const dailyKwh = (simWatts * simHours) / 1000;
  const dailyCost = dailyKwh * simRate;
  const monthlyCost = dailyCost * 30;

  // Calculate AC Temp Saving
  const acBaseCost = 1300;
  const tempDiff = acTemp - 24;
  const tempSavingPercent = tempDiff * 8 + (fanOption ? 5 : 0);
  const acFinalCost = Math.max(300, acBaseCost * (1 - tempSavingPercent / 100));

  return (
    <div id="tour-step-learning" className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-xl relative overflow-hidden transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-gradient-to-br from-teal-50 via-emerald-50/50 to-teal-100/30 border-teal-100 text-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                {lang === 'th' ? 'ศูนย์เรียนรู้ & เกมจำลองพลังงาน' : 'EduEase Learning & Mini-Games'}
              </span>

              {onStartPageTour && (
                <button
                  onClick={() => onStartPageTour(5)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/25 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                  <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}</span>
                </button>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight">
              {lang === 'th' ? 'ต้นไม้ทักษะ & มินิเกมพลังงาน 2.0' : 'Skill Tree & Energy Gamification'}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
              {lang === 'th' 
                ? 'เรียนรู้เรื่องไฟฟ้าอย่างสนุก ปลดล็อกโหนดความรู้ ทำมินิเกมดวลวัตต์ และทำเควสความรู้ประจำวัน' 
                : 'Unlock skill tree nodes, battle wattage in mini-games, and complete guided energy quests.'}
            </p>
          </div>

          {/* Sub-Tabs Toggle Row */}
          <div className={`p-1.5 rounded-2xl border flex flex-wrap items-center gap-1 shrink-0 ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-teal-200 shadow-sm'
          }`}>
            <button
              onClick={() => setActiveTab('tree')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'tree'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'th' ? 'ต้นไม้ทักษะ' : 'Skill Tree'}</span>
            </button>

            <button
              onClick={() => setActiveTab('paths')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'paths'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'th' ? 'คอร์สเรียนพลังงาน' : 'Lessons'}</span>
            </button>

            <button
              onClick={() => setActiveTab('minigames')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'minigames'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>{lang === 'th' ? 'มินิเกม' : 'Mini Games'}</span>
            </button>

            <button
              onClick={() => setActiveTab('quests')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'quests'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>{lang === 'th' ? 'เควสความรู้' : 'Quests'}</span>
            </button>

            <button
              onClick={() => setActiveTab('simulators')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'simulators'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{lang === 'th' ? 'จำลองค่าไฟ' : 'Simulators'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: SKILL TREE / LEARNING TREE */}
      {activeTab === 'tree' && (
        <SkillTree
          nodes={skillNodes}
          lang={lang}
          isDarkMode={isDarkMode}
          onCompleteNode={handleCompleteSkillNode}
        />
      )}

      {/* TAB 2: EDUCATIONAL MINI GAMES HUB */}
      {activeTab === 'minigames' && (
        <MiniGamesHub
          appliances={[]}
          lang={lang}
          isDarkMode={isDarkMode}
          onRewardCoins={onRewardCoins}
        />
      )}

      {/* TAB 3: LEARNING QUESTS */}
      {activeTab === 'quests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black font-display text-slate-800 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-500" />
              {lang === 'th' ? 'ภารกิจเควสความรู้ (Guided Learning Quests)' : 'Guided Learning Quests'}
            </h2>
          </div>

          <div className="space-y-4">
            {learningQuests.map((quest) => (
              <div
                key={quest.id}
                className={`p-6 rounded-[2.5rem] border transition-all ${
                  isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
                      {lang === 'th' ? quest.titleTh : quest.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {lang === 'th' ? quest.descTh : quest.descEn}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      +{quest.xpReward} XP
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 font-bold text-xs">
                      +{quest.coinReward} Coins
                    </span>
                  </div>
                </div>

                {/* Quest Objectives Checklist */}
                <div className="space-y-2">
                  {quest.objectives.map((obj) => (
                    <div
                      key={obj.id}
                      className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between ${
                        obj.completed
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                          : isDarkMode
                            ? 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle className={`w-4 h-4 ${obj.completed ? 'text-emerald-500' : 'text-slate-400'}`} />
                        <span>{lang === 'th' ? obj.titleTh : obj.titleEn}</span>
                      </div>
                      <span className="text-[0.65rem] text-slate-400">
                        {obj.completed ? (lang === 'th' ? 'เสร็จสิ้น ✓' : 'Done ✓') : (lang === 'th' ? 'กำลังทำ' : 'In Progress')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE ENERGY SIMULATORS */}
      {activeTab === 'simulators' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Simulator 1: Watt-to-Bill Simulator */}
            <div className={`p-6 rounded-[2.5rem] border shadow-lg ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-teal-100'
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
                    <span className="text-teal-600 dark:text-teal-400 font-extrabold">{simWatts} W</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={3500}
                    step={10}
                    value={simWatts}
                    onChange={(e) => setSimWatts(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>ระยะเวลาเปิดใช้งานต่อวัน (Hours):</span>
                    <span className="text-teal-600 dark:text-teal-400 font-extrabold">{simHours} ชม./วัน</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={24}
                    step={0.5}
                    value={simHours}
                    onChange={(e) => setSimHours(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-3 text-center">
                  <div>
                    <span className="text-[0.68rem] text-slate-400 uppercase">ใช้ไฟวันละ</span>
                    <div className="text-lg font-black text-slate-800 dark:text-white">
                      {dailyKwh.toFixed(2)} kWh
                    </div>
                    <span className="text-[0.65rem] text-teal-600 dark:text-teal-400 font-bold">
                      (฿{dailyCost.toFixed(2)} / วัน)
                    </span>
                  </div>

                  <div>
                    <span className="text-[0.68rem] text-slate-400 uppercase">ค่าไฟประมาณการรายเดือน</span>
                    <div className="text-xl font-black text-teal-600 dark:text-teal-400">
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
            <div className={`p-6 rounded-[2.5rem] border shadow-lg ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-teal-100'
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
                      fanOption ? 'bg-teal-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
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
                    <div className="text-xl font-black text-teal-600 dark:text-teal-400">
                      {tempSavingPercent > 0 ? `+${tempSavingPercent}%` : '0%'}
                    </div>
                    <span className="text-[0.65rem] text-teal-600 dark:text-teal-400 font-bold">
                      (ประหยัดเงิน ฿{(acBaseCost - acFinalCost).toFixed(0)}/เดือน)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LEARNING PATHS & COURSES */}
      {activeTab === 'paths' && (
        <div className="space-y-6">
          {learningPaths.map((path) => (
            <div
              key={path.id}
              className={`p-6 rounded-[2.5rem] border shadow-lg ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-teal-100'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-black">
                  <Zap className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">
                    {lang === 'th' ? path.titleTh : path.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {lang === 'th' ? path.descTh : path.descEn}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {path.lessons.map((les) => (
                  <div
                    key={les.id}
                    className={`p-5 rounded-[20px] border transition-all space-y-3 ${
                      isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {les.readTime} • +{les.xpReward} XP
                      </span>
                      {les.completed && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px]">
                          ✓ เสร็จแล้ว
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-base font-display text-slate-900 dark:text-white line-clamp-2">
                      {lang === 'th' ? les.titleTh : les.titleEn}
                    </h4>

                    <button
                      onClick={() => setSelectedLesson(les)}
                      className="w-full h-[52px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>{lang === 'th' ? 'เริ่มเรียนบทเรียนนี้' : 'Start Mobile Lesson'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dedicated Full-Screen Learning Experience Page */}
      {selectedLesson && (
        <FullScreenLearningExperience
          lesson={selectedLesson}
          pathTitle={learningPaths.find(p => p.lessons.some(l => l.id === selectedLesson.id))?.titleTh || 'Energy Academy'}
          onClose={() => setSelectedLesson(null)}
          onCompleteLesson={onCompleteLesson}
          onRewardCoins={onRewardCoins}
          lang={lang}
          isDarkMode={isDarkMode}
          detailMode={infoDetailMode}
          onNextLesson={() => {
            // Find next lesson
            const allLessons = learningPaths.flatMap(p => p.lessons);
            const idx = allLessons.findIndex(l => l.id === selectedLesson.id);
            if (idx !== -1 && idx < allLessons.length - 1) {
              setSelectedLesson(allLessons[idx + 1]);
            } else {
              setSelectedLesson(null);
            }
          }}
        />
      )}
    </div>
  );
};

