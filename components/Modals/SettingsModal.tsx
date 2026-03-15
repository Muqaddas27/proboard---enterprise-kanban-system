import React, { useState, useEffect } from 'react';
import { notificationService } from '../../services/notificationService';
import { getModalTheme, useWallpaperAccent } from '../Dashboard/wallpaperTheme';

interface SettingsModalProps {
  type: 'profile' | 'workspace' | 'help';
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ type, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const wallpaperAccent = useWallpaperAccent();
  const theme = getModalTheme(wallpaperAccent);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [onClose]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsSaving(false);
    notificationService.success('Settings Saved', 'Your settings have been updated');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[450] flex items-center justify-center p-4 bg-slate-950/55 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-3xl rounded shadow-2xl overflow-hidden modal animate-in zoom-in-95 fade-in duration-300 max-h-[92vh] flex flex-col border"
        style={{
          background: theme.surfaceBg,
          borderColor: theme.accentBorder,
          ['--accent-strong' as any]: theme.accentStrong,
          ['--accent-muted' as any]: theme.accentMuted,
          ['--accent-ring' as any]: theme.accentRing,
          ['--accent-soft' as any]: theme.accentSoft,
          ['--text-primary' as any]: theme.textColor,
          ['--text-muted' as any]: theme.textMuted,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="px-6 sm:px-8 py-5 border-b"
          style={{
            background: theme.headerBg,
            borderColor: theme.accentBorder,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-[color:var(--text-primary)]">
                {type === 'profile' && 'Profile Settings'}
                {type === 'workspace' && 'Workspace Settings'}
                {type === 'help' && 'Help and Support'}
              </h3>
              <p className="text-xs text-[color:var(--text-muted)] mt-1 uppercase tracking-[0.18em] font-bold">
                {type === 'profile' && 'Identity and account protection'}
                {type === 'workspace' && 'Team operations and workspace defaults'}
                {type === 'help' && 'Resources and assistance'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[color:var(--text-muted)] hover:text-[var(--accent-strong)] hover:bg-[var(--accent-muted)] rounded transition-all flex-shrink-0"
              aria-label="Close settings modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {type === 'profile' && (
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-black text-[color:var(--text-muted)] mb-2 uppercase tracking-[0.18em]">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)]"
                  style={{
                    background: theme.inputBg,
                    borderColor: theme.accentBorder,
                  }}
                />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[color:var(--text-muted)] mb-2 uppercase tracking-[0.18em]">Email Address</label>
                <input
                  type="email"
                  defaultValue="john.doe@company.com"
                  className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)]"
                  style={{
                    background: theme.inputBg,
                    borderColor: theme.accentBorder,
                  }}
                />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[color:var(--text-muted)] mb-2 uppercase tracking-[0.18em]">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)]"
                  style={{
                    background: theme.inputBg,
                    borderColor: theme.accentBorder,
                  }}
                />
                <p className="text-xs text-[color:var(--text-muted)] mt-2">Change your password to secure your account.</p>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: theme.accentBorder }}>
                <div
                  className="border rounded p-4"
                  style={{
                    background: theme.accentMuted,
                    borderColor: theme.accentBorder,
                  }}
                >
                  <p className="text-sm text-[color:var(--text-primary)] font-black">Two-Factor Authentication</p>
                  <p className="text-xs text-[color:var(--text-muted)] mt-1">Protect your account with 2FA.</p>
                  <button
                    onClick={() => notificationService.info('Setup Started', '2FA setup wizard will be available in the next release')}
                    className="mt-3 px-4 py-2 text-white text-sm font-black rounded transition-colors"
                    style={{ background: theme.accentStrong }}
                  >
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {type === 'workspace' && (
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-black text-[color:var(--text-muted)] mb-2 uppercase tracking-[0.18em]">Workspace Name</label>
                <input
                  type="text"
                  defaultValue="ProBoard Team"
                  className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)]"
                  style={{
                    background: theme.inputBg,
                    borderColor: theme.accentBorder,
                  }}
                />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[color:var(--text-muted)] mb-2 uppercase tracking-[0.18em]">Team Members</label>
                <div
                  className="rounded p-4 space-y-3 border"
                  style={{
                    background: theme.accentMuted,
                    borderColor: theme.accentBorder,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm"
                        style={{ background: theme.accentStrong }}
                      >
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-black text-[color:var(--text-primary)]">John Doe</p>
                        <p className="text-xs text-[color:var(--text-muted)]">owner</p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-black px-3 py-1 rounded-full"
                      style={{
                        color: theme.accentStrong,
                        background: theme.accentSoft,
                      }}
                    >
                      Owner
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-black text-[color:var(--text-muted)] mb-2 uppercase tracking-[0.18em]">Notification Settings</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300" />
                    <span className="text-sm text-[color:var(--text-primary)]">Email notifications for board updates</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300" />
                    <span className="text-sm text-[color:var(--text-primary)]">Notify me when assigned to tasks</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                    <span className="text-sm text-[color:var(--text-primary)]">Digest emails (weekly summary)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {type === 'help' && (
            <div className="space-y-6">
              <div
                className="border rounded p-4"
                style={{
                  background: theme.accentMuted,
                  borderColor: theme.accentBorder,
                }}
              >
                <p className="text-sm font-black text-[color:var(--text-primary)]">Email Support</p>
                <p className="text-sm text-[color:var(--text-primary)] mt-2">support@proboard.com</p>
                <p className="text-xs text-[color:var(--text-muted)] mt-1">Response time: 24 hours</p>
              </div>
              <div
                className="border rounded p-4"
                style={{
                  background: theme.accentMuted,
                  borderColor: theme.accentBorder,
                }}
              >
                <p className="text-sm font-black text-[color:var(--text-primary)]">Documentation</p>
                <p className="text-sm text-[color:var(--text-primary)] mt-2">Visit our knowledge base for guides and tutorials</p>
                <button
                  type="button"
                  onClick={() => notificationService.info('Documentation', 'Knowledge base access will be connected soon')}
                  className="text-xs font-black hover:text-[color:var(--text-primary)] mt-2 inline-block"
                  style={{ color: theme.accentStrong }}
                >
                  View Docs {'->'}
                </button>
              </div>
              <div
                className="border rounded p-4"
                style={{
                  background: theme.accentMuted,
                  borderColor: theme.accentBorder,
                }}
              >
                <p className="text-sm font-black text-[color:var(--text-primary)]">Report an Issue</p>
                <p className="text-sm text-[color:var(--text-primary)] mt-2">Found a bug? Let us know and we will fix it</p>
                <button
                  type="button"
                  onClick={() => notificationService.info('Issue Reported', 'Issue intake form will be available soon')}
                  className="text-xs font-black hover:text-[color:var(--text-primary)] mt-2"
                  style={{ color: theme.accentStrong }}
                >
                  Report Issue {'->'}
                </button>
              </div>
              <div>
                <p className="text-sm font-black text-[color:var(--text-primary)] mb-3">Frequently Asked Questions</p>
                <div className="space-y-3">
                  <details className="border rounded p-3 cursor-pointer" style={{ borderColor: theme.accentBorder }}>
                    <summary className="font-bold text-[color:var(--text-primary)] text-sm">How do I invite team members?</summary>
                    <p className="text-xs text-[color:var(--text-muted)] mt-2">Click the invite button on your board and enter their email address.</p>
                  </details>
                  <details className="border rounded p-3 cursor-pointer" style={{ borderColor: theme.accentBorder }}>
                    <summary className="font-bold text-[color:var(--text-primary)] text-sm">Can I archive boards?</summary>
                    <p className="text-xs text-[color:var(--text-muted)] mt-2">Yes, archived boards are hidden but can be recovered anytime.</p>
                  </details>
                  <details className="border rounded p-3 cursor-pointer" style={{ borderColor: theme.accentBorder }}>
                    <summary className="font-bold text-[color:var(--text-primary)] text-sm">What are the board permissions?</summary>
                    <p className="text-xs text-[color:var(--text-muted)] mt-2">Owner has full control, Members can edit, Viewers can only read.</p>
                  </details>
                </div>
              </div>
            </div>
          )}
        </div>

        {type !== 'help' && (
          <div
            className="px-6 sm:px-8 py-5 border-t flex justify-end gap-3"
            style={{
              background: theme.accentMuted,
              borderColor: theme.accentBorder,
            }}
          >
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-black text-[color:var(--text-muted)] hover:bg-[var(--accent-muted)] rounded transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2.5 text-sm font-black text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded"
              style={{
                background: theme.accentStrong,
                boxShadow: `0 14px 26px -18px ${theme.accentStrong}88`,
              }}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        {type === 'help' && (
          <div
            className="px-6 sm:px-8 py-5 border-t flex justify-end"
            style={{
              background: theme.accentMuted,
              borderColor: theme.accentBorder,
            }}
          >
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-black text-[color:var(--text-muted)] hover:bg-[var(--accent-muted)] rounded transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
