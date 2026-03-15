import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef, useMemo } from 'react';

const steps = [
  {
    number: '1',
    text: 'Coleta de dados\noperacionais e do pátio',
  },
  {
    number: '2',
    text: 'Construção da\nréplica virtual via\nhistórico operacional',
  },
  {
    number: '3',
    text: 'Otimização global via\nalgoritmo PSO',
  },
  {
    number: '4',
    text: 'Geração de instruções\ndiretas para a operação',
  },
];

const COLOR_GRAY = '#E2E8EE'; // Neutral 200 equivalent
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
  if (char === '\n') return <br />;
  return <motion.span style={{ color }}>{char}</motion.span>;
}

function AnimatedText({
  text,
  progress,
  charOffset,
  totalChars,
  style,
}: {
  text: string;
  progress: MotionValue<number>;
  charOffset: number;
  totalChars: number;
  style?: React.CSSProperties;
}) {
  const chars = useMemo(() => text.split(''), [text]);
  return (
    <span style={style}>
      {chars.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          progress={progress}
          charIndex={charOffset + i}
          totalChars={totalChars}
        />
      ))}
    </span>
  );
}

function StepRow({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.65', 'start 0.30'],
  });

  const totalCharsSource = step.number + ' ' + step.text;
  const totalChars = totalCharsSource.length;

  return (
    <div ref={ref} className="grid grid-cols-[1fr_2px_1fr] min-h-[40vh] md:min-h-[50vh] relative">
      {/* Left Column */}
      <div className="flex flex-col justify-center items-end pr-10 md:pr-16 text-right">
        {isLeft && (
          <div className="relative group">
            <h3 className="relative">
              <AnimatedText
                text={step.text}
                progress={scrollYProgress}
                charOffset={0}
                totalChars={totalChars}
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 500,
                  fontSize: 'clamp(24px, 4vw, 56px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  display: 'inline-block',
                }}
              />
              <span className="inline-block align-bottom ml-4 mb-[0.2em]">
                <AnimatedText
                  text={step.number}
                  progress={scrollYProgress}
                  charOffset={step.text.length}
                  totalChars={totalChars}
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontWeight: 500,
                    fontSize: 'clamp(14px, 1.5vw, 24px)',
                    opacity: 0.8,
                  }}
                />
              </span>
            </h3>
          </div>
        )}
      </div>

      {/* Center column (spacer for the global line) */}
      <div className="relative h-full" />

      {/* Right Column */}
      <div className="flex flex-col justify-center items-start pl-10 md:pl-16 text-left">
        {!isLeft && (
          <div className="relative group">
            <div className="mb-2">
              <AnimatedText
                text={step.number}
                progress={scrollYProgress}
                charOffset={0}
                totalChars={totalChars}
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontWeight: 500,
                  fontSize: 'clamp(14px, 1.5vw, 24px)',
                  opacity: 0.8,
                }}
              />
            </div>
            <h3>
              <AnimatedText
                text={step.text}
                progress={scrollYProgress}
                charOffset={step.number.length}
                totalChars={totalChars}
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 500,
                  fontSize: 'clamp(24px, 4vw, 56px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              />
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export function PortSteps() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const lineColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [COLOR_GRAY, COLOR_NEON, COLOR_DARK]
  );

  return (
    <section id="como-funciona" ref={containerRef} className="bg-white py-32 overflow-hidden relative">
      {/* Single Continuous Central Line */}
      <div
        className="absolute left-1/2 top-32 bottom-32 w-[2px] -translate-x-1/2 bg-[#F2F2F2]"
        style={{ zIndex: 0 }}
      >
        <motion.div
          className="h-full w-full"
          style={{ backgroundColor: lineColor }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {steps.map((step, i) => (
          <StepRow key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}

