import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  CheckCircle2, 
  Clock, 
  Coins, 
  ChevronRight, 
  ExternalLink, 
  Sparkles,
  Thermometer,
  Bot,
  Scale,
  Wallet,
  Plug,
  Building2
} from 'lucide-react';
import { JourneyMission, INITIAL_JOURNEY_MISSIONS } from '../../../data/cityJourneyData';

interface JourneyMissionsProps {
  missions?: JourneyMission[];
  onClaimReward?: (mission: JourneyMission) => void;
  onClaimMission?: (missionId: string) => void;
  onNavigateToView?: (view: string) => void;
  onNavigateToDeepLink?: (page: string) => void;
  onBackToCity?: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const JourneyMissions: React.FC<JourneyMissionsProps> = ({
  missions: propMissions,
  onClaimReward,
  onClaimMission,
  onNavigateToView,
  onNavigateToDeepLink,
  onBackToCity,
  lang,
  isDarkMode
}) => {
  const [activeCategory, setActiveCategory] = useState<'today' | 'weekly' | 'completed'>('today');
  const [showAllToday, setShowAllToday] = useState<boolean>(false);
  const [localMissions, setLocalMissions] = useState<JourneyMission[]>(propMissions || INITIAL_JOURNEY_MISSIONS);

  const missions = propMissions || localMissions;

  const handleClaim = (mission: JourneyMission) => {
    if (onClaimReward) {
      onClaimReward(mission);
    }
    if (onClaimMission) {
      onClaimMission(mission.id);
    }
    setLocalMissions(prev => prev.map(m => m.id === mission.id ? { ...m, status: 'claimed' } : m));
  };

  const handleNavigate = (page: string) => {
    if (onNavigateToView) {
      onNavigateToView(page);
    } else if (onNavigateToDeepLink) {
      onNavigateToDeepLink(page);
    }
  };

  const filteredMissions = missions.filter(m => m.category === activeCategory);
  const displayMissions = activeCategory === 'today' && !showAllToday
    ? filteredMissions.slice(0, 3)
    : filteredMissions;

  const renderMissionIcon = (iconName: JourneyMission['iconName']) => {
    switch (iconName) {
      case 'thermometer':
        return <Thermometer className="w-5 h-5 text-sky-500" />;
      case 'bot':
        return <Bot className="w-5 h-5 text-emerald-500" />;
      case 'scale':
        return <Scale className="w-5 h-5 text-purple-500" />;
      case 'wallet':
        return <Wallet className="w-5 h-5 text-amber-500" />;
      case 'plug':
        return <Plug className="w-5 h-5 text-teal-500" />;
      default:
        return <Zap className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Category Tabs: Today / This week / Completed */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
        <button
          onClick={() => setActiveCategory('today')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeCategory === 'today'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {lang === 'th' ? 'วันนี้' : 'Today'}
        </button>

        <button
          onClick={() => setActiveCategory('weekly')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeCategory === 'weekly'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {lang === 'th' ? 'สัปดาห์นี้' : 'This week'}
        </button>

        <button
          onClick={() => setActiveCategory('completed')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeCategory === 'completed'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {lang === 'th' ? 'เสร็จแล้ว' : 'Completed'}
        </button>
      </div>

      {/* Mission Cards List */}
      <div className="space-y-4">
        {displayMissions.length === 0 ? (
          <div className="p-8 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'ไม่มีภารกิจในหมวดนี้' : 'No missions in this category'}
            </p>
          </div>
        ) : (
          displayMissions.map((mission) => {
            const isReadyToClaim = mission.status === 'ready_to_claim';
            const isClaimed = mission.status === 'claimed';

            return (
              <div
                key={mission.id}
                className={`p-5 md:p-6 rounded-[2rem] border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isDarkMode 
                    ? 'bg-slate-900/90 border-slate-800 text-white' 
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    {renderMissionIcon(mission.iconName)}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm md:text-base leading-tight">
                        {lang === 'th' ? mission.titleTh : mission.titleEn}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'th' ? mission.instructionTh : mission.instructionEn}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{lang === 'th' ? mission.expectedBenefitTh : mission.expectedBenefitEn}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono font-black text-xs">
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>+{mission.creditReward}</span>
                  </div>

                  {isClaimed ? (
                    <span className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{lang === 'th' ? 'รับแล้ว' : 'Claimed'}</span>
                    </span>
                  ) : isReadyToClaim ? (
                    <button
                      onClick={() => handleClaim(mission)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs shadow-md shadow-emerald-500/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === 'th' ? 'กดรับรางวัล' : 'Claim Reward'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavigate(mission.deepLinkPage)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{lang === 'th' ? 'ไปทำภารกิจ' : 'Start Action'}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Show More toggle for Today category if more than 3 */}
        {activeCategory === 'today' && filteredMissions.length > 3 && (
          <div className="text-center pt-2">
            <button
              onClick={() => setShowAllToday(!showAllToday)}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              {showAllToday 
                ? (lang === 'th' ? 'แสดงน้อยลง' : 'Show less') 
                : (lang === 'th' ? 'ดูเพิ่มเติม' : 'Show more')}
            </button>
          </div>
        )}
      </div>

      {onBackToCity && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onBackToCity}
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
