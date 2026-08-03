import React, { useState } from 'react';

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
  const [activeTab, setActiveTab] = useState<'intro' | 'dashboard' | 'stats' | 'nodes' | 'quests' | 'ai' | 'calc' | 'security'>('intro');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedField, setCopiedField] = useState<'user' | 'pass' | null>(null);
  const [revealCredentials, setRevealCredentials] = useState<boolean>(false);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  if (!isInline && !isOpen) return null;

  // Accessibility & Dark mode styles
  const bgClass = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-2xl';
  const textClass = isDarkMode ? 'text-white' : 'text-slate-900 font-black';
  const mutedTextClass = isDarkMode ? 'text-slate-400' : 'text-slate-600 font-extrabold';
  const paragraphClass = isDarkMode ? 'text-slate-300' : 'text-slate-800 font-medium';
  const codeBg = isDarkMode ? 'bg-slate-800 text-emerald-400 border-slate-700' : 'bg-slate-100 text-emerald-900 border-emerald-300 font-extrabold shadow-sm';
  const cardBg = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-md';
  const borderThinClass = isDarkMode ? 'border-slate-800' : 'border-slate-200';

  const translations = {
    th: {
      title: '📚 คู่มือการใช้งานระบบEduEase Energy แบบละเอียด',
      subtitle: 'คู่มืออธิบายฟีเจอร์การใช้งานอย่างเจาะลึก ครอบคลุมการจัดการพลังงาน, AI อัจฉริยะ, ภารกิจเควส, การคำนวณงบประมาณ และระบบความปลอดภัย',
      tab_intro: '🔑 เริ่มต้นใช้งาน',
      tab_dashboard: '📊 แดชบอร์ด & AI',
      tab_stats: '📈 สถิติ & กราฟ',
      tab_nodes: '⚙️ จัดการอุปกรณ์',
      tab_quests: '🏆 ภารกิจ & ร้านค้า',
      tab_ai: '🧠 AI Hub',
      tab_calc: '⚡ คำนวณค่าไฟ & งบ',
      tab_security: '🛡️ ความปลอดภัย Log',
      close: 'ปิดคู่มือ',
      username: 'บัญชีใช้งาน (Username):',
      password: 'รหัสผ่าน (Password):',
      copy_btn: 'คัดลอกข้อมูล',
      search_placeholder: 'ค้นหาฟีเจอร์ที่ต้องการ... (เช่น "แอร์", "AI", "TOU", "งบประมาณ", "เควส")',
      warning_title: '⚠️ ข้อควรระวังและแนวทางแก้ไข',
      feedback_success: 'คัดลอกแล้ว',
      no_results: '❌ ขออภัย! ไม่พบคู่มือที่ตรงกับคำค้นหาของคุณ',
    },
    en: {
      title: '📚 Comprehensive EduEase Energy User Handbook',
      subtitle: 'Complete manual covering energy management, AI smart optimization, quests, budget calculation, and log security diagnostics.',
      tab_intro: '🔑 Getting Started',
      tab_dashboard: '📊 Dashboard & AI',
      tab_stats: '📈 Stats & Analytics',
      tab_nodes: '⚙️ Device Management',
      tab_quests: '🏆 Quests & Shop',
      tab_ai: '🧠 AI Optimization Hub',
      tab_calc: '⚡ Calc & Grid Budget',
      tab_security: '🛡️ Security Logs',
      close: 'Close Handbook',
      username: 'Account Credentials:',
      password: 'Security Passcode:',
      copy_btn: 'Copy Data',
      search_placeholder: 'Search features... (e.g., "AC", "AI", "TOU", "Budget", "Quests")',
      warning_title: '⚠️ Caution & Troubleshooting',
      feedback_success: 'Copied!',
      no_results: '❌ No chapters found matching your search. Try another keyword.',
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
            <mark key={index} className="bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 px-1 py-0.5 rounded font-black border border-amber-300 dark:border-amber-800">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const modalContent = (
    <div className={`w-full max-w-5xl md:h-[90vh] ${bgClass} md:rounded-3xl flex flex-col relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10`}>
      
      {/* HEADER SECTION */}
      <div className={`p-6 md:p-8 border-b ${borderThinClass} flex flex-col gap-4 flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md relative z-10`}>
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <h2 className={`text-xl md:text-2xl font-display font-black ${textClass} tracking-tight`}>
              {highlightText(t.title, searchTerm)}
            </h2>
            <p className={`text-xs md:text-sm ${paragraphClass} max-w-3xl opacity-90 leading-relaxed`}>
              {highlightText(t.subtitle, searchTerm)}
            </p>
          </div>
          {!isInline && (
            <button 
              onClick={onClose}
              className="p-2 -mr-2 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <i className="fas fa-times-circle text-xl"></i>
            </button>
          )}
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full max-w-md mt-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <i className="fas fa-search text-slate-400 text-xs"></i>
          </div>
          <input
            type="text"
            placeholder={t.search_placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border transition-all text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              isDarkMode 
                ? 'bg-slate-950/60 border-slate-700 text-white placeholder-slate-500' 
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
            }`}
          />
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className={`px-4 md:px-8 py-3 border-b ${borderThinClass} bg-slate-100/60 dark:bg-slate-900/80 flex-shrink-0 overflow-x-auto scrollbar-hide`}>
        <div className="flex gap-2 min-w-max">
          {[
            { id: 'intro', label: t.tab_intro, icon: 'fa-user-cog text-emerald-500' },
            { id: 'dashboard', label: t.tab_dashboard, icon: 'fa-chart-area text-blue-500' },
            { id: 'stats', label: t.tab_stats, icon: 'fa-chart-pie text-indigo-500' },
            { id: 'nodes', label: t.tab_nodes, icon: 'fa-plug text-cyan-500' },
            { id: 'quests', label: t.tab_quests, icon: 'fa-trophy text-amber-500' },
            { id: 'ai', label: t.tab_ai, icon: 'fa-brain text-purple-400' },
            { id: 'calc', label: t.tab_calc, icon: 'fa-calculator text-teal-500' },
            { id: 'security', label: t.tab_security, icon: 'fa-shield-halved text-rose-500' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? (isDarkMode ? 'bg-primary border-primary text-white shadow-lg' : 'bg-primary border-primary text-white shadow-md')
                    : (isDarkMode ? 'border-slate-800 text-slate-300 bg-slate-800/40 hover:bg-slate-800' : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-100')
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
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-8 bg-white dark:bg-slate-900/30 scrollbar-thin">
        
        {/* ======================= TAB 1: INTRO ======================= */}
        {activeTab === 'intro' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border-2 border-dashed ${isDarkMode ? 'border-primary/30 bg-primary/5' : 'border-primary/30 bg-primary/5'} space-y-4`}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary text-white rounded-2xl shrink-0">
                  <i className="fas fa-shield-alt text-xl"></i>
                </div>
                <div>
                  <h5 className={`font-display font-black text-base ${textClass}`}>
                    {lang === 'th' ? '🔒 การรักษาความปลอดภัยและสิทธิ์เข้าสู่ระบบ' : '🔒 Authentication & Access Matrix'}
                  </h5>
                  <p className={`text-xs ${mutedTextClass} mt-1 leading-relaxed`}>
                    {lang === 'th' 
                      ? 'ระบบถูกออกแบบให้รองรับการล็อกอินทดสอบผ่านบัญชี Sandbox และพร้อมเชื่อมต่อกับ OAuth 2.0 ในระบบจริง'
                      : 'Designed for instant sandbox trial authentication and enterprise OAuth 2.0 / SSO deployment.'}
                  </p>
                </div>
              </div>

              {!revealCredentials ? (
                <div className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold m-0">
                    {lang === 'th' ? 'คลิกปุ่มด้านล่างเพื่อแสดงข้อมูลเข้าสู่ระบบจำลอง (Sandbox Credentials)' : 'Click below to reveal demo sandbox login credentials.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsRevealing(true);
                      setTimeout(() => {
                        setRevealCredentials(true);
                        setIsRevealing(false);
                      }, 600);
                    }}
                    disabled={isRevealing}
                    className="btn btn-sm py-2 px-5 bg-primary text-white hover:bg-primary-hover border-0 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-md"
                  >
                    {isRevealing ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>{lang === 'th' ? 'กำลังดึงรหัสผ่าน...' : 'Fetching Credentials...'}</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-key"></i>
                        <span>{lang === 'th' ? 'แสดงข้อมูลล็อกอินจำลอง' : 'Reveal Sandbox Credentials'}</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-2xl border ${cardBg} flex justify-between items-center`}>
                      <div>
                        <span className={`text-xs font-bold ${mutedTextClass}`}>{t.username}</span>
                        <strong className={`block mt-1 px-3 py-1.5 rounded-lg text-sm font-mono border ${codeBg}`}>Namyen</strong>
                      </div>
                      <button 
                        onClick={() => handleCopy('user', 'Namyen')} 
                        className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        title={t.copy_btn}
                      >
                        <i className={`fas ${copiedField === 'user' ? 'fa-check animate-scale-up' : 'fa-copy'}`}></i>
                      </button>
                    </div>
                    <div className={`p-4 rounded-2xl border ${cardBg} flex justify-between items-center`}>
                      <div>
                        <span className={`text-xs font-bold ${mutedTextClass}`}>{t.password}</span>
                        <strong className={`block mt-1 px-3 py-1.5 rounded-lg text-sm font-mono border ${codeBg}`}>12345</strong>
                      </div>
                      <button 
                        onClick={() => handleCopy('pass', '12345')} 
                        className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        title={t.copy_btn}
                      >
                        <i className={`fas ${copiedField === 'pass' ? 'fa-check animate-scale-up' : 'fa-copy'}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-black text-rose-500 bg-rose-500/10 px-2 py-1 rounded-lg uppercase tracking-wider animate-pulse">
                      ⚠️ Sandbox active
                    </span>
                    <button
                      onClick={() => setRevealCredentials(false)}
                      className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline bg-transparent border-0 cursor-pointer"
                    >
                      {lang === 'th' ? 'ซ่อนข้อมูลอีกครั้ง' : 'Hide Credentials'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-compass text-emerald-500"></i>
                {lang === 'th' ? 'การเริ่มทัวร์แนะนำระบบ (Interactive Guided Tour)' : 'Interactive Guided Tour'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th' 
                  ? 'คุณสามารถกดปุ่ม "ทัวร์แนะนำระบบ" ที่เมนูด้านบนหรือแถบข้าง เพื่อให้ระบบไฮไลต์และแนะนำจุดสำคัญต่างๆ ของแดชบอร์ดทีละขั้นตอนอย่างง่ายดาย'
                  : 'Click the "Guided Tour" button on the top or sidebar menu to receive an interactive walkthrough of key features.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-globe text-sky-500"></i>
                {lang === 'th' ? 'การสลับภาษา และ โหมดมืด/สว่าง' : 'Language & Dark/Light Theme'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th' 
                  ? 'ระบบรองรับ 2 ภาษา (ไทย และ English) สามารถกดสลับ TH/EN หรือปุ่มรูปดวงอาทิตย์/ดวงจันทร์ ที่มุมขวาบนของหน้าจอได้ตลอดเวลาเพื่อความสบายตา'
                  : 'Toggle between Thai/English and Dark/Light themes seamlessly using the controls at the top-right header.'}
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
                {lang === 'th' ? '1. ภาพรวมดัชนีพลังงาน (Hero Metrics)' : '1. Hero Energy Metrics'}
              </h5>
              <ul className="list-disc ps-5 space-y-2 font-medium opacity-95">
                <li><strong>{lang === 'th' ? 'เงินประหยัดสะสม (Total Savings):' : 'Total Savings:'}</strong> {lang === 'th' ? 'คำนวณยอดเงินประหยัดสะสมจากการเปิดโหมด AI และการบริหารพลังงาน' : 'Accumulated money saved via AI optimization modes.'}</li>
                <li><strong>{lang === 'th' ? 'โหลดวัตต์ปัจจุบัน (Active Load):' : 'Active Load:'}</strong> {lang === 'th' ? 'กำลังไฟฟ้าวัตต์ (W) ที่กำลังใช้งานแบบเรียลไทม์' : 'Real-time wattage currently consumed by active devices.'}</li>
                <li><strong>{lang === 'th' ? 'ค่า FT & ราคาต่อหน่วย:' : 'FT & Tariff Rate:'}</strong> {lang === 'th' ? 'อัตราค่าไฟฟ้าฐานและค่า FT ล่าสุดที่ใช้คำนวณบิล' : 'Current electrical tariff rate and FT multiplier applied.'}</li>
                <li><strong>{lang === 'th' ? 'ค่า Power Factor (PF):' : 'Power Factor (PF):'}</strong> {lang === 'th' ? 'ดัชนีประสิทธิภาพไฟฟ้าของระบบ (ค่าใกล้เคียง 1.0 คือดีที่สุด)' : 'Efficiency ratio of power conversion (closer to 1.0 is ideal).'}</li>
              </ul>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-sliders-h text-primary"></i>
                {lang === 'th' ? '2. โหมดประหยัดไฟอัจฉริยะ (AI Smart Switches)' : '2. AI Smart Switches'}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <strong className="text-primary block mb-1">❄️ AI Smart AC (+1°C Offset)</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-300 m-0">{lang === 'th' ? 'ปรับอุณหภูมิแอร์ขึ้น 1°C ช่วยประหยัดค่าไฟแอร์ได้ทันที 8-10%' : 'Offsets AC temp by +1°C, reducing cooling load by 8-10%.'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <strong className="text-emerald-500 block mb-1">🔌 AI Standby Cutoff</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-300 m-0">{lang === 'th' ? 'ตัดกระแสไฟสแตนด์บายของเครื่องใช้ไฟฟ้าที่ไม่ได้เปิดใช้งาน' : 'Cuts phantom load on idle electronics to eliminate zero-standby waste.'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <strong className="text-indigo-500 block mb-1">⚡ AI Power Factor Tuning</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-300 m-0">{lang === 'th' ? 'ปรับปรุงคุณภาพกำลังไฟฟ้า ลดกำลังไฟฟ้าสูญเสียในสาย' : 'Optimizes capacitive load tuning to improve system PF.'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <strong className="text-amber-500 block mb-1">⏰ AI Peak Load Shifting</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-300 m-0">{lang === 'th' ? 'ย้ายการทำงานของอุปกรณ์กินไฟสูงไปช่วงค่าไฟถูก (Off-Peak)' : 'Shifts high-wattage device runtime to TOU Off-Peak hours.'}</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-cloud-sun-rain text-sky-500"></i>
                {lang === 'th' ? '3. สภาพอากาศ และระบบแจ้งเตือนความร้อน (Weather & Thermal Alert)' : '3. Weather & Thermal Alert'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'วิดเจ็ตพยากรณ์อากาศช่วยตรวจวัดอุณหภูมิภายนอก หากวันไหนมีอากาศร้อนจัด ระบบจะเตือนว่าแอร์อาจทำงานหนักขึ้น พร้อมคำแนะนำในการรับมือ'
                  : 'Monitors ambient outdoor temperature and alerts when heat waves increase air conditioner workload.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-map-marked-alt text-teal-500"></i>
                {lang === 'th' ? '4. แผนที่จำลองโครงข่ายไฟฟ้า และการจัดเรียงวิดเจ็ต' : '4. Property Map & Drag-and-Drop'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'คุณสามารถคลิกลากสลับตำแหน่งวิดเจ็ตในหน้าแดชบอร์ดได้อย่างอิสระ (Drag & Drop) และดูโซนการใช้ไฟฟ้าบนแผนที่จำลอง Property Map'
                  : 'Rearrange dashboard widgets via Drag & Drop and view property load distribution on the map.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-comments text-purple-500"></i>
                {lang === 'th' ? '5. ผู้ช่วยอัจฉริยะ Gemini AI Chatbot' : '5. Gemini AI Energy Assistant'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'กดปุ่มแชตหุ่นยนต์มุมขวาล่างเพื่อสนทนากับ Gemini AI สอบถามคำแนะนำในการประหยัดไฟหรือวิเคราะห์ปัญหาในบ้านได้ตลอด 24 ชั่วโมง'
                  : 'Click the floating AI chatbot icon at the bottom-right to ask Gemini AI for custom energy advice anytime.'}
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
                {lang === 'th' ? '1. กราฟเทเลเมทรี 7 วันย้อนหลัง (7-Day Telemetry Chart)' : '1. 7-Day Telemetry Chart'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'แสดงแนวโน้มการใช้พลังงานตลอด 7 วัน สามารถนำเมาส์ชี้บนกราฟเพื่อดูปริมาณการใช้ไฟ (kWh) ค่าไฟรายชั่วโมง และจุดที่มีการใช้ไฟสูงสุด (Peak Usage)'
                  : 'Interactive 7-day usage graph with hover tooltips showing hourly kWh consumption and peak load markers.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-chart-pie text-indigo-500"></i>
                {lang === 'th' ? '2. สัดส่วนการใช้ไฟฟ้าจำแนกตามอุปกรณ์ (Consumption Distribution)' : '2. Device Consumption Breakdown'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'กราฟวงกลมแสดงว่าเครื่องใช้ไฟฟ้าชนิดใดกินไฟมากที่สุดในบ้าน เช่น แอร์, เครื่องทำน้ำอุ่น หรือตู้เย็น เพื่อช่วยให้คุณวางแผนตัดลดได้อย่างตรงจุด'
                  : 'Pie chart visualizing consumption percentages by device category to help identify power hogs.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-heartbeat text-rose-500"></i>
                {lang === 'th' ? '3. ตัวชี้วัดสุขภาพอุปกรณ์ (Device Health & PF Analysis)' : '3. Device Health & PF Diagnostics'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'ระบบประเมินค่า Power Factor และสุขภาพฮาร์ดแวร์เพื่อเตือนการบำรุงรักษาเชิงป้องกัน (Preventive Maintenance) ก่อนที่อุปกรณ์จะเสียหรือกินไฟผิดปกติ'
                  : 'Monitors hardware health and Power Factor degradation to recommend preventive maintenance before breakdown.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================= TAB 4: NODES ======================= */}
        {activeTab === 'nodes' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-plug text-cyan-500"></i>
                {lang === 'th' ? '1. ควบคุมการเปิด/ปิด และแก้ไขข้อมูลอุปกรณ์' : '1. Device Control & Parameters'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'หน้าจัดการอุปกรณ์เปิดโอกาสให้คุณสับสวิตช์ เปิด/ปิด เครื่องใช้ไฟฟ้ารายชิ้น, แก้ไขกำลังไฟวัตต์ (Wattage), และปรับชั่วโมงการใช้งานต่อวัน เพื่อดูผลลัพธ์ทันที'
                  : 'Toggle individual devices on/off, edit rated wattage, and update daily operating hours to inspect live load impact.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-plus-circle text-emerald-500"></i>
                {lang === 'th' ? '2. เพิ่มอุปกรณ์ใหม่เข้าสู่ระบบ (Add Custom Device)' : '2. Add Custom Device'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'กดปุ่ม "เพิ่มอุปกรณ์" เพื่อใส่ชื่อ, กำลังไฟ (W), หมวดหมู่ และเวลาใช้งาน เพื่อนำไปคำนวณบิลค่าไฟและจำลองแผน AI ได้แม่นยำยิ่งขึ้น'
                  : 'Click "Add Device" to insert custom appliances with wattage and category data for precise billing simulation.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-balance-scale text-amber-500"></i>
                {lang === 'th' ? '3. เครื่องมือเปรียบเทียบอุปกรณ์ (Device Battle Comparison)' : '3. Device Battle Comparison'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'ติ๊กเลือก Checkbox หน้าอุปกรณ์ 2 ตัวขึ้นไป แล้วกด "เปรียบเทียบอุปกรณ์" เพื่อดูตารางเปรียบเทียบอัตราการกินไฟ ค่า PF และค่าใช้จ่ายแบบ Side-by-Side'
                  : 'Select checkboxes next to 2+ devices and click "Compare Selected" to render a side-by-side battle chart.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-power-off text-rose-500"></i>
                {lang === 'th' ? '4. ปุ่มตัดไฟสแตนด์บายรวม (Batch Standby Cutoff)' : '4. Batch Standby Cutoff'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'กดปุ่มตัดไฟ Standby เพียงครั้งเดียวเพื่อสั่งสับตัดไฟอุปกรณ์ที่ไม่ได้เปิดสวิตช์ทำงานจริงทุกชิ้นในคราวเดียว'
                  : 'One-click batch control to instantly cut off standby power across all non-active electronics.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================= TAB 5: QUESTS ======================= */}
        {activeTab === 'quests' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-trophy text-amber-500"></i>
                {lang === 'th' ? '1. ภารกิจประหยัดพลังงานกรีนกริต (Daily Energy Quests)' : '1. Daily Energy Quests'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'ระบบเกมภารกิจช่วยเปลี่ยนการประหยัดไฟให้สนุกยิ่งขึ้น โดยมีเควสให้ทำความสำเร็จ เช่น:'
                  : 'Gamified quest engine designed to reward sustainable habits with tasks such as:'}
              </p>
              <ul className="list-disc ps-5 space-y-2 font-medium opacity-95">
                <li><strong>Perfect Smart Grid:</strong> {lang === 'th' ? 'เปิดใช้งานโหมดประหยัดพลังงาน AI ครบทั้ง 4 โหมด' : 'Enable all 4 AI smart optimization modes.'}</li>
                <li><strong>Zero Standby Active:</strong> {lang === 'th' ? 'สับสวิตช์ปิดการใช้งานอุปกรณ์ที่สแตนด์บายไว้อย่างน้อย 1 ชิ้น' : 'Turn off at least 1 idle standby device.'}</li>
                <li><strong>Power Factor Master:</strong> {lang === 'th' ? 'ปรับค่า PF เฉลี่ยให้สูงกว่า 0.92' : 'Maintain average Power Factor above 0.92.'}</li>
                <li><strong>Peak Shifter Pro:</strong> {lang === 'th' ? 'ย้ายการใช้ไฟไปช่วง Off-Peak มากกว่า 60%' : 'Shift over 60% load to TOU Off-Peak hours.'}</li>
              </ul>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-coins text-emerald-500"></i>
                {lang === 'th' ? '2. การรับเหรียญรางวัล Green Tokens (GT) และ XP' : '2. Earning Green Tokens (GT) & XP'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'เมื่อทำเควสสำเร็จ ปุ่มจะเปลี่ยนเป็น "รับรางวัล 🎉" กดเพื่อสะสมคะแนน Green Tokens (GT) และเพิ่มเลเวลประสบการณ์ (XP) ของคุณ'
                  : 'Upon completing a quest, click "Claim Reward 🎉" to earn Green Tokens (GT) and account XP.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-store text-purple-500"></i>
                {lang === 'th' ? '3. ร้านค้าสกิน อวาตาร์ และ วงล้อเสี่ยงโชค (Avatar Shop & Lucky Roll)' : '3. Avatar Shop & Lucky Roll'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'นำเหรียญ Green Tokens ที่สะสมได้ไปแลกซื้ออวาตาร์และกรอบโปรไฟล์ใหม่ หรือใช้เสี่ยงโชคหมุน Lucky Roll ลุ้นรับสกินหายาก!'
                  : 'Spend GT tokens in the shop to unlock custom avatars, badge borders, or spin the Lucky Roll.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================= TAB 6: AI HUB ======================= */}
        {activeTab === 'ai' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-brain text-purple-500"></i>
                {lang === 'th' ? '1. ศูนย์วิเคราะห์แผนการประหยัดไฟ AI (Energy Monitoring Hub)' : '1. AI Energy Monitoring Hub'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'วิเคราะห์ข้อมูลโหลดไฟรวมของทั้งบ้านด้วย Gemini AI แล้วสร้างกลยุทธ์การลดค่าใช้จ่ายที่ออกแบบมาเฉพาะสำหรับรูปแบบการใช้ไฟของคุณ'
                  : 'Ingests real-time home load data to craft customized energy savings recommendations via Gemini AI.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-clock text-amber-500"></i>
                {lang === 'th' ? '2. คำแนะนำตาราง TOU Auto-Scheduling' : '2. TOU Auto-Scheduling Recommendations'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'หากคุณมีอุปกรณ์กินไฟสูง เช่น เครื่องชาร์จรถยนต์ไฟฟ้า (EV) หรือเครื่องซักผ้า AI จะคำนวณช่วงเวลา On-Peak / Off-Peak และแนะนำเวลาเปิดใช้งานที่ช่วยประหยัดเงินได้สูงสุด'
                  : 'Automatically advises the best time windows to run high-load appliances during Off-Peak TOU rates.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================= TAB 7: CALCULATOR ======================= */}
        {activeTab === 'calc' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-calculator text-teal-500"></i>
                {lang === 'th' ? '1. จำลองการใช้อัตราค่าไฟ TOU และ สไลเดอร์พยากรณ์' : '1. TOU Rates & Forecast Slider'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'ปรับสไลเดอร์สัดส่วนการใช้ไฟกลางวัน/กลางคืน (On-Peak vs Off-Peak) และเลื่อนสไลเดอร์ระยะเวลาตั้งแต่ 1 วัน ถึง 365 วัน เพื่อพยากรณ์ยอดค่าไฟฟ้าในอนาคต'
                  : 'Adjust On-Peak/Off-Peak ratio sliders and time horizon (1-365 days) to project long-term electricity bills.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-list-ol text-blue-500"></i>
                {lang === 'th' ? '2. ตารางรายละเอียดอุปกรณ์รายชิ้น (Appliance Breakdown)' : '2. Individual Appliance Breakdown'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'แสดงตารางแยกแยะค่าใช้จ่ายของเครื่องใช้ไฟฟ้าแต่ละชิ้นเป็น บาท/วัน, บาท/เดือน และ บาท/ปี อย่างชัดเจน'
                  : 'Detailed breakdown table showing daily, monthly, and annual running costs for each item.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-wallet text-amber-500"></i>
                {lang === 'th' ? '3. ตัวติดตามงบประมาณพลังงาน (Grid Budget Tracker)' : '3. Grid Budget Tracker'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'ตั้งค่าเงินงบประมาณคงเหลือที่คุณมี ระบบจะคำนวณความเร็วในการใช้เงินและแจ้งเตือนทันทีว่า "เงินจะหมดภายในกี่วัน" พร้อมเกจวัดสีส้ม/แดงเตือนล่วงหน้า'
                  : 'Set a remaining energy budget; the system calculates exact remaining days before funds deplete.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-file-pdf text-rose-500"></i>
                {lang === 'th' ? '4. การส่งออกรายงานอนุรักษ์พลังงาน (PDF Audit Report Export)' : '4. PDF Energy Audit Report Export'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'กดปุ่ม "ดาวน์โหลดรายงาน PDF" เพื่อสร้างเอกสารรายงานการประหยัดพลังงานฉบับสมบูรณ์ สำหรับนำไปใช้เสนองานหรือเก็บเป็นบันทึกส่วนตัว'
                  : 'Export a professional PDF energy audit report summarizing your savings, metrics, and devices.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================= TAB 8: SECURITY ======================= */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fade-in text-sm leading-relaxed">
            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-shield-alt text-rose-500"></i>
                {lang === 'th' ? '1. การแจ้งเตือนเหตุการณ์เรียลไทม์ (Real-time Event Alerts)' : '1. Real-time Event Alerts'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'บันทึกแจ้งเตือนเหตุการณ์สำคัญในระบบไฟฟ้า เช่น แรงดันตก (Voltage Drop), โหลดเกินขนาด (Overload Spike) หรือแอร์ทำงานผิดปกติ'
                  : 'Real-time logs capturing voltage sags, overload spikes, and hardware operational anomalies.'}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] border ${cardBg} space-y-4`}>
              <h5 className={`font-display font-black text-base ${textClass} flex items-center gap-2`}>
                <i className="fas fa-microchip text-purple-500"></i>
                {lang === 'th' ? '2. สแกนความมั่นคงปลอดภัย Log ด้วย AI (AI Log Integrity Scan)' : '2. AI Log Integrity Scan'}
              </h5>
              <p className={`${paragraphClass}`}>
                {lang === 'th'
                  ? 'กดปุ่ม "วิเคราะห์ Log ด้วย AI" ในหน้าแจ้งเตือน เพื่อให้ AI สแกนหารูปแบบภัยคุกคาม เช่น การลอบขุดเหมืองคริปโต (Cryptojacking) หรือสัญญาณรบกวนในระบบ พร้อมให้คะแนน Security Rating'
                  : 'Run an AI Log Integrity Scan to detect cyber anomalies like cryptojacking or noise interference, outputting a live Security Score.'}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER AREA */}
      <div className={`p-5 border-t ${borderThinClass} flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-100/60 dark:bg-slate-900/80 flex-shrink-0 relative z-10`}>
        <div className="flex items-center gap-2">
          <i className="fas fa-graduation-cap text-primary text-xs"></i>
          <span className={`text-xs ${mutedTextClass} tracking-wider font-mono font-bold uppercase`}>
            © 2026 EduEase Energy - Detailed Handbook & User Guide
          </span>
        </div>
        {!isInline && onClose && (
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-white rounded-xl text-xs font-black shadow-lg hover:bg-primary/90 transition-all cursor-pointer"
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
