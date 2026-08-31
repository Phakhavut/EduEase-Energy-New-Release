import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Search, 
  Globe, 
  ShieldCheck, 
  Building2, 
  ShoppingBag, 
  Zap, 
  Calculator, 
  CheckCircle2, 
  Sparkles, 
  Award,
  Filter,
  Layers,
  Leaf,
  Scale
} from 'lucide-react';
import { 
  OFFICIAL_ENERGY_REFERENCES, 
  OfficialReferenceSource, 
  getReferencesByCategory 
} from '../../data/officialReferencesData';

interface OfficialReferencesDirectoryProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const OfficialReferencesDirectory: React.FC<OfficialReferencesDirectoryProps> = ({
  lang,
  isDarkMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<OfficialReferenceSource['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: OfficialReferenceSource['category'] | 'all'; labelTh: string; labelEn: string; icon: any; count: number }[] = [
    { 
      id: 'all', 
      labelTh: 'แหล่งอ้างอิงทั้งหมด', 
      labelEn: 'All References', 
      icon: Layers,
      count: OFFICIAL_ENERGY_REFERENCES.length 
    },
    { 
      id: 'international_standards', 
      labelTh: 'มาตรฐานสากล (EU/US/AU)', 
      labelEn: 'Global Standards', 
      icon: Globe,
      count: OFFICIAL_ENERGY_REFERENCES.filter(r => r.category === 'international_standards').length 
    },
    { 
      id: 'national_authorities', 
      labelTh: 'หน่วยงานภาครัฐ & กกพ.', 
      labelEn: 'Thai Regulators', 
      icon: Building2,
      count: OFFICIAL_ENERGY_REFERENCES.filter(r => r.category === 'national_authorities').length 
    },
    { 
      id: 'manufacturer_specs', 
      labelTh: 'ผู้ผลิตอย่างเป็นทางการ', 
      labelEn: 'Manufacturers', 
      icon: ShieldCheck,
      count: OFFICIAL_ENERGY_REFERENCES.filter(r => r.category === 'manufacturer_specs').length 
    },
    { 
      id: 'retail_catalogs', 
      labelTh: 'ห้างค้าปลีก & สเปกสินค้า', 
      labelEn: 'Retail Catalogs', 
      icon: ShoppingBag,
      count: OFFICIAL_ENERGY_REFERENCES.filter(r => r.category === 'retail_catalogs').length 
    },
    { 
      id: 'scientific_calculators', 
      labelTh: 'เครื่องคำนวณ & ฟิสิกส์', 
      labelEn: 'Physics Engines', 
      icon: Calculator,
      count: OFFICIAL_ENERGY_REFERENCES.filter(r => r.category === 'scientific_calculators').length 
    }
  ];

  const filteredReferences = useMemo(() => {
    return OFFICIAL_ENERGY_REFERENCES.filter(item => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.titleTh.toLowerCase().includes(q) || item.titleEn.toLowerCase().includes(q);
        const matchOrg = item.organizationTh.toLowerCase().includes(q) || item.organizationEn.toLowerCase().includes(q);
        const matchDesc = item.descriptionTh.toLowerCase().includes(q) || item.descriptionEn.toLowerCase().includes(q);
        const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
        const matchUrl = item.url.toLowerCase().includes(q);
        return matchTitle || matchOrg || matchDesc || matchTags || matchUrl;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-sm transition-all space-y-6 ${
      isDarkMode ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? 'แหล่งข้อมูลอ้างอิงทางการ 100%' : '100% Verified Citations & Standards'}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black font-display text-slate-900 dark:text-white">
            {lang === 'th' ? 'สารบัญแหล่งอ้างอิง & มาตรฐานพลังงานทางการ' : 'Official Energy Standards & Citations Directory'}
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            {lang === 'th'
              ? 'ระบบการคำนวณ สเปกเครื่องใช้ไฟฟ้า และสูตรบิลทั้งหมดใน EduEase Energy ยึดตามฐานข้อมูลทางการและองค์กรมาตรฐานสากล'
              : 'All calculations, appliance wattage ratings, and tariff models in EduEase Energy are grounded in verified official registries.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'th' ? 'ค้นหาแหล่งอ้างอิง, แบรนด์, กฎหมาย...' : 'Search references, brands, laws...'}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${
              isDarkMode 
                ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500' 
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : isDarkMode
                  ? 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                  : 'bg-slate-100/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200/60'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? cat.labelTh : cat.labelEn}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                isSelected 
                  ? 'bg-emerald-600/50 text-white' 
                  : isDarkMode 
                  ? 'bg-slate-700 text-slate-300' 
                  : 'bg-slate-200 text-slate-700'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reference Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredReferences.map((ref, idx) => (
            <motion.div
              key={ref.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`p-5 rounded-3xl border flex flex-col justify-between transition-all hover:shadow-md group ${
                isDarkMode 
                  ? 'bg-slate-800/60 hover:bg-slate-800/90 border-slate-700/80 hover:border-emerald-500/40' 
                  : 'bg-slate-50/70 hover:bg-white border-slate-200/80 hover:border-emerald-300'
              }`}
            >
              <div className="space-y-3">
                {/* Top Badge & Region */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>{lang === 'th' ? ref.verificationBadgeTh : ref.verificationBadgeEn}</span>
                  </span>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400">
                    {ref.country} • {ref.updatedYear}
                  </span>
                </div>

                {/* Title & Organization */}
                <div>
                  <h4 className="font-extrabold text-sm md:text-base font-display text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {lang === 'th' ? ref.titleTh : ref.titleEn}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                    {lang === 'th' ? ref.organizationTh : ref.organizationEn}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'th' ? ref.descriptionTh : ref.descriptionEn}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ref.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-slate-200/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-300/40 dark:border-slate-600/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Open Official Source */}
              <div className="pt-4 mt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-400 truncate max-w-[170px]">
                  {ref.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </span>

                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>{lang === 'th' ? 'เปิดดูแหล่งอ้างอิง' : 'Visit Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredReferences.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 w-fit mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            {lang === 'th' ? `ไม่พบแหล่งอ้างอิงที่ตรงกับ "${searchQuery}"` : `No references found matching "${searchQuery}"`}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-all cursor-pointer"
          >
            {lang === 'th' ? 'ล้างการค้นหา' : 'Clear Filters'}
          </button>
        </div>
      )}

      {/* Grounding & Verification Methodology Footer Banner */}
      <div className={`p-5 rounded-3xl border grid grid-cols-1 md:grid-cols-3 gap-4 text-xs ${
        isDarkMode ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="space-y-1">
          <div className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{lang === 'th' ? '1. มาตรฐาน กฟผ. เบอร์ 5' : '1. EGAT Label No. 5'}</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            {lang === 'th' ? 'กำลังวัตต์ ค่า SEER และค่าไฟรายปีผ่านการทดสอบมาตรฐานห้องปฏิบัติการ กฟผ.' : 'Appliance ratings tested under standard laboratory conditions.'}
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-teal-500" />
            <span>{lang === 'th' ? '2. โครงสร้างบิล กกพ. / PEA / MEA' : '2. Official Tariffs'}</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            {lang === 'th' ? 'สูตรคำนวณขั้นบันได ค่า Ft งวดปัจจุบัน และภาษีมูลค่าเพิ่มตรงตามใบแจ้งหนี้ 100%' : 'Progressive tier tariffs and quarterly Ft rates strictly match utility statements.'}
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>{lang === 'th' ? '3. มาตรฐานสากล EPREL & Energy Star' : '3. Global Energy Registries'}</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            {lang === 'th' ? 'เทียบเคียงเกณฑ์ประสิทธิภาพพลังงานระดับสากล EU Ecodesign และ US EPA' : 'Benchmarked against EU Ecodesign and US EPA Energy Star registries.'}
          </p>
        </div>
      </div>
    </div>
  );
};
