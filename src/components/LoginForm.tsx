
import React, { useState, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface LoginFormProps {
  onLogin: (username: string) => void;
  selectedHouseName: string;
  isDarkMode: boolean;
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, selectedHouseName, isDarkMode, lang, setLang }) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        onLogin(data.user.username);
      } else {
        setError(data.error || (lang === 'th' ? 'ไม่สามารถตรวจสอบสิทธิ์ได้ กรุณาตรวจสอบข้อมูลและลองใหม่' : 'Authentication failed. Please check credentials and try again.'));
      }
    } catch (err) {
      setError(lang === 'th' ? 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์' : 'Server connection error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const glassClass = isDarkMode ? 'glass-dark' : 'glass-light';
  const labelColor = isDarkMode ? 'text-white/60' : 'text-slate-500'; // Fixed WCAG contrast text-white/40 -> text-white/60
  const inputBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200';
  const inputTextColor = isDarkMode ? 'text-white placeholder-white/20' : 'text-slate-900 placeholder-slate-400';
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const subHeadingColor = isDarkMode ? 'text-white/60' : 'text-slate-600';

  return (
    <div className={`w-full max-w-[360px] mx-auto relative z-20 theme-transition ${error ? 'animate-shake' : ''}`}>
      <div className={`${glassClass} p-6 sm:p-8 rounded-[2.5rem] relative overflow-hidden theme-transition`}>
        {/* Animated accent light */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-500/15'} blur-[80px] rounded-full pointer-events-none`} />
        
        <div className="relative z-10">
          <div className="mb-4 text-center">
            <h2 className={`text-2xl font-semibold ${headingColor} mb-1 tracking-tight font-display transition-colors`}>{lang === 'th' ? 'ยินดีต้อนรับกลับมา' : 'Welcome Back'}</h2>
            <p className={`${subHeadingColor} text-[0.75rem] font-medium uppercase tracking-[0.15em] transition-colors`}>
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
            <div className={`text-center text-[0.65rem] uppercase tracking-widest mt-2 ${labelColor}`}>
              {lang === 'th' ? 'แนวโน้มการใช้ไฟ 24 ชั่วโมง (ข้อมูลจำลอง)' : '24-Hour Consumption Trend (Sample Data)'}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className={`text-[0.7rem] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>{lang === 'th' ? 'ผู้ใช้งาน' : 'Identity'}</label>
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={lang === 'th' ? 'ชื่อผู้ใช้' : 'Username'}
                className={`w-full ${inputBg} border rounded-2xl px-4 py-3 ${inputTextColor} focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-[0.7rem] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>{lang === 'th' ? 'รหัสผ่าน' : 'Passkey'}</label>
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
              <p className="text-red-500 text-[0.75rem] text-center font-bold tracking-wide">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full bg-emerald-500 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-emerald-400 active:scale-[0.97] transition-all flex items-center justify-center gap-2 mt-2 ${isLoading ? 'animate-pulse cursor-wait' : ''}`}
            >
              {isLoading ? (
                <span className="tracking-widest text-[0.75rem]">{lang === 'th' ? 'กำลังตรวจสอบข้อมูล...' : 'AUTHENTICATING...'}</span>
              ) : (
                <span className="tracking-widest text-[0.75rem]">{lang === 'th' ? 'เข้าสู่ระบบควบคุม' : 'AUTHORIZE ACCESS'}</span>
              )}
            </button>
            
            <div className="text-center pt-1">
               <span className={`text-[0.65rem] ${labelColor} font-mono tracking-wider uppercase flex items-center justify-center gap-1.5`}>
                 <i className="fas fa-shield-alt text-emerald-500 animate-pulse" aria-hidden="true"></i> SECURE MFA GATEWAY ENFORCED
               </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
