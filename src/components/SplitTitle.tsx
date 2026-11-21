import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

// Splits a word into letters. Letters near the pointer lift and light up.
export function SplitTitle({ text, className, offset = 0 }: { text: string; className?: string; offset?: number }) {
  const root = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const letters = [...(root.current?.querySelectorAll<HTMLElement>('.letter') ?? [])];
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        for (const letter of letters) {
          const box = letter.getBoundingClientRect();
          const distance = Math.hypot(event.clientX - (box.left + box.width / 2), event.clientY - (box.top + box.height / 2));
          letter.style.setProperty('--near', Math.max(0, 1 - distance / 220).toFixed(3));
        }
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); };
  }, []);
  return <span ref={root} className={'split-title ' + (className ?? '')} aria-label={text}>
    {[...text].map((letter, index) => <span key={index} className="letter" aria-hidden="true" style={{ '--i': index + offset } as CSSProperties}>{letter}</span>)}
  </span>;
}
