const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace('@import "tailwindcss";\n', '');
css = css.replace('@import "tailwindcss";', '');

fs.writeFileSync(cssPath, css);
