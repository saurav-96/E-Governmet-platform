import { useState } from 'react';
import { Sidebar, DEPARTMENTS, OTHER_MENU } from './components/Sidebar';
import { Header } from './components/Header';
import { InteractiveBackground } from './components/InteractiveBackground';
import { MainDashboard } from './components/MainDashboard';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { DetailModal } from './components/DetailModal';

// Department pages
import { Health } from './components/Health';
import { Agriculture } from './components/Agriculture';
import { TrafficSafety } from './components/TrafficSafety';
import { Environment } from './components/Environment';
import { Education } from './components/Education';
import { ITInnovation } from './components/ITInnovation';
import { Tourism } from './components/Tourism';
import { Business } from './components/Business';
import { GovernmentServices } from './components/GovernmentServices';

// Overview pages
import { ProgressTracker } from './components/ProgressTracker';
import { Events } from './components/Events';
import { Contact } from './components/Contact';
import { Analytics } from './components/Analytics';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [lang, setLang] = useState('EN');
  const [theme, setTheme] = useState('dark');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Detail Modal State
  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    sectorColor?: string;
    metadata?: { label: string; value: string }[];
    recommendations?: { title: string; description: string }[];
  }>({
    isOpen: false,
    title: '',
    description: '',
  });

  const openDetail = (data: any) => {
    setDetailModal({ ...data, isOpen: true });
  };

  // Get active page display name
  const allPages = [...DEPARTMENTS, ...OTHER_MENU];
  const activePageData = allPages.find(p => p.id === activePage);
  const activePageString = activePageData
    ? (lang === 'EN' ? activePageData.name : activePageData.name_np)
    : 'Dashboard';

  const renderPage = () => {
    const commonProps = { onOpenDetail: openDetail };
    switch (activePage) {
      case 'dashboard': return <MainDashboard />;
      case 'health': return <Health {...commonProps} />;
      case 'agriculture': return <Agriculture {...commonProps} />;
      case 'traffic': return <TrafficSafety {...commonProps} />;
      case 'environment': return <Environment {...commonProps} />;
      case 'education': return <Education {...commonProps} />;
      case 'it': return <ITInnovation {...commonProps} />;
      case 'tourism': return <Tourism {...commonProps} />;
      case 'business': return <Business {...commonProps} />;
      case 'gov': return <GovernmentServices {...commonProps} />;
      case 'progress': return <ProgressTracker />;
      case 'events': return <Events />;
      case 'contact': return <Contact />;
      case 'analytics': return <Analytics />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <MainDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background */}
      <InteractiveBackground theme={theme} />

      {/* Sidebar */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={(page) => {
          setActivePage(page);
          setIsSidebarOpen(false);
        }} 
        lang={lang}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'md:ml-64'}`}>
        {/* Header */}
        <Header
          activePageString={activePageString}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          onOpenChatbot={() => setIsChatbotOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Page Content */}
        <div className="flex-1 p-6 relative z-10">
          {renderPage()}
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* AI Chatbot */}
      <AIChatbot 
        isOpen={isChatbotOpen} 
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)} 
        externalControl={true}
        initialMessage={detailModal.isOpen ? `About ${detailModal.title}: ${detailModal.description}` : undefined}
      />

      {/* Detail Modal */}
      <DetailModal
        isOpen={detailModal.isOpen}
        onClose={() => setDetailModal(prev => ({ ...prev, isOpen: false }))}
        title={detailModal.title}
        description={detailModal.description}
        sectorColor={detailModal.sectorColor}
        metadata={detailModal.metadata}
        recommendations={detailModal.recommendations}
        onAskAI={() => {
          setIsChatbotOpen(true);
        }}
      />
    </div>
  );
}

export default App;
