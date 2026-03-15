import wordmarkDark from '../../imports/Wordmark_White.svg';

export function PortFooter() {
  return (
    <footer
      id="contato"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b"
          style={{ borderColor: 'rgba(5, 5, 36, 0.08)' }}
        >
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <img
              src={wordmarkDark}
              alt="Doka Yard Intelligence"
              style={{ 
                height: '18px', 
                width: 'auto', 
                opacity: 0.9,
                filter: 'invert(1) brightness(0.1)' // Torna a logo branca em preta
              }}
            />
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8">
            {['Como Funciona', 'Sobre'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                className="transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: 'rgba(5, 5, 36, 0.4)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'rgba(5, 5, 36, 0.8)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'rgba(5, 5, 36, 0.4)')
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
              color: 'rgba(5, 5, 36, 0.3)',
            }}
          >
            © 2026 Doka Yard Intelligence.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(5, 5, 36, 0.3)',
            }}
          >
            Feito com propósito.
          </p>
        </div>
      </div>
    </footer>
  );
}
