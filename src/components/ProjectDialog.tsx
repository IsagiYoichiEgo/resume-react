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

  return <dialog ref={dialog} className="project-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }}>
    <div className="dialog-top"><span className={'project-status ' + (project.liveUrl ? 'is-live' : '')}>{project.status}</span><button className="icon-button" type="button" onClick={onClose} aria-label="Закрыть проект" autoFocus><Icon name="close" /></button></div>
    <p className="dialog-kind">{project.kind}</p><h2 id="dialog-title">{project.title}</h2>
    <p id="dialog-description" className="dialog-description">{project.description}</p>
    <div className="tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
    <h3>О проекте</h3><ul className="feature-list">{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
    <p className="dialog-note">{project.note}</p>
    {(project.liveUrl || project.sourceUrl) && <div className="dialog-actions">{project.liveUrl && <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">Открыть сайт <Icon name="arrow" /></a>}{project.sourceUrl && <a className="button button-secondary" href={project.sourceUrl} target="_blank" rel="noreferrer">Исходный код <Icon name="github" /></a>}</div>}
  </dialog>;
}
