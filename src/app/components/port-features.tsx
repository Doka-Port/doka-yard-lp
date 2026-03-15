import { motion, useScroll, useTransform } from 'motion/react';
import { Scan, Route, LayoutGrid, Brain } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Scan,
    title: 'Visão Computacional',
    description:
      'Identificação automática de containers por câmeras, rastreando posição e status em tempo real no pátio.',
  },
  {
    icon: Route,
    title: 'Rotas Otimizadas',
    description:
      'Algoritmos de pathfinding que reduzem movimentações desnecessárias de equipamentos e veículos internos.',
  },
  {
    icon: LayoutGrid,
    title: 'Alocação Inteligente',
    description:
      'IA que define a melhor posição para cada container baseada em destino, prioridade e previsão de saída.',
  },
  {
    icon: Brain,
    title: 'Predição de Demanda',
    description:
      'Modelos preditivos que antecipam picos operacionais e permitem planejamento proativo de recursos.',
  },
];

export function PortFeatures() {
  return (
    <section
      id="solucao"
      className="relative z-10 py-28 md:py-36"
      style={{ backgroundColor: '#fff' }}
    >

      <div className="relative z-30 max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
  
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span
            className="inline-block mb-5 px-3 py-1 rounded-full"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#050524',
              backgroundColor: 'rgba(5, 5, 36, 0.05)',
              border: '1px solid rgba(5, 5, 36, 0.1)',
            }}
          >
            Capacidades
          </span>

          <h2
            className="max-w-lg"
            style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 600,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#050524',
            }}
          >
            Tecnologia que entende a{' '}
            <span style={{ color: 'var(--port-brand-blue)' }}>
              complexidade portuária
            </span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-px rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'rgba(5, 5, 36, 0.06)' }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="p-10 md:p-12 group transition-colors duration-300"
              style={{
                backgroundColor: '#fff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(5, 5, 36, 0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              <div
                className="mb-6 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(5, 5, 36, 0.05)',
                  border: '1px solid rgba(5, 5, 36, 0.08)',
                }}
              >
                <feature.icon
                  size={20}
                  strokeWidth={1.5}
                  style={{ color: '#050524' }}
                />
              </div>

              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 500,
                  fontSize: '18px',
                  color: '#050524',
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'rgba(5, 5, 36, 0.5)',
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}