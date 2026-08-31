import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plug, 
  Power, 
  Sparkles, 
  Clock, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  X,
  Zap,
  Snowflake,
  Tv,
  Flame,
  Monitor,
  Lightbulb,
  WashingMachine,
  Refrigerator,
  Microwave,
  Plus,
  Trash2,
  Cpu,
  TrendingUp,
  BarChart3,
  SlidersHorizontal,
  Home,
  ShieldCheck,
  FileText,
  Scale,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Appliance, InfoDetailMode, AppPage, UserPersona } from '../../types';
import { SourceBadge } from '../trust/SourceBadge';
import { OfficialDatabaseAutoFiller } from '../appliances/OfficialDatabaseAutoFiller';
import { OfficialApplianceSpec } from '../../data/officialApplianceDatabase';
import { AppliancePriceComparison } from '../appliances/AppliancePriceComparison';
import confetti from 'canvas-confetti';

interface AppliancesViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  appliances: Appliance[];
  onToggleDeviceStatus: (id: number) => void;
  onUpdateEcoMode: (id: number) => void;
  onAddAppliance?: (appliance: Omit<Appliance, 'id'>) => void;
  onDeleteAppliance?: (id: number) => void;
  onAddMaintenanceLog?: (id: number, log: { date: string; action: string; status: 'resolved' | 'pending' }) => void;
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
  onNavigatePage?: (page: AppPage) => void;
  persona?: UserPersona;
}

export const AppliancesView: React.FC<AppliancesViewProps> = ({
  lang,
  isDarkMode,
  appliances,
  onToggleDeviceStatus,
  onUpdateEcoMode,
  onAddAppliance,
  onDeleteAppliance,
  onAddMaintenanceLog,
  infoDetailMode,
  onStartPageTour,
  onNavigatePage,
  persona = 'student',
}) => {
  const [subTab, setSubTab] = useState<'list' | 'price_compare'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modals state
  const [activeModalAppliance, setActiveModalAppliance] = useState<Appliance | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'specs' | 'costs' | 'ai' | 'logs'>('specs');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkCategoryScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    setTimeout(checkCategoryScroll, 100);
  }, [selectedCategory]);

  useEffect(() => {
    const el = categoryScrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        checkCategoryScroll();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', checkCategoryScroll);
    window.addEventListener('resize', checkCategoryScroll);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', checkCategoryScroll);
      window.removeEventListener('resize', checkCategoryScroll);
    };
  }, []);

  const handleScrollCategory = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Add mode state: 'official_lookup' (default) or 'manual'
  const [addMode, setAddMode] = useState<'official_lookup' | 'manual'>('official_lookup');
  const [selectedOfficialSpec, setSelectedOfficialSpec] = useState<OfficialApplianceSpec | null>(null);

  // Maintenance log form inside detail modal
  const [newLogAction, setNewLogAction] = useState('');
  const [newLogDate, setNewLogDate] = useState(new Date().toISOString().split('T')[0]);

  // Form state for adding new appliance
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Cooling');
  const [newWatt, setNewWatt] = useState<number>(1000);
  const [newHours, setNewHours] = useState<number>(8);
  const [newRoom, setNewRoom] = useState('ห้องนอน');
  const [newEfficiencyTag, setNewEfficiencyTag] = useState<'A+++ Eco' | 'Good' | 'Average' | 'Heavy Drinker'>('A+++ Eco');
  const [newIcon, setNewIcon] = useState('Snowflake');
  const [newPf, setNewPf] = useState<number>(0.95);

  const categories = ['All', 'Cooling', 'Entertainment', 'Kitchen', 'Bathroom', 'Lighting', 'Misc'];

  const filteredAppliances = appliances.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (app.room && app.room.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Snowflake': return <Snowflake className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Monitor': return <Monitor className="w-5 h-5" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5" />;
      case 'WashingMachine': return <WashingMachine className="w-5 h-5" />;
      case 'Refrigerator': return <Refrigerator className="w-5 h-5" />;
      case 'Microwave': return <Microwave className="w-5 h-5" />;
      default: return <Plug className="w-5 h-5" />;
    }
  };

  // Calculations helper for real-time preview
  const rate = 4.7; // THB / kWh
  const calculateCosts = (w: number, h: number) => {
    const dailyKwh = (w * h) / 1000;
    const dailyCost = dailyKwh * rate;
    const monthlyKwh = dailyKwh * 30;
    const monthlyCost = monthlyKwh * rate;
    return { dailyKwh, dailyCost, monthlyKwh, monthlyCost };
  };

  const handleSelectOfficialSpec = (spec: OfficialApplianceSpec) => {
    setNewName(`${spec.brand} ${spec.modelSeries} ${spec.sizeCapacity} (${spec.labelNo5Stars > 0 ? `เบอร์ 5 ${spec.labelNo5Stars} ดาว` : 'เบอร์ 5'})`);
    
    // Map category
    let mappedCategory = 'Cooling';
    if (spec.category === 'washing_machine' || spec.category === 'water_heater') mappedCategory = 'Bathroom';
    else if (spec.category === 'kitchen') mappedCategory = 'Kitchen';
    else if (spec.category === 'tv') mappedCategory = 'Entertainment';
    else if (spec.category === 'lighting') mappedCategory = 'Lighting';
    else if (spec.category === 'fan' || spec.category === 'small_appliance') mappedCategory = 'Misc';
    
    setNewCategory(mappedCategory);
    setNewWatt(spec.ratedWatt);
    setNewHours(spec.defaultHoursPerDay);
    setNewEfficiencyTag(spec.efficiencyTag);
    setNewPf(spec.powerFactor);
    setNewIcon(spec.iconName);
    setSelectedOfficialSpec(spec);
    setAddMode('manual'); // Switch to review & save mode
  };

  const handleCreateApplianceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const costs = calculateCosts(newWatt, newHours);
    const newApp: Omit<Appliance, 'id'> = {
      name: newName.trim(),
      category: newCategory,
      watt: newWatt,
      hours: newHours,
      room: newRoom,
      status: 'active',
      healthScore: 95,
      efficiencyTag: newEfficiencyTag,
      todayCost: costs.dailyCost,
      monthlyCost: costs.monthlyCost,
      icon: newIcon,
      aiTip: selectedOfficialSpec 
        ? `อ้างอิงมาตรฐาน กฟผ. ฉลากเบอร์ 5 (${selectedOfficialSpec.efficiencyRatingTh}) ช่วยประหยัดค่าไฟได้คุ้มค่าในระยะยาว`
        : `ตั้งเวลาปิดเมื่อไม่ได้ใช้งานและตรวจสอบค่าไฟสม่ำเสมอ สามารถช่วยประหยัดไฟได้ประมาณ ฿${Math.round(costs.monthlyCost * 0.15)}/เดือน`,
      aiTipEn: selectedOfficialSpec
        ? `Verified against EGAT Label No. 5 (${selectedOfficialSpec.efficiencyRatingEn}) for optimal power efficiency.`
        : `Schedule auto turn-off when not in use to save ~฿${Math.round(costs.monthlyCost * 0.15)}/month`,
      pf: newPf,
      logs: [
        {
          date: new Date().toISOString().split('T')[0],
          action: selectedOfficialSpec 
            ? `เพิ่มอุปกรณ์เข้าสู่ระบบ (ดึงข้อมูลทางการ กฟผ. & ${selectedOfficialSpec.brand} 100%)`
            : 'เพิ่มอุปกรณ์เข้าสู่ระบบ Smart Grid (กำหนดค่าเอง)',
          status: 'resolved'
        }
      ]
    };

    if (onAddAppliance) {
      onAddAppliance(newApp);
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 }
      });
    }

    // Reset form
    setNewName('');
    setNewWatt(1000);
    setNewHours(8);
    setSelectedOfficialSpec(null);
    setAddMode('official_lookup');
    setIsAddModalOpen(false);
  };

  const handleAddLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalAppliance || !newLogAction.trim()) return;

    const logItem = {
      date: newLogDate || new Date().toISOString().split('T')[0],
      action: newLogAction.trim(),
      status: 'resolved' as const
    };

    if (onAddMaintenanceLog) {
      onAddMaintenanceLog(activeModalAppliance.id, logItem);
    }

    // Update local modal view state
    setActiveModalAppliance(prev => prev ? {
      ...prev,
      logs: [logItem, ...(prev.logs || [])]
    } : null);

    setNewLogAction('');
  };

  return (
    <div id="tour-step-appliances" className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. Header & Primary CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="text-2xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Plug className="w-6 h-6 text-emerald-500" />
              <span>{lang === 'th' ? 'ศูนย์ควบคุมเครื่องใช้ไฟฟ้า' : 'Appliance Hub'}</span>
            </h2>

            {onStartPageTour && (
              <button
                onClick={() => onStartPageTour(2)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}</span>
              </button>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'th' ? 'จัดการเครื่องใช้ไฟฟ้า เพิ่มสเปก ตรวจเช็กค่าไฟลึก และปรับปรุงสุขภาพอุปกรณ์' : 'Manage appliances, add devices, inspect deep technical specs, and optimize efficiency.'}
          </p>
        </div>

        {/* Top Controls: Add Button & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* ADD APPLIANCE BUTTON */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{lang === 'th' ? '+ เพิ่มเครื่องใช้ไฟฟ้าใหม่' : '+ Add New Appliance'}</span>
          </button>

          {/* Search */}
          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'th' ? 'ค้นหาชื่อ หรือห้อง...' : 'Search name or room...'}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Sub-Module Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl w-full sm:w-auto self-start border border-slate-300/50 dark:border-slate-700/50 flex-wrap">
        <button
          onClick={() => setSubTab('list')}
          className={`flex-1 sm:flex-initial py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            subTab === 'list'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
          }`}
        >
          <Plug className="w-4 h-4" />
          <span>{lang === 'th' ? 'รายการอุปกรณ์ & สวิตช์ Eco' : 'Appliances & Eco Switch'}</span>
        </button>
        <button
          onClick={() => setSubTab('price_compare')}
          className={`flex-1 sm:flex-initial py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            subTab === 'price_compare'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'th' ? '📊 เปรียบเทียบค่าไฟแยกอุปกรณ์' : 'Separate Appliance Price Comparison'}</span>
        </button>
        {onNavigatePage && (
          <button
            onClick={() => onNavigatePage('compare')}
            className="flex-1 sm:flex-initial py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <Scale className="w-4 h-4 text-amber-500" />
            <span>{lang === 'th' ? 'ห้องลองเปรียบเทียบ (Compare Lab)' : 'Compare Lab'}</span>
          </button>
        )}
      </div>

      {subTab === 'price_compare' ? (
        /* SEPARATE APPLIANCE ELECTRICITY PRICE COMPARISON */
        <AppliancePriceComparison
          isDarkMode={isDarkMode}
          lang={lang}
          persona={persona}
          infoDetailMode={infoDetailMode}
          userAppliances={appliances}
          onNavigatePage={onNavigatePage}
          onOpenAddAppliance={() => setIsAddModalOpen(true)}
        />
      ) : (
        <>
          {/* Quick Comparison Jump Banner */}
          <div
            onClick={() => setSubTab('price_compare')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
              isDarkMode
                ? 'bg-emerald-950/20 border-emerald-800/40 hover:bg-emerald-950/30'
                : 'bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-100/70'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-sm shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-emerald-800 dark:text-emerald-300">
                    {lang === 'th' ? 'เปรียบเทียบค่าไฟแยกตามเครื่องใช้ไฟฟ้า (เดือนนี้ vs เดือนก่อน)' : 'Compare Electricity Price by Separate Appliances (This Month vs Last Month)'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-black">
                    {lang === 'th' ? 'ประหยัดรวม ฿232 (-15.7%)' : 'Saved ฿232 (-15.7%)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {lang === 'th'
                    ? 'ดูแจกแจงค่าไฟรายชิ้น แอร์, ตู้เย็น, คอมพิวเตอร์, เครื่องทำน้ำอุ่น พร้อมผลต่างและวิธีประหยัด'
                    : 'View individual appliance breakdown for AC, Refrigerator, Laptop, Water Heater with deltas.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 shrink-0">
              <span>{lang === 'th' ? 'ดูเปรียบเทียบ' : 'View Comparison'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

      {/* Category Pills with Left / Right Scroll Navigation */}
      <div className="relative flex items-center group/pillscroll">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScrollCategory('left')}
            className="absolute left-0 z-10 p-1.5 rounded-full bg-slate-900/80 dark:bg-slate-800/90 text-white shadow-lg border border-slate-700 hover:bg-emerald-500 transition-all cursor-pointer -ml-1"
            title="เลื่อนซ้าย"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <div 
          ref={categoryScrollRef}
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-emerald-500/20 w-full px-1 scroll-smooth"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105'
                  : isDarkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScrollCategory('right')}
            className="absolute right-0 z-10 p-1.5 rounded-full bg-slate-900/80 dark:bg-slate-800/90 text-white shadow-lg border border-slate-700 hover:bg-emerald-500 transition-all cursor-pointer -mr-1"
            title="เลื่อนขวา"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. APPLIANCE CARDS GRID */}
      {filteredAppliances.length === 0 ? (
        <div className={`p-10 rounded-[2rem] border text-center space-y-3 ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
            {lang === 'th' ? 'ไม่พบเครื่องใช้ไฟฟ้าตามเงื่อนไข' : 'No appliances found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {lang === 'th' ? 'ลองเปลี่ยนคำค้นหา หรือกดปุ่มด้านบนเพื่อเพิ่มเครื่องใช้ไฟฟ้าเข้าสู่ระบบ' : 'Try another search term or click "+ Add New Appliance" above.'}
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'th' ? 'เพิ่มเครื่องใช้ไฟฟ้าเลย' : 'Add Appliance Now'}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-5">
          {filteredAppliances.map((app) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-5 rounded-[2rem] border transition-all relative group flex flex-col justify-between ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40' 
                  : 'bg-white border-slate-100 hover:border-emerald-200 shadow-sm'
              }`}
            >
              <div>
                {/* Image / Icon Header */}
                <div className="relative h-32 rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                  {app.imageUrl ? (
                    <img
                      src={app.imageUrl}
                      alt={app.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-500 bg-gradient-to-br from-emerald-500/10 to-teal-500/5">
                      <div className="p-4 rounded-2xl bg-emerald-500/15">
                        {getIcon(app.icon)}
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${
                      app.status === 'active'
                        ? 'bg-emerald-500/80 text-white border-emerald-400'
                        : app.status === 'standby'
                          ? 'bg-amber-500/80 text-white border-amber-400'
                          : 'bg-slate-700/80 text-slate-300 border-slate-600'
                    }`}>
                      {app.status === 'active' ? '⚡ Active' : app.status === 'standby' ? '🌙 Standby' : '⚪ Off'}
                    </span>
                  </div>

                  {/* Efficiency Tag */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-full backdrop-blur-md ${
                      app.efficiencyTag.includes('A+++')
                        ? 'bg-emerald-600/90 text-white'
                        : app.efficiencyTag === 'Heavy Drinker'
                          ? 'bg-rose-600/90 text-white'
                          : 'bg-blue-600/90 text-white'
                    }`}>
                      {app.efficiencyTag}
                    </span>
                  </div>
                </div>

                {/* Title & Category */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white line-clamp-1">
                      {app.name}
                    </h3>
                    {onDeleteAppliance && (
                      <button
                        onClick={() => setConfirmDeleteId(app.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
                        title={lang === 'th' ? 'ลบเครื่องใช้ไฟฟ้านี้' : 'Delete Appliance'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{app.watt}W</span>
                    <span>•</span>
                    <span>{app.hours} ชม./วัน</span>
                    {app.room && (
                      <>
                        <span>•</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[0.65rem] font-medium">
                          {app.room}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Costs Breakdown */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-3 space-y-2 border border-slate-100 dark:border-slate-800">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[0.65rem] font-bold text-slate-400 uppercase">
                        {lang === 'th' ? 'วันนี้' : 'Today'}
                      </span>
                      <div className="font-extrabold font-mono text-sm text-slate-900 dark:text-white">
                        ฿{app.todayCost.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-[0.65rem] font-bold text-slate-400 uppercase">
                        {lang === 'th' ? 'คาดการณ์เดือนนี้' : 'Est. Month'}
                      </span>
                      <div className="font-extrabold font-mono text-sm text-emerald-600 dark:text-emerald-400">
                        ฿{app.monthlyCost.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-[0.65rem] text-slate-400">{lang === 'th' ? 'ที่มาข้อมูล:' : 'Data Source:'}</span>
                    <SourceBadge source={app.watt > 1500 ? 'measured' : 'estimated'} lang={lang} />
                  </div>
                </div>

                {/* Health Score Bar */}
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-[0.65rem] font-bold">
                    <span className="text-slate-500">{lang === 'th' ? 'สุขภาพไฟฟ้า' : 'Electrical Health'}</span>
                    <span className={app.healthScore > 90 ? 'text-emerald-500' : 'text-amber-500'}>
                      {app.healthScore}/100
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${app.healthScore > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${app.healthScore}%` }}
                    />
                  </div>
                </div>

                {/* AI Tip Preview */}
                <p className="text-[0.7rem] text-slate-500 dark:text-slate-400 italic line-clamp-2 mb-4">
                  💡 "{lang === 'th' ? app.aiTip : app.aiTipEn}"
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onToggleDeviceStatus(app.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    app.status === 'active'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                  title={app.status === 'active' ? 'คลิกเพื่อปิด' : 'คลิกเพื่อเปิด'}
                >
                  <Power className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setActiveModalAppliance(app);
                    setActiveModalTab('specs');
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isDarkMode 
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' 
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{lang === 'th' ? 'สเปกเชิงลึก & วิเคราะห์' : 'Deep Specs & Diagnostics'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
        </>
      )}

      {/* 3. MODAL: ADD NEW APPLIANCE */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-xl p-6 md:p-8 rounded-[2.5rem] border shadow-2xl relative space-y-6 my-8 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-500">
                    <Plus className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg md:text-xl">
                      {lang === 'th' ? 'เพิ่มเครื่องใช้ไฟฟ้าใหม่เข้าสู่ระบบ' : 'Add New Appliance to System'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {lang === 'th' ? 'เลือกจากฐานข้อมูลทางการ กฟผ. / แบรนด์ หรือกรอกข้อมูลเอง' : 'Select from verified EGAT / Brand database or enter manually.'}
                    </p>
                  </div>
                </div>

                {/* Mode Switcher */}
                <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-extrabold">
                  <button
                    type="button"
                    onClick={() => setAddMode('official_lookup')}
                    className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      addMode === 'official_lookup'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{lang === 'th' ? '✨ ค้นหาจากฐานข้อมูล กฟผ. (Auto-Fill)' : '✨ Official Auto-Fill'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddMode('manual')}
                    className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      addMode === 'manual'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>{lang === 'th' ? '✍️ กรอกข้อมูลเอง (Manual)' : '✍️ Manual Form'}</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: OFFICIAL DATABASE AUTO-FILLER */}
              {addMode === 'official_lookup' ? (
                <div className="space-y-4 pt-1">
                  <OfficialDatabaseAutoFiller
                    lang={lang}
                    isDarkMode={isDarkMode}
                    onSelectSpec={handleSelectOfficialSpec}
                    onSwitchToManual={() => setAddMode('manual')}
                  />

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setAddMode('manual')}
                      className="text-xs font-bold text-slate-500 hover:text-emerald-500 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {lang === 'th' ? 'ไม่พบอุปกรณ์ในฐานข้อมูล? กรอกข้อมูลเองคลิกที่นี่ ➔' : 'Can\'t find device? Enter manually here ➔'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
                    </button>
                  </div>
                </div>
              ) : (
                /* TAB 2: MANUAL / REVIEW FORM */
                <form onSubmit={handleCreateApplianceSubmit} className="space-y-4">
                  {selectedOfficialSpec && (
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                        <div className="text-xs">
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                            {lang === 'th' ? 'ดึงข้อมูลสำเร็จจากฐานข้อมูลทางการ กฟผ. / แบรนด์ 100%' : 'Official Specs Loaded (EGAT Verified 100%)'}
                          </span>
                          <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                            {selectedOfficialSpec.brand} • {selectedOfficialSpec.ratedWatt}W • {lang === 'th' ? selectedOfficialSpec.efficiencyRatingTh : selectedOfficialSpec.efficiencyRatingEn}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAddMode('official_lookup')}
                        className="px-2.5 py-1 text-[0.7rem] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 rounded-lg hover:bg-emerald-500/25 cursor-pointer shrink-0"
                      >
                        {lang === 'th' ? 'เปลี่ยนรุ่น' : 'Change'}
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {lang === 'th' ? 'ชื่อเครื่องใช้ไฟฟ้า *' : 'Appliance Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={lang === 'th' ? 'เช่น แอร์ห้องนอนใหญ่ 18000 BTU, เครื่องซักผ้าฝาหน้า' : 'e.g. Living Room AC, Smart TV 55"'}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {lang === 'th' ? 'หมวดหมู่' : 'Category'}
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <option value="Cooling">{lang === 'th' ? 'Cooling (ทำความเย็น)' : 'Cooling (AC / Fan / Fridge)'}</option>
                        <option value="Entertainment">{lang === 'th' ? 'Entertainment (บันเทิง/คอมฯ)' : 'Entertainment (TV / PC / Console)'}</option>
                        <option value="Kitchen">{lang === 'th' ? 'Kitchen (ห้องครัว)' : 'Kitchen (Microwave / Cooker)'}</option>
                        <option value="Bathroom">{lang === 'th' ? 'Bathroom (ห้องน้ำ/ซักล้าง)' : 'Bathroom (Heater / Washer)'}</option>
                        <option value="Lighting">{lang === 'th' ? 'Lighting (แสงสว่าง)' : 'Lighting (Bulbs / Lamps)'}</option>
                        <option value="Misc">{lang === 'th' ? 'Misc (ทั่วไป)' : 'Misc (Other Devices)'}</option>
                      </select>
                    </div>

                    {/* Room / Location */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {lang === 'th' ? 'ตำแหน่ง/ห้อง' : 'Room / Location'}
                      </label>
                      <input
                        type="text"
                        value={newRoom}
                        onChange={(e) => setNewRoom(e.target.value)}
                        placeholder={lang === 'th' ? 'เช่น ห้องนอน, ห้องครัว, ห้องนั่งเล่น' : 'e.g. Master Bedroom, Kitchen'}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    {/* Wattage */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex justify-between">
                        <span>{lang === 'th' ? 'กำลังไฟฟ้า (วัตต์ / W) *' : 'Wattage (W) *'}</span>
                        <span className="text-emerald-500 font-mono">{newWatt} W</span>
                      </label>
                      <input
                        type="number"
                        required
                        min={1}
                        max={10000}
                        value={newWatt}
                        onChange={(e) => setNewWatt(Number(e.target.value))}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    {/* Hours */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex justify-between">
                        <span>{lang === 'th' ? 'ชั่วโมงใช้งานต่อวัน *' : 'Usage Hours/Day *'}</span>
                        <span className="text-emerald-500 font-mono">{newHours} {lang === 'th' ? 'ชม.' : 'hrs'}</span>
                      </label>
                      <input
                        type="number"
                        required
                        min={0.1}
                        max={24}
                        step={0.5}
                        value={newHours}
                        onChange={(e) => setNewHours(Number(e.target.value))}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    {/* Efficiency Tag */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {lang === 'th' ? 'ระดับการประหยัดไฟ' : 'Efficiency Rating'}
                      </label>
                      <select
                        value={newEfficiencyTag}
                        onChange={(e) => setNewEfficiencyTag(e.target.value as any)}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <option value="A+++ Eco">{lang === 'th' ? 'A+++ Eco (เบอร์ 5 3 ดาว - ประหยัดสูงสุด)' : 'A+++ Eco (3-Star Label 5 - Highest Efficiency)'}</option>
                        <option value="Good">{lang === 'th' ? 'Good (ประหยัดดีเยี่ยม)' : 'Good (High Efficiency)'}</option>
                        <option value="Average">{lang === 'th' ? 'Average (ระดับปานกลาง)' : 'Average (Standard)'}</option>
                        <option value="Heavy Drinker">{lang === 'th' ? 'Heavy Drinker (กินไฟสูง)' : 'Heavy Drinker (High Energy)'}</option>
                      </select>
                    </div>

                    {/* Icon Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {lang === 'th' ? 'สัญลักษณ์ไอคอน' : 'Appliance Icon'}
                      </label>
                      <select
                        value={newIcon}
                        onChange={(e) => setNewIcon(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <option value="Snowflake">{lang === 'th' ? '❄️ Snowflake (แอร์/เครื่องทำความเย็น)' : '❄️ Snowflake (AC / Cooler)'}</option>
                        <option value="Tv">{lang === 'th' ? '📺 TV (ทีวี/จอมอนิเตอร์)' : '📺 TV (Television / Monitor)'}</option>
                        <option value="Flame">{lang === 'th' ? '🔥 Flame (กาต้มน้ำ/เตาอบ/เครื่องทำน้ำอุ่น)' : '🔥 Flame (Heater / Oven / Kettle)'}</option>
                        <option value="Monitor">{lang === 'th' ? '💻 Monitor (คอมพิวเตอร์/โน้ตบุ๊ก)' : '💻 Monitor (PC / Laptop)'}</option>
                        <option value="Lightbulb">{lang === 'th' ? '💡 Lightbulb (หลอดไฟ/โคมไฟ)' : '💡 Lightbulb (Bulb / Lamp)'}</option>
                        <option value="WashingMachine">{lang === 'th' ? '🧺 Washing Machine (เครื่องซักผ้า)' : '🧺 Washing Machine'}</option>
                        <option value="Refrigerator">{lang === 'th' ? '🧊 Refrigerator (ตู้เย็น)' : '🧊 Refrigerator / Fridge'}</option>
                        <option value="Microwave">{lang === 'th' ? '📻 Microwave (ไมโครเวฟ)' : '📻 Microwave Oven'}</option>
                        <option value="Plug">{lang === 'th' ? '🔌 Plug (ปลั๊กไฟทั่วไป)' : '🔌 Plug (General Electronics)'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Real-time Calculation Box */}
                  {(() => {
                    const calc = calculateCosts(newWatt, newHours);
                    return (
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                          <Zap className="w-4 h-4 fill-current" />
                          <span>{lang === 'th' ? 'ประมาณการการบริโภคพลังงาน (Live Calculation):' : 'Estimated Consumption:'}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/60">
                            <span className="text-[0.65rem] text-slate-400 font-bold block">{lang === 'th' ? 'หน่วย/วัน' : 'kWh/Day'}</span>
                            <span className="font-mono font-extrabold text-xs text-slate-800 dark:text-slate-100">{calc.dailyKwh.toFixed(2)} unit</span>
                          </div>
                          <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/60">
                            <span className="text-[0.65rem] text-slate-400 font-bold block">{lang === 'th' ? 'ค่าไฟ/วัน' : 'Cost/Day'}</span>
                            <span className="font-mono font-extrabold text-xs text-slate-800 dark:text-slate-100">฿{calc.dailyCost.toFixed(2)}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/60">
                            <span className="text-[0.65rem] text-slate-400 font-bold block">{lang === 'th' ? 'ประมาณการ/เดือน' : 'Est. Month'}</span>
                            <span className="font-mono font-extrabold text-xs text-emerald-600 dark:text-emerald-400">฿{calc.monthlyCost.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="flex items-center justify-between gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setAddMode('official_lookup')}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      {lang === 'th' ? '← กลับไปค้นหาฐานข้อมูล กฟผ.' : '← Back to Official Database'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                      >
                        {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-extrabold shadow-md shadow-emerald-500/20 cursor-pointer"
                      >
                        {lang === 'th' ? 'บันทึกเพิ่มเครื่องใช้ไฟฟ้า' : 'Save Appliance'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. MODAL: DEEP SPECIFICATIONS & DIAGNOSTICS */}
      <AnimatePresence>
        {activeModalAppliance && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-2xl p-6 md:p-8 rounded-[2.5rem] border shadow-2xl relative space-y-6 my-8 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <button
                onClick={() => setActiveModalAppliance(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-2xl shrink-0">
                    {getIcon(activeModalAppliance.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-lg md:text-xl">{activeModalAppliance.name}</h3>
                      <span className={`text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full ${
                        activeModalAppliance.status === 'active' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {activeModalAppliance.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {activeModalAppliance.category} • {activeModalAppliance.room || 'ไม่ระบุห้อง'} • {activeModalAppliance.efficiencyTag}
                    </p>
                  </div>
                </div>

                {/* Delete button option */}
                {onDeleteAppliance && (
                  <button
                    onClick={() => {
                      if (activeModalAppliance) {
                        setConfirmDeleteId(activeModalAppliance.id);
                      }
                    }}
                    className="self-start sm:self-center px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{lang === 'th' ? 'ลบอุปกรณ์' : 'Delete'}</span>
                  </button>
                )}
              </div>

              {/* Navigation Tabs inside Modal */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setActiveModalTab('specs')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeModalTab === 'specs'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{lang === 'th' ? 'สเปกไฟฟ้าเชิงลึก' : 'Technical Specs'}</span>
                </button>

                <button
                  onClick={() => setActiveModalTab('costs')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeModalTab === 'costs'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{lang === 'th' ? 'วิเคราะห์ค่าไฟลึก' : 'Cost Breakdown'}</span>
                </button>

                <button
                  onClick={() => setActiveModalTab('ai')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeModalTab === 'ai'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'th' ? 'คำแนะนำ AI' : 'AI Diagnostics'}</span>
                </button>

                <button
                  onClick={() => setActiveModalTab('logs')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeModalTab === 'logs'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{lang === 'th' ? 'ประวัติการดูแลรักษา' : 'Maintenance'}</span>
                </button>
              </div>

              {/* TAB 1: TECHNICAL SPECS */}
              {activeModalTab === 'specs' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[0.65rem] font-bold text-slate-400 block uppercase">
                        {lang === 'th' ? 'กำลังไฟฟ้าพิกัด' : 'Rated Wattage'}
                      </span>
                      <span className="text-sm font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                        {activeModalAppliance.watt} W
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[0.65rem] font-bold text-slate-400 block uppercase">
                        {lang === 'th' ? 'แรงดันไฟฟ้า' : 'Operating Voltage'}
                      </span>
                      <span className="text-sm font-extrabold font-mono text-slate-800 dark:text-slate-200">
                        220V AC (50Hz)
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[0.65rem] font-bold text-slate-400 block uppercase">
                        {lang === 'th' ? 'กระแสไฟฟ้าประมาณการ' : 'Estimated Current'}
                      </span>
                      <span className="text-sm font-extrabold font-mono text-slate-800 dark:text-slate-200">
                        {(activeModalAppliance.watt / (220 * (activeModalAppliance.pf || 0.95))).toFixed(2)} A
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[0.65rem] font-bold text-slate-400 block uppercase">
                        {lang === 'th' ? 'ตัวประกอบกำลัง (PF)' : 'Power Factor'}
                      </span>
                      <span className="text-sm font-extrabold font-mono text-emerald-500">
                        {activeModalAppliance.pf || 0.95}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[0.65rem] font-bold text-slate-400 block uppercase">
                        {lang === 'th' ? 'ระยะเวลาเปิดใช้งาน' : 'Daily Operating'}
                      </span>
                      <span className="text-sm font-extrabold font-mono text-slate-800 dark:text-slate-200">
                        {activeModalAppliance.hours} ชม./วัน
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[0.65rem] font-bold text-slate-400 block uppercase">
                        {lang === 'th' ? 'โหมดประหยัด' : 'Eco Tag'}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                        {activeModalAppliance.efficiencyTag}
                      </span>
                    </div>
                  </div>

                  {/* Electrical Health Index */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>{lang === 'th' ? 'ดัชนีสุขภาพไฟฟ้า (Electrical Health Index)' : 'Electrical Health Index'}</span>
                      </span>
                      <span className="font-mono font-extrabold text-sm text-emerald-500">
                        {activeModalAppliance.healthScore}/100
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${activeModalAppliance.healthScore > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${activeModalAppliance.healthScore}%` }}
                      />
                    </div>
                    <p className="text-[0.7rem] text-slate-500">
                      {activeModalAppliance.healthScore > 90
                        ? (lang === 'th' ? '✅ อุปกรณ์อยู่ในสภาพสมบูรณ์มาก ไม่มีกระแสไฟรั่วไหลหรือความร้อนสูงเกินเกณฑ์' : '✅ Appliance is in excellent health with no current leakages.')
                        : (lang === 'th' ? '⚠️ ควรได้รับการตรวจเช็กหรือทำความสะอาดเพื่อคงประสิทธิภาพการประหยัดไฟ' : '⚠️ Maintenance recommended to preserve power efficiency.')}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: DETAILED COST BREAKDOWN */}
              {activeModalTab === 'costs' && (
                <div className="space-y-4 animate-fade-in">
                  {(() => {
                    const c = calculateCosts(activeModalAppliance.watt, activeModalAppliance.hours);
                    const yearlyCost = c.monthlyCost * 12;
                    const ecoSavingsYear = yearlyCost * 0.15;
                    return (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                            <span className="text-[0.65rem] text-slate-400 font-bold block">{lang === 'th' ? 'ค่าไฟ/ชั่วโมง' : 'Cost/Hour'}</span>
                            <span className="font-mono font-extrabold text-xs">฿{(c.dailyCost / (activeModalAppliance.hours || 1)).toFixed(2)}</span>
                          </div>
                          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                            <span className="text-[0.65rem] text-slate-400 font-bold block">{lang === 'th' ? 'ค่าไฟ/วัน' : 'Cost/Day'}</span>
                            <span className="font-mono font-extrabold text-xs">฿{c.dailyCost.toFixed(2)}</span>
                          </div>
                          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                            <span className="text-[0.65rem] text-emerald-600 dark:text-emerald-400 font-bold block">{lang === 'th' ? 'ค่าไฟ/เดือน' : 'Cost/Month'}</span>
                            <span className="font-mono font-extrabold text-xs text-emerald-600 dark:text-emerald-400">฿{c.monthlyCost.toFixed(2)}</span>
                          </div>
                          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                            <span className="text-[0.65rem] text-slate-400 font-bold block">{lang === 'th' ? 'ประมาณการ/ปี' : 'Est. Year'}</span>
                            <span className="font-mono font-extrabold text-xs">฿{yearlyCost.toFixed(0)}</span>
                          </div>
                        </div>

                        {/* kWh Metrics */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                          <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                            {lang === 'th' ? 'หน่วยไฟฟ้าที่ใช้ (kWh Consumption)' : 'kWh Consumption'}
                          </h4>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">{lang === 'th' ? 'การบริโภคพลังงานต่อเดือน:' : 'Monthly Energy:'}</span>
                            <span className="font-mono font-extrabold text-slate-800 dark:text-slate-200">{c.monthlyKwh.toFixed(1)} kWh</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">{lang === 'th' ? 'ศักยภาพการประหยัดไฟเมื่อเปิดโหมด Eco:' : 'Eco Mode Savings Potential:'}</span>
                            <span className="font-mono font-extrabold text-emerald-500">~฿{ecoSavingsYear.toFixed(0)} /ปี</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* TAB 3: AI DIAGNOSTICS */}
              {activeModalTab === 'ai' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <span>{lang === 'th' ? 'บทวิเคราะห์อัจฉริยะจาก Voltie AI:' : 'Voltie AI Recommendation:'}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      "{lang === 'th' ? activeModalAppliance.aiTip : activeModalAppliance.aiTipEn}"
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>{lang === 'th' ? 'ข้อแนะนำด้านความปลอดภัยและการบำรุงรักษา' : 'Safety & Maintenance Advice'}</span>
                    </h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                      <li>{lang === 'th' ? 'ทำความสะอาดฝุ่นหรือแผ่นกรองทุกๆ 1-3 เดือนเพื่อยืดอายุการใช้งาน' : 'Clean dust filters every 1-3 months to extend lifespan.'}</li>
                      <li>{lang === 'th' ? 'ถอดปลั๊กหรือใช้สวิตช์ตัดไฟเมื่อไม่ได้ใช้งานเพื่อป้องกันกระแสไฟรั่ว (Standby Drain)' : 'Unplug or use smart switch to block standby power drain.'}</li>
                      <li>{lang === 'th' ? 'หมั่นสังเกตสายไฟและเต้ารับ ไม่ให้มีรอยไหม้หรือความร้อนสะสม' : 'Check power cords periodically for overheating.'}</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: MAINTENANCE LOGS */}
              {activeModalTab === 'logs' && (
                <div className="space-y-4 animate-fade-in">
                  {/* Log list */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                      {lang === 'th' ? 'ประวัติบันทึกการดูแลรักษา' : 'Maintenance History'}
                    </h4>
                    {activeModalAppliance.logs && activeModalAppliance.logs.length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {activeModalAppliance.logs.map((log, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span className="font-medium">{log.action}</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[0.65rem] shrink-0">{log.date}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        {lang === 'th' ? 'ยังไม่มีประวัติการซ่อมบำรุงในระบบ' : 'No maintenance logs available'}
                      </p>
                    )}
                  </div>

                  {/* Add Log Form */}
                  <form onSubmit={handleAddLogSubmit} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {lang === 'th' ? '+ เพิ่มประวัติการซ่อมบำรุง/ทำความสะอาดใหม่' : '+ Add Maintenance Log'}
                    </h5>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="date"
                        value={newLogDate}
                        onChange={(e) => setNewLogDate(e.target.value)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      />
                      <input
                        type="text"
                        required
                        value={newLogAction}
                        onChange={(e) => setNewLogAction(e.target.value)}
                        placeholder={lang === 'th' ? 'เช่น ล้างฟิลเตอร์แอร์, เปลี่ยนปลั๊กพ่วง' : 'e.g. Cleaned air filter'}
                        className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shrink-0 cursor-pointer"
                      >
                        {lang === 'th' ? 'บันทึก' : 'Save Log'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setActiveModalAppliance(null)}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                {lang === 'th' ? 'เสร็จสิ้น / ปิดหน้าต่าง' : 'Done / Close'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. CONFIRM DELETE MODAL */}
      <AnimatePresence>
        {confirmDeleteId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-sm p-6 rounded-3xl border shadow-2xl space-y-4 text-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/15 text-rose-500 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base">
                {lang === 'th' ? 'ยืนยันการลบเครื่องใช้ไฟฟ้า?' : 'Confirm Appliance Deletion?'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'th' ? 'การลบอุปกรณ์นี้จะถอนการคำนวณออกจากประมาณการค่าไฟของคุณทันที' : 'Deleting this appliance removes it from billing estimates.'}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold cursor-pointer"
                >
                  {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
                <button
                  onClick={() => {
                    if (onDeleteAppliance && confirmDeleteId !== null) {
                      onDeleteAppliance(confirmDeleteId);
                    }
                    setConfirmDeleteId(null);
                    if (activeModalAppliance && activeModalAppliance.id === confirmDeleteId) {
                      setActiveModalAppliance(null);
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-md shadow-rose-500/20 cursor-pointer"
                >
                  {lang === 'th' ? 'ลบออกทันที' : 'Delete Now'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
