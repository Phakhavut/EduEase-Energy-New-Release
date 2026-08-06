import { Appliance, Mission, Badge, CharacterSkin, AICoachRecommendation } from '../types';

export const INITIAL_APPLIANCES: Appliance[] = [
  {
    id: 1,
    name: 'Air Conditioner 18,000 BTU',
    watt: 1200,
    hours: 8,
    category: 'Cooling',
    status: 'active',
    healthScore: 92,
    efficiencyTag: 'A+++ Eco',
    todayCost: 43.20,
    monthlyCost: 1296.00,
    icon: 'Snowflake',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    aiTip: 'ปรับเพิ่มเป็น 26°C ร่วมกับพัดลม ช่วยเซฟเงินได้อีก ฿180/เดือน',
    aiTipEn: 'Set to 26°C with a fan running to save another ฿180/month',
    pf: 0.95,
    logs: [
      { date: '2026-07-28', action: 'ล้างแผ่นกรองฝุ่นประจำเดือน', status: 'resolved' },
      { date: '2026-08-01', action: 'ตรวจเช็กระดับน้ำยาแอร์', status: 'resolved' }
    ]
  },
  {
    id: 2,
    name: 'Gaming Desktop PC',
    watt: 450,
    hours: 5,
    category: 'Entertainment',
    status: 'active',
    healthScore: 88,
    efficiencyTag: 'Good',
    todayCost: 10.12,
    monthlyCost: 303.75,
    icon: 'Monitor',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    aiTip: 'ปิดปลั๊กพ่วงเมื่อเล่นเสร็จเพื่อตัดไฟรั่วซึมสแตนด์บาย ฿45/เดือน',
    aiTipEn: 'Unplug power strip after gaming to stop ฿45/mo standby drain',
    pf: 0.91,
    logs: [
      { date: '2026-07-15', action: 'เป่าฝุ่นพัดลมระบายความร้อน', status: 'resolved' }
    ]
  },
  {
    id: 3,
    name: 'Inverter Refrigerator 12 cu.ft',
    watt: 140,
    hours: 24,
    category: 'Kitchen',
    status: 'active',
    healthScore: 96,
    efficiencyTag: 'A+++ Eco',
    todayCost: 15.12,
    monthlyCost: 453.60,
    icon: 'Refrigerator',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80',
    aiTip: 'การทำงานสมบูรณ์แบบมาก ประหยัดไฟระดับดาวสูงสุด',
    aiTipEn: 'Operating perfectly with maximum eco efficiency',
    pf: 0.98,
    logs: [
      { date: '2026-06-10', action: 'ทำความสะอาดคอยล์เย็น', status: 'resolved' }
    ]
  },
  {
    id: 4,
    name: 'Instant Water Heater',
    watt: 3500,
    hours: 0.5,
    category: 'Bathroom',
    status: 'off',
    healthScore: 85,
    efficiencyTag: 'Heavy Drinker',
    todayCost: 7.88,
    monthlyCost: 236.25,
    icon: 'Flame',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    aiTip: 'ใช้ไฟวัตต์สูงมาก! ปรับระดับความร้อนปานกลางประหยัดได้ ฿80/เดือน',
    aiTipEn: 'High wattage! Lowering heat setting saves ฿80/month',
    pf: 0.99,
    logs: [
      { date: '2026-07-01', action: 'ทดสอบปุ่ม ELCB ป้องกันไฟรั่ว', status: 'resolved' }
    ]
  },
  {
    id: 5,
    name: 'Smart 4K OLED TV 65"',
    watt: 160,
    hours: 4,
    category: 'Entertainment',
    status: 'standby',
    healthScore: 90,
    efficiencyTag: 'Good',
    todayCost: 2.88,
    monthlyCost: 86.40,
    icon: 'Tv',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
    aiTip: 'เปิดโหมดถนอมสายตา และตั้งเวลาปิดเมื่อไม่ได้ดู',
    aiTipEn: 'Enable eye-saver mode and auto sleep timer',
    pf: 0.92,
    logs: [
      { date: '2026-08-02', action: 'อัปเดตเฟิร์มแวร์ Eco Mode', status: 'resolved' }
    ]
  },
  {
    id: 6,
    name: 'Front Load Washing Machine',
    watt: 600,
    hours: 0.8,
    category: 'Misc',
    status: 'off',
    healthScore: 94,
    efficiencyTag: 'A+++ Eco',
    todayCost: 2.16,
    monthlyCost: 64.80,
    icon: 'WashingMachine',
    imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80',
    aiTip: 'ซักผ้าช่วงหลัง 22:00 น. (Off-Peak) ค่าไฟถูกลงกว่าเดิม 40%',
    aiTipEn: 'Wash after 22:00 (Off-Peak) for 40% cheaper electricity rates',
    pf: 0.90,
    logs: [
      { date: '2026-07-20', action: 'ล้างถังซักอัตโนมัติ', status: 'resolved' }
    ]
  },
  {
    id: 7,
    name: 'Digital Microwave Oven',
    watt: 1100,
    hours: 0.3,
    category: 'Kitchen',
    status: 'off',
    healthScore: 91,
    efficiencyTag: 'Average',
    todayCost: 1.49,
    monthlyCost: 44.55,
    icon: 'Microwave',
    imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80',
    aiTip: 'ใช้ฝาครอบไมโครเวฟช่วยให้อาหารร้อนเร็วขึ้น 20%',
    aiTipEn: 'Use microwave cover to heat food 20% faster',
    pf: 0.94,
    logs: []
  },
  {
    id: 8,
    name: 'Smart LED Room Lighting',
    watt: 45,
    hours: 7,
    category: 'Lighting',
    status: 'active',
    healthScore: 98,
    efficiencyTag: 'A+++ Eco',
    todayCost: 1.42,
    monthlyCost: 42.53,
    icon: 'Lightbulb',
    imageUrl: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=600&q=80',
    aiTip: 'ตั้งเวลาปิดอัตโนมัติเมื่อออกจากห้องพัก',
    aiTipEn: 'Set auto-off timer when leaving the room',
    pf: 0.97,
    logs: []
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'mission_1',
    title: 'ปรับแอร์ 26°C สู้แดดบ่าย',
    titleEn: 'Set AC to 26°C during hot afternoon',
    description: 'เปิดแอร์ 26°C พร้อมเปิดพัดลมช่วยระบายความร้อนช่วง 13:00-16:00 น.',
    descriptionEn: 'Run AC at 26°C paired with a fan between 13:00 - 16:00',
    xpReward: 50,
    coinReward: 20,
    completed: false,
    category: 'daily',
    icon: 'Snowflake',
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'mission_2',
    title: 'ปราบไฟสแตนด์บายตกค้าง',
    titleEn: 'Zero Standby Power Drain',
    description: 'ปิดปลั๊กพ่วงทีวี/เครื่องเล่นเกมเมื่อใช้งานเสร็จในคืนนี้',
    descriptionEn: 'Turn off power strip for TV and gaming console tonight',
    xpReward: 40,
    coinReward: 15,
    completed: false,
    category: 'daily',
    icon: 'Power',
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'mission_3',
    title: 'ถาม AI Coach เพื่อหาจุดออมเงิน',
    titleEn: 'Chat with AI Coach for savings tips',
    description: 'คุยกับ Voltie ผู้ช่วย AI เพื่อขอคำแนะนำประหยัดค่าไฟ 1 ข้อ',
    descriptionEn: 'Ask Voltie the AI Coach for 1 personalized saving tip',
    xpReward: 30,
    coinReward: 10,
    completed: true,
    category: 'daily',
    icon: 'Bot',
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'mission_4',
    title: 'ย้ายเวลาใช้ไฟสูงไปช่วง Off-Peak',
    titleEn: 'Shift high load to Off-Peak hours',
    description: 'ใช้เครื่องซักผ้าหรือเครื่องทำน้ำอุ่นหลัง 22:00 น. รวม 3 ครั้ง',
    descriptionEn: 'Run washing machine or water heater after 22:00 (3 times)',
    xpReward: 120,
    coinReward: 50,
    completed: false,
    category: 'weekly',
    icon: 'Clock',
    progress: 1,
    maxProgress: 3
  },
  {
    id: 'mission_5',
    title: 'คุมงบค่าไฟสัปดาห์ไม่เกิน ฿500',
    titleEn: 'Keep weekly electricity cost under ฿500',
    description: 'รักษาค่าไฟสะสมรวมตลอดสัปดาห์ให้อยู่ในงบประมาณที่กำหนด',
    descriptionEn: 'Maintain total weekly spend under ฿500',
    xpReward: 200,
    coinReward: 80,
    completed: false,
    category: 'weekly',
    icon: 'PiggyBank',
    progress: 380,
    maxProgress: 500
  },
  {
    id: 'mission_6',
    title: 'รักษาอนุกรมเช็คอิน 7 วันติดกัน (Streak)',
    titleEn: '7-Day Check-in Streak Master',
    description: 'เข้าใช้งาน EduEase Energy ต่อเนื่องกันครบ 7 วัน',
    descriptionEn: 'Open EduEase Energy for 7 consecutive days',
    xpReward: 350,
    coinReward: 150,
    completed: false,
    category: 'monthly',
    icon: 'Flame',
    progress: 5,
    maxProgress: 7
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge_streak_3',
    name: 'นักออมติดสปีด (3-Day Streak)',
    nameEn: '3-Day Streak Master',
    description: 'เช็คอินดูแลพลังงานต่อเนื่อง 3 วัน',
    descriptionEn: 'Checked in for 3 consecutive days',
    icon: 'Flame',
    unlocked: true,
    rarity: 'Common',
    category: 'Streak'
  },
  {
    id: 'badge_ac_eco',
    name: 'ปรมาจารย์ประหยัดแอร์',
    nameEn: 'AC Eco Master',
    description: 'เปิดแอร์โหมด 26°C ครบ 10 ครั้ง',
    descriptionEn: 'Used 26°C Eco Mode 10 times',
    icon: 'Snowflake',
    unlocked: true,
    rarity: 'Rare',
    category: 'Cooling'
  },
  {
    id: 'badge_standby_zero',
    name: 'ผู้พิทักษ์ไร้ไฟสแตนด์บาย',
    nameEn: 'Zero Standby Hero',
    description: 'ตัดไฟรั่วซึมสแตนด์บายสำเร็จ 100%',
    descriptionEn: 'Eliminated 100% standby power leakage',
    icon: 'ZapOff',
    unlocked: true,
    rarity: 'Rare',
    category: 'Power'
  },
  {
    id: 'badge_budget_guardian',
    name: 'ผู้คุ้มครองงบประมาณ',
    nameEn: 'Budget Guardian',
    description: 'ไม่ใช้ไฟเกินงบประมาณติดต่อกัน 1 เดือน',
    descriptionEn: 'Stayed under budget for 1 full month',
    icon: 'ShieldCheck',
    unlocked: false,
    rarity: 'Epic',
    category: 'Budget'
  },
  {
    id: 'badge_tou_ninja',
    name: 'นินจาเวลา TOU',
    nameEn: 'TOU Tariff Ninja',
    description: 'ย้ายการใช้ไฟไปช่วง Off-Peak ได้มากกว่า 60%',
    descriptionEn: 'Shifted >60% energy usage to Off-Peak hours',
    icon: 'Clock',
    unlocked: false,
    rarity: 'Epic',
    category: 'Tariff'
  },
  {
    id: 'badge_tree_legend',
    name: 'ตำนานต้นไม้พลังงาน',
    nameEn: 'World Energy Tree Legend',
    description: 'ปลูกต้นไม้พลังงานจนเติบโตเต็มที่ระดับสูงสุด',
    descriptionEn: 'Evolved the Energy Tree to maximum level',
    icon: 'TreePine',
    unlocked: false,
    rarity: 'Legendary',
    category: 'Tree'
  }
];

export const INITIAL_SKINS: CharacterSkin[] = [
  {
    id: 'skin_voltie_classic',
    name: 'น้อง Voltie ดั้งเดิม',
    nameEn: 'Voltie Classic',
    avatarUrl: '⚡',
    unlocked: true,
    priceCoins: 0,
    description: 'มาสคอต AI Energy Coach ผู้ร่าเริง สนุกสนาน และคอยช่วยเซฟเงิน',
    descriptionEn: 'Your cheerful AI Energy Coach always ready to save money',
    icon: 'Zap'
  },
  {
    id: 'skin_solar_hero',
    name: 'ฮีโร่โซลาร์เซลล์ ☀️',
    nameEn: 'Solar Hero',
    avatarUrl: '☀️',
    unlocked: true,
    priceCoins: 100,
    description: 'ผู้กล้าพลังแสงอาทิตย์ เพิ่มโบนัส XP +10% เมื่อทำภารกิจช่วงกลางวัน',
    descriptionEn: 'Solar hero boosting daytime mission XP by +10%',
    icon: 'Sun'
  },
  {
    id: 'skin_eco_ninja',
    name: 'นินจาไร้ไฟสแตนด์บาย 🥷',
    nameEn: 'Eco Ninja',
    avatarUrl: '🥷',
    unlocked: false,
    priceCoins: 250,
    description: 'ผู้เร้นกายปราบไฟแฝงรั่วซึมในยามค่ำคืน',
    descriptionEn: 'Stealthy ninja eliminating night vampire power leakage',
    icon: 'Shield'
  },
  {
    id: 'skin_electric_cat',
    name: 'แมวไฟฟ้าพลังบวก 🐱⚡',
    nameEn: 'Electric Cat',
    avatarUrl: '🐱',
    unlocked: false,
    priceCoins: 400,
    description: 'น้องแมวสายฟ้าสุดคิวท์ น่ารักสดใส มอบกำลังใจให้คุณออมเงินทุกวัน',
    descriptionEn: 'Cute electric kitty bringing daily positive savings motivation',
    icon: 'Sparkles'
  }
];

export const INITIAL_RECOMMENDATIONS: AICoachRecommendation[] = [
  {
    id: 'rec_ac_26',
    title: 'เปิดแอร์ 26°C + พัดลมส่าย',
    titleEn: 'Set AC to 26°C with oscillating fan',
    description: 'อุณหภูมิภายนอกร้อน 34°C ปรับแอร์ขึ้น 1 องศา แล้วเปิดพัดลมช่วย จะเย็นเท่าเดิมแต่ลดภาระคอมเพรสเซอร์ทันที',
    descriptionEn: 'Outside temp is 34°C. Raising AC by 1°C with a fan gives the same cool comfort while dropping compressor load',
    moneySavedMonth: 180,
    difficulty: 'Easy',
    timeRequired: '1 นาที',
    confidence: 98,
    applied: false,
    actionType: 'ac_eco'
  },
  {
    id: 'rec_standby_cutoff',
    title: 'ตัดไฟสแตนด์บายชุดคอมและทีวี',
    titleEn: 'Cut standby power on PC & TV setup',
    description: 'อุปกรณ์สแตนด์บายช่วงดึกกินไฟแฝงอยู่อย่างต่อเนื่อง ปิดสวิตช์ปลั๊กพ่วงหลักเซฟเงินกระเป๋าได้เลย',
    descriptionEn: 'Standby devices consume vampire power overnight. Switching off main power strip saves instant cash',
    moneySavedMonth: 95,
    difficulty: 'Quick',
    timeRequired: '30 วินาที',
    confidence: 95,
    applied: false,
    actionType: 'standby_cut'
  },
  {
    id: 'rec_tou_shift',
    title: 'ย้ายการซักผ้า/ต้มน้ำร้อนไปหลัง 22:00 น.',
    titleEn: 'Shift washing & water heating post 22:00',
    description: 'ช่วงหลังสี่ทุ่มเป็นอัตราค่าไฟ Off-Peak (฿2.60/หน่วย) ถูกกว่าช่วงกลางวันเกินครึ่งหนึ่ง',
    descriptionEn: 'After 22:00 electricity drops to Off-Peak rate (฿2.60/unit), over 50% cheaper than daytime peak',
    moneySavedMonth: 220,
    difficulty: 'Medium',
    timeRequired: '2 นาที',
    confidence: 92,
    applied: false,
    actionType: 'tou_shift'
  }
];

export const LEADERBOARD_USERS = [
  { rank: 1, name: 'Tonkla EcoMaster 🌿', level: 9, xp: 4850, streak: 14, avatar: '🪴', isUser: false },
  { rank: 2, name: 'Mew Sentry ⚡', level: 8, xp: 3920, streak: 11, avatar: '🦊', isUser: false },
  { rank: 3, name: 'Namyen (คุณ) ✨', level: 7, xp: 2450, streak: 5, avatar: '⚡', isUser: true },
  { rank: 4, name: 'Ploy GreenHero 🌸', level: 6, xp: 2100, streak: 4, avatar: '🐱', isUser: false },
  { rank: 5, name: 'Ken SolarBoy ☀️', level: 5, xp: 1750, streak: 3, avatar: '🐻', isUser: false }
];

export const INITIAL_LOCATIONS = [
  {
    id: 'loc_home',
    name: 'บ้านพักหลัก (กรุงเทพฯ)',
    nameEn: 'Main Home (Bangkok)',
    type: 'home' as const,
    province: 'กรุงเทพมหานคร',
    residents: 3,
    billingCycleDay: 25,
    budget: 2500,
    estimatedBill: 2188,
    isConnected: true,
    lastUpdated: '5 นาทีที่แล้ว',
    memberCount: 3,
    icon: 'Home',
    isCurrent: true
  },
  {
    id: 'loc_dorm',
    name: 'หอพักนักศึกษา (ศาลายา)',
    nameEn: 'Student Dorm (Salaya)',
    type: 'dorm' as const,
    province: 'นครปฐม',
    residents: 1,
    billingCycleDay: 1,
    budget: 1200,
    estimatedBill: 980,
    isConnected: false,
    lastUpdated: '1 ชม. ที่แล้ว',
    memberCount: 1,
    icon: 'Building2',
    isCurrent: false
  },
  {
    id: 'loc_provincial',
    name: 'บ้านต่างจังหวัด (เชียงใหม่)',
    nameEn: 'Chiang Mai Family House',
    type: 'provincial' as const,
    province: 'เชียงใหม่',
    residents: 4,
    billingCycleDay: 15,
    budget: 3200,
    estimatedBill: 2750,
    isConnected: true,
    lastUpdated: '10 นาทีที่แล้ว',
    memberCount: 4,
    icon: 'Trees',
    isCurrent: false
  },
  {
    id: 'loc_shop',
    name: 'ร้านกาแฟครอบครัว (นนทบุรี)',
    nameEn: 'Family Coffee Shop',
    type: 'shop' as const,
    province: 'นนทบุรี',
    residents: 2,
    billingCycleDay: 10,
    budget: 6500,
    estimatedBill: 5820,
    isConnected: true,
    lastUpdated: '2 นาทีที่แล้ว',
    memberCount: 2,
    icon: 'Store',
    isCurrent: false
  }
];

export const INITIAL_GLOSSARY_TERMS = [
  {
    id: 'term_kwh',
    termTh: 'หน่วยไฟฟ้า (kWh / กิโลวัตต์-ชั่วโมง)',
    termEn: 'Kilowatt-hour (kWh / Unit)',
    category: 'unit' as const,
    definitionTh: 'มาตรวัดปริมาณพลังงานไฟฟ้าที่ใชัจริง โดย 1 หน่วย เท่ากับการใช้เครื่องใช้ไฟฟ้าขนาด 1,000 วัตต์ ติดต่อกันนาน 1 ชั่วโมง',
    definitionEn: 'The measure of electrical energy consumed. 1 kWh equals using a 1,000 Watt appliance continuously for 1 hour.',
    exampleTh: 'เปิดแอร์ 1,000 วัตต์ นาน 1 ชั่วโมง = ใช้ไฟไป 1 หน่วย (ประมาณ 4.2 บาท)',
    exampleEn: 'Running a 1,000W AC for 1 hour = 1 Unit (approx. ฿4.2)',
    difficulty: 'Basic' as const,
    relatedPage: 'learning' as const
  },
  {
    id: 'term_watt',
    termTh: 'วัตต์ (Watt / W)',
    termEn: 'Watt (W)',
    category: 'unit' as const,
    definitionTh: 'หน่วยวัดกำลังไฟฟ้าที่เครื่องใช้ไฟฟ้านั้นๆ ต้องการขณะเปิดใช้งาน ยิ่งวัตต์สูงยิ่งสูบไฟแรง',
    definitionEn: 'Unit of electrical power indicating how much energy an appliance demands per instant.',
    exampleTh: 'พัดลมธรรมดาใช้ไฟ 50W ส่วนไดร์เป่าผมใช้ไฟ 1,500W (กินไฟมากกว่า 30 เท่า!)',
    exampleEn: 'A fan uses 50W while a hairdryer demands 1,500W (30x higher!).',
    difficulty: 'Basic' as const,
    relatedPage: 'appliances' as const
  },
  {
    id: 'term_ft',
    termTh: 'ค่า Ft (ค่าไฟฟ้าแปรผัน)',
    termEn: 'Fuel Adjustment Charge (Ft)',
    category: 'bill' as const,
    definitionTh: 'ค่าปรับปรุงต้นทุนเชื้อเพลิงผลิตไฟฟ้า (เช่น ก๊าซธรรมชาติ, น้ำมัน) ที่เปลี่ยนแปลงตามราคาตลาดโลก การไฟฟ้าปรับเปลี่ยนทุกๆ 4 เดือน',
    definitionEn: 'Fuel adjustment charge refilling electricity generation fuel costs, updated every 4 months.',
    exampleTh: 'งวดปัจจุบันค่า Ft อยู่ที่ 0.3972 บาทต่อหน่วย ถ้าเดือนนี้ใช้ไฟ 200 หน่วย ค่า Ft จะเท่ากับ 79.44 บาท',
    exampleEn: 'At Ft rate ฿0.3972/unit, consuming 200 units adds ฿79.44 Ft charge.',
    difficulty: 'Intermediate' as const,
    relatedPage: 'budget' as const
  },
  {
    id: 'term_tou',
    termTh: 'อัตราค่าไฟตามช่วงเวลา (TOU Rate)',
    termEn: 'Time-of-Use Rate (TOU)',
    category: 'bill' as const,
    definitionTh: 'โครงสร้างราคาค่าไฟที่แบ่งตามช่วงเวลาของการใช้งาน โดยช่วง On-Peak (กลางวันวันทำงาน) ค่าไฟแพง และช่วง Off-Peak (กลางคืนและวันหยุด) ค่าไฟถูกลงกว่าครึ่ง',
    definitionEn: 'Tariff structure where daytime peak electricity costs more, while night/weekend off-peak is heavily discounted.',
    exampleTh: 'ช่วง Off-Peak (22:00 - 09:00 น.) ค่าไฟประมาณ ฿2.60/หน่วย เหมาะกับการชาร์จรถ EV หรือซักผ้า',
    exampleEn: 'Off-Peak (22:00 - 09:00) costs ~฿2.60/unit, ideal for EV charging or laundry.',
    difficulty: 'Intermediate' as const,
    relatedPage: 'budget' as const
  },
  {
    id: 'term_standby',
    termTh: 'ไฟสแตนด์บาย / ไฟแฝง (Standby Power)',
    termEn: 'Standby Power / Vampire Draw',
    category: 'equipment' as const,
    definitionTh: 'พลังงานไฟฟ้าที่ถูกดึงไปเลี้ยงวงจรภายในเครื่องใช้ไฟฟ้าแม้เปิดสวิตช์ปิดหน้าจอแล้ว เช่น ไฟแดงค้างบนทีวี หรือกล่องสัญญาณอินเทอร์เน็ต',
    definitionEn: 'Electricity consumed by electronics when turned off or in standby mode.',
    exampleTh: 'กล่องทีวีแฝงกินไฟสแตนด์บาย 10W ตลอด 24 ชม. คิดเป็นเงินเปล่าประมาณ 35 บาท/เดือน',
    exampleEn: 'TV set-top box draws 10W 24/7 standby, wasting ~฿35/month.',
    difficulty: 'Basic' as const,
    relatedPage: 'appliances' as const
  },
  {
    id: 'term_pf',
    termTh: 'ตัวประกอบกำลัง (Power Factor / PF)',
    termEn: 'Power Factor (PF)',
    category: 'advanced' as const,
    definitionTh: 'ดัชนีประสิทธิภาพการใช้พลังงานไฟฟ้าของเครื่องใช้ไฟฟ้าชนิดมอเตอร์/คอยล์ (ค่าอยู่ระหว่าง 0 ถึง 1.0) หากค่า PF ใกล้ 1.0 หมายถึงใช้ไฟได้คุ้มค่าไร้พลังงานสูญเสีย',
    definitionEn: 'Efficiency ratio of working power to total power in AC circuits (scale 0.0 to 1.0).',
    exampleTh: 'แอร์ระบบ Inverter ใหม่มีค่า PF สูงถึง 0.98 ช่วยให้สายส่งเย็นและไม่เปลืองไฟแฝง',
    exampleEn: 'Modern Inverter AC achieves 0.98 PF, minimizing line loss heat.',
    difficulty: 'Advanced' as const,
    relatedPage: 'analytics' as const
  }
];

export const INITIAL_LEARNING_PATHS = [
  {
    id: 'path_basics',
    titleTh: '1. เริ่มเข้าใจค่าไฟ (Electricity Basics)',
    titleEn: '1. Basics of Electricity & kWh',
    descTh: 'ทำความเข้าใจหน่วยไฟ วัตต์ และที่มาของตัวเลขในบิลอย่างง่ายดาย',
    icon: 'Zap',
    lessons: [
      {
        id: 'les_1',
        pathId: 'path_basics',
        titleTh: '1 หน่วยไฟ (kWh) คืออะไร และคิดเงินอย่างไร?',
        titleEn: 'What is 1 Unit (kWh)?',
        readTime: '2 นาที',
        xpReward: 30,
        contentTh: 'หน่วยไฟ (kWh) มาจากกำลังไฟ (วัตต์) x ชั่วโมงการใช้งาน / 1,000 ตัวอย่างเช่น ถ้าคุณใช้เปิดแอร์ 1,000 วัตต์ เป็นเวลา 1 ชั่วโมง คุณจะเสียไฟไป 1 หน่วย พอดีเป๊ะ ซึ่งมีราคาเฉลี่ยประมาณ 4.2 บาทครับ',
        contentEn: '1 kWh = (Watts x Hours) / 1000. Running a 1000W appliance for 1 hour consumes 1 Unit (~฿4.2).',
        questionTh: 'ถ้าเปิดพัดลมขนาด 50 วัตต์ นาน 20 ชั่วโมง จะใช้ไฟไปกี่หน่วย?',
        optionsTh: ['0.5 หน่วย', '1.0 หน่วย', '2.0 หน่วย', '5.0 หน่วย'],
        correctIndex: 1,
        explanationTh: 'ถูกต้องครับ! 50 วัตต์ x 20 ชั่วโมง = 1,000 วัตต์-ชั่วโมง หรือเท่ากับ 1.0 หน่วยไฟพอดี!'
      },
      {
        id: 'les_2',
        pathId: 'path_basics',
        titleTh: 'แยกแยะ วัตต์ (Watt) กับ หน่วยไฟ (kWh) ให้ไม่งง',
        titleEn: 'Watts vs kWh Explained',
        readTime: '3 นาที',
        xpReward: 40,
        contentTh: 'คิดง่ายๆ: "วัตต์" คือความแรงในการกินไฟ ณ วินาทีนั้น (เหมือนความเร็วรถ) ส่วน "หน่วยไฟ (kWh)" คือปริมาณไฟสะสมที่คุณต้องจ่ายเงินจริง (เหมือนระยะทางที่รถวิ่ง)',
        contentEn: 'Think of Watt as instantaneous speed and kWh as total distance driven that shows up on your bill.',
        questionTh: 'ไดร์เป่าผม 1,800 วัตต์ กับ แอร์ 1,000 วัตต์ อุปกรณ์ไหนกินไฟต่อวินาทีแรงกว่ากัน?',
        optionsTh: ['ไดร์เป่าผมแรงกว่า', 'แอร์แรงกว่า', 'เท่ากันทั้งสองตัว', 'ไม่สามารถเปรียบเทียบได้'],
        correctIndex: 0,
        explanationTh: 'ถูกต้อง! ไดร์เป่าผมมีวัตต์สูงถึง 1,800W จึงดึงไฟต่อวินาทีแรงกว่าแอร์มาก แต่เพราะเราใช้งานเพียง 5-10 นาที ยอดรวมหน่วยไฟจึงน้อยกว่าแอร์ที่เปิดทั้งคืน!'
      }
    ]
  },
  {
    id: 'path_appliances',
    titleTh: '2. รู้จักเครื่องใช้ไฟฟ้ากินไฟหนัก',
    titleEn: '2. Heavy Consumer Appliances',
    descTh: 'จัดลำดับแชมป์กินไฟในบ้าน และเคล็ดลับการใช้งานให้ประหยัดเกินครึ่ง',
    icon: 'Flame',
    lessons: [
      {
        id: 'les_3',
        pathId: 'path_appliances',
        titleTh: 'ทำไม "แอร์" ถึงเป็นแชมป์ค่าไฟประจำบ้าน?',
        titleEn: 'Why AC Dominates Your Electricity Bill',
        readTime: '3 นาที',
        xpReward: 50,
        contentTh: 'แอร์กินไฟสูงเพราะต้องใช้คอมเพรสเซอร์อัดสารทำความเย็นต้านทานความร้อนภายนอก ยิ่งแดดร้อนแอร์ยิ่งทำงานหนัก การปรับแอร์ขึ้นเพียง 1°C (จาก 24°C เป็น 25°C หรือ 26°C) จะช่วยลดภาระคอมเพรสเซอร์ได้ถึง 7-10% ต่อองศาเลยทีเดียว!',
        contentEn: 'AC compressors work hard against outside heat. Raising temp by 1°C reduces compressor load by 7-10%.',
        questionTh: 'การปรับเพิ่มอุณหภูมิแอร์ขึ้น 1°C ช่วยลดการใช้พลังงานได้ประมาณกี่เปอร์เซ็นต์?',
        optionsTh: ['1-2%', '7-10%', '20-25%', '50%'],
        correctIndex: 1,
        explanationTh: 'ยอดเยี่ยมครับ! ปรับขึ้นเพียง 1°C ช่วยเซฟไฟได้ถึง 7-10% ยิ่งถ้าเปิดพัดลมช่วยส่ายกระจายความเย็น จะสบายตัวเท่าเดิมแต่ประหยัดเงินขึ้นเยอะมาก!'
      }
    ]
  },
  {
    id: 'path_tariff',
    titleTh: '3. เข้าใจบิลและอัตราค่าไฟ',
    titleEn: '3. Understanding Tariff & Bills',
    descTh: 'เจาะลึกค่าไฟก้าวหน้า, ค่า Ft, ค่าบริการ และอัตรา TOU',
    icon: 'Receipt',
    lessons: [
      {
        id: 'les_4',
        pathId: 'path_tariff',
        titleTh: 'อัตราค่าไฟแบบก้าวหน้า ยิ่งใช้เยอะ ยิ่งแพงขึ้นได้อย่างไร?',
        titleEn: 'Progressive Tariff Rates',
        readTime: '3 นาที',
        xpReward: 50,
        contentTh: 'การไฟฟ้าคิดค่าไฟแบบอัตราก้าวหน้า (Progressive Rate) คือ 150 หน่วยแรกจะราคาถูกกว่าหน่วยที่ 151-400 และถ้าใช้เกิน 400 หน่วยขึ้นไป อัตราต่อหน่วยจะสูงถึง 4.4217 บาท! ดังนั้นการลดไฟช่วงหน่วยปลายๆ จะช่วยเซฟเงินได้เยอะที่สุด',
        contentEn: 'Residential rates increase in tiers. Units beyond 400 cost ฿4.4217/unit. Saving end-tier units delivers maximum monetary savings.',
        questionTh: 'หากบ้านคุณใช้ไฟเกิน 400 หน่วยไปแล้ว การลดไฟลงได้ 10 หน่วย จะเซฟเงินได้มากกว่าตอนใช้ไฟอยู่ในช่วง 100 หน่วยแรกหรือไม่?',
        optionsTh: ['เซฟเงินได้มากกว่าแน่นอน', 'เซฟเงินได้เท่ากันเป๊ะ', 'เซฟเงินได้น้อยกว่า', 'ไม่เกี่ยวกัน'],
        correctIndex: 0,
        explanationTh: 'ถูกต้องเลยครับ! เพราะหน่วยที่เกิน 400 มีราคาต่อหน่วยแพงที่สุด การประหยัดไฟในช่วงนี้จึงคุ้มค่าตัวเงินมากที่สุด!'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'ค่าไฟเดือนนี้เข้าใกล้งบประมาณแล้ว ⚠️',
    desc: 'ใช้ไฟไปแล้ว ฿2,188 จากงบ ฿2,500 (คิดเป็น 87%) แนะนำปรับแอร์ 26°C เพื่อประหยัดช่วงท้ายเดือน',
    priority: 'warning' as const,
    timestamp: '10 นาทีที่แล้ว',
    read: false,
    actionPage: 'budget' as const
  },
  {
    id: 'notif_2',
    title: 'ตรวจพบโหนดสแตนด์บายกลุ่มทีวีสว่างค้าง 🔌',
    desc: 'ปิดสวิตช์ปลั๊กพ่วงทีวีและชุดเกมคืนนี้ จะช่วยลดค่าไฟแฝงได้ประมาณ ฿45/เดือน',
    priority: 'info' as const,
    timestamp: '2 ชม. ที่แล้ว',
    read: false,
    actionPage: 'appliances' as const
  },
  {
    id: 'notif_3',
    title: 'ยินดีด้วย! คุณปลดล็อกเหรียญตรา 3-Day Streak 🏆',
    desc: 'รับ +50 XP และ +20 Energy Coins จากการเช็คอินต่อเนื่อง 3 วัน',
    priority: 'info' as const,
    timestamp: '1 วันที่แล้ว',
    read: true,
    actionPage: 'achievements' as const
  }
];

