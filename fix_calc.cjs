const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/CalculatorTab.tsx', 'utf-8');
code = code.replace(/<\/div>\n                      <\/div>\n                    <\/div>/, '</div>\n                        )\n                      </div>\n                    </div>');
fs.writeFileSync('src/components/tabs/CalculatorTab.tsx', code, 'utf-8');
