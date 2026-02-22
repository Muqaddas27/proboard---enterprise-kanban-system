
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragStartEvent, 
  DragOverEvent, 
  DragEndEvent, 
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useBoard } from '../../store/boardStore';
import SortableList from './SortableList';
import SortableCard from './SortableCard';
import WallpaperSelector, { getAllWallpaperOptions } from '../Dashboard/WallpaperSelector';
import { Card, List, Priority } from '../../types';
import CardModal from '../Modals/CardModal';
import BoardSettingsModal from '../Modals/BoardSettingsModal';
import InviteModal from '../Modals/InviteModal';
import { notificationService } from '../../services/notificationService';

const KanbanBoard: React.FC = () => {
  console.log('🎯 KanbanBoard component loaded');
  const { activeBoard, reorderLists, moveCard, addList, setActiveBoard, searchQuery, filterPriority, setFilterPriority } = useBoard();
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [activeList, setActiveList] = useState<List | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState('midnight-blue');
  const [wallpaperKey, setWallpaperKey] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement>(null);

  // Load wallpaper preference from localStorage on mount
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('proboard-wallpaper');
    if (savedWallpaper) {
      setSelectedWallpaper(savedWallpaper);
    }
  }, []);

  useEffect(() => {
    if (!showFilters) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (filterButtonRef.current?.contains(target)) return;
      if (filterDropdownRef.current?.contains(target)) return;
      setShowFilters(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowFilters(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showFilters]);

  // Listen for wallpaper changes from other components
  useEffect(() => {
    const handleWallpaperChangeEvent = () => {
      const saved = localStorage.getItem('proboard-wallpaper');
      if (saved && saved !== selectedWallpaper) {
        setSelectedWallpaper(saved);
        setWallpaperKey(prev => prev + 1);
      }
    };

    window.addEventListener('proboard-wallpaper-change', handleWallpaperChangeEvent);
    return () => window.removeEventListener('proboard-wallpaper-change', handleWallpaperChangeEvent);
  }, [selectedWallpaper]);

  // Save wallpaper preference to localStorage
  const handleWallpaperChange = (wallpaperId: string) => {
    console.log('🎨 Wallpaper selected:', wallpaperId);
    setSelectedWallpaper(wallpaperId);
    setWallpaperKey(prev => prev + 1);
    localStorage.setItem('proboard-wallpaper', wallpaperId);
    window.dispatchEvent(new Event('proboard-wallpaper-change'));
  };

  const wallpaperOptions = getAllWallpaperOptions();
  const currentWallpaper = wallpaperOptions.find(w => w.id === selectedWallpaper) || wallpaperOptions[0];
  const gridColor = currentWallpaper.gridColor;
  
  console.log('📊 Current state:', {
    selectedWallpaper,
    wallpaperKey,
    currentWallpaperName: currentWallpaper.name,
    image: currentWallpaper.image?.substring(0, 50)
  });

  // Helper to get accent colors for UI elements based on wallpaper
  const getAccentClasses = () => currentWallpaper.cardAccent;
  const getAccentHoverClasses = () => currentWallpaper.cardAccentHover;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const filterOptions = [
    { key: 'ALL', label: 'All Tasks', color: 'indigo' },
    { key: Priority.LOW, label: 'Low Priority', color: 'emerald' },
    { key: Priority.MEDIUM, label: 'Medium Priority', color: 'amber' },
    { key: Priority.HIGH, label: 'High Priority', color: 'rose' }
  ];

  const handleInvite = () => {
    setShowInvite(true);
  };

  const filteredLists = useMemo(() => {
    if (!activeBoard) return [];
    return activeBoard.lists.map(list => ({
      ...list,
      cards: list.cards.filter(card => {
        const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             card.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriority = filterPriority === 'ALL' || card.priority === filterPriority;
        return matchesSearch && matchesPriority;
      })
    }));
  }, [activeBoard, searchQuery, filterPriority]);

  if (!activeBoard) return null;

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { type } = active.data.current!;
    if (type === 'List') {
      setActiveList(active.data.current!.list);
    } else {
      setActiveCard(active.data.current!.card);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    const isActiveACard = active.data.current?.type === 'Card';
    const isOverACard = over.data.current?.type === 'Card';
    if (!isActiveACard) return;
    if (isActiveACard && isOverACard) {
      const activeListId = active.data.current?.card.listId;
      const overListId = over.data.current?.card.listId;
      if (activeListId !== overListId) {
        const overListIndex = activeBoard.lists.findIndex(l => l.id === overListId);
        const overCardIndex = activeBoard.lists[overListIndex].cards.findIndex(c => c.id === overId);
        moveCard(activeId as string, overListId, overCardIndex);
      }
    }
    const isOverAList = over.data.current?.type === 'List';
    if (isActiveACard && isOverAList) {
      const activeListId = active.data.current?.card.listId;
      const overListId = over.id as string;
      if (activeListId !== overListId) {
        moveCard(activeId as string, overListId, 0);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);
    setActiveList(null);
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    const isActiveAList = active.data.current?.type === 'List';
    if (isActiveAList) {
      const oldIndex = activeBoard.lists.findIndex(l => l.id === activeId);
      const newIndex = activeBoard.lists.findIndex(l => l.id === overId);
      const newLists = arrayMove(activeBoard.lists, oldIndex, newIndex);
      reorderLists(newLists);
    }
  };

  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    addList(newListTitle);
    setNewListTitle('');
    setIsAddingList(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gradient-to-br text-white">
      {/* Fixed Background */}
      <div key={wallpaperKey} className="fixed inset-0 top-16">
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
      
      <div className="relative z-10 overflow-visible">
      {/* Board Header */}
      <div className="h-20 px-8 flex items-center justify-between bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-sm relative z-[200] overflow-visible">
        <div className="flex items-center gap-6 flex-1">
          <button 
            onClick={() => setActiveBoard(null)}
            className="p-2.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all active:scale-90 group"
            title="Back to Dashboard"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getAccentClasses()} flex items-center justify-center text-white font-black`}>
              {activeBoard.title.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="text-lg font-black text-white leading-tight truncate">{activeBoard.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  ● Active
                </span>
                <span className="text-xs font-bold text-slate-400 bg-slate-500/20 px-2.5 py-0.5 rounded-full border border-slate-500/30">
                  {activeBoard.lists.length} columns
                </span>
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-500" />
          
          <button 
            onClick={handleInvite}
            className="group flex items-center gap-2 px-5 py-2.5 mr-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all active:scale-95 font-bold text-sm shadow-lg"
            title="Invite team members"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Invite</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 ml-auto overflow-visible">
          <WallpaperSelector 
            currentWallpaper={selectedWallpaper}
            onSelectWallpaper={handleWallpaperChange}
          />
          <div className="relative" style={{ zIndex: 10001, position: 'relative' }}>
            <button
              ref={filterButtonRef}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-800 hover:bg-slate-100 text-sm font-bold rounded-lg transition-all active:scale-95 border border-slate-200"
              style={{ zIndex: 10001, position: 'relative' }}
              title="Filter tasks"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5h18M6 12h12M10 19h4" />
              </svg>
              <span className="hidden sm:inline">Filter</span>
            </button>

            {showFilters && (
              <div
                ref={filterDropdownRef}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full mt-2 left-0 w-64 max-h-[70vh] overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-2xl p-3"
                style={{ zIndex: 9999, position: 'absolute' }}
              >
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 pb-2">Task Filters</p>
                <div className="space-y-2">
                  {filterOptions.map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => {
                        setFilterPriority(filter.key as any);
                        setShowFilters(false);
                      }}
                      className={`w-full px-3 py-2.5 rounded-lg text-sm font-bold transition-all text-left flex items-center gap-3 ${
                        filterPriority === filter.key
                          ? `bg-slate-900 text-white border border-slate-900`
                          : `bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200`
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        filter.color === 'indigo' ? 'bg-indigo-400' :
                        filter.color === 'emerald' ? 'bg-emerald-400' :
                        filter.color === 'amber' ? 'bg-amber-400' :
                        'bg-rose-400'
                      }`} />
                      <span className="flex-1">{filter.label}</span>
                      {filterPriority === filter.key && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={() => setShowSettings(true)}
            className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${getAccentClasses()} hover:${getAccentHoverClasses()} text-white text-sm font-bold rounded-lg transition-all active:scale-95 group shadow-lg`}
            title="Board settings"
          >
            <svg className="w-4 h-4 group-hover:rotate-90 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* Board Container */}
      <div className="flex-1 min-h-0">
        {/* Board Surface */}
        <div className="w-full overflow-x-auto overflow-y-hidden p-6 kanban-scroll relative z-0 min-h-0">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full items-start pb-4">
            <SortableContext items={filteredLists.map(l => l.id)} strategy={horizontalListSortingStrategy}>
              {filteredLists.map(list => (
                <SortableList key={list.id} list={list} onCardClick={setEditingCard} cardAccent={getAccentClasses()} />
              ))}
            </SortableContext>

            {/* Add List Button */}
            {isAddingList ? (
              <form onSubmit={handleAddList} className="w-80 min-w-80 bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-white/30 animate-in slide-in-from-right-4 duration-300 flex flex-col gap-3">
                <input
                  autoFocus
                  placeholder="Column name..."
                  className="w-full text-sm font-bold p-3 border border-white/30 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400 bg-white/20 focus:bg-white/30 transition-all text-white placeholder-slate-400"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <button 
                    type="submit"
                    disabled={!newListTitle.trim()}
                    className="flex-1 bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Create
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsAddingList(false);
                      setNewListTitle('');
                    }}
                    className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </form>
            ) : (
              <button 
                onClick={() => setIsAddingList(true)}
                className="w-80 min-w-80 h-14 flex items-center justify-center gap-3 bg-white/10 hover:bg-indigo-500/20 text-slate-300 rounded-xl transition-all border-2 border-dashed border-white/30 hover:border-indigo-400 group shadow-sm"
                title="Add new column"
              >
                <div className="w-6 h-6 rounded-lg bg-slate-600 flex items-center justify-center group-hover:bg-indigo-500 transition-all">
                  <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="font-bold text-sm group-hover:text-indigo-300">Add Column</span>
              </button>
            )}
          </div>

          <DragOverlay dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: { opacity: '0.4' },
              },
            }),
          }}>
            {activeList && <SortableList list={activeList} onCardClick={() => {}} cardAccent={getAccentClasses()} />}
            {activeCard && <SortableCard card={activeCard} onClick={() => {}} cardAccent={getAccentClasses()} />}
          </DragOverlay>
        </DndContext>
        </div>
      </div>
      </div>

      {editingCard && (
        <CardModal 
          card={editingCard} 
          onClose={() => setEditingCard(null)} 
        />
      )}

      {showSettings && (
        <BoardSettingsModal 
          board={activeBoard} 
          onClose={() => setShowSettings(false)} 
        />
      )}

      {showInvite && (
        <InviteModal 
          onClose={() => setShowInvite(false)} 
        />
      )}
    </div>
  );
};

export default KanbanBoard;
