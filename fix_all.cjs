const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// The file currently has:
// setAiSmartAc(!aiSmartAc
//                                   className=
// (because fix_all_seams.cjs did some replacement)
// Let's just fix all of them!

code = code.replace(/setAiSmartAc\(!aiSmartAc\s*className=/g, 'setAiSmartAc(!aiSmartAc)}\n                                  className=');
code = code.replace(/setCalcTab\("detailed"\s*>/g, 'setCalcTab("detailed")}\n                >');
code = code.replace(/setStatsTab\("telemetry"\s*>/g, 'setStatsTab("telemetry")}\n                >');
code = code.replace(/setNotiTab\("alerts"\s*>/g, 'setNotiTab("alerts")}\n                >');
code = code.replace(/setManualTab\("guide"\s*>/g, 'setManualTab("guide")}\n                >');

// Also there is a seam for OverviewTab:
code = code.replace(/toLocaleString\(\s*<span/g, 'toLocaleString()}\n                        <span');

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('Fixed all seams in Dashboard!');
