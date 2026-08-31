import React, { useState, useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  Zap, 
  Sparkles, 
  Play, 
  CheckCircle, 
  Clock, 
  Calculator, 
  Gamepad2, 
  Target,
  BrainCircuit,
  Gauge,
  Stamp,
  Swords,
  Snowflake,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkle,
  Award,
  Sliders,
  Compass,
  ArrowRight,
  Check,
  RotateCw,
  FolderOpen,
  ShieldCheck,
  Filter,
  Tag,
  Hammer,
  SunMedium,
  Activity,
  Lightbulb,
  ShieldAlert,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { LearningPath, Lesson, GlossaryTerm, InfoDetailMode, SkillTreeNode, LearningQuest, LessonDifficulty } from '../../types';
import { SkillTree } from '../gamification/SkillTree';
import { MiniGamesHub } from '../gamification/MiniGamesHub';
import { FullScreenLearningExperience } from '../learning/FullScreenLearningExperience';
import { INITIAL_SKILL_TREE_NODES, INITIAL_LEARNING_QUESTS } from '../../data/gamificationData';
import { MemoryMatchGame } from '../game/retro/MemoryMatchGame';
import { AnalogMeterSimulator } from '../game/retro/AnalogMeterSimulator';
import { RetroTriviaQuiz } from '../game/retro/RetroTriviaQuiz';
import { HabitStampCard } from '../game/retro/HabitStampCard';
import { VisualMnemonicCard } from '../game/retro/VisualMnemonicCard';
import { RetroBadgeShowcase } from '../game/retro/RetroBadgeShowcase';
import { MnemonicCarousel } from '../game/retro/MnemonicCarousel';
import { VISUAL_MNEMONICS } from '../../data/retroGamificationData';
import { OfficialReferencesDirectory } from '../trust/OfficialReferencesDirectory';
import { CertificationProgressTracker } from '../learning/CertificationProgressTracker';
import { calculateCertificationProgress } from '../../data/certificationData';
import { LevelUpCelebrationModal } from '../learning/LevelUpCelebrationModal';
import { OfficialCertificateModal } from '../learning/OfficialCertificateModal';
import { CertificationTier } from '../../types';

export type MainCategoryTab = 'memory_games' | 'learning_modules' | 'simulators';

export type SubMenuId = 
  // Memory & Retro Games
  | 'matching'
  | 'lab'
  | 'carousel'
  | 'quiz'
  | 'speed'
  | 'stamps'
  | 'badges'
  // Learning Modules
  | 'certification'
  | 'courses'
  | 'guide'
  | 'tree'
  | 'quests'
  | 'references'
  // Simulators
  | 'watt_calc'
  | 'ac_sim';

interface LearningViewProps {
  learningPaths: LearningPath[];
  glossaryTerms: GlossaryTerm[];
  onCompleteLesson: (lessonId: string, xp: number) => void;
  onRestartOnboarding: () => void;
  isDarkMode: boolean;
  lang: 'th' | 'en';
  infoDetailMode: InfoDetailMode;
  onStartPageTour?: (stepIndex: number) => void;
  onRewardCoins?: (coins: number, xp: number) => void;
  initialMenuTab?: SubMenuId;
}

export const LearningView: React.FC<LearningViewProps> = ({
  learningPaths,
  glossaryTerms,
  onCompleteLesson,
  onRestartOnboarding,
  isDarkMode,
  lang,
  infoDetailMode,
  onStartPageTour,
  onRewardCoins,
  initialMenuTab = 'matching'
}) => {
  // Main Category state
  const [activeCategory, setActiveCategory] = useState<MainCategoryTab>('memory_games');
  // Active Submenu state
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuId>(initialMenuTab);
  // Submenu Selection Prompt Modal
  const [showSubMenuPrompt, setShowSubMenuPrompt] = useState<boolean>(false);

  const [skillNodes, setSkillNodes] = useState<SkillTreeNode[]>(INITIAL_SKILL_TREE_NODES);
  const [learningQuests, setLearningQuests] = useState<LearningQuest[]>(INITIAL_LEARNING_QUESTS);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [courseDifficultyFilter, setCourseDifficultyFilter] = useState<'all' | LessonDifficulty>('all');
  const [courseSearch, setCourseSearch] = useState<string>('');

  // Level-up celebration modal state
  const [bonusQuizCp, setBonusQuizCp] = useState<number>(120);
  const [levelUpModalData, setLevelUpModalData] = useState<{
    isOpen: boolean;
    oldTier: CertificationTier | null;
    newTier: CertificationTier;
  } | null>(null);
  const [showOfficialCertificateModal, setShowOfficialCertificateModal] = useState<boolean>(false);

  // Interactive Simulators State
  const [simWatts, setSimWatts] = useState(1000);
  const [simHours, setSimHours] = useState(8);
  const [simRate, setSimRate] = useState(4.2);

  const [acTemp, setAcTemp] = useState(25);
  const [fanOption, setFanOption] = useState(true);

  // Compute Certification Level Progress in real-time
  const certProgress = calculateCertificationProgress(learningPaths, bonusQuizCp);

  const handleCompleteLessonWithLevelCheck = (lessonId: string, xp: number) => {
    const prevProgress = calculateCertificationProgress(learningPaths, bonusQuizCp);
    const updatedPaths = learningPaths.map(p => ({
      ...p,
      lessons: p.lessons.map(l => l.id === lessonId ? { ...l, completed: true } : l)
    }));
    const newProgress = calculateCertificationProgress(updatedPaths, bonusQuizCp);

    if (newProgress.currentTier.tierLevel > prevProgress.currentTier.tierLevel) {
      setLevelUpModalData({
        isOpen: true,
        oldTier: prevProgress.currentTier,
        newTier: newProgress.currentTier
      });
    }

    onCompleteLesson(lessonId, xp);
  };

  // Scroll Container Ref for Horizontal Tabs (for Mouse drag, wheel, button scroll)
  const tabScrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Check scroll bounds
  const updateScrollBounds = () => {
    if (tabScrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabScrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    updateScrollBounds();
    window.addEventListener('resize', updateScrollBounds);
    return () => window.removeEventListener('resize', updateScrollBounds);
  }, [activeCategory]);

  // Smooth scroll left/right handler for button clicks on PC/Mobile
  const handleScroll = (direction: 'left' | 'right') => {
    if (tabScrollContainerRef.current) {
      const scrollAmount = 260;
      tabScrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(updateScrollBounds, 350);
    }
  };

  // Convert mouse wheel on tabs to horizontal scroll for desktop
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (tabScrollContainerRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      tabScrollContainerRef.current.scrollLeft += e.deltaY;
      updateScrollBounds();
    }
  };

  // Mouse Drag to Scroll for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tabScrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tabScrollContainerRef.current.offsetLeft);
    setScrollLeftState(tabScrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabScrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabScrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    tabScrollContainerRef.current.scrollLeft = scrollLeftState - walk;
    updateScrollBounds();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    updateScrollBounds();
  };

  const handleCompleteSkillNode = (nodeId: string) => {
    setSkillNodes(prev => prev.map(n => n.id === nodeId ? { ...n, completed: true } : n));
    if (onRewardCoins) onRewardCoins(20, 50);
  };

  const handleEarnCoins = (coins: number) => {
    if (onRewardCoins) onRewardCoins(coins, 0);
  };

  const handleAddXp = (xp: number) => {
    if (onRewardCoins) onRewardCoins(0, xp);
  };

  // Calculate Watt-to-Bill values
  const dailyKwh = (simWatts * simHours) / 1000;
  const dailyCost = dailyKwh * simRate;
  const monthlyCost = dailyCost * 30;

  // Calculate AC Temp Saving
  const acBaseCost = 1300;
  const tempDiff = acTemp - 24;
  const tempSavingPercent = tempDiff * 8 + (fanOption ? 5 : 0);
  const acFinalCost = Math.max(300, acBaseCost * (1 - tempSavingPercent / 100));

  // Category Configuration
  const categories: {
    id: MainCategoryTab;
    labelTh: string;
    labelEn: string;
    icon: React.ComponentType<{ className?: string }>;
    descTh: string;
    descEn: string;
    accentColor: string;
    defaultSubMenu: SubMenuId;
  }[] = [
    {
      id: 'memory_games',
      labelTh: '🕹️ เกมภาพจำ & อาร์เคด',
      labelEn: '🕹️ Memory & Retro Games',
      icon: Gamepad2,
      descTh: 'เกมจับคู่, มิเตอร์จริง, สไลด์การ์ด 3D, ควิซความเร็ว และสะสมแสตมป์ 1990s',
      descEn: 'Matching, Analog Meter Lab, 3D Carousel, Trivia Quiz, Speed Duel & Stamps',
      accentColor: 'from-amber-500 to-amber-600',
      defaultSubMenu: 'matching'
    },
    {
      id: 'learning_modules',
      labelTh: '🎓 โมดูลการเรียนรู้ & วิทย์',
      labelEn: '🎓 Learning Modules & Science',
      icon: GraduationCap,
      descTh: 'คอร์สบทเรียน, คลัง 6 กฎทอง & เฉลยฟิสิกส์, ผังทักษะ และเควสภารกิจ',
      descEn: 'Courses, 6 Golden Rules Deck, Skill Tree, and Learning Quests',
      accentColor: 'from-teal-500 to-emerald-600',
      defaultSubMenu: 'courses'
    },
    {
      id: 'simulators',
      labelTh: '⚡ ห้องทดลอง & เครื่องจำลอง',
      labelEn: '⚡ Simulators & Energy Lab',
      icon: Calculator,
      descTh: 'คำนวณวัตต์เป็นบาททันที และจำลององศาแอร์ประหยัดเงิน',
      descEn: 'Instant Watt-to-Baht calculator & AC Temp saving simulator',
      accentColor: 'from-sky-500 to-blue-600',
      defaultSubMenu: 'watt_calc'
    }
  ];

  // Submenu Items Mapping
  const subMenuItems: Record<MainCategoryTab, {
    id: SubMenuId;
    icon: React.ComponentType<{ className?: string }>;
    labelTh: string;
    labelEn: string;
    tagTh: string;
    tagEn: string;
    descriptionTh: string;
    descriptionEn: string;
  }[]> = {
    memory_games: [
      {
        id: 'matching',
        icon: BrainCircuit,
        labelTh: '1. จับคู่ภาพจำ (Matching)',
        labelEn: '1. Memory Match',
        tagTh: 'เกมภาพจำ',
        tagEn: 'Mnemonic',
        descriptionTh: 'จับคู่การ์ด 6 กฎทอง พร้อมวิธีเล่นและเฉลยวิทยาศาสตร์แบบละเอียด',
        descriptionEn: 'Match mnemonic cards with in-depth physics principles and coin rewards'
      },
      {
        id: 'lab',
        icon: Gauge,
        labelTh: '2. ห้องทดลองมิเตอร์ (Meter Lab)',
        labelEn: '2. Analog Meter Lab',
        tagTh: 'ฟิสิกส์มิเตอร์',
        tagEn: 'Physics Lab',
        descriptionTh: 'หมุนจานมิเตอร์เหนี่ยวนำจริง (1200 rev/kWh) และสับคัทเอาท์เบรกเกอร์',
        descriptionEn: 'Simulate eddy-current spinning induction meter with interactive breakers'
      },
      {
        id: 'carousel',
        icon: Layers,
        labelTh: '3. การ์ดภาพจำหมุนเวียน (Carousel)',
        labelEn: '3. 3D Card Carousel',
        tagTh: 'สไลด์ 3D',
        tagEn: '3D Carousel',
        descriptionTh: 'สไลด์การ์ดภาพจำ 3 มิติ พลิกดูสูตรคำนวณและเงินบาทที่ประหยัดได้',
        descriptionEn: 'Interactive 3D flashcard carousel with formula breakdowns and study rewards'
      },
      {
        id: 'quiz',
        icon: HelpCircle,
        labelTh: '4. ควิซประลองความรู้ (Energy Quiz)',
        labelEn: '4. Retro Trivia Quiz',
        tagTh: 'ตอบคำถาม',
        tagEn: 'Trivia Quiz',
        descriptionTh: 'ทดสอบความรู้พลังงานสไตล์ 1990s เฉลยเหตุผลชัดเจนทุกข้อ',
        descriptionEn: '1990s retro style energy quiz with immediate pedagogical rationales'
      },
      {
        id: 'speed',
        icon: Swords,
        labelTh: '5. ดวลความเร็ววัตต์ (Speed Duel)',
        labelEn: '5. Wattage Speed Duel',
        tagTh: 'ประลองวัตต์',
        tagEn: 'Arcade Duel',
        descriptionTh: 'แข่งทายค่ากินไฟเครื่องใช้ไฟฟ้า Higher vs Lower วัดความเร็ว',
        descriptionEn: 'Fast-paced higher or lower power consumption battle'
      },
      {
        id: 'stamps',
        icon: Stamp,
        labelTh: '6. บัตรสะสมแสตมป์ (Habit Stamps)',
        labelEn: '6. Habit Stamp Card',
        tagTh: 'สะสมแสตมป์',
        tagEn: 'Habits',
        descriptionTh: 'ประทับตรานิสัยประหยัดไฟ 6 ข้อแบบการ์ดกระดาษวินเทจ',
        descriptionEn: 'Vintage paper punch card to stamp daily energy-saving habits'
      },
      {
        id: 'badges',
        icon: Award,
        labelTh: '7. ตู้เหรียญตรา (Badge Showcase)',
        labelEn: '7. Vintage Badges',
        tagTh: 'เกียรติยศ',
        tagEn: 'Achievements',
        descriptionTh: 'เหรียญตราเกียรติยศแบบแอนะล็อกสะสมจากทุกกิจกรรม',
        descriptionEn: 'Display all earned retro medals and achievements'
      }
    ],
    learning_modules: [
      {
        id: 'certification',
        icon: Award,
        labelTh: '1. เส้นทางใบรับรองวิชาชีพ (Certification Tracker)',
        labelEn: '1. Certification & Career Tracker',
        tagTh: 'ใบรับรอง',
        tagEn: 'Certified',
        descriptionTh: 'บันได 5 ขั้นสู่วิชาชีพพลังงาน (ผู้เริ่มต้น ➔ ผู้ตรวจประเมิน ➔ โซลาร์ ➔ ผู้จัดการพลังงาน ➔ ปรมาจารย์) พร้อมพิมพ์ใบประกาศนียบัตรทางการ',
        descriptionEn: '5-Tier Career Certification Roadmap from Beginner to CEM Professional and Grandmaster with official verified credentials'
      },
      {
        id: 'courses',
        icon: Layers,
        labelTh: '2. คอร์สบทเรียนหลัก (Courses)',
        labelEn: '2. Interactive Courses',
        tagTh: 'บทเรียน',
        tagEn: 'Lessons',
        descriptionTh: 'บทเรียนอินเทอร์แอคทีฟพร้อมอ่านสรุปและรับค่าประสบการณ์ XP',
        descriptionEn: 'Structured learning paths with comprehensive full-screen lessons'
      },
      {
        id: 'guide',
        icon: BookOpen,
        labelTh: '3. คู่มือ 6 กฎทอง & วิทย์ (Science Guide)',
        labelEn: '3. Visual Science Deck',
        tagTh: 'คลังเฉลย',
        tagEn: 'Science Deck',
        descriptionTh: 'คลังการ์ด 6 กฎทองพร้อมหลักฟิสิกส์ สูตรคำนวณ และเงินประหยัดรายเดือน',
        descriptionEn: 'Full 6 mnemonic rules deck with exact physics explanations and formulas'
      },
      {
        id: 'tree',
        icon: GraduationCap,
        labelTh: '4. ผังต้นไม้ทักษะ (Skill Tree)',
        labelEn: '4. Skill Tree Progression',
        tagTh: 'อัปเกรด',
        tagEn: 'Skill Tree',
        descriptionTh: 'ปลดล็อกทักษะความรู้ 4 สาย: พื้นฐาน, แอร์, ความปลอดภัย และ AI',
        descriptionEn: '4-branch skill progression tree with unlockable nodes and rewards'
      },
      {
        id: 'quests',
        icon: Target,
        labelTh: '5. เควสภารกิจความรู้ (Quests)',
        labelEn: '5. Learning Quests',
        tagTh: 'เควส',
        tagEn: 'Quests',
        descriptionTh: 'ภารกิจพิชิตเป้าหมายการเรียนรู้เพื่อรับเหรียญ Eco Coins',
        descriptionEn: 'Targeted quests with checklist objectives for XP and Coin bonuses'
      },
      {
        id: 'references',
        icon: ShieldCheck,
        labelTh: '6. แหล่งอ้างอิง & มาตรฐานทางการ (Standards & References)',
        labelEn: '6. Official Standards & References',
        tagTh: 'มาตรฐาน',
        tagEn: 'Standards',
        descriptionTh: 'สารบัญแหล่งข้อมูล กฟผ., กกพ., สนพ., EPREL, Energy Star, ผู้ผลิต และค้าปลีกชั้นนำ',
        descriptionEn: 'Directory of verified energy standards, international registries, and manufacturer catalogs'
      }
    ],
    simulators: [
      {
        id: 'watt_calc',
        icon: Calculator,
        labelTh: '1. วัตต์เป็นบาท (Watt to Baht)',
        labelEn: '1. Watt to Baht Calculator',
        tagTh: 'คำนวณสด',
        tagEn: 'Live Calculator',
        descriptionTh: 'เลื่อนปรับวัตต์และชั่วโมงเพื่อดูค่าไฟต่อวันและต่อเดือนทันที',
        descriptionEn: 'Adjust wattage and hours to compute real-time bill impact'
      },
      {
        id: 'ac_sim',
        icon: Snowflake,
        labelTh: '2. จำลองอุณหภูมิแอร์ (AC Simulator)',
        labelEn: '2. AC Temp & Fan Sim',
        tagTh: 'จำลองแอร์',
        tagEn: 'AC Simulation',
        descriptionTh: 'ทดลองปรับองศาแอร์และเปิดพัดลมเพื่อดู % เงินที่ประหยัดได้จริง',
        descriptionEn: 'Simulate temperature offsets and fan circulation savings'
      }
    ]
  };

  const currentSubMenuList = subMenuItems[activeCategory] || subMenuItems.memory_games;

  // Change category helper
  const handleSelectCategory = (cat: MainCategoryTab) => {
    setActiveCategory(cat);
    const defaultSub = categories.find(c => c.id === cat)?.defaultSubMenu || 'matching';
    setActiveSubMenu(defaultSub);
    setTimeout(updateScrollBounds, 100);
  };

  return (
    <div id="tour-step-learning" className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-xl relative overflow-hidden transition-all ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-gradient-to-br from-teal-50 via-emerald-50/50 to-teal-100/30 border-teal-100 text-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                {lang === 'th' ? 'ศูนย์การเรียนรู้ & อาร์เคดพลังงาน' : 'Unified Learning & Energy Arcade'}
              </span>

              {onStartPageTour && (
                <button
                  onClick={() => onStartPageTour(7)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/30 hover:bg-amber-500/25 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                  <span>{lang === 'th' ? '💡 แนะนำหน้านี้' : '💡 Page Tour'}</span>
                </button>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight">
              {lang === 'th' ? 'โมดูลการเรียนรู้ & เกมภาพจำประหยัดไฟ' : 'Learning Modules & Memory Games'}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl font-medium">
              {lang === 'th' 
                ? 'เลือกหมวดหมู่หลัก แล้วเลือกกิจกรรมย่อยเพื่อเริ่มเรียนรู้หรือเล่นเกมประหยัดไฟได้ทันที พร้อมแถบเลื่อนซ้าย-ขวาที่ใช้งานได้ทั้งคอมและมือถือ' 
                : 'Select a main category, then pick a submenu activity to play or study with smooth desktop and mobile scrolling.'}
            </p>
          </div>

          {/* Quick Submenu Prompt Launcher Button */}
          <button
            onClick={() => setShowSubMenuPrompt(true)}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0 border border-teal-400/40"
          >
            <FolderOpen className="w-4 h-4" />
            <span>{lang === 'th' ? '📂 เลือกเมนูกิจกรรมทั้งหมด' : '📂 Browse All Activities'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. PRIMARY MAIN CATEGORY MENU TABS (Memory Games vs Learning Modules vs Simulators) */}
      {/* ========================================================================= */}
      <div className={`p-4 rounded-[2rem] border shadow-md space-y-3 ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-teal-500" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'th' ? '1. เลือกหมวดหมู่หลัก (Main Category)' : '1. Select Main Category'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-teal-500">
            {lang === 'th' ? 'คลิกเพื่อสลับหมวดหมู่' : 'Click to switch'}
          </span>
        </div>

        {/* Category Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const isCatActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isCatActive
                    ? isDarkMode
                      ? 'bg-gradient-to-br from-slate-800 to-indigo-950/60 border-teal-500 text-white shadow-lg ring-2 ring-teal-500/40'
                      : 'bg-gradient-to-br from-teal-50 via-white to-emerald-50 border-teal-500 text-slate-900 shadow-md ring-2 ring-teal-500/30'
                    : isDarkMode
                      ? 'bg-slate-800/50 border-slate-700/70 text-slate-400 hover:bg-slate-800 hover:text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isCatActive ? 'bg-teal-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isCatActive && (
                    <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-500 font-black text-[10px] uppercase">
                      {lang === 'th' ? 'เลือกอยู่' : 'Active'}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-sm font-display mb-0.5">
                    {lang === 'th' ? cat.labelTh : cat.labelEn}
                  </h3>
                  <p className="text-[11px] opacity-75 line-clamp-1">
                    {lang === 'th' ? cat.descTh : cat.descEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 2. SUBMENU SCROLLABLE STRIP (Smooth Horizontal Scroll for PC & Mobile) */}
        {/* ========================================================================= */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-1 mb-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {lang === 'th' ? '2. เลือกเมนูกิจกรรมย่อย (Submenu)' : '2. Select Submenu Activity'}
              </span>
            </div>

            {/* Scroll Navigation Controls for Desktop and Mobile */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll Submenu Left"
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700 shadow-sm'
                    : 'opacity-30 cursor-not-allowed bg-transparent border-transparent text-slate-400'
                }`}
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-mono font-bold text-slate-400 px-1">
                {currentSubMenuList.findIndex(m => m.id === activeSubMenu) + 1} / {currentSubMenuList.length}
              </span>

              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll Submenu Right"
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  canScrollRight
                    ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700 shadow-sm'
                    : 'opacity-30 cursor-not-allowed bg-transparent border-transparent text-slate-400'
                }`}
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SCROLL CONTAINER WITH MOUSE DRAG & MOUSE WHEEL SUPPORT */}
          <div className="relative group">
            {/* Left Edge Gradient Fade */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none z-10" />
            )}

            {/* Right Edge Gradient Fade */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none z-10" />
            )}

            <div
              ref={tabScrollContainerRef}
              onScroll={updateScrollBounds}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className={`flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scroll-smooth select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {currentSubMenuList.map((item) => {
                const Icon = item.icon;
                const isActive = activeSubMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubMenu(item.id)}
                    className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2.5 shrink-0 cursor-pointer border ${
                      isActive
                        ? 'bg-slate-900 text-white border-teal-500 shadow-md ring-2 ring-teal-500/40 dark:bg-teal-600 dark:border-teal-400 dark:ring-teal-400/50'
                        : isDarkMode
                          ? 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <span className="whitespace-nowrap font-display">
                      {lang === 'th' ? item.labelTh : item.labelEn}
                    </span>

                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${
                      isActive 
                        ? 'bg-teal-400 text-slate-950 dark:bg-slate-900 dark:text-teal-300' 
                        : 'bg-slate-200/80 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}>
                      {lang === 'th' ? item.tagTh : item.tagEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PROMPT MODAL / POPUP (Prompt to select which submenu you want to go to) */}
      {/* ========================================================================= */}
      {showSubMenuPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-6 sm:p-8 border shadow-2xl space-y-6 ${
            isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500 text-white flex items-center justify-center">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black font-display">
                    {lang === 'th' ? 'เลือกกิจกรรมที่คุณต้องการเล่น/เรียนรู้' : 'Select an Activity to Explore'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {lang === 'th' ? 'เลือกหมวดหมู่และกิจกรรมย่อยที่ต้องการเข้าถึงได้ทันที' : 'Pick any main category and jump directly to its submenu'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSubMenuPrompt(false)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Category Groups in Modal */}
            <div className="space-y-6">
              {categories.map((cat) => {
                const subList = subMenuItems[cat.id] || [];
                return (
                  <div key={cat.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <cat.icon className="w-4 h-4 text-teal-500" />
                      <h4 className="font-black text-sm uppercase tracking-wider font-display">
                        {lang === 'th' ? cat.labelTh : cat.labelEn}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {subList.map((sub) => {
                        const isSubActive = activeCategory === cat.id && activeSubMenu === sub.id;
                        const SubIcon = sub.icon;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveCategory(cat.id);
                              setActiveSubMenu(sub.id);
                              setShowSubMenuPrompt(false);
                            }}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                              isSubActive
                                ? 'bg-teal-500/15 border-teal-500 ring-2 ring-teal-500/30'
                                : isDarkMode
                                  ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className={`p-2 rounded-xl shrink-0 ${
                              isSubActive ? 'bg-teal-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}>
                              <SubIcon className="w-4 h-4" />
                            </div>

                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-xs">
                                  {lang === 'th' ? sub.labelTh : sub.labelEn}
                                </span>
                                {isSubActive && (
                                  <Check className="w-3.5 h-3.5 text-teal-500 ml-auto" />
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                                {lang === 'th' ? sub.descriptionTh : sub.descriptionEn}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ACTIVE SUBMENU CONTENT RENDERING */}
      {/* ========================================================================= */}

      {/* ------------------------------------------------------------------------- */}
      {/* GROUP A: MEMORY & RETRO GAMES */}
      {/* ------------------------------------------------------------------------- */}
      
      {/* 1. MATCHING (จับคู่ภาพจำ 6 กฎทอง) */}
      {activeSubMenu === 'matching' && (
        <div className="space-y-6">
          <MemoryMatchGame 
            lang={lang} 
            isDarkMode={isDarkMode} 
            onEarnCoins={handleEarnCoins}
            onAddXp={handleAddXp}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* 2. ANALOG METER & BREAKER LAB */}
      {activeSubMenu === 'lab' && (
        <div className="space-y-6">
          <AnalogMeterSimulator 
            lang={lang} 
            isDarkMode={isDarkMode}
            onEarnCoins={handleEarnCoins}
            onAddXp={handleAddXp}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* 3. 3D MNEMONIC CAROUSEL */}
      {activeSubMenu === 'carousel' && (
        <div className="space-y-6">
          <MnemonicCarousel 
            lang={lang} 
            isDarkMode={isDarkMode}
            onEarnCoins={handleEarnCoins}
            onAddXp={handleAddXp}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* 4. RETRO TRIVIA QUIZ */}
      {activeSubMenu === 'quiz' && (
        <div className="space-y-6">
          <RetroTriviaQuiz 
            lang={lang} 
            isDarkMode={isDarkMode} 
            onEarnCoins={handleEarnCoins}
            onAddXp={handleAddXp}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* 5. SPEED & WATTAGE DUEL */}
      {activeSubMenu === 'speed' && (
        <div className="space-y-6">
          <MiniGamesHub
            appliances={[]}
            lang={lang}
            isDarkMode={isDarkMode}
            onRewardCoins={onRewardCoins}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* 6. HABIT STAMPS */}
      {activeSubMenu === 'stamps' && (
        <div className="space-y-6">
          <HabitStampCard 
            lang={lang} 
            isDarkMode={isDarkMode} 
            onEarnCoins={handleEarnCoins}
            onAddXp={handleAddXp}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* 7. RETRO BADGES */}
      {activeSubMenu === 'badges' && (
        <div className="space-y-6">
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* GROUP B: LEARNING MODULES & SCIENCE */}
      {/* ------------------------------------------------------------------------- */}

      {/* 1. CERTIFICATION & CAREER TRACKER */}
      {activeSubMenu === 'certification' && (
        <div className="space-y-6">
          <CertificationProgressTracker
            certProgress={certProgress}
            onSelectDifficultyFilter={(diff) => {
              setCourseDifficultyFilter(diff);
              setActiveSubMenu('courses');
            }}
            lang={lang}
            isDarkMode={isDarkMode}
          />
          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* 2. COURSES & LESSONS */}
      {activeSubMenu === 'courses' && (() => {
        // Filter paths and lessons based on difficulty and search
        const filteredPaths = learningPaths
          .map(path => {
            const matchesDifficulty = courseDifficultyFilter === 'all' || path.difficulty === courseDifficultyFilter;
            const matchingLessons = path.lessons.filter(les => {
              const diffMatch = courseDifficultyFilter === 'all' || les.difficulty === courseDifficultyFilter;
              const searchMatch = !courseSearch.trim() || 
                les.titleTh.toLowerCase().includes(courseSearch.toLowerCase()) ||
                les.titleEn.toLowerCase().includes(courseSearch.toLowerCase()) ||
                (les.tags && les.tags.some(t => t.toLowerCase().includes(courseSearch.toLowerCase())));
              return diffMatch && searchMatch;
            });
            return {
              ...path,
              lessons: matchingLessons,
              isVisible: (matchesDifficulty || matchingLessons.length > 0) && (matchingLessons.length > 0 || !courseSearch.trim())
            };
          })
          .filter(path => path.isVisible && path.lessons.length > 0);

        const totalLessonsCount = learningPaths.reduce((acc, p) => acc + p.lessons.length, 0);
        const completedLessonsCount = learningPaths.reduce((acc, p) => acc + p.lessons.filter(l => l.completed).length, 0);
        const totalXpAvailable = learningPaths.reduce((acc, p) => acc + p.lessons.reduce((lacc, l) => lacc + l.xpReward, 0), 0);

        const getDifficultyBadge = (diff?: LessonDifficulty) => {
          switch (diff) {
            case 'easy':
              return {
                labelTh: 'ระดับ 1: ง่าย (Easy)',
                labelEn: 'Level 1: Easy',
                bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
                dot: 'bg-emerald-500',
                icon: Zap
              };
            case 'medium':
              return {
                labelTh: 'ระดับ 2: ปานกลาง (Medium)',
                labelEn: 'Level 2: Medium',
                bg: 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400',
                dot: 'bg-amber-500',
                icon: SunMedium
              };
            case 'hard':
              return {
                labelTh: 'ระดับ 3: ทักษะช่างไฟ (Hard)',
                labelEn: 'Level 3: Electrician (Hard)',
                bg: 'bg-orange-500/15 border-orange-500/30 text-orange-600 dark:text-orange-400',
                dot: 'bg-orange-500',
                icon: Hammer
              };
            case 'expert':
              return {
                labelTh: 'ระดับ 4: ช่างไฟมือโปร (Expert)',
                labelEn: 'Level 4: Master Pro (Expert)',
                bg: 'bg-purple-500/15 border-purple-500/30 text-purple-600 dark:text-purple-400',
                dot: 'bg-purple-500',
                icon: ShieldCheck
              };
            default:
              return {
                labelTh: 'ทั่วไป',
                labelEn: 'General',
                bg: 'bg-slate-500/15 border-slate-500/30 text-slate-600 dark:text-slate-400',
                dot: 'bg-slate-500',
                icon: Zap
              };
          }
        };

        const getCategoryLabel = (cat?: string) => {
          switch (cat) {
            case 'home':
            case 'personal':
              return { th: '🏠 ใช้ไฟฟ้าในบ้าน', en: '🏠 Home Energy' };
            case 'external':
              return { th: '⚡ สายส่ง & โซลาร์เซลล์', en: '⚡ Grid & Solar' };
            case 'electrician':
              return { th: '🛠️ ตู้ไฟ & มาตรฐาน มอก.', en: '🛠️ Panels & Wiring' };
            case 'diagnostics':
              return { th: '🔍 วินิจฉัย & ตรวจซ่อมวงจร', en: '🔍 Pro Diagnostics' };
            case 'maintenance':
              return { th: '🔧 บำรุงรักษาเชิงป้องกัน & PM', en: '🔧 Advanced Maintenance' };
            default:
              return { th: '⚡ ความรู้ทั่วไป', en: '⚡ General' };
          }
        };

        return (
          <div className="space-y-6">
            {/* Real-time Certification Progress Tracker */}
            <CertificationProgressTracker
              certProgress={certProgress}
              onSelectDifficultyFilter={(diff) => {
                setCourseDifficultyFilter(diff);
              }}
              lang={lang}
              isDarkMode={isDarkMode}
            />

            {/* Academy Header & Summary Metrics */}
            <div className={`p-6 rounded-[2.5rem] border shadow-lg ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-teal-500/10 border-teal-100'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 font-extrabold text-xs uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4" />
                    {lang === 'th' ? 'หลักสูตรพลังงาน & ช่างไฟฟ้าครบวงจร' : 'Comprehensive Electrician & Energy Academy'}
                  </div>
                  <h2 className="text-xl md:text-2xl font-black font-display text-slate-900 dark:text-white">
                    {lang === 'th' ? `คลัง ${totalLessonsCount} บทเรียน 4 ระดับความยาก (ง่าย ➔ มือโปร)` : `${totalLessonsCount} Lessons Across 4 Difficulty Tiers`}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
                    {lang === 'th' 
                      ? 'เรียนรู้ตั้งแต่การใช้ไฟฟ้าในบ้าน การคำนวณบิล ระบบภายนอก/โซลาร์เซลล์ ตู้คอนซูมเมอร์ ไปจนถึงการวินิจฉัยวงจรขั้นสูง (Thermoscan/Megger/Loop/THD) และการบำรุงรักษาเชิงป้องกัน PM (หม้อแปลง, สวิตช์เกียร์, มอเตอร์ VFD, ATS/UPS)'
                      : 'From residential energy & solar to consumer units, professional circuit diagnostics (Thermoscan/Megger/THD), and industrial PM reliability.'}
                  </p>
                </div>

                {/* Metrics Stats */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">{lang === 'th' ? 'จบบทเรียน' : 'Progress'}</span>
                    <span className="text-base font-black font-mono text-emerald-600 dark:text-emerald-400">{completedLessonsCount} / {totalLessonsCount}</span>
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Total XP</span>
                    <span className="text-base font-black font-mono text-amber-500">+{totalXpAvailable} XP</span>
                  </div>
                </div>
              </div>

              {/* Difficulty Level Filter Chips */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                  <Filter className="w-3.5 h-3.5" />
                  {lang === 'th' ? 'เลือกระดับความยาก:' : 'Filter Tier:'}
                </span>

                {[
                  { id: 'all', labelTh: `🌟 ทั้งหมด (${totalLessonsCount} บทเรียน)`, labelEn: `🌟 All Tiers (${totalLessonsCount})` },
                  { id: 'easy', labelTh: '🟢 1. ระดับง่าย (ใช้ไฟในบ้าน)', labelEn: '🟢 Tier 1: Easy (Home)' },
                  { id: 'medium', labelTh: '🟡 2. ระดับปานกลาง (นอกบ้าน/โซลาร์)', labelEn: '🟡 Tier 2: Medium (Solar)' },
                  { id: 'hard', labelTh: '🟠 3. ทักษะช่างไฟ (ตู้ไฟ/สายไฟ)', labelEn: '🟠 Tier 3: Hard (Wiring)' },
                  { id: 'expert', labelTh: '🔴 4. วินิจฉัย & บำรุงรักษาขั้นสูง (Pro PM)', labelEn: '🔴 Tier 4: Diagnostics & PM (Expert)' }
                ].map((tier) => {
                  const isActive = courseDifficultyFilter === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setCourseDifficultyFilter(tier.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-slate-900 text-white border-teal-500 shadow-md ring-2 ring-teal-500/30 dark:bg-teal-600 dark:border-teal-400'
                          : isDarkMode
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {lang === 'th' ? tier.labelTh : tier.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Course Paths List */}
            {filteredPaths.length === 0 ? (
              <div className="p-12 text-center rounded-[2.5rem] border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-xl">
                  🔍
                </div>
                <h4 className="font-extrabold text-base text-slate-700 dark:text-slate-300">
                  {lang === 'th' ? 'ไม่พบบทเรียนในหมวดหมู่นี้' : 'No lessons found for this filter'}
                </h4>
                <button
                  onClick={() => setCourseDifficultyFilter('all')}
                  className="px-4 py-2 rounded-xl bg-teal-500 text-white font-extrabold text-xs"
                >
                  {lang === 'th' ? 'ดูบทเรียนทั้งหมด' : 'Show All Lessons'}
                </button>
              </div>
            ) : (
              filteredPaths.map((path) => {
                const pathBadge = getDifficultyBadge(path.difficulty);
                const PathIcon = pathBadge.icon;
                return (
                  <div
                    key={path.id}
                    className={`p-6 sm:p-7 rounded-[2.5rem] border shadow-lg space-y-6 transition-all ${
                      isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                    }`}
                  >
                    {/* Path Header with Difficulty Level & Category */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl ${pathBadge.bg} flex items-center justify-center font-black shrink-0 border`}>
                          <PathIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-black ${pathBadge.bg} flex items-center gap-1.5`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${pathBadge.dot}`} />
                              {lang === 'th' ? path.badgeLabelTh || pathBadge.labelTh : path.badgeLabelEn || pathBadge.labelEn}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-[11px]">
                              {lang === 'th' ? getCategoryLabel(path.category).th : getCategoryLabel(path.category).en}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-black font-display text-slate-900 dark:text-white">
                            {lang === 'th' ? path.titleTh : path.titleEn}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                            {lang === 'th' ? path.descTh : path.descEn}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-left sm:text-right">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {path.lessons.length} {lang === 'th' ? 'บทเรียน' : 'Lessons'}
                        </span>
                      </div>
                    </div>

                    {/* Lesson Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {path.lessons.map((les) => {
                        const lesBadge = getDifficultyBadge(les.difficulty || path.difficulty);
                        return (
                          <div
                            key={les.id}
                            className={`p-5 rounded-[24px] border transition-all space-y-3 flex flex-col justify-between hover:shadow-md ${
                              isDarkMode ? 'bg-slate-800/80 border-slate-700/80 hover:border-teal-500/40' : 'bg-slate-50/90 border-slate-200/90 hover:border-teal-400'
                            }`}
                          >
                            <div className="space-y-2.5">
                              {/* Top Bar: Difficulty, ReadTime & XP */}
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase border ${lesBadge.bg}`}>
                                  {lang === 'th' ? lesBadge.labelTh.split(':')[0] : lesBadge.labelEn.split(':')[0]}
                                </span>

                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-teal-500" /> {les.readTime}
                                  </span>
                                  <span className="text-xs font-mono font-extrabold text-amber-500 flex items-center gap-1">
                                    <Zap className="w-3 h-3 fill-amber-500" /> +{les.xpReward} XP
                                  </span>
                                </div>
                              </div>

                              {/* Lesson Title */}
                              <h4 className="font-extrabold text-base font-display text-slate-900 dark:text-white line-clamp-2">
                                {lang === 'th' ? les.titleTh : les.titleEn}
                              </h4>

                              {/* Lesson Tags */}
                              {les.tags && les.tags.length > 0 && (
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {les.tags.map((tag, tidx) => (
                                    <span
                                      key={tidx}
                                      className="px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 font-semibold text-[10px]"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Formula Preview if present */}
                              {les.formula && (
                                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 font-mono text-[11px] font-bold line-clamp-1">
                                  📐 {les.formula}
                                </div>
                              )}

                              {/* Electrician Pro Tip preview if present */}
                              {les.electricianTipTh && (
                                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] font-semibold line-clamp-2">
                                  {lang === 'th' ? les.electricianTipTh : les.electricianTipEn || les.electricianTipTh}
                                </div>
                              )}
                            </div>

                            {/* Action Button */}
                            <div className="pt-2">
                              <button
                                onClick={() => setSelectedLesson(les)}
                                className={`w-full h-[48px] rounded-2xl font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                  les.completed
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                    : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
                                }`}
                              >
                                {les.completed ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>{lang === 'th' ? 'ทบทวนบทเรียนนี้ (เสร็จแล้ว ✓)' : 'Review Lesson (Done ✓)'}</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 fill-white" />
                                    <span>{lang === 'th' ? 'เริ่มเรียนบทเรียนนี้ ➔' : 'Start Full Lesson ➔'}</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        );
      })()}

      {/* 2. VISUAL SCIENCE GUIDE & DECK */}
      {activeSubMenu === 'guide' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div>
              <h3 className="text-xl font-black font-display flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-500" />
                <span>{lang === 'th' ? 'คู่มือ 6 กฎทองภาพจำ & เฉลยวิทยาศาสตร์' : 'The 6 Golden Visual Mnemonics & Science'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'th' ? 'อธิบายเหตุผลอย่างละเอียด ทำไมคำตอบและพฤติกรรมแต่ละข้อจึงประหยัดพลังงานได้จริง' : 'In-depth scientific rationale explaining why each habit and mnemonic works in physics and finance.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VISUAL_MNEMONICS.map((mnemonic) => (
              <VisualMnemonicCard
                key={mnemonic.id}
                mnemonic={mnemonic}
                lang={lang}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>

          <RetroBadgeShowcase lang={lang} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* 3. SKILL TREE */}
      {activeSubMenu === 'tree' && (
        <SkillTree
          nodes={skillNodes}
          lang={lang}
          isDarkMode={isDarkMode}
          onCompleteNode={handleCompleteSkillNode}
        />
      )}

      {/* 4. LEARNING QUESTS */}
      {activeSubMenu === 'quests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black font-display text-slate-800 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-500" />
              {lang === 'th' ? 'ภารกิจเควสความรู้ (Guided Learning Quests)' : 'Guided Learning Quests'}
            </h2>
          </div>

          <div className="space-y-4">
            {learningQuests.map((quest) => (
              <div
                key={quest.id}
                className={`p-6 rounded-[2.5rem] border transition-all ${
                  isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-extrabold text-base font-display text-slate-900 dark:text-white">
                      {lang === 'th' ? quest.titleTh : quest.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {lang === 'th' ? quest.descTh : quest.descEn}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      +{quest.xpReward} XP
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 font-bold text-xs">
                      +{quest.coinReward} Coins
                    </span>
                  </div>
                </div>

                {/* Quest Objectives Checklist */}
                <div className="space-y-2">
                  {quest.objectives.map((obj) => (
                    <div
                      key={obj.id}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                        obj.completed
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                          : isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${obj.completed ? 'text-emerald-500' : 'text-slate-400'}`} />
                        <span className={obj.completed ? 'line-through opacity-80' : 'font-medium'}>
                          {lang === 'th' ? obj.titleTh : obj.titleEn}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] opacity-70">
                        {obj.completed ? (lang === 'th' ? 'สำเร็จ ✓' : 'Completed ✓') : (lang === 'th' ? 'ยังไม่เสร็จ' : 'Pending')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. OFFICIAL REFERENCES & STANDARDS */}
      {activeSubMenu === 'references' && (
        <OfficialReferencesDirectory
          lang={lang}
          isDarkMode={isDarkMode}
        />
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* GROUP C: SIMULATORS */}
      {/* ------------------------------------------------------------------------- */}

      {/* 1. WATT TO BAHT CALCULATOR */}
      {activeSubMenu === 'watt_calc' && (
        <div className="space-y-6">
          <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-lg ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-teal-100'
          }`}>
            <h3 className="font-extrabold text-lg font-display text-slate-800 dark:text-white mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-teal-500" />
              {lang === 'th' ? 'เครื่องคำนวณวัตต์เป็นบาท (Watt to Baht Calculator)' : 'Watt to Baht Instant Calculator'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {lang === 'th' ? 'ปรับกำลังไฟและชั่วโมงใช้งานเพื่อดูค่าไฟต่อวันและต่อเดือนทันที' : 'Adjust power and hours to calculate instant daily and monthly cost'}
            </p>

            <div className="space-y-6 text-xs font-bold max-w-2xl">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{lang === 'th' ? 'กำลังไฟฟ้าของเครื่องใช้ไฟฟ้า (Watts):' : 'Appliance Power (Watts):'}</span>
                  <span className="text-teal-600 dark:text-teal-400 font-extrabold text-base">{simWatts} W</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={3500}
                  step={10}
                  value={simWatts}
                  onChange={(e) => setSimWatts(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{lang === 'th' ? 'ระยะเวลาเปิดใช้งานต่อวัน (Hours):' : 'Daily Usage (Hours):'}</span>
                  <span className="text-teal-600 dark:text-teal-400 font-extrabold text-base">{simHours} {lang === 'th' ? 'ชม./วัน' : 'hrs/day'}</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={24}
                  step={0.5}
                  value={simHours}
                  onChange={(e) => setSimHours(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-[0.75rem] text-slate-400 uppercase font-black">{lang === 'th' ? 'ปริมาณไฟต่อวัน' : 'Daily Energy'}</span>
                  <div className="text-2xl font-black text-slate-800 dark:text-white my-1">
                    {dailyKwh.toFixed(2)} kWh
                  </div>
                  <span className="text-xs text-teal-600 dark:text-teal-400 font-bold">
                    (฿{dailyCost.toFixed(2)} / {lang === 'th' ? 'วัน' : 'day'})
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30">
                  <span className="text-[0.75rem] text-teal-600 dark:text-teal-400 uppercase font-black">{lang === 'th' ? 'ค่าไฟประมาณการ 30 วัน' : 'Est. 30-Day Cost'}</span>
                  <div className="text-3xl font-black text-teal-600 dark:text-teal-400 my-1">
                    ฿{monthlyCost.toFixed(0)}
                  </div>
                  <span className="text-[0.7rem] text-slate-500">
                    ({lang === 'th' ? `อัตรามาตรฐาน ฿${simRate}/หน่วย` : `@ ฿${simRate}/kWh`})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. AC TEMPERATURE SIMULATOR */}
      {activeSubMenu === 'ac_sim' && (
        <div className="space-y-6">
          <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-lg ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-teal-100'
          }`}>
            <h3 className="font-extrabold text-lg font-display text-slate-800 dark:text-white mb-2 flex items-center gap-2">
              <Snowflake className="w-5 h-5 text-sky-500" />
              {lang === 'th' ? 'เครื่องจำลองอุณหภูมิแอร์ & พัดลม (AC Temp Simulator)' : 'AC Temp & Fan Simulator'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {lang === 'th' ? 'ทดลองปรับองศาแอร์แล้วดูผลประหยัดเงินในกระเป๋าของคุณ' : 'Adjust temperature and fan settings to see instant savings'}
            </p>

            <div className="space-y-6 text-xs font-bold max-w-2xl">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{lang === 'th' ? 'อุณหภูมิที่ตั้งไว้ (Set Temperature):' : 'Set Temperature:'}</span>
                  <span className="text-sky-600 dark:text-sky-400 font-extrabold text-base">{acTemp}°C</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={30}
                  value={acTemp}
                  onChange={(e) => setAcTemp(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div>
                  <div className="text-sm font-bold">{lang === 'th' ? 'เปิดพัดลมส่ายช่วยกระจายลมเย็น:' : 'Oscillating Fan Helper:'}</div>
                  <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">{lang === 'th' ? 'เพิ่มความเย็นสัมผัส 1-2°C (+5% Saving)' : 'Increases evaporative cooling (+5% Saving)'}</div>
                </div>
                <button
                  onClick={() => setFanOption(!fanOption)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    fanOption ? 'bg-teal-500 text-white shadow-md' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {fanOption ? (lang === 'th' ? '✓ เปิดทำงาน' : '✓ ON') : (lang === 'th' ? '✕ ปิด' : '✕ OFF')}
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-[0.75rem] text-slate-400 uppercase font-black">{lang === 'th' ? 'ค่าไฟแอร์ประมาณการ' : 'Est. AC Monthly Cost'}</span>
                  <div className="text-2xl font-black text-slate-800 dark:text-white my-1">
                    ฿{acFinalCost.toFixed(0)} / {lang === 'th' ? 'เดือน' : 'mo'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30">
                  <span className="text-[0.75rem] text-teal-600 dark:text-teal-400 uppercase font-black">{lang === 'th' ? 'ประหยัดได้ขึ้นถึง' : 'Savings Rate'}</span>
                  <div className="text-3xl font-black text-teal-600 dark:text-teal-400 my-1">
                    {tempSavingPercent > 0 ? `+${tempSavingPercent}%` : '0%'}
                  </div>
                  <span className="text-[0.7rem] text-teal-600 dark:text-teal-400 font-bold">
                    ({lang === 'th' ? `ประหยัดเงิน ฿${(acBaseCost - acFinalCost).toFixed(0)}/เดือน` : `Save ฿${(acBaseCost - acFinalCost).toFixed(0)}/mo`})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Full-Screen Learning Experience Page */}
      {selectedLesson && (
        <FullScreenLearningExperience
          lesson={selectedLesson}
          pathTitle={learningPaths.find(p => p.lessons.some(l => l.id === selectedLesson.id))?.titleTh || 'Energy Academy'}
          onClose={() => setSelectedLesson(null)}
          onCompleteLesson={handleCompleteLessonWithLevelCheck}
          onRewardCoins={onRewardCoins}
          onRewardCertificationPoints={(cp) => setBonusQuizCp(prev => prev + cp)}
          lang={lang}
          isDarkMode={isDarkMode}
          detailMode={infoDetailMode}
          onNextLesson={() => {
            const allLessons = learningPaths.flatMap(p => p.lessons);
            const idx = allLessons.findIndex(l => l.id === selectedLesson.id);
            if (idx !== -1 && idx < allLessons.length - 1) {
              setSelectedLesson(allLessons[idx + 1]);
            } else {
              setSelectedLesson(null);
            }
          }}
        />
      )}

      {/* Level-Up Success & Certification Tier Unlock Celebration Modal */}
      {levelUpModalData && levelUpModalData.isOpen && (
        <LevelUpCelebrationModal
          isOpen={levelUpModalData.isOpen}
          onClose={() => setLevelUpModalData(null)}
          oldTier={levelUpModalData.oldTier}
          newTier={levelUpModalData.newTier}
          onViewCertificate={() => {
            setLevelUpModalData(null);
            setShowOfficialCertificateModal(true);
          }}
          onContinue={() => {
            setLevelUpModalData(null);
          }}
          lang={lang}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Official Certificate Modal */}
      <OfficialCertificateModal
        isOpen={showOfficialCertificateModal}
        onClose={() => setShowOfficialCertificateModal(false)}
        certProgress={certProgress}
        lang={lang}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
