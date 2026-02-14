import { useEffect, useRef, useState } from 'react';
import { Briefcase, Code, Lightbulb, Sparkles, Zap, Palette } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { useTheme } from '@/context/ThemeContext';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { playSound } = useSound();
  const { isDark } = useTheme();

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Calculate how much of the section is scrolled through
        // A value of 0 means the top of the section is at the top of the viewport
        setScrollY(window.scrollY - sectionRef.current.offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const skills = [
    { icon: Code, label: 'Web Development', color: isDark ? '#9d4edd' : '#87CEEB' },
    { icon: Zap, label: 'Discord Specialist', color: isDark ? '#c77dff' : '#5865F2' },
    { icon: Lightbulb, label: 'Logical Thinking', color: isDark ? '#e0aaff' : '#FFD700' },
    { icon: Palette, label: 'Graphics Design', color: isDark ? '#FFB7C5' : '#FFB7C5' },
    { icon: Code, label: 'Systems Logic', color: isDark ? '#98D8C8' : '#98D8C8' },
  ];

  const secondarySkills = [
    'Python', 'C++', 'Windows Apps', 'Bot Making', 'Server Dev'
  ];

  const stats = [
    { icon: Briefcase, label: 'Experience', value: '2 Star YouTubers' },
    { icon: Zap, label: 'Discord', value: 'Bot & Server Pro' },
    { icon: Code, label: 'Logic', value: 'Expert Thinker' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="section-base relative"
      style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: isDark ? 'url(/images/dungeon-about.jpg)' : 'url(/images/floating-island.jpg)',
          filter: isDark ? 'brightness(0.7)' : 'brightness(1.05)',
          transform: `scale(${1.1 + scrollY * 0.0002}) translateY(${scrollY * 0.1}px)`,
          willChange: 'transform'
        }}
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 transition-all duration-700 ${isDark
        ? 'bg-gradient-to-b from-[#240046]/60 via-[#3c096c]/40 to-[#240046]/70'
        : 'bg-gradient-to-b from-[#87CEEB]/50 via-transparent to-[#87CEEB]/30'
        }`} />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Character Image */}
          <div
            className={`relative transition-all duration-1000 slide-in-left ${isVisible ? 'visible' : ''}`}
          >
            <div className="relative">
              {/* Character Image - Changes based on theme */}
              <div className={`relative ${isDark ? 'aura-glow' : ''}`}>
                <img
                  src={isDark ? '/images/character-sigma.png' : '/images/character-specs.png'}
                  alt={isDark ? 'Mustafa (Specs) - Sigma Mode' : 'Mustafa (Specs) Character'}
                  className={`w-full max-w-md mx-auto drop-shadow-2xl ${isDark ? '' : 'float-animation'}`}
                />
              </div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-full blur-3xl -z-10 transition-all duration-700 ${isDark
                ? 'bg-gradient-radial from-[#9d4edd]/40 via-[#7b2cbf]/20 to-transparent'
                : 'bg-gradient-radial from-[#FFD700]/20 via-transparent to-transparent'
                }`} />

              {/* Speech Bubble */}
              <div
                className={`absolute -top-4 -right-4 md:right-0 glass-card p-4 max-w-xs transition-all duration-1000 delay-500 scale-in ${isVisible ? 'visible' : ''}`}
              >
                <p className={`text-sm font-bold ${isDark ? 'text-[#f8f9fa]' : 'text-white'}`}>
                  {isDark
                    ? "I am Specs. Welcome to my domain. Power flows through code."
                    : "Hey! I'm Mustafa, but everyone calls me Specs. Welcome to my digital garden!"}
                </p>
                <div className={`absolute -bottom-3 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent ${isDark ? 'border-t-[#9d4edd]/60' : 'border-t-white/60'
                  }`} />
              </div>
            </div>
          </div>

          {/* Right: About Content */}
          <div
            className={`transition-all duration-1000 slide-in-right ${isVisible ? 'visible' : ''}`}
          >
            {/* Section Title */}
            <div className="mb-8">
              <span className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-bold mb-4 stagger-1 ${isDark ? 'bg-[#9d4edd]/20 text-[#e0aaff]' : 'bg-[#FFD700]/20 text-white'
                }`}>
                {isDark ? <Zap className="w-4 h-4 text-[#e0aaff]" /> : <Sparkles className="w-4 h-4 text-[#FFD700]" />}
                About Me
              </span>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg stagger-2 ${isDark ? 'text-[#f8f9fa]' : 'text-white'
                }`}>
                Who Am I?
              </h2>
              <div className={`w-24 h-1 rounded-full stagger-3 ${isDark ? 'bg-gradient-to-r from-[#9d4edd] to-transparent' : 'bg-gradient-to-r from-[#FFD700] to-transparent'
                }`} />
            </div>

            {/* Description */}
            <div className="glass-card p-6 mb-8 stagger-4">
              <p className={`text-lg font-bold leading-relaxed mb-4 ${isDark ? 'text-[#f8f9fa]' : 'text-white'}`}>
                I'm <span className={isDark ? 'text-[#9d4edd]' : 'text-[#87CEEB]'}>Mustafa Hamid</span> (aka <span className={isDark ? 'text-[#e0aaff]' : 'text-[#FFD700]'}>Specs</span>) — a
                16-year-old developer and Co-founder of <span className={`font-bold ${isDark ? 'text-[#e0aaff]' : 'text-[#FFD700]'}`}>InciVerse</span>.
                I specialize in building complex high-performance systems, managing large-scale communities, and creating custom solutions as a seasoned <span className="text-[#5865F2]">Discord Server Developer</span> and
                expert <span className="text-[#5865F2]">Bot Maker</span>.
              </p>
              <p className={`text-lg font-bold leading-relaxed ${isDark ? 'text-[#f8f9fa]' : 'text-white'}`}>
                Beyond the web, I'm an expert in <span className="text-[#9d4edd]">Logical Thinking</span>, a Windows application maker,
                and highly skilled in <span className="text-[#3776AB]">Python</span>, <span className="text-[#00599C]">C++</span>, and
                <span className="text-[#FFB7C5]">Graphics Design</span>. I'm a massive <span className="italic">PC, Game, and Anime lover</span>.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`glass-card p-4 text-center transition-all duration-500 hover:scale-105 scroll-reveal ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${0.6 + i * 0.1}s` }}
                  onMouseEnter={() => playSound('hover', 0.15)}
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-[#e0aaff]' : 'text-[#FFD700]'}`} />
                  <div className={`text-sm font-bold ${isDark ? 'text-[#f8f9fa]/80' : 'text-white/80'}`}>{stat.label}</div>
                  <div className={`font-bold ${isDark ? 'text-[#f8f9fa]' : 'text-white'}`}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h3 className={`text-lg font-bold mb-4 drop-shadow-md ${isDark ? 'text-[#f8f9fa]' : 'text-white'}`}>My Superpowers</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full glass-card transition-all duration-500 hover:scale-110 scroll-reveal ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${0.9 + i * 0.1}s` }}
                    onMouseEnter={() => playSound('hover', 0.15)}
                  >
                    <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
                    <span className={`text-sm font-bold ${isDark ? 'text-[#f8f9fa]' : 'text-white'}`}>{skill.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {secondarySkills.map((skill, i) => (
                  <span
                    key={i}
                    className={`text-xs font-bold px-3 py-1 rounded-md border ${isDark ? 'border-[#9d4edd]/30 text-[#e0aaff]/70' : 'border-[#1a2634]/20 text-[#1a2634]/60'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
