import React from 'react';
import { Building2, Users, HeartPulse, Trees, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const MainDashboard: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex justify-between items-end">
        <motion.div variants={item}>
          <h1 className="text-3xl font-bold text-white mb-2">City Overview Dashboard</h1>
          <p className="text-textSecondary">Real-time metrics for Butwal Sub-Metropolitan City</p>
        </motion.div>
      </div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OverviewCard title="Total Citizens Served" value="152,430" icon={Users} trend="+2.4%" trendUp color="text-primary" bgColor="bg-primary/10" />
        <OverviewCard title="Active City Projects" value="48" icon={Building2} trend="+12" trendUp color="text-indigo-400" bgColor="bg-indigo-400/10" />
        <OverviewCard title="Emergency Response Rate" value="94%" icon={ShieldAlert} trend="+1%" trendUp color="text-success" bgColor="bg-success/10" />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-card border border-border rounded-2xl shadow-custom p-6">
          <h3 className="text-lg font-bold text-white mb-4">Department Status</h3>
          <div className="space-y-4">
            <DeptStatus title="Health Services" stat="Operational" statType="success" icon={HeartPulse} />
            <DeptStatus title="Traffic Control" stat="High Alert" statType="warning" icon={ShieldAlert} />
            <DeptStatus title="Agricultural Extension" stat="Active" statType="success" icon={Trees} />
            <DeptStatus title="IT Infrastructure" stat="Stable" statType="success" icon={Cpu} />
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-2xl shadow-custom p-6 relative overflow-hidden">
          <h3 className="text-lg font-bold text-white mb-4">Recent City Annoucements</h3>
          <ul className="space-y-4 relative z-10">
            <li className="p-3 bg-[#0F172A] rounded-xl border border-border">
              <span className="text-xs text-primary font-bold">2 Hours Ago</span>
              <p className="text-sm text-white mt-1">Smart Traffic Lights system deployed at Finance Chowk.</p>
            </li>
            <li className="p-3 bg-[#0F172A] rounded-xl border border-border">
              <span className="text-xs text-warning font-bold">Yesterday</span>
              <p className="text-sm text-white mt-1">Free Wi-Fi expanded to Ward 11 Parks.</p>
            </li>
            <li className="p-3 bg-[#0F172A] rounded-xl border border-border">
              <span className="text-xs text-success font-bold">Oct 12</span>
              <p className="text-sm text-white mt-1">New Agricultural subsidy distributed to 400 farmers.</p>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const OverviewCard = ({ title, value, icon: Icon, color, bgColor, trend, trendUp }: any) => (
  <div className="bg-card border border-border rounded-2xl p-6 shadow-custom hover:-translate-y-1 transition-transform duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${bgColor} ${color}`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${trendUp ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
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

const DeptStatus = ({ title, stat, statType, icon: Icon }: any) => (
  <div className="flex items-center justify-between p-3 bg-[#0F172A] rounded-xl hover:border-primary/50 border border-border transition-colors">
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-textSecondary" />
      <span className="text-sm font-medium text-white">{title}</span>
    </div>
    <span className={`text-xs font-bold px-2 py-1 rounded-md ${
      statType === 'success' ? 'text-success bg-success/10' : 
      statType === 'warning' ? 'text-warning bg-warning/10' : 'text-danger bg-danger/10'
    }`}>
      {stat}
    </span>
  </div>
);
