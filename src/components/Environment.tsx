import React, { useState } from 'react';
import { Wind, Network, BellRing, TreePine, FileText, Recycle, Clock, AlertTriangle, ThermometerSun, Calendar, ChevronRight } from 'lucide-react';
import { SectorAIChat } from './SectorAIChat';
import { ContentFeed } from './ContentFeed';

export const Environment: React.FC<{ onOpenDetail?: (data: any) => void }> = ({ onOpenDetail }) => {
  const [activeTab, setActiveTab] = useState('waste');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const tabs = [
    { id: 'waste', label: 'Waste Management', icon: Recycle },
    { id: 'aqi', label: 'Air Quality', icon: Wind },
    { id: 'conservation', label: 'Conservation', icon: TreePine },
    { id: 'climate', label: 'Climate Data', icon: ThermometerSun },
  ];

  return (
    <div className="space-y-6">
      {/* AI Hero */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-primary/30 rounded-2xl p-6 shadow-custom overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Network size={120} /></div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
          <h2 className="text-xl font-bold text-white">Environment AI Agent</h2>
          <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-primary/30">Active</span>
        </div>
        <p className="text-sm text-textSecondary max-w-3xl mb-6">Real-time environmental monitoring, pollution insights, climate data analysis, and sustainability optimization.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { icon: Wind, t: 'Air Quality', d: 'Real-time AQI.', c: 'warning', tab: 'aqi' },
            { icon: BellRing, t: 'Env Alerts', d: 'Pollution spikes.', c: 'danger', tab: 'aqi' },
            { icon: TreePine, t: 'Conservation', d: 'Green initiatives.', c: 'success', tab: 'conservation' },
            { icon: FileText, t: 'Climate Reports', d: 'Monthly data.', c: 'indigo-400', tab: 'climate' },
          ].map((item, i) => (
            <div key={i} onClick={() => setActiveTab(item.tab)}
              className={`bg-card/50 border backdrop-blur-sm p-4 rounded-xl transition cursor-pointer group ${activeTab === item.tab ? 'border-primary/50' : 'border-border'}`}
            >
              <item.icon className={`text-${item.c} mb-2 group-hover:-translate-y-1 transition-transform`} size={20} />
              <h4 className="text-white text-sm font-bold mb-1">{item.t}</h4>
              <p className="text-xs text-textSecondary">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <SectorAIChat 
        sectorName="Environment" 
        sectorColor="green" 
        features={['Air quality', 'Waste collection', 'Tree plantation', 'Tinau River info']}
      />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Environment Department</h1>
          <p className="text-textSecondary">Clean & Green Butwal</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Air Quality', value: '98', icon: Wind, color: 'text-warning', bg: 'bg-warning/10', tab: 'aqi', desc: 'Current Air Quality Index (AQI) average for Butwal city.' },
          { title: 'Waste Collected', value: '42t', icon: Recycle, color: 'text-success', bg: 'bg-success/10', tab: 'waste', desc: 'Total tonnage of municipal waste collected in the last 24 hours.' },
          { title: 'Green Space', value: '18%', icon: TreePine, color: 'text-emerald-400', bg: 'bg-emerald-400/10', tab: 'conservation', desc: 'Percentage of municipal area designated as parks or forest land.' },
          { title: 'Forest Area', value: '1.2k ha', icon: TreePine, color: 'text-primary', bg: 'bg-primary/10', tab: 'conservation', desc: 'Total protected forest area within the metropolitan boundary.' },
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
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}><card.icon size={24} /></div>
              <ChevronRight size={18} className="text-textSecondary" />
            </div>
            <h4 className="text-sm text-textSecondary font-medium mb-1">{card.title}</h4>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-2xl p-4 flex gap-4 flex-wrap">
        <a href="tel:071532810" className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/20 hover:bg-emerald-500/30 transition cursor-pointer">
          Waste Helpline: 071-532810
        </a>
        <a href="tel:071532815" className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-sm font-medium border border-emerald-500/20 hover:bg-emerald-500/30 transition cursor-pointer">
          Complaint Cell: 071-532815
        </a>
      </div>

      {/* Tabbed Content */}
      <div className="bg-card border border-border rounded-2xl shadow-custom overflow-hidden">
        <div className="p-6 border-b border-border flex gap-4 text-sm flex-wrap">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`pb-2 -mb-[26px] flex items-center gap-2 font-medium transition-all ${activeTab === tab.id ? 'text-emerald-500 border-b-2 border-emerald-500 font-semibold' : 'text-textSecondary hover:text-white'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6 space-y-6">
          {activeTab === 'waste' && (
            <>
              <h3 className="text-lg font-bold text-white">Waste Segregation Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { color: 'blue', label: 'Blue Bin — Dry Waste', items: 'Paper, cardboard, plastic bottles, glass, metal cans' },
                  { color: 'emerald', label: 'Green Bin — Wet Waste', items: 'Food scraps, vegetable peels, garden waste' },
                  { color: 'red', label: 'Red Bin — Hazardous', items: 'Batteries, chemicals, medicines, e-waste' },
                ].map((bin, i) => (
                  <div key={i} onClick={() => setExpandedCard(expandedCard === bin.label ? null : bin.label)}
                    className={`bg-[#0F172A] border border-border rounded-xl p-5 hover:border-${bin.color}-500/50 transition-colors cursor-pointer`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-${bin.color}-500/10 text-${bin.color}-500 flex items-center justify-center`}><Recycle size={20} /></div>
                      <h4 className="font-bold text-sm text-white">{bin.label}</h4>
                    </div>
                    <p className="text-xs text-textSecondary">{bin.items}</p>
                    {expandedCard === bin.label && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <button className="text-emerald-400 text-sm font-medium hover:underline">View Collection Points →</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-white">Collection Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { wards: 'Wards 1, 3, 5, 7, 9, 11 (Odd)', days: 'Monday & Thursday' },
                  { wards: 'Wards 2, 4, 6, 8, 10, 12 (Even)', days: 'Tuesday & Friday' },
                ].map((s, i) => (
                  <div key={i} className="bg-[#0F172A] border border-border rounded-xl p-5 flex items-center gap-4 cursor-pointer hover:border-emerald-500/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0"><Clock size={16} /></div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{s.wards}</h4>
                      <p className="text-sm text-emerald-500 font-medium">{s.days}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 text-warning text-sm flex gap-3">
                <AlertTriangle size={20} className="shrink-0" />
                <p><strong>Penalty:</strong> Rs. 500 for first offence of littering/illegal dumping. Rs. 2,000 for repeat offence. Report dumping to 071-532815.</p>
              </div>
            </>
          )}

          {activeTab === 'aqi' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Current Air Quality Index</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { location: 'Traffic Chowk', aqi: 142, level: 'Unhealthy for Sensitive Groups', color: 'warning' },
                  { location: 'Milanchowk', aqi: 98, level: 'Moderate', color: 'warning' },
                  { location: 'Yogikuti', aqi: 56, level: 'Good', color: 'success' },
                ].map((a, i) => (
                  <div key={i} className="bg-[#0F172A] border border-border rounded-xl p-5 cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setExpandedCard(expandedCard === a.location ? null : a.location)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-white">{a.location}</h4>
                      <span className={`text-3xl font-bold text-${a.color}`}>{a.aqi}</span>
                    </div>
                    <p className={`text-xs text-${a.color}`}>{a.level}</p>
                    {expandedCard === a.location && (
                      <div className="mt-3 pt-3 border-t border-border/50 text-xs text-textSecondary">
                        <p>PM2.5: {(a.aqi * 0.4).toFixed(1)} µg/m³ • PM10: {(a.aqi * 0.7).toFixed(1)} µg/m³</p>
                        <p className="mt-1">Updated: 10 minutes ago</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'conservation' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Active Conservation Programs</h3>
              {[
                { name: 'Tinau River Cleaning Drive', status: 'Ongoing', participants: 450, date: 'Every Saturday' },
                { name: 'Urban Tree Plantation 2082', status: 'Active', participants: 1200, date: 'Mar - Jun 2026' },
                { name: 'Plastic-Free Zone Campaign', status: 'Active', participants: 800, date: 'Year-round' },
              ].map((p, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === p.name ? null : p.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-success/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0"><TreePine size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{p.name}</h4>
                        <p className="text-xs text-textSecondary">{p.participants} participants</p>
                      </div>
                    </div>
                    <span className="bg-success/10 text-success text-[10px] px-2 py-1 rounded font-bold">{p.status}</span>
                  </div>
                  {expandedCard === p.name && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                      <span className="text-xs text-textSecondary flex items-center gap-1"><Calendar size={12} /> {p.date}</span>
                      <button className="text-success text-sm font-medium hover:underline">Volunteer →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'climate' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Monthly Climate Summary — Butwal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { month: 'October 2026', temp: '28°C / 18°C', rain: '45mm', humidity: '72%', deviation: '+1.2°C' },
                  { month: 'September 2026', temp: '32°C / 23°C', rain: '180mm', humidity: '85%', deviation: '+0.8°C' },
                  { month: 'August 2026', temp: '33°C / 25°C', rain: '320mm', humidity: '90%', deviation: '-0.5°C' },
                  { month: 'July 2026', temp: '34°C / 26°C', rain: '410mm', humidity: '92%', deviation: '+2.1°C' },
                ].map((c, i) => (
                  <div key={i} className="bg-[#0F172A] border border-border rounded-xl p-5 cursor-pointer hover:border-indigo-400/50 transition-colors"
                    onClick={() => setExpandedCard(expandedCard === c.month ? null : c.month)}
                  >
                    <h4 className="text-sm font-bold text-white mb-2">{c.month}</h4>
                    <div className="flex gap-4 text-xs text-textSecondary">
                      <span>🌡️ {c.temp}</span>
                      <span>🌧️ {c.rain}</span>
                      <span>💧 {c.humidity}</span>
                    </div>
                    {expandedCard === c.month && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-xs text-warning">Temperature deviation from historical average: {c.deviation}</p>
                        <button className="mt-2 text-indigo-400 text-sm font-medium hover:underline flex items-center gap-1"><FileText size={14} /> Download Report</button>
                      </div>
                    )}
                  </div>
                ))}
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
