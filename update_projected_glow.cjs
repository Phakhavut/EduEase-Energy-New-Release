const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/ProjectedSavingsCard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<div className="w-full h-1\.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">([\s\S]*?)<\/div>/g;

content = content.replace(regex, (match, p1) => {
    // Remove overflow-hidden
    let newDiv = `<div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200/50 dark:border-slate-800/50 relative">` + p1 + `</div>`;
    
    // Add shadow glow to the inner div
    // item.color might be something like "bg-emerald-500", "bg-sky-500"
    // We can add a generic shadow color or specific. It's easiest to add shadow-[0_0_10px_currentColor] 
    // but the color comes from bg-* so currentColor won't work unless text-* is set.
    // So we can just map the glow or add a generic glow. Let's add a generic glow or use Tailwind arbitrary values.
    
    return newDiv;
});

const innerRegex = /className={\`h-full \$\{item\.color\} rounded-full\`}/g;
content = content.replace(innerRegex, `className={\`h-full \${item.color} rounded-full shadow-md\`}`);

fs.writeFileSync(filePath, content);
console.log("Updated ProjectedSavingsCard.tsx");
