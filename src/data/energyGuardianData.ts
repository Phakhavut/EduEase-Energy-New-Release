import { EnergyBoss, CityBuilding, GuardianInventoryItem, EnergyGuardianState } from '../types';

export const INITIAL_ENERGY_BOSSES: EnergyBoss[] = [
  {
    id: 'overload',
    nameTh: 'โอเวอร์โหลด (Overload)',
    nameEn: 'Overload',
    titleTh: 'ปีศาจไฟเกินและพลังงานแฝง (The Load Devourer)',
    titleEn: 'The Load Devourer',
    element: 'Overload',
    elementColor: 'from-amber-500 to-rose-500',
    icon: '⚡',
    difficulty: 1,
    level: 1,
    totalHp: 600,
    attack: 15,
    defense: 5,
    weaknessTh: 'ปิดไฟที่ไม่ใช้ & ถอดปลั๊ก Standby Power',
    weaknessEn: 'Unplug Standby & Turn Off Unused Lights',
    descriptionTh: 'มอนสเตอร์ที่เติบโตจากการเปิดเครื่องใช้ไฟฟ้าพร้อมกันหลายเครื่อง และการเสียบปลั๊กทิ้งไว้จนเกิดไฟแฝง',
    descriptionEn: 'A beast spawned from running too many high-wattage appliances simultaneously and phantom standby loads.',
    loreTh: ' Overload แอบดูดพลังงานจากปลั๊กไฟทั่วบ้านเมื่อคุณหลับ หากคุณเผลอเปิดทีวีทิ้งไว้ มันจะแข็งแกร่งขึ้นเป็นสองเท่า!',
    loreEn: 'Overload feeds on vampire power left on in rooms at night. Unplugging unused appliances weakens its armor!',
    phases: [
      {
        phaseNumber: 1,
        hpThresholdPercent: 70,
        difficulty: 'Easy',
        titleTh: 'เฟส 1: ไฟแฝงตั้งต้น (Standby Surge)',
        titleEn: 'Phase 1: Standby Surge',
        dialogueTh: 'ฮ่าฮ่า! ปลั๊กทีวีและกล่องทีวีดิจิทัลกินไฟแม้คุณจะกดปิดรีโมต!',
        dialogueEn: 'Haha! Your TV and cable box still draw power on standby!'
      },
      {
        phaseNumber: 2,
        hpThresholdPercent: 30,
        difficulty: 'Medium',
        titleTh: 'เฟส 2: โหลดไฟฟ้าสูงสุด (Peak Load Rage)',
        titleEn: 'Phase 2: Peak Load Rage',
        dialogueTh: 'จะเกิดอะไรขึ้นถ้าเปิดแอร์ + เครื่องซักผ้า + ไมโครเวฟ พร้อมกัน?!',
        dialogueEn: 'What happens when you run AC, washer, and microwave simultaneously?!'
      },
      {
        phaseNumber: 3,
        hpThresholdPercent: 0,
        difficulty: 'Hard',
        titleTh: 'เฟส 3: ไฟดับฉุกเฉิน (Circuit Meltdown)',
        titleEn: 'Phase 3: Circuit Meltdown',
        dialogueTh: 'แกไม่มีทางวิเคราะห์การโหลดไฟของบ้านได้อย่างแม่นยำหรอก!',
        dialogueEn: 'You cannot analyze the power load accurately enough!'
      }
    ],
    rewards: {
      xp: 350,
      coins: 150,
      crystals: 2,
      blueprintId: 'bp_eco_house',
      seedId: 'seed_solar_tree',
      badgeId: 'badge_overload_slayer'
    },
    unlockRequirementTh: 'ปลดล็อกทันที (Boss ตัวแรก)',
    unlockRequirementEn: 'Unlocked immediately (First Boss)',
    unlocked: true,
    questionPool: [
      {
        id: 'q_ol_1',
        type: 'mc',
        topicTh: 'พลังงานแฝง (Standby Power)',
        topicEn: 'Standby Power',
        questionTh: 'พฤติกรรมใดต่อไปนี้ทำให้เกิดการสิ้นเปลืองพลังงานแฝง (Standby Power) มากที่สุด?',
        questionEn: 'Which behavior contributes most to vampire/standby power loss?',
        optionsTh: [
          'กดปิดสวิตช์ทีวีด้วยรีโมตแต่ไม่ถอดปลั๊ก',
          'เปิดพัดลมเบอร์ 1 ไว้ทั้งคืน',
          'ใช้หลอดไฟ LED แทนหลอดตะเกียบ',
          'ปรับแอร์ขึ้นจาก 24°C เป็น 25°C'
        ],
        optionsEn: [
          'Turning off TV with remote without unplugging',
          'Running a fan on speed 1 all night',
          'Using LED bulbs instead of CFLs',
          'Raising AC setpoint from 24°C to 25°C'
        ],
        correctAnswer: 0,
        explanationTh: 'การปิดอุปกรณ์ด้วยรีโมตโดยไม่ถอดปลั๊กหรือปิดสวิตช์เต้ารับ จะยังคงมีกระแสไฟเลี้ยงวงจรภายใน (Standby Power) ตลอด 24 ชม.',
        explanationEn: 'Turning devices off via remote leaves internal circuits powered on standby 24/7.',
        hintTh: 'ลองสังเกตไฟสีแดงเล็กๆ ที่ยังสว่างอยู่บนทีวี',
        hintEn: 'Notice the tiny red standby light that stays illuminated on TV',
        damage: 150,
        xpReward: 50
      },
      {
        id: 'q_ol_2',
        type: 'tf',
        topicTh: 'ปลั๊กพ่วง & กำลังไฟ',
        topicEn: 'Power Strips & Wattage',
        questionTh: 'จริงหรือไม่: การเสียบเตารีด (1,000W) และกาน้ำร้อน (1,500W) ในปลั๊กพ่วงสายเดียวกันพร้อมกัน อาจเสี่ยงต่อความร้อนสะสมและเบรกเกอร์ตัดไฟ?',
        questionEn: 'True/False: Plugging an iron (1000W) and kettle (1500W) into the same power strip simultaneously risks overheating and breaker trips?',
        optionsTh: ['จริง (True)', 'เท็จ (False)'],
        optionsEn: ['True', 'False'],
        correctAnswer: 0,
        explanationTh: 'รวมกันคือ 2,500 Watt ซึ่งเกินกำลังที่ปลั๊กพ่วงทั่วไป (10A = 2,200W) จะรับได้อย่างปลอดภัย',
        explanationEn: 'Combined wattage is 2,500W, exceeding standard 10A (2,200W) strip safety rating.',
        hintTh: 'คำนวณกำลังไฟรวม 1,000 + 1,500 = 2,500W',
        hintEn: 'Add 1,000W + 1,500W = 2,500W total load',
        damage: 150,
        xpReward: 50
      },
      {
        id: 'q_ol_3',
        type: 'detective',
        topicTh: 'ค้นหาจุดกินไฟแฝง',
        topicEn: 'Energy Detective',
        questionTh: 'คลิกเลือกจุดในห้องที่เกิดการใช้ไฟทิ้งไว้โดยไม่จำเป็น (พลังงานแฝง/เปิดทิ้ง)',
        questionEn: 'Identify the energy waste spots in the room!',
        correctAnswer: 'tv_standby',
        explanationTh: 'คุณตรวจพบ: ปลั๊กทีวีดิจิทัลค้างไว้, ไฟโต๊ะทำงานเปิดทิ้งไว้, และคอมพิวเตอร์อยู่ในโหมด Sleep',
        explanationEn: 'You found: Standby set-top box, desk lamp left on, and sleeping desktop PC.',
        hintTh: 'มองหาอุปกรณ์ที่มีแสงไฟค้างอยู่หรือเปิดทิ้งไว้โดยไม่มีคนอยู่',
        hintEn: 'Look for glowing standby LEDs and lit lamps with no occupants',
        damage: 200,
        xpReward: 80,
        dataPoints: {
          items: [
            { id: 'tv_standby', nameTh: 'ทีวีเสียบปลั๊กค้าง (Standby 15W)', nameEn: 'TV Plugged In (15W Standby)', watts: 15 },
            { id: 'desk_light', nameTh: 'โคมไฟโต๊ะเปิดทิ้งไว้ (10W)', nameEn: 'Desk Lamp Left On (10W)', watts: 10 },
            { id: 'ac_on_18', nameTh: 'แอร์ตั้งไว้ 18°C (1,400W)', nameEn: 'AC set at 18°C (1,400W)', watts: 1400 }
          ]
        }
      }
    ]
  },
  {
    id: 'cold_phantom',
    nameTh: 'โคลด์ แฟนทอม (Cold Phantom)',
    nameEn: 'Cold Phantom',
    titleTh: 'จอมสูบพลังแอร์และอุณหภูมิมหาโหด (The Cooling Phantom)',
    titleEn: 'The Cooling Phantom',
    element: 'Cooling',
    elementColor: 'from-cyan-500 to-blue-600',
    icon: '❄️',
    difficulty: 2,
    level: 3,
    totalHp: 900,
    attack: 25,
    defense: 10,
    weaknessTh: 'ตั้งแอร์ 25-26°C + เปิดพัดลมช่วยกระจายลมเย็น & ล้างฟิลเตอร์',
    weaknessEn: 'Set AC to 25-26°C + Pair with Fan & Clean Filter',
    descriptionTh: 'ปีศาจความเย็นที่สิงอยู่ในเครื่องปรับอากาศ คอยยุให้ผู้ใช้ตั้งอุณหภูมิ 18-20°C และปล่อยให้แผ่นกรองฝุ่นอุดตัน',
    descriptionEn: 'A chilly spectre residing in AC units, tempting users to freeze at 18°C while filters clog up.',
    loreTh: 'Cold Phantom กินเงินค่าไฟของคุณเพิ่มขึ้น 10% ทุกๆ 1°C ที่คุณกดลดอุณหภูมิแอร์ต่ำลง!',
    loreEn: 'Cold Phantom devours 10% more electricity for every 1°C you lower below 25°C!',
    phases: [
      {
        phaseNumber: 1,
        hpThresholdPercent: 70,
        difficulty: 'Easy',
        titleTh: 'เฟส 1: ลมเย็นหนาวสั่น (Freezing Chill)',
        titleEn: 'Phase 1: Freezing Chill',
        dialogueTh: 'กดแอร์ไป 18°C สิ! จะได้เย็นเจี๊ยบสะใจไหมล่ะ?!',
        dialogueEn: 'Set the AC to 18°C! Feel the icy freeze!'
      },
      {
        phaseNumber: 2,
        hpThresholdPercent: 30,
        difficulty: 'Medium',
        titleTh: 'เฟส 2: แผ่นกรองฝุ่นอุดตัน (Clogged Filter Storm)',
        titleEn: 'Phase 2: Clogged Filter Storm',
        dialogueTh: 'ฟิลเตอร์แอร์ฝุ่นหนาตึ้บ คอมเพรสเซอร์ทำงานหนักขึ้น 15%!',
        dialogueEn: 'Dusty filters force my compressor to grind 15% harder!'
      },
      {
        phaseNumber: 3,
        hpThresholdPercent: 0,
        difficulty: 'Hard',
        titleTh: 'เฟส 3: ลมพัดลมช่วยชีวิต (Fan-Combo Barrier)',
        titleEn: 'Phase 3: Fan-Combo Barrier',
        dialogueTh: 'ถ้าแกเปิดแอร์ 26°C ร่วมกับพัดลม พลังของข้าจะสลายไป!',
        dialogueEn: 'If you combine 26°C AC with a oscillating fan, my shield crumbles!'
      }
    ],
    rewards: {
      xp: 500,
      coins: 250,
      crystals: 3,
      blueprintId: 'bp_wind_turbine',
      seedId: 'seed_guardian_tree',
      badgeId: 'badge_ac_master'
    },
    unlockRequirementTh: 'เอาชนะ Overload หรือผ่านบทเรียน AC Efficiency',
    unlockRequirementEn: 'Defeat Overload or finish AC Efficiency Lesson',
    unlocked: true,
    questionPool: [
      {
        id: 'q_cp_1',
        type: 'mc',
        topicTh: 'การปรับอุณหภูมิแอร์',
        topicEn: 'AC Setpoint Optimization',
        questionTh: 'การปรับตั้งอุณหภูมิแอร์ขึ้นจาก 24°C เป็น 26°C ร่วมกับการเปิดพัดลมส่าย จะช่วยประหยัดค่าไฟประมาณเท่าใด?',
        questionEn: 'Raising AC setpoint from 24°C to 26°C paired with an oscillating fan saves approximately how much power?',
        optionsTh: [
          'ประหยัดลงประมาณ 10-20% โดยยังรู้สึกเย็นสบายเท่าเดิม',
          'ไม่ประหยัดเลยเพราะเปิดพัดลมเพิ่ม',
          'ประหยัดเฉพาะเวลากลางวัน',
          'ทำให้แอร์เสียไวขึ้น'
        ],
        optionsEn: [
          'Saves approx 10-20% while maintaining thermal comfort',
          'Saves nothing because fan uses extra power',
          'Only saves during daytime',
          'Causes AC damage'
        ],
        correctAnswer: 0,
        explanationTh: 'การเพิ่มอุณหภูมิแอร์ขึ้น 1°C ช่วยลดกินไฟประมาณ 7-10% ขณะที่พัดลมใช้ไฟเพียง 40-50W ช่วยกระจายลมเย็นให้ผิวสัมผัสรู้สึกเย็นสบาย',
        explanationEn: 'Each 1°C increase reduces compressor draw by 7-10%, while fan consumes only 40W to enhance wind-chill effect.',
        hintTh: 'พัดลมกินไฟน้อยกว่าแอร์มากกว่า 20 เท่า!',
        hintEn: 'A fan draws 20x less power than an AC compressor!',
        damage: 200,
        xpReward: 60
      },
      {
        id: 'q_cp_2',
        type: 'calc',
        topicTh: 'คำนวณค่าไฟแอร์',
        topicEn: 'AC Bill Calculation',
        questionTh: 'แอร์ขนาด 1,200W เปิดวันละ 8 ชม. ในอัตราค่าไฟ ฿4.5/หน่วย ใน 1 เดือน (30 วัน) จะคิดเป็นค่าไฟแอร์ประมาณกี่บาท?',
        questionEn: 'A 1,200W AC running 8 hrs/day at ฿4.5/kWh rate for 30 days costs approximately how much monthly?',
        optionsTh: ['฿1,296', '฿864', '฿2,160', '฿540'],
        optionsEn: ['฿1,296', '฿864', '฿2,160', '฿540'],
        correctAnswer: 0,
        explanationTh: 'วิธีคิด: (1,200W ÷ 1,000) × 8 ชม. × 30 วัน = 288 kWh (หน่วย) -> 288 × ฿4.5 = ฿1,296',
        explanationEn: 'Calculation: (1,200 ÷ 1,000) * 8 hrs * 30 days = 288 kWh -> 288 * ฿4.5 = ฿1,296',
        hintTh: 'สูตร: (W ÷ 1,000) × ชม. × วัน × ค่าไฟต่อหน่วย',
        hintEn: 'Formula: (W / 1,000) * Hours * Days * Rate',
        damage: 250,
        xpReward: 80,
        dataPoints: { watts: 1200, hours: 8, rate: 4.5 }
      }
    ]
  },
  {
    id: 'watt_devourer',
    nameTh: 'วัตต์ ดีวาวเรอร์ (Watt Devourer)',
    nameEn: 'Watt Devourer',
    titleTh: 'จอมกลืนกินพลังงานและไฟฟ้าพื้นฐาน (The Electrical Fiend)',
    titleEn: 'The Electrical Fiend',
    element: 'Voltage',
    elementColor: 'from-purple-500 to-indigo-600',
    icon: '🔋',
    difficulty: 3,
    level: 5,
    totalHp: 1200,
    attack: 35,
    defense: 15,
    weaknessTh: 'ความเข้าใจเรื่อง Watt, Volt, Ampere และคำนวณ kWh เป็น',
    weaknessEn: 'Electrical Basics: Watt, Volt, Amp & kWh Math',
    descriptionTh: 'อสูรกายแห่งทฤษฎีไฟฟ้า มมรคอยงงงวยผู้ใช้งานด้วยตัวเลข Watt, Volt, Amp และค่าหน่วยกิโลวัตต์-ชั่วโมง',
    descriptionEn: 'A mythical electrical beast that confuses people with volts, amps, watts, and kilowatt-hours math.',
    loreTh: 'Watt Devourer จะอ่อนแกลงทันทีเมื่อผู้เล่นเข้าใจว่า 1 kWh = การใช้ไฟ 1,000 Watt นาน 1 ชั่วโมง!',
    loreEn: 'Watt Devourer loses shield instantly when you prove that 1 kWh equals 1,000 Watts operated for 1 hour!',
    phases: [
      {
        phaseNumber: 1,
        hpThresholdPercent: 70,
        difficulty: 'Easy',
        titleTh: 'เฟส 1: พลังงานวัตกิโลวัตต์ (Wattage Confusion)',
        titleEn: 'Phase 1: Wattage Confusion',
        dialogueTh: 'แกแยกระหว่าง Watt กับ kWh ออกจริงๆ หรือ?!',
        dialogueEn: 'Can you really distinguish between Watts and kWh?!'
      },
      {
        phaseNumber: 2,
        hpThresholdPercent: 30,
        difficulty: 'Medium',
        titleTh: 'เฟส 2: การคำนวณกำลังไฟฟ้า (P = V x I)',
        titleEn: 'Phase 2: Power Triangle (P = V x I)',
        dialogueTh: 'แรงดันไฟฟ้า 220V กับกระแสไฟ 5A จะสร้างกำลังไฟกี่วัตต์กันแน่?!',
        dialogueEn: 'What power is generated by 220V voltage and 5A current?!'
      },
      {
        phaseNumber: 3,
        hpThresholdPercent: 0,
        difficulty: 'Hard',
        titleTh: 'เฟส 3: ดัชนี Power Factor (Power Factor Surge)',
        titleEn: 'Phase 3: Power Factor Surge',
        dialogueTh: 'แกไม่มีทางวิเคราะห์ประสิทธิภาพการใช้กำลังไฟฟ้าได้อย่างถูกต้อง!',
        dialogueEn: 'You cannot analyze true power efficiency factor correctly!'
      }
    ],
    rewards: {
      xp: 750,
      coins: 400,
      crystals: 5,
      blueprintId: 'bp_smart_grid',
      seedId: 'seed_guardian_tree',
      badgeId: 'badge_watt_master'
    },
    unlockRequirementTh: 'ถึง Level 5 หรือเอาชนะ Cold Phantom',
    unlockRequirementEn: 'Reach Level 5 or defeat Cold Phantom',
    unlocked: true,
    questionPool: [
      {
        id: 'q_wd_1',
        type: 'match',
        topicTh: 'จับคู่อุปกรณ์กับกำลังไฟฟ้า',
        topicEn: 'Energy Match',
        questionTh: 'จับคู่อุปกรณ์ไฟฟ้าต่อไปนี้กับกำลังไฟฟ้า (Wattage) โดยประมาณให้ถูกต้อง',
        questionEn: 'Match the appliances with their approximate wattage ratings!',
        correctAnswer: 'matched',
        explanationTh: 'แอร์ (1,200W), คอมพิวเตอร์เล่นเกม (500W), ตู้เย็น (150W), หลอดไฟ LED (10W)',
        explanationEn: 'AC (1,200W), Gaming PC (500W), Refrigerator (150W), LED Bulb (10W)',
        hintTh: 'อุปกรณ์ทำความเย็น/ความร้อนมักมีกำลังวัตต์สูงที่สุด',
        hintEn: 'Heating and cooling appliances draw the highest wattage',
        damage: 220,
        xpReward: 70
      },
      {
        id: 'q_wd_2',
        type: 'calc',
        topicTh: 'คำนวณหน่วยไฟฟ้า (kWh)',
        topicEn: 'Kilowatt-Hour Math',
        questionTh: 'กาต้มน้ำร้อน 1,500W เปิดใช้งานวันละ 20 นาที (1/3 ชั่วโมง) ใน 1 วัน จะใช้ไฟฟ้าไปกี่ kWh (หน่วย)?',
        questionEn: 'A 1,500W kettle running 20 mins (1/3 hr) daily consumes how many kWh per day?',
        optionsTh: ['0.5 kWh', '1.5 kWh', '0.05 kWh', '5.0 kWh'],
        optionsEn: ['0.5 kWh', '1.5 kWh', '0.05 kWh', '5.0 kWh'],
        correctAnswer: 0,
        explanationTh: '1,500W ÷ 1,000 = 1.5 kW -> 1.5 kW × (20/60 ชม.) = 0.5 kWh ต่อวัน',
        explanationEn: '1,500W / 1,000 = 1.5 kW -> 1.5 kW * (20/60 hrs) = 0.5 kWh/day',
        hintTh: 'เปลี่ยน 20 นาที ให้เป็นชั่วโมง (20/60 = 0.333 ชม.)',
        hintEn: 'Convert 20 minutes into hours (20/60 = 0.333 hrs)',
        damage: 250,
        xpReward: 80
      }
    ]
  },
  {
    id: 'bill_eater',
    nameTh: 'บิล อีทเตอร์ (Bill Eater)',
    nameEn: 'Bill Eater',
    titleTh: 'จอมเขมือบบิลค่าไฟและโครงสร้างอัตราก้าวหน้า (The Tariff Monster)',
    titleEn: 'The Tariff Monster',
    element: 'Tariff',
    elementColor: 'from-emerald-500 to-amber-600',
    icon: '💸',
    difficulty: 4,
    level: 8,
    totalHp: 1600,
    attack: 45,
    defense: 20,
    weaknessTh: 'ความเข้าใจโครงสร้างอัตราค่าไฟ progressive tariff, ค่า Ft, TOU On-Peak/Off-Peak',
    weaknessEn: 'Understanding Progressive Tariffs, Ft, and TOU On-Peak/Off-Peak',
    descriptionTh: 'มอนสเตอร์ผู้แฝงตัวมากับบิลค่าไฟรายเดือน ใช้ประโยชน์จากอัตราก้าวหน้าและค่า Ft เพื่อสูบเงินออกจากกระเป๋าผู้ใช้',
    descriptionEn: 'A devious monster lurking inside your monthly utility bill, exploiting progressive rate tiers and Ft adjustments.',
    loreTh: 'Bill Eater จะกลัวการซักผ้าหรือชาร์จรถช่วง Off-Peak (22.00 - 09.00 น.) เป็นพิเศษ!',
    loreEn: 'Bill Eater trembles when you shift heavy loads like laundry to Off-Peak hours (10 PM - 9 AM)!',
    phases: [
      {
        phaseNumber: 1,
        hpThresholdPercent: 70,
        difficulty: 'Easy',
        titleTh: 'เฟส 1: บิลค่าไฟพุ่งสูง (Bill Spike Trap)',
        titleEn: 'Phase 1: Bill Spike Trap',
        dialogueTh: 'ทำไมค่าไฟเดือนนี้ถึงแพงกว่าเดือนที่แล้วทั้งที่เปิดแอร์เท่าเดิม?!',
        dialogueEn: 'Why is your bill higher this month even with the same AC runtime?!'
      },
      {
        phaseNumber: 2,
        hpThresholdPercent: 30,
        difficulty: 'Medium',
        titleTh: 'เฟส 2: ดักแด้ค่า Ft (Ft Tariff Swarm)',
        titleEn: 'Phase 2: Ft Tariff Swarm',
        dialogueTh: 'ค่า Ft ผันแปรตามต้นทุนเชื้อเพลิง แกจะรับมือกับมันยังไง?!',
        dialogueEn: 'Ft fluctuates with fuel costs! How will you defend against it?!'
      },
      {
        phaseNumber: 3,
        hpThresholdPercent: 0,
        difficulty: 'Hard',
        titleTh: 'เฟส 3: TOU On-Peak Blast',
        titleEn: 'Phase 3: TOU On-Peak Blast',
        dialogueTh: 'ช่วง 09:00 - 22:00 น. วันจันทร์-ศุกร์ อัตรา On-Peak จะบดขยี้งบของคุณ!',
        dialogueEn: 'Weekdays 9 AM - 10 PM On-Peak rates will crush your budget!'
      }
    ],
    rewards: {
      xp: 1100,
      coins: 600,
      crystals: 8,
      blueprintId: 'bp_solar_farm',
      seedId: 'seed_guardian_tree',
      badgeId: 'badge_tariff_genius'
    },
    unlockRequirementTh: 'ถึง Level 8 และผ่านบทเรียน Budget & Tariff',
    unlockRequirementEn: 'Reach Level 8 & complete Tariff Lesson',
    unlocked: true,
    questionPool: [
      {
        id: 'q_be_1',
        type: 'scenario',
        topicTh: 'ช่วงเวลา TOU (Time of Use)',
        topicEn: 'TOU Time Management',
        questionTh: 'หากบ้านของคุณใช้อัตราค่าไฟแบบ TOU (Time of Use) ช่วงเวลาใดคือช่วง Off-Peak ที่อัตราค่าไฟต่อหน่วยถูกที่สุด?',
        questionEn: 'If your home uses TOU (Time of Use) tariff, which period is Off-Peak with the cheapest unit rate?',
        optionsTh: [
          'วันจันทร์-ศุกร์ เวลา 22.00 - 09.00 น. และวันเสาร์-อาทิตย์ทั้งวัน',
          'วันจันทร์-ศุกร์ เวลา 09.00 - 22.00 น.',
          'เที่ยงวัน 12.00 - 13.00 น. ของทุกวัน',
          'เฉพาะช่วงที่มีแสงแดดจัด 10.00 - 14.00 น.'
        ],
        optionsEn: [
          'Mon-Fri 22:00 - 09:00 and all day Sat-Sun',
          'Mon-Fri 09:00 - 22:00',
          'Daily noon 12:00 - 13:00',
          'Peak solar hours 10:00 - 14:00'
        ],
        correctAnswer: 0,
        explanationTh: 'ช่วง Off-Peak ของมิเตอร์ TOU คือ 22.00 - 09.00 น. วันธรรมดา และรวมถึงวันเสาร์-อาทิตย์ วันหยุดราชการทั้งวัน ค่าไฟจะเหลือประมาณ ฿2.6/หน่วย',
        explanationEn: 'Off-Peak TOU is 10 PM - 9 AM weekdays, plus all day weekends & holidays, with unit rates dropped to ~฿2.6/kWh.',
        hintTh: 'ช่วงเวลานอนและวันหยุดเสาร์-อาทิตย์',
        hintEn: 'Nighttime sleeping hours and full weekends',
        damage: 300,
        xpReward: 100
      },
      {
        id: 'q_be_2',
        type: 'calc',
        topicTh: 'ส่วนประกอบบิลค่าไฟ',
        topicEn: 'Bill Component Breakdown',
        questionTh: 'บิลค่าไฟประกอบด้วย: ค่าไฟฐาน + ค่า Ft + ค่าบริการรายเดือน + VAT 7% ข้อใดถูกต้องเกี่ยวกับค่า Ft?',
        questionEn: 'Electric bill = Base Energy + Ft + Service Fee + 7% VAT. Which is true regarding Ft?',
        optionsTh: [
          'ค่า Ft (Float Time) ปรับเปลี่ยนทุก 4 เดือนตามต้นทุนเชื้อเพลิงผลิตไฟฟ้า',
          'ค่า Ft คิดคงที่ตลอดปี ฿100',
          'ค่า Ft คือภาษีมูลค่าเพิ่ม',
          'ค่า Ft คิดเฉพาะบ้านตึกสูง'
        ],
        optionsEn: [
          'Ft fluctuates every 4 months based on fuel supply costs',
          'Ft is fixed at ฿100 all year',
          'Ft is the value-added tax',
          'Ft only applies to high-rises'
        ],
        correctAnswer: 0,
        explanationTh: 'ค่า Ft (Formula Adjustment Tariff) คือค่าไฟฟ้าผันแปรที่ปรับปรุงทุกๆ 4 เดือนเพื่อสะท้อนต้นทุนเชื้อเพลิงจริงในการผลิตไฟฟ้า',
        explanationEn: 'Ft adjusts every 4 months to absorb fluctuating fuel import & power generation costs.',
        hintTh: 'ปรับตามต้นทุนเชื้อเพลิงก๊าซธรรมชาติและถ่านหิน',
        hintEn: 'Adjusts with natural gas and coal import price shifts',
        damage: 280,
        xpReward: 90
      }
    ]
  },
  {
    id: 'climate_beast',
    nameTh: 'ไคลเมท บีสต์ (Climate Beast)',
    nameEn: 'Climate Beast',
    titleTh: 'มหาพญาอสูรแห่งสภาพอากาศและวิกฤตพลังงาน (The Seasonal Overlord)',
    titleEn: 'The Seasonal Overlord',
    element: 'Climate',
    elementColor: 'from-rose-600 via-purple-600 to-indigo-800',
    icon: '🌋',
    difficulty: 5,
    level: 12,
    totalHp: 2500,
    attack: 60,
    defense: 30,
    weaknessTh: 'กลยุทธ์ปรับตัวตามสภาพอากาศจริง (AI Seasonal Strategy) & พลังงานหมุนเวียน',
    weaknessEn: 'AI Weather Adaptive Strategy & Renewable Energy Mix',
    descriptionTh: 'บอสใหญ่ผู้คุมสภาพอากาศ ฤดูร้อนจัดสร้างภาระความร้อนมหาศาล บังคับให้เครื่องทำความเย็นทำงานหนักทวีคูณ',
    descriptionEn: 'The ultimate seasonal boss driving heatwaves that force AC units to run at maximum thermal stress.',
    loreTh: 'Climate Beast พ่ายแพ้ต่อผู้พิทักษ์ที่สามารถรวมพลังการปรับพฤติกรรมจริง ร่วมกับข้อมูลพยากรณ์อากาศของ AI!',
    loreEn: 'Climate Beast crumbles when Guardians combine real behavioral habits with AI weather forecast insights!',
    phases: [
      {
        phaseNumber: 1,
        hpThresholdPercent: 70,
        difficulty: 'Easy',
        titleTh: 'เฟส 1: คลื่นความร้อนจัด (Heatwave Surge)',
        titleEn: 'Phase 1: Heatwave Surge',
        dialogueTh: 'อุณหภูมิภายนอก 40°C! แอร์ของแกต้องทำงานหนักขึ้น 30%!',
        dialogueEn: 'Outside temperature 40°C! Your AC works 30% harder!'
      },
      {
        phaseNumber: 2,
        hpThresholdPercent: 30,
        difficulty: 'Medium',
        titleTh: 'เฟส 2: รังสีความร้อนทะลุหลังคา (Thermal Radiation)',
        titleEn: 'Phase 2: Thermal Radiation',
        dialogueTh: 'ถ้าไม่ติดผ้าม่านกัน UV ห้องของแกจะสะสมความร้อนตลอดยามบ่าย!',
        dialogueEn: 'Without UV curtains, heat accumulates in your room all afternoon!'
      },
      {
        phaseNumber: 3,
        hpThresholdPercent: 0,
        difficulty: 'Hard',
        titleTh: 'เฟส 3: วิกฤตพลังงานโลก (Global Energy Crisis)',
        titleEn: 'Phase 3: Global Energy Crisis',
        dialogueTh: 'จงพิสูจน์วิศวกรรมการจัดการพลังงานแบบยั่งยืนครบวงจรของแกสิ!',
        dialogueEn: 'Prove your comprehensive sustainable energy management mastery!'
      }
    ],
    rewards: {
      xp: 2000,
      coins: 1200,
      crystals: 15,
      blueprintId: 'bp_sustainable_city_hall',
      seedId: 'seed_guardian_tree',
      badgeId: 'badge_ultimate_guardian'
    },
    unlockRequirementTh: 'ถึง Level 12 และเอาชนะ Bill Eater',
    unlockRequirementEn: 'Reach Level 12 & defeat Bill Eater',
    unlocked: true,
    questionPool: [
      {
        id: 'q_cb_1',
        type: 'scenario',
        topicTh: 'กลยุทธ์สู้ความร้อนฤดูร้อน',
        topicEn: 'Summer Heat Strategy',
        questionTh: 'ในช่วงฤดูร้อน อุณหภูมิภายนอกสูง 38°C กลยุทธ์ใดประหยัดพลังงานแอร์ได้ดีที่สุด?',
        questionEn: 'During a 38°C summer heatwave, which overall strategy saves the most AC power?',
        optionsTh: [
          'ปิดม่านบังแดดด้านทิศตะวันตก/ใต้ + ตั้งแอร์ 26°C ร่วมกับพัดลม + เปิดแอร์หลังล้างฟิลเตอร์',
          'เปิดแอร์ 18°C เร่งสปีดพัดลมแอร์สูงสุดตลอดวัน',
          'เปิดประตูหน้าต่างทิ้งไว้ขณะเปิดแอร์เพื่อให้ถ่ายเท',
          'ฉีดน้ำใส่คอยล์ร้อนแอร์ขณะกำลังหมุนทำงาน'
        ],
        optionsEn: [
          'Block West/South solar radiation with curtains + 26°C AC with fan + clean filter',
          'Run AC at 18°C with max blower speed all day',
          'Keep doors open while running AC for ventilation',
          'Spray water on running outdoor compressor coil'
        ],
        correctAnswer: 0,
        explanationTh: 'การลดความร้อนสะสมเข้าสู่ห้องด้วยผ้าม่าน ร่วมกับการตั้งอุณหภูมิ 26°C + พัดลม จะช่วยลดภาระคอมเพรสเซอร์ลงได้มากที่สุดอย่างปลอดภัย',
        explanationEn: 'Blocking solar gain via shading + setpoint at 26°C + fan airflow dramatically reduces compressor thermal load.',
        hintTh: 'ป้องกันความร้อนเข้าห้องก่อน แล้วค่อยทำความเย็นอย่างฉลาด',
        hintEn: 'Prevent heat entry first, then cool efficiently',
        damage: 400,
        xpReward: 150
      }
    ]
  }
];

export const INITIAL_CITY_BUILDINGS: CityBuilding[] = [
  {
    id: 'b_eco_house',
    zone: 'residential',
    nameTh: 'บ้านประหยัดพลังงาน (Eco House)',
    nameEn: 'Eco House',
    descriptionTh: 'บ้านพักอาศัยออกแบบตามหลักทิศทางลม ติดตั้งหลังคาโซลาร์เซลล์และฉนวนกันความร้อน',
    descriptionEn: 'Energy-efficient residential home with solar roof and thermal insulation.',
    level: 1,
    costCoins: 200,
    costCrystals: 1,
    sustainabilityBonus: 12,
    efficiencyBonus: 15,
    co2Bonus: 10,
    happinessBonus: 20,
    icon: '🏠',
    isUnlocked: true,
    countPlaced: 1
  },
  {
    id: 'b_green_park',
    zone: 'green',
    nameTh: 'สวนสาธารณะนิเวศ (Eco Park)',
    nameEn: 'Eco Park',
    descriptionTh: 'พื้นที่สีเขียวช่วยดูดซับคาร์บอนไดออกไซด์ และลดปรากฏการณ์เกาะความร้อนเมือง (Heat Island)',
    descriptionEn: 'Urban park mitigating urban heat island effect and absorbing CO2.',
    level: 1,
    costCoins: 150,
    costCrystals: 0,
    sustainabilityBonus: 20,
    efficiencyBonus: 5,
    co2Bonus: 25,
    happinessBonus: 25,
    icon: '🌳',
    isUnlocked: true,
    countPlaced: 1
  },
  {
    id: 'b_solar_farm',
    zone: 'energy',
    nameTh: 'โซลาร์ฟาร์มชุมชน (Community Solar Farm)',
    nameEn: 'Community Solar Farm',
    descriptionTh: 'แหล่งผลิตพลังงานไฟฟ้าสะอาดจากแสงอาทิตย์ จ่ายไฟป้อนเข้าเมืองในยามกลางวัน',
    descriptionEn: 'Clean solar energy farm powering the green city grid during daylight.',
    level: 2,
    costCoins: 450,
    costCrystals: 3,
    sustainabilityBonus: 30,
    efficiencyBonus: 35,
    co2Bonus: 40,
    happinessBonus: 15,
    icon: '☀️',
    isUnlocked: true,
    countPlaced: 0
  },
  {
    id: 'b_wind_turbine',
    zone: 'energy',
    nameTh: 'กังหันลมสะอาด (Wind Turbine)',
    nameEn: 'Wind Turbine',
    descriptionTh: 'กังหันลมกำเนิดไฟฟ้าหมุนเวียนตลอด 24 ชั่วโมงจากกระแสลมธรรมชาติ',
    descriptionEn: 'Wind turbine providing 24/7 renewable kinetic energy.',
    level: 2,
    costCoins: 500,
    costCrystals: 4,
    sustainabilityBonus: 25,
    efficiencyBonus: 30,
    co2Bonus: 35,
    happinessBonus: 10,
    icon: '🌀',
    isUnlocked: true,
    countPlaced: 0
  },
  {
    id: 'b_ev_station',
    zone: 'transport',
    nameTh: 'สถานีชาร์จ EV อัจฉริยะ (Smart EV Hub)',
    nameEn: 'Smart EV Hub',
    descriptionTh: 'จุดชาร์จยานยนต์ไฟฟ้าที่จ่ายไฟจากพลังงานหมุนเวียน พร้อมระบบจัดการการโหลดไฟ',
    descriptionEn: 'Smart EV charging hub integrated with renewable energy grid.',
    level: 3,
    costCoins: 600,
    costCrystals: 5,
    sustainabilityBonus: 20,
    efficiencyBonus: 25,
    co2Bonus: 30,
    happinessBonus: 20,
    icon: '🔌',
    isUnlocked: true,
    countPlaced: 0
  },
  {
    id: 'b_smart_grid',
    zone: 'smart',
    nameTh: 'ศูนย์ควบคุมสมาร์ทกริด (Smart Grid HQ)',
    nameEn: 'Smart Grid HQ',
    descriptionTh: 'ศูนย์สั่งการสมองกล AI บริหารจัดการสายส่งและวิเคราะห์โหลดไฟแบบ Real-time',
    descriptionEn: 'AI command hub managing smart grid load balancing and real-time telemetry.',
    level: 4,
    costCoins: 1000,
    costCrystals: 10,
    sustainabilityBonus: 40,
    efficiencyBonus: 50,
    co2Bonus: 30,
    happinessBonus: 30,
    icon: '🏛️',
    isUnlocked: true,
    countPlaced: 0
  }
];

export const INITIAL_INVENTORY_ITEMS: GuardianInventoryItem[] = [
  {
    id: 'bp_eco_house',
    category: 'blueprint',
    nameTh: 'พิมพ์เขียว Eco House',
    nameEn: 'Eco House Blueprint',
    descriptionTh: 'แบบแปลนสำหรับสร้างบ้านประหยัดพลังงานในเมืองของคุณ',
    descriptionEn: 'Architectural blueprint for building energy-efficient houses.',
    count: 2,
    icon: '📜',
    rarity: 'Common'
  },
  {
    id: 'seed_solar_tree',
    category: 'seed',
    nameTh: 'เมล็ดพันธุ์ต้นไม้โซลาร์',
    nameEn: 'Solar Tree Seed',
    descriptionTh: 'เมล็ดพันธุ์พิเศษที่โตขึ้นเป็นต้นไม้ผลิตพลังงานแสงอาทิตย์',
    descriptionEn: 'Special seed growing into a solar power generating tree.',
    count: 3,
    icon: '🌱',
    rarity: 'Rare'
  },
  {
    id: 'crys_energy_core',
    category: 'crystal',
    nameTh: 'ผลึกพลังงานบริสุทธิ์ (Energy Crystal)',
    nameEn: 'Pure Energy Crystal',
    descriptionTh: 'อัญมณีพลังงานล้ำค่าที่ได้รับจากการเอาชนะ Energy Boss',
    descriptionEn: 'Precious gem obtained by defeating Energy Bosses.',
    count: 5,
    icon: '💎',
    rarity: 'Epic'
  }
];

export const DEFAULT_GUARDIAN_STATE: EnergyGuardianState = {
  level: 7,
  xp: 2450,
  xpMax: 3000,
  coins: 480,
  energy: 100,
  energyMax: 100,
  crystals: 8,
  streak: 5,
  streakShields: 1,
  defeatedBosses: [],
  tutorialCompleted: false,
  energySavingScore: 82,
  knowledgeScore: 88,
  city: {
    level: 3,
    nameTh: 'เมืองสีเขียวยั่งยืน (Green Guardian City)',
    nameEn: 'Green Guardian City',
    sustainability: 68,
    efficiency: 74,
    co2Reduction: 62,
    citizenHappiness: 85,
    economy: 70,
    renewablePercent: 45,
    placedItems: [
      { id: 'p_1', buildingId: 'b_eco_house', zone: 'residential', placedAt: new Date().toISOString(), gridX: 1, gridY: 1 },
      { id: 'p_2', buildingId: 'b_green_park', zone: 'green', placedAt: new Date().toISOString(), gridX: 2, gridY: 1 }
    ]
  },
  inventory: INITIAL_INVENTORY_ITEMS
};
