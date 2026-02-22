
import React, { useState } from 'react';
import { Board } from '../../types';
import { useBoard } from '../../store/boardStore';
import { notificationService } from '../../services/notificationService';
import { confirmService } from './ConfirmContainer';
import { getModalTheme, useWallpaperAccent } from '../Dashboard/wallpaperTheme';

interface BoardSettingsModalProps {
  board: Board;
  onClose: () => void;
}

const BoardSettingsModal: React.FC<BoardSettingsModalProps> = ({ board, onClose }) => {
  const { renameBoard, deleteBoard } = useBoard();
  const [title, setTitle] = useState(board.title);
  const [isSaving, setIsSaving] = useState(false);
  const wallpaperAccent = useWallpaperAccent();
  const theme = getModalTheme(wallpaperAccent);

  const handleSave = async () => {
    if (!title.trim()) {
      notificationService.error('Board Name Required', 'Please enter a board name');
      return;
    }
    setIsSaving(true);
    if (title.trim() && title !== board.title) {
      renameBoard(board.id, title);
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsSaving(false);
    notificationService.success('Board Updated', 'Your board name has been updated');
    onClose();
  };

  const handleDelete = async () => {
    const confirmed = await confirmService.confirm({
      title: 'Delete Board',
      message: `Are you absolutely sure you want to delete "${board.title}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
    });
    if (confirmed) {
      deleteBoard(board.id);
      notificationService.success('Board Deleted', 'The board has been removed');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 modal max-h-[90vh] flex flex-col border"
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
          className="px-8 py-6 border-b flex items-center justify-between"
          style={{
            background: theme.headerBg,
            borderColor: theme.accentBorder,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style={{ background: theme.accentStrong }}
            >
              {board.title.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-lg font-bold text-slate-900">Board Settings</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-[var(--accent-strong)] hover:bg-[var(--accent-muted)] rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8 space-y-8 overflow-y-auto flex-1">
          {/* Board Name Section */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Board Name</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input 
                  type="text"
                  placeholder="Enter board name..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all font-medium text-slate-900"
                  style={{
                    background: theme.inputBg,
                    borderColor: theme.accentBorder,
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-500">Rename your board to keep track of what you're building.</p>
          </div>

          {/* Board Info */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Board Info</label>
            <div
              className="rounded-lg p-4 space-y-2 border"
              style={{
                background: theme.accentMuted,
                borderColor: theme.accentBorder,
              }}
            >
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Total Columns:</span>
                <span className="text-slate-900 font-bold">{board.lists.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Total Tasks:</span>
                <span className="text-slate-900 font-bold">{board.lists.reduce((sum, list) => sum + list.cards.length, 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Created:</span>
                <span className="text-slate-900 font-bold">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold text-rose-600 uppercase tracking-widest">Danger Zone</label>
            <button 
              onClick={handleDelete}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg transition-all border border-rose-200 group active:scale-95"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete This Board
            </button>
            <p className="text-xs text-slate-500">This action cannot be undone. Be careful!</p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-8 py-6 border-t flex justify-end gap-3"
          style={{
            background: theme.accentMuted,
            borderColor: theme.accentBorder,
          }}
        >
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-[var(--accent-muted)] rounded-lg transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving || !title.trim() || title === board.title}
            className="px-5 py-2.5 text-sm font-bold text-white rounded-lg shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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

        {/* Delete Confirmation Modal */}
      </div>
    </div>
  );
};

export default BoardSettingsModal;
