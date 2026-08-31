import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  Search, 
  RotateCcw, 
  Info, 
  ChevronLeft, 
  ChevronRight,
  Snowflake,
  Refrigerator,
  Tv,
  Flame,
  Lightbulb,
  Fan
} from 'lucide-react';
import { OFFICIAL_APPLIANCE_DATABASE, OfficialApplianceSpec } from '../../data/officialApplianceDatabase';

interface OfficialDatabaseAutoFillerProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onSelectSpec: (spec: OfficialApplianceSpec) => void;
  onSwitchToManual?: () => void;
}

export const OfficialDatabaseAutoFiller: React.FC<OfficialDatabaseAutoFillerProps> = ({
  lang,
  isDarkMode,
  onSelectSpec,
  onSwitchToManual
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpecId, setSelectedSpecId] = useState<string | null>(null);
  const chipsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (chipsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = chipsScrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    setTimeout(checkScroll, 100);
  }, [selectedCategory]);

  useEffect(() => {
    const el = chipsScrollRef.current;
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
  }, []);

  const handleScrollChips = (direction: 'left' | 'right') => {
    if (chipsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      chipsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Categories list for chips
  const categoryFilters = [
    { id: 'all', labelTh: 'ทั้งหมด', labelEn: 'All Types', icon: Zap },
    { id: 'aircon', labelTh: '❄️ แอร์ (Air Conditioners)', labelEn: 'Air Conditioners', icon: Snowflake },
    { id: 'refrigerator', labelTh: '🧊 ตู้เย็น (Refrigerators)', labelEn: 'Refrigerators', icon: Refrigerator },
    { id: 'washing_machine', labelTh: '🧺 เครื่องซักผ้า (Washers)', labelEn: 'Washing Machines', icon: Zap },
    { id: 'fan', labelTh: '🌀 พัดลม (Fans)', labelEn: 'Electric Fans', icon: Fan },
    { id: 'water_heater', labelTh: '🚿 เครื่องทำน้ำอุ่น (Heaters)', labelEn: 'Water Heaters', icon: Flame },
    { id: 'tv', labelTh: '📺 ทีวี (Smart TV)', labelEn: 'Smart TVs', icon: Tv },
    { id: 'kitchen', labelTh: '🍳 ครัว & ไมโครเวฟ', labelEn: 'Kitchen Appliances', icon: Flame },
    { id: 'lighting', labelTh: '💡 หลอดไฟ LED', labelEn: 'LED Lights', icon: Lightbulb },
    { id: 'small_appliance', labelTh: '⚙️ อุปกรณ์อื่น / ม่านอากาศ', labelEn: 'Other Appliances', icon: Fan }
  ];

  // Distinct Brands with count
  const brandStats = useMemo(() => {
    const brandCounts: Record<string, number> = {};
    OFFICIAL_APPLIANCE_DATABASE.forEach(item => {
      const brandKey = item.brand.includes('Daikin') ? 'Daikin' : item.brand;
      brandCounts[brandKey] = (brandCounts[brandKey] || 0) + 1;
    });
    return Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1]);
  }, []);

  // Filtered List
  const filteredSpecs = useMemo(() => {
    return OFFICIAL_APPLIANCE_DATABASE.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all') {
        if (selectedBrand === 'Daikin') {
          if (!item.brand.toLowerCase().includes('daikin')) return false;
        } else if (item.brand !== selectedBrand) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = 
          item.categoryTh.toLowerCase().includes(q) ||
          item.categoryEn.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.modelSeries.toLowerCase().includes(q) ||
          item.sizeCapacity.toLowerCase().includes(q) ||
          item.technology.toLowerCase().includes(q) ||
          item.efficiencyRatingTh.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedBrand, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Official EGAT & Verified Database Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs md:text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>{lang === 'th' ? 'ฐานข้อมูลทางการ กฟผ. ฉลากเบอร์ 5 & ผู้ผลิต 100% ถูกต้องแม่นยำ' : '100% Verified EGAT & Official Brand Energy Database'}</span>
          </div>
          <span className="text-[0.68rem] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
            {lang === 'th' ? 'ข้อมูลจริง 100%' : '100% Official'}
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {lang === 'th'
            ? 'เลือกชนิด ขนาด และแบรนด์ของเครื่องใช้ไฟฟ้าของคุณ ระบบจะดึงข้อมูลกำลังไฟฟ้า (W), ค่าประหยัดไฟเบอร์ 5 ดาว, SEER, และค่าไฟเฉลี่ยตามเกณฑ์ กฟผ. และแบรนด์ทางการให้อัตโนมัติทันที หรือเลือกกรอกเองได้'
            : 'Select appliance type, size, and brand to auto-fill official rated Watts, EGAT Label 5 stars, SEER, and standard consumption. You can also customize manually.'}
        </p>
      </div>

      {/* Filter Controls */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'th' ? 'ค้นหาเร็ว (เช่น "12000 BTU", "Inverter", "ตู้เย็น 9 คิว", "เครื่องซักผ้า 10kg", "Mr.Slim", "Hatari")...' : 'Search model, size, brand, or BTU...'}
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500' 
                : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Chips with Left & Right Arrows + Mouse Wheel Support */}
        <div className="relative flex items-center group">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScrollChips('left')}
              className="flex shrink-0 w-7 h-7 rounded-lg items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white mr-1 shadow-xs transition-all cursor-pointer z-10"
              title="เลื่อนซ้าย"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <div 
            ref={chipsScrollRef}
            className="flex items-center gap-1.5 overflow-x-auto pb-1 scroll-smooth w-full select-none scrollbar-thin scrollbar-thumb-emerald-500/20"
          >
            {categoryFilters.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105'
                      : isDarkMode
                        ? 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>{lang === 'th' ? cat.labelTh : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScrollChips('right')}
              className="flex shrink-0 w-7 h-7 rounded-lg items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white ml-1 shadow-xs transition-all cursor-pointer z-10"
              title="เลื่อนขวา"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Brand Dropdown Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 shrink-0">
            {lang === 'th' ? 'กรองตามแบรนด์:' : 'Filter Brand:'}
          </span>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className={`flex-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">
              {lang === 'th' 
                ? `⚡ ทุกแบรนด์ชั้นนำ (${OFFICIAL_APPLIANCE_DATABASE.length} รุ่น)` 
                : `All Brands (${OFFICIAL_APPLIANCE_DATABASE.length} models)`}
            </option>
            {brandStats.map(([brandName, count]) => (
              <option key={brandName} value={brandName}>
                {brandName} ({count} {lang === 'th' ? 'รุ่น' : 'models'})
              </option>
            ))}
          </select>
          {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>
          {lang === 'th' ? `พบสเปกทางการ ${filteredSpecs.length} รายการ:` : `Found ${filteredSpecs.length} official specs:`}
        </span>
        {onSwitchToManual && (
          <button
            type="button"
            onClick={onSwitchToManual}
            className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>{lang === 'th' ? 'ไม่อยู่ในรายการ? กรอกเอง ✍️' : 'Not listed? Enter manually ✍️'}</span>
          </button>
        )}
      </div>

      {/* Specification Cards List */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {filteredSpecs.length > 0 ? (
          filteredSpecs.map((spec) => {
            const isSelected = selectedSpecId === spec.id;
            return (
              <motion.div
                key={spec.id}
                layout
                className={`p-4 rounded-2xl border transition-all text-left relative ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 ring-2 ring-emerald-500/20'
                    : isDarkMode
                      ? 'bg-slate-800/60 border-slate-700/70 hover:border-slate-600'
                      : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[0.68rem]">
                        {spec.brand}
                      </span>
                      <span className="font-extrabold text-xs text-slate-800 dark:text-slate-100">
                        {spec.modelSeries}
                      </span>
                      <span className="text-[0.68rem] font-bold text-amber-500 dark:text-amber-400 flex items-center gap-0.5 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        ⭐ {spec.labelNo5Stars > 0 ? `เบอร์ 5 (${spec.labelNo5Stars} ดาว)` : 'เบอร์ 5 มาตรฐาน'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">ขนาด/ความจุ: {spec.sizeCapacity}</span> • {spec.technology}
                    </p>

                    {/* Official Energy Metrics Pill Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                        <span className="text-[0.62rem] text-slate-400 font-bold block">{lang === 'th' ? 'กำลังไฟพิกัด' : 'Rated Watt'}</span>
                        <span className="font-mono font-extrabold text-xs text-emerald-600 dark:text-emerald-400">{spec.ratedWatt} W</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                        <span className="text-[0.62rem] text-slate-400 font-bold block">{lang === 'th' ? 'ค่าเฉลี่ยวิ่งจริง' : 'Avg Run Watt'}</span>
                        <span className="font-mono font-extrabold text-xs text-slate-800 dark:text-slate-200">~{spec.averageOperatingWatt} W</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                        <span className="text-[0.62rem] text-slate-400 font-bold block">{lang === 'th' ? 'ค่าไฟ กฟผ./ปี' : 'EGAT Year Cost'}</span>
                        <span className="font-mono font-extrabold text-xs text-slate-800 dark:text-slate-200">฿{spec.estimatedYearlyCostThb.toLocaleString()}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                        <span className="text-[0.62rem] text-slate-400 font-bold block">{lang === 'th' ? 'มาตรฐานทดสอบ' : 'Standard'}</span>
                        <span className="font-mono font-extrabold text-[0.68rem] text-emerald-500">
                          {spec.seerOrCop || `${spec.yearlyKwhEgat} kWh/ปี`}
                        </span>
                      </div>
                    </div>

                    <div className="text-[0.68rem] text-slate-400 flex items-center gap-1.5 pt-1">
                      <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{lang === 'th' ? spec.standardUsageAssumptionTh : spec.standardUsageAssumptionEn}</span>
                    </div>
                  </div>

                  {/* Apply Auto-fill Button */}
                  <div className="flex sm:flex-col items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSpecId(spec.id);
                        onSelectSpec(spec);
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer transition-all active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === 'th' ? 'เลือกใช้อัตโนมัติ' : 'Auto-Fill'}</span>
                    </button>

                    <a
                      href={spec.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.68rem] text-slate-400 hover:text-emerald-500 flex items-center gap-1 underline"
                    >
                      <span>{spec.sourceAuthority}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-500 font-medium">
              {lang === 'th' 
                ? 'ไม่พบข้อมูลเครื่องใช้ไฟฟ้านี้ในฐานข้อมูลทางการของ กฟผ./แบรนด์หลัก' 
                : 'No official EGAT/Brand spec match found for this keyword.'}
            </p>
            {onSwitchToManual && (
              <button
                type="button"
                onClick={onSwitchToManual}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                {lang === 'th' ? 'กรอกข้อมูลกำลังไฟ (W) ด้วยตนเอง ✍️' : 'Enter Watts Manually ✍️'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
