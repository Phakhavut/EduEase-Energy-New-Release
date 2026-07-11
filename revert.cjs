const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

const tabs = [
  { id: 'dashboard', name: 'OverviewTab' },
  { id: 'ai_hub', name: 'AiHubTab' },
  { id: 'devices', name: 'DevicesTab' },
  { id: 'calculator', name: 'CalculatorTab' },
  { id: 'stats', name: 'StatsTab' },
  { id: 'noti', name: 'NotiTab' },
  { id: 'manual', name: 'ManualTab' }
];

tabs.forEach(tab => {
  // Find the Suspense block
  const suspenseRegex = new RegExp(`\\{currentPage === "${tab.id}" && \\([\\s\\S]*?<${tab.name} shared=\\{shared\\} \\/>[\\s\\S]*?<\\/Suspense>\\n          \\)}`);
  
  // Read the partial JSX from the file
  let tabCode = fs.readFileSync(`src/components/tabs/${tab.name}.tsx`, 'utf-8');
  
  // Extract just the JSX part (after return ()
  const jsxMatch = tabCode.match(/return \(\s*([\s\S]*?)\s*\);\s*}/);
  if (jsxMatch) {
    let partialJsx = jsxMatch[1];
    // Reconstruct the original block
    // It's the Suspense block + the leftovers up to the real `)}`
    
    // Actually, it's easier to just do text replacement.
    code = code.replace(suspenseRegex, `{currentPage === "${tab.id}" && (\n${partialJsx}`);
  }
});

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('Restored JSX structure');
