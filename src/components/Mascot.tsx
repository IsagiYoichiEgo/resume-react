import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { canShowBubble, canPlaceBubble, safePetPlacement, scrollProgress } from '../lib/motion';
import './mascot.css';

const base = import.meta.env.BASE_URL;
const sectionMessages: Record<string, string> = {
  home: 'Мур. Посмотрим проекты?',
  projects: 'Лапка за любопытство! 🐾',
  about: 'Можно просто alimbro. Я тоже так зову.',
  contact: 'Здесь можно написать Аброрбеку.',
};
const clickMessages = ['У вас хороший вкус. Мур!', 'Я тут слежу за порядком. И за курсором.', 'Лапка за любопытство! 🐾', 'Проекты выше, контакты ниже. Всё просто.'];

function controlBounds() {
  return [...document.querySelectorAll<HTMLElement>('main a, main button, footer a')].map(element => element.getBoundingClientRect()).filter(rect => rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight);
}

function syncBubbleVisibility(root:HTMLDivElement|null) {
  const bubble = root?.querySelector<HTMLElement>('.pet-bubble');
  if (!root || !bubble) return;
  root.setAttribute('data-bubble-clear', String(canPlaceBubble(bubble.getBoundingClientRect(),controlBounds(),document.documentElement.clientWidth,window.innerHeight)));
}

export function Mascot() {
  const root = useRef<HTMLDivElement>(null);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const happyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastBubble = useRef({ time: Number.NEGATIVE_INFINITY, section: '' });
  const clicks = useRef(0);
  const [visible, setVisible] = useState(() => { try { return localStorage.getItem('alimbro-cat') !== 'hidden'; } catch { return true; } });
  const [walking, setWalking] = useState(false);
  const [happy, setHappy] = useState(false);
  const [spriteReady, setSpriteReady] = useState(false);
  const [bubble, setBubble] = useState('');
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function speak(message: string) {
    setBubble(message);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(''), 4800);
  }

  useEffect(() => {
    const image = new Image();
    image.onload = () => setSpriteReady(true);
    image.src = base + 'assets/cat-walk.webp';
    return () => { image.onload = null; };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    let frame = 0;
    let pendingScroll = false;
    let previousY = window.scrollY;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const width = document.documentElement.clientWidth;
      const progress = scrollProgress(y, document.documentElement.scrollHeight, window.innerHeight);
      const catWidth = width < 600 ? 94 : 122;
      const controls = controlBounds();
      const {x,bottom} = safePetPlacement(progress, width, window.innerHeight, catWidth, width < 600 ? 105 : 140, controls, reduced);
      root.current?.style.setProperty('--pet-bottom', bottom + 'px');
      document.documentElement.style.setProperty('--page-progress', String(progress));
      document.documentElement.style.setProperty('--hero-progress', String(Math.min(1, Math.max(0, y / Math.max(1, window.innerHeight * 0.8)))));
      root.current?.style.setProperty('--pet-x', x + 'px');
      const bubbleWidth = Math.min(220, width - 32);
      const bubbleLeft = Math.min(Math.max(16, x - 35), width - bubbleWidth - 16) - x;
      root.current?.style.setProperty('--bubble-x', bubbleLeft + 'px');
      syncBubbleVisibility(root.current);
      const delta = y - previousY;
      if (visible && pendingScroll && Math.abs(delta) > 0.5 && !reduced) {
        root.current?.setAttribute('data-direction', delta > 0 ? 'right' : 'left');
        setWalking(true);
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => setWalking(false), 190);
      }
      if (reduced) setWalking(false);
      previousY = y;
      pendingScroll = false;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onScroll = () => { pendingScroll = true; schedule(); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
    };
  }, [visible, reduced]);

  useEffect(() => {
    if (!visible || reduced) return;
    const observer = new IntersectionObserver(entries => {
      if (document.querySelector('dialog[open]')) return;
      const entry = entries.find(item => item.isIntersecting && sectionMessages[item.target.id]);
      if (!entry) return;
      const now = Date.now();
      const previous = lastBubble.current;
      if (!canShowBubble(now, previous.time, previous.section, entry.target.id)) return;
      lastBubble.current = { time: now, section: entry.target.id };
      speak(sectionMessages[entry.target.id]);
    }, { rootMargin: '-20% 0px -35% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [visible, reduced]);

  useEffect(() => () => { clearTimeout(bubbleTimer.current); clearTimeout(happyTimer.current); }, []);

  useLayoutEffect(() => { syncBubbleVisibility(root.current); }, [bubble]);

  function toggle(show: boolean) {
    setVisible(show);
    setBubble('');
    setWalking(false);
    setHappy(false);
    clearTimeout(bubbleTimer.current);
    clearTimeout(happyTimer.current);
    try { localStorage.setItem('alimbro-cat', show ? 'visible' : 'hidden'); } catch { /* Works with storage disabled, too. */ }
  }

  if (!visible) return <button className="pet-restore" onClick={() => toggle(true)} aria-label="Вернуть котика" title="Вернуть котика">🐾</button>;
  const animateWalk = walking && spriteReady && !reduced;
  return <div ref={root} className={'mascot' + (animateWalk ? ' is-walking' : '') + (happy && !reduced ? ' is-happy' : '')} data-direction="right">
    {bubble && <div className="pet-bubble" role="status"><span>{bubble}</span><button onClick={() => setBubble('')} aria-label="Закрыть реплику котика">×</button></div>}
    <button className="pet-button" onClick={() => {
      speak(clickMessages[clicks.current++ % clickMessages.length]);
      lastBubble.current.time = Date.now();
      setHappy(true);
      clearTimeout(happyTimer.current);
      happyTimer.current = setTimeout(() => setHappy(false), 600);
    }} aria-label="Погладить котика">
      <img className="cat-idle" src={base + 'assets/cat-idle.webp'} width="122" height="130" alt="" draggable="false" />
      <span className="cat-walk" aria-hidden="true" style={{ backgroundImage: 'url(' + base + 'assets/cat-walk.webp)' }} />
      <span className="cat-shadow" aria-hidden="true" />
    </button>
    <button className="pet-hide" onClick={() => toggle(false)} aria-label="Спрятать котика" title="Спрятать котика">×</button>
  </div>;
}
