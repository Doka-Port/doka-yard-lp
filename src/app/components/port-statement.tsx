import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef, useMemo } from 'react';

const COLOR_GRAY = '#E2E8EE';
const COLOR_NEON = '#00BFFF';
const COLOR_DARK = '#050524';

function AnimatedChar({
  char,
  progress,
  charIndex,
  totalChars,
}: {
  char: string;
  progress: MotionValue<number>;
  charIndex: number;
  totalChars: number;
}) {
  const spread = 0.35;
  const start = charIndex / (totalChars + totalChars * spread);
  const mid = start + (spread * 0.35) / (1 + spread);
  const end = start + spread / (1 + spread);

  const color = useTransform(
    progress,
    [start, mid, end],
    [COLOR_GRAY, COLOR_NEON, COLOR_DARK]
  );

  if (char === ' ') return <span>{'\u00A0'}</span>;
  return <motion.span style={{ color }}>{char}</motion.span>;
}

function AnimatedText({
  text,
  progress,
}: {
  text: string;
  progress: MotionValue<number>;
}) {
  const chars = useMemo(() => text.split(''), [text]);
  const totalChars = chars.length;
  
  return (
    <span style={{ display: 'inline-block' }}>
      {chars.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          progress={progress}
          charIndex={i}
          totalChars={totalChars}
        />
      ))}
    </span>
  );
}

export function PortStatement() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.65', 'start 0.3'],
  });

  const { scrollYProgress: edgeProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const whitePathArray = [
    // Convex (Bulging up) - Amplitude reduced from y=20 to y=60
    "M 0 100 L 50 100 Q 75 100, 90 92 L 135 68 Q 150 60, 175 60 L 825 60 Q 850 60, 865 68 L 910 92 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
    // Flat
    "M 0 100 L 50 100 Q 75 100, 90 100 L 135 100 Q 150 100, 175 100 L 825 100 Q 850 100, 865 100 L 910 100 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
    // Concave (Dipping down into the white section) - Amplitude reduced from y=180 to y=140
    "M 0 100 L 50 100 Q 75 100, 90 108 L 135 132 Q 150 140, 175 140 L 825 140 Q 850 140, 865 132 L 910 108 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z"
  ];

  const tabPath = useTransform(edgeProgress, [0, 0.5, 1], whitePathArray);

  return (
    <section
      ref={containerRef}
      className="relative z-10 flex flex-col"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* SVG Transition Mask over the boundary */}
      <div 
        className="absolute w-full z-20 pointer-events-none"
        style={{
          left: 0,
          top: '-100px', // Covers 100px above and 100px below the boundary
          height: '200px'
        }}
      >
        <motion.svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          {/* This dark rectangle acts as the background for the concave plunge without leaking down */}
          <rect x="0" y="100" width="1000" height="100" fill="rgb(10,18,24)" />
          <motion.path d={tabPath} fill="#ffffff" />
        </motion.svg>
      </div>

      <div className="relative z-30 pt-24 pb-28 md:py-32 px-6 md:px-12 w-full">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              color: '#050524',
            }}
          >
            Imagine o terminal como uma <AnimatedText text="ponte inteligente" progress={scrollYProgress} />, conectando ferrovias,
            rodovias e navios de forma fluida.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
