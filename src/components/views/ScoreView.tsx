import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Zap, 
  Target, 
  Flame, 
  Coins, 
  Brain, 
  ShieldCheck, 
  SlidersHorizontal 
} from 'lucide-react';
import { InfoDetailMode, AppPage, EnergySavingScoreBreakdown } from '../../types';
import { ProgressiveCard } from '../common/ProgressiveCard';
import { DataQualityCard } from '../trust/DataQualityCard';
import { WhyButton } from '../trust/WhyButton';

interface ScoreViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  infoDetailMode: InfoDetailMode;
  userStreak: number;
  userCoins: number;
  userLevel: number;
  userXp: number;
  userXpMax: number;
  monthlyEstimate: number;
  monthlyBudget: number;
  setCurrentPage: (page: AppPage) => void;
  onStartPageTour?: (stepIndex: number) => void;
}

export const ScoreView: React.FC<ScoreViewProps> = ({
  lang,
  isDarkMode,
  infoDetailMode,
  userStreak,
  userCoins,
  userLevel,
  userXp,
  userXpMax,
  monthlyEstimate,
  monthlyBudget,
  setCurrentPage,
  onStartPageTour,
}) => {
  // Score breakdown calculations
  const habitScore = Math.min(100, 70 + userStreak * 4);
  const budgetScore = Math.min(100, Math.max(40, Math.round((1 - (monthlyEstimate / (monthlyBudget * 1.2))) * 100)));
  const applianceScore = 88; // Based on A+++ Eco devices in active house
  const learningScore = 82; // Based on completed lessons
  const actionScore = 90; // Based on applied recommendations

  const overallScore = Math.round(
    habitScore * 0.25 +
    budgetScore * 0.25 +
    applianceScore * 0.20 +
    learningScore * 0.15 +
    actionScore * 0.15
  );

  // Determine Level Badge
  const getLevelBadge = (score: number) => {
    if (score >= 86) return { nameEn: 'Energy Master', nameTh: 'ปรมาจารย์พลังงาน', color: 'from-amber-400 to-amber-600', icon: '👑' };
    if (score >= 70) return { nameEn: 'Smart Saver', nameTh: 'สมาร์ทเซฟเวอร์', color: 'from-emerald-400 to-teal-500', icon: '🌟' };
    if (score >= 50) return { nameEn: 'Improving Saver', nameTh: 'นักประหยัดพัฒนาดี', color: 'from-blue-400 to-indigo-500', icon: '⚡' };
    return { nameEn: 'Beginner Saver', nameTh: 'ผู้ประหยัดเริ่มต้น', color: 'from-slate-400 to-slate-600', icon: '🌱' };
  };

  const badgeInfo = getLevelBadge(overallScore);

  // Score categories data
  const categories = [
    {
      id: 'habit',
      titleTh: '1. คะแนนพฤติกรรม (Habit Score)',
      titleEn: '1. Habit Score',
      score: habitScore,
      weight: '25%',
      descTh: 'ประเมินจากความสม่ำเสมอ การย้ายเวลาใช้ไฟไป Off-Peak และรักษาสตรีค',
      descEn: 'Based on daily consistency, off-peak usage, and active streak.',
      icon: Flame,
      color: 'amber',
      actionTh: 'ย้ายการซักผ้าไปช่วง Off-Peak เพื่อดันคะแนนพฤติกรรม',
      actionPage: 'appliances' as AppPage,
    },
    {
      id: 'budget',
      titleTh: '2. คะแนนการคุมงบ (Budget Score)',
      titleEn: '2. Budget Score',
      score: budgetScore,
      weight: '25%',
      descTh: 'ประเมินจากอัตราการใช้ไฟจริงเทียบกับงบประมาณประจำเดือนที่ตั้งไว้',
      descEn: 'Based on spending vs monthly target cap.',
      icon: Target,
      color: 'emerald',
      actionTh: 'ปรับงบประมาณประจำเดือนให้สมดุลกับฤดูกาล',
      actionPage: 'budget' as AppPage,
    },
    {
      id: 'appliance',
      titleTh: '3. คะแนนเครื่องใช้ไฟฟ้า (Appliance Score)',
      titleEn: '3. Appliance Efficiency Score',
      score: applianceScore,
      weight: '20%',
      descTh: 'ประเมินสัดส่วนอุปกรณ์ฉลากเบอร์ 5 และตัดไฟสแตนด์บายอัตโนมัติ',
      descEn: 'Ratio of Eco appliances & standby cut feature active.',
      icon: Zap,
      color: 'blue',
      actionTh: 'เปรียบเทียบอุปกรณ์ในห้องทดลอง Comparison Lab',
      actionPage: 'compare' as AppPage,
    },
    {
      id: 'learning',
      titleTh: '4. คะแนนการเรียนรู้ (Learning Score)',
      titleEn: '4. Learning Score',
      score: learningScore,
      weight: '15%',
      descTh: 'ประเมินจากการอ่านบทเรียน การทำแบบทดสอบ และไขคำศัพท์ในคลังความรู้',
      descEn: 'Based on completed lessons, quizzes, and glossary exploration.',
      icon: GraduationCap,
      color: 'purple',
      actionTh: 'อ่านบทเรียนเพิ่มเติม +10 XP',
      actionPage: 'learning' as AppPage,
    },
    {
      id: 'action',
      titleTh: '5. คะแนนการลงมือทำ (Action Score)',
      titleEn: '5. Action Score',
      score: actionScore,
      weight: '15%',
      descTh: 'ประเมินจากการกดปรับใช้คำแนะนำ AI Coach และทำภารกิจสำเร็จ',
      descEn: 'Based on applied AI Coach recommendations & completed missions.',
      icon: ShieldCheck,
      color: 'teal',
      actionTh: 'ทำภารกิจประจำวันให้ครบ',
      actionPage: 'achievements' as AppPage,
    },
  ];

  const improvements = [
    { th: 'เปิดใช้งานโหมดสแตนด์บายอัตโนมัติในตู้เย็นและแอร์', en: 'Enabled Standby Auto-Cut on Fridge & AC' },
    { th: 'รักษาสตรีคการใช้งานรักษ์โลกต่อเนื่อง 5 วัน', en: 'Maintained 5-day active eco streak' },
    { th: 'ทำแบบทดสอบเรื่องอัตราค่าไฟ TOU สำเร็จ', en: 'Completed TOU electricity tariff quiz' },
  ];

  const opportunities = [
    { th: 'ตั้งเวลาปิดแอร์ล่วงหน้า 30 นาที ก่อนออกจากห้อง (ประหยัดเพิ่ม ~฿45/เดือน)', en: 'Set AC timer 30 mins early before leaving (~฿45/mo savings)' },
    { th: 'ย้ายการใช้งานเครื่องซักผ้าและหม้อหุงข้าวไปช่วง Off-Peak หลัง 22:00 น.', en: 'Shift laundry & cooking to Off-Peak after 10 PM' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. HERO OVERALL SCORE DISPLAY CARD */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-2xl relative overflow-hidden transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 border-slate-800 text-white shadow-emerald-950/20' 
          : 'bg-gradient-to-br from-emerald-500/10 via-white to-teal-500/10 border-emerald-100 text-slate-900 shadow-emerald-500/5'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Score & Level Badge Column */}
          <div className="flex items-center gap-6">
            <div className="relative flex items-center justify-center">
              {/* Outer Score Ring */}
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                <div className={`w-full h-full rounded-full flex flex-col items-center justify-center ${
                  isDarkMode ? 'bg-slate-900' : 'bg-white'
                }`}>
                  <span className="text-4xl md:text-5xl font-black font-mono text-emerald-500 tracking-tight">
                    {overallScore}
                  </span>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                    / 100 คะแนน
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[0.7rem] flex items-center gap-1 shadow-md">
                <TrendingUp className="w-3 h-3" />
                <span>+5 {lang === 'th' ? 'จากสัปดาห์ก่อน' : 'vs last week'}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`px-3 py-1 rounded-full font-black text-xs text-white bg-gradient-to-r ${badgeInfo.color} flex items-center gap-1.5 shadow-md`}>
                  <span>{badgeInfo.icon}</span>
                  <span>{lang === 'th' ? badgeInfo.nameTh : badgeInfo.nameEn}</span>
                </span>

                {onStartPageTour && (
                  <button
                    onClick={() => onStartPageTour(3)}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/25 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500 animate-bounce" />
                    <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Tour'}</span>
                  </button>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight">
                {lang === 'th' ? 'ดัชนีการประหยัดพลังงาน' : 'Energy Saving Score'}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                {lang === 'th' 
                  ? 'คะแนนประเมินทักษะ พฤติกรรม และประสิทธิภาพการใช้ไฟของคุณในภาพรวม' 
                  : 'Holistic score evaluating your habits, budget discipline, and eco actions.'}
              </p>
            </div>
          </div>

          {/* Quick Money Impact Banner */}
          <div className={`p-4 md:p-5 rounded-3xl border flex flex-col justify-between max-w-xs ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-emerald-100 shadow-sm'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'th' ? 'เงินเซฟสะสมคาดการณ์' : 'Est. Monthly Impact'}
              </span>
              <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Coins className="w-4 h-4" />
              </div>
            </div>

            <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              ~ ฿320 / {lang === 'th' ? 'เดือน' : 'mo'}
            </div>
            <p className="text-[0.7rem] text-slate-500 dark:text-slate-400 font-medium mt-1">
              {lang === 'th' 
                ? 'หากเพิ่มคะแนนให้แตะ 90 คะแนน จะช่วยประหยัดไฟเพิ่มอีก ฿85/เดือน' 
                : 'Reaching 90 pts will unlock an extra ฿85/mo savings.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. PROGRESSIVE SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What Improved */}
        <ProgressiveCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          title={lang === 'th' ? '✅ สิ่งที่คุณทำได้ดีขึ้น (What Improved)' : '✅ What Improved'}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          summaryValue={`${improvements.length} ${lang === 'th' ? 'รายการพัฒนาดีขึ้น' : 'Key Improvements'}`}
          summarySubtitle={lang === 'th' ? 'คะแนนรวมขยับเพิ่มขึ้น +5 จุด' : 'Overall score boosted by +5 pts'}
          badgeText="+5 Points"
          badgeType="success"
          explanationTitle={lang === 'th' ? 'รายละเอียด' : 'Details'}
          explanationText={lang === 'th' 
            ? 'เกิดจากการรักษาวินัยการเช็คอินประจำวันร่วมกับการปรับใช้โหมดประหยัดในแอร์' 
            : 'Driven by daily streak maintenance and active AC eco mode.'}
          comparisonText={lang === 'th' ? 'อยู่ในกลุ่มผู้ใช้งาน Top 10% ของระบบ' : 'In Top 10% saver cohort'}
        >
          <ul className="space-y-2 mt-2">
            {improvements.map((imp, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{lang === 'th' ? imp.th : imp.en}</span>
              </li>
            ))}
          </ul>
        </ProgressiveCard>

        {/* What Can Improve */}
        <ProgressiveCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          title={lang === 'th' ? '💡 โอกาสเพิ่มคะแนน & เซฟเงินเพิ่ม' : '💡 What Can Still Improve'}
          icon={<AlertCircle className="w-4 h-4 text-amber-500" />}
          summaryValue={`~ ฿125 / ${lang === 'th' ? 'เดือน' : 'mo'}`}
          summarySubtitle={lang === 'th' ? 'ศักยภาพเงินเซฟที่ยังดึงออกมาได้อีก' : 'Untapped potential savings'}
          badgeText="Opportunity"
          badgeType="warning"
          explanationTitle={lang === 'th' ? 'คำแนะนำ' : 'Next Recommendation'}
          explanationText={lang === 'th' 
            ? 'เพียงปรับเวลาปิดแอร์ล่วงหน้าและตั้งเวลาซักผ้า จะช่วยดันคะแนนแตะ 90+' 
            : 'Setting early AC turn-off timer and shifting laundry hours will push your score above 90+.'}
          recommendedAction={{
            label: lang === 'th' ? 'ทำภารกิจเพิ่มคะแนนในหน้าภารกิจ' : 'Go to Missions page to boost score',
            actionText: lang === 'th' ? 'ไปที่ภารกิจ' : 'Go to Quests',
            onExecute: () => setCurrentPage('achievements')
          }}
        >
          <ul className="space-y-2 mt-2">
            {opportunities.map((opp, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{lang === 'th' ? opp.th : opp.en}</span>
              </li>
            ))}
          </ul>
        </ProgressiveCard>
      </div>

      {/* 3. DETAILED SCORE CATEGORY BREAKDOWN LIST */}
      <div className={`p-6 rounded-[2.5rem] border shadow-xl ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'รายละเอียดคะแนนรายหมวดหมู่ (Score Categories)' : 'Category Breakdown'}
            </h3>
          </div>

          <span className="text-xs font-bold text-slate-400">
            5 {lang === 'th' ? 'มิติการประเมิน' : 'Dimensions'}
          </span>
        </div>

        <div className="space-y-4">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <div
                key={cat.id}
                className={`p-4 md:p-5 rounded-2xl border transition-all ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-emerald-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {lang === 'th' ? cat.titleTh : cat.titleEn}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {lang === 'th' ? cat.descTh : cat.descEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-auto">
                    <div className="text-right font-mono">
                      <div className="text-xl font-black text-slate-900 dark:text-white">
                        {cat.score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                      </div>
                      <div className="text-[0.65rem] text-slate-400 font-bold uppercase">
                        {lang === 'th' ? `น้ำหนัก ${cat.weight}` : `Weight ${cat.weight}`}
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentPage(cat.actionPage)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-sm"
                    >
                      <span>{lang === 'th' ? 'ปรับปรุง' : 'Improve'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.score}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full rounded-full ${
                      cat.score >= 80 ? 'bg-emerald-500' : cat.score >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Quality Score Impact */}
      <DataQualityCard
        lang={lang}
        isDarkMode={isDarkMode}
        onNavigatePage={setCurrentPage}
      />

      {/* 4. LEARNING INTEGRATION BANNER */}
      <div className={`p-6 rounded-[2rem] border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border-emerald-800/40 text-white' 
          : 'bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-emerald-500/10 border-emerald-200 text-slate-800'
      }`}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 shrink-0">
            <Brain className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <span className="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {lang === 'th' ? '🎓 ศูนย์เพิ่มคะแนนพลังงาน' : '🎓 Energy Learning Center'}
            </span>
            <h3 className="text-lg font-extrabold font-display mt-0.5">
              {lang === 'th' ? 'เรียนรู้สั้นๆ 3 นาที เพิ่มคะแนน Learning Score +10 จุด' : 'Complete 3-min micro lesson to boost Learning Score +10 pts'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-2xl">
              {lang === 'th'
                ? 'การเข้าใจหลักการทำงานของเครื่องใช้ไฟฟ้า อัตราค่าไฟ Peak/Off-Peak และวิธีคำนวณ kWh จะช่วยให้คุณวางแผนประหยัดเงินได้อย่างยั่งยืน'
                : 'Mastering peak/off-peak rates and kWh calculations helps you optimize household billing seamlessly.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('learning')}
          className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs flex items-center gap-2 shrink-0 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'th' ? 'ไปหน้าเรียนรู้' : 'Go to Lessons'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
