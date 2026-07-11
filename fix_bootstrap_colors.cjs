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
        
        content = content.replace(/bg-danger/g, 'bg-rose-500');
        content = content.replace(/text-danger/g, 'text-rose-500 dark:text-rose-400');
        content = content.replace(/border-danger/g, 'border-rose-500');
        
        content = content.replace(/bg-warning/g, 'bg-amber-500');
        content = content.replace(/text-warning/g, 'text-amber-500 dark:text-amber-400');
        content = content.replace(/border-warning/g, 'border-amber-500');

        content = content.replace(/bg-success/g, 'bg-emerald-500');
        content = content.replace(/text-success/g, 'text-emerald-500 dark:text-emerald-400');
        content = content.replace(/border-success/g, 'border-emerald-500');

        content = content.replace(/bg-info/g, 'bg-sky-500');
        content = content.replace(/text-info/g, 'text-sky-500 dark:text-sky-400');
        
        if (content !== original) {
            fs.writeFileSync(file, content);
            console.log("Updated", file);
        }
    }
});
