import { useEffect, useState } from 'react';
import { Icon } from './Icon';

const navigation = [{ id: 'about', label: 'Обо мне' }, { id: 'skills', label: 'Навыки' }, { id: 'projects', label: 'Проекты' }, { id: 'education', label: 'Образование' }];

export function Header({ theme, onToggleTheme }: { theme: 'light' | 'dark'; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-18% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    const handleEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handleEscape);
    return () => { observer.disconnect(); window.removeEventListener('keydown', handleEscape); };
  }, []);

  return <header className="site-header">
    <div className="container header-inner">
      <a className="brand" href="#home" aria-label="Аброрбек Алимжанов — начало"><span className="brand-mark">aa<span>.</span></span><span className="brand-name">Abrorbek<span>Developer portfolio</span></span></a>
      <nav id="main-navigation" className={`navigation ${open ? 'is-open' : ''}`} aria-label="Основная навигация">
        {navigation.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
        <a className="mobile-contact" href="#contact" onClick={() => setOpen(false)}>Контакты</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={onToggleTheme} aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'} title="Сменить тему"><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
        <a className="header-contact" href="#contact">Связаться <Icon name="arrow" /></a>
        <button className="icon-button menu-button" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
      </div>
    </div>
  </header>;
}
