import React, { useState } from 'react';
import { Map, Droplets, TreePine, AlertTriangle, Info, Activity, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UrbanDrainage: React.FC = () => {
  const [activeOverlay, setActiveOverlay] = useState<'permeability' | 'canopy'>('permeability');
  const [hoveredWard, setHoveredWard] = useState<string | null>(null);

  const wardStats = [
    { id: '11', name: 'Ward 11 (Center)', permeability: 24, canopy: 12, floodRisk: 'High' },
    { id: '9', name: 'Ward 9 (North)', permeability: 45, canopy: 35, floodRisk: 'Medium' },
    { id: '4', name: 'Ward 4 (West)', permeability: 38, canopy: 28, floodRisk: 'Medium' },
    { id: '1', name: 'Ward 1 (East)', permeability: 62, canopy: 55, floodRisk: 'Low' }
  ];

  const drainageJunctions = [
    { id: 'J-1', name: 'Traffic Chowk Main Drain', status: 'Blocked (80%)', action: 'Immediate De-silting' },
    { id: 'J-5', name: 'Milanchowk Secondary', status: 'Clear', action: 'Normal' },
    { id: 'J-12', name: 'Hill Park Runoff', status: 'Critical', action: 'Emergency Clearance' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive Map Section */}
        <section className="lg:col-span-3 bg-card border border-border rounded-2xl overflow-hidden shadow-custom flex flex-col min-h-[600px]">
          <div className="p-6 border-b border-border bg-blue-500/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                <Map size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Infrastructure Permeability & Canopy Map</h3>
                <p className="text-xs text-textSecondary">AI-powered urban urbanization analysis for flood mitigation.</p>
              </div>
            </div>
            <div className="flex bg-[#0F172A] p-1 rounded-xl border border-border">
              <button 
                onClick={() => setActiveOverlay('permeability')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeOverlay === 'permeability' ? 'bg-blue-500 text-white' : 'text-textSecondary hover:text-white'
                }`}
              >
                <Droplets size={14} /> Permeability
              </button>
              <button 
                onClick={() => setActiveOverlay('canopy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeOverlay === 'canopy' ? 'bg-emerald-500 text-white' : 'text-textSecondary hover:text-white'
                }`}
              >
                <TreePine size={14} /> Canopy Cover
              </button>
            </div>
          </div>

          <div className="flex-grow relative bg-[#0A0F1E] flex items-center justify-center p-8">
            {/* Mock Map with SVGs */}
            <div className="w-full max-w-2xl aspect-[4/3] relative">
              <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
                {/* Simulated Ward Shapes */}
                {[
                  { d: "M50,50 L150,40 L160,120 L40,130 Z", id: "1", color: activeOverlay === 'permeability' ? "fill-blue-500/40" : "fill-emerald-500/60" },
                  { d: "M150,40 L350,60 L360,140 L160,120 Z", id: "9", color: activeOverlay === 'permeability' ? "fill-blue-500/30" : "fill-emerald-500/40" },
                  { d: "M40,130 L160,120 L180,250 L30,240 Z", id: "4", color: activeOverlay === 'permeability' ? "fill-blue-500/20" : "fill-emerald-500/30" },
                  { d: "M160,120 L360,140 L380,260 L180,250 Z", id: "11", color: activeOverlay === 'permeability' ? "fill-red-500/40" : "fill-emerald-500/10" },
                ].map((ward) => (
                  <path 
                    key={ward.id}
                    d={ward.d} 
                    className={`${ward.color} stroke-border hover:stroke-white transition-all cursor-pointer`}
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredWard(ward.id)}
                    onMouseLeave={() => setHoveredWard(null)}
                  />
                ))}
                
                {/* River Tinau Line */}
                <path d="M0,80 Q100,70 150,150 T400,220" fill="none" stroke="#2563eb" strokeWidth="4" strokeOpacity="0.6" strokeDasharray="10,5" />
                
                {/* Drainage Nodes */}
                <circle cx="160" cy="120" r="6" fill="#F43F5E" className="animate-pulse" />
                <circle cx="210" cy="180" r="5" fill="#F43F5E" className="animate-pulse" />
              </svg>

              {/* Legend overlay */}
              <div className="absolute bottom-4 left-4 bg-[#1E293B]/90 backdrop-blur-md border border-border p-3 rounded-xl text-[10px] space-y-2">
                <p className="font-bold text-white mb-2 uppercase">Legend</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${activeOverlay === 'permeability' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                  <span className="text-textSecondary">High {activeOverlay === 'permeability' ? 'Permeability' : 'Canopy'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${activeOverlay === 'permeability' ? 'bg-red-500/50' : 'bg-emerald-500/10'}`}></div>
                  <span className="text-textSecondary">Low (Critical)</span>
                </div>
              </div>

              {/* Ward Info Tooltip */}
              <AnimatePresence>
                {hoveredWard && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-primary/50 p-4 rounded-2xl shadow-2xl z-20 pointer-events-none w-48"
                  >
                    <h5 className="font-bold text-white text-sm mb-2">{wardStats.find(w => w.id === hoveredWard)?.name}</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-textSecondary">Permeability</span>
                        <span className="text-blue-400 font-bold">{wardStats.find(w => w.id === hoveredWard)?.permeability}%</span>
                      </div>
                      <div className="w-full bg-border h-1 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: `${wardStats.find(w => w.id === hoveredWard)?.permeability}%` }}></div>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-textSecondary">Canopy Cover</span>
                        <span className="text-emerald-400 font-bold">{wardStats.find(w => w.id === hoveredWard)?.canopy}%</span>
                      </div>
                      <div className="w-full bg-border h-1 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${wardStats.find(w => w.id === hoveredWard)?.canopy}%` }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Sidebar: Flood Predictor */}
        <div className="space-y-6 flex flex-col">
          <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-custom flex-grow">
            <div className="p-6 border-b border-border bg-emerald-500/5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Waves size={20} className="text-blue-500" />
                Monsoon Predictor
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-[#0F172A] border border-border rounded-xl p-4 text-center">
                <p className="text-[10px] text-textSecondary uppercase tracking-widest mb-1">Tinau Hydrology Risk</p>
                <div className="flex items-center justify-center gap-3">
                  <Activity size={20} className="text-emerald-500" />
                  <span className="text-2xl font-bold text-white">NORMAL</span>
                </div>
                <p className="text-[10px] text-emerald-500 font-medium mt-1">Water Level: 2.4m (Safe)</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-3">Critical Drainage Junctions</h4>
                <div className="space-y-3">
                  {drainageJunctions.map((j) => (
                    <div key={j.id} className="p-3 bg-[#0F172A] border border-border rounded-xl">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-[11px] font-bold text-white leading-tight">{j.name}</p>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          j.status.includes('Blocked') ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                        }`}>
                          {j.status}
                        </span>
                      </div>
                      <p className={`text-[10px] font-medium flex items-center gap-1 ${
                        j.action.includes('Immediate') ? 'text-orange-500' : 'text-textSecondary'
                      }`}>
                        {j.action.includes('Immediate') && <AlertTriangle size={10} />}
                        Action: {j.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h5 className="text-[10px] font-bold text-blue-400 uppercase mb-2">Surface Runoff Model</h5>
                <p className="text-xs text-textSecondary leading-relaxed">
                  Predictive analysis shows a 15% increase in runoff risk for Ward 11 due to decreased permeability score (24%).
                </p>
              </div>
            </div>
          </section>

          <button className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-3 rounded-xl border border-blue-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2">
            <Info size={16} />
            Ward Improvement Plan
          </button>
        </div>
      </div>
    </div>
  );
};
