import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  X,
  TrendingDown,
  TrendingUp,
  Clock,
  Zap,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Smartphone,
  MessageSquare,
  Mail,
  Sliders,
  ChevronRight,
  Flame,
  Award,
  Layers,
  Info
} from 'lucide-react';
import {
  DailyDigestService,
  DailyEnergyDigest,
  PersonalizedEnergyTip,
  DailyDigestSettings
} from '../../services/dailyDigestService';
import { Appliance, UserPersona } from '../../types';

interface DailyEnergyDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliances: Appliance[];
  monthlyBudget: number;
  persona?: UserPersona;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onApplyTipReward?: (tip: PersonalizedEnergyTip) => void;
}

export const DailyEnergyDigestModal: React.FC<DailyEnergyDigestModalProps> = ({
  isOpen,
  onClose,
  appliances,
  monthlyBudget,
  persona = 'student',
  lang,
  isDarkMode,
  onApplyTipReward,
}) => {
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(1); // 1 = yesterday, 2 = 2 days ago, 3 = 3 days ago
  const [digest, setDigest] = useState<DailyEnergyDigest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [appliedTipIds, setAppliedTipIds] = useState<Set<string>>(new Set());
  const [settings, setSettings] = useState<DailyDigestSettings>(DailyDigestService.getSettings());
  const [activeTab, setActiveTab] = useState<'digest' | 'settings'>('digest');
  const [dispatchStatus, setDispatchStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  // Load digest data when modal opens or offset changes
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);

    DailyDigestService.fetchOrGenerateDailyDigest({
      appliances,
      monthlyBudget,
      persona,
      lang,
      dateOffset: selectedDayOffset,
    })
      .then((data) => {
        if (isMounted) {
          setDigest(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load daily digest:', err);
        if (isMounted) {
          setDigest(DailyDigestService.generateLocalDigest(appliances, monthlyBudget, persona, selectedDayOffset));
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedDayOffset, appliances, monthlyBudget, persona, lang]);

  if (!isOpen) return null;

  const handleApplyTip = (tip: PersonalizedEnergyTip) => {
    if (appliedTipIds.has(tip.id)) return;
    setAppliedTipIds((prev) => new Set(prev).add(tip.id));
    if (onApplyTipReward) {
      onApplyTipReward(tip);
    }
  };

  const handleSaveSettings = (partial: Partial<DailyDigestSettings>) => {
    const updated = DailyDigestService.updateSettings(partial);
    setSettings(updated);
  };

  const handleSendLiveTest = async () => {
    if (!digest) return;
    setDispatchStatus({ loading: true });

    const res = await DailyDigestService.dispatchDigestToChannels(
      digest,
      {
        webPush: settings.channels.webPush,
        line: settings.channels.lineNotify,
        email: settings.channels.email,
      },
      lang
    );

    setDispatchStatus({
      loading: false,
      success: res.success,
      message: res.message,
    });

    setTimeout(() => {
      setDispatchStatus({ loading: false });
    }, 4500);
  };

  const isImproved = digest ? digest.dayOverDayTrend === 'improved' : true;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] ${
            isDarkMode ? 'bg-[#0A1024] border-[#1E2E5D] text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-[#1E2E5D] flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/25">
                <Sun className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base sm:text-lg font-display tracking-tight">
                    {lang === 'th' ? 'Daily Energy Digest' : 'Daily Energy Digest'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-500/20 text-[#38BDF8] border border-blue-500/30">
                    {lang === 'th' ? 'สรุปประจำวัน' : 'Previous Day Report'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th'
                    ? 'สรุปแนวโน้มการใช้ไฟเมื่อวาน พร้อมเคล็ดลับประหยัดเฉพาะบุคคล'
                    : "Yesterday's energy trends & personalized efficiency tips"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub Navigation / Date Selector Bar */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-slate-200 dark:border-[#1E2E5D] bg-slate-50/70 dark:bg-[#070D1E]/60 overflow-x-auto gap-2">
            {/* Day Selector Buttons */}
            <div className="flex items-center gap-1">
              {[
                { offset: 1, labelTh: 'เมื่อวานนี้', labelEn: 'Yesterday' },
                { offset: 2, labelTh: '2 วันก่อน', labelEn: '2 Days Ago' },
                { offset: 3, labelTh: '3 วันก่อน', labelEn: '3 Days Ago' },
              ].map((item) => (
                <button
                  key={item.offset}
                  onClick={() => setSelectedDayOffset(item.offset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedDayOffset === item.offset && activeTab === 'digest'
                      ? 'bg-[#1D4ED8] text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                  }`}
                >
                  {lang === 'th' ? item.labelTh : item.labelEn}
                </button>
              ))}
            </div>

            {/* Action Toggles: Digest vs Notification Schedule */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setActiveTab('digest')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'digest'
                    ? 'bg-blue-500/15 text-[#2563EB] dark:text-[#38BDF8] border border-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'รายงานสรุป' : 'Digest'}</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-blue-500/15 text-[#2563EB] dark:text-[#38BDF8] border border-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'ตั้งค่าแจ้งเตือน' : 'Settings'}</span>
              </button>
            </div>
          </div>

          {/* Feedback alert banner */}
          {dispatchStatus.message && (
            <div
              className={`mx-5 mt-4 p-3 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
                dispatchStatus.success
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
              }`}
            >
              {dispatchStatus.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
              )}
              <span>{dispatchStatus.message}</span>
            </div>
          )}

          {/* Body */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
            {loading ? (
              <div className="py-16 text-center space-y-3">
                <Sun className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {lang === 'th' ? 'กำลังประมวลผลข้อมูลการใช้พลังงานเมื่อวาน...' : 'Analyzing yesterday energy consumption...'}
                </p>
              </div>
            ) : activeTab === 'settings' ? (
              /* TAB: SETTINGS & CHANNELS */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {lang === 'th' ? 'ระบบแจ้งเตือน Daily Digest อัตโนมัติ' : 'Automated Daily Digest Delivery'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang === 'th'
                      ? 'ระบบจะสรุปการใช้พลังงานของวันก่อนหน้าพร้อมเคล็ดลับประหยัดไฟส่งให้คุณทุกเช้า เพื่อให้คุณปรับพฤติกรรมได้ทันท่วงที'
                      : 'EduEase automatically computes previous day trends and delivers personalized tips to your devices every morning.'}
                  </p>
                </div>

                {/* Delivery Time Setting */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-[#1E2E5D] bg-slate-50/50 dark:bg-[#070D1E]/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-[#38BDF8]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold block text-slate-900 dark:text-white">
                        {lang === 'th' ? 'เวลาส่งสรุปประจำวัน (Scheduled Time)' : 'Daily Delivery Time'}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {lang === 'th' ? 'แนะนำช่วงเช้า 08:00 ก่อนเริ่มทำกิจกรรม' : 'Recommended: 08:00 AM before day starts'}
                      </span>
                    </div>
                  </div>

                  <input
                    type="time"
                    value={settings.scheduledTime}
                    onChange={(e) => handleSaveSettings({ scheduledTime: e.target.value })}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E2E5D] bg-white dark:bg-[#0A1024] font-mono text-xs font-bold text-[#2563EB] dark:text-[#38BDF8] focus:outline-none"
                  />
                </div>

                {/* Channels Configuration */}
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                    {lang === 'th' ? 'ช่องทางที่ต้องการรับแจ้งเตือน (Delivery Channels)' : 'Enabled Channels'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Web Push */}
                    <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-[#1E2E5D] bg-slate-50/50 dark:bg-[#070D1E]/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold">Web Push</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.channels.webPush}
                          onChange={(e) =>
                            handleSaveSettings({
                              channels: { ...settings.channels, webPush: e.target.checked },
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* Email */}
                    <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-[#1E2E5D] bg-slate-50/50 dark:bg-[#070D1E]/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-sky-500" />
                        <span className="text-xs font-bold">Email Digest</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.channels.email}
                          onChange={(e) =>
                            handleSaveSettings({
                              channels: { ...settings.channels, email: e.target.checked },
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* LINE */}
                    <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-[#1E2E5D] bg-slate-50/50 dark:bg-[#070D1E]/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold">LINE Notify</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.channels.lineNotify}
                          onChange={(e) =>
                            handleSaveSettings({
                              channels: { ...settings.channels, lineNotify: e.target.checked },
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Instant Dispatch Test Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSendLiveTest}
                    disabled={dispatchStatus.loading}
                    className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {dispatchStatus.loading
                        ? lang === 'th' ? 'กำลังส่งแจ้งเตือน...' : 'Dispatching...'
                        : lang === 'th' ? 'ทดสอบส่งสรุปนี้เข้ามือถือตอนนี้' : 'Test Dispatch Daily Digest Now'}
                    </span>
                  </button>
                </div>
              </div>
            ) : digest ? (
              /* TAB: DIGEST CONTENT */
              <div className="space-y-5">
                {/* 1. HERO METRIC BENTO CARD */}
                <div className="p-5 rounded-3xl border border-slate-200 dark:border-[#1E2E5D] bg-gradient-to-br from-blue-500/10 via-slate-50 dark:via-[#0B132B] to-transparent space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span className="font-semibold">{lang === 'th' ? digest.displayDateTh : digest.displayDateEn}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          isImproved
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {isImproved ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                        <span>
                          {isImproved
                            ? lang === 'th' ? `ประหยัดลง ${Math.abs(digest.dayOverDayChangePct)}% เทียบวันก่อน` : `-${Math.abs(digest.dayOverDayChangePct)}% vs Prev Day`
                            : lang === 'th' ? `เพิ่มขึ้น +${digest.dayOverDayChangePct}% เทียบวันก่อน` : `+${digest.dayOverDayChangePct}% vs Prev Day`}
                        </span>
                      </span>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          digest.goalStatus === 'over_budget'
                            ? 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
                            : digest.goalStatus === 'near_budget'
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
                            : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {lang === 'th'
                          ? `${digest.goalPercent}% ของงบรายวัน (฿${digest.dailyGoalThb})`
                          : `${digest.goalPercent}% of daily budget (฿${digest.dailyGoalThb})`}
                      </span>
                    </div>
                  </div>

                  {/* 3 Metric Columns */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    <div className="p-3 rounded-2xl bg-white dark:bg-[#070D1E]/60 border border-slate-200 dark:border-[#1E2E5D]/60">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                        {lang === 'th' ? 'ค่าไฟเมื่อวานนี้' : 'Yesterday Cost'}
                      </span>
                      <div className="text-xl sm:text-2xl font-bold font-mono text-[#2563EB] dark:text-[#38BDF8] mt-0.5">
                        ฿{digest.yesterdayCostThb.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {lang === 'th' ? `เทียบกับ ฿${digest.dayBeforeYesterdayCostThb} วันก่อน` : `vs ฿${digest.dayBeforeYesterdayCostThb} day before`}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white dark:bg-[#070D1E]/60 border border-slate-200 dark:border-[#1E2E5D]/60">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                        {lang === 'th' ? 'หน่วยไฟฟ้าที่ใช้' : 'Energy Consumed'}
                      </span>
                      <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                        {digest.yesterdayKwh} <span className="text-xs font-normal text-slate-400">kWh</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {lang === 'th' ? `คาร์บอน ~${digest.carbonEmissionKg} kg CO₂` : `~${digest.carbonEmissionKg} kg CO₂`}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white dark:bg-[#070D1E]/60 border border-slate-200 dark:border-[#1E2E5D]/60">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                        {lang === 'th' ? 'ช่วงพีคสูงสุด' : 'Peak Usage Hour'}
                      </span>
                      <div className="text-base sm:text-lg font-bold font-mono text-amber-500 mt-1 flex items-center gap-1">
                        <Flame className="w-4 h-4 text-amber-500" />
                        <span>{digest.peakHourWindow}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {digest.peakWindowKwh} kWh ({lang === 'th' ? 'กินไฟสูงสุด' : 'Peak burst'})
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white dark:bg-[#070D1E]/60 border border-slate-200 dark:border-[#1E2E5D]/60">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                        {lang === 'th' ? 'สัดส่วน Off-Peak' : 'Off-Peak Ratio'}
                      </span>
                      <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-500 mt-0.5">
                        {digest.offPeakRatioPct}%
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {lang === 'th' ? 'ช่วงค่าไฟถูก (TOU)' : 'Low tariff period'}
                      </span>
                    </div>
                  </div>

                  {/* Summary Callout Banner */}
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {lang === 'th' ? digest.overallSummaryTh : digest.overallSummaryEn}
                    </p>
                  </div>
                </div>

                {/* 2. HOURLY ENERGY TREND PROFILE (24 Hours Visualizer) */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-[#1E2E5D] bg-white dark:bg-[#070D1E]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#38BDF8]" />
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {lang === 'th' ? 'กราฟแนวโน้มการกินไฟตลอด 24 ชั่วโมงของเมื่อวาน' : "Yesterday's 24-Hour Energy Profile"}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {lang === 'th' ? 'ไฮไลต์ช่วงพีคที่มีการเปิดอุปกรณ์วัตต์สูง' : 'Peak load highlighted in orange'}
                    </span>
                  </div>

                  {/* Mini Bar Chart */}
                  <div className="h-28 flex items-end gap-1 sm:gap-1.5 pt-4 pb-1 overflow-x-auto">
                    {digest.hourlyBreakdown.map((point) => {
                      const maxVal = Math.max(...digest.hourlyBreakdown.map((p) => p.kwh)) || 1;
                      const heightPct = Math.max(12, Math.round((point.kwh / maxVal) * 100));

                      return (
                        <div
                          key={point.hour}
                          className="flex-1 min-w-[12px] flex flex-col items-center gap-1 group relative cursor-pointer"
                        >
                          {/* Tooltip on hover */}
                          <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap z-20 shadow-lg border border-slate-700">
                            {point.hourLabel}: {point.kwh} kWh (฿{point.costThb})
                          </div>

                          <div
                            style={{ height: `${heightPct}%` }}
                            className={`w-full rounded-t-sm transition-all ${
                              point.isPeak
                                ? 'bg-gradient-to-t from-amber-500 to-orange-400 group-hover:from-amber-400 group-hover:to-orange-300'
                                : 'bg-gradient-to-t from-blue-600/70 to-[#38BDF8] group-hover:from-blue-500 group-hover:to-cyan-300'
                            }`}
                          />
                          {point.hour % 4 === 0 && (
                            <span className="text-[9px] text-slate-400 font-mono">
                              {point.hour.toString().padStart(2, '0')}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. TOP POWER CONSUMING APPLIANCES */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-[#1E2E5D] bg-white dark:bg-[#070D1E]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>{lang === 'th' ? 'อุปกรณ์ที่กินไฟสูงสุดเมื่อวานนี้ (Top Consumers)' : 'Top Consuming Appliances'}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {lang === 'th' ? 'สัดส่วนจากหน่วยไฟรวม' : '% of total energy'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {digest.topAppliances.map((app, index) => (
                      <div
                        key={app.id || index}
                        className="p-3 rounded-xl border border-slate-100 dark:border-[#1E2E5D]/60 bg-slate-50/70 dark:bg-[#0A1128] flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-lg shrink-0">{app.icon}</span>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                              {app.name}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              {lang === 'th' ? app.tipSummaryTh : app.tipSummaryEn}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs font-extrabold font-mono text-[#2563EB] dark:text-[#38BDF8]">
                            ฿{app.yesterdayCostThb} <span className="text-[10px] text-slate-400">({app.yesterdayKwh} kWh)</span>
                          </div>
                          <div className="flex items-center gap-1 justify-end mt-0.5">
                            <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                              <div
                                style={{ width: `${app.percentOfTotal}%` }}
                                className="h-full bg-blue-500 rounded-full"
                              />
                            </div>
                            <span className="text-[10px] font-mono text-slate-400 font-bold">
                              {app.percentOfTotal}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. PERSONALIZED ENERGY-SAVING TIPS (Actionable & Rewarding) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {lang === 'th' ? 'เคล็ดลับเฉพาะคุณจากข้อมูลเมื่อวาน (Personalized Action Tips)' : 'Personalized Action Tips'}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>{lang === 'th' ? 'รับ +25 XP เมื่อนำไปปรับใช้' : 'Earn +25 XP on action'}</span>
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {digest.personalizedTips.map((tip) => {
                      const isApplied = appliedTipIds.has(tip.id);

                      return (
                        <div
                          key={tip.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            isApplied
                              ? 'bg-emerald-500/10 border-emerald-500/30'
                              : 'bg-white dark:bg-[#0A1229] border-slate-200 dark:border-[#1E2E5D] hover:border-blue-500/40 shadow-sm'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl shrink-0 mt-0.5">{tip.icon}</span>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                                    {lang === 'th' ? tip.titleTh : tip.titleEn}
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                      tip.impact === 'High'
                                        ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                                        : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                                    }`}
                                  >
                                    {tip.impact} Impact
                                  </span>
                                </div>

                                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {lang === 'th' ? tip.descTh : tip.descEn}
                                </p>

                                <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                    {lang === 'th'
                                      ? `ประหยัดได้ ~฿${tip.potentialDailySavingsThb}/วัน (฿${tip.potentialMonthlySavingsThb}/เดือน)`
                                      : `Saves ~฿${tip.potentialDailySavingsThb}/day (฿${tip.potentialMonthlySavingsThb}/mo)`}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={() => handleApplyTip(tip)}
                              disabled={isApplied}
                              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                                isApplied
                                  ? 'bg-emerald-500 text-white cursor-default'
                                  : 'bg-blue-500/15 text-[#2563EB] dark:text-[#38BDF8] hover:bg-[#2563EB] hover:text-white border border-blue-500/30'
                              }`}
                            >
                              {isApplied ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{lang === 'th' ? 'นำไปใช้แล้ว (+25 XP)' : 'Applied (+25 XP)'}</span>
                                </>
                              ) : (
                                <>
                                  <span>{lang === 'th' ? 'นำไปใช้ทันที' : 'Apply Habit'}</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-200 dark:border-[#1E2E5D] bg-slate-50 dark:bg-[#070D1E]/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>
                {lang === 'th' ? 'EduEase Energy Digest Notification Engine' : 'EduEase Daily Digest Service'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSendLiveTest}
                disabled={dispatchStatus.loading}
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-[#1E2E5D] bg-white dark:bg-[#0A1024] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{lang === 'th' ? 'ส่งแจ้งเตือนเข้าเครื่อง' : 'Dispatch Push'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold shadow-sm cursor-pointer transition-all"
              >
                {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
