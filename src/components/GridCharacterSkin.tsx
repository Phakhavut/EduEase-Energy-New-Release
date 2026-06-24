import React from 'react';

interface GridCharacterSkinProps {
    skinId: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'avatar' | 'huge';
    className?: string;
    customUrl?: string;
}

export const GridCharacterSkin: React.FC<GridCharacterSkinProps> = ({
    skinId,
    size = 'md',
    className = '',
    customUrl = ''
}) => {
    // Determine size dimensions
    const sizeMap = {
        sm: 'w-8 h-8 rounded-xl',
        md: 'w-10 h-10 rounded-2xl',
        lg: 'w-14 h-14 rounded-2xl',
        xl: 'w-20 h-20 rounded-3xl',
        avatar: 'w-24 h-24 rounded-[2rem]',
        huge: 'w-32 h-32 rounded-[2.5rem]'
    };

    const wrapperClass = sizeMap[size] || sizeMap.md;

    // Handle Custom User Upload Logo
    if (skinId === 'image' && customUrl) {
        return (
            <div className={`${wrapperClass} overflow-hidden border-2 border-primary/50 bg-slate-950 relative flex items-center justify-center shrink-0 shadow-lg ${className}`}>
                <img 
                    src={customUrl} 
                    alt="Custom Node Avatar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
        );
    }

    // Interactive Custom CSS/SVG Vector Skins
    switch (skinId) {
        case 'hyperion': // Fire/Solar core construct
            return (
                <div className={`${wrapperClass} relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 border-2 border-orange-400 flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20 ${className}`}>
                    {/* Pulsing Sun Rays Flare in SVG */}
                    <svg className="absolute inset-0 w-full h-full animate-pulse opacity-40 pointer-events-none" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="35" stroke="rgba(251, 146, 60, 0.4)" strokeWidth="3" strokeDasharray="6 6" className="animate-spin [animation-duration:15s]" />
                        <line x1="50" y1="5" x2="50" y2="15" stroke="#ffedd5" strokeWidth="4" strokeLinecap="round" />
                        <line x1="50" y1="85" x2="50" y2="95" stroke="#ffedd5" strokeWidth="4" strokeLinecap="round" />
                        <line x1="5" y1="50" x2="15" y2="50" stroke="#ffedd5" strokeWidth="4" strokeLinecap="round" />
                        <line x1="85" y1="50" x2="95" y2="50" stroke="#ffedd5" strokeWidth="4" strokeLinecap="round" />
                    </svg>

                    {/* Solar Core Body */}
                    <div className="w-1/2 h-1/2 rounded-full bg-amber-300 relative flex items-center justify-center shadow-[0_0_15px_rgba(253,224,71,0.8)] animate-bounce [animation-duration:3s]">
                        {/* Sunglasses Sun Face Expression */}
                        <div className="flex flex-col items-center gap-0.5 relative z-10 scale-[0.85] md:scale-100">
                            {/* Sunglasses */}
                            <div className="flex gap-1 items-center justify-center">
                                <div className="w-3.5 h-2 bg-slate-900 rounded-b-md rounded-t-sm relative">
                                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/60 rounded-full" />
                                </div>
                                <div className="w-1.5 h-0.5 bg-slate-900" />
                                <div className="w-3.5 h-2 bg-slate-900 rounded-b-md rounded-t-sm relative">
                                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/60 rounded-full" />
                                </div>
                            </div>
                            {/* Confident Smile */}
                            <div className="w-3 h-1.5 border-b-2 border-slate-900 rounded-b-full mt-0.5" />
                        </div>
                    </div>
                    {/* Orbiting Solar Flares */}
                    <div className="absolute w-4/5 h-4/5 border border-amber-400/30 rounded-full animate-spin [animation-duration:6s] pointer-events-none">
                        <div className="absolute -top-1 left-1/2 w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
                        <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-orange-400 rounded-full" />
                    </div>
                </div>
            );

        case 'vortex': // Cosmic space portal chronometer
            return (
                <div className={`${wrapperClass} relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-950 border-2 border-fuchsia-500/70 flex items-center justify-center shrink-0 shadow-md shadow-fuchsia-500/20 ${className}`}>
                    {/* Galaxy Swirl background */}
                    <svg className="absolute inset-0 w-full h-full animate-spin [animation-duration:12s]" viewBox="0 0 100 100" fill="none">
                        <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" stroke="rgba(217, 70, 239, 0.25)" strokeWidth="2" strokeDasharray="12 4" />
                        <path d="M50,25 C63,25 75,37 75,50 C75,63 63,75 50,75 C37,75 25,63 25,50" stroke="rgba(192, 38, 211, 0.4)" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>

                    {/* Cute Nebula Swirl Eyes */}
                    <div className="flex flex-col items-center gap-1.5 z-10 animate-pulse">
                        <div className="flex gap-3 justify-center">
                            {/* Left Swirl Eye */}
                            <div className="w-4 h-4 rounded-full bg-white relative flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.9)]">
                                <div className="w-1.5 h-1.5 bg-fuchsia-600 rounded-full animate-ping" />
                            </div>
                            {/* Right Swirl Eye */}
                            <div className="w-4 h-4 rounded-full bg-white relative flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.9)]">
                                <div className="w-1.5 h-1.5 bg-fuchsia-600 rounded-full" />
                            </div>
                        </div>
                        {/* Intrigued/Wobbly mouth */}
                        <div className="w-4 h-1.5 border-b-2 border-fuchsia-300 rounded-b-full" />
                    </div>

                    {/* Clock Chronos hands */}
                    <div className="absolute w-2/3 h-2/3 border border-fuchsia-400/20 rounded-full animate-spin [animation-duration:20s] pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 w-1.5 h-6 bg-fuchsia-300 origin-bottom rounded-full" style={{ transform: 'translate(-50%, -100%) rotate(45deg)' }} />
                        <div className="absolute top-1/2 left-1/2 w-1 h-4 bg-purple-300 origin-bottom rounded-full" style={{ transform: 'translate(-50%, -100%) rotate(160deg)' }} />
                    </div>
                </div>
            );

        case 'emerald': // Organic plant defender
            return (
                <div className={`${wrapperClass} relative overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-650 to-emerald-900 border-2 border-emerald-400 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 ${className}`}>
                    {/* Forest/Leaf Silhouette in SVG */}
                    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100" fill="none">
                        <path d="M10,90 Q50,40 90,90" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
                        <path d="M30,90 Q50,60 70,90" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>

                    {/* Leaf Knight Core */}
                    <div className="w-3/5 h-3/5 bg-gradient-to-b from-emerald-300 to-emerald-500 rounded-t-full rounded-b-3xl relative flex flex-col items-center justify-center shadow-md animate-bounce [animation-duration:4s]">
                        {/* Glowing Leaf Mask */}
                        <div className="absolute -top-1 w-2.5 h-2.5 bg-amber-300 rounded-full shadow-[0_0_6px_#f59e0b]" />
                        
                        <div className="flex flex-col items-center gap-1.5 relative z-10">
                            {/* Sparkly forest eyes */}
                            <div className="flex gap-2 justify-center">
                                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full relative flex items-center justify-center">
                                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
                                </div>
                                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full relative flex items-center justify-center">
                                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
                                </div>
                            </div>
                            {/* Cute leafy smile */}
                            <div className="text-[10px] font-black leading-none text-slate-900 mt-[-2px]">✿</div>
                        </div>
                    </div>

                    {/* Orbiting Green Spores */}
                    <div className="absolute inset-2 border border-emerald-400/10 rounded-full animate-pulse pointer-events-none">
                        <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping" />
                        <div className="absolute bottom-3 right-2 w-2 h-2 bg-teal-400 rounded-full" />
                    </div>
                </div>
            );

        case 'neutron': // Subatomic grid smoother
            return (
                <div className={`${wrapperClass} relative overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-blue-950 border-2 border-cyan-400/80 flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20 ${className}`}>
                    {/* Quantum Matrix Wireframe background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:8px_8px] opacity-40" />

                    {/* Visor Robot Core */}
                    <div className="w-1/2 h-2/5 bg-slate-900 border border-cyan-400 rounded-xl relative flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.3)] animate-pulse">
                        {/* Glowing Visor */}
                        <div className="w-4/5 h-2.5 bg-cyan-950 border border-cyan-500 rounded-full overflow-hidden relative flex items-center justify-center">
                            <div className="absolute left-0 w-3 h-full bg-cyan-400 blur-xs animate-[move_2s_infinite_linear]" style={{ animationName: 'visorScan' }} />
                        </div>
                        <style>{`
                            @keyframes visorScan {
                                0% { transform: translateX(-15px); }
                                50% { transform: translateX(25px); }
                                100% { transform: translateX(-15px); }
                            }
                        `}</style>
                    </div>

                    {/* Orbiting Proton Streams */}
                    <div className="absolute w-4/5 h-4/5 border border-cyan-500/15 rounded-full animate-spin [animation-duration:5s] pointer-events-none">
                        <div className="absolute -top-1 left-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]" />
                    </div>
                    <div className="absolute w-4/5 h-4/5 border border-blue-500/15 rounded-full animate-spin [animation-duration:8s] [animation-direction:reverse] pointer-events-none">
                        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_6px_#3b82f6]" />
                    </div>
                </div>
            );

        case 'nova': // Golden celestial deity
            return (
                <div className={`${wrapperClass} relative overflow-hidden bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-700 border-2 border-amber-300 flex items-center justify-center shrink-0 shadow-md shadow-yellow-500/20 ${className}`}>
                    {/* Golden Rays Background */}
                    <svg className="absolute inset-0 w-full h-full animate-spin [animation-duration:25s] opacity-35" viewBox="0 0 100 100">
                        <path d="M50,50 L20,10 M50,50 L80,10 M50,50 L90,40 M50,50 L90,70 M50,50 L60,90 M50,50 L30,90 M50,50 L10,60 M50,50 L10,30" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" />
                    </svg>

                    {/* Sparkling Star Face */}
                    <div className="flex flex-col items-center gap-1.5 z-10 animate-pulse">
                        <div className="flex gap-2.5 justify-center">
                            {/* Star left eye */}
                            <div className="text-sm font-bold text-white leading-none">★</div>
                            {/* Star right eye */}
                            <div className="text-sm font-bold text-white leading-none">★</div>
                        </div>
                        {/* Whimsical mouth */}
                        <div className="w-2.5 h-2.5 border-2 border-t-0 border-white rounded-b-full mt-[-2px]" />
                    </div>

                    {/* Spinning Golden Tiara Orbit */}
                    <div className="absolute w-4/5 h-4/5 border-2 border-dotted border-white/35 rounded-full animate-spin [animation-duration:12s] pointer-events-none">
                        <div className="absolute -top-1.5 left-1/3 text-[10px] text-yellow-300">✨</div>
                        <div className="absolute bottom-0 right-1/4 text-[8px] text-white">★</div>
                    </div>
                </div>
            );

        case 'titan': // Overclocked cyber construct
            return (
                <div className={`${wrapperClass} relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-950 to-red-900 border-2 border-red-500 flex items-center justify-center shrink-0 shadow-md shadow-red-500/20 ${className}`}>
                    {/* High-speed industrial mesh grids */}
                    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100">
                        <line x1="10" y1="10" x2="90" y2="90" stroke="#f43f5e" strokeWidth="1" />
                        <line x1="90" y1="10" x2="10" y2="90" stroke="#f43f5e" strokeWidth="1" />
                        <circle cx="50" cy="50" r="25" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
                    </svg>

                    {/* Heavy Crimson Mech Head */}
                    <div className="w-3/5 h-1/2 bg-gradient-to-b from-red-650 to-red-900 border-2 border-red-400 rounded-xl relative flex flex-col items-center justify-center shadow-lg animate-[bounce_5s_infinite]">
                        {/* Angry/Powerful Horn Plate */}
                        <div className="absolute -top-2 w-4 h-2.5 bg-red-400 rounded-t-full" />
                        
                        <div className="flex flex-col items-center gap-1.5 mt-1.5 relative z-10">
                            {/* Threatening cyber glowing red slit eyes */}
                            <div className="flex gap-3 justify-center">
                                <div className="w-3.5 h-1 bg-red-400 rounded-full shadow-[0_0_8px_#ef4444] rotate-[10deg]" />
                                <div className="w-3.5 h-1 bg-red-400 rounded-full shadow-[0_0_8px_#ef4444] rotate-[-10deg]" />
                            </div>
                            {/* Mouth intake vents */}
                            <div className="flex gap-0.5 justify-center mt-1">
                                <div className="w-1 h-2.5 bg-slate-900 rounded-xs" />
                                <div className="w-1 h-2.5 bg-slate-900 rounded-xs" />
                                <div className="w-1 h-2.5 bg-slate-900 rounded-xs" />
                            </div>
                        </div>
                    </div>

                    {/* Steam Vents/Heat particles floating up */}
                    <div className="absolute bottom-2 inset-x-2 flex justify-between px-2 opacity-50 pointer-events-none">
                        <div className="w-1 h-3 bg-red-500/40 rounded-full animate-[ping_1.5s_infinite_ease-out]" />
                        <div className="w-1 h-3.5 bg-red-400/40 rounded-full animate-[ping_2s_infinite_ease-out]" />
                    </div>
                </div>
            );

        case 'default':
        default: // Volt Spark: baseline electric elemental
            return (
                <div className={`${wrapperClass} relative overflow-hidden bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-700 border-2 border-teal-300 flex items-center justify-center shrink-0 shadow-md shadow-teal-500/20 ${className}`}>
                    {/* Floating electric background arcs */}
                    <svg className="absolute inset-0 w-full h-full opacity-40 animate-pulse pointer-events-none" viewBox="0 0 100 100" fill="none">
                        <path d="M20,50 L50,20 L80,50" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20,60 L50,80 L80,60" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>

                    {/* Spark Sprite Core */}
                    <div className="w-1/2 h-1/2 bg-yellow-300 rounded-full relative flex flex-col items-center justify-center shadow-[0_0_12px_rgba(253,224,71,0.7)] animate-bounce [animation-duration:2.5s]">
                        {/* Little electric spark horn */}
                        <div className="absolute -top-1.5 w-2 h-2.5 bg-yellow-300 rounded-t-full rotate-45" />

                        <div className="flex flex-col items-center gap-1.5 relative z-10 scale-95">
                            {/* Happy round eyes */}
                            <div className="flex gap-2 justify-center">
                                <div className="w-2 h-2 bg-slate-900 rounded-full relative">
                                    <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full" />
                                </div>
                                <div className="w-2 h-2 bg-slate-900 rounded-full relative">
                                    <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full" />
                                </div>
                            </div>
                            {/* Wide happy grin */}
                            <div className="w-3.5 h-1.5 border-b-2 border-slate-900 rounded-b-full mt-[-2px]" />
                        </div>
                    </div>

                    {/* Electric particles */}
                    <div className="absolute top-1 right-2 text-[8px] text-cyan-300 animate-pulse">⚡</div>
                    <div className="absolute bottom-1 left-2 text-[8px] text-cyan-300 animate-pulse delay-100">⚡</div>
                </div>
            );
    }
};
