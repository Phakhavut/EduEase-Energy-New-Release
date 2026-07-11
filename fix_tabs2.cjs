const fs = require('fs');
const path = require('path');

// Fix Dashboard.tsx
const dashboardPath = path.join(__dirname, 'src/components/Dashboard.tsx');
let dashboard = fs.readFileSync(dashboardPath, 'utf8');
dashboard = dashboard.replace(/handleAiOptimization, /g, '');
dashboard = dashboard.replace(/fetchWeatherForAlert, /g, '');
dashboard = dashboard.replace(/updateDeviceConfig, /g, '');
dashboard = dashboard.replace(/renderWidgetWrapper, /g, '');
fs.writeFileSync(dashboardPath, dashboard);

const tabsDir = path.join(__dirname, 'src/components/tabs');
const files = fs.readdirSync(tabsDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
    const filePath = path.join(tabsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix UserManual import
    content = content.replace(/import \{ UserManual \} from "\.\.\/UserManual";/g, 'import UserManual from "../UserManual";');

    // Fix useContrastAdjustment import
    content = content.replace(/import useContrastAdjustment from "(.*?)";/g, 'import { useContrastAdjustment } from "$1";');

    // Fix relative paths in OverviewTab
    if (file === 'OverviewTab.tsx') {
        content = content.replace(/import \{ Device, DeviceCategory \} from "\.\.\/\.\.\/\.\.\/types\/device\.types";/g, 'import { Device, DeviceCategory } from "../../types/device.types";');
        content = content.replace(/import \{ useContrastAdjustment \} from "\.\.\/\.\.\/\.\.\/hooks\/useContrastAdjustment";/g, 'import { useContrastAdjustment } from "../../hooks/useContrastAdjustment";');
    }

    // Add lucide-react imports to CalculatorTab
    if (file === 'CalculatorTab.tsx') {
        content = content.replace(/\} from "lucide-react";/, ', Shield, TrendingUp, Lightbulb, Award, Coins } from "lucide-react";');
    }

    // Add ComposedChart to StatsTab
    if (file === 'StatsTab.tsx') {
        if (!content.includes('ComposedChart')) {
            content = content.replace(/import \{([^}]+)\} from "recharts";/, (match, p1) => {
                return `import {${p1}, ComposedChart} from "recharts";`;
            });
        }
    }

    fs.writeFileSync(filePath, content);
});

console.log("Done");
