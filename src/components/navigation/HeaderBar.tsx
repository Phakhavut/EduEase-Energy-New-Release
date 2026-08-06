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
  Sparkles, 
  Sliders, 
  Check, 
  Plus, 
  Flame, 
  Coins, 
  X,
  Info
} from 'lucide-react';
import { LocationItem, InfoDetailMode, NotificationItem, AppPage } from '../../types';

interface HeaderBarProps {
  locations: LocationItem[];
  currentLocationId: string;
  onSwitchLocation: (id: string) => void;
  onNavigateToLocations: () => void;
  infoDetailMode: InfoDetailMode;
  onChangeDetailMode: (mode: InfoDetailMode) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  userLevel: number;
  userStreak: number;
  userCoins: number;
  currentAvatar: string;
  isDarkMode: boolean;
  lang: 'th' | 'en';
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  locations,
  currentLocationId,
  onSwitchLocation,
  onNavigateToLocations,
  infoDetailMode,
  onChangeDetailMode,
  notifications,
  onOpenNotifications,
  userLevel,
  userStreak,
  userCoins,
  currentAvatar,
  isDarkMode,
  lang,
}) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);

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
    <header className={`hidden lg:flex items-center justify-between px-6 py-3.5 rounded-3xl border shadow-lg backdrop-blur-xl transition-all sticky top-4 z-30 mb-6 ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800/80 text-white shadow-emerald-950/10' 
        : 'bg-white/95 border-emerald-100/80 text-slate-800 shadow-emerald-500/5'
    }`}>
      {/* Left: Location Switcher Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          className={`flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all text-left group ${
            isDarkMode 
              ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500/40' 
              : 'bg-emerald-50/80 border-emerald-200/80 hover:border-emerald-300'
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-sm shadow-sm shrink-0">
            <IconComp className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[0.68rem] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <MapPin className="w-3 h-3" />
              <span>{lang === 'th' ? 'สถานที่เปิดใช้งานอยู่' : 'Active Property'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-800 dark:text-white font-display">
                {currentLoc?.name}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </button>

        {/* Location Selector Dropdown Menu */}
        <AnimatePresence>
          {showLocationDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`absolute left-0 mt-2 w-72 rounded-3xl p-3 border shadow-2xl z-50 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-emerald-100 text-slate-800'
              }`}
            >
              <div className="text-[0.68rem] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5 mb-1 flex items-center justify-between">
                <span>{lang === 'th' ? 'สลับสถานที่จัดการ' : 'Switch Property'}</span>
                <span className="text-emerald-500">{locations.length} แห่ง</span>
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
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                        isSelected
                          ? isDarkMode
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-emerald-500 text-white'
                          : isDarkMode
                            ? 'hover:bg-slate-800 text-slate-300'
                            : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <LIcon className="w-4 h-4 shrink-0" />
                        <div className="truncate">
                          <div className="truncate font-extrabold">{loc.name}</div>
                          <div className={`text-[0.65rem] ${isSelected ? (isDarkMode ? 'text-emerald-300' : 'text-emerald-100') : 'text-slate-400'}`}>
                            ฿{loc.estimatedBill.toLocaleString()} / ฿{loc.budget.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    setShowLocationDropdown(false);
                    onNavigateToLocations();
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 text-xs font-bold transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'th' ? 'จัดการ / เพิ่มสถานที่ใหม่' : 'Manage Locations'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center: Info Detail Mode Selector Toggle */}
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 p-1 rounded-2xl border text-xs font-bold ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100/80 border-slate-200'
        }`}>
          <span className="px-2 text-[0.68rem] text-slate-400 uppercase font-black tracking-wider flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-emerald-500" />
            โหมดข้อมูล:
          </span>

          <button
            onClick={() => onChangeDetailMode('simple')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              infoDetailMode === 'simple'
                ? 'bg-emerald-500 text-white font-extrabold shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {lang === 'th' ? 'แบบเข้าใจง่าย' : 'Simple'}
          </button>

          <button
            onClick={() => onChangeDetailMode('balanced')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              infoDetailMode === 'balanced'
                ? 'bg-emerald-500 text-white font-extrabold shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {lang === 'th' ? 'แบบสมดุล' : 'Balanced'}
          </button>

          <button
            onClick={() => onChangeDetailMode('detailed')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              infoDetailMode === 'detailed'
                ? 'bg-emerald-500 text-white font-extrabold shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {lang === 'th' ? 'แบบละเอียด' : 'Detailed'}
          </button>
        </div>
      </div>

      {/* Right: Notifications & User Level Badge */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className={`relative p-2.5 rounded-2xl border transition-all ${
            isDarkMode
              ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              : 'bg-slate-100/80 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-emerald-500" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-white text-[0.6rem] font-black items-center justify-center">
                {unreadCount}
              </span>
            </span>
          )}
        </button>

        {/* User Level Pill */}
        <div className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl border ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100/80 border-slate-200'
        }`}>
          <div className="w-7 h-7 rounded-xl bg-amber-400 flex items-center justify-center text-sm shadow-sm">
            {currentAvatar || '⚡'}
          </div>
          <div>
            <div className="text-[0.65rem] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Level {userLevel}
            </div>
            <div className="text-xs font-extrabold text-slate-800 dark:text-white leading-tight">
              Namyen
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
