const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/StatsTab.tsx', 'utf-8');
code = code.replace(/<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/>\n\s*\);\n\s*\}/, '</div>\n                  </div>\n                </div>\n              )}\n            </div>\n    </>\n  );\n}');
fs.writeFileSync('src/components/tabs/StatsTab.tsx', code, 'utf-8');
