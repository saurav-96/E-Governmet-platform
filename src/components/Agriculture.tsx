import React, { useState } from 'react';
import { Sprout, Tractor, Calendar, DollarSign, Users, Network, MapPin, Newspaper, TrendingUp, SunSnow, ChevronRight, Info, Leaf } from 'lucide-react';
import { SectorAIChat } from './SectorAIChat';
import { ContentFeed } from './ContentFeed';

export const Agriculture: React.FC<{ onOpenDetail?: (data: any) => void }> = ({ onOpenDetail }) => {
  const [activeTab, setActiveTab] = useState('plans');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const tabs = [
    { id: 'plans', label: 'Agricultural Plans', icon: Sprout },
    { id: 'fertilizer', label: 'Fertilizer Guide', icon: Tractor },
    { id: 'institutions', label: 'Institutions', icon: MapPin },
    { id: 'seasonal', label: 'Seasonal Crops', icon: SunSnow },
  ];

  return (
    <div className="space-y-6">
      {/* AI Hero */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-success/30 rounded-2xl p-6 shadow-custom overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Network size={120} /></div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-3 h-3 bg-success rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
          <h2 className="text-xl font-bold text-white">Agriculture AI Agent</h2>
          <span className="bg-success/20 text-success text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-success/30">Active</span>
        </div>
        <p className="text-sm text-textSecondary max-w-3xl mb-6">Crop recommendations, soil analysis, weather-aware farming guidance, and market price forecasting.</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
          {[
            { icon: Tractor, t: 'Fertilizer Guide', d: 'Latest stock.', c: 'success', tab: 'fertilizer' },
            { icon: TrendingUp, t: 'Gov Programs', d: 'Subsidies & grants.', c: 'primary', tab: 'plans' },
            { icon: MapPin, t: 'Nearby Support', d: 'Agro-vet centers.', c: 'warning', tab: 'institutions' },
            { icon: SunSnow, t: 'Seasonal Crops', d: 'Weather-aware.', c: 'indigo-400', tab: 'seasonal' },
            { icon: Newspaper, t: 'Farming News', d: 'Success stories.', c: 'rose-400', tab: 'plans' },
          ].map((item, i) => (
            <div key={i} onClick={() => setActiveTab(item.tab)}
              className={`bg-card/50 border backdrop-blur-sm p-4 rounded-xl transition cursor-pointer group ${i === 4 ? 'hidden md:block' : ''} ${activeTab === item.tab ? 'border-success/50' : 'border-border'}`}
            >
              <item.icon className={`text-${item.c} mb-2 group-hover:-translate-y-1 transition-transform`} size={20} />
              <h4 className="text-white text-sm font-bold mb-1">{item.t}</h4>
              <p className="text-xs text-textSecondary">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <SectorAIChat 
        sectorName="Agriculture" 
        sectorColor="green" 
        features={['Crop advisory', 'Market prices', 'Weather alerts', 'Subsidy info']}
      />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Agriculture Department</h1>
          <p className="text-textSecondary">Butwal Sub-Metropolitan City</p>
        </div>
        <a href="tel:071540123" className="bg-success/10 text-success px-4 py-2 rounded-xl text-sm font-medium hover:bg-success/20 border border-success/20 transition">
          Agriculture Office: 071-540123
        </a>
      </div>

      {/* Clickable Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Active Plans', value: '4', icon: Calendar, color: 'text-success', bg: 'bg-success/10', tab: 'plans', desc: 'Ongoing government agricultural support frameworks.' },
          { title: 'Institutions', value: '6', icon: MapPin, color: 'text-primary', bg: 'bg-primary/10', tab: 'institutions', desc: 'Registered centers for seeds, fertilizers, and consultancy.' },
          { title: 'Fertilizer Types', value: '7', icon: Tractor, color: 'text-warning', bg: 'bg-warning/10', tab: 'fertilizer', desc: 'Available fertilizer stocks across municipal depots.' },
          { title: 'Total Beneficiaries', value: '1,450', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10', tab: 'plans', desc: 'Farmers currently enrolled in active city programs.' },
        ].map((card, i) => (
          <div key={i} onClick={() => {
            setActiveTab(card.tab);
            onOpenDetail?.({
              title: card.title,
              description: card.desc,
              sectorColor: 'green'
            });
          }}
            className="bg-card border border-border rounded-2xl p-6 shadow-custom hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-success/50"
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
              className={`pb-2 -mb-[26px] flex items-center gap-2 font-medium transition-all ${activeTab === tab.id ? 'text-success border-b-2 border-success font-semibold' : 'text-textSecondary hover:text-white'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {activeTab === 'plans' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-white">Agricultural Plans & Programs</h3>
                <span className="text-xs text-textSecondary">3 plans</span>
              </div>
              {[
                { title: 'Farmer Field School 2082', office: 'Agriculture Extension Office', budget: 'Rs. 8.0L', beneficiaries: '400', endDate: '2025-10-31', status: 'Upcoming' },
                { title: 'Agro-Processing Center Establishment', office: 'Sub-Metro Industry & Commerce', budget: 'Rs. 150.0L', beneficiaries: '500', endDate: '2026-08-31', status: 'Active' },
                { title: 'Organic Certification Drive 2081-82', office: 'DADO & Sub-Metro Agriculture', budget: 'Rs. 12.0L', beneficiaries: '50', endDate: '2025-06-30', status: 'Active' },
              ].map((plan, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === plan.title ? null : plan.title)}
                  className="bg-[#0F172A] border border-border rounded-2xl p-5 hover:border-success/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center"><Sprout size={20} /></div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{plan.title}</h4>
                        <p className="text-xs text-textSecondary">{plan.office}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${plan.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{plan.status}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mx-0 md:mx-12">
                    <div className="bg-card rounded-xl p-3 text-center border border-border">
                      <DollarSign size={16} className="mx-auto text-success mb-1" />
                      <p className="text-sm font-bold text-white">{plan.budget}</p>
                      <p className="text-[10px] text-textSecondary uppercase tracking-wider">Budget</p>
                    </div>
                    <div className="bg-card rounded-xl p-3 text-center border border-border">
                      <Users size={16} className="mx-auto text-primary mb-1" />
                      <p className="text-sm font-bold text-white">{plan.beneficiaries}</p>
                      <p className="text-[10px] text-textSecondary uppercase tracking-wider">Beneficiaries</p>
                    </div>
                    <div className="bg-card rounded-xl p-3 text-center border border-border">
                      <Calendar size={16} className="mx-auto text-warning mb-1" />
                      <p className="text-sm font-bold text-white">{plan.endDate}</p>
                      <p className="text-[10px] text-textSecondary uppercase tracking-wider">End Date</p>
                    </div>
                  </div>
                  {expandedCard === plan.title && (
                    <div className="mt-4 pt-3 border-t border-border/50 flex gap-3">
                      <button className="bg-success/10 text-success px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-success/20 transition">Apply Now</button>
                      <button className="bg-card text-textSecondary px-3 py-1.5 rounded-lg text-sm font-medium border border-border hover:text-white transition flex items-center gap-1"><Info size={14} /> More Details</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'fertilizer' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Government Fertilizer Depot — Stock Status</h3>
              {[
                { name: 'Urea', stock: '450 bags', price: 'Rs. 35/kg', available: true },
                { name: 'DAP (Di-Ammonium Phosphate)', stock: '200 bags', price: 'Rs. 55/kg', available: true },
                { name: 'Potash (MOP)', stock: '80 bags', price: 'Rs. 30/kg', available: true },
                { name: 'NPK Complex (15:15:15)', stock: '0 bags', price: 'Rs. 48/kg', available: false },
                { name: 'Organic Vermi-Compost', stock: '300 bags', price: 'Rs. 12/kg', available: true },
              ].map((f, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === f.name ? null : f.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-success/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.available ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}><Leaf size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{f.name}</h4>
                        <p className="text-xs text-textSecondary">{f.price}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded font-bold ${f.available ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                      {f.available ? `In Stock — ${f.stock}` : 'Out of Stock'}
                    </span>
                  </div>
                  {expandedCard === f.name && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <button className={`text-sm font-medium hover:underline ${f.available ? 'text-success' : 'text-textSecondary'}`}>
                        {f.available ? 'Reserve at Depot →' : 'Notify When Available'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'institutions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Nearby Agricultural Support Institutions</h3>
              {[
                { name: 'District Agriculture Dev. Office', type: 'Government', services: 'Extension, Training, Subsidies', ward: 'Ward 11' },
                { name: 'Krishi Samagri Company Ltd (KSC)', type: 'Semi-Government', services: 'Fertilizer, Seeds, Equipment', ward: 'Ward 9' },
                { name: 'Lumbini Agro-Vet', type: 'Private', services: 'Pesticides, Seeds, Consultation', ward: 'Ward 7' },
                { name: 'ABC Agro Farm', type: 'Private', services: 'Tissue Culture, Nursery', ward: 'Ward 3' },
              ].map((inst, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === inst.name ? null : inst.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><MapPin size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{inst.name}</h4>
                        <p className="text-xs text-textSecondary">{inst.type} • {inst.ward}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className={`text-textSecondary transition-transform ${expandedCard === inst.name ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedCard === inst.name && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-textSecondary mb-2">Services: {inst.services}</p>
                      <button className="text-primary text-sm font-medium hover:underline">Get Directions →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'seasonal' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">AI-Recommended Seasonal Crops — Butwal Region</h3>
              <p className="text-sm text-textSecondary mb-2">Based on current weather patterns, soil type, and market demand analysis.</p>
              {[
                { crop: 'Paddy (Rice)', season: 'Monsoon (Jun-Oct)', suitability: '95%', tip: 'Ideal conditions. Plant before mid-July for best yield.' },
                { crop: 'Wheat', season: 'Winter (Nov-Mar)', suitability: '88%', tip: 'Best sown after Dashain. Use drought-resistant varieties.' },
                { crop: 'Mustard', season: 'Winter (Oct-Feb)', suitability: '82%', tip: 'Cash crop. Good market demand. Combine with bee-keeping for extra income.' },
                { crop: 'Vegetables (Cauliflower)', season: 'Winter (Sep-Jan)', suitability: '90%', tip: 'High demand in local market. Stagger planting for continuous harvest.' },
              ].map((c, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === c.crop ? null : c.crop)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-indigo-400/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-400/10 text-indigo-400 flex items-center justify-center shrink-0"><Sprout size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{c.crop}</h4>
                        <p className="text-xs text-textSecondary">{c.season}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-success">{c.suitability}</span>
                  </div>
                  {expandedCard === c.crop && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-textSecondary">💡 AI Tip: {c.tip}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Generative Content Feed */}
      <ContentFeed sector="Agriculture" sectorColor="green" />
    </div>
  );
};
