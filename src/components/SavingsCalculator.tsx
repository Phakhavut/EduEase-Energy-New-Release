import React from 'react';
import { SmartSavingsCalculator } from './SmartSavingsCalculator';

interface SavingsCalculatorProps {
  isDarkMode: boolean;
  lang?: 'th' | 'en';
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ 
  isDarkMode, 
  lang = 'th' 
}) => {
  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all duration-300 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
      <SmartSavingsCalculator 
        lang={lang} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
};
