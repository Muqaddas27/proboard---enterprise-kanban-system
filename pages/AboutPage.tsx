import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

interface AboutPageProps {
  onNavigateLanding: () => void;
  onNavigateAbout?: () => void;
  onNavigateFeatures?: () => void;
  onNavigatePricing?: () => void;
  onNavigateSecurity?: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigateLanding, onNavigateAbout, onNavigateFeatures, onNavigatePricing, onNavigateSecurity }) => {
  const team = [
    { name: 'Alex Chen', role: 'CEO & Co-founder', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', color: '#7c3aed', bio: 'Former Google engineer. Built 3 successful startups.' },
    { name: 'Sarah Kim', role: 'CTO & Co-founder', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', color: '#db2777', bio: 'Ex-Amazon principal engineer. AI/ML expert.' },
    { name: 'Marcus Johnson', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&q=80', color: '#0891b2', bio: 'Previously at Figma. Design systems pioneer.' },
    { name: 'Priya Patel', role: 'Head of Growth', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80', color: '#059669', bio: 'Scaled multiple SaaS products to 10K+ users.' },
    { name: 'Tom Rivera', role: 'Head of Engineering', img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&q=80', color: '#d97706', bio: 'Full-stack architect with 15 years experience.' },
    { name: 'Emma Wilson', role: 'Head of Customer Success', img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&q=80', color: '#dc2626', bio: 'Customer-obsessed leader. NPS score champion.' },
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: 'var(--pb-bg)' }}>
      {/* Colorful Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--pb-blob1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--pb-blob2) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--pb-blob3) 0%, transparent 70%)' }} />
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
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=70"
              alt="Team" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, var(--pb-overlay-mid) 0%, var(--pb-overlay-end) 100%)' }} />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-6"
              style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', color: '#6ee7b7' }}>
              Our Story
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              About
              <br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #f472b6, #fb923c)' }}>
                ProBoard
              </span>
            </h1>
            <p className="text-xl text-white/55 max-w-2xl mx-auto leading-relaxed">
              Building the future of team collaboration — one kanban board at a time.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12" style={{ background: 'rgba(139,92,246,0.06)' }}>
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '2024', label: 'Founded', color: '#a78bfa' },
              { value: '10K+', label: 'Active Teams', color: '#f472b6' },
              { value: '50+', label: 'Integrations', color: '#34d399' },
              { value: '99.9%', label: 'Uptime SLA', color: '#fbbf24' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-white/40 text-sm font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Story */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="relative rounded-2xl overflow-hidden group"
              style={{ background: 'rgba(124,58,237,0.1)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
              <div className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(to right, #7c3aed, #db2777)' }} />
              <div className="relative h-52 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80"
                  alt="Mission" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.3), var(--pb-overlay-strong))' }} />
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-black mb-4 text-white">🎯 Our Mission</h2>
                <p className="text-white/60 leading-relaxed">
                  At ProBoard, we believe that great work happens when teams collaborate effortlessly. Our mission is to
                  empower teams of all sizes with intuitive, powerful tools that streamline workflow management and boost
                  productivity — without the complexity of legacy project management software.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden group"
              style={{ background: 'rgba(219,39,119,0.1)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
              <div className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(to right, #db2777, #fb923c)' }} />
              <div className="relative h-52 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&q=80"
                  alt="Story" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(219,39,119,0.3), var(--pb-overlay-strong))' }} />
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-black mb-4 text-white">📖 Our Story</h2>
                <p className="text-white/60 leading-relaxed">
                  Founded in 2024, ProBoard started as a solution to a simple problem: existing project management tools were
                  either too complex or too simplistic. We set out to create something different — a platform that combines the
                  simplicity of kanban with the power of modern AI-driven collaboration features.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black">
              What we{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #f472b6)' }}>
                stand for
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: '🎯', title: 'Simplicity First', color: '#7c3aed',
                img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80',
                desc: 'We believe powerful software does not have to be complicated. Every feature is designed to be intuitive from day one.' },
              { icon: '🤝', title: 'User Focused', color: '#db2777',
                img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80',
                desc: 'Every feature is designed with real team needs in mind. We interview hundreds of users before shipping anything.' },
              { icon: '🔒', title: 'Security First', color: '#0891b2',
                img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80',
                desc: 'Your data privacy and security is our top priority. Bank-level encryption protects everything you create.' },
              { icon: '⚡', title: 'Move Fast', color: '#059669',
                img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
                desc: 'We ship features weekly based on your feedback. Our team operates with startup agility at enterprise scale.' },
              { icon: '🌍', title: 'Global Scale', color: '#d97706',
                img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80',
                desc: '99.9% uptime SLA backed by distributed infrastructure across multiple continents.' },
              { icon: '💡', title: 'Always Innovating', color: '#dc2626',
                img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&q=80',
                desc: 'AI-powered features, smart automation, and integrations keep ProBoard ahead of the curve.' },
            ].map((v, i) => (
              <div key={i} className="rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.05)', boxShadow: '0 8px 24px rgba(0,0,0,0.35)' }}>
                <div className="relative h-36 overflow-hidden">
                  <img src={v.img} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, ${v.color}30, var(--pb-overlay-strong))` }} />
                  <div className="absolute bottom-3 left-4 text-3xl">{v.icon}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-white mb-2" style={{ color: 'white' }}>{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(219,39,119,0.06) 100%)' }} />
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-6"
                style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)', color: '#fbbf24' }}>
                The Team
              </span>
              <h2 className="text-4xl md:text-5xl font-black">
                Meet the people behind{' '}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #fbbf24, #f472b6)' }}>
                  ProBoard
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <div key={i} className="rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.05)', boxShadow: '0 8px 24px rgba(0,0,0,0.35)' }}>
                  <div className="relative h-52 overflow-hidden">
                    <img src={member.img} alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0"
                      style={{ background: `linear-gradient(to bottom, ${member.color}20, var(--pb-overlay-strong))` }} />
                    <div className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: `linear-gradient(to right, ${member.color}, transparent)` }} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-white text-lg">{member.name}</h3>
                    <p className="text-sm font-bold mb-3" style={{ color: member.color }}>{member.role}</p>
                    <p className="text-white/50 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=70" alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.96) 0%, rgba(219,39,119,0.92) 100%)' }} />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Join our team</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              We are a fully remote, diverse team passionate about building great software. We are always hiring.
            </p>
            <button onClick={onNavigateLanding}
              className="px-8 py-3.5 rounded font-bold text-base transition-all active:scale-95"
              style={{ background: '#ffffff', color: '#6d28d9' }}>
              View Open Roles →
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

export default AboutPage;
