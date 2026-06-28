import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Lightbulb, Zap, Snowflake, Plug, Sun, BatteryCharging } from "lucide-react";

export const EnergyTipWidget = ({
  activeHouse,
  isDarkMode,
  lang = "en"
}: {
  activeHouse?: any;
  isDarkMode?: boolean;
  lang?: string;
}) => {
  const [tip, setTip] = useState<{ title: string; content: string; icon: any }>({
    title: "Generating Tip...",
    content: "...",
    icon: Zap,
  });

  useEffect(() => {
    const houseName = activeHouse?.name || "Your property";
    
    const possibleTips = [
      {
        title: lang === "th" ? "ปรับแต่งการใช้แอร์" : "Optimize HVAC Usage",
        content: lang === "th" ? `เราสังเกตเห็นว่า ${houseName} มีการใช้ระบบทำความเย็นในช่วงที่มีความต้องการใช้ไฟฟ้าสูงสุด ลองเปลี่ยนไปใช้งานหนักในช่วงเวลาที่มีความต้องการใช้ไฟฟ้าต่ำเพื่อประหยัดการบริโภครายวันได้สูงสุดถึง 15%` : `We noticed ${houseName} has been running cooling systems during peak hours. Try shifting heavy cooling to off-peak hours to save up to 15% on daily consumption.`,
        icon: Snowflake
      },
      {
        title: lang === "th" ? "การแจ้งเตือนไฟรั่วไหล" : "Phantom Load Alert",
        content: lang === "th" ? `อุปกรณ์หลายชิ้นที่ ${houseName} กำลังดึงพลังงานอย่างต่อเนื่อง ใช้คุณสมบัติ Eco-Standby ในการควบคุมด้วย AI เพื่อตัดไฟอัตโนมัติสำหรับอุปกรณ์ที่ไม่มีการใช้งาน` : `Several standby devices in ${houseName} are drawing power continuously. Utilize the Eco-Standby feature in the AI controls to automatically cut power to idle electronics.`,
        icon: Plug
      },
      {
        title: lang === "th" ? "แสงธรรมชาติ" : "Natural Lighting",
        content: lang === "th" ? `สภาพอากาศปัจจุบันบ่งบอกว่า ${houseName} มีแสงแดดธรรมชาติที่ดีเยี่ยม พิจารณาเปิดม่านและปิดแสงสว่างจากหลอดไฟในห้องที่หันหน้าไปทางทิศใต้` : `Current weather suggests excellent natural sunlight for ${houseName}. Consider opening blinds and turning off artificial lighting in south-facing rooms.`,
        icon: Sun
      },
      {
        title: lang === "th" ? "ปรับแต่งตัวประกอบกำลัง" : "Power Factor Tuning",
        content: lang === "th" ? `ตรวจพบการเหนี่ยวนำสูงใน ${houseName} เปิดใช้งานการปรับแต่งตัวประกอบกำลังด้วย AI เพื่อแก้ไขการสูญเสียประสิทธิภาพ` : `Heavy inductive loads detected in ${houseName}. Enable AI Power Factor Tuning to correct efficiency losses and avoid grid penalties.`,
        icon: BatteryCharging
      }
    ];

    const tipIndex = houseName.length % possibleTips.length;
    setTip(possibleTips[tipIndex]);
  }, [activeHouse, lang]);

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
              <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">
                {lang === "th" ? "คำแนะนำที่นำไปใช้ได้" : "Actionable Advice"}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <Lightbulb className="w-4 h-4" />
          </div>
        </div>

        <div className={`flex-1 p-5 rounded-2xl border ${
          isDarkMode ? "bg-slate-800/50 border-slate-700/50" : "bg-slate-50 border-slate-200"
        }`}>
          <h4 className="font-bold text-base mb-3 text-slate-800 dark:text-slate-100 flex items-center gap-2">
            {tip.title}
          </h4>
          <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            {tip.content}
          </p>
        </div>
        
        <div className="mt-5 flex justify-end">
          <button className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1">
            {lang === "th" ? "ดูเคล็ดลับเพิ่มเติม" : "View More Tips"} <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
