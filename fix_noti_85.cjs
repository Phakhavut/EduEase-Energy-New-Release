const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/NotiTab.tsx', 'utf-8');
code = code.replace(/<\/>\n\s*<\/button>/g, '</>\n                        )}\n                      </button>');
fs.writeFileSync('src/components/tabs/NotiTab.tsx', code, 'utf-8');
