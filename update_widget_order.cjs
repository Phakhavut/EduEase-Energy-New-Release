const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(__dirname, 'src/components/Dashboard.tsx');
let dashboard = fs.readFileSync(dashboardPath, 'utf8');

const newWidgetOrder = `  const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("eudease_widget_order_v3");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      "eco-quests",
      "leaderboard",
      "savings-calc",
      "projected-savings",
      "current-weather",
      "energy-tip"
    ];
  });`;

// We use regex to replace the old useState
dashboard = dashboard.replace(/const \[widgetOrder, setWidgetOrder\] = useState<string\[\]>\(\(\) => \[\s*"projected-savings",\s*"weather-forecast",\s*"quick-actions",\s*"savings-calc",\s*"ai-optimization-gauge",\s*"active-nodes",\s*\]\);/, newWidgetOrder);

// Also we need to change where localStorage is set to "eudease_widget_order_v2" -> "eudease_widget_order_v3"
dashboard = dashboard.replace(/localStorage.setItem\("eudease_widget_order_v2"/, 'localStorage.setItem("eudease_widget_order_v3"');

fs.writeFileSync(dashboardPath, dashboard);
