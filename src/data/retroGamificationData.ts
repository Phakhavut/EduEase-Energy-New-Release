export interface VisualMnemonic {
  id: string;
  category: 'cooling' | 'vampire' | 'kitchen' | 'lighting' | 'heating' | 'tariff' | 'engineering';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  titleTh: string;
  titleEn: string;
  mnemonicKeyTh: string;
  mnemonicKeyEn: string;
  ruleTh: string;
  ruleEn: string;
  scienceExplanationTh: string;
  scienceExplanationEn: string;
  mathFormulaTh: string;
  mathFormulaEn: string;
  savingsBahtMonth: number;
  iconName: string;
  badgeColor: string;
  matchedId?: string;
}

export interface ApplianceSimulatorItem {
  id: string;
  nameTh: string;
  nameEn: string;
  category: 'heavy' | 'medium' | 'standby' | 'lighting';
  normalWatts: number;
  ecoWatts: number;
  defaultHoursDaily: number;
  icon: string;
  isOn: boolean;
  isEco: boolean;
  ecoTipTh: string;
  ecoTipEn: string;
  memoryHookTh: string;
  memoryHookEn: string;
}

export interface StampItem {
  id: string;
  titleTh: string;
  titleEn: string;
  habitCategory: 'cooling' | 'vampire' | 'timing' | 'maintenance' | 'lighting' | 'kitchen';
  xpReward: number;
  coinReward: number;
  isCompleted: boolean;
  mnemonicHintTh: string;
  mnemonicHintEn: string;
  icon: string;
}

export interface RetroQuizQuestion {
  id: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  difficultyLabelTh: string;
  difficultyLabelEn: string;
  questionTh: string;
  questionEn: string;
  optionsTh: string[];
  optionsEn: string[];
  correctIndex: number;
  mnemonicClueTh: string;
  mnemonicClueEn: string;
  explanationTh: string;
  explanationEn: string;
  scienceDetailTh: string;
  scienceDetailEn: string;
  rewardCoins: number;
  rewardXp: number;
}

export interface VintageBadge {
  id: string;
  nameTh: string;
  nameEn: string;
  descriptionTh: string;
  descriptionEn: string;
  ribbonColor: string;
  icon: string;
  category: 'memory' | 'meter' | 'habits' | 'quiz';
  requiredCount: number;
  unlocked: boolean;
}

export const VISUAL_MNEMONICS: VisualMnemonic[] = [
  // BEGINNER LEVEL MNEMONICS
  {
    id: 'aircon_26_fan',
    category: 'cooling',
    difficulty: 'beginner',
    titleTh: 'กฎแอร์ 26°C + พัดลมช่วยกระจาย',
    titleEn: '26°C AC + Circulating Fan Rule',
    mnemonicKeyTh: '🌀 26°C + ลมพัด = เย็นเท่า 24°C ประหยัดไฟ 10%',
    mnemonicKeyEn: '🌀 26°C + Breeze = Feels like 24°C, Saves 10%',
    ruleTh: 'ปรับแอร์เพิ่ม 1 องศา (เช่น 25 -> 26) ประหยัดค่าไฟ 10% คอมเพรสเซอร์ทำงานเบาลง',
    ruleEn: 'Raising AC by 1°C reduces compressor load and cuts cooling power by 10%.',
    scienceExplanationTh: 'ลมจากพัดลมช่วยเพิ่มอัตราการระเหยของเหงื่อบนผิวหนัง ทำให้ร่างกายรู้สึกเย็นลง 1-2°C โดยพัดลมกินไฟเพียง 45W เทียบกับแอร์ที่กินไฟ 1,200W',
    scienceExplanationEn: 'Air movement from a 45W fan increases evaporative cooling on the skin, lowering perceived temperature by 1-2°C while the 1,200W AC compressor idles more frequently.',
    mathFormulaTh: 'ประหยัด: 1,200W × 8 ชม. × 10% = 0.96 หน่วย/วัน (ลด ~120 ฿/เดือน)',
    mathFormulaEn: 'Savings: 1,200W × 8h × 10% = 0.96 kWh/day (~฿120/mo)',
    savingsBahtMonth: 120,
    iconName: 'Fan',
    badgeColor: 'from-sky-500 to-blue-600'
  },
  {
    id: 'vampire_standby',
    category: 'vampire',
    difficulty: 'beginner',
    titleTh: 'แวมไพร์พลังงาน (ไฟสแตนด์บาย)',
    titleEn: 'Energy Vampire Standby Plug',
    mnemonicKeyTh: '🧛 ปิดสวิตช์ ไม่ถอดปลั๊ก = แวมไพร์ดูดไฟ 24 ชม.',
    mnemonicKeyEn: '🧛 Turned off but plugged = Sucking 24/7 Standby Load',
    ruleTh: 'เครื่องใช้ไฟฟ้าที่มีรีโมท, จอ LED, หรือหม้อแปลง กินไฟเงียบๆ 2-15W ต่อเครื่องตลอดเวลา',
    ruleEn: 'Devices with remotes, standby clocks, or power bricks draw 2-15W phantom power continuously.',
    scienceExplanationTh: 'วงจรแปลงไฟ (Switching Power Supply) และตัวรับสัญญาณรีโมทยังคงต่อกับระบบไฟบ้าน 220V ตลอดเวลา การใช้รางปลั๊กไฟมีสวิตช์ตัดไฟจะหยุดการไหลของกระแสไฟ 100%',
    scienceExplanationEn: 'Internal switching power adapters keep internal logic energized. Power strips with rocker switches physically disconnect the circuit.',
    mathFormulaTh: 'รวม 5 อุปกรณ์: 20W × 24 ชม. × 30 วัน = 14.4 หน่วย/เดือน (~60 ฿/เดือน ฟรีๆ)',
    mathFormulaEn: '5 Devices: 20W × 24h × 30d = 14.4 kWh/mo (~฿60/mo wasted)',
    savingsBahtMonth: 60,
    iconName: 'PlugZap',
    badgeColor: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'fridge_70_percent',
    category: 'kitchen',
    difficulty: 'beginner',
    titleTh: 'กฎตู้เย็นความจุ 70% หมุนเวียน',
    titleEn: 'Fridge 70% Capacity Flow Rule',
    mnemonicKeyTh: '🧊 แช่ไม่เกิน 70% ลมเย็นวนรอบ อาหารสดไว ไม่เปลืองไฟ',
    mnemonicKeyEn: '🧊 Fill max 70% to let cold air cycle efficiently',
    ruleTh: 'ไม่แช่ของแน่นเกินไป เว้นช่องว่างให้ลมเย็นไหลเวียน และไม่นำของร้อนเข้าตู้เย็นทันที',
    ruleEn: 'Keep internal space below 70% capacity so cold convective currents circulate freely.',
    scienceExplanationTh: 'การแช่ของแน่นเกินไปจะบังช่องจ่ายลมเย็น (Air Duct) ทำให้เซนเซอร์สั่งคอมเพรสเซอร์ทำงานหนักขึ้น 15-20% และทำให้ความเย็นไม่ทั่วถึง',
    scienceExplanationEn: 'Blocked air ducts restrict thermodynamic convection, forcing the compressor to run up to 20% longer to maintain target thermostat temperature.',
    mathFormulaTh: 'ประหยัด: ตู้เย็น 150W ลดเวลาทำงาน 1.5 ชม./วัน = ~30 ฿/เดือน',
    mathFormulaEn: 'Savings: 150W fridge running 1.5h less daily = ~฿30/mo',
    savingsBahtMonth: 30,
    iconName: 'Refrigerator',
    badgeColor: 'from-teal-500 to-emerald-600'
  },
  {
    id: 'led_lumens',
    category: 'lighting',
    difficulty: 'beginner',
    titleTh: 'กฎหลอด LED ลูเมนสูง วัตต์ต่ำ',
    titleEn: 'LED High Lumens / Low Wattage Rule',
    mnemonicKeyTh: '💡 LED 9W สว่างเท่าหลอดไส้ 60W ประหยัดไฟ 85%',
    mnemonicKeyEn: '💡 9W LED matches 60W Incandescent, 85% Less Power',
    ruleTh: 'เปลี่ยนหลอดไส้หรือหลอดฟลูออเรสเซนต์เก่าเป็น LED ที่กินไฟน้อยกว่าและไม่ปล่อยความร้อน',
    ruleEn: 'Replace legacy incandescent & CFL bulbs with solid-state LEDs that generate negligible heat.',
    scienceExplanationTh: 'หลอดไส้เปลี่ยนพลังงาน 90% เป็นความร้อน และ 10% เป็นแสงสว่าง แต่หลอด LED แปลงพลังงานส่วนใหญ่เป็นแสง จึงประหยัดไฟกว่ามากและไม่ทำให้ห้องร้อนขึ้น',
    scienceExplanationEn: 'Incandescents lose 90% of energy as thermal radiation. LEDs convert energy directly into photons with 85%+ efficiency.',
    mathFormulaTh: '5 หลอด: (60W - 9W) × 5 หลอด × 6 ชม./วัน = 45.9 หน่วย/เดือน (ลด ~190 ฿/เดือน)',
    mathFormulaEn: '5 Bulbs: 51W saved × 5 × 6h/day = 45.9 kWh/mo (~฿190/mo saved)',
    savingsBahtMonth: 190,
    iconName: 'Lightbulb',
    badgeColor: 'from-amber-500 to-yellow-600'
  },

  // INTERMEDIATE LEVEL MNEMONICS
  {
    id: 'water_heater_38',
    category: 'heating',
    difficulty: 'intermediate',
    titleTh: 'อุณหภูมิน้ำอุ่นเพื่อสุขภาพ 38°C',
    titleEn: 'Healthy 38°C Water Heater Setting',
    mnemonicKeyTh: '🚿 38°C อุ่นกำลังดี ผิวไม่แห้ง ปลอดภัย ไม่เปลือง 3,500W',
    mnemonicKeyEn: '🚿 38°C is soothing, skin-safe, and avoids 3,500W surge',
    ruleTh: 'ตั้งอุณหภูมิเครื่องทำน้ำอุ่นพอเหมาะ (37-38°C) และปิดเครื่องทันทีเมื่อถูสบู่',
    ruleEn: 'Set shower heater to 37-38°C and shut off the stream while lathering.',
    scienceExplanationTh: 'เครื่องทำน้ำอุ่นเป็นอุปกรณ์กินไฟมหาศาล (3,500 - 4,500W) การเพิ่มความร้อนทุก 1°C ต้องใช้พลังงานความร้อนสูงตามสูตร Q = mcΔT',
    scienceExplanationEn: 'Instant water heaters are 3,500-4,500W resistive loads. Every extra degree celsius requires exponential thermal energy Q = mcΔT.',
    mathFormulaTh: 'ลดเวลาอาบ 5 นาที: 3,500W × (5/60) ชม. = 0.29 หน่วย/ครั้ง (ลด ~40 ฿/คน/เดือน)',
    mathFormulaEn: '5 mins less: 3.5kW × 0.083h = 0.29 kWh/shower (~฿40/person/mo)',
    savingsBahtMonth: 80,
    iconName: 'ShowerHead',
    badgeColor: 'from-rose-500 to-red-600'
  },
  {
    id: 'tou_off_peak',
    category: 'tariff',
    difficulty: 'intermediate',
    titleTh: 'กฎทองมิเตอร์ TOU ช่วง Off-Peak',
    titleEn: 'TOU Tariff Night Owl Savings Rule',
    mnemonicKeyTh: '🌙 22:00 - 09:00 น. ค่าไฟถูกลง 50% เหมาะซักผ้า ชาร์จไฟ',
    mnemonicKeyEn: '🌙 10 PM - 9 AM: Rates drop 50% for high loads',
    ruleTh: 'ย้ายการใช้เครื่องใช้ไฟฟ้ากำลังสูง (เครื่องซักผ้า, รถ EV, ปั๊มน้ำ) ไปช่วง Off-Peak',
    ruleEn: 'Shift high-demand loads (washing machine, dryer, EV charging) to Off-Peak hours.',
    scienceExplanationTh: 'โรงไฟฟ้ามีกำลังผลิตสำรองสูงในเวลากลางคืน การไฟฟ้าจึงคิดอัตราค่าพลังงานถูกลงเหลือ ~2.6 บาท/หน่วย เทียบกับ On-Peak ที่ ~5.8 บาท/หน่วย',
    scienceExplanationEn: 'Power grids have surplus reserve capacity at night. Utilities provide discounted rates (~2.6 ฿/kWh vs ~5.8 ฿/kWh On-Peak).',
    mathFormulaTh: 'ซักผ้า 2 ครั้ง/สัปดาห์: ย้ายไป Off-Peak ประหยัดส่วนต่างค่าไฟได้ถึง ~120 ฿/เดือน',
    mathFormulaEn: '2 washes/week: Shifting saves ~฿120/mo in peak rate differentials',
    savingsBahtMonth: 120,
    iconName: 'Clock',
    badgeColor: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'label_5_stars',
    category: 'engineering',
    difficulty: 'intermediate',
    titleTh: 'ฉลากเบอร์ 5 ติดดาว (1-5 ดาว)',
    titleEn: 'No.5 Energy Star Ratings (1-5 Stars)',
    mnemonicKeyTh: '⭐ ยิ่งดาวเยอะ ยิ่งประหยัดไฟขึ้น 5-10% ต่อดวงดาว',
    mnemonicKeyEn: '⭐ Each additional star yields 5-10% higher efficiency',
    ruleTh: 'เลือกเครื่องใช้ไฟฟ้าเบอร์ 5 ระดับ 3-5 ดาวเพื่อลดค่าไฟฟ้าสะสมตลอดอายุการใช้งาน 5-10 ปี',
    ruleEn: 'Opt for 3 to 5 star certified appliances to minimize cumulative lifecycle operating costs.',
    scienceExplanationTh: 'ฉลากเบอร์ 5 รุ่นใหม่ทดสอบค่าประสิทธิภาพตามฤดูกาล (SEER / COP) โดยระดับ 5 ดาวใช้พลังงานลดลงกว่ารุ่นไม่มีดาวถึง 30%',
    scienceExplanationEn: 'New Star ratings test seasonal efficiency (SEER/COP). 5-star units reduce power consumption by up to 30% versus non-starred units.',
    mathFormulaTh: 'แอร์ 5 ดาว vs 1 ดาว: ประหยัดค่าไฟเพิ่มได้ ~1,500 - 2,200 ฿/ปี',
    mathFormulaEn: '5-star vs 1-star AC: Saves extra ~฿1,500 - 2,200/year',
    savingsBahtMonth: 150,
    iconName: 'Award',
    badgeColor: 'from-amber-400 to-emerald-600'
  },
  {
    id: 'kwh_meter_formula',
    category: 'tariff',
    difficulty: 'intermediate',
    titleTh: 'สูตรคิดหน่วยไฟ kWh พื้นฐาน',
    titleEn: 'Base kWh Energy Calculation Formula',
    mnemonicKeyTh: '⚡ หน่วย (kWh) = (กำลังวัตต์ W × ชั่วโมงใช้งาน) ÷ 1,000',
    mnemonicKeyEn: '⚡ kWh Units = (Watts × Hours of use) ÷ 1,000',
    ruleTh: 'คำนวณการใช้ไฟก่อนซื้อหรือเปิดเครื่องใช้ไฟฟ้าเพื่อคุมงบประมาณรายวัน',
    ruleEn: 'Compute unit consumption in advance to plan and stay within daily power budget.',
    scienceExplanationTh: '1 หน่วย (1 kWh) คือการใช้งานกำลังไฟฟ้า 1,000 วัตต์นาน 1 ชั่วโมง ค่าไฟคิดตามจำนวนหน่วยรวมในแต่ละเดือนตามอัตราก้าวหน้า',
    scienceExplanationEn: '1 Unit (1 kWh) equals 1,000 Watts drawn steadily over 1 hour, billed progressively by utility tariffs.',
    mathFormulaTh: 'พัดลม 50W เปิด 10 ชม. = (50 × 10) / 1000 = 0.5 หน่วย (~2.1 ฿)',
    mathFormulaEn: '50W Fan running 10h = (50 × 10) / 1000 = 0.5 kWh (~฿2.1)',
    savingsBahtMonth: 90,
    iconName: 'Calculator',
    badgeColor: 'from-blue-500 to-indigo-600'
  },

  // ADVANCED LEVEL MNEMONICS
  {
    id: 'power_factor_cos',
    category: 'engineering',
    difficulty: 'advanced',
    titleTh: 'ค่าเพาเวอร์แฟกเตอร์ (Power Factor: cos φ)',
    titleEn: 'Power Factor & Reactive Load (cos φ)',
    mnemonicKeyTh: '📐 PF ใกล้ 1.00 = ไฟจริงเต็มเม็ดเต็มหน่วย ไม่สูญเสียพลังงานแฝง',
    mnemonicKeyEn: '📐 PF near 1.00 = Maximum Real Work (kW), Zero Reactive Waste',
    ruleTh: 'มอเตอร์และหม้อแปลงสร้างกระแสไฟเหนี่ยวนำ (kVAR) ทำให้ต้องใช้ค่า PF สูงกว่า 0.85 เพื่อไม่ให้ถูกปรับ',
    ruleEn: 'Inductive motors draw reactive kVAR. Power factor > 0.85 avoids utility reactive surcharges.',
    scienceExplanationTh: 'Apparent Power (S, kVA) = √(P² + Q²). เมื่อ PF ต่ำ กระแสในสายจะสูงขึ้น ทำให้เกิดความร้อนและการสูญเสีย I²R ในสายเคเบิล',
    scienceExplanationEn: 'Apparent Power (S, kVA) = √(P² + Q²). Low PF elevates conductor current and causes costly I²R heat losses.',
    mathFormulaTh: 'P (Real Power) = V × I × cos φ. ปรับปรุง PF จาก 0.70 เป็น 0.95 ลดกระแสได้ 26%',
    mathFormulaEn: 'P = V × I × cos φ. Correcting PF from 0.70 to 0.95 reduces current by 26%',
    savingsBahtMonth: 350,
    iconName: 'Gauge',
    badgeColor: 'from-violet-600 to-fuchsia-600'
  },
  {
    id: 'meter_disc_rpm',
    category: 'engineering',
    difficulty: 'advanced',
    titleTh: 'สูตรคำนวณรอบจานหมุนมิเตอร์ (1,200 rev/kWh)',
    titleEn: 'Analog Meter Constant Formula (1,200 rev/kWh)',
    mnemonicKeyTh: '⚙️ วัตต์จริง P = (3,600 × จำนวนรอบ N) ÷ (ค่าคงที่ K × เวลา t วินาที)',
    mnemonicKeyEn: '⚙️ Instant Watts P = (3,600 × Revs N) ÷ (Constant K × Time t seconds)',
    ruleTh: 'จับเวลาจานหมุนมิเตอร์หน้าบ้านเพื่อเช็คว่าเครื่องใช้ไฟฟ้ากินไฟจริงกี่วัตต์ หรือมีไฟรั่วหรือไม่',
    ruleEn: 'Time the spinning aluminum disc to verify real-time load draw and pinpoint phantom leaks.',
    scienceExplanationTh: 'มิเตอร์เหนี่ยวนำมีค่าคงที่ K (เช่น 1,200 รอบ/kWh). การหมุน 1 รอบใน 3 วินาที แสดงถึงโหลด P = (3600 × 1) / (1.2 × 3) = 1,000 วัตต์',
    scienceExplanationEn: 'Eddy current induction meter has constant K. 1 revolution in 3s equates to instant load P = (3600 × 1)/(1.2 × 3) = 1,000 Watts.',
    mathFormulaTh: 'P (Watts) = (3,600,000 × N) / (K × t)',
    mathFormulaEn: 'P (Watts) = (3,600,000 × N) / (K × t)',
    savingsBahtMonth: 250,
    iconName: 'RotateCcw',
    badgeColor: 'from-cyan-500 to-blue-700'
  }
];

export const INITIAL_APPLIANCES_SIMULATOR: ApplianceSimulatorItem[] = [
  {
    id: 'aircon_main',
    nameTh: 'เครื่องปรับอากาศ Inverter 12,000 BTU',
    nameEn: '12,000 BTU Inverter Air Conditioner',
    category: 'heavy',
    normalWatts: 1200,
    ecoWatts: 850,
    defaultHoursDaily: 8,
    icon: 'AirVent',
    isOn: true,
    isEco: false,
    ecoTipTh: 'เปิด 26°C ควบพัดลมตั้งพื้น ลดการกินไฟลงเหลือ 850W ทันที',
    ecoTipEn: 'Setting 26°C + stand fan lowers power to 850W immediately',
    memoryHookTh: 'แอร์กินไฟสูงสุดในบ้าน! เพิ่ม 1°C = ประหยัด 10%',
    memoryHookEn: 'Highest power in house! 1°C up = 10% bill down'
  },
  {
    id: 'refrigerator_kitchen',
    nameTh: 'ตู้เย็น 2 ประตู 12 คิว',
    nameEn: '12 cu.ft. 2-Door Refrigerator',
    category: 'medium',
    normalWatts: 160,
    ecoWatts: 110,
    defaultHoursDaily: 24,
    icon: 'Refrigerator',
    isOn: true,
    isEco: false,
    ecoTipTh: 'เว้นระยะห่างผนัง 15 ซม. และแช่ของไม่เกิน 70% คอมเพรสเซอร์ทำงานน้อยลง',
    ecoTipEn: 'Keep 15cm wall gap & fill below 70% to lighten compressor duty',
    memoryHookTh: 'ตู้เย็นเสียบตลอด 24 ชม. ดูแลยางขอบประตูอย่าให้รั่ว',
    memoryHookEn: 'Runs 24/7! Ensure rubber door seal has zero leaks'
  },
  {
    id: 'water_heater_bath',
    nameTh: 'เครื่องทำน้ำอุ่น 3,500W',
    nameEn: '3,500W Water Heater',
    category: 'heavy',
    normalWatts: 3500,
    ecoWatts: 2400,
    defaultHoursDaily: 0.5,
    icon: 'ShowerHead',
    isOn: false,
    isEco: false,
    ecoTipTh: 'ปรับความร้อนระดับปานกลาง (38°C) และปิดน้ำระหว่างฟอกสบู่',
    ecoTipEn: 'Set moderate 38°C temp and pause water while soaping',
    memoryHookTh: 'กินไฟแรงสุดในบ้าน! 3,500W เทียบเท่าหลอดไฟ 70 หลอด',
    memoryHookEn: 'Heaviest instant load! 3,500W equals seventy LED bulbs'
  },
  {
    id: 'tv_home_theater',
    nameTh: 'Smart TV 55 นิ้ว + ลำโพง Soundbar',
    nameEn: '55" Smart TV + Soundbar Standby',
    category: 'medium',
    normalWatts: 140,
    ecoWatts: 60,
    defaultHoursDaily: 4,
    icon: 'Tv',
    isOn: true,
    isEco: false,
    ecoTipTh: 'เปิดฟังก์ชัน Eco Sensor ปรับแสงหน้าจอตามสภาพแวดล้อม',
    ecoTipEn: 'Enable ambient Eco Sensor backlight dimming',
    memoryHookTh: 'ปิดสวิตช์รางปลั๊กเมื่อเข้านอน กำจัดแวมไพร์ 8W',
    memoryHookEn: 'Switch off strip switch at night to eliminate 8W standby'
  },
  {
    id: 'living_lighting',
    nameTh: 'ระบบไฟห้องนั่งเล่น (หลอด LED 4 จุด)',
    nameEn: 'Living Room 4x LED Fixtures',
    category: 'lighting',
    normalWatts: 36,
    ecoWatts: 18,
    defaultHoursDaily: 6,
    icon: 'Lightbulb',
    isOn: true,
    isEco: true,
    ecoTipTh: 'เปิดเฉพาะจุดที่ใช้งานจริง และใช้แสงธรรมชาติในเวลากลางวัน',
    ecoTipEn: 'Turn on task lighting only & utilize daylighting',
    memoryHookTh: 'หลอด LED เย็นกว่า ทนกว่า กินไฟน้อยกว่าหลอดไส้ 85%',
    memoryHookEn: 'LEDs run cooler and use 85% less power than legacy bulbs'
  },
  {
    id: 'desktop_computer',
    nameTh: 'คอมพิวเตอร์ Desktop + หน้าจอ 27 นิ้ว',
    nameEn: 'Desktop PC + 27" Monitor',
    category: 'medium',
    normalWatts: 220,
    ecoWatts: 90,
    defaultHoursDaily: 6,
    icon: 'Laptop',
    isOn: false,
    isEco: false,
    ecoTipTh: 'ตั้งโหมด Sleep หลัง 10 นาทีที่ไม่ได้ใช้งาน',
    ecoTipEn: 'Set auto-sleep timer to 10 minutes idle',
    memoryHookTh: 'โหมด Sleep ลดการใช้ไฟจากการทำงาน 220W เหลือเพียง 2W',
    memoryHookEn: 'Sleep mode drops 220W active draw down to 2W'
  }
];

export const RETRO_HABIT_STAMPS: StampItem[] = [
  {
    id: 'stamp_ac_26',
    titleTh: 'ปรับแอร์ 26°C ควบพัดลม',
    titleEn: 'Set AC to 26°C + Fan',
    habitCategory: 'cooling',
    xpReward: 50,
    coinReward: 25,
    isCompleted: false,
    mnemonicHintTh: 'จำง่าย: ลมพัดพาเหงื่อระเหย เย็นสบายเท่า 24°C',
    mnemonicHintEn: 'Remember: Breeze evaporative cooling matches 24°C',
    icon: 'Fan'
  },
  {
    id: 'stamp_unplug_charger',
    titleTh: 'ถอดปลั๊กชาร์จมือถือ/โน้ตบุ๊ก',
    titleEn: 'Unplug Idle Chargers',
    habitCategory: 'vampire',
    xpReward: 35,
    coinReward: 15,
    isCompleted: false,
    mnemonicHintTh: 'จำง่าย: ปลั๊กเสียบทิ้งไว้ อุ่นๆ คือไฟรั่วไหลเงียบๆ',
    mnemonicHintEn: 'Remember: Warm charger blocks indicate wasted phantom power',
    icon: 'PlugZap'
  },
  {
    id: 'stamp_check_fridge_seal',
    titleTh: 'ตรวจกระดาษหนีบขอบยางตู้เย็น',
    titleEn: 'Test Refrigerator Gasket Seal',
    habitCategory: 'maintenance',
    xpReward: 40,
    coinReward: 20,
    isCompleted: false,
    mnemonicHintTh: 'จำง่าย: หนีบธนบัตรแล้วดึง ถ้าหลุดง่ายแปลว่ายางเสื่อม',
    mnemonicHintEn: 'Remember: Paper dollar test; if it slips easily, seal needs care',
    icon: 'Refrigerator'
  },
  {
    id: 'stamp_clean_ac_filter',
    titleTh: 'ล้างแผ่นกรองฝุ่นแอร์ทุก 2 สัปดาห์',
    titleEn: 'Rinse AC Mesh Filter',
    habitCategory: 'maintenance',
    xpReward: 60,
    coinReward: 30,
    isCompleted: false,
    mnemonicHintTh: 'จำง่าย: แผ่นกรองตัน แอร์ดูดลมยาก กินไฟเพิ่ม 5-10%',
    mnemonicHintEn: 'Remember: Clogged filters choke airflow and hike load by 5-10%',
    icon: 'Sparkles'
  },
  {
    id: 'stamp_switch_strip',
    titleTh: 'ปิดสวิตช์รางปลั๊กหลักก่อนนอน',
    titleEn: 'Switch Off Main Strip at Bedtime',
    habitCategory: 'vampire',
    xpReward: 40,
    coinReward: 20,
    isCompleted: false,
    mnemonicHintTh: 'จำง่าย: สวิตช์เดียวดับทุกแวมไพร์ในห้องนั่งเล่น',
    mnemonicHintEn: 'Remember: One rocker click kills all living room vampires',
    icon: 'Power'
  },
  {
    id: 'stamp_daylight_reading',
    titleTh: 'ใช้แสงธรรมชาติริมหน้าต่าง',
    titleEn: 'Utilize Window Daylighting',
    habitCategory: 'lighting',
    xpReward: 30,
    coinReward: 15,
    isCompleted: false,
    mnemonicHintTh: 'จำง่าย: เปิดม่านรับแดดช่วงเช้า พักหลอดไฟ 4 ชม.',
    mnemonicHintEn: 'Remember: Morning daylight gives 4h rest to electric bulbs',
    icon: 'Sun'
  },
  {
    id: 'stamp_microwave_defrost',
    titleTh: 'ละลายอาหารแช่แข็งในตู้เย็นล่วงหน้า',
    titleEn: 'Thaw Frozen Foods in Fridge',
    habitCategory: 'kitchen',
    xpReward: 45,
    coinReward: 20,
    isCompleted: false,
    mnemonicHintTh: 'จำง่าย: อาหารแช่แข็งช่วยตู้เย็นเย็นขึ้น ไม่ต้องใช้ไมโครเวฟ 800W',
    mnemonicHintEn: 'Remember: Thawing food cools the fridge and saves 800W microwave',
    icon: 'Utensils'
  },
  {
    id: 'stamp_shower_speed',
    titleTh: 'อาบน้ำอุ่นไม่เกิน 8 นาที',
    titleEn: 'Speed Shower Under 8 Minutes',
    habitCategory: 'timing',
    xpReward: 50,
    coinReward: 25,
    isCompleted: false,
    mnemonicHintTh: 'จำง่าย: เครื่องทำน้ำอุ่น 3,500W ลด 2 นาที = ประหยัด 40 บาท',
    mnemonicHintEn: 'Remember: 3.5kW heater; 2 minutes less cuts ฿40/month',
    icon: 'Timer'
  }
];

export const RETRO_QUIZ_QUESTIONS: RetroQuizQuestion[] = [
  // ==================== BEGINNER QUESTIONS ====================
  {
    id: 'q1_ac_math',
    difficulty: 'beginner',
    difficultyLabelTh: 'ระดับเริ่มต้น (Beginner)',
    difficultyLabelEn: 'Beginner Level',
    questionTh: 'หากปรับอุณหภูมิแอร์จาก 24°C เป็น 26°C แล้วเปิดพัดลมตั้งพื้นช่วย จะส่งผลอย่างไรต่อค่าไฟและความเย็น?',
    questionEn: 'If you raise AC from 24°C to 26°C and turn on a circulating fan, what happens to bill and comfort?',
    optionsTh: [
      'ร้อนขึ้นมาก และค่าไฟเพิ่มขึ้นเพราะเปิด 2 อุปกรณ์',
      'เย็นสบายเท่าเดิม และประหยัดค่าไฟแอร์ลงได้ประมาณ 10-15%',
      'ไม่มีผลเปลี่ยนแปลงใดๆ ต่อค่าไฟ',
      'แอร์ทำงานหนักขึ้นเพราะพัดลมไปกวนเซนเซอร์'
    ],
    optionsEn: [
      'Much warmer and higher bill because two devices run',
      'Identical comfort while cutting AC cooling bill by ~10-15%',
      'No difference in power consumption',
      'AC compressor strains due to fan interference'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'จำกฎ: 26°C + พัดลม (45W) = ร่างกายรู้สึกเย็น 24°C แต่เซฟไฟแอร์ 120W+',
    mnemonicClueEn: 'Mnemonic: 26°C + Fan (45W) creates 24°C windchill, saving 120W+ compressor load',
    explanationTh: 'ถูกต้อง! การปรับแอร์เพิ่ม 1°C ช่วยลดภาระคอมเพรสเซอร์ได้ ~10% ขณะที่พัดลมใช้ไฟเพียง 45W ช่วยให้ลมกระทบผิวสร้างความรู้สึกเย็นลงทันที',
    explanationEn: 'Correct! Raising thermostat 1°C cuts compressor duty ~10%, while a 45W fan creates airflow that cools human skin by 1-2°C.',
    scienceDetailTh: 'สูตรเทอร์โมไดนามิกส์: ΔT ระหว่างอุณหภูมิห้องกับภายนอกลดลง การถ่ายเทความร้อนเข้าห้องลดลง คอมเพรสเซอร์จึงตัดเร็วกว่า',
    scienceDetailEn: 'Thermodynamics: Lower ΔT between room and ambient air slows inward heat gain, allowing faster compressor cut-offs.',
    rewardCoins: 30,
    rewardXp: 50
  },
  {
    id: 'q2_vampire_load',
    difficulty: 'beginner',
    difficultyLabelTh: 'ระดับเริ่มต้น (Beginner)',
    difficultyLabelEn: 'Beginner Level',
    questionTh: 'อุปกรณ์ใดต่อไปนี้มักเป็น "แวมไพร์พลังงาน (Standby Load)" ที่กินไฟแม้จะปิดเครื่องด้วยรีโมทแล้ว?',
    questionEn: 'Which device is a typical "Energy Vampire" drawing power even after being turned off via remote?',
    optionsTh: [
      'หลอดไฟ LED ที่ปิดสวิตช์ผนัง',
      'กล่องรับสัญญาณทีวี / กล่องเน็ต และ Smart TV ที่เสียบปลั๊กไว้',
      'เตารีดที่ถอดปลั๊กแล้ว',
      'พัดลมตั้งโต๊ะแบบหมุนปุ่มกลไก'
    ],
    optionsEn: [
      'LED bulb with wall rocker switched off',
      'Set-top box, Wi-Fi router & plugged Smart TV in standby',
      'Iron with plug physically pulled',
      'Mechanical dial desk fan'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'จำกฎ: อุปกรณ์ใดที่มีไฟ LED ดวงเล็กๆ ติดอยู่ หรือรอรับสัญญาณรีโมท = ดูดไฟเงียบๆ ตลอด 24 ชม.',
    mnemonicClueEn: 'Mnemonic: Any device with an active LED dot or standby remote receiver is sipping power 24/7.',
    explanationTh: 'ถูกต้อง! กล่องทีวีและเครื่องใช้ไฟฟ้าที่มีโหมด Standby กินไฟ 5-15W ตลอด 24 ชั่วโมง การต่อผ่านปลั๊กพ่วงที่มีสวิตช์ปิด-เปิดช่วยหยุดการกินไฟได้ทันที',
    explanationEn: 'Correct! Set-top boxes and standby electronics consume 5-15W constantly. A switched power strip eliminates this waste completely.',
    scienceDetailTh: 'สแตนด์บาย 15W × 24 ชม. × 365 วัน = 131 หน่วย/ปี หรือคิดเป็นเงินกว่า 550 บาท/ปี โดยไม่ได้ใช้งาน',
    scienceDetailEn: '15W standby × 24h × 365d = 131 kWh/year (~฿550/year in phantom electric waste).',
    rewardCoins: 30,
    rewardXp: 50
  },
  {
    id: 'q_beg_refrigerator',
    difficulty: 'beginner',
    difficultyLabelTh: 'ระดับเริ่มต้น (Beginner)',
    difficultyLabelEn: 'Beginner Level',
    questionTh: 'วิธีใดช่วยให้ตู้เย็นประหยัดพลังงานมากที่สุด และยืดอายุคอมเพรสเซอร์?',
    questionEn: 'Which practice best maximizes refrigerator energy efficiency and extends compressor lifespan?',
    optionsTh: [
      'แช่ของให้แน่นเต็ม 100% ทุกชั้นเพื่อกักเก็บความเย็น',
      'นำแกงร้อนๆ ใส่ตู้เย็นทันทีเพื่อไม่ให้บูด',
      'แช่ของไม่เกิน 70%, เว้นระยะห่างผนัง 15 ซม., และปล่อยอาหารอุ่นลงก่อนแช่',
      'ปรับอุณหภูมิไปที่ความเย็นสูงสุด (Max Cool) ตลอดทั้งปี'
    ],
    optionsEn: [
      'Pack food tightly to max 100% capacity to trap coldness',
      'Place boiling hot soup directly into the fridge',
      'Keep under 70% capacity, ensure 15cm rear gap, and cool hot food first',
      'Run temperature control at Maximum Cold setting year-round'
    ],
    correctIndex: 2,
    mnemonicClueTh: 'จำกฎ: ตู้เย็นต้องการ "ทางเดินลม convection" และ "การระบายความร้อนด้านหลัง"',
    mnemonicClueEn: 'Mnemonic: Refrigerators need internal airway circulation and rear thermal ventilation.',
    explanationTh: 'ถูกต้อง! การเว้นระยะระบายความร้อนและไม่แช่อาหารร้อนช่วยให้แผงระบายความร้อนด้านหลังทำงานได้มีประสิทธิภาพ คอมเพรสเซอร์ไม่ต้องตัด-ต่อนานเกินจำเป็น',
    explanationEn: 'Correct! Ensuring convection spacing and pre-cooling food relieves the heat exchanger, shortening compressor run cycles.',
    scienceDetailTh: 'การนำของร้อน 80°C ใส่ตู้เย็นทันที จะทำให้ของรอบข้างอุณหภูมิสูงขึ้นและทำให้ไอน้ำเกาะเป็นน้ำแข็งหนาที่คอยล์เย็น',
    scienceDetailEn: 'Placing hot food inside elevates internal compartment temperature and forms frost on the evaporator coil.',
    rewardCoins: 30,
    rewardXp: 50
  },
  {
    id: 'q_beg_led',
    difficulty: 'beginner',
    difficultyLabelTh: 'ระดับเริ่มต้น (Beginner)',
    difficultyLabelEn: 'Beginner Level',
    questionTh: 'เพราะเหตุใดหลอดไฟ LED จึงประหยัดพลังงานมากกว่าหลอดไส้แบบเดิมถึง 85%?',
    questionEn: 'Why do LED light bulbs save up to 85% more energy than legacy incandescent bulbs?',
    optionsTh: [
      'หลอด LED ใช้ไฟกระแสตรงที่ไม่มีแรงดัน',
      'หลอด LED แปลงพลังงานไฟฟ้าส่วนใหญ่เป็นแสงสว่างโดยตรง และสูญเสียความร้อนน้อยมาก',
      'หลอด LED ให้ความสว่างน้อยกว่าหลอดไส้ 10 เท่า',
      'หลอด LED ไม่ต้องต่อเข้ากับสายไฟบ้าน'
    ],
    optionsEn: [
      'LEDs run on direct current without voltage',
      'LEDs convert most electrical energy directly into visible photons with minimal heat loss',
      'LEDs output 10x dimmer light than incandescents',
      'LEDs do not connect to household mains'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'จำกฎ: หลอดไส้สูญเสียความร้อน 90% แต่หลอด LED 9W สว่างเท่าหลอดไส้ 60W',
    mnemonicClueEn: 'Mnemonic: Incandescents waste 90% as heat, while 9W LED matches 60W incandescent lumens.',
    explanationTh: 'ถูกต้อง! หลอดไส้สูญเสียพลังงาน 90% ไปกับรังสีความร้อน (Infrared) ในขณะที่หลอด LED เป็นสารกึ่งตัวนำเปล่งแสงที่ให้ลูเมนสูงแต่กินไฟต่ำมาก',
    explanationEn: 'Correct! Incandescent filaments radiate 90% thermal waste. Semiconductor LEDs convert electrons to photons at high luminous efficacy.',
    scienceDetailTh: 'หลอด LED 9W ให้แสงสว่าง ~800 ลูเมน เทียบเท่าหลอดไส้ 60W ลดภาระการทำความเย็นของแอร์ในห้องลงด้วย',
    scienceDetailEn: 'A 9W LED produces ~800 lumens matching a 60W incandescent, while reducing parasitic heat gain in air-conditioned rooms.',
    rewardCoins: 30,
    rewardXp: 50
  },

  // ==================== INTERMEDIATE QUESTIONS ====================
  {
    id: 'q3_formula_kwh',
    difficulty: 'intermediate',
    difficultyLabelTh: 'ระดับปานกลาง (Intermediate)',
    difficultyLabelEn: 'Intermediate Level',
    questionTh: 'สูตรคำนวณหน่วยไฟฟ้า (kWh หรือ Unit) ที่ใช้คิดค่าไฟตามบิลคือข้อใด?',
    questionEn: 'What is the standard formula to calculate electricity billing units (kWh)?',
    optionsTh: [
      'กำลังวัตต์ (W) × แรงดันโวลต์ (V)',
      '(กำลังวัตต์ (W) × จำนวนชั่วโมงใช้งาน) ÷ 1,000',
      'กระแสแอมแปร์ (A) ÷ จำนวนชั่วโมง',
      'จำนวนวัน × ค่า Ft'
    ],
    optionsEn: [
      'Watts (W) × Volts (V)',
      '(Watts (W) × Hours of use) ÷ 1,000',
      'Amperes (A) ÷ Operating hours',
      'Days × Ft Tariff'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'จำสูตร: "วัตต์ คูณ ชั่วโมง หาร หนึ่งพัน" = จำนวนหน่วย (Unit)',
    mnemonicClueEn: 'Mnemonic: "Watts × Hours ÷ 1000" = kWh Billing Units',
    explanationTh: 'ถูกต้อง! 1 หน่วย (1 kWh) เท่ากับ การใช้พลังงานไฟฟ้า 1,000 วัตต์ ต่อเนื่องเป็นเวลา 1 ชั่วโมง เช่น ไดร์เป่าผม 1,000W ใช้นาน 1 ชม. = 1 หน่วย (~4.2 บาท)',
    explanationEn: 'Correct! 1 Unit (1 kWh) equals 1,000 Watts operated continuously for 1 hour.',
    scienceDetailTh: 'สูตรฟิสิกส์: Energy (kWh) = Power (kW) × Time (h). เมื่อได้หน่วยแล้วนำไปคูณอัตราก้าวหน้า + ค่า Ft + VAT 7%',
    scienceDetailEn: 'Physics standard: Energy (kWh) = Power (kW) × Time (h). Total units are multiplied by stepped tariff rates + Ft + VAT.',
    rewardCoins: 50,
    rewardXp: 100
  },
  {
    id: 'q_int_tou_tariff',
    difficulty: 'intermediate',
    difficultyLabelTh: 'ระดับปานกลาง (Intermediate)',
    difficultyLabelEn: 'Intermediate Level',
    questionTh: 'สำหรับผู้ใช้ไฟฟ้ามิเตอร์ TOU (Time of Use) ช่วงเวลาใดถือเป็นช่วง Off-Peak (ค่าไฟราคาถูกที่สุด)?',
    questionEn: 'For TOU (Time of Use) tariff meters, which time window is designated as Off-Peak (lowest rate)?',
    optionsTh: [
      'วันจันทร์ - ศุกร์ เวลา 09:00 - 22:00 น.',
      'วันจันทร์ - ศุกร์ เวลา 22:00 - 09:00 น. รวมถึงวันเสาร์-อาทิตย์ และวันหยุดราชการตลอด 24 ชั่วโมง',
      'เฉพาะช่วงเที่ยงวัน 12:00 - 13:00 น.',
      'ทุกวันเวลา 18:00 - 21:00 น.'
    ],
    optionsEn: [
      'Monday - Friday, 09:00 - 22:00',
      'Monday - Friday, 22:00 - 09:00, plus all 24 hours on weekends and public holidays',
      'Only noon lunch break 12:00 - 13:00',
      'Every day from 18:00 - 21:00'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'จำช่วง: "ดึกๆ และวันหยุด = Off-Peak ค่าไฟถูกลงเกือบครึ่ง"',
    mnemonicClueEn: 'Mnemonic: "Late nights & weekends = Off-Peak discounted rates"',
    explanationTh: 'ถูกต้อง! ช่วง Off-Peak คือ 22:00 - 09:00 ของวันธรรมดา และตลอด 24 ชม. ของวันหยุด ค่าไฟจะถูกลงเหลือ ~2.6 บาท/หน่วย เทียบกับ On-Peak ที่ ~5.8 บาท/หน่วย',
    explanationEn: 'Correct! Off-Peak spans 22:00 to 09:00 weekdays and 24 hours on weekends/holidays with rates dropping to ~฿2.6/kWh versus ~฿5.8/kWh On-Peak.',
    scienceDetailTh: 'การบริหารโหลดไฟฟ้า (Demand Side Management) โดยย้ายการชาร์จรถ EV หรือซักผ้าอบผ้าไปช่วง Off-Peak ช่วยลดภาระโรงไฟฟ้าและลดบิลลงได้ถึง 40-50%',
    scienceDetailEn: 'Shifting heavy loads (EV charging, laundry) to Off-Peak flattens grid peak demand and saves 40-50% on utility costs.',
    rewardCoins: 50,
    rewardXp: 100
  },
  {
    id: 'q_int_label5_stars',
    difficulty: 'intermediate',
    difficultyLabelTh: 'ระดับปานกลาง (Intermediate)',
    difficultyLabelEn: 'Intermediate Level',
    questionTh: 'ฉลากประหยัดไฟฟ้าเบอร์ 5 รูปแบบใหม่ที่มีสัญลักษณ์ดาว (1-5 ดาว) มีเกณฑ์ในการวัดอย่างไร?',
    questionEn: 'How are new Energy Label No.5 Star ratings (1 to 5 stars) evaluated?',
    optionsTh: [
      'วัดจากขนาดความจุของเครื่องใช้ไฟฟ้า',
      'วัดจากประสิทธิภาพการใช้พลังงานตามฤดูกาล (SEER / ค่า COP) ยิ่งดาวมากยิ่งประหยัดพลังงานสูงขึ้น',
      'วัดจากจำนวนปีการรับประกันของตัวเครื่อง',
      'วัดจากระดับเสียงการทำงานของมอเตอร์'
    ],
    optionsEn: [
      'Measured strictly by physical storage capacity',
      'Measured by seasonal energy efficiency metrics (SEER / COP); more stars indicate higher efficiency',
      'Measured by the warranty duration in years',
      'Measured by the motor decibel sound level'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'จำเกณฑ์: ดาวเพิ่ม 1 ดวง = ประหยัดไฟเพิ่มขึ้น 5-10%',
    mnemonicClueEn: 'Mnemonic: Each additional star yields 5-10% higher seasonal efficiency.',
    explanationTh: 'ถูกต้อง! สัญลักษณ์ดาวแสดงถึงประสิทธิภาพที่สูงกว่าเกณฑ์เบอร์ 5 ปกติ โดยแอร์ระดับ 3-5 ดาวใช้เทคโนโลยี Inverter ชั้นสูงที่ประหยัดไฟขึ้นกว่าเดิม 20-30%',
    explanationEn: 'Correct! Stars denote energy performance exceeding baseline standards, with 3-5 star inverter systems cutting cooling energy by 20-30%.',
    scienceDetailTh: 'SEER (Seasonal Energy Efficiency Ratio) วัดอัตราส่วนความเย็นรวมตลอดฤดูกาลต่อพลังงานไฟฟ้าที่ใช้ทั้งหมด (Btu/Wh)',
    scienceDetailEn: 'SEER evaluates total seasonal cooling output (Btu) divided by total electrical energy input (Wh).',
    rewardCoins: 50,
    rewardXp: 100
  },
  {
    id: 'q_int_ft_bill',
    difficulty: 'intermediate',
    difficultyLabelTh: 'ระดับปานกลาง (Intermediate)',
    difficultyLabelEn: 'Intermediate Level',
    questionTh: 'ค่า Ft (Fuel Adjustment Charge) ในบิลค่าไฟหมายถึงอะไร และคำนวณอย่างไร?',
    questionEn: 'What does the Ft (Fuel Adjustment Charge) component on electric bills represent and how is it calculated?',
    optionsTh: [
      'ค่าธรรมเนียมบำรุงรักษาสายส่งไฟฟ้าคงที่ทุกเดือน',
      'ค่าไฟฟ้าผันแปรที่ปรับตามต้นทุนราคาเชื้อเพลิงและอัตราแลกเปลี่ยนจริง คูณด้วยจำนวนหน่วยไฟฟ้าที่ใช้ (หน่วย × Ft)',
      'ภาษีมูลค่าเพิ่มที่ส่งให้กรมสรรพากร',
      'ค่าบริการมิเตอร์รายเดือน'
    ],
    optionsEn: [
      'A fixed monthly transmission line maintenance fee',
      'A floating fuel adjustment charge reflecting actual generation fuel costs and exchange rates multiplied by units consumed (kWh × Ft)',
      'Value-added tax remitted to the revenue department',
      'Monthly meter service rental fee'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'จำส่วนประกอบ: "ค่าไฟรวม = ค่าไฟฐาน + (หน่วย × Ft) + ค่าบริการ + VAT 7%"',
    mnemonicClueEn: 'Mnemonic: "Total Bill = Base Tariff + (Units × Ft) + Service Fee + 7% VAT"',
    explanationTh: 'ถูกต้อง! ค่า Ft คือค่าไฟฟ้าตามสูตรการปรับอัตราค่าไฟฟ้าโดยอัตโนมัติ ซึ่งปรับทุก 4 เดือนตามราคาแก๊สธรรมชาติ ถ่านหิน และต้นทุนซื้อไฟฟ้าจริง',
    explanationEn: 'Correct! Ft is the floating fuel tariff adjusted every 4 months based on natural gas, coal, and bulk power purchase market costs.',
    scienceDetailTh: 'สูตรบิลค่าไฟ: [ค่าไฟฐาน + (kWh × Ft/100) + ค่าบริการรายเดือน] × 1.07 = ยอดสุทธิรวม VAT 7%',
    scienceDetailEn: 'Standard Billing: [Base tariff + (kWh × Ft rate) + Monthly service fee] × 1.07 = Net amount with 7% VAT.',
    rewardCoins: 50,
    rewardXp: 100
  },

  // ==================== ADVANCED QUESTIONS (ENGINEERING & AUDIT) ====================
  {
    id: 'q_adv_power_factor',
    difficulty: 'advanced',
    difficultyLabelTh: 'ระดับเชี่ยวชาญ (Advanced / Engineer)',
    difficultyLabelEn: 'Advanced / Engineering Level',
    questionTh: 'ในระบบไฟฟ้ากระแสสลับ ค่า Power Factor (cos φ) มีความสำคัญอย่างไรต่อการสูญเสียในระบบและค่าไฟฟ้า?',
    questionEn: 'In AC electrical systems, what is the engineering significance of Power Factor (cos φ) regarding system losses and billing?',
    optionsTh: [
      'ไม่มีผลต่อกระแสไฟฟ้าในสายส่ง',
      'เมื่อ PF ต่ำ (เช่น < 0.85) จะทำให้กระแสปรากฏ (kVA) ในสายสูงขึ้น เกิดความร้อน I²R Loss ในสายเคเบิล และอาจถูกการไฟฟ้าเรียกเก็บค่า kVAR ปรับ',
      'PF ยิ่งต่ำ มอเตอร์จะยิ่งหมุนเร็วขึ้นและประหยัดไฟขึ้น',
      'PF เป็นเพียงค่าตัวเลขสำหรับวัดระดับแรงดันโวลต์'
    ],
    optionsEn: [
      'No effect on conductor current or losses',
      'When PF is low (< 0.85), Apparent Current (kVA) surges, generating I²R thermal losses and triggering utility reactive power penalty surcharges',
      'Lower PF makes motors spin faster and save electricity',
      'PF is strictly a measuring unit for RMS voltage'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'จำสามเหลี่ยมกำลัง: Apparent Power S (kVA) = √(P² + Q²), Real Power P = V × I × cos φ',
    mnemonicClueEn: 'Mnemonic: Power Triangle S (kVA) = √(P² + Q²), Real Work P = V × I × cos φ',
    explanationTh: 'ถูกต้อง! โหลดเหนี่ยวนำ (Inductive Load) เช่น มอเตอร์ แอร์ หม้อแปลง ดึงกระแสรีแอกทีฟ (kVAR) ทำให้กระแสรวมในสายสูงขึ้น การติดตั้ง Capacitor Bank ช่วยปรับปรุง PF ให้ใกล้ 1.00 ลดโหลดในสายส่ง',
    explanationEn: 'Correct! Inductive loads draw lagging reactive power (kVAR). Installing capacitor banks corrects PF toward 1.00, reducing line current and I²R losses.',
    scienceDetailTh: 'การปรับปรุง Power Factor จาก 0.70 เป็น 0.95 ช่วยลดกระแสในสายส่งลงได้ถึง ~26.3% ทำให้หม้อแปลงและสายเคเบิลรับภาระได้มากขึ้นโดยไม่ต้องขยายขนาด',
    scienceDetailEn: 'Improving Power Factor from 0.70 to 0.95 reduces conductor current by ~26.3%, freeing up transformer and feeder capacity.',
    rewardCoins: 80,
    rewardXp: 200
  },
  {
    id: 'q_adv_meter_constant',
    difficulty: 'advanced',
    difficultyLabelTh: 'ระดับเชี่ยวชาญ (Advanced / Engineer)',
    difficultyLabelEn: 'Advanced / Engineering Level',
    questionTh: 'หากมิเตอร์จานหมุนเหนี่ยวนำมีค่าคงที่ K = 1,200 rev/kWh และจับเวลาการหมุนจานได้ 5 รอบ ในเวลา 15 วินาที กำลังไฟฟ้าที่กำลังใช้งานอยู่ (Active Power, P) มีค่าเท่าใด?',
    questionEn: 'If an analog induction meter has constant K = 1,200 rev/kWh, and rotates 5 revolutions in 15 seconds, what is the instant active power demand (P)?',
    optionsTh: [
      '500 วัตต์ (0.5 kW)',
      '1,000 วัตต์ (1.0 kW)',
      '1,500 วัตต์ (1.5 kW)',
      '2,000 วัตต์ (2.0 kW)'
    ],
    optionsEn: [
      '500 Watts (0.5 kW)',
      '1,000 Watts (1.0 kW)',
      '1,500 Watts (1.5 kW)',
      '2,000 Watts (2.0 kW)'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'สูตรวิศวกรรม: P (kW) = (3,600 × N) ÷ (K × t) = (3,600 × 5) ÷ (1,200 × 15) = 18,000 ÷ 18,000 = 1.0 kW = 1,000W',
    mnemonicClueEn: 'Formula: P (kW) = (3600 × N) ÷ (K × t) = (3600 × 5) ÷ (1200 × 15) = 1.0 kW = 1,000W',
    explanationTh: 'ถูกต้อง! สูตรคำนวณกำลังไฟฟ้าจากจานหมุนมิเตอร์ P (kW) = (3,600 × N) / (K × t) โดย N = 5 รอบ, t = 15 วินาที, K = 1,200 rev/kWh ได้ผลลัพธ์คือ 1.0 kW หรือ 1,000 วัตต์',
    explanationEn: 'Correct! Using P (kW) = (3600 × N) / (K × t) with N = 5 revs, t = 15s, K = 1200 rev/kWh gives exactly 1.0 kW (1,000 Watts).',
    scienceDetailTh: 'การตรวจวัดความเร็วรอบจานหมุนเป็นวิธีมาตรฐานในการตรวจสอบหาโหลดไฟรั่ว (Phantom Load) และสอบเทียบความแม่นยำของมิเตอร์ไฟฟ้าภาคสนาม',
    scienceDetailEn: 'Disc timing is the benchmark field technique for detecting parasitic leakage loads and auditing induction meter calibration accuracy.',
    rewardCoins: 80,
    rewardXp: 200
  },
  {
    id: 'q_adv_inrush_current',
    difficulty: 'advanced',
    difficultyLabelTh: 'ระดับเชี่ยวชาญ (Advanced / Engineer)',
    difficultyLabelEn: 'Advanced / Engineering Level',
    questionTh: 'ปรากฏการณ์กระแสกระชากขณะสตาร์ทมอเตอร์ (Inrush Current / Starting Surge) ของคอมเพรสเซอร์แอร์แบบ Non-Inverter มักมีค่าสูงกว่ากระแสพิกัดปกติ (FLA) ประมาณกี่เท่า?',
    questionEn: 'Inrush Starting Current for conventional fixed-speed (Non-Inverter) AC motor compressors typically exceeds Full Load Amps (FLA) by what multiplier?',
    optionsTh: [
      'ประมาณ 1.1 - 1.2 เท่า',
      'ประมาณ 5 - 7 เท่าของกระแสพิกัดปกติ',
      'ประมาณ 20 - 30 เท่า',
      'ไม่มีกระแสกระชากในระบบไฟฟ้ากระแสสลับ'
    ],
    optionsEn: [
      'Approximately 1.1 - 1.2x',
      'Approximately 5 to 7 times Full Load Amperes (FLA / LRA)',
      'Approximately 20 to 30 times',
      'Zero inrush current exists in AC systems'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'จำลักษณะโหลด: มอเตอร์ขณะหยุดนิ่งมีค่าขดลวดความต้านทานต่ำมาก จึงดึง Locked Rotor Amps (LRA) พุ่งสูง 5-7 เท่า',
    mnemonicClueEn: 'Mnemonic: Zero rotor back-EMF at start draws Locked Rotor Amps (LRA) 5-7x higher than steady state.',
    explanationTh: 'ถูกต้อง! มอเตอร์แบบเดิมขณะสตาร์ทจะเกิดกระแส Locked Rotor Current สูง 5-7 เท่า ทำให้เกิดแรงดันตกชั่วขณะ (Voltage Dip) และกินไฟกระชาก ในขณะที่แอร์ Inverter มีระบบ Soft-Start ค่อยๆ ไต่ระดับกระแส',
    explanationEn: 'Correct! Fixed-speed induction compressors draw 5-7x LRA during line startup causing voltage sags. Inverter VFD drives implement smooth soft-start ramping.',
    scienceDetailTh: 'ระบบ Inverter ใช้ตัวแปลงสัญญาณ Variable Frequency Drive (VFD) ควบคุมความถี่ (Hz) และแรงดัน (V) ทำให้ตัดปัญหากระแสกระชากขณะสตาร์ทได้อย่างสมบูรณ์',
    scienceDetailEn: 'Inverter Variable Frequency Drives modulate AC frequency and voltage, virtually eliminating starting surge spikes and mechanical stress.',
    rewardCoins: 80,
    rewardXp: 200
  },
  {
    id: 'q_adv_u_value',
    difficulty: 'advanced',
    difficultyLabelTh: 'ระดับเชี่ยวชาญ (Advanced / Engineer)',
    difficultyLabelEn: 'Advanced / Engineering Level',
    questionTh: 'ในการประเมินประสิทธิภาพพลังงานของอาคาร ค่า Overall Thermal Transfer Value (OTTV) และค่า U-Value ของผนัง/กระจกมีผลต่อโหลดแอร์อย่างไร?',
    questionEn: 'In building energy auditing, how do the Overall Thermal Transfer Value (OTTV) and wall/glass U-Values affect air conditioning cooling loads?',
    optionsTh: [
      'ค่า U-Value ยิ่งสูง อาคารจะยิ่งกันความร้อนได้ดีขึ้น',
      'ค่า U-Value และ OTTV ยิ่งต่ำ อัตราการถ่ายเทความร้อนจากภายนอกเข้าสู่อาคารยิ่งน้อยลง ทำให้แอร์ทำงานเบาลงและประหยัดไฟ',
      'ค่า OTTV ใช้สำหรับวัดระบบประปาและท่อระบายน้ำเท่านั้น',
      'กระจกใสธรรมดามีค่า SHGC ต่ำกว่ากระจก Low-E'
    ],
    optionsEn: [
      'Higher U-Value indicates superior thermal insulation',
      'Lower U-Value & OTTV reduce solar heat gain and conduction into the envelope, significantly lowering AC compressor tonnage requirements',
      'OTTV applies strictly to plumbing and drainage hydraulics',
      'Clear monolithic glass exhibits lower SHGC than Low-E coated glass'
    ],
    correctIndex: 1,
    mnemonicClueTh: 'จำฟิสิกส์อาคาร: Q = U × A × ΔT. U-Value ต่ำ = ฉนวนดีเยี่ยม ความร้อนไม่ทะลุผ่าน',
    mnemonicClueEn: 'Mnemonic: Conduction Q = U × A × ΔT. Lower U-Value = superior thermal envelope resistance.',
    explanationTh: 'ถูกต้อง! ค่า U-Value (Thermal Transmittance) แสดงอัตราการถ่ายเทความร้อน ยิ่งต่ำแปลว่ามีคุณสมบัติเป็นฉนวนความร้อนที่ดีเยี่ยม เช่น ผนังอิฐมวลเบา หรือกระจก Double Glazing พร้อมฟิล์มกรองแสง Low-E',
    explanationEn: 'Correct! U-Value measures thermal transmittance (W/m²·K). Lower values mean superior insulation, reducing envelope heat gain Q = U × A × ΔT.',
    scienceDetailTh: 'การลดค่า OTTV ของอาคารลง 10 W/m² สามารถลดขนาด BTU ของเครื่องปรับอากาศลงได้ 15-25% และลดค่าไฟตลอด 20 ปีได้อย่างมหาศาล',
    scienceDetailEn: 'Lowering building OTTV by 10 W/m² shrinks required chiller/AC capacity by 15-25%, yielding compound lifetime lifecycle energy savings.',
    rewardCoins: 80,
    rewardXp: 200
  }
];

export const VINTAGE_BADGES: VintageBadge[] = [
  {
    id: 'badge_memory_master',
    nameTh: 'เหรียญเกียรติยศภาพจำประหยัดพลังงาน',
    nameEn: 'Energy Mnemonic Master Medal',
    descriptionTh: 'จับคู่การ์ดภาพจำพลังงานสำเร็จครบทุกหมวดหมู่',
    descriptionEn: 'Successfully matched all visual energy mnemonic cards',
    ribbonColor: 'from-amber-400 to-yellow-600',
    icon: 'Sparkles',
    category: 'memory',
    requiredCount: 6,
    unlocked: true
  },
  {
    id: 'badge_meter_diagnostician',
    nameTh: 'เข็มกลัดนักวินิจฉัยมิเตอร์ไฟฟ้าระดับโปร',
    nameEn: 'Certified Meter Diagnostician Ribbon',
    descriptionTh: 'จำลองการลดความเร็วรอบจานหมุนมิเตอร์ลงได้มากกว่า 50%',
    descriptionEn: 'Diagnosed and slowed analog meter spinning speed by 50%+',
    ribbonColor: 'from-blue-500 to-indigo-600',
    icon: 'Gauge',
    category: 'meter',
    requiredCount: 1,
    unlocked: true
  },
  {
    id: 'badge_vampire_slayer',
    nameTh: 'โล่ปราบแวมไพร์พลังงานในบ้าน',
    nameEn: 'Household Vampire Slayer Shield',
    descriptionTh: 'สะสมแสตมป์ปิดสวิตช์และถอดปลั๊กสแตนด์บายครบ 5 ครั้ง',
    descriptionEn: 'Collected 5 habit stamps for eliminating phantom standby loads',
    ribbonColor: 'from-purple-500 to-rose-600',
    icon: 'ShieldCheck',
    category: 'habits',
    requiredCount: 5,
    unlocked: false
  },
  {
    id: 'badge_quiz_scholar',
    nameTh: 'ตราประทับนักปราชญ์พลังงาน 100 คะแนนเต็ม',
    nameEn: 'Energy Science Scholar Certificate',
    descriptionTh: 'ตอบคำถามควิซความรู้ไฟฟ้าถูกต้องครบทุกข้อ',
    descriptionEn: 'Scored 100% on the energy literacy masterclass trivia',
    ribbonColor: 'from-emerald-500 to-teal-600',
    icon: 'Award',
    category: 'quiz',
    requiredCount: 4,
    unlocked: false
  }
];
