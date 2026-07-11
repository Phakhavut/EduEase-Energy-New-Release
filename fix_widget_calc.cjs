const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

const targetStr = `<SavingsCalculator lang={lang} isDarkMode={isDarkMode} />`;

const replacementStr = `<ConsolidatedCalculator 
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
                      />`;

code = code.replace(targetStr, replacementStr);

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('done');
