import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ChevronDown, ChevronUp, Bot, Zap } from 'lucide-react';

interface SectorAIChatProps {
  sectorName: string;
  sectorColor: string;
  features: string[];
  placeholder?: string;
}

const SECTOR_RESPONSES: Record<string, string[]> = {
  'Health': [
    'Based on local health data, Lumbini Provincial Hospital currently has 42 available beds. Would you like directions?',
    'The next free health camp is scheduled for Ward 7 on the 15th. Vaccinations and basic check-ups will be available.',
    'For your symptoms, I recommend visiting a general practitioner. The nearest clinic is Butwal City Hospital (071-542300).',
    'The Aama Suraksha program covers free institutional delivery. You can register at any municipal health post.',
  ],
  'Education': [
    'There are 3 new scholarship opportunities this month: Nepal Government Merit Scholarship, Lumbini Province STEM Grant, and Butwal Municipal Education Fund.',
    'Based on your interests, I recommend the Computer Science program at Butwal Multiple Campus or the Engineering diploma at Lumbini Engineering College.',
    'Career guidance: IT and healthcare are the fastest-growing sectors in the Lumbini region. Consider certifications in data analysis or nursing.',
    'The next national examination registration deadline is in 45 days. Required documents: citizenship, school transcript, and passport photos.',
  ],
  'Agriculture': [
    'For the current season in Butwal, recommended crops include paddy rice, maize, and seasonal vegetables. Soil moisture levels are optimal.',
    'Based on current market prices: tomatoes Rs.45/kg (+12%), potatoes Rs.32/kg (-3%), rice Rs.52/kg (stable). Best time to sell tomatoes is now.',
    'For pest control on rice crops, neem-based organic pesticide is recommended. Avoid chemical spraying during flowering stage.',
    'Government subsidy alert: 50% subsidy on drip irrigation systems available through the Agriculture Development Office until next month.',
  ],
  'Tourism': [
    'Top trending destinations near Butwal: Lumbini (UNESCO site, 25km), Palpa Durbar (heritage, 45km), and Siddhababa Temple (pilgrimage, 8km).',
    'Upcoming festivals: Dashain celebrations with cultural programs in Bus Park area. Butwal Marathon event next month with 2000+ participants expected.',
    'For budget travelers: Butwal has 12 registered homestays starting from Rs.800/night. I can recommend based on your preferences.',
    'The new Butwal-Lumbini tourist corridor project includes cycling tracks and rest areas. Expected completion: 6 months.',
  ],
  'Environment': [
    'Current air quality in Butwal: AQI 78 (Moderate). PM2.5 levels are slightly elevated due to construction activity in the industrial zone.',
    'The municipal waste segregation drive starts next week. Organic waste collection: Monday/Thursday, Recyclables: Tuesday/Friday.',
    'Tree plantation drive: 500 saplings will be distributed free at Ward offices this Saturday. Species available: Sal, Peepal, and Neem.',
    'Tinau River water quality report: pH 7.2 (normal), dissolved oxygen adequate. Pollution levels have decreased 15% since last quarter.',
  ],
  'Traffic': [
    'Current traffic status: Heavy congestion on Butwal-Bhairahawa road near Finance Chowk. Estimated delay: 20 minutes. Alternative: take Milan Chowk bypass.',
    'Road safety alert: Speed cameras are now active on the Ring Road. Speed limit: 40 km/h in urban zones.',
    'Helmet violation fines have increased to Rs.500. Enforcement is active at all major intersections in the metro area.',
    'New traffic signal installed at Bus Park junction. Signal timing: 45 seconds per phase. Pedestrian crossing added.',
  ],
  'Business': [
    'Current business registration statistics: 342 new enterprises registered this fiscal year. Fastest growing: IT services (+28%), Food & Beverage (+19%).',
    'Startup Butwal program: Applications open for Rs.500,000 seed funding. Eligible sectors: AgriTech, EdTech, HealthTech. Deadline: 30 days.',
    'Tax filing reminder: Annual business tax returns due in 45 days. E-filing available through the municipal portal.',
    'Market intelligence: Consumer spending in Butwal metro increased 8% QoQ. Electronics and fashion retail showing strongest growth.',
  ],
  'Government': [
    'New public notice: Municipal property tax assessment for FY 2083/84 begins next month. Online self-assessment portal is now available.',
    'Citizenship certificate processing: Average wait time reduced to 3 days. Required: birth certificate, parents\' citizenship, and 2 passport photos.',
    'Ward office services now available online: recommendation letters, address verification, and income certificates. Processing time: 24-48 hours.',
    'Government scheme alert: Senior citizen monthly allowance increased to Rs.4,000. Automatic enrollment for registered citizens above 70.',
  ],
  'IT': [
    'SmartGov digital infrastructure: 85% of municipal services are now digitized. Planned: AI-powered document verification by next quarter.',
    'Free coding bootcamp for youth starting next month at Butwal IT Park. Languages covered: Python, JavaScript, and mobile development.',
    'Smart city update: IoT sensors deployed at 12 intersections for real-time traffic monitoring. Dashboard integration expected in 2 weeks.',
    'Digital literacy program: 2,500 citizens trained this year. Next batch starts at Ward 9 community center.',
  ],
};

export const SectorAIChat: React.FC<SectorAIChatProps> = ({ sectorName, sectorColor, features, placeholder }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'ai'; text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getResponse = (_query: string): string => {
    const responses = SECTOR_RESPONSES[sectorName] || SECTOR_RESPONSES['Government'];
    const idx = Math.floor(Math.random() * responses.length);
    return responses[idx];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'ai', text: getResponse(userMsg) }]);
    }, 1200 + Math.random() * 800);
  };

  const handleFeatureClick = (feature: string) => {
    setActiveFeature(feature);
    setIsExpanded(true);
    const query = `Tell me about ${feature.toLowerCase()} in ${sectorName}`;
    setMessages(prev => [...prev, { type: 'user', text: query }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'ai', text: getResponse(query) }]);
    }, 1200 + Math.random() * 800);
  };

  const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; ring: string }> = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20', ring: 'ring-blue-500/20' },
    green: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20', ring: 'ring-emerald-500/20' },
    red: { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/30', glow: 'shadow-red-500/20', ring: 'ring-red-500/20' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/20', ring: 'ring-amber-500/20' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20', ring: 'ring-purple-500/20' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20', ring: 'ring-cyan-500/20' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-400', border: 'border-indigo-500/30', glow: 'shadow-indigo-500/20', ring: 'ring-indigo-500/20' },
    teal: { bg: 'bg-teal-500', text: 'text-teal-400', border: 'border-teal-500/30', glow: 'shadow-teal-500/20', ring: 'ring-teal-500/20' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'shadow-orange-500/20', ring: 'ring-orange-500/20' },
  };

  const colors = colorMap[sectorColor] || colorMap.blue;

  return (
    <div className={`bg-gradient-to-r from-[#0B1120] to-[#131C31] border ${colors.border} rounded-2xl overflow-hidden shadow-lg ${colors.glow} transition-all duration-300`}>
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center shadow-lg ${colors.glow}`}>
            <Bot size={22} className="text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              Ask {sectorName} AI
              <span className={`${colors.text} text-[10px] uppercase font-bold px-2 py-0.5 rounded ${colors.bg}/20 border ${colors.border}`}>
                Online
              </span>
            </h3>
            <p className="text-xs text-textSecondary mt-0.5">Sector-specific AI assistant • Connected to Master AI</p>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${isExpanded ? 'bg-white/5' : ''} transition-colors`}>
          {isExpanded ? <ChevronUp size={18} className="text-textSecondary" /> : <ChevronDown size={18} className="text-textSecondary" />}
        </div>
      </button>

      {/* Feature Chips - Always visible */}
      <div className="px-5 pb-4 flex flex-wrap gap-2">
        {features.map((feature, i) => (
          <button
            key={i}
            onClick={() => handleFeatureClick(feature)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              activeFeature === feature
                ? `${colors.bg}/20 ${colors.text} ${colors.border}`
                : 'bg-white/[0.03] text-textSecondary border-border hover:border-white/20 hover:text-white'
            }`}
          >
            <Zap size={12} />
            {feature}
          </button>
        ))}
      </div>

      {/* Expandable Chat Area */}
      {isExpanded && (
        <div className="border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
          {/* Messages */}
          <div className="max-h-[300px] overflow-y-auto p-4 space-y-3 custom-scrollbar" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(59,130,246,0.02) 0%, transparent 70%)' }}>
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Sparkles className={`${colors.text} mx-auto mb-3 animate-pulse`} size={28} />
                <p className="text-sm text-textSecondary">Ask anything about <span className="text-white font-medium">{sectorName}</span></p>
                <p className="text-xs text-textSecondary/60 mt-1">Click a feature above or type your question below</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.type === 'user'
                    ? `${colors.bg} text-white rounded-br-sm`
                    : 'bg-card border border-border text-white/90 rounded-tl-sm'
                }`}>
                  {msg.type === 'ai' && (
                    <span className={`text-[10px] ${colors.text} font-bold uppercase tracking-wider block mb-1`}>
                      {sectorName} AI
                    </span>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
                  <span className={`w-2 h-2 ${colors.bg}/40 rounded-full animate-bounce`}></span>
                  <span className={`w-2 h-2 ${colors.bg}/40 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></span>
                  <span className={`w-2 h-2 ${colors.bg}/40 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/50">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder={placeholder || `Ask ${sectorName} AI anything...`}
                className="flex-1 bg-[#0F172A] border border-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-textSecondary/60"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={`${colors.bg} hover:opacity-90 disabled:opacity-30 text-white p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0`}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
