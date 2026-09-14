import React from 'react';

interface SvgProps {
  isDarkMode?: boolean;
  gradId: string;
}

export const CityOverviewSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`citySky_${gradId}`} x1="60" y1="20" x2="60" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#DCFCE7" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.05" />
      </linearGradient>
    </defs>

    {/* Rolling Green Earth Base */}
    <ellipse cx="60" cy="100" rx="46" ry="10" fill="#22C55E" />
    <ellipse cx="60" cy="98" rx="44" ry="8" fill="#4ADE80" />

    {/* Background Building 1 */}
    <rect x="26" y="44" width="22" height="48" rx="4" fill={isDarkMode ? '#334155' : '#E2E8F0'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1" />
    <rect x="30" y="52" width="6" height="6" rx="1" fill="#60A5FA" fillOpacity="0.7" />
    <rect x="38" y="52" width="6" height="6" rx="1" fill="#FEF08A" />
    <rect x="30" y="62" width="6" height="6" rx="1" fill="#FEF08A" />
    <rect x="38" y="62" width="6" height="6" rx="1" fill="#60A5FA" fillOpacity="0.7" />

    {/* Center Eco Tower with Solar Rooftop */}
    <rect x="46" y="28" width="28" height="64" rx="5" fill={isDarkMode ? '#1E293B' : '#FFFFFF'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    <rect x="44" y="24" width="32" height="5" rx="2.5" fill="#22C55E" />
    {/* Solar panel atop center building */}
    <path d="M52 24 L56 16 H64 L68 24 Z" fill="#60A5FA" stroke="#2563EB" strokeWidth="1" />
    {/* Windows */}
    <rect x="52" y="36" width="16" height="6" rx="1.5" fill="#60A5FA" fillOpacity="0.8" />
    <rect x="52" y="46" width="16" height="6" rx="1.5" fill="#FEF08A" />
    <rect x="52" y="56" width="16" height="6" rx="1.5" fill="#60A5FA" fillOpacity="0.8" />
    <rect x="52" y="66" width="16" height="6" rx="1.5" fill="#FEF08A" />

    {/* Right Building */}
    <rect x="72" y="40" width="24" height="52" rx="4" fill={isDarkMode ? '#334155' : '#F1F5F9'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1" />
    <rect x="76" y="48" width="6" height="6" rx="1" fill="#FEF08A" />
    <rect x="86" y="48" width="6" height="6" rx="1" fill="#60A5FA" fillOpacity="0.7" />
    <rect x="76" y="58" width="6" height="6" rx="1" fill="#60A5FA" fillOpacity="0.7" />
    <rect x="86" y="58" width="6" height="6" rx="1" fill="#FEF08A" />

    {/* Trees on flanks */}
    <circle cx="22" cy="82" r="7" fill="#16A34A" />
    <rect x="21" y="86" width="2" height="8" fill="#78350F" />
    <circle cx="98" cy="82" r="8" fill="#16A34A" />
    <rect x="97" y="86" width="2" height="8" fill="#78350F" />

    {/* Wind Turbine in background */}
    <g transform="translate(18, 20)">
      <path d="M12 28 V12" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#64748B" />
      <path d="M12 12 L12 2 M12 12 L20 16 M12 12 L4 16" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  </svg>
);

export const SustainableBuildingSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="40" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Sustainable Building Structure */}
    <rect x="32" y="24" width="56" height="70" rx="8" fill={isDarkMode ? '#1E293B' : '#FFFFFF'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />

    {/* Rooftop Solar Panels */}
    <rect x="30" y="20" width="60" height="6" rx="3" fill="#22C55E" />
    <rect x="38" y="10" width="18" height="10" rx="2" fill="#60A5FA" stroke="#2563EB" strokeWidth="1" transform="rotate(-15 38 10)" />
    <rect x="62" y="10" width="18" height="10" rx="2" fill="#60A5FA" stroke="#2563EB" strokeWidth="1" transform="rotate(15 62 10)" />

    {/* Vertical Garden Planter Bands */}
    <rect x="40" y="34" width="40" height="6" rx="3" fill="#4ADE80" />
    <rect x="40" y="54" width="40" height="6" rx="3" fill="#4ADE80" />
    <rect x="40" y="74" width="40" height="6" rx="3" fill="#4ADE80" />

    {/* Glass Windows */}
    <rect x="42" y="44" width="14" height="6" rx="1.5" fill="#60A5FA" fillOpacity="0.8" />
    <rect x="64" y="44" width="14" height="6" rx="1.5" fill="#FEF08A" />
    <rect x="42" y="64" width="14" height="6" rx="1.5" fill="#FEF08A" />
    <rect x="64" y="64" width="14" height="6" rx="1.5" fill="#60A5FA" fillOpacity="0.8" />

    {/* Entrance Door */}
    <rect x="52" y="82" width="16" height="12" rx="2" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} stroke="#22C55E" strokeWidth="1" />
  </svg>
);

export const TreeNatureSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Tree Trunk */}
    <path d="M56 60 L54 96 H66 L64 60 Z" fill="#78350F" stroke="#451A03" strokeWidth="1.2" />

    {/* Tree Canopy Layer 3 (Top) */}
    <circle cx="60" cy="36" r="18" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />

    {/* Tree Canopy Layer 2 (Middle Left) */}
    <circle cx="44" cy="52" r="18" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />

    {/* Tree Canopy Layer 1 (Middle Right) */}
    <circle cx="76" cy="52" r="18" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" />

    {/* Growth Energy Rings floating */}
    <circle cx="60" cy="36" r="8" fill="#FEF08A" fillOpacity="0.7" />
    <path d="M60 30 L61.5 34 L65 35.5 L62 38 L63 42 L60 40 L57 42 L58 38 L55 35.5 L58.5 34 Z" fill="#D97706" />

    {/* Sprouting Energy Rings */}
    <circle cx="94" cy="38" r="2.5" fill="#60A5FA" />
    <circle cx="26" cy="42" r="2" fill="#FBBF24" />
  </svg>
);

export const RewardTokenSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Hexagonal Eco-Crystal Token Body */}
    <path 
      d="M60 18 L92 36 V74 L60 92 L28 74 V36 Z" 
      fill="#22C55E" 
      stroke="#15803D" 
      strokeWidth="2" 
    />

    {/* Inner Crystal Facets */}
    <path d="M60 18 L60 92" stroke="#16A34A" strokeWidth="1.5" />
    <path d="M28 36 L60 55 L92 36" stroke="#4ADE80" strokeWidth="1.5" fill="#4ADE80" fillOpacity="0.25" />
    <path d="M28 74 L60 55 L92 74" stroke="#14532D" strokeWidth="1.5" />

    {/* Central Solar Spark Insignia */}
    <circle cx="60" cy="55" r="14" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="1.5" filter="drop-shadow(0 4px 6px rgba(245, 158, 11, 0.25))" />
    <path d="M61 46 L55 54 H61 L59 63 L67 53 H61 L61 46 Z" fill="#F59E0B" />
  </svg>
);

export const MissionCompletedSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="40" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Trophy Cup / Milestone Pillar */}
    <path d="M42 34 H78 V58 C78 68 70 76 60 76 C50 76 42 68 42 58 Z" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
    {/* Trophy Handles */}
    <path d="M42 40 H32 C28 40 28 54 36 54 H42" stroke="#D97706" strokeWidth="2" fill="none" />
    <path d="M78 40 H88 C92 40 92 54 84 54 H78" stroke="#D97706" strokeWidth="2" fill="none" />
    {/* Trophy Stem & Base */}
    <rect x="56" y="76" width="8" height="12" fill="#D97706" />
    <rect x="44" y="88" width="32" height="6" rx="2" fill="#B45309" />

    {/* Big Green Eco Checkmark Badge */}
    <circle cx="60" cy="52" r="12" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.5" />
    <path d="M54 52 L58 56 L66 48" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Victory Energy Sparks */}
    <circle cx="28" cy="24" r="3" fill="#22C55E" />
    <circle cx="92" cy="24" r="3" fill="#60A5FA" />
    <circle cx="60" cy="18" r="2.5" fill="#FBBF24" />
  </svg>
);
