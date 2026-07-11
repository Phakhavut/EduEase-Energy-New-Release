const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(__dirname, 'src/components/Dashboard.tsx');
let dashboard = fs.readFileSync(dashboardPath, 'utf8');

const regex = /const \[widgetOrder, setWidgetOrder\] = useState<string\[\]>\(\(\) => \{[\s\S]*?return \[[^\]]+\];\s*\}\);/;
const match = dashboard.match(regex);
if (match) {
    const newWidgetOrder = `const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("eudease_widget_order_v5");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      "projected-savings",
      "eco-quests",
      "leaderboard",
      "savings-calc",
      "current-weather",
      "energy-tip"
    ];
  });`;
    dashboard = dashboard.replace(regex, newWidgetOrder);
    fs.writeFileSync(dashboardPath, dashboard);
    console.log("Replaced successfully");
} else {
    console.log("Could not match the block");
}
