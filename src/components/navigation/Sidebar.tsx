import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Bot, 
  MapPin,
  Plug, 
  Wallet, 
  BarChart3, 
  GraduationCap,
  Trophy, 
  User, 
  Settings, 
  Flame, 
  Coins, 
  Sparkles,
  Sun,
  Moon,
  Globe,
  LogOut,
  Scale,
  Award,
  BrainCircuit,
  ShieldCheck
} from 'lucide-react';
import { AppPage } from '../../types';

interface SidebarProps {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  userLevel: number;
  userXp: number;
  userXpMax: number;
  userCoins: number;
  userStreak: number;
  currentAvatar: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setCurrentPage,
  lang,
  setLang,
  isDarkMode,
  onToggleTheme,
  onLogout,
  userLevel,
  userXp,
  userXpMax,
  userCoins,
  userStreak,
  currentAvatar,
}) => {
  const navItems = [
    { id: 'home' as AppPage, labelTh: 'หน้าหลัก', labelEn: 'Home', icon: Home, badge: undefined },
    { id: 'insights' as AppPage, labelTh: 'Smart Insights', labelEn: 'Smart Insights', icon: BrainCircuit, badge: 'AI' },
    { id: 'ai-coach' as AppPage, labelTh: 'AI Coach', labelEn: 'AI Coach', icon: Bot, badge: 'AI' },
    { id: 'compare' as AppPage, labelTh: 'เปรียบเทียบอุปกรณ์', labelEn: 'Compare Lab', icon: Scale, badge: 'Lab' },
    { id: 'score' as AppPage, labelTh: 'ดัชนีการประหยัดไฟ', labelEn: 'Saving Score', icon: Trophy, badge: '88 Pts' },
    { id: 'locations' as AppPage, labelTh: 'สถานที่ของฉัน', labelEn: 'My Locations', icon: MapPin, badge: undefined },
    { id: 'appliances' as AppPage, labelTh: 'เครื่องใช้ไฟฟ้า', labelEn: 'Appliances', icon: Plug, badge: undefined },
    { id: 'budget' as AppPage, labelTh: 'ค่าไฟ & งบประมาณ', labelEn: 'Budget & Bills', icon: Wallet, badge: undefined },
    { id: 'analytics' as AppPage, labelTh: 'วิเคราะห์การใช้ไฟ', labelEn: 'Analytics', icon: BarChart3, badge: undefined },
    { id: 'learning' as AppPage, labelTh: 'เรียนรู้ & คู่มือ', labelEn: 'Learning & Guide', icon: GraduationCap, badge: 'New' },
    { id: 'achievements' as AppPage, labelTh: 'ภารกิจ & รางวัล', labelEn: 'Missions', icon: Award, badge: undefined },
    { id: 'profile' as AppPage, labelTh: 'โปรไฟล์', labelEn: 'Profile', icon: User, badge: undefined },
    { id: 'trust-center' as AppPage, labelTh: 'ศูนย์ความน่าเชื่อถือ & AI', labelEn: 'Trust & Transparency', icon: ShieldCheck, badge: 'Trust' },
    { id: 'settings' as AppPage, labelTh: 'ตั้งค่า', labelEn: 'Settings', icon: Settings, badge: undefined },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-[calc(100vh-2rem)] sticky top-4 left-4 z-40 my-4 ml-4">
      <div className={`flex flex-col justify-between h-full p-5 rounded-[2rem] border transition-all duration-300 shadow-xl overflow-y-auto ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800/80 text-white shadow-emerald-950/20 backdrop-blur-xl' 
          : 'bg-white/95 border-emerald-100/80 text-slate-800 shadow-emerald-500/5 backdrop-blur-xl'
      }`}>
        {/* Top: Branding & Mascot */}
        <div>
          <div className="flex items-center gap-3.5 mb-6 px-2 pt-1">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/30">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent font-display">
                EduEase Energy
              </h1>
              <p className="text-[0.7rem] font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Energy Coach
              </p>
            </div>
          </div>

          {/* User Status Card (Duolingo Style Gamified Pill) */}
          <div className={`p-3.5 rounded-2xl mb-6 border transition-all ${
            isDarkMode 
              ? 'bg-slate-800/60 border-slate-700/60 hover:border-emerald-500/30' 
              : 'bg-emerald-50/70 border-emerald-100 hover:border-emerald-200'
          }`}>
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-md shrink-0">
                {currentAvatar || '⚡'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs truncate">Namyen</span>
                  <span className="text-[0.65rem] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Lv. {userLevel}
                  </span>
                </div>
                <p className="text-[0.68rem] text-slate-500 dark:text-slate-400 font-medium truncate">
                  Eco Master
                </p>
              </div>
            </div>

            {/* Streak & Coins Badges */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
                <span>{userStreak} {lang === 'th' ? 'วัน' : 'Days'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-700 dark:text-amber-300 font-bold text-xs">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>{userCoins}</span>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div>
              <div className="flex justify-between text-[0.65rem] font-bold text-slate-500 dark:text-slate-400 mb-1">
                <span>XP Progress</span>
                <span>{userXp} / {userXpMax}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (userXp / userXpMax) * 100)}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 group ${
                    isActive
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                        : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      : isDarkMode
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive 
                        ? (isDarkMode ? 'text-emerald-400' : 'text-white') 
                        : (isDarkMode ? 'text-slate-400 group-hover:text-emerald-400' : 'text-slate-500 group-hover:text-emerald-600')
                    }`} />
                    <span>{lang === 'th' ? item.labelTh : item.labelEn}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[0.6rem] font-black uppercase px-2 py-0.5 rounded-full ${
                      item.badge === 'Hero'
                        ? 'bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30'
                        : 'bg-teal-400/20 text-teal-700 dark:text-teal-300 border border-teal-400/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: Language, Theme, Logout */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between gap-2">
            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                isDarkMode 
                  ? 'border-slate-700/80 bg-slate-800/50 hover:bg-slate-800 text-slate-300' 
                  : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode 
                  ? 'border-slate-700/80 bg-slate-800/50 hover:bg-slate-800 text-amber-400' 
                  : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
              isDarkMode 
                ? 'border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' 
                : 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
            }`}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? 'ออกจากระบบ' : 'Log Out'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
