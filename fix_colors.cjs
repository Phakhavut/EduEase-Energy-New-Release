const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/**/*.tsx');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace hardcoded light text with dark mode responsive text
    content = content.replace(/(?<!dark:)text-slate-100/g, 'text-slate-800 dark:text-slate-100');
    content = content.replace(/(?<!dark:)text-slate-200/g, 'text-slate-700 dark:text-slate-200');
    content = content.replace(/(?<!dark:)text-slate-300/g, 'text-slate-600 dark:text-slate-300');
    content = content.replace(/(?<!dark:)text-slate-400/g, 'text-slate-500 dark:text-slate-400');
    content = content.replace(/(?<!dark:)text-slate-500/g, 'text-slate-600 dark:text-slate-400');
    
    // Make sure we don't accidentally get `text-slate-800 dark:text-slate-800 dark:text-slate-100` if it already was responsive
    // Actually, Regex replace might be tricky with lookbehind. Let's write a smarter replacer.
});
