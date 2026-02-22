
import React, { useState } from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List, Card } from '../../types';
import SortableCard from './SortableCard';
import { useBoard } from '../../store/boardStore';
import { notificationService } from '../../services/notificationService';
import { confirmService } from '../Modals/ConfirmContainer';

interface SortableListProps {
  list: List;
  onCardClick: (card: Card) => void;
  cardAccent?: string;
}

const SortableList: React.FC<SortableListProps> = ({ list, onCardClick, cardAccent = 'from-indigo-600 to-indigo-700' }) => {
  const { addCard, deleteList, renameList } = useBoard();
  const [isAdding, setIsAdding] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: list.id,
    data: {
      type: 'List',
      list
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
  };

  const getListGradient = () => {
    if (cardAccent.includes('blue')) return 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(29, 78, 216, 0.18))';
    if (cardAccent.includes('purple')) return 'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(147, 51, 234, 0.18))';
    if (cardAccent.includes('cyan')) return 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(8, 145, 178, 0.18))';
    if (cardAccent.includes('emerald')) return 'linear-gradient(135deg, rgba(5, 150, 105, 0.12), rgba(4, 120, 87, 0.18))';
    if (cardAccent.includes('amber')) return 'linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(180, 83, 9, 0.18))';
    if (cardAccent.includes('fuchsia')) return 'linear-gradient(135deg, rgba(217, 70, 239, 0.12), rgba(192, 38, 211, 0.18))';
    if (cardAccent.includes('sky')) return 'linear-gradient(135deg, rgba(2, 132, 199, 0.12), rgba(3, 105, 161, 0.18))';
    if (cardAccent.includes('rose')) return 'linear-gradient(135deg, rgba(225, 29, 72, 0.12), rgba(190, 18, 60, 0.18))';
    if (cardAccent.includes('slate')) return 'linear-gradient(135deg, rgba(71, 85, 105, 0.12), rgba(51, 65, 85, 0.18))';
    return 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(79, 70, 229, 0.18))';
  };

  const getHeaderGradient = () => {
    if (cardAccent.includes('blue')) return 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(29, 78, 216, 0.25))';
    if (cardAccent.includes('purple')) return 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.25))';
    if (cardAccent.includes('cyan')) return 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(8, 145, 178, 0.25))';
    if (cardAccent.includes('emerald')) return 'linear-gradient(135deg, rgba(5, 150, 105, 0.2), rgba(4, 120, 87, 0.25))';
    if (cardAccent.includes('amber')) return 'linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(180, 83, 9, 0.25))';
    if (cardAccent.includes('fuchsia')) return 'linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(192, 38, 211, 0.25))';
    if (cardAccent.includes('sky')) return 'linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(3, 105, 161, 0.25))';
    if (cardAccent.includes('rose')) return 'linear-gradient(135deg, rgba(225, 29, 72, 0.2), rgba(190, 18, 60, 0.25))';
    if (cardAccent.includes('slate')) return 'linear-gradient(135deg, rgba(71, 85, 105, 0.2), rgba(51, 65, 85, 0.25))';
    return 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(79, 70, 229, 0.25))';
  };

  const getHeaderBorder = () => {
    if (cardAccent.includes('blue')) return 'rgba(37, 99, 235, 0.4)';
    if (cardAccent.includes('purple')) return 'rgba(168, 85, 247, 0.4)';
    if (cardAccent.includes('cyan')) return 'rgba(6, 182, 212, 0.4)';
    if (cardAccent.includes('emerald')) return 'rgba(5, 150, 105, 0.4)';
    if (cardAccent.includes('amber')) return 'rgba(217, 119, 6, 0.4)';
    if (cardAccent.includes('fuchsia')) return 'rgba(217, 70, 239, 0.4)';
    if (cardAccent.includes('sky')) return 'rgba(2, 132, 199, 0.4)';
    if (cardAccent.includes('rose')) return 'rgba(225, 29, 72, 0.4)';
    if (cardAccent.includes('slate')) return 'rgba(71, 85, 105, 0.4)';
    return 'rgba(99, 102, 241, 0.4)';
  };

  const getHeaderHoverBg = () => {
    if (cardAccent.includes('blue')) return 'rgba(37, 99, 235, 0.15)';
    if (cardAccent.includes('purple')) return 'rgba(168, 85, 247, 0.15)';
    if (cardAccent.includes('cyan')) return 'rgba(6, 182, 212, 0.15)';
    if (cardAccent.includes('emerald')) return 'rgba(5, 150, 105, 0.15)';
    if (cardAccent.includes('amber')) return 'rgba(217, 119, 6, 0.15)';
    if (cardAccent.includes('fuchsia')) return 'rgba(217, 70, 239, 0.15)';
    if (cardAccent.includes('sky')) return 'rgba(2, 132, 199, 0.15)';
    if (cardAccent.includes('rose')) return 'rgba(225, 29, 72, 0.15)';
    if (cardAccent.includes('slate')) return 'rgba(71, 85, 105, 0.15)';
    return 'rgba(99, 102, 241, 0.15)';
  };

  const getHeaderHoverStrongBg = () => {
    if (cardAccent.includes('blue')) return 'rgba(37, 99, 235, 0.28)';
    if (cardAccent.includes('purple')) return 'rgba(168, 85, 247, 0.28)';
    if (cardAccent.includes('cyan')) return 'rgba(6, 182, 212, 0.28)';
    if (cardAccent.includes('emerald')) return 'rgba(5, 150, 105, 0.28)';
    if (cardAccent.includes('amber')) return 'rgba(217, 119, 6, 0.28)';
    if (cardAccent.includes('fuchsia')) return 'rgba(217, 70, 239, 0.28)';
    if (cardAccent.includes('sky')) return 'rgba(2, 132, 199, 0.28)';
    if (cardAccent.includes('rose')) return 'rgba(225, 29, 72, 0.28)';
    if (cardAccent.includes('slate')) return 'rgba(71, 85, 105, 0.28)';
    return 'rgba(99, 102, 241, 0.28)';
  };

  const getAccentColor = () => {
    if (cardAccent.includes('blue')) return '#60a5fa';
    if (cardAccent.includes('purple')) return '#c4b5fd';
    if (cardAccent.includes('cyan')) return '#67e8f9';
    if (cardAccent.includes('emerald')) return '#6ee7b7';
    if (cardAccent.includes('amber')) return '#fcd34d';
    if (cardAccent.includes('fuchsia')) return '#f5a3ff';
    if (cardAccent.includes('sky')) return '#7dd3fc';
    if (cardAccent.includes('rose')) return '#fda4af';
    if (cardAccent.includes('slate')) return '#cbd5f5';
    return '#a5b4fc';
  };

  const getAccentColorStrong = () => {
    if (cardAccent.includes('blue')) return '#2563eb';
    if (cardAccent.includes('purple')) return '#7c3aed';
    if (cardAccent.includes('cyan')) return '#0891b2';
    if (cardAccent.includes('emerald')) return '#059669';
    if (cardAccent.includes('amber')) return '#d97706';
    if (cardAccent.includes('fuchsia')) return '#c026d3';
    if (cardAccent.includes('sky')) return '#0284c7';
    if (cardAccent.includes('rose')) return '#e11d48';
    if (cardAccent.includes('slate')) return '#64748b';
    return '#4f46e5';
  };

  const listStyle = {
    ...style,
    background: getListGradient(),
    borderRadius: '0.75rem'
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardTitle.trim()) {
      notificationService.warning('Empty Title', 'Please write a task title');
      return;
    }
    addCard(list.id, newCardTitle);
    notificationService.success('Task Added', 'Task has been created successfully');
    setNewCardTitle('');
    setIsAdding(false);
  };

  const handleTitleSubmit = (e: React.KeyboardEvent | React.FocusEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    setIsEditingTitle(false);
    if (editTitle.trim() && editTitle !== list.title) {
      renameList(list.id, editTitle);
      notificationService.success('Column Renamed', 'The column name has been updated');
    } else {
      setEditTitle(list.title);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={listStyle}
      className="flex flex-col w-80 min-w-80 h-full rounded-xl border border-white/20 shadow-sm overflow-hidden transition-all hover:shadow-md z-10 relative backdrop-blur-sm"
    >
      {/* Header */}
      <div 
        {...attributes} 
        {...listeners}
        className="px-6 py-4 flex items-center justify-between group cursor-grab active:cursor-grabbing select-none border-b shadow-sm"
        style={{
          background: getHeaderGradient(),
          borderColor: getHeaderBorder(),
        }}
      >
        {isEditingTitle ? (
          <input
            autoFocus
            className="text-sm font-black text-white px-3 py-2 rounded-lg border-2 outline-none flex-1 shadow-inner placeholder-slate-300 focus:border-[var(--accent-strong)] focus:ring-1 focus:ring-[var(--accent-strong)]"
            style={{
              background: getHeaderHoverBg(),
              borderColor: getHeaderBorder(),
              ['--accent-strong' as any]: getAccentColorStrong(),
            }}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleTitleSubmit}
            onBlur={handleTitleSubmit}
          />
        ) : (
          <div 
            className="flex items-center gap-3 flex-1 overflow-hidden group/title hover:bg-[var(--header-hover)] px-3 py-2 rounded-lg transition-colors cursor-pointer active:bg-[var(--header-hover)]"
            style={{ ['--header-hover' as any]: getHeaderHoverBg() }}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingTitle(true);
            }}
          >
            <h3
              className="text-sm font-black text-white truncate tracking-tight hover:text-[var(--accent)] transition-colors"
              style={{ ['--accent' as any]: getAccentColor() }}
            >
              {list.title}
            </h3>
            <span
              className="text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: getAccentColorStrong() }}
            >
              {list.cards.length}
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-1 ml-2">
          <button 
            onClick={async (e) => {
              e.stopPropagation();
              const confirmed = await confirmService.confirm({
                title: 'Delete Column',
                message: `Delete "${list.title}"? All cards will be moved to archive.`,
                confirmText: 'Delete',
                cancelText: 'Cancel',
                type: 'danger',
              });
              if (confirmed) {
                deleteList(list.id);
                notificationService.success('Column Deleted', 'The column has been removed');
              }
            }}
            className="p-2 text-slate-200/70 hover:text-[var(--accent-strong)] hover:bg-[var(--header-hover-strong)] rounded-lg transition-all active:scale-90 group/delete"
            style={{
              ['--header-hover-strong' as any]: getHeaderHoverStrongBg(),
              ['--accent-strong' as any]: getAccentColorStrong(),
            }}
            title="Delete column"
          >
            <svg className="w-4 h-4 group-hover/delete:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 space-y-3 kanban-scroll scroll-smooth min-h-0 relative z-10">
        <SortableContext items={list.cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {list.cards.map(card => (
            <SortableCard key={card.id} card={card} onClick={onCardClick} cardAccent={cardAccent} />
          ))}
        </SortableContext>

        {isAdding ? (
          <form
            onSubmit={handleAddCard}
            className="rounded-lg p-4 border animate-in fade-in zoom-in-95 duration-200 shadow-sm"
            style={{
              background: getHeaderGradient(),
              borderColor: getHeaderBorder(),
            }}
          >
            <textarea
              autoFocus
              placeholder="What needs to be done?"
              className="w-full text-sm font-bold p-2 outline-none resize-none text-white placeholder-slate-300 rounded border focus:border-[var(--accent-strong)] focus:ring-1 focus:ring-[var(--accent-strong)]"
              style={{
                background: getHeaderHoverBg(),
                borderColor: getHeaderBorder(),
                ['--accent-strong' as any]: getAccentColorStrong(),
              }}
              rows={3}
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddCard(e as any);
                }
                if (e.key === 'Escape') {
                  setIsAdding(false);
                  setNewCardTitle('');
                }
              }}
            />
            <div
              className="flex items-center gap-2 mt-3 pt-3 border-t"
              style={{ borderColor: getHeaderBorder() }}
            >
              <button 
                type="submit"
                disabled={!newCardTitle.trim()}
                className="flex-1 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                style={{
                  background: getAccentColorStrong(),
                  boxShadow: `0 8px 18px -8px ${getAccentColorStrong()}66`,
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Save
              </button>
              <button 
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setNewCardTitle('');
                }}
                className="text-slate-200/70 hover:text-slate-200 p-2 rounded-lg hover:bg-[var(--header-hover)] transition-colors"
                style={{ ['--header-hover' as any]: getHeaderHoverBg() }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full text-left hover:text-white hover:bg-[var(--header-hover)] px-4 py-3 rounded-lg transition-all flex items-center gap-2.5 text-xs font-bold group border active:scale-95"
            style={{
              color: getAccentColor(),
              borderColor: getHeaderBorder(),
              ['--header-hover' as any]: getHeaderHoverBg(),
            }}
            title="Add new task"
          >
            <div
              className="w-5 h-5 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: getAccentColorStrong() }}
            >
              <svg className="w-3 h-3 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
            </div>
            Add Task
          </button>
        )}
      </div>
      <div className="h-1" />
    </div>
  );
};

export default SortableList;
