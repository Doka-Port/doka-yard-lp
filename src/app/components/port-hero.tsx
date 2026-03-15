import { motion } from 'motion/react';
import HeroPort from '../../imports/Hero_Port.png';

export function PortHero() {
  const heroImage = HeroPort;
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image — scale + fade reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={heroImage}
          alt="Port aerial view"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,18,24,0.25) 0%, rgba(10,18,24,0) 30%, rgba(10,18,24,0) 55%, rgba(10,18,24,0.85) 100%)',
          }}
        />
      </motion.div>
    </section>
  );
}