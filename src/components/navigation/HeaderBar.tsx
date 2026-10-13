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
        ? 'bg-[#060A18]/90 border-[#1E2E5D]/60 text-[#FFFFFF]' 
        : 'bg-[#FFFFFF]/95 border-[#CBD5E1] text-[#0A1128]'
    } backdrop-blur-md`}>
      {/* Left: Location Switcher Dropdown */}
      <div className="relative shrink-0 flex items-center gap-3">
        <button
          onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-[12px] border transition-colors text-left group ${
            isDarkMode 
              ? 'bg-[#0B132B] border-[#1E2E5D] hover:border-blue-500/50' 
              : 'bg-[#F8FAFC] border-[#CBD5E1] hover:border-blue-400'
          }`}
        >
          <div className="w-7 h-7 rounded-[8px] bg-[#2563EB] flex items-center justify-center text-white text-xs shadow-md shadow-blue-600/30 shrink-0 font-bold">
            <IconComp className="w-3.5 h-3.5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-[#0A1128] dark:text-[#FFFFFF] font-display truncate max-w-[130px] xl:max-w-[170px]">
                {currentLoc?.name}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#78857D] dark:text-[#94A3B8] transition-transform shrink-0 ${showLocationDropdown ? 'rotate-180' : ''}`} />
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
              className={`absolute left-0 top-full mt-2 w-72 rounded-[16px] p-2.5 border shadow-2xl z-50 ${
                isDarkMode ? 'bg-[#0B132B] border-[#1E2E5D] text-white shadow-blue-950/60' : 'bg-[#FFFFFF] border-[#CBD5E1] text-[#0A1128]'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#78857D] dark:text-[#94A3B8] px-2.5 py-1 mb-1 flex items-center justify-between">
                <span>{lang === 'th' ? 'สลับสถานที่' : 'Switch Location'}</span>
                <span className="text-[#38BDF8] font-bold">{locations.length} แห่ง</span>
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
                          ? 'bg-blue-50 text-[#1D4ED8] dark:bg-[#2563EB]/25 dark:text-[#60A5FA] font-semibold border border-blue-200 dark:border-blue-500/40'
                          : isDarkMode
                            ? 'hover:bg-[#101B3B] text-[#94A3B8] hover:text-white'
                            : 'hover:bg-[#F1F5F9] text-[#53635A]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <LIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{loc.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 mt-2 border-t border-[#E2E8F0] dark:border-[#1E2E5D]/60">
                <button
                  onClick={() => {
                    setShowLocationDropdown(false);
                    onNavigateToLocations();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 p-2 rounded-[10px] bg-[#F1F5F9] dark:bg-[#101B3B] hover:bg-blue-50 dark:hover:bg-blue-500/20 text-xs font-semibold transition-colors text-[#53635A] dark:text-[#94A3B8] hover:text-[#1D4ED8] dark:hover:text-[#38BDF8]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'th' ? 'จัดการสถานที่' : 'Manage Locations'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center: Billing Period */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[#78857D] font-normal">{lang === 'th' ? 'รอบบิลปัจจุบัน:' : 'Billing Period:'}</span>
        <span className="font-semibold text-[#1E293B] dark:text-[#F3F6F9] tabular-nums font-mono">1–30 ก.ย. 2569</span>
      </div>

      {/* Right: Connection, Notifications, Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Connection Status - Soft Green */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] border text-xs font-medium ${
          isDarkMode ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-[11px]">{lang === 'th' ? 'เชื่อมต่อเรียลไทม์' : 'Live Connected'}</span>
        </div>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className={`relative p-2 rounded-[10px] border transition-colors shrink-0 ${
            isDarkMode
              ? 'bg-[#161E27] border-[#2A3848] text-[#AAB4BE] hover:text-[#F3F6F9]'
              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#53635A] hover:text-[#1E293B]'
          }`}
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-amber-500" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-white text-[9px] font-bold items-center justify-center">
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
              ? 'bg-[#161E27] border-[#2A3848] hover:border-[#1AA298]/50' 
              : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#1AA298]/50'
          }`}
          title="โปรไฟล์ & สลับบัญชี"
        >
          <div className="w-7 h-7 rounded-[8px] bg-gradient-to-tr from-[#1AA298] to-[#10B981] text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">
            {currentAvatar || '⚡'}
          </div>
          <div className="text-left hidden xl:block">
            <div className="text-[10px] font-bold text-[#1AA298]">
              Level {userLevel}
            </div>
            <div className="text-xs font-semibold text-[#1E293B] dark:text-[#F3F6F9] leading-tight">
              Namyen
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
