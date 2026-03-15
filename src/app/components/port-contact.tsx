import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

export function PortContact() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // TOP transition (About white -> Contact black)
  const { scrollYProgress: topEdgeProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  // BOTTOM transition (Contact black -> next section white)
  const { scrollYProgress: bottomEdgeProgress } = useScroll({
    target: containerRef,
    offset: ['end end', 'end start'],
  });

  // --- TOP trapezoid paths ---
  const topUpFillArray = [
    "M 0 100 L 50 100 Q 75 100, 90 84 L 135 36 Q 150 20, 175 20 L 825 20 Q 850 20, 865 36 L 910 84 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
    "M 0 100 L 50 100 Q 75 100, 90 100 L 135 100 Q 150 100, 175 100 L 825 100 Q 850 100, 865 100 L 910 100 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
    "M 0 100 L 50 100 Q 75 100, 90 116 L 135 164 Q 150 180, 175 180 L 825 180 Q 850 180, 865 164 L 910 116 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
  ];
  const topDownFillArray = [
    "M 0 100 L 50 100 Q 75 100, 90 84 L 135 36 Q 150 20, 175 20 L 825 20 Q 850 20, 865 36 L 910 84 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
    "M 0 100 L 50 100 Q 75 100, 90 100 L 135 100 Q 150 100, 175 100 L 825 100 Q 850 100, 865 100 L 910 100 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
    "M 0 100 L 50 100 Q 75 100, 90 116 L 135 164 Q 150 180, 175 180 L 825 180 Q 850 180, 865 164 L 910 116 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
  ];
  const topWhitePath = useTransform(topEdgeProgress, [0, 0.5, 1], topUpFillArray);
  const topBlackPath = useTransform(topEdgeProgress, [0, 0.5, 1], topDownFillArray);

  // --- BOTTOM trapezoid paths ---
  const bottomUpFillArray = [
    "M 0 100 L 50 100 Q 75 100, 90 84 L 135 36 Q 150 20, 175 20 L 825 20 Q 850 20, 865 36 L 910 84 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
    "M 0 100 L 50 100 Q 75 100, 90 100 L 135 100 Q 150 100, 175 100 L 825 100 Q 850 100, 865 100 L 910 100 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
    "M 0 100 L 50 100 Q 75 100, 90 116 L 135 164 Q 150 180, 175 180 L 825 180 Q 850 180, 865 164 L 910 116 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
  ];
  const bottomDownFillArray = [
    "M 0 100 L 50 100 Q 75 100, 90 84 L 135 36 Q 150 20, 175 20 L 825 20 Q 850 20, 865 36 L 910 84 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
    "M 0 100 L 50 100 Q 75 100, 90 100 L 135 100 Q 150 100, 175 100 L 825 100 Q 850 100, 865 100 L 910 100 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
    "M 0 100 L 50 100 Q 75 100, 90 116 L 135 164 Q 150 180, 175 180 L 825 180 Q 850 180, 865 164 L 910 116 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
  ];
  const bottomBlackPath = useTransform(bottomEdgeProgress, [0, 0.5, 1], bottomUpFillArray);
  const bottomWhitePath = useTransform(bottomEdgeProgress, [0, 0.5, 1], bottomDownFillArray);

  // Partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative z-10 w-full h-screen bg-[#05070A] flex items-center justify-center overflow-hidden"
    >
      {/* Transição Trapézio (Branco -> Preto) */}
      <div
        className="absolute left-0 w-full z-20 pointer-events-none"
        style={{ top: '-100px', height: '200px' }}
      >
        <motion.svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <motion.path d={topWhitePath} fill="#ffffff" />
          <motion.path d={topBlackPath} fill="#05070A" />
        </motion.svg>
      </div>

      {/* Transição Trapézio Inferior (Preto -> Branco) */}
      <div
        className="absolute left-0 w-full z-20 pointer-events-none"
        style={{ bottom: '-100px', height: '200px' }}
      >
        <motion.svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <motion.path d={bottomBlackPath} fill="#05070A" />
          <motion.path d={bottomWhitePath} fill="#ffffff" />
        </motion.svg>
      </div>

      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="relative z-30 text-center px-6 flex flex-col items-center">
        {/* Radial glow behind the CTA area */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(123, 179, 204, 0.12) 0%, transparent 70%)',
          }}
        />

        <motion.a
          href="https://linktr.ee/DokaYMS"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative px-14 py-5 rounded-full cursor-pointer flex items-center justify-center group"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(25px) saturate(160%)',
            WebkitBackdropFilter: 'blur(25px) saturate(160%)',
            border: 'none',
            // O segredo do "rim highlight" da referência: sombras internas múltiplas
            boxShadow: `
              inset 0 0 0 1px rgba(255, 255, 255, 0.2), 
              inset 0 1px 1px rgba(255, 255, 255, 0.3),
              0 20px 40px -10px rgba(0, 0, 0, 0.4),
              0 0 0 0.5px rgba(255, 255, 255, 0.05)
            `,
            textDecoration: 'none'
          }}
        >
          {/* Volumetric Glass Gradient Overlay */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.05) 100%)',
            }}
          />
          
          {/* Specular Rim Light (topo do botão) */}
          <div 
            className="absolute inset-x-4 top-[1px] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
          />

          <span 
            className="relative z-10"
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 500,
              fontSize: '20px',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            Explore
          </span>

          {/* Glow suave ao passar o mouse */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 70%)'
            }}
          />
        </motion.a>
      </div>
    </section>
  );
}
