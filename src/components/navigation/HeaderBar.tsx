import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Home, 
  Store, 
  Trees, 
  MapPin, 
  Bell, 
  ChevronDown, 
  Check, 
  Plus
} from 'lucide-react';
import { LocationItem, InfoDetailMode, NotificationItem, AppPage } from '../../types';

interface HeaderBarProps {
  locations: LocationItem[];
  currentLocationId: string;
  onSwitchLocation: (id: string) => void;
  onNavigateToLocations: () => void;
  infoDetailMode?: InfoDetailMode;
  onChangeDetailMode?: (mode: InfoDetailMode) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onOpenSearch?: () => void;
  onOpenManual?: () => void;
  onOpenStatus?: () => void;
  onOpenAccountModal?: () => void;
  userLevel: number;
  userStreak: number;
  userCoins: number;
  currentAvatar: string;
  isDarkMode: boolean;
  onToggleTheme?: () => void;
  lang: 'th' | 'en';
  onToggleLang?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  locations,
  currentLocationId,
  onSwitchLocation,
  onNavigateToLocations,
  infoDetailMode = 'balanced',
  onChangeDetailMode,
  notifications,
  onOpenNotifications,
  onOpenSearch,
  onOpenManual,
  onOpenStatus,
  onOpenAccountModal,
  userLevel,
  userStreak,
  userCoins,
  currentAvatar,
  isDarkMode,
  onToggleTheme,
  lang,
  onToggleLang,
}) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const currentLoc = locations.find(l => l.id === currentLocationId) || locations[0];
  const unreadCount = notifications.filter(n => !n.read).length;

  const getLocationIcon = (type: LocationItem['type']) => {
    switch (type) {
      case 'home': return Home;
      case 'dorm': return Building2;
      case 'provincial': return Trees;
      case 'shop': return Store;
      case 'office': return Building2;
      default: return Home;
    }
  };

  const IconComp = getLocationIcon(currentLoc?.type || 'home');

  return (
    <header className={`hidden lg:flex items-center justify-between gap-4 px-6 h-16 border-b transition-colors sticky top-0 z-30 mb-6 w-full ${
      isDarkMode 
        ? 'bg-[#151C23]/95 border-white/10 text-[#F5F7F8]' 
        : 'bg-[#FFFFFF]/95 border-[#E2E8E4] text-[#15201A]'
    } backdrop-blur-md`}>
      {/* Left: Location Switcher Dropdown */}
      <div className="relative shrink-0 flex items-center gap-3">
        <button
          onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-[10px] border transition-colors text-left group ${
            isDarkMode 
              ? 'bg-[#1B242D] border-white/10 hover:border-[#16A34A]/40' 
              : 'bg-[#F6F8F7] border-[#E2E8E4] hover:border-[#16A34A]/40'
          }`}
        >
          <div className="w-7 h-7 rounded-[8px] bg-[#16A34A] flex items-center justify-center text-white text-xs shadow-sm shrink-0">
            <IconComp className="w-3.5 h-3.5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-[#15201A] dark:text-[#F5F7F8] font-display truncate max-w-[130px] xl:max-w-[170px]">
                {currentLoc?.name}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#78857D] transition-transform shrink-0 ${showLocationDropdown ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </button>

        {/* Location Selector Dropdown Menu */}
        <AnimatePresence>
          {showLocationDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className={`absolute left-0 top-full mt-2 w-72 rounded-[16px] p-2.5 border shadow-xl z-50 ${
                isDarkMode ? 'bg-[#151C23] border-white/10 text-[#F5F7F8]' : 'bg-[#FFFFFF] border-[#E2E8E4] text-[#15201A]'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#78857D] px-2.5 py-1 mb-1 flex items-center justify-between">
                <span>{lang === 'th' ? 'สลับสถานที่' : 'Switch Location'}</span>
                <span className="text-[#16A34A]">{locations.length} แห่ง</span>
              </div>

              <div className="space-y-1">
                {locations.map((loc) => {
                  const LIcon = getLocationIcon(loc.type);
                  const isSelected = loc.id === currentLocationId;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => {
                        onSwitchLocation(loc.id);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-[10px] text-xs font-medium transition-colors text-left ${
                        isSelected
                          ? 'bg-[#DCFCE7] text-[#15803D] dark:bg-[#16A34A]/20 dark:text-[#4ADE80] font-semibold border border-[#16A34A]/30'
                          : isDarkMode
                            ? 'hover:bg-[#1B242D] text-[#AAB4BE]'
                            : 'hover:bg-[#F6F8F7] text-[#53635A]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <LIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{loc.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 mt-2 border-t border-[#E2E8E4] dark:border-white/10">
                <button
                  onClick={() => {
                    setShowLocationDropdown(false);
                    onNavigateToLocations();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 p-2 rounded-[10px] bg-[#F6F8F7] dark:bg-[#1B242D] hover:bg-[#DCFCE7] dark:hover:bg-[#16A34A]/20 text-xs font-semibold transition-colors text-[#53635A] dark:text-[#AAB4BE] hover:text-[#15803D] dark:hover:text-[#4ADE80]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'th' ? 'จัดการสถานที่' : 'Manage Locations'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* System Status: Connected / Real-time */}
      </div>

      {/* Center: Billing Period */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[#78857D] font-normal">{lang === 'th' ? 'รอบบิลปัจจุบัน:' : 'Billing Period:'}</span>
        <span className="font-semibold text-[#15201A] dark:text-[#F5F7F8] tabular-nums font-mono">1–30 ก.ย. 2569</span>
      </div>

      {/* Right: Connection, Notifications, Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Connection Status */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] border text-xs font-medium ${
          isDarkMode ? 'bg-[#16A34A]/10 border-[#16A34A]/30 text-[#4ADE80]' : 'bg-[#DCFCE7] border-[#16A34A]/20 text-[#15803D]'
        }`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]"></span>
          </span>
          <span className="font-semibold text-[11px]">{lang === 'th' ? 'เชื่อมต่อเรียลไทม์' : 'Live Connected'}</span>
        </div>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className={`relative p-2 rounded-[10px] border transition-colors shrink-0 ${
            isDarkMode
              ? 'bg-[#1B242D] border-white/10 text-[#AAB4BE] hover:text-[#F5F7F8]'
              : 'bg-[#F6F8F7] border-[#E2E8E4] text-[#53635A] hover:text-[#15201A]'
          }`}
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-[#16A34A]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#DC2626] text-white text-[9px] font-bold items-center justify-center">
                {unreadCount}
              </span>
            </span>
          )}
        </button>

        {/* User Profile */}
        <button
          onClick={onOpenAccountModal}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[10px] border shrink-0 transition-colors ${
            isDarkMode 
              ? 'bg-[#1B242D] border-white/10 hover:border-[#16A34A]/40' 
              : 'bg-[#F6F8F7] border-[#E2E8E4] hover:border-[#16A34A]/40'
          }`}
          title="โปรไฟล์ & สลับบัญชี"
        >
          <div className="w-7 h-7 rounded-[8px] bg-gradient-to-tr from-amber-400 to-amber-500 text-[#15201A] flex items-center justify-center text-xs font-bold shadow-sm shrink-0">
            {currentAvatar || '⚡'}
          </div>
          <div className="text-left hidden xl:block">
            <div className="text-[10px] font-bold text-[#16A34A]">
              Level {userLevel}
            </div>
            <div className="text-xs font-semibold text-[#15201A] dark:text-[#F5F7F8] leading-tight">
              Namyen
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
