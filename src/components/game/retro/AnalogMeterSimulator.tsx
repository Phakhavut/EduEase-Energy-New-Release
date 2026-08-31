import React, { useState, useEffect, useRef } from 'react';
import { 
  Gauge, 
  Power, 
  Leaf, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw,
  Sparkles,
  Zap,
  Calculator,
  Trophy
} from 'lucide-react';
import { INITIAL_APPLIANCES_SIMULATOR, ApplianceSimulatorItem } from '../../../data/retroGamificationData';

interface AnalogMeterSimulatorProps {
  lang: 'th' | 'en';
  isDarkMode?: boolean;
  onEarnCoins?: (amount: number) => void;
  onAddXp?: (amount: number) => void;
}

export const AnalogMeterSimulator: React.FC<AnalogMeterSimulatorProps> = ({
  lang,
  isDarkMode = true,
  onEarnCoins,
  onAddXp
}) => {
  const [appliances, setAppliances] = useState<ApplianceSimulatorItem[]>(INITIAL_APPLIANCES_SIMULATOR);
  const [meterOdometerKwh, setMeterOdometerKwh] = useState<number>(142.8);
  const [discRotationDeg, setDiscRotationDeg] = useState<number>(0);
  const [isDiagnosticMode, setIsDiagnosticMode] = useState<boolean>(false);
  const [diagnosticSolved, setDiagnosticSolved] = useState<boolean>(false);
  const [diagnosticGoalWatts, setDiagnosticGoalWatts] = useState<number>(1000);
  const [showPhysicsGuide, setShowPhysicsGuide] = useState<boolean>(false);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Calculate current active total wattage
  const totalWatts = appliances.reduce((sum, item) => {
    if (!item.isOn) return sum;
    return sum + (item.isEco ? item.ecoWatts : item.normalWatts);
  }, 0);

  // Approximate revolutions per minute (RPM) for 1200 rev/kWh meter constant
  // 1 kW = 1200 rev/hour = 20 rev/min
  // Speed multiplier for smooth visual animation
  const rotationSpeedDegPerSec = Math.max(2, (totalWatts / 1000) * 120);

  // Smooth animation loop for analog spinning disc and odometer
  useEffect(() => {
    const updateDisc = (time: number) => {
      const deltaSeconds = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (totalWatts > 0) {
        setDiscRotationDeg(prev => (prev + rotationSpeedDegPerSec * deltaSeconds) % 360);
        // Slowly advance odometer
        setMeterOdometerKwh(prev => prev + (totalWatts / (1000 * 3600)) * deltaSeconds * 20); // 20x demo pace
      }

      requestRef.current = requestAnimationFrame(updateDisc);
    };

    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(updateDisc);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [totalWatts, rotationSpeedDegPerSec]);

  // Check diagnostic mode resolution
  useEffect(() => {
    if (isDiagnosticMode && !diagnosticSolved) {
      if (totalWatts <= diagnosticGoalWatts && totalWatts > 0) {
        setDiagnosticSolved(true);
        onEarnCoins?.(60);
        onAddXp?.(120);
      }
    }
  }, [totalWatts, isDiagnosticMode, diagnosticSolved, diagnosticGoalWatts, onEarnCoins, onAddXp]);

  const toggleAppliance = (id: string) => {
    setAppliances(prev => prev.map(item => item.id === id ? { ...item, isOn: !item.isOn } : item));
  };

  const toggleApplianceEco = (id: string) => {
    setAppliances(prev => prev.map(item => item.id === id ? { ...item, isEco: !item.isEco } : item));
  };

  const startDiagnosticChallenge = () => {
    // Turn on heavy appliances to create a surge
    setAppliances(prev => prev.map(item => ({
      ...item,
      isOn: true,
      isEco: false
    })));
    setIsDiagnosticMode(true);
    setDiagnosticSolved(false);
    setDiagnosticGoalWatts(900);
  };

  const resetSimulator = () => {
    setAppliances(INITIAL_APPLIANCES_SIMULATOR);
    setIsDiagnosticMode(false);
    setDiagnosticSolved(false);
  };

  // Math breakdown
  const dailyUnits = (totalWatts * 8) / 1000;
  const estimatedCostBaht = dailyUnits * 4.2;

  return (
    <div className="space-y-6">
      {/* Header & Diagnostic Banner */}
      <div className={`p-4 sm:p-5 rounded-3xl border flex flex-wrap items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black font-display tracking-tight flex items-center gap-2">
              <span>{lang === 'th' ? 'จำลองจานหมุนมิเตอร์ไฟฟ้า & ตู้ไฟคลาสสิก' : 'Analog Power Meter & Breaker Lab'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'th' 
                ? 'สังเกตความเร็วรอบจานหมุนเหนี่ยวนำแม่เหล็กที่เปลี่ยนไปตามกำลังวัตต์ของเครื่องใช้ไฟฟ้า' 
                : 'Watch the physical induction disc spin speed respond in real time to appliance wattage'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPhysicsGuide(!showPhysicsGuide)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-sky-500/20"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'th' ? (showPhysicsGuide ? 'ซ่อนคู่มือฟิสิกส์' : '📖 วิธีเล่น & ฟิสิกส์จานหมุน') : (showPhysicsGuide ? 'Hide Physics Guide' : '📖 How It Works & Physics')}</span>
          </button>

          {!isDiagnosticMode ? (
            <button
              onClick={startDiagnosticChallenge}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{lang === 'th' ? '⚡ เริ่มภารกิจปราบมิเตอร์หมุนเร็ว' : '⚡ Start Diagnostic Challenge'}</span>
            </button>
          ) : (
            <button
              onClick={resetSimulator}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'th' ? 'คืนค่าเริ่มต้น' : 'Reset Simulator'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Induction Physics & Guide Collapsible */}
      {showPhysicsGuide && (
        <div className={`p-5 rounded-3xl border space-y-3 animate-fadeIn ${
          isDarkMode ? 'bg-slate-900/80 border-sky-500/30' : 'bg-sky-50/80 border-sky-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-xs text-sky-400 uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>{lang === 'th' ? 'หลักการทำงานทางฟิสิกส์ & วิศวกรรมไฟฟ้าของมิเตอร์จานหมุนเหนี่ยวนำ:' : 'Physics & Engineering Principles of Induction Meters:'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
            <div className={`p-3.5 rounded-2xl border ${isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h5 className="font-bold text-sky-400 mb-1">
                {lang === 'th' ? '1. จานหมุนอะลูมิเนียม (Eddy Currents)' : '1. Aluminum Disk & Eddy Currents'}
              </h5>
              <p className="text-slate-300 text-[11px]">
                {lang === 'th' 
                  ? 'ขดลวดแรงดันและขดลวดกระแสสร้างสนามแม่เหล็กสลับ เหนี่ยวนำให้เกิด "กระแสไหลวน" ในจาน เกิดแรงบิดหมุนที่แปรผันตรงกับกำลังไฟฟ้าจริง P = V × I × cosθ' 
                  : 'Voltage and current coils generate magnetic flux, producing eddy currents in the disk. Torque is directly proportional to active real power P = V × I × cosθ.'}
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border ${isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h5 className="font-bold text-emerald-400 mb-1">
                {lang === 'th' ? '2. ค่าคงที่มิเตอร์ 1,200 rev/kWh' : '2. Meter Constant (Kh)'}
              </h5>
              <p className="text-slate-300 text-[11px]">
                {lang === 'th' 
                  ? 'เมื่อใช้พลังงานครบ 1 หน่วย (1,000 Wh) จานจะหมุนครบ 1,200 รอบ หากเปิดโหลด 1,000W จานจะหมุน 20 รอบต่อนาที (RPM)' 
                  : 'Consuming 1 kWh requires 1,200 disk revolutions. A steady 1,000W load rotates the disk at 20 RPM.'}
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border ${isDarkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h5 className="font-bold text-amber-400 mb-1">
                {lang === 'th' ? '3. การทดลองปราบโหลดแวมไพร์' : '3. Standby Vampire Challenge'}
              </h5>
              <p className="text-slate-300 text-[11px]">
                {lang === 'th' 
                  ? 'กดสวิตช์เบรกเกอร์ หรือกดปุ่ม "โหมดประหยัด (Eco)" เพื่อดูจานหมุนช้าลงอย่างเห็นได้ชัด และสัมผัสผลประหยัดเงินในมิเตอร์จริง' 
                  : 'Toggle breaker switches or activate Eco modes to visibly slow down the rotating disk and observe live cost drops.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Diagnostic Alert Challenge Bar */}
      {isDiagnosticMode && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
          diagnosticSolved 
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' 
            : 'bg-amber-950/40 border-amber-500/50 text-amber-300'
        }`}>
          <div className="flex items-center gap-3">
            {diagnosticSolved ? (
              <Trophy className="w-6 h-6 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 animate-bounce" />
            )}
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold">
                {diagnosticSolved 
                  ? (lang === 'th' ? '🎉 สำเร็จ! คุณลดภาระมิเตอร์ลงต่ำกว่า 900W ได้สำเร็จ' : '🎉 Solved! Meter load is now below 900W') 
                  : (lang === 'th' ? `🚨 ภารกิจ: จานหมุนกำลังหมุนเร็วเกินไป! ลดโหลดไฟฟ้าให้ต่ำกว่า ${diagnosticGoalWatts}W` : `🚨 Challenge: The meter is spinning too fast! Lower load below ${diagnosticGoalWatts}W`)}
              </h4>
              <p className="text-[11px] opacity-80">
                {diagnosticSolved 
                  ? (lang === 'th' ? 'ได้รับ +60 Eco Coins & +120 XP สำหรับการวินิจฉัยถูกต้อง!' : 'Awarded +60 Eco Coins & +120 XP for successful diagnosis!') 
                  : (lang === 'th' ? 'คำใบ้: ปิดเครื่องทำน้ำอุ่น หรือปรับแอร์เป็นโหมด Eco 26°C + ปิดแวมไพร์' : 'Hint: Turn off water heater, toggle AC to 26°C Eco, or switch off standby!')}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase font-mono block opacity-70">
              {lang === 'th' ? 'เป้าหมาย' : 'Target'}
            </span>
            <span className={`text-base font-black font-mono ${totalWatts <= diagnosticGoalWatts ? 'text-emerald-400' : 'text-amber-400'}`}>
              {totalWatts}W / &lt;{diagnosticGoalWatts}W
            </span>
          </div>
        </div>
      )}

      {/* Main 2-Column Section: Physical Analog Meter View + Appliance Breaker Rack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Classic Analog Induction Meter Enclosure (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-6 rounded-[2.5rem] border relative overflow-hidden shadow-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-slate-700/80 shadow-black/40' 
              : 'bg-gradient-to-b from-slate-100 via-white to-slate-100 border-slate-300 shadow-slate-300/60'
          }`}>
            {/* Top PEA/MEA Identification Badge */}
            <div className="text-center pb-4 border-b border-slate-700/40">
              <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-400">
                PEA / MEA INDUCTION WATTHOUR METER
              </span>
              <h4 className="text-xs font-bold text-slate-300 mt-0.5">
                SINGLE-PHASE 2-WIRE (220V 5(15)A 50Hz)
              </h4>
            </div>

            {/* 1. Mechanical Odometer (Rolling Counter) */}
            <div className="my-5 flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-mono mb-1.5 uppercase font-bold">
                KILOWATTHOURS (kWh)
              </span>
              <div className="flex items-center gap-1 p-2 rounded-xl bg-slate-950 border-2 border-slate-700 shadow-inner">
                {meterOdometerKwh.toFixed(1).padStart(7, '0').split('').map((char, i) => (
                  <span
                    key={i}
                    className={`w-7 h-10 rounded-md flex items-center justify-center font-mono font-black text-lg ${
                      char === '.'
                        ? 'w-2 bg-transparent text-slate-400'
                        : i === 6 // Decimal wheel
                        ? 'bg-rose-600 text-white border border-rose-500'
                        : 'bg-slate-900 text-amber-400 border border-slate-800'
                    }`}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Analog Spinning Induction Disc Inspection Glass */}
            <div className="my-6 flex flex-col items-center">
              <div className="w-full max-w-[280px] h-24 rounded-2xl bg-slate-950/90 border-2 border-slate-700 relative overflow-hidden flex items-center justify-center shadow-inner">
                {/* Horizontal Center Reference Guideline */}
                <div className="absolute inset-x-0 h-0.5 bg-slate-800 top-1/2 -translate-y-1/2 pointer-events-none" />
                
                {/* Glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                {/* Rotating Disc Edge Profile */}
                <div className="relative w-56 h-12 flex items-center justify-center">
                  {/* The metallic disc cylinder illusion */}
                  <div className="w-full h-4 rounded-full bg-gradient-to-r from-slate-500 via-slate-200 to-slate-600 border border-slate-400 shadow-lg relative overflow-hidden flex items-center">
                    {/* Disc Red Rotation Marker Stripe */}
                    <div 
                      className="absolute top-0 bottom-0 w-6 bg-rose-600 shadow-md shadow-rose-600/50"
                      style={{
                        left: `${((Math.sin((discRotationDeg * Math.PI) / 180) + 1) / 2) * 85}%`,
                        opacity: Math.cos((discRotationDeg * Math.PI) / 180) >= 0 ? 1 : 0.2
                      }}
                    />
                  </div>
                </div>

                {/* Disc spin speed label */}
                <div className="absolute bottom-1.5 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>◀ {lang === 'th' ? 'ทวนเข็ม' : 'CCW'}</span>
                  <span className={totalWatts > 2000 ? 'text-rose-400 font-bold animate-pulse' : 'text-emerald-400'}>
                    {totalWatts > 0 ? `${(rotationSpeedDegPerSec / 6).toFixed(1)} RPM` : '0 RPM (IDLE)'}
                  </span>
                  <span>{lang === 'th' ? 'จานหมุน 1,200 rev/kWh' : '1,200 rev/kWh'} ▶</span>
                </div>
              </div>
            </div>

            {/* 3. Live Active Wattage Meter Readout */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">
                {lang === 'th' ? 'กำลังไฟฟ้าใช้งานรวม ณ ปัจจุบัน (Active Power)' : 'Total Active Load'}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-amber-400">
                {totalWatts.toLocaleString()} <span className="text-lg text-slate-400 font-sans font-bold">W</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {totalWatts === 0 
                  ? (lang === 'th' ? '💤 ปิดอุปกรณ์ทั้งหมด จานหมุนหยุดสนิท' : '💤 All loads off, disc stopped') 
                  : totalWatts > 2500 
                  ? (lang === 'th' ? '🔥 กำลังไฟสูงมาก! จานหมุนเร็ว ค่าไฟกำลังพุ่ง' : '🔥 Heavy surge load! Disc spinning rapidly') 
                  : (lang === 'th' ? '🌱 โหลดไฟฟ้าเหมาะสม อยู่ในเกณฑ์ประหยัด' : '🌱 Efficient moderate load')}
              </p>
            </div>

            {/* Real-world Calculation Formula Breakdown */}
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-[11px] space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                <Calculator className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'สูตรคำนวณหน่วยไฟฟ้า (kWh):' : 'Formula Calculation:'}</span>
              </div>
              <p className="font-mono text-slate-300 leading-relaxed">
                ({totalWatts}W × 8h) ÷ 1,000 = <strong className="text-emerald-400">{dailyUnits.toFixed(2)} {lang === 'th' ? 'หน่วย/วัน' : 'kWh/day'}</strong>
              </p>
              <p className="text-slate-400">
                {lang === 'th' ? 'คิดเป็นเงินค่าไฟเฉลี่ย: ' : 'Est. daily cost: '}
                <strong className="text-amber-400 font-mono">~{estimatedCostBaht.toFixed(1)} ฿/{lang === 'th' ? 'วัน' : 'day'}</strong> (~{(estimatedCostBaht * 30).toFixed(0)} ฿/{lang === 'th' ? 'ด.' : 'mo'})
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Appliance Toggles & Breaker Box (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-sm font-extrabold font-display uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{lang === 'th' ? 'แผงควบคุมเครื่องใช้ไฟฟ้าในบ้าน (Appliance Controls)' : 'Appliance Circuit Controls'}</span>
            </h4>
            <span className="text-xs text-slate-400 font-mono">
              {appliances.filter(a => a.isOn).length} / {appliances.length} {lang === 'th' ? 'เปิดอยู่' : 'Active'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {appliances.map((item) => {
              const currentWatts = item.isOn ? (item.isEco ? item.ecoWatts : item.normalWatts) : 0;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.isOn
                      ? isDarkMode 
                        ? 'bg-slate-900 border-slate-700 shadow-md' 
                        : 'bg-white border-slate-300 shadow-sm'
                      : isDarkMode 
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-60' 
                        : 'bg-slate-100 border-slate-200 opacity-60'
                  }`}
                >
                  {/* Top Switch Row */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div>
                      <h5 className="text-xs sm:text-sm font-extrabold font-display leading-tight">
                        {lang === 'th' ? item.nameTh : item.nameEn}
                      </h5>
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.isOn 
                          ? `${currentWatts} W (${item.isEco ? (lang === 'th' ? 'โหมดประหยัด' : 'Eco Mode') : (lang === 'th' ? 'โหมดปกติ' : 'Normal')})` 
                          : (lang === 'th' ? 'ปิดเครื่อง (0 W)' : 'Turned OFF (0 W)')}
                      </span>
                    </div>

                    {/* Power Toggle Button */}
                    <button
                      onClick={() => toggleAppliance(item.id)}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        item.isOn
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                      title={item.isOn ? 'Turn OFF' : 'Turn ON'}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Eco Mode Toggle Button (When Turned ON) */}
                  {item.isOn && (
                    <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleApplianceEco(item.id)}
                        className={`py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          item.isEco
                            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                            : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 border border-slate-700'
                        }`}
                      >
                        <Leaf className="w-3.5 h-3.5" />
                        <span>{item.isEco ? (lang === 'th' ? 'เปิดโหมดประหยัดอยู่' : 'Eco Mode Active') : (lang === 'th' ? 'สลับเป็นโหมดประหยัด' : 'Enable Eco Mode')}</span>
                      </button>

                      <span className="text-[10px] font-mono text-emerald-400">
                        {item.isEco && `-${item.normalWatts - item.ecoWatts}W`}
                      </span>
                    </div>
                  )}

                  {/* Memory Hook Tip */}
                  <div className="mt-2.5 text-[10px] text-slate-400 flex items-start gap-1">
                    <span className="text-amber-400 shrink-0">💡</span>
                    <span>{lang === 'th' ? item.memoryHookTh : item.memoryHookEn}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
