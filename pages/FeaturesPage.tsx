import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

interface FeaturesPageProps {
  onNavigateLanding: () => void;
  onNavigateLogin?: () => void;
  onNavigateAbout?: () => void;
  onNavigateFeatures?: () => void;
  onNavigatePricing?: () => void;
  onNavigateSecurity?: () => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigateLanding, onNavigateLogin, onNavigateAbout, onNavigateFeatures, onNavigatePricing, onNavigateSecurity }) => {
  const features = [
    {
      icon: '�', color: '#7c3aed',
      title: 'Smart Kanban Boards',
      description: 'Organize tasks with our intuitive drag-and-drop kanban boards. Create unlimited boards with custom column workflows that match exactly how your team works.',
      details: ['Customizable columns & swimlanes', 'Multiple board views', 'Rich template library', 'Board-level automation rules', 'Card aging & WIP limits', 'Quick filters & bulk actions'],
      img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&q=80'
    },
    {
      icon: '🤖', color: '#db2777',
      title: 'AI-Powered Assistance',
      description: 'Harness the power of advanced AI to supercharge your productivity. Let AI handle the tedious documentation while you focus on building great things.',
      details: ['Auto-description generation', 'Smart priority scoring', 'Deadline risk detection', 'Content enhancement', 'Meeting summaries', 'Predictive task completion'],
      img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80'
    },
    {
      icon: '👥', color: '#0891b2',
      title: 'Team Collaboration',
      description: 'Bring your team together with powerful real-time collaboration features. Everyone stays aligned and in sync, always.',
      details: ['Rich text comments & threads', '@mentions & notifications', 'Activity feed & history', 'Guest access controls', 'Team workspaces', 'Video call integration'],
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80'
    },
    {
      icon: '📅', color: '#059669',
      title: 'Smart Scheduling',
      description: 'Never miss a deadline again with intelligent scheduling tools that keep every project on track and every team member informed.',
      details: ['Timeline/Gantt view', 'Calendar integration', 'Recurring task templates', 'Automated reminders', 'Dependency tracking', 'Milestone management'],
      img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=700&q=80'
    },
    {
      icon: '📈', color: '#d97706',
      title: 'Analytics & Insights',
      description: 'Gain deep insights into team performance with comprehensive analytics that help you optimize workflows and continuously improve.',
      details: ['Velocity tracking', 'Cycle time analysis', 'Burndown charts', 'Custom dashboards', 'Team performance reports', 'Export to CSV/PDF'],
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80'
    },
    {
      icon: '🔒', color: '#dc2626',
      title: 'Enterprise Security',
      description: 'Bank-level security infrastructure protects your data with multiple layers of encryption and granular access controls.',
      details: ['AES-256 data encryption', 'SSO & SAML authentication', 'Role-based permissions', 'Audit logs & compliance', 'SOC 2 Type II certified', '99.9% uptime SLA'],
      img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=80'
    },
    {
      icon: '🔗', color: '#7c3aed',
      title: 'Power Integrations',
      description: 'Connect ProBoard with the tools you already love. Our integration library covers everything from communication to code deployment.',
      details: ['Slack & Teams', 'GitHub & GitLab', 'Google Workspace', 'Jira migration', 'Zapier & Make', 'REST API + Webhooks'],
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80'
    },
    {
      icon: '📱', color: '#db2777',
      title: 'Mobile Access',
      description: 'Manage your projects from anywhere with our feature-packed mobile apps for iOS and Android. Full functionality on the go.',
      details: ['Native iOS app', 'Native Android app', 'Offline mode', 'Push notifications', 'Biometric auth', 'Responsive web app'],
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80'
    }
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: 'var(--pb-bg)' }}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 pt-16">
        <Header
          onNavigateLanding={onNavigateLanding}
          onNavigateLogin={onNavigateLanding}
          onNavigateAbout={onNavigateAbout}
          onNavigateFeatures={onNavigateFeatures}
          onNavigatePricing={onNavigatePricing}
          onNavigateSecurity={onNavigateSecurity}
        />

        {/* Hero */}
        <section className="relative overflow-hidden py-32">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=70"
              alt="Office" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(10,6,24,0.4) 0%, var(--pb-overlay-end) 100%)' }} />
          </div>
          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-6"
              style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)', color: '#c4b5fd' }}>
              Powerful Feature Suite
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Everything Your
              <br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #f472b6, #fb923c)' }}>
                Team Needs
              </span>
            </h1>
            <p className="text-xl text-white/55 max-w-3xl mx-auto leading-relaxed">
              From simple task tracking to complex enterprise workflows, ProBoard scales with your ambitions.
              Explore the features that 10,000+ teams rely on every day.
            </p>
          </div>
        </section>

        {/* Feature Stats Bar */}
        <section className="py-12" style={{ background: 'rgba(139,92,246,0.06)' }}>
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '50+', label: 'Integrations', color: '#a78bfa' },
              { value: '8', label: 'Core Features', color: '#f472b6' },
              { value: '10K+', label: 'Teams Using', color: '#34d399' },
              { value: '99.9%', label: 'Uptime', color: '#fbbf24' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-white/40 text-sm font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features - Alternating Layout */}
        <section className="max-w-7xl mx-auto px-6 py-20 space-y-28">
          {features.map((feature, idx) => (
            <div key={idx}
              className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? 'direction-rtl' : ''}`}>
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
                  style={{ background: `${feature.color}20`, color: feature.color }}>
                  <span>{feature.icon}</span>
                  Feature {String(idx + 1).padStart(2, '0')}
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">{feature.title}</h2>
                <p className="text-white/55 text-lg leading-relaxed mb-8">{feature.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {feature.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{ background: `${feature.color}25`, color: feature.color }}>✓</div>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
              <div className={`relative ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="absolute inset-0 rounded-2xl blur-3xl opacity-20"
                  style={{ background: feature.color }} />
                <img src={feature.img} alt={feature.title}
                  className="relative rounded-2xl w-full object-cover"
                  style={{ height: '380px', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }} />
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=70" alt="" className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.96) 0%, rgba(219,39,119,0.92) 100%)' }} />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Ready to experience ProBoard?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Start your free trial and experience all features firsthand. No credit card needed.</p>
            <button onClick={onNavigateLanding}
              className="px-8 py-3.5 rounded font-bold text-base transition-all active:scale-95"
              style={{ background: '#ffffff', color: '#6d28d9' }}>
              Start Free Trial →
            </button>
          </div>
        </section>

        <Footer
          onNavigateLanding={onNavigateLanding}
          onNavigateAbout={onNavigateAbout}
          onNavigateFeatures={onNavigateFeatures}
          onNavigatePricing={onNavigatePricing}
          onNavigateSecurity={onNavigateSecurity}
        />
      </div>
    </div>
  );
};

export default FeaturesPage;