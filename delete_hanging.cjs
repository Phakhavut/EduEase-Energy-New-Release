const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// The hanging try-catch starts around try { \n const saved = localStorage.getItem("eudease_widget_order_v2");
// It goes until `});` before `const generatePDF`.

code = code.replace(/\s*try\s*\{\s*const saved = localStorage\.getItem\("eudease_widget_order_v2"\);[\s\S]*?\}\s*\}\s*return defaultOrder;\s*\}\s*catch\s*\{\s*return defaultOrder;\s*\}\s*\n\s*\n\s*\}\);\n/g, '\n');

// Actually let's just use string slicing
const startStr = '    try {\n      const saved = localStorage.getItem("eudease_widget_order_v2");';
const endStr = '    }\n  });\n';

const startIndex = code.indexOf(startStr);
if (startIndex !== -1) {
  const endIndex = code.indexOf(endStr, startIndex);
  if (endIndex !== -1) {
    code = code.substring(0, startIndex) + code.substring(endIndex + endStr.length);
  }
}

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('Deleted hanging try-catch!');
