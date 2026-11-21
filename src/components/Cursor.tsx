import { useEffect, useRef, useState } from 'react';
import './cursor.css';

// A soft ring trails the pointer. Over elements with data-cursor it grows into a label.
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (!enabled) return;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, frame = 0, shown = false;
    const move = (event: PointerEvent) => {
      x = event.clientX; y = event.clientY;
      if (!shown) { shown = true; rx = x; ry = y; ring.current?.classList.add('is-visible'); }
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor]') : null;
      setLabel(target?.dataset.cursor ?? '');
      ring.current?.classList.toggle('is-pointer', !target && Boolean(event.target instanceof Element && event.target.closest('a, button, select, label')));
    };
    const leave = () => { shown = false; ring.current?.classList.remove('is-visible'); };
    const down = () => ring.current?.classList.add('is-down');
    const up = () => ring.current?.classList.remove('is-down');
    const loop = () => {
      rx += (x - rx) * .2; ry += (y - ry) * .2;
      ring.current?.style.setProperty('transform', `translate3d(${rx}px, ${ry}px, 0)`);
      frame = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ring} className={'cursor-ring' + (label ? ' has-label' : '')} aria-hidden="true"><span>{label}</span></div>;
}
