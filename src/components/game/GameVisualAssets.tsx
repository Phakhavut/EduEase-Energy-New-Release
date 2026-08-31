import React from 'react';

/**
 * Visual Assets Rendering Library for EduEase Energy - Energy Adventure
 * Provides custom SVG character avatars, bosses, NPCs, buildings, decorations and item icons
 * derived from the EduEase Energy Adventure visual asset system.
 */

// --- PLAYER CHARACTERS & OUTFITS ---
export const CharacterAvatar: React.FC<{ 
  characterId: string; 
  outfitId?: string; 
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string; 
}> = ({ characterId, outfitId = 'default', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  };

  const isGirl = characterId === 'luna_hero' || characterId === 'female';

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Glow / Shadow Base */}
        <ellipse cx="50" cy="88" rx="35" ry="8" fill="rgba(0,0,0,0.15)" />
        
        {/* Body Base */}
        {isGirl ? (
          // Female Explorer Character (Luna / Eco Girl)
          <g id="female_character">
            {/* Hair Back */}
            <path d="M 28 35 C 20 50, 22 75, 30 82 C 35 85, 65 85, 70 82 C 78 75, 80 50, 72 35 Z" fill="#4A2E1B" />
            
            {/* Body & Outfit */}
            {outfitId === 'engineer' ? (
              // Engineer Outfit (Yellow Vest)
              <g>
                <path d="M 32 58 L 68 58 L 72 82 L 28 82 Z" fill="#F59E0B" />
                <path d="M 40 58 L 50 68 L 60 58 L 50 82 Z" fill="#3B82F6" />
                <rect x="42" y="65" width="16" height="12" rx="2" fill="#E2E8F0" />
              </g>
            ) : outfitId === 'eco_hoodie' ? (
              // Eco Hoodie (Green Hoodie)
              <g>
                <path d="M 30 56 Q 50 52 70 56 L 74 84 L 26 84 Z" fill="#10B981" />
                <path d="M 42 56 L 50 68 L 58 56" fill="none" stroke="#047857" strokeWidth="3" />
              </g>
            ) : (
              // Default / Explorer Outfit (White Shirt + Blue Skirt/Vest)
              <g>
                <path d="M 32 56 Q 50 52 68 56 L 72 84 L 28 84 Z" fill="#3B82F6" />
                <path d="M 42 56 L 50 70 L 58 56" fill="#FFFFFF" />
                <rect x="36" y="72" width="28" height="12" rx="2" fill="#1E3A8A" />
              </g>
            )}

            {/* Neck */}
            <rect x="44" y="48" width="12" height="10" rx="3" fill="#FAD6A5" />

            {/* Head */}
            <circle cx="50" cy="38" r="18" fill="#FAD6A5" />

            {/* Hair Front & Bangs */}
            <path d="M 32 30 C 35 18, 65 18, 68 30 C 62 26, 55 32, 50 28 C 45 32, 38 26, 32 30 Z" fill="#5C3A21" />

            {/* Eyes */}
            <circle cx="43" cy="38" r="2.5" fill="#2D1500" />
            <circle cx="57" cy="38" r="2.5" fill="#2D1500" />
            <circle cx="44" cy="37" r="0.8" fill="#FFFFFF" />
            <circle cx="58" cy="37" r="0.8" fill="#FFFFFF" />

            {/* Smile & Cheeks */}
            <path d="M 46 43 Q 50 46 54 43" fill="none" stroke="#2D1500" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="40" cy="41" r="2" fill="#F43F5E" opacity="0.4" />
            <circle cx="60" cy="41" r="2" fill="#F43F5E" opacity="0.4" />

            {/* Cap / Visor */}
            <path d="M 28 26 Q 50 14 72 26 Q 80 27 75 30 Q 50 22 25 30 Z" fill="#0EA5E9" />
            <path d="M 32 24 C 36 12, 64 12, 68 24 Z" fill="#0284C7" />
            <circle cx="50" cy="20" r="3" fill="#F59E0B" />
          </g>
        ) : (
          // Male Explorer Character (Voltie Boy)
          <g id="male_character">
            {/* Body & Outfit */}
            {outfitId === 'explorer' ? (
              // Explorer Outfit (Khaki Vest)
              <g>
                <path d="M 30 56 Q 50 52 70 56 L 74 84 L 26 84 Z" fill="#D97706" />
                <path d="M 40 56 L 50 68 L 60 56 L 50 84 Z" fill="#FEF3C7" />
                <rect x="34" y="62" width="10" height="10" rx="2" fill="#B45309" />
                <rect x="56" y="62" width="10" height="10" rx="2" fill="#B45309" />
              </g>
            ) : outfitId === 'casual' ? (
              // Casual Outfit (Denim Jacket & Red Shirt)
              <g>
                <path d="M 30 56 Q 50 52 70 56 L 74 84 L 26 84 Z" fill="#2563EB" />
                <path d="M 42 56 L 50 70 L 58 56 L 50 84 Z" fill="#EF4444" />
              </g>
            ) : (
              // Default Boy Outfit (Blue Jacket & White Tee)
              <g>
                <path d="M 30 56 Q 50 52 70 56 L 74 84 L 26 84 Z" fill="#0284C7" />
                <path d="M 42 56 L 50 68 L 58 56 L 50 84 Z" fill="#FFFFFF" />
                <path d="M 36 78 L 64 78 L 64 84 L 36 84 Z" fill="#1E293B" />
              </g>
            )}

            {/* Neck */}
            <rect x="44" y="48" width="12" height="10" rx="3" fill="#FAD6A5" />

            {/* Head */}
            <circle cx="50" cy="38" r="18" fill="#FAD6A5" />

            {/* Boy Hair Spiky */}
            <path d="M 30 32 C 28 18, 42 12, 50 14 C 58 12, 72 18, 70 32 C 64 26, 58 30, 50 24 C 42 30, 36 26, 30 32 Z" fill="#3D2314" />

            {/* Eyes */}
            <circle cx="43" cy="38" r="2.5" fill="#1E293B" />
            <circle cx="57" cy="38" r="2.5" fill="#1E293B" />
            <circle cx="44" cy="37" r="0.8" fill="#FFFFFF" />
            <circle cx="58" cy="37" r="0.8" fill="#FFFFFF" />

            {/* Smile */}
            <path d="M 45 43 Q 50 47 55 43" fill="none" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

            {/* Explorer Goggles on Head */}
            <rect x="32" y="18" width="36" height="8" rx="4" fill="#1E293B" />
            <circle cx="41" cy="22" r="5" fill="#F59E0B" stroke="#000" strokeWidth="1" />
            <circle cx="59" cy="22" r="5" fill="#F59E0B" stroke="#000" strokeWidth="1" />
          </g>
        )}
      </svg>
    </div>
  );
};

// --- MASCOTS & NPCS ---
export const MascotAvatar: React.FC<{ 
  mascotId: 'ecobot' | 'dr_volt' | 'luna_npc'; 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ mascotId, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  if (mascotId === 'ecobot') {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* EcoBot AI Assistant */}
          <ellipse cx="50" cy="85" rx="30" ry="6" fill="rgba(0,0,0,0.15)" />
          {/* Floating Body */}
          <circle cx="50" cy="50" r="30" fill="url(#botGrad)" stroke="#10B981" strokeWidth="3" />
          <defs>
            <linearGradient id="botGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          {/* Screen Visor */}
          <rect x="28" y="38" width="44" height="24" rx="12" fill="#0F172A" />
          {/* Glowing Eyes */}
          <circle cx="40" cy="50" r="4" fill="#38BDF8" className="animate-pulse" />
          <circle cx="60" cy="50" r="4" fill="#38BDF8" className="animate-pulse" />
          {/* Leaf Antenna */}
          <path d="M 50 20 Q 55 5 65 10 Q 55 20 50 20 Z" fill="#10B981" />
          <path d="M 50 20 Q 45 5 35 10 Q 45 20 50 20 Z" fill="#34D399" />
          <line x1="50" y1="20" x2="50" y2="28" stroke="#10B981" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (mascotId === 'dr_volt') {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Dr. Volt Professor */}
          <ellipse cx="50" cy="88" rx="32" ry="7" fill="rgba(0,0,0,0.15)" />
          {/* Lab Coat */}
          <path d="M 30 56 Q 50 52 70 56 L 74 88 L 26 88 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M 44 56 L 50 72 L 56 56" fill="#2563EB" />
          <path d="M 48 70 L 48 88" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="50" cy="38" r="18" fill="#FDE68A" />
          {/* Wild White Hair */}
          <path d="M 28 36 C 22 18, 38 12, 50 16 C 62 12, 78 18, 72 36 C 78 28, 68 20, 50 22 C 32 20, 22 28, 28 36 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          {/* Glasses */}
          <circle cx="42" cy="38" r="6" fill="none" stroke="#1E293B" strokeWidth="2" />
          <circle cx="58" cy="38" r="6" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="48" y1="38" x2="52" y2="38" stroke="#1E293B" strokeWidth="2" />
          {/* Mustache */}
          <path d="M 40 46 Q 50 42 60 46 Q 50 50 40 46 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // Luna Energy Guide
  return <CharacterAvatar characterId="luna_hero" size={size} className={className} />;
};

// --- BOSS ENEMIES ---
export const BossIllustration: React.FC<{ 
  bossId: string; 
  size?: 'sm' | 'md' | 'lg';
  className?: string; 
}> = ({ bossId, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-40 h-40'
  };

  if (bossId === 'cold_phantom' || bossId === 'cooling_beast') {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl animate-pulse">
          {/* Cold Phantom / Cooling Beast */}
          <ellipse cx="50" cy="85" rx="36" ry="8" fill="rgba(6,182,212,0.3)" />
          {/* Ice Body */}
          <path d="M 20 40 Q 50 10 80 40 Q 90 70 50 85 Q 10 70 20 40 Z" fill="url(#iceGrad)" stroke="#38BDF8" strokeWidth="3" />
          <defs>
            <linearGradient id="iceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* Ice Spikes */}
          <polygon points="15,30 25,18 30,35" fill="#BAE6FD" />
          <polygon points="70,35 75,18 85,30" fill="#BAE6FD" />
          <polygon points="45,15 50,2 55,15" fill="#FFFFFF" />
          {/* Glowing Cold Eyes */}
          <polygon points="35,42 45,45 38,50" fill="#FFFFFF" />
          <polygon points="65,42 55,45 62,50" fill="#FFFFFF" />
          {/* Angry Frost Mouth */}
          <path d="M 38 62 Q 50 54 62 62 L 58 68 Q 50 62 42 68 Z" fill="#0C4A6E" />
          {/* Snowflakes Floating */}
          <text x="10" y="25" fill="#38BDF8" fontSize="12">❄</text>
          <text x="80" y="25" fill="#38BDF8" fontSize="12">❄</text>
        </svg>
      </div>
    );
  }

  if (bossId === 'standby_monster') {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Standby Power Monster (TV/Monitor Beast) */}
          <ellipse cx="50" cy="85" rx="32" ry="7" fill="rgba(16,185,129,0.2)" />
          {/* Monitor Body */}
          <rect x="18" y="22" width="64" height="48" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="3" />
          <rect x="24" y="28" width="52" height="36" rx="4" fill="#0F172A" />
          {/* Stand Base */}
          <rect x="42" y="70" width="16" height="10" fill="#334155" />
          <ellipse cx="50" cy="80" rx="20" ry="5" fill="#475569" />
          {/* Evil Red Standby Eyes */}
          <circle cx="38" cy="46" r="6" fill="#EF4444" className="animate-ping" />
          <circle cx="38" cy="46" r="4" fill="#FEF2F2" />
          <circle cx="62" cy="46" r="6" fill="#EF4444" className="animate-ping" />
          <circle cx="62" cy="46" r="4" fill="#FEF2F2" />
          {/* Vampire Plugs for Arms */}
          <path d="M 18 40 Q 5 35 10 55" fill="none" stroke="#10B981" strokeWidth="4" />
          <path d="M 82 40 Q 95 35 90 55" fill="none" stroke="#10B981" strokeWidth="4" />
        </svg>
      </div>
    );
  }

  if (bossId === 'heat_overlord') {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl animate-bounce">
          {/* Heat Overlord (Flame Demon) */}
          <ellipse cx="50" cy="85" rx="36" ry="8" fill="rgba(239,68,68,0.3)" />
          <path d="M 50 10 Q 75 35 85 60 Q 90 80 50 85 Q 10 80 15 60 Q 25 35 50 10 Z" fill="url(#fireGrad)" />
          <defs>
            <linearGradient id="fireGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="40%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          {/* Fiery Eyes & Mouth */}
          <polygon points="32,45 44,48 36,55" fill="#FFFFFF" />
          <polygon points="68,45 56,48 64,55" fill="#FFFFFF" />
          <path d="M 35 68 Q 50 80 65 68 Q 50 62 35 68 Z" fill="#7F1D1D" />
        </svg>
      </div>
    );
  }

  // Default: Watt Waster / Overload (Electric Lightning Monster)
  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
        {/* Watt Waster Monster */}
        <ellipse cx="50" cy="85" rx="38" ry="8" fill="rgba(168,85,247,0.3)" />
        <path d="M 25 35 Q 50 15 75 35 Q 85 65 50 85 Q 15 65 25 35 Z" fill="url(#purpleGrad)" stroke="#C084FC" strokeWidth="2" />
        <defs>
          <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>
        </defs>
        {/* Lightning Horns */}
        <polygon points="30,25 20,5 35,20" fill="#FACC15" />
        <polygon points="70,25 80,5 65,20" fill="#FACC15" />
        {/* Glowing Eyes */}
        <circle cx="38" cy="45" r="7" fill="#FACC15" />
        <circle cx="62" cy="45" r="7" fill="#FACC15" />
        <circle cx="38" cy="45" r="3" fill="#000000" />
        <circle cx="62" cy="45" r="3" fill="#000000" />
        {/* Jagged Mouth */}
        <path d="M 32 65 L 40 58 L 48 65 L 56 58 L 64 65 L 68 70 L 30 70 Z" fill="#1E1B4B" stroke="#FACC15" strokeWidth="1" />
      </svg>
    </div>
  );
};

// --- BUILDINGS & CITY STRUCTURES ---
export const BuildingGraphic: React.FC<{ 
  buildingId: string; 
  className?: string; 
}> = ({ buildingId, className = 'w-16 h-16' }) => {
  if (buildingId.includes('solar') || buildingId.includes('panel')) {
    return (
      <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
        {/* Solar Farm / Panel */}
        <rect x="15" y="45" width="70" height="40" rx="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="3" transform="skewX(-15)" />
        <line x1="15" y1="65" x2="85" y2="65" stroke="#BAE6FD" strokeWidth="1.5" transform="skewX(-15)" />
        <line x1="38" y1="45" x2="38" y2="85" stroke="#BAE6FD" strokeWidth="1.5" transform="skewX(-15)" />
        <line x1="62" y1="45" x2="62" y2="85" stroke="#BAE6FD" strokeWidth="1.5" transform="skewX(-15)" />
        {/* Sun Sparkle */}
        <circle cx="78" cy="22" r="12" fill="#F59E0B" />
      </svg>
    );
  }

  if (buildingId.includes('wind') || buildingId.includes('turbine')) {
    return (
      <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
        {/* Wind Turbine */}
        <rect x="47" y="40" width="6" height="50" rx="2" fill="#CBD5E1" />
        <circle cx="50" cy="40" r="6" fill="#64748B" />
        {/* Blades rotating */}
        <g className="animate-spin origin-[50px_40px] stroke-slate-300" style={{ animationDuration: '6s' }}>
          <path d="M 50 40 L 50 10 L 54 25 Z" fill="#F8FAFC" />
          <path d="M 50 40 L 76 55 L 62 58 Z" fill="#F8FAFC" />
          <path d="M 50 40 L 24 55 L 38 58 Z" fill="#F8FAFC" />
        </g>
      </svg>
    );
  }

  if (buildingId.includes('ev') || buildingId.includes('charger')) {
    return (
      <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
        {/* EV Station */}
        <rect x="25" y="25" width="50" height="60" rx="8" fill="#10B981" stroke="#047857" strokeWidth="3" />
        <rect x="33" y="33" width="34" height="22" rx="4" fill="#0F172A" />
        <path d="M 50 38 L 44 48 L 49 48 L 47 55 L 56 43 L 51 43 Z" fill="#FBBF24" />
        <path d="M 75 45 Q 88 45 88 65 L 85 75" fill="none" stroke="#10B981" strokeWidth="4" />
      </svg>
    );
  }

  // Generic House / Smart Apartment
  return (
    <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
      {/* House Body */}
      <rect x="22" y="42" width="56" height="46" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      {/* Eco Roof */}
      <polygon points="50,15 15,44 85,44" fill="#0EA5E9" />
      {/* Windows */}
      <rect x="30" y="52" width="16" height="16" rx="2" fill="#38BDF8" />
      <rect x="54" y="52" width="16" height="16" rx="2" fill="#38BDF8" />
      {/* Door */}
      <rect x="42" y="68" width="16" height="20" rx="2" fill="#D97706" />
      {/* Solar Panel on roof */}
      <polygon points="38,32 62,32 68,40 32,40" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
    </svg>
  );
};
