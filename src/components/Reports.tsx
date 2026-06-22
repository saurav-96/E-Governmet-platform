import React from 'react';
import { FileText, Download, FilePlus2, Search } from 'lucide-react';

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-wrap gap-4 items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FileText className="text-primary" size={32} /> Municipal Reports
          </h1>
          <p className="text-textSecondary">Access, view, and download officially published city documents.</p>
        </div>
        <div className="flex gap-3 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" size={16} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="bg-card border border-border rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:border-primary w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-custom">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F172A]/50 text-textSecondary text-xs uppercase tracking-wider border-b border-border">
                <th className="p-4 font-medium">Document Name</th>
                <th className="p-4 font-medium">Department</th>
                <th className="p-4 font-medium">Date Published</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <ReportRow name="Annual Budget 2081/82" dept="Finance" date="Oct 10, 2026" />
              <ReportRow name="Q3 Infrastructure Progress" dept="Development" date="Sep 28, 2026" />
              <ReportRow name="Traffic Automation Specs" dept="Traffic Safety" date="Sep 15, 2026" />
              <ReportRow name="Smart Health Procurement" dept="Health" date="Aug 30, 2026" />
              <ReportRow name="Environment Impact Study" dept="Environment" date="Aug 12, 2026" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ReportRow = ({ name, dept, date }: any) => (
  <tr className="border-b border-border/50 hover:bg-white/[0.02] transition-colors text-white">
    <td className="p-4 flex items-center gap-3">
      <FilePlus2 className="text-primary/70" size={18} />
      <span className="font-medium">{name}</span>
    </td>
    <td className="p-4"><span className="bg-[#0F172A] border border-border px-2.5 py-1 text-xs rounded-lg text-textSecondary">{dept}</span></td>
    <td className="p-4 text-textSecondary">{date}</td>
    <td className="p-4 text-right">
      <button className="text-primary hover:text-white bg-primary/10 hover:bg-primary/20 p-2 rounded-lg transition">
        <Download size={16} />
      </button>
    </td>
  </tr>
);
