import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Coins, 
  Zap, 
  TrendingUp, 
  TreePine, 
  Swords, 
  Target,
  ArrowRight,
  ShieldCheck,
  Hammer
} from 'lucide-react';
import { 
  DISTRICT_PROJECTS, 
  DistrictProject, 
  CITY_ASSET_DEFINITIONS, 
  CityAssetId,
  calculateCityImpact 
} from '../../../data/cityJourneyData';
import { useGameState } from '../../../context/GameStateProvider';
import { CityAssetSprite } from './GreenCityVisualAssets';

export interface ProjectCardProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  variant?: 'dashboard' | 'compact' | 'full';
  onNavigateToCity?: (targetAssetId?: CityAssetId, plotId?: string) => void;
  onNavigateToMissions?: () => void;
  onNavigateToChallenges?: () => void;
  onNavigateToView?: (view: string) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  lang,
  isDarkMode,
  variant = 'dashboard',
  onNavigateToCity,
  onNavigateToMissions,
  onNavigateToChallenges,
  onNavigateToView,
  className = ''
}) => {
  const { cityProgress, guardianState } = useGameState();

  const cityImpact = calculateCityImpact(cityProgress.plots);
  const userCredits = guardianState.coins;

  // Determine current active district project
  const activeProjectIndex = 
    cityImpact.placedCount < 2 
      ? 0 
      : cityImpact.placedCount < 4 
      ? 1 
      : cityImpact.placedCount < 5 
      ? 2 
      : 3;

  const activeProject: DistrictProject = DISTRICT_PROJECTS[activeProjectIndex] || DISTRICT_PROJECTS[0];
  const targetAssetDef = CITY_ASSET_DEFINITIONS[activeProject.targetAssetId];
  
  // Check if target asset is already built anywhere in city
  const isTargetAssetBuilt = cityProgress.plots.some(p => p.assetId === activeProject.targetAssetId);
  const isDistrictCompleted = cityImpact.placedCount >= (activeProjectIndex + 1) * 2 - (activeProjectIndex === 2 ? 1 : 0);

  // Credit calculation
  const creditsNeeded = targetAssetDef?.costCredits || 80;
  const hasEnoughCredits = userCredits >= creditsNeeded;
  const creditProgress = Math.min(100, Math.round((userCredits / creditsNeeded) * 100));

  // Handlers
  const handleBuildAssetDirectly = () => {
    if (onNavigateToCity) {
      onNavigateToCity(activeProject.targetAssetId, activeProject.suggestedPlotId);
    } else if (onNavigateToView) {
      onNavigateToView('city');
    }
  };

  const handleGoToMission = () => {
    if (onNavigateToMissions) {
      onNavigateToMissions();
    } else if (onNavigateToView) {
      onNavigateToView('missions');
    }
  };

  const handleGoToChallenge = () => {
    if (onNavigateToChallenges) {
      onNavigateToChallenges();
    } else if (onNavigateToView) {
      onNavigateToView('challenges');
    }
  };

  // Compact Variant (for top of My City scene)
  if (variant === 'compact') {
    return (
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-sm ${
        isDarkMode 
          ? 'bg-emerald-950/20 border-emerald-800/40 text-white' 
          : 'bg-emerald-50/80 border-emerald-200 text-slate-800'
      } ${className}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {lang === 'th' ? `โครงการพัฒนาเขต ${activeProject.districtNum}` : `District Project ${activeProject.districtNum}`}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                +{activeProject.rewardCredits} Credits
              </span>
            </div>
            <h3 className="text-sm font-extrabold">
              {lang === 'th' ? activeProject.titleTh : activeProject.titleEn}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'th' ? activeProject.goalTh : activeProject.goalEn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleGoToChallenge}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Swords className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'th' ? 'แก้โจทย์ปัญหา' : 'Play Challenge'}</span>
          </button>
          <button
            onClick={handleGoToMission}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <Target className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? 'ทำภารกิจสะสมเครดิต' : 'Earn Credits'}</span>
          </button>
        </div>
      </div>
    );
  }

  // Primary Dashboard Variant (Rich, mission-linked goal & asset showcase)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 md:p-7 rounded-[2.5rem] border shadow-xl relative overflow-hidden transition-all ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-500/25 text-white'
          : 'bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/40 border-emerald-200/80 text-slate-800 shadow-emerald-500/5'
      } ${className}`}
    >
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* 1. Header & Project Milestone Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {lang === 'th' ? `โครงการพัฒนาเขต ${activeProject.districtNum} / 4` : `District Project ${activeProject.districtNum} of 4`}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                ⭐ {lang === 'th' ? `รางวัล +${activeProject.rewardCredits} Credits` : `Reward +${activeProject.rewardCredits} Cr`}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black font-display tracking-tight text-slate-900 dark:text-white mt-0.5">
              {lang === 'th' ? activeProject.titleTh : activeProject.titleEn}
            </h3>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-xs font-extrabold shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>
            {isDistrictCompleted 
              ? (lang === 'th' ? 'สำเร็จเรียบร้อย ✓' : 'District Complete ✓')
              : (lang === 'th' ? 'เป้าหมายที่กำลังดำเนินการ' : 'Active District Goal')}
          </span>
        </div>
      </div>

      {/* 2. Main Narrative & Meaningful Mission-Linked Goal */}
      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 relative z-10 max-w-2xl">
        {lang === 'th' ? activeProject.subtitleTh : activeProject.subtitleEn}
      </p>

      {/* 3. Target Buildable Asset Card (Replaces Generic Purchase Buttons) */}
      <div className={`p-4 md:p-5 rounded-2xl border transition-all mb-5 relative z-10 ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800/90 hover:border-emerald-500/40'
          : 'bg-white/90 border-slate-200/80 hover:border-emerald-300 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Asset Vector Avatar & Impact Details */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center p-1.5 shrink-0 shadow-md">
              <svg viewBox="0 0 200 160" className="w-full h-full">
                <CityAssetSprite assetId={activeProject.targetAssetId} isDarkMode={isDarkMode} />
              </svg>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {lang === 'th' ? 'สิ่งก่อสร้างเป้าหมาย' : 'Target Asset Goal'}
                </span>
                <span className="text-xs font-bold text-slate-400">•</span>
                <span className="text-xs font-bold text-amber-500">
                  {targetAssetDef?.costCredits} Eco Credits
                </span>
              </div>

              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                {lang === 'th' ? targetAssetDef?.nameTh : targetAssetDef?.nameEn}
              </h4>

              {/* Tangible Impact Tags */}
              <div className="flex items-center gap-2 flex-wrap text-[11px] font-bold">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" />
                  +{targetAssetDef?.savingBahtMonth} ฿/{lang === 'th' ? 'เดือน' : 'mo'}
                </span>
                {targetAssetDef?.cleanEnergyKwh ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                    <Zap className="w-3 h-3" />
                    +{targetAssetDef.cleanEnergyKwh} kWh
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <TreePine className="w-3 h-3" />
                  +{targetAssetDef?.greenScoreBonus} pts
                </span>
              </div>
            </div>
          </div>

          {/* Goal Action Button */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            {hasEnoughCredits ? (
              <button
                onClick={handleBuildAssetDirectly}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Hammer className="w-4 h-4" />
                <span>
                  {lang === 'th' ? `สร้าง ${targetAssetDef?.nameTh}` : `Build ${targetAssetDef?.nameEn}`}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGoToMission}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Coins className="w-4 h-4" />
                <span>
                  {lang === 'th' ? `รับอีก ${creditsNeeded - userCredits} Credits เพื่อสร้าง` : `Need ${creditsNeeded - userCredits} more Cr to Build`}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            
            <span className="text-[11px] text-slate-400 font-bold text-center sm:text-right">
              {hasEnoughCredits 
                ? (lang === 'th' ? '✓ เครดิตพร้อมสร้างทันที' : '✓ Ready to construct now')
                : (lang === 'th' ? 'ทำภารกิจหรือด่านท้าทายเพื่อรับเครดิต' : 'Complete habits to earn credits')}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Eco Credits Readiness Bar & Direct Mission Links */}
      <div className="space-y-2 relative z-10">
        <div className="flex justify-between items-center text-xs font-extrabold">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'th' ? 'ความพร้อมของ Eco Credits:' : 'Eco Credits Progress:'}</span>
            <span className="font-mono text-amber-600 dark:text-amber-400">
              {userCredits} / {creditsNeeded} Credits
            </span>
          </div>
          <span className={`text-[11px] font-black ${hasEnoughCredits ? 'text-emerald-500' : 'text-amber-500'}`}>
            {creditProgress}% {hasEnoughCredits ? (lang === 'th' ? '• พร้อมสร้าง!' : '• Ready!') : ''}
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${creditProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              hasEnoughCredits
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : 'bg-gradient-to-r from-amber-500 to-amber-400'
            }`}
          />
        </div>

        {/* Sub Links to Missions & Challenges */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleGoToMission}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 font-bold transition-colors cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-emerald-500" />
              <span>{lang === 'th' ? '🎯 ภารกิจลดค่าไฟประจำวัน' : '🎯 Daily Habits'}</span>
            </button>

            <span className="text-slate-400">•</span>

            <button
              onClick={handleGoToChallenge}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 font-bold transition-colors cursor-pointer"
            >
              <Swords className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'th' ? '⚔️ แก้โจทย์ด่านท้าทาย' : '⚔️ Power Challenge'}</span>
            </button>
          </div>

          <button
            onClick={() => onNavigateToView ? onNavigateToView('city') : onNavigateToCity?.()}
            className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-extrabold cursor-pointer"
          >
            <span>{lang === 'th' ? 'เปิดแผนที่เมือง' : 'Explore City Map'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
