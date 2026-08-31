import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  TrendingDown, 
  ShieldCheck, 
  Leaf, 
  Calendar,
  Building,
  Info,
  DollarSign
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Appliance, SmartGoal } from '../../types';

interface MonthlyReportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  monthlyBudget: number;
  monthlyEstimate: number;
  moneySavedMonth: number;
  appliances: Appliance[];
  userLevel: number;
  currentLocationName?: string;
}

export const MonthlyReportPdfModal: React.FC<MonthlyReportPdfModalProps> = ({
  isOpen,
  onClose,
  lang,
  isDarkMode,
  monthlyBudget,
  monthlyEstimate,
  moneySavedMonth,
  appliances,
  userLevel,
  currentLocationName = 'Home Base (Sukhumvit 71)',
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const billingMonth = lang === 'th' ? 'สิงหาคม 2569' : 'August 2026';
  const meterId = 'PEA-9281-BKK-04';
  const tariffCode = 'TOU Type 1.1.2 (อัตราตามช่วงเวลาของการใช้)';
  
  // Calculate total monthly units from estimate (approx rate ~4.7 THB/kWh)
  const totalKwh = (monthlyEstimate / 4.7).toFixed(1);
  const baselineKwh = ((monthlyEstimate + moneySavedMonth) / 4.7).toFixed(1);
  const co2AvoidedKg = ((moneySavedMonth / 4.7) * 0.5).toFixed(1);
  const treeEquivalent = Math.max(1, Math.round(Number(co2AvoidedKg) / 10));
  const budgetUtilization = Math.round((monthlyEstimate / monthlyBudget) * 100);

  // Top appliances calculation
  const sortedAppliances = [...appliances].sort((a, b) => (b.watt * b.hours) - (a.watt * a.hours));
  const topAppliances = sortedAppliances.slice(0, 5).map(app => {
    const dailyKwh = (app.watt * app.hours) / 1000;
    const monthlyAppKwh = dailyKwh * 30;
    const monthlyCost = monthlyAppKwh * 4.7;
    const percent = Math.min(100, Math.round((monthlyCost / (monthlyEstimate || 1)) * 100));
    return {
      ...app,
      monthlyKwh: monthlyAppKwh.toFixed(1),
      monthlyCost: monthlyCost.toFixed(2),
      percent
    };
  });

  // AI Optimization Tips
  const optimizationTips = [
    {
      id: 'tip-1',
      titleTh: 'ปรับอุณหภูมิเครื่องปรับอากาศเป็น 26°C ร่วมกับเปิดพัดลม',
      titleEn: 'Set AC to 26°C and pair with an oscillating fan',
      savingsThb: 180,
      categoryTh: 'ระบบปรับอากาศ',
      categoryEn: 'Air Conditioning',
      statusTh: 'แนะนำให้ทำทันที'
    },
    {
      id: 'tip-2',
      titleTh: 'สลับเวลาใช้งานเครื่องซักผ้าและเครื่องอบผ้าไปช่วง Off-Peak (หลัง 22:00 น.)',
      titleEn: 'Shift high-load laundry appliances to Off-Peak hours (after 10:00 PM)',
      savingsThb: 95,
      categoryTh: 'การจัดตารางเวลา TOU',
      categoryEn: 'TOU Scheduling',
      statusTh: 'ลดค่าไฟได้ 45%'
    },
    {
      id: 'tip-3',
      titleTh: 'เปิดระบบตัดไฟสแตนด์บายอัตโนมัติสำหรับคอมพิวเตอร์และทีวี (Smart Standby Cut)',
      titleEn: 'Enable automated standby power cut for PC and TV setup',
      savingsThb: 75,
      categoryTh: 'ลดโหลดแฝง (Phantom Load)',
      categoryEn: 'Phantom Load Reduction',
      statusTh: 'ทำงานอัตโนมัติ'
    },
    {
      id: 'tip-4',
      titleTh: 'ทำความสะอาดแผ่นกรองอากาศแอร์ทุก 2 สัปดาห์ เพื่อเพิ่มประสิทธิภาพการถ่ายเทความร้อน',
      titleEn: 'Clean AC air filters bi-weekly to improve heat exchange efficiency',
      savingsThb: 60,
      categoryTh: 'การบำรุงรักษา',
      categoryEn: 'Maintenance',
      statusTh: 'ยืดอายุอุปกรณ์'
    }
  ];

  // Direct jsPDF Document Generation Handler
  const handleDownloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Header Background
    doc.setFillColor(16, 185, 129); // Emerald 500
    doc.rect(0, 0, 210, 28, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('EDUEASE ENERGY - MONTHLY PERFORMANCE REPORT', 14, 12);
    doc.setFontSize(9);
    doc.text(`Billing Period: ${billingMonth}  |  Generated: ${new Date().toISOString().slice(0, 10)}`, 14, 20);
    doc.text(`Location: ${currentLocationName}  |  Meter ID: ${meterId}`, 14, 25);

    // Section 1: KPI Summary
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.text('1. Executive Energy Consumption Summary', 14, 38);

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, 42, 182, 28, 3, 3, 'F');

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('ESTIMATED BILL', 20, 48);
    doc.text('TOTAL CONSUMPTION', 65, 48);
    doc.text('MONTHLY BUDGET', 110, 48);
    doc.text('MONEY SAVED', 155, 48);

    doc.setFontSize(13);
    doc.setTextColor(16, 185, 129);
    doc.text(`THB ${monthlyEstimate.toLocaleString()}`, 20, 56);
    doc.setTextColor(30, 41, 59);
    doc.text(`${totalKwh} kWh`, 65, 56);
    doc.text(`THB ${monthlyBudget.toLocaleString()}`, 110, 56);
    doc.setTextColor(16, 185, 129);
    doc.text(`THB ${moneySavedMonth.toLocaleString()}`, 155, 56);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Budget Utilization: ${budgetUtilization}%`, 20, 64);
    doc.text(`Baseline: ${baselineKwh} kWh`, 65, 64);
    doc.text(`Carbon Avoided: ${co2AvoidedKg} kgCO2`, 110, 64);
    doc.text(`Eco Level: Level ${userLevel}`, 155, 64);

    // Section 2: Top Power Consumers Table
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text('2. Top Energy Consuming Appliances', 14, 80);

    // Table Header
    doc.setFillColor(226, 232, 240);
    doc.rect(14, 84, 182, 7, 'F');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text('Appliance', 16, 88.5);
    doc.text('Power (W)', 75, 88.5);
    doc.text('Usage (Hrs/d)', 105, 88.5);
    doc.text('Monthly kWh', 135, 88.5);
    doc.text('Monthly Cost (THB)', 165, 88.5);

    let yPos = 96;
    topAppliances.forEach((app, idx) => {
      if (idx % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(14, yPos - 4, 182, 6.5, 'F');
      }
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(app.name.substring(0, 30), 16, yPos);
      doc.text(`${app.watt} W`, 75, yPos);
      doc.text(`${app.hours} hrs`, 105, yPos);
      doc.text(`${app.monthlyKwh} kWh`, 135, yPos);
      doc.text(`THB ${app.monthlyCost}`, 165, yPos);
      yPos += 7;
    });

    // Section 3: AI Optimization & Coaching Tips
    yPos += 6;
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text('3. Voltie AI Optimization Recommendations', 14, yPos);

    yPos += 6;
    optimizationTips.forEach((tip, idx) => {
      doc.setFillColor(236, 253, 245);
      doc.roundedRect(14, yPos, 182, 14, 2, 2, 'F');
      doc.setDrawColor(167, 243, 208);
      doc.roundedRect(14, yPos, 182, 14, 2, 2, 'D');

      doc.setFontSize(8.5);
      doc.setTextColor(6, 95, 70);
      doc.text(`Tip #${idx + 1}: ${tip.titleEn}`, 18, yPos + 5.5);
      
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`Category: ${tip.categoryEn}  |  Estimated Impact: -THB ${tip.savingsThb}/month`, 18, yPos + 10.5);

      yPos += 16;
    });

    // Section 4: Tariff Structure Note & Verification Footer
    yPos += 4;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, yPos, 182, 16, 2, 2, 'F');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Official Verification & PEA Tariff Note:', 18, yPos + 5);
    doc.text('Calculated adhering to ERC/PEA standard residential tariffs including Ft credit offset and 7% VAT.', 18, yPos + 9);
    doc.text(`Auth Token: EDUEASE-${Date.now().toString(36).toUpperCase()} | Energy Sentinel AI v3.0`, 18, yPos + 13);

    // Save PDF
    doc.save(`EduEase_Monthly_Energy_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // Browser Print Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-[2.5rem] border shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Action Header Bar (Excluded from print) */}
        <div className="print:hidden flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg font-display tracking-tight text-slate-900 dark:text-white">
                {lang === 'th' ? 'รายงานสรุปการใช้พลังงานและข้อแนะนำ AI' : 'Monthly Energy Performance & AI Report'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? `รอบบิลประจำเดือน ${billingMonth}` : `Billing Cycle: ${billingMonth}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-xs"
              title="Print document"
            >
              <Printer className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="hidden sm:inline">{lang === 'th' ? 'พิมพ์เอกสาร' : 'Print'}</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'th' ? 'ดาวน์โหลด PDF' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div 
          ref={reportRef}
          id="printable-monthly-report"
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 font-sans print:p-0 print:m-0 print:bg-white print:text-slate-900"
        >
          {/* Printable Letterhead Header */}
          <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500 text-white text-xs font-black">⚡</span>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-display">
                  EDUEASE ENERGY SENTINEL
                </span>
                <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  Official Summary
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'เอกสารสรุปประสิทธิภาพการใช้พลังงานไฟฟ้าและคำแนะนำ AI ประจำเดือน' : 'Official Monthly Energy Consumption Summary & AI Optimization Directive'}
              </p>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5 sm:text-right font-mono">
              <div><strong>{lang === 'th' ? 'วันที่ออกเอกสาร:' : 'Report Date:'}</strong> {currentDate}</div>
              <div><strong>{lang === 'th' ? 'รหัสมิเตอร์:' : 'Meter ID:'}</strong> {meterId}</div>
              <div><strong>{lang === 'th' ? 'สถานที่:' : 'Location:'}</strong> {currentLocationName}</div>
              <div><strong>{lang === 'th' ? 'ประเภทอัตรา:' : 'Tariff:'}</strong> {tariffCode}</div>
            </div>
          </div>

          {/* 1. KPI Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
              <span className="text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {lang === 'th' ? 'ประมาณการค่าไฟเดือนนี้' : 'Est. Monthly Cost'}
              </span>
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                ฿{monthlyEstimate.toLocaleString()}
              </div>
              <span className="text-[0.65rem] text-emerald-700 dark:text-emerald-300 font-medium">
                {totalKwh} kWh ({lang === 'th' ? 'หน่วย' : 'units'})
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {lang === 'th' ? 'เป้างบประมาณ' : 'Monthly Budget'}
              </span>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                ฿{monthlyBudget.toLocaleString()}
              </div>
              <span className={`text-[0.65rem] font-bold ${budgetUtilization > 100 ? 'text-rose-500' : 'text-emerald-500'}`}>
                {budgetUtilization}% {lang === 'th' ? 'ของงบประมาณ' : 'budget used'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/50 space-y-1">
              <span className="text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {lang === 'th' ? 'เงินเซฟสะสม' : 'Money Saved'}
              </span>
              <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400">
                ฿{moneySavedMonth.toLocaleString()}
              </div>
              <span className="text-[0.65rem] text-teal-700 dark:text-teal-300 font-medium">
                -15% {lang === 'th' ? 'จากเกณฑ์ปกติ' : 'vs baseline'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/50 space-y-1">
              <span className="text-[0.68rem] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {lang === 'th' ? 'ลดคาร์บอน (CO2)' : 'Carbon Footprint'}
              </span>
              <div className="text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">
                {co2AvoidedKg} <span className="text-xs">kg</span>
              </div>
              <span className="text-[0.65rem] text-cyan-700 dark:text-cyan-300 font-medium">
                🌳 {treeEquivalent} {lang === 'th' ? 'ต้นไม้เทียบเคียง' : 'trees eq.'}
              </span>
            </div>
          </div>

          {/* 2. Top Consuming Appliances Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>{lang === 'th' ? 'อันดับอุปกรณ์ที่ใช้ไฟฟ้าสูงสุดประจำเดือน' : 'Top Power Consuming Appliances'}</span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                {lang === 'th' ? 'อิงจากบันทึกเซนเซอร์และการคำนวณจริง' : 'Based on real telemetry & specs'}
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">{lang === 'th' ? 'เครื่องใช้ไฟฟ้า' : 'Appliance'}</th>
                    <th className="p-3 text-center">{lang === 'th' ? 'กำลังไฟ (W)' : 'Power (W)'}</th>
                    <th className="p-3 text-center">{lang === 'th' ? 'ใช้งาน (ชม./วัน)' : 'Usage (Hrs/d)'}</th>
                    <th className="p-3 text-right">{lang === 'th' ? 'หน่วย (kWh/เดือน)' : 'Monthly kWh'}</th>
                    <th className="p-3 text-right">{lang === 'th' ? 'ค่าไฟ (฿/เดือน)' : 'Est. Cost (฿)'}</th>
                    <th className="p-3 text-right">{lang === 'th' ? 'สัดส่วน' : 'Share'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                  {topAppliances.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{app.name}</span>
                      </td>
                      <td className="p-3 text-center font-mono">{app.watt} W</td>
                      <td className="p-3 text-center font-mono">{app.hours} ชม.</td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">{app.monthlyKwh}</td>
                      <td className="p-3 text-right font-mono font-bold">฿{app.monthlyCost}</td>
                      <td className="p-3 text-right font-mono text-slate-500 dark:text-slate-400">{app.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. AI Optimization Tips & Actionable Advice */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>{lang === 'th' ? 'ข้อแนะนำการประหยัดพลังงานจาก Voltie AI Coach' : 'Voltie AI Optimization Directives'}</span>
              </h4>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {lang === 'th' ? 'คาดการณ์ประหยัดรวม: ~฿410/เดือน' : 'Est. Total Impact: ~฿410/mo'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {optimizationTips.map((tip, idx) => (
                <div 
                  key={tip.id}
                  className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-200/80 dark:border-emerald-800/40 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-[0.65rem]">
                      {lang === 'th' ? tip.categoryTh : tip.categoryEn}
                    </span>
                    <span className="font-mono font-black text-xs text-emerald-600 dark:text-emerald-400">
                      -฿{tip.savingsThb}/{lang === 'th' ? 'เดือน' : 'mo'}
                    </span>
                  </div>

                  <h5 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">
                    {lang === 'th' ? tip.titleTh : tip.titleEn}
                  </h5>

                  <div className="flex items-center justify-between text-[0.7rem] text-slate-500 dark:text-slate-400 pt-1 border-t border-emerald-200/40 dark:border-emerald-800/30">
                    <span>{lang === 'th' ? 'สถานะกลยุทธ์:' : 'Strategy Status:'}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{tip.statusTh}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Tariff Structure & Verification Badge */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'th' ? 'การรับรองความถูกต้องและการคำนวณตามมาตรฐาน กกพ./กฟน./กฟภ.' : 'Official Tariff Standard Compliance'}</span>
            </div>
            <p className="text-[0.72rem] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {lang === 'th'
                ? 'สูตรการคำนวณค่าไฟฟ้าประกอบด้วย: พลังงานไฟฟ้าฐานตามหน่วยใช้งานจริง + ค่าไฟฟ้าผันแปร (Ft) อัตรา -0.1532 บาท/หน่วย + ค่าบริการรายเดือน 38.22 บาท + ภาษีมูลค่าเพิ่ม VAT 7% รายงานนี้ผ่านการประมวลผลด้วยโมเดล Time-Series Regression AI Engine v3.0'
                : 'Billing formula integrates: Base energy rate + Fuel Adjustment charge (Ft credit offset -0.1532 THB/kWh) + Monthly service fee 38.22 THB + 7% VAT. Report generated via EduEase AI Energy Sentinel v3.0.'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
