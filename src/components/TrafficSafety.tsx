import React, { useState } from 'react';
import { 
  AlertTriangle, CheckCircle2, MapPin, Clock, 
  BrainCircuit, Shield, Activity, Car, FileWarning,
  TrendingUp, TrendingDown, Loader2, Network
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { SectorAIChat } from './SectorAIChat';
import { ContentFeed } from './ContentFeed';

const dataWeekly = [
  { name: 'Mon', incidents: 120 },
  { name: 'Tue', incidents: 132 },
  { name: 'Wed', incidents: 101 },
  { name: 'Thu', incidents: 142 },
  { name: 'Fri', incidents: 190 },
  { name: 'Sat', incidents: 230 },
  { name: 'Sun', incidents: 210 },
];

const dataPie = [
  { name: 'Speeding', value: 400 },
  { name: 'Drunk Driving', value: 300 },
  { name: 'Helmet Violations', value: 300 },
  { name: 'Parking Violations', value: 200 },
];

const COLORS = ['#3B82F6', '#22C55E', '#14B8A6', '#F59E0B', '#EF4444'];

export const TrafficSafety: React.FC<{ onOpenDetail?: (data: any) => void }> = ({ onOpenDetail }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportSuccess(true);
      setTimeout(() => setReportSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* AI Hero */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-blue-500/30 rounded-2xl p-6 shadow-custom overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Network size={120} /></div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
          <h2 className="text-xl font-bold text-white">Traffic AI Agent</h2>
          <span className="bg-blue-500/20 text-blue-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-blue-500/30">Active</span>
        </div>
        <p className="text-sm text-textSecondary max-w-3xl mb-6">Autonomous road safety monitoring, incident prediction, automated violation detection, and traffic flow optimization.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { icon: Car, t: 'Flow Analysis', d: 'Real-time density.', c: 'primary' },
            { icon: Activity, t: 'Incident Prediction', d: 'High-risk maps.', c: 'danger' },
            { icon: Shield, t: 'Safety Audit', d: 'Infrastructure check.', c: 'success' },
            { icon: FileWarning, t: 'Violation Log', d: 'Automated detection.', c: 'warning' },
          ].map((item, i) => (
            <div key={i} className="bg-card/50 border border-border backdrop-blur-sm p-4 rounded-xl transition cursor-pointer group hover:border-blue-400/30">
              <item.icon className={`text-${item.c} mb-2 group-hover:-translate-y-1 transition-transform`} size={20} />
              <h4 className="text-white text-sm font-bold mb-1">{item.t}</h4>
              <p className="text-xs text-textSecondary">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <SectorAIChat 
        sectorName="Traffic Safety" 
        sectorColor="blue" 
        features={['Incident prediction', 'Surveillance feed', 'Traffic optimization', 'Violation alerts']}
      />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Traffic Safety Department</h1>
          <p className="text-textSecondary">AI-powered monitoring and analytics for road safety management.</p>
        </div>
        <div className="flex gap-2 relative">
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating || reportSuccess}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border flex items-center justify-center min-w-[140px]
              ${reportSuccess 
                ? 'bg-success text-white border-success' 
                : 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20'
              }`}
          >
            {isGenerating ? (
              <><Loader2 size={16} className="animate-spin mr-2" /> Generating...</>
            ) : reportSuccess ? (
              <><CheckCircle2 size={16} className="mr-2" /> Downloaded!</>
            ) : (
              'Generate Report'
            )}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Incidents" value="1,284" icon={AlertTriangle} color="text-warning" bgColor="bg-warning/10" trend="+12%" trendUp onOpenDetail={onOpenDetail} description="Total road incidents recorded by municipal surveillance." />
        <StatCard title="Resolved Cases" value="956" icon={CheckCircle2} color="text-success" bgColor="bg-success/10" trend="+5%" trendUp onOpenDetail={onOpenDetail} description="Cases successfully closed after investigation and settlement." />
        <StatCard title="Active Monitoring Zones" value="45" icon={MapPin} color="text-primary" bgColor="bg-primary/10" onOpenDetail={onOpenDetail} description="IoT-enabled zones with active real-time AI monitoring." />
        <StatCard title="Avg. Response Time" value="4.2 min" icon={Clock} color="text-indigo-400" bgColor="bg-indigo-400/10" trend="-1.2m" trendUp={false} onOpenDetail={onOpenDetail} description="Average time taken for traffic units to reach incident sites." />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Line Chart */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-custom hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Activity size={18} className="text-primary" /> Weekly Incidents
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataWeekly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="incidents" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-custom hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <FileWarning size={18} className="text-warning" /> Violation Types
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataPie}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dataPie.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Traffic Incidents Table */}
          <div className="bg-card border border-border rounded-2xl shadow-custom overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Car size={18} className="text-primary" /> Recent Traffic Incidents
              </h3>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#0F172A]/50 text-textSecondary border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Incident ID</th>
                    <th className="px-6 py-4 font-medium">Location</th>
                    <th className="px-6 py-4 font-medium">Severity</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { id: 'TRF-892', loc: 'Highway 04, North', sev: 'High', status: 'Pending', date: '10 min ago' },
                    { id: 'TRF-891', loc: 'Downtown Intersection', sev: 'Medium', status: 'Active', date: '25 min ago' },
                    { id: 'TRF-890', loc: 'Milanchowk Road', sev: 'Low', status: 'Resolved', date: '1 hr ago' },
                    { id: 'TRF-889', loc: 'Hospital Ring Road', sev: 'Critical', status: 'Pending', date: '2 hrs ago' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{row.id}</td>
                      <td className="px-6 py-4 text-textSecondary">{row.loc}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.sev === 'Critical' ? 'bg-danger/10 text-danger' : 
                          row.sev === 'High' ? 'bg-warning/10 text-warning' : 
                          row.sev === 'Medium' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
                        }`}>
                          {row.sev}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === 'Resolved' ? 'bg-success/10 text-success border border-success/20' : 
                          row.status === 'Active' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-warning/10 text-warning border border-warning/20'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-textSecondary">{row.date}</td>
                      <td className="px-6 py-4">
                        <button className="text-primary hover:text-white transition-colors">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar Columns (AI & Alerts) */}
        <div className="space-y-6">
          {/* AI Recommendations */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-custom relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <BrainCircuit size={100} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <BrainCircuit size={20} className="text-primary" /> AI Recommendations
            </h3>
            <div className="space-y-4">
              <RecommendationCard 
                title="Increase surveillance near intersections."
                priority="High"
                confidence="94%"
              />
              <RecommendationCard 
                title="Deploy additional patrol units at Milanchowk."
                priority="Medium"
                confidence="88%"
              />
              <RecommendationCard 
                title="Optimize traffic signal timing on Hwy 04."
                priority="Low"
                confidence="76%"
              />
            </div>
          </div>

          {/* Recent Alerts Timeline */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-custom">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Shield size={18} className="text-danger" /> Recent Alerts
            </h3>
            <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              <TimelineItem title="Accident detected" time="10:42 AM" color="bg-danger" />
              <TimelineItem title="Speed limit exceeded" time="09:15 AM" color="bg-warning" />
              <TimelineItem title="Road blockage reported" time="08:30 AM" color="bg-primary" />
              <TimelineItem title="Signal malfunction" time="07:05 AM" color="bg-warning" />
            </div>
          </div>
        </div>
      </div>

      <ContentFeed sector="Traffic Safety" sectorColor="blue" />
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, icon: Icon, color, bgColor, trend, trendUp, onOpenDetail, description }: any) => (
  <div onClick={() => onOpenDetail?.({ title, description, sectorColor: 'blue' })}
    className="bg-card border border-border rounded-2xl p-6 shadow-custom hover:-translate-y-1 transition-transform duration-300 cursor-pointer group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${bgColor} ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'text-danger bg-danger/10' : 'text-success bg-success/10'}`}>
          {trendUp ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
          {trend}
        </span>
      )}
    </div>
    <div>
      <h4 className="text-sm text-textSecondary font-medium mb-1">{title}</h4>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const RecommendationCard = ({ title, priority, confidence }: any) => (
  <div className="bg-[#0F172A]/50 border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-colors">
    <p className="text-sm text-white mb-3 font-medium leading-relaxed">{title}</p>
    <div className="flex items-center justify-between text-xs">
      <span className={`px-2 py-1 rounded-md font-medium ${
        priority === 'High' ? 'bg-danger/20 text-danger' : 
        priority === 'Medium' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
      }`}>
        {priority} Priority
      </span>
      <span className="text-textSecondary flex items-center gap-1">
        <BrainCircuit size={12} /> {confidence} Match
      </span>
    </div>
  </div>
);

const TimelineItem = ({ title, time, color }: any) => (
  <div className="relative">
    <div className={`absolute -left-6 w-3 h-3 rounded-full ${color} ring-4 ring-[#1E293B] z-10`}></div>
    <div className="bg-[#0F172A]/50 p-3 rounded-xl border border-border/50">
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="text-xs text-textSecondary mt-1">{time}</p>
    </div>
  </div>
);
