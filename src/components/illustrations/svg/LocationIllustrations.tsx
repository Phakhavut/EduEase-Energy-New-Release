import React from 'react';

interface SvgProps {
  isDarkMode?: boolean;
  gradId: string;
}

export const LocationHomeSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`locHomeRoof_${gradId}`} x1="30" y1="20" x2="90" y2="55" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>
      <linearGradient id={`locHomeBody_${gradId}`} x1="35" y1="50" x2="85" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={isDarkMode ? '#334155' : '#F8FAFC'} />
        <stop offset="100%" stopColor={isDarkMode ? '#1E293B' : '#E2E8F0'} />
      </linearGradient>
    </defs>

    <ellipse cx="60" cy="98" rx="42" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Cozy House Main Body */}
    <rect 
      x="32" 
      y="50" 
      width="56" 
      height="44" 
      rx="6" 
      fill={`url(#locHomeBody_${gradId})`}
      stroke={isDarkMode ? '#475569' : '#CBD5E1'}
      strokeWidth="1.5"
    />

    {/* Slanted Green Roof with Overhang */}
    <path 
      d="M24 53 L58.8 24.5 C59.5 24 60.5 24 61.2 24.5 L96 53 C96.8 53.6 96.4 55 95.3 55 H86 L60 33 L34 55 H24.7 C23.6 55 23.2 53.6 24 53 Z" 
      fill={`url(#locHomeRoof_${gradId})`}
    />

    {/* Solar Window on Roof */}
    <rect x="52" y="32" width="16" height="10" rx="2" fill="#60A5FA" fillOpacity="0.9" stroke="#2563EB" strokeWidth="1" />

    {/* Front Door */}
    <rect x="50" y="66" width="20" height="28" rx="4" fill={isDarkMode ? '#0F172A' : '#FFFFFF'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1.2" />
    <circle cx="55" cy="80" r="1.5" fill="#FBBF24" />

    {/* Warm Cozy Window */}
    <rect x="74" y="62" width="10" height="12" rx="2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />
    <path d="M79 62 V74 M74 68 H84" stroke="#F59E0B" strokeWidth="0.8" />

    {/* Left Tree/Plant */}
    <circle cx="24" cy="84" r="8" fill="#4ADE80" stroke="#16A34A" strokeWidth="1" />
    <rect x="23" y="90" width="2" height="6" fill="#92400E" />

    {/* Energy Spark Badge */}
    <g transform="translate(82, 22)">
      <circle cx="12" cy="12" r="10" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="1.2" />
      <path d="M13 5 L9 12 H13 L11 19 L16 11 H12 L13 5 Z" fill="#F59E0B" />
    </g>
  </svg>
);

export const LocationDormSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`dormWall_${gradId}`} x1="30" y1="25" x2="80" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={isDarkMode ? '#334155' : '#F1F5F9'} />
        <stop offset="100%" stopColor={isDarkMode ? '#1E293B' : '#E2E8F0'} />
      </linearGradient>
    </defs>

    <ellipse cx="60" cy="98" rx="38" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Multi-Room Dormitory Building */}
    <rect 
      x="32" 
      y="28" 
      width="56" 
      height="66" 
      rx="6" 
      fill={`url(#dormWall_${gradId})`}
      stroke={isDarkMode ? '#475569' : '#CBD5E1'}
      strokeWidth="1.5"
    />

    {/* Building Top Parapet */}
    <rect x="29" y="24" width="62" height="6" rx="3" fill="#22C55E" />

    {/* Matrix of Dorm Windows */}
    {/* Row 1 */}
    <rect x="40" y="36" width="10" height="10" rx="2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />
    <rect x="55" y="36" width="10" height="10" rx="2" fill="#60A5FA" fillOpacity="0.8" stroke="#3B82F6" strokeWidth="1" />
    <rect x="70" y="36" width="10" height="10" rx="2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />

    {/* Row 2 */}
    <rect x="40" y="52" width="10" height="10" rx="2" fill="#60A5FA" fillOpacity="0.8" stroke="#3B82F6" strokeWidth="1" />
    <rect x="55" y="52" width="10" height="10" rx="2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />
    <rect x="70" y="52" width="10" height="10" rx="2" fill="#60A5FA" fillOpacity="0.8" stroke="#3B82F6" strokeWidth="1" />

    {/* Main Entrance Door */}
    <rect x="50" y="70" width="20" height="24" rx="3" fill={isDarkMode ? '#0F172A' : '#FFFFFF'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1.2" />
    <rect x="54" y="74" width="12" height="8" rx="1.5" fill="#60A5FA" fillOpacity="0.6" />

    {/* Desk Lamp Symbol overlay */}
    <g transform="translate(18, 54)">
      <circle cx="10" cy="10" r="9" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.2" />
      <path d="M7 14 L11 7 L14 14" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10 14 V16 H13" stroke="#16A34A" strokeWidth="1.2" />
    </g>
  </svg>
);

export const LocationCondoSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`condoTower_${gradId}`} x1="30" y1="15" x2="80" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={isDarkMode ? '#334155' : '#F8FAFC'} />
        <stop offset="100%" stopColor={isDarkMode ? '#1E293B' : '#E2E8F0'} />
      </linearGradient>
    </defs>

    <ellipse cx="60" cy="98" rx="42" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Tall Modern Condo Tower */}
    <rect 
      x="36" 
      y="18" 
      width="48" 
      height="76" 
      rx="6" 
      fill={`url(#condoTower_${gradId})`}
      stroke={isDarkMode ? '#475569' : '#CBD5E1'}
      strokeWidth="1.5"
    />

    {/* Rooftop Garden & Solar Canopy */}
    <rect x="33" y="14" width="54" height="6" rx="3" fill="#22C55E" />
    <path d="M44 14 L50 8 H70 L76 14" stroke="#15803D" strokeWidth="1.2" fill="#DCFCE7" />

    {/* Modern Horizontal Glass Windows */}
    <rect x="42" y="26" width="36" height="8" rx="2" fill="#60A5FA" fillOpacity="0.8" stroke="#3B82F6" strokeWidth="0.8" />
    <rect x="42" y="38" width="36" height="8" rx="2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="0.8" />
    <rect x="42" y="50" width="36" height="8" rx="2" fill="#60A5FA" fillOpacity="0.8" stroke="#3B82F6" strokeWidth="0.8" />
    <rect x="42" y="62" width="36" height="8" rx="2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="0.8" />

    {/* Glass Lobby Ground Floor */}
    <rect x="44" y="76" width="32" height="18" rx="3" fill={isDarkMode ? '#0F172A' : '#FFFFFF'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1" />
    <path d="M60 76 V94" stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1" />

    {/* Floating Energy Efficiency Badge */}
    <g transform="translate(80, 40)">
      <circle cx="12" cy="12" r="10" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.2" />
      <path d="M12 7 C9 7 7 10 7 13 C7 16 12 19 12 19 C12 19 17 16 17 13 C17 10 15 7 12 7 Z" fill="#16A34A" />
    </g>
  </svg>
);

export const LocationShopSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id={`shopWall_${gradId}`} x1="25" y1="35" x2="85" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={isDarkMode ? '#334155' : '#F8FAFC'} />
        <stop offset="100%" stopColor={isDarkMode ? '#1E293B' : '#E2E8F0'} />
      </linearGradient>
    </defs>

    <ellipse cx="60" cy="98" rx="44" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Shop Main Structure */}
    <rect 
      x="26" 
      y="42" 
      width="68" 
      height="52" 
      rx="6" 
      fill={`url(#shopWall_${gradId})`}
      stroke={isDarkMode ? '#475569' : '#CBD5E1'}
      strokeWidth="1.5"
    />

    {/* Striped Canopy / Awning */}
    <g transform="translate(22, 28)">
      <path d="M0 16 L6 0 H70 L76 16 Z" fill="#22C55E" />
      {/* Alternating White/Light stripes */}
      <path d="M12 0 L15 16 H25 L21 0 Z" fill="#FFFFFF" fillOpacity="0.9" />
      <path d="M33 0 L36 16 H46 L42 0 Z" fill="#FFFFFF" fillOpacity="0.9" />
      <path d="M54 0 L57 16 H67 L63 0 Z" fill="#FFFFFF" fillOpacity="0.9" />
      {/* Scalloped edge */}
      <path d="M0 16 Q5 20 10 16 Q15 20 20 16 Q25 20 30 16 Q35 20 40 16 Q45 20 50 16 Q55 20 60 16 Q65 20 70 16 Q75 20 76 16" fill="none" stroke="#16A34A" strokeWidth="1.5" />
    </g>

    {/* Big Display Glass Window */}
    <rect x="34" y="56" width="30" height="28" rx="3" fill="#60A5FA" fillOpacity="0.35" stroke="#3B82F6" strokeWidth="1" />
    <path d="M38 60 L48 80" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

    {/* Commercial Door */}
    <rect x="70" y="56" width="18" height="38" rx="3" fill={isDarkMode ? '#0F172A' : '#FFFFFF'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1" />
    <circle cx="74" cy="74" r="1.5" fill="#FBBF24" />

    {/* Open / Energy Sign Badge */}
    <g transform="translate(74, 14)">
      <rect x="0" y="0" width="26" height="14" rx="3" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
      <path d="M13 2 L9 8 H14 L11 12 L17 7 H12 L13 2 Z" fill="#78350F" />
    </g>
  </svg>
);

export const LocationEmptySvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="98" rx="38" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Dashed Outline House (Empty slot) */}
    <path 
      d="M32 54 L60 30 L88 54 V90 C88 93 85 96 82 96 H38 C35 96 32 93 32 90 Z" 
      fill={isDarkMode ? '#1E293B' : '#F8FAFC'}
      stroke={isDarkMode ? '#475569' : '#94A3B8'}
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />

    {/* Map Pin in Center with Plus Sign */}
    <g transform="translate(42, 38)">
      <path 
        d="M18 0 C8 0 0 8 0 18 C0 28 18 42 18 42 C18 42 36 28 36 18 C36 8 28 0 18 0 Z" 
        fill="#22C55E" 
        stroke="#16A34A" 
        strokeWidth="1.5" 
      />
      {/* White Plus Sign */}
      <circle cx="18" cy="16" r="10" fill="#FFFFFF" />
      <path d="M18 10 V22 M12 16 H24" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);
