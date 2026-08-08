import React, { useState, useEffect } from 'react';
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
  Command
} from 'lucide-react';
import { AppPage } from '../../types';

interface SearchResultItem {
  id: string;
  titleTh: string;
  titleEn: string;
  categoryTh: string;
  categoryEn: string;
  icon: React.ElementType | string;
  page: AppPage;
  descriptionTh: string;
  descriptionEn: string;
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
      titleTh: 'หน้าแรก & ภาพรวมไฟฟ้า (Home Dashboard)',
      titleEn: 'Home Dashboard',
      categoryTh: 'หน้าหลัก',
      categoryEn: 'Navigation',
      icon: Home,
      page: 'home',
      descriptionTh: 'สรุปค่าไฟวันนี้ พฤติกรรมการใช้ไฟ และภารกิจประจำวัน',
      descriptionEn: 'Daily energy cost summary and missions'
    },
    {
      id: 'page_analytics',
      titleTh: 'วิเคราะห์การใช้ไฟฟ้า & TOU (Analytics)',
      titleEn: 'Analytics & TOU Graphs',
      categoryTh: 'การวิเคราะห์',
      categoryEn: 'Analytics',
      icon: BarChart3,
      page: 'analytics',
      descriptionTh: 'กราฟรายชั่วโมง รายวัน อัตราค่าไฟ TOU Peak/Off-Peak',
      descriptionEn: 'Hourly, daily consumption charts and TOU rate analysis'
    },
    {
      id: 'page_budget',
      titleTh: 'วางแผนงบประมาณ & ค่าไฟ (Budget & Bill)',
      titleEn: 'Budget Planning',
      categoryTh: 'การเงิน',
      categoryEn: 'Finance',
      icon: Calculator,
      page: 'budget',
      descriptionTh: 'ตั้งเป้าหมายงบประมาณค่าไฟ ประเมินบิลปลายเดือน และสูตรคำนวณ MEA/PEA',
      descriptionEn: 'Set monthly targets, bill prediction, and MEA/PEA formulas'
    },
    {
      id: 'page_appliances',
      titleTh: 'จัดการเครื่องใช้ไฟฟ้า (Appliance Management)',
      titleEn: 'Appliance Inventory',
      categoryTh: 'อุปกรณ์',
      categoryEn: 'Devices',
      icon: Zap,
      page: 'appliances',
      descriptionTh: 'ตรวจสอบกำลังวัตต์ แอร์ ตู้เย็น พัดลม และเปรียบเทียบเบอร์ 5',
      descriptionEn: 'Monitor appliance power consumption and compare efficiency'
    },
    {
      id: 'page_ai_coach',
      titleTh: 'Voltie AI Energy Coach',
      titleEn: 'Voltie AI Energy Coach',
      categoryTh: 'ปัญญาประดิษฐ์',
      categoryEn: 'AI Service',
      icon: Bot,
      page: 'ai-coach',
      descriptionTh: 'แชทสอบถาม AI วิเคราะห์ไฟรั่ว คำแนะนำประหยัดไฟอัตโนมัติ',
      descriptionEn: 'Chat with AI coach for energy saving tips and anomaly detection'
    },
    {
      id: 'page_insights',
      titleTh: 'ศูนย์ข้อมูลอัจฉริยะ (Smart Insights Hub)',
      titleEn: 'Smart Insights Hub',
      categoryTh: 'ข้อมูลเชิงลึก',
      categoryEn: 'Insights',
      icon: Sparkles,
      page: 'insights',
      descriptionTh: 'ตรวจจับสิ่งผิดปกติ (Anomalies), What-If Simulation, สมุดบันทึกพลังงาน',
      descriptionEn: 'Anomaly detection, What-If simulation, and energy diary'
    },
    {
      id: 'page_achievements',
      titleTh: 'EduVerse & ความสำเร็จ (Achievements & EduVerse)',
      titleEn: 'EduVerse & Achievements',
      categoryTh: 'ระบบเติบโต',
      categoryEn: 'Gamification',
      icon: Globe,
      page: 'achievements',
      descriptionTh: 'สำรวจโลกเสมือน EduVerse ภารกิจ NPC ภูตพลังงาน และเข็มกลัดเกียรติยศ',
      descriptionEn: 'Explore EduVerse virtual world, NPC quests, and badges'
    },
    {
      id: 'page_learning',
      titleTh: 'คลังบทเรียน & คำศัพท์ (Learning & Glossary)',
      titleEn: 'Learning & Glossary',
      categoryTh: 'การเรียนรู้',
      categoryEn: 'Education',
      icon: BookOpen,
      page: 'learning',
      descriptionTh: 'คลังความรู้ไฟฟ้า คำศัพท์ภาษาไทย-อังกฤษ สื่อความรู้เบ็ดเสร็จ',
      descriptionEn: 'Electricity learning paths and bilingual energy glossary'
    },
    {
      id: 'page_trust',
      titleTh: 'ศูนย์ความโปร่งใส (Trust & Transparency Center)',
      titleEn: 'Trust & Transparency Center',
      categoryTh: 'ความปลอดภัย',
      categoryEn: 'Trust',
      icon: ShieldCheck,
      page: 'trust-center',
      descriptionTh: 'อธิบายสูตรคำนวณ ความน่าเชื่อถือของ AI Privacy & Security',
      descriptionEn: 'Calculation transparency, AI confidence, and data privacy'
    },
    {
      id: 'page_settings',
      titleTh: 'ตั้งค่าระบบ & โหมดข้อมูล (Settings)',
      titleEn: 'Settings & Preferences',
      categoryTh: 'การตั้งค่า',
      categoryEn: 'Settings',
      icon: Settings,
      page: 'settings',
      descriptionTh: 'ปรับโหมดกลางคืน เปลี่ยนภาษา ตั้งค่าการแจ้งเตือน',
      descriptionEn: 'Configure dark mode, language preference, and alerts'
    }
  ];

  const filteredResults = searchableIndex.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      item.titleTh.toLowerCase().includes(query) ||
      item.titleEn.toLowerCase().includes(query) ||
      item.categoryTh.toLowerCase().includes(query) ||
      item.descriptionTh.toLowerCase().includes(query) ||
      item.descriptionEn.toLowerCase().includes(query)
    );
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className={`w-full max-w-2xl rounded-[2.2rem] border shadow-2xl overflow-hidden flex flex-col ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-white shadow-emerald-950/30' 
              : 'bg-white border-emerald-100 text-slate-900 shadow-emerald-500/10'
          }`}
        >
          {/* Top Search Input Bar */}
          <div className="p-4 md:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-emerald-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'th' ? 'ค้นหาบทเรียน เครื่องใช้ไฟฟ้า หน้าคำนวณ หรือ AI (กด Esc เพื่อปิด)...' : 'Search pages, appliances, lessons, or AI...'}
              autoFocus
              className="flex-1 bg-transparent text-sm md:text-base font-bold outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.68rem] font-mono text-slate-500 font-bold">
              <Command className="w-3 h-3" /> K
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2 divide-y divide-slate-100 dark:divide-slate-800/60 scrollbar-none">
            {filteredResults.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-sm font-bold text-slate-500">
                  {lang === 'th' ? 'ไม่พบผลลัพธ์ที่ตรงกับการค้นหา' : 'No results found'}
                </p>
                <p className="text-xs text-slate-400">
                  {lang === 'th' ? 'ลองค้นหาด้วยคำอื่น เช่น "ค่าไฟ", "แอร์", "บิล", "AI"' : 'Try searching for "bill", "AC", "analytics", "AI"'}
                </p>
              </div>
            ) : (
              filteredResults.map(item => {
                const IconComponent = typeof item.icon === 'string' ? Zap : item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onNavigatePage(item.page);
                      onClose();
                    }}
                    className={`p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between group ${
                      isDarkMode 
                        ? 'hover:bg-slate-800/80' 
                        : 'hover:bg-emerald-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                            {lang === 'th' ? item.titleTh : item.titleEn}
                          </span>
                          <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                            {lang === 'th' ? item.categoryTh : item.categoryEn}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {lang === 'th' ? item.descriptionTh : item.descriptionEn}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                );
              })
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3 px-5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>
              {lang === 'th' ? 'ค้นพบเร็ว 10 หน้าวิเคราะห์ & AI' : 'Quick search across 10 modules'}
            </span>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors cursor-pointer"
            >
              {lang === 'th' ? 'ปิด (Esc)' : 'Close (Esc)'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
