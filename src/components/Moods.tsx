import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { CatSvg } from './CatSvg';
import { useScrollProgress } from '../lib/useScrollProgress';
import './moods.css';

const moods = [
  { name: 'Привет', scene: 'wave', tone: 'mint' },
  { name: 'Любопытство', scene: 'glass', tone: 'lilac' },
  { name: 'Работа', scene: 'laptop', tone: 'night' },
  { name: 'Мур', scene: 'home', tone: 'cream' },
  { name: 'Футбол', scene: 'ball', tone: 'peach' },
  { name: 'Радость', scene: 'home', tone: 'mint', pose: 'is-happy' },
  { name: 'Сон', scene: 'home', tone: 'lilac', pose: 'is-sleeping' },
];

// Cards with the cat's moods fan out as the section scrolls by.
export function Moods() {
  const root = useRef<HTMLElement>(null);
  useScrollProgress(root, 'pinned');
  const middle = (moods.length - 1) / 2;
  return <section id="moods" className="moods" ref={root} aria-labelledby="moods-title">
    <div className="moods-stage">
      <div className="moods-head container">
        <h2 id="moods-title">Семь настроений котика</h2>
        <p>Листайте — колода раскроется.</p>
      </div>
      <ul className="moods-fan">
        {moods.map((mood, index) => <li key={mood.name} className={'mood-card tone-' + mood.tone} style={{ '--k': index - middle, '--a': Math.abs(index - middle) } as CSSProperties}>
          <div className={'mood-art cat-scope ' + (mood.pose ?? '')} data-scene={mood.scene}><CatSvg /></div>
          <span>{mood.name}</span>
        </li>)}
      </ul>
    </div>
  </section>;
}
