import type { PointerEvent } from 'react';
import { Icon } from './Icon';
import { profile } from '../data/resume';

function moveScene(event: PointerEvent<HTMLDivElement>) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--pointer-x', String((event.clientX - rect.left) / rect.width - .5));
  event.currentTarget.style.setProperty('--pointer-y', String((event.clientY - rect.top) / rect.height - .5));
}

export function Hero() {
  return <section id="home" className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="hero-intro">Аброрбек Алимжанов <span>·</span> alimbro</p>
      <h1 id="hero-title"><span>Делаю сайты</span><span>и приложения.</span></h1>
      <p className="hero-description">Помогу с небольшим сайтом — от первой страницы до рабочего интерфейса.</p>
      <div className="hero-buttons"><a className="button button-primary" href="#projects">Смотреть проекты <Icon name="arrow" /></a><a className="button button-secondary" href={profile.whatsapp} target="_blank" rel="noreferrer">Написать в WhatsApp</a></div>
      <div className="hero-meta"><span className="availability"><i aria-hidden="true" />Открыт к небольшим заказам</span><span>{profile.location}</span></div>
    </div>
    <div className="hero-scene" aria-hidden="true" onPointerMove={moveScene} onPointerLeave={event => { event.currentTarget.style.setProperty('--pointer-x', '0'); event.currentTarget.style.setProperty('--pointer-y', '0'); }}>
      <div className="scene-glow" /><div className="scene-orbit scene-orbit-one" /><div className="scene-orbit scene-orbit-two" />
      <div className="scene-depth">
        <div className="design-window"><div className="design-toolbar"><span><i /><i /><i /></span><span>Новый проект</span><span>↗</span></div><div className="design-canvas"><span className="canvas-brand">a<span>✳</span></span><div className="canvas-title">Привет<span>.</span></div><div className="canvas-lines"><i /><i /></div><div className="canvas-button" /><div className="canvas-ring" /><span className="canvas-corner">↗</span></div></div>
        <div className="scene-palette"><span className="palette-label">Палитра</span><div><i /><i /><i /><i /></div><span className="palette-line" /></div>
        <div className="scene-code"><Icon name="code" /><span /><span /><span /></div>
        <div className="scene-cursor"><svg viewBox="0 0 40 48"><path d="M5 3 34 28 21 30 16 43Z" /></svg><span>alimbro</span></div>
        <div className="scene-sphere" /><div className="scene-star">✳</div>
      </div>
    </div>
    <div className="hero-bottom"><a href="#projects">Посмотреть работы <span aria-hidden="true">↓</span></a><span>Личные и учебные проекты</span></div>
  </section>;
}
