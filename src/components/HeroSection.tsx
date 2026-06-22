import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Zap, Shield, Globe, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

  return (
    <motion.section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
    >
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
      
      {/* Animated horizontal lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{ top: `${20 + i * 15}%` }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.05, scaleX: 1 }}
            transition={{ duration: 2, delay: 1 + i * 0.2 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300 backdrop-blur-sm">
            <Zap size={14} className="text-yellow-400" />
            AI-Powered Smart City Platform
            <ArrowRight size={14} />
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] mb-8"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
            Butwal
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
            SmartGov
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-white/40 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Experience the future of digital governance. Serving{' '}
          <span className="text-blue-400 font-semibold">150,000+</span> citizens
          with AI-powered intelligence and seamless public services.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold text-lg overflow-hidden shadow-2xl shadow-blue-500/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('departments')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Departments
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.button
            className="px-8 py-4 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/5 font-medium text-lg transition-all backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[
            { icon: Shield, label: 'Secure Platform' },
            { icon: Zap, label: 'Real-time Data' },
            { icon: Globe, label: 'Bilingual Support' },
          ].map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-white/40 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1 }}
            >
              <Icon size={14} className="text-blue-400/60" />
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs text-white/30 tracking-[0.3em] uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-white/30" />
        </motion.div>
      </motion.div>

      {/* Side decorative elements */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase" style={{ writingMode: 'vertical-lr' }}>
          Est. 2082 B.S.
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </motion.div>
    </motion.section>
  );
};
