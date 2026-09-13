import { EngineeringExamQuestion } from '../types';

export interface EngineeringFormula {
  id: string;
  categoryTh: string;
  categoryEn: string;
  nameTh: string;
  nameEn: string;
  formula: string;
  descriptionTh: string;
  descriptionEn: string;
  variables: { symbol: string; meaningTh: string; meaningEn: string; unit: string }[];
  standardNoteTh: string;
}

export const ELECTRICAL_ENGINEERING_FORMULAS: EngineeringFormula[] = [
  {
    id: 'single_phase_power',
    categoryTh: 'ระบบไฟฟ้ากระแสสลับ 1 เฟส',
    categoryEn: 'Single-Phase AC Power',
    nameTh: 'กำลังไฟฟ้าจริงและตัวประกอบกำลัง (Active & Reactive Power)',
    nameEn: 'Active, Reactive & Apparent Power',
    formula: 'P = V × I × cosθ | Q = V × I × sinθ | S = V × I = √(P² + Q²)',
    descriptionTh: 'การคำนวณกำลังไฟฟ้าจริง (W/kW), กำลังไฟฟ้ารีแอกทีฟ (VAR/kVAR) และกำลังไฟฟ้าปรากฏ (VA/kVA)',
    descriptionEn: 'Calculation of real power, reactive power, and apparent power in AC systems.',
    variables: [
      { symbol: 'P', meaningTh: 'กำลังไฟฟ้าจริง (Active Power)', meaningEn: 'Active / Real Power', unit: 'Watt (W) / kW' },
      { symbol: 'V', meaningTh: 'แรงดันไฟฟ้าระบบ (Voltage RMS)', meaningEn: 'RMS Voltage', unit: 'Volt (V)' },
      { symbol: 'I', meaningTh: 'กระแสไฟฟ้า (Current RMS)', meaningEn: 'RMS Current', unit: 'Ampere (A)' },
      { symbol: 'cosθ', meaningTh: 'ตัวประกอบกำลัง (Power Factor: PF)', meaningEn: 'Power Factor', unit: 'ไร้หน่วย (0.00 - 1.00)' },
      { symbol: 'Q', meaningTh: 'กำลังไฟฟ้ารีแอกทีฟ (Reactive Power)', meaningEn: 'Reactive Power', unit: 'VAR / kVAR' },
      { symbol: 'S', meaningTh: 'กำลังไฟฟ้าปรากฏ (Apparent Power)', meaningEn: 'Apparent Power', unit: 'VA / kVA' }
    ],
    standardNoteTh: 'ตามข้อกำหนด กฟน./กฟภ. ค่า PF เฉลี่ยต้องไม่ต่ำกว่า 0.85 หากต่ำกว่าจะถูกเรียกเก็บค่า kVAR ส่วนเกิน (อัตราค่าปรับ kVAR)'
  },
  {
    id: 'three_phase_power',
    categoryTh: 'ระบบไฟฟ้า 3 เฟส 4 สาย',
    categoryEn: 'Three-Phase 4-Wire System',
    nameTh: 'กำลังไฟฟ้าระบบ 3 เฟสสมดุล (Balanced 3-Phase Power)',
    nameEn: 'Balanced 3-Phase Power Calculation',
    formula: 'P₃ᵩ = √3 × V_LL × I_L × cosθ = 3 × V_LN × I_P × cosθ',
    descriptionTh: 'การคำนวณกำลังไฟฟ้าระบบ 3 เฟส 4 สาย แรงดันคู่สาย 380V (Line-to-Line) หรือแรงดันเทียบสายนิวทรัล 220V (Line-to-Neutral)',
    descriptionEn: 'Power in 3-phase 4-wire systems with line-to-line 380V or phase-to-neutral 220V.',
    variables: [
      { symbol: 'V_LL', meaningTh: 'แรงดันไฟฟ้าระหว่างสาย (Line-to-Line)', meaningEn: 'Line-to-Line Voltage', unit: '380 - 400 V' },
      { symbol: 'V_LN', meaningTh: 'แรงดันระหว่างสายเทียบสายนิวทรัล', meaningEn: 'Line-to-Neutral Voltage', unit: '220 - 230 V' },
      { symbol: 'I_L', meaningTh: 'กระแสไฟฟ้ารายสาย (Line Current)', meaningEn: 'Line Current', unit: 'Ampere (A)' },
      { symbol: 'I_N', meaningTh: 'กระแสในสายนิวทรัล (เวกเตอร์ผลรวม)', meaningEn: 'Neutral current: I_A + I_B + I_C', unit: 'Ampere (A)' }
    ],
    standardNoteTh: 'วสท. 022013-59: เมื่อโหลดแต่ละเฟสไม่สมดุล (Unbalanced Load) กระแสจะไม่หักล้างเป็นศูนย์และไหลกลับผ่านสายนิวทรัล'
  },
  {
    id: 'voltage_drop',
    categoryTh: 'การคำนวณสายและแรงดันตก',
    categoryEn: 'Voltage Drop & Cable Sizing',
    nameTh: 'การคำนวณแรงดันตกในสายไฟฟ้า (Voltage Drop Equation)',
    nameEn: 'Conductor Voltage Drop Formula',
    formula: 'V_drop (1φ) = (2 × I × L × R) / 1000 | V_drop (3φ) = (√3 × I × L × R) / 1000',
    descriptionTh: 'แรงดันตกในสายไฟฟ้าเนื่องจากความต้านทานตัวนำ R (โอห์ม/กม.) และระยะทางสาย L (เมตร)',
    descriptionEn: 'Calculation of voltage drop over cable run length and conductor resistance.',
    variables: [
      { symbol: 'I', meaningTh: 'กระแสใช้งานสูงสุดของโหลด', meaningEn: 'Load Current', unit: 'Ampere (A)' },
      { symbol: 'L', meaningTh: 'ระยะทางของสายไฟขาเดียว', meaningEn: 'One-way cable length', unit: 'เมตร (m)' },
      { symbol: 'R', meaningTh: 'ความต้านทานกระแสสลับของตัวนำ', meaningEn: 'Conductor AC resistance', unit: 'Ω/km' },
      { symbol: '%V_drop', meaningTh: 'เปอร์เซ็นต์แรงดันตกเทียบกับแรงดันระบุ', meaningEn: 'Percent voltage drop', unit: '% (เกณฑ์ ≤ 3% วงจรย่อย)' }
    ],
    standardNoteTh: 'มาตรฐาน วสท.: แรงดันตกในวงจรย่อยต้องไม่เกิน 3% และแรงดันตกรวมจากมิเตอร์ถึงจุดใช้งานปลายทางต้องไม่เกิน 5%'
  },
  {
    id: 'breaker_coordination',
    categoryTh: 'การประสานอุปกรณ์ป้องกัน',
    categoryEn: 'Protection Coordination & MCB',
    nameTh: 'ลักษณะเส้นโค้งการตัดวงจรเบรกเกอร์ (MCB Trip Curves B, C, D)',
    nameEn: 'Miniature Circuit Breaker Trip Characteristics',
    formula: 'Curve B: 3 - 5 In | Curve C: 5 - 10 In | Curve D: 10 - 20 In | I_fault ≥ I_cu',
    descriptionTh: 'การเลือกประเภทเส้นโค้งตัดวงจรปลดปล่อยสนามแม่เหล็ก (Magnetic Trip) ให้ทนกระแสกระชากขณะสตาร์ตโหลดได้โดยไม่ทริปผิดพลาด',
    descriptionEn: 'Selection of instantaneous magnetic trip curves based on inrush multiplier.',
    variables: [
      { symbol: 'In', meaningTh: 'พิกัดกระแสใช้งานต่อเนื่อง (Rated Current)', meaningEn: 'Rated nominal current', unit: 'Ampere (A)' },
      { symbol: 'I_cu', meaningTh: 'พิกัดตัดกระแสลัดวงจรสูงสุด (Breaking Capacity)', meaningEn: 'Ultimate breaking capacity', unit: 'kA (e.g. 6kA, 10kA)' },
      { symbol: 'I_Δn', meaningTh: 'พิกัดกระแสไฟฟ้ารั่วของ RCBO สำหรับคุ้มครองบุคคล', meaningEn: 'Residual operating current', unit: '30 mA (ตัดใน ≤40ms)' }
    ],
    standardNoteTh: 'มอก. 909-2548: อุปกรณ์ RCBO คุ้มครองชีวิตในห้องน้ำ เต้ารับภายนอก และเครื่องทำน้ำอุ่น ต้องไม่เกิน 30mA ตัดภายใน 0.04 วินาที'
  },
  {
    id: 'grounding_fault_loop',
    categoryTh: 'ระบบต่อลงดินและความปลอดภัย',
    categoryEn: 'Grounding & Earth Fault Loop',
    nameTh: 'อิมพีแดนซ์วงรอบฟอลต์ลงดินและความต้านทานดิน (Earth Loop Impedance)',
    nameEn: 'Earth Fault Loop Impedance Zs Condition',
    formula: 'Zs ≤ U₀ / Ia | R_ground ≤ 5 Ω',
    descriptionTh: 'เงื่อนไขการตัดไฟอัตโนมัติเมื่อเกิดฟอลต์ลงดิน เพื่อไม่ให้เกิดแรงดันสัมผัส (Touch Voltage) เกิน 50V ปลอดภัยต่อมนุษย์',
    descriptionEn: 'Safety condition for automatic disconnection of supply under earth fault condition.',
    variables: [
      { symbol: 'Zs', meaningTh: 'อิมพีแดนซ์วงรอบฟอลต์ทั้งหมด (Loop Impedance)', meaningEn: 'Total earth fault loop impedance', unit: 'Ohm (Ω)' },
      { symbol: 'U₀', meaningTh: 'แรงดันไฟฟ้าระบบเทียบดินระบุ (220V)', meaningEn: 'Nominal AC voltage to earth', unit: 'Volt (220V)' },
      { symbol: 'Ia', meaningTh: 'กระแสที่ทำให้เบรกเกอร์ปลดวงจรในเวลาที่กำหนด (≤0.4s)', meaningEn: 'Trip current causing disconnection ≤0.4s', unit: 'Ampere (A)' },
      { symbol: 'R_ground', meaningTh: 'ความต้านทานของหลักดินต่อดิน', meaningEn: 'Earth electrode resistance', unit: 'Ohm (≤ 5 Ω)' }
    ],
    standardNoteTh: 'การไฟฟ้านครหลวงและส่วนภูมิภาคกำหนด: แท่งหลักดินทองแดงเส้นผ่านศูนย์กลาง ≥ 5/8 นิ้ว ยาว ≥ 2.4 เมตร ความต้านทานดินไม่เกิน 5 โอห์ม'
  },
  {
    id: 'power_quality_harmonics',
    categoryTh: 'คุณภาพไฟฟ้าและฮาร์มอนิก',
    categoryEn: 'Harmonics & Power Quality',
    nameTh: 'ความเพี้ยนฮาร์มอนิกรวม (Total Harmonic Distortion: THD)',
    nameEn: 'Total Harmonic Distortion (IEEE 519 Standard)',
    formula: 'THD_V = √(∑ V_n² / V₁²) × 100% | I_N (Triplen 3rd) = 3 × I_h3',
    descriptionTh: 'ฮาร์มอนิกอันดับคูณของ 3 (Triplen: 3rd, 9th, 15th) ไหลเสริมกันในสายนิวทรัล ไม่หักล้าง ทำให้สายนิวทรัลร้อนจัดเกินพิกัด',
    descriptionEn: 'Triplen harmonics sum in the neutral conductor, creating dangerous neutral overcurrents.',
    variables: [
      { symbol: 'THD_V', meaningTh: 'ความเพี้ยนฮาร์มอนิกรวมของแรงดัน', meaningEn: 'Voltage THD', unit: '% (เกณฑ์มาตรฐาน ≤ 5%)' },
      { symbol: 'THD_I', meaningTh: 'ความเพี้ยนฮาร์มอนิกรวมของกระแส', meaningEn: 'Current THD', unit: '% (เกณฑ์ทั่วไป ≤ 15%)' },
      { symbol: 'V_n', meaningTh: 'ขนาดแรงดันฮาร์มอนิกลำดับที่ n', meaningEn: 'Harmonic voltage component n', unit: 'Volt (V)' },
      { symbol: 'V₁', meaningTh: 'ขนาดแรงดันความถี่หลักมูลฐาน 50Hz', meaningEn: 'Fundamental 50Hz voltage', unit: 'Volt (V)' }
    ],
    standardNoteTh: 'มาตรฐาน IEEE 519-2022 และ กฟน.: THD-V ณ จุดเชื่อมต่อ (PCC) ต้องไม่เกิน 5% และแต่ละฮาร์มอนิกเดี่ยวต้องไม่เกิน 3%'
  }
];

export const ELECTRICAL_ENGINEERING_EXAM_QUESTIONS: EngineeringExamQuestion[] = [
  // =========================================================================
  // TIER 1: FUNDAMENTAL ELECTRICAL MATH & POWER FACTOR
  // =========================================================================
  {
    id: 'exam_q1_pf_correction',
    tier: 1,
    tierBadgeTh: 'ระดับ 1: พื้นฐานการคำนวณวิศวกรรมไฟฟ้า',
    tierBadgeEn: 'Tier 1: Fundamental Electrical Calculations',
    category: 'ac_power',
    categoryNameTh: 'กำลังไฟฟ้าและตัวประกอบกำลัง (AC Power & PF)',
    categoryNameEn: 'AC Power & Power Factor',
    titleTh: 'การคำนวณหากระแสและขนาด Capacitor Bank ปรับปรุง Power Factor',
    titleEn: 'Load Current & Capacitor Bank Sizing for PF Correction',
    standardRef: 'ข้อกำหนดการไฟฟ้านครหลวง (กฟน.) และ กฟภ. เรื่องค่าเพาเวอร์แฟกเตอร์',
    formulaUsed: 'P = V × I × cosθ₁ | Qc = P × (tanθ₁ - tanθ₂)',
    scenarioTh: 'โรงงานขนาดเล็กแห่งหนึ่งใช้ไฟฟ้า 1 เฟส 220V ต่อใช้งานมอเตอร์เหนี่ยวนำรวมขนาดกำลังจริง P = 11 kW มีค่า Power Factor เดิม cosθ₁ = 0.70 Lagging เจ้าของกิจการต้องการติดตั้ง Capacitor Bank เพื่อปรับปรุงค่า PF ให้เป็น 0.95 Lagging เพื่อไม่ให้ถูกคิดค่าปรับ kVAR จากการไฟฟ้า',
    scenarioEn: 'A workshop on 220V single-phase runs inductive motor load P = 11 kW at PF = 0.70 Lagging. Sizing a capacitor bank to reach PF = 0.95 Lagging.',
    givenData: [
      { labelTh: 'แรงดันไฟฟ้าใช้งาน (V)', labelEn: 'Voltage (V)', value: '220 V (1 Phase)' },
      { labelTh: 'กำลังไฟฟ้าจริง (P)', labelEn: 'Active Power (P)', value: '11 kW = 11,000 W' },
      { labelTh: 'ตัวประกอบกำลังเดิม (cosθ₁)', labelEn: 'Initial PF (cosθ₁)', value: '0.70 Lagging (θ₁ ≈ 45.57°)' },
      { labelTh: 'ตัวประกอบกำลังเป้าหมาย (cosθ₂)', labelEn: 'Target PF (cosθ₂)', value: '0.95 Lagging (θ₂ ≈ 18.19°)' }
    ],
    questionTh: 'จงคำนวณหากระแสเดิมของระบบ (I₁) และขนาดของคาปาซิเตอร์ (Qc) ในหน่วย kVAR ที่ต้องติดตั้งเพิ่มตามลำดับ',
    questionEn: 'Calculate the initial load current (I₁) and the required capacitor bank rating (Qc) in kVAR.',
    optionsTh: [
      'กระแสเดิม I₁ = 71.4 A, ขนาดคาปาซิเตอร์ Qc = 7.6 kVAR',
      'กระแสเดิม I₁ = 50.0 A, ขนาดคาปาซิเตอร์ Qc = 4.2 kVAR',
      'กระแสเดิม I₁ = 85.0 A, ขนาดคาปาซิเตอร์ Qc = 11.2 kVAR',
      'กระแสเดิม I₁ = 32.5 A, ขนาดคาปาซิเตอร์ Qc = 3.6 kVAR'
    ],
    optionsEn: [
      'Initial current I₁ = 71.4 A, Capacitor Qc = 7.6 kVAR',
      'Initial current I₁ = 50.0 A, Capacitor Qc = 4.2 kVAR',
      'Initial current I₁ = 85.0 A, Capacitor Qc = 11.2 kVAR',
      'Initial current I₁ = 32.5 A, Capacitor Qc = 3.6 kVAR'
    ],
    correctIndex: 0,
    detailedSolutionTh: [
      'ขั้นตอนที่ 1: คำนวณหากระแสเดิมจากสมการ P = V × I₁ × cosθ₁ ➔ I₁ = P / (V × cosθ₁)',
      'แทนค่า: I₁ = 11,000 / (220 × 0.70) = 11,000 / 154 = 71.43 A',
      'ขั้นตอนที่ 2: คำนวณหามุมเฟสและค่า tanθ: θ₁ = arccos(0.70) = 45.57° ➔ tan(45.57°) = 1.020',
      'มุมเฟสเป้าหมาย: θ₂ = arccos(0.95) = 18.19° ➔ tan(18.19°) = 0.329',
      'ขั้นตอนที่ 3: คำนวณหากำลังไฟฟ้ารีแอกทีฟของคาปาซิเตอร์: Qc = P × (tanθ₁ - tanθ₂)',
      'แทนค่า: Qc = 11 kW × (1.020 - 0.329) = 11 × 0.691 = 7.60 kVAR',
      'สรุปผล: กระแสในสายลดลงจาก 71.4 A เหลือเพียง 52.6 A เมื่อปรับ PF เป็น 0.95 ช่วยลดการสูญเสีย I²R ในสายไฟได้อย่างมาก'
    ],
    detailedSolutionEn: [
      'Step 1: Calculate initial current I₁ = P / (V × cosθ₁) = 11,000 / (220 × 0.70) = 71.43 A',
      'Step 2: Find tanθ values: θ₁ = arccos(0.70) = 45.57° -> tanθ₁ = 1.020; θ₂ = arccos(0.95) = 18.19° -> tanθ₂ = 0.329',
      'Step 3: Required capacitor Qc = P × (tanθ₁ - tanθ₂) = 11 × (1.020 - 0.329) = 7.60 kVAR'
    ],
    engineeringPrincipleTh: 'การปรับปรุง Power Factor ช่วยลดกระแสปรากฏ (Apparent Current) ในสายส่ง ทำให้สายไฟและหม้อแปลงไม่ร้อนเกินพิกัด ลดค่าแรงดันตก และหลีกเลี่ยงการถูกเรียกเก็บค่ากำลังไฟฟ้ารีแอกทีฟ (kVAR surcharge) เกินเกณฑ์ 0.85',
    engineeringPrincipleEn: 'Power factor correction relieves thermal stress on distribution transformers and eliminates utility kVAR penalties.'
  },

  // =========================================================================
  // TIER 2: THREE-PHASE POWER & NEUTRAL CURRENT
  // =========================================================================
  {
    id: 'exam_q2_three_phase_unbalance',
    tier: 2,
    tierBadgeTh: 'ระดับ 2: ระบบไฟฟ้า 3 เฟสและสายนิวทรัล',
    tierBadgeEn: 'Tier 2: Three-Phase 4-Wire & Neutral Dynamics',
    category: 'three_phase',
    categoryNameTh: 'ระบบไฟฟ้า 3 เฟส 4 สาย (3-Phase 4-Wire Power)',
    categoryNameEn: '3-Phase Systems & Load Balancing',
    titleTh: 'การคำนวณกำลังไฟฟ้ารวมและกระแสในสายนิวทรัลระบบ 3 เฟส',
    titleEn: 'Total 3-Phase Power & Neutral Conductor Current Vector Sum',
    standardRef: 'มาตรฐานการติดตั้งทางไฟฟ้าสำหรับประเทศไทย (วสท. 022013-59) บทที่ 3',
    formulaUsed: 'P_total = P_A + P_B + P_C | I_N = I_A∠0° + I_B∠-120° + I_C∠+120°',
    scenarioTh: 'อาคารเรียนรวมหลังหนึ่งรับไฟฟ้าระบบ 3 เฟส 4 สาย 380V/220V 50Hz ช่างไฟฟ้าตรวจวัดกระแสโหลดความต้านทานบริสุทธิ์ (Pure Resistive, PF = 1.0) ในแต่ละเฟสได้ดังนี้: เฟส A กินกระแส I_A = 60 A, เฟส B กินกระแส I_B = 60 A และเฟส C ไม่ได้เปิดใช้งาน (I_C = 0 A)',
    scenarioEn: 'A campus facility feeds single-phase resistive loads on a 380/220V system: Phase A = 60A, Phase B = 60A, Phase C = 0A (PF = 1.0).',
    givenData: [
      { labelTh: 'แรงดันไฟฟ้าระหว่างเฟสกับนิวทรัล (V_LN)', labelEn: 'Phase Voltage (V_LN)', value: '220 V' },
      { labelTh: 'กระแสเฟส A (I_A)', labelEn: 'Phase A Current', value: '60 A ∠0°' },
      { labelTh: 'กระแสเฟส B (I_B)', labelEn: 'Phase B Current', value: '60 A ∠-120°' },
      { labelTh: 'กระแสเฟส C (I_C)', labelEn: 'Phase C Current', value: '0 A' },
      { labelTh: 'ตัวประกอบกำลังของโหลด (PF)', labelEn: 'Power Factor', value: '1.0 (Resistive)' }
    ],
    questionTh: 'จงคำนวณหากำลังไฟฟ้ารวมของระบบ (P_total) และขนาดของกระแสไฟฟ้าที่จะไหลกลับผ่านสายนิวทรัล (I_N)',
    questionEn: 'Determine total active power (P_total) and the magnitude of current in the neutral conductor (I_N).',
    optionsTh: [
      'กำลังไฟฟ้ารวม P_total = 26.4 kW, กระแสนิวทรัล I_N = 60 A',
      'กำลังไฟฟ้ารวม P_total = 39.6 kW, กระแสนิวทรัล I_N = 120 A',
      'กำลังไฟฟ้ารวม P_total = 13.2 kW, กระแสนิวทรัล I_N = 0 A',
      'กำลังไฟฟ้ารวม P_total = 26.4 kW, กระแสนิวทรัล I_N = 84.8 A'
    ],
    optionsEn: [
      'Total power P_total = 26.4 kW, Neutral current I_N = 60 A',
      'Total power P_total = 39.6 kW, Neutral current I_N = 120 A',
      'Total power P_total = 13.2 kW, Neutral current I_N = 0 A',
      'Total power P_total = 26.4 kW, Neutral current I_N = 84.8 A'
    ],
    correctIndex: 0,
    detailedSolutionTh: [
      'ขั้นตอนที่ 1: กำลังไฟฟ้าในแต่ละเฟส = V_LN × I_phase × cosθ',
      'P_A = 220 V × 60 A × 1.0 = 13,200 W = 13.2 kW',
      'P_B = 220 V × 60 A × 1.0 = 13,200 W = 13.2 kW',
      'P_C = 0 W',
      'กำลังไฟฟ้ารวม P_total = 13.2 + 13.2 + 0 = 26.4 kW',
      'ขั้นตอนที่ 2: คำนวณเวกเตอร์กระแสสายนิวทรัล: I_N = I_A∠0° + I_B∠-120° + I_C∠120°',
      'แกนจริง (Real): 60 × cos(0°) + 60 × cos(-120°) = 60 × 1 + 60 × (-0.5) = 60 - 30 = 30 A',
      'แกนจินตภาพ (Imag): 60 × sin(0°) + 60 × sin(-120°) = 0 + 60 × (-0.866) = -51.96 A',
      'ขนาดกระแส |I_N| = √(30² + (-51.96)²) = √(900 + 2,700) = √3,600 = 60 A',
      'ข้อสังเกตสำคัญ: เมื่อโหลด 2 เฟสเท่ากัน (60A) และอีกเฟสเป็น 0A ขนาดกระแสในสายนิวทรัลจะเท่ากับ 60A พอดี!'
    ],
    detailedSolutionEn: [
      'Step 1: P_total = (220 × 60) + (220 × 60) + 0 = 26.4 kW',
      'Step 2: Vector sum: I_N = 60∠0° + 60∠-120° + 0',
      'Real = 60(1) + 60(-0.5) = 30; Imag = 60(0) + 60(-0.866) = -51.96',
      'Magnitude |I_N| = √(30² + 51.96²) = √3600 = 60 A'
    ],
    engineeringPrincipleTh: 'ตามมาตรฐาน วสท. ห้ามลดขนาดสายนิวทรัลให้เล็กกว่าสายเฟสในวงจรย่อยที่มีโหลดไม่สมดุลสูงหรือโหลดอิเล็กทรอนิกส์ เพราะกระแสนิวทรัลสามารถสูงเทียบเท่าหรือสูงกว่ากระแสสายเฟสได้',
    engineeringPrincipleEn: 'Neutral conductors must never be undersized in circuits prone to high load unbalance or non-linear loads.'
  },

  // =========================================================================
  // TIER 3: VOLTAGE DROP & CONDUCTOR SIZING (วสท. & มอก. 11-2553)
  // =========================================================================
  {
    id: 'exam_q3_voltage_drop_sizing',
    tier: 3,
    tierBadgeTh: 'ระดับ 3: การคำนวณแรงดันตกและขนาดสายไฟ',
    tierBadgeEn: 'Tier 3: Voltage Drop Engineering & Conductor Sizing',
    category: 'voltage_drop',
    categoryNameTh: 'แรงดันตกในสายไฟฟ้า (Voltage Drop Analysis)',
    categoryNameEn: 'Voltage Drop & Cable Sizing',
    titleTh: 'การคำนวณแรงดันตกในสายทองแดงระยะไกลตามมาตรฐาน วสท.',
    titleEn: 'Long-Run Copper Cable Voltage Drop per Thai EIT Standards',
    standardRef: 'มาตรฐาน วสท. 022013-59 ตารางที่ 5-20 และข้อกำหนดแรงดันตกไม่เกิน 3%',
    formulaUsed: 'V_drop = (2 × I × L × R) / 1000 | %V_drop = (V_drop / V_nom) × 100%',
    scenarioTh: 'ต้องการเดินสายเมนย่อย 1 เฟส 220V จากตู้ MDB ของอาคารไปยังโรงสูบน้ำระยะทาง L = 80 เมตร กระแสโหลดต่อเนื่อง I = 32 A ช่างไฟเลือกใช้สายทองแดงหุ้มฉนวน PVC ขนาด 6 sq.mm. (ค่าความต้านทานกระแสสลับ R = 3.69 Ω/km ที่ 75°C)',
    scenarioEn: 'Sizing a 220V single-phase sub-main feeder over L = 80 meters for a continuous pump load I = 32 A using 6 sq.mm. copper cable (R = 3.69 Ω/km).',
    givenData: [
      { labelTh: 'แรงดันไฟฟ้าระบบ (V_nom)', labelEn: 'Nominal Voltage', value: '220 V (1 Phase)' },
      { labelTh: 'กระแสโหลดใช้งาน (I)', labelEn: 'Load Current', value: '32 A' },
      { labelTh: 'ระยะทางสายทางเดียว (L)', labelEn: 'One-Way Distance', value: '80 m' },
      { labelTh: 'ความต้านทานสาย 6 sq.mm. (R)', labelEn: 'Conductor Resistance', value: '3.69 Ω/km' },
      { labelTh: 'เกณฑ์แรงดันตกสูงสุดมาตรฐาน วสท.', labelEn: 'EIT Max Limit', value: 'ไม่เกิน 3.0% (≤ 6.6 V)' }
    ],
    questionTh: 'จงคำนวณหาค่าแรงดันตก (V_drop) ในหน่วยโวลต์, เปอร์เซ็นต์แรงดันตก (%V_drop) และวิเคราะห์ว่าสายขนาด 6 sq.mm. ผ่านมาตรฐาน วสท. หรือไม่?',
    questionEn: 'Calculate the voltage drop in Volts, percentage drop, and assess whether the 6 sq.mm. cable complies with the EIT 3% standard.',
    optionsTh: [
      'แรงดันตก V_drop = 18.9 V (8.59%) ➔ ไม่ผ่านเกณฑ์มาตรฐาน (ต้องเพิ่มขนาดสายเป็น 16-25 sq.mm.)',
      'แรงดันตก V_drop = 9.45 V (4.30%) ➔ ผ่านเกณฑ์มาตรฐานพอดี',
      'แรงดันตก V_drop = 5.20 V (2.36%) ➔ ผ่านเกณฑ์มาตรฐานสมบูรณ์',
      'แรงดันตก V_drop = 2.88 V (1.31%) ➔ ผ่านเกณฑ์มาตรฐานสมบูรณ์'
    ],
    optionsEn: [
      'V_drop = 18.9 V (8.59%) -> FAILS standard (Must upsize to 16-25 sq.mm.)',
      'V_drop = 9.45 V (4.30%) -> Passes standard borderline',
      'V_drop = 5.20 V (2.36%) -> Passes standard completely',
      'V_drop = 2.88 V (1.31%) -> Passes standard completely'
    ],
    correctIndex: 0,
    detailedSolutionTh: [
      'ขั้นตอนที่ 1: คำนวณหาค่าแรงดันตกจากสูตร 1 เฟส: V_drop = (2 × I × L × R) / 1000',
      'แทนค่าตัวเลข: V_drop = (2 × 32 A × 80 m × 3.69 Ω/km) / 1000',
      'V_drop = (5,120 × 3.69) / 1000 = 18,892.8 / 1000 = 18.89 V ≈ 18.9 V',
      'ขั้นตอนที่ 2: คำนวณเปอร์เซ็นต์แรงดันตก: %V_drop = (18.89 / 220) × 100% = 8.59%',
      'ขั้นตอนที่ 3: ตรวจสอบกับเกณฑ์มาตรฐาน วสท. 022013-59:',
      'เกณฑ์กำหนดให้แรงดันตกในวงจรสายป้อนไม่ควรเกิน 3.0% (6.6 V)',
      'เนื่องจาก 8.59% > 3.0% อย่างมีนัยสำคัญ จึงทำให้มอเตอร์ปั๊มน้ำปลายสายร้อนจัด แรงบิดตก และขดลวดอาจไหม้ได้',
      'วิธีแก้: หากเปลี่ยนเป็นสายขนาด 25 sq.mm. (R ≈ 0.884 Ω/km) จะได้ V_drop = 4.53 V (2.06%) ซึ่งผ่านเกณฑ์ฉลุย'
    ],
    detailedSolutionEn: [
      'Step 1: V_drop = (2 × I × L × R) / 1000 = (2 × 32 × 80 × 3.69) / 1000 = 18.89 V',
      'Step 2: %V_drop = (18.89 / 220) × 100% = 8.59%',
      'Step 3: Standard limit is ≤ 3.0% (6.6V). 8.59% exceeds allowable limit and causes severe motor torque loss.'
    ],
    engineeringPrincipleTh: 'แม้ว่าสาย 6 sq.mm. จะทนพิกัดกระแส (Ampacity) 32A ได้ในระยะสั้นๆ แต่เมื่อระยะทางไกล (80m) แรงดันตกจะเป็นตัวกำหนดขนาดสาย (Voltage Drop Dictates Cable Sizing) เสมอ',
    engineeringPrincipleEn: 'Conductor sizing on long runs is governed by voltage drop rather than thermal ampacity.'
  },

  // =========================================================================
  // TIER 4: CIRCUIT BREAKER COORDINATION & RCBO SENSITIVITY
  // =========================================================================
  {
    id: 'exam_q4_mcb_tripping_curves',
    tier: 2,
    tierBadgeTh: 'ระดับ 2: อุปกรณ์ป้องกันและการประสานงานวงจร',
    tierBadgeEn: 'Tier 2: Protection Coordination & Trip Curves',
    category: 'breaker_protection',
    categoryNameTh: 'เซอร์กิตเบรกเกอร์และ RCBO (Breaker Characteristics)',
    categoryNameEn: 'Circuit Breaker Coordination',
    titleTh: 'การเลือกประเภทเส้นโค้งตัดวงจร (MCB Curve B vs C vs D) และ RCBO',
    titleEn: 'MCB Tripping Characteristic Curve Selection (Curve B vs C vs D)',
    standardRef: 'มอก. 909-2548, มอก. 1436-2540 และมาตรฐาน IEC 60898-1',
    formulaUsed: 'Curve B: 3 - 5 In | Curve C: 5 - 10 In | Curve D: 10 - 20 In',
    scenarioTh: 'วิศวกรกำลังออกแบบตู้ย่อย Consumer Unit สำหรับอาคารแห่งหนึ่ง ซึ่งมีวงจรย่อย 3 ประเภท: 1. วงจรแสงสว่าง LED และเต้าเสียบฮีตเตอร์ต้มน้ำ, 2. วงจรแอร์ปรับอากาศขนาดใหญ่ที่มีมอเตอร์คอมเพรสเซอร์ Fixed-Speed, 3. วงจรหม้อแปลง Step-down และมอเตอร์โรงซ่อมที่มีกระแสสตาร์ตสูงมาก (High Inrush Current 12 เท่า)',
    scenarioEn: 'Selecting optimal MCB tripping curves (B, C, or D) for lighting/heaters, residential air conditioners, and high-inrush industrial motor starters.',
    givenData: [
      { labelTh: 'โหลดประเภทที่ 1', labelEn: 'Load Type 1', value: 'แสงสว่าง LED & ขดลวดความร้อน (Resistive / Low Inrush)' },
      { labelTh: 'โหลดประเภทที่ 2', labelEn: 'Load Type 2', value: 'เครื่องปรับอากาศ & ตู้เย็น (Moderate Inrush 5-7 In)' },
      { labelTh: 'โหลดประเภทที่ 3', labelEn: 'Load Type 3', value: 'มอเตอร์อุตสาหกรรม & หม้อแปลง (Heavy Inrush 12-15 In)' }
    ],
    questionTh: 'จงจับคู่ชนิดของเส้นโค้งเบรกเกอร์ (Trip Curve) สำหรับโหลดที่ 1, 2 และ 3 ตามลำดับให้ถูกต้องและป้องกันได้อย่างปลอดภัยที่สุด',
    questionEn: 'Correctly match the MCB trip curves for loads 1, 2, and 3 to prevent nuisance tripping while ensuring protection.',
    optionsTh: [
      'โหลดที่ 1: Curve B | โหลดที่ 2: Curve C | โหลดที่ 3: Curve D',
      'โหลดที่ 1: Curve D | โหลดที่ 2: Curve C | โหลดที่ 3: Curve B',
      'โหลดที่ 1: Curve C | โหลดที่ 2: Curve B | โหลดที่ 3: Curve D',
      'โหลดที่ 1: Curve C | โหลดที่ 2: Curve C | โหลดที่ 3: Curve C (เหมือนกันทั้งหมด)'
    ],
    optionsEn: [
      'Load 1: Curve B | Load 2: Curve C | Load 3: Curve D',
      'Load 1: Curve D | Load 2: Curve C | Load 3: Curve B',
      'Load 1: Curve C | Load 2: Curve B | Load 3: Curve D',
      'Load 1: Curve C | Load 2: Curve C | Load 3: Curve C (Universal)'
    ],
    correctIndex: 0,
    detailedSolutionTh: [
      'Curve B (ตัดปลดแม่เหล็กที่ 3 - 5 เท่าของ In): เหมาะที่สุดสำหรับโหลดความต้านทานบริสุทธิ์ (Heater) หรือสายไฟระยะทางยาว เพราะต้องการให้ตัดกระแสลัดวงจรได้อย่างรวดเร็วมากเมื่อเกิดฟอลต์',
      'Curve C (ตัดปลดแม่เหล็กที่ 5 - 10 เท่าของ In): เป็นมาตรฐานสากลสำหรับบ้านพักอาศัยและอาคารพาณิชย์ เหมาะสำหรับโหลดมอเตอร์แอร์, พัดลม, ตู้เย็น ที่มีกระแส Inrush เริ่มต้นปานกลางโดยไม่ทริปผิดพลาด (Nuisance Tripping)',
      'Curve D (ตัดปลดแม่เหล็กที่ 10 - 20 เท่าของ In): ออกแบบมาเฉพาะสำหรับโหลดที่มีกระแสกระชากสูงมาก เช่น มอเตอร์ขนาดใหญ่, หม้อแปลงควบคุม, ตู้เชื่อมอินเวอร์เตอร์ ซึ่งจะไม่ทริปในจังหวะสตาร์ต 10-15 เท่าของพิกัด',
      'ส่วนวงจรเต้ารับในห้องน้ำและจุดเปียกชื้น ต้องต่อผ่าน RCBO 30mA เพิ่มเติมเพื่อตัดไฟรั่วภายใน 0.04 วินาที'
    ],
    detailedSolutionEn: [
      'Curve B (3-5 In): Resistive heating and long cable runs.',
      'Curve C (5-10 In): General domestic loads and air-con compressors.',
      'Curve D (10-20 In): High inductive inrush such as industrial transformers and large motors.'
    ],
    engineeringPrincipleTh: 'การเลือกเคิร์ฟที่เหมาะสมช่วยแก้ปัญหาเบรกเกอร์ทริปเองตอนสตาร์ตแอร์ (False Tripping) ขณะที่ยังคงรักษาการตัดวงจรเมื่อเกิดไฟฟ้าลัดวงจรได้อย่างปลอดภัยตามมาตรฐาน IEC 60898',
    engineeringPrincipleEn: 'Proper trip curve selection prevents false starting trips while preserving rapid magnetic fault clearing.'
  },

  // =========================================================================
  // TIER 5: GROUNDING & EARTH LOOP IMPEDANCE
  // =========================================================================
  {
    id: 'exam_q5_grounding_touch_voltage',
    tier: 3,
    tierBadgeTh: 'ระดับ 3: ระบบต่อลงดินและความปลอดภัยไฟฟ้า',
    tierBadgeEn: 'Tier 3: Earthing Systems & Touch Voltage Safety',
    category: 'grounding',
    categoryNameTh: 'ระบบต่อลงดินและความต้านทานดิน (Grounding & Zs)',
    categoryNameEn: 'Grounding & Earth Loop Impedance',
    titleTh: 'เงื่อนไขการตัดวงจรอัตโนมัติเมื่อเกิดฟอลต์ลงดิน (Earth Fault Disconnection)',
    titleEn: 'Earth Fault Automatic Disconnection Condition Zs ≤ U₀ / Ia',
    standardRef: 'มาตรฐาน วสท. 022013-59 บทที่ 4 และมาตรฐาน IEC 60364-4-41',
    formulaUsed: 'Zs ≤ U₀ / Ia | U_touch ≤ 50 V AC',
    scenarioTh: 'วงจรย่อย 1 เฟส 220V วงจรหนึ่งใช้เบรกเกอร์ MCB 20A Type C (พิกัดกระแสปลดปล่อยแม่เหล็กทันที Ia = 10 × In = 200 A ตัดในเวลา ≤ 0.4 วินาที) ผู้ตรวจสอบใช้เครื่อง Loop Impedance Tester วัดค่าอิมพีแดนซ์วงรอบฟอลต์ดินรวม (Zs) ได้ 1.45 โอห์ม',
    scenarioEn: 'A 220V circuit is protected by a 20A Type C MCB (Ia = 10 × In = 200 A for ≤ 0.4s trip). Measured earth fault loop impedance Zs = 1.45 Ω.',
    givenData: [
      { labelTh: 'แรงดันไฟฟ้าระบบเทียบดิน (U₀)', labelEn: 'Nominal Voltage to Earth', value: '220 V' },
      { labelTh: 'พิกัดเบรกเกอร์ (In)', labelEn: 'MCB Rating', value: '20 A Type C' },
      { labelTh: 'กระแสปลดวงจรทันที (Ia = 10 In)', labelEn: 'Instantaneous Magnetic Trip Ia', value: '200 A' },
      { labelTh: 'ค่า Zs ที่วัดได้จริงจากเครื่องมือ', labelEn: 'Measured Loop Impedance Zs', value: '1.45 Ω' }
    ],
    questionTh: 'จงคำนวณหาค่า Zs สูงสุดที่ยอมรับได้ (Zs_max) และวิเคราะห์ว่าวงจรนี้ปลอดภัยตามมาตรฐานสากล IEC 60364 / วสท. หรือไม่?',
    questionEn: 'Calculate the maximum allowable Zs (Zs_max) and evaluate if the installation complies with IEC 60364 / EIT safety standards.',
    optionsTh: [
      'Zs_max = 1.10 Ω ➔ ไม่ผ่านเกณฑ์ (ค่าที่วัดได้ 1.45 Ω สูงเกินไป ทำให้เบรกเกอร์ไม่ตัดในเวลา 0.4 วินาที ต้องติด RCD เพิ่ม)',
      'Zs_max = 2.20 Ω ➔ ผ่านเกณฑ์ปลอดภัยสมบูรณ์',
      'Zs_max = 5.00 Ω ➔ ผ่านเกณฑ์ปลอดภัยสมบูรณ์',
      'Zs_max = 0.50 Ω ➔ ไม่ผ่านเกณฑ์มาตรฐาน'
    ],
    optionsEn: [
      'Zs_max = 1.10 Ω -> FAILS criteria (1.45 Ω is too high, MCB cannot trip in 0.4s; must install RCD)',
      'Zs_max = 2.20 Ω -> Fully passes standard',
      'Zs_max = 5.00 Ω -> Fully passes standard',
      'Zs_max = 0.50 Ω -> Fails standard'
    ],
    correctIndex: 0,
    detailedSolutionTh: [
      'ขั้นตอนที่ 1: คำนวณหาค่าอิมพีแดนซ์วงรอบฟอลต์สูงสุดที่ยอมรับได้: Zs_max = U₀ / Ia',
      'แทนค่า: Zs_max = 220 V / 200 A = 1.10 Ω',
      'ขั้นตอนที่ 2: เปรียบเทียบกับค่าที่วัดได้จริง:',
      'ค่า Zs ที่วัดได้คือ 1.45 Ω ซึ่งมากกว่า Zs_max (1.10 Ω)',
      'ขั้นตอนที่ 3: วิเคราะห์ความเสี่ยงทางวิศวกรรม:',
      'เมื่อเกิดไฟรั่วลงโครงโลหะ กระแสฟอลต์จะเท่ากับ I_fault = 220 / 1.45 = 151.7 A',
      'เนื่องจากกระแส 151.7 A ต่ำกว่าพิกัดแม่เหล็ก 200 A ของเบรกเกอร์ ทำให้เบรกเกอร์ตัดวงจรช้ามาก (อาจใช้เวลาหลายวินาทีหรือหลายนาทีด้วยกลไกความร้อน)',
      'สิ่งนี้ทำให้มีแรงดันสัมผัสอันตรายค้างอยู่ที่ตัวถังเครื่องใช้ไฟฟ้า เสี่ยงไฟดูดเสียชีวิตได้ทันที',
      'วิธีแก้ไขทางวิศวกรรม: 1. ปรับปรุงสายดินและหลักดินให้ Zs ลดลงเหลือ < 1.10 Ω หรือ 2. ติดตั้งอุปกรณ์ตัดไฟรั่ว RCD/RCBO 30mA ซึ่งต้องการกระแสตัดไฟเพียง 0.03A เท่านั้น'
    ],
    detailedSolutionEn: [
      'Step 1: Zs_max = U₀ / Ia = 220 / 200 = 1.10 Ω',
      'Step 2: Compare with measured value: Zs_measured = 1.45 Ω > 1.10 Ω.',
      'Step 3: Fault current is only 220 / 1.45 = 151.7A, insufficient to trigger instant magnetic trip in ≤0.4s. An RCD must be installed.'
    ],
    engineeringPrincipleTh: 'กฎหมายความปลอดภัยสากล IEC 60364-4-41 บังคับให้ระบบตัดวงจรอัตโนมัติ (ADS) ภายใน 0.4 วินาที สำหรับวงจรเต้ารับ เพื่อกำจัดอันตรายจากแรงดันสัมผัส (Touch Voltage)',
    engineeringPrincipleEn: 'Automatic disconnection of supply (ADS) must occur within 0.4 seconds to eliminate lethal touch voltages.'
  },

  // =========================================================================
  // TIER 6: POWER QUALITY & HARMONICS (IEEE 519)
  // =========================================================================
  {
    id: 'exam_q6_harmonics_triplen_neutral',
    tier: 3,
    tierBadgeTh: 'ระดับ 3: คุณภาพไฟฟ้าและฮาร์มอนิกขั้นสูง',
    tierBadgeEn: 'Tier 3: Power Quality & Harmonics Spectrum',
    category: 'harmonics',
    categoryNameTh: 'ฮาร์มอนิกและคุณภาพไฟฟ้า (Harmonics & IEEE 519)',
    categoryNameEn: 'Harmonics Spectrum Analysis',
    titleTh: 'พฤติกรรมฮาร์มอนิกลำดับที่ 3 (Triplen Harmonics) ในสายนิวทรัล',
    titleEn: 'Triplen 3rd Harmonics Accumulation in the Neutral Conductor',
    standardRef: 'มาตรฐาน IEEE 519-2022 และข้อกำหนดคุณภาพไฟฟ้า กฟน./กฟภ.',
    formulaUsed: 'I_N(3rd) = I_A(3rd) + I_B(3rd) + I_C(3rd) = 3 × I_3rd',
    scenarioTh: 'ศูนย์คอมพิวเตอร์ Data Center 3 เฟส 380V/220V ต่อใช้งาน Server Switching Power Supply จำนวนมาก เกิดปัญหาหม้อแปลงและสายนิวทรัลร้อนจัดผิดปกติ เมื่อวิศวกรนำเครื่อง Power Quality Analyzer มาตรวจวัดพบว่า กระแสความถี่มูลฐาน 50Hz ในแต่ละเฟสสมดุลกันที่ 100 A แต่มีฮาร์มอนิกลำดับที่ 3 (150Hz) ปะปนอยู่ 40% ในทุกเฟส',
    scenarioEn: 'A 3-phase data center with server SMPS loads draws balanced fundamental 50Hz currents of 100A per phase, with 40% 3rd harmonic (150Hz) distortion.',
    givenData: [
      { labelTh: 'กระแสความถี่มูลฐานแต่ละเฟส (I_fund)', labelEn: 'Fundamental 50Hz Current', value: '100 A (Balanced)' },
      { labelTh: 'สัดส่วนฮาร์มอนิกลำดับที่ 3 (HD3)', labelEn: '3rd Harmonic Content', value: '40% ของความถี่มูลฐาน' },
      { labelTh: 'ขนาดกระแสฮาร์มอนิกที่ 3 แต่ละเฟส', labelEn: 'Single-phase 3rd harmonic', value: '100 A × 0.40 = 40 A' }
    ],
    questionTh: 'จงคำนวณหากระแสความถี่มูลฐาน 50Hz ในสายนิวทรัล (I_N,50Hz) และขนาดของกระแสฮาร์มอนิกลำดับที่ 3 ในสายนิวทรัล (I_N,150Hz) ตามลำดับ',
    questionEn: 'Calculate the fundamental 50Hz neutral current (I_N,50Hz) and the 3rd harmonic neutral current (I_N,150Hz).',
    optionsTh: [
      'กระแสนิวทรัล 50Hz = 0 A, กระแสนิวทรัล 150Hz = 120 A (สูงกว่ากระแสสายเฟส!)',
      'กระแสนิวทรัล 50Hz = 100 A, กระแสนิวทรัล 150Hz = 40 A',
      'กระแสนิวทรัล 50Hz = 0 A, กระแสนิวทรัล 150Hz = 0 A (หักล้างกันหมด)',
      'กระแสนิวทรัล 50Hz = 300 A, กระแสนิวทรัล 150Hz = 120 A'
    ],
    optionsEn: [
      'Neutral 50Hz = 0 A, Neutral 150Hz = 120 A (Exceeds phase current!)',
      'Neutral 50Hz = 100 A, Neutral 150Hz = 40 A',
      'Neutral 50Hz = 0 A, Neutral 150Hz = 0 A (Complete cancellation)',
      'Neutral 50Hz = 300 A, Neutral 150Hz = 120 A'
    ],
    correctIndex: 0,
    detailedSolutionTh: [
      'ขั้นตอนที่ 1: วิเคราะห์กระแสความถี่มูลฐาน 50Hz:',
      'เนื่องจากโหลด 3 เฟสสมดุลกัน (100A เท่ากันทั้ง 3 เฟส) เวกเตอร์ต่างมุมกัน 120° ผลรวมเวกเตอร์จะหักล้างกันหมดพอดี: I_N(50Hz) = 0 A',
      'ขั้นตอนที่ 2: วิเคราะห์ฮาร์มอนิกลำดับที่ 3 (150Hz) ซึ่งเป็น Triplen Harmonics:',
      'มุมเฟสของฮาร์มอนิกลำดับที่ 3: 3 × 0° = 0°, 3 × (-120°) = -360° = 0°, 3 × 120° = 360° = 0°',
      'จะเห็นว่าทั้ง 3 เฟสมีมุมเฟสตรงกัน (In-Phase / Zero-Sequence) ทำให้กระแสไม่หักล้างกัน แต่จะบวกกันทางพีชคณิตในสายนิวทรัล!',
      'I_N(3rd) = 40 A + 40 A + 40 A = 120 A',
      'ข้อสรุปทางวิศวกรรม: สายนิวทรัลต้องรับกระแสถึง 120A ทั้งๆ ที่กระแสเฟสมีเพียง 100A!',
      'นี่คือสาเหตุที่สายนิวทรัลและขดลวดหม้อแปลงไหม้เกรียม แก้ไขโดยการติดตั้ง Active Harmonic Filter (AHF) หรือใช้หม้อแปลง K-Factor 13-20'
    ],
    detailedSolutionEn: [
      'Step 1: Fundamental 50Hz is balanced, so vector sum in neutral is 0 A.',
      'Step 2: 3rd harmonics are zero-sequence, in-phase across all 3 phases (3 × 120° = 360° = 0°).',
      'They sum directly: I_N(3rd) = 40 + 40 + 40 = 120 A, exceeding the phase current rating!'
    ],
    engineeringPrincipleTh: 'ฮาร์มอนิกลำดับคี่ที่เป็นพหุคูณของ 3 (Triplen Harmonics: 3, 9, 15, 21...) มีคุณสมบัติเป็น Zero Sequence รวมกันในสายนิวทรัล ทำให้เกิดความร้อนสะสมรุนแรง',
    engineeringPrincipleEn: 'Triplen harmonics are zero-sequence components that add algebraically in the neutral conductor.'
  },

  // =========================================================================
  // TIER 7: SUBSTATION TRANSFORMER PREVENTIVE MAINTENANCE & DGA
  // =========================================================================
  {
    id: 'exam_q7_transformer_dga_dielectric',
    tier: 3,
    tierBadgeTh: 'ระดับ 3: การบำรุงรักษาเชิงป้องกันหม้อแปลงไฟฟ้า',
    tierBadgeEn: 'Tier 3: Transformer PM & Dissolved Gas Analysis',
    category: 'transformer_pm',
    categoryNameTh: 'การบำรุงรักษาหม้อแปลง (Substation Transformer PM)',
    categoryNameEn: 'Transformer Diagnostics & DGA',
    titleTh: 'การวิเคราะห์ก๊าซละลายในน้ำมันหม้อแปลง (DGA) และค่าความเป็นฉนวน',
    titleEn: 'Dissolved Gas Analysis (DGA) & Oil Dielectric Breakdown Voltage',
    standardRef: 'มาตรฐาน IEEE C57.104 และมาตรฐาน ASTM D877 / IEC 60156',
    formulaUsed: 'Duval Triangle | Breakdown Voltage ≥ 30 kV | Acetylene (C₂H₂) > 2 ppm ➔ Arcing',
    scenarioTh: 'ในระหว่างการตรวจเช็กประจำปีของหม้อแปลงจำหน่ายน้ำมันขนาด 1,000 kVA 22kV/400V ผลตรวจทางห้องแล็บพบค่าก๊าซละลายในน้ำมัน (DGA) ดังนี้: ก๊าซ Acetylene (C₂H₂) พุ่งสูงถึง 45 ppm, ไฮโดรเจน (H₂) = 180 ppm และผลการทดสอบความเป็นฉนวนน้ำมัน (Dielectric Breakdown Voltage ASTM D877) ได้ค่า 22 kV (จากเกณฑ์ขั้นต่ำ 30 kV)',
    scenarioEn: 'Annual oil testing of a 1,000 kVA 22kV transformer reveals Acetylene (C₂H₂) = 45 ppm, Hydrogen (H₂) = 180 ppm, and oil breakdown voltage = 22 kV.',
    givenData: [
      { labelTh: 'ก๊าซ Acetylene (C₂H₂)', labelEn: 'Acetylene Gas Level', value: '45 ppm (เกณฑ์ปกติ ≤ 1-2 ppm)' },
      { labelTh: 'ก๊าซ ไฮโดรเจน (H₂)', labelEn: 'Hydrogen Gas Level', value: '180 ppm' },
      { labelTh: 'ค่าความทนแรงดันน้ำมัน (Breakdown Voltage)', labelEn: 'Oil Breakdown Voltage', value: '22 kV (เกณฑ์ขั้นต่ำ ≥ 30 kV)' }
    ],
    questionTh: 'จากผล DGA และค่าความทนแรงดันดังกล่าว สื่อถึงความผิดปกติประเภทใดในหม้อแปลง และวิศวกรควรดำเนินการอย่างไรทันที?',
    questionEn: 'What type of internal fault is indicated by these DGA results and breakdown voltage, and what immediate action is required?',
    optionsTh: [
      'เกิดการอาร์กพลังงานสูงภายในขดลวด (High Energy Electrical Arcing) และน้ำมันมีความชื้นสูง ➔ ต้องหยุดใช้งานหม้อแปลงทันทีเพื่อตรวจเช็กขดลวดและกรองน้ำมัน',
      'เป็นเพียงความร้อนสะสมต่ำจากโหลดเกินชั่วคราว ➔ ให้ใช้งานต่อไปได้ตามปกติ',
      'สารดูดความชื้นซิลิกาเจลทำงานได้ดี ➔ ไม่มีความผิดปกติ',
      'เกิดปัญหากระแสไม่สมดุลเพียงเล็กน้อย ➔ ปรับตั้งแท็ปแรงดันใหม่ก็เพียงพอ'
    ],
    optionsEn: [
      'High-energy electrical arcing inside windings with moist oil -> De-energize transformer immediately for internal inspection',
      'Minor thermal fault from mild overload -> Continue operation',
      'Silica gel breather is functioning well -> No abnormality',
      'Minor load unbalance -> Re-tap changer only'
    ],
    correctIndex: 0,
    detailedSolutionTh: [
      'ตามหลักการวิเคราะห์ก๊าซ DGA (Duval Triangle / IEEE C57.104):',
      'ก๊าซ Acetylene (C₂H₂) จะเกิดขึ้นได้ก็ต่อเมื่อมีอุณหภูมิเฉพาะจุดสูงเกิน 1,000°C เท่านั้น ซึ่งเกิดขึ้นได้จากกรณีเดียวคือ เกิดประกายไฟอาร์กพลังงานสูง (High Energy Arcing / Flashover) ระหว่างขดลวดหรือแกนเหล็ก',
      'ระดับ C₂H₂ ที่สูงถึง 45 ppm ถือเป็นระดับฉุกเฉินวิกฤต (Critical Emergency) เพราะปกติไม่ควรเกิน 1-2 ppm',
      'นอกจากนี้ ค่า Dielectric Breakdown Voltage ที่ 22 kV ต่ำกว่ามาตรฐานขั้นต่ำ (30 kV) ชี้ว่ามีน้ำมันปนเปื้อนความชื้นหรืออนุภาคคาร์บอนจากการอาร์ก',
      'ข้อปฏิบัติวิศวกรรม: ต้องปลดตัดไฟหม้อแปลง (De-energize) ทันที ห้ามจ่ายโหลดต่อเด็ดขาดเพื่อป้องกันหม้อแปลงระเบิดไฟไหม้'
    ],
    detailedSolutionEn: [
      'Acetylene (C₂H₂) only forms at temperatures exceeding 1,000°C, a direct signature of high-energy electrical arcing.',
      '45 ppm represents a critical condition (normal ≤ 2 ppm).',
      'Oil breakdown voltage of 22 kV is below the 30 kV ASTM D877 safety threshold. The unit must be de-energized immediately.'
    ],
    engineeringPrincipleTh: 'การตรวจ DGA และ Breakdown Voltage เปรียบเสมือนการตรวจเลือดหม้อแปลงไฟฟ้า ช่วยตรวจพบการอาร์กและป้องกันการระเบิดเสียหายล่วงหน้าได้อย่างแม่นยำ',
    engineeringPrincipleEn: 'DGA and dielectric breakdown testing provide predictive diagnostic insights preventing catastrophic transformer explosions.'
  }
];
