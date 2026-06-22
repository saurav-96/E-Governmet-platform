import React from 'react';
import { Landmark, FileText, Info, Users, Network, FileCheck, Stamp, ChevronRight } from 'lucide-react';
import { SectorAIChat } from './SectorAIChat';
import { ContentFeed } from './ContentFeed';

export const GovernmentServices: React.FC<{ onOpenDetail?: (data: any) => void }> = ({ onOpenDetail }) => {
  return (
    <div className="space-y-6">
       {/* AI Hero Section */}
       <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-primary/30 rounded-2xl p-6 shadow-custom overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Network size={120} />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Gov Services AI Agent
          </h2>
          <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-primary/30">Active</span>
        </div>
        <p className="text-sm text-textSecondary max-w-3xl mb-6">Expert system providing autonomous citizen assistance, policy abstraction, public service navigation, and dynamic document generation guidance.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <div className="bg-card/50 border border-border backdrop-blur-sm p-4 rounded-xl hover:border-primary/50 transition cursor-pointer group">
             <Info className="text-primary mb-2 group-hover:-translate-y-1 transition-transform" size={20} />
             <h4 className="text-white text-sm font-bold mb-1">Public Notices</h4>
             <p className="text-xs text-textSecondary">Real-time parsed gazette data.</p>
          </div>
          <div className="bg-card/50 border border-border backdrop-blur-sm p-4 rounded-xl hover:border-success/50 transition cursor-pointer group">
             <Landmark className="text-success mb-2 group-hover:-translate-y-1 transition-transform" size={20} />
             <h4 className="text-white text-sm font-bold mb-1">Government Programs</h4>
             <p className="text-xs text-textSecondary">AI-matched eligibility schemes.</p>
          </div>
          <div className="bg-card/50 border border-border backdrop-blur-sm p-4 rounded-xl hover:border-warning/50 transition cursor-pointer group">
             <Users className="text-warning mb-2 group-hover:-translate-y-1 transition-transform" size={20} />
             <h4 className="text-white text-sm font-bold mb-1">Citizen Services</h4>
             <p className="text-xs text-textSecondary">Automated KYC and verification.</p>
          </div>
          <div className="bg-card/50 border border-border backdrop-blur-sm p-4 rounded-xl hover:border-indigo-400/50 transition cursor-pointer group">
             <FileText className="text-indigo-400 mb-2 group-hover:-translate-y-1 transition-transform" size={20} />
             <h4 className="text-white text-sm font-bold mb-1">Announcements</h4>
             <p className="text-xs text-textSecondary">Urgent localized broadcasts.</p>
          </div>
        </div>
      </div>

      <SectorAIChat 
        sectorName="Government Services" 
        sectorColor="primary" 
        features={['Apply for certificates', 'Policy explanation', 'Grievance support', 'Scheme matching']}
      />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Landmark className="text-primary" size={32} /> E-Governance Services
          </h1>
          <p className="text-textSecondary">Instant access to vital civil registrations, documentation, and certifications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => onOpenDetail?.({ title: 'Vital Registrations', description: 'Official portal for Birth, Marriage, Migration, and Death certificates. Integrated with digital identity verification.', sectorColor: 'primary' })}
          className="bg-card border border-border rounded-xl p-6 flex gap-4 hover:border-primary/50 transition-all cursor-pointer group"
        >
          <div className="bg-primary/10 rounded-lg p-3 h-fit text-primary shrink-0 group-hover:scale-110 transition-transform"><FileCheck size={24}/></div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-bold text-white">Vital Registrations</h3>
              <ChevronRight className="text-textSecondary" size={18} />
            </div>
            <p className="text-sm text-textSecondary mb-3">Apply for Birth, Marriage, Migration, and Death certificates directly through the smart portal via digital verification.</p>
            <button className="text-sm font-medium text-primary hover:underline">Start Application →</button>
          </div>
        </div>
        <div onClick={() => onOpenDetail?.({ title: 'Property Permits', description: 'Building permits, map approvals, and structural engineering compliance tracking.', sectorColor: 'green' })}
          className="bg-card border border-border rounded-xl p-6 flex gap-4 hover:border-success/50 transition-all cursor-pointer group"
        >
          <div className="bg-success/10 rounded-lg p-3 h-fit text-success shrink-0 group-hover:scale-110 transition-transform"><Stamp size={24}/></div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-bold text-white">Property Permits</h3>
              <ChevronRight className="text-textSecondary" size={18} />
            </div>
            <p className="text-sm text-textSecondary mb-3">Submit architectural maps, apply for building construction permits, and track engineering approval statuses.</p>
            <button className="text-sm font-medium text-success hover:underline">Apply for Permit →</button>
          </div>
        </div>
      </div>

      <ContentFeed sector="Government Services" sectorColor="primary" />
    </div>
  );
};
