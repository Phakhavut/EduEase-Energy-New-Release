import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SustainableCityView } from './SustainableCityView';
import { AdventureMap } from './AdventureMap';
import { BossBattleView } from './BossBattleView';
import { EnergyGuardianState, EnergyBoss, CityState, BossId } from '../../types';

interface GameWorldProps {
  children?: React.ReactNode;
  isDarkMode?: boolean;
  lang?: 'th' | 'en';
  activeView?: 'map' | 'city' | 'battle' | 'shop' | 'inventory' | 'hub';
  headerElement?: React.ReactNode;
  navElement?: React.ReactNode;
  
  // Optional sub-component view props for direct orchestration
  cityState?: CityState;
  setCityState?: React.Dispatch<React.SetStateAction<CityState>>;
  guardianState?: EnergyGuardianState;
  setGuardianState?: React.Dispatch<React.SetStateAction<EnergyGuardianState>>;
  activeBoss?: EnergyBoss | null;
  onSelectBoss?: (boss: EnergyBoss) => void;
  onBossVictory?: (bossId: BossId, rewards: { xp: number; coins: number; crystals: number; blueprintId?: string; seedId?: string }) => void;
  onExitBoss?: () => void;
  onNavigateToTab?: (tab: string) => void;
  className?: string;
}

/**
 * GameWorld
 * 
 * Serves as the full-screen container for the Energy Adventure.
 * Uses absolute positioning with `inset-0` to fill the viewport,
 * includes sub-components for City, Map, and Battle view, and uses
 * standard CSS layout to guarantee zero horizontal overflow on any screen size.
 */
export const GameWorld: React.FC<GameWorldProps> & {
  City: typeof SustainableCityView;
  Map: typeof AdventureMap;
  Battle: typeof BossBattleView;
} = ({
  children,
  isDarkMode = false,
  lang = 'th',
  activeView = 'city',
  headerElement,
  navElement,
  cityState,
  setCityState,
  guardianState,
  setGuardianState,
  activeBoss,
  onSelectBoss,
  onBossVictory,
  onExitBoss,
  onNavigateToTab,
  className = ''
}) => {
  return (
    <div className={`relative inset-0 w-full min-h-[calc(100vh-120px)] flex flex-col rounded-3xl overflow-x-hidden overflow-y-auto shadow-2xl transition-colors duration-500 max-w-full ${
      isDarkMode 
        ? 'bg-slate-950 text-white border border-slate-800' 
        : 'bg-slate-900 text-slate-100 border border-slate-800'
    } ${className}`}>
      {/* Background Ambience Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <AnimatePresence mode="wait">
          {activeView === 'city' && (
            <motion.div
              key="bg-city"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/40' : 'bg-gradient-to-b from-slate-900 via-slate-850 to-emerald-900/30'}`}
            />
          )}
          {activeView === 'map' && (
            <motion.div
              key="bg-map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950/60' : 'bg-gradient-to-b from-slate-900 via-teal-950/40 to-emerald-900/50'}`}
            />
          )}
          {activeView === 'battle' && (
            <motion.div
              key="bg-battle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Header Slot */}
      {headerElement && (
        <header className="relative z-20 flex-shrink-0 w-full max-w-full overflow-x-hidden">
          {headerElement}
        </header>
      )}

      {/* Main Container Viewport */}
      <main className="relative z-10 flex-1 w-full max-w-full overflow-x-hidden overflow-y-auto p-2 sm:p-4 md:p-6 flex flex-col">
        {children ? (
          children
        ) : (
          <div className="w-full flex-1 flex flex-col max-w-full overflow-x-hidden">
            {activeView === 'city' && cityState && setCityState && guardianState && (
              <SustainableCityView
                cityState={cityState}
                setCityState={setCityState}
                userCoins={guardianState.coins}
                setUserCoins={(val) => setGuardianState?.(prev => ({ ...prev, coins: typeof val === 'function' ? val(prev.coins) : val }))}
                userCrystals={guardianState.crystals}
                setUserCrystals={(val) => setGuardianState?.(prev => ({ ...prev, crystals: typeof val === 'function' ? val(prev.crystals) : val }))}
                lang={lang}
                isDarkMode={isDarkMode}
                onBackToGameHub={() => onNavigateToTab?.('hub')}
              />
            )}

            {activeView === 'map' && guardianState && (
              <AdventureMap
                guardianState={guardianState}
                lang={lang}
                isDarkMode={isDarkMode}
                onSelectBoss={(boss) => onSelectBoss?.(boss)}
              />
            )}

            {activeView === 'battle' && activeBoss && guardianState && (
              <BossBattleView
                boss={activeBoss}
                lang={lang}
                isDarkMode={isDarkMode}
                userEnergy={guardianState.energy}
                setUserEnergy={(val) => setGuardianState?.(prev => ({ ...prev, energy: typeof val === 'function' ? val(prev.energy) : val }))}
                onVictory={(bossId, rewards) => onBossVictory?.(bossId, rewards)}
                onBack={() => onExitBoss?.()}
                onGoToCity={() => onNavigateToTab?.('city')}
              />
            )}
          </div>
        )}
      </main>

      {/* Navigation Slot */}
      {navElement && (
        <nav className="relative z-20 flex-shrink-0 w-full max-w-full overflow-x-hidden">
          {navElement}
        </nav>
      )}
    </div>
  );
};

// Attach sub-components for direct dot-notation access
GameWorld.City = SustainableCityView;
GameWorld.Map = AdventureMap;
GameWorld.Battle = BossBattleView;
