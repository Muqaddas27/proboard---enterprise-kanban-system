
import React, { useEffect, useState, useRef } from 'react';
import { useBoard } from '../../store/boardStore';
import { useSettings } from '../../contexts/SettingsContext';
import { useAuth } from '../../contexts/AuthContext';
import { notificationService } from '../../services/notificationService';
import { confirmService } from '../Modals/ConfirmContainer';
import { getAllWallpaperOptions } from '../Dashboard/WallpaperSelector';

const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery, activeBoard, addCard } = useBoard();
  const { openSettings } = useSettings();
  const { logout, user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState('midnight-blue');
  const [wallpaperKey, setWallpaperKey] = useState(0);
  const backgroundImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const readWallpaper = () => {
      const savedWallpaper = localStorage.getItem('proboard-wallpaper');
      if (savedWallpaper) {
        setSelectedWallpaper(savedWallpaper);
      }
    };

    readWallpaper();
    const handler = () => {
      readWallpaper();
      setWallpaperKey(prev => prev + 1);
    };
    window.addEventListener('proboard-wallpaper-change', handler);
    return () => window.removeEventListener('proboard-wallpaper-change', handler);
  }, []);

  const wallpaperOptions = getAllWallpaperOptions();
  const currentWallpaper = wallpaperOptions.find(w => w.id === selectedWallpaper) || wallpaperOptions[0];

  const handleQuickAdd = () => {
    if (activeBoard && activeBoard.lists.length > 0) {
      const firstListId = activeBoard.lists[0].id;
      addCard(firstListId, 'New Task');
      notificationService.success('Task Created', 'New task added to your first column');
    } else {
      notificationService.warning('No Columns', 'Create a column first to add tasks');
    }
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleSignOut = async () => {
    const confirmed = await confirmService.confirm({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      confirmText: 'Sign Out',
      cancelText: 'Cancel',
      type: 'default',
    });
    if (confirmed) {
      setShowProfile(false);
      logout();
      notificationService.success('Signed Out', 'You have been signed out successfully');
    }
  };

  const handleProfileSettings = () => {
    setShowProfile(false);
    openSettings('profile');
  };

  const handleWorkspaceSettings = () => {
    setShowProfile(false);
    openSettings('workspace');
  };

  const handleHelpSupport = () => {
    setShowProfile(false);
    openSettings('help');
  };

  return (
    <nav key={wallpaperKey} className="h-16 border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-[100] shadow-sm relative">
      <img
        ref={backgroundImageRef}
        src={currentWallpaper.image}
        alt="Wallpaper"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${currentWallpaper.gradient} opacity-35`} />
      <div className="absolute inset-0 bg-black/55 backdrop-blur-xl" />
      <div className="relative z-10 flex items-center justify-between w-full h-full">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/50 group-hover:rotate-6 transition-all duration-300">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="font-black text-white text-lg tracking-tight">ProBoard</span>
        </div>

        {/* Search & Actions */}
        {activeBoard && (
          <div className="flex items-center gap-4 flex-1">
            <div className="h-6 w-px bg-white/20" />
            <div className="relative group hidden md:flex items-center flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text"
                placeholder="Search tasks, boards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-11 pr-4 text-sm focus:ring-4 focus:ring-indigo-400/30 focus:bg-white/20 focus:border-indigo-400 transition-all outline-none font-medium text-white placeholder-slate-400"
              />
            </div>
            <button 
              onClick={handleQuickAdd}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-green-200 active:scale-95 group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              Quick Task
            </button>
          </div>
        )}
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Profile Menu */}
        <div className="relative">
          <button 
            onClick={handleProfileClick}
            className="flex items-center gap-3 pl-1 pr-2 py-1.5 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 group"
            title="User Profile"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
              <span className="text-xs font-bold text-white uppercase">
                {user?.name.substring(0, 2) || 'JD'}
              </span>
            </div>
            <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-[100]" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-2xl border border-slate-100 z-[101] overflow-hidden animate-in zoom-in-95 slide-in-from-top-2 duration-200">
                {/* Profile Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg text-white font-bold">
                      {user?.name.substring(0, 2).toUpperCase() || 'JD'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-slate-500 mt-1">{user?.email || 'email@example.com'}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2 px-2">
                  <button 
                    onClick={handleProfileSettings}
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-3 transition-colors font-medium group">
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Profile Settings
                  </button>
                  <button 
                    onClick={handleWorkspaceSettings}
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-3 transition-colors font-medium group">
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                    Workspace Settings
                  </button>
                  <button 
                    onClick={handleHelpSupport}
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-3 transition-colors font-medium group">
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    Help & Support
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* Sign Out */}
                <div className="p-2">
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-3 font-bold transition-colors group"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
