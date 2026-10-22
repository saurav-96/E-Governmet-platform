import React, { useState } from 'react';
import { Wind, Navigation, Zap, AlertCircle, ShieldAlert, Bus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const aqiData = [
  { time: '08:00', aqi: 110 },
  { time: '10:00', aqi: 135 },
  { time: '12:00', aqi: 158 },
  { time: '14:00', aqi: 165 },
  { time: '16:00', aqi: 145 },
  { time: '18:00', aqi: 130 },
  { time: '20:00', aqi: 120 },
  { time: '22:00', aqi: 115 },
  { time: '00:00', aqi: 95 },
  { time: '02:00', aqi: 85 },
  { time: '04:00', aqi: 90 },
  { time: '06:00', aqi: 105 },
];

export const GreenTransit: React.FC = () => {
  const [activeDetour, setActiveDetour] = useState(false);
  const [selectedJunction, setSelectedJunction] = useState('Traffic Chowk');

  const junctions = [
    { name: 'Traffic Chowk', aqi: 165, status: 'Hazardous', active: true },
    { name: 'Milanchowk', aqi: 120, status: 'Unhealthy', active: false },
    { name: 'Yogikuti', aqi: 95, status: 'Moderate', active: false }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AQI Prediction Dashboard */}
        <section className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden shadow-custom">
          <div className="p-6 border-b border-border bg-orange-500/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                <Wind size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">24h AI Air Quality Forecast</h3>
                <p className="text-xs text-textSecondary">Predictive PM2.5/PM10 modeling for Butwal junctions.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="bg-orange-500/10 text-orange-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-orange-500/20">
                Live Analysis
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={aqiData}>
                  <defs>
                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#64748b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    interval={2}
                  />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '12px' }}
                    itemStyle={{ color: '#F97316' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="aqi" 
                    stroke="#F97316" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorAqi)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: 'Forecast PM2.5', val: '84 µg/m³', sub: 'High' },
                { label: 'Forecast PM10', val: '126 µg/m³', sub: 'Moderate' },
                { label: 'Dominant Source', val: 'Vehicle Idling', sub: 'Diesel' },
                { label: 'AI Confidence', val: '94.2%', sub: 'Real-time' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#0F172A] border border-border p-3 rounded-xl">
                  <p className="text-[10px] text-textSecondary uppercase mb-1">{stat.label}</p>
                  <p className="text-sm font-bold text-white">{stat.val}</p>
                  <p className="text-[10px] text-orange-500 font-medium">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Junction Alerts */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-custom flex flex-col">
          <div className="p-6 border-b border-border bg-red-500/5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertCircle size={20} className="text-red-500" />
              Hotspot Alerts
            </h3>
          </div>
          <div className="p-6 space-y-4 flex-grow">
            {junctions.map((j) => (
              <div 
                key={j.name}
                onClick={() => setSelectedJunction(j.name)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedJunction === j.name 
                    ? 'bg-red-500/10 border-red-500/50' 
                    : 'bg-[#0F172A] border-border hover:border-red-500/30'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-white">{j.name}</h4>
                  <span className={`text-xs font-bold ${j.status === 'Hazardous' ? 'text-red-500' : 'text-orange-500'}`}>
                    AQI {j.aqi}
                  </span>
                </div>
                <p className="text-[10px] text-textSecondary">{j.status} peak predicted at 14:00</p>
              </div>
            ))}
          </div>
          <div className="p-6 bg-[#0F172A]/50 border-t border-border mt-auto">
            <p className="text-xs text-textSecondary italic">
              AI suggests immediate traffic re-routing at {selectedJunction} to suppress emissions.
            </p>
          </div>
        </section>
      </div>

      {/* Transit Management & EV Planner */}
      <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-custom">
        <div className="p-6 border-b border-border bg-emerald-500/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
              <Navigation size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">EV Corridor & Transit Planner</h3>
              <p className="text-xs text-textSecondary">Active suppression of diesel idling via smart re-routing.</p>
            </div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveDetour(!activeDetour)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
              activeDetour 
                ? 'bg-red-500 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20'
            }`}
          >
            {activeDetour ? <ShieldAlert size={16} /> : <Zap size={16} />}
            {activeDetour ? 'EV-ONLY DETOUR ACTIVE' : 'ACTIVATE EV-DETOUR'}
          </motion.button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-[#0A0F1E] border border-border rounded-2xl p-4 h-64 relative overflow-hidden flex items-center justify-center">
              {/* Transit Map Visualization */}
              <div className="absolute inset-0 z-0 opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 400 200">
                  <circle cx="200" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#64748b" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="200" stroke="#64748b" strokeWidth="1" />
                </svg>
              </div>

              <div className="relative z-10 w-full px-8 text-center">
                <AnimatePresence mode="wait">
                  {activeDetour ? (
                    <motion.div 
                      key="detour"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-center gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center border border-red-500/30">
                            <ShieldAlert size={24} />
                          </div>
                          <span className="text-[10px] text-white font-bold">Diesel Blocked</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-emerald-500-20 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-500/30">
                            <Zap size={24} />
                          </div>
                          <span className="text-[10px] text-white font-bold">EV Flowing</span>
                        </div>
                      </div>
                      <div className="bg-red-500/20 border border-red-500/30 p-3 rounded-xl text-[11px] text-red-400">
                        Traffic Chowk → Milanchowk detour active for non-electric vehicles.
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="normal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2 opacity-40"
                    >
                      <Bus size={48} className="mx-auto mb-2 text-textSecondary" />
                      <p className="text-sm font-medium text-textSecondary">Simulating Normal Transit Flow</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border p-4 rounded-xl">
                <p className="text-[10px] text-textSecondary uppercase mb-2">Diesel Engine Suppression</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-white">{activeDetour ? '42%' : '0%'}</span>
                  <span className="text-xs text-success mb-1 flex items-center"><Zap size={10} /> +12% goal</span>
                </div>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl">
                <p className="text-[10px] text-textSecondary uppercase mb-2">Transit Efficiency</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-white">{activeDetour ? '92%' : '84%'}</span>
                  <span className="text-xs text-blue-400 mb-1">AI Optimized</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Bus size={18} className="text-emerald-500" />
              Public Electric Tempo (E-Rickshaw) Schedule
            </h4>
            <div className="bg-[#0F172A] border border-border rounded-xl divide-y divide-border overflow-hidden">
              {[
                { route: 'Route A: Park to Chowk', status: 'Enhanced Frequency', time: 'Every 4 mins', icon: Zap },
                { route: 'Route B: Bypass Loop', status: 'Priority Lane', time: 'Every 6 mins', icon: Navigation },
                { route: 'Route C: River Side', status: 'Normal', time: 'Every 10 mins', icon: Bus },
              ].map((route, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${route.status === 'Enhanced Frequency' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-card text-textSecondary'}`}>
                      <route.icon size={16} />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">{route.route}</h5>
                      <p className="text-[10px] text-textSecondary">{route.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald-500">{route.time}</p>
                    <p className="text-[10px] text-textSecondary">Next: 3m</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-2 text-xs text-emerald-500 font-bold hover:underline py-2">
              View Detailed EV Corridor Network →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
