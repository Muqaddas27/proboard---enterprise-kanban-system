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

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateLogin, onNavigateAbout, onNavigateFeatures, onNavigatePricing, onNavigateSecurity }) => {
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

      {/* Content */}
      <div className="relative z-10 pt-16">
        {/* Navigation */}
        <Header
          onNavigateLanding={() => {}}
          onNavigateLogin={onNavigateLogin}
          onNavigateAbout={onNavigateAbout}
          onNavigateFeatures={onNavigateFeatures}
          onNavigatePricing={onNavigatePricing}
          onNavigateSecurity={onNavigateSecurity}
        />

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block animate-pulse">
                  <span className="px-4 py-2 bg-indigo-500/20 border border-indigo-400/50 rounded-full text-sm font-bold text-indigo-300 backdrop-blur-xl">
                    ⚡ Enterprise-Grade Task Management
                  </span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black leading-tight">
                  Organize Work.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    Amplify Impact.
                  </span>
                </h1>
                <p className="text-xl text-white/70 font-semibold leading-relaxed">
                  ProBoard is the modern kanban tool for teams that need to deliver faster. Drag, drop, and dominate your workflow.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onNavigateLogin}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-bold text-lg transition-all shadow-xl shadow-indigo-500/40 active:scale-95 hover:shadow-2xl hover:shadow-indigo-500/60 hover:translate-y-[-2px] flex items-center gap-2 group"
                >
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  </svg>
                  Start Your Free Trial
                </button>
                <button
                  onClick={onNavigatePricing}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg font-bold text-lg transition-all flex items-center gap-2 group backdrop-blur-xl hover:translate-y-[-2px]"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267.232-.074.564-.11.857-.11h.667c.288 0 .658.088.86.26.203.174.38.458.38.920 0 .449-.13.798-.386 1.02-.256.22-.641.35-1.085.35-.857 0-1.554-.535-1.894-1.466zm5.835.75a6 6 0 00-1.015-5.456 6 6 0 00-5.4-2.56 6 6 0 00-5.4 2.56 6 6 0 000 8.912 6 6 0 005.4 2.56 6.002 6.002 0 003.803-1.257l2.905 2.906a1 1 0 001.414-1.414l-2.906-2.905A5.988 5.988 0 0014.268 8.168z" />
                  </svg>
                  View Pricing
                </button>
              </div>

              <div className="flex gap-8 pt-8 border-t border-white/10">
                <div className="space-y-1 group cursor-pointer">
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:scale-110 transition-transform origin-left">99.9%</p>
                  <p className="text-white/60 font-semibold">Uptime SLA</p>
                </div>
                <div className="space-y-1 group cursor-pointer">
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 group-hover:scale-110 transition-transform origin-left">10K+</p>
                  <p className="text-white/60 font-semibold">Active Teams</p>
                </div>
                <div className="space-y-1 group cursor-pointer">
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400 group-hover:scale-110 transition-transform origin-left">50+</p>
                  <p className="text-white/60 font-semibold">Integrations</p>
                </div>
              </div>
            </div>

            {/* Right - Kanban Board Illustration */}
            <div className="relative h-96 flex items-center justify-center">
              {/* Kanban Board Container */}
              <div className="w-full max-w-md bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl p-8 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.8)] border border-slate-600/50 overflow-hidden hover:scale-110 transition-all duration-500 backdrop-blur-2xl">
                {/* Board Header */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-600/50">
                  <div className="flex gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/50" />
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50" />
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/50" />
                  </div>
                  <span className="text-sm font-black text-slate-300 ml-4 tracking-wide">Project Board</span>
                </div>

                {/* Kanban Columns */}
                <div className="flex gap-4 justify-center">
                  {/* Column 1: To Do */}
                  <div className="w-28 space-y-3" style={{ animation: 'float 4s ease-in-out infinite' }}>
                    <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-widest px-2 h-4">To Do</h3>
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-3 h-14 shadow-2xl shadow-indigo-500/50 flex flex-col justify-between border border-indigo-400/30 hover:scale-110 transition-transform">
                      <p className="text-[11px] font-extrabold text-white leading-tight drop-shadow-md">Design</p>
                      <p className="text-[9px] text-indigo-100 leading-tight font-semibold">Homepage</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 h-14 shadow-2xl shadow-purple-500/50 flex flex-col justify-between border border-purple-400/30 hover:scale-110 transition-transform">
                      <p className="text-[11px] font-extrabold text-white leading-tight drop-shadow-md">API Setup</p>
                      <p className="text-[9px] text-purple-100 leading-tight font-semibold">Backend</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 h-14 shadow-2xl shadow-blue-500/40 flex flex-col justify-between opacity-90 border border-blue-400/30 hover:scale-110 transition-transform">
                      <p className="text-[11px] font-extrabold text-white leading-tight drop-shadow-md">Research</p>
                      <p className="text-[9px] text-blue-100 leading-tight font-semibold">Market</p>
                    </div>
                  </div>

                  {/* Column 2: In Progress */}
                  <div className="w-28 space-y-3" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '0.2s' }}>
                    <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-widest px-2 h-4">Progress</h3>
                    <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-3 h-14 shadow-2xl shadow-cyan-500/50 flex flex-col justify-between border border-cyan-400/30 hover:scale-110 transition-transform">
                      <p className="text-[11px] font-extrabold text-white leading-tight drop-shadow-md">Dev</p>
                      <p className="text-[9px] text-cyan-100 leading-tight font-semibold">Frontend</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 h-14 shadow-2xl shadow-blue-500/50 flex flex-col justify-between border border-blue-400/30 hover:scale-110 transition-transform">
                      <p className="text-[11px] font-extrabold text-white leading-tight drop-shadow-md">Database</p>
                      <p className="text-[9px] text-blue-100 leading-tight font-semibold">Schema</p>
                    </div>
                    <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg p-3 h-14 shadow-2xl shadow-sky-500/40 flex flex-col justify-between opacity-90 border border-sky-400/30 hover:scale-110 transition-transform">
                      <p className="text-[11px] font-extrabold text-white leading-tight drop-shadow-md">Testing</p>
                      <p className="text-[9px] text-sky-100 leading-tight font-semibold">QA</p>
                    </div>
                  </div>

                  {/* Column 3: Done */}
                  <div className="w-28 space-y-3" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '0.4s' }}>
                    <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-widest px-2 h-4">Done</h3>
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-3 h-14 shadow-2xl shadow-emerald-500/50 flex flex-col justify-between border border-emerald-400/30 hover:scale-110 transition-transform">
                      <p className="text-[11px] font-extrabold text-white leading-tight drop-shadow-md">Deploy</p>
                      <p className="text-[9px] text-emerald-100 leading-tight font-semibold">v1.0</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 h-14 shadow-2xl shadow-green-500/50 flex flex-col justify-between border border-green-400/30 hover:scale-110 transition-transform">
                      <p className="text-[11px] font-extrabold text-white leading-tight drop-shadow-md">Monitor</p>
                      <p className="text-[9px] text-green-100 leading-tight font-semibold">Live</p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-3 h-14 shadow-2xl shadow-teal-500/40 flex flex-col justify-between opacity-90 border border-teal-400/30 hover:scale-110 transition-transform">
                      <p className="text-[11px] font-extrabold text-white leading-tight drop-shadow-md">Feedback</p>
                      <p className="text-[9px] text-teal-100 leading-tight font-semibold">Review</p>
                    </div>
                  </div>
                </div>

                {/* Animation styles */}
                <style>{`
                  @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                  }
                `}</style>
              </div>

              {/* Floating Feature Badges */}
              <div className="absolute -top-16 right-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg px-6 py-3 text-white font-black shadow-[0_20px_70px_-15px_rgba(99,102,241,0.8)] animate-bounce text-base whitespace-nowrap border-2 border-white/30 backdrop-blur-md">
                ✨ AI Powered
              </div>
              <div className="absolute -bottom-16 left-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg px-6 py-3 text-white font-black shadow-[0_20px_70px_-15px_rgba(236,72,153,0.8)] animate-bounce text-base whitespace-nowrap border-2 border-white/30 backdrop-blur-md" style={{ animationDelay: '0.3s' }}>
                🚀 Lightning Fast
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-black">What makes ProBoard different</h2>
            <p className="text-xl text-white/60 font-semibold">Everything you need to manage projects like a pro</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📋',
                title: 'Smart Kanban',
                description: 'Intuitive drag-and-drop interface with powerful filtering and sorting',
                gradient: 'from-indigo-600/20 to-indigo-600/5',
                borderColor: 'indigo'
              },
              {
                icon: '🤖',
                title: 'AI-Powered',
                description: 'Auto-generate descriptions and get smart task suggestions',
                gradient: 'from-purple-600/20 to-purple-600/5',
                borderColor: 'purple'
              },
              {
                icon: '👥',
                title: 'Team First',
                description: 'Real-time collaboration, comments, and team management',
                gradient: 'from-pink-600/20 to-pink-600/5',
                borderColor: 'pink'
              },
              {
                icon: '📅',
                title: 'Smart Scheduling',
                description: 'Due dates, milestones, and timeline visualization',
                gradient: 'from-blue-600/20 to-blue-600/5',
                borderColor: 'blue'
              },
              {
                icon: '📊',
                title: 'Rich Analytics',
                description: 'Track productivity and visualize team performance metrics',
                gradient: 'from-green-600/20 to-green-600/5',
                borderColor: 'green'
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                description: 'Bank-level encryption and compliance with all standards',
                gradient: 'from-orange-600/20 to-orange-600/5',
                borderColor: 'orange'
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className={`p-10 bg-gradient-to-br ${feature.gradient} border border-white/20 rounded-3xl
                  hover:border-white/40 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 
                  transition-all duration-500 group cursor-pointer hover:shadow-[0_25px_80px_-15px_rgba(99,102,241,0.4)]
                  hover:translate-y-[-8px] backdrop-blur-xl hover:scale-105 relative overflow-hidden`}
                style={{ animation: `slideIn 0.5s ease-out ${idx * 0.1}s both` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
                <div className="text-6xl mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 block drop-shadow-2xl relative">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-white transition-all duration-500 relative drop-shadow-lg">
                  {feature.title}
                </h3>
                <p className="text-white/70 font-semibold text-base leading-relaxed group-hover:text-white transition-colors relative">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 group-hover:blur-3xl transition-all" />
            <div className="relative bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/30 rounded-3xl backdrop-blur-xl group-hover:border-indigo-500/50 transition-all p-16 text-center space-y-8">
              <h2 className="text-5xl md:text-6xl font-black leading-tight">Ready to transform your workflow?</h2>
              <p className="text-xl text-white/70 font-semibold max-w-2xl mx-auto">
                Join thousands of teams that have already revolutionized their productivity with ProBoard
              </p>
              <button
                onClick={onNavigateLogin}
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                  rounded-lg font-bold text-lg transition-all shadow-2xl shadow-indigo-500/50 active:scale-95 
                  hover:shadow-2xl hover:shadow-indigo-500/70 hover:translate-y-[-2px] inline-block"
              >
                Start Free — No credit card required
              </button>
              <p className="text-white/40 text-sm font-medium">14-day free trial. Cancel anytime.</p>
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
