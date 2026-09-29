import { useEffect } from 'react';

/**
 * Editorial Scroll Reveal Hook
 * Observes elements with .reveal-on-scroll inside a scrollable container.
 * When an element enters the viewport, adds .is-revealed and disconnects.
 * Runs once for a calm, editorial feel inspired by Kuon Yagi.
 */
export function useScrollReveal(containerRef, deps = []) {
  useEffect(() => {
    const root = containerRef?.current;
    if (!root) return;

    const elements = root.querySelectorAll('.reveal-on-scroll');
    if (!elements || elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: root,
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...deps]);
}
