import React, { useState } from 'react';
import { Search, Bell, LogIn, Globe, Moon, Sun, Clock } from 'lucide-react';
import { AuthModal } from './AuthModal';

interface HeaderProps {
  activePageString: string;
  lang: string;
  setLang: (lang: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  onOpenChatbot: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activePageString, lang, setLang, theme, setTheme, onOpenChatbot, onToggleSidebar 
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <>
      <header className="h-[70px] bg-[#0F172A]/80 backdrop-blur-md border-b border-border sticky top-0 z-20 flex items-center justify-between px-6 transition-all">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-textSecondary hover:text-white"
          >
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </button>
          
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-textSecondary">{lang === 'EN' ? 'Departments' : 'विभागहरु'}</span>
            <span className="text-border">/</span>
            <span className="font-semibold text-white">{activePageString}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block mr-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" size={18} />
            <input 
              type="text" 
              placeholder={lang === 'EN' ? 'Search AI insights...' : 'खोजी गर्नुहोस्...'} 
              className="bg-card border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all"
            />
          </div>

          {/* Master AI Robot Head Icon */}
          <button 
            onClick={onOpenChatbot}
            className="p-2 text-primary hover:text-blue-400 bg-primary/5 hover:bg-primary/10 rounded-xl transition-all group relative shadow-lg shadow-primary/5"
            title="Open Master AI Assistant"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" className="fill-current" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h1V5.73c-.6-.34-1-1-1-1.73a2 2 0 0 1 2-2M9 9a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H9m3 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m-3 2a1 1 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1m6 0a1 1 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1Z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-success rounded-full border-2 border-[#0F172A] animate-pulse"></span>
          </button>

          <button 
            onClick={() => setLang(lang === 'EN' ? 'NP' : 'EN')}
            className="flex items-center gap-1 p-2 text-textSecondary hover:text-white hover:bg-card rounded-xl transition-all font-medium text-sm"
          >
            <Globe size={18} /> {lang}
          </button>

          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-textSecondary hover:text-white hover:bg-card rounded-xl transition-all"
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-textSecondary hover:text-white hover:bg-card rounded-xl transition-all relative"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-[var(--bg-color)]"></span>
            </button>
            
            {/* Notification Dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
                <div className="p-4 border-b border-border bg-[#0F172A]/50 flex justify-between items-center">
                  <h3 className="font-bold text-white">Notifications</h3>
                  <button className="text-xs text-primary hover:underline" onClick={() => setIsNotifOpen(false)}>Mark all as read</button>
                </div>
                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  {[
                    { title: 'Tender Approved', text: 'Road maintenance budget approved.', time: '5m ago', color: 'text-success bg-success/10 border-success/20' },
                    { title: 'Traffic Alert', text: 'Heavy congestion on Highway 04.', time: '1h ago', color: 'text-warning bg-warning/10 border-warning/20' },
                    { title: 'Weather Warning', text: 'Heavy rainfall expected this evening.', time: '4h ago', color: 'text-danger bg-danger/10 border-danger/20' },
                  ].map((n, i) => (
                    <div key={i} className="p-4 border-b border-border hover:bg-white/[0.02] cursor-pointer transition-colors flex gap-3">
                      <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.color.split(' ')[0] === 'text-success' ? 'bg-success' : n.color.split(' ')[0] === 'text-warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">{n.title}</h4>
                        <p className="text-xs text-textSecondary mb-2">{n.text}</p>
                        <p className="text-[10px] text-textSecondary flex items-center gap-1 font-medium"><Clock size={10} /> {n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-border bg-[#0F172A]/50">
                  <button className="text-sm text-primary font-medium hover:underline" onClick={() => setIsNotifOpen(false)}>View All Notifications</button>
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-border mx-1"></div>

          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-primary/20"
          >
            <LogIn size={16} />
            {lang === 'EN' ? 'Login / Signup' : 'लगइन / दर्ता'}
          </button>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};
