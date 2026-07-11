const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(__dirname, 'src/components/Dashboard.tsx');
let dashboard = fs.readFileSync(dashboardPath, 'utf8');

const regex = /const \[widgetOrder, setWidgetOrder\] = useState<string\[\]>\(\(\) => \{[\s\S]*?return \[[^\]]+\];\s*\}\);/;
const match = dashboard.match(regex);
if (match) {
    const newWidgetOrder = `const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("eudease_widget_order_v6");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      "eco-quests",
      "leaderboard",
      "current-weather",
      "energy-tip"
    ];
  });`;
    dashboard = dashboard.replace(regex, newWidgetOrder);
    fs.writeFileSync(dashboardPath, dashboard);
    console.log("Replaced successfully in Dashboard");
} else {
    console.log("Could not match the block in Dashboard");
}

const overviewPath = path.join(__dirname, 'src/components/tabs/OverviewTab.tsx');
let overview = fs.readFileSync(overviewPath, 'utf8');

const newReset = `const defaultOrder = [
                        "eco-quests",
                        "leaderboard",
                        "current-weather",
                        "energy-tip"
                      ];
                      setWidgetOrder(defaultOrder);
                      try {
                        localStorage.setItem(
                          "eudease_widget_order_v6",
                          JSON.stringify(defaultOrder),
                        );
                      } catch {}`;

overview = overview.replace(/const defaultOrder = \[\s*"projected-savings",\s*"eco-quests",\s*"leaderboard",\s*"savings-calc",\s*"current-weather",\s*"energy-tip"\s*\];\s*setWidgetOrder\(defaultOrder\);\s*try \{\s*localStorage\.setItem\(\s*"eudease_widget_order_v5",\s*JSON\.stringify\(defaultOrder\),\s*\);\s*\} catch \{\}/, newReset);

fs.writeFileSync(overviewPath, overview);
