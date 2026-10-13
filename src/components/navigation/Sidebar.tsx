import React from 'react';
import { motion } from 'motion/react';
import { EduEaseLogo } from '../brand/EduEaseLogo';
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
  ShieldCheck,
  Gamepad2,
  Building2
} from 'lucide-react';
import { AppPage, GamificationSettings, DEFAULT_GAMIFICATION_SETTINGS, UserPersona, LocationItem } from '../../types';
import { getPersonaConfig } from '../../data/personaThemes';

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
  gamificationSettings?: GamificationSettings;
  persona?: UserPersona;
  locations?: LocationItem[];
  currentLocationId?: string;
  onOpenBrandGuide?: () => void;
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
  gamificationSettings = DEFAULT_GAMIFICATION_SETTINGS,
  persona = 'student',
  locations,
  currentLocationId,
  onOpenBrandGuide,
}) => {
  const isCleanMode = gamificationSettings.cleanUtilityMode;
  const personaConfig = getPersonaConfig(persona);
  const currentLoc = locations?.find(l => l.id === currentLocationId) || locations?.[0];
  const selectedLocationName = currentLoc?.name || (lang === 'th' ? personaConfig.defaultLocationNameTh : personaConfig.defaultLocationNameEn);

  // 1. MAIN
  const mainNavItems = [
    { 
      id: 'home' as AppPage, 
      subIds: ['home'], 
      labelTh: 'หน้าหลัก', 
      labelEn: 'Home', 
      icon: Home, 
      badge: undefined 
    },
    { 
      id: 'ai-coach' as AppPage, 
      subIds: ['ai-coach', 'insights'], 
      labelTh: 'AI Coach & ข้อมูลเชิงลึก', 
      labelEn: 'AI Coach', 
      icon: Bot, 
      badge: 'AI' 
    },
  ];

  // 2. ENERGY
  const energyNavItems = [
    { 
      id: 'locations' as AppPage, 
      subIds: ['locations'], 
      labelTh: 'สถานที่ของฉัน', 
      labelEn: 'My Locations', 
      icon: MapPin, 
      badge: currentLoc ? currentLoc.name.slice(0, 10) : undefined 
    },
    { 
      id: 'appliances' as AppPage, 
      subIds: ['appliances', 'compare'], 
      labelTh: 'เครื่องใช้ไฟฟ้า', 
      labelEn: 'Appliances', 
      icon: Plug, 
      badge: undefined 
    },
    { 
      id: 'budget' as AppPage, 
      subIds: ['budget'], 
      labelTh: 'งบประมาณ & แจ้งเตือน', 
      labelEn: 'Budget', 
      icon: Wallet, 
      badge: undefined 
    },
    { 
      id: 'analytics' as AppPage, 
      subIds: ['analytics'], 
      labelTh: 'วิเคราะห์การใช้ไฟ', 
      labelEn: 'Analytics', 
      icon: BarChart3, 
      badge: undefined 
    },
  ];

  // 3. LEARN & PLAY
  const learnPlayNavItems = [
    { 
      id: 'learning' as AppPage, 
      subIds: ['learning', 'game'], 
      labelTh: 'การเรียนรู้ & อาร์เคด', 
      labelEn: 'Learning & Arcade', 
      icon: GraduationCap, 
      badge: undefined 
    },
    { 
      id: 'city' as AppPage, 
      subIds: ['city', 'achievements', 'score'], 
      labelTh: 'เมืองความยั่งยืน', 
      labelEn: 'Sustainable City', 
      icon: Building2, 
      badge: undefined 
    },
  ];

  // 4. SYSTEM
  const systemNavItems = [
    { 
      id: 'settings' as AppPage, 
      subIds: ['settings', 'trust-center', 'ux-assessment', 'crypto', 'profile'], 
      labelTh: 'ตั้งค่าระบบ', 
      labelEn: 'Settings', 
      icon: Settings, 
      badge: undefined 
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[240px] shrink-0 h-[calc(100vh-2rem)] sticky top-4 left-4 z-40 my-4 ml-4">
      <div className={`flex flex-col justify-between h-full p-4 rounded-[16px] border transition-colors duration-200 overflow-y-auto ${
        isDarkMode 
          ? 'bg-[#11161D] border-[#1F2935] text-[#F3F6F9]' 
          : 'bg-[#FFFFFF] border-[#E2E8F0] text-[#1E293B]'
      }`}>
        {/* Top: Branding */}
        <div>
          <button
            type="button"
            onClick={() => onOpenBrandGuide ? onOpenBrandGuide() : setCurrentPage('home')}
            className="flex items-center gap-2.5 mb-5 px-1 pt-1 text-left w-full hover:opacity-90 transition-opacity cursor-pointer group"
            title={lang === 'th' ? 'คลิกเพื่อดูคู่มืออัตลักษณ์แบรนด์ & โลโก้' : 'Click to view Brand Identity & Logo Suite'}
          >
            <EduEaseLogo
              variant="horizontal"
              size="md"
              isDarkMode={isDarkMode}
            />
          </button>

          {/* User Status Card */}
          {isCleanMode ? (
            <div className={`p-3 rounded-[10px] mb-4 border transition-colors ${
              isDarkMode 
                ? 'bg-[#161E27] border-[#2A3848]' 
                : 'bg-[#F8FAFC] border-[#E2E8F0]'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[8px] bg-[#1AA298] flex items-center justify-center text-white text-sm font-bold shrink-0">
                  ⚡
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs truncate" title={selectedLocationName}>
                      {selectedLocationName}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-[6px] bg-[#E8F8F6] text-[#138A81] dark:bg-[#1AA298]/20 dark:text-[#38C7BA]">
                      PRO
                    </span>
                  </div>
                  <p className="text-[11px] text-[#53635A] dark:text-[#AAB4BE] truncate">
                    {lang === 'th' ? personaConfig.roleBadgeTh : personaConfig.roleBadgeEn}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-3 rounded-[12px] mb-4 border transition-colors ${
              isDarkMode 
                ? 'bg-[#0B132B] border-[#1E2E5D]' 
                : 'bg-[#F8FAFC] border-[#E2E8F0]'
            }`}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-[8px] bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white flex items-center justify-center text-base font-bold shadow-md shadow-blue-600/20 shrink-0">
                  {currentAvatar || '⚡'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs truncate" title={selectedLocationName}>
                      {selectedLocationName}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-[6px] bg-blue-50 text-[#1D4ED8] dark:bg-blue-500/20 dark:text-[#60A5FA] border border-blue-400/30">
                      Lv. {userLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#53635A] dark:text-[#94A3B8] truncate">
                    {lang === 'th' ? personaConfig.roleBadgeTh : personaConfig.roleBadgeEn}
                  </p>
                </div>
              </div>

              {/* Streak & Coins Badges */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{userStreak} {lang === 'th' ? 'วัน' : 'd'}</span>
                </div>
                <button 
                  onClick={() => setCurrentPage('crypto')}
                  title={lang === 'th' ? 'ดูกระเป๋าเหรียญพลังงาน' : 'View Eco Coins'}
                  className="flex items-center gap-1 px-2 py-1 rounded-[8px] bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 text-amber-700 dark:text-amber-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>{userCoins} ECO</span>
                </button>
              </div>

              {/* XP Progress Bar */}
              <div>
                <div className="flex justify-between text-[10px] font-medium text-[#78857D] dark:text-[#94A3B8] mb-1">
                  <span>XP</span>
                  <span className="font-mono">{userXp}/{userXpMax}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#E2E8E4] dark:bg-white/10 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (userXp / userXpMax) * 100)}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items (4 Mental Model Categories) */}
          <nav className="space-y-3">
            {/* 1. MAIN */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#78857D] dark:text-[#64748B] px-2.5">
                {lang === 'th' ? 'MAIN (เมนูหลัก)' : 'MAIN'}
              </div>
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.subIds ? item.subIds.includes(currentPage) : currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs transition-colors group cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-[#1D4ED8] dark:bg-[#2563EB]/25 dark:text-[#60A5FA] font-bold border border-blue-200 dark:border-blue-500/40 shadow-sm'
                        : isDarkMode
                          ? 'text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#101B3B]'
                          : 'text-[#53635A] hover:text-[#0A1128] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB] dark:text-[#38BDF8]' : 'text-[#78857D] dark:text-[#64748B]'}`} />
                      <span>{lang === 'th' ? item.labelTh : item.labelEn}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-[6px] bg-[#38BDF8]/15 text-[#0284C7] dark:text-[#38BDF8] border border-[#38BDF8]/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 2. ENERGY */}
            <div className="space-y-1 pt-2 border-t border-[#E2E8E4] dark:border-[#1E2E5D]/60">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#78857D] dark:text-[#64748B] px-2.5">
                {lang === 'th' ? 'ENERGY (พลังงาน)' : 'ENERGY'}
              </div>
              {energyNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.subIds ? item.subIds.includes(currentPage) : currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs transition-colors group cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-[#1D4ED8] dark:bg-[#2563EB]/25 dark:text-[#60A5FA] font-bold border border-blue-200 dark:border-blue-500/40 shadow-sm'
                        : isDarkMode
                          ? 'text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#101B3B]'
                          : 'text-[#53635A] hover:text-[#0A1128] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB] dark:text-[#38BDF8]' : 'text-[#78857D] dark:text-[#64748B]'}`} />
                      <span>{lang === 'th' ? item.labelTh : item.labelEn}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[9px] font-medium max-w-[70px] truncate px-1.5 py-0.5 rounded-[5px] bg-[#38BDF8]/15 text-[#0284C7] dark:text-[#7DD3FC]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 3. LEARN & PLAY */}
            <div className="space-y-1 pt-2 border-t border-[#E2E8E4] dark:border-[#1E2E5D]/60">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#78857D] dark:text-[#64748B] px-2.5">
                {lang === 'th' ? 'LEARN & PLAY (เรียนรู้ & เล่น)' : 'LEARN & PLAY'}
              </div>
              {learnPlayNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.subIds ? item.subIds.includes(currentPage) : currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs transition-colors group cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-[#1D4ED8] dark:bg-[#2563EB]/25 dark:text-[#60A5FA] font-bold border border-blue-200 dark:border-blue-500/40 shadow-sm'
                        : isDarkMode
                          ? 'text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#101B3B]'
                          : 'text-[#53635A] hover:text-[#0A1128] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB] dark:text-[#38BDF8]' : 'text-[#78857D] dark:text-[#64748B]'}`} />
                      <span>{lang === 'th' ? item.labelTh : item.labelEn}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-[6px] bg-[#10B981]/15 text-[#059669] dark:text-[#34D399]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 4. SYSTEM */}
            <div className="space-y-1 pt-2 border-t border-[#E2E8E4] dark:border-[#1E2E5D]/60">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#78857D] dark:text-[#64748B] px-2.5">
                {lang === 'th' ? 'SYSTEM (ระบบ)' : 'SYSTEM'}
              </div>
              {systemNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.subIds ? item.subIds.includes(currentPage) : currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs transition-colors group cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-[#1D4ED8] dark:bg-[#2563EB]/25 dark:text-[#60A5FA] font-bold border border-blue-200 dark:border-blue-500/40 shadow-sm'
                        : isDarkMode
                          ? 'text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#101B3B]'
                          : 'text-[#53635A] hover:text-[#0A1128] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB] dark:text-[#38BDF8]' : 'text-[#78857D] dark:text-[#64748B]'}`} />
                      <span>{lang === 'th' ? item.labelTh : item.labelEn}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Bottom Actions: Language, Theme, Logout */}
        <div className="pt-3 border-t border-[#E2E8E4] dark:border-[#1E2E5D]/60 space-y-2">
          <div className="flex items-center justify-between gap-1.5">
            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-[10px] border text-xs font-semibold transition-colors ${
                isDarkMode 
                  ? 'border-[#1E2E5D] bg-[#0B132B] hover:bg-[#101B3B] text-[#FFFFFF]' 
                  : 'border-[#CBD5E1] bg-[#F8FAFC] hover:bg-[#EAEFEA] text-[#0A1128]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-1.5 rounded-[10px] border transition-colors ${
                isDarkMode 
                  ? 'border-[#1E2E5D] bg-[#0B132B] text-amber-400' 
                  : 'border-[#CBD5E1] bg-[#F8FAFC] text-[#53635A]'
              }`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-[10px] border text-xs font-medium transition-colors ${
              isDarkMode 
                ? 'border-[#DC2626]/20 bg-[#DC2626]/10 text-[#F87171] hover:bg-[#DC2626]/20' 
                : 'border-[#DC2626]/20 bg-red-50 text-[#DC2626] hover:bg-red-100'
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
