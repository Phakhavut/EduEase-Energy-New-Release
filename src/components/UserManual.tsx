
import React, { useState, useMemo } from 'react';

interface UserManualProps {
  isOpen: boolean;
  onClose?: () => void;
  isDarkMode: boolean;
  lang: 'th' | 'en';
  isInline?: boolean;
}

const UserManual: React.FC<UserManualProps> = ({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  lang, 
  isInline = false 
}) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'dashboard' | 'stats' | 'nodes' | 'ai' | 'calc' | 'security'>('intro');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedField, setCopiedField] = useState<'user' | 'pass' | null>(null);

  if (!isInline && !isOpen) return null;

  // Modern UI color mapping with supreme accessibility contrast
  const bgClass = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-2xl';
  const textClass = isDarkMode ? 'text-white' : 'text-slate-900 font-black';
  const mutedTextClass = isDarkMode ? 'text-slate-500' : 'text-slate-600 font-extrabold';
  const paragraphClass = isDarkMode ? 'text-slate-300' : 'text-slate-900 font-semibold';
  const overlayClass = isDarkMode ? 'bg-black/80' : 'bg-slate-950/60';
  const codeBg = isDarkMode ? 'bg-slate-800 text-emerald-400 border-slate-700' : 'bg-slate-100 text-emerald-900 border-emerald-300 font-extrabold shadow-sm';
  const cardBg = isDarkMode ? 'bg-slate-800/70 border-slate-800' : 'bg-white border-slate-300 shadow-md';
  const borderThinClass = isDarkMode ? 'border-slate-800' : 'border-slate-200';

  const translations = {
    th: {
      title: '📚 คู่มือการใช้งานแบบละเอียด (Comprehensive User Manual)',
      subtitle: 'เรียนรู้วิธีการใช้งานระบบ ตรวจสอบค่าไฟ และควบคุมอุปกรณ์ต่างๆ ในบ้านอย่างเจาะลึกครบทุกฟีเจอร์',
      tab_intro: '🔑 เริ่มต้น & ล็อกอิน',
      tab_dashboard: '📊 แดชบอร์ดหลัก',
      tab_stats: '📈 สถิติย้อนหลัง',
      tab_nodes: '⚙️ จัดการอุปกรณ์',
      tab_ai: '🧠 คำแนะนำจาก AI',
      tab_calc: '⚡ วิเคราะห์ & งบ',
      tab_security: '🛡️ ความปลอดภัย',
      close: 'ปิดหน้าต่างคู่มือ',
      credentials_title: '🔑 รหัสผ่านสำหรับเข้าสู่ระบบ (Demo Credentials)',
      credentials_desc: 'ใช้ข้อมูลด้านล่างนี้เพื่อเข้าสู่ระบบ:',
      username: 'บัญชีใช้งาน (Username):',
      password: 'รหัสผ่านแรกเข้า (Password):',
      copied_username_tip: 'คัดลอกชื่อบัญชีเรียบร้อย!',
      copied_password_tip: 'คัดลอกรหัสผ่านเรียบร้อย!',
      copy_btn: 'คัดลอกข้อมูล',
      search_placeholder: 'ค้นหาในคู่มือ... (เช่น "แอร์", "AI", "TOU", "งบ")',
      badge_pro_tip: 'ข้อแนะนำเชิงกลยุทธ์ (Pro Tip)',
      warning_title: '⚠️ ข้อควรระวังและแนวทางแก้ไข',
      feedback_success: 'คัดลอกแล้ว',
      no_results: '❌ ขออภัย! ไม่พบคู่มือแนะนำที่ตรงกับคำค้นหาของคุณ',
      total_chapters: 'เนื้อหาทั้งหมด 7 หมวด',
    },
    en: {
      title: '📚 Comprehensive User Manual',
      subtitle: 'Learn how to use the dashboard, monitor energy, and control your devices in deep detail.',
      tab_intro: '🔑 Onboarding',
      tab_dashboard: '📊 Dashboard',
      tab_stats: '📈 Stats',
      tab_nodes: '⚙️ Devices',
      tab_ai: '🧠 AI Hub',
      tab_calc: '⚡ Calc & Budget',
      tab_security: '🛡️ Security',
      close: 'Close Handbook',
      credentials_title: '🔑 Demo Login Credentials',
      credentials_desc: 'Use the following credentials to log in:',
      username: 'Credentials Account:',
      password: 'Security Passcode:',
      copied_username_tip: 'Username copied to clipboard!',
      copied_password_tip: 'Passcode copied to clipboard!',
      copy_btn: 'Copy Access',
      search_placeholder: 'Search handbook... (e.g., "AC", "AI", "TOU", "Budget")',
      badge_pro_tip: 'Strategic Pro Tip',
      warning_title: '⚠️ Advanced Calibration Warnings',
      feedback_success: 'Copied!',
      no_results: '❌ No chapters found matching your search keys. Please retry.',
      total_chapters: 'Structure covers 7 operational modules.',
    }
  };
  const t = translations[lang];

  const handleCopy = (field: 'user' | 'pass', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, index) => 
          regex.test(part) ? (
            <mark key={index} className="bg-yellow-100 dark:bg-yellow-950/80 text-yellow-905 dark:text-yellow-200 px-1 py-0.5 rounded font-black border border-yellow-300 dark:border-yellow-900">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const textIncludesSearch = (text: string) => {
    if (!searchTerm.trim()) return true;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const modalContent = (
    <div className={`w-full max-w-5xl md:h-[90vh] ${bgClass} md:rounded-3xl flex flex-col relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10`}>
      
      {/* HEADER SECTION */}
      <div className={`p-6 md:p-8 border-b ${borderThinClass} flex flex-col gap-4 flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md relative z-10`}>
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <h2 className={`text-2xl md:text-3xl font-display font-black ${textClass} tracking-tight`}>
              {highlightText(t.title, searchTerm)}
            </h2>
            <p className={`text-sm md:text-base ${paragraphClass} max-w-2xl opacity-90 leading-relaxed`}>
              {highlightText(t.subtitle, searchTerm)}
            </p>
          </div>
          {!isInline && (
            <button 
              onClick={onClose}
              className="p-2 -mr-2 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <i className="fas fa-times-circle text-xl"></i>
            </button>
          )}
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full max-w-lg mt-2">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i className="fas fa-search text-slate-400"></i>
          </div>
          <input
            type="text"
            placeholder={t.search_placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-11 pr-4 py-3 rounded-2xl border transition-all text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              isDarkMode 
                ? 'bg-slate-950/50 border-slate-700 text-white placeholder-slate-500' 
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
            }`}
          />
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className={`px-4 md:px-8 py-3 border-b ${borderThinClass} bg-slate-50 dark:bg-slate-900/80 flex-shrink-0 overflow-x-auto scrollbar-hide`}>
        <div className="flex gap-2 min-w-max">
          {[
            { id: 'intro', label: t.tab_intro, icon: 'fa-user-cog text-emerald-500' },
            { id: 'dashboard', label: t.tab_dashboard, icon: 'fa-chart-area text-blue-500' },
            { id: 'stats', label: t.tab_stats, icon: 'fa-chart-pie text-indigo-500' },
            { id: 'nodes', label: t.tab_nodes, icon: 'fa-laptop-house text-cyan-500' },
            { id: 'ai', label: t.tab_ai, icon: 'fa-brain text-purple-400' },
            { id: 'calc', label: t.tab_calc, icon: 'fa-bolt text-amber-500' },
            { id: 'security', label: t.tab_security, icon: 'fa-shield-halved text-purple-500' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[0.8rem] md:text-sm font-black rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? (isDarkMode ? 'bg-primary border-primary text-white shadow-lg' : 'bg-primary border-primary text-white shadow-md')
                    : (isDarkMode ? 'border-slate-800 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-100')
                }`}
              >
                <i className={`fas ${tab.icon} ${isSelected ? '!text-white' : ''}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-8 bg-white dark:bg-slate-900/20 scrollbar-thin">
        
        {/* ======================= TAB 1: INTRO ======================= */}
        {activeTab === 'intro' && (
          <div className="space-y-6 animate-fade-in">
            <div className={`p-6 rounded-[2rem] border-2 border-dashed ${isDarkMode ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-emerald-500/30 bg-emerald-500/5'} space-y-4`}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-2xl">
                  <i className="fas fa-lock-open text-xl"></i>
                </div>
                <div>
                  <h5 className={`font-display font-black text-base ${textClass}`}>{t.credentials_title}</h5>
                  <p className={`text-sm ${paragraphClass} opacity-90`}>{t.credentials_desc}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${cardBg} flex justify-between items-center`}>
                  <div>
                    <span className={`text-xs font-bold ${mutedTextClass}`}>{t.username}</span>
                    <strong className={`block mt-1 px-3 py-1.5 rounded-lg text-sm font-mono border ${codeBg}`}>Namyen</strong>
                  </div>
                  <button onClick={() => handleCopy('user', 'Namyen')} className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                    <i className={`fas ${copiedField === 'user' ? 'fa-check' : 'fa-copy'}`}></i>
                  </button>
                </div>
                <div className={`p-4 rounded-2xl border ${cardBg} flex justify-between items-center`}>
                  <div>
                    <span className={`text-xs font-bold ${mutedTextClass}`}>{t.password}</span>
                    <strong className={`block mt-1 px-3 py-1.5 rounded-lg text-sm font-mono border ${codeBg}`}>12345</strong>
                  </div>
                  <button onClick={() => handleCopy('pass', '12345')} className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                    <i className={`fas ${copiedField === 'pass' ? 'fa-check' : 'fa-copy'}`}></i>
                  </button>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-cubes text-primary"></i>
                {lang === 'th' ? 'ข้อมูลเบื้องต้นเกี่ยวกับระบบ (System Overview)' : 'System Overview'}
              </h5>
              <p className={`${paragraphClass} text-sm leading-relaxed`}>
                {lang === 'th' 
                  ? 'ระบบนี้เป็นศูนย์ควบคุมส่วนกลาง (Control Hub) ที่ถูกออกแบบมาให้ติดตามค่าพลังงาน สถิติรายวัน การจำลองปรับตั้งค่าฮาร์ดแวร์เพื่อลดค่าใช้จ่าย และการแจ้งเตือนจากระบบรักษาความปลอดภัย โดยทำงานคู่กับ AI (Gemini) เพื่อวิเคราะห์ให้เชิงลึก'
                  : 'This Control Hub is designed to track energy metrics, simulate hardware adjustments to cut costs, and alert on security logs. It works closely with Gemini AI for deep analysis.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: DASHBOARD ======================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-piggy-bank text-emerald-500"></i>
                {lang === 'th' ? '1. ส่วนสรุปข้อมูลหลัก (Hero Metrics)' : '1. Hero Metrics'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'แสดงภาพรวมที่สำคัญที่สุด ได้แก่:'
                  : 'Displays the most critical high-level overviews:'}
              </p>
              <ul className="list-disc ps-5 space-y-2 font-bold opacity-90">
                <li>{lang === 'th' ? 'เงินประหยัดสะสม (Total Savings): จำนวนเงินที่ถูกประหยัดได้จากการตั้งค่า AI' : 'Total Savings: Money saved via AI optimization.'}</li>
                <li>{lang === 'th' ? 'การใช้พลังงานปัจจุบัน (Active Load): วัตต์รวมที่กำลังใช้งานอยู่ในวินาทีนี้' : 'Active Load: Current total wattage running.'}</li>
              </ul>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-toggle-on text-indigo-500"></i>
                {lang === 'th' ? '2. สวิตช์จำลองการตั้งค่า AI (AI Override Switches)' : '2. AI Override Switches'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'ระบบให้คุณเปิด-ปิด สวิตช์จำลองต่างๆ เช่น "ปรับอุณหภูมิ AC 1°C", "ปิดอุปกรณ์ Standby" เพื่อประเมินยอดเงินที่จะประหยัดได้แบบสดๆ ทันที (Real-time Shaving)'
                  : 'Toggle simulation switches like "AC Offset" or "Standby Cutoff" to instantly see how much energy and money can be saved.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-network-wired text-cyan-500"></i>
                {lang === 'th' ? '3. ระบบวินิจฉัยเครือข่าย (Network Diagnostics)' : '3. Network Diagnostics'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'แผงแสดงความหน่วง (Latency), แพ็กเก็ตสูญหาย (Packet Loss), และสถานะ Uptime เพื่อให้วิศวกรตรวจสอบว่าระบบ IoT ที่เชื่อมต่อมีสัญญาณที่เสถียรหรือไม่'
                  : 'Panels detailing Latency, Packet Loss, and Uptime, allowing engineers to verify if the IoT network is stable.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================= TAB 3: STATS ======================= */}
        {activeTab === 'stats' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-chart-line text-blue-500"></i>
                {lang === 'th' ? '1. กราฟ 7 วัน (7-Day Telemetry Chart)' : '1. 7-Day Telemetry Chart'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'แท็บ Telemetry มีกราฟเชิงปฏิสัมพันธ์ (Interactive Chart) ที่แสดงการใช้พลังงาน 7 วันย้อนหลัง สามารถ "เอาเมาส์ชี้ (Hover)" เพื่อดูค่าใช้จ่ายในจุดนั้นๆ ได้ทันที'
                  : 'The Telemetry tab features an interactive 7-day usage chart. Hover over any data point to reveal the exact wattage and estimated cost at that moment.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-microchip text-indigo-500"></i>
                {lang === 'th' ? '2. ข้อมูลวิเคราะห์เชิงลึก (Analytics Tab)' : '2. Analytics Tab'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'ในหน้า Analytics จะมีกราฟวงกลมและตัวชี้วัดสุขภาพอุปกรณ์ (Health Indicators) รวมถึง Power Factor (ประสิทธิภาพไฟ) ช่วยในการบำรุงรักษาเชิงป้องกัน (Preventive Maintenance)'
                  : 'The Analytics tab shows pie charts for power distribution, device health indicators, and Power Factor efficiency for preventive maintenance.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================= TAB 4: NODES (DEVICES) ======================= */}
        {activeTab === 'nodes' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-sliders text-cyan-500"></i>
                {lang === 'th' ? '1. เปิด/ปิดอุปกรณ์ และ ดูรายละเอียด' : '1. Toggle & Inspect'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'หน้า "จัดการอุปกรณ์" แสดงลิสต์เครื่องใช้ไฟฟ้าทั้งหมด คุณสามารถกดเปิด/ปิดสวิตช์อุปกรณ์เพื่อดูโหลดไฟรวมที่เปลี่ยนไป หรือกดปุ่มฟันเฟืองเพื่อแก้ไขข้อมูลวัตต์และชั่วโมงใช้งาน'
                  : 'The Devices list allows you to toggle power state to see live load changes, or click the gear icon to edit wattage and usage hours.'}
              </p>
            </div>

            <div className={`p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 flex gap-4`}>
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex justify-center items-center font-bold">
                <i className="fas fa-plug"></i>
              </div>
              <div>
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  {lang === 'th' ? 'คู่มือตั้งค่ากำลังไฟพื้นฐาน (Wattage Guide)' : 'Wattage Setup Guide'}
                </span>
                <ul className="list-disc ps-4 mt-2 space-y-1 font-semibold opacity-90">
                  <li>{lang === 'th' ? 'แอร์ 9000-18000 BTU: ~800W - 1800W' : 'AC 9k-18k BTU: ~800W - 1800W'}</li>
                  <li>{lang === 'th' ? 'เครื่องทำน้ำอุ่น: ~3000W - 4500W' : 'Water Heater: ~3000W - 4500W'}</li>
                  <li>{lang === 'th' ? 'ตู้เย็น: ~100W - 250W' : 'Refrigerator: ~100W - 250W'}</li>
                  <li>{lang === 'th' ? 'Power Factor (PF): ปกติอยู่ที่ 0.85-0.95 (1.0 คือดีที่สุด ไม่มีไฟสูญเสีย)' : 'Power Factor: Typically 0.85-0.95 (1.0 is perfect efficiency)'}</li>
                </ul>
              </div>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-balance-scale text-teal-500"></i>
                {lang === 'th' ? '2. เปรียบเทียบอุปกรณ์ (Compare)' : '2. Compare Devices'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'เลือก Checkbox หน้าอุปกรณ์ 2 ตัวขึ้นไป แล้วกดปุ่ม "เปรียบเทียบ (Compare Selected)" ระบบจะสร้างตารางเปรียบเทียบว่าใครกินไฟสุดและใคร PF ดีสุด'
                  : 'Check the boxes next to 2 or more devices and click "Compare Selected" to reveal side-by-side efficiency and consumption battles.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================= TAB 5: AI HUB ======================= */}
        {activeTab === 'ai' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-brain text-purple-500"></i>
                {lang === 'th' ? 'ระบบอัจฉริยะ (Energy Monitoring Hub)' : 'Energy Monitoring Hub'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'ระบบนี้เชื่อมโยงกับ Gemini AI เพื่อนำข้อมูลโหลดปัจจุบันทั้งหมดของคุณ ไปสร้างแผนการประหยัดพลังงาน (Optimization Plan) โดยคุณสามารถเห็นว่าถ้าทำตามคำแนะนำ จะประหยัดเงินได้กี่บาท'
                  : 'This connects with Gemini AI to ingest all your current load data and formulate actionable Optimization Plans, highlighting exactly how much money you save.'}
              </p>
              
              <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl mt-4">
                <p className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                  <i className="fas fa-sparkles"></i> 
                  {lang === 'th' ? 'เคล็ดลับ:' : 'Pro Tip:'}
                </p>
                <p className="mt-1 opacity-90">
                  {lang === 'th' 
                    ? 'หากคุณเพิ่มอุปกรณ์กินไฟหนักๆ ลงไปในหน้าจัดการอุปกรณ์ (เช่น เครื่องชาร์จ EV) AI จะให้คำแนะนำใหม่เกี่ยวกับการย้ายเวลาชาร์จ (TOU Shifting) โดยอัตโนมัติ!'
                    : 'If you add heavy devices like an EV Charger in the Devices tab, the AI will dynamically adjust and recommend TOU Shifting schedules!'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 6: CALCULATOR ======================= */}
        {activeTab === 'calc' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-calculator text-amber-500"></i>
                {lang === 'th' ? 'การประเมินค่าไฟและงบประมาณ (Cost & Budget)' : 'Cost & Budget Estimation'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'คุณสามารถใช้เครื่องมือนี้จำลองบิลค่าไฟได้ล่วงหน้า:'
                  : 'Use this tool to simulate future bills and grid budgets:'}
              </p>
              
              <ul className="space-y-3 font-semibold opacity-90 mt-4">
                <li className="flex items-start gap-2">
                  <i className="fas fa-coins text-amber-500 mt-1"></i>
                  {lang === 'th' 
                    ? 'เปลี่ยนเรทค่าไฟ (Tariff Rate): กรอกตัวเลขบาท/หน่วย เพื่อจำลองสถานการณ์ค่าไฟขึ้นหรือลง' 
                    : 'Change Tariff Rate (฿/kWh): Simulate bill impacts if energy prices rise or fall.'}
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-calendar text-amber-500 mt-1"></i>
                  {lang === 'th' 
                    ? 'สไลเดอร์วัน (Forecast Slider): เลื่อนจาก 1 วัน ไปจนถึงรายปี 365 วัน' 
                    : 'Forecast Slider: Slide from 1 day up to 365 days.'}
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-wallet text-amber-500 mt-1"></i>
                  {lang === 'th' 
                    ? 'งบประมาณ (Grid Budget): ตั้งงบของคุณ แล้วระบบจะคำนวณว่าเงินจะหมดภายในกี่วันตามการใช้ไฟปัจจุบัน!' 
                    : 'Grid Budget: Set a budget and let the system calculate in how many days your money will run out based on current usage!'}
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ======================= TAB 7: SECURITY ======================= */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-shield-halved text-purple-500"></i>
                {lang === 'th' ? 'ความปลอดภัยและการแจ้งเตือน (Alerts & Integrity)' : 'Alerts & Grid Integrity'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'หน้า Noti/Security ทำหน้าที่รับบันทึกเหตุการณ์ต่างๆ (Event Logs) ไม่ว่าจะเป็นแอร์ทำงานหนักเกินไป หรือแรงดันไฟตก'
                  : 'The Noti page records event logs, such as overloaded AC units or voltage drops.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${isDarkMode ? 'border-purple-500/30 bg-purple-900/10' : 'border-purple-300 bg-purple-50'} space-y-4`}>
              <h5 className={`font-display font-black text-base text-purple-600 dark:text-purple-400 flex items-center gap-2`}>
                <i className="fas fa-microchip"></i>
                {lang === 'th' ? 'AI Log Integrity Scan' : 'AI Log Integrity Scan'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'คุณสามารถเลื่อนลงไปด้านล่างสุดของหน้าแจ้งเตือน เพื่อคลิกปุ่ม "วิเคราะห์ Log ด้วย AI" ระบบจะจับพฤติกรรมแปลกปลอมในเครือข่าย เช่น ตรวจพบการแอบใช้ไฟ (Cryptojacking) หรือสัญญาณรบกวนในระบบ โดยให้เรทติ้งความปลอดภัยแบบเรียลไทม์'
                  : 'Scroll to the bottom of the alerts page to run an "AI Log Scan". The system detects anomalies like cryptojacking or harmonic distortion, providing a real-time security rating.'}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER AREA */}
      <div className={`p-6 border-t ${borderThinClass} flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-100/40 dark:bg-slate-900/60 flex-shrink-0 relative z-10`}>
        <div className="flex items-center gap-2">
          <i className="fas fa-graduation-cap text-primary text-xs"></i>
          <span className={`text-xs ${mutedTextClass} tracking-wider font-mono font-bold uppercase`}>
            © 2026 EduEase Energy - Detailed Handbook
          </span>
        </div>
        {!isInline && onClose && (
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-black shadow-lg hover:bg-primary/90 transition-all"
          >
            {t.close}
          </button>
        )}
      </div>
    </div>
  );

  if (isInline) {
    return modalContent;
  }

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-0 md:p-4">
      <div 
        onClick={onClose}
        className={`absolute inset-0 ${isDarkMode ? 'bg-black/75' : 'bg-slate-900/40'} backdrop-blur-sm transition-opacity duration-300`} 
      />
      
      <div className="relative w-full h-full md:h-auto md:max-w-5xl z-10 animate-scale-up md:flex md:items-center md:justify-center">
        {modalContent}
      </div>
    </div>
  );
};

export default UserManual;
