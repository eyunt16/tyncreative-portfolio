import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Work',     href: '#projects' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
];

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="theme-toggle-icon"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5"  />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34"  />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"  />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="theme-toggle-icon"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { theme, toggleTheme }    = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleThemeToggle = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    toggleTheme();
    setTimeout(() => root.classList.remove('theme-transitioning'), 500);
  }, [toggleTheme]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  const ThemeButton = ({ size = 40, className = '' }: { size?: number; className?: string }) => (
    <motion.button
      onClick={handleThemeToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.88 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`theme-toggle-btn ${className}`}
      style={{ width: size, height: size, color: 'var(--color-muted)' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0,   scale: 1,   opacity: 1 }}
          exit={{    rotate:  90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );

  return (
    <>
      <motion.nav
        className="glass"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '0 2rem',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: scrolled ? 'blur(28px)' : 'blur(10px)',
          WebkitBackdropFilter: scrolled ? 'blur(28px)' : 'blur(10px)',
          background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg-top)',
          borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
          transition: 'all 0.4s var(--ease-standard)',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
      >
        {/* Logo */}
<a
  href="#hero"
  onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}
  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
>

  {/* Icon */}
  <div
    style={{
      width: 34,
      height: 34,
      borderRadius: 10,
      background: 'var(--gradient-brand)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--glow-violet)',
      flexShrink: 0,
    }}
  >
    <span
      style={{
        color: '#fff',
        fontWeight: 800,
        fontSize: 15,
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.02em'
      }}
    >
      T
    </span>
  </div>

  {/* Logo */}
<a
  href="#hero"
  onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}
  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
>

  {/* Brand Text */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      lineHeight: 1.05
    }}
  >

    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '1.35rem',
        letterSpacing: '0.05em',
        color: 'var(--color-text)'
      }}
    >
      TYN
    </span>

    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: '0.9rem',
        background: 'var(--gradient-brand)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      Creative
    </span>

  </div>

</a>

</a>
        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="hidden-mobile">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            >
              {link.label}
            </motion.a>
          ))}

          <ThemeButton />

          <motion.button
            className="btn-glow"
            style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleNav('#contact')}
          >
            Hire Me
          </motion.button>
        </div>

        {/* Hamburger (mobile) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hamburger-group">
          <ThemeButton size={36} className="hamburger" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', padding: 8 }}
            className="hamburger"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: 'var(--color-muted)' }}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 7 }
                    : i === 1 ? { opacity: 0, scaleX: 0 }
                    : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 997, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.05, 0.7, 0.1, 1] }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '270px',
                zIndex: 998, background: 'var(--drawer-bg)', backdropFilter: 'blur(32px)',
                padding: '5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
                borderLeft: '1px solid var(--nav-border)',
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label} href={link.href} className="nav-link"
                  style={{ fontSize: '1.05rem', fontWeight: 500 }}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, ease: [0.2, 0, 0, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hamburger-group { display: none !important; }
        }
      `}</style>
    </>
  );
}