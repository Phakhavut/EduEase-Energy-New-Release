import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Zap, 
  Clock, 
  HelpCircle, 
  Sliders, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Flame, 
  Sparkles, 
  Check, 
  ArrowRight,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { Appliance, InfoDetailMode } from '../../types';

interface ApplianceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliance: Appliance | null;
  allAppliances?: Appliance[];
  lang: 'th' | 'en';
  isDarkMode: boolean;
  infoDetailMode?: InfoDetailMode;
  onOpenWhatIf?: () => void;
}

export const ApplianceDetailModal: React.FC<ApplianceDetailModalProps> = ({
  isOpen,
  onClose,
  appliance,
  allAppliances = [],
  lang,
  isDarkMode,
  infoDetailMode = 'balanced',
  onOpenWhatIf
}) => {
  const [whatIfHours, setWhatIfHours] = useState<number>(() => appliance ? Math.max(1, appliance.hours - 1) : 4);

  if (!isOpen || !appliance) return null;

  const hours = appliance.hours || 5.2;
  const watt = appliance.watt || 1200;
  const monthlyKwh = Math.round((watt * hours * 30) / 1000);
  const monthlyCost = appliance.monthlyCost || Math.round(monthlyKwh * 4.70);

  // What-if calculation on slider
  const whatIfMonthlyCost = Math.round((watt * whatIfHours * 30 / 1000) * 4.70);
  const potentialMonthlySaving = Math.max(0, monthlyCost - whatIfMonthlyCost);

  // 24h heatmap slots (0 to 23)
  const isNightPeakHour = (h: number) => h >= 18 && h <= 23;

  // Comparison items (e.g. top 3)
  const top3 = allAppliances.length > 0
    ? [...allAppliances].sort((a, b) => (b.monthlyCost || 0) - (a.monthlyCost || 0)).slice(0, 3)
    : [
        { id: 1, name: 'Air Conditioner (แอร์)', monthlyCost: 618, percent: 48, icon: '❄️' },
        { id: 2, name: 'Computer (คอมพิวเตอร์)', monthlyCost: 270, percent: 21, icon: '💻' },
        { id: 3, name: 'Water Heater (เครื่องทำน้ำอุ่น)', monthlyCost: 180, percent: 14, icon: '🚿' },
      ];

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/75 backdrop-blur-sm">
        <div className="min-h-full flex items-center justify-center p-4 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-white' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
          {/* Top Bar: Appliance Name & Monthly Cost */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl font-bold border border-emerald-500/20">
                {appliance.icon || '⚡'}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                  {appliance.name}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'ค่าไฟประมาณการปัจจุบัน:' : 'Current Estimated Cost:'}
                  </span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    ≈ ฿{monthlyCost.toLocaleString()} {lang === 'th' ? '/เดือน' : '/month'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-2xl transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* 1. WHY THIS COST? */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-emerald-500" />
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {lang === 'th' ? 'ทำไมถึงมีค่าไฟเท่านี้? (WHY THIS COST?)' : 'WHY THIS COST?'}
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'th' ? 'ชั่วโมงใช้งาน' : 'Usage'}</div>
                  <div className="text-base font-black mt-0.5">{hours} {lang === 'th' ? 'ชม./วัน' : 'hr/day'}</div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'th' ? 'กำลังไฟฟ้า' : 'Power'}</div>
                  <div className="text-base font-black mt-0.5">{watt.toLocaleString()} W</div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'th' ? 'หน่วยไฟคาดการณ์' : 'Est. Units'}</div>
                  <div className="text-base font-black mt-0.5 font-mono">{monthlyKwh} kWh</div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'th' ? 'ค่าไฟประมาณการ' : 'Est. Cost'}</div>
                  <div className="text-base font-black mt-0.5 font-mono text-emerald-600 dark:text-emerald-400">
                    ฿{monthlyCost.toLocaleString()}
                  </div>
                </div>
              </div>

              {infoDetailMode === 'detailed' && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {lang === 'th' ? 'สูตรคำนวณ: ' : 'Formula: '}
                  {watt}W × {hours}h × 30 วัน ÷ 1,000 × ฿4.70/หน่วย = ฿{monthlyCost.toLocaleString()}
                </div>
              )}
            </div>

            {/* 2. WHEN? (24-Hour Usage Heatmap) */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {lang === 'th' ? 'ช่วงเวลาไหนที่กินไฟมากที่สุด? (WHEN?)' : 'WHEN DOES IT CONSUME?'}
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-rose-500 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                  {lang === 'th' ? 'พีคช่วง 18:00–23:00 🔥' : 'Peak: 18:00–23:00 🔥'}
                </span>
              </div>

              {/* 24-hour visual bar */}
              <div className="grid grid-cols-12 gap-1 mb-2">
                {Array.from({ length: 24 }).map((_, i) => {
                  const isPeak = isNightPeakHour(i);
                  const isDaytime = i >= 12 && i <= 17;
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className={`w-full h-8 rounded-md transition-all ${
                          isPeak 
                            ? 'bg-rose-500 hover:bg-rose-400 shadow-sm' 
                            : isDaytime 
                              ? 'bg-amber-400/70 hover:bg-amber-400' 
                              : isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                        title={`${i}:00 - ${i+1}:00 ${isPeak ? '(ช่วงใช้งานหนัก)' : ''}`}
                      />
                      <span className="text-[8px] text-slate-400 font-mono mt-1">
                        {i % 4 === 0 ? `${i}h` : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {lang === 'th'
                  ? 'อุปกรณ์นี้มีการใช้งานหนาแน่นที่สุดช่วงหัวค่ำ 18:00–23:00 ซึ่งเป็นช่วงที่ห้องสะสมความร้อน ทำให้คอมเพรสเซอร์ทำงานหนัก'
                  : 'Usage surges between 18:00–23:00 when ambient indoor heat forces maximum compressor duty.'}
              </p>
            </div>

            {/* 3. COMPARE (Top Contributors) */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {lang === 'th' ? 'เปรียบเทียบกับเครื่องอื่นในบ้าน (COMPARE)' : 'COMPARE WITH OTHER APPLIANCES'}
                </h4>
              </div>

              <div className="space-y-2">
                {top3.map((item, idx) => {
                  const isCurrent = item.name.toLowerCase().includes(appliance.name.toLowerCase()) || idx === 0;
                  return (
                    <div 
                      key={item.id || idx}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                        isCurrent
                          ? isDarkMode 
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-white' 
                            : 'bg-emerald-50 border border-emerald-300 text-slate-900 font-black'
                          : isDarkMode ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.icon || (idx === 0 ? '❄️' : idx === 1 ? '💻' : '🚿')}</span>
                        <span>{item.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold">
                            {lang === 'th' ? 'เครื่องนี้' : 'This Device'}
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-right">
                        <span>≈ ฿{(item.monthlyCost || 0).toLocaleString()}/ด.</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. WHAT IF? (Behavior Simulation Slider) */}
            <div className={`p-5 rounded-2xl border transition-all ${
              isDarkMode 
                ? 'bg-gradient-to-br from-emerald-950/40 to-slate-900 border-emerald-500/30' 
                : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-sm font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {lang === 'th' ? 'ถ้าฉันลดเวลาเปิดลงล่ะ? (WHAT IF?)' : 'WHAT IF I REDUCE RUNTIME?'}
                  </h4>
                </div>
                {potentialMonthlySaving > 0 && (
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {lang === 'th' ? `ประหยัดได้ ฿${potentialMonthlySaving}/เดือน` : `Save ฿${potentialMonthlySaving}/mo`}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  <span>{lang === 'th' ? 'ปรับเวลาใช้งานต่อวัน:' : 'Usage per day:'}</span>
                  <span className="font-black text-slate-900 dark:text-white">
                    {hours} ชม. ➔ <span className="text-emerald-500">{whatIfHours} ชม./วัน</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={Math.max(6, Math.ceil(hours))}
                  step="0.5"
                  value={whatIfHours}
                  onChange={(e) => setWhatIfHours(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th'
                    ? `คาดการณ์ค่าไฟใหม่: ฿${whatIfMonthlyCost.toLocaleString()}/เดือน`
                    : `New projected cost: ฿${whatIfMonthlyCost.toLocaleString()}/month`}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenWhatIf) {
                      onClose();
                      onOpenWhatIf();
                    } else {
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>{lang === 'th' ? 'ลองเปลี่ยนแผนนี้' : 'Apply Plan'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
