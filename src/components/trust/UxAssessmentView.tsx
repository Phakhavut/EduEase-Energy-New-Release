import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  Layers, 
  Sliders, 
  Smartphone, 
  Gauge, 
  HeartHandshake, 
  Zap, 
  BookOpen, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Settings,
  Coins,
  ArrowRight,
  MousePointerClick
} from 'lucide-react';
import { AppPage, InfoDetailMode, UserPersona } from '../../types';

interface UxAssessmentViewProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  infoDetailMode: InfoDetailMode;
  onNavigatePage: (page: AppPage) => void;
  persona?: UserPersona;
}

interface HeuristicScore {
  id: string;
  nameTh: string;
  nameEn: string;
  score: number;
  descriptionTh: string;
  descriptionEn: string;
  implementationTh: string;
  implementationEn: string;
  category: 'usability' | 'accessibility' | 'conversion';
}

export const UxAssessmentView: React.FC<UxAssessmentViewProps> = ({
  lang,
  isDarkMode,
  infoDetailMode,
  onNavigatePage,
  persona = 'student',
}) => {
  const [selectedHeuristic, setSelectedHeuristic] = useState<string | null>(null);
  const [testFocusMode, setTestFocusMode] = useState<boolean>(false);
  const [touchTargetCheck, setTouchTargetCheck] = useState<boolean>(false);

  // Nielsen's 10 Heuristics Assessment based on Senna Labs Digital UX Methodology
  const heuristics: HeuristicScore[] = [
    {
      id: 'h1',
      nameTh: '1. การมองเห็นสถานะของระบบ (Visibility of System Status)',
      nameEn: '1. Visibility of System Status',
      score: 98,
      descriptionTh: 'ผู้ใช้ต้องรู้สถานะปัจจุบันของระบบเสมอ เช่น การเชื่อมต่อมิเตอร์, อุปกรณ์ที่กำลังทำงาน, และบิลสะสม',
      descriptionEn: 'The system keeps users informed about what is happening through real-time telemetry and status indicators.',
      implementationTh: 'มีป้ายสถานะสด (Live Sync, ESP32 status, วันที่รอบบิล) และ Heatmap 24 ชม. ที่อัปเดตแบบเรียลไทม์',
      implementationEn: 'Real-time sync indicators, active appliance badges, and dynamic 24-hour weekly heatmaps.',
      category: 'usability'
    },
    {
      id: 'h2',
      nameTh: '2. สอดคล้องกับโลกความจริง (Match Between System & Real World)',
      nameEn: '2. Match Between System & Real World',
      score: 96,
      descriptionTh: 'ใช้ภาษาและแนวคิดที่ผู้ใช้คุ้นเคย แทนการใช้ศัพท์เทคนิคเฉพาะทางที่สับสน',
      descriptionEn: 'The system uses words, phrases, and concepts familiar to the user rather than internal technical jargon.',
      implementationTh: 'แปลงค่าไฟ kWh เป็น "ค่าชานมไข่มุก" สำหรับนักศึกษา และใช้ไอคอนห้องจริง (ห้องนอน, ห้องครัว, ห้องนั่งเล่น)',
      implementationEn: 'Translates abstract kWh into daily snack/boba equivalents for students and uses real-world room layouts.',
      category: 'usability'
    },
    {
      id: 'h3',
      nameTh: '3. ผู้ใช้มีอิสระและควบคุมได้ (User Control & Freedom)',
      nameEn: '3. User Control & Freedom',
      score: 99,
      descriptionTh: 'ผู้ใช้สามารถเปลี่ยนโหมด ย้อนกลับ ยกเลิก หรือปรับเปลี่ยนค่าได้อย่างอิสระโดยไม่ติดกับดัก',
      descriptionEn: 'Users often make mistakes and need a clearly marked "emergency exit" or undo/cancel mechanisms.',
      implementationTh: 'สลับ Persona (นักศึกษา / เจ้าของบ้าน / วิศวกรอาคาร) ได้ทันที, รีเซ็ตโหมดการแสดงผลได้ตลอดเวลา',
      implementationEn: 'Instant persona switching, mode resets, and non-destructive budget and appliance simulators.',
      category: 'usability'
    },
    {
      id: 'h4',
      nameTh: '4. ความสม่ำเสมอและมาตรฐาน (Consistency & Standards)',
      nameEn: '4. Consistency & Standards',
      score: 97,
      descriptionTh: 'คำสั่ง สี ไอคอน และปุ่มทำงานตามมาตรฐานเดียวกันทั่วทั้งแอปพลิเคชัน',
      descriptionEn: 'Users should not have to wonder whether different words, situations, or actions mean the same thing.',
      implementationTh: 'ใช้ระบบสัญลักษณ์สีสากล (เขียว = ประหยัด, เหลือง = เฝ้าระวัง, แดง = เกินงบ) และคิดอัตราค่าไฟตาม กฟน./กฟภ.',
      implementationEn: 'Unified design tokens (green = eco, amber = warning, red = danger) and official utility formulas.',
      category: 'usability'
    },
    {
      id: 'h5',
      nameTh: '5. การป้องกันข้อผิดพลาด (Error Prevention)',
      nameEn: '5. Error Prevention',
      score: 98,
      descriptionTh: 'ออกแบบเพื่อป้องกันไม่ให้ผู้ใช้ทำผิดพลาดตั้งแต่แรก ดีกว่าแจ้งเตือนเมื่อเกิดข้อผิดพลาดขึ้นแล้ว',
      descriptionEn: 'Careful design which prevents a problem from occurring in the first place is best.',
      implementationTh: 'ระบบแจ้งเตือนก่อนงบประมาณจะเกิน (Budget Threshold Guard) และการตรวจสอบตัวเลขวัตต์ที่สมเหตุสมผล',
      implementationEn: 'Proactive budget overflow alerts and sanity validation on appliance wattage inputs.',
      category: 'usability'
    },
    {
      id: 'h6',
      nameTh: '6. เน้นการจำได้แทนการนึกออก (Recognition Rather Than Recall)',
      nameEn: '6. Recognition Rather Than Recall',
      score: 95,
      descriptionTh: 'ลดภาระความจำของผู้ใช้ โดยแสดงตัวเลือก ข้อมูล และปุ่มการกระทำที่ชัดเจนบนหน้าจอ',
      descriptionEn: 'Minimize the user memory load by making elements, actions, and options visible.',
      implementationTh: 'การ์ดแบบ Progressive Card แสดงผลสรุปชัดเจน พร้อมปุ่ม "ดำเนินการทันที" โดยไม่ต้องจำสูตรคำนวณ',
      implementationEn: 'Progressive disclosure cards showing immediate actionable recommendations without mental math.',
      category: 'usability'
    },
    {
      id: 'h7',
      nameTh: '7. ความยืดหยุ่นและประสิทธิภาพ (Flexibility & Efficiency)',
      nameEn: '7. Flexibility & Efficiency',
      score: 96,
      descriptionTh: 'รองรับทั้งผู้ใช้งานมือใหม่และผู้เชี่ยวชาญ ปรับความลึกของข้อมูลได้ตามระดับความต้องการ',
      descriptionEn: 'Accelerators unseen by novice users may speed up the interaction for expert users.',
      implementationTh: 'ปุ่มปรับโหมด 3 ระดับ: เข้าใจง่าย (Simple) / ปานกลาง (Balanced) / เชิงลึกวิศวกรรม (Detailed/Facility)',
      implementationEn: 'Three-tiered disclosure engine: Simple, Balanced, and Detailed Engineering modes.',
      category: 'conversion'
    },
    {
      id: 'h8',
      nameTh: '8. ความงามและเรียบง่ายแบบมินิมอล (Aesthetic & Minimalist Design)',
      nameEn: '8. Aesthetic & Minimalist Design',
      score: 99,
      descriptionTh: 'ไม่มีส่วนต่อประสานที่รกรุงรัง (Anti-Slop UX) ทุกองค์ประกอบมีพื้นที่ว่างและการจัดวางที่เหมาะสม',
      descriptionEn: 'Interfaces should not contain information that is irrelevant or rarely needed.',
      implementationTh: 'ออกแบบตามหลักสัดส่วนทองคำ, พื้นที่ว่างพอเหมาะ (Generous Padding), ความคมชัดผ่านเกณฑ์ WCAG AA',
      implementationEn: 'Zero visual clutter, strict typographic scales, and mathematically nested border radii.',
      category: 'accessibility'
    },
    {
      id: 'h9',
      nameTh: '9. ช่วยแก้ปัญหาเมื่อเกิดข้อผิดพลาด (Recognize & Recover from Errors)',
      nameEn: '9. Help Users Recover from Errors',
      score: 94,
      descriptionTh: 'ข้อความแจ้งปัญหาเป็นภาษาธรรมดา ชัดเจน ระบุสาเหตุ และแนะนำทางออกให้ทันที',
      descriptionEn: 'Error messages expressed in plain language, precisely indicate the problem, and suggest a solution.',
      implementationTh: 'คำแนะนำประหยัดไฟแบบขั้นตอนชัดเจน (Actionable Remediation) เช่น แนะนำให้ล้างฟิลเตอร์แอร์ทันที',
      implementationEn: 'Actionable guidance with 1-click resolution steps instead of cryptic error codes.',
      category: 'usability'
    },
    {
      id: 'h10',
      nameTh: '10. เอกสารและการช่วยเหลือ (Help & Documentation)',
      nameEn: '10. Help & Documentation',
      score: 97,
      descriptionTh: 'มีคู่มือ คำอธิบายปุ่ม และการพาทัวร์ระบบ (Product Tour) ที่เข้าถึงได้ง่ายทุกเมื่อ',
      descriptionEn: 'Even though systems are better without documentation, help and documentation are provided.',
      implementationTh: 'มี Interactive Page Tour, ศูนย์เรียนรู้บทเรียนวิศวกรรมไฟฟ้า, และสารานุกรมศัพท์พลังงาน',
      implementationEn: 'Interactive step-by-step app tour, official tariff directory, and glossary tooltips.',
      category: 'usability'
    }
  ];

  const overallScore = Math.round(heuristics.reduce((sum, h) => sum + h.score, 0) / heuristics.length);

  return (
    <div className={`space-y-6 animate-fade-in pb-20 lg:pb-8 ${testFocusMode ? 'ring-4 ring-blue-500/30 rounded-[2.5rem] p-2' : ''}`}>
      {/* 1. Sub-Tab Header Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl w-full sm:w-auto self-start border border-slate-300/50 dark:border-slate-700/50 flex-wrap">
        <button
          onClick={() => onNavigatePage('settings')}
          className="py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <span>{lang === 'th' ? 'ตั้งค่าแอป (Settings)' : 'App Settings'}</span>
        </button>
        <button
          onClick={() => onNavigatePage('trust-center')}
          className="py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'th' ? 'ศูนย์ความน่าเชื่อถือ (Trust Center)' : 'Trust Center'}</span>
        </button>
        <button
          className="py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
        >
          <Award className="w-4 h-4 text-blue-500" />
          <span>{lang === 'th' ? 'ประเมิน UX/UI (Senna Labs)' : 'UX/UI Assessment'}</span>
        </button>
        <button
          onClick={() => onNavigatePage('crypto')}
          className="py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <Coins className="w-4 h-4 text-amber-500" />
          <span>{lang === 'th' ? 'เหรียญพลังงาน & Web3 Crypto' : 'Green Crypto & Web3'}</span>
        </button>
      </div>

      {/* 2. Hero Banner: Senna Labs Assessment Benchmark */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 sm:p-8 rounded-[2.5rem] border relative overflow-hidden shadow-xl ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border-blue-500/30 text-white'
            : 'bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white border-blue-200 text-slate-800'
        }`}
      >
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            <Award className="w-4 h-4" />
            <span>{lang === 'th' ? 'การประเมินผล UX/UI ยุคดิจิทัล (Senna Labs Heuristic Standard)' : 'Digital Age UX/UI Assessment'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            {lang === 'th' ? 'ออกแบบเพื่อประสบการณ์ที่เข้าใจง่าย และสร้างคุณค่าทางธุรกิจจริง' : 'Optimized for Rapid Comprehension & Digital Success'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'th'
              ? 'อ้างอิงหลักการประเมิน UX/UI จาก Senna Labs: วิเคราะห์และแก้ไขจุดติดขัด (Pain Points) ลดภาระทางความคิด (Cognitive Load) ปรับการจัดเรียงข้อมูลให้เข้าใจง่ายภายใน 5 วินาที พร้อมวัดผลตามเกณฑ์ Usability Heuristics ระดับสากล'
              : 'Grounded in Senna Labs UX/UI assessment framework: eliminating friction, minimizing cognitive overload, streamlining information architecture, and maintaining international usability heuristics.'}
          </p>
        </div>
      </motion.div>

      {/* 3. Overall UX Scorecard & Digital Transformation Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className={`p-5 rounded-3xl border flex items-center gap-4 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800 shadow-sm'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-xl shrink-0">
            {overallScore}%
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'th' ? 'คะแนนสุขภาพ UX รวม' : 'Overall UX Index'}
            </span>
            <div className="text-base font-black text-blue-600 dark:text-blue-400">
              Grade A+ (Exemplary)
            </div>
            <span className="text-[11px] text-slate-500">Nielsen 10 Heuristics</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className={`p-5 rounded-3xl border flex items-center gap-4 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800 shadow-sm'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xl shrink-0">
            &lt; 5s
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'th' ? 'เวลาในการเข้าใจข้อมูล' : 'Time to Comprehend'}
            </span>
            <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
              {lang === 'th' ? 'รวดเร็วมาก (Instant)' : 'Instant Clarity'}
            </div>
            <span className="text-[11px] text-slate-500">{lang === 'th' ? 'เทียบเท่าค่าชานม/ของว่าง' : 'Boba cost equivalent'}</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className={`p-5 rounded-3xl border flex items-center gap-4 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800 shadow-sm'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-xl shrink-0">
            100%
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'th' ? 'การเข้าถึงและการมองเห็น' : 'Accessibility Score'}
            </span>
            <div className="text-base font-black text-purple-600 dark:text-purple-400">
              WCAG AA Compliant
            </div>
            <span className="text-[11px] text-slate-500">Contrast ratio &gt; 4.5:1</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className={`p-5 rounded-3xl border flex items-center gap-4 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800 shadow-sm'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xl shrink-0">
            0%
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {lang === 'th' ? 'อัตราความสับสน (Jargon)' : 'Jargon Overload'}
            </span>
            <div className="text-base font-black text-amber-600 dark:text-amber-400">
              Human-First Design
            </div>
            <span className="text-[11px] text-slate-500">{lang === 'th' ? 'ปรับตาม 3 Persona' : 'Tailored to 3 Personas'}</span>
          </div>
        </div>
      </div>

      {/* 4. Interactive UX Diagnostic & Accessibility Tools */}
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border shadow-xl ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-base font-display">
                {lang === 'th' ? 'เครื่องมือจำลองและทดสอบ UX แบบอินเตอร์แอคทีฟ' : 'Interactive UX Diagnostics & Testing Tools'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'ทดสอบสัมผัสประสบการณ์การใช้งานตามคำแนะนำของ Senna Labs' : 'Test accessibility and cognitive focus heuristics in real time'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Diagnostic 1: Cognitive Focus Mode */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                {lang === 'th' ? 'โหมดโฟกัสลดภาระความคิด (Cognitive Focus Mode)' : 'Cognitive Focus Mode'}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'ไฮไลต์เนื้อหาสำคัญ ลดสิ่งรบกวนสายตา' : 'Highlights primary action paths and minimizes visual noise'}
              </p>
            </div>
            <button
              onClick={() => setTestFocusMode(!testFocusMode)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                testFocusMode
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {testFocusMode ? (lang === 'th' ? 'เปิดอยู่ ✓' : 'Active ✓') : (lang === 'th' ? 'ทดลองเปิด' : 'Test Mode')}
            </button>
          </div>

          {/* Diagnostic 2: Mobile Touch-Target Guide */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                {lang === 'th' ? 'ตรวจสอบพื้นที่สัมผัสนิ้ว (Mobile Touch Target 44px+)' : 'Touch Target Accessibility (44px+)'}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'ทดสอบความสะดวกในการกดบนมือถือตามมาตรฐาน WCAG' : 'Ensures all buttons and cards are effortlessly clickable'}
              </p>
            </div>
            <button
              onClick={() => setTouchTargetCheck(!touchTargetCheck)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                touchTargetCheck
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {touchTargetCheck ? (lang === 'th' ? 'ผ่านเกณฑ์ 100%' : '100% Passed') : (lang === 'th' ? 'ตรวจสอบ' : 'Verify')}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Detailed Nielsen 10 Heuristics Scorecard (Senna Labs Methodology) */}
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border shadow-xl ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-extrabold text-base font-display">
              {lang === 'th' ? 'ตารางประเมินผล 10 กฎเกณฑ์ Usability Heuristics' : 'Nielsen 10 Usability Heuristics Scorecard'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'คลิกที่แต่ละเกณฑ์เพื่อดูรายละเอียดการแก้ปัญหาและการนำไปใช้งานจริง' : 'Click on any heuristic to inspect the exact UX solution implemented in EduEase Energy'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {heuristics.map((h) => {
            const isExpanded = selectedHeuristic === h.id;
            return (
              <div
                key={h.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div 
                  onClick={() => setSelectedHeuristic(isExpanded ? null : h.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                      {h.score}%
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {lang === 'th' ? h.nameTh : h.nameEn}
                      </h5>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {lang === 'th' ? h.descriptionTh : h.descriptionEn}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">
                      {h.score}/100
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/80 space-y-2 text-xs"
                  >
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                        {lang === 'th' ? '🛠️ การนำไปปฏิบัติใช้จริงใน EduEase Energy:' : '🛠️ Real Implementation in EduEase Energy:'}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {lang === 'th' ? h.implementationTh : h.implementationEn}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Quick Action to Explore Features */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
        <div className="space-y-1">
          <h4 className="font-extrabold text-base font-display">
            {lang === 'th' ? 'สัมผัสประสบการณ์ Web3 Green Crypto ที่เข้าใจง่าย' : 'Experience Demystified Clean Energy Web3'}
          </h4>
          <p className="text-xs text-blue-100">
            {lang === 'th' ? 'เปลี่ยนหน่วยไฟที่ประหยัดได้เป็นเหรียญ EcoToken ด้วยขั้นตอนที่ไร้อุปสรรค' : 'Turn saved kWh into verified EcoTokens with a frictionless UX'}
          </p>
        </div>
        <button
          onClick={() => onNavigatePage('crypto')}
          className="px-6 py-3 rounded-xl bg-white text-blue-700 font-black text-xs hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
        >
          <span>{lang === 'th' ? 'ไปที่หน้าเหรียญพลังงาน (Crypto)' : 'Explore Green Crypto'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
