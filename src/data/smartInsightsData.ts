import { 
  SmartAnomaly, 
  SmartGoal, 
  HouseholdBenchmark, 
  SeasonalInsight, 
  ActionTimelineItem, 
  WhatIfScenario, 
  EnergyDiaryNote 
} from '../types';

export const initialAnomalies: SmartAnomaly[] = [
  {
    id: 'anom-1',
    titleTh: 'แอร์ทำงานโหลดสูงผิดปกติ',
    titleEn: 'Air Conditioner High Load Spike',
    applianceName: 'Air Conditioner 12000 BTU',
    type: 'ac_spike',
    severity: 'high',
    simpleDescTh: 'วันนี้แอร์กินไฟมากกว่าปกติ',
    simpleDescEn: 'AC is consuming more electricity than usual today.',
    balancedDescTh: 'แอร์ใช้ไฟเพิ่มขึ้นประมาณ 23% จากค่าเฉลี่ยสัปดาห์ก่อน อาจเกิดจากอากาศร้อนจัดหรือขอบยางประตูไม่สนิท',
    balancedDescEn: 'AC power draw increased by 23% compared to last week average, likely due to external heat or worn door seals.',
    detailedDescTh: 'ตรวจพบดัชนีโหลดกระแสวิกฤต +23% (264 kWh vs Baseline 214 kWh) บนโหนด Air Conditioner 12,000 BTU สัมประสิทธิ์การระบายความร้อนตกลงส่งผลให้อัตรากินไฟเพิ่ม ฿185/เดือน',
    detailedDescEn: 'Critical load deviation of +23% detected (264 kWh vs baseline 214 kWh) on 12k BTU AC node. Thermal efficiency drop adds ~185 THB/month.',
    whyTh: 'อุณหภูมิภายนอกพุ่งสูงเป็น 36°C ร่วมกับฝุ่นสะสมแผงคอยล์เย็น ทำให้คอมเพรสเซอร์ทำงานถี่ขึ้น 40%',
    whyEn: 'Outdoor temperature reached 36°C with dust buildup on cooling coils, causing 40% higher compressor duty cycles.',
    financialImpactThb: 185,
    confidence: 94,
    baselineKwh: 214,
    currentKwh: 264,
    deviationPct: 23.3,
    source: 'measured',
    assumptionsTh: 'คำนวณจาก PEA Smart Plug Sensor อัตราค่าไฟอัตราปกติ 4.20 บาท/หน่วย',
    recommendedActionTh: 'ล้างแผ่นฟิลเตอร์กรองฝุ่น และตั้งอุณหภูมิเป็น 26°C พร้อมเปิดพัดลมช่วยระบาย',
    recommendedActionEn: 'Clean air filter and adjust setpoint to 26°C with supplemental ceiling fan.',
    relatedLessonId: 'lesson-ac-saving',
    detectedAt: '2026-08-07 11:20:00'
  },
  {
    id: 'anom-2',
    titleTh: 'ตู้เย็นเดินเครื่องต่อเนื่อง 24 ชั่วโมง',
    titleEn: 'Refrigerator Continuous Running',
    applianceName: 'Smart Refrigerator 10 Cu.ft',
    type: 'fridge_continuous',
    severity: 'medium',
    simpleDescTh: 'ตู้เย็นใช้ไฟตลอดเวลาโดยไม่ตัด',
    simpleDescEn: 'Refrigerator compressor is running without cutting off.',
    balancedDescTh: 'คอมเพรสเซอร์ตู้เย็นทำงานต่อเนื่องตลอด 24 ชั่วโมงโดยไม่มีช่วงพัก อาจเกิดจากใส่ของร้อนหรือขอบยางรั่ว',
    balancedDescEn: 'Compressor ran continuously for 24 hours without cycling down, likely due to hot food or door seal leak.',
    detailedDescTh: 'กราฟ Power Draw แสดงค่าคงที่ 80W ตลอด 24 ชม. (ไม่มี Cut-off cycle) เพิ่มอัตราใช้ไฟ 1.92 kWh/วัน คาดว่าเกิดจากขอบยางประตูเสื่อมสภาพหรือช่องระบายอากาศระบายความร้อนไม่ทัน',
    detailedDescEn: 'Continuous 80W power baseline detected for 24h straight without cycling. Extra 1.92 kWh/day due to thermal seal breakdown.',
    whyTh: 'ขอบยางประตูตู้เย็นเสื่อมสภาพ ทำให้อากาศร้อนเล็ดลอดเข้าไป หรือมีของแช่แน่นเกินไป',
    whyEn: 'Worn door gasket letting ambient room heat leak inside, or overstuffed shelves blocking airflow.',
    financialImpactThb: 142,
    confidence: 89,
    baselineKwh: 42,
    currentKwh: 57.6,
    deviationPct: 37.1,
    source: 'measured',
    assumptionsTh: 'อ้างอิงจากข้อมูลกำลังวัตต์ฐานย้อนหลัง 14 วัน',
    recommendedActionTh: 'ทำความสะอาดคอยล์ร้อนหลังตู้เย็น และเช็กขอบยางประตูด้วยกระดาษทดสอบ',
    recommendedActionEn: 'Clean rear condenser coils and test door gasket seal with paper test.',
    relatedLessonId: 'lesson-fridge-efficiency',
    detectedAt: '2026-08-07 09:15:00'
  },
  {
    id: 'anom-3',
    titleTh: 'การใช้ไฟพุ่งสูงช่วงเที่ยงคืน (Midnight Spike)',
    titleEn: 'Midnight Power Spike Detected',
    applianceName: 'Desktop Gaming PC & Lights',
    type: 'midnight_spike',
    severity: 'low',
    simpleDescTh: 'มีการเปิดอุปกรณ์ทิ้งไว้ช่วงดึก',
    simpleDescEn: 'Devices left active late at night.',
    balancedDescTh: 'พบการใช้ไฟเพิ่มขึ้นช่วง 00:00 - 04:00 น. ประมาณ ฿45/คืน จาก Gaming PC และไฟสแตนด์บาย',
    balancedDescEn: 'Detected 45 THB/night usage spike between 00:00 - 04:00 from Gaming PC and idle entertainment node.',
    detailedDescTh: 'พบพฤติกรรมการโหลดกระแสไฟสูงผิดปกติ 450W ช่วง 00:00 - 04:00 น. รวมพลังงาน 1.8 kWh ต่อคืน ส่งผลให้ค่าไฟเพิ่มขึ้นประมาณ ฿95/เดือน',
    detailedDescEn: 'Continuous 450W power draw between 00:00 - 04:00 AM totaling 1.8 kWh/night causing extra ~95 THB/month.',
    whyTh: 'คอมพิวเตอร์และจอมอนิเตอร์อยู่ในโหมด Sleep แต่ปลั๊กไฟพ่วงยังจ่ายไฟสแตนด์บาย 45W',
    whyEn: 'PC kept on sleep mode with high standby power draw on multi-plug strip.',
    financialImpactThb: 95,
    confidence: 91,
    baselineKwh: 12,
    currentKwh: 28,
    deviationPct: 133,
    source: 'calculated',
    assumptionsTh: 'ประเมินจากรูปแบบการเปิดเครื่องข้ามคืนช่วงสุดสัปดาห์',
    recommendedActionTh: 'เปิดโหมด Eco Standby ตัดไฟอัตโนมัติเมื่อไม่ใช้งานเกิน 30 นาที',
    recommendedActionEn: 'Activate Eco Standby Auto-cut to turn off power strip when idle.',
    relatedLessonId: 'lesson-standby-power',
    detectedAt: '2026-08-07 02:40:00'
  }
];

export const initialGoals: SmartGoal[] = [
  {
    id: 'goal-1',
    titleTh: 'คุมค่าไฟเดือนนี้ให้อยู่ใต้ 1,500 บาท',
    titleEn: 'Keep Monthly Bill Under 1,500 THB',
    targetType: 'bill_limit',
    targetValue: 1500,
    currentValue: 1248,
    unitTh: 'บาท',
    unitEn: 'THB',
    startDate: '2026-08-01',
    targetDate: '2026-08-31',
    successProbability: 88,
    coachingTipTh: 'ยอดประมาณการขณะนี้อยู่ที่ ฿1,248 โอกาสสำเร็จสูงมาก! หากคุมแอร์เพิ่มอีกนิดจะเซฟเงินได้ตามเป้าแน่นอน',
    coachingTipEn: 'Est. bill is ฿1,248. High chance of success! Small AC tweak ensures you stay safely under limit.',
    completed: false
  },
  {
    id: 'goal-2',
    titleTh: 'ลดเวลาเปิดแอร์ลง 20%',
    titleEn: 'Reduce Aircon Usage by 20%',
    targetType: 'ac_cut',
    targetValue: 20,
    currentValue: 14,
    unitTh: '%',
    unitEn: '%',
    startDate: '2026-08-01',
    targetDate: '2026-08-20',
    successProbability: 78,
    coachingTipTh: 'ลดเวลาเปิดแอร์สำเร็จแล้ว 14% เหลืออีก 6% ลองใช้พัดลมช่วยระบายอากาศช่วงค่ำ',
    coachingTipEn: 'Achieved 14% reduction. Use room fans in early evening to bridge the remaining 6%.',
    completed: false
  },
  {
    id: 'goal-3',
    titleTh: 'ผ่านบทเรียน Energy Academy ครบ 5 บท',
    titleEn: 'Complete 5 Lessons in Energy Academy',
    targetType: 'complete_academy',
    targetValue: 5,
    currentValue: 3,
    unitTh: 'บทเรียน',
    unitEn: 'lessons',
    startDate: '2026-08-01',
    targetDate: '2026-08-15',
    successProbability: 95,
    coachingTipTh: 'เรียนจบไปแล้ว 3 บท! เหลืออีกเพียง 2 บทเพื่อรับเหรียญ Smart Learner Badge',
    coachingTipEn: 'Completed 3 lessons! Finish 2 more to claim your Smart Learner badge.',
    completed: false
  }
];

export const householdBenchmarks: HouseholdBenchmark[] = [
  {
    profileType: 'house_2bed',
    profileNameTh: 'บ้านเดี่ยว / ทาวน์โฮม 2 ห้องนอน (2-Bed House)',
    profileNameEn: '2-Bedroom House Profile',
    userValueKwh: 298,
    averageKwh: 340,
    userCostThb: 1248,
    averageCostThb: 1428,
    status: 'below_average',
    diffPct: -12.6,
    explanationTh: 'คุณใช้ไฟน้อยกว่าบ้านขนาดใกล้เคียงกัน 12.6% เนื่องจากใช้แอร์ระบบ Inverter และปิดไฟสแตนด์บายสม่ำเสมอ',
    explanationEn: 'You consume 12.6% less power than benchmark homes due to Inverter AC and standby power cutbacks.',
    potentialSavingsThb: 180
  },
  {
    profileType: 'dorm',
    profileNameTh: 'ห้องพักหอพัก / คอนโดสตูดิโอ (Dorm / Studio)',
    profileNameEn: 'Dormitory / Studio Apartment',
    userValueKwh: 298,
    averageKwh: 210,
    userCostThb: 1248,
    averageCostThb: 882,
    status: 'above_average',
    diffPct: 41.9,
    explanationTh: 'หากเทียบกับระดับหอพักทั่วไป ค่าไฟคุณสูงกว่าเฉลี่ย 41.9% เนื่องจากมีเครื่องเล่นเกมคอมพิวเตอร์ และแอร์เปิดนานกว่า 8 ชม.',
    explanationEn: 'Higher than average dorm usage (+41.9%) due to high-power gaming desktop and 8h+ daily AC usage.',
    potentialSavingsThb: 366
  }
];

export const seasonalInsights: SeasonalInsight[] = [
  {
    season: 'summer',
    titleTh: 'ฤดูร้อน: อุณหภูมิพุ่งสูง ค่าไฟแอร์เพิ่ม 12%',
    titleEn: 'Summer Season: Heatwave Impact on AC',
    tempImpactTh: 'อากาศร้อนขึ้นเฉลี่ย 3°C (34°C ➔ 37°C)',
    tempImpactEn: 'Avg temperature rose 3°C (34°C ➔ 37°C)',
    acIncreasePct: 12,
    expectedBillTrendTh: 'ค่าไฟมีแนวโน้มเพิ่มขึ้น ฿120 - ฿180 ต่อเดือน',
    expectedBillTrendEn: 'Monthly bill expected to increase by ฿120 - ฿180',
    aiRecommendationTh: 'เพิ่มอุณหภูมิแอร์เป็น 26°C ร่วมกับพัดลมระบายอากาศ และเปิดม่านบังแดดช่วงบ่าย',
    aiRecommendationEn: 'Set AC to 26°C with ceiling fan and draw thermal blinds during peak heat.'
  },
  {
    season: 'rainy',
    titleTh: 'ฤดูฝน: ความชื้นสูง เครื่องทำน้ำอุ่นทำงานหนัก',
    titleEn: 'Rainy Season: High Humidity Impact',
    tempImpactTh: 'ความชื้นสัมพัทธ์สูง 85% + อุณหภูมิน้ำเย็นลง',
    tempImpactEn: 'Relative humidity 85% + lower tap water temp',
    acIncreasePct: 6,
    expectedBillTrendTh: 'ค่าไฟจากเครื่องทำน้ำอุ่นและเครื่องอบผ้าเพิ่มขึ้นเล็กน้อย',
    expectedBillTrendEn: 'Slight bill increase from water heater and clothes dryer',
    aiRecommendationTh: 'ปรับระดับความร้อนเครื่องทำน้ำอุ่นลงที่ระดับกลาง และตากผ้าในบริเวณลมโกรก',
    aiRecommendationEn: 'Set water heater dial to medium and air-dry laundry in ventilated space.'
  }
];

export const initialActionTimeline: ActionTimelineItem[] = [
  {
    id: 'act-1',
    date: '2026-08-06 14:30',
    actionTh: 'เปิดใช้งานโหมด Eco Mode แอร์ 26°C',
    actionEn: 'Enabled AC Eco Mode @ 26°C',
    type: 'ac_reduced',
    expectedImpactThb: 150,
    actualImpactThb: 162,
    learningGainedTh: 'เรียนรู้เทคนิคการทำงานคู่กับพัดลมช่วยกระจายลมเย็น',
    coinsEarned: 25,
    xpEarned: 50
  },
  {
    id: 'act-2',
    date: '2026-08-04 10:15',
    actionTh: 'เรียนจบจบซีรีส์บทเรียน "เข้าใจค่า Ft และอัตรา TOU"',
    actionEn: 'Completed "Understanding Ft Rate & TOU" lesson',
    type: 'lesson_finished',
    expectedImpactThb: 80,
    actualImpactThb: 80,
    learningGainedTh: 'วางแผนย้ายการซักผ้าไปทำหลัง 22:00 น. ช่วง Off-Peak',
    coinsEarned: 40,
    xpEarned: 100
  },
  {
    id: 'act-3',
    date: '2026-08-01 09:00',
    actionTh: 'ตั้งงบประมาณค่าไฟรายเดือนที่ ฿1,500',
    actionEn: 'Set monthly electricity budget to ฿1,500',
    type: 'budget_changed',
    expectedImpactThb: 200,
    actualImpactThb: 210,
    learningGainedTh: 'ระบบแจ้งเตือนการใช้งบประมาณรายวันล่วงหน้า',
    coinsEarned: 15,
    xpEarned: 30
  }
];

export const whatIfScenarios: WhatIfScenario[] = [
  {
    id: 'scen-1',
    titleTh: 'ปรับอุณหภูมิแอร์จาก 25°C ➔ 27°C + เปิดพัดลม',
    titleEn: 'Adjust AC from 25°C ➔ 27°C with Desk Fan',
    descriptionTh: 'การปรับขึ้น 2 องศาเซลเซียส ร่วมกับลมพัดลมที่ความเร็ว 1.5 ม./วินาที ช่วยให้รู้สึกเย็นเท่าเดิม แต่คอมเพรสเซอร์ทำงานน้อยลงมาก',
    descriptionEn: 'Raising 2°C with 1.5m/s wind speed maintains comfort while cutting compressor load.',
    monthlySavingThb: 185,
    yearlySavingThb: 2220,
    co2ReductionKg: 28.5,
    scoreImprovementPts: 8,
    aiRecommendationTh: 'แนะนำอย่างยิ่ง! ทำได้ทันทีโดยไม่ต้องลงทุนเพิ่ม และได้คะแนนประหยัดไฟเพิ่ม 8 คะแนน'
  },
  {
    id: 'scen-2',
    titleTh: 'ลดเวลาเปิดแอร์ลงวันละ 1 ชั่วโมง',
    titleEn: 'Reduce Aircon Runtime by 1 Hour Daily',
    descriptionTh: 'เปลี่ยนมาใช้พัดลมระบายอากาศช่วง 1 ชั่วโมงแรกก่อนนอน หรือตั้งเวลาปิดแอร์ล่วงหน้าก่อนตื่น 30 นาที',
    descriptionEn: 'Use timer to shut off AC 30m before waking up and use fan for first hour.',
    monthlySavingThb: 110,
    yearlySavingThb: 1320,
    co2ReductionKg: 16.8,
    scoreImprovementPts: 5,
    aiRecommendationTh: 'ตั้งเวลาปิดแอร์ผ่านรีโมตหรือปลั๊กอัจฉริยะ ทำได้ง่ายและหลับสบายเหมือนเดิม'
  },
  {
    id: 'scen-3',
    titleTh: 'ย้ายการซักผ้าและตากผ้าไปช่วง Off-Peak (หลัง 22:00)',
    titleEn: 'Shift Washing & Drying to Off-Peak (Post 22:00)',
    descriptionTh: 'สำหรับบ้านที่ใช้อัตรา TOU ค่าไฟช่วง Off-Peak ถูกกว่า On-Peak เกือบ 50% (฿2.63 vs ฿5.26)',
    descriptionEn: 'For TOU tariff users, Off-Peak power is 50% cheaper than On-Peak (฿2.63 vs ฿5.26).',
    monthlySavingThb: 145,
    yearlySavingThb: 1740,
    co2ReductionKg: 22.0,
    scoreImprovementPts: 6,
    paybackPeriodMonths: 0,
    aiRecommendationTh: 'สำหรับผู้ใช้มิเตอร์ TOU โหมดนี้ประหยัดเงินได้สูงสุดทันทีโดยไม่เสียความสะดวก'
  },
  {
    id: 'scen-4',
    titleTh: 'เปลี่ยนตู้เย็นเก่าเป็นตู้เย็นสมาร์ทอินเวอร์เตอร์ ฉลากเบอร์ 5 (5 ดาว)',
    titleEn: 'Replace Old Refrigerator with Inverter No. 5 (5 Stars)',
    descriptionTh: 'ตู้เย็นอินเวอร์เตอร์รุ่นใหม่ใช้ไฟเพียง 57 kWh/ปี เทียบกับรุ่นเก่าที่กินไฟถึง 220 kWh/ปี',
    descriptionEn: 'Modern Inverter fridge consumes 57 kWh/year vs 220 kWh/year on old models.',
    monthlySavingThb: 230,
    yearlySavingThb: 2760,
    co2ReductionKg: 35.2,
    scoreImprovementPts: 12,
    paybackPeriodMonths: 32,
    aiRecommendationTh: 'ระยะเวลาคืนทุนประมาณ 2.5 ปี เหมาะสำหรับตู้เย็นที่ใช้งานเกิน 7 ปีแล้ว'
  }
];

export const initialDiaryNotes: EnergyDiaryNote[] = [
  {
    id: 'diary-1',
    date: '2026-08-06',
    note: 'อยู่บ้านทำงานทั้งวัน (Work from home) เปิดแอร์ช่วงบ่าย 5 ชั่วโมง',
    tag: 'home_all_day',
    tagLabelTh: '🏠 อยู่บ้านทั้งวัน'
  },
  {
    id: 'diary-2',
    date: '2026-08-03',
    note: 'เพื่อนมาเยี่ยมบ้าน 4 คน เปิดแอร์ห้องนั่งเล่นและเตาหมูกระทะไฟฟ้า',
    tag: 'guests',
    tagLabelTh: '👥 เพื่อนมาบ้าน'
  }
];
