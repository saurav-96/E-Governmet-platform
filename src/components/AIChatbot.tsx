import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Network, Database, Sparkles, ChevronDown, Mic, Paperclip, Zap } from 'lucide-react';

interface AIChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
  externalControl?: boolean;
  initialMessage?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ 
  isOpen: externalOpen, 
  onToggle, 
  externalControl = false,
  initialMessage
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = externalControl ? (externalOpen ?? false) : internalOpen;
  const toggleOpen = () => {
    if (externalControl && onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  const [isTyping, setIsTyping] = useState(false);
  const [aiMode, setAiMode] = useState<'agentic' | 'local'>('agentic');
  const [activeAgent, setActiveAgent] = useState('Master AI');
  const [showAgents, setShowAgents] = useState(false);
  const [delegationStep, setDelegationStep] = useState<string | null>(null);
  
  const [messages, setMessages] = useState([
    { 
      type: 'ai', 
      text: 'Greetings. I am the SmartGov Master AI System. I can orchestrate tasks across all municipal departments autonomously or query localized knowledge bases. How may I assist you today?' 
    }
  ]);
  const [inputTitle, setInputTitle] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const agents = ['Master AI', 'Agriculture AI', 'Healthcare AI', 'Tourism AI', 'Education AI', 'Environment AI', 'Traffic AI', 'Business AI', 'Gov Services AI'];

  const quickActions = [
    { label: 'City services', icon: Zap },
    { label: 'Emergency info', icon: Zap },
    { label: 'File complaint', icon: Zap },
    { label: 'Find hospital', icon: Zap },
  ];

  useEffect(() => {
    if (externalOpen && initialMessage && messages.length === 1) {
      setMessages(prev => [...prev, { type: 'user', text: initialMessage }]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          type: 'ai', 
          text: `[Master AI] I've received the context regarding "${initialMessage}". I'm analyzing the municipal data for this specific item. How would you like me to proceed?` 
        }]);
      }, 1000);
    }
  }, [externalOpen, initialMessage]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, delegationStep]);

  const getDelegationAgent = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes('health') || lower.includes('hospital') || lower.includes('doctor') || lower.includes('medical')) return 'Healthcare AI';
    if (lower.includes('traffic') || lower.includes('road') || lower.includes('accident')) return 'Traffic AI';
    if (lower.includes('farm') || lower.includes('crop') || lower.includes('agriculture') || lower.includes('seed')) return 'Agriculture AI';
    if (lower.includes('school') || lower.includes('education') || lower.includes('scholarship') || lower.includes('college')) return 'Education AI';
    if (lower.includes('tour') || lower.includes('travel') || lower.includes('hotel') || lower.includes('visit')) return 'Tourism AI';
    if (lower.includes('env') || lower.includes('pollution') || lower.includes('tree') || lower.includes('waste')) return 'Environment AI';
    if (lower.includes('business') || lower.includes('tax') || lower.includes('startup') || lower.includes('market')) return 'Business AI';
    if (lower.includes('citizen') || lower.includes('birth') || lower.includes('certificate') || lower.includes('gov')) return 'Gov Services AI';
    return 'Master AI';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    const userMessage = inputTitle;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputTitle('');
    setIsTyping(true);

    if (aiMode === 'agentic' && activeAgent === 'Master AI') {
      const targetAgent = getDelegationAgent(userMessage);
      if (targetAgent !== 'Master AI') {
        setDelegationStep(`Analyzing request...`);
        setTimeout(() => {
          setDelegationStep(`Delegating to ${targetAgent}...`);
          setTimeout(() => {
            setDelegationStep(`${targetAgent} processing...`);
            setTimeout(() => {
              setDelegationStep(null);
              setIsTyping(false);
              setMessages(prev => [...prev, { 
                type: 'ai', 
                text: `[Master AI → ${targetAgent}] Request analyzed and delegated. ${targetAgent} reports: Based on current municipal data, I've compiled relevant information for your query about "${userMessage}". Would you like me to go deeper on any specific aspect?` 
              }]);
            }, 800);
          }, 700);
        }, 600);
        return;
      }
    }

    setTimeout(() => {
      setIsTyping(false);
      let response = '';
      
      if (aiMode === 'agentic') {
        if (activeAgent === 'Master AI') {
           response = `[Master Orchestrator] Analyzing request asynchronously. Delegating task to specialized sector agents for multi-step execution. Implementing optimal municipal resolution strategy for: "${userMessage}".`;
        } else {
           response = `[${activeAgent} - Agentic Mode] Autonomous planning initiated. Coordinating tasks and executing specialized recommendations based on real-time parameters for your request.`;
        }
      } else {
        response = `[${activeAgent} - Local RAG Mode] Querying local document vectors, policy manuals, and government knowledge bases. Synthesizing retrieved context regarding your request.`;
      }
      
      setMessages(prev => [...prev, { type: 'ai', text: response }]);
    }, 1500);
  };

  const handleQuickAction = (label: string) => {
    setInputTitle(label);
      {/* AIChatbot.tsx line 113 - fix unused fakeEvent */}
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      void fakeEvent; // mark as used
    setMessages(prev => [...prev, { type: 'user', text: label }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responses: Record<string, string> = {
        'City services': '[Master AI] Available city services: Birth/Death certificates, Property tax payment, Building permits, Ward recommendations, Business registration. Which service do you need?',
        'Emergency info': '[Master AI] Emergency contacts: Ambulance 102, Police 100, Fire 101, Butwal Hospital 071-540201, Health Helpline 1115. For immediate assistance, call the relevant number.',
        'File complaint': '[Master AI] To file a complaint, please describe your issue. I can route it to: Traffic (road/safety), Health (sanitation/medical), Environment (pollution/waste), or General Administration.',
        'Find hospital': '[Healthcare AI] Nearest hospitals: 1) Lumbini Provincial Hospital (2.3km, 24/7 ER), 2) Butwal City Hospital (1.8km, 24/7 ER), 3) Om Hospital (3.1km). Need directions or bed availability?',
      };
      setMessages(prev => [...prev, { type: 'ai', text: responses[label] || '[Master AI] Processing your request...' }]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-card w-[420px] max-w-[calc(100vw-32px)] h-[600px] mb-4 rounded-2xl shadow-custom border border-border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#0F172A] p-4 flex justify-between items-center border-b border-border">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Bot className="text-primary" size={24} />
                <h3 className="font-bold text-white text-lg">Master AI Assistant</h3>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full border-2 border-[#0F172A] bg-success animate-pulse"></span>
                  <span className="text-xs text-success font-medium tracking-wider">ONLINE</span>
                </span>
                <span className="text-[10px] text-textSecondary bg-white/5 px-1.5 py-0.5 rounded">
                  {messages.length - 1} msgs
                </span>
              </div>
            </div>
            <button onClick={toggleOpen} className="text-textSecondary hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
              <X size={20} />
            </button>
          </div>

          {/* AI Controls Area */}
          <div className="bg-[#0B1120]/50 border-b border-border p-3 flex flex-col gap-3">
             <div className="flex bg-[#0F172A] rounded-lg p-1 border border-border/50">
               <button 
                  onClick={() => setAiMode('agentic')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${aiMode === 'agentic' ? 'bg-primary/20 text-primary shadow-sm' : 'text-textSecondary hover:text-white'}`}
               >
                 <Network size={14} /> Agentic Mode
               </button>
               <button 
                  onClick={() => setAiMode('local')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${aiMode === 'local' ? 'bg-success/20 text-success shadow-sm' : 'text-textSecondary hover:text-white'}`}
               >
                 <Database size={14} /> Local RAG Mode
               </button>
             </div>
             
             <div className="relative">
                <button 
                  onClick={() => setShowAgents(!showAgents)}
                  className="w-full bg-[#0F172A] border border-border rounded-lg px-3 py-2 text-xs text-white flex justify-between items-center"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Sparkles size={14} className={activeAgent === 'Master AI' ? 'text-primary' : 'text-warning'} /> 
                    Routing: {activeAgent}
                  </span>
                  <ChevronDown size={14} className="text-textSecondary" />
                </button>
                {showAgents && (
                  <div className="absolute top-full mt-1 w-full bg-[#0F172A] border border-border rounded-lg shadow-xl z-20 max-h-40 overflow-y-auto custom-scrollbar">
                    {agents.map(agent => (
                      <button 
                        key={agent} 
                        onClick={() => { setActiveAgent(agent); setShowAgents(false); }}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-white/5 ${activeAgent === agent ? 'text-primary font-bold' : 'text-textSecondary'}`}
                      >
                        {agent}
                      </button>
                    ))}
                  </div>
                )}
             </div>
          </div>

          {/* Chat Pane */}
          <div className="flex-1 p-4 overflow-y-auto bg-cover bg-center custom-scrollbar" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(59,130,246,0.03) 0%, transparent 70%)' }}>
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                    msg.type === 'user' 
                      ? 'bg-primary text-white rounded-br-sm' 
                      : 'bg-card border border-border text-white shadow-sm rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {delegationStep && (
                <div className="flex justify-start">
                  <div className="bg-card border border-primary/30 rounded-2xl rounded-tl-sm p-3 text-xs">
                    <div className="flex items-center gap-2 text-primary">
                      <Network size={14} className="animate-spin" />
                      <span className="font-medium">{delegationStep}</span>
                    </div>
                  </div>
                </div>
              )}
              {isTyping && !delegationStep && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 flex gap-2">
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex gap-2 flex-wrap">
              {quickActions.map((qa, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(qa.label)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium bg-white/[0.03] border border-border rounded-lg text-textSecondary hover:text-white hover:border-primary/30 transition-all"
                >
                  <Zap size={10} className="text-primary" />
                  {qa.label}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 bg-card border-t border-border">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <button
                type="button"
                className="p-2 text-textSecondary hover:text-white hover:bg-white/5 rounded-lg transition-colors shrink-0"
                title="Upload document or image"
              >
                <Paperclip size={18} />
              </button>
              <input
                type="text"
                placeholder={aiMode === 'agentic' ? "Ask the autonomous system..." : "Search local knowledge base..."}
                className="flex-1 bg-background border border-border rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
              />
              <button
                type="button"
                className="p-2 text-textSecondary hover:text-white hover:bg-white/5 rounded-lg transition-colors shrink-0"
                title="Voice input"
              >
                <Mic size={18} />
              </button>
              <button 
                type="submit"
                disabled={!inputTitle.trim()}
                className="bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-primary text-white p-2 rounded-xl transition-colors flex items-center justify-center shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={toggleOpen}
        className="w-14 h-14 bg-primary hover:bg-blue-600 text-white rounded-full shadow-lg shadow-primary/20 flex items-center justify-center transition-transform hover:scale-110 relative"
      >
        <span className="absolute inset-0 rounded-full border border-primary animate-ping opacity-50"></span>
        {isOpen ? <X size={28} /> : <Network size={28} />}
      </button>
    </div>
  );
};
