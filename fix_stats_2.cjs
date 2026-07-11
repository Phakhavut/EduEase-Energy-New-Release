const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/StatsTab.tsx', 'utf-8');
code = code.replace(/\)\}<\/button>\n\s*\),/g, ')}\n                            </button>\n                          )\n                        )}');
fs.writeFileSync('src/components/tabs/StatsTab.tsx', code, 'utf-8');
