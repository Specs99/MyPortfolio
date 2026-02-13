import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ScrollProgressProps {
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const sections = [
  { name: 'Home', color: '#FFD700' },
  { name: 'About', color: '#87CEEB' },
  { name: 'Projects', color: '#98D8C8' },
  { name: 'Links', color: '#FFB7C5' },
  { name: 'Contact', color: '#E6E6FA' }
];

export function ScrollProgress({ currentSection, onSectionClick }: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const progress = (scrollY / (docHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      // Show progress indicator after scrolling a bit
      setIsVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
    >
      {/* Progress Bar */}
      <div className={`relative w-1 h-32 rounded-full overflow-hidden mb-4 ${isDark ? 'bg-[#9d4edd]/30' : 'bg-white/30'}`}>
        <div
          className={`absolute bottom-0 left-0 w-full rounded-full transition-all duration-300 ${isDark ? 'bg-gradient-to-t from-[#9d4edd] to-[#e0aaff]' : 'bg-gradient-to-t from-[#FFD700] to-[#87CEEB]'}`}
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Section Dots */}
      <div className="flex flex-col gap-3">
        {sections.map((section, index) => (
          <button
            key={section.name}
            onClick={() => onSectionClick(index)}
            className={`group relative w-4 h-4 rounded-full transition-all duration-300 ${currentSection === index
                ? 'scale-125'
                : 'hover:scale-110'
              }`}
            style={{
              backgroundColor: currentSection === index ? section.color : 'rgba(255,255,255,0.5)',
              boxShadow: currentSection === index ? `0 0 15px ${section.color}` : 'none'
            }}
            title={section.name}
          >
            {/* Tooltip */}
            <span className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg glass-card text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${isDark ? 'text-[#f8f9fa]' : 'text-[#2C3E50]'}`}>
              {section.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
