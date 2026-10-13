import React from 'react';

interface SvgProps {
  isDarkMode?: boolean;
  gradId: string;
}

export const AiCoachSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`coachBody_${gradId}`} x1="30" y1="30" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4DE5EE" />
        <stop offset="50%" stopColor="#1EC1CB" />
        <stop offset="100%" stopColor="#169EA7" />
      </linearGradient>
      <linearGradient id={`auraGlow_${gradId}`} x1="60" y1="20" x2="60" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1EC1CB" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#1EC1CB" stopOpacity="0.02" />
      </linearGradient>
      <linearGradient id={`bubbleGrad_${gradId}`} x1="60" y1="10" x2="105" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={isDarkMode ? '#242435' : '#FFFFFF'} />
        <stop offset="100%" stopColor={isDarkMode ? '#1C1C28' : '#F5F7FA'} />
      </linearGradient>
    </defs>

    {/* Ambient Energy Aura */}
    <circle cx="58" cy="62" r="44" fill={`url(#auraGlow_${gradId})`} />
    <ellipse cx="58" cy="100" rx="34" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.7" />

    {/* Organic Assistant Body (Friendly Energy Orb Character) */}
    <g transform="translate(0, 4)">
      {/* Soft rounded bot orb */}
      <rect 
        x="32" 
        y="36" 
        width="52" 
        height="46" 
        rx="23" 
        fill={`url(#coachBody_${gradId})`}
        stroke="#156D74"
        strokeWidth="1.5"
      />

      {/* Sprouting Energy Antenna with Spark */}
      <path d="M58 36 V24" stroke="#169EA7" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="58" cy="22" r="5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M58 19 L59.5 22.5 L63 23 L60 25.5 L61 29 L58 27 L55 29 L56 25.5 L53 23 L56.5 22.5 Z" fill="#FFFFFF" />

      {/* Assistant Visor / Face Screen */}
      <rect 
        x="38" 
        y="44" 
        width="40" 
        height="26" 
        rx="13" 
        fill={isDarkMode ? '#14141E' : '#1C1C28'} 
        stroke={isDarkMode ? '#2D2D40' : '#1C1C28'} 
        strokeWidth="1.2" 
      />

      {/* Friendly Glowing Eyes (Happy Curved Eyes) */}
      <path d="M47 56 C47 53 50 51 53 51 C56 51 59 53 59 56" stroke="#4DE5EE" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M57 56 C57 53 60 51 63 51 C66 51 69 53 69 56" stroke="#4DE5EE" strokeWidth="2.4" strokeLinecap="round" fill="none" />

      {/* Subtle Rosy Energy Cheeks */}
      <circle cx="44" cy="62" r="2.5" fill="#FBBF24" fillOpacity="0.8" />
      <circle cx="72" cy="62" r="2.5" fill="#FBBF24" fillOpacity="0.8" />
    </g>

    {/* Dynamic Chat Bubble in Upper Right */}
    <g transform="translate(64, 12)">
      <path 
        d="M6 10 C6 4.5 10.5 0 16 0 H38 C43.5 0 48 4.5 48 10 V22 C48 27.5 43.5 32 38 32 H18 L10 38 V32 H16 C10.5 32 6 27.5 6 22 Z" 
        fill={`url(#bubbleGrad_${gradId})`}
        stroke={isDarkMode ? '#38384E' : '#CBD5E1'}
        strokeWidth="1.2"
        filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))"
      />
      {/* Speech lines or insight spark */}
      <path d="M16 11 H38 M16 17 H32 M16 23 H26" stroke="#1EC1CB" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Satellite Floating Eco Leaves */}
    <path d="M18 56 C18 48 26 46 29 52 C29 58 23 60 18 56 Z" fill="#1EC1CB" opacity="0.85" />
    <circle cx="28" cy="78" r="2.5" fill="#4DE5EE" />
  </svg>
);

export const RecommendationSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`cardBg_${gradId}`} x1="25" y1="20" x2="85" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={isDarkMode ? '#242435' : '#FFFFFF'} />
        <stop offset="100%" stopColor={isDarkMode ? '#1C1C28' : '#F5F7FA'} />
      </linearGradient>
      <linearGradient id={`bulbGlowRec_${gradId}`} x1="80" y1="15" x2="105" y2="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
    </defs>

    <ellipse cx="58" cy="98" rx="38" ry="6" fill={isDarkMode ? '#101018' : '#E2E6EE'} fillOpacity="0.7" />

    {/* Recommendation Checklist Card */}
    <rect 
      x="24" 
      y="22" 
      width="64" 
      height="74" 
      rx="10" 
      fill={`url(#cardBg_${gradId})`}
      stroke={isDarkMode ? '#38384E' : '#CBD5E1'}
      strokeWidth="1.5"
    />

    {/* Header Accent Bar */}
    <rect x="25" y="23" width="62" height="14" rx="9" fill={isDarkMode ? '#2D2D40' : '#F1F5F9'} />
    <rect x="34" y="28" width="24" height="4" rx="2" fill="#1EC1CB" />

    {/* Item 1 with Check */}
    <circle cx="38" cy="48" r="6" fill={isDarkMode ? 'rgba(30, 193, 203, 0.2)' : '#E0F7F9'} stroke="#1EC1CB" strokeWidth="1.2" />
    <path d="M35 48 L37.5 50.5 L42 45.5" stroke="#169EA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="48" y="46" width="30" height="4" rx="2" fill={isDarkMode ? '#E2E6EE' : '#334155'} />

    {/* Item 2 with Check */}
    <circle cx="38" cy="64" r="6" fill={isDarkMode ? 'rgba(30, 193, 203, 0.2)' : '#E0F7F9'} stroke="#1EC1CB" strokeWidth="1.2" />
    <path d="M35 64 L37.5 66.5 L42 61.5" stroke="#169EA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="48" y="62" width="24" height="4" rx="2" fill={isDarkMode ? '#94A3B8' : '#64748B'} />

    {/* Item 3 (Pending tip) */}
    <circle cx="38" cy="80" r="6" fill={isDarkMode ? '#2D2D40' : '#FEF3C7'} stroke="#FBBF24" strokeWidth="1.2" />
    <path d="M38 76 V81 M38 84 V84.5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="48" y="78" width="20" height="4" rx="2" fill={isDarkMode ? '#64748B' : '#94A3B8'} />

    {/* Floating Smart Idea Bulb in Top Right */}
    <g transform="translate(70, 10)">
      <circle cx="20" cy="20" r="18" fill={`url(#bulbGlowRec_${gradId})`} stroke="#F59E0B" strokeWidth="1.4" filter="drop-shadow(0 4px 6px rgba(251, 191, 36, 0.25))" />
      <path d="M20 10 C15 10 12 14 12 18 C12 21 14 23 16 25 V27 H24 V25 C26 23 28 21 28 18 C28 14 25 10 20 10 Z" fill="#FFFFFF" />
      <path d="M18 29 H22" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 6 V3 M32 10 L35 8 M8 10 L5 8" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
);
