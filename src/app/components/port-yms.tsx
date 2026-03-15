import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { useRef, useEffect, useCallback, useState } from 'react';

interface Particle {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  target2X: number;
  target2Y: number;
  alpha: number;
  baseSize: number;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scanEdges(
  text: string, 
  width: number, 
  height: number, 
  fontSize: number, 
  yOffset: number = 0
): {x: number, y: number}[] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = 'white';
  // Match exact font rendering
  ctx.font = `500 ${fontSize}px "Geist", "Inter", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if ('letterSpacing' in ctx) {
    (ctx as any).letterSpacing = '-0.02em';
  }
  
  // Draw exactly in the middle of our canvas (which maps 1:1 to the screen) + user Y offset
  ctx.fillText(text, width / 2, height / 2 + yOffset);
  
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const edges: {x: number, y: number}[] = [];
  
  // Scan for edge pixels (white pixel next to a black pixel)
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const idx = (y * width + x) * 4;
      if (data[idx] > 128) {
        if (
          data[((y - 1) * width + x) * 4] < 128 ||
          data[((y + 1) * width + x) * 4] < 128 ||
          data[(y * width + (x - 1)) * 4] < 128 ||
          data[(y * width + (x + 1)) * 4] < 128
        ) {
          edges.push({ x, y });
        }
      }
    }
  }
  return edges;
}

export function PortYMS() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const progressRef = useRef(0);
  
  const [fontSize, setFontSize] = useState(60);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const { scrollYProgress: edgeProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
  });

  // Animations based on scroll
  const gridOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 0.08]);
  // The acronym "YMS." text fades in EXACTLY as particles compress and fade out at the end
  const textColor = useTransform(scrollYProgress, [0.6, 0.75], ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']);

  const darkPathArray = [
    "M 0 100 L 50 100 Q 75 100, 90 84 L 135 36 Q 150 20, 175 20 L 825 20 Q 850 20, 865 36 L 910 84 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
    "M 0 100 L 50 100 Q 75 100, 90 100 L 135 100 Q 150 100, 175 100 L 825 100 Q 850 100, 865 100 L 910 100 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
    "M 0 100 L 50 100 Q 75 100, 90 116 L 135 164 Q 150 180, 175 180 L 825 180 Q 850 180, 865 164 L 910 116 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
  ];
  const whitePathArray = [
    "M 0 100 L 50 100 Q 75 100, 90 84 L 135 36 Q 150 20, 175 20 L 825 20 Q 850 20, 865 36 L 910 84 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
    "M 0 100 L 50 100 Q 75 100, 90 100 L 135 100 Q 150 100, 175 100 L 825 100 Q 850 100, 865 100 L 910 100 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
    "M 0 100 L 50 100 Q 75 100, 90 116 L 135 164 Q 150 180, 175 180 L 825 180 Q 850 180, 865 164 L 910 116 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
  ];
  const darkTabPath = useTransform(edgeProgress, [0, 0.5, 1], darkPathArray);
  const whiteTabPath = useTransform(edgeProgress, [0, 0.5, 1], whitePathArray);

  const initParticles = useCallback((w: number, h: number, currentFontSize: number) => {
    const PARTICLES_COUNT = 3000;
    
    // Stage 1: Full phrase outline (Centered perfectly, yOffset: 0)
    const edgesA = scanEdges('Yard Management System', w, h, currentFontSize, 0);
    
    // Stage 2: Acronym outline
    // We scale the acronym to be slightly larger for maximum visual impact!
    // -> NOTE: Here is the vertical offset! Change this number (-80) to move the particles up(-) or down(+)
    const ymsVerticalOffset = -10; // Negative values push the YMS particles UP
    const edgesB = scanEdges('YMS', w, h, currentFontSize * 1.4, ymsVerticalOffset);
    
    const validEdgesA = edgesA.length > 0 ? edgesA : [{x: w/2, y: h/2}];
    const validEdgesB = edgesB.length > 0 ? edgesB : [{x: w/2, y: h/2}];

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLES_COUNT; i++) {
      const eA = validEdgesA[Math.floor(Math.random() * validEdgesA.length)];
      const eB = validEdgesB[Math.floor(Math.random() * validEdgesB.length)];
      
      particles.push({
        startX: Math.random() * w,
        startY: Math.random() * h,
        targetX: eA.x + (Math.random() - 0.5) * 1.5,
        targetY: eA.y + (Math.random() - 0.5) * 1.5,
        target2X: eB.x + (Math.random() - 0.5) * 1.5,
        target2Y: eB.y + (Math.random() - 0.5) * 1.5,
        alpha: 0,
        baseSize: Math.random() * 1.5 + 0.5,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let localW = window.innerWidth;
    let localH = window.innerHeight;

    const resizeCanvas = () => {
      localW = window.innerWidth;
      localH = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = localW * dpr;
      canvas.height = localH * dpr;
      
      const ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);
      
      // Mimic clamp(40px, 6vw, 90px)
      const currentFontSize = Math.min(90, Math.max(40, localW * 0.06));
      setFontSize(currentFontSize);

      setTimeout(() => initParticles(localW, localH, currentFontSize), 100);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const ctx = canvas.getContext('2d')!;

    const render = () => {
      const progress = progressRef.current;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, localW, localH);
      
      ctx.globalCompositeOperation = 'lighter';

      const phase1 = Math.min(1, Math.max(0, (progress - 0.1) / 0.25)); // 0.1 -> 0.35 (Swarm to Full Text)
      const phase2 = Math.min(1, Math.max(0, (progress - 0.45) / 0.15)); // 0.45 -> 0.60 (Morph to YMS.)
      const phase3 = Math.min(1, Math.max(0, (progress - 0.6) / 0.15)); // 0.6 -> 0.75 (Merge to Solid HTML Font)

      const p1 = easeInOutCubic(phase1);
      const p2 = easeInOutCubic(phase2);

      if (particles.length > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          let currX: number;
          let currY: number;

          if (phase2 > 0) {
            // Morph between Target1 (Full Text) and Target2 (Acronym)
            currX = p.targetX + (p.target2X - p.targetX) * p2;
            currY = p.targetY + (p.target2Y - p.targetY) * p2;
          } else {
            // Morph between Start and Target1
            currX = p.startX + (p.targetX - p.startX) * p1;
            currY = p.startY + (p.targetY - p.startY) * p1;
          }

          if (progress < 0.1) {
            p.alpha = progress / 0.1; 
          } 
          else if (phase3 > 0) {
            p.alpha = Math.max(0, 1 - phase3);
          }
          else {
            p.alpha = 1;
          }

          if (p.alpha <= 0.01) continue;

          ctx.beginPath();
          ctx.arc(currX, currY, p.baseSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 191, 255, ${p.alpha * 0.9})`;
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [initParticles]);

  return (
    <section
      ref={containerRef}
      className="relative z-10"
      style={{
        backgroundColor: '#05070A',
        height: '400vh',
      }}
    >
      <div
        className="absolute left-0 w-full z-20 pointer-events-none"
        style={{ top: '-100px', height: '200px' }}
      >
        <motion.svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <motion.path d={darkTabPath} fill="#05070A" />
          <motion.path d={whiteTabPath} fill="#ffffff" />
        </motion.svg>
      </div>

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            opacity: gridOpacity,
            backgroundImage: `
              linear-gradient(to right, #00BFFF 1px, transparent 1px),
              linear-gradient(to bottom, #00BFFF 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            backgroundPosition: 'center center',
          }}
        />
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.15], [0, 0.3]),
            backgroundImage: `radial-gradient(circle at center, #00BFFF 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            backgroundPosition: 'calc(50% - 2rem) calc(50% - 2rem)',
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '14px',
              position: 'absolute',
              marginTop: '-180px', 
            }}
          >
            That's the
          </motion.div>

          {/* HTML DOM renders ONLY the acronym. It is strictly tied to the canvas dimensions. */}
          <motion.h2
            className="flex items-center justify-center whitespace-nowrap m-0 p-0"
            style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 500,
              fontSize: `${fontSize * 1.4}px`, // Matches exactly the Canvas Acronym size !
              letterSpacing: '-0.02em',
              lineHeight: 1,
              marginTop: '-30px', // MATCH THIS to the ymsVerticalOffset var so they stay perfectly aligned!
              color: textColor, // Remains 0% opacity during all particle phases, becomes 1 at the end
            }}
          >
            YMS
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }} // little delay makes it smooth
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '14px',
              position: 'absolute',
              marginTop: '120px', // 150px below YMS (which is at -30px), just like "That's the" is 150px above YMS
            }}
          >
            literally
          </motion.div>
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[15] w-full h-full pointer-events-none"
        />
      </div>
    </section>
  );
}
