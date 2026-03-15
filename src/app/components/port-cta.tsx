import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function PortCTA() {
  return (
    <section
      id="sobre"
      className="py-28 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: '#fff' }}
    >
      {/* Subtle gradient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(123, 179, 204, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[800px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
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
            Hackathon 2026
          </span>

          <h2
            className="mb-6"
            style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 600,
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#050524',
            }}
          >
            O pátio portuário é um dos
            <br />
            ambientes mais complexos
            <br />
            <span style={{ color: 'var(--port-brand-blue)' }}>
              da logística global
            </span>
          </h2>

          <p
            className="max-w-[520px] mx-auto mb-10"
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(5, 5, 36, 0.5)',
            }}
          >
            Doka Yard Intelligence é a plataforma que transforma dados dispersos
            em decisões operacionais — conectando visão computacional, IoT e
            inteligência artificial para resolver gargalos reais.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href="#contato"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #7BB3CC, #5B9AB5)',
                fontFamily: 'var(--font-geist)',
                fontWeight: 500,
                fontSize: '14px',
                color: '#fff',
                boxShadow: '0 4px 24px rgba(123, 179, 204, 0.25)',
              }}
            >
              Falar com o time
              <ArrowRight size={16} strokeWidth={1.5} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Metrics — minimal, just 2-3 key points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-3 gap-8 pt-12 border-t"
          style={{ borderColor: 'rgba(5, 5, 36, 0.08)' }}
        >
          {[
            { label: 'Redução de tempo ocioso', value: '~40%' },
            { label: 'Precisão de alocação', value: '99%+' },
            { label: 'Monitoramento contínuo', value: '24/7' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 600,
                  fontSize: '24px',
                  color: '#050524',
                  marginBottom: '4px',
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                  fontSize: '12px',
                  color: 'rgba(5, 5, 36, 0.35)',
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}