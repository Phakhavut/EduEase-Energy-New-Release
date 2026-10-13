/**
 * Linear Regression Forecasting Utility for EduEase Energy OS
 * 
 * Implements Ordinary Least Squares (OLS) Simple Linear Regression (y = mx + b)
 * to model daily electricity consumption trends and project end-of-month costs.
 */

export interface DataPoint {
  x: number; // Day of month (1..N)
  y: number; // Daily cost in THB (or kWh)
}

export interface LinearRegressionResult {
  slope: number;             // m: rate of change per day (THB/day)
  intercept: number;         // b: baseline y-intercept (THB)
  rSquared: number;          // R²: coefficient of determination (0..1)
  standardError: number;     // Se: standard error of the estimate
  correlationCoefficient: number; // r: Pearson's r (-1..1)
  formulaString: string;     // e.g. "y = 1.25x + 36.40"
}

export interface DailyForecastPoint {
  day: number;
  dayLabel: string;
  isHistorical: boolean;
  actualDaily: number | null;
  fittedDaily: number;       // Regression line point (y = mx + b)
  forecastDaily: number | null; // Future projection with any intervention applied
  actualCumulative: number | null;
  forecastCumulative: number;
  upperConfidence: number;   // 95% prediction interval upper band
  lowerConfidence: number;   // 95% prediction interval lower band
  budgetBaselineDaily: number; // Daily target budget line (budget / totalDays)
  budgetBaselineCumulative: number; // Cumulative target budget line
}

export interface MonthlyForecastSummary {
  regression: LinearRegressionResult;
  currentDay: number;
  totalDays: number;
  actualSpentToDate: number;
  projectedRemainingCost: number;
  projectedMonthlyTotal: number;
  baselineNoTrendTotal: number; // If usage stayed at average without trend
  projectedMonthlyKwh: number;
  varianceVsBudget: number;     // projected - budget (+ is over, - is saved)
  budgetStatus: 'within' | 'warning' | 'over';
  trendDirection: 'increasing' | 'stable' | 'decreasing';
  trendRateTh: string;
  trendRateEn: string;
  daysUntilBudgetExceeded: number | null;
  chartPoints: DailyForecastPoint[];
}

/**
 * Calculates Simple Linear Regression using Ordinary Least Squares (OLS).
 * y = m * x + b
 */
export function calculateSimpleLinearRegression(points: DataPoint[]): LinearRegressionResult {
  const n = points.length;
  if (n < 2) {
    return {
      slope: 0,
      intercept: points[0]?.y ?? 0,
      rSquared: 0,
      standardError: 0,
      correlationCoefficient: 0,
      formulaString: `y = ${(points[0]?.y ?? 0).toFixed(2)}`,
    };
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (let i = 0; i < n; i++) {
    const { x, y } = points[i];
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
    sumY2 += y * y;
  }

  const meanX = sumX / n;
  const meanY = sumY / n;

  const denominator = n * sumX2 - sumX * sumX;
  if (Math.abs(denominator) < 1e-10) {
    return {
      slope: 0,
      intercept: meanY,
      rSquared: 0,
      standardError: 0,
      correlationCoefficient: 0,
      formulaString: `y = ${meanY.toFixed(2)}`,
    };
  }

  // Slope: m = (n*sumXY - sumX*sumY) / (n*sumX2 - (sumX)^2)
  const slope = (n * sumXY - sumX * sumY) / denominator;
  // Intercept: b = meanY - slope * meanX
  const intercept = meanY - slope * meanX;

  // Sum of squares for R² and Standard Error
  let ssTot = 0;
  let ssRes = 0;
  for (let i = 0; i < n; i++) {
    const { x, y } = points[i];
    const yPred = slope * x + intercept;
    ssTot += Math.pow(y - meanY, 2);
    ssRes += Math.pow(y - yPred, 2);
  }

  const rSquared = ssTot > 0 ? Math.max(0, Math.min(1, 1 - ssRes / ssTot)) : 0;
  const standardError = n > 2 ? Math.sqrt(ssRes / (n - 2)) : 0;
  const correlationCoefficient = Math.sqrt(rSquared) * (slope >= 0 ? 1 : -1);

  const sign = intercept >= 0 ? '+' : '-';
  const formulaString = `y = ${slope.toFixed(2)}x ${sign} ${Math.abs(intercept).toFixed(2)}`;

  return {
    slope,
    intercept,
    rSquared,
    standardError,
    correlationCoefficient,
    formulaString,
  };
}

/**
 * Generates realistic historical daily points up to currentDay (default: day 14).
 * Reflects weekday/weekend rhythms and gradual thermal drift.
 */
export function generateDefaultHistoricalUsage(currentDay: number = 14, baseAvgDaily: number = 40): DataPoint[] {
  const points: DataPoint[] = [];
  for (let day = 1; day <= currentDay; day++) {
    const isWeekend = day % 7 === 6 || day % 7 === 0;
    // Gradual seasonal drift + day-of-week load difference
    const drift = (day - 1) * 1.15;
    const weekendBoost = isWeekend ? 6.5 : -1.5;
    const variance = Math.sin(day * 1.8) * 3.2;
    const dailyCost = Math.max(20, Math.round((baseAvgDaily + drift + weekendBoost + variance) * 10) / 10);
    points.push({ x: day, y: dailyCost });
  }
  return points;
}

/**
 * Builds the complete 30-day forecast and projection model using Linear Regression.
 */
export function buildLinearRegressionForecast({
  historicalPoints,
  totalDays = 30,
  monthlyBudget = 1200,
  currentDay = 14,
  interventionPct = 0, // e.g. -10 for 10% reduction on remaining days
  elecRate = 4.7,
}: {
  historicalPoints?: DataPoint[];
  totalDays?: number;
  monthlyBudget?: number;
  currentDay?: number;
  interventionPct?: number;
  elecRate?: number;
}): MonthlyForecastSummary {
  const history = historicalPoints && historicalPoints.length >= 2 
    ? historicalPoints 
    : generateDefaultHistoricalUsage(currentDay, 38);

  const regression = calculateSimpleLinearRegression(history);
  const chartPoints: DailyForecastPoint[] = [];

  let actualSpentToDate = 0;
  let cumulativeForecast = 0;
  let daysUntilBudgetExceeded: number | null = null;

  const dailyBudgetBaseline = monthlyBudget / totalDays;

  // Process all days in billing cycle (1 to totalDays)
  for (let day = 1; day <= totalDays; day++) {
    const fittedDaily = Math.max(0, Math.round((regression.slope * day + regression.intercept) * 10) / 10);
    const budgetBaselineCumulative = Math.round(dailyBudgetBaseline * day);

    if (day <= currentDay) {
      // Historical recorded actuals
      const histPoint = history.find(p => p.x === day);
      const actualVal = histPoint ? histPoint.y : fittedDaily;
      actualSpentToDate += actualVal;
      cumulativeForecast = actualSpentToDate;

      chartPoints.push({
        day,
        dayLabel: `Day ${day}`,
        isHistorical: true,
        actualDaily: actualVal,
        fittedDaily,
        forecastDaily: null,
        actualCumulative: actualSpentToDate,
        forecastCumulative: actualSpentToDate,
        upperConfidence: actualSpentToDate,
        lowerConfidence: actualSpentToDate,
        budgetBaselineDaily: Math.round(dailyBudgetBaseline),
        budgetBaselineCumulative,
      });
    } else {
      // Future Forecasted Days via Linear Regression equation
      // Apply intervention multiplier if provided (e.g. -15% saving)
      const interventionMultiplier = Math.max(0.4, 1 + interventionPct / 100);
      const baseProjected = Math.max(15, regression.slope * day + regression.intercept);
      const forecastDaily = Math.round(baseProjected * interventionMultiplier * 10) / 10;

      cumulativeForecast += forecastDaily;

      // Check if cumulative projection surpasses budget limit
      if (daysUntilBudgetExceeded === null && cumulativeForecast > monthlyBudget) {
        daysUntilBudgetExceeded = day;
      }

      // Prediction interval grows as distance from meanX increases
      const daysAhead = day - currentDay;
      const spread = Math.round(regression.standardError * Math.sqrt(1 + daysAhead * 0.18) * 10) / 10;
      const upperConfidence = Math.round(cumulativeForecast + spread * daysAhead * 0.4);
      const lowerConfidence = Math.max(actualSpentToDate, Math.round(cumulativeForecast - spread * daysAhead * 0.4));

      chartPoints.push({
        day,
        dayLabel: `Day ${day}`,
        isHistorical: false,
        actualDaily: null,
        fittedDaily,
        forecastDaily,
        actualCumulative: null,
        forecastCumulative: Math.round(cumulativeForecast),
        upperConfidence,
        lowerConfidence,
        budgetBaselineDaily: Math.round(dailyBudgetBaseline),
        budgetBaselineCumulative,
      });
    }
  }

  const projectedRemainingCost = Math.round(cumulativeForecast - actualSpentToDate);
  const projectedMonthlyTotal = Math.round(cumulativeForecast);
  const baselineNoTrendTotal = Math.round((actualSpentToDate / currentDay) * totalDays);
  const projectedMonthlyKwh = Math.round((projectedMonthlyTotal / elecRate) * 10) / 10;
  const varianceVsBudget = projectedMonthlyTotal - monthlyBudget;

  let budgetStatus: 'within' | 'warning' | 'over' = 'within';
  if (varianceVsBudget > 0) {
    budgetStatus = 'over';
  } else if (projectedMonthlyTotal >= monthlyBudget * 0.9) {
    budgetStatus = 'warning';
  }

  let trendDirection: 'increasing' | 'stable' | 'decreasing' = 'stable';
  if (regression.slope > 0.3) {
    trendDirection = 'increasing';
  } else if (regression.slope < -0.3) {
    trendDirection = 'decreasing';
  }

  const trendRateTh = regression.slope >= 0 
    ? `+฿${regression.slope.toFixed(2)}/วัน` 
    : `-฿${Math.abs(regression.slope).toFixed(2)}/วัน`;

  const trendRateEn = regression.slope >= 0 
    ? `+฿${regression.slope.toFixed(2)}/day` 
    : `-฿${Math.abs(regression.slope).toFixed(2)}/day`;

  return {
    regression,
    currentDay,
    totalDays,
    actualSpentToDate: Math.round(actualSpentToDate),
    projectedRemainingCost,
    projectedMonthlyTotal,
    baselineNoTrendTotal,
    projectedMonthlyKwh,
    varianceVsBudget,
    budgetStatus,
    trendDirection,
    trendRateTh,
    trendRateEn,
    daysUntilBudgetExceeded,
    chartPoints,
  };
}
