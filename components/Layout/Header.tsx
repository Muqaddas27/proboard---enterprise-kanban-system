import React, { useState } from 'react';

interface HeaderProps {
  onNavigateLanding: () => void;
  onNavigateLogin?: () => void;
  onNavigateAbout?: () => void;
  onNavigateFeatures?: () => void;
  onNavigatePricing?: () => void;
  onNavigateSecurity?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onNavigateLanding,
  onNavigateLogin,
  onNavigateAbout,
  onNavigateFeatures,
  onNavigatePricing,
  onNavigateSecurity
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{ background: 'rgba(10,6,24,0.92)', backdropFilter: 'blur(20px)' }}
      className="px-6 py-3 fixed top-0 left-0 right-0 z-[100]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button onClick={onNavigateLanding} className="flex items-center gap-3 hover:opacity-90 transition group">
          <div className="w-10 h-10 rounded flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777, #f97316)' }}>
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="font-black text-xl text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #f472b6)' }}>ProBoard</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', onClick: onNavigateLanding },
            { label: 'Features', onClick: onNavigateFeatures },
            { label: 'Pricing', onClick: onNavigatePricing },
            { label: 'Security', onClick: onNavigateSecurity },
            { label: 'About', onClick: onNavigateAbout },
          ].map(link => (
            <button key={link.label} onClick={link.onClick}
              className="text-white/60 hover:text-white font-semibold transition-all text-sm relative group py-1">
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded"
                style={{ background: 'linear-gradient(to right, #a78bfa, #f472b6)' }} />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button onClick={onNavigateLogin}
            className="px-4 py-2 text-white/60 hover:text-white font-semibold text-sm transition hidden md:block">
            Sign In
          </button>
          <button onClick={onNavigateLogin}
            className="px-5 py-2.5 rounded font-bold text-sm transition-all active:scale-95 text-white"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 8px 25px rgba(124,58,237,0.4)' }}>
            Get Started Free
          </button>
          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/70 hover:text-white p-2">
            <div className="w-5 h-0.5 bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 pb-4 pt-4">
          {[
            { label: 'Home', onClick: onNavigateLanding },
            { label: 'Features', onClick: onNavigateFeatures },
            { label: 'Pricing', onClick: onNavigatePricing },
            { label: 'Security', onClick: onNavigateSecurity },
            { label: 'About', onClick: onNavigateAbout },
          ].map(link => (
            <button key={link.label} onClick={() => { link.onClick?.(); setMobileOpen(false); }}
              className="block w-full text-left px-4 py-2 text-white/70 hover:text-white font-semibold text-sm transition">
              {link.label}
            </button>
          ))}
          <button onClick={onNavigateLogin}
            className="mx-4 mt-3 px-5 py-2.5 rounded font-bold text-sm transition-all active:scale-95 text-white block"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
