import React from 'react';

export type LogoVariant = 
  | 'primary'          // Primary Horizontal: Symbol + "EduEase\nEnergy" (2-line wordmark)
  | 'horizontal'       // Inline / Header: Symbol + "EduEase Energy"
  | 'stacked'          // Stacked Vertical: Symbol on top + Wordmark below (Posters / Splash)
  | 'symbol'           // Standalone Vector Icon
  | 'monochrome-black' // 100% Solid Black on transparent / light surface
  | 'monochrome-white' // 100% Solid White on dark surface
  | 'app-icon'         // App Icon: Green Squircle + White Symbol
  | 'favicon';         // Favicon: Off-White Squircle + Full-Color Symbol

export interface EduEaseLogoProps {
  variant?: LogoVariant;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isDarkMode?: boolean;
  forcedColor?: string;
  showTagline?: boolean;
  taglineLang?: 'en' | 'th';
  className?: string;
  onClick?: () => void;
}

/**
 * EduEase Energy Official Vector Logo System
 * Faithful vector recreation of the official brand identity sheet:
 * - Left Wing: Upward-curving organic book/leaf in fresh gradient cyan (#4DE5EE -> #1EC1CB -> #169EA7)
 * - Center Spark: Dynamic geometric lightning bolt in solar yellow (#FBBF24)
 * - Right Wing: Asymmetric leaf with inner cutout aperture in gradient cyan-teal (#1EC1CB -> #169EA7 -> #156D74)
 * - Wordmark: "Edu" (Deep Navy #1C1C28) + "Ease" (Cyan #1EC1CB) / "Energy" (Spaced Navy/Muted)
 */
export const EduEaseLogo: React.FC<EduEaseLogoProps> = ({
  variant = 'primary',
  size = 'md',
  isDarkMode = false,
  forcedColor,
  showTagline = false,
  taglineLang = 'en',
  className = '',
  onClick,
}) => {
  // Resolve size dimension for the symbol
  const getDimension = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'xs': return 20;
      case 'sm': return 26;
      case 'md': return 36;
      case 'lg': return 48;
      case 'xl': return 64;
      case '2xl': return 96;
      default: return 36;
    }
  };

  const dim = getDimension();

  // Color flags
  const isMonoBlack = variant === 'monochrome-black';
  const isMonoWhite = variant === 'monochrome-white';
  const isAppIcon = variant === 'app-icon';

  // Palette tokens from official brand guidelines (Cyber Electric Blue & Sky suite)
  const primaryCyan = isMonoBlack ? '#000000' : isMonoWhite ? '#FFFFFF' : '#38BDF8';
  const textDark = isMonoBlack ? '#000000' : isMonoWhite ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#0A1128';
  const textSub = isMonoBlack ? '#000000' : isMonoWhite ? '#FFFFFF' : isDarkMode ? '#93C5FD' : '#64748B';

  // Unique ID prefix for gradients to prevent collision if multiple logos are rendered
  const gradId = React.useId().replace(/:/g, '');

  // ----------------------------------------------------
  // VECTOR SYMBOL SVG (Faithful to Brand Sheet & Cyber Energy)
  // ----------------------------------------------------
  const renderSymbol = (symbolDim: number, forcedColor?: string) => {
    const isSolid = forcedColor !== undefined || isMonoBlack || isMonoWhite || isAppIcon;
    const solidColor = forcedColor || (isMonoBlack ? '#000000' : '#FFFFFF');

    return (
      <svg 
        width={symbolDim} 
        height={symbolDim} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible"
        aria-label="EduEase Energy Symbol"
      >
        {!isSolid && (
          <defs>
            {/* Left Leaf/Wing Gradient: Cyber Electric Royal Blue */}
            <linearGradient id={`leftWing_${gradId}`} x1="30%" y1="10%" x2="50%" y2="90%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="55%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            {/* Right Leaf Gradient: Neon Mint (ระบบสังกัด gauge) */}
            <linearGradient id={`rightWing_${gradId}`} x1="85%" y1="20%" x2="35%" y2="85%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="60%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Solar Lightning Gradient: Streamer Gold */}
            <linearGradient id={`spark_${gradId}`} x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="60%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        )}

        {/* 1. LEFT WING (Curved Knowledge Book / Sprouting Leaf) */}
        <path
          d="M38.5 86.5 C34 81 19 66 18 42 C17.5 29 23 24.5 31 25 C35.5 25.3 37.5 27 38.5 29.5 C38.5 40 33.5 58 38.5 86.5 Z"
          fill={isSolid ? solidColor : `url(#leftWing_${gradId})`}
        />

        {/* 2. CENTER LIGHTNING BOLT (Ascending Energy Spark) */}
        <path
          d="M45 10 L59 28.5 H48.5 L55.5 35 L40.5 59 L44.5 36.5 H39 L45 10 Z"
          fill={isSolid ? solidColor : `url(#spark_${gradId})`}
          stroke={isSolid ? undefined : '#FFFFFF'}
          strokeWidth={isSolid ? 0 : 0.8}
          strokeLinejoin="round"
        />

        {/* 3. RIGHT WING (Asymmetric Leaf with Center Aperture Cutout) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.5 86.5 C52 82.5 73.5 72 82.5 54 C87 45 87 34 83 28.5 C78.5 22.5 69 26 59.5 37.5 C51.5 47.5 45.5 63 38.5 86.5 Z M53.5 59.5 C59.5 50.5 67 43.5 74.5 46.5 C77.5 47.8 77.5 53.5 74 58 C68.5 65 59.5 65.5 53.5 59.5 Z"
          fill={isSolid ? solidColor : `url(#rightWing_${gradId})`}
        />
      </svg>
    );
  };

  // ----------------------------------------------------
  // 1. SYMBOL ONLY / STANDALONE
  // ----------------------------------------------------
  if (variant === 'symbol' || variant === 'monochrome-black' || variant === 'monochrome-white') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''} ${className}`}
        title="EduEase Energy"
      >
        {renderSymbol(dim, forcedColor)}
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. APP ICON SQUIRCLE (Cyan BG + White Symbol)
  // ----------------------------------------------------
  if (variant === 'app-icon') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-[22%] bg-[#1EC1CB] shadow-md p-[15%] ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''} ${className}`}
        style={{ width: dim, height: dim }}
        title="EduEase Energy App Icon"
      >
        {renderSymbol(dim * 0.7, '#FFFFFF')}
      </div>
    );
  }

  // ----------------------------------------------------
  // 3. FAVICON CONTAINER (Neutral BG + Full-Color Symbol)
  // ----------------------------------------------------
  if (variant === 'favicon') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-[24%] bg-[#FFFFFF] dark:bg-[#242435] border border-[#E2E6EE] dark:border-white/10 shadow-sm p-[12%] ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''} ${className}`}
        style={{ width: dim, height: dim }}
        title="EduEase Energy Favicon"
      >
        {renderSymbol(dim * 0.75)}
      </div>
    );
  }

  // ----------------------------------------------------
  // 4. STACKED VERTICAL LOGO (For Posters, Splash Screen, Banners)
  // ----------------------------------------------------
  if (variant === 'stacked') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex flex-col items-center text-center select-none ${onClick ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''} ${className}`}
      >
        <div className="mb-2">
          {renderSymbol(dim * 1.3)}
        </div>
        <div className="flex flex-col items-center">
          <div className="font-display font-extrabold tracking-tight text-2xl md:text-3xl leading-none flex items-center">
            <span style={{ color: primaryCyan }}>Edu</span>
            <span style={{ color: textDark }}>Ease</span>
          </div>
          <span 
            className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase mt-1 font-sans"
            style={{ color: textSub }}
          >
            Energy
          </span>
          {showTagline && (
            <p className="text-xs font-medium mt-1.5 text-slate-500 dark:text-slate-400 max-w-[220px] leading-tight">
              {taglineLang === 'th' ? 'เข้าใจไฟ ประหยัดง่าย ทุกวัน' : 'Making energy understandable & everyday saving easier'}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 5. HORIZONTAL SINGLE-LINE (Compact Navbar)
  // ----------------------------------------------------
  if (variant === 'horizontal') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''} ${className}`}
      >
        {renderSymbol(dim)}
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-extrabold tracking-tight text-base md:text-lg">
              <span style={{ color: primaryCyan }}>Edu</span>
              <span style={{ color: textDark }}>Ease</span>
            </span>
          </div>
          <span 
            className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase -mt-0.5"
            style={{ color: textSub }}
          >
            Energy
          </span>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 6. PRIMARY LOGO (Standard 2-Line Horizontal Lockup)
  // ----------------------------------------------------
  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''} ${className}`}
    >
      {renderSymbol(dim)}
      <div className="flex flex-col justify-center">
        <div className="font-display font-extrabold tracking-tight text-lg md:text-xl leading-none">
          <span style={{ color: primaryCyan }}>Edu</span>
          <span style={{ color: textDark }}>Ease</span>
        </div>
        <span 
          className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase mt-1 leading-none font-sans"
          style={{ color: textSub }}
        >
          Energy
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1">
            {taglineLang === 'th' ? 'เข้าใจไฟ ประหยัดง่าย ทุกวัน' : 'Smart Energy & Learning Hub'}
          </span>
        )}
      </div>
    </div>
  );
};
