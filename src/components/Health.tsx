import React, { useState } from 'react';
import { HeartPulse, Stethoscope, FileText, Network, Building2, Megaphone, Syringe, AlertCircle, Phone, AlertTriangle, ChevronRight, MapPin, Clock, CheckCircle } from 'lucide-react';
import { SectorAIChat } from './SectorAIChat';
import { ContentFeed } from './ContentFeed';

export const Health: React.FC<{ onOpenDetail?: (data: any) => void }> = ({ onOpenDetail }) => {
  const [activeTab, setActiveTab] = useState('emergency');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const tabs = [
    { id: 'emergency', label: 'Emergency & Contacts', icon: Phone },
    { id: 'schemes', label: 'Health Schemes', icon: HeartPulse },
    { id: 'hospitals', label: 'Hospitals & Clinics', icon: Building2 },
    { id: 'vaccination', label: 'Vaccination', icon: Syringe },
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
          <h2 className="text-xl font-bold text-white flex items-center gap-2">Healthcare AI Agent</h2>
          <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-primary/30">Active</span>
        </div>
        <p className="text-sm text-textSecondary max-w-3xl mb-6">Expert system providing general health analysis, symptom guidance, hospital discovery, and preventive health strategies.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { icon: Building2, title: 'Hospitals & Clinics', desc: 'Bed availability sync.', color: 'primary', tab: 'hospitals' },
            { icon: Megaphone, title: 'Health Campaigns', desc: 'Upcoming medical camps.', color: 'success', tab: 'schemes' },
            { icon: AlertCircle, title: 'Emergency Info', desc: 'Ambulance routing.', color: 'danger', tab: 'emergency' },
            { icon: Syringe, title: 'Vaccination', desc: 'Immunization schedules.', color: 'warning', tab: 'vaccination' },
          ].map((item, i) => (
            <div key={i} onClick={() => setActiveTab(item.tab)}
              className={`bg-card/50 border backdrop-blur-sm p-4 rounded-xl transition cursor-pointer group ${activeTab === item.tab ? `border-${item.color}/50 ring-1 ring-${item.color}/20` : 'border-border hover:border-' + item.color + '/50'}`}
            >
              <item.icon className={`text-${item.color} mb-2 group-hover:-translate-y-1 transition-transform`} size={20} />
              <h4 className="text-white text-sm font-bold mb-1">{item.title}</h4>
              <p className="text-xs text-textSecondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sector AI Chat */}
      <SectorAIChat 
        sectorName="Health" 
        sectorColor="blue" 
        features={['Health information', 'Hospital discovery', 'Wellness guidance', 'Health awareness']}
      />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Health Department</h1>
          <p className="text-textSecondary">Butwal Sub-Metropolitan City</p>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-danger border border-danger/50 rounded-2xl p-6 shadow-custom flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-white font-bold flex items-center gap-2 text-lg">
          <AlertTriangle size={24} /> EMERGENCY CONTACTS — CALL IMMEDIATELY
        </h2>
        <div className="flex gap-4">
          <a href="tel:102" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/20 flex items-center gap-2">
            <Phone size={16} /> 102 (Ambulance)
          </a>
          <a href="tel:071540201" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/20 flex items-center gap-2">
            <Phone size={16} /> 071-540201
          </a>
        </div>
      </div>

      {/* Stats Cards - clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Health Schemes', value: '6', icon: FileText, color: 'text-warning', bg: 'bg-warning/10', tab: 'schemes', description: 'Comprehensive insurance and support programs for citizens.' },
          { title: 'Facilities', value: '6', icon: Building2, color: 'text-success', bg: 'bg-success/10', tab: 'hospitals', description: 'Public and private medical facilities within municipality.' },
          { title: 'Total Beds', value: '895', icon: Stethoscope, color: 'text-primary', bg: 'bg-primary/10', tab: 'hospitals', description: 'Consolidated real-time bed availability across all hospitals.' },
          { title: 'Vaccination Programs', value: '4', icon: HeartPulse, color: 'text-indigo-400', bg: 'bg-indigo-400/10', tab: 'vaccination', description: 'Ongoing immunization drives for all age groups.' },
        ].map((card, i) => (
          <div key={i} onClick={() => {
            setActiveTab(card.tab);
            onOpenDetail?.({
              title: card.title,
              description: card.description,
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

      {/* Main Tab Content */}
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
        
        <div className="p-6 space-y-6">
          {activeTab === 'emergency' && (
            <>
              <div className="bg-[#0F172A] border border-border rounded-2xl p-6 flex items-center gap-6">
                <div className="w-16 h-16 bg-danger rounded-2xl flex items-center justify-center shadow-lg shadow-danger/20 shrink-0">
                  <Phone size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-danger font-bold text-sm mb-1 uppercase tracking-wider">Medical Emergency</p>
                  <p className="text-4xl font-bold text-white mb-2">102</p>
                  <p className="text-textSecondary text-sm">National Ambulance Service — Available 24/7 across Nepal. Free of charge for all citizens.</p>
                </div>
                <a href="tel:102" className="bg-danger hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex gap-2 items-center">
                  <Phone size={18} /> Call 102
                </a>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">All Health Emergency Numbers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Ambulance (National)', number: '102', primary: true },
                  { title: 'Butwal District Hospital', number: '071-540201', primary: true },
                  { title: 'Health Helpline (Govt)', number: '1115', primary: false },
                  { title: 'Suicide Prevention', number: '1166', primary: false },
                ].map((c, i) => (
                  <a key={i} href={`tel:${c.number.replace(/-/g, '')}`}
                    className={`bg-[#0F172A] border ${c.primary ? 'border-danger/30 hover:border-danger/60' : 'border-border hover:border-primary/50'} rounded-2xl p-4 flex items-center gap-4 transition-colors cursor-pointer`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.primary ? 'bg-danger text-white' : 'bg-card text-textSecondary border border-border'}`}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-textSecondary text-xs">{c.title}</p>
                      <p className={`text-lg font-bold ${c.primary ? 'text-danger' : 'text-primary'}`}>{c.number}</p>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}

          {activeTab === 'schemes' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Government Health Schemes</h3>
              {[
                { name: 'Free Basic Health Services', desc: 'Essential drugs and treatments provided free at municipal health posts.', status: 'Active' },
                { name: 'Aama Suraksha (Safe Motherhood)', desc: 'Free institutional delivery, 4 ANC visits, and postnatal check-ups.', status: 'Active' },
                { name: 'Jeevan Raksha (Emergency Fund)', desc: 'Rs. 100,000 emergency fund for critical surgical patients below poverty line.', status: 'Active' },
                { name: 'Senior Citizens Health Card', desc: 'Free health card for citizens above 60 enabling discounted medicines and check-ups.', status: 'Active' },
                { name: 'School Health Program', desc: 'Annual health screening, deworming, and iron supplementation for school students.', status: 'Seasonal' },
                { name: 'Mental Health Support', desc: 'Subsidized counselling services at public health facilities. Walk-in and teleconsultation available.', status: 'Active' },
              ].map((scheme, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === scheme.name ? null : scheme.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><HeartPulse size={20} /></div>
                      <h4 className="text-sm font-bold text-white">{scheme.name}</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded ${scheme.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{scheme.status}</span>
                      <ChevronRight size={16} className={`text-textSecondary transition-transform ${expandedCard === scheme.name ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  {expandedCard === scheme.name && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <p className="text-sm text-textSecondary">{scheme.desc}</p>
                      <button className="mt-3 text-sm font-medium text-primary hover:underline flex items-center gap-1">
                        <CheckCircle size={14} /> Check Eligibility
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'hospitals' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Healthcare Facilities in Butwal</h3>
              {[
                { name: 'Lumbini Provincial Hospital', type: 'Government', beds: 350, phone: '071-540201', emergency: true },
                { name: 'Butwal City Hospital', type: 'Private', beds: 120, phone: '071-542300', emergency: true },
                { name: 'Om Hospital', type: 'Private', beds: 80, phone: '071-541111', emergency: true },
                { name: 'Global IME Hospital', type: 'Private', beds: 200, phone: '071-544200', emergency: true },
                { name: 'Siddhartha Children Hospital', type: 'Semi-Govt', beds: 60, phone: '071-540500', emergency: false },
                { name: 'Ward 5 Health Post', type: 'Government', beds: 10, phone: '071-539100', emergency: false },
              ].map((h, i) => (
                <div key={i} className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedCard(expandedCard === h.name ? null : h.name)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0"><Building2 size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{h.name}</h4>
                        <p className="text-xs text-textSecondary">{h.type} • {h.beds} Beds</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {h.emergency && <span className="bg-danger/10 text-danger text-[10px] px-2 py-1 rounded font-bold">24/7 ER</span>}
                      <ChevronRight size={16} className={`text-textSecondary transition-transform ${expandedCard === h.name ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  {expandedCard === h.name && (
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-4">
                      <a href={`tel:${h.phone.replace(/-/g, '')}`} className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                        <Phone size={14} /> {h.phone}
                      </a>
                      <button className="bg-card text-textSecondary hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 border border-border">
                        <MapPin size={14} /> Get Directions
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'vaccination' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Immunization Programs</h3>
              {[
                { name: 'Routine Child Immunization', target: 'Children 0-5', schedule: 'Monthly at health posts', status: 'Ongoing' },
                { name: 'COVID-19 Booster (XBB)', target: 'High-risk adults 60+', schedule: 'Every Thursday', status: 'Active' },
                { name: 'Hepatitis B', target: 'Healthcare workers & newborns', schedule: 'On-demand', status: 'Active' },
                { name: 'Japanese Encephalitis', target: 'Children 1-15 yrs in endemic areas', schedule: 'Seasonal (Aug-Sep)', status: 'Seasonal' },
              ].map((v, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === v.name ? null : v.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-warning/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center shrink-0"><Syringe size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{v.name}</h4>
                        <p className="text-xs text-textSecondary">{v.target}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-bold rounded ${v.status === 'Seasonal' ? 'bg-indigo-400/10 text-indigo-400' : 'bg-success/10 text-success'}`}>{v.status}</span>
                  </div>
                  {expandedCard === v.name && (
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-sm text-textSecondary">
                      <Clock size={14} /> Schedule: {v.schedule}
                      <button className="ml-auto text-primary font-medium hover:underline">Register</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Generative Content Feed */}
      <ContentFeed sector="Health" sectorColor="blue" />
    </div>
  );
};
