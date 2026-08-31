import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Lock, 
  Zap, 
  Coins, 
  TreePine, 
  Plus,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Hammer
} from 'lucide-react';
import { 
  CityPlot, 
  CityAssetId, 
  CITY_ASSET_DEFINITIONS, 
  PLOT_DEFINITIONS,
  getPlotDefinition 
} from '../../../data/cityJourneyData';
import { 
  StarterHomeAsset, 
  CityAssetSprite, 
  VoltieGuideIllustration,
  HelperBotIllustration 
} from './GreenCityVisualAssets';
import { ConstructionSparkleEffect } from './ConstructionSparkleEffect';

export type PlacementPhase =
  | 'idle'
  | 'selecting_plot'
  | 'selecting_asset'
  | 'previewing'
  | 'constructing';

interface CitySceneProps {
  plots: CityPlot[];
  placementPhase: PlacementPhase;
  selectedPlotId: string | null;
  previewAssetId: CityAssetId | null;
  constructingPlotId: string | null;
  relocateSourcePlotId: string | null;
  onSelectPlot: (plotId: string) => void;
  onOpenRelocate: (plotId: string) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  cityLevel: number;
  isConstructing?: boolean;
  constructionProgress?: number;
}

export const CityScene: React.FC<CitySceneProps> = ({
  plots,
  placementPhase,
  selectedPlotId,
  previewAssetId,
  constructingPlotId,
  relocateSourcePlotId,
  onSelectPlot,
  onOpenRelocate,
  lang,
  isDarkMode,
  cityLevel,
  isConstructing = false,
  constructionProgress = 0
}) => {
  const [hoveredPlotId, setHoveredPlotId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Match current plots with deterministic definitions
  const plotMap = new Map<string, CityPlot>();
  plots.forEach(p => plotMap.set(p.id, p));

  const selectedPlot = selectedPlotId ? plots.find(p => p.id === selectedPlotId) : null;
  const selectedPlotDef = selectedPlotId ? getPlotDefinition(selectedPlotId) : null;
  const selectedAssetDef = selectedPlot?.assetId ? CITY_ASSET_DEFINITIONS[selectedPlot.assetId] : null;

  // Scene transform for pan/zoom
  const sceneTransform = zoomLevel === 1 
    ? undefined 
    : `translate(${600 * (1 - zoomLevel)}, ${360 * (1 - zoomLevel)}) scale(${zoomLevel})`;

  return (
    <div className="relative w-full aspect-[16/10] max-h-[580px] min-h-[350px] rounded-[2.5rem] overflow-hidden border shadow-2xl transition-all select-none bg-slate-900">
      {/* 1. Zoom Controls */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 p-1 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-lg">
        <button
          onClick={() => setZoomLevel(prev => Math.min(1.3, prev + 0.15))}
          title={lang === 'th' ? 'ซูมเข้า' : 'Zoom In'}
          className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          title={lang === 'th' ? 'รีเซ็ตมุมมอง' : 'Reset View'}
          className="px-2 py-1 rounded-xl text-[11px] font-bold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
        >
          {Math.round(zoomLevel * 100)}%
        </button>
        <button
          onClick={() => setZoomLevel(prev => Math.max(0.85, prev - 0.15))}
          title={lang === 'th' ? 'ซูมออก' : 'Zoom Out'}
          className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Guide Avatar Reaction Badge */}
      <div className="absolute bottom-4 left-4 z-30 hidden sm:flex items-center gap-2.5 p-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 shadow-xl max-w-xs">
        <VoltieGuideIllustration 
          className="w-10 h-10 shrink-0" 
          mood={placementPhase === 'constructing' ? 'celebrating' : 'happy'} 
        />
        <div className="text-[11px] leading-tight">
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block">
            Voltie Eco Coach
          </span>
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            {placementPhase === 'selecting_plot'
              ? (lang === 'th' ? 'เลือกแปลงว่างที่เรืองแสงเพื่อเริ่มก่อสร้าง' : 'Choose a glowing empty plot to construct')
              : placementPhase === 'previewing'
              ? (lang === 'th' ? 'ตรวจสอบตำแหน่งโมเดลก่อนกดยืนยัน' : 'Preview building position before confirming')
              : placementPhase === 'constructing'
              ? (lang === 'th' ? 'กำลังก่อสร้างโครงสร้างสีเขียว!' : 'Constructing green infrastructure!')
              : (lang === 'th' ? 'เมืองสีเขียวสดใส พลังงานหมุนเวียนสมบูรณ์แบบ' : 'A vibrant eco-city powered by renewables')}
          </span>
        </div>
      </div>

      {/* 3. Pure SVG World Viewport (Single coordinate system 0 0 1200 720) */}
      <svg 
        viewBox="0 0 1200 720" 
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Bright cartoon sky gradient */}
          <linearGradient id="sky-day" x1="0" y1="0" x2="0" y2="720" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#bae6fd" />
            <stop offset="85%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#dcfce7" />
          </linearGradient>

          {/* Evening twilight sky gradient */}
          <linearGradient id="sky-night" x1="0" y1="0" x2="0" y2="720" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          {/* Lush Island Meadow Gradients */}
          <linearGradient id="island-top" x1="0" y1="180" x2="1200" y2="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isDarkMode ? "#064e3b" : "#4ade80"} />
            <stop offset="60%" stopColor={isDarkMode ? "#047857" : "#22c55e"} />
            <stop offset="100%" stopColor={isDarkMode ? "#022c22" : "#16a34a"} />
          </linearGradient>

          {/* River / Canal Gradient */}
          <linearGradient id="river-grad" x1="400" y1="300" x2="500" y2="650" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isDarkMode ? "#0369a1" : "#38bdf8"} />
            <stop offset="100%" stopColor={isDarkMode ? "#0c4a6e" : "#0284c7"} />
          </linearGradient>

          {/* Distant Hills Gradient */}
          <linearGradient id="hills-grad" x1="0" y1="120" x2="0" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isDarkMode ? "#1e293b" : "#86efac"} />
            <stop offset="100%" stopColor={isDarkMode ? "#0f172a" : "#4ade80"} />
          </linearGradient>
        </defs>

        {/* Sky Background */}
        <rect width="1200" height="720" fill={isDarkMode ? "url(#sky-night)" : "url(#sky-day)"} />

        {/* Clouds / Stars */}
        {isDarkMode ? (
          <g fill="#fef08a" opacity="0.8" pointerEvents="none">
            <circle cx="150" cy="80" r="1.5" />
            <circle cx="280" cy="50" r="2" />
            <circle cx="450" cy="90" r="1.5" />
            <circle cx="680" cy="40" r="2.5" />
            <circle cx="820" cy="75" r="1.5" />
            <circle cx="1020" cy="60" r="2" />
            {/* Crescent Moon */}
            <path d="M 1050 40 A 18 18 0 0 0 1068 70 A 22 22 0 1 1 1050 40 Z" fill="#fef08a" />
          </g>
        ) : (
          <g fill="#ffffff" opacity="0.85" pointerEvents="none">
            {/* Fluffy Cartoon Clouds */}
            <g className="animate-pulse" style={{ animationDuration: '8s' }}>
              <ellipse cx="220" cy="90" rx="45" ry="18" />
              <ellipse cx="250" cy="80" rx="30" ry="24" />
              <ellipse cx="190" cy="92" rx="25" ry="15" />
            </g>
            <g className="animate-pulse" style={{ animationDuration: '10s' }}>
              <ellipse cx="880" cy="110" rx="55" ry="20" />
              <ellipse cx="910" cy="98" rx="35" ry="28" />
              <ellipse cx="850" cy="114" rx="30" ry="16" />
            </g>
          </g>
        )}

        {/* Master Isometric Transform Container */}
        <g transform={sceneTransform} className="transition-transform duration-300">
          
          {/* A. Non-Interactive Decorative Scenery & Land */}
          <g aria-hidden="true" pointerEvents="none">
            {/* Distant Hills and Mountains */}
            <path 
              d="M 0 280 Q 220 170 480 230 T 960 190 Q 1100 220 1200 250 L 1200 450 L 0 450 Z" 
              fill="url(#hills-grad)" 
              opacity="0.8" 
            />

            {/* Distant Eco Skyline Towers */}
            <g fill={isDarkMode ? "#1e293b" : "#e0f2fe"} stroke="#0f172a" strokeWidth="2" opacity="0.75">
              <rect x="860" y="140" width="40" height="120" rx="6" />
              <rect x="910" y="110" width="50" height="150" rx="8" fill={isDarkMode ? "#334155" : "#bae6fd"} />
              <rect x="970" y="160" width="45" height="100" rx="6" />
              {/* Miniature Solar glass grid on tower */}
              <line x1="925" y1="120" x2="925" y2="250" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="945" y1="120" x2="945" y2="250" stroke="#38bdf8" strokeWidth="1.5" />
            </g>

            {/* Main Floating Eco Island Base */}
            {/* Island Cliff Sides */}
            <path 
              d="M 60 420 L 60 460 L 600 710 L 600 670 Z" 
              fill={isDarkMode ? "#022c22" : "#166534"} 
              stroke="#0f172a" 
              strokeWidth="4" 
            />
            <path 
              d="M 600 670 L 600 710 L 1140 460 L 1140 420 Z" 
              fill={isDarkMode ? "#064e3b" : "#15803d"} 
              stroke="#0f172a" 
              strokeWidth="4" 
            />

            {/* Island Meadow Top Surface */}
            <polygon 
              points="600,170 1140,420 600,670 60,420" 
              fill="url(#island-top)" 
              stroke="#0f172a" 
              strokeWidth="4" 
              strokeLinejoin="round" 
            />

            {/* Winding Blue Eco Canal */}
            <path 
              d="M 460 235 Q 560 330 510 500 L 430 540 Q 480 370 380 270 Z" 
              fill="url(#river-grad)" 
              stroke="#0f172a" 
              strokeWidth="3" 
            />
            {/* Water Ripple Highlights */}
            <path d="M 430 330 Q 470 350 450 370" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M 480 430 Q 510 445 490 465" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

            {/* Paved Eco Walkways & Roads */}
            <path 
              d="M 600 230 L 960 400 L 600 570 L 240 400 Z" 
              fill="none" 
              stroke={isDarkMode ? "#334155" : "#f8fafc"} 
              strokeWidth="36" 
              strokeLinejoin="round" 
            />
            <path 
              d="M 600 230 L 960 400 L 600 570 L 240 400 Z" 
              fill="none" 
              stroke="#facc15" 
              strokeWidth="2.5" 
              strokeDasharray="14 10" 
              strokeLinejoin="round" 
            />

            {/* Wooden Canal Footbridge */}
            <path d="M 465 370 L 530 400 L 520 420 L 455 390 Z" fill="#b45309" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="475" y1="375" x2="465" y2="395" stroke="#78350f" strokeWidth="2" />
            <line x1="515" y1="395" x2="505" y2="415" stroke="#78350f" strokeWidth="2" />

            {/* Decorative Trees and Benches */}
            <circle cx="210" cy="370" r="14" fill="#22c55e" stroke="#0f172a" strokeWidth="2" />
            <circle cx="205" cy="365" r="10" fill="#4ade80" />
            <circle cx="980" cy="370" r="16" fill="#16a34a" stroke="#0f172a" strokeWidth="2" />
            <circle cx="975" cy="365" r="12" fill="#86efac" />
          </g>

          {/* B. Center Landmark: Permanent Eco City Hall (x=600, y=350) */}
          <g transform="translate(500, 235)" pointerEvents="none">
            <svg x="0" y="0" width="200" height="160" viewBox="0 0 200 160">
              <StarterHomeAsset isDarkMode={isDarkMode} />
            </svg>
            <g transform="translate(100, 150)">
              <rect x="-70" y="-10" width="140" height="20" rx="10" fill="#0f172a" fillOpacity="0.85" stroke="#10b981" strokeWidth="1.5" />
              <text x="0" y="4" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="900" fontFamily="sans-serif">
                {lang === 'th' ? '🏡 ศาลากลางพลังงานสะอาด' : '🏡 Eco City Hall'}
              </text>
            </g>
          </g>

          {/* C. Interactive Plot Foundations & Hit Polygons */}
          {PLOT_DEFINITIONS.map((def) => {
            const plotState = plotMap.get(def.id) || {
              id: def.id,
              labelTh: def.labelTh,
              labelEn: def.labelEn,
              x: def.anchor.x,
              y: def.anchor.y,
              unlocked: def.unlocked,
              unlockLevel: def.unlockLevel
            };

            const isOccupied = !!plotState.assetId;
            const isSelected = selectedPlotId === def.id;
            const isHovered = hoveredPlotId === def.id;
            const isSelectableForBuild = (placementPhase === 'selecting_plot' || placementPhase === 'idle') && plotState.unlocked && !isOccupied;
            const isRelocateTarget = !!relocateSourcePlotId && plotState.unlocked && !isOccupied;

            return (
              <g
                key={`plot-group-${def.id}`}
                role="button"
                tabIndex={0}
                aria-label={`${lang === 'th' ? def.labelTh : def.labelEn} - ${
                  plotState.assetId 
                    ? (lang === 'th' ? CITY_ASSET_DEFINITIONS[plotState.assetId]?.nameTh : CITY_ASSET_DEFINITIONS[plotState.assetId]?.nameEn)
                    : plotState.unlocked 
                    ? (lang === 'th' ? 'แปลงว่าง' : 'Empty Plot') 
                    : (lang === 'th' ? `ปลดล็อกที่ Lv.${def.unlockLevel}` : `Unlocks at Lv.${def.unlockLevel}`)
                }`}
                onClick={() => onSelectPlot(def.id)}
                onMouseEnter={() => setHoveredPlotId(def.id)}
                onMouseLeave={() => setHoveredPlotId(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectPlot(def.id);
                  }
                }}
                className="cursor-pointer transition-transform outline-none"
              >
                {/* 1. Plot Diamond Foundation */}
                <polygon
                  points={def.hitPoints}
                  fill={
                    isSelected
                      ? 'rgba(16, 185, 129, 0.45)'
                      : isHovered
                      ? 'rgba(52, 211, 153, 0.35)'
                      : isRelocateTarget
                      ? 'rgba(251, 191, 36, 0.4)'
                      : isSelectableForBuild
                      ? 'rgba(250, 204, 21, 0.22)'
                      : !plotState.unlocked
                      ? 'rgba(15, 23, 42, 0.45)'
                      : 'transparent'
                  }
                  stroke={
                    isSelected
                      ? '#10b981'
                      : isHovered
                      ? '#34d399'
                      : isRelocateTarget
                      ? '#fbbf24'
                      : isSelectableForBuild
                      ? '#facc15'
                      : !plotState.unlocked
                      ? '#475569'
                      : 'rgba(255, 255, 255, 0.25)'
                  }
                  strokeWidth={isSelected || isHovered || isRelocateTarget ? '3.5' : isSelectableForBuild ? '2.5' : '1.5'}
                  strokeDasharray={isSelectableForBuild || isRelocateTarget ? '8 6' : undefined}
                />

                {/* 2. Locked Indicator */}
                {!plotState.unlocked && (
                  <g transform={`translate(${def.anchor.x - 14}, ${def.anchor.y - 14})`} pointerEvents="none">
                    <circle cx="14" cy="14" r="14" fill="#0f172a" fillOpacity="0.85" stroke="#64748b" strokeWidth="1.5" />
                    <text x="14" y="18" textAnchor="middle" fill="#94a3b8" fontSize="12">🔒</text>
                  </g>
                )}

                {/* 3. Empty Glowing Build Target Icon */}
                {plotState.unlocked && !isOccupied && (isSelectableForBuild || isRelocateTarget) && (
                  <g transform={`translate(${def.anchor.x - 14}, ${def.anchor.y - 14})`} pointerEvents="none" className="animate-bounce">
                    <circle cx="14" cy="14" r="15" fill={isRelocateTarget ? "#fbbf24" : "#facc15"} stroke="#0f172a" strokeWidth="2" />
                    <text x="14" y="19" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">
                      {isRelocateTarget ? '📍' : '+'}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* D. Render Placed Building Models (Centered exactly on plot.anchor) */}
          {plots.map((plot) => {
            if (!plot.assetId) return null;
            const isSelected = selectedPlotId === plot.id;
            const isBeingConstructed = constructingPlotId === plot.id;

            return (
              <g
                key={`building-${plot.id}`}
                transform={`translate(${plot.x - 100}, ${plot.y - 115})`}
                onClick={() => onSelectPlot(plot.id)}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {/* Building SVG Asset */}
                <svg x="0" y="0" width="200" height="160" viewBox="0 0 200 160">
                  <CityAssetSprite assetId={plot.assetId} isDarkMode={isDarkMode} />
                </svg>

                {/* Selected Ring */}
                {isSelected && (
                  <ellipse cx="100" cy="115" rx="72" ry="28" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="6 4" />
                )}

                {/* Non-interactive name pill */}
                <g transform="translate(100, 142)" pointerEvents="none">
                  <rect x="-60" y="-9" width="120" height="18" rx="9" fill="#0f172a" fillOpacity="0.88" stroke="#334155" strokeWidth="1" />
                  <circle cx="-48" cy="0" r="3" fill="#10b981" />
                  <text x="-40" y="3.5" fill="#f8fafc" fontSize="9" fontWeight="800" fontFamily="sans-serif">
                    {lang === 'th' ? CITY_ASSET_DEFINITIONS[plot.assetId]?.nameTh.slice(0, 14) : CITY_ASSET_DEFINITIONS[plot.assetId]?.nameEn.slice(0, 16)}
                  </text>
                </g>

                {/* Construction Sparks Burst Animation */}
                {isBeingConstructed && (
                  <g transform="translate(100, 80)" pointerEvents="none" className="animate-ping">
                    <circle cx="0" cy="0" r="35" fill="none" stroke="#facc15" strokeWidth="4" />
                    <circle cx="0" cy="0" r="20" fill="none" stroke="#34d399" strokeWidth="3" />
                  </g>
                )}
              </g>
            );
          })}

          {/* E. Ghost Preview on Active Plot in Preview Mode */}
          {placementPhase === 'previewing' && selectedPlotDef && previewAssetId && (
            <g
              transform={`translate(${selectedPlotDef.anchor.x - 100}, ${selectedPlotDef.anchor.y - 115})`}
              pointerEvents="none"
              className="animate-pulse"
            >
              {/* Pulsing Blueprint Ring */}
              <ellipse cx="100" cy="115" rx="74" ry="30" fill="rgba(52, 211, 153, 0.25)" stroke="#10b981" strokeWidth="3" strokeDasharray="8 4" />
              
              {/* Semi-transparent ghost asset model */}
              <svg x="0" y="0" width="200" height="160" viewBox="0 0 200 160">
                <CityAssetSprite assetId={previewAssetId} isDarkMode={isDarkMode} ghost />
              </svg>

              {/* Preview Tag */}
              <g transform="translate(100, 142)">
                <rect x="-65" y="-10" width="130" height="20" rx="10" fill="#059669" stroke="#facc15" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900" fontFamily="sans-serif">
                  ✨ {lang === 'th' ? 'พรีวิวสิ่งก่อสร้าง' : 'Previewing Placement'}
                </text>
              </g>
            </g>
          )}

          {/* F. Construction Sparkle Sequence (2-Second Accessible Sparkle & Building Aura with prefers-reduced-motion) */}
          {placementPhase === 'constructing' && constructingPlotId && (
            (() => {
              const def = getPlotDefinition(constructingPlotId);
              if (!def) return null;
              return (
                <ConstructionSparkleEffect
                  key={`sparkle-${constructingPlotId}`}
                  x={def.anchor.x}
                  y={def.anchor.y}
                  progress={constructionProgress}
                  lang={lang}
                  isDarkMode={isDarkMode}
                />
              );
            })()
          )}
        </g>
      </svg>

      {/* 4. In-Scene Compact Asset Inspector Popover (When an occupied plot is clicked in idle mode) */}
      <AnimatePresence>
        {selectedPlot && selectedAssetDef && placementPhase === 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className={`absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl z-40 ${
              isDarkMode 
                ? 'bg-slate-900/95 border-slate-700 text-white' 
                : 'bg-white/95 border-emerald-100 text-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">
                  {lang === 'th' ? selectedPlot.labelTh : selectedPlot.labelEn}
                </span>
                <h4 className="text-base font-extrabold font-display leading-tight">
                  {lang === 'th' ? selectedAssetDef.nameTh : selectedAssetDef.nameEn}
                </h4>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onOpenRelocate(selectedPlot.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  title={lang === 'th' ? 'ย้ายตำแหน่งสิ่งก่อสร้างนี้ไปยังแปลงว่าง' : 'Relocate this building to an empty plot'}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'th' ? 'ย้ายตำแหน่ง' : 'Relocate'}</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {lang === 'th' ? selectedAssetDef.descriptionTh : selectedAssetDef.descriptionEn}
            </p>

            <div className="mt-3 flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span>{lang === 'th' ? selectedAssetDef.impactTh : selectedAssetDef.impactEn}</span>
              </span>
              <span>+{selectedAssetDef.savingBahtMonth} ฿/mo</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
