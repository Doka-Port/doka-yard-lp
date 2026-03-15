import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function PortAbout() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress: edgeProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  // upFill covers the top half (extending UP from the curve) for the dark background of PortYMS (#05070A)
  const upFillArray = [
    "M 0 100 L 50 100 Q 75 100, 90 84 L 135 36 Q 150 20, 175 20 L 825 20 Q 850 20, 865 36 L 910 84 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
    "M 0 100 L 50 100 Q 75 100, 90 100 L 135 100 Q 150 100, 175 100 L 825 100 Q 850 100, 865 100 L 910 100 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
    "M 0 100 L 50 100 Q 75 100, 90 116 L 135 164 Q 150 180, 175 180 L 825 180 Q 850 180, 865 164 L 910 116 Q 925 100, 950 100 L 1000 100 L 1000 0 L 0 0 Z",
  ];
  
  // downFill covers the bottom half (extending DOWN from the curve) for the white background of PortAbout (#ffffff)
  const downFillArray = [
    "M 0 100 L 50 100 Q 75 100, 90 84 L 135 36 Q 150 20, 175 20 L 825 20 Q 850 20, 865 36 L 910 84 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
    "M 0 100 L 50 100 Q 75 100, 90 100 L 135 100 Q 150 100, 175 100 L 825 100 Q 850 100, 865 100 L 910 100 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
    "M 0 100 L 50 100 Q 75 100, 90 116 L 135 164 Q 150 180, 175 180 L 825 180 Q 850 180, 865 164 L 910 116 Q 925 100, 950 100 L 1000 100 L 1000 200 L 0 200 Z",
  ];

  const darkTabPath = useTransform(edgeProgress, [0, 0.5, 1], upFillArray);
  const whiteTabPath = useTransform(edgeProgress, [0, 0.5, 1], downFillArray);

  return (
    <section 
      id="sobre"
      ref={containerRef}
      className="relative z-10 w-full bg-white pt-56 md:pt-72 pb-28 md:pb-36 px-6"
    >
      {/* SVG Transition Mask connecting from PortYMS to PortAbout */}
      <div
        className="absolute left-0 w-full z-20 pointer-events-none"
        style={{ top: '-100px', height: '200px' }}
      >
        <motion.svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <motion.path d={darkTabPath} fill="#05070A" /> {/* Dark fills UP into YMS */}
          <motion.path d={whiteTabPath} fill="#ffffff" /> {/* White fills DOWN into About */}
        </motion.svg>
      </div>

      <div className="relative z-30 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center">
        {/* Left Side: Copy */}
        <motion.div 
          className="flex flex-col justify-center max-w-xl"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-[34px] xl:text-[38px] font-semibold leading-[1.3] tracking-tight"
            style={{ 
              fontFamily: 'var(--font-inter)',
              color: '#1a1f2e',
            }}
          >
            Solução validada pelo mercado e pela operação. O YMS vencedor do CNIT 2025 ganhando escala sob a mentoria estratégica da equipe da Santos Brasil.
          </h2>
          <motion.p
            className="mt-6 text-lg text-port-neutral-600 leading-relaxed hidden"
            style={{ fontFamily: 'var(--font-inter)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Escondendo a sub-legenda para focar unicamente na frase exata da referência, você pode remover o hidden caso queira o texto extra. */}
          </motion.p>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div 
          className="relative w-full aspect-[4/3] lg:aspect-[1.6/1]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Replace src with the actual image path you save in public folder */}
          <img 
            src="/reuniao.jpg" 
            alt="Equipe Doka em reunião no Centro de Controle" 
            className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
          />
          {/* Subtle neon glow behind the image to keep the identity */}
          <div className="absolute -inset-4 z-[-1] bg-gradient-to-tr from-port-brand-blue/20 to-port-sky-blue/20 rounded-[2.5rem] blur-xl opacity-60"></div>
        </motion.div>
      </div>
    </section>
  );
}
