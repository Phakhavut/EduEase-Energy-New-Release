import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, CloudRain, Snowflake, Thermometer, TrendingUp, Sparkles, ChevronDown, Info } from 'lucide-react';
import { SeasonalInsight, InfoDetailMode } from '../../types';

interface SeasonalInsightCardProps {
  insights: SeasonalInsight[];
  mode?: InfoDetailMode;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const SeasonalInsightCard: React.FC<SeasonalInsightCardProps> = ({
  insights,
  mode,
  lang,
  isDarkMode,
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={`p-6 rounded-[2.5rem] border shadow-sm transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'การวิเคราะห์ตามฤดูกาล (Seasonal Insights)' : 'Seasonal Insights'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'ผลกระทบจากสภาพอากาศและอุณหภูมิภายนอกต่อบิลค่าไฟฟ้า' : 'Weather and seasonal temperature impact analysis'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((item, idx) => {
          const itemKey = `${item.season}-${idx}`;
          const isExpanded = !!expandedItems[itemKey];

          return (
            <motion.div
              key={itemKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 md:p-5 rounded-2xl border space-y-3 ${
                isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50/80 border-slate-200/80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {item.season === 'summer' ? (
                    <Sun className="w-5 h-5 text-amber-500" />
                  ) : (
                    <CloudRain className="w-5 h-5 text-blue-500" />
                  )}
                  <h4 className="font-extrabold text-sm md:text-base font-display text-slate-900 dark:text-white">
                    {lang === 'th' ? item.titleTh : item.titleEn}
                  </h4>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-[0.68rem] font-mono shrink-0">
                  +{item.acIncreasePct}% AC Load
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {lang === 'th' ? item.tempImpactTh : item.tempImpactEn}
              </p>

              {/* Progressive Disclosure Toggle */}
              <div className="pt-1">
                <button
                  onClick={() => toggleExpand(itemKey)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isExpanded
                      ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isExpanded
                      ? (lang === 'th' ? 'ซ่อนคำแนะนำ AI' : 'Hide AI Recommendation')
                      : (lang === 'th' ? '💡 ดูคำแนะนำ AI เพิ่มเติม' : '💡 View AI Recommendation')}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 font-medium flex items-start gap-2.5 mt-2">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="block mb-0.5 text-amber-800 dark:text-amber-300 font-bold">
                          {lang === 'th' ? 'คำแนะนำจาก AI Coach:' : 'AI Coach Recommendation:'}
                        </strong>
                        {lang === 'th' ? item.aiRecommendationTh : item.aiRecommendationEn}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
