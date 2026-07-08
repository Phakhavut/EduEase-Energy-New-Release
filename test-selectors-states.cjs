const { JSDOM } = require('jsdom');
const React = require('react');
const { renderToString } = require('react-dom/server');

// Mock browser globals
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url: "http://localhost:3000/" });
dom.window.matchMedia = dom.window.matchMedia || function() { return { matches: false, addListener: function() {}, removeListener: function() {} }; };
dom.window.ResizeObserver = class ResizeObserver { observe() {} unobserve() {} disconnect() {} };
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.sessionStorage = global.localStorage;

const App = require('./test_frontend.cjs').default;

const sel1 = "div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1)";
const sel2 = "div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > p:nth-of-type(1)";
const sel3 = "div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(1)";

// We can render the app using renderToString to inspect the HTML
const html = renderToString(React.createElement(App));
const renderDom = new JSDOM('<!DOCTYPE html><html><body><div id="root">' + html + '</div></body></html>');
const doc = renderDom.window.document;

console.log("RENDERED HTML SELECTOR CHECKS:");
console.log("Selector 1 matches:", doc.querySelector(sel1)?.outerHTML || "NULL");
console.log("Selector 2 matches:", doc.querySelector(sel2)?.outerHTML || "NULL");
console.log("Selector 3 matches:", doc.querySelector(sel3)?.outerHTML || "NULL");

if (!doc.querySelector(sel1)) {
  console.log("Let's list all matching paragraphs and buttons to trace parent structure:");
  const ps = Array.from(doc.querySelectorAll('p')).map(p => ({ text: p.textContent.substring(0, 60), parent: p.parentElement?.tagName }));
  console.log("Paragraphs:", ps);
}
