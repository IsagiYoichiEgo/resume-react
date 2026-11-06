import type { PointerEvent } from 'react';
import type { Project } from '../data/resume';
import { showcase } from '../data/showcase';
import './project-previews.css';
const base = import.meta.env.BASE_URL;

function tilt(event: PointerEvent<HTMLDivElement>) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--tilt-x', String((event.clientX - bounds.left) / bounds.width - .5));
  event.currentTarget.style.setProperty('--tilt-y', String((event.clientY - bounds.top) / bounds.height - .5));
}

export function ProjectVisual({ id }: { id: Project['id'] }) {
  const preview = id === 'music' || id === 'ads' ? showcase[id] : null;
  return <span className={'project-visual visual-' + id} aria-hidden="true" onPointerMove={tilt} onPointerLeave={event => { event.currentTarget.style.setProperty('--tilt-x', '0'); event.currentTarget.style.setProperty('--tilt-y', '0'); }}>
    <span className="cover-depth">
      {preview && <><span className="project-screen"><span className="project-screen-bar"><i/><i/><i/><span>{preview.title}</span></span><img src={base+preview.desktop} alt="" width="1265" height="712" loading="lazy"/></span><span className="project-mobile"><span className="project-mobile-camera"/><img src={base+preview.mobile} alt="" width="390" height="844" loading="lazy"/></span><span className="project-screen-spark">✳</span><span className="cover-footnote">Настоящий интерфейс</span></>}
      {id === 'bookstore' && <><span className="book-background-word">books</span><span className="book-object book-one"><span>Book<br />Store<span className="book-symbol">✳</span></span></span><span className="book-object book-two"><span>Book<br />Store</span></span><span className="cover-footnote">Курсовая работа</span></>}
      {id === 'aihuda' && <><span className="huda-arch huda-arch-one" /><span className="huda-arch huda-arch-two" /><span className="huda-arch huda-arch-three" /><span className="huda-star">✧</span><strong className="huda-word">Ai Huda</strong><span className="huda-caption">Чтение Корана</span><span className="cover-footnote">Приложение в разработке</span></>}
    </span>
  </span>;
}
