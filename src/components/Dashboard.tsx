import React, { useState, useEffect } from "react";
import { Sidebar } from "./navigation/Sidebar";
import { MobileNavbar } from "./navigation/MobileNavbar";
import { HeaderBar } from "./navigation/HeaderBar";
import { HomeView } from "./views/HomeView";
import { AiCoachView } from "./views/AiCoachView";
import { AppliancesView } from "./views/AppliancesView";
import { BudgetView } from "./views/BudgetView";
import { AnalyticsView } from "./views/AnalyticsView";
import { AchievementsView } from "./views/AchievementsView";
import { ProfileView } from "./views/ProfileView";
import { SettingsView } from "./views/SettingsView";
import { LocationsView } from "./views/LocationsView";
import { LearningView } from "./views/LearningView";
import { ComparisonView } from "./views/ComparisonView";
import { ScoreView } from "./views/ScoreView";
import { SmartInsightsHub } from "./insights/SmartInsightsHub";
import { TrustCenterView } from "./trust/TrustCenterView";
import { OnboardingModal } from "./OnboardingModal";
import { NotificationModal } from "./NotificationModal";
import { GlobalSearchModal } from "./common/GlobalSearchModal";
import { GuidedTour } from "./GuidedTour";
import { useOnboardingTour } from "../hooks/useOnboardingTour";
import { AppPage, LocationItem, InfoDetailMode, NotificationItem, SmartGoal, EnergyDiaryNote } from "../types";
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

interface DashboardProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  activeHouse: any;
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
}

export default function Dashboard({
  isDarkMode,
  onToggleTheme,
  onLogout,
  activeHouse,
  lang,
  setLang,
}: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [infoDetailMode, setInfoDetailMode] = useState<InfoDetailMode>('balanced');

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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

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
  const [userLevel, setUserLevel] = useState(7);
  const [userXp, setUserXp] = useState(2450);
  const [userXpMax, setUserXpMax] = useState(3000);
  const [userCoins, setUserCoins] = useState(340);
  const [userStreak, setUserStreak] = useState(5);
  const [currentAvatar, setCurrentAvatar] = useState('⚡');

  // Energy & Budget state
  const [monthlyBudget, setMonthlyBudget] = useState(2500);
  const [monthlyEstimate, setMonthlyEstimate] = useState(1850);
  const [todayCost, setTodayCost] = useState(42.50);
  const [moneySavedMonth, setMoneySavedMonth] = useState(320);

  // Collections state
  const [appliances, setAppliances] = useState(INITIAL_APPLIANCES);
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
      setMonthlyEstimate(loc.estimatedBill);
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
    setMonthlyEstimate(createdLoc.estimatedBill);
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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("EduEase Energy - Energy Performance Report", 14, 20);
    doc.setFontSize(11);
    doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Monthly Spent Estimate: BHT ${monthlyEstimate}`, 14, 40);
    doc.text(`Total Money Saved: BHT ${moneySavedMonth}`, 14, 50);
    doc.text(`User Level: Level ${userLevel} Eco Master`, 14, 60);
    doc.save("EduEase_Energy_Report.pdf");
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
        userStreak={userStreak}
        userCoins={userCoins}
        infoDetailMode={infoDetailMode}
        onChangeDetailMode={setInfoDetailMode}
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
      />

      {/* Main View Area */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
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
          userLevel={userLevel}
          userStreak={userStreak}
          userCoins={userCoins}
          currentAvatar={currentAvatar}
          isDarkMode={isDarkMode}
          lang={lang}
        />

        {currentPage === 'insights' && (
          <SmartInsightsHub
            lang={lang}
            isDarkMode={isDarkMode}
            infoDetailMode={infoDetailMode}
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
            onNavigatePage={setCurrentPage}
          />
        )}

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
          />
        )}

        {currentPage === 'ai-coach' && (
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
          />
        )}

        {currentPage === 'appliances' && (
          <AppliancesView
            lang={lang}
            isDarkMode={isDarkMode}
            appliances={appliances}
            onToggleDeviceStatus={handleToggleDeviceStatus}
            onUpdateEcoMode={() => {}}
            infoDetailMode={infoDetailMode}
            onStartPageTour={handleStartTour}
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
            onStartPageTour={handleStartTour}
          />
        )}

        {currentPage === 'analytics' && (
          <AnalyticsView
            lang={lang}
            isDarkMode={isDarkMode}
            infoDetailMode={infoDetailMode}
            onExportPDF={handleExportPDF}
          />
        )}

        {currentPage === 'learning' && (
          <LearningView
            learningPaths={learningPaths}
            glossaryTerms={glossaryTerms}
            onCompleteLesson={handleCompleteLesson}
            onRestartOnboarding={() => handleStartTour(0)}
            isDarkMode={isDarkMode}
            lang={lang}
            infoDetailMode={infoDetailMode}
            onStartPageTour={handleStartTour}
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

        {currentPage === 'achievements' && (
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
            onStartTour={() => handleStartTour(0)}
            neverShowAgain={neverShowAgain}
            setNeverShowAgain={setNeverShowAgain}
            onNavigatePage={setCurrentPage}
          />
        )}

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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Interactive Modals */}
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
      </main>
    </div>
  );
}

