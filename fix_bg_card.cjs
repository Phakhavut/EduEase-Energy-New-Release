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
        
        content = content.replace(/dark:bg-card/g, 'dark:bg-slate-800');
        content = content.replace(/bg-card/g, 'bg-white');
        
        if (content !== original) {
            fs.writeFileSync(file, content);
            console.log("Updated", file);
        }
    }
});
