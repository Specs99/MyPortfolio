import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { LinksSection } from './sections/LinksSection';
import { ContactSection } from './sections/ContactSection';
import { ParticleCanvas } from './components/ParticleCanvas';
import { ScrollProgress } from './components/ScrollProgress';
import { MascotGuide } from './components/MascotGuide';
import { LoadingScreen } from './components/LoadingScreen';
import { MusicPlayer } from './components/MusicPlayer/MusicPlayer';
import { useSound } from './hooks/useSound';
import { useTheme } from './context/ThemeContext';

import Lenis from 'lenis';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollY / (docHeight - windowHeight);

      // Determine current section based on scroll position
      const sectionIndex = Math.min(
        4,
        Math.floor(scrollPercent * 5)
      );
      setCurrentSection(sectionIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('.section-base');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
  };

  const handleThemeToggle = () => {
    playSound('click', 0.3);
    toggleTheme();
  };

  return (
    <>
      {isLoading && <LoadingScreen />}

      <div ref={mainRef} className="relative">
        {/* Global Particle Effects */}
        <ParticleCanvas />

        {/* Scroll Progress Indicator */}
        <ScrollProgress
          currentSection={currentSection}
          onSectionClick={scrollToSection}
        />

        {/* Mascot Guide */}
        <MascotGuide currentSection={currentSection} />

        {/* Custom Music Player */}
        <MusicPlayer />

        {/* Control Buttons */}
        <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3">
          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all hover:scale-110 hover:bg-white/50"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            onMouseEnter={() => soundEnabled && playSound('hover', 0.15)}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-[#FFD700]" />
            ) : (
              <Moon className="w-5 h-5 text-[#1a2634]" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all hover:scale-110 hover:bg-white/50"
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            onMouseEnter={() => soundEnabled && playSound('hover', 0.15)}
          >
            {soundEnabled ? (
              <Volume2 className={`w-5 h-5 ${isDark ? 'text-[#e0aaff]' : 'text-[#1a2634]'}`} />
            ) : (
              <VolumeX className={`w-5 h-5 ${isDark ? 'text-[#e0aaff]/50' : 'text-[#1a2634]/50'}`} />
            )}
          </button>
        </div>

        {/* Main Sections */}
        <main className="relative">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <LinksSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <footer className={`py-8 text-center ${isDark ? 'bg-gradient-to-t from-[#240046]/80 to-transparent' : 'bg-gradient-to-t from-[#2C3E50]/30 to-transparent'}`}>
          <p className={`text-sm font-semibold ${isDark ? 'text-[#f8f9fa]/90' : 'text-white/90'}`}>
            Made with 💜 by <span className={isDark ? 'text-[#e0aaff]' : 'text-[#FFD700]'}>Mustafa Hamid (Specs)</span> | © 2024 InciVerse
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
