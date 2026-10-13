import React from 'react';
import { Users, GraduationCap, Code2, Sparkles, ShieldCheck } from 'lucide-react';

export interface ProjectCreditsFooterProps {
  lang?: 'th' | 'en';
  isDarkMode?: boolean;
  className?: string;
  variant?: 'full' | 'compact';
}

export const PROJECT_TEAM_MEMBERS = [
  { 
    id: '01', 
    name: 'นายธนพัต สุวศิน', 
    roleTh: 'ผู้พัฒนาโครงการ', 
    roleEn: 'Project Developer',
    accentColor: '#2563EB',
    accentLight: '#EFF6FF',
    accentDark: '#60A5FA',
    accentTag: 'System & Architecture'
  },
  { 
    id: '02', 
    name: 'นายภควุฒิ สหพงษ์', 
    roleTh: 'ผู้พัฒนาโครงการ', 
    roleEn: 'Project Developer',
    accentColor: '#10B981',
    accentLight: '#ECFDF5',
    accentDark: '#34D399',
    accentTag: 'Energy Efficiency Core'
  },
  { 
    id: '03', 
    name: 'นายภูรินท์ ทรงเมตตา', 
    roleTh: 'ผู้พัฒนาโครงการ', 
    roleEn: 'Project Developer',
    accentColor: '#F59E0B',
    accentLight: '#FFFBEB',
    accentDark: '#FBBF24',
    accentTag: 'Power & Analytics'
  },
  { 
    id: '04', 
    name: 'นายพัสกร ธรรมาวุฒิกุล', 
    roleTh: 'ผู้พัฒนาโครงการ', 
    roleEn: 'Project Developer',
    accentColor: '#38BDF8',
    accentLight: '#F0F9FF',
    accentDark: '#7DD3FC',
    accentTag: 'Smart Nodes & IoT'
  },
  { 
    id: '05', 
    name: 'นายไชยวัฒน์ กรุดนิ่ม', 
    roleTh: 'ผู้พัฒนาโครงการ', 
    roleEn: 'Project Developer',
    accentColor: '#059669',
    accentLight: '#ECFDF5',
    accentDark: '#6EE7B7',
    accentTag: 'Carbon & Quests'
  },
  { 
    id: '06', 
    name: 'นายชรินทร์โชติ เจนนานาโชค', 
    roleTh: 'ผู้พัฒนาโครงการ', 
    roleEn: 'Project Developer',
    accentColor: '#D97706',
    accentLight: '#FEF3C7',
    accentDark: '#FCD34D',
    accentTag: 'UI/UX & Education'
  },
];

export const ProjectCreditsFooter: React.FC<ProjectCreditsFooterProps> = ({
  lang = 'th',
  isDarkMode = true,
  className = '',
  variant = 'full',
}) => {
  return (
    <footer
      aria-label="Project Credits Footer"
      className={`mt-12 pt-8 pb-10 border-t transition-colors ${
        isDarkMode
          ? 'border-white/10 text-slate-300'
          : 'border-slate-200 text-slate-700'
      } ${className}`}
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                isDarkMode
                  ? 'bg-[#2563EB]/15 border-blue-500/30 text-[#38BDF8]'
                  : 'bg-blue-50 border-blue-200 text-[#1D4ED8]'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                    isDarkMode
                      ? 'bg-[#2563EB]/15 text-[#38BDF8] border border-blue-500/30'
                      : 'bg-blue-50 text-[#1D4ED8] border border-blue-200'
                  }`}
                >
                  {lang === 'th' ? 'คณะผู้จัดทำ' : 'Project Credits'}
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {PROJECT_TEAM_MEMBERS.length} {lang === 'th' ? 'คน' : 'Members'}
                </span>
              </div>
              <h4
                className={`text-sm sm:text-base font-extrabold tracking-tight mt-0.5 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                {lang === 'th'
                  ? 'ทีมพัฒนาและจัดทำโครงการ EduEase Energy'
                  : 'EduEase Energy Development Team'}
              </h4>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border ${
              isDarkMode
                ? 'bg-[#0B132B] border-[#1E2E5D] text-slate-300'
                : 'bg-white border-slate-200 text-slate-600 shadow-sm'
            }`}
          >
            <Code2 className="w-4 h-4 text-[#38BDF8]" />
            <span>Smart Energy System Dev Team</span>
          </div>
        </div>

        {/* Members Grid with Soft Harmonious Accents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROJECT_TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className={`group p-3 sm:p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                isDarkMode
                  ? 'bg-[#0B132B] hover:bg-[#101B3B] border-[#1E2E5D]/80 hover:border-blue-500/40 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Index Badge with Member's Soft Accent */}
                <div
                  style={{
                    backgroundColor: isDarkMode ? `${member.accentColor}20` : member.accentLight,
                    color: isDarkMode ? member.accentDark : member.accentColor,
                    borderColor: isDarkMode ? `${member.accentColor}35` : `${member.accentColor}30`,
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 border transition-transform group-hover:scale-105"
                >
                  {member.id}
                </div>

                {/* Name & Role */}
                <div className="truncate">
                  <p
                    className={`text-xs sm:text-sm font-bold tracking-tight truncate transition-colors ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {member.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <span 
                      className="w-1.5 h-1.5 rounded-full shrink-0" 
                      style={{ backgroundColor: member.accentColor }}
                    />
                    <span className="truncate">{lang === 'th' ? member.roleTh : member.roleEn}</span>
                  </p>
                </div>
              </div>

              <div 
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                style={{ color: member.accentColor }}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Subtext & Copyright */}
        <div
          className={`mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-[11px] ${
            isDarkMode
              ? 'border-white/5 text-slate-400'
              : 'border-slate-200 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>
              {lang === 'th'
                ? 'EduEase Energy • แพลตฟอร์มบริหารจัดการและประหยัดพลังงานอัจฉริยะ'
                : 'EduEase Energy • Smart Energy Management & Analytics Platform'}
            </span>
          </div>
          <div>
            <span>
              {lang === 'th'
                ? 'จัดทำโดยคณะผู้พัฒนาโครงการ © 2026'
                : 'Developed by the Project Team © 2026'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
