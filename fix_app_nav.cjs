const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Desktop
const desktopRegex = /<nav className="hidden lg:flex gap-8">[\s\S]*?<\/nav>/g;
code = code.replace(desktopRegex, '');

// Mobile
const mobileRegex = /<nav className="flex flex-col items-center gap-6">[\s\S]*?<\/nav>/g;
code = code.replace(mobileRegex, '');

fs.writeFileSync('src/App.tsx', code, 'utf-8');
console.log('done');
