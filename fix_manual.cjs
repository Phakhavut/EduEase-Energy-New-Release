const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/ManualTab.tsx', 'utf-8');
code = code.replace(/<\/span>\n                      <\/div>/g, '</span>\n                        )\n                      </div>');
fs.writeFileSync('src/components/tabs/ManualTab.tsx', code, 'utf-8');
