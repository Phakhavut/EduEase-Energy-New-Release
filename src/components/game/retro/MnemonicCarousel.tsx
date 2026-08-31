import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  CheckCircle, 
  Coins, 
  Volume2, 
  BookOpen, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Snowflake,
  PlugZap,
  Layers,
  Award
} from 'lucide-react';
import { VISUAL_MNEMONICS, VisualMnemonic } from '../../../data/retroGamificationData';

interface MnemonicCarouselProps {
  lang: 'th' | 'en';
  isDarkMode?: boolean;
  onEarnCoins?: (amount: number) => void;
  onAddXp?: (amount: number) => void;
}

export const MnemonicCarousel: React.FC<MnemonicCarouselProps> = ({
  lang,
  isDarkMode = true,
  onEarnCoins,
  onAddXp
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set([VISUAL_MNEMONICS[0]?.id || '']));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [claimedReward, setClaimedReward] = useState(false);

  const categories = [
    { id: 'all', labelTh: 'ทั้งหมด (6 กฎ)', labelEn: 'All Rules (6)' },
    { id: 'cooling', labelTh: 'ระบบปรับอากาศ', labelEn: 'Cooling & AC' },
    { id: 'vampire', labelTh: 'ไฟสแตนด์บาย', labelEn: 'Vampire Loads' },
    { id: 'kitchen', labelTh: 'ครัว & ตู้เย็น', labelEn: 'Kitchen & Fridge' },
    { id: 'heating', labelTh: 'ต้ม & รีด', labelEn: 'Water & Ironing' },
    { id: 'tariff', labelTh: 'อัตรา TOU', labelEn: 'TOU Tariff' },
  ];

  const filteredMnemonics = selectedCategory === 'all'
    ? VISUAL_MNEMONICS
    : VISUAL_MNEMONICS.filter(m => m.category === selectedCategory);

  const activeMnemonic: VisualMnemonic | undefined = filteredMnemonics[currentIndex] || filteredMnemonics[0];

  const handleNext = () => {
    setIsFlipped(false);
    const nextIdx = (currentIndex + 1) % filteredMnemonics.length;
    setCurrentIndex(nextIdx);
    if (filteredMnemonics[nextIdx]) {
      setViewedCards(prev => new Set(prev).add(filteredMnemonics[nextIdx].id));
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    const prevIdx = (currentIndex - 1 + filteredMnemonics.length) % filteredMnemonics.length;
    setCurrentIndex(prevIdx);
    if (filteredMnemonics[prevIdx]) {
      setViewedCards(prev => new Set(prev).add(filteredMnemonics[prevIdx].id));
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (activeMnemonic) {
      setViewedCards(prev => new Set(prev).add(activeMnemonic.id));
    }
  };

  const allReviewed = VISUAL_MNEMONICS.every(m => viewedCards.has(m.id));

  const handleClaimBonus = () => {
    if (!claimedReward && allReviewed) {
      setClaimedReward(true);
      if (onEarnCoins) onEarnCoins(60);
      if (onAddXp) onAddXp(120);
    }
  };

  if (!activeMnemonic) return null;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className={`p-6 rounded-[2rem] border relative overflow-hidden transition-all shadow-lg ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-indigo-500/30 text-white' 
          : 'bg-gradient-to-br from-amber-50/60 via-white to-sky-50/60 border-amber-200 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                {lang === 'th' ? 'การ์ดภาพจำหมุนเวียน (Mnemonic Carousel)' : '3D Mnemonic Carousel'}
              </span>
              <span className="text-xs font-bold text-indigo-400">
                {lang === 'th' ? `ศึกษาแล้ว ${viewedCards.size}/${VISUAL_MNEMONICS.length} ใบ` : `Studied ${viewedCards.size}/${VISUAL_MNEMONICS.length} cards`}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-display">
              {lang === 'th' ? 'สไลด์การ์ดภาพจำ 6 กฎทองประหยัดไฟ' : 'The 6 Golden Rules Interactive Flashcards'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
              {lang === 'th'
                ? 'กดพลิกการ์ดเพื่อดูเฉลยหลักวิทยาศาสตร์ ฟิสิกส์ และสูตรคำนวณเงินบาทที่ประหยัดได้จริง เลื่อนซ้าย-ขวาเพื่อศึกษาให้ครบทุกใบ'
                : 'Click to flip and inspect the underlying physics laws, formulas, and Baht savings. Swipe or click arrows to explore all cards.'}
            </p>
          </div>

          {/* Reward Completion Box */}
          <div className="flex items-center gap-3">
            {allReviewed ? (
              <button
                onClick={handleClaimBonus}
                disabled={claimedReward}
                className={`px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                  claimedReward
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:scale-105 ring-2 ring-amber-400/50 animate-pulse'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>
                  {claimedReward 
                    ? (lang === 'th' ? '✓ รับรางวัลแล้ว (+60 Coins)' : '✓ Bonus Claimed (+60 Coins)') 
                    : (lang === 'th' ? 'กดรับรางวัลครบการ์ด (+60 Coins)' : 'Claim Complete Bonus (+60 Coins)')}
                </span>
              </button>
            ) : (
              <div className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'th' ? `ศึกษาอีก ${VISUAL_MNEMONICS.length - viewedCards.size} ใบเพื่อรับโบนัส` : `Review ${VISUAL_MNEMONICS.length - viewedCards.size} more for reward`}</span>
              </div>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
          {categories.map((cat) => {
            const isCatActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 transition-all cursor-pointer border ${
                  isCatActive
                    ? 'bg-teal-500 text-white border-teal-400 shadow-md ring-2 ring-teal-500/30'
                    : isDarkMode
                      ? 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {lang === 'th' ? cat.labelTh : cat.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Flashcard Presentation View */}
      <div className="relative max-w-2xl mx-auto">
        {/* Navigation Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous card"
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600' 
              : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Navigation Right Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next card"
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600' 
              : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Flip Card Container */}
        <div 
          onClick={handleFlip}
          className="cursor-pointer group select-none min-h-[420px] transition-transform duration-300"
        >
          <div className={`p-6 sm:p-8 rounded-[2.5rem] border-2 shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between ${
            isFlipped
              ? isDarkMode 
                ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-teal-500/50'
                : 'bg-gradient-to-br from-teal-50 via-white to-sky-50 border-teal-400'
              : isDarkMode
                ? 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border-amber-500/40'
                : 'bg-gradient-to-br from-amber-50/40 via-white to-amber-100/30 border-amber-300'
          }`}>
            {/* Top Card Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                  isFlipped ? 'bg-teal-500/20 text-teal-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {isFlipped ? (lang === 'th' ? '🔬 ด้านหลัง: เฉลยวิทยาศาสตร์' : '🔬 BACK: SCIENCE EXPLANATION') : (lang === 'th' ? '🃏 ด้านหน้า: ภาพจำ & กฎทอง' : '🃏 FRONT: MNEMONIC RULE')}
                </span>
                <span className="text-xs font-mono opacity-60">
                  #{currentIndex + 1} / {filteredMnemonics.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-xl">
                  <span>~฿{activeMnemonic.savingsBahtMonth}</span>
                  <span className="text-[10px] font-medium">{lang === 'th' ? '/เดือน' : '/mo'}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFlip();
                  }}
                  className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Flip card"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* FRONT SIDE CONTENT */}
            {!isFlipped ? (
              <div className="space-y-5 py-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                  <div className="text-3xl sm:text-4xl mb-2">⚡</div>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-amber-500">
                    {lang === 'th' ? activeMnemonic.titleTh : activeMnemonic.titleEn}
                  </h3>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/60 dark:bg-slate-800/80 border border-slate-700 text-center space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                    {lang === 'th' ? '🔑 วลีภาพจำช่วยจำ (Mnemonic Hook)' : '🔑 Visual Mnemonic Hook'}
                  </span>
                  <p className="text-base sm:text-lg font-black text-white leading-snug">
                    {lang === 'th' ? activeMnemonic.mnemonicKeyTh : activeMnemonic.mnemonicKeyEn}
                  </p>
                </div>

                <div className="text-sm font-medium text-slate-300 leading-relaxed text-center px-2">
                  {lang === 'th' ? activeMnemonic.ruleTh : activeMnemonic.ruleEn}
                </div>
              </div>
            ) : (
              /* BACK SIDE CONTENT (SCIENCE & MATH) */
              <div className="space-y-4 py-2">
                <div>
                  <h4 className="text-sm font-black uppercase text-teal-400 flex items-center gap-1.5 mb-1">
                    <BookOpen className="w-4 h-4" />
                    {lang === 'th' ? 'ทำไมถึงประหยัด? (หลักฟิสิกส์ & วิทยาศาสตร์)' : 'Why It Works (Physics Principle)'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-200 leading-relaxed p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20">
                    {lang === 'th' ? activeMnemonic.scienceExplanationTh : activeMnemonic.scienceExplanationEn}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-black uppercase text-amber-400 flex items-center gap-1.5 mb-1">
                    <Zap className="w-4 h-4" />
                    {lang === 'th' ? 'สูตรคำนวณเงินบาทที่ประหยัดได้จริง' : 'Mathematical Formula & Baht Savings'}
                  </h4>
                  <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 font-mono text-xs text-amber-300 font-bold">
                    {lang === 'th' ? activeMnemonic.mathFormulaTh : activeMnemonic.mathFormulaEn}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Card Footer */}
            <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 font-bold">
                <RotateCw className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
                {lang === 'th' ? 'แตะที่การ์ดเพื่อพลิกดูเฉลย' : 'Click card to flip'}
              </span>
              <span className="font-extrabold text-teal-400">
                {viewedCards.has(activeMnemonic.id) ? (lang === 'th' ? '✓ บันทึกความจำแล้ว' : '✓ Memorized') : (lang === 'th' ? 'ยังไม่ได้อ่าน' : 'Unread')}
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {filteredMnemonics.map((m, idx) => {
            const isCurrent = idx === currentIndex;
            const isViewed = viewedCards.has(m.id);
            return (
              <button
                key={m.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsFlipped(false);
                  setViewedCards(prev => new Set(prev).add(m.id));
                }}
                className={`transition-all rounded-full cursor-pointer ${
                  isCurrent 
                    ? 'w-8 h-2.5 bg-teal-500' 
                    : isViewed 
                      ? 'w-2.5 h-2.5 bg-emerald-400/80 hover:bg-emerald-400' 
                      : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400'
                }`}
                title={m.titleTh}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
