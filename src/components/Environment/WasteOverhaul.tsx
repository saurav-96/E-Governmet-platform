import React, { useState } from 'react';
import { Recycle, QrCode, Camera, Truck, MapPin, CheckCircle, AlertTriangle, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WasteOverhaul: React.FC = () => {
  const [points, setPoints] = useState(1250);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      setPoints(prev => prev + 50);
      setTimeout(() => setScanSuccess(false), 3000);
    }, 2000);
  };

  const handleReport = () => {
    setReportSuccess(true);
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setTimeout(() => setReportSuccess(false), 5000);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Citizen Rewards Portal */}
      <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-custom">
        <div className="p-6 border-b border-border flex justify-between items-center bg-emerald-500/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
              <QrCode size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Citizen Rewards Portal</h3>
              <p className="text-xs text-textSecondary">Log waste segregation to earn community points.</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-textSecondary font-medium uppercase tracking-wider">Your Points</p>
            <p className="text-2xl font-bold text-emerald-500">{points}</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-[#0F172A] border border-border rounded-xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Recycle size={80} />
              </div>
              <h4 className="font-bold text-white mb-4">Daily Segregation Log</h4>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {['Organic', 'Plastic', 'Hazardous'].map((type) => (
                  <button key={type} className="flex flex-col items-center gap-2 p-3 bg-card border border-border rounded-lg hover:border-emerald-500/50 transition-colors group/btn">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      type === 'Organic' ? 'bg-emerald-500/10 text-emerald-500' :
                      type === 'Plastic' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      <CheckCircle size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[10px] font-bold text-textSecondary uppercase tracking-tighter">{type}</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={handleQRScan}
                disabled={isScanning}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <QrCode size={20} />
                    </motion.div>
                    Scanning Bin QR...
                  </span>
                ) : (
                  <>
                    <QrCode size={20} />
                    Scan Bin QR & Log Waste
                  </>
                )}
              </button>

              <AnimatePresence>
                {scanSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs flex items-center gap-2"
                  >
                    <CheckCircle size={14} /> Logged successfully! +50 Points added.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-500" />
                  Community Leaderboard
                </h5>
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Ward 11 leading</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Ward 11 (Traffic Chowk)', pts: 45200, grow: true },
                  { name: 'Ward 9 (Milanchowk)', pts: 42150, grow: true },
                  { name: 'Ward 4 (Devinagar)', pts: 38900, grow: false }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-xs text-textSecondary">{i+1}. {item.name}</span>
                    <span className="text-xs font-bold text-white">{(item.pts/1000).toFixed(1)}k pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white">AI Segregation Insights</h4>
            <div className="bg-[#0F172A] border border-border rounded-xl p-5">
              <div className="flex gap-4 mb-4">
                <div className="h-2 flex-grow bg-emerald-500 rounded-full" style={{ width: '65%' }}></div>
                <div className="h-2 w-16 bg-blue-500 rounded-full"></div>
                <div className="h-2 w-8 bg-red-500 rounded-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-textSecondary uppercase mb-1">Organic</p>
                  <p className="text-sm font-bold text-emerald-500">65%</p>
                </div>
                <div>
                  <p className="text-[10px] text-textSecondary uppercase mb-1">Plastic</p>
                  <p className="text-sm font-bold text-blue-500">25%</p>
                </div>
                <div>
                  <p className="text-[10px] text-textSecondary uppercase mb-1">Hazardous</p>
                  <p className="text-sm font-bold text-red-500">10%</p>
                </div>
              </div>
              <p className="mt-6 text-xs text-textSecondary italic">
                <Info size={12} className="inline mr-1" />
                "Your plastic segregation has improved by 12% this week. Keep it up!" — Environment AI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Waste Dispatch & Reporting */}
      <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-custom">
        <div className="p-6 border-b border-border flex justify-between items-center bg-blue-500/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <Camera size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Citizen Reporting Gateway</h3>
              <p className="text-xs text-textSecondary">Upload images of illegal dumping for instant AI action.</p>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 space-y-4">
            <div 
              onClick={handleReport}
              className="aspect-square bg-[#0F172A] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group"
            >
              <div className="p-4 bg-blue-500/10 text-blue-500 rounded-full group-hover:scale-110 transition-transform">
                <Camera size={32} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white">Capture or Upload</p>
                <p className="text-xs text-textSecondary">Illegal dumping/River trash</p>
              </div>
            </div>
            <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 flex gap-3">
              <AlertTriangle size={18} className="text-warning shrink-0" />
              <p className="text-xs text-warning leading-relaxed">
                Reports are verified by AI. False reporting may lead to point deduction.
              </p>
            </div>
          </div>

          <div className="flex-grow space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white">Smart Waste Dispatch Status</h4>
              {isOptimizing && (
                <span className="flex items-center gap-2 text-xs text-blue-400 font-medium">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                  />
                  AI Route Optimization Running...
                </span>
              )}
            </div>

            <div className="bg-[#0A0F1E] border border-border rounded-2xl p-4 h-64 relative overflow-hidden">
              {/* Mock Map / Visualization */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 400 200">
                  <path d="M50 50 Q150 20 250 80 T350 150" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M20 180 Q80 120 150 140 T300 20" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
              
              <div className="relative z-10 space-y-4">
                <AnimatePresence>
                  {reportSuccess ? (
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/30 p-3 rounded-xl"
                    >
                      <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg">
                        <Truck size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Truck #WM-402 Dispatched</p>
                        <p className="text-xs text-blue-400">ETA: 12 mins via Optimized Path B</p>
                        <p className="text-[10px] text-textSecondary mt-1">Classification: Plastic & Solid Waste</p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <Truck size={32} className="text-textSecondary mb-3 opacity-20" />
                      <p className="text-sm text-textSecondary">No active dispatch events</p>
                    </div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Nearest Truck', val: '0.8 km', icon: Truck },
                    { label: 'Today\'s Fuel Saved', val: '14.2 L', icon: TrendingUp },
                  ].map((stat, i) => (
                    <div key={i} className="bg-card/50 border border-border p-3 rounded-xl">
                      <p className="text-[10px] text-textSecondary uppercase mb-1">{stat.label}</p>
                      <div className="flex items-center gap-2">
                        <stat.icon size={14} className="text-blue-500" />
                        <span className="text-sm font-bold text-white">{stat.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Animated Map Pins */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1/4 left-1/3 text-blue-500 pointer-events-none"
              >
                <MapPin size={24} />
              </motion.div>
              {reportSuccess && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-1/4 right-1/3 text-red-500 pointer-events-none"
                >
                  <MapPin size={24} fill="currentColor" fillOpacity={0.2} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
