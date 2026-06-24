export interface ApplianceInput {
  id: string;
  name: string;
  nameTh: string;
  hoursPerDay: number;
  count: number;
  isEnergyStar: boolean;
  standbyOff: boolean;
  tempSetting?: number; // optional, for AC
}

export interface SavingRecommendation {
  appliance: string;
  impact: string; // "High" | "Medium" | "Low"
  titleEn: string;
  titleTh: string;
  descEn: string;
  descTh: string;
  potentialSavingsMonthlyEn: string;
  potentialSavingsMonthlyTh: string;
}

export interface SavingsPlan {
  estimatedCurrentMonthlyCost: number;
  estimatedNewMonthlyCost: number;
  monthlySavings: number;
  savingsPercentage: number;
  recommendations: SavingRecommendation[];
  planSummaryEn: string;
  planSummaryTh: string;
}

export interface SmartSavingsCalculatorProps {
  lang: 'th' | 'en';
  isDarkMode?: boolean;
  onTokensEarned?: (tokens: number) => void;
}
