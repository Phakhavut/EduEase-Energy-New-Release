import React from 'react';
import { CityAssetId } from '../../../data/cityJourneyData';

/**
 * Bright, richly illustrated 2.5D cartoon eco-city visual library
 * Conforms to:
 * - 30° isometric top-plane projection
 * - Sun lighting from top-left with warm solar glow
 * - Clean crisp navy outlines (#0f172a / #1e293b)
 * - Layered roofs, panel cells, windows, ambient ground shadows
 * - Separately animatable sub-elements (e.g. wind turbine rotor, solar sparkles)
 */

interface AssetProps {
  className?: string;
  isDarkMode?: boolean;
  ghost?: boolean;
}

// 1. Starter Landmark: Eco City Hall / Starter Home with solar apex, wooden porch, welcoming banner
export const StarterHomeAsset: React.FC<AssetProps> = ({ className = "w-full h-full", isDarkMode, ghost }) => (
  <svg 
    viewBox="0 0 200 160" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    opacity={ghost ? 0.65 : 1}
  >
    <defs>
      <linearGradient id="starter-roof-left" x1="50" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="starter-roof-right" x1="150" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="starter-wall-left" x1="48" y1="55" x2="100" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={isDarkMode ? "#1e293b" : "#ffffff"} />
        <stop offset="100%" stopColor={isDarkMode ? "#0f172a" : "#f1f5f9"} />
      </linearGradient>
    </defs>

    {/* Ground ambient shadow */}
    <ellipse cx="100" cy="115" rx="65" ry="24" fill="#0f172a" fillOpacity={isDarkMode ? 0.45 : 0.22} />

    {/* House Base Foundation */}
    <g stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      {/* Concrete Base */}
      <path d="M 40 102 L 100 134 L 160 102 L 100 70 Z" fill={isDarkMode ? "#334155" : "#e2e8f0"} />
      <path d="M 40 102 L 40 110 L 100 142 L 100 134 Z" fill={isDarkMode ? "#1e293b" : "#cbd5e1"} />
      <path d="M 100 134 L 100 142 L 160 110 L 160 102 Z" fill={isDarkMode ? "#0f172a" : "#94a3b8"} />

      {/* Main Building Walls */}
      {/* Left Wall (lit) */}
      <path d="M 48 95 L 48 55 L 100 80 L 100 120 Z" fill="url(#starter-wall-left)" />
      {/* Right Wall (shaded) */}
      <path d="M 100 120 L 100 80 L 152 55 L 152 95 Z" fill={isDarkMode ? "#0f172a" : "#e2e8f0"} />

      {/* Windows & Doors */}
      {/* Left front window with warm glow */}
      <path d="M 60 72 L 78 81 L 78 95 L 60 86 Z" fill={isDarkMode ? "#facc15" : "#38bdf8"} fillOpacity="0.9" />
      <path d="M 69 76 L 69 90" stroke={isDarkMode ? "#ca8a04" : "#0284c7"} strokeWidth="1.5" />
      
      {/* Right side door */}
      <path d="M 115 88 L 132 80 L 132 108 L 115 116 Z" fill="#059669" />
      <circle cx="120" cy="102" r="1.5" fill="#facc15" stroke="none" />

      {/* Roof Isometric Pyramidal Gable */}
      <path d="M 100 16 L 40 48 L 100 78 Z" fill="url(#starter-roof-left)" />
      <path d="M 100 16 L 100 78 L 160 48 Z" fill="url(#starter-roof-right)" />

      {/* Roof Solar Tiles Highlight */}
      <path d="M 58 42 L 95 62" stroke="#bae6fd" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M 70 34 L 98 50" stroke="#bae6fd" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M 105 52 L 142 34" stroke="#7dd3fc" strokeWidth="2" strokeDasharray="4 3" />
    </g>

    {/* Eco Indicator Light on Roof Apex */}
    <circle cx="100" cy="16" r="4" fill="#34d399" />
    <circle cx="100" cy="16" r="7" fill="#34d399" fillOpacity="0.35" className="animate-ping" />
  </svg>
);

// 2. Solar Rooftop Asset: Multi-panel high-efficiency monocrystalline array on sleek eco structure
export const SolarRoofAsset: React.FC<AssetProps> = ({ className = "w-full h-full", isDarkMode, ghost }) => (
  <svg 
    viewBox="0 0 200 160" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    opacity={ghost ? 0.65 : 1}
  >
    <defs>
      <linearGradient id="solar-panel-grad" x1="40" y1="30" x2="160" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>

    {/* Soft Shadow */}
    <ellipse cx="100" cy="118" rx="68" ry="24" fill="#0f172a" fillOpacity={isDarkMode ? 0.45 : 0.25} />

    <g stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      {/* Modern Building Platform */}
      <path d="M 45 98 L 100 128 L 155 98 L 100 68 Z" fill={isDarkMode ? "#1e293b" : "#f1f5f9"} />
      <path d="M 45 98 L 45 106 L 100 136 L 100 128 Z" fill={isDarkMode ? "#0f172a" : "#cbd5e1"} />
      <path d="M 100 128 L 100 136 L 155 106 L 155 98 Z" fill={isDarkMode ? "#0f172a" : "#94a3b8"} />

      {/* Building walls with inverter meter box */}
      <path d="M 52 92 L 52 58 L 100 82 L 100 116 Z" fill={isDarkMode ? "#334155" : "#ffffff"} />
      <path d="M 100 116 L 100 82 L 148 58 L 148 92 Z" fill={isDarkMode ? "#1e293b" : "#e2e8f0"} />

      {/* Smart Inverter Unit with Green Pulse */}
      <path d="M 64 78 L 76 84 L 76 98 L 64 92 Z" fill="#047857" />
      <circle cx="70" cy="88" r="2.5" fill="#34d399" />

      {/* Racked Angled Solar Arrays */}
      <path d="M 46 54 L 46 44 L 100 20 L 100 30 Z" fill="#475569" />
      <path d="M 100 30 L 100 20 L 154 44 L 154 54 Z" fill="#334155" />

      {/* Solar Panel Bank 1 (Left Wing) */}
      <path d="M 38 45 L 96 18 L 112 36 L 54 63 Z" fill="url(#solar-panel-grad)" />
      <path d="M 58 36 L 74 54" stroke="#60a5fa" strokeWidth="1.5" />
      <path d="M 76 27 L 92 45" stroke="#60a5fa" strokeWidth="1.5" />
      <path d="M 47 54 L 105 27" stroke="#93c5fd" strokeWidth="1.5" />

      {/* Solar Panel Bank 2 (Right Wing) */}
      <path d="M 96 18 L 162 48 L 146 66 L 80 36 Z" fill="url(#solar-panel-grad)" />
      <path d="M 118 28 L 102 46" stroke="#60a5fa" strokeWidth="1.5" />
      <path d="M 140 38 L 124 56" stroke="#60a5fa" strokeWidth="1.5" />
      <path d="M 88 27 L 154 57" stroke="#93c5fd" strokeWidth="1.5" />
    </g>

    {/* Glint Animation Sparkle */}
    <path d="M 92 24 L 95 18 L 98 24 L 104 27 L 98 30 L 95 36 L 92 30 L 86 27 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
  </svg>
);

// 3. Community Garden Asset: Raised garden beds, lush landmark tree, vegetables & flowers
export const CommunityGardenAsset: React.FC<AssetProps> = ({ className = "w-full h-full", isDarkMode, ghost }) => (
  <svg 
    viewBox="0 0 200 160" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    opacity={ghost ? 0.65 : 1}
  >
    <defs>
      <linearGradient id="tree-canopy-grad" x1="100" y1="10" x2="100" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="50%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="100" cy="116" rx="68" ry="25" fill="#0f172a" fillOpacity={isDarkMode ? 0.45 : 0.22} />

    <g stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      {/* Stone Planter Base */}
      <path d="M 40 100 L 100 130 L 160 100 L 100 70 Z" fill={isDarkMode ? "#1e293b" : "#86efac"} />
      <path d="M 40 100 L 40 110 L 100 140 L 100 130 Z" fill={isDarkMode ? "#0f172a" : "#15803d"} />
      <path d="M 100 130 L 100 140 L 160 110 L 160 100 Z" fill={isDarkMode ? "#0f172a" : "#166534"} />

      {/* Raised Terraced Soil Beds */}
      <path d="M 52 94 L 84 110 L 100 102 L 68 86 Z" fill="#b45309" />
      <path d="M 112 102 L 128 110 L 150 99 L 134 91 Z" fill="#92400e" />

      {/* Vegetable Sprites */}
      <circle cx="65" cy="94" r="3.5" fill="#ef4444" />
      <circle cx="75" cy="99" r="3.5" fill="#f97316" />
      <circle cx="130" cy="100" r="3.5" fill="#22c55e" />
      <circle cx="140" cy="95" r="3.5" fill="#eab308" />

      {/* Landmark Shading Tree Trunk */}
      <path d="M 94 88 L 94 65 L 106 65 L 106 88 Z" fill="#78350f" />

      {/* Lush Tree Foliage Layers */}
      <circle cx="100" cy="46" r="28" fill="url(#tree-canopy-grad)" />
      <circle cx="82" cy="50" r="18" fill="#22c55e" />
      <circle cx="118" cy="50" r="18" fill="#15803d" />
      <circle cx="100" cy="32" r="18" fill="#86efac" />
    </g>

    {/* Flowers & Butterflies */}
    <circle cx="90" cy="115" r="3.5" fill="#f43f5e" />
    <circle cx="105" cy="118" r="3.5" fill="#fbbf24" />
  </svg>
);

// 4. Eco Home: Highly insulated modern passive architecture with living green roof
export const EcoHomeAsset: React.FC<AssetProps> = ({ className = "w-full h-full", isDarkMode, ghost }) => (
  <svg 
    viewBox="0 0 200 160" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    opacity={ghost ? 0.65 : 1}
  >
    <defs>
      <linearGradient id="living-roof" x1="40" y1="30" x2="160" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>

    <ellipse cx="100" cy="118" rx="66" ry="24" fill="#0f172a" fillOpacity={isDarkMode ? 0.45 : 0.22} />

    <g stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      {/* Foundation Platform */}
      <path d="M 42 98 L 100 128 L 158 98 L 100 68 Z" fill={isDarkMode ? "#1e293b" : "#f1f5f9"} />
      <path d="M 42 98 L 42 108 L 100 138 L 100 128 Z" fill={isDarkMode ? "#0f172a" : "#cbd5e1"} />
      <path d="M 100 128 L 100 138 L 158 108 L 158 98 Z" fill={isDarkMode ? "#0f172a" : "#94a3b8"} />

      {/* Sustainable Timber Walls */}
      <path d="M 50 92 L 50 50 L 100 76 L 100 118 Z" fill={isDarkMode ? "#334155" : "#fed7aa"} />
      <path d="M 100 118 L 100 76 L 150 50 L 150 92 Z" fill={isDarkMode ? "#1e293b" : "#fdba74"} />

      {/* Wood Siding Texture */}
      <path d="M 50 64 L 100 90" stroke={isDarkMode ? "#475569" : "#fb923c"} strokeWidth="1.5" />
      <path d="M 50 78 L 100 104" stroke={isDarkMode ? "#475569" : "#fb923c"} strokeWidth="1.5" />

      {/* Double Glazed High-Efficiency Windows */}
      <path d="M 60 66 L 82 77 L 82 92 L 60 81 Z" fill={isDarkMode ? "#fde047" : "#38bdf8"} />
      <path d="M 114 74 L 138 62 L 138 88 L 114 100 Z" fill={isDarkMode ? "#eab308" : "#0284c7"} />

      {/* Flat Living Green Roof */}
      <path d="M 40 46 L 100 16 L 160 46 L 100 76 Z" fill="url(#living-roof)" />
      <path d="M 40 46 L 40 52 L 100 82 L 100 76 Z" fill="#15803d" />
      <path d="M 100 76 L 100 82 L 160 52 L 160 46 Z" fill="#166534" />
      
      {/* Miniature rooftop ventilation cowl */}
      <path d="M 94 36 L 106 30 L 106 42 L 94 48 Z" fill="#e2e8f0" />
    </g>
  </svg>
);

// 5. Micro Wind Turbine Asset: Sleek composite mast, generator pod, and rotatable aerodynamic blades
export const WindTurbineAsset: React.FC<AssetProps> = ({ className = "w-full h-full", isDarkMode, ghost }) => (
  <svg 
    viewBox="0 0 200 180" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    opacity={ghost ? 0.65 : 1}
  >
    {/* Shadow */}
    <ellipse cx="100" cy="142" rx="55" ry="18" fill="#0f172a" fillOpacity={isDarkMode ? 0.45 : 0.25} />

    <g stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      {/* Concrete Pad */}
      <path d="M 65 132 L 100 150 L 135 132 L 100 114 Z" fill={isDarkMode ? "#334155" : "#e2e8f0"} />
      <path d="M 65 132 L 65 140 L 100 158 L 100 150 Z" fill={isDarkMode ? "#1e293b" : "#94a3b8"} />
      <path d="M 100 150 L 100 158 L 135 140 L 135 132 Z" fill={isDarkMode ? "#0f172a" : "#64748b"} />

      {/* Tapered Monopole Mast */}
      <path d="M 95 130 L 97 50 L 103 50 L 105 130 Z" fill={isDarkMode ? "#94a3b8" : "#f8fafc"} />

      {/* Nacelle Generator Housing */}
      <path d="M 90 48 L 114 42 L 118 54 L 94 60 Z" fill="#38bdf8" />
    </g>

    {/* Rotor Hub and Rotating Blades (CSS animatable group) */}
    <g className="origin-[100px_52px] animate-spin" style={{ animationDuration: '6s' }}>
      {/* Blade 1 (North) */}
      <path d="M 100 52 L 97 6 Q 100 0 103 6 L 100 52 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
      {/* Blade 2 (South-East) */}
      <path d="M 100 52 L 138 74 Q 143 78 139 82 L 100 52 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
      {/* Blade 3 (South-West) */}
      <path d="M 100 52 L 62 74 Q 57 78 61 82 L 100 52 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
      {/* Spinner Nosecone */}
      <circle cx="100" cy="52" r="5" fill="#0284c7" stroke="#0f172a" strokeWidth="2" />
    </g>
  </svg>
);

// 6. Smart Solar Streetlights Asset: Dual LED solar poles with smart sensors
export const SmartLightsAsset: React.FC<AssetProps> = ({ className = "w-full h-full", isDarkMode, ghost }) => (
  <svg 
    viewBox="0 0 200 160" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    opacity={ghost ? 0.65 : 1}
  >
    <ellipse cx="100" cy="120" rx="60" ry="20" fill="#0f172a" fillOpacity={isDarkMode ? 0.45 : 0.22} />

    <g stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      {/* Road pavement section */}
      <path d="M 45 102 L 100 130 L 155 102 L 100 74 Z" fill={isDarkMode ? "#1e293b" : "#475569"} />
      <path d="M 70 94 L 100 109 L 130 94" stroke="#facc15" strokeWidth="2" strokeDasharray="6 4" fill="none" />

      {/* Left Light Pole */}
      <path d="M 68 100 L 68 40 L 82 34" fill="none" stroke={isDarkMode ? "#94a3b8" : "#cbd5e1"} strokeWidth="3" />
      <path d="M 80 32 L 86 36 L 86 42 L 80 38 Z" fill="#facc15" />
      <circle cx="83" cy="36" r="3" fill="#fef08a" />

      {/* Right Light Pole */}
      <path d="M 132 100 L 132 40 L 118 34" fill="none" stroke={isDarkMode ? "#94a3b8" : "#cbd5e1"} strokeWidth="3" />
      <path d="M 120 32 L 114 36 L 114 42 L 120 38 Z" fill="#facc15" />
      <circle cx="117" cy="36" r="3" fill="#fef08a" />
    </g>

    {/* Ambient Light Cones */}
    <polygon points="78,40 55,108 95,115" fill="#fef08a" fillOpacity={isDarkMode ? 0.35 : 0.18} />
    <polygon points="122,40 105,115 145,108" fill="#fef08a" fillOpacity={isDarkMode ? 0.35 : 0.18} />
  </svg>
);

// 7. Clean EV Hub Asset: Rapid charging station with overhead solar canopy
export const EVHubAsset: React.FC<AssetProps> = ({ className = "w-full h-full", isDarkMode, ghost }) => (
  <svg 
    viewBox="0 0 200 160" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    opacity={ghost ? 0.65 : 1}
  >
    <ellipse cx="100" cy="120" rx="66" ry="24" fill="#0f172a" fillOpacity={isDarkMode ? 0.45 : 0.25} />

    <g stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      {/* Charging Bay Concrete */}
      <path d="M 42 100 L 100 130 L 158 100 L 100 70 Z" fill={isDarkMode ? "#1e293b" : "#0284c7"} />
      <path d="M 42 100 L 42 108 L 100 138 L 100 130 Z" fill={isDarkMode ? "#0f172a" : "#0369a1"} />
      <path d="M 100 130 L 100 138 L 158 108 L 158 100 Z" fill={isDarkMode ? "#0f172a" : "#075985"} />

      {/* Charging Terminal 1 */}
      <path d="M 64 96 L 76 102 L 76 74 L 64 68 Z" fill="#ffffff" />
      <path d="M 76 102 L 84 98 L 84 70 L 76 74 Z" fill="#cbd5e1" />
      <rect x="67" y="74" width="6" height="8" rx="1" fill="#10b981" />

      {/* Charging Terminal 2 */}
      <path d="M 116 98 L 128 104 L 128 76 L 116 70 Z" fill="#ffffff" />
      <path d="M 128 104 L 136 100 L 136 72 L 128 76 Z" fill="#cbd5e1" />
      <rect x="119" y="76" width="6" height="8" rx="1" fill="#10b981" />

      {/* Overhead Solar Canopy */}
      <path d="M 52 90 L 52 42" stroke="#475569" strokeWidth="3" />
      <path d="M 148 90 L 148 42" stroke="#475569" strokeWidth="3" />

      {/* Solar Wing */}
      <path d="M 38 42 L 100 12 L 162 42 L 100 72 Z" fill="#1e3a8a" />
      <path d="M 38 42 L 38 48 L 100 78 L 100 72 Z" fill="#172554" />
      <path d="M 100 72 L 100 78 L 162 48 L 162 42 Z" fill="#0f172a" />
    </g>

    {/* Cable & Plug Indicator */}
    <path d="M 76 88 Q 88 94 92 84" stroke="#10b981" strokeWidth="2" fill="none" />
  </svg>
);

// Helper function to render any asset by ID
export const CityAssetSprite: React.FC<{
  assetId: CityAssetId;
  isDarkMode?: boolean;
  ghost?: boolean;
  className?: string;
}> = ({ assetId, isDarkMode, ghost, className = "w-full h-full" }) => {
  switch (assetId) {
    case 'solar-roof':
      return <SolarRoofAsset isDarkMode={isDarkMode} ghost={ghost} className={className} />;
    case 'community-garden':
      return <CommunityGardenAsset isDarkMode={isDarkMode} ghost={ghost} className={className} />;
    case 'eco-home':
      return <EcoHomeAsset isDarkMode={isDarkMode} ghost={ghost} className={className} />;
    case 'wind-turbine':
      return <WindTurbineAsset isDarkMode={isDarkMode} ghost={ghost} className={className} />;
    case 'smart-lights':
      return <SmartLightsAsset isDarkMode={isDarkMode} ghost={ghost} className={className} />;
    case 'ev-hub':
      return <EVHubAsset isDarkMode={isDarkMode} ghost={ghost} className={className} />;
    default:
      return <StarterHomeAsset isDarkMode={isDarkMode} ghost={ghost} className={className} />;
  }
};

// 8. Chibi Guide Voltie & Helper Bot
export const VoltieGuideIllustration: React.FC<{ className?: string; mood?: 'happy' | 'thinking' | 'celebrating' }> = ({
  className = "w-14 h-14",
  mood = 'happy'
}) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Antenna */}
      <path d="M 50 20 L 50 8" stroke="#059669" strokeWidth="3" />
      <circle cx="50" cy="7" r="4.5" fill="#facc15" />
      
      {/* Head Chassis */}
      <rect x="22" y="20" width="56" height="46" rx="16" fill="#10b981" />
      <rect x="28" y="26" width="44" height="32" rx="10" fill="#064e3b" />

      {/* Expressive Digital Eyes */}
      {mood === 'celebrating' ? (
        <>
          <path d="M 38 40 Q 42 34 46 40" stroke="#6ee7b7" strokeWidth="3" fill="none" />
          <path d="M 54 40 Q 58 34 62 40" stroke="#6ee7b7" strokeWidth="3" fill="none" />
        </>
      ) : (
        <>
          <circle cx="42" cy="38" r="4.5" fill="#6ee7b7" />
          <circle cx="58" cy="38" r="4.5" fill="#6ee7b7" />
        </>
      )}
      
      {/* Mouth */}
      <path d="M 44 48 Q 50 54 56 48" stroke="#6ee7b7" strokeWidth="2.5" fill="none" />

      {/* Floating Body */}
      <path d="M 32 66 L 28 86 L 72 86 L 68 66 Z" fill="#059669" />
      <circle cx="50" cy="76" r="6" fill="#facc15" stroke="none" />
      <path d="M 50 72 L 48 76 L 52 75 L 50 80" stroke="#78350f" strokeWidth="1.5" fill="none" />

      {/* Floating Repulsor Jet */}
      <ellipse cx="50" cy="90" rx="14" ry="4" fill="#38bdf8" fillOpacity="0.9" />
    </g>
  </svg>
);

// 9. Compact Helper Bot (Eco-Drone)
export const HelperBotIllustration: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Propellers */}
      <ellipse cx="24" cy="20" rx="14" ry="3" fill="#94a3b8" />
      <ellipse cx="56" cy="20" rx="14" ry="3" fill="#94a3b8" />
      <path d="M 24 20 L 32 32" stroke="#475569" strokeWidth="2" />
      <path d="M 56 20 L 48 32" stroke="#475569" strokeWidth="2" />

      {/* Spherical Drone Pod */}
      <circle cx="40" cy="42" r="18" fill="#38bdf8" />
      <circle cx="40" cy="42" r="12" fill="#0284c7" />
      <circle cx="40" cy="42" r="6" fill="#fef08a" />
      
      {/* Mini Scanner Beam */}
      <polygon points="34,60 40,75 46,60" fill="#34d399" fillOpacity="0.4" stroke="none" />
    </g>
  </svg>
);

// 10. Power Problem Monster (Standby Phantom Vampire)
export const PowerProblemIllustration: React.FC<{ className?: string }> = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Phantom Body */}
      <path 
        d="M 60 15 C 35 15 25 35 25 60 C 25 85 35 95 45 105 C 55 98 65 105 75 98 C 85 105 95 85 95 60 C 95 35 85 15 60 15 Z" 
        fill="#8b5cf6" 
      />
      <path 
        d="M 60 25 C 42 25 35 40 35 60 C 35 78 45 88 55 92 C 62 88 68 92 75 88 C 82 92 85 78 85 60 C 85 40 78 25 60 25 Z" 
        fill="#6d28d9" 
      />

      {/* Mischievous Eyes */}
      <ellipse cx="46" cy="50" rx="6" ry="8" fill="#fef08a" />
      <circle cx="48" cy="50" r="3" fill="#0f172a" />

      <ellipse cx="74" cy="50" rx="6" ry="8" fill="#fef08a" />
      <circle cx="72" cy="50" r="3" fill="#0f172a" />

      {/* Spark Teeth */}
      <path d="M 44 72 L 50 68 L 56 72 L 62 68 L 68 72 L 74 68" stroke="#fef08a" strokeWidth="2.5" fill="none" />

      {/* Floating Standby Plugs */}
      <path d="M 20 40 L 10 44 L 14 52 L 24 48 Z" fill="#f59e0b" />
      <path d="M 100 40 L 110 44 L 106 52 L 96 48 Z" fill="#f59e0b" />
    </g>
  </svg>
);

export const EnergyCoachIllustration = VoltieGuideIllustration;

