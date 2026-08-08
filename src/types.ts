export interface House {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  description: string;
}

export type AppPage = 
  | 'home' 
  | 'insights'
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
  | 'score'
  | 'trust-center';

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

export type DynamicMissionCategory = 
  | 'daily' 
  | 'weekly' 
  | 'monthly' 
  | 'learning' 
  | 'budget' 
  | 'appliance' 
  | 'ai_coach' 
  | 'analytics' 
  | 'community_event' 
  | 'seasonal_event' 
  | 'hidden' 
  | 'achievement' 
  | 'lifestyle';

export type DynamicMissionType = 
  | 'stay_under_budget' 
  | 'finish_lesson' 
  | 'use_ai_coach' 
  | 'compare_appliances' 
  | 'reduce_ac_runtime' 
  | 'read_glossary' 
  | 'complete_minigame' 
  | 'finish_onboarding' 
  | 'improve_saving_score' 
  | 'update_runtime' 
  | 'complete_simulation' 
  | 'explain_bill' 
  | 'real_world_unplug' 
  | 'real_world_ac_temp' 
  | 'real_world_standby' 
  | 'real_world_natural_light';

export interface RealWorldActionInfo {
  isRealWorld: boolean;
  manualCompleted: boolean;
  aiEstimatedSavingThb: number;
  aiEstimatedSavingKwh: number;
  verificationTipTh: string;
}

export interface MissionChainInfo {
  chainId: string;
  stepNumber: number; // 1, 2, 3...
  totalSteps: number;
  unlocksNextMissionId?: string;
  chainTitleTh: string;
  isUnlocked: boolean;
}

export interface SmartRewardInfo {
  rewardType: 'xp' | 'coins' | 'avatar' | 'frame' | 'title' | 'theme' | 'animation' | 'stamp' | 'badge' | 'certificate' | 'story_chapter' | 'minigame_unlock';
  rewardValueTh: string;
  rewardIcon: string;
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
  category: DynamicMissionCategory;
  type?: DynamicMissionType;
  icon: string;
  progress: number;
  maxProgress: number;
  realWorldInfo?: RealWorldActionInfo;
  chainInfo?: MissionChainInfo;
  smartReward?: SmartRewardInfo;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  timeRequiredMinutes?: number;
  isRecommendedByAi?: boolean;
}

export interface LongTermGoal {
  id: string;
  titleTh: string;
  titleEn: string;
  targetDays: 30 | 90 | 365;
  currentDays: number;
  targetSavingThb: number;
  currentSavingThb: number;
  rewardTitleTh: string;
  icon: string;
  status: 'in_progress' | 'completed';
}

export interface AiMissionRecommendation {
  missionId: string;
  expectedSavingThb: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeRequiredMinutes: number;
  knowledgeGainedTh: string;
  reasonTh: string;
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
  descEn?: string;
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

// ==========================================
// EPIC 19: SMART INSIGHTS SYSTEM TYPES
// ==========================================

export interface SmartAnomaly {
  id: string;
  titleTh: string;
  titleEn: string;
  applianceName?: string;
  type: 'ac_spike' | 'fridge_continuous' | 'midnight_spike' | 'daily_jump' | 'budget_exceed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  simpleDescTh: string;
  simpleDescEn: string;
  balancedDescTh: string;
  balancedDescEn: string;
  detailedDescTh: string;
  detailedDescEn: string;
  whyTh: string;
  whyEn: string;
  financialImpactThb: number; // e.g. 185 THB/month
  confidence: number; // 0-100%
  baselineKwh?: number;
  currentKwh?: number;
  deviationPct?: number; // e.g. +23%
  source: DataSourceType;
  assumptionsTh?: string;
  recommendedActionTh: string;
  recommendedActionEn: string;
  relatedLessonId?: string;
  detectedAt: string;
  resolved?: boolean;
}

export interface SmartGoal {
  id: string;
  titleTh: string;
  titleEn: string;
  targetType: 'bill_limit' | 'ac_cut' | 'under_budget_days' | 'complete_academy' | 'boost_score';
  targetValue: number;
  currentValue: number;
  unitTh: string;
  unitEn: string;
  startDate: string;
  targetDate: string;
  successProbability: number; // 0-100%
  coachingTipTh: string;
  coachingTipEn: string;
  completed: boolean;
}

export interface HouseholdBenchmark {
  profileType: 'dorm' | 'studio' | 'house_2bed' | 'townhome' | 'cafe' | 'office';
  profileNameTh: string;
  profileNameEn: string;
  userValueKwh: number;
  averageKwh: number;
  userCostThb: number;
  averageCostThb: number;
  status: 'below_average' | 'average' | 'above_average';
  diffPct: number; // e.g. -15% or +20%
  explanationTh: string;
  explanationEn: string;
  potentialSavingsThb: number;
}

export interface SeasonalInsight {
  season: 'summer' | 'rainy' | 'winter' | 'holiday';
  titleTh: string;
  titleEn: string;
  tempImpactTh: string;
  tempImpactEn: string;
  acIncreasePct: number;
  expectedBillTrendTh: string;
  expectedBillTrendEn: string;
  aiRecommendationTh: string;
  aiRecommendationEn: string;
}

export interface ActionTimelineItem {
  id: string;
  date: string;
  actionTh: string;
  actionEn: string;
  type: 'appliance_added' | 'budget_changed' | 'ai_recommendation_followed' | 'ac_reduced' | 'lesson_finished' | 'score_improved';
  expectedImpactThb: number;
  actualImpactThb?: number;
  learningGainedTh?: string;
  coinsEarned?: number;
  xpEarned?: number;
}

export interface WhatIfScenario {
  id: string;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  descriptionEn: string;
  monthlySavingThb: number;
  yearlySavingThb: number;
  co2ReductionKg: number;
  scoreImprovementPts: number;
  paybackPeriodMonths?: number;
  aiRecommendationTh: string;
}

export interface EnergyDiaryNote {
  id: string;
  date: string;
  note: string;
  tag: 'home_all_day' | 'guests' | 'ac_heavy' | 'new_appliance' | 'travel';
  tagLabelTh: string;
}

// ==========================================
// EPIC 20: EXPLAINABILITY & TRUST SYSTEM TYPES
// ==========================================

export type SourceTypeLabel = 
  | 'user' 
  | 'measured' 
  | 'predicted' 
  | 'historical' 
  | 'tariff' 
  | 'default' 
  | 'estimated'
  | 'calculated';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface DataQualityItem {
  id: string;
  titleTh: string;
  titleEn: string;
  category: 'appliance' | 'meter' | 'profile' | 'bill_history';
  status: 'complete' | 'missing' | 'estimated';
  impactPct: number; // e.g. 15%
  actionTextTh: string;
  actionTextEn: string;
  actionKey: string;
}

export interface DataQualityScore {
  overallScore: number; // 0-100%
  gradeTh: 'ดีเยี่ยม' | 'ดีมาก' | 'ปานกลาง' | 'ควรปรับปรุง';
  gradeEn: 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement';
  items: DataQualityItem[];
}

export interface AIDecisionHistoryItem {
  id: string;
  date: string;
  recommendationTh: string;
  recommendationEn: string;
  category: string;
  reasonTh: string;
  status: 'accepted' | 'ignored' | 'pending';
  estimatedSavingThb: number;
  actualSavingThb?: number;
  confidence: ConfidenceLevel;
  source: SourceTypeLabel;
}

export interface CalculationStep {
  stepNameTh: string;
  stepNameEn: string;
  formulaTh?: string;
  formulaEn?: string;
  valueThb?: number;
  valueKwh?: number;
  unitPrice?: number;
  source: SourceTypeLabel;
  assumptionsTh?: string;
  detailTh?: string;
}

export interface CalculationTraceData {
  totalBillThb: number;
  kwhUsed: number;
  baseRateThbPerUnit: number;
  ftRateThbPerUnit: number;
  serviceFeeThb: number;
  vatPct: number;
  steps: CalculationStep[];
}

export interface TrustFaqItem {
  questionTh: string;
  questionEn: string;
  answerTh: string;
  answerEn: string;
  category: 'ai' | 'privacy' | 'formula' | 'accuracy';
}

// ==========================================
// EPIC 22: GAMIFICATION 2.0 TYPES
// ==========================================

export type KnowledgeLevelType = 'Novice' | 'Explorer' | 'Analyst' | 'Expert' | 'Master';

export interface PassportStamp {
  id: string;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  descriptionEn: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'milestone' | 'learning' | 'hardware' | 'savings' | 'story';
  xpReward: number;
}

export interface StoryChapter {
  id: string;
  chapterNum: number;
  titleTh: string;
  titleEn: string;
  locationNameTh: string;
  locationNameEn: string;
  descriptionTh: string;
  descriptionEn: string;
  dialogueTh: string;
  dialogueEn: string;
  unlocked: boolean;
  completed: boolean;
  targetKwhSaving: number;
  xpReward: number;
  coinReward: number;
  badgeRewardId?: string;
  icon: string;
  challenges: {
    id: string;
    textTh: string;
    textEn: string;
    completed: boolean;
  }[];
}

export interface SkillTreeNode {
  id: string;
  branch: 'basics' | 'bills' | 'appliances' | 'safety' | 'solar' | 'habits' | 'smarthome' | 'ai';
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  icon: string;
  levelRequired: number;
  unlocked: boolean;
  completed: boolean;
  prerequisiteNodeId?: string;
  xpReward: number;
  quizQuestionTh?: string;
  quizOptionsTh?: string[];
  correctIndex?: number;
}

export interface LearningQuest {
  id: string;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  targetAppliance?: string;
  badgeId?: string;
  unlocked: boolean;
  completed: boolean;
  xpReward: number;
  coinReward: number;
  objectives: {
    id: string;
    titleTh: string;
    titleEn: string;
    type: 'read_glossary' | 'compare_appliance' | 'take_quiz' | 'set_budget' | 'use_coach';
    completed: boolean;
  }[];
}

export type TreeEvolutionStage = 
  | 'seed' 
  | 'sprout' 
  | 'young_tree' 
  | 'healthy_tree' 
  | 'ancient_tree' 
  | 'legendary_tree';

export type TreeEcosystemSeason = 'spring' | 'summer' | 'rainy' | 'winter';
export type TreeEcosystemMood = 'healthy' | 'balanced' | 'over_budget';

export type WorldExpansionRegion = 
  | 'eco_garden' 
  | 'whispering_forest' 
  | 'eco_smart_house' 
  | 'solar_farm' 
  | 'eco_village' 
  | 'smart_green_city';

export interface KnowledgeBranchProgress {
  id: string;
  branchKey: 'basics' | 'bills' | 'appliances' | 'safety' | 'solar' | 'habits' | 'smarthome' | 'ai';
  branchNameTh: string;
  branchNameEn: string;
  completedLessons: number;
  totalLessons: number;
  icon: string;
  healthPercent: number;
  unlockedEffectTh: string;
}

export interface HabitBranchProgress {
  id: string;
  habitNameTh: string;
  habitNameEn: string;
  streakDays: number;
  status: 'active' | 'warning' | 'legendary';
  impactTh: string;
  icon: string;
}

export interface TreeMemoryMilestone {
  id: string;
  titleTh: string;
  titleEn: string;
  dateTh: string;
  category: 'lesson' | 'saving' | 'bill' | 'score' | 'streak' | 'hardware';
  descriptionTh: string;
  descriptionEn: string;
  savingAmountThb?: number;
  icon: string;
  photoSymbol: string;
}

export interface EcosystemCreature {
  id: string;
  nameTh: string;
  nameEn: string;
  icon: string;
  tipTh: string;
  tipEn: string;
  unlocked: boolean;
  unlockedByTh: string;
  category: 'mammal' | 'bird' | 'insect' | 'aquatic';
}

export interface EcosystemObject {
  id: string;
  nameTh: string;
  nameEn: string;
  icon: string;
  category: 'plant' | 'structure' | 'energy' | 'water' | 'tech' | 'creature';
  unlocked: boolean;
  unlockedByTh: string;
  descriptionTh: string;
  educationalTipTh: string;
  nextUpgradeTh: string;
}

// ==========================================
// EPIC 25: EDUVERSE VIRTUAL WORLD TYPES
// ==========================================

export type EduVerseWorldStage = 
  | 'tiny_island' 
  | 'green_garden' 
  | 'energy_forest' 
  | 'eco_village' 
  | 'smart_green_city' 
  | 'future_civilization';

export type EduVerseDistrictType = 
  | 'forest' 
  | 'residential' 
  | 'business' 
  | 'renewable' 
  | 'power_station' 
  | 'water_zone' 
  | 'research' 
  | 'adventure' 
  | 'hall_of_fame';

export interface EduVerseBuilding {
  id: string;
  nameTh: string;
  nameEn: string;
  district: EduVerseDistrictType;
  icon: string;
  purposeTh: string;
  unlocked: boolean;
  unlockedByTh: string;
  educationalTipTh: string;
  nextUpgradeTh?: string;
  level: number;
  maxLevel: number;
  statsEffectTh: string;
}

export interface EnergySpirit {
  id: string;
  nameTh: string;
  nameEn: string;
  conceptTh: string;
  spiritIcon: string;
  element: 'volt' | 'spark' | 'leafy' | 'current' | 'charge';
  level: number;
  maxLevel: number;
  unlocked: boolean;
  unlockedByTh: string;
  teachingTipTh: string;
  powerBonusTh: string;
}

export interface EduVerseNPCQuest {
  id: string;
  npcNameTh: string;
  npcRoleTh: string;
  npcAvatar: string;
  problemTh: string;
  solutionQuestionTh: string;
  optionsTh: string[];
  correctOptionIndex: number;
  rewardXp: number;
  rewardCoins: number;
  explanationTh: string;
  completed: boolean;
}

export interface EduVerseSecretArea {
  id: string;
  nameTh: string;
  nameEn: string;
  icon: string;
  unlocked: boolean;
  unlockedRequirementTh: string;
  descriptionTh: string;
  exclusiveRewardTh: string;
}

export interface EduVerseFestival {
  id: string;
  titleTh: string;
  titleEn: string;
  icon: string;
  seasonTh: string;
  active: boolean;
  themeColor: string;
  descriptionTh: string;
  specialChallengeTh: string;
}


// ==========================================
// EPIC 23: EDUCATIONAL MINI-GAMES & MISSIONS
// ==========================================

export type MiniGameCategory = 
  | 'basics' 
  | 'appliances' 
  | 'bills' 
  | 'ai_challenges' 
  | 'budget' 
  | 'safety' 
  | 'smarthome' 
  | 'time_attack' 
  | 'daily';

export type MiniGameType = 
  | 'power_battle' 
  | 'vampire_buster' 
  | 'bill_builder' 
  | 'ai_detective' 
  | 'story_scenario' 
  | 'mini_lab' 
  | 'detective_house' 
  | 'boss_challenge' 
  | 'daily_60s';

export interface MiniGameMeta {
  id: string;
  type: MiniGameType;
  category: MiniGameCategory;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Boss';
  estimatedMinutes: number;
  learningObjectiveTh: string;
  learningObjectiveEn: string;
  xpReward: number;
  coinReward: number;
  knowledgeGainedTh: string;
  completionRate: number; // e.g. 85%
  bestScore?: number;
  icon: string;
  badgeRewardId?: string;
}

export interface GameHistoryRecord {
  id: string;
  gameId: string;
  gameTitleTh: string;
  playedAt: string;
  score: number;
  maxScore: number;
  knowledgeGainedTh: string;
  xpEarned: number;
  coinsEarned: number;
  weakTopicsTh: string[];
  recommendationTh: string;
}

export interface WeeklySpecialEvent {
  id: string;
  titleTh: string;
  titleEn: string;
  subtitleTh: string;
  subtitleEn: string;
  theme: 'summer' | 'rainy' | 'earth_day' | 'dorm_survival' | 'office_challenge';
  descriptionTh: string;
  multiplierXp: number;
  bonusCoins: number;
  endsInDays: number;
  icon: string;
  active: boolean;
}





