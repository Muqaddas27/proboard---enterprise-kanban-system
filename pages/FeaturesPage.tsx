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
      icon: '📊',
      title: 'Smart Kanban',
      description: 'Organize tasks with intuitive drag-and-drop boards. Customize columns and workflows to match your process.',
      details: ['Customizable columns', 'Multiple boards', 'Template library', 'Board automation']
    },
    {
      icon: '🤖',
      title: 'AI-Powered Suggestions',
      description: 'Get intelligent task descriptions and summaries powered by advanced AI. Save time on documentation.',
      details: ['Auto-description generation', 'Smart task categorization', 'Priority suggestions', 'Content enhancement']
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Work together seamlessly with built-in comments, mentions, and real-time notifications.',
      details: ['Comments & threads', 'Team mentions', 'Activity tracking', 'Real-time updates']
    },
    {
      icon: '📅',
      title: 'Smart Scheduling',
      description: 'Set due dates, track deadlines, and never miss important milestones with automated reminders.',
      details: ['Due date management', 'Calendar view', 'Recurring tasks', 'Deadline alerts']
    },
    {
      icon: '📈',
      title: 'Analytics & Insights',
      description: 'Gain actionable insights into team productivity with comprehensive analytics and reporting.',
      details: ['Productivity metrics', 'Team velocity', 'Cycle time tracking', 'Progress reports']
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption, SSO, and compliance with industry standards.',
      details: ['End-to-end encryption', 'SSO integration', 'GDPR compliance', 'Regular audits']
    },
    {
      icon: '🔗',
      title: 'Integrations',
      description: 'Connect with 50+ popular tools and services to streamline your workflow.',
      details: ['Slack integration', 'GitHub sync', 'Calendar sync', 'Webhook support']
    },
    {
      icon: '📱',
      title: 'Mobile Access',
      description: 'Manage projects on the go with our feature-rich mobile app for iOS and Android.',
      details: ['iOS app', 'Android app', 'Offline access', 'Push notifications']
    }
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Enhanced Background with Pattern */}
      <div className="fixed inset-0">
        {/* Professional Navy/Slate Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 to-slate-950/40" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(148, 163, 184, .05) 25%, rgba(148, 163, 184, .05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, .05) 75%, rgba(148, 163, 184, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(148, 163, 184, .05) 25%, rgba(148, 163, 184, .05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, .05) 75%, rgba(148, 163, 184, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '60px 60px'
        }} />
        
        {/* Subtle Professional Accent Glows */}
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-slate-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-16">
        {/* Navigation */}
        <Header
          onNavigateLanding={onNavigateLanding}
          onNavigateLogin={onNavigateLanding}
          onNavigateAbout={onNavigateAbout}
          onNavigateFeatures={onNavigateFeatures}
          onNavigatePricing={onNavigatePricing}
          onNavigateSecurity={onNavigateSecurity}
        />

        {/* Content */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h1 className="text-6xl md:text-7xl font-black leading-tight">Powerful Features</h1>
              <p className="text-xl text-white/70 font-semibold max-w-2xl mx-auto">Everything you need to manage projects like a pro</p>
            </div>

            {/* Features Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/40 rounded-3xl p-10 
                    hover:shadow-[0_25px_80px_-15px_rgba(99,102,241,0.4)] transition-all duration-500 group cursor-pointer
                    hover:border-indigo-400/70 hover:translate-y-[-8px] hover:bg-gradient-to-br hover:from-indigo-600/25 hover:to-purple-600/25 backdrop-blur-xl hover:scale-105 relative overflow-hidden"
                  style={{ animation: `slideInUp 0.5s ease-out ${index * 0.1}s both` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
                  <div className="flex items-start gap-5 mb-8 relative">
                    <span className="text-7xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 block drop-shadow-2xl">{feature.icon}</span>
                    <div>
                      <h3 className="text-3xl font-black text-white transition-all duration-500 drop-shadow-lg">{feature.title}</h3>
                    </div>
                  </div>
                  <p className="text-white/80 font-semibold mb-8 group-hover:text-white transition-colors text-lg leading-relaxed relative">{feature.description}</p>
                  <div className="flex flex-wrap gap-3 relative">
                    {feature.details.map((detail, i) => (
                      <span key={i} className="text-sm font-extrabold bg-gradient-to-r from-indigo-500/40 to-purple-500/40 text-indigo-100 px-4 py-2.5 rounded-lg 
                        group-hover:from-indigo-500/60 group-hover:to-purple-500/60 group-hover:text-white transition-all duration-300 border border-indigo-400/30 group-hover:border-indigo-300/50 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <style>{`
              @keyframes slideInUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>

            {/* CTA */}
            <div className="text-center py-12 mt-8">
              <button onClick={onNavigateLogin} className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg 
                font-bold text-lg transition-all shadow-xl shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/70 hover:translate-y-[-2px]
                active:scale-95 inline-block group">
                <span className="flex items-center gap-2">
                  Get Started Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
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
