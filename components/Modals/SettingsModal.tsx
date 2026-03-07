import React, { useState } from 'react';
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

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsSaving(false);
    notificationService.success('Settings Saved', 'Your settings have been updated');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <div
        className="w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden modal animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] flex flex-col border"
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
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {type === 'profile' && 'Profile Settings'}
              {type === 'workspace' && 'Workspace Settings'}
              {type === 'help' && 'Help & Support'}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-[var(--accent-strong)] hover:bg-[var(--accent-muted)] rounded-full transition-all flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1">
          {type === 'profile' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Full Name</label>
                <input 
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all"
                  style={{
                    background: theme.inputBg,
                    borderColor: theme.accentBorder,
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                <input 
                  type="email"
                  defaultValue="john.doe@company.com"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all"
                  style={{
                    background: theme.inputBg,
                    borderColor: theme.accentBorder,
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Password</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all"
                  style={{
                    background: theme.inputBg,
                    borderColor: theme.accentBorder,
                  }}
                />
                <p className="text-xs text-slate-500 mt-2">Change your password to secure your account</p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <div
                  className="border rounded-lg p-4"
                  style={{
                    background: theme.accentMuted,
                    borderColor: theme.accentBorder,
                  }}
                >
                  <p className="text-sm text-slate-900 font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-600 mt-1">Protect your account with 2FA</p>
                  <button
                    className="mt-3 px-4 py-2 text-white text-sm font-bold rounded-lg transition-colors"
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
                <label className="block text-sm font-bold text-slate-900 mb-2">Workspace Name</label>
                <input 
                  type="text"
                  defaultValue="ProBoard Team"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-strong)] outline-none transition-all"
                  style={{
                    background: theme.inputBg,
                    borderColor: theme.accentBorder,
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Team Members</label>
                <div
                  className="rounded-lg p-4 space-y-3 border"
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
                        <p className="text-sm font-bold text-slate-900">John Doe</p>
                        <p className="text-xs text-slate-500">owner</p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
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
                <label className="block text-sm font-bold text-slate-900 mb-2">Notification Settings</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300" />
                    <span className="text-sm text-slate-700">Email notifications for board updates</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300" />
                    <span className="text-sm text-slate-700">Notify me when assigned to tasks</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                    <span className="text-sm text-slate-700">Digest emails (weekly summary)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {type === 'help' && (
            <div className="space-y-6">
              <div
                className="border rounded-lg p-4"
                style={{
                  background: theme.accentMuted,
                  borderColor: theme.accentBorder,
                }}
              >
                <p className="text-sm font-bold text-slate-900">📧 Email Support</p>
                <p className="text-sm text-slate-700 mt-2">support@proboard.com</p>
                <p className="text-xs text-slate-600 mt-1">Response time: 24 hours</p>
              </div>
              <div
                className="border rounded-lg p-4"
                style={{
                  background: theme.accentMuted,
                  borderColor: theme.accentBorder,
                }}
              >
                <p className="text-sm font-bold text-slate-900">📚 Documentation</p>
                <p className="text-sm text-slate-700 mt-2">Visit our knowledge base for guides and tutorials</p>
                <a href="#" className="text-xs font-bold hover:text-slate-900 mt-2 inline-block" style={{ color: theme.accentStrong }}>
                  View Docs →
                </a>
              </div>
              <div
                className="border rounded-lg p-4"
                style={{
                  background: theme.accentMuted,
                  borderColor: theme.accentBorder,
                }}
              >
                <p className="text-sm font-bold text-slate-900">🐛 Report an Issue</p>
                <p className="text-sm text-slate-700 mt-2">Found a bug? Let us know and we'll fix it</p>
                <button className="text-xs font-bold hover:text-slate-900 mt-2" style={{ color: theme.accentStrong }}>
                  Report Issue →
                </button>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-3">Frequently Asked Questions</p>
                <div className="space-y-3">
                  <details className="border rounded-lg p-3 cursor-pointer" style={{ borderColor: theme.accentBorder }}>
                    <summary className="font-bold text-slate-700 text-sm">How do I invite team members?</summary>
                    <p className="text-xs text-slate-500 mt-2">Click the invite button on your board and enter their email address.</p>
                  </details>
                  <details className="border rounded-lg p-3 cursor-pointer" style={{ borderColor: theme.accentBorder }}>
                    <summary className="font-bold text-slate-700 text-sm">Can I archive boards?</summary>
                    <p className="text-xs text-slate-500 mt-2">Yes, archived boards are hidden but can be recovered anytime.</p>
                  </details>
                  <details className="border rounded-lg p-3 cursor-pointer" style={{ borderColor: theme.accentBorder }}>
                    <summary className="font-bold text-slate-700 text-sm">What are the board permissions?</summary>
                    <p className="text-xs text-slate-500 mt-2">Owner has full control, Members can edit, Viewers can only read.</p>
                  </details>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {type !== 'help' && (
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
              disabled={isSaving}
              className="px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
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
            className="px-8 py-6 border-t flex justify-end"
            style={{
              background: theme.accentMuted,
              borderColor: theme.accentBorder,
            }}
          >
            <button 
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-[var(--accent-muted)] rounded-lg transition-all active:scale-95"
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
