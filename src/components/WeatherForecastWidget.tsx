import React, { useState, useEffect } from "react";
import { 
  Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudLightning, CloudSnow, 
  Info, Zap 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface WeatherForecastWidgetProps {
  isDarkMode: boolean;
  lang?: string;
}

// WMO Weather interpretation codes
const getWeatherIcon = (code: number, className: string = "w-6 h-6") => {
  if (code === 0) return <Sun className={`${className} text-amber-500`} />;
  if (code === 1 || code === 2) return <CloudSun className={`${className} text-sky-400`} />;
  if (code === 3) return <Cloud className={`${className} text-slate-400`} />;
  if (code === 45 || code === 48) return <CloudFog className={`${className} text-slate-400`} />;
  if (code === 51 || code === 53 || code === 55) return <CloudDrizzle className={`${className} text-sky-300`} />;
  if (code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) return <CloudRain className={`${className} text-blue-500`} />;
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return <CloudSnow className={`${className} text-sky-200`} />;
  if (code === 95 || code === 96 || code === 99) return <CloudLightning className={`${className} text-purple-500`} />;
  return <CloudSun className={`${className} text-sky-400`} />;
};

const getWeatherLabel = (code: number, lang: string) => {
  const map: Record<number, { en: string, th: string }> = {
    0: { en: "Clear", th: "ฟ้าโปร่ง" },
    1: { en: "Mainly clear", th: "ส่วนใหญ่แจ่มใส" },
    2: { en: "Partly cloudy", th: "มีเมฆบางส่วน" },
    3: { en: "Overcast", th: "มีเมฆมาก" },
    45: { en: "Fog", th: "หมอกลง" },
    51: { en: "Light Drizzle", th: "ละอองฝน" },
    53: { en: "Drizzle", th: "ฝนปรอย" },
    61: { en: "Light Rain", th: "ฝนตกเล็กน้อย" },
    63: { en: "Rain", th: "ฝนตกปานกลาง" },
    65: { en: "Heavy Rain", th: "ฝนตกหนัก" },
    80: { en: "Rain Showers", th: "ฝนฟ้าคะนอง" },
    95: { en: "Thunderstorm", th: "พายุฝนฟ้าคะนอง" },
    96: { en: "Thunderstorm/Hail", th: "พายุฟ้าคะนอง/ลูกเห็บ" },
  };
  return map[code]?.[lang as "en" | "th"] || (lang === "th" ? "สภาพอากาศปกติ" : "Clear");
};

export const WeatherForecastWidget: React.FC<WeatherForecastWidgetProps> = ({ isDarkMode, lang = "th" }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [aiInsight, setAiInsight] = useState<string>("");

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch weather for Bangkok (latitude=13.75, longitude=100.5167) using Open-Meteo
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=13.75&longitude=100.5167&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FBangkok");
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();
        setForecast(data.daily);

        // Analyze logic for AI insight based on the 5-day forecast
        const rainDays = data.daily.weather_code.slice(0, 5).filter((code: number) => code >= 50).length;
        const avgMaxTemp = data.daily.temperature_2m_max.slice(0, 5).reduce((a: number, b: number) => a + b, 0) / 5;

        if (rainDays >= 3) {
           setAiInsight(lang === "th" 
             ? `คาดการณ์ว่าจะมีฝนตกหลายวัน (${rainDays} วัน) ประสิทธิภาพการผลิตไฟฟ้าจากโซลาร์เซลล์จะลดลง 35-45% แนะนำให้เตรียมระบบกักเก็บพลังงานสำรอง`
             : `Expect rain on multiple days (${rainDays} days). Solar efficiency will drop by 35-45%. Recommend relying on energy storage.`
           );
        } else if (avgMaxTemp > 34) {
           setAiInsight(lang === "th" 
             ? `อากาศร้อนจัด (เฉลี่ย ${Math.round(avgMaxTemp)}°C) ภาระระบบปรับอากาศ (HVAC) จะพุ่งสูง 20% แนะนำให้ระบบ pre-cool อาคารช่วงก่อนบ่าย`
             : `High temperatures expected (avg ${Math.round(avgMaxTemp)}°C). HVAC load will peak up to 20% higher. Recommend pre-cooling.`
           );
        } else {
           setAiInsight(lang === "th" 
             ? `สภาพอากาศแจ่มใส การผลิตไฟฟ้าจากพลังงานแสงอาทิตย์อยู่ในเกณฑ์ดีเยี่ยม สามารถจ่ายไฟคืนระบบหลักได้เต็มที่`
             : `Clear weather forecasted. Solar generation expected to be optimal. Surplus power can be routed to the main grid.`
           );
        }

      } catch (err) {
        console.error(err);
        setError("ไม่สามารถดึงข้อมูลพยากรณ์อากาศได้");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lang]);

  if (loading) {
    return (
      <div className={`h-full flex flex-col justify-center items-center p-8 rounded-[2rem] border border-dashed ${isDarkMode ? "border-slate-700 bg-slate-800/30 text-slate-400" : "border-slate-300 bg-slate-50 text-slate-500"}`}>
        <i className="fas fa-spinner fa-spin text-3xl mb-4 text-sky-500"></i>
        <div className="text-xs uppercase tracking-widest font-bold">Fetching Live Open-Meteo Data...</div>
      </div>
    );
  }

  if (error || !forecast) {
    return (
      <div className={`h-full flex flex-col justify-center items-center p-8 rounded-[2rem] border ${isDarkMode ? "border-red-900/30 bg-red-900/10 text-red-400" : "border-red-200 bg-red-50 text-red-500"}`}>
        <Info className="w-8 h-8 mb-2" />
        <div className="text-sm font-bold text-center">{error}</div>
      </div>
    );
  }

  const chartData = forecast?.time?.slice(0, 5).map((dateStr: string, idx: number) => {
    const date = new Date(dateStr);
    const dayName = new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-US", { weekday: "short" }).format(date);
    return {
      name: idx === 0 ? (lang === "th" ? "วันนี้" : "Today") : dayName,
      max: Math.round(forecast.temperature_2m_max[idx]),
      min: Math.round(forecast.temperature_2m_min[idx]),
    };
  }) || [];

  return (
    <div className="flex flex-col h-full">
      {/* AI Intelligence Banner */}
      <div className={`flex items-start gap-3 p-4 mb-5 rounded-2xl border ${isDarkMode ? "bg-indigo-900/20 border-indigo-500/30" : "bg-indigo-50 border-indigo-200"}`}>
        <div className="p-2 bg-indigo-500 rounded-lg text-white mt-1 shrink-0">
          <Zap className="w-4 h-4 fill-current" />
        </div>
        <div>
          <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}>
            {lang === "th" ? "AI วิเคราะห์แผนการใช้ไฟ (อ้างอิง Open-Meteo)" : "AI Dispatch Analysis (Powered by Open-Meteo)"}
          </div>
          <div className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
            {aiInsight}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {forecast.time.slice(0, 5).map((dateStr: string, idx: number) => {
          const date = new Date(dateStr);
          const dayName = new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-US", { weekday: "short" }).format(date);
          const tempMax = Math.round(forecast.temperature_2m_max[idx]);
          const tempMin = Math.round(forecast.temperature_2m_min[idx]);
          const rainProb = forecast.precipitation_probability_max[idx];
          const wCode = forecast.weather_code[idx];

          return (
            <div key={dateStr} className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${isDarkMode ? "bg-slate-800/60 border-slate-700 hover:bg-slate-700" : "bg-white border-slate-200 hover:bg-slate-50 shadow-sm"}`}>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                {idx === 0 ? (lang === "th" ? "วันนี้" : "Today") : dayName}
              </div>
              
              <div className="mb-2">
                {getWeatherIcon(wCode, "w-8 h-8")}
              </div>
              
              <div className="text-[10px] font-medium text-center text-slate-400 mb-3 line-clamp-1 min-h-[15px]">
                {getWeatherLabel(wCode, lang)}
              </div>
              
              <div className="flex flex-col items-center gap-1 w-full mt-auto">
                <div className={`flex items-center justify-between w-full text-xs font-bold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                  <span>{tempMax}°</span>
                  <span className="text-slate-400 font-normal">{tempMin}°</span>
                </div>
                
                {rainProb > 20 && (
                  <div className="flex items-center gap-1 text-[9px] font-bold text-sky-500 mt-1 bg-sky-500/10 px-1.5 py-0.5 rounded-full w-full justify-center">
                    <CloudRain className="w-2.5 h-2.5" />
                    {rainProb}%
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Temperature Trend Chart */}
      <div className={`flex-1 min-h-[160px] p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-slate-50 border-slate-200/50'}`}>
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center justify-between">
          <span>{lang === "th" ? "แนวโน้มอุณหภูมิ (°C)" : "Temperature Trend (°C)"}</span>
          <span className="flex items-center gap-2">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Max</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-sky-500"></div> Min</span>
          </span>
        </div>
        <div className="w-full h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: isDarkMode ? '#94a3b8' : '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: isDarkMode ? '#94a3b8' : '#64748b' }} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="max" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorMax)" />
              <Area type="monotone" dataKey="min" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorMin)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
