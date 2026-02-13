import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Sparkles, ArrowRight, Lock, Palette, Brain, Calendar, Zap } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { useTheme } from '@/context/ThemeContext';

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  color: string;
  icon: React.ElementType;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'ClauseMind',
    description: 'An AI-powered legal assistant that helps users understand complex legal documents with ease. Built with modern NLP techniques.',
    image: '/images/project-clausemind.jpg',
    tags: ['AI', 'NLP', 'Legal Tech'],
    link: 'https://clausemind.vercel.app',
    github: 'https://github.com/Specs99',
    color: '#87CEEB',
    icon: Brain
  },
  {
    id: 2,
    name: 'Nova Themes',
    description: 'A Google UI enhancer that adds live wallpapers, interactive visuals, and aesthetic upgrades for a personalized browsing experience.',
    image: '/images/project-nova.jpg',
    tags: ['UI', 'Themes', 'Chrome Extension'],
    link: 'https://drive.google.com/drive/folders/1JRGIhEByJvOlt9UXvtFGwF1krb8DmsV9?usp=sharing',
    github: 'https://github.com/Specs99',
    color: '#FFD700',
    icon: Palette
  },
  {
    id: 3,
    name: 'Specs Web Lock',
    description: 'Adds a lock look to specific URLs. Users can unlock with passkeys. Features a fake 404 error page that pops up when clicking a key!',
    image: '/images/project-specs.jpg',
    tags: ['Security', 'Privacy', 'Web'],
    link: 'https://drive.google.com/drive/folders/17Rbb55aTxVVacxHjJEkVlM_fWYLg9AGi?usp=sharing',
    github: 'https://github.com/Specs99',
    color: '#98D8C8',
    icon: Lock
  },
  {
    id: 4,
    name: 'O-Level Schedule',
    description: 'A comprehensive schedule planner designed specifically for O-Level students to organize their study time and track assignments.',
    image: '/images/project-schedule.jpg',
    tags: ['Education', 'Productivity', 'Planner'],
    link: 'https://olevel-schedule.blogspot.com/',
    github: 'https://github.com/Specs99',
    color: '#FFB7C5',
    icon: Calendar
  }
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const { playSound } = useSound();
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects-section"
      className="section-base relative"
      style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: isDark ? 'url(/images/dungeon-bg.jpg)' : 'url(/images/waterfall-scene.jpg)',
          filter: isDark ? 'brightness(0.7)' : 'brightness(1.02)'
        }}
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 transition-all duration-700 ${isDark
        ? 'bg-gradient-to-b from-[#240046]/50 via-[#3c096c]/40 to-[#240046]/60'
        : 'bg-gradient-to-b from-[#87CEEB]/40 via-transparent to-[#87CEEB]/50'
        }`} />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div
          className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 stagger-1">
            {isDark ? <Zap className="w-4 h-4 text-[#e0aaff]" /> : <Sparkles className="w-4 h-4 text-[#FFD700]" />}
            <span className={`text-sm font-bold ${isDark ? 'text-[#f8f9fa]' : 'text-white'}`}>My Creations</span>
          </span>
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg stagger-2 ${isDark ? 'text-[#f8f9fa]' : 'text-white'
            }`}>
            Featured Projects
          </h2>
          <p className={`text-lg max-w-2xl mx-auto drop-shadow-md stagger-3 ${isDark ? 'text-[#f8f9fa]/95' : 'text-white/95'
            }`}>
            Here are some of the projects I've been working on. Each one represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-700 ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'} ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              onMouseEnter={() => {
                setActiveProject(project.id);
                playSound('hover', 0.2);
              }}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div
                className="relative overflow-hidden rounded-2xl glass-card wave-card"
                style={{
                  transform: activeProject === project.id
                    ? 'translateY(-15px) rotate(2deg)'
                    : 'translateY(0) rotate(0)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Project Icon */}
                  <div
                    className="absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}40` }}
                  >
                    <project.icon className="w-6 h-6" style={{ color: project.color }} />
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${activeProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    style={{ backgroundColor: isDark ? 'rgba(157, 78, 221, 0.3)' : `${project.color}30` }}
                  />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-[#9d4edd] transition-colors ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'
                    }`}>
                    {project.name}
                  </h3>
                  <p className={`text-sm font-bold mb-4 line-clamp-2 ${isDark ? 'text-[#f8f9fa]/70' : 'text-[#1a2634]/70'
                    }`}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-bold rounded-full"
                        style={{
                          backgroundColor: isDark ? 'rgba(157, 78, 221, 0.3)' : `${project.color}40`,
                          color: isDark ? '#f8f9fa' : '#1a2634'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-bold hover:opacity-90 transition-all hover:scale-105"
                        style={{ backgroundColor: isDark ? '#9d4edd' : project.color }}
                        onClick={() => playSound('click', 0.3)}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg glass-card text-sm font-bold transition-all hover:scale-105 ${isDark ? 'text-[#f8f9fa] hover:bg-[#9d4edd]/30' : 'text-[#1a2634] hover:bg-white/60'
                          }`}
                        onClick={() => playSound('click', 0.3)}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Glow Effect on Hover */}
                <div
                  className={`absolute -inset-1 rounded-2xl transition-opacity duration-300 -z-10 blur-xl ${activeProject === project.id ? 'opacity-60' : 'opacity-0'
                    }`}
                  style={{ backgroundColor: isDark ? '#9d4edd' : project.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-12 scroll-reveal ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.8s' }}
        >
          <a
            href="https://github.com/Specs99"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full glass-card font-bold transition-all hover:scale-105 ${isDark ? 'text-[#f8f9fa] hover:bg-[#9d4edd]/30' : 'text-white hover:bg-white/60'
              }`}
            onClick={() => playSound('click', 0.3)}
            onMouseEnter={() => playSound('hover', 0.2)}
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
