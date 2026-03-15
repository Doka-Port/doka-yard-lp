import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Captura',
    description:
      'Câmeras e sensores IoT capturam a posição e status de cada container no pátio em tempo real.',
  },
  {
    number: '02',
    title: 'Processamento',
    description:
      'Motor de IA analisa ocupação, previsão de demanda e restrições operacionais simultaneamente.',
  },
  {
    number: '03',
    title: 'Decisão',
    description:
      'Sistema gera recomendações otimizadas de alocação, remanejo e sequenciamento de operações.',
  },
  {
    number: '04',
    title: 'Execução',
    description:
      'Operadores recebem instruções claras via dashboard, com feedback loop contínuo de performance.',
  },
];

export function PortProcess() {
  return (
    <section
      id="processo"
      className="py-28 md:py-36 relative"
      style={{ backgroundColor: '#fff' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
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
            Fluxo
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 600,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#050524',
            }}
          >
            Do dado à decisão,{' '}
            <span style={{ color: 'var(--port-brand-blue)' }}>
              em segundos
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 md:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-5 right-0 w-full h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(5, 5, 36, 0.12), rgba(5, 5, 36, 0.03))',
                    left: '50%',
                  }}
                />
              )}

              <div className="relative z-10 md:text-center md:px-6">
                <div
                  className="mb-6 inline-block"
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontWeight: 400,
                    fontSize: '11px',
                    color: 'var(--port-brand-blue)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {step.number}
                </div>

                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'var(--font-geist)',
                    fontWeight: 600,
                    fontSize: '20px',
                    color: '#050524',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 400,
                    fontSize: '13px',
                    lineHeight: 1.7,
                    color: 'rgba(5, 5, 36, 0.45)',
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}