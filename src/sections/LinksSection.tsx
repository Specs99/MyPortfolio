import { useEffect, useRef, useState } from 'react';
import { Instagram, Youtube, Github, Linkedin, ExternalLink, Link2, Building2, Zap } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { useTheme } from '@/context/ThemeContext';

interface SocialLink {
  name: string;
  icon: React.ElementType;
  url: string;
  color: string;
  description: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/iknow_mustafa/',
    color: '#E4405F',
    description: '@iknow_mustafa'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://www.youtube.com/@specsgamerz17',
    color: '#FF0000',
    description: '@specsgamerz17'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/mustafa-hamid-specs/',
    color: '#0A66C2',
    description: 'Professional network'
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Specs99',
    color: '#333',
    description: '@Specs99'
  }
];

const projectLinks = [
  { name: 'InciVerse', url: 'https://www.instagram.com/inciverseofficial', description: 'Our company', icon: Building2 },
  { name: 'ClauseMind', url: 'https://clausemind.vercel.app', description: 'AI Legal Assistant', icon: ExternalLink },
  { name: 'O-Level Schedule', url: 'https://olevel-schedule.blogspot.com/', description: 'Study Planner', icon: ExternalLink }
];

export function LinksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { playSound } = useSound();
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="links-section"
      className="section-base relative"
      style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* Background */}
      <div className={`absolute inset-0 transition-all duration-700 ${isDark
        ? 'bg-gradient-to-b from-[#240046] via-[#3c096c] to-[#240046]'
        : 'bg-gradient-to-b from-[#A8D5E5] via-[#87CEEB] to-[#E6F3F8]'
        }`} />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          // Dark theme - magical orbs
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-32 h-32 bg-[#9d4edd]/20 rounded-full blur-3xl animate-pulse"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${5 + Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </>
        ) : (
          // Light theme - clouds
          <>
            <div
              className="absolute top-20 -left-32 w-96 h-48 opacity-30"
              style={{ animation: 'cloudDrift 35s linear infinite' }}
            >
              <div className="w-full h-full bg-white/50 rounded-full blur-3xl" />
            </div>
          </>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">

        {/* Section Header */}
        <div
          className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 stagger-1">
            {isDark ? <Zap className="w-4 h-4 text-[#e0aaff]" /> : <Link2 className="w-4 h-4 text-[#FFD700]" />}
            <span className={`text-sm font-bold ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'}`}>Connect With Me</span>
          </span>
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 drop-shadow-md stagger-2 ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'
            }`}>
            Let's Connect
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-semibold stagger-3 ${isDark ? 'text-[#f8f9fa]/80' : 'text-[#1a2634]/80'
            }`}>
            Find me on these platforms. I'd love to hear from you!
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative transition-all duration-500 scroll-reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              onMouseEnter={() => {
                setHoveredLink(social.name);
                playSound('hover', 0.2);
              }}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => playSound('click', 0.3)}
            >
              <div
                className="flex flex-col items-center gap-3 p-6 rounded-2xl glass-card transition-all duration-300"
                style={{
                  transform: hoveredLink === social.name ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredLink === social.name ? `0 15px 35px ${social.color}40` : 'none'
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: hoveredLink === social.name ? social.color : `${social.color}25`,
                  }}
                >
                  <social.icon
                    className="w-8 h-8 transition-colors duration-300"
                    style={{ color: hoveredLink === social.name ? 'white' : social.color }}
                  />
                </div>

                {/* Text */}
                <div className="text-center">
                  <h3 className={`font-bold group-hover:text-[#9d4edd] transition-colors ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'
                    }`}>
                    {social.name}
                  </h3>
                  <p className={`text-xs font-semibold ${isDark ? 'text-[#f8f9fa]/60' : 'text-[#1a2634]/60'}`}>
                    {social.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Project Links */}
        <div
          className={`scroll-reveal stagger-5 ${isVisible ? 'visible' : ''}`}
        >
          <h3 className={`text-xl font-bold mb-6 text-center ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'}`}>Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {projectLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group px-6 py-3 rounded-full glass-card flex items-center gap-3 transition-all hover:scale-105 ${isDark ? 'hover:bg-[#9d4edd]/30' : 'hover:bg-white/60'
                  }`}
                onMouseEnter={() => playSound('hover', 0.2)}
                onClick={() => playSound('click', 0.3)}
              >
                <link.icon className={`w-5 h-5 ${isDark ? 'text-[#e0aaff]' : 'text-[#87CEEB]'}`} />
                <span className={`font-bold ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'}`}>{link.name}</span>
                <span className={`text-sm font-semibold hidden sm:inline ${isDark ? 'text-[#f8f9fa]/60' : 'text-[#1a2634]/60'}`}>
                  {link.description}
                </span>
                <ExternalLink className={`w-4 h-4 transition-colors ${isDark ? 'text-[#f8f9fa]/40 group-hover:text-[#e0aaff]' : 'text-[#1a2634]/40 group-hover:text-[#87CEEB]'
                  }`} />
              </a>
            ))}
          </div>
        </div>

        {/* Fun Fact */}
        <div
          className={`mt-16 text-center scroll-reveal stagger-6 ${isVisible ? 'visible' : ''}`}
        >
          <div className="inline-block glass-card px-8 py-6 rounded-2xl">
            <p className={`text-sm mb-2 font-semibold ${isDark ? 'text-[#f8f9fa]/70' : 'text-[#1a2634]/70'}`}>Fun Fact</p>
            <p className={`font-bold ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'}`}>
              I reply to all messages within 24 hours! 📬
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
