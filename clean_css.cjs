const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'index.css');

const cssContent = `@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');
@import "tailwindcss";

/* EduEase Energy Global CSS Stylesheet */
:root {
  --primary: #6366f1; /* Indigo-ish */
  --primary-glow: rgba(99, 102, 241, 0.6);
  --secondary: #10b981; /* Emerald */
  --secondary-glow: rgba(16, 185, 129, 0.6);
  --bg-body: #f8fafc;
  --sidebar-bg: #ffffff;
  --card-bg: #ffffff;
  --text-main: #0f172a;
  --text-gray: #475569;
  --border: #cbd5e1;
  --input-bg: #f8fafc;
  --accent: #10b981;
}

[data-theme="dark"] {
  --bg-body: #0f172a;
  --sidebar-bg: #1e293b;
  --card-bg: #1e293b;
  --text-main: #ffffff;
  --text-gray: #f8fafc;
  --border: #334155;
  --input-bg: #1b254b;
  --accent: #34d399;
}

body {
  font-family: 'Nunito', sans-serif !important;
  background-color: var(--bg-body);
}

h1, h2, h3, h4, h5, h6, .font-display {
  font-family: 'Nunito', sans-serif !important;
  font-weight: 900 !important;
}

/* Custom fade-in and slide-up animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Gamified GeoGuessr-inspired Dashboard Cards */
.dashboard-card {
  border-radius: 24px !important;
  border: 2px solid transparent !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04) !important;
  background: var(--card-bg);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease !important;
  will-change: transform, box-shadow;
}

[data-theme="dark"] .dashboard-card {
  box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2) !important;
}

.dashboard-card:hover {
  transform: translateY(-4px) scale(1.015) !important;
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
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s ease !important;
}

.btn-primary {
  background: linear-gradient(180deg, #818cf8 0%, #4f46e5 100%) !important;
  box-shadow: 0 4px 0 #3730a3, 0 8px 16px rgba(99, 102, 241, 0.4) !important;
  color: white !important;
  border: none !important;
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

/* Glowing Sliders (GeoGuessr + Neon old style) */
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

/* Hide scrollbar for tabs */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
`;

fs.writeFileSync(cssPath, cssContent);
console.log("Replaced index.css completely");
