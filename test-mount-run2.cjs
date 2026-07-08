const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url: "http://localhost:3000/" });
dom.window.matchMedia = dom.window.matchMedia || function() { return { matches: false, addListener: function() {}, removeListener: function() {} }; };
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.sessionStorage = global.localStorage;
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.ResizeObserver = class ResizeObserver { observe() {} unobserve() {} disconnect() {} };

const React = require('react');
const { createRoot } = require('react-dom/client');
const App = require('./test_frontend.cjs').default;

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
setTimeout(() => {
  console.log("Render completed without crashing (hopefully)");
  process.exit(0);
}, 2000);
