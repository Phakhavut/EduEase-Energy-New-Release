const { JSDOM } = require('jsdom');
const fs = require('fs');

try {
  const html = fs.readFileSync('output.html', 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const ps = Array.from(doc.querySelectorAll('p')).map(p => p.textContent.substring(0, 100));
  const buttons = Array.from(doc.querySelectorAll('button')).map(b => b.textContent.substring(0, 100));
  console.log("All paragraph texts (up to 20):", ps.slice(0, 20));
  console.log("All button texts (up to 20):", buttons.slice(0, 20));
} catch (e) {
  console.error(e);
}
