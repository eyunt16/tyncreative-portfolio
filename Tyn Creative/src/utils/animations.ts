import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export const fadeIn = (duration = 0.5) => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration } },
  };
};

export const slideIn = (direction = 'left', duration = 0.5) => {
  return {
    initial: { x: direction === 'left' ? '-100%' : '100%', opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration } },
  };
};

export const scaleUp = (duration = 0.5) => {
  return {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { duration } },
  };
};

export const animateCursor = (cursorRef: React.RefObject<HTMLDivElement>, x: number, y: number) => {
  gsap.to(cursorRef.current, {
    x,
    y,
    duration: 0.2,
    ease: 'power3.out',
  });
};

export const parallaxEffect = (element: HTMLElement, speed: number) => {
  const scrollY = window.scrollY;
  const offset = scrollY * speed;
  element.style.transform = `translateY(${offset}px)`;
};