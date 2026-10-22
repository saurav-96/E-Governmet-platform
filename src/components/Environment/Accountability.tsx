import React, { useState } from 'react';
import { ShieldCheck, Scale, MessageSquare, AlertCircle, CheckCircle2, History, ArrowRight, Gavel, FileText, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const Accountability: React.FC = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'user', text: 'What is the fine for burning plastic in Butwal?' },
    { role: 'ai', text: 'According to the Butwal Municipal Environment Protection Act (2077), Section 14, burning plastic in public or private spaces carries a fine of Rs. 1,000 for the first offense and up to Rs. 5,000 for repeat offenses.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMsg = { role: 'user', text: chatMessage };
    setChatHistory([...chatHistory, newMsg]);
    setChatMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [...prev, { 
        role: 'ai', 
        text: 'Localized fine structures for: ' + chatMessage + '. Based on Butwal Enviro-Law, fines range from Rs. 500 to Rs. 25,000 depending on the scale of impact. Please report violations to 071-532815.' 
      }]);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Transparent Enforcement Dashboard */}
      <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-custom">
        <div className="p-6 border-b border-border bg-primary/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Digital Accountability Ledger</h3>
              <p className="text-xs text-textSecondary">Real-time public tracker for environmental enforcement & fines.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-success/10 text-success text-[10px] font-bold px-3 py-1 rounded-full border border-success/20 flex items-center gap-1">
              <CheckCircle2 size={12} /> 94% Transparency
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Illegal Dumping Reports', val: '432', sub: 'Last 30 Days', color: 'text-primary' },
              { label: 'Resolved Actions', val: '398', sub: '92% Resolution Rate', color: 'text-success' },
              { label: 'Fines Collected (LKR)', val: '185,400', sub: 'Re-invested in Green Projects', color: 'text-amber-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-[#0F172A] border border-border p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  {i === 0 ? <MessageSquare size={60} /> : i === 1 ? <CheckCircle2 size={60} /> : <Gavel size={60} />}
                </div>
                <p className="text-xs text-textSecondary font-medium mb-1">{stat.label}</p>
                <h4 className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.val}</h4>
                <p className="text-[10px] text-textSecondary">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <History size={16} className="text-primary" />
              Recent Enforcement Actions
            </h4>
            <div className="bg-[#0F172A] border border-border rounded-xl overflow-hidden divide-y divide-border">
              {[
                { case: 'Industrial Effluent Discharge', loc: 'Tinau Corridor', penalty: 'Rs. 25,000 Fine', status: 'Pending Payment', date: '2h ago' },
                { case: 'Illegal River Mining (Sand)', loc: 'Ward 11 - Near Bridge', penalty: 'Equipment Seized', status: 'Resolved', date: '5h ago' },
                { case: 'Public Smoking violation', loc: 'Traffic Chowk', penalty: 'Rs. 500 Fine', status: 'Resolved', date: 'Yesterday' }
              ].map((action, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <h5 className="text-sm font-bold text-white">{action.case}</h5>
                    <p className="text-[10px] text-textSecondary">{action.loc} • {action.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-amber-500">{action.penalty}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      action.status === 'Resolved' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {action.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-[10px] text-primary font-bold uppercase tracking-widest py-2 hover:underline">
              View Full Public Ledger →
            </button>
          </div>
        </div>
      </section>

      {/* Localized Enviro-Law NLP Chatbot */}
      <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-custom">
        <div className="p-6 border-b border-border bg-indigo-500/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
              <Scale size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Butwal Enviro-Law Chatbot</h3>
              <p className="text-xs text-textSecondary">Ask about environmental laws, fines, and regulations in English or Nepali.</p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col h-[400px] border border-border rounded-2xl bg-[#0F172A] overflow-hidden">
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-card border border-border text-textSecondary rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card flex gap-2">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about fine structures..."
                className="flex-grow bg-[#0F172A] border border-border rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white mb-4">Quick Legal References</h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: 'Illegal Sand Mining', fine: 'Rs. 5,000 - 25,000', icon: FileText },
                { title: 'Industrial Effluent', fine: 'Up to Rs. 50,000', icon: AlertCircle },
                { title: 'Plastic Burning', fine: 'Rs. 1,000 - 5,000', icon: Scale },
                { title: 'River Trash Dumping', fine: 'Rs. 2,000 + Cleanup', icon: Gavel }
              ].map((item, i) => (
                <div key={i} className="bg-[#0F172A] border border-border p-4 rounded-xl flex items-center justify-between hover:border-indigo-500/30 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-indigo-400" />
                    <h5 className="text-xs font-bold text-white">{item.title}</h5>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">{item.fine} →</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mt-4">
              <p className="text-[10px] text-indigo-300 leading-relaxed">
                <Search size={12} className="inline mr-1" />
                "Legal citations are based on the latest Butwal Municipal Council gazette. For official legal proceedings, consult the Municipal Law Department."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
