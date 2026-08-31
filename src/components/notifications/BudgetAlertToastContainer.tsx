import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  X, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  BellRing,
  Sparkles
} from 'lucide-react';
import { AppPage } from '../../types';

export interface BudgetToastNotification {
  id: string;
  type: 'danger' | 'warning' | 'info' | 'success';
  titleTh: string;
  titleEn: string;
  messageTh: string;
  messageEn: string;
  amountThb?: number;
  thresholdPercent?: number;
  timestamp: string;
  actionPage?: AppPage;
  actionLabelTh?: string;
  actionLabelEn?: string;
}

interface BudgetAlertToastContainerProps {
  toasts: BudgetToastNotification[];
  onDismiss: (id: string) => void;
  onNavigatePage: (page: AppPage) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const BudgetAlertToastContainer: React.FC<BudgetAlertToastContainerProps> = ({
  toasts,
  onDismiss,
  onNavigatePage,
  lang,
  isDarkMode,
}) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none px-3 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isDanger = toast.type === 'danger';
          const isWarning = toast.type === 'warning';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto p-4 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-md transition-all ${
                isDanger
                  ? isDarkMode
                    ? 'bg-slate-900/95 border-rose-500/60 text-white shadow-rose-950/40 ring-1 ring-rose-500/30'
                    : 'bg-white/95 border-rose-400 text-slate-900 shadow-rose-500/20 ring-1 ring-rose-300'
                  : isWarning
                    ? isDarkMode
                      ? 'bg-slate-900/95 border-amber-500/60 text-white shadow-amber-950/40 ring-1 ring-amber-500/30'
                      : 'bg-white/95 border-amber-400 text-slate-900 shadow-amber-500/20 ring-1 ring-amber-300'
                    : isDarkMode
                      ? 'bg-slate-900/95 border-emerald-500/60 text-white'
                      : 'bg-white/95 border-emerald-400 text-slate-900'
              }`}
            >
              {/* Top Accent bar */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  isDanger ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                }`} 
              />

              <div className="flex items-start justify-between gap-3 mt-1">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-2xl shrink-0 shadow-md ${
                    isDanger 
                      ? 'bg-rose-500 text-white animate-bounce' 
                      : isWarning 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-emerald-500 text-white'
                  }`}>
                    {isDanger ? (
                      <ShieldAlert className="w-5 h-5" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm tracking-tight font-display">
                        {lang === 'th' ? toast.titleTh : toast.titleEn}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {lang === 'th' ? toast.messageTh : toast.messageEn}
                    </p>

                    {toast.thresholdPercent && (
                      <div className="flex items-center gap-2 pt-1 font-mono text-[0.7rem]">
                        <span className={`font-black ${isDanger ? 'text-rose-500' : 'text-amber-500'}`}>
                          {toast.thresholdPercent}% {lang === 'th' ? 'ของงบ' : 'of budget'}
                        </span>
                        <span className="text-slate-400">• {toast.timestamp}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onDismiss(toast.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60">
                <button
                  onClick={() => onDismiss(toast.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-all cursor-pointer"
                >
                  {lang === 'th' ? 'ปิด' : 'Dismiss'}
                </button>

                {toast.actionPage && (
                  <button
                    onClick={() => {
                      onNavigatePage(toast.actionPage!);
                      onDismiss(toast.id);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                      isDanger
                        ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                        : isWarning
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                          : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    <Zap className="w-3 h-3" />
                    <span>
                      {lang === 'th' 
                        ? (toast.actionLabelTh || 'ตรวจสอบงบ') 
                        : (toast.actionLabelEn || 'Review Budget')}
                    </span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
