import React, { useState } from 'react';
import { BookOpen, GraduationCap, Users, Network, TrendingUp, Presentation, Search, MapPin, MonitorPlay, ChevronRight, CheckCircle, ExternalLink } from 'lucide-react';
import { SectorAIChat } from './SectorAIChat';
import { ContentFeed } from './ContentFeed';

export const Education: React.FC<{ onOpenDetail?: (data: any) => void }> = ({ onOpenDetail }) => {
  const [activeTab, setActiveTab] = useState('scholarships');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const tabs = [
    { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
    { id: 'institutions', label: 'Institutions', icon: BookOpen },
    { id: 'training', label: 'Training Programs', icon: Presentation },
    { id: 'digital', label: 'Digital Classrooms', icon: MonitorPlay },
  ];

  return (
    <div className="space-y-6">
      {/* AI Hero */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-primary/30 rounded-2xl p-6 shadow-custom overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Network size={120} /></div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
          <h2 className="text-xl font-bold text-white">Education AI Agent</h2>
          <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-primary/30">Active</span>
        </div>
        <p className="text-sm text-textSecondary max-w-3xl mb-6">Personalized learning paths, scholarship recommendations, skill gap analysis, and career guidance.</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
          {[
            { icon: GraduationCap, t: 'Scholarships', d: 'AI-matched aid.', c: 'primary', tab: 'scholarships' },
            { icon: Presentation, t: 'Training Hub', d: 'Skill uplift programs.', c: 'success', tab: 'training' },
            { icon: MapPin, t: 'Institutions', d: 'School locators.', c: 'warning', tab: 'institutions' },
            { icon: Search, t: 'Research', d: 'Municipal grants.', c: 'indigo-400', tab: 'scholarships' },
            { icon: TrendingUp, t: 'Careers', d: 'Job pathways.', c: 'rose-400', tab: 'training' },
          ].map((item, i) => (
            <div key={i} onClick={() => setActiveTab(item.tab)}
              className={`bg-card/50 border backdrop-blur-sm p-4 rounded-xl transition cursor-pointer group ${i === 4 ? 'hidden md:block' : ''} ${activeTab === item.tab ? 'border-primary/50' : 'border-border hover:border-primary/30'}`}
            >
              <item.icon className={`text-${item.c} mb-2 group-hover:-translate-y-1 transition-transform`} size={20} />
              <h4 className="text-white text-sm font-bold mb-1">{item.t}</h4>
              <p className="text-xs text-textSecondary">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <SectorAIChat 
        sectorName="Education" 
        sectorColor="primary" 
        features={['Personalized learning', 'Scholarship matching', 'Career guidance', 'School analysis']}
      />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Education Department</h1>
          <p className="text-textSecondary">Quality Education for All in Butwal</p>
        </div>
        <a href="tel:071532820" className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-medium border border-primary/20 hover:bg-primary/20 transition">
          Education Helpline: 071-532820
        </a>
      </div>

      {/* Clickable Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Govt Schools', value: '45', icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10', tab: 'institutions', desc: 'Total community and government-run educational institutions in Butwal.' },
          { title: 'Scholarship Types', value: '5', icon: GraduationCap, color: 'text-warning', bg: 'bg-warning/10', tab: 'scholarships', desc: 'Active municipal scholarship categories for the current academic year.' },
          { title: 'Digital Classrooms', value: '30', icon: MonitorPlay, color: 'text-success', bg: 'bg-success/10', tab: 'digital', desc: 'Classrooms upgraded with AI-assisted learning and smart hardware.' },
          { title: 'Enrolled Students', value: '18,500+', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10', tab: 'institutions', desc: 'Total number of students enrolled across all municipal schools.' },
        ].map((card, i) => (
          <div key={i} onClick={() => {
            setActiveTab(card.tab);
            onOpenDetail?.({
              title: card.title,
              description: card.desc,
              sectorColor: 'primary'
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
          {activeTab === 'scholarships' && (
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-primary text-sm">
                <strong>Application Window:</strong> Bhadra 1 to Ashwin 30, 2082. Apply at Ward Offices. Required documents: Citizenship/birth certificate, marksheet, income certificate, and category-specific proof.
              </div>
              {[
                { name: 'Dalit Students', amt: 'Rs. 5,000/year', criteria: 'Must belong to Dalit community with valid ID.' },
                { name: 'Disabled Students', amt: 'Rs. 8,000/year', criteria: 'Disability certificate from government authority required.' },
                { name: 'Meritorious (>80% SEE)', amt: 'Rs. 3,000/year', criteria: 'SEE results above 80%. Marksheet verification mandatory.' },
                { name: 'Girls in STEM', amt: 'Rs. 4,000/year', criteria: 'Female students pursuing science/math at +2 level.' },
                { name: 'Single Women / Widows', amt: 'Rs. 6,000/year', criteria: 'Marriage/death certificate and ward verification letter needed.' },
              ].map((s, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === s.name ? null : s.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center"><GraduationCap size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">{s.name}</h4>
                        <p className="text-sm font-medium text-primary">{s.amt}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className={`text-textSecondary transition-transform ${expandedCard === s.name ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedCard === s.name && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
                      <p className="text-xs text-textSecondary">{s.criteria}</p>
                      <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1"><CheckCircle size={14} /> Apply</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'institutions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Educational Institutions in Butwal</h3>
              {[
                { name: 'Butwal Multiple Campus', type: 'TU Affiliated', level: 'Bachelor / Master', ward: 'Ward 11' },
                { name: 'Siddhartha Vanasthali Institute', type: 'Private', level: '+2 / Bachelor', ward: 'Ward 12' },
                { name: 'Lumbini Engineering College', type: 'Private', level: 'Bachelor Engineering', ward: 'Ward 5' },
                { name: 'Shree Padma Secondary School', type: 'Government', level: 'Class 1-12', ward: 'Ward 7' },
                { name: 'National Academy', type: 'Private', level: 'Class 1-12', ward: 'Ward 10' },
              ].map((inst, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === inst.name ? null : inst.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center shrink-0"><BookOpen size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{inst.name}</h4>
                        <p className="text-xs text-textSecondary">{inst.type} • {inst.level}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className={`text-textSecondary transition-transform ${expandedCard === inst.name ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedCard === inst.name && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-4">
                      <span className="text-xs text-textSecondary flex items-center gap-1"><MapPin size={12} /> {inst.ward}</span>
                      <button className="ml-auto text-primary text-sm font-medium hover:underline flex items-center gap-1"><ExternalLink size={14}/> Visit Page</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'training' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Vocational & Skill Training</h3>
              {[
                { name: 'Basic Computer Skills', duration: '3 Months', fee: 'Free', provider: 'Municipal IT Center' },
                { name: 'Tailoring & Fashion Design', duration: '6 Months', fee: 'Rs. 2,000', provider: 'Ward 8 Women Center' },
                { name: 'Electrician Training', duration: '6 Months', fee: 'Free (CTEVT)', provider: 'CTEVT-Butwal' },
                { name: 'Agriculture Extension Course', duration: '1 Month', fee: 'Free', provider: 'Agri Extension Office' },
              ].map((t, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === t.name ? null : t.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-success/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0"><Presentation size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{t.name}</h4>
                        <p className="text-xs text-textSecondary">{t.provider} • {t.duration}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-success">{t.fee}</span>
                  </div>
                  {expandedCard === t.name && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1"><CheckCircle size={14} /> Enroll Now</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'digital' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Smart Digital Classroom Initiative</h3>
              <p className="text-sm text-textSecondary">Butwal has deployed 30 digital classrooms across government schools with interactive whiteboards, high-speed internet, and AI-assisted learning management systems.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {[
                  { name: 'Ward 3 - Shree Janata School', status: 'Active', students: 450 },
                  { name: 'Ward 7 - Padma School', status: 'Active', students: 380 },
                  { name: 'Ward 11 - Butwal Campus Lab', status: 'Upgrading', students: 600 },
                ].map((d, i) => (
                  <div key={i} className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer">
                    <MonitorPlay size={24} className="text-primary mb-3" />
                    <h4 className="text-sm font-bold text-white mb-1">{d.name}</h4>
                    <p className="text-xs text-textSecondary mb-2">{d.students} students</p>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${d.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{d.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ContentFeed sector="Education" sectorColor="primary" />
    </div>
  );
};
