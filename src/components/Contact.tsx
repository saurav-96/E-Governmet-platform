import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <MessageSquare className="text-primary" size={32} /> Contact Us
          </h1>
          <p className="text-textSecondary">Reach out to the municipal corporation for inquiries, suggestions, or grievances.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2 items-start">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-2">
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Call Us</h3>
            <p className="text-sm text-textSecondary">Mon-Sun: 24/7 Helpline</p>
            <p className="font-medium text-white mt-1 text-lg">071-532805</p>
            <p className="font-medium text-white text-lg">9857045414</p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2 items-start">
            <div className="w-12 h-12 bg-danger/10 text-danger rounded-xl flex items-center justify-center mb-2">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Email Us</h3>
            <p className="text-sm text-textSecondary">Drop us a line anytime</p>
            <p className="font-medium text-white mt-1 text-lg">info@hubit.com.np</p>
            <p className="font-medium text-white text-lg">support@butwal.gov.np</p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2 items-start">
            <div className="w-12 h-12 bg-success/10 text-success rounded-xl flex items-center justify-center mb-2">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Visit Us</h3>
            <p className="text-sm text-textSecondary">Headquarters</p>
            <p className="font-medium text-white mt-1 text-lg">Finance Chowk, Butwal</p>
            <p className="font-medium text-white text-lg">Rupandehi, Nepal</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-8 shadow-custom">
          <h2 className="text-2xl font-bold text-white mb-6">Send a Message or Grievance</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-textSecondary">Full Name</label>
                <input type="text" className="w-full bg-[#0F172A] border border-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-textSecondary">Email / Phone</label>
                <input type="text" className="w-full bg-[#0F172A] border border-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors" placeholder="Your Contact" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-textSecondary">Department</label>
              <select className="w-full bg-[#0F172A] border border-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors">
                <option>General Support</option>
                <option>Traffic & Safety</option>
                <option>Health & Sanitation</option>
                <option>Infrastructure & Roads</option>
                <option>Corruption / Transparency Report</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-textSecondary">Message Details</label>
              <textarea rows={5} className="w-full bg-[#0F172A] border border-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Provide evidence or complete details of your query..."></textarea>
            </div>

            <button type="submit" className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2">
              <Send size={18} /> Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
