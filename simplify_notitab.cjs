const fs = require('fs');
const path = require('path');

const notiTabPath = path.join(__dirname, 'src/components/tabs/NotiTab.tsx');
let notiTab = fs.readFileSync(notiTabPath, 'utf8');

// Remove the tab switcher
notiTab = notiTab.replace(/<div className="flex gap-4 md:gap-8 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">[\s\S]*?<\/div>/, '');

// Remove the `{notiTab === "alerts" ? (` and `) : ( ... )}` wrapper
notiTab = notiTab.replace(/\{notiTab === "alerts" \? \(/, '');
notiTab = notiTab.replace(/\) : \([\s\S]*?<\/>\s*\)\}/, '');

fs.writeFileSync(notiTabPath, notiTab);
