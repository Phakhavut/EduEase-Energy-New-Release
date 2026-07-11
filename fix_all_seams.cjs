const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// The regex missed `)}` inside the JSX. Let's fix them manually.

// 1. Devices seam
code = code.replace(/setAiSmartAc\(!aiSmartAc\s*className=/g, 'setAiSmartAc(!aiSmartAc)}\n                                  className=');

// 2. Calculator seam
code = code.replace(/setCalcTab\("detailed"\s*>/g, 'setCalcTab("detailed")}\n                >');

// 3. Stats seam: wait, StatsTab matched what?
// Let's check `StatsTab` seam.
// Let's see what is around line 4445 in Dashboard.tsx.
