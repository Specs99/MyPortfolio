import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const imagesToPreload = [
      // Character Images
      '/images/character-hoodie.png',
      '/images/character-sigma.png',
      '/images/character-specs.png',
      '/images/character-zayan.png',
      '/images/mascot-guide.png',
      // Backgrounds (Preload both sets for instant theme switching)
      '/images/dungeon-hero.jpg',
      '/images/hero-sky.jpg',
      '/images/dungeon-about.jpg',
      '/images/floating-island.jpg',
      '/images/dungeon-projects.jpg',
      '/images/waterfall-scene.jpg',
      '/images/dungeon-links.jpg',
      '/images/dungeon-contact.jpg',
      '/images/shrine-gate.jpg'
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    // Minimum load time for branding/intro feel
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000));

    const loadImages = imagesToPreload.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.floor((loadedCount / totalImages) * 100));
          resolve(src);
        };
        img.onerror = () => {
          loadedCount++; // Count even on error to not block forever
          setProgress(Math.floor((loadedCount / totalImages) * 100));
          resolve(src);
        };
      });
    });

    Promise.all([...loadImages, minTimePromise]).then(() => {
      setProgress(100);
      setTimeout(() => setIsExiting(true), 800);
    });

  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-1000 ease-in-out ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
        }`}
      style={{
        background: isDark ? '#050510' : '#F0F9FF'
      }}
    >
      {/* Background Hero Elements */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: isDark ? 'url(/images/dungeon-bg.jpg)' : 'url(/images/hero-sky.jpg)',
          filter: isDark ? 'blur(8px) brightness(0.25)' : 'blur(4px) opacity(0.3)',
        }}
      />

      {/* Main Welcome Card */}
      <div className={`relative z-10 w-full max-w-lg mx-4 p-8 rounded-[2.5rem] glass-card backdrop-blur-2xl transition-all duration-700 ${isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}>

        {/* Character Avatar */}
        <div className="mb-8 relative flex justify-center">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center relative shadow-2xl overflow-hidden ${isDark ? 'bg-[#1a1a2e]' : 'bg-white'
            }`}>
            <div className={`absolute inset-0 opacity-20 animate-pulse ${isDark ? 'bg-gradient-to-br from-[#9d4edd] to-[#7b2cbf]' : 'bg-gradient-to-br from-[#FFD700] to-[#FFA500]'
              }`} />

            <div className="relative z-10">
              <img
                src="/images/character-hoodie.png"
                alt="Specs"
                className="w-24 h-24 object-contain animate-soft-float"
              />
            </div>
          </div>

          <div className={`absolute inset-[-15px] rounded-full border border-dashed animate-spin ${isDark ? 'border-[#9d4edd]/30' : 'border-[#FFD700]/30'
            }`} style={{ animationDuration: '15s' }} />
        </div>

        {/* Welcoming Text */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-black mb-3 tracking-tight ${isDark ? 'text-white' : 'text-[#0f172a]'
            }`}>
            Hey! How are you?
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${isDark ? 'bg-[#9d4edd]/20 text-[#e0aaff]' : 'bg-[#FFD700]/20 text-[#b45309]'
              }`}>
              Welcome to My World
            </span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-4">
          <div className={`h-3 w-full rounded-full overflow-hidden p-0.5 ${isDark ? 'bg-black/40 border border-white/5' : 'bg-slate-100 border border-slate-200'
            }`}>
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out relative ${isDark
                ? 'bg-gradient-to-r from-[#7b2cbf] via-[#9d4edd] to-[#e0aaff]'
                : 'bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700]'
                }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>

          <div className="flex justify-between items-center px-1">
            <span className={`text-[11px] font-bold ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
              {progress < 30 ? 'Grabbing my glasses...' : progress < 70 ? 'Setting the scene...' : 'Almost there!'}
            </span>
            <span className={`text-sm font-black tabular-nums ${isDark ? 'text-[#e0aaff]' : 'text-[#f59e0b]'
              }`}>
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>

      </div>

      {/* Ambiance Effects */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] pointer-events-none opacity-20 ${isDark ? 'bg-purple-900' : 'bg-blue-200'
        }`} />
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] blur-[150px] pointer-events-none opacity-20 ${isDark ? 'bg-indigo-900' : 'bg-amber-100'
        }`} />
    </div>
  );
}
