const fs = require('fs');
const path = require('path');

const overviewPath = path.join(__dirname, 'src/components/tabs/OverviewTab.tsx');
let overview = fs.readFileSync(overviewPath, 'utf8');

overview = overview.replace(/if\s*\(widgetId === "savings-calc"\)\s*\{\s*return renderWidgetWrapper\([\s\S]*?<\/ConsolidatedCalculator>\s*<\/div>\s*\);\s*\}\s*if/g, 'if');
overview = overview.replace(/if\s*\(widgetId === "projected-savings"\)\s*\{\s*return renderWidgetWrapper\([\s\S]*?<\/ProjectedSavingsCard>\s*<\/div>\s*\);\s*\}\s*if/g, 'if');

// Try a more robust regex if the above didn't match perfectly.
// Instead, just replace the chunks:
const chunksToRemove = [
  /if \(\s*widgetId === "savings-calc"\s*\) \{[\s\S]*?setPlannedKwh=\{setPlannedKwh\}\s*\/>\s*\);\s*\}/,
  /if \(\s*widgetId === "projected-savings"\s*\) \{[\s\S]*?setAiLoadShift=\{setAiLoadShift\}\s*\/>\s*\);\s*\}/
];

chunksToRemove.forEach(regex => {
  overview = overview.replace(regex, '');
});

fs.writeFileSync(overviewPath, overview);
console.log("Removed from OverviewTab");
