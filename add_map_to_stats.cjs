const fs = require('fs');
const path = require('path');

const statsPath = path.join(__dirname, 'src/components/tabs/StatsTab.tsx');
let stats = fs.readFileSync(statsPath, 'utf8');

const mapBlock = `
              <div className="mt-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <h5 className="font-display font-bold text-xl md:text-2xl mb-6 tracking-tight">
                  {lang === "th" ? "แผนที่การกระจายการใช้พลังงาน" : "Energy Distribution Map"}
                </h5>
                <div className="dashboard-card border border-slate-200 dark:border-0 overflow-hidden bg-white dark:bg-slate-900/40 backdrop-blur-md shadow-sm rounded-[2rem] p-5">
                  <PropertyDistributionMap lang={lang} isDarkMode={isDarkMode} />
                </div>
              </div>
`;

stats = stats.replace(/(\s*)<\/div>\s*<\/>\s*\);\s*\}\s*$/, (match, p1) => {
    return p1 + mapBlock + match;
});

fs.writeFileSync(statsPath, stats);
