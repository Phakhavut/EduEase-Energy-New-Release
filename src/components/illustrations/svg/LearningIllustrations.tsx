import React from 'react';

interface SvgProps {
  isDarkMode?: boolean;
  gradId: string;
}

export const LearningPathSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="42" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Open Knowledge Book Base */}
    <path 
      d="M60 48 C50 44 32 44 22 48 V86 C32 82 50 82 60 88 C70 82 88 82 98 86 V48 C88 44 70 44 60 48 Z" 
      fill={isDarkMode ? '#1E293B' : '#FFFFFF'} 
      stroke={isDarkMode ? '#475569' : '#CBD5E1'} 
      strokeWidth="1.5" 
    />
    {/* Book Spine Center line */}
    <line x1="60" y1="48" x2="60" y2="88" stroke="#22C55E" strokeWidth="2" />

    {/* Text lines in book */}
    <path d="M30 58 C38 56 46 56 52 58 M30 66 C38 64 46 64 52 66 M30 74 C38 72 46 72 52 74" stroke={isDarkMode ? '#334155' : '#E2E8F0'} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M68 58 C74 56 82 56 90 58 M68 66 C74 64 82 64 90 66 M68 74 C74 72 82 72 90 74" stroke={isDarkMode ? '#334155' : '#E2E8F0'} strokeWidth="1.5" strokeLinecap="round" />

    {/* Ascending Knowledge Path with Stepping Energy Stones */}
    <path d="M60 48 C60 36 74 30 70 18" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" fill="none" />

    {/* Knowledge Beacon Star at top */}
    <g transform="translate(62, 8)">
      <circle cx="10" cy="10" r="9" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="1.2" />
      <path d="M10 4 L11.5 8 L16 9.5 L12 12.5 L13.5 16.5 L10 14 L6.5 16.5 L8 12.5 L4 9.5 L8.5 8 Z" fill="#F59E0B" />
    </g>
  </svg>
);

export const SimulatorSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="42" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Simulator Console Screen */}
    <rect x="24" y="24" width="72" height="66" rx="10" fill={isDarkMode ? '#1E293B' : '#FFFFFF'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1.5" />

    {/* Top Bulb Indicator */}
    <circle cx="44" cy="46" r="12" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.2" />
    <path d="M44 38 V41 M37 42 L39 44 M51 42 L49 44" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />

    {/* Wattage Gauge Meter Arc */}
    <path d="M64 54 A 12 12 0 0 1 84 54" stroke={isDarkMode ? '#334155' : '#E2E8F0'} strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M64 54 A 12 12 0 0 1 78 44" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" fill="none" />
    <circle cx="74" cy="54" r="2.5" fill="#22C55E" />

    {/* Interactive Slider Track & Knob */}
    <rect x="34" y="70" width="52" height="6" rx="3" fill={isDarkMode ? '#334155' : '#E2E8F0'} />
    <rect x="34" y="70" width="30" height="6" rx="3" fill="#22C55E" />
    {/* Slider Knob */}
    <circle cx="64" cy="73" r="7" fill="#FFFFFF" stroke="#22C55E" strokeWidth="2.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
  </svg>
);

export const QuizSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Quiz Card */}
    <rect x="30" y="22" width="60" height="74" rx="8" fill={isDarkMode ? '#1E293B' : '#FFFFFF'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1.5" />

    {/* Big Question Mark Badge */}
    <circle cx="60" cy="46" r="16" fill={isDarkMode ? '#334155' : '#FEF3C7'} stroke="#FBBF24" strokeWidth="1.5" />
    <path d="M57 40 C57 37 63 37 63 41 C63 44 59 45 59 48" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <circle cx="59" cy="53" r="1.5" fill="#D97706" />

    {/* Multiple Choice Option Radios */}
    <circle cx="42" cy="72" r="4" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.2" />
    <rect x="52" y="70" width="28" height="4" rx="2" fill="#22C55E" />

    <circle cx="42" cy="83" r="4" fill={isDarkMode ? '#334155' : '#F1F5F9'} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="1" />
    <rect x="52" y="81" width="22" height="4" rx="2" fill={isDarkMode ? '#475569' : '#CBD5E1'} />

    {/* Spark */}
    <circle cx="86" cy="20" r="3" fill="#FBBF24" />
  </svg>
);

export const LessonCompletedSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="38" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Open Diploma / Certificate Card */}
    <rect x="28" y="32" width="64" height="62" rx="8" fill={isDarkMode ? '#1E293B' : '#FFFFFF'} stroke={isDarkMode ? '#334155' : '#CBD5E1'} strokeWidth="1.5" />

    {/* Certificate Lines */}
    <rect x="38" y="62" width="44" height="4" rx="2" fill={isDarkMode ? '#475569' : '#CBD5E1'} />
    <rect x="44" y="70" width="32" height="4" rx="2" fill={isDarkMode ? '#334155' : '#E2E8F0'} />
    <rect x="50" y="78" width="20" height="4" rx="2" fill={isDarkMode ? '#334155' : '#E2E8F0'} />

    {/* Golden Achievement Medal & Ribbon */}
    <g transform="translate(42, 12)">
      {/* Ribbons */}
      <path d="M12 28 L6 44 L16 38 L22 44 L20 28" fill="#15803D" />
      <path d="M24 28 L30 44 L20 38 L14 44 L16 28" fill="#16A34A" />
      {/* Medal Circle */}
      <circle cx="18" cy="18" r="16" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" filter="drop-shadow(0 4px 6px rgba(245, 158, 11, 0.25))" />
      {/* Checkmark inside medal */}
      <path d="M11 18 L16 23 L25 14" stroke="#92400E" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Celebration Eco Leaves */}
    <circle cx="20" cy="46" r="3" fill="#22C55E" />
    <circle cx="100" cy="48" r="2.5" fill="#60A5FA" />
  </svg>
);

export const LessonLockedSvg: React.FC<SvgProps> = ({ isDarkMode, gradId }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
    <ellipse cx="60" cy="100" rx="36" ry="6" fill={isDarkMode ? '#0F172A' : '#E2E8F0'} fillOpacity="0.75" />

    {/* Modern Rounded Padlock Body */}
    <rect 
      x="34" 
      y="44" 
      width="52" 
      height="46" 
      rx="10" 
      fill={isDarkMode ? '#334155' : '#F1F5F9'} 
      stroke={isDarkMode ? '#475569' : '#94A3B8'} 
      strokeWidth="1.5" 
    />

    {/* Metallic Shackle */}
    <path 
      d="M44 44 V32 C44 23.2 51.2 16 60 16 C68.8 16 76 23.2 76 32 V44" 
      stroke={isDarkMode ? '#64748B' : '#94A3B8'} 
      strokeWidth="4" 
      strokeLinecap="round" 
      fill="none" 
    />

    {/* Energy Keyhole with soft glow */}
    <circle cx="60" cy="62" r="6" fill="#22C55E" />
    <path d="M58 64 L56 74 H64 L62 64 Z" fill="#22C55E" />
  </svg>
);
