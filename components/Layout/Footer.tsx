import React from 'react';

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
  return (
    <footer className="relative pt-16 pb-10 px-6" style={{ background: 'rgba(5,2,15,0.6)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Links Grid */}
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-xs"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777, #f97316)' }}>PB</div>
              <span className="font-black text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #f472b6)' }}>ProBoard</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5">Enterprise kanban for modern teams. Ship faster together.</p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20v-7.21H5.5V9.25h2.79V7.07c0-2.77 1.69-4.27 4.15-4.27 1.18 0 2.2.09 2.49.13v2.88h-1.71c-1.34 0-1.6.64-1.6 1.57v2.05h3.2l-.41 3.54h-2.79V20"></path>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4 text-white/80 text-sm uppercase tracking-wider">Product</h4>
            <div className="space-y-3 text-sm">
              <button onClick={onNavigateFeatures} className="text-white/45 hover:text-white transition block">Features</button>
              <button onClick={onNavigatePricing} className="text-white/45 hover:text-white transition block">Pricing</button>
              <a href="#" className="text-white/45 hover:text-white transition block">Integrations</a>
              <a href="#" className="text-white/45 hover:text-white transition block">Changelog</a>
              <a href="#" className="text-white/45 hover:text-white transition block">Roadmap</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-white/80 text-sm uppercase tracking-wider">Company</h4>
            <div className="space-y-3 text-sm">
              <button onClick={onNavigateAbout} className="text-white/45 hover:text-white transition block">About</button>
              <a href="#" className="text-white/45 hover:text-white transition block">Blog</a>
              <a href="#" className="text-white/45 hover:text-white transition block">Careers</a>
              <a href="#" className="text-white/45 hover:text-white transition block">Press</a>
              <a href="#" className="text-white/45 hover:text-white transition block">Contact</a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4 text-white/80 text-sm uppercase tracking-wider">Resources</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="text-white/45 hover:text-white transition block">Help Center</a>
              <a href="#" className="text-white/45 hover:text-white transition block">Documentation</a>
              <a href="#" className="text-white/45 hover:text-white transition block">API Reference</a>
              <a href="#" className="text-white/45 hover:text-white transition block">Guides</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-white/80 text-sm uppercase tracking-wider">Legal</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="text-white/45 hover:text-white transition block">Privacy</a>
              <a href="#" className="text-white/45 hover:text-white transition block">Terms</a>
              <button onClick={onNavigateSecurity} className="text-white/45 hover:text-white transition block">Security</button>
              <a href="#" className="text-white/45 hover:text-white transition block">Compliance</a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">&copy; 2026 ProBoard. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/70 transition">Status</a>
            <a href="#" className="hover:text-white/70 transition">Sitemap</a>
            <a href="#" className="hover:text-white/70 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
