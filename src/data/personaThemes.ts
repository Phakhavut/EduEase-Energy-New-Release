import { House } from '../types';

export type UserPersona = 'student' | 'homeowner' | 'facility';

export interface PersonaConfig {
  id: UserPersona;
  titleTh: string;
  titleEn: string;
  roleBadgeTh: string;
  roleBadgeEn: string;
  spaceTypeLabelTh: string;
  spaceTypeLabelEn: string;
  defaultLocationNameTh: string;
  defaultLocationNameEn: string;
  houses: House[];
  energyTips: {
    titleTh: string;
    titleEn: string;
    contentTh: string;
    contentEn: string;
    iconName: 'Snowflake' | 'Plug' | 'Sun' | 'BatteryCharging' | 'Laptop' | 'Lightbulb' | 'Tv' | 'Wind';
  }[];
  menuCopy: {
    insightsTh: string;
    insightsEn: string;
    insightsBadge: string;
    learningTh: string;
    learningEn: string;
    learningBadge: string;
    profileTh: string;
    profileEn: string;
    budgetSubtitleTh: string;
    budgetSubtitleEn: string;
  };
}

export const PERSONA_CONFIGS: Record<UserPersona, PersonaConfig> = {
  student: {
    id: 'student',
    titleTh: 'นักศึกษา (Student & Dorm Life)',
    titleEn: 'Student (Dorm & Campus Life)',
    roleBadgeTh: '🎓 นักศึกษาหอพัก',
    roleBadgeEn: '🎓 Student Resident',
    spaceTypeLabelTh: 'ห้องพัก / หอพัก',
    spaceTypeLabelEn: 'Dorm / Student Unit',
    defaultLocationNameTh: 'ห้อง 402 หอพักนักศึกษา A',
    defaultLocationNameEn: 'Room 402, Student Dorm A',
    houses: [
      {
        id: 'dorm-402',
        name: 'ห้อง 402 หอพักนักศึกษา A',
        location: 'หอพักนักศึกษา อาคาร A (Campus Dorm A)',
        imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1600',
        description: 'ห้องพักนักศึกษาส่วนตัว พร้อมโต๊ะอ่านหนังสือ แอร์อินเวอร์เตอร์ และปลั๊กพ่วงอัจฉริยะ'
      },
      {
        id: 'condo-campus-view',
        name: 'คอนโดมิเนียม Campus View Studio',
        location: 'ย่านมหาวิทยาลัย (University Gate 2)',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1600',
        description: 'สตูดิโอคอนโดสำหรับนักศึกษา ตู้เย็นไซส์มินิ แอร์ 9000 BTU และระบบ Smart Meter หอพัก'
      },
      {
        id: 'dorm-salaya-215',
        name: 'ห้อง 215 หอพักใน (ศาลายา)',
        location: 'วิทยาเขตศาลายา หอในหญิง 3',
        imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1600',
        description: 'ห้องพักนักศึกษา 2 คน พร้อมมิเตอร์แยกห้องและฟังก์ชันหารค่าไฟกับรูมเมท'
      },
      {
        id: 'co-living-308',
        name: 'Co-Living Space หอพัก B (ห้อง 308)',
        location: 'หอพักนักศึกษา อาคาร B',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1600',
        description: 'ห้องพักสไตล์มินิมอล เน้นประหยัดไฟตอนอ่านหนังสือสอบและตัดไฟปลั๊กสแตนด์บาย'
      },
      {
        id: 'dorm-suite-512',
        name: 'ห้องชุดนักศึกษา Green Residence 512',
        location: 'โซนหอพักเอกชนรอบมหาวิทยาลัย',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600',
        description: 'ห้องพักติดตั้งพัดลมคู่แอร์ 26°C ช่วยคุมค่าไฟไม่ให้เกินงบเบี้ยเลี้ยงรายเดือน'
      }
    ],
    energyTips: [
      {
        titleTh: 'ปรับแอร์ 26°C ร่วมกับพัดลมตั้งโต๊ะ',
        titleEn: 'Set AC to 26°C + Desk Fan',
        contentTh: 'เปิดแอร์ที่ 26-27°C พร้อมพัดลมตั้งโต๊ะเบอร์ 1 ลมจะช่วยให้รู้สึกเย็นสบายเหมือน 24°C แต่ช่วยประหยัดค่าไฟหอพักได้ ฿150-220/เดือน',
        contentEn: 'Running AC at 26-27°C with a gentle desk fan feels as cool as 24°C while saving ฿150-220/month on your dorm bill.',
        iconName: 'Snowflake'
      },
      {
        titleTh: 'ปลดสวิตช์ปลั๊กพ่วงก่อนไปเรียน',
        titleEn: 'Switch Off Power Strip Before Class',
        contentTh: 'ที่ชาร์จโน้ตบุ๊ก จอคอม และอะแดปเตอร์ที่เสียบคาไว้กินไฟสแตนด์บายตลอดวัน การปิดสวิตช์หลักของปลั๊กพ่วงช่วยเซฟเงินได้กว่า ฿60/เดือน',
        contentEn: 'Laptop bricks and charger adapters continuously leak standby power. Shutting the main power strip switch saves over ฿60/month.',
        iconName: 'Plug'
      },
      {
        titleTh: 'เปิดม่านอ่านหนังสือรับแสงธรรมชาติ',
        titleEn: 'Study Near Window with Natural Light',
        contentTh: 'ช่วงกลางวันระหว่างอ่านหนังสือหรือทำการบ้าน ลองเปิดม่านรับแสงธรรมชาติแทนการเปิดไฟเพดาน 3-4 ดวง',
        contentEn: 'During daytime study sessions, utilize natural daylight to reduce room lighting load.',
        iconName: 'Sun'
      },
      {
        titleTh: 'ตั้งเวลาปิดแอร์ 30 นาทีก่อนตื่นไปเรียน',
        titleEn: 'Auto-Off Timer 30 Mins Before Waking',
        contentTh: 'ห้องพักจะยังคงความเย็นได้ต่อเนื่องอีก 45-60 นาที การตั้งเวลาปิดก่อนตื่นช่วยลดการใช้ไฟแอร์ได้ปีละหลายร้อยบาท',
        contentEn: 'The room retains cooling for 45-60 minutes after shutdown. Setting a 30-minute advance timer trims your annual dorm bill easily.',
        iconName: 'Wind'
      }
    ],
    menuCopy: {
      insightsTh: 'AI & วิเคราะห์ค่าไฟห้องพัก',
      insightsEn: 'AI & Dorm Analytics',
      insightsBadge: 'AI',
      learningTh: 'Energy Adventure & เควสประหยัดไฟ',
      learningEn: 'Energy Adventure & Quests',
      learningBadge: 'Hub',
      profileTh: 'โปรไฟล์ & คะแนนหอพักเขียว',
      profileEn: 'Profile & Eco Score',
      budgetSubtitleTh: 'คุมค่าไฟหอพักไม่ให้เกินงบรายเดือน',
      budgetSubtitleEn: 'Keep dorm electricity within monthly student allowance'
    }
  },
  homeowner: {
    id: 'homeowner',
    titleTh: 'เจ้าของบ้าน (Residential Homeowner)',
    titleEn: 'Homeowner (Smart Home)',
    roleBadgeTh: '🏠 เจ้าของบ้าน',
    roleBadgeEn: '🏠 Homeowner',
    spaceTypeLabelTh: 'บ้านพักอาศัย / ทาวน์โฮม',
    spaceTypeLabelEn: 'Residential House / Townhome',
    defaultLocationNameTh: 'บ้านพักหลัก (กรุงเทพฯ)',
    defaultLocationNameEn: 'Main Family Home (Bangkok)',
    houses: [
      {
        id: 'home-bkk-eco',
        name: 'บ้านเดี่ยว Eco Living (กรุงเทพฯ)',
        location: 'เขตวัฒนา กรุงเทพฯ',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
        description: 'บ้านเดี่ยว 2 ชั้น โซลาร์รูฟท็อป 5kW พร้อมระบบมิเตอร์ MEA สองทิศทาง'
      },
      {
        id: 'townhome-green-residence',
        name: 'ทาวน์โฮม Green Residence',
        location: 'โซนบางนา-ตราด กม.10',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600',
        description: 'ทาวน์โฮม 3 ห้องนอน แอร์อินเวอร์เตอร์ 4 เครื่อง และจุดชาร์จรถยนต์ไฟฟ้า Wallbox'
      },
      {
        id: 'family-chiangmai-house',
        name: 'บ้านพักต่างจังหวัด (เชียงใหม่)',
        location: 'อ.หางดง เชียงใหม่',
        imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600',
        description: 'บ้านพักตากอากาศครอบครัว พร้อมปั๊มน้ำพลังงานแสงอาทิตย์และระบบน้ำอุ่น'
      },
      {
        id: 'suburban-smart-home',
        name: 'บ้านเดี่ยว Smart Suburban (นนทบุรี)',
        location: 'อ.เมือง นนทบุรี',
        imageUrl: 'https://images.unsplash.com/photo-1600607687940-4e7a6a353d39?auto=format&fit=crop&q=80&w=1600',
        description: 'บ้านอัจฉริยะระบบอัตโนมัติ ตัดไฟแฝงและคุมอัตราก้าวหน้าขั้นบันได MEA'
      }
    ],
    energyTips: [
      {
        titleTh: 'ล้างแผ่นกรองแอร์ทุก 2 สัปดาห์',
        titleEn: 'Clean AC Filters Bi-Weekly',
        contentTh: 'ฝุ่นที่สะสมในแผ่นกรองทำให้คอมเพรสเซอร์ทำงานหนักขึ้น 10-15% การล้างอย่างสม่ำเสมอช่วยลดค่าไฟบ้านได้ ฿300-500/เดือน',
        contentEn: 'Clogged filters force the compressor to draw 10-15% more power. Regular cleaning saves ฿300-500/month across home units.',
        iconName: 'Snowflake'
      },
      {
        titleTh: 'จัดการชาร์จ EV ช่วง Off-Peak',
        titleEn: 'Schedule EV Charging to Off-Peak',
        contentTh: 'ตั้งเวลาชาร์จรถยนต์ไฟฟ้าหลัง 22:00 น. เพื่อใช้อัตรา TOU หน่วยละ ฿2.63 ประหยัดกว่าการชาร์จตอนกลางวันถึง 50%',
        contentEn: 'Charge EV after 10 PM under the TOU rate (฿2.63/unit) to cut vehicle electricity expense by 50%.',
        iconName: 'BatteryCharging'
      },
      {
        titleTh: 'เปิดระบบ Eco Standby Cutoff',
        titleEn: 'Enable Eco Standby Cutoff',
        contentTh: 'ทีวี เครื่องเสียง และกล่องรับสัญญาณในห้องนั่งเล่นดึงไฟแฝงร่วม 40W เปิดระบบตัดไฟอัตโนมัติเมื่อเข้านอน',
        contentEn: 'Living room home theater and entertainment units draw ~40W phantom load. Enable automated nocturnal shutdown.',
        iconName: 'Plug'
      },
      {
        titleTh: 'วางแผนผลิตไฟโซลาร์เซลล์ช่วงแดดจัด',
        titleEn: 'Maximize Solar Daytime Consumption',
        contentTh: 'เดินเครื่องซักผ้า ปั๊มน้ำ และระบบล้างจานช่วง 11:00-14:00 น. เพื่อใช้ไฟฟ้าพลังงานแสงอาทิตย์ฟรี 100%',
        contentEn: 'Run washing machine and dishwashers during 11 AM - 2 PM to utilize free 100% solar rooftop generation.',
        iconName: 'Sun'
      }
    ],
    menuCopy: {
      insightsTh: 'AI & วิเคราะห์การใช้ไฟบ้าน',
      insightsEn: 'AI & Home Energy Analytics',
      insightsBadge: 'AI',
      learningTh: 'สถาบันพลังงาน & เควสประหยัดไฟ',
      learningEn: 'Energy Academy & Quests',
      learningBadge: 'Hub',
      profileTh: 'โปรไฟล์ & คะแนนประหยัดไฟบ้าน',
      profileEn: 'Profile & Household Score',
      budgetSubtitleTh: 'บริหารบิลค่าไฟฟ้าและอัตราก้าวหน้า MEA/PEA',
      budgetSubtitleEn: 'Manage home electricity bill & progressive tariff tiers'
    }
  },
  facility: {
    id: 'facility',
    titleTh: 'แอดมินอาคาร (Facility & Campus Admin)',
    titleEn: 'Facility Manager (Campus & Grid)',
    roleBadgeTh: '🏢 แอดมินอาคาร',
    roleBadgeEn: '🏢 Facility Admin',
    spaceTypeLabelTh: 'อาคาร / สถานีไฟฟ้า',
    spaceTypeLabelEn: 'Facility / Grid Substation',
    defaultLocationNameTh: 'อาคารเรียนรวม & Smart Campus Hub',
    defaultLocationNameEn: 'Campus Academic Complex Hub',
    houses: [
      {
        id: 'facility-campus-hub',
        name: 'อาคารเรียนรวม & Smart Campus Hub',
        location: 'Campus Central Complex Block A',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
        description: 'ศูนย์บริหารจัดการโหลดไฟฟ้า อาคารเรียนรวม และศูนย์กิจกรรมนักศึกษา'
      },
      {
        id: 'facility-solar-grid',
        name: 'สถานีควบคุมพลังงาน Solar Microgrid',
        location: 'Campus West Solar Farm',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600',
        description: 'ระบบโซลาร์ฟาร์ม 150kW ควบคุมมิเตอร์สองทิศทางและแบตเตอรี่ BESS'
      },
      {
        id: 'facility-research-lab',
        name: 'อาคารวิจัยและห้องปฏิบัติการวิทยาศาสตร์',
        location: 'Science & Tech Research District',
        imageUrl: 'https://images.unsplash.com/photo-1600607687940-4e7a6a353d39?auto=format&fit=crop&q=80&w=1600',
        description: 'โหลดอุปกรณ์วิทยาศาสตร์หนัก ระบบชิลเลอร์ Chilled Water และมอนิเตอร์ Power Factor'
      }
    ],
    energyTips: [
      {
        titleTh: 'ปรับแต่งตัวประกอบกำลัง (Power Factor Tuning)',
        titleEn: 'Power Factor Optimization',
        contentTh: 'ตรวจพบโหลดเหนี่ยวนำจากมอเตอร์แอร์รวม แนะนำปรับ Capacitor Bank เพื่อรักษา PF > 0.95 และหลีกเลี่ยงค่าปรับ kVAR จากการไฟฟ้า',
        contentEn: 'Inductive motor loads detected. Tune capacitor bank to maintain PF > 0.95 and avoid utility kVAR surcharges.',
        iconName: 'BatteryCharging'
      },
      {
        titleTh: 'โยกโหลด Chiller ช่วง On-Peak (Load Shifting)',
        titleEn: 'Peak Demand Load Shifting',
        contentTh: 'เปิดระบบสะสมความเย็น Ice Storage ช่วง Off-Peak เพื่อลด Peak Demand กิโลวัตต์สูงสุดช่วง 13:00-15:00 น.',
        contentEn: 'Pre-charge ice storage during Off-Peak to shave peak kW demand during 1:00 PM - 3:00 PM.',
        iconName: 'Snowflake'
      },
      {
        titleTh: 'ตั้งเวลาควบคุมระบบแสงสว่างทางเดินอัตโนมัติ',
        titleEn: 'Corridor Smart Lighting Automation',
        contentTh: 'ระบบตรวจจับความเคลื่อนไหว PIR และหรี่ไฟเหลือ 20% หลังเวลา 22:00 น. ในอาคารเรียน',
        contentEn: 'PIR motion sensing dims hallway lighting to 20% post-10 PM across campus wings.',
        iconName: 'Sun'
      }
    ],
    menuCopy: {
      insightsTh: 'AI & วิเคราะห์โครงข่ายไฟฟ้า (TOU & Telemetry)',
      insightsEn: 'AI & Grid Telemetry Analytics',
      insightsBadge: 'PRO',
      learningTh: 'คู่มือวิศวกรรม & มาตรฐานไฟฟ้า',
      learningEn: 'Engineering Standards & Docs',
      learningBadge: 'Docs',
      profileTh: 'โปรไฟล์ & รายงานมาตรวัดอาคาร',
      profileEn: 'Profile & Facility Meter Logs',
      budgetSubtitleTh: 'บริหาร Peak Demand และอัตรา TOU ขนาดใหญ่',
      budgetSubtitleEn: 'Manage Large General Service TOU & Maximum Demand'
    }
  }
};

export const getPersonaConfig = (persona: UserPersona = 'student'): PersonaConfig => {
  return PERSONA_CONFIGS[persona] || PERSONA_CONFIGS.student;
};

export const getHousesForPersona = (persona: UserPersona = 'student'): House[] => {
  return (PERSONA_CONFIGS[persona] || PERSONA_CONFIGS.student).houses;
};
