const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/tabs/CalculatorTab.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The progress bar in Budget Utilization Analysis
const regex = /<div className="relative w-full h-3 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-150 dark:border-slate-800\/80">([\s\S]*?)<\/div>/;

const replacement = `<div className="relative w-full h-3 bg-slate-100 dark:bg-slate-950 rounded-full border border-slate-150 dark:border-slate-800/80">
  $1
</div>`;

content = content.replace(regex, replacement);

const innerBarRegex = /className={\`h-full rounded-full transition-all duration-500 \$\{\(plannedKwh \* 3\.8\) > globalBudget \? "bg-rose-500" : "bg-emerald-500"\}\`}/;
const innerBarReplacement = `className={\`h-full rounded-full transition-all duration-500 \${(plannedKwh * 3.8) > globalBudget ? "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)]" : "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"}\`}`;

content = content.replace(innerBarRegex, innerBarReplacement);

fs.writeFileSync(filePath, content);
console.log("Updated CalculatorTab.tsx");
