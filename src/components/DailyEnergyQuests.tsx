import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DailyEnergyQuestsProps {
    lang: 'th' | 'en';
    onTokenClaimed?: (amount: number) => void;
}

interface Quest {
    id: string;
    titleTh: string;
    titleEn: string;
    descTh: string;
    descEn: string;
    reward: number;
    initialProgress: number;
    actionLabelTh: string;
    actionLabelEn: string;
    actionSuccessTh: string;
    actionSuccessEn: string;
    icon: string;
    colorClass: string; // e.g. 'emerald', 'sky', 'amber', 'purple'
}

export const DailyEnergyQuests: React.FC<DailyEnergyQuestsProps> = ({ lang, onTokenClaimed }) => {
    // 1. Fetch or initialize Green Tokens from localStorage
    const [walletTokens, setWalletTokens] = useState<number>(() => {
        try {
            const saved = localStorage.getItem('eudease_grid_tokens');
            return saved ? parseInt(saved, 10) : 300;
        } catch {
            return 300;
        }
    });

    // 2. Local Quest state (persistence makes this extremely robust)
    const [questStates, setQuestStates] = useState<Record<string, { progress: number; completed: boolean; claimed: boolean }>>(() => {
        try {
            const saved = localStorage.getItem('eudease_daily_quests_state');
            if (saved) return JSON.parse(saved);
        } catch {}
        return {
            ac_eco: { progress: 40, completed: false, claimed: false },
            peak_shift: { progress: 60, completed: false, claimed: false },
            pf_align: { progress: 85, completed: false, claimed: false },
            iot_mesh: { progress: 80, completed: false, claimed: false }
        };
    });

    // 3. Countdown timer state (counts down from a fixed 4 hours for demo, resets or stays live)
    const [timeLeft, setTimeLeft] = useState<number>(16512); // ~4 hours 35 minutes in seconds

    // Save quest states to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('eudease_daily_quests_state', JSON.stringify(questStates));
        } catch {}
    }, [questStates]);

    // Timer countdown effect
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    return 18000; // Reset to 5 hours on complete
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Helper to format remaining time
    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // Toasts/Noti list within the widget
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showLocalNotification = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    // Static quest definitions
    const quests: Quest[] = [
        {
            id: 'ac_eco',
            titleEn: 'AC Eco-Regulate 🌡️',
            titleTh: 'เซฟไฟฟ้าเครื่องปรับอากาศ 🌡️',
            descEn: 'Optimize air conditioning compressor cycles by stabilizing target thermostat to 25°C or higher.',
            descTh: 'เพิ่มประสิทธิภาพรอบการทำงานของคอมเพรสเซอร์แอร์โดยตั้งอุณหภูมิเป้าหมายไว้ที่ 25 องศาขึ้นไป',
            reward: 120,
            initialProgress: 40,
            actionLabelEn: 'Set AC to 25°C',
            actionLabelTh: 'ตั้งแอร์ 25°C',
            actionSuccessEn: 'Thermostat shifted to eco-friendly 25°C! AC load optimized.',
            actionSuccessTh: 'ปรับอุณหภูมิแอร์เป็น 25°C สำเร็จ! ลดการกระชากของคอมเพรสเซอร์',
            icon: 'fa-temperature-high',
            colorClass: 'emerald'
        },
        {
            id: 'peak_shift',
            titleEn: 'Peak Load Shedding ⚡',
            titleTh: 'ปลดเกียร์ว่างสยบพีกกริต ⚡',
            descEn: 'Relieve stress on the school microgrid during peak hours by dropping total consumption below 2.0 kW.',
            descTh: 'ลดความตึงเครียดของโครงข่ายในช่วงความต้องการไฟฟ้าสูง โดยจำกัดกำลังไฟฟ้าเฉลี่ยต่ำกว่า 2.0 kW',
            reward: 150,
            initialProgress: 60,
            actionLabelEn: 'Isolate Heavy Loads',
            actionLabelTh: 'ตัดโหลดสำรองไฟฟ้า',
            actionSuccessEn: 'Heavy loads isolated! Peak consumption lowered safely.',
            actionSuccessTh: 'สับสวิตช์แยกโหลดใหญ่สำเร็จ! ลดปริมาณการใช้ไฟช่วงพีก',
            icon: 'fa-bolt',
            colorClass: 'sky'
        },
        {
            id: 'pf_align',
            titleEn: 'Harmonics & Power Factor 🧬',
            titleTh: 'จูนค่าวาไรตี้เพาเวอร์แฟกเตอร์ 🧬',
            descEn: 'Reduce power losses. Align the sub-station power factor closer to 0.98 using reactive capacitance tuning.',
            descTh: 'ลดการสูญเสียกำลังงานในสายส่ง จูนกระแสไฟฟ้าให้อัตราเพาเวอร์แฟกเตอร์สูงเฉียด 0.98',
            reward: 100,
            initialProgress: 85,
            actionLabelEn: 'Auto-Tune Capacitance',
            actionLabelTh: 'จูนเก็บประจุอัจฉริยะ',
            actionSuccessEn: 'Capacitive bank auto-aligned! Power factor tuned to 0.98.',
            actionSuccessTh: 'เปิดตัวประจุไฟฟ้าประคองเฟสเสร็จสิ้น! ค่า PF เฉลี่ยพุ่งแตะ 0.98',
            icon: 'fa-atom',
            colorClass: 'amber'
        },
        {
            id: 'iot_mesh',
            titleEn: 'Green IoT Integration 🕸️',
            titleTh: 'พิทักษ์กรีน IoT อัจฉริยะ 🕸️',
            descEn: 'Ensure all IoT energy-monitoring smart-plugs are registered and communicating with the centralized hub.',
            descTh: 'ลงทะเบียนปลั๊กไฟอัจฉริยะประเมินประจุไฟสะสมให้เชื่อมประสานเครือข่ายไมโครกริดครบถ้วน',
            reward: 200,
            initialProgress: 80,
            actionLabelEn: 'Register 5th Smart-Plug',
            actionLabelTh: 'เชื่อมต่อโมดูลที่ 5',
            actionSuccessEn: '5th IoT sensor registered successfully! Distributed mesh active.',
            actionSuccessTh: 'ซิงก์ปลั๊กอัจฉริยะตัวที่ 5 แล้ว! เชื่อมต่อโครงข่ายกระจายโหลดสมบูรณ์',
            icon: 'fa-plug',
            colorClass: 'purple'
        }
    ];

    // Handle performing quest action
    const handlePerformAction = (id: string, successMsgEn: string, successMsgTh: string) => {
        setQuestStates(prev => {
            const current = prev[id] || { progress: 0, completed: false, claimed: false };
            if (current.completed) return prev;
            return {
                ...prev,
                [id]: {
                    ...current,
                    progress: 100,
                    completed: true
                }
            };
        });
        showLocalNotification(lang === 'th' ? successMsgTh : successMsgEn);
    };

    // Handle claiming rewards
    const handleClaim = (id: string, reward: number) => {
        const state = questStates[id];
        if (!state || !state.completed || state.claimed) return;

        // 1. Set quest as claimed
        setQuestStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                claimed: true
            }
        }));

        // 2. Update wallet tokens state & local storage
        const nextTokens = walletTokens + reward;
        setWalletTokens(nextTokens);
        try {
            localStorage.setItem('eudease_grid_tokens', nextTokens.toString());
        } catch {}

        // 3. Trigger callback to sync with other components
        if (onTokenClaimed) {
            onTokenClaimed(reward);
        }

        // 4. Trigger global storage event to keep tabs synced
        window.dispatchEvent(new Event('storage'));

        showLocalNotification(
            lang === 'th'
                ? `🎉 เคลมรางวัลสำเร็จ! ได้รับ ${reward} GT`
                : `🎉 Claimed successfully! Earned ${reward} GT`
        );
    };

    // Reset quests helper (for testing/convenience)
    const handleResetAll = () => {
        setQuestStates({
            ac_eco: { progress: 40, completed: false, claimed: false },
            peak_shift: { progress: 60, completed: false, claimed: false },
            pf_align: { progress: 85, completed: false, claimed: false },
            iot_mesh: { progress: 80, completed: false, claimed: false }
        });
        showLocalNotification(lang === 'th' ? '🔄 รีเซ็ตเควสรายวันเรียบร้อยแล้ว!' : '🔄 Reset daily quests successfully!');
    };

    return (
        <div className="dashboard-card border border-slate-200 dark:border-0 p-6 md:p-8 bg-white dark:bg-card text-dark rounded-[2.5rem] shadow-sm relative overflow-hidden h-100 flex flex-col justify-between">
            {/* Ambient subtle decorative lights */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-emerald-500/5 blur-[60px] pointer-events-none"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-[60px] pointer-events-none"></div>

            <div>
                {/* Header section with Timer & Wallet */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                    <div>
                        <h5 className="font-display font-black text-base md:text-lg mb-1 tracking-tight text-slate-900 dark:text-dark uppercase flex items-center gap-2">
                            <i className="fas fa-tasks text-emerald-500 animate-pulse"></i>
                            {lang === 'th' ? 'ภารกิจประหยัดพลังงานรายวัน' : 'Daily Energy Quests'}
                        </h5>
                        <p className="text-[10px] text-slate-600 dark:text-muted mb-0 font-mono tracking-wider">
                            {lang === 'th' ? 'เคลมโทเค็น GT จากพฤติกรรมประหยัดรักษ์โลกประจำวัน' : 'Complete expiring targets to earn premium GT rewards.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        {/* Expiration Timer badge */}
                        <div className="badge bg-red-500/10 text-red-600 dark:text-red-500 border border-red-550/20 text-[10px] font-bold py-1.5 px-3 rounded-xl font-mono flex items-center gap-1.5 shrink-0">
                            <i className="fas fa-clock animate-pulse"></i>
                            <span>{lang === 'th' ? 'หมดเวลาใน' : 'Expires in'} {formatTime(timeLeft)}</span>
                        </div>
                        
                        {/* Internal Mini Token Wallet display */}
                        <div className="badge bg-amber-500/10 text-amber-700 dark:text-amber-600 border border-amber-550/20 text-[10px] font-black py-1.5 px-3 rounded-xl font-mono flex items-center gap-1.5 shrink-0 shadow-sm">
                            <i className="fas fa-coins text-amber-550 animate-spin [animation-duration:5s]"></i>
                            <span>{walletTokens} GT</span>
                        </div>
                    </div>
                </div>

                {/* Toasts inside widget */}
                <AnimatePresence>
                    {toastMessage && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-2xl text-xs mb-4 flex items-center gap-2 shadow-lg relative z-20"
                        >
                            <i className="fas fa-check-circle text-sm"></i>
                            <span>{toastMessage}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Quests Stack */}
                <div className="space-y-4">
                    {quests.map((quest) => {
                        const state = questStates[quest.id] || { progress: quest.initialProgress, completed: false, claimed: false };
                        const isCompleted = state.completed;
                        const isClaimed = state.claimed;
                        const progress = state.progress;

                        // Theme dynamic color matching
                        const colors: Record<string, { bg: string, text: string, bar: string, border: string }> = {
                            emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-500', bar: 'bg-emerald-500', border: 'border-emerald-500/20' },
                            sky: { bg: 'bg-sky-500/10', text: 'text-sky-600 dark:text-sky-500', bar: 'bg-sky-500', border: 'border-sky-500/20' },
                            amber: { bg: 'bg-amber-500/10', text: 'text-amber-650 dark:text-amber-500', bar: 'bg-amber-500', border: 'border-amber-500/20' },
                            purple: { bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-500', bar: 'bg-purple-500', border: 'border-purple-500/20' },
                        };
                        const activeTheme = colors[quest.colorClass] || colors.emerald;

                        return (
                            <div 
                                key={quest.id} 
                                className={`p-4 rounded-3xl border bg-slate-50/50 dark:bg-light/50 transition-all ${
                                    isClaimed 
                                        ? 'opacity-60 border-slate-200' 
                                        : isCompleted 
                                            ? 'border-emerald-500/30 bg-emerald-500/5 shadow-sm' 
                                            : 'border-slate-200/80 hover:border-slate-300'
                                    }`}
                                >
                                <div className="flex justify-between items-start gap-3 mb-2.5">
                                    <div className="flex gap-3">
                                        {/* Icon Container */}
                                        <div className={`w-9 h-9 rounded-2xl ${activeTheme.bg} ${activeTheme.text} border ${activeTheme.border} flex items-center justify-center text-sm shrink-0 overflow-hidden`}>
                                            <i className={`fas ${quest.icon} ${isCompleted && !isClaimed ? 'animate-bounce' : ''}`}></i>
                                        </div>
                                        <div>
                                            <h6 className="font-black text-xs md:text-sm mb-0.5 text-slate-900 dark:text-dark uppercase tracking-tight">
                                                {lang === 'th' ? quest.titleTh : quest.titleEn}
                                            </h6>
                                            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 md:line-clamp-1">
                                                {lang === 'th' ? quest.descTh : quest.descEn}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Reward Tag */}
                                    <div className="text-end shrink-0">
                                        <span className="font-mono font-black text-xs text-amber-700 dark:text-amber-600 block">
                                            +{quest.reward} GT
                                        </span>
                                        <span className="text-[8px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-mono">
                                            {isClaimed ? (lang === 'th' ? 'เคลมแล้ว' : 'CLAIMED') : (lang === 'th' ? 'แต้ม' : 'REWARD')}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Section */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1.5">
                                    <div className="flex-grow flex items-center gap-3">
                                        {/* Progress Bar */}
                                        <div className="flex-grow h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${activeTheme.bar} rounded-full transition-all duration-700 ease-out`}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        {/* Progress Value label */}
                                        <span className="font-mono font-black text-[10px] text-slate-850 dark:text-slate-300 shrink-0">
                                            {progress}%
                                        </span>
                                    </div>

                                    {/* Interactive Action or Claim Button */}
                                    <div className="shrink-0 flex gap-2">
                                        {isClaimed ? (
                                            <button 
                                                disabled 
                                                className="btn btn-xs py-1.5 px-3 bg-slate-100 dark:bg-slate-900 border-0 text-slate-400 font-bold text-[9px] uppercase tracking-wider rounded-xl w-full sm:w-auto"
                                            >
                                                <i className="fas fa-check-circle mr-1"></i>
                                                {lang === 'th' ? 'รับแล้ว' : 'Claimed'}
                                            </button>
                                        ) : isCompleted ? (
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleClaim(quest.id, quest.reward)}
                                                className="btn btn-xs py-1.5 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 border-0 text-white font-black text-[9px] uppercase tracking-wider rounded-xl shadow-md cursor-pointer animate-pulse w-full sm:w-auto flex items-center justify-center gap-1.5"
                                            >
                                                <i className="fas fa-gift text-[10px]"></i>
                                                <span>{lang === 'th' ? 'รับโทเค็น' : 'Claim Tokens'}</span>
                                            </motion.button>
                                        ) : (
                                            <button 
                                                onClick={() => handlePerformAction(quest.id, quest.actionSuccessEn, quest.actionSuccessTh)}
                                                className="btn btn-xs py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-[9px] uppercase tracking-wider rounded-xl cursor-pointer w-full sm:w-auto whitespace-nowrap hover:border-slate-350 transition-colors shadow-sm"
                                            >
                                                {lang === 'th' ? quest.actionLabelTh : quest.actionLabelEn}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Admin Control for developers / testing */}
            <div className="flex justify-between items-center pt-5 border-t border-dashed border-slate-200/50 mt-6 font-mono text-[8px] text-slate-500 dark:text-muted">
                <span>DAILY RESET CYCLE SYSTEM: ON</span>
                <button 
                    onClick={handleResetAll} 
                    className="p-1 px-2.5 rounded bg-slate-100 hover:bg-slate-200 border-0 text-[8px] text-slate-600 dark:text-muted hover:text-dark uppercase font-bold cursor-pointer transition-colors shadow-sm"
                >
                    <i className="fas fa-sync mr-1"></i> {lang === 'th' ? 'รีเซ็ตเควสใหม่' : 'Reset Quests'}
                </button>
            </div>
        </div>
    );
};
