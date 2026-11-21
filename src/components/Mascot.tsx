import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { canShowBubble, canPlaceBubble, safePetPlacement, scrollProgress } from '../lib/motion';
import { CatSvg } from './CatSvg';
import './mascot.css';

const sectionMessages: Record<string, string> = {
  home: 'Мур. Посмотрим проекты?',
  projects: 'Изучаю каждый пиксель. 🔍',
  about: 'Можно просто alimbro. Карточки можно листать!',
  process: 'Тут Аброрбек работает. Я помогаю. Немного.',
  contact: 'Напишите ему, он быстро отвечает. Мяу!',
};
// Which prop the cat holds in each section.
const sceneOf: Record<string, string> = { home: 'home', projects: 'glass', about: 'ball', process: 'laptop', contact: 'wave' };
const clickMessages = ['У вас хороший вкус. Мур!', 'Я тут слежу за порядком. И за курсором.', 'Лапка за любопытство! 🐾', 'Проекты выше, контакты ниже. Всё просто.'];

function controlBounds(includeText=false) {
  return [...document.querySelectorAll<HTMLElement>('main a, main button:not(.project-cover), main .cover-open, main .project-topline, footer a'+(includeText?', main p, main h1, main h2, main h3':''))].filter(element => element.matches('a,button,.cover-open') || Boolean(element.textContent?.trim())).map(element => element.getBoundingClientRect()).filter(rect => rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight);
}

function syncBubbleVisibility(root:HTMLDivElement|null) {
  const bubble = root?.querySelector<HTMLElement>('.pet-bubble');
  if (!root || !bubble) return;
  root.setAttribute('data-bubble-clear', String(canPlaceBubble(bubble.getBoundingClientRect(),controlBounds(true),document.documentElement.clientWidth,window.innerHeight)));
}

export function Mascot() {
  const root = useRef<HTMLDivElement>(null);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const happyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastBubble = useRef({ time: Number.NEGATIVE_INFINITY, section: '' });
  const clicks = useRef(0);
  const recentClicks = useRef<number[]>([]);
  const prints = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState('home');
  const [sleeping, setSleeping] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [visible, setVisible] = useState(() => { try { return localStorage.getItem('alimbro-cat') !== 'hidden'; } catch { return true; } });
  const [walking, setWalking] = useState(false);
  const [happy, setHappy] = useState(false);
  const [bubble, setBubble] = useState('');
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function speak(message: string) {
    setBubble(message);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(''), 4800);
  }

  // Eyes follow the pointer: pupils shift toward the cursor, head tilts slightly.
  useEffect(() => {
    if (!visible || reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = root.current?.getBoundingClientRect();
        if (!box) return;
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height * 0.35);
        const length = Math.max(1, Math.hypot(dx, dy));
        const pull = Math.min(1, length / 260);
        root.current?.style.setProperty('--look-x', (dx / length * pull).toFixed(3));
        root.current?.style.setProperty('--look-y', (dy / length * pull).toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', onMove); };
  }, [visible, reduced]);

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
    if (!visible || reduced || typeof IntersectionObserver === 'undefined') return;
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

  // Track the section in the middle of the screen; the cat picks up its prop.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting && sceneOf[entry.target.id]) setScene(sceneOf[entry.target.id]);
    }, { rootMargin: '-45% 0px -45% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // After 25 seconds without activity the cat dozes off.
  useEffect(() => {
    if (!visible || reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    const wake = () => { setSleeping(false); clearTimeout(timer); timer = setTimeout(() => setSleeping(true), 25000); };
    wake();
    const events = ['pointermove', 'scroll', 'keydown', 'touchstart'] as const;
    events.forEach(name => window.addEventListener(name, wake, { passive: true }));
    return () => { clearTimeout(timer); events.forEach(name => window.removeEventListener(name, wake)); };
  }, [visible, reduced]);

  // Paw prints trail behind the cat while it walks.
  useEffect(() => {
    if (!walking || reduced) return;
    let step = 0;
    const timer = setInterval(() => {
      const layer = prints.current; const box = root.current?.getBoundingClientRect();
      if (!layer || !box) return;
      const print = document.createElement('i');
      print.className = 'paw-print';
      print.style.left = (box.left + box.width * (step++ % 2 ? .38 : .58)) + 'px';
      print.style.top = (box.bottom - 10 - (step % 2) * 6) + 'px';
      layer.appendChild(print);
      setTimeout(() => print.remove(), 1400);
    }, 170);
    return () => clearInterval(timer);
  }, [walking, reduced]);

  // Easter eggs: type "мяу" or "meow", leave the tab, open the console.
  useEffect(() => {
    let typed = '';
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, [contenteditable]')) return;
      typed = (typed + event.key.toLowerCase()).slice(-4);
      if (typed.endsWith('мяу') || typed.endsWith('meow')) {
        typed = '';
        if (visible) speak('Мяу! Вы нашли пасхалку. 🐾');
        pawRain(prints.current, reduced);
      }
    };
    const title = document.title;
    const onVisibility = () => { document.title = document.hidden ? 'Мяу, возвращайтесь 🐾' : title; };
    window.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVisibility);
    console.log('%c🐾 alimbro.', 'font: 600 22px Unbounded, sans-serif; color: #7DE6D1');
    console.log('%cПривет, разработчик! Код сайта открыт: https://github.com/IsagiYoichiEgo/resume-react\nПодсказка: напишите на странице «мяу».', 'color: #AAB4C7');
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('visibilitychange', onVisibility); document.title = title; };
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

  const printLayer = <div className="paw-layer" ref={prints} aria-hidden="true" />;
  if (!visible) return <>{printLayer}<button className="pet-restore" onClick={() => toggle(true)} aria-label="Вернуть котика" title="Вернуть котика">🐾</button></>;
  const animateWalk = walking && !reduced;
  return <>{printLayer}<div ref={root} className={'mascot' + (animateWalk ? ' is-walking' : '') + (happy && !reduced ? ' is-happy' : '') + (sleeping && !happy ? ' is-sleeping' : '') + (flipping ? ' is-flipping' : '')} data-direction="right" data-scene={scene}>
    {bubble && <div className="pet-bubble" role="status"><span>{bubble}</span><button onClick={() => setBubble('')} aria-label="Закрыть реплику котика">×</button></div>}
    <button className="pet-button" data-cursor="Погладить" onClick={() => {
      const now = Date.now();
      recentClicks.current = [...recentClicks.current.filter(time => now - time < 2000), now];
      if (recentClicks.current.length >= 5 && !reduced) {
        recentClicks.current = [];
        speak('Сальто! Теперь я заслужил рыбку. 🐟');
        setFlipping(true);
        burst(root.current);
        setTimeout(() => setFlipping(false), 900);
        return;
      }
      speak(clickMessages[clicks.current++ % clickMessages.length]);
      lastBubble.current.time = Date.now();
      setHappy(true);
      clearTimeout(happyTimer.current);
      happyTimer.current = setTimeout(() => setHappy(false), 600);
    }} aria-label="Погладить котика">
      <CatSvg />
      <span className="cat-shadow" aria-hidden="true" />
    </button>
    <button className="pet-hide" onClick={() => toggle(false)} aria-label="Спрятать котика" title="Спрятать котика">×</button>
  </div></>;
}

// A shower of paw prints across the screen.
function pawRain(layer: HTMLDivElement | null, reduced: boolean) {
  if (!layer || reduced) return;
  for (let index = 0; index < 26; index++) {
    const print = document.createElement('i');
    print.className = 'paw-print is-rain';
    print.style.left = Math.random() * 100 + 'vw';
    print.style.top = '-40px';
    print.style.setProperty('--fall-delay', Math.random() * 900 + 'ms');
    print.style.setProperty('--fall-turn', (Math.random() * 120 - 60) + 'deg');
    layer.appendChild(print);
    setTimeout(() => print.remove(), 3200);
  }
}

// Fish and sparkles fly out of the cat after the backflip.
function burst(cat: HTMLDivElement | null) {
  if (!cat) return;
  ['🐟', '✦', '🐟', '✳', '✦', '🐟'].forEach((symbol, index) => {
    const piece = document.createElement('span');
    piece.className = 'cat-burst';
    piece.textContent = symbol;
    const angle = -Math.PI / 2 + (index - 2.5) * 0.42;
    piece.style.setProperty('--bx', Math.cos(angle) * 90 + 'px');
    piece.style.setProperty('--by', Math.sin(angle) * 90 + 'px');
    cat.appendChild(piece);
    setTimeout(() => piece.remove(), 1000);
  });
}
