import { Appliance } from '../types';

/**
 * Calculates energy metrics for a single appliance or item.
 * 
 * @param watt Wattage of the appliance.
 * @param hours Number of hours used per day.
 * @param rate Electricity rate per kWh (default 4.7 THB).
 */
export function calculateApplianceEnergy(watt: number, hours: number, rate: number = 4.7) {
  const dailyKwh = (watt * hours) / 1000;
  const dailyCost = dailyKwh * rate;
  const monthlyKwh = dailyKwh * 30;
  const monthlyCost = monthlyKwh * rate;
  
  return {
    dailyKwh,
    dailyCost,
    monthlyKwh,
    monthlyCost
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
      // Assume standby uses 5% of rated power
      multiplier = 0.05;
    }

    const energy = calculateApplianceEnergy(app.watt * multiplier, app.hours, rate);
    totalDailyKwh += energy.dailyKwh;
    totalMonthlyCost += energy.monthlyCost;
  });

  return {
    totalDailyKwh,
    totalMonthlyCost
  };
}
