import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Sparkles, 
  X, 
  Calendar, 
  ArrowRight,
  BrainCircuit,
  Coins,
  Zap
} from 'lucide-react';
import { SmartGoal, InfoDetailMode } from '../../types';

interface GoalTrackerCardProps {
  goals: SmartGoal[];
  mode: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onAddGoal: (goal: SmartGoal) => void;
  onToggleGoalComplete: (id: string) => void;
}

export const GoalTrackerCard: React.FC<GoalTrackerCardProps> = ({
  goals,
  mode,
  lang,
  isDarkMode,
  onAddGoal,
  onToggleGoalComplete,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [targetType, setTargetType] = useState<SmartGoal['targetType']>('bill_limit');
  const [targetValue, setTargetValue] = useState(1500);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newGoal: SmartGoal = {
      id: `goal-${Date.now()}`,
      titleTh: title,
      titleEn: title,
      targetType,
      targetValue: Number(targetValue),
      currentValue: 0,
      unitTh: targetType === 'bill_limit' ? 'บาท' : targetType === 'ac_cut' ? '%' : 'วัน',
      unitEn: targetType === 'bill_limit' ? 'THB' : targetType === 'ac_cut' ? '%' : 'days',
      startDate: new Date().toISOString().slice(0, 10),
      targetDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().slice(0, 10),
      successProbability: 85,
      coachingTipTh: 'ตั้งเป้าหมายสำเร็จแล้ว! Voltie AI จะช่วยคอยติดตามความก้าวหน้าและเตือนเมื่อเข้าใกล้เป้าหมาย',
      coachingTipEn: 'Goal created! Voltie AI will track your daily progress and send helpful tips.',
      completed: false
    };

    onAddGoal(newGoal);
    setTitle('');
    setShowAddModal(false);
  };

  return (
    <div className={`p-6 rounded-[2.5rem] border shadow-sm transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'เป้าหมายและภารกิจประหยัดไฟ (Goal Tracker)' : 'Energy Saving Goals'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'ตั้งเป้าหมายส่วนตัวและติดตามความก้าวหน้าพร้อม AI Coaching' : 'Set personal saving targets with AI coaching guidance'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'th' ? 'เพิ่มเป้าหมาย' : 'New Goal'}</span>
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 md:p-5 rounded-2xl border transition-all ${
                goal.completed
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : isDarkMode
                    ? 'bg-slate-800/60 border-slate-700/60'
                    : 'bg-slate-50/80 border-slate-200/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleGoalComplete(goal.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      goal.completed
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : isDarkMode
                          ? 'border-slate-600 text-slate-400 hover:border-emerald-500 hover:text-emerald-500'
                          : 'border-slate-300 text-slate-400 hover:border-emerald-500 hover:text-emerald-500'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>

                  <div>
                    <h4 className={`font-extrabold text-sm md:text-base font-display ${goal.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                      {lang === 'th' ? goal.titleTh : goal.titleEn}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span>{goal.currentValue} / {goal.targetValue} {lang === 'th' ? goal.unitTh : goal.unitEn}</span>
                      <span>•</span>
                      <span className="text-emerald-500 font-bold">{goal.successProbability}% {lang === 'th' ? 'โอกาสสำเร็จ' : 'Probability'}</span>
                    </div>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full font-extrabold text-xs font-mono ${
                  pct >= 100 ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}>
                  {pct}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8 }}
                  className="bg-emerald-500 h-full rounded-full"
                />
              </div>

              {/* AI Coaching Feedback */}
              {mode !== 'simple' && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2">
                  <BrainCircuit className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>AI Advice:</strong> {lang === 'th' ? goal.coachingTipTh : goal.coachingTipEn}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md p-6 rounded-[2.5rem] border shadow-2xl relative ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-extrabold text-lg font-display flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <span>{lang === 'th' ? 'สร้างเป้าหมายใหม่' : 'Create New Goal'}</span>
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleCreateGoal} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                    {lang === 'th' ? 'ชื่อเป้าหมาย (Goal Title)' : 'Goal Title'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'th' ? 'เช่น คุมค่าไฟให้ต่ำกว่า 1,400 บาท' : 'e.g. Cut AC runtime by 15%'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                    {lang === 'th' ? 'ประเภทเป้าหมาย (Category)' : 'Target Category'}
                  </label>
                  <select
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium outline-none"
                  >
                    <option value="bill_limit">{lang === 'th' ? 'จำกัดงบประมาณค่าไฟ (THB Limit)' : 'Bill Limit (THB)'}</option>
                    <option value="ac_cut">{lang === 'th' ? 'ลดการใช้แอร์ (%)' : 'Reduce AC Usage (%)'}</option>
                    <option value="under_budget_days">{lang === 'th' ? 'รักษาวันไม่งบพุ่ง (Days)' : 'Under Budget Days'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                    {lang === 'th' ? 'ค่าเป้าหมาย (Target Value)' : 'Target Value'}
                  </label>
                  <input
                    type="number"
                    required
                    value={targetValue}
                    onChange={(e) => setTargetValue(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    {lang === 'th' ? 'สร้างเป้าหมาย' : 'Save Goal'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
