import { useEffect, useRef, useState } from 'react';
import { Send, Mail, User, MessageSquare, Sparkles, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSound } from '@/hooks/useSound';
import { useTheme } from '@/context/ThemeContext';

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { playSound } = useSound();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click', 0.4);
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="section-base relative"
      style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: isDark ? 'url(/images/dungeon-bg.jpg)' : 'url(/images/shrine-gate.jpg)',
          filter: isDark ? 'brightness(0.6)' : 'brightness(0.9)'
        }}
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 transition-all duration-700 ${isDark
        ? 'bg-gradient-to-b from-[#240046]/70 via-[#3c096c]/50 to-[#240046]/80'
        : 'bg-gradient-to-b from-[#2C3E50]/60 via-[#2C3E50]/40 to-[#2C3E50]/70'
        }`} />

      {/* Star/Magic Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${isDark ? 'bg-[#e0aaff]' : 'bg-white'
              }`}
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.7,
              boxShadow: isDark ? '0 0 8px #e0aaff' : 'none'
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">

        {/* Section Header */}
        <div
          className={`text-center mb-12 scroll-reveal ${isVisible ? 'visible' : ''}`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 stagger-1">
            {isDark ? <Zap className="w-4 h-4 text-[#e0aaff]" /> : <Sparkles className="w-4 h-4 text-[#FFD700]" />}
            <span className={`text-sm font-bold ${isDark ? 'text-[#f8f9fa]' : 'text-white'}`}>Get In Touch</span>
          </span>
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg stagger-2 ${isDark ? 'text-[#f8f9fa]' : 'text-white'
            }`}>
            Let's Talk
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-semibold stagger-3 ${isDark ? 'text-[#f8f9fa]/90' : 'text-white/90'
            }`}>
            Have a project in mind or just want to say hi? I'd love to hear from you!
          </p>
        </div>

        {/* Contact Form */}
        <div
          className={`scroll-reveal stagger-4 ${isVisible ? 'visible' : ''}`}
        >
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#9d4edd]/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-[#9d4edd]" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'}`}>Message Sent!</h3>
                <p className={`font-semibold ${isDark ? 'text-[#f8f9fa]/70' : 'text-[#1a2634]/70]'}`}>
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className={`font-bold flex items-center gap-2 ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'
                      }`}>
                      <User className="w-4 h-4" />
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`rounded-xl font-semibold placeholder:font-normal ${isDark
                        ? 'bg-[#240046]/60 border-[#9d4edd]/50 focus:border-[#e0aaff] text-[#f8f9fa] placeholder:text-[#f8f9fa]/40'
                        : 'bg-white/60 border-white/60 focus:border-[#87CEEB] text-[#1a2634] placeholder:text-[#1a2634]/40'
                        }`}
                      onFocus={() => playSound('hover', 0.15)}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className={`font-bold flex items-center gap-2 ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'
                      }`}>
                      <Mail className="w-4 h-4" />
                      Your Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`rounded-xl font-semibold placeholder:font-normal ${isDark
                        ? 'bg-[#240046]/60 border-[#9d4edd]/50 focus:border-[#e0aaff] text-[#f8f9fa] placeholder:text-[#f8f9fa]/40'
                        : 'bg-white/60 border-white/60 focus:border-[#87CEEB] text-[#1a2634] placeholder:text-[#1a2634]/40'
                        }`}
                      onFocus={() => playSound('hover', 0.15)}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className={`font-bold flex items-center gap-2 ${isDark ? 'text-[#f8f9fa]' : 'text-[#1a2634]'
                    }`}>
                    <MessageSquare className="w-4 h-4" />
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or just say hi!"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`rounded-xl font-semibold placeholder:font-normal resize-none ${isDark
                      ? 'bg-[#240046]/60 border-[#9d4edd]/50 focus:border-[#e0aaff] text-[#f8f9fa] placeholder:text-[#f8f9fa]/40'
                      : 'bg-white/60 border-white/60 focus:border-[#87CEEB] text-[#1a2634] placeholder:text-[#1a2634]/40'
                      }`}
                    onFocus={() => playSound('hover', 0.15)}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full anime-btn flex items-center justify-center gap-2 py-6 text-lg"
                  onMouseEnter={() => playSound('hover', 0.2)}
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Alternative Contact */}
        <div
          className={`mt-12 text-center scroll-reveal stagger-5 ${isVisible ? 'visible' : ''}`}
        >
          <p className={`mb-4 font-semibold ${isDark ? 'text-[#f8f9fa]/80' : 'text-white/80'}`}>Or reach me directly at</p>
          <a
            href="mailto:kingm172009@gmail.com"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card transition-all hover:scale-105 ${isDark ? 'text-[#f8f9fa] hover:bg-[#9d4edd]/30' : 'text-white hover:bg-white/30'
              }`}
            onMouseEnter={() => playSound('hover', 0.2)}
            onClick={() => playSound('click', 0.3)}
          >
            <Mail className="w-5 h-5" />
            kingm172009@gmail.com
          </a>
        </div>

        {/* Character Waving */}
        <div
          className={`absolute -bottom-8 right-4 md:right-12 slide-in-right stagger-6 ${isVisible ? 'visible' : ''}`}
        >
          <img
            src="/images/mascot-guide.png"
            alt="Mascot"
            className="w-24 h-24 md:w-32 md:h-32 mascot-bounce drop-shadow-lg"
          />
          <div className={`absolute -top-12 left-1/2 -translate-x-1/2 glass-card px-3 py-2 whitespace-nowrap`}>
            <p className={`text-xs font-bold ${isDark ? 'text-[#f8f9fa]' : 'text-white'}`}>Can't wait to hear from you!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
