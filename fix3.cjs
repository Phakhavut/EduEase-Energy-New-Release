const fs = require('fs');

function fix(file, replaces) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    for (const [from, to] of replaces) {
      content = content.split(from).join(to);
    }
    fs.writeFileSync(file, content);
  }
}

fix('src/components/Dashboard.tsx', [
  ['text-slate-600 dark:text-slate-400', 'text-slate-600 dark:text-slate-200'],
  ['text-slate-500 dark:text-slate-350', 'text-slate-500 dark:text-slate-200'],
  ['text-[9px] text-slate-600 dark:text-slate-400', 'text-[9px] text-slate-600 dark:text-slate-200'],
  ['text-slate-500 dark:text-slate-400', 'text-slate-500 dark:text-slate-200']
]);

console.log('Fixed more text colors');
