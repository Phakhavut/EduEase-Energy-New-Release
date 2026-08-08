const fs = require('fs');
let code = fs.readFileSync('src/components/views/ComparisonView.tsx', 'utf8');
code = code.replace(
  /const RATE_PER_KWH = 4\.20;\s*const calculatedItems = selectedItems\.map\(item => {\s*const dailyKwh = \(item\.watt \* item\.hoursPerDay \* item\.quantity\) \/ 1000;\s*const monthlyKwh = dailyKwh \* 30;\s*const dailyCost = dailyKwh \* RATE_PER_KWH;\s*const monthlyCost = monthlyKwh \* RATE_PER_KWH;\s*return {\s*\.\.\.item,\s*dailyKwh,\s*monthlyKwh,\s*dailyCost,\s*monthlyCost,\s*};\s*}\);/,
  `const calculatedItems = selectedItems.map(item => {
    const energy = calculateApplianceEnergy(item.watt * item.quantity, item.hoursPerDay);
    return {
      ...item,
      dailyKwh: energy.dailyKwh,
      monthlyKwh: energy.monthlyKwh,
      dailyCost: energy.dailyCost,
      monthlyCost: energy.monthlyCost,
    };
  });`
);
fs.writeFileSync('src/components/views/ComparisonView.tsx', code);
