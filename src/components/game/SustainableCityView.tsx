import React from 'react';
import { EnergyAdventureView } from './EnergyAdventureView';
import { CityState } from '../../types';

interface SustainableCityViewProps {
  cityState?: CityState;
  setCityState?: React.Dispatch<React.SetStateAction<CityState>>;
  userCoins?: number;
  setUserCoins?: React.Dispatch<React.SetStateAction<number>>;
  userCrystals?: number;
  setUserCrystals?: React.Dispatch<React.SetStateAction<number>>;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onBackToGameHub?: () => void;
}

export const SustainableCityView: React.FC<SustainableCityViewProps> = ({
  lang,
  isDarkMode,
}) => {
  return <EnergyAdventureView lang={lang} isDarkMode={isDarkMode} />;
};
