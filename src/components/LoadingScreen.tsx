import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // Fallback: If video doesn't trigger onEnded for any reason, hide after 10 seconds
    const timeout = setTimeout(() => setIsExiting(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-1000 ease-in-out bg-black ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
        }`}
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={() => setIsExiting(true)}
        className="w-full h-full object-cover"
      >
        <source src="/videos/loading-video.mp4" type="video/source" />
        <source src="/videos/loading-video.mp4" type="video/mp4" />
      </video>

      {/* Skip button for returning users */}
      {!isExiting && (
        <button
          onClick={() => setIsExiting(true)}
          className="absolute bottom-10 right-10 z-[110] px-6 py-2 rounded-full glass-card text-white/50 hover:text-white transition-all text-xs font-bold tracking-widest uppercase"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
}
