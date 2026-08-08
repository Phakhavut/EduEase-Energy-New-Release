import React from 'react';
import { HelpCircle, Info, Sparkles, CheckCircle2 } from 'lucide-react';

interface AssumptionItem {
  keyTh: string;
  keyEn: string;
  valueTh: string;
  valueEn: string;
}

interface AssumptionCardProps {
  assumptions?: AssumptionItem[];
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
}

export const AssumptionCard: React.FC<AssumptionCardProps> = ({
  assumptions = [
    { keyTh: 'ชั่วโมงเปิดแอร์คาดการณ์', keyEn: 'Est. AC Runtime', valueTh: '6 ชั่วโมง / วัน', valueEn: '6 Hours / Day' },
    { keyTh: 'ประเภทอัตราค่าไฟ', keyEn: 'Tariff Type', valueTh: 'บ้านพักอาศัย อัตรา 1.1.2 PEA', valueEn: 'Residential Tariff Type 1.1.2 PEA' },
    { keyTh: 'อัตราค่า Ft ประจำงวด', keyEn: 'Current Ft Rate', valueTh: '-0.1532 บาท / หน่วย', valueEn: '-0.1532 THB / kWh' },
    { keyTh: 'ผลกระทบสภาพอากาศ', keyEn: 'Weather Impact', valueTh: 'ฤดูร้อน อุณหภูมิเฉลี่ย 36°C (+12% AC Load)', valueEn: 'Summer Season 36°C (+12% AC Load)' }
  ],
  lang = 'th',
  isDarkMode = false,
}) => {
  return (
    <div className={`p-4 rounded-2xl border space-y-2.5 ${
      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-extrabold text-xs uppercase tracking-wider font-display">
        <HelpCircle className="w-4 h-4" />
        <span>{lang === 'th' ? 'ข้อสันนิษฐานของระบบ (Calculation Assumptions):' : 'Calculation Assumptions:'}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {assumptions.map((item, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between gap-2"
          >
            <span className="text-slate-500 dark:text-slate-400 font-bold">
              {lang === 'th' ? item.keyTh : item.keyEn}:
            </span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 font-mono text-right">
              {lang === 'th' ? item.valueTh : item.valueEn}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
