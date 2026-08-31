import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Calculator, 
  Clock, 
  Search, 
  Home, 
  CheckCircle2, 
  RotateCcw, 
  ArrowLeft,
  Sparkles,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MiniGamesContainerProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onRewardEarned: (xp: number, coins: number) => void;
  onBackToGameHub: () => void;
}

export const MiniGamesContainer: React.FC<MiniGamesContainerProps> = ({
  lang,
  isDarkMode,
  onRewardEarned,
  onBackToGameHub
}) => {
  const [activeTab, setActiveTab] = useState<'match' | 'bill' | 'timing' | 'detective' | 'builder'>('match');

  // Mini-Game 1: Energy Match State
  const [matchPairs, setMatchPairs] = useState([
    { id: 'ac', appliance: 'เครื่องปรับอากาศ (AC)', watts: '1,200 Watt', matched: false },
    { id: 'pc', appliance: 'คอมพิวเตอร์เล่นเกม (Gaming PC)', watts: '500 Watt', matched: false },
    { id: 'fridge', appliance: 'ตู้เย็น 2 ประตู (Refrigerator)', watts: '150 Watt', matched: false },
    { id: 'fan', appliance: 'พัดลมตั้งพื้น (Fan)', watts: '50 Watt', matched: false }
  ]);
  const [selectedAppliance, setSelectedAppliance] = useState<string | null>(null);

  // Mini-Game 2: Bill Challenge State
  const [calcAcHours, setCalcAcHours] = useState(8);
  const [userCalcResult, setUserCalcResult] = useState('');
  const [calcSubmitted, setCalcSubmitted] = useState(false);
  const [calcIsCorrect, setCalcIsCorrect] = useState(false);

  const handleMatchSelect = (applianceId: string) => {
    setSelectedAppliance(applianceId);
  };

  const handleWattSelect = (wattValue: string) => {
    if (!selectedAppliance) return;

    const targetPair = matchPairs.find(p => p.id === selectedAppliance);
    if (targetPair && targetPair.watts === wattValue) {
      setMatchPairs(prev => prev.map(p => p.id === selectedAppliance ? { ...p, matched: true } : p));
      setSelectedAppliance(null);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });

      // Check if all matched
      if (matchPairs.filter(p => p.matched || p.id === selectedAppliance).length === matchPairs.length) {
        onRewardEarned(150, 80);
      }
    } else {
      alert(lang === 'th' ? 'ยังจับคู่ไม่ถูกต้อง ลองใหม่อีกครั้ง!' : 'Not a match, try again!');
      setSelectedAppliance(null);
    }
  };

  const handleCheckBillCalc = () => {
    // 1,200W = 1.2 kW * calcAcHours * 30 days * 4.5 thb = 1.2 * calcAcHours * 135
    const correctCost = Math.round(1.2 * calcAcHours * 30 * 4.5);
    const userVal = parseInt(userCalcResult, 10);

    setCalcSubmitted(true);
    if (Math.abs(userVal - correctCost) <= 20) { // allow small rounding diff
      setCalcIsCorrect(true);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      onRewardEarned(200, 100);
    } else {
      setCalcIsCorrect(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 px-2 sm:px-0">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToGameHub}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-200/80 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:scale-102 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'th' ? 'กลับ Game Hub' : 'Back to Game Hub'}</span>
        </button>

        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Mini-Game Training Arcade
        </span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'match', titleTh: '⚡ Energy Match', titleEn: 'Energy Match', icon: Zap },
          { id: 'bill', titleTh: '🧮 Bill Challenge', titleEn: 'Bill Challenge', icon: Calculator },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs shrink-0 transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 scale-102'
                : isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100 border'
            }`}
          >
            {React.createElement(tab.icon, { className: 'w-4 h-4' })}
            <span>{lang === 'th' ? tab.titleTh : tab.titleEn}</span>
          </button>
        ))}
      </div>

      {/* Mini Game 1: Energy Match */}
      {activeTab === 'match' && (
        <div className={`p-6 rounded-3xl border shadow-xl space-y-5 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div>
            <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">
              ⚡ Energy Match (จับคู่อุปกรณ์กับกำลังไฟ)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              คลิกเลือกเครื่องใช้ไฟฟ้าทางซ้าย แล้วคลิกเลือกค่ากำลังไฟ (Watt) ทางขวาที่สอดคล้องกัน!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Appliances Column */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">1. เลือกเครื่องใช้ไฟฟ้า</span>
              {matchPairs.map((p) => (
                <button
                  key={p.id}
                  disabled={p.matched}
                  onClick={() => handleMatchSelect(p.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                    p.matched
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 opacity-60 cursor-not-allowed'
                      : selectedAppliance === p.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 ring-2 ring-emerald-500/30'
                        : isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span>{p.appliance}</span>
                  {p.matched && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                </button>
              ))}
            </div>

            {/* Wattages Column */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">2. เลือกกำลังไฟฟ้า (Watt)</span>
              {['1,200 Watt', '500 Watt', '150 Watt', '50 Watt'].map((wattVal, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWattSelect(wattVal)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs font-mono font-bold transition-all ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' : 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100'
                  }`}
                >
                  ⚡ {wattVal}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mini Game 2: Bill Challenge */}
      {activeTab === 'bill' && (
        <div className={`p-6 rounded-3xl border shadow-xl space-y-5 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div>
            <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">
              🧮 Bill Challenge (คำนวณค่าไฟประเมิน)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              คำนวณค่าไฟแอร์ประจำเดือนตามชั่วโมงการเปิดจริง พร้อมดูวิธีคิดอย่างถูกหลักวิศวกรรมไฟฟ้า!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300">ชั่วโมงการเปิดแอร์ (1,200W) ต่อวัน:</span>
              <span className="font-mono text-emerald-400 font-bold">{calcAcHours} ชั่วโมง/วัน</span>
            </div>
            <input
              type="range"
              min="2"
              max="18"
              value={calcAcHours}
              onChange={(e) => setCalcAcHours(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />

            <div className="space-y-2 pt-2">
              <label className="font-bold text-slate-300">
                ลองคำนวณค่าไฟแอร์ต่อเดือน (30 วัน) อัตราค่าไฟ ฿4.5/หน่วย:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="ใส่ค่าไฟประมาณการ (บาท)..."
                  value={userCalcResult}
                  onChange={(e) => setUserCalcResult(e.target.value)}
                  className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs font-bold focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleCheckBillCalc}
                  className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-all"
                >
                  ตรวจคำตอบ
                </button>
              </div>
            </div>

            {calcSubmitted && (
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                calcIsCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                <p className="font-black">
                  {calcIsCorrect ? '🎉 คำนวณได้ถูกต้องแม่นยำ!' : '💡 คำตอบที่ถูกต้องคือประมาณ ฿' + Math.round(1.2 * calcAcHours * 30 * 4.5)}
                </p>
                <p className="text-[11px] text-slate-300">
                  <strong>วิธีคิด:</strong> (1,200W ÷ 1,000) × {calcAcHours} ชม. × 30 วัน = {(1.2 * calcAcHours * 30).toFixed(0)} kWh → {(1.2 * calcAcHours * 30).toFixed(0)} × ฿4.5 = ฿{Math.round(1.2 * calcAcHours * 30 * 4.5)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
