
import React, { useState, useMemo, useEffect } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line
} from 'recharts';
import { GoogleGenAI, Type } from "@google/genai";

const langData = {
    th: {
        // Sidebar & Header
        m1: "หน้าแรก", m2: "จัดการโหนด", m3: "คำนวณค่าไฟ", m4: "งบประมาณ", m5: "ประวัติการใช้ไฟ", m6: "การแจ้งเตือน", m7: "AI แนะนำ", m8: "เปรียบเทียบพื้นที่", m9: "ตั้งค่าระบบ",
        logout: "จบการทำงาน", sys_sub_title: "ระบบปฏิบัติการโครงข่าย", 
        terminal: "เทอร์มินัลเข้ารหัส", global_access: "ศูนย์เข้าถึงข้อมูล",
        db_health: "สถานะโครงข่าย: เสถียร", db_saving: "ประหยัดเพิ่มได้ 12%",

        // General Actions
        search: "ค้นหาโหนด...", filter: "กรองข้อมูล", apply: "บันทึกการตั้งค่า",
        cancel: "ยกเลิก", add: "เพิ่ม", delete: "ลบ", close: "ปิด",
        
        // Dashboard Stats
        stat_est_monthly: "ค่าไฟประมาณการรายเดือน",
        stat_burn_daily: "อัตราการใช้เงินรายวัน",
        stat_total_load: "โหลดรวมในโครงข่าย",
        stat_credit_health: "สุขภาพงบประมาณ",
        stat_optimal: "เหมาะสม", stat_deficit: "เกินงบ",
        chart_telemetry_title: "มาตรวัดพลังงาน 7 วันย้อนหลัง",
        ai_scan_title: "AI วิเคราะห์จุดประหยัดไฟ",
        ai_scan_desc: "เราตรวจพบการใช้ไฟผิดปกติในส่วน Entertainment ระหว่างเวลา 02:00-04:00 การปิดโหนด Standby จะช่วยประหยัดเงินได้ ฿210 ในรอบบิลนี้",
        ai_apply: "ยอมรับข้อเสนอปรับปรุง",

        // Node Manager
        node_config_title: "ข้อมูลอัจฉริยะรายโหนด",
        node_id: "รหัสเทอร์มินัล", node_name: "ชื่ออุปกรณ์/โหนด",
        node_watt: "กำลังไฟ (วัตต์)", node_hours: "ชั่วโมงที่ใช้ต่อวัน",
        node_sector: "ส่วนงาน", node_auth: "อนุญาตการเปลี่ยนแปลง",
        node_maintenance: "บันทึกการบำรุงรักษา",
        node_tech_specs: "ข้อมูลทางเทคนิค",
        node_pf: "ตัวประกอบกำลัง (PF)",
        node_history_title: "ประวัติการโหลด 24 ชม.",
        node_log_resolved: "เสร็จสิ้น",
        node_log_pending: "รอดำเนินการ",

        // Power Calculator
        calc_planner_title: "แผนผังโครงข่ายยุทธศาสตร์",
        calc_mode_hour: "โหมดเวลา", calc_mode_budget: "โหมดงบประมาณ",
        calc_rate: "ค่าไฟต่อหน่วย (บาท)", calc_days: "จำนวนวันคำนวณ",
        calc_detailed: "ปรับแต่งละเอียด", calc_batch: "คลังอุปกรณ์ด่วน", calc_tariff: "ตรรกะค่าไฟ (TOU)",
        calc_est_cost: "ค่าไฟประมาณการ (ปกติ)",
        calc_sim_tou: "จำลองตรรกะ TOU", calc_grid_saving: "ส่วนต่างประหยัด",
        calc_daily_cost: "ค่าใช้จ่ายรายวัน", calc_node_avg: "เฉลี่ยต่อโหนด",
        batch_presets: "ชุดอุปกรณ์ด่วน (คำนวณหลายตัว)", batch_library: "คลังอุปกรณ์",
        batch_add_set: "เพิ่มทั้งชุด", batch_living: "ชุดห้องนั่งเล่น", batch_kitchen: "ชุดห้องครัว", batch_bedroom: "ชุดห้องนอน",
        calc_on_peak_share: "สัดส่วนการใช้ On-Peak (%)",
        calc_off_peak_share: "สัดส่วนการใช้ Off-Peak (%)",
        calc_tou_breakdown: "แจกแจงค่าไฟ TOU",
        calc_savings_vs_std: "ประหยัดได้เมื่อเทียบกับแบบปกติ",
        
        // TOU Section
        tou_title: "การวิเคราะห์ TOU vs ขั้นบันได",
        tou_peak: "ช่วง On-Peak (แพง)", tou_off: "ช่วง Off-Peak (ถูก)",
        tou_desc: "ระบบ TOU คิดค่าไฟตามช่วงเวลา เหมาะสำหรับผู้ที่ชาร์จรถ EV หรือใช้ไฟกลางคืนเยอะ",
        tou_peak_desc: "09:00 - 22:00 (จ.-ศ.) คิดราคาแพงเนื่องจากมีความต้องการใช้ไฟฟ้าสูง",
        tou_off_desc: "22:00 - 09:00 และวันหยุด คิดราคาถูกมากเพื่อกระจายโหลดไฟฟ้า",
        progressive_title: "ระบบอัตราก้าวหน้า (Progressive)",
        progressive_desc: "ยิ่งใช้เยอะ ยิ่งจ่ายแพงต่อหน่วย ไม่แยกช่วงเวลา",
        progressive_tier: "ระดับที่",

        // Budgeting
        budget_limit_title: "วงเงินงบประมาณระบบ",
        budget_modify: "ปรับเพดานงบรายเดือน",
        budget_remainder: "งบประมาณคงเหลือประมาณการ",
        budget_priority: "ลำดับความสำคัญของโหนด",
        budget_weight: "น้ำหนักในโครงข่าย", budget_health: "สถานะ: ปกติ",

        // Telemetry
        telemetry_active_load: "มาตรวัดการโหลดจริง",
        telemetry_daily: "รายวัน", telemetry_monthly: "รายเดือน",
        telemetry_dist: "สัดส่วนการใช้ไฟรายเซกเตอร์",
        telemetry_logs: "บันทึกการชำระเงินย้อนหลัง",
        log_cycle: "รอบบิล", log_units: "หน่วยไฟ", log_settlement: "ยอดชำระสุทธิ",

        // Alerts
        alert_log_title: "บันทึกการแจ้งเตือนระบบ",
        alert_clear: "ล้างบันทึกทั้งหมด",
        alert_spike_title: "พบการใช้ไฟสูงผิดปกติ", alert_spike_desc: "จอ Cinema Display ใช้ไฟเกินค่าเฉลี่ย 20% ใน 4 ชม. ที่ผ่านมา",
        alert_update_title: "อัปเดตระบบ: โปรโตคอล 4.2", alert_update_desc: "อัปเดตอัลกอริทึมประหยัดพลังงานเป็นมาตรฐานล่าสุดแล้ว",
        alert_budget_title: "งบประมาณใกล้เต็ม", alert_budget_desc: "การใช้เงินปัจจุบันอยู่ที่ 85% ของเพดานที่ตั้งไว้",
        alert_ai_scan: "สแกนหาความผิดปกติด้วย AI",
        alert_scanning: "กำลังประมวลผลโครงข่าย...",
        alert_anomaly_found: "ตรวจพบความผิดปกติวิกฤต",

        // AI Intel
        tips_dynamic_ac: "ปรับอุณหภูมิ AC แบบไดนามิก", tips_dynamic_ac_desc: "เพิ่มอุณหภูมิ 1°C ช่วง 13:00-16:00 จะลดโหลดได้ 12%",
        tips_cinema: "โหมดลดแสงหน้าจอ", tips_cinema_desc: "ลดความสว่างจอ Cinema เหลือ 80% ประหยัดได้ ฿15 ทุก 10 ชม.",
        tips_standby: "ระงับการกินไฟสแตนด์บาย", tips_standby_desc: "ปิดโหนด Gaming Rig เมื่อไม่ใช้งาน ช่วยลดค่าไฟสแตนด์บาย ฿40/เดือน",
        achievement_title: "ความสำเร็จ: Energy Sentry",
        achievement_desc: "คุณรักษาความเสถียรของโครงข่ายได้ติดต่อกัน 20 วัน ปลดล็อกระดับรางวัลใหม่",
        achievement_redeem: "รับตราสัญลักษณ์ประสิทธิภาพ",

        // Benchmark
        bench_title: "การเปรียบเทียบระดับเขตพื้นที่",
        bench_you: "ฮับของคุณ", bench_sector_avg: "ค่าเฉลี่ยเซกเตอร์", bench_eco_hub: "ฮับตัวอย่าง",
        bench_status: "สถานะฮับ: ยอดเยี่ยม (Elite)",
        bench_status_desc: "การใช้ไฟของคุณสะอาดกว่าค่าเฉลี่ยในพื้นที่ 18% คุณมีสิทธิ์ได้รับเงินคืน Green Grid",
        bench_insight_title: "ข้อมูลเชิงลึกยุทธศาสตร์",
        bench_insight_desc: "สัดส่วนการทำความเย็นดีเยี่ยม หากต้องการระดับ 'Eco Master' แนะนำให้อัปเกรดโหนดความบันเทิง",

        // Settings
        set_core_title: "ตั้งค่าแกนกลางระบบ",
        set_authority: "ระดับสิทธิ์: ผู้ดูแลระดับสูง (Master)",
        set_lang: "ภาษาของระบบ",
        set_dark_mode: "โหมดอินเทอร์เฟซมืด",
        set_telemetry: "ความละเอียดมาตรวัด", set_security: "การเชื่อมต่อความปลอดภัย",
        set_terminate: "ยุติการเชื่อมต่อระบบ"
    },
    en: {
        // Sidebar & Header
        m1: "Dashboard", m2: "Node Manager", m3: "Power Calc", m4: "Budgeting", m5: "Telemetry", m6: "Alerts", m7: "AI Intel", m8: "Benchmark", m9: "Core Settings",
        logout: "Terminate Session", sys_sub_title: "Grid Operation OS",
        terminal: "Encrypted Terminal", global_access: "Global Access Hub",
        db_health: "Grid Status: Stable", db_saving: "12% Potential Saving",

        // General Actions
        search: "Search nodes...", filter: "Filter Data", apply: "Apply Changes",
        cancel: "Cancel", add: "Add", delete: "Delete", close: "Close",

        // Dashboard Stats
        stat_est_monthly: "Estimated Monthly",
        stat_burn_daily: "Burn Rate (Daily)",
        stat_total_load: "Total Grid Load",
        stat_credit_health: "Credit Health",
        stat_optimal: "Optimal", stat_deficit: "Deficit",
        chart_telemetry_title: "7-Day Power Telemetry",
        ai_scan_title: "AI Optimization Scan",
        ai_scan_desc: "We detected abnormal spikes in the Entertainment sector between 02:00-04:00. Shutting down standby nodes could save you up to ฿210 this cycle.",
        ai_apply: "Apply Optimization",

        // Node Manager
        node_config_title: "Node Intelligence Hub",
        node_id: "Telemetry ID", node_name: "Node Name",
        node_watt: "Power Rate (Watts)", node_hours: "Daily Duty (Hours)",
        node_sector: "Grid Sector", node_auth: "Authorize Changes",
        node_maintenance: "Maintenance History",
        node_tech_specs: "Technical Specs",
        node_pf: "Power Factor (PF)",
        node_history_title: "24h Load Telemetry",
        node_log_resolved: "Resolved",
        node_log_pending: "Pending",

        // Power Calculator
        calc_planner_title: "Strategic Grid Planner",
        calc_mode_hour: "Hour Mode", calc_mode_budget: "Credit Mode",
        calc_rate: "Unit Rate (฿)", calc_days: "Days to Project",
        calc_detailed: "Detailed Nodes", calc_batch: "Appliance Library", calc_tariff: "Tariff Intel (TOU)",
        calc_est_cost: "Estimated Cost (Standard)",
        calc_sim_tou: "Simulated TOU Logic", calc_grid_saving: "Grid Saving",
        calc_daily_cost: "Daily Cost", calc_node_avg: "Per Node Avg",
        batch_presets: "Batch Presets (Multi-Calculations)", batch_library: "Device Library",
        batch_add_set: "Add Set", batch_living: "Living Room Set", batch_kitchen: "Kitchen Set", batch_bedroom: "Bedroom Set",
        calc_on_peak_share: "On-Peak Usage Share (%)",
        calc_off_peak_share: "Off-Peak Usage Share (%)",
        calc_tou_breakdown: "TOU Cost Breakdown",
        calc_savings_vs_std: "Savings vs Standard Tariff",

        // TOU Section
        tou_title: "TOU vs Progressive Analysis",
        tou_peak: "On-Peak (High Rate)", tou_off: "Off-Peak (Low Rate)",
        tou_desc: "TOU charges by time. Ideal for EV owners or night-heavy users.",
        tou_peak_desc: "09:00 - 22:00 (Mon-Fri). Premium rates reflecting peak grid demand.",
        tou_off_desc: "22:00 - 09:00, Weekends/Holidays. Low rates for load balancing.",
        progressive_title: "Progressive Tariff",
        progressive_desc: "Unit rate increases with volume. Time does not affect price.",
        progressive_tier: "Tier",

        // Budgeting
        budget_limit_title: "System Credit Limit",
        budget_modify: "Modify Monthly Cap",
        budget_remainder: "Projected Credit Remainder",
        budget_priority: "Node Allocation Priority",
        budget_weight: "Grid Weight", budget_health: "Health: Optimal",

        // Telemetry
        telemetry_active_load: "Active Load Telemetry",
        telemetry_daily: "Daily", telemetry_monthly: "Monthly",
        telemetry_dist: "Grid Distribution",
        telemetry_logs: "Settlement Logs",
        log_cycle: "Fiscal Cycle", log_units: "Power Units", log_settlement: "Final Settlement",

        // Alerts
        alert_log_title: "Alert Log",
        alert_clear: "Clear All",
        alert_spike_title: "Consumption Spike Alert", alert_spike_desc: "Cinema Display has surpassed expected load by 20% in the last 4 hours.",
        alert_update_title: "System Update: Protocol 4.2", alert_update_desc: "Energy saving algorithms have been updated to the latest campus standard.",
        alert_budget_title: "Financial Alert: Credit Low", alert_budget_desc: "Current spend is at 85% of your defined monthly credit limit.",
        alert_ai_scan: "AI Anomaly Scan",
        alert_scanning: "Analyzing Grid Load Patterns...",
        alert_anomaly_found: "AI Detected Critical Anomaly",

        // AI Intel
        tips_dynamic_ac: "Dynamic Thermostat Shift", tips_dynamic_ac_desc: "Increasing Smart AC temperature by 1°C during peak hours (13:00-16:00) reduces load by 12%.",
        tips_cinema: "Cinema Mode Offset", tips_cinema_desc: "Lowering Cinema Display brightness to 80% saves approximately ฿15 per 10 hours of use.",
        tips_standby: "Standby Suppression", tips_standby_desc: "Shutting down Gaming Rig nodes when not in session prevents parasitic drain of ฿40/mo.",
        achievement_title: "Sector Achievement: Energy Sentry",
        achievement_desc: "You have successfully stayed within the 'Stable' grid profile for 20 consecutive days. New reward tier unlocked.",
        achievement_redeem: "Redeem Efficiency Badge",

        // Benchmark
        bench_title: "District Benchmark Analysis",
        bench_you: "Your Hub", bench_sector_avg: "Sector Avg", bench_eco_hub: "Eco Hub Alpha",
        bench_status: "Hub Status: Elite",
        bench_status_desc: "Your load signature is 18% cleaner than the current neighborhood median. You qualify for the Green Grid rebate.",
        bench_insight_title: "Strategic Insight",
        bench_insight_desc: "Your cooling profile is excellent. To reach 'Eco Master' status, consider upgrading Entertainment nodes.",

        // Settings
        set_core_title: "Core Settings",
        set_authority: "Sector Authority: Master Level",
        set_lang: "System Language",
        set_dark_mode: "Dark Interface Protocol",
        set_telemetry: "Telemetry Precision", set_security: "Security Handshake",
        set_terminate: "Terminate System Link"
    }
};

const CATEGORIES = ['Cooling', 'Kitchen', 'Bathroom', 'Entertainment', 'Misc'];
const COLORS = ['#6f42c1', '#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

const APPLIANCE_LIBRARY = [
    { name: 'LED TV (55")', watt: 150, hours: 5, category: 'Entertainment', icon: 'fa-tv' },
    { name: 'Laptop', watt: 65, hours: 8, category: 'Entertainment', icon: 'fa-laptop' },
    { name: 'Microwave', watt: 1200, hours: 0.5, category: 'Kitchen', icon: 'fa-bread-slice' },
    { name: 'Washing Machine', watt: 500, hours: 1, category: 'Misc', icon: 'fa-tshirt' },
    { name: 'Iron', watt: 1000, hours: 0.5, category: 'Misc', icon: 'fa-tshirt' },
    { name: 'Vacuum Cleaner', watt: 1400, hours: 0.5, category: 'Misc', icon: 'fa-broom' },
];

const PRESET_SETS = [
    { 
        id: 'living', 
        key: 'batch_living', 
        icon: 'fa-couch',
        items: [
            { name: 'Living Room TV', watt: 150, hours: 6, category: 'Entertainment' },
            { name: 'AC Unit', watt: 1200, hours: 8, category: 'Cooling' },
            { name: 'Floor Lamp', watt: 20, hours: 5, category: 'Entertainment' }
        ] 
    },
    { 
        id: 'kitchen', 
        key: 'batch_kitchen', 
        icon: 'fa-utensils',
        items: [
            { name: 'Fridge', watt: 150, hours: 24, category: 'Kitchen' },
            { name: 'Electric Kettle', watt: 1500, hours: 0.2, category: 'Kitchen' },
            { name: 'Toaster', watt: 800, hours: 0.1, category: 'Kitchen' }
        ] 
    }
];

interface MaintenanceLog {
    date: string;
    action: string;
    status: 'resolved' | 'pending';
}

interface Device {
    id: number;
    name: string;
    watt: number;
    hours: number;
    category: string;
    status: string;
    pf: number;
    logs: MaintenanceLog[];
}

interface DashboardProps {
    isDarkMode: boolean;
    onToggleTheme: () => void;
    onLogout: () => void;
}

const TOU_ON_PEAK_RATE = 5.8;
const TOU_OFF_PEAK_RATE = 2.6;

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, onToggleTheme, onLogout }) => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [lang, setLang] = useState<'th' | 'en'>('th');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
    const [calcMode, setCalcMode] = useState<'hours' | 'budget'>('hours');
    const [calcTab, setCalcTab] = useState<'detailed' | 'batch' | 'tariff'>('detailed');
    const [statsFrame, setStatsFrame] = useState<'daily' | 'monthly'>('daily');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAiScanning, setIsAiScanning] = useState(false);
    const [aiAlerts, setAiAlerts] = useState<any[]>([]);

    // System Config
    const [calcDays, setCalcDays] = useState(30);
    const [unitRate, setUnitRate] = useState(4.5);
    const [globalBudget, setGlobalBudget] = useState(3500);
    const [onPeakShare, setOnPeakShare] = useState(60); // Percentage of usage during on-peak hours

    // Initial Data
    const [multiDevices, setMultiDevices] = useState<Device[]>([
        { id: 1, name: 'Air Conditioner', watt: 1200, hours: 8, category: 'Cooling', status: 'active', pf: 0.94, logs: [ { date: '2025-01-10', action: 'Refrigerant Top-up', status: 'resolved' }, { date: '2025-02-05', action: 'Filter Cleaning', status: 'pending' } ] },
        { id: 2, name: 'Smart Fridge', watt: 150, hours: 24, category: 'Kitchen', status: 'active', pf: 0.91, logs: [ { date: '2024-12-20', action: 'Door Seal Check', status: 'resolved' } ] },
        { id: 3, name: 'Water Heater', watt: 2000, hours: 1, category: 'Bathroom', status: 'standby', pf: 0.98, logs: [ { date: '2025-01-15', action: 'Heating Element Test', status: 'resolved' } ] },
        { id: 4, name: 'Cinema Display', watt: 180, hours: 6, category: 'Entertainment', status: 'active', pf: 0.95, logs: [ { date: '2025-02-01', action: 'Brightness Calibration', status: 'resolved' } ] },
        { id: 5, name: 'Gaming Rig', watt: 450, hours: 4, category: 'Entertainment', status: 'standby', pf: 0.89, logs: [ { date: '2025-01-22', action: 'Thermal Paste Re-apply', status: 'resolved' } ] },
    ]);

    const t = (key: string) => (langData[lang] as any)[key] || key;

    // Computed Analytics
    const analytics = useMemo(() => {
        let totalUnits = 0;
        multiDevices.forEach(d => totalUnits += (d.watt / 1000) * d.hours * calcDays);
        const totalCost = totalUnits * unitRate;
        const burnRate = totalCost / calcDays;
        const budgetRemaining = globalBudget - totalCost;
        
        // Detailed TOU Logic
        const onPeakUnits = totalUnits * (onPeakShare / 100);
        const offPeakUnits = totalUnits * ((100 - onPeakShare) / 100);
        const onPeakCost = onPeakUnits * TOU_ON_PEAK_RATE;
        const offPeakCost = offPeakUnits * TOU_OFF_PEAK_RATE;
        const touCost = onPeakCost + offPeakCost;
        const touSavings = totalCost - touCost;

        return { 
            totalUnits, 
            totalCost, 
            burnRate, 
            budgetRemaining, 
            touCost, 
            onPeakUnits, 
            offPeakUnits, 
            onPeakCost, 
            offPeakCost,
            touSavings
        };
    }, [multiDevices, calcDays, unitRate, globalBudget, onPeakShare]);

    const pieData = useMemo(() => {
        const groups = multiDevices.reduce((acc, dev) => {
            const val = (dev.watt / 1000) * dev.hours * calcDays;
            acc[dev.category] = (acc[dev.category] || 0) + val;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(groups).map(([name, value]) => ({ name, value: +(value as number).toFixed(2) }));
    }, [multiDevices, calcDays]);

    const filteredDevices = useMemo(() => {
        return multiDevices.filter(d => 
            (activeCategory === 'All' || d.category === activeCategory) &&
            d.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [multiDevices, activeCategory, searchTerm]);

    const chartData = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
        name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        usage: +(analytics.totalUnits / 30 + (Math.random() * 2 - 1)).toFixed(2),
        cost: +(analytics.totalCost / 30 + (Math.random() * 10 - 5)).toFixed(1)
    })), [analytics]);

    const deviceSpecificChartData = useMemo(() => {
        if (!selectedDeviceId) return [];
        const dev = multiDevices.find(d => d.id === selectedDeviceId);
        if (!dev) return [];
        return Array.from({ length: 12 }, (_, i) => ({
            hour: `${i * 2}:00`,
            load: +(dev.watt * (0.5 + Math.random() * 0.5)).toFixed(0)
        }));
    }, [selectedDeviceId, multiDevices]);

    const updateDevice = (id: number, field: string, value: any) => {
        setMultiDevices(multiDevices.map(d => d.id === id ? { ...d, [field]: value } : d));
    };

    const addDevice = () => {
        const id = Date.now();
        setMultiDevices([...multiDevices, { id, name: 'New Sensor', watt: 100, hours: 1, category: 'Misc', status: 'standby', pf: 0.95, logs: [] }]);
        setSelectedDeviceId(id);
    };

    const addApplianceFromLibrary = (libItem: any) => {
        const id = Date.now();
        setMultiDevices([...multiDevices, { ...libItem, id, status: 'active', pf: 0.95, logs: [] }]);
    };

    const addPresetSet = (set: any) => {
        const newItems = set.items.map((item: any, idx: number) => ({
            ...item,
            id: Date.now() + idx,
            status: 'active',
            pf: 0.95,
            logs: []
        }));
        setMultiDevices([...multiDevices, ...newItems]);
    };

    const removeDevice = (id: number) => {
        setMultiDevices(multiDevices.filter(d => d.id !== id));
        setSelectedDeviceId(null);
    };

    const navigateTo = (pageId: string) => {
        setCurrentPage(pageId);
        setSelectedDeviceId(null);
        setIsMobileMenuOpen(false); // Auto-close on selection
    };

    const runAiAnomalyScan = async () => {
        if (isAiScanning) return;
        setIsAiScanning(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Analyze the following energy grid data for anomalies, malfunctions, or security threats. 
            Devices: ${JSON.stringify(multiDevices.map(d => ({ name: d.name, load: d.watt, category: d.category })))}
            7-Day History: ${JSON.stringify(chartData)}
            
            Identify potential equipment faults (e.g. erratic compressor), unusual spikes, or power-based security signatures (like cryptojacking).
            Return a JSON array of maximum 2 anomalies. Each anomaly object must have:
            - title (string, e.g. "Critical Fault Detected")
            - description (string, concise details)
            - severity (string, "danger" or "warning")
            - icon (string, FontAwesome class like "fa-microchip")`;

            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                description: { type: Type.STRING },
                                severity: { type: Type.STRING },
                                icon: { type: Type.STRING }
                            },
                            required: ["title", "description", "severity", "icon"]
                        }
                    }
                }
            });

            const results = JSON.parse(response.text || "[]");
            const newAlerts = results.map((r: any) => ({
                ...r,
                isAi: true,
                time: 'Just now'
            }));
            setAiAlerts([...newAlerts, ...aiAlerts]);
        } catch (error) {
            console.error("AI Scan failed", error);
        } finally {
            setIsAiScanning(false);
        }
    };

    const touChartData = [
        { name: '00', val: TOU_OFF_PEAK_RATE }, { name: '03', val: TOU_OFF_PEAK_RATE }, { name: '06', val: TOU_OFF_PEAK_RATE }, { name: '09', val: TOU_ON_PEAK_RATE },
        { name: '12', val: TOU_ON_PEAK_RATE }, { name: '15', val: TOU_ON_PEAK_RATE }, { name: '18', val: TOU_ON_PEAK_RATE }, { name: '21', val: TOU_ON_PEAK_RATE },
        { name: '22', val: TOU_OFF_PEAK_RATE }, { name: '23', val: TOU_OFF_PEAK_RATE }
    ];

    const baseAlerts = [
        { t: t('alert_spike_title'), d: t('alert_spike_desc'), c: 'danger', i: 'fa-bolt', time: '5m ago', isAi: false },
        { t: t('alert_update_title'), d: t('alert_update_desc'), c: 'info', i: 'fa-sync', time: '2h ago', isAi: false },
        { t: t('alert_budget_title'), d: t('alert_budget_desc'), c: 'warning', i: 'fa-exclamation-triangle', time: '1d ago', isAi: false },
    ];

    const currentAlerts = [...aiAlerts.map(a => ({ t: a.title, d: a.description, c: a.severity, i: a.icon, time: a.time, isAi: true })), ...baseAlerts];

    return (
        <div className="dashboard-container" data-theme={isDarkMode ? 'dark' : 'light'}>
            {/* Sidebar Overlay for Mobile */}
            <div className={`sidebar-overlay ${isMobileMenuOpen ? 'show' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />

            <aside className={`sidebar flex flex-col justify-between ${isMobileMenuOpen ? 'show' : ''}`}>
                <div>
                    <div className="mb-8 ps-2 flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                               <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg"><i className="fas fa-bolt"></i></div>
                               <h4 className="font-bold text-primary mb-0 font-display text-xl tracking-tight">EduEase</h4>
                            </div>
                            <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{t('sys_sub_title')}</span>
                        </div>
                        <button className="btn d-lg-none text-muted" onClick={() => setIsMobileMenuOpen(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <nav className="space-y-1">
                        {navItems.map(item => (
                            <button key={item.id} className={`nav-link ${currentPage === item.id ? 'active' : ''}`} onClick={() => navigateTo(item.id)}>
                                <i className={item.icon}></i> <span className="text-[13px]">{t(item.key)}</span>
                            </button>
                        ))}
                    </nav>
                </div>
                <button onClick={onLogout} className="nav-link text-danger border-0 bg-transparent w-full text-start flex items-center gap-2 mt-auto p-4 hover:bg-danger/10">
                    <i className="fas fa-power-off"></i> <span className="text-xs font-bold uppercase tracking-widest">{t('logout')}</span>
                </button>
            </aside>

            <main className="main-content-dashboard">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div className="flex items-center gap-3">
                        <button className="btn btn-white d-lg-none shadow-sm rounded-xl p-3 border-0 bg-white" onClick={() => setIsMobileMenuOpen(true)}>
                            <i className="fas fa-bars text-primary"></i>
                        </button>
                        <div>
                            <h2 className="font-bold mb-0 font-display text-2xl md:text-3xl tracking-tight">{t(navItems.find(n => n.id === currentPage)?.key || 'm1')}</h2>
                            <p className="text-muted text-[10px] font-bold uppercase tracking-[0.2em]">{isDarkMode ? t('terminal') : t('global_access')}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <div className="flex items-center gap-2 px-3 py-2 bg-light rounded-2xl border shadow-sm whitespace-nowrap">
                            <span className="neural-pulse"></span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-muted">{t('db_health')}</span>
                        </div>
                        <button className="btn btn-white border-0 rounded-2xl px-4 shadow-sm font-bold text-xs text-primary bg-white h-[42px]" onClick={() => setLang(lang === 'th' ? 'en' : 'th')}>{lang.toUpperCase()}</button>
                        <button className="btn btn-white border-0 rounded-2xl shadow-sm px-3 bg-white h-[42px]" onClick={onToggleTheme}>
                            <i className={`fas ${isDarkMode ? 'fa-sun text-warning' : 'fa-moon text-primary'}`}></i>
                        </button>
                    </div>
                </header>

                <div className="page-content">
                    
                    {currentPage === 'dashboard' && (
                        <div className="animate-fade-in">
                            <div className="row g-3 g-md-4 mb-8">
                                {[
                                    { label: t('stat_est_monthly'), val: `฿${analytics.totalCost.toLocaleString()}`, icon: 'fa-coins', color: 'text-primary' },
                                    { label: t('stat_burn_daily'), val: `฿${analytics.burnRate.toFixed(1)}`, icon: 'fa-fire', color: 'text-amber-500' },
                                    { label: t('stat_total_load'), val: `${analytics.totalUnits.toFixed(1)} kWh`, icon: 'fa-bolt', color: 'text-emerald-500' },
                                    { label: t('stat_credit_health'), val: analytics.budgetRemaining > 0 ? t('stat_optimal') : t('stat_deficit'), icon: 'fa-shield-alt', color: analytics.budgetRemaining > 0 ? 'text-emerald-500' : 'text-danger' }
                                ].map((stat, i) => (
                                    <div key={i} className="col-12 col-sm-6 col-xl-3 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                                        <div className="dashboard-card border-0 p-4 p-md-5">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="label text-[10px]">{stat.label}</span>
                                                <i className={`fas ${stat.icon} ${stat.color} opacity-40`}></i>
                                            </div>
                                            <span className={`text-xl md:text-2xl font-display font-bold ${stat.color} mono-font`}>{stat.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row g-4">
                                <div className="col-12 col-xl-8">
                                    <div className="dashboard-card border-0 p-4 p-md-6 h-100">
                                        <h5 className="font-bold mb-6 font-display text-lg">{t('chart_telemetry_title')}</h5>
                                        <div className="h-[250px] md:h-[300px]">
                                            <ResponsiveContainer>
                                                <AreaChart data={chartData}>
                                                    <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1b254b' : '#eee'} />
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                                    <Tooltip />
                                                    <Area type="monotone" dataKey="usage" stroke="var(--primary)" strokeWidth={3} fill="url(#g1)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-4">
                                    <div className="dashboard-card border-0 p-6 h-100 bg-primary text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-10 opacity-10"><i className="fas fa-brain text-[150px]"></i></div>
                                        <h5 className="font-bold mb-4 font-display text-lg relative z-10">{t('ai_scan_title')}</h5>
                                        <p className="text-xs opacity-80 leading-relaxed mb-6 relative z-10">{t('ai_scan_desc')}</p>
                                        <button className="btn btn-white w-100 rounded-2xl py-3 font-bold text-[10px] uppercase tracking-widest text-primary relative z-10">{t('ai_apply')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentPage === 'devices' && (
                        <div className="animate-fade-in relative">
                            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 mb-6">
                                <div className="flex gap-2 items-center flex-grow max-w-xl">
                                    <div className="relative flex-grow">
                                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-muted text-xs"></i>
                                        <input type="text" className="form-control border-0 bg-light rounded-2xl ps-10 py-3 text-sm font-bold" placeholder={t('search')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                                    </div>
                                    <select className="form-select border-0 bg-light rounded-2xl py-3 text-xs font-bold w-32" value={activeCategory} onChange={e => setActiveCategory(e.target.value)}>
                                        <option value="All">{t('filter')}</option>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <button className="btn btn-primary rounded-2xl px-6 py-3 font-bold text-xs uppercase shadow-lg shadow-primary/20" onClick={addDevice}><i className="fas fa-plus me-2"></i> Node</button>
                            </div>
                            
                            <div className="row g-3 g-md-4">
                                {filteredDevices.map((dev, i) => (
                                    <div key={dev.id} className="col-12 col-md-6 col-lg-4 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                                        <div onClick={() => setSelectedDeviceId(dev.id)} className="dashboard-card border-0 p-5 cursor-pointer hover:shadow-xl transition-all group relative overflow-hidden">
                                            <div className={`absolute top-0 right-0 p-3 text-[8px] font-bold uppercase tracking-widest ${dev.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'} text-white`}>{dev.status}</div>
                                            <div className="p-3 bg-primary-subtle text-primary rounded-2xl w-fit mb-4 group-hover:bg-primary group-hover:text-white transition-all"><i className={`fas ${dev.category === 'Cooling' ? 'fa-snowflake' : 'fa-plug'} text-lg`}></i></div>
                                            <h6 className="font-bold text-lg mb-1">{dev.name}</h6>
                                            <p className="label text-[9px] mb-4 opacity-60">{dev.category}</p>
                                            <div className="flex justify-between items-end border-top border-light pt-4">
                                                <div className="mono-font font-bold text-primary">฿{((dev.watt/1000)*dev.hours*calcDays*unitRate).toFixed(0)}</div>
                                                <div className="text-[10px] text-muted font-bold">{dev.watt}W</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedDeviceId && (
                                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex justify-end">
                                    <div className="w-full max-w-xl bg-body h-full shadow-2xl p-6 md:p-10 animate-slide-left overflow-y-auto">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="font-display font-bold text-xl md:text-2xl">{t('node_config_title')}</h3>
                                            <button className="btn btn-light rounded-2xl p-3" onClick={() => setSelectedDeviceId(null)}><i className="fas fa-times"></i></button>
                                        </div>
                                        {multiDevices.find(d => d.id === selectedDeviceId) && (() => {
                                            const d = multiDevices.find(d => d.id === selectedDeviceId)!;
                                            return (
                                                <div className="space-y-8">
                                                    <div className="row g-4">
                                                        <div className="col-md-7">
                                                            <div className="p-5 bg-primary/5 rounded-[2rem] border border-primary/10">
                                                                <label className="label text-[10px] block mb-3">{t('node_id')}: {d.id}</label>
                                                                <input type="text" className="form-control text-xl font-bold border-0 bg-transparent p-0 mb-4" value={d.name} onChange={e => updateDevice(d.id, 'name', e.target.value)} />
                                                                
                                                                <div className="row g-3">
                                                                    <div className="col-6">
                                                                        <label className="label text-[10px] block mb-2">{t('node_watt')}</label>
                                                                        <input type="number" className="form-control border-2 rounded-2xl p-3 font-bold mono-font" value={d.watt} onChange={e => updateDevice(d.id, 'watt', +e.target.value)} />
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <label className="label text-[10px] block mb-2">{t('node_hours')}</label>
                                                                        <input type="number" className="form-control border-2 rounded-2xl p-3 font-bold mono-font" value={d.hours} onChange={e => updateDevice(d.id, 'hours', +e.target.value)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="p-5 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/10 h-100">
                                                                <h6 className="label text-[10px] mb-4">{t('node_tech_specs')}</h6>
                                                                <div className="mb-4">
                                                                    <span className="text-[10px] font-bold text-muted uppercase block mb-1">{t('node_pf')}</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="text-2xl font-bold text-emerald-500 mono-font">{d.pf}</div>
                                                                        <div className="badge bg-emerald-500/10 text-emerald-500 text-[8px] px-2 py-1 rounded-full uppercase">Optimal</div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <span className="text-[10px] font-bold text-muted uppercase block mb-1">Grid Compliance</span>
                                                                    <div className="text-xs font-bold text-main">Phase A: 228.4V</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="p-6 bg-light rounded-[2.5rem]">
                                                        <h6 className="label text-[10px] mb-6">{t('node_history_title')}</h6>
                                                        <div className="h-[200px]">
                                                            <ResponsiveContainer>
                                                                <AreaChart data={deviceSpecificChartData}>
                                                                    <defs><linearGradient id="dColor" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>
                                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                                                                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fontSize: 9}} />
                                                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9}} />
                                                                    <Tooltip />
                                                                    <Area type="monotone" dataKey="load" stroke="var(--primary)" strokeWidth={3} fill="url(#dColor)" />
                                                                </AreaChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </div>

                                                    <div className="p-6 bg-white border rounded-[2.5rem] shadow-sm">
                                                        <h6 className="label text-[10px] mb-6">{t('node_maintenance')}</h6>
                                                        <div className="space-y-4">
                                                            {d.logs.length > 0 ? d.logs.map((log, li) => (
                                                                <div key={li} className="flex justify-between items-center p-3 bg-light rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                                                                    <div>
                                                                        <div className="text-[11px] font-bold text-main mb-1">{log.action}</div>
                                                                        <div className="text-[9px] font-bold text-muted uppercase tracking-widest">{log.date}</div>
                                                                    </div>
                                                                    <div className={`badge rounded-full px-3 py-1.5 text-[8px] font-bold uppercase ${log.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                                        {log.status === 'resolved' ? t('node_log_resolved') : t('node_log_pending')}
                                                                    </div>
                                                                </div>
                                                            )) : (
                                                                <div className="text-center py-6 italic text-muted text-xs opacity-50">No logs on record.</div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="pt-6 flex flex-col sm:flex-row gap-3">
                                                        <button className="btn btn-primary flex-grow rounded-[1.5rem] py-4 font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20" onClick={() => setSelectedDeviceId(null)}>{t('node_auth')}</button>
                                                        <button className="btn btn-outline-danger rounded-[1.5rem] py-4 sm:px-6" onClick={() => removeDevice(d.id)}><i className="fas fa-trash"></i></button>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {currentPage === 'calculator' && (
                        <div className="animate-fade-in tech-grid p-4 md:p-6 rounded-[30px] md:rounded-[40px]">
                            <div className="row g-4 md:g-5">
                                <div className="col-12 col-xl-7">
                                    <div className="dashboard-card border-0 p-4 md:p-6 mb-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                            <h5 className="font-display font-bold text-lg md:text-xl"><i className="fas fa-microchip text-primary me-3"></i>{t('calc_planner_title')}</h5>
                                            <div className="p-1 bg-light rounded-2xl flex w-full sm:w-auto">
                                                <button className={`btn btn-xs flex-grow sm:flex-none px-4 rounded-xl font-bold ${calcMode === 'hours' ? 'btn-primary shadow-lg' : 'text-muted'}`} onClick={() => setCalcMode('hours')}>{t('calc_mode_hour').toUpperCase()}</button>
                                                <button className={`btn btn-xs flex-grow sm:flex-none px-4 rounded-xl font-bold ${calcMode === 'budget' ? 'btn-primary shadow-lg' : 'text-muted'}`} onClick={() => setCalcMode('budget')}>{t('calc_mode_budget').toUpperCase()}</button>
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-12 col-md-6"><label className="label text-[10px] mb-2 block">{t('calc_rate')}</label><div className="flex items-center p-3 md:p-4 bg-light rounded-3xl"><i className="fas fa-tag text-primary opacity-40 me-3"></i><input type="number" className="form-control border-0 bg-transparent p-0 font-bold text-xl md:text-2xl mono-font" value={unitRate} onChange={e => setUnitRate(+e.target.value)} /></div></div>
                                            <div className="col-12 col-md-6"><label className="label text-[10px] mb-2 block">{t('calc_days')}</label><div className="flex items-center p-3 md:p-4 bg-light rounded-3xl"><i className="fas fa-history text-primary opacity-40 me-3"></i><input type="number" className="form-control border-0 bg-transparent p-0 font-bold text-xl md:text-2xl mono-font" value={calcDays} onChange={e => setCalcDays(+e.target.value)} /></div></div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mb-6 border-bottom border-light pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                                        <button className={`text-[10px] md:text-xs font-bold uppercase tracking-widest pb-2 transition-all ${calcTab === 'detailed' ? 'text-primary border-bottom-2 border-primary' : 'text-muted opacity-50'}`} onClick={() => setCalcTab('detailed')}>{t('calc_detailed')}</button>
                                        <button className={`text-[10px] md:text-xs font-bold uppercase tracking-widest pb-2 transition-all ${calcTab === 'batch' ? 'text-primary border-bottom-2 border-primary' : 'text-muted opacity-50'}`} onClick={() => setCalcTab('batch')}>{t('calc_batch')}</button>
                                        <button className={`text-[10px] md:text-xs font-bold uppercase tracking-widest pb-2 transition-all ${calcTab === 'tariff' ? 'text-primary border-bottom-2 border-primary' : 'text-muted opacity-50'}`} onClick={() => setCalcTab('tariff')}>{t('calc_tariff')}</button>
                                    </div>

                                    {calcTab === 'detailed' && (
                                        <div className="space-y-4 animate-fade-in">
                                            {multiDevices.map((dev, i) => (
                                                <div key={dev.id} className="calculator-node p-4 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                                                    <div className="row g-3 align-items-center">
                                                        <div className="col-12 col-md-4"><div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary"></div><div className="flex-grow"><input type="text" className="form-control border-0 bg-transparent font-bold p-0 text-sm" value={dev.name} onChange={e => updateDevice(dev.id, 'name', e.target.value)} /></div></div></div>
                                                        <div className="col-5 col-md-3"><label className="text-[8px] font-bold text-muted block uppercase">{t('node_watt').split(' ')[0]}</label><input type="number" className="form-control bg-light border-0 rounded-xl py-1 px-3 font-bold mono-font text-xs" value={dev.watt} onChange={e => updateDevice(dev.id, 'watt', +e.target.value)} /></div>
                                                        <div className="col-5 col-md-3"><label className="text-[8px] font-bold text-muted block uppercase">{t('node_hours').split(' ')[0]}</label><input type="number" className="form-control bg-light border-0 rounded-xl py-1 px-3 font-bold mono-font text-xs" value={dev.hours} onChange={e => updateDevice(dev.id, 'hours', +e.target.value)} /></div>
                                                        <div className="col-2 col-md-2 text-end"><button className="btn btn-outline-danger border-0 p-2" onClick={() => removeDevice(dev.id)}><i className="fas fa-trash-alt text-xs"></i></button></div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button className="btn btn-white w-100 py-3 rounded-[24px] border-2 border-dashed border-primary/20 text-primary font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-primary/5 mt-4" onClick={addDevice}><i className="fas fa-plus-circle me-2"></i> {t('add')}</button>
                                        </div>
                                    )}

                                    {calcTab === 'batch' && (
                                        <div className="space-y-8 animate-fade-in">
                                            <div>
                                                <h6 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-4">{t('batch_presets')}</h6>
                                                <div className="row g-3">
                                                    {PRESET_SETS.map(set => (
                                                        <div key={set.id} className="col-12 col-md-6">
                                                            <div className="dashboard-card border-0 p-4 bg-light hover:shadow-md transition-all group flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="p-3 bg-white rounded-2xl text-primary"><i className={`fas ${set.icon}`}></i></div>
                                                                    <div>
                                                                        <div className="font-bold text-xs">{t(set.key)}</div>
                                                                        <div className="text-[9px] text-muted">{set.items.length} nodes</div>
                                                                    </div>
                                                                </div>
                                                                <button onClick={() => addPresetSet(set)} className="btn btn-primary btn-xs rounded-xl font-bold uppercase tracking-tighter text-[8px]">{t('batch_add_set')}</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h6 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-4">{t('batch_library')}</h6>
                                                <div className="row g-3">
                                                    {APPLIANCE_LIBRARY.map((item, i) => (
                                                        <div key={i} className="col-6 col-sm-4">
                                                            <div onClick={() => addApplianceFromLibrary(item)} className="p-3 md:p-4 bg-white border border-light rounded-3xl text-center cursor-pointer hover:border-primary hover:shadow-lg transition-all h-100 flex flex-col justify-center">
                                                                <div className="p-2 bg-primary/5 text-primary rounded-xl w-fit mx-auto mb-3"><i className={`fas ${item.icon} text-base md:text-lg`}></i></div>
                                                                <div className="font-bold text-[10px] md:text-[11px] mb-1 leading-tight">{item.name}</div>
                                                                <div className="text-[8px] md:text-[9px] text-muted mono-font">{item.watt}W | {item.hours}h</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {calcTab === 'tariff' && (
                                        <div className="animate-fade-in space-y-6">
                                            <div className="dashboard-card border-0 p-4 md:p-6 bg-light">
                                                <h6 className="font-display font-bold text-lg mb-4 text-primary">{t('tou_title')}</h6>
                                                <div className="row g-3 md:g-4 mb-6">
                                                    <div className="col-12 col-md-6">
                                                        <div className="p-4 bg-white rounded-[2rem] border-2 border-danger/10 shadow-sm h-100">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <div className="p-2 bg-danger/10 text-danger rounded-xl"><i className="fas fa-sun text-sm"></i></div>
                                                                <span className="font-bold text-xs">{t('tou_peak')} (฿{TOU_ON_PEAK_RATE})</span>
                                                            </div>
                                                            <p className="text-[10px] text-muted leading-relaxed mb-0">{t('tou_peak_desc')}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <div className="p-4 bg-white rounded-[2rem] border-2 border-emerald-500/10 shadow-sm h-100">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl"><i className="fas fa-moon text-sm"></i></div>
                                                                <span className="font-bold text-xs">{t('tou_off')} (฿{TOU_OFF_PEAK_RATE})</span>
                                                            </div>
                                                            <p className="text-[10px] text-muted leading-relaxed mb-0">{t('tou_off_desc')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="h-[200px] mb-4">
                                                    <ResponsiveContainer>
                                                        <LineChart data={touChartData}>
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9}} />
                                                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9}} />
                                                            <Tooltip />
                                                            <Line type="stepAfter" dataKey="val" stroke="var(--primary)" strokeWidth={3} dot={false} />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                                
                                                <div className="mt-8 p-5 bg-white rounded-[2rem] shadow-sm border border-primary/10">
                                                    <div className="flex justify-between mb-4">
                                                        <h6 className="label text-[10px]">{t('calc_tou_breakdown')}</h6>
                                                        <span className="text-[10px] font-bold text-primary">{onPeakShare}% On-Peak</span>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-xs font-bold text-muted">{t('tou_peak')}</span>
                                                                <span className="text-xs font-bold mono-font">฿{analytics.onPeakCost.toLocaleString(undefined, {maximumFractionDigits: 1})}</span>
                                                            </div>
                                                            <div className="progress h-1.5 rounded-full bg-light">
                                                                <div className="progress-bar bg-danger" style={{width: `${onPeakShare}%`}}></div>
                                                            </div>
                                                            <div className="text-[9px] text-muted mt-1">{analytics.onPeakUnits.toFixed(1)} kWh</div>
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-xs font-bold text-muted">{t('tou_off')}</span>
                                                                <span className="text-xs font-bold mono-font">฿{analytics.offPeakCost.toLocaleString(undefined, {maximumFractionDigits: 1})}</span>
                                                            </div>
                                                            <div className="progress h-1.5 rounded-full bg-light">
                                                                <div className="progress-bar bg-emerald-500" style={{width: `${100 - onPeakShare}%`}}></div>
                                                            </div>
                                                            <div className="text-[9px] text-muted mt-1">{analytics.offPeakUnits.toFixed(1)} kWh</div>
                                                        </div>
                                                        
                                                        <div className="pt-4 border-top border-light flex justify-between items-center">
                                                            <span className="text-xs font-bold text-main">Total TOU Estimated</span>
                                                            <span className="text-lg font-bold text-primary mono-font">฿{analytics.touCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-[10px] md:text-[11px] italic text-center opacity-70 mt-6 mb-0">"{t('tou_desc')}"</p>
                                            </div>

                                            <div className="dashboard-card border-0 p-4 md:p-6 bg-primary/5">
                                                <h6 className="font-display font-bold text-lg mb-3">{t('progressive_title')}</h6>
                                                <p className="text-xs text-muted mb-4 leading-relaxed">{t('progressive_desc')}</p>
                                                <div className="space-y-3">
                                                    {[
                                                        { tier: 1, range: '0-15', rate: '2.34', w: '20' },
                                                        { tier: 2, range: '16-25', rate: '2.98', w: '40' },
                                                        { tier: 3, range: '400+', rate: '4.42', w: '100' }
                                                    ].map((tRow, i) => (
                                                        <div key={i}>
                                                            <div className="flex justify-between text-[10px] font-bold mb-1">
                                                                <span className="text-muted">{t('progressive_tier')} {tRow.tier}: {tRow.range} Units</span>
                                                                <span className="text-primary">฿{tRow.rate}</span>
                                                            </div>
                                                            <div className="progress h-1 rounded-full bg-white/20"><div className={`progress-bar bg-primary w-[${tRow.w}%]`} style={{ width: `${tRow.w}%` }}></div></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="col-12 col-xl-5">
                                    <div className="hologram-card h-100 p-6 md:p-8 flex flex-col justify-center animate-slide-up">
                                        <div className="mb-auto text-center">
                                            <span className="badge bg-white/20 px-4 py-2 rounded-full text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase mb-4">Neural Data Projection</span>
                                            <h4 className="font-display font-bold text-white text-lg md:text-xl">Power Projection Model</h4>
                                        </div>
                                        
                                        <div className="p-4 bg-white/10 rounded-[2rem] border border-white/20 mb-8 mt-4">
                                            <div className="flex justify-between mb-2">
                                                <label className="text-[9px] font-bold uppercase text-white/60">{t('calc_on_peak_share')}</label>
                                                <span className="text-xs font-bold text-white mono-font">{onPeakShare}%</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                className="form-range custom-range-slider" 
                                                min="0" 
                                                max="100" 
                                                step="5"
                                                value={onPeakShare} 
                                                onChange={e => setOnPeakShare(+e.target.value)} 
                                            />
                                        </div>

                                        <div className="text-center mb-8">
                                            {calcMode === 'hours' ? (
                                                <div className="animate-fade-in">
                                                    <span className="text-white/40 text-[9px] md:text-[10px] block mb-2 uppercase font-bold">{t('calc_est_cost')}</span>
                                                    <h1 className="text-white font-display text-6xl md:text-8xl font-bold mono-font neon-glow mb-4">฿{analytics.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h1>
                                                    
                                                    <div className="mt-6 p-4 md:p-5 bg-white/10 border border-white/20 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-all">
                                                        <div className="text-start">
                                                            <div className="text-emerald-400 text-[8px] uppercase font-bold mb-1">{t('calc_sim_tou')}</div>
                                                            <div className="text-white font-bold text-xl md:text-2xl mono-font">฿{analytics.touCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                                        </div>
                                                        <div className="text-end">
                                                            <div className="text-white/40 text-[8px] uppercase font-bold mb-1">{t('calc_grid_saving')}</div>
                                                            <div className={`font-bold text-sm md:text-md ${analytics.touSavings > 0 ? 'text-emerald-400' : 'text-danger'}`}>
                                                                {analytics.touSavings > 0 ? '-' : '+'}
                                                                {Math.abs(((analytics.touSavings / analytics.totalCost) * 100)).toFixed(0)}%
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {analytics.touSavings > 0 && (
                                                        <div className="mt-4 animate-fade-in p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/30">
                                                            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{t('calc_savings_vs_std')}</div>
                                                            <div className="text-white text-xl font-bold mono-font">฿{analytics.touSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="animate-fade-in"><span className="text-white/40 text-[10px] block mb-4 uppercase font-bold">{t('budget_modify')}</span><input type="number" className="form-control bg-transparent border-2 border-white/20 text-white text-center font-bold text-5xl md:text-7xl py-2 rounded-3xl mb-8 mono-font focus:border-white/50" value={globalBudget} onChange={e => setGlobalBudget(+e.target.value)} /><div className="flex flex-col items-center"><h1 className="text-white font-display text-7xl md:text-9xl font-bold neon-glow mono-font">{analytics.burnRate > 0 ? Math.floor(globalBudget / analytics.burnRate) : '∞'}</h1><span className="text-[10px] md:text-sm font-bold opacity-60 uppercase tracking-[0.4em] text-white">Grid Days Remaining</span></div></div>
                                            )}
                                        </div>
                                        <div className="mt-auto pt-6 border-top border-white/10 flex justify-between">
                                            <div className="text-start"><span className="text-white/40 text-[8px] block font-bold uppercase">{t('calc_daily_cost')}</span><div className="text-white font-bold mono-font text-sm">฿{analytics.burnRate.toFixed(2)}</div></div>
                                            <div className="text-end"><span className="text-white/40 text-[8px] block font-bold uppercase">{t('calc_node_avg')}</span><div className="text-white font-bold mono-font text-sm">฿{(analytics.totalCost / multiDevices.length).toFixed(0)}</div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentPage === 'budget' && (
                        <div className="animate-fade-in">
                            <div className="row g-4 md:g-5">
                                <div className="col-12 col-xl-5">
                                    <div className="dashboard-card border-0 p-6 md:p-8 h-100 text-center shadow-lg animate-slide-up">
                                        <h5 className="font-display font-bold text-xl md:text-2xl mb-8">{t('budget_limit_title')}</h5>
                                        <div className="mb-10">
                                            <label className="label text-[10px] mb-3 block">{t('budget_modify')}</label>
                                            <input type="number" className="form-control border-2 rounded-3xl font-bold text-primary text-4xl md:text-5xl py-4 text-center mono-font" value={globalBudget} onChange={e => setGlobalBudget(+e.target.value)} />
                                        </div>
                                        <div className={`p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-2xl transition-all ${analytics.budgetRemaining > 0 ? 'bg-primary text-white' : 'bg-danger text-white'}`}>
                                            <span className="text-white/40 text-[9px] uppercase font-bold tracking-widest block mb-2">{t('budget_remainder')}</span>
                                            <h2 className="text-4xl md:text-6xl font-display font-bold mono-font">฿{analytics.budgetRemaining.toLocaleString()}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-7">
                                    <div className="dashboard-card border-0 p-6 md:p-8 h-100 animate-slide-up" style={{ animationDelay: '150ms' }}>
                                        <h5 className="font-display font-bold text-xl md:text-2xl mb-8">{t('budget_priority')}</h5>
                                        <div className="space-y-4 md:space-y-6">
                                            {multiDevices.map((dev, i) => {
                                                const devCost = (dev.watt / 1000) * dev.hours * calcDays * unitRate;
                                                const pct = (devCost / globalBudget) * 100;
                                                return (
                                                    <div key={dev.id} className="p-4 md:p-5 border-2 border-light rounded-3xl bg-light transition-all hover:bg-body">
                                                        <div className="flex justify-between items-center mb-3">
                                                            <div className="flex items-center gap-3 md:gap-4">
                                                                <div className="p-2 bg-primary-subtle text-primary rounded-xl d-none d-sm-block"><i className={`fas ${dev.category === 'Cooling' ? 'fa-snowflake' : 'fa-plug'} text-xs`}></i></div>
                                                                <span className="font-bold text-xs md:text-sm tracking-tight">{dev.name}</span>
                                                            </div>
                                                            <div className="font-bold text-primary mono-font text-base md:text-lg">฿{devCost.toLocaleString()}</div>
                                                        </div>
                                                        <div className="progress rounded-pill" style={{ height: '8px' }}>
                                                            <div className={`progress-bar ${pct > 40 ? 'bg-danger shadow-lg shadow-danger/30' : 'bg-primary shadow-lg shadow-primary/30'}`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                                                        </div>
                                                        <div className="flex justify-between mt-3"><span className="text-[8px] md:text-[9px] font-bold text-muted uppercase">{t('budget_weight')}: {pct.toFixed(1)}%</span><span className="text-[8px] md:text-[9px] font-bold text-muted uppercase d-none d-sm-inline">{t('budget_health')}</span></div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentPage === 'stats' && (
                        <div className="animate-fade-in">
                            <div className="dashboard-card border-0 p-4 md:p-8 mb-8 shadow-xl animate-slide-up">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                                    <h4 className="font-display font-bold text-lg md:text-2xl tracking-tight">{t('telemetry_active_load')}</h4>
                                    <div className="p-1 bg-light rounded-2xl flex gap-1 w-full sm:w-auto">
                                        <button className={`btn btn-xs flex-grow sm:flex-none px-4 rounded-xl font-bold ${statsFrame === 'daily' ? 'btn-primary shadow-lg' : 'text-muted'}`} onClick={() => setStatsFrame('daily')}>{t('telemetry_daily').toUpperCase()}</button>
                                        <button className={`btn btn-xs flex-grow sm:flex-none px-4 rounded-xl font-bold ${statsFrame === 'monthly' ? 'btn-primary shadow-lg' : 'text-muted'}`} onClick={() => setStatsFrame('monthly')}>{t('telemetry_monthly').toUpperCase()}</button>
                                    </div>
                                </div>
                                <div className="h-[250px] md:h-[400px]">
                                    <ResponsiveContainer>
                                        <AreaChart data={chartData}>
                                            <defs><linearGradient id="pColor" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1b254b' : '#eee'} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                            <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                                            <Area type="monotone" dataKey="usage" stroke="var(--primary)" strokeWidth={4} fill="url(#pColor)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-12 col-xl-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                                    <div className="dashboard-card border-0 p-6 md:p-8 h-100">
                                        <h6 className="font-bold font-display text-lg mb-8">{t('telemetry_dist')}</h6>
                                        <div className="h-[250px] md:h-[300px]">
                                            <ResponsiveContainer>
                                                <PieChart>
                                                    <Pie data={pieData} innerRadius={window.innerWidth < 768 ? 60 : 80} outerRadius={window.innerWidth < 768 ? 90 : 120} paddingAngle={5} dataKey="value" stroke="none">
                                                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold' }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
                                    <div className="dashboard-card border-0 p-6 md:p-8 h-100 overflow-hidden">
                                        <h6 className="font-bold font-display text-lg mb-8">{t('telemetry_logs')}</h6>
                                        <div className="table-responsive">
                                            <table className="table table-hover align-middle text-sm">
                                                <thead className="bg-light">
                                                    <tr className="label text-[9px] opacity-60">
                                                        <th>{t('log_cycle')}</th>
                                                        <th>{t('log_units')}</th>
                                                        <th className="text-end">{t('log_settlement')}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[ 
                                                        {p:'January 2025', u:412, c:1854}, 
                                                        {p:'December 2024', u:388, c:1746}, 
                                                        {p:'November 2024', u:442, c:1989} 
                                                    ].map((row, i) => (
                                                        <tr key={i}>
                                                            <td className="font-bold whitespace-nowrap">{row.p}</td>
                                                            <td className="mono-font">{row.u} kWh</td>
                                                            <td className="text-end font-bold text-primary mono-font">฿{row.c.toLocaleString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentPage === 'noti' && (
                        <div className="animate-fade-in max-w-3xl mx-auto">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <h4 className="font-display font-bold text-2xl">{t('alert_log_title')}</h4>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button 
                                        disabled={isAiScanning}
                                        onClick={runAiAnomalyScan}
                                        className={`btn flex-grow sm:flex-none rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 ${isAiScanning ? 'btn-light' : 'btn-primary shadow-lg shadow-primary/20'}`}
                                    >
                                        {isAiScanning ? (
                                            <><i className="fas fa-circle-notch animate-spin"></i> {t('alert_scanning')}</>
                                        ) : (
                                            <><i className="fas fa-brain"></i> {t('alert_ai_scan')}</>
                                        )}
                                    </button>
                                    <button className="btn btn-outline-primary border-0 font-bold text-[10px] uppercase tracking-widest">{t('alert_clear')}</button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {currentAlerts.map((n, i) => (
                                    <div key={i} className={`dashboard-card border-start border-[6px] border-${n.c} p-5 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6 animate-slide-up shadow-sm hover:translate-x-2 transition-transform cursor-pointer relative overflow-hidden`} style={{ animationDelay: `${i * 100}ms` }}>
                                        {n.isAi && (
                                            <div className="absolute top-0 right-0 p-2">
                                                <span className="badge bg-primary/10 text-primary text-[8px] font-bold uppercase tracking-widest border border-primary/20"><i className="fas fa-robot me-1"></i> AI Analysis</span>
                                            </div>
                                        )}
                                        <div className={`p-4 rounded-3xl bg-${n.c}-subtle text-${n.c} w-fit h-fit shadow-md`}><i className={`fas ${n.i} text-xl`}></i></div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h6 className="font-bold mb-0 text-base md:text-lg tracking-tight">{n.t}</h6>
                                                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{n.time}</span>
                                            </div>
                                            <p className="text-muted text-[11px] md:text-xs leading-relaxed mb-0">{n.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentPage === 'tips' && (
                        <div className="animate-fade-in">
                            <div className="row g-4 mb-10">
                                {[
                                    { t: t('tips_dynamic_ac'), d: t('tips_dynamic_ac_desc'), i: 'fa-thermometer-half', c: 'primary' },
                                    { t: t('tips_cinema'), d: t('tips_cinema_desc'), i: 'fa-tv', c: 'warning' },
                                    { t: t('tips_standby'), d: t('tips_standby_desc'), i: 'fa-power-off', c: 'info' },
                                ].map((tip, i) => (
                                    <div key={i} className="col-12 col-md-4 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                                        <div className="dashboard-card border-0 p-8 h-100 flex flex-col items-center text-center gap-6">
                                            <div className={`p-5 rounded-[2.5rem] bg-${tip.c}-subtle text-${tip.c} shadow-xl shadow-${tip.c}/10`}><i className={`fas ${tip.i} text-3xl`}></i></div>
                                            <h6 className="font-bold font-display text-lg md:text-xl mb-0 tracking-tight">{tip.t}</h6>
                                            <p className="text-xs text-muted leading-relaxed italic opacity-80">"{tip.d}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="dashboard-card border-0 bg-primary text-white p-6 md:p-8 rounded-[40px] md:rounded-[50px] text-center relative overflow-hidden animate-slide-up" style={{ animationDelay: '350ms' }}>
                                <div className="absolute top-0 right-0 p-12 opacity-10"><i className="fas fa-trophy text-[200px]"></i></div>
                                <h4 className="font-display font-bold text-xl md:text-2xl mb-2 relative z-10">{t('achievement_title')}</h4>
                                <p className="opacity-70 text-xs md:text-sm mb-8 max-w-lg mx-auto relative z-10">{t('achievement_desc')}</p>
                                <button className="btn btn-white text-primary font-bold rounded-full px-8 py-3 text-[11px] uppercase tracking-widest relative z-10 shadow-xl">{t('achievement_redeem')}</button>
                            </div>
                        </div>
                    )}

                    {currentPage === 'compare' && (
                        <div className="animate-fade-in row g-4 md:g-5">
                            <div className="col-12 col-xl-7">
                                <div className="dashboard-card border-0 p-6 md:p-8 h-100 animate-slide-up">
                                    <h5 className="font-display font-bold text-xl md:text-2xl mb-10 tracking-tight">{t('bench_title')}</h5>
                                    <div className="h-[300px] md:h-[350px]">
                                        <ResponsiveContainer>
                                            <BarChart data={[ {n: t('bench_you'), v: analytics.totalUnits}, {n: t('bench_sector_avg'), v: analytics.totalUnits * 1.2}, {n: t('bench_eco_hub'), v: analytics.totalUnits * 0.8} ]}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                                <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                <YAxis hide />
                                                <Tooltip cursor={{fill: 'transparent'}} />
                                                <Bar dataKey="v" radius={[15, 15, 0, 0]} barSize={window.innerWidth < 768 ? 40 : 60}>
                                                    {[0,1,2].map((_, i) => <Cell key={i} fill={i === 0 ? 'var(--primary)' : '#cbd5e1'} />)}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-5 flex flex-col justify-center gap-4 md:gap-6">
                                <div className="p-6 md:p-8 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-[30px] md:rounded-[40px] text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                                    <h5 className="font-display font-bold text-emerald-600 text-xl md:text-2xl mb-2">{t('bench_status')}</h5>
                                    <p className="text-xs md:text-sm opacity-70 mb-0">{t('bench_status_desc')}</p>
                                </div>
                                <div className="p-6 md:p-8 bg-primary/5 border-2 border-primary/10 rounded-[30px] md:rounded-[40px] italic text-[11px] md:text-xs text-muted leading-relaxed animate-slide-up" style={{ animationDelay: '300ms' }}>
                                    <h6 className="font-bold text-primary mb-2 uppercase tracking-[0.2em] text-[10px]">{t('bench_insight_title')}</h6>
                                    {t('bench_insight_desc')}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentPage === 'settings' && (
                        <div className="animate-fade-in max-w-2xl mx-auto">
                            <div className="dashboard-card border-0 p-6 md:p-10 text-center shadow-2xl rounded-[40px] md:rounded-[50px] animate-slide-up relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-5 d-none d-sm-block"><i className="fas fa-cog text-[150px] animate-spin-slow"></i></div>
                                <div className="p-1 rounded-full bg-gradient-to-tr from-primary to-emerald-500 mx-auto w-24 h-24 md:w-32 md:h-32 mb-6 shadow-xl relative z-10">
                                    <div className="bg-white rounded-full w-full h-full flex items-center justify-center text-primary text-3xl md:text-4xl font-display font-bold border-4 border-white">NY</div>
                                </div>
                                <h4 className="font-display font-bold text-2xl md:text-3xl mb-1 relative z-10">Namyen Admin</h4>
                                <div className="badge bg-primary-subtle text-primary px-4 py-2 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-8 md:mb-10 relative z-10">{t('set_authority')}</div>
                                
                                <div className="space-y-3 text-start relative z-10">
                                    {[
                                        { label: t('set_lang'), val: lang.toUpperCase(), type: 'select', opts: ['EN', 'TH'], onChange: (v: string) => setLang(v.toLowerCase() as any) },
                                        { label: t('set_dark_mode'), val: isDarkMode, type: 'switch', onChange: onToggleTheme },
                                        { label: t('set_telemetry'), val: 'High', type: 'info' },
                                        { label: t('set_security'), val: 'Active', type: 'info' }
                                    ].map((row, i) => (
                                        <div key={i} className="p-4 md:p-5 bg-light rounded-3xl flex justify-between items-center transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-light">
                                            <span className="font-bold text-xs md:text-sm tracking-tight">{row.label}</span>
                                            {row.type === 'select' ? (
                                                <select className="form-select border-0 bg-transparent w-fit font-bold text-primary text-xs md:text-sm p-0" value={row.val as string} onChange={e => (row.onChange as (v: string) => void)(e.target.value)}>
                                                    {row.opts?.map(o => <option key={o} value={o}>{o}</option>)}
                                                </select>
                                            ) : row.type === 'switch' ? (
                                                <div className="form-check form-switch mb-0"><input className="form-check-input scale-110 md:scale-125" type="checkbox" checked={row.val as boolean} onChange={row.onChange as any} /></div>
                                            ) : (
                                                <span className="text-emerald-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">{row.val}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-outline-danger w-100 py-3.5 md:py-4 rounded-3xl font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] mt-8 md:mt-10 transition-all hover:bg-danger hover:text-white shadow-lg" onClick={onLogout}>{t('set_terminate')}</button>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

const navItems = [
    { id: 'dashboard', icon: 'fas fa-th-large', key: 'm1' },
    { id: 'devices', icon: 'fas fa-network-wired', key: 'm2' },
    { id: 'calculator', icon: 'fas fa-microchip', key: 'm3' },
    { id: 'budget', icon: 'fas fa-wallet', key: 'm4' },
    { id: 'stats', icon: 'fas fa-satellite-dish', key: 'm5' },
    { id: 'noti', icon: 'fas fa-broadcast-tower', key: 'm6' },
    { id: 'tips', icon: 'fas fa-brain', key: 'm7' },
    { id: 'compare', icon: 'fas fa-balance-scale', key: 'm8' },
    { id: 'settings', icon: 'fas fa-cog', key: 'm9' },
];

export default Dashboard;
