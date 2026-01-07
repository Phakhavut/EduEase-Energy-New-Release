
import React, { useState, useMemo } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

const langData = {
    th: {
        m1: "หน้าแรก (Dashboard)", m2: "อุปกรณ์ไฟฟ้า", m3: "คำนวณค่าไฟ", m4: "งบประมาณ", m5: "สถิติ & ประวัติ", m6: "การแจ้งเตือน", m7: "คำแนะนำประหยัดไฟ", m8: "เปรียบเทียบการใช้งาน", m9: "โปรไฟล์ & ตั้งค่า",
        db1: "สรุปค่าไฟปัจจุบัน", db2: "สถานะการใช้ไฟ", db3: "ใช้ไฟเดือนนี้", db4: "วันครบกำหนดชำระ", st_normal: "ปกติ", st_high: "สูง", st_over: "เกินงบ",
        dv1: "📋 รายการทั้งหมด", dv2: "➕ เพิ่ม/ลบอุปกรณ์", dv3: "⚙️ กำลังไฟ (วัตต์)", dv4: "📊 ใช้ไฟรายอุปกรณ์", dv5: "💸 ค่าไฟรายชิ้น", dv6: "⏱ ใช้งานต่อวัน",
        c1: "คำนวณจากชั่วโมง", c2: "คำนวณจากงบ", c3: "🔌 เลือกอุปกรณ์", c4: "⚡ ปรับวัตต์", "c-res": "📊 ผลลัพธ์", "c-total": "ประมาณการค่าไฟ",
        b1: "🏠 งบรวมทั้งบ้าน", b2: "🔌 งบรายอุปกรณ์", b3: "📉 สถานะงบ", b4: "🔔 แจ้งเตือนงบ", b5: "✏️ แก้ไขงบประมาณ",
        s1: "สถิติรายวัน", s2: "สถิติรายเดือน", s3: "ดาวน์โหลด PDF/CSV", s4: "📈 แนวโน้มการใช้ไฟ",
        n1: "📬 แจ้งเตือนทั้งหมด", n2: "⚠️ ใช้ไฟสูงผิดปกติ", n3: "⚙️ ตั้งค่าการแจ้งเตือน",
        t1: "🌱 Tips ทั่วไป", t2: "🤖 คำแนะนำ AI", t3: "🔍 วิเคราะห์โหลด", t4: "🏆 ความสำเร็จ",
        cp1: "📊 เทียบค่าเฉลี่ยพื้นที่", cp2: "🏠 เทียบขนาดบ้าน", cp3: "ระดับการใช้ไฟ",
        logout: "ออกจากระบบ"
    },
    en: {
        m1: "Dashboard", m2: "Electrical Devices", m3: "Bill Calculator", m4: "Budget", m5: "Stats & History", m6: "Notifications", m7: "Energy Tips", m8: "Comparison", m9: "Profile & Settings",
        db1: "Current Summary", db2: "Power Status", db3: "Usage Monthly", db4: "Due Date", st_normal: "Normal", st_high: "High", st_over: "Over Budget",
        dv1: "📋 List All", dv2: "➕ Add/Remove", dv3: "⚙️ Watts", dv4: "📊 Usage/Device", dv5: "💸 Cost/Device", dv6: "⏱ Usage Time",
        c1: "By Hours", c2: "By Budget", c3: "🔌 Select Appliance", c4: "⚡ Adjust Watts", "c-res": "📊 Prediction", "c-total": "Estimated Bill",
        b1: "🏠 Home Budget", b2: "🔌 Device Budget", b3: "📉 Budget Status", b4: "🔔 Alerts", b5: "✏️ Edit Budget",
        s1: "Daily Stats", s2: "Monthly Stats", s3: "Download PDF/CSV", s4: "📈 Trends",
        n1: "📬 All Noti", n2: "⚠️ High Load", n3: "⚙️ Settings",
        t1: "🌱 General Tips", t2: "🤖 AI Tips", t3: "🔍 Load Analysis", t4: "🏆 Awards",
        cp1: "📊 Area Average", cp2: "🏠 Size Comparison", cp3: "Energy Level",
        logout: "Logout System"
    }
};

const COLORS = ['#6f42c1', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899'];

interface DashboardProps {
    isDarkMode: boolean;
    onToggleTheme: () => void;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, onToggleTheme, onLogout }) => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [lang, setLang] = useState<'th' | 'en'>('th');
    const [statsFrame, setStatsFrame] = useState<'daily' | 'monthly'>('daily');
    const [calcMode, setCalcMode] = useState<'hours' | 'budget'>('hours');
    const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

    // Global Config
    const [calcDays, setCalcDays] = useState(30);
    const [unitRate, setUnitRate] = useState(4.5);
    const [globalBudget, setGlobalBudget] = useState(3500);

    // Devices Database
    const [multiDevices, setMultiDevices] = useState([
        { id: 1, name: 'Air Conditioner', watt: 1200, hours: 8, budget: 1800, category: 'Cooling', status: 'active' },
        { id: 2, name: 'Refrigerator', watt: 150, hours: 24, budget: 600, category: 'Kitchen', status: 'active' },
        { id: 3, name: 'Water Heater', watt: 2000, hours: 1, budget: 800, category: 'Bathroom', status: 'standby' },
        { id: 4, name: 'LED TV', watt: 100, hours: 6, budget: 300, category: 'Entertainment', status: 'active' },
        { id: 5, name: 'Electric Fan', watt: 50, hours: 10, budget: 150, category: 'Cooling', status: 'active' },
    ]);

    const t = (key: string) => (langData[lang] as any)[key] || key;

    const totalStats = useMemo(() => {
        let units = 0;
        multiDevices.forEach(d => units += (d.watt / 1000) * d.hours * calcDays);
        const cost = units * unitRate;
        return { units, cost, daily: cost / calcDays };
    }, [multiDevices, calcDays, unitRate]);

    const chartData = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => ({
            name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
            usage: +(totalStats.units / 30 + (Math.random() * 2 - 1)).toFixed(1),
            cost: +(totalStats.cost / 30 + (Math.random() * 10 - 5)).toFixed(1)
        }));
    }, [totalStats]);

    // Data for Sectoral Energy Split Pie Chart
    const pieData = useMemo(() => {
        const categories: Record<string, number> = {};
        multiDevices.forEach(d => {
            const cost = (d.watt / 1000) * d.hours * calcDays * unitRate;
            categories[d.category] = (categories[d.category] || 0) + cost;
        });
        return Object.entries(categories).map(([name, value]) => ({
            name,
            value: Number(value.toFixed(2))
        }));
    }, [multiDevices, calcDays, unitRate]);

    // Historical monthly data
    const monthlyData = useMemo(() => [
        { name: 'Jan', usage: 380, cost: 1710 },
        { name: 'Dec', usage: 420, cost: 1890 },
        { name: 'Nov', usage: 395, cost: 1777.5 },
        { name: 'Oct', usage: 410, cost: 1845 },
    ], []);

    // AI Neural Anomaly Monitoring
    const aiDetections = useMemo(() => {
        const findings = [];
        // Detect repetitions or stuck cycles (simulated as 24h continuous high load)
        const repetition = multiDevices.find(d => d.hours >= 24 && d.watt > 100);
        if (repetition) {
            findings.push({ 
                type: 'Logic Repetition', 
                msg: `Device '${repetition.name}' has been on 100% duty for over 24h. Sensor bug or mechanical bypass suspected.` 
            });
        }
        if (totalStats.cost > globalBudget) {
            findings.push({ 
                type: 'Budget Anomaly', 
                msg: `Current trajectory will exceed sector credits by ${((totalStats.cost / globalBudget - 1) * 100).toFixed(0)}%.` 
            });
        }
        return findings;
    }, [multiDevices, totalStats, globalBudget]);

    const updateDevice = (id: number, field: string, value: any) => {
        setMultiDevices(multiDevices.map(d => d.id === id ? { ...d, [field]: value } : d));
    };

    const addDevice = () => {
        const newDev = { id: Date.now(), name: 'New Unit', watt: 100, hours: 1, budget: 100, category: 'Misc', status: 'standby' };
        setMultiDevices([...multiDevices, newDev]);
    };

    const removeDevice = (id: number) => {
        setMultiDevices(multiDevices.filter(d => d.id !== id));
    };

    const handleNumericInput = (val: string, setter: (n: number) => void) => {
        if (val === '') { setter(0); return; }
        const parsed = parseFloat(val);
        if (!isNaN(parsed)) setter(parsed);
    };

    const navItems = [
        { id: 'dashboard', icon: 'fas fa-th-large', key: 'm1' },
        { id: 'devices', icon: 'fas fa-plug', key: 'm2' },
        { id: 'calculator', icon: 'fas fa-calculator', key: 'm3' },
        { id: 'budget', icon: 'fas fa-wallet', key: 'm4' },
        { id: 'stats', icon: 'fas fa-chart-bar', key: 'm5' },
        { id: 'noti', icon: 'fas fa-bell', key: 'm6' },
        { id: 'tips', icon: 'fas fa-robot', key: 'm7' },
        { id: 'compare', icon: 'fas fa-balance-scale', key: 'm8' },
        { id: 'settings', icon: 'fas fa-cog', key: 'm9' },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-4 bg-white border-0 shadow-2xl rounded-3xl text-slate-800">
                    <p className="mb-2 fw-bold border-bottom pb-2">{label}</p>
                    <p className="mb-1 text-primary text-2xl font-bold">{payload[0].value} <small className="text-slate-400 text-xs">kWh</small></p>
                    <p className="mb-0 text-success fw-bold">฿ {(Number(payload[0].value) * unitRate).toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="dashboard-container" data-theme={isDarkMode ? 'dark' : 'light'}>
            {/* 🧭 Main Menu */}
            <aside className="sidebar flex flex-col justify-between">
                <div>
                    <div className="mb-5 ps-2">
                        <div className="flex items-center gap-3 mb-1">
                           <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg"><i className="fas fa-bolt"></i></div>
                           <h4 className="fw-bold text-primary mb-0 font-display">EduEase</h4>
                        </div>
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Property Energy OS</span>
                    </div>
                    <nav className="space-y-1">
                        {navItems.map(item => (
                            <button key={item.id} className={`nav-link ${currentPage === item.id ? 'active' : ''}`} onClick={() => {setCurrentPage(item.id); setSelectedDeviceId(null);}}>
                                <i className={item.icon}></i> <span>{t(item.key)}</span>
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="pt-4 border-top border-secondary-subtle">
                    <button onClick={onLogout} className="nav-link text-danger border-0 bg-transparent w-full text-start flex items-center gap-2 hover:bg-danger/10">
                        <i className="fas fa-sign-out-alt"></i> <span>{t('logout')}</span>
                    </button>
                </div>
            </aside>

            {/* 🏛 Workspace */}
            <main className="main-content-dashboard">
                <header className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h2 className="fw-bold mb-0 font-display text-4xl">{t(navItems.find(n => n.id === currentPage)?.key || 'm1')}</h2>
                        <p className="text-muted small font-medium uppercase tracking-[0.2em]">{isDarkMode ? 'Neural Dark Interface' : 'Active Grid Terminal'}</p>
                    </div>
                    <div className="d-flex gap-3">
                        <div className="flex items-center gap-3 px-4 py-2 bg-light rounded-full border shadow-sm">
                            <span className="neural-pulse"></span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">AI Monitor: {aiDetections.length > 0 ? 'ALERT' : 'STABLE'}</span>
                        </div>
                        <button className="btn btn-white border-0 rounded-pill px-4 shadow-sm fw-bold text-primary bg-white flex items-center gap-2" onClick={() => setLang(lang === 'th' ? 'en' : 'th')}>
                            <i className="fas fa-globe"></i>{lang.toUpperCase()}
                        </button>
                        <button className="btn btn-white border-0 rounded-circle shadow-sm p-3 bg-white hover:scale-110 transition-transform" onClick={onToggleTheme}>
                            <i className={`fas ${isDarkMode ? 'fa-sun text-warning' : 'fa-moon text-primary'} text-lg`}></i>
                        </button>
                    </div>
                </header>

                <div className="page-content animate-fade-in">
                    
                    {/* 🏠 1️⃣ Dashboard */}
                    {currentPage === 'dashboard' && (
                        <div className="animate-fade-in">
                            <div className="row g-4 mb-5">
                                <div className="col-md-3">
                                    <div className="dashboard-card border-0 p-4 text-center">
                                        <span className="label">{t('db1')}</span>
                                        <span className="val text-4xl mt-2 font-display text-primary">฿ {totalStats.cost.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="dashboard-card border-0 p-4 text-center">
                                        <span className="label">{t('db2')}</span>
                                        <span className={`val text-4xl mt-2 font-display ${totalStats.cost > globalBudget ? 'text-danger' : 'text-success'}`}>
                                            {totalStats.cost > globalBudget ? t('st_over') : t('st_normal')}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="dashboard-card border-0 p-4 text-center">
                                        <span className="label">{t('db3')}</span>
                                        <span className="val text-4xl mt-2 font-display">{totalStats.units.toFixed(1)} <small className="text-sm opacity-50">kWh</small></span>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="dashboard-card border-0 p-4 text-center">
                                        <span className="label">{t('db4')}</span>
                                        <span className="val text-4xl mt-2 font-display text-danger">15 FEB</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-8">
                                    <div className="dashboard-card border-0 p-5 h-100">
                                        <h5 className="fw-bold mb-5 font-display">Daily Energy Flow</h5>
                                        <div style={{ width: '100%', height: '350px' }}>
                                            <ResponsiveContainer>
                                                <AreaChart data={chartData}>
                                                    <defs>
                                                        <linearGradient id="colorUsg" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1b254b' : '#eee'} />
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'var(--text-gray)'}} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'var(--text-gray)'}} />
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Area type="monotone" dataKey="usage" stroke="var(--primary)" strokeWidth={4} fill="url(#colorUsg)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="dashboard-card border-0 p-5 h-100 flex flex-col justify-between">
                                        <h5 className="fw-bold mb-4 font-display">Shortcuts</h5>
                                        <div className="space-y-4">
                                            <button onClick={() => setCurrentPage('calculator')} className="w-full p-4 rounded-3xl bg-primary text-white flex items-center justify-between hover:scale-105 transition-all">
                                                <div className="flex items-center gap-3"><i className="fas fa-calculator"></i><span className="font-bold text-sm">Predict Bill</span></div>
                                                <i className="fas fa-chevron-right opacity-50"></i>
                                            </button>
                                            <button onClick={() => setCurrentPage('budget')} className="w-full p-4 rounded-3xl bg-emerald-500 text-white flex items-center justify-between hover:scale-105 transition-all">
                                                <div className="flex items-center gap-3"><i className="fas fa-wallet"></i><span className="font-bold text-sm">Edit Budget</span></div>
                                                <i className="fas fa-chevron-right opacity-50"></i>
                                            </button>
                                        </div>
                                        <div className="mt-5 p-4 bg-light rounded-2xl border border-primary/10">
                                            <p className="small text-muted mb-0 italic">"AI detects 12% potential saving by shifting cooling grid load to off-peak hours."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 🔌 2️⃣ Electrical Devices */}
                    {currentPage === 'devices' && (
                        <div className="animate-fade-in">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold mb-0 font-display">Active Grid Nodes</h5>
                                <button className="btn btn-primary rounded-pill px-4" onClick={addDevice}><i className="fas fa-plus me-2"></i> {t('dv2')}</button>
                            </div>
                            <div className="row g-4">
                                {multiDevices.map(dev => {
                                    const cost = (dev.watt / 1000) * dev.hours * calcDays * unitRate;
                                    return (
                                        <div key={dev.id} className="col-md-4">
                                            <div className="dashboard-card border-0 p-5 h-100 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden group" onClick={() => setSelectedDeviceId(dev.id)}>
                                                <div className={`absolute top-0 right-0 p-3 ${dev.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'} text-white text-[8px] font-bold uppercase tracking-widest`}>{dev.status}</div>
                                                <div className="p-4 bg-primary-subtle rounded-3xl text-primary mb-4 w-fit group-hover:bg-primary group-hover:text-white transition-all">
                                                    <i className={`fas ${dev.category === 'Cooling' ? 'fa-snowflake' : 'fa-plug'} text-xl`}></i>
                                                </div>
                                                <h6 className="fw-bold font-display text-xl mb-1">{dev.name}</h6>
                                                <p className="label mb-4 text-[10px]">{dev.category} Sector</p>
                                                <div className="val text-2xl text-primary">฿ {cost.toLocaleString()} <small className="text-muted text-xs font-normal">/ mo</small></div>
                                                <div className="mt-4 space-y-2">
                                                    <div className="flex justify-between text-xs"><span className="text-muted">Power</span><span className="fw-bold">{dev.watt}W</span></div>
                                                    <div className="flex justify-between text-xs"><span className="text-muted">Daily Time</span><span className="fw-bold">{dev.hours} hrs</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* 🧮 3️⃣ Electricity Bill Calculator */}
                    {currentPage === 'calculator' && (
                        <div className="animate-fade-in">
                            <div className="dashboard-card border-0 p-5 mb-5">
                                <div className="row g-4 align-items-center">
                                    <div className="col-md-6 d-flex gap-3">
                                        <button className={`btn flex-grow-1 py-3 rounded-2xl fw-bold ${calcMode === 'hours' ? 'btn-primary' : 'btn-light'}`} onClick={() => setCalcMode('hours')}>{t('c1')}</button>
                                        <button className={`btn flex-grow-1 py-3 rounded-2xl fw-bold ${calcMode === 'budget' ? 'btn-primary' : 'btn-light'}`} onClick={() => setCalcMode('budget')}>{t('c2')}</button>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="label block mb-2">{t('c_rate')}</label>
                                        <input type="number" step="0.1" className="form-control form-control-lg border-2 rounded-2xl fw-bold" value={unitRate || ''} onChange={(e) => handleNumericInput(e.target.value, setUnitRate)} />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="label block mb-2">Days</label>
                                        <input type="number" className="form-control form-control-lg border-2 rounded-2xl fw-bold" value={calcDays || ''} onChange={(e) => handleNumericInput(e.target.value, setCalcDays)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-7">
                                    <div className="space-y-4">
                                        {multiDevices.map(dev => (
                                            <div key={dev.id} className="dashboard-card border-0 p-4">
                                                <div className="row g-3 align-items-center">
                                                    <div className="col-md-5"><label className="label text-[10px] block mb-1">Appliance</label><input type="text" className="form-control border-0 bg-transparent fw-bold" value={dev.name} onChange={(e) => updateDevice(dev.id, 'name', e.target.value)} /></div>
                                                    <div className="col-md-3"><label className="label text-[10px] block mb-1">Watts</label><input type="number" className="form-control bg-light rounded-xl border-0 fw-bold" value={dev.watt || ''} onChange={(e) => handleNumericInput(e.target.value, (n) => updateDevice(dev.id, 'watt', n))} /></div>
                                                    <div className="col-md-3"><label className="label text-[10px] block mb-1">Hrs/Day</label><input type="number" className="form-control bg-light rounded-xl border-0 fw-bold" value={dev.hours || ''} onChange={(e) => handleNumericInput(e.target.value, (n) => updateDevice(dev.id, 'hours', n))} /></div>
                                                    <div className="col-md-1"><button className="text-danger opacity-50 hover:opacity-100" onClick={() => removeDevice(dev.id)}><i className="fas fa-trash"></i></button></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="dashboard-card h-100 bg-primary text-white p-5 text-center flex flex-col justify-center rounded-[50px]">
                                        {calcMode === 'hours' ? (
                                            <div>
                                                <span className="label text-white/50 block mb-4 uppercase tracking-[0.2em]">{t('c-total')}</span>
                                                <h1 className="fw-bold text-[7rem] tracking-tighter mb-4 font-display">฿ {totalStats.cost.toLocaleString()}</h1>
                                                <div className="p-4 bg-white/10 rounded-3xl border border-white/10 inline-block">
                                                    <div className="label text-white/50 text-xs">Total Grid Power</div>
                                                    <div className="fw-bold text-3xl font-display">{totalStats.units.toFixed(1)} kWh</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="label text-white/50 block mb-4">Set Budget Cap (THB)</span>
                                                <input type="number" className="form-control bg-transparent border-white/20 text-white text-center fw-bold text-6xl py-4 border-2 rounded-[40px] mb-5" value={globalBudget || ''} onChange={(e) => handleNumericInput(e.target.value, setGlobalBudget)} />
                                                <h1 className="fw-bold text-[10rem] tracking-tighter leading-none">{totalStats.daily > 0 ? Math.floor(globalBudget / totalStats.daily) : '∞'}</h1>
                                                <div className="text-3xl font-bold opacity-60 uppercase tracking-widest">Available Days</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 💸 4️⃣ Budget */}
                    {currentPage === 'budget' && (
                        <div className="animate-fade-in">
                            <div className="row g-5">
                                <div className="col-lg-5">
                                    <div className="dashboard-card border-0 p-5 h-100 text-center shadow-lg">
                                        <h5 className="fw-bold mb-5 font-display text-2xl">{t('b1')}</h5>
                                        <div className="mb-5">
                                            <label className="label block mb-3">Modify Monthly Cap (THB)</label>
                                            <input type="number" className="form-control form-control-lg border-2 rounded-[40px] fw-bold text-primary text-5xl py-4 text-center" value={globalBudget || ''} onChange={(e) => handleNumericInput(e.target.value, setGlobalBudget)} />
                                        </div>
                                        <div className={`p-5 rounded-[50px] shadow-2xl transition-all duration-700 ${totalStats.cost > globalBudget ? 'bg-danger text-white' : 'bg-primary text-white'}`}>
                                            <span className="label text-white/50 text-xs block mb-3 uppercase tracking-widest font-bold">Remaining Credit</span>
                                            <h2 className="fw-bold text-7xl mt-1 font-display tracking-tighter">฿ {(globalBudget - totalStats.cost).toLocaleString()}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="dashboard-card border-0 p-5 h-100 shadow-sm">
                                        <h5 className="fw-bold mb-5 font-display text-2xl">{t('b2')}</h5>
                                        <div className="space-y-6">
                                            {multiDevices.map(dev => {
                                                const devCost = (dev.watt / 1000) * dev.hours * calcDays * unitRate;
                                                const pct = (devCost / globalBudget) * 100;
                                                const color = pct > 40 ? 'bg-danger' : pct > 20 ? 'bg-amber-500' : 'bg-emerald-500';
                                                return (
                                                    <div key={dev.id} className="p-4 border-2 rounded-[30px] bg-light hover:bg-white hover:border-primary transition-all">
                                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className={`p-4 rounded-3xl ${color}/10 ${color.replace('bg-', 'text-')}`}>
                                                                    <i className={`fas ${dev.category === 'Cooling' ? 'fa-snowflake' : 'fa-plug'} text-xl`}></i>
                                                                </div>
                                                                <div>
                                                                    <span className="fw-bold text-main text-xl font-display">{dev.name}</span>
                                                                    <div className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">{dev.category} Sector</div>
                                                                </div>
                                                            </div>
                                                            <div className="text-right"><div className="fw-bold text-primary text-3xl font-display">฿ {devCost.toLocaleString()}</div></div>
                                                        </div>
                                                        <div className="progress rounded-full" style={{ height: '12px' }}>
                                                            <div className={`progress-bar ${color} shadow-lg`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                                                        </div>
                                                        <div className="mt-3 text-[10px] font-bold text-muted uppercase tracking-widest">Allocation: {pct.toFixed(1)}% of Hub</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 📊 5️⃣ Statistics & History */}
                    {currentPage === 'stats' && (
                        <div className="animate-fade-in">
                            <div className="dashboard-card border-0 p-5 mb-5 shadow-lg">
                                <div className="d-flex justify-content-between align-items-center mb-5">
                                    <h4 className="fw-bold mb-1 font-display text-3xl">Historical Telemetry</h4>
                                    <div className="btn-group rounded-pill overflow-hidden border-2 shadow-sm p-1 bg-light">
                                        <button className={`btn btn-sm px-4 rounded-pill border-0 py-2 fw-bold text-xs ${statsFrame === 'daily' ? 'btn-primary' : 'btn-white bg-transparent'}`} onClick={() => setStatsFrame('daily')}>DAILY GRID</button>
                                        <button className={`btn btn-sm px-4 rounded-pill border-0 py-2 fw-bold text-xs ${statsFrame === 'monthly' ? 'btn-primary' : 'btn-white bg-transparent'}`} onClick={() => setStatsFrame('monthly')}>MONTHLY HUB</button>
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: '400px' }}>
                                    <ResponsiveContainer>
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorGrd" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1b254b' : '#f0f0f0'} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'var(--text-gray)'}} />
                                            <YAxis axisLine={false} tickLine={false} unit=" kWh" tick={{fontSize: 12, fill: 'var(--text-gray)'}} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area type="monotone" dataKey="usage" stroke="var(--primary)" strokeWidth={5} fill="url(#colorGrd)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-5 d-flex gap-3 justify-content-end">
                                    <button className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold text-xs uppercase tracking-widest"><i className="fas fa-file-pdf me-2"></i> Download PDF</button>
                                    <button className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold text-xs uppercase tracking-widest"><i className="fas fa-file-csv me-2"></i> Download CSV</button>
                                </div>
                            </div>
                            
                            {/* Sectoral Energy Split and Table Row */}
                            <div className="row g-4 mb-4">
                                <div className="col-lg-6">
                                    <div className="dashboard-card border-0 p-5 h-100 shadow-sm">
                                        <h6 className="fw-bold mb-5 font-display text-xl">Sectoral Energy Split</h6>
                                        <div style={{ width: '100%', height: '320px' }}>
                                            <ResponsiveContainer>
                                                <PieChart>
                                                    <Pie 
                                                        data={pieData} 
                                                        innerRadius={80} 
                                                        outerRadius={120} 
                                                        paddingAngle={5} 
                                                        dataKey="value" 
                                                        stroke="none"
                                                        animationDuration={1500}
                                                    >
                                                        {pieData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: 12, fontWeight: 'bold'}} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="dashboard-card border-0 p-5 h-100 shadow-sm overflow-hidden">
                                        <h6 className="fw-bold mb-5 font-display text-xl">Historical Statement Log</h6>
                                        <div className="table-responsive">
                                            <table className="table table-hover align-middle small">
                                                <thead className="bg-light"><tr className="label border-0 text-[10px]"><th className="ps-3 py-3">Reporting Period</th><th>Energy Units</th><th className="text-end pe-3">Bill Settlement</th></tr></thead>
                                                <tbody className="border-0">
                                                    {monthlyData.map((m, i) => (
                                                        <tr key={i} className="border-bottom border-light">
                                                            <td className="ps-3 py-3 fw-bold font-display text-main">{m.name} 2025</td>
                                                            <td className="text-main">{m.usage} <small className="text-muted">kWh</small></td>
                                                            <td className="text-end pe-3 fw-bold text-primary">฿ {m.cost.toLocaleString()}</td>
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

                    {/* 🔔 6️⃣ Notifications */}
                    {currentPage === 'noti' && (
                        <div className="animate-fade-in max-w-3xl mx-auto">
                            <div className="space-y-4 mb-5">
                                {[
                                    { t: 'Strategic Alert: Consumption Peak', d: 'Hub A has surpassed 90% of allocated credits. Stabilizing grid.', c: 'danger', i: 'fa-bolt', time: '12m ago' },
                                    { t: 'Financial Sync: Settlement Complete', d: 'December bill cycle has been finalized. Statement available.', c: 'info', i: 'fa-file-invoice-dollar', time: '1d ago' },
                                    { t: 'Infrastructure Alert: Node Healthy', d: 'All 5 electrical nodes are reporting optimal voltage.', c: 'success', i: 'fa-check-circle', time: '3d ago' },
                                ].map((n, i) => (
                                    <div key={i} className={`dashboard-card border-start border-[6px] border-${n.c} p-5 shadow-sm flex gap-5 hover:translate-x-2 transition-transform cursor-pointer`}>
                                        <div className={`p-4 rounded-3xl bg-${n.c}-subtle text-${n.c} h-fit`}><i className={`fas ${n.i} fa-xl`}></i></div>
                                        <div className="flex-grow">
                                            <div className="d-flex justify-content-between mb-2">
                                                <h6 className="fw-bold mb-0 font-display text-lg">{n.t}</h6>
                                                <span className="text-muted font-bold text-[10px] uppercase tracking-widest">{n.time}</span>
                                            </div>
                                            <p className="text-muted small mb-0">{n.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="dashboard-card border-0 p-5">
                                <h5 className="fw-bold mb-5 font-display border-bottom pb-4">Channel Settings</h5>
                                <div className="space-y-4">
                                    {['Emergency Load Alerts', 'Budget Milestone (70%/90%)', 'Monthly Analytics Digest', 'Community Efficiency Comparison'].map(opt => (
                                        <div key={opt} className="p-4 bg-light rounded-3xl d-flex justify-content-between align-items-center">
                                            <label className="fw-bold small text-dark mb-0">{opt}</label>
                                            <div className="form-check form-switch mb-0"><input className="form-check-input scale-125" type="checkbox" defaultChecked /></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 💡 7️⃣ Energy Tips */}
                    {currentPage === 'tips' && (
                        <div className="animate-fade-in">
                            <div className="row g-4 mb-5">
                                {[
                                    { t: 'Cooling Efficiency Offset', d: 'Increase thermostat by 1.5°C to alleviate 10% load pressure.', i: 'fa-thermometer-half', c: 'primary' },
                                    { t: 'Night Cycle Optimization', d: 'Schedule heavy-wattage nodes for off-peak evening windows.', i: 'fa-moon', c: 'success' },
                                    { t: 'Luminance Strategic Shift', d: 'Transitioning to LED in Entertainment sector saves ฿140/mo.', i: 'fa-lightbulb', c: 'warning' },
                                ].map((tip, i) => (
                                    <div key={i} className="col-md-4">
                                        <div className="dashboard-card border-0 p-5 h-100 flex flex-col gap-4 text-center">
                                            <div className={`p-4 rounded-3xl bg-${tip.c}-subtle text-${tip.c} w-fit mx-auto shadow-lg shadow-${tip.c}/10`}><i className={`fas ${tip.i} fa-2x`}></i></div>
                                            <h6 className="fw-bold font-display text-xl mb-2">{tip.t}</h6>
                                            <p className="small text-muted mb-0 leading-relaxed">{tip.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="dashboard-card border-0 bg-primary text-white p-5 rounded-[50px] text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-10"><i className="fas fa-trophy text-[200px] neural-glow"></i></div>
                                <h4 className="fw-bold mb-3 font-display text-3xl">Efficiency Awards: Hub Level 4</h4>
                                <p className="opacity-80 mb-5 max-w-lg mx-auto">Your sector has maintained a 'Normal' usage profile for 14 consecutive cycles. New achievement unlocked: 'Grid Guardian'</p>
                                <button className="btn btn-white text-primary rounded-pill px-5 py-3 fw-bold">VIEW ALL ACHIEVEMENTS</button>
                            </div>
                        </div>
                    )}

                    {/* 🏘 8️⃣ Energy Usage Comparison */}
                    {currentPage === 'compare' && (
                        <div className="animate-fade-in">
                            <div className="row g-5">
                                <div className="col-lg-7">
                                    <div className="dashboard-card border-0 p-5 h-100">
                                        <h5 className="fw-bold mb-5 font-display">Area Efficiency Benchmark</h5>
                                        <div style={{ width: '100%', height: '350px' }}>
                                            <ResponsiveContainer>
                                                <BarChart data={[
                                                    {n: 'Your Hub', v: totalStats.units, color: 'var(--primary)'}, 
                                                    {n: 'Sector Avg', v: totalStats.units * 1.3, color: '#a3aed0'},
                                                    {n: 'Hub Alpha', v: totalStats.units * 0.9, color: '#10b981'}
                                                ]}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                    <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} unit=" kWh" />
                                                    <Tooltip cursor={{fill: 'transparent'}} />
                                                    <Bar dataKey="v" radius={[15, 15, 0, 0]} barSize={60}>
                                                        {[0,1,2].map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--primary)' : index === 1 ? '#cbd5e1' : '#10b981'} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="dashboard-card border-0 p-5 h-100 flex flex-col justify-center">
                                        <h6 className="fw-bold mb-4 font-display text-xl">Benchmark Insight</h6>
                                        <div className="p-4 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-[30px] mb-4">
                                            <h5 className="fw-bold text-emerald-600 font-display">Efficiency Level: High</h5>
                                            <p className="small text-emerald-800/60 mb-0">For a 3-bedroom hub, your load is 15% lower than the district median.</p>
                                        </div>
                                        <div className="p-4 bg-primary/5 border-2 border-primary/20 rounded-[30px]">
                                            <h6 className="fw-bold text-primary mb-2 font-display text-sm">Strategic Move</h6>
                                            <p className="small text-muted mb-0 leading-relaxed italic">"Transitioning Entertainment grid to a 00:00-06:00 bypass cycle will elevate you to the top 5% of elite hubs."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ⚙️ 9️⃣ Profile & Settings */}
                    {currentPage === 'settings' && (
                        <div className="animate-fade-in max-w-2xl mx-auto">
                            <div className="dashboard-card border-0 shadow-2xl p-5 rounded-[50px] relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-10"><i className="fas fa-shield-halved text-9xl neural-glow"></i></div>
                                <div className="text-center mb-5 relative z-10">
                                    <div className="p-1 rounded-full bg-gradient-to-tr from-primary to-emerald-500 w-36 h-36 mx-auto mb-5 shadow-2xl">
                                       <div className="bg-white rounded-full w-full h-full flex items-center justify-center text-primary text-6xl font-display font-bold border-4 border-white">NY</div>
                                    </div>
                                    <h4 className="fw-bold mb-1 font-display text-4xl">Namyen Administrator</h4>
                                    <div className="badge bg-primary-subtle text-primary px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mt-2">Neural Master Access</div>
                                </div>
                                <div className="space-y-3 relative z-10 pt-4">
                                    <div className="p-4 bg-light rounded-[30px] d-flex justify-content-between align-items-center hover:bg-white border-2 border-transparent hover:border-primary transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4"><i className="fas fa-globe text-primary text-xl"></i><span className="fw-bold font-display text-lg">System Localization</span></div>
                                        <select className="form-select border-0 w-fit fw-bold text-primary bg-transparent text-end text-lg" value={lang} onChange={(e) => setLang(e.target.value as any)}><option value="th">ภาษาไทย (TH)</option><option value="en">English (US)</option></select>
                                    </div>
                                    <div className="p-4 bg-light rounded-[30px] d-flex justify-content-between align-items-center hover:bg-white border-2 border-transparent hover:border-primary transition-all cursor-pointer">
                                        <div className="flex items-center gap-4"><i className="fas fa-palette text-primary text-xl"></i><span className="fw-bold font-display text-lg">Dark Interface</span></div>
                                        <div className="form-check form-switch mb-0"><input className="form-check-input scale-150" type="checkbox" checked={isDarkMode} onChange={onToggleTheme} /></div>
                                    </div>
                                    <div className="pt-5 border-top mt-5">
                                        <button className="btn btn-danger w-100 py-4 rounded-[40px] fw-bold shadow-2xl shadow-danger/20 text-xs uppercase tracking-[0.4em]" onClick={onLogout}><i className="fas fa-power-off me-3"></i> TERMINATE SECTOR SESSION</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
