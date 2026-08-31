import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Wifi, 
  Zap, 
  Database, 
  Bot, 
  ShieldCheck, 
  RefreshCw, 
  X, 
  CheckCircle2, 
  Clock, 
  Server, 
  Cpu, 
  Gauge, 
  Radio, 
  TrendingDown,
  Info,
  Check
} from 'lucide-react';

interface SystemStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  lang: 'th' | 'en';
}

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  lang,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('เมื่อสักครู่ (Just now)');
  const [voltage, setVoltage] = useState(229.4);
  const [frequency, setFrequency] = useState(50.02);
  const [activeSensors, setActiveSensors] = useState(12);
  const [latency, setLatency] = useState(18);

  // Live slight oscillation for real-time feel
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setVoltage(Number((228.5 + Math.random() * 2.2).toFixed(1)));
      setFrequency(Number((50.00 + (Math.random() - 0.5) * 0.06).toFixed(2)));
      setLatency(Math.floor(16 + Math.random() * 6));
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleManualSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString(lang === 'th' ? 'th-TH' : 'en-US'));
      setVoltage(229.8);
      setFrequency(50.01);
      setLatency(14);
    }, 900);
  };

  if (!isOpen) return null;

  const bgClass = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xl';
  const cardBg = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-slate-50 border-slate-200';
  const textClass = isDarkMode ? 'text-white' : 'text-slate-900';

  const statusItems = [
    {
      id: 'meter',
      icon: Radio,
      titleTh: 'การเชื่อมต่อสมาร์ทมิเตอร์ (IoT Smart Meter)',
      titleEn: 'Smart Meter Live IoT Stream',
      status: 'Connected',
      statusTh: 'เชื่อมต่อเสถียร (Online)',
      statusColor: 'text-emerald-500',
      badgeBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      detailTh: `ความเร็วตอบสนอง (Ping): ${latency}ms | โปรโตคอล: MQTT Secure over TLS 1.3`,
      detailEn: `Latency: ${latency}ms | Protocol: MQTT Secure over TLS 1.3`
    },
    {
      id: 'grid',
      icon: Zap,
      titleTh: 'แรงดัน & ความถี่สายส่งไฟฟ้า (Grid Power Standard)',
      titleEn: 'Power Grid Voltage & Frequency',
      status: 'Nominal',
      statusTh: 'อยู่ในเกณฑ์มาตรฐาน กฟน./กฟภ.',
      statusColor: 'text-emerald-500',
      badgeBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      detailTh: `แรงดัน: ${voltage} V (มาตรฐาน 220-230V) | ความถี่: ${frequency} Hz`,
      detailEn: `Voltage: ${voltage} V (Std 220-230V) | Frequency: ${frequency} Hz`
    },
    {
      id: 'tariff',
      icon: Gauge,
      titleTh: 'อัตราค่าไฟฟ้าฐานและช่วงเวลา (Tariff Rate Status)',
      titleEn: 'Tariff Rate & Time Status',
      status: 'Active',
      statusTh: 'คำนวณอัตรา MEA/PEA 2026',
      statusColor: 'text-blue-500',
      badgeBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
      detailTh: 'อัตราก้าวหน้าประเภท 1.1.2 พร้อมค่า Ft ลอยตัว 0.3972 ฿/หน่วย | TOU Off-Peak เริ่ม 22:00 น.',
      detailEn: 'Type 1.1.2 Progressive + Ft 0.3972 ฿/kWh | TOU Off-Peak starts 22:00'
    },
    {
      id: 'ai',
      icon: Bot,
      titleTh: 'เอนจิน AI Coach Voltie (Intelligence Core)',
      titleEn: 'AI Coach Voltie Engine',
      status: 'Ready',
      statusTh: 'พร้อมใช้งาน 100% (Operational)',
      statusColor: 'text-purple-500',
      badgeBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
      detailTh: 'โมเดล Gemini 2.5 Flash พร้อมอัลกอริทึม Energy Analytics & Anomaly Detection',
      detailEn: 'Gemini 2.5 Flash with Energy Analytics & Anomaly Detection Engine'
    },
    {
      id: 'sensors',
      icon: Cpu,
      titleTh: 'เซนเซอร์และอุปกรณ์ที่ตรวจจับ (Monitored Nodes)',
      titleEn: 'Connected Appliance Nodes',
      status: 'Healthy',
      statusTh: `${activeSensors}/${activeSensors} โหนดทำงานปกติ`,
      statusColor: 'text-emerald-500',
      badgeBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      detailTh: 'โหนดเครื่องปรับอากาศ, ตู้เย็น, เครื่องซักผ้า, ระบบไฟสแตนด์บาย และปลั๊กอัจฉริยะ',
      detailEn: 'AC nodes, Refrigerator, Washer, Standby Cut circuit, and Smart plugs'
    },
    {
      id: 'security',
      icon: ShieldCheck,
      titleTh: 'ระบบความปลอดภัย & การเข้ารหัส (Security & Encryption)',
      titleEn: 'Security & Data Privacy',
      status: 'Secure',
      statusTh: 'ปลอดภัยระดับสูงสุด (A+ Grade)',
      statusColor: 'text-emerald-500',
      badgeBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      detailTh: 'Zero-Knowledge Client Storage, PBKDF2 Password Hashing, SSL/TLS Encryption',
      detailEn: 'Zero-Knowledge Client Storage, PBKDF2 Hashing, SSL/TLS Encryption'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className={`w-full max-w-2xl rounded-[2.5rem] border overflow-hidden flex flex-col max-h-[90vh] ${bgClass}`}>
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 shrink-0">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {lang === 'th' ? 'สถานะระบบและมิเตอร์เรียลไทม์' : 'Live System & Grid Telemetry'}
                </span>
              </div>
              <h3 className={`text-lg sm:text-xl font-black ${textClass} font-display`}>
                {lang === 'th' ? 'สถานะความพร้อมของระบบ EduEase' : 'EduEase System Health & Telemetry'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Quick Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className={`p-3 rounded-2xl border ${cardBg} text-center`}>
              <div className="text-[0.68rem] text-slate-400 font-bold uppercase">{lang === 'th' ? 'แรงดันไฟฟ้า' : 'Voltage'}</div>
              <div className="text-base font-black text-emerald-500 font-mono mt-0.5">{voltage} V</div>
            </div>
            <div className={`p-3 rounded-2xl border ${cardBg} text-center`}>
              <div className="text-[0.68rem] text-slate-400 font-bold uppercase">{lang === 'th' ? 'ความถี่ระบบ' : 'Frequency'}</div>
              <div className="text-base font-black text-emerald-500 font-mono mt-0.5">{frequency} Hz</div>
            </div>
            <div className={`p-3 rounded-2xl border ${cardBg} text-center`}>
              <div className="text-[0.68rem] text-slate-400 font-bold uppercase">{lang === 'th' ? 'ความเร็วตอบสนอง' : 'Latency'}</div>
              <div className="text-base font-black text-emerald-500 font-mono mt-0.5">{latency} ms</div>
            </div>
            <div className={`p-3 rounded-2xl border ${cardBg} text-center`}>
              <div className="text-[0.68rem] text-slate-400 font-bold uppercase">{lang === 'th' ? 'สถานะเซิร์ฟเวอร์' : 'Status'}</div>
              <div className="text-base font-black text-emerald-500 font-mono mt-0.5">100% OK</div>
            </div>
          </div>

          {/* Status Items List */}
          <div className="space-y-2.5">
            {statusItems.map((item) => {
              const IconC = item.icon;
              return (
                <div key={item.id} className={`p-3.5 rounded-2xl border ${cardBg} transition-all flex items-start justify-between gap-3`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700/60 flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0 mt-0.5">
                      <IconC className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {lang === 'th' ? item.titleTh : item.titleEn}
                      </div>
                      <div className="text-[0.72rem] text-slate-500 dark:text-slate-400 mt-0.5">
                        {lang === 'th' ? item.detailTh : item.detailEn}
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-xl text-[0.68rem] font-black border uppercase tracking-wider shrink-0 ${item.badgeBg}`}>
                    {lang === 'th' ? item.statusTh : item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'th' ? `อัปเดตล่าสุด: ${lastSyncTime}` : `Last synced: ${lastSyncTime}`}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleManualSync}
              disabled={isRefreshing}
              className={`w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${isRefreshing ? 'opacity-70 cursor-wait' : ''}`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? (lang === 'th' ? 'กำลังซิงค์...' : 'Syncing...') : (lang === 'th' ? 'ซิงค์ข้อมูลสถานะทันที' : 'Refresh Telemetry')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
