import React, { useState } from 'react';
import { Database, UserCheck, Zap, Activity, ShieldCheck, HelpCircle, Sparkles, FileText, Info } from 'lucide-react';
import { SourceTypeLabel } from '../../types';

interface SourceBadgeProps {
  source: SourceTypeLabel;
  lang?: 'th' | 'en';
  showTooltip?: boolean;
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({
  source,
  lang = 'th',
  showTooltip = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSourceConfig = () => {
    switch (source) {
      case 'user':
        return {
          labelTh: 'กรอกโดยผู้ใช้',
          labelEn: 'User Input',
          icon: UserCheck,
          cls: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
          descTh: 'ข้อมูลนี้มาจากการป้อนข้อมูลโดยตรงของคุณในแอปพลิเคชัน',
          descEn: 'Direct input provided manually by the user in the app.'
        };
      case 'measured':
        return {
          labelTh: 'วัดจากเซนเซอร์ ESP32',
          labelEn: 'ESP32 Measured',
          icon: Activity,
          cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          descTh: 'วัดค่ากระแสและกำลังไฟฟ้าจริงแบบเรียลไทม์จากมิเตอร์หรือปลั๊กอัจฉริยะ',
          descEn: 'Measured in real-time from ESP32 smart meter or plug sensor.'
        };
      case 'predicted':
        return {
          labelTh: 'คาดการณ์โดย AI',
          labelEn: 'AI Prediction',
          icon: Sparkles,
          cls: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
          descTh: 'คำนวณและประมวลผลล่วงหน้าโดยใช้โมเดลฟิสิกส์ไฟฟ้าและ AI Reasoning',
          descEn: 'Predicted using electrical physics models and AI reasoning engines.'
        };
      case 'historical':
        return {
          labelTh: 'ค่าเฉลี่ยย้อนหลัง',
          labelEn: 'Historical Average',
          icon: Database,
          cls: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
          descTh: 'อ้างอิงจากข้อมูลสถิติการใช้งานไฟฟ้าในอดีตของคุณย้อนหลัง 30-90 วัน',
          descEn: 'Based on 30-90 days of historical energy consumption data.'
        };
      case 'tariff':
        return {
          labelTh: 'อัตราภาครัฐ (PEA/MEA)',
          labelEn: 'Govt Tariff (PEA/MEA)',
          icon: FileText,
          cls: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
          descTh: 'อ้างอิงจากโครงสร้างอัตราค่าไฟทางการของการไฟฟ้าส่วนภูมิภาค / นครหลวง',
          descEn: 'Based on official electricity tariff structures from PEA / MEA.'
        };
      case 'default':
        return {
          labelTh: 'ค่ามาตรฐานตั้งต้น',
          labelEn: 'Default System Value',
          icon: HelpCircle,
          cls: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30',
          descTh: 'ค่าสเปกมาตรฐานทั่วไป ใช้ชั่วคราวก่อนที่จะบันทึกค่าจริง',
          descEn: 'Default fallback value used temporarily until real input is set.'
        };
      case 'estimated':
      default:
        return {
          labelTh: 'ประเมินทางวิศวกรรม',
          labelEn: 'Estimated Value',
          icon: Zap,
          cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
          descTh: 'คำนวณประเมินจากกำลังวัตต์สเปกและพฤติกรรมใช้งานทั่วไป',
          descEn: 'Estimated based on rated wattage and typical usage behaviors.'
        };
    }
  };

  const config = getSourceConfig();
  const Icon = config.icon;

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => showTooltip && setIsOpen(!isOpen)}
        onMouseEnter={() => showTooltip && setIsOpen(true)}
        onMouseLeave={() => showTooltip && setIsOpen(false)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-bold border transition-all cursor-pointer font-mono ${config.cls}`}
      >
        <Icon className="w-3 h-3 shrink-0" />
        <span>[{lang === 'th' ? config.labelTh : config.labelEn}]</span>
      </button>

      {/* Tooltip Popover */}
      {showTooltip && isOpen && (
        <div className="absolute left-0 bottom-full mb-2 z-50 w-64 p-3 rounded-xl bg-slate-900 text-white text-xs shadow-xl border border-slate-800 animate-fade-in pointer-events-none">
          <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{lang === 'th' ? 'แหล่งที่มาของข้อมูล:' : 'Data Source Info:'}</span>
          </div>
          <p className="text-[0.72rem] text-slate-300 font-sans leading-relaxed">
            {lang === 'th' ? config.descTh : config.descEn}
          </p>
        </div>
      )}
    </div>
  );
};
