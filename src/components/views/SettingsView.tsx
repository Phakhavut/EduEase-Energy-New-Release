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
  BellRing,
  Shield, 
  Check,
  Zap,
  Sparkles,
  RotateCcw,
  Compass,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { AppPage, GamificationSettings, DEFAULT_GAMIFICATION_SETTINGS, UserPersona } from '../../types';
import { GamificationSettingsToggle } from '../gamification/GamificationSettingsToggle';
import { PERSONA_CONFIGS } from '../../data/personaThemes';
import { WebPushManagerCard } from '../notifications/WebPushManagerCard';
import { NotificationHubModal } from '../notifications/NotificationHubModal';
import { NotificationsSettingsTab } from '../settings/NotificationsSettingsTab';
import { NotificationService } from '../../services/notificationService';

interface SettingsViewProps {
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  monthlyBudget: number;
  setMonthlyBudget: (val: number) => void;
  monthlyEstimate?: number;
  onStartTour?: () => void;
  neverShowAgain?: boolean;
  setNeverShowAgain?: (val: boolean) => void;
  onNavigatePage?: (page: AppPage) => void;
  onOpenManual?: () => void;
  gamificationSettings?: GamificationSettings;
  onUpdateGamificationSettings?: (newSettings: Partial<GamificationSettings>) => void;
  persona?: UserPersona;
  onPersonaChange?: (p: UserPersona) => void;
  onTriggerToast?: (type: 'danger' | 'warning', customTh?: string, customEn?: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  lang,
  setLang,
  isDarkMode,
  onToggleTheme,
  monthlyBudget,
  setMonthlyBudget,
  monthlyEstimate = 763.28,
  onStartTour,
  neverShowAgain = false,
  setNeverShowAgain,
  onNavigatePage,
  onOpenManual,
  gamificationSettings = DEFAULT_GAMIFICATION_SETTINGS,
  onUpdateGamificationSettings = () => {},
  persona = 'student',
  onPersonaChange,
  onTriggerToast,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications'>('general');
  const [currency, setCurrency] = useState<'THB' | 'USD'>('THB');
  const [aiTone, setAiTone] = useState<'friendly' | 'minimal' | 'gamer'>('friendly');
  const [showNotificationHub, setShowNotificationHub] = useState(false);

  const notifConfig = NotificationService.getConfig();
  const isWebPushActive = notifConfig.webPushEnabled && notifConfig.permissionStatus === 'granted';

  return (
    <div id="tour-step-settings" className="space-y-6 animate-fade-in pb-20 lg:pb-8 max-w-3xl mx-auto">
      {/* Settings & Notifications Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl w-full border border-slate-300/50 dark:border-slate-700/50">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'general'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
          }`}
        >
          <Settings className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'th' ? 'การตั้งค่าทั่วไป (General)' : 'General Settings'}</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer relative ${
            activeTab === 'notifications'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
          }`}
        >
          <BellRing className="w-4 h-4 text-amber-500" />
          <span>{lang === 'th' ? 'การแจ้งเตือน & เกณฑ์ค่าไฟ (Notifications)' : 'Notifications & Alerts'}</span>
          {isWebPushActive && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>

        {onNavigatePage && (
          <button
            onClick={() => onNavigatePage('trust-center')}
            className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-teal-500" />
            <span>{lang === 'th' ? 'ศูนย์ความโปร่งใส (Trust Center)' : 'Trust Center'}</span>
          </button>
        )}
      </div>

      {/* Header Banner */}
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-2xl ${activeTab === 'notifications' ? 'bg-amber-500/15 text-amber-500' : 'bg-emerald-500/15 text-emerald-500'}`}>
          {activeTab === 'notifications' ? <BellRing className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
        </div>
        <div>
          <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
            {activeTab === 'notifications'
              ? (lang === 'th' ? 'การแจ้งเตือน & การเตือนค่าไฟ' : 'Notification Hub & Alert Thresholds')
              : (lang === 'th' ? 'การตั้งค่าแอปพลิเคชัน' : 'Application Settings')}
          </h2>
          <p className="text-xs text-slate-500">
            {activeTab === 'notifications'
              ? (lang === 'th' ? 'เปิด/ปิด Web Push แจ้งเตือนผ่านเบราว์เซอร์ และปรับเกณฑ์เปอร์เซ็นต์เตือนค่าไฟ (50% - 95%)' : 'Toggle push notifications, customize energy thresholds, and manage alert channels.')
              : (lang === 'th' ? 'ปรับแต่งภาษา บทบาทผู้ใช้ โทนเสียง AI Coach และ Quick Start Tour' : 'Personalize language, persona context, AI Coach, and Quick Start Tour.')}
          </p>
        </div>
      </div>

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === 'notifications' ? (
        <NotificationsSettingsTab
          lang={lang}
          isDarkMode={isDarkMode}
          monthlyBudget={monthlyBudget}
          monthlyEstimate={monthlyEstimate}
          persona={persona}
          onTriggerToast={onTriggerToast}
        />
      ) : (
        /* TAB CONTENT: GENERAL SETTINGS */
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
                  className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
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

          {/* Persona Role Switcher */}
          <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-0.5">
              <span className="font-extrabold text-sm block text-slate-900 dark:text-white">
                {lang === 'th' ? 'บทบาทและบริบทผู้ใช้งาน (User Persona)' : 'Active User Persona & Context'}
              </span>
              <span className="text-xs text-slate-500 block">
                {lang === 'th' ? 'ปรับแต่งชุดข้อมูล เมนู และคำแนะนำให้ตรงตามบริบท (หอพัก / บ้านเดี่ยว / โครงข่าย)' : 'Tailor copy, tips, and menus for Dorm, Home, or Grid'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'student', titleTh: '🎓 นักศึกษา (Dorm)', titleEn: '🎓 Student (Dorm)', descTh: 'หอพัก & ค่าไฟรายยูนิต', descEn: 'Dorm room & student quests' },
                { id: 'homeowner', titleTh: '🏠 เจ้าของบ้าน (Home)', titleEn: '🏠 Homeowner', descTh: 'บ้านพัก & ตัดไฟอัตโนมัติ', descEn: 'Home bills & MEA budget' },
                { id: 'facility', titleTh: '🏢 แอดมิน PEA (Grid)', titleEn: '🏢 PEA Admin', descTh: 'TOU & โหนดจำหน่ายไฟ', descEn: 'TOU rates & Grid Nodes' },
              ].map((item) => {
                const isSelected = persona === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPersonaChange?.(item.id as UserPersona)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="font-extrabold text-xs mb-0.5 flex items-center justify-between">
                      <span>{lang === 'th' ? item.titleTh : item.titleEn}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    <p className="text-[0.68rem] text-slate-500 dark:text-slate-400">
                      {lang === 'th' ? item.descTh : item.descEn}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gamification Engine & Clean Utility Mode */}
          <GamificationSettingsToggle
            settings={gamificationSettings}
            onUpdateSettings={onUpdateGamificationSettings}
            isDarkMode={isDarkMode}
            lang={lang}
          />

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
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  lang === 'th' ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                ไทย (TH)
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
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
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
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

          {/* User Handbook & Documentation Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-900/90 to-teal-900/90 text-white border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm md:text-base font-display text-emerald-300">
                  {lang === 'th' ? 'คู่มือการใช้งานแพลตฟอร์มทั้งหมด (Web Manual)' : 'Platform Comprehensive Manual'}
                </h3>
                <p className="text-xs text-slate-300">
                  {lang === 'th' ? 'คำอธิบายอย่างละเอียดของทุกเมนู สูตรคำนวณ ค่าไฟ TOU และบัญชีทดสอบ 3 รูปแบบ' : 'Detailed breakdown of all features, tariffs, TOU rates, and demo accounts'}
                </p>
              </div>
            </div>

            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-stretch sm:self-auto justify-center"
              >
                <span>{lang === 'th' ? 'เปิดคู่มือการใช้งาน' : 'Open Handbook'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
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

          {/* Multi-Channel Notification & Web Push Quick Action */}
          <div className="pt-2">
            <WebPushManagerCard
              lang={lang}
              isDarkMode={isDarkMode}
              monthlyEstimate={monthlyEstimate}
              monthlyBudget={monthlyBudget}
              persona={persona}
              onOpenNotificationHub={() => setActiveTab('notifications')}
              onTriggerToast={onTriggerToast}
            />
          </div>
        </div>
      )}

      {/* SMART NOTIFICATION HUB MODAL */}
      <NotificationHubModal
        isOpen={showNotificationHub}
        onClose={() => setShowNotificationHub(false)}
        lang={lang}
        isDarkMode={isDarkMode}
        monthlyEstimate={monthlyEstimate}
        monthlyBudget={monthlyBudget}
        persona={persona}
        onTriggerToast={onTriggerToast}
      />
    </div>
  );
};
