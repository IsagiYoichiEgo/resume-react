import { Icon } from './Icon';
import { profile } from '../data/resume';
import { Showcase } from './Showcase';
import './hero.css';

export function Hero() {
  return <section id="home" className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <h1 id="hero-title" data-reveal data-reveal-delay="1"><span className="light-text">Сайты.</span><span className="light-text">Приложения.</span></h1>
      <p className="hero-description" data-reveal data-reveal-delay="2">Делаю понятные интерфейсы для ваших задач. От первой идеи до сайта, который можно открыть и использовать.</p>
      <div className="hero-buttons" data-reveal data-reveal-delay="3"><a className="button button-primary" href="#projects">Посмотреть работы<Icon name="arrow"/></a><a className="hero-contact" href={profile.whatsapp} target="_blank" rel="noreferrer">Обсудить задачу<Icon name="arrow"/></a></div>
      <div className="hero-meta" data-reveal data-reveal-delay="3"><span className="availability"><i aria-hidden="true"/>Открыт к небольшим заказам</span><span>{profile.location}</span></div>
    </div>
    <Showcase/>
    <div className="hero-bottom" data-reveal data-reveal-delay="1"><span>Опубликованные сайты<br/><strong>и проекты в разработке.</strong></span><a href="#projects" aria-label="Перейти к проектам"><span>Листайте, там мои проекты</span><i aria-hidden="true">↓</i></a></div>
  </section>;
}
