import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sun,
  TrendingDown,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Zap,
  ArrowRight
} from 'lucide-react';
import { DailyDigestService, DailyEnergyDigest } from '../../services/dailyDigestService';
import { Appliance, UserPersona } from '../../types';

interface DailyEnergyDigestBannerProps {
  appliances: Appliance[];
  monthlyBudget: number;
  persona?: UserPersona;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onOpenDigestModal: () => void;
}

export const DailyEnergyDigestBanner: React.FC<DailyEnergyDigestBannerProps> = ({
  appliances,
  monthlyBudget,
  persona = 'student',
  lang,
  isDarkMode,
  onOpenDigestModal,
}) => {
  const [digest, setDigest] = useState<DailyEnergyDigest | null>(null);

  useEffect(() => {
    // Generate fast local digest for instant display
    const data = DailyDigestService.generateLocalDigest(appliances, monthlyBudget, persona, 1);
    setDigest(data);
  }, [appliances, monthlyBudget, persona]);

  if (!digest) return null;

  const isImproved = digest.dayOverDayTrend === 'improved';
  const topApp = digest.topAppliances[0];
  const primaryTip = digest.personalizedTips[0];

  return (
    <div
      onClick={onOpenDigestModal}
      className={`p-4 sm:p-5 rounded-[22px] border transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md ${
        isDarkMode
          ? 'bg-[#0B132B] border-[#1E2E5D] hover:border-blue-500/50 shadow-blue-950/20'
          : 'bg-white border-slate-200 hover:border-blue-400/60'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Branding & Yesterday Metrics */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shrink-0 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Sun className="w-5 h-5 animate-pulse" />
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'Daily Energy Digest' : 'Daily Energy Digest'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-500/15 text-[#2563EB] dark:text-[#38BDF8] border border-blue-500/30">
                {lang === 'th' ? 'สรุปเมื่อวาน' : 'Yesterday Summary'}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{lang === 'th' ? `เมื่อวานใช้ไฟ ฿${digest.yesterdayCostThb}` : `Yesterday: ฿${digest.yesterdayCostThb}`}</span>
              <span className="text-xs font-normal text-slate-400">({digest.yesterdayKwh} kWh)</span>
            </h4>
          </div>
        </div>

        {/* Center: Trend Pill & Top Consumer */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
              isImproved
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
            }`}
          >
            {isImproved ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
            <span>
              {isImproved
                ? lang === 'th'
                  ? `ประหยัดลง ${Math.abs(digest.dayOverDayChangePct)}% เทียบวันก่อน`
                  : `-${Math.abs(digest.dayOverDayChangePct)}% vs prev day`
                : lang === 'th'
                ? `+${digest.dayOverDayChangePct}% เทียบวันก่อน`
                : `+${digest.dayOverDayChangePct}% vs prev day`}
            </span>
          </span>

          {topApp && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#070D1E]/70 border border-slate-200 dark:border-[#1E2E5D] text-slate-700 dark:text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>{topApp.name}: {topApp.percentOfTotal}%</span>
            </span>
          )}
        </div>

        {/* Right: Tip Teaser & Open CTA */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-[#1E2E5D]/60">
          <div className="text-xs text-slate-500 dark:text-slate-400 hidden xl:block max-w-[280px] truncate">
            <span className="font-bold text-[#2563EB] dark:text-[#38BDF8]">💡 {lang === 'th' ? 'เคล็ดลับ:' : 'Tip:'} </span>
            {lang === 'th' ? primaryTip?.titleTh : primaryTip?.titleEn}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDigestModal();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm shadow-blue-500/20 group-hover:translate-x-0.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>{lang === 'th' ? 'เปิดสรุป & เคล็ดลับ' : 'View Digest & Tips'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
