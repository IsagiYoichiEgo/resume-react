import { useEffect, useRef } from 'react';
import type { Project } from '../data/resume';
import { Icon } from './Icon';

export function ProjectDialog({ project, returnFocusTo, onClose }: { project: Project; returnFocusTo: HTMLButtonElement | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; returnFocusTo?.focus(); };
  }, [returnFocusTo]);

  return <dialog ref={dialog} className="project-dialog" aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }}>
    <div className="dialog-top"><span className="eyebrow">{project.kind}</span><button className="icon-button" onClick={onClose} aria-label="Закрыть проект" autoFocus><Icon name="close" /></button></div>
    <h2 id="dialog-title">{project.title}<span className="accent-dot">.</span></h2>
    <p className="dialog-description">{project.description}</p>
    <div className="tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
    <h3>Что внутри</h3><ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
    <h3>Как это работает</h3><div className="project-flow">{project.flow.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</div>)}</div>
    <p className="dialog-note">{project.status} · Описание из моего портфолио</p>
  </dialog>;
}
