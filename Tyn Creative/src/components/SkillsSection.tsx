import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Skill data ─────────────────────────────────────────────────────────── */
const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    icon: '◈',
    color: 'var(--color-cyan)',
    skills: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Vite'],
  },
  {
    label: 'Styling',
    icon: '✦',
    color: 'var(--color-violet)',
    skills: ['TailwindCSS', 'CSS Modules', 'Framer Motion', 'GSAP', 'Sass'],
  },
  {
    label: '3D & WebGL',
    icon: '⬡',
    color: 'var(--color-pink)',
    skills: ['Three.js', 'React Three Fiber', 'Drei', 'GLSL Shaders', 'WebGL'],
  },
  {
    label: 'Tooling',
    icon: '◉',
    color: 'var(--color-cyan)',
    skills: ['Git & GitHub', 'Node.js', 'Express', 'REST APIs', 'Figma'],
  },
];

/* ─── Skill Chip ─────────────────────────────────────────────────────────── */
function SkillChip({ name, color }: { name: string; color: string }) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.04 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.35rem 0.9rem',
        borderRadius: 50,
        fontSize: '0.8125rem',
        fontWeight: 500,
        fontFamily: 'var(--font-sans)',
        color: color,
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
        transition: 'box-shadow 0.2s',
        cursor: 'default',
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </motion.span>
  );
}

/* ─── Category Card ──────────────────────────────────────────────────────── */
function CategoryCard({
  label, icon, color, skills,
}: { label: string; icon: string; color: string; skills: string[] }) {
  return (
    <div
      className="skill-cat-card"
      style={{
        padding: '1.75rem',
        borderRadius: 18,
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'border-color 0.3s var(--ease-standard), box-shadow 0.3s var(--ease-standard), transform 0.35s var(--ease-emphasized)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = color;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 32px color-mix(in srgb, ${color} 12%, transparent)`;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: 42, height: 42, borderRadius: 11,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem',
          background: `color-mix(in srgb, ${color} 12%, transparent)`,
          border: `1px solid color-mix(in srgb, ${color} 24%, transparent)`,
          color,
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1rem',
          color: 'var(--color-white)',
          letterSpacing: '-0.01em',
        }}>
          {label}
        </h3>
      </div>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {skills.map((s) => (
          <SkillChip key={s} name={s} color={color} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function SkillsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.skill-cat-card');
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 48,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      className="section-padding"
      style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg-surface) 40%, transparent)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <p className="section-label">Tech Stack</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            color: 'var(--color-white)',
            lineHeight: 1.1,
          }}>
            Tools I work{' '}
            <span className="text-gradient">with every day</span>
          </h2>
          <p style={{
            marginTop: '1rem',
            fontSize: '1rem',
            color: 'var(--color-muted)',
            lineHeight: 1.75,
            maxWidth: 500,
          }}>
            A curated stack I've refined building production apps — from pixel-perfect UIs
            to immersive 3D scenes.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <CategoryCard key={cat.label} {...cat} />
          ))}
        </div>

        {/* Currently learning strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0, 0, 1] }}
          style={{
            marginTop: '3rem',
            padding: '1.25rem 1.75rem',
            borderRadius: 14,
            background: 'var(--state-hover)',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-cyan)',
            flexShrink: 0,
          }}>
            Currently exploring
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['WebGPU', 'Astro', 'Motion Canvas', 'React Native'].map((s) => (
              <SkillChip key={s} name={s} color="var(--color-muted)" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
