import React from 'react';
import { Settings2, User, Bell, Shield, PaintBucket, Layers } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Settings2 className="text-primary" size={32} /> Settings
          </h1>
          <p className="text-textSecondary">Manage account preferences, alerts, and personalization.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 space-y-2">
          <SettingsTab active icon={User} label="Account info" />
          <SettingsTab icon={Bell} label="Notifications" />
          <SettingsTab icon={Shield} label="Privacy & Security" />
          <SettingsTab icon={PaintBucket} label="Appearance" />
          <SettingsTab icon={Layers} label="Data Management" />
        </div>
        
        <div className="col-span-1 md:col-span-3 bg-card border border-border rounded-xl p-8 shadow-custom">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-border pb-4">Account Information</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-textSecondary">Full Name</label>
                <input type="text" className="w-full bg-[#0F172A] border border-border rounded-xl px-4 py-3 text-sm text-white" defaultValue="Guest User" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-textSecondary">Email Address</label>
                <input type="email" className="w-full bg-[#0F172A] border border-border rounded-xl px-4 py-3 text-sm text-white" defaultValue="guest@butwal.gov.np" />
              </div>
            </div>
            <div className="space-y-2 flex items-center justify-between border border-border p-4 rounded-xl">
              <div>
                <p className="text-white font-medium text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-textSecondary mt-0.5">Add an extra layer of security to your account.</p>
              </div>
              <button className="bg-primary hover:bg-primary/80 text-white font-medium py-1.5 px-4 rounded-lg text-sm transition">Enable</button>
            </div>
            <div className="pt-4 text-right">
              <button className="bg-success hover:border-success border-border border text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg text-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsTab = ({ icon: Icon, label, active }: any) => (
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium
    ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-textSecondary hover:bg-card hover:text-white'}
  `}>
    <Icon size={18} /> {label}
  </button>
);
