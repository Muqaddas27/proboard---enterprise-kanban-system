import React, { useState, useEffect } from 'react';
import { getModalTheme, useWallpaperAccent } from '../Dashboard/wallpaperTheme';

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'default' | 'danger';
}

interface ConfirmDialog {
  id: string;
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
}

let confirmDialogs: ConfirmDialog[] = [];
let listeners: ((dialogs: ConfirmDialog[]) => void)[] = [];

export const confirmService = {
  subscribe: (listener: (dialogs: ConfirmDialog[]) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  confirm: (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      const dialog: ConfirmDialog = {
        id: `confirm-${Date.now()}`,
        options,
        resolve,
      };
      confirmDialogs = [...confirmDialogs, dialog];
      listeners.forEach(listener => listener(confirmDialogs));
    });
  },

  dismiss: (id: string, value: boolean) => {
    const dialog = confirmDialogs.find(d => d.id === id);
    if (dialog) {
      dialog.resolve(value);
      confirmDialogs = confirmDialogs.filter(d => d.id !== id);
      listeners.forEach(listener => listener(confirmDialogs));
    }
  },
};

interface ConfirmDialogComponentProps {
  dialog: ConfirmDialog;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialogComponent: React.FC<ConfirmDialogComponentProps> = ({ dialog, onConfirm, onCancel }) => {
  const { options } = dialog;
  const isDanger = options.type === 'danger';
  const wallpaperAccent = useWallpaperAccent();
  const theme = getModalTheme(wallpaperAccent);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <div
        className="rounded-lg shadow-2xl max-w-sm w-full animate-in zoom-in-95 fade-in duration-300 border"
        style={{
          background: theme.surfaceBg,
          borderColor: theme.accentBorder,
          ['--accent-strong' as any]: theme.accentStrong,
          ['--accent-muted' as any]: theme.accentMuted,
          ['--text-primary' as any]: theme.textColor,
          ['--text-muted' as any]: theme.textMuted,
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-5 border-b"
          style={{
            background: theme.headerBg,
            borderColor: theme.accentBorder,
          }}
        >
          <h3 className={`text-lg font-bold ${isDanger ? 'text-rose-300' : 'text-[color:var(--text-primary)]'}`}>
            {options.title}
          </h3>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-[color:var(--text-muted)] text-sm leading-relaxed">{options.message}</p>
        </div>

        {/* Actions */}
        <div
          className="px-6 py-4 border-t rounded-b-xl flex justify-end gap-3"
          style={{
            background: theme.accentMuted,
            borderColor: theme.accentBorder,
          }}
        >
          <button
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-bold text-[color:var(--text-muted)] hover:bg-[var(--accent-muted)] rounded-lg transition-all active:scale-95"
          >
            {options.cancelText || 'Cancel'}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2.5 text-sm font-bold rounded-lg transition-all active:scale-95 text-white ${
              isDanger ? 'bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-200' : ''
            }`}
            style={
              isDanger
                ? undefined
                : {
                    background: theme.accentStrong,
                    boxShadow: `0 14px 26px -18px ${theme.accentStrong}88`,
                  }
            }
          >
            {options.confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmContainer: React.FC = () => {
  const [dialogs, setDialogs] = useState<ConfirmDialog[]>([]);

  useEffect(() => {
    const unsubscribe = confirmService.subscribe((dialogs) => {
      setDialogs(dialogs);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {dialogs.map(dialog => (
        <ConfirmDialogComponent
          key={dialog.id}
          dialog={dialog}
          onConfirm={() => confirmService.dismiss(dialog.id, true)}
          onCancel={() => confirmService.dismiss(dialog.id, false)}
        />
      ))}
    </>
  );
};

export default ConfirmContainer;
