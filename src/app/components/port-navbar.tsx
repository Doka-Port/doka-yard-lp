import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import wordmarkSvg from '../../imports/Wordmark_White.svg';

export function PortNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Sobre', href: '#sobre' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <nav
        className="flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500"
        style={{
          backgroundColor: isScrolled
            ? 'rgba(10, 18, 24, 0.7)'
            : 'rgba(10, 18, 24, 0.4)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(168, 212, 232, 0.12)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 pl-3 pr-4">
          <img
            src={wordmarkSvg}
            alt="Doka"
            style={{ height: '20px', width: 'auto' }}
          />
        </div>

        {/* Separator */}
        <div
          className="w-px h-5 mx-1 hidden md:block"
          style={{ backgroundColor: 'rgba(168, 212, 232, 0.15)' }}
        />

        {/* Nav Links — desktop only */}
        <div className="hidden md:flex items-center gap-1 px-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-white/[0.08]"
              style={{
                fontFamily: 'var(--font-geist)',
                fontWeight: 400,
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,1)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Separator — desktop only */}
        <div
          className="w-px h-5 mx-1 hidden md:block"
          style={{ backgroundColor: 'rgba(168, 212, 232, 0.15)' }}
        />

        {/* CTA */}
        <motion.a
          href="#contato"
          onClick={(e) => { e.preventDefault(); handleNavClick('#contato'); }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-1.5 rounded-full ml-1 transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #00BFFF, #046F96)',
            fontFamily: 'var(--font-geist)',
            fontWeight: 500,
            fontSize: '13px',
            color: '#fff',
          }}
        >
          Acessar demo
        </motion.a>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 ml-1 rounded-full transition-colors duration-200 hover:bg-white/[0.08]"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-4 h-[1.5px] bg-white/70 mb-[4px]"
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-4 h-[1.5px] bg-white/70 mb-[4px]"
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-4 h-[1.5px] bg-white/70"
          />
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 rounded-2xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: 'rgba(10, 18, 24, 0.92)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(168, 212, 232, 0.12)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-6 py-4 text-left transition-colors duration-200 hover:bg-white/[0.06]"
                style={{
                  fontFamily: 'var(--font-geist)',
                  fontWeight: 400,
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.75)',
                  borderBottom: i < navLinks.length - 1 ? '1px solid rgba(168,212,232,0.08)' : 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
