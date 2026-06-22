import React from 'react';
import { Building2, Facebook, Twitter, Youtube, MapPin, Phone, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111827] border-t border-border mt-auto w-full z-10 relative">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand/Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Building2 className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">Butwal SmartGov</h2>
                <p className="text-xs text-textSecondary">Sub-Metro Portal</p>
              </div>
            </div>
            <p className="text-sm text-textSecondary mt-4 leading-relaxed">
              Official AI-powered digital governance portal of Butwal Sub-Metropolitan City, serving 150,000+ citizens.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-textSecondary hover:text-white hover:bg-primary transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-textSecondary hover:text-white hover:bg-primary transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-textSecondary hover:text-white hover:bg-primary transition-all">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h3 className="font-semibold text-white mb-4">Departments</h3>
            <ul className="space-y-3 text-sm text-textSecondary">
              <li><a href="#" className="hover:text-primary transition-colors">Health</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Agriculture</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Traffic & Safety</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Environment</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Education</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">IT & Innovation</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-textSecondary">
              <li><a href="#" className="hover:text-primary transition-colors">Progress Tracker</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Upcoming Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Login / Register</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Assistant</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-4 text-sm text-textSecondary">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span>Finance Chowk, Butwal, Rupandehi</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>071-532805 / 9857045414</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>info@hubit.com.np</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={18} className="text-primary shrink-0" />
                <a href="#" className="hover:text-primary transition-colors">www.hubit.com.np</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-textSecondary">
          <p>© 2082 Butwal Sub-Metropolitan City. All rights reserved.</p>
          <p>Powered by <span className="text-primary font-medium">HUB IT GROUP Pvt. Ltd.</span></p>
        </div>
      </div>
    </footer>
  );
};
