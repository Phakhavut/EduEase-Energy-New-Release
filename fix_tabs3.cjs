const fs = require('fs');
const path = require('path');

const otherImports = `
import { WeatherCard } from "../WeatherCard";
import { EnergyTipWidget } from "../EnergyTipWidget";
import { HistoricalTrendChart } from "../HistoricalTrendChart";
import { QuestLeaderboard } from "../QuestLeaderboard";
import { DailyEnergyQuests } from "../DailyEnergyQuests";
`;

const tabsDir = path.join(__dirname, 'src/components/tabs');
const files = fs.readdirSync(tabsDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
    const filePath = path.join(tabsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('WeatherCard')) {
        content = content.replace(/(import .* from "lucide-react";)/, `$1\n${otherImports}`);
    }

    fs.writeFileSync(filePath, content);
});

console.log("Done");
