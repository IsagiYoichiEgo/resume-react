import { Icon } from './Icon';
import { profile } from '../data/resume';
import { Showcase } from './Showcase';
import { SplitTitle } from './SplitTitle';
import { useEffect, useRef } from 'react';
import './hero.css';

// Starts the 3D toys once the browser is idle; skipped when WebGL is unavailable.
function CatToys() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let stop: (() => void) | undefined, cancelled = false;
    const host = canvas.current?.closest('section');
    if (!canvas.current || !host || !document.createElement('canvas').getContext('webgl2')) return;
    const start = () => import('../lib/catToysScene').then(({ startCatToys }) => {
      if (!cancelled && canvas.current) stop = startCatToys(canvas.current, host as HTMLElement);
    }).catch(() => undefined);
    const idle = 'requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1500 }) : globalThis.setTimeout(start, 600);
    return () => { cancelled = true; if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle as number); else clearTimeout(idle as number); stop?.(); };
  }, []);
  return <canvas ref={canvas} className="hero-toys" aria-hidden="true" />;
}

export function Hero() {
  return <section id="home" className="hero container" aria-labelledby="hero-title">
    <CatToys />
    <div className="hero-copy">
      <h1 id="hero-title" aria-label="Сайты. Приложения."><SplitTitle text="Сайты." /><SplitTitle text="Приложения." offset={6} /></h1>
      <p className="hero-description" data-reveal data-reveal-delay="2">Делаю понятные интерфейсы для ваших задач. От первой идеи до сайта, который можно открыть и использовать.</p>
      <div className="hero-buttons" data-reveal data-reveal-delay="3"><a className="button button-primary" href="#projects" data-magnetic>Посмотреть работы<Icon name="arrow"/></a><a className="hero-contact" href={profile.whatsapp} target="_blank" rel="noreferrer">Обсудить задачу<Icon name="arrow"/></a></div>
      <div className="hero-meta" data-reveal data-reveal-delay="3"><span className="availability"><i aria-hidden="true"/>Открыт к небольшим заказам</span><span>{profile.location}</span></div>
    </div>
    <Showcase/>
    <div className="hero-bottom" data-reveal data-reveal-delay="1"><span>Опубликованные сайты<br/><strong>и проекты в разработке.</strong></span><a href="#projects" aria-label="Перейти к проектам"><span>Листайте, там мои проекты</span><i aria-hidden="true">↓</i></a></div>
  </section>;
}
