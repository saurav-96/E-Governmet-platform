import React, { useState } from 'react';
import { Target, Filter, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export const ProgressTracker: React.FC = () => {
  const [filter, setFilter] = useState('All Departments');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Target className="text-primary" size={32} /> Progress Tracker
          </h1>
          <p className="text-textSecondary max-w-2xl leading-relaxed">
            Real-time tracking of all declared policies, rules, and development projects in Butwal Sub-Metropolitan City. 
            Designed to ensure 100% transparency, eliminate corruption, and track public budget utilization.
          </p>
        </div>
      </div>

      {/* Overall Progress Widget */}
      <div className="bg-[#eef2f6] border border-blue-200 rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row gap-8 items-center dark:bg-card dark:border-border dark:text-white">
        <div className="flex-1 w-full">
          <p className="text-sm text-slate-500 font-medium mb-2 dark:text-textSecondary">Overall Implementation Progress</p>
          <div className="flex items-end gap-3 mb-3">
            <h2 className="text-4xl font-bold text-primary">66%</h2>
          </div>
          <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-[#0F172A]">
            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '66%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium dark:text-textSecondary">
            <span>Total Budget: Rs. 15.5 Cr</span>
            <span>Utilized: Rs. 10.2 Cr</span>
          </div>
        </div>
        
        <div className="flex gap-4 self-center lg:self-auto shrink-0 bg-white p-4 rounded-xl border border-slate-100 shadow-sm dark:bg-[#0F172A] dark:border-border">
          <StatBox value="5" label="Total" color="text-slate-800 dark:text-white" />
          <StatBox value="5" label="In Progress" color="text-primary" />
          <StatBox value="0" label="Completed" color="text-success" />
          <StatBox value="0" label="Delayed" color="text-danger" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 text-sm mt-8 mb-6">
        <div className="flex items-center gap-2 text-textSecondary font-medium">
          <Filter size={16} /> Filter:
        </div>
        <select 
          className="bg-card border border-border text-white text-sm rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All Departments</option>
          <option>Health</option>
          <option>Agriculture</option>
          <option>Traffic & Safety</option>
          <option>Environment</option>
        </select>
        <select className="bg-card border border-border text-white text-sm rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary">
          <option>All Status</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <span className="text-textSecondary text-xs">5 policies shown</span>
      </div>

      {/* Policy List */}
      <div className="space-y-4">
        <PolicyCard 
          dept="Health" 
          title="Universal Health Coverage 2025" 
          desc="Ensure every citizen in Butwal sub-metro has access to basic health insurance and free consultation services."
          progress={72} 
          declared="2024-01-15" target="2025-12-31" 
          budget="Rs. 4.0 Cr" utilized="Rs. 2.8 Cr"
        />
        <PolicyCard 
          dept="Agriculture" 
          title="Digital Crop Monitoring System" 
          desc="Deploy IoT sensors and AI-based crop monitoring across 500 farms in Butwal to improve yield prediction."
          progress={45} 
          declared="2024-03-01" target="2025-06-30" 
          budget="Rs. 1.5 Cr" utilized="Rs. 0.6 Cr"
        />
        <PolicyCard 
          dept="Traffic & Safety" 
          title="Smart Traffic Light System" 
          desc="Install AI-powered adaptive traffic lights at 15 major intersections in Butwal city."
          progress={90} 
          declared="2023-11-01" target="2025-03-31" 
          budget="Rs. 8.0 Cr" utilized="Rs. 7.2 Cr"
        />
        <PolicyCard 
          dept="Environment" 
          title="Zero Waste Butwal Initiative" 
          desc="Achieve 80% waste segregation at source and establish bio-gas plants in 3 wards."
          progress={55} 
          declared="2024-02-15" target="2025-09-30" 
          budget="Rs. 2.0 Cr" utilized="Rs. 1.1 Cr"
        />
      </div>
    </div>
  );
};

const StatBox = ({ value, label, color }: any) => (
  <div className="text-center px-4">
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-[10px] text-slate-400 dark:text-textSecondary uppercase tracking-wider font-semibold mt-1">{label}</p>
  </div>
);

const PolicyCard = ({ dept, title, desc, progress, declared, target, budget, utilized }: any) => {
  const getDeptColor = (d: string) => {
    switch(d) {
      case 'Health': return 'text-danger';
      case 'Agriculture': return 'text-success';
      case 'Traffic & Safety': return 'text-warning';
      case 'Environment': return 'text-emerald-500';
      default: return 'text-primary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-custom hover:border-primary/50 transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className={`text-[11px] font-bold uppercase tracking-wider ${getDeptColor(dept)}`}>{dept}</span>
          <h3 className="text-lg font-bold text-white mt-1 mb-2">{title}</h3>
          <p className="text-sm text-textSecondary">{desc}</p>
        </div>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-primary/20 shrink-0">
          <TrendingUp size={12} /> In Progress
        </span>
      </div>
      
      <div className="mt-6 mb-2 flex justify-between items-end text-sm">
        <span className="text-textSecondary font-medium">Completion Tracker</span>
        <span className="font-bold text-white">{progress}%</span>
      </div>
      <div className="h-2.5 w-full bg-[#0F172A] rounded-full overflow-hidden mb-6">
        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50 text-xs text-textSecondary">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5"><Calendar size={14} /> Declared: {declared}</span>
          <span className="flex items-center gap-1.5"><Target size={14} /> Target: {target}</span>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-white bg-white/5 px-2 py-1 rounded">
            <DollarSign size={14} className="text-success" /> Budget: {budget}
          </span>
          <span className="flex items-center gap-1 text-white bg-white/5 px-2 py-1 rounded">
            <TrendingUp size={14} className="text-warning" /> Utilized: {utilized}
          </span>
        </div>
      </div>
    </div>
  );
};
