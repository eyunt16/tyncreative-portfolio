import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchProjects } from '../services/api';
import type { Project } from '../types';

const CATEGORIES = ['All', 'Web App', 'UI/UX', 'Landing Page', '3D / WebGL', 'Open Source'];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  };

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.05, 0.7, 0.1, 1] }}
      style={{
        height: index % 3 === 0 ? 420 : 360,
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s linear' : 'transform 0.55s var(--ease-standard)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="project-card-image"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        loading="lazy"
      />

      <div className="project-card-overlay">
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--color-cyan)',
            padding: '2px 10px', borderRadius: 50,
            border: '1px solid color-mix(in srgb, var(--color-cyan) 30%, transparent)',
            background: 'color-mix(in srgb, var(--color-cyan) 10%, transparent)',
          }}>
            {project.category}
          </span>
          <span style={{
            fontSize: '0.7rem', fontWeight: 500,
            color: 'var(--color-muted)',
            padding: '2px 10px', borderRadius: 50,
            border: '1px solid var(--glass-border)',
          }}>
            {project.year}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-white)' }}>
          {project.title}
        </h3>

        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
          transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
          style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.65, overflow: 'hidden' }}
        >
          {project.description}
        </motion.p>
      </div>

      {/* Subtle inner glow on hover */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          boxShadow: 'inset 0 0 60px color-mix(in srgb, var(--color-cyan) 6%, transparent)',
          pointerEvents: 'none', borderRadius: 16,
        }} />
      )}
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects]         = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProjects(activeCategory)
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <section id="projects" className="section-padding">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <p className="section-label">Selected Work</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            color: 'var(--color-white)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            Things I've{' '}
            <span className="text-gradient">built</span>
          </h2>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.18 }}
                style={{
                  padding: '0.4rem 1.1rem',
                  borderRadius: 50,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  border: activeCategory === cat
                    ? '1px solid var(--color-cyan)'
                    : '1px solid var(--glass-border)',
                  background: activeCategory === cat
                    ? 'color-mix(in srgb, var(--color-cyan) 12%, transparent)'
                    : 'transparent',
                  color: activeCategory === cat ? 'var(--color-cyan)' : 'var(--color-muted)',
                  transition: 'all 0.22s var(--ease-standard)',
                  cursor: 'none',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                height: 380, borderRadius: 16,
                background: 'var(--card-bg)',
                animation: 'softPulse 2.5s ease-in-out infinite',
              }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}