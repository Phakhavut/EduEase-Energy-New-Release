import React from 'react';

interface SvgProps {
  isDarkMode?: boolean;
  gradId: string;
}

export const EmptyAppliancesSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="40" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.75" />

    {/* Dashed Appliance Stand Frame */}
    <rect 
      x="28" 
      y="32" 
      width="64" 
      height="62" 
      rx="10" 
      fill={isDarkMode ? '#1C1C28' : '#F8FAFC'} 
      stroke={isDarkMode ? '#38384E' : '#94A3B8'} 
      strokeWidth="1.5" 
      strokeDasharray="4 4" 
    />

    {/* Center Plus Action Node */}
    <circle cx="60" cy="63" r="16" fill={isDarkMode ? 'rgba(30, 193, 203, 0.2)' : '#E0F7F9'} stroke="#1EC1CB" strokeWidth="1.5" />
    <path d="M60 53 V73 M50 63 H70" stroke="#169EA7" strokeWidth="3" strokeLinecap="round" />

    {/* Ghost Plug Socket */}
    <rect x="44" y="24" width="32" height="8" rx="3" fill={isDarkMode ? '#242435' : '#E2E8F0'} />
    <rect x="52" y="20" width="4" height="4" fill="#94A3B8" />
    <rect x="64" y="20" width="4" height="4" fill="#94A3B8" />
  </svg>
);

export const EmptyLocationsSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="40" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.75" />

    {/* Map Grid Plate */}
    <path d="M26 44 L50 34 L74 44 L94 36 V84 L74 92 L50 82 L26 92 Z" fill={isDarkMode ? '#1C1C28' : '#F1F5F9'} stroke={isDarkMode ? '#38384E' : '#CBD5E1'} strokeWidth="1.2" />
    <line x1="50" y1="34" x2="50" y2="82" stroke={isDarkMode ? '#2D2D40' : '#E2E8F0'} strokeWidth="1" />
    <line x1="74" y1="44" x2="74" y2="92" stroke={isDarkMode ? '#2D2D40' : '#E2E8F0'} strokeWidth="1" />

    {/* Glowing Cyan Map Pin with Add Icon */}
    <g transform="translate(44, 26)">
      <path d="M16 0 C7 0 0 7 0 16 C0 26 16 38 16 38 C16 38 32 26 32 16 C32 7 25 0 16 0 Z" fill="#1EC1CB" stroke="#156D74" strokeWidth="1.5" />
      <circle cx="16" cy="15" r="9" fill="#FFFFFF" />
      <path d="M16 10 V20 M11 15 H21" stroke="#169EA7" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  </svg>
);

export const EmptyDataSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.75" />

    {/* Clipboard Pad */}
    <rect x="30" y="24" width="60" height="72" rx="8" fill={isDarkMode ? '#1C1C28' : '#FFFFFF'} stroke={isDarkMode ? '#38384E' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Clip Top */}
    <rect x="46" y="18" width="28" height="10" rx="3" fill="#1EC1CB" />

    {/* Dashed Chart Placeholder Lines */}
    <line x1="40" y1="44" x2="80" y2="44" stroke={isDarkMode ? '#2D2D40' : '#E2E8F0'} strokeWidth="2" strokeDasharray="3 3" />
    <line x1="40" y1="56" x2="72" y2="56" stroke={isDarkMode ? '#2D2D40' : '#E2E8F0'} strokeWidth="2" strokeDasharray="3 3" />
    <line x1="40" y1="68" x2="76" y2="68" stroke={isDarkMode ? '#2D2D40' : '#E2E8F0'} strokeWidth="2" strokeDasharray="3 3" />

    {/* Waiting Energy Pulse */}
    <circle cx="60" cy="80" r="4" fill="#4DE5EE" />
    <circle cx="60" cy="80" r="8" stroke="#4DE5EE" strokeWidth="1" strokeDasharray="2 2" fill="none" />
  </svg>
);

export const EmptyNotificationsSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="36" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.75" />

    {/* Clean Bell Outline with Gentle Sleep / Calm Waves */}
    <path 
      d="M60 22 C48 22 42 32 42 48 C42 62 34 68 34 72 H86 C86 68 78 62 78 48 C78 32 72 22 60 22 Z" 
      fill={isDarkMode ? '#1C1C28' : '#F8FAFC'} 
      stroke={isDarkMode ? '#38384E' : '#CBD5E1'} 
      strokeWidth="1.5" 
    />
    <circle cx="60" cy="18" r="3" fill="#1EC1CB" />
    {/* Clapper */}
    <path d="M54 74 C54 78 57 82 60 82 C63 82 66 78 66 74" fill={isDarkMode ? '#38384E' : '#94A3B8'} />

    {/* Quiet Calm Sleep Zzz / Spark */}
    <g transform="translate(74, 20)">
      <circle cx="10" cy="10" r="9" fill={isDarkMode ? 'rgba(30, 193, 203, 0.2)' : '#E0F7F9'} stroke="#1EC1CB" strokeWidth="1" />
      <path d="M6 8 H14 L6 14 H14" stroke="#169EA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  </svg>
);

export const EmptySearchSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.75" />

    {/* Search Lens Frame */}
    <circle cx="52" cy="50" r="24" fill={isDarkMode ? '#1C1C28' : '#F8FAFC'} stroke="#1EC1CB" strokeWidth="2.5" />
    <path d="M70 68 L92 90" stroke="#169EA7" strokeWidth="4.5" strokeLinecap="round" />

    {/* Friendly Question / Spark in Lens */}
    <circle cx="52" cy="50" r="8" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="1.2" />
    <path d="M52 46 V50 M52 53 V53.5" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const DisconnectedSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.75" />

    {/* Cloud / Network Icon */}
    <path 
      d="M34 68 C28 68 24 64 24 58 C24 53 28 48 34 48 C36 40 44 34 54 34 C64 34 72 40 74 48 C80 48 86 52 86 58 C86 64 80 68 74 68 Z" 
      fill={isDarkMode ? '#1C1C28' : '#F1F5F9'} 
      stroke={isDarkMode ? '#38384E' : '#CBD5E1'} 
      strokeWidth="1.5" 
    />

    {/* Disconnected Plug Plugs Separated */}
    <rect x="42" y="58" width="10" height="16" rx="2" fill="#64748B" />
    <rect x="68" y="58" width="10" height="16" rx="2" fill="#64748B" />
    <line x1="52" y1="62" x2="58" y2="62" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <line x1="52" y1="70" x2="58" y2="70" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

    {/* Reconnect Pulse Wave */}
    <path d="M56 78 L64 78" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
  </svg>
);

export const LoadingStateSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="36" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.75" />

    {/* Synchronized Orbital Energy Ring */}
    <circle cx="60" cy="54" r="28" stroke={isDarkMode ? '#2D2D40' : '#E2E8F0'} strokeWidth="4" fill="none" />
    <path d="M60 26 A 28 28 0 0 1 88 54" stroke="#1EC1CB" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M60 82 A 28 28 0 0 1 32 54" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* Center Pulsing Spark */}
    <circle cx="60" cy="54" r="10" fill="#1EC1CB" />
    <path d="M60 49 L62 53 L66 54 L62 56 L60 60 L58 56 L54 54 L58 53 Z" fill="#FFFFFF" />
  </svg>
);

export const ErrorStateSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.75" />

    {/* Friendly Caution Hexagon / Shield */}
    <path 
      d="M60 22 L88 38 V66 L60 82 L32 66 V38 Z" 
      fill={isDarkMode ? '#1C1C28' : '#FEF3C7'} 
      stroke="#F59E0B" 
      strokeWidth="2" 
    />

    {/* Exclamation Point in Warm Amber */}
    <path d="M60 36 V54" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="60" cy="64" r="2.5" fill="#D97706" />

    {/* Refresh Suggestion */}
    <g transform="translate(74, 62)">
      <circle cx="12" cy="12" r="10" fill={isDarkMode ? 'rgba(30, 193, 203, 0.2)' : '#E0F7F9'} stroke="#1EC1CB" strokeWidth="1.2" />
      <path d="M8 12 A 4 4 0 1 1 12 16 M12 14 V16 H14" stroke="#169EA7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

export const SuccessActionSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.75" />

    {/* Big Celebratory Cyan Checkmark Shield */}
    <circle cx="60" cy="54" r="28" fill="#1EC1CB" stroke="#156D74" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(30, 193, 203, 0.3))" />
    <path d="M46 54 L55 63 L74 44" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Radiating Energy Bursts */}
    <circle cx="28" cy="30" r="3" fill="#FBBF24" />
    <circle cx="92" cy="30" r="3" fill="#4DE5EE" />
    <circle cx="60" cy="14" r="2.5" fill="#4DE5EE" />
    <circle cx="24" cy="70" r="2" fill="#4DE5EE" />
    <circle cx="96" cy="70" r="2" fill="#FBBF24" />
  </svg>
);
