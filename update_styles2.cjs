const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

const geoGuessrStyles = `
/* Gamified GeoGuessr-inspired UI Styles */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');

body {
  font-family: 'Nunito', sans-serif !important;
}

h1, h2, h3, h4, h5, h6, .font-display {
  font-family: 'Nunito', sans-serif !important;
  font-weight: 900 !important;
}

.dashboard-card {
  border-radius: 24px !important;
  border: 2px solid transparent !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04) !important;
  background: var(--card-bg);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease !important;
}

[data-theme="dark"] .dashboard-card {
  box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2) !important;
}

.dashboard-card:hover {
  transform: translateY(-4px) scale(1.01) !important;
  box-shadow: 0 12px 32px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.05) !important;
  border-color: rgba(99, 102, 241, 0.2) !important;
}

[data-theme="dark"] .dashboard-card:hover {
  border-color: rgba(99, 102, 241, 0.4) !important;
}

/* Playful Buttons */
.btn {
  border-radius: 999px !important;
  font-weight: 900 !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none !important;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s ease !important;
}

.btn-primary {
  background: linear-gradient(180deg, #818cf8 0%, #4f46e5 100%) !important;
  box-shadow: 0 4px 0 #3730a3, 0 8px 16px rgba(99, 102, 241, 0.4) !important;
  color: white !important;
}

.btn-primary:active {
  transform: translateY(4px) !important;
  box-shadow: 0 0 0 #3730a3, 0 4px 8px rgba(99, 102, 241, 0.4) !important;
}

.btn-outline-primary {
  background: white !important;
  color: #4f46e5 !important;
  border: 2px solid #4f46e5 !important;
  box-shadow: 0 4px 0 #e0e7ff !important;
}

[data-theme="dark"] .btn-outline-primary {
  background: #1e293b !important;
  box-shadow: 0 4px 0 #0f172a !important;
}

.btn-outline-primary:active {
  transform: translateY(4px) !important;
  box-shadow: 0 0 0 transparent !important;
}

/* Glowing Progress Bars */
.progress {
  border-radius: 999px !important;
  background-color: #e2e8f0 !important;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1) !important;
  overflow: visible !important;
}

[data-theme="dark"] .progress {
  background-color: #334155 !important;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.4) !important;
}

.progress-bar {
  border-radius: 999px !important;
  background: linear-gradient(90deg, #34d399 0%, #10b981 100%) !important;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.3) !important;
  position: relative;
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%);
}

/* Glowing Sliders */
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  margin-top: -10px;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.4);
  border: 4px solid #10b981;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 0 15px rgba(16, 185, 129, 1), 0 0 30px rgba(16, 185, 129, 0.6);
}

input[type="range"]::-webkit-slider-thumb:active {
  transform: scale(0.95);
  box-shadow: 0 0 8px rgba(16, 185, 129, 1);
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: rgba(16, 185, 129, 0.2);
  border-radius: 10px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] input[type="range"]::-webkit-slider-runnable-track {
  background: rgba(16, 185, 129, 0.3);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Custom rounded inner badges */
.badge {
  border-radius: 999px !important;
  font-weight: 800 !important;
}

/* Topbar glass effect */
.bg-white\\/90, .dark\\:bg-slate-900\\/90 {
  backdrop-filter: blur(12px) !important;
}
`;

css += geoGuessrStyles;
fs.writeFileSync(cssPath, css);
console.log("Updated styles");
