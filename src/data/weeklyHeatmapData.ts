import { Appliance, UserPersona } from '../types';

export interface HeatmapHourData {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  dayIndex: number; // 0 = Mon, 6 = Sun
  dayLabelTh: string;
  dayLabelEn: string;
  hour: number; // 0 to 23
  hourLabel: string; // "00:00", "01:00", ...
  kwh: number;
  watts: number;
  cost: number;
  isPeak: boolean; // TOU on-peak (Mon-Fri 09:00-22:00)
  level: 1 | 2 | 3 | 4 | 5; // 1: minimal, 5: maximum peak
  primaryApplianceTh: string;
  primaryApplianceEn: string;
  tipTh?: string;
  tipEn?: string;
}

export interface DayWeeklySummary {
  day: string;
  dayLabelTh: string;
  dayLabelEn: string;
  totalKwh: number;
  totalCost: number;
  peakHour: string;
  peakKwh: number;
  offPeakKwh: number;
  onPeakKwh: number;
}

export const DAYS_OF_WEEK = [
  { key: 'Mon', th: 'จันทร์ (Mon)', shortTh: 'จ.', en: 'Monday', shortEn: 'Mon', isWeekend: false },
  { key: 'Tue', th: 'อังคาร (Tue)', shortTh: 'อ.', en: 'Tuesday', shortEn: 'Tue', isWeekend: false },
  { key: 'Wed', th: 'พุธ (Wed)', shortTh: 'พ.', en: 'Wednesday', shortEn: 'Wed', isWeekend: false },
  { key: 'Thu', th: 'พฤหัสบดี (Thu)', shortTh: 'พฤ.', en: 'Thursday', shortEn: 'Thu', isWeekend: false },
  { key: 'Fri', th: 'ศุกร์ (Fri)', shortTh: 'ศ.', en: 'Friday', shortEn: 'Fri', isWeekend: false },
  { key: 'Sat', th: 'เสาร์ (Sat)', shortTh: 'ส.', en: 'Saturday', shortEn: 'Sat', isWeekend: true },
  { key: 'Sun', th: 'อาทิตย์ (Sun)', shortTh: 'อา.', en: 'Sunday', shortEn: 'Sun', isWeekend: true },
] as const;

export const HOURS_24 = Array.from({ length: 24 }, (_, i) => {
  const formatted = `${i.toString().padStart(2, '0')}:00`;
  return {
    hour: i,
    label: formatted,
    shortLabel: `${i}h`,
  };
});

// Generate realistic weekly 24-hour heat map data linked dynamically to appliances and persona
export function generateWeeklyHeatmapData(appliances?: Appliance[], persona?: UserPersona): HeatmapHourData[] {
  const data: HeatmapHourData[] = [];

  // 1. Calculate dynamic appliance-based modifier
  let applianceLoadModifier = 1.0;
  let coolingEcoDiscount = 1.0;
  let primaryCoolingNameTh = 'แอร์ห้องนอน';
  let primaryCoolingNameEn = 'Bedroom AC';

  if (appliances && appliances.length > 0) {
    const totalWatts = appliances.reduce((sum, a) => sum + (a.watt || 150), 0);
    // Baseline reference is ~3200W for a standard house
    applianceLoadModifier = Math.max(0.4, Math.min(2.5, totalWatts / 3200));

    // Check cooling appliances
    const coolingApps = appliances.filter(a => 
      a.category === 'cooling' || 
      a.name.includes('แอร์') || 
      a.name.toLowerCase().includes('ac') || 
      a.name.toLowerCase().includes('air')
    );
    if (coolingApps.length > 0) {
      primaryCoolingNameTh = coolingApps[0].name;
      primaryCoolingNameEn = coolingApps[0].name;
      const ecoCount = coolingApps.filter(a => a.status === 'standby' || a.efficiencyTag === 'A+++ Eco').length;
      if (ecoCount > 0) {
        // 15% reduction if eco mode or standby is active on cooling
        coolingEcoDiscount = 1.0 - (ecoCount / coolingApps.length) * 0.18;
      }
    }
  }

  // 2. Calculate persona-specific scaling factor
  let personaFactor = 1.0;
  if (persona === 'student') {
    personaFactor = 0.55; // Dorm rooms have smaller footprint and lower overall wattage
  } else if (persona === 'facility') {
    personaFactor = 4.2; // Facilities have 3-phase commercial building loads
  }

  DAYS_OF_WEEK.forEach((dayObj, dayIdx) => {
    for (let h = 0; h < 24; h++) {
      const isWeekend = dayObj.isWeekend;
      const isTouOnPeak = !isWeekend && h >= 9 && h < 22;

      let baseWatts = 160 * applianceLoadModifier; // Standby load: smart fridge, router, standby LEDs
      let primaryApplianceTh = 'โหลดสแตนด์บาย & ตู้เย็น';
      let primaryApplianceEn = 'Standby Load & Smart Fridge';

      // Morning routine (06:00 - 08:00)
      if (h >= 6 && h <= 8) {
        baseWatts += (isWeekend ? 300 : 750) * applianceLoadModifier;
        primaryApplianceTh = isWeekend ? 'พัดลม & เครื่องทำน้ำอุ่น' : 'เครื่องทำน้ำอุ่น, กาต้มน้ำ & ไฟ';
        primaryApplianceEn = isWeekend ? 'Fan & Water Heater' : 'Water Heater, Kettle & Lights';
      }
      // Daytime (09:00 - 16:00)
      else if (h >= 9 && h <= 16) {
        if (isWeekend) {
          // Weekend home aircon + cooking + entertainment
          baseWatts += (h >= 12 && h <= 15 ? 1750 : 1300) * applianceLoadModifier * coolingEcoDiscount;
          primaryApplianceTh = h >= 12 && h <= 15 ? `${primaryCoolingNameTh} & ทำอาหาร` : `${primaryCoolingNameTh} & ทีวีสมาร์ท`;
          primaryApplianceEn = h >= 12 && h <= 15 ? `${primaryCoolingNameEn} & Cooking` : `${primaryCoolingNameEn} & Smart TV`;
        } else {
          // Weekday away/work-from-home lighter
          baseWatts += ((dayObj.key === 'Thu' || dayObj.key === 'Fri') ? 850 : 320) * applianceLoadModifier;
          primaryApplianceTh = (dayObj.key === 'Thu' || dayObj.key === 'Fri') ? `${primaryCoolingNameTh} & คอมพิวเตอร์ WFH` : 'ตู้เย็น & อุปกรณ์ IoT';
          primaryApplianceEn = (dayObj.key === 'Thu' || dayObj.key === 'Fri') ? `${primaryCoolingNameEn} & WFH PC` : 'Smart Refrigerator & IoT Hub';
        }
      }
      // Evening Peak (17:00 - 22:00)
      else if (h >= 17 && h <= 22) {
        baseWatts += (isWeekend ? 1650 : 1550) * applianceLoadModifier * coolingEcoDiscount;
        if (h >= 19 && h <= 21) {
          baseWatts += 500 * applianceLoadModifier; // Dinner cooking, multiple ACs
          primaryApplianceTh = `${primaryCoolingNameTh} + ห้องนั่งเล่น + เตาแม่เหล็ก`;
          primaryApplianceEn = `${primaryCoolingNameEn} + Living Room AC + Induction Hob`;
        } else {
          primaryApplianceTh = `${primaryCoolingNameTh} & ไฟส่องสว่าง`;
          primaryApplianceEn = `${primaryCoolingNameEn} & Lighting`;
        }
      }
      // Late night (23:00 - 05:00)
      else {
        if (h >= 23 || h <= 5) {
          // Inverter AC steady state sleep mode
          baseWatts += 450 * applianceLoadModifier * coolingEcoDiscount;
          primaryApplianceTh = `${primaryCoolingNameTh} (Sleep Mode 26°C)`;
          primaryApplianceEn = `${primaryCoolingNameEn} (Sleep Mode 26°C)`;
        }
      }

      // Multiply by persona factor
      baseWatts = baseWatts * personaFactor;

      // Add mild realistic noise/variations based on day
      const dayMultiplier = dayObj.key === 'Sat' ? 1.25 : dayObj.key === 'Sun' ? 1.2 : dayObj.key === 'Fri' ? 1.1 : 0.95;
      const finalWatts = Math.round(baseWatts * dayMultiplier);
      const kwh = Number((finalWatts / 1000).toFixed(2));
      
      // Tariff calculation: Peak vs Off-Peak vs Standard Progressive
      const rate = isTouOnPeak ? 5.26 : 2.63;
      const cost = Number((kwh * rate).toFixed(2));

      // Level determination
      let level: 1 | 2 | 3 | 4 | 5 = 1;
      const thresholdScale = personaFactor;
      if (kwh > 2.0 * thresholdScale) level = 5;
      else if (kwh > 1.4 * thresholdScale) level = 4;
      else if (kwh > 0.8 * thresholdScale) level = 3;
      else if (kwh > 0.4 * thresholdScale) level = 2;
      else level = 1;

      data.push({
        day: dayObj.key as any,
        dayIndex: dayIdx,
        dayLabelTh: dayObj.shortTh,
        dayLabelEn: dayObj.shortEn,
        hour: h,
        hourLabel: `${h.toString().padStart(2, '0')}:00`,
        kwh,
        watts: finalWatts,
        cost,
        isPeak: isTouOnPeak,
        level,
        primaryApplianceTh,
        primaryApplianceEn,
        tipTh: isTouOnPeak && kwh > 1.2 * thresholdScale
          ? 'ช่วง On-Peak ค่าไฟหน่วยละ ฿5.26 ลองขยับไปใช้หลัง 22:00 น. เพื่อประหยัด 50%' 
          : undefined,
        tipEn: isTouOnPeak && kwh > 1.2 * thresholdScale
          ? 'On-Peak period costs ฿5.26/unit. Shift heavy use after 22:00 to save 50%.' 
          : undefined,
      });
    }
  });

  return data;
}

export function calculateWeeklyDaySummaries(heatmapData: HeatmapHourData[]): DayWeeklySummary[] {
  const summaries: DayWeeklySummary[] = [];

  DAYS_OF_WEEK.forEach((d) => {
    const dayRows = heatmapData.filter(r => r.day === d.key);
    let totalKwh = 0;
    let totalCost = 0;
    let peakKwh = 0;
    let peakHour = '19:00';
    let offPeakKwh = 0;
    let onPeakKwh = 0;

    dayRows.forEach(r => {
      totalKwh += r.kwh;
      totalCost += r.cost;
      if (r.kwh > peakKwh) {
        peakKwh = r.kwh;
        peakHour = r.hourLabel;
      }
      if (r.isPeak) {
        onPeakKwh += r.kwh;
      } else {
        offPeakKwh += r.kwh;
      }
    });

    summaries.push({
      day: d.key,
      dayLabelTh: d.th,
      dayLabelEn: d.en,
      totalKwh: Number(totalKwh.toFixed(1)),
      totalCost: Number(totalCost.toFixed(1)),
      peakHour,
      peakKwh: Number(peakKwh.toFixed(2)),
      offPeakKwh: Number(offPeakKwh.toFixed(1)),
      onPeakKwh: Number(onPeakKwh.toFixed(1)),
    });
  });

  return summaries;
}
