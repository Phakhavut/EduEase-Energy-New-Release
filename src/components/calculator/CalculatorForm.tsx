import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  HelpCircle, 
  Tv, 
  Flame, 
  Lightbulb, 
  Laptop, 
  Wind, 
  Plus, 
  Trash2, 
} from 'lucide-react';
import { ApplianceInput } from '../../types/savings.types';

interface CalculatorFormProps {
  appliances: ApplianceInput[];
  customHabits: string;
  setCustomHabits: (habits: string) => void;
  loading: boolean;
  lang: 'th' | 'en';
  onUpdateAppliance: (id: string, updates: Partial<ApplianceInput>) => void;
  onDeleteAppliance: (id: string) => void;
  onCalculate: () => void;
  onAddCustomClick: () => void;
}

const getApplianceIcon = (id: string) => {
  switch (id) {
    case 'ac': return Wind;
    case 'lighting': return Lightbulb;
    case 'fridge': return Flame;
    case 'computer': return Laptop;
    case 'waterheater': return HelpCircle;
    default: return Tv;
  }
};

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  appliances,
  customHabits,
  setCustomHabits,
  loading,
  lang,
  onUpdateAppliance,
  onDeleteAppliance,
  onCalculate,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 rounded-2.5xl bg-slate-50/50 dark:bg-slate-950/10 border border-slate-150 dark:border-slate-850/40">
        <h5 className="text-[11px] font-black font-display text-slate-400 dark:text-slate-100 uppercase tracking-wider mb-3">
          {lang === 'th' ? 'ระบุระยะเวลาใช้อุปกรณ์ต่อวัน' : 'ACTIVE APPLIANCE PROFILES'}
        </h5>

        <div className="flex flex-col gap-3">
          {appliances.map((app) => {
            const Icon = getApplianceIcon(app.id);
            return (
              <div 
                key={app.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-850 shadow-sm flex flex-col gap-3.5"
              >
                {/* Header line for appliance */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-100">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {lang === 'th' ? app.nameTh : app.name}
                      </span>
                      <span className="text-[9px] font-mono font-semibold text-slate-400 block mt-0.5">
                        {app.count} {lang === 'th' ? 'เครื่อง' : 'unit(s)'}
                      </span>
                    </div>
                  </div>

                  {/* Controls count / delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onUpdateAppliance(app.id, { count: Math.max(1, app.count - 1) })}
                      className="w-5.5 h-5.5 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold font-mono">{app.count}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateAppliance(app.id, { count: app.count + 1 })}
                      className="w-5.5 h-5.5 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteAppliance(app.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors ml-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Hours slider and values */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                    <span>{lang === 'th' ? 'ระยะเวลาใช้เฉลี่ย:' : 'Avg. Hours/Day:'}</span>
                    <span className="font-mono text-slate-700 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      {app.hoursPerDay} {lang === 'th' ? 'ชม./วัน' : 'hrs/day'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="0.5"
                    value={app.hoursPerDay}
                    onChange={(e) => onUpdateAppliance(app.id, { hoursPerDay: Number(e.target.value) })}
                    className="w-full accent-sky-500 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Dynamic parameter options (AC custom temp or checkboxes) */}
                <div className="grid grid-cols-2 gap-2 mt-1 border-t border-dashed border-slate-100 dark:border-slate-800/60 pt-2.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={app.isEnergyStar}
                      onChange={(e) => onUpdateAppliance(app.id, { isEnergyStar: e.target.checked })}
                      className="rounded text-sky-500 border-slate-300 dark:border-slate-700 bg-transparent h-3.5 w-3.5 focus:ring-sky-500"
                    />
                    <span className="text-[9.5px] font-semibold text-slate-500 dark:text-slate-100">
                      {lang === 'th' ? 'เบอร์ 5 ประหยัดไฟ' : 'Energy Star / Efficient'}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={app.standbyOff}
                      onChange={(e) => onUpdateAppliance(app.id, { standbyOff: e.target.checked })}
                      className="rounded text-sky-500 border-slate-300 dark:border-slate-700 bg-transparent h-3.5 w-3.5 focus:ring-sky-500"
                    />
                    <span className="text-[9.5px] font-semibold text-slate-500 dark:text-slate-100">
                      {lang === 'th' ? 'ถอดปลั๊กทุกครั้ง' : 'Sever Standby Power'}
                    </span>
                  </label>

                  {app.id === 'ac' && (
                    <div className="col-span-2 flex items-center justify-between mt-1.5 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl border border-slate-150 dark:border-slate-800">
                      <span className="text-[9.5px] font-bold text-slate-500">
                        {lang === 'th' ? 'อุณหภูมิตั้งค่าปัจจุบัน:' : 'Active Temperature Target:'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onUpdateAppliance(app.id, { tempSetting: Math.max(18, (app.tempSetting || 25) - 1) })}
                          className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-[10px] font-bold rounded"
                        >
                          -
                        </button>
                        <span className="text-xs font-black font-mono px-1">{app.tempSetting || 25}°C</span>
                        <button
                          type="button"
                          onClick={() => onUpdateAppliance(app.id, { tempSetting: Math.min(30, (app.tempSetting || 25) + 1) })}
                          className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-[10px] font-bold rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom text-area context habits */}
      <div className="p-4 rounded-2.5xl bg-slate-50/50 dark:bg-slate-950/10 border border-slate-150 dark:border-slate-850/40 flex flex-col gap-3">
        <label htmlFor="custom-habits-textarea" className="text-[11px] font-black font-display text-slate-400 dark:text-slate-100 uppercase tracking-wider block">
          {lang === 'th' ? 'พฤติกรรมใช้ไฟเฉพาะบุคคล หรืออุปกรณ์เพิ่มเติม' : 'DESCRIBE CUSTOM HABITS OR EXTRA DEVICES'}
        </label>
        <textarea
          id="custom-habits-textarea"
          rows={2.5}
          value={customHabits}
          onChange={(e) => setCustomHabits(e.target.value)}
          placeholder={lang === 'th' 
            ? 'เช่น "ฉันเปิดพัดลมควบคู่แอร์ตอนเข้านอน" หรือ "มีการชาร์จรถไฟฟ้าสัปดาห์ละ 2 ครั้งตอนเที่ยงคืน"...' 
            : 'e.g. "I run a room fan simultaneously with the AC at night", "EV fast charging is triggered twice weekly off-peak"...'}
          className="w-full text-xs p-3 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-850 focus:border-sky-500 focus:outline-none placeholder-slate-400 text-slate-700 dark:text-slate-100 transition-all resize-none"
        />
      </div>

      {/* Generate Action Button */}
      <button
        type="button"
        disabled={loading || appliances.length === 0}
        onClick={onCalculate}
        className="w-full py-4 px-6 rounded-2.5xl font-bold font-display text-xs tracking-tight bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>{lang === 'th' ? 'กำลังส่งข้อมูลวิเคราะห์โดย AI...' : 'AI Compiling Thermodynamic Profile...'}</span>
          </>
        ) : (
          <>
            <Cpu className="w-4.5 h-4.5" />
            <span>{lang === 'th' ? 'คำนวณและสร้างแผนประหยัดไฟโดย AI' : 'Calculate & Plan Savings with AI'}</span>
          </>
        )}
      </button>
    </div>
  );
};
