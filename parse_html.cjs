const { JSDOM } = require('jsdom');
const fs = require('fs');

setTimeout(() => {
  const html = fs.readFileSync('output.html', 'utf8');
  // output.html contains only the contents of App, so there is no div#root!
  // We need to wrap it!
  const dom = new JSDOM(`<div id="root">${html}</div>`);
  const doc = dom.window.document;
  
  const sel1 = "div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1)";
  const sel2 = "div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > p:nth-of-type(1)";
  const sel3 = "div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(1)";
  
  const el1 = doc.querySelector(sel1);
  const el2 = doc.querySelector(sel2);
  const el3 = doc.querySelector(sel3);
  
  console.log("EL1:", el1 ? el1.outerHTML : "NOT FOUND");
  console.log("EL2:", el2 ? el2.outerHTML : "NOT FOUND");
  console.log("EL3:", el3 ? el3.outerHTML : "NOT FOUND");
}, 2000);
