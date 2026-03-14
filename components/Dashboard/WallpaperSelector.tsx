import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface WallpaperOption {
  id: string;
  name: string;
  gradient: string;
  gridColor: string;
  orbColors: { color1: string; color2: string }[];
  image: string;
  cardAccent: string; // Primary accent color for cards
  cardAccentHover: string; // Darker shade for hover
}

interface WallpaperSelectorProps {
  currentWallpaper: string;
  onSelectWallpaper: (wallpaperId: string) => void;
}

const CUSTOM_WALLPAPERS_KEY = 'proboard_custom_wallpapers';

type CustomWallpaperRecord = {
  id: string;
  name: string;
  image: string;
};

const BASE_WALLPAPER_OPTIONS: WallpaperOption[] = [
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    gradient: 'from-slate-950 via-blue-900 to-slate-950',
    gridColor: 'rgba(68, 132, 248, .05)',
    orbColors: [
      { color1: 'from-blue-500', color2: 'to-cyan-500' },
      { color1: 'from-purple-500', color2: 'to-pink-500' }
    ],
    image: 'https://images.unsplash.com/photo-1639405226380-2fef8b0e36b6?w=1920&q=80',
    cardAccent: 'from-blue-600 to-blue-700',
    cardAccentHover: 'from-blue-700 to-blue-800'
  },
  {
    id: 'deep-purple',
    name: 'Deep Purple',
    gradient: 'from-slate-950 via-purple-900 to-slate-950',
    gridColor: 'rgba(147, 51, 234, .05)',
    orbColors: [
      { color1: 'from-purple-500', color2: 'to-pink-500' },
      { color1: 'from-indigo-500', color2: 'to-purple-500' }
    ],
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=1920&q=80',
    cardAccent: 'from-purple-600 to-purple-700',
    cardAccentHover: 'from-purple-700 to-purple-800'
  },
  {
    id: 'ocean-night',
    name: 'Ocean Night',
    gradient: 'from-slate-950 via-cyan-900 to-blue-950',
    gridColor: 'rgba(34, 211, 238, .05)',
    orbColors: [
      { color1: 'from-cyan-500', color2: 'to-blue-500' },
      { color1: 'from-teal-500', color2: 'to-cyan-500' }
    ],
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80',
    cardAccent: 'from-cyan-600 to-cyan-700',
    cardAccentHover: 'from-cyan-700 to-cyan-800'
  },
  {
    id: 'dark-green',
    name: 'Dark Forest',
    gradient: 'from-slate-950 via-emerald-900 to-slate-950',
    gridColor: 'rgba(16, 185, 129, .05)',
    orbColors: [
      { color1: 'from-emerald-500', color2: 'to-green-500' },
      { color1: 'from-teal-500', color2: 'to-emerald-500' }
    ],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
    cardAccent: 'from-emerald-600 to-emerald-700',
    cardAccentHover: 'from-emerald-700 to-emerald-800'
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    gradient: 'from-slate-950 via-amber-900 to-slate-950',
    gridColor: 'rgba(245, 158, 11, .05)',
    orbColors: [
      { color1: 'from-amber-500', color2: 'to-orange-500' },
      { color1: 'from-red-500', color2: 'to-amber-500' }
    ],
    image: 'https://images.unsplash.com/photo-1495567720989-73e7d5e0f715?w=1920&q=80',
    cardAccent: 'from-amber-600 to-amber-700',
    cardAccentHover: 'from-amber-700 to-amber-800'
  },
  {
    id: 'neon-night',
    name: 'Neon Night',
    gradient: 'from-slate-950 via-fuchsia-900 to-slate-950',
    gridColor: 'rgba(236, 72, 153, .05)',
    orbColors: [
      { color1: 'from-fuchsia-500', color2: 'to-pink-500' },
      { color1: 'from-rose-500', color2: 'to-fuchsia-500' }
    ],
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80',
    cardAccent: 'from-fuchsia-600 to-fuchsia-700',
    cardAccentHover: 'from-fuchsia-700 to-fuchsia-800'
  },
  {
    id: 'glacier-blue',
    name: 'Glacier Blue',
    gradient: 'from-slate-950 via-sky-900 to-slate-950',
    gridColor: 'rgba(56, 189, 248, .05)',
    orbColors: [
      { color1: 'from-sky-500', color2: 'to-cyan-500' },
      { color1: 'from-blue-500', color2: 'to-sky-500' }
    ],
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1920&q=80',
    cardAccent: 'from-sky-600 to-sky-700',
    cardAccentHover: 'from-sky-700 to-sky-800'
  },
  {
    id: 'crimson-dusk',
    name: 'Crimson Dusk',
    gradient: 'from-slate-950 via-rose-900 to-slate-950',
    gridColor: 'rgba(244, 63, 94, .05)',
    orbColors: [
      { color1: 'from-rose-500', color2: 'to-red-500' },
      { color1: 'from-red-500', color2: 'to-amber-500' }
    ],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920&q=80',
    cardAccent: 'from-rose-600 to-rose-700',
    cardAccentHover: 'from-rose-700 to-rose-800'
  },
  {
    id: 'stormy-gray',
    name: 'Stormy Gray',
    gradient: 'from-slate-950 via-slate-800 to-slate-950',
    gridColor: 'rgba(148, 163, 184, .05)',
    orbColors: [
      { color1: 'from-slate-500', color2: 'to-slate-600' },
      { color1: 'from-gray-500', color2: 'to-slate-500' }
    ],
    image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1920&q=80',
    cardAccent: 'from-slate-600 to-slate-700',
    cardAccentHover: 'from-slate-700 to-slate-800'
  },
  {
    id: 'aurora-glow',
    name: 'Aurora Glow',
    gradient: 'from-slate-950 via-emerald-900 to-slate-950',
    gridColor: 'rgba(16, 185, 129, .05)',
    orbColors: [
      { color1: 'from-emerald-500', color2: 'to-cyan-500' },
      { color1: 'from-teal-500', color2: 'to-emerald-500' }
    ],
    image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1920&q=80',
    cardAccent: 'from-emerald-600 to-emerald-700',
    cardAccentHover: 'from-emerald-700 to-emerald-800'
  }
];

const getCustomWallpaperRecords = (): CustomWallpaperRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_WALLPAPERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CustomWallpaperRecord[];
  } catch {
    return [];
  }
};

const saveCustomWallpaperRecords = (records: CustomWallpaperRecord[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CUSTOM_WALLPAPERS_KEY, JSON.stringify(records));
};

const getCustomWallpapers = (): WallpaperOption[] => {
  const records = getCustomWallpaperRecords();
  return records.map((record, index) => ({
    id: record.id,
    name: record.name || `Custom ${index + 1}`,
    gradient: 'from-slate-950 via-slate-900 to-slate-950',
    gridColor: 'rgba(148, 163, 184, .05)',
    orbColors: [
      { color1: 'from-indigo-500', color2: 'to-blue-500' },
      { color1: 'from-blue-500', color2: 'to-cyan-500' }
    ],
    image: record.image,
    cardAccent: 'from-indigo-600 to-indigo-700',
    cardAccentHover: 'from-indigo-700 to-indigo-800'
  }));
};

const getAllWallpaperOptions = (): WallpaperOption[] => {
  return [...getCustomWallpapers(), ...BASE_WALLPAPER_OPTIONS];
};

const WallpaperSelector: React.FC<WallpaperSelectorProps> = ({
  currentWallpaper,
  onSelectWallpaper
}) => {
  console.log('🎨 WallpaperSelector loaded, current:', currentWallpaper);
  const [isOpen, setIsOpen] = useState(false);
  console.log('🔓 Dropdown isOpen:', isOpen);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [options, setOptions] = useState<WallpaperOption[]>(() => getAllWallpaperOptions());
  const activeTheme = options.find((option) => option.id === currentWallpaper) || BASE_WALLPAPER_OPTIONS[0];
  const getAccentColor = (accent: string) => {
    if (accent.includes('blue')) return '#60a5fa';
    if (accent.includes('purple')) return '#c4b5fd';
    if (accent.includes('cyan')) return '#67e8f9';
    if (accent.includes('emerald')) return '#6ee7b7';
    if (accent.includes('amber')) return '#fcd34d';
    if (accent.includes('fuchsia')) return '#f5a3ff';
    if (accent.includes('sky')) return '#7dd3fc';
    if (accent.includes('rose')) return '#fda4af';
    if (accent.includes('slate')) return '#cbd5e1';
    return '#a5b4fc';
  };
  const accentColor = getAccentColor(activeTheme.cardAccent);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update dropdown position when it opens
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const opts = getAllWallpaperOptions();
      console.log('📋 Loading wallpaper options:', opts.length);
      setOptions(opts);
    }
  }, [isOpen]);

  const handleOpenGallery = () => {
    fileInputRef.current?.click();
  };

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Failed to read image'));
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const newRecord: CustomWallpaperRecord = {
        id: `custom-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, '') || 'Custom Wallpaper',
        image: dataUrl
      };

      const existing = getCustomWallpaperRecords();
      const updated = [newRecord, ...existing];
      saveCustomWallpaperRecords(updated);
      setOptions(getAllWallpaperOptions());
      onSelectWallpaper(newRecord.id);
      setIsOpen(false);
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={() => {
          console.log('🔘 Wallpaper button clicked, opening:', !isOpen);
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 transition-all hover:translate-y-[-2px]"
        title="Change wallpaper"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 .267M7 21H5a2 2 0 01-2-2v-4a2 2 0 012-2h2.5" />
        </svg>
        Wallpaper
      </button>

      {isOpen && createPortal(
        <>
          <div
            className="fixed inset-0 z-[99998]"
            onClick={() => {
              console.log('🚫 Backdrop clicked, closing dropdown');
              setIsOpen(false);
            }}
          />
          <div
            className={`fixed w-80 max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto bg-gradient-to-br ${activeTheme.gradient} border border-white/25 rounded-lg p-4 shadow-2xl z-[99999]`}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              borderColor: `${accentColor}88`,
              boxShadow: `0 20px 40px -16px ${accentColor}77`
            }}
            onMouseDown={(e) => {
              console.log('📦 Dropdown mousedown');
              e.stopPropagation();
            }}
            onClick={(e) => {
              console.log('📦 Dropdown container clicked');
              e.stopPropagation();
            }}
          >
            <div className="absolute inset-0 bg-slate-950/35 rounded-lg pointer-events-none" />
            <h3 className="relative z-10 text-sm font-bold text-white mb-3 px-2">Choose Wallpaper</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('📂 Gallery button clicked');
                  handleOpenGallery();
                }}
                className="group relative overflow-hidden rounded-lg p-3 transition-all bg-black/25 hover:bg-black/40 border border-dashed border-white/25 hover:border-[var(--accent)]"
                style={{
                  ['--accent' as any]: accentColor,
                  ['--accent-soft' as any]: `${accentColor}22`
                }}
                type="button"
              >
                <div className="relative z-10 flex flex-col items-center justify-center gap-2 h-full min-h-[88px]">
                  <div className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16l4-4a3 3 0 014 0l2 2a3 3 0 004 0l4-4" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 7h7m0 0v7m0-7L10 18" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-white">Choose from Gallery</span>
                </div>
              </button>
              {options.map((option) => (
                <button
                  key={option.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🖱️ Wallpaper mousedown:', option.id, option.name);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🖱️ Wallpaper clicked:', option.id, option.name);
                    onSelectWallpaper(option.id);
                    setIsOpen(false);
                  }}
                  className={`group relative overflow-hidden rounded-lg p-3 transition-all cursor-pointer ${
                    currentWallpaper === option.id
                      ? 'bg-black/45 border'
                      : 'hover:bg-black/40 bg-black/20 border border-white/15 hover:border-[var(--accent)]'
                  }`}
                  style={{
                    minHeight: '100px',
                    position: 'relative',
                    zIndex: 1,
                    borderColor: currentWallpaper === option.id ? accentColor : `${accentColor}55`,
                    boxShadow: currentWallpaper === option.id ? `0 0 0 2px ${accentColor}99` : 'none',
                    ['--accent' as any]: accentColor,
                    ['--accent-soft' as any]: `${accentColor}22`
                  }}
                >
                  <div className="relative z-10 pointer-events-none">
                    <p className="text-xs font-bold text-white">{option.name}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Close hint */}
            <p className="relative z-10 text-xs text-white/70 mt-3 px-2 text-center">Click outside to close</p>
          </div>
        </>,
        document.body
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export { BASE_WALLPAPER_OPTIONS as WALLPAPER_OPTIONS, getAllWallpaperOptions };
export default WallpaperSelector;
