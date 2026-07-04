const fs = require('fs');

const path = 'src/components/Dashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

const insertStr = `
              <HistoricalTrendChart isDarkMode={isDarkMode} activeHouseName={activeHouse?.name || 'Local Property'} />
              <SavingsCalculator isDarkMode={isDarkMode} />
`;

content = content.replace(/(\s*)(<\/motion\.div>\n\s*<\/motion\.div>\n\s*\)\})/, (match, p1, p2) => {
  return p1 + insertStr + p2;
});

fs.writeFileSync(path, content);
