const fs = require('fs');
const path = require('path');

const overviewPath = path.join(__dirname, 'src/components/tabs/OverviewTab.tsx');
let overview = fs.readFileSync(overviewPath, 'utf8');

overview = overview.replace(/if\s*\(widgetId === "property-map"\)\s*\{\s*return renderWidgetWrapper\(\s*"property-map",\s*"md:col-span-2 lg:col-span-12",\s*<div[^>]*>\s*<PropertyDistributionMap[^>]*\/>\s*<\/div>\s*\);\s*\}/s, '');

fs.writeFileSync(overviewPath, overview);
