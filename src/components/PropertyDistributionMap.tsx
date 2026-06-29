import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { adjustColorLegibility } from '../utils/colorAdjuster';

interface PropertyDistributionMapProps {
  lang: 'th' | 'en';
  isDarkMode?: boolean;
}

type HeatmapMode = 'density' | 'solar' | 'carbon' | 'risk';

interface SectorData {
  id: string;
  nameTh: string;
  nameEn: string;
  locationTh: string;
  locationEn: string;
  primaryEnergyTh: string;
  primaryEnergyEn: string;
  // Metrics for different modes
  metrics: {
    density: number; // kW/m²
    solar: number;   // W/m² irradiance
    carbon: number;  // g CO2/kWh
    risk: number;    // % Peak Overload risk
  };
  detailsTh: string;
  detailsEn: string;
  icon: string;
  colorTheme: string;
}

export const PropertyDistributionMap: React.FC<PropertyDistributionMapProps> = ({ lang, isDarkMode = false }) => {
  const [activeMode, setActiveMode] = useState<HeatmapMode>('density');
  const [selectedSectorId, setSelectedSectorId] = useState<string>('central');
  const [optimizedSectors, setOptimizedSectors] = useState<Record<string, boolean>>({});
  const [optimizationLoading, setOptimizationLoading] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial sector dataset (aligned with campus-wide constants)
  const initialSectors: SectorData[] = [
    {
      id: 'central',
      nameTh: 'ศูนย์กลางบริหารจัดการส่วนกลาง',
      nameEn: 'Central Administration Hub',
      locationTh: 'ใจกลางแคมปัส (Core Area)',
      locationEn: 'Campus Core Center',
      primaryEnergyTh: 'พลังงานกริดร่วมและแบตเตอรี่เสถียร',
      primaryEnergyEn: 'Co-Grid & Storage Stabilizers',
      metrics: {
        density: 48,
        solar: 120,
        carbon: 240,
        risk: 85,
      },
      detailsTh: 'ศูนย์รวมอาคารเรียนหลัก สำนักงาน และอาคารกิจกรรมนักศึกษา มีความหนาแน่นของผู้ใช้งานสูงและเป็นจุดศูนย์กลางภาระโหลดไฟฟ้าของแคมปัส',
      detailsEn: 'Main academic offices, central lecture halls, and student centers. High occupant density and serves as the primary load center of the campus grid.',
      icon: 'fa-building',
      colorTheme: 'purple',
    },
    {
      id: 'west',
      nameTh: 'เขตพลังงานแสงอาทิตย์ตะวันตก',
      nameEn: 'Campus West Solar Sector',
      locationTh: 'ที่ราบลาดตะวันตก (Campus West Sector)',
      locationEn: 'Campus West Slope',
      primaryEnergyTh: 'โซลาร์เซลล์แสงอาทิตย์ (Photovoltaic Hub)',
      primaryEnergyEn: 'Photovoltaic Array',
      metrics: {
        density: 12,
        solar: 450,
        carbon: 18,
        risk: 20,
      },
      detailsTh: 'ศูนย์กลางผลิตพลังงานแสงอาทิตย์หลัก ติดตั้งแผงโซลาร์บนหลังคาอาคารพักอาศัยและลานจอดรถอัจฉริยะ มีอัตราคาร์บอนฟุตพริ้นท์ต่ำมาก',
      detailsEn: 'Primary solar generation field. Features extensive rooftop PV arrays on dormitories and smart solar carports. Extremely low carbon footprint.',
      icon: 'fa-sun',
      colorTheme: 'amber',
    },
    {
      id: 'north',
      nameTh: 'เขตฟาร์มกังหันลมเนินเหนือ',
      nameEn: 'North Hill Wind Plateau',
      locationTh: 'ที่ราบสูงเนินเหนือ (North Hill Plateau)',
      locationEn: 'North Hill Ridge',
      primaryEnergyTh: 'กังหันลมผลิตไฟฟ้า (Kinetic Wind Turbines)',
      primaryEnergyEn: 'Kinetic Wind Array',
      metrics: {
        density: 18,
        solar: 90,
        carbon: 12,
        risk: 25,
      },
      detailsTh: 'พื้นที่ช่องลมที่ราบสูงเนินเขาตอนเหนือ ติดตั้งกังหันลมประสิทธิภาพสูงและแบตเตอรี่สะสมพลังงานจลน์เพื่อจ่ายเข้าระบบประหยัดไฟกลางคืน',
      detailsEn: 'High-altitude wind capture zone on the northern ridge. Features kinetic turbine arrays and chemical batteries for night-load shaving.',
      icon: 'fa-wind',
      colorTheme: 'sky',
    },
    {
      id: 'east',
      nameTh: 'สถานีไฮโดรพลังน้ำอ่างเก็บน้ำ',
      nameEn: 'Eastern Reservoir Hydro Station',
      locationTh: 'อ่างเก็บน้ำตะวันออก (Eastern Reservoir)',
      locationEn: 'Eastern Reservoir Basin',
      primaryEnergyTh: 'พลังงานน้ำหมุนเวียน (Hydro-Power Turbine)',
      primaryEnergyEn: 'Hydroelectric Generator',
      metrics: {
        density: 25,
        solar: 110,
        carbon: 8,
        risk: 45,
      },
      detailsTh: 'ใช้ประโยชน์จากการระบายน้ำและระดับควบคุมเพื่อผลิตกระแสไฟฟ้า มีการจัดเก็บพลังงานแบบสูบกลับและสถานีควบคุมกรองน้ำสะอาดแคมปัส',
      detailsEn: 'Leverages reservoir run-of-river turbines and pumped hydro storage to secure campus baseline power while maintaining water quality.',
      icon: 'fa-water',
      colorTheme: 'blue',
    },
    {
      id: 'research',
      nameTh: 'เขตวิจัยและพลังงานความร้อนใต้พิภพ',
      nameEn: 'Geothermal Research District',
      locationTh: 'ย่านนวัตกรรมใต้แคมปัส (Research District)',
      locationEn: 'Research Innovation Zone',
      primaryEnergyTh: 'ความร้อนใต้พิภพขั้นสูง (Deep Geothermal Core)',
      primaryEnergyEn: 'Deep Geothermal Loop',
      metrics: {
        density: 39,
        solar: 280,
        carbon: 45,
        risk: 70,
      },
      detailsTh: 'เขตห้องแล็บวิจัยเทคโนโลยีหลัก คอมพิวเตอร์เซิร์ฟเวอร์ความหนาแน่นสูง และระบบดึงความร้อนใต้ดินลึกเพื่อนำมาปรับอากาศประหยัดพลังงาน',
      detailsEn: 'Hosts high-performance research laboratories, supercomputer arrays, and deep thermal extraction tubes for dynamic environmental control.',
      icon: 'fa-atom',
      colorTheme: 'indigo',
    },
    {
      id: 'south',
      nameTh: 'หน่วยชีวมวลป่าสวนใต้',
      nameEn: 'Southern Biomass Arboretum',
      locationTh: 'ป่าอนุรักษ์ธรรมชาติใต้ (Southern Arboretum)',
      locationEn: 'Southern Forestry Reserve',
      primaryEnergyTh: 'พลังงานชีวมวลออร์แกนิก (Biomass Converter)',
      primaryEnergyEn: 'Organic Biomass Converter',
      metrics: {
        density: 15,
        solar: 150,
        carbon: 35,
        risk: 15,
      },
      detailsTh: 'ศูนย์วิจัยวัสดุอินทรีย์และการแปรรูปของเสียจากใบไม้และเศษกิ่งไม้รอบแคมปัสเพื่อเปลี่ยนเป็นเชื้อเพลิงพลังงานความร้อนร่วมที่เป็นมิตรต่อสิ่งแวดล้อม',
      detailsEn: 'Fuses campus organic landscape waste with advanced biological digesters to produce clean combined-heat-and-power (CHP) biogas.',
      icon: 'fa-leaf',
      colorTheme: 'emerald',
    },
  ];

  // Adjust metrics based on optimized state
  const sectors = initialSectors.map(s => {
    if (optimizedSectors[s.id]) {
      return {
        ...s,
        metrics: {
          density: Math.round(s.metrics.density * 0.75),
          solar: s.metrics.solar, // Solar potential is geographic, doesn't change
          carbon: Math.round(s.metrics.carbon * 0.65),
          risk: Math.round(s.metrics.risk * 0.5),
        }
      };
    }
    return s;
  });

  const selectedSector = sectors.find(s => s.id === selectedSectorId) || sectors[0];

  // Colors mapping for SVG sectors based on metric intensity
  const getHeatmapColor = (sector: SectorData) => {
    const val = sector.metrics[activeMode];
    
    if (activeMode === 'density') {
      // Range: 0 to 50 kW/m²
      if (val < 15) return 'fill-emerald-500/25 stroke-emerald-500 dark:fill-emerald-500/15 dark:stroke-emerald-400';
      if (val < 35) return 'fill-amber-500/35 stroke-amber-500 dark:fill-amber-500/20 dark:stroke-amber-400';
      return 'fill-rose-500/40 stroke-rose-500 dark:fill-rose-500/25 dark:stroke-rose-400';
    } else if (activeMode === 'solar') {
      // Range: 0 to 500 W/m²
      if (val < 150) return 'fill-slate-300/25 stroke-slate-400 dark:fill-slate-800/20 dark:stroke-slate-600';
      if (val < 300) return 'fill-amber-400/30 stroke-amber-400 dark:fill-amber-400/15 dark:stroke-amber-400';
      return 'fill-orange-500/45 stroke-orange-500 dark:fill-orange-500/30 dark:stroke-orange-400';
    } else if (activeMode === 'carbon') {
      // Range: 0 to 250 g/kWh
      if (val < 30) return 'fill-emerald-500/30 stroke-emerald-500 dark:fill-emerald-500/15 dark:stroke-emerald-400';
      if (val < 100) return 'fill-amber-500/35 stroke-amber-500 dark:fill-amber-500/20 dark:stroke-amber-400';
      return 'fill-red-900/40 stroke-red-800 dark:fill-red-950/25 dark:stroke-red-600';
    } else {
      // Risk range: 0 to 100%
      if (val < 30) return 'fill-teal-500/25 stroke-teal-500 dark:fill-teal-500/15 dark:stroke-teal-400';
      if (val < 70) return 'fill-orange-500/35 stroke-orange-500 dark:fill-orange-500/20 dark:stroke-orange-400';
      return 'fill-red-600/45 stroke-red-600 dark:fill-red-600/30 dark:stroke-red-500';
    }
  };

  // Human readable label mapping
  const modeLabelsTh = {
    density: 'ความหนาแน่นโหลดไฟ (kW/m²)',
    solar: 'รังสีแสงอาทิตย์ (W/m²)',
    carbon: 'คาร์บอนฟุตพริ้นท์ (g CO₂/kWh)',
    risk: 'ความเสี่ยงโหลดพีคเกินพิกัด (%)',
  };

  const modeLabelsEn = {
    density: 'Energy Load Density (kW/m²)',
    solar: 'Solar Solar Irradiance (W/m²)',
    carbon: 'Carbon Footprint (g CO₂/kWh)',
    risk: 'Peak Overload Grid Risk (%)',
  };

  const handleOptimizeSector = (sectorId: string) => {
    setOptimizationLoading(sectorId);
    
    setTimeout(() => {
      setOptimizedSectors(prev => ({ ...prev, [sectorId]: true }));
      setOptimizationLoading(null);
      const successMsg = lang === 'th' 
        ? `ปรับจูนกริดอัจฉริยะในเขต "${sectors.find(s => s.id === sectorId)?.nameTh}" สำเร็จ! ลดการปล่อยคาร์บอน 35% และลดโหลดพีค 50%`
        : `Smart Grid calibration for "${sectors.find(s => s.id === sectorId)?.nameEn}" completed! Cut carbon footprint by 35% & peak risks halved.`;
      
      setToastMessage(successMsg);
      setTimeout(() => setToastMessage(null), 5000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900/15">
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6 pb-4 border-b border-dashed border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold font-display text-slate-800 dark:text-slate-50 flex items-center gap-2">
            <i className="fas fa-map-marked-alt text-primary"></i>
            <span>
              {lang === 'th' 
                ? 'แผนผังกระจายการใช้พลังงานและเซกเตอร์แคมปัส' 
                : 'Campus Property Distribution & Sector Heatmap'}
            </span>
          </h4>
          <p className="text-[0.75rem] text-slate-500 dark:text-slate-100 leading-normal mt-0.5">
            {lang === 'th'
              ? 'เลือกระบบวิเคราะห์เพื่อแสดงสีกราฟความหนาแน่นเชิงพื้นที่ และคลิกเลือกอาคารเพื่อสั่งการปรับจูนกริดไฟฟ้าอัจฉริยะ'
              : 'Switch heatmap views to audit spatial efficiency and click sectors to calibrate localized power distribution.'}
          </p>
        </div>

        {/* Heatmap Modes Select Button Bar */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-white/5">
          {(['density', 'solar', 'carbon', 'risk'] as HeatmapMode[]).map((mode) => (
            <button
              key={mode}
              title={
                lang === 'th'
                  ? `แสดงแผนที่ความร้อนตามข้อมูล${modeLabelsTh[mode]}`
                  : `Display heatmap based on ${modeLabelsEn[mode]}`
              }
              onClick={() => setActiveMode(mode)}
              className={`px-3 py-1.5 text-[0.7rem] font-bold font-display rounded-xl tracking-tight transition-all flex items-center gap-1.5 ${
                activeMode === mode
                  ? 'bg-white dark:bg-slate-800 text-primary dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-100 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <i className={`fas ${
                mode === 'density' ? 'fa-bolt text-sky-500' :
                mode === 'solar' ? 'fa-sun text-amber-500' :
                mode === 'carbon' ? 'fa-leaf text-emerald-500' : 'fa-exclamation-triangle text-rose-500'
              }`}></i>
              <span>
                {lang === 'th' 
                  ? (mode === 'density' ? 'ภาระโหลด' : mode === 'solar' ? 'รังสีโซลาร์' : mode === 'carbon' ? 'คาร์บอน' : 'ความเสี่ยงพีค')
                  : (mode === 'density' ? 'Load' : mode === 'solar' ? 'Solar' : mode === 'carbon' ? 'Carbon' : 'Peak Risk')
                }
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Dashboard Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left column: SVG Interactive Map Container */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center p-4 bg-slate-50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-850/60 rounded-[1.5rem] relative min-h-[300px]">
          
          {/* Compass grid background decorations */}
          <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none select-none overflow-hidden">
            <svg width="100%" height="100%">
              <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          <div className="absolute top-3 left-3 text-[0.7rem] font-mono font-black text-slate-400 dark:text-slate-100 tracking-wider">
            SCADA GEOSPATIAL MAP // ACTIVE_GRID: {activeMode.toUpperCase()}
          </div>

          {/* Toast Alert within map container */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-10 left-4 right-4 z-20 p-3 bg-emerald-550 border border-emerald-400/30 text-white rounded-xl shadow-lg text-[0.75rem] font-bold flex items-center gap-2"
              >
                <i className="fas fa-check-circle text-sm animate-bounce"></i>
                <span className="flex-1 leading-normal">{toastMessage}</span>
                <button 
                  onClick={() => setToastMessage(null)} 
                  className="hover:opacity-80 p-0.5"
                >
                  <i className="fas fa-times"></i>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Render Vector SVG Map */}
          <div className="w-full max-w-[480px] aspect-[500/350] relative">
            <svg 
              viewBox="0 0 500 350" 
              className="w-full h-full select-none"
            >
              {/* Central grid circle */}
              <circle cx="250" cy="175" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-100" strokeDasharray="3,3" />
              <circle cx="250" cy="175" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-100" strokeDasharray="3,3" />

              {/* Map Paths with color and animation */}
              <g className="cursor-pointer">
                {sectors.map((sec) => {
                  const isSelected = selectedSectorId === sec.id;
                  const isOptimized = optimizedSectors[sec.id];
                  const heatClass = getHeatmapColor(sec);
                  
                  // Coordinate points for each shape
                  let points = "";
                  if (sec.id === 'north') points = "100,20 400,20 350,110 150,110";
                  else if (sec.id === 'west') points = "30,120 140,120 140,240 30,240";
                  else if (sec.id === 'central') points = "160,120 340,120 340,220 160,220";
                  else if (sec.id === 'east') points = "360,120 470,120 470,240 360,240";
                  else if (sec.id === 'south') points = "50,250 230,250 190,330 90,330";
                  else if (sec.id === 'research') points = "250,250 450,250 410,330 290,330";

                  // Label positions
                  let labelPos = { x: 250, y: 175 };
                  if (sec.id === 'north') labelPos = { x: 250, y: 65 };
                  else if (sec.id === 'west') labelPos = { x: 85, y: 180 };
                  else if (sec.id === 'central') labelPos = { x: 250, y: 170 };
                  else if (sec.id === 'east') labelPos = { x: 415, y: 180 };
                  else if (sec.id === 'south') labelPos = { x: 140, y: 290 };
                  else if (sec.id === 'research') labelPos = { x: 350, y: 290 };

                  return (
                    <g 
                      key={sec.id}
                      onClick={() => setSelectedSectorId(sec.id)}
                      className="group/polygon"
                    >
                      {/* Polygon element with transition */}
                      <polygon
                        points={points}
                        className={`transition-all duration-500 ease-in-out stroke-[2] ${heatClass} ${
                          isSelected 
                            ? 'stroke-primary dark:stroke-sky-400 drop-shadow-md brightness-110 scale-[1.01]' 
                            : 'hover:brightness-105 hover:stroke-slate-400'
                        }`}
                        style={{ transformOrigin: '250px 175px' }}
                      />

                      {/* Dynamic pulsing active element inside polygon if optimized */}
                      {isOptimized && (
                        <circle
                          cx={labelPos.x}
                          cy={labelPos.y + 12}
                          r="4"
                          className="fill-emerald-500 animate-ping"
                        />
                      )}

                      {/* Small Sector Energy Source Icon */}
                      <g transform={`translate(${labelPos.x - 7}, ${labelPos.y - 18})`} className="pointer-events-none">
                        <circle cx="7" cy="7" r="9" className="fill-white/80 dark:fill-slate-900/90 stroke-slate-300 dark:stroke-slate-700 stroke-[1]" />
                        <foreignObject x="2.5" y="2" width="10" height="10">
                          <div className="flex items-center justify-center text-[0.65rem] text-slate-700 dark:text-slate-100">
                            <i className={`fas ${sec.icon}`}></i>
                          </div>
                        </foreignObject>
                      </g>

                      {/* Sector Short Label text inside shape */}
                      <text
                        x={labelPos.x}
                        y={labelPos.y + 7}
                        textAnchor="middle"
                        className="text-[8.5px] font-black font-mono tracking-tighter pointer-events-none select-none transition-colors"
                        style={{ fill: adjustColorLegibility(isSelected ? 'sky-500' : 'slate', isDarkMode) }}
                      >
                        {sec.id === 'central' ? 'CORE' : sec.id.toUpperCase()}
                      </text>

                      {/* Secondary value overlay depending on active heatmap mode */}
                      <text
                        x={labelPos.x}
                        y={labelPos.y + 16}
                        textAnchor="middle"
                        className="text-[0.65rem] font-bold font-mono pointer-events-none select-none"
                        style={{ fill: adjustColorLegibility('indigo-600', isDarkMode) }}
                      >
                        {sec.metrics[activeMode]}
                        {activeMode === 'density' ? ' kW' : activeMode === 'solar' ? ' W' : activeMode === 'carbon' ? ' g' : '%'}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Overlay direction coordinates marker */}
              <text x="250" y="15" textAnchor="middle" className="text-[7px] font-mono fill-slate-400">N // 00°</text>
              <text x="490" y="178" textAnchor="end" className="text-[7px] font-mono fill-slate-400">E // 90°</text>
              <text x="250" y="345" textAnchor="middle" className="text-[7px] font-mono fill-slate-400">S // 180°</text>
              <text x="10" y="178" textAnchor="start" className="text-[7px] font-mono fill-slate-400">W // 270°</text>
            </svg>
          </div>

          {/* Color Indicator Legend */}
          <div className="w-full max-w-[420px] mt-4 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800/80 flex justify-between items-center text-[8.5px] font-mono text-slate-500 dark:text-slate-100">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500" />
              <span>{lang === 'th' ? 'ประสิทธิภาพดี / ต่ำ' : 'Optimal / Low'}</span>
            </span>
            <span className="text-[0.7rem] font-bold text-slate-700 dark:text-slate-100">
              {lang === 'th' ? modeLabelsTh[activeMode] : modeLabelsEn[activeMode]}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-500" />
              <span>{lang === 'th' ? 'หนาแน่น / สูงวิกฤต' : 'Intense / Critical'}</span>
            </span>
          </div>
        </div>

        {/* Right column: Selected Sector Detailed Audit & Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 bg-slate-50/40 dark:bg-slate-900/45 border border-slate-200 dark:border-slate-850/60 rounded-[1.5rem] relative">
          
          {/* Header Title with localized Sector Info */}
          <div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary dark:bg-sky-400/10 dark:text-sky-400 border border-primary/10 dark:border-sky-400/10 text-[0.65rem] font-mono font-black uppercase tracking-widest">
                  {selectedSector.id.toUpperCase()}_SECTOR_DIAGNOSTICS
                </span>
                <h5 className="text-sm font-bold font-display text-slate-800 dark:text-slate-50 mt-1 leading-tight">
                  {lang === 'th' ? selectedSector.nameTh : selectedSector.nameEn}
                </h5>
                <p className="text-[0.7rem] font-semibold text-slate-500 dark:text-slate-100 flex items-center gap-1 mt-0.5">
                  <i className="fas fa-map-marker-alt text-slate-400 text-[8.5px]"></i>
                  {lang === 'th' ? selectedSector.locationTh : selectedSector.locationEn}
                </p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shrink-0">
                <i className={`fas ${selectedSector.icon} text-sm`}></i>
              </div>
            </div>

            <p className="text-[0.75rem] text-slate-600 dark:text-slate-100 leading-relaxed bg-white dark:bg-slate-950/20 p-3 rounded-xl border border-slate-150 dark:border-slate-850/40">
              {lang === 'th' ? selectedSector.detailsTh : selectedSector.detailsEn}
            </p>

            {/* Grid Metrics List with Gauges */}
            <div className="space-y-3 mt-4.5">
              
              {/* Load Density Metric */}
              <div className="bg-white/50 dark:bg-slate-950/20 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850/40">
                <div className="flex justify-between text-[0.7rem] font-mono mb-1">
                  <span className="text-slate-500 dark:text-slate-100 flex items-center gap-1">
                    <i className="fas fa-bolt text-sky-500"></i>
                    {lang === 'th' ? 'ภาระความต้องการใช้ไฟฟ้า:' : 'Energy Load Density:'}
                  </span>
                  <span className="font-bold" style={{ color: adjustColorLegibility('sky-600', isDarkMode) }}>
                    {selectedSector.metrics.density} kW/m²
                  </span>
                </div>
                {/* Visual meter */}
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sky-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (selectedSector.metrics.density / 60) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Solar potential Metric */}
              <div className="bg-white/50 dark:bg-slate-950/20 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850/40">
                <div className="flex justify-between text-[0.7rem] font-mono mb-1">
                  <span className="text-slate-500 dark:text-slate-100 flex items-center gap-1">
                    <i className="fas fa-sun text-amber-500"></i>
                    {lang === 'th' ? 'ศักยภาพแผงโซลาร์เซลล์:' : 'Solar Irradiance (Rooftop):'}
                  </span>
                  <span className="font-bold" style={{ color: adjustColorLegibility('amber-600', isDarkMode) }}>
                    {selectedSector.metrics.solar} W/m²
                  </span>
                </div>
                {/* Visual meter */}
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${(selectedSector.metrics.solar / 500) * 100}%` }}
                  />
                </div>
              </div>

              {/* Carbon Footprint Metric */}
              <div className="bg-white/50 dark:bg-slate-950/20 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850/40">
                <div className="flex justify-between text-[0.7rem] font-mono mb-1">
                  <span className="text-slate-500 dark:text-slate-100 flex items-center gap-1">
                    <i className="fas fa-leaf text-emerald-500"></i>
                    {lang === 'th' ? 'อัตราการปล่อยคาร์บอน:' : 'Carbon Footprint Index:'}
                  </span>
                  <span className="font-bold" style={{ color: adjustColorLegibility('emerald-600', isDarkMode) }}>
                    {selectedSector.metrics.carbon} g CO₂/kWh
                  </span>
                </div>
                {/* Visual meter */}
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (selectedSector.metrics.carbon / 250) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Peak Risk Metric */}
              <div className="bg-white/50 dark:bg-slate-950/20 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850/40">
                <div className="flex justify-between text-[0.7rem] font-mono mb-1">
                  <span className="text-slate-500 dark:text-slate-100 flex items-center gap-1">
                    <i className="fas fa-exclamation-triangle text-rose-500"></i>
                    {lang === 'th' ? 'ความเสี่ยงโหลดระบบเกินพิกัด:' : 'Peak Overload Danger:'}
                  </span>
                  <span className="font-bold" style={{ color: adjustColorLegibility(selectedSector.metrics.risk > 70 ? 'red-600' : 'slate', isDarkMode) }}>
                    {selectedSector.metrics.risk}%
                  </span>
                </div>
                {/* Visual meter */}
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${selectedSector.metrics.risk > 70 ? 'bg-rose-500' : 'bg-rose-400/80'}`}
                    style={{ width: `${selectedSector.metrics.risk}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Calibrate / Action Controls */}
          <div className="mt-5 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[0.7rem] font-mono text-slate-500 dark:text-slate-100 mb-1">
                <span>GRID CONTROLLER: LOCALIZED_TUNING</span>
                <span>STATUS: {optimizedSectors[selectedSector.id] ? 'OPTIMIZED' : 'STANDARD'}</span>
              </div>

              {optimizedSectors[selectedSector.id] ? (
                <div className="w-full p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                  <i className="fas fa-check-double text-sm"></i>
                  <span>
                    {lang === 'th' 
                      ? 'เขตนี้เปิดระบบปรับจูนกริดอัจฉริยะแล้ว (คาร์บอนและโหลดลดสูงสุด)' 
                      : 'Localized AI Smart Grid Tuning is active for this sector'}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  title={
                    lang === 'th'
                      ? 'สั่งการลดโหลดและเปิดการใช้งานประหยัดไฟสำหรับโซนนี้'
                      : 'Initiate localized smart grid tuning to reduce peak load'
                  }
                  disabled={optimizationLoading === selectedSector.id}
                  onClick={() => handleOptimizeSector(selectedSector.id)}
                  className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold font-display shadow-lg shadow-primary/25 active:scale-98 disabled:opacity-75 transition-all flex items-center justify-center gap-2"
                >
                  {optimizationLoading === selectedSector.id ? (
                    <>
                      <i className="fas fa-cog fa-spin"></i>
                      <span>
                        {lang === 'th' ? 'กำลังปูนโหลดความถี่ปริมาณกริด...' : 'Recalibrating high-frequency grids...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sliders-h"></i>
                      <span>
                        {lang === 'th' 
                          ? `สั่งการจูนกริดประหยัดพลังงานเขต ${selectedSector.id.toUpperCase()}` 
                          : `Calibrate Smart Grid for ${selectedSector.id.toUpperCase()}`}
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
