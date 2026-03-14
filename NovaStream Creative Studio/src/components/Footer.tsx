import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter',  href: 'https://twitter.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
];

const FOOTER_NAV = [
  { label: 'Skills',   href: '#skills' },
  { label: 'Work',     href: '#projects' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--glass-border)',
        padding: '3rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: '-40%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 200,
        background: 'radial-gradient(ellipse, color-mix(in srgb, var(--color-cyan) 5%, transparent) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Top row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '1.5rem', marginBottom: '2.5rem',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'var(--gradient-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--glow-violet)',
            }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 13, fontFamily: 'var(--font-display)' }}>T</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem',
              background: 'var(--gradient-brand)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              letterSpacing: '-0.01em',
            }}>
              TYN Creative
            </span>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {FOOTER_NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{ fontSize: '0.875rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {SOCIAL_LINKS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, color: 'var(--color-cyan)' }}
                style={{ fontSize: '0.8125rem', color: 'var(--color-muted-2)', textDecoration: 'none' }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--glass-border)', marginBottom: '1.5rem' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted-2)' }}>
            © 2025 Nguyen Thi My Tuyen · TYN Creative. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted-2)', opacity: 0.7 }}>
            Designed &amp; built with ✦ in Ho Chi Minh City
          </p>
        </div>
      </div>
    </footer>
  );
}
