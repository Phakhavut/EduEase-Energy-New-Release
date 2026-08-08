import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Flame, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  Gift, 
  Lock, 
  Zap, 
  Award, 
  ChevronRight,
  Bot,
  Calendar,
  Layers,
  Thermometer,
  Power,
  Sun,
  Gamepad2,
  Moon,
  Clock,
  AlertTriangle,
  Wallet,
  BookOpen,
  BarChart2,
  Scale,
  Crown,
  Search,
  Filter,
  CheckSquare,
  Square,
  X,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  Mission, 
  DynamicMissionCategory, 
  LongTermGoal, 
  AiMissionRecommendation 
} from '../../types';
import { 
  INITIAL_DYNAMIC_MISSIONS, 
  INITIAL_LONG_TERM_GOALS, 
  AI_RECOMMENDED_MISSION 
} from '../../data/dynamicMissionsData';

interface DynamicMissionsHubProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  userLevel: number;
  userXp: number;
  userXpMax: number;
  userCoins: number;
  userStreak: number;
  savingScore?: number;
  onCompleteMission: (id: string, xpReward: number, coinReward: number) => void;
  onStartPageTour?: (stepIndex: number) => void;
}

export const DynamicMissionsHub: React.FC<DynamicMissionsHubProps> = ({
  lang,
  isDarkMode,
  userLevel,
  userXp,
  userXpMax,
  userCoins,
  userStreak,
  savingScore = 82,
  onCompleteMission,
  onStartPageTour
}) => {
  const [missionsList, setMissionsList] = useState<Mission[]>(INITIAL_DYNAMIC_MISSIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [longTermGoals] = useState<LongTermGoal[]>(INITIAL_LONG_TERM_GOALS);
  const [aiRecommendation] = useState<AiMissionRecommendation>(AI_RECOMMENDED_MISSION);

  // Reward Modal State
  const [completedRewardModal, setCompletedRewardModal] = useState<{
    mission: Mission;
    feedbackMessageTh: string;
  } | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleToggleMission = (missionId: string) => {
    setMissionsList(prev => prev.map(m => {
      if (m.id === missionId) {
        const isNowCompleted = !m.completed;
        if (isNowCompleted) {
          triggerConfetti();
          
          // Generate positive feedback
          let feedback = lang === 'th' 
            ? `ยอดเยี่ยมมาก! คุณสะสมคะแนนเพิ่ม +${m.xpReward} XP และ +${m.coinReward} Coins!`
            : `Awesome job! Earned +${m.xpReward} XP and +${m.coinReward} Coins!`;

          if (m.realWorldInfo) {
            feedback = lang === 'th'
              ? `🎉 สุขใจประหยัดไฟจริง! คุณลดค่าไฟบ้านได้ประมาณ ฿${m.realWorldInfo.aiEstimatedSavingThb.toFixed(2)} (${m.realWorldInfo.aiEstimatedSavingKwh} kWh) วันนี้!`
              : `🎉 Real-world saving! Saved ~฿${m.realWorldInfo.aiEstimatedSavingThb.toFixed(2)} (${m.realWorldInfo.aiEstimatedSavingKwh} kWh) today!`;
          }

          setCompletedRewardModal({
            mission: { ...m, completed: true },
            feedbackMessageTh: feedback
          });

          onCompleteMission(m.id, m.xpReward, m.coinReward);
        }
        return {
          ...m,
          completed: isNowCompleted,
          progress: isNowCompleted ? m.maxProgress : 0
        };
      }
      return m;
    }));
  };

  // Filter logic
  const filteredMissions = missionsList.filter(m => {
    const matchesCategory = selectedCategory === 'all' 
      ? true 
      : selectedCategory === 'realworld' 
        ? m.realWorldInfo?.isRealWorld
        : selectedCategory === 'chain'
          ? !!m.chainInfo
          : m.category === selectedCategory;

    const matchesSearch = searchQuery === '' || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'daily': return <Clock className="w-4 h-4 text-emerald-500" />;
      case 'weekly': return <Calendar className="w-4 h-4 text-amber-500" />;
      case 'monthly': return <Award className="w-4 h-4 text-purple-500" />;
      case 'learning': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'budget': return <Wallet className="w-4 h-4 text-emerald-600" />;
      case 'appliance': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'ai_coach': return <Bot className="w-4 h-4 text-cyan-500" />;
      case 'analytics': return <BarChart2 className="w-4 h-4 text-indigo-500" />;
      case 'community_event': return <Gamepad2 className="w-4 h-4 text-pink-500" />;
      case 'seasonal_event': return <Sun className="w-4 h-4 text-orange-500" />;
      case 'hidden': return <Moon className="w-4 h-4 text-slate-400" />;
      case 'lifestyle': return <Power className="w-4 h-4 text-teal-500" />;
      default: return <Trophy className="w-4 h-4 text-amber-500" />;
    }
  };

  const getMissionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Power': return <Power className="w-5 h-5 text-teal-500" />;
      case 'Thermometer': return <Thermometer className="w-5 h-5 text-sky-500" />;
      case 'Wallet': return <Wallet className="w-5 h-5 text-emerald-500" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Scale': return <Scale className="w-5 h-5 text-indigo-500" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'Clock': return <Clock className="w-5 h-5 text-purple-500" />;
      case 'BarChart2': return <BarChart2 className="w-5 h-5 text-cyan-500" />;
      case 'Sun': return <Sun className="w-5 h-5 text-orange-500" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-pink-500" />;
      case 'Moon': return <Moon className="w-5 h-5 text-slate-400" />;
      default: return <Award className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. AI MISSION COACH RECOMMENDATION BANNER */}
      {aiRecommendation && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 md:p-7 rounded-[2.5rem] border relative overflow-hidden transition-all shadow-xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border-sky-500/30 text-white' 
              : 'bg-gradient-to-r from-sky-50 via-white to-indigo-50 border-sky-200 text-slate-900 shadow-sky-500/5'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 shrink-0">
                <Bot className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-300 font-extrabold text-[0.7rem] uppercase border border-sky-500/30">
                    💡 Voltie AI Mission Recommendation
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[0.65rem]">
                    ~฿{aiRecommendation.expectedSavingThb.toFixed(2)} Saved/day
                  </span>
                </div>
                <h3 className="text-lg font-extrabold font-display">
                  {lang === 'th' ? 'ภารกิจแนะนำวันนี้: ปรับเพิ่มอุณหภูมิแอร์ 1°C' : 'Today\'s Recommended Mission: Raise AC Setpoint by 1°C'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                  {aiRecommendation.reasonTh}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleToggleMission(aiRecommendation.missionId)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{lang === 'th' ? 'ทำภารกิจ AI แนะนำ' : 'Accept AI Mission'}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* 2. CATEGORY FILTERS & SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'th' ? 'ค้นหาภารกิจออมไฟ...' : 'Search energy missions...'}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
              isDarkMode 
                ? 'bg-slate-900/80 border-slate-800 text-white placeholder-slate-500 focus:border-amber-500' 
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500'
            }`}
          />
        </div>

        {/* Category Chips Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', th: '🎯 ทั้งหมด', en: 'All' },
            { id: 'realworld', th: '🏠 ปฏิบัติจริง (Real-World)', en: 'Real-World' },
            { id: 'chain', th: '🔗 สายภารกิจ (Chains)', en: 'Chains' },
            { id: 'daily', th: '⏱️ รายวัน', en: 'Daily' },
            { id: 'weekly', th: '📅 รายสัปดาห์', en: 'Weekly' },
            { id: 'lifestyle', th: '🔌 ไลฟ์สไตล์', en: 'Lifestyle' },
            { id: 'learning', th: '📚 บทเรียน', en: 'Learning' },
            { id: 'seasonal_event', th: '☀️ อีเวนต์ฤดูกาล', en: 'Seasonal' },
            { id: 'hidden', th: '🕵️ ภารกิจลับ', en: 'Hidden' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : isDarkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {lang === 'th' ? cat.th : cat.en}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MISSIONS LIST GRID */}
      <div className="space-y-4">
        {filteredMissions.map((mission) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 md:p-6 rounded-[2.2rem] border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              mission.completed
                ? isDarkMode
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-75'
                  : 'bg-slate-50/80 border-slate-200/60 opacity-80'
                : mission.realWorldInfo?.isRealWorld
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-slate-900 via-teal-950/30 to-slate-900 border-teal-500/40 shadow-lg shadow-teal-500/5'
                    : 'bg-gradient-to-r from-teal-50/60 via-white to-emerald-50/60 border-teal-200 shadow-md shadow-teal-500/5'
                  : isDarkMode
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-sm'
                    : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-start gap-4 flex-1">
              {/* Mission Icon Badge */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md shrink-0 ${
                mission.completed
                  ? 'bg-emerald-500/15 text-emerald-500'
                  : 'bg-amber-500/15 text-amber-500'
              }`}>
                {getMissionIcon(mission.icon)}
              </div>

              <div className="space-y-1.5 flex-1">
                {/* Mission Header Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[0.65rem] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    {getCategoryIcon(mission.category)}
                    <span>{mission.category.replace('_', ' ')}</span>
                  </span>

                  {mission.realWorldInfo?.isRealWorld && (
                    <span className="text-[0.65rem] font-extrabold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/30">
                      🏠 Real-World Action
                    </span>
                  )}

                  {mission.chainInfo && (
                    <span className="text-[0.65rem] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30">
                      🔗 Step {mission.chainInfo.stepNumber}/{mission.chainInfo.totalSteps} Chain
                    </span>
                  )}

                  {mission.difficulty && (
                    <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${
                      mission.difficulty === 'Easy' 
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : mission.difficulty === 'Medium'
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                    }`}>
                      {mission.difficulty}
                    </span>
                  )}

                  {/* Rewards Tags */}
                  <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300">
                    +{mission.xpReward} XP • +{mission.coinReward} Coins
                  </span>
                </div>

                {/* Title & Description */}
                <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{lang === 'th' ? mission.title : mission.titleEn}</span>
                  {mission.completed && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'th' ? mission.description : mission.descriptionEn}
                </p>

                {/* Real-World Savings Estimate */}
                {mission.realWorldInfo && (
                  <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 mt-2 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-teal-700 dark:text-teal-300">
                      <span>⚡ Estimated Real-World Savings:</span>
                      <span className="font-mono font-extrabold">~฿{mission.realWorldInfo.aiEstimatedSavingThb.toFixed(2)} ({mission.realWorldInfo.aiEstimatedSavingKwh} kWh/day)</span>
                    </div>
                    <p className="text-[0.7rem] text-teal-600 dark:text-teal-400">
                      💡 {mission.realWorldInfo.verificationTipTh}
                    </p>
                  </div>
                )}

                {/* Chain Step Progress */}
                {mission.chainInfo && (
                  <div className="text-[0.7rem] font-bold text-indigo-600 dark:text-indigo-400 pt-1 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{mission.chainInfo.chainTitleTh}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Toggle Button */}
            <button
              onClick={() => handleToggleMission(mission.id)}
              className={`px-5 py-3 rounded-2xl font-extrabold text-xs shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                mission.completed
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20 hover:scale-105 active:scale-95'
              }`}
            >
              {mission.completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'th' ? 'สำเร็จแล้ว ✓' : 'Completed ✓'}</span>
                </>
              ) : (
                <>
                  {mission.realWorldInfo?.isRealWorld ? (
                    <>
                      <CheckSquare className="w-4 h-4" />
                      <span>{lang === 'th' ? 'ทำแล้วในชีวิตจริง 🏠' : 'Done At Home 🏠'}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>{lang === 'th' ? 'ทำภารกิจ' : 'Complete'}</span>
                    </>
                  )}
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* 4. LONG-TERM GOALS & MISSION CALENDAR */}
      <div className="pt-6 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
            {lang === 'th' ? 'เป้าหมายออมไฟระยะยาว (Long-Term Goals)' : 'Long-Term Energy Saving Goals'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {longTermGoals.map(goal => {
            const daysPct = Math.round((goal.currentDays / goal.targetDays) * 100);
            const savingPct = Math.min(100, Math.round((goal.currentSavingThb / goal.targetSavingThb) * 100));

            return (
              <div
                key={goal.id}
                className={`p-5 rounded-[2rem] border space-y-3 transition-all ${
                  isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-500 flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>{goal.targetDays} {lang === 'th' ? 'วัน' : 'Days'}</span>
                  </span>
                  <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono">
                    {savingPct}% Achieved
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {lang === 'th' ? goal.titleTh : goal.titleEn}
                  </h4>
                  <p className="text-[0.7rem] text-slate-500 mt-0.5">
                    🎁 Reward: {goal.rewardTitleTh}
                  </p>
                </div>

                {/* Saving Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[0.65rem] font-bold text-slate-500">
                    <span>Saved: ฿{goal.currentSavingThb}</span>
                    <span>Target: ฿{goal.targetSavingThb}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                      style={{ width: `${savingPct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. REWARD CELEBRATION MODAL */}
      <AnimatePresence>
        {completedRewardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className={`p-6 md:p-8 rounded-[2.5rem] border max-w-md w-full shadow-2xl relative text-center space-y-5 ${
                isDarkMode ? 'bg-slate-900 border-emerald-500/40 text-white' : 'bg-white border-emerald-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setCompletedRewardModal(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-4xl shadow-2xl shadow-emerald-500/30 animate-bounce">
                🎉
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                  Mission Completed!
                </span>
                <h3 className="text-xl font-black font-display pt-1">
                  {lang === 'th' ? completedRewardModal.mission.title : completedRewardModal.mission.titleEn}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed font-medium">
                {completedRewardModal.feedbackMessageTh}
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="px-4 py-2 rounded-2xl bg-amber-400/20 text-amber-700 dark:text-amber-300 font-extrabold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>+{completedRewardModal.mission.xpReward} XP</span>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-sm flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span>+{completedRewardModal.mission.coinReward} Coins</span>
                </div>
              </div>

              <button
                onClick={() => setCompletedRewardModal(null)}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                {lang === 'th' ? 'รับรางวัลและลุยต่อ 🚀' : 'Claim Rewards & Continue 🚀'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
