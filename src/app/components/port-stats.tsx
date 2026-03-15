import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

interface StatProps {
  value: string;
  label: string;
  suffix?: string;
  delay: number;
}

function AnimatedStat({ value, label, suffix = '', delay }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  
  const numericValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = numericValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div 
        style={{ 
          fontSize: '64px',
          fontWeight: 700,
          color: 'var(--port-white)',
          fontFamily: 'var(--font-geist)',
          lineHeight: '1',
          marginBottom: '12px'
        }}
      >
        {value.includes('+') ? '+' : ''}{count}{suffix}
      </div>
      <div 
        style={{ 
          fontSize: '16px',
          color: 'var(--port-neutral-300)',
          fontFamily: 'var(--font-inter)'
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export function PortStats() {
  return (
    <section 
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--port-ocean-blue)' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, var(--port-white) 2px, var(--port-white) 3px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, var(--port-white) 2px, var(--port-white) 3px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 
            className="mb-6"
            style={{ 
              fontSize: '48px',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: 'var(--port-white)',
              fontFamily: 'var(--font-geist)',
              fontWeight: 700
            }}
          >
            Números que{' '}
            <span style={{ color: 'var(--port-sky-blue)' }}>
              Falam por Si
            </span>
          </h2>
          
          <p 
            className="max-w-2xl mx-auto"
            style={{ 
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'var(--port-neutral-200)',
              fontFamily: 'var(--font-inter)'
            }}
          >
            Resultados comprovados em operações portuárias ao redor do mundo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
          <AnimatedStat 
            value="250" 
            suffix="+"
            label="Portos Conectados" 
            delay={0.1} 
          />
          <AnimatedStat 
            value="15" 
            suffix="M+"
            label="Containers Processados/Ano" 
            delay={0.2} 
          />
          <AnimatedStat 
            value="40" 
            suffix="%"
            label="Redução em Custos Operacionais" 
            delay={0.3} 
          />
          <AnimatedStat 
            value="99" 
            suffix=".8%"
            label="Uptime do Sistema" 
            delay={0.4} 
          />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-lg border-2 transition-all duration-200"
            style={{ 
              borderColor: 'var(--port-sky-blue)',
              color: 'var(--port-white)',
              backgroundColor: 'transparent',
              fontFamily: 'var(--font-geist)',
              fontWeight: 500
            }}
          >
            Ver Todos os Cases de Sucesso
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
