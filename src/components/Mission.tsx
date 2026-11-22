import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { useScrollProgress } from '../lib/useScrollProgress';
import './mission.css';

const words = 'Делаю сайты, которые приятно открыть — для бизнеса, людей и идей из Центральной Азии.'.split(' ');
const accent = new Set([3, 4]);

// The phrase fills with colour word by word while it scrolls into view.
export function Mission() {
  const root = useRef<HTMLElement>(null);
  useScrollProgress(root, 'pass');
  return <section className="mission container" ref={root} aria-label="Миссия">
    <p className="mission-label">Миссия</p>
    <p className="mission-text">{words.map((word, index) => <span key={index} className={accent.has(index) ? 'is-accent' : ''} style={{ '--w': index / words.length } as CSSProperties}>{word} </span>)}</p>
  </section>;
}
