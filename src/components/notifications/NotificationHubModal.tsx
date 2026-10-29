import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BellRing, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Smartphone, 
  Send, 
  Mail, 
  Sliders, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Info,
  ExternalLink,
  MessageSquare,
  Clock,
  Laptop,
  Sun,
  TrendingDown,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { 
  NotificationService, 
  NotificationSettingsConfig, 
  DEFAULT_NOTIFICATION_CONFIG 
} from '../../services/notificationService';
import { 
  DailyDigestService, 
  DailyEnergyDigest 
} from '../../services/dailyDigestService';
import { UserPersona, Appliance } from '../../types';

interface NotificationHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  monthlyEstimate: number;
  monthlyBudget: number;
  persona?: UserPersona;
  appliances?: Appliance[];
  onTriggerToast?: (type: 'danger' | 'warning', customTh?: string, customEn?: string) => void;
  onOpenFullDigestModal?: () => void;
}

export const NotificationHubModal: React.FC<NotificationHubModalProps> = ({
  isOpen,
  onClose,
  lang,
  isDarkMode,
  monthlyEstimate,
  monthlyBudget,
  persona = 'student',
  appliances = [],
  onTriggerToast,
  onOpenFullDigestModal,
}) => {
  const [config, setConfig] = useState<NotificationSettingsConfig>(DEFAULT_NOTIFICATION_CONFIG);
  const [activeTab, setActiveTab] = useState<'webpush' | 'daily' | 'line' | 'email' | 'rules'>('daily');
  const [isTestingWebPush, setIsTestingWebPush] = useState(false);
  const [isTestingLine, setIsTestingLine] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [isTestingDigest, setIsTestingDigest] = useState(false);
  const [digestPreview, setDigestPreview] = useState<DailyEnergyDigest | null>(null);
  const [testResult, setTestResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Sync config from localStorage on mount/open
  useEffect(() => {
    if (isOpen) {
      const currentConfig = NotificationService.getConfig();
      setConfig(currentConfig);
      // Init Service worker
      NotificationService.initServiceWorker();
      // Generate daily digest preview
      const preview = DailyDigestService.generateLocalDigest(appliances, monthlyBudget, persona, 1);
      setDigestPreview(preview);
    }
  }, [isOpen, appliances, monthlyBudget, persona]);

  const handleUpdate = (partial: Partial<NotificationSettingsConfig>) => {
    const updated = NotificationService.updateConfig(partial);
    setConfig(updated);
  };

  const handleTestDailyDigest = async () => {
    setIsTestingDigest(true);
    setTestResult(null);

    const digestToUse = digestPreview || DailyDigestService.generateLocalDigest(appliances, monthlyBudget, persona, 1);
    const res = await DailyDigestService.dispatchDigestToChannels(
      digestToUse,
      {
        webPush: true,
        email: config.emailDigestEnabled,
        line: config.lineNotifyEnabled,
      },
      lang
    );

    setTestResult({
      type: res.success ? 'success' : 'error',
      message: res.message,
    });
    setIsTestingDigest(false);
  };

  const handleRequestWebPush = async () => {
    const granted = await NotificationService.requestPermission();
    setConfig(NotificationService.getConfig());
    if (granted) {
      setTestResult({
        type: 'success',
        message: lang === 'th' 
          ? '🎉 เปิดการแจ้งเตือน Web Push สำเร็จ! คุณจะได้รับการแจ้งเตือนแม้ไม่ได้เปิดหน้าเว็บ' 
          : '🎉 Web Push enabled! You will receive system notifications even when the app is closed.'
      });
    } else {
      setTestResult({
        type: 'error',
        message: lang === 'th' 
          ? '⚠️ สิทธิ์การแจ้งเตือนถูกปฏิเสธ หรือเบราว์เซอร์ไม่อนุญาต กรุณาเปิดในการตั้งค่าเบราว์เซอร์' 
          : '⚠️ Notification permission was denied in your browser settings.'
      });
    }
  };

  const handleTestNativePush = async () => {
    setIsTestingWebPush(true);
    setTestResult(null);

    const budgetPercent = Math.round((monthlyEstimate / (monthlyBudget || 1)) * 100);
    const success = await NotificationService.sendNativePush({
      title: lang === 'th' ? '⚡ [ทดสอบแจ้งเตือนจริง] EduEase Energy Web Push' : '⚡ [Real Test] EduEase Energy Web Push',
      body: lang === 'th'
        ? `การใช้ไฟเดือนนี้: ฿${monthlyEstimate.toLocaleString()} (${budgetPercent}% ของงบ ฿${monthlyBudget.toLocaleString()}) - ระบบพร้อมแจ้งเตือนอัตโนมัติ 24 ชม.`
        : `Usage: ฿${monthlyEstimate.toLocaleString()} (${budgetPercent}% of ฿${monthlyBudget.toLocaleString()} budget) - 24/7 background alerts active.`,
      type: budgetPercent >= 100 ? 'danger' : 'warning',
      tag: 'test-native-push',
    });

    if (success) {
      setTestResult({
        type: 'success',
        message: lang === 'th' 
          ? '🚀 ส่ง Native Browser Notification ไปยังหน้าจออุปกรณ์ของคุณสำเร็จแล้ว!' 
          : '🚀 Native Notification dispatched to your operating system!'
      });
      if (onTriggerToast) {
        onTriggerToast('warning', 'ส่ง Web Push Notification ไปยังระบบปฏิบัติการสำเร็จ', 'Web Push dispatched to OS');
      }
    } else {
      setTestResult({
        type: 'error',
        message: lang === 'th'
          ? 'ไม่สามารถแสดง Notification ได้ กรุณากด "เปิดใช้งาน Web Push" ก่อน'
          : 'Unable to trigger notification. Please enable Web Push first.'
      });
    }
    setIsTestingWebPush(false);
  };

  const handleTestLineNotify = async () => {
    setIsTestingLine(true);
    setTestResult(null);

    const budgetPercent = Math.round((monthlyEstimate / (monthlyBudget || 1)) * 100);
    const res = await NotificationService.sendLineNotify({
      token: config.lineNotifyToken,
      message: `\n⚡ [EduEase Energy แจ้งเตือน]\n👤 บทบาท: ${persona === 'student' ? 'หอพักนักศึกษา' : 'ผู้ใช้งานทั่วไป'}\n📊 ค่าไฟปัจจุบัน: ฿${monthlyEstimate.toLocaleString()} / งบ ฿${monthlyBudget.toLocaleString()} (${budgetPercent}%)\n💡 คำแนะนำ: ปรับแอร์ 26°C และปิดสวิตช์ปลั๊กพ่วงช่วง On-Peak`,
      isTest: true,
    });

    setTestResult({
      type: res.success ? 'success' : 'error',
      message: res.message,
    });
    setIsTestingLine(false);
  };

  const handleTestEmailDigest = async () => {
    setIsTestingEmail(true);
    setTestResult(null);

    const res = await NotificationService.sendEmailDigest({
      email: config.userEmail,
      summaryData: {
        totalCostThb: monthlyEstimate,
        monthlyBudget: monthlyBudget,
        budgetPercent: Math.round((monthlyEstimate / (monthlyBudget || 1)) * 100),
      },
      isTest: true,
    });

    setTestResult({
      type: res.success ? 'success' : 'error',
      message: res.message,
    });
    setIsTestingEmail(false);
  };

  if (!isOpen) return null;

  const isGranted = config.permissionStatus === 'granted';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh] ${
            isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                <BellRing className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg font-display flex items-center gap-2">
                  <span>{lang === 'th' ? 'ศูนย์แจ้งเตือนอัจฉริยะ (Multi-Channel Alerts)' : 'Smart Notification Hub'}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    24/7 Push
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th' 
                    ? 'แจ้งเตือนค่าไฟและไฟรั่วอัตโนมัติ แม้ไม่ได้เปิดแอป (Web Push, LINE, อีเมล)' 
                    : 'Real-time background alerts via Web Push, LINE Notify, and Email Digest.'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 overflow-x-auto">
            <button
              onClick={() => { setActiveTab('daily'); setTestResult(null); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'daily'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'th' ? 'Daily Energy Digest (สรุปประจำวัน)' : 'Daily Energy Digest'}</span>
            </button>

            <button
              onClick={() => { setActiveTab('webpush'); setTestResult(null); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'webpush'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'Web Push (แจ้งเตือนเครื่อง)' : 'Web Push Notification'}</span>
            </button>

            <button
              onClick={() => { setActiveTab('line'); setTestResult(null); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'line'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'th' ? 'LINE Notify (แชต)' : 'LINE Notify'}</span>
            </button>

            <button
              onClick={() => { setActiveTab('email'); setTestResult(null); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'email'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'อีเมลสรุป' : 'Email Digest'}</span>
            </button>

            <button
              onClick={() => { setActiveTab('rules'); setTestResult(null); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'rules'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{lang === 'th' ? 'กฎการเตือนอัตโนมัติ' : 'Alert Triggers'}</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 overflow-y-auto space-y-5 flex-1">
            {/* Live Feedback Alert Banner */}
            {testResult && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-bold ${
                  testResult.type === 'success'
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-300'
                }`}
              >
                {testResult.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 shrink-0 text-rose-500" />
                )}
                <span>{testResult.message}</span>
              </motion.div>
            )}

            {/* TAB: DAILY ENERGY DIGEST */}
            {activeTab === 'daily' && digestPreview && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-blue-500/10 to-transparent border border-blue-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                        {lang === 'th' ? 'Daily Energy Digest: สรุปแนวโน้มการใช้ไฟเมื่อวานนี้' : 'Daily Energy Digest: Yesterday Trends'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {lang === 'th' ? digestPreview.displayDateTh : digestPreview.displayDateEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    {lang === 'th' ? digestPreview.overallSummaryTh : digestPreview.overallSummaryEn}
                  </p>
                </div>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      {lang === 'th' ? 'ค่าไฟเมื่อวาน' : 'Yesterday Cost'}
                    </span>
                    <span className="text-base font-extrabold font-mono text-[#2563EB] dark:text-[#38BDF8]">
                      ฿{digestPreview.yesterdayCostThb}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      {lang === 'th' ? 'แนวโน้มวันต่อวัน' : 'Day-over-Day'}
                    </span>
                    <span className={`text-xs font-bold inline-flex items-center gap-0.5 ${
                      digestPreview.dayOverDayTrend === 'improved'
                        ? 'text-emerald-500'
                        : 'text-amber-500'
                    }`}>
                      {digestPreview.dayOverDayTrend === 'improved' ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                      <span>{digestPreview.dayOverDayChangePct >= 0 ? '+' : ''}{digestPreview.dayOverDayChangePct}%</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      {lang === 'th' ? 'ช่วงพีคโหลด' : 'Peak Window'}
                    </span>
                    <span className="text-xs font-bold font-mono text-amber-500">
                      {digestPreview.peakHourWindow}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      {lang === 'th' ? 'เป้าหมายรายวัน' : 'Daily Goal'}
                    </span>
                    <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">
                      {digestPreview.goalPercent}%
                    </span>
                  </div>
                </div>

                {/* Personalized Tips Preview */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    {lang === 'th' ? 'เคล็ดลับเฉพาะคุณที่สร้างจากข้อมูลเมื่อวาน' : 'Personalized Tips Generated for You'}
                  </span>
                  {digestPreview.personalizedTips.slice(0, 2).map((tip) => (
                    <div
                      key={tip.id}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex items-start gap-2.5"
                    >
                      <span className="text-lg shrink-0">{tip.icon}</span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">
                          {lang === 'th' ? tip.titleTh : tip.titleEn}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block line-clamp-1">
                          {lang === 'th' ? tip.descTh : tip.descEn}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Schedule Time & Action */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {lang === 'th' ? 'เวลาส่งแจ้งเตือนทุกวัน:' : 'Daily Schedule:'}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#2563EB] dark:text-[#38BDF8]">
                      {config.dailyDigestTime || '08:00'} น.
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onOpenFullDigestModal && (
                      <button
                        onClick={onOpenFullDigestModal}
                        className="px-3 py-1.5 rounded-xl border border-blue-500/40 text-[#2563EB] dark:text-[#38BDF8] text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all cursor-pointer"
                      >
                        {lang === 'th' ? 'ดูรายงานฉบับเต็ม' : 'Full Digest View'}
                      </button>
                    )}

                    <button
                      onClick={handleTestDailyDigest}
                      disabled={isTestingDigest}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isTestingDigest ? (lang === 'th' ? 'กำลังส่ง...' : 'Sending...') : (lang === 'th' ? 'ส่งสรุปนี้เข้าเครื่องทันที' : 'Send Digest Push')}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: WEB PUSH NOTIFICATIONS */}
            {activeTab === 'webpush' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                  isGranted
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-amber-500/10 border-amber-500/30'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl text-white ${isGranted ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm">
                          {lang === 'th' ? 'สถานะ Web Push บนอุปกรณ์นี้' : 'Device Web Push Status'}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          isGranted 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-amber-500 text-white'
                        }`}>
                          {isGranted ? (lang === 'th' ? '🟢 ใช้งานได้ (Active)' : 'Active') : (lang === 'th' ? '⚠️ ยังไม่เปิดสิทธิ์' : 'Not Granted')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isGranted
                          ? (lang === 'th' ? 'พร้อมแจ้งเตือนผ่าน Service Worker แม้ปิดแท็บหรือย่อหน้าต่าง' : 'Service Worker ready. Alerts work in the background.')
                          : (lang === 'th' ? 'กดปุ่มด้านล่างเพื่ออนุญาตให้เบราว์เซอร์ส่งการแจ้งเตือน' : 'Click below to grant notification permission.')}
                      </p>
                    </div>
                  </div>

                  {!isGranted && (
                    <button
                      onClick={handleRequestWebPush}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
                    >
                      {lang === 'th' ? 'เปิดใช้งาน Web Push' : 'Enable Web Push'}
                    </button>
                  )}
                </div>

                {/* Service Worker Features Overview for Students */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2.5 text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span>{lang === 'th' ? 'สำหรับนักศึกษาที่ไม่เปิดแอปทั้งวัน (How it works):' : 'Background Architecture:'}</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
                    <li>
                      <strong>Service Worker (`/sw.js`):</strong> {lang === 'th' ? 'ทำงานเบื้องหลัง คอยดักจับการแจ้งเตือนและข้อความ Push ได้โดยตรง' : 'Runs in the background handling OS native alerts.'}
                    </li>
                    <li>
                      <strong>Action Buttons:</strong> {lang === 'th' ? 'ป๊อปอัปของระบบมีปุ่ม "⚡ สวิตช์ Eco Cut" และ "🔍 ดูงบ" เพื่อกดตัดไฟหรือดูรายละเอียดได้ทันที' : 'Includes native action buttons to cut power or review budget.'}
                    </li>
                    <li>
                      <strong>Automated Threshold Crossing:</strong> {lang === 'th' ? 'เมื่อการใช้ไฟแตะ 80% หรือเกิน 100% ระบบจะยิงแจ้งเตือนทันทีโดยไม่ต้องกดทดสอบด้วยมือ' : 'Automatically fires alerts when usage crosses 80% or budget cap.'}
                    </li>
                  </ul>
                </div>

                {/* Actions & Test Button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {lang === 'th' ? 'เปิดรับแจ้งเตือน Web Push อัตโนมัติ' : 'Auto Web Push Enabled'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.webPushEnabled && isGranted}
                        onChange={(e) => {
                          if (e.target.checked && !isGranted) {
                            handleRequestWebPush();
                          } else {
                            handleUpdate({ webPushEnabled: e.target.checked });
                          }
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  <button
                    onClick={handleTestNativePush}
                    disabled={isTestingWebPush}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{isTestingWebPush ? (lang === 'th' ? 'กำลังยิงแจ้งเตือน...' : 'Dispatching...') : (lang === 'th' ? '⚡ ทดสอบยิง Web Push จริง' : 'Test Real Web Push')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: LINE NOTIFY FALLBACK */}
            {activeTab === 'line' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-500" />
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                        {lang === 'th' ? 'LINE Notify Integration (รับแจ้งเตือนเข้ามือถือ)' : 'LINE Notify Fallback'}
                      </span>
                    </div>
                    <a
                      href="https://notify-bot.line.me/my/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>{lang === 'th' ? 'ขอ Token ฟรีจาก LINE' : 'Get Free Token'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'th'
                      ? 'สำหรับกรณีปิดเบราว์เซอร์หรือเครื่องล็อกอยู่ ระบบจะส่งข้อความแจ้งเตือนค่าไฟเกินงบไปยังแชต LINE ของคุณทันที'
                      : 'Fallback channel: delivers instant alerts straight into your LINE chat room.'}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    {lang === 'th' ? 'LINE Notify Personal Access Token' : 'LINE Notify Token'}
                  </label>
                  <input
                    type="password"
                    value={config.lineNotifyToken}
                    onChange={(e) => handleUpdate({ lineNotifyToken: e.target.value })}
                    placeholder="วาง Token ของคุณที่นี่ (e.g. 4vT9kL...)"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {lang === 'th' ? 'เปิดแจ้งเตือนผ่าน LINE' : 'Enable LINE Alerts'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.lineNotifyEnabled}
                        onChange={(e) => handleUpdate({ lineNotifyEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  <button
                    onClick={handleTestLineNotify}
                    disabled={isTestingLine}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isTestingLine ? (lang === 'th' ? 'กำลังส่ง LINE...' : 'Sending...') : (lang === 'th' ? '💬 ทดสอบส่งข้อความ LINE' : 'Test LINE Message')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: EMAIL DIGEST */}
            {activeTab === 'email' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {lang === 'th' ? 'อีเมลสรุปภาพรวมรายสัปดาห์ (Weekly PDF & Digest)' : 'Weekly Energy Digest'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'th'
                      ? 'สรุปหน่วยการใช้ไฟฟ้า ค่าไฟที่คาดการณ์ และคำแนะนำ AI ทุกวันอาทิตย์เวลา 20:00 น.'
                      : 'Weekly email digest with comprehensive PDF summary and AI saving tips sent every Sunday.'}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    {lang === 'th' ? 'อีเมลผู้รับรายงาน' : 'Recipient Email'}
                  </label>
                  <input
                    type="email"
                    value={config.userEmail}
                    onChange={(e) => handleUpdate({ userEmail: e.target.value })}
                    placeholder="name@student.chula.ac.th"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {lang === 'th' ? 'เปิดรับอีเมลสรุปสัปดาห์' : 'Enable Weekly Digest'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.emailDigestEnabled}
                        onChange={(e) => handleUpdate({ emailDigestEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  <button
                    onClick={handleTestEmailDigest}
                    disabled={isTestingEmail}
                    className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isTestingEmail ? (lang === 'th' ? 'กำลังส่งอีเมล...' : 'Sending...') : (lang === 'th' ? '📧 ทดสอบส่งอีเมลสรุป' : 'Test Email Summary')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: ALERT RULES & THRESHOLDS */}
            {activeTab === 'rules' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-slate-900 dark:text-white block">
                        {lang === 'th' ? 'เตือนล่วงหน้าเมื่อใช้ไฟถึง (%)' : 'Early Warning Threshold (%)'}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {lang === 'th' ? 'ระบบจะแจ้งเตือนอัตโนมัติเมื่อใช้ไฟถึงเปอร์เซ็นต์ที่กำหนด' : 'Auto-alert when threshold is reached.'}
                      </span>
                    </div>
                    <span className="font-mono font-black text-sm text-emerald-500 bg-emerald-500/15 px-2.5 py-1 rounded-xl">
                      {config.alertThresholdPercent}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min={50}
                    max={95}
                    step={5}
                    value={config.alertThresholdPercent}
                    onChange={(e) => handleUpdate({ alertThresholdPercent: Number(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>50%</span>
                    <span>70%</span>
                    <span>80% (แนะนำ)</span>
                    <span>95%</span>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {lang === 'th' ? '🚨 แจ้งเตือนฉุกเฉินเมื่อเกินงบ 100%' : '🚨 Exceed Budget Alert (100%+)'}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {lang === 'th' ? 'ยิง Web Push และ LINE ทันทีเมื่อแตะเพดานงบ' : 'Instant push when exceeding total budget'}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.alertOnExceed}
                      onChange={(e) => handleUpdate({ alertOnExceed: e.target.checked })}
                      className="accent-emerald-500 w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {lang === 'th' ? '🔌 ตรวจจับไฟรั่ว / แสตนด์บาย (Standby Leak)' : '🔌 Standby Power Leak Warning'}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {lang === 'th' ? 'เตือนเมื่อมีอุปกรณ์กินไฟแช่ขณะไม่อยู่ห้อง' : 'Alert on continuous background draw'}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.alertOnStandbyLeak}
                      onChange={(e) => handleUpdate({ alertOnStandbyLeak: e.target.checked })}
                      className="accent-emerald-500 w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {lang === 'th' ? '🌙 ตรวจจับไฟพุ่งผิดปกติช่วงกลางคืน (Night Spike)' : '🌙 Night Anomaly Spike Alert'}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {lang === 'th' ? 'เตือนเมื่อคอมพิวเตอร์หรือแอร์ทำงานหนักผิดปกติเวลานอน' : 'Alert on unusual overnight load'}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.alertOnNightSpike}
                      onChange={(e) => handleUpdate({ alertOnNightSpike: e.target.checked })}
                      className="accent-emerald-500 w-4 h-4"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'th' ? 'ระบบตรวจจับอัตโนมัติทำงานอยู่เบื้องหลัง' : 'Automated background watcher active'}</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              {lang === 'th' ? 'บันทึก & เสร็จสิ้น' : 'Done & Save'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
