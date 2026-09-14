import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  TrendingDown, 
  Clock, 
  Zap, 
  PiggyBank, 
  ThumbsUp, 
  RefreshCw, 
  Lightbulb, 
  ChevronRight, 
  BrainCircuit, 
  BarChart3 
} from 'lucide-react';
import { 
  AICoachRecommendation, 
  InfoDetailMode, 
  AppPage,
  SmartAnomaly, 
  SmartGoal, 
  HouseholdBenchmark, 
  SeasonalInsight, 
  ActionTimelineItem, 
  WhatIfScenario, 
  EnergyDiaryNote 
} from '../../types';
import { ProgressiveCard } from '../common/ProgressiveCard';
import { WhyButton } from '../trust/WhyButton';
import { SmartInsightsHub } from '../insights/SmartInsightsHub';
import { PageHeader, SegmentedTabs, UnifiedButton, UnifiedCard } from '../../design-system';

interface AiCoachViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  recommendations: AICoachRecommendation[];
  onApplyRecommendation: (id: string) => void;
  chatMessages: { role: 'user' | 'assistant'; text: string; time?: string }[];
  onSendMessage: (text: string, useThinkingMode: boolean) => void;
  isSendingChat: boolean;
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
  onNavigatePage?: (page: AppPage) => void;
  initialTab?: 'coach' | 'insights';
  anomalies?: SmartAnomaly[];
  goals?: SmartGoal[];
  benchmarks?: HouseholdBenchmark[];
  seasonalInsights?: SeasonalInsight[];
  actionTimeline?: ActionTimelineItem[];
  scenarios?: WhatIfScenario[];
  diaryNotes?: EnergyDiaryNote[];
  onResolveAnomaly?: (id: string) => void;
  onAddGoal?: (goal: SmartGoal) => void;
  onToggleGoalComplete?: (id: string) => void;
  onAddDiaryNote?: (note: EnergyDiaryNote) => void;
}

export const AiCoachView: React.FC<AiCoachViewProps> = ({
  lang,
  isDarkMode,
  recommendations,
  onApplyRecommendation,
  chatMessages,
  onSendMessage,
  isSendingChat,
  infoDetailMode,
  onStartPageTour,
  onNavigatePage,
  initialTab = 'coach',
  anomalies = [],
  goals = [],
  benchmarks = [],
  seasonalInsights = [],
  actionTimeline = [],
  scenarios = [],
  diaryNotes = [],
  onResolveAnomaly = () => {},
  onAddGoal = () => {},
  onToggleGoalComplete = () => {},
  onAddDiaryNote = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<'coach' | 'insights'>(initialTab);
  const [input, setInput] = useState('');
  const [useThinkingMode, setUseThinkingMode] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const quickPrompts = [
    { th: 'ทำอย่างไรให้ประหยัดค่าไฟ ฿500 เดือนนี้?', en: 'How to save ฿500 this month?' },
    { th: 'ทำไมค่าไฟแอร์เมื่อวานแพงจัง?', en: 'Why was my AC bill high yesterday?' },
    { th: 'ช่วยจำลองย้ายเวลาใช้ไฟช่วง Off-Peak หน่อย', en: 'Simulate shifting load to Off-Peak hours' },
    { th: 'ตรวจเช็กสุขภาพเครื่องใช้ไฟฟ้าให้หน่อย', en: 'Run an electrical health check on devices' },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSendingChat) return;
    onSendMessage(input.trim(), useThinkingMode);
    setInput('');
  };

  return (
    <div id="tour-step-aicoach" className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. Standardized Page Header */}
      <PageHeader
        title={lang === 'th' ? 'ผู้ช่วย AI วิเคราะห์พลังงาน (Voltie)' : 'AI Energy Coach (Voltie)'}
        subtitle={lang === 'th' 
          ? 'สอบถามข้อสงสัย วางแผนประหยัดค่าไฟ หรือให้ Voltie ช่วยอธิบายสถิติไฟเป็นภาษาเข้าใจง่าย'
          : 'Ask questions, create saving plans, or get plain English explanations of your power trends.'}
        icon={Bot}
        badgeText="Voltie v3.0"
        badgeVariant="brand"
        lang={lang}
        isDarkMode={isDarkMode}
        onStartTour={onStartPageTour ? () => onStartPageTour(4) : undefined}
        tourStepLabel={lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}
      />

      {/* 2. Sub-Tabs: AI Coach vs Smart Insights */}
      <SegmentedTabs
        tabs={[
          {
            id: 'coach',
            labelTh: 'AI Coach (ห้องแชท & คำแนะนำ)',
            labelEn: 'AI Coach (Chat & Recommendations)',
            icon: Bot,
          },
          {
            id: 'insights',
            labelTh: 'Smart Insights & ตรวจจับไฟพุ่ง',
            labelEn: 'Smart Insights & Anomalies',
            icon: BrainCircuit,
            badge: anomalies.filter(a => !a.resolved).length > 0 ? anomalies.filter(a => !a.resolved).length : undefined,
          },
          ...(onNavigatePage ? [{
            id: 'analytics',
            labelTh: 'วิเคราะห์การใช้ไฟ (Analytics)',
            labelEn: 'Analytics',
            icon: BarChart3,
          }] : []),
        ]}
        activeTab={activeTab}
        onChange={(tabId) => {
          if (tabId === 'analytics' && onNavigatePage) {
            onNavigatePage('analytics');
          } else {
            setActiveTab(tabId as 'coach' | 'insights');
          }
        }}
        lang={lang}
        isDarkMode={isDarkMode}
        size="md"
      />

      {/* When Smart Insights is active */}
      {activeTab === 'insights' ? (
        <SmartInsightsHub
          lang={lang}
          isDarkMode={isDarkMode}
          infoDetailMode={infoDetailMode}
          anomalies={anomalies}
          goals={goals}
          benchmarks={benchmarks}
          seasonalInsights={seasonalInsights}
          actionTimeline={actionTimeline}
          scenarios={scenarios}
          diaryNotes={diaryNotes}
          onResolveAnomaly={onResolveAnomaly}
          onAddGoal={onAddGoal}
          onToggleGoalComplete={onToggleGoalComplete}
          onAddDiaryNote={onAddDiaryNote}
          onNavigatePage={onNavigatePage || (() => {})}
        />
      ) : (
        <>
      {/* 2. AI RECOMMENDATION CARDS (Hero Action Widgets) */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-base font-display flex items-center gap-2 px-1">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>{lang === 'th' ? 'คำแนะนำช่วยออมเงินวันนี้' : 'Smart Savings Recommendations'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="relative group">
              <div className="absolute top-3 right-3 z-20">
                <WhyButton
                  data={{
                    whatHappenedTh: rec.description,
                    whyDetectedTh: `ตรวจพบจากการวิเคราะห์รูปแบบการใช้งานย้อนหลังและสเปกเครื่องใช้ไฟฟ้า (${rec.title})`,
                    dataUsedTh: ['มิเตอร์ย้อนหลัง 30 วัน', 'อัตราค่าไฟ PEA TOU 1.1.2', 'ข้อมูลสภาพอากาศในพื้นที่'],
                    assumptionsTh: ['ใช้อัตราค่าไฟฐาน ฿4.20/หน่วย', 'เปิดใช้งานเฉลี่ยตามสถิติล่าสุด'],
                    confidence: rec.confidence,
                    source: 'predicted',
                    ifIgnoredImpactTh: `หากไม่ปรับใช้ คุณอาจสูญเสียโอกาสประหยัดเงินประมาณ ฿${rec.moneySavedMonth}/เดือน`,
                    expectedSavingThb: rec.moneySavedMonth
                  }}
                  lang={lang}
                  variant="button"
                />
              </div>

              <ProgressiveCard
                mode={infoDetailMode}
                lang={lang}
                isDarkMode={isDarkMode}
                title={lang === 'th' ? rec.title : rec.titleEn}
                icon={<Sparkles className="w-4 h-4 text-purple-500" />}
                summaryValue={`+฿${rec.moneySavedMonth} / เดือน`}
                summarySubtitle={lang === 'th' ? `ระดับความยาก: ${rec.difficulty}` : `Difficulty: ${rec.difficulty}`}
                badgeText={rec.applied ? (lang === 'th' ? 'ปรับใช้แล้ว ✓' : 'Applied ✓') : `Match ${rec.confidence}%`}
                badgeType={rec.applied ? 'success' : 'info'}
                explanationTitle={lang === 'th' ? 'ทำไมถึงแนะนำ?' : 'Why Recommended?'}
                explanationText={lang === 'th' ? rec.description : rec.descriptionEn}
                comparisonText={lang === 'th' ? `ช่วยประหยัดไฟขึ้นเมื่อเทียบกับพฤติกรรมเดิม (${rec.timeRequired})` : `Saves energy compared to previous usage pattern (${rec.timeRequired})`}
                formula={`Potential Savings = Delta kWh (18.2 kWh) × TOU Peak Tariff (5.26 THB) = ฿${rec.moneySavedMonth}`}
                rawMetrics={[
                  { label: lang === 'th' ? 'ความมั่นใจ AI' : 'AI Confidence', value: `${rec.confidence}%` },
                  { label: lang === 'th' ? 'เวลาที่ต้องใช้' : 'Time Required', value: rec.timeRequired },
                  { label: lang === 'th' ? 'ประเภทการทำงาน' : 'Action Type', value: rec.actionType },
                ]}
                tariffBreakdown="PEA TOU Rate Schedule 1.1.2"
                meterSource="Voltie AI Engine v3.0 ML Predictor"
                timestamp="2026-08-06 14:32:05"
                confidenceScore={`${rec.confidence}% AI Accuracy`}
                recommendedAction={{
                  label: lang === 'th' ? 'ปรับใช้โหมดประหยัดนี้ทันที' : 'Apply this saving mode immediately',
                  actionText: rec.applied ? (lang === 'th' ? 'เรียบร้อย' : 'Done') : (lang === 'th' ? 'ปรับใช้' : 'Apply'),
                  onExecute: () => onApplyRecommendation(rec.id)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. CHAT CONVERSATION CONTAINER (ChatGPT Style) */}
      <div className={`rounded-[2.5rem] border overflow-hidden transition-all shadow-md ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-100'
      }`}>
        {/* Chat History */}
        <div className="p-6 space-y-4 max-h-[420px] overflow-y-auto">
          {chatMessages.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-3xl">
                ⚡
              </div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                {lang === 'th' ? 'พิมพ์คำถามเพื่อให้ Voltie ช่วยตอบ' : 'Ask Voltie anything about your energy bill'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {lang === 'th' 
                  ? 'ลองคลิกเลือกคำถามด่วนด้านล่าง หรือพิมพ์คำถามเกี่ยวกับการใช้งานไฟได้เลย'
                  : 'Try clicking one of the quick prompts below or type your custom query.'}
              </p>
            </div>
          ) : (
            chatMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-2xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-purple-600 text-white'
                }`}>
                  {msg.role === 'user' ? 'U' : '⚡'}
                </div>

                <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed space-y-1 ${
                  msg.role === 'user'
                    ? 'bg-emerald-500 text-white rounded-tr-none'
                    : isDarkMode
                      ? 'bg-slate-800/80 text-slate-100 rounded-tl-none border border-slate-700/60'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.time && (
                    <span className="block text-[0.65rem] opacity-70 text-right">
                      {msg.time}
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}

          {isSendingChat && (
            <div className="flex gap-3 max-w-md">
              <div className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0 animate-pulse">
                ⚡
              </div>
              <div className={`p-4 rounded-2xl rounded-tl-none text-xs ${
                isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              }`}>
                <span className="animate-pulse">{lang === 'th' ? 'Voltie กำลังวิเคราะห์ข้อมูล...' : 'Voltie is thinking...'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onSendMessage(lang === 'th' ? prompt.th : prompt.en, useThinkingMode)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all shrink-0 ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' 
                    : 'bg-white hover:bg-purple-50 border-slate-200 text-slate-700 hover:border-purple-300'
                }`}
              >
                ✨ {lang === 'th' ? prompt.th : prompt.en}
              </button>
            ))}
          </div>

          {/* Thinking Mode Toggle */}
          <div className="flex items-center gap-2 mt-3 px-1">
            <button
              type="button"
              onClick={() => setUseThinkingMode(!useThinkingMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                useThinkingMode
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400 shadow-sm'
                  : isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${useThinkingMode ? 'bg-purple-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                {useThinkingMode && <Sparkles className="w-2.5 h-2.5" />}
              </div>
              {lang === 'th' ? 'โหมดคิดวิเคราะห์เชิงลึก' : 'Enable High Thinking'}
            </button>
            <span className="text-[10px] text-slate-400">
              {lang === 'th' ? '(ใช้สำหรับคำถามซับซ้อน)' : '(For complex queries)'}
            </span>
          </div>

          {/* Input Bar */}
          <form onSubmit={handleFormSubmit} className="flex gap-2 mt-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === 'th' ? 'พิมพ์ถาม Voltie ได้เลย...' : 'Type your question for Voltie...'}
              className={`flex-1 px-4 py-3 rounded-2xl text-xs md:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                  : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim() || isSendingChat}
              className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'th' ? 'ส่ง' : 'Send'}</span>
            </button>
          </form>
        </div>
      </div>
      </>
      )}
    </div>
  );
};
