const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(__dirname, 'src/components/Dashboard.tsx');
let dashboard = fs.readFileSync(dashboardPath, 'utf8');

const newWidgetOrder = `  const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("eudease_widget_order_v4");
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

// We use regex to replace the old useState
dashboard = dashboard.replace(/const \[widgetOrder, setWidgetOrder\] = useState<string\[\]>\(\(\) => \{[^}]+\}\s*\);/, newWidgetOrder);

fs.writeFileSync(dashboardPath, dashboard);
