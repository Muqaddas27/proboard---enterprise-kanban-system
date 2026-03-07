
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Priority } from '../../types';

interface SortableCardProps {
  card: Card;
  onClick: (card: Card) => void;
  cardAccent?: string;
}

const SortableCard: React.FC<SortableCardProps> = ({ card, onClick, cardAccent = 'from-indigo-600 to-indigo-700' }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: card.id,
    data: {
      type: 'Card',
      card
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    scale: isDragging ? 1.05 : 1,
  };

  const getPriorityConfig = (p: Priority) => {
    switch (p) {
      case Priority.HIGH:
        return { dot: 'bg-rose-300', pillBg: 'bg-rose-500/20', pillText: 'text-rose-100', pillBorder: 'border-rose-300/40' };
      case Priority.MEDIUM:
        return { dot: 'bg-amber-300', pillBg: 'bg-amber-500/20', pillText: 'text-amber-100', pillBorder: 'border-amber-300/40' };
      case Priority.LOW:
        return { dot: 'bg-emerald-300', pillBg: 'bg-emerald-500/20', pillText: 'text-emerald-100', pillBorder: 'border-emerald-300/40' };
      default:
        return { dot: 'bg-slate-300', pillBg: 'bg-slate-500/20', pillText: 'text-slate-100', pillBorder: 'border-slate-300/40' };
    }
  };

  const config = getPriorityConfig(card.priority);

  const getCardGradient = () => {
    if (cardAccent.includes('blue')) return 'linear-gradient(135deg, #2563eb, #1d4ed8)';
    if (cardAccent.includes('purple')) return 'linear-gradient(135deg, #a855f7, #9333ea)';
    if (cardAccent.includes('cyan')) return 'linear-gradient(135deg, #06b6d4, #0891b2)';
    if (cardAccent.includes('emerald')) return 'linear-gradient(135deg, #059669, #047857)';
    if (cardAccent.includes('amber')) return 'linear-gradient(135deg, #d97706, #b45309)';
    if (cardAccent.includes('fuchsia')) return 'linear-gradient(135deg, #d946ef, #c026d3)';
    if (cardAccent.includes('sky')) return 'linear-gradient(135deg, #38bdf8, #0284c7)';
    if (cardAccent.includes('rose')) return 'linear-gradient(135deg, #fb7185, #e11d48)';
    if (cardAccent.includes('slate')) return 'linear-gradient(135deg, #94a3b8, #64748b)';
    if (cardAccent.includes('indigo')) return 'linear-gradient(135deg, #6366f1, #4f46e5)';
    return 'linear-gradient(135deg, #6366f1, #4f46e5)';
  };

  const getAvatarGradient = () => {
    if (cardAccent.includes('blue')) return 'linear-gradient(135deg, #60a5fa, #2563eb)';
    if (cardAccent.includes('purple')) return 'linear-gradient(135deg, #c4b5fd, #7c3aed)';
    if (cardAccent.includes('cyan')) return 'linear-gradient(135deg, #67e8f9, #0891b2)';
    if (cardAccent.includes('emerald')) return 'linear-gradient(135deg, #6ee7b7, #059669)';
    if (cardAccent.includes('amber')) return 'linear-gradient(135deg, #fcd34d, #d97706)';
    if (cardAccent.includes('fuchsia')) return 'linear-gradient(135deg, #f5a3ff, #c026d3)';
    if (cardAccent.includes('sky')) return 'linear-gradient(135deg, #7dd3fc, #0284c7)';
    if (cardAccent.includes('rose')) return 'linear-gradient(135deg, #fda4af, #e11d48)';
    if (cardAccent.includes('slate')) return 'linear-gradient(135deg, #cbd5f5, #64748b)';
    return 'linear-gradient(135deg, #a5b4fc, #4f46e5)';
  };

  const cardStyle = {
    ...style,
    background: getCardGradient(),
    zIndex: isDragging ? 50 : 1,
    borderRadius: '0.5rem'
  };

  return (
    <div
      ref={setNodeRef}
      style={cardStyle}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation();
        onClick(card);
      }}
      className="rounded-lg p-5 shadow-2xl hover:shadow-[0_20px_70px_-15px_rgba(99,102,241,0.5)] transition-all duration-300 cursor-grab active:cursor-grabbing group select-none relative w-full h-52 flex flex-col justify-between overflow-hidden text-white border border-white/30 backdrop-blur-sm hover:scale-105 hover:border-white/50"
    >
      {/* Priority Tag - Always at Top */}
      <div className="flex items-center pb-3">
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${config.pillBg} ${config.pillText} ${config.pillBorder}`}>
          <span className={`w-2 h-2 rounded-full ${config.dot} shadow-sm`} />
          {card.priority}
        </span>
      </div>
      
      {/* Title and Description - Middle Section */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <h4 className="text-base font-extrabold text-white mb-2 leading-tight group-hover:scale-105 transition-transform line-clamp-2 drop-shadow-md">
          {card.title}
        </h4>
        
        {/* Description */}
        {card.description && (
          <p className="text-sm text-white/90 line-clamp-2 leading-relaxed font-semibold group-hover:text-white transition-colors">
            {card.description}
          </p>
        )}
      </div>

      {/* Footer - Always at Bottom */}
      <div className="pt-4 border-t border-white/30 flex items-center justify-between flex-shrink-0 backdrop-blur-md bg-white/5 -mx-5 -mb-5 px-5 pb-4 rounded-b-lg">
        <div className="flex items-center gap-2">
          {card.description && (
            <svg className="w-4 h-4 text-white/70 group-hover:text-white group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          )}
          {card.dueDate && (
            <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors">
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-extrabold">
                {new Date(card.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex -space-x-1">
          {card.members && card.members.length > 0 ? (
            <>
              {card.members.slice(0, 3).map((memberId) => {
                // Map team member IDs to initials from team members list
                const teamMembers = [
                  { id: '1', avatar: 'JD' },
                  { id: '2', avatar: 'SS' },
                  { id: '3', avatar: 'MJ' },
                  { id: '4', avatar: 'EW' },
                ];
                const member = teamMembers.find(m => m.id === memberId);
                const avatar = member?.avatar || '?';
                return (
                  <div key={memberId} title={memberId} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white shadow-lg flex items-center justify-center ring-2 ring-white/50 hover:scale-125 transition-transform">
                    <span className="text-[8px] font-extrabold text-white">{avatar}</span>
                  </div>
                );
              })}
              {card.members.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 border-2 border-white shadow-lg flex items-center justify-center ring-2 ring-white/50 hover:scale-125 transition-transform">
                  <span className="text-[8px] font-extrabold text-slate-700">+{card.members.length - 3}</span>
                </div>
              )}
            </>
          ) : (
            <div
              className="w-7 h-7 rounded-full border-2 border-white shadow-md flex items-center justify-center hover:scale-110 transition-transform group-hover:shadow-lg"
              style={{ background: getAvatarGradient() }}
            >
              <span className="text-[10px] font-extrabold text-white/95">+</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortableCard;
