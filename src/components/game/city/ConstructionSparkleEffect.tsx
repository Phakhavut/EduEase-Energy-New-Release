import React from 'react';
import { useSafeReducedMotion } from '../../../hooks/useSafeReducedMotion';

export interface ConstructionSparkleEffectProps {
  x: number;
  y: number;
  progress: number;
  lang: 'th' | 'en';
  isDarkMode?: boolean;
}

export const ConstructionSparkleEffect: React.FC<ConstructionSparkleEffectProps> = ({
  x,
  y,
  progress,
  lang,
  isDarkMode = true
}) => {
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <g transform={`translate(${x}, ${y})`} pointerEvents="none">
      {/* 1. Base Energy Dome / Ground Ring */}
      <ellipse
        cx="0"
        cy="0"
        rx="82"
        ry="36"
        fill={isDarkMode ? 'rgba(250, 204, 21, 0.25)' : 'rgba(250, 204, 21, 0.35)'}
        stroke="#facc15"
        strokeWidth="3.5"
        className={shouldReduceMotion ? '' : 'animate-pulse'}
      />
      <ellipse
        cx="0"
        cy="0"
        rx="64"
        ry="26"
        fill="rgba(16, 185, 129, 0.35)"
        stroke="#34d399"
        strokeWidth="2"
        strokeDasharray={shouldReduceMotion ? 'none' : '6 4'}
      />

      {/* 2. Rotating Particle Stars Ring (Reduced motion: Static elegant constellation) */}
      {!shouldReduceMotion ? (
        <g className="animate-spin" style={{ animationDuration: '2.5s' }}>
          <circle cx="-50" cy="-20" r="5" fill="#facc15" filter="drop-shadow(0 0 4px #facc15)" />
          <circle cx="50" cy="20" r="5" fill="#34d399" filter="drop-shadow(0 0 4px #34d399)" />
          <circle cx="32" cy="-28" r="6" fill="#38bdf8" filter="drop-shadow(0 0 4px #38bdf8)" />
          <circle cx="-32" cy="28" r="6" fill="#f43f5e" filter="drop-shadow(0 0 4px #f43f5e)" />
          <circle cx="0" cy="-34" r="4.5" fill="#fbbf24" />
          <circle cx="0" cy="34" r="4.5" fill="#a7f3d0" />
        </g>
      ) : (
        <g opacity="0.85">
          <circle cx="-50" cy="-20" r="4" fill="#facc15" />
          <circle cx="50" cy="20" r="4" fill="#34d399" />
          <circle cx="32" cy="-28" r="4" fill="#38bdf8" />
          <circle cx="-32" cy="28" r="4" fill="#f43f5e" />
        </g>
      )}

      {/* 3. Multi-point Sparkle Stars (Motion or Static with Smooth Fade) */}
      {!shouldReduceMotion ? (
        <>
          {/* Gold Star Top-Left */}
          <g transform="translate(-35, -52)" className="animate-bounce" style={{ animationDuration: '0.9s' }}>
            <path
              d="M 0,-18 L 4,-5 L 18,0 L 4,5 L 0,18 L -4,5 L -18,0 L -4,-5 Z"
              fill="#facc15"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>

          {/* Cyan Star Top-Right */}
          <g transform="translate(38, -46)" className="animate-bounce" style={{ animationDuration: '1.2s' }}>
            <path
              d="M 0,-14 L 3,-4 L 14,0 L 3,4 L 0,14 L -3,4 L -14,0 L -3,-4 Z"
              fill="#38bdf8"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>

          {/* Emerald Star Apex */}
          <g transform="translate(0, -68)" className="animate-pulse" style={{ animationDuration: '0.8s' }}>
            <path
              d="M 0,-20 L 5,-6 L 20,0 L 5,6 L 0,20 L -5,6 L -20,0 L -5,-6 Z"
              fill="#34d399"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </g>

          {/* Mini Glints */}
          <g transform="translate(-18, -25)">
            <circle cx="0" cy="0" r="3" fill="#ffffff" className="animate-ping" style={{ animationDuration: '1.4s' }} />
          </g>
          <g transform="translate(22, -28)">
            <circle cx="0" cy="0" r="3" fill="#ffffff" className="animate-ping" style={{ animationDuration: '1.1s' }} />
          </g>
        </>
      ) : (
        <>
          {/* Static High-Contrast Accessible Sparkles for Reduced Motion */}
          <g transform="translate(-35, -50)">
            <path
              d="M 0,-14 L 3,-4 L 14,0 L 3,4 L 0,14 L -3,4 L -14,0 L -3,-4 Z"
              fill="#facc15"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>
          <g transform="translate(35, -45)">
            <path
              d="M 0,-12 L 3,-3 L 12,0 L 3,3 L 0,12 L -3,3 L -12,0 L -3,-3 Z"
              fill="#38bdf8"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>
          <g transform="translate(0, -65)">
            <path
              d="M 0,-16 L 4,-5 L 16,0 L 4,5 L 0,16 L -4,5 L -16,0 L -4,-5 Z"
              fill="#34d399"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>
        </>
      )}

      {/* 4. Floating Construction Progress Pill (Accessible Badge) */}
      <g transform="translate(0, 48)">
        <rect
          x="-75"
          y="-13"
          width="150"
          height="26"
          rx="13"
          fill="#0f172a"
          fillOpacity="0.95"
          stroke="#facc15"
          strokeWidth="2.5"
        />
        <text
          x="0"
          y="4.5"
          textAnchor="middle"
          fill="#facc15"
          fontSize="11"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.02em"
        >
          🔨 {lang === 'th' ? `กำลังก่อสร้าง... ${progress}%` : `Constructing... ${progress}%`}
        </text>
      </g>
    </g>
  );
};
