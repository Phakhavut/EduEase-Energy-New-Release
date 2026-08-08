import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Info, 
  DollarSign, 
  Sparkles, 
  Calculator
} from 'lucide-react';
import { InfoDetailMode } from '../../types';

interface ExplainMyBillCardProps {
  mode: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  kwhUsed?: number;
  baseRatePerUnit?: number;
  ftRatePerUnit?: number;
  serviceFee?: number;
}

export const ExplainMyBillCard: React.FC<ExplainMyBillCardProps> = ({
  mode,
  lang,
  isDarkMode,
  kwhUsed = 298,
  baseRatePerUnit = 4.20,
  ftRatePerUnit = -0.1532,
  serviceFee = 38.22,
}) => {
  const [showTechnicalFormula, setShowTechnicalFormula] = useState(false);

  // Bill Calculations
  const energyBaseCost = kwhUsed * baseRatePerUnit;
  const ftTotalCost = kwhUsed * ftRatePerUnit;
  const subtotalBeforeVat = energyBaseCost + ftTotalCost + serviceFee;
  const vatCost = subtotalBeforeVat * 0.07;
  const netTotalCost = subtotalBeforeVat + vatCost;

  return (
    <div className={`p-6 rounded-[2.5rem] border shadow-sm transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-teal-500/10 text-teal-500 border border-teal-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'อธิบายบิลค่าไฟอย่างโปร่งใส (Explain My Bill)' : 'Transparent Bill Breakdown'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'เข้าใจที่มาของทุกบาททุกสตางค์ในบิลค่าไฟฟ้าของคุณ' : 'Understand where every Baht on your electricity bill comes from'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowTechnicalFormula(!showTechnicalFormula)}
          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs text-slate-600 dark:text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Calculator className="w-3.5 h-3.5 text-teal-500" />
          <span>{showTechnicalFormula ? 'ซ่อนสูตร' : 'ดูสูตรคำนวณ'}</span>
        </button>
      </div>

      {/* Main Breakdown Rows */}
      <div className="space-y-3 font-mono">
        {/* Row 1: Base Energy Charge */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
          <div>
            <div className="font-sans font-bold text-sm text-slate-900 dark:text-white">
              {lang === 'th' ? '1. ค่าพลังงานไฟฟ้าฐาน (Base Energy Charge)' : '1. Base Energy Charge'}
            </div>
            <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'th' ? `คิดจากจำนวนหน่วยที่ใช้จริง (${kwhUsed} kWh × ฿${baseRatePerUnit.toFixed(2)})` : `Actual kWh used (${kwhUsed} kWh × ฿${baseRatePerUnit.toFixed(2)})`}
            </p>
          </div>
          <div className="font-black text-base text-slate-900 dark:text-white shrink-0">
            ฿{energyBaseCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        {/* Row 2: Ft Adjustment */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
          <div>
            <div className="font-sans font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{lang === 'th' ? '2. ค่าไฟฟ้าผันแปร (Ft Rate Adjustment)' : '2. Ft Rate Adjustment'}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[0.65rem] font-bold">
                {ftRatePerUnit < 0 ? 'ลดหย่อน' : 'เพิ่มขึ้น'}
              </span>
            </div>
            <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'th' ? `ต้นทุนเชื้อเพลิงผลิตไฟ (${kwhUsed} kWh × ฿${ftRatePerUnit})` : `Fuel adjustment (${kwhUsed} kWh × ฿${ftRatePerUnit})`}
            </p>
          </div>
          <div className={`font-black text-base shrink-0 ${ftTotalCost < 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
            {ftTotalCost < 0 ? '-' : '+'}฿{Math.abs(ftTotalCost).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        {/* Row 3: Monthly Service Fee */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
          <div>
            <div className="font-sans font-bold text-sm text-slate-900 dark:text-white">
              {lang === 'th' ? '3. ค่าบริการรายเดือน (Monthly Service Fee)' : '3. Monthly Service Fee'}
            </div>
            <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'th' ? 'ค่าจดหน่วยและรักษามิเตอร์ของการไฟฟ้า (อัตราคงที่ 38.22 บาท)' : 'Monthly meter maintenance fee (Fixed 38.22 THB)'}
            </p>
          </div>
          <div className="font-black text-base text-slate-900 dark:text-white shrink-0">
            ฿{serviceFee.toFixed(2)}
          </div>
        </div>

        {/* Row 4: VAT 7% */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
          <div>
            <div className="font-sans font-bold text-sm text-slate-900 dark:text-white">
              {lang === 'th' ? '4. ภาษีมูลค่าเพิ่ม (VAT 7%)' : '4. Value Added Tax (VAT 7%)'}
            </div>
            <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'th' ? 'คำนวณ 7% จากยอดรวมข้อ 1 + 2 + 3' : '7% calculated from subtotal of items 1, 2, and 3'}
            </p>
          </div>
          <div className="font-black text-base text-slate-900 dark:text-white shrink-0">
            ฿{vatCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        {/* Total Summary Row */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex items-center justify-between gap-3 shadow-lg shadow-teal-500/20">
          <div>
            <span className="font-sans font-extrabold text-xs uppercase tracking-wider text-teal-100 block">
              {lang === 'th' ? 'ยอดรวมบิลสุทธิ (Net Total Bill)' : 'Net Total Bill'}
            </span>
            <span className="font-sans text-xs text-teal-100">
              {lang === 'th' ? `ประจำงวดชำระ (${kwhUsed} kWh)` : `Billing period (${kwhUsed} kWh)`}
            </span>
          </div>

          <div className="text-right">
            <div className="text-2xl md:text-3xl font-black font-mono">
              ฿{netTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Formula Expandable Section */}
      <AnimatePresence>
        {(showTechnicalFormula || mode === 'detailed') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono border border-slate-800 space-y-2"
          >
            <div className="text-emerald-400 font-bold font-sans flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              <span>{lang === 'th' ? 'สูตรคณิตศาสตร์คำนวณบิล (PEA Tariff Formula):' : 'PEA Tariff Formula:'}</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              Total = [ (kWh × BaseRate) + (kWh × Ft) + ServiceFee ] × 1.07
            </p>
            <p className="leading-relaxed text-slate-400 text-[0.7rem]">
              = [ ({kwhUsed} × {baseRatePerUnit}) + ({kwhUsed} × {ftRatePerUnit}) + {serviceFee} ] × 1.07
              <br />
              = [ {energyBaseCost.toFixed(2)} + ({ftTotalCost.toFixed(2)}) + {serviceFee.toFixed(2)} ] × 1.07
              <br />
              = {subtotalBeforeVat.toFixed(2)} × 1.07 = <strong>฿{netTotalCost.toFixed(2)}</strong>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
