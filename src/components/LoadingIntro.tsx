import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle system for intro
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string; life: number;
    }> = [];

    const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100,
      });
    }

    let animFrame: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.5;
        p.opacity = Math.sin(p.life * 0.02) * 0.8;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(Math.max(0, p.opacity) * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // Phase transitions
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 2500);
    const t4 = setTimeout(() => onComplete(), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ background: '#0a0f1e' }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        
        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border"
              style={{
                borderColor: `rgba(59, 130, 246, ${0.15 - i * 0.03})`,
                width: 200 + i * 120,
                height: 200 + i * 120,
              }}
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [0, 180 + i * 45],
                opacity: [0, 0.6, 0.3],
              }}
              transition={{
                duration: 2.5,
                delay: 0.3 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </div>

        {/* 3D rotating cube wireframe */}
        <motion.div
          className="absolute"
          style={{ perspective: '800px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 0.15 : 0 }}
        >
          <motion.div
            style={{
              width: 300,
              height: 300,
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotateX: 360, rotateY: 360, rotateZ: 180 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[
              { rx: 0, ry: 0, tz: 150 },
              { rx: 0, ry: 180, tz: 150 },
              { rx: 90, ry: 0, tz: 150 },
              { rx: -90, ry: 0, tz: 150 },
              { rx: 0, ry: 90, tz: 150 },
              { rx: 0, ry: -90, tz: 150 },
            ].map((face, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-blue-500/20 rounded-lg"
                style={{
                  transform: `rotateX(${face.rx}deg) rotateY(${face.ry}deg) translateZ(${face.tz}px)`,
                  backfaceVisibility: 'visible',
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo with 3D effect */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ perspective: '1000px' }}
          >
            <div className="w-24 h-24 relative mb-8">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-2xl shadow-2xl"
                animate={{ rotateY: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M24 4L38 12V28L24 36L10 28V12L24 4Z" stroke="white" strokeWidth="2" fill="none"/>
                    <path d="M24 4L38 12L24 20L10 12L24 4Z" fill="rgba(255,255,255,0.2)"/>
                    <circle cx="24" cy="20" r="4" fill="white"/>
                  </svg>
                </div>
              </motion.div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-600/40 rounded-2xl blur-xl -z-10 scale-150" />
            </div>
          </motion.div>

          {/* Title reveal */}
          <motion.div className="overflow-hidden mb-2">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400"
              initial={{ y: 100, opacity: 0 }}
              animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Butwal SmartGov
            </motion.h1>
          </motion.div>

          <motion.div className="overflow-hidden mb-8">
            <motion.p
              className="text-lg md:text-xl text-blue-200/60 tracking-[0.3em] uppercase font-light"
              initial={{ y: 50, opacity: 0 }}
              animate={phase >= 2 ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              AI-Powered Digital Governance
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-64 md:w-80 h-1 bg-white/5 rounded-full overflow-hidden mb-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={phase >= 2 ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Status text */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : {}}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm text-blue-300/50 font-mono tracking-wider">
              {phase < 3 ? 'INITIALIZING NEURAL SYSTEMS...' : 'SYSTEM READY'}
            </span>
          </motion.div>

          {/* Floating data streams */}
          <div className="absolute -left-32 top-0 flex flex-col gap-1 opacity-20">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="text-[10px] font-mono text-cyan-400"
                initial={{ opacity: 0, x: -20 }}
                animate={phase >= 2 ? { opacity: [0, 0.5, 0], x: [- 20, 0, 20] } : {}}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatDelay: 3 }}
              >
                {`0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`}
              </motion.div>
            ))}
          </div>
          <div className="absolute -right-32 top-0 flex flex-col gap-1 opacity-20">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="text-[10px] font-mono text-purple-400"
                initial={{ opacity: 0, x: 20 }}
                animate={phase >= 2 ? { opacity: [0, 0.5, 0], x: [20, 0, -20] } : {}}
                transition={{ duration: 2, delay: i * 0.2 + 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                {`SYS::${Math.random().toString(36).slice(2, 8).toUpperCase()}`}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Corner decorations */}
        {[
          'top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-16 h-16`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1 + i * 0.1 }}
          >
            <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-8 h-px bg-gradient-to-r from-blue-500/50 to-transparent`} />
            <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-px h-8 bg-gradient-to-b from-blue-500/50 to-transparent`} />
          </motion.div>
        ))}
      </motion.div>
  );
};
