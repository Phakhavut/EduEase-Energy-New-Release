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
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Award, 
  Trophy, 
  Coins, 
  Zap,
  Building2,
  X,
  Lightbulb,
  ShieldCheck,
  ChevronRight
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

  if (!isOpen) return null;

  const totalSteps = 7;
  const progressPct = Math.round((step / totalSteps) * 100);

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

    if (step < totalSteps) {
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

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-950/70 backdrop-blur-md transition-all">
        {/* Responsive Container: Mobile Bottom Sheet (<768px) vs Desktop Dialog (>=768px) */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className={`w-full md:max-w-[760px] h-[90vh] md:h-auto md:max-h-[88vh] rounded-t-[28px] md:rounded-[28px] border shadow-2xl flex flex-col overflow-hidden relative ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-white shadow-emerald-950/40' 
              : 'bg-white border-emerald-100 text-slate-900 shadow-emerald-500/10'
          }`}
        >
          {/* Mobile Drag Indicator */}
          <div className="md:hidden pt-3 pb-1 flex justify-center shrink-0">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>

          {/* Sticky Fixed Header */}
          <div className="sticky top-0 z-30 px-6 pt-3 pb-4 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-sm shadow-md">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
                    Step {step} of {totalSteps} • Onboarding Journey
                  </span>
                  <h3 className="text-base font-black font-display text-slate-900 dark:text-white">
                    {lang === 'th' ? 'ยินดีต้อนรับสู่ EduEase Energy ⚡' : 'Welcome to EduEase Energy ⚡'}
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sticky Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[13px] font-extrabold text-slate-400">
                <span>{lang === 'th' ? 'ความคืบหน้าการตั้งค่า' : 'Setup Progress'}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">{progressPct}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>

          {/* Scrollable Content Body (24px horizontal padding & 24px vertical spacing) */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-none">
            {/* STEP 1: Select Energy Goals */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[13px]">
                    1. เลือกเป้าหมายการประหยัดไฟ
                  </span>
                  <h2 className="text-[28px] font-black font-display text-slate-900 dark:text-white leading-tight">
                    คุณต้องการบรรลุเป้าหมายใด?
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                    คำตอบจะช่วยให้ Voltie AI Coach ออกแบบแผนคำแนะนำที่ตรงจุดสำหรับบ้านคุณ
                  </p>
                </div>

                {/* Mobile Friendly Vertical Touch Cards */}
                <div className="space-y-3">
                  {[
                    { id: 'reduce_bill', title: 'ลดค่าไฟฟ้ารายเดือน', desc: 'เน้นตัดค่าใช้จ่ายที่ไม่จำเป็น ประหยัดเงินในกระเป๋า', icon: Wallet },
                    { id: 'control_budget', title: 'คุมงบประมาณไม่ให้เกิน', desc: 'ตั้งเป้าหมายพร้อมระบบแจ้งเตือนล่วงหน้า', icon: Target },
                    { id: 'find_heavy', title: 'หาเครื่องใช้ไฟฟ้ากินไฟหนัก', desc: 'แชมป์สูบไฟประจำบ้านเพื่อวางแผนทดแทน', icon: Zap },
                    { id: 'learn_energy', title: 'เรียนรู้เรื่องไฟฟ้าอย่างง่าย', desc: 'เข้าใจหน่วยไฟ ค่า Ft และบิลการไฟฟ้า', icon: BookOpen },
                  ].map((item) => {
                    const isSelected = goals.includes(item.id);
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleGoal(item.id)}
                        className={`w-full p-5 rounded-[20px] border text-left transition-all flex items-center justify-between min-h-[72px] cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/20 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-base font-extrabold">{item.title}</div>
                            <div className={`text-xs font-medium mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        {isSelected && <CheckCircle2 className="w-6 h-6 text-white shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Select Knowledge Level */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[13px]">
                    2. ความรู้เรื่องไฟฟ้า
                  </span>
                  <h2 className="text-[28px] font-black font-display text-slate-900 dark:text-white leading-tight">
                    เลือกระดับความรู้เรื่องไฟฟ้า
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                    ระบบจะปรับการแสดงผลแดชบอร์ดให้เหมาะกับระดับความคุ้นเคยของคุณโดยอัตโนมัติ
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'beginner', title: 'มือใหม่ (เข้าใจง่าย)', desc: 'เน้นสรุปเป็นบาทไทย สัญลักษณ์เข้าใจง่าย ไม่ซับซ้อน' },
                    { id: 'intermediate', title: 'ปานกลาง (แบบสมดุล)', desc: 'แสดงหน่วยไฟ kWh กราฟเปรียบเทียบ และค่า Ft' },
                    { id: 'advanced', title: 'ผู้เชี่ยวชาญ (แบบเจาะลึก)', desc: 'แสดงกำลังวัตต์, สมการ, Power Factor และวิเคราะห์เชิงลึก' },
                  ].map((lvl) => {
                    const isSelected = knowledgeLevel === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        onClick={() => setKnowledgeLevel(lvl.id as any)}
                        className={`w-full p-5 rounded-[20px] border text-left transition-all min-h-[72px] cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/20 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-300'
                        }`}
                      >
                        <div>
                          <div className="text-base font-extrabold">{lvl.title}</div>
                          <div className={`text-xs font-medium mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                            {lvl.desc}
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-6 h-6 text-white shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: First Location Setup */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[13px]">
                    3. ตั้งชื่อสถานที่แรก (+10 XP)
                  </span>
                  <h2 className="text-[28px] font-black font-display text-slate-900 dark:text-white leading-tight">
                    สถานที่ที่คุณต้องการติดตาม
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                    ระบุชื่อบ้าน หอพัก หรือร้านค้าของคุณเพื่อเริ่มการติดตามค่าไฟ
                  </p>
                </div>

                <div className="p-6 rounded-[20px] bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                      ชื่อสถานที่ (Location Name)
                    </label>
                    <input
                      type="text"
                      value={locName}
                      onChange={(e) => setLocName(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 font-bold text-base text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                      ประเภทสถานที่ (Location Type)
                    </label>
                    <select
                      value={locType}
                      onChange={(e) => setLocType(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 font-bold text-base text-slate-900 dark:text-white outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="home">🏠 บ้านพักอาศัย (Home)</option>
                      <option value="dorm">🏢 หอพักนักศึกษา / คอนโด (Dorm)</option>
                      <option value="shop">☕ ร้านค้า / คาเฟ่ (Shop)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: First Concept - What is 1 kWh? */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[13px]">
                    4. มินิความรู้แรก
                  </span>
                  <h2 className="text-[28px] font-black font-display text-slate-900 dark:text-white leading-tight">
                    1 หน่วยไฟ (kWh) คืออะไร?
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                    การเข้าใจหน่วยไฟคือจุดเริ่มต้นของการประหยัดค่าไฟอย่างมีประสิทธิภาพ
                  </p>
                </div>

                <div className="p-6 rounded-[20px] bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                      ⚡
                    </div>
                    <div>
                      <h4 className="text-xl font-extrabold font-display text-emerald-700 dark:text-emerald-300">
                        1 หน่วยไฟ (kWh) = 1,000 วัตต์ x 1 ชั่วโมง
                      </h4>
                      <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        คิดเป็นเงินเฉลี่ยประมาณ ฿4.20 บาท
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-200">
                    💡 ตัวอย่าง: หากคุณเปิดแอร์ขนาด 1,000 วัตต์ นาน 1 ชั่วโมงเต็ม คุณจะเสียไฟไป 1 หน่วยพอดีเป๊ะ แต่ถ้าเปิดพัดลม 50 วัตต์ นาน 20 ชั่วโมง จึงจะสะสมครบ 1 หน่วยเช่นกัน!
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 5: First Appliance Setup */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[13px]">
                    5. เครื่องใช้ไฟฟ้าหลัก
                  </span>
                  <h2 className="text-[28px] font-black font-display text-slate-900 dark:text-white leading-tight">
                    เพิ่มเครื่องใช้ไฟฟ้าชิ้นแรก
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                    ระบุเครื่องใช้ไฟฟ้าที่เปิดบ่อยที่สุดในบ้านของคุณเพื่อเริ่มคำนวณ
                  </p>
                </div>

                <div className="p-6 rounded-[20px] bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                      ชื่อเครื่องใช้ไฟฟ้า (Appliance Name)
                    </label>
                    <input
                      type="text"
                      value={applianceName}
                      onChange={(e) => setApplianceName(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 font-bold text-base text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                        กำลังไฟ (วัตต์ / Watts)
                      </label>
                      <input
                        type="number"
                        value={applianceWatt}
                        onChange={(e) => setApplianceWatt(Number(e.target.value))}
                        className="w-full h-[52px] px-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 font-bold text-base text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                        เปิดวันละ (ชั่วโมง / Hours)
                      </label>
                      <input
                        type="number"
                        value={applianceHours}
                        onChange={(e) => setApplianceHours(Number(e.target.value))}
                        className="w-full h-[52px] px-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 font-bold text-base text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 6: Cost Estimation Calculation */}
            {step === 6 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[13px]">
                    6. ผลการคำนวณค่าไฟ
                  </span>
                  <h2 className="text-[28px] font-black font-display text-slate-900 dark:text-white leading-tight">
                    ประมาณการค่าไฟของ {applianceName}
                  </h2>
                </div>

                <div className="p-8 rounded-[20px] bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-emerald-500/20 border border-emerald-500/40 text-center space-y-3 shadow-lg">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    ค่าไฟโดยประมาณของอุปกรณ์ชิ้นนี้
                  </span>
                  <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                    ฿{((applianceWatt * applianceHours * 30 / 1000) * 4.2).toFixed(0)} / เดือน
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-extrabold">
                    คิดเป็น {((applianceWatt * applianceHours * 30) / 1000).toFixed(1)} หน่วยไฟ (kWh) ต่อเดือน
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 7: Completed & Claim Reward */}
            {step === 7 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-amber-400 text-white flex items-center justify-center text-4xl mx-auto shadow-xl ring-8 ring-amber-400/20 animate-bounce">
                  🏆
                </div>

                <div className="space-y-2">
                  <h2 className="text-[28px] font-black font-display text-slate-900 dark:text-white">
                    ยินดีด้วย! คุณพร้อมเริ่มใช้งานแล้ว
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
                    รับรางวัลต้อนรับสมาชิกใหม่เพื่อเปิดประสบการณ์จัดการพลังงานด้วย AI
                  </p>
                </div>

                <div className="p-6 rounded-[20px] bg-amber-500/10 border border-amber-500/30 flex items-center justify-around font-black text-base text-amber-600 dark:text-amber-400">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 fill-amber-500" />
                    <span>+100 XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-500" />
                    <span>+50 Coins</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky Bottom Navigation Bar (56px minimum touch targets) */}
          <div className="sticky bottom-0 z-30 px-6 py-4 border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0">
            <div className="flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  onClick={handlePrev}
                  className="h-[56px] px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-base flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>{lang === 'th' ? 'ย้อนกลับ' : 'Back'}</span>
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                className="flex-1 md:flex-initial h-[56px] px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{step === totalSteps ? (lang === 'th' ? 'รับรางวัล & เริ่มใช้งาน 🚀' : 'Claim Reward & Start 🚀') : (lang === 'th' ? 'ขั้นตอนถัดไป' : 'Next Step')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
