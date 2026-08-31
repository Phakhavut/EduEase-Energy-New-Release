import React, { useState, useEffect } from "react";
import { Lightbulb, Zap, Snowflake, Plug, Sun, BatteryCharging, Wind } from "lucide-react";
import { UserPersona, getPersonaConfig } from "../data/personaThemes";

const iconMap = {
  Snowflake,
  Plug,
  Sun,
  BatteryCharging,
  Wind,
  Zap,
  Lightbulb
};

export const EnergyTipWidget = ({
  activeHouse,
  isDarkMode,
  lang = "en",
  persona = "student"
}: {
  activeHouse?: any;
  isDarkMode?: boolean;
  lang?: string;
  persona?: UserPersona;
}) => {
  const [tip, setTip] = useState<{ title: string; content: string; icon: any }>({
    title: "Generating Tip...",
    content: "...",
    icon: Zap,
  });

  useEffect(() => {
    const config = getPersonaConfig(persona);
    const houseName = activeHouse?.name || config.defaultLocationNameTh;
    const tipsList = config.energyTips;
    
    // Choose tip dynamically or based on house
    const tipIndex = Math.abs(houseName.length) % tipsList.length;
    const selected = tipsList[tipIndex] || tipsList[0];
    
    const IconComponent = (iconMap as any)[selected.iconName] || Zap;

    setTip({
      title: lang === "th" ? selected.titleTh : selected.titleEn,
      content: lang === "th" 
        ? `${houseName}: ${selected.contentTh}`
        : `${houseName}: ${selected.contentEn}`,
      icon: IconComponent
    });
  }, [activeHouse, lang, persona]);

  const IconComponent = tip.icon;

  return (
    <div className="flex flex-col h-full relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
      
      <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl leading-tight text-slate-800 dark:text-white">
                {lang === "th" ? "เคล็ดลับพลังงาน" : "Energy Tip"}
              </h3>
              <p className="text-[0.75rem] uppercase tracking-widest text-emerald-500 font-bold">
                {lang === "th" ? "คำแนะนำที่นำไปใช้ได้" : "Actionable Advice"}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
            <Lightbulb className="w-4 h-4" />
          </div>
        </div>

        <div className={`flex-1 p-5 rounded-2xl border ${
          isDarkMode ? "bg-slate-800/50 border-slate-700/50" : "bg-slate-50 border-slate-200"
        }`}>
          <h4 className="font-bold text-base mb-3 text-slate-800 dark:text-slate-100 flex items-center gap-2">
            {tip.title}
          </h4>
          <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
            {tip.content}
          </p>
        </div>
        
        <div className="mt-5 flex justify-end">
          <button className="text-[0.8rem] font-bold uppercase tracking-wider text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1">
            {lang === "th" ? "ดูเคล็ดลับเพิ่มเติม" : "View More Tips"} <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
