export interface House {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  description: string;
}

export type AppPage = 
  | 'home' 
  | 'ai-coach' 
  | 'locations'
  | 'appliances' 
  | 'budget' 
  | 'analytics' 
  | 'learning'
  | 'achievements' 
  | 'profile' 
  | 'settings'
  | 'compare'
  | 'score';

export type InfoDetailMode = 'simple' | 'balanced' | 'detailed';

export type DataSourceType = 'user' | 'calculated' | 'measured' | 'predicted' | 'demo';

export interface LocationItem {
  id: string;
  name: string;
  nameEn: string;
  type: 'home' | 'dorm' | 'provincial' | 'shop' | 'office';
  province: string;
  residents: number;
  billingCycleDay: number;
  budget: number;
  estimatedBill: number;
  isConnected: boolean; // ESP32 / Smart Plug
  lastUpdated: string;
  memberCount: number;
  icon: string;
  isCurrent?: boolean;
}

export interface Mission {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  category: 'daily' | 'weekly' | 'monthly';
  icon: string;
  progress: number;
  maxProgress: number;
}

export interface Badge {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  unlocked: boolean;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  category: string;
}

export interface CharacterSkin {
  id: string;
  name: string;
  nameEn: string;
  avatarUrl: string;
  unlocked: boolean;
  priceCoins: number;
  description: string;
  descriptionEn: string;
  icon: string;
}

export interface Appliance {
  id: number;
  name: string;
  watt: number;
  hours: number;
  category: string;
  room?: string;
  status: 'active' | 'standby' | 'off';
  healthScore: number;
  efficiencyTag: 'A+++ Eco' | 'Good' | 'Average' | 'Heavy Drinker';
  todayCost: number;
  monthlyCost: number;
  icon: string;
  imageUrl?: string;
  aiTip: string;
  aiTipEn: string;
  pf: number;
  logs: { date: string; action: string; status: 'resolved' | 'pending' }[];
  dataSource?: DataSourceType;
  isEsp32Connected?: boolean;
}

export interface AICoachRecommendation {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  moneySavedMonth: number;
  difficulty: 'Easy' | 'Medium' | 'Quick';
  timeRequired: string;
  confidence: number;
  applied: boolean;
  actionType: 'ac_eco' | 'standby_cut' | 'tou_shift' | 'pf_tune';
  explanationTh?: string;
  technicalDetailsTh?: string;
}

export interface GlossaryTerm {
  id: string;
  termTh: string;
  termEn: string;
  category: 'unit' | 'bill' | 'equipment' | 'system' | 'advanced';
  definitionTh: string;
  definitionEn: string;
  exampleTh: string;
  exampleEn: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  relatedPage?: AppPage;
}

export interface Lesson {
  id: string;
  pathId: string;
  titleTh: string;
  titleEn: string;
  readTime: string;
  xpReward: number;
  contentTh: string;
  contentEn: string;
  questionTh: string;
  optionsTh: string[];
  correctIndex: number;
  explanationTh: string;
  completed?: boolean;
}

export interface LearningPath {
  id: string;
  titleTh: string;
  titleEn: string;
  descTh: string;
  icon: string;
  lessons: Lesson[];
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  priority: 'info' | 'warning' | 'urgent';
  timestamp: string;
  read: boolean;
  actionPage?: AppPage;
}

export interface DiaryEntry {
  id: string;
  date: string;
  note: string;
  tag: 'home_all_day' | 'guests' | 'ac_heavy' | 'new_appliance' | 'travel';
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  level: number;
  xp: number;
  streak: number;
  avatar: string;
  isUser: boolean;
  isAnonymous?: boolean;
}

export interface ComparisonItem {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  watt: number;
  hoursPerDay: number;
  quantity: number;
  efficiencyScore: number; // 0 - 100
  powerFactor: number;
  efficiencyTag: 'A+++ Eco' | 'Inverter' | 'Standard' | 'Heavy';
  icon: string;
  imageUrl?: string;
}

export interface ComparisonAnalysis {
  mostExpensiveId: string;
  mostSavingId: string;
  bestChoiceId: string;
  monthlyCostDiffThb: number;
  aiConclusionTh: string;
  aiConclusionEn: string;
  conceptTaughtTh: string;
  conceptTaughtEn: string;
  relatedLessonId?: string;
  relatedGlossaryId?: string;
}

export interface EnergySavingScoreBreakdown {
  overallScore: number; // 0 - 100
  habitScore: number;
  budgetScore: number;
  applianceEfficiencyScore: number;
  learningScore: number;
  actionScore: number;
  levelBadge: 'Beginner Saver' | 'Improving Saver' | 'Smart Saver' | 'Energy Master';
  levelBadgeTh: string;
  changeFromLastPeriod: number; // e.g. +5 pts
  whatImprovedTh: string[];
  whatImprovedEn: string[];
  whatCanImproveTh: string[];
  whatCanImproveEn: string[];
  suggestedNextActionTh: string;
  suggestedNextActionEn: string;
  estimatedMoneyImpactThb: number;
  relatedLessonId?: string;
}

