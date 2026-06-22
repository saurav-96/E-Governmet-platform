import { 
  LayoutDashboard, Building2, ShieldAlert, 
  LineChart, FileText, Settings, HeartPulse, 
  Leaf, Trees, BookOpen, Cpu, Target, CalendarDays, Phone, Compass, Landmark, Briefcase, X
} from 'lucide-react';

export const DEPARTMENTS = [
  { id: 'dashboard', name: 'Dashboard', name_np: 'ड्यासबोर्ड', icon: LayoutDashboard },
  { id: 'health', name: 'Health', name_np: 'स्वास्थ्य', icon: HeartPulse },
  { id: 'agriculture', name: 'Agriculture', name_np: 'कृषि', icon: Trees },
  { id: 'traffic', name: 'Traffic Safety', name_np: 'ट्राफिक सुरक्षा', icon: ShieldAlert },
  { id: 'environment', name: 'Environment', name_np: 'वातावरण', icon: Leaf },
  { id: 'education', name: 'Education', name_np: 'शिक्षा', icon: BookOpen },
  { id: 'it', name: 'IT & Innovation', name_np: 'मेसिन लर्निङ / IT', icon: Cpu },
  { id: 'tourism', name: 'Tourism', name_np: 'पर्यटन', icon: Compass },
  { id: 'business', name: 'Business & Economy', name_np: 'व्यापार', icon: Briefcase },
  { id: 'gov', name: 'Gov Services', name_np: 'सरकारी सेवा', icon: Landmark },
];

export const OTHER_MENU = [
  { id: 'progress', name: 'Progress Tracker', name_np: 'प्रगति ट्र्याकर', icon: Target },
  { id: 'events', name: 'City Events', name_np: 'कार्यक्रमहरू', icon: CalendarDays },
  { id: 'contact', name: 'Contact Us', name_np: 'सम्पर्क गर्नुहोस्', icon: Phone },
  { id: 'analytics', name: 'Analytics', name_np: 'तथ्याङ्क', icon: LineChart },
  { id: 'reports', name: 'Reports', name_np: 'प्रतिवेदनहरू', icon: FileText },
  { id: 'settings', name: 'Settings', name_np: 'सेटिङहरू', icon: Settings },
];

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  lang?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, lang = 'EN', isOpen = false, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 h-full w-64 bg-[#111827] border-r border-border flex flex-col z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Butwal SmartGov</h2>
              <p className="text-xs text-textSecondary">{lang === 'EN' ? 'AI Sub-Metro Portal' : 'महानगरपालिका पोर्टल'}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-1 text-textSecondary hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
        <div className="mb-6">
          <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-3 px-3">
            {lang === 'EN' ? 'Departments' : 'विभागहरु'}
          </p>
          <nav className="space-y-1">
            {DEPARTMENTS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-white shadow-md shadow-primary/20' 
                      : 'text-textSecondary hover:bg-card hover:text-white'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-textSecondary'} />
                  <span className="font-medium text-sm">{lang === 'EN' ? item.name : item.name_np}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-3 px-3">
            {lang === 'EN' ? 'Overview' : 'सिंहावलोकन'}
          </p>
          <nav className="space-y-1">
            {OTHER_MENU.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-textSecondary hover:bg-card hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{lang === 'EN' ? item.name : item.name_np}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      </aside>
    </>
  );
};
