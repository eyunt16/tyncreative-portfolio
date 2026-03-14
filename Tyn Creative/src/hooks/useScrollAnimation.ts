import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string | Element | null;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  pin?: boolean;
  stagger?: number;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const targets = el.querySelectorAll('[data-animate]');
    const animateTargets = targets.length > 0 ? targets : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        animateTargets,
        options.from ?? { opacity: 0, y: 60 },
        {
          ...(options.to ?? { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }),
          stagger: options.stagger ?? 0.12,
          scrollTrigger: {
            trigger: options.trigger ?? el,
            start: options.start ?? 'top 82%',
            end: options.end ?? 'bottom 20%',
            scrub: options.scrub,
            pin: options.pin,
            markers: options.markers ?? false,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

export function usePinSection() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current!,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
