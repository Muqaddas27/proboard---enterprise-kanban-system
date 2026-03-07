import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

interface PricingPageProps {
  onNavigateLanding: () => void;
  onNavigateAbout?: () => void;
  onNavigateFeatures?: () => void;
  onNavigatePricing?: () => void;
  onNavigateSecurity?: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onNavigateLanding, onNavigateAbout, onNavigateFeatures, onNavigatePricing, onNavigateSecurity }) => {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'Forever Free',
      description: 'Perfect for individuals and small projects',
      features: [
        '2 Boards',
        '5 Team Members',
        '50 Cards per Board',
        'Basic Comments',
        'Email Support',
        'Mobile App Access'
      ],
      recommended: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'Per month',
      description: 'Ideal for growing teams',
      features: [
        'Unlimited Boards',
        '50 Team Members',
        'Unlimited Cards',
        'Advanced Comments & Mentions',
        'AI Suggestions',
        'Priority Email Support',
        'Advanced Analytics',
        'Board Templates',
        'Webhooks & Integrations',
        'Custom Branding'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'Contact us',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Unlimited Everything',
        'Dedicated Account Manager',
        'SSO & SAML',
        'Advanced Security',
        '24/7 Priority Support',
        'Custom Integrations',
        'Data Backup & Recovery',
        'Advanced Permissions',
        'SLA Guarantee'
      ],
      recommended: false
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
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h1 className="text-6xl md:text-7xl font-black">Simple, Transparent Pricing</h1>
              <p className="text-xl text-white/70 font-semibold">Start free. Scale as you grow.</p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 py-12 mt-8">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg p-6 border-2 transition-all duration-500 cursor-pointer backdrop-blur-xl relative ${
                    plan.recommended 
                      ? 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-400/50 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.5)]'
                      : 'bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/50'
                  }`}
                  style={{ animation: `priceSlideIn 0.6s ease-out ${index * 0.1}s both` }}
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-xl shadow-indigo-500/50 border-2 border-white/30 backdrop-blur-md">
                      ⭐ MOST POPULAR
                    </div>
                  )}
                  
                  <div className="space-y-5 relative">
                    <div className="text-center space-y-1">
                      <h3 className="text-2xl font-black text-white transition-all duration-500">
                        {plan.name}
                      </h3>
                      <p className="text-white/60 font-medium text-xs">{plan.description}</p>
                    </div>

                    <div className="text-center py-3">
                      <div className="text-4xl font-black text-white mb-1">{plan.price}</div>
                      <div className="text-white/50 font-semibold text-xs">{plan.period}</div>
                    </div>

                    <button className={`w-full py-3 rounded-lg font-bold transition-all text-sm shadow-lg ${
                      plan.recommended
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/50'
                        : 'bg-white/5 text-white border-2 border-white/20'
                    }`}>
                      Get Started
                    </button>

                    <div className="space-y-2.5 pt-4 border-t border-white/10">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium text-xs text-white/80 leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto space-y-6 py-12">
              <h2 className="text-4xl font-black text-center mb-12">Frequently Asked Questions</h2>
              
              {[
                {
                  q: "Can I upgrade or downgrade anytime?",
                  a: "Yes! Change your plan anytime. If you upgrade, we'll prorate the charge. If you downgrade, we'll credit your account."
                },
                {
                  q: "Is there a long-term contract?",
                  a: "No contracts required. Cancel anytime with one click. No questions asked."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, PayPal, and can arrange custom billing for enterprise customers."
                },
                {
                  q: "Do you offer discounts for annual billing?",
                  a: "Yes! Annual plans come with 2 months free when you commit to a yearly subscription."
                }
              ].map((faq, i) => (
                <div 
                  key={i} 
                  className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/40 rounded-3xl p-10 
                    hover:shadow-[0_25px_80px_-15px_rgba(99,102,241,0.4)] transition-all duration-500 group cursor-pointer
                    hover:border-indigo-400/70 hover:translate-y-[-4px] backdrop-blur-xl hover:scale-105 relative overflow-hidden"
                  style={{ animation: `faqSlideIn 0.6s ease-out ${i * 0.1 + 0.3}s both` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
                  <h3 className="font-black text-xl mb-4 text-white transition-all duration-500 relative drop-shadow-lg">{faq.q}</h3>
                  <p className="text-white/80 font-semibold text-base group-hover:text-white transition-colors leading-relaxed relative">{faq.a}</p>
                </div>
              ))}
            </div>

            <style>{`
              @keyframes priceSlideIn {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes faqSlideIn {
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

export default PricingPage;
