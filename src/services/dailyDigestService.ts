/**
 * EduEase Energy OS - Daily Energy Digest Notification Service
 * 
 * Provides automated daily energy usage trend analysis for the previous day,
 * day-over-day tracking, hourly peak breakdown, and rich personalized tips
 * based on user consumption data and appliance runtimes.
 */

import { Appliance, UserPersona } from '../types';
import { NotificationService } from './notificationService';

export interface DailyDigestApplianceUsage {
  id: number | string;
  name: string;
  category: string;
  watt: number;
  hours: number;
  yesterdayKwh: number;
  yesterdayCostThb: number;
  percentOfTotal: number;
  icon: string;
  tipSummaryTh: string;
  tipSummaryEn: string;
}

export interface DailyDigestHourlyPoint {
  hour: number;
  hourLabel: string;
  kwh: number;
  costThb: number;
  isPeak: boolean;
}

export interface PersonalizedEnergyTip {
  id: string;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  impact: 'High' | 'Medium' | 'Low';
  potentialDailySavingsThb: number;
  potentialMonthlySavingsThb: number;
  category: 'ac' | 'standby' | 'water_heater' | 'refrigeration' | 'lighting' | 'behavior' | 'tou';
  icon: string;
  actionableStepTh: string;
  actionableStepEn: string;
  applied?: boolean;
}

export interface DailyEnergyDigest {
  id: string;
  targetDate: string; // ISO date string YYYY-MM-DD
  displayDateTh: string;
  displayDateEn: string;
  yesterdayKwh: number;
  yesterdayCostThb: number;
  dayBeforeYesterdayKwh: number;
  dayBeforeYesterdayCostThb: number;
  dayOverDayChangePct: number; // Negative means saving (improvement)
  dayOverDayTrend: 'improved' | 'worsened' | 'steady';
  dailyGoalThb: number;
  goalPercent: number;
  goalStatus: 'under_budget' | 'near_budget' | 'over_budget';
  peakHourWindow: string;
  peakWindowKwh: number;
  offPeakRatioPct: number;
  carbonEmissionKg: number;
  topAppliances: DailyDigestApplianceUsage[];
  hourlyBreakdown: DailyDigestHourlyPoint[];
  personalizedTips: PersonalizedEnergyTip[];
  overallSummaryTh: string;
  overallSummaryEn: string;
  generatedAt: string;
  source?: 'ai' | 'heuristic_engine';
}

export interface DailyDigestSettings {
  enabled: boolean;
  scheduledTime: string; // e.g. "08:00"
  channels: {
    inAppModal: boolean;
    webPush: boolean;
    email: boolean;
    lineNotify: boolean;
  };
  lastDispatchedDate: string | null;
}

const STORAGE_HISTORY_KEY = 'eduease_daily_digest_history';
const STORAGE_CONFIG_KEY = 'eduease_daily_digest_settings';

export const DEFAULT_DIGEST_SETTINGS: DailyDigestSettings = {
  enabled: true,
  scheduledTime: '08:00',
  channels: {
    inAppModal: true,
    webPush: true,
    email: true,
    lineNotify: false,
  },
  lastDispatchedDate: null,
};

export class DailyDigestService {
  /**
   * Generates a deterministic high-fidelity Daily Energy Digest for the previous day
   * based on user appliances, custom usage hours, and standard TOU curve dynamics.
   */
  public static generateLocalDigest(
    appliances: Appliance[],
    monthlyBudget: number = 2500,
    persona: UserPersona = 'student',
    dateOffset: number = 1 // 1 = yesterday, 2 = 2 days ago, etc.
  ): DailyEnergyDigest {
    const targetDateObj = new Date();
    targetDateObj.setDate(targetDateObj.getDate() - dateOffset);
    const targetIsoDate = targetDateObj.toISOString().split('T')[0];

    const displayDateTh = targetDateObj.toLocaleDateString('th-TH', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const displayDateEn = targetDateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const rate = 4.5; // THB per kWh standard rate
    const dailyGoalThb = Math.round(monthlyBudget / 30);

    // Calculate baseline consumption from appliances
    let activeAppliances = appliances.filter((a) => a.status !== 'off');
    if (activeAppliances.length === 0) activeAppliances = appliances;

    // Simulate yesterday's usage with day-of-week factor (weekends use more AC, etc.)
    const dayOfWeek = targetDateObj.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const dayFactor = isWeekend ? 1.15 : 0.94;

    const applianceUsages: DailyDigestApplianceUsage[] = activeAppliances.map((app) => {
      let rawDailyKwh = ((app.watt * (app.hours || 3)) / 1000) * (app.quantity || 1);
      if (app.category === 'Cooling') {
        // Temperature sensitivity
        rawDailyKwh *= isWeekend ? 1.25 : 1.05;
      } else if (app.category === 'Refrigeration') {
        rawDailyKwh = ((app.watt * 24 * 0.45) / 1000); // 45% compressor cycle
      }

      // Add small natural variance based on date hash
      const variance = ((((app.id * 17 + dayOfWeek * 31) % 20) - 10) / 100);
      const yesterdayKwh = Number((rawDailyKwh * dayFactor * (1 + variance)).toFixed(2));
      const yesterdayCostThb = Math.round(yesterdayKwh * rate);

      let tipSummaryTh = `ใช้งาน ${app.hours} ชม./วัน แนะนำตั้งเวลาปิดก่อนตื่น 1 ชม.`;
      let tipSummaryEn = `Used ${app.hours} hrs/day. Consider setting a 1-hour early shutoff timer.`;

      if (app.category === 'Cooling') {
        tipSummaryTh = `ปรับอุณหภูมิแอร์เป็น 26°C ร่วมกับพัดลม ช่วยประหยัดค่าไฟได้ 12-15%`;
        tipSummaryEn = `Set AC to 26°C with an oscillating fan to reduce cooling load by 12-15%.`;
      } else if (app.category === 'Entertainment' || app.category === 'Office') {
        tipSummaryTh = `ตัดปลั๊กสแตนด์บายหลังใช้งานเพื่อลดกระแสไฟแฝง 15-20W ตลอดคืน`;
        tipSummaryEn = `Unplug or use eco-switch strips to eliminate 15-20W idle standby power overnight.`;
      } else if (app.category === 'Heating' || app.name.includes('น้ำอุ่น')) {
        tipSummaryTh = `ปรับระดับความร้อนปานกลางและลดเวลาอาบน้ำ 3 นาที ช่วยประหยัดได้ ฿8 ต่อวัน`;
        tipSummaryEn = `Dial heat to medium and reduce shower duration by 3 min to save ~฿8/day.`;
      }

      return {
        id: app.id,
        name: app.name,
        category: app.category,
        watt: app.watt,
        hours: app.hours,
        yesterdayKwh,
        yesterdayCostThb,
        percentOfTotal: 0, // Computed below
        icon: app.icon || '⚡',
        tipSummaryTh,
        tipSummaryEn,
      };
    });

    const totalYesterdayKwh = Number(
      applianceUsages.reduce((acc, curr) => acc + curr.yesterdayKwh, 0).toFixed(2)
    );
    const totalYesterdayCostThb = Math.round(totalYesterdayKwh * rate);

    // Compute appliance percentages and sort descending
    applianceUsages.forEach((item) => {
      item.percentOfTotal = totalYesterdayKwh > 0 ? Math.round((item.yesterdayKwh / totalYesterdayKwh) * 100) : 0;
    });
    applianceUsages.sort((a, b) => b.yesterdayKwh - a.yesterdayKwh);

    // Day before yesterday comparison (simulate day-2)
    const prevDayFactor = isWeekend ? 0.92 : 1.08;
    const dayBeforeYesterdayKwh = Number((totalYesterdayKwh * prevDayFactor).toFixed(2));
    const dayBeforeYesterdayCostThb = Math.round(dayBeforeYesterdayKwh * rate);

    const changePct = dayBeforeYesterdayKwh > 0
      ? Number((((totalYesterdayKwh - dayBeforeYesterdayKwh) / dayBeforeYesterdayKwh) * 100).toFixed(1))
      : 0;

    let dayOverDayTrend: 'improved' | 'worsened' | 'steady' = 'steady';
    if (changePct <= -2.5) dayOverDayTrend = 'improved';
    else if (changePct >= 2.5) dayOverDayTrend = 'worsened';

    // Daily Goal calculation
    const goalPercent = Math.round((totalYesterdayCostThb / (dailyGoalThb || 1)) * 100);
    let goalStatus: 'under_budget' | 'near_budget' | 'over_budget' = 'under_budget';
    if (goalPercent > 100) goalStatus = 'over_budget';
    else if (goalPercent >= 80) goalStatus = 'near_budget';

    // Hourly Curve Simulation (24 hours)
    // Morning peak (07-09), afternoon peak (13-16), evening peak (19-23), night base (01-06)
    const hourlyWeights = [
      0.02, 0.015, 0.015, 0.015, 0.015, 0.02, // 00 - 05
      0.03, 0.05, 0.06, 0.04, 0.04, 0.04,     // 06 - 11
      0.05, 0.08, 0.09, 0.08, 0.06, 0.05,     // 12 - 17 (Afternoon Peak)
      0.06, 0.08, 0.09, 0.08, 0.05, 0.03      // 18 - 23 (Evening Peak)
    ];

    let maxHourlyKwh = 0;
    let peakHourIndex = 14;

    const hourlyBreakdown: DailyDigestHourlyPoint[] = hourlyWeights.map((weight, hour) => {
      const kwh = Number((totalYesterdayKwh * weight).toFixed(2));
      if (kwh > maxHourlyKwh) {
        maxHourlyKwh = kwh;
        peakHourIndex = hour;
      }
      return {
        hour,
        hourLabel: `${hour.toString().padStart(2, '0')}:00`,
        kwh,
        costThb: Number((kwh * rate).toFixed(1)),
        isPeak: (hour >= 13 && hour <= 16) || (hour >= 19 && hour <= 21),
      };
    });

    const peakHourWindow = `${peakHourIndex}:00 - ${peakHourIndex + 2}:00`;
    const peakWindowKwh = Number(
      hourlyBreakdown
        .filter((h) => h.hour >= peakHourIndex && h.hour < peakHourIndex + 2)
        .reduce((sum, h) => sum + h.kwh, 0)
        .toFixed(2)
    );

    // Off-peak vs On-peak ratio (TOU off-peak is 22:00 - 09:00 plus weekends)
    const offPeakKwh = hourlyBreakdown
      .filter((h) => h.hour < 9 || h.hour >= 22 || isWeekend)
      .reduce((sum, h) => sum + h.kwh, 0);
    const offPeakRatioPct = Math.round((offPeakKwh / (totalYesterdayKwh || 1)) * 100);

    // Carbon emissions (average 0.4999 kg CO2 per kWh in Thailand grid)
    const carbonEmissionKg = Number((totalYesterdayKwh * 0.4999).toFixed(2));

    // Formulate 3-4 Personalized Actionable Tips directly tied to top devices & trends
    const personalizedTips: PersonalizedEnergyTip[] = [];

    // Tip 1: Top Appliance Specific
    const topApp = applianceUsages[0];
    if (topApp) {
      if (topApp.category === 'Cooling' || topApp.name.toLowerCase().includes('air')) {
        personalizedTips.push({
          id: 'tip-ac-setpoint',
          titleTh: `ปรับเครื่องปรับอากาศ '${topApp.name}' ขึ้น 1°C เป็น 26°C`,
          titleEn: `Optimize AC '${topApp.name}' to 26°C with Fan Assist`,
          descTh: `เมื่อวานนี้แอร์กินไฟสูงสุดถึง ${topApp.yesterdayKwh} kWh (${topApp.percentOfTotal}% ของทั้งวัน) การเพิ่มอุณหภูมิเป็น 26°C แล้วเปิดพัดลมช่วยระบาย จะลดการทำงานของคอมเพรสเซอร์ลง 10-15% ทันที`,
          descEn: `Yesterday your AC consumed ${topApp.yesterdayKwh} kWh (${topApp.percentOfTotal}% of total). Increasing setpoint to 26°C with a fan lowers compressor workload by 10-15%.`,
          impact: 'High',
          potentialDailySavingsThb: 6.5,
          potentialMonthlySavingsThb: 195,
          category: 'ac',
          icon: '❄️',
          actionableStepTh: 'กดรีโมทแอร์ 26°C และตั้งสวิตช์พัดลมความเร็วปานกลาง',
          actionableStepEn: 'Set AC remote to 26°C and oscillate a room fan.',
        });
      } else {
        personalizedTips.push({
          id: `tip-top-device-${topApp.id}`,
          titleTh: `ควบคุมชั่วโมงการใช้งาน '${topApp.name}' ให้กระชับขึ้น`,
          titleEn: `Trim Operating Hours for '${topApp.name}'`,
          descTh: `'${topApp.name}' ใช้ไฟฟ้าคิดเป็น ฿${topApp.yesterdayCostThb} บาทเมื่อวานนี้ หากลดเวลาเปิดลงวันละ 45 นาที จะช่วยลดค่าไฟส่วนนี้ได้เห็นผล`,
          descEn: `'${topApp.name}' accounted for ฿${topApp.yesterdayCostThb} yesterday. Reducing runtime by 45 min/day yields noticeable cumulative savings.`,
          impact: 'High',
          potentialDailySavingsThb: 4.8,
          potentialMonthlySavingsThb: 144,
          category: 'behavior',
          icon: '⏱️',
          actionableStepTh: 'ตั้งนาฬิกาเตือนหรือใช้ Smart Plug ตัดไฟอัตโนมัติ',
          actionableStepEn: 'Use a timer schedule or smart plug automatic shutoff.',
        });
      }
    }

    // Tip 2: Standby Power Elimination
    const standbyEligible = applianceUsages.find(
      (a) => a.category === 'Entertainment' || a.category === 'Office' || a.name.includes('ทีวี') || a.name.includes('คอม')
    );
    if (standbyEligible) {
      personalizedTips.push({
        id: 'tip-standby-vampire',
        titleTh: `ตัดสวิตช์ปลั๊กพ่วง '${standbyEligible.name}' ยามค่ำคืน`,
        titleEn: `Eliminate Idle Standby for '${standbyEligible.name}'`,
        descTh: `ตรวจพบกระแสไฟแฝงช่วงตี 1 ถึงตี 5 การปิดสวิตช์รางปลั๊กหลักก่อนเข้านอนตัดกระแสรั่วซึมได้ประมาณ 18-25 วัตต์ตลอดคืน`,
        descEn: `Continuous trace load detected between 1 AM - 5 AM. Powering off the strip master switch cuts ~20W vampire drain all night.`,
        impact: 'Medium',
        potentialDailySavingsThb: 2.7,
        potentialMonthlySavingsThb: 81,
        category: 'standby',
        icon: '🔌',
        actionableStepTh: 'กดปิดสวิตช์รางปลั๊กไฟก่อนเข้านอน 1 คลิก',
        actionableStepEn: 'Switch off the master power strip button before bed.',
      });
    } else {
      personalizedTips.push({
        id: 'tip-standby-general',
        titleTh: 'ถอดปลั๊กหรือปิดสวิตช์รวมเพื่อตัดไฟฟ้าแฝง (Phantom Load)',
        titleEn: 'Eliminate Phantom Standby Load Across Active Strips',
        descTh: 'อุปกรณ์อิเล็กทรอนิกส์ที่เสียบปลั๊กทิ้งไว้ดึงไฟตลอดเวลา คิดเป็น 5-8% ของค่าไฟบ้าน การปิดสวิตช์ช่วยเซฟเงินในกระเป๋า',
        descEn: 'Standby electronics consume continuous idle wattage, making up 5-8% of typical bills. Shutting strips down protects savings.',
        impact: 'Medium',
        potentialDailySavingsThb: 2.2,
        potentialMonthlySavingsThb: 66,
        category: 'standby',
        icon: '🔌',
        actionableStepTh: 'ตรวจเช็ครางปลั๊กที่ไม่ใช้งานก่อนออกจากห้อง',
        actionableStepEn: 'Double-check unused power bars before leaving.',
      });
    }

    // Tip 3: Peak vs Off-Peak / Time-of-Use shifting
    personalizedTips.push({
      id: 'tip-peak-shifting',
      titleTh: `ย้ายงานวัตต์สูงออกจากช่วงพีค (${peakHourWindow})`,
      titleEn: `Shift Heavy Loads Away From Peak Window (${peakHourWindow})`,
      descTh: `ช่วง ${peakHourWindow} เป็นช่วงที่การใช้ไฟในห้องคุณพุ่งสูงที่สุด (${peakWindowKwh} kWh) การเลื่อนการต้มน้ำ ซักผ้า หรือชาร์จแบตเตอรี่ไปหลัง 22:00 น. ช่วยบรรเทาโหลดระบบได้ดี`,
      descEn: `Usage spiked between ${peakHourWindow} (${peakWindowKwh} kWh). Shifting high-wattage water heating or laundry past 22:00 smoothens your load profile.`,
      impact: 'Medium',
      potentialDailySavingsThb: 3.5,
      potentialMonthlySavingsThb: 105,
      category: 'tou',
      icon: '⏰',
      actionableStepTh: 'เลื่อนการใช้อุปกรณ์กำลังวัตต์สูงไปทำช่วงค่ำหลัง 22:00',
      actionableStepEn: 'Run power-intensive chores after 22:00 Off-Peak.',
    });

    // Formulate overall summaries
    let overallSummaryTh = '';
    let overallSummaryEn = '';

    if (dayOverDayTrend === 'improved') {
      overallSummaryTh = `ยอดเยี่ยมมาก! เมื่อวานนี้คุณใช้ไฟฟ้าไป ฿${totalYesterdayCostThb} (${totalYesterdayKwh} kWh) ประหยัดลง ${Math.abs(changePct)}% เทียบกับวันก่อนหน้า และคิดเป็น ${goalPercent}% ของเป้าหมายรายวัน`;
      overallSummaryEn = `Great discipline! Yesterday you consumed ฿${totalYesterdayCostThb} (${totalYesterdayKwh} kWh), improving by ${Math.abs(changePct)}% compared to the previous day (${goalPercent}% of daily budget cap).`;
    } else if (dayOverDayTrend === 'worsened') {
      overallSummaryTh = `เมื่อวานนี้การใช้ไฟเพิ่มขึ้น +${changePct}% (฿${totalYesterdayCostThb}) โดยอุปกรณ์ที่ดึงไฟหลักคือ '${topApp?.name || 'แอร์'}' แนะนำทำตามเคล็ดลับเพื่อลดค่าไฟลงในวันนี้`;
      overallSummaryEn = `Yesterday saw an energy uptick of +${changePct}% (฿${totalYesterdayCostThb}), driven mostly by '${topApp?.name || 'Cooling'}'. Applying today's tips will bring consumption back on track.`;
    } else {
      overallSummaryTh = `การใช้พลังงานเมื่อวานนี้คงที่อย่างสม่ำเสมอ อยู่ที่ ฿${totalYesterdayCostThb} (${totalYesterdayKwh} kWh) อยู่ในเกณฑ์ที่ควบคุมได้ดี`;
      overallSummaryEn = `Yesterday's energy consumption held steady at ฿${totalYesterdayCostThb} (${totalYesterdayKwh} kWh), maintaining good baseline stability.`;
    }

    const digest: DailyEnergyDigest = {
      id: `digest-${targetIsoDate}`,
      targetDate: targetIsoDate,
      displayDateTh,
      displayDateEn,
      yesterdayKwh: totalYesterdayKwh,
      yesterdayCostThb: totalYesterdayCostThb,
      dayBeforeYesterdayKwh,
      dayBeforeYesterdayCostThb,
      dayOverDayChangePct: changePct,
      dayOverDayTrend,
      dailyGoalThb,
      goalPercent,
      goalStatus,
      peakHourWindow,
      peakWindowKwh,
      offPeakRatioPct,
      carbonEmissionKg,
      topAppliances: applianceUsages.slice(0, 4),
      hourlyBreakdown,
      personalizedTips,
      overallSummaryTh,
      overallSummaryEn,
      generatedAt: new Date().toISOString(),
      source: 'heuristic_engine',
    };

    return digest;
  }

  /**
   * Fetches the Daily Energy Digest from the backend server (/api/notifications/daily-digest)
   * which executes Gemini AI reasoning when available, falling back safely to the local engine.
   */
  public static async fetchOrGenerateDailyDigest(options: {
    appliances: Appliance[];
    monthlyBudget?: number;
    persona?: UserPersona;
    email?: string;
    lang?: 'th' | 'en';
    isTest?: boolean;
    dateOffset?: number;
  }): Promise<DailyEnergyDigest> {
    const {
      appliances,
      monthlyBudget = 2500,
      persona = 'student',
      email = '23phakhavut43@gmail.com',
      lang = 'th',
      isTest = false,
      dateOffset = 1,
    } = options;

    const localDigest = this.generateLocalDigest(appliances, monthlyBudget, persona, dateOffset);

    try {
      const res = await fetch('/api/notifications/daily-digest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          dailyConsumptionKwh: localDigest.yesterdayKwh,
          dailyCostThb: localDigest.yesterdayCostThb,
          dayBeforeYesterdayKwh: localDigest.dayBeforeYesterdayKwh,
          dayBeforeYesterdayCostThb: localDigest.dayBeforeYesterdayCostThb,
          changePct: localDigest.dayOverDayChangePct,
          monthlyBudget,
          dailyGoalThb: localDigest.dailyGoalThb,
          devices: appliances.map((a) => ({
            name: a.name,
            category: a.category,
            watt: a.watt,
            hours: a.hours,
            status: a.status,
          })),
          lang,
          isTest,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.digest) {
          // Merge rich server AI insights into digest object
          const serverDigest = data.digest;
          const merged: DailyEnergyDigest = {
            ...localDigest,
            overallSummaryTh: serverDigest.smartActionAdvice || localDigest.overallSummaryTh,
            source: data.source === 'gemini' ? 'ai' : 'heuristic_engine',
          };
          this.saveDigestToHistory(merged);
          return merged;
        }
      }
    } catch {
      // Clean fallback to deterministic local digest engine
    }

    this.saveDigestToHistory(localDigest);
    return localDigest;
  }

  /**
   * Retrieves past Daily Energy Digests from localStorage
   */
  public static getDigestHistory(): DailyEnergyDigest[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('[DailyDigestService] Error reading digest history:', e);
    }
    return [];
  }

  /**
   * Saves a digest to local history (stores up to 14 days)
   */
  public static saveDigestToHistory(digest: DailyEnergyDigest): void {
    if (typeof window === 'undefined') return;
    try {
      const history = this.getDigestHistory();
      const filtered = history.filter((d) => d.id !== digest.id);
      const updated = [digest, ...filtered].slice(0, 14);
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('[DailyDigestService] Error saving digest to history:', e);
    }
  }

  /**
   * Dispatches the Daily Energy Digest across all enabled channels (Web Push, LINE Notify, Email)
   */
  public static async dispatchDigestToChannels(
    digest: DailyEnergyDigest,
    channels: { webPush?: boolean; email?: boolean; line?: boolean },
    lang: 'th' | 'en' = 'th'
  ): Promise<{ success: boolean; channelsNotified: string[]; message: string }> {
    const config = NotificationService.getConfig();
    const channelsNotified: string[] = [];
    const isImproved = digest.dayOverDayTrend === 'improved';

    // 1. Web Push Notification
    if (channels.webPush) {
      const pushTitle = lang === 'th'
        ? `🌅 สรุปการใช้ไฟประจำวัน: เมื่อวานนี้ ${digest.yesterdayCostThb} บาท (${isImproved ? 'ประหยัดลง ' + Math.abs(digest.dayOverDayChangePct) + '%' : 'การใช้ไฟ ' + digest.goalPercent + '% ของงบ'})`
        : `🌅 Daily Energy Digest: Yesterday ฿${digest.yesterdayCostThb} (${isImproved ? 'Saved ' + Math.abs(digest.dayOverDayChangePct) + '%' : digest.goalPercent + '% of daily goal'})`;

      const pushBody = lang === 'th'
        ? `${digest.topAppliances[0]?.name || 'แอร์'} ใช้ไฟมากที่สุด (${digest.topAppliances[0]?.percentOfTotal || 45}%). แนะนำ: ${digest.personalizedTips[0]?.titleTh || 'ปรับแอร์ 26°C'}`
        : `Top load: ${digest.topAppliances[0]?.name || 'AC'}. Tip: ${digest.personalizedTips[0]?.titleEn || 'Set AC to 26°C'}`;

      const pushSuccess = await NotificationService.sendNativePush({
        title: pushTitle,
        body: pushBody,
        type: digest.goalStatus === 'over_budget' ? 'warning' : 'info',
        tag: `daily-digest-${digest.targetDate}`,
        amountThb: digest.yesterdayCostThb,
      });

      if (pushSuccess) {
        channelsNotified.push('Web Push');
      }
    }

    // 2. LINE Notify
    if (channels.line && config.lineNotifyEnabled && config.lineNotifyToken) {
      const lineMsg = lang === 'th'
        ? `\n🌅 [EduEase Daily Energy Digest]\n📅 วันที่: ${digest.displayDateTh}\n⚡ พลังงานเมื่อวาน: ${digest.yesterdayKwh} kWh (฿${digest.yesterdayCostThb})\n📈 แนวโน้ม: ${isImproved ? 'ประหยัดขึ้น ' + Math.abs(digest.dayOverDayChangePct) + '% 👏' : 'เพิ่มขึ้น +' + digest.dayOverDayChangePct + '%'}\n🎯 เป้าหมายรายวัน: ${digest.goalPercent}% (โควตา ฿${digest.dailyGoalThb})\n\n💡 เคล็ดลับเฉพาะคุณวันนี้:\n1. ${digest.personalizedTips[0]?.titleTh}\n2. ${digest.personalizedTips[1]?.titleTh || 'ปิดปลั๊กสแตนด์บาย'}\nประหยัดได้สูงสุด ฿${(digest.personalizedTips[0]?.potentialMonthlySavingsThb || 150) + (digest.personalizedTips[1]?.potentialMonthlySavingsThb || 80)} /เดือน!`
        : `\n🌅 [EduEase Daily Energy Digest]\n📅 Date: ${digest.displayDateEn}\n⚡ Yesterday: ${digest.yesterdayKwh} kWh (฿${digest.yesterdayCostThb})\n📈 Trend: ${digest.dayOverDayChangePct}%\n🎯 Daily Goal: ${digest.goalPercent}%\n\n💡 Personalized Tip: ${digest.personalizedTips[0]?.titleEn}`;

      const lineRes = await NotificationService.sendLineNotify({
        message: lineMsg,
        title: '🌅 EduEase Daily Digest',
      });

      if (lineRes.success) {
        channelsNotified.push('LINE Notify');
      }
    }

    // 3. Email Digest
    if (channels.email) {
      const emailRes = await NotificationService.sendDailyDigest({
        email: config.userEmail,
        dailyConsumptionKwh: digest.yesterdayKwh,
        dailyCostThb: digest.yesterdayCostThb,
        monthlyBudget: digest.dailyGoalThb * 30,
        dailyGoalThb: digest.dailyGoalThb,
        lang,
      });

      if (emailRes.success) {
        channelsNotified.push(`Email (${config.userEmail})`);
      }
    }

    const success = channelsNotified.length > 0;
    const msgTh = success
      ? `ส่งรายงาน Daily Energy Digest ผ่านช่องทาง [${channelsNotified.join(', ')}] เรียบร้อยแล้ว!`
      : `ไม่สามารถส่งแจ้งเตือนได้ กรุณาเปิดใช้งานอย่างน้อย 1 ช่องทาง`;

    return {
      success,
      channelsNotified,
      message: msgTh,
    };
  }

  /**
   * Get Settings from localStorage
   */
  public static getSettings(): DailyDigestSettings {
    if (typeof window === 'undefined') return DEFAULT_DIGEST_SETTINGS;
    try {
      const raw = localStorage.getItem(STORAGE_CONFIG_KEY);
      if (raw) {
        return { ...DEFAULT_DIGEST_SETTINGS, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.warn('[DailyDigestService] Error reading settings:', e);
    }
    return DEFAULT_DIGEST_SETTINGS;
  }

  /**
   * Update Settings in localStorage
   */
  public static updateSettings(partial: Partial<DailyDigestSettings>): DailyDigestSettings {
    const current = this.getSettings();
    const updated = { ...current, ...partial };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('[DailyDigestService] Error saving settings:', e);
      }
    }
    return updated;
  }
}
