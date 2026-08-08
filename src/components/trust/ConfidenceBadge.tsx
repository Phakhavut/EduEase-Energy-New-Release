import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, HelpCircle, Info } from 'lucide-react';
import { ConfidenceLevel } from '../../types';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel | number; // String level or percentage number (0-100)
  reasonTh?: string;
  reasonEn?: string;
  lang?: 'th' | 'en';
  showReason?: boolean;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  level,
  reasonTh,
  reasonEn,
  lang = 'th',
  showReason = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let numPct = 85;
  let normLevel: ConfidenceLevel = 'medium';

  if (typeof level === 'number') {
    numPct = level;
    if (level >= 88) normLevel = 'high';
    else if (level >= 70) normLevel = 'medium';
    else normLevel = 'low';
  } else {
    normLevel = level;
    numPct = level === 'high' ? 92 : level === 'medium' ? 78 : 55;
  }

  const getConfig = () => {
    switch (normLevel) {
      case 'high':
        return {
          labelTh: `ความเชื่อมั่นสูง (${numPct}%)`,
          labelEn: `High Confidence (${numPct}%)`,
          cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          defaultReasonTh: 'คำนวณจากข้อมูลเซนเซอร์จริงย้อนหลังเกิน 30 วัน ร่วมกับพฤติกรรมใช้งานที่เสถียร',
          defaultReasonEn: 'Calculated from 30+ days of real sensor measurements with stable usage patterns.'
        };
      case 'medium':
        return {
          labelTh: `ความเชื่อมั่นปานกลาง (${numPct}%)`,
          labelEn: `Medium Confidence (${numPct}%)`,
          cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
          defaultReasonTh: 'อ้างอิงจากการประมาณการชั่วโมงใช้งานร่วมกับสเปกเครื่องใช้ไฟฟ้า',
          defaultReasonEn: 'Estimated using specified wattage ratings combined with reported usage hours.'
        };
      case 'low':
      default:
        return {
          labelTh: `ความเชื่อมั่นต่ำ (${numPct}%)`,
          labelEn: `Low Confidence (${numPct}%)`,
          cls: 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30',
          defaultReasonTh: 'มีข้อมูลไม่ครบถ้วน จำเป็นต้องกรอกวัตต์หรือเชื่อมต่อเซนเซอร์เพื่อเพิ่มความแม่นยำ',
          defaultReasonEn: 'Incomplete data. Add appliance wattage or connect sensor to improve accuracy.'
        };
    }
  };

  const config = getConfig();

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => showReason && setIsOpen(!isOpen)}
        onMouseEnter={() => showReason && setIsOpen(true)}
        onMouseLeave={() => showReason && setIsOpen(false)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-bold border font-mono transition-all cursor-pointer ${config.cls}`}
      >
        <ShieldCheck className="w-3 h-3 shrink-0" />
        <span>{lang === 'th' ? config.labelTh : config.labelEn}</span>
      </button>

      {/* Tooltip Popup */}
      {showReason && isOpen && (
        <div className="absolute left-0 bottom-full mb-2 z-50 w-64 p-3 rounded-xl bg-slate-900 text-white text-xs shadow-xl border border-slate-800 animate-fade-in pointer-events-none">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{lang === 'th' ? 'เหตุผลของระดับความเชื่อมั่น:' : 'Confidence Rationale:'}</span>
          </div>
          <p className="text-[0.72rem] text-slate-300 font-sans leading-relaxed">
            {lang === 'th' ? (reasonTh || config.defaultReasonTh) : (reasonEn || config.defaultReasonEn)}
          </p>
        </div>
      )}
    </div>
  );
};
