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
  ShieldCheck,
  Gamepad2,
  Building2
} from 'lucide-react';
import { AppPage, GamificationSettings, DEFAULT_GAMIFICATION_SETTINGS, UserPersona } from '../../types';
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
}) => {
  const isCleanMode = gamificationSettings.cleanUtilityMode;
  const personaConfig = getPersonaConfig(persona);
  const menu = personaConfig.menuCopy;

  const primaryNavItems = [
    { id: 'home' as AppPage, subIds: ['home'], labelTh: 'หน้าหลัก', labelEn: 'Home', icon: Home, badge: undefined },
    { id: 'ai-coach' as AppPage, subIds: ['ai-coach'], labelTh: 'ผู้ช่วย AI Coach', labelEn: 'AI Coach', icon: Bot, badge: 'Smart' },
    { id: 'appliances' as AppPage, subIds: ['appliances', 'compare'], labelTh: 'อุปกรณ์ & โหลดไฟฟ้า', labelEn: 'Appliances', icon: Plug, badge: undefined },
    { id: 'analytics' as AppPage, subIds: ['analytics', 'insights'], labelTh: 'วิเคราะห์การใช้ไฟ', labelEn: 'Analytics', icon: BarChart3, badge: undefined },
  ];

  const secondaryNavItems = [
    { id: 'budget' as AppPage, subIds: ['budget'], labelTh: 'งบประมาณ & ตัดไฟ', labelEn: 'Budget & Alert', icon: Wallet, badge: undefined },
    { id: 'learning' as AppPage, subIds: ['learning', 'city'], labelTh: 'ห้องเรียนพลังงาน', labelEn: 'Energy Academy', icon: GraduationCap, badge: undefined },
    { id: 'achievements' as AppPage, subIds: ['achievements', 'game'], labelTh: 'เควสต์ & รางวัล', labelEn: 'Quests & Rewards', icon: Trophy, badge: undefined },
  ];

  const utilityNavItems = [
    { id: 'locations' as AppPage, subIds: ['locations'], labelTh: 'สถานที่ของฉัน', labelEn: 'My Locations', icon: MapPin, badge: undefined },
    { id: 'settings' as AppPage, subIds: ['settings', 'trust-center', 'ux-assessment', 'crypto'], labelTh: 'ตั้งค่าระบบ', labelEn: 'Settings', icon: Settings, badge: undefined },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[240px] shrink-0 h-[calc(100vh-2rem)] sticky top-4 left-4 z-40 my-4 ml-4">
      <div className={`flex flex-col justify-between h-full p-4 rounded-[16px] border transition-colors duration-200 overflow-y-auto ${
        isDarkMode 
          ? 'bg-[#151C23] border-white/10 text-[#F5F7F8]' 
          : 'bg-[#FFFFFF] border-[#E2E8E4] text-[#15201A]'
      }`}>
        {/* Top: Branding */}
        <div>
          <div className="flex items-center gap-2.5 mb-5 px-1 pt-1">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-tr from-[#16A34A] to-emerald-400 flex items-center justify-center text-white shadow-sm shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-[#15201A] dark:text-[#F5F7F8] font-display">
                EduEase Energy
              </h1>
              <p className="text-[11px] font-medium text-[#16A34A] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                Smart Energy Assistant
              </p>
            </div>
          </div>

          {/* User Status Card */}
          {isCleanMode ? (
            <div className={`p-3 rounded-[10px] mb-4 border transition-colors ${
              isDarkMode 
                ? 'bg-[#1B242D] border-white/10' 
                : 'bg-[#F6F8F7] border-[#E2E8E4]'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[8px] bg-[#16A34A] flex items-center justify-center text-white text-sm shrink-0">
                  ⚡
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs truncate">
                      {lang === 'th' ? personaConfig.defaultLocationNameTh : personaConfig.defaultLocationNameEn}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-[6px] bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80]">
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
            <div className={`p-3 rounded-[10px] mb-4 border transition-colors ${
              isDarkMode 
                ? 'bg-[#1B242D] border-white/10' 
                : 'bg-[#F6F8F7] border-[#E2E8E4]'
            }`}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-[8px] bg-gradient-to-br from-amber-400 to-amber-500 text-[#15201A] flex items-center justify-center text-base font-bold shadow-sm shrink-0">
                  {currentAvatar || '⚡'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs truncate">
                      {lang === 'th' ? personaConfig.defaultLocationNameTh : personaConfig.defaultLocationNameEn}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-[6px] bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80]">
                      Lv. {userLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#53635A] dark:text-[#AAB4BE] truncate">
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
                <div className="flex justify-between text-[10px] font-medium text-[#78857D] mb-1">
                  <span>XP</span>
                  <span className="font-mono">{userXp}/{userXpMax}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#E2E8E4] dark:bg-white/10 overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#16A34A] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (userXp / userXpMax) * 100)}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="space-y-3">
            {/* Primary Actions */}
            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#78857D] px-2.5">
                {lang === 'th' ? 'เมนูหลัก' : 'Main'}
              </div>
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.subIds ? item.subIds.includes(currentPage) : currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs transition-colors group ${
                      isActive
                        ? 'bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80] font-semibold border border-[#16A34A]/30'
                        : isDarkMode
                          ? 'text-[#AAB4BE] hover:text-[#F5F7F8] hover:bg-[#1B242D]'
                          : 'text-[#53635A] hover:text-[#15201A] hover:bg-[#F6F8F7]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#16A34A] dark:text-[#4ADE80]' : 'text-[#78857D]'}`} />
                      <span>{lang === 'th' ? item.labelTh : item.labelEn}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-[6px] bg-[#16A34A]/15 text-[#16A34A] dark:text-[#4ADE80]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Secondary Actions */}
            <div className="space-y-1 pt-2 border-t border-[#E2E8E4] dark:border-white/10">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#78857D] px-2.5">
                {lang === 'th' ? 'การจัดการ & เควสต์' : 'Manage & Learn'}
              </div>
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.subIds ? item.subIds.includes(currentPage) : currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs transition-colors group ${
                      isActive
                        ? 'bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80] font-semibold border border-[#16A34A]/30'
                        : isDarkMode
                          ? 'text-[#AAB4BE] hover:text-[#F5F7F8] hover:bg-[#1B242D]'
                          : 'text-[#53635A] hover:text-[#15201A] hover:bg-[#F6F8F7]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#16A34A] dark:text-[#4ADE80]' : 'text-[#78857D]'}`} />
                      <span>{lang === 'th' ? item.labelTh : item.labelEn}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Utility Actions */}
            <div className="space-y-1 pt-2 border-t border-[#E2E8E4] dark:border-white/10">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#78857D] px-2.5">
                {lang === 'th' ? 'เครื่องมือ & ตั้งค่า' : 'Tools'}
              </div>
              {utilityNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.subIds ? item.subIds.includes(currentPage) : currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs transition-colors group ${
                      isActive
                        ? 'bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80] font-semibold border border-[#16A34A]/30'
                        : isDarkMode
                          ? 'text-[#AAB4BE] hover:text-[#F5F7F8] hover:bg-[#1B242D]'
                          : 'text-[#53635A] hover:text-[#15201A] hover:bg-[#F6F8F7]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#16A34A] dark:text-[#4ADE80]' : 'text-[#78857D]'}`} />
                      <span>{lang === 'th' ? item.labelTh : item.labelEn}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Bottom Actions: Language, Theme, Logout */}
        <div className="pt-3 border-t border-[#E2E8E4] dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between gap-1.5">
            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-[10px] border text-xs font-semibold transition-colors ${
                isDarkMode 
                  ? 'border-white/10 bg-[#1B242D] hover:bg-[#25323E] text-[#F5F7F8]' 
                  : 'border-[#E2E8E4] bg-[#F6F8F7] hover:bg-[#EAEFEA] text-[#15201A]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-1.5 rounded-[10px] border transition-colors ${
                isDarkMode 
                  ? 'border-white/10 bg-[#1B242D] text-amber-400' 
                  : 'border-[#E2E8E4] bg-[#F6F8F7] text-[#53635A]'
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
