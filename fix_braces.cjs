const fs = require('fs');

let calc = fs.readFileSync('src/components/tabs/CalculatorTab.tsx', 'utf-8');
calc = calc.replace(/\n\s*\)\n\s*\}/g, '\n                      )}');
fs.writeFileSync('src/components/tabs/CalculatorTab.tsx', calc);

let man = fs.readFileSync('src/components/tabs/ManualTab.tsx', 'utf-8');
man = man.replace(/<\/span>\n\s*\)\n\s*<\/div>/g, '</span>\n                        )}\n                      </div>');
fs.writeFileSync('src/components/tabs/ManualTab.tsx', man);

// NotiTab
let noti = fs.readFileSync('src/components/tabs/NotiTab.tsx', 'utf-8');
// Fix missing ) in notiTab === "alerts"
noti = noti.replace(/Simulated <\/span>\n\s*\)\n\s*\)\}\n\s*<\/div>/g, 'Simulated </span>\n                              )}\n                            </div>');

// The other error in NotiTab: 
// 126,29: error TS1005: '}' expected.
// 147,25: error TS1005: ')' expected.
// Let's print NotiTab around 126
