import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const SPRING = { damping: 28, stiffness: 280, mass: 0.5 };

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const dotRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const dotX = useSpring(0, SPRING);
  const dotY = useSpring(0, SPRING);
  const ringX = useSpring(0, { damping: 18, stiffness: 120, mass: 1 });
  const ringY = useSpring(0, { damping: 18, stiffness: 120, mass: 1 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotRef.current = { x: e.clientX, y: e.clientY };
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      ringX.set(e.clientX - 20);
      ringY.set(e.clientY - 20);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as Element;
      const isInteractive = el.closest('a, button, [role="button"], input, textarea, .project-card, .service-card');
      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', checkHover);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkHover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: clicked ? 0.5 : hovered ? 0 : 1,
          opacity: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovered ? 2.2 : clicked ? 0.8 : 1,
          opacity: clicked ? 0.5 : 0.9,
          borderColor: hovered ? 'rgba(191, 0, 255, 0.8)' : 'rgba(0, 245, 255, 0.6)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}