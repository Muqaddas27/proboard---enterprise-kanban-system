import React, { useState } from 'react';

interface FooterProps {
  onNavigateLanding: () => void;
  onNavigateAbout: () => void;
  onNavigateFeatures: () => void;
  onNavigatePricing: () => void;
  onNavigateSecurity: () => void;
}

const Footer: React.FC<FooterProps> = ({
  onNavigateLanding,
  onNavigateAbout,
  onNavigateFeatures,
  onNavigatePricing,
  onNavigateSecurity
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-white/10 py-16 px-6 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-24 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-black mb-2">Stay Updated</h3>
            <p className="text-white/70 font-medium mb-6">Get the latest updates and tips delivered to your inbox</p>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 transition"
              />
              <button
                onClick={handleSubscribe}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/50 active:scale-95"
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">PB</span>
              </div>
              <span className="font-black">ProBoard</span>
            </div>
            <p className="text-white/60 text-sm font-medium">Enterprise-grade project management for modern teams</p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/60 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20v-7.21H5.5V9.25h2.79V7.07c0-2.77 1.69-4.27 4.15-4.27 1.18 0 2.2.09 2.49.13v2.88h-1.71c-1.34 0-1.6.64-1.6 1.57v2.05h3.2l-.41 3.54h-2.79V20"></path>
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7"></path>
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-6 text-white">Product</h4>
            <div className="space-y-3 text-sm">
              <button onClick={onNavigateFeatures} className="text-white/60 hover:text-white transition font-medium block">
                Features
              </button>
              <button onClick={onNavigatePricing} className="text-white/60 hover:text-white transition font-medium block">
                Pricing
              </button>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Integrations
              </a>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Changelog
              </a>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Roadmap
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <div className="space-y-3 text-sm">
              <button onClick={onNavigateAbout} className="text-white/60 hover:text-white transition font-medium block">
                About
              </button>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Blog
              </a>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Careers
              </a>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Press
              </a>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Contact
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-6 text-white">Resources</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Help Center
              </a>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Documentation
              </a>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                API Reference
              </a>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Guides
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-6 text-white">Legal</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Privacy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Terms
              </a>
              <button onClick={onNavigateSecurity} className="text-white/60 hover:text-white transition font-medium block">
                Security
              </button>
              <a href="#" className="text-white/60 hover:text-white transition font-medium block">
                Compliance
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-medium">&copy; 2026 ProBoard. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition">Status</a>
            <a href="#" className="hover:text-white transition">Sitemap</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
