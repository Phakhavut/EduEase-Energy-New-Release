
import React, { useState, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface LoginFormProps {
  onLogin: (username: string) => void;
  selectedHouseName: string;
  isDarkMode: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, selectedHouseName, isDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate deterministic 24-hour mock data based on house name so it looks consistent
  const mockConsumptionData = useMemo(() => {
    const seed = selectedHouseName.length;
    return Array.from({ length: 24 }, (_, i) => {
      const base = 20 + (seed % 10);
      const peak = (i > 8 && i < 22) ? 40 : 0;
      const randomVariance = Math.sin(i + seed) * 15;
      return {
        time: `${i}:00`,
        energy: Math.max(10, Math.floor(base + peak + randomVariance))
      };
    });
  }, [selectedHouseName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      if (username === 'Namyen' && password === '12345') {
        onLogin(username);
      } else {
        setError('Verification Failed');
        setIsLoading(false);
      }
    }, 1000);
  };

  const glassClass = isDarkMode ? 'glass-dark' : 'glass-light';
  const labelColor = isDarkMode ? 'text-white/40' : 'text-slate-500';
  const inputBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200';
  const inputTextColor = isDarkMode ? 'text-white placeholder-white/10' : 'text-slate-900 placeholder-slate-400';
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const subHeadingColor = isDarkMode ? 'text-white/60' : 'text-slate-600';

  return (
    <div className={`w-full max-w-[360px] mx-auto relative z-20 theme-transition ${error ? 'animate-shake' : ''}`}>
      <div className={`${glassClass} p-8 rounded-[2.5rem] relative overflow-hidden theme-transition`}>
        {/* Animated accent light */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-500/15'} blur-[80px] rounded-full pointer-events-none`} />
        
        <div className="relative z-10">
          <div className="mb-4 text-center">
            <h2 className={`text-2xl font-semibold ${headingColor} mb-1 tracking-tight font-display transition-colors`}>Welcome Back</h2>
            <p className={`${subHeadingColor} text-[10px] font-medium uppercase tracking-[0.15em] transition-colors`}>
              Node: <span className="text-emerald-500">{selectedHouseName}</span>
            </p>
          </div>

          {/* 24-Hour Energy Trend Graph */}
          <div className="mb-6 h-24 w-full opacity-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockConsumptionData}>
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={false}
                  activeDot={{ r: 4, fill: "#10b981", stroke: isDarkMode ? "#1e293b" : "#ffffff", strokeWidth: 2 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '10px',
                    color: isDarkMode ? '#e2e8f0' : '#1e293b',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                  labelStyle={{ color: labelColor, marginBottom: '4px' }}
                  cursor={{ stroke: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`${value} kWh`, 'Usage']}
                  labelFormatter={(label) => `${label}`}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className={`text-center text-[8px] uppercase tracking-widest mt-2 ${labelColor}`}>
              24-Hour Consumption Trend
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className={`text-[9px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Identity</label>
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className={`w-full ${inputBg} border rounded-2xl px-4 py-3 ${inputTextColor} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-[9px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Passkey</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full ${inputBg} border rounded-2xl px-4 py-3 ${inputTextColor} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm`}
              />
            </div>

            {error && (
              <p className="text-red-500 text-[10px] text-center font-bold tracking-wide">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full bg-emerald-500 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-emerald-400 active:scale-[0.97] transition-all flex items-center justify-center gap-2 mt-2 ${isLoading ? 'animate-pulse cursor-wait' : ''}`}
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="tracking-widest text-[10px]">AUTHORIZE ACCESS</span>
              )}
            </button>
            
            <div className="text-center">
               <button type="button" className={`text-[9px] ${labelColor} hover:text-emerald-500 transition-colors tracking-tighter uppercase font-bold`}>
                 Secure Authentication Required
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
