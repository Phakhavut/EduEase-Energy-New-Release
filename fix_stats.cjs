const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/StatsTab.tsx', 'utf-8');
code = code.replace(/: "telemetry_monthly",\n                            <\/button>/g, ': "telemetry_monthly"\n                              )}\n                            </button>');
fs.writeFileSync('src/components/tabs/StatsTab.tsx', code, 'utf-8');
