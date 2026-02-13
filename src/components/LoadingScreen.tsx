import { useEffect, useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`loading-screen transition-all duration-1000 ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      style={{
        background: isDark
          ? 'radial-gradient(ellipse at center, #3c096c 0%, #240046 40%, #10002b 100%)'
          : 'linear-gradient(180deg, #87CEEB 0%, #A8D5E5 100%)'
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: isDark ? 'url(/images/dungeon-bg.jpg)' : 'url(/images/hero-sky.jpg)',
          filter: isDark ? 'blur(12px) brightness(0.35)' : 'blur(10px)',
          opacity: isDark ? 0.7 : 0.5
        }}
      />

      {/* Dark Theme - Floating Particles */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: i % 3 === 0 ? '#e0aaff' : i % 3 === 1 ? '#9d4edd' : '#c77dff',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                boxShadow: `0 0 ${6 + Math.random() * 10}px ${i % 3 === 0 ? '#e0aaff' : '#9d4edd'}`,
                opacity: 0.4 + Math.random() * 0.6,
              }}
            />
          ))}
        </div>
      )}

      {/* Dark Theme - Ambient Glow Orbs */}
      {isDark && (
        <>
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full animate-pulse pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(157,78,221,0.25) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animationDuration: '4s',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full animate-pulse pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(224,170,255,0.2) 0%, transparent 70%)',
              filter: 'blur(30px)',
              animationDuration: '5s',
              animationDelay: '1s',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(123,44,191,0.15) 0%, transparent 60%)',
              filter: 'blur(60px)',
              animation: 'auraPulse 3s ease-in-out infinite',
            }}
          />
        </>
      )}

      {/* Dark Theme - Scan Lines Effect */}
      {isDark && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(157,78,221,0.03) 2px, rgba(157,78,221,0.03) 4px)',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Icon */}
        <div className="mb-8 relative">
          <div className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center shadow-2xl ${isDark
              ? 'bg-gradient-to-br from-[#9d4edd] to-[#7b2cbf]'
              : 'bg-gradient-to-br from-[#FFD700] to-[#FFA500]'
            }`}
            style={{
              boxShadow: isDark
                ? '0 0 40px rgba(157,78,221,0.6), 0 0 80px rgba(157,78,221,0.3), inset 0 0 30px rgba(224,170,255,0.2)'
                : '0 0 30px rgba(255,215,0,0.5)',
              animation: 'auraPulse 2s ease-in-out infinite',
            }}
          >
            {isDark ? <Zap className="w-14 h-14 text-white drop-shadow-lg" /> : <Sparkles className="w-12 h-12 text-white" />}
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <div className={`absolute -top-2 left-1/2 w-3 h-3 rounded-full ${isDark ? 'bg-[#e0aaff]' : 'bg-white'}`}
              style={{ boxShadow: isDark ? '0 0 10px #e0aaff' : 'none' }}
            />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
            <div className={`absolute top-1/2 -right-4 w-2 h-2 rounded-full ${isDark ? 'bg-[#9d4edd]' : 'bg-[#FFD700]'}`}
              style={{ boxShadow: isDark ? '0 0 8px #9d4edd' : 'none' }}
            />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '5s' }}>
            <div className={`absolute -bottom-1 left-1/4 w-2 h-2 rounded-full ${isDark ? 'bg-[#c77dff]' : 'bg-white/70'}`}
              style={{ boxShadow: isDark ? '0 0 8px #c77dff' : 'none' }}
            />
          </div>

          {/* Outer ring glow (dark only) */}
          {isDark && (
            <div
              className="absolute inset-[-16px] rounded-full pointer-events-none"
              style={{
                border: '1px solid rgba(157,78,221,0.3)',
                animation: 'auraPulse 3s ease-in-out infinite',
              }}
            />
          )}
        </div>

        {/* Title */}
        <h1 className={`text-3xl md:text-5xl font-bold mb-2 ${isDark ? 'text-[#f8f9fa]' : 'text-white'
          }`}
          style={{
            textShadow: isDark
              ? '0 0 20px rgba(157,78,221,0.5), 0 0 40px rgba(157,78,221,0.3)'
              : '0 2px 10px rgba(0,0,0,0.2)',
            letterSpacing: isDark ? '0.05em' : 'normal',
          }}
        >
          {isDark ? "Specs' Dungeon" : "Specs' World"}
        </h1>
        <p className={`mb-8 font-semibold ${isDark ? 'text-[#e0aaff]/80' : 'text-white/80'}`}
          style={{
            textShadow: isDark ? '0 0 10px rgba(224,170,255,0.3)' : 'none',
            letterSpacing: isDark ? '0.1em' : 'normal',
          }}
        >
          {isDark ? 'Entering the realm...' : 'Loading your adventure...'}
        </p>

        {/* Progress Bar */}
        <div className={`w-72 h-2.5 rounded-full overflow-hidden mx-auto ${isDark ? 'bg-[#240046]/80 border border-[#9d4edd]/30' : 'bg-white/30'
          }`}>
          <div
            className={`h-full rounded-full transition-all duration-300 ${isDark
                ? 'bg-gradient-to-r from-[#7b2cbf] via-[#9d4edd] to-[#e0aaff]'
                : 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]'
              }`}
            style={{
              width: `${Math.min(progress, 100)}%`,
              boxShadow: isDark
                ? '0 0 12px rgba(157,78,221,0.8), 0 0 24px rgba(157,78,221,0.4)'
                : 'none',
            }}
          />
        </div>

        {/* Progress Text */}
        <p className={`mt-4 text-sm font-bold tabular-nums ${isDark ? 'text-[#e0aaff]/70' : 'text-white/70'}`}
          style={{ textShadow: isDark ? '0 0 8px rgba(224,170,255,0.3)' : 'none' }}
        >
          {Math.min(Math.round(progress), 100)}%
        </p>

        {/* Loading Tips */}
        <div className={`mt-8 text-xs max-w-xs mx-auto font-semibold ${isDark ? 'text-[#c77dff]/60' : 'text-white/60'
          }`}
          style={{ letterSpacing: isDark ? '0.05em' : 'normal' }}
        >
          <p>{isDark ? 'The dungeon awaits your presence...' : 'Tip: Scroll slowly to enjoy the journey!'}</p>
        </div>
      </div>

      {/* Decorative Corner Glows */}
      {isDark ? (
        <>
          <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at bottom left, rgba(157,78,221,0.25) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at top right, rgba(123,44,191,0.2) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
        </>
      ) : (
        <div className="absolute bottom-10 left-10 w-20 h-20 opacity-30 bg-[#FFD700]">
          <div className="w-full h-full rounded-full blur-3xl animate-pulse" />
        </div>
      )}
    </div>
  );
}
