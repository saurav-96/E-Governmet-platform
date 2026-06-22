import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  id: string;
  index: number;
  gradient?: string;
  title?: string;
  subtitle?: string;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  children, id, index, gradient, title, subtitle
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.85]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [8, 0, 0, -8]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8"
      style={{ perspective: '1200px' }}
    >
      {/* Section background glow */}
      {gradient && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: gradient,
            filter: 'blur(120px)',
          }}
        />
      )}

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto"
        style={{ y, opacity, scale, rotateX }}
      >
        {/* Section header */}
        {title && (
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-[0.2em] uppercase text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
                Section {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>
            
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200">
                {title}
              </span>
            </motion.h2>
            
            {subtitle && (
              <motion.p
                className="text-lg md:text-xl text-blue-200/50 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: '-100px' }}
              >
                {subtitle}
              </motion.p>
            )}

            {/* Decorative line */}
            <motion.div
              className="w-24 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>
        )}

        {children}
      </motion.div>

      {/* Scroll indicator between sections */}
      {index < 10 && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-blue-500/50 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
        </motion.div>
      )}
    </motion.section>
  );
};

/* Animated card that appears on scroll with 3D tilt effect */
interface ScrollCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  glowColor?: string;
}

export const ScrollCard: React.FC<ScrollCardProps> = ({ children, delay = 0, className = '', glowColor = 'blue' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Move glow
      const glow = card.querySelector('.card-glow') as HTMLElement;
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(59,130,246,0.15), transparent 50%)`;
      }
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
      const glow = card.querySelector('.card-glow') as HTMLElement;
      if (glow) {
        glow.style.background = 'transparent';
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 ease-out ${className}`}
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="card-glow absolute inset-0 pointer-events-none transition-all duration-300" />
      {/* Top border glow */}
      <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-${glowColor}-500/50 to-transparent`} />
      {children}
    </motion.div>
  );
};

/* Parallax text reveal */
export const ParallaxText: React.FC<{ children: string; className?: string }> = ({ children, className = '' }) => {
  const words = children.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* Number counter animation */
export const AnimatedCounter: React.FC<{ value: string; label: string; delay?: number }> = ({ value, label, delay = 0 }) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    >
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 mb-2">{value}</div>
      <div className="text-sm text-blue-300/50 uppercase tracking-wider font-medium">{label}</div>
    </motion.div>
  );
};

/* Horizontal scroll section */
export const HorizontalScrollSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div className="flex gap-8 pl-8" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
};
