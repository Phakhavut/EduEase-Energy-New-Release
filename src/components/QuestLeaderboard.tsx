import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GridCharacterSkin } from './GridCharacterSkin';

interface QuestLeaderboardProps {
    lang: 'th' | 'en';
    totalClaimedXp: number;
    claimedQuests: Record<string, boolean>;
    ecoStreak: number;
    activeQuests: any[];
    handleClaimQuest: (id: string) => void;
    triggerConfetti?: () => void;
}

export interface GridSkin {
    id: string;
    nameEn: string;
    nameTh: string;
    icon: string;
    bgClass: string;
    borderClass: string;
    textColor: string;
    cost: number;
    effectClass?: string;
    descEn: string;
    descTh: string;
}

export const PLATFORM_SKINS: GridSkin[] = [
    {
        id: 'default',
        nameEn: 'Volt Spark ⚡',
        nameTh: 'ประจุไฟฟ้าสายฟ้า ⚡',
        icon: 'fa-bolt',
        bgClass: 'bg-primary/10 dark:bg-primary/20',
        borderClass: 'border-primary/40',
        textColor: 'text-primary',
        cost: 0,
        descEn: 'The baseline grid energy pulse. Humble, clean, efficient.',
        descTh: 'กระแสไฟฟ้าระดับรากฐาน เรียบง่าย คล่องตัว เสถียรสูง'
    },
    {
        id: 'hyperion',
        nameEn: 'Hyperion Core 🔥',
        nameTh: 'แกนสุริยะไฮพีเรียน 🔥',
        icon: 'fa-fire-alt',
        bgClass: 'bg-orange-500/15',
        borderClass: 'border-orange-500/40',
        textColor: 'text-orange-500',
        cost: 100,
        effectClass: 'animate-pulse',
        descEn: 'Harness the core temperature of a stable solar microgrid cell.',
        descTh: 'จำลองพลังงานความร้อนสูงและเสถียรจากเตาปฏิกรณ์ไมโครกริดสุริยะ'
    },
    {
        id: 'vortex',
        nameEn: 'Chrono Vortex 🌀',
        nameTh: 'วังวนมิติโครโน 🌀',
        icon: 'fa-spinner',
        bgClass: 'bg-fuchsia-500/15',
        borderClass: 'border-fuchsia-500/40',
        textColor: 'text-fuchsia-400',
        effectClass: 'animate-spin [animation-duration:8s]',
        cost: 150,
        descEn: 'A rotating spacetime loop optimizing Peak Time-of-Use shifts.',
        descTh: 'วังวนแห่งกาลเวลาที่คอยหมุนเวียนโอนย้ายกระแสไฟช่วงออนพีคโดยสมบูรณ์'
    },
    {
        id: 'emerald',
        nameEn: 'Emerald Aegis 🛡️',
        nameTh: 'โล่ใบไม้เขียวขจี 🛡️',
        icon: 'fa-leaf',
        bgClass: 'bg-emerald-500/15',
        borderClass: 'border-emerald-500/40',
        textColor: 'text-emerald-400',
        effectClass: 'animate-bounce [animation-duration:3s]',
        cost: 200,
        descEn: 'Pulsates with biological grid harmony and 100% zero-carbon shield.',
        descTh: 'พลังพิทักษ์สีเขียวออร์แกนิก สะท้อนเป้าหมายคาร์บอนสุทธิเป็นศูนย์'
    },
    {
        id: 'neutron',
        nameEn: 'Neutron Orbit ☄️',
        nameTh: 'วงโคจรนิวตรอน ☄️',
        icon: 'fa-atom',
        bgClass: 'bg-cyan-500/15',
        borderClass: 'border-cyan-500/40',
        textColor: 'text-cyan-400',
        effectClass: 'animate-pulse',
        cost: 250,
        descEn: 'Subatomic particle stream smoothing voltage harmonics and power factors.',
        descTh: 'สายธารอนุภาคย่อยของอะตอม ช่วยสลายนอยส์ค่านอกพิสัยในกระแสกริด'
    },
    {
        id: 'nova',
        nameEn: 'Zenith Nova ✨',
        nameTh: 'ซุปเปอร์โนวาเซนิท ✨',
        icon: 'fa-star',
        bgClass: 'bg-amber-500/20 dark:bg-amber-500/30',
        borderClass: 'border-amber-400/50',
        textColor: 'text-amber-500',
        effectClass: 'animate-pulse shadow-inner',
        cost: 350,
        descEn: 'A golden stellar collapse bursting with micro-generator points.',
        descTh: 'การยุบตัวของดวงดาวทองคำ ปล่อยประกายพลังงานกริตอัจฉริยะล้นทะลัก'
    },
    {
        id: 'titan',
        nameEn: 'Quantum Titan 🤖',
        nameTh: 'ไททันควอนตัมสีแดง 🤖',
        icon: 'fa-robot',
        bgClass: 'bg-red-500/15',
        borderClass: 'border-red-500/40',
        textColor: 'text-red-400',
        cost: 500,
        descEn: 'Sleek dark red mainframe terminal core for maximum microgrid overclock.',
        descTh: 'โครงข่ายเมนเฟรมสีแดงสุดดุดัน โอเวอร์คล็อกความเร็วเกทเวย์ไมโครคอนโทรลเลอร์'
    }
];

export const QuestLeaderboard: React.FC<QuestLeaderboardProps> = ({
    lang,
    totalClaimedXp,
    claimedQuests,
    ecoStreak,
    activeQuests,
    handleClaimQuest,
    triggerConfetti
}) => {
    // 1. Gamification States
    const [hubTab, setHubTab] = useState<'challenges' | 'rewards' | 'shop'>('challenges');
    const [tokens, setTokens] = useState<number>(() => {
        try {
            const saved = localStorage.getItem('eudease_grid_tokens');
            if (saved !== null) return parseInt(saved, 10);
        } catch {}
        return 300; // Free starter tokens
    });

    const [unlockedSkins, setUnlockedSkins] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('eudease_unlocked_skins');
            if (saved) return JSON.parse(saved);
        } catch {}
        return ['default'];
    });

    const [currentAvatar, setCurrentAvatar] = useState<string>(() => {
        try {
            return localStorage.getItem('eudease_current_avatar') || 'default';
        } catch {}
        return 'default';
    });

    const [customLogoUrl, setCustomLogoUrl] = useState<string>(() => {
        try {
            return localStorage.getItem('eudease_custom_logo_url') || '';
        } catch {}
        return '';
    });

    const [imageUrlInput, setImageUrlInput] = useState(customLogoUrl);
    const [imageError, setImageError] = useState(false);
    const [selectedCompetitor, setSelectedCompetitor] = useState<any | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    // Calculate level details
    const lvl = useMemo(() => Math.floor(totalClaimedXp / 1000) + 1, [totalClaimedXp]);

    // Auto-rewards tokens when level increases
    useEffect(() => {
        try {
            const lastAwardedLvl = localStorage.getItem('eudease_last_awarded_lvl');
            const currentLvl = lvl;
            if (lastAwardedLvl) {
                const parsed = parseInt(lastAwardedLvl, 10);
                if (currentLvl > parsed) {
                    const diff = currentLvl - parsed;
                    const bonus = diff * 200; // 200 tokens per level up!
                    setTokens(prev => {
                        const next = prev + bonus;
                        localStorage.setItem('eudease_grid_tokens', next.toString());
                        return next;
                    });
                    localStorage.setItem('eudease_last_awarded_lvl', currentLvl.toString());
                    
                    showNotification(
                        lang === 'th' 
                            ? `🎉 เลเวลอัปเป็นระดับ ${currentLvl}! ได้รับโบนัส ${bonus} โทเค็นความดีกริด!` 
                            : `🎉 Leveled up to Level ${currentLvl}! Received ${bonus} Grid Tokens!`
                    );
                    if (triggerConfetti) triggerConfetti();
                }
            } else {
                localStorage.setItem('eudease_last_awarded_lvl', currentLvl.toString());
            }
        } catch (e) {}
    }, [lvl, lang, triggerConfetti]);

    // Keep tokens, skins, and avatars in sync when external components (like DailyEnergyQuests) edit them
    useEffect(() => {
        const handleStorageChange = () => {
            try {
                const savedTokens = localStorage.getItem('eudease_grid_tokens');
                if (savedTokens !== null) {
                    setTokens(parseInt(savedTokens, 10));
                }
                const savedSkins = localStorage.getItem('eudease_unlocked_skins');
                if (savedSkins) {
                    setUnlockedSkins(JSON.parse(savedSkins));
                }
                const savedAvatar = localStorage.getItem('eudease_current_avatar');
                if (savedAvatar) {
                    setCurrentAvatar(savedAvatar);
                }
            } catch {}
        };
        window.addEventListener('storage', handleStorageChange, { passive: true });
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Persist states
    const saveTokens = (val: number) => {
        setTokens(val);
        try {
            localStorage.setItem('eudease_grid_tokens', val.toString());
        } catch {}
    };

    const saveUnlockedSkins = (skins: string[]) => {
        setUnlockedSkins(skins);
        try {
            localStorage.setItem('eudease_unlocked_skins', JSON.stringify(skins));
        } catch {}
    };

    const saveCurrentAvatar = (avatar: string) => {
        setCurrentAvatar(avatar);
        try {
            localStorage.setItem('eudease_current_avatar', avatar);
            window.dispatchEvent(new Event('storage'));
        } catch {}
    };

    const saveCustomLogoUrl = (url: string) => {
        setCustomLogoUrl(url);
        try {
            localStorage.setItem('eudease_custom_logo_url', url);
            window.dispatchEvent(new Event('storage'));
        } catch {}
    };

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 4000);
    };

    const handleApplyCustomLogo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageUrlInput.trim()) {
            setImageError(true);
            return;
        }
        setImageError(false);
        saveCustomLogoUrl(imageUrlInput);
        saveCurrentAvatar('image');
        showNotification(lang === 'th' ? '✓ อัปเดตรูปลักษณ์โล่ด้วยภาพของคุณแล้ว!' : '✓ Updated your node avatar with custom image URL!');
        if (triggerConfetti) triggerConfetti();
    };

    const buySkin = (skin: GridSkin) => {
        if (tokens < skin.cost) {
            showNotification(lang === 'th' ? '❌ โทเค็นไม่เพียงพอ! มุ่งมั่นเคลมเควสเพิ่มเติมเพื่อรับแต้ม' : '❌ Insufficient tokens! Complete more energy quests.');
            return;
        }
        const nextTokens = tokens - skin.cost;
        const nextUnlocked = [...unlockedSkins, skin.id];
        saveTokens(nextTokens);
        saveUnlockedSkins(nextUnlocked);
        saveCurrentAvatar(skin.id);
        
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                const audioCtx = new AudioContext();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(659.25, audioCtx.currentTime); 
                osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); 
                osc.frequency.exponentialRampToValueAtTime(1318.51, audioCtx.currentTime + 0.3); 
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.4);
            }
        } catch {}

        showNotification(lang === 'th' ? `🎉 ปลดล็อคสกิน "${skin.nameTh}" สำเร็จ!` : `🎉 Successfully unlocked skin "${skin.nameEn}"!`);
        if (triggerConfetti) triggerConfetti();
    };

    const rollRandomSkin = () => {
        const locked = PLATFORM_SKINS.filter(s => !unlockedSkins.includes(s.id));
        if (locked.length === 0) {
            showNotification(lang === 'th' ? '✨ คุณมีสกินในแพลตฟอร์มครบถ้วนหมดแล้ว!' : '✨ You already unlocked all platform skins!');
            return;
        }
        if (tokens < 120) {
            showNotification(lang === 'th' ? '❌ ต้องใช้ 120 โทเค็นเพื่อสุ่มนำเข้าสกิน!' : '❌ Spend 120 tokens to roll a random platform skin!');
            return;
        }

        const picked = locked[Math.floor(Math.random() * locked.length)];
        const nextTokens = tokens - 120;
        const nextUnlocked = [...unlockedSkins, picked.id];
        saveTokens(nextTokens);
        saveUnlockedSkins(nextUnlocked);
        saveCurrentAvatar(picked.id);

        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                const audioCtx = new AudioContext();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, audioCtx.currentTime); 
                osc.frequency.exponentialRampToValueAtTime(554.37, audioCtx.currentTime + 0.1); 
                osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.2); 
                osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.35); 
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.5);
            }
        } catch {}

        showNotification(lang === 'th' ? `🎲 สุ่มได้สกินแรร์: "${picked.nameTh}"!` : `🎲 Rolled rare skin: "${picked.nameEn}"!`);
        if (triggerConfetti) triggerConfetti();
    };

    const renderActiveAvatar = (sizeClass = 'w-12 h-12', isLeaderboard = false) => {
        let sizeProp: 'sm' | 'md' | 'lg' | 'xl' | 'avatar' = 'lg';
        if (sizeClass.includes('w-20')) sizeProp = 'xl';
        else if (sizeClass.includes('w-10')) sizeProp = 'md';
        else if (sizeClass.includes('w-8')) sizeProp = 'sm';
        else if (sizeClass.includes('w-11') || sizeClass.includes('w-12')) sizeProp = 'lg';
        else sizeProp = 'avatar';

        return <GridCharacterSkin skinId={currentAvatar} size={sizeProp} customUrl={customLogoUrl} />;
    };

    // Neighbors Data
    const competitors = useMemo(() => [
        { 
            id: 'biovolt', 
            name: 'Node-401 (BioVolt Hub)', 
            xp: 2200, 
            skin: 'hyperion', 
            avatarIcon: '🔬', 
            quests: 5, 
            efficiency: '98.6%', 
            pf: 0.98,
            descTh: 'ศูนย์วิจัยพลังงานชีวภาพและแผงเซลล์แสงอาทิตย์สองหน้า',
            descEn: 'Bifacial solar array and biological fuel cell research hub.'
        },
        { 
            id: 'ecodojo', 
            name: 'Node-115 (Eco-Dojo)', 
            xp: 1550, 
            skin: 'emerald', 
            avatarIcon: '🍃', 
            quests: 4, 
            efficiency: '97.2%', 
            pf: 0.96,
            descTh: 'อาคารเรียนวิถีรักษ์โลก มุ่งเน้นการตัดสแตนด์บายสวิตช์สูงสุด',
            descEn: 'Zero-emission martial arts dojo with automated micro-breakers.'
        },
        { 
            id: 'solarnest', 
            name: 'Node-707 (Solar-Nest Villa)', 
            xp: 1100, 
            skin: 'vortex', 
            avatarIcon: '☀️', 
            quests: 3, 
            efficiency: '95.4%', 
            pf: 0.95,
            descTh: 'บ้านอัจฉริยะระบบควบคุมการกระจายพลังงานแบตเตอรี่สำรอง',
            descEn: 'Modern smart villa using time-of-use schedule automation.'
        },
        { 
            id: 'cyberap', 
            name: 'Node-982 (Cyber-Grid Tech)', 
            xp: 500, 
            skin: 'neutron', 
            avatarIcon: '🤖', 
            quests: 1, 
            efficiency: '94.1%', 
            pf: 0.92,
            descTh: 'โหนดสตาร์ทอัพเทคโนโลยี ซอฟต์แวร์วิเคราะห์กริดความเร็วสูง',
            descEn: 'Distributed AI processing startup using grid harmonic smoothers.'
        }
    ], []);

    const fullLeaderboard = useMemo(() => {
        const userNode = {
            id: 'user',
            name: lang === 'th' ? 'คุณ (ผู้พิทักษ์โครงข่าย)' : 'You (Grid Guardian)',
            xp: totalClaimedXp,
            skin: currentAvatar,
            isUser: true,
            quests: Object.values(claimedQuests).filter(Boolean).length,
            efficiency: '99.1%',
            pf: 0.99,
            descTh: 'สถานีควบคุมหลักของคุณ เชื่อมต่อกับโครงข่ายไฟอัจฉริยะ',
            descEn: 'Your master terminal node synchronized with the smart grid.'
        };

        const list = [userNode, ...competitors];
        return list.sort((a, b) => b.xp - a.xp);
    }, [totalClaimedXp, currentAvatar, competitors, lang, claimedQuests]);

    return (
        <div className="space-y-8 text-dark animate-fade-in" id="quest-leaderboard-component">
            
            {/* Ambient Notification Banner */}
            <AnimatePresence>
                {notification && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-6 right-6 z-[9999] bg-slate-900 text-white font-display font-bold text-xs py-3.5 px-6 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>{notification}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sub navigation Tabs */}
            <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-2xl w-fit">
                <button 
                    onClick={() => setHubTab('challenges')}
                    className={`btn btn-sm px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-2 border-0 ${
                        hubTab === 'challenges' 
                            ? 'bg-white dark:bg-slate-800 text-primary shadow-sm font-bold' 
                            : 'bg-transparent text-muted hover:opacity-85'
                    }`}
                >
                    <i className="fas fa-tasks"></i>
                    {lang === 'th' ? 'ภารกิจเก็บคะแนน' : 'Eco-Quests'}
                </button>
                <button 
                    onClick={() => setHubTab('rewards')}
                    className={`btn btn-sm px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-2 border-0 ${
                        hubTab === 'rewards' 
                            ? 'bg-white dark:bg-slate-800 text-primary shadow-sm font-bold' 
                            : 'bg-transparent text-muted hover:opacity-85'
                    }`}
                >
                    <i className="fas fa-gift"></i>
                    {lang === 'th' ? 'คลังของรางวัลสกิน' : 'My Rewards & Skins'}
                </button>
                <button 
                    onClick={() => setHubTab('shop')}
                    className={`btn btn-sm px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-2 border-0 ${
                        hubTab === 'shop' 
                            ? 'bg-white dark:bg-slate-800 text-primary shadow-sm font-bold' 
                            : 'bg-transparent text-muted hover:opacity-85'
                    }`}
                >
                    <i className="fas fa-store"></i>
                    {lang === 'th' ? 'ร้านค้าสกิน & ตู้สุ่ม' : 'Skins Shop'}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {hubTab === 'challenges' ? (
                    <motion.div 
                        key="challenges"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="space-y-6"
                    >
                        {/* active quests list from props */}
                        <div className="row g-4">
                            <div className="col-12 col-lg-8">
                                <div className="dashboard-card border-0 p-6 md:p-8 bg-card rounded-[2.5rem] shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h5 className="font-display font-black text-base md:text-lg mb-0.5 uppercase">
                                                {lang === 'th' ? 'ภารกิจประหยัดพลังงานกรีนกริต' : 'Smart Grid Saving Quests'}
                                            </h5>
                                            <p className="text-[0.75rem] text-muted mb-0">{lang === 'th' ? 'รันโหมดพลังงานประหยัดเพื่อจบเควสสะสมคะแนนกริตและคาร์บอนชีวภาพ' : 'Complete sandbox requirements to earn green points and unlock bonus tokens.'}</p>
                                        </div>
                                        <div className="text-end shrink-0">
                                            <span className="text-xs font-black text-emerald-500 font-mono bg-emerald-500/10 px-3 py-1.5 rounded-xl">
                                                🏆 {activeQuests.filter(q => claimedQuests[q.id]).length} / {activeQuests.length} {lang === 'th' ? 'รับรางวัลแล้ว' : 'Claimed'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {activeQuests.map((quest) => {
                                            const isClaimed = !!claimedQuests[quest.id];
                                            return (
                                                <div 
                                                    key={quest.id} 
                                                    className={`p-4 md:p-5 rounded-[2rem] border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                                                        isClaimed 
                                                            ? 'bg-slate-500/5 border-slate-200 dark:border-slate-800 opacity-60' 
                                                            : quest.completed 
                                                                ? 'bg-emerald-500/5 border-emerald-500/30 shadow-emerald-500/5 shadow-md animate-pulse' 
                                                                : 'bg-light border-transparent'
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-4 flex-grow">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-sm shrink-0 ${
                                                            isClaimed 
                                                                ? 'bg-slate-300 text-slate-500' 
                                                                : quest.completed 
                                                                    ? 'bg-emerald-500 text-white' 
                                                                    : 'bg-white text-muted border'
                                                        }`}>
                                                            {isClaimed ? (
                                                                <i className="fas fa-check-double text-slate-400"></i>
                                                            ) : quest.completed ? (
                                                                <i className="fas fa-gift text-white"></i>
                                                            ) : (
                                                                <i className="fas fa-hourglass-half text-muted"></i>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h6 className={`font-black text-sm md:text-base mb-1 tracking-tight text-dark ${isClaimed ? 'line-through text-muted opacity-55' : ''}`}>
                                                                {lang === 'th' ? quest.titleTh : quest.titleEn}
                                                            </h6>
                                                            <p className="text-xs text-muted leading-relaxed mb-2 max-w-xl">
                                                                {lang === 'th' ? quest.descTh : quest.descEn}
                                                            </p>
                                                            <span className="badge bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[0.7rem] font-bold py-1 px-2.5 rounded-lg font-mono">
                                                                🏆 {lang === 'th' ? quest.rewardTh : quest.rewardEn} (+50 GT)
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="shrink-0 w-full md:w-auto">
                                                        {isClaimed ? (
                                                            <button disabled className="btn btn-outline-secondary w-full md:w-auto rounded-xl px-4 py-2 text-xs font-black uppercase text-slate-500 border-light">
                                                                {lang === 'th' ? "รับแล้ว ✓" : "Claimed ✓"}
                                                            </button>
                                                        ) : quest.completed ? (
                                                            <button 
                                                                onClick={() => {
                                                                    handleClaimQuest(quest.id);
                                                                    // Reward 150 tokens as well on claiming!
                                                                    saveTokens(tokens + 150);
                                                                    showNotification(lang === 'th' ? `🎉 รับรางวัลสำเร็จ! +150 GT` : `🎉 Quest Claimed! Received 150 GT`);
                                                                    if (triggerConfetti) triggerConfetti();
                                                                }}
                                                                className="btn text-white w-full md:w-auto rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer bg-emerald-500"
                                                            >
                                                                <i className="fas fa-star text-amber-300"></i>
                                                                {lang === 'th' ? "รับรางวัล 🎉" : "Claim Reward 🎉"}
                                                            </button>
                                                        ) : (
                                                            <button disabled className="btn btn-light w-full md:w-auto rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-400 border flex items-center justify-center gap-2">
                                                                <span className="spinner-border spinner-border-sm text-slate-400" role="status" style={{ width: '10px', height: '10px', borderWidth: '1.5px' }} />
                                                                {lang === 'th' ? "กำลังดำเนินการ..." : "In Progress..."}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Badges of Honor */}
                            <div className="col-12 col-lg-4">
                                <div className="dashboard-card border-0 p-6 md:p-8 bg-card rounded-[2.5rem] shadow-sm h-100 flex flex-col justify-between">
                                    <div>
                                        <h5 className="font-display font-black text-base md:text-lg mb-4 uppercase">
                                            {lang === 'th' ? 'เหรียญตราเกียรติยศกรีด' : 'Grid Badges of Honor'}
                                        </h5>
                                        <p className="text-xs text-muted mb-6 leading-relaxed">
                                            {lang === 'th' ? 'เหรียญเกียรติยศจะถูกปลดล็อกโดยอัตโนมัติเมื่อคุณรักษากระแสไฟฟ้าและคุมค่าบิลให้อยู่ในเกณฑ์ประหยัดเสถียร' : 'These prestigious badges are dynamically earned by sustaining efficient grid standards and keeping standby leakages under control.'}
                                        </p>

                                        <div className="space-y-3">
                                            {[
                                                { id: 'smart_grid', icon: 'fa-bolt', color: 'emerald', nameEn: 'Sync Master', nameTh: 'จ้าวกริตประสานพลัง', label: 'All AI Eco Modes On' },
                                                { id: 'zero_standby', icon: 'fa-power-off', color: 'blue', nameEn: 'Standby Slayer', nameTh: 'ผู้สยบไฟไหลซึม', label: 'Closed Appliance Standby' },
                                                { id: 'budget_champion', icon: 'fa-shield-alt', color: 'indigo', nameEn: 'Budget Defender', nameTh: 'โล่คุ้มค่างบประมาณ', label: 'Kept Bill Below Budget' },
                                                { id: 'pf_saint', icon: 'fa-wave-square', color: 'cyan', nameEn: 'Harmonic Saint', nameTh: 'นักพรตเพาเวอร์แฟกเตอร์', label: 'Average PF Above 0.97' },
                                                { id: 'load_shifter', icon: 'fa-clock', color: 'purple', nameEn: 'Time Traveler', nameTh: 'นักสลับเวลาโหลด', label: 'On Peak Share < 45%' },
                                                { id: 'grid_commander', icon: 'fa-network-wired', color: 'pink', nameEn: 'Mesh Overseer', nameTh: 'จอมทัพกระจายโหลด', label: 'Connected 5+ IoT Nodes' },
                                            ].map(badge => {
                                                const isUnlocked = !!claimedQuests[badge.id];
                                                return (
                                                    <div 
                                                        key={badge.id} 
                                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl border transition-all ${
                                                            isUnlocked 
                                                                ? `bg-${badge.color}-500/5 border-${badge.color}-500/25 text-dark` 
                                                                : 'bg-slate-100/30 border-transparent text-slate-400 opacity-40'
                                                        }`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                                                            isUnlocked ? 'bg-primary text-white shadow-sm' : 'bg-white text-muted border'
                                                        }`}>
                                                            <i className={`fas ${badge.icon}`}></i>
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-[0.75rem] tracking-tight text-dark uppercase">
                                                                {lang === 'th' ? badge.nameTh : badge.nameEn}
                                                            </div>
                                                            <span className="text-[0.65rem] text-muted font-bold font-mono uppercase tracking-wider block">
                                                                {isUnlocked ? (lang === 'th' ? "ปลดล็อคแล้ว ✓" : "Unlocked ✓") : badge.label}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : hubTab === 'rewards' ? (
                    <motion.div 
                        key="rewards"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="row g-4"
                    >
                        {/* Profile & Avatar Details */}
                        <div className="col-12 col-lg-5">
                            <div className="dashboard-card border-0 p-6 md:p-8 bg-card text-dark rounded-[2.5rem] relative overflow-hidden shadow-sm h-100 flex flex-col justify-between">
                                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-[50px] pointer-events-none"></div>
                                
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h5 className="font-display font-black text-base md:text-lg mb-0 tracking-tight text-dark uppercase">
                                            {lang === 'th' ? 'ข้อมูลโหนด & รูปลักษณ์ประจำตัว' : 'Guardian Profile Identity'}
                                        </h5>
                                        <div className="badge bg-primary/10 text-primary border border-primary/20 text-[0.75rem] font-bold py-1 px-2.5 rounded-lg font-mono">
                                            LVL {lvl}
                                        </div>
                                    </div>

                                    {/* Big Character Showcase Card */}
                                    <div className="p-6 rounded-3xl bg-light border mb-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                        <div className="mb-4">
                                            <GridCharacterSkin skinId={currentAvatar} size="avatar" customUrl={customLogoUrl} />
                                        </div>
                                        <div>
                                            <h6 className="font-black text-lg mb-1 text-dark uppercase tracking-tight">
                                                {currentAvatar === 'image' 
                                                    ? (lang === 'th' ? 'โลโก้ที่อัปโหลดเอง' : 'Custom Uploaded Node') 
                                                    : (lang === 'th' 
                                                        ? PLATFORM_SKINS.find(s => s.id === currentAvatar)?.nameTh 
                                                        : PLATFORM_SKINS.find(s => s.id === currentAvatar)?.nameEn)}
                                            </h6>
                                            <p className="text-[0.75rem] text-muted mb-3 font-mono uppercase tracking-wider">
                                                {lang === 'th' ? 'สกินที่ติดตั้งในปัจจุบัน' : 'Currently Equipped Skin'}
                                            </p>
                                            <div className="flex flex-wrap items-center justify-center gap-2">
                                                <div className="text-xs font-black text-orange-500 font-mono bg-orange-500/10 px-2.5 py-1 rounded-xl">
                                                    🔥 {ecoStreak} {lang === 'th' ? 'วันประหยัด' : 'Days Streak'}
                                                </div>
                                                <div className="text-xs font-black text-emerald-500 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-xl">
                                                    🏆 {totalClaimedXp} XP
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tokens Vault Balance */}
                                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 flex items-center justify-between gap-4 mb-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-1 opacity-10">
                                            <i className="fas fa-coins text-4xl"></i>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-lg font-bold shadow-sm shrink-0 animate-pulse">
                                                <i className="fas fa-coins"></i>
                                            </div>
                                            <div>
                                                <span className="text-[0.65rem] text-muted font-bold uppercase tracking-widest font-mono block">
                                                    {lang === 'th' ? 'โทเค็นสะสมของคุณ' : 'Your Token Wallet'}
                                                </span>
                                                <span className="font-mono font-black text-xl text-amber-600 block">
                                                    {tokens} GT
                                                </span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                const bonus = 100;
                                                saveTokens(tokens + bonus);
                                                showNotification(lang === 'th' ? `💰 เคลมเหรียญโบนัสประหยัดสำเร็จ +${bonus} GT!` : `💰 Claimed level energy bonus +${bonus} GT!`);
                                                if (triggerConfetti) triggerConfetti();
                                            }}
                                            className="btn btn-xs py-2 px-3 bg-amber-500 hover:bg-amber-600 border-0 text-white font-black text-[0.7rem] uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 whitespace-nowrap"
                                        >
                                            <i className="fas fa-plus mr-1"></i> {lang === 'th' ? 'เคลมโบนัสรายวัน' : 'Claim Daily Bonus'}
                                        </button>
                                    </div>

                                    {/* Custom URL Option */}
                                    <form onSubmit={handleApplyCustomLogo} className="space-y-2 mb-2">
                                        <label className="text-[0.75rem] font-bold text-muted uppercase tracking-wider block">
                                            {lang === 'th' ? '🔗 ระบุรูปภาพโหนดของคุณเอง (Image URL)' : '🔗 Custom Node Image Logo URL'}
                                        </label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="url" 
                                                value={imageUrlInput}
                                                onChange={(e) => setImageUrlInput(e.target.value)}
                                                placeholder="https://images.unsplash.com/photo-..." 
                                                className="form-control rounded-xl text-xs bg-light border-slate-200 dark:border-slate-800 text-dark placeholder:text-slate-400 py-2"
                                            />
                                            <button 
                                                type="submit"
                                                className="btn btn-primary text-white font-black text-xs px-3.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
                                            >
                                                {lang === 'th' ? 'ใช้งานรูปภาพ' : 'Apply'}
                                            </button>
                                        </div>
                                        {imageError && (
                                            <p className="text-[0.75rem] text-red-500 mt-1">*{lang === 'th' ? 'กรุณากรอก URL ลิงก์รูปภาพที่ถูกต้อง' : 'Please input a valid image url link'}</p>
                                        )}
                                    </form>
                                </div>

                                <span className="text-[0.7rem] text-muted italic mt-4 block">
                                    {lang === 'th' ? '💡 คุณจะได้รับ 200 โทเค็นโดยอัตโนมัติ ทุกครั้งที่เลเวลอัป!' : '💡 Earn 200 Grid Tokens automatically on every single level-up!'}
                                </span>
                            </div>
                        </div>

                        {/* Unlocked Skins Collection */}
                        <div className="col-12 col-lg-7">
                            <div className="dashboard-card border-0 p-6 md:p-8 bg-card text-dark rounded-[2.5rem] shadow-sm h-100 flex flex-col justify-between">
                                <div>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                        <div>
                                            <h5 className="font-display font-black text-base md:text-lg mb-0.5 tracking-tight text-dark uppercase">
                                                {lang === 'th' ? 'คลังสะสมดิจิทัลสกินผู้พิทักษ์ 🛡️' : 'My Earned Digital Skins Vault 🛡️'}
                                            </h5>
                                            <p className="text-[0.75rem] text-muted mb-0">{lang === 'th' ? 'เลือกสวมใส่สกินตัวละครที่ปลดล็อกแล้วเป็นภาพโหนดโปรไฟล์ของคุณ' : 'Browse earned character skins and equip unlocked ones as your profile avatar.'}</p>
                                        </div>
                                        <button 
                                            onClick={() => setHubTab('shop')}
                                            className="btn btn-sm text-primary font-black text-[0.75rem] uppercase tracking-wider rounded-xl bg-primary/10 hover:bg-primary/20 border-0 flex items-center gap-1.5 cursor-pointer py-2 px-3"
                                        >
                                            <i className="fas fa-shopping-bag"></i>
                                            {lang === 'th' ? 'ไปร้านค้าสกิน' : 'Visit Skin Shop'}
                                        </button>
                                    </div>

                                    {/* Skins Grid */}
                                    <div className="row g-3 mb-6">
                                        {PLATFORM_SKINS.map((skin) => {
                                            const isUnlocked = unlockedSkins.includes(skin.id);
                                            const isSelected = currentAvatar === skin.id;
                                            
                                            return (
                                                <div key={skin.id} className="col-12 col-sm-6">
                                                    <div className={`p-4 rounded-2xl border transition-all h-100 flex flex-col justify-between ${
                                                        isSelected 
                                                            ? 'bg-primary/5 border-primary shadow-sm scale-[1.02]' 
                                                            : isUnlocked 
                                                                ? 'bg-light border-slate-200 dark:border-slate-800 hover:border-slate-300' 
                                                                : 'bg-slate-100/30 dark:bg-slate-900/10 border-dashed border-slate-200 opacity-50'
                                                    }`}>
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <GridCharacterSkin skinId={skin.id} size="lg" />
                                                            <div>
                                                                <div className="font-black text-xs tracking-tight text-dark uppercase">
                                                                    {lang === 'th' ? skin.nameTh : skin.nameEn}
                                                                </div>
                                                                <span className="text-[0.65rem] text-muted font-bold font-mono uppercase tracking-wider block">
                                                                    {isUnlocked ? (lang === 'th' ? 'ปลดล็อกแล้ว' : 'UNLOCKED') : (lang === 'th' ? 'ยังไม่ปลดล็อก' : 'LOCKED')}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-[0.75rem] text-muted leading-relaxed mb-3">
                                                                {lang === 'th' ? skin.descTh : skin.descEn}
                                                            </p>

                                                            {isSelected ? (
                                                                <button disabled className="btn btn-xs w-full py-1.5 text-[0.7rem] font-black uppercase text-emerald-500 bg-emerald-500/10 border-0 rounded-xl">
                                                                    <i className="fas fa-check-circle mr-1"></i> {lang === 'th' ? 'สวมใส่อยู่ ✓' : 'Currently Equipped ✓'}
                                                                </button>
                                                            ) : isUnlocked ? (
                                                                <button 
                                                                    onClick={() => {
                                                                        saveCurrentAvatar(skin.id);
                                                                        showNotification(lang === 'th' ? `ติดตั้ง "${skin.nameTh}" สำเร็จ!` : `Successfully equipped "${skin.nameEn}"!`);
                                                                    }}
                                                                    className="btn btn-xs w-full py-1.5 text-[0.7rem] font-black uppercase btn-primary text-white rounded-xl cursor-pointer"
                                                                >
                                                                    {lang === 'th' ? 'ติดตั้งใช้งาน' : 'Equip Character'}
                                                                </button>
                                                            ) : (
                                                                <button 
                                                                    onClick={() => setHubTab('shop')}
                                                                    className="btn btn-xs w-full py-1.5 text-[0.7rem] font-black uppercase bg-slate-200 text-slate-500 border-0 rounded-xl cursor-pointer hover:bg-slate-300"
                                                                >
                                                                    <i className="fas fa-lock text-[0.65rem] mr-1"></i> {lang === 'th' ? 'ซื้อสกินโชว์รูม' : 'Unlock in Shop'}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Custom Image entry as skin option if custom URL exists */}
                                        {customLogoUrl && (
                                            <div className="col-12 col-sm-6">
                                                <div className={`p-4 rounded-2xl border transition-all h-100 flex flex-col justify-between ${
                                                    currentAvatar === 'image' 
                                                        ? 'bg-primary/5 border-primary shadow-sm scale-[1.02]' 
                                                        : 'bg-light border-slate-200 dark:border-slate-800 hover:border-slate-300'
                                                }`}>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <GridCharacterSkin skinId="image" size="lg" customUrl={customLogoUrl} />
                                                        <div>
                                                            <div className="font-black text-xs tracking-tight text-dark uppercase">
                                                                {lang === 'th' ? 'โลโก้ที่อัปโหลดเอง' : 'Custom Upload'}
                                                            </div>
                                                            <span className="text-[0.65rem] text-muted font-bold font-mono uppercase tracking-wider block">
                                                                EXTERNAL URL
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="text-[0.75rem] text-muted leading-relaxed mb-3">
                                                            {lang === 'th' ? 'สลับมาใช้งานรูปโลโก้ภาพที่คุณระบุลิงก์ไว้ด้วยตัวเอง' : 'Switch back to your custom-linked web graphics.'}
                                                        </p>

                                                        {currentAvatar === 'image' ? (
                                                            <button disabled className="btn btn-xs w-full py-1.5 text-[0.7rem] font-black uppercase text-emerald-500 bg-emerald-500/10 border-0 rounded-xl">
                                                                <i className="fas fa-check-circle mr-1"></i> {lang === 'th' ? 'สวมใส่อยู่ ✓' : 'Currently Equipped ✓'}
                                                            </button>
                                                        ) : (
                                                            <button 
                                                                onClick={() => {
                                                                    saveCurrentAvatar('image');
                                                                    showNotification(lang === 'th' ? 'สลับมาใช้โลโก้อัปโหลดสำเร็จ!' : 'Switched to custom upload logo!');
                                                                }}
                                                                className="btn btn-xs w-full py-1.5 text-[0.7rem] font-black uppercase btn-primary text-white rounded-xl cursor-pointer"
                                                            >
                                                                {lang === 'th' ? 'ติดตั้งใช้งาน' : 'Equip Custom'}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="shop"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="space-y-6"
                    >
                        {/* Lucky Roll Display & Shop */}
                        <div className="dashboard-card border-0 p-6 md:p-8 bg-card text-dark rounded-[2.5rem] shadow-sm">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <h5 className="font-display font-black text-base md:text-lg mb-0.5 tracking-tight text-dark uppercase">
                                        {lang === 'th' ? 'ตู้เสี่ยงทาย & โชว์รูมสกินใหม่ 🎰' : 'Lucky Draw & Character Shop 🎰'}
                                    </h5>
                                    <p className="text-[0.75rem] text-muted mb-0">{lang === 'th' ? 'สุ่มรับดิจิทัลสกินตัวละครแบบ Limited Edition หรือเลือกซื้อสกินที่คุณถูกใจได้ทันที!' : 'Roll for special character overlays or unlock specific premium skins using GT.'}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-xs font-mono font-black text-amber-600 bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/20">
                                        🪙 {tokens} GT
                                    </div>
                                    <button 
                                        onClick={rollRandomSkin}
                                        className="btn btn-sm text-white font-black text-[0.75rem] uppercase tracking-wider rounded-xl shadow-md py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 flex items-center gap-1.5 cursor-pointer animate-bounce"
                                    >
                                        <i className="fas fa-dice animate-spin [animation-duration:3s]"></i>
                                        {lang === 'th' ? 'เสี่ยงสุ่มสกิน (120 GT)' : 'Lucky Roll (120 GT)'}
                                    </button>
                                </div>
                            </div>

                            {/* Shop Cards Grid */}
                            <div className="row g-3">
                                {PLATFORM_SKINS.map((skin) => {
                                    const isUnlocked = unlockedSkins.includes(skin.id);
                                    const isSelected = currentAvatar === skin.id;
                                    
                                    return (
                                        <div key={skin.id} className="col-12 col-sm-6 col-md-4">
                                            <div className={`p-4 rounded-2xl border transition-all h-100 flex flex-col justify-between ${
                                                isSelected 
                                                    ? 'bg-primary/5 border-primary scale-[1.02] shadow-md' 
                                                    : isUnlocked 
                                                        ? 'bg-light border-slate-200 opacity-80' 
                                                        : 'bg-light/40 border-slate-200 hover:border-slate-300'
                                            }`}>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <GridCharacterSkin skinId={skin.id} size="lg" />
                                                    <div>
                                                        <div className="font-black text-xs tracking-tight text-dark uppercase">
                                                            {lang === 'th' ? skin.nameTh : skin.nameEn}
                                                        </div>
                                                        <span className="text-[0.65rem] text-muted font-bold font-mono block">
                                                            {skin.cost === 0 ? 'DEFAULT (FREE)' : `COST: ${skin.cost} GT`}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-[0.75rem] text-muted leading-relaxed mb-4">
                                                    {lang === 'th' ? skin.descTh : skin.descEn}
                                                </p>

                                                <div>
                                                    {isUnlocked ? (
                                                        <div className="flex gap-2">
                                                            <button disabled className="btn btn-xs w-1/2 py-1.5 text-[0.7rem] font-black uppercase text-emerald-500 bg-emerald-500/10 border-0 rounded-xl">
                                                                {lang === 'th' ? 'เป็นเจ้าของแล้ว' : 'Owned ✓'}
                                                            </button>
                                                            <button 
                                                                onClick={() => {
                                                                    setHubTab('rewards');
                                                                    showNotification(lang === 'th' ? 'ไปที่แท็บคลังสกินเพื่อสวมใส่!' : 'Go to My Rewards tab to equip!');
                                                                }}
                                                                className="btn btn-xs w-1/2 py-1.5 text-[0.7rem] font-black uppercase btn-outline-primary rounded-xl cursor-pointer"
                                                            >
                                                                {lang === 'th' ? 'ไปคลัง' : 'Vault'}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button 
                                                            onClick={() => buySkin(skin)}
                                                            className="btn btn-xs w-full py-1.5 text-[0.7rem] font-black uppercase bg-amber-500 hover:bg-amber-600 border-0 text-white rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                                                        >
                                                            <i className="fas fa-shopping-cart text-[0.65rem]"></i>
                                                            {lang === 'th' ? `ปลดล็อค (${skin.cost} GT)` : `Unlock (${skin.cost} GT)`}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Zero-Carbon Microgrid Leaderboard Rank List */}
            <div className="dashboard-card border-0 p-6 md:p-8 bg-card rounded-[2.5rem] shadow-sm animate-slide-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-lg shadow-sm border border-amber-500/10">
                            <i className="fas fa-medal animate-bounce"></i>
                        </div>
                        <div>
                            <h4 className="font-display font-black text-lg md:text-xl mb-0.5 tracking-tight text-dark uppercase">
                                {lang === 'th' ? 'ทำเนียบขุนพลผู้พิทักษ์คาร์บอนสุทธิเป็นศูนย์' : 'Zero-Carbon Microgrid Leaderboard'}
                            </h4>
                            <p className="text-[0.75rem] text-amber-500 font-bold uppercase tracking-wider font-mono mb-0">Local Microgrid Sandbox Rankings</p>
                        </div>
                    </div>
                    <span className="text-[0.7rem] text-muted font-bold font-mono bg-light px-3 py-1.5 rounded-full border">
                        <i className="fas fa-satellite mr-1"></i> {lang === 'th' ? 'อัปเดตสถิติจริงผ่านระบบ IoT' : 'REAL-TIME IOT SENSOR NODE NETWORK'}
                    </span>
                </div>

                <p className="text-xs text-muted mb-6 max-w-3xl leading-relaxed">
                    {lang === 'th' 
                        ? 'จัดอันดับโหนดความถี่สูงในระบบจำลองละแวกบ้านของคุณ ตามผลคะแนนกรีนกริดที่เคลมสิทธิ์ได้จากภารกิจพลังงานเสถียร ท่านสามารถคลิกที่โหนดเพื่อวิเคราะห์ความต้านทานไฟฟ้าหรือส่งกำลังใจเชิงความถี่ประสานกริตได้' 
                        : 'Local residential microgrid nodes competing to support regional grid stability. Earn green points by completing and claiming eco-quests, customize your node logo banner, and rise through the sandbox community ladder!'}
                </p>

                <div className="space-y-3.5">
                    {fullLeaderboard.map((node, index) => {
                        const isSelf = !!node.isUser;
                        
                        const renderLeaderboardAvatar = () => {
                            if (isSelf) {
                                return renderActiveAvatar('w-11 h-11', true);
                            }
                            return <GridCharacterSkin skinId={node.skin || 'default'} size="lg" />;
                        };

                        return (
                            <motion.div 
                                key={node.id}
                                whileHover={{ scale: 1.01 }}
                                className={`p-4 rounded-[2rem] border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer ${
                                    isSelf 
                                        ? 'bg-primary/5 border-primary/40 shadow-md shadow-primary/5' 
                                        : 'bg-light/75 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                                }`}
                                onClick={() => setSelectedCompetitor(node)}
                            >
                                <div className="flex items-center gap-4 flex-grow">
                                    <div className={`w-8 h-8 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 ${
                                        index === 0 
                                            ? 'bg-amber-400 text-white shadow-md' 
                                            : index === 1 
                                                ? 'bg-slate-400 text-white shadow-md' 
                                                : index === 2 
                                                    ? 'bg-amber-700 text-white shadow-md' 
                                                    : 'bg-slate-200 text-slate-600 dark:bg-slate-800'
                                    }`}>
                                        {index + 1}
                                    </div>

                                    {renderLeaderboardAvatar()}

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h6 className={`font-black text-sm md:text-base mb-0 tracking-tight text-dark ${isSelf ? 'text-primary' : ''}`}>
                                                {node.name}
                                            </h6>
                                            {isSelf && (
                                                <span className="text-[0.65rem] font-mono font-black bg-primary text-white uppercase px-1.5 py-0.5 rounded-lg animate-pulse shrink-0">
                                                    {lang === 'th' ? 'โหนดของคุณ' : 'YOUR NODE'}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[0.8rem] text-muted leading-relaxed mb-0 mt-0.5 max-w-xl line-clamp-1">
                                            {lang === 'th' ? node.descTh : node.descEn}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-light pt-3.5 md:pt-0">
                                    <div className="flex gap-4 text-left md:text-right font-mono text-[0.75rem] text-muted">
                                        <div>
                                            <span className="block uppercase tracking-wider text-[0.65rem] font-bold">{lang === 'th' ? 'ประสิทธิผลไฟฟ้า' : 'GRID EFFICIENCY'}</span>
                                            <span className="font-bold text-dark text-xs block">{node.efficiency}</span>
                                        </div>
                                        <div>
                                            <span className="block uppercase tracking-wider text-[0.65rem] font-bold">POWER FACTOR</span>
                                            <span className="font-bold text-emerald-500 text-xs block">PF {node.pf}</span>
                                        </div>
                                        <div>
                                            <span className="block uppercase tracking-wider text-[0.65rem] font-bold">{lang === 'th' ? 'เคลมเควส' : 'QUESTS'}</span>
                                            <span className="font-bold text-indigo-500 text-xs block">{node.quests} / 7</span>
                                        </div>
                                    </div>

                                    <div className="text-right shrink-0">
                                        <div className="font-mono font-black text-sm text-dark">{node.xp} XP</div>
                                        <span className="text-[0.65rem] text-muted font-bold font-mono tracking-wider block">GREEN POINTS</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Competitor Node details modal */}
            <AnimatePresence>
                {selectedCompetitor && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-card text-dark rounded-[2.5rem] border border-light max-w-md w-full p-6 md:p-8 shadow-2xl relative my-auto max-h-[95vh] overflow-y-auto"
                        >
                            <button 
                                onClick={() => setSelectedCompetitor(null)}
                                className="absolute top-6 right-6 text-muted hover:text-dark border-0 bg-transparent cursor-pointer text-lg"
                            >
                                <i className="fas fa-times"></i>
                            </button>

                            <div className="text-center mb-6">
                                <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-2xl mx-auto mb-4 border border-primary/20">
                                    <i className="fas fa-microchip"></i>
                                </div>
                                <h5 className="font-display font-black text-lg mb-1">{selectedCompetitor.name}</h5>
                                <span className="text-[0.7rem] text-muted font-bold font-mono uppercase tracking-widest bg-light px-2.5 py-1 rounded-full border">
                                    NODE TELEMETRY METRIC SIGNATURE
                                </span>
                            </div>

                            <div className="space-y-4 mb-6 text-xs text-muted leading-relaxed">
                                <p className="text-center italic">
                                    "{lang === 'th' ? selectedCompetitor.descTh : selectedCompetitor.descEn}"
                                </p>
                                
                                <div className="border-t border-light pt-4 space-y-2.5 font-mono text-xs">
                                    <div className="flex justify-between">
                                        <span>{lang === 'th' ? 'ระดับคะแนนสะสม' : 'Green Points Total'}:</span>
                                        <strong className="text-dark">{selectedCompetitor.xp} XP</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{lang === 'th' ? 'ประสิทธิภาพโหนด' : 'Telemetry Efficiency'}:</span>
                                        <strong className="text-dark">{selectedCompetitor.efficiency}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{lang === 'th' ? 'เพาเวอร์แฟกเตอร์เฉลี่ย' : 'Power Factor average'}:</span>
                                        <strong className="text-emerald-500">PF {selectedCompetitor.pf}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{lang === 'th' ? 'เควสประหยัดไฟสำเร็จ' : 'Quests Cleared'}:</span>
                                        <strong className="text-indigo-500">{selectedCompetitor.quests} / 7</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <button 
                                    onClick={() => {
                                        showNotification(lang === 'th' ? `✨ ส่งแรงกระเพื่อมกำลังงานบวกไปยัง ${selectedCompetitor.name} แล้ว!` : `✨ Sent grid resonance synergy handshake to ${selectedCompetitor.name}!`);
                                        setSelectedCompetitor(null);
                                    }}
                                    className="btn btn-primary text-white py-3 font-black text-xs rounded-xl cursor-pointer shadow-md"
                                >
                                    <i className="fas fa-satellite-dish mr-1"></i> {lang === 'th' ? 'ส่งจิตประสานกริด' : 'Sync Synergy'}
                                </button>
                                <button 
                                    onClick={() => setSelectedCompetitor(null)}
                                    className="btn btn-light py-3 font-black text-xs rounded-xl cursor-pointer border"
                                >
                                    {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
