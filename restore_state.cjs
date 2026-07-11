const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

const missingStates = `
  const [widgetOrder, setWidgetOrder] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showComparisonView, setShowComparisonView] = useState(false);
  
  const [calcMode, setCalcMode] = useState<"hours" | "budget">("hours");
  const [calcTab, setCalcTab] = useState<"detailed" | "tariff" | "budget">("detailed");
  
  const [statsFrame, setStatsFrame] = useState<"daily" | "monthly">("daily");
  const [statsTab, setStatsTab] = useState<"telemetry" | "benchmark">("telemetry");
  
  const [notiTab, setNotiTab] = useState<"alerts" | "quests">("alerts");
  
  const [manualTab, setManualTab] = useState<"guide" | "settings">("guide");
`;

code = code.replace(/const \[currentPage, setCurrentPage\] = useState\("dashboard"\);/, 
  'const [currentPage, setCurrentPage] = useState("dashboard");\n' + missingStates);

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('Restored states!');
