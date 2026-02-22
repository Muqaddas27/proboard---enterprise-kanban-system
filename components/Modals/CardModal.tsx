
import React, { useState, useEffect } from 'react';
import { Card, Priority } from '../../types';
import { useBoard } from '../../store/boardStore';
import { getSmartDescription } from '../../services/geminiService';
import { notificationService } from '../../services/notificationService';
import { confirmService } from './ConfirmContainer';
import { getModalTheme, useWallpaperAccent } from '../Dashboard/wallpaperTheme';

interface CardModalProps {
  card: Card;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
  const { updateCard, deleteCard } = useBoard();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [priority, setPriority] = useState(card.priority);
  const [dueDate, setDueDate] = useState(card.dueDate || '');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; text: string; author: string; timestamp: string }>>(card.comments || []);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const wallpaperAccent = useWallpaperAccent();
  const theme = getModalTheme(wallpaperAccent);

  const teamMembers = [
    { id: '1', name: 'John Doe', avatar: 'JD' },
    { id: '2', name: 'Sarah Smith', avatar: 'SS' },
    { id: '3', name: 'Mike Johnson', avatar: 'MJ' },
    { id: '4', name: 'Emma Wilson', avatar: 'EW' },
  ];

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
    setPriority(card.priority);
    setDueDate(card.dueDate || '');
    setSelectedMembers(card.members || []);
    setComments(card.comments || []);
  }, [card]);

  const handleSave = async () => {
    if (!title.trim()) {
      notificationService.error('Title Required', 'Please enter a task title');
      return;
    }
    setIsSaving(true);
    updateCard(card.id, { title, description, priority });
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsSaving(false);
    notificationService.success('Task Saved', 'Your changes have been saved successfully');
    onClose();
  };

  const handleAiDescription = async () => {
    if (!title.trim()) {
      notificationService.info('Add Title First', 'Please add a task title before generating description');
      return;
    }
    setIsAiLoading(true);
    try {
      const aiDesc = await getSmartDescription(title);
      setDescription(aiDesc);
      notificationService.success('Description Generated', 'AI has created a description for your task');
    } catch (error) {
      notificationService.error('Generation Failed', 'Could not generate description at this time');
    }
    setIsAiLoading(false);
  };

  const handleDelete = async () => {
    const confirmed = await confirmService.confirm({
      title: 'Delete Task',
      message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
    });

    if (confirmed) {
      deleteCard(card.id);
      notificationService.success('Task Deleted', 'The task has been removed');
      onClose();
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: comment,
        author: 'John Doe',
        timestamp: new Date().toISOString()
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      updateCard(card.id, { comments: updatedComments });
      notificationService.success('Comment Added', 'Your comment has been posted');
      setComment('');
    }
  };

  const handleSetDates = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSaveDueDate = () => {
    if (dueDate) {
      updateCard(card.id, { dueDate });
      notificationService.success('Date Set', `Due date set to ${new Date(dueDate).toLocaleDateString()}`);
      setShowDatePicker(false);
    }
  };

  const handleAddMembers = () => {
    setShowMembers(!showMembers);
  };

  const handleToggleMember = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSaveMembers = () => {
    if (selectedMembers.length > 0) {
      const memberNames = selectedMembers
        .map(id => teamMembers.find(m => m.id === id)?.name)
        .filter(Boolean)
        .join(', ');
      updateCard(card.id, { members: selectedMembers });
      notificationService.success('Members Added', `Added ${memberNames} to this task`);
      setShowMembers(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <div
        className="w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden modal animate-in zoom-in-95 fade-in duration-300 border"
        style={{
          background: theme.surfaceBg,
          borderColor: theme.accentBorder,
          ['--accent-strong' as any]: theme.accentStrong,
          ['--accent-muted' as any]: theme.accentMuted,
          ['--accent-ring' as any]: theme.accentRing,
          ['--accent-soft' as any]: theme.accentSoft,
        }}
      >
        {/* Header */}
        <div
          className="px-8 py-6 border-b flex items-start justify-between sticky top-0"
          style={{
            background: theme.headerBg,
            borderColor: theme.accentBorder,
          }}
        >
          <div className="flex-1 mr-4">
            <input
              className="text-2xl font-bold w-full outline-none focus:ring-2 focus:ring-[var(--accent-ring)] focus:bg-[var(--accent-muted)] rounded-lg px-3 py-2 transition-all -ml-3"
              style={{
                color: theme.textColor,
              }}
              placeholder="Task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-sm mt-2">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: theme.accentSoft,
                  color: theme.accentStrong,
                }}
              >
                {priority}
              </span>
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-[var(--accent-strong)] hover:bg-[var(--accent-muted)] rounded-full transition-all flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Section */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 font-bold" style={{ color: theme.textColor }}>
                <svg className="w-5 h-5" style={{ color: theme.accentStrong }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Description
              </label>
              <textarea
                className="w-full h-48 border rounded-xl p-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all resize-none"
                style={{
                  color: theme.textColor,
                  background: theme.inputBg,
                  borderColor: theme.accentBorder,
                }}
                placeholder="Add a detailed description of the task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Comments Section */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 font-bold" style={{ color: theme.textColor }}>
                <svg className="w-5 h-5" style={{ color: theme.accentStrong }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-2H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 2z" />
                </svg>
                Comments ({comments.length})
              </label>
              
              {/* Existing Comments */}
              {comments.length > 0 && (
                <div
                  className="space-y-3 mb-4 max-h-48 overflow-y-auto p-4 rounded-lg border"
                  style={{
                    background: theme.accentMuted,
                    borderColor: theme.accentBorder,
                  }}
                >
                  {comments.map(c => (
                    <div key={c.id} className="flex gap-3 items-start pb-3 border-b border-slate-200 last:border-b-0">
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: theme.accentStrong }}
                      >
                        JD
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold" style={{ color: theme.textColor }}>{c.author}</p>
                        <p className="text-xs mt-1 break-words" style={{ color: theme.textMuted }}>{c.text}</p>
                        <p className="text-xs text-slate-400 mt-1">{new Date(c.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment Input */}
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: theme.accentStrong }}
                  >
                    JD
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      className="flex-1 border rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] focus:bg-white transition-all"
                      style={{
                        color: theme.textColor,
                        background: theme.inputBg,
                        borderColor: theme.accentBorder,
                      }}
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!comment.trim()}
                      className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        color: theme.accentStrong,
                        background: theme.accentSoft,
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16396127 C3.34915502,0.9 2.40734225,0.9 1.77946707,1.3738096 C0.994623095,2.0076485 0.837654326,3.10044869 1.15159189,3.88593558 L3.03521743,10.3269286 C3.03521743,10.4840259 3.19218622,10.6411233 3.50612381,10.6411233 L16.6915026,11.4266102 C16.6915026,11.4266102 17.1624089,11.4266102 17.1624089,12.0604491 C17.1624089,12.5315722 16.6915026,12.4744748 16.6915026,12.4744748 Z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Priority */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.textMuted }}>Priority Level</label>
              <div className="flex flex-col gap-2">
                {Object.values(Priority).map(p => {
                  const isSelected = priority === p;
                  const priorityColors: Record<string, { bg: string; text: string; border: string }> = {
                    [Priority.HIGH]: { bg: '#fecaca', text: '#dc2626', border: '#ef4444' },
                    [Priority.MEDIUM]: { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' },
                    [Priority.LOW]: { bg: '#d1fae5', text: '#065f46', border: '#10b981' }
                  };
                  const colors = priorityColors[p] || { bg: '#f3f4f6', text: '#4b5563', border: '#d1d5db' };
                  return (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className="px-4 py-3 rounded-lg text-sm font-bold border-2 transition-all text-left"
                      style={{
                        borderColor: isSelected ? colors.border : '#e5e7eb',
                        background: isSelected ? colors.bg : '#ffffff',
                        color: isSelected ? colors.text : theme.textMuted,
                      }}
                    >
                      {p === Priority.HIGH && '🔴 '}
                      {p === Priority.MEDIUM && '🟡 '}
                      {p === Priority.LOW && '🟢 '}
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.textMuted }}>Actions</label>
              <div className="flex flex-col gap-2">
                <div>
                  <button 
                    onClick={handleSetDates}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-all active:scale-95 group w-full hover:brightness-110"
                    style={{
                      color: showDatePicker ? 'white' : theme.textColor,
                      background: showDatePicker ? theme.accentStrong : theme.accentMuted
                    }}
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Set Dates
                  </button>
                  {dueDate && !showDatePicker && (
                    <p
                      className="mt-2 text-xs font-bold px-3 py-2 rounded-lg"
                      style={{
                        color: theme.accentStrong,
                        background: theme.accentSoft,
                      }}
                    >
                      Due: {new Date(dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <button 
                  onClick={handleAddMembers}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-all active:scale-95 group hover:brightness-110"
                  style={{
                    color: showMembers ? 'white' : theme.textColor,
                    background: showMembers ? theme.accentStrong : theme.accentMuted
                  }}
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Add Members
                </button>
              </div>

              {/* Date Picker */}
              {showDatePicker && (
                <div
                  className="mt-4 p-4 border rounded-lg space-y-3"
                  style={{
                    background: theme.accentMuted,
                    borderColor: theme.accentBorder,
                  }}
                >
                  <label className="block text-xs font-bold" style={{ color: theme.textColor }}>Due Date</label>
                  <input 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none font-medium"
                    style={{
                      color: theme.textColor,
                      background: theme.inputBg,
                      borderColor: theme.accentBorder,
                    }}
                  />
                  {dueDate && (
                    <p className="text-xs" style={{ color: theme.textMuted }}>
                      Due: <span className="font-bold">{new Date(dueDate).toLocaleDateString()}</span>
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSaveDueDate}
                      disabled={!dueDate}
                      className="flex-1 px-3 py-2 text-white text-xs font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      style={{ background: theme.accentStrong }}
                    >
                      Save Date
                    </button>
                    <button 
                      onClick={() => setShowDatePicker(false)}
                      className="flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-colors"
                      style={{ color: theme.textColor, background: theme.accentMuted }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Member Selection */}
              {showMembers && (
                <div
                  className="mt-4 p-4 border rounded-lg space-y-3"
                  style={{
                    background: theme.accentMuted,
                    borderColor: theme.accentBorder,
                  }}
                >
                  <label className="block text-xs font-bold" style={{ color: theme.textColor }}>Select Team Members</label>
                  <div className="space-y-2">
                    {teamMembers.map(member => (
                      <label key={member.id} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors">
                        <input 
                          type="checkbox"
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => handleToggleMember(member.id)}
                          className="w-4 h-4 rounded border-slate-300"
                        />
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: theme.accentStrong }}
                        >
                          {member.avatar}
                        </div>
                        <span className="text-sm font-medium" style={{ color: theme.textColor }}>{member.name}</span>
                      </label>
                    ))}
                  </div>
                  {selectedMembers.length > 0 && (
                    <p
                      className="text-xs p-2 rounded"
                      style={{ color: theme.accentStrong, background: theme.accentSoft }}
                    >
                      <span className="font-bold">{selectedMembers.length}</span> member{selectedMembers.length !== 1 ? 's' : ''} selected
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSaveMembers}
                      disabled={selectedMembers.length === 0}
                      className="flex-1 px-3 py-2 text-white text-xs font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      style={{ background: theme.accentStrong }}
                    >
                      Assign Members
                    </button>
                    <button 
                      onClick={() => setShowMembers(false)}
                      className="flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-colors"
                      style={{ color: theme.textColor, background: theme.accentMuted }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Danger Zone */}
            <div className="pt-4 border-t border-slate-200">
              <button 
                onClick={handleDelete}
                className="w-full flex items-center gap-2 px-4 py-3 bg-rose-50 hover:bg-rose-100 rounded-lg text-sm text-rose-700 font-bold transition-colors group border border-rose-200 active:scale-95"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Task
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-8 py-6 border-t flex justify-end gap-3 sticky bottom-0"
          style={{
            background: theme.accentMuted,
            borderColor: theme.accentBorder,
          }}
        >
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[var(--accent-muted)] transition-all active:scale-95"
            style={{ color: theme.textColor }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            className="px-6 py-2.5 rounded-lg text-sm font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            style={{
              background: theme.accentStrong,
              boxShadow: `0 14px 26px -18px ${theme.accentStrong}88`,
            }}
          >
            {isSaving ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
