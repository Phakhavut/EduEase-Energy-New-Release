import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Database, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, PlusCircle, Sparkles } from 'lucide-react';
import { DataQualityScore, DataQualityItem, AppPage } from '../../types';

interface DataQualityCardProps {
  scoreData?: DataQualityScore;
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
  onNavigatePage?: (page: AppPage) => void;
  onActionClick?: (actionKey: string) => void;
}

export const DataQualityCard: React.FC<DataQualityCardProps> = ({
  scoreData = {
    overallScore: 82,
    gradeTh: 'ดีมาก',
    gradeEn: 'Good',
    items: [
      {
        id: 'dq-1',
        titleTh: 'การเชื่อมต่อเซนเซอร์มิเตอร์ (ESP32 Smart Sensor)',
        titleEn: 'ESP32 Smart Sensor Connection',
        category: 'meter',
        status: 'complete',
        impactPct: 30,
        actionTextTh: 'เชื่อมต่อแล้ว (วัดผลเรียลไทม์ 100%)',
        actionTextEn: 'Connected (100% Real-time)',
        actionKey: 'esp32_connected'
      },
      {
        id: 'dq-2',
        titleTh: 'ข้อมูลกำลังวัตต์เครื่องใช้ไฟฟ้าหลัก (Appliance Wattage)',
        titleEn: 'Appliance Power Ratings',
        category: 'appliance',
        status: 'complete',
        impactPct: 25,
        actionTextTh: 'บันทึกครบถ้วน 8/8 อุปกรณ์',
        actionTextEn: 'Logged 8/8 Devices',
        actionKey: 'appliances_logged'
      },
      {
        id: 'dq-3',
        titleTh: 'ประวัติบิลค่าไฟย้อนหลัง (3-Month Bill History)',
        titleEn: 'Historical Bill Statements',
        category: 'bill_history',
        status: 'estimated',
        impactPct: 25,
        actionTextTh: 'บันทึกแล้ว 1 เดือน (ต้องการเพิ่มอีก 2 เดือน)',
        actionTextEn: '1 Month Logged (Need 2 more)',
        actionKey: 'add_bill_history'
      },
      {
        id: 'dq-4',
        titleTh: 'ข้อมูลประเภทที่อยู่อาศัย & อัตราค่าไฟ (Tariff Profile)',
        titleEn: 'Tariff & Household Profile',
        category: 'profile',
        status: 'complete',
        impactPct: 20,
        actionTextTh: 'ระบุอัตรา 1.1.2 บ้านพักอาศัยครบถ้วน',
        actionTextEn: 'Tariff Type 1.1.2 Specified',
        actionKey: 'profile_set'
      }
    ]
  },
  lang = 'th',
  isDarkMode = false,
  onNavigatePage,
  onActionClick,
}) => {
  const getGradeBadgeClass = () => {
    if (scoreData.overallScore >= 90) return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    if (scoreData.overallScore >= 75) return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
    if (scoreData.overallScore >= 55) return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
    return 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30';
  };

  return (
    <div className={`p-6 rounded-[2.5rem] border shadow-sm transition-all ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'ดัชนีความสมบูรณ์ของข้อมูล (Data Quality Score)' : 'Data Quality Score'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'ยิ่งข้อมูลสมบูรณ์ ผลการทำนายและวิเคราะห์ของ AI ยิ่งแม่นยำสูง' : 'Completeness of input data driving AI prediction accuracy'}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-2xl font-black font-mono text-indigo-500">
            {scoreData.overallScore}%
          </div>
          <span className={`px-2 py-0.5 rounded-full font-extrabold text-[0.65rem] border ${getGradeBadgeClass()}`}>
            {lang === 'th' ? scoreData.gradeTh : scoreData.gradeEn}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${scoreData.overallScore}%` }}
          transition={{ duration: 1 }}
          className="bg-indigo-500 h-full rounded-full"
        />
      </div>

      {/* Quality Items Checklist */}
      <div className="space-y-3">
        {scoreData.items.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              {item.status === 'complete' ? (
                <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0 animate-pulse">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              )}

              <div>
                <h4 className="font-extrabold text-xs md:text-sm text-slate-900 dark:text-slate-100 font-display">
                  {lang === 'th' ? item.titleTh : item.titleEn}
                </h4>
                <p className="text-[0.7rem] text-slate-500 dark:text-slate-400 font-medium">
                  {lang === 'th' ? item.actionTextTh : item.actionTextEn}
                </p>
              </div>
            </div>

            {item.status !== 'complete' && (
              <button
                onClick={() => {
                  if (onActionClick) onActionClick(item.actionKey);
                  else if (onNavigatePage) {
                    if (item.category === 'appliance') onNavigatePage('appliances');
                    else if (item.category === 'meter') onNavigatePage('locations');
                    else if (item.category === 'bill_history') onNavigatePage('analytics');
                    else onNavigatePage('settings');
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'เติมข้อมูล' : 'Fix Now'}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
