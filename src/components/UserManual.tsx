import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  X, 
  CheckCircle2, 
  Circle,
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Calculator, 
  Bot, 
  Sparkles, 
  Trophy, 
  Home, 
  Building2, 
  HelpCircle, 
  Copy, 
  KeyRound, 
  GraduationCap, 
  SlidersHorizontal, 
  FileText, 
  ExternalLink,
  Flame,
  Globe,
  Settings,
  AlertTriangle,
  Lightbulb,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  RotateCcw,
  Sliders,
  Cpu,
  Clock,
  Download,
  Info,
  DollarSign,
  TrendingDown,
  Power
} from 'lucide-react';
import { AppPage } from '../types';
import { DEMO_USERS } from './LoginForm';

interface UserManualProps {
  isOpen: boolean;
  onClose?: () => void;
  isDarkMode: boolean;
  lang: 'th' | 'en';
  isInline?: boolean;
  onNavigatePage?: (page: AppPage) => void;
}

export const UserManual: React.FC<UserManualProps> = ({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  lang, 
  isInline = false,
  onNavigatePage
}) => {
  const [activeTab, setActiveTab] = useState<'auth' | 'home' | 'appliances' | 'budget' | 'ai' | 'quests' | 'locations' | 'score' | 'trust'>('auth');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Step Completion Tracker State (persist in component state)
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (tabsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsScrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    if (isOpen || isInline) {
      setTimeout(checkScroll, 100);
    }
  }, [isOpen, isInline, activeTab]);

  useEffect(() => {
    const el = tabsScrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        checkScroll();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [isOpen, isInline]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      tabsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!isInline && !isOpen) return null;

  const bgClass = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xl';
  const textClass = isDarkMode ? 'text-white' : 'text-slate-900';
  const cardBg = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-slate-50 border-slate-200';
  const stepCardBg = isDarkMode ? 'bg-slate-800/50 border-slate-700/60 hover:border-emerald-500/40' : 'bg-white border-slate-200 hover:border-emerald-300';

  const handleCopy = (fieldKey: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleJumpToPage = (page: AppPage) => {
    if (onNavigatePage) {
      onNavigatePage(page);
    }
    if (onClose) {
      onClose();
    }
  };

  const toggleStepCompleted = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const manualTabs = [
    { id: 'auth', icon: KeyRound, labelTh: '🔑 บทที่ 1: เข้าสู่ระบบ & สิทธิ์', labelEn: '🔑 Ch 1: Login & Roles' },
    { id: 'home', icon: Home, labelTh: '🏠 บทที่ 2: หน้าหลัก & ตอบ 5 วินาที', labelEn: '🏠 Ch 2: Home Dashboard' },
    { id: 'appliances', icon: Zap, labelTh: '🔌 บทที่ 3: อุปกรณ์ & Eco Cut 0W', labelEn: '🔌 Ch 3: Appliances & Cut' },
    { id: 'budget', icon: Calculator, labelTh: '👛 บทที่ 4: คำนวณค่าไฟ & TOU Rate', labelEn: '👛 Ch 4: Budget & TOU' },
    { id: 'ai', icon: Bot, labelTh: '🧠 บทที่ 5: AI Coach & Smart Insights', labelEn: '🧠 Ch 5: AI & Insights' },
    { id: 'quests', icon: Globe, labelTh: '🌿 บทที่ 6: ภารกิจประหยัดไฟ & คลังบทเรียน', labelEn: '🌿 Ch 6: Eco Quests & Lessons' },
    { id: 'locations', icon: Building2, labelTh: '📍 บทที่ 7: สถานที่ & โหนดมิเตอร์', labelEn: '📍 Ch 7: My Locations' },
    { id: 'score', icon: Trophy, labelTh: '🌟 บทที่ 8: ดัชนีประหยัดไฟ 76/100', labelEn: '🌟 Ch 8: Saving Score' },
    { id: 'trust', icon: ShieldCheck, labelTh: '🛡️ บทที่ 9: ความโปร่งใส & ส่งออก PDF', labelEn: '🛡️ Ch 9: Trust & Export' },
  ];

  return (
    <div className={isInline ? 'w-full' : 'fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto'}>
      <div className={`w-full ${isInline ? '' : 'max-w-5xl my-auto'} rounded-[2.5rem] border overflow-hidden flex flex-col max-h-[92vh] ${bgClass}`}>
        
        {/* Header Bar */}
        <div className="p-5 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[0.65rem] uppercase tracking-wider">
                  Interactive Master Guide v3.5
                </span>
                <span className="text-xs text-slate-400 font-mono">Bilingual TH / EN • Step-by-Step</span>
              </div>
              <h2 className={`text-xl md:text-2xl font-black ${textClass} font-display tracking-tight`}>
                {lang === 'th' ? 'คู่มือสอนใช้งาน EduEase Energy ทีละขั้นตอนอย่างละเอียด' : 'EduEase Energy Comprehensive Step-by-Step Handbook'}
              </h2>
            </div>
          </div>

          {!isInline && onClose && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white self-end md:self-auto cursor-pointer"
              aria-label="Close user manual"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Bar & Chapter Nav Tabs */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 space-y-3">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'th' ? 'พิมพ์ค้นหาหัวข้อคู่มือ... (เช่น "แอร์", "เพิ่มอุปกรณ์", "TOU", "คำนวณบิล", "บอส", "สิทธิ์", "PDF")' : 'Search handbook chapters and steps...'}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-16 py-2.5 text-xs md:text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Navigation Chapter Badges with Left/Right Scroll Controls */}
          <div className="relative flex items-center group/scroll">
            {/* Left Scroll Button */}
            {canScrollLeft && (
              <button
                onClick={() => handleScroll('left')}
                className="absolute left-0 z-10 p-1.5 rounded-full bg-slate-900/80 dark:bg-slate-800/90 text-white shadow-lg border border-slate-700 hover:bg-emerald-500 transition-all cursor-pointer -ml-1"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div 
              ref={tabsScrollRef}
              className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-emerald-500/20 w-full px-1 scroll-smooth"
            >
              {manualTabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105'
                        : isDarkMode
                          ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{lang === 'th' ? tab.labelTh : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Scroll Button */}
            {canScrollRight && (
              <button
                onClick={() => handleScroll('right')}
                className="absolute right-0 z-10 p-1.5 rounded-full bg-slate-900/80 dark:bg-slate-800/90 text-white shadow-lg border border-slate-700 hover:bg-emerald-500 transition-all cursor-pointer -mr-1"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-6 text-sm leading-relaxed scrollbar-none flex-1">
          
          {/* ========================================================================= */}
          {/* TAB 1: AUTHENTICATION & MULTI-ROLE LOGIN */}
          {/* ========================================================================= */}
          {activeTab === 'auth' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800 gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>บทที่ 1: ระบบเข้าสู่ระบบ & สิทธิ์การใช้งาน 3 รูปแบบ (Authentication & Roles)</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    เรียนรู้วิธีการเข้าสู่ระบบ การสลับบัญชีทดสอบ 1-Click Demo และสิทธิ์การมองเห็นข้อมูล
                  </p>
                </div>
              </div>

              {/* Step-by-step Walkthrough */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>ขั้นตอนการใช้งานทีละขั้น (Step-by-Step Instructions):</span>
                </h4>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 1: เลือกบทบาทการใช้งาน (Select Your Role)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('auth_s1')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['auth_s1'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['auth_s1'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ที่หน้าเข้าสู่ระบบ ให้เลือกบทบาทที่เหมาะสม เช่น <strong>นักเรียน/นักศึกษา</strong> (Student เน้นเควสและเกมการเรียนรู้), <strong>เจ้าของบ้าน</strong> (Resident เน้นควบคุมค่าไฟและงบประมาณ), หรือ <strong>ผู้ตรวจสอบพลังงาน/ผู้ดูแลอาคาร</strong> (Auditor/Admin เน้นวิเคราะห์เชิงลึกและส่งออกบิล)
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 2: ใช้บัญชีด่วน 1-Click Demo หรือพิมพ์รหัสผ่าน
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('auth_s2')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['auth_s2'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['auth_s2'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    คลิกเลือกการ์ดบัญชีทดลองด้านล่างเพื่อคัดลอก หรือกดปุ่ม <strong>"เข้าสู่ระบบด่วน"</strong> ในหน้าแรกเพื่อเข้าสู่ Dashboard ได้ทันทีโดยไม่ต้องจำรหัสผ่าน
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 3: สลับบัญชีทดสอบใน Dashboard
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('auth_s3')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['auth_s3'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['auth_s3'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    เมื่ออยู่ในระบบแล้ว สามารถคลิกที่ <strong>ปุ่มโปรไฟล์ / Level</strong> มุมขวาบนของ HeaderBar เพื่อเปิดหน้าต่างสลับบทบาทหรือออกจากระบบได้อย่างสะดวก
                  </p>
                </div>
              </div>

              {/* Demo Accounts List Box */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  บัญชีผู้ใช้จำลองสำหรับทดสอบระบบ (Quick Demo User Accounts):
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {DEMO_USERS.map((demo) => {
                    const DIcon = demo.icon;
                    return (
                      <div key={demo.role} className={`p-4 rounded-2xl border ${cardBg} space-y-2 relative`}>
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded-full text-[0.68rem] font-bold ${demo.badgeColor}`}>
                            {demo.role.toUpperCase()}
                          </span>
                          <DIcon className="w-4 h-4 text-slate-400" />
                        </div>
                        
                        <div className="font-extrabold text-slate-900 dark:text-white text-xs">
                          {lang === 'th' ? demo.titleTh : demo.titleEn}
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-200/60 dark:bg-slate-900/80 font-mono text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">User:</span>
                            <span className="font-bold text-emerald-500">{demo.username}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Pass:</span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">{demo.passcode}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopy(demo.role, `Username: ${demo.username} | Password: ${demo.passcode}`)}
                          className="w-full py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 font-bold text-[0.68rem] transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedField === demo.role ? 'คัดลอกสำเร็จ!' : 'คัดลอกข้อมูลล็อกอิน'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety Tips */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 font-extrabold text-xs text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ระบบความปลอดภัยและการเข้ารหัส (Security Standard):</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  ข้อมูลการใช้งานถูกเข้ารหัสแบบ TLS 1.3 พร้อมระบบ PBKDF2 Password Hashing โดยไม่มีการเปิดเผยรหัสผ่านในฝั่ง Client และรองรับการยืนยันตัวตนด้วย Passkey Biometrics
                </p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: HOME DASHBOARD */}
          {/* ========================================================================= */}
          {activeTab === 'home' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800 gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Home className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>บทที่ 2: หน้าหลัก & ศูนย์สรุป 5 วินาที (Home Dashboard & 5-Sec Answers)</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    ดูสรุปค่าไฟ พฤติกรรมการใช้พลังงาน และสถานะงบประมาณได้ทันทีใน 5 วินาที
                  </p>
                </div>
                <button
                  onClick={() => handleJumpToPage('home')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-emerald-600 transition-all self-start sm:self-auto shrink-0"
                >
                  <span>เปิดหน้าหลักทันที</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step-by-step Walkthrough */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>ขั้นตอนการอ่านค่าและใช้งานหน้าหลัก (Step-by-Step Guide):</span>
                </h4>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 1: ตรวจสอบสรุป 4 กล่องไฮไลต์ (Top Metric Cards)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('home_s1')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['home_s1'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['home_s1'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 pl-8.5 space-y-1">
                    <li><strong>ค่าไฟวันนี้ (Today Cost):</strong> แสดงยอดเงินค่าไฟสะสมของวันนี้แบบเรียลไทม์</li>
                    <li><strong>ประมาณการสิ้นเดือน (Monthly Estimate):</strong> คำนวณแนวโน้มค่าไฟทั้งเดือนตามพฤติกรรมปัจจุบัน</li>
                    <li><strong>เงินประหยัดสะสม (Est. Savings):</strong> ยอดเงินที่ประหยัดได้เทียบกับการใช้ไฟแบบไม่ควบคุม (~฿320/เดือน)</li>
                    <li><strong>ดัชนีประหยัดไฟ 76/100 (Energy Score):</strong> คะแนนเกรด B+ พร้อมตัวชี้วัดความมีประสิทธิภาพ</li>
                  </ul>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 2: เช็กเกจวัดงบประมาณ 3 สถานะสี (Budget Gauge Tracker)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('home_s2')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['home_s2'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['home_s2'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    เกจวงกลมจะเตือนภัย 3 ระดับ: <strong>สีเขียว (ต่ำกว่า 70% = On Track ปลอดภัย)</strong>, <strong>สีเหลือง (70-90% = Warning ใกล้เต็มงบ)</strong>, และ <strong>สีแดง (เกิน 90% = Over Budget เสี่ยงค่าไฟพุ่ง)</strong>
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 3: เปิด-ปิดสวิตช์เครื่องใช้ไฟฟ้าแบบด่วน (Quick Switch Toggle)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('home_s3')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['home_s3'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['home_s3'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    คลิกที่สวิตช์รูปปลั๊กของการ์ดเครื่องใช้ไฟฟ้าในหน้าแรกเพื่อเปิดหรือปิดอุปกรณ์ ยอดคำนวณวัตต์รวมและค่าไฟรายชั่วโมงจะปรับเปลี่ยนแบบเรียลไทม์ทันที
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: APPLIANCES & ECO CUT */}
          {/* ========================================================================= */}
          {activeTab === 'appliances' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800 gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>บทที่ 3: จัดการเครื่องใช้ไฟฟ้า & ระบบตัดไฟสแตนด์บาย Eco Cut 0W</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    การเพิ่มอุปกรณ์ เลือกรุ่นจาก 60+ รุ่นในแคตตาล็อก และตัดกระแสไฟแฝง
                  </p>
                </div>
                <button
                  onClick={() => handleJumpToPage('appliances')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-emerald-600 transition-all self-start sm:self-auto shrink-0"
                >
                  <span>เปิดหน้าอุปกรณ์</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step-by-step Walkthrough */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>ขั้นตอนการเพิ่มและจัดการเครื่องใช้ไฟฟ้า (Step-by-Step):</span>
                </h4>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 1: เลื่อนแถบหมวดหมู่ (Category Horizontal Bar)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('app_s1')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['app_s1'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['app_s1'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ใช้ <strong>ปุ่มลูกศรซ้าย-ขวา (&lt; และ &gt;)</strong> หรือ <strong>หมุนลูกกลิ้งเมาส์</strong> บนแถบหมวดหมู่ เพื่อเลือกดูอุปกรณ์แยกตามประเภท เช่น เครื่องปรับอากาศ, ตู้เย็น, เครื่องซักผ้า, ทีวี, พัดลม, เครื่องทำน้ำอุ่น
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 2: กดปุ่ม "+ เพิ่มอุปกรณ์ใหม่" และเลือกรุ่นจาก Brand Catalog
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('app_s2')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['app_s2'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['app_s2'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    คลิกเมนู <strong>"เลือกรุ่นมาตรฐานจากแบรนด์ดัง"</strong> เช่น <em>Daikin Super Inverter (9,200 - 24,200 BTU)</em>, <em>Carrier Color Smart / Copper 11</em>, <em>Mitsubishi 3D Move-Eye / Mr.Slim</em>, <em>Panasonic nanoeX</em>, <em>Samsung WindFree</em>, <em>LG DualCool</em> ฯลฯ ระบบจะกรอกวัตต์ อัตรากินไฟ และฉลากเบอร์ 5 ดาวให้อัตโนมัติ!
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 3: ระบุชั่วโมงใช้งานจริง และเปิดใช้งานระบบ Eco Standby Cut
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('app_s3')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['app_s3'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['app_s3'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    กำหนดชั่วโมงเปิดใช้งานต่อวัน (เช่น แอร์ 8 ชม./วัน) จากนั้นเปิดสวิตช์ <strong>Eco Standby Auto-Cut</strong> เพื่อตัดไฟแฝง (Phantom Load) เมื่อปิดเครื่อง ซึ่งจะช่วยประหยัดเงินได้เฉลี่ย ฿80 - ฿150 ต่อเดือน
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: BUDGET & TOU RATES */}
          {/* ========================================================================= */}
          {activeTab === 'budget' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800 gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>บทที่ 4: คำนวณค่าไฟ กฎอัตราก้าวหน้า & มิเตอร์ TOU (Tariff Engine)</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    สูตรคำนวณอัตราขั้นบันได กฟน./กฟภ., ค่า Ft ลอยตัว และการย้ายโหลดช่วง Off-Peak
                  </p>
                </div>
                <button
                  onClick={() => handleJumpToPage('budget')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-emerald-600 transition-all self-start sm:self-auto shrink-0"
                >
                  <span>เปิดหน้างบประมาณ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step-by-step Walkthrough */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>ขั้นตอนการตั้งงบประมาณและวางแผนลดค่าไฟ (Step-by-Step):</span>
                </h4>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 1: ตั้งงบประมาณเป้าหมายรายเดือน (Set Monthly Budget)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('bud_s1')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['bud_s1'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['bud_s1'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ลากแถบ Slider หรือง่ายๆ โดยพิมพ์ตัวเลขงบประมาณ เช่น ฿1,500 หรือ ฿3,000 ต่อเดือน ระบบจะทำการจำลองเพดานการใช้หน่วยไฟ (kWh Cap) ให้ทันที
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 2: เข้าใจสูตรอัตราก้าวหน้าขั้นบันได (Progressive Tiers)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('bud_s2')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['bud_s2'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['bud_s2'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ยิ่งใช้ไฟเกิน 150 หรือ 400 หน่วย อัตราต่อหน่วยจะแพงขึ้นแบบก้าวกระโดด (3.24 ฿ -&gt; 4.22 ฿ -&gt; 4.42 ฿) พร้อมบวกค่า Ft 0.3972 ฿/หน่วย + ค่าบริการ 24.62 ฿ + VAT 7%
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 3: สลับมิเตอร์เป็น TOU และใช้สูตรประหยัด 50%
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('bud_s3')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['bud_s3'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['bud_s3'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ช่วง <strong>Off-Peak (22:00 - 09:00 น. และวันหยุด)</strong> ค่าไฟถูกลงเหลือเพียง ~2.6 บาท/หน่วย ให้ตั้งเวลาซักผ้า รีดผ้า หรือชาร์จแบตเตอรี่ช่วงเวลานี้ จะลดค่าไฟลงได้มากกว่าครึ่ง
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: AI COACH & SMART INSIGHTS */}
          {/* ========================================================================= */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800 gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bot className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>บทที่ 5: AI Coach Voltie & Smart Insights Hub (วิเคราะห์อัจฉริยะ)</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    ผู้ช่วย AI อัจฉริยะ ตรวจจับสิ่งผิดปกติ (Anomaly) และจำลองสถานการณ์ What-If
                  </p>
                </div>
                <button
                  onClick={() => handleJumpToPage('ai-coach')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-emerald-600 transition-all self-start sm:self-auto shrink-0"
                >
                  <span>แชทกับ Voltie AI</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step-by-step Walkthrough */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>ขั้นตอนการขอคำปรึกษาและใช้งาน Smart Insights:</span>
                </h4>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 1: พิมพ์คำถามหรือกดปุ่ม Quick Prompt ถาม AI Coach
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('ai_s1')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['ai_s1'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['ai_s1'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    คลิกเลือกคำถามยอดนิยม เช่น <em>"ทำไมค่าไฟเดือนนี้แพงขึ้น?", "วิธีตั้งค่าแอร์ 26°C ร่วมกับพัดลม", "ควรเปลี่ยนมิเตอร์เป็น TOU ไหม?"</em> Voltie จะวิเคราะห์จากข้อมูลการใช้อุปกรณ์ของคุณโดยตรง
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 2: ตรวจสอบการแจ้งเตือนค่าไฟผิดปกติ (Resolve Anomaly)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('ai_s2')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['ai_s2'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['ai_s2'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ในหน้า <strong>Smart Insights Hub</strong> หากระบบตรวจพบค่าไฟกระโดดผิดปกติเกิน 20% จะมีการ์ดสีแดงแจ้งเตือน สามารถกดปุ่ม <strong>"แก้ไขทันที (Resolve)"</strong> เพื่อนำคำแนะนำไปปฏิบัติ
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 3: ทดลองเครื่องจำลอง What-If Scenario
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('ai_s3')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['ai_s3'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['ai_s3'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    จำลองผลลัพธ์ล่วงหน้า เช่น "ถ้าลดเวลาเปิดแอร์ลงวันละ 1 ชม. จะประหยัดเท่าไหร่?" หรือ "ถ้าเปลี่ยนหลอดไฟเป็น LED จะคืนทุนในกี่เดือน?" เพื่อช่วยตัดสินใจก่อนปรับพฤติกรรมจริง
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: ECO QUESTS & LEARNING */}
          {/* ========================================================================= */}
          {activeTab === 'quests' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800 gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>บทที่ 6: ภารกิจประหยัดไฟ & คลังบทเรียน (Eco Quests & Energy Learning)</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    เรียนรู้ทักษะการประหยัดพลังงาน ทำภารกิจลดค่าไฟในชีวิตจริง และพัฒนาเมืองสีเขียว
                  </p>
                </div>
                <button
                  onClick={() => handleJumpToPage('learning')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-emerald-600 transition-all self-start sm:self-auto shrink-0"
                >
                  <span>เปิดคลังบทเรียน & เควส</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step-by-step Walkthrough */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>ขั้นตอนการทำภารกิจและเรียนรู้การประหยัดพลังงาน:</span>
                </h4>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 1: เช็กอินรับภารกิจประจำวัน (Daily Eco Quests)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('quest_s1')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['quest_s1'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['quest_s1'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ทำภารกิจง่ายๆ ในชีวิตประจำวัน เช่น "ปิดไฟดวงที่ไม่ใช้เมื่อออกจากห้อง", "ตั้งเวลาปิดแอร์ล่วงหน้า 30 นาที", หรือ "ตัดไฟสแตนด์บายทีวี" เพื่อสะสมแต้มคะแนนความรู้
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 2: ศึกษาคลังบทเรียนไฟฟ้าเบื้องต้น (Energy Knowledge Base)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('quest_s2')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['quest_s2'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['quest_s2'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ศึกษาบทเรียน เช่น <em>"ทำความรู้จักระบบมิเตอร์ TOU", "เทคนิคเปิดแอร์ 26°C + พัดลม", "วิธีตรวจจับกระแสไฟรั่วไหลเบื้องต้น"</em> พร้อมแบบทดสอบวัดความรู้
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 3: ติดตามผลการลดคาร์บอนและสร้างเมืองสีเขียว (Eco Progress)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('quest_s3')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['quest_s3'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['quest_s3'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ดูสถิติการลดคาร์บอนฟุตพริ้นท์ (kg CO2) จากการประหยัดไฟของคุณ และร่วมพัฒนาเมืองพลังงานสะอาดในหน้า Green Eco City
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: MY LOCATIONS */}
          {/* ========================================================================= */}
          {activeTab === 'locations' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800 gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>บทที่ 7: สถานที่ของฉัน & โหนดสมาร์ทมิเตอร์ (My Locations & Smart Meters)</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    การจัดการหลายสถานที่ หอพัก บ้านพัก ร้านค้า และการสลับมิเตอร์ในคลิกเดียว
                  </p>
                </div>
                <button
                  onClick={() => handleJumpToPage('locations')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-emerald-600 transition-all self-start sm:self-auto shrink-0"
                >
                  <span>เปิดหน้าสถานที่</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step-by-step Walkthrough */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>ขั้นตอนการสลับและเพิ่มสถานที่ใหม่:</span>
                </h4>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 1: สลับสถานที่จากเมนูดรอปดาวน์ด้านบน (HeaderBar Switcher)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('loc_s1')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['loc_s1'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['loc_s1'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    คลิกที่กล่องสถานที่มุมซ้ายบนของแถบ Header เพื่อสลับดูบิลระหว่าง <strong>Home Base (บ้านหลัก)</strong>, <strong>Dorm 402 (หอพักนักศึกษา)</strong>, หรือ <strong>Green Cafe (ร้านกาแฟ)</strong> ได้ในคลิกเดียว
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 2: เพิ่มสถานที่ใหม่และตั้งค่างบประมาณเฉพาะ
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('loc_s2')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['loc_s2'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['loc_s2'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    คลิกปุ่ม <strong>"+ เพิ่มสถานที่ใหม่"</strong> ระบุชื่อสถานที่ ประเภท (บ้าน/หอพัก/ร้านค้า) และวงเงินงบประมาณเฉพาะ ระบบจะแยกการวิเคราะห์ค่าไฟของแต่ละสถานที่ออกจากกันอย่างชัดเจน
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: SAVING SCORE */}
          {/* ========================================================================= */}
          {activeTab === 'score' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800 gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>บทที่ 8: ดัชนีคะแนนประหยัดพลังงาน 5 มิติ (Energy Saving Score 76/100)</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    โครงสร้างคะแนนเกณฑ์มาตรฐาน ESG และวิธีดันคะแนนสู่ระดับ Grade A+
                  </p>
                </div>
                <button
                  onClick={() => handleJumpToPage('score')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-emerald-600 transition-all self-start sm:self-auto shrink-0"
                >
                  <span>ดูคะแนนละเอียด</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step-by-step Walkthrough */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>วิธีเพิ่มคะแนนดัชนีประหยัดพลังงานทีละขั้นตอน:</span>
                </h4>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 1: ตรวจสอบคะแนนย่อยทั้ง 5 มิติ
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('score_s1')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['score_s1'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['score_s1'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 pl-8.5 space-y-1">
                    <li><strong>มิติที่ 1 (Efficiency):</strong> ประสิทธิภาพอุปกรณ์เบอร์ 5 ดาวอินเวอร์เตอร์ (25 คะแนน)</li>
                    <li><strong>มิติที่ 2 (Standby Discipline):</strong> วินัยการตัดไฟสแตนด์บาย 0W (20 คะแนน)</li>
                    <li><strong>มิติที่ 3 (Budget Control):</strong> การคุมให้อยู่ในงบประมาณไม่เกินกำหนด (25 คะแนน)</li>
                    <li><strong>มิติที่ 4 (Peak Avoidance):</strong> การหลีกเลี่ยงใช้ไฟหนักช่วงพีค (15 คะแนน)</li>
                    <li><strong>มิติที่ 5 (Quests & Habits):</strong> การทำภารกิจและศึกษาบทเรียน (15 คะแนน)</li>
                  </ul>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 2: ทำตามคำแนะนำเพื่อดันคะแนนขึ้นสู่เกรด A+ (&gt;90 แต้ม)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('score_s2')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['score_s2'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['score_s2'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    คลิกดูข้อเสนอแนะในการ์ด เช่น "เปิดแอร์ 26°C เพื่อรับ +5 คะแนน" หรือ "ตัดไฟสแตนด์บายปลั๊กพ่วงเพื่อรับ +3 คะแนน" เมื่อคะแนนแตะ 90+ จะได้รับเหรียญรางวัล Gold Eco Master Badge
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: TRUST CENTER & GLOBAL SEARCH */}
          {/* ========================================================================= */}
          {activeTab === 'trust' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800 gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>บทที่ 9: ศูนย์ความโปร่งใส, ค้นหาครอบจักรวาล & ส่งออกรายงาน PDF</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    การตรวจสอบสูตรคำนวณ AI Decision Logs, ค้นหาด้วย Cmd+K และดาวน์โหลด PDF
                  </p>
                </div>
                <button
                  onClick={() => handleJumpToPage('trust-center')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-emerald-600 transition-all self-start sm:self-auto shrink-0"
                >
                  <span>เปิดศูนย์ความน่าเชื่อถือ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step-by-step Walkthrough */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>ขั้นตอนการค้นหาและส่งออกรายงานค่าไฟอย่างเป็นทางการ:</span>
                </h4>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 1: ใช้คีย์ลัดค้นหาครอบจักรวาล (Cmd + K / Ctrl + K)
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('trust_s1')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['trust_s1'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['trust_s1'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    กดปุ่ม <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono font-bold">Cmd + K</kbd> หรือ <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono font-bold">Ctrl + K</kbd> บนคีย์บอร์ด หรือคลิกปุ่มค้นหาใน HeaderBar เพื่อค้นหาเมนู คำศัพท์ บทเรียน หรือเครื่องใช้ไฟฟ้า และเปิดขึ้นมาได้ใน 1 วินาที
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 2: ตรวจสอบความถูกต้องและแหล่งอ้างอิงสูตรคำนวณ
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('trust_s2')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['trust_s2'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['trust_s2'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ในหน้า <strong>Trust Center</strong> สามารถดูประวัติการคำนวณของ AI (Decision Logs) และสูตรอ้างอิงทางการจากการไฟฟ้านครหลวง (MEA) และการไฟฟ้าส่วนภูมิภาค (PEA) ได้อย่างโปร่งใส 100%
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${stepCardBg} space-y-2`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm">
                        ขั้นตอนที่ 3: ดาวน์โหลดรายงานวิเคราะห์ค่าไฟเป็นไฟล์ PDF
                      </h5>
                    </div>
                    <button 
                      onClick={() => toggleStepCompleted('trust_s3')}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-500 cursor-pointer"
                    >
                      {completedSteps['trust_s3'] ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
                      <span>{completedSteps['trust_s3'] ? 'ทำตามแล้ว' : 'ทำตามขั้นตอนนี้'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pl-8.5">
                    ในหน้า <strong>Analytics &amp; Insights</strong> ให้คลิกปุ่ม <strong>"Export PDF Report"</strong> ระบบจะประมวลผลและสร้างไฟล์ PDF สรุปยอดค่าไฟ กราฟวิเคราะห์ และคำแนะนำส่วนบุคคลให้ดาวน์โหลดเก็บไว้ได้ทันที
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{lang === 'th' ? 'ต้องการสอบถามเพิ่มเติม? ปรึกษา Voltie AI ได้ตลอด 24 ชม.' : 'Need assistance? Consult Voltie AI anytime.'}</span>
          </div>
          <button
            onClick={() => handleJumpToPage('ai-coach')}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Bot className="w-4 h-4" />
            <span>{lang === 'th' ? 'ถาม Voltie AI ตอนนี้' : 'Ask Voltie AI Now'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserManual;
