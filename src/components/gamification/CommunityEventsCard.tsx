import React from 'react';
import { motion } from 'motion/react';
import { Globe, Users, Sparkles, Trophy, Calendar } from 'lucide-react';

interface CommunityEventsCardProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const CommunityEventsCard: React.FC<CommunityEventsCardProps> = ({
  lang,
  isDarkMode
}) => {
  const currentProgressKwh = 12450;
  const targetProgressKwh = 20000;
  const pct = Math.round((currentProgressKwh / targetProgressKwh) * 100);

  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800' 
        : 'bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 border-emerald-100 shadow-sm'
    }`}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-500">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span>{lang === 'th' ? 'แคมเปญวันคุ้มครองโลก (Earth Day Challenge)' : 'Earth Day Saving Challenge'}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[0.65rem]">
                Live Event 🌍
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {lang === 'th' ? 'ร่วมมือกับเพื่อนๆ ชุมชนผู้ใช้ EduEase Energy ลดการใช้พลังงานรวมทั้งประเทศ' : 'Collaborate with the EduEase community to reduce nationwide energy demand'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-500">{lang === 'th' ? 'เป้าหมายรวมชุมชน:' : 'Community Goal Progress:'}</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">{currentProgressKwh.toLocaleString()} / {targetProgressKwh.toLocaleString()} kWh ({pct}%)</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="flex items-center justify-between text-[0.68rem] text-slate-400 font-medium pt-1">
          <span className="flex items-center gap-1"><Users className="w-3 h-3 text-emerald-500" /> 1,420 Active Savers Participating</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-amber-500" /> Ends in 3 Days</span>
        </div>
      </div>
    </div>
  );
};
