import React from 'react';
import { CalendarDays, MapPin, Clock } from 'lucide-react';

export const Events: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <CalendarDays className="text-primary" size={32} /> City Events
          </h1>
          <p className="text-textSecondary">Upcoming programs, town halls, and cultural celebrations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EventCard 
          title="Smart City Development Workshop"
          date="Oct 24, 2026"
          time="10:00 AM - 4:00 PM"
          location="Butwal Convention Center"
          type="Technology"
          color="bg-primary/10 text-primary border-primary/20"
        />
        <EventCard 
          title="Annual Cultural Festival"
          date="Nov 02, 2026"
          time="08:00 AM - 8:00 PM"
          location="Milan Chowk Grounds"
          type="Culture"
          color="bg-warning/10 text-warning border-warning/20"
        />
        <EventCard 
          title="Public Health & AI Seminar"
          date="Nov 15, 2026"
          time="11:00 AM - 2:00 PM"
          location="Lumbini Provincial Hospital"
          type="Health"
          color="bg-danger/10 text-danger border-danger/20"
        />
        <EventCard 
          title="Agriculture Grant Distribution"
          date="Nov 20, 2026"
          time="09:00 AM - 3:00 PM"
          location="City Hall, Ward 4"
          type="Agriculture"
          color="bg-success/10 text-success border-success/20"
        />
      </div>
    </div>
  );
};

const EventCard = ({ title, date, time, location, type, color }: any) => (
  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-custom hover:-translate-y-1 transition-all group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${color}`}>
        {type}
      </span>
    </div>
    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{title}</h3>
    
    <div className="space-y-3 text-sm text-textSecondary">
      <div className="flex items-center gap-2">
        <CalendarDays size={16} className="text-primary" /> <span>{date}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-primary" /> <span>{time}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-primary" /> <span>{location}</span>
      </div>
    </div>
  </div>
);
