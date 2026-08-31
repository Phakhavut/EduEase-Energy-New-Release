import React from 'react';
import { Sliders, Sparkles, Trophy, BellRing, Eye, EyeOff, LayoutGrid, Zap, Shield } from 'lucide-react';
import { GamificationSettings } from '../../types';

interface GamificationSettingsToggleProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  settings: GamificationSettings;
  onUpdateSettings: (newSettings: Partial<GamificationSettings>) => void;
}

export const GamificationSettingsToggle: React.FC<GamificationSettingsToggleProps> = ({
  lang,
  isDarkMode,
  settings,
  onUpdateSettings
}) => {
  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
    }`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-500">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
            {lang === 'th' ? 'การควบคุมฟีเจอร์เกมและความเรียบง่าย (Gamification Controls)' : 'Gamification & Clean Mode Controls'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'th' 
              ? 'ปรับแต่งระดับ Gamification หรือเปิดโหมดประหยัดไฟแบบเรียบง่าย (Clean Mode) สำหรับผู้ใช้จริงจัง' 
              : 'Toggle gamification elements, notifications, or switch to clean utility mode for pure energy tracking.'}
          </p>
        </div>
      </div>

      <div className="space-y-3.5">
        {/* Special Master Toggle: Clean Utility Mode */}
        <div className={`p-4 rounded-3xl border transition-all ${
          settings.cleanUtilityMode 
            ? 'bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border-emerald-500/30' 
            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-700/60'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl mt-0.5 ${
                settings.cleanUtilityMode 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm text-slate-900 dark:text-white">
                    {lang === 'th' ? '⚡ โหมดประหยัดไฟมือโปร (Clean Utility Mode)' : '⚡ Clean Utility Mode (Pro)'}
                  </h4>
                  {settings.cleanUtilityMode && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500 text-white">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {lang === 'th'
                    ? 'ซ่อนมินิเกม สัตว์เลี้ยงต้นไม้ และกล่องสุ่ม ให้แอปแสดงเฉพาะตัวเลขค่าไฟ การวิเคราะห์ และคำแนะนำแบบตรงไปตรงมา'
                    : 'Hides arcade minigames and pet evolution, displaying pure financial numbers, analytics, and direct AI tips.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onUpdateSettings({ cleanUtilityMode: !settings.cleanUtilityMode })}
              className={`w-12 h-6.5 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
                settings.cleanUtilityMode ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform ${
                settings.cleanUtilityMode ? 'translate-x-5.5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Toggle 1: Home Screen Eco Activities & Quests */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <LayoutGrid className="w-4 h-4 text-emerald-500" />
            <div>
              <span className="text-xs font-bold block text-slate-900 dark:text-white">
                {lang === 'th' ? 'แสดงกิจกรรมและเควสบนหน้า Home' : 'Show Eco Quests on Home'}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                {lang === 'th' ? 'เปิด/ปิดส่วนแสดงเมืองสีเขียวและภารกิจรายวันบนหน้าแรก' : 'Show or hide daily missions and green city card on home view'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onUpdateSettings({ homeEcoActivitiesVisible: !settings.homeEcoActivitiesVisible })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
              settings.homeEcoActivitiesVisible ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              settings.homeEcoActivitiesVisible ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Toggle 2: Rewards Popups & Mystery Chest */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <BellRing className="w-4 h-4 text-amber-500" />
            <div>
              <span className="text-xs font-bold block text-slate-900 dark:text-white">
                {lang === 'th' ? 'การแจ้งเตือนรางวัล และ Mystery Chest' : 'Rewards Popups & Mystery Chest'}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                {lang === 'th' ? 'แสดงป๊อปอัปฉลองเลเวลอัปและกล่องของขวัญ' : 'Trigger celebratory popups and mystery box overlays'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onUpdateSettings({ rewardsEnabled: !settings.rewardsEnabled })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
              settings.rewardsEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              settings.rewardsEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Toggle 3: UI Animations & Motion */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-teal-500" />
            <div>
              <span className="text-xs font-bold block text-slate-900 dark:text-white">
                {lang === 'th' ? 'เอฟเฟกต์การเคลื่อนไหว (UI Animations)' : 'UI Animations & Motion Effects'}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                {lang === 'th' ? 'ลดการเคลื่อนไหวเพื่อการประหยัดแบตเตอรี่และความลื่นไหล' : 'Smooth micro-interactions and transitions'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onUpdateSettings({ animationsEnabled: !settings.animationsEnabled })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
              settings.animationsEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              settings.animationsEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Toggle 4: Public Leaderboard */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-4 h-4 text-purple-500" />
            <div>
              <span className="text-xs font-bold block text-slate-900 dark:text-white">
                {lang === 'th' ? 'แสดงกระดานผู้นำ (Public Leaderboard)' : 'Public Leaderboard Visibility'}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                {lang === 'th' ? 'แสดงอันดับการประหยัดไฟของคุณในตารางเปรียบเทียบ' : 'Participate and display ranking on community boards'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onUpdateSettings({ leaderboardVisible: !settings.leaderboardVisible })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
              settings.leaderboardVisible ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              settings.leaderboardVisible ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};

