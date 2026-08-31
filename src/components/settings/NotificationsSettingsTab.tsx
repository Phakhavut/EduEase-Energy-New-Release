import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BellRing, 
  Smartphone, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  MessageSquare, 
  Mail, 
  ExternalLink,
  Laptop,
  Check,
  Info,
  Clock,
  Flame,
  Power,
  Eye,
  EyeOff,
  Calendar,
  TrendingUp,
  X
} from 'lucide-react';
import { 
  NotificationService, 
  NotificationSettingsConfig, 
  DEFAULT_NOTIFICATION_CONFIG 
} from '../../services/notificationService';
import { UserPersona } from '../../types';

interface NotificationsSettingsTabProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  monthlyBudget: number;
  monthlyEstimate: number;
  persona?: UserPersona;
  onTriggerToast?: (type: 'danger' | 'warning', customTh?: string, customEn?: string) => void;
}

export const NotificationsSettingsTab: React.FC<NotificationsSettingsTabProps> = ({
  lang,
  isDarkMode,
  monthlyBudget,
  monthlyEstimate,
  persona = 'student',
  onTriggerToast,
}) => {
  const [config, setConfig] = useState<NotificationSettingsConfig>(DEFAULT_NOTIFICATION_CONFIG);
  const [isTestingWebPush, setIsTestingWebPush] = useState(false);
  const [isTestingLine, setIsTestingLine] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [isTriggeringDailyDigest, setIsTriggeringDailyDigest] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [lineTestResult, setLineTestResult] = useState<any>(null);
  const [showLineBubbleModal, setShowLineBubbleModal] = useState(false);
  const [dailyDigestResult, setDailyDigestResult] = useState<any>(null);
  const [showDailyDigestModal, setShowDailyDigestModal] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const currentConfig = NotificationService.getConfig();
    setConfig(currentConfig);
    NotificationService.initServiceWorker();
  }, []);

  const handleUpdate = (partial: Partial<NotificationSettingsConfig>) => {
    const updated = NotificationService.updateConfig(partial);
    setConfig(updated);
  };

  const isGranted = config.permissionStatus === 'granted';
  const isDenied = config.permissionStatus === 'denied';

  const handleRequestPermission = async () => {
    const granted = await NotificationService.requestPermission();
    setConfig(NotificationService.getConfig());
    if (granted) {
      setFeedback({
        type: 'success',
        message: lang === 'th'
          ? '🎉 อนุญาตการแจ้งเตือน Web Push เรียบร้อยแล้ว! ระบบพร้อมแจ้งเตือนแม้ไม่ได้เปิดแอป'
          : '🎉 Web Push permission granted! Alerts will be delivered even when the app is closed.'
      });
    } else {
      setFeedback({
        type: 'error',
        message: lang === 'th'
          ? '⚠️ สิทธิ์การแจ้งเตือนถูกปฏิเสธในเบราว์เซอร์ กรุณาเปิดในการตั้งค่าเบราว์เซอร์ของคุณ'
          : '⚠️ Notification permission was denied. Please enable notifications in your browser settings.'
      });
    }
  };

  const handleToggleWebPush = async (enable: boolean) => {
    if (enable && !isGranted) {
      await handleRequestPermission();
    } else {
      handleUpdate({ webPushEnabled: enable });
      setFeedback({
        type: 'success',
        message: enable
          ? (lang === 'th' ? 'เปิดการแจ้งเตือน Web Push แล้ว' : 'Web Push notifications enabled')
          : (lang === 'th' ? 'ปิดการแจ้งเตือน Web Push แล้ว' : 'Web Push notifications disabled')
      });
    }
  };

  const handleTestNativePush = async (scenario: 'threshold' | 'exceed' | 'leak' = 'threshold') => {
    setIsTestingWebPush(true);
    setFeedback(null);

    const budgetPercent = Math.round((monthlyEstimate / (monthlyBudget || 1)) * 100);
    let title = '';
    let body = '';
    let type: 'warning' | 'danger' | 'info' = 'warning';

    if (scenario === 'exceed') {
      title = lang === 'th' ? '🚨 [แจ้งเตือนด่วน] ค่าไฟเกินงบประมาณรายเดือนแล้ว!' : '🚨 [Urgent Alert] Monthly Energy Budget Exceeded!';
      body = lang === 'th'
        ? `ยอดใช้ไฟฟ้าปัจจุบัน ฿${monthlyEstimate.toLocaleString()} เกินเพดานงบ ฿${monthlyBudget.toLocaleString()} แนะนำเปิดสวิตช์ Eco Cut ทันที`
        : `Current cost ฿${monthlyEstimate.toLocaleString()} exceeded your ฿${monthlyBudget.toLocaleString()} cap. Turn on Eco Cut now.`;
      type = 'danger';
    } else if (scenario === 'leak') {
      title = lang === 'th' ? '🔌 [ตรวจจับไฟรั่ว] ตรวจพบการกินไฟ Standby ผิดปกติ' : '🔌 [Leak Alert] Standby Power Draw Detected';
      body = lang === 'th'
        ? 'มีอุปกรณ์แอบกินไฟต่อเนื่อง 45W ขณะไม่อยู่ห้อง คิดเป็นค่าไฟเพิ่ม ~฿120/เดือน'
        : 'Continuous standby load of 45W detected while away (~฿120/month extra cost).';
      type = 'warning';
    } else {
      title = lang === 'th' ? `⚡ [แจ้งเตือนล่วงหน้า] การใช้ไฟแตะ ${config.alertThresholdPercent}% ของงบ` : `⚡ [Early Warning] Energy Usage reached ${config.alertThresholdPercent}%`;
      body = lang === 'th'
        ? `คุณใช้งานไปแล้ว ฿${monthlyEstimate.toLocaleString()} (${budgetPercent}% ของงบ ฿${monthlyBudget.toLocaleString()}) เหลือโควตา ฿${Math.max(0, monthlyBudget - monthlyEstimate).toLocaleString()}`
        : `Usage at ฿${monthlyEstimate.toLocaleString()} (${budgetPercent}% of ฿${monthlyBudget.toLocaleString()}). Remaining quota: ฿${Math.max(0, monthlyBudget - monthlyEstimate).toLocaleString()}`;
      type = budgetPercent >= 100 ? 'danger' : 'warning';
    }

    const success = await NotificationService.sendNativePush({
      title,
      body,
      type,
      tag: `test-scenario-${scenario}-${Date.now()}`,
      amountThb: monthlyEstimate,
      thresholdPercent: budgetPercent,
    });

    if (success) {
      setFeedback({
        type: 'success',
        message: lang === 'th' 
          ? '🚀 ส่งการแจ้งเตือน Native Push ไปยังหน้าจออุปกรณ์ของคุณสำเร็จแล้ว!' 
          : '🚀 Native Notification dispatched to your operating system!'
      });
      if (onTriggerToast) {
        onTriggerToast(type === 'danger' ? 'danger' : 'warning', title, title);
      }
    } else {
      setFeedback({
        type: 'error',
        message: lang === 'th'
          ? 'ไม่สามารถแสดง Notification ได้ กรุณากด "เปิดใช้งาน Web Push" หรือตรวจสอบการตั้งค่าเบราว์เซอร์'
          : 'Unable to dispatch notification. Please enable Web Push or check browser permissions.'
      });
    }
    setIsTestingWebPush(false);
  };

  const handleTestLineNotify = async () => {
    setIsTestingLine(true);
    setFeedback(null);

    const tokenToUse = config.lineNotifyToken || 'eduease_mock_token_live_sample';
    const budgetPercent = Math.round((monthlyEstimate / (monthlyBudget || 1)) * 100);
    const res = await NotificationService.sendLineNotify({
      token: tokenToUse,
      message: `\n⚡ [EduEase Alert - ทดสอบ LINE Notify]\n👤 บริบท: ${persona === 'student' ? 'หอพักนักศึกษา' : 'ผู้ใช้งานทั่วไป'}\n📊 ค่าไฟปัจจุบัน: ฿${monthlyEstimate.toLocaleString()} / งบ ฿${monthlyBudget.toLocaleString()} (${budgetPercent}%)\n🎯 เกณฑ์แจ้งเตือน: ${config.alertThresholdPercent}%\n💡 สเตตัส: ระบบตรวจจับอัตโนมัติ 24 ชม. พร้อมทำงาน`,
      isTest: true,
    });

    setLineTestResult(res);
    setShowLineBubbleModal(true);
    setFeedback({
      type: res.success ? 'success' : 'error',
      message: res.message,
    });
    setIsTestingLine(false);
  };

  const handleTriggerDailyEnergyDigest = async () => {
    setIsTriggeringDailyDigest(true);
    setFeedback(null);

    const dailyBudgetGoal = Math.round((monthlyBudget || 1500) / 30);
    const dailySpend = Math.round((monthlyEstimate || 1200) / 30 * 1.05);
    const dailyKwh = Number(((dailySpend / 4.5)).toFixed(1));

    const res = await NotificationService.sendDailyDigest({
      email: config.userEmail,
      dailyConsumptionKwh: dailyKwh,
      dailyCostThb: dailySpend,
      monthlyBudget: monthlyBudget,
      dailyGoalThb: dailyBudgetGoal,
      lang,
      isTest: true,
    });

    if (res.success && res.digest) {
      setDailyDigestResult(res.digest);
      setShowDailyDigestModal(true);
      setFeedback({
        type: 'success',
        message: lang === 'th'
          ? `📧 ส่งอีเมลสรุปพลังงานประจำวัน (Daily Energy Digest) ไปยัง ${config.userEmail} เรียบร้อยแล้ว!`
          : `📧 Daily Energy Digest email dispatched to ${config.userEmail}!`,
      });
    } else {
      setFeedback({
        type: 'error',
        message: res.message,
      });
    }
    setIsTriggeringDailyDigest(false);
  };

  const handleTestEmailDigest = async () => {
    setIsTestingEmail(true);
    setFeedback(null);

    const res = await NotificationService.sendEmailDigest({
      email: config.userEmail,
      summaryData: {
        totalCostThb: monthlyEstimate,
        monthlyBudget: monthlyBudget,
        budgetPercent: Math.round((monthlyEstimate / (monthlyBudget || 1)) * 100),
      },
      isTest: true,
    });

    setFeedback({
      type: res.success ? 'success' : 'error',
      message: res.message,
    });
    setIsTestingEmail(false);
  };

  // Calculated numbers for threshold preview
  const thresholdAmount = Math.round((monthlyBudget * config.alertThresholdPercent) / 100);
  const currentUsagePercent = Math.min(150, Math.round((monthlyEstimate / (monthlyBudget || 1)) * 100));

  // Daily metrics for goal comparison
  const dailyTargetThb = Math.round((monthlyBudget || 1500) / 30);
  const dailyCurrentThb = Math.round((monthlyEstimate || 1200) / 30 * 1.05);
  const dailyGoalPercent = Math.round((dailyCurrentThb / (dailyTargetThb || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Feedback Banner */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-bold ${
            feedback.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-500" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-xs underline"
          >
            {lang === 'th' ? 'ปิด' : 'Dismiss'}
          </button>
        </motion.div>
      )}

      {/* SECTION 1: MASTER WEB PUSH TOGGLE & HARDWARE PERMISSION */}
      <div className={`p-6 rounded-3xl border transition-all space-y-5 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className={`p-3 rounded-2xl text-white shadow-md ${
              isGranted && config.webPushEnabled 
                ? 'bg-emerald-500 shadow-emerald-500/20' 
                : 'bg-slate-500 shadow-slate-500/10'
            }`}>
              <BellRing className={`w-6 h-6 ${isGranted && config.webPushEnabled ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-base sm:text-lg font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'การแจ้งเตือน Web Push ผ่านเบราว์เซอร์' : 'Browser Web Push Notifications'}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  isGranted && config.webPushEnabled
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : isDenied
                    ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                }`}>
                  {isGranted && config.webPushEnabled
                    ? (lang === 'th' ? '🟢 เปิดใช้งานแล้ว (Active)' : '🟢 Active')
                    : isDenied
                    ? (lang === 'th' ? '🔴 สิทธิ์ถูกปิดในเบราว์เซอร์' : '🔴 Blocked in Browser')
                    : (lang === 'th' ? '🟡 ยังไม่ได้อนุญาตสิทธิ์' : '🟡 Inactive / Not Granted')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'th'
                  ? 'รับการแจ้งเตือนเตือนค่าไฟและไฟรั่วเข้าอุปกรณ์โดยตรง แม้ไม่ได้เปิดแท็บแอปพลิเคชันทิ้งไว้'
                  : 'Receive real-time OS alerts on high energy consumption or leaks even when the tab is closed.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {!isGranted && (
              <button
                onClick={handleRequestPermission}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                {lang === 'th' ? 'อนุญาตสิทธิ์เบราว์เซอร์' : 'Grant Permission'}
              </button>
            )}

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.webPushEnabled && isGranted}
                onChange={(e) => handleToggleWebPush(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>

        {/* Service Worker Info Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                {lang === 'th' ? 'เบื้องหลังการทำงาน (Service Worker /sw.js)' : 'Background Engine (/sw.js)'}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                {lang === 'th' 
                  ? 'ระบบใช้ Background Service Worker คอยเฝ้าระวังและสามารถกดปุ่ม "⚡ Eco Cut" จากหน้าต่างแจ้งเตือนได้ทันที'
                  : 'Uses background workers with interactive quick actions ("⚡ Eco Cut" & "🔍 View Budget").'}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleTestNativePush('threshold')}
            disabled={isTestingWebPush}
            className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0 self-stretch sm:self-auto justify-center"
          >
            <Send className="w-3.5 h-3.5 text-emerald-500 group-hover:text-white" />
            <span>{isTestingWebPush ? (lang === 'th' ? 'กำลังยิงแจ้งเตือน...' : 'Dispatching...') : (lang === 'th' ? 'ทดสอบยิง Web Push จริง' : 'Test Real Web Push')}</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: CONFIGURE ALERT THRESHOLDS (PRIMARY FEATURE) */}
      <div className={`p-6 rounded-3xl border transition-all space-y-6 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg font-display text-slate-900 dark:text-white">
                {lang === 'th' ? 'กำหนดเกณฑ์เปอร์เซ็นต์แจ้งเตือนค่าไฟ (Energy Usage Thresholds)' : 'Energy Usage Percentage Thresholds'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' 
                  ? 'กำหนดระดับ % ของงบประมาณรายเดือนที่จะส่งสัญญาณเตือน (เช่น 50%, 80%, 100%)' 
                  : 'Define percentage milestones of monthly budget that trigger alerts (e.g. 50%, 80%, 100%).'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-black text-slate-400 block">{lang === 'th' ? 'เกณฑ์หลัก' : 'Primary Target'}</span>
            <span className="font-mono font-black text-xl text-amber-500 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 inline-block">
              {config.alertThresholdPercent}%
            </span>
          </div>
        </div>

        {/* Dynamic Visual Progress Gauge */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">{lang === 'th' ? 'การใช้ไฟปัจจุบัน:' : 'Current Usage:'}</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">฿{monthlyEstimate.toLocaleString()} ({currentUsagePercent}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">{lang === 'th' ? 'งบรายเดือน:' : 'Monthly Budget:'}</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">฿{monthlyBudget.toLocaleString()}</span>
            </div>
          </div>

          {/* Progress bar with markers */}
          <div className="relative w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            {/* Current Fill */}
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                currentUsagePercent >= 100 
                  ? 'bg-rose-500' 
                  : currentUsagePercent >= config.alertThresholdPercent 
                  ? 'bg-amber-500' 
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, currentUsagePercent)}%` }}
            />
          </div>

          {/* Marker indicators */}
          <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono">
            <span>0% (฿0)</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">50% (฿{Math.round(monthlyBudget * 0.5).toLocaleString()})</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
              <span>🔔 {config.alertThresholdPercent}% (฿{thresholdAmount.toLocaleString()})</span>
            </span>
            <span className="text-rose-600 dark:text-rose-400 font-bold">🚨 100% (฿{monthlyBudget.toLocaleString()})</span>
          </div>
        </div>

        {/* Multi-Tier Percentage Threshold Milestone Toggles & Inputs */}
        <div className="space-y-3">
          <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
            {lang === 'th' ? 'ระดับเกณฑ์เตือนอัจฉริยะ (Alert Threshold Milestones):' : 'Alert Threshold Trigger Milestones:'}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 50% Milestone */}
            <div className={`p-3.5 rounded-2xl border transition-all ${
              config.customThresholds?.t50
                ? 'bg-blue-500/10 border-blue-500/30'
                : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono font-extrabold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  50% {lang === 'th' ? 'ครึ่งงบประมาณ' : 'Half Budget'}
                </span>
                <input
                  type="checkbox"
                  checked={config.customThresholds?.t50 ?? true}
                  onChange={(e) => {
                    const ct = { ...(config.customThresholds || DEFAULT_NOTIFICATION_CONFIG.customThresholds), t50: e.target.checked };
                    handleUpdate({ customThresholds: ct });
                  }}
                  className="rounded accent-blue-500 cursor-pointer"
                />
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                ฿{Math.round(monthlyBudget * 0.5).toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {lang === 'th' ? 'เตือนล่วงหน้าเมื่อใช้ไฟไปครึ่งหนึ่ง' : 'Early halfway checkpoint'}
              </p>
            </div>

            {/* 80% Milestone (Standard Target) */}
            <div className={`p-3.5 rounded-2xl border transition-all ${
              config.customThresholds?.t80
                ? 'bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-500/30'
                : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono font-extrabold text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  80% {lang === 'th' ? 'ระวังใกล้เต็ม' : 'Warning Cap'}
                </span>
                <input
                  type="checkbox"
                  checked={config.customThresholds?.t80 ?? true}
                  onChange={(e) => {
                    const ct = { ...(config.customThresholds || DEFAULT_NOTIFICATION_CONFIG.customThresholds), t80: e.target.checked };
                    handleUpdate({ customThresholds: ct });
                  }}
                  className="rounded accent-amber-500 cursor-pointer"
                />
              </div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 font-mono font-bold">
                ฿{Math.round(monthlyBudget * 0.8).toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {lang === 'th' ? 'เกณฑ์มาตรฐานแนะนำเตือนก่อนค่าไฟบวม' : 'Recommended standard warning'}
              </p>
            </div>

            {/* 100% Milestone (Exceeded) */}
            <div className={`p-3.5 rounded-2xl border transition-all ${
              config.customThresholds?.t100
                ? 'bg-rose-500/10 border-rose-500/30'
                : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono font-extrabold text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  100% {lang === 'th' ? 'เกินงบประมาณ' : 'Cap Exceeded'}
                </span>
                <input
                  type="checkbox"
                  checked={config.customThresholds?.t100 ?? true}
                  onChange={(e) => {
                    const ct = { ...(config.customThresholds || DEFAULT_NOTIFICATION_CONFIG.customThresholds), t100: e.target.checked };
                    handleUpdate({ customThresholds: ct, alertOnExceed: e.target.checked });
                  }}
                  className="rounded accent-rose-500 cursor-pointer"
                />
              </div>
              <div className="text-[11px] text-rose-600 dark:text-rose-400 font-mono font-bold">
                ฿{monthlyBudget.toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {lang === 'th' ? 'เตือนฉุกเฉินระดับสูงเมื่อชนงบ' : 'Critical ceiling alert'}
              </p>
            </div>
          </div>
        </div>

        {/* Custom Exact Percentage Input & Slider */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
              {lang === 'th' ? 'ปรับแต่งเกณฑ์เปอร์เซ็นต์ละเอียด (Custom % Threshold Input):' : 'Custom Energy Threshold Percentage:'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={30}
                max={120}
                step={1}
                value={config.alertThresholdPercent}
                onChange={(e) => {
                  const val = Math.min(120, Math.max(30, Number(e.target.value) || 30));
                  handleUpdate({ alertThresholdPercent: val });
                }}
                className="w-20 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-extrabold text-sm text-center text-emerald-600 dark:text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
              <span className="font-extrabold text-sm text-slate-500">%</span>
              <span className="text-xs text-slate-400 font-mono">
                (= ฿{Math.round((monthlyBudget * config.alertThresholdPercent) / 100).toLocaleString()})
              </span>
            </div>
          </div>

          <input
            type="range"
            min={40}
            max={100}
            step={5}
            value={config.alertThresholdPercent}
            onChange={(e) => handleUpdate({ alertThresholdPercent: Number(e.target.value) })}
            className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>50%</span>
            <span>60%</span>
            <span>70%</span>
            <span className="text-emerald-500 font-bold">80% ({lang === 'th' ? 'แนะนำ' : 'Default'})</span>
            <span>90%</span>
            <span>100%</span>
          </div>

          {/* Preset Quick Chips */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs font-bold text-slate-500">{lang === 'th' ? 'ปุ่มลัดด่วน:' : 'Quick Presets:'}</span>
            {[
              { pct: 50, labelTh: '50% (ครึ่งงบ)', labelEn: '50% (Half)' },
              { pct: 75, labelTh: '75% (3 ใน 4)', labelEn: '75% (3/4)' },
              { pct: 80, labelTh: '80% (มาตรฐานแนะนำ ⭐)', labelEn: '80% (Standard ⭐)' },
              { pct: 90, labelTh: '90% (เกือบชนเพดาน)', labelEn: '90% (Near Cap)' },
              { pct: 100, labelTh: '100% (ชนเพดานงบ)', labelEn: '100% (Budget Cap)' },
            ].map((preset) => {
              const isSelected = config.alertThresholdPercent === preset.pct;
              return (
                <button
                  key={preset.pct}
                  onClick={() => handleUpdate({ alertThresholdPercent: preset.pct })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                      : 'bg-white dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600'
                  }`}
                >
                  {lang === 'th' ? preset.labelTh : preset.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 3: ADVANCED SMART ALERT CONDITIONS */}
      <div className={`p-6 rounded-3xl border transition-all space-y-4 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-500/15 text-rose-500">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
              {lang === 'th' ? 'เงื่อนไขและประเภทการตรวจจับอัจฉริยะ' : 'Smart Anomaly & Energy Rules'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'th' ? 'เลือกเปิด/ปิดกฎการตรวจจับเฉพาะทางที่ต้องการรับแจ้งเตือน' : 'Toggle specific detection algorithms and condition triggers.'}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {/* Rule 1: Exceed Budget */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
            <div className="space-y-0.5 max-w-[80%]">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {lang === 'th' ? '🚨 แจ้งเตือนด่วนเมื่อค่าไฟเกินงบประมาณ (100%+ Exceeded)' : '🚨 Exceed Budget Alert (100%+)'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-rose-500/20 text-rose-600 dark:text-rose-400">
                  Priority
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' 
                  ? 'ส่งการแจ้งเตือนฉุกเฉินระดับสูงทันทีเมื่อการใช้ไฟฟ้าพุ่งชนเพดานงบ พร้อมแนะนำตัดไฟส่วนเกิน'
                  : 'Fires high-priority alert immediately upon crossing monthly budget ceiling.'}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={config.alertOnExceed}
                onChange={(e) => handleUpdate({ alertOnExceed: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
          </div>

          {/* Rule 2: Standby Leak */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
            <div className="space-y-0.5 max-w-[80%]">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {lang === 'th' ? '🔌 ตรวจจับไฟรั่ว / แสตนด์บาย (Standby Leak Warning)' : '🔌 Standby Power Leak Warning'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th'
                  ? 'เตือนเมื่อมีเครื่องใช้ไฟฟ้ากินไฟแช่ขณะไม่ได้ใช้งาน หรือลืมถอดปลั๊กพ่วงไม่อยู่ห้อง'
                  : 'Alerts if continuous phantom loads are detected during idle or away hours.'}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={config.alertOnStandbyLeak}
                onChange={(e) => handleUpdate({ alertOnStandbyLeak: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Rule 3: Night Spikes */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
            <div className="space-y-0.5 max-w-[80%]">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {lang === 'th' ? '🌙 ตรวจจับไฟพุ่งผิดปกติช่วงกลางคืน (Night Spike Anomaly)' : '🌙 Night Anomaly Spike Alert'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th'
                  ? 'แจ้งเตือนเมื่อพบกระแสไฟพุ่งสูงผิดปกติช่วง 00:00 - 06:00 น. (เช่น แอร์ทำงานหนักผิดปกติ)'
                  : 'Monitors midnight surges between 00:00 - 06:00 (e.g. faulty compressor or left-on appliances).'}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={config.alertOnNightSpike}
                onChange={(e) => handleUpdate({ alertOnNightSpike: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* SECTION 4: DAILY ENERGY DIGEST & GOAL SUMMARY CHANNEL */}
      <div className={`p-6 rounded-3xl border transition-all space-y-5 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-500/15 text-blue-500">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'สรุปการใช้พลังงานประจำวัน (Daily Energy Digest)' : 'Daily Energy Digest & Email Trigger'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  Scheduled
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' 
                  ? 'สรุปยอดใช้ไฟรวมวันนี้เทียบกับเป้าหมาย (Goal) ส่งตรงถึงอีเมลคุณทุกวัน พร้อมคำแนะนำ AI' 
                  : 'Daily digest summarizing total consumption vs your target goal, delivered straight to your email.'}
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={config.emailDigestEnabled}
              onChange={(e) => handleUpdate({ emailDigestEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-13 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        {/* Daily Goal Tracking Snapshot Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-500/20 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                {lang === 'th' ? 'ความคืบหน้าการใช้ไฟวันนี้เทียบเป้าหมาย (Today vs Daily Goal)' : 'Today\'s Consumption vs Daily Target'}
              </span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
              dailyGoalPercent > 100 
                ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' 
                : dailyGoalPercent >= 80 
                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' 
                : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
            }`}>
              {dailyGoalPercent > 100 
                ? (lang === 'th' ? '🚨 เกินเป้าหมายวันนี้' : '🚨 Over Daily Target') 
                : dailyGoalPercent >= 80 
                ? (lang === 'th' ? '⚠️ ใกล้ชนเป้าหมาย' : '⚠️ Near Daily Cap') 
                : (lang === 'th' ? '✅ ประหยัดดีเยี่ยม' : '✅ On Track')}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'th' ? 'ใช้ไปวันนี้' : 'Spent Today'}</span>
              <span className="font-mono font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                ฿{dailyCurrentThb}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'th' ? 'เป้าหมายต่อวัน' : 'Daily Goal'}</span>
              <span className="font-mono font-extrabold text-sm sm:text-base text-blue-600 dark:text-blue-400">
                ฿{dailyTargetThb}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'th' ? 'คิดเป็น %' : '% of Goal'}</span>
              <span className={`font-mono font-extrabold text-sm sm:text-base ${
                dailyGoalPercent > 100 ? 'text-rose-500' : dailyGoalPercent >= 80 ? 'text-amber-500' : 'text-emerald-500'
              }`}>
                {dailyGoalPercent}%
              </span>
            </div>
          </div>

          {/* Goal progress track */}
          <div className="space-y-1">
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  dailyGoalPercent > 100 ? 'bg-rose-500' : dailyGoalPercent >= 80 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, dailyGoalPercent)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>{lang === 'th' ? '0 บาท' : '฿0'}</span>
              <span>{lang === 'th' ? `เป้าหมาย: ฿${dailyTargetThb}/วัน` : `Goal: ฿${dailyTargetThb}/day`}</span>
            </div>
          </div>
        </div>

        {/* Email & Scheduling Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
              {lang === 'th' ? 'อีเมลสำหรับรับสรุป (Recipient Email):' : 'Recipient Email Address:'}
            </label>
            <input
              type="email"
              value={config.userEmail}
              onChange={(e) => handleUpdate({ userEmail: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>{lang === 'th' ? 'เวลาส่งสรุปอัตโนมัติประจำวัน:' : 'Daily Scheduled Dispatch Time:'}</span>
              <span className="text-[10px] text-blue-500 font-mono font-bold">Auto-Schedule</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={config.dailyDigestTime || '20:00'}
                onChange={(e) => handleUpdate({ dailyDigestTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 font-mono font-bold text-center"
              />
              <span className="text-xs text-slate-400 whitespace-nowrap">{lang === 'th' ? 'น. ทุกวัน' : 'daily'}</span>
            </div>
          </div>
        </div>

        {/* Dispatch Trigger Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          <button
            onClick={handleTriggerDailyEnergyDigest}
            disabled={isTriggeringDailyDigest}
            className="w-full sm:flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>
              {isTriggeringDailyDigest 
                ? (lang === 'th' ? 'กำลังประมวลผลและส่งอีเมล...' : 'Generating & Dispatching...') 
                : (lang === 'th' ? 'ส่งสรุปการใช้ไฟประจำวันทันที (Trigger Daily Digest)' : 'Trigger Daily Digest Email Now')}
            </span>
          </button>

          <button
            onClick={handleTestEmailDigest}
            disabled={isTestingEmail}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{isTestingEmail ? (lang === 'th' ? 'กำลังส่ง...' : 'Testing...') : (lang === 'th' ? 'ทดสอบ Weekly' : 'Test Weekly')}</span>
          </button>
        </div>
      </div>

      {/* SECTION 5: LINE NOTIFY MOCK SERVICE & PERSONAL TOKEN HUB */}
      <div className={`p-6 rounded-3xl border transition-all space-y-5 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-500/15 text-emerald-500">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg font-display text-slate-900 dark:text-white">
                  LINE Notify (Mock & Live Service Hub)
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                  config.lineNotifyToken 
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-slate-500/20 text-slate-500'
                }`}>
                  {config.lineNotifyToken ? (lang === 'th' ? 'เชื่อมต่อแล้ว' : 'Token Ready') : (lang === 'th' ? 'ยังไม่ใส่ Token' : 'No Token')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' 
                  ? 'วาง Personal Access Token ของคุณเพื่อส่งข้อความแจ้งเตือนค่าไฟเข้าแอป LINE ส่วนตัว' 
                  : 'Paste your LINE Notify Token to trigger real-time messages to your personal LINE account.'}
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={config.lineNotifyEnabled}
              onChange={(e) => handleUpdate({ lineNotifyEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-13 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {/* LINE Notify Token Input Area */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>{lang === 'th' ? 'LINE Notify Personal Access Token:' : 'Personal LINE Notify Token:'}</span>
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleUpdate({ lineNotifyToken: 'demo_token_eduease_smart_line_4642' })}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                {lang === 'th' ? 'ใช้โทเค็นตัวอย่าง' : 'Use Demo Token'}
              </button>
              <a
                href="https://notify-bot.line.me/my/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>{lang === 'th' ? 'ขอ Token ฟรีจาก LINE' : 'Get Free Token'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="relative flex items-center">
            <input
              type={showToken ? 'text' : 'password'}
              value={config.lineNotifyToken}
              onChange={(e) => handleUpdate({ lineNotifyToken: e.target.value })}
              placeholder="Paste your LINE Notify Token here (e.g. 4vT9kLyB8qH2mN...)"
              className="w-full px-3.5 py-2.5 pr-11 rounded-2xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              title={showToken ? 'Hide token' : 'Show token'}
            >
              {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>
              {lang === 'th' 
                ? '💡 ระบบมี Mock Service รองรับการทดสอบแม้ยังไม่ได้ผูกบอทจริง' 
                : '💡 Integrated mock service handles dispatch simulation with zero setup.'}
            </span>
            {config.lineNotifyToken && (
              <span className="text-emerald-500 font-mono font-bold">
                ✓ Ready to dispatch
              </span>
            )}
          </div>
        </div>

        {/* Test LINE Notify Button */}
        <button
          onClick={handleTestLineNotify}
          disabled={isTestingLine}
          className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>
            {isTestingLine 
              ? (lang === 'th' ? 'กำลังส่งข้อความเข้า LINE...' : 'Dispatching to LINE...') 
              : (lang === 'th' ? 'ทดสอบส่งข้อความเข้าบัญชี LINE ส่วนตัว (Test LINE Notify)' : 'Test Message to Personal LINE Account')}
          </span>
        </button>
      </div>

      {/* SECTION 6: LIVE ALERT SIMULATION TEST STATION */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'th' ? 'ศูนย์ทดสอบจำลองเหตุการณ์แจ้งเตือน (Live Alert Simulator)' : 'Live Alert Simulation Station'}</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {lang === 'th' 
            ? 'กดปุ่มด้านล่างเพื่อทดสอบการแสดงผลของการแจ้งเตือนทั้งแบบ Web Push และแบนเนอร์ในระบบ'
            : 'Simulate specific alert triggers to verify how notifications appear on your screen.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={() => handleTestNativePush('threshold')}
            className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <span className="block font-extrabold">{lang === 'th' ? '1. เตือนแตะ 80%' : '1. 80% Warning'}</span>
              <span className="text-[10px] opacity-80">{lang === 'th' ? 'จำลองค่าไฟใกล้ชนงบ' : 'Simulate nearing budget'}</span>
            </div>
          </button>

          <button
            onClick={() => handleTestNativePush('exceed')}
            className="p-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-rose-500 shrink-0" />
            <div>
              <span className="block font-extrabold">{lang === 'th' ? '2. เตือนเกินงบ 100%' : '2. 100% Exceeded'}</span>
              <span className="text-[10px] opacity-80">{lang === 'th' ? 'จำลองค่าไฟทะลุเพดาน' : 'Simulate budget cap breach'}</span>
            </div>
          </button>

          <button
            onClick={() => handleTestNativePush('leak')}
            className="p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30 text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer"
          >
            <Power className="w-4 h-4 text-blue-500 shrink-0" />
            <div>
              <span className="block font-extrabold">{lang === 'th' ? '3. เตือนไฟรั่ว Standby' : '3. Standby Leak'}</span>
              <span className="text-[10px] opacity-80">{lang === 'th' ? 'จำลองไฟแอบดูดไม่อยู่ห้อง' : 'Simulate phantom load'}</span>
            </div>
          </button>
        </div>
      </div>

      {/* LINE CHAT BUBBLE PREVIEW MODAL */}
      <AnimatePresence>
        {showLineBubbleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-[#20272F] text-white p-6 shadow-2xl border border-emerald-500/30 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#06C755] flex items-center justify-center text-white font-bold text-xs">
                    LINE
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">LINE Notify Service</h4>
                    <span className="text-[10px] text-emerald-400">
                      {lineTestResult?.data?.mode === 'live_dispatched' ? 'Live Dispatched' : 'Mock Delivery Active'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowLineBubbleModal(false)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Bubble Presentation */}
              <div className="bg-[#2C3440] rounded-2xl p-4 space-y-3 font-sans border border-slate-700/40">
                <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                  <span>LINE Notify Bot</span>
                  <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="text-xs leading-relaxed whitespace-pre-line text-slate-100 font-mono bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {lineTestResult?.data?.formattedMessage || `\n⚡ [EduEase Alert - ทดสอบ LINE Notify]\n👤 บริบท: หอพักนักศึกษา\n📊 ค่าไฟปัจจุบัน: ฿${monthlyEstimate.toLocaleString()} / งบ ฿${monthlyBudget.toLocaleString()}\n🎯 เกณฑ์แจ้งเตือน: ${config.alertThresholdPercent}%\n💡 สเตตัส: ระบบตรวจจับอัตโนมัติ 24 ชม. พร้อมทำงาน`}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Delivered to: {lineTestResult?.data?.deliveredTo || 'LINE Account (••••••••)'}</span>
                  <span className="text-emerald-400 font-bold">✓ Delivered</span>
                </div>
              </div>

              <button
                onClick={() => setShowLineBubbleModal(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold transition-all cursor-pointer"
              >
                {lang === 'th' ? 'เข้าใจแล้ว (ปิดหน้าต่าง)' : 'Close Preview'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DAILY ENERGY DIGEST PREVIEW MODAL */}
      <AnimatePresence>
        {showDailyDigestModal && dailyDigestResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 shadow-2xl border border-blue-500/30 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {lang === 'th' ? 'รายงานสรุปการใช้พลังงานประจำวัน' : 'Daily Energy Digest Preview'}
                    </h4>
                    <span className="text-[10px] text-blue-500 font-mono">
                      {dailyDigestResult.email} • {dailyDigestResult.date}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDailyDigestModal(false)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Digest Card Body */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-500">{lang === 'th' ? 'สถานะประจำวัน:' : 'Daily Status:'}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    dailyDigestResult.statusType === 'danger' 
                      ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' 
                      : dailyDigestResult.statusType === 'warning' 
                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' 
                      : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {dailyDigestResult.statusTag}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{lang === 'th' ? 'หน่วยไฟวันนี้' : 'Units'}</span>
                    <span className="font-mono font-extrabold text-sm">{dailyDigestResult.dailyConsumptionKwh} kWh</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{lang === 'th' ? 'ค่าไฟวันนี้' : 'Cost Today'}</span>
                    <span className="font-mono font-extrabold text-sm">฿{dailyDigestResult.dailyCostThb}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{lang === 'th' ? 'เป้าหมาย' : 'Daily Goal'}</span>
                    <span className="font-mono font-extrabold text-sm text-blue-500">฿{dailyDigestResult.dailyGoalThb}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{lang === 'th' ? 'เทียบเป้า' : '% of Goal'}</span>
                    <span className="font-mono font-extrabold text-sm text-amber-500">{dailyDigestResult.percentOfGoal}%</span>
                  </div>
                </div>

                {/* Top appliances breakdown */}
                {dailyDigestResult.topAppliances && (
                  <div className="space-y-2 pt-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block text-[11px]">
                      {lang === 'th' ? 'เครื่องใช้ไฟฟ้าที่กินไฟสูงสุดวันนี้:' : 'Top Consuming Appliances Today:'}
                    </span>
                    <div className="space-y-1.5">
                      {dailyDigestResult.topAppliances.map((app: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{app.name}</span>
                          <span className="font-mono text-slate-500">~฿{app.costToday} ({app.hours} ชม.)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Smart Action Advice */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300">
                  <div className="flex items-center gap-1.5 font-extrabold text-[11px] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'th' ? 'คำแนะนำประหยัดไฟวันพรุ่งนี้' : 'Actionable Tip for Tomorrow'}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {dailyDigestResult.smartActionAdvice}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDailyDigestModal(false)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-all cursor-pointer"
              >
                {lang === 'th' ? 'ปิดหน้าต่างสรุป' : 'Close Preview'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECTION 5: LIVE ALERT SIMULATION TEST STATION */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'th' ? 'ศูนย์ทดสอบจำลองเหตุการณ์แจ้งเตือน (Live Alert Simulator)' : 'Live Alert Simulation Station'}</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {lang === 'th' 
            ? 'กดปุ่มด้านล่างเพื่อทดสอบการแสดงผลของการแจ้งเตือนทั้งแบบ Web Push และแบนเนอร์ในระบบ'
            : 'Simulate specific alert triggers to verify how notifications appear on your screen.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={() => handleTestNativePush('threshold')}
            className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <span className="block font-extrabold">{lang === 'th' ? '1. เตือนแตะ 80%' : '1. 80% Warning'}</span>
              <span className="text-[10px] opacity-80">{lang === 'th' ? 'จำลองค่าไฟใกล้ชนงบ' : 'Simulate nearing budget'}</span>
            </div>
          </button>

          <button
            onClick={() => handleTestNativePush('exceed')}
            className="p-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-rose-500 shrink-0" />
            <div>
              <span className="block font-extrabold">{lang === 'th' ? '2. เตือนเกินงบ 100%' : '2. 100% Exceeded'}</span>
              <span className="text-[10px] opacity-80">{lang === 'th' ? 'จำลองค่าไฟทะลุเพดาน' : 'Simulate budget cap breach'}</span>
            </div>
          </button>

          <button
            onClick={() => handleTestNativePush('leak')}
            className="p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30 text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer"
          >
            <Power className="w-4 h-4 text-blue-500 shrink-0" />
            <div>
              <span className="block font-extrabold">{lang === 'th' ? '3. เตือนไฟรั่ว Standby' : '3. Standby Leak'}</span>
              <span className="text-[10px] opacity-80">{lang === 'th' ? 'จำลองไฟแอบดูดไม่อยู่ห้อง' : 'Simulate phantom load'}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
