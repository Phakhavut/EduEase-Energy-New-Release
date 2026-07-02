
import React, { useState, useEffect, useCallback } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import UserManual from './components/UserManual';
import { HOUSES } from './constants';
import { useOnboardingTour } from './hooks/useOnboardingTour';

/**
 * Helper to retrieve stored theme preference with a fallback.
 */
const getStoredTheme = (key: string, defaultValue: boolean): boolean => {
  const saved = localStorage.getItem(key);
  return saved !== null ? saved === 'true' : defaultValue;
};

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [lang, setLang] = useState<'th' | 'en'>('th');
  
  const { tourCompleted, markCompleted, setStartImmediate } = useOnboardingTour();
  const showWelcomeTourPrompt = !tourCompleted;

  const handleStartOnboardingTour = () => {
    setStartImmediate(true);
    handleLoginSuccess('Demo User');
  };

  const handleSkipOnboardingTour = () => {
    markCompleted();
  };

  // Independent theme states for Login and Dashboard
  const [loginDarkMode, setLoginDarkMode] = useState<boolean>(() => 
    getStoredTheme('loginDarkMode', true)
  );
  const [dashboardDarkMode, setDashboardDarkMode] = useState<boolean>(() => 
    getStoredTheme('dashboardDarkMode', false)
  );

  // Synchronize Login theme preference to storage
  useEffect(() => {
    localStorage.setItem('loginDarkMode', String(loginDarkMode));
  }, [loginDarkMode]);

  // Synchronize Dashboard theme preference to storage
  useEffect(() => {
    localStorage.setItem('dashboardDarkMode', String(dashboardDarkMode));
  }, [dashboardDarkMode]);

  // Handle global attributes (body theme/bg) based on current view and its specific theme
  useEffect(() => {
    const currentDarkMode = isLoggedIn ? dashboardDarkMode : loginDarkMode;
    const body = document.body;
    
    body.setAttribute('data-theme', currentDarkMode ? 'dark' : 'light');
    if (currentDarkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    
    // Apply specific background colors to prevent flickering or inconsistent gaps
    if (isLoggedIn) {
      body.style.backgroundColor = currentDarkMode ? '#0b1437' : '#f4f7fe';
    } else {
      body.style.backgroundColor = currentDarkMode ? '#000000' : '#ffffff';
    }
  }, [isLoggedIn, loginDarkMode, dashboardDarkMode]);

  const activeHouse = HOUSES[activeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HOUSES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + HOUSES.length) % HOUSES.length);
  }, []);

  const toggleLoginTheme = () => {
    setLoginDarkMode((prev) => !prev);
  };

  const toggleDashboardTheme = () => {
    setDashboardDarkMode((prev) => !prev);
  };

  const handleLoginSuccess = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLoggedIn) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isLoggedIn]);

  if (isLoggedIn) {
    return (
      <Dashboard 
        isDarkMode={dashboardDarkMode} 
        onToggleTheme={toggleDashboardTheme} 
        onLogout={handleLogout} 
        activeHouse={activeHouse}
      />
    );
  }

  const textColor = loginDarkMode ? 'text-white' : 'text-slate-900';
  const navTextColor = loginDarkMode ? 'text-white/30 hover:text-white' : 'text-slate-400 hover:text-emerald-600';

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 ${loginDarkMode ? 'bg-black' : 'bg-slate-50'}`}>
      {/* Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HOUSES.map((house, idx) => (
          <div
            key={house.id}
            className={`absolute inset-0 bg-transition duration-[1000ms] ${
              idx === activeIndex 
                ? (loginDarkMode ? 'opacity-100 scale-100' : 'opacity-70 scale-100')
                : 'opacity-0 scale-110'
            }`}
            style={{
              backgroundImage: `url(${house.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Visual Filters */}
        <div className={`absolute inset-0 ${loginDarkMode ? 'bg-black/50' : 'bg-white/20'} backdrop-blur-[1px] transition-all duration-700`} />
        <div className={`absolute inset-0 ${loginDarkMode ? 'bg-gradient-to-t from-black via-transparent to-black/60' : 'bg-gradient-to-t from-white/30 via-transparent to-white/70'} transition-all duration-500`} />
        <div className={`absolute inset-0 ${loginDarkMode ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]' : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.05)_100%)]'} transition-all duration-500`} />
      </div>

      {/* Main UI */}
      <div className="relative z-10 h-screen flex flex-col">
        <header className="px-6 py-6 md:px-12 lg:px-16 flex justify-between items-center relative z-50">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className={`w-8 h-8 flex items-center justify-center border-2 ${loginDarkMode ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-600 group-hover:border-emerald-700'} transition-all duration-500`}>
               <div className={`w-2 h-2 ${loginDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'} animate-pulse`} />
            </div>
            <span className={`${textColor} font-display text-sm font-bold tracking-[0.4em] uppercase opacity-90 transition-opacity`}>EduEase Energy</span>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex gap-8">
              {['Systems', 'Nodes', 'Emergency'].map((link) => (
                <a key={link} href="#" className={`${navTextColor} transition-all text-[0.7rem] font-bold uppercase tracking-[0.3em]`}>{link}</a>
              ))}
            </nav>

            <button 
              className={`lg:hidden p-2 rounded-xl transition-all ${loginDarkMode ? 'text-white/70 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200/50'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition-all duration-300 ${loginDarkMode ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white' : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'} shadow-sm`}
            >
              {lang.toUpperCase()}
            </button>

            {/* Quick Access User Manual Button */}
            <button
              onClick={() => setIsManualOpen(true)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-[0.75rem] uppercase tracking-wider font-bold rounded-xl border transition-all duration-300 ${loginDarkMode ? 'border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400' : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700'} shadow-sm`}
            >
              <i className="fas fa-book-open"></i>
              <span>{lang === 'th' ? 'คู่มือการใช้งาน' : 'User Manual'}</span>
            </button>

            <button 
              onClick={toggleLoginTheme}
              className={`p-2 rounded-xl border transition-all duration-300 ${loginDarkMode ? 'border-white/10 bg-white/5 hover:bg-white/10 text-yellow-400' : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'} shadow-sm`}
              aria-label="Toggle Theme"
            >
              {loginDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden absolute top-0 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-500 z-40 overflow-hidden ${isMobileMenuOpen ? 'max-h-[400px] opacity-100 py-24' : 'max-h-0 opacity-0 py-0'}`}>
           <nav className="flex flex-col items-center gap-6">
              {['Systems', 'Nodes', 'Emergency'].map((link) => (
                <a key={link} href="#" className="text-white/80 hover:text-emerald-400 transition-all text-sm font-bold uppercase tracking-[0.3em]">{link}</a>
              ))}
           </nav>
        </div>

        <main className="flex-grow flex items-center justify-center px-4 relative z-30">
           <LoginForm 
              selectedHouseName={activeHouse.name} 
              onLogin={handleLoginSuccess}
              isDarkMode={loginDarkMode}
           />
        </main>

        <footer className="px-8 pb-12 md:px-16 flex justify-between items-end">
          <div className="max-w-md">
            <div key={activeHouse.id} className="animate-fade-in">
              <h3 className={`${loginDarkMode ? 'text-emerald-500/40' : 'text-emerald-600'} text-[0.65rem] uppercase tracking-[0.4em] font-bold mb-1`}>SECTOR ID: {activeHouse.id}</h3>
              <p className={`${textColor} font-display text-2xl font-light tracking-tight mb-1`}>{activeHouse.name}</p>
              <p className={`${loginDarkMode ? 'text-white/30' : 'text-slate-500'} text-[0.7rem] font-medium tracking-[0.2em] uppercase italic`}>{activeHouse.location}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex gap-2 mb-4">
              <button onClick={handlePrev} className={`p-2 rounded-full border ${loginDarkMode ? 'border-white/10 hover:bg-emerald-500' : 'border-slate-200 hover:bg-emerald-600'} hover:text-white transition-all`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={handleNext} className={`p-2 rounded-full border ${loginDarkMode ? 'border-white/10 hover:bg-emerald-500' : 'border-slate-200 hover:bg-emerald-600'} hover:text-white transition-all`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <span className={`${loginDarkMode ? 'text-white/10' : 'text-slate-200'} font-display text-5xl font-extralight tracking-tighter leading-none`}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
          </div>
        </footer>
      </div>

      <UserManual 
        isOpen={isManualOpen} 
        onClose={() => setIsManualOpen(false)} 
        isDarkMode={loginDarkMode} 
        lang={lang} 
      />

      {/* Onboarding Welcome Prompt (Modal dialog visible on startup) */}
      {showWelcomeTourPrompt && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className={`w-full max-w-lg p-6 md:p-8 rounded-[2.5rem] border shadow-2xl transition-all duration-300 transform scale-100 my-auto max-h-[95vh] overflow-y-auto ${
            loginDarkMode 
              ? 'bg-slate-900 border-emerald-500/30 text-white' 
              : 'bg-white border-emerald-200 text-slate-800'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-4 rounded-2xl ${loginDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'} animate-pulse`}>
                <i className="fas fa-graduation-cap text-2xl"></i>
              </div>
              <div>
                <h4 className="font-display font-black text-lg md:text-xl leading-tight">
                  {lang === 'th' ? 'ระบบช่วยนำสอนรูปแบบ Spotlight!' : 'EduEase Spotlight Guided Tour'}
                </h4>
                <p className="text-[0.75rem] text-emerald-500 font-bold uppercase tracking-widest font-mono">Interactive Onboarding</p>
              </div>
            </div>

            <p className={`text-xs leading-relaxed mb-6 ${loginDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {lang === 'th'
                ? 'ยินดีต้อนรับสู่ระบบพาชมประสิทธิภาพของเรา! ระบบจะกึ่งหรี่ไฟสีเทาครอบคลุมหน้าจอส่วนอื่นๆ และเว้นช่องแสง (Spotlight) ให้สว่างโร่ ณ บริเวณที่กำลังประยุกต์สอน พร้อมหน้ากากโมชันลื่นไหล เพื่อลดส่วนรบกวนสายตาและทำให้วิทยาทัศน์เด่นชัดที่สุด!'
                : 'Welcome to our premium Spotlight tour! It dims non-critical elements into soft gray shadows to illuminate active control modules seamlessly, complete with fluid elastic slide motions that focus your view.'}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                id="btn-skip-onboarding"
                onClick={handleSkipOnboardingTour}
                className={`w-full py-3.5 rounded-2xl text-xs font-black transition-all ${
                  loginDarkMode 
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm'
                }`}
              >
                <i className="fas fa-forward me-1.5"></i>
                {lang === 'th' ? 'ข้ามและเริ่มใช้งาน' : 'Skip & Start'}
              </button>
              <button
                id="btn-start-onboarding"
                onClick={handleStartOnboardingTour}
                className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-primary/20 hover:scale-[1.02]"
              >
                <i className="fas fa-play-circle me-1.5 animate-pulse"></i>
                {lang === 'th' ? 'เริ่มต้นนำสอน' : 'Start Walkthrough'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`absolute inset-0 pointer-events-none ${loginDarkMode ? 'opacity-[0.03]' : 'opacity-[0.01]'} z-50 overflow-hidden`}>
        <div className="h-full w-full bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] bg-[length:100%_8px]" />
      </div>
    </div>
  );
};

export default App;
