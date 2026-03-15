import wordmarkDark from '../../imports/Wordmark_White.svg';

export function PortFooter() {
  return (
    <footer
      id="contato"
      style={{ backgroundColor: '#050524' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b"
          style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
        >
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <img
              src={wordmarkDark}
              alt="Doka Yard Intelligence"
              style={{ height: '18px', width: 'auto', opacity: 0.8 }}
            />
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8">
            {['Solução', 'Como Funciona', 'Sobre', 'Contato'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                className="transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.35)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')
                }
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            © 2026 Doka Yard Intelligence. Projeto desenvolvido para hackathon.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            Feito com propósito.
          </p>
        </div>
      </div>
    </footer>
  );
}
