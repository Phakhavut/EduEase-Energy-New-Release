import { Appliance } from '../types';

/**
 * Calculates energy metrics for a single appliance or item.
 * 
 * @param watt Wattage of the appliance.
 * @param hours Number of hours used per day.
 * @param rate Electricity rate per kWh (default 4.7 THB).
 * @param daysPerWeek Days used per week (default 7).
 * @param quantity Number of units (default 1).
 * @param standbyWatt Standby wattage when idle (default 0).
 * @param standbyCutEnabled Whether standby eco-cut mode is enabled (cuts standby to 0W).
 */
export function calculateApplianceEnergy(
  watt: number,
  hours: number,
  rate: number = 4.7,
  daysPerWeek: number = 7,
  quantity: number = 1,
  standbyWatt: number = 0,
  standbyCutEnabled: boolean = false
) {
  const effectiveDaysFraction = Math.max(0.1, Math.min(7, daysPerWeek)) / 7;
  const activeHoursDaily = hours * effectiveDaysFraction;
  const activeDailyKwh = (watt * activeHoursDaily) / 1000;

  // Idle hours when not actively running
  const idleHoursDaily = Math.max(0, 24 - activeHoursDaily);
  const effectiveStandbyWatt = standbyCutEnabled ? 0 : standbyWatt;
  const standbyDailyKwh = (effectiveStandbyWatt * idleHoursDaily) / 1000;

  const singleUnitDailyKwh = activeDailyKwh + standbyDailyKwh;
  const dailyKwh = singleUnitDailyKwh * Math.max(1, quantity);
  const dailyCost = dailyKwh * rate;
  const monthlyKwh = dailyKwh * 30;
  const monthlyCost = monthlyKwh * rate;
  
  // 1 kWh electricity produces approx 0.48 kg CO2 (Thailand EGAT emission factor)
  const monthlyCo2Kg = monthlyKwh * 0.48;

  return {
    dailyKwh,
    dailyCost,
    monthlyKwh,
    monthlyCost,
    monthlyCo2Kg,
    activeDailyKwh,
    standbyDailyKwh
  };
}

/**
 * Calculates the total daily kWh and monthly cost for a list of appliances.
 * Handles active and standby states.
 * 
 * @param appliances Array of Appliance objects.
 * @param rate Electricity rate per kWh (default 4.7 THB).
 */
export function calculateTotalBill(appliances: Appliance[], rate: number = 4.7) {
  let totalDailyKwh = 0;
  let totalMonthlyCost = 0;

  appliances.forEach(app => {
    let multiplier = 1;
    if (app.status === 'off') {
      multiplier = 0;
    } else if (app.status === 'standby') {
      multiplier = 0.05;
    }

    const appRate = app.customRate || rate;
    const energy = calculateApplianceEnergy(
      app.watt * multiplier,
      app.hours,
      appRate,
      app.daysPerWeek ?? 7,
      app.quantity ?? 1,
      app.standbyWatt ?? 0,
      app.standbyCutEnabled ?? false
    );
    totalDailyKwh += energy.dailyKwh;
    totalMonthlyCost += energy.monthlyCost;
  });

  return {
    totalDailyKwh,
    totalMonthlyCost,
    totalMonthlyCo2Kg: totalDailyKwh * 30 * 0.48
  };
}
