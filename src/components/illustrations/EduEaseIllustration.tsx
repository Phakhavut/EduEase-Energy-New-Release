import React, { useId } from 'react';
import { motion } from 'motion/react';
import { IllustrationProps, IllustrationSize } from './types';

// Dashboard SVGs
import { EnergyOverviewSvg, EnergySavingSvg, ElectricityBillSvg } from './svg/DashboardIllustrations';
// AI Coach SVGs
import { AiCoachSvg, RecommendationSvg } from './svg/AiCoachIllustrations';
// Location SVGs
import { LocationHomeSvg, LocationDormSvg, LocationCondoSvg, LocationShopSvg, LocationEmptySvg } from './svg/LocationIllustrations';
// Appliance SVGs
import {
  ApplianceAcSvg,
  ApplianceFridgeSvg,
  ApplianceWashingMachineSvg,
  ApplianceTvSvg,
  ApplianceComputerSvg,
  ApplianceFanSvg,
  ApplianceLampSvg,
  ApplianceMicrowaveSvg,
  ApplianceKettleSvg,
  ApplianceWaterHeaterSvg,
  ApplianceRiceCookerSvg,
  ApplianceStoveSvg,
  ApplianceHairDryerSvg,
  ApplianceRouterSvg,
  AppliancePhoneChargerSvg,
  ApplianceCustomSvg,
} from './svg/ApplianceIllustrations';
// Budget & Analytics SVGs
import {
  BudgetPlanningSvg,
  UnderBudgetSvg,
  OverBudgetSvg,
  AnalyticsChartSvg,
  NoDataSvg,
} from './svg/BudgetAnalyticsIllustrations';
// Learning SVGs
import {
  LearningPathSvg,
  SimulatorSvg,
  QuizSvg,
  LessonCompletedSvg,
  LessonLockedSvg,
} from './svg/LearningIllustrations';
// Sustainable City SVGs
import {
  CityOverviewSvg,
  SustainableBuildingSvg,
  TreeNatureSvg,
  RewardTokenSvg,
  MissionCompletedSvg,
} from './svg/SustainableCityIllustrations';
// System State SVGs
import {
  EmptyAppliancesSvg,
  EmptyLocationsSvg,
  EmptyDataSvg,
  EmptyNotificationsSvg,
  EmptySearchSvg,
  DisconnectedSvg,
  LoadingStateSvg,
  ErrorStateSvg,
  SuccessActionSvg,
} from './svg/SystemStateIllustrations';

const getSizeInPx = (size: IllustrationSize): number => {
  if (typeof size === 'number') return size;
  switch (size) {
    case 'xs': return 28;
    case 'sm': return 40;
    case 'md': return 64;
    case 'lg': return 96;
    case 'xl': return 128;
    case '2xl': return 160;
    case 'hero': return 220;
    default: return 64;
  }
};

export const EduEaseIllustration: React.FC<IllustrationProps> = ({
  name,
  size = 'md',
  isDarkMode = false,
  className = '',
  badge,
  animated = true,
  onClick,
  alt,
}) => {
  const reactId = useId().replace(/:/g, '_');
  const dim = getSizeInPx(size);

  const renderSvg = () => {
    const props = { isDarkMode, gradId: `${name}_${reactId}` };
    switch (name) {
      // Dashboard
      case 'energy-overview': return <EnergyOverviewSvg {...props} />;
      case 'energy-saving': return <EnergySavingSvg {...props} />;
      case 'electricity-bill': return <ElectricityBillSvg {...props} />;

      // AI Coach
      case 'ai-coach': return <AiCoachSvg {...props} />;
      case 'recommendation': return <RecommendationSvg {...props} />;

      // Locations
      case 'location-home': return <LocationHomeSvg {...props} />;
      case 'location-dorm': return <LocationDormSvg {...props} />;
      case 'location-condo': return <LocationCondoSvg {...props} />;
      case 'location-shop': return <LocationShopSvg {...props} />;
      case 'location-empty': return <LocationEmptySvg {...props} />;

      // Appliances
      case 'appliance-ac': return <ApplianceAcSvg {...props} />;
      case 'appliance-fridge': return <ApplianceFridgeSvg {...props} />;
      case 'appliance-washing-machine': return <ApplianceWashingMachineSvg {...props} />;
      case 'appliance-tv': return <ApplianceTvSvg {...props} />;
      case 'appliance-computer': return <ApplianceComputerSvg {...props} />;
      case 'appliance-fan': return <ApplianceFanSvg {...props} />;
      case 'appliance-lamp': return <ApplianceLampSvg {...props} />;
      case 'appliance-microwave': return <ApplianceMicrowaveSvg {...props} />;
      case 'appliance-kettle': return <ApplianceKettleSvg {...props} />;
      case 'appliance-water-heater': return <ApplianceWaterHeaterSvg {...props} />;
      case 'appliance-rice-cooker': return <ApplianceRiceCookerSvg {...props} />;
      case 'appliance-stove': return <ApplianceStoveSvg {...props} />;
      case 'appliance-hair-dryer': return <ApplianceHairDryerSvg {...props} />;
      case 'appliance-router': return <ApplianceRouterSvg {...props} />;
      case 'appliance-phone-charger': return <AppliancePhoneChargerSvg {...props} />;
      case 'appliance-custom': return <ApplianceCustomSvg {...props} />;

      // Budget & Analytics
      case 'budget-planning': return <BudgetPlanningSvg {...props} />;
      case 'under-budget': return <UnderBudgetSvg {...props} />;
      case 'over-budget': return <OverBudgetSvg {...props} />;
      case 'analytics-chart': return <AnalyticsChartSvg {...props} />;
      case 'no-data': return <NoDataSvg {...props} />;

      // Learning & Arcade
      case 'learning-path': return <LearningPathSvg {...props} />;
      case 'simulator': return <SimulatorSvg {...props} />;
      case 'quiz': return <QuizSvg {...props} />;
      case 'lesson-completed': return <LessonCompletedSvg {...props} />;
      case 'lesson-locked': return <LessonLockedSvg {...props} />;

      // Sustainable City
      case 'city-overview': return <CityOverviewSvg {...props} />;
      case 'sustainable-building': return <SustainableBuildingSvg {...props} />;
      case 'tree-nature': return <TreeNatureSvg {...props} />;
      case 'reward-token': return <RewardTokenSvg {...props} />;
      case 'mission-completed': return <MissionCompletedSvg {...props} />;

      // Empty & System States
      case 'empty-appliances': return <EmptyAppliancesSvg {...props} />;
      case 'empty-locations': return <EmptyLocationsSvg {...props} />;
      case 'empty-data': return <EmptyDataSvg {...props} />;
      case 'empty-notifications': return <EmptyNotificationsSvg {...props} />;
      case 'empty-search': return <EmptySearchSvg {...props} />;
      case 'disconnected': return <DisconnectedSvg {...props} />;
      case 'loading-state': return <LoadingStateSvg {...props} />;
      case 'error-state': return <ErrorStateSvg {...props} />;
      case 'success-action': return <SuccessActionSvg {...props} />;

      default:
        return <EnergyOverviewSvg {...props} />;
    }
  };

  const content = (
    <div
      className={`relative inline-flex items-center justify-center select-none flex-shrink-0 ${className}`}
      style={{ width: `${dim}px`, height: `${dim}px` }}
      role="img"
      aria-label={alt || name}
      onClick={onClick}
    >
      {renderSvg()}

      {badge !== undefined && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[11px] font-bold text-slate-900 bg-[#1EC1CB] border-2 border-white dark:border-[#1C1C28] rounded-full shadow-sm">
          {badge}
        </span>
      )}
    </div>
  );

  if (animated && onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="inline-flex cursor-pointer"
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
