
import React, { useState, useEffect, useCallback } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { HOUSES } from './constants';

/**
 * Helper to retrieve stored theme preference with a fallback.
 */
const getStoredTheme = (key: string, defaultValue: boolean): boolean => {
  const saved = localStorage.getItem(key);
  return saved !== null ? saved === 'true' : defaultValue;
};

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
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
      />
    );
  }

  const textColor = loginDarkMode ? 'text-white' : 'text-slate-900';
  const navTextColor = loginDarkMode ? 'text-white/30 hover:text-white' : 'text-slate-400 hover:text-emerald-600';

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 ${loginDarkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HOUSES.map((house, idx) => (
          <div
            key={house.id}
            className={`absolute inset-0 bg-transition ${
              idx === activeIndex 
                ? (loginDarkMode ? 'opacity-100 scale-100' : 'opacity-10 scale-100')
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
        <div className={`absolute inset-0 ${loginDarkMode ? 'bg-black/50' : 'bg-white/80'} backdrop-blur-[1px] transition-all duration-700`} />
        <div className={`absolute inset-0 ${loginDarkMode ? 'bg-gradient-to-t from-black via-transparent to-black/60' : 'bg-gradient-to-t from-white via-transparent to-white/90'} transition-all duration-500`} />
        <div className={`absolute inset-0 ${loginDarkMode ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]' : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.3)_100%)]'} transition-all duration-500`} />
      </div>

      {/* Main UI */}
      <div className="relative z-10 h-screen flex flex-col">
        <header className="px-8 py-8 md:px-16 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className={`w-8 h-8 flex items-center justify-center border-2 ${loginDarkMode ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-600 group-hover:border-emerald-700'} transition-all duration-500`}>
               <div className={`w-2 h-2 ${loginDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'} animate-pulse`} />
            </div>
            <span className={`${textColor} font-display text-sm font-bold tracking-[0.4em] uppercase opacity-90 transition-opacity`}>EduEase Energy</span>
          </div>
          
          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex gap-8">
              {['Systems', 'Nodes', 'Emergency'].map((link) => (
                <a key={link} href="#" className={`${navTextColor} transition-all text-[9px] font-bold uppercase tracking-[0.3em]`}>{link}</a>
              ))}
            </nav>

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

        <main className="flex-grow flex items-center justify-center px-4">
           <LoginForm 
              selectedHouseName={activeHouse.name} 
              onLogin={handleLoginSuccess}
              isDarkMode={loginDarkMode}
           />
        </main>

        <footer className="px-8 pb-12 md:px-16 flex justify-between items-end">
          <div className="max-w-md">
            <div key={activeHouse.id} className="animate-fade-in">
              <h3 className={`${loginDarkMode ? 'text-emerald-500/40' : 'text-emerald-600'} text-[8px] uppercase tracking-[0.4em] font-bold mb-1`}>SECTOR ID: {activeHouse.id}</h3>
              <p className={`${textColor} font-display text-2xl font-light tracking-tight mb-1`}>{activeHouse.name}</p>
              <p className={`${loginDarkMode ? 'text-white/30' : 'text-slate-500'} text-[9px] font-medium tracking-[0.2em] uppercase italic`}>{activeHouse.location}</p>
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

      <div className={`absolute inset-0 pointer-events-none ${loginDarkMode ? 'opacity-[0.03]' : 'opacity-[0.01]'} z-50 overflow-hidden`}>
        <div className="h-full w-full bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] bg-[length:100%_8px]" />
      </div>
    </div>
  );
};

export default App;
