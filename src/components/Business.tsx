import React, { useState } from 'react';
import { Briefcase, TrendingUp, BarChart2, PieChart as PieChartIcon, Target, Network, ChevronRight, Building2, Landmark, Users } from 'lucide-react';
import { SectorAIChat } from './SectorAIChat';
import { ContentFeed } from './ContentFeed';

export const Business: React.FC<{ onOpenDetail?: (data: any) => void }> = ({ onOpenDetail }) => {
  const [activeTab, setActiveTab] = useState('economic');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const tabs = [
    { id: 'economic', label: 'Economic Indicators', icon: TrendingUp },
    { id: 'startups', label: 'Startup Programs', icon: Target },
    { id: 'funding', label: 'Funding', icon: PieChartIcon },
    { id: 'news', label: 'Market News', icon: BarChart2 },
  ];

  return (
    <div className="space-y-6">
       {/* AI Hero Section */}
       <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-primary/30 rounded-2xl p-6 shadow-custom overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Network size={120} />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Business & Economy AI Agent
          </h2>
          <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-primary/30">Active</span>
        </div>
        <p className="text-sm text-textSecondary max-w-3xl mb-6">Autonomous systems analyzing market insights, startup guidance, investment patterns, and economic trends for localized growth planning.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {tabs.map((tab, i) => (
            <div key={i} onClick={() => setActiveTab(tab.id)} 
              className={`bg-card/50 border backdrop-blur-sm p-4 rounded-xl transition cursor-pointer group ${activeTab === tab.id ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border hover:border-primary/30'}`}
            >
               <tab.icon className={`text-primary mb-2 group-hover:-translate-y-1 transition-transform`} size={20} />
               <h4 className="text-white text-sm font-bold mb-1">{tab.label}</h4>
               <p className="text-xs text-textSecondary">{tab.id === 'economic' ? 'Real-time local GDP.' : tab.id === 'startups' ? 'Grants & incubation.' : tab.id === 'funding' ? 'Investor matching.' : 'Market analytics.'}</p>
            </div>
          ))}
        </div>
      </div>

      <SectorAIChat 
        sectorName="Business" 
        sectorColor="blue" 
        features={['Market analysis', 'Startup advice', 'Tax estimation', 'Registration help']}
      />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Briefcase className="text-primary" size={32} /> Market & Economy
          </h1>
          <p className="text-textSecondary">Register businesses, track municipal GDP indicators, and request startup grants.</p>
        </div>
      </div>

      {/* Clickable Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Registered Businesses', value: '1,240', icon: Building2, color: 'text-primary', bg: 'bg-primary/10', tab: 'economic', desc: 'Total number of active business licenses registered in Butwal.' },
          { title: 'Active Startups', value: '85', icon: Target, color: 'text-success', bg: 'bg-success/10', tab: 'startups', desc: 'New ventures currently enrolled in municipal incubation programs.' },
          { title: 'Market Cap', value: 'Rs. 4.2B', icon: Landmark, color: 'text-warning', bg: 'bg-warning/10', tab: 'economic', desc: 'Estimated aggregate valuation of top registered local industries.' },
          { title: 'Employment', value: '15k+', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10', tab: 'economic', desc: 'Total workforce employed within the metropolitan business sectors.' },
        ].map((card, i) => (
          <div key={i} onClick={() => {
            setActiveTab(card.tab);
            onOpenDetail?.({
              title: card.title,
              description: card.desc,
              sectorColor: 'blue'
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

      {/* Tabbed Content */}
      <div className="bg-card border border-border rounded-2xl shadow-custom overflow-hidden">
        <div className="p-6 border-b border-border flex gap-4 text-sm flex-wrap">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`pb-2 -mb-[26px] flex items-center gap-2 font-medium transition-all ${activeTab === tab.id ? 'text-primary border-b-2 border-primary font-semibold' : 'text-textSecondary hover:text-white'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {activeTab === 'economic' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Local Economic Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'City GDP Growth (Annual)', value: '+6.8%', trend: 'up' },
                  { label: 'New Registrations (This Month)', value: '42', trend: 'up' },
                  { label: 'Local Tax Revenue', value: 'Rs. 120M', trend: 'up' },
                  { label: 'Unemployment Rate', value: '4.2%', trend: 'down' },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#0F172A] border border-border rounded-xl p-4 flex justify-between items-center">
                    <span className="text-sm text-textSecondary">{stat.label}</span>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <span className={`text-[10px] font-bold ${stat.trend === 'up' ? 'text-success' : 'text-primary'}`}>
                        {stat.trend === 'up' ? '↑ Increasing' : '↓ Decreasing'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'startups' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Butwal Startup Hub Initiatives</h3>
              {[
                { name: 'Municipal Innovation Grant 2082', donor: 'City Council', amount: 'Rs. 500k', status: 'Applied' },
                { name: 'Tech Incubation Program', donor: 'IT Innovation Dept', amount: 'Mentorship', status: 'Active' },
                { name: 'Women Entrepreneurship Loan', donor: 'Nepal Rastra Bank', amount: 'Rs. 1.5M @ 2%', status: 'Ongoing' },
              ].map((s, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === s.name ? null : s.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0"><Target size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{s.name}</h4>
                        <p className="text-xs text-textSecondary">{s.donor}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-primary">{s.amount}</span>
                  </div>
                  {expandedCard === s.name && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
                      <span className="text-xs text-textSecondary uppercase tracking-widest font-bold">Status: {s.status}</span>
                      <button className="text-primary text-sm font-medium hover:underline">Apply Now →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'funding' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Investment & Funding Matching</h3>
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-4">
                <p className="text-sm text-primary flex items-center gap-2 font-medium">
                  <Network size={16} /> AI-Powered Matching Service
                </p>
                <p className="text-xs text-primary/80 mt-1">Our agentic AI is currently matching 12 local startups with 4 angel investor groups based in Butwal & Kathmandu.</p>
              </div>
              {[
                { type: 'Seed Funding', pool: 'Rs. 25M', candidates: 12 },
                { type: 'Commercial Expansion', pool: 'Rs. 100M', candidates: 4 },
                { type: 'Micro-Finance Support', pool: 'Rs. 10M', candidates: 45 },
              ].map((f, i) => (
                <div key={i} className="bg-[#0F172A] border border-border rounded-xl p-5 flex justify-between items-center hover:border-warning/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center shrink-0"><PieChartIcon size={20} /></div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{f.type}</h4>
                      <p className="text-xs text-textSecondary">{f.candidates} shortlisted candidates</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{f.pool}</p>
                    <button className="text-warning text-xs font-bold hover:underline">View Ledger</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Local Business News</h3>
              {[
                { title: 'New Export Terminal at Belhiya Border Now Operational', date: 'Oct 14, 2026', tag: 'Trade' },
                { title: 'Tax Incentives Announced for IT Services in Ward 11', date: 'Oct 12, 2026', tag: 'Policy' },
                { title: 'Local Tourism Business Reaches Pre-Pandemic Levels', date: 'Oct 10, 2026', tag: 'Trend' },
              ].map((n, i) => (
                <div key={i} className="bg-[#0F172A] border border-border rounded-xl p-4 hover:border-indigo-400/50 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded">{n.tag}</span>
                    <span className="text-[10px] text-textSecondary">{n.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{n.title}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ContentFeed sector="Business" sectorColor="blue" />
    </div>
  );
};
