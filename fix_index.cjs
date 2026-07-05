const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const loadingHtml = `
    <div id="root">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background-color: #0f172a; color: white; font-family: sans-serif;">
        <svg style="width: 64px; height: 64px; animation: spin 1s linear infinite; margin-bottom: 20px; color: #10b981;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 style="font-size: 1.5rem; font-weight: bold; margin: 0; padding: 0;">Initializing EduEase Energy...</h2>
        <p style="color: #94a3b8; margin-top: 8px;">Connecting to smart grid.</p>
        <style>
          @keyframes spin { 100% { transform: rotate(360deg); } }
        </style>
      </div>
    </div>
`;

content = content.replace(/<div id="root"><\/div>/, loadingHtml);
fs.writeFileSync('index.html', content);
