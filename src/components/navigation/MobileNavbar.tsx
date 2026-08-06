import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Bot, 
  Plug, 
  GraduationCap,
  Menu,
  Wallet, 
  BarChart3, 
  Trophy, 
  User, 
  Settings, 
  Flame, 
  Coins, 
  Sparkles,
  Sun,
  Moon,
  MapPin,
  X,
  Scale,
  Sliders
} from 'lucide-react';
import { AppPage, InfoDetailMode } from '../../types';

interface MobileNavbarProps {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  userStreak: number;
  userCoins: number;
  infoDetailMode?: InfoDetailMode;
  onChangeDetailMode?: (mode: InfoDetailMode) => void;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  currentPage,
  setCurrentPage,
  lang,
  setLang,
  isDarkMode,
  onToggleTheme,
  userStreak,
  userCoins,
  infoDetailMode = 'simple',
  onChangeDetailMode,
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const bottomNavItems = [
    { id: 'home' as AppPage, labelTh: 'หน้าหลัก', labelEn: 'Home', icon: Home },
    { id: 'ai-coach' as AppPage, labelTh: 'AI Coach', labelEn: 'Coach', icon: Bot },
    { id: 'appliances' as AppPage, labelTh: 'อุปกรณ์', labelEn: 'Devices', icon: Plug },
    { id: 'learning' as AppPage, labelTh: 'เรียนรู้', labelEn: 'Learn', icon: GraduationCap },
  ];

  const moreMenuItems = [
    { id: 'compare' as AppPage, labelTh: 'เปรียบเทียบอุปกรณ์', labelEn: 'Compare Lab', icon: Scale },
    { id: 'score' as AppPage, labelTh: 'ดัชนีการประหยัดไฟ', labelEn: 'Saving Score', icon: Trophy },
    { id: 'locations' as AppPage, labelTh: 'สถานที่ของฉัน', labelEn: 'My Locations', icon: MapPin },
    { id: 'budget' as AppPage, labelTh: 'ค่าไฟ & งบประมาณ', labelEn: 'Budget & Bills', icon: Wallet },
    { id: 'analytics' as AppPage, labelTh: 'วิเคราะห์การใช้ไฟ', labelEn: 'Analytics', icon: BarChart3 },
    { id: 'achievements' as AppPage, labelTh: 'ภารกิจ & รางวัล', labelEn: 'Missions', icon: Trophy },
    { id: 'profile' as AppPage, labelTh: 'โปรไฟล์', labelEn: 'Profile', icon: User },
    { id: 'settings' as AppPage, labelTh: 'ตั้งค่า', labelEn: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Top Mobile Bar */}
      <header className={`lg:hidden sticky top-0 z-40 px-4 py-3 border-b backdrop-blur-xl transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-white/90 border-emerald-100 text-slate-800'
      }`}>
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-base shadow-md">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent font-display">
                EduEase Energy
              </h1>
            </div>
          </div>

          {/* Stat Pills & Toggles */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{userStreak}d</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-700 dark:text-amber-300 font-bold text-xs">
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span>{userCoins}</span>
            </div>

            <button
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              className={`p-1.5 rounded-lg border font-bold text-xs transition-all ${
                isDarkMode ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}
            >
              {lang.toUpperCase()}
            </button>

            <button
              onClick={onToggleTheme}
              className={`p-1.5 rounded-lg border transition-all ${
                isDarkMode ? 'border-slate-700 bg-slate-800 text-amber-400' : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* More Menu Sheet */}
      <AnimatePresence>
        {showMoreMenu && (
          <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden bg-slate-950/60 backdrop-blur-sm p-3">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              className={`w-full max-w-md rounded-3xl p-5 border shadow-2xl ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-emerald-100 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-base font-display">เมนูเพิ่มเติม (More Menu)</h3>
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Mode Selector in Mobile Sheet */}
              {onChangeDetailMode && (
                <div className="mb-4 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-[0.68rem] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{lang === 'th' ? 'ระดับความลึกของข้อมูล (Detail Level)' : 'Information Depth'}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'simple', th: 'เข้าใจง่าย', en: 'Simple' },
                      { id: 'balanced', th: 'สมดุล', en: 'Balanced' },
                      { id: 'detailed', th: 'ละเอียด', en: 'Detailed' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => onChangeDetailMode(m.id as any)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                          infoDetailMode === m.id
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {lang === 'th' ? m.th : m.en}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-2">
                {moreMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setShowMoreMenu(false);
                      }}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${
                        isActive
                          ? isDarkMode
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : 'bg-emerald-500 text-white border-emerald-600'
                          : isDarkMode
                            ? 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{lang === 'th' ? item.labelTh : item.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Floating Navigation Bar */}
      <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40">
        <div className={`flex items-center justify-around px-2 py-2 rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-800 text-white shadow-emerald-950/40' 
            : 'bg-white/95 border-emerald-100 text-slate-800 shadow-emerald-500/10'
        }`}>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setShowMoreMenu(false);
                  setCurrentPage(item.id);
                }}
                className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all ${
                  isActive
                    ? isDarkMode
                      ? 'text-emerald-400'
                      : 'text-emerald-600'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBottomTab"
                    className={`absolute inset-0 rounded-2xl ${
                      isDarkMode ? 'bg-emerald-500/15 border border-emerald-500/30' : 'bg-emerald-50 border border-emerald-100'
                    }`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[0.65rem] font-bold relative z-10 mt-0.5">
                  {lang === 'th' ? item.labelTh : item.labelEn}
                </span>
              </button>
            );
          })}

          {/* More Menu Trigger */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all ${
              showMoreMenu || ['locations', 'budget', 'analytics', 'achievements', 'profile', 'settings'].includes(currentPage)
                ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                : isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <Menu className="w-5 h-5 relative z-10" />
            <span className="text-[0.65rem] font-bold relative z-10 mt-0.5">
              {lang === 'th' ? 'เมนู' : 'More'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

