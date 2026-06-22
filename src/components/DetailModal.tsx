import React, { useEffect } from 'react';
import { X, Bot, ExternalLink, ChevronRight, Sparkles } from 'lucide-react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  metadata?: { label: string; value: string }[];
  sectorColor?: string;
  recommendations?: { title: string; description: string }[];
  onAskAI?: (question: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen, onClose, title, description, metadata = [], sectorColor = 'blue', recommendations = [], onAskAI
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500', green: 'bg-emerald-500', red: 'bg-red-500',
    amber: 'bg-amber-500', purple: 'bg-purple-500', cyan: 'bg-cyan-500',
    indigo: 'bg-indigo-500', teal: 'bg-teal-500', orange: 'bg-orange-500',
  };
  const textMap: Record<string, string> = {
    blue: 'text-blue-400', green: 'text-emerald-400', red: 'text-red-400',
    amber: 'text-amber-400', purple: 'text-purple-400', cyan: 'text-cyan-400',
    indigo: 'text-indigo-400', teal: 'text-teal-400', orange: 'text-orange-400',
  };
  const bgColor = colorMap[sectorColor] || colorMap.blue;
  const textColor = textMap[sectorColor] || textMap.blue;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#111827] border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-[#0F172A]/80 flex items-start justify-between shrink-0">
          <div className="flex-1 pr-4">
            <div className={`inline-block px-2 py-0.5 ${bgColor}/20 ${textColor} text-[10px] font-bold uppercase rounded mb-2`}>
              Detailed View
            </div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-textSecondary hover:text-white transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <p className="text-sm text-textSecondary leading-relaxed">{description}</p>

          {/* Metadata Grid */}
          {metadata.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {metadata.map((m, i) => (
                <div key={i} className="bg-[#0F172A] border border-border rounded-xl p-3">
                  <p className="text-[10px] text-textSecondary uppercase tracking-wider font-semibold mb-1">{m.label}</p>
                  <p className="text-sm text-white font-medium">{m.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Ask AI Button */}
          {onAskAI && (
            <button
              onClick={() => onAskAI(`Tell me more about ${title}`)}
              className={`w-full flex items-center justify-center gap-2 ${bgColor}/10 ${textColor} hover:${bgColor}/20 py-3 rounded-xl font-medium transition text-sm border border-white/5`}
            >
              <Bot size={18} />
              Ask AI about this
              <Sparkles size={14} />
            </button>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles size={14} className={textColor} /> Related Recommendations
              </h4>
              <div className="space-y-2">
                {recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="bg-[#0F172A] border border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <h5 className="text-sm font-medium text-white group-hover:text-primary transition-colors">{rec.title}</h5>
                      <p className="text-xs text-textSecondary mt-0.5">{rec.description}</p>
                    </div>
                    <ChevronRight size={16} className="text-textSecondary group-hover:text-primary transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-[#0F172A]/50 flex items-center justify-between shrink-0">
          <button
            className="text-xs text-textSecondary hover:text-white flex items-center gap-1 transition-colors"
          >
            <ExternalLink size={12} /> Open full page
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-white hover:bg-white/5 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
