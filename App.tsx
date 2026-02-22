
import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import KanbanBoard from './components/Board/KanbanBoard';
import ToastContainer from './components/Notifications/ToastContainer';
import ConfirmContainer from './components/Modals/ConfirmContainer';
import SettingsModal from './components/Modals/SettingsModal';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import SecurityPage from './pages/SecurityPage';
import { BoardProvider, useBoard } from './store/boardStore';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const Main: React.FC = () => {
  const { activeBoard, loading } = useBoard();
  const { settingsType, closeSettings } = useSettings();
  const { isAuthenticated, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'about' | 'features' | 'pricing' | 'security' | 'app'>('landing');

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage('app');
    } else {
      setCurrentPage('landing');
    }
  }, [isAuthenticated]);

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        onNavigateLogin={() => setCurrentPage('login')}
        onNavigateAbout={() => setCurrentPage('about')}
        onNavigateFeatures={() => setCurrentPage('features')}
        onNavigatePricing={() => setCurrentPage('pricing')}
        onNavigateSecurity={() => setCurrentPage('security')}
      />
    );
  }

  // About Page
  if (currentPage === 'about') {
    return (
      <AboutPage
        onNavigateLanding={() => setCurrentPage('landing')}
        onNavigateAbout={() => setCurrentPage('about')}
        onNavigateFeatures={() => setCurrentPage('features')}
        onNavigatePricing={() => setCurrentPage('pricing')}
        onNavigateSecurity={() => setCurrentPage('security')}
      />
    );
  }

  // Features Page
  if (currentPage === 'features') {
    return (
      <FeaturesPage
        onNavigateLanding={() => setCurrentPage('landing')}
        onNavigateLogin={() => setCurrentPage('login')}
        onNavigateAbout={() => setCurrentPage('about')}
        onNavigateFeatures={() => setCurrentPage('features')}
        onNavigatePricing={() => setCurrentPage('pricing')}
        onNavigateSecurity={() => setCurrentPage('security')}
      />
    );
  }

  // Pricing Page
  if (currentPage === 'pricing') {
    return (
      <PricingPage
        onNavigateLanding={() => setCurrentPage('landing')}
        onNavigateAbout={() => setCurrentPage('about')}
        onNavigateFeatures={() => setCurrentPage('features')}
        onNavigatePricing={() => setCurrentPage('pricing')}
        onNavigateSecurity={() => setCurrentPage('security')}
      />
    );
  }

  // Security Page
  if (currentPage === 'security') {
    return (
      <SecurityPage
        onNavigateLanding={() => setCurrentPage('landing')}
        onNavigateAbout={() => setCurrentPage('about')}
        onNavigateFeatures={() => setCurrentPage('features')}
        onNavigatePricing={() => setCurrentPage('pricing')}
        onNavigateSecurity={() => setCurrentPage('security')}
      />
    );
  }

  // Login Page
  if (currentPage === 'login') {
    if (isAuthenticated) {
      setCurrentPage('app');
      return null;
    }
    return (
      <LoginPage 
        onNavigateLanding={() => setCurrentPage('landing')}
        onNavigateAbout={() => setCurrentPage('about')}
        onNavigateFeatures={() => setCurrentPage('features')}
        onNavigatePricing={() => setCurrentPage('pricing')}
        onNavigateSecurity={() => setCurrentPage('security')}
      />
    );
  }

  // App (Protected)
  if (!isAuthenticated) {
    setCurrentPage('landing');
    return null;
  }

  // Loading State
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading your workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-visible">
        {activeBoard ? <KanbanBoard /> : <Dashboard />}
      </main>
      {settingsType && (
        <SettingsModal 
          type={settingsType}
          onClose={closeSettings}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BoardProvider>
        <SettingsProvider>
          <Main />
          <ToastContainer />
          <ConfirmContainer />
        </SettingsProvider>
      </BoardProvider>
    </AuthProvider>
  );
};

export default App;
