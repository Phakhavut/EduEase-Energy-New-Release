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
        
        // Fix bg-light
        content = content.replace(/bg-light/g, 'bg-slate-50 dark:bg-slate-800/60');
        // Fix border-light
        content = content.replace(/border-light/g, 'border-slate-100 dark:border-slate-800/50');
        // Fix text-dark
        content = content.replace(/text-dark/g, 'text-slate-900 dark:text-slate-100');
        // Fix text-muted
        content = content.replace(/text-muted/g, 'text-slate-500 dark:text-slate-400');
        
        if (content !== original) {
            fs.writeFileSync(file, content);
            console.log("Updated", file);
        }
    }
});
