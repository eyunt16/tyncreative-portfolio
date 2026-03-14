import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { ParticleField } from '../scenes/InteractiveScene';
import { useMousePosition } from '../hooks/useMousePosition';
import gsap from 'gsap';

/* Kinetic title letters */
const LINE_1 = 'Frontend Developer'.split('')
const LINE_2 = 'Creative'.split('')

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.4 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 36, rotateX: -40 },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.6, ease: [0.05, 0.7, 0.1, 1] },
  },
};

export default function HeroSection() {
  const { normalizedX, normalizedY } = useMousePosition();
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const chevronRef  = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const els = [subtitleRef.current, taglineRef.current, chevronRef.current].filter(Boolean);
    gsap.from(els, { opacity: 0, y: 20, duration: 0.9, delay: 1.6, stagger: 0.15, ease: 'power3.out' });
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 3D Particle Canvas */}
      <div className="hero-canvas">
        <Canvas dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
          <PerspectiveCamera makeDefault fov={60} position={[0, 0, 5]} />
          <ParticleField mouseX={normalizedX} mouseY={normalizedY} />
        </Canvas>
      </div>

      {/* Ambient Glow Blobs */}
      <div style={{
        position: 'absolute', top: '15%', left: '5%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(168,199,250,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '5%',
        width: 420, height: 420,
        background: 'radial-gradient(circle, rgba(203,166,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(60px)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', maxWidth: 960, padding: '0 2rem',
      }}>
        {/* Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0, 0, 1] }}
          style={{ justifyContent: 'center', marginBottom: '2.5rem' }}
        >
          <span />
          Frontend Developer · Ho Chi Minh City, Vietnam
        </motion.div>

        {/* Kinetic Headline — Line 1 */}
        <div style={{ perspective: 900 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex', flexWrap: 'nowrap', justifyContent: 'center',
              gap: '0 0.02em', marginBottom: '0.08em',
            }}
          >
           {LINE_1.map((char, i) => (
    <motion.span
      key={`l1-${i}`}
      variants={charVariants}
      style={{
        display: "inline-block",
        overflow: "hidden",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
        lineHeight: 1.05,
        color: "var(--color-white)",
        letterSpacing: "0.05em"
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
          </motion.div>

          {/* Line 2 — gradient */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.02em' }}
          >
            {LINE_2.map((char, i) => (
              <motion.span
                key={`l2-${i}`}
                variants={charVariants}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                  lineHeight: 1.05,
                  background: 'var(--gradient-brand)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.03em',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
            color: 'var(--color-muted)',
            letterSpacing: '-0.01em',
            marginTop: '1.25rem',
            marginBottom: '0.6rem',
          }}
        >
          crafting immersive digital experiences.
        </p>

        {/* Sub */}
        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
            color: 'var(--color-muted)',
            lineHeight: 1.8,
            maxWidth: 520,
            margin: '0 auto 3rem',
          }}
        >
          I'm Tuyen — I build fast, beautiful web interfaces with React, TypeScript,
          and motion design. Always learning, always shipping.
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8, ease: [0.2, 0, 0, 1] }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            className="btn-glow"
            style={{ padding: '0.875rem 2.5rem', fontSize: '1rem' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </motion.button>
          <motion.button
            className="btn-ghost"
            style={{ padding: '0.875rem 2.5rem', fontSize: '1rem' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <div
        ref={chevronRef}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}
      >
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--color-muted-2)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 24, height: 40,
            border: '1.5px solid var(--glass-border)',
            borderRadius: 12,
            display: 'flex', justifyContent: 'center', paddingTop: 6,
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 4, height: 8, borderRadius: 2, background: 'var(--color-cyan)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}