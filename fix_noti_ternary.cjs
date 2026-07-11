const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/NotiTab.tsx', 'utf-8');
code = code.replace(/Simulated\s*<\/span>\s*<\/div>/g, 'Simulated </span>\n                              )\n                            )}\n                            </div>');
fs.writeFileSync('src/components/tabs/NotiTab.tsx', code, 'utf-8');
