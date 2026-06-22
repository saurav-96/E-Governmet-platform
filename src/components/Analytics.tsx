import React from 'react';
import { LineChart as LineChartIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const dataVisitor = [
  { name: 'Mon', visitors: 4000 },
  { name: 'Tue', visitors: 3000 },
  { name: 'Wed', visitors: 2000 },
  { name: 'Thu', visitors: 2780 },
  { name: 'Fri', visitors: 1890 },
  { name: 'Sat', visitors: 2390 },
  { name: 'Sun', visitors: 3490 },
];

const dataBudget = [
  { name: 'Jan', allocated: 4000, utilized: 2400 },
  { name: 'Feb', allocated: 3000, utilized: 1398 },
  { name: 'Mar', allocated: 2000, utilized: 9800 },
  { name: 'Apr', allocated: 2780, utilized: 3908 },
  { name: 'May', allocated: 1890, utilized: 4800 },
  { name: 'Jun', allocated: 2390, utilized: 3800 },
];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <LineChartIcon className="text-primary" size={32} /> Central Analytics
          </h1>
          <p className="text-textSecondary">Comprehensive metrics and deep insights into municipality performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Portal Visitors" value="2.4M" change="+12%" up />
        <div className="bg-card border border-border rounded-xl p-6 shadow-custom">
           <p className="text-sm text-textSecondary font-medium mb-1">Grievance Resolutions</p>
           <h3 className="text-3xl font-bold text-white mb-2">94.2%</h3>
           <p className="text-xs text-success flex items-center"><ArrowUpRight size={14}/> +4.1% vs last month</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-custom">
           <p className="text-sm text-textSecondary font-medium mb-1">Avg Service Time</p>
           <h3 className="text-3xl font-bold text-white mb-2">4.2 Hrs</h3>
           <p className="text-xs text-success flex items-center"><ArrowDownRight size={14}/> -2.0% vs last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Visitor Traffic */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-custom">
          <h3 className="text-lg font-bold text-white mb-6">Portal Traffic (Weekly)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataVisitor}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Allocation vs Utilized */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-custom">
          <h3 className="text-lg font-bold text-white mb-6">Budget Trajectory (100k Rs)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataBudget}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="allocated" fill="#1E293B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="utilized" fill="#22C55E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, up }: any) => (
  <div className="bg-card border border-border rounded-xl p-6 shadow-custom">
     <p className="text-sm text-textSecondary font-medium mb-1">{title}</p>
     <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
     <p className={`text-xs flex items-center ${up ? 'text-success' : 'text-danger'}`}>
      {up ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {change} vs last month
     </p>
  </div>
);
