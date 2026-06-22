import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldAlert, Cpu, HeartPulse, Trees,
  BookOpen, Leaf, Compass, Briefcase, Landmark,
  Globe, Zap, ArrowRight, CheckCircle2
} from 'lucide-react';
import { ScrollSection, ScrollCard, AnimatedCounter } from './ScrollAnimations';

/* ===== STATS SECTION ===== */
export const StatsSection: React.FC = () => (
  <ScrollSection 
    id="stats" index={1}
    title="City at a Glance"
    subtitle="Real-time metrics powering the future of Butwal Sub-Metropolitan City"
    gradient="radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.15), transparent 60%)"
  >
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
      <AnimatedCounter value="152,430" label="Citizens Served" delay={0.1} />
      <AnimatedCounter value="48" label="Active Projects" delay={0.2} />
      <AnimatedCounter value="94%" label="Response Rate" delay={0.3} />
      <AnimatedCounter value="16" label="Smart Wards" delay={0.4} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { icon: Zap, title: 'AI Analytics', desc: 'Real-time data processing with neural networks analyzing city patterns 24/7', color: 'from-yellow-500 to-orange-500' },
        { icon: ShieldAlert, title: 'Cyber Security', desc: 'Military-grade encryption protecting citizen data with zero-knowledge proofs', color: 'from-green-500 to-emerald-500' },
        { icon: Globe, title: 'Digital Identity', desc: 'Unified biometric citizen platform with blockchain-verified credentials', color: 'from-blue-500 to-cyan-500' },
      ].map(({ icon: Icon, title, desc, color }, i) => (
        <ScrollCard key={title} delay={0.1 + i * 0.1}>
          <div className="p-8">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg`}>
              <Icon size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-white/40 leading-relaxed">{desc}</p>
          </div>
        </ScrollCard>
      ))}
    </div>
  </ScrollSection>
);

/* ===== DEPARTMENTS GRID ===== */
const departments = [
  { id: 'health', name: 'Health Services', icon: HeartPulse, stat: 'Operational', color: 'from-rose-500 to-pink-600', items: ['Hospitals', 'Clinics', 'Vaccination'] },
  { id: 'traffic', name: 'Traffic Safety', icon: ShieldAlert, stat: 'High Alert', color: 'from-amber-500 to-orange-600', items: ['Smart Signals', 'Surveillance', 'Response'] },
  { id: 'education', name: 'Education', icon: BookOpen, stat: 'Active', color: 'from-violet-500 to-purple-600', items: ['Schools', 'Libraries', 'E-Learning'] },
  { id: 'environment', name: 'Environment', icon: Leaf, stat: 'Monitoring', color: 'from-green-500 to-emerald-600', items: ['Air Quality', 'Water', 'Waste'] },
  { id: 'agriculture', name: 'Agriculture', icon: Trees, stat: 'Active', color: 'from-lime-500 to-green-600', items: ['Subsidies', 'Irrigation', 'Markets'] },
  { id: 'technology', name: 'IT & Innovation', icon: Cpu, stat: 'Stable', color: 'from-cyan-500 to-blue-600', items: ['Smart City', 'AI Lab', 'Wi-Fi'] },
  { id: 'tourism', name: 'Tourism', icon: Compass, stat: 'Active', color: 'from-teal-500 to-cyan-600', items: ['Heritage', 'Hotels', 'Events'] },
  { id: 'business', name: 'Business & Economy', icon: Briefcase, stat: 'Growing', color: 'from-indigo-500 to-blue-600', items: ['Permits', 'Tax', 'Investment'] },
  { id: 'gov', name: 'Gov Services', icon: Landmark, stat: 'Online', color: 'from-blue-500 to-indigo-600', items: ['Documents', 'Tenders', 'Welfare'] },
];

export const DepartmentsSection: React.FC = () => (
  <ScrollSection
    id="departments" index={2}
    title="Smart Departments"
    subtitle="AI-powered governance across all municipal departments"
    gradient="radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.12), transparent 60%)"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((dept, i) => (
        <ScrollCard key={dept.id} delay={0.05 + i * 0.05}>
          <div className="p-6 group cursor-pointer" onClick={() => 
            document.getElementById(dept.id)?.scrollIntoView({ behavior: 'smooth' })
          }>
            <div className="flex items-start justify-between mb-5">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <dept.icon size={24} className="text-white" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                {dept.stat}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{dept.name}</h3>
            <div className="flex gap-2 mb-4">
              {dept.items.map(item => (
                <span key={item} className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-white/30 border border-white/[0.06]">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-sm text-blue-400/60 group-hover:text-blue-400 transition-colors">
              <span>Explore</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </ScrollCard>
      ))}
    </div>
  </ScrollSection>
);

/* ===== INDIVIDUAL DEPARTMENT SECTIONS ===== */
interface DeptSectionProps {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  gradient: string;
  icon: any;
  iconColor: string;
  stats: Array<{ value: string; label: string }>;
  features: Array<{ title: string; desc: string }>;
  highlights: string[];
}

const DeptSection: React.FC<DeptSectionProps> = ({
  id, index, title, subtitle, gradient, icon: Icon, iconColor,
  stats, features, highlights
}) => (
  <ScrollSection id={id} index={index} title={title} subtitle={subtitle} gradient={gradient}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Stats + Features */}
      <div className="space-y-6">
        {/* Stats row */}
        <ScrollCard delay={0.1}>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-1">{s.value}</div>
                  <div className="text-xs text-white/30 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollCard>

        {/* Features */}
        {features.map((f, i) => (
          <ScrollCard key={f.title} delay={0.15 + i * 0.1}>
            <div className="p-6">
              <h4 className="text-lg font-bold text-white mb-2">{f.title}</h4>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </ScrollCard>
        ))}
      </div>

      {/* Right: Visual + Highlights */}
      <div className="space-y-6">
        <ScrollCard delay={0.2}>
          <div className="p-8 flex flex-col items-center">
            <motion.div
              className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${iconColor} flex items-center justify-center mb-6 shadow-2xl`}
              animate={{ rotateY: [0, 10, -10, 0], rotateX: [0, -5, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Icon size={56} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/30 text-center text-sm">{subtitle}</p>
          </div>
        </ScrollCard>

        <ScrollCard delay={0.3}>
          <div className="p-6">
            <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Key Highlights</h4>
            <div className="space-y-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/50">{h}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollCard>
      </div>
    </div>
  </ScrollSection>
);

export const HealthSection: React.FC = () => (
  <DeptSection
    id="health" index={3} title="Health Services" subtitle="AI-powered healthcare monitoring and management"
    gradient="radial-gradient(ellipse at 70% 40%, rgba(244,63,94,0.1), transparent 60%)"
    icon={HeartPulse} iconColor="from-rose-500 to-pink-600"
    stats={[
      { value: '24', label: 'Hospitals' }, { value: '156', label: 'Health Workers' },
      { value: '98%', label: 'Coverage' }, { value: '12K', label: 'Monthly Visits' }
    ]}
    features={[
      { title: 'Telemedicine Network', desc: 'AI-assisted remote diagnosis connecting rural patients with specialist doctors in real-time.' },
      { title: 'Smart Vaccination', desc: 'Automated scheduling and tracking system with predictive analytics for disease outbreaks.' }
    ]}
    highlights={[
      'Real-time hospital bed availability dashboard',
      'AI-powered disease surveillance system',
      'Digital health records for all citizens',
      'Emergency ambulance GPS tracking',
      '24/7 health helpline integration'
    ]}
  />
);

export const TrafficSection: React.FC = () => (
  <DeptSection
    id="traffic" index={4} title="Traffic Safety" subtitle="Smart traffic management with AI surveillance"
    gradient="radial-gradient(ellipse at 30% 60%, rgba(245,158,11,0.1), transparent 60%)"
    icon={ShieldAlert} iconColor="from-amber-500 to-orange-600"
    stats={[
      { value: '340+', label: 'CCTV Cameras' }, { value: '52', label: 'Smart Signals' },
      { value: '4.2min', label: 'Avg Response' }, { value: '23%', label: 'Accident Reduction' }
    ]}
    features={[
      { title: 'AI Traffic Flow', desc: 'Neural network-based traffic prediction optimizing signal timing for 50% less congestion.' },
      { title: 'Incident Detection', desc: 'Computer vision powered accident detection with automatic emergency dispatch.' }
    ]}
    highlights={[
      'Live traffic heat map visualization',
      'Smart parking guidance system',
      'Automated speed & helmet detection',
      'School zone safety monitoring',
      'EV charging station network'
    ]}
  />
);

export const EducationSection: React.FC = () => (
  <DeptSection
    id="education" index={5} title="Education" subtitle="Transforming learning with digital innovation"
    gradient="radial-gradient(ellipse at 60% 30%, rgba(139,92,246,0.1), transparent 60%)"
    icon={BookOpen} iconColor="from-violet-500 to-purple-600"
    stats={[
      { value: '186', label: 'Schools' }, { value: '45K', label: 'Students' },
      { value: '2.8K', label: 'Teachers' }, { value: '95%', label: 'Literacy Rate' }
    ]}
    features={[
      { title: 'Smart Classrooms', desc: 'IoT-enabled learning environments with AI tutoring and adaptive content delivery.' },
      { title: 'Digital Library', desc: 'Cloud-based repository with 50,000+ books and research papers accessible from any device.' }
    ]}
    highlights={[
      'Student performance analytics dashboard',
      'Online scholarship application portal',
      'Teacher training management system',
      'Real-time attendance tracking',
      'Parent-teacher communication platform'
    ]}
  />
);

export const EnvironmentSection: React.FC = () => (
  <DeptSection
    id="environment" index={6} title="Environment" subtitle="Monitoring and protecting our natural resources"
    gradient="radial-gradient(ellipse at 40% 70%, rgba(34,197,94,0.1), transparent 60%)"
    icon={Leaf} iconColor="from-green-500 to-emerald-600"
    stats={[
      { value: '42', label: 'AQI Sensors' }, { value: '89%', label: 'Clean Water' },
      { value: '15K', label: 'Trees Planted' }, { value: '78%', label: 'Waste Recycled' }
    ]}
    features={[
      { title: 'Air Quality Grid', desc: 'Real-time pollution monitoring network with predictive alerts and health advisories.' },
      { title: 'Smart Waste', desc: 'IoT-enabled waste bins with route optimization reducing collection costs by 35%.' }
    ]}
    highlights={[
      'Solar energy integration program',
      'River water quality monitoring',
      'Community garden initiative',
      'Carbon footprint tracking dashboard',
      'Green building certification system'
    ]}
  />
);

export const AgricultureSection: React.FC = () => (
  <DeptSection
    id="agriculture" index={7} title="Agriculture" subtitle="Empowering farmers with smart technology"
    gradient="radial-gradient(ellipse at 50% 50%, rgba(132,204,22,0.1), transparent 60%)"
    icon={Trees} iconColor="from-lime-500 to-green-600"
    stats={[
      { value: '8.2K', label: 'Farmers' }, { value: '₹4.5Cr', label: 'Subsidies' },
      { value: '12', label: 'Smart Farms' }, { value: '34%', label: 'Yield Increase' }
    ]}
    features={[
      { title: 'Crop Intelligence', desc: 'Satellite imagery and AI analysis for crop health monitoring and yield prediction.' },
      { title: 'Market Connect', desc: 'Direct farmer-to-consumer platform eliminating middlemen and ensuring fair prices.' }
    ]}
    highlights={[
      'Automated irrigation scheduling',
      'Soil health monitoring sensors',
      'Weather-based farming advisories',
      'Digital subsidy distribution',
      'Agricultural loan tracking system'
    ]}
  />
);

export const TechnologySection: React.FC = () => (
  <DeptSection
    id="technology" index={8} title="IT & Innovation" subtitle="Building the digital backbone of smart governance"
    gradient="radial-gradient(ellipse at 60% 40%, rgba(6,182,212,0.1), transparent 60%)"
    icon={Cpu} iconColor="from-cyan-500 to-blue-600"
    stats={[
      { value: '99.9%', label: 'Uptime' }, { value: '5G', label: 'Network' },
      { value: '200+', label: 'APIs' }, { value: '12TB', label: 'Data Processed' }
    ]}
    features={[
      { title: 'AI Operations Center', desc: 'Centralized neural hub processing city data with predictive analytics and automated responses.' },
      { title: 'Open Data Platform', desc: 'Public API ecosystem enabling developers to build innovative civic applications.' }
    ]}
    highlights={[
      'Free public Wi-Fi across 16 wards',
      'Blockchain-based document verification',
      'Smart city command center',
      'Citizen mobile app platform',
      'Cybersecurity operations center'
    ]}
  />
);

export const TourismSection: React.FC = () => (
  <DeptSection
    id="tourism" index={9} title="Tourism" subtitle="Showcasing cultural heritage and natural beauty"
    gradient="radial-gradient(ellipse at 40% 50%, rgba(20,184,166,0.1), transparent 60%)"
    icon={Compass} iconColor="from-teal-500 to-cyan-600"
    stats={[
      { value: '2.4L', label: 'Annual Visitors' }, { value: '45', label: 'Heritage Sites' },
      { value: '120+', label: 'Hotels & Resorts' }, { value: '₹8.5Cr', label: 'Revenue' }
    ]}
    features={[
      { title: 'AR Heritage Tours', desc: 'Augmented reality guided tours bringing historical sites to life with 3D reconstructions.' },
      { title: 'Smart Booking', desc: 'Integrated platform for hotels, guides, and transport with AI trip recommendation engine.' }
    ]}
    highlights={[
      'Virtual reality temple experiences',
      'Multilingual tourist assistance AI',
      'Cultural event calendar system',
      'Eco-tourism trail management',
      'Tourist safety monitoring system'
    ]}
  />
);

/* ===== SERVICES SECTION ===== */
export const ServicesSection: React.FC = () => (
  <ScrollSection
    id="services" index={10}
    title="Digital Services"
    subtitle="Access government services from anywhere, anytime"
    gradient="radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.1), transparent 60%)"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { icon: '📄', title: 'Document Portal', desc: 'Birth, death, migration certificates online', stat: '12K+ issued' },
        { icon: '💰', title: 'Tax Payment', desc: 'Property, business, vehicle tax online', stat: '₹2.1Cr collected' },
        { icon: '🏗️', title: 'Building Permits', desc: 'Digital construction approval system', stat: '340 approved' },
        { icon: '📋', title: 'Tender System', desc: 'Transparent e-procurement platform', stat: '89 active' },
        { icon: '🆘', title: 'Emergency', desc: 'One-touch emergency contact system', stat: '< 3min response' },
        { icon: '📊', title: 'Citizen Survey', desc: 'Real-time public opinion platform', stat: '45K responses' },
        { icon: '🎫', title: 'Appointment', desc: 'Book ward office visits online', stat: '2.3K bookings' },
        { icon: '📱', title: 'Mobile App', desc: 'All services in your pocket', stat: '58K downloads' },
      ].map(({ icon, title, desc, stat }, i) => (
        <ScrollCard key={title} delay={0.05 + i * 0.05}>
          <div className="p-6 text-center">
            <div className="text-4xl mb-4">{icon}</div>
            <h4 className="text-sm font-bold text-white mb-2">{title}</h4>
            <p className="text-xs text-white/30 mb-3 leading-relaxed">{desc}</p>
            <span className="text-[11px] font-semibold text-blue-400/60">{stat}</span>
          </div>
        </ScrollCard>
      ))}
    </div>
  </ScrollSection>
);

/* ===== CONTACT SECTION ===== */
export const ContactSection: React.FC = () => (
  <ScrollSection
    id="contact" index={11}
    title="Get in Touch"
    subtitle="We're here to serve you. Reach out anytime."
    gradient="radial-gradient(ellipse at 50% 60%, rgba(59,130,246,0.1), transparent 60%)"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ScrollCard delay={0.1}>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/40 mb-2">Full Name</label>
              <input className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm text-white/40 mb-2">Email</label>
              <input className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm text-white/40 mb-2">Message</label>
              <textarea className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors h-32 resize-none" placeholder="How can we help?" />
            </div>
            <motion.button
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </div>
        </div>
      </ScrollCard>

      <div className="space-y-6">
        <ScrollCard delay={0.2}>
          <div className="p-8">
            <h3 className="text-lg font-bold text-white mb-4">Office Location</h3>
            <div className="space-y-4 text-sm text-white/40">
              <p>📍 Finance Chowk, Butwal, Rupandehi</p>
              <p>📞 071-532805 / 9857045414</p>
              <p>✉️ info@hubit.com.np</p>
              <p>🌐 www.hubit.com.np</p>
            </div>
          </div>
        </ScrollCard>

        <ScrollCard delay={0.3}>
          <div className="p-8">
            <h3 className="text-lg font-bold text-white mb-4">Office Hours</h3>
            <div className="space-y-3 text-sm text-white/40">
              <div className="flex justify-between"><span>Sunday - Thursday</span><span className="text-white/60">10:00 AM - 5:00 PM</span></div>
              <div className="flex justify-between"><span>Friday</span><span className="text-white/60">10:00 AM - 3:00 PM</span></div>
              <div className="flex justify-between"><span>Saturday</span><span className="text-red-400/60">Closed</span></div>
            </div>
          </div>
        </ScrollCard>
      </div>
    </div>
  </ScrollSection>
);

/* ===== FOOTER ===== */
export const ScrollFooter: React.FC = () => (
  <footer className="relative py-20 px-4 md:px-8 border-t border-white/[0.06]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Butwal SmartGov</h2>
              <p className="text-[10px] text-white/30">AI Sub-Metro Portal</p>
            </div>
          </div>
          <p className="text-sm text-white/30 leading-relaxed">
            Official AI-powered digital governance portal serving 150,000+ citizens.
          </p>
        </div>

        {[
          { title: 'Departments', links: ['Health', 'Traffic Safety', 'Education', 'Environment', 'Agriculture', 'IT & Innovation'] },
          { title: 'Quick Links', links: ['Progress Tracker', 'City Events', 'Contact Us', 'Login / Register', 'AI Assistant'] },
          { title: 'Contact', links: ['Finance Chowk, Butwal', '071-532805', 'info@hubit.com.np', 'www.hubit.com.np'] },
        ].map(({ title, links }) => (
          <div key={title}>
            <h3 className="font-semibold text-white mb-4 text-sm">{title}</h3>
            <ul className="space-y-2.5">
              {links.map(link => (
                <li key={link} className="text-sm text-white/30 hover:text-blue-400 cursor-pointer transition-colors">{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
        <p>© 2082 Butwal Sub-Metropolitan City. All rights reserved.</p>
        <p>Powered by <span className="text-blue-400/60 font-medium">HUB IT GROUP Pvt. Ltd.</span></p>
      </div>
    </div>
  </footer>
);
