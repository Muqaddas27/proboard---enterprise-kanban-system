
import React, { useState, useEffect, useRef } from 'react';
import { useBoard } from '../../store/boardStore';
import { getAllWallpaperOptions } from './WallpaperSelector';

const Dashboard: React.FC = () => {
  console.log('🏠 Dashboard component loaded');
  const { boards, createBoard, setActiveBoard } = useBoard();
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
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

  // Save wallpaper preference to localStorage
  const handleWallpaperChange = (wallpaperId: string) => {
    setSelectedWallpaper(wallpaperId);
    setWallpaperKey(prev => prev + 1);
    localStorage.setItem('proboard-wallpaper', wallpaperId);
    window.dispatchEvent(new Event('proboard-wallpaper-change'));
  };

  const wallpaperOptions = getAllWallpaperOptions();
  const currentWallpaper = wallpaperOptions.find(w => w.id === selectedWallpaper) || wallpaperOptions[0];
  const gridColor = currentWallpaper.gridColor;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;
    setIsCreating(true);
    createBoard(newBoardTitle);
    setNewBoardTitle('');
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsCreating(false);
  };

  const handleBoardClick = (board: any) => {
    setActiveBoard(board);
  };

  // Helper to get accent colors for UI elements based on wallpaper
  const getAccentClasses = () => currentWallpaper.cardAccent;
  const getAccentHoverClasses = () => currentWallpaper.cardAccentHover;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentWallpaper.gradient} text-white overflow-hidden relative`}>
      {/* Fixed Background */}
      <div key={wallpaperKey} className="fixed inset-0">
        {/* Image Background */}
        <img
          ref={backgroundImageRef}
          src={currentWallpaper.image}
          alt="Wallpaper"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient if image fails
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />

        {/* Dark Overlay for Image */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Gradient Overlay (Fallback/Enhancement) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentWallpaper.gradient} opacity-40`} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, ${gridColor} 25%, ${gridColor} 26%, transparent 27%, transparent 74%, ${gridColor} 75%, ${gridColor} 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ${gridColor} 25%, ${gridColor} 26%, transparent 27%, transparent 74%, ${gridColor} 75%, ${gridColor} 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Animated Orbs */}
        <div className={`absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br ${currentWallpaper.orbColors[0].color1} ${currentWallpaper.orbColors[0].color2} rounded-full blur-3xl animate-pulse opacity-20`} />
        <div className={`absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br ${currentWallpaper.orbColors[1].color1} ${currentWallpaper.orbColors[1].color2} rounded-full blur-3xl animate-pulse opacity-20`} />
      </div>
      
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-2 bg-gradient-to-r ${getAccentClasses()}/30 text-white text-xs font-black uppercase tracking-wider rounded-full border border-white/50`}
                style={{
                  borderColor: `rgba(255, 255, 255, 0.5)`
                }}>
                📊 Dashboard
              </span>
              <div className="h-px w-8 bg-slate-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 tracking-tight">Your Workspaces</h1>
            <p className="text-slate-300 text-base sm:text-lg font-medium max-w-xl leading-relaxed">
              Create and manage your projects in a unified platform. Organize, collaborate, and achieve your goals.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex flex-col gap-4 items-start lg:items-end">
            <div className="hidden lg:block bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 min-w-fit">
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white/30 bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-md flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white/30 bg-slate-600 shadow-md flex items-center justify-center text-white text-xs font-bold">
                    +16
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-500" />
                <div>
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">System Status</p>
                  <p className="text-base font-bold text-indigo-300 mt-1">✓ Fully Operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Create New Board Card */}
          <form onSubmit={handleCreate} className="group">
            <div className="bg-white/10 backdrop-blur-xl border-2 border-dashed border-white/30 hover:border-indigo-400 rounded-2xl p-8 h-72 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:bg-gradient-to-b hover:from-indigo-500/20 to-white/10 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:to-indigo-500/5 transition-all duration-300" />
              
              <div className="relative text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${getAccentClasses()} rounded-xl flex items-center justify-center mb-6 group-hover:${getAccentHoverClasses()} group-hover:scale-110 transition-all duration-300`}>
                  <svg className="w-7 h-7 text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-white mb-2">New Board</h3>
                <p className="text-xs text-slate-300 font-bold mb-6">Create a new workspace</p>
              </div>

              <div className="w-full space-y-3 relative">
                <input
                  type="text"
                  placeholder="e.g., Q1 Marketing..."
                  value={newBoardTitle}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:bg-white/30 focus:border-indigo-400 transition-all text-sm font-bold text-white placeholder-slate-400"
                />
                <button
                  type="submit"
                  disabled={isCreating || !newBoardTitle.trim()}
                  onClick={(e) => e.stopPropagation()}
                  className={`w-full bg-gradient-to-r ${getAccentClasses()} text-white font-black py-3 rounded-xl hover:${getAccentHoverClasses()} transition-all shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs`}
                  style={{
                    boxShadow: `0 10px 25px rgba(0, 0, 0, 0.3)`
                  }}
                >
                  {isCreating ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Board
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Board Cards */}
          {boards.map((board, index) => (
            <div
              key={board.id}
              onClick={() => handleBoardClick(board)}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-72 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden relative"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Background Gradient */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-indigo-500/0 rounded-full -mr-20 -mt-20 group-hover:scale-120 transition-transform duration-500 opacity-40" />

                {/* Header Section */}
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAccentClasses()} flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                      {board.title.charAt(0).toUpperCase()}
                    </div>
                    <div className="p-2 text-slate-400 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-black text-white mb-1 tracking-tight group-hover:text-white transition-colors line-clamp-2">
                    {board.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Active • Updated today</p>
                </div>

                {/* Stats */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Columns</p>
                      <p className="text-lg font-black mt-1" style={{
                        backgroundImage: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent'
                      }}>
                        {board.lists.length}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Tasks</p>
                      <p className="text-lg font-black text-emerald-300 mt-1">
                        {board.lists.reduce((acc, l) => acc + l.cards.length, 0)}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Collaborators</span>
                      <div className="flex -space-x-2">
                        {[1, 2].map(i => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-md hover:scale-110 transition-transform"
                          >
                            {String.fromCharCode(64 + i)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {boards.length === 0 && (
          <div className="mt-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-2">No boards yet</h3>
            <p className="text-slate-300 font-medium mb-8">Create your first board to get started with workspace management.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
