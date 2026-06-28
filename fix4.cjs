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

fix('src/components/calculator/RecommendationCard.tsx', [
  ['dark:text-slate-450', 'dark:text-slate-300'],
  ['dark:text-slate-350', 'dark:text-slate-200']
]);

fix('src/components/calculator/CalculatorForm.tsx', [
  ['dark:text-slate-500 uppercase', 'dark:text-slate-400 uppercase'],
  ['text-slate-500 dark:text-slate-400', 'text-slate-500 dark:text-slate-300'],
  ['dark:text-slate-300', 'dark:text-slate-100'], // check if already exist
  ['dark:text-slate-250', 'dark:text-slate-100']
]);

fix('src/components/calculator/CalculatorResults.tsx', [
  ['text-slate-400 dark:text-slate-600 mb-4', 'text-slate-400 dark:text-slate-400 mb-4'],
  ['dark:text-slate-500 uppercase', 'dark:text-slate-300 uppercase'],
  ['text-slate-500 dark:text-slate-400', 'text-slate-500 dark:text-slate-300']
]);

fix('src/components/SmartSavingsCalculator.tsx', [
  ['text-slate-500 dark:text-slate-400', 'text-slate-500 dark:text-slate-300'],
  ['text-slate-600 dark:text-slate-300', 'text-slate-600 dark:text-slate-100'],
  ['text-slate-650 dark:text-slate-300', 'text-slate-600 dark:text-slate-100']
]);

console.log('Fixed calculator and smart savings text colors');
