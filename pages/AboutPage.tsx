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
              <h1 className="text-6xl md:text-7xl font-black">About ProBoard</h1>
              <p className="text-xl text-white/70 font-semibold">Building the future of team collaboration</p>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/30 rounded-lg p-8 
                hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:translate-y-[-4px]
                hover:border-indigo-500/50 hover:bg-gradient-to-br hover:from-indigo-600/20 hover:to-purple-600/20"
                style={{ animation: 'slideInUp 0.6s ease-out 0s both' }}
              >
                <h2 className="text-3xl font-black mb-4 text-white">Our Mission</h2>
                <p className="text-white/70 font-medium leading-relaxed">
                  At ProBoard, we believe that great work happens when teams collaborate effortlessly. Our mission is to empower teams of all sizes with intuitive, powerful tools that streamline workflow management and boost productivity.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-lg p-8
                hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:translate-y-[-4px]
                hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-pink-600/20"
                style={{ animation: 'slideInUp 0.6s ease-out 0.1s both' }}
              >
                <h2 className="text-3xl font-black mb-4 text-white">Our Story</h2>
                <p className="text-white/70 font-medium leading-relaxed">
                  Founded in 2024, ProBoard started as a solution to a simple problem: existing project management tools were either too complex or too simplistic. We set out to create something different—a platform that combines the simplicity of kanban with the power of modern collaboration features.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { value: '10K+', label: 'Active Teams', gradient: 'from-indigo-600/10 border-indigo-500/30' },
                  { value: '50+', label: 'Integrations', gradient: 'from-purple-600/10 border-purple-500/30' },
                  { value: '99.9%', label: 'Uptime', gradient: 'from-pink-600/10 border-pink-500/30' }
                ].map((stat, i) => (
                  <div 
                    key={i}
                    className={`bg-gradient-to-br ${stat.gradient} border rounded-lg p-8 text-center
                      hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:translate-y-[-4px]`}
                    style={{ animation: `slideInUp 0.6s ease-out ${0.2 + i * 0.1}s both` }}
                  >
                    <div className="text-4xl font-black mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <p className="text-white/60 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-lg p-8
                hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:translate-y-[-4px]
                hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-blue-600/20 hover:to-cyan-600/20"
                style={{ animation: 'slideInUp 0.6s ease-out 0.5s both' }}
              >
                <h2 className="text-3xl font-black mb-6 text-white">Our Values</h2>
                <div className="space-y-4">
                  {[
                    { icon: '🎯', title: 'Simplicity First', desc: 'We believe powerful software doesn\'t have to be complicated' },
                    { icon: '🤝', title: 'User Focused', desc: 'Every feature is designed with real team needs in mind' },
                    { icon: '🔒', title: 'Security First', desc: 'Your data privacy and security is our top priority' }
                  ].map((val, i) => (
                    <div key={i} className="flex gap-4 group hover:translate-x-2 transition-transform">
                      <div className="text-3xl group-hover:scale-125 transition-transform">{val.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-white transition-all">{val.title}</h3>
                        <p className="text-white/60 font-medium group-hover:text-white/80 transition-colors">{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
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

export default AboutPage;
