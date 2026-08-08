import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  BrainCircuit, 
  AlertTriangle, 
  Target, 
  Building2, 
  Sun, 
  History, 
  FileText, 
  Sliders, 
  BookOpen,
  Brain,
  Zap,
  CheckCircle2
} from 'lucide-react';

import { 
  SmartAnomaly, 
  SmartGoal, 
  HouseholdBenchmark, 
  SeasonalInsight, 
  ActionTimelineItem, 
  WhatIfScenario, 
  EnergyDiaryNote, 
  InfoDetailMode, 
  AppPage 
} from '../../types';

import { AnomalyCard } from './AnomalyCard';
import { GoalTrackerCard } from './GoalTrackerCard';
import { HouseholdBenchmarkCard } from './HouseholdBenchmarkCard';
import { SeasonalInsightCard } from './SeasonalInsightCard';
import { ActionTimelineCard } from './ActionTimelineCard';
import { ExplainMyBillCard } from './ExplainMyBillCard';
import { WhatIfSimulatorCard } from './WhatIfSimulatorCard';
import { EnergyDiaryCard } from './EnergyDiaryCard';
import { DeepThinkingPromptCard } from './DeepThinkingPromptCard';

interface SmartInsightsHubProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  infoDetailMode: InfoDetailMode;
  anomalies: SmartAnomaly[];
  goals: SmartGoal[];
  benchmarks: HouseholdBenchmark[];
  seasonalInsights: SeasonalInsight[];
  actionTimeline: ActionTimelineItem[];
  scenarios: WhatIfScenario[];
  diaryNotes: EnergyDiaryNote[];
  onResolveAnomaly: (id: string) => void;
  onAddGoal: (goal: SmartGoal) => void;
  onToggleGoalComplete: (id: string) => void;
  onAddDiaryNote: (note: EnergyDiaryNote) => void;
  onNavigatePage: (page: AppPage) => void;
}

export const SmartInsightsHub: React.FC<SmartInsightsHubProps> = ({
  lang,
  isDarkMode,
  infoDetailMode,
  anomalies,
  goals,
  benchmarks,
  seasonalInsights,
  actionTimeline,
  scenarios,
  diaryNotes,
  onResolveAnomaly,
  onAddGoal,
  onToggleGoalComplete,
  onAddDiaryNote,
  onNavigatePage,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'anomalies' | 'goals' | 'benchmark' | 'bill' | 'simulator' | 'diary' | 'thinking'>('overview');

  const tabs = [
    { id: 'overview', th: 'ภาพรวมปัญญาอัจฉริยะ', en: 'Insights Overview', icon: Sparkles },
    { id: 'anomalies', th: 'ความผิดปกติ (Anomalies)', en: 'Anomalies', icon: AlertTriangle, count: anomalies.filter(a => !a.resolved).length },
    { id: 'goals', th: 'เป้าหมายประหยัดไฟ', en: 'Goal Tracker', icon: Target },
    { id: 'benchmark', th: 'เกณฑ์เปรียบเทียบ', en: 'Household Benchmark', icon: Building2 },
    { id: 'bill', th: 'อธิบายบิลค่าไฟ', en: 'Explain My Bill', icon: FileText },
    { id: 'simulator', th: 'แบบจำลอง What-If', en: 'What-If Simulator', icon: Sliders },
    { id: 'diary', th: 'ไดอารี่พฤติกรรม', en: 'Energy Diary', icon: BookOpen },
    { id: 'thinking', th: 'วิศวกร AI เชิงลึก', en: 'Deep Thinking AI', icon: Brain },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. Hero Intelligence Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 md:p-8 rounded-[2.5rem] border relative overflow-hidden shadow-lg ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border-purple-500/20 text-white'
            : 'bg-gradient-to-r from-purple-50 via-indigo-50/60 to-purple-50 border-purple-100 text-slate-800'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
              <BrainCircuit className="w-4 h-4 animate-pulse" />
              <span>{lang === 'th' ? 'ระบบปัญญาอัจฉริยะวิเคราะห์ค่าไฟฟ้า (Smart Insights)' : 'Smart Electricity Intelligence Layer'}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              {lang === 'th' ? 'เข้าใจว่า "ทำไมค่าไฟพุ่ง" รู้ล่วงหน้า และรู้ว่า "ปรับอย่างไร"' : 'Understand WHY your bill changes, PREDICT trends, and KNOW how to save.'}
            </h2>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'th'
                ? `วิเคราะห์พฤติกรรม ตรวจจับกระแสกระชาก ตั้งเป้าหมาย บันทึกไดอารี่ และทดสอบแบบจำลอง What-if ด้วยข้อมูลจริง`
                : `Detect electrical anomalies, track targets, log daily behavior, and simulate savings with transparent real-time data.`}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-purple-500/20 text-center shrink-0">
            <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {lang === 'th' ? 'ความผิดปกติที่พบขณะนี้' : 'Active Anomalies'}
            </span>
            <div className="text-2xl font-black font-mono text-amber-500">
              {anomalies.filter(a => !a.resolved).length} {lang === 'th' ? 'รายการ' : 'Alerts'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Intelligence Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-md shadow-purple-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{lang === 'th' ? tab.th : tab.en}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[0.65rem] font-extrabold font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Section: Anomalies */}
          {anomalies.filter(a => !a.resolved).length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-black font-display text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>{lang === 'th' ? 'การตรวจจับพฤติกรรมผิดปกติ (Anomaly Detection)' : 'Active Anomaly Detection'}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {anomalies.filter(a => !a.resolved).map((anom) => (
                  <AnomalyCard
                    key={anom.id}
                    anomaly={anom}
                    mode={infoDetailMode}
                    lang={lang}
                    isDarkMode={isDarkMode}
                    onResolve={onResolveAnomaly}
                    onNavigatePage={onNavigatePage}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Deep Thinking Query Component */}
          <DeepThinkingPromptCard
            mode={infoDetailMode}
            lang={lang}
            isDarkMode={isDarkMode}
            gridContext={{ anomaliesCount: anomalies.length, goalsCount: goals.length }}
          />

          {/* Grid: Goals + What-If */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GoalTrackerCard
              goals={goals}
              mode={infoDetailMode}
              lang={lang}
              isDarkMode={isDarkMode}
              onAddGoal={onAddGoal}
              onToggleGoalComplete={onToggleGoalComplete}
            />

            <WhatIfSimulatorCard
              scenarios={scenarios}
              mode={infoDetailMode}
              lang={lang}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Grid: Benchmark + Bill */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HouseholdBenchmarkCard
              benchmarks={benchmarks}
              mode={infoDetailMode}
              lang={lang}
              isDarkMode={isDarkMode}
            />

            <ExplainMyBillCard
              mode={infoDetailMode}
              lang={lang}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Grid: Seasonal + Timeline + Diary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SeasonalInsightCard
              insights={seasonalInsights}
              mode={infoDetailMode}
              lang={lang}
              isDarkMode={isDarkMode}
            />

            <ActionTimelineCard
              timeline={actionTimeline}
              mode={infoDetailMode}
              lang={lang}
              isDarkMode={isDarkMode}
            />

            <EnergyDiaryCard
              diaryNotes={diaryNotes}
              mode={infoDetailMode}
              lang={lang}
              isDarkMode={isDarkMode}
              onAddDiaryNote={onAddDiaryNote}
            />
          </div>
        </div>
      )}

      {activeTab === 'anomalies' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anomalies.map((anom) => (
              <AnomalyCard
                key={anom.id}
                anomaly={anom}
                mode={infoDetailMode}
                lang={lang}
                isDarkMode={isDarkMode}
                onResolve={onResolveAnomaly}
                onNavigatePage={onNavigatePage}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'goals' && (
        <GoalTrackerCard
          goals={goals}
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          onAddGoal={onAddGoal}
          onToggleGoalComplete={onToggleGoalComplete}
        />
      )}

      {activeTab === 'benchmark' && (
        <HouseholdBenchmarkCard
          benchmarks={benchmarks}
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
        />
      )}

      {activeTab === 'bill' && (
        <ExplainMyBillCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
        />
      )}

      {activeTab === 'simulator' && (
        <WhatIfSimulatorCard
          scenarios={scenarios}
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
        />
      )}

      {activeTab === 'diary' && (
        <EnergyDiaryCard
          diaryNotes={diaryNotes}
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          onAddDiaryNote={onAddDiaryNote}
        />
      )}

      {activeTab === 'thinking' && (
        <DeepThinkingPromptCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
          gridContext={{ anomaliesCount: anomalies.length, goalsCount: goals.length }}
        />
      )}
    </div>
  );
};
