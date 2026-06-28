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
  ['text-slate-800 dark:text-slate-300', 'text-slate-800 dark:text-slate-100'],
  ['text-slate-600 dark:text-slate-300', 'text-slate-600 dark:text-slate-100'],
  ['text-slate-800 dark:text-slate-400', 'text-slate-800 dark:text-slate-200']
]);

fix('src/components/WeatherForecastWidget.tsx', [
  ['text-slate-800 dark:text-slate-200', 'text-slate-800 dark:text-slate-100']
]);

console.log('Fixed additional files');
