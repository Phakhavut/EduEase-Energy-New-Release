import { MiniGameMeta, WeeklySpecialEvent, GameHistoryRecord } from '../types';

export const WEEKLY_SPECIAL_EVENT: WeeklySpecialEvent = {
  id: 'evt_summer_2026',
  titleTh: 'เทศกาลสู้ศึกฤดูร้อน (Summer Energy Event)',
  titleEn: 'Summer Energy Challenge Week',
  subtitleTh: 'รับคูณ 2.0x XP & โบนัส 100 Coins จากการเล่นมินิเกมแอร์และค่าไฟ',
  subtitleEn: 'Earn 2.0x XP & 100 Bonus Coins on all AC and cooling games!',
  theme: 'summer',
  descriptionTh: 'ช่วงหน้าร้อนความต้องการไฟฟ้าพุ่งสูง มาพิชิตมินิเกมเกี่ยวกับแอร์และการบริหาร Peak Load เพื่อรับตราประทับพิเศษ!',
  multiplierXp: 2.0,
  bonusCoins: 100,
  endsInDays: 3,
  icon: 'Sun',
  active: true
};

export const MINI_GAME_LIST: MiniGameMeta[] = [
  {
    id: 'game_battle',
    type: 'power_battle',
    category: 'appliances',
    titleTh: '⚔️ ประลองกำลังไฟ (Power Battle)',
    titleEn: 'Power Battle (Higher / Lower)',
    descTh: 'ทายว่าเครื่องใช้ไฟฟ้าตัวไหนกินไฟ (วัตต์) สูงกว่ากัน สะสมคอมโบรับโบนัส',
    descEn: 'Guess which appliance pulls higher wattage. Build streaks for rewards!',
    difficulty: 'Easy',
    estimatedMinutes: 2,
    learningObjectiveTh: 'จดจำระดับวัตต์กำลังไฟฟ้าของเครื่องใช้ไฟฟ้าแต่ละประเภทในชีวิตประจำวัน',
    learningObjectiveEn: 'Memorize average wattage ratings of common household devices',
    xpReward: 50,
    coinReward: 20,
    knowledgeGainedTh: 'การเรียงลำดับเครื่องใช้ไฟฟ้าตามกำลังกินไฟจริง',
    completionRate: 92,
    bestScore: 8,
    icon: 'Zap'
  },
  {
    id: 'game_vampire',
    type: 'vampire_buster',
    category: 'basics',
    titleTh: '🧄 ปราบไฟแฝงยามค่ำคืน (Standby Buster)',
    titleEn: 'Standby Power Buster',
    descTh: 'สวมบทนักล่า ค้นหาและปิดสวิตช์อุปกรณ์ที่แอบดึงไฟ Standby ในห้องนอน',
    descEn: 'Tap and eliminate vampire standby loads in a virtual bedroom scene.',
    difficulty: 'Easy',
    estimatedMinutes: 2,
    learningObjectiveTh: 'ตระหนักถึงการสูญเสียพลังงานจาก Standby Power และปลั๊กพ่วงที่เสียบค้างไว้',
    learningObjectiveEn: 'Understand phantom energy draw from plugged-in idle devices',
    xpReward: 60,
    coinReward: 25,
    knowledgeGainedTh: 'ตัดไฟแฝงประหยัดเงินได้สูงสุด 5-10% ของบิลค่าไฟ',
    completionRate: 88,
    bestScore: 100,
    icon: 'Power'
  },
  {
    id: 'game_bill_builder',
    type: 'bill_builder',
    category: 'bills',
    titleTh: '🧩 สร้างบิลค่าไฟด้วยตนเอง (Bill Builder)',
    titleEn: 'Interactive Bill Builder',
    descTh: 'จัดชุดเครื่องใช้ไฟฟ้า คำนวณหน่วย kWh + ค่า Ft + VAT เพื่อทายยอดบิลจริง',
    descEn: 'Combine appliances, runtime, Ft rate & VAT to calculate accurate total bill.',
    difficulty: 'Medium',
    estimatedMinutes: 3,
    learningObjectiveTh: 'เข้าใจสูตรการคิดค่าไฟฟ้าขั้นบันไดและองค์ประกอบต่างๆ ในใบแจ้งหนี้การไฟฟ้า',
    learningObjectiveEn: 'Master step-by-step progressive tariff formula and bill components',
    xpReward: 100,
    coinReward: 40,
    knowledgeGainedTh: 'สูตรคำนวณ (W × ชม.) ÷ 1,000 = kWh และค่า Ft + VAT 7%',
    completionRate: 75,
    bestScore: 95,
    icon: 'Receipt'
  },
  {
    id: 'game_ai_detective',
    type: 'ai_detective',
    category: 'ai_challenges',
    titleTh: '🕵️ ดวลคำนวนพยากรณ์กับ AI (AI Challenge)',
    titleEn: 'AI Prediction Battle',
    descTh: 'แข่งทายค่าไฟและอุณหภูมิแอร์กับระบบ AI Voltie เพื่อดูว่าใครจะแม่นยำกว่า',
    descEn: 'Compete against AI Voltie in predicting tomorrow bill spikes and AC loads.',
    difficulty: 'Medium',
    estimatedMinutes: 3,
    learningObjectiveTh: 'เรียนรู้ปัจจัยภายนอกที่มีผลต่อค่าไฟ เช่น อุณหภูมิภายนอก และพฤติกรรม Peak',
    learningObjectiveEn: 'Understand external factors influencing energy demand spikes',
    xpReward: 120,
    coinReward: 50,
    knowledgeGainedTh: 'วิเคราะห์การทำความเย็นของแอร์ตามอุณหภูมิอากาศภายนอก',
    completionRate: 70,
    bestScore: 90,
    icon: 'Sparkles'
  },
  {
    id: 'game_story_dorm',
    type: 'story_scenario',
    category: 'budget',
    titleTh: '📖 หอพักจำกัดงบ (Dorm Budget Survival)',
    titleEn: 'Dorm Budget Survival Story',
    descTh: 'สถานการณ์จำลอง: เงินงบค่าไฟเหลือ 500 บาท แต่ต้องผ่าน 10 วันสุดท้ายของเดือน!',
    descEn: 'Interactive story: Survive the last 10 days of the month with only ฿500 budget!',
    difficulty: 'Medium',
    estimatedMinutes: 4,
    learningObjectiveTh: 'ฝึกการตัดสินใจเลือกลดการใช้ไฟฟ้าในจุดที่ให้ผลประหยัดเงินสูงสุดทันที',
    learningObjectiveEn: 'Practice decision-making under tight financial constraints',
    xpReward: 150,
    coinReward: 60,
    knowledgeGainedTh: 'การปรับเปลี่ยนพฤติกรรมระยะสั้นเพื่อควบคุมงบประมาณค่าไฟ',
    completionRate: 65,
    bestScore: 100,
    icon: 'BookOpen'
  },
  {
    id: 'game_mini_lab',
    type: 'mini_lab',
    category: 'smarthome',
    titleTh: '🔬 ห้องทดลององศาแอร์ (AC Temp Mini Lab)',
    titleEn: 'AC Temperature Mini Lab',
    descTh: 'ปรับสไลเดอร์องศาแอร์ + พัดลม ดูผลกระทบต่อค่าไฟ, ความสบาย และคาร์บอน CO₂',
    descEn: 'Simulate AC temp tweaks to observe direct impact on cost, comfort and CO₂.',
    difficulty: 'Easy',
    estimatedMinutes: 2,
    learningObjectiveTh: 'เห็นภาพความสัมพันธ์ระหว่างอุณหภูมิแอร์ การกินไฟ และความสบายในห้อง',
    learningObjectiveEn: 'Visualize relationship between AC setpoint, power draw, and thermal comfort',
    xpReward: 80,
    coinReward: 30,
    knowledgeGainedTh: 'ปรับแอร์ขึ้น 1°C ช่วยประหยัดค่าไฟได้ประมาณ 8-10%',
    completionRate: 94,
    bestScore: 100,
    icon: 'FlaskConical'
  },
  {
    id: 'game_detective_house',
    type: 'detective_house',
    category: 'safety',
    titleTh: '🔍 นักสืบตรวจบ้านประหยัดไฟ (House Energy Inspector)',
    titleEn: 'Virtual House Energy Inspector',
    descTh: 'สำรวจห้องต่างๆ ในบ้านเสมือนจริง เพื่อค้นหารอบการรั่วไหลและการใช้งานผิดวิธี',
    descEn: 'Inspect a virtual home to find energy leaks, dusty filters and safety hazards.',
    difficulty: 'Medium',
    estimatedMinutes: 3,
    learningObjectiveTh: 'ระบุจุดรั่วไหลของความเย็นและการบำรุงรักษาเครื่องใช้ไฟฟ้าเพื่อยืดอายุการใช้งาน',
    learningObjectiveEn: 'Identify thermal leaks and maintenance needs across home spaces',
    xpReward: 110,
    coinReward: 45,
    knowledgeGainedTh: 'การล้างฟิลเตอร์แอร์ช่วยคืนประสิทธิภาพการทำความเย็นได้ 15%',
    completionRate: 80,
    bestScore: 100,
    icon: 'Search'
  },
  {
    id: 'game_boss_challenge',
    type: 'boss_challenge',
    category: 'daily',
    titleTh: '👑 บอสใหญ่: กู้ภัยค่าไฟบ้านครอบครัว (Boss Challenge)',
    titleEn: 'Boss Challenge: Family Bill Rescue',
    descTh: 'ภารกิจลดค่าไฟบ้านครอบครัวลง 20% โดยที่ทุกคนยังอยู่อย่างสบายและสุขกาย',
    descEn: 'Reduce a family ฿4,500 bill by 20% while maintaining target comfort level.',
    difficulty: 'Boss',
    estimatedMinutes: 5,
    learningObjectiveTh: 'ผสมผสานความรู้ทุกบทเรียนในการวางแผนและบริหารจัดการพลังงานแบบครบวงจร',
    learningObjectiveEn: 'Apply holistic energy management strategy to solve complex scenarios',
    xpReward: 300,
    coinReward: 150,
    knowledgeGainedTh: 'การวางกลยุทธ์พลังงานรวม: ย้ายเวลา TOU + ปรับแอร์ + ตัดไฟแฝง',
    completionRate: 45,
    bestScore: 85,
    icon: 'Trophy',
    badgeRewardId: 'badge_energy_master'
  },
  {
    id: 'game_daily_60s',
    type: 'daily_60s',
    category: 'time_attack',
    titleTh: '⏱️ ชาเลนจ์ 60 วิ ประจำวัน (Daily 60s Speed Run)',
    titleEn: 'Daily 60s Speed Challenge',
    descTh: 'ตอบคำถามรวดเร็ว 5 ข้อภายใน 60 วินาที เพื่อรักษาสตรีคและรับเหรียญรางวัลพิเศษ',
    descEn: 'Answer 5 rapid-fire electricity questions in 60 seconds to maintain streak!',
    difficulty: 'Easy',
    estimatedMinutes: 1,
    learningObjectiveTh: 'ทบทวนความรู้ไฟฟ้าพื้นฐานและความเข้าใจในพฤติกรรมการออมไฟอย่างสม่ำเสมอ',
    learningObjectiveEn: 'Reinforce essential power saving facts through daily quick practice',
    xpReward: 70,
    coinReward: 35,
    knowledgeGainedTh: 'การคิดวิเคราะห์เรื่องพลังงานอย่างแม่นยำและรวดเร็ว',
    completionRate: 90,
    bestScore: 100,
    icon: 'Clock'
  }
];

export const INITIAL_GAME_HISTORY: GameHistoryRecord[] = [
  {
    id: 'gh_1',
    gameId: 'game_battle',
    gameTitleTh: '⚔️ ประลองกำลังไฟ (Power Battle)',
    playedAt: '2026-08-06 14:30',
    score: 8,
    maxScore: 10,
    knowledgeGainedTh: 'เข้าใจว่าเตารีดและเครื่องทำน้ำอุ่นกินวัตต์สูงกว่าทีวีและพัดลมหลายเท่า',
    xpEarned: 50,
    coinsEarned: 20,
    weakTopicsTh: ['กำลังไฟของตู้เย็น Inverter'],
    recommendationTh: 'ทบทวนบทเรียนเรื่อง วัตต์ (W) และเปรียบเทียบใน Compare Lab'
  },
  {
    id: 'game_2',
    gameId: 'game_vampire',
    gameTitleTh: '🧄 ปราบไฟแฝงยามค่ำคืน (Standby Buster)',
    playedAt: '2026-08-07 09:15',
    score: 100,
    maxScore: 100,
    knowledgeGainedTh: 'การปิดสวิตช์ปลั๊กพ่วงทีวีช่วยประหยัดไฟแฝงได้ปีละหลายร้อยบาท',
    xpEarned: 60,
    coinsEarned: 25,
    weakTopicsTh: [],
    recommendationTh: 'เยี่ยมมาก! คุณมีความแม่นยำในการตรวจหา Standby Power ระดับมือโปร'
  }
];

// Sample questions pool for Daily 60s Challenge
export const DAILY_60S_QUIZ_POOL = [
  {
    questionTh: 'เปิดพัดลม 50W นาน 10 ชั่วโมง คิดเป็นกี่หน่วยไฟฟ้า (kWh)?',
    optionsTh: ['0.5 kWh', '5 kWh', '50 kWh', '1 kWh'],
    correctIndex: 0,
    explanationTh: 'สูตร: (50W × 10 ชม.) ÷ 1,000 = 0.5 kWh (หน่วย)'
  },
  {
    questionTh: 'ช่วงเวลา Off-Peak ของอัตราค่าไฟ TOU มีราคาหน่วยละประมาณกี่บาท?',
    optionsTh: ['ประมาณ 2.6 บาท/หน่วย', 'ประมาณ 4.3 บาท/หน่วย', 'ประมาณ 8.0 บาท/หน่วย', 'ฟรีไม่มีค่าใช้จ่าย'],
    correctIndex: 0,
    explanationTh: 'Off-Peak ในวันจันทร์-ศุกร์ (22:00-09:00) และวันเสาร์-อาทิตย์ทั้งวัน มีราคาถูกกว่า On-Peak เกือบเท่าตัว'
  },
  {
    questionTh: 'การปรับอุณหภูมิแอร์ขึ้น 1 องศาเซลเซียส ช่วยประหยัดค่าไฟแอร์ได้ประมาณกี่เปอร์เซ็นต์?',
    optionsTh: ['ประหยัดได้ ~8%', 'ประหยัดได้ ~1%', 'ประหยัดได้ ~30%', 'ไม่ช่วยประหยัดเลย'],
    correctIndex: 0,
    explanationTh: 'การปรับแอร์จาก 24°C เป็น 25°C หรือ 26°C ช่วยลดภาระคอมเพรสเซอร์ลงได้ ~8-10%'
  },
  {
    questionTh: 'อุปกรณ์ชนิดใดมีพฤติกรรมกินไฟแฝง (Standby Power) สูงเมื่อเสียบปลั๊กทิ้งไว้?',
    optionsTh: ['กล่องทีวีดิจิทัล & เครื่องเสียง', 'หลอดไฟ LED', 'พัดลมตั้งพื้นแบบหมุนมือ', 'เตาแก๊ส'],
    correctIndex: 0,
    explanationTh: 'กล่องดิจิทัลและแอมพลิฟายเออร์มีวงจรรอรับสัญญาณรีโมทตลอดเวลา จึงดึงไฟ 5-15W ตลอด 24 ชม.'
  },
  {
    questionTh: 'ภาษีมูลค่าเพิ่ม (VAT) ในใบแจ้งหนี้การไฟฟ้าคิดเป็นกี่เปอร์เซ็นต์?',
    optionsTh: ['7%', '10%', '5%', '15%'],
    correctIndex: 0,
    explanationTh: 'VAT 7% คิดจากยอดรวม (ค่าไฟฐาน + ค่า Ft + ค่าบริการรายเดือน)'
  }
];

// Bill Builder Appliances
export const BILL_BUILDER_ITEMS = [
  { id: 'ac', nameTh: 'แอร์ Inverter 12,000 BTU', watt: 1000, defaultHours: 8, icon: '❄️' },
  { id: 'fridge', nameTh: 'ตู้เย็น 2 ประตู', watt: 120, defaultHours: 24, icon: '🧊' },
  { id: 'tv', nameTh: 'สมาร์ททีวี 55 นิ้ว', watt: 110, defaultHours: 4, icon: '📺' },
  { id: 'pc', nameTh: 'คอมพิวเตอร์ Desktop', watt: 350, defaultHours: 6, icon: '🖥️' },
  { id: 'fan', nameTh: 'พัดลมตั้งโต๊ะ 16 นิ้ว', watt: 45, defaultHours: 10, icon: '🌀' },
  { id: 'heater', nameTh: 'เครื่องทำน้ำอุ่น', watt: 3500, defaultHours: 0.5, icon: '🔥' }
];

// Story Scenario choices for Dorm Budget Survival
export const DORM_STORY_SCENARIOS = [
  {
    id: 's1',
    situationTh: 'วันที่ 21: อากาศร้อนมากถึง 38°C แต่งบค่าไฟเหลือเพียง 450 บาท คุณจะเปิดแอร์อย่างไร?',
    choices: [
      {
        textTh: 'เปิดแอร์ 26°C ร่วมกับพัดลมส่าย และตั้งเวลาปิดตอนตี 3',
        costImpactThb: 120,
        comfortImpact: 'ดีเยี่ยม',
        correct: true,
        feedbackTh: 'ฉลาดมาก! การใช้พัดลมช่วยกระจายลมเย็นทำให้รู้สึกเหมือน 24°C แต่ประหยัดเงินได้ 180 บาท'
      },
      {
        textTh: 'เปิดแอร์ 20°C ฉ่ำๆ ทั้งคืน 10 ชั่วโมง',
        costImpactThb: 380,
        comfortImpact: 'หนาวมาก',
        correct: false,
        feedbackTh: 'งบค่าไฟเกือบหมดตั้งแต่วันแรก! การเปิด 20°C ทำให้คอมเพรสเซอร์ทำงานหนักตลอดเวลา'
      }
    ]
  },
  {
    id: 's2',
    situationTh: 'วันที่ 25: คุณมีงานรายงานที่ต้องส่ง และต้องเปิดคอมพิวเตอร์ทิ้งไว้ตลอดคืน',
    choices: [
      {
        textTh: 'ปรับโหมด Power Saver บนคอมพิวเตอร์ และถอดปลั๊กพ่วงทีวีออก',
        costImpactThb: 35,
        comfortImpact: 'ปกติ',
        correct: true,
        feedbackTh: 'ถูกต้อง! การปิดอุปกรณ์แฝงและปรับสเปกคอมพิวเตอร์ช่วยเซฟเงินไปได้อีก 60 บาท'
      },
      {
        textTh: 'เปิดคอมพิวเตอร์ทิ้งไว้พร้อมเสียบชาร์จมือถือและเปิดไฟทุกดวงในห้อง',
        costImpactThb: 110,
        comfortImpact: 'สว่างมาก',
        correct: false,
        feedbackTh: 'ไฟสว่างเกินจำเป็นและอุปกรณ์สแตนด์บายดึงงบค่าไฟที่เหลือจนเสี่ยงเกินงบ'
      }
    ]
  }
];
