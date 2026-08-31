import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Coins, 
  ArrowRight, 
  Building2,
  Check
} from 'lucide-react';
import { INITIAL_POWER_CHALLENGES, PowerChallengeData } from '../../../data/cityJourneyData';
import { PowerProblemIllustration, VoltieGuideIllustration } from './GreenCityVisualAssets';

interface PowerChallengeProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onCompleteChallenge?: (creditReward: number, unlocksAssetId?: string) => void;
  onNavigateToCity?: () => void;
  onBackToCity?: () => void;
}

export const PowerChallenge: React.FC<PowerChallengeProps> = ({
  lang,
  isDarkMode,
  onCompleteChallenge,
  onNavigateToCity,
  onBackToCity
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState<boolean>(false);

  const handleReturnToCity = () => {
    if (onBackToCity) onBackToCity();
    else if (onNavigateToCity) onNavigateToCity();
  };

  const challenge: PowerChallengeData = INITIAL_POWER_CHALLENGES[activeChallengeIndex] || INITIAL_POWER_CHALLENGES[0];

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return;
    setIsAnswerSubmitted(true);

    const chosen = challenge.options.find(o => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      if (onCompleteChallenge) {
        onCompleteChallenge(challenge.creditReward, challenge.unlocksAssetId);
      }
      setIsChallengeCompleted(true);
    }
  };

  const handleNextChallenge = () => {
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsChallengeCompleted(false);
    if (activeChallengeIndex + 1 < INITIAL_POWER_CHALLENGES.length) {
      setActiveChallengeIndex(prev => prev + 1);
    } else {
      setActiveChallengeIndex(0);
    }
  };

  const chosenOption = challenge.options.find(o => o.id === selectedOptionId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className={`p-6 rounded-[2rem] border shadow-xl relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/60 border-purple-500/30' 
          : 'bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-500 text-white border-transparent'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md shrink-0">
              <PowerProblemIllustration className="w-16 h-16 drop-shadow-lg" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm inline-block mb-1.5">
                {lang === 'th' ? '⚡ ด่านแก้ปัญหาพลังงาน' : '⚡ Live Power Challenge'}
              </span>
              <h2 className="text-xl md:text-2xl font-black font-display leading-tight">
                {lang === 'th' ? challenge.titleTh : challenge.titleEn}
              </h2>
              <p className="text-xs md:text-sm text-purple-100 mt-1 max-w-lg">
                {lang === 'th' ? challenge.problemScenarioTh : challenge.problemScenarioEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow-md shrink-0">
            <Coins className="w-4 h-4" />
            <span>+{challenge.creditReward} Eco Credits</span>
          </div>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className={`p-6 md:p-8 rounded-[2rem] border shadow-xl transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-black font-display">
              {lang === 'th' ? challenge.questionTh : challenge.questionEn}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'เลือกคำตอบที่ช่วยลดการสูญเสียพลังงานได้ดีที่สุด' : 'Select the optimal efficiency solution'}
            </p>
          </div>
        </div>

        {/* Options Grid */}
        <div className="space-y-3">
          {challenge.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let optionStyle = isDarkMode
              ? 'bg-slate-800/60 border-slate-700 hover:border-purple-400 text-white'
              : 'bg-slate-50 border-slate-200 hover:border-purple-400 text-slate-900';

            if (isAnswerSubmitted) {
              if (opt.isCorrect) {
                optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
              } else if (isSelected && !opt.isCorrect) {
                optionStyle = 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 font-bold';
              }
            } else if (isSelected) {
              optionStyle = 'bg-purple-500/15 border-purple-500 text-purple-700 dark:text-purple-300 font-bold ring-2 ring-purple-500/30';
            }

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${optionStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-sm font-medium">
                    {lang === 'th' ? opt.textTh : opt.textEn}
                  </span>
                </div>

                <div className="shrink-0">
                  {isAnswerSubmitted && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  )}
                  {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )}
                  {!isAnswerSubmitted && (
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-purple-500 bg-purple-500 text-white' : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback Section */}
        <AnimatePresence>
          {isAnswerSubmitted && chosenOption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-2xl border ${
                chosenOption.isCorrect 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-200' 
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-800 dark:text-amber-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <VoltieGuideIllustration className="w-10 h-10 shrink-0 mt-0.5" mood={chosenOption.isCorrect ? 'celebrating' : 'thinking'} />
                <div>
                  <h4 className="font-extrabold text-sm mb-1">
                    {chosenOption.isCorrect 
                      ? (lang === 'th' ? '🎉 ยอดเยี่ยมมาก! คำตอบถูกต้อง' : '🎉 Excellent! Correct Solution')
                      : (lang === 'th' ? '💡 คำอธิบายเพิ่มเติม' : '💡 Explanation')}
                  </h4>
                  <p className="text-xs leading-relaxed">
                    {lang === 'th' ? chosenOption.explanationTh : chosenOption.explanationEn}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleReturnToCity}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'th' ? 'กลับไปที่เมืองของฉัน' : 'Back to My City'}</span>
          </button>

          {!isAnswerSubmitted ? (
            <button
              disabled={!selectedOptionId}
              onClick={handleSubmitAnswer}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                selectedOptionId
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/25 active:scale-95'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed shadow-none'
              }`}
            >
              <span>{lang === 'th' ? 'ส่งคำตอบ & รับเครดิต' : 'Submit & Claim Credits'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNextChallenge}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{lang === 'th' ? 'ลองด่านถัดไป' : 'Try Another Challenge'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
