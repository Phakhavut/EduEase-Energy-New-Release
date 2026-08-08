import { 
  KnowledgeBranchProgress, 
  HabitBranchProgress, 
  TreeMemoryMilestone, 
  EcosystemCreature, 
  EcosystemObject,
  WorldExpansionRegion 
} from '../types';

export const INITIAL_KNOWLEDGE_BRANCHES: KnowledgeBranchProgress[] = [
  {
    id: 'kb_basics',
    branchKey: 'basics',
    branchNameTh: 'กิ่งก้านพื้นฐานไฟฟ้า (Basics)',
    branchNameEn: 'Electricity Basics Branch',
    completedLessons: 4,
    totalLessons: 5,
    icon: 'Zap',
    healthPercent: 80,
    unlockedEffectTh: 'ใบไม้เขียวชอุ่ม + นกกระจอกมาร้องเพลงบนกิ่ง'
  },
  {
    id: 'kb_bills',
    branchKey: 'bills',
    branchNameTh: 'กิ่งก้านรอบรู้ใบแจ้งหนี้ (Bills & TOU)',
    branchNameEn: 'Bill & Tariff Branch',
    completedLessons: 3,
    totalLessons: 4,
    icon: 'Receipt',
    healthPercent: 75,
    unlockedEffectTh: 'เกิดดอกไม้สีทองแห่งความประหยัดรอบโคนต้น'
  },
  {
    id: 'kb_appliances',
    branchKey: 'appliances',
    branchNameTh: 'กิ่งก้านเครื่องใช้ไฟฟ้าทรงพลัง (Appliances)',
    branchNameEn: 'Appliance Mastery Branch',
    completedLessons: 5,
    totalLessons: 6,
    icon: 'Tv',
    healthPercent: 85,
    unlockedEffectTh: 'ผลไม้ออมไฟสุกงอม + กระรอกน้อยมาเก็บผลไม้'
  },
  {
    id: 'kb_safety',
    branchKey: 'safety',
    branchNameTh: 'กิ่งก้านความปลอดภัย & สายดิน (Safety)',
    branchNameEn: 'Electrical Safety Branch',
    completedLessons: 2,
    totalLessons: 3,
    icon: 'ShieldCheck',
    healthPercent: 66,
    unlockedEffectTh: 'เกราะออร่าเรืองแสงคุ้มครองโคนต้นไม้'
  },
  {
    id: 'kb_solar',
    branchKey: 'solar',
    branchNameTh: 'กิ่งก้านพลังงานโซลาร์เซลล์ (Solar PV)',
    branchNameEn: 'Solar Energy Branch',
    completedLessons: 3,
    totalLessons: 4,
    icon: 'Sun',
    healthPercent: 75,
    unlockedEffectTh: 'แผงโซลาร์เซลล์ขนาดจิ๋วมินิเปล่งประกายแดด'
  },
  {
    id: 'kb_habits',
    branchKey: 'habits',
    branchNameTh: 'กิ่งก้านวินัยการตัดไฟแฝง (Eco Habits)',
    branchNameEn: 'Eco Habits Branch',
    completedLessons: 6,
    totalLessons: 6,
    icon: 'Power',
    healthPercent: 100,
    unlockedEffectTh: 'ผีเสื้อเรืองแสง 5 ตัวบินวนรอบกิ่งไม้'
  },
  {
    id: 'kb_smarthome',
    branchKey: 'smarthome',
    branchNameTh: 'กิ่งก้านบ้านอัจฉริยะ IoT (Smart Home)',
    branchNameEn: 'Smart Home & ESP32 Branch',
    completedLessons: 2,
    totalLessons: 4,
    icon: 'Cpu',
    healthPercent: 50,
    unlockedEffectTh: 'เสาส่งสัญญาณ IoT จิ๋ว + ไฟ LED แสดงสถานะ'
  },
  {
    id: 'kb_ai',
    branchKey: 'ai',
    branchNameTh: 'กิ่งก้านโค้ชอัจฉริยะ Voltie AI',
    branchNameEn: 'Voltie AI Coach Branch',
    completedLessons: 4,
    totalLessons: 4,
    icon: 'Bot',
    healthPercent: 100,
    unlockedEffectTh: 'หิ่งห้อยปัญญาประดิษฐ์และคริสตัลพลังงาน'
  }
];

export const INITIAL_HABIT_BRANCHES: HabitBranchProgress[] = [
  {
    id: 'hb_budget',
    habitNameTh: 'คุมงบไม่เกินเป้าหมายรายเดือน',
    habitNameEn: 'Stayed Under Monthly Budget',
    streakDays: 12,
    status: 'active',
    impactTh: 'บำรุงลำต้นให้หนาแน่นแข็งแรง +20%',
    icon: 'Wallet'
  },
  {
    id: 'hb_ac_saving',
    habitNameTh: 'ปรับอุณหภูมิแอร์ 26°C + เปิดพัดลม',
    habitNameEn: 'Optimal AC Setting (26°C + Fan)',
    streakDays: 8,
    status: 'active',
    impactTh: 'สร้างไอเย็นละอองน้ำให้แม่น้ำและลำธาร',
    icon: 'Thermometer'
  },
  {
    id: 'hb_standby_cut',
    habitNameTh: 'ถอดปลั๊กอุปกรณ์ที่ไม่ใช้งาน',
    habitNameEn: 'Standby Power Elimination',
    streakDays: 15,
    status: 'legendary',
    impactTh: 'กำจัดไฟรั่วไหล + ดอกไม้อเมทิสต์บานสะพรั่ง',
    icon: 'Power'
  },
  {
    id: 'hb_streak',
    habitNameTh: 'เข้าใช้งานต่อเนื่อง (Streak)',
    habitNameEn: 'Active Daily Streak',
    streakDays: 14,
    status: 'legendary',
    impactTh: 'เกิดดวงดาวประกายรุ้งลอยรอบยอดไม้',
    icon: 'Flame'
  }
];

export const INITIAL_TREE_MEMORIES: TreeMemoryMilestone[] = [
  {
    id: 'mem_first_lesson',
    titleTh: 'ก้าวแรกแห่งความรู้: เรียนรู้ค่า Ft และกิโลวัตต์-ชั่วโมง',
    titleEn: 'First Step: Learned Ft & kWh',
    dateTh: '15 มีนาคม 2026',
    category: 'lesson',
    descriptionTh: 'คุณเข้าเรียนบทเรียนแรกใน Skill Tree และทำแบบทดสอบผ่าน 100% ต้นไม้เริ่มแทงยอดอ่อน sprout เติบโตขึ้นวันแรก!',
    descriptionEn: 'Completed your first lesson in Skill Tree. The Tree sprouted its first green leaf!',
    icon: 'BookOpen',
    photoSymbol: '🌱'
  },
  {
    id: 'mem_first_saving',
    titleTh: 'ชัยชนะครั้งแรก: ประหยัดค่าไฟ ฿150/เดือน',
    titleEn: 'First Real Saving: Saved ฿150/mo',
    dateTh: '28 มีนาคม 2026',
    category: 'saving',
    descriptionTh: 'ปรับลดการเปิดแอร์ทิ้งไว้ช่วงพักเที่ยง ช่วยเซฟค่าไฟลงได้ทันที 150 บาท ลำธารเล็กๆ เริ่มไหลผ่านโคนต้นไม้',
    descriptionEn: 'Reduced AC idle time and saved ฿150. A small clean stream began flowing past the Tree!',
    savingAmountThb: 150,
    icon: 'PiggyBank',
    photoSymbol: '💧'
  },
  {
    id: 'mem_lowest_bill',
    titleTh: 'สถิติต่ำสุดประวัติการณ์: ค่าไฟบิลมีนาคมเพียง ฿1,240',
    titleEn: 'Record Low Bill: March ฿1,240',
    dateTh: '5 เมษายน 2026',
    category: 'bill',
    descriptionTh: 'บริหารงบไฟสัปดาห์เว้นสัปดาห์ จนได้บิลค่าไฟต่ำสุดในรอบปี! ดอกไม้สีทองและผีเสื้อเริ่มมาเยือน',
    descriptionEn: 'Achieved the lowest monthly electricity bill of the year. Golden flowers bloomed!',
    savingAmountThb: 420,
    icon: 'Receipt',
    photoSymbol: '🏆'
  },
  {
    id: 'mem_high_score',
    titleTh: 'เกียรติยศระดับสูง: Saving Score แตะ 92 คะแนน!',
    titleEn: 'High Honor: Saving Score Reached 92!',
    dateTh: '18 เมษายน 2026',
    category: 'score',
    descriptionTh: 'ยกระดับการจัดการพลังงานในบ้านจนได้คะแนน Saving Score เกิน 90 คะแนน ต้นไม้เติบโตเป็น Ancient Tree ผู้พิทักษ์!',
    descriptionEn: 'Reached Saving Score above 90. The Tree evolved into an Ancient Guardian Tree!',
    icon: 'Trophy',
    photoSymbol: '⭐'
  },
  {
    id: 'mem_streak_14d',
    titleTh: 'ความสม่ำเสมอเป็นเลิศ: เช็กอินและออมไฟ 14 วันรวด',
    titleEn: 'Mastery Consistency: 14-Day Streak',
    dateTh: '1 พฤษภาคม 2026',
    category: 'streak',
    descriptionTh: 'รักษาวินัยการบันทึกไฟและทำภารกิจต่อเนื่อง 14 วัน นกฮูกปัญญาประดิษฐ์มาตั้งรังบนกิ่งไม้',
    descriptionEn: 'Maintained 14 days consecutive streak. Wise Owl came to make a nest on the branch!',
    icon: 'Flame',
    photoSymbol: '🔥'
  },
  {
    id: 'mem_esp32_connect',
    titleTh: 'การเชื่อมต่อโลกจริง: ติดตั้งเซ็นเซอร์ ESP32 IoT',
    titleEn: 'Real-World Hardware: ESP32 IoT Connected',
    dateTh: '10 พฤษภาคม 2026',
    category: 'hardware',
    descriptionTh: 'รับสัญญาณวัดกระแสไฟสดจาก ESP32 PZEM-004T เข้าสู่แอปพลิเคชัน เกิดเสาไฟพลังงานสะอาดเรืองแสง!',
    descriptionEn: 'Connected real ESP32 PZEM-004T sensor. Glowing clean energy pylons sprouted!',
    icon: 'Cpu',
    photoSymbol: '🔌'
  }
];

export const INITIAL_ECOSYSTEM_CREATURES: EcosystemCreature[] = [
  {
    id: 'creature_squirrel',
    nameTh: 'กระรอกน้อยประหยัดไฟ (Watt Squirrel)',
    nameEn: 'Watt Squirrel',
    icon: '🐿️',
    tipTh: 'เคล็ดลับกระรอก: ถอดปลั๊กทีวีและกล่องทีวีดิจิทัลตอนนอน ช่วยตัดไฟแฝง (Standby Power) ได้ปีละกว่า 300 บาท!',
    tipEn: 'Squirrel Tip: Unplug TV and set-top box before bed to eliminate standby power and save ~฿300/year!',
    unlocked: true,
    unlockedByTh: 'ทำภารกิจปลดไฟแฝงครบ 3 ครั้ง',
    category: 'mammal'
  },
  {
    id: 'creature_owl',
    nameTh: 'นกฮูกผู้รอบรู้ช่วงเวลา TOU (Wise TOU Owl)',
    nameEn: 'Wise TOU Owl',
    icon: '🦉',
    tipTh: 'เคล็ดลับนกฮูก: ช่วงเวลา Off-Peak (22.00 - 09.00 น.) ค่าไฟมิเตอร์ TOU ถูกกว่าช่วง Peak ถึง 50%! ซักผ้าช่วงนี้ประหยัดสุดๆ',
    tipEn: 'Owl Tip: Off-Peak hours (10 PM - 9 AM) TOU electricity rate is 50% cheaper! Ideal time for laundry.',
    unlocked: true,
    unlockedByTh: 'เรียนรู้บทเรียนเรื่องมิเตอร์ TOU',
    category: 'bird'
  },
  {
    id: 'creature_bee',
    nameTh: 'ผึ้งน้อย LED (Lumens Bee)',
    nameEn: 'Lumens Bee',
    icon: '🐝',
    tipTh: 'เคล็ดลับผึ้งน้อย: หลอดไฟ LED กินไฟน้อยกว่าหลอดไส้ถึง 85% และร้อนน้อยกว่า ทำให้แอร์ทำงานเบาลงด้วยนะ!',
    tipEn: 'Bee Tip: LED bulbs use 85% less energy than incandescent bulbs and produce almost no heat!',
    unlocked: true,
    unlockedByTh: 'เปลี่ยนมาใช้หลอด LED ในบ้าน',
    category: 'insect'
  },
  {
    id: 'creature_turtle',
    nameTh: 'เต่าน้อยโซลาร์เซลล์ (Solar Turtle)',
    nameEn: 'Solar Turtle',
    icon: '🐢',
    tipTh: 'เคล็ดลับเต่าน้อย: แผงโซลาร์เซลล์จะผลิตไฟฟ้าได้ดีที่สุดช่วง 10:00 - 14:00 น. นำกิจกรรมกินไฟมาใช้ช่วงนี้ฟรีๆ!',
    tipEn: 'Turtle Tip: Solar panels produce peak energy between 10 AM - 2 PM. Run heavy appliances during daytime!',
    unlocked: true,
    unlockedByTh: 'ปลดล็อกกิ่งพลังงานโซลาร์เซลล์',
    category: 'aquatic'
  },
  {
    id: 'creature_bluejay',
    nameTh: 'นกพญาเย็นอินเวอร์เตอร์ (Inverter Bird)',
    nameEn: 'Inverter Bird',
    icon: '🐦',
    tipTh: 'เคล็ดลับนกพญาเย็น: แอร์ระบบ Inverter จะเลี้ยงอุณหภูมิให้นิ่งโดยไม่ตัดคอมเพรสเซอร์ ประหยัดไฟกว่าระบบธรรมดา 30-40%',
    tipEn: 'Inverter Bird Tip: Inverter AC maintains precise temperature without stopping compressor, saving 30-40% energy!',
    unlocked: true,
    unlockedByTh: 'เปรียบเทียบแอร์ใน Compare Lab',
    category: 'bird'
  },
  {
    id: 'creature_firefly',
    nameTh: 'หิ่งห้อยพลังงานสะอาด (Eco Fireflies)',
    nameEn: 'Eco Fireflies',
    icon: '✨',
    tipTh: 'เคล็ดลับหิ่งห้อย: ไฟ LED ตกแต่งกำลังวัตต์ต่ำเพียง 2-5 วัตต์ เปิดสร้างบรรยากาศทั้งคืนกินไฟไม่ถึง 50 สตางค์!',
    tipEn: 'Firefly Tip: Low-wattage LED accent lighting uses under 5W, costing less than 0.50 THB per night!',
    unlocked: true,
    unlockedByTh: 'รักษางบไฟติดต่อกัน 7 วัน',
    category: 'insect'
  }
];

export const INITIAL_ECOSYSTEM_OBJECTS: EcosystemObject[] = [
  {
    id: 'obj_tree_core',
    nameTh: 'ต้นไม้พลังงานชีวิต (The Energy World Tree)',
    nameEn: 'The Energy World Tree',
    icon: '🌳',
    category: 'plant',
    unlocked: true,
    unlockedByTh: 'เริ่มต้นใช้งาน EduEase Energy',
    descriptionTh: 'หัวใจหลักของระบบนิเวศ เติบโตตามความรู้ การประหยัดไฟจริง และวินัยประจำวันของคุณ',
    educationalTipTh: 'ต้นไม้จะคายออกซิเจนบริสุทธิ์และเรืองแสง เมื่อค่าไฟของคุณต่ำกว่างบประมาณที่กำหนด',
    nextUpgradeTh: 'ยกระดับสู่ Legendary World Tree เมื่อสะสม Tree Power ครบ 1,600 แต้ม'
  },
  {
    id: 'obj_solar_rooftop',
    nameTh: 'หลังคาโซลาร์เซลล์อัจฉริยะ (Smart Solar Roof)',
    nameEn: 'Smart Solar Roof',
    icon: '☀️',
    category: 'energy',
    unlocked: true,
    unlockedByTh: 'เรียนรู้กิ่งโซลาร์เซลล์ Level 2',
    descriptionTh: 'แผงโซลาร์เซลล์บนหลังคาบ้านระบบ On-Grid ผลิตไฟสะอาดป้อนกลับเข้าบ้านและระบบนิเวศ',
    educationalTipTh: 'ช่วยลดการดึงไฟฟ้าจากการไฟฟ้าช่วง On-Peak ประหยัดเงินได้สูงสุด 30-50%',
    nextUpgradeTh: 'ติดตั้งแบตเตอรี่กักเก็บพลังงาน Battery Storage'
  },
  {
    id: 'obj_wind_turbine',
    nameTh: 'กังหันลมพลังงานสะอาด (Micro Wind Turbine)',
    nameEn: 'Micro Wind Turbine',
    icon: '🌀',
    category: 'energy',
    unlocked: true,
    unlockedByTh: 'รักษาวินัยประหยัดไฟเกิน 10 วัน',
    descriptionTh: 'กังหันลมแนวตั้งหมุนเงียบ ผลิตกระแสไฟฟ้าจากสายลมในธรรมชาติ',
    educationalTipTh: 'ผลิตไฟฟ้าได้ตลอด 24 ชั่วโมงแม้ในคืนที่ไม่มีแสงแดด เหมาะเสริมระบบไฮบริด',
    nextUpgradeTh: 'อัปเกรดเป็นกังหันลมแม่เหล็กไร้แรงเสียดทาน'
  },
  {
    id: 'obj_river_wheel',
    nameTh: 'ระหัดวอเตอร์วีลพลังน้ำ (Hydro Water Wheel)',
    nameEn: 'Hydro Water Wheel',
    icon: '🌊',
    category: 'water',
    unlocked: true,
    unlockedByTh: 'ทำความสะอาดคราบพลังงานและลดคาร์บอน',
    descriptionTh: 'ระหัดวอร์เตอร์วีลหมุนตามกระแสน้ำในลำธาร ผลิตพลังงานสะอาดและเพิ่มออกซิเจนในน้ำ',
    educationalTipTh: 'พลังงานน้ำ (Hydro Energy) เป็นพลังงานหมุนเวียนที่มีความเสถียรสูงมาก',
    nextUpgradeTh: 'สร้างเขื่อนกักเก็บพลังงานขนาดเล็ก Micro Hydro'
  },
  {
    id: 'obj_esp32_pylon',
    nameTh: 'เสาส่งสัญญาณ IoT & ESP32 Node',
    nameEn: 'ESP32 IoT Sensor Pylon',
    icon: '📡',
    category: 'tech',
    unlocked: true,
    unlockedByTh: 'เชื่อมต่อ ESP32 PZEM-004T',
    descriptionTh: 'เสารับส่งข้อมูลการใช้กระแสไฟฟ้า (Voltage, Current, Power Factor) แบบเรียลไทม์',
    educationalTipTh: 'การรู้ปริมาณวัตต์แบบสดๆ ช่วยให้ไหวตัวทันก่อนค่าไฟจะบานปลายสิ้นเดือน',
    nextUpgradeTh: 'เพิ่มระบบแจ้งเตือนไฟรั่วอัตโนมัติผ่าน AI'
  },
  {
    id: 'obj_eco_house',
    nameTh: 'บ้านประหยัดพลังงานเบอร์ 5 (Zero Carbon House)',
    nameEn: 'Zero Carbon Eco House',
    icon: '🏠',
    category: 'structure',
    unlocked: true,
    unlockedByTh: 'ปลดล็อกสกิน Eco House',
    descriptionTh: 'บ้านที่ออกแบบตามหลักทิศทางลม หลังคากันความร้อน ผนังอิฐมวลเบา และเครื่องใช้ไฟฟ้าเบอร์ 5 3ดาว',
    educationalTipTh: 'บ้านเบอร์ 5 ช่วยลดความร้อนสะสมในตัวบ้าน ทำให้แอร์ประหยัดไฟขึ้น 20%',
    nextUpgradeTh: 'ติดตั้งระบบระบายอากาศอัจฉริยะ HRV'
  },
  {
    id: 'obj_rain_collector',
    nameTh: 'ถังดักน้ำฝนหมุนเวียน (Rainwater Harvesting)',
    nameEn: 'Rainwater Collector',
    icon: '🌧️',
    category: 'water',
    unlocked: true,
    unlockedByTh: 'ผ่านซีซันฤดูฝน Rainy Event',
    descriptionTh: 'รองรับน้ำฝนจากหลังคาผ่านตัวกรองสแตนเลส นำมารดน้ำสวนและป้อนความเย็นให้แอร์',
    educationalTipTh: 'การประหยัดน้ำช่วยลดพลังงานปั๊มน้ำไฟฟ้าในบ้านได้โดยตรง',
    nextUpgradeTh: 'อัปเกรดระบบกรอง UV ฆ่าเชื้ออัตโนมัติ'
  },
  {
    id: 'obj_flower_bed',
    nameTh: 'แปลงดอกไม้อเมทิสต์ออมไฟ (Amethyst Energy Garden)',
    nameEn: 'Amethyst Energy Garden',
    icon: '🌸',
    category: 'plant',
    unlocked: true,
    unlockedByTh: 'สะสมคะแนน Saving Score เกิน 80',
    descriptionTh: 'ดอกไม้มงคลที่บานสะพรั่งส่งกลิ่นหอม ยิ่งคุมงบค่าไฟได้ดี ดอกไม้ยิ่งขยายพันธุ์สวยงาม',
    educationalTipTh: 'ต้นไม้และสวนรอบบ้านช่วยลดอุณหภูมิรอบตัวบ้านลงได้ 2-4°C',
    nextUpgradeTh: 'ปลดล็อกพันธุ์ดอกไม้เรืองแสงยามค่ำคืน'
  }
];

export const WORLD_EXPANSION_REGIONS: {
  id: WorldExpansionRegion;
  nameTh: string;
  nameEn: string;
  levelRequired: number;
  unlocked: boolean;
  descriptionTh: string;
  icon: string;
}[] = [
  {
    id: 'eco_garden',
    nameTh: '1. สวนพลังงานครัวเรือน (Eco Home Garden)',
    nameEn: '1. Eco Home Garden',
    levelRequired: 1,
    unlocked: true,
    descriptionTh: 'สวนหน้าบ้านพร้อมต้นไม้ออมไฟ หลังคาโซลาร์ และระบบเก็บน้ำฝน',
    icon: '🏡'
  },
  {
    id: 'whispering_forest',
    nameTh: '2. ป่ากระซิบแห่งธรรมชาติ (Whispering Eco Forest)',
    nameEn: '2. Whispering Eco Forest',
    levelRequired: 3,
    unlocked: true,
    descriptionTh: 'ผืนป่าที่อุดมสมบูรณ์ ลำธารใสสะอาด กังหันลม และสัตวป่านานาชนิด',
    icon: '🌲'
  },
  {
    id: 'eco_smart_house',
    nameTh: '3. บ้านอัจฉริยะคาร์บอนต่ำ (Zero Carbon Smart House)',
    nameEn: '3. Zero Carbon Smart House',
    levelRequired: 5,
    unlocked: true,
    descriptionTh: 'ศูนย์กลางควบคุม IoT, เซ็นเซอร์ ESP32 และระบบแผงโซลาร์ระดับสูง',
    icon: '🏠'
  },
  {
    id: 'solar_farm',
    nameTh: '4. ฟาร์มโซลาร์เซลล์ชุมชน (Community Solar Farm)',
    nameEn: '4. Community Solar Farm',
    levelRequired: 7,
    unlocked: true,
    descriptionTh: 'ทุ่งแผงโซลาร์เซลล์ตามแสงอาทิตย์ (Solar Tracking) ป้อนไฟให้ชุมชน',
    icon: '☀️'
  },
  {
    id: 'eco_village',
    nameTh: '5. หมู่บ้านนิเวศยั่งยืน (Eco Green Village)',
    nameEn: '5. Eco Green Village',
    levelRequired: 9,
    unlocked: false,
    descriptionTh: 'ชุมชนต้นแบบพลังงานหมุนเวียน 100% มีระบบ Microgrid แลกเปลี่ยนไฟฟ้า',
    icon: '🌾'
  },
  {
    id: 'smart_green_city',
    nameTh: '6. มหานครเขียวอัจฉริยะ (Smart Green City)',
    nameEn: '6. Smart Green City',
    levelRequired: 12,
    unlocked: false,
    descriptionTh: 'เมืองแห่งอนาคต Carbon-Neutral สมบูรณ์แบบที่ทุกคนร่วมกันออมไฟ',
    icon: '🌆'
  }
];
