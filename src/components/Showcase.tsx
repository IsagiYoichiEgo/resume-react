import { useState, type PointerEvent } from 'react';
import { showcase, type ShowcaseId } from '../data/showcase';
import { Icon } from './Icon';
import './showcase.css';

const base = import.meta.env.BASE_URL;

function move(event:PointerEvent<HTMLDivElement>) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--pointer-x',String(Math.min(.5,Math.max(-.5,(event.clientX-rect.left)/rect.width-.5))));
  event.currentTarget.style.setProperty('--pointer-y',String(Math.min(.5,Math.max(-.5,(event.clientY-rect.top)/rect.height-.5))));
}

export function Showcase() {
  const [selected,setSelected] = useState<ShowcaseId>('music');
  const project = showcase[selected];
  const behind = showcase[selected === 'music' ? 'ads' : 'music'];
  return <div className="showcase" data-project={selected}>
    <div className="showcase-canvas" aria-hidden="true" onPointerMove={move} onPointerLeave={event=>{event.currentTarget.style.setProperty('--pointer-x','0');event.currentTarget.style.setProperty('--pointer-y','0');}}>
      <div className="showcase-grid"/><div className="showcase-halo"/><div className="showcase-orbit"/><div className="showcase-orbit orbit-second"/>
      <div className="showcase-depth">
        <div className="preview-browser preview-browser-back"><div className="preview-toolbar"><i/><i/><i/><span>{behind.title}</span></div><img src={base+behind.desktop} alt="" width="1265" height="712"/></div>
        <div className="preview-browser preview-browser-front" key={selected}><div className="preview-toolbar"><i/><i/><i/><span>{project.title}</span><Icon name="arrow"/></div><img src={base+project.desktop} alt="" width="1265" height="712" fetchPriority="high"/></div>
        <div className="preview-phone" key={selected+'-phone'}><div className="phone-camera"/><img src={base+project.mobile} alt="" width="390" height="844"/></div>
        <div className="showcase-token"><span>a<span>.</span></span><i/></div>
        <div className="showcase-cursor"><svg viewBox="0 0 40 48"><path d="M5 3 34 28 21 30 16 43Z"/></svg><span>alimbro</span></div>
        <div className="showcase-spark">✳</div>
      </div>
    </div>
    <div className="showcase-controls"><div className="showcase-switch" role="group" aria-label="Выбрать проект для превью">{(Object.keys(showcase) as ShowcaseId[]).map(id=><button type="button" key={id} aria-pressed={selected===id} onClick={()=>setSelected(id)}>{id==='music'?'Музыка':'Объявления'}</button>)}</div><a href={project.url} target="_blank" rel="noreferrer" aria-label={'Открыть проект '+project.title}>Открыть сайт<Icon name="arrow"/></a></div>
  </div>;
}
