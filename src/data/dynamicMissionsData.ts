import { 
  Mission, 
  DynamicMissionCategory, 
  LongTermGoal, 
  AiMissionRecommendation,
  SmartRewardInfo 
} from '../types';

export const INITIAL_DYNAMIC_MISSIONS: Mission[] = [
  // 1. DAILY MISSIONS
  {
    id: 'm_daily_budget',
    category: 'daily',
    type: 'stay_under_budget',
    title: 'รักษางบประมาณค่าไฟวันนี้',
    titleEn: 'Stay Under Today\'s Budget',
    description: 'คุมยอดใช้ไฟฟ้าวันนี้ไม่ให้เกินงบเฉลี่ยรายวัน (เป้าหมายไม่เกิน ฿80/วัน)',
    descriptionEn: 'Keep today\'s electricity cost below daily average limit (Target <= ฿80)',
    xpReward: 50,
    coinReward: 20,
    completed: false,
    icon: 'Wallet',
    progress: 1,
    maxProgress: 1,
    difficulty: 'Easy',
    timeRequiredMinutes: 1,
    smartReward: {
      rewardType: 'coins',
      rewardValueTh: '+20 Coins สภาพคล่อง',
      rewardIcon: 'Coins'
    }
  },
  {
    id: 'm_daily_lesson',
    category: 'daily',
    type: 'finish_lesson',
    title: 'เรียนรู้บทเรียนสั้น 1 เรื่อง',
    titleEn: 'Finish 1 Quick Lesson',
    description: 'อ่านบทเรียนใน Skill Tree หรือตอบแบบทดสอบ 1 ข้อสั้นๆ',
    descriptionEn: 'Complete 1 quick lesson in Skill Tree or answer 1 quiz',
    xpReward: 60,
    coinReward: 25,
    completed: true,
    icon: 'BookOpen',
    progress: 1,
    maxProgress: 1,
    difficulty: 'Easy',
    timeRequiredMinutes: 2,
    smartReward: {
      rewardType: 'certificate',
      rewardValueTh: 'สะสมความรู้ไฟฟ้า',
      rewardIcon: 'Award'
    }
  },

  // 2. REAL-WORLD LIFESTYLE MISSIONS (Manual Completion + AI Estimated Savings)
  {
    id: 'm_realworld_unplug',
    category: 'lifestyle',
    type: 'real_world_unplug',
    title: '🔌 ถอดปลั๊กพ่วงและอุปกรณ์สแตนด์บายที่ไม่ใช้',
    titleEn: 'Actually Unplug Unused Electronics',
    description: 'เดินตรวจในห้อง ถอดปลั๊กทีวี ไมโครเวฟ หรือที่ชาร์จที่ไม่ได้ใช้งานจริงในบ้าน',
    descriptionEn: 'Inspect your room and physically unplug idle microwave, TV or chargers',
    xpReward: 80,
    coinReward: 35,
    completed: false,
    icon: 'Power',
    progress: 0,
    maxProgress: 1,
    difficulty: 'Easy',
    timeRequiredMinutes: 3,
    realWorldInfo: {
      isRealWorld: true,
      manualCompleted: false,
      aiEstimatedSavingThb: 14.50,
      aiEstimatedSavingKwh: 0.52,
      verificationTipTh: 'การตัดไฟสแตนด์บาย 15 วัตต์ นาน 24 ชั่วโมง ช่วยประหยัดเงินได้ประมาณ 1.5 บาท/วัน'
    },
    smartReward: {
      rewardType: 'stamp',
      rewardValueTh: 'ตราประทับไฟแฝง',
      rewardIcon: 'ShieldCheck'
    }
  },
  {
    id: 'm_realworld_ac_temp',
    category: 'lifestyle',
    type: 'real_world_ac_temp',
    title: '❄️ ปรับเพิ่มอุณหภูมิแอร์ขึ้น 1°C (เช่น 25°C → 26°C)',
    titleEn: 'Increase AC Temperature by 1°C',
    description: 'ปรับรีโมทแอร์ขึ้น 1°C พร้อมเปิดพัดลมช่วยกระจายลมเย็นแทน',
    descriptionEn: 'Raise AC setpoint by 1°C and turn on a circulating fan',
    xpReward: 90,
    coinReward: 40,
    completed: false,
    icon: 'Thermometer',
    progress: 0,
    maxProgress: 1,
    difficulty: 'Medium',
    timeRequiredMinutes: 1,
    realWorldInfo: {
      isRealWorld: true,
      manualCompleted: false,
      aiEstimatedSavingThb: 28.00,
      aiEstimatedSavingKwh: 1.10,
      verificationTipTh: 'การปรับแอร์ขึ้น 1°C ช่วยลดภาระคอมเพรสเซอร์ลง 8-10% ลดค่าไฟได้ทันที'
    },
    smartReward: {
      rewardType: 'stamp',
      rewardValueTh: 'ตราประทับนินจาแอร์',
      rewardIcon: 'Sparkles'
    }
  },

  // 3. MISSION CHAIN (3-Step Progression)
  {
    id: 'm_chain_step1',
    category: 'daily',
    type: 'use_ai_coach',
    title: '🔗 สายภารกิจ (1/3): ปรึกษา AI Coach 1 คำถาม',
    titleEn: 'Chain (1/3): Ask AI Coach 1 Question',
    description: 'ถาม Voltie AI เกี่ยวกับจุดกินไฟหรือวิธีประหยัดค่าไฟในบ้าน',
    descriptionEn: 'Ask Voltie AI Coach for a personalized energy tip',
    xpReward: 70,
    coinReward: 30,
    completed: true,
    icon: 'Sparkles',
    progress: 1,
    maxProgress: 1,
    difficulty: 'Easy',
    timeRequiredMinutes: 2,
    chainInfo: {
      chainId: 'chain_expert_saver',
      stepNumber: 1,
      totalSteps: 3,
      unlocksNextMissionId: 'm_chain_step2',
      chainTitleTh: 'สายภารกิจผู้เชี่ยวชาญการประหยัดไฟ (Weekly Expert Challenge)',
      isUnlocked: true
    }
  },
  {
    id: 'm_chain_step2',
    category: 'weekly',
    type: 'compare_appliances',
    title: '🔗 สายภารกิจ (2/3): เปรียบเทียบเครื่องใช้ไฟฟ้าใน Compare Lab',
    titleEn: 'Chain (2/3): Compare 2 Devices in Compare Lab',
    description: 'เปรียบเทียบกำลังวัตต์และค่าไฟของแอร์ Inverter กับแอร์ธรรมดา',
    descriptionEn: 'Compare wattage and bill impact of Inverter vs Standard AC',
    xpReward: 120,
    coinReward: 50,
    completed: false,
    icon: 'Scale',
    progress: 0,
    maxProgress: 1,
    difficulty: 'Medium',
    timeRequiredMinutes: 3,
    chainInfo: {
      chainId: 'chain_expert_saver',
      stepNumber: 2,
      totalSteps: 3,
      unlocksNextMissionId: 'm_chain_step3',
      chainTitleTh: 'สายภารกิจผู้เชี่ยวชาญการประหยัดไฟ (Weekly Expert Challenge)',
      isUnlocked: true
    }
  },
  {
    id: 'm_chain_step3',
    category: 'monthly',
    type: 'improve_saving_score',
    title: '🔗 สายภารกิจ (3/3): ยกระดับ Saving Score สู่ระดับ 85 คะแนน',
    titleEn: 'Chain (3/3): Boost Saving Score to 85+',
    description: 'ปรับแต่งอุปกรณ์และลดการใช้พลังงานให้ได้คะแนนออมไฟรวมเกิน 85 คะแนน',
    descriptionEn: 'Optimize home appliances to achieve overall Saving Score above 85',
    xpReward: 300,
    coinReward: 150,
    completed: false,
    icon: 'Trophy',
    progress: 78,
    maxProgress: 85,
    difficulty: 'Hard',
    timeRequiredMinutes: 10,
    chainInfo: {
      chainId: 'chain_expert_saver',
      stepNumber: 3,
      totalSteps: 3,
      chainTitleTh: 'สายภารกิจผู้เชี่ยวชาญการประหยัดไฟ (Weekly Expert Challenge)',
      isUnlocked: false
    },
    smartReward: {
      rewardType: 'title',
      rewardValueTh: 'ฉายาพิเศษ: Master Energy Guardian',
      rewardIcon: 'Crown'
    }
  },

  // 4. APPLIANCE & ANALYTICS MISSIONS
  {
    id: 'm_appliance_runtime',
    category: 'appliance',
    type: 'update_runtime',
    title: 'อัปเดตชั่วโมงใช้งานตู้เย็นและแอร์',
    titleEn: 'Update Fridge & AC Runtime',
    description: 'ปรับแต่งชั่วโมงการเปิดใช้งานจริงในเมนู Appliances เพื่อการคำนวณที่แม่นยำ',
    descriptionEn: 'Adjust actual operational hours for accurate energy estimates',
    xpReward: 60,
    coinReward: 25,
    completed: false,
    icon: 'Clock',
    progress: 0,
    maxProgress: 1,
    difficulty: 'Easy',
    timeRequiredMinutes: 1
  },
  {
    id: 'm_analytics_explore',
    category: 'analytics',
    type: 'explain_bill',
    title: 'วิเคราะห์กราฟการใช้ไฟใน Analytics',
    titleEn: 'Analyze Electricity Graph in Analytics',
    description: 'สำรวจแนวโน้มการกินไฟรายวันและดูช่วงเวลากินไฟสูงสุด (Peak Hour)',
    descriptionEn: 'Review daily load curves and peak electricity usage hours',
    xpReward: 80,
    coinReward: 30,
    completed: true,
    icon: 'BarChart2',
    progress: 1,
    maxProgress: 1,
    difficulty: 'Easy',
    timeRequiredMinutes: 2
  },

  // 5. COMMUNITY & SEASONAL EVENT MISSIONS
  {
    id: 'm_seasonal_summer',
    category: 'seasonal_event',
    type: 'reduce_ac_runtime',
    title: '☀️ ภารกิจรับหน้าร้อน: ลดชั่วโมงแอร์ลง 1 ชั่วโมง/วัน',
    titleEn: 'Summer Event: Cut AC Usage by 1 Hour/Day',
    description: 'ตั้งเวลาปิดแอร์เร็วขึ้น 1 ชั่วโมงในช่วงเช้ามืด เพื่อรับคูณ 2x XP พิเศษ',
    descriptionEn: 'Set AC off timer 1 hour earlier in the morning for 2x XP bonus',
    xpReward: 150,
    coinReward: 60,
    completed: false,
    icon: 'Sun',
    progress: 0,
    maxProgress: 1,
    difficulty: 'Medium',
    timeRequiredMinutes: 1,
    smartReward: {
      rewardType: 'theme',
      rewardValueTh: 'ธีมฤดูร้อน Summer Sunshine Frame',
      rewardIcon: 'Sun'
    }
  },
  {
    id: 'm_community_event',
    category: 'community_event',
    type: 'complete_minigame',
    title: '🌐 ชาเลนจ์ชุมชน: พิชิตมินิเกมประลองกำลังไฟ 1 รอบ',
    titleEn: 'Community Challenge: Play 1 Power Battle Game',
    description: 'ร่วมสนุกใน Mini-Games Hub สะสมคะแนนร่วมกับผู้ใช้คนอื่นๆ ในชุมชน',
    descriptionEn: 'Participate in Mini-Games Hub to contribute to community goals',
    xpReward: 90,
    coinReward: 40,
    completed: false,
    icon: 'Gamepad2',
    progress: 0,
    maxProgress: 1,
    difficulty: 'Easy',
    timeRequiredMinutes: 2
  },

  // 6. HIDDEN & ACHIEVEMENT MISSIONS
  {
    id: 'm_hidden_night_owl',
    category: 'hidden',
    type: 'real_world_standby',
    title: '🕵️ ภารกิจลับ: ปราบไฟสแตนด์บายยามวิกาล (Night Buster)',
    titleEn: 'Hidden Mission: Midnight Standby Elimination',
    description: 'เปิดแอปและปิดอุปกรณ์สแตนด์บายหลังเวลา 22:00 น. เพื่อรับตราลับพิเศษ',
    descriptionEn: 'Open app and eliminate standby power after 10 PM for secret stamp',
    xpReward: 200,
    coinReward: 80,
    completed: false,
    icon: 'Moon',
    progress: 0,
    maxProgress: 1,
    difficulty: 'Hard',
    timeRequiredMinutes: 2,
    smartReward: {
      rewardType: 'stamp',
      rewardValueTh: 'ตราประทับลับ: นินจาราตรี',
      rewardIcon: 'Award'
    }
  }
];

export const INITIAL_LONG_TERM_GOALS: LongTermGoal[] = [
  {
    id: 'goal_30d',
    titleTh: 'เป้าหมาย 30 วัน: ประหยัดค่าไฟ ฿500',
    titleEn: '30-Day Goal: Save ฿500 Electricity Bill',
    targetDays: 30,
    currentDays: 12,
    targetSavingThb: 500,
    currentSavingThb: 320,
    rewardTitleTh: 'กรอบอวตาร 30-Day Saver Badge & +300 Coins',
    icon: 'Calendar',
    status: 'in_progress'
  },
  {
    id: 'goal_90d',
    titleTh: 'เป้าหมาย 90 วัน: ปลูกฝังนิสัยออมไฟยั่งยืน',
    titleEn: '90-Day Goal: Sustainable Eco Habits',
    targetDays: 90,
    currentDays: 45,
    targetSavingThb: 1800,
    currentSavingThb: 1150,
    rewardTitleTh: 'ใบประกาศนียบัตร Eco Champion Certificate',
    icon: 'Award',
    status: 'in_progress'
  },
  {
    id: 'goal_365d',
    titleTh: 'เป้าหมายประจำปี 1 ปี: ลดคาร์บอน CO₂ รวม 200 กก.',
    titleEn: 'Yearly Goal: 200 kg CO₂ Reduction',
    targetDays: 365,
    currentDays: 140,
    targetSavingThb: 6000,
    currentSavingThb: 3850,
    rewardTitleTh: 'สกินอวตารระดับตำนาน Legend Solar Guardian',
    icon: 'Crown',
    status: 'in_progress'
  }
];

export const AI_RECOMMENDED_MISSION: AiMissionRecommendation = {
  missionId: 'm_realworld_ac_temp',
  expectedSavingThb: 28.00,
  difficulty: 'Medium',
  timeRequiredMinutes: 1,
  knowledgeGainedTh: 'เข้าใจผลกระทบภาระคอมเพรสเซอร์แอร์จากการปรับอุณหภูมิ',
  reasonTh: 'เนื่องจากสภาพอากาศภายนอกสัปดาห์นี้ร้อนสูง 36°C การปรับเพิ่มอุณหภูมิแอร์ขึ้น 1°C เป็นวิธีที่ให้ผลประหยัดเงินสูงสุดทันที!'
};

// Dynamic Mission Generator function based on user state
export function generateDynamicMissions(userContext: {
  savingScore: number;
  monthlyBudget: number;
  currentBillEstimate: number;
  knowledgeLevel: number;
  weatherSeason: 'summer' | 'rainy' | 'cool';
}): Mission[] {
  const generated = [...INITIAL_DYNAMIC_MISSIONS];

  // If budget is close to limit, insert an urgent Budget Recovery Mission
  if (userContext.currentBillEstimate > userContext.monthlyBudget * 0.85) {
    generated.unshift({
      id: 'm_urgent_budget_salvage',
      category: 'budget',
      type: 'stay_under_budget',
      title: '🚨 ภารกิจเร่งด่วน: กู้วิกฤตงบค่าไฟเกิน 85%',
      titleEn: 'Urgent: Recover 85%+ Budget Limit',
      description: 'ปรับลดเวลาแอร์และเครื่องทำน้ำอุ่นเพื่อชะลอยอดบิลไม่ให้ทะลุเพดานงบ',
      descriptionEn: 'Reduce AC runtime to prevent monthly budget breach',
      xpReward: 250,
      coinReward: 100,
      completed: false,
      icon: 'AlertTriangle',
      progress: 0,
      maxProgress: 1,
      difficulty: 'Hard',
      timeRequiredMinutes: 5,
      smartReward: {
        rewardType: 'coins',
        rewardValueTh: '+100 Coins ช่วยเหลืองบ',
        rewardIcon: 'Coins'
      }
    });
  }

  return generated;
}
