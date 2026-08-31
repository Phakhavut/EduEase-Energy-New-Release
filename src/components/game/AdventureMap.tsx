import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EnergyBoss, BossId, EnergyGuardianState } from '../../types';
import { INITIAL_ENERGY_BOSSES } from '../../data/energyGuardianData';
import { 
  Swords, 
  Lock, 
  CheckCircle2, 
  Star, 
  Zap, 
  ShieldAlert, 
  Coins, 
  Sparkles, 
  Bot, 
  ChevronRight, 
  ArrowRight, 
  Trophy, 
  Trees, 
  Home, 
  Snowflake, 
  Plug, 
  Cpu, 
  Globe,
  MapPin,
  X,
  Play,
  Info,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BossIllustration } from './GameVisualAssets';

export interface ZoneNode {
  id: string;
  zoneNumber: number;
  bossId: BossId;
  nameTh: string;
  nameEn: string;
  titleTh: string;
  titleEn: string;
  topicTh: string;
  topicEn: string;
  icon: string;
  bgGradient: string;
  accentColor: string;
  borderColor: string;
  requiredLevel: number;
  xPercent: number; // For map positioning
  yPercent: number;
  environmentBg: string;
}

const WORLD_ZONES: ZoneNode[] = [
  {
    id: 'zone_1',
    zoneNumber: 1,
    bossId: 'overload',
    nameTh: 'Home Energy Zone',
    nameEn: 'Home Energy Zone',
    titleTh: 'บ้านพลังงานฐาน',
    titleEn: 'Base Home Energy',
    topicTh: 'หน่วยไฟฟ้า (kWh) และวิธีคำนวณค่าไฟ',
    topicEn: 'Electricity Units (kWh) & Bill Calculation',
    icon: '🏡',
    bgGradient: 'from-amber-500/20 via-orange-500/20 to-amber-600/30',
    accentColor: 'text-amber-500',
    borderColor: 'border-amber-500/50',
    requiredLevel: 1,
    xPercent: 18,
    yPercent: 78,
    environmentBg: 'bg-amber-950/40'
  },
  {
    id: 'zone_2',
    zoneNumber: 2,
    bossId: 'cold_phantom',
    nameTh: 'Cooling Zone',
    nameEn: 'Cooling Zone',
    titleTh: 'อาณาจักรความเย็น',
    titleEn: 'Cooling Kingdom',
    topicTh: 'การใช้แอร์อย่างคุ้มค่า และการเลือก Inverter',
    topicEn: 'Efficient AC & Inverter Selection',
    icon: '❄️',
    bgGradient: 'from-cyan-500/20 via-blue-500/20 to-cyan-600/30',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-400/50',
    requiredLevel: 1,
    xPercent: 38,
    yPercent: 52,
    environmentBg: 'bg-cyan-950/40'
  },
  {
    id: 'zone_3',
    zoneNumber: 3,
    bossId: 'watt_devourer',
    nameTh: 'Appliance Zone',
    nameEn: 'Appliance Zone',
    titleTh: 'เขตเครื่องใช้ไฟฟ้า',
    titleEn: 'Appliance Territory',
    topicTh: 'พลังงานแฝง (Standby Power) & ฉลากเบอร์ 5',
    topicEn: 'Standby Power & Energy Label No. 5',
    icon: '🔌',
    bgGradient: 'from-purple-500/20 via-indigo-500/20 to-purple-600/30',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-400/50',
    requiredLevel: 2,
    xPercent: 62,
    yPercent: 68,
    environmentBg: 'bg-purple-950/40'
  },
  {
    id: 'zone_4',
    zoneNumber: 4,
    bossId: 'bill_eater',
    nameTh: 'Smart Zone',
    nameEn: 'Smart Zone',
    titleTh: 'เมืองอัจฉริยะ',
    titleEn: 'Smart Grid & Storage',
    topicTh: 'อัตราค่าไฟ TOU & ระบบกักเก็บพลังงาน',
    topicEn: 'TOU Electricity Tariffs & Energy Storage',
    icon: '⚡',
    bgGradient: 'from-rose-500/20 via-orange-500/20 to-rose-600/30',
    accentColor: 'text-rose-400',
    borderColor: 'border-rose-400/50',
    requiredLevel: 3,
    xPercent: 78,
    yPercent: 36,
    environmentBg: 'bg-rose-950/40'
  },
  {
    id: 'zone_5',
    zoneNumber: 5,
    bossId: 'climate_beast',
    nameTh: 'Green Metropolis Zone',
    nameEn: 'Green Metropolis Zone',
    titleTh: 'นครยั่งยืนสมบูรณ์แบบ',
    titleEn: 'Eco Utopia City',
    topicTh: 'พลังงานหมุนเวียน Solar, Wind & Net Zero',
    topicEn: 'Renewable Energy Solar, Wind & Net Zero',
    icon: '🌱',
    bgGradient: 'from-emerald-500/20 via-teal-500/20 to-emerald-600/30',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-400/50',
    requiredLevel: 4,
    xPercent: 48,
    yPercent: 18,
    environmentBg: 'bg-emerald-950/40'
  }
];

interface AdventureMapProps {
  guardianState: EnergyGuardianState;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onSelectBoss: (boss: EnergyBoss) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  guardianState,
  lang,
  isDarkMode,
  onSelectBoss
}) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedZone, setSelectedZone] = useState<ZoneNode | null>(null);

  // Find boss object by id
  const getBossForZone = (bossId: BossId): EnergyBoss => {
    return INITIAL_ENERGY_BOSSES.find(b => b.id === bossId) || INITIAL_ENERGY_BOSSES[0];
  };

  // Determine stage status
  const getZoneStatus = (zone: ZoneNode) => {
    const isDefeated = guardianState.defeatedBosses.includes(zone.bossId);
    const isUnlocked = guardianState.level >= zone.requiredLevel;
    
    // Check if previous zone defeated (if not zone 1)
    if (zone.zoneNumber > 1) {
      const prevZone = WORLD_ZONES.find(z => z.zoneNumber === zone.zoneNumber - 1);
      if (prevZone && !guardianState.defeatedBosses.includes(prevZone.bossId)) {
        return { isUnlocked: false, isDefeated: false, isCurrent: false };
      }
    }

    const isCurrent = isUnlocked && !isDefeated;
    return { isUnlocked, isDefeated, isCurrent };
  };

  return (
    <div className="space-y-6">
      {/* Header Bar & View Switcher */}
      <div className={`p-5 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-emerald-100 text-slate-800'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              🗺️ WORLD MAP
            </span>
            <h2 className="text-lg font-black font-display bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              {lang === 'th' ? 'แผนที่การผจญภัยในดินแดนพลังงาน' : 'Energy Adventure Map'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'th' 
              ? 'ปลดล็อกโซนประลอง 5 ด่าน เพื่อกำจัดปีศาจกินไฟและสร้างเมืองยั่งยืน' 
              : 'Conquer 5 eco zones to defeat energy monsters and evolve your green city.'}
          </p>
        </div>

        {/* Map vs List Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shrink-0">
          <button
            onClick={() => setViewMode('map')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'map'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-500'
            }`}
          >
            <span>🗺️ {lang === 'th' ? 'แผนที่เกม' : 'Game Map'}</span>
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'list'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-500'
            }`}
          >
            <span>📋 {lang === 'th' ? 'ตารางด่าน' : 'Stage List'}</span>
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* VIEW 1: GRAPHICAL GAME MAP CANVAS */}
      {/* ========================================== */}
      {viewMode === 'map' && (
        <div className={`relative w-full aspect-[4/3] min-h-[460px] sm:min-h-[540px] rounded-3xl border shadow-2xl overflow-hidden ${
          isDarkMode 
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/60 border-slate-800' 
            : 'bg-gradient-to-b from-teal-50 via-emerald-100/60 to-emerald-200 border-emerald-200'
        }`}>
          {/* Background Decorative Terrain Features */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Floating Clouds */}
          <motion.div 
            animate={{ x: [0, 40, 0] }} 
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 left-12 text-5xl opacity-40 select-none pointer-events-none"
          >
            ☁️
          </motion.div>
          <motion.div 
            animate={{ x: [0, -50, 0] }} 
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-16 right-16 text-6xl opacity-35 select-none pointer-events-none"
          >
            ☁️
          </motion.div>

          {/* SVG Connection Paths Between Zones */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="mapPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Winding curved path connecting nodes in order: Z1 -> Z2 -> Z3 -> Z4 -> Z5 */}
            <path
              d="M 18% 78% Q 28% 65%, 38% 52% T 62% 68% T 78% 36% T 48% 18%"
              fill="none"
              stroke="url(#mapPathGrad)"
              strokeWidth="6"
              strokeDasharray="10,8"
              className="animate-pulse"
            />
          </svg>

          {/* Map Zone Nodes */}
          {WORLD_ZONES.map((zone) => {
            const { isUnlocked, isDefeated, isCurrent } = getZoneStatus(zone);
            const boss = getBossForZone(zone.bossId);

            return (
              <div
                key={zone.id}
                style={{ left: `${zone.xPercent}%`, top: `${zone.yPercent}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                {/* Node Interactive Island Container */}
                <motion.div
                  whileHover={{ scale: isUnlocked ? 1.1 : 1.02 }}
                  whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
                  onClick={() => {
                    setSelectedZone(zone);
                  }}
                  className={`relative p-3 sm:p-4 rounded-3xl border-2 cursor-pointer shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-center group ${
                    isCurrent
                      ? 'bg-gradient-to-b from-amber-400/90 via-emerald-500/90 to-slate-900 border-amber-300 ring-4 ring-amber-400/50 shadow-amber-500/40 animate-bounce'
                      : isDefeated
                        ? isDarkMode
                          ? 'bg-slate-900/95 border-emerald-500/80 text-emerald-200 shadow-emerald-500/20'
                          : 'bg-white/95 border-emerald-400 text-slate-800 shadow-emerald-500/20'
                        : isUnlocked
                          ? isDarkMode
                            ? 'bg-slate-900/80 border-slate-700 text-slate-300'
                            : 'bg-white/90 border-slate-300 text-slate-700'
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-500 opacity-70 grayscale'
                  }`}
                >
                  {/* Hero Pin Avatar if current active stage */}
                  {isCurrent && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-lg flex items-center gap-1 border border-amber-200 z-20">
                      <span>⚡</span>
                      <span>{lang === 'th' ? 'ด่านปัจจุบัน' : 'CURRENT'}</span>
                    </div>
                  )}

                  {/* Zone Icon / Boss Icon */}
                  <div className="relative mb-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 block transform group-hover:scale-110 transition-transform flex items-center justify-center">
                      <BossIllustration bossId={zone.bossId} size="sm" />
                    </div>

                    {/* Defeated Badge */}
                    {isDefeated && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] ring-2 ring-white">
                        ✓
                      </span>
                    )}

                    {/* Lock Badge */}
                    {!isUnlocked && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] ring-2 ring-slate-900">
                        🔒
                      </span>
                    )}
                  </div>

                  {/* Zone Title & Level Badge */}
                  <div className="space-y-0.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-slate-900/80 text-amber-300 border border-amber-400/30">
                      ZONE {zone.zoneNumber}
                    </span>
                    <h4 className="font-extrabold text-xs sm:text-sm line-clamp-1 max-w-[100px] text-white drop-shadow-md">
                      {lang === 'th' ? zone.nameTh : zone.nameEn}
                    </h4>
                  </div>

                  {/* Reward Stars for Defeated Zones */}
                  {isDefeated && (
                    <div className="flex items-center gap-0.5 text-amber-400 text-[10px] mt-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400" />
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================== */}
      {/* VIEW 2: STAGE QUICK LIST */}
      {/* ========================================== */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {WORLD_ZONES.map((zone) => {
            const { isUnlocked, isDefeated, isCurrent } = getZoneStatus(zone);
            const boss = getBossForZone(zone.bossId);

            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border-amber-400/80 ring-2 ring-amber-400/30'
                    : isDefeated
                      ? isDarkMode
                        ? 'bg-slate-900/90 border-emerald-500/40 text-emerald-100'
                        : 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                      : isDarkMode
                        ? 'bg-slate-900/50 border-slate-800 opacity-60'
                        : 'bg-slate-100/80 border-slate-200 opacity-70'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${zone.bgGradient} border ${zone.borderColor} flex items-center justify-center text-3xl shadow-lg shrink-0`}>
                    {zone.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-amber-400">
                        ZONE {zone.zoneNumber}
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {lang === 'th' ? zone.nameTh : zone.nameEn}
                      </h3>
                      {isDefeated && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white flex items-center gap-1">
                          ✓ {lang === 'th' ? 'ผ่านด่านแล้ว' : 'Cleared'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      🎯 {lang === 'th' ? zone.topicTh : zone.topicEn}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isUnlocked) {
                      onSelectBoss(boss);
                    } else {
                      alert(lang === 'th' ? `ต้องใช้ Level ${zone.requiredLevel} เพื่อเข้าสู่ด่านนี้` : `Requires Hero Level ${zone.requiredLevel} to unlock`);
                    }
                  }}
                  disabled={!isUnlocked}
                  className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shrink-0 ${
                    isUnlocked
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md hover:scale-105'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <Swords className="w-4 h-4" />
                      <span>{isDefeated ? (lang === 'th' ? 'สู้ซ้ำ' : 'Replay') : (lang === 'th' ? 'เข้าสู้ Boss' : 'Start Battle')}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Lv.{zone.requiredLevel} Lock</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================== */}
      {/* ZONE DETAILS MODAL / DRAWER */}
      {/* ========================================== */}
      <AnimatePresence>
        {selectedZone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl space-y-5 relative overflow-hidden ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedZone(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 dark:text-slate-400 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Zone Header Banner */}
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${selectedZone.bgGradient} border ${selectedZone.borderColor} flex items-center justify-center text-4xl shadow-xl shrink-0`}>
                  {selectedZone.icon}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-400 text-slate-950">
                      ZONE {selectedZone.zoneNumber}
                    </span>
                    <h3 className="text-xl font-black font-display">
                      {lang === 'th' ? selectedZone.nameTh : selectedZone.nameEn}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {lang === 'th' ? selectedZone.titleTh : selectedZone.titleEn}
                  </p>
                </div>
              </div>

              {/* Boss Info Card */}
              {(() => {
                const boss = getBossForZone(selectedZone.bossId);
                const { isUnlocked, isDefeated } = getZoneStatus(selectedZone);

                return (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-3`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{boss.icon}</span>
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {lang === 'th' ? boss.nameTh : boss.nameEn}
                            </h4>
                            <p className="text-[11px] text-rose-500 font-semibold">
                              ❤️ HP: {boss.totalHp} • {lang === 'th' ? boss.weaknessTh : boss.weaknessEn}
                            </p>
                          </div>
                        </div>

                        {isDefeated && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            ✓ Passed
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {lang === 'th' ? boss.descriptionTh : boss.descriptionEn}
                      </p>
                    </div>

                    {/* Educational Topic */}
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Bot className="w-4 h-4" />
                        <span>EcoBot Energy Master Class:</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        {lang === 'th' ? selectedZone.topicTh : selectedZone.topicEn}
                      </p>
                    </div>

                    {/* Rewards Summary */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs font-bold">
                      <span className="text-slate-500 dark:text-slate-400">Stage Rewards:</span>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-500">+{boss.rewards.xp} XP</span>
                        <span className="text-amber-500">+{boss.rewards.coins} Coins</span>
                        <span className="text-cyan-400">💎 +{boss.rewards.crystals}</span>
                      </div>
                    </div>

                    {/* Action CTA Button */}
                    <button
                      onClick={() => {
                        if (isUnlocked) {
                          setSelectedZone(null);
                          onSelectBoss(boss);
                        } else {
                          alert(lang === 'th' ? 'ด่านนี้ยังไม่เปิดใช้งาน' : 'Stage locked');
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-xl transition-all flex items-center justify-center gap-2 ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/25 hover:scale-102'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Swords className="w-4 h-4" />
                      <span>
                        {isUnlocked 
                          ? (isDefeated ? (lang === 'th' ? 'ประลองด่านนี้อีกครั้ง' : 'Replay Zone Battle') : (lang === 'th' ? 'เข้าสู่ฉากการรบด่านนี้' : 'Challenge Boss Now'))
                          : (lang === 'th' ? `ปลดล็อกที่ Hero Level ${selectedZone.requiredLevel}` : `Locked (Requires Hero Level ${selectedZone.requiredLevel})`)
                        }
                      </span>
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
