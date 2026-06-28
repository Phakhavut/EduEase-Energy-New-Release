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
  ['text-slate-650 dark:text-slate-300', 'text-slate-600 dark:text-slate-100'],
  ['text-slate-455', 'text-slate-500 dark:text-slate-300'],
  ['text-slate-800 dark:text-slate-350', 'text-slate-800 dark:text-slate-100'],
  ['text-slate-600 dark:text-slate-455', 'text-slate-600 dark:text-slate-200']
]);

fix('src/components/DailyEnergyQuests.tsx', [
  ['text-slate-900 dark:text-dark', 'text-slate-900 dark:text-slate-100'],
  ['text-slate-600 dark:text-muted mb-0 font-mono', 'text-slate-600 dark:text-slate-400 mb-0 font-mono'],
  ['text-slate-850 dark:text-slate-300', 'text-slate-800 dark:text-slate-100'],
  ['text-slate-800 font-bold', 'text-slate-800 dark:text-slate-100 dark:border-slate-700 dark:bg-slate-800 font-bold'],
  ['text-slate-400 font-bold', 'text-slate-400 dark:text-slate-500 font-bold'],
  ['text-slate-600 dark:text-muted hover:text-dark', 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white']
]);

fix('src/components/WeatherForecastWidget.tsx', [
  ['text-slate-650 dark:text-slate-300', 'text-slate-600 dark:text-slate-100']
]);

fix('src/components/calculator/CalculatorResults.tsx', [
  ['text-slate-650 dark:text-slate-350', 'text-slate-600 dark:text-slate-100']
]);

fix('src/components/PropertyDistributionMap.tsx', [
  ['text-slate-800 dark:text-slate-100', 'text-slate-800 dark:text-slate-50']
]);

console.log('Fixed files');
