import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sun, 
  Cloud, 
  CloudSun, 
  CloudRain, 
  CloudDrizzle, 
  CloudLightning, 
  CloudFog, 
  Snowflake, 
  MapPin, 
  RefreshCw, 
  Navigation,
  Thermometer, 
  Droplets,
  AlertCircle
} from 'lucide-react';
import { adjustColorLegibility } from '../utils/colorAdjuster';

interface WeatherForecastWidgetProps {
  lang: 'th' | 'en';
  isDarkMode?: boolean;
}

interface ForecastDay {
  date: string;
  dayName: string;
  dayNameTh: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  humidity: number;
  conditionEn: string;
  conditionTh: string;
}

interface WeatherState {
  lat: number;
  lon: number;
  locationName: string;
  locationNameTh: string;
  forecast: ForecastDay[];
  loading: boolean;
  error: string | null;
}

export const WeatherForecastWidget: React.FC<WeatherForecastWidgetProps> = ({ lang, isDarkMode = false }) => {
  const [state, setState] = useState<WeatherState>({
    lat: 13.7563, // Default Bangkok Lat
    lon: 100.5018, // Default Bangkok Lon
    locationName: 'Bangkok (Default)',
    locationNameTh: 'กรุงเทพมหานคร (ค่าเริ่มต้น)',
    forecast: [],
    loading: false,
    error: null,
  });

  const [geolocationDenied, setGeolocationDenied] = useState<boolean>(false);

  // Translate weather codes to readable text and high-contrast Lucide icons
  const getWeatherDetails = (code: number) => {
    switch (code) {
      case 0:
        return {
          icon: Sun,
          color: '#f59e0b', // Amber-500
          textEn: 'Clear Sky',
          textTh: 'ท้องฟ้าแจ่มใส',
        };
      case 1:
      case 2:
        return {
          icon: CloudSun,
          color: '#38bdf8', // Sky-400
          textEn: 'Partly Cloudy',
          textTh: 'มีเมฆบางส่วน',
        };
      case 3:
        return {
          icon: Cloud,
          color: '#94a3b8', // Slate-400
          textEn: 'Overcast',
          textTh: 'ครึ้มฟ้าครึ้มฝน',
        };
      case 45:
      case 48:
        return {
          icon: CloudFog,
          color: '#a1a1aa', // Zinc-400
          textEn: 'Foggy',
          textTh: 'มีหมอกหนา',
        };
      case 51:
      case 53:
      case 55:
        return {
          icon: CloudDrizzle,
          color: '#60a5fa', // Blue-400
          textEn: 'Drizzle',
          textTh: 'ฝนตกปรอยๆ',
        };
      case 61:
      case 63:
      case 65:
        return {
          icon: CloudRain,
          color: '#2563eb', // Blue-600
          textEn: 'Moderate Rain',
          textTh: 'ฝนตกปานกลาง',
        };
      case 80:
      case 81:
      case 82:
        return {
          icon: CloudRain,
          color: '#1d4ed8', // Blue-700
          textEn: 'Heavy Showers',
          textTh: 'ฝนตกหนัก',
        };
      case 95:
      case 96:
      case 99:
        return {
          icon: CloudLightning,
          color: '#e11d48', // Rose-600
          textEn: 'Thunderstorm',
          textTh: 'พายุฝนฟ้าคะนอง',
        };
      default:
        return {
          icon: Cloud,
          color: '#64748b', // Slate-500
          textEn: 'Cloudy',
          textTh: 'มีเมฆมาก',
        };
    }
  };

  const getDayName = (dateStr: string, locale: 'en' | 'th') => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    if (locale === 'th') {
      const daysTh = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
      return daysTh[d.getDay()];
    } else {
      const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return daysEn[d.getDay()];
    }
  };

  // Fetch weather forecast using open-meteo API
  const fetchForecast = async (lat: number, lon: number, isGeo: boolean = false) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,relative_humidity_2m_max&timezone=auto`
      );
      if (!response.ok) {
        throw new Error('Failed to retrieve forecast data from weather service');
      }

      const data = await response.json();
      if (!data.daily) {
        throw new Error('Invalid format returned by weather service');
      }

      const forecastList: ForecastDay[] = [];
      const times = data.daily.time || [];
      const maxTemps = data.daily.temperature_2m_max || [];
      const minTemps = data.daily.temperature_2m_min || [];
      const codes = data.daily.weathercode || [];
      const humidities = data.daily.relative_humidity_2m_max || [];

      // Generate 5 days of data
      for (let i = 0; i < Math.min(5, times.length); i++) {
        const details = getWeatherDetails(codes[i]);
        forecastList.push({
          date: times[i],
          dayName: getDayName(times[i], 'en'),
          dayNameTh: getDayName(times[i], 'th'),
          tempMax: Math.round(maxTemps[i]),
          tempMin: Math.round(minTemps[i]),
          weatherCode: codes[i],
          humidity: Math.round(humidities[i] || 65),
          conditionEn: details.textEn,
          conditionTh: details.textTh,
        });
      }

      setState(prev => ({
        ...prev,
        lat,
        lon,
        locationName: isGeo ? 'Current Geolocation' : 'Bangkok (Default)',
        locationNameTh: isGeo ? 'พิกัดปัจจุบันของคุณ' : 'กรุงเทพมหานคร (ค่าเริ่มต้น)',
        forecast: forecastList,
        loading: false,
      }));
    } catch (err: any) {
      console.error(err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: lang === 'th' 
          ? 'ไม่สามารถเชื่อมต่อข้อมูลสภาพอากาศได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง' 
          : 'Could not establish connection to the weather service. Please retry.',
      }));
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: lang === 'th'
          ? 'เบราว์เซอร์ของคุณไม่รองรับการระบุพิกัดตำแหน่งทางภูมิศาสตร์'
          : 'Geolocation API is not supported by your current browser environment.',
      }));
      // Fallback
      fetchForecast(state.lat, state.lon, false);
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeolocationDenied(false);
        fetchForecast(latitude, longitude, true);
      },
      (error) => {
        console.warn('Geolocation access error/denied:', error);
        setGeolocationDenied(true);
        // Fallback to Bangkok
        fetchForecast(13.7563, 100.5018, false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Initial load
  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-transparent">
      {/* Header controls bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-5 pb-4 border-b border-dashed border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold font-display text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-sky-500" />
            <span>
              {lang === 'th' 
                ? 'พยากรณ์อากาศ 5 วันเพื่อวางแผนใช้ไฟฟ้า' 
                : '5-Day Solar & Grid Planning Forecast'}
            </span>
          </h4>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
            {lang === 'th'
              ? `ตรวจวิเคราะห์อุณหภูมิและความชื้น ณ ${state.locationNameTh} เพื่อลดโหลดเครื่องทำความเย็น`
              : `Analyzing thermal & solar indices at ${state.locationName} to preempt cooling baseload surges.`}
          </p>
        </div>

        <div className="flex gap-2">
          {geolocationDenied && (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[8.5px] font-mono font-bold">
              <AlertCircle className="w-3 h-3" />
              <span>{lang === 'th' ? 'จำกัดสิทธิ์ระบุตำแหน่ง' : 'Using Fallback Location'}</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={state.loading}
            className="px-3 py-1.5 text-[10px] font-bold font-display rounded-xl tracking-tight bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${state.loading ? 'animate-spin text-sky-500' : ''}`} />
            <span>{lang === 'th' ? 'ระบุตำแหน่งของฉัน' : 'Locate Me'}</span>
          </button>
        </div>
      </div>

      {state.error && (
        <div className="p-3.5 mb-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-600 dark:text-rose-500 text-[10.5px] font-semibold flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Grid container for 5-day weather cards */}
      {state.loading && state.forecast.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xs font-bold text-slate-500 dark:text-sky-400 animate-pulse text-center">
            {lang === 'th' 
              ? 'กำลังค้นหาพิกัดและวิเคราะห์สภาพอากาศสะสม...' 
              : 'Acquiring satellite meteorology profiles...'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {state.forecast.map((day, index) => {
            const weather = getWeatherDetails(day.weatherCode);
            const WeatherIcon = weather.icon;
            
            // Adjust label colors to WCAG standard using our utility
            const adjustedColor = adjustColorLegibility(weather.color, isDarkMode);

            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="p-4 rounded-2.5xl bg-slate-50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-850/40 hover:border-sky-500/30 dark:hover:border-sky-500/20 transition-all duration-300 flex flex-col justify-between items-center text-center relative overflow-hidden"
              >
                {/* Micro badge for active day */}
                {index === 0 && (
                  <span className="absolute top-1.5 right-2 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[7px] font-black uppercase tracking-widest leading-none border border-emerald-500/20">
                    {lang === 'th' ? 'วันนี้' : 'Today'}
                  </span>
                )}

                {/* Day name */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono block">
                    {lang === 'th' ? day.dayNameTh : day.dayName}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                    {day.date.split('-').slice(1).reverse().join('/')}
                  </span>
                </div>

                {/* Weather Vector Icon */}
                <div className="my-4.5 p-3 rounded-2xl bg-white dark:bg-slate-900/50 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                  <WeatherIcon 
                    className="w-7 h-7" 
                    style={{ color: adjustedColor, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))' }} 
                  />
                </div>

                {/* Conditions & Temperature details */}
                <div className="w-full">
                  <span className="text-[10px] font-black text-slate-700 dark:text-slate-350 line-clamp-1">
                    {lang === 'th' ? day.conditionTh : day.conditionEn}
                  </span>

                  {/* Temperatures */}
                  <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-0.5">
                      <Thermometer className="w-3 h-3 text-rose-500" />
                      {day.tempMax}°
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5">
                      {day.tempMin}°
                    </span>
                  </div>

                  {/* Humidity info */}
                  <div className="flex items-center justify-center gap-1 mt-1.5 text-[9px] font-semibold text-slate-400">
                    <Droplets className="w-2.5 h-2.5 text-sky-400" />
                    <span>{day.humidity}% RH</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Grid load implications bottom alert */}
      {state.forecast.length > 0 && (
        <div className="mt-5 p-3.5 rounded-2xl bg-sky-500/5 dark:bg-sky-500/5 border border-sky-500/10 flex items-start gap-3">
          <Navigation className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
          <p className="text-[10.5px] leading-relaxed text-slate-650 dark:text-slate-300">
            {lang === 'th'
              ? `ข้อแนะนำระบบกริดอัจฉริยะ: ช่วง ${state.forecast[0]?.tempMax > 30 ? 'อากาศร้อนอบอ้าวหลัก' : 'อากาศเย็นสบาย'} ตลอดวันข้างหน้า แนะนำให้เซฟอุณหภูมิควบคุมแอร์แบบแปรผันตามโซน และสลับแบตเตอรี่สำรองเพื่อประหยัดสูงสุด`
              : `Smart Grid Dispatch Note: Foreseeing ${state.forecast[0]?.tempMax > 30 ? 'sustained heat spikes' : 'moderate cooling baseloads'} in the coming days. Scale thermal ventilation reserves and dynamic battery offsets to prevent peak tariff triggers.`}
          </p>
        </div>
      )}
    </div>
  );
};
