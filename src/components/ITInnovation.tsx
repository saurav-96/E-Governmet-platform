import React, { useState } from 'react';
import { Cpu, Wifi, Server, Code, Shield, ChevronRight, ExternalLink, Github, Network } from 'lucide-react';
import { SectorAIChat } from './SectorAIChat';
import { ContentFeed } from './ContentFeed';

export const ITInnovation: React.FC<{ onOpenDetail?: (data: any) => void }> = ({ onOpenDetail }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const tabs = [
    { id: 'projects', label: 'Digital Initiatives', icon: Cpu },
    { id: 'apis', label: 'Open APIs', icon: Code },
    { id: 'infra', label: 'Infrastructure', icon: Server },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">IT & Innovation Department</h1>
          <p className="text-textSecondary">Smart Technologies for Digital Butwal</p>
        </div>
        <button onClick={() => setActiveTab('infra')}
          className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-sm font-medium border border-indigo-500/20 flex items-center gap-2 hover:bg-indigo-500/20 transition"
        >
          <Wifi size={16} /> Free City Wi-Fi Status
        </button>
      </div>

      {/* AI Hero */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-indigo-500/30 rounded-2xl p-6 shadow-custom overflow-hidden relative mb-6">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Network size={120} /></div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.6)]"></span>
          <h2 className="text-xl font-bold text-white">Innovation AI Agent</h2>
          <span className="bg-indigo-500/20 text-indigo-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-indigo-500/30">Active</span>
        </div>
        <p className="text-sm text-textSecondary max-w-3xl mb-6">R&D assistance, tech stack optimization, API troubleshooting, and innovation project management.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { icon: Cpu, t: 'Project R&D', d: 'Tech feasibility.', c: 'primary' },
            { icon: Code, t: 'API Console', d: 'Endpoint testing.', c: 'success' },
            { icon: Shield, t: 'Cyber Audit', d: 'Vulnerability scan.', c: 'warning' },
            { icon: Server, t: 'Infra Map', d: 'Nodes & server status.', c: 'indigo-400' },
          ].map((item, i) => (
            <div key={i} className="bg-card/50 border border-border backdrop-blur-sm p-4 rounded-xl transition cursor-pointer group hover:border-indigo-400/30">
              <item.icon className={`text-${item.c} mb-2 group-hover:-translate-y-1 transition-transform`} size={20} />
              <h4 className="text-white text-sm font-bold mb-1">{item.t}</h4>
              <p className="text-xs text-textSecondary">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <SectorAIChat 
        sectorName="IT & Innovation" 
        sectorColor="indigo" 
        features={['Code review', 'API documentation', 'Tech stack advice', 'Cybersecurity audit']}
      />

      {/* Clickable Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Smart Services', value: '24', icon: Cpu, color: 'text-primary', bg: 'bg-primary/10', tab: 'projects', desc: 'Digital municipal services fully automated through the SmartGov portal.' },
          { title: 'Data Centers', value: '2', icon: Server, color: 'text-indigo-400', bg: 'bg-indigo-400/10', tab: 'infra', desc: 'Primary and disaster recovery data centers hosted within municipal premises.' },
          { title: 'Open APIs', value: '12', icon: Code, color: 'text-success', bg: 'bg-success/10', tab: 'apis', desc: 'Public API endpoints provided for developers to build third-party civic apps.' },
          { title: 'Security Alerts', value: '0', icon: Shield, color: 'text-success', bg: 'bg-success/10', tab: 'infra', desc: 'Real-time cybersecurity health status and threat monitoring level.' },
        ].map((card, i) => (
          <div key={i} onClick={() => {
            setActiveTab(card.tab);
            onOpenDetail?.({
              title: card.title,
              description: card.desc,
              sectorColor: 'indigo'
            });
          }}
            className="bg-card border border-border rounded-2xl p-6 shadow-custom hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-indigo-400/50"
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
              className={`pb-2 -mb-[26px] flex items-center gap-2 font-medium transition-all ${activeTab === tab.id ? 'text-indigo-400 border-b-2 border-indigo-400 font-semibold' : 'text-textSecondary hover:text-white'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'AI-Powered Traffic Monitoring', progress: 85, status: 'Testing', desc: 'Computer vision across 45 major intersections for real-time traffic analysis and incident detection.' },
                { title: 'Integrated E-Governance Portal V2', progress: 100, status: 'Live', desc: 'Comprehensive portal integrating all municipal services, tax payments, grievance registration, and AI assistants.' },
                { title: 'City-wide Free Wi-Fi Expansion', progress: 60, status: 'In Progress', desc: 'Expanding free public Wi-Fi coverage to 15 additional parks and public squares.' },
                { title: 'Blockchain-based Land Records', progress: 20, status: 'Planning', desc: 'Digitizing land registry and ownership records using distributed ledger technology.' },
              ].map((p, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === p.title ? null : p.title)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-indigo-500/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white text-sm">{p.title}</h4>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'Live' ? 'bg-success/10 text-success' : 
                      p.status === 'Testing' ? 'bg-warning/10 text-warning' : 
                      p.status === 'Planning' ? 'bg-primary/10 text-primary' : 'bg-indigo-500/10 text-indigo-400'
                    }`}>{p.status}</span>
                  </div>
                  <p className="text-xs text-textSecondary mb-4 leading-relaxed line-clamp-2">{p.desc}</p>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-textSecondary">Progress</span>
                      <span className="text-white font-medium">{p.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${p.progress}%` }}></div>
                    </div>
                  </div>
                  {expandedCard === p.title && (
                    <div className="mt-4 pt-3 border-t border-border/50 flex gap-3">
                      <button className="bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-500/20 transition flex items-center gap-1">
                        <ExternalLink size={14} /> View Details
                      </button>
                      {p.status === 'Live' && (
                        <button className="bg-success/10 text-success px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-success/20 transition">
                          Open Portal
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'apis' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Open Municipal APIs</h3>
              <p className="text-sm text-textSecondary mb-4">Butwal provides open APIs for developers to build civic-tech applications.</p>
              {[
                { name: 'Traffic Data API', endpoint: '/api/v1/traffic', calls: '12K/month', status: 'Stable' },
                { name: 'Air Quality API', endpoint: '/api/v1/aqi', calls: '8K/month', status: 'Stable' },
                { name: 'Citizen Services API', endpoint: '/api/v1/services', calls: '25K/month', status: 'Stable' },
                { name: 'Budget Transparency API', endpoint: '/api/v1/budget', calls: '3K/month', status: 'Beta' },
              ].map((api, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === api.name ? null : api.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-success/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0"><Code size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{api.name}</h4>
                        <p className="text-xs text-textSecondary font-mono">{api.endpoint}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded font-bold ${api.status === 'Beta' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>{api.status}</span>
                  </div>
                  {expandedCard === api.name && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                      <span className="text-xs text-textSecondary">{api.calls} calls</span>
                      <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1"><Github size={14} /> View Docs</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'infra' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Digital Infrastructure Status</h3>
              {[
                { name: 'Primary Data Center — Ward 11', status: 'Operational', uptime: '99.97%', load: '62%' },
                { name: 'Backup Data Center — Ward 5', status: 'Standby', uptime: '99.99%', load: '15%' },
                { name: 'City Wi-Fi Network', status: 'Active', uptime: '98.5%', load: '78%' },
                { name: 'CCTV Surveillance Grid', status: 'Active', uptime: '99.2%', load: '85%' },
              ].map((infra, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === infra.name ? null : infra.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-indigo-400/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-400/10 text-indigo-400 flex items-center justify-center shrink-0"><Server size={20} /></div>
                      <h4 className="text-sm font-bold text-white">{infra.name}</h4>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded font-bold ${infra.status === 'Standby' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>{infra.status}</span>
                  </div>
                  {expandedCard === infra.name && (
                    <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-xs text-textSecondary">Uptime</p>
                        <p className="text-lg font-bold text-success">{infra.uptime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-textSecondary">Current Load</p>
                        <p className="text-lg font-bold text-white">{infra.load}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ContentFeed sector="IT & Innovation" sectorColor="indigo" />
    </div>
  );
};
