import React from 'react';

interface SvgProps {
  isDarkMode?: boolean;
  gradId: string;
}

export const BudgetPlanningSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`walletBg_${gradId}`} x1="30" y1="35" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>
    </defs>

    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Wallet Main Body */}
    <rect 
      x="26" 
      y="38" 
      width="68" 
      height="54" 
      rx="10" 
      fill={`url(#walletBg_${gradId})`}
      stroke="#15803D"
      strokeWidth="1.5"
    />

    {/* Flap & Clasp */}
    <path d="M26 48 H94 V58 C94 63.5 89.5 68 84 68 H36 C30.5 68 26 63.5 26 58 Z" fill="#15803D" />
    <circle cx="60" cy="62" r="4" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />

    {/* Emerging Energy Budget Card */}
    <g transform="translate(38, 16)">
      <rect x="0" y="0" width="44" height="28" rx="5" fill={isDarkMode ? '#1E293B' : '#FFFFFF'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1.2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))" />
      <rect x="6" y="8" width="18" height="4" rx="2" fill="#60A5FA" />
      {/* Progress Bar inside Card */}
      <rect x="6" y="16" width="32" height="4" rx="2" fill={isDarkMode ? '#334155' : '#E2E8F0'} />
      <rect x="6" y="16" width="22" height="4" rx="2" fill="#22C55E" />
    </g>

    {/* Saving Coin */}
    <g transform="translate(74, 62)">
      <circle cx="12" cy="12" r="10" fill="#FDE047" stroke="#D97706" strokeWidth="1.2" />
      <path d="M12 7 V17 M9 9.5 H13.5 C14.5 9.5 15 10 15 11 C15 12 14.5 12.5 13.5 12.5 H9" stroke="#92400E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  </svg>
);

export const UnderBudgetSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Wallet */}
    <rect x="26" y="44" width="68" height="48" rx="10" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
    <path d="M26 54 H94 V62 C94 67.5 89.5 72 84 72 H36 C30.5 72 26 67.5 26 62 Z" fill="#15803D" />
    <circle cx="60" cy="66" r="3.5" fill="#FBBF24" />

    {/* Big Green Shield Checkmark badge in center top */}
    <g transform="translate(42, 14)">
      <circle cx="18" cy="18" r="16" fill={isDarkMode ? '#1E293B' : '#DCFCE7'} stroke="#22C55E" strokeWidth="2" filter="drop-shadow(0 4px 8px rgba(34, 197, 94, 0.25))" />
      <path d="M11 18 L16 23 L25 14" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Sparkling Saved Energy Stars */}
    <circle cx="22" cy="36" r="3" fill="#FBBF24" />
    <circle cx="96" cy="38" r="2.5" fill="#4ADE80" />
    <circle cx="18" cy="74" r="2" fill="#60A5FA" />
  </svg>
);

export const OverBudgetSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Clean Bill Document with Warm/Amber warning accent */}
    <rect x="30" y="24" width="60" height="70" rx="8" fill={isDarkMode ? '#1E293B' : '#FFFFFF'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    
    {/* Bill Top Header */}
    <rect x="31" y="25" width="58" height="14" rx="7" fill={isDarkMode ? '#334155' : '#F8FAFC'} />
    <rect x="38" y="30" width="22" height="4" rx="2" fill="#F59E0B" />

    {/* Energy spike bar chart */}
    <rect x="40" y="66" width="6" height="14" rx="1.5" fill="#94A3B8" />
    <rect x="50" y="58" width="6" height="22" rx="1.5" fill="#60A5FA" />
    <rect x="60" y="48" width="6" height="32" rx="1.5" fill="#22C55E" />
    <rect x="70" y="42" width="6" height="38" rx="1.5" fill="#F59E0B" />

    {/* Gentle Amber Warning Badge */}
    <g transform="translate(68, 12)">
      <circle cx="14" cy="14" r="13" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" filter="drop-shadow(0 4px 6px rgba(245, 158, 11, 0.2))" />
      <path d="M14 8 V16 M14 19 V20" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

export const AnalyticsChartSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="42" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Dashboard Chart Screen */}
    <rect x="22" y="24" width="76" height="66" rx="8" fill={isDarkMode ? '#1E293B' : '#FFFFFF'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1.5" />

    {/* Grid Lines */}
    <line x1="30" y1="44" x2="90" y2="44" stroke={isDarkMode ? '#334155' : '#F1F5F9'} strokeWidth="1" />
    <line x1="30" y1="62" x2="90" y2="62" stroke={isDarkMode ? '#334155' : '#F1F5F9'} strokeWidth="1" />
    <line x1="30" y1="80" x2="90" y2="80" stroke={isDarkMode ? '#334155' : '#F1F5F9'} strokeWidth="1" />

    {/* Energy Bars */}
    <rect x="34" y="58" width="8" height="22" rx="2" fill="#60A5FA" />
    <rect x="46" y="48" width="8" height="32" rx="2" fill="#22C55E" />
    <rect x="58" y="38" width="8" height="42" rx="2" fill="#FBBF24" />
    <rect x="70" y="52" width="8" height="28" rx="2" fill="#22C55E" />

    {/* Upward Smooth Trend Curve */}
    <path d="M38 60 Q50 36 62 40 T86 32" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="86" cy="32" r="3" fill="#16A34A" />

    {/* Magnifying Glass Explorer in Bottom Right */}
    <g transform="translate(68, 56)">
      <circle cx="16" cy="16" r="12" fill={isDarkMode ? '#0F172A' : '#FFFFFF'} stroke="#60A5FA" strokeWidth="2" />
      <path d="M25 25 L34 34" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="16" r="6" fill="#DCFCE7" />
    </g>
  </svg>
);

export const NoDataSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Empty Chart Frame (Dashed) */}
    <rect 
      x="28" 
      y="28" 
      width="64" 
      height="62" 
      rx="8" 
      fill={isDarkMode ? '#1E293B' : '#F8FAFC'} 
      stroke={isDarkMode ? '#475569' : '#CBD5E1'} 
      strokeWidth="1.5" 
      strokeDasharray="4 4" 
    />

    {/* Ghost Grid Lines */}
    <line x1="38" y1="46" x2="82" y2="46" stroke={isDarkMode ? '#334155' : '#E2E8F0'} strokeWidth="1" strokeDasharray="2 2" />
    <line x1="38" y1="62" x2="82" y2="62" stroke={isDarkMode ? '#334155' : '#E2E8F0'} strokeWidth="1" strokeDasharray="2 2" />
    <line x1="38" y1="78" x2="82" y2="78" stroke={isDarkMode ? '#334155' : '#E2E8F0'} strokeWidth="1" strokeDasharray="2 2" />

    {/* Subtle Energy Compass / Search Indicator */}
    <circle cx="60" cy="58" r="14" fill={isDarkMode ? '#334155' : '#F1F5F9'} stroke={isDarkMode ? '#475569' : '#94A3B8'} strokeWidth="1.2" />
    <path d="M60 48 L63 56 L71 58 L63 60 L60 68 L57 60 L49 58 L57 56 Z" fill="#94A3B8" />
  </svg>
);
