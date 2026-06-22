import React, { useState } from 'react';
import { Compass, MapPin, Calendar, Camera, Network, Map, Star, Plane, AlertTriangle, Coffee, Building2, Sun, ChevronRight, Utensils } from 'lucide-react';
import { SectorAIChat } from './SectorAIChat';
import { ContentFeed } from './ContentFeed';

export const Tourism: React.FC<{ onOpenDetail?: (data: any) => void }> = ({ onOpenDetail }) => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const tabs = [
    { id: 'destinations', label: 'Popular Destinations', icon: MapPin },
    { id: 'heritage', label: 'Heritage Sites', icon: Building2 },
    { id: 'food', label: 'Restaurants & Cafes', icon: Coffee },
    { id: 'events', label: 'Festivals & Events', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      {/* AI Hero */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-primary/30 rounded-2xl p-6 shadow-custom overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Network size={120} /></div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
          <h2 className="text-xl font-bold text-white">Tourism AI Agent</h2>
          <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-primary/30">Active</span>
        </div>
        <p className="text-sm text-textSecondary max-w-3xl mb-6">Personalized itineraries, local attraction recommendations, transport guidance, and cultural information.</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
          {[
            { icon: Map, t: 'Trending Locales', d: 'Most visited.', c: 'primary', tab: 'destinations' },
            { icon: Calendar, t: 'Festivals', d: 'Upcoming events.', c: 'warning', tab: 'events' },
            { icon: Star, t: 'Campaigns', d: 'Tourist offers.', c: 'success', tab: 'destinations' },
            { icon: AlertTriangle, t: 'Advisories', d: 'Travel alerts.', c: 'danger', tab: 'destinations' },
            { icon: Plane, t: 'Featured Transit', d: 'Routes to Butwal.', c: 'indigo-400', tab: 'destinations' },
          ].map((item, i) => (
            <div key={i} onClick={() => setActiveTab(item.tab)}
              className={`bg-card/50 border backdrop-blur-sm p-4 rounded-xl transition cursor-pointer group ${i === 4 ? 'hidden md:block' : ''} ${activeTab === item.tab ? 'border-primary/50' : 'border-border'}`}
            >
              <item.icon className={`text-${item.c} mb-2 group-hover:-translate-y-1 transition-transform`} size={20} />
              <h4 className="text-white text-sm font-bold mb-1">{item.t}</h4>
              <p className="text-xs text-textSecondary">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <SectorAIChat 
        sectorName="Tourism" 
        sectorColor="indigo" 
        features={['Custom itineraries', 'Attraction info', 'Transport guides', 'Cultural facts']}
      />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Compass className="text-primary" size={32} /> Tourism Department
          </h1>
          <p className="text-textSecondary">Explore the rich culture and heritage of Butwal.</p>
        </div>
      </div>

      {/* Clickable Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Heritage Sites', value: '12', icon: Building2, color: 'text-warning', bg: 'bg-warning/10', tab: 'heritage', desc: 'Protected historical and cultural locations within the city.' },
          { title: 'Active Tourists', value: '1,240', icon: Camera, color: 'text-primary', bg: 'bg-primary/10', tab: 'destinations', desc: 'Estimated number of tourists currently visiting Butwal attractions.' },
          { title: 'Parks & Trails', value: '8', icon: Map, color: 'text-success', bg: 'bg-success/10', tab: 'destinations', desc: 'Registered nature parks, recreational spots, and hiking trails.' },
          { title: 'Restaurants', value: '45+', icon: Coffee, color: 'text-indigo-400', bg: 'bg-indigo-400/10', tab: 'food', desc: 'Featured dining and cafe establishments in the municipal area.' },
        ].map((card, i) => (
          <div key={i} onClick={() => {
            setActiveTab(card.tab);
            onOpenDetail?.({
              title: card.title,
              description: card.desc,
              sectorColor: 'indigo'
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

      {/* Tabbed Area */}
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
          {activeTab === 'destinations' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Manimukunda Park (Phulbari)', desc: 'Historical park showcasing the winter palace of the Sen dynasty.', tags: ['Historical', 'Park', 'Family'] },
                { title: 'Siddhababa Temple', desc: 'A highly revered shrine attracting thousands of pilgrims annually.', tags: ['Religious', 'Pilgrimage'] },
                { title: 'Hill Park', desc: 'A beautiful viewpoint offering panoramic views of Butwal city.', tags: ['Nature', 'Viewpoint', 'Trekking'] },
              ].map((dest, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === dest.title ? null : dest.title)}
                  className="bg-[#0F172A] border border-border rounded-xl hover:border-primary/50 transition-colors p-5 flex flex-col cursor-pointer"
                >
                  <div className="h-32 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary relative overflow-hidden">
                    <Sun size={48} className="opacity-20 absolute" />
                    <MapPin size={24} />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">{dest.title}</h4>
                  <p className="text-sm text-textSecondary flex-grow mb-4">{dest.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {dest.tags.map((tag, j) => (
                      <span key={j} className="bg-border text-textSecondary px-2 py-1 rounded text-xs font-medium">#{tag}</span>
                    ))}
                  </div>
                  {expandedCard === dest.title && (
                    <div className="mt-2 pt-3 border-t border-border/50 flex gap-3">
                      <button className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/20 transition">Plan Visit</button>
                      <button className="bg-card text-textSecondary px-3 py-1.5 rounded-lg text-sm font-medium border border-border hover:text-white transition">Get Directions</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'heritage' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Heritage & Cultural Sites</h3>
              {[
                { name: 'Ranighat Palace', era: '19th Century', type: 'Rana Palace', distance: '15 km' },
                { name: 'Mani Mukunda Sen Park', era: 'Medieval', type: 'Royal Garden', distance: '2 km' },
                { name: 'Butwal Durbar', era: 'Shah Period', type: 'Fort Ruins', distance: '1 km' },
                { name: 'Jitgadhi Fort', era: 'Anglo-Nepal War', type: 'Military Heritage', distance: '3 km' },
              ].map((h, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === h.name ? null : h.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-warning/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center shrink-0"><Building2 size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{h.name}</h4>
                        <p className="text-xs text-textSecondary">{h.era} • {h.type}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className={`text-textSecondary transition-transform ${expandedCard === h.name ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedCard === h.name && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
                      <span className="text-xs text-textSecondary flex items-center gap-1"><MapPin size={12} /> {h.distance} from city center</span>
                      <button className="text-primary text-sm font-medium hover:underline">View Details →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'food' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Restaurants & Cafes</h3>
              {[
                { name: 'Nanglo Restaurant', cuisine: 'Nepali, Continental', rating: '4.5', price: '$$' },
                { name: 'Green Leaf Cafe', cuisine: 'Vegetarian, Organic', rating: '4.2', price: '$' },
                { name: 'The Burger House', cuisine: 'Fast Food, Burgers', rating: '4.0', price: '$' },
                { name: 'Hotel Siddhartha', cuisine: 'Multi-cuisine', rating: '4.6', price: '$$$' },
              ].map((r, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === r.name ? null : r.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-400/10 text-indigo-400 flex items-center justify-center shrink-0"><Utensils size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{r.name}</h4>
                        <p className="text-xs text-textSecondary">{r.cuisine}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-warning text-sm font-bold flex items-center gap-1"><Star size={14} /> {r.rating}</span>
                      <span className="text-xs text-textSecondary">{r.price}</span>
                    </div>
                  </div>
                  {expandedCard === r.name && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex gap-3">
                      <button className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/20 transition">View Menu</button>
                      <button className="bg-card text-textSecondary px-3 py-1.5 rounded-lg text-sm font-medium border border-border hover:text-white transition">Get Directions</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Upcoming Festivals & Events</h3>
              {[
                { name: 'Dashain Festival', date: 'Oct 3 - Oct 14, 2026', type: 'National Festival', status: 'Upcoming' },
                { name: 'Tihar (Festival of Lights)', date: 'Oct 21 - Oct 25, 2026', type: 'National Festival', status: 'Upcoming' },
                { name: 'Butwal City Marathon', date: 'Nov 15, 2026', type: 'Sports Event', status: 'Registration Open' },
                { name: 'Lumbini Cultural Fair', date: 'Dec 1-5, 2026', type: 'Cultural', status: 'Upcoming' },
              ].map((e, i) => (
                <div key={i} onClick={() => setExpandedCard(expandedCard === e.name ? null : e.name)}
                  className="bg-[#0F172A] border border-border rounded-xl p-5 hover:border-warning/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center shrink-0"><Calendar size={20} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{e.name}</h4>
                        <p className="text-xs text-textSecondary">{e.date} • {e.type}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${e.status === 'Registration Open' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>{e.status}</span>
                  </div>
                  {expandedCard === e.name && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <button className="text-primary text-sm font-medium hover:underline">{e.status === 'Registration Open' ? 'Register Now →' : 'Set Reminder →'}</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ContentFeed sector="Tourism" sectorColor="indigo" />
    </div>
  );
};
