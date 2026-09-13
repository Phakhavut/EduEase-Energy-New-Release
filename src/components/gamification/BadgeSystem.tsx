import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Trophy, 
  ShieldCheck, 
  Flame, 
  Snowflake, 
  Zap, 
  ZapOff, 
  Clock, 
  Sun, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  ChevronRight, 
  Share2, 
  Star, 
  Info, 
  X, 
  TrendingUp, 
  Leaf, 
  BatteryCharging,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Badge, AppPage, UserCertificationProgress, CertificationTier } from '../../types';
import { CERTIFICATION_TIERS } from '../../data/certificationData';

export interface EnergyAchievementBadge extends Badge {
  progress?: number;
  maxProgress?: number;
  energySavingKwh?: number;
  energySavingThb?: number;
  unlockedDate?: string;
  competencyTag?: string;
  tierRequirement?: number; // Related certification level (1 to 5)
}

export const DEFAULT_ENERGY_ACHIEVEMENTS: EnergyAchievementBadge[] = [
  {
    id: 'badge_ac_eco',
    name: 'ปรมาจารย์ประหยัดแอร์ 26°C',
    nameEn: 'AC Eco Master 26°C',
    description: 'เปิดแอร์ 26°C พร้อมพัดลมหมุนเวียนอากาศต่อเนื่อง 10 ครั้ง ลดโหลดคอมเพรสเซอร์ทันที 15%',
    descriptionEn: 'Ran AC at 26°C with circulation fan 10 times, saving 15% compressor work.',
    icon: 'Snowflake',
    unlocked: true,
    rarity: 'Rare',
    category: 'Cooling',
    progress: 10,
    maxProgress: 10,
    energySavingKwh: 36.5,
    energySavingThb: 153.3,
    unlockedDate: '2026-08-18',
    competencyTag: 'Thermal Balance',
    tierRequirement: 1
  },
  {
    id: 'badge_standby_zero',
    name: 'ผู้พิทักษ์ตัดไฟแฝง 0 Watt',
    nameEn: 'Zero Standby Power Hero',
    description: 'ถอดปลั๊กหรือปิดสวิตช์รางปลั๊กทีวี ไมโครเวฟ เครื่องต้มน้ำเมื่อไม่ใช้งาน กำจัดไฟแฝง 100%',
    descriptionEn: 'Unplugged idle appliances, cutting vampire standby load to absolute zero.',
    icon: 'ZapOff',
    unlocked: true,
    rarity: 'Common',
    category: 'Standby',
    progress: 7,
    maxProgress: 7,
    energySavingKwh: 22.0,
    energySavingThb: 92.4,
    unlockedDate: '2026-08-20',
    competencyTag: 'Phantom Load Cut',
    tierRequirement: 1
  },
  {
    id: 'badge_streak_3',
    name: 'นักออมไฟติดสปีด (7-Day Streak)',
    nameEn: '7-Day Energy Saver Streak',
    description: 'ตรวจวัดและบันทึกมาตรวัดพลังงานติดต่อกันครบ 7 วัน สร้างวินัยรักษ์พลังงานยั่งยืน',
    descriptionEn: 'Logged and audited energy usage for 7 consecutive days.',
    icon: 'Flame',
    unlocked: true,
    rarity: 'Common',
    category: 'Streak',
    progress: 7,
    maxProgress: 7,
    energySavingKwh: 18.2,
    energySavingThb: 76.4,
    unlockedDate: '2026-08-22',
    competencyTag: 'Continuous Audit',
    tierRequirement: 1
  },
  {
    id: 'badge_tou_ninja',
    name: 'นินจาอัตราค่าไฟ TOU (Off-Peak)',
    nameEn: 'TOU Tariff Shift Ninja',
    description: 'ย้ายการใช้งานเครื่องซักผ้าและเครื่องทำน้ำอุ่นไปช่วงหลัง 22:00 น. ค่าไฟถูกลงกว่า 40%',
    descriptionEn: 'Shifted heavy appliances to Off-Peak hours (>22:00), cutting rate by 40%.',
    icon: 'Clock',
    unlocked: true,
    rarity: 'Epic',
    category: 'Tariff',
    progress: 15,
    maxProgress: 15,
    energySavingKwh: 48.0,
    energySavingThb: 201.6,
    unlockedDate: '2026-08-25',
    competencyTag: 'Load Shifting',
    tierRequirement: 2
  },
  {
    id: 'badge_pf_optimizer',
    name: 'ผู้ควบคุมตัวประกอบกำลัง PF > 0.95',
    nameEn: 'Power Factor Champion',
    description: 'รักษาค่า Power Factor อุปกรณ์มอเตอร์และ Inverter สูงกว่า 0.95 ลดความร้อนสายส่ง',
    descriptionEn: 'Maintained inductive loads with PF > 0.95, reducing circuit thermal loss.',
    icon: 'Zap',
    unlocked: true,
    rarity: 'Rare',
    category: 'Power Quality',
    progress: 5,
    maxProgress: 5,
    energySavingKwh: 29.4,
    energySavingThb: 123.5,
    unlockedDate: '2026-08-28',
    competencyTag: 'Power Quality',
    tierRequirement: 2
  },
  {
    id: 'badge_budget_guardian',
    name: 'ผู้คุ้มครองงบประมาณพลังงาน',
    nameEn: 'Monthly Budget Guardian',
    description: 'รักษายอดค่าไฟฟ้าตลอดทั้งเดือนให้อยู่ในกรอบงบประมาณที่วางไว้ ไม่เกินเกณฑ์ 100%',
    descriptionEn: 'Kept monthly electricity expenses strictly within the assigned budget.',
    icon: 'ShieldCheck',
    unlocked: false,
    rarity: 'Epic',
    category: 'Budget',
    progress: 24,
    maxProgress: 30,
    energySavingKwh: 65.0,
    energySavingThb: 273.0,
    competencyTag: 'Expense Control',
    tierRequirement: 2
  },
  {
    id: 'badge_solar_pioneer',
    name: 'ผู้บุกเบิกโซลาร์รูฟท็อปสะอาด',
    nameEn: 'Solar Rooftop Clean Producer',
    description: 'เดินระบบ Solar PV ผลิตไฟใช้เองช่วงแดดจัด (Peak Sun Hours) ลดการพึ่งพากริิด',
    descriptionEn: 'Produced clean energy on-site during peak solar generation hours.',
    icon: 'Sun',
    unlocked: false,
    rarity: 'Legendary',
    category: 'Solar',
    progress: 3,
    maxProgress: 8,
    energySavingKwh: 120.0,
    energySavingThb: 504.0,
    competencyTag: 'Renewable Generation',
    tierRequirement: 3
  },
  {
    id: 'badge_tree_legend',
    name: 'ตำนานต้นไม้พลังงานคาร์บอนต่ำ',
    nameEn: 'World Energy Tree Legend',
    description: 'วิวัฒนาการต้นไม้พลังงาน EduEase จนผลิดอกออกผลระดับโอ๊กโบราณ ลดก๊าซเรือนกระจก',
    descriptionEn: 'Evolved the Energy Tree into ancient oak, maximizing carbon reduction.',
    icon: 'Leaf',
    unlocked: false,
    rarity: 'Legendary',
    category: 'Ecology',
    progress: 4,
    maxProgress: 5,
    energySavingKwh: 210.0,
    energySavingThb: 882.0,
    competencyTag: 'Decarbonization',
    tierRequirement: 3
  },
  {
    id: 'badge_panel_master',
    name: 'วิศวกรตู้ไฟ & ความปลอดภัย มอก.',
    nameEn: 'Distribution Panel & TIS Safety',
    description: 'จัดตู้ MDB/Consumer Unit, ทดสอบเบรกเกอร์กันดูด RCBO 30mA และตรวจค่ากราวด์ < 5Ω',
    descriptionEn: 'Inspected residential MDB panel, tested RCBO 30mA tripping, earth < 5Ω.',
    icon: 'Award',
    unlocked: false,
    rarity: 'Legendary',
    category: 'Safety',
    progress: 1,
    maxProgress: 4,
    energySavingKwh: 150.0,
    energySavingThb: 630.0,
    competencyTag: 'Electrical Safety',
    tierRequirement: 4
  }
];

export interface BadgeSystemProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  onNavigatePage?: (page: AppPage) => void;
  certProgress?: UserCertificationProgress;
  customBadges?: Badge[];
  activeTierLevel?: number; // 1 to 5 (defaults to 2 for preview if not passed)
  compactMode?: boolean;
}

export const BadgeSystem: React.FC<BadgeSystemProps> = ({
  lang,
  isDarkMode,
  onNavigatePage,
  certProgress,
  customBadges,
  activeTierLevel = 2,
  compactMode = false
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unlocked' | 'progress' | 'tiers'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectingBadge, setInspectingBadge] = useState<EnergyAchievementBadge | null>(null);
  const [inspectingTier, setInspectingTier] = useState<CertificationTier | null>(null);

  // Merge default achievements with any custom badges passed
  const achievements: EnergyAchievementBadge[] = React.useMemo(() => {
    if (!customBadges || customBadges.length === 0) {
      return DEFAULT_ENERGY_ACHIEVEMENTS;
    }
    // Blend unlocked states from customBadges
    return DEFAULT_ENERGY_ACHIEVEMENTS.map(item => {
      const match = customBadges.find(b => b.id === item.id);
      if (match) {
        return {
          ...item,
          unlocked: match.unlocked,
          name: match.name || item.name,
          nameEn: match.nameEn || item.nameEn,
          description: match.description || item.description,
          descriptionEn: match.descriptionEn || item.descriptionEn,
        };
      }
      return item;
    });
  }, [customBadges]);

  // Certification Tier calculations (1 to 5)
  const currentTierLevel = certProgress?.currentTier?.tierLevel || activeTierLevel;
  const currentTier = CERTIFICATION_TIERS.find(t => t.tierLevel === currentTierLevel) || CERTIFICATION_TIERS[1];
  const nextTier = CERTIFICATION_TIERS.find(t => t.tierLevel === currentTierLevel + 1) || null;

  // Compute progress toward next tier
  const completedLessons = certProgress?.completedCount ?? 6;
  const targetLessons = nextTier ? nextTier.requiredLessons : 22;
  const baseLessons = currentTier.requiredLessons;
  const tierProgressPercent = nextTier 
    ? Math.min(100, Math.max(10, Math.round(((completedLessons - baseLessons) / Math.max(1, targetLessons - baseLessons)) * 100)))
    : 100;

  // Unlocked metrics
  const unlockedBadges = achievements.filter(b => b.unlocked);
  const inProgressBadges = achievements.filter(b => !b.unlocked);
  const totalSavedKwh = unlockedBadges.reduce((acc, b) => acc + (b.energySavingKwh || 0), 0);
  const totalSavedThb = unlockedBadges.reduce((acc, b) => acc + (b.energySavingThb || 0), 0);

  // Filtered list
  const filteredBadges = achievements.filter(b => {
    if (selectedFilter === 'unlocked' && !b.unlocked) return false;
    if (selectedFilter === 'progress' && b.unlocked) return false;
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    return true;
  });

  const categories = ['all', ...Array.from(new Set(achievements.map(b => b.category)))];

  const triggerCelebration = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const renderBadgeIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'Snowflake': return <Snowflake className={className} />;
      case 'ZapOff': return <ZapOff className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Sun': return <Sun className={className} />;
      case 'Leaf': return <Leaf className={className} />;
      case 'Award': return <Award className={className} />;
      default: return <Trophy className={className} />;
    }
  };

  const getRarityBadgeStyle = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/30';
      case 'Epic':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/30';
      case 'Rare':
        return 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-blue-500/30';
      default:
        return 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div id="badge-system-hub" className="space-y-6">
      {/* 1. HERO CERTIFICATION ROADMAP (5-TIER CERTIFICATION WITH ANIMATED PROGRESS BARS) */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`p-6 sm:p-8 rounded-[2.5rem] border shadow-xl relative overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-800/95 to-slate-900 border-slate-700/80 text-white'
            : 'bg-gradient-to-br from-white via-amber-50/25 to-emerald-50/20 border-slate-200/90 text-slate-900 shadow-slate-200/40'
        }`}
      >
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Row: Title & Key Stats */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{lang === 'th' ? 'ระดับใบรับรองวิชาชีพ 5 ขั้น' : '5-Tier Energy Certification'}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{unlockedBadges.length}/{achievements.length} {lang === 'th' ? 'เหรียญเกียรติยศ' : 'Badges'}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>-{totalSavedKwh.toFixed(1)} kWh (฿{totalSavedThb.toFixed(0)})</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                {lang === 'th' ? 'ระบบเหรียญตราเกียรติยศและระดับการรับรองพลังงาน' : 'Energy Efficiency Badge & Certification System'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
                {lang === 'th'
                  ? 'ปลดล็อกเกียรติประวัติการประหยัดไฟตัวจริง ผ่านมาตรฐานความปลอดภัย การจัดการโหลด TOU และพัฒนาทักษะสู่ระดับ Grandmaster Fellow'
                  : 'Track and showcase verified energy efficiency milestones, load-shifting masteries, and advance through the 5-tier accredited roadmap.'}
              </p>
            </div>

            {/* Current Rank Badge Card */}
            <div className={`px-4 py-3 rounded-2xl border flex items-center gap-3.5 shrink-0 ${
              isDarkMode ? 'bg-slate-800/80 border-slate-700 shadow-md' : 'bg-white border-amber-200/80 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-2xl shadow-md shrink-0">
                {currentTier.icon}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono block">
                  {currentTier.sealLabel}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                  {lang === 'th' ? currentTier.titleTh : currentTier.titleEn}
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Tier {currentTier.tierLevel} of 5 Active
                </span>
              </div>
            </div>
          </div>

          {/* 2. THE 5-TIER PROGRESS STEPPER BAR (Animated Track & Milestone Nodes) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
              <span>{lang === 'th' ? 'แผนผังเลื่อนระดับการรับรอง (Certification Stepper)' : 'Certification Roadmap Milestones'}</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black">
                {lang === 'th' ? `ระดับปัจจุบัน: ขั้นที่ ${currentTier.tierLevel}` : `Current: Tier ${currentTier.tierLevel}`}
              </span>
            </div>

            {/* Connected Track Container */}
            <div className="relative pb-6 pt-2">
              {/* Background Connecting Line */}
              <div className="absolute top-7 left-6 right-6 h-2 rounded-full bg-slate-200 dark:bg-slate-700/80 -translate-y-1/2 z-0" />

              {/* Active Animated Gradient Filled Line */}
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${((currentTier.tierLevel - 1) / 4) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-7 left-6 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500 -translate-y-1/2 z-0 shadow-lg shadow-emerald-500/30"
              />

              {/* 5 Milestone Nodes */}
              <div className="relative z-10 grid grid-cols-5 gap-2">
                {CERTIFICATION_TIERS.map((tier) => {
                  const isCompleted = tier.tierLevel < currentTier.tierLevel;
                  const isCurrent = tier.tierLevel === currentTier.tierLevel;
                  const isLocked = tier.tierLevel > currentTier.tierLevel;

                  return (
                    <motion.div
                      key={tier.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setInspectingTier(tier)}
                      className="flex flex-col items-center text-center cursor-pointer group"
                    >
                      {/* Node Circle */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold transition-all shadow-md relative ${
                        isCompleted
                          ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20 shadow-emerald-500/30'
                          : isCurrent
                            ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white ring-4 ring-amber-500/40 shadow-amber-500/40 animate-pulse'
                            : isDarkMode
                              ? 'bg-slate-800 border-2 border-slate-700 text-slate-500'
                              : 'bg-white border-2 border-slate-200 text-slate-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        ) : isLocked ? (
                          <span className="opacity-50">{tier.icon}</span>
                        ) : (
                          <span>{tier.icon}</span>
                        )}

                        {/* Status Pin Badge */}
                        <div className="absolute -bottom-1 -right-1">
                          {isCompleted && (
                            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black shadow-sm">
                              ✓
                            </span>
                          )}
                          {isCurrent && (
                            <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[9px] font-black shadow-sm ring-1 ring-white">
                              ★
                            </span>
                          )}
                          {isLocked && (
                            <span className="w-4 h-4 rounded-full bg-slate-400 dark:bg-slate-600 text-white flex items-center justify-center text-[8px] font-black shadow-sm">
                              <Lock className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Tier Label */}
                      <div className="mt-2.5 space-y-0.5">
                        <span className={`text-[10px] sm:text-xs font-extrabold block truncate max-w-[70px] sm:max-w-[110px] ${
                          isCurrent
                            ? 'text-amber-600 dark:text-amber-400'
                            : isCompleted
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-slate-400'
                        }`}>
                          Tier {tier.tierLevel}
                        </span>
                        <span className="text-[9px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300 block truncate max-w-[70px] sm:max-w-[110px] hidden sm:block">
                          {lang === 'th' ? tier.roleTitleTh.split(' ')[0] : tier.roleTitleEn.split(' ')[0]}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 3. CURRENT TIER NEXT GOAL PROGRESS BAR */}
            {nextTier && (
              <div className={`mt-4 p-4 rounded-2xl border transition-all ${
                isDarkMode ? 'bg-slate-800/60 border-slate-700/70' : 'bg-amber-50/60 border-amber-200/60'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      {lang === 'th' 
                        ? `เป้าหมายสู่ขั้นที่ ${nextTier.tierLevel}: ${nextTier.titleTh}`
                        : `Next Milestone Tier ${nextTier.tierLevel}: ${nextTier.titleEn}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono font-bold">
                    <span className="text-slate-500 dark:text-slate-400">
                      {completedLessons} / {targetLessons} {lang === 'th' ? 'บทเรียน' : 'Lessons'}
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 font-black">
                      ({tierProgressPercent}%)
                    </span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tierProgressPercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 relative"
                  >
                    {/* Animated Shimmer Stripe */}
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)]" />
                  </motion.div>
                </div>

                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 text-xs">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {lang === 'th'
                      ? `ต้องการอีก ${Math.max(0, targetLessons - completedLessons)} บทเรียนเพื่อเลื่อนขั้นรับรอง`
                      : `${Math.max(0, targetLessons - completedLessons)} more lessons needed to rank up`}
                  </span>

                  {onNavigatePage && (
                    <button
                      onClick={() => onNavigatePage('learning')}
                      className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer text-xs"
                    >
                      <span>{lang === 'th' ? 'เรียนต่อเพื่อเลื่อนขั้น' : 'Advance Lessons'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 4. FILTER CHIPS & CATEGORY BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl border border-slate-300/50 dark:border-slate-700/50 flex-wrap">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {lang === 'th' ? `ทั้งหมด (${achievements.length})` : `All (${achievements.length})`}
          </button>
          <button
            onClick={() => setSelectedFilter('unlocked')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'unlocked'
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? `ปลดล็อกแล้ว (${unlockedBadges.length})` : `Unlocked (${unlockedBadges.length})`}</span>
          </button>
          <button
            onClick={() => setSelectedFilter('progress')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
              selectedFilter === 'progress'
                ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? `กำลังท้าทาย (${inProgressBadges.length})` : `In Progress (${inProgressBadges.length})`}</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold shrink-0 transition-all cursor-pointer capitalize ${
                selectedCategory === cat
                  ? isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-900 text-white shadow-sm'
                  : isDarkMode ? 'bg-slate-800/70 text-slate-400 hover:bg-slate-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? (lang === 'th' ? 'ทุกหมวดหมู่' : 'All Categories') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 5. ACHIEVEMENTS BADGE GRID (With Animations, Tier Seals & Progress Bars) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredBadges.map((badge, index) => {
            const isUnlocked = badge.unlocked;
            const progress = badge.progress ?? 0;
            const maxProgress = badge.maxProgress ?? 1;
            const progressPct = Math.min(100, Math.round((progress / maxProgress) * 100));

            return (
              <motion.div
                key={badge.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setInspectingBadge(badge)}
                className={`p-5 rounded-[2rem] border transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between ${
                  isUnlocked
                    ? isDarkMode
                      ? 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-400/60 shadow-lg shadow-emerald-950/20'
                      : 'bg-white border-emerald-200 hover:border-emerald-300 shadow-md shadow-emerald-500/5'
                    : isDarkMode
                      ? 'bg-slate-900/40 border-slate-800/80 opacity-75 hover:opacity-100'
                      : 'bg-slate-50 border-slate-200/80 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Background Unlocked Aura Accent */}
                {isUnlocked && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
                )}

                <div>
                  {/* Card Top: Icon, Rarity & Tier Stamp */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className={`w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0 relative transition-transform group-hover:scale-105 ${
                      isUnlocked
                        ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/30'
                        : isDarkMode
                          ? 'bg-slate-800 text-slate-500'
                          : 'bg-slate-200 text-slate-400'
                    }`}>
                      {renderBadgeIcon(badge.icon, 'w-6 h-6')}

                      {/* Unlocked / Lock Mini Indicator */}
                      <div className="absolute -bottom-1 -right-1">
                        {isUnlocked ? (
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shadow-md border-2 border-white dark:border-slate-900">
                            ✓
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-slate-500 text-white flex items-center justify-center text-[9px] font-black shadow-md border-2 border-white dark:border-slate-900">
                            <Lock className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs ${getRarityBadgeStyle(badge.rarity)}`}>
                        {badge.rarity}
                      </span>
                      {badge.tierRequirement && (
                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                          Tier {badge.tierRequirement}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white font-display group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {lang === 'th' ? badge.name : badge.nameEn}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                      {lang === 'th' ? badge.description : badge.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Progress Bar or Energy Savings Pill */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                        <Leaf className="w-3.5 h-3.5" />
                        <span>-{badge.energySavingKwh} kWh/mo</span>
                      </div>
                      <span className="text-[11px] font-extrabold text-slate-400 font-mono">
                        {badge.unlockedDate || 'Verified'}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-500 dark:text-slate-400">
                          {lang === 'th' ? 'ความคืบหน้า' : 'Progress'}
                        </span>
                        <span className="font-mono text-amber-600 dark:text-amber-400 font-black">
                          {progress} / {maxProgress} ({progressPct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPct}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Competency Tag */}
                  {badge.competencyTag && (
                    <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      <span>{badge.category}</span>
                      <span className="font-mono">#{badge.competencyTag}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 6. INTERACTIVE BADGE DETAIL INSPECT MODAL */}
      <AnimatePresence>
        {inspectingBadge && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
            onClick={() => setInspectingBadge(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md p-6 sm:p-8 rounded-[2.5rem] border shadow-2xl relative overflow-hidden space-y-6 ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-700 text-white' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectingBadge(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge Visual Icon & Seal */}
              <div className="text-center space-y-3 pt-2">
                <motion.div
                  initial={{ rotate: -15, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-4xl shadow-xl relative ${
                    inspectingBadge.unlocked
                      ? 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-sky-500 text-white shadow-emerald-500/30 ring-4 ring-emerald-400/20'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {renderBadgeIcon(inspectingBadge.icon, 'w-12 h-12')}
                  {inspectingBadge.unlocked && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-2 border-2 border-dashed border-emerald-400/40 rounded-[28px] pointer-events-none"
                    />
                  )}
                </motion.div>

                <div>
                  <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${getRarityBadgeStyle(inspectingBadge.rarity)}`}>
                    {inspectingBadge.rarity} Badge
                  </span>
                  <h3 className="text-xl font-black font-display text-slate-900 dark:text-white mt-2">
                    {lang === 'th' ? inspectingBadge.name : inspectingBadge.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto font-medium">
                    {lang === 'th' ? inspectingBadge.description : inspectingBadge.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Energy Impact & Progress Metrics */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDarkMode ? 'bg-slate-800/70 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'ผลลัพธ์ประหยัดพลังงาน' : 'Energy Savings Impact'}
                  </span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black">
                    ~{inspectingBadge.energySavingKwh} kWh / {lang === 'th' ? 'เดือน' : 'mo'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'ประหยัดค่าไฟฟ้าเฉลี่ย' : 'Cost Savings (Avg)'}
                  </span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black">
                    ~฿{inspectingBadge.energySavingThb?.toFixed(0)} / {lang === 'th' ? 'เดือน' : 'mo'}
                  </span>
                </div>

                {inspectingBadge.competencyTag && (
                  <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                    <span className="text-slate-500 dark:text-slate-400">
                      {lang === 'th' ? 'ทักษะสมรรถนะ' : 'Certified Competency'}
                    </span>
                    <span className="font-mono text-sky-600 dark:text-sky-400">
                      {inspectingBadge.competencyTag}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {inspectingBadge.unlocked ? (
                  <button
                    onClick={triggerCelebration}
                    className="flex-1 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'th' ? 'ฉลองความสำเร็จ! 🎊' : 'Celebrate Achievement! 🎊'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setInspectingBadge(null);
                      if (onNavigatePage) onNavigatePage('learning');
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <GraduationCap className="w-4 h-4 text-slate-950" />
                    <span>{lang === 'th' ? 'เรียนรู้เพื่อปลดล็อกเหรียญนี้' : 'Learn to Unlock Badge'}</span>
                  </button>
                )}

                <button
                  onClick={() => setInspectingBadge(null)}
                  className="py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {lang === 'th' ? 'ปิด' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. INTERACTIVE TIER DETAIL MODAL (5-Tier Level Deep Dive) */}
      <AnimatePresence>
        {inspectingTier && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
            onClick={() => setInspectingTier(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg p-6 sm:p-8 rounded-[2.5rem] border shadow-2xl relative overflow-hidden space-y-5 ${
                isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectingTier(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-3xl shadow-lg shrink-0">
                  {inspectingTier.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 font-mono block">
                    {inspectingTier.sealLabel}
                  </span>
                  <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                    {lang === 'th' ? inspectingTier.titleTh : inspectingTier.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {lang === 'th' ? `ต้องการอย่างน้อย ${inspectingTier.requiredLessons} บทเรียน` : `Requires ${inspectingTier.requiredLessons} completed lessons`}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {lang === 'th' ? inspectingTier.summaryTh : inspectingTier.summaryEn}
              </p>

              {/* Key Competencies List */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {lang === 'th' ? 'สมรรถนะสำคัญประจำระดับ' : 'Core Competencies'}
                </h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {(lang === 'th' ? inspectingTier.keyCompetenciesTh : inspectingTier.keyCompetenciesEn).map((comp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authorized Scopes */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {lang === 'th' ? 'ขอบเขตการปฏิบัติงานรับรอง' : 'Authorized Scopes'}
                </h4>
                <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                  {(lang === 'th' ? inspectingTier.authorizedScopesTh : inspectingTier.authorizedScopesEn).map((scope, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                      <span>{scope}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                {onNavigatePage && (
                  <button
                    onClick={() => {
                      setInspectingTier(null);
                      onNavigatePage('learning');
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>{lang === 'th' ? 'เปิดสถาบันการเรียนรู้' : 'Open Learning Academy'}</span>
                  </button>
                )}
                <button
                  onClick={() => setInspectingTier(null)}
                  className="py-3 px-5 rounded-2xl border border-slate-300 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {lang === 'th' ? 'ปิด' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
