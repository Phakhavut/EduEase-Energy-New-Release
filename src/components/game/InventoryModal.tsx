import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GuardianInventoryItem } from '../../types';
import { 
  X, 
  Package, 
  Sparkles, 
  Gem, 
  FileText, 
  Sprout, 
  Award,
  CheckCircle2
} from 'lucide-react';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: GuardianInventoryItem[];
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  inventory,
  lang,
  isDarkMode
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'blueprint' | 'seed' | 'crystal' | 'badge'>('all');

  if (!isOpen) return null;

  const filteredItems = inventory.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative w-full max-w-2xl my-auto rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          {/* Header */}
          <div className={`p-5 border-b flex items-center justify-between ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'คลังสมบัติ & Collection Book' : 'Guardian Inventory & Collection'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th' ? 'พิมพ์เขียว, เมล็ดพันธุ์ และผลึกพลังงานสะสม' : 'Blueprints, Seeds, and Crystals collected'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', titleTh: 'ทั้งหมด', titleEn: 'All Items', icon: Package },
              { id: 'blueprint', titleTh: 'พิมพ์เขียว', titleEn: 'Blueprints', icon: FileText },
              { id: 'seed', titleTh: 'เมล็ดพันธุ์', titleEn: 'Seeds', icon: Sprout },
              { id: 'crystal', titleTh: 'ผลึกพลังงาน', titleEn: 'Crystals', icon: Gem },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {React.createElement(cat.icon, { className: 'w-3.5 h-3.5' })}
                <span>{lang === 'th' ? cat.titleTh : cat.titleEn}</span>
              </button>
            ))}
          </div>

          {/* Inventory Grid */}
          <div className="p-6 overflow-y-auto space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                    isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-3xl p-2.5 rounded-xl bg-slate-900 border border-slate-700 shrink-0">
                    {item.icon}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                        {lang === 'th' ? item.nameTh : item.nameEn}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                        x{item.count}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {lang === 'th' ? item.descriptionTh : item.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-xs font-bold space-y-1">
                <p className="text-2xl">🎒</p>
                <p>{lang === 'th' ? 'ยังไม่มีไอเทมในหมวดหมู่นี้ เอาชนะ Boss เพื่อรับ Loot เพิ่ม!' : 'No items in this category. Defeat Bosses to earn loot!'}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
