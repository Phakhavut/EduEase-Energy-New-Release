export type CityAssetId =
  | 'solar-roof'
  | 'community-garden'
  | 'eco-home'
  | 'wind-turbine'
  | 'smart-lights'
  | 'ev-hub';

export interface CityAssetDefinition {
  id: CityAssetId;
  nameTh: string;
  nameEn: string;
  category: 'energy' | 'nature' | 'efficiency' | 'mobility';
  costCredits: number;
  unlockLevel: number;
  descriptionTh: string;
  descriptionEn: string;
  impactTh: string;
  impactEn: string;
  cleanEnergyKwh: number;
  savingBahtMonth: number;
  greenScoreBonus: number;
}

export interface PlotDefinition {
  id: string;
  labelTh: string;
  labelEn: string;
  // The asset origin in the SAME SVG viewBox coordinate system (0 0 1200 720)
  anchor: { x: number; y: number };
  // Diamond hit polygon points in the SAME SVG viewBox coordinate system
  hitPoints: string;
  accepts: CityAssetId[];
  unlocked: boolean;
  unlockLevel: number;
  district: number;
}

export interface CityPlot {
  id: string;
  labelTh: string;
  labelEn: string;
  x: number;
  y: number;
  unlocked: boolean;
  unlockLevel: number;
  assetId?: CityAssetId;
}

export interface SimplifiedCityProgress {
  introSeen: boolean;
  level: number;
  plots: CityPlot[];
  health: number;
}

export interface DistrictProject {
  id: string;
  districtNum: number;
  titleTh: string;
  titleEn: string;
  subtitleTh: string;
  subtitleEn: string;
  goalTh: string;
  goalEn: string;
  targetAssetId: CityAssetId;
  suggestedPlotId: string;
  rewardCredits: number;
  linkedMissionId: string;
  linkedChallengeId: string;
  completedStoryTh: string;
  completedStoryEn: string;
}

export interface JourneyMission {
  id: string;
  titleTh: string;
  titleEn: string;
  category: 'today' | 'weekly' | 'completed';
  instructionTh: string;
  instructionEn: string;
  expectedBenefitTh: string;
  expectedBenefitEn: string;
  targetCount: number;
  currentCount: number;
  creditReward: number;
  deepLinkPage: string;
  iconName: 'zap' | 'thermometer' | 'plug' | 'wallet' | 'bot' | 'scale';
  status: 'available' | 'in_progress' | 'ready_to_claim' | 'claimed';
  unlockedAssetId?: CityAssetId;
  achievementBadgeId?: string;
}

export interface JourneyAchievement {
  id: string;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  group: 'city' | 'habits' | 'learning';
  unlocked: boolean;
  unlockedAt?: string;
  requirementTh: string;
  requirementEn: string;
  creditReward: number;
  iconType: 'solar' | 'garden' | 'wind' | 'eco' | 'badge' | 'star';
}

export interface PowerChallengeData {
  id: string;
  titleTh: string;
  titleEn: string;
  problemScenarioTh: string;
  problemScenarioEn: string;
  monsterNameTh: string;
  monsterNameEn: string;
  questionTh: string;
  questionEn: string;
  options: {
    id: string;
    textTh: string;
    textEn: string;
    icon: string;
    isCorrect: boolean;
    explanationTh: string;
    explanationEn: string;
  }[];
  creditReward: number;
  unlocksAssetId?: CityAssetId;
}

export const CITY_ASSET_DEFINITIONS: Record<CityAssetId, CityAssetDefinition> = {
  'solar-roof': {
    id: 'solar-roof',
    nameTh: 'หลังคาโซลาร์เซลล์',
    nameEn: 'Solar Rooftop',
    category: 'energy',
    costCredits: 80,
    unlockLevel: 1,
    descriptionTh: 'ผลิตพลังงานสะอาดจากแสงแดด ลดการพึ่งพาไฟฟ้าจากสายส่ง',
    descriptionEn: 'Generates clean solar power, reducing dependence on the grid',
    impactTh: '+45 kWh/เดือน พลังงานสะอาด',
    impactEn: '+45 kWh/mo Clean Energy',
    cleanEnergyKwh: 45,
    savingBahtMonth: 195,
    greenScoreBonus: 12
  },
  'community-garden': {
    id: 'community-garden',
    nameTh: 'สวนชุมชนลดความร้อน',
    nameEn: 'Community Garden',
    category: 'nature',
    costCredits: 60,
    unlockLevel: 1,
    descriptionTh: 'เพิ่มร่มเงา ลดเกาะความร้อนในเมือง ทำให้บ้านข้างเคียงประหยัดแอร์',
    descriptionEn: 'Adds urban canopy, lowers micro-climate heat, cuts AC load',
    impactTh: '+25% พื้นที่สีเขียว',
    impactEn: '+25% Green Space Area',
    cleanEnergyKwh: 0,
    savingBahtMonth: 80,
    greenScoreBonus: 15
  },
  'eco-home': {
    id: 'eco-home',
    nameTh: 'บ้านประหยัดพลังงาน',
    nameEn: 'Energy-efficient Home',
    category: 'efficiency',
    costCredits: 120,
    unlockLevel: 2,
    descriptionTh: 'ออกแบบฉนวนกันความร้อนและระบายอากาศธรรมชาติ ลดใช้พลังงาน 30%',
    descriptionEn: 'Built with thermal insulation & natural airflow, cutting 30% load',
    impactTh: '-35 kWh/เดือน การสูญเสีย',
    impactEn: '-35 kWh/mo Energy Loss',
    cleanEnergyKwh: 15,
    savingBahtMonth: 240,
    greenScoreBonus: 18
  },
  'wind-turbine': {
    id: 'wind-turbine',
    nameTh: 'กังหันลมไมโคร',
    nameEn: 'Micro Wind Turbine',
    category: 'energy',
    costCredits: 150,
    unlockLevel: 2,
    descriptionTh: 'ผลิตพลังงานสะอาดตลอดวันด้วยกระแสลมท้องถิ่น',
    descriptionEn: 'Generates steady renewable electricity from regional breezes',
    impactTh: '+60 kWh/เดือน พลังงานสะอาด',
    impactEn: '+60 kWh/mo Clean Energy',
    cleanEnergyKwh: 60,
    savingBahtMonth: 270,
    greenScoreBonus: 20
  },
  'smart-lights': {
    id: 'smart-lights',
    nameTh: 'ไฟถนนโซลาร์อัจฉริยะ',
    nameEn: 'Smart Solar Streetlights',
    category: 'efficiency',
    costCredits: 70,
    unlockLevel: 3,
    descriptionTh: 'ใช้หลอด LED โซลาร์เซลล์พร้อมเซนเซอร์ตรวจจับความเคลื่อนไหว',
    descriptionEn: 'Motion-sensing solar LED lights that dim automatically during off-hours',
    impactTh: '-18 kWh/เดือน การใช้ไฟสาธารณะ',
    impactEn: '-18 kWh/mo Public Lighting Load',
    cleanEnergyKwh: 10,
    savingBahtMonth: 90,
    greenScoreBonus: 10
  },
  'ev-hub': {
    id: 'ev-hub',
    nameTh: 'สถานีชาร์จพลังงานสะอาด',
    nameEn: 'Clean Energy EV Hub',
    category: 'mobility',
    costCredits: 180,
    unlockLevel: 3,
    descriptionTh: 'จุดชาร์จยานยนต์ไฟฟ้าที่เชื่อมต่อกับแหล่งพลังงานหมุนเวียน',
    descriptionEn: 'EV charging hub powered directly by regional solar & wind storage',
    impactTh: '+80 kWh/เดือน การเดินทางสีเขียว',
    impactEn: '+80 kWh/mo Green Mobility',
    cleanEnergyKwh: 80,
    savingBahtMonth: 350,
    greenScoreBonus: 25
  }
};

/**
 * Deterministic Plot Definitions (Single source of truth in SVG viewBox 0 0 1200 720)
 * All anchors, hitPoints diamonds, and compatible assets are fixed and mathematical.
 */
export const PLOT_DEFINITIONS: readonly PlotDefinition[] = [
  {
    id: 'plot-1',
    labelTh: 'แปลงตะวันตกเฉียงเหนือ 1 (บ้านพลังงาน)',
    labelEn: 'North-West Plot 1 (Home Zone)',
    anchor: { x: 440, y: 260 },
    hitPoints: '370,260 440,225 510,260 440,295',
    accepts: ['solar-roof', 'eco-home', 'community-garden'],
    unlocked: true,
    unlockLevel: 1,
    district: 1
  },
  {
    id: 'plot-2',
    labelTh: 'แปลงกลางเมือง 2 (ลานสีเขียว)',
    labelEn: 'Central Plaza Plot 2 (Green Oasis)',
    anchor: { x: 340, y: 390 },
    hitPoints: '270,390 340,355 410,390 340,425',
    accepts: ['community-garden', 'solar-roof', 'eco-home'],
    unlocked: true,
    unlockLevel: 1,
    district: 2
  },
  {
    id: 'plot-3',
    labelTh: 'แปลงตะวันออกเฉียงเหนือ 3 (สันเขาพลังงาน)',
    labelEn: 'North-East Plot 3 (Ridge Zone)',
    anchor: { x: 760, y: 260 },
    hitPoints: '690,260 760,225 830,260 760,295',
    accepts: ['solar-roof', 'wind-turbine', 'eco-home'],
    unlocked: true,
    unlockLevel: 1,
    district: 1
  },
  {
    id: 'plot-4',
    labelTh: 'แปลงริมน้ำตะวันออก 4 (กังหันลม)',
    labelEn: 'East Lakeside Plot 4 (Wind Shore)',
    anchor: { x: 860, y: 390 },
    hitPoints: '790,390 860,355 930,390 860,425',
    accepts: ['wind-turbine', 'smart-lights', 'solar-roof', 'community-garden'],
    unlocked: true,
    unlockLevel: 2,
    district: 3
  },
  {
    id: 'plot-5',
    labelTh: 'แปลงทุ่งหญ้าใต้ 5 (ถนนอัจฉริยะ)',
    labelEn: 'South Meadow Plot 5 (Smart Street)',
    anchor: { x: 470, y: 500 },
    hitPoints: '400,500 470,465 540,500 470,535',
    accepts: ['smart-lights', 'community-garden', 'eco-home', 'solar-roof'],
    unlocked: true,
    unlockLevel: 2,
    district: 3
  },
  {
    id: 'plot-6',
    labelTh: 'แปลงเมืองใหม่ใต้ 6 (สถานี EV)',
    labelEn: 'South-East Hub Plot 6 (Clean Mobility)',
    anchor: { x: 730, y: 500 },
    hitPoints: '660,500 730,465 800,500 730,535',
    accepts: ['ev-hub', 'smart-lights', 'wind-turbine', 'eco-home'],
    unlocked: false,
    unlockLevel: 3,
    district: 4
  }
];

export const INITIAL_CITY_PLOTS: CityPlot[] = PLOT_DEFINITIONS.map((def, idx) => ({
  id: def.id,
  labelTh: def.labelTh,
  labelEn: def.labelEn,
  x: def.anchor.x,
  y: def.anchor.y,
  unlocked: def.unlocked,
  unlockLevel: def.unlockLevel,
  assetId: idx === 0 ? 'solar-roof' : idx === 1 ? 'community-garden' : undefined
}));

export const INITIAL_SIMPLIFIED_CITY: SimplifiedCityProgress = {
  introSeen: false,
  level: 1,
  plots: INITIAL_CITY_PLOTS,
  health: 85
};

export const DISTRICT_PROJECTS: DistrictProject[] = [
  {
    id: 'project-1',
    districtNum: 1,
    titleTh: 'โครงการที่ 1: กอบกู้บ้านพลังงานสะอาด (Save the Home)',
    titleEn: 'Project 1: Save the Home District',
    subtitleTh: 'เริ่มต้นติดตั้งหลังคาโซลาร์เซลล์เพื่อลดภาระค่าไฟบ้านแปลงแรก',
    subtitleEn: 'Install a solar rooftop on your home plot to cut initial grid load',
    goalTh: 'สร้าง หลังคาโซลาร์เซลล์ หรือ บ้านประหยัดพลังงาน',
    goalEn: 'Build Solar Rooftop or Energy-efficient Home',
    targetAssetId: 'solar-roof',
    suggestedPlotId: 'plot-1',
    rewardCredits: 40,
    linkedMissionId: 'm-ac-25',
    linkedChallengeId: 'challenge-phantom-vampire',
    completedStoryTh: 'ยอดเยี่ยม! บ้านแปลงแรกเริ่มผลิตไฟฟ้าสะอาดจากแสงอาทิตย์ได้แล้ว',
    completedStoryEn: 'Splendid! Your starter home now generates clean electricity from the sun.'
  },
  {
    id: 'project-2',
    districtNum: 2,
    titleTh: 'โครงการที่ 2: โอเอซิสสีเขียวลดความร้อน (Grow Shared Space)',
    titleEn: 'Project 2: Grow Green Shared Space',
    subtitleTh: 'ปลูกสวนชุมชนและต้นไม้ใหญ่เพื่อสร้างร่มเงา ลดอุณหภูมิเกาะความร้อน',
    subtitleEn: 'Plant a community garden & landmark tree to reduce urban heat islands',
    goalTh: 'สร้าง สวนชุมชนลดความร้อน ในแปลงใจกลางเมือง',
    goalEn: 'Build Community Garden on Central Plaza Plot',
    targetAssetId: 'community-garden',
    suggestedPlotId: 'plot-2',
    rewardCredits: 50,
    linkedMissionId: 'm-coach-chat',
    linkedChallengeId: 'challenge-ac-thermal',
    completedStoryTh: 'สวนชุมชนสร้างร่มเงาให้เมือง ช่วยลดภาระการเปิดแอร์ของบ้านข้างเคียง!',
    completedStoryEn: 'Community canopy provides natural cooling, easing neighborhood AC strain!'
  },
  {
    id: 'project-3',
    districtNum: 3,
    titleTh: 'โครงการที่ 3: เครือข่ายพลังงานหมุนเวียน (Power the District)',
    titleEn: 'Project 3: Power the District Link',
    subtitleTh: 'ติดตั้งกังหันลมไมโครและไฟถนนโซลาร์อัจฉริยะเพื่อระบบไฟฟ้า 24 ชม.',
    subtitleEn: 'Deploy micro wind turbine and smart solar streetlights for 24/7 power',
    goalTh: 'สร้าง กังหันลมไมโคร หรือ ไฟถนนโซลาร์อัจฉริยะ',
    goalEn: 'Build Micro Wind Turbine or Smart Solar Streetlights',
    targetAssetId: 'wind-turbine',
    suggestedPlotId: 'plot-4',
    rewardCredits: 60,
    linkedMissionId: 'm-weekly-budget',
    linkedChallengeId: 'challenge-ac-thermal',
    completedStoryTh: 'กังหันลมไมโครทำงานตลอด 24 ชม. เสริมความมั่นคงให้โครงข่ายไฟฟ้าเมือง!',
    completedStoryEn: 'Micro turbine spins 24/7, providing stable renewable base-load energy!'
  }
];

export function getPlotDefinition(plotId: string): PlotDefinition | undefined {
  return PLOT_DEFINITIONS.find(p => p.id === plotId);
}

export function validatePlacement(
  assetId: CityAssetId,
  plotId: string,
  userCredits: number,
  cityLevel: number,
  occupiedPlotIds: Set<string>
): { valid: true } | { valid: false; reason: 'not-enough-credits' | 'locked-plot' | 'occupied-plot' | 'incompatible-asset' | 'locked-asset' } {
  const plot = getPlotDefinition(plotId);
  if (!plot) return { valid: false, reason: 'locked-plot' };
  if (plot.unlockLevel > cityLevel) return { valid: false, reason: 'locked-plot' };
  if (occupiedPlotIds.has(plotId)) return { valid: false, reason: 'occupied-plot' };
  if (!plot.accepts.includes(assetId)) return { valid: false, reason: 'incompatible-asset' };
  const asset = CITY_ASSET_DEFINITIONS[assetId];
  if (!asset) return { valid: false, reason: 'locked-asset' };
  if (asset.unlockLevel > cityLevel + 1) return { valid: false, reason: 'locked-asset' };
  if (userCredits < asset.costCredits) return { valid: false, reason: 'not-enough-credits' };
  return { valid: true };
}

export function calculateCityImpact(plots: CityPlot[]) {
  let totalCleanEnergyKwh = 0;
  let totalSavingBaht = 0;
  let totalGreenBonus = 0;
  let placedCount = 0;

  plots.forEach(plot => {
    if (plot.assetId && CITY_ASSET_DEFINITIONS[plot.assetId]) {
      const def = CITY_ASSET_DEFINITIONS[plot.assetId];
      totalCleanEnergyKwh += def.cleanEnergyKwh;
      totalSavingBaht += def.savingBahtMonth;
      totalGreenBonus += def.greenScoreBonus;
      placedCount++;
    }
  });

  return {
    totalCleanEnergyKwh,
    totalSavingBaht,
    totalGreenBonus,
    placedCount,
    healthScore: Math.min(100, 70 + totalGreenBonus)
  };
}

export const INITIAL_JOURNEY_MISSIONS: JourneyMission[] = [
  {
    id: 'm-ac-25',
    titleTh: 'ปรับแอร์ 25-26°C พร้อมเปิดพัดลมช่วย',
    titleEn: 'Set AC to 25-26°C with Fan Support',
    category: 'today',
    instructionTh: 'ตั้งค่าอุณหภูมิแอร์ในห้องนั่งเล่นเป็น 25-26°C เพื่อลดการทำงานหนักของคอมเพรสเซอร์',
    instructionEn: 'Configure AC thermostat to 25-26°C in Appliances tab to reduce peak compressor draw.',
    expectedBenefitTh: 'ลดค่าไฟแอร์ได้ทันที 10-15% ต่อเดือน',
    expectedBenefitEn: 'Cuts monthly cooling bill by 10-15% instantly',
    targetCount: 1,
    currentCount: 1,
    creditReward: 35,
    deepLinkPage: 'appliances',
    iconName: 'thermometer',
    status: 'ready_to_claim'
  },
  {
    id: 'm-coach-chat',
    titleTh: 'ปรึกษา AI Coach เรื่องลดไฟรั่วไหล',
    titleEn: 'Consult AI Coach on Standby Power',
    category: 'today',
    instructionTh: 'เปิดห้องแชท AI Coach แล้วถามวิธีตัดไฟสแตนด์บายของปลั๊กพ่วงในบ้าน',
    instructionEn: 'Open AI Coach chat and inquire about eliminating home phantom standby loads.',
    expectedBenefitTh: 'ได้รับแผนประหยัดไฟรายอุปกรณ์ที่ตรงกับบ้านของคุณ',
    expectedBenefitEn: 'Receive customized room-by-room phantom load reduction tactics',
    targetCount: 1,
    currentCount: 0,
    creditReward: 30,
    deepLinkPage: 'ai-coach',
    iconName: 'bot',
    status: 'available'
  },
  {
    id: 'm-compare-appliances',
    titleTh: 'เปรียบเทียบแอร์ Inverter ใน Compare Lab',
    titleEn: 'Compare Inverter ACs in Compare Lab',
    category: 'today',
    instructionTh: 'เข้าเมนู เปรียบเทียบอุปกรณ์ เพื่อดูความต่างของค่าไฟรายปีระหว่างแอร์เบอร์ 5 กับรุ่นทั่วไป',
    instructionEn: 'Open Compare Lab to analyze annual operating costs between Inverter and standard units.',
    expectedBenefitTh: 'เห็นผลต่างค่าไฟชัดเจนก่อนตัดสินใจเลือกซื้อหรือใช้งาน',
    expectedBenefitEn: 'Gain clear operational cost clarity before upgrades',
    targetCount: 1,
    currentCount: 0,
    creditReward: 40,
    deepLinkPage: 'compare',
    iconName: 'scale',
    status: 'available'
  },
  {
    id: 'm-weekly-budget',
    titleTh: 'กำหนดงบประมาณค่าไฟประจำสัปดาห์',
    titleEn: 'Set Weekly Electricity Budget Cap',
    category: 'weekly',
    instructionTh: 'ตั้งเพดานงบประมาณค่าไฟในเมนู ค่าไฟ & งบประมาณ เพื่อให้ระบบแจ้งเตือนก่อนงบบานปลาย',
    instructionEn: 'Define your electricity spending target in Budget & Bills view for smart threshold alerts.',
    expectedBenefitTh: 'ป้องกันค่าไฟพุ่งทะลุเพดานขั้นบันไดหน่วยแพง',
    expectedBenefitEn: 'Prevent bracket jumps into high progressive tariff tiers',
    targetCount: 1,
    currentCount: 1,
    creditReward: 50,
    deepLinkPage: 'budget',
    iconName: 'wallet',
    status: 'ready_to_claim'
  },
  {
    id: 'm-weekly-device-audit',
    titleTh: 'ตรวจเช็กกำลังวัตต์เครื่องใช้ไฟฟ้า 3 ชิ้น',
    titleEn: 'Audit Wattage of 3 Home Appliances',
    category: 'weekly',
    instructionTh: 'อัปเดตชั่วโมงใช้งานจริงของตู้เย็น ทีวี และคอมพิวเตอร์ในหน้า เครื่องใช้ไฟฟ้า',
    instructionEn: 'Review daily run-time and wattage ratings for fridge, TV, and PC in Appliances view.',
    expectedBenefitTh: 'ทำให้กราฟวิเคราะห์แม่นยำขึ้น 98%',
    expectedBenefitEn: 'Enhances energy simulation model accuracy up to 98%',
    targetCount: 3,
    currentCount: 2,
    creditReward: 60,
    deepLinkPage: 'appliances',
    iconName: 'plug',
    status: 'in_progress'
  },
  {
    id: 'm-completed-intro',
    titleTh: 'สำรวจระบบเมืองสีเขียวเบื้องต้น',
    titleEn: 'Complete Green City Onboarding',
    category: 'completed',
    instructionTh: 'เรียนรู้แนวทางการเปลี่ยนพฤติกรรมประหยัดพลังงานจริงให้กลายเป็นการเติบโตของเมือง',
    instructionEn: 'Mastered the core gameplay loop connecting real efficiency habits with sustainable city building.',
    expectedBenefitTh: 'ปลดล็อกสิทธิ์ก่อสร้างหลังคาโซลาร์แปลงแรก',
    expectedBenefitEn: 'Unlocked East Plot 1 solar rooftop placement',
    targetCount: 1,
    currentCount: 1,
    creditReward: 50,
    deepLinkPage: 'city',
    iconName: 'zap',
    status: 'claimed'
  }
];

export const INITIAL_JOURNEY_ACHIEVEMENTS: JourneyAchievement[] = [
  {
    id: 'ach-first-solar',
    titleTh: 'ผู้บุกเบิกพลังงานแสงอาทิตย์',
    titleEn: 'Solar Pioneer',
    descTh: 'ติดตั้งหลังคาโซลาร์เซลล์แปลงแรกสำเร็จ เพิ่มพลังงานสะอาดให้เมือง',
    descEn: 'Constructed first solar rooftop array, powering local green grid',
    group: 'city',
    unlocked: true,
    unlockedAt: '2026-08-16',
    requirementTh: 'สร้างหลังคาโซลาร์เซลล์ 1 แห่งในเมือง',
    requirementEn: 'Build 1 Solar Rooftop in My City',
    creditReward: 40,
    iconType: 'solar'
  },
  {
    id: 'ach-urban-cooling',
    titleTh: 'นักสร้างโอเอซิสสีเขียว',
    titleEn: 'Urban Cooling Champion',
    descTh: 'ปลูกสวนชุมชนและต้นไม้ใหญ่ ลดปรากฏการณ์เกาะความร้อนในเมือง',
    descEn: 'Built community garden & landmark tree to reduce urban heat island',
    group: 'city',
    unlocked: true,
    unlockedAt: '2026-08-17',
    requirementTh: 'สร้างสวนชุมชนลดความร้อน 1 แห่ง',
    requirementEn: 'Build 1 Community Garden in My City',
    creditReward: 35,
    iconType: 'garden'
  },
  {
    id: 'ach-wind-power',
    titleTh: 'สายลมแห่งอนาคต',
    titleEn: 'Breeze of Tomorrow',
    descTh: 'ติดตั้งกังหันลมไมโคร ผลิตกระแสไฟฟ้าจากพลังงานลมตลอด 24 ชม.',
    descEn: 'Installed micro wind turbine for 24/7 renewable generation',
    group: 'city',
    unlocked: false,
    requirementTh: 'สร้างกังหันลมไมโคร 1 แห่ง (ปลดล็อกที่เมือง Lv.2)',
    requirementEn: 'Build 1 Micro Wind Turbine (Unlocks at City Lv.2)',
    creditReward: 60,
    iconType: 'wind'
  },
  {
    id: 'ach-smart-habits',
    titleTh: 'วินัยพิทักษ์ค่าไฟ',
    titleEn: 'Smart Energy Habit Master',
    descTh: 'ทำภารกิจลดพลังงานในชีวิตประจำวันครบ 5 ภารกิจ',
    descEn: 'Completed 5 practical energy-saving actions in real life',
    group: 'habits',
    unlocked: true,
    unlockedAt: '2026-08-17',
    requirementTh: 'ทำภารกิจรายวันสำเร็จ 5 รายการ',
    requirementEn: 'Complete 5 Daily Missions',
    creditReward: 50,
    iconType: 'badge'
  },
  {
    id: 'ach-eco-appliance',
    titleTh: 'ผู้เชี่ยวชาญการจัดสรรโหลด',
    titleEn: 'Appliance Load Optimizer',
    descTh: 'จัดการและวิเคราะห์เครื่องใช้ไฟฟ้ามากกว่า 3 เครื่องในบ้าน',
    descEn: 'Monitored and optimized over 3 electrical devices',
    group: 'habits',
    unlocked: false,
    requirementTh: 'เพิ่มและปรับแต่งเครื่องใช้ไฟฟ้า 3 ชิ้นในระบบ',
    requirementEn: 'Add and optimize 3 appliances in system',
    creditReward: 45,
    iconType: 'eco'
  },
  {
    id: 'ach-clean-grid',
    titleTh: 'เมืองคาร์บอนสุทธิต่ำ',
    titleEn: 'Low-Carbon Metropolis',
    descTh: 'พัฒนาเมืองจนมีสัดส่วนพลังงานสะอาดเกิน 150 kWh/เดือน',
    descEn: 'Elevated clean city energy output past 150 kWh/mo',
    group: 'learning',
    unlocked: false,
    requirementTh: 'ผลิตพลังงานสะอาดในเมืองรวม ≥ 150 kWh/เดือน',
    requirementEn: 'Generate ≥ 150 kWh/mo total clean energy in city',
    creditReward: 80,
    iconType: 'star'
  }
];

export const INITIAL_POWER_CHALLENGES: PowerChallengeData[] = [
  {
    id: 'challenge-phantom-vampire',
    titleTh: 'ด่าน: จัดการมอนสเตอร์ไฟรั่วไหล (Phantom Load)',
    titleEn: 'Challenge: Defeat the Phantom Vampire Load',
    problemScenarioTh: 'เครื่องใช้ไฟฟ้าที่เสียบปลั๊กทิ้งไว้ เช่น หม้อแปลงทีวี หรือที่ชาร์จโทรศัพท์ ยังแอบกินไฟตลอด 24 ชม. แม้ปิดสวิตช์เครื่องแล้ว!',
    problemScenarioEn: 'Devices left plugged into standby wall sockets constantly leak phantom power 24/7 even when switched off!',
    monsterNameTh: 'แวมไพร์กินไฟสแตนด์บาย (Standby Phantom)',
    monsterNameEn: 'Standby Phantom Vampire',
    questionTh: 'วิธีใดช่วยหยุดการสูญเสียพลังงานสแตนด์บายของเครื่องใช้ไฟฟ้าได้มีประสิทธิภาพที่สุด?',
    questionEn: 'Which practical action completely stops vampire standby power draw?',
    options: [
      {
        id: 'opt-1',
        textTh: 'ใช้ปลั๊กพ่วงที่มีสวิตช์แยกตัดไฟ หรือดึงปลั๊กออกเมื่อไม่ใช้งาน',
        textEn: 'Use individual switch extension cords or unplug when idle',
        icon: '🔌',
        isCorrect: true,
        explanationTh: 'ถูกต้อง! การตัดวงจรไฟฟ้าที่เต้ารับช่วยหยุดการสูญเสียพลังงาน Standby ได้ 100% ประหยัดได้ 100-300 บาท/ปีต่อจุด',
        explanationEn: 'Correct! Breaking the circuit at the socket cuts 100% standby draw, saving up to ฿300/yr per socket.'
      },
      {
        id: 'opt-2',
        textTh: 'ปิดแค่ปุ่มรีโมตคอนโทรลแล้วปล่อยทิ้งไว้',
        textEn: 'Turn off with remote control only and leave plugged in',
        icon: '📺',
        isCorrect: false,
        explanationTh: 'การปิดด้วยรีโมต หม้อแปลงภายในยังคงใช้ไฟเลี้ยงเซนเซอร์ตลอดเวลา',
        explanationEn: 'Turning off via remote still draws background sensor power continuously.'
      },
      {
        id: 'opt-3',
        textTh: 'เปิดพัดลมเป่าปลั๊กไฟให้เย็นลง',
        textEn: 'Blow a fan over the power cords to keep them cool',
        icon: '💨',
        isCorrect: false,
        explanationTh: 'การใช้พัดลมไม่ได้ช่วยตัดกระแสไฟฟ้า และยังเพิ่มการกินไฟของพัดลมอีกด้วย',
        explanationEn: 'Fanning power cords adds extra fan power usage without stopping electrical loss.'
      }
    ],
    creditReward: 45,
    unlocksAssetId: 'smart-lights'
  },
  {
    id: 'challenge-ac-thermal',
    titleTh: 'ด่าน: สู้ความร้อน ปรับแอร์ประหยัดไฟ 10-15%',
    titleEn: 'Challenge: Optimize AC Cooling in Tropical Heat',
    problemScenarioTh: 'อากาศภายนอก 38°C ถ้าตั้งแอร์ 18-20°C คอมเพรสเซอร์จะทำงานหนักตลอดเวลาและกินไฟมหาศาล!',
    problemScenarioEn: 'Ambient temperature is 38°C. Setting AC down to 18-20°C forces the compressor to run continuously at peak wattage!',
    monsterNameTh: 'มอนสเตอร์ไอความร้อน (Thermal Overload Monster)',
    monsterNameEn: 'Thermal Overload Monster',
    questionTh: 'การปรับแอร์แบบใดช่วยให้ห้องเย็นสบายและประหยัดค่าไฟได้ดีที่สุด?',
    questionEn: 'What is the optimal AC setting combination for maximum comfort and savings?',
    options: [
      {
        id: 'opt-a',
        textTh: 'ตั้งแอร์ 25-26°C ร่วมกับเปิดพัดลมตั้งพื้นช่วยกระจายลมเย็น',
        textEn: 'Set AC to 25-26°C combined with an oscillating fan for air circulation',
        icon: '❄️',
        isCorrect: true,
        explanationTh: 'ถูกต้อง! ลมจากพัดลมช่วยลดอุณหภูมิความรู้สึกได้ 1-2°C โดยใช้ไฟพัดลมเพียง 30-50W แต่ลดโหลดแอร์ได้หลายร้อยวัตต์',
        explanationEn: 'Correct! Fan wind chill lowers perceived warmth by 1-2°C using only 40W while saving hundreds of watts on AC load.'
      },
      {
        id: 'opt-b',
        textTh: 'ตั้ง 16°C เบอร์แรงสุดแล้วห่มผ้าหนาๆ',
        textEn: 'Set 16°C maximum cool and wrap in heavy blankets',
        icon: '🥶',
        isCorrect: false,
        explanationTh: 'การตั้ง 16°C เพิ่มค่าไฟแอร์ขึ้นกว่า 50-70% และคอมเพรสเซอร์อาจตัดการทำงานไม่ทัน',
        explanationEn: 'Setting 16°C spikes cooling costs by 50-70% with heavy compressor strain.'
      },
      {
        id: 'opt-c',
        textTh: 'เปิด-ปิดแอร์ทุกๆ 30 นาที',
        textEn: 'Turn AC on and off every 30 minutes repeatedly',
        icon: '⏱️',
        isCorrect: false,
        explanationTh: 'การสตาร์ทคอมเพรสเซอร์บ่อยๆ จะเกิดกระแสไฟกระชาก (Inrush Current) กินไฟมากกว่าเดิม',
        explanationEn: 'Frequent compressor restarts draw high inrush currents, wasting more energy.'
      }
    ],
    creditReward: 50,
    unlocksAssetId: 'eco-home'
  }
];
