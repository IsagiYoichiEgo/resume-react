import { useEffect } from 'react';
import type { RefObject } from 'react';

// Writes --p (0…1) on the element.
// 'pinned': progress through a tall section with a sticky child.
// 'pass': progress while the element travels from the bottom to the middle of the screen.
export function useScrollProgress(ref: RefObject<HTMLElement | null>, mode: 'pinned' | 'pass', onChange?: (value: number) => void) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = ref.current; if (!element) return;
      const box = element.getBoundingClientRect(), view = window.innerHeight;
      const value = mode === 'pinned'
        ? -box.top / Math.max(1, box.height - view)
        : (view * .92 - box.top) / Math.max(1, view * .92 - view * .3 + box.height * .5);
      const clamped = Math.min(1, Math.max(0, value));
      element.style.setProperty('--p', clamped.toFixed(4));
      onChange?.(clamped);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [ref, mode, onChange]);
}
