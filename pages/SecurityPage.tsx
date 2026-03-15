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
  const features = [
    {
      icon: '🔐', title: 'End-to-End Encryption', color: '#059669',
      img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80',
      items: ['AES-256 encryption at rest', 'TLS 1.3 for data in transit', 'Encryption keys rotated regularly', 'Multi-layer encryption architecture'],
    },
    {
      icon: '🔑', title: 'Advanced Authentication', color: '#0891b2',
      img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
      items: ['Two-Factor Authentication (2FA)', 'Single Sign-On (SSO) integration', 'SAML 2.0 & OAuth 2.0 support', 'Biometric authentication on mobile'],
    },
    {
      icon: '✅', title: 'Compliance & Certifications', color: '#7c3aed',
      img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
      items: ['GDPR & CCPA compliant', 'SOC 2 Type II certified', 'ISO 27001 certified', 'HIPAA & PCI DSS Level 1 compliant'],
    },
    {
      icon: '🏗️', title: 'Secure Infrastructure', color: '#d97706',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
      items: ['AWS-hosted, 99.99% uptime SLA', 'Distributed global data centers', 'DDoS protection & WAF', 'Automatic daily backups + 1h RTO'],
    },
    {
      icon: '👤', title: 'Access Control', color: '#db2777',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
      items: ['Role-based access control (RBAC)', 'Granular permission settings', 'IP whitelisting for enterprise', 'Activity logs & audit trails'],
    },
    {
      icon: '🛡️', title: 'Privacy Commitment', color: '#dc2626',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
      items: ['We never sell your data', 'No third-party access without consent', 'Full data portability support', 'Right to delete all personal data'],
    },
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: 'var(--pb-bg)' }}>
      {/* Colorful Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--pb-blob3) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--pb-blob3) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--pb-blob1) 0%, transparent 70%)' }} />
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
        <section className="relative overflow-hidden py-28">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1600&q=70"
              alt="Security" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, var(--pb-overlay-mid) 0%, var(--pb-overlay-end) 100%)' }} />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-6"
              style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', color: '#6ee7b7' }}>
              Enterprise Grade
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Security &
              <br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #34d399, #06b6d4, #818cf8)' }}>
                Privacy
              </span>
            </h1>
            <p className="text-xl text-white/55 max-w-2xl mx-auto leading-relaxed">
              Your data protection is our highest priority. Bank-level security built into every layer of ProBoard.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="py-12" style={{ background: 'rgba(52,211,153,0.06)' }}>
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '99.99%', label: 'Uptime SLA', color: '#34d399' },
              { value: '256-bit', label: 'Encryption', color: '#818cf8' },
              { value: '24/7', label: 'Monitoring', color: '#38bdf8' },
              { value: '6+', label: 'Certifications', color: '#fbbf24' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-white/40 text-sm font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black">
              Security you can{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #34d399, #06b6d4)' }}>
                trust
              </span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">Every feature built with security by design, not as an afterthought.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.05)', boxShadow: '0 8px 24px rgba(0,0,0,0.35)' }}>
                <div className="relative h-40 overflow-hidden">
                  <img src={f.img} alt={f.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, ${f.color}30, var(--pb-overlay-strong))` }} />
                  <div className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: `linear-gradient(to right, ${f.color}, transparent)` }} />
                  <div className="absolute bottom-4 left-4 text-3xl">{f.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-white text-lg mb-3">{f.title}</h3>
                  <ul className="space-y-2">
                    {f.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-white/55 text-sm">
                        <span className="font-bold mt-0.5" style={{ color: f.color }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.06) 0%, rgba(8,145,178,0.06) 100%)' }} />
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black">Trusted certifications</h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'PCI DSS', 'CCPA'].map((cert, i) => (
                <div key={i} className="rounded-xl py-4 px-3 text-center font-bold text-sm transition-all hover:-translate-y-1"
                  style={{ background: 'rgba(163,230,53,0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', color: '#a3e635' }}>
                  ✅<br />{cert}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1600&q=70" alt="" className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.97) 0%, rgba(8,145,178,0.93) 100%)' }} />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Start building securely</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Join 10,000+ teams who trust ProBoard with their mission-critical workflows.
            </p>
            <button onClick={onNavigateLanding}
              className="px-8 py-3.5 rounded font-bold text-base transition-all active:scale-95"
              style={{ background: '#ffffff', color: '#065f46' }}>
              Get Started Free →
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

export default SecurityPage;