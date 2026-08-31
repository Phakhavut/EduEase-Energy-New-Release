import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  Zap, 
  BookOpen, 
  Award, 
  Settings, 
  BarChart3, 
  Calculator, 
  Bot, 
  Globe, 
  Home, 
  ShieldCheck, 
  ArrowRight, 
  Sliders,
  Sparkles,
  Command,
  Trophy,
  SlidersHorizontal,
  Building2,
  HelpCircle,
  TrendingDown,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { AppPage } from '../../types';

interface SearchResultItem {
  id: string;
  titleTh: string;
  titleEn: string;
  categoryTh: string;
  categoryEn: string;
  categoryKey: 'all' | 'home' | 'appliances' | 'budget' | 'ai' | 'score' | 'manual';
  icon: React.ElementType;
  page: AppPage;
  descriptionTh: string;
  descriptionEn: string;
  keywords: string[];
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (page: AppPage) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigatePage,
  lang,
  isDarkMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'home' | 'appliances' | 'budget' | 'ai' | 'score' | 'manual'>('all');
  
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(checkScroll, 100);
    }
  }, [isOpen, selectedCategory]);

  useEffect(() => {
    const el = categoryScrollRef.current;
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
  }, [isOpen]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Handle Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchableIndex: SearchResultItem[] = [
    {
      id: 'page_home',
      titleTh: '🏠 หน้าแรก & ตอบคำถาม 5 วินาที (Home Dashboard)',
      titleEn: 'Home Dashboard',
      categoryTh: 'หน้าหลัก',
      categoryEn: 'Home',
      categoryKey: 'home',
      icon: Home,
      page: 'home',
      descriptionTh: 'สรุปค่าไฟวันนี้, เงินเซฟสะสม ฿320, คะแนนดัชนี 76/100, ภารกิจประจำวัน',
      descriptionEn: 'Daily energy cost summary, ฿320 savings, 76/100 score, daily quests',
      keywords: ['หน้าแรก', 'home', 'ค่าไฟวันนี้', 'dashboard', 'ตอบคำถาม', 'สรุป']
    },
    {
      id: 'page_score',
      titleTh: '🌟 ดัชนีการประหยัดพลังงาน (Energy Saving Score 76/100)',
      titleEn: 'Energy Saving Score',
      categoryTh: 'โปรไฟล์ & คะแนน',
      categoryEn: 'Profile & Score',
      categoryKey: 'score',
      icon: Trophy,
      page: 'score',
      descriptionTh: 'วิเคราะห์ทักษะ พฤติกรรม และประสิทธิภาพการใช้ไฟ 5 มิติ พร้อมแนวทางเพิ่มคะแนน',
      descriptionEn: 'Overall score evaluation across 5 dimensions with optimization tips',
      keywords: ['คะแนน', 'score', 'ดัชนี', '76', 'สมาร์ทเซฟเวอร์', 'ประหยัด']
    },
    {
      id: 'page_appliances',
      titleTh: '🔌 เครื่องใช้ไฟฟ้า & Eco Standby Cut (Appliances)',
      titleEn: 'Appliance Inventory & Eco Cut',
      categoryTh: 'อุปกรณ์',
      categoryEn: 'Devices',
      categoryKey: 'appliances',
      icon: Zap,
      page: 'appliances',
      descriptionTh: 'ตรวจสอบวัตต์ แอร์ ตู้เย็น พัดลม โหมดตัดไฟสแตนด์บายอัตโนมัติ สวิตช์ Eco',
      descriptionEn: 'Monitor appliance wattage, AC, fridge, fans, and Eco Standby Cut mode',
      keywords: ['อุปกรณ์', 'แอร์', 'ตู้เย็น', 'พัดลม', 'สวิตช์', 'สแตนด์บาย', 'วัตต์', 'eco']
    },
    {
      id: 'page_comparison',
      titleTh: '🔬 ห้องแล็บเปรียบเทียบอุปกรณ์ (Compare Lab)',
      titleEn: 'Device Comparison Studio',
      categoryTh: 'อุปกรณ์',
      categoryEn: 'Devices',
      categoryKey: 'appliances',
      icon: SlidersHorizontal,
      page: 'compare',
      descriptionTh: 'เปรียบเทียบค่าไฟ แอร์ธรรมดา VS แอร์อินเวอร์เตอร์ เบอร์ 5 คำนวณจุดคุ้มทุน',
      descriptionEn: 'Compare inverter AC vs normal AC energy consumption & payback period',
      keywords: ['เปรียบเทียบ', 'compare', 'อินเวอร์เตอร์', 'เบอร์ 5', 'คุ้มทุน']
    },
    {
      id: 'page_budget',
      titleTh: '👛 วางแผนงบประมาณ & คิดค่าไฟ MEA/PEA (Budget & Bills)',
      titleEn: 'Budget Planning & Billing',
      categoryTh: 'ค่าไฟ & งบ',
      categoryEn: 'Finance',
      categoryKey: 'budget',
      icon: Calculator,
      page: 'budget',
      descriptionTh: 'ตั้งเพดานงบประมาณค่าไฟ ประเมินบิลปลายเดือน สูตรคำนวณขั้นบันได MEA/PEA',
      descriptionEn: 'Set monthly budget limits, bill prediction, and progressive tariff rules',
      keywords: ['งบประมาณ', 'ค่าไฟ', 'บิล', 'budget', 'คำนวณ', 'pea', 'mea', 'ขั้นบันได']
    },
    {
      id: 'page_analytics',
      titleTh: '📈 วิเคราะห์กราฟการใช้ไฟ & TOU Peak/Off-Peak (Analytics)',
      titleEn: 'Analytics & TOU Graphs',
      categoryTh: 'AI & วิเคราะห์',
      categoryEn: 'Analytics',
      categoryKey: 'ai',
      icon: BarChart3,
      page: 'analytics',
      descriptionTh: 'กราฟรายชั่วโมง รายวัน อัตราค่าไฟ TOU (ช่วงพีค 09:00-22:00 น. VS ออฟพีค)',
      descriptionEn: 'Hourly, daily charts, TOU peak (09:00-22:00) vs off-peak tariff analysis',
      keywords: ['กราฟ', 'analytics', 'tou', 'peak', 'off-peak', 'พีค', 'ออฟพีค', 'ชั่วโมง']
    },
    {
      id: 'page_insights',
      titleTh: '🧠 Smart Insights Hub & ตรวจจับไฟพุ่ง (Anomalies)',
      titleEn: 'Smart Insights Hub & Anomaly Detection',
      categoryTh: 'AI & วิเคราะห์',
      categoryEn: 'Analytics',
      categoryKey: 'ai',
      icon: Sparkles,
      page: 'insights',
      descriptionTh: 'ตรวจจับกระแสไฟผิดปกติ (Anomalies), แบบจำลอง What-If, สมุดบันทึกพลังงาน',
      descriptionEn: 'Anomaly detection alerts, What-If scenario simulations, energy diary',
      keywords: ['insights', 'ความผิดปกติ', 'ไฟพุ่ง', 'รั่ว', 'what-if', 'บันทึก', 'anomalies']
    },
    {
      id: 'page_ai_coach',
      titleTh: '🤖 Voltie AI Coach (ผู้ช่วยวิเคราะห์พลังงาน)',
      titleEn: 'Voltie AI Coach',
      categoryTh: 'AI & วิเคราะห์',
      categoryEn: 'AI Coach',
      categoryKey: 'ai',
      icon: Bot,
      page: 'ai-coach',
      descriptionTh: 'แชทสอบถาม Voltie AI แนะนำแนวทางประหยัดไฟ วิเคราะห์พฤติกรรมอัตโนมัติ',
      descriptionEn: 'Chat with Voltie AI coach for automated energy optimization tips',
      keywords: ['ai', 'coach', 'voltie', 'แชท', 'คำแนะนำ', 'ผู้ช่วย', 'ถามตอบ']
    },
    {
      id: 'page_city',
      titleTh: '🏙️ เมืองสีเขียว & สถิติพลังงานหมุนเวียน (Green Eco City)',
      titleEn: 'Green Eco City',
      categoryTh: 'หน้าหลัก',
      categoryEn: 'Green City',
      categoryKey: 'home',
      icon: Building2,
      page: 'city',
      descriptionTh: 'พัฒนาเมืองพลังงานสะอาด ติดตามการลดคาร์บอนฟุตพริ้นท์',
      descriptionEn: 'Explore clean energy progress and carbon reduction milestones',
      keywords: ['เมือง', 'city', 'คาร์บอน', 'อาคาร', '3d', 'พลังงานสะอาด']
    },
    {
      id: 'page_learning',
      titleTh: '🌿 ภารกิจประหยัดไฟ & คลังบทเรียนไฟฟ้า (Quests & Lessons)',
      titleEn: 'Energy Quests & Lessons',
      categoryTh: 'คู่มือ & ตั้งค่า',
      categoryEn: 'Lessons & Quests',
      categoryKey: 'manual',
      icon: Globe,
      page: 'learning',
      descriptionTh: 'ทำภารกิจประหยัดไฟประจำวัน เรียนรู้บทเรียนไฟฟ้าเบื้องต้นและเคล็ดลับ',
      descriptionEn: 'Complete daily energy quests and learn practical conservation lessons',
      keywords: ['เควส', 'quest', 'บทเรียน', 'ความรู้', 'ภารกิจ', 'เรียนรู้']
    },
    {
      id: 'page_achievements',
      titleTh: '🏆 ตราความสำเร็จ & สถิติส่วนตัว (Achievements & Badges)',
      titleEn: 'Achievements & Badges',
      categoryTh: 'โปรไฟล์ & คะแนน',
      categoryEn: 'Profile & Badges',
      categoryKey: 'score',
      icon: Award,
      page: 'achievements',
      descriptionTh: 'สะสมเหรียญตราเกียรติยศ และบันทึกสถิติความสำเร็จในการประหยัดพลังงาน',
      descriptionEn: 'Collect achievement badges and milestone records',
      keywords: ['ตรา', 'badge', 'ความสำเร็จ', 'สถิติ', 'เหรียญตรา']
    },
    {
      id: 'page_locations',
      titleTh: '📍 สถานที่ของฉัน & โหนดสมาร์ทมิเตอร์ (My Locations)',
      titleEn: 'My Locations & Smart Nodes',
      categoryTh: 'หน้าหลัก',
      categoryEn: 'Locations',
      categoryKey: 'home',
      icon: Home,
      page: 'locations',
      descriptionTh: 'สลับและจัดการมิเตอร์ไฟฟ้าหลายสถานที่ เช่น หอพัก, บ้านพัก, ร้านค้า',
      descriptionEn: 'Switch and manage multiple smart meter nodes e.g. dorms, homes, shops',
      keywords: ['สถานที่', 'location', 'หอพัก', 'บ้าน', 'โหนด', 'สลับ']
    },
    {
      id: 'page_trust',
      titleTh: '🛡️ ศูนย์ความน่าเชื่อถือ & Audit Logs (Trust Center)',
      titleEn: 'Trust Center & Audit Logs',
      categoryTh: 'คู่มือ & ตั้งค่า',
      categoryEn: 'Trust & Settings',
      categoryKey: 'manual',
      icon: ShieldCheck,
      page: 'trust-center',
      descriptionTh: 'ความโปร่งใสของสูตร AI, ประวัติการประมวลผล (Decision Logs), ความปลอดภัย',
      descriptionEn: 'AI formula transparency, decision logs, and security controls',
      keywords: ['ความปลอดภัย', 'trust', 'audit', 'log', 'สูตร', 'ความน่าเชื่อถือ']
    },
    {
      id: 'page_manual',
      titleTh: '📚 คู่มือการใช้งานเว็บฉบับสมบูรณ์ (User Manual & Help)',
      titleEn: 'Full Web User Manual & Help Center',
      categoryTh: 'คู่มือ & ตั้งค่า',
      categoryEn: 'Trust & Settings',
      categoryKey: 'manual',
      icon: HelpCircle,
      page: 'settings',
      descriptionTh: 'คู่มืออธิบายอย่างละเอียดทุกฟีเจอร์ บทเรียน การสลับบัญชี และคำถามที่พบบ่อย (FAQ)',
      descriptionEn: 'Detailed user guide for all web features, account switching, and FAQ',
      keywords: ['คู่มือ', 'manual', 'help', 'วิธีใช้', 'ช่วยเหลือ', 'คำแนะนำ', 'faq']
    },
    {
      id: 'page_settings',
      titleTh: '⚙️ ตั้งค่าระบบ & ภาษา (Settings)',
      titleEn: 'Settings & Language',
      categoryTh: 'คู่มือ & ตั้งค่า',
      categoryEn: 'Trust & Settings',
      categoryKey: 'manual',
      icon: Settings,
      page: 'settings',
      descriptionTh: 'สลับภาษาไทย/อังกฤษ, เปลี่ยนโหมดมืด/สว่าง, ตั้งค่าการแจ้งเตือน',
      descriptionEn: 'Switch Thai/English, toggle dark/light theme, notification preferences',
      keywords: ['ตั้งค่า', 'settings', 'ภาษา', 'โหมดมืด', 'dark mode', 'แจ้งเตือน']
    }
  ];

  const categories = [
    { key: 'all', labelTh: 'ทั้งหมด', labelEn: 'All Results' },
    { key: 'home', labelTh: '🏠 หน้าหลัก', labelEn: 'Home' },
    { key: 'appliances', labelTh: '🔌 อุปกรณ์', labelEn: 'Appliances' },
    { key: 'budget', labelTh: '👛 ค่าไฟ & งบ', labelEn: 'Budget' },
    { key: 'ai', labelTh: '🧠 AI & วิเคราะห์', labelEn: 'AI & Analytics' },
    { key: 'score', labelTh: '🌟 คะแนน & โปรไฟล์', labelEn: 'Score & Profile' },
    { key: 'manual', labelTh: '📚 คู่มือ & ตั้งค่า', labelEn: 'Manual & Settings' },
  ];

  const filteredResults = searchableIndex.filter(item => {
    // Category Filter
    if (selectedCategory !== 'all' && item.categoryKey !== selectedCategory) {
      return false;
    }

    // Query Filter
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      item.titleTh.toLowerCase().includes(query) ||
      item.titleEn.toLowerCase().includes(query) ||
      item.categoryTh.toLowerCase().includes(query) ||
      item.descriptionTh.toLowerCase().includes(query) ||
      item.descriptionEn.toLowerCase().includes(query) ||
      item.keywords.some(k => k.toLowerCase().includes(query))
    );
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className={`w-full max-w-3xl rounded-[2.5rem] border shadow-2xl overflow-hidden flex flex-col ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-white shadow-emerald-950/40' 
              : 'bg-white border-emerald-100 text-slate-900 shadow-emerald-500/15'
          }`}
        >
          {/* Top Search Input Bar */}
          <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-emerald-500 shrink-0 animate-pulse" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'th' ? 'ค้นหาครอบจักรวาล (เช่น "ค่าไฟ", "แอร์", "TOU", "เควส", "คะแนน", "คู่มือ")...' : 'Search entire web platform...'}
                autoFocus
                className="flex-1 bg-transparent text-base md:text-lg font-extrabold outline-none placeholder:text-slate-400 placeholder:font-normal"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.68rem] font-mono text-slate-500 font-bold">
                <Command className="w-3 h-3" /> K
              </kbd>
            </div>

            {/* Category Filter Chips with Left/Right Scroll Controls */}
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
                ref={categoryScrollRef}
                className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-emerald-500/20 w-full px-1 scroll-smooth"
              >
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key as any)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105'
                          : isDarkMode
                            ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lang === 'th' ? cat.labelTh : cat.labelEn}
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

          {/* Results Summary Header */}
          <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>
              {lang === 'th' 
                ? `พบทั้งหมด ${filteredResults.length} รายการ` 
                : `Found ${filteredResults.length} results`}
            </span>
            <span className="text-[0.68rem] text-emerald-500 font-mono">
              ⚡ Global Search Engine
            </span>
          </div>

          {/* Results List */}
          <div className="max-h-[55vh] overflow-y-auto p-4 space-y-2.5 scrollbar-none">
            {filteredResults.length === 0 ? (
              <div className="py-14 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-xl font-bold">
                  🔍
                </div>
                <p className="text-base font-extrabold text-slate-700 dark:text-slate-300">
                  {lang === 'th' ? 'ไม่พบผลลัพธ์ที่ตรงกับการค้นหา' : 'No matching results found'}
                </p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  {lang === 'th' 
                    ? 'ลองเปลี่ยนคำค้นหา เช่น "ค่าไฟ", "แอร์", "คะแนน", "TOU", "งบประมาณ", "บิล", "คู่มือ"' 
                    : 'Try searching for keywords like "bill", "AC", "score", "TOU", "budget", "manual"'}
                </p>
              </div>
            ) : (
              filteredResults.map(item => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onNavigatePage(item.page);
                      onClose();
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 group ${
                      isDarkMode
                        ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800 hover:border-emerald-500/40'
                        : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5'
                    }`}
                  >
                    <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                          {lang === 'th' ? item.titleTh : item.titleEn}
                        </span>
                        <span className="text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                          {lang === 'th' ? item.categoryTh : item.categoryEn}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {lang === 'th' ? item.descriptionTh : item.descriptionEn}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all self-center shrink-0" />
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="p-4 bg-slate-100/80 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[0.7rem] text-slate-400 font-mono">
            <span className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">Click / Enter</span> {lang === 'th' ? 'เลือกรายการ' : 'to jump'}
            </span>
            <button
              onClick={onClose}
              className="text-emerald-500 font-bold hover:underline cursor-pointer"
            >
              [Esc] {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
