import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

interface LandingPageProps {
  onNavigateLogin: () => void;
  onNavigateAbout: () => void;
  onNavigateFeatures: () => void;
  onNavigatePricing: () => void;
  onNavigateSecurity: () => void;
}

// ===================== REDESIGNED LANDING PAGE =====================

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateLogin, onNavigateAbout, onNavigateFeatures, onNavigatePricing, onNavigateSecurity }) => {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Colorful Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 -left-60 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-2/3 left-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 pt-16">
        <Header
          onNavigateLanding={() => {}}
          onNavigateLogin={onNavigateLogin}  
          onNavigateAbout={onNavigateAbout}
          onNavigateFeatures={onNavigateFeatures}
          onNavigatePricing={onNavigatePricing}
          onNavigateSecurity={onNavigateSecurity}
        />

        {/* ===== HERO SECTION ===== */}
        <section className="min-h-screen flex items-center max-w-7xl mx-auto px-6 pt-10 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.4)', color: '#c4b5fd' }}>
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                ⚡ Enterprise Kanban · AI-Powered · Real-time
              </div>
              <h1 className="text-6xl lg:text-7xl font-black leading-[1.05]">
                Work Smarter,
                <br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #f472b6, #fb923c)' }}>
                  Ship Faster.
                </span>
              </h1>
              <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                ProBoard combines beautiful kanban boards, AI task management, and real-time team collaboration — trusted by 10,000+ teams worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={onNavigateLogin}
                  className="px-8 py-4 rounded font-bold text-lg transition-all active:scale-95 text-white"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 20px 60px -10px rgba(124,58,237,0.6)' }}>
                  🚀 Start Free Trial
                </button>
                <button onClick={onNavigatePricing}
                  className="px-8 py-4 rounded font-bold text-lg transition-all border border-white/20 hover:border-white/40 hover:bg-white/10">
                  View Pricing →
                </button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80',
                    'https://images.unsplash.com/photo-1463453091185-61582044d556?w=60&q=80',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&q=80',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="User" className="w-10 h-10 rounded-full object-cover"
                      style={{ border: '2px solid var(--pb-bg)' }} />
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 text-yellow-400 text-sm">★★★★★</div>
                  <p className="text-white/50 text-sm font-medium">Loved by 10,000+ teams</p>
                </div>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-3xl opacity-25"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }} />
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Team collaboration"
                className="relative rounded-2xl w-full object-cover"
                style={{ height: '480px', boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}
              />
              <div className="absolute -top-5 -left-5 px-4 py-3 rounded-xl text-sm font-bold text-white shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 15px 40px rgba(5,150,105,0.5)' }}>
                ✓ 24 Tasks Completed Today
              </div>
              <div className="absolute -bottom-5 -right-5 px-4 py-3 rounded-xl text-sm font-bold text-white shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 15px 40px rgba(124,58,237,0.5)' }}>
                🤖 AI Suggestions Ready
              </div>
            </div>
          </div>
        </section>

        {/* ===== TRUSTED BY ===== */}
        <section className="py-20" style={{ background: 'rgba(139,92,246,0.07)' }}>
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-white/35 font-semibold mb-12 uppercase tracking-widest text-xs">
              Trusted by 10,000+ teams worldwide
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { name: 'Google',    icon: '🔵', accent: '#4285F4', sub: 'Search & Cloud' },
                { name: 'Microsoft', icon: '🟩', accent: '#00A4EF', sub: 'Enterprise' },
                { name: 'Airbnb',   icon: '🏠', accent: '#FF5A5F', sub: 'Travel Tech' },
                { name: 'Spotify',  icon: '🎵', accent: '#1DB954', sub: 'Music & Audio' },
                { name: 'Netflix',  icon: '🎬', accent: '#E50914', sub: 'Streaming' },
                { name: 'Stripe',   icon: '💳', accent: '#635BFF', sub: 'Payments' },
              ].map(brand => (
                <div key={brand.name}
                  className="group flex flex-col items-center justify-center gap-2 py-5 px-3 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.04)', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 30px ${brand.accent}40`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)')}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: brand.accent + '18', border: `1px solid ${brand.accent}33` }}>
                    {brand.icon}
                  </div>
                  <span className="font-black text-sm text-white/70 group-hover:text-white transition-colors">{brand.name}</span>
                  <span className="text-white/25 text-xs group-hover:text-white/45 transition-colors hidden lg:block">{brand.sub}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-8 mt-10 flex-wrap">
              {[
                { value: '10,000+', label: 'Teams', color: '#a78bfa' },
                { value: '50+', label: 'Countries', color: '#f472b6' },
                { value: '4.9★', label: 'Avg Rating', color: '#fbbf24' },
                { value: '99.9%', label: 'Uptime', color: '#34d399' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-white/35 text-xs font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section className="py-28 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
              style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', color: '#67e8f9' }}>
              Everything you need
            </span>
            <h2 className="text-5xl md:text-6xl font-black mt-6 mb-4">
              Built for teams that mean business
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              From simple task tracking to complex enterprise workflows. Scales with your ambitions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { color: '#7c3aed', icon: '📋', title: 'Smart Kanban Boards',
                desc: 'Drag-and-drop simplicity meets enterprise power. Create unlimited boards with custom workflows.',
                img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80' },
              { color: '#db2777', icon: '🤖', title: 'AI-Powered Assistance',
                desc: 'Let AI write task descriptions, suggest priorities, and summarize updates automatically.',
                img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&q=80' },
              { color: '#0891b2', icon: '👥', title: 'Real-time Collaboration',
                desc: 'See changes instantly as your team works. Comments, mentions, and live activity feeds.',
                img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80' },
              { color: '#059669', icon: '📊', title: 'Advanced Analytics',
                desc: 'Track team velocity, cycle time, and burndown charts. Make data-driven decisions.',
                img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80' },
              { color: '#d97706', icon: '🔗', title: '50+ Integrations',
                desc: 'Connect Slack, GitHub, Jira, Google Drive, and 50+ tools you already use.',
                img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80' },
              { color: '#dc2626', icon: '🔒', title: 'Enterprise Security',
                desc: 'SOC 2 certified. AES-256 encryption. SSO. 99.9% uptime SLA for total peace of mind.',
                img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80' },
            ].map((f, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.05)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${f.color}30, rgba(10,6,24,0.7))` }} />
                  <div className="absolute top-4 left-4 text-3xl filter drop-shadow-lg">{f.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black mb-2 text-white">{f.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.desc}</p>
                  <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded"
                    style={{ background: `linear-gradient(to right, ${f.color}, transparent)` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(219,39,119,0.07) 100%)' }} />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
                style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)', color: '#fbbf24' }}>
                How it works
              </span>
              <h2 className="text-5xl md:text-6xl font-black mt-6">
                Up and running in{' '}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #fb923c, #f472b6)' }}>
                  5 minutes
                </span>
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                {[
                  { n: '01', color: '#7c3aed', title: 'Create your workspace',
                    desc: 'Sign up and create your team workspace in seconds. Invite members with a single click.' },
                  { n: '02', color: '#db2777', title: 'Build your boards',
                    desc: 'Start from a template or blank board. Customize columns and workflows to match how you work.' },
                  { n: '03', color: '#0891b2', title: 'Ship with confidence',
                    desc: 'Track progress in real-time, get AI insights, and never miss a deadline again.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-6 group cursor-pointer">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg"
                      style={{ background: step.color, boxShadow: `0 10px 30px ${step.color}60` }}>
                      {step.n}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
                      <p className="text-white/55 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative">
                <div className="absolute inset-0 blur-3xl opacity-20 rounded-3xl"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }} />
                <img
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
                  alt="Dashboard screenshot"
                  className="relative rounded-2xl w-full object-cover"
                  style={{ height: '420px', boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="py-24 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: '10K+', label: 'Active Teams', color: '#a78bfa' },
              { value: '99.9%', label: 'Uptime SLA', color: '#f472b6' },
              { value: '50+', label: 'Integrations', color: '#34d399' },
              { value: '4.9/5', label: 'User Rating', color: '#fbbf24' },
            ].map((s, i) => (
              <div key={i} className="text-center p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}>
                <div className="text-5xl font-black mb-2" style={{ color: s.color }}>{s.value}</div>
                <div className="text-white/50 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(124,58,237,0.07) 100%)' }} />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
                style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', color: '#6ee7b7' }}>
                Customer Love
              </span>
              <h2 className="text-5xl md:text-6xl font-black mt-6">
                Real teams,{' '}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #6ee7b7, #67e8f9)' }}>
                  real results
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Sarah Mitchell', role: 'VP Engineering at TechCorp',
                  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
                  quote: 'ProBoard completely transformed how our 50-person engineering team ships features. Our deployment frequency doubled in the first month.',
                  accent: '#7c3aed' },
                { name: 'James Rodriguez', role: 'Product Manager at StartupXYZ',
                  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
                  quote: 'The AI suggestions save me hours every week. I used to dread writing task descriptions. Now the AI does it and I just review.',
                  accent: '#db2777' },
                { name: 'Lisa Chen', role: 'Design Lead at Creative Agency',
                  img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
                  quote: 'Switching from Jira to ProBoard was the best decision we ever made. Clean UI, powerful features, zero confusion for the team.',
                  accent: '#0891b2' },
              ].map((t, i) => (
                <div key={i} className="p-8 rounded-2xl relative hover:-translate-y-2 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.05)', boxShadow: '0 8px 32px rgba(0,0,0,0.35)' }}>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: `linear-gradient(to right, ${t.accent}, transparent)` }} />
                  <div className="flex gap-1 text-yellow-400 text-sm mb-4">★★★★★</div>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2"
                      style={{ borderColor: t.accent }} />
                    <div>
                      <div className="font-bold text-white text-sm">{t.name}</div>
                      <div className="text-white/40 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SCREENSHOT SHOWCASE ===== */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ background: 'rgba(124,58,237,0.08)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80"
                alt="Analytics" className="w-full object-cover h-64 group-hover:scale-105 transition-transform duration-500" />
              <div className="p-6">
                <div className="text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">Analytics Dashboard</div>
                <h3 className="text-xl font-black text-white mb-2">Track everything that matters</h3>
                <p className="text-white/50 text-sm">Real-time metrics, team velocity, and cycle time analysis in one beautiful dashboard.</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ background: 'rgba(219,39,119,0.08)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80"
                alt="Team collaboration" className="w-full object-cover h-64 group-hover:scale-105 transition-transform duration-500" />
              <div className="p-6">
                <div className="text-pink-400 text-xs font-bold uppercase tracking-wider mb-2">Team Workspace</div>
                <h3 className="text-xl font-black text-white mb-2">Collaborate without the chaos</h3>
                <p className="text-white/50 text-sm">Real-time updates, threaded comments, and @mentions keep everyone in the loop.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=70" alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(76,29,149,0.96) 0%, rgba(131,24,67,0.93) 60%, rgba(8,145,178,0.80) 100%)' }} />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Ready to get started?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Join over 10,000 teams already using ProBoard. Free forever — no credit card required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={onNavigateLogin}
                className="px-8 py-3.5 rounded font-bold text-base transition-all active:scale-95"
                style={{ background: '#ffffff', color: '#6d28d9' }}>
                Start Free Trial →
              </button>
              <button onClick={onNavigateFeatures}
                className="px-8 py-3.5 rounded font-bold text-base text-white transition-all active:scale-95"
                style={{ border: '2px solid rgba(255,255,255,0.75)' }}>
                See All Features
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer
          onNavigateLanding={() => {}}
          onNavigateAbout={onNavigateAbout}
          onNavigateFeatures={onNavigateFeatures}
          onNavigatePricing={onNavigatePricing}
          onNavigateSecurity={onNavigateSecurity}
        />
      </div>
    </div>
  );
};

export default LandingPage;
