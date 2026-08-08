import { 
  EduVerseWorldStage, 
  EduVerseDistrictType, 
  EduVerseBuilding, 
  EnergySpirit, 
  EduVerseNPCQuest, 
  EduVerseSecretArea, 
  EduVerseFestival 
} from '../types';

export const EDUVERSE_WORLD_STAGES: {
  stage: EduVerseWorldStage;
  nameTh: string;
  nameEn: string;
  icon: string;
  minXp: number;
  maxXp: number;
  unlockedDistrictsTh: string[];
  descriptionTh: string;
}[] = [
  {
    stage: 'tiny_island',
    nameTh: 'Stage 1: เกาะจิ๋วแห่งจุดเริ่มต้น (Tiny Island)',
    nameEn: 'Stage 1: Tiny Island',
    icon: '🏝️',
    minXp: 0,
    maxXp: 200,
    unlockedDistrictsTh: ['Forest (เรียนรู้พื้นฐาน)', 'Residential (บ้านออมไฟ)'],
    descriptionTh: 'เกาะเล็กๆ กลางมหาสมุทร มีเพียง World Tree สองสามใบ และกระท่อมแรกเริ่ม'
  },
  {
    stage: 'green_garden',
    nameTh: 'Stage 2: สวนธรรมชาติสีเขียว (Green Garden)',
    nameEn: 'Stage 2: Green Garden',
    icon: '🌱🏡',
    minXp: 200,
    maxXp: 500,
    unlockedDistrictsTh: ['Renewable Zone (โซลาร์มินิ)', 'Water Zone (ลำธารใส)'],
    descriptionTh: 'แผ่นดินขยายกว้างขวาง เกิดสวนดอกไม้อเมทิสต์ ลำธาร และระหัดวอเตอร์วีล'
  },
  {
    stage: 'energy_forest',
    nameTh: 'Stage 3: ผืนป่าพฤกษาพลังงาน (Energy Forest)',
    nameEn: 'Stage 3: Energy Forest',
    icon: '🌲🏛️',
    minXp: 500,
    maxXp: 900,
    unlockedDistrictsTh: ['Research Center (ห้องแล็บ AI)', 'Adventure Zone (ลานกิจกรรม)'],
    descriptionTh: 'ป่าพฤกษาอุดมสมบูรณ์ เกิดสถาบันการเรียนรู้ Academy และศูนย์วิจัย Voltie AI'
  },
  {
    stage: 'eco_village',
    nameTh: 'Stage 4: หมู่บ้านนิเวศยั่งยืน (Eco Village)',
    nameEn: 'Stage 4: Eco Village',
    icon: '🌾🏡',
    minXp: 900,
    maxXp: 1400,
    unlockedDistrictsTh: ['Business Zone (ย่านธุรกิจ)', 'Power Station (สถานีไฟฟ้า)'],
    descriptionTh: 'ชุมชนเติบโต มีถนนเชื่อมต่อ ร้านค้า และระบบแลกเปลี่ยนไฟฟ้า Microgrid'
  },
  {
    stage: 'smart_green_city',
    nameTh: 'Stage 5: มหานครเขียวอัจฉริยะ (Smart Green City)',
    nameEn: 'Stage 5: Smart Green City',
    icon: '🏙️⚡',
    minXp: 1400,
    maxXp: 2000,
    unlockedDistrictsTh: ['Hall of Fame (หอเกียรติยศ)', 'Secret Areas (พื้นที่ลึกลับ)'],
    descriptionTh: 'เมืองแห่งอนาคต รถไฟฟ้า ตึกสูงประหยัดพลังงาน และแผงโซลาร์ครอบคลุม'
  },
  {
    stage: 'future_civilization',
    nameTh: 'Stage 6: อารยธรรมยั่งยืนอนาคต (Future Civilization)',
    nameEn: 'Stage 6: Future Sustainable Civilization',
    icon: '🪐✨',
    minXp: 2000,
    maxXp: 5000,
    unlockedDistrictsTh: ['ปลดล็อกครบทุกเขต + คริสตัลไร้คาร์บอน'],
    descriptionTh: 'อารยธรรมระดับสูงสุดที่ใช้พลังงานหมุนเวียน 100% ไร้คาร์บอนสมบูรณ์แบบ'
  }
];

export const EDUVERSE_DISTRICTS: {
  id: EduVerseDistrictType;
  nameTh: string;
  nameEn: string;
  icon: string;
  descriptionTh: string;
  colorTheme: string;
}[] = [
  {
    id: 'forest',
    nameTh: '🌳 เขตพฤกษา & การเรียนรู้ (Forest District)',
    nameEn: 'Forest District',
    icon: '🌳',
    descriptionTh: 'ศูนย์กลางด้านความรู้ไฟฟ้า ทฤษฎี Skill Tree และ World Tree',
    colorTheme: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    id: 'residential',
    nameTh: '🏡 เขตที่อยู่อาศัย (Residential Area)',
    nameEn: 'Residential Area',
    icon: '🏡',
    descriptionTh: 'การจัดการไฟฟ้าในบ้าน เครื่องใช้ไฟฟ้าเบอร์ 5 และพฤติกรรมออมไฟ',
    colorTheme: 'from-amber-500/20 to-orange-500/20'
  },
  {
    id: 'business',
    nameTh: '🏢 เขตธุรกิจ & การพาณิชย์ (Business Zone)',
    nameEn: 'Business Zone',
    icon: '🏢',
    descriptionTh: 'การบริหารไฟในอาคาร สำนักงาน ร้านค้า และอัตราค่าไฟ TOU Peak/Off-Peak',
    colorTheme: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    id: 'renewable',
    nameTh: '☀️ เขตพลังงานสะอาด (Renewable Zone)',
    nameEn: 'Renewable Energy Zone',
    icon: '☀️',
    descriptionTh: 'แผงโซลาร์เซลล์ กังหันลม และแบตเตอรี่กักเก็บพลังงาน Battery Storage',
    colorTheme: 'from-yellow-500/20 to-amber-500/20'
  },
  {
    id: 'power_station',
    nameTh: '⚡ เขตระบบไฟ & สายส่ง (Power Station)',
    nameEn: 'Power Station',
    icon: '⚡',
    descriptionTh: 'การกำเนิดไฟฟ้า ระบบสายส่ง หม้อแปลง ความปลอดภัย และการคิดบิลค่าไฟ',
    colorTheme: 'from-purple-500/20 to-violet-500/20'
  },
  {
    id: 'water_zone',
    nameTh: '💧 เขตชลประทาน & พลังน้ำ (Water Zone)',
    nameEn: 'Water Zone',
    icon: '💧',
    descriptionTh: 'ระหัดวอเตอร์วีล เครื่องทำน้ำอุ่น ปั๊มน้ำอินเวอร์เตอร์ และถังดักน้ำฝน',
    colorTheme: 'from-cyan-500/20 to-sky-500/20'
  },
  {
    id: 'research',
    nameTh: '🔬 ศูนย์วิจัย & ปัญญาประดิษฐ์ (Research Center)',
    nameEn: 'Research Center',
    icon: '🔬',
    descriptionTh: 'ห้องวิจัย Voltie AI, บอร์ด ESP32, การทำนายค่าไฟล่วงหน้า และ Analytics',
    colorTheme: 'from-indigo-500/20 to-purple-500/20'
  },
  {
    id: 'adventure',
    nameTh: '🎮 เขตการผจญภัย & มินิเกม (Adventure Area)',
    nameEn: 'Adventure Area',
    icon: '🎮',
    descriptionTh: 'ลานประลองมินิเกม ภารกิจท้าทาย และกิจกรรมพิเศษประจำซีซัน',
    colorTheme: 'from-pink-500/20 to-rose-500/20'
  },
  {
    id: 'hall_of_fame',
    nameTh: '🏆 หอเกียรติยศ & ความสำเร็จ (Hall of Fame)',
    nameEn: 'Hall of Achievement',
    icon: '🏆',
    descriptionTh: 'รวบรวมเข็มกลัดเกียรติยศ ประกาศนียบัตร สถิติประวัติศาสตร์ และลีดเดอร์บอร์ด',
    colorTheme: 'from-yellow-400/20 to-amber-600/20'
  }
];

export const INITIAL_EDUVERSE_BUILDINGS: EduVerseBuilding[] = [
  {
    id: 'bld_library',
    nameTh: 'หอสมุดไฟฟ้าปัญญา (Electricity Library)',
    nameEn: 'Electricity Library',
    district: 'forest',
    icon: '📚',
    purposeTh: 'ศูนย์คลังความรู้ ค้นหาคำศัพท์ และบทเรียน Skill Tree',
    unlocked: true,
    unlockedByTh: 'ผ่านบทเรียนแรก Electricity Basics',
    educationalTipTh: 'การอ่านบทเรียน 5 นาทีต่อวัน เพิ่ม Saving Score ได้อย่างมีนัยสำคัญ',
    level: 3,
    maxLevel: 5,
    statsEffectTh: '+15% XP จากการเรียนรู้'
  },
  {
    id: 'bld_lab',
    nameTh: 'ห้องแล็บวิจัย Voltie AI (AI Research Lab)',
    nameEn: 'Voltie AI Lab',
    district: 'research',
    icon: '🧪',
    purposeTh: 'วิเคราะห์พฤติกรรมการใช้ไฟด้วย AI และพยากรณ์ค่าไฟล่วงหน้า',
    unlocked: true,
    unlockedByTh: 'ใช้งาน Voltie AI Coach',
    educationalTipTh: 'AI สามารถจับสัญญาณไฟแฝง (Standby Power) ได้แม่นยำถึง 95%',
    level: 2,
    maxLevel: 5,
    statsEffectTh: 'แจ้งเตือนไฟรั่ว/ไฟผิดปกติทันที'
  },
  {
    id: 'bld_power_plant',
    nameTh: 'สถานีควบคุมค่าไฟ & TOU (TOU Power Station)',
    nameEn: 'TOU Power Control Center',
    district: 'power_station',
    icon: '🏢⚡',
    purposeTh: 'คำนวณสูตรค่าไฟ การไฟฟ้า MEA/PEA, ค่า Ft และมิเตอร์ TOU',
    unlocked: true,
    unlockedByTh: 'เรียนรู้เรื่องโครงสร้างบิลค่าไฟ',
    educationalTipTh: 'ช่วง Off-Peak 22.00 - 09.00 น. ค่าไฟหน่วยละ ~2.6 บาท ถูกกว่า Peak เกือบครึ่ง!',
    level: 2,
    maxLevel: 5,
    statsEffectTh: 'ปลดล็อกเครื่องคำนวณ TOU อัจฉริยะ'
  },
  {
    id: 'bld_solar_farm',
    nameTh: 'ฟาร์มโซลาร์เซลล์ตามตะวัน (Solar Farm)',
    nameEn: 'Solar Tracking Farm',
    district: 'renewable',
    icon: '☀️🌾',
    purposeTh: 'ผลิตไฟฟ้าสะอาด และสอนหลักการติดตั้ง Solar Rooftop',
    unlocked: true,
    unlockedByTh: 'ปลดล็อกกิ่ง Solar Energy',
    educationalTipTh: 'โซลาร์เซลล์ระบบ Hybrid ร่วมกับแบตเตอรี่ ช่วยให้มีไฟสำรองยามไฟดับ',
    nextUpgradeTh: 'อัปเกรดเป็น Solar Floating ทุ่นลอยน้ำ',
    level: 3,
    maxLevel: 5,
    statsEffectTh: 'สร้างไฟสะอาด +500 Watts ในโลก EduVerse'
  },
  {
    id: 'bld_workshop',
    nameTh: 'โรงประดิษฐ์เทียบเครื่องใช้ไฟ (Appliance Workshop)',
    nameEn: 'Appliance Compare Workshop',
    district: 'residential',
    icon: '🛠️',
    purposeTh: 'เปรียบเทียบการกินไฟของแอร์ ตู้เย็น พัดลม และหลอดไฟ',
    unlocked: true,
    unlockedByTh: 'ใช้งาน Appliance Compare Lab',
    educationalTipTh: 'แอร์เบอร์ 5 3 ดาว ประหยัดค่าไฟกว่าแอร์ไม่มีดาวได้ปีละหลายพันบาท',
    level: 2,
    maxLevel: 5,
    statsEffectTh: 'ปลดล็อกตารางคำนวณวัตต์ละเอียด'
  },
  {
    id: 'bld_academy',
    nameTh: 'สถาบันพลังงานยั่งยืน (Energy Academy)',
    nameEn: 'Sustainable Energy Academy',
    district: 'forest',
    icon: '🏫',
    purposeTh: 'เส้นทางการเรียนรู้ Learning Paths และรับใบประกาศนียบัตร',
    unlocked: true,
    unlockedByTh: 'เรียนจบ 3 เส้นทางการเรียนรู้',
    educationalTipTh: 'การได้รับเกียรติบัตรช่วยยืนยันความเชี่ยวชาญด้านพลังงานของคุณ',
    level: 1,
    maxLevel: 5,
    statsEffectTh: 'รับ Coin เพิ่ม +20% เมื่อสอบผ่าน Quiz'
  },
  {
    id: 'bld_museum',
    nameTh: 'พิพิธภัณฑ์ประวัติศาสตร์ไฟฟ้า (Electricity Museum)',
    nameEn: 'Electricity History Museum',
    district: 'hall_of_fame',
    icon: '🏛️',
    purposeTh: 'รวบรวมเกร็ดประวัติศาสตร์ โทมัส เอดิสัน, นิโคลา เทสลา และการไฟฟ้าไทย',
    unlocked: true,
    unlockedByTh: 'สะสมความทรงจำครบ 5 ความทรงจำ',
    educationalTipTh: 'กระแสไฟฟ้าสลับ (AC) ของเทสลา ช่วยส่งไฟฟ้าไปได้ไกลนับร้อยกิโลเมตร',
    level: 1,
    maxLevel: 5,
    statsEffectTh: 'ปลดล็อกของสะสมระดับตำนาน'
  },
  {
    id: 'bld_home',
    nameTh: 'บ้านอัจฉริยะคาร์บอนต่ำ (Zero Carbon Eco Home)',
    nameEn: 'Zero Carbon Eco Home',
    district: 'residential',
    icon: '🏡✨',
    purposeTh: 'ศูนย์กลางโปรไฟล์และตรวจสอบพฤติกรรมออมไฟในบ้าน',
    unlocked: true,
    unlockedByTh: 'เริ่มต้นใช้งาน',
    educationalTipTh: 'การเปิดหน้าต่างรับลมธรรมชาติช่วงเช้า ช่วยลดการเปิดพัดลม/แอร์',
    level: 3,
    maxLevel: 5,
    statsEffectTh: 'ฟื้นฟูอารมณ์ระบบนิเวศ +10% ทุกวัน'
  }
];

export const INITIAL_ENERGY_SPIRITS: EnergySpirit[] = [
  {
    id: 'spirit_volt',
    nameTh: 'โวลต์ (Volt) - ภูตแรงดันไฟฟ้า',
    nameEn: 'Volt - Pressure Spirit',
    conceptTh: 'แรงดันไฟฟ้า (Volt) เปรียบเหมือนแรงดันน้ำที่ผลักดันกระแสไฟให้เคลื่อนที่',
    spiritIcon: '⚡',
    element: 'volt',
    level: 3,
    maxLevel: 5,
    unlocked: true,
    unlockedByTh: 'เรียนรู้เรื่องโวลต์และความปลอดภัย',
    teachingTipTh: 'โวลต์ในบ้านไทยคือ 220V! หากแรงดันตก เครื่องใช้ไฟฟ้าอาจทำงานหนักและร้อนขึ้น',
    powerBonusTh: 'เพิ่มพลังงานออร่าให้ World Tree +10%'
  },
  {
    id: 'spirit_spark',
    nameTh: 'สปาร์ก (Spark) - ภูตประกายไฟปัญญา',
    nameEn: 'Spark - Wisdom Spirit',
    conceptTh: 'ประกายไฟแห่งความคิดสร้างสรรค์ ช่วยจุดประกายการประหยัดไฟ',
    spiritIcon: '🔥✨',
    element: 'spark',
    level: 2,
    maxLevel: 5,
    unlocked: true,
    unlockedByTh: 'ทำแบบทดสอบ Quiz ได้คะแนนเต็ม 100%',
    teachingTipTh: 'ประกายไฟสปาร์กเกิดจากการสวิตช์หน้าสัมผัสปลั๊กไฟ ควรเสียบปลั๊กให้แน่นเสมอเพื่อป้องกันไฟไหม้!',
    powerBonusTh: 'รับ Coin สองเท่าเมื่อทำภารกิจรายวัน'
  },
  {
    id: 'spirit_leafy',
    nameTh: 'ลีฟฟี่ (Leafy) - ภูตใบไม้ออมไฟ',
    nameEn: 'Leafy - Eco Saving Spirit',
    conceptTh: 'ตัวแทนแห่งธรรมชาติ ความเย็นสบาย และการลดคาร์บอนรอยเท้า (Carbon Footprint)',
    spiritIcon: '🍃',
    element: 'leafy',
    level: 4,
    maxLevel: 5,
    unlocked: true,
    unlockedByTh: 'รักษาสถิติ streak เกิน 7 วัน',
    teachingTipTh: 'การปลูกต้นไม้รอบบ้านช่วยซับความร้อน ทำให้แอร์กินไฟน้อยลง 15%!',
    powerBonusTh: 'เร่งการบานของดอกไม้อเมทิสต์ใน EduVerse'
  },
  {
    id: 'spirit_current',
    nameTh: 'เคอร์เรนต์ (Current) - ภูตกระแสไฟเคลื่อนที่',
    nameEn: 'Current - Flow Spirit',
    conceptTh: 'กระแสไฟฟ้า (Ampere) คือปริมาณอิเล็กตรอนที่ไหลผ่านสายไฟในหนึ่งวินาที',
    spiritIcon: '🌊⚡',
    element: 'current',
    level: 2,
    maxLevel: 5,
    unlocked: true,
    unlockedByTh: 'เชื่อมต่อ ESP32 PZEM Sensor',
    teachingTipTh: 'กระแสไฟเกิน (Overcurrent) จะทำให้เบรกเกอร์ตัดวงจรเพื่อความปลอดภัย!',
    powerBonusTh: 'รับข้อมูลกระแสไฟสดเรียลไทม์'
  },
  {
    id: 'spirit_charge',
    nameTh: 'ชาร์จ (Charge) - ภูตแบตเตอรี่สำรอง',
    nameEn: 'Charge - Storage Spirit',
    conceptTh: 'กักเก็บพลังงานสะอาดไว้ใช้ในยามที่แดดหมด หรือช่วง Peak Rates',
    spiritIcon: '🔋',
    element: 'charge',
    level: 3,
    maxLevel: 5,
    unlocked: true,
    unlockedByTh: 'ผ่านซีซันโซลาร์เซลล์',
    teachingTipTh: 'แบตเตอรี่ลิเธียมฟอสเฟต (LiFePO4) มีความปลอดภัยสูงและอายุการใช้งานนานกว่า 10 ปี!',
    powerBonusTh: 'กักเก็บพลังงานสำรองให้ EduVerse ยามค่ำคืน'
  }
];

export const INITIAL_NPC_QUESTS: EduVerseNPCQuest[] = [
  {
    id: 'npc_1',
    npcNameTh: 'ป้าสมศรี (เจ้าของร้านขายของชำ)',
    npcRoleTh: 'ผู้ประกอบการใน Business Zone',
    npcAvatar: '👵🛒',
    problemTh: 'ค่าไฟตู้แช่เครื่องดื่มที่ร้านเดือนนี้พุ่งสูงถึง 4,500 บาท ป้าอยากลดค่าไฟลงโดยไม่กระทบความเย็นของเครื่องดื่ม ต้องทำอย่างไรดี?',
    solutionQuestionTh: 'วิธีใดช่วยลดค่าไฟตู้แช่ได้อย่างถูกต้องและปลอดภัยที่สุด?',
    optionsTh: [
      'ปิดตู้แช่ตอนกลางคืนทั้งหมด',
      'ทำความสะอาดแผงระบายความร้อน (คอยล์ร้อน) ด้านหลังตู้ และไม่แช่ของแน่นเกินไป',
      'ปรับอุณหภูมิให้ติดลบตลอดเวลา',
      'ถอดหลอดไฟแสดงผลออกทั้งหมด'
    ],
    correctOptionIndex: 1,
    rewardXp: 100,
    rewardCoins: 50,
    explanationTh: 'ฝุ่นที่เกาะแผงคอยล์ร้อนทำให้ตู้ระบายความร้อนไม่ได้ คอมเพรสเซอร์ทำงานหนักตลอดเวลา! การล้างฝุ่นและระบายอากาศช่วยเซฟไฟได้ทันที 20-30%',
    completed: false
  },
  {
    id: 'npc_2',
    npcNameTh: 'น้องนพ (นักเรียนชั้น ม.4)',
    npcRoleTh: 'เยาวชนใน Residential Area',
    npcAvatar: '👦🎒',
    problemTh: 'นพชอบเปิดแอร์ 23°C เล่นเกมทั้งคืนเพราะรู้สึกร้อน พอแม่เห็นบิลค่าไฟแล้วตกใจมาก นพอยากปรับอุณหภูมิแอร์ให้เย็นพอดีแต่ประหยัดไฟ ควรทำอย่างไร?',
    solutionQuestionTh: 'สูตรเปิดแอร์ประหยัดไฟและเย็นสบายที่แนะนำคือข้อใด?',
    optionsTh: [
      'เปิดแอร์ 18°C แล้วห่มผ้าหนาๆ',
      'ตั้งอุณหภูมิแอร์ 26°C ร่วมกับเปิดพัดลมช่วยกระจายลมเย็น',
      'เปิดแอร์สลับปิดทุกๆ 30 นาที',
      'ฉีดน้ำใส่เครื่องแอร์ด้านใน'
    ],
    correctOptionIndex: 1,
    rewardXp: 120,
    rewardCoins: 60,
    explanationTh: 'การตั้งแอร์ 26°C + พัดลม ให้ความรู้สึกเย็นเท่ากับแอร์ 24°C แต่ประหยัดพลังงานลงได้ถึง 10-15%!',
    completed: false
  },
  {
    id: 'npc_3',
    npcNameTh: 'วิศวกรต้น (ผู้ดูแลระบบไฟฟ้าโรงงาน)',
    npcRoleTh: 'วิศวกรประจำ Power Station',
    npcAvatar: '👨‍🔧⚡',
    problemTh: 'โรงงานมีอุปกรณ์มอเตอร์ขนาดใหญ่จำนวนมาก ค่า Power Factor ต่ำ ทำให้ถูกคิดค่าตัวหารไฟฟ้าเพิ่ม ควรใช้อุปกรณ์ใดแก้ไข?',
    solutionQuestionTh: 'อุปกรณ์ใดช่วยปรับปรุงค่า Power Factor (PF) ในระบบไฟฟ้า?',
    optionsTh: [
      'Capacitor Bank (คาปาซิเตอร์แบงก์)',
      'Solar Cell ทั่วไป',
      'เปลี่ยนสายไฟให้ใหญ่ขึ้นอย่างเดียว',
      'ติดตั้งหลอดไฟ LED เพิ่ม'
    ],
    correctOptionIndex: 0,
    rewardXp: 150,
    rewardCoins: 80,
    explanationTh: 'Capacitor Bank ช่วยจ่ายพลังงานรีแอกทีฟ (kVAR) ลดภาระการดึงไฟจากการไฟฟ้า ทำให้ค่า PF สูงกว่า 0.85 และประหยัดค่าปรับ!',
    completed: false
  }
];

export const INITIAL_SECRET_AREAS: EduVerseSecretArea[] = [
  {
    id: 'secret_ancient_forest',
    nameTh: 'ป่าพฤกษาโบราณศักดิ์สิทธิ์ (Sacred Ancient Forest)',
    nameEn: 'Sacred Ancient Forest',
    icon: '🌲✨',
    unlocked: true,
    unlockedRequirementTh: 'สะสม Tree Power เกิน 1,000 XP',
    descriptionTh: 'สถานที่สถิตของ World Tree ดั้งเดิม มีละอองเกสรเรืองแสงและบ่อน้ำบริสุทธิ์',
    exclusiveRewardTh: 'ออร่าประกายดาวลอยรอบโปรไฟล์ + สกินโบราณ'
  },
  {
    id: 'secret_energy_temple',
    nameTh: 'มหาวิหารวิหารพลังงานสะอาด (Temple of Clean Energy)',
    nameEn: 'Temple of Clean Energy',
    icon: '🏛️⚡',
    unlocked: true,
    unlockedRequirementTh: 'ผ่านบทเรียนกิ่ง Safety & Solar ครบ 100%',
    descriptionTh: 'วิหารคริสตัลที่สกัดจากพลังงานแดด ลม และน้ำ แสดงประวัติศาสตร์การเปลี่ยนผ่านพลังงานโลก',
    exclusiveRewardTh: 'เข็มกลัดเกียรติยศ "ผู้พิทักษ์วิหารพลังงาน"'
  },
  {
    id: 'secret_solar_island',
    nameTh: 'เกาะโซลาร์ลอยน้ำอัจฉริยะ (Floating Solar Island)',
    nameEn: 'Floating Solar Island',
    icon: '🏝️☀️',
    unlocked: false,
    unlockedRequirementTh: 'ติดตั้งและเรียนรู้ Solar PV ครบสูตร',
    descriptionTh: 'เกาะเทคโนโลยีลอยน้ำที่ติดตั้งโซลาร์ทุ่นลอยน้ำ (Floating Solar) ช่วยลดการระเหยของน้ำและระบายความร้อนแผง',
    exclusiveRewardTh: 'รับโบนัส Coin x2 ในมินิเกมโซลาร์'
  },
  {
    id: 'secret_innovation_lab',
    nameTh: 'ศูนย์นวัตกรรมไร้คาร์บอน (Zero Carbon Innovation Lab)',
    nameEn: 'Zero Carbon Innovation Lab',
    icon: '🔬🔮',
    unlocked: false,
    unlockedRequirementTh: 'เชื่อมต่อ ESP32 + รักษาสถิติ Saving Score > 90',
    descriptionTh: 'ห้องปฏิบัติการล้ำยุคที่จำลองระบบ Smart Grid และเมืองอัจฉริยะแบบเรียลไทม์',
    exclusiveRewardTh: 'สิทธิ์ใช้งานฟีเจอร์พยากรณ์ค่าไฟขั้นสูง'
  }
];

export const INITIAL_EDUVERSE_FESTIVALS: EduVerseFestival[] = [
  {
    id: 'fest_earth_day',
    titleTh: 'เทศกาลวันคุ้มครองโลก (Earth Day Festival)',
    titleEn: 'Earth Day Festival',
    icon: '🌍🌿',
    seasonTh: 'ฤดูใบไม้ผลิ',
    active: true,
    themeColor: 'from-emerald-500 to-teal-600',
    descriptionTh: 'ร่วมใจกันลดการใช้ไฟฟ้า 1 ชั่วโมงในบ้าน เพื่อฟื้นฟูระบบนิเวศและรับรางวัลพิเศษ!',
    specialChallengeTh: 'ปิดแอร์และไฟที่ไม่จำเป็น รับ +200 XP และเข็มกลัด Earth Guardian'
  },
  {
    id: 'fest_solar_summer',
    titleTh: 'เทศกาลรับแดดออมไฟ (Solar Summer Fest)',
    titleEn: 'Solar Summer Fest',
    icon: '☀️🏖️',
    seasonTh: 'ฤดูร้อน',
    active: false,
    themeColor: 'from-amber-500 to-orange-600',
    descriptionTh: 'รับมืออากาศร้อนด้วยการเปิดแอร์ 26°C + พัดลม และใช้ประโยชน์จากพลังงานโซลาร์!',
    specialChallengeTh: 'ใช้ไฟในบ้านช่วง On-Peak ต่ำกว่า 15 หน่วย รับสกินโซลาร์แรร์'
  },
  {
    id: 'fest_rainy_hydro',
    titleTh: 'เทศกาลพลังน้ำสดชื่น (Hydro Rainy Festival)',
    titleEn: 'Hydro Rainy Festival',
    icon: '🌧️💧',
    seasonTh: 'ฤดูฝน',
    active: false,
    themeColor: 'from-cyan-500 to-blue-600',
    descriptionTh: 'ใช้ประโยชน์จากน้ำฝน ตรวจสอบปั๊มน้ำอินเวอร์เตอร์ และตระหนักถึงพลังงานน้ำหมุนเวียน',
    specialChallengeTh: 'ผ่านมินิเกม Hydro Water Wheel คะแนนระดับ S'
  }
];
