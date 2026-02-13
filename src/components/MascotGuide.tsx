import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface MascotGuideProps {
  currentSection: number;
}

const sectionMessages = [
  "Welcome to Specs' world! Scroll down to explore!",
  "Here's a bit about me and what I do!",
  "Check out my latest projects!",
  "Let's connect on social media!",
  "Have something to say? Send me a message!"
];

const sectionPositions = [
  { bottom: '15%', right: '5%' },
  { bottom: '20%', left: '5%' },
  { bottom: '15%', right: '8%' },
  { bottom: '20%', left: '5%' },
  { bottom: '25%', right: '5%' }
];

export function MascotGuide({ currentSection }: MascotGuideProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // Show mascot after initial load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show message when section changes
    if (hasInteracted) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSection, hasInteracted]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasInteracted && window.scrollY > 100) {
        setHasInteracted(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasInteracted]);

  const position = sectionPositions[currentSection] || sectionPositions[0];

  return (
    <div
      className={`fixed z-40 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      style={{
        ...position,
        position: 'fixed'
      }}
    >
      {/* Speech Bubble */}
      <div
        className={`absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 p-3 rounded-2xl glass-card transition-all duration-500 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
      >
        <p className={`text-xs font-bold text-center leading-relaxed ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'}`}>
          {sectionMessages[currentSection]}
        </p>
        <div
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent ${isDark ? 'border-t-[#9d4edd]/60' : 'border-t-white/60'}`}
        />
      </div>

      {/* Mascot Image */}
      <div
        className="relative cursor-pointer hover:scale-110 transition-transform"
        onClick={() => setShowMessage(!showMessage)}
      >
        <img
          src="/images/mascot-guide.png"
          alt="Guide Mascot"
          className="w-16 h-16 md:w-20 md:h-20 mascot-bounce drop-shadow-lg"
        />

        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-full blur-xl -z-10 ${isDark ? 'bg-gradient-radial from-[#9d4edd]/30 via-transparent to-transparent' : 'bg-gradient-radial from-[#FFD700]/30 via-transparent to-transparent'}`} />
      </div>

      {/* Hint Text */}
      {!hasInteracted && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <p className={`text-xs font-bold animate-pulse ${isDark ? 'text-[#e0aaff]/90' : 'text-white/90'}`}>Click me!</p>
        </div>
      )}
    </div>
  );
}
