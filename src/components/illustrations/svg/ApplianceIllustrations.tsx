import React from 'react';

interface SvgProps {
  isDarkMode?: boolean;
  gradId: string;
}

// 1. Air Conditioner
export const ApplianceAcSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="40" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Main AC Indoor Unit */}
    <rect x="20" y="32" width="80" height="36" rx="7" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Air Outlet Vane */}
    <path d="M24 58 H96" stroke={isDarkMode ? '#1E293B' : '#E2E8F0'} strokeWidth="2" strokeLinecap="round" />
    <path d="M26 62 H94" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
    {/* LED Display Indicator */}
    <rect x="76" y="42" width="14" height="7" rx="2" fill="#0F172A" />
    <circle cx="80" cy="45.5" r="1.2" fill="#4ADE80" />
    <circle cx="86" cy="45.5" r="1.2" fill="#60A5FA" />
    {/* Cool Air Waves */}
    <path d="M36 72 Q42 78 48 72 Q54 66 60 72" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <path d="M52 82 Q58 88 64 82 Q70 76 76 82" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <path d="M68 92 Q74 98 80 92 Q86 86 92 92" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    {/* Energy Eco Leaf Star */}
    <circle cx="34" cy="45" r="4" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1" />
    <path d="M34 42 C32 42 31 44 31 45 C31 47 34 48 34 48 C34 48 37 47 37 45 C37 44 36 42 34 42 Z" fill="#16A34A" />
  </svg>
);

// 2. Refrigerator
export const ApplianceFridgeSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="34" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Fridge Body */}
    <rect x="36" y="16" width="48" height="82" rx="8" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Freezer Division Line */}
    <line x1="36" y1="46" x2="84" y2="46" stroke={isDarkMode ? '#1E293B' : '#E2E8F0'} strokeWidth="2" />
    {/* Upper Handle */}
    <rect x="42" y="28" width="4" height="12" rx="2" fill="#22C55E" />
    {/* Lower Handle */}
    <rect x="42" y="52" width="4" height="20" rx="2" fill="#22C55E" />
    {/* Digital Dispenser / Star Rating */}
    <rect x="62" y="26" width="14" height="12" rx="2" fill="#60A5FA" fillOpacity="0.25" stroke="#3B82F6" strokeWidth="0.8" />
    <circle cx="69" cy="32" r="2" fill="#22C55E" />
    {/* Base Feet */}
    <rect x="42" y="98" width="6" height="3" rx="1" fill="#475569" />
    <rect x="72" y="98" width="6" height="3" rx="1" fill="#475569" />
  </svg>
);

// 3. Washing Machine
export const ApplianceWashingMachineSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="36" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Main Cabinet */}
    <rect x="32" y="22" width="56" height="76" rx="8" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Top Control Panel */}
    <rect x="33" y="23" width="54" height="18" rx="7" fill={isDarkMode ? '#1E293B' : '#F1F5F9'} />
    <circle cx="44" cy="32" r="4" fill="#22C55E" />
    <rect x="54" y="29" width="12" height="6" rx="2" fill="#0F172A" />
    <circle cx="76" cy="32" r="3" fill="#60A5FA" />
    {/* Front Drum Porthole */}
    <circle cx="60" cy="65" r="22" fill={isDarkMode ? '#1E293B' : '#E2E8F0'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    <circle cx="60" cy="65" r="16" fill="#60A5FA" fillOpacity="0.4" stroke="#3B82F6" strokeWidth="1.2" />
    {/* Water Swirl */}
    <path d="M52 68 Q56 60 60 68 Q64 74 68 66" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

// 4. Television
export const ApplianceTvSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="38" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* TV Screen Frame */}
    <rect x="20" y="24" width="80" height="54" rx="6" fill="#0F172A" stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Inner Display Glass */}
    <rect x="24" y="28" width="72" height="46" rx="3" fill={isDarkMode ? '#1E293B' : '#1E293B'} />
    {/* Energy Graph / Visual Pattern on Screen */}
    <path d="M30 58 L44 48 L56 56 L72 38 L88 44" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="72" cy="38" r="3" fill="#FBBF24" />
    {/* TV Stand Base */}
    <path d="M56 78 H64 V92 H56 Z" fill={isDarkMode ? '#334155' : '#94A3B8'} />
    <rect x="44" y="92" width="32" height="4" rx="2" fill={isDarkMode ? '#475569' : '#64748B'} />
  </svg>
);

// 5. Computer / Laptop
export const ApplianceComputerSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="42" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Monitor Frame */}
    <rect x="28" y="22" width="64" height="48" rx="6" fill="#0F172A" stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Screen Glass */}
    <rect x="32" y="26" width="56" height="40" rx="3" fill={isDarkMode ? '#1E293B' : '#1E293B'} />
    {/* Code / Energy Bars */}
    <rect x="38" y="34" width="20" height="3" rx="1.5" fill="#60A5FA" />
    <rect x="38" y="41" width="30" height="3" rx="1.5" fill="#22C55E" />
    <rect x="38" y="48" width="16" height="3" rx="1.5" fill="#FBBF24" />
    <circle cx="74" cy="50" r="6" fill="#22C55E" fillOpacity="0.3" stroke="#22C55E" strokeWidth="1" />
    {/* Monitor Stand */}
    <path d="M57 70 H63 V86 H57 Z" fill={isDarkMode ? '#334155' : '#94A3B8'} />
    <rect x="46" y="86" width="28" height="4" rx="2" fill={isDarkMode ? '#475569' : '#64748B'} />
    {/* Keyboard */}
    <rect x="34" y="92" width="52" height="6" rx="2" fill={isDarkMode ? '#334155' : '#E2E8F0'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1" />
  </svg>
);

// 6. Fan
export const ApplianceFanSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="34" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Fan Blade Grill Circle */}
    <circle cx="60" cy="44" r="28" fill={isDarkMode ? '#1E293B' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    <circle cx="60" cy="44" r="24" stroke={isDarkMode ? '#334155' : '#E2E8F0'} strokeWidth="1" strokeDasharray="3 3" fill="none" />
    {/* 3 Fan Blades */}
    <path d="M60 44 C60 32 68 24 72 28 C74 34 66 42 60 44 Z" fill="#22C55E" />
    <path d="M60 44 C50 48 42 56 46 60 C52 62 58 52 60 44 Z" fill="#22C55E" />
    <path d="M60 44 C68 48 74 58 68 62 C64 64 60 52 60 44 Z" fill="#22C55E" />
    {/* Center Cap */}
    <circle cx="60" cy="44" r="5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />
    {/* Fan Pole Stand */}
    <rect x="58" y="72" width="4" height="24" rx="2" fill={isDarkMode ? '#334155' : '#94A3B8'} />
    <rect x="42" y="94" width="36" height="6" rx="3" fill={isDarkMode ? '#475569' : '#CBD5E1'} stroke={isDarkMode ? '#334155' : '#94A3B8'} strokeWidth="1" />
  </svg>
);

// 7. Light Bulb / Lamp
export const ApplianceLampSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="32" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Desk Lamp Shade */}
    <path d="M42 46 L50 20 H70 L78 46 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
    {/* Warm Light Beam Glow */}
    <path d="M42 46 L28 88 H92 L78 46 Z" fill="#FEF08A" fillOpacity="0.3" />
    <circle cx="60" cy="48" r="7" fill="#FBBF24" />
    {/* Lamp Stem */}
    <path d="M60 20 V12 H76 V94" stroke={isDarkMode ? '#475569' : '#94A3B8'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="66" y="94" width="20" height="6" rx="3" fill={isDarkMode ? '#334155' : '#CBD5E1'} />
  </svg>
);

// 8. Microwave
export const ApplianceMicrowaveSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="40" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Microwave Body */}
    <rect x="22" y="34" width="76" height="54" rx="8" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Glass Door */}
    <rect x="28" y="40" width="46" height="42" rx="4" fill="#0F172A" stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1" />
    <circle cx="51" cy="61" r="10" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
    {/* Right Control Panel */}
    <rect x="78" y="40" width="14" height="42" rx="3" fill={isDarkMode ? '#1E293B' : '#F1F5F9'} />
    <rect x="80" y="44" width="10" height="6" rx="1" fill="#0F172A" />
    <circle cx="85" cy="58" r="3" fill="#22C55E" />
    <circle cx="85" cy="68" r="3" fill="#60A5FA" />
    <circle cx="85" cy="76" r="2" fill="#FBBF24" />
  </svg>
);

// 9. Electric Kettle
export const ApplianceKettleSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="34" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Kettle Base Stand */}
    <rect x="36" y="90" width="48" height="8" rx="4" fill={isDarkMode ? '#1E293B' : '#E2E8F0'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1.2" />
    {/* Kettle Pitcher Body */}
    <path d="M44 32 L40 88 H78 L72 32 Z" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Lid & Handle */}
    <rect x="42" y="26" width="34" height="8" rx="3" fill="#22C55E" />
    <path d="M72 40 H86 V78 H74" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Spout */}
    <path d="M44 38 L32 46 L43 56" stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" fill={isDarkMode ? '#334155' : '#F8FAFC'} />
    {/* Water Gauge */}
    <rect x="54" y="46" width="8" height="30" rx="3" fill="#60A5FA" fillOpacity="0.5" />
    {/* Steam Wisps */}
    <path d="M30 36 Q32 28 38 30" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M34 26 Q38 18 42 22" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 10. Water Heater
export const ApplianceWaterHeaterSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="32" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Wall Unit Box */}
    <rect x="36" y="20" width="48" height="68" rx="8" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Temp Dial Rotary Knob */}
    <circle cx="60" cy="46" r="14" fill={isDarkMode ? '#1E293B' : '#E2E8F0'} stroke="#22C55E" strokeWidth="1.5" />
    <circle cx="60" cy="46" r="8" fill="#22C55E" />
    <path d="M60 46 L64 40" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    {/* Hot / Cold LED */}
    <circle cx="48" cy="72" r="2.5" fill="#EF4444" />
    <circle cx="72" cy="72" r="2.5" fill="#60A5FA" />
    {/* Shower Hose and Head */}
    <path d="M60 88 V98 Q60 104 70 104 H84 V60" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="84" cy="56" r="6" fill="#22C55E" />
  </svg>
);

// 11. Rice Cooker
export const ApplianceRiceCookerSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="36" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Cooker Body Pot */}
    <path d="M32 46 C32 46 32 94 60 94 C88 94 88 46 88 46 Z" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Hinged Dome Lid */}
    <path d="M30 46 C30 32 44 26 60 26 C76 26 90 32 90 46 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" />
    {/* Top Steam Vent */}
    <rect x="54" y="22" width="12" height="5" rx="2" fill="#FBBF24" />
    {/* Cook/Warm Toggle Button */}
    <rect x="48" y="58" width="24" height="20" rx="4" fill={isDarkMode ? '#1E293B' : '#F1F5F9'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1" />
    <circle cx="60" cy="65" r="3" fill="#EF4444" />
    <circle cx="60" cy="73" r="2.5" fill="#FBBF24" />
  </svg>
);

// 12. Electric Stove / Induction
export const ApplianceStoveSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="42" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Induction Cooktop Surface */}
    <rect x="22" y="44" width="76" height="48" rx="7" fill="#0F172A" stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Induction Magnetic Burner Circles */}
    <circle cx="48" cy="64" r="16" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
    <circle cx="48" cy="64" r="8" stroke="#FBBF24" strokeWidth="1.5" fill="none" />
    {/* Right Touch Control Panel */}
    <rect x="74" y="52" width="18" height="32" rx="3" fill={isDarkMode ? '#1E293B' : '#1E293B'} stroke="#334155" strokeWidth="1" />
    <circle cx="83" cy="60" r="2.5" fill="#22C55E" />
    <path d="M79 72 H87 M79 76 H87" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 13. Hair Dryer
export const ApplianceHairDryerSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="34" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Dryer Barrel Head */}
    <path d="M30 42 L68 36 V62 L30 54 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" />
    {/* Back Cap */}
    <path d="M68 36 C76 36 82 42 82 49 C82 56 76 62 68 62 Z" fill="#15803D" />
    {/* Handle Grip */}
    <path d="M60 58 L70 94 H58 L50 60 Z" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Power / Speed Switch */}
    <rect x="58" y="70" width="4" height="8" rx="2" fill="#FBBF24" />
    {/* Warm Air Stream */}
    <path d="M24 44 Q16 48 24 52" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M22 38 Q12 44 20 50" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 14. Wi-Fi Router
export const ApplianceRouterSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="40" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Dual Antennas */}
    <rect x="36" y="24" width="4" height="38" rx="2" fill={isDarkMode ? '#475569' : '#94A3B8'} transform="rotate(-10 36 24)" />
    <rect x="80" y="24" width="4" height="38" rx="2" fill={isDarkMode ? '#475569' : '#94A3B8'} transform="rotate(10 80 24)" />
    {/* Router Base Console */}
    <rect x="24" y="60" width="72" height="32" rx="6" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Green Wi-Fi Signal LED Array */}
    <circle cx="36" cy="76" r="2.5" fill="#22C55E" />
    <circle cx="44" cy="76" r="2.5" fill="#22C55E" />
    <circle cx="52" cy="76" r="2.5" fill="#22C55E" />
    <circle cx="60" cy="76" r="2.5" fill="#60A5FA" />
    <circle cx="68" cy="76" r="2.5" fill="#FBBF24" />
    {/* Wi-Fi Waves emanating */}
    <path d="M52 46 C56 42 64 42 68 46" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M46 38 C54 30 66 30 74 38" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

// 15. Phone Charger & Adapter
export const AppliancePhoneChargerSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="34" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Charger Brick Block */}
    <rect x="38" y="32" width="44" height="42" rx="7" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Wall Plugs prongs */}
    <rect x="46" y="18" width="6" height="14" rx="2" fill={isDarkMode ? '#475569' : '#94A3B8'} />
    <rect x="68" y="18" width="6" height="14" rx="2" fill={isDarkMode ? '#475569' : '#94A3B8'} />
    {/* USB-C Output Port */}
    <rect x="52" y="66" width="16" height="4" rx="2" fill="#0F172A" />
    {/* Lightning Bolt Fast Charge Stamp */}
    <path d="M61 40 L55 48 H61 L59 56 L67 47 H61 L61 40 Z" fill="#FBBF24" />
    {/* Braided Cable Coil */}
    <path d="M60 74 C60 84 46 86 46 94 C46 98 52 100 64 100" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 16. Other / Custom Appliance
export const ApplianceCustomSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="102" rx="36" ry="5" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />
    {/* Smart Plug / Power Hub */}
    <rect x="32" y="30" width="56" height="58" rx="12" fill={isDarkMode ? '#334155' : '#F8FAFC'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1.5" />
    {/* Center Power Socket Ring */}
    <circle cx="60" cy="54" r="18" fill={isDarkMode ? '#1E293B' : '#E2E8F0'} stroke="#22C55E" strokeWidth="1.5" />
    <rect x="52" y="48" width="4" height="8" rx="1.5" fill="#0F172A" />
    <rect x="64" y="48" width="4" height="8" rx="1.5" fill="#0F172A" />
    <circle cx="60" cy="62" r="2" fill="#0F172A" />
    {/* Energy Smart Leaf badge */}
    <g transform="translate(68, 22)">
      <circle cx="10" cy="10" r="9" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1" />
      <path d="M10 5 C7 5 5 8 5 11 C5 14 10 16 10 16 C10 16 15 14 15 11 C15 8 13 5 10 5 Z" fill="#16A34A" />
    </g>
  </svg>
);
