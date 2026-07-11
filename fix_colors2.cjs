const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk('src/components', (file) => {
    if (file.endsWith('.tsx')) {
        let content = fs.readFileSync(file, 'utf8');
        let original = content;
        
        // Match classNames and replace hardcoded colors if they don't have a dark equivalent
        // This is a naive but effective string replace for specific cases we identified
        
        // In Dashboard.tsx
        content = content.replace(/"text-\[0\.8rem\] font-bold text-slate-300 animate-pulse"/g, '"text-[0.8rem] font-bold text-slate-700 dark:text-slate-300 animate-pulse"');
        content = content.replace(/"text-\[0\.7rem\] uppercase tracking-wider text-slate-500 font-bold block mb-[0-9]"/g, '"text-[0.7rem] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold block mb-1"');
        content = content.replace(/"text-\[0\.75rem\] text-slate-500"/g, '"text-[0.75rem] text-slate-600 dark:text-slate-400"');
        content = content.replace(/"text-\[0\.8rem\] text-slate-300 leading-relaxed mb-0 italic"/g, '"text-[0.8rem] text-slate-600 dark:text-slate-300 leading-relaxed mb-0 italic"');
        content = content.replace(/"text-\[0\.75rem\] text-slate-300 leading-tight"/g, '"text-[0.75rem] text-slate-600 dark:text-slate-300 leading-tight"');
        content = content.replace(/"flex items-start text-xs text-slate-200 leading-relaxed mb-1 pl-2"/g, '"flex items-start text-xs text-slate-700 dark:text-slate-200 leading-relaxed mb-1 pl-2"');
        content = content.replace(/"text-xs text-slate-100 leading-relaxed mb-1\.5"/g, '"text-xs text-slate-700 dark:text-slate-100 leading-relaxed mb-1.5"');
        
        // In OverviewTab.tsx
        content = content.replace(/"text-lg font-bold text-slate-400"/g, '"text-lg font-bold text-slate-500 dark:text-slate-400"');
        content = content.replace(/text-slate-500 dark:text-slate-300/g, 'text-slate-700 dark:text-slate-300');
        content = content.replace(/text-slate-500 dark:text-slate-400/g, 'text-slate-600 dark:text-slate-400');
        content = content.replace(/text-slate-600 dark:text-slate-100/g, 'text-slate-700 dark:text-slate-100');
        
        // In EnergyMonitoringHub
        content = content.replace(/text-slate-500 dark:text-slate-400/g, 'text-slate-600 dark:text-slate-400');
        content = content.replace(/text-slate-500 dark:text-slate-300/g, 'text-slate-700 dark:text-slate-300');
        content = content.replace(/"text-xs text-slate-400"/g, '"text-xs text-slate-600 dark:text-slate-400"');
        content = content.replace(/"text-sm text-slate-500 mb-1"/g, '"text-sm text-slate-600 dark:text-slate-400 mb-1"');
        
        if (content !== original) {
            fs.writeFileSync(file, content);
            console.log("Updated", file);
        }
    }
});
