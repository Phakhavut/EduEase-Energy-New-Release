import React, { useState } from 'react';
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
  SlidersHorizontal,
  X,
  Zap,
  ShieldCheck,
  Snowflake,
  Tv,
  Flame,
  Monitor,
  Lightbulb,
  WashingMachine,
  Refrigerator,
  Microwave
} from 'lucide-react';
import { Appliance, InfoDetailMode } from '../../types';
import { SourceBadge } from '../trust/SourceBadge';

interface AppliancesViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  appliances: Appliance[];
  onToggleDeviceStatus: (id: number) => void;
  onUpdateEcoMode: (id: number) => void;
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
}

export const AppliancesView: React.FC<AppliancesViewProps> = ({
  lang,
  isDarkMode,
  appliances,
  onToggleDeviceStatus,
  onUpdateEcoMode,
  infoDetailMode,
  onStartPageTour,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalAppliance, setActiveModalAppliance] = useState<Appliance | null>(null);

  const categories = ['All', 'Cooling', 'Entertainment', 'Kitchen', 'Bathroom', 'Lighting', 'Misc'];

  const filteredAppliances = appliances.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div id="tour-step-appliances" className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. Header & Filters */}
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
            {lang === 'th' ? 'ตรวจเช็กค่าไฟ ประสิทธิภาพการใช้พลังงาน และเปิดโหมดประหยัด' : 'Monitor costs, health scores, and toggle Eco savings mode.'}
          </p>
        </div>

        {/* Search & Category Tabs */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Search */}
          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'th' ? 'ค้นหาเครื่องใช้ไฟฟ้า...' : 'Search appliances...'}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. APPLIANCE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredAppliances.map((app) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-5 rounded-[2rem] border transition-all relative group flex flex-col justify-between ${
              isDarkMode 
                ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/30' 
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
                  <div className="w-full h-full flex items-center justify-center text-emerald-500">
                    {getIcon(app.icon)}
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
                <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white line-clamp-1">
                  {app.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{app.watt}W</span>
                  <span>•</span>
                  <span>{app.hours} hrs/day</span>
                </div>
              </div>

              {/* Costs Breakdown */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-3 space-y-2">
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

              {/* AI Recommendation */}
              <p className="text-[0.7rem] text-slate-500 dark:text-slate-400 italic line-clamp-2 mb-4">
                💡 "{lang === 'th' ? app.aiTip : app.aiTipEn}"
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onToggleDeviceStatus(app.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  app.status === 'active'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
                title="Toggle Power"
              >
                <Power className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveModalAppliance(app)}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs border transition-all ${
                  isDarkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200' : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {lang === 'th' ? 'ดูประวัติ & วิเคราะห์' : 'Diagnostics & History'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* APPLIANCE DIAGNOSTICS MODAL */}
      <AnimatePresence>
        {activeModalAppliance && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-full max-w-lg p-6 rounded-[2.5rem] border shadow-2xl relative space-y-5 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <button
                onClick={() => setActiveModalAppliance(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-xl">
                  {getIcon(activeModalAppliance.icon)}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">{activeModalAppliance.name}</h3>
                  <p className="text-xs text-slate-500">{activeModalAppliance.category} • {activeModalAppliance.watt} Watts</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>{lang === 'th' ? 'คำแนะนำจาก Voltie AI:' : 'Voltie AI Recommendation:'}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {lang === 'th' ? activeModalAppliance.aiTip : activeModalAppliance.aiTipEn}
                </p>
              </div>

              {/* Maintenance Logs */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  {lang === 'th' ? 'ประวัติการดูแลรักษา (Maintenance Logs)' : 'Maintenance History'}
                </h4>
                {activeModalAppliance.logs && activeModalAppliance.logs.length > 0 ? (
                  <div className="space-y-2">
                    {activeModalAppliance.logs.map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>{log.action}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[0.65rem]">{log.date}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    {lang === 'th' ? 'ยังไม่มีประวัติการซ่อมบำรุงในรอบนี้' : 'No maintenance logs in this cycle'}
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveModalAppliance(null)}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs"
              >
                {lang === 'th' ? 'ตกลง' : 'Close'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
