import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { profile } from '../data/resume';
import './footer.css';

function bishkekTime() {
  return new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Bishkek' }).format(new Date());
}

export function Footer() {
  const [time, setTime] = useState(bishkekTime);
  useEffect(() => { const timer = setInterval(() => setTime(bishkekTime()), 15000); return () => clearInterval(timer); }, []);
  const hour = Number(time.slice(0, 2));
  const mood = hour >= 23 || hour < 7 ? 'наверное, спит' : hour < 10 ? 'пьёт чай' : 'на связи';

  return <footer className="site-footer container">
    <div className="footer-top">
      <p className="footer-clock"><i aria-hidden="true" /><span>В Бишкеке сейчас <b>{time}</b>, Аброрбек {mood}.</span></p>
      <a className="back-top" href="#home" data-magnetic>Наверх <span aria-hidden="true">↑</span></a>
    </div>
    <a href="#home" className="footer-word" aria-label="alimbro — в начало" data-reveal>
      {[...profile.brand].map((letter, index) => <span key={index} style={{ '--i': index } as CSSProperties}>{letter}</span>)}<span className="footer-dot" style={{ '--i': 7 } as CSSProperties}>.</span>
    </a>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</p>
      <p>Сделано вручную на React. Котик нарисован в SVG.</p>
    </div>
  </footer>;
}
