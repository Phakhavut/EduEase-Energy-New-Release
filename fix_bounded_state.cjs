const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// bounded setAiAlerts
code = code.replace(/setAiAlerts\(\(prev\) => \[optAlert, \.\.\.prev\]\);/g, 'setAiAlerts((prev) => [optAlert, ...prev].slice(0, 50));');
code = code.replace(/setAiAlerts\(\(prev\) => \[newAlert, \.\.\.prev\]\);/g, 'setAiAlerts((prev) => [newAlert, ...prev].slice(0, 50));');

// bounded setChatMessages
code = code.replace(/setChatMessages\(\(prev\) => \[\.\.\.prev, userMsg\]\);/g, 'setChatMessages((prev) => [...prev, userMsg].slice(-50));');
code = code.replace(/setChatMessages\(\(prev\) => \[\.\.\.prev, aiMsg\]\);/g, 'setChatMessages((prev) => [...prev, aiMsg].slice(-50));');
code = code.replace(/setChatMessages\(\(prev\) => \[\.\.\.prev, (.*?)\]\);/g, 'setChatMessages((prev) => [...prev, $1].slice(-50));');

// bounded quest history / confetti - this one may not grow fast enough to matter, but let's check
fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('done');
