import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Sidebar } from "./navigation/Sidebar";
import { MobileNavbar } from "./navigation/MobileNavbar";
import { HeaderBar } from "./navigation/HeaderBar";
import { HomeView } from "./views/HomeView";
import { AiCoachView } from "./views/AiCoachView";
import { AppliancesView } from "./views/AppliancesView";
import { BudgetView } from "./views/BudgetView";
import { AnalyticsView } from "./views/AnalyticsView";
import { calculateTotalBill } from "../utils/calculations";
import { AchievementsView } from "./views/AchievementsView";
import { ProfileView } from "./views/ProfileView";
import { SettingsView } from "./views/SettingsView";
import { LocationsView } from "./views/LocationsView";
import { LearningView } from "./views/LearningView";
import { ComparisonView } from "./views/ComparisonView";
import { ScoreView } from "./views/ScoreView";
import { SmartInsightsHub } from "./insights/SmartInsightsHub";
import { TrustCenterView } from "./trust/TrustCenterView";
import { Web3GreenCryptoHub } from "./crypto/Web3GreenCryptoHub";
import { UxAssessmentView } from "./trust/UxAssessmentView";
import { BrandIdentityModal } from "./brand/BrandIdentityModal";
import { OnboardingModal } from "./OnboardingModal";
import { GenZGuidedOnboardingModal } from "./onboarding/GenZGuidedOnboardingModal";
import { NotificationModal } from "./NotificationModal";
import { GlobalSearchModal } from "./common/GlobalSearchModal";
import { SystemStatusModal } from "./common/SystemStatusModal";
import { ProjectCreditsFooter } from "./common/ProjectCreditsFooter";
import { QuickSupportWidget } from "./trust/QuickSupportWidget";
import { UserManual } from "./UserManual";
import LoginForm from "./LoginForm";
import { GuidedTour } from "./GuidedTour";
import { useOnboardingTour } from "../hooks/useOnboardingTour";
import { RetroEcoArcadeView } from "./game/RetroEcoArcadeView";
import { useGameState } from '../context/GameStateProvider';
import { DEFAULT_GUARDIAN_STATE } from "../data/energyGuardianData";
import { EnergyBoss, BossId } from "../types";
import { AppPage, LocationItem, InfoDetailMode, NotificationItem, SmartGoal, EnergyDiaryNote, Appliance, GamificationSettings, DEFAULT_GAMIFICATION_SETTINGS } from "../types";
import { 
  INITIAL_APPLIANCES, 
  INITIAL_MISSIONS, 
  INITIAL_BADGES, 
  INITIAL_SKINS, 
  INITIAL_RECOMMENDATIONS, 
  INITIAL_LOCATIONS,
  INITIAL_GLOSSARY_TERMS,
  INITIAL_LEARNING_PATHS,
  INITIAL_NOTIFICATIONS,
  LEADERBOARD_USERS 
} from "../data/initialData";
import {
  initialAnomalies,
  initialGoals,
  householdBenchmarks,
  seasonalInsights,
  initialActionTimeline,
  whatIfScenarios,
  initialDiaryNotes
} from "../data/smartInsightsData";
import { jsPDF } from "jspdf";
import { MonthlyReportPdfModal } from "./export/MonthlyReportPdfModal";
import { DailyEnergyDigestModal } from "./notifications/DailyEnergyDigestModal";
import { BudgetAlertToastContainer, BudgetToastNotification } from "./notifications/BudgetAlertToastContainer";
import { NotificationPermissionBanner } from "./notifications/NotificationPermissionBanner";
import { UserPersona } from "../types";
import { NotificationService } from "../services/notificationService";
import { useAutomatedAlertsWatcher } from "../hooks/useAutomatedAlertsWatcher";

interface DashboardProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  activeHouse: any;
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
  persona?: UserPersona;
  onPersonaChange?: (persona: UserPersona) => void;
}

export default function Dashboard({
  isDarkMode,
  onToggleTheme,
  onLogout,
  activeHouse,
  lang,
  setLang,
  persona = 'student',
  onPersonaChange,
}: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [infoDetailMode, setInfoDetailMode] = useState<InfoDetailMode>('balanced');
  const [currentPersona, setCurrentPersona] = useState<UserPersona>(persona);

  const handlePersonaChange = (newPersona: UserPersona) => {
    setCurrentPersona(newPersona);
    onPersonaChange?.(newPersona);
  };

  // Tour Hook & State
  const { neverShowAgain, setNeverShowAgain, markCompleted } = useOnboardingTour();
  const [isTourActive, setIsTourActive] = useState<boolean>(!neverShowAgain);
  const [showTourPrompt, setShowTourPrompt] = useState<boolean>(!neverShowAgain);
  const [tourStepIndex, setTourStepIndex] = useState<number>(0);

  const handleStartTour = (startStep: number = 0) => {
    setTourStepIndex(startStep);
    setIsTourActive(true);
    setShowTourPrompt(false);
  };

  const handleSkipTourForNow = () => {
    setIsTourActive(false);
    setShowTourPrompt(false);
  };

  const handleNeverShowTour = () => {
    setNeverShowAgain(true);
    setIsTourActive(false);
    setShowTourPrompt(false);
  };

  const handleCloseTour = () => {
    setIsTourActive(false);
    setShowTourPrompt(false);
    markCompleted();
  };

  // Modals state
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showGenZOnboarding, setShowGenZOnboarding] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showUserManual, setShowUserManual] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showBrandIdentityModal, setShowBrandIdentityModal] = useState(false);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Locations state
  const [locations, setLocations] = useState<LocationItem[]>(INITIAL_LOCATIONS);
  const [currentLocationId, setCurrentLocationId] = useState<string>('loc_home');

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Learning & Glossary state
  const [learningPaths, setLearningPaths] = useState(INITIAL_LEARNING_PATHS);
  const [glossaryTerms] = useState(INITIAL_GLOSSARY_TERMS);

  // User Stats & Gamification state
  // User Stats & Gamification state (migrated some to context, but preserving user level, userXp here for backward compatibility or using context for them if possible. Wait, the prompt says "manage game-specific state like xp, coins, level, and inventory that persists across the Energy Adventure views while remaining distinct from the main website management state". So we can still keep userXp for main website, or just use context?)
  // Let's keep `userLevel` etc for main website dashboard
  const [userLevel, setUserLevel] = useState(7);
  const [userXp, setUserXp] = useState(2450);
  const [userXpMax, setUserXpMax] = useState(3000);
  const [userCoins, setUserCoins] = useState(340);
  const [userStreak, setUserStreak] = useState(5);
  const [currentAvatar, setCurrentAvatar] = useState('⚡');

  // Gamification & Accessibility Settings with localStorage persistence
  const [gamificationSettings, setGamificationSettings] = useState<GamificationSettings>(() => {
    try {
      const saved = localStorage.getItem('eduease_gamification_settings');
      if (saved) {
        return { ...DEFAULT_GAMIFICATION_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse gamification settings from localStorage', e);
    }
    return DEFAULT_GAMIFICATION_SETTINGS;
  });

  const handleUpdateGamificationSettings = (newSettings: Partial<GamificationSettings>) => {
    setGamificationSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('eduease_gamification_settings', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save gamification settings to localStorage', e);
      }
      return updated;
    });
  };

  // Energy Guardian Game System State - now using Context
  const {
    guardianState,
    setGuardianState,
    activeBossBattle,
    setActiveBossBattle,
    showGameTutorialModal,
    setShowGameTutorialModal,
    showGameGuideModal,
    setShowGameGuideModal,
    showInventoryModal,
    setShowInventoryModal,
    handleBossVictory
  } = useGameState();

  // Energy & Budget state
  const [monthlyBudget, setMonthlyBudget] = useState(2500);
  const [moneySavedMonth, setMoneySavedMonth] = useState(320);

  // Monthly PDF Report & Budget Alert Toast States
  const [showMonthlyReportModal, setShowMonthlyReportModal] = useState(false);
  const [showDailyDigestModal, setShowDailyDigestModal] = useState(false);
  const [budgetToasts, setBudgetToasts] = useState<BudgetToastNotification[]>([]);

  // Collections state
  const [appliances, setAppliances] = useState(INITIAL_APPLIANCES);
  const { totalDailyKwh, totalMonthlyCost } = calculateTotalBill(appliances);
  const todayCost = totalDailyKwh * 4.7; // Approx derived today cost for UI
  const monthlyEstimate = totalMonthlyCost;
  const [missions, setMissions] = useState(INITIAL_MISSIONS);
  const [badges, setBadges] = useState(INITIAL_BADGES);
  const [skins, setSkins] = useState(INITIAL_SKINS);
  const [recommendations, setRecommendations] = useState(INITIAL_RECOMMENDATIONS);

  // Smart Insights state
  const [anomalies, setAnomalies] = useState(initialAnomalies);
  const [goals, setGoals] = useState(initialGoals);
  const [benchmarks] = useState(householdBenchmarks);
  const [seasonalInsightsList] = useState(seasonalInsights);
  const [actionTimeline, setActionTimeline] = useState(initialActionTimeline);
  const [scenarios] = useState(whatIfScenarios);
  const [diaryNotes, setDiaryNotes] = useState(initialDiaryNotes);

  const handleResolveAnomaly = (id: string) => {
    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  };

  const handleAddGoal = (goal: SmartGoal) => {
    setGoals(prev => [goal, ...prev]);
  };

  const handleToggleGoalComplete = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleAddDiaryNote = (note: EnergyDiaryNote) => {
    setDiaryNotes(prev => [note, ...prev]);
  };

  // AI Chat state
  const [chatMessages, setChatMessages] = useState<
    { role: 'user' | 'assistant'; text: string; time?: string }[]
  >([
    {
      role: 'assistant',
      text: lang === 'th'
        ? 'สวัสดีครับ! ผม Voltie AI Energy Coach ของคุณ ⚡ วันนี้การใช้งานไฟของคุณอยู่ในเกณฑ์ประหยัดมาก มีอะไรให้ผมช่วยเหลือไหมครับ?'
        : 'Hello! I am Voltie, your AI Energy Coach ⚡ Your energy usage is super efficient today. How can I assist you?',
      time: '10:00 AM'
    }
  ]);
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Handlers
  const handleSwitchLocation = (locId: string) => {
    setCurrentLocationId(locId);
    const loc = locations.find(l => l.id === locId);
    if (loc) {
      setMonthlyBudget(loc.budget);
    }
  };

  const handleAddLocation = (newLoc: Omit<LocationItem, 'id' | 'estimatedBill' | 'lastUpdated'>) => {
    const newId = `loc_${Date.now()}`;
    const createdLoc: LocationItem = {
      ...newLoc,
      id: newId,
      estimatedBill: Math.round(newLoc.budget * 0.75),
      lastUpdated: 'เมื่อสักครู่',
    };
    setLocations([...locations, createdLoc]);
    setCurrentLocationId(newId);
    setMonthlyBudget(createdLoc.budget);
  };

  const handleMarkNotifRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleCompleteLesson = (lessonId: string, rewardXp: number) => {
    setUserXp(prev => {
      const nextXp = prev + rewardXp;
      if (nextXp >= userXpMax) {
        setUserLevel(l => l + 1);
        setUserXpMax(m => m + 500);
        return nextXp - userXpMax;
      }
      return nextXp;
    });
    setUserCoins(c => c + 15);
  };

  const handleCompleteMission = (missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId && !m.completed) {
          const newXp = userXp + m.xpReward;
          setUserXp(newXp);
          setUserCoins((c) => c + m.coinReward);
          
          // Level up check
          if (newXp >= userXpMax) {
            setUserLevel((l) => l + 1);
            setUserXp(newXp - userXpMax);
            setUserXpMax((m) => m + 500);
          }
          return { ...m, completed: true };
        }
        return m;
      })
    );
  };

  const handleToggleDeviceStatus = (id: number) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const nextStatus = app.status === 'active' ? 'off' : 'active';
          return { ...app, status: nextStatus };
        }
        return app;
      })
    );
  };

  const handleAddAppliance = (newApp: Omit<Appliance, 'id'>) => {
    const createdApp: Appliance = {
      ...newApp,
      id: Date.now(),
    };
    setAppliances(prev => [createdApp, ...prev]);
  };

  const handleUpdateAppliance = (updatedApp: Appliance) => {
    setAppliances(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
  };

  const handleDeleteAppliance = (id: number) => {
    setAppliances(prev => prev.filter(app => app.id !== id));
  };

  const handleAddMaintenanceLog = (id: number, log: { date: string; action: string; status: 'resolved' | 'pending' }) => {
    setAppliances(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          logs: [log, ...(app.logs || [])]
        };
      }
      return app;
    }));
  };

  const handleApplyRecommendation = (recId: string) => {
    setRecommendations((prev) =>
      prev.map((r) => {
        if (r.id === recId) {
          setMoneySavedMonth((s) => s + r.moneySavedMonth);
          setUserXp((x) => x + 80);
          setUserCoins((c) => c + 25);
          return { ...r, applied: true };
        }
        return r;
      })
    );
  };

  const handleUnlockSkin = (skinId: string, price: number) => {
    if (userCoins < price) return;
    setUserCoins((c) => c - price);
    setSkins((prev) =>
      prev.map((s) => (s.id === skinId ? { ...s, unlocked: true } : s))
    );
  };

  const handleSendMessage = async (text: string, useThinkingMode?: boolean) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { role: 'user' as const, text, time: timeStr };
    setChatMessages((prev) => [...prev, newMsg]);
    setIsSendingChat(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang, useThinkingMode })
      });
      const data = await res.json();
      const replyText = data?.reply || (
        lang === 'th'
          ? `Voltie AI: จากการวิเคราะห์ พบว่าปรับแอร์ขึ้นเป็น 26°C ร่วมกับใช้พัดลมช่วยระบายความร้อน จะช่วยเซฟค่าไฟได้ถึง ฿180 ต่อเดือนครับ!`
          : `Voltie AI: Setting your AC to 26°C with an oscillating fan will save you up to ฿180/month!`
      );

      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: lang === 'th'
            ? 'Voltie AI: ขออภัยครับ ระบบกำลังอัปเดตข้อมูลเซนเซอร์ แต่หลักการง่ายๆ คือ ปิดปลั๊กไฟสแตนด์บายเมื่อไม่ใช้งาน จะประหยัดค่าไฟได้ทันที!'
            : 'Voltie AI: Unplugging standby power strips when not in use gives instant savings on your monthly bill!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  // Budget Alert Notification Triggers & Dismissal
  const handleTriggerBudgetToast = (type: 'danger' | 'warning', customMsgTh?: string, customMsgEn?: string) => {
    const id = `toast-${Date.now()}`;
    const budgetPercent = Math.round((monthlyEstimate / (monthlyBudget || 1)) * 100);
    const isDanger = type === 'danger';
    
    const newToast: BudgetToastNotification = {
      id,
      type,
      titleTh: isDanger ? '🚨 แจ้งเตือน: ค่าไฟเกินงบประมาณที่กำหนด!' : '⚠️ แจ้งเตือน: การใช้ไฟใกล้แตะเพดานงบ',
      titleEn: isDanger ? '🚨 Budget Exceeded Alert!' : '⚠️ Approaching Budget Cap Alert',
      messageTh: customMsgTh || (isDanger 
        ? `ค่าไฟปัจจุบัน ฿${monthlyEstimate.toLocaleString()} เกินเพดานงบประมาณ ฿${monthlyBudget.toLocaleString()} ไปแล้ว ฿${(monthlyEstimate - monthlyBudget).toLocaleString()}` 
        : `คุณใช้งานไปแล้ว ${budgetPercent}% ของงบประมาณรายเดือน ฿${monthlyBudget.toLocaleString()}`),
      messageEn: customMsgEn || (isDanger 
        ? `Current usage ฿${monthlyEstimate.toLocaleString()} exceeds your ฿${monthlyBudget.toLocaleString()} monthly budget by ฿${(monthlyEstimate - monthlyBudget).toLocaleString()}` 
        : `You have reached ${budgetPercent}% of your ฿${monthlyBudget.toLocaleString()} monthly budget limit.`),
      amountThb: monthlyEstimate,
      thresholdPercent: budgetPercent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionPage: 'budget',
      actionLabelTh: isDanger ? 'ปรับลดไฟด่วน' : 'ตรวจสอบงบ',
      actionLabelEn: isDanger ? 'Eco Cut Now' : 'Check Budget',
    };

    setBudgetToasts(prev => [newToast, ...prev.filter(t => t.id !== id).slice(0, 2)]);
    
    // Also push to persistent notifications modal list
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: newToast.titleTh,
        desc: newToast.messageTh,
        priority: isDanger ? 'urgent' : 'warning',
        timestamp: 'เมื่อสักครู่',
        read: false,
        actionPage: 'budget'
      },
      ...prev
    ]);

    // Dispatch Native Web Push to Browser / OS via Service Worker
    NotificationService.sendNativePush({
      title: lang === 'th' ? newToast.titleTh : newToast.titleEn,
      body: lang === 'th' ? newToast.messageTh : newToast.messageEn,
      type,
      tag: `toast-push-${type}`,
      amountThb: monthlyEstimate,
      thresholdPercent: budgetPercent,
    });
  };

  // Real-time automated watcher for budget thresholds & background spikes
  useAutomatedAlertsWatcher({
    monthlyEstimate,
    monthlyBudget,
    appliances,
    onTriggerToast: (type, titleTh, msgTh) => {
      handleTriggerBudgetToast(type, msgTh, msgTh);
    },
  });

  const handleDismissBudgetToast = (id: string) => {
    setBudgetToasts(prev => prev.filter(t => t.id !== id));
  };

  // Open rich printable PDF export modal
  const handleExportPDF = () => {
    setShowMonthlyReportModal(true);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col lg:flex-row transition-colors duration-500 ${
      isDarkMode ? 'bg-[#0B1220] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Mobile Top Header + Mobile Bottom Navigation Bar */}
      <MobileNavbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        setLang={setLang}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        locations={locations}
        currentLocationId={currentLocationId}
        onSwitchLocation={handleSwitchLocation}
        notifications={notifications}
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenAccountModal={() => setShowAccountModal(true)}
        currentAvatar={currentAvatar}
        userLevel={userLevel}
        userStreak={userStreak}
        userCoins={userCoins}
        infoDetailMode={infoDetailMode}
        onChangeDetailMode={setInfoDetailMode}
        persona={currentPersona}
      />

      {/* Desktop Sticky Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        setLang={setLang}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onLogout={onLogout}
        userLevel={userLevel}
        userXp={userXp}
        userXpMax={userXpMax}
        userCoins={userCoins}
        userStreak={userStreak}
        currentAvatar={currentAvatar}
        gamificationSettings={gamificationSettings}
        persona={currentPersona}
        locations={locations}
        currentLocationId={currentLocationId}
        onOpenBrandGuide={() => setShowBrandIdentityModal(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 px-4 md:px-5 lg:px-6 xl:px-8 py-4 sm:py-6 max-w-[1280px] mx-auto w-full min-w-0 overflow-x-hidden">
        {/* Desktop HeaderBar */}
        <HeaderBar
          locations={locations}
          currentLocationId={currentLocationId}
          onSwitchLocation={handleSwitchLocation}
          onNavigateToLocations={() => setCurrentPage('locations')}
          infoDetailMode={infoDetailMode}
          onChangeDetailMode={setInfoDetailMode}
          notifications={notifications}
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenSearch={() => setShowSearchModal(true)}
          onOpenManual={() => setShowUserManual(true)}
          onOpenStatus={() => setShowSystemStatus(true)}
          onOpenAccountModal={() => setShowAccountModal(true)}
          userLevel={userLevel}
          userStreak={userStreak}
          userCoins={userCoins}
          currentAvatar={currentAvatar}
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
          lang={lang}
          onToggleLang={() => setLang(lang === 'th' ? 'en' : 'th')}
        />

        {/* Notification Permission UI Helper Banner */}
        <NotificationPermissionBanner
          lang={lang}
          isDarkMode={isDarkMode}
          onOpenSettingsNotifications={() => setCurrentPage('settings')}
        />

        {currentPage === 'home' && (
          <HomeView
            lang={lang}
            isDarkMode={isDarkMode}
            setCurrentPage={setCurrentPage}
            todayCost={todayCost}
            monthlyEstimate={monthlyEstimate}
            monthlyBudget={monthlyBudget}
            moneySavedMonth={moneySavedMonth}
            dailyMissions={missions.filter(m => m.category === 'daily')}
            onCompleteMission={handleCompleteMission}
            appliances={appliances}
            userStreak={userStreak}
            userLevel={userLevel}
            userXp={userXp}
            userXpMax={userXpMax}
            userCoins={userCoins}
            infoDetailMode={infoDetailMode}
            onStartPageTour={handleStartTour}
            onOpenMonthlyReport={handleExportPDF}
            onTriggerBudgetToast={handleTriggerBudgetToast}
            onOpenDailyDigest={() => setShowDailyDigestModal(true)}
            gamificationSettings={gamificationSettings}
            persona={currentPersona}
            badges={badges}
            learningPaths={learningPaths}
          />
        )}

        {(currentPage === 'ai-coach' || currentPage === 'insights') && (
          <AiCoachView
            lang={lang}
            isDarkMode={isDarkMode}
            recommendations={recommendations}
            onApplyRecommendation={handleApplyRecommendation}
            chatMessages={chatMessages}
            onSendMessage={handleSendMessage}
            isSendingChat={isSendingChat}
            infoDetailMode={infoDetailMode}
            onStartPageTour={handleStartTour}
            onNavigatePage={setCurrentPage}
            initialTab={currentPage === 'insights' ? 'insights' : 'coach'}
            anomalies={anomalies}
            goals={goals}
            benchmarks={benchmarks}
            seasonalInsights={seasonalInsightsList}
            actionTimeline={actionTimeline}
            scenarios={scenarios}
            diaryNotes={diaryNotes}
            onResolveAnomaly={handleResolveAnomaly}
            onAddGoal={handleAddGoal}
            onToggleGoalComplete={handleToggleGoalComplete}
            onAddDiaryNote={handleAddDiaryNote}
          />
        )}

        {currentPage === 'locations' && (
          <LocationsView
            locations={locations}
            currentLocationId={currentLocationId}
            onSwitchLocation={handleSwitchLocation}
            onAddLocation={handleAddLocation}
            isDarkMode={isDarkMode}
            lang={lang}
            infoDetailMode={infoDetailMode}
            onStartPageTour={handleStartTour}
            onNavigatePage={setCurrentPage}
          />
        )}

        {currentPage === 'appliances' && (
          <AppliancesView
            lang={lang}
            isDarkMode={isDarkMode}
            appliances={appliances}
            onToggleDeviceStatus={handleToggleDeviceStatus}
            onUpdateEcoMode={() => {}}
            onAddAppliance={handleAddAppliance}
            onUpdateAppliance={handleUpdateAppliance}
            onDeleteAppliance={handleDeleteAppliance}
            onAddMaintenanceLog={handleAddMaintenanceLog}
            infoDetailMode={infoDetailMode}
            onStartPageTour={handleStartTour}
            onNavigatePage={setCurrentPage}
            persona={currentPersona}
          />
        )}

        {currentPage === 'budget' && (
          <BudgetView
            lang={lang}
            isDarkMode={isDarkMode}
            monthlyBudget={monthlyBudget}
            setMonthlyBudget={setMonthlyBudget}
            monthlyEstimate={monthlyEstimate}
            todayCost={todayCost}
            moneySavedMonth={moneySavedMonth}
            infoDetailMode={infoDetailMode}
            persona={currentPersona}
            onStartPageTour={handleStartTour}
            onNavigatePage={setCurrentPage}
            onOpenMonthlyReport={handleExportPDF}
            onTriggerBudgetToast={handleTriggerBudgetToast}
          />
        )}

        {(currentPage === 'analytics' || currentPage === 'insights') && (
          <AnalyticsView
            lang={lang}
            isDarkMode={isDarkMode}
            infoDetailMode={infoDetailMode}
            onExportPDF={handleExportPDF}
            onNavigatePage={setCurrentPage}
            persona={currentPersona}
            appliances={appliances}
          />
        )}

        {(currentPage === 'learning' || currentPage === 'game') && (
          <LearningView
            learningPaths={learningPaths}
            glossaryTerms={glossaryTerms}
            onCompleteLesson={handleCompleteLesson}
            onRestartOnboarding={() => handleStartTour(0)}
            isDarkMode={isDarkMode}
            lang={lang}
            infoDetailMode={infoDetailMode}
            onStartPageTour={handleStartTour}
            initialCategory={currentPage === 'game' ? 'memory_games' : 'learning_modules'}
          />
        )}

        {currentPage === 'compare' && (
          <ComparisonView
            lang={lang}
            isDarkMode={isDarkMode}
            infoDetailMode={infoDetailMode}
            userAppliances={appliances}
            setCurrentPage={setCurrentPage}
            onStartPageTour={handleStartTour}
            persona={currentPersona}
          />
        )}

        {currentPage === 'score' && (
          <ScoreView
            lang={lang}
            isDarkMode={isDarkMode}
            infoDetailMode={infoDetailMode}
            userStreak={userStreak}
            userCoins={userCoins}
            userLevel={userLevel}
            userXp={userXp}
            userXpMax={userXpMax}
            monthlyEstimate={monthlyEstimate}
            monthlyBudget={monthlyBudget}
            setCurrentPage={setCurrentPage}
            onStartPageTour={handleStartTour}
          />
        )}

        {currentPage === 'trust-center' && (
          <TrustCenterView
            lang={lang}
            isDarkMode={isDarkMode}
            infoDetailMode={infoDetailMode}
            onNavigatePage={setCurrentPage}
          />
        )}

        {currentPage === 'crypto' && (
          <Web3GreenCryptoHub
            lang={lang}
            isDarkMode={isDarkMode}
            infoDetailMode={infoDetailMode}
            onNavigatePage={setCurrentPage}
            persona={currentPersona}
            userCoins={userCoins}
          />
        )}

        {currentPage === 'ux-assessment' && (
          <UxAssessmentView
            lang={lang}
            isDarkMode={isDarkMode}
            infoDetailMode={infoDetailMode}
            onNavigatePage={setCurrentPage}
            persona={currentPersona}
          />
        )}

        {(currentPage === 'city' || currentPage === 'achievements') && (
          <AchievementsView
            lang={lang}
            isDarkMode={isDarkMode}
            userLevel={userLevel}
            userXp={userXp}
            userXpMax={userXpMax}
            userCoins={userCoins}
            userStreak={userStreak}
            missions={missions}
            onCompleteMission={handleCompleteMission}
            badges={badges}
            skins={skins}
            onUnlockSkin={handleUnlockSkin}
            currentAvatar={currentAvatar}
            setCurrentAvatar={setCurrentAvatar}
            leaderboard={LEADERBOARD_USERS}
            onStartPageTour={handleStartTour}
            onNavigatePage={setCurrentPage}
            initialTab={currentPage === 'achievements' ? 'missions' : 'eduverse'}
          />
        )}

        {currentPage === 'profile' && (
          <ProfileView
            lang={lang}
            isDarkMode={isDarkMode}
            userLevel={userLevel}
            userXp={userXp}
            userXpMax={userXpMax}
            userCoins={userCoins}
            userStreak={userStreak}
            currentAvatar={currentAvatar}
            moneySavedMonth={moneySavedMonth}
            badges={badges}
            onNavigatePage={setCurrentPage}
            persona={currentPersona}
            onPersonaChange={handlePersonaChange}
          />
        )}

        {currentPage === 'settings' && (
          <SettingsView
            lang={lang}
            setLang={setLang}
            isDarkMode={isDarkMode}
            onToggleTheme={onToggleTheme}
            monthlyBudget={monthlyBudget}
            setMonthlyBudget={setMonthlyBudget}
            monthlyEstimate={monthlyEstimate}
            onStartTour={() => handleStartTour(0)}
            neverShowAgain={neverShowAgain}
            setNeverShowAgain={setNeverShowAgain}
            onNavigatePage={setCurrentPage}
            onOpenManual={() => setShowUserManual(true)}
            gamificationSettings={gamificationSettings}
            onUpdateGamificationSettings={handleUpdateGamificationSettings}
            persona={currentPersona}
            onPersonaChange={handlePersonaChange}
            onTriggerToast={handleTriggerBudgetToast}
          />
        )}

        {/* Global Project Credits Footer displayed across all pages */}
        <ProjectCreditsFooter lang={lang} isDarkMode={isDarkMode} />

        {/* Guided Quick Start Tour Component */}
        <GuidedTour
          isActive={isTourActive}
          showPrompt={showTourPrompt}
          stepIndex={tourStepIndex}
          setStepIndex={setTourStepIndex}
          lang={lang}
          isDarkMode={isDarkMode}
          onClose={handleCloseTour}
          onStartTour={() => handleStartTour(0)}
          onSkipForNow={handleSkipTourForNow}
          onNeverShowAgain={handleNeverShowTour}
          onCompleteTour={() => {
            setUserXp(x => x + 100);
            setUserCoins(c => c + 30);
          }}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Interactive Modals */}
        <GenZGuidedOnboardingModal
          isOpen={showGenZOnboarding}
          onClose={() => setShowGenZOnboarding(false)}
          onComplete={({ selectedAppliances, recentBill }) => {
            if (selectedAppliances && selectedAppliances.length > 0) {
              const newItems = selectedAppliances.map((app, idx) => ({
                ...app,
                id: Date.now() + idx,
              }));
              setAppliances(prev => [...newItems, ...prev]);
            }
            if (recentBill && recentBill > 0) {
              setMonthlyBudget(Math.round(recentBill * 1.1));
            }
            setUserXp(x => x + 150);
            setUserCoins(c => c + 50);
            setShowGenZOnboarding(false);
          }}
          isDarkMode={isDarkMode}
          lang={lang}
        />

        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={(rewards) => {
            setUserXp(x => x + rewards.xp);
            setUserCoins(c => c + rewards.coins);
          }}
          onChangeDetailMode={setInfoDetailMode}
          isDarkMode={isDarkMode}
          lang={lang}
        />

        <NotificationModal
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkNotifRead}
          onMarkAllAsRead={handleMarkAllNotifsRead}
          onNavigateToPage={setCurrentPage}
          onOpenDailyDigest={() => setShowDailyDigestModal(true)}
          isDarkMode={isDarkMode}
          lang={lang}
        />

        <GlobalSearchModal
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          onNavigatePage={setCurrentPage}
          isDarkMode={isDarkMode}
          lang={lang}
        />

        <UserManual
          isOpen={showUserManual}
          onClose={() => setShowUserManual(false)}
          isDarkMode={isDarkMode}
          lang={lang}
          onNavigatePage={(page) => {
            setCurrentPage(page);
            setShowUserManual(false);
          }}
        />

        <SystemStatusModal
          isOpen={showSystemStatus}
          onClose={() => setShowSystemStatus(false)}
          isDarkMode={isDarkMode}
          lang={lang}
        />

        {/* Daily Energy Digest Notification Service Modal */}
        <DailyEnergyDigestModal
          isOpen={showDailyDigestModal}
          onClose={() => setShowDailyDigestModal(false)}
          appliances={appliances}
          monthlyBudget={monthlyBudget}
          persona={currentPersona}
          lang={lang}
          isDarkMode={isDarkMode}
          onApplyTipReward={(tip) => {
            setUserXp(prev => prev + 25);
            setUserCoins(prev => prev + 10);
            handleTriggerBudgetToast(
              'warning',
              `นำเคล็ดลับ '${tip.titleTh}' ไปปรับใช้แล้ว! ได้รับ +25 XP และ 10 เหรียญ`,
              `Applied tip '${tip.titleEn}'! Earned +25 XP and 10 Coins`
            );
          }}
        />

        {/* Monthly Performance & AI Optimization PDF Report Modal */}
        <MonthlyReportPdfModal
          isOpen={showMonthlyReportModal}
          onClose={() => setShowMonthlyReportModal(false)}
          lang={lang}
          isDarkMode={isDarkMode}
          monthlyBudget={monthlyBudget}
          monthlyEstimate={monthlyEstimate}
          moneySavedMonth={moneySavedMonth}
          appliances={appliances}
          userLevel={userLevel}
          currentLocationName={locations.find(l => l.id === currentLocationId)?.name || 'Home Base'}
        />

        {/* Floating Real-Time Budget Alert Toast Notification System */}
        <BudgetAlertToastContainer
          toasts={budgetToasts}
          onDismiss={handleDismissBudgetToast}
          onNavigatePage={setCurrentPage}
          lang={lang}
          isDarkMode={isDarkMode}
        />

        {/* Brand Identity & Logo Suite Modal */}
        <BrandIdentityModal
          isOpen={showBrandIdentityModal}
          onClose={() => setShowBrandIdentityModal(false)}
          lang={lang}
          isDarkMode={isDarkMode}
        />

        {/* Floating Quick Support & PDPA Privacy Center Widget */}
        <QuickSupportWidget
          lang={lang}
          isDarkMode={isDarkMode}
          onOpenManual={() => setShowUserManual(true)}
        />

        <AnimatePresence>
          {showAccountModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="relative w-full max-w-lg my-auto max-h-[90vh] overflow-y-auto scrollbar-none">
                <button
                  onClick={() => setShowAccountModal(false)}
                  className="absolute top-4 right-4 p-2.5 text-white bg-slate-800/90 border border-slate-700 rounded-2xl hover:bg-slate-700 cursor-pointer z-50 shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
                <LoginForm
                  onLogin={() => {
                    setShowAccountModal(false);
                  }}
                  selectedHouseName={locations.find(l => l.id === currentLocationId)?.name || 'Home Base'}
                  isDarkMode={isDarkMode}
                  lang={lang}
                  setLang={setLang}
                />
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

