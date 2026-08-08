import React, { useState } from 'react';
import { Sliders, Eye, Volume2, Sparkles, Trophy } from 'lucide-react';

interface GamificationSettingsToggleProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const GamificationSettingsToggle: React.FC<GamificationSettingsToggleProps> = ({
  lang,
  isDarkMode
}) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [rewardsEnabled, setRewardsEnabled] = useState(true);
  const [leaderboardVisible, setLeaderboardVisible] = useState(true);

  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-500">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-sm font-display text-slate-900 dark:text-white">
            {lang === 'th' ? 'การเข้าถึงและการปรับแต่งเกม (Gamification Accessibility)' : 'Gamification Accessibility & Toggles'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'th' ? 'ปรับแต่งหรือปิดส่วนประกอบเกมสำหรับประสบการณ์การเรียนรู้ที่ต้องการ' : 'Toggle animations, sound effects, or gamification overlays based on your preference'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Toggle 1: Animations */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold">{lang === 'th' ? 'เอฟเฟกต์การเคลื่อนไหว (UI Animations)' : 'UI Animations & Motion Effects'}</span>
          </div>
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              animationsEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              animationsEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Toggle 2: Rewards Popups */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold">{lang === 'th' ? 'การแจ้งเตือนรางวัล และ Mystery Chest' : 'Rewards Popups & Mystery Chest'}</span>
          </div>
          <button
            onClick={() => setRewardsEnabled(!rewardsEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              rewardsEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              rewardsEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Toggle 3: Leaderboard Visibility */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-bold">{lang === 'th' ? 'แสดงกระดานผู้นำ (Public Leaderboard)' : 'Public Leaderboard Visibility'}</span>
          </div>
          <button
            onClick={() => setLeaderboardVisible(!leaderboardVisible)}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              leaderboardVisible ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              leaderboardVisible ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};
