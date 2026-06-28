const fs = require('fs');
const file = 'src/components/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/text-muted opacity-50/g, 'text-muted dark:opacity-100 opacity-50');
content = content.replace(/text-muted opacity-60/g, 'text-muted dark:opacity-100 opacity-60');

fs.writeFileSync(file, content);
console.log('Fixed opacity');
