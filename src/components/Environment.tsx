import React, { useState } from 'react';
import { Wind, Network, Recycle, Droplets, ShieldCheck, Waves, Truck, Zap } from 'lucide-react';
import { SectorAIChat } from './SectorAIChat';
import { ContentFeed } from './ContentFeed';
import { WasteOverhaul } from './Environment/WasteOverhaul';
import { GreenTransit } from './Environment/GreenTransit';
import { UrbanDrainage } from './Environment/UrbanDrainage';
import { Accountability } from './Environment/Accountability';

export const Environment: React.FC<{ onOpenDetail?: (data: any) => void }> = ({ onOpenDetail }) => {
  const [activeTab, setActiveTab] = useState('waste_v2');

  const tabs = [
    { id: 'waste_v2', label: 'Waste Overhaul', icon: Recycle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'transit', label: 'Green Transit', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'drainage', label: 'Urban Drainage', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'accountability', label: 'Digital Accountability', icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10' },
    { id: 'legacy', label: 'Legacy Data', icon: Network, color: 'text-textSecondary', bg: 'bg-card' },
  ];

  return (
    <div className="space-y-6">
      {/* AI Hero */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-primary/30 rounded-2xl p-6 shadow-custom overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Network size={120} /></div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]"></span>
          <h2 className="text-xl font-bold text-white">Butwal Environment AI Upgraded</h2>
          <span className="bg-emerald-500/20 text-emerald-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-emerald-500/30">v2.0 Active</span>
        </div>
        <p className="text-sm text-textSecondary max-w-3xl mb-6">Autonomous waste dispatch, predictive AQI transit routing, urban permeability mapping, and transparent legal accountability.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { icon: Truck, t: 'Waste AI', d: 'Genetic Routing.', c: 'text-emerald-500', tab: 'waste_v2' },
            { icon: Wind, t: 'AQI Forecast', d: 'Predictive Transit.', c: 'text-orange-500', tab: 'transit' },
            { icon: Waves, t: 'Flood Model', d: 'Monsoon Alarms.', c: 'text-blue-500', tab: 'drainage' },
            { icon: ShieldCheck, t: 'NLP Ledger', d: 'Legal Accountability.', c: 'text-primary', tab: 'accountability' },
          ].map((item, i) => (
            <div key={i} onClick={() => setActiveTab(item.tab)}
              className={`bg-card/50 border backdrop-blur-sm p-4 rounded-xl transition cursor-pointer group ${activeTab === item.tab ? 'border-primary/50' : 'border-border'}`}
            >
              <item.icon className={`${item.c} mb-2 group-hover:-translate-y-1 transition-transform`} size={20} />
              <h4 className="text-white text-sm font-bold mb-1">{item.t}</h4>
              <p className="text-xs text-textSecondary">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <SectorAIChat 
        sectorName="Environment" 
        sectorColor="green" 
        features={['Adaptive waste dispatch', 'AQI-aware transit detours', 'Permeability scores', 'Fine citations']}
      />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Environment & Sustainability</h1>
          <p className="text-textSecondary">Smart Green City Initiatives • Butwal Sub-Metropolitan</p>
        </div>
      </div>

      {/* Stats Cards - Upgraded */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'AQI Confidence', value: '94%', icon: Wind, color: 'text-orange-500', bg: 'bg-orange-500/10', tab: 'transit', desc: 'AI confidence score for 24-hour predictive PM2.5/PM10 modeling.' },
          { title: 'Routing Efficiency', value: '+18%', icon: Truck, color: 'text-emerald-500', bg: 'bg-emerald-500/10', tab: 'waste_v2', desc: 'Improvement in fuel efficiency via genetic routing optimization.' },
          { title: 'Ward Permeability', value: '42%', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500/10', tab: 'drainage', desc: 'Average municipal area ability to absorb rainwater runoff.' },
          { title: 'Enforced Fines', value: 'Rs. 1.8L', icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10', tab: 'accountability', desc: 'Total environmental fines issued and tracked via the public ledger.' },
        ].map((card, i) => (
          <div key={i} onClick={() => {
            setActiveTab(card.tab);
            onOpenDetail?.({
              title: card.title,
              description: card.desc,
              sectorColor: 'green'
            });
          }}
            className="bg-card border border-border rounded-2xl p-6 shadow-custom hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-primary/50"
          >
            <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${card.bg} ${card.color}`}><card.icon size={20} /></div>
            <h4 className="text-xs text-textSecondary font-medium mb-1 uppercase tracking-wider">{card.title}</h4>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Tabbed Content */}
      <div className="bg-card/30 border border-border rounded-2xl shadow-custom overflow-hidden">
        <div className="p-4 border-b border-border flex gap-2 md:gap-4 text-xs md:text-sm flex-wrap bg-white/5 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all ${activeTab === tab.id ? `${tab.bg} ${tab.color} font-semibold ring-1 ring-inset ring-white/10` : 'text-textSecondary hover:text-white hover:bg-white/5'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {activeTab === 'waste_v2' && <WasteOverhaul />}
          {activeTab === 'transit' && <GreenTransit />}
          {activeTab === 'drainage' && <UrbanDrainage />}
          {activeTab === 'accountability' && <Accountability />}
          {activeTab === 'legacy' && (
            <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
              <Network size={48} className="mx-auto text-textSecondary opacity-20" />
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-bold text-white">Legacy Environment Portal</h3>
                <p className="text-sm text-textSecondary mb-6">Historical climate summaries and general waste segregation guides are archived here for reference.</p>
                <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 text-warning text-xs">
                  Note: All active interventions are now managed via the new AI modules.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generative Content Feed */}
      <ContentFeed sector="Environment" sectorColor="green" />
    </div>
  );
};
