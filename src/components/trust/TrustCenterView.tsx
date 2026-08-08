import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Sparkles, 
  BrainCircuit, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  History, 
  Calculator, 
  BookOpen, 
  Award,
  Zap,
  Cpu,
  Server
} from 'lucide-react';
import { InfoDetailMode, AppPage } from '../../types';
import { TRUST_FAQS } from '../../data/trustData';
import { DataQualityCard } from './DataQualityCard';
import { AIDecisionHistoryCard } from './AIDecisionHistoryCard';

interface TrustCenterViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  infoDetailMode: InfoDetailMode;
  onNavigatePage: (page: AppPage) => void;
}

export const TrustCenterView: React.FC<TrustCenterViewProps> = ({
  lang,
  isDarkMode,
  infoDetailMode,
  onNavigatePage,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 md:p-8 rounded-[2.5rem] border relative overflow-hidden shadow-lg ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border-teal-500/30 text-white'
            : 'bg-gradient-to-r from-teal-50 via-emerald-50/60 to-white border-teal-100 text-slate-800'
        }`}
      >
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'th' ? 'ศูนย์ความน่าเชื่อถือและความโปร่งใส (Trust & Transparency Center)' : 'Trust & Transparency Center'}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            {lang === 'th' ? 'ไม่มีการประมวลผลแบบกล่องดำ (No Black Boxes)' : 'Zero Black-Box Logic. Complete Transparency.'}
          </h2>

          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'th'
              ? 'ทุกตัวเลข คำแนะนำ การคำนวณบิล และดัชนีคะแนนใน EduEase Energy สามารถตรวจสอบที่มา สูตร และระดับความเชื่อมั่นได้เสมอ เพื่อให้คุณมั่นใจในความถูกต้องแบบ 100%'
              : 'Every prediction, calculation, recommendation, and tariff formula in EduEase Energy is verifiable, transparent, and grounded in real-world data.'}
          </p>
        </div>
      </motion.div>

      {/* 2. Core Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-5 rounded-3xl border space-y-2 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
        }`}>
          <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-500 w-fit">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base font-display">
            {lang === 'th' ? ' Server-Side Proxy Security' : ' Server-Side Proxy Security'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {lang === 'th'
              ? 'API Key ทั้งหมดถูกเก็บและเรียกใช้งานผ่านสถาปัตยกรรม Server-Side (/api/*) เท่านั้น ไม่เคยเปิดเผยลงในเบราว์เซอร์'
              : 'All secrets and API keys are strictly maintained within server-side proxy routes.'}
          </p>
        </div>

        <div className={`p-5 rounded-3xl border space-y-2 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
        }`}>
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 w-fit">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base font-display">
            {lang === 'th' ? 'Physics + Gemini AI Engine' : 'Physics + Gemini AI Engine'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {lang === 'th'
              ? 'ผสานหลักวิศวกรรมไฟฟ้าเข้ากับโมเดลประมวลผลความคิดเชิงลึก (High-Reasoning Thinking Engine) เพื่อผลลัพธ์ที่ถูกต้องตามหลักฟิสิกส์'
              : 'Combines electrical engineering physics formulas with high-reasoning Gemini AI models.'}
          </p>
        </div>

        <div className={`p-5 rounded-3xl border space-y-2 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
        }`}>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 w-fit">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base font-display">
            {lang === 'th' ? ' Official PEA/MEA Tariffs' : ' Official PEA/MEA Tariffs'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {lang === 'th'
              ? 'คำนวณบิลตามโครงสร้างอัตราค่าไฟทางการของการไฟฟ้าส่วนภูมิภาคและนครหลวงตรงกันทุกทศนิยม'
              : 'Implements official electricity tariff structures from PEA and MEA down to exact decimal places.'}
          </p>
        </div>
      </div>

      {/* 3. Data Quality & AI Decision History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataQualityCard
          lang={lang}
          isDarkMode={isDarkMode}
          onNavigatePage={onNavigatePage}
        />

        <AIDecisionHistoryCard
          mode={infoDetailMode}
          lang={lang}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* 4. Transparency Matrix & How AI Works */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-sm transition-all space-y-5 ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
      }`}>
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="p-2.5 rounded-2xl bg-teal-500/10 text-teal-500 border border-teal-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'ตารางความน่าเชื่อถือของแหล่งข้อมูล (Data Source Matrix)' : 'Data Source Reliability Matrix'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'รายละเอียดความน่าเชื่อถือและวิธีการได้มาของข้อมูลแต่ละประเภท' : 'Transparency index for all internal system data types'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            <span className="font-extrabold font-mono text-emerald-500 text-xs uppercase block">[MEASURED] ESP32 Sensor</span>
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              {lang === 'th' ? 'วัดจริง 100% จากฮาร์ดแวร์เซนเซอร์กระแสไฟฟ้า ความแม่นยำสูงสุด 98.5%' : 'Real hardware sensor measurement with 98.5% precision.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            <span className="font-extrabold font-mono text-teal-500 text-xs uppercase block">[TARIFF] PEA/MEA Government Rates</span>
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              {lang === 'th' ? 'อ้างอิงจากประกาศอัตราค่าไฟทางการของ กกพ. (ตรงตามบิลจริง 100%)' : 'Official rate table published by the Energy Regulatory Commission.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            <span className="font-extrabold font-mono text-purple-500 text-xs uppercase block">[PREDICTED] Gemini AI Engine</span>
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              {lang === 'th' ? 'ประมวลผลจากการจำลองแนวโน้ม ยอดประมาณการความแม่นยำ 92% - 95%' : 'Trend simulation engine with 92% - 95% statistical accuracy.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            <span className="font-extrabold font-mono text-blue-500 text-xs uppercase block">[USER] Manual User Entry</span>
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              {lang === 'th' ? 'ข้อมูลที่ผู้ใช้ป้อนเข้ามา เช่น กำลังวัตต์ของแอร์ ชั่วโมงใช้งาน และงบประมาณ' : 'Direct input provided manually by the user.'}
            </p>
          </div>
        </div>
      </div>

      {/* 5. FAQs Accordion */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-sm transition-all space-y-4 ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
      }`}>
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'คำถามที่พบบ่อยเกี่ยวกับความโปร่งใส (Transparency FAQs)' : 'Transparency FAQs'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'ไขข้อข้องใจเรื่องการทำงานของ AI และความปลอดภัยของข้อมูล' : 'Frequently asked questions about AI transparency and security'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {TRUST_FAQS.map((faq, idx) => {
            const isOpened = activeFaq === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(isOpened ? null : idx)}
                  className="w-full p-4 text-left font-extrabold text-xs md:text-sm font-display flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span>{lang === 'th' ? faq.questionTh : faq.questionEn}</span>
                  {isOpened ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>

                {isOpened && (
                  <div className="p-4 bg-white dark:bg-slate-900 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800">
                    {lang === 'th' ? faq.answerTh : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
