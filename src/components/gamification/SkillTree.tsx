import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Zap, 
  Activity, 
  TrendingUp, 
  Receipt, 
  Clock, 
  Snowflake, 
  Power, 
  Sun, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  HelpCircle,
  X,
  Award
} from 'lucide-react';
import { SkillTreeNode, KnowledgeLevelType } from '../../types';

interface SkillTreeProps {
  nodes: SkillTreeNode[];
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onCompleteNode?: (nodeId: string) => void;
}

export const SkillTree: React.FC<SkillTreeProps> = ({
  nodes,
  lang,
  isDarkMode,
  onCompleteNode
}) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [quizNode, setQuizNode] = useState<SkillTreeNode | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const completedCount = nodes.filter(n => n.completed).length;
  const totalCount = nodes.length;
  const completionPct = Math.round((completedCount / totalCount) * 100);

  // Compute Knowledge Level based on completed node count
  const getKnowledgeLevel = (): { level: KnowledgeLevelType; badgeTh: string; badgeEn: string } => {
    if (completedCount >= 8) return { level: 'Master', badgeTh: 'ผู้เชี่ยวชาญสูงสุด (Master)', badgeEn: 'Master' };
    if (completedCount >= 6) return { level: 'Expert', badgeTh: 'ผู้เชี่ยวชาญ (Expert)', badgeEn: 'Expert' };
    if (completedCount >= 4) return { level: 'Analyst', badgeTh: 'นักวิเคราะห์ (Analyst)', badgeEn: 'Analyst' };
    if (completedCount >= 2) return { level: 'Explorer', badgeTh: 'นักสำรวจ (Explorer)', badgeEn: 'Explorer' };
    return { level: 'Novice', badgeTh: 'ผู้เริ่มต้น (Novice)', badgeEn: 'Novice' };
  };

  const knowledge = getKnowledgeLevel();

  const getBranchIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-blue-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-purple-500" />;
      case 'Receipt': return <Receipt className="w-5 h-5 text-teal-500" />;
      case 'Clock': return <Clock className="w-5 h-5 text-indigo-500" />;
      case 'Snowflake': return <Snowflake className="w-5 h-5 text-cyan-500" />;
      case 'Power': return <Power className="w-5 h-5 text-emerald-500" />;
      case 'Sun': return <Sun className="w-5 h-5 text-amber-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-rose-500" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-500" />;
    }
  };

  const handleOpenQuiz = (node: SkillTreeNode) => {
    if (node.unlocked && node.quizQuestionTh) {
      setQuizNode(node);
      setSelectedOption(null);
      setQuizSubmitted(false);
      setIsCorrect(false);
    }
  };

  const handleSubmitQuiz = () => {
    if (quizNode && selectedOption !== null) {
      const correct = selectedOption === quizNode.correctIndex;
      setQuizSubmitted(true);
      setIsCorrect(correct);
      if (correct && onCompleteNode) {
        onCompleteNode(quizNode.id);
      }
    }
  };

  const filteredNodes = selectedBranch === 'all' 
    ? nodes 
    : nodes.filter(n => n.branch === selectedBranch);

  return (
    <div className={`p-6 md:p-8 rounded-[2.5rem] border transition-all shadow-xl relative overflow-hidden ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800' 
        : 'bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/80 border-teal-100 shadow-sm'
    }`}>
      {/* Skill Tree Header & Knowledge Level Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 ring-4 ring-teal-400/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold font-display text-slate-900 dark:text-white">
                {lang === 'th' ? 'ต้นไม้ทักษะพลังงาน (Skill & Learning Tree)' : 'Skill & Learning Tree'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-bold text-xs">
                {knowledge.level} Level
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {lang === 'th' ? 'ปลดล็อกโหนดความรู้ผ่านการตอบแบบทดสอบสั้นเพื่อยกระดับ Knowledge Level' : 'Unlock knowledge nodes to boost your Knowledge Level'}
            </p>
          </div>
        </div>

        {/* Knowledge Level Badge & Progress */}
        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-teal-200/80 dark:border-slate-700/80 space-y-1.5 w-full md:w-64">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-500">{lang === 'th' ? 'ระดับความรู้:' : 'Knowledge:'}</span>
            <span className="text-teal-600 dark:text-teal-400 font-extrabold">{lang === 'th' ? knowledge.badgeTh : knowledge.badgeEn}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="text-[0.65rem] text-right font-bold text-slate-400 font-mono">
            {completedCount} / {totalCount} Nodes
          </div>
        </div>
      </div>

      {/* Branch Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'basics', 'bills', 'appliances', 'habits', 'solar', 'ai'].map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBranch(b)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
              selectedBranch === b
                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {b === 'all' ? (lang === 'th' ? 'ทั้งหมด (All)' : 'All') : b}
          </button>
        ))}
      </div>

      {/* Skill Graph Node Network Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNodes.map((node) => (
          <motion.div
            key={node.id}
            whileHover={{ y: node.unlocked ? -2 : 0 }}
            onClick={() => handleOpenQuiz(node)}
            className={`p-5 rounded-3xl border transition-all relative cursor-pointer ${
              node.completed
                ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm'
                : node.unlocked
                  ? isDarkMode
                    ? 'bg-slate-800/80 border-slate-700 hover:border-teal-400/60'
                    : 'bg-white border-slate-200 hover:border-teal-300 shadow-sm'
                  : 'bg-slate-100/60 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                {getBranchIcon(node.icon)}
              </div>

              <div className="flex items-center gap-1">
                {node.completed ? (
                  <span className="flex items-center gap-1 text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {lang === 'th' ? 'เสร็จสมบูรณ์' : 'Mastered'}
                  </span>
                ) : !node.unlocked ? (
                  <span className="flex items-center gap-1 text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500">
                    <Lock className="w-3.5 h-3.5" /> Lv.{node.levelRequired} Lock
                  </span>
                ) : (
                  <span className="text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400">
                    +{node.xpReward} XP Quiz
                  </span>
                )}
              </div>
            </div>

            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
              {lang === 'th' ? node.titleTh : node.titleEn}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2">
              {lang === 'th' ? node.descTh : node.descEn}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quiz Dialog Modal: Mobile Bottom Sheet (<768px) vs Desktop Dialog (>=768px) */}
      <AnimatePresence>
        {quizNode && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-950/70 backdrop-blur-md transition-all">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className={`w-full md:max-w-[640px] h-[88vh] md:h-auto md:max-h-[85vh] rounded-t-[28px] md:rounded-[28px] border shadow-2xl flex flex-col overflow-hidden relative ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'
              }`}
            >
              {/* Mobile Drag Handle */}
              <div className="md:hidden pt-3 pb-1 flex justify-center shrink-0">
                <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              </div>

              {/* Header */}
              <div className="p-6 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">
                      Skill Quiz • {quizNode.branch}
                    </span>
                    <h3 className="text-base font-black font-display text-slate-900 dark:text-white line-clamp-1">
                      {lang === 'th' ? quizNode.titleTh : quizNode.titleEn}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setQuizNode(null)}
                  className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Scrollable Body (24px padding & 24px vertical spacing) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 font-extrabold text-xs">
                    คำถามทบทวนความรู้
                  </span>
                  <h2 className="text-xl md:text-2xl font-black font-display leading-snug">
                    {quizNode.quizQuestionTh}
                  </h2>
                </div>

                {/* Quiz Options */}
                <div className="space-y-3">
                  {quizNode.quizOptionsTh?.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => !quizSubmitted && setSelectedOption(idx)}
                        disabled={quizSubmitted}
                        className={`w-full p-4 rounded-[20px] border text-left font-bold text-base transition-all flex items-center justify-between min-h-[56px] cursor-pointer ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-500 shadow-md'
                            : isDarkMode
                              ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-teal-500/40'
                              : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-teal-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                            isSelected ? 'bg-white text-teal-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Result */}
                {quizSubmitted && (
                  <div className={`p-5 rounded-[20px] text-center font-extrabold text-sm ${
                    isCorrect ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                  }`}>
                    {isCorrect 
                      ? (lang === 'th' ? '🎉 ถูกต้อง! คุณได้รับ +50 XP และ +20 Coins พร้อมปลดล็อก Skill Node นี้แล้ว!' : '🎉 Correct! +50 XP and +20 Coins earned!')
                      : (lang === 'th' ? '💡 เกือบถูกแล้ว! ลองทบทวนเนื้อหาและตอบใหม่อีกครั้งนะครับ' : '💡 Almost there! Give it another try!')
                    }
                  </div>
                )}
              </div>

              {/* Bottom Sticky Action Area (56px Touch Target) */}
              <div className="p-4 px-6 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                {!quizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={selectedOption === null}
                    className="w-full h-[56px] rounded-2xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-extrabold text-base shadow-lg shadow-teal-500/25 transition-all cursor-pointer"
                  >
                    {lang === 'th' ? 'ส่งคำตอบ (Submit Answer) ✓' : 'Submit Answer ✓'}
                  </button>
                ) : (
                  <button
                    onClick={() => setQuizNode(null)}
                    className="w-full h-[56px] rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-base hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
