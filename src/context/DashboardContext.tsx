import React, { createContext, useContext } from 'react';
import { Device } from '../types/device.types';

export interface DashboardContextType {
  lang: "en" | "th";
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  multiDevices: Device[];
  setMultiDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  analytics: {
    totalUnits: number;
    totalSpent: number;
    activeCount: number;
    budgetHealth: number;
    avgPowerFactor: number;
  };
  t: (key: string) => string;
  setConfettiTrigger: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  aiAutopilotCapping: boolean;
  setAiAutopilotCapping: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{
  value: DashboardContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
