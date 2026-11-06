import { useRef, useState } from 'react';
import { projects } from '../data/resume';
import type { Project } from '../data/resume';
import { Icon } from './Icon';
import { ProjectVisual } from './ProjectVisual';
import { ProjectDialog } from './ProjectDialog';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  return <section id="projects" className="projects-section container" aria-labelledby="projects-title">
    <div className="section-intro"><h2 id="projects-title">Проекты<span className="heading-mark" aria-hidden="true">↘</span></h2><p>Опубликованные учебные сайты<br />и проекты в работе.</p></div>
    <div className="project-grid">
      {projects.map(project => <article className={'project-card project-card-' + project.id} key={project.id}>
        <ProjectVisual id={project.id} />
        <div className="project-info"><div className="project-topline"><span>{project.kind}</span><span className={'project-status ' + (project.liveUrl ? 'is-live' : '')}>{project.liveUrl && <i aria-hidden="true" />}{project.status}</span></div>
          <h3><button type="button" onClick={event => { trigger.current = event.currentTarget; setSelected(project); }} aria-label={'Подробнее о проекте ' + project.title}>{project.title}<Icon name="arrow" /></button></h3>
          <p>{project.description}</p>
          <div className="project-bottom"><div className="tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div><div className="project-links">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={'Открыть сайт ' + project.title}>Сайт <Icon name="arrow" /></a>}{project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer" aria-label={'Открыть код ' + project.title}>Код <Icon name="github" /></a>}</div></div>
        </div>
      </article>)}
    </div>
    <p className="covers-note">Обложки — графические композиции. Сами сайты открываются по ссылкам в карточках.</p>
    {selected && <ProjectDialog project={selected} returnFocusTo={trigger.current} onClose={() => setSelected(null)} />}
  </section>;
}
