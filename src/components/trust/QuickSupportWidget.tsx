import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ShieldCheck,
  X,
  Mail,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Send,
  Lock,
  FileText,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export interface QuickSupportWidgetProps {
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
  onOpenManual?: () => void;
  className?: string;
}

export const QuickSupportWidget: React.FC<QuickSupportWidgetProps> = ({
  lang = 'th',
  isDarkMode = true,
  onOpenManual,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'pdpa'>('faq');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Quick message state
  const [inquiryType, setInquiryType] = useState('question');
  const [inquirySubject, setInquirySubject] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const SUPPORT_EMAIL = '23phakhavut43@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SUPPORT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setInquirySubject('');
      setInquiryMessage('');
    }, 3500);
  };

  const faqs = [
    {
      qTh: 'อัตราค่าไฟฟ้า TOU แตกต่างจากอัตราก้าวหน้าปกติอย่างไร?',
      qEn: 'How does the TOU tariff differ from progressive tiered pricing?',
      aTh: 'อัตราค่าไฟฟ้าแบบ TOU (Time of Use) จะคิดราคาค่าไฟผันแปรตามช่วงเวลา โดยช่วง On-Peak (จันทร์-ศุกร์ 09:00 - 22:00) คิดค่าไฟ ~5.8 บาท/หน่วย ส่วนช่วง Off-Peak (22:00 - 09:00 และวันหยุดเสาร์-อาทิตย์ตลอดวัน) คิดค่าไฟเพียง ~2.6 บาท/หน่วย หากย้ายการใช้งานอุปกรณ์วัตต์สูงไปช่วง Off-Peak จะช่วยประหยัดค่าไฟได้ 15-25% ทันที',
      aEn: 'TOU pricing varies by time slot: On-Peak (Mon-Fri 09:00 - 22:00) costs ~5.8 THB/kWh, while Off-Peak (22:00 - 09:00 and all day on weekends) costs only ~2.6 THB/kWh. Shifting heavy appliances to Off-Peak slots lowers bills by 15-25%.'
    },
    {
      qTh: 'ค่า Ft (Fuel Adjustment Charge) คำนวณอย่างไรใน EduEase Energy OS?',
      qEn: 'How is the Fuel Adjustment Charge (Ft) computed?',
      aTh: 'ระบบนำค่า Ft ผันแปรตามรอบบิลปัจจุบันที่ประกาศโดย กกพ. (ประมาณ 0.3972 บาท/หน่วย) มาคูณกับจำนวนหน่วยไฟฟ้าทั้งหมดที่ใช้จริง (kWh) และนำไปรวมกับค่าบริการรายเดือน พร้อมบวกภาษีมูลค่าเพิ่ม (VAT 7%) อย่างตรงไปตรงมา',
      aEn: 'The system multiplies the regulatory variable Ft rate (~0.3972 THB/kWh) by your net consumed kWh, adds base monthly service fees, and computes the 7% VAT rate in full transparency.'
    },
    {
      qTh: 'บริการ Daily Energy Digest ทำงานอย่างไรและแจ้งเตือนเวลาใด?',
      qEn: 'How does the Daily Energy Digest service notify users?',
      aTh: 'ระบบ Daily Energy Digest จะวิเคราะห์การใช้พลังงานของวันก่อนหน้า เปรียบเทียบเทรนด์ Day-over-Day และสังเคราะห์ 3 เคล็ดลับลดค่าไฟเฉพาะบุคคล โดยส่งสรุปทุกเช้าเวลา 08:00 น. ผ่าน Web Push และ Email ตามที่คุณตั้งค่าไว้ในศูนย์การแจ้งเตือน',
      aEn: 'The Daily Digest evaluates yesterday\'s consumption metrics, day-over-day trends, and synthesizes 3 personalized actionable tips, dispatched every morning at 08:00 AM via Web Push and Email.'
    },
    {
      qTh: 'ตัวเลขการใช้ไฟและการประหยัดในระบบมีความแม่นยำแค่ไหน?',
      qEn: 'How accurate are the power usage and savings metrics?',
      aTh: 'ระบบคำนวณตามสูตรวิศวกรรมไฟฟ้ามาตรฐาน (กำลังวัตต์ × ชั่วโมงการทำงาน / 1000) ร่วมกับโมเดลสัมประสิทธิ์อุณหภูมิของเครื่องปรับอากาศ และอ้างอิงสูตรคำนวณจากการไฟฟ้านครหลวง (MEA) และการไฟฟ้าส่วนภูมิภาค (PEA) 100%',
      aEn: 'Calculations utilize standard electrical formulas (Watt × Hours / 1000), real compressor thermal cycle coefficients, and 100% verified tariff schedules from MEA and PEA.'
    },
    {
      qTh: 'หากต้องการเชื่อมต่อมิเตอร์อัจฉริยะ (ESP32 IoT) ต้องทำอย่างไร?',
      qEn: 'How can I connect a smart IoT energy meter (ESP32)?',
      aTh: 'คุณสามารถไปที่หน้า "เครื่องใช้ไฟฟ้า" จากนั้นเลือกแถบ "เชื่อมต่อมิเตอร์อัจฉริยะ" เพื่อรับ Webhook API Endpoint และคัดลอกโค้ดตัวอย่าง Arduino/ESP32 เพื่อส่งค่าแรงดัน กระแส และวัตต์แบบเรียลไทม์',
      aEn: 'Navigate to the "Appliances" view and select the "Smart Meter Sync" tab to retrieve your Webhook API Endpoint and Arduino/ESP32 sketch templates for real-time telemetry.'
    }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
        <button
          onClick={() => setIsOpen(true)}
          className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border ${
            isDarkMode
              ? 'bg-[#0B132B]/90 hover:bg-[#101B3B] text-white border-blue-500/30 hover:border-[#38BDF8] shadow-blue-900/30 backdrop-blur-md'
              : 'bg-white/95 hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-400 shadow-slate-300/40 backdrop-blur-md'
          }`}
          aria-label={lang === 'th' ? 'ศูนย์ช่วยเหลือและนโยบาย PDPA' : 'Help & PDPA Center'}
          title={lang === 'th' ? 'คลิกเพื่อเปิดศูนย์ช่วยเหลือ & PDPA' : 'Click to open Help & PDPA'}
        >
          <div className="relative flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-[#38BDF8] group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#10B981]" />
          </div>
          <span className="text-xs font-bold tracking-tight pr-1">
            {lang === 'th' ? 'ช่วยเหลือ & PDPA' : 'Help & Support'}
          </span>
        </button>
      </div>

      {/* Interactive Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh] ${
                isDarkMode
                  ? 'bg-[#0B132B] border-blue-500/25 text-white shadow-blue-950/60'
                  : 'bg-white border-slate-200 text-slate-900 shadow-slate-400/30'
              }`}
            >
              {/* Modal Header */}
              <div
                className={`p-5 border-b flex items-center justify-between shrink-0 ${
                  isDarkMode
                    ? 'border-white/10 bg-[#101B3B]/60'
                    : 'border-slate-100 bg-slate-50/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      isDarkMode
                        ? 'bg-[#2563EB]/15 border-blue-500/30 text-[#38BDF8]'
                        : 'bg-blue-50 border-blue-200 text-[#1D4ED8]'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold flex items-center gap-2">
                      {lang === 'th'
                        ? 'ศูนย์ช่วยเหลือ & การคุ้มครองข้อมูล'
                        : 'Help Center & Privacy Protection'}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                        PDPA COMPLIANT
                      </span>
                    </h3>
                    <p
                      className={`text-xs ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {lang === 'th'
                        ? 'คำถามที่พบบ่อย (FAQ), ติดต่อทีมงาน และนโยบายความเป็นส่วนตัว'
                        : 'Frequently Asked Questions, Support contacts, and Privacy policy'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'border-white/10 hover:bg-white/10 text-slate-400 hover:text-white'
                      : 'border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div
                className={`flex items-center gap-1.5 p-2 border-b shrink-0 text-xs font-bold overflow-x-auto ${
                  isDarkMode
                    ? 'border-white/10 bg-[#060A18]/60'
                    : 'border-slate-100 bg-slate-100/70'
                }`}
              >
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === 'faq'
                      ? isDarkMode
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                        : 'bg-white text-blue-600 shadow-sm'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span>{lang === 'th' ? 'คำถามที่พบบ่อย (FAQ)' : 'FAQ & Knowledge'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === 'contact'
                      ? isDarkMode
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                        : 'bg-white text-blue-600 shadow-sm'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Mail className="w-4 h-4 text-[#10B981]" />
                  <span>{lang === 'th' ? 'ติดต่อฝ่ายสนับสนุน' : 'Contact Support'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('pdpa')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === 'pdpa'
                      ? isDarkMode
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                        : 'bg-white text-blue-600 shadow-sm'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Lock className="w-4 h-4 text-[#F59E0B]" />
                  <span>{lang === 'th' ? 'นโยบายความเป็นส่วนตัว (PDPA)' : 'PDPA Privacy'}</span>
                </button>
              </div>

              {/* Tab Contents (Scrollable Body) */}
              <div className="p-5 overflow-y-auto space-y-4">
                {/* TAB 1: FAQ */}
                {activeTab === 'faq' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1">
                      <p
                        className={`text-xs ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {lang === 'th'
                          ? 'คำถามยอดนิยมเกี่ยวกับค่าไฟ TOU, ค่า Ft และการประหยัดพลังงาน'
                          : 'Frequently asked questions on TOU tariffs, Ft charges, and savings'}
                      </p>
                      {onOpenManual && (
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onOpenManual();
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38BDF8] hover:underline"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{lang === 'th' ? 'เปิดคู่มือการใช้งาน' : 'User Manual'}</span>
                        </button>
                      )}
                    </div>

                    <div className="space-y-2.5">
                      {faqs.map((faq, idx) => {
                        const isExpanded = expandedFaqIndex === idx;
                        return (
                          <div
                            key={idx}
                            className={`rounded-xl border transition-colors overflow-hidden ${
                              isDarkMode
                                ? isExpanded
                                  ? 'bg-[#101B3B] border-blue-500/40'
                                  : 'bg-[#0E1838]/60 border-white/5 hover:border-white/15'
                                : isExpanded
                                ? 'bg-blue-50/50 border-blue-200'
                                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <button
                              onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                              className="w-full text-left p-3.5 flex items-center justify-between gap-3 font-bold text-xs sm:text-sm"
                            >
                              <span className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-md bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center font-mono text-xs shrink-0">
                                  {idx + 1}
                                </span>
                                {lang === 'th' ? faq.qTh : faq.qEn}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-[#38BDF8] shrink-0" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                              )}
                            </button>

                            {isExpanded && (
                              <div
                                className={`px-4 pb-3.5 pt-1 text-xs leading-relaxed border-t ${
                                  isDarkMode
                                    ? 'text-slate-300 border-white/5'
                                    : 'text-slate-600 border-slate-100'
                                }`}
                              >
                                {lang === 'th' ? faq.aTh : faq.aEn}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 2: CONTACT SUPPORT */}
                {activeTab === 'contact' && (
                  <div className="space-y-4">
                    {/* Support Email Card */}
                    <div
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        isDarkMode
                          ? 'bg-[#101B3B] border-blue-500/30'
                          : 'bg-blue-50/70 border-blue-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                            {lang === 'th' ? 'อีเมลติดต่อฝ่ายสนับสนุนหลัก' : 'Official Support Email'}
                          </div>
                          <div className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {SUPPORT_EMAIL}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={handleCopyEmail}
                          className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                            copiedEmail
                              ? 'bg-[#10B981] text-white border-transparent'
                              : isDarkMode
                              ? 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                              : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                          }`}
                        >
                          {copiedEmail ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{lang === 'th' ? 'คัดลอกแล้ว!' : 'Copied!'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{lang === 'th' ? 'คัดลอก' : 'Copy'}</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`mailto:${SUPPORT_EMAIL}?subject=EduEase%20Energy%20OS%20Support`}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md shadow-blue-600/30 transition-all"
                        >
                          <span>{lang === 'th' ? 'ส่งอีเมลทันที' : 'Send Mail'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Quick Inquiry Form */}
                    <div
                      className={`p-4 rounded-xl border ${
                        isDarkMode ? 'bg-[#0E1838] border-white/10' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <h4 className="text-xs sm:text-sm font-bold mb-1 flex items-center gap-1.5">
                        <Send className="w-4 h-4 text-[#38BDF8]" />
                        <span>{lang === 'th' ? 'ส่งข้อความแจ้งปัญหาหรือข้อเสนอแนะ' : 'Quick Message & Feedback Form'}</span>
                      </h4>
                      <p
                        className={`text-xs mb-3 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {lang === 'th'
                          ? 'ทีมพัฒนาจะตรวจสอบและตอบกลับผ่านช่องทางของคุณอย่างรวดเร็ว'
                          : 'Our development team will respond to your inquiry promptly.'}
                      </p>

                      {isSubmitted ? (
                        <div className="p-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-center space-y-1 animate-fade-in">
                          <div className="flex items-center justify-center text-[#10B981] gap-1.5 font-bold text-sm">
                            <Check className="w-4 h-4" />
                            <span>{lang === 'th' ? 'ได้รับข้อความของคุณเรียบร้อยแล้ว!' : 'Message received successfully!'}</span>
                          </div>
                          <p className="text-xs text-slate-300">
                            {lang === 'th'
                              ? 'รหัสการติดตาม: #EDUEASE-' + Math.floor(100000 + Math.random() * 900000)
                              : 'Tracking Ticket ID: #EDUEASE-' + Math.floor(100000 + Math.random() * 900000)}
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSendMessage} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                {lang === 'th' ? 'ประเภทเรื่อง' : 'Inquiry Category'}
                              </label>
                              <select
                                value={inquiryType}
                                onChange={(e) => setInquiryType(e.target.value)}
                                className={`w-full p-2 rounded-xl text-xs border outline-none ${
                                  isDarkMode
                                    ? 'bg-[#0B132B] border-white/15 text-white focus:border-[#38BDF8]'
                                    : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                                }`}
                              >
                                <option value="question">{lang === 'th' ? 'สอบถามสูตรคำนวณค่าไฟ' : 'Tariff Calculation Question'}</option>
                                <option value="bug">{lang === 'th' ? 'รายงานข้อผิดพลาดในระบบ' : 'Report Bug or Calculation Issue'}</option>
                                <option value="feature">{lang === 'th' ? 'เสนอแนะฟีเจอร์ใหม่' : 'Suggest New Feature'}</option>
                                <option value="other">{lang === 'th' ? 'เรื่องอื่นๆ' : 'Other Inquiries'}</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                                {lang === 'th' ? 'หัวข้อ' : 'Subject'}
                              </label>
                              <input
                                type="text"
                                value={inquirySubject}
                                onChange={(e) => setInquirySubject(e.target.value)}
                                placeholder={lang === 'th' ? 'เช่น ตรวจสอบค่า Ft เดือนล่าสุด' : 'e.g. Verify Ft rate updates'}
                                className={`w-full p-2 rounded-xl text-xs border outline-none ${
                                  isDarkMode
                                    ? 'bg-[#0B132B] border-white/15 text-white focus:border-[#38BDF8]'
                                    : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                                }`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1">
                              {lang === 'th' ? 'รายละเอียด' : 'Message Details'}
                            </label>
                            <textarea
                              rows={3}
                              value={inquiryMessage}
                              onChange={(e) => setInquiryMessage(e.target.value)}
                              placeholder={lang === 'th' ? 'พิมพ์ข้อความที่ต้องการสอบถามที่นี่...' : 'Type your inquiry here...'}
                              required
                              className={`w-full p-2 rounded-xl text-xs border outline-none resize-none ${
                                isDarkMode
                                  ? 'bg-[#0B132B] border-white/15 text-white focus:border-[#38BDF8]'
                                  : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                              }`}
                            />
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#10B981] hover:bg-[#059669] text-white shadow-md shadow-emerald-600/30 transition-all"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>{lang === 'th' ? 'ส่งข้อความถึงทีมงาน' : 'Submit Message'}</span>
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 3: PDPA PRIVACY POLICY SUMMARY */}
                {activeTab === 'pdpa' && (
                  <div className="space-y-3.5 text-xs">
                    <div
                      className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                        isDarkMode
                          ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#34D399]'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      }`}
                    >
                      <Lock className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="font-bold">
                          {lang === 'th'
                            ? 'ความคุ้มครองตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)'
                            : 'Personal Data Protection Act B.E. 2562 (PDPA) Compliance Summary'}
                        </div>
                        <div className="text-[11px] opacity-90 mt-0.5">
                          {lang === 'th'
                            ? 'EduEase Energy ให้ความสำคัญสูงสุดกับความเป็นส่วนตัวและสิทธิในข้อมูลการใช้พลังงานของคุณ'
                            : 'EduEase Energy places the utmost priority on telemetry confidentiality and data privacy.'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        className={`p-3.5 rounded-xl border space-y-1.5 ${
                          isDarkMode
                            ? 'bg-[#0E1838] border-white/10'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="font-bold text-slate-200 dark:text-white flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-[#38BDF8]" />
                          <span>{lang === 'th' ? '1. ข้อมูลที่เราจัดเก็บ' : '1. Data Collected'}</span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {lang === 'th'
                            ? 'จัดเก็บเฉพาะข้อมูลเครื่องใช้ไฟฟ้า (กำลังวัตต์, ชั่วโมงใช้งาน), งบประมาณรายเดือน, และอีเมลสำหรับรับ Daily Energy Digest โดยจัดเก็บใน Local Storage ภายในบราวเซอร์ของคุณเป็นหลัก'
                            : 'We retain appliance wattages, scheduled runtimes, monthly budget caps, and your email address for Daily Digest notifications within your local browser storage.'}
                        </p>
                      </div>

                      <div
                        className={`p-3.5 rounded-xl border space-y-1.5 ${
                          isDarkMode
                            ? 'bg-[#0E1838] border-white/10'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="font-bold text-slate-200 dark:text-white flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#10B981]" />
                          <span>{lang === 'th' ? '2. วัตถุประสงค์ในการใช้' : '2. Purpose of Use'}</span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {lang === 'th'
                            ? 'เพื่อประมวลผลคำนวณบิลค่าไฟ แจ้งเตือนสถิติการใช้งาน และแนะนำเคล็ดลับการประหยัดพลังงานเฉพาะบุคคลให้เกิดความคุ้มค่าสูงสุด'
                            : 'Solely to compute transparent bill estimations, alert anomalous usage, and formulate tailored energy conservation tips.'}
                        </p>
                      </div>

                      <div
                        className={`p-3.5 rounded-xl border space-y-1.5 ${
                          isDarkMode
                            ? 'bg-[#0E1838] border-white/10'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="font-bold text-slate-200 dark:text-white flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                          <span>{lang === 'th' ? '3. ไม่มีการขายข้อมูล' : '3. Zero Data Commercialization'}</span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {lang === 'th'
                            ? 'เราไม่มีนโยบายส่งต่อ จำหน่าย หรือเปิดเผยข้อมูลพฤติกรรมการใช้ไฟหรือข้อมูลส่วนบุคคลใดๆ ให้แก่บริษัทภายนอกเพื่อการโฆษณาเชิงพาณิชย์โดยเด็ดขาด'
                            : 'We strictly never sell, monetize, or transmit your household telemetry or credentials to third-party advertising brokers.'}
                        </p>
                      </div>

                      <div
                        className={`p-3.5 rounded-xl border space-y-1.5 ${
                          isDarkMode
                            ? 'bg-[#0E1838] border-white/10'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="font-bold text-slate-200 dark:text-white flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-[#38BDF8]" />
                          <span>{lang === 'th' ? '4. สิทธิ์ของคุณ (Your Rights)' : '4. User Data Rights'}</span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {lang === 'th'
                            ? 'คุณสามารถขอดู, แก้ไข, ลบข้อมูลทั้งหมด หรือยกเลิกการรับการแจ้งเตือน (Opt-out) ได้ทุกเมื่อผ่านแท็บการแจ้งเตือนและหน้าตั้งค่า'
                            : 'You retain full rights to inspect, update, purge telemetry records, or revoke notification dispatch permissions at any time via Settings.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div
                className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs ${
                  isDarkMode
                    ? 'border-white/10 bg-[#101B3B]/60 text-slate-400'
                    : 'border-slate-100 bg-slate-50 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>
                    {lang === 'th'
                      ? 'ระบบรักษาความปลอดภัยและการเข้ารหัสตามมาตรฐานสากล'
                      : 'Protected with industry-grade data safeguarding standards'}
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-1.5 rounded-xl font-bold border transition-colors ${
                    isDarkMode
                      ? 'border-white/15 bg-white/10 hover:bg-white/20 text-white'
                      : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
