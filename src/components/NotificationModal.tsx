import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, X, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { NotificationItem, AppPage } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigateToPage: (page: AppPage) => void;
  isDarkMode: boolean;
  lang: 'th' | 'en';
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigateToPage,
  isDarkMode,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 lg:p-6 bg-slate-950/40 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className={`w-full max-w-md rounded-3xl p-5 border shadow-2xl relative mt-16 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-emerald-100 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-base font-display">
              {lang === 'th' ? 'การแจ้งเตือน (Notifications)' : 'Notifications'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[0.7rem] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {lang === 'th' ? 'อ่านทั้งหมด' : 'Mark all read'}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-bold">
              ไม่มีการแจ้งเตือนในขณะนี้
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  onMarkAsRead(notif.id);
                  if (notif.actionPage) {
                    onNavigateToPage(notif.actionPage);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  !notif.read
                    ? isDarkMode
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-emerald-50/60 border-emerald-200'
                    : isDarkMode
                      ? 'bg-slate-800/40 border-slate-800 text-slate-400'
                      : 'bg-slate-50 border-slate-200/80 text-slate-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl text-white shrink-0 mt-0.5 ${
                    notif.priority === 'warning' 
                      ? 'bg-amber-500' 
                      : notif.priority === 'urgent' 
                        ? 'bg-rose-500' 
                        : 'bg-emerald-500'
                  }`}>
                    {notif.priority === 'warning' ? (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    ) : (
                      <Info className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-bold text-xs truncate text-slate-800 dark:text-white">
                        {notif.title}
                      </h4>
                      <span className="text-[0.65rem] text-slate-400 shrink-0 font-medium">
                        {notif.timestamp}
                      </span>
                    </div>

                    <p className="text-[0.72rem] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      {notif.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
