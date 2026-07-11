const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

const regex = /\{calcTab === "detailed" && \(\s*<div className="row g-4 md:g-5">\s*<div className="col-12">\s*<div className="w-full mb-6">[\s\S]*?<BillingSimulator[\s\S]*?\/>\s*<\/div>\s*<\/div>\s*\)\}/;

const replacementStr = `{calcTab === "detailed" && (
                <div className="row g-4 md:g-5">
                  <div className="col-12">
                    <ConsolidatedCalculator 
                      lang={lang}
                      isDarkMode={isDarkMode}
                      onTokensEarned={(amount) => {
                        try {
                          const cur = parseInt(localStorage.getItem('eudease_grid_tokens') || '300', 10);
                          localStorage.setItem('eudease_grid_tokens', String(cur + amount));
                          window.dispatchEvent(new Event('storage'));
                        } catch {}
                        setConfettiTrigger((t) => t + 1);
                      }}
                      sharedFtRate={sharedFtRate}
                      setSharedFtRate={setSharedFtRate}
                      calcDays={calcDays}
                      setCalcDays={setCalcDays}
                      globalBudget={globalBudget}
                      setGlobalBudget={setGlobalBudget}
                      plannedKwh={plannedKwh}
                      setPlannedKwh={setPlannedKwh}
                    />
                  </div>
                </div>
              )}`;

code = code.replace(regex, replacementStr);
// add import for ConsolidatedCalculator
if (!code.includes('import { ConsolidatedCalculator }')) {
  code = code.replace('import { SmartSavingsCalculator } from "./SmartSavingsCalculator";', 'import { SmartSavingsCalculator } from "./SmartSavingsCalculator";\nimport { ConsolidatedCalculator } from "./ConsolidatedCalculator";');
}
fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('done match:', regex.test(fs.readFileSync('src/components/Dashboard.tsx', 'utf-8')) ? 'still there' : 'replaced');
