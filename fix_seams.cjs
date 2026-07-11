const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// 1. OverviewTab seam
code = code.replace(/toLocaleString\(\s*<span/g, 'toLocaleString()}\n                        <span');

// 2. AiHubTab seam
code = code.replace(/<\/motion.div>\s*\{currentPage === "devices"/g, '</motion.div>\n          )}\n\n          {currentPage === "devices"');

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('Fixed seams 1 and 2');
