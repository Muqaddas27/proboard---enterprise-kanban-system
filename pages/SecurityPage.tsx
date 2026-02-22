import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

interface SecurityPageProps {
  onNavigateLanding: () => void;
  onNavigateAbout?: () => void;
  onNavigateFeatures?: () => void;
  onNavigatePricing?: () => void;
  onNavigateSecurity?: () => void;
}

const SecurityPage: React.FC<SecurityPageProps> = ({ onNavigateLanding, onNavigateAbout, onNavigateFeatures, onNavigatePricing, onNavigateSecurity }) => {
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
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h1 className="text-6xl md:text-7xl font-black">Security & Privacy</h1>
              <p className="text-xl text-white/70 font-semibold">Your data protection is our highest priority</p>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: 'End-to-End Encryption',
                  icon: '🔐',
                  items: [
                    'All data encrypted with AES-256 encryption',
                    'TLS 1.3 for all data in transit',
                    'Encryption keys rotated regularly',
                    'Multi-layer encryption architecture'
                  ],
                  color: 'from-green-600/10 to-emerald-600/10 border-green-500/30'
                },
                {
                  title: 'Advanced Authentication',
                  icon: '🔑',
                  items: [
                    'Two-Factor Authentication (2FA) support',
                    'Single Sign-On (SSO) integration',
                    'SAML 2.0 compliance',
                    'OAuth 2.0 support',
                    'Biometric authentication on mobile'
                  ],
                  color: 'from-blue-600/10 to-cyan-600/10 border-blue-500/30'
                },
                {
                  title: 'Compliance & Certifications',
                  icon: '✅',
                  items: [
                    'GDPR compliant (General Data Protection Regulation)',
                    'CCPA compliant (California Consumer Privacy Act)',
                    'SOC 2 Type II certified',
                    'ISO 27001 certified',
                    'HIPAA compliant for healthcare',
                    'PCI DSS Level 1 compliant'
                  ],
                  color: 'from-purple-600/10 to-indigo-600/10 border-purple-500/30'
                },
                {
                  title: 'Secure Infrastructure',
                  icon: '🏗️',
                  items: [
                    'Hosted on AWS with 99.99% uptime SLA',
                    'Distributed data centers for redundancy',
                    'DDoS protection and WAF (Web Application Firewall)',
                    'Regular penetration testing',
                    'Automatic daily backups',
                    'Disaster recovery plan with 1-hour RTO'
                  ],
                  color: 'from-orange-600/10 to-red-600/10 border-orange-500/30'
                },
                {
                  title: 'Access Control',
                  icon: '👤',
                  items: [
                    'Role-based access control (RBAC)',
                    'Granular permission settings',
                    'IP whitelisting for enterprise',
                    'Activity logging and audit trails',
                    'Session management and timeout',
                    'Data access restricted by workspace'
                  ],
                  color: 'from-pink-600/10 to-rose-600/10 border-pink-500/30'
                },
                {
                  title: 'Privacy Commitment',
                  icon: '🛡️',
                  items: [
                    'We never sell your data',
                    'No third-party access without consent',
                    'Full transparency with privacy policy',
                    'Right to delete all personal data',
                    'Data portability support',
                    'Contact our DPO for privacy concerns'
                  ],
                  color: 'from-indigo-600/10 to-violet-600/10 border-indigo-500/30'
                }
              ].map((section, secIdx) => (
                <div 
                  key={secIdx}
                  className={`bg-gradient-to-br ${section.color} rounded-2xl p-8
                    hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:translate-y-[-4px]
                    cursor-pointer group`}
                  style={{ animation: `slideInUp 0.6s ease-out ${secIdx * 0.1}s both` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl group-hover:scale-125 transition-transform block">{section.icon}</div>
                    <h2 className="text-2xl font-black text-white transition-all">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-3 text-white/70 font-medium ml-12">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <span className="text-indigo-400 font-bold group-hover/item:scale-125 transition-transform mt-1">•</span>
                        <span className="group-hover/item:text-white transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
                {[
                  { value: '99.99%', label: 'Uptime SLA', color: 'from-indigo-600/10 border-indigo-500/30 text-indigo-400' },
                  { value: '256-bit', label: 'Encryption', color: 'from-purple-600/10 border-purple-500/30 text-purple-400' },
                  { value: '24/7', label: 'Monitoring', color: 'from-pink-600/10 border-pink-500/30 text-pink-400' },
                  { value: '6', label: 'Certifications', color: 'from-blue-600/10 border-blue-500/30 text-blue-400' }
                ].map((stat, i) => (
                  <div 
                    key={i}
                    className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-6 text-center
                      hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] group`}
                    style={{ animation: `slideInUp 0.6s ease-out ${0.6 + i * 0.08}s both` }}
                  >
                    <div className={`text-3xl font-black mb-2 group-hover:scale-110 transition-transform ${stat.color.split(' ')[2]}`}>
                      {stat.value}
                    </div>
                    <p className="text-white/60 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
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

export default SecurityPage;
