import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Plus, Tag, Calendar, Sparkles, X, Check } from 'lucide-react';
import { EnergyDiaryNote, InfoDetailMode } from '../../types';

interface EnergyDiaryCardProps {
  diaryNotes: EnergyDiaryNote[];
  mode: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onAddDiaryNote: (note: EnergyDiaryNote) => void;
}

export const EnergyDiaryCard: React.FC<EnergyDiaryCardProps> = ({
  diaryNotes,
  mode,
  lang,
  isDarkMode,
  onAddDiaryNote,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [tag, setTag] = useState<EnergyDiaryNote['tag']>('home_all_day');

  const tagLabels: Record<EnergyDiaryNote['tag'], string> = {
    home_all_day: '🏠 อยู่บ้านทั้งวัน (Home All Day)',
    guests: '👥 มีแขก/เพื่อนมาบ้าน (Guests Visited)',
    ac_heavy: '❄️ เปิดแอร์นานเป็นพิเศษ (Heavy AC)',
    new_appliance: '🔌 ซื้อ/ติดตั้งอุปกรณ์ใหม่ (New Appliance)',
    travel: '✈️ ไม่อยู่บ้าน/ไปเที่ยว (Travel / Away)',
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newNote: EnergyDiaryNote = {
      id: `diary-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      note: noteText,
      tag,
      tagLabelTh: tagLabels[tag]
    };

    onAddDiaryNote(newNote);
    setNoteText('');
    setShowAddForm(false);
  };

  return (
    <div className={`p-6 rounded-[2.5rem] border shadow-sm transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'ไดอารี่พฤติกรรมไฟฟ้า (Energy Diary)' : 'Energy Diary'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'บันทึกบริบทประจำวัน เพื่อให้ AI วิเคราะห์สาเหตุค่าไฟผันผวนได้อย่างแม่นยำ' : 'Log special daily events to help AI explain electricity spikes'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'th' ? 'จดบันทึก' : 'Log Event'}</span>
        </button>
      </div>

      {/* Quick Add Form */}
      {showAddForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleAddNote}
          className="mb-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-3"
        >
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              {lang === 'th' ? 'แท็กเหตุการณ์ (Event Tag)' : 'Event Tag'}
            </label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium outline-none"
            >
              {Object.entries(tagLabels).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              {lang === 'th' ? 'ข้อความบันทึกบริบท (Note Description)' : 'Note Description'}
            </label>
            <input
              type="text"
              required
              placeholder={lang === 'th' ? 'เช่น วันนี้เปิดแอร์ตอนบ่าย 4 ชม. เพราะเพื่อนมาติวหนังสือ' : 'e.g. Friends visited, ran AC 4 hours'}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
            >
              {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white shadow-sm cursor-pointer"
            >
              {lang === 'th' ? 'บันทึกไดอารี่' : 'Save Entry'}
            </button>
          </div>
        </motion.form>
      )}

      {/* Diary Entries List */}
      <div className="space-y-3">
        {diaryNotes.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-extrabold text-[0.68rem]">
                  {item.tagLabelTh || item.tag}
                </span>
                <span className="text-[0.68rem] text-slate-400 font-mono font-bold">{item.date}</span>
              </div>
              <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {item.note}
              </p>
            </div>

            <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 text-[0.65rem] font-bold shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Linked</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
