import React from 'react';
import { Award, Sparkles, Gauge, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { VINTAGE_BADGES, VintageBadge } from '../../../data/retroGamificationData';

interface RetroBadgeShowcaseProps {
  lang: 'th' | 'en';
  isDarkMode?: boolean;
}

export const RetroBadgeShowcase: React.FC<RetroBadgeShowcaseProps> = ({
  lang,
  isDarkMode = true
}) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-sky-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      case 'Award': return <Award className="w-5 h-5 text-emerald-400" />;
      default: return <Award className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-sm font-extrabold font-display uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{lang === 'th' ? 'เหรียญเกียรติยศ & ริบบิ้นวินเทจ (Vintage Ribbons)' : 'Vintage Ribbons & Certificates'}</span>
        </h4>
        <span className="text-xs text-slate-400 font-mono">
          {VINTAGE_BADGES.filter(b => b.unlocked).length} / {VINTAGE_BADGES.length} {lang === 'th' ? 'ปลดล็อกแล้ว' : 'Unlocked'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VINTAGE_BADGES.map((badge) => (
          <div
            key={badge.id}
            className={`p-4 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              badge.unlocked
                ? isDarkMode 
                  ? 'bg-slate-900/90 border-amber-500/30 shadow-lg shadow-black/20' 
                  : 'bg-white border-amber-200 shadow-md'
                : isDarkMode
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-50'
                  : 'bg-slate-100 border-slate-200 opacity-50'
            }`}
          >
            {/* Top Ribbon Visual Banner */}
            <div className={`h-2 -mx-4 -mt-4 bg-gradient-to-r ${badge.ribbonColor}`} />

            <div className="pt-3 flex items-start gap-3 mb-3">
              <div className={`p-2.5 rounded-2xl border ${
                badge.unlocked 
                  ? 'bg-slate-800 border-amber-500/30' 
                  : 'bg-slate-900 border-slate-800'
              }`}>
                {badge.unlocked ? renderIcon(badge.icon) : <Lock className="w-5 h-5 text-slate-500" />}
              </div>

              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-amber-400 font-bold block">
                  {lang === 'th' ? 'รางวัลเกียรติยศ' : 'Honor Award'}
                </span>
                <h5 className="text-xs font-black font-display leading-tight">
                  {lang === 'th' ? badge.nameTh : badge.nameEn}
                </h5>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              {lang === 'th' ? badge.descriptionTh : badge.descriptionEn}
            </p>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
              <span className={badge.unlocked ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-slate-500'}>
                {badge.unlocked ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{lang === 'th' ? 'ครอบครองแล้ว' : 'UNLOCKED'}</span>
                  </>
                ) : (
                  <span>{lang === 'th' ? 'ยังไม่ปลดล็อก' : 'LOCKED'}</span>
                )}
              </span>
              <span className="text-slate-500">1990s RETRO</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
