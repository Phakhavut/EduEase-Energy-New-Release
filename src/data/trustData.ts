import { 
  GlossaryTerm, 
  DataQualityScore, 
  AIDecisionHistoryItem, 
  CalculationTraceData, 
  TrustFaqItem 
} from '../types';

export const TECHNICAL_TERMS: GlossaryTerm[] = [
  {
    id: 'kwh',
    termTh: 'หน่วยไฟฟ้า (kWh / กิโลวัตต์-ชั่วโมง)',
    termEn: 'Kilowatt-Hour (kWh)',
    category: 'unit',
    definitionTh: 'หน่วยวัดปริมาณพลังงานไฟฟ้าที่ใช้จริง คิดจากกำลังไฟ 1,000 วัตต์ที่เปิดใช้งานต่อเนื่องเป็นเวลา 1 ชั่วโมง',
    definitionEn: 'Unit of energy equivalent to 1,000 watts used continuously for 1 hour.',
    exampleTh: 'เปิดแอร์ 1,000 วัตต์นาน 1 ชั่วโมง = ใช้ไฟไป 1 หน่วย (1 kWh ≈ ฿4.20)',
    exampleEn: 'Running a 1,000W AC for 1 hour consumes 1 kWh (~4.20 THB).',
    difficulty: 'Basic',
    relatedPage: 'learning'
  },
  {
    id: 'ft',
    termTh: 'ค่า Ft (ค่าไฟฟ้าผันแปร)',
    termEn: 'Ft Rate (Fuel Adjustment Charge)',
    category: 'bill',
    definitionTh: 'ค่าปรับปรุงต้นทุนการผลิตไฟฟ้าที่ผันแปรตามราคาเชื้อเพลิงก๊าซธรรมชาติ น้ำมัน และอัตราแลกเปลี่ยน ประกาศโดย กกพ. ทุก 4 เดือน',
    definitionEn: 'Variable fuel adjustment charge set by the ERC every 4 months based on natural gas/fuel market prices.',
    exampleTh: 'งวดนี้ค่า Ft = -0.1532 บาท/หน่วย หากใช้ไฟ 300 หน่วย จะได้รับส่วนลด -฿45.96',
    exampleEn: 'Current Ft rate is -0.1532 THB/kWh, giving a 45.96 THB discount for 300 kWh usage.',
    difficulty: 'Basic',
    relatedPage: 'learning'
  },
  {
    id: 'tou',
    termTh: 'อัตรา TOU (Time of Use)',
    termEn: 'TOU Tariff (Time of Use)',
    category: 'bill',
    definitionTh: 'โครงสร้างอัตราค่าไฟที่คิดราคาตามช่วงเวลา โดยช่วง On-Peak (09:00 - 22:00 น. วันจันทร์-ศุกร์) มีราคาแพง และช่วง Off-Peak (22:00 - 09:00 น. และวันเสาร์-อาทิตย์) มีราคาถูกกว่าเกือบ 50%',
    definitionEn: 'Tariff structure where electricity rate varies by time. On-Peak hours are expensive while Off-Peak hours are ~50% cheaper.',
    exampleTh: 'ย้ายการซักผ้าและชาร์จรถ EV ไปทำหลัง 22:00 น. ช่วยลดค่าไฟได้เกือบครึ่งหนึ่ง',
    exampleEn: 'Shifting washing machines and EV charging to after 22:00 cuts power costs significantly.',
    difficulty: 'Intermediate',
    relatedPage: 'learning'
  },
  {
    id: 'vat',
    termTh: 'ภาษีมูลค่าเพิ่ม (VAT 7%)',
    termEn: 'Value Added Tax (VAT 7%)',
    category: 'bill',
    definitionTh: 'ภาษีที่จัดเก็บตามกฎหมายร้อยละ 7 คำนวณจากยอดรวม (ค่าไฟฐาน + ค่า Ft + ค่าบริการรายเดือน)',
    definitionEn: '7% government tax applied to the sum of Base Energy Charge, Ft Rate, and Monthly Service Fee.',
    exampleTh: 'ถ้ายอดรวมก่อนภาษีเท่ากับ 1,000 บาท ค่า VAT 7% คือ 70 บาท ยอดสุทธิคือ 1,070 บาท',
    exampleEn: 'If subtotal is 1,000 THB, 7% VAT equals 70 THB, making net total 1,070 THB.',
    difficulty: 'Basic',
    relatedPage: 'learning'
  },
  {
    id: 'peak',
    termTh: 'ช่วงความต้องการไฟฟ้าสูง (Peak Period)',
    termEn: 'Peak Period',
    category: 'bill',
    definitionTh: 'ช่วงเวลาที่ประชาชนและภาคอุตสาหกรรมใช้ไฟฟ้าพร้อมกันสูงสุด (09:00 - 22:00 น.) โรงไฟฟ้าต้องเปิดเครื่องกำเนิดไฟสำรองซึ่งมีต้นทุนสูง',
    definitionEn: 'Period of maximum power demand (09:00 - 22:00 weekdays) requiring high-cost backup power plants.',
    exampleTh: 'หลีกเลี่ยงการเปิดเครื่องทำน้ำอุ่นหรือเตาอบไฟฟ้าพร้อมกับแอร์ในช่วง On-Peak',
    exampleEn: 'Avoid running water heaters or ovens simultaneously with AC during peak hours.',
    difficulty: 'Basic',
    relatedPage: 'learning'
  },
  {
    id: 'off_peak',
    termTh: 'ช่วงความต้องการไฟฟ้าต่ำ (Off-Peak Period)',
    termEn: 'Off-Peak Period',
    category: 'bill',
    definitionTh: 'ช่วงเวลาที่การใช้ไฟฟ้าทั้งประเทศลดลง (22:00 - 09:00 น. วันจันทร์-ศุกร์ และวันหยุดเสาร์-อาทิตย์ทั้งวัน)',
    definitionEn: 'Low power demand period (22:00 - 09:00 weekdays, and all day on weekends & public holidays).',
    exampleTh: 'ช่วง Off-Peak ค่าไฟเหลือเพียงประมาณ 2.63 บาท/หน่วย เทียบกับ On-Peak ที่ 5.26 บาท/หน่วย',
    exampleEn: 'Off-Peak power costs ~2.63 THB/kWh compared to 5.26 THB/kWh during On-Peak.',
    difficulty: 'Basic',
    relatedPage: 'learning'
  },
  {
    id: 'power',
    termTh: 'กำลังไฟฟ้า (Power / วัตต์ W)',
    termEn: 'Electrical Power (Watts / W)',
    category: 'unit',
    definitionTh: 'อัตราการใช้พลังงานไฟฟ้า ณ ขณะใดขณะหนึ่ง ยิ่งวัตต์สูง อุปกรณ์ยิ่งดึงกระแสไฟมาก',
    definitionEn: 'Instantaneous rate of electrical energy consumption measured in Watts (W) or Kilowatts (kW).',
    exampleTh: 'เครื่องทำน้ำอุ่นมีกำลังไฟ 3,500 วัตต์ (3.5 kW) ส่วนหลอดไฟ LED มีกำลังไฟเพียง 10 วัตต์',
    exampleEn: 'Water heater draws 3,500 Watts while an LED bulb draws only 10 Watts.',
    difficulty: 'Basic',
    relatedPage: 'learning'
  },
  {
    id: 'energy',
    termTh: 'พลังงานไฟฟ้า (Energy / kWh)',
    termEn: 'Electrical Energy (kWh)',
    category: 'unit',
    definitionTh: 'ผลคูณระหว่างกำลังไฟฟ้า (วัตต์) กับระยะเวลาที่ใช้งาน (ชั่วโมง)',
    definitionEn: 'Product of power (Watts) multiplied by duration of use (Hours).',
    exampleTh: 'สูตร: พลังงาน (kWh) = [กำลังไฟ (W) × ชั่วโมง] ÷ 1,000',
    exampleEn: 'Formula: Energy (kWh) = [Power (W) × Hours] ÷ 1,000',
    difficulty: 'Basic',
    relatedPage: 'learning'
  },
  {
    id: 'current',
    termTh: 'กระแสไฟฟ้า (Current / แอมแปร์ A)',
    termEn: 'Electric Current (Amperes / A)',
    category: 'unit',
    definitionTh: 'ปริมาณประจุไฟฟ้าที่ไหลผ่านสายไฟในหนึ่งวินาที มีหน่วยเป็น แอมแปร์ (A)',
    definitionEn: 'Volume of electrical charge flowing through a wire per second measured in Amps (A).',
    exampleTh: 'แอร์ 12,000 BTU กินกระแสไฟประมาณ 5.5 แอมแปร์ ขณะคอมเพรสเซอร์ทำงาน',
    exampleEn: 'A 12,000 BTU air conditioner draws approximately 5.5 Amps during compressor run.',
    difficulty: 'Intermediate',
    relatedPage: 'learning'
  },
  {
    id: 'voltage',
    termTh: 'แรงดันไฟฟ้า (Voltage / โวลต์ V)',
    termEn: 'Voltage (Volts / V)',
    category: 'unit',
    definitionTh: 'แรงดันหรือความต่างศักย์ไฟฟ้าที่ดันให้กระแสไฟฟ้าไหล ระบบไฟฟ้าบ้านในประเทศไทยมาตรฐานอยู่ที่ 220V (50Hz)',
    definitionEn: 'Electric potential difference driving current through circuits. Standard Thailand household grid is 220V 50Hz.',
    exampleTh: 'แรงดันไฟฟ้าตกต่ำกว่า 200V จะทำให้มอเตอร์แอร์และตู้เย็นร้อนจัดและกินไฟเพิ่มขึ้น',
    exampleEn: 'Voltage drop below 200V causes AC and fridge motors to overheat and consume extra current.',
    difficulty: 'Intermediate',
    relatedPage: 'learning'
  },
  {
    id: 'pf',
    termTh: 'ตัวประกอบกำลัง (Power Factor / PF)',
    termEn: 'Power Factor (PF)',
    category: 'advanced',
    definitionTh: 'สัดส่วนระหว่างกำลังไฟฟ้าจริง (kW) ต่อกำลังไฟฟ้าปรากฏ (kVA) บ่งบอกประสิทธิภาพการใช้พลังงานของอุปกรณ์ไฟฟ้า (ค่าที่ดีควรอยู่ระหว่าง 0.90 - 1.00)',
    definitionEn: 'Ratio of real power (kW) to apparent power (kVA), indicating how effectively electricity is being converted. Ideal PF is 0.90 - 1.00.',
    exampleTh: 'อุปกรณ์ที่มีค่า PF = 0.65 จะดึงกระแสไฟสูญเสียในระบบมากกว่าอุปกรณ์ที่มี PF = 0.95 ถึง 30%',
    exampleEn: 'An appliance with PF = 0.65 wastes 30% more system current than one with PF = 0.95.',
    difficulty: 'Advanced',
    relatedPage: 'learning'
  }
];

export const INITIAL_DATA_QUALITY_SCORE: DataQualityScore = {
  overallScore: 82,
  gradeTh: 'ดีมาก',
  gradeEn: 'Good',
  items: [
    {
      id: 'dq-1',
      titleTh: 'การเชื่อมต่อเซนเซอร์มิเตอร์ (ESP32 Smart Sensor)',
      titleEn: 'ESP32 Smart Sensor Connection',
      category: 'meter',
      status: 'complete',
      impactPct: 30,
      actionTextTh: 'เชื่อมต่อแล้ว (วัดผลเรียลไทม์ 100%)',
      actionTextEn: 'Connected (100% Real-time)',
      actionKey: 'esp32_connected'
    },
    {
      id: 'dq-2',
      titleTh: 'ข้อมูลกำลังวัตต์เครื่องใช้ไฟฟ้าหลัก (Appliance Wattage)',
      titleEn: 'Appliance Power Ratings',
      category: 'appliance',
      status: 'complete',
      impactPct: 25,
      actionTextTh: 'บันทึกครบถ้วน 8/8 อุปกรณ์',
      actionTextEn: 'Logged 8/8 Devices',
      actionKey: 'appliances_logged'
    },
    {
      id: 'dq-3',
      titleTh: 'ประวัติบิลค่าไฟย้อนหลัง (3-Month Bill History)',
      titleEn: 'Historical Bill Statements',
      category: 'bill_history',
      status: 'estimated',
      impactPct: 25,
      actionTextTh: 'บันทึกแล้ว 1 เดือน (ยังขาดอีก 2 เดือน)',
      actionTextEn: '1 Month Logged (Need 2 more)',
      actionKey: 'add_bill_history'
    },
    {
      id: 'dq-4',
      titleTh: 'ข้อมูลประเภทที่อยู่อาศัย & อัตราค่าไฟ (Tariff Profile)',
      titleEn: 'Tariff & Household Profile',
      category: 'profile',
      status: 'complete',
      impactPct: 20,
      actionTextTh: 'ระบุอัตรา 1.1.2 บ้านพักอาศัยครบถ้วน',
      actionTextEn: 'Tariff Type 1.1.2 Specified',
      actionKey: 'profile_set'
    }
  ]
};

export const INITIAL_AI_DECISION_HISTORY: AIDecisionHistoryItem[] = [
  {
    id: 'dec-1',
    date: '2026-08-06 14:30',
    recommendationTh: 'ปรับอุณหภูมิแอร์ขึ้นเป็น 26°C ร่วมกับเปิดพัดลมตั้งโต๊ะ',
    recommendationEn: 'Raise AC temperature to 26°C with desk fan',
    category: 'Cooling Efficiency',
    reasonTh: 'ตรวจพบอุณหภูมิภายนอกสูง 36°C และแอร์ทำงานหนักต่อเนื่อง 4 ชั่วโมง',
    status: 'accepted',
    estimatedSavingThb: 180,
    actualSavingThb: 192,
    confidence: 'high',
    source: 'measured'
  },
  {
    id: 'dec-2',
    date: '2026-08-04 10:15',
    recommendationTh: 'ย้ายเวลาซักผ้าไปทำหลัง 22:00 น. เพื่อใช้อัตรา Off-Peak',
    recommendationEn: 'Shift washing machine runtime to post 22:00 Off-Peak',
    category: 'TOU Optimization',
    reasonTh: 'มิเตอร์ของคุณลงทะเบียนแบบ TOU ซึ่งค่าไฟหลัง 22:00 ถูกกว่าช่วงกลางวัน 50%',
    status: 'accepted',
    estimatedSavingThb: 120,
    actualSavingThb: 125,
    confidence: 'high',
    source: 'tariff'
  },
  {
    id: 'dec-3',
    date: '2026-08-02 21:00',
    recommendationTh: 'ปิดสวิตช์ปลั๊กพ่วงชุดเครื่องเล่นเกมคอมพิวเตอร์ก่อนนอน',
    recommendationEn: 'Shut off power strip for gaming PC before bedtime',
    category: 'Standby Power Cut',
    reasonTh: 'ตรวจพบการดึงไฟสแตนด์บายคงที่ 45 วัตต์ช่วงเวลา 00:00 - 06:00 น.',
    status: 'accepted',
    estimatedSavingThb: 45,
    actualSavingThb: 48,
    confidence: 'medium',
    source: 'measured'
  },
  {
    id: 'dec-4',
    date: '2026-07-28 09:00',
    recommendationTh: 'ล้างแผ่นกรองฝุ่นแอร์ประจำเดือน',
    recommendationEn: 'Clean air conditioner dust filter',
    category: 'Maintenance',
    reasonTh: 'ตรวจพบดัชนีระบายความร้อนลดลง 15% จากการสะสมฝุ่นบนคอยล์เย็น',
    status: 'accepted',
    estimatedSavingThb: 90,
    actualSavingThb: 105,
    confidence: 'high',
    source: 'predicted'
  }
];

export const SAMPLE_CALCULATION_TRACE: CalculationTraceData = {
  totalBillThb: 1248.52,
  kwhUsed: 298,
  baseRateThbPerUnit: 4.20,
  ftRateThbPerUnit: -0.1532,
  serviceFeeThb: 38.22,
  vatPct: 7,
  steps: [
    {
      stepNameTh: '1. คำนวณพลังงานไฟฟ้าฐาน (Base Energy)',
      stepNameEn: '1. Base Energy Calculation',
      formulaTh: '298 kWh × ฿4.2000',
      formulaEn: '298 kWh × ฿4.2000',
      valueThb: 1251.60,
      valueKwh: 298,
      unitPrice: 4.20,
      source: 'user',
      assumptionsTh: 'คิดตามอัตราก้าวหน้าประเภท 1.1.2 ของการไฟฟ้าส่วนภูมิภาค',
      detailTh: 'คำนวณจากหน่วยมิเตอร์ที่บันทึกได้ 298 หน่วย'
    },
    {
      stepNameTh: '2. คำนวณค่าไฟฟ้าผันแปร (Ft Adjustment)',
      stepNameEn: '2. Ft Adjustment',
      formulaTh: '298 kWh × (-฿0.1532)',
      formulaEn: '298 kWh × (-฿0.1532)',
      valueThb: -45.65,
      valueKwh: 298,
      unitPrice: -0.1532,
      source: 'tariff',
      assumptionsTh: 'ประกาศอัตราค่า Ft ประจำงวดโดยคณะกรรมการกำกับกิจการพลังงาน (กกพ.)',
      detailTh: 'ส่วนลด Ft ช่วยลดภาระค่าไฟลง ฿45.65 ในงวดนี้'
    },
    {
      stepNameTh: '3. ค่าบริการรายเดือน (Monthly Service Charge)',
      stepNameEn: '3. Monthly Service Charge',
      formulaTh: 'อัตราคงที่ ฿38.22/เดือน',
      formulaEn: 'Fixed ฿38.22/month',
      valueThb: 38.22,
      source: 'tariff',
      assumptionsTh: 'อัตราค่าบริการจดหน่วยและรักษามิเตอร์สำหรับการไฟฟ้าประเภทบ้านพักอาศัย',
      detailTh: 'ค่าบริการระบบจำหน่ายไฟฟ้าและมิเตอร์คงที่'
    },
    {
      stepNameTh: '4. รวมเงินก่อนภาษี (Subtotal Before VAT)',
      stepNameEn: '4. Subtotal Before VAT',
      formulaTh: '฿1,251.60 - ฿45.65 + ฿38.22',
      formulaEn: '฿1,251.60 - ฿45.65 + ฿38.22',
      valueThb: 1244.17,
      source: 'calculated',
      detailTh: 'ยอดเงินก่อนรวมภาษีมูลค่าเพิ่ม'
    },
    {
      stepNameTh: '5. ภาษีมูลค่าเพิ่ม (VAT 7%)',
      stepNameEn: '5. Value Added Tax (VAT 7%)',
      formulaTh: '฿1,244.17 × 7%',
      formulaEn: '฿1,244.17 × 7%',
      valueThb: 87.09,
      source: 'tariff',
      assumptionsTh: 'ภาษีมูลค่าเพิ่มตามกฎหมายสรรพากร',
      detailTh: 'ภาษีมูลค่าเพิ่มนำส่งภาครัฐ'
    },
    {
      stepNameTh: '6. ยอดชำระสุทธิ (Net Total Payment)',
      stepNameEn: '6. Net Total Payment',
      formulaTh: '฿1,244.17 + ฿87.09',
      formulaEn: '฿1,244.17 + ฿87.09',
      valueThb: 1331.26,
      source: 'calculated',
      detailTh: 'ยอดเงินสุทธิที่ผู้ใช้ไฟฟ้าต้องชำระประจำงวด'
    }
  ]
};

export const TRUST_FAQS: TrustFaqItem[] = [
  {
    category: 'ai',
    questionTh: 'ระบบ AI ของ EduEase Energy ทำงานอย่างไร?',
    questionEn: 'How does EduEase AI work?',
    answerTh: 'ระบบ AI ของ EduEase รวมระหว่างแบบจำลองฟิสิกส์ทางวิศวกรรมไฟฟ้า (Physics-based Machine Learning) และข้อมูลจริงจากเซนเซอร์มิเตอร์ ESP32 โดยประมวลผลผ่าน Gemini API Server-Side เพื่อค้นหาแนวโน้ม วิเคราะห์ความผิดปกติ และคำนวณผลประหยัดได้อย่างแม่นยำ',
    answerEn: 'EduEase AI combines physics-based electrical engineering models with real sensor data from ESP32, processed via server-side Gemini API for accurate predictions.'
  },
  {
    category: 'privacy',
    questionTh: 'ข้อมูลการใช้ไฟและ API Key ของฉันปลอดภัยแค่ไหน?',
    questionEn: 'Is my energy data and API key secure?',
    answerTh: 'ปลอดภัย 100%! API Key ทั้งหมดถูกเก็บรักษาบน Server-Side Proxy (`/api/*`) ไม่เคยถูกส่งไปยังฝั่งเบราว์เซอร์ของผู้ใช้ ข้อมูลการใช้ไฟถูกจัดเก็บอย่างเป็นปริศนาและไม่นำไปจำหน่ายให้บุคคลที่สาม',
    answerEn: '100% secure! All API keys remain on server-side proxies and are never exposed to the browser. Your energy data is private and never sold.'
  },
  {
    category: 'accuracy',
    questionTh: 'การคาดการณ์ค่าไฟมีความแม่นยำมากน้อยเพียงใด?',
    questionEn: 'How accurate are the bill predictions?',
    answerTh: 'หากมีข้อมูลย้อนหลังและเซนเซอร์ครบถ้วน ความแม่นยำจะสูงถึง 92% - 96% โดยระบบจะแสดงระดับความมั่นใจ (Confidence Badge) กำกับไว้ทุกตัวเลขเสมอ เพื่อให้ผู้ใช้รับรู้ขอบเขตข้อมูลอย่างโปร่งใส',
    answerEn: 'Predictions reach 92% - 96% accuracy with full sensor and profile data. We always show confidence indicators with every number.'
  },
  {
    category: 'formula',
    questionTh: 'สูตรคำนวณบิลตรงกับใบแจ้งหนี้ของการไฟฟ้า (PEA/MEA) หรือไม่?',
    questionEn: 'Does the bill calculation match official PEA/MEA bills?',
    answerTh: 'ตรงกัน 100%! EduEase ใช้สูตรคำนวณตามโครงสร้างอัตราค่าไฟทางการของการไฟฟ้าส่วนภูมิภาค (PEA) และการไฟฟ้านครหลวง (MEA) รวมทั้งค่า Ft ปัจจุบัน ค่าบริการรายเดือน และภาษี VAT 7%',
    answerEn: '100% match! We implement official tariff structures from PEA and MEA including current Ft rates, monthly service fees, and 7% VAT.'
  }
];
