const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace("@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');", "");

const newImport = "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');\n";
css = newImport + css;

fs.writeFileSync(cssPath, css);
console.log("Moved import to top");
