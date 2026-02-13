import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { useTheme } from '@/context/ThemeContext';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { playSound } = useSound();
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToNext = () => {
    playSound('click', 0.4);
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="section-base relative"
      style={{ height: '100vh' }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: isDark ? 'url(/images/dungeon-bg.jpg)' : 'url(/images/hero-sky.jpg)',
          filter: isDark ? 'brightness(0.8)' : 'brightness(1.1)'
        }}
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 transition-all duration-700 ${isDark
        ? 'bg-gradient-to-b from-[#240046]/70 via-[#3c096c]/50 to-[#240046]/80'
        : 'bg-gradient-to-b from-transparent via-transparent to-[#87CEEB]/30'
        }`} />

      {/* Floating Elements - Different for each theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          // Dark theme - magical particles
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#9d4edd] rounded-full animate-pulse"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${5 + Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 10px #9d4edd, 0 0 20px #9d4edd'
                }}
              />
            ))}
          </>
        ) : (
          // Light theme - clouds
          <>
            <div className="cloud-drift absolute top-20 -left-32 w-64 h-32 opacity-60">
              <div className="w-full h-full bg-white/40 rounded-full blur-2xl" />
            </div>
            <div
              className="absolute top-40 -left-48 w-96 h-48 opacity-40"
              style={{ animation: 'cloudDrift 25s linear infinite', animationDelay: '-5s' }}
            >
              <div className="w-full h-full bg-white/30 rounded-full blur-3xl" />
            </div>
          </>
        )}
      </div>

      {/* Glow Effect */}
      <div className={`absolute top-20 right-20 w-64 h-64 pointer-events-none transition-all duration-700 ${isDark ? 'opacity-60' : 'opacity-40'
        }`}>
        <div className={`w-full h-full rounded-full animate-pulse ${isDark
          ? 'bg-gradient-radial from-[#9d4edd]/50 via-[#7b2cbf]/30 to-transparent'
          : 'bg-gradient-radial from-[#FFD700]/40 via-[#FFD700]/20 to-transparent'
          }`} />
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Sparkles
            key={i}
            className={`absolute animate-pulse ${isDark ? 'text-[#e0aaff]' : 'text-[#FFD700]'}`}
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
              width: `${16 + Math.random() * 16}px`,
              height: `${16 + Math.random() * 16}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              filter: isDark ? 'drop-shadow(0 0 8px #e0aaff)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Welcome Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 scroll-reveal ${isVisible ? 'visible' : ''}`}
          onMouseEnter={() => playSound('hover', 0.2)}
        >
          <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#e0aaff]' : 'text-[#FFD700]'}`} />
          <span className={`text-sm font-bold ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'}`}>
            {isDark ? 'Enter the Dungeon' : 'Welcome to my world'}
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-4 scroll-reveal stagger-1 ${isVisible ? 'visible' : ''}`}
        >
          <span className={`drop-shadow-lg ${isDark ? 'text-[#f8f9fa]' : 'text-white'}`}>Hey, I'm </span>
          <span className={`${isDark ? 'drop-shadow-[0_2px_15px_rgba(157,78,221,0.5)]' : 'drop-shadow-[0_2px_15px_rgba(255,215,0,0.6)]'} glow-text ${isDark ? 'text-[#e0aaff]' : 'text-[#FFD700]'}`}>Mustafa</span>
        </h1>

        {/* Also Known As */}
        <p
          className={`text-xl md:text-2xl font-semibold mb-4 scroll-reveal stagger-2 ${isVisible ? 'visible' : ''}`}
          style={{ textShadow: isDark ? '0 2px 10px rgba(157,78,221,0.5)' : '0 2px 10px rgba(255,215,0,0.4)' }}
        >
          Also known as <span className={`glow-text font-bold ${isDark ? 'text-[#9d4edd]' : 'text-[#FFD700]'}`}>Specs</span>
        </p>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto scroll-reveal stagger-3 ${isVisible ? 'visible' : ''}`}
          style={{
            color: isDark ? 'rgba(248,249,250,0.95)' : 'rgba(255,255,255,0.95)',
            textShadow: isDark ? '0 2px 10px rgba(157,78,221,0.5)' : '0 2px 10px rgba(255,215,0,0.4)'
          }}
        >
          16-year-old O-Level Student & Co-founder of{' '}
          <span className={`font-bold glow-text ${isDark ? 'text-[#e0aaff]' : 'text-[#FFD700]'}`}>InciVerse</span>
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center scroll-reveal stagger-4 ${isVisible ? 'visible' : ''}`}
        >
          <button
            onClick={scrollToNext}
            className="anime-btn flex items-center justify-center gap-2"
            onMouseEnter={() => playSound('hover', 0.2)}
          >
            {isDark ? 'Enter the Realm' : 'Explore My World'}
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>

        {/* Floating Stats */}
        <div
          className={`mt-16 flex flex-wrap justify-center gap-6 scroll-reveal stagger-5 ${isVisible ? 'visible' : ''}`}
        >
          {[
            { label: 'Age', value: '16' },
            { label: 'Projects', value: '5+' },
            { label: 'Role', value: 'Co-founder' }
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card px-6 py-3 text-center float-animation"
              style={{ animationDelay: `${i * 0.5}s` }}
              onMouseEnter={() => playSound('hover', 0.15)}
            >
              <div className={`text-2xl font-bold drop-shadow-md ${isDark ? 'text-[#e0aaff]' : 'text-[#FFD700]'}`}>{stat.value}</div>
              <div className={`text-sm font-semibold ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div className={`flex flex-col items-center gap-2 ${isDark ? 'text-[#f8f9fa]/90' : 'text-white/90'}`}>
          <span className="text-sm font-semibold drop-shadow-md">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
