import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: '✦',
    title: 'Motion Design',
    description: 'Cinematic animations and micro-interactions that make interfaces feel alive — from UI transitions to product demo reels.',
    color: '#00f5ff',
  },
  {
    icon: '⬡',
    title: '3D & WebGL',
    description: 'Immersive browser-based 3D experiences using Three.js and React Three Fiber, with physically-based rendering.',
    color: '#bf00ff',
  },
  {
    icon: '◈',
    title: 'Web Development',
    description: 'High-performance React applications with TypeScript, server-side rendering, and world-class UX.',
    color: '#ff006e',
  },
  {
    icon: '◉',
    title: 'Brand Identity',
    description: 'Motion-first design systems — logo, typography, color, and a component library that scales.',
    color: '#00f5ff',
  },
  {
    icon: '⟁',
    title: 'AR / VR',
    description: 'Augmented and virtual reality experiences for mobile and headset platforms using native AR frameworks.',
    color: '#bf00ff',
  },
  {
    icon: '⬟',
    title: 'AI Experiences',
    description: 'Generative AI interfaces, real-time model visualisation, and LLM-powered creative tools.',
    color: '#ff006e',
  },
];

export default function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.service-card');
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="section-padding" style={{ background: 'linear-gradient(to bottom, transparent, rgba(11,11,20,0.8), transparent)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '4rem' }}
        >
          <p className="section-label">What We Do</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            color: 'var(--color-white)',
            lineHeight: 1.1,
          }}>
            Capabilities built<br />
            <span className="text-gradient">for tomorrow</span>
          </h2>
        </motion.div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {SERVICES.map((service) => (
            <div key={service.title} className="service-card">
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.25rem',
                background: `radial-gradient(circle, ${service.color}22, transparent)`,
                border: `1px solid ${service.color}33`,
                color: service.color,
                boxShadow: `0 0 20px ${service.color}22`,
              }}>
                {service.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.125rem',
                color: 'var(--color-white)',
                marginBottom: '0.75rem',
              }}>
                {service.title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(240,244,255,0.5)',
                lineHeight: 1.75,
              }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
