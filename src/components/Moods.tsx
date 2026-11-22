import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { CatSvg } from './CatSvg';
import { profile } from '../data/resume';
import { useScrollProgress } from '../lib/useScrollProgress';
import './moods.css';

const services = [
  { name: 'Сайт-визитка', scene: 'wave', tone: 'mint', text: 'Одна страница о вас или вашем бизнесе: услуги, фото, адрес и контакты.', note: 'Подходит, если сайта ещё нет' },
  { name: 'Редизайн', scene: 'glass', tone: 'lilac', text: 'Обновлю старый сайт: сделаю его понятным, аккуратным и современным.', note: 'Сохраню всё, что уже работает' },
  { name: 'Админ-панель', scene: 'laptop', tone: 'night', text: 'Сами меняете цены, фото и тексты — без программиста.', note: 'Простая и понятная' },
  { name: 'Лендинг', scene: 'home', tone: 'cream', text: 'Страница под одну услугу, курс или акцию, которая ведёт к заявке.', note: 'Для рекламы в Instagram' },
  { name: 'Адаптив', scene: 'ball', tone: 'peach', text: 'Сайт удобно открывать на телефоне, планшете и ноутбуке.', note: 'Проверяю на реальных экранах' },
  { name: 'Связь в один клик', scene: 'home', tone: 'mint', pose: 'is-happy', text: 'Кнопки WhatsApp, Instagram и звонка — клиенту легко написать вам.', note: 'Без лишних форм' },
  { name: 'Публикация', scene: 'home', tone: 'lilac', pose: 'is-sleeping', text: 'Выложу сайт в интернет и помогу, если после запуска что-то понадобится.', note: 'Котик спит, я — на связи' },
];

// Service cards fan out on scroll; the chosen card explains the service below.
export function Moods() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useScrollProgress(root, 'pinned');
  const middle = (services.length - 1) / 2;
  const current = services[active];
  return <section id="moods" className="moods" ref={root} aria-labelledby="moods-title">
    <div className="moods-stage">
      <div className="moods-head container">
        <h2 id="moods-title">Что я могу сделать для вас</h2>
        <p>Листайте — колода раскроется. Выберите карточку.</p>
      </div>
      <ul className="moods-fan">
        {services.map((item, index) => <li key={item.name} className={'mood-card tone-' + item.tone + (index === active ? ' is-active' : '')} style={{ '--k': index - middle, '--a': Math.abs(index - middle) } as CSSProperties}>
          <button type="button" aria-pressed={index === active} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
            <div className={'mood-art cat-scope ' + (item.pose ?? '')} data-scene={item.scene}><CatSvg /></div>
            <span>{item.name}</span>
          </button>
        </li>)}
      </ul>
      <div className="mood-detail container" aria-live="polite">
        <div key={active} className="mood-detail-inner">
          <h3>{current.name}</h3>
          <p>{current.text}</p>
          <small>{current.note}</small>
        </div>
        <a className="mood-ask" href={profile.whatsapp} target="_blank" rel="noreferrer" data-magnetic>Спросить про «{current.name}»</a>
      </div>
    </div>
  </section>;
}
