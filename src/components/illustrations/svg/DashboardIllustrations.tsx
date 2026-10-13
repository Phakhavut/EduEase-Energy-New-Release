import React from 'react';

interface SvgProps {
  isDarkMode?: boolean;
  gradId: string;
}

export const EnergyOverviewSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`bgGlow_${gradId}`} x1="60" y1="20" x2="60" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1EC1CB" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#1EC1CB" stopOpacity="0.02" />
      </linearGradient>
      <linearGradient id={`houseWall_${gradId}`} x1="30" y1="40" x2="80" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={isDarkMode ? '#2D2D40' : '#F1F5F9'} />
        <stop offset="100%" stopColor={isDarkMode ? '#1C1C28' : '#E2E6EE'} />
      </linearGradient>
      <linearGradient id={`roofGrad_${gradId}`} x1="25" y1="25" x2="85" y2="55" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4DE5EE" />
        <stop offset="50%" stopColor="#1EC1CB" />
        <stop offset="100%" stopColor="#169EA7" />
      </linearGradient>
      <linearGradient id={`sparkGrad_${gradId}`} x1="85" y1="15" x2="105" y2="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
      <linearGradient id={`chartGrad_${gradId}`} x1="60" y1="65" x2="95" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1EC1CB" />
        <stop offset="100%" stopColor="#169EA7" />
      </linearGradient>
    </defs>

    {/* Ambient Backdrop Glow */}
    <circle cx="60" cy="60" r="46" fill={`url(#bgGlow_${gradId})`} />
    
    {/* Base Contact Shadow */}
    <ellipse cx="60" cy="98" rx="42" ry="7" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.8" />

    {/* Modern Eco House Body */}
    <path 
      d="M30 52 L60 30 L90 52 V90 C90 93.3 87.3 96 84 96 H36 C32.7 96 30 93.3 30 90 Z" 
      fill={`url(#houseWall_${gradId})`}
      stroke={isDarkMode ? '#38384E' : '#CBD5E1'}
      strokeWidth="1.5"
    />

    {/* Architectural Cyan Roof */}
    <path 
      d="M26 53 L58.5 28.5 C59.4 27.8 60.6 27.8 61.5 28.5 L94 53 C94.8 53.6 94.4 55 93.3 55 H86 L60 35 L34 55 H26.7 C25.6 55 25.2 53.6 26 53 Z" 
      fill={`url(#roofGrad_${gradId})`}
    />

    {/* Rooftop Mini Solar Panel */}
    <rect x="42" y="38" width="16" height="10" rx="2" fill="#1EC1CB" fillOpacity="0.85" stroke="#169EA7" strokeWidth="1" transform="rotate(-15 42 38)" />

    {/* Smart Door & Energy Hub */}
    <rect x="52" y="68" width="16" height="28" rx="3" fill={isDarkMode ? '#14141E' : '#FFFFFF'} stroke={isDarkMode ? '#2D2D40' : '#CBD5E1'} strokeWidth="1.2" />
    <circle cx="56" cy="82" r="1.5" fill="#1EC1CB" />

    {/* Glowing Energy Analytics Card Overlay */}
    <g transform="translate(68, 56)">
      <rect x="0" y="0" width="38" height="28" rx="6" fill={isDarkMode ? '#242435' : '#FFFFFF'} stroke={isDarkMode ? '#38384E' : '#E2E6EE'} strokeWidth="1.2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))" />
      {/* Mini Bars */}
      <rect x="6" y="16" width="4" height="6" rx="1" fill="#94A3B8" />
      <rect x="13" y="12" width="4" height="10" rx="1" fill="#4DE5EE" />
      <rect x="20" y="8" width="4" height="14" rx="1" fill="#1EC1CB" />
      <rect x="27" y="10" width="4" height="12" rx="1" fill="#FBBF24" />
      {/* Trend line */}
      <path d="M8 14 L15 10 L22 6 L29 8" stroke="#1EC1CB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>

    {/* Energy Spark Floating Badge */}
    <g transform="translate(18, 22)">
      <circle cx="12" cy="12" r="11" fill="#FEF3C7" stroke="#FDE047" strokeWidth="1.2" />
      <path d="M13 4 L8 12 H13 L11 20 L17 11 H12 L13 4 Z" fill="#F59E0B" />
    </g>

    {/* Ambient Floating Particle Dots */}
    <circle cx="102" cy="34" r="2.5" fill="#1EC1CB" fillOpacity="0.7" />
    <circle cx="22" cy="78" r="2" fill="#4DE5EE" fillOpacity="0.6" />
  </svg>
);

export const EnergySavingSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`bulbGlow_${gradId}`} x1="60" y1="20" x2="60" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#1EC1CB" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id={`bulbGlass_${gradId}`} x1="40" y1="25" x2="80" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF9C3" />
        <stop offset="100%" stopColor="#FDE047" />
      </linearGradient>
      <linearGradient id={`leafGrad_${gradId}`} x1="65" y1="40" x2="95" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4DE5EE" />
        <stop offset="50%" stopColor="#1EC1CB" />
        <stop offset="100%" stopColor="#169EA7" />
      </linearGradient>
      <linearGradient id={`downArrowGrad_${gradId}`} x1="20" y1="60" x2="35" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1EC1CB" />
        <stop offset="100%" stopColor="#169EA7" />
      </linearGradient>
    </defs>

    {/* Ambient Glow */}
    <circle cx="60" cy="50" r="44" fill={`url(#bulbGlow_${gradId})`} />
    <ellipse cx="60" cy="100" rx="36" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.7" />

    {/* Light Bulb Glass Body */}
    <path 
      d="M60 22 C46.2 22 35 33.2 35 47 C35 56.5 40.5 64.7 48.5 68.8 V75 C48.5 76.7 49.8 78 51.5 78 H68.5 C70.2 78 71.5 76.7 71.5 75 V68.8 C79.5 64.7 85 56.5 85 47 C85 33.2 73.8 22 60 22 Z" 
      fill={`url(#bulbGlass_${gradId})`}
      stroke="#F59E0B"
      strokeWidth="1.5"
    />

    {/* Bulb Inner Filament with Spark */}
    <path 
      d="M52 50 C52 44 56 40 60 40 C64 40 68 44 68 50 L64 56 H56 L52 50 Z" 
      stroke="#D97706" 
      strokeWidth="1.4" 
      fill="none" 
      strokeLinecap="round" 
    />
    <path d="M60 36 L61 31 M48 40 L44 37 M72 40 L76 37" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />

    {/* Bulb Metallic Screw Base */}
    <rect x="50" y="78" width="20" height="4" rx="1.5" fill={isDarkMode ? '#38384E' : '#CBD5E1'} />
    <rect x="52" y="83" width="16" height="4" rx="1.5" fill={isDarkMode ? '#2D2D40' : '#94A3B8'} />
    <path d="M55 88 C55 89.5 57 91 60 91 C63 91 65 89.5 65 88 H55 Z" fill={isDarkMode ? '#1C1C28' : '#64748B'} />

    {/* Sprouting Eco Leaf on Side */}
    <path 
      d="M68 52 C78 45 92 48 95 62 C96 68 91 75 82 74 C73 73 68 64 68 52 Z" 
      fill={`url(#leafGrad_${gradId})`}
      stroke="#156D74"
      strokeWidth="1.2"
    />
    <path d="M72 58 C78 61 86 64 92 64" stroke="#A7F3F7" strokeWidth="1" strokeLinecap="round" fill="none" />

    {/* Downward Cost Saver Arrow Badge */}
    <g transform="translate(18, 60)">
      <circle cx="14" cy="14" r="13" fill={isDarkMode ? 'rgba(30, 193, 203, 0.2)' : '#E0F7F9'} stroke="#1EC1CB" strokeWidth="1.4" />
      <path d="M14 8 V20 M14 20 L9 15 M14 20 L19 15" stroke="#169EA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Little energy sparks */}
    <circle cx="98" cy="38" r="2" fill="#FBBF24" />
    <circle cx="26" cy="34" r="2.5" fill="#1EC1CB" />
  </svg>
);

export const ElectricityBillSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`billBg_${gradId}`} x1="30" y1="20" x2="85" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={isDarkMode ? '#242435' : '#FFFFFF'} />
        <stop offset="100%" stopColor={isDarkMode ? '#1C1C28' : '#F5F7FA'} />
      </linearGradient>
      <linearGradient id={`coinGrad_${gradId}`} x1="70" y1="65" x2="98" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>

    {/* Ambient shadow */}
    <ellipse cx="60" cy="98" rx="40" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.7" />

    {/* Bill Document Card */}
    <rect 
      x="32" 
      y="18" 
      width="56" 
      height="76" 
      rx="8" 
      fill={`url(#billBg_${gradId})`}
      stroke={isDarkMode ? '#38384E' : '#CBD5E1'}
      strokeWidth="1.5"
    />

    {/* Bill Header Stripe */}
    <rect x="33" y="19" width="54" height="16" rx="7" fill={isDarkMode ? '#2D2D40' : '#F1F5F9'} />
    <rect x="40" y="26" width="22" height="4" rx="2" fill="#1EC1CB" />
    <circle cx="78" cy="27" r="3" fill="#4DE5EE" />

    {/* Lightning Stamp in Bill */}
    <circle cx="60" cy="50" r="10" fill={isDarkMode ? '#1C1C28' : '#FEF3C7'} stroke="#FBBF24" strokeWidth="1" />
    <path d="M61 43 L56 49 H61 L59 57 L65 48 H60 L61 43 Z" fill="#F59E0B" />

    {/* Itemized Lines */}
    <rect x="40" y="66" width="30" height="3" rx="1.5" fill={isDarkMode ? '#38384E' : '#CBD5E1'} />
    <rect x="74" y="66" width="8" height="3" rx="1.5" fill={isDarkMode ? '#64748B' : '#94A3B8'} />
    <rect x="40" y="73" width="24" height="3" rx="1.5" fill={isDarkMode ? '#38384E' : '#CBD5E1'} />
    <rect x="74" y="73" width="8" height="3" rx="1.5" fill={isDarkMode ? '#64748B' : '#94A3B8'} />

    {/* Serrated Cutout at bottom */}
    <path d="M36 94 L41 90 L46 94 L51 90 L56 94 L61 90 L66 94 L71 90 L76 94 L81 90 L84 94" stroke={isDarkMode ? '#38384E' : '#CBD5E1'} strokeWidth="1.2" fill="none" />

    {/* Savings Token Coin in Foreground */}
    <g transform="translate(68, 62)">
      <circle cx="16" cy="16" r="14" fill={`url(#coinGrad_${gradId})`} stroke="#D97706" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="10.5" stroke="#FDE68A" strokeWidth="1" strokeDasharray="2 2" fill="none" />
      {/* ฿ or Energy symbol */}
      <path d="M16 10 V22 M12 13 H18 C19.5 13 20.5 14 20.5 15.5 C20.5 17 19.5 18 18 18 H12 H18 C19.7 18 21 19.2 21 20.5 C21 21.8 19.7 23 18 23 H12" stroke="#92400E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>

    {/* Small cyan saving leaf accent */}
    <path d="M22 68 C22 58 32 56 36 64 C36 72 28 74 22 68 Z" fill="#1EC1CB" />
  </svg>
);
