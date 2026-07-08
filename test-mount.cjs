const { JSDOM } = require('jsdom');
const fs = require('fs');

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: "http://localhost:3000/",
  runScripts: "dangerously",
  resources: "usable"
});

// Polyfill for matchMedia which might be missing in JSDOM
dom.window.matchMedia = dom.window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};
// Polyfill ResizeObserver
dom.window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};
global.sessionStorage = global.localStorage;

const React = require('react');
const { createRoot } = require('react-dom/client');

// We need to bundle the app for CommonJS so we can require it
// We already have dist/server.cjs but it's the backend. We need to bundle the frontend App.
