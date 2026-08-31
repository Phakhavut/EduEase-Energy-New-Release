import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Swords, 
  Target, 
  Award, 
  Coins, 
  Zap, 
  TreePine, 
  ChevronRight, 
  Sparkles,
  Info,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useGameState } from '../../context/GameStateProvider';
import { 
  CityAssetId, 
  calculateCityImpact, 
  CITY_ASSET_DEFINITIONS,
  DISTRICT_PROJECTS,
  DistrictProject,
  PLOT_DEFINITIONS
} from '../../data/cityJourneyData';
import { CityScene, PlacementPhase } from './city/CityScene';
import { CityBuildTray } from './city/CityBuildTray';
import { CityJourneyIntro } from './city/CityJourneyIntro';
import { PowerChallenge } from './city/PowerChallenge';
import { JourneyMissions } from './city/JourneyMissions';
import { JourneyRewards } from './city/JourneyRewards';
import { ProjectCard } from './city/ProjectCard';
import { VoltieGuideIllustration } from './city/GreenCityVisualAssets';
import { CityToastNotification, ToastItem, ToastType } from './city/CityToastNotification';
import { useConstruction } from '../../hooks/useConstruction';

export type JourneySection = 'city' | 'challenges' | 'missions' | 'rewards';

export interface GreenCityJourneyProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  initialTab?: JourneySection | 'play' | string;
  onNavigateToTab?: (page: string) => void;
  onNavigateToView?: (view: string) => void;
}

export const GreenCityJourney: React.FC<GreenCityJourneyProps> = ({
  lang,
  isDarkMode,
  initialTab = 'city',
  onNavigateToTab,
  onNavigateToView
}) => {
  const { 
    cityProgress, 
    guardianState, 
    buildOnPlot, 
    moveCityAsset, 
    markCityIntroSeen, 
    earnEcoCredits 
  } = useGameState();

  // Navigation Destination
  const [activeSection, setActiveSection] = useState<JourneySection>(() => {
    if (initialTab === 'play') return 'challenges';
    if (initialTab === 'missions' || initialTab === 'rewards' || initialTab === 'challenges' || initialTab === 'city') {
      return initialTab as JourneySection;
    }
    return 'city';
  });

  // Toast Notification System (Non-blocking, accessible, with action deep-links)
  const [toast, setToast] = useState<ToastItem | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((
    item: ToastItem | string, 
    type: ToastType = 'info', 
    reason?: string, 
    action?: ToastItem['action']
  ) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    
    if (typeof item === 'string') {
      setToast({
        message: item,
        type,
        reason,
        action
      });
    } else {
      setToast(item);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 5500);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(null);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Construction State Machine Hook
  const {
    placementPhase,
    selectedPlotId,
    previewAssetId,
    constructingPlotId,
    relocateSourcePlotId,
    isConstructing,
    constructionProgress,
    selectPlot,
    selectAssetForPreview,
    startBuildFlow,
    confirmBuild,
    cancelPlacement,
    openRelocate,
    cancelRelocate
  } = useConstruction({
    plots: cityProgress.plots,
    userCredits: guardianState.coins,
    cityLevel: cityProgress.level,
    buildOnPlot,
    moveCityAsset,
    lang,
    onSuccess: (assetDef) => {
      showToast({
        message: lang === 'th' 
          ? `สร้าง ${assetDef.nameTh} สำเร็จ! เมืองได้รับ +${assetDef.savingBahtMonth} ฿/เดือน` 
          : `Constructed ${assetDef.nameEn}! City gained +${assetDef.savingBahtMonth} ฿/mo`,
        type: 'success',
        title: lang === 'th' ? '🎉 ก่อสร้างสำเร็จ!' : '🎉 Construction Complete!'
      });
    },
    onError: (message, reason) => {
      if (reason === 'not-enough-credits') {
        showToast({
          message,
          type: 'error',
          title: lang === 'th' ? '⚡ Eco Credits ไม่เพียงพอ' : '⚡ Insufficient Eco Credits',
          reason,
          action: {
            label: lang === 'th' ? 'ทำภารกิจรับเครดิต' : 'Go to Missions',
            icon: 'missions',
            onClick: () => setActiveSection('missions')
          }
        });
      } else if (reason === 'locked-plot' || reason === 'locked-asset') {
        showToast({
          message,
          type: 'warning',
          title: lang === 'th' ? '🔒 ยังไม่ปลดล็อก' : '🔒 Locked Feature',
          reason,
          action: {
            label: lang === 'th' ? 'เล่นเกมลดใช้ไฟ' : 'Play Challenges',
            icon: 'challenges',
            onClick: () => setActiveSection('challenges')
          }
        });
      } else {
        showToast({
          message,
          type: 'error',
          reason
        });
      }
    }
  });

  const handleNavigate = (page: string) => {
    if (onNavigateToView) onNavigateToView(page);
    else if (onNavigateToTab) onNavigateToTab(page);
  };

  // Current District Project
  const cityImpact = calculateCityImpact(cityProgress.plots);
  const activeProject: DistrictProject = 
    cityImpact.placedCount < 2 
      ? DISTRICT_PROJECTS[0]
      : cityImpact.placedCount < 4 
      ? DISTRICT_PROJECTS[1]
      : cityImpact.placedCount < 5 
      ? DISTRICT_PROJECTS[2] 
      : DISTRICT_PROJECTS[3];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12">
      {/* 1. ONBOARDING INTRO MODAL */}
      {!cityProgress.introSeen && (
        <CityJourneyIntro
          lang={lang}
          isDarkMode={isDarkMode}
          onComplete={markCityIntroSeen}
        />
      )}

      {/* 2. ACCESSIBLE TOAST NOTIFICATION COMPONENT */}
      <CityToastNotification
        toast={toast}
        onDismiss={dismissToast}
        lang={lang}
      />

      {/* 3. MASTER HEADER & CURRENCY STATUS */}
      <div className={`p-6 rounded-[2rem] border shadow-xl relative overflow-hidden ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-800 text-white' 
          : 'bg-white/80 border-emerald-100 text-slate-800'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                {lang === 'th' ? `ระดับเมือง Level ${cityProgress.level}` : `City Level ${cityProgress.level}`}
              </span>
              <span className="text-xs text-slate-400 font-bold">•</span>
              <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400">
                {lang === 'th' ? 'สุขภาพเมืองสีเขียว 100%' : 'Green City Health 100%'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
              {lang === 'th' ? 'เมืองสีเขียว & ภารกิจพลังงาน' : 'Green City Journey & Missions'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              {lang === 'th'
                ? 'เปลี่ยนพฤติกรรมประหยัดพลังงานในชีวิตจริง ให้เป็น Eco Credits เพื่อสร้างเมืองคาร์บอนต่ำที่ยั่งยืน'
                : 'Turn everyday energy-saving actions into Eco Credits to build a thriving low-carbon metropolis.'}
            </p>
          </div>

          {/* KPI Balance Group */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Eco Credits */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-amber-500 mb-0.5">
                <Coins className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {lang === 'th' ? 'เครดิตที่มี' : 'Eco Credits'}
                </span>
              </div>
              <span className="text-lg font-black font-display text-amber-600 dark:text-amber-400">
                {guardianState.coins.toLocaleString()}
              </span>
            </div>

            {/* Clean Energy Output */}
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-emerald-500 mb-0.5">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {lang === 'th' ? 'ไฟสะอาด' : 'Clean Power'}
                </span>
              </div>
              <span className="text-lg font-black font-display text-emerald-600 dark:text-emerald-400">
                +{cityImpact.totalCleanEnergyKwh} <span className="text-xs font-normal">kWh/ด.</span>
              </span>
            </div>

            {/* Monthly Savings */}
            <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-teal-500 mb-0.5">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {lang === 'th' ? 'ประหยัดรวม' : 'Monthly Save'}
                </span>
              </div>
              <span className="text-lg font-black font-display text-teal-600 dark:text-teal-400">
                +{cityImpact.totalSavingBaht} <span className="text-xs font-normal">฿/ด.</span>
              </span>
            </div>

            {/* Placed Assets */}
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-blue-500 mb-0.5">
                <Building2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {lang === 'th' ? 'สิ่งก่อสร้าง' : 'Structures'}
                </span>
              </div>
              <span className="text-lg font-black font-display text-blue-600 dark:text-blue-400">
                {cityImpact.placedCount} / 6
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOUR TOP-LEVEL NAVIGATION DESTINATIONS (2x2 on mobile, single bar on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
        <button
          onClick={() => {
            setActiveSection('city');
            cancelPlacement();
          }}
          className={`py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSection === 'city'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'hover:bg-white/60 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{lang === 'th' ? 'เมืองของฉัน' : 'My City'}</span>
        </button>

        <button
          onClick={() => setActiveSection('challenges')}
          className={`py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSection === 'challenges'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'hover:bg-white/60 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Swords className="w-4 h-4" />
          <span>{lang === 'th' ? 'ด่านท้าทายพลังงาน' : 'Power Challenges'}</span>
        </button>

        <button
          onClick={() => setActiveSection('missions')}
          className={`py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSection === 'missions'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'hover:bg-white/60 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>{lang === 'th' ? 'ภารกิจลดค่าไฟ' : 'Missions'}</span>
        </button>

        <button
          onClick={() => setActiveSection('rewards')}
          className={`py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSection === 'rewards'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'hover:bg-white/60 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{lang === 'th' ? 'รางวัลความสำเร็จ' : 'Rewards'}</span>
        </button>
      </div>

      {/* 5. CURRENT DISTRICT PROJECT CARD (Only shown on 'city' tab) */}
      {activeSection === 'city' && (
        <ProjectCard
          lang={lang}
          isDarkMode={isDarkMode}
          variant="compact"
          onNavigateToChallenges={() => setActiveSection('challenges')}
          onNavigateToMissions={() => setActiveSection('missions')}
          onNavigateToCity={(targetAssetId, plotId) => {
            if (targetAssetId) {
              startBuildFlow(targetAssetId, plotId);
            }
          }}
        />
      )}

      {/* 6. MAIN CONTENT SECTION SWITCHER */}
      {activeSection === 'city' && (
        <div className="space-y-6">
          {/* Main SVG Scene */}
          <CityScene
            plots={cityProgress.plots}
            placementPhase={placementPhase}
            selectedPlotId={selectedPlotId}
            previewAssetId={previewAssetId}
            constructingPlotId={constructingPlotId}
            relocateSourcePlotId={relocateSourcePlotId}
            onSelectPlot={selectPlot}
            onOpenRelocate={openRelocate}
            lang={lang}
            isDarkMode={isDarkMode}
            cityLevel={cityProgress.level}
            isConstructing={isConstructing}
            constructionProgress={constructionProgress}
          />

          {/* Interactive Build Tray & Confirmation Drawer */}
          <CityBuildTray
            placementPhase={placementPhase}
            selectedPlotId={selectedPlotId}
            previewAssetId={previewAssetId}
            relocateSourcePlotId={relocateSourcePlotId}
            plots={cityProgress.plots}
            userCredits={guardianState.coins}
            cityLevel={cityProgress.level}
            onSelectAssetForPreview={selectAssetForPreview}
            onConfirmBuild={confirmBuild}
            onCancelPlacement={cancelPlacement}
            onCancelRelocate={cancelRelocate}
            onStartBuildFlow={startBuildFlow}
            onInvalidAction={(msg, rsn) => {
              if (rsn === 'not-enough-credits') {
                showToast({
                  message: msg,
                  type: 'error',
                  title: lang === 'th' ? '⚡ Eco Credits ไม่เพียงพอ' : '⚡ Insufficient Eco Credits',
                  reason: rsn,
                  action: {
                    label: lang === 'th' ? 'ทำภารกิจรับเครดิต' : 'Go to Missions',
                    icon: 'missions',
                    onClick: () => setActiveSection('missions')
                  }
                });
              } else if (rsn === 'locked-plot' || rsn === 'locked-asset') {
                showToast({
                  message: msg,
                  type: 'warning',
                  title: lang === 'th' ? '🔒 ยังไม่ปลดล็อก' : '🔒 Locked Feature',
                  reason: rsn,
                  action: {
                    label: lang === 'th' ? 'เล่นเกมลดใช้ไฟ' : 'Play Challenges',
                    icon: 'challenges',
                    onClick: () => setActiveSection('challenges')
                  }
                });
              } else {
                showToast({
                  message: msg,
                  type: 'warning',
                  reason: rsn
                });
              }
            }}
            lang={lang}
            isDarkMode={isDarkMode}
          />
        </div>
      )}

      {activeSection === 'challenges' && (
        <PowerChallenge
          lang={lang}
          isDarkMode={isDarkMode}
          onCompleteChallenge={(reward) => {
            earnEcoCredits(reward);
            showToast(
              lang === 'th' 
                ? `🎉 ผ่านด่านสำเร็จ! ได้รับ +${reward} Eco Credits` 
                : `🎉 Challenge complete! Earned +${reward} Eco Credits`, 
              'success'
            );
          }}
          onBackToCity={() => setActiveSection('city')}
        />
      )}

      {activeSection === 'missions' && (
        <JourneyMissions
          lang={lang}
          isDarkMode={isDarkMode}
          onClaimReward={(mission) => {
            earnEcoCredits(mission.creditReward);
            showToast(
              lang === 'th' 
                ? `🎁 รับรางวัล ${mission.creditReward} Eco Credits สำเร็จ!` 
                : `🎁 Claimed ${mission.creditReward} Eco Credits!`, 
              'success'
            );
          }}
          onNavigateToView={onNavigateToView}
          onBackToCity={() => setActiveSection('city')}
        />
      )}

      {activeSection === 'rewards' && (
        <JourneyRewards
          lang={lang}
          isDarkMode={isDarkMode}
          userCredits={guardianState.coins}
          onBackToCity={() => setActiveSection('city')}
        />
      )}
    </div>
  );
};
