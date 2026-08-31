import React from 'react';
import { UserPersona, InfoDetailMode } from '../types';
import { AppliancePriceComparison } from './appliances/AppliancePriceComparison';

interface HistoricalTrendChartProps {
  isDarkMode: boolean;
  activeHouseName?: string;
  lang?: 'th' | 'en';
  persona?: UserPersona;
  infoDetailMode?: InfoDetailMode;
  onNavigatePage?: (page: any) => void;
  onOpenAddAppliance?: () => void;
}

export const HistoricalTrendChart: React.FC<HistoricalTrendChartProps> = ({
  isDarkMode,
  lang = 'th',
  persona = 'student',
  infoDetailMode = 'balanced',
  onNavigatePage,
  onOpenAddAppliance,
}) => {
  return (
    <AppliancePriceComparison
      isDarkMode={isDarkMode}
      lang={lang}
      persona={persona}
      infoDetailMode={infoDetailMode}
      onNavigatePage={onNavigatePage}
      onOpenAddAppliance={onOpenAddAppliance}
    />
  );
};
