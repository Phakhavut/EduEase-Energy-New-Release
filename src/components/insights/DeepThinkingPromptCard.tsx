import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Send, Loader2, Zap, BookOpen, Lightbulb, ChevronRight } from 'lucide-react';
import { InfoDetailMode } from '../../types';

interface DeepThinkingPromptCardProps {
  mode: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  gridContext?: any;
}

export const DeepThinkingPromptCard: React.FC<DeepThinkingPromptCardProps> = ({
  mode,
  lang,
  isDarkMode,
  gridContext,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [modelSource, setModelSource] = useState<string | null>(null);

  const sampleQuestions = [
    'คำนวณความคุ้มค่าการติด Solar Cell 3kW vs เปลี่ยนแอร์ Inverter 2 เครื่อง',
    'เปรียบเทียบอัตรา TOU vs อัตราก้าวหน้า 1.1.2 สำหรับบ้านพักอาศัย',
    'ทำอย่างไรให้ Power Factor (PF) สูงกว่า 0.95 เพื่อลดกำลังสูญเสีย reactive power'
  ];

  const handleAskThinkingModel = async (selectedQuery?: string) => {
    const q = selectedQuery || query;
    if (!q.trim() || loading) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/ai/deep-insight-thinking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptQuery: q,
          gridContext
        })
      });

      const data = await res.json();
      setResponse(data.response || 'ไม่สามารถรับคำตอบได้ในขณะนี้');
      setModelSource(data.source || 'gemini-3.1-pro-preview-thinking-high');
    } catch (err) {
      console.error('Thinking model request failed:', err);
      setResponse('เกิดข้อผิดพลาดในการเชื่อมต่อกับ High-Reasoning AI Engine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 rounded-[2.5rem] border shadow-sm transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base md:text-lg font-display text-slate-900 dark:text-white">
                {lang === 'th' ? 'ถามวิศวกร AI ด้วย High-Reasoning Deep Thinking' : 'Deep Thinking AI Engineer'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 text-[0.65rem] font-black font-mono border border-purple-500/30">
                Gemini 3.1 Pro (Thinking: HIGH)
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'ประมวลผลความคิดเชิงลึก วิเคราะห์สูตรคำนวณทางวิศวกรรมไฟฟ้ารายละเอียดสูง' : 'Deep step-by-step reasoning for complex electrical engineering & tariff queries'}
            </p>
          </div>
        </div>
      </div>

      {/* Input Row */}
      <div className="space-y-3 mb-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder={lang === 'th' ? 'พิมพ์คำถามเชิงวิศวกรรม หรือการคำนวณทางไฟฟ้าที่ซับซ้อน...' : 'Ask a complex electrical engineering or tariff query...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskThinkingModel()}
            className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs md:text-sm font-medium outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => handleAskThinkingModel()}
            disabled={loading || !query.trim()}
            className="absolute right-2 p-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white disabled:opacity-40 transition-all cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>

        {/* Sample Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[0.68rem] font-bold text-slate-400 shrink-0">ตัวอย่าง:</span>
          {sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(sq);
                handleAskThinkingModel(sq);
              }}
              className="px-3 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-[0.68rem] font-bold shrink-0 transition-all cursor-pointer border border-purple-500/20"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Response Display Box */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-purple-500/30 text-xs md:text-sm space-y-3 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-purple-400 font-extrabold font-display">
                <Brain className="w-4 h-4" />
                <span>{lang === 'th' ? 'ผลการคิดวิเคราะห์เชิงลึก (Deep Reasoning Analysis)' : 'Deep Reasoning Output'}</span>
              </div>

              {modelSource && (
                <span className="text-[0.65rem] font-mono font-bold text-slate-400 uppercase">
                  Source: {modelSource}
                </span>
              )}
            </div>

            <div className="whitespace-pre-wrap leading-relaxed font-sans text-slate-200">
              {response}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
