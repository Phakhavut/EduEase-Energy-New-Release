import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  PiggyBank, 
  Wallet, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Snowflake, 
  TrendingDown, 
  TreePine, 
  Trophy, 
  AlertCircle, 
  Sun, 
  Zap, 
  Bot,
  ChevronRight
} from 'lucide-react';
import { Mission, Appliance, AppPage, InfoDetailMode } from '../../types';
import { ProgressiveCard } from '../common/ProgressiveCard';

interface HomeViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  setCurrentPage: (page: AppPage) => void;
  todayCost: number;
  monthlyEstimate: number;
  monthlyBudget: number;
  moneySavedMonth: number;
  dailyMissions: Mission[];
  onCompleteMission: (id: string) => void;
  appliances: Appliance[];
  userStreak: number;
  userLevel: number;
  userXp: number;
  userXpMax: number;
  userCoins: number;
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  isDarkMode,
  setCurrentPage,
  todayCost,
  monthlyEstimate,
  monthlyBudget,
  moneySavedMonth,
  dailyMissions,
  onCompleteMission,
  appliances,
  userStreak,
  userLevel,
  userXp,
  userXpMax,
  userCoins,
  infoDetailMode,
  onStartPageTour,
}) => {
  // Identify most expensive appliance today
  const sortedAppliances = [...appliances].sort((a, b) => b.todayCost - a.todayCost);
  const mostExpensive = sortedAppliances[0] || appliances[0];

  const budgetPercent = Math.min(100, Math.round((monthlyEstimate / monthlyBudget) * 100));
  const isOverBudget = monthlyEstimate > monthlyBudget;

  const activeMission = dailyMissions.find(m => !m.completed) || dailyMissions[0];

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. Hero Greeting Banner */}
      <motion.div 
        id="tour-step-home"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 md:p-8 rounded-[2.5rem] border relative overflow-hidden transition-all shadow-lg ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-500/20 text-white'
            : 'bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50 border-emerald-100 text-slate-800'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{lang === 'th' ? 'ผู้ช่วย AI Energy Coach ของคุณ' : 'Your Personal AI Energy Coach'}</span>
              </div>

              {onStartPageTour && (
                <button
                  onClick={() => onStartPageTour(0)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                  <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}</span>
                </button>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight">
              {lang === 'th' ? 'สวัสดี Namyen! ⚡ ยินดีต้อนรับกลับมา' : 'Good morning, Namyen! ⚡ Welcome back'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'th' 
                ? `วันนี้ Voltie ช่วยคุณเซฟค่าไฟไปแล้ว ฿${moneySavedMonth.toLocaleString()} ในเดือนนี้! ทุกการปรับเปลี่ยนเล็กๆ น้อยๆ เปลี่ยนเป็นคะแนนสะสม`
                : `Voltie helped you save ฿${moneySavedMonth.toLocaleString()} this month! Every small habit builds your score.`}
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('ai-coach')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>{lang === 'th' ? 'คุยกับ AI Coach' : 'Chat with AI Coach'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* 2. THE 5-SECOND ANSWER CARDS (Transformed by Info Detail Mode) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Answer 1: How much did I spend? */}
        <ProgressiveCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          title={lang === 'th' ? 'ค่าไฟวันนี้' : 'Spent Today'}
          icon={<Zap className="w-4 h-4" />}
          summaryValue={`฿${todayCost.toFixed(2)}`}
          summarySubtitle={lang === 'th' ? `ประมาณการบิลเดือนนี้: ฿${monthlyEstimate.toLocaleString()}` : `Est. monthly bill: ฿${monthlyEstimate.toLocaleString()}`}
          badgeText={infoDetailMode === 'detailed' ? 'Meter #PEA-928' : 'Today'}
          badgeType="info"
          explanationTitle={lang === 'th' ? 'เหตุผล' : 'Reason'}
          explanationText={lang === 'th' ? 'เปิดแอร์ช่วงบ่าย 4 ชั่วโมง + ตู้เย็นสมาร์ทอินเวอร์เตอร์ทำงานต่อเนื่อง' : 'Air conditioner active 4 hrs during peak heat + Smart Fridge continuous run.'}
          comparisonText={lang === 'th' ? 'ประหยัดกว่าเมื่อวาน ฿8.50' : 'Saved ฿8.50 vs yesterday'}
          formula="Units (10.12 kWh) × Base Rate (4.20) + Ft (-0.1532) + Service (38.22/30) = ฿42.50"
          rawMetrics={[
            { label: lang === 'th' ? 'หน่วยไฟ (kWh)' : 'Energy (kWh)', value: '10.12 kWh' },
            { label: lang === 'th' ? 'แรงดันไฟฟ้า (V)' : 'Voltage (V)', value: '228.4 V' },
            { label: lang === 'th' ? 'กระแสไฟฟ้า (A)' : 'Current (A)', value: '8.2 A' },
            { label: lang === 'th' ? 'ค่าตัวประกอบพลังงาน' : 'Power Factor', value: '0.96 (PF)' },
          ]}
          tariffBreakdown={lang === 'th' ? 'TOU Rate 1.1.2 (On-Peak: 5.26 THB, Off-Peak: 2.63 THB)' : 'TOU Rate 1.1.2 (On-Peak: 5.26 THB, Off-Peak: 2.63 THB)'}
          meterSource="PEA Smart Meter #PEA-9281-BKK"
          timestamp="2026-08-06 14:32:05"
          confidenceScore="98.8% Confidence"
          recommendedAction={{
            label: lang === 'th' ? 'ตั้งเวลาปิดแอร์ล่วงหน้า 30 นาที เพื่อเซฟ ฿15' : 'Schedule AC off 30m early to save ฿15',
            actionText: lang === 'th' ? 'ตั้งเลย' : 'Set Timer',
            onExecute: () => setCurrentPage('appliances')
          }}
        />

        {/* Answer 2: How much did I save? */}
        <ProgressiveCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          title={lang === 'th' ? 'เงินที่ประหยัดได้' : 'Money Saved'}
          icon={<PiggyBank className="w-4 h-4" />}
          summaryValue={`฿${moneySavedMonth.toLocaleString()}`}
          summarySubtitle={lang === 'th' ? 'สะสมยอดประหยัดในเดือนนี้' : 'Cumulative monthly savings'}
          badgeText="-15% Cost"
          badgeType="success"
          explanationTitle={lang === 'th' ? 'ที่มาของเงินเซฟ' : 'Savings Source'}
          explanationText={lang === 'th' ? 'จากการปรับโหมดแอร์เป็น Eco 26°C ร่วมกับย้ายการซักผ้าไปช่วง Off-Peak' : 'Achieved by setting AC to Eco 26°C & shifting laundry to Off-Peak hours.'}
          comparisonText={lang === 'th' ? 'ประหยัดเพิ่มขึ้น 15% จากเดือนก่อน' : '15% lower than previous month'}
          formula="Baseline Bill (฿2,170) - Current Projection (฿1,850) = ฿320 Saved"
          rawMetrics={[
            { label: lang === 'th' ? 'หน่วยไฟลดลง' : 'Units Saved', value: '76.2 kWh' },
            { label: lang === 'th' ? 'ลดคาร์บอน CO2' : 'CO2 Reduced', value: '38.1 kg' },
            { label: lang === 'th' ? 'เทียบเท่าปลูกต้นไม้' : 'Tree Equivalent', value: '4 Trees 🌳' },
          ]}
          tariffBreakdown="Ft Credit Offset (-0.1532 THB/unit) applied"
          meterSource="AI Energy Optimization Analytics Engine v3.0"
          timestamp="2026-08-06 14:32:05"
          confidenceScore="96.5% Precision"
          recommendedAction={{
            label: lang === 'th' ? 'เปิดโหมดตัดไฟสแตนด์บายอัตโนมัติเพิ่มเงินเซฟอีก ฿80' : 'Enable Standby Auto-Cut for extra ฿80 savings',
            actionText: lang === 'th' ? 'เปิดโหมด' : 'Enable',
            onExecute: () => setCurrentPage('appliances')
          }}
        />

        {/* Answer 3: Am I over budget? */}
        <ProgressiveCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          title={lang === 'th' ? 'สถานะงบประมาณ' : 'Budget Status'}
          icon={<Wallet className="w-4 h-4" />}
          summaryValue={`${budgetPercent}%`}
          summarySubtitle={`฿${monthlyEstimate.toLocaleString()} / ฿${monthlyBudget.toLocaleString()}`}
          badgeText={isOverBudget ? 'Over Budget' : 'On Track'}
          badgeType={isOverBudget ? 'danger' : budgetPercent > 80 ? 'warning' : 'success'}
          explanationTitle={lang === 'th' ? 'วิเคราะห์การใช้จ่าย' : 'Spending Analysis'}
          explanationText={lang === 'th' ? `ใช้ไปแล้ว ${budgetPercent}% ของงบ คาดการณ์จบเดือนไม่เกินงบประมาณที่ตั้งไว้ ฿${monthlyBudget.toLocaleString()}` : `Spent ${budgetPercent}% of monthly cap. Projected to stay within ฿${monthlyBudget.toLocaleString()}`}
          comparisonText={lang === 'th' ? `เหลือโควตาใช้งานอีก ฿${(monthlyBudget - monthlyEstimate).toLocaleString()}` : `Remaining headroom: ฿${(monthlyBudget - monthlyEstimate).toLocaleString()}`}
          formula="Projected Bill = (Current Spent / Days Elapsed) × 30 Days = ฿1,850"
          rawMetrics={[
            { label: lang === 'th' ? 'งบที่ตั้งไว้' : 'Target Cap', value: `฿${monthlyBudget}` },
            { label: lang === 'th' ? 'ประมาณการสิ้นเดือน' : 'Month End Est.', value: `฿${monthlyEstimate}` },
            { label: lang === 'th' ? 'เฉลี่ยต่อวัน' : 'Daily Average', value: `฿${(monthlyEstimate / 30).toFixed(1)}` },
            { label: lang === 'th' ? 'จำนวนวันเหลือ' : 'Days Left', value: '18 Days' },
          ]}
          tariffBreakdown="Progressive Tier 3 Rate (Progressive Step 3.2)"
          meterSource="PEA Billing Cycle Tariff Rule Engine"
          timestamp="2026-08-06 14:32:05"
          confidenceScore="99.1% Confidence"
          recommendedAction={{
            label: lang === 'th' ? 'ตั้งแจ้งเตือนเมื่อค่าไฟแตะ 80% ของงบ' : 'Set threshold alert at 80% budget cap',
            actionText: lang === 'th' ? 'ตั้งเตือน' : 'Set Alert',
            onExecute: () => setCurrentPage('budget')
          }}
        >
          {/* Progress bar inside card */}
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-1">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-rose-500' : budgetPercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(100, budgetPercent)}%` }}
            />
          </div>
        </ProgressiveCard>

        {/* Answer 4: How is my progress? */}
        <ProgressiveCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          title={lang === 'th' ? 'อนุกรมรักษาวินัย' : 'Daily Streak'}
          icon={<Flame className="w-4 h-4 fill-amber-500 text-amber-500" />}
          summaryValue={`${userStreak} ${lang === 'th' ? 'วัน' : 'Days'} 🔥`}
          summarySubtitle={`Level ${userLevel} Eco Master (${userCoins} Coins)`}
          badgeText="Active Streak"
          badgeType="warning"
          explanationTitle={lang === 'th' ? 'การประเมินวินัย' : 'Streak Status'}
          explanationText={lang === 'th' ? 'คุณเข้าใช้งานและทำภารกิจรักษ์โลกต่อเนื่อง 5 วัน ได้รับโบนัสทวีคูณคอยน์ +20%' : '5 consecutive days of eco mission completion. +20% Coin multiplier active.'}
          comparisonText={lang === 'th' ? 'อีก 2 วันรับรางวัลกล่องสุ่ม Lootbox!' : '2 days left until mystery Lootbox!'}
          formula="Streak Score = Consecutive Days (5) × Daily XP Multiplier (1.2) = +120 XP/day"
          rawMetrics={[
            { label: lang === 'th' ? 'XP ทั้งหมด' : 'Total XP', value: `${userXp} / ${userXpMax}` },
            { label: lang === 'th' ? 'เหรียญสะสม' : 'Total Coins', value: `${userCoins} 🪙` },
            { label: lang === 'th' ? 'อันดับลีดเดอร์บอร์ด' : 'Leaderboard Rank', value: '#3 Region' },
          ]}
          tariffBreakdown="Gamification Tier: Gold Master Eco Sentinel"
          meterSource="EduEase Gamification Engine v3"
          timestamp="2026-08-06 14:32:05"
          confidenceScore="100% Synced"
          recommendedAction={{
            label: lang === 'th' ? 'ทำภารกิจวันนี้เพื่อรักษาวินัยแบบต่อเนื่อง' : 'Complete daily quest to maintain streak',
            actionText: lang === 'th' ? 'ทำภารกิจ' : 'Quests',
            onExecute: () => setCurrentPage('achievements')
          }}
        />
      </div>

      {/* Quick Launch Features Banner: Smart Insights, Comparison Lab & Saving Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Smart Insights Banner */}
        <div 
          onClick={() => setCurrentPage('insights')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer group flex items-center justify-between ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-950/50 to-slate-900 border-purple-800/40 hover:border-purple-500/60' 
              : 'bg-gradient-to-r from-purple-50 via-indigo-50/30 to-white border-purple-200 hover:border-purple-400 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-purple-600 text-white font-extrabold shadow-md group-hover:scale-110 transition-transform">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900 dark:text-white font-display">
                  {lang === 'th' ? 'Smart Insights' : 'Smart Insights'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold text-[0.65rem] uppercase">
                  AI Layer
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'th' ? 'ตรวจจับกระชาก บันทึกไดอารี่ & What-If' : 'Anomalies, Diary & What-If Simulator'}
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Compare Lab Banner */}
        <div 
          onClick={() => setCurrentPage('compare')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer group flex items-center justify-between ${
            isDarkMode 
              ? 'bg-gradient-to-r from-emerald-950/50 to-slate-900 border-emerald-800/40 hover:border-emerald-500/60' 
              : 'bg-gradient-to-r from-emerald-50 via-teal-50/30 to-white border-emerald-200 hover:border-emerald-400 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500 text-white font-extrabold shadow-md group-hover:scale-110 transition-transform">
              🧪
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900 dark:text-white font-display">
                  {lang === 'th' ? 'เปรียบเทียบอุปกรณ์' : 'Appliance Lab'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[0.65rem] uppercase">
                  Lab
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'th' ? 'เทียบ 2-5 อุปกรณ์ พร้อมกราฟ' : 'Compare 2-5 devices'}
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Energy Saving Score Banner */}
        <div 
          onClick={() => setCurrentPage('score')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer group flex items-center justify-between ${
            isDarkMode 
              ? 'bg-gradient-to-r from-amber-950/40 to-slate-900 border-amber-800/40 hover:border-amber-500/60' 
              : 'bg-gradient-to-r from-amber-50 via-amber-50/20 to-white border-amber-200 hover:border-amber-400 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500 text-white font-extrabold shadow-md group-hover:scale-110 transition-transform">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900 dark:text-white font-display">
                  {lang === 'th' ? 'ดัชนีประหยัดไฟ' : 'Saving Score'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[0.65rem] uppercase">
                  88 Pts
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'th' ? 'คะแนนประสิทธิภาพและวิธีเพิ่ม' : 'Efficiency score & tips'}
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 3. TODAY'S ACTION MISSION & WEATHER RECOMMENDATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Mission Card (Mission Green Plate / Duolingo Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`lg:col-span-2 p-6 rounded-[2.5rem] border transition-all ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-800' 
              : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base font-display">
                {lang === 'th' ? 'ภารกิจประหยัดประจำวันนี้' : "Today's Green Mission"}
              </h3>
            </div>
            <button 
              onClick={() => setCurrentPage('achievements')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {lang === 'th' ? 'ดูภารกิจทั้งหมด' : 'View All Quests'}
            </button>
          </div>

          {activeMission && (
            <div className={`p-4 md:p-5 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-emerald-50/50 border-emerald-100'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-white">
                      +{activeMission.xpReward} XP
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300">
                      +{activeMission.coinReward} Coins
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white">
                    {lang === 'th' ? activeMission.title : activeMission.titleEn}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {lang === 'th' ? activeMission.description : activeMission.descriptionEn}
                  </p>
                </div>

                <button
                  onClick={() => onCompleteMission(activeMission.id)}
                  disabled={activeMission.completed}
                  className={`px-5 py-3 rounded-2xl font-bold text-xs shadow-md transition-all shrink-0 ${
                    activeMission.completed
                      ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20 hover:scale-105 active:scale-95'
                  }`}
                >
                  {activeMission.completed 
                    ? (lang === 'th' ? 'ทำเสร็จแล้ว ✓' : 'Completed ✓')
                    : (lang === 'th' ? 'ทำภารกิจสำเร็จ!' : 'Complete Mission!')}
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Weather Recommendation Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-[2.5rem] border transition-all ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-800' 
              : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base font-display">
              {lang === 'th' ? 'สภาพอากาศวันนี้' : 'Weather Tip'}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono">34°C</span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {lang === 'th' ? 'กรุงเทพฯ - แดดจัดร้อน' : 'Bangkok - Hot & Sunny'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'th'
                ? 'อากาศบ่ายนี้ร้อนจัด! ปรับแอร์เป็น 26°C ร่วมกับเปิดพัดลมส่าย จะช่วยประหยัดเงินได้ถึง ฿120 ในสัปดาห์นี้'
                : 'Hot afternoon! Setting AC to 26°C with a fan running saves ฿120 this week while keeping you cool.'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* 4. MOST EXPENSIVE APPLIANCE & ENERGY TREE PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Expensive Appliance Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-[2.5rem] border transition-all ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-800' 
              : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/15 text-rose-500">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base font-display">
                {lang === 'th' ? 'อุปกรณ์ที่กินไฟมากที่สุด' : 'Top Power Consumer'}
              </h3>
            </div>
            <button 
              onClick={() => setCurrentPage('appliances')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {lang === 'th' ? 'ดูทั้งหมด' : 'View All'}
            </button>
          </div>

          {mostExpensive && (
            <div className="flex items-center gap-4">
              {mostExpensive.imageUrl && (
                <img 
                  src={mostExpensive.imageUrl} 
                  alt={mostExpensive.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                />
              )}
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {mostExpensive.name}
                </h4>
                <p className="text-xs font-bold text-rose-500">
                  {lang === 'th' ? `ค่าไฟวันนี้: ฿${mostExpensive.todayCost.toFixed(2)}` : `Cost today: ฿${mostExpensive.todayCost.toFixed(2)}`}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th' ? mostExpensive.aiTip : mostExpensive.aiTipEn}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Energy Tree Progress Widget (Mission Green Plate Inspiration) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-[2.5rem] border transition-all ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-800' 
              : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-500">
                <TreePine className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base font-display">
                {lang === 'th' ? 'ต้นไม้พลังงานของฉัน 🌳' : 'My Energy Tree 🌳'}
              </h3>
            </div>
            <button 
              onClick={() => setCurrentPage('achievements')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {lang === 'th' ? 'ปลูกต้นไม้' : 'Grow Tree'}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-3xl shadow-lg shrink-0">
              🪴
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-center text-xs font-bold">
                <span>{lang === 'th' ? 'ระดับต้นไม้: ต้นอ่อนกำลังเติบโต' : 'Stage: Growing Sapling'}</span>
                <span className="text-emerald-500">Level {userLevel}</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'ทำภารกิจรักษ์โลกอีก 2 ครั้ง เพื่ออัปเกรดเป็นต้นไม้เรืองแสง!' : 'Complete 2 more eco quests to evolve into a glowing tree!'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
