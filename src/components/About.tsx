import { useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import './about.css';

const cards = [
  { tone: 'mint', label: 'Учусь', title: '2 курс, программная инженерия', text: 'Кыргызско-Германский институт прикладной информатики (INAI), Бишкек.' },
  { tone: 'peach', label: 'Стек', title: 'От интерфейса до базы данных', chips: ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'HTML и CSS'] },
  { tone: 'lilac', label: 'Говорю на', title: 'Пяти языках', chips: ['Узбекский', 'Кыргызский', 'Русский', 'Английский', 'Немецкий A2'] },
  { tone: 'cream', label: 'Сейчас', title: 'Сайты для малого бизнеса', text: 'Делаю сайты-визитки и лендинги для небольших компаний и личных брендов в Бишкеке.' },
  { tone: 'night', label: 'Цель', title: 'Свой стартап', text: 'Ai Huda уже в работе: приложение для чтения Корана для пользователей из СНГ.' },
  { tone: 'mint', label: 'Вне кода', title: 'YouTube и футбол', text: 'Снимаю видео для своего канала и играю в футбол.' },
] as const;

// A deck of cards: click, press Enter or throw the top card to see the next one.
export function About() {
  const [order, setOrder] = useState(() => cards.map((_, index) => index));
  const [leaving, setLeaving] = useState<number | null>(null);
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);
  const top = useRef<HTMLDivElement>(null);

  function next(direction = 1) {
    if (leaving !== null) return;
    const current = order[0];
    setLeaving(current);
    top.current?.style.setProperty('--throw', String(direction));
    setTimeout(() => { setOrder(list => [...list.slice(1), list[0]]); setLeaving(null); }, 380);
  }

  function onDown(event: ReactPointerEvent<HTMLDivElement>) {
    drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function onMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x, dy = event.clientY - drag.current.y;
    event.currentTarget.style.setProperty('--dx', dx + 'px');
    event.currentTarget.style.setProperty('--dy', dy * .4 + 'px');
    event.currentTarget.style.setProperty('--drot', dx * .05 + 'deg');
    event.currentTarget.classList.add('is-dragging');
  }
  function onUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    drag.current = null;
    const element = event.currentTarget;
    element.classList.remove('is-dragging');
    element.style.removeProperty('--dx'); element.style.removeProperty('--dy'); element.style.removeProperty('--drot');
    if (Math.abs(dx) > 70) next(Math.sign(dx));
    else if (Math.abs(dx) < 6) next(1);
  }

  return <section id="about" className="about-section container" aria-labelledby="about-title">
    <div className="about-intro" data-reveal>
      <div className="about-title"><span className="about-spark" aria-hidden="true">✳</span><h2 id="about-title">Обо мне</h2></div>
      <p className="about-lead">Я Аброрбек, учусь в <span>INAI</span> в Бишкеке. Делаю личные и учебные проекты, использую AI в работе.</p>
      <p className="about-note">Открыт к небольшим платным заказам: сайтам и веб-интерфейсам.</p>
      <div className="deck-controls">
        <button type="button" className="deck-next" onClick={() => next(1)} data-magnetic>Следующая карточка <span aria-hidden="true">↻</span></button>
        <span className="deck-count" aria-live="polite">{order[0] + 1} / {cards.length}</span>
      </div>
    </div>
    <div className="deck" data-reveal data-reveal-delay="1" data-cursor="Листать">
      {[...order].reverse().map((cardIndex) => {
        const card = cards[cardIndex];
        const depth = order.indexOf(cardIndex);
        const isTop = depth === 0;
        return <div key={cardIndex} ref={isTop ? top : undefined}
          className={'deck-card tone-' + card.tone + (leaving === cardIndex ? ' is-leaving' : '')}
          style={{ '--depth': depth, '--tilt': ((cardIndex % 3) - 1) * 2.4 + 'deg' } as CSSProperties}
          aria-hidden={!isTop}
          tabIndex={isTop ? 0 : -1}
          role={isTop ? 'button' : undefined}
          aria-label={isTop ? card.label + ': ' + card.title + '. Нажмите, чтобы показать следующую карточку' : undefined}
          onKeyDown={isTop ? event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); next(1); } } : undefined}
          onPointerDown={isTop ? onDown : undefined} onPointerMove={isTop ? onMove : undefined} onPointerUp={isTop ? onUp : undefined} onPointerCancel={isTop ? onUp : undefined}>
          <span className="card-label">{card.label}</span>
          <h3>{card.title}</h3>
          {'text' in card && <p>{card.text}</p>}
          {'chips' in card && <ul>{card.chips.map(chip => <li key={chip}>{chip}</li>)}</ul>}
          <span className="card-corner" aria-hidden="true">{String(cardIndex + 1).padStart(2, '0')}</span>
        </div>;
      })}
    </div>
  </section>;
}
