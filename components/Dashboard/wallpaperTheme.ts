import { useEffect, useState } from 'react';
import { getAllWallpaperOptions } from './WallpaperSelector';

const WALLPAPER_STORAGE_KEY = 'proboard-wallpaper';
const DEFAULT_ACCENT = 'from-indigo-600 to-indigo-700';

type AccentTheme = {
  accent: string;
  accentStrong: string;
  accentBorder: string;
  accentMuted: string;
  accentSoft: string;
  accentRing: string;
  headerBg: string;
  surfaceBg: string;
  inputBg: string;
  textColor: string;
  textMuted: string;
};

type AccentConfig = {
  key: string;
  accent: string;
  accentStrong: string;
  rgb: string;
};

const ACCENT_CONFIGS: AccentConfig[] = [
  { key: 'blue', accent: '#60a5fa', accentStrong: '#2563eb', rgb: '37, 99, 235' },
  { key: 'purple', accent: '#c4b5fd', accentStrong: '#7c3aed', rgb: '124, 58, 237' },
  { key: 'cyan', accent: '#67e8f9', accentStrong: '#0891b2', rgb: '8, 145, 178' },
  { key: 'emerald', accent: '#6ee7b7', accentStrong: '#059669', rgb: '5, 150, 105' },
  { key: 'amber', accent: '#fcd34d', accentStrong: '#d97706', rgb: '217, 119, 6' },
  { key: 'fuchsia', accent: '#f5a3ff', accentStrong: '#c026d3', rgb: '192, 38, 211' },
  { key: 'sky', accent: '#7dd3fc', accentStrong: '#0284c7', rgb: '2, 132, 199' },
  { key: 'rose', accent: '#fda4af', accentStrong: '#e11d48', rgb: '225, 29, 72' },
  { key: 'slate', accent: '#cbd5f5', accentStrong: '#64748b', rgb: '100, 116, 139' },
  { key: 'indigo', accent: '#a5b4fc', accentStrong: '#4f46e5', rgb: '79, 70, 229' },
];

const buildTheme = (config: AccentConfig): AccentTheme => {
  const rgb = config.rgb;
  return {
    accent: config.accent,
    accentStrong: config.accentStrong,
    accentBorder: `rgba(${rgb}, 0.35)`,
    accentMuted: `rgba(${rgb}, 0.08)`,
    accentSoft: `rgba(${rgb}, 0.14)`,
    accentRing: `rgba(${rgb}, 0.45)`,
    headerBg: `linear-gradient(90deg, rgba(${rgb}, 0.2), rgba(255, 255, 255, 0))`,
    surfaceBg: `linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(${rgb}, 0.1))`,
    inputBg: `rgba(${rgb}, 0.08)`,
    textColor: '#1e293b',
    textMuted: '#64748b',
  };
};

export const getWallpaperAccent = (): string => {
  if (typeof window === 'undefined') return DEFAULT_ACCENT;
  const options = getAllWallpaperOptions();
  const stored = localStorage.getItem(WALLPAPER_STORAGE_KEY);
  const current = options.find(option => option.id === stored) || options[0];
  return current?.cardAccent || DEFAULT_ACCENT;
};

export const useWallpaperAccent = (): string => {
  const [accent, setAccent] = useState<string>(() => getWallpaperAccent());

  useEffect(() => {
    const handleChange = () => {
      setAccent(getWallpaperAccent());
    };

    handleChange();
    window.addEventListener('proboard-wallpaper-change', handleChange);
    return () => window.removeEventListener('proboard-wallpaper-change', handleChange);
  }, []);

  return accent;
};

export const getModalTheme = (cardAccent: string): AccentTheme => {
  const config = ACCENT_CONFIGS.find(entry => cardAccent.includes(entry.key)) || ACCENT_CONFIGS[ACCENT_CONFIGS.length - 1];
  return buildTheme(config);
};
