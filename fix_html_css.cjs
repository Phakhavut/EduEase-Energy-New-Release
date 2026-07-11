const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Remove color !important overrides for text
content = content.replace(/\[data-theme="dark"\] \.text-muted \{[\s\S]*?\}/g, '');
content = content.replace(/\[data-theme="dark"\] \.text-slate-400,[\s\S]*?\{[\s\S]*?\}/g, '');
content = content.replace(/\[data-theme="dark"\] \.text-gray-400 \{[\s\S]*?\}/g, '');
content = content.replace(/\[data-theme="light"\] \.text-muted \{[\s\S]*?\}/g, '');
content = content.replace(/\[data-theme="light"\] \.text-[a-z]+-[0-9]+,?[\s\S]*?\{[\s\S]*?\}/g, '');

// Also remove transitions with !important that mess up hover
content = content.replace(/transition: background-color 0\.6s[\s\S]*?!important;/g, '');

fs.writeFileSync(filePath, content);
console.log("Cleaned index.html CSS");
