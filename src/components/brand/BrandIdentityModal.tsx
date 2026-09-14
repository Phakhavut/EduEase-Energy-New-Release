import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Check, 
  Copy, 
  Download, 
  Palette, 
  Layers, 
  Eye, 
  Grid, 
  BookOpen, 
  Zap, 
  Leaf, 
  ShieldCheck,
  Maximize2,
  Smartphone,
  Image as ImageIcon,
  Filter,
  Search
} from 'lucide-react';
import { EduEaseLogo, LogoVariant } from './EduEaseLogo';
import { UnifiedButton, UnifiedCard, PageHeader, SegmentedTabs, StatusBadge } from '../../design-system';
import { 
  EduEaseIllustration, 
  ILLUSTRATIONS_LIST, 
  ILLUSTRATION_CATEGORIES, 
  IllustrationCategory, 
  IllustrationName 
} from '../illustrations';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const BrandIdentityModal: React.FC<BrandIdentityModalProps> = ({
  isOpen,
  onClose,
  lang,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lockups' | 'icons' | 'scalability' | 'colors' | 'typography' | 'illustrations'>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [bgPreview, setBgPreview] = useState<'light' | 'dark' | 'green' | 'black'>('light');
  const [selectedIllustrationCategory, setSelectedIllustrationCategory] = useState<string>('all');
  const [illustrationSearch, setIllustrationSearch] = useState<string>('');
  const [previewSize, setPreviewSize] = useState<number>(64);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Official 5 Color Tokens strictly from the brand sheet
  const colorPalette = [
    {
      name: 'Primary Green',
      role: 'Core Brand & Sustainability Accent',
      hex: '#22C55E',
      rgb: 'rgb(34, 197, 94)',
      hsl: 'hsl(142, 71%, 45%)',
      contrast: 'WCAG AAA (10.2:1)',
      bgClass: 'bg-[#22C55E]',
      descTh: 'สีเขียวสดใส สื่อถึงพลังงานสะอาด ความสดชื่น และความยั่งยืน',
    },
    {
      name: 'Secondary Yellow',
      role: 'Solar Energy & Electric Spark Core',
      hex: '#FBBF24',
      rgb: 'rgb(251, 191, 36)',
      hsl: 'hsl(43, 96%, 56%)',
      contrast: 'WCAG AA Accent',
      bgClass: 'bg-[#FBBF24]',
      descTh: 'สีเหลืองทองพลังงาน สื่อถึงสายฟ้า ความสว่าง และโซลาร์เซลล์',
    },
    {
      name: 'Supporting Blue',
      role: 'Smart Tech & Precise Intelligence',
      hex: '#60A5FA',
      rgb: 'rgb(96, 165, 250)',
      hsl: 'hsl(213, 94%, 68%)',
      contrast: 'WCAG AA',
      bgClass: 'bg-[#60A5FA]',
      descTh: 'สีฟ้าเทคโนโลยี สื่อถึงความแม่นยำ สถิติ และการวิเคราะห์',
    },
    {
      name: 'Charcoal',
      role: 'Primary Neutral & Heavy Typography',
      hex: '#1F2937',
      rgb: 'rgb(31, 41, 55)',
      hsl: 'hsl(215, 28%, 17%)',
      contrast: 'WCAG AAA (16.8:1)',
      bgClass: 'bg-[#1F2937]',
      descTh: 'สีเทาเข้มชาร์โคล หนักแน่น อ่านง่าย ชัดเจนทุกพื้นผิว',
    },
    {
      name: 'Off White',
      role: 'Canvas Background & Clean Surface',
      hex: '#F8FAFC',
      rgb: 'rgb(248, 250, 252)',
      hsl: 'hsl(210, 40%, 98%)',
      contrast: 'Eye-Safe Warm Light',
      bgClass: 'bg-[#F8FAFC]',
      descTh: 'สีขาวนวล สบายตา ช่วยให้ใช้งานได้ต่อเนื่องโดยไม่ล้าแสง',
    },
  ];

  const getBackgroundStyle = () => {
    switch (bgPreview) {
      case 'dark':
        return 'bg-[#1F2937] text-white border-slate-700';
      case 'green':
        return 'bg-[#22C55E] text-white border-[#16A34A]';
      case 'black':
        return 'bg-[#000000] text-white border-white/20';
      default:
        return 'bg-[#F8FAFC] text-[#1F2937] border-slate-200';
    }
  };

  // Official Vector SVG Output String
  const officialSvgString = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftWing" x1="30%" y1="10%" x2="50%" y2="90%">
      <stop offset="0%" stop-color="#4ADE80" />
      <stop offset="55%" stop-color="#22C55E" />
      <stop offset="100%" stop-color="#0D9488" />
    </linearGradient>
    <linearGradient id="rightWing" x1="85%" y1="20%" x2="35%" y2="85%">
      <stop offset="0%" stop-color="#22C55E" />
      <stop offset="60%" stop-color="#16A34A" />
      <stop offset="100%" stop-color="#0F766E" />
    </linearGradient>
    <linearGradient id="spark" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="60%" stop-color="#FBBF24" />
      <stop offset="100%" stop-color="#F59E0B" />
    </linearGradient>
  </defs>
  <!-- Left Wing -->
  <path d="M38.5 86.5 C34 81 19 66 18 42 C17.5 29 23 24.5 31 25 C35.5 25.3 37.5 27 38.5 29.5 C38.5 40 33.5 58 38.5 86.5 Z" fill="url(#leftWing)"/>
  <!-- Center Lightning Spark -->
  <path d="M45 10 L59 28.5 H48.5 L55.5 35 L40.5 59 L44.5 36.5 H39 L45 10 Z" fill="url(#spark)" stroke="#FFFFFF" stroke-width="0.8" stroke-linejoin="round"/>
  <!-- Right Wing with Cutout Aperture -->
  <path fill-rule="evenodd" clip-rule="evenodd" d="M38.5 86.5 C52 82.5 73.5 72 82.5 54 C87 45 87 34 83 28.5 C78.5 22.5 69 26 59.5 37.5 C51.5 47.5 45.5 63 38.5 86.5 Z M53.5 59.5 C59.5 50.5 67 43.5 74.5 46.5 C77.5 47.8 77.5 53.5 74 58 C68.5 65 59.5 65.5 53.5 59.5 Z" fill="url(#rightWing)"/>
</svg>`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className={`w-full max-w-5xl max-h-[92vh] flex flex-col rounded-[24px] border shadow-2xl overflow-hidden ${
            isDarkMode 
              ? 'bg-[#151C23] border-white/10 text-[#F8FAFC]' 
              : 'bg-[#FFFFFF] border-slate-200 text-[#1F2937]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <EduEaseLogo variant="favicon" size={38} isDarkMode={isDarkMode} />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg md:text-xl font-bold font-display">
                    {lang === 'th' ? 'คู่มืออัตลักษณ์แบรนด์ (EduEase Energy CI)' : 'EduEase Energy Official Brand Identity'}
                  </h2>
                  <StatusBadge variant="brand" size="sm">
                    Official Guide
                  </StatusBadge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th' ? 'ระบบโลโก้เวกเตอร์ SVG, พาเลทสีทางการ และข้อกำหนดการแสดงผล' : 'Vector logo system, color tokens, and multi-format brand specifications.'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-[10px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="px-6 pt-3 border-b border-slate-200 dark:border-white/10 shrink-0">
            <SegmentedTabs
              tabs={[
                { id: 'overview', labelTh: '1. ภาพรวม & สัญลักษณ์', labelEn: '1. Primary Overview', icon: Sparkles },
                { id: 'lockups', labelTh: '2. รูปแบบการจัดวาง (Lockups)', labelEn: '2. Logo Lockups', icon: Layers },
                { id: 'icons', labelTh: '3. App Icon & Favicon', labelEn: '3. App Icon & Favicon', icon: Smartphone },
                { id: 'scalability', labelTh: '4. ขนาด (16px - 48px)', labelEn: '4. Small Sizes', icon: Grid },
                { id: 'colors', labelTh: '5. ชุดสีหลัก 5 สี', labelEn: '5. Color Palette', icon: Palette },
                { id: 'typography', labelTh: '6. โครงสร้างตัวพิมพ์', labelEn: '6. Typography', icon: BookOpen },
                { id: 'illustrations', labelTh: '7. ระบบภาพประกอบ (Illustrations)', labelEn: '7. Illustration System', icon: ImageIcon },
              ]}
              activeTab={activeTab}
              onChange={(tab) => setActiveTab(tab as any)}
              lang={lang}
              isDarkMode={isDarkMode}
              size="md"
            />
          </div>

          {/* Body Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* ---------------- TAB 1: OVERVIEW ---------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Primary Hero Showcase */}
                <UnifiedCard isDarkMode={isDarkMode} variant="elevated" className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Big Symbol with Background Previewer */}
                    <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                      <div className={`p-8 rounded-[24px] border shadow-inner flex items-center justify-center transition-colors min-w-[220px] min-h-[220px] ${getBackgroundStyle()}`}>
                        <EduEaseLogo 
                          variant="symbol" 
                          size={110} 
                          isDarkMode={bgPreview === 'dark' || bgPreview === 'black'} 
                        />
                      </div>
                      
                      {/* Background tester pills */}
                      <div className="flex items-center gap-1 p-1 rounded-[10px] bg-slate-100 dark:bg-slate-800 text-xs">
                        <span className="text-[10px] text-slate-400 font-bold px-1.5">BG:</span>
                        <button 
                          onClick={() => setBgPreview('light')} 
                          className={`px-2 py-1 rounded-[6px] font-bold text-[11px] cursor-pointer ${bgPreview === 'light' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
                        >
                          Off White
                        </button>
                        <button 
                          onClick={() => setBgPreview('dark')} 
                          className={`px-2 py-1 rounded-[6px] font-bold text-[11px] cursor-pointer ${bgPreview === 'dark' ? 'bg-[#1F2937] text-white shadow' : 'text-slate-500'}`}
                        >
                          Charcoal
                        </button>
                        <button 
                          onClick={() => setBgPreview('green')} 
                          className={`px-2 py-1 rounded-[6px] font-bold text-[11px] cursor-pointer ${bgPreview === 'green' ? 'bg-[#22C55E] text-white shadow' : 'text-slate-500'}`}
                        >
                          Green
                        </button>
                        <button 
                          onClick={() => setBgPreview('black')} 
                          className={`px-2 py-1 rounded-[6px] font-bold text-[11px] cursor-pointer ${bgPreview === 'black' ? 'bg-black text-white shadow' : 'text-slate-500'}`}
                        >
                          Black
                        </button>
                      </div>
                    </div>

                    {/* Visual Rationale & Composition */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#22C55E]">
                          Official Brand Symbol Structure
                        </span>
                        <h3 className="text-2xl font-black font-display text-[#1F2937] dark:text-[#F8FAFC] mt-0.5">
                          The Open Book, Energy Spark & Eco Leaf
                        </h3>
                        <p className="text-sm font-semibold text-[#22C55E] mt-0.5">
                          {lang === 'th' ? 'ผสานความรู้ด้านพลังงาน (Edu) + ความง่ายสบาย (Ease) + สายฟ้าพลังงานสะอาด (Energy)' : 'Synthesizing Education, Frictionless Ease, and Clean Energy.'}
                        </p>
                      </div>

                      <div className="space-y-2.5 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <div className="flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />
                          <span><strong>ปีกซ้าย (Left Wing):</strong> รูปทรงหน้าหนังสือเปิดและใบไม้อ่อน สื่อถึงองค์ความรู้พื้นฐานและการเริ่มต้นเรียนรู้</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#FBBF24] mt-1.5 shrink-0" />
                          <span><strong>ประกายสายฟ้า (Center Spark):</strong> สัญลักษณ์สายฟ้าสีทอง สื่อถึงพลังงานไฟฟ้า แสงอาทิตย์ และความเข้าใจที่กระจ่างชัด</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#0D9488] mt-1.5 shrink-0" />
                          <span><strong>ปีกขวาเจาะช่อง (Right Leaf with Aperture):</strong> ใบไม้พร้อมช่องเปิด สื่อถึงความโปร่งใส ความยั่งยืน และความสบายตา</span>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center gap-3 pt-2">
                        <UnifiedButton
                          variant="primary"
                          size="sm"
                          icon={copiedCode === 'svg' ? Check : Copy}
                          onClick={() => copyToClipboard(officialSvgString, 'svg')}
                        >
                          {copiedCode === 'svg' ? 'คัดลอก SVG แล้ว!' : 'Copy Vector SVG'}
                        </UnifiedButton>
                        <UnifiedButton
                          variant="secondary"
                          size="sm"
                          isDarkMode={isDarkMode}
                          icon={Download}
                          onClick={() => {
                            const blob = new Blob([officialSvgString], { type: 'image/svg+xml' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `eduease_energy_logo_official.svg`;
                            a.click();
                          }}
                        >
                          Download .SVG
                        </UnifiedButton>
                      </div>
                    </div>
                  </div>
                </UnifiedCard>

                {/* Primary Logo (Horizontal) Showcase */}
                <UnifiedCard isDarkMode={isDarkMode} className="p-6">
                  <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider block mb-3">
                    Primary Logo (Horizontal)
                  </span>
                  <div className="p-8 rounded-[16px] bg-[#F8FAFC] dark:bg-[#1B242D] border border-slate-200 dark:border-white/10 flex items-center justify-center min-h-[140px]">
                    <EduEaseLogo variant="primary" size={56} isDarkMode={isDarkMode} />
                  </div>
                </UnifiedCard>
              </div>
            )}

            {/* ---------------- TAB 2: LOCKUPS ---------------- */}
            {activeTab === 'lockups' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 1. Primary Logo (Horizontal) */}
                  <UnifiedCard isDarkMode={isDarkMode} className="p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">1. Primary Logo (Horizontal)</span>
                        <span className="text-[10px] text-slate-400 font-mono">Standard Lockup</span>
                      </div>
                      <div className="p-6 rounded-[14px] bg-[#F8FAFC] dark:bg-[#1B242D] border border-slate-200 dark:border-white/10 flex items-center justify-center min-h-[130px]">
                        <EduEaseLogo variant="primary" size="lg" isDarkMode={isDarkMode} />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                      โลโก้มาตรฐานสำหรับหัวเว็บไซต์ เอกสารทางการ และหน้า Dashboard
                    </p>
                  </UnifiedCard>

                  {/* 2. Stacked Logo */}
                  <UnifiedCard isDarkMode={isDarkMode} className="p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">2. Stacked Logo</span>
                        <span className="text-[10px] text-slate-400 font-mono">Hero / Poster</span>
                      </div>
                      <div className="p-6 rounded-[14px] bg-[#F8FAFC] dark:bg-[#1B242D] border border-slate-200 dark:border-white/10 flex items-center justify-center min-h-[130px]">
                        <EduEaseLogo variant="stacked" size="md" isDarkMode={isDarkMode} />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                      จัดวางตรงกลาง เหมาะสำหรับหน้าเปิด Splash Screen และโปสเตอร์
                    </p>
                  </UnifiedCard>

                  {/* 3. Symbol Only */}
                  <UnifiedCard isDarkMode={isDarkMode} className="p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">3. Symbol Only</span>
                        <span className="text-[10px] text-slate-400 font-mono">Standalone Icon</span>
                      </div>
                      <div className="p-6 rounded-[14px] bg-[#F8FAFC] dark:bg-[#1B242D] border border-slate-200 dark:border-white/10 flex items-center justify-center min-h-[130px]">
                        <EduEaseLogo variant="symbol" size={54} isDarkMode={isDarkMode} />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                      สัญลักษณ์เดี่ยว สำหรับปุ่มนำทาง สติ๊กเกอร์ และ Watermark
                    </p>
                  </UnifiedCard>

                  {/* 4. Horizontal Compact */}
                  <UnifiedCard isDarkMode={isDarkMode} className="p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">4. Horizontal Navbar</span>
                        <span className="text-[10px] text-slate-400 font-mono">Compact 36px</span>
                      </div>
                      <div className="p-6 rounded-[14px] bg-[#F8FAFC] dark:bg-[#1B242D] border border-slate-200 dark:border-white/10 flex items-center justify-center min-h-[130px]">
                        <EduEaseLogo variant="horizontal" size="md" isDarkMode={isDarkMode} />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                      ความสูงกะทัดรัด สำหรับแถบ Navigation Bar บนเดสก์ท็อปและมือถือ
                    </p>
                  </UnifiedCard>
                </div>

                {/* Monochrome Variations */}
                <UnifiedCard isDarkMode={isDarkMode} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
                      Monochrome Lockups (100% Solid Ink)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Print & High Contrast</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Monochrome Black */}
                    <div className="p-6 rounded-[14px] bg-white border border-slate-200 flex flex-col items-center justify-center gap-2">
                      <EduEaseLogo variant="monochrome-black" size="lg" />
                      <span className="text-[11px] font-bold text-slate-900 mt-2">Monochrome (Black)</span>
                    </div>

                    {/* Monochrome White */}
                    <div className="p-6 rounded-[14px] bg-[#1F2937] border border-slate-700 flex flex-col items-center justify-center gap-2">
                      <EduEaseLogo variant="monochrome-white" size="lg" />
                      <span className="text-[11px] font-bold text-white mt-2">Monochrome (White)</span>
                    </div>
                  </div>
                </UnifiedCard>
              </div>
            )}

            {/* ---------------- TAB 3: APP ICON & FAVICON ---------------- */}
            {activeTab === 'icons' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* App Icon */}
                  <UnifiedCard isDarkMode={isDarkMode} className="p-6 flex flex-col items-center text-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider block mb-4">
                        App Icon (iOS / Android / PWA)
                      </span>
                      <div className="p-8 flex items-center justify-center">
                        <EduEaseLogo variant="app-icon" size={100} />
                      </div>
                    </div>
                    <div className="w-full text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-white/5">
                      พื้นหลังสีเขียว <code>#22C55E</code> ทรง Squircle โค้งมน พร้อมสัญลักษณ์สีขาวทึบ 100%
                    </div>
                  </UnifiedCard>

                  {/* Favicon */}
                  <UnifiedCard isDarkMode={isDarkMode} className="p-6 flex flex-col items-center text-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider block mb-4">
                        Favicon (Browser Tabs & Bookmarks)
                      </span>
                      <div className="p-8 flex items-center justify-center">
                        <EduEaseLogo variant="favicon" size={100} isDarkMode={isDarkMode} />
                      </div>
                    </div>
                    <div className="w-full text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-white/5">
                      พื้นหลังสีขาวนวล <code>#F8FAFC</code> พร้อมสัญลักษณ์แบบเต็มสีและเส้นขอบบางประณีต
                    </div>
                  </UnifiedCard>
                </div>

                {/* Background Usage Row */}
                <UnifiedCard isDarkMode={isDarkMode} className="p-6">
                  <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider block mb-4">
                    Background Usage Variations
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-slate-200 flex items-center justify-center min-h-[90px]">
                      <EduEaseLogo variant="symbol" size={42} />
                    </div>
                    <div className="p-4 rounded-[14px] bg-[#1F2937] border border-slate-700 flex items-center justify-center min-h-[90px]">
                      <EduEaseLogo variant="symbol" size={42} isDarkMode />
                    </div>
                    <div className="p-4 rounded-[14px] bg-[#22C55E] border border-[#16A34A] flex items-center justify-center min-h-[90px]">
                      <EduEaseLogo variant="symbol" size={42} forcedColor="#FFFFFF" />
                    </div>
                    <div className="p-4 rounded-[14px] bg-black border border-white/20 flex items-center justify-center min-h-[90px]">
                      <EduEaseLogo variant="monochrome-white" size={42} />
                    </div>
                  </div>
                </UnifiedCard>
              </div>
            )}

            {/* ---------------- TAB 4: SCALABILITY (16px - 48px) ---------------- */}
            {activeTab === 'scalability' && (
              <div className="space-y-6">
                <UnifiedCard isDarkMode={isDarkMode} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-base font-display">
                        Small Size Previews (16px, 24px, 32px, 48px)
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        ทดสอบความคมชัดและรายละเอียดของสัญลักษณ์ในขนาดเล็กพิเศษ
                      </p>
                    </div>
                  </div>

                  <div className="p-8 rounded-[16px] bg-[#F8FAFC] dark:bg-[#1B242D] border border-slate-200 dark:border-white/10 flex flex-wrap items-end justify-around gap-6">
                    {/* 16px */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-[8px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                        <EduEaseLogo variant="symbol" size={16} isDarkMode={isDarkMode} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">16px</span>
                    </div>

                    {/* 24px */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2.5 rounded-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                        <EduEaseLogo variant="symbol" size={24} isDarkMode={isDarkMode} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">24px</span>
                    </div>

                    {/* 32px */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                        <EduEaseLogo variant="symbol" size={32} isDarkMode={isDarkMode} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">32px</span>
                    </div>

                    {/* 48px */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3.5 rounded-[14px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                        <EduEaseLogo variant="symbol" size={48} isDarkMode={isDarkMode} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">48px</span>
                    </div>
                  </div>
                </UnifiedCard>
              </div>
            )}

            {/* ---------------- TAB 5: COLOR PALETTE ---------------- */}
            {activeTab === 'colors' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {colorPalette.map((col, idx) => (
                    <UnifiedCard key={idx} isDarkMode={isDarkMode} className="p-5 flex flex-col justify-between">
                      <div>
                        {/* Swatch */}
                        <div className={`h-24 rounded-[12px] mb-3 shadow-inner border border-black/5 flex items-end p-3 ${col.bgClass}`}>
                          <span className={`${col.name === 'Off White' ? 'text-slate-800' : 'text-white'} font-mono font-bold text-xs drop-shadow-sm`}>
                            {col.hex}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1F2937] dark:text-[#F8FAFC] font-display">
                          {col.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 mb-1.5">
                          {col.role}
                        </p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300">
                          {col.descTh}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-200 dark:border-white/5 space-y-1.5 text-xs font-mono">
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                          <span>RGB:</span>
                          <span>{col.rgb}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                          <span>HSL:</span>
                          <span>{col.hsl}</span>
                        </div>

                        <button
                          onClick={() => copyToClipboard(col.hex, col.hex)}
                          className="w-full mt-2 py-1.5 rounded-[8px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedCode === col.hex ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode === col.hex ? 'คัดลอกรหัสสีแล้ว!' : 'Copy Hex Code'}</span>
                        </button>
                      </div>
                    </UnifiedCard>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- TAB 6: TYPOGRAPHY ---------------- */}
            {activeTab === 'typography' && (
              <div className="space-y-6">
                <UnifiedCard isDarkMode={isDarkMode} className="p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-[#1F2937] dark:text-[#F8FAFC]">
                      Typography & Wordmark Structure
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      โครงสร้างชื่อแบรนด์ 2 บรรทัดตามแบบแผนอัตลักษณ์ทางการ
                    </p>
                  </div>

                  {/* Wordmark Visualization */}
                  <div className="p-8 rounded-[16px] bg-[#F8FAFC] dark:bg-[#1B242D] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl md:text-5xl font-black font-display tracking-tight">
                        <span className="text-[#1F2937] dark:text-[#F8FAFC]">Edu</span>
                        <span className="text-[#22C55E]">Ease</span>
                      </div>
                      <span className="text-lg md:text-xl font-medium tracking-[0.22em] text-[#1F2937] dark:text-[#94A3B8] uppercase mt-1">
                        Energy
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg text-left text-xs mt-3">
                      <div className="p-3 rounded-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-[#1F2937] dark:text-[#F8FAFC] block">"Edu" (Charcoal #1F2937)</span>
                        <span className="text-slate-500 text-[11px]">การเรียนรู้ ความเข้าใจเรื่องไฟที่ถูกต้อง</span>
                      </div>
                      <div className="p-3 rounded-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-[#22C55E] block">"Ease" (Primary Green #22C55E)</span>
                        <span className="text-slate-500 text-[11px]">ความง่าย ใช้งานสะดวก ประหยัดทันที</span>
                      </div>
                    </div>
                  </div>
                </UnifiedCard>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-[#1B242D]">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>EduEase Energy CI Specification • 100% Vector Geometry</span>
            </div>
            <UnifiedButton
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close Guide'}
            </UnifiedButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
