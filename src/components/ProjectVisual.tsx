import type { PointerEvent } from 'react';
import type { Project } from '../data/resume';

function tilt(event: PointerEvent<HTMLDivElement>) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--tilt-x', String((event.clientX - bounds.left) / bounds.width - .5));
  event.currentTarget.style.setProperty('--tilt-y', String((event.clientY - bounds.top) / bounds.height - .5));
}

export function ProjectVisual({ id }: { id: Project['id'] }) {
  return <div className={'project-visual visual-' + id} aria-hidden="true" onPointerMove={tilt} onPointerLeave={event => { event.currentTarget.style.setProperty('--tilt-x', '0'); event.currentTarget.style.setProperty('--tilt-y', '0'); }}>
    <div className="cover-depth">
      {id === 'music' && <><div className="music-disc"><i /><i /><i /></div><div className="music-poster"><span>Thunder</span><span>bend<span className="music-dot">.</span></span></div><div className="music-wave">{Array.from({ length: 31 }, (_, i) => <i key={i} style={{ height: String(12 + Math.sin(i * .85) ** 2 * 40) + 'px' }} />)}</div><span className="cover-footnote">Музыкальный сайт</span></>}
      {id === 'ads' && <><div className="ads-ring" /><div className="ads-paper ads-paper-back" /><div className="ads-paper ads-paper-front"><span className="ads-star">✳</span><strong>Доска<br />объявлений</strong><span className="ads-paper-line" /></div><div className="ads-tag"><span /><i /></div><span className="cover-footnote">Веб-приложение</span></>}
      {id === 'bookstore' && <><span className="book-background-word">books</span><div className="book-object book-one"><span>Book<br />Store<span className="book-symbol">✳</span></span></div><div className="book-object book-two"><span>Book<br />Store</span></div><span className="cover-footnote">Курсовая работа</span></>}
      {id === 'aihuda' && <><div className="huda-arch huda-arch-one" /><div className="huda-arch huda-arch-two" /><div className="huda-arch huda-arch-three" /><span className="huda-star">✧</span><strong className="huda-word">Ai Huda</strong><span className="huda-caption">Чтение Корана</span><span className="cover-footnote">Приложение в разработке</span></>}
    </div>
  </div>;
}
