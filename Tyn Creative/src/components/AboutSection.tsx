import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: '2+',   label: 'Years Experience' },
  { number: '15+',  label: 'Projects Shipped' },
  { number: '10+',  label: 'Technologies' },
  { number: '100%', label: 'Passion' },
];

function StatCounter({ number, label, delay }: { number: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.2, 0, 0, 1] }}
      style={{ textAlign: 'center' }}
    >
      <motion.div
        className="stat-number"
        initial={{ scale: 0.8 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.1, ease: [0.05, 0.7, 0.1, 1] }}
      >
        {number}
      </motion.div>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginTop: '0.5rem', letterSpacing: '0.03em' }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;
    const lines = textRef.current.querySelectorAll('.reveal-line');
    const ctx = gsap.context(() => {
      gsap.from(lines, {
        opacity: 0, y: 36, duration: 0.9, stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 75%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* Left: Text */}
          <div ref={textRef}>
            <p className="section-label">About Me</p>
            <h2
              className="reveal-line"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                letterSpacing: '-0.03em',
                color: 'var(--color-white)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Crafting interfaces<br />that feel <span className="text-gradient">alive</span>
            </h2>

            <p
              className="reveal-line"
              style={{ fontSize: '1rem', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '1rem' }}
            >
              I'm Nguyen Thi My Tuyen — a frontend developer from Ho Chi Minh City, Vietnam.
              I specialise in building immersive, high-performance web experiences using React,
              TypeScript, and motion design.
            </p>
            <p
              className="reveal-line"
              style={{ fontSize: '1rem', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '2rem' }}
            >
              Whether it's a pixel-perfect landing page, a 3D interactive scene, or a
              complex web application — I bring the same care and craft to every line of code.
              Currently seeking a frontend internship opportunity.
            </p>

            <motion.button
              className="btn-ghost"
              style={{ padding: '0.75rem 2rem', fontSize: '0.9rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, ease: [0.2, 0, 0, 1] }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Work Together →
            </motion.button>
          </div>

          {/* Right: Visual panel */}
          <div style={{ position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.05, 0.7, 0.1, 1] }}
              style={{
                position: 'relative',
                height: 400,
                borderRadius: 24,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(168,199,250,0.07) 0%, rgba(203,166,247,0.07) 50%, rgba(243,139,168,0.07) 100%)',
                border: '1px solid var(--glass-border)',
              }}
            >
              {/* Grid pattern */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="tyn-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-cyan)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#tyn-grid)" />
              </svg>

              {/* Glowing orbs */}
              <div className="animate-float" style={{
                position: 'absolute', top: '20%', left: '20%',
                width: 120, height: 120, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(168,199,250,0.35) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }} />
              <div className="animate-float" style={{
                position: 'absolute', bottom: '25%', right: '20%',
                width: 100, height: 100, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(203,166,247,0.35) 0%, transparent 70%)',
                filter: 'blur(16px)',
                animationDelay: '-3s',
              }} />

              {/* Center mark */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 800, lineHeight: 1 }}>
                  <span className="text-gradient">TYN</span>
                </span>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.22em', color: 'var(--color-muted-2)', textTransform: 'uppercase' }}>
                  Based in HCMC
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          marginTop: '5rem',
          paddingTop: '4rem',
          borderTop: '1px solid var(--glass-border)',
        }}>
          {STATS.map((stat, i) => (
            <StatCounter key={stat.label} number={stat.number} label={stat.label} delay={i * 0.1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div > div:first-of-type { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #about > div > div:last-of-type  { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
