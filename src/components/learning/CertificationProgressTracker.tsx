import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight, 
  Layers, 
  Zap, 
  Lock, 
  BookOpen, 
  Star, 
  Info,
  ChevronDown,
  ChevronUp,
  Cpu,
  FileCheck,
  Building,
  Target
} from 'lucide-react';
import { CertificationTier, UserCertificationProgress, LearningPath } from '../../types';
import { CERTIFICATION_TIERS } from '../../data/certificationData';
import { OfficialCertificateModal } from './OfficialCertificateModal';

interface CertificationProgressTrackerProps {
  certProgress: UserCertificationProgress;
  onSelectDifficultyFilter?: (filter: any) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onOpenLesson?: (lessonId: string) => void;
}

export const CertificationProgressTracker: React.FC<CertificationProgressTrackerProps> = ({
  certProgress,
  onSelectDifficultyFilter,
  lang,
  isDarkMode,
  onOpenLesson
}) => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedInspectTier, setSelectedInspectTier] = useState<CertificationTier>(certProgress.currentTier);
  const [showAllTiersDrawer, setShowAllTiersDrawer] = useState(false);

  const { currentTier, nextTier, completedCount, totalCount, completionPercent, lessonsToNextTier } = certProgress;

  return (
    <div className="space-y-6">
      {/* 1. HERO CERTIFICATION STATUS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative p-6 sm:p-8 rounded-[32px] border shadow-xl overflow-hidden space-y-6 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border-amber-500/30' 
            : 'bg-gradient-to-br from-amber-500/10 via-teal-500/5 to-white border-amber-200/70 shadow-amber-500/5'
        }`}
      >
        {/* Glow ambient background effect */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{lang === 'th' ? 'ระดับใบรับรองวิชาชีพ (Certification Level)' : 'Energy Certification Track'}</span>
            </div>

            {/* Certification Points Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-black text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{certProgress.certificationPoints?.toLocaleString() || 0} CP</span>
              {certProgress.bonusQuizPointsEarned > 0 && (
                <span className="text-[10px] opacity-80 font-sans font-bold">
                  (+{certProgress.bonusQuizPointsEarned} Quiz Bonus)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>{lang === 'th' ? 'ดูใบประกาศนียบัตรทางการ' : 'View Official Certificate'}</span>
              <Sparkles className="w-3 h-3 text-amber-200" />
            </button>
          </div>
        </div>

        {/* Center Current Level Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          <div className="lg:col-span-8 flex items-start gap-4 sm:gap-6">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-[28px] ${currentTier.badgeBg} border-2 ${currentTier.badgeBorder} flex items-center justify-center text-4xl sm:text-5xl shadow-lg shrink-0`}>
              {currentTier.icon}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-[11px] font-black uppercase">
                  {currentTier.sealLabel}
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  {currentTier.badgeCode}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">
                {lang === 'th' ? currentTier.roleTitleTh : currentTier.roleTitleEn}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
                {lang === 'th' ? currentTier.summaryTh : currentTier.summaryEn}
              </p>
            </div>
          </div>

          {/* Stats Box */}
          <div className="lg:col-span-4 p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm space-y-3 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              <span>{lang === 'th' ? 'ความคืบหน้ารวม' : 'Overall Completion'}</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black text-sm">{completionPercent}%</span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500 rounded-full"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {lang === 'th' ? `ผ่านแล้ว ${completedCount} จาก ${totalCount} บทเรียน` : `${completedCount} of ${totalCount} Lessons Done`}
              </span>
            </div>

            {nextTier && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  {lang === 'th'
                    ? `จบอีก ${lessonsToNextTier} บทเรียน เพื่อเลื่อนระดับเป็น Tier ${nextTier.tierLevel}!`
                    : `${lessonsToNextTier} more lessons to unlock Tier ${nextTier.tierLevel}!`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2. FIVE-TIER MILESTONE ROADMAP */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-500" />
              {lang === 'th' ? 'เส้นทางบันได 5 ขั้นสู่วิชาชีพพลังงาน (Career & Certification Roadmap)' : '5-Tier Energy Career Roadmap'}
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              {lang === 'th' ? 'คลิกที่ขั้นเพื่อดูทักษะ' : 'Click a tier to inspect'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {CERTIFICATION_TIERS.map((tier) => {
              const isUnlocked = completedCount >= tier.requiredLessons;
              const isCurrent = currentTier.id === tier.id;
              const isSelected = selectedInspectTier.id === tier.id;

              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedInspectTier(tier)}
                  className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'ring-2 ring-amber-500 bg-amber-500/10 border-amber-500/50 shadow-md'
                      : isCurrent
                        ? 'bg-emerald-500/10 border-emerald-500/40'
                        : isUnlocked
                          ? 'bg-slate-100/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                          : 'bg-slate-100/40 dark:bg-slate-800/40 border-dashed border-slate-300 dark:border-slate-700/60 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{tier.icon}</span>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>

                  <div className="mt-2 space-y-0.5">
                    <div className="text-[10px] font-black uppercase text-slate-400">
                      Tier {tier.tierLevel} • {tier.requiredLessons === 0 ? 'Start' : `${tier.requiredLessons}+`}
                    </div>
                    <div className={`text-xs font-black truncate ${isCurrent ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {lang === 'th' ? tier.titleTh.split(':')[1] || tier.titleTh : tier.titleEn.split(':')[1] || tier.titleEn}
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="mt-1.5 py-0.5 px-2 rounded-md bg-emerald-500 text-white font-black text-[9px] text-center uppercase tracking-wider">
                      {lang === 'th' ? 'ระดับปัจจุบัน' : 'Current'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Tier Quick Inspector */}
        {selectedInspectTier && (
          <motion.div
            key={selectedInspectTier.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3 relative z-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedInspectTier.icon}</span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white">
                    {lang === 'th' ? selectedInspectTier.roleTitleTh : selectedInspectTier.roleTitleEn}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {selectedInspectTier.badgeCode} • {lang === 'th' ? `เกณฑ์: สำเร็จ ${selectedInspectTier.requiredLessons} บทเรียนขึ้นไป` : `Requirement: ${selectedInspectTier.requiredLessons}+ Completed Lessons`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {completedCount >= selectedInspectTier.requiredLessons ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {lang === 'th' ? 'ผ่านเกณฑ์แล้ว ✓' : 'Achieved ✓'}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-black text-xs flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    {lang === 'th' ? `ขาดอีก ${selectedInspectTier.requiredLessons - completedCount} บทเรียน` : `${selectedInspectTier.requiredLessons - completedCount} more needed`}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[11px] font-black uppercase text-teal-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {lang === 'th' ? 'สมรรถนะวิชาชีพที่ได้รับ:' : 'Certified Competencies:'}
                </span>
                <ul className="space-y-1 text-slate-300">
                  {(lang === 'th' ? selectedInspectTier.keyCompetenciesTh : selectedInspectTier.keyCompetenciesEn).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-teal-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[11px] font-black uppercase text-amber-400 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> {lang === 'th' ? 'ขอบเขตงานที่ได้รับสิทธิรับรอง:' : 'Authorized Scope of Practice:'}
                </span>
                <ul className="space-y-1 text-slate-300">
                  {(lang === 'th' ? selectedInspectTier.authorizedScopesTh : selectedInspectTier.authorizedScopesEn).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* 3. 5-DOMAIN COMPETENCY BREAKDOWN */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-500" />
            {lang === 'th' ? 'ความเชี่ยวชาญ 5 ด้านหลัก (Domain Mastery Matrix)' : '5 Core Electrical Domain Matrix'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {Object.entries(certProgress.categoryBreakdown).map(([key, domain]) => {
            const isCompleted = domain.completed === domain.total;

            return (
              <div
                key={key}
                className={`p-4 rounded-2xl border transition-all space-y-3 ${
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : isDarkMode
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">
                    {lang === 'th' ? domain.labelTh : domain.labelEn}
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">
                    {domain.percent}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${domain.percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span>{lang === 'th' ? `ผ่าน ${domain.completed}/${domain.total} บท` : `${domain.completed}/${domain.total} Done`}</span>
                  {isCompleted ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {lang === 'th' ? 'เชี่ยวชาญ' : 'Mastered'}
                    </span>
                  ) : (
                    <span className="text-amber-500">{lang === 'th' ? 'กำลังเรียน' : 'In Progress'}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Certificate Modal */}
      <OfficialCertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        certProgress={certProgress}
        lang={lang}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
