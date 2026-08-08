import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Globe, 
  Sun, 
  Moon, 
  Bot, 
  Wallet, 
  Bell, 
  Shield, 
  Check,
  Zap,
  Sparkles,
  RotateCcw,
  Compass,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { AppPage } from '../../types';

interface SettingsViewProps {
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  monthlyBudget: number;
  setMonthlyBudget: (val: number) => void;
  onStartTour?: () => void;
  neverShowAgain?: boolean;
  setNeverShowAgain?: (val: boolean) => void;
  onNavigatePage?: (page: AppPage) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  lang,
  setLang,
  isDarkMode,
  onToggleTheme,
  monthlyBudget,
  setMonthlyBudget,
  onStartTour,
  neverShowAgain = false,
  setNeverShowAgain,
  onNavigatePage,
}) => {
  const [currency, setCurrency] = useState<'THB' | 'USD'>('THB');
  const [aiTone, setAiTone] = useState<'friendly' | 'minimal' | 'gamer'>('friendly');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-500">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
            {lang === 'th' ? 'การตั้งค่าแอปพลิเคชัน' : 'Application Settings'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'th' ? 'ปรับแต่งภาษา โทนเสียง AI Coach การแจ้งเตือน และ Quick Start Tour' : 'Personalize language, AI Coach, alerts, and Quick Start Tour.'}
          </p>
        </div>
      </div>

      {/* Settings List */}
      <div className={`p-6 rounded-[2.5rem] border space-y-6 transition-all ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800 shadow-sm'
      }`}>
        {/* Quick Start Tour Restart & Preferences */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-emerald-500/10 border border-emerald-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm font-display text-slate-900 dark:text-white">
                  {lang === 'th' ? 'Quick Start Tour (แนะนำแอป 60 วินาที)' : 'Quick Start Tour'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'th' ? 'เปิดระบบนำสอน Spotlight แนะนำ 7 ฟีเจอร์หลัก' : 'Spotlight walkthrough covering 7 key features'}
                </p>
              </div>
            </div>

            {onStartTour && (
              <button
                onClick={onStartTour}
                className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'เริ่มทัวร์อีกครั้ง' : 'Restart Tour'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-emerald-500/15">
            <div className="space-y-0.5">
              <span className="font-bold text-xs block text-slate-800 dark:text-slate-200">
                {lang === 'th' ? 'แสดง Quick Start Tour เมื่อเริ่มต้นระบบ' : 'Show Quick Start Tour on startup'}
              </span>
              <span className="text-[0.7rem] text-slate-500 block">
                {lang === 'th' ? 'หากเปิดไว้ ป๊อปอัปนำสอนจะปรากฏอัตโนมัติเมื่อเข้าแอปครั้งแรก' : 'Auto-show welcome walkthrough on initial load'}
              </span>
            </div>

            {setNeverShowAgain && (
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!neverShowAgain}
                  onChange={(e) => setNeverShowAgain(!e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            )}
          </div>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-0.5">
            <span className="font-extrabold text-sm block">
              {lang === 'th' ? 'ภาษาของระบบ (Language)' : 'System Language'}
            </span>
            <span className="text-xs text-slate-500 block">
              {lang === 'th' ? 'สลับการแสดงผลภาษาไทย / ภาษาอังกฤษ' : 'Switch between Thai and English'}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setLang('th')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                lang === 'th' ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              ไทย (TH)
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                lang === 'en' ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              English (EN)
            </button>
          </div>
        </div>

        {/* Theme Mode */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-0.5">
            <span className="font-extrabold text-sm block">
              {lang === 'th' ? 'ธีมการแสดงผล (Appearance)' : 'Appearance Mode'}
            </span>
            <span className="text-xs text-slate-500 block">
              {lang === 'th' ? 'สลับโหมดสว่างและโหมดมืดถนอมสายตา' : 'Light or dark eye-safe twilight palette'}
            </span>
          </div>

          <button
            onClick={onToggleTheme}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              isDarkMode ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>

        {/* AI Coach Personality */}
        <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-0.5">
            <span className="font-extrabold text-sm block">
              {lang === 'th' ? 'บุคลิกภาพของ Voltie AI Coach' : 'AI Coach Personality'}
            </span>
            <span className="text-xs text-slate-500 block">
              {lang === 'th' ? 'เลือกสไตล์การสื่อสารของ AI ผู้ช่วยพลังงาน' : 'Select Voltie communication tone'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'friendly', nameTh: 'ร่าเริงเป็นกันเอง', nameEn: 'Friendly & Fun' },
              { id: 'minimal', nameTh: 'กระชับตรงประเด็น', nameEn: 'Minimal & Direct' },
              { id: 'gamer', nameTh: 'โค้ชเกมเมอร์ 🎮', nameEn: 'Gamer Coach 🎮' },
            ].map((tone) => (
              <button
                key={tone.id}
                onClick={() => setAiTone(tone.id as any)}
                className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                  aiTone === tone.id
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                }`}
              >
                {lang === 'th' ? tone.nameTh : tone.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Trust & Transparency Banner */}
        {onNavigatePage && (
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-teal-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm md:text-base font-display text-teal-400">
                  {lang === 'th' ? 'ศูนย์ความน่าเชื่อถือและความโปร่งใส (Trust Center)' : 'Trust & Transparency Center'}
                </h3>
                <p className="text-xs text-slate-300">
                  {lang === 'th' ? 'ดูความน่าเชื่อถือของ AI, แหล่งข้อมูล, และประวัติคำแนะนำย้อนหลัง' : 'Review AI models, data quality, formulas, and decision logs'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigatePage('trust-center')}
              className="px-4 py-2 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-extrabold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>{lang === 'th' ? 'เข้าสู่ศูนย์ความโปร่งใส' : 'Open Trust Center'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-extrabold text-sm block">
              {lang === 'th' ? 'แจ้งเตือนเมื่อใช้ไฟผิดปกติ' : 'Anomaly & Budget Alerts'}
            </span>
            <span className="text-xs text-slate-500 block">
              {lang === 'th' ? 'รับการแจ้งเตือนทันทีเมื่อใช้ไฟใกล้งบหรือกระแสไฟตก' : 'Notify when approaching budget cap or power spikes'}
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
