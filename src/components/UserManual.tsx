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
  const [activeTab, setActiveTab] = useState<'intro' | 'dashboard' | 'nodes' | 'calc' | 'budget' | 'security'>('intro');
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

  const t = {
    th: {
      title: '📚 คู่มือแนะนำการควบคุมระบบโครงข่ายไฟฟ้าอัจฉริยะ (EduEase Operations Manual)',
      subtitle: 'ศึกษาขั้นตอนปฏิบัติงาน สิทธิ์การเข้าถึง และการใช้เครื่องมือประเมินระดับสากลด้วยสแกนเนอร์ปัญญาประดิษฐ์',
      tab_intro: '🔑 เริ่มต้น & ล็อกอิน',
      tab_dashboard: '📊 แดชบอร์ด & ระบบเฝ้าระวัง',
      tab_nodes: '⚙️ บริหารอุปกรณ์โหนด',
      tab_calc: '⚡ วิเคราะห์ค่าไฟ',
      tab_budget: '💰 วางแผนงบประมาณ',
      tab_security: '🛡️ ความปลอดภัย & AI Log Scan',
      close: 'ปิดระเบียบผู้ช่วย',
      credentials_title: '🔑 ข้อมูลบัญชีจำลองสำหรับเข้าคุมระบบ (Access Authorization Token)',
      credentials_desc: 'ใช้รหัสผ่านสิทธิ์วิศวกรผู้ดูแลระบบในแถบหน้าแรกเพื่อปลดล็อกฟังก์ชัน:',
      username: 'บัญชีใช้งาน (Username):',
      password: 'รหัสผ่านแรกเข้า (Password):',
      copied_username_tip: 'คัดลอกชื่อบัญชีเรียบร้อย!',
      copied_password_tip: 'คัดลอกรหัสผ่านเรียบร้อย!',
      copy_btn: 'คัดลอกข้อมูล',
      search_placeholder: 'พิมพ์หัวข้อหรือคำที่ต้องการค้นหาในคู่มือ... (เช่น "แอร์", "AI", "TOU", "งบ")',
      badge_pro_tip: 'ข้อแนะนำเชิงกลยุทธ์ (Pro Tip)',
      warning_title: '⚠️ ข้อควรระวังและแนวทางแก้ไข (Critical Troubleshooting)',
      feedback_success: 'คัดลอกแล้ว',
      no_results: '❌ ขออภัย! ไม่พบคู่มือแนะนำที่ตรงกับคำจำกัดความของคุณ',
      total_chapters: 'โครงสร้างเนื้อหาทั้งหมด 6 หมวดจำลองสถานการณ์จริง',
    },
    en: {
      title: '📚 Comprehensive Microgrid Control Center Manual (Operations Manual)',
      subtitle: 'Examine detailed technician procedures, credentials, telemetry thresholds, and Google Gemini AI tools.',
      tab_intro: '🔑 Onboarding & login',
      tab_dashboard: '📊 Dashboard & Monitoring',
      tab_nodes: '⚙️ Node Asset Controls',
      tab_calc: '⚡ Power Calculator',
      tab_budget: '💰 Budget Longevity',
      tab_security: '🛡️ Security & AI Log Scan',
      close: 'Close Handbook',
      credentials_title: '🔑 Grid Supervisor Authorization Tokens (Keys)',
      credentials_desc: 'Use the following verified terminal keys in the central login screen:',
      username: 'Credentials Account:',
      password: 'Security Passcode:',
      copied_username_tip: 'Username copied to clipboard!',
      copied_password_tip: 'Passcode copied to clipboard!',
      copy_btn: 'Copy Access',
      search_placeholder: 'Search topics inside this handbook... (e.g., "AC", "AI", "TOU", "Budget")',
      badge_pro_tip: 'Strategic Pro Tip',
      warning_title: '⚠️ Advanced Calibration Warnings',
      feedback_success: 'Copied!',
      no_results: '❌ No chapters found matching your search keys. Please retry.',
      total_chapters: 'Standardized Structure covering 6 detailed operational modules.',
    }
  }[lang];

  // Simulated copy handle
  const handleCopy = (field: 'user' | 'pass', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Helper to highlight searched terms for outstanding readability
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

  // Check if current text contains search query
  const textIncludesSearch = (text: string) => {
    if (!searchTerm.trim()) return true;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const modalContent = (
    <div className={`relative w-full flex flex-col md:rounded-[2.5rem] overflow-hidden border transition-all duration-300 scale-100 ${bgClass} shadow-xl h-full md:h-auto md:max-h-[90vh]`}>
      
      {/* HEADER SECTION WITH ELEVATED AESTHETICS */}
      <div className={`p-6 md:p-8 border-b border-dashed ${borderThinClass} bg-gradient-to-tr ${isDarkMode ? 'from-slate-900 via-slate-950 to-slate-900/80' : 'from-emerald-500/5 via-slate-50 to-slate-100/50'} flex flex-col md:flex-row justify-between items-start md:items-center gap-6 flex-shrink-0`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.75rem] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 animate-pulse">
              <i className="fas fa-landmark text-[0.7rem]"></i>
              {lang === 'th' ? 'ระดับมาตรฐานความปลอดภัยสากล' : 'OPERATOR SHIELD STANDARDS'}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[0.75rem] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              v4.0 Live
            </span>
          </div>
          <h3 className={`text-xl md:text-2xl font-display font-black tracking-tight ${textClass} leading-tight`}>
            {t.title}
          </h3>
          <p className={`text-xs md:text-sm ${mutedTextClass} font-medium leading-relaxed max-w-4xl`}>
            {t.subtitle}
          </p>
        </div>
        {!isInline && onClose && (
          <button 
            onClick={onClose}
            className={`p-3 rounded-full border transition-all duration-200 hover:scale-105 ${isDarkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-white text-slate-800 shadow-sm'}`}
            title={t.close}
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        )}
      </div>

      {/* FILTER SEARCH BAR & STATS BAR */}
      <div className={`px-6 md:px-8 py-4 border-b ${borderThinClass} bg-slate-100/80 dark:bg-slate-950/40 flex flex-col sm:flex-row gap-4 items-center justify-between`}>
        <div className="relative w-full sm:w-96 flex-shrink-0">
          <i className="fas fa-search absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
          <input 
            type="text"
            className={`w-full text-xs font-bold pl-11 pr-4 py-3 rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' 
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-inner'
            }`}
            placeholder={t.search_placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors"
            >
              <i className="fas fa-times-circle"></i>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className={`text-[0.8rem] font-mono font-bold ${mutedTextClass}`}>
            <i className="fas fa-book-reader text-primary me-1.5"></i>
            {t.total_chapters}
          </span>
        </div>
      </div>

      {/* COMPACT SECURE NAVIGATION GRID (NO OVERFLOW-X, ZERO HORIZONTAL SCROLLER UX ISSUES) */}
      <div className={`px-6 md:px-8 py-3.5 border-b ${borderThinClass} bg-slate-50 dark:bg-slate-900/80 flex-shrink-0`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 w-full">
          {[
            { id: 'intro', label: t.tab_intro, icon: 'fa-user-cog text-emerald-500' },
            { id: 'dashboard', label: t.tab_dashboard, icon: 'fa-chart-area text-blue-500' },
            { id: 'nodes', label: t.tab_nodes, icon: 'fa-laptop-house text-cyan-500' },
            { id: 'calc', label: t.tab_calc, icon: 'fa-bolt text-amber-500' },
            { id: 'budget', label: t.tab_budget, icon: 'fa-coins text-indigo-500' },
            { id: 'security', label: t.tab_security, icon: 'fa-shield-halved text-purple-500' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center justify-center gap-2 px-3 py-3 text-[0.8rem] font-black rounded-2xl border transition-all text-center cursor-pointer ${
                  isSelected 
                    ? (isDarkMode ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-102' : 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-101')
                    : (isDarkMode ? 'border-slate-800 text-slate-300 hover:bg-slate-800 bg-slate-900/60 shadow-xs' : 'border-slate-250 text-slate-800 bg-white hover:bg-slate-100 shadow-xs')
                }`}
              >
                <i className={`fas ${tab.icon} ${isSelected ? '!text-white' : ''} text-xs md:text-sm`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* EXPANDED CONTENT WRAPPER */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-8 bg-white dark:bg-slate-900/20 scrollbar-thin">

        {/* ========================================================
            TAB 1: INTRO & AUTH (เริ่มต้น & ล็อกอิน) 
            ======================================================== */}
        {activeTab === 'intro' && (
          <div className="space-y-6 animate-fade-in text-xs md:text-sm leading-relaxed">
            
            {/* INCREDIBLE INTERACTIVE CREDENTIALS CARD */}
            <div className={`p-6 rounded-[2rem] border-2 border-dashed ${isDarkMode ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-emerald-500/30 bg-emerald-500/5'} space-y-4`}>
              <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-2xl shadow-lg flex-shrink-0">
                    <i className="fas fa-lock-open text-xl"></i>
                  </div>
                  <div className="space-y-1">
                    <h5 className={`font-display font-black text-sm md:text-base ${textClass}`}>{t.credentials_title}</h5>
                    <p className={`text-xs ${paragraphClass} opacity-90`}>{t.credentials_desc}</p>
                  </div>
                </div>
                <span className="badge bg-emerald-500 text-white rounded-lg font-bold px-3 py-1 text-[0.7rem] uppercase tracking-wider">
                  {lang === 'th' ? 'รองรับการกดคัดลอก' : 'Copy-To-Clipboard Ready'}
                </span>
              </div>

              {/* TWO COLUMN INTERACTIVE COPY BLOCKS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username credential */}
                <div className={`p-4 rounded-2.5xl border transition-all ${cardBg} flex items-center justify-between gap-4`}>
                  <div className="space-y-1.5">
                    <span className={`text-[0.75rem] font-bold ${mutedTextClass}`}>{t.username}</span>
                    <div className="flex items-center gap-2">
                      <strong className={`px-2.5 py-1.5 rounded-lg text-xs font-mono border ${codeBg}`}>
                        Namyen
                      </strong>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy('user', 'Namyen')}
                    className={`px-3.5 py-2.5 rounded-xl text-[0.75rem] font-black transition-all flex items-center gap-1.5 ${
                      copiedField === 'user'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/10'
                    }`}
                  >
                    <i className={`fas ${copiedField === 'user' ? 'fa-check' : 'fa-copy'}`}></i>
                    <span>{copiedField === 'user' ? t.feedback_success : t.copy_btn}</span>
                  </button>
                </div>

                {/* Password credential */}
                <div className={`p-4 rounded-2.5xl border transition-all ${cardBg} flex items-center justify-between gap-4`}>
                  <div className="space-y-1.5">
                    <span className={`text-[0.75rem] font-bold ${mutedTextClass}`}>{t.password}</span>
                    <div className="flex items-center gap-2">
                      <strong className={`px-2.5 py-1.5 rounded-lg text-xs font-mono border ${codeBg}`}>
                        12345
                      </strong>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy('pass', '12345')}
                    className={`px-3.5 py-2.5 rounded-xl text-[0.75rem] font-black transition-all flex items-center gap-1.5 ${
                      copiedField === 'pass'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/10'
                    }`}
                  >
                    <i className={`fas ${copiedField === 'pass' ? 'fa-check' : 'fa-copy'}`}></i>
                    <span>{copiedField === 'pass' ? t.feedback_success : t.copy_btn}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* EXPANDED SYSTEM FLOW DETAILS CARD */}
            {textIncludesSearch('ล็อกอิน') && (
              <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
                <h5 className={`font-display font-black text-sm md:text-base ${textClass} flex items-center gap-2`}>
                  <i className="fas fa-cubes text-primary"></i>
                  {lang === 'th' ? '1. ลำดับขั้นตอนระบบจำลองล็อกอิน (Onboarding Flow)' : '1. Standard Authentication Onboarding Program'}
                </h5>
                <p className={paragraphClass}>
                  {lang === 'th' 
                    ? 'ระบบเว็บบอร์ดถูกล็อกไว้ในตอนแรกด้วยเกราะป้องกันชั้นสูง เพื่อจำลองสถาปัตยกรรมด้านความมั่นคงปลอดภัยไฟฟ้าอัจฉริยะ (Smart Grid Security Layer) ผู้เข้าตรวจงานทุกคนจะต้องป้อนข้อมูลกุญแจผู้ดูแลด้านบนเพื่อยืนยันตัวตนก่อนผ่านสวิตช์หน้าต่างหลัก'
                    : 'The microgrid operations dashboard compiles multiple enterprise features behind a verification security layer. Stakeholders must pass basic credentials validation tasks before accessing operational metrics, load calendars, and Gemini neural diagnostic modulations.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <span className="font-bold text-xs text-primary">{lang === 'th' ? '✅ ระบบที่ผ่านการยืนยันแล้วจะได้รับ:' : '✅ Validated operators retrieve:'}</span>
                    <ul className="list-disc ps-4 space-y-1 font-semibold text-slate-700 dark:text-slate-100">
                      <li>{lang === 'th' ? 'ระดับสิทธิ์ผู้ควบคุมระดับสูง (Master Admin Token)' : 'Master Admin Operations Token'}</li>
                      <li>{lang === 'th' ? 'การเข้าใช้เซิร์ฟเวอร์ระบบประมวลผล Gemini AI' : 'Exhaustive server-side Gemini AI nodes access'}</li>
                      <li>{lang === 'th' ? 'สิทธิ์จดสถิติ Telemetry และปรับงบประมาณโครงการ' : 'Full telemetry logging & budget modification status'}</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <span className="font-bold text-xs text-amber-500">{lang === 'th' ? '💡 เทคนิคภาพชุดพื้นหลัง (Carousel HUD):' : '💡 Visual Region background shifts:'}</span>
                    <p className="opacity-90 font-medium">
                      {lang === 'th'
                        ? 'ภาพภูมิหลังแสดงภูมิภาคพลังงานเป็นแบบไฮบริด (เช่น Central Hydro Dam, Geothermal Center, Gobi Solar Array) คลิกสัญลักษณ์ลูกศรกลมเพื่อเลื่อนตรวจพิกัดและค่ากำลังวัตต์จริงก่อนการตรวจสอบระบบ'
                        : 'Explore background regional slides detailing distinct load properties like Central Dam hydro stations, localized solar farms, and off-shore wind networks by moving arrows (← / →) on physical keyboards.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2: DASHBOARD & METRICS (แดชบอร์ด & ระบบเฝ้าระวัง)
            ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in text-xs md:text-sm leading-relaxed">
            
            {/* EXPLAINER OF DYNAMIC HUD GAUGES */}
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-sm md:text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-desktop text-blue-500"></i>
                {lang === 'th' ? 'หน้าแดชบอร์ดหลัก: อธิบายดัชชี้ว์วัดและระบบประมวลผล (Dashboard Telemetry Index)' : 'Main Control Center HUD & System Indicators'}
              </h5>
              <p className={paragraphClass}>
                {lang === 'th'
                  ? 'หน้าแรกเป็นศูนย์รวมสถานะสดของการกินไฟฟ้า ดัชนีเหล่านี้ไม่ได้มาจากการสุ่ม แต่มาจากการเฉลี่ยโหลดของอุปกรณ์จริงที่เปิดระบบควบคุมอยู่วินาทีนี้:'
                  : 'The central active metrics represent accumulated live properties based on your active multi-node status:'}
              </p>

              {/* THREE COLUMN PREMIUM BREAKDOWN OF CARD METRICS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold text-slate-800 dark:text-slate-100">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-1">
                  <span className="badge bg-primary text-white text-[0.7rem] font-bold px-2 py-0.5 rounded uppercase">Burn Rate (฿/Day)</span>
                  <p className={`font-black text-sm pt-1.5 ${textClass}`}>{lang === 'th' ? 'อัตราค่าไฟเฉลี่ยรายวัน' : 'Dynamic Daily Burn (฿)'}</p>
                  <p className="text-[0.8rem] opacity-85 leading-normal">
                    {lang === 'th' 
                      ? 'คำนวณจาก กำลังวัตต์จริงทั้งหมด × ชั่วโมงเฉลี่ย × อัตราหน่วย เพื่อพยากรณ์เงินหมุนเวียนออกรายวันทันเวลา' 
                      : 'Calculated from cumulative node wattage times hours, converting actual Wh to cash outflows instantly.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                  <span className="badge bg-amber-500 text-white text-[0.7rem] font-bold px-2 py-0.5 rounded uppercase">TOU Load Division</span>
                  <p className={`font-black text-sm pt-1.5 ${textClass}`}>{lang === 'th' ? 'สัดส่วนชาร์จไฟช่วง On-Peak' : 'Peak Ratio Tracking'}</p>
                  <p className="text-[0.8rem] opacity-85 leading-normal">
                    {lang === 'th' 
                      ? 'อัตราแบ่งช่วงเวลา On-Peak (ค่าไฟแพงพิเศษ) และ Off-Peak (ค่าไฟลด 50%) ช่วยผู้ดูแลพิจารณาย้ายโหลดไปช่วงคืนวันหยุด' 
                      : 'Monitors exposure to Peak hour rates (high-tariff windows). Identifies potential for shifting heavy grid loads to midnight windows.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-1">
                  <span className="badge bg-indigo-500 text-white text-[0.7rem] font-bold px-2 py-0.5 rounded uppercase">Grid Stress Rating</span>
                  <p className={`font-black text-sm pt-1.5 ${textClass}`}>{lang === 'th' ? 'ความเครียดและประสิทธิภาพเฟส' : 'System Stress Rating'}</p>
                  <p className="text-[0.8rem] opacity-85 leading-normal">
                    {lang === 'th' 
                      ? 'คะแนนเป็น % จากผลรวมกำลังไฟฟ้ารวมหารด้วยปริมาณรองรับของเซกเตอร์ หากขึ้นสีส้ม สภาพกริดเริ่มตึงเครียดเสี่ยงโอเวอร์โหลด' 
                      : 'Displays total load relative to substation supply capacity. Saffron warning prompts shedding secondary devices before grid dropouts.'}
                  </p>
                </div>
              </div>
            </div>

            {/* CHRONOS TELEMETRY GRAPH SECTION */}
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-sm md:text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-chart-line text-emerald-500"></i>
                {lang === 'th' ? 'นวัตกรรมการอ่านพจนานุกรมข้อมูลกราฟเรียลไทม์ (Chart Interaction)' : 'Advanced Interactive Graph Metrics'}
              </h5>
              <p className={paragraphClass}>
                {lang === 'th'
                  ? 'กราฟประวัติการใช้ไฟฟ้าแชร์พฤติกรรมตลอด 7 วันย้อนหลัง มีฟังก์ชันปฏิสัมพันธ์สุดล้ำลึกที่วิศวกรผู้ดูแลควรทราบ:'
                  : 'Rather than basic static canvases, our telemetry tracks real dynamic changes and responds to user inputs:'}
              </p>
              
              <div className="p-5.5 rounded-2xl border border-dashed border-cyan-500/30 bg-cyan-500/5 space-y-2.5">
                <p className="font-extrabold text-cyan-800 dark:text-cyan-300 text-xs flex items-center gap-1.5">
                  <i className="fas fa-hand-pointer text-cyan-600 animate-bounce"></i>
                  {lang === 'th' ? 'วิธีใช้ฟังก์ชันตรวจสอบข้อมูลจุด (Hover Feature):' : 'Step-by-Step UI Interlocking Hover:'}
                </p>
                <p className={`${paragraphClass} text-[11.5px] leading-relaxed`}>
                  {lang === 'th'
                    ? 'เมื่อนำเมาส์หรือนิ้วสัมผัสชี้ไปตามหมุดจุดประสานในกราฟ (Custom Tooltip Engine จะดึงประสิทธิภาพขึ้นมา) ระบบจะดึงระดับแรงม้าไฟฟ้า ณ ช่วงเวลาของสัปดาห์นั้นออกมาคำนวณและประมวลผลออกมาเป็นยอดค่าใช้จ่ายบาท (฿) โดยประมาณให้เห็นตรงจุดเมาส์ชี้แบบไดนามิกทันที ไม่ต้องคำนวณมือให้เสียเวลา!'
                    : 'Hover over individual coordinate coordinates on the weekly usage or telemetry tracking graph. An active premium Custom Tooltip pops up, dynamically calculating the corresponding estimated expenditure in Baht (฿) along with actual hourly wattage loads.'}
                </p>
              </div>
            </div>

            {/* ADAPTIVE AI OVERRIDE SWITCHES BREAKDOWN */}
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-sm md:text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-toggle-on text-indigo-500"></i>
                {lang === 'th' ? 'แผงควบคุมสวิตช์ประหยัดพลังงาน AI 4 ทิศทาง (Adaptive AI Override Switches)' : '4-Channel Adaptive AI Override Switches'}
              </h5>
              <p className={paragraphClass}>
                {lang === 'th'
                  ? 'ที่แผงแดชบอร์ดหลัก คุณจะพบชุดสวิตช์ On/Off แบบสมาร์ท 4 ชิ้น ซึ่งจำลองกระบวนการบีบยอดโหลดสะสมในการบริหารจัดการกริดวิสาหกิจ ดังรายละเอียดด้านล่าง:'
                  : 'On the main Control Hub, you can find 4 dynamic toggle switches that simulate core peak-shaving tactics on educational grid systems:'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-semibold text-slate-800 dark:text-slate-100">
                {/* Switch 1 */}
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-indigo-950/40' : 'bg-slate-50 border-slate-200'} space-y-1`}>
                  <p className="font-extrabold text-blue-600 dark:text-blue-400 text-xs">❄️ {lang === 'th' ? '1. ปรับอุณหภูมิ AC อัจฉริยะ (Smart AC Optimization)' : '1. Smart AC Optimization'}</p>
                  <p className={`${paragraphClass} text-[0.8rem] opacity-85 leading-normal`}>
                    {lang === 'th'
                      ? 'จำลองปรับอุณหภูมิแอร์ขึ้น 1 องศาเซลเซียสเฉพาะเวลาที่ระบบกำลังเผชิญโหลดสูงสุด ช่วยบีบยอดใช้กระแสไฟระบบทำความเย็นลงรวดเร็วถึง 8%'
                      : 'Simulates automatic thermostat offsets by elevating heavy cooling systems 1°C during peak intervals, shaving active cooling drains up to 8% instantly.'}
                  </p>
                </div>

                {/* Switch 2 */}
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-teal-950/40' : 'bg-slate-50 border-slate-200'} space-y-1`}>
                  <p className="font-extrabold text-teal-600 dark:text-teal-400 text-xs">🔌 {lang === 'th' ? '2. ตัดสแตนด์บายสอยกระแส (Eco Standby Mitigation)' : '2. Eco Standby Mitigation'}</p>
                  <p className={`${paragraphClass} text-[0.8rem] opacity-85 leading-normal`}>
                    {lang === 'th'
                      ? 'กำจัดไฟตกค้าง (Phantom Load) จากปลั๊กพ่วง คอมพิวเตอร์ หรือเครื่องปรับอากาศวิทยาลััยวิจัยในช่วงออฟฟิศปิดการสะสม'
                      : 'Safely shuts off idle lab hardware, stand-by server terminals, and classroom plugs during non-operating hours to eliminate parasitic phantom loads.'}
                  </p>
                </div>

                {/* Switch 3 */}
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-amber-950/40' : 'bg-slate-50 border-slate-200'} space-y-1`}>
                  <p className="font-extrabold text-amber-600 dark:text-amber-400 text-xs">⏳ {lang === 'th' ? '3. โยกย้ายชั่วโมงโหลดสูง (Smart Load Shift)' : '3. Smart Load Shift'}</p>
                  <p className={`${paragraphClass} text-[0.8rem] opacity-85 leading-normal`}>
                    {lang === 'th'
                      ? 'โยกเวลาของงานประมวลผลหนัก หรือระบบสูบน้ำขัดตาน ไปเปิดทำการในช่วงค่ำคืนหรือวันหยุด ซึ่งอัตราค่าไฟตกลงต่ำสุด'
                      : 'Shifts high-consumption processes, battery recharge cycles, or heavy pumps to off-peak tariff periods (e.g. night shifts and weekends).'}
                  </p>
                </div>

                {/* Switch 4 */}
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-purple-950/40' : 'bg-slate-50 border-slate-200'} space-y-1`}>
                  <p className="font-extrabold text-purple-600 dark:text-purple-400 text-xs">⚡ {lang === 'th' ? '4. ชดเชยตัวประกอบกำลังไฟฟ้า (PF Automatic Tuning)' : '4. PF Automatic Tuning'}</p>
                  <p className={`${paragraphClass} text-[0.8rem] opacity-85 leading-normal`}>
                    {lang === 'th'
                      ? 'จำลองการต่อตู้คาปาซิเตอร์ชดเชยเฟสเพื่อพยุงคะแนนตัวประกอบกำลังไฟ (Power Factor) ขึ้นให้เข้าใกล้ 1.0 ตลอดวันและคืน'
                      : 'Simulates dynamic capacitor bank activation to suppress phase-shifted power distortion, optimizing efficiency and stabilizing voltage.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: NODE MANAGEMENT (บริหารอุปกรณ์โหนดควบคุม)
            ======================================================== */}
        {activeTab === 'nodes' && (
          <div className="space-y-6 animate-fade-in text-xs md:text-sm leading-relaxed">
            
            {/* FULL STEP-BY-STEP FLOW CHANNELS */}
            <div className="space-y-4">
              <h5 className={`font-display font-black text-sm md:text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-folder-tree text-cyan-500"></i>
                {lang === 'th' ? 'คำแนะนำขั้นตอนการคุม อุปกรณ์ และตัดโครงข่ายพลังงาน (Microgrid Switching Nodes)' : 'Asset Inventory Control & Diagnostic Steps'}
              </h5>
              <p className={paragraphClass}>
                {lang === 'th'
                  ? 'เมนู "อุปกรณ์ทั้งหมด" (Device Assets Manager) ช่วยควบคุมกระแสไฟและตรวจเช็คอุปกรณ์รายเครื่องอย่างรอบคอบ อธิบายขั้นตอนทีละขั้นดังนี้:'
                  : 'Manage operational appliances, stop secondary machines, or invoke remote AI diagnostics from the device registry tab:'}
              </p>

              {/* STAGGERED STEP-BY-STEP CARDS WITH BEAUTIFUL HOVER ACTIONS */}
              <div className="space-y-4">
                
                {/* Step 1 */}
                <div className={`p-5 rounded-2.5xl border transition-all ${cardBg} flex gap-4`}>
                  <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-black flex-shrink-0 text-xs shadow-md">1</div>
                  <div className="space-y-1">
                    <p className={`font-black text-sm ${textClass}`}>{lang === 'th' ? 'การเพิ่มอุปกรณ์โหนดคูณค่ากำลังไฟ (Dynamic Insertion)' : 'Adding Custom High-Power Equipment'}</p>
                    <p className={`${paragraphClass} text-[0.8rem] leading-relaxed`}>
                      {lang === 'th'
                        ? 'คลิกปุ่มสว่าง "เพิ่มอุปกรณ์ใหม่" (Add Appliance) ป้อนข้อมูลชื่ออุปกรณ์จำลองพฤติกรรม, พิกัดกำลังวัตต์จริง (Wattage เช่น แอร์: 1800W) และสัดส่วนชั่วโมงใช้งานรายวัน ระบบจะแปรข้อมูลชุดแรกและกระจายสู่กราฟต่างๆ อย่างฉับไวแบบไร้การหน่วง'
                        : 'Navigate to "Device Registry" and trigger "Add New Asset". Feed details like descriptive device identification (e.g. Cinema Sub Server), absolute run load (Wattage, like 3500 Watts), and duty hours. The system updates corresponding loads immediately across other sub-metrics.'}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className={`p-5 rounded-2.5xl border transition-all ${cardBg} flex gap-4`}>
                  <div className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center font-black flex-shrink-0 text-xs shadow-md">2</div>
                  <div className="space-y-1">
                    <p className={`font-black text-sm ${textClass}`}>{lang === 'th' ? 'สัมประสิทธิ์เลื่อนสวิตช์พลังงาน (Dynamic Splicing Bypass)' : 'Active Dynamic Phase Splitting'}</p>
                    <p className={`${paragraphClass} text-[0.8rem] leading-relaxed`}>
                      {lang === 'th'
                        ? 'การปรับตารางสวิตช์คันโยก (Toggle Switch) บนตารางเครื่องใช้ไฟฟ้าทำหน้าที่จำลองการสวมคัตเอาต์ไฟฟ้าจริง เมื่อเลื่อนปิด (คันโยกเป็นสีเทา) ค่าพลังงานจะตกเหลือเป็นศูนย์หลัก และผลรวมค่าใช้จ่ายของทั้งวิทยาเขตจะร่วงหล่นทันที เหมาะสำหรับวิเคราะห์กรณีปิดอุปกรณ์ช่วงเวลาชั่วคราว'
                        : 'Utilize the grid status switches on each row. Flicking the switch acts as an immediate physical cut-out circuit. It forces the load profile contribution to zero. Operators instantly evaluate utility bills saving variables with or without selected commercial sub-systems.'}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className={`p-5 rounded-2.5xl border border-purple-500/30 bg-purple-500/5 flex gap-4`}>
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black flex-shrink-0 text-xs shadow-md">3</div>
                  <div className="space-y-1">
                    <p className={`font-black text-sm text-purple-700 dark:text-purple-300`}>{lang === 'th' ? 'การประยุกต์ใช้ปัญญาประดิษฐ์ตรวจสุขภาพอุปกรณ์จำเพาะ (AI Diagnosis Report Modal)' : 'Invoking Advanced Multi-Variable Gemini Diagnostics'}</p>
                    <p className={`${paragraphClass} text-[0.8rem] leading-relaxed`}>
                      {lang === 'th'
                        ? 'หากคลิกปุ่มสัญลักษณ์ แว่นขยาย หลังสวิตช์ปิด-เปิด อุปกรณ์ ระบบจะเปิดโมดัลควบคุมเจาะลึกแสดงตัวเลขเชิงฟิสิกส์ (Uptime, Power Factor, Harmonics Distortion) หลังจากนั้นให้คุณทำการคลิกความเห็นสำคัญพนักงาน "วิเคราะห์อุปกรณ์ด้วย AI" เพื่อส่งข้อมูลดิบไปถอดรหัสวิศวกรรมด้วย Google Gemini AI คุณจะได้รับข้อแนะนำบำรุงรักษาอย่างมืออาชีพพร้อมคะแนนความมีเสถียรภาพ (Health Score) แผนป้องกันความพังทลายอย่างสมบูณ์'
                        : 'Examine detailed technician indicators like relative efficiency phase metrics by picking the magnifier file handle in the action row. Tap "Analyze via Gemini" to translate system uptime log strings and harmonic distortion indicators into server-side Gemini intelligence models. A dynamic diagnostic bulletin will generate, showing safe limits suggestions, component wearing rates, and security ratings.'}
                    </p>
                  </div>
                </div>

                {/* Step 4: Electricity Parameter Input Guide */}
                <div className={`p-5 rounded-2.5xl border border-amber-500/30 bg-amber-500/5 flex gap-4`}>
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black flex-shrink-0 text-xs shadow-md">
                    <i className="fas fa-plug"></i>
                  </div>
                  <div className="space-y-2 w-full">
                    <p className={`font-black text-sm text-amber-700 dark:text-amber-400`}>
                      {lang === 'th' ? '💡 คู่มือหลักในการตั้งค่าและการระบุรายละเอียดกำลังไฟอุปกรณ์ (Device Electricity Setup Guide)' : '💡 Device Electricity & Tariff Configuration Formula Guide'}
                    </p>
                    <div className={`${paragraphClass} text-[0.8rem] leading-relaxed space-y-2`}>
                      <p>
                        {lang === 'th'
                          ? 'วิธีการหาข้อมูลและป้อนค่ากำลังไพ่อุปกรณ์ เพื่อให้ระบบคำนวณและประดิษฐ์สถิติเสถียรภาพได้แม่นยำสูงสุด มีคำแนะนำดังต่อไปนี้:'
                          : 'To maintain the highest fidelity across financial projections and grid safety modeling, follow these parameters:'}
                      </p>
                      <ul className="list-disc ps-4 space-y-1.5 font-bold text-slate-800 dark:text-slate-100">
                        <li>
                          {lang === 'th'
                            ? 'กำลังวัตต์ (Wattage): ค้นหาค่ากำลังไฟบนแบรนด์ผลิตภัณฑ์ (เช่น สติกเกอร์หลังเครื่อง) เช่น แอร์ 9000-18000 BTU (~800W - 1800W), เครื่องทำน้ำอุ่น (~3000W - 4500W), ตู้เย็นอัจฉริยะ (~100W - 220W)'
                            : 'Equipment Wattage (Watts): Retrieve active load limits from the physical chassis sticker. (e.g. AC unit: 1200W, server cluster: 3000W)'}
                        </li>
                        <li>
                          {lang === 'th'
                            ? 'ชั่วโมงการทำงาน (Operating Hours): กรอกชั่วโมงประเมินการเปิดสวิตช์ต่อวัน (รองรับทศนิยม เช่น เตารีดเปิดวันละ 45 นาที ให้ป้อน 0.75 ชั่วโมง)'
                            : 'Daily Use Phase (Hours): Input daily operating metrics. Use fractional decimal indicators for precision (e.g. 45 mins: 0.75h).'}
                        </li>
                        <li>
                          {lang === 'th'
                            ? 'สัมประสิทธิ์ตัวประกอบไฟ (Power Factor): ปกติคือ 0.8 ถึง 0.99. ระดับที่ดีที่สุดคือ 1.0 ซึ่งหมายความว่าไม่มีพลังงานสูญเปล่าในวงจรหมุนรอบ'
                            : 'Power Factor (PF Rating): Typical components carry 0.85 to 0.95 PF. A system running at 1.0 operates with absolutely zero phase-shift energy waste.'}
                        </li>
                      </ul>
                      <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-500' : 'bg-slate-100/90 border-slate-200 text-slate-600'} text-[0.75rem] font-mono leading-normal space-y-1`}>
                        <div><strong>● สูตรพลังงานสะสม (Energy Consumption Formula):</strong> หน่วยไฟฟ้า (kWh) = (กำลังไฟฟ้าวัตต์ × ชั่วโมงใช้งาน × จำนวนวันสะสม) ÷ 1,000</div>
                        <div><strong>● สูตรคำนวณบิลค่าไฟฟ้า (Billing Calculator Formula):</strong> ค่าไฟฟ้าสุทธิ (บาท ฿) = หน่วยไฟฟ้า (kWh) × อัตราค่าบริการเฉลี่ย (บาทต่อหน่วย)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5: Side-by-Side Comparison Guide */}
                <div className={`p-5 rounded-2.5xl border border-teal-500/30 bg-teal-500/5 flex gap-4`}>
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black flex-shrink-0 text-xs shadow-md">
                    <i className="fas fa-balance-scale"></i>
                  </div>
                  <div className="space-y-1">
                    <p className={`font-black text-sm text-teal-700 dark:text-teal-400`}>
                      {lang === 'th' ? 'การเปรียบเทียบข้อมูลระหว่างโหนดเคียงข้างกัน (Side-by-Side Comparison Board)' : 'Multi-Node Side-by-Side Comparison Engine'}
                    </p>
                    <p className={`${paragraphClass} text-[0.8rem] leading-relaxed`}>
                      {lang === 'th'
                        ? 'หากเลื่อนติ๊กกล่องหน้าอุปกรณ์ตั้งแต่ 2 รายการขึ้นไป แล้วคลิกปุ่ม "เปรียบเทียบที่เลือก (Compare Selected)" ระบบจะเปิดแผงบอร์ดเปรียบข้อมูลทางเทคนิคของแต่ละอุปกรณ์พร้อมระบุไฮไลต์ อุปกรณ์ที่สิ้นเปลืองไฟสูงสุด (Worst Consumer) และอุปกรณ์ที่มีตัวประกอบกำลังดีที่สุด (Best Power Factor) อย่างตื่นตาทันใจและชัดเจนแบบสากล!'
                        : 'Simply toggle the checkboxes on the left margin of any two or more device rows and select "Compare Selected". The evaluation system renders side-by-side load cards with automated highlights identifying the highest active drain ("Worst Consumer") versus the cleanest Phase factor stability ("Best Power Factor") on immediate comparative dials.'}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: POWER CALCULATOR (ตัวโปรแกรมคำนวณไฟ)
            ======================================================== */}
        {activeTab === 'calc' && (
          <div className="space-y-6 animate-fade-in text-xs md:text-sm leading-relaxed">
            
            {/* COMPREHENSIVE MATH MODEL INFORMATION */}
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-sm md:text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-calculator text-amber-500"></i>
                {lang === 'th' ? 'โครงสร้างแบบทดสอบตัวแปรพลังงานภายนอก (Calculator Variables Configuration)' : 'Configuring the Utility Math Simulation Engine'}
              </h5>
              <p className={paragraphClass}>
                {lang === 'th'
                  ? 'แถบเมนู "คำนวณพลังงาน" รับหน้าที่ในการตั้งสมมติฐานราคาล่วงหน้า (Simulation Mode) ช่วยจำลองตัวแปรด้านพาร์ทเนอร์หน่วยงานภายนอกและประเมินค่าพลังงานรายสัปดาห์ / รายปีอย่างแวบเดียว:'
                  : 'The dynamic calculator module serves as an advanced sandbox allowing technicians to simulate outer rate parameters, tiered pricing hikes, and seasonal usage offsets:'}
              </p>

              <div className="space-y-4 pt-2">
                
                {/* Visual variable guide 1 */}
                <div className="flex gap-3 items-start">
                  <div className="text-amber-500 pt-0.5"><i className="fas fa-sliders text-sm"></i></div>
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-amber-600 dark:text-amber-400">{lang === 'th' ? '1. อัตราค่าธรรมเนียมต่อวัตต์ยืดหยุ่น (Tariff Rate Modifier):' : '1. Tariff Rate (฿/kWh) Multiplier:'}</span>
                    <p className="opacity-90 font-medium">
                      {lang === 'th'
                        ? 'คุณสามารถคลิกเข้าไปแก้ไขค่าบริการไฟฟ้าผันแปรต่อหน่วย (บาท/หน่วย) ได้โดยตรง (ค่าเริ่มต้น 4.50 บาท) เพื่อทำความเข้าใจความเปลี่ยนแปลงของต้นทุนเมื่ออัตราค่าพลังงานขั้นพื้นฐานในประเทศเพิ่มพูนหรือลดระดับ'
                        : 'Adjust the base currency-to-watt rate input directly (such as shifting standard 4.50 Baht standard values) to observe immediate scaling effects throughout annual expense estimates.'}
                    </p>
                  </div>
                </div>

                {/* Visual variable guide 2 */}
                <div className="flex gap-3 items-start">
                  <div className="text-amber-500 pt-0.5"><i className="fas fa-calendar-days text-sm"></i></div>
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-amber-600 dark:text-amber-400">{lang === 'th' ? '2. สไลเดอร์เปลี่ยนปีปฏิทินคำนวณ (Forecast Range Slider):' : '2. Run-Time Forecast Horizon Interval Slider:'}</span>
                    <p className="opacity-90 font-medium">
                      {lang === 'th'
                        ? 'ลากแกนบาร์เลื่อนสไลเดอร์เพื่อเปลี่ยนปริมาณวันสะสมตั้งแต่ 1 วัน ไปจนถึง 365 วัน (1 ปีเต็ม) เพื่อตรวจสอบการคำนวณความสิ้นเปลืองของทรัพยากรเงินทุนล่วงหน้าตามรูปแบบการทำงานปกติประจำภูมิภาค'
                        : 'Glide the manual slider tool horizontally to alter days in evaluation from 1 to 365 days. Useful in outlining complex commercial grid investment returns and seasonal budget allowances.'}
                    </p>
                  </div>
                </div>

                {/* Visual variable guide 3 */}
                <div className="flex gap-3 items-start">
                  <div className="text-amber-500 pt-0.5"><i className="fas fa-clock text-sm"></i></div>
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-amber-600 dark:text-amber-400">{lang === 'th' ? '3. การสอดส่องสถิติสัดส่วน (Power Consumption Pie Charts):' : '3. Percentage Utilization Pie Charts:'}</span>
                    <p className="opacity-90 font-medium">
                      {lang === 'th'
                        ? 'แผนภูมิกราฟวงกลมด้านขวาจะคำนวณให้ทันทีว่าเครื่องใช้ไฟฟ้าประเภทใด (เช่น ประเภทแอร์ ทำความร้อน คอมพิวเตอร์ หรือเซิร์ฟเวอร์) มีสัดส่วนเบียดบังการเงินของกริดสูงที่สุด เพื่อประเมินสัดส่วนการใช้อุปกรณ์ที่ประหยัดได้สูงสุด'
                        : 'Instantly view a complete pie-chart distribution splitting grid loads into categories (e.g. Cooling systems, high-power server nodes, lighting tracks) to prioritize power shedding programs.'}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: BUDGET LONGEVITY (วางแผนงบประมาณโครงการ)
            ======================================================== */}
        {activeTab === 'budget' && (
          <div className="space-y-6 animate-fade-in text-xs md:text-sm leading-relaxed">
            
            {/* PREMIUM BUDGET MATRIX WORKBOOK EXPLANTATION */}
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-sm md:text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-sack-dollar text-indigo-500 animate-pulse"></i>
                {lang === 'th' ? 'การพยากรณ์งบประมาณรักษาระบบ (Longevity Projections Model)' : 'The Advanced Grid Budget Longevity Math Model'}
              </h5>
              <p className={paragraphClass}>
                {lang === 'th'
                  ? 'ระบบโครงข่ายอัจฉริยะ EduEase ติดตั้งระบบพยากรณ์ปัญญาประดิษฐ์เพื่อช่วยผู้คุมจัดสรรเงินหมุนเวียนในการซื้อไฟอย่างมั่นคงสูง อธิบายวิธีทดสอบจำลองประสิทธิภาพดังนี้:'
                  : 'Our integrated financial projection tool links current active daily burn rates to available capital buffers, displaying dynamic survival ratings:'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-2">
                  <p className="font-black text-indigo-650 dark:text-indigo-400 text-xs">💰 {lang === 'th' ? 'การตั้งค่าเป้าหมายงบวงเงินรวม (Budget modifier)' : '1. Adjusting Credit Threshold (฿):'}</p>
                  <p className={`${paragraphClass} text-[0.8rem]`}>
                    {lang === 'th'
                      ? 'ป้อนเงินทุนของวิทยาเขตสุทธิ ลงในกล่องสแกนงบประมาณ ระบบจะสืบดูการกินวัตต์ของโหนดยื่นเปิดใช้งานทั้งหมด และจัดหารวิเคราะห์เพื่อค้นหาสถิติสุขภาพ'
                      : 'Provide custom investment bounds (฿) in the primary modifier box. This acts as the total credit pool before the subgrid shuts down.'}
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <p className="font-black text-emerald-650 dark:text-emerald-400 text-xs">🚀 {lang === 'th' ? 'ตัวชี้วัดวันทำงานพยากรณ์รอดชีวิต (Days Remaining HUD)' : '2. Active Days Survival Rate indicator:'}</p>
                  <p className={`${paragraphClass} text-[0.8rem]`}>
                    {lang === 'th'
                      ? 'ตัวเลขขนาดใหญ่เด่นชัด (Grid Days Remaining) บอกว่าเครื่องจักรคุณจะทำงานได้กี่สิบกี่ร้อยวันจนกว่าเงินจะละลายหมดตามการกินโหลดพิกัดนี้'
                      : 'The jumbo metric panel displays exactly how many days the substation will run before running into credit overdraft under the current load.'}
                  </p>
                </div>
              </div>

              {/* CRITICAL WARNING ADMONITION BAR */}
              <div className="p-5.5 rounded-2.5xl border border-dashed border-rose-500/30 bg-rose-500/5 space-y-2">
                <p className="font-extrabold text-rose-800 dark:text-rose-400 text-xs flex items-center gap-1.5">
                  <i className="fas fa-triangle-exclamation text-rose-500 animate-pulse text-sm"></i>
                  {t.warning_title}
                </p>
                <p className={`${paragraphClass} text-[0.8rem] leading-relaxed`}>
                  {lang === 'th'
                    ? 'กรณีเงินรอดชีวิต (Grid Days Remaining) ต่ำกว่า 30 วัน ขอแนะนำอย่างสูงให้คุณเข้าสู่เมนู "อุปกรณ์ทั้งหมด" และทำการสลับปิดคันโยกโหนดที่ระบายความร้อนสูง (เช่น โหนด High-Watt AC หรือ Gaming Rig) เพื่อบีบแรงกดดันในการสูญเสียเงินค่าส่วย ดันจำนวนวันกรีดไฟฟ้าไปรอดชีวิตเพิ่มขึ้นเป็นร้อยวันได้อย่างสวรรค์สร้าง!'
                    : 'If the projection days indicator drops below 30 days of safe operations, operators must instantly enter "Node Asset Control" and leverage physical bypass switches on active HVAC loops or servers. Halting continuous high-load nodes immediately decreases total system demand, expanding system survival rates by up to 500%!'}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: SECURITY & AI SCAN (ความปลอดภัย & AI INTEGRITY SCAN)
            ======================================================== */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fade-in text-xs md:text-sm leading-relaxed">
            
            {/* REVOLUTIONARY SYSTEM AI SCAN WAL THROUGH */}
            <div className={`p-6 rounded-[2rem] border border-purple-500/20 bg-purple-500/5 space-y-4`}>
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-xl flex-shrink-0 animate-pulse">
                  <i className="fas fa-fingerprint text-xl"></i>
                </div>
                <div className="space-y-1">
                  <h5 className="font-display font-black text-sm md:text-base text-purple-700 dark:text-purple-300">
                    {lang === 'th' ? 'การสั่งการ AI ตรวจสอบพฤติกรรมหลอกลวงและความผิดปกติล็อกระบบ' : 'Triggering Neural Grid Integrity Auditing Diagnostics'}
                  </h5>
                  <p className={paragraphClass}>
                    {lang === 'th'
                      ? 'นี่คือระบบความมั่นคงอัจฉริยะลึกซึ้ง (Security Integrity Console) คัดมาเพื่อความปลอดภัยในการเฝ้าระวังภัยและล็อกประวัติพฤติกรรมกลอุบายต่างๆ ทำตามขั้นตอนเพื่อจำลองพฤติกรรมสแกน:'
                      : 'The AI integrity scanner interprets server logs, flags cryptojacking malware signatures, and inspects sudden load bypass behaviors:'}
                  </p>
                </div>
              </div>

              {/* DETAILED ORDERED STEP-BY-STEP CHECKPOINTS */}
              <div className="space-y-3 pt-2 text-[0.8rem] font-bold text-slate-900 dark:text-slate-100">
                <div className={`p-4 rounded-xl border ${cardBg} flex gap-3.5 items-center`}>
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black flex-shrink-0 text-[0.75rem]">1</span>
                  <span>
                    {lang === 'th' 
                      ? 'คลิกป้ายบอกควบคุมเมนูล่างซ้ายสัญญลักษณ์กระดาษ "การแจ้งเตือน" (Alerts / Activity Log Center)' 
                      : 'Pick the "Alerts" section from the left-most control navigation rails.'}
                  </span>
                </div>

                <div className={`p-4 rounded-xl border ${cardBg} flex gap-3.5 items-center`}>
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black flex-shrink-0 text-[0.75rem]">2</span>
                  <span>
                    {lang === 'th' 
                      ? 'เลื่อนตรวจจอฟังก์ชันลงมาสู่ล่างสุดในหน้ากิจกรรม จะพบโมดูล "AI ระบบความมั่นคงปลอดภัยกริดและตรวจสอบประวัติล็อก"' 
                      : 'Scroll past raw telemetry alarms to access the dedicated dark-themed "AI Log Integrity Scan Center".'}
                  </span>
                </div>

                <div className={`p-4 rounded-xl border ${cardBg} flex gap-3.5 items-center`}>
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black flex-shrink-0 text-[0.75rem]">3</span>
                  <span>
                    {lang === 'th' 
                      ? 'กดปุ่มสีม่วงส่องแสงดนตรี "สแกน AI วิเคราะห์ล็อก (Run AI Log Integrity Scan)"' 
                      : 'Press the highlighted custom button labeled "Run AI Log Integrity Scan" to begin transmission.'}
                  </span>
                </div>

                <div className={`p-4 rounded-xl border ${cardBg} flex gap-3.5 items-center`}>
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black flex-shrink-0 text-[0.75rem]">4</span>
                  <span>
                    {lang === 'th' 
                      ? 'ระบบจะส่งข้อมูลวิศวกรรมไฟฟ้าวิเคราะห์กับ Gemini AI เพื่อสรุปผลแบ่งเกณฑ์สีเฉลยพฤติกรรม เช่น (ลักขุดคริปโต, ความสูญเสียแรงดัน, การบิดเบือนสัญญาณ)' 
                      : 'The engine processes current substation waveforms, displaying categorizations for risk signatures (e.g., Cryptojacking, line phase imbalance, bypassed grid meters).'}
                  </span>
                </div>
              </div>
            </div>

            {/* BENCHMARK COMPARATIVE EXPLANATORY */}
            {textIncludesSearch('เปรียบเทียบ') && (
              <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
                <h5 className={`font-display font-black text-sm md:text-base ${textClass} flex items-center gap-2`}>
                  <i className="fas fa-building-circle-check text-indigo-500"></i>
                  {lang === 'th' ? 'การเปรียบเทียบคุณธรรมการกินไฟกับระดับสากล (Global Benchmarking Overview)' : 'Environmental Benchmarking Analytics & Green Credits'}
                </h5>
                <p className={paragraphClass}>
                  {lang === 'th'
                    ? 'สถิติในหน้าเปรียบเทียบ "ข้อมูลวิเคราะห์" นำสิทธิกินไฟของคุณไปเปรียบเทียบกับค่าเฉลี่ยเซกเตอร์การเกษตรหรือนิคมอุตสาหกรรมในไทยใกล้เคียง:'
                    : 'The performance comparisons inside the "Compare" tab benchmark user metrics with global green grid guidelines:'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4.5 rounded-2xl border ${isDarkMode ? 'border-indigo-950 bg-indigo-950/20' : 'border-slate-200 bg-slate-50'} space-y-1`}>
                    <p className="font-extrabold text-primary mb-1">🌿 {lang === 'th' ? 'เกณฑ์รับสิทธิภาษีประหยัดพลังงาน' : 'Rebate Eligibility (Green Credit)'}</p>
                    <p className={`${paragraphClass} text-[0.8rem] leading-normal opacity-90`}>
                      {lang === 'th' 
                        ? 'หากค่าใช้จ่ายน้อยกว่าค่าเฉลี่ยเซกเตอร์เกิน 15% จะปลดล็อกเกียรติยศระดับสถานะ "ยอดเยี่ยม (Elite Status)" มีสิทธิ์รับเงินเยียวยา' 
                        : 'If consumption levels are over 15% cleaner than the local average, we offer Green Grid certification rewards.'}
                    </p>
                  </div>
                  <div className={`p-4.5 rounded-2xl border ${isDarkMode ? 'border-purple-950 bg-purple-950/20' : 'border-slate-200 bg-slate-50'} space-y-1`}>
                    <p className="font-extrabold text-purple-600 dark:text-purple-400 mb-1">🤖 {lang === 'th' ? 'โมเดลทำความเย็นอัจฉริยะ (Strategic Cooling AC Offset)' : 'Intelligent Cooling Strategies'}</p>
                    <p className={`${paragraphClass} text-[0.8rem] leading-normal opacity-90`}>
                      {lang === 'th' 
                        ? 'รับทราบวิธีคิดของระบบปัญญาประดิษฐ์ในการปรับ AC ขึ้น 1°C ช่วงชั่วโมงเร่งด่วนเพื่อตัดยอดความต้องการไฟฟ้าแบบฉับไว' 
                        : 'Learn how to handle real thermal power spikes and configure precise machine offsets via Gemini tips.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* FOOTER AREA WITH SUPREME POLISHING */}
      <div className={`p-6 border-t ${borderThinClass} flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-100/40 dark:bg-slate-900/60 flex-shrink-0`}>
        <div className="flex items-center gap-2">
          <i className="fas fa-graduation-cap text-primary text-xs"></i>
          <span className={`text-[0.75rem] ${mutedTextClass} tracking-wider font-mono font-bold uppercase`}>
            © 2026 EduEase Energy Security Hub - Technician Operations Panel
          </span>
        </div>
        {!isInline && onClose && (
          <button
            onClick={onClose}
            className="btn btn-primary rounded-2xl px-6 py-3 text-xs font-black shadow-lg transition-transform hover:scale-103"
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
      {/* Premium Backdrop shadow with a soft blur blur and a very gentle transparent dim */}
      <div 
        onClick={onClose} 
        className={`absolute inset-0 ${isDarkMode ? 'bg-black/75' : 'bg-slate-900/40'} backdrop-blur-[4px] transition-opacity duration-300`} 
      />
      
      {/* Animated Modal Inner Layer */}
      <div className="relative w-full md:max-w-5xl h-full md:h-auto z-10 animate-scale-up">
        {modalContent}
      </div>
    </div>
  );
};

export default UserManual;
