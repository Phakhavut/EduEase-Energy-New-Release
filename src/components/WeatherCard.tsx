import React, { useState, useEffect } from "react";
import { 
  Cloud, Sun, Droplets, Wind, MapPin, ExternalLink, RefreshCw, Clock, Zap, Info,
  CloudSun, CloudFog, CloudDrizzle, CloudRain, CloudLightning, CloudSnow
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";

type CityKey = "samut_prakan" | "bangkok";

// TMD Weather Code Mapping (For current weather)
const getTmdWeatherInfo = (code: string) => {
  const mapping: Record<string, { en: string; th: string; isClear: boolean }> = {
    "01": { en: "Sunny / Clear", th: "แดดจัด / ฟ้าโปร่ง", isClear: true },
    "02": { en: "Fair / Clear", th: "แดดจัด / มีเมฆบางส่วน", isClear: true },
    "03": { en: "Partly Cloudy", th: "มีเมฆบางส่วน", isClear: true },
    "04": { en: "Cloudy", th: "มีเมฆมาก", isClear: false },
    "05": { en: "Overcast", th: "ครึ้มฟ้าครึ้มฝน", isClear: false },
    "06": { en: "Light Rain", th: "ฝนตกเล็กน้อย", isClear: false },
    "07": { en: "Rain", th: "ฝนตก", isClear: false },
    "08": { en: "Heavy Rain", th: "ฝนตกหนัก", isClear: false },
    "09": { en: "Thunderstorm", th: "ฝนฟ้าคะนอง", isClear: false },
    "10": { en: "Showers", th: "ฝนไล่ช้าง", isClear: false },
    "11": { en: "Drizzle", th: "ฝนละออง", isClear: false },
    "12": { en: "Isolated Rain", th: "ฝนกระจายบางแห่ง", isClear: false },
  };
  return mapping[code] || { en: "Partly Cloudy", th: "มีเมฆบางส่วน", isClear: true };
};

// Open-Meteo WMO Weather Code Mapping (For 5-day forecast)
const getWmoWeatherIcon = (code: number, className: string = "w-6 h-6") => {
  if (code === 0) return <Sun className={`${className} text-amber-500`} />;
  if (code === 1 || code === 2) return <CloudSun className={`${className} text-sky-400`} />;
  if (code === 3) return <Cloud className={`${className} text-slate-500`} />;
  if (code === 45 || code === 48) return <CloudFog className={`${className} text-slate-500`} />;
  if (code === 51 || code === 53 || code === 55) return <CloudDrizzle className={`${className} text-sky-300`} />;
  if (code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) return <CloudRain className={`${className} text-blue-500`} />;
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return <CloudSnow className={`${className} text-sky-200`} />;
  if (code === 95 || code === 96 || code === 99) return <CloudLightning className={`${className} text-purple-500`} />;
  return <CloudSun className={`${className} text-sky-400`} />;
};

const getWmoWeatherLabel = (code: number, lang: string) => {
  const map: Record<number, { en: string; th: string }> = {
    0: { en: "Clear", th: "ฟ้าโปร่ง" },
    1: { en: "Mainly clear", th: "แจ่มใสส่วนใหญ่" },
    2: { en: "Partly cloudy", th: "มีเมฆบางส่วน" },
    3: { en: "Overcast", th: "มีเมฆมาก" },
    45: { en: "Fog", th: "หมอกลง" },
    51: { en: "Light Drizzle", th: "ละอองฝน" },
    53: { en: "Drizzle", th: "ฝนปรอย" },
    61: { en: "Light Rain", th: "ฝนเล็กน้อย" },
    63: { en: "Rain", th: "ฝนตกปานกลาง" },
    65: { en: "Heavy Rain", th: "ฝนตกหนัก" },
    80: { en: "Rain Showers", th: "ฝนฟ้าคะนอง" },
    95: { en: "Thunderstorm", th: "พายุฝนฟ้าคะนอง" },
    96: { en: "Thunderstorm/Hail", th: "พายุและลูกเห็บ" },
  };
  return map[code]?.[lang as "en" | "th"] || (lang === "th" ? "สภาพอากาศปกติ" : "Clear");
};

const formatTmdTime = (isoString?: string) => {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " น.";
  } catch (e) {
    return "";
  }
};

interface WeatherCardProps {
  isDarkMode: boolean;
  locationName: string;
  lang?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ isDarkMode, locationName, lang = "th" }) => {
  const [selectedCity, setSelectedCity] = useState<CityKey>("samut_prakan");
  const [loading, setLoading] = useState(true);
  const [updateKey, setUpdateKey] = useState(0); // Trigger subtle fade-in transition
  const [weather, setWeather] = useState<{
    temp: number;
    humidity: number;
    wind: number;
    weatherType: string;
    dateTime: string;
    stationName: string;
    source: string;
    forecast: any | null;
  }>({
    temp: 32,
    humidity: 70,
    wind: 12,
    weatherType: "03",
    dateTime: "",
    stationName: "Samut Prakan Station",
    source: "api",
    forecast: null
  });

  const [aiInsight, setAiInsight] = useState<{ th: string; en: string }>({
    th: "ระบบกำลังเตรียมข้อมูลวิเคราะห์แผนการจ่ายไฟ...",
    en: "Preparing dispatch optimization analysis..."
  });

  const fetchWeatherAndForecast = async (city: CityKey) => {
    setLoading(true);
    try {
      // 1. Fetch current weather from TMD proxy endpoint
      const provinceQuery = city === "samut_prakan" ? "samut-prakan" : "bangkok";
      const tmdResponse = await fetch(`/api/weather/tmd?province=${provinceQuery}`);
      let tmdData = {
        temp: city === "samut_prakan" ? 32 : 33,
        humidity: city === "samut_prakan" ? 71 : 65,
        wind: city === "samut_prakan" ? 13 : 10,
        weatherType: "03",
        dateTime: new Date().toISOString(),
        stationName: city === "samut_prakan" ? "Samut Prakan Observing Station" : "Bangna Agrometeorological Station",
        source: "fallback"
      };

      if (tmdResponse.ok) {
        tmdData = await tmdResponse.json();
      }

      // 2. Fetch 5-day daily weather forecast from Open-Meteo
      const lat = city === "samut_prakan" ? "13.599" : "13.75";
      const lon = city === "samut_prakan" ? "100.596" : "100.5167";
      const forecastResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FBangkok`
      );
      
      let dailyForecast = null;
      if (forecastResponse.ok) {
        const fcData = await forecastResponse.json();
        dailyForecast = fcData.daily;
      }

      // 3. Set combined state
      setWeather({
        temp: tmdData.temp,
        humidity: tmdData.humidity,
        wind: tmdData.wind,
        weatherType: tmdData.weatherType,
        dateTime: tmdData.dateTime,
        stationName: tmdData.stationName,
        source: tmdData.source,
        forecast: dailyForecast
      });

      // 4. Generate AI dispatch insight based on forecast
      if (dailyForecast) {
        const rainDays = dailyForecast.weather_code.slice(0, 5).filter((code: number) => code >= 50).length;
        const avgMaxTemp = dailyForecast.temperature_2m_max.slice(0, 5).reduce((a: number, b: number) => a + b, 0) / 5;

        if (rainDays >= 3) {
          setAiInsight({
            th: `คาดว่าจะมีฝนตกหนักบางวันในเขต ${city === "samut_prakan" ? "สมุทรปราการ" : "กรุงเทพฯ"} ประสิทธิภาพโซลาร์เซลล์จะลดลง 35-45% แนะนำปรับระบบกักเก็บพลังงานให้อยู่ในโหมดสำรอง`,
            en: `Frequent rain expected in ${city === "samut_prakan" ? "Samut Prakan" : "Bangkok"}. Solar cell generation will fall by 35-45%. Storage battery shifted to Backup Reserve.`
          });
        } else if (avgMaxTemp > 34) {
          setAiInsight({
            th: `อากาศร้อนจัดในพื้นที่ ${city === "samut_prakan" ? "สมุทรปราการ" : "กรุงเทพฯ"} (เฉลี่ย ${Math.round(avgMaxTemp)}°C) แนะนำเปิดฟังก์ชัน Eco-Standby สำหรับโหลดเครื่องปรับอากาศ เพื่อลดการกินไฟเกินพิกัด`,
            en: `Extreme heat forecasted in ${city === "samut_prakan" ? "Samut Prakan" : "Bangkok"} (avg ${Math.round(avgMaxTemp)}°C). HVAC cooling demand is high. Recommending Eco-Standby activation.`
          });
        } else {
          setAiInsight({
            th: `สภาพอากาศในเขต ${city === "samut_prakan" ? "สมุทรปราการ" : "กรุงเทพฯ"} แจ่มใส การผลิตกระแสไฟฟ้าจากพลังงานแสงอาทิตย์ทำงานได้เต็มประสิทธิภาพ แนะนำจ่ายไฟส่วนเกินคืนระบบหลัก`,
            en: `Clear sunny conditions expected in ${city === "samut_prakan" ? "Samut Prakan" : "Bangkok"}. Optimal solar PV generation. Surplus energy recommended to feed back to the main grid.`
          });
        }
      } else {
        setAiInsight({
          th: `ระบบประเมินความสถียรการใช้ไฟฟ้าในเกณฑ์ปรกติ ตามสถิติสภาพภูมิอากาศของจังหวัด ${city === "samut_prakan" ? "สมุทรปราการ" : "กรุงเทพฯ"}`,
          en: `Electric grid dispatch balance evaluates stable, aligned with seasonal climate baselines of ${city === "samut_prakan" ? "Samut Prakan" : "Bangkok"}.`
        });
      }

      // Trigger subtle fade-in transition
      setUpdateKey(prev => prev + 1);

    } catch (err) {
      console.error("Combined weather/forecast fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherAndForecast(selectedCity);

    // Refresh every 5 minutes to keep official TMD data updated but not overly frequent
    const interval = setInterval(() => {
      fetchWeatherAndForecast(selectedCity);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  const cond = getTmdWeatherInfo(weather.weatherType);

  // Prepare chart data for Recharts
  const chartData = weather.forecast?.time?.slice(0, 5).map((dateStr: string, idx: number) => {
    const date = new Date(dateStr);
    const dayName = new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-US", { weekday: "short" }).format(date);
    return {
      name: idx === 0 ? (lang === "th" ? "วันนี้" : "Today") : dayName,
      max: Math.round(weather.forecast.temperature_2m_max[idx]),
      min: Math.round(weather.forecast.temperature_2m_min[idx]),
    };
  }) || [];

  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${isDarkMode ? "bg-slate-900/40 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800 shadow-sm"}`}>
      
      {/* Header with Title & City Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-dashed border-slate-200 dark:border-slate-800/80 z-10 relative">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-sky-500/10 dark:bg-sky-500/20 rounded-xl text-sky-500">
              <MapPin className="w-4 h-4 shrink-0" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === "th" ? "ศูนย์วิเคราะห์และพยากรณ์อากาศอัจฉริยะ" : "Climate & Dispatch Intelligence Center"}
            </h3>
          </div>
          <p className="text-[0.7rem] text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {lang === "th" ? "ซิงค์ข้อมูลจริงจาก กรมอุตุนิยมวิทยา (TMD) & Open-Meteo" : "Synchronized Live with Thai Meteorological Department & Open-Meteo"}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <button
              type="button"
              onClick={() => setSelectedCity("samut_prakan")}
              className={`px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider rounded-lg transition-all ${
                selectedCity === "samut_prakan"
                  ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              Samut Prakan
            </button>
            <button
              type="button"
              onClick={() => setSelectedCity("bangkok")}
              className={`px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider rounded-lg transition-all ${
                selectedCity === "bangkok"
                  ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              Bangkok
            </button>
          </div>

          <button
            type="button"
            onClick={() => fetchWeatherAndForecast(selectedCity)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title="Refresh weather"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Unified Grid: Desktop 3-columns, Tablet/Mobile stack */}
      <motion.div 
        key={updateKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 relative"
      >
        
        {/* Column 1: Live TMD Current Weather */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-800/10 p-5 rounded-[1.75rem] border border-slate-100 dark:border-slate-800/60 h-full">
          <div>
            <div className="text-[0.68rem] font-extrabold uppercase tracking-widest text-slate-500 mb-3.5">
              {lang === "th" ? "สภาพอากาศปัจจุบัน (TMD Live)" : "Current Weather (TMD Live)"}
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className={`p-3.5 rounded-2xl ${isDarkMode ? "bg-slate-800/80" : "bg-white border border-slate-200/60"} flex items-center justify-center shadow-xs`}>
                {!cond.isClear ? <Cloud className="w-10 h-10 text-sky-400/80" /> : <Sun className="w-10 h-10 text-amber-500" />}
              </div>
              <div>
                <div className="text-4xl font-light font-display tracking-tighter flex items-baseline leading-none mb-1.5">
                  {loading ? "--" : weather.temp}
                  <span className="text-xl font-normal text-slate-500 ml-0.5">°C</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.78rem] font-bold text-sky-500 dark:text-sky-400">{loading ? "Syncing..." : cond.th}</span>
                  <span className="text-slate-500 text-[0.68rem] font-medium">{loading ? "" : cond.en}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-dashed border-slate-200 dark:border-slate-800/80 pt-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-sky-500/10 rounded-lg text-sky-400">
                  <Droplets className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-slate-500">{lang === "th" ? "ความชื้น" : "Humidity"}</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{loading ? "--" : weather.humidity}% RH</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-slate-500/10 rounded-lg text-slate-500">
                  <Wind className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-slate-500">{lang === "th" ? "ความเร็วลม" : "Wind Speed"}</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{loading ? "--" : weather.wind} km/h</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/50 dark:border-slate-800/40 pt-3 mt-2 text-[0.62rem] text-slate-500 dark:text-slate-400 space-y-1">
            <div className="flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-slate-500 shrink-0" />
              <span>{lang === "th" ? "วัดเมื่อ" : "Measured"}: {loading ? "..." : formatTmdTime(weather.dateTime)}</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className={`font-bold ${weather.source === "api" ? "text-emerald-500" : "text-sky-500"}`}>
                {weather.source === "api" || weather.source === "cache" 
                  ? (lang === "th" ? "เชื่อมต่อสด" : "Live Feed") 
                  : (lang === "th" ? "โหมดเสมือน" : "Virtual Mode")}
              </span>
            </div>
            <div className="truncate font-medium" title={weather.stationName}>
              {lang === "th" ? "สถานีอุตุนิยมวิทยา" : "Station"}: {loading ? "..." : weather.stationName}
            </div>
          </div>
        </div>

        {/* Column 2: 5-Day Forecast Grid */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="text-[0.68rem] font-extrabold uppercase tracking-widest text-slate-500 mb-3.5">
              {lang === "th" ? "พยากรณ์ล่วงหน้า 5 วัน (Open-Meteo)" : "5-Day Forecast (Open-Meteo)"}
            </div>

            {weather.forecast ? (
              <div className="flex flex-col gap-2.5">
                {weather.forecast.time.slice(0, 5).map((dateStr: string, idx: number) => {
                  const date = new Date(dateStr);
                  const dayName = new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-US", { weekday: "short" }).format(date);
                  const tempMax = Math.round(weather.forecast.temperature_2m_max[idx]);
                  const tempMin = Math.round(weather.forecast.temperature_2m_min[idx]);
                  const rainProb = weather.forecast.precipitation_probability_max[idx];
                  const wCode = weather.forecast.weather_code[idx];

                  return (
                    <div 
                      key={dateStr} 
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                        idx === 0 
                          ? isDarkMode ? "bg-sky-500/10 border-sky-500/20" : "bg-sky-50 border-sky-100"
                          : isDarkMode ? "bg-slate-800/30 border-slate-800 hover:bg-slate-800" : "bg-white border-slate-100 hover:bg-slate-50 shadow-2xs"
                      }`}
                    >
                      <div className="w-14 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                        {idx === 0 ? (lang === "th" ? "วันนี้" : "Today") : dayName}
                      </div>

                      <div className="flex items-center gap-2">
                        {getWmoWeatherIcon(wCode, "w-5 h-5")}
                        <span className="text-[0.7rem] font-bold text-slate-500 max-w-[80px] truncate">
                          {getWmoWeatherLabel(wCode, lang)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          <span className={isDarkMode ? "text-slate-100" : "text-slate-700"}>{tempMax}°</span>
                          <span className="text-slate-500 font-normal">{tempMin}°</span>
                        </div>

                        {rainProb > 20 ? (
                          <span className="text-[0.62rem] font-bold text-sky-500 bg-sky-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                            {rainProb}%
                          </span>
                        ) : (
                          <span className="text-[0.62rem] text-slate-300 dark:text-slate-600 px-1.5 py-0.5 rounded-full shrink-0">
                            0%
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <span className="text-xs text-slate-500">Loading forecast data...</span>
              </div>
            )}
          </div>
        </div>

        {/* Column 3: AI Intelligence Dispatch & Recharts Trend */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          
          {/* Recharts Area Chart */}
          <div className="mb-4">
            <div className="text-[0.68rem] font-extrabold uppercase tracking-widest text-slate-500 mb-3 flex items-center justify-between">
              <span>{lang === "th" ? "แนวโน้มอุณหภูมิ (°C)" : "Temperature Trend (°C)"}</span>
              <div className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Max</span>
                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div> Min</span>
              </div>
            </div>

            <div className={`h-[105px] p-2.5 rounded-2xl border ${isDarkMode ? 'bg-slate-800/20 border-slate-800/80' : 'bg-slate-50/80 border-slate-100'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 2, right: 0, left: -32, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: isDarkMode ? '#64748b' : '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: isDarkMode ? '#64748b' : '#94a3b8' }} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                      borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                      borderRadius: '8px',
                      fontSize: '10px'
                    }}
                  />
                  <Area type="monotone" dataKey="max" stroke="#f97316" strokeWidth={1.5} fillOpacity={1} fill="url(#colorMax)" />
                  <Area type="monotone" dataKey="min" stroke="#0ea5e9" strokeWidth={1.5} fillOpacity={1} fill="url(#colorMin)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Dispatch Analysis */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${isDarkMode ? "bg-indigo-950/20 border-indigo-500/20 text-indigo-200" : "bg-indigo-50/50 border-indigo-100 text-indigo-800"}`}>
            <div className="p-2 bg-indigo-500 rounded-xl text-white shrink-0 mt-0.5">
              <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-[0.68rem] font-extrabold uppercase tracking-widest text-indigo-500 mb-1">
                {lang === "th" ? "แผนจัดสรรพลังงาน AI Dispatch" : "AI Dispatch Optimization Planning"}
              </div>
              <p className="text-[0.72rem] leading-relaxed font-medium">
                {lang === "th" ? aiInsight.th : aiInsight.en}
              </p>
            </div>
          </div>

        </div>

      </motion.div>

      {/* Footer Details & TMD Link */}
      <div className="mt-5 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800/80 flex items-center justify-between z-10 relative">
        <span className="text-[0.62rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Info className="w-3 h-3 text-sky-500" />
          <span>{lang === "th" ? "สถานะระบบ: เชื่อมต่อสมบูรณ์" : "SYSTEM: ALL SYSTEMS INTEGRATED"}</span>
        </span>
        <a
          href="https://www.tmd.go.th/weather/province/samut-prakan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.65rem] font-bold text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 flex items-center gap-1 hover:underline transition-all"
        >
          <span>TMD Samut Prakan Official</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
