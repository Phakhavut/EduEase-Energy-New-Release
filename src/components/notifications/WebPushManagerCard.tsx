import React, { useState, useEffect } from 'react';
import { 
  BellRing, 
  Smartphone, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  Mail, 
  Sliders,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  NotificationService, 
  NotificationSettingsConfig, 
  DEFAULT_NOTIFICATION_CONFIG 
} from '../../services/notificationService';
import { UserPersona } from '../../types';

interface WebPushManagerCardProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  monthlyEstimate: number;
  monthlyBudget: number;
  persona?: UserPersona;
  onOpenNotificationHub?: () => void;
  onTriggerToast?: (type: 'danger' | 'warning', titleTh?: string, msgTh?: string) => void;
}

export const WebPushManagerCard: React.FC<WebPushManagerCardProps> = ({
  lang,
  isDarkMode,
  monthlyEstimate,
  monthlyBudget,
  persona = 'student',
  onOpenNotificationHub,
  onTriggerToast,
}) => {
  const [config, setConfig] = useState<NotificationSettingsConfig>(DEFAULT_NOTIFICATION_CONFIG);
  const [isTesting, setIsTesting] = useState(false);
  const [testFeedback, setTestFeedback] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    setConfig(NotificationService.getConfig());
    NotificationService.initServiceWorker();
  }, []);

  const isGranted = config.permissionStatus === 'granted';

  const handleToggleWebPush = async () => {
    if (!isGranted) {
      const granted = await NotificationService.requestPermission();
      setConfig(NotificationService.getConfig());
      if (granted) {
        setTestFeedback({
          success: true,
          text: lang === 'th' ? '🟢 เปิด Web Push สำเร็จ! แจ้งเตือนเมื่อปิดแอปได้แล้ว' : '🟢 Web Push enabled successfully!'
        });
      } else {
        setTestFeedback({
          success: false,
          text: lang === 'th' ? '⚠️ สิทธิ์ถูกปฏิเสธในเบราว์เซอร์' : '⚠️ Browser permission denied'
        });
      }
    } else {
      const updated = NotificationService.updateConfig({ webPushEnabled: !config.webPushEnabled });
      setConfig(updated);
    }
  };

  const handleTestRealPush = async () => {
    setIsTesting(true);
    setTestFeedback(null);

    const budgetPercent = Math.round((monthlyEstimate / (monthlyBudget || 1)) * 100);
    const success = await NotificationService.sendNativePush({
      title: lang === 'th' ? '⚡ [แจ้งเตือนจริง] EduEase Energy Web Push' : '⚡ [Real Push] EduEase Energy Alert',
      body: lang === 'th'
        ? `ค่าไฟปัจจุบัน ฿${monthlyEstimate.toLocaleString()} (${budgetPercent}% ของงบ ฿${monthlyBudget.toLocaleString()}) - ระบบพร้อมแจ้งเตือนอัตโนมัติ 24 ชม.`
        : `Current usage ฿${monthlyEstimate.toLocaleString()} (${budgetPercent}% of budget) - 24/7 background alerts active.`,
      type: budgetPercent >= 100 ? 'danger' : 'warning',
      tag: 'quick-test-push',
    });

    if (success) {
      setTestFeedback({
        success: true,
        text: lang === 'th' ? '🚀 ส่ง Web Push เข้า OS สำเร็จ!' : '🚀 Native notification sent to OS!'
      });
      if (onTriggerToast) {
        onTriggerToast('warning', 'ส่ง Web Push Notification เข้าอุปกรณ์สำเร็จ', 'Web Push dispatched to OS');
      }
    } else {
      setTestFeedback({
        success: false,
        text: lang === 'th' ? 'ไม่สามารถส่งได้ กรุณากดเปิดสิทธิ์ Web Push ก่อน' : 'Failed to send. Please grant Web Push permission first.'
      });
    }
    setIsTesting(false);
  };

  return (
    <div className={`p-5 rounded-3xl border transition-all space-y-4 ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800 text-white' 
        : 'bg-gradient-to-br from-white via-emerald-50/20 to-slate-50 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
            <BellRing className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm sm:text-base font-display">
                {lang === 'th' ? 'ระบบแจ้งเตือน Web Push & LINE อัตโนมัติ' : 'Automated Web Push & LINE Alerts'}
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                isGranted && config.webPushEnabled
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
              }`}>
                {isGranted && config.webPushEnabled
                  ? (lang === 'th' ? '🟢 พร้อมแจ้งเตือน 24 ชม.' : '🟢 24/7 Active')
                  : (lang === 'th' ? '🟡 ยังไม่ได้เปิด Web Push' : '🟡 Web Push Inactive')}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'th'
                ? 'แจ้งเตือนเมื่อใช้ไฟแตะ 80% หรือเกินงบได้จริงแม้ปิดแอป (ผ่าน Service Worker / LINE Notify)'
                : 'Real OS push notifications when app is closed via Service Worker and LINE Notify fallback.'}
            </p>
          </div>
        </div>

        {onOpenNotificationHub && (
          <button
            onClick={onOpenNotificationHub}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>{lang === 'th' ? 'ตั้งค่าการแจ้งเตือนทั้งหมด' : 'All Alert Settings'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Test feedback toast inline */}
      {testFeedback && (
        <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
          testFeedback.success
            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
            : 'bg-rose-500/15 border-rose-500/30 text-rose-700 dark:text-rose-300'
        }`}>
          {testFeedback.success ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />}
          <span>{testFeedback.text}</span>
        </div>
      )}

      {/* Status & Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        {/* Channel 1: Web Push */}
        <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <span className="font-extrabold text-xs">Web Push</span>
            </div>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
              isGranted && config.webPushEnabled ? 'bg-emerald-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              {isGranted && config.webPushEnabled ? 'Active' : 'Off'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {lang === 'th' ? 'ส่งป๊อปอัปแจ้งเตือนลงเครื่องคอม / มือถือ' : 'Native OS system notifications'}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleToggleWebPush}
              className={`w-full py-1.5 px-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                isGranted && config.webPushEnabled
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
              }`}
            >
              {isGranted && config.webPushEnabled
                ? (lang === 'th' ? 'ปิดชั่วคราว' : 'Disable')
                : (lang === 'th' ? 'เปิดใช้งาน' : 'Enable')}
            </button>
          </div>
        </div>

        {/* Channel 2: LINE Notify */}
        <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="font-extrabold text-xs">LINE Notify</span>
            </div>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
              config.lineNotifyEnabled ? 'bg-emerald-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              {config.lineNotifyEnabled ? 'Active' : 'Standby'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {lang === 'th' ? 'แจ้งเตือนเข้าแชต LINE แม้ล็อกหน้าจอ' : 'Direct alerts into your LINE chat'}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onOpenNotificationHub}
              className="w-full py-1.5 px-2.5 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all cursor-pointer"
            >
              {config.lineNotifyEnabled ? (lang === 'th' ? 'จัดการ Token' : 'Manage Token') : (lang === 'th' ? 'เชื่อมต่อ LINE' : 'Connect LINE')}
            </button>
          </div>
        </div>

        {/* Channel 3: Email Weekly Summary */}
        <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span className="font-extrabold text-xs">Email Digest</span>
            </div>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
              config.emailDigestEnabled ? 'bg-blue-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              {config.emailDigestEnabled ? 'Weekly' : 'Off'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {config.userEmail || '23phakhavut43@gmail.com'}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onOpenNotificationHub}
              className="w-full py-1.5 px-2.5 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all cursor-pointer"
            >
              {lang === 'th' ? 'ตั้งค่าอีเมล' : 'Email Config'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Test Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 flex-wrap gap-2 text-xs">
        <span className="text-slate-500 text-[11px]">
          {lang === 'th' 
            ? `เกณฑ์ตรวจจับอัตโนมัติ: เตือนที่ ${config.alertThresholdPercent}% และเมื่อเกินงบ 100%` 
            : `Automatic triggers: Alert at ${config.alertThresholdPercent}% and exceed budget (100%)`}
        </span>

        <button
          onClick={handleTestRealPush}
          disabled={isTesting}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Send className="w-3 h-3" />
          <span>{isTesting ? (lang === 'th' ? 'กำลังยิง Push...' : 'Dispatching...') : (lang === 'th' ? 'ทดสอบยิง Web Push จริง' : 'Test Real Web Push')}</span>
        </button>
      </div>
    </div>
  );
};
