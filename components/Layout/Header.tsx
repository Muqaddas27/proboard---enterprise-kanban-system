import React from 'react';

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
  return (
    <nav className="px-6 py-4 border-b border-blue-400/20 fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button onClick={onNavigateLanding} className="flex items-center gap-3 hover:opacity-80 transition group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="font-black text-lg tracking-tight">ProBoard</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={onNavigateLanding} className="text-white/70 hover:text-white font-semibold transition text-sm hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400">
            Home
          </button>
          <button onClick={onNavigateFeatures} className="text-white/70 hover:text-white font-semibold transition text-sm hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400">
            Features
          </button>
          <button onClick={onNavigatePricing} className="text-white/70 hover:text-white font-semibold transition text-sm hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400">
            Pricing
          </button>
          <button onClick={onNavigateSecurity} className="text-white/70 hover:text-white font-semibold transition text-sm hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400">
            Security
          </button>
          <button onClick={onNavigateAbout} className="text-white/70 hover:text-white font-semibold transition text-sm hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400">
            About
          </button>
        </div>

        {/* CTA Button */}
        <button onClick={onNavigateLogin} className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-bold text-sm transition-all shadow-lg shadow-indigo-500/50 active:scale-95">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Header;
