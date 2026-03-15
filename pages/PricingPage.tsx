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
      color: '#059669',
      emoji: '🌱',
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
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
      description: 'Ideal for growing teams who need power',
      color: '#7c3aed',
      emoji: '⚡',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80',
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
      description: 'For large organizations with custom needs',
      color: '#0891b2',
      emoji: '🏢',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
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
    <div className="min-h-screen text-white overflow-hidden" style={{ background: 'var(--pb-bg)' }}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full"
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
        <section className="relative overflow-hidden py-28">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=70"
              alt="Pricing" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, var(--pb-overlay-mid) 0%, var(--pb-overlay-end) 100%)' }} />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-6"
              style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)', color: '#fbbf24' }}>
              Simple, Transparent Pricing
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Start Free,
              <br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #fbbf24, #f472b6, #a78bfa)' }}>
                Scale Forever
              </span>
            </h1>
            <p className="text-xl text-white/55 max-w-2xl mx-auto leading-relaxed">
              No hidden fees, no surprises. Pick the plan that fits your team today,
              and upgrade when you're ready to unlock more power.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-3"
                style={{
                  background: plan.recommended
                    ? `linear-gradient(135deg, ${plan.color}35, ${plan.color}18)`
                    : 'rgba(255,255,255,0.04)',
                  boxShadow: plan.recommended
                    ? `0 30px 70px ${plan.color}40`
                    : '0 10px 40px rgba(0,0,0,0.4)',
                  border: 'none'
                }}>
                {plan.recommended && (
                  <div className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: `linear-gradient(to right, ${plan.color}, #db2777)` }} />
                )}
                <div className="relative h-40 overflow-hidden">
                  <img src={plan.img} alt={plan.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${plan.color}40, var(--pb-overlay-strong))` }} />
                  {plan.recommended && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-black text-white"
                      style={{ background: `linear-gradient(135deg, ${plan.color}, #db2777)` }}>
                      ⭐ Most Popular
                    </div>
                  )}
                  <div className="absolute bottom-3 left-4">
                    <div className="text-3xl mb-1">{plan.emoji}</div>
                    <div className="text-xs font-bold text-white/60 uppercase tracking-wider">{plan.description}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-white mb-3">{plan.name}</h3>
                    <div className="text-5xl font-black mb-1" style={{ color: plan.color }}>{plan.price}</div>
                    <div className="text-white/40 text-sm font-medium">{plan.period}</div>
                  </div>
                  <button className="w-full py-3 rounded font-bold transition-all text-sm mb-6 active:scale-95"
                    style={{
                      background: plan.recommended ? `linear-gradient(135deg, ${plan.color}, #db2777)` : 'rgba(255,255,255,0.08)',
                      color: 'white',
                      border: plan.recommended ? 'none' : '1px solid rgba(255,255,255,0.15)'
                    }}>
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started →'}
                  </button>
                  <div className="space-y-2.5 pt-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                          style={{ background: `${plan.color}25`, color: plan.color }}>✓</div>
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compare Plans Banner */}
        <section className="py-16 max-w-5xl mx-auto px-6">
          <div className="rounded-2xl p-10 text-center relative overflow-hidden"
            style={{ background: 'rgba(139,92,246,0.08)', boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="relative">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: '✅', title: 'No credit card required', desc: 'Start your free trial instantly' },
                  { icon: '🔄', title: 'Upgrade anytime', desc: 'Scale as your team grows' },
                  { icon: '❌', title: 'Cancel anytime', desc: 'No lock-in contracts ever' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <div className="font-black text-white mb-1">{item.title}</div>
                    <div className="text-white/50 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-12">
            Got{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #f472b6)' }}>
              questions?
            </span>
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Can I upgrade or downgrade anytime?',
                a: 'Yes! Change your plan anytime. If you upgrade, we will prorate the charge. If you downgrade, we will credit your account.' },
              { q: 'Is there a long-term contract?',
                a: 'No contracts required. Cancel anytime with one click. No questions asked.' },
              { q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and can arrange custom billing for enterprise customers.' },
              { q: 'Do you offer discounts for annual billing?',
                a: 'Yes! Annual plans come with 2 months free when you commit to a yearly subscription.' },
              { q: 'Is my data safe?',
                a: 'Absolutely. We use AES-256 encryption, are SOC 2 Type II certified, and never share your data with third parties.' },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                style={{ background: 'rgba(255,255,255,0.04)', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-black text-white group-hover:text-violet-300 transition-colors">{faq.q}</h3>
                  <span className="text-white/30 text-lg flex-shrink-0">+</span>
                </div>
                <p className="text-white/55 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-12">
            What our customers{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #34d399, #67e8f9)' }}>
              say
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Alex Johnson', role: 'CTO, FinTech Startup', img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80',
                quote: 'We switched from Asana to ProBoard and our team velocity increased by 40%. The pricing is incredibly fair for what you get.',
                accent: '#7c3aed' },
              { name: 'Maria Santos', role: 'Head of Product, E-commerce Co', img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&q=80',
                quote: 'The Professional plan pays for itself within weeks. AI suggestions alone save our team 10+ hours per sprint.',
                accent: '#db2777' },
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-2xl relative"
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
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=70" alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.96) 0%, rgba(8,145,178,0.92) 100%)' }} />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Start free today</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">No credit card required. Upgrade when ready.</p>
            <button onClick={onNavigateLanding}
              className="px-8 py-3.5 rounded font-bold text-base transition-all active:scale-95"
              style={{ background: '#ffffff', color: '#6d28d9' }}>
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

export default PricingPage;