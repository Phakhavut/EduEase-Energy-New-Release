import React, { useState, useRef } from 'react';
import { Calculator, Zap, FileText, TrendingUp, Download, Printer, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface BillingSimulatorProps {
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
  plannedKwh?: number;
  ftRate?: number;
  setFtRate?: (val: number) => void;
}

export const BillingSimulator: React.FC<BillingSimulatorProps> = ({
  lang = 'en',
  isDarkMode = false,
  plannedKwh,
  ftRate: propFtRate,
  setFtRate: propSetFtRate,
}) => {
  const [totalKwh, setTotalKwh] = useState<number>(350);
  const [localFtRate, setLocalFtRate] = useState<number>(0.3972);

  const ftRate = propFtRate !== undefined ? propFtRate : localFtRate;
  const setFtRate = propSetFtRate !== undefined ? propSetFtRate : setLocalFtRate;

  const printRef = useRef<HTMLDivElement>(null);

  // --- Real Calculation Logic (MEA/PEA Progressive Block Tariff Type 1.1.2) ---
  const calculateDetailedNormalBill = (kwh: number, ft: number) => {
    let remaining = kwh;
    
    // Block 1: 1 - 150 kWh
    const block1 = Math.min(remaining, 150);
    const block1Cost = block1 * 3.2484;
    remaining -= block1;
    
    // Block 2: 151 - 400 kWh
    const block2 = remaining > 0 ? Math.min(remaining, 250) : 0;
    const block2Cost = block2 * 4.2218;
    remaining -= block2;
    
    // Block 3: > 400 kWh
    const block3 = remaining > 0 ? remaining : 0;
    const block3Cost = block3 * 4.4217;
    
    const baseCost = block1Cost + block2Cost + block3Cost;
    
    // Service Charge (> 150 units = 24.62, otherwise 8.19)
    const serviceCharge = kwh > 150 ? 24.62 : 8.19;
    
    // Ft Charge
    const ftCost = kwh * ft;
    
    const subtotal = baseCost + serviceCharge + ftCost;
    
    // VAT 7%
    const vat = subtotal * 0.07;
    
    const totalCost = subtotal + vat;
    
    return {
      kwh,
      block1, block1Cost,
      block2, block2Cost,
      block3, block3Cost,
      baseCost,
      serviceCharge,
      ftRate: ft, ftCost,
      subtotal,
      vat,
      totalCost
    };
  };

  const billDetails = calculateDetailedNormalBill(totalKwh, ftRate);

  // --- Chart Data Preparation ---
  const chartData = [
    { name: lang === 'th' ? 'ค่าพลังงานไฟฟ้าฐาน' : 'Base Tariff', value: Number(billDetails.baseCost.toFixed(2)), color: '#10b981' }, // emerald-500
    { name: lang === 'th' ? 'ค่าบริการรายเดือน' : 'Service Charge', value: Number(billDetails.serviceCharge.toFixed(2)), color: '#3b82f6' }, // blue-500
    { name: lang === 'th' ? 'ค่าไฟฟ้าผันแปร (Ft)' : 'Ft Charge', value: Number(billDetails.ftCost.toFixed(2)), color: '#f59e0b' }, // amber-500
    { name: lang === 'th' ? 'ภาษีมูลค่าเพิ่ม (VAT)' : 'VAT 7%', value: Number(billDetails.vat.toFixed(2)), color: '#ec4899' }, // pink-500
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percent = billDetails.totalCost > 0 ? ((data.value / billDetails.totalCost) * 100).toFixed(1) : '0.0';
      return (
        <div className="p-3 bg-slate-900/95 dark:bg-slate-950/95 text-white border border-slate-800 rounded-xl shadow-xl font-mono text-xs">
          <p className="font-bold mb-1">{data.name}</p>
          <p className="text-emerald-400 font-bold">฿{data.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-slate-400 text-[10px] mt-0.5">{percent}%</p>
        </div>
      );
    }
    return null;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const text = `
========================================
${lang === 'th' ? 'สรุปค่าไฟฟ้า (อัตรา 1.1.2)' : 'Electricity Bill Summary (Type 1.1.2)'}
========================================
${lang === 'th' ? 'การใช้พลังงานไฟฟ้า:' : 'Energy Usage:'} ${totalKwh} kWh
${lang === 'th' ? 'อัตราค่า Ft:' : 'Ft Rate:'} ${ftRate} THB/kWh
Custom Simulation: ${new Date().toLocaleString()}

[ ${lang === 'th' ? 'ค่าพลังงานไฟฟ้า (Base Tariff)' : 'Base Energy Charge'} ]
- ${lang === 'th' ? '150 หน่วยแรก' : 'First 150 kWh'}: ${billDetails.block1Cost.toFixed(2)} THB
- ${lang === 'th' ? '250 หน่วยถัดไป' : 'Next 250 kWh'}: ${billDetails.block2Cost.toFixed(2)} THB
- ${lang === 'th' ? 'เกิน 400 หน่วย' : 'Over 400 kWh'}: ${billDetails.block3Cost.toFixed(2)} THB
----------------------------------------
${lang === 'th' ? 'รวมค่าพลังงานไฟฟ้า' : 'Total Base Charge'}: ${billDetails.baseCost.toFixed(2)} THB

[ ${lang === 'th' ? 'ค่าใช้จ่ายอื่นๆ' : 'Additional Charges'} ]
- ${lang === 'th' ? 'ค่าบริการรายเดือน' : 'Service Charge'}: ${billDetails.serviceCharge.toFixed(2)} THB
- ${lang === 'th' ? 'ค่า Ft' : 'Ft Charge'}: ${billDetails.ftCost.toFixed(2)} THB
----------------------------------------
${lang === 'th' ? 'รวมเงินก่อนภาษี (Subtotal)' : 'Subtotal'}: ${billDetails.subtotal.toFixed(2)} THB

[ ${lang === 'th' ? 'ภาษีและยอดสุทธิ' : 'Tax & Total'} ]
- ${lang === 'th' ? 'ภาษีมูลค่าเพิ่ม (VAT 7%)' : 'VAT (7%)'}: ${billDetails.vat.toFixed(2)} THB
========================================
${lang === 'th' ? 'รวมเงินค่าไฟฟ้าทั้งสิ้น (Total Net Payable)' : 'Total Net Payable'}: ${billDetails.totalCost.toFixed(2)} THB
========================================
`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Electricity_Bill_${new Date().toISOString().slice(0,10)}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`dashboard-card border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display">{lang === 'th' ? 'จำลองค่าไฟฟ้า (อัตรา 1.1.2)' : 'Billing Simulator (Type 1.1.2)'}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'th' ? 'คำนวณโครงสร้างค่าไฟฟ้าแบบก้าวหน้า' : 'Calculate progressive block tariff structure'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 print:hidden">
          <button 
            onClick={handleDownloadTxt}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            {lang === 'th' ? 'ดาวน์โหลด (.txt)' : 'Download TXT'}
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            {lang === 'th' ? 'พิมพ์ / PDF' : 'Print / PDF'}
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'th' ? 'การใช้ไฟฟ้า (หน่วย/kWh)' : 'Electricity Usage (kWh)'}</span>
          </label>
          <input
            type="number"
            min="0"
            value={totalKwh}
            onChange={(e) => setTotalKwh(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full text-lg p-3 font-semibold font-mono rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
          />
          {plannedKwh !== undefined && plannedKwh > 0 && (
            <button
              onClick={() => setTotalKwh(Number(plannedKwh.toFixed(1)))}
              className="mt-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-xl font-bold text-xs transition-colors cursor-pointer text-center w-full"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-500 animate-pulse shrink-0" />
              <span>
                {lang === 'th' 
                  ? `ดึงค่าจากการวางแผนอุปกรณ์ (${plannedKwh.toFixed(1)} หน่วย)` 
                  : `Sync from Appliance Planner (${plannedKwh.toFixed(1)} kWh)`}
              </span>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span>{lang === 'th' ? 'ค่า Ft (บาท/หน่วย)' : 'Ft Rate (Baht/kWh)'}</span>
          </label>
          <input
            type="number"
            step="0.0001"
            value={ftRate}
            onChange={(e) => setFtRate(parseFloat(e.target.value) || 0)}
            className="w-full text-lg p-3 font-semibold font-mono rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Output / Bill Summary Card */}
      <div className="rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-primary" />
          <h4 className="font-bold text-lg">{lang === 'th' ? 'สรุปค่าไฟฟ้าและสัดส่วนโครงสร้าง' : 'Bill & Structural Share Summary'}</h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Detailed numbers */}
          <div className="lg:col-span-7 space-y-4 font-mono text-sm">
            
            {/* Base Tariff Blocks */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">{lang === 'th' ? 'ค่าพลังงานไฟฟ้า (Base Tariff)' : 'Base Energy Charge'}</div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{lang === 'th' ? '150 หน่วยแรก' : 'First 150 kWh'} (฿3.2484)</span>
                <span className="font-semibold">฿{billDetails.block1Cost.toFixed(2)}</span>
              </div>
              {billDetails.block2 > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">{lang === 'th' ? '250 หน่วยถัดไป' : 'Next 250 kWh'} (฿4.2218)</span>
                  <span className="font-semibold">฿{billDetails.block2Cost.toFixed(2)}</span>
                </div>
              )}
              {billDetails.block3 > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">{lang === 'th' ? 'เกิน 400 หน่วย' : 'Over 400 kWh'} (฿4.4217)</span>
                  <span className="font-semibold">฿{billDetails.block3Cost.toFixed(2)}</span>
                </div>
              )}
              
              <div className="pt-2 mt-2 border-t border-dashed border-slate-300 dark:border-slate-700 flex justify-between items-center text-primary font-bold">
                <span>{lang === 'th' ? 'รวมค่าพลังงานไฟฟ้า' : 'Total Base Charge'}</span>
                <span>฿{billDetails.baseCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Additional Charges */}
            <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">{lang === 'th' ? 'ค่าใช้จ่ายอื่นๆ' : 'Additional Charges'}</div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{lang === 'th' ? 'ค่าบริการรายเดือน' : 'Service Charge'}</span>
                <span className="font-semibold">฿{billDetails.serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{lang === 'th' ? 'ค่า Ft' : 'Ft Charge'} (฿{billDetails.ftRate.toFixed(4)})</span>
                <span className="font-semibold">฿{billDetails.ftCost.toFixed(2)}</span>
              </div>
              
              <div className="pt-2 mt-2 border-t border-dashed border-slate-300 dark:border-slate-700 flex justify-between items-center font-bold">
                <span>{lang === 'th' ? 'รวมเงินก่อนภาษี (Subtotal)' : 'Subtotal'}</span>
                <span>฿{billDetails.subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* VAT & Total */}
            <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{lang === 'th' ? 'ภาษีมูลค่าเพิ่ม' : 'VAT'} (7%)</span>
                <span className="font-semibold">฿{billDetails.vat.toFixed(2)}</span>
              </div>
              <div className="pt-4 flex justify-between items-center text-xl font-black border-t border-slate-200 dark:border-slate-800">
                <span>{lang === 'th' ? 'รวมสุทธิ' : 'Total Net Payable'}</span>
                <span className="text-emerald-500">฿{billDetails.totalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Donut Chart Visualization */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5 mb-2">
              <PieIcon className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {lang === 'th' ? 'สัดส่วนค่าใช้จ่าย' : 'Cost Breakdown'}
              </span>
            </div>

            <div className="w-full h-[180px] relative flex justify-center items-center">
              {billDetails.totalCost > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-xs text-slate-400">{lang === 'th' ? 'ไม่มีการใช้พลังงาน' : 'No energy consumption'}</div>
              )}

              {/* Centered Total Display */}
              {billDetails.totalCost > 0 && (
                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 font-mono">TOTAL</span>
                  <span className="text-md font-bold font-display text-emerald-500">
                    ฿{Math.round(billDetails.totalCost).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Custom Interactive Badges Legend */}
            <div className="w-full grid grid-cols-2 gap-2 mt-4 text-[10px] font-mono">
              {chartData.map((item, idx) => {
                const percent = billDetails.totalCost > 0 ? ((item.value / billDetails.totalCost) * 100).toFixed(1) : '0';
                return (
                  <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850/60">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate text-slate-600 dark:text-slate-400 font-bold">{item.name}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        ฿{item.value.toFixed(0)} ({percent}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

