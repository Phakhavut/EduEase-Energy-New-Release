import { CertificationTier, UserCertificationProgress, LearningPath } from '../types';

export const CERTIFICATION_TIERS: CertificationTier[] = [
  {
    id: 'tier1_apprentice',
    tierLevel: 1,
    badgeCode: 'CERT-LV1-APP',
    titleTh: 'ระดับ 1: ผู้เริ่มต้นรักษ์พลังงาน',
    titleEn: 'Level 1: Energy Apprentice',
    roleTitleTh: 'ผู้ศึกษาพลังงานเบื้องต้น (Energy Apprentice)',
    roleTitleEn: 'Energy Apprentice',
    requiredLessons: 0,
    summaryTh: 'เข้าใจหลักการกินไฟพื้นฐาน การคิดคำนวณวัตต์เป็นหน่วย kWh และค่าใช้จ่ายเครื่องใช้ไฟฟ้าในบ้าน',
    summaryEn: 'Mastered power basics, wattage calculations, and home appliance power bill foundations.',
    icon: '🌱',
    accentGradient: 'from-emerald-500 to-teal-600',
    badgeBorder: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/10',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    keyCompetenciesTh: [
      'คำนวณหน่วยไฟ kWh = (Watt × Hour) / 1000',
      'แยกแยะกำลังวัตต์เครื่องใช้ไฟฟ้าความร้อน vs มอเตอร์',
      'ตรวจสอบและกำจัดไฟรั่วไหล Standby Power',
      'วิเคราะห์บิลค่าไฟฟ้าและการปรับอุณหภูมิแอร์ 25-26°C'
    ],
    keyCompetenciesEn: [
      'Calculate kWh units: (Watts × Hours) / 1000',
      'Distinguish resistive heating vs motor inductive loads',
      'Identify and eliminate phantom Standby Power',
      'Analyze electricity bills and 25-26°C AC thermal balance'
    ],
    authorizedScopesTh: [
      'ประเมินการใช้ไฟฟ้าเบื้องต้นภายในที่พักอาศัย',
      'ตรวจสอบฉลากประหยัดไฟเบอร์ 5 ขั้นบันได'
    ],
    authorizedScopesEn: [
      'Conduct preliminary residential energy usage audits',
      'Verify Thai EGAT Label No. 5 energy ratings'
    ],
    sealLabel: 'LEVEL 1 VERIFIED'
  },
  {
    id: 'tier2_auditor',
    tierLevel: 2,
    badgeCode: 'CERT-LV2-AUD',
    titleTh: 'ระดับ 2: ผู้ตรวจประเมินพลังงาน',
    titleEn: 'Level 2: Certified Energy Auditor',
    roleTitleTh: 'ผู้ตรวจประเมินพลังงานรับรอง (Certified Energy Auditor)',
    roleTitleEn: 'Certified Energy Auditor',
    requiredLessons: 4,
    summaryTh: 'สามารถวางแผนจัดการโหลดไฟฟ้า ปรับพฤติกรรมมิเตอร์ TOU และวิเคราะห์การกักเก็บพลังงานระบบชาร์จ EV',
    summaryEn: 'Audited home energy efficiency, optimized TOU tariff usage, and designed EV charging loads.',
    icon: '⚡',
    accentGradient: 'from-sky-500 to-blue-600',
    badgeBorder: 'border-sky-500/40',
    badgeBg: 'bg-sky-500/10',
    textColor: 'text-sky-600 dark:text-sky-400',
    keyCompetenciesTh: [
      'บริหารจัดการโหลด Peak vs Off-Peak อัตรา TOU',
      'คำนวณขนาดและสายไฟสำหรับ Wallbox EV Charger',
      'วิเคราะห์ประสิทธิภาพระบบทำความเย็น Inverter vs Fixed Speed',
      'คำนวณการรั่วไหลความร้อนและการจัดโซนนิ่งเครื่องใช้ไฟฟ้า'
    ],
    keyCompetenciesEn: [
      'Manage Peak vs Off-Peak loads under TOU tariff schedules',
      'Size and select dedicated cabling for EV Wallbox Chargers',
      'Evaluate SEER ratings and Inverter compressor efficiency',
      'Analyze thermal envelope leakage and appliance zoning'
    ],
    authorizedScopesTh: [
      'ตรวจสอบวิเคราะห์และจัดทำรายงานตรวจประเมินพลังงานบ้านพักอาศัย',
      'ให้คำแนะนำการเปลี่ยนผ่านระบบพลังงานสะอาด'
    ],
    authorizedScopesEn: [
      'Issue residential energy audit and efficiency reports',
      'Advise on clean energy transitions and EV readiness'
    ],
    sealLabel: 'LEVEL 2 AUDITOR'
  },
  {
    id: 'tier3_specialist',
    tierLevel: 3,
    badgeCode: 'CERT-LV3-SOL',
    titleTh: 'ระดับ 3: ผู้เชี่ยวชาญโซลาร์ & สายส่ง',
    titleEn: 'Level 3: Solar & Grid Specialist',
    roleTitleTh: 'ผู้เชี่ยวชาญระบบสายส่งและพลังงานแสงอาทิตย์ (Solar & Grid Specialist)',
    roleTitleEn: 'Solar & Grid Systems Specialist',
    requiredLessons: 8,
    summaryTh: 'ออกแบบระบบ Solar Rooftop คำนวณ String Inverter ความปลอดภัยระบบ On-Grid และมาตรฐานสายส่ง กฟน./กฟภ.',
    summaryEn: 'Engineered Solar Rooftop arrays, On-Grid inverters, and MEA/PEA utility grid interconnection.',
    icon: '☀️',
    accentGradient: 'from-amber-500 to-orange-600',
    badgeBorder: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/10',
    textColor: 'text-amber-600 dark:text-amber-400',
    keyCompetenciesTh: [
      'คำนวณขนาดกำลังผลิต Solar PV (kWp) และชั่วโมงแดดเฉลี่ย (Peak Sun Hours)',
      'ออกแบบวงจร String, DC Combiner Box และ Rapid Shutdown',
      'เลือกใช้อินเวอร์เตอร์ Grid-Tied ตามข้อกำหนด Grid Code การไฟฟ้า',
      'วิเคราะห์จุดคุ้มทุน (Payback Period & ROI) ของระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์'
    ],
    keyCompetenciesEn: [
      'Size Solar PV kWp capacity based on Peak Sun Hours (PSH)',
      'Design DC string layout, combiner boxes, and rapid shutdown',
      'Select Grid-Tied inverters compliant with MEA/PEA Grid Codes',
      'Perform solar financial payback modeling and ROI forecasting'
    ],
    authorizedScopesTh: [
      'ออกแบบและตรวจรับระบบผลิตไฟฟ้าพลังงานแสงอาทิตย์บนหลังคา',
      'จัดเตรียมเอกสารขออนุญาตขนานไฟกับการไฟฟ้านครหลวง/ส่วนภูมิภาค'
    ],
    authorizedScopesEn: [
      'Design and commission rooftop solar PV generation systems',
      'Prepare grid interconnection compliance documentation'
    ],
    sealLabel: 'LEVEL 3 SOLAR PRO'
  },
  {
    id: 'tier4_manager',
    tierLevel: 4,
    badgeCode: 'CERT-LV4-CEM',
    titleTh: 'ระดับ 4: ผู้จัดการพลังงานวิชาชีพ',
    titleEn: 'Level 4: Professional Energy Manager',
    roleTitleTh: 'ผู้จัดการพลังงานและช่างไฟวิชาชีพ (Certified Energy Manager - CEM Grade)',
    roleTitleEn: 'Professional Energy Manager (CEM Grade)',
    requiredLessons: 15,
    summaryTh: 'จัดตู้คอนซูมเมอร์ยูนิต (MDB), เลือกเบรกเกอร์ RCBO/MCB, คำนวณขนาดสายไฟตามมาตรฐาน มอก. 11-2553, ตรวจสอบจุดร้อน Thermoscan และทดสอบค่าความต้านทานฉนวน Megger Test',
    summaryEn: 'Mastered residential MDB panels, RCBO/MCB breaker sizing, TIS wiring standards, Thermal IR thermography, and Megger insulation resistance testing.',
    icon: '🛠️',
    accentGradient: 'from-purple-500 to-indigo-600',
    badgeBorder: 'border-purple-500/40',
    badgeBg: 'bg-purple-500/10',
    textColor: 'text-purple-600 dark:text-purple-400',
    keyCompetenciesTh: [
      'จัดเรียงตู้ Consumer Unit และคำนวณขนาด Main Breaker ตามพิกัดมิเตอร์ 15(45)A / 30(100)A',
      'เลือกขนาดสายไฟทองแดง IEC 01 / VAF ตามมาตรฐาน มอก. 11-2553',
      'ติดตั้งหลักดิน (Ground Rod 2.4m) และวัดค่าความต้านทานดิน < 5 โอห์ม',
      'เลือกใช้งานและทดสอบอุปกรณ์ป้องกันไฟดูด RCBO (30mA / 0.04s)',
      'ตรวจสแกนจุดร้อนในตู้ไฟด้วยกล้องอินฟราเรด (Thermal IR Thermoscan)',
      'ทดสอบค่าความเป็นฉนวนสายไฟ (Megohmmeter Insulation Resistance ≥ 0.5 MΩ)'
    ],
    keyCompetenciesEn: [
      'Assemble Consumer Units and size Main Breakers for 15(45)A / 30(100)A services',
      'Select copper conductors (IEC 01 / VAF) per TIS 11-2553 standards',
      'Install 2.4m copper-clad Ground Rods ensuring earth resistance < 5Ω',
      'Specify and calibrate 30mA / 0.04s RCBO residual current protection',
      'Detect loose terminal hot spots via Thermal IR Thermography',
      'Perform high-voltage DC Megger insulation resistance verification'
    ],
    authorizedScopesTh: [
      'ตรวจสอบและรับรองความปลอดภัยตู้จ่ายไฟฟ้าอาคารพักอาศัยและพาณิชย์',
      'วางแผนและกำกับการติดตั้งระบบไฟฟ้าตามมาตรฐาน วสท.'
    ],
    authorizedScopesEn: [
      'Inspect and certify residential & commercial distribution panel integrity',
      'Direct electrical installations adhering to EIT/TIS standards'
    ],
    sealLabel: 'LEVEL 4 CEM GRADE'
  },
  {
    id: 'tier5_grandmaster',
    tierLevel: 5,
    badgeCode: 'CERT-LV5-FELLOW',
    titleTh: 'ระดับสูงสุด: ปรมาจารย์พลังงาน & การบำรุงรักษาขั้นสูง',
    titleEn: 'Level 5: Energy & Maintenance Grandmaster (Fellow)',
    roleTitleTh: 'ปรมาจารย์วิศวกรรมพลังงานและการบำรุงรักษาเชิงป้องกัน (Fellow Energy Grandmaster)',
    roleTitleEn: 'Grandmaster of Energy Engineering & Asset Reliability',
    requiredLessons: 22,
    summaryTh: 'บรรลุความสมบูรณ์แบบครบถ้วนทุกบทเรียน มีความเชี่ยวชาญการวิเคราะห์ Power Factor, Harmonic Distortion, การบำรุงรักษาหม้อแปลง DGA, ตู้สวิตช์เกียร์ MDB, มอเตอร์ MCC/VFD และระบบไฟฟ้าสำรองฉุกเฉิน ATS/UPS',
    summaryEn: 'Attained complete curriculum mastery with advanced power quality THD analysis, transformer DGA oil testing, switchgear micro-ohm PM, VFD vibration diagnostics, and ATS/UPS critical power continuity.',
    icon: '👑',
    accentGradient: 'from-amber-500 via-purple-500 to-emerald-500',
    badgeBorder: 'border-amber-400',
    badgeBg: 'bg-amber-500/10',
    textColor: 'text-amber-600 dark:text-amber-300',
    keyCompetenciesTh: [
      'ตรวจวัดและปรับปรุงค่า Power Factor (PF > 0.85) ด้วย Capacitor Bank',
      'ทดสอบค่าความต้านทานฉนวนสายไฟฟ้า (Megohmmeter Insulation Resistance > 0.5 MΩ)',
      'วิเคราะห์และกรอง Harmonic Distortion (THD-V < 5%) และ Triplen Neutral Overload',
      'บำรุงรักษาหม้อแปลงไฟฟ้า สารดูดความชื้น Silica Gel และทดสอบค่าน้ำมันฉนวน DGA',
      'ขันกวดทอร์กบัสบาร์ตู้ MDB และทดสอบ Micro-Ohm Contact Resistance (Ductor Test)',
      'ตรวจสภาพอินเวอร์เตอร์ขับมอเตอร์ VFD และวิเคราะห์ความถี่การสั่นสะเทือนของตลับลูกปืน',
      'ทดสอบ Load Bank เครื่องกำเนิดไฟฟ้าสำรอง และความต้านทานภายในแบตเตอรี่ UPS'
    ],
    keyCompetenciesEn: [
      'Measure and correct Power Factor (PF > 0.85) with Capacitor Banks',
      'Perform Megohmmeter insulation resistance tests (Target > 0.5 MΩ)',
      'Mitigate harmonic distortion (THD-V < 5%) and neutral conductor thermal overloads',
      'Maintain substation transformers, dehydrating breathers, and oil DGA analysis',
      'Execute switchgear torque calibrations and micro-ohm contact resistance tests',
      'Service VFD motor drives and conduct ISO 10816 bearing vibration spectral analysis',
      'Direct emergency generator Load Bank testing and UPS battery conductance verification'
    ],
    authorizedScopesTh: [
      'ที่ปรึกษาอาวุโสด้านการจัดการพลังงานและวิศวกรรมไฟฟ้าระดับประเทศ',
      'ผู้ทรงคุณวุฒิรับรองมาตรฐานความปลอดภัยระบบจ่ายไฟฟ้าและโรงงานอุตสาหกรรม'
    ],
    authorizedScopesEn: [
      'Senior National Energy & Electrical Engineering Advisory',
      'Certified Fellow Evaluator for high-efficiency grid and industrial substation reliability'
    ],
    sealLabel: 'GRANDMASTER FELLOW'
  }
];

export function calculateCertificationProgress(paths: LearningPath[], bonusQuizPoints: number = 0): UserCertificationProgress {
  const allLessons = paths.flatMap(p => p.lessons);
  const totalCount = allLessons.length || 24;
  const completedLessons = allLessons.filter(l => l.completed);
  const completedCount = completedLessons.length;
  const completionPercent = Math.round((completedCount / totalCount) * 100);

  // Compute accumulated base Certification Points
  const baseCp = completedLessons.reduce((acc, l) => {
    const cp = l.certificationPointsReward || (l.difficulty === 'expert' ? 100 : l.difficulty === 'hard' ? 80 : l.difficulty === 'medium' ? 65 : 50);
    return acc + cp;
  }, 0);
  const totalCertificationPoints = baseCp + bonusQuizPoints;

  // Determine current tier
  let currentTierIndex = 0;
  for (let i = CERTIFICATION_TIERS.length - 1; i >= 0; i--) {
    if (completedCount >= CERTIFICATION_TIERS[i].requiredLessons) {
      currentTierIndex = i;
      break;
    }
  }

  const currentTier = CERTIFICATION_TIERS[currentTierIndex];
  const nextTier = currentTierIndex < CERTIFICATION_TIERS.length - 1 
    ? CERTIFICATION_TIERS[currentTierIndex + 1] 
    : null;

  const lessonsToNextTier = nextTier 
    ? Math.max(0, nextTier.requiredLessons - completedCount) 
    : 0;

  // Next tier progress percentage
  let nextTierPercent = 100;
  if (nextTier) {
    const baseLessons = currentTier.requiredLessons;
    const targetLessons = nextTier.requiredLessons;
    const progressInCurrentStep = completedCount - baseLessons;
    const stepRange = targetLessons - baseLessons;
    nextTierPercent = Math.min(100, Math.max(0, Math.round((progressInCurrentStep / stepRange) * 100)));
  }

  // Category breakdown
  const getCategoryStats = (cat: 'personal' | 'external' | 'electrician' | 'diagnostics' | 'maintenance', labelTh: string, labelEn: string, icon: string) => {
    const catLessons = allLessons.filter(l => (l.category === cat) || (l.pathId?.includes(cat)));
    const catCompleted = catLessons.filter(l => l.completed).length;
    const catTotal = catLessons.length || 4;
    return {
      completed: catCompleted,
      total: catTotal,
      percent: Math.round((catCompleted / catTotal) * 100),
      labelTh,
      labelEn,
      icon
    };
  };

  return {
    currentTier,
    nextTier,
    completedCount,
    totalCount,
    completionPercent,
    lessonsToNextTier,
    nextTierPercent,
    certificationPoints: totalCertificationPoints,
    bonusQuizPointsEarned: bonusQuizPoints,
    categoryBreakdown: {
      personal: getCategoryStats('personal', '🏠 ใช้ไฟฟ้าในบ้าน & อุปกรณ์', '🏠 Home Energy & Appliances', 'Home'),
      external: getCategoryStats('external', '⚡ ระบบสายส่ง & โซลาร์เซลล์', '⚡ Grid & Solar Systems', 'Sun'),
      electrician: getCategoryStats('electrician', '🛠️ ตู้ไฟ & มาตรฐาน มอก.', '🛠️ Distribution Panels & Wiring', 'Hammer'),
      diagnostics: getCategoryStats('diagnostics', '🔍 ตรวจซ่อม & วิเคราะห์วงจร', '🔍 Circuit Diagnostics & Testing', 'Activity'),
      maintenance: getCategoryStats('maintenance', '🔧 บำรุงรักษาเชิงป้องกัน & PM', '🔧 Advanced Maintenance & Asset PM', 'Wrench')
    }
  };
}
