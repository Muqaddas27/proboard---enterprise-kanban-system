import React, { useState } from 'react';
import { notificationService } from '../../services/notificationService';
import { useBoard } from '../../store/boardStore';
import { getModalTheme, useWallpaperAccent } from '../Dashboard/wallpaperTheme';

interface InviteModalProps {
  onClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ onClose }) => {
  const { sendInvitation, activeBoard } = useBoard();
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const wallpaperAccent = useWallpaperAccent();
  const theme = getModalTheme(wallpaperAccent);

  const handleSend = async () => {
    if (!email.trim()) {
      notificationService.warning('Email Required', 'Please enter an email address');
      return;
    }
    if (!email.includes('@')) {
      notificationService.error('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (!activeBoard) {
      notificationService.error('No Board', 'Please select a board first');
      return;
    }

    setIsSending(true);
    const success = await sendInvitation(email, activeBoard.id);
    setIsSending(false);

    if (success) {
      notificationService.success('Invitation Sent', `Email invitation sent to ${email}. They will receive it in their inbox.`);
      setEmail('');
      onClose();
    } else {
      notificationService.error('Failed to Send', 'Could not send invitation. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[450] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <div
        className="w-full max-w-md rounded-lg shadow-2xl overflow-hidden modal animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] flex flex-col border"
        style={{
          background: theme.surfaceBg,
          borderColor: theme.accentBorder,
          ['--accent-strong' as any]: theme.accentStrong,
          ['--accent-muted' as any]: theme.accentMuted,
          ['--accent-ring' as any]: theme.accentRing,
          ['--text-primary' as any]: theme.textColor,
          ['--text-muted' as any]: theme.textMuted,
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
          <div>
            <h3 className="text-lg font-bold text-[color:var(--text-primary)]">Invite Team Member</h3>
            <p className="text-sm text-[color:var(--text-muted)] mt-1">Send an invitation to add a new member to your workspace</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-[color:var(--text-muted)] hover:text-[var(--accent-strong)] hover:bg-[var(--accent-muted)] rounded-full transition-all flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-sm font-bold text-[color:var(--text-primary)] mb-2">Email Address</label>
            <input
              type="email"
              placeholder="colleague@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all font-medium text-[color:var(--text-primary)] placeholder:text-slate-500"
              style={{
                background: theme.inputBg,
                borderColor: theme.accentBorder,
              }}
            />
            <p className="text-xs text-[color:var(--text-muted)] mt-2">Make sure the email is correct. They'll receive an invitation to join.</p>
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
            className="px-5 py-2.5 text-sm font-bold text-[color:var(--text-muted)] hover:bg-[var(--accent-muted)] rounded-lg transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            onClick={handleSend}
            disabled={isSending || !email.trim()}
            className="px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-2"
            style={{
              background: theme.accentStrong,
              boxShadow: `0 14px 26px -18px ${theme.accentStrong}88`,
            }}
          >
            {isSending ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Invitation
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
