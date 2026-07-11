const fs = require('fs');
const path = require('path');

const overviewPath = path.join(__dirname, 'src/components/tabs/OverviewTab.tsx');
let overview = fs.readFileSync(overviewPath, 'utf8');

const oldReset = `const defaultOrder = [
                        "current-weather",
                        "property-map",
                      ];
                      setWidgetOrder(defaultOrder);
                      try {
                        localStorage.setItem(
                          "eudease_widget_order_v2",
                          JSON.stringify(defaultOrder),
                        );
                      } catch {}`;

const newReset = `const defaultOrder = [
                        "projected-savings",
                        "eco-quests",
                        "leaderboard",
                        "savings-calc",
                        "current-weather",
                        "energy-tip"
                      ];
                      setWidgetOrder(defaultOrder);
                      try {
                        localStorage.setItem(
                          "eudease_widget_order_v5",
                          JSON.stringify(defaultOrder),
                        );
                      } catch {}`;

overview = overview.replace(/const defaultOrder = \[\s*"current-weather",\s*"property-map",\s*\];\s*setWidgetOrder\(defaultOrder\);\s*try \{\s*localStorage\.setItem\(\s*"eudease_widget_order_v2",\s*JSON\.stringify\(defaultOrder\),\s*\);\s*\} catch \{\}/, newReset);

fs.writeFileSync(overviewPath, overview);
