import fs from 'fs';
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Fix buttons that become dark blue with dark text
code = code.replace(/btn btn-white/g, 'btn btn-white dark:bg-slate-800 dark:!text-white dark:border-slate-700');

// Fix text-primary tabs which are unreadable on dark background
code = code.replace(/text-primary border-bottom-2 border-primary/g, 'text-primary dark:text-sky-400 border-bottom-2 border-primary dark:border-sky-400');

// Remove hardcoded style borders for tabs so Tailwind works
code = code.replace(/statsTab === "telemetry"(\s*\n\s*)\? "2px solid var\(--primary\)"(\s*\n\s*): "none"/g, 'statsTab === "telemetry" ? "2px solid" : "none"');
code = code.replace(/statsTab === "benchmark"(\s*\n\s*)\? "2px solid var\(--primary\)"(\s*\n\s*): "none"/g, 'statsTab === "benchmark" ? "2px solid" : "none"');
code = code.replace(/notiTab === "alerts"(\s*\n\s*)\? "2px solid var\(--primary\)"(\s*\n\s*): "none"/g, 'notiTab === "alerts" ? "2px solid" : "none"');
code = code.replace(/notiTab === "quests"(\s*\n\s*)\? "2px solid var\(--primary\)"(\s*\n\s*): "none"/g, 'notiTab === "quests" ? "2px solid" : "none"');
code = code.replace(/manualTab === "guide"(\s*\n\s*)\? "2px solid var\(--primary\)"(\s*\n\s*): "none"/g, 'manualTab === "guide" ? "2px solid" : "none"');
code = code.replace(/manualTab === "settings"(\s*\n\s*)\? "2px solid var\(--primary\)"(\s*\n\s*): "none"/g, 'manualTab === "settings" ? "2px solid" : "none"');

// Fix PropertyDistributionMap active tab text color in dark mode 
let mapCode = fs.readFileSync('src/components/PropertyDistributionMap.tsx', 'utf8');
mapCode = mapCode.replace(/bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm/g, 'bg-white dark:bg-slate-700 text-slate-800 dark:!text-white shadow-sm');
fs.writeFileSync('src/components/PropertyDistributionMap.tsx', mapCode);

// Fix DailyEnergyQuests active tab text color in dark mode
let questCode = fs.readFileSync('src/components/DailyEnergyQuests.tsx', 'utf8');
questCode = questCode.replace(/bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 dark:text-slate-100 dark:border-slate-700 dark:bg-slate-800 font-bold/g, 'bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 dark:!text-white dark:border-slate-700 dark:bg-slate-800 font-bold');
fs.writeFileSync('src/components/DailyEnergyQuests.tsx', questCode);


fs.writeFileSync('src/components/Dashboard.tsx', code);
console.log('Done replacing strings.');
