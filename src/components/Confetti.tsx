import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
    triggerCount: number; // Increment this to fire the confetti explosion
}

interface Piece {
    x: number;
    y: number;
    size: number;
    color: string;
    speedX: number;
    speedY: number;
    rotation: number;
    speedRotation: number;
    opacity: number;
    shape: 'circle' | 'square' | 'triangle' | 'star';
}

const COLORS = [
    '#34d399', // Emerald
    '#059669', // Deep Emerald
    '#60a5fa', // Blue
    '#fbbf24', // Yellow
    '#f87171', // Red
    '#a78bfa', // Purple
    '#f472b6', // Pink
];

export const Confetti: React.FC<ConfettiProps> = ({ triggerCount }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const piecesRef = useRef<Piece[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (triggerCount === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        // Synthesize a brief sci-fi reward sound using Web Audio API on celebration
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                const audioCtx = new AudioContext();
                // Play first high synth beep
                const osc1 = audioCtx.createOscillator();
                const gainRange = audioCtx.createGain();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
                osc1.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.15); // C6
                osc1.frequency.exponentialRampToValueAtTime(1318.51, audioCtx.currentTime + 0.35); // E6
                
                gainRange.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gainRange.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
                
                osc1.connect(gainRange);
                gainRange.connect(audioCtx.destination);
                osc1.start();
                osc1.stop(audioCtx.currentTime + 0.45);
            }
        } catch (e) {
            console.warn('Web Audio compilation blocked or unsupported:', e);
        }

        // Initialize particles
        const numPieces = 150;
        const newPieces: Piece[] = [];
        
        for (let i = 0; i < numPieces; i++) {
            const side = Math.random() < 0.5 ? 'left' : 'right';
            const x = side === 'left' ? 0 : window.innerWidth;
            const y = window.innerHeight * 0.75 + Math.random() * (window.innerHeight * 0.2);
            
            // Angled upwards and towards center
            const angle = side === 'left'
                ? -Math.PI / 4 - Math.random() * (Math.PI / 6) // point right-up
                : -Math.PI * 3 / 4 + Math.random() * (Math.PI / 6); // point left-up

            const speed = 15 + Math.random() * 20;

            const shapes: Piece['shape'][] = ['circle', 'square', 'triangle', 'star'];
            newPieces.push({
                x,
                y,
                size: 6 + Math.random() * 8,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed,
                rotation: Math.random() * Math.PI * 2,
                speedRotation: (Math.random() - 0.5) * 0.2,
                opacity: 1,
                shape: shapes[Math.floor(Math.random() * shapes.length)],
            });
        }

        piecesRef.current = [...piecesRef.current, ...newPieces];

        const render = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const pieces = piecesRef.current;
            for (let i = pieces.length - 1; i >= 0; i--) {
                const p = pieces[i];
                p.x += p.speedX;
                p.y += p.speedY;
                
                // Gravity & Wind friction
                p.speedY += 0.4; // gravity
                p.speedX *= 0.98; // horizontal air drag
                p.rotation += p.speedRotation;
                p.opacity -= 0.005; // slow decay

                if (p.opacity <= 0 || p.y > window.innerHeight + 50) {
                    pieces.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = p.color;

                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.shape === 'triangle') {
                    ctx.beginPath();
                    ctx.moveTo(0, -p.size / 2);
                    ctx.lineTo(p.size / 2, p.size / 2);
                    ctx.lineTo(-p.size / 2, p.size / 2);
                    ctx.closePath();
                    ctx.fill();
                } else if (p.shape === 'square') {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                } else {
                    // Star shape
                    ctx.beginPath();
                    for (let j = 0; j < 5; j++) {
                        ctx.lineTo(Math.cos((18 + j * 72) * Math.PI / 180) * p.size / 2, -Math.sin((18 + j * 72) * Math.PI / 180) * p.size / 2);
                        ctx.lineTo(Math.cos((54 + j * 72) * Math.PI / 180) * p.size / 4, -Math.sin((54 + j * 72) * Math.PI / 180) * p.size / 4);
                    }
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.restore();
            }

            if (pieces.length > 0) {
                animationFrameRef.current = requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                animationFrameRef.current = null;
            }
        };

        if (animationFrameRef.current === null) {
            render();
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [triggerCount]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[99999]"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};
