const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const dom = new JSDOM(html);
console.log(dom.window.document.querySelector("div#root:nth-of-type(1) > div:nth-of-type(1)"));
