import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'petal' | 'sparkle' | 'leaf' | 'magic';
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = isDark ? 35 : 25;
    const types: Particle['type'][] = isDark 
      ? ['magic', 'sparkle', 'magic'] 
      : ['petal', 'sparkle', 'leaf'];
    
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (isDark ? 5 : 4) + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;

      switch (particle.type) {
        case 'petal':
          // Draw cherry blossom petal
          ctx.fillStyle = '#FFB7C5';
          ctx.beginPath();
          ctx.ellipse(particle.x, particle.y, particle.size, particle.size * 0.6, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
          break;
        
        case 'sparkle':
          // Draw sparkle
          ctx.fillStyle = isDark ? '#e0aaff' : '#FFD700';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          // Add glow
          ctx.shadowColor = isDark ? '#9d4edd' : '#FFD700';
          ctx.shadowBlur = isDark ? 15 : 10;
          break;
        
        case 'leaf':
          // Draw leaf
          ctx.fillStyle = '#98D8C8';
          ctx.beginPath();
          ctx.ellipse(particle.x, particle.y, particle.size * 0.8, particle.size * 1.2, 0, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'magic':
          // Draw magic orb for dark theme
          ctx.fillStyle = '#9d4edd';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          // Stronger glow for magic
          ctx.shadowColor = '#e0aaff';
          ctx.shadowBlur = 20;
          break;
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Add gentle swaying motion
        particle.x += Math.sin(particle.y * 0.01 + index) * 0.3;

        // Reset if out of bounds
        if (particle.y > canvas.height + 10) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x > canvas.width + 10) {
          particle.x = -10;
        } else if (particle.x < -10) {
          particle.x = canvas.width + 10;
        }

        // Draw particle
        drawParticle(particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 5 }}
    />
  );
}
