import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Menu, X, Globe, Moon, Sun,
  LayoutDashboard, HeartPulse, Trees, ShieldAlert, 
  Leaf, BookOpen, Cpu, Compass, Landmark,
  Phone, LineChart
} from 'lucide-react';

const NAV_SECTIONS = [
  { id: 'hero', label: 'Home', icon: LayoutDashboard },
  { id: 'stats', label: 'Overview', icon: LineChart },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'health', label: 'Health', icon: HeartPulse },
  { id: 'traffic', label: 'Traffic', icon: ShieldAlert },
  { id: 'education', label: 'Education', icon: BookOpen },
  { id: 'environment', label: 'Environment', icon: Leaf },
  { id: 'agriculture', label: 'Agriculture', icon: Trees },
  { id: 'technology', label: 'Technology', icon: Cpu },
  { id: 'tourism', label: 'Tourism', icon: Compass },
  { id: 'services', label: 'Services', icon: Landmark },
  { id: 'contact', label: 'Contact', icon: Phone },
];

interface ScrollNavProps {
  activeSection: string;
  scrollProgress: number;
  lang: string;
  setLang: (lang: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export const ScrollNav: React.FC<ScrollNavProps> = ({
  activeSection, scrollProgress, lang, setLang, theme, setTheme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollProgress > 0.02);
  }, [scrollProgress]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Top navbar */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo('hero')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 className="text-white" size={22} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white leading-tight">Butwal SmartGov</h1>
              <p className="text-[10px] text-blue-300/50 tracking-wider uppercase">AI Portal</p>
            </div>
          </motion.div>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_SECTIONS.slice(0, 6).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === id
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => setIsOpen(true)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              More...
            </button>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'EN' ? 'NP' : 'EN')}
              className="flex items-center gap-1 px-3 py-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm"
            >
              <Globe size={16} /> {lang}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </motion.header>

      {/* Side dots navigation */}
      <motion.nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {NAV_SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-3"
          >
            <span className={`text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
              activeSection === id ? 'text-blue-400' : 'text-white/40'
            }`}>
              {label}
            </span>
            <div className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeSection === id
                ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50'
                : 'bg-white/20 hover:bg-white/40 scale-100'
            }`}>
              {activeSection === id && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500/30"
                  animate={{ scale: [1, 2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
          </button>
        ))}
      </motion.nav>

      {/* Full screen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0a0f1e]/95 backdrop-blur-2xl flex flex-col"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 max-w-2xl w-full">
                {NAV_SECTIONS.map(({ id, label, icon: Icon }, i) => (
                  <motion.button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${
                      activeSection === id
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        : 'bg-white/[0.02] border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.05]'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Icon size={28} />
                    <span className="text-sm font-medium">{label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
