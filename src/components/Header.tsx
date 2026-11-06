import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { profile } from '../data/resume';

const navigation = [{ id: 'projects', label: 'Проекты' }, { id: 'about', label: 'Обо мне' }, { id: 'contact', label: 'Контакты' }];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const onOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    window.addEventListener('pointerdown', onOutside);
    return () => { window.removeEventListener('keydown', onEscape); window.removeEventListener('pointerdown', onOutside); };
  }, [open]);

  return <header className="site-header" ref={header}>
    <div className="header-inner container">
      <a className="brand" href="#home" aria-label="alimbro — Аброрбек Алимжанов, начало" onClick={() => setOpen(false)}>alimbro<span>.</span></a>
      <nav id="main-navigation" className={'navigation ' + (open ? 'is-open' : '')} aria-label="Основная навигация">
        {navigation.map(item => <a key={item.id} href={'#' + item.id} aria-current={active === item.id ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
      <div className="header-actions"><a className="header-contact" href={profile.whatsapp} target="_blank" rel="noreferrer">Обсудить проект <Icon name="arrow" /></a><button ref={toggle} type="button" className="icon-button menu-button" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button></div>
    </div>
  </header>;
}
