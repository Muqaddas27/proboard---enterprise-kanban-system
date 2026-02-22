import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import { useAuth } from '../contexts/AuthContext';
import { notificationService } from '../services/notificationService';

interface LoginPageProps {
  onNavigateLanding: () => void;
  onNavigateAbout?: () => void;
  onNavigateFeatures?: () => void;
  onNavigatePricing?: () => void;
  onNavigateSecurity?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigateLanding, onNavigateAbout, onNavigateFeatures, onNavigatePricing, onNavigateSecurity }) => {
  const { login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          notificationService.error('Password Mismatch', 'Passwords do not match');
          setIsLoading(false);
          return;
        }
        await signup(formData.name, formData.email, formData.password);
        notificationService.success('Welcome!', `Account created for ${formData.email}`);
      } else {
        await login(formData.email, formData.password);
        notificationService.success('Welcome Back!', `Logged in as ${formData.email}`);
      }
      // Reset form
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      notificationService.error(
        isSignUp ? 'Sign Up Failed' : 'Login Failed',
        error instanceof Error ? error.message : 'Please try again'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Fixed Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 to-slate-950/40" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(148, 163, 184, .05) 25%, rgba(148, 163, 184, .05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, .05) 75%, rgba(148, 163, 184, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(148, 163, 184, .05) 25%, rgba(148, 163, 184, .05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, .05) 75%, rgba(148, 163, 184, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-slate-600/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-20">
        <Header
          onNavigateLanding={onNavigateLanding}
          onNavigateLogin={onNavigateLanding}
          onNavigateAbout={onNavigateAbout}
          onNavigateFeatures={onNavigateFeatures}
          onNavigatePricing={onNavigatePricing}
          onNavigateSecurity={onNavigateSecurity}
        />
      </div>

      {/* Main Container - Add extra top padding for fixed header clearance */}
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10 pt-32 pb-20">
        <div className="max-w-2xl w-full">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left Side - Benefits */}
            <div className="hidden md:flex flex-col gap-6 mt-8">
              <div className="group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/40 group-hover:shadow-indigo-500/60 transition-all">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Team Collaboration</h3>
                <p className="text-white/60 text-sm leading-relaxed">Work seamlessly with your team. Assign tasks, track progress, and celebrate wins together.</p>
              </div>

              <div className="group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/40 group-hover:shadow-purple-500/60 transition-all">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.757 15.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM4 10a1 1 0 01-1-1V8a1 1 0 012 0v1a1 1 0 01-1 1zM4.929 4.929a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Smart Automation</h3>
                <p className="text-white/60 text-sm leading-relaxed">Automate repetitive tasks and workflows. Focus on what matters most to your team.</p>
              </div>

              <div className="group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/40 group-hover:shadow-blue-500/60 transition-all">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Enterprise Ready</h3>
                <p className="text-white/60 text-sm leading-relaxed">SOC 2 certified, GDPR compliant, and trusted by 10K+ teams worldwide.</p>
              </div>
            </div>

            {/* Right Side - Form Card */}
            <div className="w-full mx-auto max-w-sm md:sticky md:top-32">
              {/* Card with Premium Styling */}
              <div className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 backdrop-blur-3xl border border-indigo-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                {/* Animated Background Gradient Elements */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-600/25 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-600/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
                
                {/* Border Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-600/20 via-purple-600/10 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Card Header */}
                <div className="mb-8 relative z-10">
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/50 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="text-xs font-bold text-indigo-300 tracking-widest uppercase">ProBoard</span>
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">
                    {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                  </h2>
                  <p className="text-white/70 text-sm font-medium leading-relaxed">
                    {isSignUp 
                      ? 'Join thousands of teams delivering faster. Start your free trial today.' 
                      : 'Sign in to your account and pick up where you left off.'}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 relative z-10">
                  {isSignUp && (
                    <div>
                      <label className="block text-xs font-bold text-white/80 mb-2 tracking-widest uppercase">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-700/40 border border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:bg-slate-700/60 focus:border-indigo-400/80 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all font-medium backdrop-blur-xl hover:border-white/40 hover:bg-slate-700/50"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-2 tracking-widest uppercase">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-slate-700/40 border border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:bg-slate-700/60 focus:border-indigo-400/80 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all font-medium backdrop-blur-xl hover:border-white/40 hover:bg-slate-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-2 tracking-widest uppercase">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-slate-700/40 border border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:bg-slate-700/60 focus:border-indigo-400/80 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all font-medium backdrop-blur-xl hover:border-white/40 hover:bg-slate-700/50"
                    />
                  </div>

                  {isSignUp && (
                    <div>
                      <label className="block text-xs font-bold text-white/80 mb-2 tracking-widest uppercase">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-slate-700/40 border border-white/30 rounded-xl text-white text-sm placeholder-white/60 focus:bg-slate-700/60 focus:border-indigo-400/80 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all font-medium backdrop-blur-xl hover:border-white/40 hover:bg-slate-700/50"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold text-base rounded-xl transition-all shadow-xl shadow-indigo-500/60 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-indigo-500/70 border border-indigo-400/50 relative z-10"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {isSignUp ? 'Creating Account...' : 'Signing In...'}
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isSignUp ? "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" : "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
                        </svg>
                        {isSignUp ? 'Create Account' : 'Sign In'}
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="flex-1 h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
                  <span className="text-xs text-white/50 font-medium">OR</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
                </div>

                {/* Toggle */}
                <div className="text-center relative z-10">
                  <p className="text-white/60 text-xs font-medium mb-4">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  </p>
                  <button
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                    }}
                    className="text-indigo-300 hover:text-indigo-200 font-bold text-xs transition-colors hover:underline uppercase tracking-widest"
                  >
                    {isSignUp ? 'Sign In Here' : 'Create Account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
