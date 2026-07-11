const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// 1. Get all imports
const importMatch = code.match(/^(?:import.*?\n)+/ms);
let allImports = importMatch ? importMatch[0] : '';
// add shared type
allImports += `\nimport { SharedState } from '../types/shared.types';\n`;

// 2. Define the tabs to extract
const tabs = [
  { 
    id: 'dashboard', 
    name: 'OverviewTab',
    stateNames: ['widgetOrder', 'draggedIndex', 'isGeneratingPDF']
  },
  { 
    id: 'ai_hub', 
    name: 'AiHubTab',
    stateNames: [] 
  },
  { 
    id: 'devices', 
    name: 'DevicesTab',
    stateNames: ['searchTerm', 'activeCategory', 'showComparisonView'] 
  },
  { 
    id: 'calculator', 
    name: 'CalculatorTab',
    stateNames: ['calcMode', 'calcTab'] 
  },
  { 
    id: 'stats', 
    name: 'StatsTab',
    stateNames: ['statsFrame', 'statsTab'] 
  },
  { 
    id: 'noti', 
    name: 'NotiTab',
    stateNames: ['notiTab'] 
  },
  { 
    id: 'manual', 
    name: 'ManualTab',
    stateNames: ['manualTab'] 
  }
];

let newImports = `import React, { Suspense } from 'react';\n`;
tabs.forEach(t => {
  newImports += `const ${t.name} = React.lazy(() => import('./tabs/${t.name}'));\n`;
});
code = code.replace(/import \{.*?\} from "lucide-react";/, (match) => newImports + match);

if (!fs.existsSync('src/components/tabs')) {
  fs.mkdirSync('src/components/tabs', { recursive: true });
}

// 3. Extract and replace JSX
tabs.forEach(tab => {
  const regex = new RegExp(`\\{currentPage === "${tab.id}" && \\(([\\s\\S]*?)\\)(?:\\s*)}`, 'm');
  const match = code.match(regex);
  if (match) {
    let jsx = match[1].trim();
    
    // We will pass `shared` to the component
    // We also need to move the state declarations
    let stateDecls = '';
    tab.stateNames.forEach(st => {
      // Find the useState in Dashboard
      const stRegex = new RegExp(`\\s*const \\[${st},[\\s\\S]*?useState[\\s\\S]*?;`, 'g');
      const stMatch = code.match(stRegex);
      if (stMatch) {
        stateDecls += stMatch[0].trim() + '\n  ';
        // Remove from Dashboard
        code = code.replace(stRegex, '');
      }
    });

    const fileContent = `${allImports}

export default function ${tab.name}({ shared }: { shared: any }) {
  ${stateDecls}
  // Destructure shared
  const { ${Object.keys(require('./shared_keys.json').keys).join(', ')} } = shared;
  
  return (
    ${jsx}
  );
}
`;
    fs.writeFileSync(`src/components/tabs/${tab.name}.tsx`, fileContent, 'utf-8');
    
    // Replace in Dashboard
    const replacement = `{currentPage === "${tab.id}" && (
            <Suspense fallback={<div className="flex justify-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
              <${tab.name} shared={shared} />
            </Suspense>
          )}`;
    code = code.replace(match[0], replacement);
  }
});

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('JSX Extraction complete!');
