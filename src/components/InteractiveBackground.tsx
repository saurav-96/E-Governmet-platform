import React from 'react';

export const InteractiveBackground: React.FC<{ theme: string }> = ({ theme }) => {
  const isLight = theme === 'light';
  return (
    <div className={`fixed inset-0 z-[-1] overflow-hidden transition-colors duration-500 ${isLight ? 'bg-slate-50' : 'bg-[#0F172A]'}`}>
      {/* Animated Gradient Orbs */}
      <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse ${isLight ? 'bg-blue-400/20' : 'bg-blue-900/20'}`} />
      <div className={`absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] animate-pulse ${isLight ? 'bg-indigo-400/20' : 'bg-indigo-900/20'}`} style={{ animationDelay: '2s' }} />
      <div className={`absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full blur-[100px] animate-pulse ${isLight ? 'bg-emerald-400/10' : 'bg-emerald-900/10'}`} style={{ animationDelay: '4s' }} />
      
      {/* Subtle grid pattern overlay */}
      <div className={`absolute inset-0 bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] ${isLight ? 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]'}`} />
    </div>
  );
};
