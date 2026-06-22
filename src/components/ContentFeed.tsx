import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Clock, Sparkles, ChevronRight, Zap } from 'lucide-react';

interface FeedItem {
  title: string;
  description: string;
  category: string;
  timeAgo: string;
  isNew?: boolean;
}

interface ContentFeedProps {
  sector: string;
  sectorColor?: string;
}

const SECTOR_FEED_DATA: Record<string, FeedItem[]> = {
  Agriculture: [
    { title: 'Paddy Price Update', description: 'Minimum support price for paddy increased by Rs.2/kg for Lumbini region.', category: 'Market', timeAgo: '2h ago', isNew: true },
    { title: 'Monsoon Advisory', description: 'Expected rainfall above average. Recommended to complete sowing by next week.', category: 'Weather', timeAgo: '4h ago', isNew: true },
    { title: 'Organic Certification Drive', description: 'Free organic farming certification available for smallholders in Ward 5-8.', category: 'Program', timeAgo: '6h ago' },
    { title: 'Fertilizer Subsidy Extended', description: 'Government extends 30% urea subsidy through end of planting season.', category: 'Subsidy', timeAgo: '8h ago' },
    { title: 'Drip Irrigation Workshop', description: 'Free training session at Agriculture Service Center, Butwal. June 28.', category: 'Training', timeAgo: '1d ago' },
    { title: 'Vegetable Market Prices', description: 'Tomato Rs.55, Cauliflower Rs.40, Potato Rs.30. Prices trending up.', category: 'Market', timeAgo: '1d ago' },
  ],
  Education: [
    { title: 'New STEM Scholarship', description: 'Lumbini Province announces 50 full scholarships for engineering students.', category: 'Scholarship', timeAgo: '1h ago', isNew: true },
    { title: 'Digital Literacy Program', description: 'Free computer training for teachers at Butwal Multiple Campus.', category: 'Training', timeAgo: '3h ago', isNew: true },
    { title: 'SEE Results Published', description: 'Check your SEE results online. National pass rate: 78.2%.', category: 'Results', timeAgo: '5h ago' },
    { title: 'Career Fair Butwal', description: 'Annual career fair at Trade Tower. 50+ companies participating. July 5.', category: 'Event', timeAgo: '8h ago' },
    { title: 'University Admission Open', description: 'Applications open for B.Sc, BBA, and BCA programs at affiliated colleges.', category: 'Admission', timeAgo: '1d ago' },
    { title: 'Free Online Courses', description: 'Government-funded Coursera access for students. Register with student ID.', category: 'Course', timeAgo: '2d ago' },
  ],
  Health: [
    { title: 'Free Health Camp', description: 'General checkup, eye screening, and dental at Ward 7 Health Post. Saturday.', category: 'Camp', timeAgo: '1h ago', isNew: true },
    { title: 'COVID Booster Available', description: 'XBB variant booster available for 60+ at all municipal health posts.', category: 'Vaccination', timeAgo: '3h ago', isNew: true },
    { title: 'Blood Donation Drive', description: 'Red Cross blood donation camp at Butwal City Hospital. Walk-in welcome.', category: 'Campaign', timeAgo: '6h ago' },
    { title: 'Dengue Prevention Alert', description: 'Mosquito fogging scheduled for wards 3-6. Remove standing water near homes.', category: 'Alert', timeAgo: '12h ago' },
    { title: 'New MRI Machine', description: 'Lumbini Provincial Hospital installs 3T MRI. Appointments available from Monday.', category: 'Facility', timeAgo: '1d ago' },
    { title: 'Mental Health Helpline', description: 'Free counseling available at 1166. Trained professionals available 24/7.', category: 'Service', timeAgo: '2d ago' },
  ],
  Tourism: [
    { title: 'Lumbini Light Show', description: 'New evening light & sound show at Maya Devi Temple. Daily at 7 PM.', category: 'Attraction', timeAgo: '2h ago', isNew: true },
    { title: 'Butwal Marathon', description: '3rd Annual Butwal Marathon. Registration open. 5K, 10K, 21K categories.', category: 'Event', timeAgo: '4h ago', isNew: true },
    { title: 'Heritage Walk Route', description: 'New heritage walking trail connecting 8 historical sites. Maps at tourist office.', category: 'Activity', timeAgo: '8h ago' },
    { title: 'Hotel Occupancy Up 25%', description: 'Tourism season peak. Book early for Dashain period accommodations.', category: 'Stats', timeAgo: '1d ago' },
    { title: 'Palpa Day Trip', description: 'Organized day trip to Tansen Durbar and Rani Mahal. Every Saturday.', category: 'Tour', timeAgo: '2d ago' },
    { title: 'Paragliding Launch', description: 'New paragliding service from Siddhababa hills. Flights starting next month.', category: 'Activity', timeAgo: '3d ago' },
  ],
  Environment: [
    { title: 'Air Quality Report', description: 'AQI in Butwal: 78 (Moderate). PM2.5 slightly elevated near industrial zone.', category: 'Air Quality', timeAgo: '30m ago', isNew: true },
    { title: 'Tree Plantation Drive', description: '500 free saplings at Ward offices this Saturday. Sal, Neem, and Peepal.', category: 'Campaign', timeAgo: '2h ago', isNew: true },
    { title: 'Waste Segregation Week', description: 'Color-coded bins distributed to 2,000 households. Training at Ward offices.', category: 'Program', timeAgo: '5h ago' },
    { title: 'Solar Panel Subsidy', description: '40% subsidy on rooftop solar panels for residential buildings. Apply now.', category: 'Energy', timeAgo: '1d ago' },
    { title: 'Tinau River Cleanup', description: 'Community river cleanup drive. Volunteers needed. Sunday 6 AM at Manimukunda.', category: 'Campaign', timeAgo: '1d ago' },
    { title: 'Noise Pollution Report', description: 'Decibel levels exceed limits at Bus Park area. Enforcement action planned.', category: 'Report', timeAgo: '2d ago' },
  ],
  Traffic: [
    { title: 'Road Closure Alert', description: 'Butwal-Tansen road closed at KM 8 for maintenance. Use Siddhababa route.', category: 'Alert', timeAgo: '1h ago', isNew: true },
    { title: 'New Speed Cameras', description: '5 speed cameras activated on Ring Road. Speed limit: 40 km/h urban zones.', category: 'Enforcement', timeAgo: '3h ago', isNew: true },
    { title: 'Smart Signal Update', description: 'AI-optimized signal timing at Finance Chowk reduces wait by 30%.', category: 'Infrastructure', timeAgo: '6h ago' },
    { title: 'Helmet Campaign', description: 'Free helmet distribution for two-wheeler riders. Available at Traffic Police office.', category: 'Safety', timeAgo: '12h ago' },
    { title: 'Parking Rules Updated', description: 'No-parking zones expanded in market area. Violators fined Rs.500.', category: 'Rules', timeAgo: '1d ago' },
    { title: 'Accident Statistics', description: 'Road accidents down 18% after smart traffic signal deployment.', category: 'Stats', timeAgo: '2d ago' },
  ],
  Business: [
    { title: 'Startup Fund Open', description: 'Rs.500K seed funding for startups in AgriTech, EdTech, HealthTech. Apply now.', category: 'Funding', timeAgo: '2h ago', isNew: true },
    { title: 'Tax Filing Deadline', description: 'Annual business tax returns due in 45 days. E-filing portal is live.', category: 'Tax', timeAgo: '4h ago', isNew: true },
    { title: 'IT Park Expansion', description: 'Butwal IT Park Phase 2 approved. 20 new office spaces for tech companies.', category: 'Infrastructure', timeAgo: '1d ago' },
    { title: 'Export Incentives', description: 'Government offers 5% export subsidy for local handicraft businesses.', category: 'Policy', timeAgo: '1d ago' },
    { title: 'Business Registration', description: 'Online business registration now takes only 24 hours. Fast-track available.', category: 'Service', timeAgo: '2d ago' },
    { title: 'Market Analysis', description: 'Consumer spending up 8% QoQ. Retail and F&B sectors leading growth.', category: 'Market', timeAgo: '3d ago' },
  ],
  Government: [
    { title: 'Property Tax Notice', description: 'Municipal property tax assessment for FY 2083/84 begins next month.', category: 'Notice', timeAgo: '1h ago', isNew: true },
    { title: 'Citizenship Camp', description: 'Special citizenship certificate distribution camp at Ward 4. Bring documents.', category: 'Service', timeAgo: '3h ago', isNew: true },
    { title: 'Senior Allowance Update', description: 'Monthly allowance for 70+ citizens increased to Rs.4,000. Auto-enrolled.', category: 'Scheme', timeAgo: '6h ago' },
    { title: 'Ward Office Online', description: 'Recommendation letters, address verification available online. 24-48hr processing.', category: 'Digital', timeAgo: '1d ago' },
    { title: 'Town Hall Meeting', description: 'Open town hall with Mayor at Rangashala. Saturday 2 PM. All citizens welcome.', category: 'Event', timeAgo: '1d ago' },
    { title: 'Birth Registration', description: 'Free birth certificate processing for children under 1 year. No appointment needed.', category: 'Service', timeAgo: '2d ago' },
  ],
  IT: [
    { title: 'Coding Bootcamp', description: 'Free 3-month coding bootcamp at Butwal IT Park. Python, JS, Mobile Dev.', category: 'Training', timeAgo: '2h ago', isNew: true },
    { title: 'Smart City Dashboard', description: 'IoT sensor data now available on public dashboard. Real-time traffic & AQI.', category: 'Infrastructure', timeAgo: '4h ago', isNew: true },
    { title: 'Free Wi-Fi Expansion', description: 'Municipal Wi-Fi now covers 15 public parks and 8 community centers.', category: 'Connectivity', timeAgo: '8h ago' },
    { title: 'Digital Literacy Stats', description: '2,500 citizens completed digital literacy training this year.', category: 'Achievement', timeAgo: '1d ago' },
    { title: 'E-Governance Update', description: '85% of municipal services now digitized. AI document verification coming.', category: 'Digital', timeAgo: '2d ago' },
    { title: 'Hackathon Announcement', description: 'Butwal Smart City Hackathon. Theme: Civic Tech. Prizes up to Rs.100K.', category: 'Event', timeAgo: '3d ago' },
  ],
};

export const ContentFeed: React.FC<ContentFeedProps> = ({ sector, sectorColor = 'blue' }) => {
  const [displayItems, setDisplayItems] = useState<FeedItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const allItems = SECTOR_FEED_DATA[sector] || SECTOR_FEED_DATA['Government'];

  const shuffleAndPick = useCallback(() => {
    const shuffled = [...allItems].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [sector]);

  useEffect(() => {
    setDisplayItems(shuffleAndPick());
  }, [sector]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setDisplayItems(shuffleAndPick());
        setIsRefreshing(false);
      }, 600);
    }, 30000);
    return () => clearInterval(interval);
  }, [shuffleAndPick]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setDisplayItems(shuffleAndPick());
      setIsRefreshing(false);
    }, 600);
  };

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/20' },
    green: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    red: { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/20' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/20' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500/20' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500/20' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-400', border: 'border-indigo-500/20' },
    teal: { bg: 'bg-teal-500', text: 'text-teal-400', border: 'border-teal-500/20' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500/20' },
  };
  const colors = colorMap[sectorColor] || colorMap.blue;

  return (
    <div className="bg-card border border-border rounded-2xl shadow-custom overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${colors.bg}/20 rounded-lg flex items-center justify-center`}>
            <Sparkles size={16} className={colors.text} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI-Generated Updates</h3>
            <p className="text-[11px] text-textSecondary">Auto-refreshes every 30s</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
            isRefreshing
              ? 'border-border text-textSecondary'
              : `border-border hover:${colors.border} ${colors.text} hover:bg-white/[0.02]`
          }`}
        >
          <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
          {isRefreshing ? 'Updating...' : 'Refresh'}
        </button>
      </div>

      {/* Feed Items */}
      <div className={`divide-y divide-border transition-opacity duration-300 ${isRefreshing ? 'opacity-40' : 'opacity-100'}`}>
        {displayItems.map((item, i) => (
          <div key={`${item.title}-${i}`} className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${colors.bg}/10 ${colors.text}`}>
                    {item.category}
                  </span>
                  {item.isNew && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-success/10 text-success flex items-center gap-0.5">
                      <Zap size={8} /> New
                    </span>
                  )}
                  <span className="text-[10px] text-textSecondary flex items-center gap-1">
                    <Clock size={10} /> {item.timeAgo}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">{item.title}</h4>
                <p className="text-xs text-textSecondary mt-0.5 line-clamp-2">{item.description}</p>
              </div>
              <ChevronRight size={16} className="text-textSecondary group-hover:text-primary transition-colors shrink-0 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
