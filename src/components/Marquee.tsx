import { useEffect, useRef } from 'react';
import './marquee.css';

const rows = [
  ['Сайты-визитки', 'Лендинги', 'Интернет-магазины', 'Веб-приложения', 'Адаптив под телефон'],
  ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'HTML и CSS', 'Web Audio'],
];

// Two ribbons drift on their own and get pushed along by the scroll.
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = root.current?.getBoundingClientRect();
      if (!box || box.bottom < -200 || box.top > window.innerHeight + 200) return;
      root.current?.style.setProperty('--ribbon-shift', String(Math.round((window.innerHeight - box.top) * 0.35)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);

  return <div className="ribbons" ref={root} aria-label="Что я делаю: сайты-визитки, лендинги, интернет-магазины, веб-приложения. Стек: React, TypeScript, Spring Boot, PostgreSQL.">
    {rows.map((items, row) => <div className={'ribbon ribbon-' + (row ? 'stack' : 'work')} key={row} aria-hidden="true">
      <div className="ribbon-track">
        {[0, 1].map(copy => <div className="ribbon-set" key={copy}>
          {[...items, ...items, ...items].map((item, i) => <span key={i}>{item}<i>✳</i></span>)}
        </div>)}
      </div>
    </div>)}
  </div>;
}
