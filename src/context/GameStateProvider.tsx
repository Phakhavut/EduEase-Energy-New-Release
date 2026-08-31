import React, { createContext, useContext, useState, useEffect } from 'react';
import { EnergyGuardianState, EnergyBoss, BossId } from '../types';
import { DEFAULT_GUARDIAN_STATE } from '../data/energyGuardianData';
import {
  CityAssetId,
  CityPlot,
  SimplifiedCityProgress,
  INITIAL_SIMPLIFIED_CITY,
  CITY_ASSET_DEFINITIONS,
  calculateCityImpact
} from '../data/cityBuilderData';

export interface GameStateContextType {
  guardianState: EnergyGuardianState;
  setGuardianState: React.Dispatch<React.SetStateAction<EnergyGuardianState>>;
  
  // City Builder State & Actions
  cityProgress: SimplifiedCityProgress;
  buildOnPlot: (assetId: CityAssetId, plotId: string) => { ok: true } | { ok: false; reason: 'locked-plot' | 'occupied-plot' | 'locked-asset' | 'not-enough-credits' };
  moveCityAsset: (fromPlotId: string, toPlotId: string) => { ok: true } | { ok: false; reason: 'locked-plot' | 'occupied-plot' | 'empty-source' };
  markCityIntroSeen: () => void;
  earnEcoCredits: (amount: number) => void;
  addXp: (amount: number) => void;
  
  // Legacy / optional contextual problem state
  activeBossBattle: EnergyBoss | null;
  setActiveBossBattle: React.Dispatch<React.SetStateAction<EnergyBoss | null>>;
  
  showGameTutorialModal: boolean;
  setShowGameTutorialModal: React.Dispatch<React.SetStateAction<boolean>>;
  showGameGuideModal: boolean;
  setShowGameGuideModal: React.Dispatch<React.SetStateAction<boolean>>;
  showInventoryModal: boolean;
  setShowInventoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  
  handleBossVictory: (bossId: BossId, rewards: { xp: number; coins: number; crystals: number; blueprintId?: string; seedId?: string }) => void;
  gainEnergy: (amount: number) => void;
  consumeEnergy: (amount: number) => boolean;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guardianState, setGuardianState] = useState<EnergyGuardianState>(() => {
    const saved = localStorage.getItem('energyGuardianState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_GUARDIAN_STATE,
          ...parsed,
          coins: typeof parsed.coins === 'number' ? parsed.coins : 250,
          inventory: Array.isArray(parsed.inventory) ? parsed.inventory : [],
          defeatedBosses: Array.isArray(parsed.defeatedBosses) ? parsed.defeatedBosses : []
        };
      } catch (e) {
        console.error("Failed to parse saved game state", e);
      }
    }
    return DEFAULT_GUARDIAN_STATE;
  });

  const [cityProgress, setCityProgress] = useState<SimplifiedCityProgress>(() => {
    const savedCity = localStorage.getItem('eduease_green_city_state');
    if (savedCity) {
      try {
        const parsed = JSON.parse(savedCity);
        if (Array.isArray(parsed.plots)) {
          return {
            ...INITIAL_SIMPLIFIED_CITY,
            ...parsed
          };
        }
      } catch (e) {
        console.error("Failed to parse saved city progress", e);
      }
    }
    return INITIAL_SIMPLIFIED_CITY;
  });

  const [activeBossBattle, setActiveBossBattle] = useState<EnergyBoss | null>(null);
  const [showGameTutorialModal, setShowGameTutorialModal] = useState(false);
  const [showGameGuideModal, setShowGameGuideModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('energyGuardianState', JSON.stringify(guardianState));
  }, [guardianState]);

  useEffect(() => {
    localStorage.setItem('eduease_green_city_state', JSON.stringify(cityProgress));
  }, [cityProgress]);

  const markCityIntroSeen = () => {
    setCityProgress(prev => ({ ...prev, introSeen: true }));
  };

  const earnEcoCredits = (amount: number) => {
    setGuardianState(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const addXp = (amount: number) => {
    setGuardianState(prev => {
      const nextXp = prev.xp + amount;
      if (nextXp >= prev.xpMax) {
        return {
          ...prev,
          level: prev.level + 1,
          xp: nextXp - prev.xpMax,
          xpMax: Math.round(prev.xpMax * 1.3)
        };
      }
      return {
        ...prev,
        xp: nextXp
      };
    });
  };

  const buildOnPlot = (
    assetId: CityAssetId,
    plotId: string
  ): { ok: true } | { ok: false; reason: 'locked-plot' | 'occupied-plot' | 'locked-asset' | 'not-enough-credits' } => {
    const targetPlot = cityProgress.plots.find(p => p.id === plotId);
    if (!targetPlot || !targetPlot.unlocked) {
      return { ok: false, reason: 'locked-plot' };
    }
    if (targetPlot.assetId) {
      return { ok: false, reason: 'occupied-plot' };
    }
    const assetDef = CITY_ASSET_DEFINITIONS[assetId];
    if (!assetDef || assetDef.unlockLevel > cityProgress.level + 1) {
      return { ok: false, reason: 'locked-asset' };
    }
    if (guardianState.coins < assetDef.costCredits) {
      return { ok: false, reason: 'not-enough-credits' };
    }

    // Deduct coins & place asset
    setGuardianState(prev => ({ ...prev, coins: prev.coins - assetDef.costCredits }));
    setCityProgress(prev => {
      const newPlots = prev.plots.map(p => p.id === plotId ? { ...p, assetId } : p);
      const impact = calculateCityImpact(newPlots);
      const newLevel = impact.placedCount >= 4 ? 3 : impact.placedCount >= 2 ? 2 : 1;
      
      // Auto-unlock plots based on level
      const updatedPlots = newPlots.map(p => ({
        ...p,
        unlocked: p.unlockLevel <= newLevel
      }));

      return {
        ...prev,
        plots: updatedPlots,
        level: newLevel,
        health: impact.healthScore
      };
    });

    return { ok: true };
  };

  const moveCityAsset = (
    fromPlotId: string,
    toPlotId: string
  ): { ok: true } | { ok: false; reason: 'locked-plot' | 'occupied-plot' | 'empty-source' } => {
    const sourcePlot = cityProgress.plots.find(p => p.id === fromPlotId);
    const destPlot = cityProgress.plots.find(p => p.id === toPlotId);

    if (!sourcePlot || !sourcePlot.assetId) {
      return { ok: false, reason: 'empty-source' };
    }
    if (!destPlot || !destPlot.unlocked) {
      return { ok: false, reason: 'locked-plot' };
    }
    if (destPlot.assetId) {
      return { ok: false, reason: 'occupied-plot' };
    }

    const movingAssetId = sourcePlot.assetId;

    setCityProgress(prev => ({
      ...prev,
      plots: prev.plots.map(p => {
        if (p.id === fromPlotId) return { ...p, assetId: undefined };
        if (p.id === toPlotId) return { ...p, assetId: movingAssetId };
        return p;
      })
    }));

    return { ok: true };
  };

  const handleBossVictory = (bossId: BossId, rewards: { xp: number; coins: number; crystals: number; blueprintId?: string; seedId?: string }) => {
    setGuardianState(prev => {
      let newXp = prev.xp + rewards.xp;
      let newLevel = prev.level;
      let newXpMax = prev.xpMax;
      
      while (newXp >= newXpMax) {
        newXp -= newXpMax;
        newLevel += 1;
        newXpMax = Math.floor(newXpMax * 1.5);
      }
      
      const isNewlyDefeated = !prev.defeatedBosses.includes(bossId);
      const newDefeatedBosses = isNewlyDefeated 
        ? [...prev.defeatedBosses, bossId]
        : prev.defeatedBosses;

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpMax: newXpMax,
        coins: prev.coins + rewards.coins,
        crystals: prev.crystals + rewards.crystals,
        defeatedBosses: newDefeatedBosses,
      };
    });
  };

  const gainEnergy = (amount: number) => {
    setGuardianState(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + amount)
    }));
  };

  const consumeEnergy = (amount: number): boolean => {
    if (guardianState.energy >= amount) {
      setGuardianState(prev => ({
        ...prev,
        energy: prev.energy - amount
      }));
      return true;
    }
    return false;
  };

  return (
    <GameStateContext.Provider value={{
      guardianState,
      setGuardianState,
      cityProgress,
      buildOnPlot,
      moveCityAsset,
      markCityIntroSeen,
      earnEcoCredits,
      addXp,
      activeBossBattle,
      setActiveBossBattle,
      showGameTutorialModal,
      setShowGameTutorialModal,
      showGameGuideModal,
      setShowGameGuideModal,
      showInventoryModal,
      setShowInventoryModal,
      handleBossVictory,
      gainEnergy,
      consumeEnergy,
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
