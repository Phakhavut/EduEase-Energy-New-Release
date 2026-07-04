const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

content = content.replace(
  /<HistoricalTrendChart isDarkMode={isDarkMode} activeHouseName={activeHouse\?\.name \|\| 'Local Property'} \/>\s*<SavingsCalculator isDarkMode={isDarkMode} \/>/,
  `<div className="md:col-span-2 lg:col-span-12 w-full">\n<HistoricalTrendChart isDarkMode={isDarkMode} activeHouseName={activeHouse?.name || 'Local Property'} />\n</div>\n<div className="md:col-span-2 lg:col-span-12 w-full">\n<SavingsCalculator isDarkMode={isDarkMode} />\n</div>`
);

fs.writeFileSync('src/components/Dashboard.tsx', content);
