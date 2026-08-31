import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Sparkles, 
  Coins, 
  CheckCircle2, 
  Lock, 
  Building2, 
  ArrowRight,
  Zap,
  Layers,
  Award
} from 'lucide-react';
import { 
  JourneyAchievement, 
  CITY_ASSET_DEFINITIONS, 
  CityAssetId,
  SimplifiedCityProgress,
  INITIAL_JOURNEY_ACHIEVEMENTS,
  INITIAL_SIMPLIFIED_CITY
} from '../../../data/cityJourneyData';
import { 
  SolarRoofAsset, 
  CommunityGardenAsset, 
  EcoHomeAsset, 
  WindTurbineAsset, 
  SmartLightsAsset, 
  EVHubAsset 
} from './GreenCityVisualAssets';

interface JourneyRewardsProps {
  achievements?: JourneyAchievement[];
  cityProgress?: SimplifiedCityProgress;
  userCredits?: number;
  onNavigateToBuild?: () => void;
  onBackToCity?: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const JourneyRewards: React.FC<JourneyRewardsProps> = ({
  achievements = INITIAL_JOURNEY_ACHIEVEMENTS,
  cityProgress = INITIAL_SIMPLIFIED_CITY,
  userCredits = 250,
  onNavigateToBuild,
  onBackToCity,
  lang,
  isDarkMode
}) => {
  const [activeGroup, setActiveGroup] = useState<'all' | 'city' | 'habits' | 'learning'>('all');
  const [showAllAchievements, setShowAllAchievements] = useState<boolean>(false);

  const recentlyEarned = achievements
    .filter(a => a.unlocked)
    .slice(0, 3);

  const filteredAchievements = activeGroup === 'all'
    ? achievements
    : achievements.filter(a => a.group === activeGroup);

  const displayedAchievements = showAllAchievements
    ? filteredAchievements
    : filteredAchievements.slice(0, 6);

  const allAssetIds: CityAssetId[] = ['solar-roof', 'community-garden', 'eco-home', 'wind-turbine', 'smart-lights', 'ev-hub'];

  const renderAssetMini = (assetId: CityAssetId) => {
    switch (assetId) {
      case 'solar-roof':
        return <SolarRoofAsset isDarkMode={isDarkMode} className="w-12 h-12" />;
      case 'community-garden':
        return <CommunityGardenAsset isDarkMode={isDarkMode} className="w-12 h-12" />;
      case 'eco-home':
        return <EcoHomeAsset isDarkMode={isDarkMode} className="w-12 h-12" />;
      case 'wind-turbine':
        return <WindTurbineAsset isDarkMode={isDarkMode} className="w-12 h-12" />;
      case 'smart-lights':
        return <SmartLightsAsset isDarkMode={isDarkMode} className="w-12 h-12" />;
      case 'ev-hub':
        return <EVHubAsset isDarkMode={isDarkMode} className="w-12 h-12" />;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Top Single Progress Summary */}
      <div className={`p-6 rounded-[2rem] border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
            🏆
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">
              {lang === 'th' ? 'ระดับเมือง & ความก้าวหน้า' : 'City Level & Milestones'}
            </span>
            <h3 className="text-lg md:text-xl font-black font-display leading-tight">
              {lang === 'th' ? `เมืองระดับ ${cityProgress.level} • Eco Pioneer` : `City Level ${cityProgress.level} • Eco Pioneer`}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'th' ? `ปลดล็อกความสำเร็จแล้ว ${achievements.filter(a => a.unlocked).length}/${achievements.length} รายการ` : `Unlocked ${achievements.filter(a => a.unlocked).length}/${achievements.length} Achievements`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-black font-mono text-sm shrink-0">
          <Coins className="w-4 h-4 text-amber-500" />
          <span>{userCredits} Eco Credits</span>
        </div>
      </div>

      {/* 2. Recently Earned Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{lang === 'th' ? 'ล่าสุดที่ได้รับ' : 'Recently Earned'}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recentlyEarned.map(item => (
            <div
              key={`recent-${item.id}`}
              className={`p-4 rounded-2xl border ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">🌟</span>
                <span className="text-[10px] font-bold text-slate-400">{item.unlockedAt || 'Today'}</span>
              </div>
              <h5 className="font-extrabold text-xs line-clamp-1">
                {lang === 'th' ? item.titleTh : item.titleEn}
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {lang === 'th' ? item.descTh : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Achievements Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'th' ? 'ความสำเร็จ' : 'Achievements'}</span>
          </h4>

          <div className="flex items-center gap-1 text-xs">
            {(['all', 'city', 'habits', 'learning'] as const).map(grp => (
              <button
                key={grp}
                onClick={() => setActiveGroup(grp)}
                className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                  activeGroup === grp
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {grp}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {displayedAchievements.map(ach => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                ach.unlocked
                  ? isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                  : 'bg-slate-100/40 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/60 opacity-60'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                ach.unlocked 
                  ? 'bg-emerald-500/10 text-emerald-500 font-bold' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}>
                {ach.unlocked ? <CheckCircle2 className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-extrabold text-xs md:text-sm truncate">
                    {lang === 'th' ? ach.titleTh : ach.titleEn}
                  </h5>
                  <span className="text-[10px] font-mono font-bold text-amber-500 shrink-0">
                    +{ach.creditReward} Cr
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {ach.unlocked 
                    ? (lang === 'th' ? ach.descTh : ach.descEn)
                    : (lang === 'th' ? `เงื่อนไข: ${ach.requirementTh}` : `Goal: ${ach.requirementEn}`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length > 6 && (
          <div className="text-center pt-2">
            <button
              onClick={() => setShowAllAchievements(!showAllAchievements)}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              {showAllAchievements 
                ? (lang === 'th' ? 'แสดงน้อยลง' : 'Show less') 
                : (lang === 'th' ? 'ดูความสำเร็จทั้งหมด' : 'View all achievements')}
            </button>
          </div>
        )}
      </div>

      {/* 4. City Unlocks Collection Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-sky-500" />
          <span>{lang === 'th' ? 'สิ่งที่ปลดล็อกสำหรับเมือง' : 'City Unlocks'}</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {allAssetIds.map(assetId => {
            const def = CITY_ASSET_DEFINITIONS[assetId];
            const isUnlocked = cityProgress.level >= def.unlockLevel;

            return (
              <div
                key={`unlock-${assetId}`}
                onClick={() => {
                  if (isUnlocked && onNavigateToBuild) {
                    onNavigateToBuild();
                  } else if (onBackToCity) {
                    onBackToCity();
                  }
                }}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400 cursor-pointer shadow-sm'
                    : 'bg-slate-100/40 dark:bg-slate-900/30 border-slate-200/40 dark:border-slate-800/40 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center mb-1.5">
                  {renderAssetMini(assetId)}
                </div>

                <h6 className="font-extrabold text-[11px] truncate">
                  {lang === 'th' ? def.nameTh : def.nameEn}
                </h6>

                <div className="mt-1">
                  {isUnlocked ? (
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center justify-center gap-0.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{lang === 'th' ? 'พร้อมสร้าง' : 'Ready'}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 flex items-center justify-center gap-0.5">
                      <Lock className="w-3 h-3" />
                      <span>Lv.{def.unlockLevel}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {onBackToCity && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => onBackToCity()}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'th' ? 'กลับไปที่เมืองของฉัน' : 'Back to My City'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
