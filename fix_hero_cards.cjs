const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/tabs/OverviewTab.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace hero card classes with dashboard-card
content = content.replace(
  /"bg-gradient-to-br from-emerald-500\/10 via-emerald-600\/5 to-transparent border border-emerald-500\/30 dark:border-emerald-500\/20 rounded-\[2rem\] p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"/g,
  '"dashboard-card bg-white dark:bg-slate-800 p-6 relative overflow-hidden group border-2 border-emerald-500/30 dark:border-emerald-500/50 hover:border-emerald-500"'
);

content = content.replace(
  /"bg-gradient-to-br from-purple-500\/10 via-purple-600\/5 to-transparent border border-purple-500\/30 dark:border-purple-500\/20 rounded-\[2rem\] p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"/g,
  '"dashboard-card bg-white dark:bg-slate-800 p-6 relative overflow-hidden group border-2 border-purple-500/30 dark:border-purple-500/50 hover:border-purple-500"'
);

fs.writeFileSync(filePath, content);
console.log("Fixed Hero Cards");
