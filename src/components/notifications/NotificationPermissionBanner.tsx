import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BellRing, Check, X, ShieldAlert, Zap, ArrowRight, Smartphone } from 'lucide-react';
import { NotificationService } from '../../services/notificationService';

interface NotificationPermissionBannerProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onOpenSettingsNotifications?: () => void;
}

export const NotificationPermissionBanner: React.FC<NotificationPermissionBannerProps> = ({
  lang,
  isDarkMode,
  onOpenSettingsNotifications,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session or permission already resolved
    const isDismissed = sessionStorage.getItem('eduease_notif_banner_dismissed') === 'true';
    if (isDismissed) return;

    if (typeof window !== 'undefined' && 'Notification' in window) {
      const status = Notification.permission;
      if (status === 'default') {
        // Show gentle UI prompt after a brief 2.5s delay on dashboard load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleGrant = async () => {
    setIsRequesting(true);
    const granted = await NotificationService.requestPermission();
    setIsRequesting(false);
    setIsVisible(false);
    sessionStorage.setItem('eduease_notif_banner_dismissed', 'true');
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    sessionStorage.setItem('eduease_notif_banner_dismissed', 'true');
  };

  if (!isVisible || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative z-20 mb-5 overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-emerald-500/15 p-4 sm:p-5 shadow-lg backdrop-blur-md"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
              <BellRing className="h-6 w-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-black uppercase text-amber-700 dark:text-amber-300">
                  {lang === 'th' ? '⚡ ป้องกันค่าไฟบวม' : '⚡ Energy Alert'}
                </span>
                <h4 className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  {lang === 'th' 
                    ? 'เปิดการแจ้งเตือนค่าไฟอัจฉริยะ (Web Push)' 
                    : 'Enable Real-time Energy & Budget Alerts'}
                </h4>
              </div>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                {lang === 'th'
                  ? 'รับแจ้งเตือนทันทีเมื่อการใช้ไฟฟ้าแตะ 50%, 80% หรือเกิน 100% ของงบประมาณ แม้ไม่ได้เปิดแอป'
                  : 'Get notified instantly when energy usage hits 50%, 80%, or exceeds 100% of your budget.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleGrant}
              disabled={isRequesting}
              className="flex items-center gap-1.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 px-4 py-2 text-xs font-black text-white shadow-md shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              <span>{isRequesting ? (lang === 'th' ? 'กำลังบันทึก...' : 'Enabling...') : (lang === 'th' ? 'อนุญาตการแจ้งเตือน' : 'Allow Notifications')}</span>
            </button>

            {onOpenSettingsNotifications && (
              <button
                onClick={() => {
                  handleDismiss();
                  onOpenSettingsNotifications();
                }}
                className="flex items-center gap-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              >
                <span>{lang === 'th' ? 'ตั้งค่าเกณฑ์' : 'Configure'}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}

            <button
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="rounded-full p-2 text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
