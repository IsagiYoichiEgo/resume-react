import { useEffect } from 'react';

// Feeds the pointer position into --spot-x / --spot-y for a soft hover light.
export function useSpotlight(selector: string) {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (event: PointerEvent) => {
      const panel = event.target instanceof Element ? event.target.closest<HTMLElement>(selector) : null;
      if (!panel) return;
      const box = panel.getBoundingClientRect();
      panel.style.setProperty('--spot-x', (event.clientX - box.left) + 'px');
      panel.style.setProperty('--spot-y', (event.clientY - box.top) + 'px');
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, [selector]);
}
