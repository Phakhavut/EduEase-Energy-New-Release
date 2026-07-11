const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

const targetStr = `  const deviceSpecificChartData = useMemo(() => {
    if (!selectedDeviceId) return [];
    const dev = multiDevices.find((d) => d.id === selectedDeviceId);
    if (!dev) return [];
    return Array.from({ length: 12 }, (_, i) => ({
      hour: \`\${i * 2}:00\`,
      load: +(dev.watt * (0.5 + Math.random() * 0.5)).toFixed(0),
    }));
  }, [selectedDeviceId, multiDevices]);`;

const replacementStr = `  const [deviceSpecificChartData, setDeviceSpecificChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (!selectedDeviceId) {
      setDeviceSpecificChartData([]);
      return;
    }
    const dev = multiDevices.find((d) => d.id === selectedDeviceId);
    if (!dev) {
      setDeviceSpecificChartData([]);
      return;
    }
    
    // Generate initial data
    const generateData = () => Array.from({ length: 12 }, (_, i) => ({
      hour: \`\${i * 2}:00\`,
      load: +(dev.watt * (0.5 + Math.random() * 0.5)).toFixed(0),
    }));
    
    setDeviceSpecificChartData(generateData());
    
    // Update every 10 seconds
    const interval = setInterval(() => {
      setDeviceSpecificChartData(generateData());
    }, 10000);
    
    return () => clearInterval(interval);
  }, [selectedDeviceId, multiDevices]);`;

code = code.replace(targetStr, replacementStr);

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('done match:', code.includes('const [deviceSpecificChartData, setDeviceSpecificChartData] = useState<any[]>([]);'));
