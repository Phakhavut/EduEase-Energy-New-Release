const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = `@import "tailwindcss";\n` + css;

fs.writeFileSync(cssPath, css);
