import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Home, 
  Store, 
  Trees, 
  Plus, 
  Check, 
  Wifi, 
  WifiOff, 
  Users, 
  Calendar, 
  Sparkles, 
  AlertTriangle, 
  BarChart2, 
  Sliders, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  X,
  Search,
  Filter,
  Copy,
  Radio,
  RefreshCw,
  SlidersHorizontal,
  CheckCircle2,
  Cpu,
  MapPin,
  Wallet,
  Zap,
  Activity
} from 'lucide-react';
import { LocationItem, InfoDetailMode, AppPage } from '../../types';
import { PageHeader, StatCard, UnifiedCard, UnifiedButton, StatusBadge } from '../../design-system';

interface PropertyPreset {
  id: string;
  nameTh: string;
  nameEn: string;
  type: LocationItem['type'];
  budget: number;
  residents: number;
  billingCycleDay: number;
  province: string;
  tariffLabelTh: string;
  descriptionTh: string;
  badge: string;
}

const PROPERTY_PRESETS: PropertyPreset[] = [
  {
    id: 'dorm',
    nameTh: 'หอพักนักศึกษา / คอนโดสตูดิโอ',
    nameEn: 'Student Dorm / Studio',
    type: 'dorm',
    budget: 1200,
    residents: 1,
    billingCycleDay: 25,
    province: 'กรุงเทพมหานคร',
    tariffLabelTh: 'มิเตอร์ย่อยหอพัก (฿7/หน่วย)',
    descriptionTh: 'เหมาะสำหรับนักศึกษา ควบคุมแอร์และค่าไฟรายวัน',
    badge: '🎓 ยอดนิยมสำหรับนักศึกษา'
  },
  {
    id: 'condo',
    nameTh: 'คอนโดมิเนียม 1-2 ห้องนอน',
    nameEn: 'Modern Condo Unit',
    type: 'home',
    budget: 2400,
    residents: 2,
    billingCycleDay: 15,
    province: 'นนทบุรี',
    tariffLabelTh: 'MEA 1.1.2 อัตราก้าวหน้า',
    descriptionTh: 'แอร์ Inverter + ตู้เย็น + เครื่องทำน้ำอุ่น',
    badge: '🏢 คนทำงาน'
  },
  {
    id: 'house',
    nameTh: 'บ้านเดี่ยว / ทาวน์โฮมครอบครัว',
    nameEn: 'Family Home / Townhouse',
    type: 'home',
    budget: 4800,
    residents: 4,
    billingCycleDay: 1,
    province: 'ปทุมธานี',
    tariffLabelTh: 'PEA 1.1.2 + รองรับโซลาร์รูฟ',
    descriptionTh: 'โหลดแอร์หลายห้อง + ปั๊มน้ำ + รถยนต์ไฟฟ้า EV',
    badge: '🏡 ครอบครัว'
  },
  {
    id: 'shop',
    nameTh: 'คาเฟ่ / โฮมออฟฟิศ SME',
    nameEn: 'Cafe / SME Commercial',
    type: 'shop',
    budget: 8500,
    residents: 3,
    billingCycleDay: 10,
    province: 'เชียงใหม่',
    tariffLabelTh: 'อัตรา TOU 2.1.2 กิจการขนาดเล็ก',
    descriptionTh: 'โหลดเปิดกลางวัน Peak 09:00-22:00 น.',
    badge: '☕ ธุรกิจ SME'
  },
  {
    id: 'facility',
    nameTh: 'อาคารสำนักงาน / โรงงานขนาดย่อม',
    nameEn: 'Commercial Facility / Office',
    type: 'office',
    budget: 35000,
    residents: 15,
    billingCycleDay: 20,
    province: 'สมุทรปราการ',
    tariffLabelTh: 'TOU + พีคดีมานด์ชาร์จ 15 นาที',
    descriptionTh: 'ระบบไฟ 3 เฟส บาลานซ์โหลด และปรับปรุง cos φ',
    badge: '🏭 อุตสาหกรรม'
  }
];

interface LocationsViewProps {
  locations: LocationItem[];
  currentLocationId: string;
  onSwitchLocation: (id: string) => void;
  onAddLocation: (newLoc: Omit<LocationItem, 'id' | 'estimatedBill' | 'lastUpdated'>) => void;
  isDarkMode: boolean;
  lang: 'th' | 'en';
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
  onNavigatePage?: (page: AppPage) => void;
}

export const LocationsView: React.FC<LocationsViewProps> = ({
  locations,
  currentLocationId,
  onSwitchLocation,
  onAddLocation,
  isDarkMode,
  lang,
  infoDetailMode,
  onStartPageTour,
  onNavigatePage,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [orgMode, setOrgMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'budget-desc' | 'est-desc' | 'utilization'>('utilization');
  const [pingSuccessMessage, setPingSuccessMessage] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [type, setType] = useState<LocationItem['type']>('home');
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [residents, setResidents] = useState(2);
  const [budget, setBudget] = useState(2500);
  const [billingCycleDay, setBillingCycleDay] = useState(25);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const applyPreset = (preset: PropertyPreset) => {
    setSelectedPresetId(preset.id);
    setName(lang === 'th' ? preset.nameTh : preset.nameEn);
    setType(preset.type);
    setProvince(preset.province);
    setResidents(preset.residents);
    setBudget(preset.budget);
    setBillingCycleDay(preset.billingCycleDay);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddLocation({
      name: name.trim(),
      nameEn: name.trim(),
      type,
      province,
      residents,
      billingCycleDay,
      budget,
      isConnected: true,
      memberCount: residents,
      icon: type === 'home' ? 'Home' : type === 'shop' ? 'Store' : type === 'provincial' ? 'Trees' : 'Building2',
    });
    setName('');
    setSelectedPresetId(null);
    setShowAddModal(false);
  };

  const handleDuplicate = (loc: LocationItem) => {
    onAddLocation({
      name: `${loc.name} (สำเนา)`,
      nameEn: `${loc.nameEn || loc.name} (Copy)`,
      type: loc.type,
      province: loc.province,
      residents: loc.residents,
      billingCycleDay: loc.billingCycleDay,
      budget: loc.budget,
      isConnected: loc.isConnected,
      memberCount: loc.memberCount || loc.residents,
      icon: loc.icon,
    });
  };

  const handleSimulatePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setPingSuccessMessage(lang === 'th' ? '⚡ ซิงค์ข้อมูลกับ Modbus/ESP32 สำเร็จ (Latency: 14ms)' : '⚡ Hardware telemetry synced (Latency: 14ms)');
      setTimeout(() => setPingSuccessMessage(null), 4000);
    }, 600);
  };

  const currentLoc = locations.find(l => l.id === currentLocationId) || locations[0];
  const totalPortfolioBudget = locations.reduce((sum, l) => sum + l.budget, 0);
  const totalPortfolioEst = locations.reduce((sum, l) => sum + l.estimatedBill, 0);

  const getIcon = (type: LocationItem['type']) => {
    switch (type) {
      case 'home': return Home;
      case 'dorm': return Building2;
      case 'provincial': return Trees;
      case 'shop': return Store;
      case 'office': return Building2;
      default: return Home;
    }
  };

  // Filtered and Sorted Locations
  const filteredLocations = useMemo(() => {
    let list = locations.filter(loc => {
      const matchSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.province.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'all' || loc.type === filterType;
      return matchSearch && matchType;
    });

    return list.sort((a, b) => {
      if (sortBy === 'budget-desc') return b.budget - a.budget;
      if (sortBy === 'est-desc') return b.estimatedBill - a.estimatedBill;
      if (sortBy === 'utilization') {
        const utilA = a.estimatedBill / a.budget;
        const utilB = b.estimatedBill / b.budget;
        return utilB - utilA;
      }
      return a.name.localeCompare(b.name);
    });
  }, [locations, searchQuery, filterType, sortBy]);

  return (
    <div id="tour-step-locations" className="space-y-6 pb-20">
      {/* 1. Standardized Page Header */}
      <PageHeader
        title={lang === 'th' ? 'สถานที่ของฉัน' : 'My Locations'}
        subtitle={lang === 'th' 
          ? 'สลับดูค่าไฟและควบคุมเครื่องใช้ไฟฟ้าของบ้าน หอพัก ร้านค้า หรือบ้านต่างจังหวัดได้ในที่เดียว' 
          : 'Manage energy budgets, connected devices, and billing status across all your properties.'}
        icon={MapPin}
        badgeText={orgMode ? (lang === 'th' ? 'โหมดองค์กร' : 'Org Mode') : (lang === 'th' ? `${locations.length} สถานที่` : `${locations.length} Places`)}
        badgeVariant={orgMode ? 'info' : 'brand'}
        lang={lang}
        isDarkMode={isDarkMode}
        onStartTour={onStartPageTour ? () => onStartPageTour(1) : undefined}
        tourStepLabel={lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}
        actions={
          <>
            <UnifiedButton
              variant={orgMode ? 'primary' : 'outline'}
              size="md"
              icon={BarChart2}
              isDarkMode={isDarkMode}
              onClick={() => setOrgMode(!orgMode)}
            >
              {orgMode 
                ? (lang === 'th' ? 'โหมดองค์กร (Active)' : 'Org Mode (Active)') 
                : (lang === 'th' ? 'เปิดโหมดองค์กร' : 'Enable Org Mode')}
            </UnifiedButton>

            <UnifiedButton
              variant="primary"
              size="md"
              icon={Plus}
              isDarkMode={isDarkMode}
              onClick={() => setShowAddModal(true)}
            >
              {lang === 'th' ? 'เพิ่มสถานที่ใหม่' : 'Add Location'}
            </UnifiedButton>
          </>
        }
      />

      {/* 2. Portfolio KPI Stats Strip (Visible in Org Mode or if > 1 locations) */}
      {(orgMode || locations.length > 1) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            label={lang === 'th' ? 'งบประมาณรวมทั้งพอร์ต' : 'Total Portfolio Budget'}
            value={`฿${totalPortfolioBudget.toLocaleString()}`}
            subValue={lang === 'th' ? `ครอบคลุม ${locations.length} สถานที่` : `Across ${locations.length} properties`}
            icon={Wallet}
            isDarkMode={isDarkMode}
          />

          <StatCard
            label={lang === 'th' ? 'ประมาณการค่าไฟรวมเดือนนี้' : 'Total Forecasted Bill'}
            value={`฿${totalPortfolioEst.toLocaleString()}`}
            subValue={lang === 'th'
              ? `อยู่ในงบประมาณ (-฿${(totalPortfolioBudget - totalPortfolioEst).toLocaleString()})`
              : `Under budget (-฿${(totalPortfolioBudget - totalPortfolioEst).toLocaleString()})`}
            icon={Zap}
            trend={{
              value: totalPortfolioBudget > totalPortfolioEst ? 'Under' : 'Over',
              direction: totalPortfolioBudget >= totalPortfolioEst ? 'down' : 'up',
              isPositive: totalPortfolioBudget >= totalPortfolioEst,
            }}
            isDarkMode={isDarkMode}
          />

          <StatCard
            label={lang === 'th' ? 'สถานะกล่องวัดไฟ ESP32' : 'Connected Hardware'}
            value={`${locations.filter(l => l.isConnected).length} / ${locations.length}`}
            unit={lang === 'th' ? 'เชื่อมต่อแล้ว' : 'Online'}
            subValue={lang === 'th' ? 'อัปเดตข้อมูลอัตโนมัติ 5s' : 'Auto-synced every 5s'}
            icon={Radio}
            isDarkMode={isDarkMode}
          />
        </div>
      )}

      {/* 3. Search, Filter & Quick Toolbar */}
      <UnifiedCard isDarkMode={isDarkMode} className="p-3.5">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#78857D] dark:text-[#AAB4BE] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'th' ? "ค้นหาชื่อสถานที่ หรือ จังหวัด..." : "Search property name or province..."}
              className={`w-full pl-9 pr-8 py-2 rounded-[10px] border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1EC1CB] transition-all ${
                isDarkMode ? 'bg-[#1C1C28] border-white/10 text-white placeholder:text-slate-500' : 'bg-[#F5F7FA] border-[#E2E8E4] text-[#15201A] placeholder:text-slate-400'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', labelTh: 'ทั้งหมด', labelEn: 'All' },
              { id: 'home', labelTh: 'บ้านพัก', labelEn: 'Home' },
              { id: 'dorm', labelTh: 'หอพัก/คอนโด', labelEn: 'Dorm/Condo' },
              { id: 'shop', labelTh: 'ธุรกิจ/ร้านค้า', labelEn: 'SME/Shop' },
              { id: 'office', labelTh: 'อาคาร/โรงงาน', labelEn: 'Facility' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-[#1EC1CB] text-[#1C1C28] shadow-sm'
                    : isDarkMode
                      ? 'bg-[#242435] text-[#AAB4BE] hover:bg-[#2C2C40] border border-white/5'
                      : 'bg-[#F5F7FA] text-[#53635A] hover:bg-slate-200 border border-[#E2E8E4]'
                }`}
              >
                {lang === 'th' ? tab.labelTh : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#78857D] dark:text-[#AAB4BE] font-bold hidden lg:inline">
              {lang === 'th' ? 'เรียงตาม:' : 'Sort:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`px-3 py-2 rounded-[10px] border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#1EC1CB] ${
                isDarkMode ? 'bg-[#1C1C28] border-white/10 text-white' : 'bg-[#F5F7FA] border-[#E2E8E4] text-[#15201A]'
              }`}
            >
              <option value="utilization">{lang === 'th' ? 'การใช้งบสูงสุด' : 'Budget Utilization'}</option>
              <option value="est-desc">{lang === 'th' ? 'ค่าไฟประมาณการสูงสุด' : 'Highest Estimated Bill'}</option>
              <option value="budget-desc">{lang === 'th' ? 'งบประมาณสูงสุด' : 'Highest Budget'}</option>
              <option value="name">{lang === 'th' ? 'ตามชื่อ A-Z' : 'Name A-Z'}</option>
            </select>
          </div>
        </div>
      </UnifiedCard>

      {/* Active Space Hero & IoT Sync Indicator */}
      {currentLoc && (
        <div className={`p-5 rounded-3xl border shadow-sm transition-all ${
          isDarkMode 
            ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/30' 
            : 'bg-gradient-to-br from-emerald-50/70 via-white to-emerald-100/20 border-emerald-200/80'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {lang === 'th' ? 'พื้นที่ที่กำลังเปิดดู' : 'Currently Active Space'}
                  </span>
                  <span className="text-xs text-slate-400">• {currentLoc.province}</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-800 dark:text-white mt-0.5">
                  {currentLoc.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {lang === 'th' 
                    ? `งบประมาณ ฿${currentLoc.budget.toLocaleString()} • ผู้อยู่อาศัย ${currentLoc.residents} คน • ตัดรอบวันที่ ${currentLoc.billingCycleDay}` 
                    : `Budget ฿${currentLoc.budget.toLocaleString()} • ${currentLoc.residents} Residents • Cycle day ${currentLoc.billingCycleDay}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={handleSimulatePing}
                disabled={isPinging}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                  isPinging 
                    ? 'opacity-60 cursor-not-allowed' 
                    : isDarkMode 
                      ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                      : 'bg-white border-emerald-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-500 ${isPinging ? 'animate-spin' : ''}`} />
                <span>{lang === 'th' ? 'ทดสอบเชื่อมต่อมิเตอร์' : 'Test IoT Ping'}</span>
              </button>

              <button
                onClick={() => handleDuplicate(currentLoc)}
                title={lang === 'th' ? 'ทำสำเนาเพื่อสร้างห้องหรือสาขาใหม่' : 'Duplicate configuration'}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                    : 'bg-white border-emerald-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Copy className="w-3.5 h-3.5 text-blue-500" />
                <span>{lang === 'th' ? 'ทำสำเนาสาขา' : 'Duplicate'}</span>
              </button>
            </div>
          </div>

          {/* Quick Module Navigation for Active Location */}
          {onNavigatePage && (
            <div className="mt-4 pt-3.5 border-t border-emerald-500/20 flex items-center gap-2 flex-wrap text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400 mr-1">
                {lang === 'th' ? 'เข้าสู่โมดูลของสถานที่นี้:' : 'Open for this location:'}
              </span>
              <button
                onClick={() => onNavigatePage('home')}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <span>{lang === 'th' ? '🏠 หน้าหลัก (Home)' : '🏠 Home'}</span>
              </button>
              <button
                onClick={() => onNavigatePage('appliances')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1 border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <span>{lang === 'th' ? '🔌 เครื่องใช้ไฟฟ้า' : '🔌 Appliances'}</span>
              </button>
              <button
                onClick={() => onNavigatePage('budget')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1 border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <span>{lang === 'th' ? '💰 งบประมาณ' : '💰 Budget'}</span>
              </button>
              <button
                onClick={() => onNavigatePage('analytics')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1 border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <span>{lang === 'th' ? '📊 วิเคราะห์การใช้ไฟ' : '📊 Analytics'}</span>
              </button>
            </div>
          )}

          {pingSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{pingSuccessMessage}</span>
            </motion.div>
          )}
        </div>
      )}

      {/* Locations List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLocations.map((loc) => {
          const IconComp = getIcon(loc.type);
          const isSelected = loc.id === currentLocationId;
          const usagePercent = Math.min(100, Math.round((loc.estimatedBill / loc.budget) * 100));

          return (
            <motion.div
              key={loc.id}
              whileHover={{ y: -3 }}
              className={`p-6 rounded-3xl border transition-all relative overflow-hidden ${
                isSelected
                  ? isDarkMode
                    ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/50 shadow-xl shadow-emerald-950/30'
                    : 'bg-gradient-to-br from-emerald-500/10 via-white to-white border-emerald-400 shadow-xl shadow-emerald-500/10'
                  : isDarkMode
                    ? 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
                    : 'bg-white border-slate-200/80 hover:border-emerald-200 shadow-sm'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-500 text-white font-extrabold text-[0.65rem] rounded-bl-2xl uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Check className="w-3 h-3" />
                  {lang === 'th' ? 'สถานที่เปิดใช้งานอยู่' : 'Active'}
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-md shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 ring-4 ring-emerald-500/20'
                    : isDarkMode
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-100 text-slate-600'
                }`}>
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-white truncate">
                    {loc.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 flex-wrap">
                    <span>{loc.province}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {loc.residents} {lang === 'th' ? 'คน' : 'people'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {lang === 'th' ? `ตัดรอบวันที่ ${loc.billingCycleDay}` : `Cycle Day ${loc.billingCycleDay}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Budget Progress Bar */}
              <div className="space-y-1.5 mb-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'ประมาณการค่าไฟเดือนนี้' : 'Est. Monthly Bill'}
                  </span>
                  <span className={usagePercent > 90 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}>
                    ฿{loc.estimatedBill.toLocaleString()} / ฿{loc.budget.toLocaleString()} ({usagePercent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      usagePercent > 90 
                        ? 'bg-rose-500' 
                        : usagePercent > 75 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                    }`}
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                  {loc.isConnected ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Wifi className="w-3.5 h-3.5" />
                      ESP32 Smart Meter Online
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-400">
                      <WifiOff className="w-3.5 h-3.5" />
                      {lang === 'th' ? 'กรอกข้อมูลด้วยตนเอง' : 'Manual Entry'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDuplicate(loc)}
                    title={lang === 'th' ? 'ทำสำเนาสถานที่นี้' : 'Duplicate location'}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {!isSelected ? (
                    <button
                      onClick={() => onSwitchLocation(loc.id)}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all cursor-pointer"
                    >
                      <span>{lang === 'th' ? 'สลับมาใช้อันนี้' : 'Switch Here'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      {lang === 'th' ? 'เปิดใช้งานอยู่' : 'Active'}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-50" />
          <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">
            {lang === 'th' ? 'ไม่พบสถานที่ที่ค้นหา' : 'No properties found'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'th' ? 'ลองเปลี่ยนคำค้นหา หรือกดล้างตัวกรอง' : 'Try adjusting your search or clearing filters'}
          </p>
        </div>
      )}

      {/* Add Location Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-emerald-100 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-black font-display">
                  {lang === 'th' ? 'เพิ่มสถานที่จัดการพลังงานใหม่' : 'Add New Location'}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="mb-4">
                <span className="block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                  {lang === 'th' ? '⚡ เลือกต้นแบบด่วน (1-Click Presets):' : '⚡ 1-Click Property Presets:'}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PROPERTY_PRESETS.map(preset => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPreset(preset)}
                        className={`p-2 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                            : isDarkMode
                              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300'
                        }`}
                      >
                        <div className="font-extrabold truncate">{preset.nameTh.split('/')[0]}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          ฿{preset.budget.toLocaleString()} • {preset.residents} {lang === 'th' ? 'คน' : 'p'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    {lang === 'th' ? 'ชื่อสถานที่ (เช่น บ้านพัก, หอพักศาลายา)' : 'Location Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'th' ? "เช่น บ้านสวนเชียงใหม่, ร้านกาแฟ" : "e.g., Chiang Mai Garden House, Cafe"}
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                      {lang === 'th' ? 'ประเภทสถานที่' : 'Property Type'}
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-bold transition-all ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="home">{lang === 'th' ? 'บ้านพักอาศัย (Home)' : 'Residential Home'}</option>
                      <option value="dorm">{lang === 'th' ? 'หอพัก / คอนโด (Dorm/Condo)' : 'Dorm / Apartment'}</option>
                      <option value="provincial">{lang === 'th' ? 'บ้านต่างจังหวัด (Provincial)' : 'Provincial House'}</option>
                      <option value="shop">{lang === 'th' ? 'ร้านค้า / คาเฟ่ (Shop/Cafe)' : 'Shop / Cafe'}</option>
                      <option value="office">{lang === 'th' ? 'อาคารสำนักงาน (Office)' : 'Office Building'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                      {lang === 'th' ? 'จังหวัด' : 'Province'}
                    </label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-bold transition-all ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                      {lang === 'th' ? 'ผู้อยู่อาศัย (คน)' : 'Residents'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={residents}
                      onChange={(e) => setResidents(Number(e.target.value))}
                      className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-bold transition-all ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                      {lang === 'th' ? 'ตั้งงบประมาณ (บาท)' : 'Budget (฿)'}
                    </label>
                    <input
                      type="number"
                      step={100}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-bold transition-all ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                      {lang === 'th' ? 'วันตัดรอบบิล' : 'Billing Day'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={billingCycleDay}
                      onChange={(e) => setBillingCycleDay(Number(e.target.value))}
                      className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-bold transition-all ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                  >
                    {lang === 'th' ? 'สร้างสถานที่' : 'Create Location'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
