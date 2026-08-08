import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Tv, 
  Home, 
  Briefcase, 
  Factory, 
  HeartPulse, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  Bot,
  Coins,
  ChevronRight
} from 'lucide-react';
import { StoryChapter } from '../../types';

interface StoryModeViewProps {
  chapters: StoryChapter[];
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onCompleteChallenge?: (chapterId: string, challengeId: string) => void;
  onNavigatePage?: (page: any) => void;
}

export const StoryModeView: React.FC<StoryModeViewProps> = ({
  chapters,
  lang,
  isDarkMode,
  onCompleteChallenge,
  onNavigatePage
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>(chapters[0]?.id || 'ch_dorm');

  const activeChapter = chapters.find(c => c.id === activeChapterId) || chapters[0];

  const getChapterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5 text-indigo-500" />;
      case 'Tv': return <Tv className="w-5 h-5 text-purple-500" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-500" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-amber-500" />;
      case 'Factory': return <Factory className="w-5 h-5 text-rose-500" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-teal-500" />;
      default: return <ShieldCheck className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Chapter Selection Banner */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border transition-all shadow-xl relative overflow-hidden ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800' 
          : 'bg-gradient-to-br from-indigo-50/80 via-white to-emerald-50/80 border-indigo-100 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-4 ring-indigo-400/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'เรื่องราวผู้พิทักษ์พลังงาน (Energy Guardian Story)' : 'Energy Guardian Story Mode'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-bold text-xs">
                  RPG Mode
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'th' ? 'สวมบทบาทเป็นผู้พิทักษ์ ช่วยเหลือสถานที่ต่างๆ แก้ไขปัญหากินไฟแฝงและเพิ่มประสิทธิภาพ' : 'Roleplay as Energy Guardian to solve real electricity problems across 6 locations'}
              </p>
            </div>
          </div>
        </div>

        {/* Chapter Steps Timeline Track */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {chapters.map((ch) => {
            const isSelected = ch.id === activeChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => ch.unlocked && setActiveChapterId(ch.id)}
                disabled={!ch.unlocked}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25 scale-[1.02]'
                    : ch.unlocked
                      ? isDarkMode
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-indigo-500/50'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
                      : 'bg-slate-100 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-800 text-slate-400 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[0.65rem] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-200/60 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                  }`}>
                    Ch.{ch.chapterNum}
                  </span>
                  {ch.completed ? (
                    <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-emerald-500'}`} />
                  ) : !ch.unlocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  ) : null}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    {getChapterIcon(ch.icon)}
                    <span className="truncate">{lang === 'th' ? ch.locationNameTh : ch.locationNameEn}</span>
                  </div>
                  <p className={`text-[0.65rem] truncate ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {lang === 'th' ? ch.titleTh : ch.titleEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Chapter Details & Narrative Dialogue */}
      {activeChapter && (
        <motion.div
          key={activeChapter.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 md:p-8 rounded-[2.5rem] border transition-all ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          {/* NPC Dialogue Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-emerald-500/10 border border-indigo-500/20 mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-2xl text-white shadow-md shrink-0">
              🤖
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Voltie AI Mentor & Resident
                </span>
                <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500 font-bold">
                  {lang === 'th' ? activeChapter.locationNameTh : activeChapter.locationNameEn}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 font-medium italic">
                "{lang === 'th' ? activeChapter.dialogueTh : activeChapter.dialogueEn}"
              </p>
            </div>
          </div>

          {/* Chapter Overview & Rewards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-lg font-extrabold font-display text-slate-900 dark:text-white">
                {lang === 'th' ? activeChapter.titleTh : activeChapter.titleEn}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {lang === 'th' ? activeChapter.descriptionTh : activeChapter.descriptionEn}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <span className="text-[0.65rem] font-bold text-slate-400 uppercase">
                {lang === 'th' ? 'รางวัลเมื่อพิชิตด่าน' : 'Chapter Clear Rewards'}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> +{activeChapter.xpReward} XP
                </span>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                  <Coins className="w-4 h-4" /> +{activeChapter.coinReward} Coins
                </span>
              </div>
            </div>
          </div>

          {/* Chapter Challenges Checklist */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs font-display text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'th' ? 'วัตถุประสงค์ภารกิจ (Chapter Objectives)' : 'Chapter Objectives'}
            </h4>

            <div className="space-y-2">
              {activeChapter.challenges.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onCompleteChallenge && onCompleteChallenge(activeChapter.id, c.id)}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    c.completed
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : isDarkMode
                        ? 'bg-slate-800/60 border-slate-700/60 hover:border-indigo-500/40 text-slate-200'
                        : 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                      c.completed ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300 dark:border-slate-600'
                    }`}>
                      {c.completed && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className="text-xs font-bold">{lang === 'th' ? c.textTh : c.textEn}</span>
                  </div>

                  <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                    {c.completed ? (lang === 'th' ? 'เสร็จสิ้น ✓' : 'Done ✓') : (lang === 'th' ? 'ทำภารกิจ' : 'Execute')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
