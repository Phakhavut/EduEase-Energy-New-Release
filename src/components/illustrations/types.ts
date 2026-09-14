export type IllustrationCategory = 
  | 'dashboard'
  | 'ai-coach'
  | 'locations'
  | 'appliances'
  | 'budget-analytics'
  | 'learning-arcade'
  | 'sustainable-city'
  | 'empty-states';

export type IllustrationName =
  // Dashboard
  | 'energy-overview'
  | 'energy-saving'
  | 'electricity-bill'
  // AI Coach
  | 'ai-coach'
  | 'recommendation'
  // Locations
  | 'location-home'
  | 'location-dorm'
  | 'location-condo'
  | 'location-shop'
  | 'location-empty'
  // Appliances
  | 'appliance-ac'
  | 'appliance-fridge'
  | 'appliance-washing-machine'
  | 'appliance-tv'
  | 'appliance-computer'
  | 'appliance-fan'
  | 'appliance-lamp'
  | 'appliance-microwave'
  | 'appliance-kettle'
  | 'appliance-water-heater'
  | 'appliance-rice-cooker'
  | 'appliance-stove'
  | 'appliance-hair-dryer'
  | 'appliance-router'
  | 'appliance-phone-charger'
  | 'appliance-custom'
  // Budget & Analytics
  | 'budget-planning'
  | 'under-budget'
  | 'over-budget'
  | 'analytics-chart'
  | 'no-data'
  // Learning & Arcade
  | 'learning-path'
  | 'simulator'
  | 'quiz'
  | 'lesson-completed'
  | 'lesson-locked'
  // Sustainable City
  | 'city-overview'
  | 'sustainable-building'
  | 'tree-nature'
  | 'reward-token'
  | 'mission-completed'
  // Empty & System States
  | 'empty-appliances'
  | 'empty-locations'
  | 'empty-data'
  | 'empty-notifications'
  | 'empty-search'
  | 'disconnected'
  | 'loading-state'
  | 'error-state'
  | 'success-action';

export type IllustrationSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero' | number;

export interface IllustrationProps {
  name: IllustrationName;
  size?: IllustrationSize;
  isDarkMode?: boolean;
  className?: string;
  badge?: string | number;
  animated?: boolean;
  onClick?: () => void;
  alt?: string;
}

export interface IllustrationMeta {
  id: IllustrationName;
  category: IllustrationCategory;
  nameTh: string;
  nameEn: string;
  conceptTh: string;
  conceptEn: string;
  usageTh: string;
  usageEn: string;
}
