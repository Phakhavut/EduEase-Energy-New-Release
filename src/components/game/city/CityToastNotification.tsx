import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  X, 
  Coins, 
  Target, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { useSafeReducedMotion } from '../../../hooks/useSafeReducedMotion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id?: string;
  message: string;
  type: ToastType;
  title?: string;
  reason?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: 'missions' | 'challenges' | 'coins';
  };
}

export interface CityToastNotificationProps {
  toast: ToastItem | null;
  onDismiss: () => void;
  lang?: 'th' | 'en';
}

export const CityToastNotification: React.FC<CityToastNotificationProps> = ({
  toast,
  onDismiss,
  lang = 'th'
}) => {
  const shouldReduceMotion = useSafeReducedMotion();

  // Escape key handler for accessible dismissal
  useEffect(() => {
    if (!toast) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toast, onDismiss]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.message}
          role={toast.type === 'error' || toast.type === 'warning' ? 'alert' : 'status'}
          aria-live={toast.type === 'error' || toast.type === 'warning' ? 'assertive' : 'polite'}
          aria-atomic="true"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.96 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className={`fixed top-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex flex-col gap-2.5 transition-all ${
            toast.type === 'error'
              ? 'bg-slate-900/95 border-rose-500/80 text-white shadow-rose-500/20 ring-2 ring-rose-500/30'
              : toast.type === 'warning'
              ? 'bg-slate-900/95 border-amber-500/80 text-white shadow-amber-500/20 ring-2 ring-amber-500/30'
              : toast.type === 'success'
              ? 'bg-slate-900/95 border-emerald-500/80 text-white shadow-emerald-500/20 ring-2 ring-emerald-500/30'
              : 'bg-slate-900/95 border-sky-500/80 text-white shadow-sky-500/20 ring-2 ring-sky-500/30'
          }`}
        >
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                toast.type === 'error'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : toast.type === 'warning'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : toast.type === 'success'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
              }`}>
                {toast.type === 'error' && (
                  toast.reason === 'not-enough-credits' ? <Coins className="w-5 h-5" /> :
                  toast.reason === 'locked-plot' || toast.reason === 'locked-asset' ? <Lock className="w-5 h-5" /> :
                  <AlertCircle className="w-5 h-5" />
                )}
                {toast.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                {toast.type === 'info' && <Info className="w-5 h-5" />}
              </div>

              {/* Message Body */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${
                    toast.type === 'error' ? 'text-rose-400' :
                    toast.type === 'warning' ? 'text-amber-400' :
                    toast.type === 'success' ? 'text-emerald-400' :
                    'text-sky-400'
                  }`}>
                    {toast.title || (
                      toast.type === 'error' 
                        ? (lang === 'th' ? 'การก่อสร้างไม่สำเร็จ' : 'Placement Failed') 
                        : toast.type === 'warning'
                        ? (lang === 'th' ? 'แจ้งเตือน' : 'Notice')
                        : toast.type === 'success'
                        ? (lang === 'th' ? 'สำเร็จเรียบร้อย' : 'Success')
                        : (lang === 'th' ? 'ข้อมูล' : 'Information')
                    )}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
                  {toast.message}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onDismiss}
              aria-label={lang === 'th' ? 'ปิดการแจ้งเตือน' : 'Close notification'}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Link / Button (e.g. Go to missions when insufficient credits) */}
          {toast.action && (
            <div className="pt-1 flex items-center justify-end">
              <button
                onClick={() => {
                  toast.action?.onClick();
                  onDismiss();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 active:scale-95"
              >
                {toast.action.icon === 'missions' && <Target className="w-3.5 h-3.5" />}
                {toast.action.icon === 'coins' && <Coins className="w-3.5 h-3.5" />}
                <span>{toast.action.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
