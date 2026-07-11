const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// We will extract state and JSX into separate components.
// It's too complex to write a perfect regex for everything.
// Let's just create the files manually using string manipulation.

const tabs = [
  { name: 'OverviewTab', start: 2558, end: 2983, state: ['widgetOrder', 'draggedIndex', 'isGeneratingPDF'] },
  { name: 'AiHubTab', start: 2985, end: 3016, state: ['isAiScanning', 'aiAlerts', 'activeSpike', 'aiSmartAc', 'aiEcoStandby', 'aiPfTuning', 'aiLoadShift', 'aiTick'] },
  { name: 'DevicesTab', start: 3017, end: 3459, state: ['searchTerm', 'activeCategory', 'selectedDeviceId', 'compareDeviceIds', 'showComparisonView', 'isAnalyzingDevice', 'deviceAnalysis'] },
  { name: 'CalculatorTab', start: 3461, end: 3867, state: ['calcMode', 'calcTab', 'calcDays', 'unitRate', 'globalBudget', 'sharedFtRate', 'plannedKwh', 'onPeakShare'] },
  { name: 'StatsTab', start: 3869, end: 4475, state: ['statsFrame', 'perfRange', 'telemetryPerfRange', 'statsTab', 'deviceSpecificChartData'] },
  { name: 'NotiTab', start: 4477, end: 4628, state: ['notiTab', 'claimedQuests'] },
  { name: 'ManualTab', start: 4630, end: 4755, state: ['manualTab'] },
];

