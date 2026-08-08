import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ChevronDown, ChevronUp, Info, FileText, CheckCircle2 } from 'lucide-react';
import { CalculationTraceData, InfoDetailMode } from '../../types';
import { SourceBadge } from './SourceBadge';

interface CalculationTreeProps {
  traceData?: CalculationTraceData;
  mode?: InfoDetailMode;
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
}

export const CalculationTree: React.FC<CalculationTreeProps> = ({
  traceData = {
    totalBillThb: 1248.52,
    kwhUsed: 298,
    baseRateThbPerUnit: 4.20,
    ftRateThbPerUnit: -0.1532,
    serviceFeeThb: 38.22,
    vatPct: 7,
    steps: [
      {
        stepNameTh: '1. ค่าพลังงานไฟฟ้าฐาน (Base Energy)',
        stepNameEn: '1. Base Energy Charge',
        formulaTh: '298 kWh × ฿4.2000',
        formulaEn: '298 kWh × ฿4.2000',
        valueThb: 1251.60,
        source: 'user',
        assumptionsTh: 'อัตราก้าวหน้าประเภท 1.1.2 PEA'
      },
      {
        stepNameTh: '2. ค่า Ft ผันแปร (Ft Rate)',
        stepNameEn: '2. Ft Adjustment Rate',
        formulaTh: '298 kWh × (-฿0.1532)',
        formulaEn: '298 kWh × (-฿0.1532)',
        valueThb: -45.65,
        source: 'tariff',
        assumptionsTh: 'อัตรา Ft ประกาศโดย กกพ.'
      },
      {
        stepNameTh: '3. ค่าบริการรายเดือน (Monthly Service)',
        stepNameEn: '3. Monthly Service Fee',
        formulaTh: '฿38.22/เดือน (คงที่)',
        formulaEn: '฿38.22/month (fixed)',
        valueThb: 38.22,
        source: 'tariff'
      },
      {
        stepNameTh: '4. ภาษีมูลค่าเพิ่ม (VAT 7%)',
        stepNameEn: '4. Value Added Tax (VAT 7%)',
        formulaTh: '(฿1,251.60 - ฿45.65 + ฿38.22) × 7%',
        formulaEn: '(฿1,251.60 - ฿45.65 + ฿38.22) × 7%',
        valueThb: 87.09,
        source: 'tariff'
      }
    ]
  },
  mode = 'balanced',
  lang = 'th',
  isDarkMode = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(mode === 'detailed');

  return (
    <div className={`p-5 rounded-2xl border transition-all ${
      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      {/* Total & Toggle Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-500/15 text-teal-500 border border-teal-500/20">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider block">
              {lang === 'th' ? 'การคำนวณบิล (Calculation Trace)' : 'Calculation Trace'}
            </span>
            <div className="text-lg font-black font-mono text-teal-600 dark:text-teal-400">
              ฿{traceData.totalBillThb.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3.5 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-600 dark:text-teal-400 font-bold text-xs border border-teal-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>{isExpanded ? (lang === 'th' ? 'ซ่อนการคำนวณ' : 'Hide Trace') : (lang === 'th' ? 'ดูขั้นตอนการคำนวณ' : 'Show Calculation')}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Trace Steps */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs"
          >
            {traceData.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-1"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-sans font-bold text-slate-900 dark:text-slate-100">
                    {lang === 'th' ? step.stepNameTh : step.stepNameEn}
                  </span>
                  <SourceBadge source={step.source} lang={lang} />
                </div>

                {mode !== 'simple' && step.formulaTh && (
                  <p className="text-slate-500 dark:text-slate-400 font-mono text-[0.72rem]">
                    {step.formulaTh}
                  </p>
                )}

                {mode === 'detailed' && step.assumptionsTh && (
                  <p className="text-slate-400 font-sans italic text-[0.68rem]">
                    * Note: {step.assumptionsTh}
                  </p>
                )}

                {step.valueThb !== undefined && (
                  <div className="text-right font-black text-slate-900 dark:text-white pt-1">
                    {step.valueThb >= 0 ? '+' : ''}฿{step.valueThb.toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
