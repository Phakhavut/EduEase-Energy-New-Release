const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /max-h-\[400px\] opacity-100 py-24/g,
  'max-h-[100dvh] opacity-100 py-24'
);

fs.writeFileSync('src/App.tsx', content);
