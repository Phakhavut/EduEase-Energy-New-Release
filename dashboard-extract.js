const fs = require('fs');

const file = 'src/components/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

// The widget code strings to extract
// We will use regex to find the blocks: if (widgetId === "xxx") { return ( ... ); }
const extractWidget = (id) => {
    const regex = new RegExp(`if \\(widgetId === "${id}"\\) \\{\\s*return \\(\\s*<motion\\.div[^>]*>(.*?)\\s*</motion\\.div>\\s*\\);\\s*\\}`, 's');
    const match = content.match(regex);
    if (match) {
        // extract the inner content
        let inner = match[1];
        // replace the whole if statement with empty string
        content = content.replace(regex, '');
        
        // Remove drag handle and buttons since they are no longer widgets on the dashboard
        // Let's strip the header containing the drag handle
        const dragHandleRegex = /<div className="flex justify-between items-center bg-slate-50 dark:bg-slate-850.*?<\/div>\s*<\/div>/s;
        inner = inner.replace(dragHandleRegex, '');

        // inner contains the dashboard-card div.
        return `<div className="w-full mb-6">\n${inner}\n</div>`;
    }
    return null;
}

const widgets = {
    dailyQuests: extractWidget("daily-quests"),
    smartSavings: extractWidget("smart-savings"),
    propertyMap: extractWidget("property-map"),
    aiOpt: extractWidget("ai-optimization-gauge"),
    aiRec: extractWidget("ai-recommender"),
    loadCurve: extractWidget("load-curve"),
    gridControl: extractWidget("grid-control"),
};

// Now remove them from defaultOrder in the file
content = content.replace(/"daily-quests",\s*/g, '');
content = content.replace(/"smart-savings",\s*/g, '');
content = content.replace(/"property-map",\s*/g, '');
content = content.replace(/"ai-optimization-gauge",\s*/g, '');
content = content.replace(/"ai-recommender",\s*/g, '');
content = content.replace(/"load-curve",\s*/g, '');
content = content.replace(/"grid-control",\s*/g, '');

// Now insert them into proper places
// smart-savings -> calculator page
// Look for {currentPage === "calculator" && ( ... <div className="row g-4 md:g-5">
if (widgets.smartSavings) {
    const targetCalc = `{currentPage === "calculator" && (\n            <div className="animate-fade-in tech-grid p-4 md:p-6 rounded-[30px] md:rounded-[40px]">\n              <div className="row g-4 md:g-5">`;
    content = content.replace(targetCalc, targetCalc + `\n<div className="col-12">\n${widgets.smartSavings}\n</div>`);
}

// dailyQuests -> noti quests page
// Look for <QuestLeaderboard ... />
if (widgets.dailyQuests) {
    const targetQuest = `<QuestLeaderboard\n                  lang={lang}\n                  totalClaimedXp={totalClaimedXp}\n                  claimedQuests={claimedQuests}\n                  ecoStreak={ecoStreak}\n                  activeQuests={activeQuests}\n                  handleClaimQuest={handleClaimQuest}\n                  triggerConfetti={() => setConfettiTrigger((t) => t + 1)}\n                />`;
    content = content.replace(targetQuest, targetQuest + `\n${widgets.dailyQuests}`);
}

// propertyMap, gridControl -> devices page
// Look for {currentPage === "devices" && ( ... <div className="animate-fade-in relative">
if (widgets.propertyMap || widgets.gridControl) {
    const targetDevices = `{currentPage === "devices" && (\n            <div className="animate-fade-in relative">\n              {/* Premium Node Control toolbar */}`;
    content = content.replace(targetDevices, targetDevices + `\n${widgets.propertyMap || ''}\n${widgets.gridControl || ''}`);
}

// aiOpt, aiRec, loadCurve -> stats page
// Let's insert them into the "telemetry" tab.
if (widgets.aiOpt || widgets.aiRec || widgets.loadCurve) {
    const targetStats = `{statsTab === "telemetry" ? (\n                <div className="space-y-4 animate-fade-in text-dark">`;
    content = content.replace(targetStats, targetStats + `\n${widgets.aiOpt || ''}\n${widgets.aiRec || ''}\n${widgets.loadCurve || ''}`);
}

fs.writeFileSync(file, content);
console.log('Widgets moved successfully!');
