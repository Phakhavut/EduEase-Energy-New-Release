import { UserPersona } from '../types';

export interface MonthlyRecord {
  monthId: string;
  nameTh: string;
  nameEn: string;
  year: number;
  totalCost: number;
  totalKwh: number;
  avgDailyCost: number;
  status: 'actual' | 'projected';
  daysInMonth: number;
}

export interface WeeklyComparisonItem {
  weekKey: string;
  weekLabelTh: string;
  weekLabelEn: string;
  thisMonthCost: number;
  prevMonthCost: number;
  thisMonthKwh: number;
  prevMonthKwh: number;
  thisMonthPeriodTh: string;
  thisMonthPeriodEn: string;
}

export interface CategoryComparisonItem {
  categoryKey: string;
  nameTh: string;
  nameEn: string;
  thisMonthCost: number;
  prevMonthCost: number;
  thisMonthKwh: number;
  prevMonthKwh: number;
  color: string;
  savingActionTh: string;
  savingActionEn: string;
}

export interface PersonaMonthlyComparisonData {
  persona: UserPersona;
  currentMonth: MonthlyRecord;
  previousMonth: MonthlyRecord;
  twoMonthsAgo: MonthlyRecord;
  costDiff: number; // thisMonthCost - prevMonthCost (negative means saved)
  costDiffPct: number; // e.g. -15.7
  kwhDiff: number;
  kwhDiffPct: number;
  topSavingReasonTh: string;
  topSavingReasonEn: string;
  recommendationTh: string;
  recommendationEn: string;
  weeklyComparison: WeeklyComparisonItem[];
  categoryComparison: CategoryComparisonItem[];
  historical3Months: MonthlyRecord[];
}

export const MONTHLY_COMPARISON_DATA: Record<UserPersona, PersonaMonthlyComparisonData> = {
  student: {
    persona: 'student',
    currentMonth: {
      monthId: '2026-08',
      nameTh: 'สิงหาคม 2026 (เดือนนี้)',
      nameEn: 'August 2026 (This Month)',
      year: 2026,
      totalCost: 1248,
      totalKwh: 298,
      avgDailyCost: 40.25,
      status: 'projected',
      daysInMonth: 31,
    },
    previousMonth: {
      monthId: '2026-07',
      nameTh: 'กรกฎาคม 2026 (เดือนก่อน)',
      nameEn: 'July 2026 (Last Month)',
      year: 2026,
      totalCost: 1480,
      totalKwh: 352,
      avgDailyCost: 47.74,
      status: 'actual',
      daysInMonth: 31,
    },
    twoMonthsAgo: {
      monthId: '2026-06',
      nameTh: 'มิถุนายน 2026 (2 เดือนก่อน)',
      nameEn: 'June 2026 (2 Months Ago)',
      year: 2026,
      totalCost: 1620,
      totalKwh: 385,
      avgDailyCost: 54.0,
      status: 'actual',
      daysInMonth: 30,
    },
    costDiff: -232,
    costDiffPct: -15.68,
    kwhDiff: -54,
    kwhDiffPct: -15.34,
    topSavingReasonTh: 'การปรับแอร์ 26°C ร่วมกับพัดลมตั้งโต๊ะ และการปลดปลั๊กพ่วงสแตนด์บายก่อนออกไปเรียน',
    topSavingReasonEn: 'Setting AC to 26°C with desk fan and disconnecting standby strips before class',
    recommendationTh: 'คงพฤติกรรมนี้ต่อไป จะประหยัดสะสมเทอมนี้ได้กว่า ฿1,150 เทียบเท่างบค่าหนังสือ 1 เล่ม',
    recommendationEn: 'Maintain this routine to accumulate ฿1,150 savings this semester, equivalent to 1 textbook.',
    weeklyComparison: [
      {
        weekKey: 'w1',
        weekLabelTh: 'สัปดาห์ 1 (1-7 ส.ค.)',
        weekLabelEn: 'Week 1 (Aug 1-7)',
        thisMonthCost: 280,
        prevMonthCost: 340,
        thisMonthKwh: 66.7,
        prevMonthKwh: 81.0,
        thisMonthPeriodTh: '1-7 ส.ค.',
        thisMonthPeriodEn: 'Aug 1-7',
      },
      {
        weekKey: 'w2',
        weekLabelTh: 'สัปดาห์ 2 (8-14 ส.ค.)',
        weekLabelEn: 'Week 2 (Aug 8-14)',
        thisMonthCost: 295,
        prevMonthCost: 360,
        thisMonthKwh: 70.2,
        prevMonthKwh: 85.7,
        thisMonthPeriodTh: '8-14 ส.ค.',
        thisMonthPeriodEn: 'Aug 8-14',
      },
      {
        weekKey: 'w3',
        weekLabelTh: 'สัปดาห์ 3 (15-21 ส.ค.)',
        weekLabelEn: 'Week 3 (Aug 15-21)',
        thisMonthCost: 310,
        prevMonthCost: 390,
        thisMonthKwh: 73.8,
        prevMonthKwh: 92.8,
        thisMonthPeriodTh: '15-21 ส.ค.',
        thisMonthPeriodEn: 'Aug 15-21',
      },
      {
        weekKey: 'w4',
        weekLabelTh: 'สัปดาห์ 4 (22-31 ส.ค.)',
        weekLabelEn: 'Week 4 (Aug 22-31, Est)',
        thisMonthCost: 363,
        prevMonthCost: 390,
        thisMonthKwh: 87.3,
        prevMonthKwh: 92.5,
        thisMonthPeriodTh: '22-31 ส.ค. (คาดการณ์)',
        thisMonthPeriodEn: 'Aug 22-31 (Est)',
      },
    ],
    categoryComparison: [
      {
        categoryKey: 'ac',
        nameTh: 'แอร์ห้องพัก 9,000 BTU',
        nameEn: 'Dorm AC 9,000 BTU',
        thisMonthCost: 648,
        prevMonthCost: 810,
        thisMonthKwh: 154,
        prevMonthKwh: 193,
        color: '#10b981',
        savingActionTh: 'ประหยัด ฿162 (-20%) จากการตั้ง 26°C + พัดลม',
        savingActionEn: 'Saved ฿162 (-20%) via 26°C + desk fan combo',
      },
      {
        categoryKey: 'fridge',
        nameTh: 'ตู้เย็นมินิบาร์ (หอพัก)',
        nameEn: 'Mini Bar Refrigerator',
        thisMonthCost: 220,
        prevMonthCost: 225,
        thisMonthKwh: 52,
        prevMonthKwh: 54,
        color: '#14b8a6',
        savingActionTh: 'ลดการเปิดตู้เย็นค้างตอนหยิบเครื่องดื่ม',
        savingActionEn: 'Reduced door open time',
      },
      {
        categoryKey: 'electronics',
        nameTh: 'โน้ตบุ๊ก & จอคอม & ปลั๊กชาร์จ',
        nameEn: 'Laptop & Electronics',
        thisMonthCost: 185,
        prevMonthCost: 245,
        thisMonthKwh: 44,
        prevMonthKwh: 58,
        color: '#06b6d4',
        savingActionTh: 'ประหยัด ฿60 (-24.5%) จากการปิดสวิตช์ปลั๊กพ่วง',
        savingActionEn: 'Saved ฿60 (-24.5%) by cutting standby strips',
      },
      {
        categoryKey: 'water_heater',
        nameTh: 'เครื่องทำน้ำอุ่น 3,500W',
        nameEn: 'Water Heater 3,500W',
        thisMonthCost: 100,
        prevMonthCost: 80,
        thisMonthKwh: 24,
        prevMonthKwh: 19,
        color: '#f59e0b',
        savingActionTh: 'ใช้เพิ่มขึ้นเล็กน้อยช่วงฝนตกตอนเช้า',
        savingActionEn: 'Slightly higher use during morning rain',
      },
      {
        categoryKey: 'lighting',
        nameTh: 'ไฟเพดาน & ไฟโต๊ะอ่านหนังสือ',
        nameEn: 'Desk & Room Lighting',
        thisMonthCost: 95,
        prevMonthCost: 120,
        thisMonthKwh: 24,
        prevMonthKwh: 28,
        color: '#8b5cf6',
        savingActionTh: 'ประหยัด ฿25 (-20.8%) เปลี่ยนใช้ไฟอ่านหนังสือ LED',
        savingActionEn: 'Saved ฿25 (-20.8%) with dedicated LED study lamp',
      },
    ],
    historical3Months: [
      { monthId: '2026-06', nameTh: 'มิ.ย. 2026', nameEn: 'Jun 2026', year: 2026, totalCost: 1620, totalKwh: 385, avgDailyCost: 54.0, status: 'actual', daysInMonth: 30 },
      { monthId: '2026-07', nameTh: 'ก.ค. 2026', nameEn: 'Jul 2026', year: 2026, totalCost: 1480, totalKwh: 352, avgDailyCost: 47.74, status: 'actual', daysInMonth: 31 },
      { monthId: '2026-08', nameTh: 'ส.ค. 2026', nameEn: 'Aug 2026', year: 2026, totalCost: 1248, totalKwh: 298, avgDailyCost: 40.25, status: 'projected', daysInMonth: 31 },
    ],
  },

  homeowner: {
    persona: 'homeowner',
    currentMonth: {
      monthId: '2026-08',
      nameTh: 'สิงหาคม 2026 (เดือนนี้)',
      nameEn: 'August 2026 (This Month)',
      year: 2026,
      totalCost: 3450,
      totalKwh: 820,
      avgDailyCost: 111.29,
      status: 'projected',
      daysInMonth: 31,
    },
    previousMonth: {
      monthId: '2026-07',
      nameTh: 'กรกฎาคม 2026 (เดือนก่อน)',
      nameEn: 'July 2026 (Last Month)',
      year: 2026,
      totalCost: 4120,
      totalKwh: 980,
      avgDailyCost: 132.9,
      status: 'actual',
      daysInMonth: 31,
    },
    twoMonthsAgo: {
      monthId: '2026-06',
      nameTh: 'มิถุนายน 2026 (2 เดือนก่อน)',
      nameEn: 'June 2026 (2 Months Ago)',
      year: 2026,
      totalCost: 4560,
      totalKwh: 1085,
      avgDailyCost: 152.0,
      status: 'actual',
      daysInMonth: 30,
    },
    costDiff: -670,
    costDiffPct: -16.26,
    kwhDiff: -160,
    kwhDiffPct: -16.33,
    topSavingReasonTh: 'การล้างฟิลเตอร์แอร์ 2 ตัว, ย้ายเวลาชาร์จรถยนต์ไฟฟ้า EV ไปช่วง Off-Peak 22:00-09:00',
    topSavingReasonEn: 'Cleaning 2 AC filters and scheduling EV charging to Off-Peak 22:00-09:00 window',
    recommendationTh: 'การคงการชาร์จ EV ช่วง Off-Peak จะช่วยกดค่าไฟให้อยู่ใน Step อัตราก้าวหน้าที่ถูกลง ฿700-1,000/เดือน',
    recommendationEn: 'Keeping EV off-peak charging ensures lower tier progressive rate, saving ฿700-1,000/mo.',
    weeklyComparison: [
      {
        weekKey: 'w1',
        weekLabelTh: 'สัปดาห์ 1 (1-7 ส.ค.)',
        weekLabelEn: 'Week 1 (Aug 1-7)',
        thisMonthCost: 780,
        prevMonthCost: 950,
        thisMonthKwh: 185,
        prevMonthKwh: 226,
        thisMonthPeriodTh: '1-7 ส.ค.',
        thisMonthPeriodEn: 'Aug 1-7',
      },
      {
        weekKey: 'w2',
        weekLabelTh: 'สัปดาห์ 2 (8-14 ส.ค.)',
        weekLabelEn: 'Week 2 (Aug 8-14)',
        thisMonthCost: 810,
        prevMonthCost: 990,
        thisMonthKwh: 192,
        prevMonthKwh: 235,
        thisMonthPeriodTh: '8-14 ส.ค.',
        thisMonthPeriodEn: 'Aug 8-14',
      },
      {
        weekKey: 'w3',
        weekLabelTh: 'สัปดาห์ 3 (15-21 ส.ค.)',
        weekLabelEn: 'Week 3 (Aug 15-21)',
        thisMonthCost: 860,
        prevMonthCost: 1060,
        thisMonthKwh: 205,
        prevMonthKwh: 252,
        thisMonthPeriodTh: '15-21 ส.ค.',
        thisMonthPeriodEn: 'Aug 15-21',
      },
      {
        weekKey: 'w4',
        weekLabelTh: 'สัปดาห์ 4 (22-31 ส.ค.)',
        weekLabelEn: 'Week 4 (Aug 22-31, Est)',
        thisMonthCost: 1000,
        prevMonthCost: 1120,
        thisMonthKwh: 238,
        prevMonthKwh: 267,
        thisMonthPeriodTh: '22-31 ส.ค. (คาดการณ์)',
        thisMonthPeriodEn: 'Aug 22-31 (Est)',
      },
    ],
    categoryComparison: [
      {
        categoryKey: 'ac_home',
        nameTh: 'แอร์ห้องนั่งเล่น & ห้องนอน (2 เครื่อง)',
        nameEn: 'Living & Bedroom Inverter ACs',
        thisMonthCost: 1780,
        prevMonthCost: 2240,
        thisMonthKwh: 423,
        prevMonthKwh: 533,
        color: '#10b981',
        savingActionTh: 'ประหยัด ฿460 (-20.5%) หลังล้างแอร์และตั้ง 26°C',
        savingActionEn: 'Saved ฿460 (-20.5%) post-filter cleaning & 26°C setpoint',
      },
      {
        categoryKey: 'ev_charge',
        nameTh: 'เครื่องชาร์จรถยนต์ไฟฟ้า (EV Wallbox)',
        nameEn: 'EV Home Wallbox Charger',
        thisMonthCost: 480,
        prevMonthCost: 620,
        thisMonthKwh: 182,
        prevMonthKwh: 195,
        color: '#3b82f6',
        savingActionTh: 'ประหยัด ฿140 (-22.6%) ย้ายชาร์จช่วง Off-Peak 2.63 บ./หน่วย',
        savingActionEn: 'Saved ฿140 (-22.6%) with Off-Peak 2.63 THB rate timer',
      },
      {
        categoryKey: 'fridge_kitchen',
        nameTh: 'ตู้เย็น Inverter 2 ประตู & ครัว',
        nameEn: 'Kitchen & 2-Door Inverter Fridge',
        thisMonthCost: 540,
        prevMonthCost: 560,
        thisMonthKwh: 128,
        prevMonthKwh: 133,
        color: '#14b8a6',
        savingActionTh: 'ระบบ Inverter ทำงานเสถียร ไม่แช่ของร้อน',
        savingActionEn: 'Steady inverter baseline; avoided hot food load',
      },
      {
        categoryKey: 'pumps_garden',
        nameTh: 'ปั๊มน้ำบ้าน & ไฟสวนโซลาร์',
        nameEn: 'Water Pump & Outdoor Lighting',
        thisMonthCost: 350,
        prevMonthCost: 390,
        thisMonthKwh: 83,
        prevMonthKwh: 93,
        color: '#f59e0b',
        savingActionTh: 'ซ่อมท่อน้ำรั่วซึม ทำให้ปั๊มตัดการทำงานถี่ลดลง',
        savingActionEn: 'Fixed minor plumbing leak; cut pump cycling',
      },
      {
        categoryKey: 'entertainment',
        nameTh: 'Smart TV, ซาวด์บาร์, เราเตอร์ WiFi',
        nameEn: 'Home Entertainment & Mesh WiFi',
        thisMonthCost: 300,
        prevMonthCost: 310,
        thisMonthKwh: 71,
        prevMonthKwh: 74,
        color: '#8b5cf6',
        savingActionTh: 'ตั้งเวลาปิดจอทีวีอัตโนมัติเมื่อไม่มีคนดู',
        savingActionEn: 'Auto sleep timer configured on Smart TV',
      },
    ],
    historical3Months: [
      { monthId: '2026-06', nameTh: 'มิ.ย. 2026', nameEn: 'Jun 2026', year: 2026, totalCost: 4560, totalKwh: 1085, avgDailyCost: 152.0, status: 'actual', daysInMonth: 30 },
      { monthId: '2026-07', nameTh: 'ก.ค. 2026', nameEn: 'Jul 2026', year: 2026, totalCost: 4120, totalKwh: 980, avgDailyCost: 132.9, status: 'actual', daysInMonth: 31 },
      { monthId: '2026-08', nameTh: 'ส.ค. 2026', nameEn: 'Aug 2026', year: 2026, totalCost: 3450, totalKwh: 820, avgDailyCost: 111.29, status: 'projected', daysInMonth: 31 },
    ],
  },

  facility: {
    persona: 'facility',
    currentMonth: {
      monthId: '2026-08',
      nameTh: 'สิงหาคม 2026 (เดือนนี้)',
      nameEn: 'August 2026 (This Month)',
      year: 2026,
      totalCost: 42500,
      totalKwh: 10120,
      avgDailyCost: 1370.97,
      status: 'projected',
      daysInMonth: 31,
    },
    previousMonth: {
      monthId: '2026-07',
      nameTh: 'กรกฎาคม 2026 (เดือนก่อน)',
      nameEn: 'July 2026 (Last Month)',
      year: 2026,
      totalCost: 48900,
      totalKwh: 11640,
      avgDailyCost: 1577.42,
      status: 'actual',
      daysInMonth: 31,
    },
    twoMonthsAgo: {
      monthId: '2026-06',
      nameTh: 'มิถุนายน 2026 (2 เดือนก่อน)',
      nameEn: 'June 2026 (2 Months Ago)',
      year: 2026,
      totalCost: 52300,
      totalKwh: 12450,
      avgDailyCost: 1743.33,
      status: 'actual',
      daysInMonth: 30,
    },
    costDiff: -6400,
    costDiffPct: -13.09,
    kwhDiff: -1520,
    kwhDiffPct: -13.06,
    topSavingReasonTh: 'การปรับจูนค่าตัวประกอบกำลัง (Power Factor = 0.98), ลดการเปิดชิลเลอร์ช่วง On-Peak 13:00-15:00',
    topSavingReasonEn: 'Power Factor correction to 0.98 & chiller load shedding during On-Peak 13:00-15:00',
    recommendationTh: 'รักษาค่า PF > 0.95 เพื่อหลีกเลี่ยงค่าปรับ kVAR จากการไฟฟ้าส่วนภูมิภาค ช่วยประหยัด ฿4,500/เดือน',
    recommendationEn: 'Maintain PF > 0.95 to eliminate reactive penalty charges, saving ฿4,500/month.',
    weeklyComparison: [
      {
        weekKey: 'w1',
        weekLabelTh: 'สัปดาห์ 1 (1-7 ส.ค.)',
        weekLabelEn: 'Week 1 (Aug 1-7)',
        thisMonthCost: 9600,
        prevMonthCost: 11200,
        thisMonthKwh: 2285,
        prevMonthKwh: 2666,
        thisMonthPeriodTh: '1-7 ส.ค.',
        thisMonthPeriodEn: 'Aug 1-7',
      },
      {
        weekKey: 'w2',
        weekLabelTh: 'สัปดาห์ 2 (8-14 ส.ค.)',
        weekLabelEn: 'Week 2 (Aug 8-14)',
        thisMonthCost: 10100,
        prevMonthCost: 11800,
        thisMonthKwh: 2404,
        prevMonthKwh: 2809,
        thisMonthPeriodTh: '8-14 ส.ค.',
        thisMonthPeriodEn: 'Aug 8-14',
      },
      {
        weekKey: 'w3',
        weekLabelTh: 'สัปดาห์ 3 (15-21 ส.ค.)',
        weekLabelEn: 'Week 3 (Aug 15-21)',
        thisMonthCost: 10500,
        prevMonthCost: 12400,
        thisMonthKwh: 2500,
        prevMonthKwh: 2952,
        thisMonthPeriodTh: '15-21 ส.ค.',
        thisMonthPeriodEn: 'Aug 15-21',
      },
      {
        weekKey: 'w4',
        weekLabelTh: 'สัปดาห์ 4 (22-31 ส.ค.)',
        weekLabelEn: 'Week 4 (Aug 22-31, Est)',
        thisMonthCost: 12300,
        prevMonthCost: 13500,
        thisMonthKwh: 2931,
        prevMonthKwh: 3214,
        thisMonthPeriodTh: '22-31 ส.ค. (คาดการณ์)',
        thisMonthPeriodEn: 'Aug 22-31 (Est)',
      },
    ],
    categoryComparison: [
      {
        categoryKey: 'chiller_plant',
        nameTh: 'ระบบชิลเลอร์ระบายความร้อนอาคาร (HVAC)',
        nameEn: 'Central HVAC Water-Cooled Chiller',
        thisMonthCost: 21500,
        prevMonthCost: 25800,
        thisMonthKwh: 5120,
        prevMonthKwh: 6140,
        color: '#10b981',
        savingActionTh: 'ประหยัด ฿4,300 (-16.7%) ย้ายพรีคูลลิ่งก่อน 09:00',
        savingActionEn: 'Saved ฿4,300 (-16.7%) with pre-cooling before 09:00',
      },
      {
        categoryKey: 'transformers',
        nameTh: 'หม้อแปลงไฟฟ้าหลัก & ตู้ MDB',
        nameEn: 'Main 500kVA Transformer & MDB',
        thisMonthCost: 9200,
        prevMonthCost: 10100,
        thisMonthKwh: 2190,
        prevMonthKwh: 2404,
        color: '#3b82f6',
        savingActionTh: 'ปรับแต่ง Capacitor Bank ทำให้สูญเสียความร้อนลดลง',
        savingActionEn: 'Capacitor bank tuned; reduced core losses',
      },
      {
        categoryKey: 'server_datacenter',
        nameTh: 'ห้องเซิร์ฟเวอร์ & ระบบ UPS สำรองไฟ',
        nameEn: 'Data Center Cooling & UPS Array',
        thisMonthCost: 6400,
        prevMonthCost: 6800,
        thisMonthKwh: 1523,
        prevMonthKwh: 1619,
        color: '#14b8a6',
        savingActionTh: 'กั้นช่องลมร้อน-เย็น Cold/Hot Aisle ประหยัดแอร์ 6%',
        savingActionEn: 'Cold/Hot aisle containment reduced cooling by 6%',
      },
      {
        categoryKey: 'facility_lighting',
        nameTh: 'ไฟส่องสว่างโรงงาน High-Bay LED & ถนน',
        nameEn: 'Facility High-Bay LED & Perimeter',
        thisMonthCost: 5400,
        prevMonthCost: 6200,
        thisMonthKwh: 1285,
        prevMonthKwh: 1476,
        color: '#8b5cf6',
        savingActionTh: 'ประหยัด ฿800 (-12.9%) ติดตั้งเซนเซอร์ตรวจจับความเคลื่อนไหว',
        savingActionEn: 'Saved ฿800 (-12.9%) via occupancy sensors in aisles',
      },
    ],
    historical3Months: [
      { monthId: '2026-06', nameTh: 'มิ.ย. 2026', nameEn: 'Jun 2026', year: 2026, totalCost: 52300, totalKwh: 12450, avgDailyCost: 1743.33, status: 'actual', daysInMonth: 30 },
      { monthId: '2026-07', nameTh: 'ก.ค. 2026', nameEn: 'Jul 2026', year: 2026, totalCost: 48900, totalKwh: 11640, avgDailyCost: 1577.42, status: 'actual', daysInMonth: 31 },
      { monthId: '2026-08', nameTh: 'ส.ค. 2026', nameEn: 'Aug 2026', year: 2026, totalCost: 42500, totalKwh: 10120, avgDailyCost: 1370.97, status: 'projected', daysInMonth: 31 },
    ],
  },
};

export function getMonthlyComparison(persona: UserPersona = 'student'): PersonaMonthlyComparisonData {
  return MONTHLY_COMPARISON_DATA[persona] || MONTHLY_COMPARISON_DATA.student;
}
