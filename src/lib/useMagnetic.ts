import { useEffect } from 'react';

// Elements with data-magnetic lean toward the pointer while it is near them.
export function useMagnetic() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let active: HTMLElement | null = null;
    const reset = (element: HTMLElement) => { element.style.translate = ''; element.classList.remove('is-magnetic'); };
    const move = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-magnetic]') : null;
      if (active && active !== element) reset(active);
      active = element;
      if (!element) return;
      const box = element.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      element.classList.add('is-magnetic');
      element.style.translate = `${dx * .25}px ${dy * .35}px`;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); if (active) reset(active); };
  }, []);
}
