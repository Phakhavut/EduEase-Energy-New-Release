import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { LocationItem, InfoDetailMode } from '../../types';

interface LocationsViewProps {
  locations: LocationItem[];
  currentLocationId: string;
  onSwitchLocation: (id: string) => void;
  onAddLocation: (newLoc: Omit<LocationItem, 'id' | 'estimatedBill' | 'lastUpdated'>) => void;
  isDarkMode: boolean;
  lang: 'th' | 'en';
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
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
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [orgMode, setOrgMode] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [type, setType] = useState<LocationItem['type']>('home');
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [residents, setResidents] = useState(2);
  const [budget, setBudget] = useState(2500);
  const [billingCycleDay, setBillingCycleDay] = useState(25);

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
      isConnected: false,
      memberCount: residents,
      icon: type === 'home' ? 'Home' : type === 'shop' ? 'Store' : type === 'provincial' ? 'Trees' : 'Building2',
    });
    setName('');
    setShowAddModal(false);
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

  return (
    <div id="tour-step-locations" className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-gradient-to-br from-emerald-50 via-teal-50/50 to-emerald-100/30 border-emerald-100 text-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'th' ? 'ระบบจัดการหลายสถานที่' : 'Multi-Location System'}
              </span>

              {onStartPageTour && (
                <button
                  onClick={() => onStartPageTour(1)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                  <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}</span>
                </button>
              )}
              {orgMode && (
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
                  Organization Mode Active
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight">
              {lang === 'th' ? 'สถานที่ของฉัน (My Locations)' : 'My Locations'}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
              {lang === 'th' 
                ? 'สลับดูค่าไฟและควบคุมเครื่องใช้ไฟฟ้าของบ้าน หอพัก ร้านค้า หรือบ้านต่างจังหวัดได้ในที่เดียว' 
                : 'Manage energy budgets, connected devices, and billing status across all your properties.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mode Switcher Button */}
            <button
              onClick={() => setOrgMode(!orgMode)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all shadow-sm ${
                orgMode
                  ? 'bg-purple-600 text-white border-purple-500 shadow-purple-500/25'
                  : isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-white border-emerald-200 text-slate-700 hover:bg-emerald-50'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>{orgMode ? 'โหมดองค์กร (Organization)' : 'เปิดโหมดองค์กร'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'th' ? 'เพิ่มสถานที่ใหม่' : 'Add Location'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Overview Cards (Visible in Org Mode or if > 1 locations) */}
      {(orgMode || locations.length > 1) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-5 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'th' ? 'งบประมาณรวมทั้งพอร์ต' : 'Total Portfolio Budget'}
            </span>
            <div className="text-2xl font-black font-display mt-1 text-slate-800 dark:text-white">
              ฿{totalPortfolioBudget.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">จากทั้งหมด {locations.length} สถานที่</p>
          </div>

          <div className={`p-5 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'th' ? 'ประมาณการค่าไฟรวมเดือนนี้' : 'Total Forecasted Bill'}
            </span>
            <div className="text-2xl font-black font-display mt-1 text-emerald-600 dark:text-emerald-400">
              ฿{totalPortfolioEst.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
              อยู่ในงบประมาณ (-฿{(totalPortfolioBudget - totalPortfolioEst).toLocaleString()})
            </p>
          </div>

          <div className={`p-5 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'th' ? 'สถานะการเชื่อมต่อ ESP32' : 'Connected Hardware'}
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-base font-bold text-slate-800 dark:text-white">
                {locations.filter(l => l.isConnected).length} / {locations.length} สถานที่เชื่อมต่อกล่องสมาร์ทมีเตอร์
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Locations List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {locations.map((loc) => {
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
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
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

                {!isSelected ? (
                  <button
                    onClick={() => onSwitchLocation(loc.id)}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
                  >
                    <span>{lang === 'th' ? 'สลับมาใช้อันนี้' : 'Switch Here'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    {lang === 'th' ? 'กำลังแสดงผลบนแดชบอร์ด' : 'Currently Viewing'}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

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
                    placeholder="เช่น บ้านสวนเชียงใหม่, ร้านกาแฟ"
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
                      <option value="home">บ้านพักอาศัย (Home)</option>
                      <option value="dorm">หอพัก / คอนโด (Dorm/Condo)</option>
                      <option value="provincial">บ้านต่างจังหวัด (Provincial)</option>
                      <option value="shop">ร้านค้า / คาเฟ่ (Shop/Cafe)</option>
                      <option value="office">อาคารสำนักงาน (Office)</option>
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
