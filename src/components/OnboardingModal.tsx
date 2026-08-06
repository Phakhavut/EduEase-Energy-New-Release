import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Target, 
  BookOpen, 
  Home, 
  Plug, 
  Clock, 
  Wallet, 
  CheckCircle, 
  ArrowRight, 
  Award, 
  Trophy, 
  Coins, 
  Zap,
  Building2,
  X
} from 'lucide-react';
import { InfoDetailMode } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (rewards: { xp: number; coins: number; badgeName: string }) => void;
  onChangeDetailMode: (mode: InfoDetailMode) => void;
  isDarkMode: boolean;
  lang: 'th' | 'en';
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  onChangeDetailMode,
  isDarkMode,
  lang,
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [goals, setGoals] = useState<string[]>(['reduce_bill']);
  const [knowledgeLevel, setKnowledgeLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [locName, setLocName] = useState('บ้านพักของฉัน');
  const [locType, setLocType] = useState('home');
  const [applianceName, setApplianceName] = useState('Air Conditioner 18,000 BTU');
  const [applianceWatt, setApplianceWatt] = useState(1200);
  const [applianceHours, setApplianceHours] = useState(8);
  const [budgetVal, setBudgetVal] = useState(2500);

  if (!isOpen) return null;

  const toggleGoal = (id: string) => {
    if (goals.includes(id)) {
      setGoals(goals.filter(g => g !== id));
    } else {
      setGoals([...goals, id]);
    }
  };

  const handleNext = () => {
    if (step === 2) {
      if (knowledgeLevel === 'beginner') onChangeDetailMode('simple');
      else if (knowledgeLevel === 'intermediate') onChangeDetailMode('balanced');
      else onChangeDetailMode('detailed');
    }

    if (step < 7) {
      setStep(step + 1);
    } else {
      onComplete({
        xp: 100,
        coins: 50,
        badgeName: 'นักสำรวจพลังงานมือใหม่ (Energy Explorer)',
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden relative ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-emerald-100 text-slate-800'
        }`}
      >
        {/* Step Indicator Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-sm shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-black text-base font-display">
                ยินดีต้อนรับสู่ EduEase Energy ⚡
              </h3>
              <p className="text-xs text-slate-400 font-bold">
                เริ่มต้นใช้งาน {step} จาก 7 ขั้นตอน
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 min-h-[320px] flex flex-col justify-between">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                1. เลือกเป้าหมายที่คุณต้องการสำหรับบ้านหลังนี้
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                คำตอบจะช่วยให้ AI Coach วางแผนคำแนะนำได้อย่างตรงจุด
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'reduce_bill', title: 'ลดค่าไฟฟ้ารายเดือน', desc: 'ประหยัดเงินในกระเป๋า' },
                  { id: 'control_budget', title: 'คุมงบประมาณไม่ให้เกิน', desc: 'มีแจ้งเตือนล่วงหน้า' },
                  { id: 'find_heavy', title: 'หาเครื่องใช้ไฟฟ้ากินไฟหนัก', desc: 'แชมป์สูบไฟในบ้าน' },
                  { id: 'learn_energy', title: 'เรียนรู้เรื่องไฟฟ้าอย่างง่าย', desc: 'เข้าใจหน่วยไฟและบิล' },
                ].map((item) => {
                  const isSelected = goals.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleGoal(item.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.title}</div>
                      <div className={`text-[0.68rem] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                2. เลือกระดับความรู้เรื่องไฟฟ้าของคุณ
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                ระบบจะตั้งค่าความละเอียดของข้อมูลแดชบอร์ดให้อัตโนมัติ (เปลี่ยนทีหลังได้)
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { id: 'beginner', title: 'มือใหม่ (แบบเข้าใจง่าย)', desc: 'เน้นบาทไทย คำอธิบายสั้นๆ ไม่ซับซ้อน' },
                  { id: 'intermediate', title: 'ปานกลาง (แบบสมดุล)', desc: 'แสดงหน่วยไฟ kWh กราฟเปรียบเทียบ และค่า Ft' },
                  { id: 'advanced', title: 'ผู้เชี่ยวชาญ (แบบละเอียด)', desc: 'แสดงวัตต์, สมการ, Power Factor และข้อมูลเชิงลึกครบถ้วน' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setKnowledgeLevel(lvl.id as any)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      knowledgeLevel === lvl.id
                        ? 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-sm font-bold">{lvl.title}</div>
                    <div className={`text-xs ${knowledgeLevel === lvl.id ? 'text-emerald-100' : 'text-slate-400'}`}>{lvl.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                3. ตั้งชื่อสถานที่แรกของคุณ (+10 XP)
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                ระบุชื่อบ้าน หอพัก หรือร้านค้าของคุณเพื่อเริ่มการติดตาม
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">ชื่อสถานที่</label>
                  <input
                    type="text"
                    value={locName}
                    onChange={(e) => setLocName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">ประเภท</label>
                  <select
                    value={locType}
                    onChange={(e) => setLocType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-bold text-sm"
                  >
                    <option value="home">บ้านพักอาศัย (Home)</option>
                    <option value="dorm">หอพักนักศึกษา / คอนโด (Dorm)</option>
                    <option value="shop">ร้านค้า / คาเฟ่ (Shop)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                4. เรียนรู้แนวคิดแรก: 1 หน่วยไฟ (kWh)
              </h4>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 text-xs font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                💡 <span className="font-extrabold text-emerald-700 dark:text-emerald-400">1 หน่วยไฟ (kWh)</span> คือการเปิดเครื่องใช้ไฟฟ้าขนาด 1,000 วัตต์ นาน 1 ชั่วโมงเต็ม เช่น เปิดแอร์ขนาด 1,000W นาน 1 ชม. คุณจะจ่ายไฟไป 1 หน่วย (คิดเป็นเงินประมาณ 4.2 บาท)
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                5. เพิ่มเครื่องใช้ไฟฟ้าชิ้นแรกในบ้าน
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                ระบุเครื่องใช้ไฟฟ้าที่เปิดบ่อยที่สุดในบ้าน
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">ชื่อเครื่องใช้ไฟฟ้า</label>
                  <input
                    type="text"
                    value={applianceName}
                    onChange={(e) => setApplianceName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-bold text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">กำลังไฟ (วัตต์)</label>
                    <input
                      type="number"
                      value={applianceWatt}
                      onChange={(e) => setApplianceWatt(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">เปิดวันละ (ชม.)</label>
                    <input
                      type="number"
                      value={applianceHours}
                      onChange={(e) => setApplianceHours(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-bold text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h4 className="text-lg font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                6. คำนวณค่าไฟของ {applianceName}
              </h4>

              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-200 text-center space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">ประมาณการค่าไฟของอุปกรณ์นี้</span>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                  ฿{((applianceWatt * applianceHours * 30 / 1000) * 4.2).toFixed(0)} / เดือน
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  คิดเป็น {((applianceWatt * applianceHours * 30) / 1000).toFixed(1)} หน่วยไฟ (kWh) ต่อเดือน
                </p>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 rounded-3xl bg-amber-400 text-white flex items-center justify-center text-3xl mx-auto shadow-xl">
                🏆
              </div>

              <h4 className="text-xl font-black font-display text-slate-800 dark:text-white">
                ยินดีด้วย! คุณพร้อมใช้งานแล้ว
              </h4>

              <p className="text-xs text-slate-500 font-medium">
                รับรางวัลต้อนรับสมาชิกใหม่เพื่อเริ่มต้นเส้นทางการประหยัดไฟ
              </p>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-around font-bold text-xs text-amber-600 dark:text-amber-400">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 fill-amber-500" />
                  <span>+100 XP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span>+50 Coins</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                ย้อนกลับ
              </button>
            ) : <div />}

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all"
            >
              <span>{step === 7 ? 'รับรางวัล & เริ่มใช้งาน' : 'ถัดไป'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
