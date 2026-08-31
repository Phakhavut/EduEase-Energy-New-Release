import React from 'react';
import { GreenCityJourney } from './GreenCityJourney';

interface EnergyAdventureViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  highestConsumingDeviceName?: string;
  initialTab?: 'city' | 'play' | 'missions' | 'rewards';
  onNavigateToTab?: (page: string) => void;
  onNavigateToAppliances?: () => void;
  onNavigateToAiCoach?: () => void;
}

export const EnergyAdventureView: React.FC<EnergyAdventureViewProps> = ({
  lang,
  isDarkMode,
  initialTab = 'city',
  onNavigateToTab
}) => {
  return (
    <GreenCityJourney
      lang={lang}
      isDarkMode={isDarkMode}
      initialTab={initialTab}
      onNavigateToTab={onNavigateToTab}
    />
  );
};
