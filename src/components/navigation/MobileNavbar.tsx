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
  MapPin, 
  Bell, 
  ChevronDown, 
  Check, 
  X,
  Sun,
  Moon,
  Globe,
  Building2
} from 'lucide-react';
import { AppPage, LocationItem, NotificationItem, UserPersona } from '../../types';
import { getPersonaConfig } from '../../data/personaThemes';

interface MobileNavbarProps {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  locations?: LocationItem[];
  currentLocationId?: string;
  onSwitchLocation?: (id: string) => void;
  notifications?: NotificationItem[];
  onOpenNotifications?: () => void;
  onOpenAccountModal?: () => void;
  currentAvatar?: string;
  userLevel?: number;
  userStreak?: number;
  userCoins?: number;
  infoDetailMode?: any;
  onChangeDetailMode?: (mode: any) => void;
  persona?: UserPersona;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  currentPage,
  setCurrentPage,
  lang,
  setLang,
  isDarkMode,
  onToggleTheme,
  locations = [],
  currentLocationId,
  onSwitchLocation,
  notifications = [],
  onOpenNotifications,
  onOpenAccountModal,
  currentAvatar = '⚡',
  userLevel = 1,
  persona = 'student',
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showLocationSelect, setShowLocationSelect] = useState(false);

  const personaConfig = getPersonaConfig(persona);
  const currentLoc = locations.find(l => l.id === currentLocationId) || locations[0];
  const unreadCount = notifications.filter(n => !n.read).length;

  // STRICT CI LOCK: Maximum 5 items in bottom navigation (4 primary + 1 More menu button)
  const bottomNavItems = [
    { id: 'home' as AppPage, subIds: ['home'], labelTh: 'หน้าหลัก', labelEn: 'Home', icon: Home },
    { id: 'ai-coach' as AppPage, subIds: ['ai-coach', 'insights'], labelTh: 'AI Coach', labelEn: 'AI Coach', icon: Bot },
    { id: 'appliances' as AppPage, subIds: ['appliances', 'compare'], labelTh: 'อุปกรณ์', labelEn: 'Appliances', icon: Plug },
    { id: 'city' as AppPage, subIds: ['city', 'achievements', 'score'], labelTh: 'เมืองยั่งยืน', labelEn: 'City', icon: Building2 },
  ];

  const moreSections = [
    {
      titleTh: 'ENERGY (พลังงาน)',
      titleEn: 'ENERGY',
      items: [
        { id: 'locations' as AppPage, subIds: ['locations'], labelTh: 'สถานที่ของฉัน', labelEn: 'My Locations', icon: MapPin, badge: currentLoc?.name },
        { id: 'budget' as AppPage, subIds: ['budget'], labelTh: 'งบประมาณ & แจ้งเตือน', labelEn: 'Budget', icon: Wallet },
        { id: 'analytics' as AppPage, subIds: ['analytics'], labelTh: 'วิเคราะห์การใช้ไฟ', labelEn: 'Analytics', icon: BarChart3 },
      ],
    },
    {
      titleTh: 'LEARN & PLAY (เรียนรู้ & เล่น)',
      titleEn: 'LEARN & PLAY',
      items: [
        { id: 'learning' as AppPage, subIds: ['learning', 'game'], labelTh: 'การเรียนรู้ & อาร์เคด', labelEn: 'Learning & Arcade', icon: GraduationCap },
      ],
    },
    {
      titleTh: 'SYSTEM (ระบบ)',
      titleEn: 'SYSTEM',
      items: [
        { id: 'settings' as AppPage, subIds: ['settings', 'trust-center', 'ux-assessment', 'crypto'], labelTh: 'ตั้งค่าระบบ', labelEn: 'Settings', icon: Settings },
        { id: 'profile' as AppPage, subIds: ['profile'], labelTh: 'โปรไฟล์ผู้ใช้', labelEn: 'Profile', icon: User },
      ],
    },
  ];

  return (
    <>
      {/* ----------------------------------------------------
          MOBILE HEADER (CI LOCK: Only Location + Notification + Profile)
          Height: 56px | Background: Surface | Border-b
          ---------------------------------------------------- */}
      <header className={`lg:hidden sticky top-0 z-40 h-14 px-4 border-b flex items-center justify-between transition-colors ${
        isDarkMode 
          ? 'bg-[#151C23]/95 border-white/10 text-[#F5F7F8]' 
          : 'bg-[#FFFFFF]/95 border-[#E2E8E4] text-[#15201A]'
      } backdrop-blur-md`}>
        {/* Left: Location Switcher Target */}
        <div className="relative">
          <button
            onClick={() => setShowLocationSelect(!showLocationSelect)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] border text-xs font-semibold max-w-[200px] transition-colors ${
              isDarkMode 
                ? 'bg-[#1B242D] border-white/10 text-[#F5F7F8]' 
                : 'bg-[#F6F8F7] border-[#E2E8E4] text-[#15201A]'
            }`}
            aria-label="Switch location"
          >
            <MapPin className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
            <span className="truncate text-xs font-medium font-display">
              {currentLoc?.name || 'My Dorm'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#78857D] shrink-0 transition-transform ${showLocationSelect ? 'rotate-180' : ''}`} />
          </button>

          {/* Location Dropdown Modal/Sheet for Mobile */}
          <AnimatePresence>
            {showLocationSelect && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className={`absolute left-0 top-full mt-2 w-64 p-2 rounded-[16px] border shadow-xl z-50 ${
                  isDarkMode ? 'bg-[#151C23] border-white/10 text-[#F5F7F8]' : 'bg-[#FFFFFF] border-[#E2E8E4] text-[#15201A]'
                }`}
              >
                <div className="text-[11px] font-semibold text-[#78857D] px-2 py-1 uppercase tracking-wider">
                  {lang === 'th' ? 'เลือกสถานที่' : 'Select Location'}
                </div>
                <div className="space-y-1 mt-1">
                  {locations.map((loc) => {
                    const isSelected = loc.id === (currentLocationId || locations[0]?.id);
                    return (
                      <button
                        key={loc.id}
                        onClick={() => {
                          onSwitchLocation?.(loc.id);
                          setShowLocationSelect(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-[10px] text-xs transition-colors ${
                          isSelected
                            ? 'bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80] font-semibold'
                            : isDarkMode ? 'hover:bg-[#1B242D] text-[#AAB4BE]' : 'hover:bg-[#F6F8F7] text-[#53635A]'
                        }`}
                      >
                        <span className="truncate">{loc.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Notifications & Profile (Touch targets >= 44x44px) */}
        <div className="flex items-center gap-1">
          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className={`relative w-11 h-11 flex items-center justify-center rounded-[10px] transition-colors ${
              isDarkMode ? 'hover:bg-[#1B242D] text-[#F5F7F8]' : 'hover:bg-[#F6F8F7] text-[#15201A]'
            }`}
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-[#53635A] dark:text-[#AAB4BE]" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DC2626]"></span>
              </span>
            )}
          </button>

          {/* Profile / Account Trigger */}
          <button
            onClick={onOpenAccountModal || (() => setCurrentPage('profile'))}
            className="w-11 h-11 flex items-center justify-center rounded-[10px]"
            aria-label="User profile"
          >
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-tr from-amber-400 to-amber-500 text-[#15201A] flex items-center justify-center text-sm font-bold shadow-sm">
              {currentAvatar || '⚡'}
            </div>
          </button>
        </div>
      </header>

      {/* ----------------------------------------------------
          MORE MENU BOTTOM SHEET
          ---------------------------------------------------- */}
      <AnimatePresence>
        {showMoreMenu && (
          <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden bg-black/50 backdrop-blur-sm p-3">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              className={`w-full max-w-md rounded-[16px] p-5 border shadow-xl ${
                isDarkMode ? 'bg-[#151C23] border-white/10 text-[#F5F7F8]' : 'bg-[#FFFFFF] border-[#E2E8E4] text-[#15201A]'
              }`}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E8E4] dark:border-white/10">
                <h3 className="font-bold text-sm font-display">{lang === 'th' ? 'เมนูเพิ่มเติม' : 'More Menu'}</h3>
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-[10px] hover:bg-[#F6F8F7] dark:hover:bg-[#1B242D]"
                >
                  <X className="w-4 h-4 text-[#78857D]" />
                </button>
              </div>

              {/* Secondary Navigation Grouped by Mental Models */}
              <div className="space-y-3 mb-4 max-h-[60vh] overflow-y-auto pr-1">
                {moreSections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#78857D] px-1">
                      {lang === 'th' ? section.titleTh : section.titleEn}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.subIds ? item.subIds.includes(currentPage) : currentPage === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setCurrentPage(item.id);
                              setShowMoreMenu(false);
                            }}
                            className={`flex items-center gap-2.5 p-2.5 rounded-[10px] border text-xs font-semibold transition-colors text-left cursor-pointer ${
                              isActive
                                ? 'bg-[#DCFCE7] border-[#16A34A] text-[#15803D] dark:bg-[#16A34A]/20 dark:border-[#16A34A]/40 dark:text-[#4ADE80]'
                                : isDarkMode
                                  ? 'bg-[#1B242D] border-white/10 text-[#AAB4BE] hover:text-[#F5F7F8]'
                                  : 'bg-[#F6F8F7] border-[#E2E8E4] text-[#53635A] hover:text-[#15201A]'
                            }`}
                          >
                            <Icon className="w-4 h-4 text-[#16A34A] shrink-0" />
                            <span className="truncate">{lang === 'th' ? item.labelTh : item.labelEn}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Preferences: Language and Theme belong in Settings/More menu */}
              <div className="pt-3 border-t border-[#E2E8E4] dark:border-white/10 flex items-center justify-between text-xs text-[#78857D]">
                <span>{lang === 'th' ? 'การตั้งค่าด่วน' : 'Preferences'}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
                    className={`px-2.5 py-1 rounded-[10px] border font-bold text-xs ${
                      isDarkMode ? 'border-white/10 bg-[#1B242D] text-[#F5F7F8]' : 'border-[#E2E8E4] bg-[#F6F8F7] text-[#15201A]'
                    }`}
                  >
                    {lang === 'th' ? 'EN' : 'TH'}
                  </button>
                  <button
                    onClick={onToggleTheme}
                    className={`p-1.5 rounded-[10px] border ${
                      isDarkMode ? 'border-white/10 bg-[#1B242D] text-[#F5F7F8]' : 'border-[#E2E8E4] bg-[#F6F8F7] text-[#15201A]'
                    }`}
                  >
                    {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#53635A]" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------
          MOBILE BOTTOM NAV (CI LOCK: Max 5 Items, Height 72px, Safe Area)
          ---------------------------------------------------- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 dark:bg-[#151C23]/95 border-t border-[#E2E8E4] dark:border-white/10 backdrop-blur-md">
        <div className="h-[72px] max-w-md mx-auto px-2 flex items-center justify-around pb-[env(safe-area-inset-bottom)]">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.subIds ? item.subIds.includes(currentPage) : currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setShowMoreMenu(false);
                  setCurrentPage(item.id);
                }}
                className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] px-2 py-1 rounded-[10px] transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#15803D] dark:text-[#4ADE80] font-semibold'
                    : 'text-[#53635A] dark:text-[#AAB4BE] hover:text-[#15201A] dark:hover:text-[#F5F7F8]'
                }`}
                aria-label={lang === 'th' ? item.labelTh : item.labelEn}
              >
                <div className={`p-1 rounded-[8px] transition-colors ${
                  isActive ? 'bg-[#DCFCE7] dark:bg-[#16A34A]/20' : ''
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] mt-0.5 tracking-tight">
                  {lang === 'th' ? item.labelTh : item.labelEn}
                </span>
              </button>
            );
          })}

          {/* 5th Item: More Menu Trigger */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] px-2 py-1 rounded-[10px] transition-colors cursor-pointer ${
              showMoreMenu || ['locations', 'budget', 'analytics', 'learning', 'game', 'profile', 'settings', 'trust-center', 'ux-assessment', 'crypto'].includes(currentPage)
                ? 'text-[#15803D] dark:text-[#4ADE80] font-semibold'
                : 'text-[#53635A] dark:text-[#AAB4BE] hover:text-[#15201A] dark:hover:text-[#F5F7F8]'
            }`}
            aria-label="More menu"
          >
            <div className={`p-1 rounded-[8px] transition-colors ${
              showMoreMenu ? 'bg-[#DCFCE7] dark:bg-[#16A34A]/20' : ''
            }`}>
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">
              {lang === 'th' ? 'เพิ่มเติม' : 'More'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};


