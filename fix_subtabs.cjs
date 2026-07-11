const fs = require('fs');

const files = [
  { path: 'src/components/tabs/CalculatorTab.tsx', find: '              {calcTab === "tariff" && (', replace: '              )}\n              {calcTab === "tariff" && (' },
  { path: 'src/components/tabs/CalculatorTab.tsx', find: '              {calcTab === "budget" && (', replace: '              )}\n              {calcTab === "budget" && (' },
  { path: 'src/components/tabs/StatsTab.tsx', find: '              {statsTab === "benchmark" && (', replace: '              )}\n              {statsTab === "benchmark" && (' },
  { path: 'src/components/tabs/NotiTab.tsx', find: '              {notiTab === "quests" && (', replace: '              )}\n              {notiTab === "quests" && (' },
  { path: 'src/components/tabs/ManualTab.tsx', find: '              {manualTab === "settings" && (', replace: '              )}\n              {manualTab === "settings" && (' },
  // DevicesTab has comparison view? 
  // Let's check where DevicesTab is missing `)}`
];

files.forEach(f => {
  let content = fs.readFileSync(f.path, 'utf-8');
  content = content.replace(f.find, f.replace);
  fs.writeFileSync(f.path, content, 'utf-8');
});

console.log('Fixed sub-tabs!');
