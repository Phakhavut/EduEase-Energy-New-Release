import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CityPlot, CityAssetId, CITY_ASSET_DEFINITIONS } from '../../../data/cityBuilderData';
import { Sparkles, Move, Info, X, Check, Zap, TreePine, DollarSign } from 'lucide-react';

interface IsometricCitySceneProps {
  plots: CityPlot[];
  isBuildMode: boolean;
  selectedPlotId: string | null;
  onSelectPlot: (plotId: string) => void;
  onMoveAsset?: (fromPlotId: string, toPlotId: string) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const IsometricCityScene: React.FC<IsometricCitySceneProps> = ({
  plots,
  isBuildMode,
  selectedPlotId,
  onSelectPlot,
  onMoveAsset,
  lang,
  isDarkMode,
}) => {
  const [inspectingPlot, setInspectingPlot] = useState<CityPlot | null>(null);
  const [movingFromPlotId, setMovingFromPlotId] = useState<string | null>(null);

  const handlePlotClick = (plot: CityPlot) => {
    if (movingFromPlotId) {
      if (movingFromPlotId === plot.id) {
        setMovingFromPlotId(null);
        return;
      }
      if (plot.unlocked && !plot.assetId && onMoveAsset) {
        onMoveAsset(movingFromPlotId, plot.id);
        setMovingFromPlotId(null);
        setInspectingPlot(null);
        return;
      }
    }

    if (isBuildMode) {
      onSelectPlot(plot.id);
      setInspectingPlot(null);
    } else {
      if (plot.assetId) {
        setInspectingPlot(plot);
      } else {
        setInspectingPlot(null);
      }
    }
  };

  return (
    <div className="relative w-full aspect-[16/10] max-h-[580px] rounded-3xl overflow-hidden shadow-2xl select-none border border-slate-200/80 dark:border-slate-800 bg-slate-900">
      {/* SVG Canvas */}
      <svg
        viewBox="0 0 1200 720"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={lang === 'th' ? 'ภาพจำลองเมืองพลังงานสีเขียว' : 'Isometric Green City Scene'}
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDarkMode ? '#0F172A' : '#79C9FF'} />
            <stop offset="60%" stopColor={isDarkMode ? '#1E293B' : '#DFF4FF'} />
            <stop offset="100%" stopColor={isDarkMode ? '#064E3B' : '#E6F9EC'} />
          </linearGradient>

          {/* Isometric Diamond Base */}
          <linearGradient id="grassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isDarkMode ? '#065F46' : '#34D399'} />
            <stop offset="50%" stopColor={isDarkMode ? '#047857' : '#10B981'} />
            <stop offset="100%" stopColor={isDarkMode ? '#064E3B' : '#059669'} />
          </linearGradient>

          {/* Water Stream Gradient */}
          <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Solar Panel Gradient */}
          <linearGradient id="solarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Building Wall Shading */}
          <linearGradient id="wallFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="wallSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* 1. Sky & Backdrop */}
        <rect x="0" y="0" width="1200" height="720" fill="url(#skyGrad)" />

        {/* Soft Background Mountains / Skyline */}
        <path
          d="M 0 320 Q 200 240 400 300 T 800 280 T 1200 310 L 1200 720 L 0 720 Z"
          fill={isDarkMode ? '#134E4A' : '#A7F3D0'}
          opacity="0.45"
        />
        <path
          d="M 0 370 Q 300 300 600 350 T 1200 340 L 1200 720 L 0 720 Z"
          fill={isDarkMode ? '#064E3B' : '#6EE7B7'}
          opacity="0.65"
        />

        {/* Drifting Clouds (CSS motion safe) */}
        <g opacity={isDarkMode ? '0.2' : '0.8'} className="motion-safe:animate-pulse">
          <ellipse cx="220" cy="120" rx="90" ry="24" fill="#FFFFFF" />
          <ellipse cx="270" cy="110" rx="60" ry="28" fill="#FFFFFF" />
          <ellipse cx="940" cy="90" rx="110" ry="26" fill="#FFFFFF" />
          <ellipse cx="890" cy="80" rx="70" ry="30" fill="#FFFFFF" />
        </g>

        {/* Distant Wind Farm Silhouettes */}
        <g opacity="0.4">
          <line x1="180" y1="260" x2="180" y2="210" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="180" cy="210" r="3" fill="#64748B" />
          <line x1="240" y1="245" x2="240" y2="200" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="240" cy="200" r="3" fill="#64748B" />
          <line x1="980" y1="250" x2="980" y2="205" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="980" cy="205" r="3" fill="#64748B" />
        </g>

        {/* 2. Main Isometric Island Ground */}
        {/* Ground Island Silhouette */}
        <polygon
          points="600,160 1100,410 600,660 100,410"
          fill="url(#grassGrad)"
          stroke={isDarkMode ? '#047857' : '#10B981'}
          strokeWidth="6"
        />

        {/* Island Side Depth Cliff */}
        <polygon points="100,410 600,660 600,700 100,450" fill={isDarkMode ? '#064E3B' : '#047857'} />
        <polygon points="600,660 1100,410 1100,450 600,700" fill={isDarkMode ? '#022C22' : '#065F46'} />

        {/* Blue River / Water Canal across island */}
        <path
          d="M 350 285 C 480 350, 520 450, 600 660 L 660 660 C 580 440, 540 340, 420 250 Z"
          fill="url(#waterGrad)"
          opacity="0.85"
        />

        {/* Isometric Road System */}
        <path
          d="M 600 180 L 980 370 L 920 400 L 540 210 Z"
          fill="#475569"
          opacity="0.8"
        />
        <path
          d="M 220 350 L 600 540 L 560 560 L 180 370 Z"
          fill="#475569"
          opacity="0.8"
        />

        {/* Road Dash Markings */}
        <line x1="600" y1="195" x2="950" y2="370" stroke="#F8FAFC" strokeWidth="2" strokeDasharray="12 12" />
        <line x1="200" y1="360" x2="580" y2="550" stroke="#F8FAFC" strokeWidth="2" strokeDasharray="12 12" />

        {/* 3. Base Scenery (Non-removable eco starters) */}
        {/* Starter Community Center / Town Hall at top-center */}
        <g id="starter-townhall" transform="translate(600, 240)">
          {/* Shadow */}
          <polygon points="-60,30 60,30 80,45 -80,45" fill="rgba(0,0,0,0.25)" />
          {/* Walls */}
          <polygon points="-50,0 0,25 0,-40 -50,-65" fill="url(#wallFront)" />
          <polygon points="0,25 50,0 50,-65 0,-40" fill="url(#wallSide)" />
          {/* Solar Roof */}
          <polygon points="-50,-65 0,-90 50,-65 0,-40" fill="url(#solarGrad)" stroke="#38BDF8" strokeWidth="2" />
          {/* Windows */}
          <rect x="-35" y="-30" width="14" height="18" fill="#38BDF8" rx="2" transform="skewY(26.5)" />
          <rect x="20" y="-30" width="14" height="18" fill="#38BDF8" rx="2" transform="skewY(-26.5)" />
          {/* Eco Badge Flag */}
          <line x1="0" y1="-90" x2="0" y2="-120" stroke="#E2E8F0" strokeWidth="2" />
          <polygon points="0,-120 24,-112 0,-104" fill="#10B981" />
        </g>

        {/* Fixed Park Trees & Natural Greenspace */}
        <g id="starter-trees">
          {/* Pine Cluster North */}
          <circle cx="480" cy="270" r="16" fill="#059669" />
          <circle cx="510" cy="285" r="18" fill="#10B981" />
          <circle cx="465" cy="290" r="14" fill="#34D399" />
          {/* Park Area South */}
          <circle cx="780" cy="460" r="22" fill="#059669" />
          <circle cx="820" cy="480" r="20" fill="#10B981" />
          <circle cx="750" cy="490" r="18" fill="#34D399" />
          <rect x="770" y="475" width="24" height="8" rx="3" fill="#D97706" />
        </g>

        {/* 4. Constructible & Placed Isometric Plots */}
        {plots.map((plot) => {
          const isSelected = selectedPlotId === plot.id;
          const isInspected = inspectingPlot?.id === plot.id;
          const isMovingSource = movingFromPlotId === plot.id;

          return (
            <g
              key={plot.id}
              id={`plot-node-${plot.id}`}
              transform={`translate(${plot.x}, ${plot.y})`}
              className="cursor-pointer transition-all duration-300 focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label={`${lang === 'th' ? plot.labelTh : plot.labelEn} - ${plot.assetId ? (lang === 'th' ? CITY_ASSET_DEFINITIONS[plot.assetId].nameTh : CITY_ASSET_DEFINITIONS[plot.assetId].nameEn) : (lang === 'th' ? 'พื้นที่ว่าง' : 'Empty Plot')}`}
              onClick={() => handlePlotClick(plot)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePlotClick(plot);
                }
              }}
            >
              {/* Plot Base Diamond Tile */}
              <polygon
                points="0,-40 70,-5 0,30 -70,-5"
                fill={
                  isSelected
                    ? 'rgba(248, 201, 77, 0.55)'
                    : isMovingSource
                    ? 'rgba(56, 189, 248, 0.6)'
                    : isBuildMode
                    ? plot.unlocked
                      ? plot.assetId
                        ? 'rgba(16, 185, 129, 0.35)'
                        : 'rgba(248, 201, 77, 0.25)'
                      : 'rgba(100, 116, 139, 0.3)'
                    : isInspected
                    ? 'rgba(56, 189, 248, 0.4)'
                    : 'transparent'
                }
                stroke={
                  isSelected
                    ? '#F59E0B'
                    : isMovingSource
                    ? '#0284C7'
                    : isBuildMode
                    ? plot.unlocked
                      ? '#10B981'
                      : '#64748B'
                    : isInspected
                    ? '#38BDF8'
                    : 'transparent'
                }
                strokeWidth={isSelected || isMovingSource || isInspected ? '4' : '2'}
                strokeDasharray={!plot.assetId && isBuildMode ? '6 6' : undefined}
                className="transition-colors duration-200 hover:opacity-90"
              />

              {/* Empty Unlocked Plot Indicator in Build Mode */}
              {!plot.assetId && isBuildMode && plot.unlocked && (
                <g className="animate-bounce">
                  <circle cx="0" cy="-5" r="16" fill="#F8C94D" />
                  <text x="0" y="0" fill="#78350F" fontSize="18" fontWeight="bold" textAnchor="middle" dominantBaseline="central">+</text>
                </g>
              )}

              {/* Locked Plot Indicator */}
              {!plot.unlocked && isBuildMode && (
                <g opacity="0.6">
                  <circle cx="0" cy="-5" r="14" fill="#334155" />
                  <text x="0" y="-3" fill="#94A3B8" fontSize="11" fontWeight="bold" textAnchor="middle" dominantBaseline="central">🔒</text>
                  <text x="0" y="22" fill="#E2E8F0" fontSize="11" fontWeight="bold" textAnchor="middle">Lv.{plot.unlockLevel}</text>
                </g>
              )}

              {/* Placed Building Models */}
              {plot.assetId && (
                <BuildingModel assetId={plot.assetId} isInspected={isInspected} />
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating Selected/Inspected Building Popover Card */}
      <AnimatePresence>
        {inspectingPlot && inspectingPlot.assetId && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xs z-30 p-4 rounded-2xl bg-slate-900/95 border border-emerald-500/40 text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  {lang === 'th' ? 'สิ่งก่อสร้างที่เลือก' : 'Placed Building'}
                </span>
                <h4 className="font-bold text-sm text-white">
                  {lang === 'th'
                    ? CITY_ASSET_DEFINITIONS[inspectingPlot.assetId].nameTh
                    : CITY_ASSET_DEFINITIONS[inspectingPlot.assetId].nameEn}
                </h4>
              </div>
              <button
                onClick={() => setInspectingPlot(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label={lang === 'th' ? 'ปิด' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {lang === 'th'
                ? CITY_ASSET_DEFINITIONS[inspectingPlot.assetId].descriptionTh
                : CITY_ASSET_DEFINITIONS[inspectingPlot.assetId].descriptionEn}
            </p>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span>
                {lang === 'th'
                  ? CITY_ASSET_DEFINITIONS[inspectingPlot.assetId].impactTh
                  : CITY_ASSET_DEFINITIONS[inspectingPlot.assetId].impactEn}
              </span>
            </div>

            {onMoveAsset && (
              <button
                onClick={() => {
                  setMovingFromPlotId(inspectingPlot.id);
                  setInspectingPlot(null);
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Move className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'ย้ายตำแหน่งแปลง' : 'Move Building'}</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Moving Mode Guide Banner */}
      {movingFromPlotId && (
        <div className="absolute top-4 left-4 right-4 z-30 p-3 rounded-2xl bg-sky-500/90 text-white font-bold text-xs flex items-center justify-between shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Move className="w-4 h-4 animate-spin" />
            <span>{lang === 'th' ? 'เลือกแปลงว่างที่ต้องการย้ายสิ่งก่อสร้างไป' : 'Select an empty plot to place this building'}</span>
          </div>
          <button
            onClick={() => setMovingFromPlotId(null)}
            className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold"
          >
            {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
          </button>
        </div>
      )}
    </div>
  );
};

// Sub-Component: Typed Isometric Building Visuals
const BuildingModel: React.FC<{ assetId: CityAssetId; isInspected: boolean }> = ({
  assetId,
  isInspected,
}) => {
  switch (assetId) {
    case 'solar-roof':
      return (
        <g id="model-solar-roof" transform="translate(0, -10)">
          {/* Ground Contact Shadow */}
          <polygon points="-50,20 50,20 60,30 -60,30" fill="rgba(0,0,0,0.2)" />
          {/* Main Walls */}
          <polygon points="-40,0 0,20 0,-30 -40,-50" fill="#F8FAFC" />
          <polygon points="0,20 40,0 40,-50 0,-30" fill="#CBD5E1" />
          {/* Blue Solar Panels on Roof */}
          <polygon points="-40,-50 0,-70 40,-50 0,-30" fill="url(#solarGrad)" stroke="#38BDF8" strokeWidth="2" />
          <line x1="-20" y1="-60" x2="20" y2="-40" stroke="#BAE6FD" strokeWidth="1.5" />
          <line x1="0" y1="-70" x2="0" y2="-30" stroke="#BAE6FD" strokeWidth="1.5" />
          {/* Window & Eco Door */}
          <rect x="-28" y="-20" width="12" height="14" fill="#38BDF8" rx="2" transform="skewY(26.5)" />
          <rect x="15" y="-12" width="12" height="18" fill="#10B981" rx="2" transform="skewY(-26.5)" />
          {/* Inverter Sparkle */}
          <circle cx="30" cy="-2" r="3" fill="#F59E0B" className="animate-ping" />
        </g>
      );

    case 'community-garden':
      return (
        <g id="model-community-garden" transform="translate(0, -10)">
          <polygon points="-45,15 45,15 55,25 -55,25" fill="rgba(0,0,0,0.2)" />
          {/* Raised Wooden Planter Beds */}
          <polygon points="-35,5 0,20 35,5 0,-10" fill="#78350F" />
          <polygon points="-30,3 0,16 30,3 0,-8" fill="#047857" />
          {/* Lush Trees & Veggies */}
          <circle cx="-15" cy="-8" r="16" fill="#10B981" />
          <circle cx="15" cy="-5" r="14" fill="#34D399" />
          <circle cx="0" cy="-22" r="18" fill="#059669" />
          <circle cx="-5" cy="-3" r="3" fill="#EF4444" />
          <circle cx="8" cy="-12" r="3" fill="#F59E0B" />
          {/* Drip Irrigation Pipe */}
          <line x1="-25" y1="0" x2="25" y2="0" stroke="#38BDF8" strokeWidth="1.5" />
        </g>
      );

    case 'eco-home':
      return (
        <g id="model-eco-home" transform="translate(0, -10)">
          <polygon points="-45,20 45,20 55,30 -55,30" fill="rgba(0,0,0,0.2)" />
          {/* Modern 2-Story Green Villa */}
          <polygon points="-35,0 0,18 0,-45 -35,-63" fill="#F1F5F9" />
          <polygon points="0,18 35,0 35,-63 0,-45" fill="#94A3B8" />
          {/* Green Grass Vegetative Roof */}
          <polygon points="-35,-63 0,-80 35,-63 0,-45" fill="#10B981" stroke="#059669" strokeWidth="2" />
          {/* Large Double Glazed Windows */}
          <rect x="-28" y="-35" width="18" height="24" fill="#BAE6FD" rx="2" transform="skewY(26.5)" />
          <rect x="8" y="-35" width="18" height="24" fill="#BAE6FD" rx="2" transform="skewY(-26.5)" />
        </g>
      );

    case 'wind-turbine':
      return (
        <g id="model-wind-turbine" transform="translate(0, -15)">
          <polygon points="-25,20 25,20 30,26 -30,26" fill="rgba(0,0,0,0.2)" />
          {/* Turbine Mast */}
          <polygon points="-4,15 4,15 2,-70 -2,-70" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          <circle cx="0" cy="-70" r="6" fill="#64748B" />
          {/* Rotating Blades (CSS animation safe) */}
          <g className="origin-[0px_-70px] motion-safe:animate-spin" style={{ animationDuration: '4s' }}>
            <line x1="0" y1="-70" x2="0" y2="-115" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <line x1="0" y1="-70" x2="38" y2="-48" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <line x1="0" y1="-70" x2="-38" y2="-48" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          </g>
          <circle cx="0" cy="-70" r="3" fill="#38BDF8" />
        </g>
      );

    case 'smart-lights':
      return (
        <g id="model-smart-lights" transform="translate(0, -10)">
          <polygon points="-35,15 35,15 40,22 -40,22" fill="rgba(0,0,0,0.2)" />
          {/* Cobblestone Path */}
          <polygon points="-30,5 0,18 30,5 0,-8" fill="#64748B" />
          {/* Dual Solar Light Poles */}
          <line x1="-15" y1="5" x2="-15" y2="-35" stroke="#E2E8F0" strokeWidth="2.5" />
          <circle cx="-15" cy="-35" r="4" fill="#F8C94D" />
          <circle cx="-15" cy="-35" r="10" fill="rgba(248, 201, 77, 0.35)" className="animate-pulse" />

          <line x1="15" y1="5" x2="15" y2="-35" stroke="#E2E8F0" strokeWidth="2.5" />
          <circle cx="15" cy="-35" r="4" fill="#F8C94D" />
          <circle cx="15" cy="-35" r="10" fill="rgba(248, 201, 77, 0.35)" className="animate-pulse" />
        </g>
      );

    case 'ev-hub':
      return (
        <g id="model-ev-hub" transform="translate(0, -10)">
          <polygon points="-45,20 45,20 55,30 -55,30" fill="rgba(0,0,0,0.2)" />
          {/* Station Base */}
          <polygon points="-35,5 0,20 35,5 0,-10" fill="#334155" />
          {/* Solar Canopy Roof */}
          <polygon points="-35,-35 0,-50 35,-35 0,-20" fill="url(#solarGrad)" stroke="#10B981" strokeWidth="2" />
          <line x1="-30" y1="0" x2="-30" y2="-30" stroke="#CBD5E1" strokeWidth="3" />
          <line x1="30" y1="0" x2="30" y2="-30" stroke="#CBD5E1" strokeWidth="3" />
          {/* EV Charging Dispenser */}
          <rect x="-10" y="-15" width="20" height="22" rx="3" fill="#10B981" />
          <path d="M 0,-8 L -4,0 L 2,0 L -2,6 L 4,-2 L 0,-2 Z" fill="#F8C94D" />
        </g>
      );

    default:
      return null;
  }
};
