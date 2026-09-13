import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  BarChart3, 
  BrainCircuit, 
  Wallet, 
  Plug, 
  Award, 
  Activity, 
  Building2, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  Radio,
  SlidersHorizontal
} from 'lucide-react';
import { AppPage } from '../../types';

export interface EnergyDiagnosticQuickNavProps {
  currentPage: AppPage;
  onNavigatePage?: (page: AppPage) => void;
  onNavigate?: (page: AppPage) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
  activeLocationName?: string;
  activeLoadKw?: number;
  powerFactor?: number;
  unbalancePercent?: number;
  loadUnbalancePct?: number;
  voltageV?: number;
}

export const EnergyDiagnosticQuickNav: React.FC<EnergyDiagnosticQuickNavProps> = ({
  currentPage,
  onNavigatePage,
  onNavigate,
  lang,
  isDarkMode,
  activeLocationName = 'บ้านพักอาศัย (Main House)',
  activeLoadKw = 2.45,
  powerFactor = 0.94,
  unbalancePercent = 3.2,
  loadUnbalancePct,
  voltageV,
}) => {
  const navigate = onNavigatePage || onNavigate || (() => {});
  const effectiveUnbalance = loadUnbalancePct !== undefined ? loadUnbalancePct : unbalancePercent;
  const diagnosticViews = [
    {
      id: 'analytics' as AppPage,
      labelTh: '3 เฟส & เทเลเมตรี',
      labelEn: '3-Phase & Telemetry',
      icon: Zap,
      badge: 'Live',
      badgeColor: 'emerald',
      shortcut: '1'
    },
    {
      id: 'insights' as AppPage,
      labelTh: 'กราฟโหลด & ฮีทแมป',
      labelEn: 'Load Curve & Heatmap',
      icon: BarChart3,
      badge: undefined,
      shortcut: '2'
    },
    {
      id: 'ai-coach' as AppPage,
      labelTh: 'AI โค้ชวินิจฉัย',
      labelEn: 'AI Voltie Coach',
      icon: BrainCircuit,
      badge: 'AI',
      badgeColor: 'purple',
      shortcut: '3'
    },
    {
      id: 'budget' as AppPage,
      labelTh: 'พิกัดอัตรา & พีคโหลด',
      labelEn: 'Tariff & Peak Demand',
      icon: Wallet,
      badge: undefined,
      shortcut: '4'
    },
    {
      id: 'appliances' as AppPage,
      labelTh: 'สถานะเครื่องใช้ไฟฟ้า',
      labelEn: 'Device Audits',
      icon: Plug,
      badge: undefined,
      shortcut: '5'
    },
    {
      id: 'ux-assessment' as AppPage,
      labelTh: 'UX วินิจฉัยระบบ',
      labelEn: 'UX Heuristics',
      icon: Award,
      badge: '98%',
      badgeColor: 'blue',
      shortcut: '6'
    }
  ];

  // Optional keyboard navigation for rapid power-user diagnostic toggling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      const match = diagnosticViews.find(v => v.shortcut === e.key);
      if (match && e.altKey) {
        e.preventDefault();
        navigate(match.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [diagnosticViews, navigate]);

  return (
    <div className={`sticky top-2 z-30 mb-6 p-2 rounded-2xl border shadow-lg backdrop-blur-xl transition-all ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800/80 shadow-slate-950/40 text-white' 
        : 'bg-white/95 border-emerald-100/90 shadow-emerald-500/5 text-slate-800'
    }`}>
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2.5">
        {/* Left: Telemetry Context Pill */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 text-xs shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="truncate max-w-[130px] sm:max-w-none">{activeLocationName}</span>
          </div>

          <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />

          {/* Active Metrics */}
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="text-slate-500 dark:text-slate-400">
              P: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{activeLoadKw.toFixed(2)} kW</strong>
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              cos φ: <strong className={powerFactor >= 0.85 ? 'text-emerald-500' : 'text-amber-500'}>{powerFactor.toFixed(2)}</strong>
            </span>
            <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
              Unbalance: <strong className={effectiveUnbalance <= 5 ? 'text-emerald-500' : 'text-red-500'}>{effectiveUnbalance}%</strong>
            </span>
            {voltageV && (
              <span className="text-slate-500 dark:text-slate-400 hidden md:inline">
                V: <strong className="text-blue-500">{voltageV}V</strong>
              </span>
            )}
          </div>
        </div>

        {/* Right: Quick Segmented Navigation Bar */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar scroll-smooth">
          {diagnosticViews.map((tab) => {
            const isActive = currentPage === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.id)}
                title={`${lang === 'th' ? tab.labelTh : tab.labelEn} (Alt+${tab.shortcut})`}
                className={`relative px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-102'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap font-medium">
                  {lang === 'th' ? tab.labelTh : tab.labelEn}
                </span>

                {tab.badge && (
                  <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : tab.badgeColor === 'emerald'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : tab.badgeColor === 'purple'
                          ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400'
                          : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
