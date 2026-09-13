import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  SlidersHorizontal, 
  Activity, 
  Zap, 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  Users, 
  Gauge, 
  Coffee, 
  CheckCircle2, 
  Info, 
  TrendingDown, 
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { UserPersona, InfoDetailMode, Appliance } from '../../types';
import { PERSONA_CONFIGS } from '../../data/personaThemes';

interface PersonaPresentationPipelinePanelProps {
  persona: UserPersona;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  appliances?: Appliance[];
  infoDetailMode: InfoDetailMode;
}

export const PersonaPresentationPipelinePanel: React.FC<PersonaPresentationPipelinePanelProps> = ({
  persona,
  lang,
  isDarkMode,
  appliances = [],
  infoDetailMode,
}) => {
  const config = PERSONA_CONFIGS[persona] || PERSONA_CONFIGS.student;
  const pipeline = config.presentationPipeline;
  const { focusMetrics, features, granularity } = pipeline;

  // State for student roommate splitter
  const [roommatesCount, setRoommatesCount] = useState<number>(2);
  const [dormUnitRate, setDormUnitRate] = useState<number>(7.0); // 7 THB/kWh standard dorm tariff
  const [dormMonthlyKwh, setDormMonthlyKwh] = useState<number>(180);

  // Dynamic calculations for student
  const dormTotalBill = dormMonthlyKwh * dormUnitRate;
  const dormPerPersonBill = dormTotalBill / roommatesCount;
  const bobaPrice = 45; // 45 THB per cup
  const dailyDormCost = dormTotalBill / 30;
  const bobaCupsPerDay = (dailyDormCost / bobaPrice).toFixed(1);

  // Dynamic calculations for facility
  const totalWatts = appliances.length > 0 
    ? appliances.reduce((sum, a) => sum + (a.watt || 200), 0)
    : 32400;
  const peakDemandKw = Math.max(18.5, Number((totalWatts / 1000 * 1.8).toFixed(1)));
  const apparentKva = Number((peakDemandKw / 0.948).toFixed(1));
  const reactiveKvar = Number((Math.sqrt(apparentKva * apparentKva - peakDemandKw * peakDemandKw)).toFixed(1));
  const demandChargeRate = 132.93; // ฿/kW per PEA/MEA schedule 3.2
  const monthlyDemandCost = Math.round(peakDemandKw * demandChargeRate);

  return (
    <div className="space-y-6">
      {/* 1. Persona Presentation Architecture Banner */}
      <div className={`p-5 rounded-3xl border transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-r from-slate-900 via-slate-800/90 to-slate-900 border-slate-700/80 shadow-lg' 
          : 'bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-sky-500/10 border-teal-200/80 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? pipeline.granularityBadgeTh : pipeline.granularityBadgeEn}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                Resolution: {focusMetrics.costResolution}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span>{lang === 'th' ? config.titleTh : config.titleEn}</span>
              <span className="text-xs px-2 py-0.5 rounded-md font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                {granularity}
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-3xl">
              {persona === 'student'
                ? (lang === 'th'
                    ? 'สถาปัตยกรรมข้อมูลโหมดนักศึกษา: ย่อยข้อมูลทางเทคนิคให้เข้าใจง่าย สรุปค่าไฟเฉลี่ยรายวันเทียบเท่างบขนม/ชานม พร้อมเครื่องมือหารค่าไฟกับรูมเมทหอพักอย่างเป็นธรรม'
                    : 'Student Presentation Pipeline: Low-friction daily cost breakdowns, snack-budget equivalencies, and fair dorm roommate bill sharing.')
                : persona === 'homeowner'
                  ? (lang === 'th'
                      ? 'สถาปัตยกรรมข้อมูลโหมดบ้านพักอาศัย: โฟกัสเศรษฐศาสตร์ครัวเรือน อัตราก้าวหน้าขั้นบันได MEA/PEA สัดส่วนค่าไฟตามห้อง และการจัดการชาร์จ EV/โซลาร์'
                      : 'Homeowner Presentation Pipeline: Household economics, progressive utility tariff tracking, room-by-room distribution, and EV/solar optimization.')
                  : (lang === 'th'
                      ? 'สถาปัตยกรรมข้อมูลโหมดวิศวกรรมอาคาร: ถอดรหัสเทเลเมตรีเชิงลึก สมดุลโหลด 3 เฟส (3-Phase Balance), ตัวประกอบกำลัง (PF > 0.85), ค่า Peak Demand (15-min rolling) และฮาร์โมนิกส์ THD ตามมาตรฐาน IEEE 519'
                      : 'Facility Presentation Pipeline: Rigorous grid telemetry, 3-phase load balance vectors, power factor diagnostics, peak demand shaving, and IEEE 519 harmonics.')}
            </p>
          </div>

          {/* Persona Primary Metric Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0 min-w-[200px] text-center md:text-right">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
              {lang === 'th' ? focusMetrics.primaryLabelTh : focusMetrics.primaryLabelEn}
            </span>
            <div className="text-2xl font-black text-teal-600 dark:text-teal-400 font-mono mt-0.5">
              {persona === 'student' 
                ? `฿${dailyDormCost.toFixed(0)}` 
                : persona === 'homeowner' 
                  ? '฿1,840' 
                  : `${peakDemandKw} kW`}
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
              {lang === 'th' ? focusMetrics.primaryUnitTh : focusMetrics.primaryUnitEn}
            </span>
          </div>
        </div>

        {/* Focus Metrics Sub-Bar */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">
              {lang === 'th' ? focusMetrics.secondaryLabelTh : focusMetrics.secondaryLabelEn}:
            </span>
            <span className="font-extrabold text-slate-800 dark:text-white px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono">
              {persona === 'student' 
                ? `${bobaCupsPerDay} ${lang === 'th' ? focusMetrics.secondaryUnitTh : focusMetrics.secondaryUnitEn}` 
                : persona === 'homeowner' 
                  ? (lang === 'th' ? focusMetrics.secondaryUnitTh : focusMetrics.secondaryUnitEn)
                  : '0.948 Lagging (Healthy)'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Data Synced</span>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500 dark:text-slate-400">
              {lang === 'th' ? `ตรวจจับอุปกรณ์ในระบบ: ${appliances.length} รายการ` : `${appliances.length} Devices Synced`}
            </span>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 2. STUDENT PERSONA FEATURE: DORM ROOMMATE BILL SPLITTER */}
      {/* --------------------------------------------------------------------- */}
      {features.showDormRoommateSplit && (
        <div className={`p-6 rounded-3xl border shadow-md ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-amber-100 text-slate-800'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-base font-display">
                  {lang === 'th' ? 'ระบบหารค่าไฟหอพักอัตโนมัติ (Dorm Roommate Fair Bill Splitter)' : 'Dorm Roommate Fair Bill Splitter'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th' 
                    ? 'คำนวณหารค่าไฟตามจำนวนรูมเมทจริง และแปลงเป็นงบขนมประจำวัน' 
                    : 'Calculate exact roommate share with custom dorm tariff rate and daily snack equivalents'}
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 text-amber-600 dark:text-amber-400 self-start sm:self-auto">
              🌱 Student Feature
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Control 1: Roommate Count */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 block mb-2">
                {lang === 'th' ? 'จำนวนรูมเมท (Roommates):' : 'Number of Roommates:'}
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => setRoommatesCount(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      roommatesCount === num
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {num} {lang === 'th' ? 'คน' : 'Ppl'}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Dorm Rate */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-500">
                  {lang === 'th' ? 'อัตราค่าไฟหอพัก:' : 'Dorm Rate per Unit:'}
                </span>
                <span className="text-xs font-black font-mono text-amber-600 dark:text-amber-400">
                  ฿{dormUnitRate.toFixed(1)} / kWh
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={10}
                step={0.5}
                value={dormUnitRate}
                onChange={(e) => setDormUnitRate(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                {lang === 'th' ? '*หอพักเอกชนทั่วไปเฉลี่ย ฿7-8/หน่วย' : '*Private dorms typically charge ฿7-8/kWh'}
              </span>
            </div>

            {/* Control 3: Monthly Units */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-500">
                  {lang === 'th' ? 'หน่วยไฟรวมทั้งห้อง:' : 'Room Total Units:'}
                </span>
                <span className="text-xs font-black font-mono text-amber-600 dark:text-amber-400">
                  {dormMonthlyKwh} kWh
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={400}
                step={10}
                value={dormMonthlyKwh}
                onChange={(e) => setDormMonthlyKwh(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                {lang === 'th' ? 'เฉลี่ยเปิดแอร์ 6-8 ชม./วัน' : 'Typical AC 6-8 hrs/day'}
              </span>
            </div>
          </div>

          {/* Split Result Summary */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/20">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                {lang === 'th' ? 'ยอดบิลรวมทั้งห้อง' : 'Total Dorm Bill'}
              </span>
              <div className="text-xl font-black font-mono text-slate-800 dark:text-white mt-1">
                ฿{dormTotalBill.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500">{dormMonthlyKwh} kWh × ฿{dormUnitRate}</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-500 text-slate-950 shadow-md">
              <span className="text-[10px] font-black uppercase block opacity-80">
                {lang === 'th' ? `ส่วนที่ต้องจ่ายต่อคน (${roommatesCount} คน)` : `Each Roommate Share`}
              </span>
              <div className="text-2xl font-black font-mono mt-1">
                ฿{dormPerPersonBill.toFixed(0)}
              </div>
              <span className="text-[10px] font-extrabold opacity-90">
                {lang === 'th' ? `คนละ ฿${(dormPerPersonBill / 30).toFixed(0)}/วัน` : `฿${(dormPerPersonBill / 30).toFixed(0)}/day each`}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/20 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                {lang === 'th' ? 'เทียบเท่าค่าชานม/วัน' : 'Daily Boba Equivalent'}
              </span>
              <div className="text-xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                <Coffee className="w-5 h-5 text-amber-500" />
                <span>{((dormPerPersonBill / 30) / bobaPrice).toFixed(1)} {lang === 'th' ? 'แก้ว' : 'cups'}</span>
              </div>
              <span className="text-[10px] text-slate-500">
                {lang === 'th' ? 'ปรับแอร์ 26°C + พัดลม เซฟได้วันละครึ่งแก้ว!' : 'AC 26°C saves half a cup daily!'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 3. FACILITY PERSONA TELEMETRY: 3-PHASE BALANCE, PF, DEMAND & THD */}
      {/* --------------------------------------------------------------------- */}
      {features.show3PhaseBalance && (
        <div className={`p-6 rounded-3xl border shadow-xl ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-base font-display">
                  {lang === 'th' ? 'มิเตอร์วิเคราะห์ระบบ 3 เฟส & เทเลเมตรีคุณภาพไฟฟ้า (3-Phase & Power Quality)' : '3-Phase Load Balance & Power Quality Telemetry'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th' 
                    ? 'ตรวจสอบความสมดุลกระแสไฟแต่ละเฟส, คุม Power Factor ไม่ให้โดนปรับ และมอนิเตอร์ฮาร์โมนิกส์ IEEE 519' 
                    : 'Phase current vectors, PF penalty compliance, 15-minute peak demand shaving, and IEEE 519 harmonics'}
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/15 text-purple-600 dark:text-purple-400 self-start sm:self-auto">
              ⚡ Facility Pro Feature
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Phase A */}
            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-red-500 text-white text-xs font-black font-mono">
                  Phase A (R)
                </span>
                <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400">231.4 V</span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-800 dark:text-white my-1">
                42.5 A
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span>Active: 9.8 kW</span>
                <span>PF: 0.95</span>
              </div>
            </div>

            {/* Phase B */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-black font-mono">
                  Phase B (S)
                </span>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">229.8 V</span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-800 dark:text-white my-1">
                44.1 A
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span>Active: 10.1 kW</span>
                <span>PF: 0.94</span>
              </div>
            </div>

            {/* Phase C */}
            <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-blue-500 text-white text-xs font-black font-mono">
                  Phase C (T)
                </span>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">230.7 V</span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-800 dark:text-white my-1">
                41.8 A
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span>Active: 9.6 kW</span>
                <span>PF: 0.95</span>
              </div>
            </div>
          </div>

          {/* Grid Engineering Diagnostic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Diagnostic 1: Current Unbalance */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Current Unbalance</span>
                <span className="text-emerald-500 font-bold font-mono">✓ Normal</span>
              </div>
              <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 my-1">
                2.8%
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'มาตรฐาน วสท./IEEE 141 กำหนด < 5% โหลดเฉลี่ยสมดุลดี' : 'Standard limit < 5%, phase loading is well balanced'}
              </p>
            </div>

            {/* Diagnostic 2: Power Factor (PF) */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Power Factor (cos φ)</span>
                <span className="text-emerald-500 font-bold font-mono">✓ No Penalty</span>
              </div>
              <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 my-1">
                0.948
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'เกินเกณฑ์ กฟภ./กฟน. (0.85) จึงไม่มีค่าปรับ kVAR' : 'Above 0.85 threshold, ฿0 PEA reactive penalty'}
              </p>
            </div>

            {/* Diagnostic 3: Peak Demand Shaving */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">15-min Peak Demand</span>
                <span className="text-purple-500 font-bold font-mono">Rate 3.2</span>
              </div>
              <div className="text-xl font-black font-mono text-purple-600 dark:text-purple-400 my-1">
                {peakDemandKw} kW
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {lang === 'th' ? `ค่า Demand Charge: ฿${monthlyDemandCost.toLocaleString()}/ด.` : `Demand charge: ฿${monthlyDemandCost.toLocaleString()}/mo`}
              </p>
            </div>

            {/* Diagnostic 4: Harmonics THD */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Harmonics THD_V</span>
                <span className="text-emerald-500 font-bold font-mono">IEEE 519</span>
              </div>
              <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 my-1">
                2.4%
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'ผ่านเกณฑ์ IEEE 519 (< 5.0%) ไม่มีปัญหากับอินเวอร์เตอร์' : 'Compliant with IEEE 519 (< 5.0%), inverters safe'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
