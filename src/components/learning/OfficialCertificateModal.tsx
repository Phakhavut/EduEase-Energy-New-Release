import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  X, 
  Printer, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  Download, 
  Copy, 
  Check,
  Zap,
  Building,
  GraduationCap
} from 'lucide-react';
import { CertificationTier, UserCertificationProgress } from '../../types';

interface OfficialCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certProgress: UserCertificationProgress;
  userName?: string;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const OfficialCertificateModal: React.FC<OfficialCertificateModalProps> = ({
  isOpen,
  onClose,
  certProgress,
  userName = 'ผู้ใช้งาน EduEase Energy',
  lang,
  isDarkMode
}) => {
  const [copied, setCopied] = React.useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const currentTier = certProgress.currentTier;

  if (!isOpen) return null;

  const issueDate = new Date().toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const credentialId = `EE-CERT-${currentTier.badgeCode}-${new Date().getFullYear()}-0942`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 rounded-[32px] border border-amber-500/30 shadow-2xl text-slate-100 p-4 sm:p-8 space-y-6"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black font-display text-white">
                  {lang === 'th' ? 'ใบประกาศนียบัตรดิจิทัลมาตรฐานพลังงาน' : 'Official Digital Energy Certificate'}
                </h3>
                <p className="text-xs text-amber-400/80 font-mono">
                  {credentialId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">{lang === 'th' ? 'พิมพ์ / บันทึก PDF' : 'Print / PDF'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PRINTABLE CERTIFICATE CONTAINER */}
          <div 
            ref={certificateRef}
            id="printable-certificate"
            className="relative p-6 sm:p-12 rounded-[28px] bg-gradient-to-b from-[#10141f] via-[#0d101a] to-[#0a0c14] border-2 border-amber-500/50 shadow-2xl overflow-hidden text-center space-y-8"
          >
            {/* Guilloché / Classical Decorative Borders */}
            <div className="absolute inset-2 sm:inset-3 border border-amber-500/25 rounded-[22px] pointer-events-none" />
            <div className="absolute inset-4 sm:inset-5 border border-dashed border-amber-500/15 rounded-[18px] pointer-events-none" />

            {/* Corner Emblems */}
            <div className="absolute top-6 left-6 text-amber-500/40 text-xl font-serif">✦</div>
            <div className="absolute top-6 right-6 text-amber-500/40 text-xl font-serif">✦</div>
            <div className="absolute bottom-6 left-6 text-amber-500/40 text-xl font-serif">✦</div>
            <div className="absolute bottom-6 right-6 text-amber-500/40 text-xl font-serif">✦</div>

            {/* Background Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Zap className="w-96 h-96 text-amber-400" />
            </div>

            {/* Certificate Top Seal */}
            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-black tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                {lang === 'th' ? 'สถาบันพัฒนาสมรรถนะพลังงานและไฟฟ้าอัจฉริยะ' : 'EDUEASE ENERGY & ELECTRICAL COMPETENCY BOARD'}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 uppercase">
                {lang === 'th' ? 'ประกาศนียบัตรรับรองสมรรถนะ' : 'Certificate of Energy Competence'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                {lang === 'th' 
                  ? 'เอกสารฉบับนี้รับรองว่าบุคคลดังระบุนามต่อไปนี้ ได้ผ่านการศึกษา อบรม และทดสอบวัดผลตามเกณฑ์มาตรฐานวิชาชีพ' 
                  : 'This is to officially certify that the designated candidate has successfully completed and verified all requirements for'}
              </p>
            </div>

            {/* Recipient Name Box */}
            <div className="py-2 space-y-2 relative z-10">
              <div className="text-xs uppercase tracking-widest font-extrabold text-amber-500/80">
                {lang === 'th' ? 'มอบให้แก่ (Awarded To)' : 'Conferred Upon'}
              </div>
              <div className="text-2xl sm:text-4xl font-black font-display text-white border-b-2 border-amber-500/40 pb-3 max-w-lg mx-auto">
                {userName}
              </div>
            </div>

            {/* Certified Level Badge & Title */}
            <div className="space-y-4 max-w-xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-slate-800/90 border border-amber-500/40 shadow-lg">
                <span className="text-3xl sm:text-4xl">{currentTier.icon}</span>
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                    {currentTier.sealLabel} • TIER {currentTier.tierLevel}
                  </span>
                  <span className="text-base sm:text-xl font-black text-white block">
                    {lang === 'th' ? currentTier.roleTitleTh : currentTier.roleTitleEn}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                {lang === 'th' ? currentTier.summaryTh : currentTier.summaryEn}
              </p>
            </div>

            {/* Verified Competencies Matrix */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-2.5 max-w-2xl mx-auto relative z-10">
              <div className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {lang === 'th' ? 'สมรรถนะที่ผ่านการตรวจสอบและรับรองผล:' : 'Verified Key Competencies:'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-semibold">
                {(lang === 'th' ? currentTier.keyCompetenciesTh : currentTier.keyCompetenciesEn).map((comp, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="leading-snug">{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer with Signatures & QR Verification */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              {/* Issue Date & ID */}
              <div className="text-left space-y-1">
                <div className="text-[11px] font-bold text-slate-400">
                  <span className="text-slate-500">{lang === 'th' ? 'วันที่ออกเอกสาร:' : 'Issue Date:'}</span> {issueDate}
                </div>
                <div className="text-[11px] font-mono font-bold text-amber-400">
                  <span className="text-slate-500">ID:</span> {credentialId}
                </div>
              </div>

              {/* Official Gold Seal Stamp */}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-amber-400/80 bg-amber-500/10 flex flex-col items-center justify-center p-1 text-center rotate-[-8deg] shadow-lg shadow-amber-500/10">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-[7px] font-black uppercase tracking-tighter text-amber-300">
                  OFFICIAL SEAL
                </span>
                <span className="text-[6px] font-mono text-amber-400">
                  VERIFIED
                </span>
              </div>

              {/* Authorized Registrar Signature */}
              <div className="text-right space-y-1">
                <div className="font-serif italic text-amber-300 text-lg font-bold">
                  EduEase Board Registry
                </div>
                <div className="text-[10px] font-extrabold uppercase text-slate-400 border-t border-slate-700 pt-1">
                  {lang === 'th' ? 'ประธานคณะกรรมการทดสอบมาตรฐาน' : 'Director of Energy Standardization'}
                </div>
              </div>
            </div>
          </div>

          {/* Action Tools Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleCopyId}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? (lang === 'th' ? 'คัดลอกรหัสสำเร็จแล้ว!' : 'ID Copied!') : (lang === 'th' ? 'คัดลอกรหัส Credential ID' : 'Copy Credential ID')}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                {lang === 'th' ? 'ปิดหน้าต่างใบรับรอง' : 'Done & Return'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
