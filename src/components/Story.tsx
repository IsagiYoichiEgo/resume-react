import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import './story.css';

const steps = [
  { title: 'Учусь и пишу код', text: 'Второй курс программной инженерии в Бишкеке. Каждый день — новый проект.' },
  { title: 'Делаю сайты для бизнеса', text: 'Помогаю небольшим компаниям и людям аккуратно выглядеть в интернете.' },
  { title: 'Строю свой стартап', text: 'Ai Huda — первый шаг. Хочу делать продукты для всей Центральной Азии.' },
];

// Deterministic star field: x, y in %, threshold when the star lights up.
const stars = Array.from({ length: 56 }, (_, index) => {
  const r = (n: number) => ((Math.sin(index * 127.1 + n * 311.7) * 43758.5453) % 1 + 1) % 1;
  return { x: r(1) * 100, y: r(2) * 58, size: r(3) > .85 ? 3 : r(3) > .5 ? 2 : 1.4, t: r(4) * .55, d: r(5) * 4 };
});
const lights = Array.from({ length: 34 }, (_, index) => {
  const r = (n: number) => ((Math.sin(index * 91.7 + n * 47.3) * 24634.6345) % 1 + 1) % 1;
  return { x: 18 + r(1) * 64, y: 86 + r(2) * 9, t: .3 + r(3) * .25 };
});

// A pinned night scene over Bishkek: as you scroll, stars come out, the moon rises
// and the city lights up while three short steps of the story change.
export function Story() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = root.current?.getBoundingClientRect();
      if (!box) return;
      const total = box.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -box.top / Math.max(1, total)));
      root.current?.style.setProperty('--p', progress.toFixed(4));
      setStep(Math.min(steps.length - 1, Math.floor(progress * steps.length * .999)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);

  return <section id="story" className="story" ref={root} aria-labelledby="story-title">
    <div className="story-stage">
      <div className="story-sky" aria-hidden="true">
        {stars.map((star, index) => <i key={index} className="star" style={{ left: star.x + '%', top: star.y + '%', width: star.size, height: star.size, '--t': star.t, '--d': star.d + 's' } as CSSProperties} />)}
        <i className="shooting-star" />
        <div className="moon"><i /></div>
      </div>
      <svg className="story-land" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path className="ridge ridge-far" d="M0 330 L90 290 L160 305 L250 230 L320 260 L410 190 L470 225 L560 170 L640 215 L720 160 L800 205 L880 150 L960 200 L1050 175 L1130 220 L1220 180 L1300 230 L1380 200 L1440 220 V600 H0Z" />
        <path className="ridge ridge-snow" d="M250 230 L285 246 L300 238 L320 260 L340 248 Z M560 170 L590 188 L606 180 L640 215 L612 204 Z M720 160 L752 178 L770 170 L800 205 L780 196 Z M880 150 L915 170 L935 162 L960 200 L935 186 Z" />
        <path className="ridge ridge-mid" d="M0 400 C120 370 200 330 320 350 S520 300 640 330 S860 290 980 320 S1220 300 1440 340 V600 H0Z" />
        <path className="ridge ridge-near" d="M0 470 C160 450 300 440 480 455 S820 430 1000 450 S1260 420 1440 440 V600 H0Z" />
        <g className="story-cat" transform="translate(860 392)">
          <path className="cat-tail-s" d="M34 52 C62 52 66 28 54 16" fill="none" strokeWidth="7" strokeLinecap="round" />
          <path d="M4 56 C0 34 8 22 20 20 L16 4 L26 14 C30 13 34 13 38 14 L48 4 L44 20 C54 24 58 36 54 56 Z" />
        </g>
      </svg>
      <div className="story-lights" aria-hidden="true">
        {lights.map((light, index) => <i key={index} style={{ left: light.x + '%', top: light.y + '%', '--t': light.t } as CSSProperties} />)}
      </div>

      <div className="story-copy container">
        <p className="story-kicker" id="story-title">Мой путь</p>
        <div className="story-steps" aria-live="polite">
          {steps.map((item, index) => <div key={item.title} className={'story-step' + (index === step ? ' is-active' : '')} aria-hidden={index !== step}>
            <h2>{item.title}</h2><p>{item.text}</p>
          </div>)}
        </div>
        <ol className="story-dots" aria-hidden="true">{steps.map((item, index) => <li key={item.title} className={index <= step ? 'is-on' : ''} />)}</ol>
      </div>
    </div>
  </section>;
}
